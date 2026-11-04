function _p(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Jd = { exports: {} }, mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ho = Symbol.for("react.element"), Fp = Symbol.for("react.portal"), Bp = Symbol.for("react.fragment"), Wp = Symbol.for("react.strict_mode"), Up = Symbol.for("react.profiler"), zp = Symbol.for("react.provider"), Hp = Symbol.for("react.context"), Vp = Symbol.for("react.forward_ref"), Kp = Symbol.for("react.suspense"), Yp = Symbol.for("react.memo"), Gp = Symbol.for("react.lazy"), bu = Symbol.iterator;
function Xp(e) {
  return e === null || typeof e != "object" ? null : (e = bu && e[bu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Zd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, qd = Object.assign, eh = {};
function vl(e, t, n) {
  this.props = e, this.context = t, this.refs = eh, this.updater = n || Zd;
}
vl.prototype.isReactComponent = {};
vl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
vl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function th() {
}
th.prototype = vl.prototype;
function Ec(e, t, n) {
  this.props = e, this.context = t, this.refs = eh, this.updater = n || Zd;
}
var Sc = Ec.prototype = new th();
Sc.constructor = Ec;
qd(Sc, vl.prototype);
Sc.isPureReactComponent = !0;
var Mu = Array.isArray, nh = Object.prototype.hasOwnProperty, bc = { current: null }, sh = { key: !0, ref: !0, __self: !0, __source: !0 };
function rh(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) nh.call(t, r) && !sh.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), d = 0; d < a; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: ho, type: e, key: o, ref: i, props: l, _owner: bc.current };
}
function Qp(e, t) {
  return { $$typeof: ho, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Mc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ho;
}
function Jp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Iu = /\/+/g;
function Gi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Jp("" + e.key) : t.toString(36);
}
function Bo(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else switch (o) {
    case "string":
    case "number":
      i = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case ho:
        case Fp:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Gi(i, 0) : r, Mu(l) ? (n = "", e != null && (n = e.replace(Iu, "$&/") + "/"), Bo(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Mc(l) && (l = Qp(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Iu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Mu(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var c = r + Gi(o, a);
    i += Bo(o, t, n, c, l);
  }
  else if (c = Xp(e), typeof c == "function") for (e = c.call(e), a = 0; !(o = e.next()).done; ) o = o.value, c = r + Gi(o, a++), i += Bo(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function ko(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Bo(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Zp(e) {
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
var Rn = { current: null }, Wo = { transition: null }, qp = { ReactCurrentDispatcher: Rn, ReactCurrentBatchConfig: Wo, ReactCurrentOwner: bc };
function lh() {
  throw Error("act(...) is not supported in production builds of React.");
}
mt.Children = { map: ko, forEach: function(e, t, n) {
  ko(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ko(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ko(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Mc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
mt.Component = vl;
mt.Fragment = Bp;
mt.Profiler = Up;
mt.PureComponent = Ec;
mt.StrictMode = Wp;
mt.Suspense = Kp;
mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qp;
mt.act = lh;
mt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = qd({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = bc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) nh.call(t, c) && !sh.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var d = 0; d < c; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: ho, type: e.type, key: l, ref: o, props: r, _owner: i };
};
mt.createContext = function(e) {
  return e = { $$typeof: Hp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: zp, _context: e }, e.Consumer = e;
};
mt.createElement = rh;
mt.createFactory = function(e) {
  var t = rh.bind(null, e);
  return t.type = e, t;
};
mt.createRef = function() {
  return { current: null };
};
mt.forwardRef = function(e) {
  return { $$typeof: Vp, render: e };
};
mt.isValidElement = Mc;
mt.lazy = function(e) {
  return { $$typeof: Gp, _payload: { _status: -1, _result: e }, _init: Zp };
};
mt.memo = function(e, t) {
  return { $$typeof: Yp, type: e, compare: t === void 0 ? null : t };
};
mt.startTransition = function(e) {
  var t = Wo.transition;
  Wo.transition = {};
  try {
    e();
  } finally {
    Wo.transition = t;
  }
};
mt.unstable_act = lh;
mt.useCallback = function(e, t) {
  return Rn.current.useCallback(e, t);
};
mt.useContext = function(e) {
  return Rn.current.useContext(e);
};
mt.useDebugValue = function() {
};
mt.useDeferredValue = function(e) {
  return Rn.current.useDeferredValue(e);
};
mt.useEffect = function(e, t) {
  return Rn.current.useEffect(e, t);
};
mt.useId = function() {
  return Rn.current.useId();
};
mt.useImperativeHandle = function(e, t, n) {
  return Rn.current.useImperativeHandle(e, t, n);
};
mt.useInsertionEffect = function(e, t) {
  return Rn.current.useInsertionEffect(e, t);
};
mt.useLayoutEffect = function(e, t) {
  return Rn.current.useLayoutEffect(e, t);
};
mt.useMemo = function(e, t) {
  return Rn.current.useMemo(e, t);
};
mt.useReducer = function(e, t, n) {
  return Rn.current.useReducer(e, t, n);
};
mt.useRef = function(e) {
  return Rn.current.useRef(e);
};
mt.useState = function(e) {
  return Rn.current.useState(e);
};
mt.useSyncExternalStore = function(e, t, n) {
  return Rn.current.useSyncExternalStore(e, t, n);
};
mt.useTransition = function() {
  return Rn.current.useTransition();
};
mt.version = "18.3.1";
Jd.exports = mt;
var u = Jd.exports;
const fo = /* @__PURE__ */ _p(u);
var ei = {}, oh = { exports: {} }, Xn = {}, ih = { exports: {} }, ah = {};
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
  function t(A, T) {
    var L = A.length;
    A.push(T);
    e: for (; 0 < L; ) {
      var z = L - 1 >>> 1, F = A[z];
      if (0 < l(F, T)) A[z] = T, A[L] = F, L = z;
      else break e;
    }
  }
  function n(A) {
    return A.length === 0 ? null : A[0];
  }
  function r(A) {
    if (A.length === 0) return null;
    var T = A[0], L = A.pop();
    if (L !== T) {
      A[0] = L;
      e: for (var z = 0, F = A.length, ce = F >>> 1; z < ce; ) {
        var q = 2 * (z + 1) - 1, J = A[q], le = q + 1, Fe = A[le];
        if (0 > l(J, L)) le < F && 0 > l(Fe, J) ? (A[z] = Fe, A[le] = L, z = le) : (A[z] = J, A[q] = L, z = q);
        else if (le < F && 0 > l(Fe, L)) A[z] = Fe, A[le] = L, z = le;
        else break e;
      }
    }
    return T;
  }
  function l(A, T) {
    var L = A.sortIndex - T.sortIndex;
    return L !== 0 ? L : A.id - T.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, a = i.now();
    e.unstable_now = function() {
      return i.now() - a;
    };
  }
  var c = [], d = [], v = 1, m = null, g = 3, N = !1, C = !1, b = !1, P = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(A) {
    for (var T = n(d); T !== null; ) {
      if (T.callback === null) r(d);
      else if (T.startTime <= A) r(d), T.sortIndex = T.expirationTime, t(c, T);
      else break;
      T = n(d);
    }
  }
  function M(A) {
    if (b = !1, h(A), !C) if (n(c) !== null) C = !0, U(E);
    else {
      var T = n(d);
      T !== null && te(M, T.startTime - A);
    }
  }
  function E(A, T) {
    C = !1, b && (b = !1, k(S), S = -1), N = !0;
    var L = g;
    try {
      for (h(T), m = n(c); m !== null && (!(m.expirationTime > T) || A && !D()); ) {
        var z = m.callback;
        if (typeof z == "function") {
          m.callback = null, g = m.priorityLevel;
          var F = z(m.expirationTime <= T);
          T = e.unstable_now(), typeof F == "function" ? m.callback = F : m === n(c) && r(c), h(T);
        } else r(c);
        m = n(c);
      }
      if (m !== null) var ce = !0;
      else {
        var q = n(d);
        q !== null && te(M, q.startTime - T), ce = !1;
      }
      return ce;
    } finally {
      m = null, g = L, N = !1;
    }
  }
  var j = !1, y = null, S = -1, x = 5, I = -1;
  function D() {
    return !(e.unstable_now() - I < x);
  }
  function V() {
    if (y !== null) {
      var A = e.unstable_now();
      I = A;
      var T = !0;
      try {
        T = y(!0, A);
      } finally {
        T ? $() : (j = !1, y = null);
      }
    } else j = !1;
  }
  var $;
  if (typeof p == "function") $ = function() {
    p(V);
  };
  else if (typeof MessageChannel < "u") {
    var B = new MessageChannel(), se = B.port2;
    B.port1.onmessage = V, $ = function() {
      se.postMessage(null);
    };
  } else $ = function() {
    P(V, 0);
  };
  function U(A) {
    y = A, j || (j = !0, $());
  }
  function te(A, T) {
    S = P(function() {
      A(e.unstable_now());
    }, T);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(A) {
    A.callback = null;
  }, e.unstable_continueExecution = function() {
    C || N || (C = !0, U(E));
  }, e.unstable_forceFrameRate = function(A) {
    0 > A || 125 < A ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : x = 0 < A ? Math.floor(1e3 / A) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(A) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var T = 3;
        break;
      default:
        T = g;
    }
    var L = g;
    g = T;
    try {
      return A();
    } finally {
      g = L;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(A, T) {
    switch (A) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        A = 3;
    }
    var L = g;
    g = A;
    try {
      return T();
    } finally {
      g = L;
    }
  }, e.unstable_scheduleCallback = function(A, T, L) {
    var z = e.unstable_now();
    switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? z + L : z) : L = z, A) {
      case 1:
        var F = -1;
        break;
      case 2:
        F = 250;
        break;
      case 5:
        F = 1073741823;
        break;
      case 4:
        F = 1e4;
        break;
      default:
        F = 5e3;
    }
    return F = L + F, A = { id: v++, callback: T, priorityLevel: A, startTime: L, expirationTime: F, sortIndex: -1 }, L > z ? (A.sortIndex = L, t(d, A), n(c) === null && A === n(d) && (b ? (k(S), S = -1) : b = !0, te(M, L - z))) : (A.sortIndex = F, t(c, A), C || N || (C = !0, U(E))), A;
  }, e.unstable_shouldYield = D, e.unstable_wrapCallback = function(A) {
    var T = g;
    return function() {
      var L = g;
      g = T;
      try {
        return A.apply(this, arguments);
      } finally {
        g = L;
      }
    };
  };
})(ah);
ih.exports = ah;
var em = ih.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tm = u, Gn = em;
function xe(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ch = /* @__PURE__ */ new Set(), Yl = {};
function Dr(e, t) {
  hl(e, t), hl(e + "Capture", t);
}
function hl(e, t) {
  for (Yl[e] = t, e = 0; e < t.length; e++) ch.add(t[e]);
}
var Ls = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ba = Object.prototype.hasOwnProperty, nm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Tu = {}, Au = {};
function sm(e) {
  return ba.call(Au, e) ? !0 : ba.call(Tu, e) ? !1 : nm.test(e) ? Au[e] = !0 : (Tu[e] = !0, !1);
}
function rm(e, t, n, r) {
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
function lm(e, t, n, r) {
  if (t === null || typeof t > "u" || rm(e, t, n, r)) return !0;
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
function $n(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var yn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  yn[e] = new $n(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  yn[t] = new $n(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  yn[e] = new $n(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  yn[e] = new $n(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  yn[e] = new $n(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  yn[e] = new $n(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  yn[e] = new $n(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  yn[e] = new $n(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  yn[e] = new $n(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ic = /[\-:]([a-z])/g;
function Tc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ic,
    Tc
  );
  yn[t] = new $n(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ic, Tc);
  yn[t] = new $n(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ic, Tc);
  yn[t] = new $n(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  yn[e] = new $n(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
yn.xlinkHref = new $n("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  yn[e] = new $n(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ac(e, t, n, r) {
  var l = yn.hasOwnProperty(t) ? yn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (lm(t, n, l, r) && (n = null), r || l === null ? sm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var _s = tm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, wo = Symbol.for("react.element"), Hr = Symbol.for("react.portal"), Vr = Symbol.for("react.fragment"), Rc = Symbol.for("react.strict_mode"), Ma = Symbol.for("react.profiler"), uh = Symbol.for("react.provider"), dh = Symbol.for("react.context"), $c = Symbol.for("react.forward_ref"), Ia = Symbol.for("react.suspense"), Ta = Symbol.for("react.suspense_list"), Lc = Symbol.for("react.memo"), Xs = Symbol.for("react.lazy"), hh = Symbol.for("react.offscreen"), Ru = Symbol.iterator;
function Cl(e) {
  return e === null || typeof e != "object" ? null : (e = Ru && e[Ru] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Kt = Object.assign, Xi;
function Ll(e) {
  if (Xi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Xi = t && t[1] || "";
  }
  return `
` + Xi + e;
}
var Qi = !1;
function Ji(e, t) {
  if (!e || Qi) return "";
  Qi = !0;
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
`), i = l.length - 1, a = o.length - 1; 1 <= i && 0 <= a && l[i] !== o[a]; ) a--;
      for (; 1 <= i && 0 <= a; i--, a--) if (l[i] !== o[a]) {
        if (i !== 1 || a !== 1)
          do
            if (i--, a--, 0 > a || l[i] !== o[a]) {
              var c = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= i && 0 <= a);
        break;
      }
    }
  } finally {
    Qi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Ll(e) : "";
}
function om(e) {
  switch (e.tag) {
    case 5:
      return Ll(e.type);
    case 16:
      return Ll("Lazy");
    case 13:
      return Ll("Suspense");
    case 19:
      return Ll("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ji(e.type, !1), e;
    case 11:
      return e = Ji(e.type.render, !1), e;
    case 1:
      return e = Ji(e.type, !0), e;
    default:
      return "";
  }
}
function Aa(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Vr:
      return "Fragment";
    case Hr:
      return "Portal";
    case Ma:
      return "Profiler";
    case Rc:
      return "StrictMode";
    case Ia:
      return "Suspense";
    case Ta:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case dh:
      return (e.displayName || "Context") + ".Consumer";
    case uh:
      return (e._context.displayName || "Context") + ".Provider";
    case $c:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Lc:
      return t = e.displayName || null, t !== null ? t : Aa(e.type) || "Memo";
    case Xs:
      t = e._payload, e = e._init;
      try {
        return Aa(e(t));
      } catch {
      }
  }
  return null;
}
function im(e) {
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
      return Aa(t);
    case 8:
      return t === Rc ? "StrictMode" : "Mode";
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
function hr(e) {
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
function fh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function am(e) {
  var t = fh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(i) {
      r = "" + i, o.call(this, i);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(i) {
      r = "" + i;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function jo(e) {
  e._valueTracker || (e._valueTracker = am(e));
}
function ph(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = fh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ti(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ra(e, t) {
  var n = t.checked;
  return Kt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function $u(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = hr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function mh(e, t) {
  t = t.checked, t != null && Ac(e, "checked", t, !1);
}
function $a(e, t) {
  mh(e, t);
  var n = hr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? La(e, t.type, n) : t.hasOwnProperty("defaultValue") && La(e, t.type, hr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Lu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function La(e, t, n) {
  (t !== "number" || ti(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ol = Array.isArray;
function sl(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + hr(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Oa(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(xe(91));
  return Kt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ou(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(xe(92));
      if (Ol(n)) {
        if (1 < n.length) throw Error(xe(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: hr(n) };
}
function gh(e, t) {
  var n = hr(t.value), r = hr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Du(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function xh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Da(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? xh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Co, yh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Co = Co || document.createElement("div"), Co.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Co.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Gl(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var _l = {
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
}, cm = ["Webkit", "ms", "Moz", "O"];
Object.keys(_l).forEach(function(e) {
  cm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), _l[t] = _l[e];
  });
});
function vh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || _l.hasOwnProperty(e) && _l[e] ? ("" + t).trim() : t + "px";
}
function Nh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = vh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var um = Kt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Pa(e, t) {
  if (t) {
    if (um[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(xe(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(xe(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(xe(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(xe(62));
  }
}
function _a(e, t) {
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
var Fa = null;
function Oc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ba = null, rl = null, ll = null;
function Pu(e) {
  if (e = go(e)) {
    if (typeof Ba != "function") throw Error(xe(280));
    var t = e.stateNode;
    t && (t = Ai(t), Ba(e.stateNode, e.type, t));
  }
}
function kh(e) {
  rl ? ll ? ll.push(e) : ll = [e] : rl = e;
}
function wh() {
  if (rl) {
    var e = rl, t = ll;
    if (ll = rl = null, Pu(e), t) for (e = 0; e < t.length; e++) Pu(t[e]);
  }
}
function jh(e, t) {
  return e(t);
}
function Ch() {
}
var Zi = !1;
function Eh(e, t, n) {
  if (Zi) return e(t, n);
  Zi = !0;
  try {
    return jh(e, t, n);
  } finally {
    Zi = !1, (rl !== null || ll !== null) && (Ch(), wh());
  }
}
function Xl(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ai(n);
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
  if (n && typeof n != "function") throw Error(xe(231, t, typeof n));
  return n;
}
var Wa = !1;
if (Ls) try {
  var El = {};
  Object.defineProperty(El, "passive", { get: function() {
    Wa = !0;
  } }), window.addEventListener("test", El, El), window.removeEventListener("test", El, El);
} catch {
  Wa = !1;
}
function dm(e, t, n, r, l, o, i, a, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Fl = !1, ni = null, si = !1, Ua = null, hm = { onError: function(e) {
  Fl = !0, ni = e;
} };
function fm(e, t, n, r, l, o, i, a, c) {
  Fl = !1, ni = null, dm.apply(hm, arguments);
}
function pm(e, t, n, r, l, o, i, a, c) {
  if (fm.apply(this, arguments), Fl) {
    if (Fl) {
      var d = ni;
      Fl = !1, ni = null;
    } else throw Error(xe(198));
    si || (si = !0, Ua = d);
  }
}
function Pr(e) {
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
function Sh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function _u(e) {
  if (Pr(e) !== e) throw Error(xe(188));
}
function mm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Pr(e), t === null) throw Error(xe(188));
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
        if (o === n) return _u(l), e;
        if (o === r) return _u(l), t;
        o = o.sibling;
      }
      throw Error(xe(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var i = !1, a = l.child; a; ) {
        if (a === n) {
          i = !0, n = l, r = o;
          break;
        }
        if (a === r) {
          i = !0, r = l, n = o;
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = o.child; a; ) {
          if (a === n) {
            i = !0, n = o, r = l;
            break;
          }
          if (a === r) {
            i = !0, r = o, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(xe(189));
      }
    }
    if (n.alternate !== r) throw Error(xe(190));
  }
  if (n.tag !== 3) throw Error(xe(188));
  return n.stateNode.current === n ? e : t;
}
function bh(e) {
  return e = mm(e), e !== null ? Mh(e) : null;
}
function Mh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Mh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ih = Gn.unstable_scheduleCallback, Fu = Gn.unstable_cancelCallback, gm = Gn.unstable_shouldYield, xm = Gn.unstable_requestPaint, qt = Gn.unstable_now, ym = Gn.unstable_getCurrentPriorityLevel, Dc = Gn.unstable_ImmediatePriority, Th = Gn.unstable_UserBlockingPriority, ri = Gn.unstable_NormalPriority, vm = Gn.unstable_LowPriority, Ah = Gn.unstable_IdlePriority, bi = null, ks = null;
function Nm(e) {
  if (ks && typeof ks.onCommitFiberRoot == "function") try {
    ks.onCommitFiberRoot(bi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ds = Math.clz32 ? Math.clz32 : jm, km = Math.log, wm = Math.LN2;
function jm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (km(e) / wm | 0) | 0;
}
var Eo = 64, So = 4194304;
function Dl(e) {
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
function li(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? r = Dl(a) : (o &= i, o !== 0 && (r = Dl(o)));
  } else i = n & ~l, i !== 0 ? r = Dl(i) : o !== 0 && (r = Dl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ds(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Cm(e, t) {
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
function Em(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - ds(o), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & r) && (l[i] = Cm(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function za(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Rh() {
  var e = Eo;
  return Eo <<= 1, !(Eo & 4194240) && (Eo = 64), e;
}
function qi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function po(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ds(t), e[t] = n;
}
function Sm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ds(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Pc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ds(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var It = 0;
function $h(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Lh, _c, Oh, Dh, Ph, Ha = !1, bo = [], rr = null, lr = null, or = null, Ql = /* @__PURE__ */ new Map(), Jl = /* @__PURE__ */ new Map(), qs = [], bm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Bu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      rr = null;
      break;
    case "dragenter":
    case "dragleave":
      lr = null;
      break;
    case "mouseover":
    case "mouseout":
      or = null;
      break;
    case "pointerover":
    case "pointerout":
      Ql.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Jl.delete(t.pointerId);
  }
}
function Sl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = go(t), t !== null && _c(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Mm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return rr = Sl(rr, e, t, n, r, l), !0;
    case "dragenter":
      return lr = Sl(lr, e, t, n, r, l), !0;
    case "mouseover":
      return or = Sl(or, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Ql.set(o, Sl(Ql.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Jl.set(o, Sl(Jl.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function _h(e) {
  var t = Cr(e.target);
  if (t !== null) {
    var n = Pr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Sh(n), t !== null) {
          e.blockedOn = t, Ph(e.priority, function() {
            Oh(n);
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
function Uo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Va(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Fa = r, n.target.dispatchEvent(r), Fa = null;
    } else return t = go(n), t !== null && _c(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Wu(e, t, n) {
  Uo(e) && n.delete(t);
}
function Im() {
  Ha = !1, rr !== null && Uo(rr) && (rr = null), lr !== null && Uo(lr) && (lr = null), or !== null && Uo(or) && (or = null), Ql.forEach(Wu), Jl.forEach(Wu);
}
function bl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ha || (Ha = !0, Gn.unstable_scheduleCallback(Gn.unstable_NormalPriority, Im)));
}
function Zl(e) {
  function t(l) {
    return bl(l, e);
  }
  if (0 < bo.length) {
    bl(bo[0], e);
    for (var n = 1; n < bo.length; n++) {
      var r = bo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (rr !== null && bl(rr, e), lr !== null && bl(lr, e), or !== null && bl(or, e), Ql.forEach(t), Jl.forEach(t), n = 0; n < qs.length; n++) r = qs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < qs.length && (n = qs[0], n.blockedOn === null); ) _h(n), n.blockedOn === null && qs.shift();
}
var ol = _s.ReactCurrentBatchConfig, oi = !0;
function Tm(e, t, n, r) {
  var l = It, o = ol.transition;
  ol.transition = null;
  try {
    It = 1, Fc(e, t, n, r);
  } finally {
    It = l, ol.transition = o;
  }
}
function Am(e, t, n, r) {
  var l = It, o = ol.transition;
  ol.transition = null;
  try {
    It = 4, Fc(e, t, n, r);
  } finally {
    It = l, ol.transition = o;
  }
}
function Fc(e, t, n, r) {
  if (oi) {
    var l = Va(e, t, n, r);
    if (l === null) ca(e, t, r, ii, n), Bu(e, r);
    else if (Mm(l, e, t, n, r)) r.stopPropagation();
    else if (Bu(e, r), t & 4 && -1 < bm.indexOf(e)) {
      for (; l !== null; ) {
        var o = go(l);
        if (o !== null && Lh(o), o = Va(e, t, n, r), o === null && ca(e, t, r, ii, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ca(e, t, r, null, n);
  }
}
var ii = null;
function Va(e, t, n, r) {
  if (ii = null, e = Oc(r), e = Cr(e), e !== null) if (t = Pr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Sh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ii = e, null;
}
function Fh(e) {
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
      switch (ym()) {
        case Dc:
          return 1;
        case Th:
          return 4;
        case ri:
        case vm:
          return 16;
        case Ah:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var nr = null, Bc = null, zo = null;
function Bh() {
  if (zo) return zo;
  var e, t = Bc, n = t.length, r, l = "value" in nr ? nr.value : nr.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return zo = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Ho(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Mo() {
  return !0;
}
function Uu() {
  return !1;
}
function Qn(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Mo : Uu, this.isPropagationStopped = Uu, this;
  }
  return Kt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Mo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Mo);
  }, persist: function() {
  }, isPersistent: Mo }), t;
}
var Nl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Wc = Qn(Nl), mo = Kt({}, Nl, { view: 0, detail: 0 }), Rm = Qn(mo), ea, ta, Ml, Mi = Kt({}, mo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Uc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Ml && (Ml && e.type === "mousemove" ? (ea = e.screenX - Ml.screenX, ta = e.screenY - Ml.screenY) : ta = ea = 0, Ml = e), ea);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ta;
} }), zu = Qn(Mi), $m = Kt({}, Mi, { dataTransfer: 0 }), Lm = Qn($m), Om = Kt({}, mo, { relatedTarget: 0 }), na = Qn(Om), Dm = Kt({}, Nl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Pm = Qn(Dm), _m = Kt({}, Nl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Fm = Qn(_m), Bm = Kt({}, Nl, { data: 0 }), Hu = Qn(Bm), Wm = {
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
}, Um = {
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
}, zm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Hm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = zm[e]) ? !!t[e] : !1;
}
function Uc() {
  return Hm;
}
var Vm = Kt({}, mo, { key: function(e) {
  if (e.key) {
    var t = Wm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ho(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Um[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Uc, charCode: function(e) {
  return e.type === "keypress" ? Ho(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ho(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Km = Qn(Vm), Ym = Kt({}, Mi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Vu = Qn(Ym), Gm = Kt({}, mo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Uc }), Xm = Qn(Gm), Qm = Kt({}, Nl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Jm = Qn(Qm), Zm = Kt({}, Mi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), qm = Qn(Zm), e0 = [9, 13, 27, 32], zc = Ls && "CompositionEvent" in window, Bl = null;
Ls && "documentMode" in document && (Bl = document.documentMode);
var t0 = Ls && "TextEvent" in window && !Bl, Wh = Ls && (!zc || Bl && 8 < Bl && 11 >= Bl), Ku = " ", Yu = !1;
function Uh(e, t) {
  switch (e) {
    case "keyup":
      return e0.indexOf(t.keyCode) !== -1;
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
function zh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Kr = !1;
function n0(e, t) {
  switch (e) {
    case "compositionend":
      return zh(t);
    case "keypress":
      return t.which !== 32 ? null : (Yu = !0, Ku);
    case "textInput":
      return e = t.data, e === Ku && Yu ? null : e;
    default:
      return null;
  }
}
function s0(e, t) {
  if (Kr) return e === "compositionend" || !zc && Uh(e, t) ? (e = Bh(), zo = Bc = nr = null, Kr = !1, e) : null;
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
      return Wh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var r0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Gu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!r0[e.type] : t === "textarea";
}
function Hh(e, t, n, r) {
  kh(r), t = ai(t, "onChange"), 0 < t.length && (n = new Wc("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Wl = null, ql = null;
function l0(e) {
  tf(e, 0);
}
function Ii(e) {
  var t = Xr(e);
  if (ph(t)) return e;
}
function o0(e, t) {
  if (e === "change") return t;
}
var Vh = !1;
if (Ls) {
  var sa;
  if (Ls) {
    var ra = "oninput" in document;
    if (!ra) {
      var Xu = document.createElement("div");
      Xu.setAttribute("oninput", "return;"), ra = typeof Xu.oninput == "function";
    }
    sa = ra;
  } else sa = !1;
  Vh = sa && (!document.documentMode || 9 < document.documentMode);
}
function Qu() {
  Wl && (Wl.detachEvent("onpropertychange", Kh), ql = Wl = null);
}
function Kh(e) {
  if (e.propertyName === "value" && Ii(ql)) {
    var t = [];
    Hh(t, ql, e, Oc(e)), Eh(l0, t);
  }
}
function i0(e, t, n) {
  e === "focusin" ? (Qu(), Wl = t, ql = n, Wl.attachEvent("onpropertychange", Kh)) : e === "focusout" && Qu();
}
function a0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ii(ql);
}
function c0(e, t) {
  if (e === "click") return Ii(t);
}
function u0(e, t) {
  if (e === "input" || e === "change") return Ii(t);
}
function d0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var fs = typeof Object.is == "function" ? Object.is : d0;
function eo(e, t) {
  if (fs(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ba.call(t, l) || !fs(e[l], t[l])) return !1;
  }
  return !0;
}
function Ju(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Zu(e, t) {
  var n = Ju(e);
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
    n = Ju(n);
  }
}
function Yh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Yh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Gh() {
  for (var e = window, t = ti(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ti(e.document);
  }
  return t;
}
function Hc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function h0(e) {
  var t = Gh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Yh(n.ownerDocument.documentElement, n)) {
    if (r !== null && Hc(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Zu(n, o);
        var i = Zu(
          n,
          r
        );
        l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var f0 = Ls && "documentMode" in document && 11 >= document.documentMode, Yr = null, Ka = null, Ul = null, Ya = !1;
function qu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ya || Yr == null || Yr !== ti(r) || (r = Yr, "selectionStart" in r && Hc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ul && eo(Ul, r) || (Ul = r, r = ai(Ka, "onSelect"), 0 < r.length && (t = new Wc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Yr)));
}
function Io(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Gr = { animationend: Io("Animation", "AnimationEnd"), animationiteration: Io("Animation", "AnimationIteration"), animationstart: Io("Animation", "AnimationStart"), transitionend: Io("Transition", "TransitionEnd") }, la = {}, Xh = {};
Ls && (Xh = document.createElement("div").style, "AnimationEvent" in window || (delete Gr.animationend.animation, delete Gr.animationiteration.animation, delete Gr.animationstart.animation), "TransitionEvent" in window || delete Gr.transitionend.transition);
function Ti(e) {
  if (la[e]) return la[e];
  if (!Gr[e]) return e;
  var t = Gr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Xh) return la[e] = t[n];
  return e;
}
var Qh = Ti("animationend"), Jh = Ti("animationiteration"), Zh = Ti("animationstart"), qh = Ti("transitionend"), ef = /* @__PURE__ */ new Map(), ed = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function pr(e, t) {
  ef.set(e, t), Dr(t, [e]);
}
for (var oa = 0; oa < ed.length; oa++) {
  var ia = ed[oa], p0 = ia.toLowerCase(), m0 = ia[0].toUpperCase() + ia.slice(1);
  pr(p0, "on" + m0);
}
pr(Qh, "onAnimationEnd");
pr(Jh, "onAnimationIteration");
pr(Zh, "onAnimationStart");
pr("dblclick", "onDoubleClick");
pr("focusin", "onFocus");
pr("focusout", "onBlur");
pr(qh, "onTransitionEnd");
hl("onMouseEnter", ["mouseout", "mouseover"]);
hl("onMouseLeave", ["mouseout", "mouseover"]);
hl("onPointerEnter", ["pointerout", "pointerover"]);
hl("onPointerLeave", ["pointerout", "pointerover"]);
Dr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Dr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Dr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Dr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Dr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Dr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), g0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Pl));
function td(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, pm(r, t, void 0, e), e.currentTarget = null;
}
function tf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], c = a.instance, d = a.currentTarget;
        if (a = a.listener, c !== o && l.isPropagationStopped()) break e;
        td(l, a, d), o = c;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], c = a.instance, d = a.currentTarget, a = a.listener, c !== o && l.isPropagationStopped()) break e;
        td(l, a, d), o = c;
      }
    }
  }
  if (si) throw e = Ua, si = !1, Ua = null, e;
}
function Dt(e, t) {
  var n = t[Za];
  n === void 0 && (n = t[Za] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (nf(t, e, 2, !1), n.add(r));
}
function aa(e, t, n) {
  var r = 0;
  t && (r |= 4), nf(n, e, r, t);
}
var To = "_reactListening" + Math.random().toString(36).slice(2);
function to(e) {
  if (!e[To]) {
    e[To] = !0, ch.forEach(function(n) {
      n !== "selectionchange" && (g0.has(n) || aa(n, !1, e), aa(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[To] || (t[To] = !0, aa("selectionchange", !1, t));
  }
}
function nf(e, t, n, r) {
  switch (Fh(t)) {
    case 1:
      var l = Tm;
      break;
    case 4:
      l = Am;
      break;
    default:
      l = Fc;
  }
  n = l.bind(null, t, n, e), l = void 0, !Wa || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ca(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var a = r.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var c = i.tag;
        if ((c === 3 || c === 4) && (c = i.stateNode.containerInfo, c === l || c.nodeType === 8 && c.parentNode === l)) return;
        i = i.return;
      }
      for (; a !== null; ) {
        if (i = Cr(a), i === null) return;
        if (c = i.tag, c === 5 || c === 6) {
          r = o = i;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Eh(function() {
    var d = o, v = Oc(n), m = [];
    e: {
      var g = ef.get(e);
      if (g !== void 0) {
        var N = Wc, C = e;
        switch (e) {
          case "keypress":
            if (Ho(n) === 0) break e;
          case "keydown":
          case "keyup":
            N = Km;
            break;
          case "focusin":
            C = "focus", N = na;
            break;
          case "focusout":
            C = "blur", N = na;
            break;
          case "beforeblur":
          case "afterblur":
            N = na;
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
            N = zu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            N = Lm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            N = Xm;
            break;
          case Qh:
          case Jh:
          case Zh:
            N = Pm;
            break;
          case qh:
            N = Jm;
            break;
          case "scroll":
            N = Rm;
            break;
          case "wheel":
            N = qm;
            break;
          case "copy":
          case "cut":
          case "paste":
            N = Fm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            N = Vu;
        }
        var b = (t & 4) !== 0, P = !b && e === "scroll", k = b ? g !== null ? g + "Capture" : null : g;
        b = [];
        for (var p = d, h; p !== null; ) {
          h = p;
          var M = h.stateNode;
          if (h.tag === 5 && M !== null && (h = M, k !== null && (M = Xl(p, k), M != null && b.push(no(p, M, h)))), P) break;
          p = p.return;
        }
        0 < b.length && (g = new N(g, C, null, n, v), m.push({ event: g, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", N = e === "mouseout" || e === "pointerout", g && n !== Fa && (C = n.relatedTarget || n.fromElement) && (Cr(C) || C[Os])) break e;
        if ((N || g) && (g = v.window === v ? v : (g = v.ownerDocument) ? g.defaultView || g.parentWindow : window, N ? (C = n.relatedTarget || n.toElement, N = d, C = C ? Cr(C) : null, C !== null && (P = Pr(C), C !== P || C.tag !== 5 && C.tag !== 6) && (C = null)) : (N = null, C = d), N !== C)) {
          if (b = zu, M = "onMouseLeave", k = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (b = Vu, M = "onPointerLeave", k = "onPointerEnter", p = "pointer"), P = N == null ? g : Xr(N), h = C == null ? g : Xr(C), g = new b(M, p + "leave", N, n, v), g.target = P, g.relatedTarget = h, M = null, Cr(v) === d && (b = new b(k, p + "enter", C, n, v), b.target = h, b.relatedTarget = P, M = b), P = M, N && C) t: {
            for (b = N, k = C, p = 0, h = b; h; h = Br(h)) p++;
            for (h = 0, M = k; M; M = Br(M)) h++;
            for (; 0 < p - h; ) b = Br(b), p--;
            for (; 0 < h - p; ) k = Br(k), h--;
            for (; p--; ) {
              if (b === k || k !== null && b === k.alternate) break t;
              b = Br(b), k = Br(k);
            }
            b = null;
          }
          else b = null;
          N !== null && nd(m, g, N, b, !1), C !== null && P !== null && nd(m, P, C, b, !0);
        }
      }
      e: {
        if (g = d ? Xr(d) : window, N = g.nodeName && g.nodeName.toLowerCase(), N === "select" || N === "input" && g.type === "file") var E = o0;
        else if (Gu(g)) if (Vh) E = u0;
        else {
          E = a0;
          var j = i0;
        }
        else (N = g.nodeName) && N.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (E = c0);
        if (E && (E = E(e, d))) {
          Hh(m, E, n, v);
          break e;
        }
        j && j(e, g, d), e === "focusout" && (j = g._wrapperState) && j.controlled && g.type === "number" && La(g, "number", g.value);
      }
      switch (j = d ? Xr(d) : window, e) {
        case "focusin":
          (Gu(j) || j.contentEditable === "true") && (Yr = j, Ka = d, Ul = null);
          break;
        case "focusout":
          Ul = Ka = Yr = null;
          break;
        case "mousedown":
          Ya = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ya = !1, qu(m, n, v);
          break;
        case "selectionchange":
          if (f0) break;
        case "keydown":
        case "keyup":
          qu(m, n, v);
      }
      var y;
      if (zc) e: {
        switch (e) {
          case "compositionstart":
            var S = "onCompositionStart";
            break e;
          case "compositionend":
            S = "onCompositionEnd";
            break e;
          case "compositionupdate":
            S = "onCompositionUpdate";
            break e;
        }
        S = void 0;
      }
      else Kr ? Uh(e, n) && (S = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (S = "onCompositionStart");
      S && (Wh && n.locale !== "ko" && (Kr || S !== "onCompositionStart" ? S === "onCompositionEnd" && Kr && (y = Bh()) : (nr = v, Bc = "value" in nr ? nr.value : nr.textContent, Kr = !0)), j = ai(d, S), 0 < j.length && (S = new Hu(S, e, null, n, v), m.push({ event: S, listeners: j }), y ? S.data = y : (y = zh(n), y !== null && (S.data = y)))), (y = t0 ? n0(e, n) : s0(e, n)) && (d = ai(d, "onBeforeInput"), 0 < d.length && (v = new Hu("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: d }), v.data = y));
    }
    tf(m, t);
  });
}
function no(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ai(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Xl(e, n), o != null && r.unshift(no(e, o, l)), o = Xl(e, t), o != null && r.push(no(e, o, l))), e = e.return;
  }
  return r;
}
function Br(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function nd(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, c = a.alternate, d = a.stateNode;
    if (c !== null && c === r) break;
    a.tag === 5 && d !== null && (a = d, l ? (c = Xl(n, o), c != null && i.unshift(no(n, c, a))) : l || (c = Xl(n, o), c != null && i.push(no(n, c, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var x0 = /\r\n?/g, y0 = /\u0000|\uFFFD/g;
function sd(e) {
  return (typeof e == "string" ? e : "" + e).replace(x0, `
`).replace(y0, "");
}
function Ao(e, t, n) {
  if (t = sd(t), sd(e) !== t && n) throw Error(xe(425));
}
function ci() {
}
var Ga = null, Xa = null;
function Qa(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ja = typeof setTimeout == "function" ? setTimeout : void 0, v0 = typeof clearTimeout == "function" ? clearTimeout : void 0, rd = typeof Promise == "function" ? Promise : void 0, N0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof rd < "u" ? function(e) {
  return rd.resolve(null).then(e).catch(k0);
} : Ja;
function k0(e) {
  setTimeout(function() {
    throw e;
  });
}
function ua(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Zl(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Zl(t);
}
function ir(e) {
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
function ld(e) {
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
var kl = Math.random().toString(36).slice(2), vs = "__reactFiber$" + kl, so = "__reactProps$" + kl, Os = "__reactContainer$" + kl, Za = "__reactEvents$" + kl, w0 = "__reactListeners$" + kl, j0 = "__reactHandles$" + kl;
function Cr(e) {
  var t = e[vs];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Os] || n[vs]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ld(e); e !== null; ) {
        if (n = e[vs]) return n;
        e = ld(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function go(e) {
  return e = e[vs] || e[Os], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Xr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(xe(33));
}
function Ai(e) {
  return e[so] || null;
}
var qa = [], Qr = -1;
function mr(e) {
  return { current: e };
}
function Pt(e) {
  0 > Qr || (e.current = qa[Qr], qa[Qr] = null, Qr--);
}
function Ot(e, t) {
  Qr++, qa[Qr] = e.current, e.current = t;
}
var fr = {}, jn = mr(fr), Bn = mr(!1), Ar = fr;
function fl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return fr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Wn(e) {
  return e = e.childContextTypes, e != null;
}
function ui() {
  Pt(Bn), Pt(jn);
}
function od(e, t, n) {
  if (jn.current !== fr) throw Error(xe(168));
  Ot(jn, t), Ot(Bn, n);
}
function sf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(xe(108, im(e) || "Unknown", l));
  return Kt({}, n, r);
}
function di(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fr, Ar = jn.current, Ot(jn, e), Ot(Bn, Bn.current), !0;
}
function id(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(xe(169));
  n ? (e = sf(e, t, Ar), r.__reactInternalMemoizedMergedChildContext = e, Pt(Bn), Pt(jn), Ot(jn, e)) : Pt(Bn), Ot(Bn, n);
}
var Ms = null, Ri = !1, da = !1;
function rf(e) {
  Ms === null ? Ms = [e] : Ms.push(e);
}
function C0(e) {
  Ri = !0, rf(e);
}
function gr() {
  if (!da && Ms !== null) {
    da = !0;
    var e = 0, t = It;
    try {
      var n = Ms;
      for (It = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ms = null, Ri = !1;
    } catch (l) {
      throw Ms !== null && (Ms = Ms.slice(e + 1)), Ih(Dc, gr), l;
    } finally {
      It = t, da = !1;
    }
  }
  return null;
}
var Jr = [], Zr = 0, hi = null, fi = 0, es = [], ts = 0, Rr = null, Ts = 1, As = "";
function kr(e, t) {
  Jr[Zr++] = fi, Jr[Zr++] = hi, hi = e, fi = t;
}
function lf(e, t, n) {
  es[ts++] = Ts, es[ts++] = As, es[ts++] = Rr, Rr = e;
  var r = Ts;
  e = As;
  var l = 32 - ds(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - ds(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Ts = 1 << 32 - ds(t) + l | n << l | r, As = o + e;
  } else Ts = 1 << o | n << l | r, As = e;
}
function Vc(e) {
  e.return !== null && (kr(e, 1), lf(e, 1, 0));
}
function Kc(e) {
  for (; e === hi; ) hi = Jr[--Zr], Jr[Zr] = null, fi = Jr[--Zr], Jr[Zr] = null;
  for (; e === Rr; ) Rr = es[--ts], es[ts] = null, As = es[--ts], es[ts] = null, Ts = es[--ts], es[ts] = null;
}
var Yn = null, Kn = null, Bt = !1, cs = null;
function of(e, t) {
  var n = ns(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ad(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Yn = e, Kn = ir(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Yn = e, Kn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Rr !== null ? { id: Ts, overflow: As } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ns(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Yn = e, Kn = null, !0) : !1;
    default:
      return !1;
  }
}
function ec(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function tc(e) {
  if (Bt) {
    var t = Kn;
    if (t) {
      var n = t;
      if (!ad(e, t)) {
        if (ec(e)) throw Error(xe(418));
        t = ir(n.nextSibling);
        var r = Yn;
        t && ad(e, t) ? of(r, n) : (e.flags = e.flags & -4097 | 2, Bt = !1, Yn = e);
      }
    } else {
      if (ec(e)) throw Error(xe(418));
      e.flags = e.flags & -4097 | 2, Bt = !1, Yn = e;
    }
  }
}
function cd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Yn = e;
}
function Ro(e) {
  if (e !== Yn) return !1;
  if (!Bt) return cd(e), Bt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Qa(e.type, e.memoizedProps)), t && (t = Kn)) {
    if (ec(e)) throw af(), Error(xe(418));
    for (; t; ) of(e, t), t = ir(t.nextSibling);
  }
  if (cd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(xe(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Kn = ir(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Kn = null;
    }
  } else Kn = Yn ? ir(e.stateNode.nextSibling) : null;
  return !0;
}
function af() {
  for (var e = Kn; e; ) e = ir(e.nextSibling);
}
function pl() {
  Kn = Yn = null, Bt = !1;
}
function Yc(e) {
  cs === null ? cs = [e] : cs.push(e);
}
var E0 = _s.ReactCurrentBatchConfig;
function Il(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(xe(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(xe(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(xe(284));
    if (!n._owner) throw Error(xe(290, e));
  }
  return e;
}
function $o(e, t) {
  throw e = Object.prototype.toString.call(t), Error(xe(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ud(e) {
  var t = e._init;
  return t(e._payload);
}
function cf(e) {
  function t(k, p) {
    if (e) {
      var h = k.deletions;
      h === null ? (k.deletions = [p], k.flags |= 16) : h.push(p);
    }
  }
  function n(k, p) {
    if (!e) return null;
    for (; p !== null; ) t(k, p), p = p.sibling;
    return null;
  }
  function r(k, p) {
    for (k = /* @__PURE__ */ new Map(); p !== null; ) p.key !== null ? k.set(p.key, p) : k.set(p.index, p), p = p.sibling;
    return k;
  }
  function l(k, p) {
    return k = dr(k, p), k.index = 0, k.sibling = null, k;
  }
  function o(k, p, h) {
    return k.index = h, e ? (h = k.alternate, h !== null ? (h = h.index, h < p ? (k.flags |= 2, p) : h) : (k.flags |= 2, p)) : (k.flags |= 1048576, p);
  }
  function i(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function a(k, p, h, M) {
    return p === null || p.tag !== 6 ? (p = ya(h, k.mode, M), p.return = k, p) : (p = l(p, h), p.return = k, p);
  }
  function c(k, p, h, M) {
    var E = h.type;
    return E === Vr ? v(k, p, h.props.children, M, h.key) : p !== null && (p.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Xs && ud(E) === p.type) ? (M = l(p, h.props), M.ref = Il(k, p, h), M.return = k, M) : (M = Jo(h.type, h.key, h.props, null, k.mode, M), M.ref = Il(k, p, h), M.return = k, M);
  }
  function d(k, p, h, M) {
    return p === null || p.tag !== 4 || p.stateNode.containerInfo !== h.containerInfo || p.stateNode.implementation !== h.implementation ? (p = va(h, k.mode, M), p.return = k, p) : (p = l(p, h.children || []), p.return = k, p);
  }
  function v(k, p, h, M, E) {
    return p === null || p.tag !== 7 ? (p = Tr(h, k.mode, M, E), p.return = k, p) : (p = l(p, h), p.return = k, p);
  }
  function m(k, p, h) {
    if (typeof p == "string" && p !== "" || typeof p == "number") return p = ya("" + p, k.mode, h), p.return = k, p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case wo:
          return h = Jo(p.type, p.key, p.props, null, k.mode, h), h.ref = Il(k, null, p), h.return = k, h;
        case Hr:
          return p = va(p, k.mode, h), p.return = k, p;
        case Xs:
          var M = p._init;
          return m(k, M(p._payload), h);
      }
      if (Ol(p) || Cl(p)) return p = Tr(p, k.mode, h, null), p.return = k, p;
      $o(k, p);
    }
    return null;
  }
  function g(k, p, h, M) {
    var E = p !== null ? p.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number") return E !== null ? null : a(k, p, "" + h, M);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case wo:
          return h.key === E ? c(k, p, h, M) : null;
        case Hr:
          return h.key === E ? d(k, p, h, M) : null;
        case Xs:
          return E = h._init, g(
            k,
            p,
            E(h._payload),
            M
          );
      }
      if (Ol(h) || Cl(h)) return E !== null ? null : v(k, p, h, M, null);
      $o(k, h);
    }
    return null;
  }
  function N(k, p, h, M, E) {
    if (typeof M == "string" && M !== "" || typeof M == "number") return k = k.get(h) || null, a(p, k, "" + M, E);
    if (typeof M == "object" && M !== null) {
      switch (M.$$typeof) {
        case wo:
          return k = k.get(M.key === null ? h : M.key) || null, c(p, k, M, E);
        case Hr:
          return k = k.get(M.key === null ? h : M.key) || null, d(p, k, M, E);
        case Xs:
          var j = M._init;
          return N(k, p, h, j(M._payload), E);
      }
      if (Ol(M) || Cl(M)) return k = k.get(h) || null, v(p, k, M, E, null);
      $o(p, M);
    }
    return null;
  }
  function C(k, p, h, M) {
    for (var E = null, j = null, y = p, S = p = 0, x = null; y !== null && S < h.length; S++) {
      y.index > S ? (x = y, y = null) : x = y.sibling;
      var I = g(k, y, h[S], M);
      if (I === null) {
        y === null && (y = x);
        break;
      }
      e && y && I.alternate === null && t(k, y), p = o(I, p, S), j === null ? E = I : j.sibling = I, j = I, y = x;
    }
    if (S === h.length) return n(k, y), Bt && kr(k, S), E;
    if (y === null) {
      for (; S < h.length; S++) y = m(k, h[S], M), y !== null && (p = o(y, p, S), j === null ? E = y : j.sibling = y, j = y);
      return Bt && kr(k, S), E;
    }
    for (y = r(k, y); S < h.length; S++) x = N(y, k, S, h[S], M), x !== null && (e && x.alternate !== null && y.delete(x.key === null ? S : x.key), p = o(x, p, S), j === null ? E = x : j.sibling = x, j = x);
    return e && y.forEach(function(D) {
      return t(k, D);
    }), Bt && kr(k, S), E;
  }
  function b(k, p, h, M) {
    var E = Cl(h);
    if (typeof E != "function") throw Error(xe(150));
    if (h = E.call(h), h == null) throw Error(xe(151));
    for (var j = E = null, y = p, S = p = 0, x = null, I = h.next(); y !== null && !I.done; S++, I = h.next()) {
      y.index > S ? (x = y, y = null) : x = y.sibling;
      var D = g(k, y, I.value, M);
      if (D === null) {
        y === null && (y = x);
        break;
      }
      e && y && D.alternate === null && t(k, y), p = o(D, p, S), j === null ? E = D : j.sibling = D, j = D, y = x;
    }
    if (I.done) return n(
      k,
      y
    ), Bt && kr(k, S), E;
    if (y === null) {
      for (; !I.done; S++, I = h.next()) I = m(k, I.value, M), I !== null && (p = o(I, p, S), j === null ? E = I : j.sibling = I, j = I);
      return Bt && kr(k, S), E;
    }
    for (y = r(k, y); !I.done; S++, I = h.next()) I = N(y, k, S, I.value, M), I !== null && (e && I.alternate !== null && y.delete(I.key === null ? S : I.key), p = o(I, p, S), j === null ? E = I : j.sibling = I, j = I);
    return e && y.forEach(function(V) {
      return t(k, V);
    }), Bt && kr(k, S), E;
  }
  function P(k, p, h, M) {
    if (typeof h == "object" && h !== null && h.type === Vr && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case wo:
          e: {
            for (var E = h.key, j = p; j !== null; ) {
              if (j.key === E) {
                if (E = h.type, E === Vr) {
                  if (j.tag === 7) {
                    n(k, j.sibling), p = l(j, h.props.children), p.return = k, k = p;
                    break e;
                  }
                } else if (j.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Xs && ud(E) === j.type) {
                  n(k, j.sibling), p = l(j, h.props), p.ref = Il(k, j, h), p.return = k, k = p;
                  break e;
                }
                n(k, j);
                break;
              } else t(k, j);
              j = j.sibling;
            }
            h.type === Vr ? (p = Tr(h.props.children, k.mode, M, h.key), p.return = k, k = p) : (M = Jo(h.type, h.key, h.props, null, k.mode, M), M.ref = Il(k, p, h), M.return = k, k = M);
          }
          return i(k);
        case Hr:
          e: {
            for (j = h.key; p !== null; ) {
              if (p.key === j) if (p.tag === 4 && p.stateNode.containerInfo === h.containerInfo && p.stateNode.implementation === h.implementation) {
                n(k, p.sibling), p = l(p, h.children || []), p.return = k, k = p;
                break e;
              } else {
                n(k, p);
                break;
              }
              else t(k, p);
              p = p.sibling;
            }
            p = va(h, k.mode, M), p.return = k, k = p;
          }
          return i(k);
        case Xs:
          return j = h._init, P(k, p, j(h._payload), M);
      }
      if (Ol(h)) return C(k, p, h, M);
      if (Cl(h)) return b(k, p, h, M);
      $o(k, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, p !== null && p.tag === 6 ? (n(k, p.sibling), p = l(p, h), p.return = k, k = p) : (n(k, p), p = ya(h, k.mode, M), p.return = k, k = p), i(k)) : n(k, p);
  }
  return P;
}
var ml = cf(!0), uf = cf(!1), pi = mr(null), mi = null, qr = null, Gc = null;
function Xc() {
  Gc = qr = mi = null;
}
function Qc(e) {
  var t = pi.current;
  Pt(pi), e._currentValue = t;
}
function nc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function il(e, t) {
  mi = e, Gc = qr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Fn = !0), e.firstContext = null);
}
function rs(e) {
  var t = e._currentValue;
  if (Gc !== e) if (e = { context: e, memoizedValue: t, next: null }, qr === null) {
    if (mi === null) throw Error(xe(308));
    qr = e, mi.dependencies = { lanes: 0, firstContext: e };
  } else qr = qr.next = e;
  return t;
}
var Er = null;
function Jc(e) {
  Er === null ? Er = [e] : Er.push(e);
}
function df(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Jc(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ds(e, r);
}
function Ds(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Qs = !1;
function Zc(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function hf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Rs(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ar(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, wt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ds(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Jc(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ds(e, n);
}
function Vo(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Pc(e, n);
  }
}
function dd(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = i : o = o.next = i, n = n.next;
      } while (n !== null);
      o === null ? l = o = t : o = o.next = t;
    } else l = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function gi(e, t, n, r) {
  var l = e.updateQueue;
  Qs = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, d = c.next;
    c.next = null, i === null ? o = d : i.next = d, i = c;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, a = v.lastBaseUpdate, a !== i && (a === null ? v.firstBaseUpdate = d : a.next = d, v.lastBaseUpdate = c));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, v = d = c = null, a = o;
    do {
      var g = a.lane, N = a.eventTime;
      if ((r & g) === g) {
        v !== null && (v = v.next = {
          eventTime: N,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var C = e, b = a;
          switch (g = t, N = n, b.tag) {
            case 1:
              if (C = b.payload, typeof C == "function") {
                m = C.call(N, m, g);
                break e;
              }
              m = C;
              break e;
            case 3:
              C.flags = C.flags & -65537 | 128;
            case 0:
              if (C = b.payload, g = typeof C == "function" ? C.call(N, m, g) : C, g == null) break e;
              m = Kt({}, m, g);
              break e;
            case 2:
              Qs = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [a] : g.push(a));
      } else N = { eventTime: N, lane: g, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, v === null ? (d = v = N, c = m) : v = v.next = N, i |= g;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        g = a, a = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (c = m), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Lr |= i, e.lanes = i, e.memoizedState = m;
  }
}
function hd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(xe(191, l));
      l.call(r);
    }
  }
}
var xo = {}, ws = mr(xo), ro = mr(xo), lo = mr(xo);
function Sr(e) {
  if (e === xo) throw Error(xe(174));
  return e;
}
function qc(e, t) {
  switch (Ot(lo, t), Ot(ro, e), Ot(ws, xo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Da(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Da(t, e);
  }
  Pt(ws), Ot(ws, t);
}
function gl() {
  Pt(ws), Pt(ro), Pt(lo);
}
function ff(e) {
  Sr(lo.current);
  var t = Sr(ws.current), n = Da(t, e.type);
  t !== n && (Ot(ro, e), Ot(ws, n));
}
function eu(e) {
  ro.current === e && (Pt(ws), Pt(ro));
}
var Ht = mr(0);
function xi(e) {
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
var ha = [];
function tu() {
  for (var e = 0; e < ha.length; e++) ha[e]._workInProgressVersionPrimary = null;
  ha.length = 0;
}
var Ko = _s.ReactCurrentDispatcher, fa = _s.ReactCurrentBatchConfig, $r = 0, Vt = null, on = null, hn = null, yi = !1, zl = !1, oo = 0, S0 = 0;
function Nn() {
  throw Error(xe(321));
}
function nu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!fs(e[n], t[n])) return !1;
  return !0;
}
function su(e, t, n, r, l, o) {
  if ($r = o, Vt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ko.current = e === null || e.memoizedState === null ? T0 : A0, e = n(r, l), zl) {
    o = 0;
    do {
      if (zl = !1, oo = 0, 25 <= o) throw Error(xe(301));
      o += 1, hn = on = null, t.updateQueue = null, Ko.current = R0, e = n(r, l);
    } while (zl);
  }
  if (Ko.current = vi, t = on !== null && on.next !== null, $r = 0, hn = on = Vt = null, yi = !1, t) throw Error(xe(300));
  return e;
}
function ru() {
  var e = oo !== 0;
  return oo = 0, e;
}
function ys() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return hn === null ? Vt.memoizedState = hn = e : hn = hn.next = e, hn;
}
function ls() {
  if (on === null) {
    var e = Vt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = on.next;
  var t = hn === null ? Vt.memoizedState : hn.next;
  if (t !== null) hn = t, on = e;
  else {
    if (e === null) throw Error(xe(310));
    on = e, e = { memoizedState: on.memoizedState, baseState: on.baseState, baseQueue: on.baseQueue, queue: on.queue, next: null }, hn === null ? Vt.memoizedState = hn = e : hn = hn.next = e;
  }
  return hn;
}
function io(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function pa(e) {
  var t = ls(), n = t.queue;
  if (n === null) throw Error(xe(311));
  n.lastRenderedReducer = e;
  var r = on, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var a = i = null, c = null, d = o;
    do {
      var v = d.lane;
      if (($r & v) === v) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var m = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (a = c = m, i = r) : c = c.next = m, Vt.lanes |= v, Lr |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? i = r : c.next = a, fs(r, t.memoizedState) || (Fn = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Vt.lanes |= o, Lr |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ma(e) {
  var t = ls(), n = t.queue;
  if (n === null) throw Error(xe(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    fs(o, t.memoizedState) || (Fn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function pf() {
}
function mf(e, t) {
  var n = Vt, r = ls(), l = t(), o = !fs(r.memoizedState, l);
  if (o && (r.memoizedState = l, Fn = !0), r = r.queue, lu(yf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || hn !== null && hn.memoizedState.tag & 1) {
    if (n.flags |= 2048, ao(9, xf.bind(null, n, r, l, t), void 0, null), fn === null) throw Error(xe(349));
    $r & 30 || gf(n, t, l);
  }
  return l;
}
function gf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Vt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Vt.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function xf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, vf(t) && Nf(e);
}
function yf(e, t, n) {
  return n(function() {
    vf(t) && Nf(e);
  });
}
function vf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !fs(e, n);
  } catch {
    return !0;
  }
}
function Nf(e) {
  var t = Ds(e, 1);
  t !== null && hs(t, e, 1, -1);
}
function fd(e) {
  var t = ys();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: io, lastRenderedState: e }, t.queue = e, e = e.dispatch = I0.bind(null, Vt, e), [t.memoizedState, e];
}
function ao(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Vt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Vt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function kf() {
  return ls().memoizedState;
}
function Yo(e, t, n, r) {
  var l = ys();
  Vt.flags |= e, l.memoizedState = ao(1 | t, n, void 0, r === void 0 ? null : r);
}
function $i(e, t, n, r) {
  var l = ls();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (on !== null) {
    var i = on.memoizedState;
    if (o = i.destroy, r !== null && nu(r, i.deps)) {
      l.memoizedState = ao(t, n, o, r);
      return;
    }
  }
  Vt.flags |= e, l.memoizedState = ao(1 | t, n, o, r);
}
function pd(e, t) {
  return Yo(8390656, 8, e, t);
}
function lu(e, t) {
  return $i(2048, 8, e, t);
}
function wf(e, t) {
  return $i(4, 2, e, t);
}
function jf(e, t) {
  return $i(4, 4, e, t);
}
function Cf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ef(e, t, n) {
  return n = n != null ? n.concat([e]) : null, $i(4, 4, Cf.bind(null, t, e), n);
}
function ou() {
}
function Sf(e, t) {
  var n = ls();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && nu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function bf(e, t) {
  var n = ls();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && nu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Mf(e, t, n) {
  return $r & 21 ? (fs(n, t) || (n = Rh(), Vt.lanes |= n, Lr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Fn = !0), e.memoizedState = n);
}
function b0(e, t) {
  var n = It;
  It = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = fa.transition;
  fa.transition = {};
  try {
    e(!1), t();
  } finally {
    It = n, fa.transition = r;
  }
}
function If() {
  return ls().memoizedState;
}
function M0(e, t, n) {
  var r = ur(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Tf(e)) Af(t, n);
  else if (n = df(e, t, n, r), n !== null) {
    var l = An();
    hs(n, e, r, l), Rf(n, t, r);
  }
}
function I0(e, t, n) {
  var r = ur(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Tf(e)) Af(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, fs(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, Jc(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = df(e, t, l, r), n !== null && (l = An(), hs(n, e, r, l), Rf(n, t, r));
  }
}
function Tf(e) {
  var t = e.alternate;
  return e === Vt || t !== null && t === Vt;
}
function Af(e, t) {
  zl = yi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Rf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Pc(e, n);
  }
}
var vi = { readContext: rs, useCallback: Nn, useContext: Nn, useEffect: Nn, useImperativeHandle: Nn, useInsertionEffect: Nn, useLayoutEffect: Nn, useMemo: Nn, useReducer: Nn, useRef: Nn, useState: Nn, useDebugValue: Nn, useDeferredValue: Nn, useTransition: Nn, useMutableSource: Nn, useSyncExternalStore: Nn, useId: Nn, unstable_isNewReconciler: !1 }, T0 = { readContext: rs, useCallback: function(e, t) {
  return ys().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: rs, useEffect: pd, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Yo(
    4194308,
    4,
    Cf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Yo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Yo(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = ys();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ys();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = M0.bind(null, Vt, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ys();
  return e = { current: e }, t.memoizedState = e;
}, useState: fd, useDebugValue: ou, useDeferredValue: function(e) {
  return ys().memoizedState = e;
}, useTransition: function() {
  var e = fd(!1), t = e[0];
  return e = b0.bind(null, e[1]), ys().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Vt, l = ys();
  if (Bt) {
    if (n === void 0) throw Error(xe(407));
    n = n();
  } else {
    if (n = t(), fn === null) throw Error(xe(349));
    $r & 30 || gf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, pd(yf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ao(9, xf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ys(), t = fn.identifierPrefix;
  if (Bt) {
    var n = As, r = Ts;
    n = (r & ~(1 << 32 - ds(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = oo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = S0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, A0 = {
  readContext: rs,
  useCallback: Sf,
  useContext: rs,
  useEffect: lu,
  useImperativeHandle: Ef,
  useInsertionEffect: wf,
  useLayoutEffect: jf,
  useMemo: bf,
  useReducer: pa,
  useRef: kf,
  useState: function() {
    return pa(io);
  },
  useDebugValue: ou,
  useDeferredValue: function(e) {
    var t = ls();
    return Mf(t, on.memoizedState, e);
  },
  useTransition: function() {
    var e = pa(io)[0], t = ls().memoizedState;
    return [e, t];
  },
  useMutableSource: pf,
  useSyncExternalStore: mf,
  useId: If,
  unstable_isNewReconciler: !1
}, R0 = { readContext: rs, useCallback: Sf, useContext: rs, useEffect: lu, useImperativeHandle: Ef, useInsertionEffect: wf, useLayoutEffect: jf, useMemo: bf, useReducer: ma, useRef: kf, useState: function() {
  return ma(io);
}, useDebugValue: ou, useDeferredValue: function(e) {
  var t = ls();
  return on === null ? t.memoizedState = e : Mf(t, on.memoizedState, e);
}, useTransition: function() {
  var e = ma(io)[0], t = ls().memoizedState;
  return [e, t];
}, useMutableSource: pf, useSyncExternalStore: mf, useId: If, unstable_isNewReconciler: !1 };
function is(e, t) {
  if (e && e.defaultProps) {
    t = Kt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function sc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Kt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Li = { isMounted: function(e) {
  return (e = e._reactInternals) ? Pr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = An(), l = ur(e), o = Rs(r, l);
  o.payload = t, n != null && (o.callback = n), t = ar(e, o, l), t !== null && (hs(t, e, l, r), Vo(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = An(), l = ur(e), o = Rs(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ar(e, o, l), t !== null && (hs(t, e, l, r), Vo(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = An(), r = ur(e), l = Rs(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ar(e, l, r), t !== null && (hs(t, e, r, n), Vo(t, e, r));
} };
function md(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !eo(n, r) || !eo(l, o) : !0;
}
function $f(e, t, n) {
  var r = !1, l = fr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = rs(o) : (l = Wn(t) ? Ar : jn.current, r = t.contextTypes, o = (r = r != null) ? fl(e, l) : fr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Li, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function gd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Li.enqueueReplaceState(t, t.state, null);
}
function rc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Zc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = rs(o) : (o = Wn(t) ? Ar : jn.current, l.context = fl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (sc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Li.enqueueReplaceState(l, l.state, null), gi(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function xl(e, t) {
  try {
    var n = "", r = t;
    do
      n += om(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ga(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function lc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var $0 = typeof WeakMap == "function" ? WeakMap : Map;
function Lf(e, t, n) {
  n = Rs(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ki || (ki = !0, mc = r), lc(e, t);
  }, n;
}
function Of(e, t, n) {
  n = Rs(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      lc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    lc(e, t), typeof r != "function" && (cr === null ? cr = /* @__PURE__ */ new Set([this]) : cr.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function xd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new $0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Y0.bind(null, e, t, n), t.then(e, e));
}
function yd(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function vd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Rs(-1, 1), t.tag = 2, ar(n, t, 1))), n.lanes |= 1), e);
}
var L0 = _s.ReactCurrentOwner, Fn = !1;
function Tn(e, t, n, r) {
  t.child = e === null ? uf(t, null, n, r) : ml(t, e.child, n, r);
}
function Nd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return il(t, l), r = su(e, t, n, r, o, l), n = ru(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ps(e, t, l)) : (Bt && n && Vc(t), t.flags |= 1, Tn(e, t, r, l), t.child);
}
function kd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !pu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Df(e, t, o, r, l)) : (e = Jo(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : eo, n(i, r) && e.ref === t.ref) return Ps(e, t, l);
  }
  return t.flags |= 1, e = dr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Df(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (eo(o, r) && e.ref === t.ref) if (Fn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Fn = !0);
    else return t.lanes = e.lanes, Ps(e, t, l);
  }
  return oc(e, t, n, r, l);
}
function Pf(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ot(tl, Hn), Hn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ot(tl, Hn), Hn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Ot(tl, Hn), Hn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Ot(tl, Hn), Hn |= r;
  return Tn(e, t, l, n), t.child;
}
function _f(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function oc(e, t, n, r, l) {
  var o = Wn(n) ? Ar : jn.current;
  return o = fl(t, o), il(t, l), n = su(e, t, n, r, o, l), r = ru(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ps(e, t, l)) : (Bt && r && Vc(t), t.flags |= 1, Tn(e, t, n, l), t.child);
}
function wd(e, t, n, r, l) {
  if (Wn(n)) {
    var o = !0;
    di(t);
  } else o = !1;
  if (il(t, l), t.stateNode === null) Go(e, t), $f(t, n, r), rc(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = rs(d) : (d = Wn(n) ? Ar : jn.current, d = fl(t, d));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== d) && gd(t, i, r, d), Qs = !1;
    var g = t.memoizedState;
    i.state = g, gi(t, r, i, l), c = t.memoizedState, a !== r || g !== c || Bn.current || Qs ? (typeof v == "function" && (sc(t, n, v, r), c = t.memoizedState), (a = Qs || md(t, n, a, r, g, c, d)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = d, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, hf(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : is(t.type, a), i.props = d, m = t.pendingProps, g = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = rs(c) : (c = Wn(n) ? Ar : jn.current, c = fl(t, c));
    var N = n.getDerivedStateFromProps;
    (v = typeof N == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== m || g !== c) && gd(t, i, r, c), Qs = !1, g = t.memoizedState, i.state = g, gi(t, r, i, l);
    var C = t.memoizedState;
    a !== m || g !== C || Bn.current || Qs ? (typeof N == "function" && (sc(t, n, N, r), C = t.memoizedState), (d = Qs || md(t, n, d, r, g, C, c) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, C, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, C, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = C), i.props = r, i.state = C, i.context = c, r = d) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return ic(e, t, n, r, o, l);
}
function ic(e, t, n, r, l, o) {
  _f(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && id(t, n, !1), Ps(e, t, o);
  r = t.stateNode, L0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = ml(t, e.child, null, o), t.child = ml(t, null, a, o)) : Tn(e, t, a, o), t.memoizedState = r.state, l && id(t, n, !0), t.child;
}
function Ff(e) {
  var t = e.stateNode;
  t.pendingContext ? od(e, t.pendingContext, t.pendingContext !== t.context) : t.context && od(e, t.context, !1), qc(e, t.containerInfo);
}
function jd(e, t, n, r, l) {
  return pl(), Yc(l), t.flags |= 256, Tn(e, t, n, r), t.child;
}
var ac = { dehydrated: null, treeContext: null, retryLane: 0 };
function cc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Bf(e, t, n) {
  var r = t.pendingProps, l = Ht.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ot(Ht, l & 1), e === null)
    return tc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Pi(i, r, 0, null), e = Tr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = cc(n), t.memoizedState = ac, e) : iu(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return O0(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = dr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = dr(a, o) : (o = Tr(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? cc(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = ac, r;
  }
  return o = e.child, e = o.sibling, r = dr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function iu(e, t) {
  return t = Pi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Lo(e, t, n, r) {
  return r !== null && Yc(r), ml(t, e.child, null, n), e = iu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function O0(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ga(Error(xe(422))), Lo(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Pi({ mode: "visible", children: r.children }, l, 0, null), o = Tr(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && ml(t, e.child, null, i), t.child.memoizedState = cc(i), t.memoizedState = ac, o);
  if (!(t.mode & 1)) return Lo(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(xe(419)), r = ga(o, r, void 0), Lo(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, Fn || a) {
    if (r = fn, r !== null) {
      switch (i & -i) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ds(e, l), hs(r, e, l, -1));
    }
    return fu(), r = ga(Error(xe(421))), Lo(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = G0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Kn = ir(l.nextSibling), Yn = t, Bt = !0, cs = null, e !== null && (es[ts++] = Ts, es[ts++] = As, es[ts++] = Rr, Ts = e.id, As = e.overflow, Rr = t), t = iu(t, r.children), t.flags |= 4096, t);
}
function Cd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), nc(e.return, t, n);
}
function xa(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Wf(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Tn(e, t, r.children, n), r = Ht.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Cd(e, n, t);
      else if (e.tag === 19) Cd(e, n, t);
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
  if (Ot(Ht, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && xi(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), xa(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && xi(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      xa(t, !0, n, null, o);
      break;
    case "together":
      xa(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Go(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ps(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Lr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(xe(153));
  if (t.child !== null) {
    for (e = t.child, n = dr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = dr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function D0(e, t, n) {
  switch (t.tag) {
    case 3:
      Ff(t), pl();
      break;
    case 5:
      ff(t);
      break;
    case 1:
      Wn(t.type) && di(t);
      break;
    case 4:
      qc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Ot(pi, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Ot(Ht, Ht.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Bf(e, t, n) : (Ot(Ht, Ht.current & 1), e = Ps(e, t, n), e !== null ? e.sibling : null);
      Ot(Ht, Ht.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Wf(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Ot(Ht, Ht.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Pf(e, t, n);
  }
  return Ps(e, t, n);
}
var Uf, uc, zf, Hf;
Uf = function(e, t) {
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
uc = function() {
};
zf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Sr(ws.current);
    var o = null;
    switch (n) {
      case "input":
        l = Ra(e, l), r = Ra(e, r), o = [];
        break;
      case "select":
        l = Kt({}, l, { value: void 0 }), r = Kt({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Oa(e, l), r = Oa(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ci);
    }
    Pa(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var a = l[d];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Yl.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (a = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== a && (c != null || a != null)) if (d === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Yl.hasOwnProperty(d) ? (c != null && d === "onScroll" && Dt("scroll", e), o || a === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Hf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Tl(e, t) {
  if (!Bt) switch (e.tailMode) {
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
function kn(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function P0(e, t, n) {
  var r = t.pendingProps;
  switch (Kc(t), t.tag) {
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
      return kn(t), null;
    case 1:
      return Wn(t.type) && ui(), kn(t), null;
    case 3:
      return r = t.stateNode, gl(), Pt(Bn), Pt(jn), tu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ro(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, cs !== null && (yc(cs), cs = null))), uc(e, t), kn(t), null;
    case 5:
      eu(t);
      var l = Sr(lo.current);
      if (n = t.type, e !== null && t.stateNode != null) zf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(xe(166));
          return kn(t), null;
        }
        if (e = Sr(ws.current), Ro(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[vs] = t, r[so] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Dt("cancel", r), Dt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Dt("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Pl.length; l++) Dt(Pl[l], r);
              break;
            case "source":
              Dt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Dt(
                "error",
                r
              ), Dt("load", r);
              break;
            case "details":
              Dt("toggle", r);
              break;
            case "input":
              $u(r, o), Dt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Dt("invalid", r);
              break;
            case "textarea":
              Ou(r, o), Dt("invalid", r);
          }
          Pa(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && Ao(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && Ao(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Yl.hasOwnProperty(i) && a != null && i === "onScroll" && Dt("scroll", r);
          }
          switch (n) {
            case "input":
              jo(r), Lu(r, o, !0);
              break;
            case "textarea":
              jo(r), Du(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ci);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = xh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[vs] = t, e[so] = r, Uf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = _a(n, r), n) {
              case "dialog":
                Dt("cancel", e), Dt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Dt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Pl.length; l++) Dt(Pl[l], e);
                l = r;
                break;
              case "source":
                Dt("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Dt(
                  "error",
                  e
                ), Dt("load", e), l = r;
                break;
              case "details":
                Dt("toggle", e), l = r;
                break;
              case "input":
                $u(e, r), l = Ra(e, r), Dt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Kt({}, r, { value: void 0 }), Dt("invalid", e);
                break;
              case "textarea":
                Ou(e, r), l = Oa(e, r), Dt("invalid", e);
                break;
              default:
                l = r;
            }
            Pa(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var c = a[o];
              o === "style" ? Nh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && yh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Gl(e, c) : typeof c == "number" && Gl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Yl.hasOwnProperty(o) ? c != null && o === "onScroll" && Dt("scroll", e) : c != null && Ac(e, o, c, i));
            }
            switch (n) {
              case "input":
                jo(e), Lu(e, r, !1);
                break;
              case "textarea":
                jo(e), Du(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + hr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? sl(e, !!r.multiple, o, !1) : r.defaultValue != null && sl(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ci);
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
      return kn(t), null;
    case 6:
      if (e && t.stateNode != null) Hf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(xe(166));
        if (n = Sr(lo.current), Sr(ws.current), Ro(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[vs] = t, (o = r.nodeValue !== n) && (e = Yn, e !== null)) switch (e.tag) {
            case 3:
              Ao(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ao(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[vs] = t, t.stateNode = r;
      }
      return kn(t), null;
    case 13:
      if (Pt(Ht), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Bt && Kn !== null && t.mode & 1 && !(t.flags & 128)) af(), pl(), t.flags |= 98560, o = !1;
        else if (o = Ro(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(xe(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(xe(317));
            o[vs] = t;
          } else pl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          kn(t), o = !1;
        } else cs !== null && (yc(cs), cs = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ht.current & 1 ? an === 0 && (an = 3) : fu())), t.updateQueue !== null && (t.flags |= 4), kn(t), null);
    case 4:
      return gl(), uc(e, t), e === null && to(t.stateNode.containerInfo), kn(t), null;
    case 10:
      return Qc(t.type._context), kn(t), null;
    case 17:
      return Wn(t.type) && ui(), kn(t), null;
    case 19:
      if (Pt(Ht), o = t.memoizedState, o === null) return kn(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Tl(o, !1);
      else {
        if (an !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = xi(e), i !== null) {
            for (t.flags |= 128, Tl(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Ot(Ht, Ht.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && qt() > yl && (t.flags |= 128, r = !0, Tl(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = xi(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Tl(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Bt) return kn(t), null;
        } else 2 * qt() - o.renderingStartTime > yl && n !== 1073741824 && (t.flags |= 128, r = !0, Tl(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = qt(), t.sibling = null, n = Ht.current, Ot(Ht, r ? n & 1 | 2 : n & 1), t) : (kn(t), null);
    case 22:
    case 23:
      return hu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Hn & 1073741824 && (kn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : kn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(xe(156, t.tag));
}
function _0(e, t) {
  switch (Kc(t), t.tag) {
    case 1:
      return Wn(t.type) && ui(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return gl(), Pt(Bn), Pt(jn), tu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return eu(t), null;
    case 13:
      if (Pt(Ht), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(xe(340));
        pl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Pt(Ht), null;
    case 4:
      return gl(), null;
    case 10:
      return Qc(t.type._context), null;
    case 22:
    case 23:
      return hu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Oo = !1, wn = !1, F0 = typeof WeakSet == "function" ? WeakSet : Set, _e = null;
function el(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Xt(e, t, r);
  }
  else n.current = null;
}
function dc(e, t, n) {
  try {
    n();
  } catch (r) {
    Xt(e, t, r);
  }
}
var Ed = !1;
function B0(e, t) {
  if (Ga = oi, e = Gh(), Hc(e)) {
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
        var i = 0, a = -1, c = -1, d = 0, v = 0, m = e, g = null;
        t: for (; ; ) {
          for (var N; m !== n || l !== 0 && m.nodeType !== 3 || (a = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (c = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (N = m.firstChild) !== null; )
            g = m, m = N;
          for (; ; ) {
            if (m === e) break t;
            if (g === n && ++d === l && (a = i), g === o && ++v === r && (c = i), (N = m.nextSibling) !== null) break;
            m = g, g = m.parentNode;
          }
          m = N;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Xa = { focusedElem: e, selectionRange: n }, oi = !1, _e = t; _e !== null; ) if (t = _e, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, _e = e;
  else for (; _e !== null; ) {
    t = _e;
    try {
      var C = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (C !== null) {
            var b = C.memoizedProps, P = C.memoizedState, k = t.stateNode, p = k.getSnapshotBeforeUpdate(t.elementType === t.type ? b : is(t.type, b), P);
            k.__reactInternalSnapshotBeforeUpdate = p;
          }
          break;
        case 3:
          var h = t.stateNode.containerInfo;
          h.nodeType === 1 ? h.textContent = "" : h.nodeType === 9 && h.documentElement && h.removeChild(h.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(xe(163));
      }
    } catch (M) {
      Xt(t, t.return, M);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, _e = e;
      break;
    }
    _e = t.return;
  }
  return C = Ed, Ed = !1, C;
}
function Hl(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && dc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Oi(e, t) {
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
function hc(e) {
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
function Vf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Vf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[vs], delete t[so], delete t[Za], delete t[w0], delete t[j0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Kf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Sd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Kf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function fc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ci));
  else if (r !== 4 && (e = e.child, e !== null)) for (fc(e, t, n), e = e.sibling; e !== null; ) fc(e, t, n), e = e.sibling;
}
function pc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (pc(e, t, n), e = e.sibling; e !== null; ) pc(e, t, n), e = e.sibling;
}
var gn = null, as = !1;
function Ks(e, t, n) {
  for (n = n.child; n !== null; ) Yf(e, t, n), n = n.sibling;
}
function Yf(e, t, n) {
  if (ks && typeof ks.onCommitFiberUnmount == "function") try {
    ks.onCommitFiberUnmount(bi, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      wn || el(n, t);
    case 6:
      var r = gn, l = as;
      gn = null, Ks(e, t, n), gn = r, as = l, gn !== null && (as ? (e = gn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : gn.removeChild(n.stateNode));
      break;
    case 18:
      gn !== null && (as ? (e = gn, n = n.stateNode, e.nodeType === 8 ? ua(e.parentNode, n) : e.nodeType === 1 && ua(e, n), Zl(e)) : ua(gn, n.stateNode));
      break;
    case 4:
      r = gn, l = as, gn = n.stateNode.containerInfo, as = !0, Ks(e, t, n), gn = r, as = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!wn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && dc(n, t, i), l = l.next;
        } while (l !== r);
      }
      Ks(e, t, n);
      break;
    case 1:
      if (!wn && (el(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Xt(n, t, a);
      }
      Ks(e, t, n);
      break;
    case 21:
      Ks(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (wn = (r = wn) || n.memoizedState !== null, Ks(e, t, n), wn = r) : Ks(e, t, n);
      break;
    default:
      Ks(e, t, n);
  }
}
function bd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new F0()), t.forEach(function(r) {
      var l = X0.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function os(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            gn = a.stateNode, as = !1;
            break e;
          case 3:
            gn = a.stateNode.containerInfo, as = !0;
            break e;
          case 4:
            gn = a.stateNode.containerInfo, as = !0;
            break e;
        }
        a = a.return;
      }
      if (gn === null) throw Error(xe(160));
      Yf(o, i, l), gn = null, as = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      Xt(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Gf(t, e), t = t.sibling;
}
function Gf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (os(t, e), xs(e), r & 4) {
        try {
          Hl(3, e, e.return), Oi(3, e);
        } catch (b) {
          Xt(e, e.return, b);
        }
        try {
          Hl(5, e, e.return);
        } catch (b) {
          Xt(e, e.return, b);
        }
      }
      break;
    case 1:
      os(t, e), xs(e), r & 512 && n !== null && el(n, n.return);
      break;
    case 5:
      if (os(t, e), xs(e), r & 512 && n !== null && el(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Gl(l, "");
        } catch (b) {
          Xt(e, e.return, b);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && o.type === "radio" && o.name != null && mh(l, o), _a(a, i);
          var d = _a(a, o);
          for (i = 0; i < c.length; i += 2) {
            var v = c[i], m = c[i + 1];
            v === "style" ? Nh(l, m) : v === "dangerouslySetInnerHTML" ? yh(l, m) : v === "children" ? Gl(l, m) : Ac(l, v, m, d);
          }
          switch (a) {
            case "input":
              $a(l, o);
              break;
            case "textarea":
              gh(l, o);
              break;
            case "select":
              var g = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var N = o.value;
              N != null ? sl(l, !!o.multiple, N, !1) : g !== !!o.multiple && (o.defaultValue != null ? sl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : sl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[so] = o;
        } catch (b) {
          Xt(e, e.return, b);
        }
      }
      break;
    case 6:
      if (os(t, e), xs(e), r & 4) {
        if (e.stateNode === null) throw Error(xe(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (b) {
          Xt(e, e.return, b);
        }
      }
      break;
    case 3:
      if (os(t, e), xs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Zl(t.containerInfo);
      } catch (b) {
        Xt(e, e.return, b);
      }
      break;
    case 4:
      os(t, e), xs(e);
      break;
    case 13:
      os(t, e), xs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (uu = qt())), r & 4 && bd(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (wn = (d = wn) || v, os(t, e), wn = d) : os(t, e), xs(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (_e = e, v = e.child; v !== null; ) {
          for (m = _e = v; _e !== null; ) {
            switch (g = _e, N = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Hl(4, g, g.return);
                break;
              case 1:
                el(g, g.return);
                var C = g.stateNode;
                if (typeof C.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, C.props = t.memoizedProps, C.state = t.memoizedState, C.componentWillUnmount();
                  } catch (b) {
                    Xt(r, n, b);
                  }
                }
                break;
              case 5:
                el(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  Id(m);
                  continue;
                }
            }
            N !== null ? (N.return = g, _e = N) : Id(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = m.stateNode, c = m.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = vh("display", i));
              } catch (b) {
                Xt(e, e.return, b);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = d ? "" : m.memoizedProps;
            } catch (b) {
              Xt(e, e.return, b);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            v === m && (v = null), m = m.return;
          }
          v === m && (v = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      os(t, e), xs(e), r & 4 && bd(e);
      break;
    case 21:
      break;
    default:
      os(
        t,
        e
      ), xs(e);
  }
}
function xs(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Kf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(xe(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Gl(l, ""), r.flags &= -33);
          var o = Sd(e);
          pc(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = Sd(e);
          fc(e, a, i);
          break;
        default:
          throw Error(xe(161));
      }
    } catch (c) {
      Xt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function W0(e, t, n) {
  _e = e, Xf(e);
}
function Xf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; _e !== null; ) {
    var l = _e, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Oo;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || wn;
        a = Oo;
        var d = wn;
        if (Oo = i, (wn = c) && !d) for (_e = l; _e !== null; ) i = _e, c = i.child, i.tag === 22 && i.memoizedState !== null ? Td(l) : c !== null ? (c.return = i, _e = c) : Td(l);
        for (; o !== null; ) _e = o, Xf(o), o = o.sibling;
        _e = l, Oo = a, wn = d;
      }
      Md(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, _e = o) : Md(e);
  }
}
function Md(e) {
  for (; _e !== null; ) {
    var t = _e;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            wn || Oi(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !wn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : is(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && hd(t, o, r);
            break;
          case 3:
            var i = t.updateQueue;
            if (i !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              hd(t, i, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
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
                  var m = v.dehydrated;
                  m !== null && Zl(m);
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
            throw Error(xe(163));
        }
        wn || t.flags & 512 && hc(t);
      } catch (g) {
        Xt(t, t.return, g);
      }
    }
    if (t === e) {
      _e = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, _e = n;
      break;
    }
    _e = t.return;
  }
}
function Id(e) {
  for (; _e !== null; ) {
    var t = _e;
    if (t === e) {
      _e = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, _e = n;
      break;
    }
    _e = t.return;
  }
}
function Td(e) {
  for (; _e !== null; ) {
    var t = _e;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Oi(4, t);
          } catch (c) {
            Xt(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              Xt(t, l, c);
            }
          }
          var o = t.return;
          try {
            hc(t);
          } catch (c) {
            Xt(t, o, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            hc(t);
          } catch (c) {
            Xt(t, i, c);
          }
      }
    } catch (c) {
      Xt(t, t.return, c);
    }
    if (t === e) {
      _e = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, _e = a;
      break;
    }
    _e = t.return;
  }
}
var U0 = Math.ceil, Ni = _s.ReactCurrentDispatcher, au = _s.ReactCurrentOwner, ss = _s.ReactCurrentBatchConfig, wt = 0, fn = null, rn = null, xn = 0, Hn = 0, tl = mr(0), an = 0, co = null, Lr = 0, Di = 0, cu = 0, Vl = null, _n = null, uu = 0, yl = 1 / 0, bs = null, ki = !1, mc = null, cr = null, Do = !1, sr = null, wi = 0, Kl = 0, gc = null, Xo = -1, Qo = 0;
function An() {
  return wt & 6 ? qt() : Xo !== -1 ? Xo : Xo = qt();
}
function ur(e) {
  return e.mode & 1 ? wt & 2 && xn !== 0 ? xn & -xn : E0.transition !== null ? (Qo === 0 && (Qo = Rh()), Qo) : (e = It, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Fh(e.type)), e) : 1;
}
function hs(e, t, n, r) {
  if (50 < Kl) throw Kl = 0, gc = null, Error(xe(185));
  po(e, n, r), (!(wt & 2) || e !== fn) && (e === fn && (!(wt & 2) && (Di |= n), an === 4 && er(e, xn)), Un(e, r), n === 1 && wt === 0 && !(t.mode & 1) && (yl = qt() + 500, Ri && gr()));
}
function Un(e, t) {
  var n = e.callbackNode;
  Em(e, t);
  var r = li(e, e === fn ? xn : 0);
  if (r === 0) n !== null && Fu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Fu(n), t === 1) e.tag === 0 ? C0(Ad.bind(null, e)) : rf(Ad.bind(null, e)), N0(function() {
      !(wt & 6) && gr();
    }), n = null;
    else {
      switch ($h(r)) {
        case 1:
          n = Dc;
          break;
        case 4:
          n = Th;
          break;
        case 16:
          n = ri;
          break;
        case 536870912:
          n = Ah;
          break;
        default:
          n = ri;
      }
      n = sp(n, Qf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Qf(e, t) {
  if (Xo = -1, Qo = 0, wt & 6) throw Error(xe(327));
  var n = e.callbackNode;
  if (al() && e.callbackNode !== n) return null;
  var r = li(e, e === fn ? xn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ji(e, r);
  else {
    t = r;
    var l = wt;
    wt |= 2;
    var o = Zf();
    (fn !== e || xn !== t) && (bs = null, yl = qt() + 500, Ir(e, t));
    do
      try {
        V0();
        break;
      } catch (a) {
        Jf(e, a);
      }
    while (!0);
    Xc(), Ni.current = o, wt = l, rn !== null ? t = 0 : (fn = null, xn = 0, t = an);
  }
  if (t !== 0) {
    if (t === 2 && (l = za(e), l !== 0 && (r = l, t = xc(e, l))), t === 1) throw n = co, Ir(e, 0), er(e, r), Un(e, qt()), n;
    if (t === 6) er(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !z0(l) && (t = ji(e, r), t === 2 && (o = za(e), o !== 0 && (r = o, t = xc(e, o))), t === 1)) throw n = co, Ir(e, 0), er(e, r), Un(e, qt()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(xe(345));
        case 2:
          wr(e, _n, bs);
          break;
        case 3:
          if (er(e, r), (r & 130023424) === r && (t = uu + 500 - qt(), 10 < t)) {
            if (li(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              An(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ja(wr.bind(null, e, _n, bs), t);
            break;
          }
          wr(e, _n, bs);
          break;
        case 4:
          if (er(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - ds(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = qt() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * U0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ja(wr.bind(null, e, _n, bs), r);
            break;
          }
          wr(e, _n, bs);
          break;
        case 5:
          wr(e, _n, bs);
          break;
        default:
          throw Error(xe(329));
      }
    }
  }
  return Un(e, qt()), e.callbackNode === n ? Qf.bind(null, e) : null;
}
function xc(e, t) {
  var n = Vl;
  return e.current.memoizedState.isDehydrated && (Ir(e, t).flags |= 256), e = ji(e, t), e !== 2 && (t = _n, _n = n, t !== null && yc(t)), e;
}
function yc(e) {
  _n === null ? _n = e : _n.push.apply(_n, e);
}
function z0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!fs(o(), l)) return !1;
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
function er(e, t) {
  for (t &= ~cu, t &= ~Di, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ds(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Ad(e) {
  if (wt & 6) throw Error(xe(327));
  al();
  var t = li(e, 0);
  if (!(t & 1)) return Un(e, qt()), null;
  var n = ji(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = za(e);
    r !== 0 && (t = r, n = xc(e, r));
  }
  if (n === 1) throw n = co, Ir(e, 0), er(e, t), Un(e, qt()), n;
  if (n === 6) throw Error(xe(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, wr(e, _n, bs), Un(e, qt()), null;
}
function du(e, t) {
  var n = wt;
  wt |= 1;
  try {
    return e(t);
  } finally {
    wt = n, wt === 0 && (yl = qt() + 500, Ri && gr());
  }
}
function Or(e) {
  sr !== null && sr.tag === 0 && !(wt & 6) && al();
  var t = wt;
  wt |= 1;
  var n = ss.transition, r = It;
  try {
    if (ss.transition = null, It = 1, e) return e();
  } finally {
    It = r, ss.transition = n, wt = t, !(wt & 6) && gr();
  }
}
function hu() {
  Hn = tl.current, Pt(tl);
}
function Ir(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, v0(n)), rn !== null) for (n = rn.return; n !== null; ) {
    var r = n;
    switch (Kc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ui();
        break;
      case 3:
        gl(), Pt(Bn), Pt(jn), tu();
        break;
      case 5:
        eu(r);
        break;
      case 4:
        gl();
        break;
      case 13:
        Pt(Ht);
        break;
      case 19:
        Pt(Ht);
        break;
      case 10:
        Qc(r.type._context);
        break;
      case 22:
      case 23:
        hu();
    }
    n = n.return;
  }
  if (fn = e, rn = e = dr(e.current, null), xn = Hn = t, an = 0, co = null, cu = Di = Lr = 0, _n = Vl = null, Er !== null) {
    for (t = 0; t < Er.length; t++) if (n = Er[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    Er = null;
  }
  return e;
}
function Jf(e, t) {
  do {
    var n = rn;
    try {
      if (Xc(), Ko.current = vi, yi) {
        for (var r = Vt.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        yi = !1;
      }
      if ($r = 0, hn = on = Vt = null, zl = !1, oo = 0, au.current = null, n === null || n.return === null) {
        an = 1, co = t, rn = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, c = t;
        if (t = xn, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = a, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var g = v.alternate;
            g ? (v.updateQueue = g.updateQueue, v.memoizedState = g.memoizedState, v.lanes = g.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var N = yd(i);
          if (N !== null) {
            N.flags &= -257, vd(N, i, a, o, t), N.mode & 1 && xd(o, d, t), t = N, c = d;
            var C = t.updateQueue;
            if (C === null) {
              var b = /* @__PURE__ */ new Set();
              b.add(c), t.updateQueue = b;
            } else C.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              xd(o, d, t), fu();
              break e;
            }
            c = Error(xe(426));
          }
        } else if (Bt && a.mode & 1) {
          var P = yd(i);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256), vd(P, i, a, o, t), Yc(xl(c, a));
            break e;
          }
        }
        o = c = xl(c, a), an !== 4 && (an = 2), Vl === null ? Vl = [o] : Vl.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Lf(o, c, t);
              dd(o, k);
              break e;
            case 1:
              a = c;
              var p = o.type, h = o.stateNode;
              if (!(o.flags & 128) && (typeof p.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (cr === null || !cr.has(h)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var M = Of(o, a, t);
                dd(o, M);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      ep(n);
    } catch (E) {
      t = E, rn === n && n !== null && (rn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Zf() {
  var e = Ni.current;
  return Ni.current = vi, e === null ? vi : e;
}
function fu() {
  (an === 0 || an === 3 || an === 2) && (an = 4), fn === null || !(Lr & 268435455) && !(Di & 268435455) || er(fn, xn);
}
function ji(e, t) {
  var n = wt;
  wt |= 2;
  var r = Zf();
  (fn !== e || xn !== t) && (bs = null, Ir(e, t));
  do
    try {
      H0();
      break;
    } catch (l) {
      Jf(e, l);
    }
  while (!0);
  if (Xc(), wt = n, Ni.current = r, rn !== null) throw Error(xe(261));
  return fn = null, xn = 0, an;
}
function H0() {
  for (; rn !== null; ) qf(rn);
}
function V0() {
  for (; rn !== null && !gm(); ) qf(rn);
}
function qf(e) {
  var t = np(e.alternate, e, Hn);
  e.memoizedProps = e.pendingProps, t === null ? ep(e) : rn = t, au.current = null;
}
function ep(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = _0(n, t), n !== null) {
        n.flags &= 32767, rn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        an = 6, rn = null;
        return;
      }
    } else if (n = P0(n, t, Hn), n !== null) {
      rn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      rn = t;
      return;
    }
    rn = t = e;
  } while (t !== null);
  an === 0 && (an = 5);
}
function wr(e, t, n) {
  var r = It, l = ss.transition;
  try {
    ss.transition = null, It = 1, K0(e, t, n, r);
  } finally {
    ss.transition = l, It = r;
  }
  return null;
}
function K0(e, t, n, r) {
  do
    al();
  while (sr !== null);
  if (wt & 6) throw Error(xe(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(xe(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Sm(e, o), e === fn && (rn = fn = null, xn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Do || (Do = !0, sp(ri, function() {
    return al(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ss.transition, ss.transition = null;
    var i = It;
    It = 1;
    var a = wt;
    wt |= 4, au.current = null, B0(e, n), Gf(n, e), h0(Xa), oi = !!Ga, Xa = Ga = null, e.current = n, W0(n), xm(), wt = a, It = i, ss.transition = o;
  } else e.current = n;
  if (Do && (Do = !1, sr = e, wi = l), o = e.pendingLanes, o === 0 && (cr = null), Nm(n.stateNode), Un(e, qt()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ki) throw ki = !1, e = mc, mc = null, e;
  return wi & 1 && e.tag !== 0 && al(), o = e.pendingLanes, o & 1 ? e === gc ? Kl++ : (Kl = 0, gc = e) : Kl = 0, gr(), null;
}
function al() {
  if (sr !== null) {
    var e = $h(wi), t = ss.transition, n = It;
    try {
      if (ss.transition = null, It = 16 > e ? 16 : e, sr === null) var r = !1;
      else {
        if (e = sr, sr = null, wi = 0, wt & 6) throw Error(xe(331));
        var l = wt;
        for (wt |= 4, _e = e.current; _e !== null; ) {
          var o = _e, i = o.child;
          if (_e.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c];
                for (_e = d; _e !== null; ) {
                  var v = _e;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Hl(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, _e = m;
                  else for (; _e !== null; ) {
                    v = _e;
                    var g = v.sibling, N = v.return;
                    if (Vf(v), v === d) {
                      _e = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = N, _e = g;
                      break;
                    }
                    _e = N;
                  }
                }
              }
              var C = o.alternate;
              if (C !== null) {
                var b = C.child;
                if (b !== null) {
                  C.child = null;
                  do {
                    var P = b.sibling;
                    b.sibling = null, b = P;
                  } while (b !== null);
                }
              }
              _e = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, _e = i;
          else e: for (; _e !== null; ) {
            if (o = _e, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Hl(9, o, o.return);
            }
            var k = o.sibling;
            if (k !== null) {
              k.return = o.return, _e = k;
              break e;
            }
            _e = o.return;
          }
        }
        var p = e.current;
        for (_e = p; _e !== null; ) {
          i = _e;
          var h = i.child;
          if (i.subtreeFlags & 2064 && h !== null) h.return = i, _e = h;
          else e: for (i = p; _e !== null; ) {
            if (a = _e, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Oi(9, a);
              }
            } catch (E) {
              Xt(a, a.return, E);
            }
            if (a === i) {
              _e = null;
              break e;
            }
            var M = a.sibling;
            if (M !== null) {
              M.return = a.return, _e = M;
              break e;
            }
            _e = a.return;
          }
        }
        if (wt = l, gr(), ks && typeof ks.onPostCommitFiberRoot == "function") try {
          ks.onPostCommitFiberRoot(bi, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      It = n, ss.transition = t;
    }
  }
  return !1;
}
function Rd(e, t, n) {
  t = xl(n, t), t = Lf(e, t, 1), e = ar(e, t, 1), t = An(), e !== null && (po(e, 1, t), Un(e, t));
}
function Xt(e, t, n) {
  if (e.tag === 3) Rd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Rd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (cr === null || !cr.has(r))) {
        e = xl(n, e), e = Of(t, e, 1), t = ar(t, e, 1), e = An(), t !== null && (po(t, 1, e), Un(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Y0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = An(), e.pingedLanes |= e.suspendedLanes & n, fn === e && (xn & n) === n && (an === 4 || an === 3 && (xn & 130023424) === xn && 500 > qt() - uu ? Ir(e, 0) : cu |= n), Un(e, t);
}
function tp(e, t) {
  t === 0 && (e.mode & 1 ? (t = So, So <<= 1, !(So & 130023424) && (So = 4194304)) : t = 1);
  var n = An();
  e = Ds(e, t), e !== null && (po(e, t, n), Un(e, n));
}
function G0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), tp(e, n);
}
function X0(e, t) {
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
      throw Error(xe(314));
  }
  r !== null && r.delete(t), tp(e, n);
}
var np;
np = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Bn.current) Fn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Fn = !1, D0(e, t, n);
    Fn = !!(e.flags & 131072);
  }
  else Fn = !1, Bt && t.flags & 1048576 && lf(t, fi, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Go(e, t), e = t.pendingProps;
      var l = fl(t, jn.current);
      il(t, n), l = su(null, t, r, e, l, n);
      var o = ru();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Wn(r) ? (o = !0, di(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Zc(t), l.updater = Li, t.stateNode = l, l._reactInternals = t, rc(t, r, e, n), t = ic(null, t, r, !0, o, n)) : (t.tag = 0, Bt && o && Vc(t), Tn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Go(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = J0(r), e = is(r, e), l) {
          case 0:
            t = oc(null, t, r, e, n);
            break e;
          case 1:
            t = wd(null, t, r, e, n);
            break e;
          case 11:
            t = Nd(null, t, r, e, n);
            break e;
          case 14:
            t = kd(null, t, r, is(r.type, e), n);
            break e;
        }
        throw Error(xe(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), oc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), wd(e, t, r, l, n);
    case 3:
      e: {
        if (Ff(t), e === null) throw Error(xe(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, hf(e, t), gi(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = xl(Error(xe(423)), t), t = jd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = xl(Error(xe(424)), t), t = jd(e, t, r, n, l);
          break e;
        } else for (Kn = ir(t.stateNode.containerInfo.firstChild), Yn = t, Bt = !0, cs = null, n = uf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (pl(), r === l) {
            t = Ps(e, t, n);
            break e;
          }
          Tn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ff(t), e === null && tc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Qa(r, l) ? i = null : o !== null && Qa(r, o) && (t.flags |= 32), _f(e, t), Tn(e, t, i, n), t.child;
    case 6:
      return e === null && tc(t), null;
    case 13:
      return Bf(e, t, n);
    case 4:
      return qc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ml(t, null, r, n) : Tn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), Nd(e, t, r, l, n);
    case 7:
      return Tn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Tn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Tn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Ot(pi, r._currentValue), r._currentValue = i, o !== null) if (fs(o.value, i)) {
          if (o.children === l.children && !Bn.current) {
            t = Ps(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            i = o.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = Rs(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), nc(
                  o.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(xe(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), nc(i, n, t), i = o.sibling;
          } else i = o.child;
          if (i !== null) i.return = o;
          else for (i = o; i !== null; ) {
            if (i === t) {
              i = null;
              break;
            }
            if (o = i.sibling, o !== null) {
              o.return = i.return, i = o;
              break;
            }
            i = i.return;
          }
          o = i;
        }
        Tn(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, il(t, n), l = rs(l), r = r(l), t.flags |= 1, Tn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = is(r, t.pendingProps), l = is(r.type, l), kd(e, t, r, l, n);
    case 15:
      return Df(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), Go(e, t), t.tag = 1, Wn(r) ? (e = !0, di(t)) : e = !1, il(t, n), $f(t, r, l), rc(t, r, l, n), ic(null, t, r, !0, e, n);
    case 19:
      return Wf(e, t, n);
    case 22:
      return Pf(e, t, n);
  }
  throw Error(xe(156, t.tag));
};
function sp(e, t) {
  return Ih(e, t);
}
function Q0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ns(e, t, n, r) {
  return new Q0(e, t, n, r);
}
function pu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function J0(e) {
  if (typeof e == "function") return pu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === $c) return 11;
    if (e === Lc) return 14;
  }
  return 2;
}
function dr(e, t) {
  var n = e.alternate;
  return n === null ? (n = ns(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Jo(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") pu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Vr:
      return Tr(n.children, l, o, t);
    case Rc:
      i = 8, l |= 8;
      break;
    case Ma:
      return e = ns(12, n, t, l | 2), e.elementType = Ma, e.lanes = o, e;
    case Ia:
      return e = ns(13, n, t, l), e.elementType = Ia, e.lanes = o, e;
    case Ta:
      return e = ns(19, n, t, l), e.elementType = Ta, e.lanes = o, e;
    case hh:
      return Pi(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case uh:
          i = 10;
          break e;
        case dh:
          i = 9;
          break e;
        case $c:
          i = 11;
          break e;
        case Lc:
          i = 14;
          break e;
        case Xs:
          i = 16, r = null;
          break e;
      }
      throw Error(xe(130, e == null ? e : typeof e, ""));
  }
  return t = ns(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Tr(e, t, n, r) {
  return e = ns(7, e, r, t), e.lanes = n, e;
}
function Pi(e, t, n, r) {
  return e = ns(22, e, r, t), e.elementType = hh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ya(e, t, n) {
  return e = ns(6, e, null, t), e.lanes = n, e;
}
function va(e, t, n) {
  return t = ns(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Z0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = qi(0), this.expirationTimes = qi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function mu(e, t, n, r, l, o, i, a, c) {
  return e = new Z0(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ns(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Zc(o), e;
}
function q0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Hr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function rp(e) {
  if (!e) return fr;
  e = e._reactInternals;
  e: {
    if (Pr(e) !== e || e.tag !== 1) throw Error(xe(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Wn(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(xe(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Wn(n)) return sf(e, n, t);
  }
  return t;
}
function lp(e, t, n, r, l, o, i, a, c) {
  return e = mu(n, r, !0, e, l, o, i, a, c), e.context = rp(null), n = e.current, r = An(), l = ur(n), o = Rs(r, l), o.callback = t ?? null, ar(n, o, l), e.current.lanes = l, po(e, l, r), Un(e, r), e;
}
function _i(e, t, n, r) {
  var l = t.current, o = An(), i = ur(l);
  return n = rp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Rs(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ar(l, t, i), e !== null && (hs(e, l, i, o), Vo(e, l, i)), i;
}
function Ci(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function $d(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function gu(e, t) {
  $d(e, t), (e = e.alternate) && $d(e, t);
}
function eg() {
  return null;
}
var op = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function xu(e) {
  this._internalRoot = e;
}
Fi.prototype.render = xu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(xe(409));
  _i(e, t, null, null);
};
Fi.prototype.unmount = xu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Or(function() {
      _i(null, e, null, null);
    }), t[Os] = null;
  }
};
function Fi(e) {
  this._internalRoot = e;
}
Fi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Dh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < qs.length && t !== 0 && t < qs[n].priority; n++) ;
    qs.splice(n, 0, e), n === 0 && _h(e);
  }
};
function yu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Bi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ld() {
}
function tg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = Ci(i);
        o.call(d);
      };
    }
    var i = lp(t, r, e, 0, null, !1, !1, "", Ld);
    return e._reactRootContainer = i, e[Os] = i.current, to(e.nodeType === 8 ? e.parentNode : e), Or(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var d = Ci(c);
      a.call(d);
    };
  }
  var c = mu(e, 0, !1, null, null, !1, !1, "", Ld);
  return e._reactRootContainer = c, e[Os] = c.current, to(e.nodeType === 8 ? e.parentNode : e), Or(function() {
    _i(t, c, n, r);
  }), c;
}
function Wi(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = Ci(i);
        a.call(c);
      };
    }
    _i(t, i, e, l);
  } else i = tg(n, t, e, l, r);
  return Ci(i);
}
Lh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Dl(t.pendingLanes);
        n !== 0 && (Pc(t, n | 1), Un(t, qt()), !(wt & 6) && (yl = qt() + 500, gr()));
      }
      break;
    case 13:
      Or(function() {
        var r = Ds(e, 1);
        if (r !== null) {
          var l = An();
          hs(r, e, 1, l);
        }
      }), gu(e, 1);
  }
};
_c = function(e) {
  if (e.tag === 13) {
    var t = Ds(e, 134217728);
    if (t !== null) {
      var n = An();
      hs(t, e, 134217728, n);
    }
    gu(e, 134217728);
  }
};
Oh = function(e) {
  if (e.tag === 13) {
    var t = ur(e), n = Ds(e, t);
    if (n !== null) {
      var r = An();
      hs(n, e, t, r);
    }
    gu(e, t);
  }
};
Dh = function() {
  return It;
};
Ph = function(e, t) {
  var n = It;
  try {
    return It = e, t();
  } finally {
    It = n;
  }
};
Ba = function(e, t, n) {
  switch (t) {
    case "input":
      if ($a(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ai(r);
            if (!l) throw Error(xe(90));
            ph(r), $a(r, l);
          }
        }
      }
      break;
    case "textarea":
      gh(e, n);
      break;
    case "select":
      t = n.value, t != null && sl(e, !!n.multiple, t, !1);
  }
};
jh = du;
Ch = Or;
var ng = { usingClientEntryPoint: !1, Events: [go, Xr, Ai, kh, wh, du] }, Al = { findFiberByHostInstance: Cr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, sg = { bundleType: Al.bundleType, version: Al.version, rendererPackageName: Al.rendererPackageName, rendererConfig: Al.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: _s.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = bh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Al.findFiberByHostInstance || eg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Po = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Po.isDisabled && Po.supportsFiber) try {
    bi = Po.inject(sg), ks = Po;
  } catch {
  }
}
Xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ng;
Xn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!yu(t)) throw Error(xe(200));
  return q0(e, t, null, n);
};
Xn.createRoot = function(e, t) {
  if (!yu(e)) throw Error(xe(299));
  var n = !1, r = "", l = op;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = mu(e, 1, !1, null, null, n, !1, r, l), e[Os] = t.current, to(e.nodeType === 8 ? e.parentNode : e), new xu(t);
};
Xn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(xe(188)) : (e = Object.keys(e).join(","), Error(xe(268, e)));
  return e = bh(t), e = e === null ? null : e.stateNode, e;
};
Xn.flushSync = function(e) {
  return Or(e);
};
Xn.hydrate = function(e, t, n) {
  if (!Bi(t)) throw Error(xe(200));
  return Wi(null, e, t, !0, n);
};
Xn.hydrateRoot = function(e, t, n) {
  if (!yu(e)) throw Error(xe(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = op;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = lp(t, null, e, 1, n ?? null, l, !1, o, i), e[Os] = t.current, to(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Fi(t);
};
Xn.render = function(e, t, n) {
  if (!Bi(t)) throw Error(xe(200));
  return Wi(null, e, t, !1, n);
};
Xn.unmountComponentAtNode = function(e) {
  if (!Bi(e)) throw Error(xe(40));
  return e._reactRootContainer ? (Or(function() {
    Wi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Os] = null;
    });
  }), !0) : !1;
};
Xn.unstable_batchedUpdates = du;
Xn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Bi(n)) throw Error(xe(200));
  if (e == null || e._reactInternals === void 0) throw Error(xe(38));
  return Wi(e, t, n, !1, r);
};
Xn.version = "18.3.1-next-f1338f8080-20240426";
function ip() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ip);
    } catch (e) {
      console.error(e);
    }
}
ip(), oh.exports = Xn;
var Fs = oh.exports, Od = Fs;
ei.createRoot = Od.createRoot, ei.hydrateRoot = Od.hydrateRoot;
var ap = { exports: {} }, Ui = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rg = u, lg = Symbol.for("react.element"), og = Symbol.for("react.fragment"), ig = Object.prototype.hasOwnProperty, ag = rg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, cg = { key: !0, ref: !0, __self: !0, __source: !0 };
function cp(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) ig.call(t, r) && !cg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: lg, type: e, key: o, ref: i, props: l, _owner: ag.current };
}
Ui.Fragment = og;
Ui.jsx = cp;
Ui.jsxs = cp;
ap.exports = Ui;
var s = ap.exports;
let tr = [], up = 120, Na = !1;
async function ug() {
  if (!Na) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          dg(n), Na = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Na = !0;
  }
}
function dg(e) {
  Array.isArray(e) && (tr = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function $s(e) {
  for (let t = tr.length - 1; t >= 0; t--) {
    const n = tr[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return tr.length > 0 ? {
    offsetMin: tr[0].offsetBeforeMin,
    label: tr[0].labelBefore
  } : { offsetMin: up, label: "LOCAL" };
}
function dp(e, t) {
  return tr.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Ei(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, i, a] = t.split(":").map(Number);
  for (const c of tr)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const d = (c.offsetBeforeMin - c.offsetAfterMin) / 60, v = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (v.getUTCFullYear() === n && v.getUTCMonth() + 1 === r && v.getUTCDate() === l) {
        const m = v.getUTCHours();
        if (o >= m && o < m + d)
          return {
            isAmbiguous: !0,
            transition: c,
            firstOccurrenceEpoch: new Date(Date.UTC(n, r - 1, l, o, i, a)).getTime() - c.offsetBeforeMin * 6e4,
            secondOccurrenceEpoch: new Date(Date.UTC(n, r - 1, l, o, i, a)).getTime() - c.offsetAfterMin * 6e4
          };
      }
    }
  return { isAmbiguous: !1 };
}
function hg(e) {
  const { offsetMin: t, label: n } = $s(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function fg(e) {
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
function br(e, t = "LOCAL") {
  return t === "UTC" ? fg(e) : hg(e);
}
function Dd(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = br(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function vc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, i] = e.split("-").map(Number), [a, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(i) || isNaN(a) || isNaN(c)) return null;
  const v = Date.UTC(l, o - 1, i, a, c, d);
  if (n === "UTC")
    return v;
  const m = Ei(e, t);
  if (m.isAmbiguous)
    return r === 2 ? m.secondOccurrenceEpoch : m.firstOccurrenceEpoch;
  const g = v - up * 6e4, { offsetMin: N } = $s(g);
  let C = v - N * 6e4;
  const b = $s(C);
  return b.offsetMin !== N && (C = v - b.offsetMin * 6e4), C;
}
function pg({
  timeRange: e,
  baseEpochMs: t,
  timeMode: n,
  setTimeMode: r,
  activeStationId: l,
  hideBackToGrid: o,
  onResetActiveStation: i,
  onOpenRangeModal: a,
  onOpenBookmarksModal: c,
  onOpenHelpModal: d,
  onToggleDrawer: v,
  isInitialSetup: m = !1,
  selectedCount: g = 0,
  totalCount: N = 0,
  onResetStudio: C
}) {
  const [b, P] = u.useState(!1);
  u.useEffect(() => {
    if (!b) return;
    const E = (j) => {
      j.key === "Escape" && P(!1);
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [b]);
  const k = u.useMemo(() => {
    const E = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!E || j <= 0) return "-- ➔ --";
    const y = E + j, S = (te) => String(te).padStart(2, "0"), x = br(E, n), I = br(y, n), D = `${x.year}-${S(x.month)}-${S(x.day)}`, V = `${S(x.hour)}:${S(x.minute)}:${S(x.second)}`, $ = `${I.year}-${S(I.month)}-${S(I.day)}`, B = `${S(I.hour)}:${S(I.minute)}:${S(I.second)}`, se = n === "UTC" ? " (UTC)" : x.label ? ` (${x.label})` : "", U = D === $ ? B : `${$} ${B}`;
    return `${D} ${V} ➔ ${U}${se}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), p = u.useMemo(() => {
    const E = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (E >= 1440) {
      const j = (E / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${E}m Total)`;
    }
    return `(${E}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), h = () => {
    P(!1), C == null || C();
  }, M = b ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => P(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (E) => E.stopPropagation(), dir: "ltr", children: [
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
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: h, children: [
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
          onClick: a,
          title: "Click to modify mission time window",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: k }),
            /* @__PURE__ */ s.jsx("span", { className: "total-duration", children: p })
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
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: g }),
            /* @__PURE__ */ s.jsxs("span", { className: "selection-total", children: [
              "/ ",
              N
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "scope-view-actions", children: [
      !o && l && /* @__PURE__ */ s.jsx("button", { type: "button", onClick: i, className: "btn-grid-return", children: "⊞ Back to Grid" }),
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
      !m && /* @__PURE__ */ s.jsx(
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
    typeof document < "u" && M && Fs.createPortal(M, document.body)
  ] });
}
const Wr = (e) => String(e).padStart(2, "0");
function yt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const g = new Date(e), N = Wr(g.getUTCHours()), C = Wr(g.getUTCMinutes()), b = Wr(g.getUTCSeconds()), P = l ? `${N}:${C}:${b}` : `${N}:${C}`;
    return r ? `${P} UTC` : P;
  }
  const { offsetMin: o, label: i } = $s(e), a = new Date(e + o * 60 * 1e3), c = Wr(a.getUTCHours()), d = Wr(a.getUTCMinutes()), v = Wr(a.getUTCSeconds()), m = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${m} ${i}` : m;
}
const mg = 600, Pd = 250, qn = /* @__PURE__ */ new Map(), jr = /* @__PURE__ */ new Map(), Nc = /* @__PURE__ */ new Set(), _d = 4;
let cl = 0, us = [];
function kc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Pd) * Pd;
}
function hp() {
  var e;
  if (!(cl >= _d || us.length === 0))
    for (us = us.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); cl < _d && us.length > 0; ) {
      const t = us.pop();
      !t || (e = t.signal) != null && e.aborted || (cl++, gg(t));
    }
}
function Zo(e, t, n, r = "mon-0") {
  const l = kc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
  if (qn.size >= mg) {
    const a = qn.keys().next().value, c = qn.get(a);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), qn.delete(a);
  }
  qn.set(i, n), Nc.forEach((a) => a(e, l, n, o));
}
async function gg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: i } = e;
  try {
    if (o != null && o.aborted) {
      i(null);
      return;
    }
    const a = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${a}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), v = URL.createObjectURL(d);
      Zo(n, r, v, l), i(v);
    } else c.status === 204 ? (Zo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } catch (a) {
    a.name !== "AbortError" ? (Zo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } finally {
    cl = Math.max(0, cl - 1), jr.delete(t), hp();
  }
}
const In = {
  /**
   * Gets a cached frame URL by station, timestamp, and optional displayId.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} [displayId='mon-0']
   * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
   */
  get(e, t, n = "mon-0") {
    const r = kc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!qn.has(o)) return null;
    const i = qn.get(o);
    return qn.delete(o), qn.set(o, i), i;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: Zo,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    qn.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), qn.clear(), jr.clear(), us = [], cl = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return Nc.add(e), () => Nc.delete(e);
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
    const l = kc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
    if (qn.has(i))
      return Promise.resolve(this.get(e, l, o));
    if (jr.has(i))
      return jr.get(i);
    const a = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      us = us.filter((v) => v.hostname === e && v.displayId === o && v.key !== i ? (jr.delete(v.key), v.resolve(null), !1) : !0);
      const d = { key: i, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        us = us.filter((v) => v.key !== i), jr.delete(i), c(null);
      }, { once: !0 }), us.push(d), hp();
    });
    return jr.set(i, a), a;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  In.clearAll();
});
const vu = "ITB_STUDIO_SESSION_CACHE_V2", fp = "itb_player_audio_settings";
let ka = null;
function xg() {
  try {
    const e = localStorage.getItem(vu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function pp(e) {
  e && (ka && clearTimeout(ka), ka = setTimeout(() => {
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
      localStorage.setItem(vu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function yg() {
  try {
    localStorage.removeItem(vu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function ul() {
  try {
    const e = localStorage.getItem(fp);
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
function vg(e) {
  try {
    localStorage.setItem(fp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let Js = null, nl = null, wa = null, Dn = 0, Ur = 0, _o = -60, uo = 1;
function Ng() {
  if (!Js) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Js = new e());
  }
  return Js && Js.state === "suspended" && Js.resume().catch(() => {
  }), Js;
}
function Si(e, t = 1) {
  if (!e) return null;
  uo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Ng();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (i) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", i);
      }
    return l && l.gain.setValueAtTime(uo, n.currentTime), nl = e, kg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function Fd(e) {
  if (uo = Math.max(0, Number(e) || 1), nl != null && nl.__audioGainNode && Js)
    try {
      nl.__audioGainNode.gain.setValueAtTime(uo, Js.currentTime);
    } catch {
    }
}
function kg() {
  if (wa) return;
  const e = new Uint8Array(256), t = () => {
    const n = nl, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Dn *= 0.85, Ur *= 0.85, Dn < 1e-3 && (Dn = 0), Ur < 1e-3 && (Ur = 0), _o = Dn > 1e-3 ? 20 * Math.log10(Dn) : -60;
    else
      try {
        r.getByteTimeDomainData(e);
        let l = 0, o = 0;
        for (let a = 0; a < e.length; a++) {
          const c = (e[a] - 128) / 128;
          l += c * c;
          const d = Math.abs(c);
          d > o && (o = d);
        }
        const i = Math.sqrt(l / e.length);
        Dn = i > Dn ? Dn * 0.3 + i * 0.7 : Dn * 0.85 + i * 0.15, Ur = Math.max(Dn, o), _o = Dn > 1e-4 ? 20 * Math.log10(Dn) : -60;
      } catch {
        Dn = 0, Ur = 0, _o = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Dn,
        peak: Ur,
        db: _o,
        gain: uo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), wa = requestAnimationFrame(t);
  };
  wa = requestAnimationFrame(t);
}
function mp({ isPlaying: e = !1 }) {
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
function wg({
  displays: e = [],
  activeDisplayId: t = "mon-0",
  onSelectDisplay: n,
  areAllDisplaysPlaced: r = !1,
  isAutoDirectorEnabled: l = !1
}) {
  if (!e || e.length <= 1)
    return null;
  const o = (t || "mon-0").toLowerCase(), i = o === "auto" || o === "director";
  return /* @__PURE__ */ s.jsx(
    "aside",
    {
      className: `tactical-display-strip-wrapper ${r ? "are-all-placed" : ""}`,
      "aria-label": "Workstation Display Switcher",
      onClick: (a) => a.stopPropagation(),
      children: /* @__PURE__ */ s.jsxs("div", { className: "vertical-display-strip", role: "toolbar", children: [
        l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `display-strip-btn btn-auto ${i ? "is-active" : ""}`,
            onClick: (a) => {
              a.stopPropagation(), n == null || n("auto");
            },
            title: "Auto-Director: Automatically follow active keyboard/mouse cuts",
            "aria-label": "Auto-Director",
            children: /* @__PURE__ */ s.jsx("span", { className: "auto-icon", children: "⚡" })
          }
        ),
        e.map((a, c) => {
          const d = (a.displayId ?? a.DisplayId ?? `mon-${c}`).toLowerCase(), v = !i && o === d, m = a.width ?? a.Width ?? 1920, g = a.height ?? a.Height ?? 1080, N = a.displayName ?? a.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${v ? "is-active" : ""}`,
              onClick: (C) => {
                C.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${N} (${m}×${g})`,
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
function jg({
  station: e,
  currentEpochMs: t,
  isOffline: n,
  isSolo: r,
  isPlaying: l,
  setIsPlaying: o,
  baseEpochMs: i,
  totalDurationMs: a,
  outPointMs: c,
  setPlayheadMs: d,
  isSpotlightActive: v,
  globalGaps: m = [],
  recordingSegments: g = {},
  playbackSpeed: N = 1,
  activeAudioStationId: C = null,
  directorPlan: b = null,
  isAutoDirectorEnabled: P = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: p = null,
  areAllDisplaysPlaced: h = !1,
  hideDisplayStrip: M = !1
}) {
  var X;
  const E = e.hostname || e.name || e.id || "", j = Math.round(t), [y, S] = u.useState(() => !E || !j ? null : In.get(E, j) || null), [x, I] = u.useState(""), [D, V] = u.useState(!1), [$, B] = u.useState(!1), [se, U] = u.useState(!1), te = u.useRef(l), A = u.useRef(null), T = u.useRef(0), L = u.useRef(t - i), z = u.useRef(t - i), F = u.useRef(!1), ce = u.useRef(null), q = u.useRef(!1);
  L.current = t - i;
  const J = (e == null ? void 0 : e.displays) || ((X = e == null ? void 0 : e.topology) == null ? void 0 : X.displays) || [], [le, Fe] = u.useState(null);
  u.useEffect(() => {
    Fe(null);
  }, [k]);
  const H = u.useMemo(() => {
    const Q = b || (e == null ? void 0 : e.directorPlan);
    return !Q || !Q.segments || Q.segments.length === 0 ? null : Q.segments.find((fe) => {
      const ge = fe.startEpochMs ?? fe.StartEpochMs ?? 0, we = fe.endEpochMs ?? fe.EndEpochMs ?? 0;
      return t >= ge && t <= we;
    }) || Q.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t]), ne = u.useMemo(() => {
    var Q;
    return le ? le.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : J.length > 1 && P !== !1 && H ? (H.targetDisplayId || H.TargetDisplayId || "mon-0").toLowerCase() : (((Q = J[0]) == null ? void 0 : Q.displayId) || "mon-0").toLowerCase();
  }, [le, k, J, P, H]), he = g[e == null ? void 0 : e.id] || g[E] || (e == null ? void 0 : e.segments) || [], Z = he.length === 0 || he.some((Q) => {
    const fe = Q.startEpochMs ?? Q.startEpoch ?? 0, ge = Q.endEpochMs ?? Q.endEpoch ?? 0;
    return t >= fe && t <= ge;
  }), ae = !!(r ? !ul().isMuted : C && (e.id === C || E === C)), ye = u.useCallback(() => {
    if (!A.current) return;
    const Q = ul();
    if (r)
      A.current.volume = Q.volume, A.current.muted = Q.isMuted, Q.isMuted || Si(A.current);
    else {
      const fe = !!(C && (e.id === C || E === C));
      A.current.muted = !fe, fe && (A.current.volume = Q.volume, Si(A.current));
    }
  }, [r, C, e.id, E]);
  u.useEffect(() => {
    ye();
  }, [ye]), u.useEffect(() => {
    const Q = (fe) => {
      A.current && fe.detail && ye();
    };
    return window.addEventListener("itb-audio-state-changed", Q), () => window.removeEventListener("itb-audio-state-changed", Q);
  }, [ye]), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = N, A.current.playbackRate = N);
  }, [N]), u.useEffect(() => {
    if (n || !j || !E) return;
    if (l) {
      te.current = !0;
      return;
    }
    const Q = te.current;
    te.current = l;
    let fe = !0;
    const ge = new AbortController(), we = In.get(E, j, ne);
    if (we) {
      S(we), B(!1), U(!1);
      return;
    }
    U(!0);
    const ie = setTimeout(() => {
      fe && In.fetchFrame(E, j, ge.signal, ne).then((ke) => {
        fe && (U(!1), ke && ke !== "NO_SIGNAL" ? (S(ke), B(!1)) : ke === "NO_SIGNAL" && B(!0));
      });
    }, Q ? 25 : 40), De = In.subscribe((ke, Te, ze, Pe) => {
      ke === E && Te === j && (!Pe || Pe === ne) && fe && (U(!1), ze && ze !== "NO_SIGNAL" ? (S(ze), B(!1)) : ze === "NO_SIGNAL" && B(!0));
    });
    return () => {
      fe = !1, clearTimeout(ie), ge.abort(), De();
    };
  }, [E, j, n, l, r, D, ne]), u.useEffect(() => {
    if (!E || !(r || l)) {
      l || (ce.current && clearTimeout(ce.current), F.current = !1, I(""), V(!1), A.current && (A.current.pause(), A.current.removeAttribute("src"), A.current.load()));
      return;
    }
    let fe = null;
    return l && !v && Z ? fe = setTimeout(() => {
      const ge = L.current;
      T.current = ge, z.current = ge, F.current = !1;
      const we = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ge}&displayId=${encodeURIComponent(ne)}&_t=${Date.now()}`;
      V(!1), I(we);
    }, 80) : l || (ce.current && clearTimeout(ce.current), F.current = !1, I(""), V(!1), A.current && (A.current.pause(), A.current.removeAttribute("src"), A.current.load())), () => {
      fe && clearTimeout(fe);
    };
  }, [l, r, E, i, a, v, Z, ne]), u.useEffect(() => {
    if (!E || !(r || l)) return;
    const fe = L.current, ge = Math.abs(fe - z.current);
    if (!l || ge < 800) {
      z.current = fe;
      return;
    }
    return F.current = !0, z.current = fe, T.current = fe, A.current && A.current.pause(), V(!1), ce.current && clearTimeout(ce.current), ce.current = setTimeout(() => {
      if (!Z || v) {
        I(""), V(!1), F.current = !1;
        return;
      }
      const we = L.current, Ie = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + we}&displayId=${encodeURIComponent(ne)}&_t=${Date.now()}`;
      I(Ie);
    }, 75), () => {
      ce.current && clearTimeout(ce.current);
    };
  }, [t, l, r, E, i, a, v, Z, ne]), u.useEffect(() => {
    if (r || !l || !A.current || !D || F.current) return;
    const Q = (L.current - T.current) / 1e3;
    if (Q >= 0) {
      const fe = A.current, ge = fe.currentTime, we = Math.abs(ge - Q);
      if (we > 0.35 && we < 3)
        try {
          fe.currentTime = Q;
        } catch {
        }
    }
  }, [r, l, t, D]), u.useEffect(() => {
    if (!r || !l || !x || !D || v) return;
    let Q = null, fe = A.current ? A.current.currentTime : 0, ge = performance.now(), we = T.current + Math.round(fe * 1e3);
    const Ie = () => {
      const ie = A.current;
      if (ie && !ie.paused && !ie.ended && !q.current && !F.current) {
        const De = performance.now(), ke = ie.currentTime;
        Math.abs(ke - fe) > 5e-4 && (fe = ke, ge = De);
        const Te = Math.max(0, (De - ge) / 1e3), ze = ie.playbackRate || N || 1, Pe = fe + Te * ze;
        let je = T.current + Math.round(Pe * 1e3);
        const Qe = je - we;
        if (Qe < 0 && Qe > -300 && (je = we), je >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Ue = i + je, en = m == null ? void 0 : m.find((tt) => Ue >= tt.startEpochMs && Ue < tt.endEpochMs);
        if (en) {
          q.current = !0;
          const tt = en.endEpochMs - i;
          d(tt), T.current = tt, we = tt, z.current = tt;
          const Ge = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + tt}&_t=${Date.now()}`;
          V(!1), I(Ge), setTimeout(() => {
            q.current = !1;
          }, 300);
          return;
        }
        je !== we && (we = je, z.current = je, d == null || d(je));
      }
      Q = requestAnimationFrame(Ie);
    };
    return Q = requestAnimationFrame(Ie), () => {
      Q && cancelAnimationFrame(Q);
    };
  }, [
    r,
    l,
    x,
    D,
    v,
    N,
    c,
    i,
    a,
    E,
    m,
    d,
    o
  ]);
  const Be = () => {
    if (q.current) return;
    const Q = i + L.current, fe = he.map((ge) => ({ start: ge.startEpochMs ?? ge.startEpoch ?? 0, end: ge.endEpochMs ?? ge.endEpoch ?? 0 })).filter((ge) => ge.start > Q + 200).sort((ge, we) => ge.start - we.start)[0];
    if (fe && fe.start - i < c) {
      q.current = !0;
      const ge = fe.start - i;
      d(ge), T.current = ge;
      const we = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ge}&_t=${Date.now()}`;
      V(!1), I(we), setTimeout(() => {
        q.current = !1;
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
    (r || l) && x && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: A,
        src: x,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: D ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: D ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !ae,
        onLoadedData: () => {
          A.current && (A.current.defaultPlaybackRate = N, A.current.playbackRate = N);
        },
        onCanPlay: () => {
          ye(), A.current && (A.current.defaultPlaybackRate = N, A.current.playbackRate = N), l && A.current && A.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          F.current = !1, V(!0), ye(), A.current && (A.current.defaultPlaybackRate = N, A.current.playbackRate = N);
        },
        onWaiting: () => {
          V(!1);
        },
        onTimeUpdate: () => {
          var Q;
          !D && ((Q = A.current) == null ? void 0 : Q.currentTime) > 0 && (F.current = !1, V(!0));
        },
        onEnded: Be
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && D && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: y && !$ ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: y,
            alt: E,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => B(!0)
          }
        ) : (!y || $ || !Z) && !x ? /* @__PURE__ */ s.jsx(mp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && Z && !D && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          E
        ] })
      ] })
    ] }) }),
    !M && /* @__PURE__ */ s.jsx(
      wg,
      {
        displays: J,
        activeDisplayId: ne,
        onSelectDisplay: (Q) => {
          Fe(Q), p == null || p(Q);
        },
        areAllDisplaysPlaced: h,
        isAutoDirectorEnabled: P
      }
    )
  ] });
}
function Cg({
  station: e,
  isSolo: t = !1,
  stationsCount: n = 1,
  onDeselectStation: r = null,
  currentEpochMs: l,
  timeMode: o = "LOCAL",
  isPlaying: i,
  setIsPlaying: a,
  baseEpochMs: c,
  totalDurationMs: d,
  outPointMs: v,
  setPlayheadMs: m,
  isSpotlightActive: g,
  globalGaps: N = [],
  onOpenSpotlight: C,
  onSelectActiveStation: b,
  recordingSegments: P = {},
  playbackSpeed: k = 1,
  activeAudioStationId: p = null,
  onSoloAudio: h,
  directorPlan: M = null,
  isAutoDirectorEnabled: E = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: y = null,
  areAllDisplaysPlaced: S = !1,
  _slotIndex: x = 0,
  borderColor: I = null,
  onSwapWithNext: D = null
}) {
  var A;
  const V = !!(p && (e.id === p || e.hostname && e.hostname === p)), $ = (e.hostname || e.name || "").includes("Offline"), B = $ ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((A = e == null ? void 0 : e.topology) == null ? void 0 : A.displays) || []).length > 1;
  const U = () => {
    if (t) {
      const T = j && j !== "auto" && j !== "director" ? j : null;
      C && C(e.id, T);
    } else
      b && b(e.id);
  }, te = (T) => {
    T.preventDefault(), T.stopPropagation(), t && b && (a && a(!1), b(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: U,
      onContextMenu: te,
      className: `camera-card ${B} ${t ? "is-solo-card" : ""}`,
      style: I ? { borderColor: I } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${B}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            D && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (T) => {
                  T.stopPropagation(), D();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            h && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${V ? "audio-active" : ""}`,
                onClick: (T) => {
                  T.stopPropagation(), h(V ? null : e.id);
                },
                title: V ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: V ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
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
                onClick: (T) => {
                  T.stopPropagation();
                  const L = j && j !== "auto" && j !== "director" ? j : null;
                  C(e.id, L);
                },
                title: "Cinema Fullscreen Inspection",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) })
              }
            ),
            b && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (T) => {
                  T.stopPropagation(), t && a && a(!1), b(t ? null : e.id);
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
                onClick: (T) => {
                  T.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${$ ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            jg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: $,
              isSolo: t,
              isPlaying: i,
              setIsPlaying: a,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: v,
              setPlayheadMs: m,
              isSpotlightActive: g,
              globalGaps: N,
              recordingSegments: P,
              playbackSpeed: k,
              activeAudioStationId: p,
              directorPlan: M,
              isAutoDirectorEnabled: E,
              targetDisplayId: j,
              onSelectDisplayId: y,
              areAllDisplaysPlaced: S,
              hideDisplayStrip: !0
            }
          ),
          t && !i && /* @__PURE__ */ s.jsxs("div", { className: "solo-hover-tooltip", children: [
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
        !$ && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          yt(l, o)
        ] }) })
      ]
    }
  ) });
}
function zt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Eg(e) {
  const t = zt(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Sg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function bg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var b, P, k, p, h, M;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let E = 0; E < e.length; E++)
    if (e[E].timestampEpochMs <= t)
      l = e[E], o = e[E + 1] || e[E];
    else {
      o === l && e[E] && (o = e[E]);
      break;
    }
  if (l === o)
    return ((b = l.layout) == null ? void 0 : b.placements) || n;
  const i = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), a = o.transitionType || "smooth", c = o.timestampEpochMs - i;
  if (t < c)
    return ((P = l.layout) == null ? void 0 : P.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((k = o.layout) == null ? void 0 : k.placements) || n;
  if (a === "cut")
    return ((p = l.layout) == null ? void 0 : p.placements) || n;
  const d = (t - c) / i, v = zt(d, 0, 1), m = a === "linear" ? v : Eg(v), g = ((h = l.layout) == null ? void 0 : h.placements) || [], N = ((M = o.layout) == null ? void 0 : M.placements) || [], C = N.map((E) => {
    const j = g.find((V) => V.stationId === E.stationId && V.displayId === E.displayId);
    if (!j)
      return {
        ...E,
        opacity: Math.max(0.05, m)
      };
    const y = Math.round(j.x + (E.x - j.x) * m), S = Math.round(j.y + (E.y - j.y) * m), x = Math.round(j.width + (E.width - j.width) * m), I = Math.round(j.height + (E.height - j.height) * m), D = Number(((j.rotation || 0) + ((E.rotation || 0) - (j.rotation || 0)) * m).toFixed(1));
    return {
      ...E,
      x: y,
      y: S,
      width: x,
      height: I,
      rotation: D,
      opacity: 1
    };
  });
  return g.forEach((E) => {
    N.some((y) => y.stationId === E.stationId && y.displayId === E.displayId) || C.push({
      ...E,
      opacity: Math.max(0, 1 - m)
    });
  }), C;
}
function Mg({
  prevTimeline: e,
  newPlacements: t,
  currentEpochMs: n,
  baseEpochMs: r,
  toleranceMs: l = 500,
  virtualW: o = 1920,
  virtualH: i = 1080,
  fps: a = 30
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
        height: i,
        backgroundColor: "#070A10",
        fps: a,
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
        height: i,
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
        height: i,
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
      height: i,
      backgroundColor: "#070A10",
      fps: a,
      placements: t
    }
  }, m = [...c, v].sort((C, b) => C.timestampEpochMs - b.timestampEpochMs), g = m.findIndex((C) => C.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: m },
    newIndex: g >= 0 ? g : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function wc(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function Ig(e, t) {
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
function Bd(e, t, n, r = 500) {
  const l = (e == null ? void 0 : e.keyframes) || [], o = l.findIndex((d) => Math.abs(d.timestampEpochMs - t) <= r);
  if (o >= 0)
    return {
      nextTimeline: e,
      newIndex: o,
      isNew: !1
    };
  const i = {
    id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestampEpochMs: Math.round(t),
    transitionDurationSec: 0.5,
    transitionType: "smooth",
    layout: JSON.parse(JSON.stringify(n))
  }, a = [...l, i].sort((d, v) => d.timestampEpochMs - v.timestampEpochMs), c = a.findIndex((d) => d.id === i.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: a
    },
    newIndex: c >= 0 ? c : 0,
    isNew: !0
  };
}
const Zn = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], jc = 1920, Cc = 1080, pt = [
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
], Tg = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
], Ag = [
  { id: "none", label: "None" },
  { id: "deep", label: "Deep Cinema" },
  { id: "glow-cyan", label: "Cyan Glow" },
  { id: "glow-emerald", label: "Emerald Glow" },
  { id: "glow-rose", label: "Rose Glow" },
  { id: "glow-amber", label: "Amber Glow" }
];
function Rg(e, t, n) {
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
function Nr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function Zs(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, i = n / r;
  let a, c, d, v;
  return o >= i ? (a = n, c = Math.round(a / o), d = e, v = t + Math.round((r - c) / 2)) : (c = r, a = Math.round(c * o), d = e + Math.round((n - a) / 2), v = t), { x: d, y: v, width: a, height: c };
}
function Ys(e, t = jc, n = Cc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: m, width: g, height: N } = Zs(0, 0, t, n, d);
    return [{
      ...c,
      x: v,
      y: m,
      width: g,
      height: N,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: pt[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, v) => {
      const m = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: g, y: N, width: C, height: b } = Zs(v * c, 0, c, n, m);
      return {
        ...d,
        x: g,
        y: N,
        width: C,
        height: b,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: m,
        aspectRatio: m,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[v % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const g = Math.round(t / 3);
      return e.slice(0, 3).map((N, C) => {
        const b = N.nativeAspectRatio || (N.sourceWidth && N.sourceHeight ? N.sourceWidth / N.sourceHeight : 1.7777777777777777), { x: P, y: k, width: p, height: h } = Zs(C * g, 0, g, n, b);
        return {
          ...N,
          x: P,
          y: k,
          width: p,
          height: h,
          sourceWidth: N.sourceWidth || 1920,
          sourceHeight: N.sourceHeight || 1080,
          nativeAspectRatio: b,
          aspectRatio: b,
          zIndex: C,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[C % pt.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), v = Math.round(n / 2), m = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: v }
    ];
    return e.slice(0, 3).map((g, N) => {
      const C = g.nativeAspectRatio || (g.sourceWidth && g.sourceHeight ? g.sourceWidth / g.sourceHeight : 1.7777777777777777), { cx: b, cy: P } = m[N], { x: k, y: p, width: h, height: M } = Zs(b, P, d, v, C);
      return {
        ...g,
        x: k,
        y: p,
        width: h,
        height: M,
        sourceWidth: g.sourceWidth || 1920,
        sourceHeight: g.sourceHeight || 1080,
        nativeAspectRatio: C,
        aspectRatio: C,
        zIndex: N,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[N % pt.length],
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
    return e.slice(0, 4).map((m, g) => {
      const N = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: C, cy: b } = v[g], { x: P, y: k, width: p, height: h } = Zs(C, b, c, d, N);
      return {
        ...m,
        x: P,
        y: k,
        width: p,
        height: h,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: N,
        aspectRatio: N,
        zIndex: g,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[g % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), i = Math.floor(t / l), a = Math.floor(n / o);
  return e.map((c, d) => {
    const v = d % l, m = Math.floor(d / l), g = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: N, y: C, width: b, height: P } = Zs(v * i, m * a, i, a, g);
    return {
      ...c,
      x: N,
      y: C,
      width: b,
      height: P,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: g,
      aspectRatio: g,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: pt[d % pt.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function $g({
  activeStation: e,
  timelineStations: t = [],
  allStations: n = [],
  onSelectActiveStation: r,
  onOpenSpotlight: l,
  onStationContextMenu: o,
  onDeselectStation: i = null,
  stationAutoDirectorMap: a = {},
  onToggleStationAutoDirector: c = null,
  baseEpochMs: d = 0,
  playheadMs: v = 0,
  playheadEpochMs: m = 0,
  timeMode: g = "LOCAL",
  isPlaying: N = !1,
  setIsPlaying: C,
  totalDurationMs: b,
  inPointMs: P = 0,
  outPointMs: k,
  setPlayheadMs: p,
  globalGaps: h = [],
  recordingSegments: M = {},
  playbackSpeed: E = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: y = "BurnIn",
  keystrokes: S = [],
  directorPlan: x = null,
  onOverrideDisplay: I,
  onResetOverride: D,
  compositionLayout: V = "canvas",
  onChangeCompositionLayout: $,
  isAutoDirectorEnabled: B = !0,
  onToggleAutoDirector: se,
  onUpdateCanvasLayout: U,
  canvasLayoutTimeline: te = null,
  onUpdateCanvasLayoutTimeline: A,
  activeKfIndex: T = 0,
  setActiveKfIndex: L,
  isModalOpen: z = !1
}) {
  const F = m > 0 ? m : d + v, [ce, q] = u.useState(() => {
    var f;
    return ((f = t[0]) == null ? void 0 : f.id) || null;
  }), [J, le] = u.useState(!1), [Fe, H] = u.useState(null), [ne, he] = u.useState({ index: null, position: null }), [Z, ae] = u.useState(!1), [ye, Be] = u.useState(!1), [X, Q] = u.useState(!1), [fe, ge] = u.useState(!1), [we, Ie] = u.useState(""), [ie, De] = u.useState(""), ke = u.useRef(null), [Te, ze] = u.useState(() => {
    try {
      const f = localStorage.getItem("itb_canvas_saved_presets");
      return f ? JSON.parse(f) : [];
    } catch {
      return [];
    }
  }), Pe = (f) => {
    ze(f);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(f));
    } catch {
    }
  }, [je, Qe] = u.useState(!1), [Ue, en] = u.useState(!1);
  u.useRef(null);
  const tt = u.useRef(null), Ge = u.useRef(null), ln = u.useRef(null), [Rt, pn] = u.useState({ width: 960, height: 540 }), [He, vt] = u.useState(0), [Cn, gt] = u.useState(!1);
  u.useEffect(() => {
    const f = (w) => {
      w.key === "Escape" && gt(!1);
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, []);
  const [Nt, En] = u.useState(!1), [kt, Tt] = u.useState(!1), [Wt, Qt] = u.useState(!1), [cn, Ln] = u.useState(!1), [Se, be] = u.useState(!1), [re, We] = u.useState({ vertical: null, horizontal: null }), [Ke, Y] = u.useState(!0), [de, ve] = u.useState(!0), [Ee, Xe] = u.useState(null), [Je, dt] = u.useState({ x: 0, y: 0, isInside: !1 }), Ze = u.useRef(null), Ye = u.useRef(null), rt = u.useRef(!1), [xt, at] = u.useState("auto-grid"), $t = u.useRef([]), un = u.useRef([]), Yt = u.useRef(null), [, ps] = u.useState(0), Jn = u.useRef(null), [_t, js] = u.useState(null), Gt = u.useCallback((f, w = "success", R = "💾") => {
    Jn.current && clearTimeout(Jn.current), js({ text: f, type: w, icon: R }), Jn.current = setTimeout(() => {
      js(null), Jn.current = null;
    }, 2200);
  }, []), [Ft, Cs] = u.useState(() => {
    var R, G, K, _, ee, Ce;
    const f = (K = (G = (R = te == null ? void 0 : te.keyframes) == null ? void 0 : R[0]) == null ? void 0 : G.layout) == null ? void 0 : K.width, w = (Ce = (ee = (_ = te == null ? void 0 : te.keyframes) == null ? void 0 : _[0]) == null ? void 0 : ee.layout) == null ? void 0 : Ce.height;
    if (f && w) {
      const pe = Zn.find((Ne) => Ne.w === f && Ne.h === w);
      if (pe) return pe.id;
    }
    return "16:9";
  }), [tn, _r] = u.useState(() => {
    try {
      const f = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (f !== null) return f === "true";
    } catch {
    }
    return !1;
  }), On = u.useCallback(() => {
    _r((f) => {
      const w = !f;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(w));
      } catch {
      }
      return w;
    });
  }, []), Es = u.useMemo(() => Zn.find((f) => f.id === Ft) || Zn[0], [Ft]), Me = Es.w, Ae = Es.h, ms = Es.ratio, vn = u.useMemo(() => {
    const f = [], w = Me >= 3e3 ? 200 : 100, R = w / 2, G = w / 10;
    for (let K = 0; K <= Me; K += G) {
      const _ = K % w === 0, ee = !_ && K % R === 0;
      f.push({ val: K, isMajor: _, isMed: ee });
    }
    return f;
  }, [Me]), Fr = u.useMemo(() => {
    const f = [];
    for (let K = 0; K <= Ae; K += 10) {
      const _ = K % 100 === 0, ee = !_ && K % 50 === 0;
      f.push({ val: K, isMajor: _, isMed: ee });
    }
    return f;
  }, [Ae]), yo = u.useCallback((f) => {
    const w = Ze.current || Ge.current;
    if (!w) return;
    const R = w.getBoundingClientRect(), G = zt(Math.round((f.clientX - R.left) / R.width * Me), 0, Me), K = zt(Math.round((f.clientY - R.top) / R.height * Ae), 0, Ae);
    dt({ x: G, y: K, isInside: !0 });
  }, [Me, Ae]), zi = u.useCallback(() => {
    dt((f) => ({ ...f, isInside: !1 }));
  }, []), Bs = u.useCallback(() => {
    const f = ln.current;
    if (!f) return;
    const w = f.getBoundingClientRect(), G = Math.max(320, Math.floor(w.width || 960) - 104 - 16), K = Math.max(180, Math.floor(w.height || 540) - 16);
    let _, ee;
    tn ? (_ = G, ee = Math.round(_ / ms)) : G / K >= ms ? (ee = K, _ = Math.round(ee * ms)) : (_ = G, ee = Math.round(_ / ms)), pn((Ce) => Ce.width === _ && Ce.height === ee ? Ce : { width: _, height: ee });
  }, [tn, ms]);
  u.useEffect(() => {
    const f = ln.current;
    if (!f) return;
    Bs();
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(() => {
      Bs();
    }), w.observe(f)), window.addEventListener("resize", Bs), () => {
      w && w.disconnect(), window.removeEventListener("resize", Bs);
    };
  }, [Bs]);
  const dn = u.useMemo(() => (t && t.length > 0 ? t : n).map((w) => {
    const R = w.displays && w.displays.length > 0 ? w.displays : w.topology && w.topology.displays && w.topology.displays.length > 0 ? w.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: w.width || 1920, height: w.height || 1080 }], G = R.find((pe) => pe.isPrimary) || R[0], K = G.width || G.Width || w.width || 1920, _ = G.height || G.Height || w.height || 1080, ee = K && _ ? K / _ : 16 / 9, Ce = R.length > 1;
    return {
      stationId: w.id,
      displayId: "auto",
      label: `${w.displayName || w.roleAlias || w.hostname || w.name} - ${Ce ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: w.displayName || w.roleAlias || w.hostname || w.name,
      stationHostname: w.hostname || w.id,
      isPrimary: !0,
      sourceWidth: K,
      sourceHeight: _,
      nativeAspectRatio: ee,
      aspectRatio: ee,
      width: K,
      height: _
    };
  }), [t, n]), nn = u.useMemo(() => {
    const f = t && t.length > 0 ? t : n, w = [];
    return f.forEach((R) => {
      const G = R.displays && R.displays.length > 0 ? R.displays : R.topology && R.topology.displays && R.topology.displays.length > 0 ? R.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: R.width || 1920, height: R.height || 1080 }], K = G.find((pe) => pe.isPrimary) || G[0], _ = K.width || K.Width || R.width || 1920, ee = K.height || K.Height || R.height || 1080, Ce = _ / ee;
      w.push({
        stationId: R.id,
        displayId: "auto",
        label: `${R.displayName || R.roleAlias || R.hostname || R.name} - ${G.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: R.displayName || R.roleAlias || R.hostname || R.name,
        stationHostname: R.hostname || R.id,
        isPrimary: !0,
        sourceWidth: _,
        sourceHeight: ee,
        nativeAspectRatio: Ce,
        aspectRatio: Ce,
        width: _,
        height: ee
      }), G.length > 1 && G.forEach((pe, Ne) => {
        const ut = (pe.displayId || `mon-${Ne}`).toLowerCase(), nt = pe.displayNumber || Ne + 1, st = pe.displayName || `Screen ${nt}`, me = pe.width || pe.Width || R.width || 1920, lt = pe.height || pe.Height || R.height || 1080, bt = me / lt;
        w.push({
          stationId: R.id,
          displayId: ut,
          label: `${R.displayName || R.roleAlias || R.hostname || R.name} - ${st}`,
          stationName: R.displayName || R.roleAlias || R.hostname || R.name,
          stationHostname: R.hostname || R.id,
          isPrimary: !!pe.isPrimary,
          sourceWidth: me,
          sourceHeight: lt,
          nativeAspectRatio: bt,
          aspectRatio: bt,
          width: me,
          height: lt
        });
      });
    }), w;
  }, [t, n]), [sn, Jt] = u.useState(() => {
    var f;
    if (((f = te == null ? void 0 : te.keyframes) == null ? void 0 : f.length) > 0) {
      const w = JSON.parse(JSON.stringify(te));
      if (t && t.length > 0) {
        const R = new Set(t.map((K) => K.id));
        if (w.keyframes.forEach((K) => {
          var _, ee;
          ((ee = (_ = K.layout) == null ? void 0 : _.placements) == null ? void 0 : ee.length) > 0 && (K.layout.placements = K.layout.placements.filter((Ce) => R.has(Ce.stationId)));
        }), w.keyframes.some((K) => {
          var _, ee;
          return ((ee = (_ = K.layout) == null ? void 0 : _.placements) == null ? void 0 : ee.length) > 0;
        })) return w;
      } else
        return w;
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
            width: jc,
            height: Cc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: Ys(dn, jc, Cc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var f;
    if (((f = te == null ? void 0 : te.keyframes) == null ? void 0 : f.length) > 0) {
      const w = JSON.parse(JSON.stringify(te));
      if (t && t.length > 0) {
        const G = new Set(t.map((K) => K.id));
        w.keyframes.forEach((K) => {
          var _, ee;
          ((ee = (_ = K.layout) == null ? void 0 : _.placements) == null ? void 0 : ee.length) > 0 && (K.layout.placements = K.layout.placements.filter((Ce) => G.has(Ce.stationId)));
        });
      }
      Jt(w), w.keyframes.some((G) => {
        var K, _;
        return ((_ = (K = G.layout) == null ? void 0 : K.placements) == null ? void 0 : _.length) > 0;
      }) && (rt.current = !0, at("custom"));
    }
  }, [te, t]);
  const mn = sn.keyframes || [], wl = u.useMemo(() => Sg(mn, F), [mn, F]), O = zt(
    T ?? wl,
    0,
    Math.max(0, mn.length - 1)
  ), oe = mn[O] || mn[wl] || mn[0], W = u.useMemo(() => {
    var f;
    return ((f = oe == null ? void 0 : oe.layout) == null ? void 0 : f.placements) || [];
  }, [oe]), Oe = u.useCallback((f = "Action") => ({
    label: f,
    timeline: JSON.parse(JSON.stringify(sn)),
    aspectId: Ft,
    presetId: xt,
    selectedFeedIndex: He
  }), [sn, Ft, xt, He]), Le = u.useCallback((f = "Action") => {
    const w = Oe(f);
    $t.current.push(w), $t.current.length > 50 && $t.current.shift(), un.current = [], ps((R) => R + 1);
  }, [Oe]), Re = u.useCallback(() => {
    Yt.current && ($t.current.push(Yt.current), $t.current.length > 50 && $t.current.shift(), un.current = [], Yt.current = null, ps((f) => f + 1));
  }, []), Ve = u.useCallback(() => {
    const f = m > 0 ? m : d + v, w = 500;
    if (f <= d + w) return O;
    const R = (oe == null ? void 0 : oe.layout) || {
      width: Me,
      height: Ae,
      backgroundColor: "#070A10",
      fps: 30,
      placements: W
    }, { nextTimeline: G, newIndex: K, isNew: _ } = Bd(sn, f, R, w);
    return _ && (Jt(G), A && A(G), L && L(K), Gt(
      `Keyframe #${K + 1} created at ${yt(f, g, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), K;
  }, [m, d, v, O, oe, Me, Ae, W, sn, A, L, g, Gt]), ue = u.useCallback((f, w = null) => {
    w && Le(w);
    const R = m > 0 ? m : d + v;
    Jt((G) => {
      const { nextTimeline: K, newIndex: _, isNewKeyframe: ee } = Mg({
        prevTimeline: G,
        newPlacements: f,
        currentEpochMs: R,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Me,
        virtualH: Ae,
        fps: 30
      });
      return A && A(K), L && L(_), ee && _ > 0 && Gt(
        `Keyframe #${_ + 1} created at ${yt(R, g, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), K;
    });
  }, [m, d, v, Me, Ae, A, L, g, Gt, Le]);
  u.useEffect(() => {
    if (dn.length > 0 && (!W || W.length === 0) && !rt.current) {
      let f = Ft;
      dn.length === 2 && Ft === "16:9" && (f = "32:9", Cs("32:9"));
      const w = Zn.find((G) => G.id === f) || Zn[0], R = Ys(dn, w.w, w.h);
      R.length > 0 && (ue(R), at("auto-grid"));
    }
  }, [dn, W, ue, Ft]);
  const qe = u.useRef("");
  u.useEffect(() => {
    const f = (t || []).map((w) => w.id).sort().join(",");
    if (qe.current === "") {
      qe.current = f;
      return;
    }
    if (qe.current !== f && (qe.current = f, t && t.length > 0)) {
      const w = new Set(t.map((R) => R.id));
      if (xt === "auto-grid" || !rt.current) {
        let R = Ft;
        dn.length === 2 && Ft === "16:9" && (R = "32:9", Cs("32:9"));
        const G = Zn.find((_) => _.id === R) || Zn[0], K = Ys(dn, G.w, G.h);
        K.length > 0 && ue(K);
      } else if (W && W.length > 0) {
        const R = W.filter((G) => w.has(G.stationId));
        if (R.length !== W.length)
          if (R.length === 0) {
            const G = Ys(dn, Me, Ae);
            ue(G);
          } else
            ue(R);
      }
    }
  }, [t, dn, xt, Ft, W, ue, Me, Ae]), u.useEffect(() => {
    U && U({
      width: Me,
      height: Ae,
      backgroundColor: "#070A10",
      fps: 30,
      placements: W,
      timeline: sn
    });
  }, [W, sn, U, Me, Ae]);
  const ct = u.useCallback((f) => {
    const w = Es, R = Zn.find((G) => G.id === f) || Zn[0];
    if (w.id !== R.id)
      if (Cs(R.id), rt.current) {
        const G = R.w / w.w, K = R.h / w.h, _ = W.map((ee) => ({
          ...ee,
          x: Math.round(ee.x * G),
          y: Math.round(ee.y * K),
          width: Math.round(ee.width * G),
          height: Math.round(ee.height * K)
        }));
        ue(_);
      } else {
        const G = dn.length > 0 ? dn : W && W.length > 0 ? W : nn, K = Ys(G, R.w, R.h);
        ue(K);
      }
  }, [Es, W, nn, ue]), jt = u.useCallback((f) => {
    const w = W.length > 0 ? Math.max(...W.map((pe) => pe.zIndex || 0)) + 1 : 0, R = pt[W.length % pt.length], G = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9), K = G >= 1 ? 640 : Math.round(360 * G), _ = G >= 1 ? Math.round(640 / G) : 360, ee = {
      stationId: f.stationId,
      displayId: f.displayId,
      label: f.label,
      x: 100 + W.length * 40 % 800,
      y: 80 + W.length * 40 % 500,
      width: K,
      height: _,
      sourceWidth: f.sourceWidth || 1920,
      sourceHeight: f.sourceHeight || 1080,
      nativeAspectRatio: G,
      aspectRatio: G,
      zIndex: w,
      rotation: 0,
      borderWidth: 2,
      borderColor: R,
      shadowEffect: "deep",
      borderRadius: 0
    }, Ce = [...W, ee];
    ue(Ce), vt(Ce.length - 1);
  }, [W, ue]), Et = u.useCallback((f) => {
    const w = W.filter((R, G) => G !== f);
    ue(w), vt((R) => Math.max(0, R - 1));
  }, [W, ue]), St = u.useCallback(() => {
    ue([]), vt(-1);
  }, [ue]), Ut = (f) => {
    const w = f.map((G, K) => ({ p: G, origIdx: K }));
    w.sort((G, K) => (G.p.zIndex ?? G.origIdx) - (K.p.zIndex ?? K.origIdx));
    const R = [...f];
    return w.forEach(({ origIdx: G }, K) => {
      R[G] = { ...R[G], zIndex: K + 1 };
    }), R;
  }, Ss = u.useCallback((f = He) => {
    if (f < 0 || !W[f]) return;
    const w = Ut(W), R = w[f].zIndex, G = w.length;
    if (R >= G) return;
    const K = w.map((_, ee) => ee === f ? { ..._, zIndex: G } : _.zIndex > R ? { ..._, zIndex: _.zIndex - 1 } : _);
    ue(K);
  }, [He, W, ue]), Zt = u.useCallback((f = He) => {
    if (f < 0 || !W[f]) return;
    const w = Ut(W), R = w[f].zIndex;
    if (R <= 1) return;
    const G = w.map((K, _) => _ === f ? { ...K, zIndex: 1 } : K.zIndex < R ? { ...K, zIndex: K.zIndex + 1 } : K);
    ue(G);
  }, [He, W, ue]), Sn = u.useCallback((f = He) => {
    if (f < 0 || !W[f]) return;
    const w = Ut(W), R = w[f].zIndex, G = R + 1;
    if (G > w.length) return;
    const K = w.map((_, ee) => ee === f ? { ..._, zIndex: G } : _.zIndex === G ? { ..._, zIndex: R } : _);
    ue(K);
  }, [He, W, ue]), gs = u.useCallback((f = He) => {
    if (f < 0 || !W[f]) return;
    const w = Ut(W), R = w[f].zIndex, G = R - 1;
    if (G < 1) return;
    const K = w.map((_, ee) => ee === f ? { ..._, zIndex: G } : _.zIndex === G ? { ..._, zIndex: R } : _);
    ue(K);
  }, [He, W, ue]), Ws = u.useCallback((f) => {
    if (He < 0 || !W[He]) return;
    const w = W.map((R, G) => G === He ? { ...R, ...f } : R);
    ue(w);
  }, [He, W, ue]), Hi = u.useCallback((f = 90) => {
    const w = W[He];
    if (!w) return;
    const G = ((w.rotation || 0) + f) % 360;
    Ws({ rotation: G });
  }, [He, W, Ws]), xr = u.useCallback((f = He) => {
    if (f < 0 || !W[f]) return;
    const w = W.length, R = W.map((G, K) => K === f ? {
      ...G,
      x: 0,
      y: 0,
      width: Me,
      height: Ae,
      zIndex: w
    } : G);
    ue(R);
  }, [He, W, ue, Me, Ae]), Us = u.useCallback((f) => {
    let w = [];
    const R = dn.length > 0 ? dn : nn.length > 0 ? nn : W;
    switch (f) {
      case "auto":
      case "auto-grid":
        w = Ys(R, Me, Ae);
        break;
      case "1x1":
        R.length > 0 && (w = [{
          ...R[0],
          x: 0,
          y: 0,
          width: Me,
          height: Ae,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: pt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (R.length >= 2) {
          const G = Math.round(Me / 2);
          w = R.slice(0, 2).map((K, _) => {
            const ee = K.nativeAspectRatio || (K.sourceWidth && K.sourceHeight ? K.sourceWidth / K.sourceHeight : 1.7777777777777777), { x: Ce, y: pe, width: Ne, height: ut } = Zs(_ * G, 0, G, Ae, ee);
            return {
              ...K,
              x: Ce,
              y: pe,
              width: Ne,
              height: ut,
              sourceWidth: K.sourceWidth || 1920,
              sourceHeight: K.sourceHeight || 1080,
              nativeAspectRatio: ee,
              aspectRatio: ee,
              zIndex: _ + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: pt[_ % pt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          w = Ys(R, Me, Ae);
        break;
      case "2x2": {
        const G = Math.round(Me / 2), K = Math.round(Ae / 2);
        w = R.slice(0, 4).map((_, ee) => ({
          ..._,
          x: ee % 2 * G,
          y: Math.floor(ee / 2) * K,
          width: G,
          height: K,
          zIndex: ee,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[ee % pt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (R.length >= 2) {
          w = [
            { ...R[0], x: 0, y: 0, width: Me, height: Ae, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: pt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const G = R.slice(1, 4), K = Math.round(Me * 0.23), _ = Math.round(K / (16 / 9));
          G.forEach((ee, Ce) => {
            w.push({
              ...ee,
              x: Me - K - 24,
              y: 24 + Ce * (_ + 16),
              width: K,
              height: _,
              zIndex: 10 + Ce,
              rotation: 0,
              borderWidth: 3,
              borderColor: pt[(Ce + 1) % pt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (R.length >= 3) {
          const G = Math.round(Me * 0.666), K = Me - G, _ = Math.round(Ae / 2);
          w = [
            { ...R[0], x: 0, y: 0, width: G, height: Ae, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...R[1], x: G, y: 0, width: K, height: _, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...R[2], x: G, y: _, width: K, height: _, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (R.length >= 3)
          if (Me / Ae >= 2.5) {
            const K = Math.round(Me / 3);
            w = R.slice(0, 3).map((_, ee) => {
              const Ce = _.nativeAspectRatio || (_.sourceWidth && _.sourceHeight ? _.sourceWidth / _.sourceHeight : 1.7777777777777777), { x: pe, y: Ne, width: ut, height: nt } = Zs(ee * K, 0, K, Ae, Ce);
              return {
                ..._,
                x: pe,
                y: Ne,
                width: ut,
                height: nt,
                sourceWidth: _.sourceWidth || 1920,
                sourceHeight: _.sourceHeight || 1080,
                nativeAspectRatio: Ce,
                aspectRatio: Ce,
                zIndex: ee,
                rotation: 0,
                borderWidth: 2,
                borderColor: pt[ee % pt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const K = Math.round(Me / 2), _ = Math.round(Ae / 2);
            w = [
              { ...R[0], x: 0, y: 0, width: K, height: _, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...R[1], x: K, y: 0, width: K, height: _, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...R[2], x: Math.round(K / 2), y: _, width: K, height: _, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    w.length > 0 && (ue(w), vt(0), f === "auto" || f === "auto-grid" ? at("auto-grid") : (at(f), rt.current = !0));
  }, [nn, W, ue, Me, Ae]), Nu = u.useCallback(() => {
    const f = we.trim() || `Custom Layout ${Te.length + 1}`, R = [{
      id: `preset-${Date.now()}`,
      name: f,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(W)),
      keyframes: JSON.parse(JSON.stringify(mn))
    }, ...Te];
    Pe(R), Ie(""), ae(!1);
  }, [we, Te, W, mn]), Sp = u.useCallback((f) => {
    !f || !f.placements || (ue(f.placements), vt(0), at("custom"), rt.current = !0, Be(!1));
  }, [ue]), bp = u.useCallback((f, w) => {
    w == null || w.stopPropagation();
    const R = Te.filter((G) => G.id !== f);
    Pe(R);
  }, [Te]), Mp = u.useCallback(() => {
    const f = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Me,
      height: Ae,
      aspectRatio: Ft,
      placements: W,
      timeline: sn
    }, w = JSON.stringify(f, null, 2), R = new window.Blob([w], { type: "application/json" }), G = window.URL.createObjectURL(R), K = document.createElement("a"), _ = /* @__PURE__ */ new Date(), ee = (pe) => String(pe).padStart(2, "0"), Ce = `${_.getFullYear()}${ee(_.getMonth() + 1)}${ee(_.getDate())}_${ee(_.getHours())}${ee(_.getMinutes())}${ee(_.getSeconds())}`;
    K.href = G, K.download = `canvas_layout_${Ce}.json`, document.body.appendChild(K), K.click(), document.body.removeChild(K), window.URL.revokeObjectURL(G);
  }, [W, sn, Me, Ae, Ft]), Ip = u.useCallback((f) => {
    var G;
    const w = (G = f.target.files) == null ? void 0 : G[0];
    if (!w) return;
    const R = new window.FileReader();
    R.onload = (K) => {
      var _, ee, Ce;
      try {
        const pe = JSON.parse(K.target.result);
        if (pe.width && pe.height) {
          const ut = Zn.find((nt) => nt.w === pe.width && nt.h === pe.height);
          ut && Cs(ut.id);
        } else if (pe.aspectRatio) {
          const ut = Zn.find((nt) => nt.id === pe.aspectRatio);
          ut && Cs(ut.id);
        }
        let Ne = null;
        Array.isArray(pe) ? Ne = pe : pe.placements && Array.isArray(pe.placements) ? Ne = pe.placements : (_ = pe.layout) != null && _.placements && Array.isArray(pe.layout.placements) && (Ne = pe.layout.placements), Ne && Ne.length > 0 && (ue(Ne), vt(0), at("custom"), rt.current = !0), ((Ce = (ee = pe.timeline) == null ? void 0 : ee.keyframes) == null ? void 0 : Ce.length) > 0 && (Jt(pe.timeline), A && A(pe.timeline));
      } catch (pe) {
        console.error("Failed to parse imported canvas JSON:", pe), alert(`Canvas Import Error: ${pe.message}`);
      }
    }, R.readAsText(w), f.target.value = "";
  }, [ue, A]), Vi = (f, w) => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), vt(w), rt.current = !0, at("custom");
    const R = Ve(), G = Ze.current || Ge.current;
    if (!G) return;
    const K = G.getBoundingClientRect(), _ = W[w];
    if (!_) return;
    Yt.current = Oe("Move Feed"), Ye.current = {
      mode: "drag",
      index: w,
      startX: f.clientX,
      startY: f.clientY,
      initialX: _.x,
      initialY: _.y,
      initialW: _.width,
      initialH: _.height,
      scaleX: Me / K.width,
      scaleY: Ae / K.height,
      activeSnapZone: null
    }, Ln(!0);
    const ee = (pe) => {
      if (!Ye.current || Ye.current.mode !== "drag") return;
      const Ne = Ye.current, ut = Ze.current || Ge.current;
      if (!ut) return;
      const nt = ut.getBoundingClientRect(), st = (pe.clientX - Ne.startX) * Ne.scaleX, me = (pe.clientY - Ne.startY) * Ne.scaleY;
      let lt = Math.round(Ne.initialX + st), bt = Math.round(Ne.initialY + me);
      lt = zt(lt, 0, Me - Ne.initialW), bt = zt(bt, 0, Ae - Ne.initialH);
      const ot = de && !pe.altKey;
      let ft = null, bn = null, zn = null;
      if (ot) {
        const At = pe.clientX - nt.left, Ct = pe.clientY - nt.top, Mt = 32, $e = Math.round(Me / 2), ht = Math.round(Ae / 2);
        if (At <= Mt ? Ct <= nt.height * 0.22 ? ft = { x: 0, y: 0, width: $e, height: ht, label: "◰ Top-Left Quarter" } : Ct >= nt.height * 0.78 ? ft = { x: 0, y: ht, width: $e, height: ht, label: "◱ Bottom-Left Quarter" } : ft = { x: 0, y: 0, width: $e, height: Ae, label: "◧ Left Half (50%)" } : At >= nt.width - Mt ? Ct <= nt.height * 0.22 ? ft = { x: $e, y: 0, width: $e, height: ht, label: "◲ Top-Right Quarter" } : Ct >= nt.height * 0.78 ? ft = { x: $e, y: ht, width: $e, height: ht, label: "◳ Bottom-Right Quarter" } : ft = { x: $e, y: 0, width: $e, height: Ae, label: "◨ Right Half (50%)" } : Ct <= Mt && At >= nt.width * 0.25 && At <= nt.width * 0.75 && (ft = { x: 0, y: 0, width: Me, height: Ae, label: "🗖 Full Canvas Maximize" }), !ft) {
          const yr = W.filter((et, vr) => vr !== Ne.index), Vs = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Me, targetX: Me - Ne.initialW, guide: 100 },
            { snapTo: $e, targetX: $e - Math.round(Ne.initialW / 2), guide: 50 }
          ];
          yr.forEach((et) => {
            Vs.push({ snapTo: et.x, targetX: et.x, guide: et.x / Me * 100 }), Vs.push({ snapTo: et.x + et.width, targetX: et.x + et.width - Ne.initialW, guide: (et.x + et.width) / Me * 100 }), Vs.push({ snapTo: et.x + et.width, targetX: et.x + et.width, guide: (et.x + et.width) / Me * 100 }), Vs.push({ snapTo: et.x, targetX: et.x - Ne.initialW, guide: et.x / Me * 100 });
          });
          let Eu = 18;
          Vs.forEach((et) => {
            const vr = Math.abs(lt - et.targetX);
            vr < Eu && (Eu = vr, lt = et.targetX, bn = et.guide);
          });
          const jl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Ae, targetY: Ae - Ne.initialH, guide: 100 },
            { snapTo: ht, targetY: ht - Math.round(Ne.initialH / 2), guide: 50 }
          ];
          yr.forEach((et) => {
            jl.push({ snapTo: et.y, targetY: et.y, guide: et.y / Ae * 100 }), jl.push({ snapTo: et.y + et.height, targetY: et.y + et.height - Ne.initialH, guide: (et.y + et.height) / Ae * 100 }), jl.push({ snapTo: et.y + et.height, targetY: et.y + et.height, guide: (et.y + et.height) / Ae * 100 }), jl.push({ snapTo: et.y, targetY: et.y - Ne.initialH, guide: et.y / Ae * 100 });
          });
          let Su = 18;
          jl.forEach((et) => {
            const vr = Math.abs(bt - et.targetY);
            vr < Su && (Su = vr, bt = et.targetY, zn = et.guide);
          });
        }
      }
      Ne.activeSnapZone = ft, Ne.latestX = lt, Ne.latestY = bt, Xe(ft), We({ vertical: bn, horizontal: zn }), Jt((At) => {
        const Ct = [...At.keyframes || []], Mt = R < Ct.length ? R : O;
        if (!Ct[Mt]) return At;
        const $e = [...Ct[Mt].layout.placements || []];
        return $e[Ne.index] ? ($e[Ne.index] = { ...$e[Ne.index], x: lt, y: bt }, Ct[Mt] = {
          ...Ct[Mt],
          layout: { ...Ct[Mt].layout, placements: $e }
        }, { ...At, keyframes: Ct }) : At;
      });
    }, Ce = () => {
      var pe;
      if (Ln(!1), We({ vertical: null, horizontal: null }), (pe = Ye.current) != null && pe.activeSnapZone) {
        const Ne = Ye.current.activeSnapZone, ut = Ye.current.index;
        Jt((nt) => {
          const st = [...nt.keyframes || []], me = R < st.length ? R : O;
          if (!st[me]) return nt;
          const lt = [...st[me].layout.placements || []];
          return lt[ut] ? (lt[ut] = {
            ...lt[ut],
            x: Ne.x,
            y: Ne.y,
            width: Ne.width,
            height: Ne.height
          }, st[me] = {
            ...st[me],
            layout: { ...st[me].layout, placements: lt }
          }, { ...nt, keyframes: st }) : nt;
        });
      }
      if (Ye.current) {
        const Ne = Ye.current, ut = Ne.initialX, nt = Ne.initialY, st = Ne.activeSnapZone ? Ne.activeSnapZone.x : Ne.latestX ?? ut, me = Ne.activeSnapZone ? Ne.activeSnapZone.y : Ne.latestY ?? nt;
        st !== ut || me !== nt ? (Re(), A && Jt((lt) => (A(lt), lt))) : Yt.current = null;
      }
      Xe(null), Ye.current = null, window.removeEventListener("mousemove", ee), window.removeEventListener("mouseup", Ce);
    };
    window.addEventListener("mousemove", ee), window.addEventListener("mouseup", Ce);
  }, vo = (f, w, R = "br") => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), vt(w), rt.current = !0, at("custom");
    const G = Ve();
    if (!Ge.current) return;
    const K = Ge.current.getBoundingClientRect(), _ = W[w];
    if (!_) return;
    Yt.current = Oe("Resize Feed");
    const ee = nn.find((st) => st.stationId === _.stationId && st.displayId === _.displayId), Ce = _.sourceWidth || (ee == null ? void 0 : ee.sourceWidth) || 1920, pe = _.sourceHeight || (ee == null ? void 0 : ee.sourceHeight) || 1080, Ne = _.nativeAspectRatio || _.aspectRatio || (ee == null ? void 0 : ee.nativeAspectRatio) || Ce / pe || _.width / _.height || 16 / 9;
    Ye.current = {
      mode: "resize",
      corner: R,
      index: w,
      startX: f.clientX,
      startY: f.clientY,
      initialX: _.x,
      initialY: _.y,
      initialW: _.width,
      initialH: _.height,
      sourceWidth: Ce,
      sourceHeight: pe,
      nativeAspectRatio: Ne,
      scaleX: Me / K.width,
      scaleY: Ae / K.height
    }, be(!0);
    const ut = (st) => {
      if (!Ye.current || Ye.current.mode !== "resize") return;
      const me = Ye.current, lt = (st.clientX - me.startX) * me.scaleX, bt = (st.clientY - me.startY) * me.scaleY, ot = st.ctrlKey || st.shiftKey || st.metaKey, ft = me.nativeAspectRatio > 0 ? me.nativeAspectRatio : me.initialW / me.initialH;
      let bn = me.initialX, zn = me.initialY, At = me.initialW, Ct = me.initialH;
      if (me.corner === "br") {
        const Mt = Me - me.initialX, $e = Ae - me.initialY;
        if (ot) {
          let ht = Math.max(160, Math.min(Mt, Math.round(me.initialW + lt))), it = Math.round(ht / ft);
          it > $e && (it = $e, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Ct = it;
        } else
          At = zt(Math.round(me.initialW + lt), 160, Mt), Ct = zt(Math.round(me.initialH + bt), 90, $e);
      } else if (me.corner === "bl") {
        const Mt = me.initialX + me.initialW, $e = Ae - me.initialY;
        if (ot) {
          let ht = Math.max(160, Math.min(Mt, Math.round(me.initialW - lt))), it = Math.round(ht / ft);
          it > $e && (it = $e, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Ct = it, bn = me.initialX + me.initialW - At;
        } else
          At = zt(Math.round(me.initialW - lt), 160, Mt), Ct = zt(Math.round(me.initialH + bt), 90, $e), bn = me.initialX + me.initialW - At;
      } else if (me.corner === "tr") {
        const Mt = Me - me.initialX, $e = me.initialY + me.initialH;
        if (ot) {
          let ht = Math.max(160, Math.min(Mt, Math.round(me.initialW + lt))), it = Math.round(ht / ft);
          it > $e && (it = $e, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Ct = it, zn = me.initialY + me.initialH - Ct;
        } else
          At = zt(Math.round(me.initialW + lt), 160, Mt), Ct = zt(Math.round(me.initialH - bt), 90, $e), zn = me.initialY + me.initialH - Ct;
      } else if (me.corner === "tl") {
        const Mt = me.initialX + me.initialW, $e = me.initialY + me.initialH;
        if (ot) {
          let ht = Math.max(160, Math.min(Mt, Math.round(me.initialW - lt))), it = Math.round(ht / ft);
          it > $e && (it = $e, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Ct = it, bn = me.initialX + me.initialW - At, zn = me.initialY + me.initialH - Ct;
        } else
          At = zt(Math.round(me.initialW - lt), 160, Mt), Ct = zt(Math.round(me.initialH - bt), 90, $e), bn = me.initialX + me.initialW - At, zn = me.initialY + me.initialH - Ct;
      }
      Jt((Mt) => {
        const $e = [...Mt.keyframes || []], ht = G < $e.length ? G : O;
        if (!$e[ht]) return Mt;
        const it = [...$e[ht].layout.placements || []];
        return it[me.index] ? (it[me.index] = {
          ...it[me.index],
          x: bn,
          y: zn,
          width: At,
          height: Ct,
          sourceWidth: me.sourceWidth,
          sourceHeight: me.sourceHeight,
          nativeAspectRatio: me.nativeAspectRatio,
          aspectRatio: me.nativeAspectRatio
        }, $e[ht] = {
          ...$e[ht],
          layout: { ...$e[ht].layout, placements: it }
        }, { ...Mt, keyframes: $e }) : Mt;
      });
    }, nt = () => {
      if (Ye.current) {
        const st = Ye.current, me = st.latestW ?? st.initialW, lt = st.latestH ?? st.initialH;
        me !== st.initialW || lt !== st.initialH ? (Re(), A && Jt((bt) => (A(bt), bt))) : Yt.current = null;
      }
      be(!1), Ye.current = null, window.removeEventListener("mousemove", ut), window.removeEventListener("mouseup", nt);
    };
    window.addEventListener("mousemove", ut), window.addEventListener("mouseup", nt);
  }, Tp = u.useCallback((f) => {
    const w = W[f];
    if (!w) return;
    const R = nn.find((Ce) => Ce.stationId === w.stationId && Ce.displayId === w.displayId), G = w.nativeAspectRatio || w.aspectRatio || (R == null ? void 0 : R.nativeAspectRatio) || (w.sourceWidth && w.sourceHeight ? w.sourceWidth / w.sourceHeight : 16 / 9);
    let K = w.width, _ = Math.round(K / G);
    w.y + _ > Ae && (_ = Ae - w.y, K = Math.round(_ * G)), w.x + K > Me && (K = Me - w.x, _ = Math.round(K / G));
    const ee = W.map((Ce, pe) => pe === f ? {
      ...Ce,
      width: Math.max(160, K),
      height: Math.max(90, _),
      sourceWidth: w.sourceWidth || (R == null ? void 0 : R.sourceWidth) || 1920,
      sourceHeight: w.sourceHeight || (R == null ? void 0 : R.sourceHeight) || 1080,
      nativeAspectRatio: G,
      aspectRatio: G
    } : Ce);
    ue(ee, "Snap Native Aspect");
  }, [W, nn, ue]), Ki = u.useCallback(() => {
    if ($t.current.length === 0) return;
    const f = Oe("Redo State");
    un.current.push(f), un.current.length > 50 && un.current.shift();
    const w = $t.current.pop();
    w && (Jt(w.timeline), A && A(w.timeline), w.aspectId && w.aspectId !== Ft && Cs(w.aspectId), w.presetId && at(w.presetId), w.selectedFeedIndex !== void 0 && vt(w.selectedFeedIndex), rt.current = !0, ps((R) => R + 1), Gt(`Undo: ${w.label || "Previous State"}`, "undo", "↺"));
  }, [Oe, A, Ft, Gt]), Yi = u.useCallback(() => {
    if (un.current.length === 0) return;
    const f = Oe("Undo State");
    $t.current.push(f), $t.current.length > 50 && $t.current.shift();
    const w = un.current.pop();
    w && (Jt(w.timeline), A && A(w.timeline), w.aspectId && w.aspectId !== Ft && Cs(w.aspectId), w.presetId && at(w.presetId), w.selectedFeedIndex !== void 0 && vt(w.selectedFeedIndex), rt.current = !0, ps((R) => R + 1), Gt(`Redo: ${w.label || "Restored State"}`, "info", "↻"));
  }, [Oe, A, Ft, Gt]), ku = u.useCallback(() => {
    const w = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(W)),
      keyframes: JSON.parse(JSON.stringify(mn)),
      aspectId: Ft,
      width: Me,
      height: Ae
    }, ...Te.filter((R) => R.id !== "preset-quicksave")];
    Pe(w);
    try {
      pp({
        canvasLayoutTimeline: sn,
        selectedAspectId: Ft,
        selectedPresetId: xt,
        isFullWidth: tn
      });
    } catch (R) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", R);
    }
    Gt(`State Saved (${Me}×${Ae} • ${W.length} Feeds)`, "success", "💾");
  }, [W, mn, Ft, Me, Ae, Te, Pe, sn, xt, tn, Gt]);
  u.useEffect(() => {
    const f = () => Ki(), w = () => Yi(), R = () => ku();
    return window.addEventListener("itb:studio-undo", f), window.addEventListener("itb:studio-redo", w), window.addEventListener("itb:studio-save-now", R), () => {
      window.removeEventListener("itb:studio-undo", f), window.removeEventListener("itb:studio-redo", w), window.removeEventListener("itb:studio-save-now", R);
    };
  }, [Ki, Yi, ku]);
  const Ap = u.useCallback(() => {
    Qe((f) => {
      const w = !f;
      if (w) {
        r && r(null);
        const R = tt.current;
        R && R.requestFullscreen && R.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return w;
    });
  }, [r]), Rp = u.useCallback(() => {
    const f = m > 0 ? m : d + v, { nextTimeline: w, newIndex: R, isNew: G } = Bd(
      sn,
      f,
      (oe == null ? void 0 : oe.layout) || {
        width: Me,
        height: Ae,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(W))
      }
    );
    G ? (Le("Add Keyframe"), Jt(w), A && A(w), L && L(R), Gt(`Keyframe #${R + 1} created at ${yt(f, g, { includeSeconds: !0 })}`, "success", "💎")) : (L && L(R), Gt(`Jumped to existing Keyframe #${R + 1}`, "info", "💎"));
  }, [m, d, v, oe, W, Me, Ae, sn, A, L, g, Gt, Le]);
  u.useCallback(() => {
    if (mn.length <= 1 || O === 0) {
      Gt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Le("Delete Keyframe");
    const { nextTimeline: f, success: w, newIndex: R } = Ig(sn, O);
    w && (Jt(f), A && A(f), L && L(R), Gt("Keyframe deleted", "info", "🗑️"));
  }, [mn, O, sn, A, L, Gt, Le]), u.useCallback((f) => {
    O !== 0 && (Le("Update Transition Type"), Jt((w) => {
      const R = wc(w, O, { transitionType: f });
      return A && A(R), R;
    }));
  }, [O, A, Le]), u.useCallback((f) => {
    O !== 0 && (Le("Update Transition Duration"), Jt((w) => {
      const R = wc(w, O, { transitionDurationSec: f });
      return A && A(R), R;
    }));
  }, [O, A, Le]), u.useEffect(() => {
    const f = (w) => {
      if (!(w.target.tagName === "INPUT" || w.target.tagName === "TEXTAREA" || w.target.isContentEditable)) {
        if (w.key === "Delete" || w.key === "Backspace") {
          He >= 0 && W[He] && (w.preventDefault(), Et(He));
          return;
        }
        if ((w.code === "Space" || w.key === " ") && C) {
          w.preventDefault(), C((R) => !R);
          return;
        }
        if ((w.key === "k" || w.key === "K") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), Rp();
          return;
        }
        if (w.key === "Escape") {
          le(!1), Be(!1), Tt(!1), En(!1), Qt(!1), ae(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(w.key)) {
          if (He >= 0 && W[He]) {
            w.preventDefault(), rt.current = !0, at("custom");
            const R = w.shiftKey ? 1 : 10;
            let G = 0, K = 0;
            w.key === "ArrowLeft" && (G = -R), w.key === "ArrowRight" && (G = R), w.key === "ArrowUp" && (K = -R), w.key === "ArrowDown" && (K = R);
            const _ = W[He], ee = zt(_.x + G, 0, Me - _.width), Ce = zt(_.y + K, 0, Ae - _.height), pe = W.map((Ne, ut) => ut === He ? { ...Ne, x: ee, y: Ce } : Ne);
            ue(pe);
          }
          return;
        }
        if ((w.key === "r" || w.key === "R") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), Y((R) => !R);
          return;
        }
        if ((w.key === "s" || w.key === "S") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), ve((R) => !R);
          return;
        }
      }
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [He, W, Et, ue, Y, ve]);
  const wu = u.useMemo(() => bg({
    keyframes: mn,
    currentEpochMs: F,
    currentPlacements: W,
    isEditing: cn || Se
  }), [cn, Se, mn, F, W]), $p = u.useMemo(() => wu.map((f, w) => ({ ...f, originalIndex: w })).sort((f, w) => (f.zIndex ?? f.originalIndex) - (w.zIndex ?? w.originalIndex)), [wu]), zs = W[He] || null, { filteredPlaced: Hs, filteredUnplaced: No } = u.useMemo(() => {
    const f = (ie || "").toLowerCase(), w = W.map((_, ee) => {
      const Ce = _.zIndex ?? ee + 1, pe = nn.find((Ne) => Ne.stationId === _.stationId && Ne.displayId === _.displayId);
      return {
        type: "placed",
        origIdx: ee,
        placement: _,
        feed: pe,
        stationId: _.stationId,
        displayId: _.displayId,
        label: _.label || (pe == null ? void 0 : pe.label) || `${_.stationId} (${_.displayId})`,
        layerRank: Ce,
        isSelected: ee === He,
        sourceWidth: _.sourceWidth || (pe == null ? void 0 : pe.sourceWidth) || 1920,
        sourceHeight: _.sourceHeight || (pe == null ? void 0 : pe.sourceHeight) || 1080
      };
    });
    w.sort((_, ee) => ee.layerRank - _.layerRank);
    const R = nn.filter((_) => !W.some((ee) => ee.stationId === _.stationId && ee.displayId === _.displayId)).map((_) => ({
      type: "unplaced",
      feed: _,
      stationId: _.stationId,
      displayId: _.displayId,
      label: _.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: _.sourceWidth || 1920,
      sourceHeight: _.sourceHeight || 1080
    })), G = f ? w.filter((_) => _.label.toLowerCase().includes(f)) : w, K = f ? R.filter((_) => _.label.toLowerCase().includes(f)) : R;
    return { filteredPlaced: G, filteredUnplaced: K };
  }, [W, nn, He, ie]), ju = u.useCallback((f, w) => {
    f.stopPropagation(), H(w), f.dataTransfer.effectAllowed = "copyMove", f.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: w.origIdx,
      type: w.type,
      stationId: w.stationId,
      displayId: w.displayId
    }));
  }, []), Lp = u.useCallback((f, w) => {
    f.preventDefault(), f.stopPropagation(), f.dataTransfer.dropEffect = "move";
    const R = f.currentTarget.getBoundingClientRect(), G = R.top + R.height / 2, K = f.clientY < G ? "above" : "below";
    he((_) => _.index === w && _.position === K ? _ : { index: w, position: K });
  }, []), Op = u.useCallback((f, w) => {
    f.stopPropagation(), he((R) => R.index === w ? { index: null, position: null } : R);
  }, []), Cu = u.useCallback(() => {
    H(null), he({ index: null, position: null });
  }, []), Dp = u.useCallback((f, w) => {
    f.preventDefault(), f.stopPropagation();
    const R = ne;
    he({ index: null, position: null }), H(null);
    const G = f.dataTransfer.getData("text/plain");
    if (G)
      try {
        const K = JSON.parse(G);
        if (K.type === "placed") {
          const _ = K.origIdx, ee = Hs.findIndex((st) => st.origIdx === _);
          if (ee === -1) return;
          let Ce = w;
          if (R.position === "below" && (Ce += 1), ee < Ce && (Ce -= 1), ee === Ce) return;
          const pe = [...Hs], [Ne] = pe.splice(ee, 1);
          pe.splice(Ce, 0, Ne);
          const ut = pe.length, nt = W.map((st, me) => {
            const lt = pe.findIndex((bt) => bt.origIdx === me);
            return lt !== -1 ? {
              ...st,
              zIndex: ut - lt
            } : st;
          });
          ue(nt), vt(Ne.origIdx);
        } else if (K.type === "unplaced") {
          const _ = nn.find((ft) => ft.stationId === K.stationId && ft.displayId === K.displayId);
          if (!_) return;
          const ee = _.nativeAspectRatio || (_.sourceWidth && _.sourceHeight ? _.sourceWidth / _.sourceHeight : 16 / 9), Ce = ee >= 1 ? 640 : Math.round(360 * ee), pe = ee >= 1 ? Math.round(640 / ee) : 360, Ne = pt[W.length % pt.length];
          let ut = w;
          R.position === "below" && (ut += 1);
          const nt = {
            stationId: _.stationId,
            displayId: _.displayId,
            label: _.label,
            x: 100 + W.length * 40 % 800,
            y: 80 + W.length * 40 % 500,
            width: Ce,
            height: pe,
            sourceWidth: _.sourceWidth || 1920,
            sourceHeight: _.sourceHeight || 1080,
            nativeAspectRatio: ee,
            aspectRatio: ee,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: Ne,
            shadowEffect: "deep",
            borderRadius: 0
          }, st = [...W, nt], me = st.length - 1, lt = [...Hs];
          lt.splice(ut, 0, { origIdx: me });
          const bt = lt.length, ot = st.map((ft, bn) => {
            const zn = lt.findIndex((At) => At.origIdx === bn);
            return {
              ...ft,
              zIndex: zn !== -1 ? bt - zn : 1
            };
          });
          ue(ot), vt(me);
        }
      } catch (K) {
        console.warn("Failed to handle layer drag drop:", K);
      }
  }, [ne, Hs, W, nn, ue]), Pp = u.useCallback((f) => {
    f.preventDefault();
    const w = f.dataTransfer.getData("text/plain");
    if (!(!w || !Ge.current))
      try {
        const R = JSON.parse(w), G = Ge.current.getBoundingClientRect(), K = f.clientX - G.left, _ = f.clientY - G.top, ee = zt(Math.round(K / G.width * Me), 0, Me - 320), Ce = zt(Math.round(_ / G.height * Ae), 0, Ae - 180);
        if (R.type === "unplaced") {
          const pe = nn.find((Ne) => Ne.stationId === R.stationId && Ne.displayId === R.displayId);
          if (pe) {
            const Ne = pe.nativeAspectRatio || (pe.sourceWidth && pe.sourceHeight ? pe.sourceWidth / pe.sourceHeight : 1.7777777777777777), ut = Ne >= 1 ? 640 : Math.round(360 * Ne), nt = Ne >= 1 ? Math.round(640 / Ne) : 360, st = W.length > 0 ? Math.max(...W.map((ot) => ot.zIndex || 0)) + 1 : 1, me = pt[W.length % pt.length], lt = {
              stationId: pe.stationId,
              displayId: pe.displayId,
              label: pe.label,
              x: zt(ee, 0, Me - ut),
              y: zt(Ce, 0, Ae - nt),
              width: ut,
              height: nt,
              sourceWidth: pe.sourceWidth || 1920,
              sourceHeight: pe.sourceHeight || 1080,
              nativeAspectRatio: Ne,
              aspectRatio: Ne,
              zIndex: st,
              rotation: 0,
              borderWidth: 2,
              borderColor: me,
              shadowEffect: "deep",
              borderRadius: 0
            }, bt = [...W, lt];
            ue(bt), vt(bt.length - 1);
          }
        } else if (R.type === "placed" && R.origIdx !== void 0) {
          const pe = W.map((Ne, ut) => ut === R.origIdx ? {
            ...Ne,
            x: zt(ee, 0, Me - Ne.width),
            y: zt(Ce, 0, Ae - Ne.height)
          } : Ne);
          ue(pe), vt(R.origIdx);
        }
      } catch (R) {
        console.warn("Canvas drop failed:", R);
      }
  }, [nn, W, ue, Me, Ae]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: tt,
      className: `multicam-viewport-root canvas-grid ${je ? "fullscreen-grid-active" : ""}`,
      children: [
        (cn || Se) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: cn ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        _t && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${_t.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: _t.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: _t.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: ln, className: `canvas-stage-wrapper ${tn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          J && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  W.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => le(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: ie,
                onChange: (f) => De(f.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Hs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Hs.length })
                ] }),
                Hs.map((f, w) => {
                  const R = Fe && Fe.type === "placed" && Fe.origIdx === f.origIdx, K = ne.index === w ? ne.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${f.isSelected ? "is-selected" : ""} ${R ? "is-dragging-row" : ""} ${K}`,
                      draggable: !0,
                      onDragStart: (_) => ju(_, f),
                      onDragOver: (_) => Lp(_, w),
                      onDragLeave: (_) => Op(_, w),
                      onDrop: (_) => Dp(_, w),
                      onDragEnd: Cu,
                      onClick: () => vt(f.origIdx),
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
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (_) => _.stopPropagation(), children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Sn(f.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => gs(f.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => Et(f.origIdx),
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
              No.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: No.length })
                ] }),
                No.map((f) => {
                  const w = Fe && Fe.type === "unplaced" && Fe.stationId === f.stationId && Fe.displayId === f.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${w ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (R) => ju(R, f),
                      onDragEnd: Cu,
                      onClick: () => jt(f.feed),
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
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (R) => R.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-add-row",
                            onClick: () => jt(f.feed),
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
              Hs.length === 0 && No.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Us("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: St, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${J ? "active" : ""}`,
                  onClick: () => le((f) => !f),
                  title: `Feeds & Layers Palette (${W.length}/${nn.length} on canvas)`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: W.length }),
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
                    className: `btn-wing-tool ${X ? "active" : ""}`,
                    onClick: () => {
                      Q((f) => !f), ge(!1);
                    },
                    title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                    ]
                  }
                ),
                X && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        at("auto-grid"), Us("auto-grid"), Q(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: dn.length })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "1x1" ? "active" : ""}`,
                      onClick: () => {
                        at("1x1"), Us("1x1"), Q(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "1x2" ? "active" : ""}`,
                      onClick: () => {
                        at("1x2"), Us("1x2"), Q(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "2x2" ? "active" : ""}`,
                      onClick: () => {
                        at("2x2"), Us("2x2"), Q(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "1+3-pip" ? "active" : ""}`,
                      onClick: () => {
                        at("1+3-pip"), Us("1+3-pip"), Q(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "hero-stacked" ? "active" : ""}`,
                      onClick: () => {
                        at("hero-stacked"), Us("hero-stacked"), Q(!1);
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
                    className: `btn-wing-tool ${fe ? "active" : ""}`,
                    onClick: () => {
                      ge((f) => !f), Q(!1);
                    },
                    title: `Aspect Ratio: ${Ft} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Ft })
                    ]
                  }
                ),
                fe && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  Zn.map((f) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ft === f.id ? "active" : ""}`,
                      onClick: () => {
                        ct(f.id), ge(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: f.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                          f.w,
                          "×",
                          f.h
                        ] })
                      ]
                    },
                    f.id
                  ))
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${tn ? "highlight-emerald" : "highlight-cyan"}`,
                  onClick: On,
                  title: tn ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: tn ? "↔" : "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: tn ? "100%" : "FIT" })
                  ]
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${de ? "active" : ""}`,
                  onClick: () => ve((f) => !f),
                  title: de ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                  className: `btn-wing-tool ${Ke ? "active" : ""}`,
                  onClick: () => Y((f) => !f),
                  title: Ke ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  onClick: Ki,
                  disabled: $t.current.length === 0,
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
                  onClick: Yi,
                  disabled: un.current.length === 0,
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
                  Ge.current = f, Ze.current = f;
                },
                className: `canvas-master-frame-16-9 ${tn ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: Rt.width > 180 ? `${Rt.width}px` : "100%",
                  height: Rt.height > 100 ? `${Rt.height}px` : "auto",
                  aspectRatio: `${Me} / ${Ae}`
                },
                onMouseMove: yo,
                onMouseLeave: zi,
                onDragOver: (f) => {
                  f.preventDefault(), f.dataTransfer.dropEffect = "copy";
                },
                onDrop: Pp,
                onClick: () => gt(!1),
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                  Ee && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-ghost-preview",
                      style: {
                        position: "absolute",
                        left: `${Ee.x / Me * 100}%`,
                        top: `${Ee.y / Ae * 100}%`,
                        width: `${Ee.width / Me * 100}%`,
                        height: `${Ee.height / Ae * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: Ee.label })
                      ] })
                    }
                  ),
                  Ke && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Me}×${Ae}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Je.isInside ? `${Je.x},${Je.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${Me} 20`,
                        preserveAspectRatio: "none",
                        children: [
                          zs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: zs.x,
                              y: "0",
                              width: zs.width,
                              height: "20",
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          vn.map((f) => f.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: f.val, y1: "0", x2: f.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: f.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: f.val })
                          ] }, `rx-${f.val}`) : f.isMed ? /* @__PURE__ */ s.jsx("line", { x1: f.val, y1: "8", x2: f.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${f.val}`) : /* @__PURE__ */ s.jsx("line", { x1: f.val, y1: "13", x2: f.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${f.val}`)),
                          Je.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: Je.x,
                              y1: "0",
                              x2: Je.x,
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
                        viewBox: `0 0 20 ${Ae}`,
                        preserveAspectRatio: "none",
                        children: [
                          zs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: "0",
                              y: zs.y,
                              width: "20",
                              height: zs.height,
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          Fr.map((f) => f.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: f.val, x2: "18", y2: f.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: f.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: f.val })
                          ] }, `ry-${f.val}`) : f.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: f.val, x2: "18", y2: f.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${f.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: f.val, x2: "18", y2: f.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${f.val}`)),
                          Je.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: Je.y,
                              x2: "20",
                              y2: Je.y,
                              stroke: "#06B6D4",
                              strokeWidth: "2"
                            }
                          )
                        ]
                      }
                    ) })
                  ] }),
                  re.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${re.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  re.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${re.horizontal}%`,
                        height: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  W.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                    /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                    /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                    /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => le(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Us("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  $p.map((f) => {
                    var Mt;
                    const w = f.originalIndex, R = He === w, G = cn && He === w, K = Se && He === w, _ = (n.length > 0 ? n : t).find(
                      ($e) => {
                        var ht, it, yr, Vs;
                        return $e.id === f.stationId || ((ht = $e.hostname) == null ? void 0 : ht.toLowerCase()) === ((it = f.stationId) == null ? void 0 : it.toLowerCase()) || ((yr = $e.id) == null ? void 0 : yr.toLowerCase()) === ((Vs = f.stationId) == null ? void 0 : Vs.toLowerCase());
                      }
                    ), ee = nn.find(($e) => $e.stationId === f.stationId && $e.displayId === f.displayId), Ce = _ || {
                      id: f.stationId,
                      hostname: (ee == null ? void 0 : ee.stationHostname) || f.stationHostname || f.stationId,
                      displayName: (ee == null ? void 0 : ee.stationName) || f.label || f.stationId,
                      displays: ee ? [{ displayId: ee.displayId, width: ee.sourceWidth, height: ee.sourceHeight }] : []
                    }, pe = (Ce == null ? void 0 : Ce.displays) || ((Mt = Ce == null ? void 0 : Ce.topology) == null ? void 0 : Mt.displays) || [], Ne = W.filter(
                      ($e) => $e.stationId === f.stationId || Ce && ($e.stationId === Ce.id || $e.stationId === Ce.hostname)
                    ), ut = pe.length > 1 && Ne.length >= pe.length, nt = f.borderColor || pt[w % pt.length], st = f.borderWidth !== void 0 ? f.borderWidth : 2, me = f.rotation || 0, lt = f.shadowEffect || "deep", bt = f.borderRadius || 0, ot = f.x / Me * 100, ft = f.y / Ae * 100, bn = f.width / Me * 100, zn = f.height / Ae * 100, At = Rg(lt, R, nt);
                    f.y < 50, f.x < 100, f.x + f.width > Me - 100;
                    const Ct = f.zIndex !== void 0 ? f.zIndex : w + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${R ? "is-selected" : ""} ${G ? "is-dragging" : ""} ${K ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${ot}%`,
                          top: `${ft}%`,
                          width: `${bn}%`,
                          height: `${zn}%`,
                          zIndex: Ct * 10 + (G ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${st}px solid ${nt}`,
                          borderRadius: `${bt}px`,
                          boxShadow: At,
                          opacity: f.opacity !== void 0 ? f.opacity : 1,
                          pointerEvents: f.opacity !== void 0 && f.opacity < 0.1 ? "none" : "auto",
                          cursor: G ? "grabbing" : "grab",
                          transition: G || K ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: ($e) => Vi($e, w),
                        onContextMenu: ($e) => {
                          $e.preventDefault(), $e.stopPropagation(), vt(w), gt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: ($e) => Vi($e, w),
                              onDoubleClick: () => xr(w),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: f.label || `${Ce.displayName || f.stationId} (${f.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(f.width),
                                  "×",
                                  Math.round(f.height),
                                  " (",
                                  Nr(f.width, f.height),
                                  ") @ (",
                                  Math.round(f.x),
                                  ",",
                                  Math.round(f.y),
                                  ")",
                                  me !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    me,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${Ct}`, children: [
                                  "#$",
                                  Ct
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-badge-action-inspector ${R && Cn ? "active" : ""}`,
                                    onClick: ($e) => {
                                      $e.stopPropagation(), vt(w), gt((ht) => !ht || He !== w);
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
                                  transform: me ? `rotate(${me}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: G ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Cg,
                                  {
                                    station: Ce,
                                    isSolo: !1,
                                    currentEpochMs: F,
                                    timeMode: g,
                                    isPlaying: N,
                                    setIsPlaying: C,
                                    baseEpochMs: d,
                                    totalDurationMs: b,
                                    outPointMs: k,
                                    setPlayheadMs: p,
                                    globalGaps: h,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: M,
                                    playbackSpeed: E,
                                    activeAudioStationId: ce,
                                    onSoloAudio: q,
                                    directorPlan: x || (Ce == null ? void 0 : Ce.directorPlan),
                                    isAutoDirectorEnabled: a ? a[Ce.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: i,
                                    targetDisplayId: f.displayId,
                                    onSelectDisplayId: ($e) => {
                                      const ht = W.map((it, yr) => yr === w ? { ...it, displayId: $e } : it);
                                      ue(ht);
                                    },
                                    areAllDisplaysPlaced: ut,
                                    slotIndex: w,
                                    borderColor: nt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: ($e) => Vi($e, w),
                                onDoubleClick: () => xr(w),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          R && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: ($e) => vo($e, w, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Nr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: ($e) => vo($e, w, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Nr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: ($e) => vo($e, w, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Nr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: ($e) => vo($e, w, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Nr(f.sourceWidth, f.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${f.stationId}-${f.displayId}-${w}`
                    );
                  }),
                  !z && Cn && He !== null && zs && (() => {
                    const f = zs, w = He, R = f.borderColor || pt[w % pt.length], G = f.borderWidth !== void 0 ? f.borderWidth : 2, K = f.rotation || 0, _ = f.shadowEffect || "deep", ee = f.zIndex !== void 0 ? f.zIndex : w + 1, Ce = f.x / Me * 100, pe = f.width / Me * 100, Ne = Ce + pe / 2;
                    let ut = `${Ne}%`, nt = "translateX(-50%)";
                    Ne < 28 ? (ut = `${Math.max(1, Ce)}%`, nt = "none") : Ne > 72 && (ut = `${Math.min(99, Ce + pe)}%`, nt = "translateX(-100%)");
                    const st = f.y + f.height + 8;
                    let me;
                    st + 45 > Ae ? me = `${Math.max(20, (f.y + f.height - 44) / Ae * 100)}%` : me = `${st / Ae * 100}%`;
                    const lt = (n.length > 0 ? n : t).find(
                      (ot) => {
                        var ft, bn;
                        return ot.id === f.stationId || ((ft = ot.hostname) == null ? void 0 : ft.toLowerCase()) === ((bn = f.stationId) == null ? void 0 : bn.toLowerCase());
                      }
                    ), bt = lt ? lt.id : f.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector",
                        style: {
                          position: "absolute",
                          left: ut,
                          top: me,
                          transform: nt,
                          zIndex: 99999
                        },
                        onMouseDown: (ot) => ot.stopPropagation(),
                        onClick: (ot) => ot.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen Controls: ${f.label || bt} • Layer #${ee}`, children: [
                            "🎛️ #",
                            ee
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: "btn-color-swatch-trigger",
                                onClick: () => Qt((ot) => !ot),
                                title: "🎨 Border Color: Click to choose accent frame color",
                                children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "control-icon", children: "🎨" }),
                                  /* @__PURE__ */ s.jsx(
                                    "span",
                                    {
                                      className: "swatch-circle",
                                      style: { backgroundColor: R === "transparent" ? "#1E293B" : R }
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx("span", { className: "caret", children: "▾" })
                                ]
                              }
                            ),
                            Wt && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Tg.map((ot) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${R === ot ? "is-active" : ""}`,
                                style: { backgroundColor: ot === "transparent" ? "#1E293B" : ot },
                                onClick: () => {
                                  Ws({ borderColor: ot }), Qt(!1);
                                },
                                title: ot === "transparent" ? "No Border (Transparent)" : `Set Border Color to ${ot}`
                              },
                              ot
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group width-select-group", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "control-icon", title: "Border Stroke Width", children: "📏" }),
                            /* @__PURE__ */ s.jsxs(
                              "select",
                              {
                                className: "tactical-select width-select",
                                value: G,
                                onChange: (ot) => Ws({ borderWidth: Number(ot.target.value) }),
                                title: "Border Width: Set border frame thickness (0px to 12px)",
                                children: [
                                  /* @__PURE__ */ s.jsx("option", { value: 0, children: "━ 0px (None)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: 2, children: "━ 2px (Thin)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: 4, children: "━━ 4px (Standard)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: 6, children: "━━━ 6px (Thick)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: 8, children: "━━━━ 8px (Heavy)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: 12, children: "━━━━━ 12px (Ultra)" })
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group shadow-select-group", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "control-icon", title: "Drop Shadow & Ambient Glow", children: "🌑" }),
                            /* @__PURE__ */ s.jsx(
                              "select",
                              {
                                className: "tactical-select shadow-select",
                                value: _,
                                onChange: (ot) => Ws({ shadowEffect: ot.target.value }),
                                title: "Drop Shadow & Glow: Add visual depth or tactical glow to this window",
                                children: Ag.map((ot) => /* @__PURE__ */ s.jsx("option", { value: ot.id, children: ot.label }, ot.id))
                              }
                            )
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group layer-select-group", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "control-icon", title: "Layer Stacking Depth", children: "📑" }),
                            /* @__PURE__ */ s.jsxs(
                              "select",
                              {
                                className: "tactical-select layer-select",
                                value: "",
                                onChange: (ot) => {
                                  const ft = ot.target.value;
                                  ft === "front" ? Ss(w) : ft === "back" ? Zt(w) : ft === "up" ? Sn(w) : ft === "down" && gs(w);
                                },
                                title: `Layer Stacking Order: Currently Layer #${ee}. Choose to bring in front or send behind.`,
                                children: [
                                  /* @__PURE__ */ s.jsxs("option", { value: "", disabled: !0, children: [
                                    "L#",
                                    ee,
                                    " ▾"
                                  ] }),
                                  /* @__PURE__ */ s.jsx("option", { value: "front", children: "⏫ Bring to Front (Top)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: "up", children: "▲ Step Forward (+1)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: "down", children: "▼ Step Backward (-1)" }),
                                  /* @__PURE__ */ s.jsx("option", { value: "back", children: "⏬ Send to Back (Bottom)" })
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group rotate", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "control-icon", title: "Screen Rotation Controls", children: "🔄" }),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-action-tool",
                                onClick: () => Hi(90),
                                title: "Rotate: Step 90 degrees clockwise (↺)",
                                children: "↺ 90°"
                              }
                            ),
                            /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-action-tool ${Nt ? "active" : ""}`,
                                onClick: () => En((ot) => !ot),
                                title: `Fine Rotation: Click to toggle angle slider (Current: ${K}°)`,
                                children: [
                                  "📐 ",
                                  K,
                                  "°"
                                ]
                              }
                            ),
                            Nt && /* @__PURE__ */ s.jsx(
                              "input",
                              {
                                type: "range",
                                min: "-180",
                                max: "180",
                                value: K,
                                onChange: (ot) => Ws({ rotation: Number(ot.target.value) }),
                                className: "rotation-slider",
                                title: `Adjust tilt angle: ${K}°`
                              }
                            )
                          ] }),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool highlight",
                              onClick: () => Tp(w),
                              title: `Native Recorded Aspect Ratio: Snap window to its exact recorded aspect (${Nr(f.sourceWidth, f.sourceHeight)}) to remove any distortion`,
                              children: [
                                "📐 NATIVE (",
                                Nr(f.sourceWidth, f.sourceHeight),
                                ")"
                              ]
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool highlight",
                              onClick: () => xr(w),
                              title: "1x1 Focus Viewport: Maximize this window to fill 100% of the canvas frame (Double-clicking the card also maximizes)",
                              children: "⊞ 1x1 FOCUS"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool",
                              onClick: () => l && l(bt, f.displayId),
                              title: "Deep Forensic Spotlight: Open multi-angle synchronized forensic viewer for this workstation",
                              children: "🔍 SPOTLIGHT"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool btn-del-feed",
                              onClick: () => Et(w),
                              title: "Remove Screen: Remove this window from canvas (can be restored anytime from the Feeds Palette)",
                              children: "🗑️ REMOVE"
                            }
                          )
                        ]
                      }
                    );
                  })()
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => ae(!0),
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
                    className: `btn-wing-tool ${ye ? "active" : ""}`,
                    onClick: () => Be((f) => !f),
                    title: `Saved Presets Library (${Te.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Te.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                ye && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Be(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Te.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Te.map((f) => {
                    var w;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      Sp(f), Be(!1);
                    }, children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: f.name }),
                        /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                          ((w = f.placements) == null ? void 0 : w.length) || 0,
                          " screens • ",
                          f.dateStr
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-del-preset",
                          onClick: (R) => bp(f.id, R),
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
                  onClick: Mp,
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
                    return (f = ke.current) == null ? void 0 : f.click();
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
                  ref: ke,
                  type: "file",
                  accept: ".json",
                  style: { display: "none" },
                  onChange: Ip
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-rose",
                  onClick: () => {
                    rt.current = !1, at("auto-grid");
                    const f = dn.length > 0 ? dn : nn, w = Ys(f, Me, Ae), R = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: Me,
                            height: Ae,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: w
                          }
                        }
                      ]
                    };
                    Jt(R), A && A(R), vt(0);
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
                  onClick: St,
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
                  className: `btn-wing-tool ${je ? "active" : ""}`,
                  onClick: Ap,
                  title: "Fullscreen Canvas Grid (F)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: je ? "⤓" : "⛶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: je ? "EXIT" : "FULL" })
                  ]
                }
              )
            ] })
          ] }),
          " "
        ] }) }),
        " ",
        Z && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => ae(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (f) => f.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => ae(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: we,
                onChange: (f) => Ie(f.target.value),
                autoFocus: !0,
                onKeyDown: (f) => {
                  f.key === "Enter" && Nu();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              W.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => ae(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Nu, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const ja = [0.5, 1, 1.25, 1.5, 2, 4];
function gp({
  activeStationId: e,
  isPlaying: t,
  setIsPlaying: n,
  isLooping: r = !0,
  setIsLooping: l,
  _playheadMs: o = 0,
  setPlayheadMs: i,
  inPointMs: a = 0,
  outPointMs: c = 36e5,
  totalDurationMs: d = 36e5,
  onStepFrameForward: v,
  onStepFrameBackward: m,
  playbackSpeed: g = 1,
  onChangeSpeed: N,
  onSetInPoint: C,
  onSetOutPoint: b
}) {
  const [P, k] = u.useState(() => ul()), { volume: p, isMuted: h } = P, M = !!(e || d > 0);
  u.useEffect(() => {
    const U = (te) => {
      te.detail && k(te.detail);
    };
    return window.addEventListener("itb-audio-state-changed", U), () => window.removeEventListener("itb-audio-state-changed", U);
  }, []);
  const E = u.useCallback((U, te, A) => {
    const T = {
      volume: typeof U == "number" ? U : p,
      isMuted: typeof te == "boolean" ? te : h,
      channelMode: A || P.channelMode || "both"
    };
    k(T), vg(T);
  }, [p, h, P.channelMode]), j = (U) => {
    U == null || U.stopPropagation(), M && n(!t);
  }, y = (U) => {
    if (U == null || U.stopPropagation(), !M || !N) return;
    const te = ja.indexOf(g), A = te === -1 ? 1 : (te + 1) % ja.length;
    N(ja[A]);
  }, S = (U) => {
    U == null || U.stopPropagation(), h ? E(p === 0 ? 0.5 : p, !1) : E(p, !0);
  }, x = (U) => {
    U.stopPropagation();
    const te = parseFloat(U.target.value);
    te === 0 ? E(0, !0) : E(te, !1);
  }, I = (U) => {
    const te = u.useRef(null), A = u.useRef(null), T = u.useRef(0), L = u.useCallback(() => {
      te.current && clearTimeout(te.current), A.current && clearInterval(A.current), te.current = null, A.current = null;
    }, []), z = u.useCallback((ce = 1) => {
      if (n && n(!1), i) {
        const q = 33 * ce;
        i((J) => {
          const le = U === "forward" ? J + q : J - q;
          return Math.max(0, Math.min(d, le));
        });
      } else U === "forward" && v ? v() : U === "backward" && m && m();
    }, [U]), F = u.useCallback((ce) => {
      ce.preventDefault(), ce.stopPropagation(), M && (L(), z(1), T.current = performance.now(), te.current = setTimeout(() => {
        A.current = setInterval(() => {
          const q = performance.now() - T.current, J = q > 2500 ? 4 : q > 1e3 ? 2 : 1;
          z(J);
        }, 50);
      }, 280));
    }, [z, L]);
    return u.useEffect(() => L, [L]), {
      onMouseDown: F,
      onMouseUp: L,
      onMouseLeave: L,
      onTouchStart: F,
      onTouchEnd: L
    };
  }, D = I("backward"), V = I("forward"), $ = (U) => {
    U.stopPropagation(), M && (n && n(!1), i && i(a));
  }, B = (U) => {
    U.stopPropagation(), M && (n && n(!1), i && i(c));
  }, se = () => h || p === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : p < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${M ? "is-expanded" : "is-compact-disabled"}`,
      title: M ? "" : "Playback ready",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !M,
            onClick: y,
            title: "Playback Speed",
            children: [
              g,
              "x"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cut-action cut-in",
            disabled: !C,
            onClick: (U) => {
              U.stopPropagation(), C == null || C();
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
              disabled: !M,
              onClick: (U) => {
                U.stopPropagation(), l && l(!r);
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
              disabled: !M,
              onClick: $,
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
              disabled: !M,
              ...D,
              title: "Step 1 Frame Back (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "16 5 7 12 16 19 16 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-play-hero ${t ? "playing" : ""}`,
              disabled: !M,
              onClick: j,
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
              disabled: !M,
              ...V,
              title: "Step 1 Frame Forward (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "8 5 17 12 8 19 8 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-out",
              disabled: !M,
              onClick: B,
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
            disabled: !b,
            onClick: (U) => {
              U.stopPropagation(), b == null || b();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        M && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${h || p === 0 ? "is-muted" : ""}`,
              onClick: S,
              title: h ? "Unmute" : `Mute (${Math.round(p * 100)}%)`,
              children: se()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: h ? 0 : p,
              onChange: x,
              className: "volume-slider"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-audio-mode-toggle",
              onClick: () => {
                const U = ["both", "mic", "sys", "stereo"], te = P.channelMode || "both", A = U[(U.indexOf(te) + 1) % U.length];
                E(p, h, A);
              },
              title: `Discrete Audio Channel: ${(P.channelMode || "both").toUpperCase()} (Click to cycle Both / Mic / System / Stereo)`,
              style: {
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(6, 182, 212, 0.35)",
                borderRadius: "4px",
                color: "#06B6D4",
                fontSize: "0.68rem",
                fontWeight: 700,
                padding: "2px 6px",
                cursor: "pointer",
                whiteSpace: "nowrap"
              },
              children: (P.channelMode || "both") === "mic" ? "🎤 MIC" : (P.channelMode || "both") === "sys" ? "🔊 SYS" : (P.channelMode || "both") === "stereo" ? "⮂ STEREO" : "🎧 BOTH"
            }
          )
        ] })
      ]
    }
  );
}
const qo = 2500, Lg = {
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
function Og(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Lg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function xp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Og), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function yp(e, t = " + ") {
  return xp(e).join(t);
}
function Rl(e) {
  return yp(e, "+");
}
const Dg = 8;
function Pg({
  activeStationName: e = "",
  stationHostname: t = "",
  keystrokes: n = null,
  baseEpochMs: r = 0,
  timeMode: l = "LOCAL",
  viewportStartMs: o = 0,
  viewportDurationMs: i = 36e5,
  pixelWidth: a = 1e3,
  onSeek: c
}) {
  const [d, v] = u.useState([]), [m, g] = u.useState(!1), N = t || e;
  u.useEffect(() => {
    if (n && Array.isArray(n) && n.length > 0)
      return;
    if (!N || !r || i <= 0) {
      v([]);
      return;
    }
    const h = new AbortController(), M = Math.max(0, r + o - qo), E = r + o + i + qo;
    g(!0);
    const j = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(N)}&startEpoch=${M}&endEpoch=${E}`;
    return fetch(j, { signal: h.signal }).then((y) => y.ok ? y.json() : []).then((y) => {
      v(Array.isArray(y) ? y : []), g(!1);
    }).catch((y) => {
      y.name !== "AbortError" && (v([]), g(!1));
    }), () => h.abort();
  }, [N, r, o, i, n]);
  const C = n && Array.isArray(n) && n.length > 0 ? n : d, b = u.useMemo(() => {
    if (!C.length || i <= 0 || a <= 0)
      return [];
    const h = r + o, M = h + i, E = [...C].sort((x, I) => x.epochMs - I.epochMs), j = [];
    let y = null, S = -999;
    for (const x of E) {
      const I = x.epochMs + qo;
      if (I < h || I > M)
        continue;
      const D = I - r, V = (D - o) / i * a;
      if (y && V - S < Dg)
        y.events.push(x), y.endOffsetMs = D, y.endEpochMs = I, S = V;
      else {
        const $ = (D - o) / i * 100;
        y = {
          id: `kc_${x.epochMs}_${j.length}`,
          startOffsetMs: D,
          endOffsetMs: D,
          startEpochMs: I,
          endEpochMs: I,
          pct: $,
          events: [x]
        }, j.push(y), S = V;
      }
    }
    return j;
  }, [C, r, o, i, a]);
  function P(h) {
    if (!h.events.length) return "";
    if (h.events.length === 1)
      return Rl(h.events[0].keyCombination);
    const M = h.events.find((y) => y.keyCombination.includes("+"));
    if (M) {
      const y = Rl(M.keyCombination);
      return h.events.length > 1 ? `${y} (+${h.events.length - 1})` : y;
    }
    const E = Rl(h.events[0].keyCombination);
    return h.events.every((y) => Rl(y.keyCombination) === E) ? `${E} ×${h.events.length}` : `${E} (+${h.events.length - 1})`;
  }
  function k(h, M = "LOCAL") {
    return yt(h, M);
  }
  function p(h) {
    const M = [];
    for (const E of h) {
      const j = Rl(E.keyCombination);
      M.length && M[M.length - 1].key === j ? M[M.length - 1].count++ : M.push({ key: j, count: 1 });
    }
    return M;
  }
  return b.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: b.map((h) => {
    const M = h.events.length, E = M > 1, j = P(h), y = k(h.startEpochMs, l), S = p(h.events), x = h.pct < 10 ? "edge-left" : h.pct > 90 ? "edge-right" : "";
    return /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${E ? "is-cluster" : "is-single"}`,
        style: { left: `${h.pct}%` },
        onClick: (I) => {
          I.stopPropagation(), c && c(h.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${j} at ${y}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            E && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: M > 9 ? "9+" : M })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${x}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: E ? `KEYSTROKE BURST (${M})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: y })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
              S.slice(0, 8).map((I, D) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                I.key,
                I.count > 1 ? ` ×${I.count}` : ""
              ] }, D)),
              S.length > 8 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                "+",
                S.length - 8,
                " more"
              ] })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      h.id
    );
  }) }) : null;
}
const _g = u.memo(Pg), Ca = [
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
], Fg = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function Bg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  totalDurationMs: l = 36e5,
  hoverMs: o = null,
  onHoverChange: i,
  onSeek: a,
  inPointMs: c = null,
  outPointMs: d = null,
  earliestMediaMs: v = null,
  movieBoundaries: m = null,
  stationHostname: g = "",
  activeStationName: N = "",
  showKeystrokes: C = !0,
  keystrokes: b = []
}) {
  const P = u.useRef(null), [k, p] = u.useState(1e3);
  u.useEffect(() => {
    if (!P.current) return;
    const F = new ResizeObserver((ce) => {
      for (let q of ce)
        q.contentRect.width > 50 && p(q.contentRect.width);
    });
    return F.observe(P.current), () => F.disconnect();
  }, []);
  const h = u.useCallback((F) => !r || r <= 0 ? "0%" : `${(F - n) / r * 100}%`, [r, n]), M = u.useCallback((F) => {
    const q = (F - n) / r * 100;
    return q >= -5 && q <= 105;
  }, [n, r]), E = (F) => {
    if (!P.current) return;
    const ce = P.current.getBoundingClientRect(), q = Math.max(0, Math.min(F.clientX - ce.left, ce.width)), J = Math.round(n + q / ce.width * r);
    i && i(J);
  }, j = () => {
    i && i(null);
  }, y = (F) => {
    if (!P.current || !a) return;
    const ce = P.current.getBoundingClientRect(), q = Math.max(0, Math.min(F.clientX - ce.left, ce.width)), J = Math.round(n + q / ce.width * r);
    a(Math.max(0, Math.min(l, J)));
  }, S = u.useMemo(() => {
    const F = Math.max(3, Math.floor(k / 95)), ce = r / F;
    for (let q of Ca)
      if (q >= ce) return q;
    return Ca[Ca.length - 1];
  }, [r, k]), x = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const F = e + n, ce = F + r, q = t === "LOCAL" ? $s(F).offsetMin * 60 * 1e3 : 0, J = F + q, le = Math.ceil(J / S) * S, Fe = [];
    for (let H = le; H <= ce + q; H += S) {
      const ne = H - q, he = (ne - F) / r * 100;
      he >= 0 && he <= 100 && Fe.push({
        epoch: ne,
        pct: he,
        label: yt(ne, t, {
          includeSeconds: S < 6e4
        })
      });
    }
    return Fe;
  }, [e, n, r, S, t]), I = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const F = e + n, ce = F + r;
    return dp(F, ce).map((q) => ({
      ...q,
      pct: (q.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), D = u.useMemo(() => {
    if (!r || !e) return [];
    const F = e + n, ce = F + r, q = t === "UTC", J = [], le = q ? 0 : $s(F).offsetMin * 60 * 1e3, Fe = F + le, H = ce + le, ne = new Date(Fe);
    for (ne.setUTCHours(0, 0, 0, 0), ne.getTime() < Fe && ne.setUTCDate(ne.getUTCDate() + 1); ne.getTime() <= H; ) {
      const Z = ne.getTime() - le, ae = (Z - F) / r * 100, ye = String(ne.getUTCDate()).padStart(2, "0"), Be = Fg[ne.getUTCMonth()], X = `${ye} ${Be}`;
      J.push({ epoch: Z, pct: ae, dateLabel: X }), ne.setUTCDate(ne.getUTCDate() + 1);
    }
    return J;
  }, [e, n, r, t]), {
    globalFirstMs: V = v,
    globalLastMs: $ = null,
    currentFirstMs: B = null,
    currentLastMs: se = null
  } = m || { globalFirstMs: v }, U = V !== null && B !== null && Math.abs(V - B) < 1e3, te = $ !== null && se !== null && Math.abs($ - se) < 1e3, A = u.useMemo(() => {
    const F = [];
    return U ? M(V) && F.push({
      id: "first-combined",
      ms: V,
      pct: h(V),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${yt(e + V, t)} (Click to jump)`
    }) : (M(V) && F.push({
      id: "first-global",
      ms: V,
      pct: h(V),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${yt(e + V, t)} (Click to jump)`
    }), M(B) && F.push({
      id: "first-current",
      ms: B,
      pct: h(B),
      className: "ruler-media-pin current-first",
      badge: N ? `FIRST (${N})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${yt(e + B, t)} (Click to jump)`
    })), te ? M($) && F.push({
      id: "last-combined",
      ms: $,
      pct: h($),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${yt(e + $, t)} (Click to jump)`
    }) : (M(se) && F.push({
      id: "last-current",
      ms: se,
      pct: h(se),
      className: "ruler-media-pin current-last",
      badge: N ? `LAST (${N})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${yt(e + se, t)} (Click to jump)`
    }), M($) && F.push({
      id: "last-global",
      ms: $,
      pct: h($),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${yt(e + $, t)} (Click to jump)`
    })), F;
  }, [
    V,
    $,
    B,
    se,
    U,
    te,
    e,
    t,
    N,
    M,
    h
  ]), T = u.useMemo(() => {
    const F = [];
    return typeof c == "number" && M(c) && F.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: h(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${yt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && M(d) && F.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: h(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${yt(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), F;
  }, [c, d, e, t, M, h]), L = o !== null ? h(o) : null, z = L !== null && L >= 0 && L <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: P,
      className: "timeline-ruler-root",
      onMouseMove: E,
      onMouseLeave: j,
      onClick: y,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          x.map((F) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${F.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: F.label })
          ] }, F.epoch)),
          C && /* @__PURE__ */ s.jsx(
            _g,
            {
              stationHostname: g,
              activeStationName: N,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: k,
              onSeek: a,
              keystrokes: b
            }
          ),
          I.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${F.pct}%` },
              title: `${F.description} (${F.labelBefore} ➔ ${F.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: F.description })
                ] })
              ]
            },
            F.switchEpochMs
          )),
          D.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${F.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: F.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            F.epoch
          )),
          A.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: F.className,
              style: { left: `${F.pct}` },
              onClick: (ce) => {
                ce.stopPropagation(), a && a(F.ms);
              },
              title: F.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: F.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            F.id
          )),
          T.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${F.type}-cut-tick`,
              style: { left: `${F.pct}` },
              onClick: (ce) => {
                ce.stopPropagation(), a && a(F.ms);
              },
              title: F.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: F.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: F.shortLabel })
                ] })
              ]
            },
            F.id
          ))
        ] }),
        z && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${L}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: yt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Pn = (e) => String(e).padStart(2, "0");
function Wg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: i
}) {
  const [a, c] = u.useState(!1), [d, v] = u.useState(!1), [m, g] = u.useState(""), [N, C] = u.useState(""), b = u.useCallback((x) => {
    if (!x || isNaN(x) || x <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const $ = new Date(x);
      return {
        timeStr: `${Pn($.getUTCHours())}:${Pn($.getUTCMinutes())}:${Pn($.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: I, label: D } = $s(x), V = new Date(x + I * 60 * 1e3);
    return {
      timeStr: `${Pn(V.getUTCHours())}:${Pn(V.getUTCMinutes())}:${Pn(V.getUTCSeconds())}`,
      zoneLabel: D
    };
  }, [t]), P = u.useCallback((x) => {
    if (!x || x < 0) return "00:00:00";
    const I = Math.floor(x / 1e3), D = Math.floor(I / 3600), V = Math.floor(I % 3600 / 60), $ = I % 60;
    return `${Pn(D)}:${Pn(V)}:${Pn($)}`;
  }, []), k = u.useMemo(() => b(e + r), [b, e, r]), p = u.useMemo(() => b(e + o), [b, e, o]), h = u.useMemo(() => P(Math.max(0, o - r)), [P, r, o]), M = u.useCallback((x, I) => {
    if (!x || !x.trim()) return I;
    const V = x.trim().split(" ")[0].split(":").map(Number);
    if (V.length < 2 || V.some(isNaN)) return I;
    const [$, B, se = 0] = V;
    if (t === "UTC") {
      const le = new Date(e);
      le.setUTCHours($, B, se, 0);
      let Fe = le.getTime();
      for (; Fe < e; ) Fe += 864e5;
      for (; Fe > e + n + 1e3; ) Fe -= 864e5;
      const H = Fe - e;
      return isNaN(H) ? I : Math.max(0, Math.min(n, H));
    }
    const { offsetMin: U } = $s(e), te = new Date(e + U * 6e4), A = te.getUTCFullYear(), T = te.getUTCMonth(), L = te.getUTCDate(), z = `${A}-${Pn(T + 1)}-${Pn(L)}`, F = `${Pn($)}:${Pn(B)}:${Pn(se)}`, ce = Ei(z, F);
    let q;
    if (ce.isAmbiguous) {
      const le = e + I, Fe = Math.abs(ce.firstOccurrenceEpoch - le), H = Math.abs(ce.secondOccurrenceEpoch - le);
      q = Fe <= H ? ce.firstOccurrenceEpoch : ce.secondOccurrenceEpoch;
    } else {
      const le = Date.UTC(A, T, L, $, B, se), { offsetMin: Fe } = $s(le - U * 6e4);
      q = le - Fe * 6e4;
    }
    for (; q < e; ) q += 864e5;
    for (; q > e + n + 1e3; ) q -= 864e5;
    const J = q - e;
    return isNaN(J) ? I : Math.max(0, Math.min(n, J));
  }, [e, t, n]), E = () => {
    g(k.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !m || !m.trim() || m.trim() === k.timeStr)
      return;
    const x = M(m.trim(), r);
    x !== null && !isNaN(x) && x < o && l(x);
  }, y = () => {
    C(p.timeStr), v(!0);
  }, S = () => {
    if (v(!1), !N || !N.trim() || N.trim() === p.timeStr)
      return;
    const x = M(N.trim(), o);
    x !== null && !isNaN(x) && x > r && i(x);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "tactical-timecode-console", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "console-row in-accent", children: [
      /* @__PURE__ */ s.jsx("span", { className: "console-tag", children: "IN" }),
      a ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: m,
          autoFocus: !0,
          onChange: (x) => g(x.target.value),
          onBlur: j,
          onKeyDown: (x) => {
            x.key === "Enter" && j(), x.key === "Escape" && c(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: E,
          title: `Click to edit IN time (${k.zoneLabel})`,
          children: [
            k.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: k.zoneLabel })
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
          value: N,
          autoFocus: !0,
          onChange: (x) => C(x.target.value),
          onBlur: S,
          onKeyDown: (x) => {
            x.key === "Enter" && S(), x.key === "Escape" && v(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: y,
          title: `Click to edit OUT time (${p.zoneLabel})`,
          children: [
            p.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: p.zoneLabel })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "console-duration-shelf", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "dur-label-group", children: [
        /* @__PURE__ */ s.jsx("span", { className: "dur-dot" }),
        /* @__PURE__ */ s.jsx("span", { className: "dur-title", children: "DUR" })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: h })
    ] })
  ] });
}
function Ug({
  minimapRef: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  totalDurationMs: r = 36e5,
  viewportStartMs: l = 0,
  viewportDurationMs: o = 36e5,
  zoomLevel: i = 1,
  inPointMs: a = 0,
  outPointMs: c = 36e5,
  playheadMs: d = 0,
  onStartDragMinimap: v
}) {
  const m = Math.max(0, Math.min(100, a / r * 100)), g = Math.max(0, Math.min(100, c / r * 100)), N = Math.max(0, g - m), C = Math.max(0, Math.min(100, l / r * 100)), b = Math.max(0, Math.min(100 - C, o / r * 100)), P = C + b, k = i > 1.05, p = 7, h = N >= 10, M = N >= 16, E = h, j = M, y = E && Math.abs(C - m) < p, S = k && b >= 12 && !y, x = j && Math.abs(P - g) < p, I = k && b >= 12 && !x;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (D) => v && v("minimap-viewport", D),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${m}%`, width: `${N}%` },
            children: [
              E && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: yt(t + a, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: yt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${C}%`, width: `${b}%` },
            children: [
              S && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: yt(t + l, n) }),
              I && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: yt(t + l + o, n) })
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
function zg({
  earliestMediaMs: e,
  latestMediaMs: t,
  hasActiveCut: n,
  onJumpToFirst: r,
  onJumpToLast: l,
  onContextualFit: o,
  onResetZoom: i,
  baseEpochMs: a,
  timeMode: c,
  keystrokeMode: d = "BURN_IN",
  // 'NONE' | 'CAPTION' | 'BURN_IN'
  onChangeKeystrokeMode: v,
  showRulerKeystrokes: m = !1,
  onToggleRulerKeystrokes: g
}) {
  const N = (d || "NONE").toUpperCase().replace("-", "_"), C = () => {
    v && v(N === "NONE" || N === "OFF" ? "BURN_IN" : N === "BURN_IN" ? "CAPTION" : "NONE");
  }, b = () => {
    switch (N) {
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
        className: `btn-vp-action keys-mode-btn mode-${N.toLowerCase().replace("_", "-")}`,
        onClick: C,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in / Soft Caption)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: b() })
        ]
      }
    ),
    g && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${m ? "active" : "inactive"}`,
        onClick: g,
        title: m ? "Hide Keystroke Ticks on Ruler" : "Show Keystroke Ticks on Ruler (Default: Off)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "3", fill: m ? "currentColor" : "none" }),
            /* @__PURE__ */ s.jsx("path", { d: "M3 12h3M18 12h3M12 3v3M12 18v3" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: m ? "RULER TICKS: ON" : "RULER TICKS: OFF" })
        ]
      }
    ),
    e !== null && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: "btn-vp-action",
        onClick: r,
        title: `Jump playhead to first media (${yt(a + e, c)})`,
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
        title: `Jump playhead to last media (${yt(a + t, c)})`,
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
        onClick: i,
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
const Ns = /* @__PURE__ */ new Map(), zr = /* @__PURE__ */ new Map();
let Is = [], dl = 0;
const Wd = 3, Hg = 8e3, Vg = 80;
function vp() {
  setTimeout(Kg, 0);
}
function Kg() {
  var e;
  if (!(dl >= Wd || Is.length === 0))
    for (Is = Is.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); dl < Wd && Is.length > 0; ) {
      const t = Is.pop();
      !t || (e = t.signal) != null && e.aborted || (dl++, Yg(t));
    }
}
async function Yg(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: i, resolve: a, displayId: c } = e;
  let d = !1, v = null;
  const m = () => {
    d || (d = !0, v && clearTimeout(v), dl = Math.max(0, dl - 1), zr.delete(t), vp());
  };
  v = setTimeout(() => {
    m(), a(null);
  }, Hg);
  try {
    const g = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, N = await fetch(g, { signal: i });
    if (N.ok && N.status !== 204) {
      const C = await N.blob();
      if (C && C.size > 1500) {
        const b = URL.createObjectURL(C);
        if (Ns.size >= Vg) {
          const P = Ns.keys().next().value, k = Ns.get(P);
          k && URL.revokeObjectURL(k), Ns.delete(P);
        }
        Ns.set(t, b), a(b);
        return;
      }
    }
    a(null);
  } catch {
    a(null);
  } finally {
    m();
  }
}
const Ud = {
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
    return Ns.get(o);
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
    const i = `${e}_${o || "mon-0"}_${t}_${n}_${r}`;
    if (Ns.has(i))
      return Promise.resolve(Ns.get(i));
    if (zr.has(i))
      return zr.get(i);
    const a = new Promise((c) => {
      if (l != null && l.aborted) {
        c(null);
        return;
      }
      const d = {
        key: i,
        hostname: e,
        startEpoch: t,
        endEpoch: n,
        frameCount: r,
        displayId: o || "mon-0",
        signal: l,
        resolve: c
      };
      l && l.addEventListener("abort", () => {
        Is = Is.filter((v) => v.key !== i), zr.delete(i), c(null);
      }, { once: !0 }), Is.push(d), vp();
    });
    return zr.set(i, a), a;
  },
  clear() {
    Ns.forEach((e) => URL.revokeObjectURL(e)), Ns.clear(), zr.clear(), Is = [], dl = 0;
  }
}, Gg = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Vn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Mr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function zd({
  hostname: e,
  displayId: t = "mon-0",
  activeSegments: n = [],
  viewportStartMs: r = 0,
  viewportDurationMs: l = 36e5,
  baseEpochMs: o = 0,
  inPointMs: i = 0,
  outPointMs: a = 36e5,
  globalGaps: c = [],
  gaps: d = [],
  directorSegments: v = [],
  isAutoDirectorEnabled: m = !1,
  showDirectorCoverage: g = !1,
  stepperSegments: N = null
}) {
  const [C, b] = u.useState({}), P = u.useRef(C);
  P.current = C;
  const k = u.useMemo(() => Gg(l), [l]), p = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: x, framesPerTile: I } = k, D = [], V = o + r, $ = V + l, B = V - x, se = $ + x, U = [...n].sort((T, L) => Vn(T) - Vn(L)), te = [...c || [], ...d || []], A = (T, L) => !te || te.length === 0 ? !1 : te.some((z) => {
      const F = z.startEpochMs ?? z.startEpoch ?? z.start ?? 0, ce = z.endEpochMs ?? z.endEpoch ?? z.end ?? 0;
      return ce <= F ? !1 : Math.max(T, F) < Math.min(L, ce);
    });
    if (U.forEach((T, L) => {
      const z = Math.round(Vn(T)), F = Math.round(Mr(T));
      if (F <= z) return;
      const ce = Math.max(z, B), q = Math.min(F, se);
      if (q <= ce) return;
      const J = Math.floor(ce / x) * x;
      for (let le = J; le < q; le += x) {
        const Fe = le + x, H = Math.max(z, le), ne = Math.min(F, Fe);
        ne > H && !A(H, ne) && D.push({
          key: `${e}_${t}_${H}_${ne}_${I}`,
          sIdx: L,
          startEpoch: H,
          endEpoch: ne,
          framesPerTile: I,
          displayId: t
        });
      }
    }), D.length > 20) {
      const T = o + r + l / 2;
      D.sort((L, z) => {
        const F = Math.abs((L.startEpoch + L.endEpoch) / 2 - T), ce = Math.abs((z.startEpoch + z.endEpoch) / 2 - T);
        return F - ce;
      }), D.length = 20, D.sort((L, z) => L.startEpoch - z.startEpoch);
    }
    return D;
  }, [n, o, e, t, r, l, k]);
  u.useEffect(() => {
    if (p.length === 0) return;
    let x = !0;
    const I = new AbortController(), D = [], V = {};
    let $ = !1;
    p.forEach((T) => {
      const L = Ud.get(e, T.startEpoch, T.endEpoch, T.framesPerTile, t);
      L ? P.current[T.key] !== L && (V[T.key] = L, $ = !0) : D.push(T);
    });
    const B = new Set(p.map((T) => T.key)), se = P.current, U = {};
    let te = !1;
    if (Object.keys(se).forEach((T) => {
      B.has(T) ? U[T] = se[T] : te = !0;
    }), $ || te) {
      const T = { ...U, ...V };
      P.current = T, b(T);
    }
    if (D.length === 0) return () => {
      x = !1;
    };
    const A = setTimeout(() => {
      D.forEach((T) => {
        Ud.fetchTile(e, T.startEpoch, T.endEpoch, T.framesPerTile, I.signal, t).then((L) => {
          x && L && (P.current[T.key] = L, b((z) => ({ ...z, [T.key]: L })));
        });
      });
    }, 150);
    return () => {
      x = !1, clearTimeout(A), I.abort();
    };
  }, [p, e, t]);
  const h = (i - r) / l * 100, M = (a - r) / l * 100, E = u.useMemo(() => {
    if (p.length === 0 || !o || l <= 0) return [];
    const x = r, I = r + l;
    return p.map((D) => {
      const V = D.startEpoch - o, $ = D.endEpoch - o;
      if ($ <= x || V >= I) return null;
      const B = Math.max(x, V), se = Math.min(I, $);
      return {
        key: D.key,
        spriteUrl: C[D.key] || null,
        leftPct: (B - x) / l * 100,
        widthPct: (se - B) / l * 100
      };
    }).filter(Boolean);
  }, [p, o, r, l, C]), j = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const x = r, I = r + l;
    return n.map((D, V) => {
      const $ = Math.round(Vn(D)) - o, B = Math.round(Mr(D)) - o;
      if (B <= x || $ >= I) return null;
      const se = Math.max(x, $), U = Math.min(I, B);
      return {
        id: V,
        leftPct: (se - x) / l * 100,
        widthPct: (U - se) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), y = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const x = [...n].sort((A, T) => Vn(A) - Vn(T)), I = [], D = r, V = r + l, $ = o + D, B = o + V, se = o + (i !== void 0 ? i : D), U = o + (a !== void 0 ? a : V);
    if (x.length > 0) {
      const A = Vn(x[0]);
      A > $ && I.push({ startEpoch: $, endEpoch: A });
    } else l > 0 && I.push({ startEpoch: $, endEpoch: B });
    for (let A = 0; A < x.length - 1; A++) {
      const T = Mr(x[A]), L = Vn(x[A + 1]);
      L - T > 1e3 && I.push({ startEpoch: T, endEpoch: L });
    }
    if (x.length > 0) {
      const A = Mr(x[x.length - 1]);
      A < B && I.push({ startEpoch: A, endEpoch: B });
    }
    const te = [];
    return c && c.length > 0 && c.forEach((A, T) => {
      const L = Math.max(A.startEpochMs ?? A.StartEpochMs, se), z = Math.min(A.endEpochMs ?? A.EndEpochMs, U);
      if (z > L && z > $ && L < B) {
        const F = Math.max($, L), ce = Math.min(B, z), q = (ce - o - (F - o)) / l * 100;
        q > 0 && te.push({
          id: `global-${T}`,
          type: "global",
          startEpoch: F,
          endEpoch: ce,
          leftPct: (F - o - D) / l * 100,
          widthPct: q,
          durationSec: Math.round((z - L) / 1e3)
        });
      }
    }), I.forEach((A, T) => {
      let L = [A];
      c && c.length > 0 && c.forEach((z) => {
        const F = Math.max(z.startEpochMs ?? z.StartEpochMs, se), ce = Math.min(z.endEpochMs ?? z.EndEpochMs, U);
        if (ce <= F) return;
        const q = [];
        L.forEach((J) => {
          ce <= J.startEpoch || F >= J.endEpoch ? q.push(J) : (F > J.startEpoch && q.push({ startEpoch: J.startEpoch, endEpoch: F }), ce < J.endEpoch && q.push({ startEpoch: ce, endEpoch: J.endEpoch }));
        }), L = q;
      }), L.forEach((z, F) => {
        if (z.endEpoch - z.startEpoch < 1e3 || z.endEpoch <= $ || z.startEpoch >= B) return;
        const ce = Math.max($, z.startEpoch), q = Math.min(B, z.endEpoch), J = (q - o - (ce - o)) / l * 100;
        J > 0 && te.push({
          id: `station-${T}-${F}`,
          type: "station",
          startEpoch: ce,
          endEpoch: q,
          leftPct: (ce - o - D) / l * 100,
          widthPct: J,
          durationSec: Math.round((z.endEpoch - z.startEpoch) / 1e3)
        });
      });
    }), te;
  }, [n, c, o, r, l, i, a]), S = u.useMemo(() => {
    if (!g || !m || !v || v.length === 0) return [];
    const x = (t || "mon-0").toLowerCase(), I = r, D = r + l;
    return v.map((V, $) => {
      const B = (V.startEpochMs ?? V.StartEpochMs ?? 0) - o, se = (V.endEpochMs ?? V.EndEpochMs ?? 0) - o;
      if (se <= I || B >= D) return null;
      const U = Math.max(I, B), te = Math.min(D, se), A = (U - I) / l * 100, T = (te - U) / l * 100;
      if (T <= 0) return null;
      const z = (V.targetDisplayId || V.TargetDisplayId || "mon-0").toLowerCase() === x;
      return {
        id: `cov_${$}`,
        isFeatured: z,
        leftPct: A,
        widthPct: T
      };
    }).filter(Boolean);
  }, [g, m, v, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: y.map((x) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `gap-full-block ${x.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
        title: x.type === "global" ? `Shared Gap: ${x.durationSec}s will be skipped` : `Station Gap: ${x.durationSec}s No-Signal`,
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
          x.widthPct > 5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${x.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: x.type === "global" ? `✂ SKIPPED (${x.durationSec}s)` : "NO SIGNAL" }) })
        ]
      },
      x.id
    )) }),
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: E.map((x) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `spritesheet-tile-block ${x.spriteUrl ? "is-loaded" : "is-loading"}`,
        style: {
          position: "absolute",
          left: `${x.leftPct}%`,
          width: `${x.widthPct}%`,
          height: "100%",
          backgroundImage: x.spriteUrl ? `url("${x.spriteUrl}")` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "opacity 0.25s ease"
        },
        children: !x.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
      },
      x.key
    )) }),
    S.map((x) => x.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
        title: "Display Featured by Auto-Director (ON AIR)",
        children: x.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "active-badge-tag", children: "🎬 ON AIR" })
      },
      x.id
    ) : /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-mask-dimmed",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
        title: "Display Off-Air (Masked by Auto-Director)"
      },
      x.id
    )),
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${N ? "has-stepper" : ""}`, children: j.map((x) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` }
      },
      `bar_${x.id}`
    )) }),
    N && N.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: m ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      N.map((x, I) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${x.dispNum}`,
          style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
          title: `Auto-Director: Screen ${x.dispNum} (${x.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: x.dispNum })
        },
        `stp_${I}`
      )),
      y && y.map((x) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-gap-block ${x.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
          title: x.type === "global" ? `Global Gap: ${x.durationSec}s skipped in export (No switches)` : `Station Gap: ${x.durationSec}s No Signal (No switches)`,
          children: x.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "stepper-gap-badge", children: x.type === "global" ? "✂ SKIPPED" : "NO SIGNAL" })
        },
        `gap_stp_${x.id}`
      ))
    ] }) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    h > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, h)}%` } }),
    M < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, M)}%`, right: 0 } })
  ] });
}
function Xg({
  station: e,
  isExpanded: t = !1,
  onToggleExpand: n,
  isAutoDirectorEnabled: r = !0,
  onToggleAutoDirector: l,
  canvasPlacements: o = [],
  onToggleDisplayOnCanvas: i,
  directorPlan: a = null,
  isActive: c = !0,
  onSelect: d,
  onStationContextMenu: v,
  onDeselectStation: m,
  viewportStartMs: g = 0,
  viewportDurationMs: N = 36e5,
  inPointMs: C = 0,
  outPointMs: b = 36e5,
  baseEpochMs: P = 0,
  segments: k = [],
  recordingSegments: p = {},
  globalGaps: h = []
}) {
  const M = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", E = (e == null ? void 0 : e.id) || M, j = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", y = (e == null ? void 0 : e.hostname) || "", S = u.useMemo(() => {
    var T, L, z;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((T = e == null ? void 0 : e.displayTopology) == null ? void 0 : T.displays) || ((L = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : L.Displays) || ((z = e == null ? void 0 : e.topology) == null ? void 0 : z.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), x = u.useMemo(() => {
    var L, z;
    const T = S.find((F) => F.isPrimary || F.IsPrimary);
    return ((T == null ? void 0 : T.displayId) || (T == null ? void 0 : T.DisplayId) || ((L = S[0]) == null ? void 0 : L.displayId) || ((z = S[0]) == null ? void 0 : z.DisplayId) || "mon-0").toLowerCase();
  }, [S]), I = a || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), D = u.useMemo(() => (I == null ? void 0 : I.segments) || (I == null ? void 0 : I.Segments) || [], [I]), V = D && D.length > 0, $ = S.length > 1 || V, B = u.useMemo(() => {
    let T = p[E] || p[M] || k || [];
    if (!T || T.length === 0) {
      const L = (E || "").toLowerCase(), z = (M || "").toLowerCase();
      for (const [F, ce] of Object.entries(p || {})) {
        const q = F.toLowerCase();
        if (L && q === L || z && q === z) {
          T = ce;
          break;
        }
      }
    }
    if ((!T || T.length === 0) && (T = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !T || T.length === 0)
      for (const L of S) {
        const z = L.segments || L.Segments || [];
        if (z.length > 0) {
          T = z;
          break;
        }
      }
    return (T || []).filter((L) => Mr(L) - Vn(L) > 0);
  }, [p, k, E, M, e, S]), se = u.useMemo(() => {
    if (!P || N <= 0) return [];
    const T = [...B].sort((q, J) => Vn(q) - Vn(J)), L = [], z = P + N;
    if (h && h.length > 0 && h.forEach((q) => {
      const J = q.startEpochMs ?? q.StartEpochMs ?? 0, le = q.endEpochMs ?? q.EndEpochMs ?? 0;
      le > J && L.push({ startEpoch: J, endEpoch: le, type: "global" });
    }), T.length === 0)
      return L.push({ startEpoch: P, endEpoch: z, type: "station" }), L;
    const F = Math.round(Vn(T[0]));
    F - P > 2e3 && (L.some((J) => J.type === "global" && J.startEpoch <= P && J.endEpoch >= F) || L.push({ startEpoch: P, endEpoch: F, type: "station" }));
    for (let q = 0; q < T.length - 1; q++) {
      const J = Math.round(Mr(T[q])), le = Math.round(Vn(T[q + 1]));
      le - J > 2e3 && (L.some((H) => H.type === "global" && H.startEpoch <= J && H.endEpoch >= le) || L.push({ startEpoch: J, endEpoch: le, type: "station" }));
    }
    const ce = Math.round(Mr(T[T.length - 1]));
    return z - ce > 2e3 && (L.some((J) => J.type === "global" && J.startEpoch <= ce && J.endEpoch >= z) || L.push({ startEpoch: ce, endEpoch: z, type: "station" })), L;
  }, [B, h, P, N]), U = u.useMemo(() => {
    if (!D || D.length === 0) return [];
    if (!se || se.length === 0) return D;
    let T = D.map((L) => ({
      ...L,
      startEpochMs: L.startEpochMs ?? L.StartEpochMs ?? 0,
      endEpochMs: L.endEpochMs ?? L.EndEpochMs ?? 0,
      targetDisplayId: (L.targetDisplayId || L.TargetDisplayId || "mon-0").toLowerCase()
    })).sort((L, z) => L.startEpochMs - z.startEpochMs);
    se.forEach((L) => {
      const z = L.startEpoch, F = L.endEpoch;
      if (!(!z || !F || F <= z))
        for (let ce = T.length - 1; ce > 0; ce--) {
          const q = T[ce].startEpochMs;
          q >= z && q <= F && (T[ce - 1].endEpochMs = T[ce].endEpochMs, T.splice(ce, 1));
        }
    });
    for (let L = T.length - 1; L > 0; L--)
      T[L].targetDisplayId === T[L - 1].targetDisplayId && (T[L - 1].endEpochMs = T[L].endEpochMs, T.splice(L, 1));
    return T;
  }, [D, se]), te = u.useMemo(() => {
    if (!V || N <= 0) return null;
    const T = g, L = g + N;
    return U.map((z, F) => {
      const ce = (z.startEpochMs ?? z.StartEpochMs ?? 0) - P, q = (z.endEpochMs ?? z.EndEpochMs ?? 0) - P;
      if (q <= T || ce >= L) return null;
      const J = Math.max(T, ce), le = Math.min(L, q), Fe = (J - T) / N * 100, H = (le - J) / N * 100;
      if (H <= 0) return null;
      const ne = (z.targetDisplayId || z.TargetDisplayId || "mon-0").toLowerCase(), he = S.findIndex((ye) => (ye.displayId || ye.DisplayId || "").toLowerCase() === ne);
      let Z = he >= 0 ? he + 1 : null;
      if (!Z) {
        const ye = ne.match(/\d+/);
        Z = ye ? parseInt(ye[0], 10) + 1 : 1;
      }
      const ae = he >= 0 ? S[he].displayName || S[he].DisplayName || `Screen ${Z}` : `Screen ${Z}`;
      return {
        id: F,
        dispNum: Z,
        dispLabel: ae,
        leftPct: Fe,
        widthPct: H
      };
    }).filter(Boolean);
  }, [V, D, S, P, g, N]), A = u.useCallback((T) => {
    const L = (T || "mon-0").toLowerCase();
    return o.some((z) => z.stationId === E && (z.displayId || "mon-0").toLowerCase() === L);
  }, [o, E]);
  return t ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (T) => {
              T.stopPropagation(), n == null || n();
            },
            title: "Collapse station tracks",
            children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "6 9 12 15 18 9" }) })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: j, children: j }),
        l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
            onClick: (T) => {
              T.stopPropagation(), l(e.id);
            },
            title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
            children: r ? "⚡ AUTO" : "✋ OFF"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-timeline", children: [
        l && /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-station-auto-director ${r ? "is-active" : "is-inactive"}`,
            onClick: (T) => {
              T.stopPropagation(), l(e.id);
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
            onClick: (T) => {
              T.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: S.map((T, L) => {
      const z = (T.displayId || T.DisplayId || `mon-${L}`).toLowerCase(), F = T.displayNumber || T.DisplayNumber || L + 1, ce = T.displayName || T.DisplayName || "", q = ce && !ce.toLowerCase().includes(M.toLowerCase()) ? ce : `Screen ${F}${T.isPrimary || L === 0 ? " (Main)" : ""}`, J = A(z);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${q} (${T.width || 1920}×${T.height || 1080})`, children: q }),
              !r && i && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${J ? "is-on-canvas" : ""}`,
                  onClick: (le) => {
                    le.stopPropagation(), i(e.id, z);
                  },
                  title: J ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: J ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              zd,
              {
                hostname: M,
                displayId: z,
                activeSegments: B,
                viewportStartMs: g,
                viewportDurationMs: N,
                baseEpochMs: P,
                inPointMs: C,
                outPointMs: b,
                globalGaps: h,
                directorSegments: U,
                isAutoDirectorEnabled: r,
                gaps: se,
                showDirectorCoverage: $
              }
            )
          ]
        },
        `${e.id}-${z}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), $ && n && n();
      },
      onContextMenu: (T) => {
        v && (T.preventDefault(), T.stopPropagation(), v(T, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${$ ? "has-stepper" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${j}${y ? ` (${y})` : ""} • Click to select / expand`,
            children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (T) => {
                    T.stopPropagation(), n == null || n();
                  },
                  title: t ? "Collapse station tracks" : "Expand station tracks",
                  children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: j, children: j }),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (T) => {
                    T.stopPropagation(), l(e.id);
                  },
                  title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
                  children: r ? "⚡ AUTO" : "✋ OFF"
                }
              ),
              m && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-track-deselect",
                  title: `Remove ${j} from project`,
                  onClick: (T) => {
                    T.stopPropagation(), m(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          zd,
          {
            hostname: M,
            displayId: x,
            activeSegments: B,
            viewportStartMs: g,
            viewportDurationMs: N,
            baseEpochMs: P,
            inPointMs: C,
            outPointMs: b,
            globalGaps: h,
            isAutoDirectorEnabled: r,
            gaps: se,
            stepperSegments: $ ? te : null
          }
        )
      ]
    }
  );
}
const Hd = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function Qg({
  audioPlan: e,
  stations: t = [],
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  baseEpochMs: l = 0,
  playheadMs: o = 0,
  onSplitSegment: i,
  onChangeSegmentStation: a,
  onChangeSegmentGain: c,
  onFollowVisualFeed: d,
  isAutoFollow: v = !1,
  timeMode: m = "LOCAL",
  onUpdateAudioPlan: g = null
}) {
  const N = u.useRef(null), [C, b] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [P, k] = u.useState(!1), [p, h] = u.useState(null), [M, E] = u.useState(1), [j, y] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const H = (ne) => {
      ne.detail && y(ne.detail);
    };
    return window.addEventListener("itb-live-audio-level", H), () => window.removeEventListener("itb-live-audio-level", H);
  }, []);
  const S = u.useCallback(() => {
    b((H) => {
      const ne = !H;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(ne));
      } catch {
      }
      return ne;
    });
  }, []), [x, I] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      clips: e.segments.map((H, ne) => {
        var he;
        return {
          id: `clip_${ne}_${H.startEpochMs || H.StartEpochMs}`,
          startEpochMs: H.startEpochMs ?? H.StartEpochMs ?? l,
          endEpochMs: H.endEpochMs ?? H.EndEpochMs ?? l + r,
          sourceStationId: H.sourceStationId ?? H.SourceStationId ?? (((he = t[0]) == null ? void 0 : he.id) || "station-0"),
          gain: H.gain ?? H.Gain ?? 1
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
      clips: []
    }
  ]), D = l + o, V = l + n, $ = V + r, B = u.useCallback((H) => {
    if (!g) return;
    const ne = [];
    H.forEach((he) => {
      he.isMuted || P || he.clips.forEach((Z) => {
        ne.push({
          startEpochMs: Z.startEpochMs,
          endEpochMs: Z.endEpochMs,
          sourceStationId: Z.sourceStationId,
          gain: Z.gain * he.gain
        });
      });
    }), ne.sort((he, Z) => he.startEpochMs - Z.startEpochMs), g({ segments: ne });
  }, [g, P]), se = u.useCallback(() => {
    I((H) => {
      const he = `A${H.length + 1}`, Z = {
        id: he,
        name: `Track ${he}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        clips: []
      }, ae = [...H, Z];
      return B(ae), ae;
    });
  }, [B]), U = u.useCallback((H) => {
    I((ne) => {
      if (ne.length <= 1) return ne;
      const he = ne.filter((Z) => Z.id !== H);
      return B(he), he;
    });
  }, [B]), te = u.useCallback((H) => {
    I((ne) => {
      const he = ne.map((Z) => Z.id === H ? { ...Z, isMuted: !Z.isMuted } : Z);
      return B(he), he;
    });
  }, [B]), A = u.useCallback((H) => {
    I((ne) => {
      var ae;
      const he = (ae = ne.find((ye) => ye.id === H)) == null ? void 0 : ae.isSolo, Z = ne.map((ye) => ({
        ...ye,
        isSolo: ye.id === H ? !he : !1,
        isMuted: ye.id === H ? !1 : !he
      }));
      return B(Z), Z;
    });
  }, [B]), T = u.useCallback((H, ne) => {
    const he = Math.max(0, Math.min(2, Number(ne)));
    I((Z) => {
      const ae = Z.map((ye) => ye.id === H ? { ...ye, gain: he } : ye);
      return B(ae), ae;
    }), Fd(he);
  }, [B]), L = u.useCallback((H, ne = null, he = null) => {
    var Q;
    const Z = ne || ((Q = t[0]) == null ? void 0 : Q.id) || "station-0", ae = he !== null ? he : D, ye = Math.min(r, 6e4), Be = ae + ye, X = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(ae),
      endEpochMs: Math.round(Be),
      sourceStationId: Z,
      gain: 1
    };
    I((fe) => {
      const ge = fe.map((we) => we.id === H ? {
        ...we,
        clips: [...we.clips, X].sort((Ie, ie) => Ie.startEpochMs - ie.startEpochMs)
      } : we);
      return B(ge), ge;
    });
  }, [D, r, t, B]), z = u.useCallback((H, ne) => {
    I((he) => {
      const Z = he.map((ae) => {
        if (ae.id !== H) return ae;
        const ye = [];
        return ae.clips.forEach((Be) => {
          Be.id === ne && D > Be.startEpochMs + 500 && D < Be.endEpochMs - 500 ? (ye.push({ ...Be, endEpochMs: D }), ye.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: D,
            endEpochMs: Be.endEpochMs,
            sourceStationId: Be.sourceStationId,
            gain: Be.gain
          })) : ye.push(Be);
        }), { ...ae, clips: ye };
      });
      return B(Z), Z;
    }), h(null);
  }, [D, B]), F = u.useCallback((H, ne) => {
    I((he) => {
      const Z = he.map((ae) => ae.id !== H ? ae : { ...ae, clips: ae.clips.filter((ye) => ye.id !== ne) });
      return B(Z), Z;
    }), h(null);
  }, [B]), ce = u.useCallback((H, ne, he) => {
    I((Z) => {
      const ae = Z.map((ye) => ye.id !== H ? ye : {
        ...ye,
        clips: ye.clips.map((Be) => Be.id === ne ? { ...Be, sourceStationId: he } : Be)
      });
      return B(ae), ae;
    }), h((Z) => Z ? { ...Z, stationId: he } : null);
  }, [B]), q = u.useCallback((H, ne, he) => {
    const Z = Math.max(0, Math.min(2.5, Number(he)));
    E(Z), I((ae) => {
      const ye = ae.map((Be) => Be.id !== H ? Be : {
        ...Be,
        clips: Be.clips.map((X) => X.id === ne ? { ...X, gain: Z } : X)
      });
      return B(ye), ye;
    }), Fd(Z);
  }, [B]), J = u.useCallback((H, ne, he, Z) => {
    H.preventDefault(), H.stopPropagation();
    const ae = H.clientX, ye = x.find((we) => we.id === ne), Be = ye == null ? void 0 : ye.clips.find((we) => we.id === he);
    if (!Be) return;
    const X = Be.startEpochMs, Q = Be.endEpochMs, fe = (we) => {
      var Te;
      const Ie = we.clientX - ae, ie = (Te = N.current) == null ? void 0 : Te.querySelector(".audio-lane-timeline");
      if (!ie) return;
      const De = ie.getBoundingClientRect(), ke = Ie / De.width * r;
      I((ze) => ze.map((Pe) => Pe.id !== ne ? Pe : {
        ...Pe,
        clips: Pe.clips.map((je) => {
          if (je.id !== he) return je;
          if (Z === "start") {
            const Qe = Math.min(Q - 500, X + ke);
            return { ...je, startEpochMs: Math.round(Qe) };
          } else {
            const Qe = Math.max(X + 500, Q + ke);
            return { ...je, endEpochMs: Math.round(Qe) };
          }
        })
      }));
    }, ge = () => {
      window.removeEventListener("mousemove", fe), window.removeEventListener("mouseup", ge), I((we) => (B(we), we));
    };
    window.addEventListener("mousemove", fe), window.addEventListener("mouseup", ge);
  }, [x, r, B]), le = (H, ne, he) => {
    H.preventDefault(), H.stopPropagation();
    const Z = Math.min(window.innerWidth - 260, Math.max(16, H.clientX - 40)), ae = Math.min(window.innerHeight - 280, Math.max(16, H.clientY - 200));
    E(he.gain || 1), h({
      laneId: ne,
      clipId: he.id,
      s: he.startEpochMs,
      e: he.endEpochMs,
      x: Z,
      y: ae,
      stationId: he.sourceStationId,
      gain: he.gain || 1
    });
  };
  u.useEffect(() => {
    if (!p) return;
    const H = () => h(null), ne = (he) => {
      he.key === "Escape" && h(null);
    };
    return window.addEventListener("click", H), window.addEventListener("keydown", ne), () => {
      window.removeEventListener("click", H), window.removeEventListener("keydown", ne);
    };
  }, [p]);
  const Fe = u.useMemo(() => x.reduce((H, ne) => H + (ne.isMuted ? 0 : ne.clips.length), 0), [x]);
  return !t || t.length === 0 ? null : C ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: N, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: S,
            title: "Collapse Audio Master Bus",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          x.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: se,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "master-vu-readout", children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: j.isPlaying ? `${j.db.toFixed(1)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "master-vu-bar-outer", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "master-vu-bar-inner",
              style: {
                width: `${Math.min(100, Math.max(0, j.rms * 120))}%`,
                background: j.db > -3 ? "#F43F5E" : j.db > -9 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${P ? "is-muted" : ""}`,
            onClick: () => k((H) => !H),
            title: P ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: P ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: x.map((H, ne) => {
      const he = Hd[ne % Hd.length];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${he}26`, borderColor: `${he}80`, color: he }, children: H.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: H.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${H.isMuted ? "active" : ""}`,
                onClick: () => te(H.id),
                title: H.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${H.isSolo ? "active" : ""}`,
                onClick: () => A(H.id),
                title: H.isSolo ? "Unsolo Lane" : "Solo Lane",
                children: "S"
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
                value: H.gain,
                onChange: (Z) => T(H.id, Z.target.value),
                title: `Lane Gain: ${Math.round(H.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(H.gain * 100),
              "%"
            ] })
          ] }),
          x.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => U(H.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "audio-lane-timeline",
            onDoubleClick: (Z) => {
              var X;
              const ae = Z.currentTarget.getBoundingClientRect(), ye = Math.max(0, Math.min(1, (Z.clientX - ae.left) / ae.width)), Be = Math.round(V + ye * r);
              L(H.id, (X = t[0]) == null ? void 0 : X.id, Be);
            },
            children: [
              H.clips.map((Z) => {
                const ae = Z.startEpochMs, ye = Z.endEpochMs, Be = t.find((Ie) => Ie.id === Z.sourceStationId), X = Be ? Be.displayName || Be.hostname || Be.id : Z.sourceStationId;
                if (ye <= V || ae >= $) return null;
                const Q = Math.max(V, ae), fe = Math.min($, ye), ge = (Q - V) / r * 100, we = (fe - Q) / r * 100;
                return we <= 0 ? null : /* @__PURE__ */ s.jsxs(
                  "div",
                  {
                    className: `audio-clip-block ${H.isMuted ? "lane-muted" : ""}`,
                    style: {
                      left: `${ge}%`,
                      width: `${we}%`,
                      borderLeftColor: he
                    },
                    onClick: (Ie) => le(Ie, H.id, Z),
                    onContextMenu: (Ie) => le(Ie, H.id, Z),
                    title: `Audio Clip: ${X} [${yt(ae, m, { includeSeconds: !0 })} - ${yt(ye, m, { includeSeconds: !0 })}] • Gain: ${Math.round(Z.gain * 100)}%`,
                    children: [
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-left",
                          onMouseDown: (Ie) => J(Ie, H.id, Z.id, "start"),
                          title: "Drag to trim Clip In-Point"
                        }
                      ),
                      /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
                        "path",
                        {
                          d: "M0,12 L5,6 L10,18 L15,4 L20,20 L25,8 L30,16 L35,2 L40,22 L45,10 L50,14 L55,5 L60,19 L65,8 L70,16 L75,3 L80,21 L85,9 L90,15 L95,7 L100,12",
                          fill: "none",
                          stroke: he,
                          strokeWidth: "1.2",
                          strokeOpacity: "0.85"
                        }
                      ) }) }),
                      /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: X }),
                        /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
                          Math.round(Z.gain * 100),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-right",
                          onMouseDown: (Ie) => J(Ie, H.id, Z.id, "end"),
                          title: "Drag to trim Clip Out-Point"
                        }
                      )
                    ]
                  },
                  Z.id
                );
              }),
              H.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var Z;
                    return L(H.id, (Z = t[0]) == null ? void 0 : Z.id, D);
                  },
                  title: "Click to insert audio clip at playhead",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK TO INSERT AUDIO CLIP (",
                    H.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, H.id);
    }) }),
    p && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "audio-clip-context-menu",
        style: { left: p.x, top: p.y },
        onClick: (H) => H.stopPropagation(),
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
            /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-close",
                onClick: () => h(null),
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE STATION" }),
            /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((H) => {
              const ne = H.id === p.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${ne ? "is-selected" : ""}`,
                  onClick: () => ce(p.laneId, p.clipId, H.id),
                  children: H.displayName || H.hostname || H.id
                },
                H.id
              );
            }) })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME GAIN" }),
              /* @__PURE__ */ s.jsxs("span", { className: "gain-val", children: [
                Math.round(M * 100),
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
                value: M,
                onChange: (H) => q(p.laneId, p.clipId, H.target.value),
                className: "menu-gain-slider"
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-actions-row", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action split",
                onClick: () => z(p.laneId, p.clipId),
                title: "Split clip at timeline playhead (Ctrl+K)",
                children: "✂️ SPLIT AT PLAYHEAD"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action delete",
                onClick: () => F(p.laneId, p.clipId),
                title: "Delete this audio clip",
                children: "🗑️ DELETE CLIP"
              }
            )
          ] })
        ]
      }
    )
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: "audio-routing-track-container is-compact-track",
      ref: N,
      onClick: S,
      title: "Audio Master Bus is Collapsed. Click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔇" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: Fe > 0 ? `${Fe} CLIPS ACTIVE` : "MUTED (0 ACTIVE)" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: j.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-timeline collapsed-bus-timeline", children: [
          /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS — CLICK TO EXPAND MULTI-TRACK LANES (A1, A2...) ]" })
        ] })
      ]
    }
  );
}
function Jg({
  canvasLayoutTimeline: e,
  activeKfIndex: t = 0,
  onSelectKeyframe: n,
  onAddKeyframeAtEpoch: r,
  onDeleteKeyframe: l,
  onUpdateKeyframeEpoch: o,
  onUpdateKeyframeTransition: i,
  viewportStartMs: a = 0,
  viewportDurationMs: c = 36e5,
  baseEpochMs: d = 0,
  totalDurationMs: v = 36e5,
  playheadMs: m = 0,
  timeMode: g = "LOCAL"
}) {
  const N = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [C, b] = u.useState(null), [P, k] = u.useState(null);
  fo.useEffect(() => {
    if (P === null) return;
    const y = (x) => {
      x.key === "Escape" && k(null);
    }, S = (x) => {
      !x.target.closest(".kf-inspector-popover") && !x.target.closest(".kf-marker-diamond") && k(null);
    };
    return window.addEventListener("keydown", y), window.addEventListener("mousedown", S), () => {
      window.removeEventListener("keydown", y), window.removeEventListener("mousedown", S);
    };
  }, [P]);
  const p = d + m, h = d + a, M = h + c, E = (y) => {
    const S = y.currentTarget.getBoundingClientRect(), x = y.clientX - S.left, I = Math.max(0, Math.min(1, x / S.width)), D = Math.round(h + I * c);
    r && r(D);
  }, j = (y, S, x) => {
    if (y.button !== 0) return;
    y.stopPropagation(), y.preventDefault();
    const I = y.clientX, D = x.timestampEpochMs, V = x.id || `kf_${S}_${D}`, $ = y.currentTarget.closest(".track-surface");
    if (!$) return;
    let B = !1;
    b({
      idx: S,
      kfId: V,
      startClientX: I,
      initialEpoch: D,
      currentEpoch: D
    });
    const se = (te) => {
      const A = te.clientX - I;
      Math.abs(A) > 3 && (B = !0);
      const T = $.getBoundingClientRect(), L = A / T.width * c;
      let z = Math.round(D + L);
      z = Math.max(d, Math.min(d + v, z)), b((F) => F ? { ...F, currentEpoch: z } : null);
    }, U = (te) => {
      window.removeEventListener("mousemove", se), window.removeEventListener("mouseup", U), b(null);
      const A = $.getBoundingClientRect(), L = (te.clientX - I) / A.width * c;
      let z = Math.round(D + L);
      z = Math.max(d, Math.min(d + v, z)), B ? (o && o(V, z), n && n(S, z)) : (n && n(S, D), k((F) => F === S ? null : S));
    };
    window.addEventListener("mousemove", se), window.addEventListener("mouseup", U);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        N.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (y) => {
            y.stopPropagation(), r && r(p);
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
        onClick: E,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          N.map((y, S) => {
            const x = (C == null ? void 0 : C.idx) === S, I = x ? C.currentEpoch : y.timestampEpochMs;
            if (I < h - 5e4 || I > M + 5e4) return null;
            const D = (I - h) / c * 100;
            if (D < -2 || D > 102) return null;
            const V = S === t, $ = yt(I, g, { includeSeconds: !0 }), B = `${y.transitionType || "smooth"} (${y.transitionDurationSec ?? 0.5}s)`, se = Math.max(0, (I - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${V ? "is-active" : ""} ${x ? "is-dragging" : ""}`,
                style: { left: `${D}%` },
                onMouseDown: (U) => j(U, S, y),
                onContextMenu: (U) => {
                  U.preventDefault(), U.stopPropagation(), N.length > 1 && l && l(S);
                },
                title: `Keyframe #${S + 1} at ${$} (+${se}s) • ${B}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  x && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: $ }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      se,
                      "s"
                    ] })
                  ] }),
                  P === S && !x && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (U) => U.stopPropagation(),
                      onMouseDown: (U) => U.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            S + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: $ }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (U) => {
                                U.stopPropagation(), k(null);
                              },
                              title: "Close",
                              children: "✕"
                            }
                          )
                        ] }),
                        S > 0 ? /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${(y.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(S, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${y.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(S, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${y.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(S, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          y.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((U) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(y.transitionDurationSec ?? 0.5) === U ? "is-active" : ""}`,
                                onClick: () => i == null ? void 0 : i(S, { transitionDurationSec: U }),
                                children: [
                                  U,
                                  "s"
                                ]
                              },
                              U
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (U) => {
                                U.stopPropagation(), l && l(S), k(null);
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
              `kf-${S}`
            );
          })
        ]
      }
    )
  ] });
}
function Zg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: i = 36e5,
  onStartDrag: a
}) {
  const c = (x) => !r || r <= 0 ? "0%" : `${(x - n) / r * 100}%`, d = (o - n) / r * 100, v = (i - n) / r * 100, m = (l - n) / r * 100, g = m >= -0.2 && m <= 100.2, N = Math.max(0, Math.min(100, m)), C = Math.max(0, d), b = Math.min(100, v), P = Math.max(0, b - C), k = (x) => (I) => {
    I.preventDefault(), I.stopPropagation(), typeof a == "function" && a(x, I);
  }, p = d < 1.5, h = v > 98.5, M = d <= 0.2 && d >= -0.2, E = v >= 99.8 && v <= 100.2, j = m >= -0.2 && m < 3.5, y = m > 96.5 && m <= 100.2, S = u.useMemo(() => yt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    P > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${C}%`, width: `${P}%` },
        onMouseDown: k("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${p ? "flipped" : ""} ${M ? "at-edge" : ""}`,
        style: { left: c(o) },
        onMouseDown: k("in"),
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
        className: `marker out-marker ${h ? "flipped" : ""} ${E ? "at-edge" : ""}`,
        style: { left: c(i) },
        onMouseDown: k("out"),
        title: "Drag OUT Point",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "handle-badge", children: "OUT" }),
          /* @__PURE__ */ s.jsx("div", { className: "marker-core-line" })
        ]
      }
    ),
    g && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "playhead-needle",
        style: { left: `${N}%` },
        onMouseDown: k("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${j ? "edge-left" : ""} ${y ? "edge-right" : ""}`, children: S }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const qg = fo.memo(Zg);
function ex({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const m = (g) => {
      g.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e, l]), !e) return null;
  const i = 210, a = 150, c = Math.min(e.x, window.innerWidth - i - 12), d = Math.min(e.y, window.innerHeight - a - 12), v = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: d, left: c },
      onClick: (m) => m.stopPropagation(),
      onContextMenu: (m) => m.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "header-tag", children: "TIMELINE POSITION" }),
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: yt(t + e.targetMs, n) })
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
  return Fs.createPortal(v, document.body);
}
function tx({
  isRangeValid: e,
  onExport: t,
  isEstimating: n,
  estimateData: r,
  formatEstimateSize: l,
  stationsCount: o = 0
}) {
  const i = () => {
    if (o === 0) return "Select stations to enable export";
    if (!e) return "Select a valid IN/OUT range to export";
    if (!r) return "Export Synchronized Multi-Track Clip (Ctrl+E)";
    const a = l(r.estimatedFileSizeBytes), c = r.removedGlobalGapsCount > 0 ? ` • ${r.removedGlobalGapsCount} global gap(s) skipped` : "";
    return `Export Cut (Ctrl+E) • Est: ~${a}${c}`;
  };
  return /* @__PURE__ */ s.jsxs(
    "button",
    {
      type: "button",
      onClick: e ? t : void 0,
      className: `btn-vertical-export-action ${e ? "active" : "disabled"}`,
      disabled: !e,
      title: i(),
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
const nx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function sx({
  stationIdsKey: e,
  inPointMs: t,
  outPointMs: n,
  baseEpochMs: r,
  onEstimateLoaded: l
}) {
  const [o, i] = u.useState(null), [a, c] = u.useState(!1), d = u.useRef(l);
  return u.useEffect(() => {
    d.current = l;
  }, [l]), u.useEffect(() => {
    if (!e || n <= t || !r) {
      i(null);
      return;
    }
    const v = new AbortController();
    c(!0);
    const m = setTimeout(async () => {
      try {
        const g = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, N = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(g),
          signal: v.signal
        });
        if (N.ok) {
          const C = await N.json();
          i(C), d.current && d.current(C);
        }
      } catch (g) {
        g.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", g);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(m), v.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: a, formatEstimateSize: nx };
}
function rx({
  viewportDurationMs: e,
  totalDurationMs: t,
  playheadMs: n,
  setPlayheadMs: r,
  inPointMs: l,
  setInPointMs: o,
  outPointMs: i,
  setOutPointMs: a,
  viewportStartMs: c,
  setViewportStartMs: d,
  getMsFromClientX: v,
  minimapRef: m
}) {
  const [g, N] = u.useState(null), [C, b] = u.useState(null), P = (k, p) => {
    N(k), b({
      target: k,
      startX: p.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: i,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!g) return;
    const k = e * 0.015, p = (M) => {
      if (g === "minimap-viewport" && (m != null && m.current)) {
        const j = m.current.getBoundingClientRect(), S = Math.max(0, Math.min(M.clientX - j.left, j.width)) / j.width * t, x = Math.max(0, Math.min(S - e / 2, t - e));
        d(x);
        return;
      }
      const E = v(M.clientX);
      if (g === "playhead") {
        let j = E;
        Math.abs(j - l) <= k ? j = l : Math.abs(j - i) <= k && (j = i), r(Math.max(0, Math.min(t, j)));
      } else if (g === "in") {
        const j = i - 1e3;
        o(Math.max(0, Math.min(E, j)));
      } else if (g === "out") {
        const j = l + 1e3;
        a(Math.min(t, Math.max(E, j)));
      } else if (g === "range" && C) {
        const j = E - v(C.startX), y = C.initialOut - C.initialIn;
        let S = C.initialIn + j, x = C.initialOut + j;
        S < 0 ? (S = 0, x = y) : x > t && (x = t, S = t - y), o(S), a(x);
      }
    }, h = () => {
      N(null), b(null);
    };
    return window.addEventListener("mousemove", p), window.addEventListener("mouseup", h), () => {
      window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", h);
    };
  }, [
    g,
    C,
    v,
    l,
    i,
    n,
    t,
    e,
    r,
    o,
    a,
    d,
    m
  ]), { draggingTarget: g, handleStartDrag: P };
}
const Gs = 4;
function Np({
  stations: e = [],
  activeStationId: t,
  onSelectActiveStation: n,
  onStationContextMenu: r,
  onDeselectStation: l,
  stationAutoDirectorMap: o = {},
  onToggleStationAutoDirector: i,
  baseEpochMs: a = 0,
  timeMode: c = "LOCAL",
  totalDurationMs: d = 36e5,
  zoomLevel: v = 1,
  onZoomChange: m,
  onZoomReset: g,
  playheadMs: N = 0,
  setPlayheadMs: C,
  inPointMs: b = 0,
  setInPointMs: P,
  outPointMs: k = 36e5,
  setOutPointMs: p,
  onExport: h,
  recordingSegments: M = {},
  movieBoundaries: E,
  viewportStartMs: j = 0,
  onViewportStartChange: y,
  onEstimateLoaded: S,
  onFitRange: x,
  onJumpViewportTo: I,
  keystrokeMode: D = "BURN_IN",
  onChangeKeystrokeMode: V,
  keystrokes: $ = [],
  showKeystrokes: B = !1,
  showRulerKeystrokes: se = !1,
  onToggleRulerKeystrokes: U,
  _onSplitDirectorSegment: te,
  _onChangeDirectorSegmentDisplay: A,
  _onResetDirectorSegmentToAuto: T,
  audioRoutingPlan: L,
  onSplitAudioSegment: z,
  onChangeAudioSegmentStation: F,
  onChangeAudioSegmentGain: ce,
  onFollowVisualFeed: q,
  isAutoFollowAudio: J,
  canvasLayoutTimeline: le,
  activeKfIndex: Fe = 0,
  onSelectKeyframe: H,
  onAddKeyframeAtEpoch: ne,
  onDeleteKeyframe: he,
  onUpdateKeyframeEpoch: Z,
  onToggleDisplayOnCanvas: ae,
  onUpdateAudioPlan: ye
}) {
  var Ln, Se, be;
  const [Be, X] = u.useState(null), [Q, fe] = u.useState(0), [ge, we] = u.useState(null), [Ie, ie] = u.useState(!0), [De, ke] = u.useState(() => {
    var re;
    return e.length === 1 ? (re = e[0]) == null ? void 0 : re.id : null;
  });
  u.useEffect(() => {
    var re;
    e.length === 1 && !De && ((re = e[0]) != null && re.id) && ke(e[0].id);
  }, [e, De]);
  const Te = u.useRef(null), ze = u.useRef(null), Pe = d / Math.max(1, v), je = Math.ceil(e.length / Gs) || 1, Qe = u.useMemo(() => {
    const re = Q * Gs;
    return e.slice(re, re + Gs);
  }, [e, Q]);
  u.useEffect(() => {
    if (!t && !De) return;
    const re = De || t, We = e.findIndex((Ke) => Ke.id === re);
    if (We !== -1) {
      const Ke = Math.floor(We / Gs);
      Ke !== Q && fe(Ke);
    }
  }, [t, De, e, Q]);
  const Ue = ((Ln = le == null ? void 0 : le.keyframes) == null ? void 0 : Ln[Fe]) || ((Se = le == null ? void 0 : le.keyframes) == null ? void 0 : Se[0]), en = u.useMemo(() => {
    var re;
    return ((re = Ue == null ? void 0 : Ue.layout) == null ? void 0 : re.placements) || [];
  }, [Ue]), tt = u.useMemo(() => e.find((re) => re.id === t) || null, [e, t]), Ge = (E == null ? void 0 : E.globalFirstMs) ?? null, ln = (E == null ? void 0 : E.globalLastMs) ?? null, Rt = u.useMemo(() => (b > 500 || k < d - 500) && k - b >= 1e3, [b, k, d]), pn = u.useMemo(() => e.map((re) => re.id).sort().join(","), [e]), { estimateData: He, isEstimating: vt, formatEstimateSize: Cn } = sx({
    stationIdsKey: pn,
    inPointMs: b,
    outPointMs: k,
    baseEpochMs: a,
    onEstimateLoaded: S
  }), gt = u.useCallback((re) => {
    if (!Te.current) return j;
    const We = Te.current.getBoundingClientRect(), Ke = We.left + 200, Y = We.width - 200 - 58;
    if (Y <= 0) return j;
    const de = Math.max(0, Math.min(re - Ke, Y));
    return Math.round(j + de / Y * Pe);
  }, [j, Pe]), { draggingTarget: Nt, handleStartDrag: En } = rx({
    viewportDurationMs: Pe,
    totalDurationMs: d,
    playheadMs: N,
    setPlayheadMs: C,
    inPointMs: b,
    setInPointMs: P,
    outPointMs: k,
    setOutPointMs: p,
    viewportStartMs: j,
    setViewportStartMs: y,
    getMsFromClientX: gt,
    minimapRef: ze
  }), kt = u.useRef(v);
  kt.current = v;
  const Tt = u.useRef(j);
  Tt.current = j;
  const Wt = u.useRef(d);
  Wt.current = d;
  const Qt = u.useRef(N);
  Qt.current = N, u.useEffect(() => {
    const re = Te.current;
    if (!re) return;
    const We = (Ke) => {
      Ke.preventDefault(), Ke.stopPropagation();
      const Y = Ke.ctrlKey || Ke.shiftKey, de = kt.current, ve = Tt.current, Ee = Wt.current, Xe = Qt.current;
      if (Y) {
        const Je = Math.abs(Ke.deltaX) > Math.abs(Ke.deltaY) ? Ke.deltaX : Ke.deltaY;
        if (Je === 0) return;
        const dt = Ee / Math.max(1, de), Ze = Math.max(0, Ee - dt), Ye = dt * 0.08 * (Je > 0 ? 1 : -1);
        y == null || y(Math.max(0, Math.min(Ze, ve + Ye)));
      } else {
        if (Ke.deltaY === 0) return;
        const dt = Ke.deltaY < 0 ? 1.25 : 0.8, Ze = Math.max(32, Ee / 2e3), Ye = re.getBoundingClientRect(), rt = Ye.left + 200, xt = Ye.width - 200 - 58;
        let at = 0.5;
        if (xt > 0)
          if (Ke.clientX >= rt && Ke.clientX <= Ye.right - 58)
            at = Math.max(0, Math.min(1, (Ke.clientX - rt) / xt));
          else {
            const js = Ee / Math.max(1, de), Gt = (Xe - ve) / js;
            at = Gt >= 0 && Gt <= 1 ? Gt : 0.5;
          }
        const $t = Math.max(1, Math.min(Ze, Math.round(de * dt * 100) / 100));
        if ($t === de) return;
        const un = Ee / de, Yt = Ee / $t, Jn = ve + at * un - at * Yt, _t = Math.max(0, Ee - Yt);
        m == null || m($t), y == null || y(Math.max(0, Math.min(_t, Jn)));
      }
    };
    return re.addEventListener("wheel", We, { passive: !1, capture: !0 }), () => re.removeEventListener("wheel", We, { capture: !0 });
  }, [m, y]);
  const cn = e.length > 0 && Math.abs(k - b) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Te,
      className: "timeline-board-root",
      onContextMenu: (re) => {
        var Ke;
        re.preventDefault();
        const We = (Ke = Te.current) == null ? void 0 : Ke.getBoundingClientRect();
        !We || re.clientX - We.left < 200 || re.clientX > We.right - 58 || we({ x: re.clientX, y: re.clientY, targetMs: Math.max(0, Math.min(d, gt(re.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Wg,
            {
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: b,
              setInPointMs: P,
              outPointMs: k,
              setOutPointMs: p
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                Ug,
                {
                  minimapRef: ze,
                  baseEpochMs: a,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: j,
                  viewportDurationMs: Pe,
                  zoomLevel: v,
                  inPointMs: b,
                  outPointMs: k,
                  playheadMs: N,
                  onStartDragMinimap: En
                }
              ),
              /* @__PURE__ */ s.jsx(
                zg,
                {
                  earliestMediaMs: Ge,
                  latestMediaMs: ln,
                  hasActiveCut: Rt,
                  onJumpToFirst: () => {
                    Ge !== null && (C == null || C(Ge), I == null || I(Ge, "start"));
                  },
                  onJumpToLast: () => {
                    ln !== null && (C == null || C(ln), I == null || I(ln, "end"));
                  },
                  onContextualFit: () => {
                    Rt ? x == null || x(b, k) : Ge !== null && ln !== null && ln > Ge ? x == null || x(Ge, ln) : g == null || g();
                  },
                  onResetZoom: g,
                  baseEpochMs: a,
                  timeMode: c,
                  keystrokeMode: D,
                  onChangeKeystrokeMode: V,
                  showRulerKeystrokes: se,
                  onToggleRulerKeystrokes: U
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              Bg,
              {
                baseEpochMs: a,
                timeMode: c,
                viewportStartMs: j,
                viewportDurationMs: Pe,
                totalDurationMs: d,
                hoverMs: Be,
                onHoverChange: X,
                onSeek: (re) => C == null ? void 0 : C(re),
                inPointMs: b,
                outPointMs: k,
                earliestMediaMs: Ge,
                movieBoundaries: E,
                stationHostname: (tt == null ? void 0 : tt.hostname) || (tt == null ? void 0 : tt.id) || (tt == null ? void 0 : tt.name),
                activeStationName: (tt == null ? void 0 : tt.displayName) || (tt == null ? void 0 : tt.hostname) || (tt == null ? void 0 : tt.name),
                showKeystrokes: !!(se ?? B),
                keystrokes: $
              }
            ) })
          ] })
        ] }),
        je > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Q === 0,
              onClick: () => fe((re) => Math.max(0, re - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            Q * Gs + 1,
            "–",
            Math.min(e.length, (Q + 1) * Gs),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Q >= je - 1,
              onClick: () => fe((re) => Math.min(je - 1, re + 1)),
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
            onMouseMove: (re) => {
              if (Nt || !Te.current) return;
              const We = Te.current.getBoundingClientRect();
              re.clientX >= We.left + 200 && re.clientX <= We.right - 58 ? X(gt(re.clientX)) : X(null);
            },
            onMouseLeave: () => !Nt && X(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => ie((re) => !re), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: Ie ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  Ie && je > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Q === 0,
                        onClick: (re) => {
                          re.stopPropagation(), fe((We) => Math.max(0, We - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      Q + 1,
                      "/",
                      je,
                      " (",
                      Q * Gs + 1,
                      "–",
                      Math.min(e.length, (Q + 1) * Gs),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Q >= je - 1,
                        onClick: (re) => {
                          re.stopPropagation(), fe((We) => Math.min(je - 1, We + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !Ie && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => ie(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: "▶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "🎬 ALL VIDEO (COLLAPSED)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      e.length,
                      " STATIONS"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: ((He == null ? void 0 : He.removedGlobalGaps) || []).map((re, We) => {
                      const Ke = re.startEpochMs - a, Y = re.endEpochMs - a, de = (Math.max(j, Ke) - j) / Pe * 100, Ee = (Math.min(j + Pe, Y) - j) / Pe * 100 - de;
                      if (Ee <= 0) return null;
                      const Xe = Math.round((re.endEpochMs - re.startEpochMs) / 1e3);
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: "gap-full-block gap-global-skipped",
                          style: { left: `${de}%`, width: `${Ee}%` },
                          title: `Shared Gap: ${Xe}s skipped across all stations`,
                          children: [
                            /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
                            Ee > 5 && /* @__PURE__ */ s.jsx("div", { className: "gap-badge global-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
                              "✂ SKIPPED ($",
                              Xe,
                              "s)"
                            ] }) })
                          ]
                        },
                        `sum_gap_${We}`
                      );
                    }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "data-presence-layer", children: /* @__PURE__ */ s.jsx("div", { className: "data-presence-bar", style: { left: "0%", width: "100%" } }) }),
                    b > j && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, (b - j) / Pe * 100)}%` } }),
                    k < j + Pe && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, (k - j) / Pe * 100)}%`, right: 0 } })
                  ] })
                ] }),
                Ie && (e.length > 0 ? Qe.map((re) => {
                  const We = !!(t && re.id === t), Ke = De === re.id, Y = o ? o[re.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Xg,
                    {
                      station: re,
                      isExpanded: Ke,
                      onToggleExpand: () => ke((de) => de === re.id ? null : re.id),
                      isAutoDirectorEnabled: Y,
                      onToggleAutoDirector: i,
                      canvasPlacements: en,
                      onToggleDisplayOnCanvas: ae,
                      directorPlan: re.directorPlan,
                      isActive: We,
                      onSelect: () => n == null ? void 0 : n(re.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: j,
                      viewportDurationMs: Pe,
                      inPointMs: b,
                      outPointMs: k,
                      baseEpochMs: a,
                      segments: M[re.id] || M[re.hostname] || re.segments || [],
                      recordingSegments: M,
                      globalGaps: (He == null ? void 0 : He.removedGlobalGaps) || []
                    },
                    re.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Qg,
                  {
                    audioPlan: L,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: Pe,
                    baseEpochMs: a,
                    playheadMs: N,
                    onSplitSegment: z,
                    onChangeSegmentStation: F,
                    onChangeSegmentGain: ce,
                    onFollowVisualFeed: q,
                    isAutoFollow: J,
                    timeMode: c,
                    onUpdateAudioPlan: ye
                  }
                ),
                ((be = le == null ? void 0 : le.keyframes) == null ? void 0 : be.length) > 0 && /* @__PURE__ */ s.jsx(
                  Jg,
                  {
                    canvasLayoutTimeline: le,
                    activeKfIndex: Fe,
                    onSelectKeyframe: H,
                    onAddKeyframeAtEpoch: ne,
                    onDeleteKeyframe: he,
                    onUpdateKeyframeEpoch: Z,
                    viewportStartMs: j,
                    viewportDurationMs: Pe,
                    baseEpochMs: a,
                    totalDurationMs: d,
                    playheadMs: N,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                tx,
                {
                  isRangeValid: cn,
                  onExport: h,
                  isEstimating: vt,
                  estimateData: He,
                  formatEstimateSize: Cn,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          qg,
          {
            baseEpochMs: a,
            timeMode: c,
            viewportStartMs: j,
            viewportDurationMs: Pe,
            playheadMs: N,
            inPointMs: b,
            outPointMs: k,
            onStartDrag: En
          }
        ),
        /* @__PURE__ */ s.jsx(
          ex,
          {
            contextMenu: ge,
            baseEpochMs: a,
            timeMode: c,
            onAction: (re) => {
              ge && (re === "playhead" ? C == null || C(ge.targetMs) : re === "in" ? P == null || P(Math.max(0, Math.min(ge.targetMs, k - 1e3))) : re === "out" && (p == null || p(Math.min(d, Math.max(ge.targetMs, b + 1e3)))), we(null));
            },
            onClose: () => we(null)
          }
        )
      ]
    }
  );
}
function lx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
              const i = !o && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), a = !o && (r == null ? void 0 : r.coveragePct) >= 100 && !(r != null && r.hasGaps);
              let c, d;
              return o ? (c = "SCANNING...", d = "is-loading") : i ? (c = "NO RECORDINGS", d = "gap-warning") : a ? (c = "100% COVERAGE", d = "full-archived") : (c = r != null && r.hasGaps ? "GAPS DETECTED" : `${r == null ? void 0 : r.coveragePct}% COVERAGE`, d = "gap-warning"), /* @__PURE__ */ s.jsxs("span", { className: `status-indicator-badge ${d}`, children: [
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
          /* @__PURE__ */ s.jsx("div", { className: "card-gap-track-container", title: o ? "Scanning chunks..." : `Recorded: ${r.recordedDuration} (${r.coveragePct}%)`, children: o ? /* @__PURE__ */ s.jsx("div", { className: "track-loading-shimmer" }) : /* @__PURE__ */ s.jsx("div", { className: "card-gap-track", children: r.segments.map((i, a) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: `track-segment ${i.type === "rec" ? "rec" : "gap"}`,
              style: {
                left: `${i.startPct}%`,
                width: `${i.widthPct}%`
              }
            },
            a
          )) }) })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "card-bottom-action", children: /* @__PURE__ */ s.jsx("div", { className: `custom-checkbox-pill ${t ? "checked" : ""}`, children: t ? "✓ SELECTED" : "+ ADD TO WORKSPACE" }) })
      ]
    }
  );
}
function ox({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-gaps-bar", children: /* @__PURE__ */ s.jsx("div", { className: "row-gap-track", title: o ? "Scanning segments..." : `Coverage: ${r.coveragePct}%`, children: o ? /* @__PURE__ */ s.jsx("div", { className: "row-loading-shimmer" }) : r.segments.map((i, a) => /* @__PURE__ */ s.jsx(
          "div",
          {
            className: `track-seg ${i.type === "rec" ? "rec" : "gap"}`,
            style: { left: `${i.startPct}%`, width: `${i.widthPct}%` }
          },
          a
        )) }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-specs", children: /* @__PURE__ */ s.jsx("span", { className: "specs-text", children: o ? "..." : `${r.resolution} • ${r.fps}fps` }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-size", children: /* @__PURE__ */ s.jsx("span", { className: "size-text", children: o ? "..." : r.fileSize }) })
      ]
    }
  );
}
function ix({ station: e, isSelected: t, onToggle: n, meta: r }) {
  var c, d;
  const l = e.displayName || e.hostname || e.name || "", o = r == null ? void 0 : r.isLoading, i = !o && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), a = o ? "loading" : i ? "critical" : ((c = r.trafficStatus) == null ? void 0 : c.level) || (r.hasGaps ? "critical" : "optimal");
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
      /* @__PURE__ */ s.jsx("div", { className: `status-dot ${a}`, title: o ? "Scanning..." : (d = r.trafficStatus) == null ? void 0 : d.label }),
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
      /* @__PURE__ */ s.jsx("span", { className: `coverage-pct ${a}`, children: o ? "..." : `${r.coveragePct}%` })
    ] })
  ] });
}
function ax({
  searchTerm: e,
  onSearchChange: t,
  sortAlpha: n,
  onToggleSort: r,
  effectiveTabs: l,
  selectedTabId: o,
  onSelectTab: i,
  isLoadingTabs: a,
  allStations: c,
  selectedStationIds: d,
  filterMode: v,
  onFilterModeChange: m,
  filteredCount: g,
  selectedInTabCount: N,
  unselectedInTabCount: C,
  activeTabName: b,
  onSelectAllInScope: P,
  onClearInScope: k,
  viewMode: p = "grid",
  onViewModeChange: h,
  isDrawerMode: M = !1
}) {
  const [E, j] = u.useState(!1), y = v !== "all", S = !b || b.toLowerCase() === "all", x = S ? "Select All" : `Select ${b}`, I = S ? "Clear All" : `Clear ${b}`;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-filter-bar-root ${M ? "is-drawer-compact" : ""}`, children: [
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
            onChange: (D) => t(D.target.value)
          }
        )
      ] }),
      M && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${E ? "open" : ""} ${y ? "has-filter" : ""}`,
          onClick: () => j(!E),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            y && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !M && h && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${p === "grid" ? "active" : ""}`,
            onClick: () => h("grid"),
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
            className: `btn-view-mode ${p === "table" ? "active" : ""}`,
            onClick: () => h("table"),
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
    l.length > 1 && (M ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (D) => i(D.target.value),
          children: l.map((D) => {
            const V = D.id === "all" ? c.map((B) => B.id) : D.stationIds || [], $ = V.filter((B) => d.includes(B)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: D.id, children: [
              D.name,
              " (",
              $,
              "/",
              V.length,
              ")"
            ] }, D.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: P, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: k, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        a && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((D) => {
        const V = o === D.id, $ = D.id === "all" ? c.map((U) => U.id) : D.stationIds || [], B = $.length, se = $.filter((U) => d.includes(U)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${V ? "active" : ""}`,
            onClick: () => i(D.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: D.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${se > 0 ? "has-selected" : ""}`, children: [
                se,
                "/",
                B
              ] })
            ]
          },
          D.id
        );
      }) })
    ] })),
    (!M || E) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${M ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "all" ? "active" : ""}`,
            onClick: () => m("all"),
            children: [
              "All (",
              g,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "selected" ? "active" : ""}`,
            onClick: () => m("selected"),
            children: [
              "Sel (",
              N,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "unselected" ? "active" : ""}`,
            onClick: () => m("unselected"),
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
            onClick: () => m("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "audio" ? "active" : ""}`,
            onClick: () => m("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !M && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: P, children: [
          "+ ",
          x
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: k, children: [
          "✕ ",
          I
        ] })
      ] })
    ] })
  ] });
}
function cx({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: i = "table"
}) {
  if (r === 0) return null;
  const a = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = i === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], v = t <= 1, m = (g) => {
    if (g === n) return !0;
    const N = Math.min(n, r), C = Math.min(g, r), b = Math.ceil(r / n), P = Math.ceil(r / g);
    return N !== C || b !== P;
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `hub-pagination-bar ${v ? "is-single-page-mode" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "pagination-range-info", children: [
      /* @__PURE__ */ s.jsx("span", { children: "SHOWING" }),
      /* @__PURE__ */ s.jsxs("strong", { className: "accent-num", children: [
        a,
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((g) => {
        const N = n === g, C = !m(g);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${N ? "active" : ""} ${C ? "redundant-disabled" : ""}`,
            disabled: C,
            onClick: () => o(g),
            title: C ? `All stations already fit on screen (Total: ${r})` : `Show ${g} per page`,
            children: g
          },
          g
        );
      }) })
    ] })
  ] });
}
function ux({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, i] = u.useState(!1), a = u.useRef(null);
  u.useEffect(() => {
    const g = (N) => {
      a.current && !a.current.contains(N.target) && i(!1);
    };
    return o && document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [o]);
  const c = u.useMemo(() => {
    const g = new Map(t.map((N) => [N.id, N]));
    return e.map((N) => g.get(N) || { id: N, hostname: `Station ${N}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = c.slice(0, l), v = c.slice(l), m = v.length > 0;
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
      d.map((g) => {
        const N = g.displayName || g.hostname || g.name || g.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: N, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: N }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (C) => {
                C.stopPropagation(), n(g.id);
              },
              title: `Remove ${N}`,
              children: "✕"
            }
          )
        ] }, g.id);
      }),
      m && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-container", ref: a, children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-overflow-pill ${o ? "active" : ""}`,
            onClick: () => i(!o),
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: v.map((g) => {
            const N = g.displayName || g.hostname || g.name || g.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: N, children: N }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(g.id),
                  title: `Remove ${N}`,
                  children: "✕"
                }
              )
            ] }, g.id);
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
const kp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Vd(e, t, n = kp) {
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
function dx(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (i) => String(i).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function hx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function fx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = kp) {
  const { baseEpochMs: l, durationMs: o } = n, i = !!(e != null && e.hasAudio), a = (e == null ? void 0 : e.audioChannels) || (i ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? hx(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const y = Vd(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: i,
      audioChannels: a,
      resolution: c,
      fps: d,
      fileSize: v,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: y,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const m = l, g = l + o, N = [];
  for (const y of t) {
    const S = Math.max(y.startEpoch, m), x = Math.min(y.endEpoch, g);
    x > S && N.push({ startEpoch: S, endEpoch: x });
  }
  N.sort((y, S) => y.startEpoch - S.endEpoch);
  const C = [];
  for (const y of N)
    if (C.length === 0)
      C.push({ ...y });
    else {
      const S = C[C.length - 1];
      y.startEpoch <= S.endEpoch + 1e3 ? S.endEpoch = Math.max(S.endEpoch, y.endEpoch) : C.push({ ...y });
    }
  let b = 0;
  for (const y of C)
    b += y.endEpoch - y.startEpoch;
  const P = o > 0 ? b / o * 100 : 0, k = P > 0 && P < 1 ? Number(P.toFixed(1)) : Math.min(100, Math.round(P)), p = [];
  let h = m, M = 0;
  for (const y of C) {
    if (y.startEpoch > h + 2e3) {
      const I = (y.startEpoch - h) / o * 100, D = (h - m) / o * 100;
      p.push({
        type: "gap",
        startPct: Math.max(0, D),
        widthPct: Math.min(100, I)
      }), M++;
    }
    const S = (y.endEpoch - y.startEpoch) / o * 100, x = (y.startEpoch - m) / o * 100;
    p.push({
      type: "rec",
      startPct: Math.max(0, x),
      widthPct: Math.min(100, S)
    }), h = y.endEpoch;
  }
  if (h < g - 2e3) {
    const y = (g - h) / o * 100, S = (h - m) / o * 100;
    p.push({
      type: "gap",
      startPct: Math.max(0, S),
      widthPct: Math.min(100, y)
    }), M++;
  }
  const E = M > 0 || k < 100, j = Vd(k, E, r);
  return {
    coveragePct: k,
    recordedDuration: dx(b),
    totalRecordedMs: b,
    hasAudio: i,
    audioChannels: a,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: E,
    gapsCount: M,
    trafficStatus: j,
    segments: p.length > 0 ? p : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const px = Object.freeze([]), mx = 12;
function gx({
  isOpen: e,
  onToggle: t,
  onClose: n,
  allStations: r = [],
  selectedStationIds: l = [],
  onToggleStation: o,
  onUpdateSelections: i,
  isInitialSetup: a,
  isLoadingStations: c = !1,
  isLoadingSegments: d = !1,
  onApply: v,
  onOpenRangeModal: m,
  systemTabs: g = px,
  recordingSegments: N = {},
  baseEpochMs: C = 0,
  durationMs: b = 0
}) {
  const [P, k] = u.useState([]), [p, h] = u.useState("all"), [M, E] = u.useState(""), [j, y] = u.useState(!0), [S, x] = u.useState("all"), [I, D] = u.useState(null), [V, $] = u.useState(!1), [B, se] = u.useState(15), [U, te] = u.useState(8), [A, T] = u.useState(1), L = u.useRef(!1), z = u.useRef(null), F = c && r.length === 0, ce = r.length === 0 && !c;
  let q = "is-closed";
  a || ce || F ? q = "is-full-width" : e && (q = "is-open"), u.useLayoutEffect(() => {
    const ie = () => {
      if (!z.current) return;
      const ke = z.current.clientHeight;
      if (ke <= 0) return;
      const Te = z.current.querySelector(".station-row, .hub-table-row"), ze = Te ? Te.offsetHeight : 40;
      if (ze > 0) {
        const je = Math.floor(ke / ze) - 2, Ue = [5, 10, 15, 20, 25, 30].filter((en) => en <= je).pop() || 5;
        se(Ue);
      }
      const Pe = z.current.clientWidth;
      if (Pe > 0) {
        const Ue = Math.max(1, Math.floor((Pe + 12) / 252)), tt = Math.max(1, Math.floor((ke + 12) / (175 + 12))), Ge = Math.max(Ue * tt, Ue);
        te(Ge);
      }
    };
    ie(), window.addEventListener("resize", ie);
    const De = new ResizeObserver(ie);
    return z.current && De.observe(z.current), () => {
      window.removeEventListener("resize", ie), De.disconnect();
    };
  }, [I, r.length]), u.useEffect(() => {
    if (g && g.length > 0) {
      k(g);
      return;
    }
    if (L.current || !e && !a) return;
    L.current = !0;
    let ie = !0;
    return (async () => {
      $(!0);
      try {
        const ke = await fetch("/api/v1/dashboard/tabs");
        if (ke.ok && ie) {
          const Te = await ke.json();
          Array.isArray(Te) && k(Te);
        }
      } catch (ke) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", ke);
      } finally {
        ie && $(!1);
      }
    })(), () => {
      ie = !1;
    };
  }, [e, a, g]);
  const J = u.useMemo(() => {
    const ie = P.length > 0 ? P : g;
    if (ie && ie.length > 0) {
      const De = ie.map((ke) => {
        const Te = ke.hostnames || ke.assignedHostnames || ke.stations || ke.stationIds || [], ze = r.filter((Pe) => {
          const je = (Pe.hostname || Pe.name || "").trim().toLowerCase();
          return Te.some((Qe) => typeof Qe == "string" ? Qe.trim().toLowerCase() === je || je.includes(Qe.trim().toLowerCase()) : (Qe.hostname || Qe.name || "").trim().toLowerCase() === je);
        }).map((Pe) => Pe.id);
        return {
          id: String(ke.id || ke.tabId || ke.name),
          name: ke.name || "Tab",
          stationIds: ze
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((ke) => ke.id) },
        ...De.filter((ke) => ke.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((De) => De.id) }];
  }, [P, g, r]), le = u.useMemo(() => J.find((ie) => ie.id === p) || J[0], [J, p]), Fe = u.useMemo(() => !le || le.id === "all" ? r.map((ie) => ie.id) : le.stationIds || [], [le, r]), H = u.useMemo(() => !N || Object.keys(N).length === 0 ? r.filter((ie) => ie.isLoaded || ie.segments && ie.segments.length > 0).length : r.filter((ie) => N[ie.id] !== void 0 || ie.isLoaded).length, [r, N]), ne = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && H < r.length && Object.keys(N).length > 0), [d, c, r.length, H, N]), he = u.useMemo(() => {
    const ie = /* @__PURE__ */ new Map(), De = { baseEpochMs: C, durationMs: b };
    for (const ke of r) {
      const ze = !(N && N[ke.id] !== void 0 || ke.isLoaded === !0 || ke.segments && ke.segments.length > 0) && (ne || c || d), Pe = N && N[ke.id] || ke.segments || [], je = fx(ke, Pe, De);
      ie.set(ke.id, {
        ...je,
        hasAudio: ke.hasAudio !== void 0 ? ke.hasAudio : je == null ? void 0 : je.hasAudio,
        audioLabel: ke.audioLabel || (ke.hasAudio ? "AAC" : (je == null ? void 0 : je.audioLabel) || "NONE"),
        audioChannels: ke.audioChannels ? ke.audioChannels === 1 ? "Mono" : "Stereo" : je == null ? void 0 : je.audioChannels,
        feedSpec: ke.feedSpec || (je == null ? void 0 : je.feedSpec) || `${ke.resolution || "1080p"} • ${ke.fps || 30}fps`,
        resolution: ke.resolution || (je == null ? void 0 : je.resolution) || "1080p",
        fps: ke.fps || (je == null ? void 0 : je.fps) || 30,
        isLoading: ze
      });
    }
    return ie;
  }, [r, N, C, b, ne, c, d]), Z = u.useMemo(() => r.filter((ie) => {
    const De = he.get(ie.id), ke = N && N[ie.id] && N[ie.id].length > 0 || ie.segments && ie.segments.length > 0, Te = De && (De.coveragePct > 0 || De.totalRecordedMs > 0), ze = typeof ie.recordingsCount == "number" && ie.recordingsCount > 0;
    return De && !De.isLoading ? Te || ke : ze || ke;
  }), [r, he, N]), ae = u.useMemo(() => Z.filter((ie) => {
    if (le.id !== "all" && !Fe.includes(ie.id) || !(ie.displayName || ie.hostname || ie.name || "").toLowerCase().includes(M.toLowerCase())) return !1;
    const ke = l.includes(ie.id), Te = he.get(ie.id);
    return S === "selected" ? ke : S === "unselected" ? !ke : S === "gaps" ? Te == null ? void 0 : Te.hasGaps : S === "audio" ? Te == null ? void 0 : Te.hasAudio : !0;
  }).sort((ie, De) => j ? (ie.displayName || ie.hostname || "").localeCompare(De.displayName || De.hostname || "") : 0), [Z, le, Fe, M, S, l, j, he]), ye = u.useMemo(() => I !== null ? I : ae.length > mx ? "table" : "grid", [I, ae.length]), Be = ye === "table" ? B : U, X = Math.max(1, Math.ceil(ae.length / Be));
  u.useEffect(() => {
    T(1);
  }, [p, M, S, ye]), u.useEffect(() => {
    A > X && T(X);
  }, [X, A]);
  const Q = u.useMemo(() => {
    if (q !== "is-full-width") return ae;
    const ie = (A - 1) * Be;
    return ae.slice(ie, ie + Be);
  }, [ae, A, Be, q]), fe = () => {
    if (!i) return;
    const ie = le.id === "all" ? ae.map((De) => De.id) : Fe;
    i(Array.from(/* @__PURE__ */ new Set([...l, ...ie])));
  }, ge = () => {
    if (!i) return;
    const ie = new Set(
      le.id === "all" ? ae.map((De) => De.id) : Fe
    );
    i(l.filter((De) => !ie.has(De)));
  }, we = Fe.filter((ie) => l.includes(ie)).length, Ie = ae.filter((ie) => l.includes(ie.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${q}`, children: [
    q !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => q === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            ne && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              H,
              "/",
              r.length
            ] })
          ] })
        ] }),
        q === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      q === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: fe,
            disabled: ae.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                ae.length,
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
            onClick: ge,
            disabled: Ie === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                Ie,
                ")"
              ] })
            ]
          }
        )
      ] }),
      ne && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? H / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: F ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : ce ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: m, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: q === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      q === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${ne ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: ne ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: ne ? `ANALYZING TIMELINE ARCHIVES • ${H} OF ${Z.length} STATIONS SYNCED (${Z.length > 0 ? Math.min(100, Math.round(H / Z.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${Z.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: ne ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(H / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        ax,
        {
          searchTerm: M,
          onSearchChange: E,
          sortAlpha: j,
          onToggleSort: () => y(!j),
          effectiveTabs: J,
          selectedTabId: p,
          onSelectTab: (ie) => {
            h(ie), D(null);
          },
          isLoadingTabs: V,
          allStations: Z,
          selectedStationIds: l,
          filterMode: S,
          onFilterModeChange: x,
          filteredCount: ae.length,
          selectedInTabCount: we,
          unselectedInTabCount: Fe.length - we,
          activeTabName: le.name,
          onSelectAllInScope: fe,
          onClearInScope: ge,
          viewMode: ye,
          onViewModeChange: q === "is-full-width" ? D : null,
          isDrawerMode: q !== "is-full-width"
        }
      ),
      q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: fe,
              disabled: ae.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  ae.length,
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
              onClick: ge,
              disabled: Ie === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  Ie,
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
      q === "is-full-width" && ye === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: z,
          className: `station-list ${q === "is-full-width" ? ye === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: Q.map((ie) => {
            const De = l.includes(ie.id), ke = he.get(ie.id);
            return q === "is-full-width" ? ye === "grid" ? /* @__PURE__ */ s.jsx(
              lx,
              {
                station: ie,
                isSelected: De,
                onToggle: o,
                meta: ke
              },
              ie.id
            ) : /* @__PURE__ */ s.jsx(
              ox,
              {
                station: ie,
                isSelected: De,
                onToggle: o,
                meta: ke
              },
              ie.id
            ) : /* @__PURE__ */ s.jsx(
              ix,
              {
                station: ie,
                isSelected: De,
                onToggle: o,
                meta: ke
              },
              ie.id
            );
          })
        }
      ),
      q === "is-full-width" && /* @__PURE__ */ s.jsx(
        cx,
        {
          currentPage: A,
          totalPages: X,
          pageSize: Be,
          totalItems: ae.length,
          onPageChange: T,
          onPageSizeChange: (ie) => {
            ye === "table" ? se(ie) : te(ie), T(1);
          },
          viewMode: ye
        }
      ),
      q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          ux,
          {
            selectedStationIds: l,
            allStations: r,
            onToggleStation: o,
            onClearAll: () => i && i([]),
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
const Mn = (e) => String(e).padStart(2, "0"), xx = [
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
], yx = [
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
function Kd({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [i, a] = u.useState(e), [c, d] = u.useState(null), v = u.useRef(null), { h: m, m: g, s: N } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const x = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, x[0] || 0)),
      m: Math.min(59, Math.max(0, x[1] || 0)),
      s: Math.min(59, Math.max(0, x[2] || 0))
    };
  }, [e]), C = u.useMemo(() => m >= 12, [m]);
  u.useEffect(() => {
    a(e);
  }, [e]);
  const b = () => {
    const I = i.replace(/[^0-9:]/g, "").trim().split(":").filter((se) => se.length > 0);
    let D = 0, V = 0, $ = 0;
    I.length >= 1 && (D = Math.min(23, Math.max(0, parseInt(I[0], 10) || 0))), I.length >= 2 && (V = Math.min(59, Math.max(0, parseInt(I[1], 10) || 0))), I.length >= 3 && l && ($ = Math.min(59, Math.max(0, parseInt(I[2], 10) || 0)));
    const B = l ? `${Mn(D)}:${Mn(V)}:${Mn($)}` : `${Mn(D)}:${Mn(V)}`;
    a(B), t && t(B, { h: D, m: V, s: $ });
  }, P = (x) => {
    let I = m;
    x === "AM" && m >= 12 ? I = m - 12 : x === "PM" && m < 12 && (I = m + 12);
    const D = l ? `${Mn(I)}:${Mn(g)}:${Mn(N)}` : `${Mn(I)}:${Mn(g)}`;
    a(D), t && t(D, { h: I, m: g, s: N });
  }, k = u.useCallback((x, I) => {
    if (!v.current) return null;
    const D = v.current.getBoundingClientRect(), V = D.left + D.width / 2, $ = D.top + D.height / 2, B = x.clientX - V, se = x.clientY - $;
    let U = Math.atan2(se, B) * 180 / Math.PI + 90;
    if (U < 0 && (U += 360), I === "hours") {
      const te = Math.round(U / 30) % 12;
      return C ? te === 0 ? 12 : te + 12 : te === 0 ? 0 : te;
    }
    return Math.round(U / 6) % 60;
  }, [C]), p = u.useCallback((x, I) => {
    let D = m, V = g, $ = N;
    x === "hours" ? D = I : x === "minutes" ? V = I : x === "seconds" && ($ = I);
    const B = l ? `${Mn(D)}:${Mn(V)}:${Mn($)}` : `${Mn(D)}:${Mn(V)}`;
    a(B), t && t(B, { h: D, m: V, s: $ });
  }, [m, g, N, l, t]), h = (x, I) => {
    I.preventDefault(), I.stopPropagation(), d(x);
    const D = k(I, x);
    D !== null && p(x, D);
  };
  u.useEffect(() => {
    if (!c) return;
    const x = (D) => {
      const V = k(D, c);
      V !== null && p(c, V);
    }, I = () => {
      d(null);
    };
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", I), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", I);
    };
  }, [c, k, p]);
  const M = u.useMemo(() => m % 12 * 30, [m]), E = u.useMemo(() => g % 60 * 6, [g]), j = u.useMemo(() => N % 60 * 6, [N]), y = C ? yx : xx, S = u.useMemo(() => {
    const x = [];
    for (let I = 0; I < 60; I++) {
      const D = (I * 6 - 90) * (Math.PI / 180), V = I % 5 === 0, $ = 104, B = V ? 93 : 98;
      x.push({
        index: I,
        x1: 110 + B * Math.cos(D),
        y1: 110 + B * Math.sin(D),
        x2: 110 + $ * Math.cos(D),
        y2: 110 + $ * Math.sin(D),
        isMajor: V
      });
    }
    return x;
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
            value: i,
            onChange: (x) => a(x.target.value),
            onBlur: b,
            onKeyDown: (x) => {
              x.key === "Enter" && x.currentTarget.blur();
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: S.map((x) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: x.x1,
              y1: x.y1,
              x2: x.x2,
              y2: x.y2,
              className: `dial-tick ${x.isMajor ? "major" : "minor"}`
            },
            `tick-${x.index}`
          )) }),
          y.map((x) => {
            const I = (x.angle - 90) * (Math.PI / 180), D = 76, V = 110 + D * Math.cos(I), $ = 110 + D * Math.sin(I), B = m === x.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: V,
                y: $,
                className: `dial-num ${B ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: x.label
              },
              `dial-h-${x.val}`
            );
          }),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-hour ${c === "hours" ? "dragging" : ""}`,
              transform: `rotate(${M} 110 110)`,
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
                    onPointerDown: (x) => h("hours", x)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${c === "minutes" ? "dragging" : ""}`,
              transform: `rotate(${E} 110 110)`,
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
                    onPointerDown: (x) => h("minutes", x)
                  }
                )
              ]
            }
          ),
          l && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${c === "seconds" ? "dragging" : ""}`,
              transform: `rotate(${j} 110 110)`,
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
                    onPointerDown: (x) => h("seconds", x)
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
const Fo = 7 * 24 * 60 * 60 * 1e3, Lt = (e) => String(e).padStart(2, "0");
function vx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: i
}) {
  const [a, c] = u.useState(""), [d, v] = u.useState(""), [m, g] = u.useState("00:00:00"), [N, C] = u.useState("00:00:00"), [b, P] = u.useState(() => /* @__PURE__ */ new Date()), [k, p] = u.useState(null), [h, M] = u.useState([]), [E, j] = u.useState(!1), [y, S] = u.useState(""), [x, I] = u.useState(1), [D, V] = u.useState(2), [$, B] = u.useState(null), se = u.useCallback(() => {
    try {
      const X = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (X) {
        const Q = JSON.parse(X);
        Array.isArray(Q) && M(Q);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((X) => X.ok ? X.json() : null).then((X) => {
      Array.isArray(X) && X.length > 0 && M(X);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    se();
    let X = n == null ? void 0 : n.startEpochMs, Q = n == null ? void 0 : n.endEpochMs;
    if (!X || isNaN(X))
      if (n != null && n.start) {
        const we = String(n.start).replace(" ", "T"), Ie = new Date(we).getTime();
        X = isNaN(Ie) ? Date.now() - 24 * 3600 * 1e3 : Ie;
      } else
        Q = Date.now(), X = Q - 24 * 3600 * 1e3;
    if (!Q || isNaN(Q))
      if (n != null && n.end) {
        const we = String(n.end).replace(" ", "T"), Ie = new Date(we).getTime();
        Q = isNaN(Ie) ? Date.now() : Ie;
      } else
        Q = X + 24 * 3600 * 1e3;
    B(null);
    const fe = br(X, o), ge = br(Q, o);
    c(`${fe.year}-${Lt(fe.month)}-${Lt(fe.day)}`), v(`${ge.year}-${Lt(ge.month)}-${Lt(ge.day)}`), g(`${Lt(fe.hour)}:${Lt(fe.minute)}:${Lt(fe.second)}`), C(`${Lt(ge.hour)}:${Lt(ge.minute)}:${Lt(ge.second)}`), P(new Date(Date.UTC(fe.year, fe.month - 1, 1)));
  }, [e, n, o, se]);
  const U = u.useCallback(() => {
    a && !d && v(a);
  }, [a, d]), te = d || a, A = u.useMemo(() => a ? `${a}T${m}` : "", [a, m]), T = u.useMemo(() => te ? `${te}T${N}` : "", [te, N]), L = u.useMemo(() => {
    const X = {};
    return h.forEach((Q) => {
      const fe = Q.startTime || Q.start, ge = Q.endTime || Q.end || fe;
      if (!fe) return;
      const we = String(fe).substring(0, 10), Ie = String(ge).substring(0, 10), [ie, De, ke] = we.split("-").map(Number), [Te, ze, Pe] = Ie.split("-").map(Number);
      if (isNaN(ie) || isNaN(De) || isNaN(ke) || isNaN(Te) || isNaN(ze) || isNaN(Pe)) return;
      let je = new Date(Date.UTC(ie, De - 1, ke));
      const Qe = new Date(Date.UTC(Te, ze - 1, Pe));
      for (; je.getTime() <= Qe.getTime(); ) {
        const Ue = `${je.getUTCFullYear()}-${Lt(je.getUTCMonth() + 1)}-${Lt(je.getUTCDate())}`;
        X[Ue] || (X[Ue] = []), X[Ue].push(Q), je.setUTCDate(je.getUTCDate() + 1);
      }
    }), X;
  }, [h]), z = async (X, Q) => {
    if (Q && Q.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const fe = h.filter((ge) => (ge.id || ge.startTime) !== X);
    M(fe);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(fe)), localStorage.setItem("itb_bookmarks", JSON.stringify(fe)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: fe }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${X}`, { method: "DELETE" });
    } catch {
    }
  }, F = (X) => {
    const Q = X.startTime || X.start, fe = X.endTime || X.end;
    if (!Q || !fe) return;
    const ge = Q.substring(0, 10), we = Q.includes("T") ? Q.split("T")[1].substring(0, 8) : "00:00:00", Ie = fe.substring(0, 10), ie = fe.includes("T") ? fe.split("T")[1].substring(0, 8) : "23:59:59";
    c(ge), v(Ie), g(we), C(ie);
    const [De, ke] = ge.split("-").map(Number);
    P(new Date(Date.UTC(De, ke - 1, 1))), j(!1);
  }, ce = (X) => {
    l ? (l(X), t && t()) : F(X);
  }, q = u.useMemo(() => {
    if (o === "UTC" || !A.includes("T")) return { isAmbiguous: !1 };
    const [X, Q] = A.split("T");
    return Ei(X, Q);
  }, [A, o]), J = u.useMemo(() => {
    if (o === "UTC" || !T.includes("T")) return { isAmbiguous: !1 };
    const [X, Q] = T.split("T");
    return Ei(X, Q);
  }, [T, o]), le = u.useMemo(() => {
    if (!a || !te) return null;
    const X = vc(a, m, o, x), Q = vc(te, N, o, D);
    return X === null || Q === null || isNaN(X) || isNaN(Q) ? null : { startEpoch: X, endEpoch: Q, durationMs: Q - X };
  }, [a, m, te, N, o, x, D]), Fe = u.useMemo(() => !le || le.durationMs <= 0 ? [] : dp(le.startEpoch, le.endEpoch), [le]), H = u.useMemo(() => {
    if (!le || le.durationMs <= 0) return "0h";
    const X = le.durationMs / (1e3 * 60 * 60);
    return X >= 24 ? `${(X / 24).toFixed(1)}d (${X.toFixed(0)}h)` : `${X.toFixed(1)}h`;
  }, [le]), ne = u.useMemo(() => {
    const X = b.getUTCFullYear(), Q = b.getUTCMonth(), fe = new Date(Date.UTC(X, Q, 1)).getUTCDay(), ge = new Date(Date.UTC(X, Q + 1, 0)).getUTCDate(), we = [];
    for (let Ie = 0; Ie < fe; Ie++) we.push(null);
    for (let Ie = 1; Ie <= ge; Ie++) we.push(`${X}-${Lt(Q + 1)}-${Lt(Ie)}`);
    return we;
  }, [b]), he = (X) => {
    if (X) {
      if (B(null), !a || a && d)
        c(X), v("");
      else if (a && !d)
        if (X < a)
          c(X), v("");
        else {
          const Q = (/* @__PURE__ */ new Date(a + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(X + "T00:00:00Z")).getTime() - Q > Fo) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const ge = new Date(Q + Fo);
            v(`${ge.getUTCFullYear()}-${Lt(ge.getUTCMonth() + 1)}-${Lt(ge.getUTCDate())}`);
          } else
            v(X);
        }
    }
  }, Z = (X, Q) => {
    B(Q);
    const fe = Date.now(), ge = fe - X, we = br(ge, o), Ie = br(fe, o);
    c(`${we.year}-${Lt(we.month)}-${Lt(we.day)}`), v(`${Ie.year}-${Lt(Ie.month)}-${Lt(Ie.day)}`), g(`${Lt(we.hour)}:${Lt(we.minute)}:${Lt(we.second)}`), C(`${Lt(Ie.hour)}:${Lt(Ie.minute)}:${Lt(Ie.second)}`), P(new Date(Date.UTC(we.year, we.month - 1, 1)));
  }, ae = () => {
    if (U(), !le || isNaN(le.startEpoch) || isNaN(le.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (le.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (le.durationMs > Fo) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: A,
      end: T,
      startEpochMs: le.startEpoch,
      endEpochMs: le.endEpoch,
      durationMs: le.durationMs,
      timeMode: o
    }), t && t();
  }, ye = u.useMemo(() => {
    if (!y.trim()) return h;
    const X = y.toLowerCase();
    return h.filter(
      (Q) => (Q.title || Q.name || "").toLowerCase().includes(X) || (Q.startTime || "").includes(X)
    );
  }, [h, y]);
  if (!e) return null;
  const Be = o === "UTC";
  return Fs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (X) => X.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${Be ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: Be ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            i && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Be ? "" : "active"}`,
                  onClick: () => i("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Be ? "active" : ""}`,
                  onClick: () => i("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${E ? "active" : ""}`,
                onClick: () => j(!E),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: h.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      Fe.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Fe.map((X) => `${X.description} (${X.labelBefore} ➔ ${X.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "7d" ? "active" : ""}`,
            onClick: () => Z(7 * 24 * 3600 * 1e3, "7d"),
            children: [
              "7d Week Max ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "3d" ? "active" : ""}`,
            onClick: () => Z(3 * 24 * 3600 * 1e3, "3d"),
            children: [
              "3d Block ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "24h" ? "active" : ""}`,
            onClick: () => Z(24 * 3600 * 1e3, "24h"),
            children: [
              "24h Day ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "8h" ? "active" : ""}`,
            onClick: () => Z(8 * 3600 * 1e3, "8h"),
            children: [
              "8h Shift ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        )
      ] }),
      E && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
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
                value: y,
                onChange: (X) => S(X.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            ye.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: ye.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : ye.map((X) => {
          var Ie;
          const Q = X.id || X.startTime, fe = X.title || X.name || "Untitled Mission", ge = (X.startTime || "").replace("T", " "), we = (X.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => F(X), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: fe }),
                X.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  X.cutStationName
                ] }),
                ((Ie = X.stationIds) == null ? void 0 : Ie.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  X.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                ge,
                " ➔ ",
                we
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (ie) => {
                    ie.stopPropagation(), F(X);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (ie) => {
                    ie.stopPropagation(), ce(X);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (ie) => z(Q, ie),
                  children: "✕"
                }
              )
            ] })
          ] }, Q);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: b.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => P((X) => new Date(Date.UTC(X.getUTCFullYear(), X.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => P((X) => new Date(Date.UTC(X.getUTCFullYear(), X.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: ne.map((X, Q) => {
            if (!X) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${Q}`);
            const fe = parseInt(X.split("-")[2], 10), ge = X === a, we = X === (d || a), Ie = d || k, ie = a && Ie && X > a && X < Ie, De = L[X], ke = !!(De && De.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${ge ? "start-edge" : ""} ${we ? "end-edge" : ""} ${ie ? "in-range" : ""} ${ke ? "has-bookmark" : ""}`,
                onClick: () => he(X),
                onMouseEnter: () => !d && a && p(X),
                onMouseLeave: () => p(null),
                title: ke ? `${De.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: fe }),
                  ke && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Te) => {
                        Te.stopPropagation(), j(!0), S(X);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        De.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: De.length })
                      ]
                    }
                  )
                ]
              },
              X
            );
          }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "range-status-footer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "point-chip start", children: [
              /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "FROM:" }),
              /* @__PURE__ */ s.jsx("strong", { children: a || "SELECT" })
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "arrow-sep", children: "➔" }),
            /* @__PURE__ */ s.jsxs("div", { className: "point-chip end", children: [
              /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "TO:" }),
              /* @__PURE__ */ s.jsx("strong", { children: d || a || "--" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: U, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Kd,
            {
              label: "START TIME (FROM)",
              value: m,
              onChange: (X) => {
                U(), g(X), B(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Kd,
            {
              label: "END TIME (TO)",
              value: N,
              onChange: (X) => {
                U(), C(X), B(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (q.isAmbiguous || J.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        q.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
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
                className: x === 1 ? "active" : "",
                onClick: () => I(1),
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
                className: x === 2 ? "active" : "",
                onClick: () => I(2),
                children: [
                  "2nd Occurrence (",
                  q.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        J.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            J.transition.labelBefore,
            " / ",
            J.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: D === 1 ? "active" : "",
                onClick: () => V(1),
                children: [
                  "1st Occurrence (",
                  J.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: D === 2 ? "active" : "",
                onClick: () => V(2),
                children: [
                  "2nd Occurrence (",
                  J.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: le && le.durationMs > Fo ? "#f43f5e" : "#22d3ee" }, children: H }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Fe.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: ae, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const wp = "extractor_incident_bookmarks_fallback", Nx = ["itb_studio_bookmarks", "itb_bookmarks", wp];
function kx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [i, a] = u.useState([]), [c, d] = u.useState(""), [v, m] = u.useState(!1), [g, N] = u.useState(!1), [C, b] = u.useState(null), [P, k] = u.useState(""), p = u.useCallback(($) => {
    Nx.forEach((B) => {
      try {
        localStorage.setItem(B, JSON.stringify($));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: $ }));
  }, []), h = u.useCallback(async () => {
    m(!0);
    try {
      const $ = await fetch("/api/v1/extractor-advanced/bookmarks");
      if ($.ok) {
        const B = await $.json(), se = Array.isArray(B) ? B : [];
        a(se), p(se);
        return;
      }
    } catch ($) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", $);
    } finally {
      m(!1);
    }
    try {
      const $ = localStorage.getItem(wp) || localStorage.getItem("itb_studio_bookmarks");
      $ && a(JSON.parse($));
    } catch {
    }
  }, [p]);
  if (u.useEffect(() => {
    e && h();
  }, [e, h]), !e) return null;
  const M = async () => {
    var q, J, le, Fe, H, ne;
    if (!c.trim() || g) return;
    const $ = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((q = n == null ? void 0 : n.timeRange) != null && q.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), B = (n == null ? void 0 : n.inPointMs) ?? 0, se = (n == null ? void 0 : n.outPointMs) ?? (((J = n == null ? void 0 : n.timeRange) == null ? void 0 : J.durationMs) || 0), U = (n == null ? void 0 : n.playheadMs) ?? B, te = $ + B, A = $ + se, T = $ + U, L = (n == null ? void 0 : n.selectedStationIds) || [], z = (n == null ? void 0 : n.selectedStationNames) || [], F = ((le = n == null ? void 0 : n.allStationIds) == null ? void 0 : le.length) > 0 ? n.allStationIds : L, ce = {
      title: c.trim(),
      startTime: ((Fe = n == null ? void 0 : n.timeRange) == null ? void 0 : Fe.start) || "",
      endTime: ((H = n == null ? void 0 : n.timeRange) == null ? void 0 : H.end) || "",
      baseEpochMs: $,
      timelineBaseEpochMs: $,
      inPointMs: B,
      outPointMs: se,
      playheadMs: U,
      inEpochMs: te,
      outEpochMs: A,
      playheadEpochMs: T,
      selectedStationIds: L,
      selectedStationNames: z,
      allStationIds: F,
      stationIds: L.length > 0 ? L : F,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    N(!0);
    try {
      const he = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ce)
      });
      if (he.ok) {
        const Z = await he.json(), ye = [{
          ...ce,
          ...Z.bookmark || {},
          inEpochMs: te,
          outEpochMs: A,
          playheadEpochMs: T,
          selectedStationIds: L,
          selectedStationNames: z,
          allStationIds: F,
          id: ((ne = Z.bookmark) == null ? void 0 : ne.id) || Z.id || `bm_${Date.now()}`
        }, ...i];
        a(ye), p(ye), d("");
      } else
        throw new Error(`Server returned ${he.status}`);
    } catch (he) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", he);
      const ae = [{
        ...ce,
        inEpochMs: te,
        outEpochMs: A,
        playheadEpochMs: T,
        selectedStationIds: L,
        selectedStationNames: z,
        allStationIds: F,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...i];
      a(ae), p(ae), d("");
    } finally {
      N(!1);
    }
  }, E = async ($, B) => {
    if (B.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const se = i.filter((U) => (U.id || U.startTime) !== $);
    a(se), p(se);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, { method: "DELETE" });
    } catch (U) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", U);
    }
  }, j = ($, B) => {
    B.stopPropagation(), b($.id || $.startTime), k($.title || $.name || "");
  }, y = async ($, B) => {
    if (B && B.stopPropagation(), !P.trim()) return;
    const se = i.find((A) => (A.id || A.startTime) === $), U = P.trim(), te = i.map(
      (A) => (A.id || A.startTime) === $ ? { ...A, title: U, name: U } : A
    );
    a(te), p(te), b(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...se, title: U })
      });
    } catch (A) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", A);
    }
  }, S = ($) => {
    $.stopPropagation(), b(null);
  }, x = ($) => !$ || isNaN($) ? "--:--:--" : yt($, o), I = ($) => {
    const B = $.startTime || $.StartTime, se = $.endTime || $.EndTime;
    if (!B) return "--";
    const U = String(B).replace("T", " ").substring(0, 19), te = se ? String(se).replace("T", " ").substring(0, 19) : U;
    return `${U} ➔ ${te}`;
  }, D = ($) => {
    let B = $.inEpochMs || $.InEpochMs, se = $.outEpochMs || $.OutEpochMs;
    if (!B || !se) {
      const U = $.timelineBaseEpochMs || $.baseEpochMs || ($.startTime ? new Date(String($.startTime).replace(" ", "T")).getTime() : 0), te = $.inPointMs ?? $.InPointMs, A = $.outPointMs ?? $.OutPointMs;
      U && typeof te == "number" && typeof A == "number" && (te > 0 || A > 0) && (B = U + te, se = U + A);
    }
    if (B && se && !isNaN(B) && !isNaN(se) && B > 0) {
      const U = x(B), te = x(se), A = Math.max(0, se - B), T = Math.floor(A / 6e4), L = Math.floor(T / 60), z = T % 60, F = L > 0 ? `${L}h ${z}m` : `${T}m`;
      return { timeText: `${U} ➔ ${te}`, duration: F };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, V = ($) => {
    const B = $.selectedStationNames || [], se = $.selectedStationIds || $.cutStationIds || $.stationIds || [];
    return B.length > 0 ? B.join(", ") : se.length > 0 ? se.join(", ") : $.cutStationName ? $.cutStationName : $.activeStationName ? $.activeStationName : "All Stations in Scope";
  };
  return Fs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "bookmarks-modal-overlay", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-modal-card", onClick: ($) => $.stopPropagation(), children: [
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
              onChange: ($) => d($.target.value),
              onKeyDown: ($) => $.key === "Enter" && M(),
              disabled: g,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !g ? "active" : ""}`,
            onClick: M,
            disabled: !c.trim() || g,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                /* @__PURE__ */ s.jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: g ? "SAVING..." : "SAVE SNAPSHOT" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-section-heading", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "heading-title-group", children: [
          /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
          /* @__PURE__ */ s.jsx("span", { children: "SAVED TIMELINE EVENTS" })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: v ? "SYNCING..." : `${i.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: i.length === 0 && !v ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : i.map(($) => {
        var T, L, z;
        const B = $.id || $.startTime, se = C === B, U = D($), te = V($), A = ((T = $.allStationIds) == null ? void 0 : T.length) || ((L = $.selectedStationIds) == null ? void 0 : L.length) || ((z = $.stationIds) == null ? void 0 : z.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${se ? "is-editing" : ""}`,
            onClick: () => {
              se || (r && r($), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                se ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (F) => F.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: P,
                      onChange: (F) => k(F.target.value),
                      onKeyDown: (F) => {
                        F.key === "Enter" && y(B, F), F.key === "Escape" && S(F);
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
                        onClick: (F) => y(B, F),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: S,
                        title: "Cancel (Esc)",
                        children: "✕"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ s.jsxs("div", { className: "bm-title-row", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "bm-title", children: $.title || $.name || "Untitled Event" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-time-tag", children: $.createdAt ? new Date($.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
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
                    /* @__PURE__ */ s.jsx("strong", { children: I($) })
                  ] }),
                  A > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    A,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: U.timeText }),
                    U.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      U.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${te}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: te })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (F) => F.stopPropagation(), children: [
                !se && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (F) => j($, F),
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
                    onClick: (F) => E(B, F),
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
          B
        );
      }) })
    ] }) }),
    document.body
  );
}
function wx({
  displays: e = [],
  activeDisplayId: t = "mon-0",
  onSelectDisplay: n,
  isTransitioning: r = !1,
  mode: l = "AUTO",
  // 'AUTO' or 'MANUAL'
  activeTimeRange: o = ""
}) {
  const i = u.useMemo(() => {
    if (!e || e.length <= 1) return null;
    let m = 1 / 0, g = 1 / 0, N = -1 / 0, C = -1 / 0;
    e.forEach((k) => {
      const p = k.x ?? k.X ?? 0, h = k.y ?? k.Y ?? 0, M = k.width ?? k.Width ?? 1920, E = k.height ?? k.Height ?? 1080;
      m = Math.min(m, p), g = Math.min(g, h), N = Math.max(N, p + M), C = Math.max(C, h + E);
    });
    const b = Math.max(1, N - m), P = Math.max(1, C - g);
    return { minX: m, minY: g, totalW: b, totalH: P };
  }, [e]);
  if (!e || e.length <= 1 || !i)
    return null;
  const a = e.find((m) => (m.displayId ?? m.DisplayId) === t) || e[0];
  e.indexOf(a);
  const v = ((a ? a.displayName ?? a.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim() || "SCREEN").toUpperCase();
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (m) => m.stopPropagation(),
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "hud-header", children: /* @__PURE__ */ s.jsxs("span", { className: `hud-badge ${l.toLowerCase()}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "hud-pulse" }),
          l === "MANUAL" ? "✋ OVERRIDE" : "⚡ AUTO",
          " : ",
          v,
          o && /* @__PURE__ */ s.jsxs("span", { className: "hud-time-range", children: [
            " [",
            o,
            "]"
          ] })
        ] }) }),
        /* @__PURE__ */ s.jsx("div", { className: "hud-canvas-wrap", children: /* @__PURE__ */ s.jsx(
          "svg",
          {
            className: "hud-topology-svg",
            viewBox: `0 0 ${i.totalW} ${i.totalH}`,
            preserveAspectRatio: "xMidYMid meet",
            children: e.map((m, g) => {
              const N = m.displayId ?? m.DisplayId ?? `mon-${g}`, C = (m.x ?? m.X ?? 0) - i.minX, b = (m.y ?? m.Y ?? 0) - i.minY, P = m.width ?? m.Width ?? 1920, k = m.height ?? m.Height ?? 1080, p = N === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${p ? "is-active" : ""}`,
                  onClick: (h) => {
                    h.stopPropagation(), n == null || n(N);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: C + 10,
                        y: b + 10,
                        width: Math.max(10, P - 20),
                        height: Math.max(10, k - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: C + P / 2,
                        y: b + k / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: g + 1
                      }
                    )
                  ]
                },
                N
              );
            })
          }
        ) })
      ]
    }
  );
}
function jx(e) {
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
function Cx(e, t) {
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
function Ex({
  station: e,
  baseEpochMs: t = 0,
  totalDurationMs: n = 36e5,
  playheadMs: r = 0,
  setPlayheadMs: l,
  isPlaying: o = !1,
  setIsPlaying: i,
  playbackSpeed: a = 1,
  _timeMode: c = "LOCAL",
  inPointMs: d = 0,
  outPointMs: v = 36e5,
  isLooping: m = !0,
  recordingSegments: g = {},
  globalGaps: N = [],
  showWatermark: C = !0,
  directorPlan: b,
  onOverrideDisplay: P,
  onResetOverride: k,
  viewMode: p,
  onViewModeChange: h,
  onOpenFullscreen: M,
  isPipSwapped: E,
  onPipSwapChange: j,
  className: y = ""
}) {
  const S = u.useRef(null), x = u.useRef(null), I = u.useRef(null), D = u.useRef(r), V = u.useRef(r), $ = u.useRef(r), B = u.useRef(!1), se = u.useRef(null), U = u.useRef(o), te = u.useRef(!1);
  D.current = r;
  const A = e == null ? void 0 : e.id, T = e && (e.hostname || e.name) || "", L = u.useMemo(() => {
    var Ee, Xe, Je, dt;
    const Y = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ee = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ee.displays) || ((Xe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Xe.Displays) || ((Je = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : Je.Displays) || ((dt = e == null ? void 0 : e.topology) == null ? void 0 : dt.displays) || [];
    if (!Array.isArray(Y) || Y.length === 0) return [];
    const de = Y.length > 1 && Y.every((Ze) => (Ze.X ?? Ze.x ?? 0) === 0 && (Ze.Y ?? Ze.y ?? 0) === 0);
    let ve = 0;
    return Y.map((Ze, Ye) => {
      const rt = Ze.Width || Ze.width || 1920, xt = Ze.Height || Ze.height || 1080, at = de ? ve : Ze.X ?? Ze.x ?? Ye * rt, $t = de ? 0 : Ze.Y ?? Ze.y ?? 0;
      de && (ve += rt);
      const un = (Ze.displayId ?? Ze.DisplayId ?? `mon-${Ye}`).toLowerCase(), Yt = Ze.displayNumber ?? Ze.DisplayNumber ?? Ye + 1, _t = (Ze.displayName || Ze.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${Yt}`, js = !!(Ze.isPrimary ?? Ze.IsPrimary ?? Ye === 0);
      return {
        ...Ze,
        displayId: un,
        DisplayId: un,
        displayIndex: Ye,
        displayNumber: Yt,
        DisplayNumber: Yt,
        displayName: _t,
        DisplayName: _t,
        isPrimary: js,
        IsPrimary: js,
        x: at,
        y: $t,
        X: at,
        Y: $t,
        width: rt,
        height: xt,
        Width: rt,
        Height: xt
      };
    });
  }, [e]), z = L.length > 1, [F, ce] = u.useState(() => {
    if (!z) return "mon-0";
    try {
      const Y = localStorage.getItem("itb_solo_viewmode");
      if (Y) return Y;
    } catch {
    }
    return "canvas";
  }), J = z ? p !== void 0 ? p : F : "mon-0", le = u.useCallback((Y) => {
    const de = typeof Y == "function" ? Y(J) : Y;
    ce(de);
    try {
      localStorage.setItem("itb_solo_viewmode", de);
    } catch {
    }
    h && h(de);
  }, [J, h]), [Fe, H] = u.useState(!1), ne = E !== void 0 ? E : Fe, he = u.useCallback((Y) => {
    const de = typeof Y == "function" ? Y(ne) : Y;
    H(de), j && j(de);
  }, [ne, j]), Z = u.useMemo(() => {
    const Y = b || (e == null ? void 0 : e.directorPlan);
    if (!Y || !Y.segments || Y.segments.length === 0) return null;
    const de = t + r;
    return Y.segments.find((ve) => {
      const Ee = ve.startEpochMs ?? ve.StartEpochMs ?? 0, Xe = ve.endEpochMs ?? ve.EndEpochMs ?? 0;
      return de >= Ee && de <= Xe;
    }) || Y.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t, r]), ae = u.useMemo(() => {
    var Y, de;
    if (!z) return "mon-0";
    if (J === "split" || J === "pip" || J === "canvas" || J === "all-displays") {
      const ve = (((Y = L[0]) == null ? void 0 : Y.displayId) ?? "mon-0").toLowerCase(), Ee = (((de = L[1]) == null ? void 0 : de.displayId) ?? "mon-1").toLowerCase();
      return ne ? Ee : ve;
    }
    return J !== "director" ? J.toLowerCase() : ((Z == null ? void 0 : Z.targetDisplayId) ?? (Z == null ? void 0 : Z.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [z, J, Z, L, ne]), ye = u.useMemo(() => {
    var de;
    if (!z) return null;
    const Y = L.find((ve) => (ve.displayId ?? ve.DisplayId ?? "").toLowerCase() !== ae);
    return Y ? (Y.displayId ?? Y.DisplayId).toLowerCase() : (((de = L[1]) == null ? void 0 : de.displayId) || "mon-1").toLowerCase();
  }, [z, L, ae]), Be = u.useMemo(() => {
    const Y = L.find((ve) => (ve.displayId ?? "").toLowerCase() === (ae || "").toLowerCase());
    if (Y) return Y.displayName || `Screen ${Y.displayNumber || 1}`;
    if (ae === "mon-0" || ae === "0") return "Screen 1";
    if (ae === "mon-1" || ae === "1") return "Screen 2";
    const de = (ae || "").match(/\d+/);
    if (de) {
      const ve = parseInt(de[0], 10);
      return `Screen ${(ae || "").startsWith("mon-") ? ve + 1 : ve}`;
    }
    return (ae || "Screen 1").toUpperCase();
  }, [L, ae]), X = u.useMemo(() => {
    const Y = L.find((de) => (de.displayId ?? "").toLowerCase() === (ye || "").toLowerCase());
    return Y ? Y.displayName || `Screen ${Y.displayNumber || 2}` : "Screen 2";
  }, [L, ye]), Q = u.useMemo(() => J !== "director" && J !== "split" && J !== "pip" && J !== "canvas" ? !0 : !!((Z == null ? void 0 : Z.isManualOverride) ?? (Z == null ? void 0 : Z.IsManualOverride)), [J, Z]), [fe, ge] = u.useState({}), we = u.useRef(null), [Ie, ie] = u.useState({ width: 0, height: 0 }), De = u.useMemo(() => jx(L), [L]);
  u.useEffect(() => {
    if (!z || J !== "canvas" && J !== "all-displays" || o)
      return;
    const Y = () => {
      const ve = we.current;
      if (!ve) return;
      const Ee = 48, Xe = 72, Je = Math.max(100, ve.clientWidth - Ee), dt = Math.max(100, ve.clientHeight - Xe), Ze = De.totalWidth || 1920, Ye = De.totalHeight || 1080, rt = Ze / Ye;
      let xt = Je, at = xt / rt;
      at > dt && (at = dt, xt = at * rt), ie({ width: Math.round(xt), height: Math.round(at) });
    };
    Y();
    const de = new ResizeObserver(Y);
    return we.current && de.observe(we.current), () => de.disconnect();
  }, [z, J, De]);
  const ke = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!z || J !== "canvas" && J !== "all-displays")
      return;
    let Y = !0;
    const de = new AbortController(), ve = ke;
    L.forEach((Xe, Je) => {
      const dt = (Xe.displayId ?? Xe.DisplayId ?? `mon-${Je}`).toLowerCase(), Ze = In.get(T, ve, dt);
      Ze ? ge((Ye) => ({ ...Ye, [dt]: Ze })) : In.fetchFrame(T, ve, de.signal, dt).then((Ye) => {
        Y && Ye && ge((rt) => ({ ...rt, [dt]: Ye }));
      });
    });
    const Ee = In.subscribe((Xe, Je, dt, Ze) => {
      Xe === T && Je === ve && Ze && Y && ge((Ye) => ({ ...Ye, [Ze.toLowerCase()]: dt }));
    });
    return () => {
      Y = !1, de.abort(), Ee();
    };
  }, [z, J, L, T, ke]);
  const Te = u.useRef(ae), ze = u.useMemo(() => e ? g[e.id] || g[e.hostname] || e.segments || [] : [], [e, g]), Pe = t + r, je = u.useMemo(() => ze.length === 0 ? !0 : ze.some((Y) => {
    const de = (Y.startEpochMs ?? Y.startEpoch ?? 0) - 2e3, ve = (Y.endEpochMs ?? Y.endEpoch ?? 0) + 2e3;
    return Pe >= de && Pe <= ve;
  }), [ze, Pe]), Qe = !je && ze.length > 0, [Ue, en] = u.useState("A"), [tt, Ge] = u.useState(""), [ln, Rt] = u.useState(""), [pn, He] = u.useState(""), [vt, Cn] = u.useState(null), [gt, Nt] = u.useState(!1), [En, kt] = u.useState(!1), [Tt, Wt] = u.useState(() => {
    if (!T) return null;
    const Y = Math.round(t + r);
    return In.get(T, Y, ae) || null;
  }), [Qt, cn] = u.useState(null), Ln = Ue === "A" ? S : x, Se = u.useCallback(() => {
    const Y = ul();
    S.current && (S.current.volume = Y.volume, S.current.muted = Ue !== "A" || Y.isMuted, S.current.defaultPlaybackRate = a, S.current.playbackRate = a, Ue === "A" && !Y.isMuted && Si(S.current)), x.current && (x.current.volume = Y.volume, x.current.muted = Ue !== "B" || Y.isMuted, x.current.defaultPlaybackRate = a, x.current.playbackRate = a, Ue === "B" && !Y.isMuted && Si(x.current)), I.current && (I.current.muted = !0, I.current.defaultPlaybackRate = a, I.current.playbackRate = a);
  }, [Ue, a]);
  u.useEffect(() => {
    const Y = (de) => {
      de.detail && (S.current && (S.current.volume = de.detail.volume), x.current && (x.current.volume = de.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", Y), () => window.removeEventListener("itb-audio-state-changed", Y);
  }, []), u.useEffect(() => {
    S.current && (S.current.defaultPlaybackRate = a, S.current.playbackRate = a), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a), I.current && (I.current.defaultPlaybackRate = a, I.current.playbackRate = a);
  }, [a]), u.useEffect(() => {
    if (!A || !T) return;
    if (o) {
      U.current = !0;
      return;
    }
    const Y = U.current;
    U.current = o;
    let de = !0;
    const ve = new AbortController(), Ee = Math.round(t + r), Xe = In.get(T, Ee, ae);
    if (Xe) {
      Wt(Xe);
      return;
    }
    const dt = setTimeout(() => {
      de && In.fetchFrame(T, Ee, ve.signal, ae).then((Ye) => {
        de && Ye && Wt(Ye);
      });
    }, Y ? 25 : 35), Ze = In.subscribe((Ye, rt, xt, at) => {
      Ye === T && rt === Ee && (!at || at === ae) && de && Wt(xt);
    });
    return () => {
      de = !1, clearTimeout(dt), ve.abort(), Ze();
    };
  }, [A, T, t, r, o, gt, ae]), u.useEffect(() => {
    if (!z || J !== "split" && J !== "pip" || !ye || o) {
      cn(null);
      return;
    }
    let Y = !0;
    const de = new AbortController(), ve = Math.round(t + r), Ee = In.get(T, ve, ye);
    if (Ee) {
      cn(Ee);
      return;
    }
    const Xe = setTimeout(() => {
      Y && In.fetchFrame(T, ve, de.signal, ye).then((dt) => {
        Y && dt && cn(dt);
      });
    }, 40), Je = In.subscribe((dt, Ze, Ye, rt) => {
      dt === T && Ze === ve && (!rt || rt === ye) && Y && cn(Ye);
    });
    return () => {
      Y = !1, clearTimeout(Xe), de.abort(), Je();
    };
  }, [z, J, ye, A, T, t, r]);
  const be = u.useCallback((Y, de = ae) => {
    const ve = Math.round(t), Ee = Math.round(t + n), Xe = Math.min(Ee, Math.max(ve, Math.round(t + Y)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(T)}&startEpoch=${ve}&endEpoch=${Ee}&seekEpoch=${Xe}&displayId=${encodeURIComponent(de)}&_t=${Date.now()}`;
  }, [t, n, T, ae]);
  u.useEffect(() => {
    if (!(!A || !T))
      if (o && je) {
        const Y = D.current;
        V.current = Y, $.current = Y, B.current = !1;
        const de = be(Y, ae);
        Nt(!1), kt(!0), en("A"), Ge(de), Rt(""), Cn(null), He((J === "split" || J === "pip") && ye ? be(Y, ye) : "");
      } else o || (se.current && clearTimeout(se.current), B.current = !1, Ge(""), Rt(""), He(""), Cn(null), Nt(!1), kt(!1), S.current && S.current.pause(), x.current && x.current.pause(), I.current && I.current.pause());
  }, [o, A, T, je, be, ae, J, ye]), u.useEffect(() => {
    if (Te.current !== ae && (Te.current = ae, o && je)) {
      const Y = D.current;
      V.current = Y;
      const de = be(Y, ae);
      Nt(!1), kt(!0), en("A"), Ge(de), Rt("");
    }
  }, [ae, o, je, be]), u.useEffect(() => {
    if (!A || !T) return;
    const Y = Math.abs(r - $.current);
    if (!o || Y < 15) {
      $.current = r;
      return;
    }
    return B.current = !0, $.current = r, V.current = r, S.current && S.current.pause(), x.current && x.current.pause(), I.current && I.current.pause(), Nt(!1), kt(!0), se.current && clearTimeout(se.current), se.current = setTimeout(() => {
      if (!je) {
        Ge(""), Rt(""), He(""), kt(!1), B.current = !1;
        return;
      }
      const de = D.current, ve = be(de, ae);
      en("A"), Ge(ve), Rt(""), Cn(null), (J === "split" || J === "pip") && ye && He(be(de, ye));
    }, 75), () => {
      se.current && clearTimeout(se.current);
    };
  }, [r, o, A, T, je, be, ae, J, ye]), u.useEffect(() => {
    if (!o || !gt || ze.length === 0) return;
    const Y = t + D.current, de = ze.map((ve) => ({
      start: ve.startEpochMs ?? ve.startEpoch ?? 0,
      end: ve.endEpochMs ?? ve.endEpoch ?? 0
    })).filter((ve) => ve.start > Y + 500).sort((ve, Ee) => ve.start - Ee.start)[0];
    if (de && (!vt || vt.start !== de.start)) {
      const ve = de.start - t;
      if (ve < v) {
        const Ee = be(ve, ae);
        Cn({ start: de.start, ms: ve }), Ue === "A" ? Rt(Ee) : Ge(Ee);
      }
    }
  }, [o, gt, r, t, v, ze, vt, Ue, be, ae]);
  const re = u.useCallback(() => {
    if (vt) {
      const Y = Ue === "A" ? "B" : "A", de = Y === "A" ? S : x;
      en(Y), V.current = vt.ms, $.current = vt.ms, Cn(null), de.current && de.current.play().then(() => {
        Se();
      }).catch(() => {
      });
    } else
      m ? l(d) : i(!1);
  }, [vt, Ue, Se, m, d, l, i]), We = u.useCallback(() => {
    const Y = Ln.current;
    if (!Y || B.current || !o || te.current) return;
    const de = Y.currentTime * 1e3, ve = Math.round(V.current + de);
    if (N && N.length > 0) {
      const Ee = t + ve, Xe = N.find((Je) => Ee >= Je.startEpochMs && Ee < Je.endEpochMs);
      if (Xe) {
        te.current = !0;
        const Je = Math.round(Xe.endEpochMs - t) + 10;
        l(Je), setTimeout(() => {
          te.current = !1;
        }, 150);
        return;
      }
    }
    if (ve >= v) {
      m ? l(d) : (i(!1), l(v));
      return;
    }
    $.current = ve, l(ve);
  }, [Ln, o, t, N, v, m, d, l, i]), Ke = En && o && !Qe;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${J} ${y}`, children: [
    z && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (Y) => Y.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "director" ? "active" : ""}`,
          onClick: () => le("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "canvas" ? "active" : ""}`,
          onClick: () => le("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "split" ? "active" : ""}`,
          onClick: () => le("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "pip" ? "active" : ""}`,
          onClick: () => le("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      L.map((Y, de) => {
        const ve = (Y.displayId ?? `mon-${de}`).toLowerCase(), Ee = Y.displayNumber ?? de + 1, Xe = Y.displayName || `Screen ${Ee}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${J === ve ? "active" : ""}`,
            onClick: () => le(ve),
            title: `Pin directly to ${Xe}`,
            children: [
              "🖥️ ",
              Ee
            ]
          },
          ve
        );
      }),
      J === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          L.map((Y, de) => {
            const ve = (Y.displayId ?? `mon-${de}`).toLowerCase(), Ee = Y.displayNumber ?? de + 1, Xe = Y.displayName || `Screen ${Ee}`, Je = ae === ve;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${Je ? "active" : ""} ${Q && Je ? "is-override" : ""}`,
                onClick: () => {
                  P == null || P(A, t + r, ve);
                },
                title: `Punch ${Xe} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ee
                  ] }),
                  Je && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: Q ? "✋" : "⚡" })
                ]
              },
              `punch-${ve}`
            );
          }),
          Q && k && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                k == null || k(A, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    z && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${Q ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: J === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : J === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : J === "pip" ? `🪟 PiP MODE: ${Be.toUpperCase()} (HERO)` : `${Q ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${Be.toUpperCase()}` }),
      Q && J === "director" && k && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => k == null ? void 0 : k(A, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    tt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: S,
        src: tt,
        className: "feed-video-element",
        style: {
          opacity: gt && Ue === "A" ? 1 : 0,
          zIndex: Ue === "A" ? 3 : 1,
          pointerEvents: Ue === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Ue === "A",
        preload: "auto",
        muted: Ue !== "A" || ul().isMuted,
        onCanPlay: () => {
          Se(), o && Ue === "A" && S.current && S.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "A" && (B.current = !1, Nt(!0), kt(!1), S.current && (S.current.defaultPlaybackRate = a, S.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "A" && kt(!0);
        },
        onTimeUpdate: () => {
          var Y;
          Ue === "A" && (!gt && ((Y = S.current) == null ? void 0 : Y.currentTime) > 0 && (B.current = !1, Nt(!0), kt(!1), S.current && (S.current.defaultPlaybackRate = a, S.current.playbackRate = a)), We());
        },
        onError: () => {
          Ue === "A" && (B.current = !1, kt(!1), Nt(!1));
        },
        onEnded: () => {
          Ue === "A" && re();
        }
      }
    ),
    ln && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: x,
        src: ln,
        className: "feed-video-element",
        style: {
          opacity: gt && Ue === "B" ? 1 : 0,
          zIndex: Ue === "B" ? 3 : 1,
          pointerEvents: Ue === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Ue === "B",
        preload: "auto",
        muted: Ue !== "B" || ul().isMuted,
        onCanPlay: () => {
          Se(), o && Ue === "B" && x.current && x.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "B" && (B.current = !1, Nt(!0), kt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "B" && kt(!0);
        },
        onTimeUpdate: () => {
          var Y;
          Ue === "B" && (!gt && ((Y = x.current) == null ? void 0 : Y.currentTime) > 0 && (B.current = !1, Nt(!0), kt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a)), We());
        },
        onError: () => {
          Ue === "B" && (B.current = !1, kt(!1), Nt(!1));
        },
        onEnded: () => {
          Ue === "B" && re();
        }
      }
    ),
    J !== "split" && J !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: gt ? 0 : 2 },
        children: Qe ? /* @__PURE__ */ s.jsx(mp, { isPlaying: o }) : Tt && Tt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Tt,
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
    J === "split" && z && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Tt && Tt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Tt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        Qt && Qt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Qt, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    J === "pip" && z && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (Y) => {
          Y.stopPropagation(), he((de) => !de);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              X.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          Qt && Qt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Qt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (J === "canvas" || J === "all-displays") && z && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: we, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: Ie.width ? `${Ie.width}px` : "92%",
            height: Ie.height ? `${Ie.height}px` : "auto",
            aspectRatio: `${De.totalWidth} / ${De.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: L.map((Y, de) => {
            const ve = Cx(Y, De), Ee = (Y.displayId ?? Y.DisplayId ?? `mon-${de}`).toLowerCase(), Xe = fe[Ee] || (Ee === ae ? Tt : null), Je = !!(Y.isPrimary ?? Y.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${Je ? "is-primary" : ""}`,
                style: {
                  left: `${ve.leftPct}%`,
                  top: `${ve.topPct}%`,
                  width: `${ve.widthPct}%`,
                  height: `${ve.heightPct}%`
                },
                onClick: (dt) => {
                  dt.stopPropagation(), M ? M(Ee) : le(Ee);
                },
                title: `Display ${de + 1} (${Y.width || 1920}x${Y.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      Je ? "★ " : "",
                      "🖥 ",
                      de + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: Y.displayName || Y.DisplayName || Ee.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      Y.width || 1920,
                      "x",
                      Y.height || 1080
                    ] }),
                    M && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (dt) => {
                          dt.stopPropagation(), M(Ee);
                        },
                        title: `Open Display ${de + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Xe && Xe !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Xe,
                      className: "canvas-frame-img",
                      alt: Ee
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      Y.displayName || Ee.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Ee
            );
          })
        }
      )
    ] }),
    Ke && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          T,
          " • ",
          ae.toUpperCase()
        ] })
      ] })
    ] }) }),
    J === "director" && Z && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        ae.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        yt(Z.startEpochMs ?? Z.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        yt(Z.endEpochMs ?? Z.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    z && J !== "canvas" && /* @__PURE__ */ s.jsx(
      wx,
      {
        displays: L,
        activeDisplayId: ae,
        mode: Q ? "MANUAL" : "AUTO",
        activeTimeRange: Z ? `${yt(Z.startEpochMs ?? Z.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${yt(Z.endEpochMs ?? Z.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (Y) => {
          P && P(A, t + r, Y), le(Y);
        }
      }
    ),
    C && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      T
    ] }) })
  ] });
}
const Ea = 2200, Sa = 400;
function Sx({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], v = d.epochMs + qo, m = e - v;
      if (m >= 0 && m <= Ea)
        return {
          ...d,
          elapsed: m
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let i = 1;
  if (o.elapsed > Ea - Sa) {
    const c = (o.elapsed - (Ea - Sa)) / Sa;
    i = Math.max(0, 1 - c);
  }
  if (i <= 0.05) return null;
  if (r === "CAPTION") {
    const c = yp(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const a = xp(o.keyCombination);
  return a.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: a.map((c, d) => /* @__PURE__ */ s.jsxs(fo.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < a.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const bx = [
  {
    title: "PLAYBACK & TRANSPORT",
    shortcuts: [
      { keys: ["Space"], desc: "Toggle timeline Play / Pause" },
      { keys: ["↑", "↓"], desc: "Select previous / next station in timeline" },
      { keys: ["←", "→"], desc: "Adaptive step by zoom level (down to 1 frame)" },
      { keys: ["Ctrl", "+", "← / →"], desc: "Single frame step precision (1 Frame / 33ms)" },
      { keys: ["Shift", "+", "← / →"], desc: "Fast jump 5 seconds backward / forward" },
      { keys: ["Home", "End"], desc: "Jump playhead directly to In / Out point" }
    ]
  },
  {
    title: "MARKING & SMART CUT",
    shortcuts: [
      { keys: ["I"], desc: "Set Mark In boundary at current playhead" },
      { keys: ["O"], desc: "Set Mark Out boundary at current playhead" },
      { keys: ["Ctrl", "+", "E"], desc: "Export selected cut range directly" }
    ]
  },
  {
    title: "TIMELINE & MOUSE GESTURES",
    shortcuts: [
      { keys: ["Scroll Up / Down"], desc: "Zoom In / Zoom Out centered at mouse cursor" },
      { keys: ["Ctrl / Shift", "+", "Scroll"], desc: "Horizontal timeline scrub / pan left & right" },
      { keys: ["Timeline Click"], desc: "Seek playhead directly to clicked timestamp" }
    ]
  },
  {
    title: "GENERAL & NAVIGATION",
    shortcuts: [
      { keys: ["?"], desc: "Toggle this shortcuts reference dialog" },
      { keys: ["Esc"], desc: "Close modals, drawers, or exit solo inspector" }
    ]
  }
];
function jp({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? Fs.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: bx.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
        /* @__PURE__ */ s.jsx("h4", { className: "group-title", children: n.title }),
        /* @__PURE__ */ s.jsx("div", { className: "group-items-list", children: n.shortcuts.map((l, o) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-row", children: [
          /* @__PURE__ */ s.jsx("div", { className: "keys-cluster", children: l.keys.map((i, a) => i === "or" || i === "+" || i === "← / →" ? /* @__PURE__ */ s.jsx("span", { className: "key-separator", children: i }, a) : /* @__PURE__ */ s.jsx("kbd", { className: "tactical-kbd", children: i }, a)) }),
          /* @__PURE__ */ s.jsx("span", { className: "shortcut-desc", children: l.desc })
        ] }, o)) })
      ] }, r)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("span", { className: "footer-hint", children: "💡 Pro-Tip: Hardware-code mapped (I/O) ensures flawless marking across Hebrew & English keyboard layouts." }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-got-it", onClick: t, children: "GOT IT" })
      ] })
    ] }) }),
    document.body
  ) : null;
}
const Yd = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), i = r % 60, a = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(i)}.${c(a)}`;
};
function Mx({
  isOpen: e,
  station: t,
  initialDisplayId: n = null,
  allStations: r = [],
  onSelectStation: l,
  onClose: o,
  baseEpochMs: i = 0,
  timeMode: a = "LOCAL",
  totalDurationMs: c = 36e5,
  zoomLevel: d = 1,
  onZoomChange: v,
  onZoomReset: m,
  onFitRange: g,
  onJumpViewportTo: N,
  viewportStartMs: C = 0,
  onViewportStartChange: b,
  playheadMs: P = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: p,
  inPointMs: h = 0,
  setInPointMs: M,
  outPointMs: E = 36e5,
  setOutPointMs: j,
  recordingSegments: y = {},
  globalGaps: S = [],
  onExport: x,
  isPlaying: I,
  setIsPlaying: D,
  isLooping: V = !0,
  setIsLooping: $,
  playbackSpeed: B,
  setPlaybackSpeed: se,
  keystrokeMode: U = "BURN_IN",
  onChangeKeystrokeMode: te,
  keystrokes: A = [],
  showRulerKeystrokes: T = !1,
  onToggleRulerKeystrokes: L,
  directorPlan: z,
  onOverrideDisplay: F,
  onSplitDirectorSegment: ce,
  onChangeDirectorSegmentDisplay: q,
  onResetDirectorSegmentToAuto: J
}) {
  var Qt, cn, Ln;
  const [le, Fe] = u.useState(!1), H = I !== void 0 ? I : le, ne = u.useCallback((Se) => {
    const be = typeof Se == "function" ? Se(H) : Se;
    D ? D(be) : Fe(be), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: be } }));
  }, [H, D]), [he, Z] = u.useState(!0), ae = V !== void 0 ? V : he, ye = $ || Z, [Be, X] = u.useState(1), Q = B !== void 0 ? B : Be, fe = se || X, [ge, we] = u.useState(null), [Ie, ie] = u.useState(!1), [De, ke] = u.useState(S), Te = ((Qt = t == null ? void 0 : t.displays) == null ? void 0 : Qt.length) > 1 || ((Ln = (cn = t == null ? void 0 : t.topology) == null ? void 0 : cn.displays) == null ? void 0 : Ln.length) > 1, [ze, Pe] = u.useState(() => {
    if (!Te) return "mon-0";
    if (n) return n;
    try {
      const Se = localStorage.getItem("itb_spotlight_viewmode");
      if (Se) return Se;
    } catch {
    }
    return "canvas";
  }), je = u.useCallback((Se) => {
    Pe((be) => {
      const re = typeof Se == "function" ? Se(be) : Se;
      try {
        localStorage.setItem("itb_spotlight_viewmode", re);
      } catch {
      }
      return re;
    });
  }, []), [Qe, Ue] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!Te) {
        Pe("mon-0");
        return;
      }
      if (n)
        Pe(n);
      else
        try {
          const Se = localStorage.getItem("itb_spotlight_viewmode");
          Pe(Se || "canvas");
        } catch {
          Pe("canvas");
        }
    }
  }, [e, n, Te, t == null ? void 0 : t.id]);
  const en = u.useRef(null), tt = u.useRef(d);
  tt.current = d;
  const Ge = u.useRef(C);
  Ge.current = C;
  const ln = u.useRef(c);
  ln.current = c;
  const Rt = u.useRef(t && t.id);
  u.useEffect(() => {
    var Se, be, re;
    t && t.id && Rt.current !== t.id && (Rt.current = t.id, fe(1), ((Se = t.displays) == null ? void 0 : Se.length) > 1 || ((re = (be = t.topology) == null ? void 0 : be.displays) == null ? void 0 : re.length) > 1 || je("mon-0"));
  }, [t, fe]);
  const pn = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Se = en.current;
    if (!Se || !v || !b) return;
    const be = (re) => {
      re.preventDefault(), re.stopPropagation();
      const We = re.ctrlKey || re.shiftKey, Ke = tt.current, Y = Ge.current, de = ln.current || 36e5;
      if (We) {
        const ve = Math.abs(re.deltaX) > Math.abs(re.deltaY) ? re.deltaX : re.deltaY;
        if (ve === 0) return;
        const Ee = de / Ke, Xe = Math.max(0, de - Ee), Je = Ee * 0.08 * (ve > 0 ? 1 : -1), dt = Math.max(0, Math.min(Xe, Y + Je));
        Ge.current = dt, b(dt);
      } else {
        if (re.deltaY === 0) return;
        const Ee = re.deltaY < 0 ? 1.25 : 0.8, Xe = Se.getBoundingClientRect(), Je = Xe.left + 150, dt = Xe.right - 58, Ze = Math.max(100, dt - Je);
        let Ye = 0.5;
        re.clientX >= Je && re.clientX <= dt ? Ye = (re.clientX - Je) / Ze : Xe.width > 0 && (Ye = Math.max(0, Math.min(1, (re.clientX - Xe.left) / Xe.width)));
        const rt = Math.max(32, de / 2e3), xt = Math.max(1, Math.min(rt, Math.round(Ke * Ee * 100) / 100));
        if (xt === Ke) return;
        const at = de / Ke, $t = de / xt, Yt = Y + Ye * at - Ye * $t, ps = Math.max(0, de - $t), Jn = Math.max(0, Math.min(ps, Yt));
        tt.current = xt, Ge.current = Jn, b(Jn), v(xt);
      }
    };
    return Se.addEventListener("wheel", be, { passive: !1, capture: !0 }), () => Se.removeEventListener("wheel", be, { capture: !0 });
  }, [e, t, v, b]);
  const He = u.useCallback(() => {
    m ? m() : (Ge.current = 0, tt.current = 1, b == null || b(0), v == null || v(1));
  }, [m, b, v]), vt = u.useCallback((Se, be) => {
    if (g)
      g(Se, be);
    else {
      const re = Math.max(1e3, be - Se), We = Math.max(500, re * 0.05), Ke = Math.max(0, Se - We), de = Math.min(c, be + We) - Ke, ve = Math.max(32, c / 2e3), Ee = Math.max(1, Math.min(ve, Number((c / de).toFixed(1)))), Xe = c / Ee, Je = Math.max(0, Math.min(Ke, c - Xe));
      Ge.current = Je, tt.current = Ee, b == null || b(Je), v == null || v(Ee);
    }
  }, [g, c, b, v]), Cn = u.useCallback((Se, be = "center") => {
    if (N)
      N(Se, be);
    else {
      if (Se == null) return;
      const re = tt.current || 1, We = c / Math.max(1, re), Ke = be === "start" ? We / 4 : We * 0.75, Y = Math.max(0, Math.min(Se - Ke, c - We));
      Ge.current = Y, b == null || b(Y);
    }
  }, [N, c, b]), gt = u.useCallback(() => {
    ne((Se) => !Se);
  }, [ne]), Nt = u.useCallback(async () => {
    var We;
    if (!t || Math.abs(E - h) < 1e3) return;
    const Se = (U || "NONE").toUpperCase().replace("-", "_");
    let be;
    Se === "NONE" || Se === "OFF" ? be = "None" : Se === "CAPTION" ? be = "Caption" : be = "BurnIn";
    const re = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: i + Math.round(h),
      outEpochMs: i + Math.round(E),
      keystrokeMode: be,
      layoutMode: Te ? ze : "mon-0",
      targetDisplayId: !Te || ze === "mon-0" || ze === "mon-1" || ze.startsWith("mon-") ? Te ? ze : "mon-0" : null,
      isPipSwapped: Qe,
      directorSegments: Te ? (z == null ? void 0 : z.segments) || ((We = t == null ? void 0 : t.directorPlan) == null ? void 0 : We.segments) || [] : []
    };
    try {
      x ? await x(re) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(re)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(re)
      });
    } catch (Ke) {
      console.warn("[SoloSpotlightModal] Export trigger error:", Ke);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, h, E, i, x, U, ze, Qe, z]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Se = (be) => {
      if ((be.ctrlKey || be.metaKey) && (be.key === "e" || be.key === "E")) {
        be.preventDefault(), Nt();
        return;
      }
      if (be.key === "?" || be.shiftKey && be.code === "Slash") {
        be.preventDefault(), ie((re) => !re);
        return;
      }
      if (Ie) {
        be.key === "Escape" && ie(!1);
        return;
      }
      if (be.key === "Escape" || be.code === "Escape") {
        be.preventDefault(), be.stopPropagation(), o == null || o();
        return;
      }
      if (be.code === "Space") {
        be.preventDefault(), gt();
        return;
      }
      if (be.code === "KeyI") {
        be.preventDefault(), M(Math.max(0, Math.min(P, E - 1e3)));
        return;
      }
      if (be.code === "KeyO") {
        be.preventDefault(), j(Math.min(c, Math.max(P, h + 1e3)));
        return;
      }
      if (be.code === "ArrowLeft" || be.code === "ArrowRight") {
        be.preventDefault(), ne(!1);
        const re = be.code === "ArrowLeft";
        let We;
        if (be.ctrlKey || be.metaKey)
          We = 33;
        else if (be.shiftKey)
          We = 5e3;
        else {
          const Ke = Math.max(1, d);
          We = Math.max(33, Math.round(1e3 / Ke));
        }
        p((Ke) => {
          const Y = re ? Ke - We : Ke + We;
          return Math.max(0, Math.min(c, Y));
        });
        return;
      }
      if (be.key === "ArrowDown") {
        be.preventDefault();
        const re = r.findIndex((We) => We.id === t.id);
        if (re !== -1) {
          const We = (re + 1) % r.length;
          l(r[We].id);
        }
        return;
      }
      if (be.key === "ArrowUp") {
        be.preventDefault();
        const re = r.findIndex((We) => We.id === t.id);
        if (re !== -1) {
          const We = (re - 1 + r.length) % r.length;
          l(r[We].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Se, { capture: !0 }), () => window.removeEventListener("keydown", Se, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    P,
    h,
    E,
    c,
    d,
    M,
    j,
    p,
    Nt,
    gt,
    ne,
    Ie
  ]);
  const En = r.findIndex((Se) => Se.id === (t && t.id)), kt = r[En - 1], Tt = r[En + 1];
  if (!e || !t) return null;
  const Wt = k > 0 ? k : Math.round(i + P);
  return Fs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      ge && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${ge.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          ge.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          ge.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          ge.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: ge.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Yd(E - h),
            " (",
            yt(i + h, a),
            " → ",
            yt(i + E, a),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Ex,
          {
            station: t,
            baseEpochMs: i,
            totalDurationMs: c,
            playheadMs: P,
            setPlayheadMs: p,
            isPlaying: H,
            setIsPlaying: ne,
            playbackSpeed: Q,
            timeMode: a,
            inPointMs: h,
            outPointMs: E,
            isLooping: ae,
            recordingSegments: y,
            globalGaps: De,
            showWatermark: !0,
            directorPlan: z || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: F,
            onResetOverride: J,
            viewMode: ze,
            onViewModeChange: je,
            isPipSwapped: Qe,
            onPipSwapChange: Ue
          }
        ),
        /* @__PURE__ */ s.jsx(
          Sx,
          {
            currentEpochMs: Wt,
            keystrokes: A,
            keystrokeMode: U
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
              onClick: (Se) => {
                Se.preventDefault(), Se.stopPropagation(), o == null || o();
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
              onClick: () => ie(!0),
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
              disabled: !kt,
              onClick: () => kt && l(kt.id),
              title: kt ? `Previous: ${kt.displayName || kt.roleAlias || kt.hostname || kt.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            En + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !Tt,
              onClick: () => Tt && l(Tt.id),
              title: Tt ? `Next: ${Tt.displayName || Tt.roleAlias || Tt.hostname || Tt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${H ? "is-playing-dimmed" : ""}`, ref: en, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Yd(E - h) })
            ] }),
            (() => {
              const Se = ze === "mon-0" ? "SCREEN 1" : ze === "mon-1" ? "SCREEN 2" : ze.startsWith("mon-") ? `SCREEN ${parseInt(ze.slice(4)) + 1}` : ze.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: Nt,
                  title: `Export Selected Cut Window as ${Se} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: ze === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Se})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            gp,
            {
              activeStationId: t.id,
              isPlaying: H,
              setIsPlaying: gt,
              isLooping: ae,
              setIsLooping: ye,
              playbackSpeed: Q,
              onChangeSpeed: fe,
              baseEpochMs: i,
              timeMode: a,
              totalDurationMs: c,
              inPointMs: h,
              setInPointMs: M,
              outPointMs: E,
              setOutPointMs: j,
              onSetInPoint: () => M(Math.max(0, Math.min(P, E - 1e3))),
              onSetOutPoint: () => j(Math.min(c, Math.max(P, h + 1e3))),
              onStepFrameBackward: () => {
                ne(!1), p((Se) => Math.max(0, Se - 33));
              },
              onStepFrameForward: () => {
                ne(!1), p((Se) => Math.min(c, Se + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: yt(i + P, a) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Np,
          {
            stations: pn,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: i,
            timeMode: a,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: v,
            onZoomReset: He,
            onFitRange: vt,
            onJumpViewportTo: Cn,
            viewportStartMs: C,
            onViewportStartChange: b,
            playheadMs: P,
            setPlayheadMs: (Se) => {
              ne(!1), p(Se);
            },
            inPointMs: h,
            setInPointMs: M,
            outPointMs: E,
            setOutPointMs: j,
            recordingSegments: y,
            onExport: Nt,
            onEstimateLoaded: (Se) => {
              Se != null && Se.removedGlobalGaps && ke(Se.removedGlobalGaps);
            },
            keystrokeMode: U,
            onChangeKeystrokeMode: te,
            keystrokes: A,
            showKeystrokes: T,
            showRulerKeystrokes: T,
            onToggleRulerKeystrokes: L,
            onSplitDirectorSegment: ce,
            onChangeDirectorSegmentDisplay: q,
            onResetDirectorSegmentToAuto: J
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        jp,
        {
          isOpen: Ie,
          onClose: () => ie(!1)
        }
      )
    ] }),
    document.body
  );
}
function Cp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), i = u.useRef(!1), a = u.useRef(0), [c, d] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [v, m] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), g = u.useCallback(async () => {
    if (!i.current && !(typeof document < "u" && document.hidden)) {
      i.current = !0;
      try {
        let y = await fetch("/api/v1/extractor-advanced/jobs");
        if (y.ok || (y = await fetch("/api/v1/extractor/jobs")), y.ok) {
          a.current = 0;
          const S = await y.json(), x = Array.isArray(S) ? S : [];
          n(x), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: x }));
        } else
          a.current++;
      } catch (y) {
        a.current++, a.current <= 2 && console.warn("[ExportJobMonitor] Polling error:", y);
      } finally {
        i.current = !1;
      }
    }
  }, []);
  u.useEffect(() => {
    let y = !0, S = null;
    const x = () => {
      if (!y) return;
      let D = 2500;
      typeof document < "u" && document.hidden ? D = 3e4 : a.current > 0 && (D = Math.min(3e4, 2500 * Math.pow(2, Math.min(a.current, 4)))), S = setTimeout(async () => {
        await g(), x();
      }, D);
    }, I = () => {
      !document.hidden && y && (clearTimeout(S), a.current = 0, g().then(x));
    };
    return document.addEventListener("visibilitychange", I), g().then(x), () => {
      y = !1, clearTimeout(S), document.removeEventListener("visibilitychange", I);
    };
  }, [g]), u.useEffect(() => {
    const y = () => {
      m(!0), g();
    };
    return window.addEventListener("open-export-monitor", y), () => window.removeEventListener("open-export-monitor", y);
  }, [g]), u.useEffect(() => {
    if (!v || c) return;
    const y = (S) => {
      o.current && !o.current.contains(S.target) && !S.target.closest(".export-floating-hud") && m(!1);
    };
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [v, c]);
  const N = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && N)
    return null;
  const C = t.filter((y) => y.status === "Processing" || y.status === "Queued"), b = t.filter((y) => y.status === "Completed" || y.isCompleted), P = () => {
    d((y) => {
      const S = !y;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(S));
      } catch {
      }
      return S;
    });
  }, k = () => {
    m(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, p = (y, S) => {
    S.stopPropagation(), !(!y || r.has(y)) && (l((x) => new Set(x).add(y)), setTimeout(() => {
      n((x) => {
        const I = x.filter((D) => (D.jobId || D.id) !== y);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: I })), I;
      }), l((x) => {
        const I = new Set(x);
        return I.delete(y), I;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${y}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${y}`, { method: "DELETE" })).catch((x) => console.warn("[ExportJobMonitor] Dismiss failed:", x)));
  }, h = async (y, S) => {
    S.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${y}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${y}/bookmark`, { method: "POST" })), g();
    } catch (x) {
      console.warn("[ExportJobMonitor] Bookmark failed:", x);
    }
  }, M = (y, S) => {
    S.stopPropagation();
    const x = y.networkFolderPath || (y.outputFilePath ? y.outputFilePath.substring(0, y.outputFilePath.lastIndexOf("\\")) : "");
    x && (navigator.clipboard.writeText(x), alert(`UNC Directory Path copied to clipboard:
${x}`));
  }, E = (y) => {
    const S = y.jobId || y.id, x = `/api/v1/extractor-advanced/jobs/${S}/download`, I = document.createElement("a");
    I.href = x, I.download = y.fileName || `archive_${S}.tar`, document.body.appendChild(I), I.click(), document.body.removeChild(I), setTimeout(g, 1e3);
  }, j = (y) => {
    if (!y || y <= 0) return "0 B";
    const S = y / (1024 * 1024);
    return S >= 1e3 ? `${(S / 1024).toFixed(2)} GB` : `${S.toFixed(1)} MB`;
  };
  return t.length === 0 && !v ? null : Fs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !v && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${C.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => m(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${C.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: C.length > 0 ? `EXPORTS: ${C.length} PACKAGING` : `${b.length} ARCHIVE${b.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${C.length > 0 ? "" : "ready"}`, children: C.length > 0 ? `${C[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      v && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && m(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (y) => y.stopPropagation(), children: [
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
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: k, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((y) => {
          const S = y.status === "Completed" || y.isCompleted, x = y.status === "Failed" || y.isFailed, I = y.status === "Processing" || y.status === "Queued", D = y.jobId || y.id, V = r.has(D), $ = S ? 100 : Math.round(y.progressPercent || y.progressPercentage || y.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${y.status.toLowerCase()} ${y.isBookmarked ? "is-bookmarked" : ""} ${V ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${y.status.toLowerCase()}`, children: S ? "READY" : y.status }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: y.fileName, children: y.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (B) => p(D, B),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                I && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: y.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      $,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, $)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      j(y.fileSizeBytes)
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "telemetry-tags", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "speed", children: y.speedMBps > 0 ? `${y.speedMBps.toFixed(1)} MB/s` : "Analyzing" }),
                      y.estimatedSecondsRemaining > 0 && /* @__PURE__ */ s.jsxs("span", { className: "eta", children: [
                        "ETA ~",
                        Math.ceil(y.estimatedSecondsRemaining),
                        "s"
                      ] })
                    ] })
                  ] })
                ] }),
                S && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: j(y.fileSizeBytes) })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "DOWNLOADS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val", children: [
                      "📥 ",
                      y.downloadCount || 0
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "COMPLETED" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val", children: y.completedAtUtc ? new Date(y.completedAtUtc).toLocaleTimeString() : "--:--" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "RETENTION" }),
                    /* @__PURE__ */ s.jsx("span", { className: `val policy-tag ${y.isBookmarked ? "pinned" : ""}`, children: y.isBookmarked ? "★ PINNED" : "24H PURGE" })
                  ] })
                ] }),
                S && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${y.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (B) => h(D, B),
                        title: y.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: y.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (B) => M(y, B),
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
                      onClick: () => E(y),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                x && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  y.errorMessage || y.error || "Export failed"
                ] }) })
              ]
            },
            D
          );
        }) })
      ] }) })
    ] }),
    document.body
  );
}
function Ix({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const l = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const d = (m) => {
      m.key === "Escape" && (t == null || t());
    }, v = (m) => {
      l.current && !l.current.contains(m.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", v), window.addEventListener("keydown", d), () => {
      window.removeEventListener("mousedown", v), window.removeEventListener("keydown", d);
    };
  }, [e, t]), !e || !e.station) return null;
  const { x: o, y: i, station: a } = e, c = a.displayName || a.hostname || a.name || a.id;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: l,
      className: "station-context-menu-root",
      style: { top: `${i}px`, left: `${o}px` },
      onClick: (d) => d.stopPropagation(),
      onContextMenu: (d) => d.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "station-title", title: c, children: c }),
          /* @__PURE__ */ s.jsx("span", { className: "station-sub", children: a.hostname && c.toLowerCase() !== a.hostname.toLowerCase() ? `HOST: ${a.hostname}` : a.ipAddress || (a.isOnline ? "ONLINE" : "ACTIVE CHANNEL") })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "menu-divider" }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "menu-action-item deselect-action",
            onClick: () => {
              n == null || n(a.id), t == null || t();
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
              r == null || r(a.id), t == null || t();
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
function Tx({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 1920, i = r.canvasHeight || 1080, a = o / i;
  let c;
  Math.abs(a - 32 / 9) < 0.15 ? c = "32:9 Dual Screen" : Math.abs(a - 21 / 9) < 0.15 ? c = "21:9 Ultrawide" : Math.abs(a - 16 / 10) < 0.15 ? c = "16:10 WUXGA" : Math.abs(a - 4 / 3) < 0.15 ? c = "4:3 Standard" : Math.abs(a - 16 / 9) < 0.15 ? c = "16:9 Broadcast" : c = `${Math.round(a * 100) / 100}:1 Custom`;
  const d = (y) => {
    const S = Math.round(y * a);
    return S - S % 2;
  }, v = (y, S) => {
    const x = Math.round(y * S / 2073600 * 6 * 10) / 10, I = Math.round(x * 60 / 8 * 10) / 10;
    return `~${x} Mbps (~${I} MB/min)`;
  }, m = [
    {
      id: "NATIVE",
      badge: `Native 1:1 (${o}×${i})`,
      res: `${o} × ${i}`,
      bitrate: v(o, i),
      desc: "Exact 1:1 canvas match (Recommended). Preserves original recorded pixel fidelity without scaling or distortion."
    },
    {
      id: "4K",
      badge: `4K UHD (${d(2160)}×2160)`,
      res: `${d(2160)} × 2160`,
      bitrate: v(d(2160), 2160),
      desc: "Maximum resolution. Uncompromised multi-monitor canvas clarity for NOC video walls."
    },
    {
      id: "2K",
      badge: `2K QHD (${d(1440)}×1440)`,
      res: `${d(1440)} × 1440`,
      bitrate: v(d(1440), 1440),
      desc: "High pixel density. Preserves small fonts, HUD telemetry, and detailed application windows."
    },
    {
      id: "HD",
      badge: `HD 720p (${d(720)}×720)`,
      res: `${d(720)} × 720`,
      bitrate: v(d(720), 720),
      desc: "Compact file size, rapid export. Ideal for low-bandwidth operational networks or fast triage."
    }
  ], [g, N] = u.useState("BurnIn"), [C, b] = u.useState(r.resolution || "NATIVE"), [P, k] = u.useState(!1);
  if (!e) return null;
  const p = async () => {
    k(!0);
    try {
      await n(g, C), t();
    } finally {
      k(!1);
    }
  }, h = (r.layout || "DIRECTOR").toUpperCase(), M = r.stationsCount || 1, E = r.audioSegmentsCount || 1, j = m.find((y) => y.id === C) || m[0];
  return Fs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (y) => y.stopPropagation(), children: [
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
              h,
              "] (WYSIWYG ",
              c,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "CANVAS GEOMETRY:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value", children: [
              o,
              " × ",
              i,
              " (Ratio ",
              a.toFixed(2),
              ":1)"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "TARGET RESOLUTION:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value highlight", children: [
              j.res,
              " (",
              j.badge,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "ACTIVE STATIONS:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value", children: [
              M,
              " WORKSTATION",
              M > 1 ? "S" : ""
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUDIO MASTER MIX:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: E > 1 ? `DYNAMIC ROUTING (${E} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK TRANSITIONS)" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: m.map((y) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${C === y.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: y.id,
              checked: C === y.id,
              onChange: () => b(y.id)
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "quality-card-body", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "quality-card-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "quality-badge", children: y.badge }),
              /* @__PURE__ */ s.jsx("span", { className: "quality-res", children: y.res })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-metric", children: y.bitrate }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-desc", children: y.desc })
          ] })
        ] }, y.id)) }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT KEYSTROKE PRESENTATION" }),
        /* @__PURE__ */ s.jsxs("div", { className: "modes-grid", children: [
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${g === "BurnIn" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "BurnIn",
                checked: g === "BurnIn",
                onChange: () => N("BurnIn")
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "mode-content", children: [
              /* @__PURE__ */ s.jsx("div", { className: "mode-name", children: "HARD BURN-IN (IN-PLACE ON VIDEO)" }),
              /* @__PURE__ */ s.jsx("div", { className: "mode-desc", children: "Permanently bakes keystrokes directly onto the video pixels at the exact coordinate position of each screen for unalterable forensic evidence." })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${g === "None" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "None",
                checked: g === "None",
                onChange: () => N("None")
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "mode-content", children: [
              /* @__PURE__ */ s.jsx("div", { className: "mode-name", children: "NONE (CLEAN MASTER VIDEO)" }),
              /* @__PURE__ */ s.jsx("div", { className: "mode-desc", children: "Export master video cleanly without any on-screen keystroke overlays." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: P, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: p, disabled: P, children: P ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Ax(e, t, n, r, l = null) {
  const [o, i] = u.useState([]), [a, c] = u.useState({}), [d, v] = u.useState(!1), m = u.useRef(o);
  m.current = o;
  const g = u.useCallback(async () => {
    if (isNaN(e)) return;
    const b = e + t;
    v(!0);
    try {
      const P = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(b),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${P.toString()}`);
      if (k.ok) {
        const p = k.headers.get("content-type");
        if (p && p.includes("application/json")) {
          const h = await k.json(), E = (Array.isArray(h) ? h : h.stations || h.items || []).filter((j) => (j.recordingsCount || (j.segments ? j.segments.length : 0)) > 0).map((j) => {
            var y, S;
            return {
              id: String(j.id || j.stationId || j.agentId || j.hostname),
              hostname: j.hostname || "Station",
              roleAlias: j.roleAlias || null,
              roleHistory: j.roleHistory || [],
              displayName: j.displayName || j.roleAlias || j.hostname || "Station",
              isOnline: j.isOnline !== void 0 ? j.isOnline : !0,
              recordingsCount: j.recordingsCount || 0,
              segments: j.segments || [],
              displays: j.displays || j.Displays || ((y = j.displayTopology) == null ? void 0 : y.displays) || ((S = j.DisplayTopology) == null ? void 0 : S.Displays) || [],
              displayTopology: j.displayTopology || j.DisplayTopology || null,
              directorPlan: j.directorPlan || j.DirectorPlan || null,
              hasAudio: !!j.hasAudio,
              audioCodec: j.audioCodec || "",
              audioChannels: j.audioChannels || 0,
              audioLabel: j.audioLabel || (j.hasAudio ? "AAC" : "NONE"),
              width: j.width || 1920,
              height: j.height || 1080,
              fps: j.fps || 30,
              isVfr: !!j.isVfr,
              resolution: j.resolution || "1080p",
              feedSpec: j.feedSpec || "1080p • 30fps"
            };
          });
          i((j) => {
            if (!j || j.length === 0) return E;
            const y = new Map(j.map((I) => [I.id, I]));
            let S = j.length !== E.length;
            const x = E.map((I) => {
              const D = y.get(I.id);
              return D ? D.isOnline === I.isOnline && D.displayName === I.displayName && D.roleAlias === I.roleAlias && D.feedSpec === I.feedSpec && D.recordingsCount === I.recordingsCount && D.fps === I.fps ? D : (S = !0, { ...D, ...I }) : (S = !0, I);
            });
            return S ? x : j;
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
    g();
  }, [g]);
  const N = u.useMemo(() => {
    const b = /* @__PURE__ */ new Set();
    return o.forEach((P) => {
      P.id && b.add(P.id), P.hostname && b.add(P.hostname);
    }), Array.from(b).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!N || isNaN(e)) {
      c({});
      return;
    }
    let b = !0;
    return (async () => {
      try {
        const k = e + t, p = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(N)}&startEpoch=${e}&endEpoch=${k}`);
        if (p.ok && b) {
          const h = await p.json() || {}, M = {};
          (m.current || []).forEach((E) => {
            const j = h[E.id] || h[E.hostname] || h[E.displayName] || [];
            M[E.id] = j, M[E.hostname] = j;
          }), Object.keys(h).forEach((E) => {
            M[E] || (M[E] = h[E]);
          }), c(M);
        }
      } catch {
        b && c({});
      }
    })(), () => {
      b = !1;
    };
  }, [N, e, t]);
  const C = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let b = 1 / 0, P = -1 / 0;
    o.forEach((M) => {
      (a[M.id] || a[M.hostname] || M.segments || []).forEach((j) => {
        const y = j.startEpochMs ?? j.startEpoch ?? 0, S = j.endEpochMs ?? j.endEpoch ?? 0;
        y > 0 && y < b && (b = y), S > 0 && S > P && (P = S);
      });
    });
    let k = 1 / 0, p = -1 / 0;
    l && (a[l] || []).forEach((E) => {
      const j = E.startEpochMs ?? E.startEpoch ?? 0, y = E.endEpochMs ?? E.endEpoch ?? 0;
      j > 0 && j < k && (k = j), y > 0 && y > p && (p = y);
    });
    const h = (M) => M === 1 / 0 || M === -1 / 0 ? null : Math.max(0, Math.min(t, M - e));
    return {
      globalFirstMs: h(b),
      globalLastMs: h(P),
      currentFirstMs: h(k),
      currentLastMs: h(p)
    };
  }, [o, a, l, e, t]);
  return {
    allStations: o,
    setAllStations: i,
    recordingSegments: a,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: g,
    movieBoundaries: C
  };
}
function Rx({
  timelineBaseEpochMs: e,
  inPointMs: t,
  outPointMs: n,
  globalGaps: r = [],
  activeStation: l,
  spotlightStation: o,
  recordingSegments: i = {},
  initialPlayheadMs: a = 0,
  initialIsPlaying: c = !1,
  initialIsLooping: d = !0,
  initialPlaybackSpeed: v = 1,
  isGridMode: m = !1
}) {
  const [g, N] = u.useState(a), [C, b] = u.useState(c), [P, k] = u.useState(d), [p, h] = u.useState(v), M = u.useRef(null), E = u.useRef(null), j = o || l, y = u.useMemo(() => j ? i[j.id] || j.segments || [] : [], [j, i]), S = y.some((V) => {
    const $ = V.startEpochMs ?? V.startEpoch ?? 0, B = V.endEpochMs ?? V.endEpoch ?? 0, se = e + g;
    return se >= $ && se <= B;
  }), x = !!(!m && j && S);
  u.useEffect(() => {
    N((V) => V < t ? t : V > n ? (b(!1), n) : V);
  }, [t, n]);
  const I = u.useCallback((V) => {
    M.current || (M.current = V);
    const $ = (V - M.current) * p, B = Math.min($, 250 * p);
    M.current = V, N((se) => {
      let U = se + B;
      if (r && r.length > 0) {
        const te = e + U, A = r.find((T) => te >= T.startEpochMs && te < T.endEpochMs);
        A && (U = A.endEpochMs - e);
      }
      return U >= n && (P ? U = t : (b(!1), U = n)), U;
    }), C && (!x || m) && (E.current = requestAnimationFrame(I));
  }, [C, P, t, n, r, e, x, p, m]);
  u.useEffect(() => (C && (!x || m) ? (M.current = performance.now(), E.current = requestAnimationFrame(I)) : (E.current && cancelAnimationFrame(E.current), M.current = null), () => {
    E.current && cancelAnimationFrame(E.current);
  }), [C, I, x, m]);
  const D = u.useCallback(() => {
    if (C)
      b(!1);
    else {
      let V = g;
      const $ = e + V, B = r == null ? void 0 : r.find((se) => $ >= se.startEpochMs && $ < se.endEpochMs);
      if (B)
        V = B.endEpochMs - e;
      else if (j && !S) {
        const se = y.map((U) => ({ start: U.startEpochMs ?? U.startEpoch ?? 0, end: U.endEpochMs ?? U.endEpoch ?? 0 })).filter((U) => U.start > $).sort((U, te) => U.start - te.start)[0];
        se && (V = se.start - e);
      }
      V !== g && N(V), b(!0);
    }
  }, [C, g, e, r, j, S, y]);
  return {
    playheadMs: g,
    setPlayheadMs: N,
    isPlaying: C,
    setIsPlaying: b,
    isLooping: P,
    setIsLooping: k,
    playbackSpeed: p,
    setPlaybackSpeed: h,
    togglePlaySmart: D
  };
}
function $x(e) {
  return 1 - Math.pow(1 - e, 3);
}
function Lx({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [i, a] = u.useState(r), c = u.useRef(null), d = u.useRef(i);
  d.current = i;
  const v = u.useRef(l);
  v.current = l;
  const m = u.useRef(t);
  m.current = t;
  const g = Math.max(32, t / 2e3), N = t / l, C = u.useCallback((p, h = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const M = d.current, E = p - M;
    if (Math.abs(E) < 1) return;
    const j = performance.now(), y = (S) => {
      const x = S - j, I = Math.min(1, x / h);
      a(Math.round(M + E * $x(I))), I < 1 ? c.current = requestAnimationFrame(y) : c.current = null;
    };
    c.current = requestAnimationFrame(y);
  }, []), b = u.useCallback((p, h) => {
    const M = Math.max(1e3, h - p), E = Math.max(500, M * 0.05), j = Math.max(0, p - E), S = Math.min(t, h + E) - j, x = Math.max(1, Math.min(g, Number((t / S).toFixed(1)))), I = t / x, D = Math.max(0, Math.min(j, t - I));
    C(D), o(x);
  }, [t, g, C]), P = u.useCallback(() => {
    C(0), o(1);
  }, [C]), k = u.useCallback((p, h = "center") => {
    if (p == null) return;
    const M = h === "start" ? N / 4 : N * 0.75, E = Math.max(0, Math.min(p - M, t - N));
    C(E);
  }, [N, t, C]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let p = null;
    const h = (E) => {
      if (E.defaultPrevented) return;
      E.preventDefault(), E.stopPropagation();
      const j = E.ctrlKey || E.shiftKey, y = v.current, S = d.current, x = m.current;
      if (j) {
        const I = Math.abs(E.deltaX) > Math.abs(E.deltaY) ? E.deltaX : E.deltaY;
        if (I === 0) return;
        const D = x / Math.max(1, y), V = Math.max(0, x - D), $ = D * 0.08 * (I > 0 ? 1 : -1);
        a((B) => Math.max(0, Math.min(V, B + $)));
      } else {
        if (E.deltaY === 0) return;
        const D = E.deltaY < 0 ? 1.25 : 0.8, V = Math.max(32, x / 2e3), $ = p ? p.getBoundingClientRect() : { left: 0, width: window.innerWidth }, B = Math.max(0, Math.min($.width, E.clientX - $.left)), se = $.width > 0 ? B / $.width : 0.5;
        o((U) => {
          const te = Math.max(1, Math.min(V, Math.round(U * D * 100) / 100));
          if (te === U) return U;
          const A = x / U, T = x / te, z = S + se * A - se * T, F = Math.max(0, x - T);
          return a(Math.max(0, Math.min(F, z))), te;
        });
      }
    }, M = () => {
      const E = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return E && !p ? (p = E, p.addEventListener("wheel", h, { passive: !1, capture: !0 }), !0) : !!p;
    };
    if (!M()) {
      const E = setInterval(() => {
        M() && clearInterval(E);
      }, 100);
      return () => {
        clearInterval(E), p && p.removeEventListener("wheel", h, { capture: !0 });
      };
    }
    return () => {
      p && p.removeEventListener("wheel", h, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: i,
    setViewportStartMs: a,
    viewportDurationMs: N,
    animateViewportTo: C,
    fitRange: b,
    resetZoom: P,
    jumpViewportTo: k
  };
}
function Ox({
  activeStationId: e,
  spotlightStationId: t,
  timelineStations: n = [],
  selectedStationIdsCount: r = 0,
  onSelectActiveStation: l,
  setPlaybackSpeed: o,
  playheadMs: i,
  setPlayheadMs: a,
  inPointMs: c,
  setInPointMs: d,
  outPointMs: v,
  setOutPointMs: m,
  totalTimelineDurationMs: g,
  zoomLevel: N = 1,
  togglePlaySmart: C,
  onToggleHelpModal: b,
  onSplitDirectorAtPlayhead: P,
  isModalActive: k = !1
}) {
  u.useEffect(() => {
    const p = (h) => {
      const M = h.target;
      if (!(M.tagName === "INPUT" || M.tagName === "TEXTAREA" || M.tagName === "SELECT" || M.isContentEditable || M.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), b == null || b();
          return;
        }
        if (!(k || t)) {
          if (h.code === "KeyI") {
            h.preventDefault(), d(Math.max(0, Math.min(i, v - 1e3)));
            return;
          }
          if (h.code === "KeyO") {
            h.preventDefault(), m(Math.min(g, Math.max(i, c + 1e3)));
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
            if (h.preventDefault(), !e && !t && r > 1) return;
            C();
            return;
          }
          if (h.key === "Home") {
            h.preventDefault(), a(c);
            return;
          }
          if (h.key === "End") {
            h.preventDefault(), a(v);
            return;
          }
          if (h.code === "ArrowLeft" || h.code === "ArrowRight") {
            h.preventDefault();
            const j = h.code === "ArrowLeft";
            let y;
            if (h.ctrlKey || h.metaKey)
              y = 33;
            else if (h.shiftKey)
              y = 5e3;
            else {
              const S = Math.max(1, N);
              y = Math.max(33, Math.round(1e3 / S));
            }
            a((S) => {
              const x = j ? S - y : S + y;
              return Math.max(0, Math.min(g, x));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const j = n.findIndex((y) => y.id === e);
            if (j === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const y = (j + 1) % n.length;
              l(n[y].id), o(1);
            } else {
              const y = (j - 1 + n.length) % n.length;
              l(n[y].id), o(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", p, { capture: !0 }), () => window.removeEventListener("keydown", p, { capture: !0 });
  }, [
    e,
    t,
    n,
    r,
    l,
    o,
    i,
    a,
    c,
    d,
    v,
    m,
    g,
    N,
    C,
    b,
    P,
    k
  ]);
}
const Gd = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = Dd(n, e), l = Dd(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, $l = (e, t = null, n = "LOCAL") => {
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
    const c = o.substring(0, 8), d = vc(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const i = r.replace(" ", "T"), a = new Date(i).getTime();
  return isNaN(a) ? Date.now() : a;
};
function Dx() {
  var mn, wl;
  const e = u.useMemo(() => xg() || {}, []), [t, n] = u.useState(() => {
    var O, oe;
    return (O = e.timeRange) != null && O.startEpochMs && ((oe = e.timeRange) != null && oe.endEpochMs) ? e.timeRange : Gd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, i] = u.useState(e.keystrokeMode || "BURN_IN"), [a, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    ug().catch((O) => console.warn("[Studio] DST init error:", O));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : $l(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), m = u.useMemo(() => d - v, [d, v]), g = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [N, C] = u.useState(e.selectedStationIds || []), [b, P] = u.useState(e.activeStationId || null), [k, p] = u.useState(null), [h, M] = u.useState(null), [E, j] = u.useState([]), [y, S] = u.useState(!1), [x, I] = u.useState(null), [D, V] = u.useState(() => {
    var O;
    return e.compositionScope || (((O = e.selectedStationIds) == null ? void 0 : O.length) > 1 ? "inter-station" : "intra-station");
  }), [$, B] = u.useState(() => {
    try {
      const O = localStorage.getItem("itb_composition_layout");
      if (O) return O;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), se = u.useCallback((O) => {
    B((oe) => {
      const W = typeof O == "function" ? O(oe) : O;
      try {
        localStorage.setItem("itb_composition_layout", W);
      } catch {
      }
      return W;
    });
  }, []), [U, te] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [A, T] = u.useState(() => !!e.isPipSwapped), [L, z] = u.useState(() => e.audioRoutingPlan || null), [F, ce] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [q, J] = u.useState(!1), [le, Fe] = u.useState(null), [H, ne] = u.useState(() => e.canvasLayoutTimeline || null), [he, Z] = u.useState(0), ae = u.useCallback((O) => {
    ne((oe) => {
      const W = [...(oe == null ? void 0 : oe.keyframes) || []], Oe = W.findIndex((ct) => Math.abs(ct.timestampEpochMs - O) < 300);
      if (Oe >= 0)
        return Z(Oe), oe;
      const Le = W[he] || W[0], Re = (Le == null ? void 0 : Le.layout) || le || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Ve = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(O),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Re))
      }, ue = [...W, Ve].sort((ct, jt) => ct.timestampEpochMs - jt.timestampEpochMs), qe = ue.findIndex((ct) => ct.timestampEpochMs === Math.round(O));
      return Z(qe >= 0 ? qe : 0), {
        ...oe || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: ue
      };
    });
  }, [he, le]), ye = u.useCallback((O, oe) => {
    ne((W) => !(W != null && W.keyframes) || W.keyframes.length === 0 ? W : wc(W, O, oe));
  }, []), Be = u.useCallback((O) => {
    ne((oe) => {
      if (!(oe != null && oe.keyframes) || oe.keyframes.length <= 1) return oe;
      const W = oe.keyframes.filter((Oe, Le) => Le !== O);
      return Z((Oe) => Math.max(0, Oe - 1)), { ...oe, keyframes: W };
    });
  }, []), X = u.useCallback((O, oe) => {
    ne((W) => {
      if (!(W != null && W.keyframes) || W.keyframes.length === 0) return W;
      const Oe = Math.round(oe), Le = typeof O == "number" && W.keyframes[O] ? O : W.keyframes.findIndex((ue) => ue.id === O);
      if (Le === -1) return W;
      const Re = [...W.keyframes];
      Re[Le] = {
        ...Re[Le],
        timestampEpochMs: Oe
      }, Re.sort((ue, qe) => ue.timestampEpochMs - qe.timestampEpochMs);
      const Ve = Re.findIndex((ue) => ue.timestampEpochMs === Oe);
      return Ve >= 0 && Z(Ve), {
        ...W,
        keyframes: Re
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [Q, fe] = u.useState({}), ge = u.useCallback((O) => {
    fe((oe) => ({
      ...oe,
      [O]: !(oe[O] ?? !0)
    }));
  }, []), we = u.useCallback((O) => {
    C((oe) => oe.filter((W) => W !== O)), b === O && P(null), k === O && p(null), ne((oe) => {
      if (!oe || !oe.keyframes) return oe;
      const W = oe.keyframes.map((Oe) => {
        var Le;
        return {
          ...Oe,
          layout: {
            ...Oe.layout,
            placements: (((Le = Oe.layout) == null ? void 0 : Le.placements) || []).filter((Re) => Re.stationId !== O)
          }
        };
      });
      return { ...oe, keyframes: W };
    });
  }, [b, k]), Ie = u.useCallback((O, oe) => {
    O.preventDefault(), O.stopPropagation();
    const W = 195, Oe = 110, Le = Math.min(O.clientX, window.innerWidth - W - 10), Re = Math.min(O.clientY, window.innerHeight - Oe - 10);
    I({ x: Le, y: Re, station: oe });
  }, []), ie = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(g, e.inEpochMs - m)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(g, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, m, g, v]), De = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(ie + 1e3, Math.min(g, e.outEpochMs - m)) : typeof e.outPointMs == "number" ? Math.max(ie + 1e3, Math.min(g, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, m, g, v, t.durationMs, ie]), ke = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(g, e.playheadEpochMs - m)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(g, e.playheadMs)) : ie, [e.playheadEpochMs, e.playheadMs, m, g, ie]), [Te, ze] = u.useState(ie), [Pe, je] = u.useState(De), { allStations: Qe, recordingSegments: Ue, isLoadingStations: en, movieBoundaries: tt } = Ax(
    m,
    g,
    t,
    r,
    b
  ), Ge = u.useMemo(() => Qe.find((O) => O.id === b) || null, [Qe, b]), ln = u.useCallback((O, oe) => {
    ne((W) => {
      var jt, Et;
      if (!W || !W.keyframes || W.keyframes.length === 0) return W;
      const Oe = he >= 0 && he < W.keyframes.length ? he : 0, Le = W.keyframes[Oe], Re = ((jt = Le == null ? void 0 : Le.layout) == null ? void 0 : jt.placements) || [], Ve = (oe || "mon-0").toLowerCase(), ue = Re.findIndex((St) => St.stationId === O && (St.displayId || "mon-0").toLowerCase() === Ve);
      let qe;
      if (ue >= 0)
        qe = Re.filter((St, Ut) => Ut !== ue);
      else {
        const St = Qe.find((xr) => xr.id === O), Ut = ((Et = St == null ? void 0 : St.displays) == null ? void 0 : Et.find((xr) => (xr.displayId || "").toLowerCase() === Ve)) || { width: 1920, height: 1080 }, Ss = Ut.width || 1920, Zt = Ut.height || 1080, Sn = Ss / Zt, gs = Sn >= 1 ? 640 : Math.round(360 * Sn), Ws = Sn >= 1 ? Math.round(640 / Sn) : 360, Hi = {
          stationId: O,
          displayId: Ve,
          label: `${(St == null ? void 0 : St.displayName) || O} - ${Ut.displayName || Ve}`,
          x: 120 + Re.length * 40 % 800,
          y: 100 + Re.length * 40 % 500,
          width: gs,
          height: Ws,
          sourceWidth: Ss,
          sourceHeight: Zt,
          nativeAspectRatio: Sn,
          aspectRatio: Sn,
          zIndex: Re.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        qe = [...Re, Hi];
      }
      const ct = [...W.keyframes];
      return ct[Oe] = {
        ...ct[Oe],
        layout: {
          ...ct[Oe].layout,
          placements: qe
        }
      }, { ...W, keyframes: ct };
    });
  }, [he, Qe]), Rt = u.useMemo(() => !N || N.length === 0 ? [] : Qe.filter((O) => N.includes(O.id)), [Qe, N]), pn = u.useMemo(() => Qe.find((O) => O.id === k) || null, [Qe, k]), He = !!(k && pn), vt = u.useRef("grid"), Cn = u.useRef(null), {
    playheadMs: gt,
    setPlayheadMs: Nt,
    isPlaying: En,
    setIsPlaying: kt,
    playbackSpeed: Tt,
    setPlaybackSpeed: Wt,
    isLooping: Qt,
    setIsLooping: cn,
    togglePlaySmart: Ln
  } = Rx({
    timelineBaseEpochMs: m,
    inPointMs: Te,
    outPointMs: Pe,
    globalGaps: E,
    activeStation: Ge,
    spotlightStation: pn,
    recordingSegments: Ue,
    initialPlayheadMs: ke,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !b
  }), {
    zoomLevel: Se,
    setZoomLevel: be,
    viewportStartMs: re,
    setViewportStartMs: We,
    resetZoom: Ke,
    fitRange: Y,
    jumpViewportTo: de
  } = Lx({
    containerRef: Cn,
    totalTimelineDurationMs: g,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [ve, Ee] = u.useState(!1), [Xe, Je] = u.useState(!1), [dt, Ze] = u.useState(!1), [Ye, rt] = u.useState(!1), [xt, at] = u.useState(
    !!(e.isWorkspaceActive && ((mn = e.selectedStationIds) == null ? void 0 : mn.length) > 0)
  ), [$t, un] = u.useState([]);
  u.useEffect(() => {
    const O = He && pn || Ge, oe = (O == null ? void 0 : O.hostname) || (O == null ? void 0 : O.displayName) || (O == null ? void 0 : O.id), W = (o || "NONE").toUpperCase().replace("-", "_");
    if (!oe || !m || !(W !== "NONE" && W !== "OFF" || a)) {
      un([]);
      return;
    }
    const Le = Math.max(0, m - 5e3), Re = m + g + 5e3, Ve = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(oe)}&startEpoch=${Le}&endEpoch=${Re}`, { signal: Ve.signal }).then((ue) => ue.ok ? ue.json() : []).then((ue) => un(Array.isArray(ue) ? ue : [])).catch((ue) => {
      ue.name !== "AbortError" && un([]);
    }), () => Ve.abort();
  }, [Ge, pn, He, m, g, o, a]), u.useEffect(() => {
    en || (Qe.length === 0 ? ((N.length > 0 || b || xt) && (C([]), P(null), p(null), at(!1)), rt(!0), S(!0)) : (S(!1), C((O) => {
      const oe = O.filter((W) => Qe.some((Oe) => Oe.id === W));
      return oe.length !== O.length ? (oe.length === 0 && (at(!1), rt(!0)), oe) : O;
    })));
  }, [en, Qe]);
  const Yt = u.useCallback((O) => {
    if (O === null) {
      kt(!1), Wt(1), P(null);
      return;
    }
    O !== b && Wt(1), P(O);
  }, [b, kt, Wt]), ps = u.useCallback((O, oe = null) => {
    O !== b && Wt(1), vt.current = N.length <= 1 || b ? "spotlight" : "grid", P(O), p(O), M(oe || null);
  }, [b, N.length, Wt]), Jn = u.useCallback(() => {
    p(null), M(null), vt.current === "grid" && P(null);
  }, []), _t = u.useMemo(() => {
    if (L != null && L.segments && L.segments.length > 0)
      return L;
    const O = N[0] || b || "mon-0";
    return {
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + g,
          sourceStationId: O
        }
      ]
    };
  }, [L, N, b, m, g]), js = u.useCallback((O) => {
    z((oe) => {
      const W = oe || _t, Oe = [...W.segments || []], Le = Oe.findIndex((Et) => {
        const St = Et.startEpochMs ?? Et.StartEpochMs ?? 0, Ut = Et.endEpochMs ?? Et.EndEpochMs ?? 0;
        return O > St + 500 && O < Ut - 500;
      });
      if (Le === -1) return oe;
      const Re = Oe[Le], Ve = Re.startEpochMs ?? Re.StartEpochMs ?? 0, ue = Re.endEpochMs ?? Re.EndEpochMs ?? 0, qe = Re.sourceStationId ?? Re.SourceStationId ?? N[0], ct = { startEpochMs: Ve, endEpochMs: O, sourceStationId: qe }, jt = { startEpochMs: O, endEpochMs: ue, sourceStationId: qe };
      return Oe.splice(Le, 1, ct, jt), { ...W, segments: Oe };
    });
  }, [_t, N]), Gt = u.useCallback((O, oe) => {
    z((W) => {
      const Oe = W || _t, Le = (Oe.segments || []).map((Re) => {
        const Ve = Re.startEpochMs ?? Re.StartEpochMs ?? 0, ue = Re.endEpochMs ?? Re.EndEpochMs ?? 0;
        return O >= Ve && O <= ue ? { ...Re, sourceStationId: oe } : Re;
      });
      return { ...Oe, segments: Le };
    }), ce(!1);
  }, [_t]), Ft = u.useCallback((O, oe) => {
    z((W) => {
      const Oe = W || _t, Le = (Oe.segments || []).map((Re) => {
        const Ve = Re.startEpochMs ?? Re.StartEpochMs ?? 0, ue = Re.endEpochMs ?? Re.EndEpochMs ?? 0;
        return O >= Ve && O <= ue ? { ...Re, gain: oe } : Re;
      });
      return { ...Oe, segments: Le };
    });
  }, [_t]), Cs = u.useCallback(() => {
    ce((O) => !O);
  }, []), [tn, _r] = u.useState({}), On = u.useCallback((O) => {
    if (!O) return null;
    if (tn[O]) return tn[O];
    const oe = Qe.find((W) => W.id === O);
    return oe != null && oe.directorPlan ? oe.directorPlan : {
      stationId: O,
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + g,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [tn, Qe, m, g]), Es = u.useCallback((O, oe) => {
    O && _r((W) => {
      const Oe = W[O] || On(O), Le = [...Oe.segments || []], Re = Le.findIndex((Ut) => {
        const Ss = Ut.startEpochMs ?? Ut.StartEpochMs ?? 0, Zt = Ut.endEpochMs ?? Ut.EndEpochMs ?? 0;
        return oe > Ss + 500 && oe < Zt - 500;
      });
      if (Re === -1) return W;
      const Ve = Le[Re], ue = Ve.startEpochMs ?? Ve.StartEpochMs ?? 0, qe = Ve.endEpochMs ?? Ve.EndEpochMs ?? 0, ct = Ve.targetDisplayId ?? Ve.TargetDisplayId ?? "mon-0", jt = !!(Ve.isManualOverride ?? Ve.IsManualOverride), Et = { ...Ve, startEpochMs: ue, endEpochMs: oe, targetDisplayId: ct, isManualOverride: jt }, St = { ...Ve, startEpochMs: oe, endEpochMs: qe, targetDisplayId: ct, isManualOverride: jt };
      return Le.splice(Re, 1, Et, St), { ...W, [O]: { ...Oe, segments: Le } };
    });
  }, [On]), Me = u.useCallback((O, oe, W) => {
    O && _r((Oe) => {
      const Le = Oe[O] || On(O), Re = [...Le.segments || []];
      let Ve = Re.findIndex((qe) => {
        const ct = qe.startEpochMs ?? qe.StartEpochMs ?? 0, jt = qe.endEpochMs ?? qe.EndEpochMs ?? 0;
        return oe > ct && oe < jt;
      });
      if (Ve === -1 && (Ve = Re.findIndex((qe) => {
        const ct = qe.startEpochMs ?? qe.StartEpochMs ?? 0, jt = qe.endEpochMs ?? qe.EndEpochMs ?? 0;
        return oe >= ct && oe <= jt;
      })), Ve === -1) return Oe;
      const ue = Re[Ve];
      return Re[Ve] = { ...ue, targetDisplayId: W, isManualOverride: !0 }, { ...Oe, [O]: { ...Le, segments: Re } };
    });
  }, [On]), Ae = u.useCallback((O, oe) => {
    if (!O) return;
    const W = Qe.find((Le) => Le.id === O), Oe = W == null ? void 0 : W.directorPlan;
    _r((Le) => {
      var Ss;
      const Re = Le[O] || On(O), Ve = [...Re.segments || []];
      let ue = Ve.findIndex((Zt) => {
        const Sn = Zt.startEpochMs ?? Zt.StartEpochMs ?? 0, gs = Zt.endEpochMs ?? Zt.EndEpochMs ?? 0;
        return oe > Sn && oe < gs;
      });
      if (ue === -1 && (ue = Ve.findIndex((Zt) => {
        const Sn = Zt.startEpochMs ?? Zt.StartEpochMs ?? 0, gs = Zt.endEpochMs ?? Zt.EndEpochMs ?? 0;
        return oe >= Sn && oe <= gs;
      })), ue === -1) return Le;
      const qe = Ve[ue], ct = qe.startEpochMs ?? qe.StartEpochMs ?? 0, jt = qe.endEpochMs ?? qe.EndEpochMs ?? 0, Et = (ct + jt) / 2, St = (Ss = Oe == null ? void 0 : Oe.segments) == null ? void 0 : Ss.find((Zt) => {
        const Sn = Zt.startEpochMs ?? Zt.StartEpochMs ?? 0, gs = Zt.endEpochMs ?? Zt.EndEpochMs ?? 0;
        return Et >= Sn && Et <= gs;
      }), Ut = St ? St.targetDisplayId ?? St.TargetDisplayId ?? "mon-0" : "mon-0";
      return Ve[ue] = { ...qe, targetDisplayId: Ut, isManualOverride: !1 }, { ...Le, [O]: { ...Re, segments: Ve } };
    });
  }, [Qe, On]), ms = u.useMemo(() => Rt.map((O) => ({
    ...O,
    directorPlan: tn[O.id] || O.directorPlan || On(O.id)
  })), [Rt, tn, On]), vn = u.useMemo(() => Ge ? {
    ...Ge,
    directorPlan: tn[Ge.id] || Ge.directorPlan || On(Ge.id)
  } : null, [Ge, tn, On]), Fr = u.useMemo(() => pn ? {
    ...pn,
    directorPlan: tn[pn.id] || pn.directorPlan || On(pn.id)
  } : null, [pn, tn, On]);
  Ox({
    activeStationId: b,
    spotlightStationId: k,
    timelineStations: ms,
    selectedStationIdsCount: N.length,
    onSelectActiveStation: Yt,
    setPlaybackSpeed: Wt,
    playheadMs: gt,
    setPlayheadMs: Nt,
    inPointMs: Te,
    setInPointMs: ze,
    outPointMs: Pe,
    setOutPointMs: je,
    totalTimelineDurationMs: g,
    zoomLevel: Se,
    togglePlaySmart: Ln,
    onToggleHelpModal: () => Ze((O) => !O),
    onSplitDirectorAtPlayhead: () => {
      var oe, W, Oe;
      const O = b || (N.length === 1 ? N[0] : null);
      if (O) {
        const Le = Qe.find((Ve) => Ve.id === O);
        (((oe = Le == null ? void 0 : Le.displays) == null ? void 0 : oe.length) > 1 || ((Oe = (W = Le == null ? void 0 : Le.topology) == null ? void 0 : W.displays) == null ? void 0 : Oe.length) > 1) && Es(O, m + gt);
      }
    },
    isModalActive: ve || Xe || dt
  }), u.useEffect(() => {
    const O = m + Te, oe = m + Pe, W = m + gt;
    pp({
      timeRange: t,
      timeMode: r,
      inPointMs: Te,
      outPointMs: Pe,
      playheadMs: Math.round(gt),
      inEpochMs: O,
      outEpochMs: oe,
      playheadEpochMs: W,
      selectedStationIds: N,
      activeStationId: b,
      zoomLevel: Se,
      viewportStartMs: re,
      isWorkspaceActive: xt,
      isLooping: Qt,
      playbackSpeed: Tt,
      keystrokeMode: o,
      showRulerKeystrokes: a,
      compositionScope: D,
      compositionLayout: $,
      isAutoDirectorEnabled: U,
      isPipSwapped: A,
      audioRoutingPlan: _t,
      isAutoFollowAudio: F,
      canvasLayoutTimeline: H
    });
  }, [
    t,
    r,
    Te,
    Pe,
    gt,
    N,
    b,
    Se,
    re,
    xt,
    Qt,
    Tt,
    m,
    o,
    a,
    D,
    $,
    U,
    A,
    _t,
    F,
    H
  ]);
  const yo = u.useCallback((O) => {
    var ct, jt;
    const oe = $l(O.startTime), W = $l(O.endTime), Oe = Math.max(0, W - oe) || 144e5, Le = {
      start: O.startTime,
      end: O.endTime,
      durationMs: Oe,
      startEpochMs: oe,
      endEpochMs: W
    }, Re = Math.max(6e4, Math.round(Oe * 0.05)), Ve = oe - Re, ue = Oe + 2 * Re;
    if (n(Le), O.inEpochMs && O.outEpochMs) {
      const Et = Math.max(0, Math.min(ue, O.inEpochMs - Ve)), St = Math.max(Et + 1e3, Math.min(ue, O.outEpochMs - Ve)), Ut = O.playheadEpochMs ? Math.max(0, Math.min(ue, O.playheadEpochMs - Ve)) : Et;
      ze(Et), je(St), Nt(Ut);
    } else {
      const Et = typeof O.inPointMs == "number" ? O.inPointMs : Re, St = typeof O.outPointMs == "number" ? O.outPointMs : Re + Oe, Ut = typeof O.playheadMs == "number" ? O.playheadMs : Et;
      ze(Math.max(0, Math.min(ue, Et))), je(Math.max(0, Math.min(ue, St))), Nt(Math.max(0, Math.min(ue, Ut)));
    }
    const qe = ((ct = O.selectedStationIds) == null ? void 0 : ct.length) > 0 ? O.selectedStationIds : ((jt = O.cutStationIds) == null ? void 0 : jt.length) > 0 ? O.cutStationIds : O.stationIds;
    if ((qe == null ? void 0 : qe.length) > 0) {
      C(qe);
      const Et = O.spotlightStationId || O.SpotlightStationId || null, St = O.activeStationId || O.ActiveStationId || null;
      Et && qe.includes(Et) ? (P(Et), p(Et)) : St && qe.includes(St) ? (P(St), p(null)) : (P(null), p(null));
    }
    O.keystrokeMode && i(O.keystrokeMode), at(!0), rt(!1);
  }, []), zi = u.useCallback((O) => {
    const oe = O.startEpochMs || $l(O.start, null, r), W = O.endEpochMs || $l(O.end, null, r), Oe = Math.max(0, W - oe) || 144e5, Le = Math.max(6e4, Math.round(Oe * 0.05)), Re = oe - Le, Ve = Oe + 2 * Le;
    n({
      ...O,
      startEpochMs: oe,
      endEpochMs: W,
      durationMs: Oe
    }), S(!1), ze(Le), je(Le + Oe), Nt(Le), ne((ue) => {
      if (!(ue != null && ue.keyframes) || ue.keyframes.length === 0) return ue;
      const qe = ue.keyframes.map((ct, jt) => jt === 0 ? { ...ct, timestampEpochMs: Re } : ct).filter((ct) => ct.timestampEpochMs >= Re && ct.timestampEpochMs <= Re + Ve);
      return { ...ue, keyframes: qe };
    }), z((ue) => {
      if (!(ue != null && ue.segments) || ue.segments.length === 0) return ue;
      if (!ue.segments.some((ct) => {
        const jt = ct.startEpochMs ?? ct.StartEpochMs ?? 0;
        return (ct.endEpochMs ?? ct.EndEpochMs ?? 0) > Re && jt < Re + Ve;
      })) {
        const ct = N[0] || b || "station-0";
        return {
          segments: [
            {
              startEpochMs: Re,
              endEpochMs: Re + Ve,
              sourceStationId: ct
            }
          ]
        };
      }
      return ue;
    }), _r({});
  }, [r, N, b]), Bs = u.useCallback(() => {
    if (Rt.map((oe) => oe.id).length === 0) return alert("No active stations selected in timeline.");
    J(!0);
  }, [Rt]), dn = u.useCallback(async (O, oe) => {
    var Ve, ue, qe, ct;
    const W = Rt.map((jt) => jt.id);
    if (W.length === 0) return;
    let Oe = O === "None" ? "None" : "BurnIn";
    const Le = oe || "NATIVE", Re = ((Ve = vn == null ? void 0 : vn.displays) == null ? void 0 : Ve.length) > 1 || ((qe = (ue = vn == null ? void 0 : vn.topology) == null ? void 0 : ue.displays) == null ? void 0 : qe.length) > 1 ? ((ct = vn == null ? void 0 : vn.directorPlan) == null ? void 0 : ct.segments) || [] : [];
    try {
      const jt = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: W,
          inEpochMs: m + Te,
          outEpochMs: m + Pe,
          keystrokeMode: Oe,
          resolution: Le,
          videoQuality: Le,
          compositionScope: D,
          layoutMode: "canvas",
          canvasLayout: le,
          canvasLayoutTimeline: H,
          isPipSwapped: A,
          isAutoDirectorEnabled: U,
          directorSegments: Re,
          audioRoutingSegments: _t.segments || []
        })
      });
      if (!jt.ok) throw new Error(`HTTP ${jt.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (jt) {
      console.error("[Studio] Export failed:", jt), alert("Failed to launch background master MP4 export job.");
    }
  }, [Rt, m, Te, Pe, D, le, H, A, U, vn, _t]), nn = u.useCallback(() => {
    yg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const O = Gd(), oe = Math.max(6e4, Math.round(O.durationMs * 0.05));
    n(O), ze(oe), je(oe + O.durationMs), Nt(oe), C([]), P(null), p(null), kt(!1), Wt(1), i("BURN_IN"), Ke(), at(!1), rt(!0);
  }, [Ke, kt, Wt, Nt]), sn = !xt || N.length === 0, Jt = m + gt;
  return u.useEffect(() => {
    const O = H == null ? void 0 : H.keyframes;
    if (!O || O.length === 0) return;
    let oe = 0;
    for (let W = 0; W < O.length && O[W].timestampEpochMs <= Jt + 50; W++)
      oe = W;
    oe !== he && Z(oe);
  }, [Jt, H == null ? void 0 : H.keyframes, he]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        pg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: b,
          hideBackToGrid: Rt.length <= 1,
          onResetActiveStation: () => Yt(null),
          onOpenRangeModal: () => Ee(!0),
          onOpenBookmarksModal: () => Je(!0),
          onOpenHelpModal: () => Ze(!0),
          onToggleDrawer: () => rt(!Ye),
          isInitialSetup: sn,
          selectedCount: N.length,
          totalCount: Qe.length,
          onResetStudio: nn
        }
      ),
      y && /* @__PURE__ */ s.jsxs("div", { className: "studio-scope-alert-banner", children: [
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
              onClick: () => Ee(!0),
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
              onClick: () => S(!1),
              title: "Dismiss Alert",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "studio-lower-body", children: [
        !sn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              $g,
              {
                activeStation: vn,
                timelineStations: ms,
                allStations: Qe,
                onSelectActiveStation: Yt,
                onOpenSpotlight: ps,
                onStationContextMenu: Ie,
                onDeselectStation: we,
                stationAutoDirectorMap: Q,
                onToggleStationAutoDirector: ge,
                onOpenDrawer: () => rt(!0),
                baseEpochMs: m,
                playheadMs: gt,
                playheadEpochMs: Jt,
                timeMode: r,
                isPlaying: He ? !1 : En,
                setIsPlaying: kt,
                totalDurationMs: g,
                inPointMs: Te,
                outPointMs: Pe,
                setPlayheadMs: Nt,
                globalGaps: E,
                recordingSegments: Ue,
                playbackSpeed: Tt,
                onChangePlaybackSpeed: Wt,
                keystrokeMode: o,
                keystrokes: $t,
                directorPlan: vn == null ? void 0 : vn.directorPlan,
                onOverrideDisplay: Me,
                onResetOverride: Ae,
                compositionScope: D,
                onChangeCompositionScope: V,
                compositionLayout: $,
                onChangeCompositionLayout: se,
                isAutoDirectorEnabled: U,
                onToggleAutoDirector: () => te((O) => !O),
                isPipSwapped: A,
                onTogglePipSwap: () => T((O) => !O),
                onUpdateCanvasLayout: Fe,
                canvasLayoutTimeline: H,
                onUpdateCanvasLayoutTimeline: ne,
                activeKfIndex: he,
                setActiveKfIndex: Z,
                isModalOpen: q || ve || Xe || He || dt
              }
            ),
            /* @__PURE__ */ s.jsx(
              gp,
              {
                baseEpochMs: m,
                timeMode: r,
                totalDurationMs: g,
                playheadMs: gt,
                setPlayheadMs: Nt,
                inPointMs: Te,
                setInPointMs: ze,
                outPointMs: Pe,
                setOutPointMs: je,
                activeStationId: b,
                isPlaying: En,
                setIsPlaying: Ln,
                isLooping: Qt,
                setIsLooping: cn,
                playbackSpeed: Tt,
                onChangeSpeed: Wt,
                onSetInPoint: () => ze(Math.max(0, Math.min(gt, Pe - 1e3))),
                onSetOutPoint: () => je(Math.min(g, Math.max(gt, Te + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: Cn, children: /* @__PURE__ */ s.jsx(
            Np,
            {
              stations: ms,
              activeStationId: b,
              onSelectActiveStation: (O) => Yt(N.length <= 1 ? O : O === b ? null : O),
              onStationContextMenu: Ie,
              onDeselectStation: we,
              stationAutoDirectorMap: Q,
              onToggleStationAutoDirector: ge,
              baseEpochMs: m,
              timeMode: r,
              totalDurationMs: g,
              zoomLevel: Se,
              onZoomChange: be,
              onZoomReset: Ke,
              onFitRange: Y,
              onJumpViewportTo: de,
              playheadMs: gt,
              setPlayheadMs: Nt,
              inPointMs: Te,
              setInPointMs: ze,
              outPointMs: Pe,
              setOutPointMs: je,
              viewportStartMs: re,
              onViewportStartChange: We,
              onExport: Bs,
              recordingSegments: Ue,
              movieBoundaries: tt,
              onEstimateLoaded: (O) => (O == null ? void 0 : O.removedGlobalGaps) && j(O.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: i,
              keystrokes: $t,
              showKeystrokes: a,
              showRulerKeystrokes: a,
              onToggleRulerKeystrokes: () => c((O) => !O),
              onSplitDirectorSegment: Es,
              onChangeDirectorSegmentDisplay: Me,
              onResetDirectorSegmentToAuto: Ae,
              audioRoutingPlan: _t,
              onSplitAudioSegment: js,
              onChangeAudioSegmentStation: Gt,
              onChangeAudioSegmentGain: Ft,
              onFollowVisualFeed: Cs,
              isAutoFollowAudio: F,
              canvasLayoutTimeline: H,
              activeKfIndex: he,
              onSelectKeyframe: (O, oe) => {
                Z(O), Nt(Math.max(0, oe - m));
              },
              onAddKeyframeAtEpoch: ae,
              onDeleteKeyframe: Be,
              onUpdateKeyframeEpoch: X,
              onUpdateKeyframeTransition: ye,
              onToggleDisplayOnCanvas: ln,
              onUpdateAudioPlan: z
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          gx,
          {
            isOpen: Ye || sn,
            onToggle: () => rt(!Ye),
            onClose: () => rt(!1),
            allStations: Qe,
            selectedStationIds: N,
            onToggleStation: (O) => C((oe) => oe.includes(O) ? oe.filter((W) => W !== O) : [...oe, O]),
            onUpdateSelections: C,
            isInitialSetup: sn,
            isLoadingStations: en,
            recordingSegments: Ue,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              N.length > 0 && (P(null), p(null), at(!0), rt(!1));
            },
            onOpenRangeModal: () => Ee(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      vx,
      {
        isOpen: ve,
        onClose: () => Ee(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: yo,
        onApplyRange: zi
      }
    ),
    /* @__PURE__ */ s.jsx(
      kx,
      {
        isOpen: Xe,
        onClose: () => Je(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: m,
          timelineBaseEpochMs: m,
          playheadMs: gt,
          inPointMs: Te,
          outPointMs: Pe,
          selectedStationIds: N,
          selectedStationNames: Qe.filter((O) => N.includes(O.id)).map((O) => O.displayName || O.hostname || O.id),
          allStationIds: Qe.map((O) => O.id),
          activeStationId: b,
          activeStationName: (Ge == null ? void 0 : Ge.displayName) || (Ge == null ? void 0 : Ge.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: yo
      }
    ),
    /* @__PURE__ */ s.jsx(
      jp,
      {
        isOpen: dt,
        onClose: () => Ze(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Mx,
      {
        isOpen: He,
        station: Fr,
        initialDisplayId: h,
        allStations: ms,
        onSelectStation: (O) => {
          O !== k && Wt(1), P(O), p(O);
        },
        onClose: Jn,
        baseEpochMs: m,
        timeMode: r,
        totalDurationMs: g,
        zoomLevel: Se,
        onZoomChange: be,
        onZoomReset: Ke,
        onFitRange: Y,
        onJumpViewportTo: de,
        viewportStartMs: re,
        onViewportStartChange: We,
        playheadMs: gt,
        setPlayheadMs: Nt,
        playheadEpochMs: Jt,
        inPointMs: Te,
        setInPointMs: ze,
        outPointMs: Pe,
        setOutPointMs: je,
        recordingSegments: Ue,
        globalGaps: E,
        isPlaying: En,
        setIsPlaying: kt,
        isLooping: Qt,
        setIsLooping: cn,
        playbackSpeed: Tt,
        setPlaybackSpeed: Wt,
        onExport: Bs,
        keystrokeMode: o,
        onChangeKeystrokeMode: i,
        keystrokes: $t,
        showRulerKeystrokes: a,
        onToggleRulerKeystrokes: () => c((O) => !O),
        directorPlan: Fr == null ? void 0 : Fr.directorPlan,
        onOverrideDisplay: Me,
        onSplitDirectorSegment: Es,
        onChangeDirectorSegmentDisplay: Me,
        onResetDirectorSegmentToAuto: Ae
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ix,
      {
        menu: x,
        onClose: () => I(null),
        onDeselect: we,
        onFocusSolo: Yt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Tx,
      {
        isOpen: q,
        onClose: () => J(!1),
        onConfirm: dn,
        compositionSummary: {
          scope: D,
          layout: (le == null ? void 0 : le.preset) || $,
          isPipSwapped: A,
          isAutoDirectorEnabled: U,
          stationsCount: Rt.length,
          audioSegmentsCount: ((wl = _t == null ? void 0 : _t.segments) == null ? void 0 : wl.length) || 1,
          resolution: (H == null ? void 0 : H.resolution) || "NATIVE",
          canvasWidth: (le == null ? void 0 : le.width) || 1920,
          canvasHeight: (le == null ? void 0 : le.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Cp, {})
  ] });
}
const Xd = "itb-extractor-advanced-theme", Qd = "itb-global-export-job-monitor-root";
function Ep() {
  if (!(typeof document > "u") && !document.getElementById(Xd)) {
    const e = document.createElement("link");
    e.id = Xd, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Ep();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Qd);
  if (!t) {
    t = document.createElement("div"), t.id = Qd, document.body.appendChild(t);
    try {
      ei.createRoot(t).render(fo.createElement(Cp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Px(e, t = {}) {
  Ep();
  const n = ei.createRoot(e);
  return n.render(fo.createElement(Dx, t)), () => {
    n.unmount();
  };
}
export {
  Cp as ExportJobMonitor,
  Dx as ExtractorAdvancedStudio,
  Dx as default,
  Px as mount
};
