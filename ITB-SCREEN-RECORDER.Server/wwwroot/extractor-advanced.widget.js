function qm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ef = { exports: {} }, At = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yo = Symbol.for("react.element"), Zm = Symbol.for("react.portal"), e0 = Symbol.for("react.fragment"), t0 = Symbol.for("react.strict_mode"), n0 = Symbol.for("react.profiler"), s0 = Symbol.for("react.provider"), r0 = Symbol.for("react.context"), l0 = Symbol.for("react.forward_ref"), o0 = Symbol.for("react.suspense"), a0 = Symbol.for("react.memo"), i0 = Symbol.for("react.lazy"), $d = Symbol.iterator;
function c0(e) {
  return e === null || typeof e != "object" ? null : (e = $d && e[$d] || e["@@iterator"], typeof e == "function" ? e : null);
}
var tf = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, nf = Object.assign, sf = {};
function Vl(e, t, n) {
  this.props = e, this.context = t, this.refs = sf, this.updater = n || tf;
}
Vl.prototype.isReactComponent = {};
Vl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Vl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function rf() {
}
rf.prototype = Vl.prototype;
function vu(e, t, n) {
  this.props = e, this.context = t, this.refs = sf, this.updater = n || tf;
}
var Nu = vu.prototype = new rf();
Nu.constructor = vu;
nf(Nu, Vl.prototype);
Nu.isPureReactComponent = !0;
var Ad = Array.isArray, lf = Object.prototype.hasOwnProperty, ku = { current: null }, of = { key: !0, ref: !0, __self: !0, __source: !0 };
function af(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) lf.call(t, r) && !of.hasOwnProperty(r) && (l[r] = t[r]);
  var c = arguments.length - 2;
  if (c === 1) l.children = n;
  else if (1 < c) {
    for (var u = Array(c), h = 0; h < c; h++) u[h] = arguments[h + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in c = e.defaultProps, c) l[r] === void 0 && (l[r] = c[r]);
  return { $$typeof: Yo, type: e, key: o, ref: a, props: l, _owner: ku.current };
}
function u0(e, t) {
  return { $$typeof: Yo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function wu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Yo;
}
function d0(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Rd = /\/+/g;
function Pi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? d0("" + e.key) : t.toString(36);
}
function Ea(e, t, n, r, l) {
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
        case Yo:
        case Zm:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + Pi(a, 0) : r, Ad(l) ? (n = "", e != null && (n = e.replace(Rd, "$&/") + "/"), Ea(l, t, n, "", function(h) {
    return h;
  })) : l != null && (wu(l) && (l = u0(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Rd, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Ad(e)) for (var c = 0; c < e.length; c++) {
    o = e[c];
    var u = r + Pi(o, c);
    a += Ea(o, t, n, u, l);
  }
  else if (u = c0(e), typeof u == "function") for (e = u.call(e), c = 0; !(o = e.next()).done; ) o = o.value, u = r + Pi(o, c++), a += Ea(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function ra(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Ea(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function h0(e) {
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
var Wn = { current: null }, Sa = { transition: null }, f0 = { ReactCurrentDispatcher: Wn, ReactCurrentBatchConfig: Sa, ReactCurrentOwner: ku };
function cf() {
  throw Error("act(...) is not supported in production builds of React.");
}
At.Children = { map: ra, forEach: function(e, t, n) {
  ra(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ra(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ra(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!wu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
At.Component = Vl;
At.Fragment = e0;
At.Profiler = n0;
At.PureComponent = vu;
At.StrictMode = t0;
At.Suspense = o0;
At.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = f0;
At.act = cf;
At.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = nf({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = ku.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
    for (u in t) lf.call(t, u) && !of.hasOwnProperty(u) && (r[u] = t[u] === void 0 && c !== void 0 ? c[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    c = Array(u);
    for (var h = 0; h < u; h++) c[h] = arguments[h + 2];
    r.children = c;
  }
  return { $$typeof: Yo, type: e.type, key: l, ref: o, props: r, _owner: a };
};
At.createContext = function(e) {
  return e = { $$typeof: r0, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: s0, _context: e }, e.Consumer = e;
};
At.createElement = af;
At.createFactory = function(e) {
  var t = af.bind(null, e);
  return t.type = e, t;
};
At.createRef = function() {
  return { current: null };
};
At.forwardRef = function(e) {
  return { $$typeof: l0, render: e };
};
At.isValidElement = wu;
At.lazy = function(e) {
  return { $$typeof: i0, _payload: { _status: -1, _result: e }, _init: h0 };
};
At.memo = function(e, t) {
  return { $$typeof: a0, type: e, compare: t === void 0 ? null : t };
};
At.startTransition = function(e) {
  var t = Sa.transition;
  Sa.transition = {};
  try {
    e();
  } finally {
    Sa.transition = t;
  }
};
At.unstable_act = cf;
At.useCallback = function(e, t) {
  return Wn.current.useCallback(e, t);
};
At.useContext = function(e) {
  return Wn.current.useContext(e);
};
At.useDebugValue = function() {
};
At.useDeferredValue = function(e) {
  return Wn.current.useDeferredValue(e);
};
At.useEffect = function(e, t) {
  return Wn.current.useEffect(e, t);
};
At.useId = function() {
  return Wn.current.useId();
};
At.useImperativeHandle = function(e, t, n) {
  return Wn.current.useImperativeHandle(e, t, n);
};
At.useInsertionEffect = function(e, t) {
  return Wn.current.useInsertionEffect(e, t);
};
At.useLayoutEffect = function(e, t) {
  return Wn.current.useLayoutEffect(e, t);
};
At.useMemo = function(e, t) {
  return Wn.current.useMemo(e, t);
};
At.useReducer = function(e, t, n) {
  return Wn.current.useReducer(e, t, n);
};
At.useRef = function(e) {
  return Wn.current.useRef(e);
};
At.useState = function(e) {
  return Wn.current.useState(e);
};
At.useSyncExternalStore = function(e, t, n) {
  return Wn.current.useSyncExternalStore(e, t, n);
};
At.useTransition = function() {
  return Wn.current.useTransition();
};
At.version = "18.3.1";
ef.exports = At;
var i = ef.exports;
const pi = /* @__PURE__ */ qm(i);
var Wa = {}, uf = { exports: {} }, os = {}, df = { exports: {} }, hf = {};
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
  function t(P, F) {
    var T = P.length;
    P.push(F);
    e: for (; 0 < T; ) {
      var B = T - 1 >>> 1, U = P[B];
      if (0 < l(U, F)) P[B] = F, P[T] = U, T = B;
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var F = P[0], T = P.pop();
    if (T !== F) {
      P[0] = T;
      e: for (var B = 0, U = P.length, we = U >>> 1; B < we; ) {
        var K = 2 * (B + 1) - 1, z = P[K], V = K + 1, ge = P[V];
        if (0 > l(z, T)) V < U && 0 > l(ge, z) ? (P[B] = ge, P[V] = T, B = V) : (P[B] = z, P[K] = T, B = K);
        else if (V < U && 0 > l(ge, T)) P[B] = ge, P[V] = T, B = V;
        else break e;
      }
    }
    return F;
  }
  function l(P, F) {
    var T = P.sortIndex - F.sortIndex;
    return T !== 0 ? T : P.id - F.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var a = Date, c = a.now();
    e.unstable_now = function() {
      return a.now() - c;
    };
  }
  var u = [], h = [], y = 1, p = null, f = 3, v = !1, b = !1, E = !1, D = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function j(P) {
    for (var F = n(h); F !== null; ) {
      if (F.callback === null) r(h);
      else if (F.startTime <= P) r(h), F.sortIndex = F.expirationTime, t(u, F);
      else break;
      F = n(h);
    }
  }
  function M(P) {
    if (E = !1, j(P), !b) if (n(u) !== null) b = !0, ne(S);
    else {
      var F = n(h);
      F !== null && re(M, F.startTime - P);
    }
  }
  function S(P, F) {
    b = !1, E && (E = !1, k(g), g = -1), v = !0;
    var T = f;
    try {
      for (j(F), p = n(u); p !== null && (!(p.expirationTime > F) || P && !_()); ) {
        var B = p.callback;
        if (typeof B == "function") {
          p.callback = null, f = p.priorityLevel;
          var U = B(p.expirationTime <= F);
          F = e.unstable_now(), typeof U == "function" ? p.callback = U : p === n(u) && r(u), j(F);
        } else r(u);
        p = n(u);
      }
      if (p !== null) var we = !0;
      else {
        var K = n(h);
        K !== null && re(M, K.startTime - F), we = !1;
      }
      return we;
    } finally {
      p = null, f = T, v = !1;
    }
  }
  var C = !1, N = null, g = -1, $ = 5, w = -1;
  function _() {
    return !(e.unstable_now() - w < $);
  }
  function G() {
    if (N !== null) {
      var P = e.unstable_now();
      w = P;
      var F = !0;
      try {
        F = N(!0, P);
      } finally {
        F ? I() : (C = !1, N = null);
      }
    } else C = !1;
  }
  var I;
  if (typeof m == "function") I = function() {
    m(G);
  };
  else if (typeof MessageChannel < "u") {
    var R = new MessageChannel(), se = R.port2;
    R.port1.onmessage = G, I = function() {
      se.postMessage(null);
    };
  } else I = function() {
    D(G, 0);
  };
  function ne(P) {
    N = P, C || (C = !0, I());
  }
  function re(P, F) {
    g = D(function() {
      P(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    b || v || (b = !0, ne(S));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return f;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (f) {
      case 1:
      case 2:
      case 3:
        var F = 3;
        break;
      default:
        F = f;
    }
    var T = f;
    f = F;
    try {
      return P();
    } finally {
      f = T;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, F) {
    switch (P) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        P = 3;
    }
    var T = f;
    f = P;
    try {
      return F();
    } finally {
      f = T;
    }
  }, e.unstable_scheduleCallback = function(P, F, T) {
    var B = e.unstable_now();
    switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? B + T : B) : T = B, P) {
      case 1:
        var U = -1;
        break;
      case 2:
        U = 250;
        break;
      case 5:
        U = 1073741823;
        break;
      case 4:
        U = 1e4;
        break;
      default:
        U = 5e3;
    }
    return U = T + U, P = { id: y++, callback: F, priorityLevel: P, startTime: T, expirationTime: U, sortIndex: -1 }, T > B ? (P.sortIndex = T, t(h, P), n(u) === null && P === n(h) && (E ? (k(g), g = -1) : E = !0, re(M, T - B))) : (P.sortIndex = U, t(u, P), b || v || (b = !0, ne(S))), P;
  }, e.unstable_shouldYield = _, e.unstable_wrapCallback = function(P) {
    var F = f;
    return function() {
      var T = f;
      f = F;
      try {
        return P.apply(this, arguments);
      } finally {
        f = T;
      }
    };
  };
})(hf);
df.exports = hf;
var p0 = df.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var m0 = i, ls = p0;
function Te(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ff = /* @__PURE__ */ new Set(), Io = {};
function al(e, t) {
  Bl(e, t), Bl(e + "Capture", t);
}
function Bl(e, t) {
  for (Io[e] = t, e = 0; e < t.length; e++) ff.add(t[e]);
}
var Gs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gc = Object.prototype.hasOwnProperty, g0 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ld = {}, Od = {};
function x0(e) {
  return gc.call(Od, e) ? !0 : gc.call(Ld, e) ? !1 : g0.test(e) ? Od[e] = !0 : (Ld[e] = !0, !1);
}
function y0(e, t, n, r) {
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
function v0(e, t, n, r) {
  if (t === null || typeof t > "u" || y0(e, t, n, r)) return !0;
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
function Fn(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var Mn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Mn[e] = new Fn(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Mn[t] = new Fn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Mn[e] = new Fn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Mn[e] = new Fn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Mn[e] = new Fn(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Mn[e] = new Fn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Mn[e] = new Fn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Mn[e] = new Fn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Mn[e] = new Fn(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ju = /[\-:]([a-z])/g;
function Cu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ju,
    Cu
  );
  Mn[t] = new Fn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ju, Cu);
  Mn[t] = new Fn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ju, Cu);
  Mn[t] = new Fn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Mn[e] = new Fn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Mn.xlinkHref = new Fn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Mn[e] = new Fn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Eu(e, t, n, r) {
  var l = Mn.hasOwnProperty(t) ? Mn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (v0(t, n, l, r) && (n = null), r || l === null ? x0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Zs = m0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, la = Symbol.for("react.element"), xl = Symbol.for("react.portal"), yl = Symbol.for("react.fragment"), Su = Symbol.for("react.strict_mode"), xc = Symbol.for("react.profiler"), pf = Symbol.for("react.provider"), mf = Symbol.for("react.context"), bu = Symbol.for("react.forward_ref"), yc = Symbol.for("react.suspense"), vc = Symbol.for("react.suspense_list"), Mu = Symbol.for("react.memo"), fr = Symbol.for("react.lazy"), gf = Symbol.for("react.offscreen"), Dd = Symbol.iterator;
function no(e) {
  return e === null || typeof e != "object" ? null : (e = Dd && e[Dd] || e["@@iterator"], typeof e == "function" ? e : null);
}
var un = Object.assign, _i;
function mo(e) {
  if (_i === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    _i = t && t[1] || "";
  }
  return `
` + _i + e;
}
var Bi = !1;
function Wi(e, t) {
  if (!e || Bi) return "";
  Bi = !0;
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
      } catch (h) {
        var r = h;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (h) {
        r = h;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (h) {
        r = h;
      }
      e();
    }
  } catch (h) {
    if (h && r && typeof h.stack == "string") {
      for (var l = h.stack.split(`
`), o = r.stack.split(`
`), a = l.length - 1, c = o.length - 1; 1 <= a && 0 <= c && l[a] !== o[c]; ) c--;
      for (; 1 <= a && 0 <= c; a--, c--) if (l[a] !== o[c]) {
        if (a !== 1 || c !== 1)
          do
            if (a--, c--, 0 > c || l[a] !== o[c]) {
              var u = `
` + l[a].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= a && 0 <= c);
        break;
      }
    }
  } finally {
    Bi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? mo(e) : "";
}
function N0(e) {
  switch (e.tag) {
    case 5:
      return mo(e.type);
    case 16:
      return mo("Lazy");
    case 13:
      return mo("Suspense");
    case 19:
      return mo("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Wi(e.type, !1), e;
    case 11:
      return e = Wi(e.type.render, !1), e;
    case 1:
      return e = Wi(e.type, !0), e;
    default:
      return "";
  }
}
function Nc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case yl:
      return "Fragment";
    case xl:
      return "Portal";
    case xc:
      return "Profiler";
    case Su:
      return "StrictMode";
    case yc:
      return "Suspense";
    case vc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case mf:
      return (e.displayName || "Context") + ".Consumer";
    case pf:
      return (e._context.displayName || "Context") + ".Provider";
    case bu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Mu:
      return t = e.displayName || null, t !== null ? t : Nc(e.type) || "Memo";
    case fr:
      t = e._payload, e = e._init;
      try {
        return Nc(e(t));
      } catch {
      }
  }
  return null;
}
function k0(e) {
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
      return Nc(t);
    case 8:
      return t === Su ? "StrictMode" : "Mode";
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
function Tr(e) {
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
function xf(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function w0(e) {
  var t = xf(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function oa(e) {
  e._valueTracker || (e._valueTracker = w0(e));
}
function yf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = xf(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Fa(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function kc(e, t) {
  var n = t.checked;
  return un({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Pd(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Tr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function vf(e, t) {
  t = t.checked, t != null && Eu(e, "checked", t, !1);
}
function wc(e, t) {
  vf(e, t);
  var n = Tr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? jc(e, t.type, n) : t.hasOwnProperty("defaultValue") && jc(e, t.type, Tr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function _d(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function jc(e, t, n) {
  (t !== "number" || Fa(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var go = Array.isArray;
function Tl(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Tr(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Cc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(Te(91));
  return un({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Bd(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(Te(92));
      if (go(n)) {
        if (1 < n.length) throw Error(Te(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Tr(n) };
}
function Nf(e, t) {
  var n = Tr(t.value), r = Tr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Wd(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function kf(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ec(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? kf(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var aa, wf = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (aa = aa || document.createElement("div"), aa.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = aa.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function To(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var No = {
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
}, j0 = ["Webkit", "ms", "Moz", "O"];
Object.keys(No).forEach(function(e) {
  j0.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), No[t] = No[e];
  });
});
function jf(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || No.hasOwnProperty(e) && No[e] ? ("" + t).trim() : t + "px";
}
function Cf(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = jf(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var C0 = un({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Sc(e, t) {
  if (t) {
    if (C0[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(Te(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Te(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(Te(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Te(62));
  }
}
function bc(e, t) {
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
var Mc = null;
function Iu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ic = null, $l = null, Al = null;
function Fd(e) {
  if (e = Qo(e)) {
    if (typeof Ic != "function") throw Error(Te(280));
    var t = e.stateNode;
    t && (t = vi(t), Ic(e.stateNode, e.type, t));
  }
}
function Ef(e) {
  $l ? Al ? Al.push(e) : Al = [e] : $l = e;
}
function Sf() {
  if ($l) {
    var e = $l, t = Al;
    if (Al = $l = null, Fd(e), t) for (e = 0; e < t.length; e++) Fd(t[e]);
  }
}
function bf(e, t) {
  return e(t);
}
function Mf() {
}
var Fi = !1;
function If(e, t, n) {
  if (Fi) return e(t, n);
  Fi = !0;
  try {
    return bf(e, t, n);
  } finally {
    Fi = !1, ($l !== null || Al !== null) && (Mf(), Sf());
  }
}
function $o(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = vi(n);
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
  if (n && typeof n != "function") throw Error(Te(231, t, typeof n));
  return n;
}
var Tc = !1;
if (Gs) try {
  var so = {};
  Object.defineProperty(so, "passive", { get: function() {
    Tc = !0;
  } }), window.addEventListener("test", so, so), window.removeEventListener("test", so, so);
} catch {
  Tc = !1;
}
function E0(e, t, n, r, l, o, a, c, u) {
  var h = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, h);
  } catch (y) {
    this.onError(y);
  }
}
var ko = !1, Ua = null, Ha = !1, $c = null, S0 = { onError: function(e) {
  ko = !0, Ua = e;
} };
function b0(e, t, n, r, l, o, a, c, u) {
  ko = !1, Ua = null, E0.apply(S0, arguments);
}
function M0(e, t, n, r, l, o, a, c, u) {
  if (b0.apply(this, arguments), ko) {
    if (ko) {
      var h = Ua;
      ko = !1, Ua = null;
    } else throw Error(Te(198));
    Ha || (Ha = !0, $c = h);
  }
}
function il(e) {
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
function Tf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Ud(e) {
  if (il(e) !== e) throw Error(Te(188));
}
function I0(e) {
  var t = e.alternate;
  if (!t) {
    if (t = il(e), t === null) throw Error(Te(188));
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
        if (o === n) return Ud(l), e;
        if (o === r) return Ud(l), t;
        o = o.sibling;
      }
      throw Error(Te(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var a = !1, c = l.child; c; ) {
        if (c === n) {
          a = !0, n = l, r = o;
          break;
        }
        if (c === r) {
          a = !0, r = l, n = o;
          break;
        }
        c = c.sibling;
      }
      if (!a) {
        for (c = o.child; c; ) {
          if (c === n) {
            a = !0, n = o, r = l;
            break;
          }
          if (c === r) {
            a = !0, r = o, n = l;
            break;
          }
          c = c.sibling;
        }
        if (!a) throw Error(Te(189));
      }
    }
    if (n.alternate !== r) throw Error(Te(190));
  }
  if (n.tag !== 3) throw Error(Te(188));
  return n.stateNode.current === n ? e : t;
}
function $f(e) {
  return e = I0(e), e !== null ? Af(e) : null;
}
function Af(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Af(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Rf = ls.unstable_scheduleCallback, Hd = ls.unstable_cancelCallback, T0 = ls.unstable_shouldYield, $0 = ls.unstable_requestPaint, pn = ls.unstable_now, A0 = ls.unstable_getCurrentPriorityLevel, Tu = ls.unstable_ImmediatePriority, Lf = ls.unstable_UserBlockingPriority, za = ls.unstable_NormalPriority, R0 = ls.unstable_LowPriority, Of = ls.unstable_IdlePriority, mi = null, Ps = null;
function L0(e) {
  if (Ps && typeof Ps.onCommitFiberRoot == "function") try {
    Ps.onCommitFiberRoot(mi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var bs = Math.clz32 ? Math.clz32 : P0, O0 = Math.log, D0 = Math.LN2;
function P0(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (O0(e) / D0 | 0) | 0;
}
var ia = 64, ca = 4194304;
function xo(e) {
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
function Ka(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var c = a & ~l;
    c !== 0 ? r = xo(c) : (o &= a, o !== 0 && (r = xo(o)));
  } else a = n & ~l, a !== 0 ? r = xo(a) : o !== 0 && (r = xo(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - bs(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function _0(e, t) {
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
function B0(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - bs(o), c = 1 << a, u = l[a];
    u === -1 ? (!(c & n) || c & r) && (l[a] = _0(c, t)) : u <= t && (e.expiredLanes |= c), o &= ~c;
  }
}
function Ac(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Df() {
  var e = ia;
  return ia <<= 1, !(ia & 4194240) && (ia = 64), e;
}
function Ui(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Xo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - bs(t), e[t] = n;
}
function W0(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - bs(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function $u(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - bs(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Ht = 0;
function Pf(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var _f, Au, Bf, Wf, Ff, Rc = !1, ua = [], wr = null, jr = null, Cr = null, Ao = /* @__PURE__ */ new Map(), Ro = /* @__PURE__ */ new Map(), xr = [], F0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function zd(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      wr = null;
      break;
    case "dragenter":
    case "dragleave":
      jr = null;
      break;
    case "mouseover":
    case "mouseout":
      Cr = null;
      break;
    case "pointerover":
    case "pointerout":
      Ao.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ro.delete(t.pointerId);
  }
}
function ro(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Qo(t), t !== null && Au(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function U0(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return wr = ro(wr, e, t, n, r, l), !0;
    case "dragenter":
      return jr = ro(jr, e, t, n, r, l), !0;
    case "mouseover":
      return Cr = ro(Cr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Ao.set(o, ro(Ao.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Ro.set(o, ro(Ro.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Uf(e) {
  var t = Xr(e.target);
  if (t !== null) {
    var n = il(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Tf(n), t !== null) {
          e.blockedOn = t, Ff(e.priority, function() {
            Bf(n);
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
function ba(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Lc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Mc = r, n.target.dispatchEvent(r), Mc = null;
    } else return t = Qo(n), t !== null && Au(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Kd(e, t, n) {
  ba(e) && n.delete(t);
}
function H0() {
  Rc = !1, wr !== null && ba(wr) && (wr = null), jr !== null && ba(jr) && (jr = null), Cr !== null && ba(Cr) && (Cr = null), Ao.forEach(Kd), Ro.forEach(Kd);
}
function lo(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Rc || (Rc = !0, ls.unstable_scheduleCallback(ls.unstable_NormalPriority, H0)));
}
function Lo(e) {
  function t(l) {
    return lo(l, e);
  }
  if (0 < ua.length) {
    lo(ua[0], e);
    for (var n = 1; n < ua.length; n++) {
      var r = ua[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (wr !== null && lo(wr, e), jr !== null && lo(jr, e), Cr !== null && lo(Cr, e), Ao.forEach(t), Ro.forEach(t), n = 0; n < xr.length; n++) r = xr[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < xr.length && (n = xr[0], n.blockedOn === null); ) Uf(n), n.blockedOn === null && xr.shift();
}
var Rl = Zs.ReactCurrentBatchConfig, Va = !0;
function z0(e, t, n, r) {
  var l = Ht, o = Rl.transition;
  Rl.transition = null;
  try {
    Ht = 1, Ru(e, t, n, r);
  } finally {
    Ht = l, Rl.transition = o;
  }
}
function K0(e, t, n, r) {
  var l = Ht, o = Rl.transition;
  Rl.transition = null;
  try {
    Ht = 4, Ru(e, t, n, r);
  } finally {
    Ht = l, Rl.transition = o;
  }
}
function Ru(e, t, n, r) {
  if (Va) {
    var l = Lc(e, t, n, r);
    if (l === null) qi(e, t, r, Ya, n), zd(e, r);
    else if (U0(l, e, t, n, r)) r.stopPropagation();
    else if (zd(e, r), t & 4 && -1 < F0.indexOf(e)) {
      for (; l !== null; ) {
        var o = Qo(l);
        if (o !== null && _f(o), o = Lc(e, t, n, r), o === null && qi(e, t, r, Ya, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else qi(e, t, r, null, n);
  }
}
var Ya = null;
function Lc(e, t, n, r) {
  if (Ya = null, e = Iu(r), e = Xr(e), e !== null) if (t = il(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Tf(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Ya = e, null;
}
function Hf(e) {
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
      switch (A0()) {
        case Tu:
          return 1;
        case Lf:
          return 4;
        case za:
        case R0:
          return 16;
        case Of:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Nr = null, Lu = null, Ma = null;
function zf() {
  if (Ma) return Ma;
  var e, t = Lu, n = t.length, r, l = "value" in Nr ? Nr.value : Nr.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return Ma = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Ia(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function da() {
  return !0;
}
function Vd() {
  return !1;
}
function as(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var c in e) e.hasOwnProperty(c) && (n = e[c], this[c] = n ? n(o) : o[c]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? da : Vd, this.isPropagationStopped = Vd, this;
  }
  return un(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = da);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = da);
  }, persist: function() {
  }, isPersistent: da }), t;
}
var Yl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ou = as(Yl), Go = un({}, Yl, { view: 0, detail: 0 }), V0 = as(Go), Hi, zi, oo, gi = un({}, Go, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Du, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== oo && (oo && e.type === "mousemove" ? (Hi = e.screenX - oo.screenX, zi = e.screenY - oo.screenY) : zi = Hi = 0, oo = e), Hi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : zi;
} }), Yd = as(gi), Y0 = un({}, gi, { dataTransfer: 0 }), X0 = as(Y0), G0 = un({}, Go, { relatedTarget: 0 }), Ki = as(G0), Q0 = un({}, Yl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), J0 = as(Q0), q0 = un({}, Yl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Z0 = as(q0), eg = un({}, Yl, { data: 0 }), Xd = as(eg), tg = {
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
}, ng = {
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
}, sg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function rg(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = sg[e]) ? !!t[e] : !1;
}
function Du() {
  return rg;
}
var lg = un({}, Go, { key: function(e) {
  if (e.key) {
    var t = tg[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ia(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ng[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Du, charCode: function(e) {
  return e.type === "keypress" ? Ia(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ia(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), og = as(lg), ag = un({}, gi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Gd = as(ag), ig = un({}, Go, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Du }), cg = as(ig), ug = un({}, Yl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), dg = as(ug), hg = un({}, gi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), fg = as(hg), pg = [9, 13, 27, 32], Pu = Gs && "CompositionEvent" in window, wo = null;
Gs && "documentMode" in document && (wo = document.documentMode);
var mg = Gs && "TextEvent" in window && !wo, Kf = Gs && (!Pu || wo && 8 < wo && 11 >= wo), Qd = " ", Jd = !1;
function Vf(e, t) {
  switch (e) {
    case "keyup":
      return pg.indexOf(t.keyCode) !== -1;
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
function Yf(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var vl = !1;
function gg(e, t) {
  switch (e) {
    case "compositionend":
      return Yf(t);
    case "keypress":
      return t.which !== 32 ? null : (Jd = !0, Qd);
    case "textInput":
      return e = t.data, e === Qd && Jd ? null : e;
    default:
      return null;
  }
}
function xg(e, t) {
  if (vl) return e === "compositionend" || !Pu && Vf(e, t) ? (e = zf(), Ma = Lu = Nr = null, vl = !1, e) : null;
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
      return Kf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var yg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function qd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!yg[e.type] : t === "textarea";
}
function Xf(e, t, n, r) {
  Ef(r), t = Xa(t, "onChange"), 0 < t.length && (n = new Ou("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var jo = null, Oo = null;
function vg(e) {
  lp(e, 0);
}
function xi(e) {
  var t = wl(e);
  if (yf(t)) return e;
}
function Ng(e, t) {
  if (e === "change") return t;
}
var Gf = !1;
if (Gs) {
  var Vi;
  if (Gs) {
    var Yi = "oninput" in document;
    if (!Yi) {
      var Zd = document.createElement("div");
      Zd.setAttribute("oninput", "return;"), Yi = typeof Zd.oninput == "function";
    }
    Vi = Yi;
  } else Vi = !1;
  Gf = Vi && (!document.documentMode || 9 < document.documentMode);
}
function eh() {
  jo && (jo.detachEvent("onpropertychange", Qf), Oo = jo = null);
}
function Qf(e) {
  if (e.propertyName === "value" && xi(Oo)) {
    var t = [];
    Xf(t, Oo, e, Iu(e)), If(vg, t);
  }
}
function kg(e, t, n) {
  e === "focusin" ? (eh(), jo = t, Oo = n, jo.attachEvent("onpropertychange", Qf)) : e === "focusout" && eh();
}
function wg(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return xi(Oo);
}
function jg(e, t) {
  if (e === "click") return xi(t);
}
function Cg(e, t) {
  if (e === "input" || e === "change") return xi(t);
}
function Eg(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Is = typeof Object.is == "function" ? Object.is : Eg;
function Do(e, t) {
  if (Is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!gc.call(t, l) || !Is(e[l], t[l])) return !1;
  }
  return !0;
}
function th(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function nh(e, t) {
  var n = th(e);
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
    n = th(n);
  }
}
function Jf(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Jf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function qf() {
  for (var e = window, t = Fa(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Fa(e.document);
  }
  return t;
}
function _u(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Sg(e) {
  var t = qf(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Jf(n.ownerDocument.documentElement, n)) {
    if (r !== null && _u(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = nh(n, o);
        var a = nh(
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
var bg = Gs && "documentMode" in document && 11 >= document.documentMode, Nl = null, Oc = null, Co = null, Dc = !1;
function sh(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Dc || Nl == null || Nl !== Fa(r) || (r = Nl, "selectionStart" in r && _u(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Co && Do(Co, r) || (Co = r, r = Xa(Oc, "onSelect"), 0 < r.length && (t = new Ou("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Nl)));
}
function ha(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var kl = { animationend: ha("Animation", "AnimationEnd"), animationiteration: ha("Animation", "AnimationIteration"), animationstart: ha("Animation", "AnimationStart"), transitionend: ha("Transition", "TransitionEnd") }, Xi = {}, Zf = {};
Gs && (Zf = document.createElement("div").style, "AnimationEvent" in window || (delete kl.animationend.animation, delete kl.animationiteration.animation, delete kl.animationstart.animation), "TransitionEvent" in window || delete kl.transitionend.transition);
function yi(e) {
  if (Xi[e]) return Xi[e];
  if (!kl[e]) return e;
  var t = kl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Zf) return Xi[e] = t[n];
  return e;
}
var ep = yi("animationend"), tp = yi("animationiteration"), np = yi("animationstart"), sp = yi("transitionend"), rp = /* @__PURE__ */ new Map(), rh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ar(e, t) {
  rp.set(e, t), al(t, [e]);
}
for (var Gi = 0; Gi < rh.length; Gi++) {
  var Qi = rh[Gi], Mg = Qi.toLowerCase(), Ig = Qi[0].toUpperCase() + Qi.slice(1);
  Ar(Mg, "on" + Ig);
}
Ar(ep, "onAnimationEnd");
Ar(tp, "onAnimationIteration");
Ar(np, "onAnimationStart");
Ar("dblclick", "onDoubleClick");
Ar("focusin", "onFocus");
Ar("focusout", "onBlur");
Ar(sp, "onTransitionEnd");
Bl("onMouseEnter", ["mouseout", "mouseover"]);
Bl("onMouseLeave", ["mouseout", "mouseover"]);
Bl("onPointerEnter", ["pointerout", "pointerover"]);
Bl("onPointerLeave", ["pointerout", "pointerover"]);
al("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
al("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
al("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
al("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
al("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
al("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var yo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Tg = new Set("cancel close invalid load scroll toggle".split(" ").concat(yo));
function lh(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, M0(r, t, void 0, e), e.currentTarget = null;
}
function lp(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var c = r[a], u = c.instance, h = c.currentTarget;
        if (c = c.listener, u !== o && l.isPropagationStopped()) break e;
        lh(l, c, h), o = u;
      }
      else for (a = 0; a < r.length; a++) {
        if (c = r[a], u = c.instance, h = c.currentTarget, c = c.listener, u !== o && l.isPropagationStopped()) break e;
        lh(l, c, h), o = u;
      }
    }
  }
  if (Ha) throw e = $c, Ha = !1, $c = null, e;
}
function sn(e, t) {
  var n = t[Fc];
  n === void 0 && (n = t[Fc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (op(t, e, 2, !1), n.add(r));
}
function Ji(e, t, n) {
  var r = 0;
  t && (r |= 4), op(n, e, r, t);
}
var fa = "_reactListening" + Math.random().toString(36).slice(2);
function Po(e) {
  if (!e[fa]) {
    e[fa] = !0, ff.forEach(function(n) {
      n !== "selectionchange" && (Tg.has(n) || Ji(n, !1, e), Ji(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[fa] || (t[fa] = !0, Ji("selectionchange", !1, t));
  }
}
function op(e, t, n, r) {
  switch (Hf(t)) {
    case 1:
      var l = z0;
      break;
    case 4:
      l = K0;
      break;
    default:
      l = Ru;
  }
  n = l.bind(null, t, n, e), l = void 0, !Tc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function qi(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var a = r.tag;
    if (a === 3 || a === 4) {
      var c = r.stateNode.containerInfo;
      if (c === l || c.nodeType === 8 && c.parentNode === l) break;
      if (a === 4) for (a = r.return; a !== null; ) {
        var u = a.tag;
        if ((u === 3 || u === 4) && (u = a.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        a = a.return;
      }
      for (; c !== null; ) {
        if (a = Xr(c), a === null) return;
        if (u = a.tag, u === 5 || u === 6) {
          r = o = a;
          continue e;
        }
        c = c.parentNode;
      }
    }
    r = r.return;
  }
  If(function() {
    var h = o, y = Iu(n), p = [];
    e: {
      var f = rp.get(e);
      if (f !== void 0) {
        var v = Ou, b = e;
        switch (e) {
          case "keypress":
            if (Ia(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = og;
            break;
          case "focusin":
            b = "focus", v = Ki;
            break;
          case "focusout":
            b = "blur", v = Ki;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ki;
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
            v = Yd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = X0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = cg;
            break;
          case ep:
          case tp:
          case np:
            v = J0;
            break;
          case sp:
            v = dg;
            break;
          case "scroll":
            v = V0;
            break;
          case "wheel":
            v = fg;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Z0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Gd;
        }
        var E = (t & 4) !== 0, D = !E && e === "scroll", k = E ? f !== null ? f + "Capture" : null : f;
        E = [];
        for (var m = h, j; m !== null; ) {
          j = m;
          var M = j.stateNode;
          if (j.tag === 5 && M !== null && (j = M, k !== null && (M = $o(m, k), M != null && E.push(_o(m, M, j)))), D) break;
          m = m.return;
        }
        0 < E.length && (f = new v(f, b, null, n, y), p.push({ event: f, listeners: E }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (f = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", f && n !== Mc && (b = n.relatedTarget || n.fromElement) && (Xr(b) || b[Qs])) break e;
        if ((v || f) && (f = y.window === y ? y : (f = y.ownerDocument) ? f.defaultView || f.parentWindow : window, v ? (b = n.relatedTarget || n.toElement, v = h, b = b ? Xr(b) : null, b !== null && (D = il(b), b !== D || b.tag !== 5 && b.tag !== 6) && (b = null)) : (v = null, b = h), v !== b)) {
          if (E = Yd, M = "onMouseLeave", k = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (E = Gd, M = "onPointerLeave", k = "onPointerEnter", m = "pointer"), D = v == null ? f : wl(v), j = b == null ? f : wl(b), f = new E(M, m + "leave", v, n, y), f.target = D, f.relatedTarget = j, M = null, Xr(y) === h && (E = new E(k, m + "enter", b, n, y), E.target = j, E.relatedTarget = D, M = E), D = M, v && b) t: {
            for (E = v, k = b, m = 0, j = E; j; j = dl(j)) m++;
            for (j = 0, M = k; M; M = dl(M)) j++;
            for (; 0 < m - j; ) E = dl(E), m--;
            for (; 0 < j - m; ) k = dl(k), j--;
            for (; m--; ) {
              if (E === k || k !== null && E === k.alternate) break t;
              E = dl(E), k = dl(k);
            }
            E = null;
          }
          else E = null;
          v !== null && oh(p, f, v, E, !1), b !== null && D !== null && oh(p, D, b, E, !0);
        }
      }
      e: {
        if (f = h ? wl(h) : window, v = f.nodeName && f.nodeName.toLowerCase(), v === "select" || v === "input" && f.type === "file") var S = Ng;
        else if (qd(f)) if (Gf) S = Cg;
        else {
          S = wg;
          var C = kg;
        }
        else (v = f.nodeName) && v.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (S = jg);
        if (S && (S = S(e, h))) {
          Xf(p, S, n, y);
          break e;
        }
        C && C(e, f, h), e === "focusout" && (C = f._wrapperState) && C.controlled && f.type === "number" && jc(f, "number", f.value);
      }
      switch (C = h ? wl(h) : window, e) {
        case "focusin":
          (qd(C) || C.contentEditable === "true") && (Nl = C, Oc = h, Co = null);
          break;
        case "focusout":
          Co = Oc = Nl = null;
          break;
        case "mousedown":
          Dc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Dc = !1, sh(p, n, y);
          break;
        case "selectionchange":
          if (bg) break;
        case "keydown":
        case "keyup":
          sh(p, n, y);
      }
      var N;
      if (Pu) e: {
        switch (e) {
          case "compositionstart":
            var g = "onCompositionStart";
            break e;
          case "compositionend":
            g = "onCompositionEnd";
            break e;
          case "compositionupdate":
            g = "onCompositionUpdate";
            break e;
        }
        g = void 0;
      }
      else vl ? Vf(e, n) && (g = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (g = "onCompositionStart");
      g && (Kf && n.locale !== "ko" && (vl || g !== "onCompositionStart" ? g === "onCompositionEnd" && vl && (N = zf()) : (Nr = y, Lu = "value" in Nr ? Nr.value : Nr.textContent, vl = !0)), C = Xa(h, g), 0 < C.length && (g = new Xd(g, e, null, n, y), p.push({ event: g, listeners: C }), N ? g.data = N : (N = Yf(n), N !== null && (g.data = N)))), (N = mg ? gg(e, n) : xg(e, n)) && (h = Xa(h, "onBeforeInput"), 0 < h.length && (y = new Xd("onBeforeInput", "beforeinput", null, n, y), p.push({ event: y, listeners: h }), y.data = N));
    }
    lp(p, t);
  });
}
function _o(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Xa(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = $o(e, n), o != null && r.unshift(_o(e, o, l)), o = $o(e, t), o != null && r.push(_o(e, o, l))), e = e.return;
  }
  return r;
}
function dl(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function oh(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var c = n, u = c.alternate, h = c.stateNode;
    if (u !== null && u === r) break;
    c.tag === 5 && h !== null && (c = h, l ? (u = $o(n, o), u != null && a.unshift(_o(n, u, c))) : l || (u = $o(n, o), u != null && a.push(_o(n, u, c)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var $g = /\r\n?/g, Ag = /\u0000|\uFFFD/g;
function ah(e) {
  return (typeof e == "string" ? e : "" + e).replace($g, `
`).replace(Ag, "");
}
function pa(e, t, n) {
  if (t = ah(t), ah(e) !== t && n) throw Error(Te(425));
}
function Ga() {
}
var Pc = null, _c = null;
function Bc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Wc = typeof setTimeout == "function" ? setTimeout : void 0, Rg = typeof clearTimeout == "function" ? clearTimeout : void 0, ih = typeof Promise == "function" ? Promise : void 0, Lg = typeof queueMicrotask == "function" ? queueMicrotask : typeof ih < "u" ? function(e) {
  return ih.resolve(null).then(e).catch(Og);
} : Wc;
function Og(e) {
  setTimeout(function() {
    throw e;
  });
}
function Zi(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Lo(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Lo(t);
}
function Er(e) {
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
function ch(e) {
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
var Xl = Math.random().toString(36).slice(2), Os = "__reactFiber$" + Xl, Bo = "__reactProps$" + Xl, Qs = "__reactContainer$" + Xl, Fc = "__reactEvents$" + Xl, Dg = "__reactListeners$" + Xl, Pg = "__reactHandles$" + Xl;
function Xr(e) {
  var t = e[Os];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Qs] || n[Os]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ch(e); e !== null; ) {
        if (n = e[Os]) return n;
        e = ch(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Qo(e) {
  return e = e[Os] || e[Qs], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function wl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Te(33));
}
function vi(e) {
  return e[Bo] || null;
}
var Uc = [], jl = -1;
function Rr(e) {
  return { current: e };
}
function rn(e) {
  0 > jl || (e.current = Uc[jl], Uc[jl] = null, jl--);
}
function en(e, t) {
  jl++, Uc[jl] = e.current, e.current = t;
}
var $r = {}, Rn = Rr($r), Xn = Rr(!1), nl = $r;
function Wl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return $r;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Gn(e) {
  return e = e.childContextTypes, e != null;
}
function Qa() {
  rn(Xn), rn(Rn);
}
function uh(e, t, n) {
  if (Rn.current !== $r) throw Error(Te(168));
  en(Rn, t), en(Xn, n);
}
function ap(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(Te(108, k0(e) || "Unknown", l));
  return un({}, n, r);
}
function Ja(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || $r, nl = Rn.current, en(Rn, e), en(Xn, Xn.current), !0;
}
function dh(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(Te(169));
  n ? (e = ap(e, t, nl), r.__reactInternalMemoizedMergedChildContext = e, rn(Xn), rn(Rn), en(Rn, e)) : rn(Xn), en(Xn, n);
}
var Hs = null, Ni = !1, ec = !1;
function ip(e) {
  Hs === null ? Hs = [e] : Hs.push(e);
}
function _g(e) {
  Ni = !0, ip(e);
}
function Lr() {
  if (!ec && Hs !== null) {
    ec = !0;
    var e = 0, t = Ht;
    try {
      var n = Hs;
      for (Ht = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Hs = null, Ni = !1;
    } catch (l) {
      throw Hs !== null && (Hs = Hs.slice(e + 1)), Rf(Tu, Lr), l;
    } finally {
      Ht = t, ec = !1;
    }
  }
  return null;
}
var Cl = [], El = 0, qa = null, Za = 0, fs = [], ps = 0, sl = null, Ks = 1, Vs = "";
function zr(e, t) {
  Cl[El++] = Za, Cl[El++] = qa, qa = e, Za = t;
}
function cp(e, t, n) {
  fs[ps++] = Ks, fs[ps++] = Vs, fs[ps++] = sl, sl = e;
  var r = Ks;
  e = Vs;
  var l = 32 - bs(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - bs(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, Ks = 1 << 32 - bs(t) + l | n << l | r, Vs = o + e;
  } else Ks = 1 << o | n << l | r, Vs = e;
}
function Bu(e) {
  e.return !== null && (zr(e, 1), cp(e, 1, 0));
}
function Wu(e) {
  for (; e === qa; ) qa = Cl[--El], Cl[El] = null, Za = Cl[--El], Cl[El] = null;
  for (; e === sl; ) sl = fs[--ps], fs[ps] = null, Vs = fs[--ps], fs[ps] = null, Ks = fs[--ps], fs[ps] = null;
}
var rs = null, ss = null, ln = !1, Es = null;
function up(e, t) {
  var n = ms(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function hh(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, rs = e, ss = Er(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, rs = e, ss = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = sl !== null ? { id: Ks, overflow: Vs } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ms(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, rs = e, ss = null, !0) : !1;
    default:
      return !1;
  }
}
function Hc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function zc(e) {
  if (ln) {
    var t = ss;
    if (t) {
      var n = t;
      if (!hh(e, t)) {
        if (Hc(e)) throw Error(Te(418));
        t = Er(n.nextSibling);
        var r = rs;
        t && hh(e, t) ? up(r, n) : (e.flags = e.flags & -4097 | 2, ln = !1, rs = e);
      }
    } else {
      if (Hc(e)) throw Error(Te(418));
      e.flags = e.flags & -4097 | 2, ln = !1, rs = e;
    }
  }
}
function fh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  rs = e;
}
function ma(e) {
  if (e !== rs) return !1;
  if (!ln) return fh(e), ln = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Bc(e.type, e.memoizedProps)), t && (t = ss)) {
    if (Hc(e)) throw dp(), Error(Te(418));
    for (; t; ) up(e, t), t = Er(t.nextSibling);
  }
  if (fh(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(Te(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ss = Er(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ss = null;
    }
  } else ss = rs ? Er(e.stateNode.nextSibling) : null;
  return !0;
}
function dp() {
  for (var e = ss; e; ) e = Er(e.nextSibling);
}
function Fl() {
  ss = rs = null, ln = !1;
}
function Fu(e) {
  Es === null ? Es = [e] : Es.push(e);
}
var Bg = Zs.ReactCurrentBatchConfig;
function ao(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(Te(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(Te(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var c = l.refs;
        a === null ? delete c[o] : c[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(Te(284));
    if (!n._owner) throw Error(Te(290, e));
  }
  return e;
}
function ga(e, t) {
  throw e = Object.prototype.toString.call(t), Error(Te(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ph(e) {
  var t = e._init;
  return t(e._payload);
}
function hp(e) {
  function t(k, m) {
    if (e) {
      var j = k.deletions;
      j === null ? (k.deletions = [m], k.flags |= 16) : j.push(m);
    }
  }
  function n(k, m) {
    if (!e) return null;
    for (; m !== null; ) t(k, m), m = m.sibling;
    return null;
  }
  function r(k, m) {
    for (k = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? k.set(m.key, m) : k.set(m.index, m), m = m.sibling;
    return k;
  }
  function l(k, m) {
    return k = Ir(k, m), k.index = 0, k.sibling = null, k;
  }
  function o(k, m, j) {
    return k.index = j, e ? (j = k.alternate, j !== null ? (j = j.index, j < m ? (k.flags |= 2, m) : j) : (k.flags |= 2, m)) : (k.flags |= 1048576, m);
  }
  function a(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function c(k, m, j, M) {
    return m === null || m.tag !== 6 ? (m = ac(j, k.mode, M), m.return = k, m) : (m = l(m, j), m.return = k, m);
  }
  function u(k, m, j, M) {
    var S = j.type;
    return S === yl ? y(k, m, j.props.children, M, j.key) : m !== null && (m.elementType === S || typeof S == "object" && S !== null && S.$$typeof === fr && ph(S) === m.type) ? (M = l(m, j.props), M.ref = ao(k, m, j), M.return = k, M) : (M = Da(j.type, j.key, j.props, null, k.mode, M), M.ref = ao(k, m, j), M.return = k, M);
  }
  function h(k, m, j, M) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== j.containerInfo || m.stateNode.implementation !== j.implementation ? (m = ic(j, k.mode, M), m.return = k, m) : (m = l(m, j.children || []), m.return = k, m);
  }
  function y(k, m, j, M, S) {
    return m === null || m.tag !== 7 ? (m = el(j, k.mode, M, S), m.return = k, m) : (m = l(m, j), m.return = k, m);
  }
  function p(k, m, j) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = ac("" + m, k.mode, j), m.return = k, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case la:
          return j = Da(m.type, m.key, m.props, null, k.mode, j), j.ref = ao(k, null, m), j.return = k, j;
        case xl:
          return m = ic(m, k.mode, j), m.return = k, m;
        case fr:
          var M = m._init;
          return p(k, M(m._payload), j);
      }
      if (go(m) || no(m)) return m = el(m, k.mode, j, null), m.return = k, m;
      ga(k, m);
    }
    return null;
  }
  function f(k, m, j, M) {
    var S = m !== null ? m.key : null;
    if (typeof j == "string" && j !== "" || typeof j == "number") return S !== null ? null : c(k, m, "" + j, M);
    if (typeof j == "object" && j !== null) {
      switch (j.$$typeof) {
        case la:
          return j.key === S ? u(k, m, j, M) : null;
        case xl:
          return j.key === S ? h(k, m, j, M) : null;
        case fr:
          return S = j._init, f(
            k,
            m,
            S(j._payload),
            M
          );
      }
      if (go(j) || no(j)) return S !== null ? null : y(k, m, j, M, null);
      ga(k, j);
    }
    return null;
  }
  function v(k, m, j, M, S) {
    if (typeof M == "string" && M !== "" || typeof M == "number") return k = k.get(j) || null, c(m, k, "" + M, S);
    if (typeof M == "object" && M !== null) {
      switch (M.$$typeof) {
        case la:
          return k = k.get(M.key === null ? j : M.key) || null, u(m, k, M, S);
        case xl:
          return k = k.get(M.key === null ? j : M.key) || null, h(m, k, M, S);
        case fr:
          var C = M._init;
          return v(k, m, j, C(M._payload), S);
      }
      if (go(M) || no(M)) return k = k.get(j) || null, y(m, k, M, S, null);
      ga(m, M);
    }
    return null;
  }
  function b(k, m, j, M) {
    for (var S = null, C = null, N = m, g = m = 0, $ = null; N !== null && g < j.length; g++) {
      N.index > g ? ($ = N, N = null) : $ = N.sibling;
      var w = f(k, N, j[g], M);
      if (w === null) {
        N === null && (N = $);
        break;
      }
      e && N && w.alternate === null && t(k, N), m = o(w, m, g), C === null ? S = w : C.sibling = w, C = w, N = $;
    }
    if (g === j.length) return n(k, N), ln && zr(k, g), S;
    if (N === null) {
      for (; g < j.length; g++) N = p(k, j[g], M), N !== null && (m = o(N, m, g), C === null ? S = N : C.sibling = N, C = N);
      return ln && zr(k, g), S;
    }
    for (N = r(k, N); g < j.length; g++) $ = v(N, k, g, j[g], M), $ !== null && (e && $.alternate !== null && N.delete($.key === null ? g : $.key), m = o($, m, g), C === null ? S = $ : C.sibling = $, C = $);
    return e && N.forEach(function(_) {
      return t(k, _);
    }), ln && zr(k, g), S;
  }
  function E(k, m, j, M) {
    var S = no(j);
    if (typeof S != "function") throw Error(Te(150));
    if (j = S.call(j), j == null) throw Error(Te(151));
    for (var C = S = null, N = m, g = m = 0, $ = null, w = j.next(); N !== null && !w.done; g++, w = j.next()) {
      N.index > g ? ($ = N, N = null) : $ = N.sibling;
      var _ = f(k, N, w.value, M);
      if (_ === null) {
        N === null && (N = $);
        break;
      }
      e && N && _.alternate === null && t(k, N), m = o(_, m, g), C === null ? S = _ : C.sibling = _, C = _, N = $;
    }
    if (w.done) return n(
      k,
      N
    ), ln && zr(k, g), S;
    if (N === null) {
      for (; !w.done; g++, w = j.next()) w = p(k, w.value, M), w !== null && (m = o(w, m, g), C === null ? S = w : C.sibling = w, C = w);
      return ln && zr(k, g), S;
    }
    for (N = r(k, N); !w.done; g++, w = j.next()) w = v(N, k, g, w.value, M), w !== null && (e && w.alternate !== null && N.delete(w.key === null ? g : w.key), m = o(w, m, g), C === null ? S = w : C.sibling = w, C = w);
    return e && N.forEach(function(G) {
      return t(k, G);
    }), ln && zr(k, g), S;
  }
  function D(k, m, j, M) {
    if (typeof j == "object" && j !== null && j.type === yl && j.key === null && (j = j.props.children), typeof j == "object" && j !== null) {
      switch (j.$$typeof) {
        case la:
          e: {
            for (var S = j.key, C = m; C !== null; ) {
              if (C.key === S) {
                if (S = j.type, S === yl) {
                  if (C.tag === 7) {
                    n(k, C.sibling), m = l(C, j.props.children), m.return = k, k = m;
                    break e;
                  }
                } else if (C.elementType === S || typeof S == "object" && S !== null && S.$$typeof === fr && ph(S) === C.type) {
                  n(k, C.sibling), m = l(C, j.props), m.ref = ao(k, C, j), m.return = k, k = m;
                  break e;
                }
                n(k, C);
                break;
              } else t(k, C);
              C = C.sibling;
            }
            j.type === yl ? (m = el(j.props.children, k.mode, M, j.key), m.return = k, k = m) : (M = Da(j.type, j.key, j.props, null, k.mode, M), M.ref = ao(k, m, j), M.return = k, k = M);
          }
          return a(k);
        case xl:
          e: {
            for (C = j.key; m !== null; ) {
              if (m.key === C) if (m.tag === 4 && m.stateNode.containerInfo === j.containerInfo && m.stateNode.implementation === j.implementation) {
                n(k, m.sibling), m = l(m, j.children || []), m.return = k, k = m;
                break e;
              } else {
                n(k, m);
                break;
              }
              else t(k, m);
              m = m.sibling;
            }
            m = ic(j, k.mode, M), m.return = k, k = m;
          }
          return a(k);
        case fr:
          return C = j._init, D(k, m, C(j._payload), M);
      }
      if (go(j)) return b(k, m, j, M);
      if (no(j)) return E(k, m, j, M);
      ga(k, j);
    }
    return typeof j == "string" && j !== "" || typeof j == "number" ? (j = "" + j, m !== null && m.tag === 6 ? (n(k, m.sibling), m = l(m, j), m.return = k, k = m) : (n(k, m), m = ac(j, k.mode, M), m.return = k, k = m), a(k)) : n(k, m);
  }
  return D;
}
var Ul = hp(!0), fp = hp(!1), ei = Rr(null), ti = null, Sl = null, Uu = null;
function Hu() {
  Uu = Sl = ti = null;
}
function zu(e) {
  var t = ei.current;
  rn(ei), e._currentValue = t;
}
function Kc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Ll(e, t) {
  ti = e, Uu = Sl = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Yn = !0), e.firstContext = null);
}
function xs(e) {
  var t = e._currentValue;
  if (Uu !== e) if (e = { context: e, memoizedValue: t, next: null }, Sl === null) {
    if (ti === null) throw Error(Te(308));
    Sl = e, ti.dependencies = { lanes: 0, firstContext: e };
  } else Sl = Sl.next = e;
  return t;
}
var Gr = null;
function Ku(e) {
  Gr === null ? Gr = [e] : Gr.push(e);
}
function pp(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ku(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Js(e, r);
}
function Js(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var pr = !1;
function Vu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function mp(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ys(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Sr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, Pt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Js(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ku(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Js(e, n);
}
function Ta(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, $u(e, n);
  }
}
function mh(e, t) {
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
function ni(e, t, n, r) {
  var l = e.updateQueue;
  pr = !1;
  var o = l.firstBaseUpdate, a = l.lastBaseUpdate, c = l.shared.pending;
  if (c !== null) {
    l.shared.pending = null;
    var u = c, h = u.next;
    u.next = null, a === null ? o = h : a.next = h, a = u;
    var y = e.alternate;
    y !== null && (y = y.updateQueue, c = y.lastBaseUpdate, c !== a && (c === null ? y.firstBaseUpdate = h : c.next = h, y.lastBaseUpdate = u));
  }
  if (o !== null) {
    var p = l.baseState;
    a = 0, y = h = u = null, c = o;
    do {
      var f = c.lane, v = c.eventTime;
      if ((r & f) === f) {
        y !== null && (y = y.next = {
          eventTime: v,
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        });
        e: {
          var b = e, E = c;
          switch (f = t, v = n, E.tag) {
            case 1:
              if (b = E.payload, typeof b == "function") {
                p = b.call(v, p, f);
                break e;
              }
              p = b;
              break e;
            case 3:
              b.flags = b.flags & -65537 | 128;
            case 0:
              if (b = E.payload, f = typeof b == "function" ? b.call(v, p, f) : b, f == null) break e;
              p = un({}, p, f);
              break e;
            case 2:
              pr = !0;
          }
        }
        c.callback !== null && c.lane !== 0 && (e.flags |= 64, f = l.effects, f === null ? l.effects = [c] : f.push(c));
      } else v = { eventTime: v, lane: f, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, y === null ? (h = y = v, u = p) : y = y.next = v, a |= f;
      if (c = c.next, c === null) {
        if (c = l.shared.pending, c === null) break;
        f = c, c = f.next, f.next = null, l.lastBaseUpdate = f, l.shared.pending = null;
      }
    } while (!0);
    if (y === null && (u = p), l.baseState = u, l.firstBaseUpdate = h, l.lastBaseUpdate = y, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        a |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    ll |= a, e.lanes = a, e.memoizedState = p;
  }
}
function gh(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(Te(191, l));
      l.call(r);
    }
  }
}
var Jo = {}, _s = Rr(Jo), Wo = Rr(Jo), Fo = Rr(Jo);
function Qr(e) {
  if (e === Jo) throw Error(Te(174));
  return e;
}
function Yu(e, t) {
  switch (en(Fo, t), en(Wo, e), en(_s, Jo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ec(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ec(t, e);
  }
  rn(_s), en(_s, t);
}
function Hl() {
  rn(_s), rn(Wo), rn(Fo);
}
function gp(e) {
  Qr(Fo.current);
  var t = Qr(_s.current), n = Ec(t, e.type);
  t !== n && (en(Wo, e), en(_s, n));
}
function Xu(e) {
  Wo.current === e && (rn(_s), rn(Wo));
}
var an = Rr(0);
function si(e) {
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
var tc = [];
function Gu() {
  for (var e = 0; e < tc.length; e++) tc[e]._workInProgressVersionPrimary = null;
  tc.length = 0;
}
var $a = Zs.ReactCurrentDispatcher, nc = Zs.ReactCurrentBatchConfig, rl = 0, cn = null, vn = null, jn = null, ri = !1, Eo = !1, Uo = 0, Wg = 0;
function Tn() {
  throw Error(Te(321));
}
function Qu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Is(e[n], t[n])) return !1;
  return !0;
}
function Ju(e, t, n, r, l, o) {
  if (rl = o, cn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $a.current = e === null || e.memoizedState === null ? zg : Kg, e = n(r, l), Eo) {
    o = 0;
    do {
      if (Eo = !1, Uo = 0, 25 <= o) throw Error(Te(301));
      o += 1, jn = vn = null, t.updateQueue = null, $a.current = Vg, e = n(r, l);
    } while (Eo);
  }
  if ($a.current = li, t = vn !== null && vn.next !== null, rl = 0, jn = vn = cn = null, ri = !1, t) throw Error(Te(300));
  return e;
}
function qu() {
  var e = Uo !== 0;
  return Uo = 0, e;
}
function Ls() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return jn === null ? cn.memoizedState = jn = e : jn = jn.next = e, jn;
}
function ys() {
  if (vn === null) {
    var e = cn.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = vn.next;
  var t = jn === null ? cn.memoizedState : jn.next;
  if (t !== null) jn = t, vn = e;
  else {
    if (e === null) throw Error(Te(310));
    vn = e, e = { memoizedState: vn.memoizedState, baseState: vn.baseState, baseQueue: vn.baseQueue, queue: vn.queue, next: null }, jn === null ? cn.memoizedState = jn = e : jn = jn.next = e;
  }
  return jn;
}
function Ho(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function sc(e) {
  var t = ys(), n = t.queue;
  if (n === null) throw Error(Te(311));
  n.lastRenderedReducer = e;
  var r = vn, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var a = l.next;
      l.next = o.next, o.next = a;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var c = a = null, u = null, h = o;
    do {
      var y = h.lane;
      if ((rl & y) === y) u !== null && (u = u.next = { lane: 0, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }), r = h.hasEagerState ? h.eagerState : e(r, h.action);
      else {
        var p = {
          lane: y,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        };
        u === null ? (c = u = p, a = r) : u = u.next = p, cn.lanes |= y, ll |= y;
      }
      h = h.next;
    } while (h !== null && h !== o);
    u === null ? a = r : u.next = c, Is(r, t.memoizedState) || (Yn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, cn.lanes |= o, ll |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function rc(e) {
  var t = ys(), n = t.queue;
  if (n === null) throw Error(Te(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Is(o, t.memoizedState) || (Yn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function xp() {
}
function yp(e, t) {
  var n = cn, r = ys(), l = t(), o = !Is(r.memoizedState, l);
  if (o && (r.memoizedState = l, Yn = !0), r = r.queue, Zu(kp.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || jn !== null && jn.memoizedState.tag & 1) {
    if (n.flags |= 2048, zo(9, Np.bind(null, n, r, l, t), void 0, null), Cn === null) throw Error(Te(349));
    rl & 30 || vp(n, t, l);
  }
  return l;
}
function vp(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = cn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, cn.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Np(e, t, n, r) {
  t.value = n, t.getSnapshot = r, wp(t) && jp(e);
}
function kp(e, t, n) {
  return n(function() {
    wp(t) && jp(e);
  });
}
function wp(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Is(e, n);
  } catch {
    return !0;
  }
}
function jp(e) {
  var t = Js(e, 1);
  t !== null && Ms(t, e, 1, -1);
}
function xh(e) {
  var t = Ls();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ho, lastRenderedState: e }, t.queue = e, e = e.dispatch = Hg.bind(null, cn, e), [t.memoizedState, e];
}
function zo(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = cn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, cn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Cp() {
  return ys().memoizedState;
}
function Aa(e, t, n, r) {
  var l = Ls();
  cn.flags |= e, l.memoizedState = zo(1 | t, n, void 0, r === void 0 ? null : r);
}
function ki(e, t, n, r) {
  var l = ys();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (vn !== null) {
    var a = vn.memoizedState;
    if (o = a.destroy, r !== null && Qu(r, a.deps)) {
      l.memoizedState = zo(t, n, o, r);
      return;
    }
  }
  cn.flags |= e, l.memoizedState = zo(1 | t, n, o, r);
}
function yh(e, t) {
  return Aa(8390656, 8, e, t);
}
function Zu(e, t) {
  return ki(2048, 8, e, t);
}
function Ep(e, t) {
  return ki(4, 2, e, t);
}
function Sp(e, t) {
  return ki(4, 4, e, t);
}
function bp(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Mp(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ki(4, 4, bp.bind(null, t, e), n);
}
function ed() {
}
function Ip(e, t) {
  var n = ys();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Qu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Tp(e, t) {
  var n = ys();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Qu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function $p(e, t, n) {
  return rl & 21 ? (Is(n, t) || (n = Df(), cn.lanes |= n, ll |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Yn = !0), e.memoizedState = n);
}
function Fg(e, t) {
  var n = Ht;
  Ht = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = nc.transition;
  nc.transition = {};
  try {
    e(!1), t();
  } finally {
    Ht = n, nc.transition = r;
  }
}
function Ap() {
  return ys().memoizedState;
}
function Ug(e, t, n) {
  var r = Mr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Rp(e)) Lp(t, n);
  else if (n = pp(e, t, n, r), n !== null) {
    var l = Bn();
    Ms(n, e, r, l), Op(n, t, r);
  }
}
function Hg(e, t, n) {
  var r = Mr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Rp(e)) Lp(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, c = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = c, Is(c, a)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Ku(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = pp(e, t, l, r), n !== null && (l = Bn(), Ms(n, e, r, l), Op(n, t, r));
  }
}
function Rp(e) {
  var t = e.alternate;
  return e === cn || t !== null && t === cn;
}
function Lp(e, t) {
  Eo = ri = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Op(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, $u(e, n);
  }
}
var li = { readContext: xs, useCallback: Tn, useContext: Tn, useEffect: Tn, useImperativeHandle: Tn, useInsertionEffect: Tn, useLayoutEffect: Tn, useMemo: Tn, useReducer: Tn, useRef: Tn, useState: Tn, useDebugValue: Tn, useDeferredValue: Tn, useTransition: Tn, useMutableSource: Tn, useSyncExternalStore: Tn, useId: Tn, unstable_isNewReconciler: !1 }, zg = { readContext: xs, useCallback: function(e, t) {
  return Ls().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: xs, useEffect: yh, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Aa(
    4194308,
    4,
    bp.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Aa(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Aa(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ls();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ls();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Ug.bind(null, cn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ls();
  return e = { current: e }, t.memoizedState = e;
}, useState: xh, useDebugValue: ed, useDeferredValue: function(e) {
  return Ls().memoizedState = e;
}, useTransition: function() {
  var e = xh(!1), t = e[0];
  return e = Fg.bind(null, e[1]), Ls().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = cn, l = Ls();
  if (ln) {
    if (n === void 0) throw Error(Te(407));
    n = n();
  } else {
    if (n = t(), Cn === null) throw Error(Te(349));
    rl & 30 || vp(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, yh(kp.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, zo(9, Np.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ls(), t = Cn.identifierPrefix;
  if (ln) {
    var n = Vs, r = Ks;
    n = (r & ~(1 << 32 - bs(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Uo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Wg++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Kg = {
  readContext: xs,
  useCallback: Ip,
  useContext: xs,
  useEffect: Zu,
  useImperativeHandle: Mp,
  useInsertionEffect: Ep,
  useLayoutEffect: Sp,
  useMemo: Tp,
  useReducer: sc,
  useRef: Cp,
  useState: function() {
    return sc(Ho);
  },
  useDebugValue: ed,
  useDeferredValue: function(e) {
    var t = ys();
    return $p(t, vn.memoizedState, e);
  },
  useTransition: function() {
    var e = sc(Ho)[0], t = ys().memoizedState;
    return [e, t];
  },
  useMutableSource: xp,
  useSyncExternalStore: yp,
  useId: Ap,
  unstable_isNewReconciler: !1
}, Vg = { readContext: xs, useCallback: Ip, useContext: xs, useEffect: Zu, useImperativeHandle: Mp, useInsertionEffect: Ep, useLayoutEffect: Sp, useMemo: Tp, useReducer: rc, useRef: Cp, useState: function() {
  return rc(Ho);
}, useDebugValue: ed, useDeferredValue: function(e) {
  var t = ys();
  return vn === null ? t.memoizedState = e : $p(t, vn.memoizedState, e);
}, useTransition: function() {
  var e = rc(Ho)[0], t = ys().memoizedState;
  return [e, t];
}, useMutableSource: xp, useSyncExternalStore: yp, useId: Ap, unstable_isNewReconciler: !1 };
function ws(e, t) {
  if (e && e.defaultProps) {
    t = un({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Vc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : un({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var wi = { isMounted: function(e) {
  return (e = e._reactInternals) ? il(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Bn(), l = Mr(e), o = Ys(r, l);
  o.payload = t, n != null && (o.callback = n), t = Sr(e, o, l), t !== null && (Ms(t, e, l, r), Ta(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Bn(), l = Mr(e), o = Ys(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Sr(e, o, l), t !== null && (Ms(t, e, l, r), Ta(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Bn(), r = Mr(e), l = Ys(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Sr(e, l, r), t !== null && (Ms(t, e, r, n), Ta(t, e, r));
} };
function vh(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !Do(n, r) || !Do(l, o) : !0;
}
function Dp(e, t, n) {
  var r = !1, l = $r, o = t.contextType;
  return typeof o == "object" && o !== null ? o = xs(o) : (l = Gn(t) ? nl : Rn.current, r = t.contextTypes, o = (r = r != null) ? Wl(e, l) : $r), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = wi, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Nh(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && wi.enqueueReplaceState(t, t.state, null);
}
function Yc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Vu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = xs(o) : (o = Gn(t) ? nl : Rn.current, l.context = Wl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Vc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && wi.enqueueReplaceState(l, l.state, null), ni(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function zl(e, t) {
  try {
    var n = "", r = t;
    do
      n += N0(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function lc(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Xc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Yg = typeof WeakMap == "function" ? WeakMap : Map;
function Pp(e, t, n) {
  n = Ys(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ai || (ai = !0, ru = r), Xc(e, t);
  }, n;
}
function _p(e, t, n) {
  n = Ys(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Xc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Xc(e, t), typeof r != "function" && (br === null ? br = /* @__PURE__ */ new Set([this]) : br.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function kh(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Yg();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = ax.bind(null, e, t, n), t.then(e, e));
}
function wh(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function jh(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ys(-1, 1), t.tag = 2, Sr(n, t, 1))), n.lanes |= 1), e);
}
var Xg = Zs.ReactCurrentOwner, Yn = !1;
function _n(e, t, n, r) {
  t.child = e === null ? fp(t, null, n, r) : Ul(t, e.child, n, r);
}
function Ch(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Ll(t, l), r = Ju(e, t, n, r, o, l), n = qu(), e !== null && !Yn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qs(e, t, l)) : (ln && n && Bu(t), t.flags |= 1, _n(e, t, r, l), t.child);
}
function Eh(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !id(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Bp(e, t, o, r, l)) : (e = Da(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Do, n(a, r) && e.ref === t.ref) return qs(e, t, l);
  }
  return t.flags |= 1, e = Ir(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Bp(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Do(o, r) && e.ref === t.ref) if (Yn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Yn = !0);
    else return t.lanes = e.lanes, qs(e, t, l);
  }
  return Gc(e, t, n, r, l);
}
function Wp(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, en(Ml, ts), ts |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, en(Ml, ts), ts |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, en(Ml, ts), ts |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, en(Ml, ts), ts |= r;
  return _n(e, t, l, n), t.child;
}
function Fp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Gc(e, t, n, r, l) {
  var o = Gn(n) ? nl : Rn.current;
  return o = Wl(t, o), Ll(t, l), n = Ju(e, t, n, r, o, l), r = qu(), e !== null && !Yn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qs(e, t, l)) : (ln && r && Bu(t), t.flags |= 1, _n(e, t, n, l), t.child);
}
function Sh(e, t, n, r, l) {
  if (Gn(n)) {
    var o = !0;
    Ja(t);
  } else o = !1;
  if (Ll(t, l), t.stateNode === null) Ra(e, t), Dp(t, n, r), Yc(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, c = t.memoizedProps;
    a.props = c;
    var u = a.context, h = n.contextType;
    typeof h == "object" && h !== null ? h = xs(h) : (h = Gn(n) ? nl : Rn.current, h = Wl(t, h));
    var y = n.getDerivedStateFromProps, p = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    p || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== r || u !== h) && Nh(t, a, r, h), pr = !1;
    var f = t.memoizedState;
    a.state = f, ni(t, r, a, l), u = t.memoizedState, c !== r || f !== u || Xn.current || pr ? (typeof y == "function" && (Vc(t, n, y, r), u = t.memoizedState), (c = pr || vh(t, n, c, r, f, u, h)) ? (p || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), a.props = r, a.state = u, a.context = h, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, mp(e, t), c = t.memoizedProps, h = t.type === t.elementType ? c : ws(t.type, c), a.props = h, p = t.pendingProps, f = a.context, u = n.contextType, typeof u == "object" && u !== null ? u = xs(u) : (u = Gn(n) ? nl : Rn.current, u = Wl(t, u));
    var v = n.getDerivedStateFromProps;
    (y = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== p || f !== u) && Nh(t, a, r, u), pr = !1, f = t.memoizedState, a.state = f, ni(t, r, a, l);
    var b = t.memoizedState;
    c !== p || f !== b || Xn.current || pr ? (typeof v == "function" && (Vc(t, n, v, r), b = t.memoizedState), (h = pr || vh(t, n, h, r, f, b, u) || !1) ? (y || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, b, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, b, u)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = b), a.props = r, a.state = b, a.context = u, r = h) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Qc(e, t, n, r, o, l);
}
function Qc(e, t, n, r, l, o) {
  Fp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && dh(t, n, !1), qs(e, t, o);
  r = t.stateNode, Xg.current = t;
  var c = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Ul(t, e.child, null, o), t.child = Ul(t, null, c, o)) : _n(e, t, c, o), t.memoizedState = r.state, l && dh(t, n, !0), t.child;
}
function Up(e) {
  var t = e.stateNode;
  t.pendingContext ? uh(e, t.pendingContext, t.pendingContext !== t.context) : t.context && uh(e, t.context, !1), Yu(e, t.containerInfo);
}
function bh(e, t, n, r, l) {
  return Fl(), Fu(l), t.flags |= 256, _n(e, t, n, r), t.child;
}
var Jc = { dehydrated: null, treeContext: null, retryLane: 0 };
function qc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Hp(e, t, n) {
  var r = t.pendingProps, l = an.current, o = !1, a = (t.flags & 128) !== 0, c;
  if ((c = a) || (c = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), c ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), en(an, l & 1), e === null)
    return zc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = Ei(a, r, 0, null), e = el(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = qc(n), t.memoizedState = Jc, e) : td(t, a));
  if (l = e.memoizedState, l !== null && (c = l.dehydrated, c !== null)) return Gg(e, t, a, r, c, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, c = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Ir(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), c !== null ? o = Ir(c, o) : (o = el(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? qc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Jc, r;
  }
  return o = e.child, e = o.sibling, r = Ir(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function td(e, t) {
  return t = Ei({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function xa(e, t, n, r) {
  return r !== null && Fu(r), Ul(t, e.child, null, n), e = td(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Gg(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = lc(Error(Te(422))), xa(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Ei({ mode: "visible", children: r.children }, l, 0, null), o = el(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Ul(t, e.child, null, a), t.child.memoizedState = qc(a), t.memoizedState = Jc, o);
  if (!(t.mode & 1)) return xa(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var c = r.dgst;
    return r = c, o = Error(Te(419)), r = lc(o, r, void 0), xa(e, t, a, r);
  }
  if (c = (a & e.childLanes) !== 0, Yn || c) {
    if (r = Cn, r !== null) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Js(e, l), Ms(r, e, l, -1));
    }
    return ad(), r = lc(Error(Te(421))), xa(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = ix.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, ss = Er(l.nextSibling), rs = t, ln = !0, Es = null, e !== null && (fs[ps++] = Ks, fs[ps++] = Vs, fs[ps++] = sl, Ks = e.id, Vs = e.overflow, sl = t), t = td(t, r.children), t.flags |= 4096, t);
}
function Mh(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Kc(e.return, t, n);
}
function oc(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function zp(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (_n(e, t, r.children, n), r = an.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Mh(e, n, t);
      else if (e.tag === 19) Mh(e, n, t);
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
  if (en(an, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && si(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), oc(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && si(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      oc(t, !0, n, null, o);
      break;
    case "together":
      oc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ra(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function qs(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), ll |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(Te(153));
  if (t.child !== null) {
    for (e = t.child, n = Ir(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ir(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Qg(e, t, n) {
  switch (t.tag) {
    case 3:
      Up(t), Fl();
      break;
    case 5:
      gp(t);
      break;
    case 1:
      Gn(t.type) && Ja(t);
      break;
    case 4:
      Yu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      en(ei, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (en(an, an.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Hp(e, t, n) : (en(an, an.current & 1), e = qs(e, t, n), e !== null ? e.sibling : null);
      en(an, an.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return zp(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), en(an, an.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Wp(e, t, n);
  }
  return qs(e, t, n);
}
var Kp, Zc, Vp, Yp;
Kp = function(e, t) {
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
Zc = function() {
};
Vp = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Qr(_s.current);
    var o = null;
    switch (n) {
      case "input":
        l = kc(e, l), r = kc(e, r), o = [];
        break;
      case "select":
        l = un({}, l, { value: void 0 }), r = un({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Cc(e, l), r = Cc(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ga);
    }
    Sc(n, r);
    var a;
    n = null;
    for (h in l) if (!r.hasOwnProperty(h) && l.hasOwnProperty(h) && l[h] != null) if (h === "style") {
      var c = l[h];
      for (a in c) c.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else h !== "dangerouslySetInnerHTML" && h !== "children" && h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (Io.hasOwnProperty(h) ? o || (o = []) : (o = o || []).push(h, null));
    for (h in r) {
      var u = r[h];
      if (c = l != null ? l[h] : void 0, r.hasOwnProperty(h) && u !== c && (u != null || c != null)) if (h === "style") if (c) {
        for (a in c) !c.hasOwnProperty(a) || u && u.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in u) u.hasOwnProperty(a) && c[a] !== u[a] && (n || (n = {}), n[a] = u[a]);
      } else n || (o || (o = []), o.push(
        h,
        n
      )), n = u;
      else h === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, c = c ? c.__html : void 0, u != null && c !== u && (o = o || []).push(h, u)) : h === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(h, "" + u) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && (Io.hasOwnProperty(h) ? (u != null && h === "onScroll" && sn("scroll", e), o || c === u || (o = [])) : (o = o || []).push(h, u));
    }
    n && (o = o || []).push("style", n);
    var h = o;
    (t.updateQueue = h) && (t.flags |= 4);
  }
};
Yp = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function io(e, t) {
  if (!ln) switch (e.tailMode) {
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
function $n(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Jg(e, t, n) {
  var r = t.pendingProps;
  switch (Wu(t), t.tag) {
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
      return $n(t), null;
    case 1:
      return Gn(t.type) && Qa(), $n(t), null;
    case 3:
      return r = t.stateNode, Hl(), rn(Xn), rn(Rn), Gu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ma(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Es !== null && (au(Es), Es = null))), Zc(e, t), $n(t), null;
    case 5:
      Xu(t);
      var l = Qr(Fo.current);
      if (n = t.type, e !== null && t.stateNode != null) Vp(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(Te(166));
          return $n(t), null;
        }
        if (e = Qr(_s.current), ma(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Os] = t, r[Bo] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              sn("cancel", r), sn("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              sn("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < yo.length; l++) sn(yo[l], r);
              break;
            case "source":
              sn("error", r);
              break;
            case "img":
            case "image":
            case "link":
              sn(
                "error",
                r
              ), sn("load", r);
              break;
            case "details":
              sn("toggle", r);
              break;
            case "input":
              Pd(r, o), sn("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, sn("invalid", r);
              break;
            case "textarea":
              Bd(r, o), sn("invalid", r);
          }
          Sc(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var c = o[a];
            a === "children" ? typeof c == "string" ? r.textContent !== c && (o.suppressHydrationWarning !== !0 && pa(r.textContent, c, e), l = ["children", c]) : typeof c == "number" && r.textContent !== "" + c && (o.suppressHydrationWarning !== !0 && pa(
              r.textContent,
              c,
              e
            ), l = ["children", "" + c]) : Io.hasOwnProperty(a) && c != null && a === "onScroll" && sn("scroll", r);
          }
          switch (n) {
            case "input":
              oa(r), _d(r, o, !0);
              break;
            case "textarea":
              oa(r), Wd(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ga);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = kf(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Os] = t, e[Bo] = r, Kp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = bc(n, r), n) {
              case "dialog":
                sn("cancel", e), sn("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                sn("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < yo.length; l++) sn(yo[l], e);
                l = r;
                break;
              case "source":
                sn("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                sn(
                  "error",
                  e
                ), sn("load", e), l = r;
                break;
              case "details":
                sn("toggle", e), l = r;
                break;
              case "input":
                Pd(e, r), l = kc(e, r), sn("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = un({}, r, { value: void 0 }), sn("invalid", e);
                break;
              case "textarea":
                Bd(e, r), l = Cc(e, r), sn("invalid", e);
                break;
              default:
                l = r;
            }
            Sc(n, l), c = l;
            for (o in c) if (c.hasOwnProperty(o)) {
              var u = c[o];
              o === "style" ? Cf(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && wf(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && To(e, u) : typeof u == "number" && To(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Io.hasOwnProperty(o) ? u != null && o === "onScroll" && sn("scroll", e) : u != null && Eu(e, o, u, a));
            }
            switch (n) {
              case "input":
                oa(e), _d(e, r, !1);
                break;
              case "textarea":
                oa(e), Wd(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Tr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Tl(e, !!r.multiple, o, !1) : r.defaultValue != null && Tl(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Ga);
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
      return $n(t), null;
    case 6:
      if (e && t.stateNode != null) Yp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(Te(166));
        if (n = Qr(Fo.current), Qr(_s.current), ma(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Os] = t, (o = r.nodeValue !== n) && (e = rs, e !== null)) switch (e.tag) {
            case 3:
              pa(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && pa(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Os] = t, t.stateNode = r;
      }
      return $n(t), null;
    case 13:
      if (rn(an), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (ln && ss !== null && t.mode & 1 && !(t.flags & 128)) dp(), Fl(), t.flags |= 98560, o = !1;
        else if (o = ma(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(Te(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(Te(317));
            o[Os] = t;
          } else Fl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          $n(t), o = !1;
        } else Es !== null && (au(Es), Es = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || an.current & 1 ? Nn === 0 && (Nn = 3) : ad())), t.updateQueue !== null && (t.flags |= 4), $n(t), null);
    case 4:
      return Hl(), Zc(e, t), e === null && Po(t.stateNode.containerInfo), $n(t), null;
    case 10:
      return zu(t.type._context), $n(t), null;
    case 17:
      return Gn(t.type) && Qa(), $n(t), null;
    case 19:
      if (rn(an), o = t.memoizedState, o === null) return $n(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) io(o, !1);
      else {
        if (Nn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = si(e), a !== null) {
            for (t.flags |= 128, io(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return en(an, an.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && pn() > Kl && (t.flags |= 128, r = !0, io(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = si(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), io(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !ln) return $n(t), null;
        } else 2 * pn() - o.renderingStartTime > Kl && n !== 1073741824 && (t.flags |= 128, r = !0, io(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = pn(), t.sibling = null, n = an.current, en(an, r ? n & 1 | 2 : n & 1), t) : ($n(t), null);
    case 22:
    case 23:
      return od(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ts & 1073741824 && ($n(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : $n(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Te(156, t.tag));
}
function qg(e, t) {
  switch (Wu(t), t.tag) {
    case 1:
      return Gn(t.type) && Qa(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Hl(), rn(Xn), rn(Rn), Gu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Xu(t), null;
    case 13:
      if (rn(an), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(Te(340));
        Fl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return rn(an), null;
    case 4:
      return Hl(), null;
    case 10:
      return zu(t.type._context), null;
    case 22:
    case 23:
      return od(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ya = !1, An = !1, Zg = typeof WeakSet == "function" ? WeakSet : Set, Xe = null;
function bl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    hn(e, t, r);
  }
  else n.current = null;
}
function eu(e, t, n) {
  try {
    n();
  } catch (r) {
    hn(e, t, r);
  }
}
var Ih = !1;
function ex(e, t) {
  if (Pc = Va, e = qf(), _u(e)) {
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
        var a = 0, c = -1, u = -1, h = 0, y = 0, p = e, f = null;
        t: for (; ; ) {
          for (var v; p !== n || l !== 0 && p.nodeType !== 3 || (c = a + l), p !== o || r !== 0 && p.nodeType !== 3 || (u = a + r), p.nodeType === 3 && (a += p.nodeValue.length), (v = p.firstChild) !== null; )
            f = p, p = v;
          for (; ; ) {
            if (p === e) break t;
            if (f === n && ++h === l && (c = a), f === o && ++y === r && (u = a), (v = p.nextSibling) !== null) break;
            p = f, f = p.parentNode;
          }
          p = v;
        }
        n = c === -1 || u === -1 ? null : { start: c, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (_c = { focusedElem: e, selectionRange: n }, Va = !1, Xe = t; Xe !== null; ) if (t = Xe, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Xe = e;
  else for (; Xe !== null; ) {
    t = Xe;
    try {
      var b = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (b !== null) {
            var E = b.memoizedProps, D = b.memoizedState, k = t.stateNode, m = k.getSnapshotBeforeUpdate(t.elementType === t.type ? E : ws(t.type, E), D);
            k.__reactInternalSnapshotBeforeUpdate = m;
          }
          break;
        case 3:
          var j = t.stateNode.containerInfo;
          j.nodeType === 1 ? j.textContent = "" : j.nodeType === 9 && j.documentElement && j.removeChild(j.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(Te(163));
      }
    } catch (M) {
      hn(t, t.return, M);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Xe = e;
      break;
    }
    Xe = t.return;
  }
  return b = Ih, Ih = !1, b;
}
function So(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && eu(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function ji(e, t) {
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
function tu(e) {
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
function Xp(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Xp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Os], delete t[Bo], delete t[Fc], delete t[Dg], delete t[Pg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Gp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Th(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Gp(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function nu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ga));
  else if (r !== 4 && (e = e.child, e !== null)) for (nu(e, t, n), e = e.sibling; e !== null; ) nu(e, t, n), e = e.sibling;
}
function su(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (su(e, t, n), e = e.sibling; e !== null; ) su(e, t, n), e = e.sibling;
}
var Sn = null, js = !1;
function cr(e, t, n) {
  for (n = n.child; n !== null; ) Qp(e, t, n), n = n.sibling;
}
function Qp(e, t, n) {
  if (Ps && typeof Ps.onCommitFiberUnmount == "function") try {
    Ps.onCommitFiberUnmount(mi, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      An || bl(n, t);
    case 6:
      var r = Sn, l = js;
      Sn = null, cr(e, t, n), Sn = r, js = l, Sn !== null && (js ? (e = Sn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Sn.removeChild(n.stateNode));
      break;
    case 18:
      Sn !== null && (js ? (e = Sn, n = n.stateNode, e.nodeType === 8 ? Zi(e.parentNode, n) : e.nodeType === 1 && Zi(e, n), Lo(e)) : Zi(Sn, n.stateNode));
      break;
    case 4:
      r = Sn, l = js, Sn = n.stateNode.containerInfo, js = !0, cr(e, t, n), Sn = r, js = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!An && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && eu(n, t, a), l = l.next;
        } while (l !== r);
      }
      cr(e, t, n);
      break;
    case 1:
      if (!An && (bl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (c) {
        hn(n, t, c);
      }
      cr(e, t, n);
      break;
    case 21:
      cr(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (An = (r = An) || n.memoizedState !== null, cr(e, t, n), An = r) : cr(e, t, n);
      break;
    default:
      cr(e, t, n);
  }
}
function $h(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Zg()), t.forEach(function(r) {
      var l = cx.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function ks(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, a = t, c = a;
      e: for (; c !== null; ) {
        switch (c.tag) {
          case 5:
            Sn = c.stateNode, js = !1;
            break e;
          case 3:
            Sn = c.stateNode.containerInfo, js = !0;
            break e;
          case 4:
            Sn = c.stateNode.containerInfo, js = !0;
            break e;
        }
        c = c.return;
      }
      if (Sn === null) throw Error(Te(160));
      Qp(o, a, l), Sn = null, js = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (h) {
      hn(l, t, h);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Jp(t, e), t = t.sibling;
}
function Jp(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ks(t, e), Rs(e), r & 4) {
        try {
          So(3, e, e.return), ji(3, e);
        } catch (E) {
          hn(e, e.return, E);
        }
        try {
          So(5, e, e.return);
        } catch (E) {
          hn(e, e.return, E);
        }
      }
      break;
    case 1:
      ks(t, e), Rs(e), r & 512 && n !== null && bl(n, n.return);
      break;
    case 5:
      if (ks(t, e), Rs(e), r & 512 && n !== null && bl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          To(l, "");
        } catch (E) {
          hn(e, e.return, E);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, c = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          c === "input" && o.type === "radio" && o.name != null && vf(l, o), bc(c, a);
          var h = bc(c, o);
          for (a = 0; a < u.length; a += 2) {
            var y = u[a], p = u[a + 1];
            y === "style" ? Cf(l, p) : y === "dangerouslySetInnerHTML" ? wf(l, p) : y === "children" ? To(l, p) : Eu(l, y, p, h);
          }
          switch (c) {
            case "input":
              wc(l, o);
              break;
            case "textarea":
              Nf(l, o);
              break;
            case "select":
              var f = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var v = o.value;
              v != null ? Tl(l, !!o.multiple, v, !1) : f !== !!o.multiple && (o.defaultValue != null ? Tl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Tl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Bo] = o;
        } catch (E) {
          hn(e, e.return, E);
        }
      }
      break;
    case 6:
      if (ks(t, e), Rs(e), r & 4) {
        if (e.stateNode === null) throw Error(Te(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (E) {
          hn(e, e.return, E);
        }
      }
      break;
    case 3:
      if (ks(t, e), Rs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Lo(t.containerInfo);
      } catch (E) {
        hn(e, e.return, E);
      }
      break;
    case 4:
      ks(t, e), Rs(e);
      break;
    case 13:
      ks(t, e), Rs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (rd = pn())), r & 4 && $h(e);
      break;
    case 22:
      if (y = n !== null && n.memoizedState !== null, e.mode & 1 ? (An = (h = An) || y, ks(t, e), An = h) : ks(t, e), Rs(e), r & 8192) {
        if (h = e.memoizedState !== null, (e.stateNode.isHidden = h) && !y && e.mode & 1) for (Xe = e, y = e.child; y !== null; ) {
          for (p = Xe = y; Xe !== null; ) {
            switch (f = Xe, v = f.child, f.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                So(4, f, f.return);
                break;
              case 1:
                bl(f, f.return);
                var b = f.stateNode;
                if (typeof b.componentWillUnmount == "function") {
                  r = f, n = f.return;
                  try {
                    t = r, b.props = t.memoizedProps, b.state = t.memoizedState, b.componentWillUnmount();
                  } catch (E) {
                    hn(r, n, E);
                  }
                }
                break;
              case 5:
                bl(f, f.return);
                break;
              case 22:
                if (f.memoizedState !== null) {
                  Rh(p);
                  continue;
                }
            }
            v !== null ? (v.return = f, Xe = v) : Rh(p);
          }
          y = y.sibling;
        }
        e: for (y = null, p = e; ; ) {
          if (p.tag === 5) {
            if (y === null) {
              y = p;
              try {
                l = p.stateNode, h ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = p.stateNode, u = p.memoizedProps.style, a = u != null && u.hasOwnProperty("display") ? u.display : null, c.style.display = jf("display", a));
              } catch (E) {
                hn(e, e.return, E);
              }
            }
          } else if (p.tag === 6) {
            if (y === null) try {
              p.stateNode.nodeValue = h ? "" : p.memoizedProps;
            } catch (E) {
              hn(e, e.return, E);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            y === p && (y = null), p = p.return;
          }
          y === p && (y = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      ks(t, e), Rs(e), r & 4 && $h(e);
      break;
    case 21:
      break;
    default:
      ks(
        t,
        e
      ), Rs(e);
  }
}
function Rs(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Gp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(Te(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (To(l, ""), r.flags &= -33);
          var o = Th(e);
          su(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, c = Th(e);
          nu(e, c, a);
          break;
        default:
          throw Error(Te(161));
      }
    } catch (u) {
      hn(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function tx(e, t, n) {
  Xe = e, qp(e);
}
function qp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Xe !== null; ) {
    var l = Xe, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || ya;
      if (!a) {
        var c = l.alternate, u = c !== null && c.memoizedState !== null || An;
        c = ya;
        var h = An;
        if (ya = a, (An = u) && !h) for (Xe = l; Xe !== null; ) a = Xe, u = a.child, a.tag === 22 && a.memoizedState !== null ? Lh(l) : u !== null ? (u.return = a, Xe = u) : Lh(l);
        for (; o !== null; ) Xe = o, qp(o), o = o.sibling;
        Xe = l, ya = c, An = h;
      }
      Ah(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Xe = o) : Ah(e);
  }
}
function Ah(e) {
  for (; Xe !== null; ) {
    var t = Xe;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            An || ji(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !An) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : ws(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && gh(t, o, r);
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
              gh(t, a, n);
            }
            break;
          case 5:
            var c = t.stateNode;
            if (n === null && t.flags & 4) {
              n = c;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
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
              var h = t.alternate;
              if (h !== null) {
                var y = h.memoizedState;
                if (y !== null) {
                  var p = y.dehydrated;
                  p !== null && Lo(p);
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
            throw Error(Te(163));
        }
        An || t.flags & 512 && tu(t);
      } catch (f) {
        hn(t, t.return, f);
      }
    }
    if (t === e) {
      Xe = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Xe = n;
      break;
    }
    Xe = t.return;
  }
}
function Rh(e) {
  for (; Xe !== null; ) {
    var t = Xe;
    if (t === e) {
      Xe = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Xe = n;
      break;
    }
    Xe = t.return;
  }
}
function Lh(e) {
  for (; Xe !== null; ) {
    var t = Xe;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ji(4, t);
          } catch (u) {
            hn(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              hn(t, l, u);
            }
          }
          var o = t.return;
          try {
            tu(t);
          } catch (u) {
            hn(t, o, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            tu(t);
          } catch (u) {
            hn(t, a, u);
          }
      }
    } catch (u) {
      hn(t, t.return, u);
    }
    if (t === e) {
      Xe = null;
      break;
    }
    var c = t.sibling;
    if (c !== null) {
      c.return = t.return, Xe = c;
      break;
    }
    Xe = t.return;
  }
}
var nx = Math.ceil, oi = Zs.ReactCurrentDispatcher, nd = Zs.ReactCurrentOwner, gs = Zs.ReactCurrentBatchConfig, Pt = 0, Cn = null, gn = null, bn = 0, ts = 0, Ml = Rr(0), Nn = 0, Ko = null, ll = 0, Ci = 0, sd = 0, bo = null, Vn = null, rd = 0, Kl = 1 / 0, Us = null, ai = !1, ru = null, br = null, va = !1, kr = null, ii = 0, Mo = 0, lu = null, La = -1, Oa = 0;
function Bn() {
  return Pt & 6 ? pn() : La !== -1 ? La : La = pn();
}
function Mr(e) {
  return e.mode & 1 ? Pt & 2 && bn !== 0 ? bn & -bn : Bg.transition !== null ? (Oa === 0 && (Oa = Df()), Oa) : (e = Ht, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Hf(e.type)), e) : 1;
}
function Ms(e, t, n, r) {
  if (50 < Mo) throw Mo = 0, lu = null, Error(Te(185));
  Xo(e, n, r), (!(Pt & 2) || e !== Cn) && (e === Cn && (!(Pt & 2) && (Ci |= n), Nn === 4 && yr(e, bn)), Qn(e, r), n === 1 && Pt === 0 && !(t.mode & 1) && (Kl = pn() + 500, Ni && Lr()));
}
function Qn(e, t) {
  var n = e.callbackNode;
  B0(e, t);
  var r = Ka(e, e === Cn ? bn : 0);
  if (r === 0) n !== null && Hd(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Hd(n), t === 1) e.tag === 0 ? _g(Oh.bind(null, e)) : ip(Oh.bind(null, e)), Lg(function() {
      !(Pt & 6) && Lr();
    }), n = null;
    else {
      switch (Pf(r)) {
        case 1:
          n = Tu;
          break;
        case 4:
          n = Lf;
          break;
        case 16:
          n = za;
          break;
        case 536870912:
          n = Of;
          break;
        default:
          n = za;
      }
      n = om(n, Zp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Zp(e, t) {
  if (La = -1, Oa = 0, Pt & 6) throw Error(Te(327));
  var n = e.callbackNode;
  if (Ol() && e.callbackNode !== n) return null;
  var r = Ka(e, e === Cn ? bn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ci(e, r);
  else {
    t = r;
    var l = Pt;
    Pt |= 2;
    var o = tm();
    (Cn !== e || bn !== t) && (Us = null, Kl = pn() + 500, Zr(e, t));
    do
      try {
        lx();
        break;
      } catch (c) {
        em(e, c);
      }
    while (!0);
    Hu(), oi.current = o, Pt = l, gn !== null ? t = 0 : (Cn = null, bn = 0, t = Nn);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ac(e), l !== 0 && (r = l, t = ou(e, l))), t === 1) throw n = Ko, Zr(e, 0), yr(e, r), Qn(e, pn()), n;
    if (t === 6) yr(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !sx(l) && (t = ci(e, r), t === 2 && (o = Ac(e), o !== 0 && (r = o, t = ou(e, o))), t === 1)) throw n = Ko, Zr(e, 0), yr(e, r), Qn(e, pn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(Te(345));
        case 2:
          Kr(e, Vn, Us);
          break;
        case 3:
          if (yr(e, r), (r & 130023424) === r && (t = rd + 500 - pn(), 10 < t)) {
            if (Ka(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Bn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Wc(Kr.bind(null, e, Vn, Us), t);
            break;
          }
          Kr(e, Vn, Us);
          break;
        case 4:
          if (yr(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - bs(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = pn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * nx(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Wc(Kr.bind(null, e, Vn, Us), r);
            break;
          }
          Kr(e, Vn, Us);
          break;
        case 5:
          Kr(e, Vn, Us);
          break;
        default:
          throw Error(Te(329));
      }
    }
  }
  return Qn(e, pn()), e.callbackNode === n ? Zp.bind(null, e) : null;
}
function ou(e, t) {
  var n = bo;
  return e.current.memoizedState.isDehydrated && (Zr(e, t).flags |= 256), e = ci(e, t), e !== 2 && (t = Vn, Vn = n, t !== null && au(t)), e;
}
function au(e) {
  Vn === null ? Vn = e : Vn.push.apply(Vn, e);
}
function sx(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Is(o(), l)) return !1;
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
function yr(e, t) {
  for (t &= ~sd, t &= ~Ci, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - bs(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Oh(e) {
  if (Pt & 6) throw Error(Te(327));
  Ol();
  var t = Ka(e, 0);
  if (!(t & 1)) return Qn(e, pn()), null;
  var n = ci(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ac(e);
    r !== 0 && (t = r, n = ou(e, r));
  }
  if (n === 1) throw n = Ko, Zr(e, 0), yr(e, t), Qn(e, pn()), n;
  if (n === 6) throw Error(Te(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Kr(e, Vn, Us), Qn(e, pn()), null;
}
function ld(e, t) {
  var n = Pt;
  Pt |= 1;
  try {
    return e(t);
  } finally {
    Pt = n, Pt === 0 && (Kl = pn() + 500, Ni && Lr());
  }
}
function ol(e) {
  kr !== null && kr.tag === 0 && !(Pt & 6) && Ol();
  var t = Pt;
  Pt |= 1;
  var n = gs.transition, r = Ht;
  try {
    if (gs.transition = null, Ht = 1, e) return e();
  } finally {
    Ht = r, gs.transition = n, Pt = t, !(Pt & 6) && Lr();
  }
}
function od() {
  ts = Ml.current, rn(Ml);
}
function Zr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Rg(n)), gn !== null) for (n = gn.return; n !== null; ) {
    var r = n;
    switch (Wu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Qa();
        break;
      case 3:
        Hl(), rn(Xn), rn(Rn), Gu();
        break;
      case 5:
        Xu(r);
        break;
      case 4:
        Hl();
        break;
      case 13:
        rn(an);
        break;
      case 19:
        rn(an);
        break;
      case 10:
        zu(r.type._context);
        break;
      case 22:
      case 23:
        od();
    }
    n = n.return;
  }
  if (Cn = e, gn = e = Ir(e.current, null), bn = ts = t, Nn = 0, Ko = null, sd = Ci = ll = 0, Vn = bo = null, Gr !== null) {
    for (t = 0; t < Gr.length; t++) if (n = Gr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = l, r.next = a;
      }
      n.pending = r;
    }
    Gr = null;
  }
  return e;
}
function em(e, t) {
  do {
    var n = gn;
    try {
      if (Hu(), $a.current = li, ri) {
        for (var r = cn.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        ri = !1;
      }
      if (rl = 0, jn = vn = cn = null, Eo = !1, Uo = 0, nd.current = null, n === null || n.return === null) {
        Nn = 1, Ko = t, gn = null;
        break;
      }
      e: {
        var o = e, a = n.return, c = n, u = t;
        if (t = bn, c.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var h = u, y = c, p = y.tag;
          if (!(y.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var f = y.alternate;
            f ? (y.updateQueue = f.updateQueue, y.memoizedState = f.memoizedState, y.lanes = f.lanes) : (y.updateQueue = null, y.memoizedState = null);
          }
          var v = wh(a);
          if (v !== null) {
            v.flags &= -257, jh(v, a, c, o, t), v.mode & 1 && kh(o, h, t), t = v, u = h;
            var b = t.updateQueue;
            if (b === null) {
              var E = /* @__PURE__ */ new Set();
              E.add(u), t.updateQueue = E;
            } else b.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              kh(o, h, t), ad();
              break e;
            }
            u = Error(Te(426));
          }
        } else if (ln && c.mode & 1) {
          var D = wh(a);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), jh(D, a, c, o, t), Fu(zl(u, c));
            break e;
          }
        }
        o = u = zl(u, c), Nn !== 4 && (Nn = 2), bo === null ? bo = [o] : bo.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Pp(o, u, t);
              mh(o, k);
              break e;
            case 1:
              c = u;
              var m = o.type, j = o.stateNode;
              if (!(o.flags & 128) && (typeof m.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && (br === null || !br.has(j)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var M = _p(o, c, t);
                mh(o, M);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      sm(n);
    } catch (S) {
      t = S, gn === n && n !== null && (gn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function tm() {
  var e = oi.current;
  return oi.current = li, e === null ? li : e;
}
function ad() {
  (Nn === 0 || Nn === 3 || Nn === 2) && (Nn = 4), Cn === null || !(ll & 268435455) && !(Ci & 268435455) || yr(Cn, bn);
}
function ci(e, t) {
  var n = Pt;
  Pt |= 2;
  var r = tm();
  (Cn !== e || bn !== t) && (Us = null, Zr(e, t));
  do
    try {
      rx();
      break;
    } catch (l) {
      em(e, l);
    }
  while (!0);
  if (Hu(), Pt = n, oi.current = r, gn !== null) throw Error(Te(261));
  return Cn = null, bn = 0, Nn;
}
function rx() {
  for (; gn !== null; ) nm(gn);
}
function lx() {
  for (; gn !== null && !T0(); ) nm(gn);
}
function nm(e) {
  var t = lm(e.alternate, e, ts);
  e.memoizedProps = e.pendingProps, t === null ? sm(e) : gn = t, nd.current = null;
}
function sm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = qg(n, t), n !== null) {
        n.flags &= 32767, gn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Nn = 6, gn = null;
        return;
      }
    } else if (n = Jg(n, t, ts), n !== null) {
      gn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      gn = t;
      return;
    }
    gn = t = e;
  } while (t !== null);
  Nn === 0 && (Nn = 5);
}
function Kr(e, t, n) {
  var r = Ht, l = gs.transition;
  try {
    gs.transition = null, Ht = 1, ox(e, t, n, r);
  } finally {
    gs.transition = l, Ht = r;
  }
  return null;
}
function ox(e, t, n, r) {
  do
    Ol();
  while (kr !== null);
  if (Pt & 6) throw Error(Te(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(Te(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (W0(e, o), e === Cn && (gn = Cn = null, bn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || va || (va = !0, om(za, function() {
    return Ol(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = gs.transition, gs.transition = null;
    var a = Ht;
    Ht = 1;
    var c = Pt;
    Pt |= 4, nd.current = null, ex(e, n), Jp(n, e), Sg(_c), Va = !!Pc, _c = Pc = null, e.current = n, tx(n), $0(), Pt = c, Ht = a, gs.transition = o;
  } else e.current = n;
  if (va && (va = !1, kr = e, ii = l), o = e.pendingLanes, o === 0 && (br = null), L0(n.stateNode), Qn(e, pn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ai) throw ai = !1, e = ru, ru = null, e;
  return ii & 1 && e.tag !== 0 && Ol(), o = e.pendingLanes, o & 1 ? e === lu ? Mo++ : (Mo = 0, lu = e) : Mo = 0, Lr(), null;
}
function Ol() {
  if (kr !== null) {
    var e = Pf(ii), t = gs.transition, n = Ht;
    try {
      if (gs.transition = null, Ht = 16 > e ? 16 : e, kr === null) var r = !1;
      else {
        if (e = kr, kr = null, ii = 0, Pt & 6) throw Error(Te(331));
        var l = Pt;
        for (Pt |= 4, Xe = e.current; Xe !== null; ) {
          var o = Xe, a = o.child;
          if (Xe.flags & 16) {
            var c = o.deletions;
            if (c !== null) {
              for (var u = 0; u < c.length; u++) {
                var h = c[u];
                for (Xe = h; Xe !== null; ) {
                  var y = Xe;
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      So(8, y, o);
                  }
                  var p = y.child;
                  if (p !== null) p.return = y, Xe = p;
                  else for (; Xe !== null; ) {
                    y = Xe;
                    var f = y.sibling, v = y.return;
                    if (Xp(y), y === h) {
                      Xe = null;
                      break;
                    }
                    if (f !== null) {
                      f.return = v, Xe = f;
                      break;
                    }
                    Xe = v;
                  }
                }
              }
              var b = o.alternate;
              if (b !== null) {
                var E = b.child;
                if (E !== null) {
                  b.child = null;
                  do {
                    var D = E.sibling;
                    E.sibling = null, E = D;
                  } while (E !== null);
                }
              }
              Xe = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, Xe = a;
          else e: for (; Xe !== null; ) {
            if (o = Xe, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                So(9, o, o.return);
            }
            var k = o.sibling;
            if (k !== null) {
              k.return = o.return, Xe = k;
              break e;
            }
            Xe = o.return;
          }
        }
        var m = e.current;
        for (Xe = m; Xe !== null; ) {
          a = Xe;
          var j = a.child;
          if (a.subtreeFlags & 2064 && j !== null) j.return = a, Xe = j;
          else e: for (a = m; Xe !== null; ) {
            if (c = Xe, c.flags & 2048) try {
              switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  ji(9, c);
              }
            } catch (S) {
              hn(c, c.return, S);
            }
            if (c === a) {
              Xe = null;
              break e;
            }
            var M = c.sibling;
            if (M !== null) {
              M.return = c.return, Xe = M;
              break e;
            }
            Xe = c.return;
          }
        }
        if (Pt = l, Lr(), Ps && typeof Ps.onPostCommitFiberRoot == "function") try {
          Ps.onPostCommitFiberRoot(mi, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Ht = n, gs.transition = t;
    }
  }
  return !1;
}
function Dh(e, t, n) {
  t = zl(n, t), t = Pp(e, t, 1), e = Sr(e, t, 1), t = Bn(), e !== null && (Xo(e, 1, t), Qn(e, t));
}
function hn(e, t, n) {
  if (e.tag === 3) Dh(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Dh(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (br === null || !br.has(r))) {
        e = zl(n, e), e = _p(t, e, 1), t = Sr(t, e, 1), e = Bn(), t !== null && (Xo(t, 1, e), Qn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function ax(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Bn(), e.pingedLanes |= e.suspendedLanes & n, Cn === e && (bn & n) === n && (Nn === 4 || Nn === 3 && (bn & 130023424) === bn && 500 > pn() - rd ? Zr(e, 0) : sd |= n), Qn(e, t);
}
function rm(e, t) {
  t === 0 && (e.mode & 1 ? (t = ca, ca <<= 1, !(ca & 130023424) && (ca = 4194304)) : t = 1);
  var n = Bn();
  e = Js(e, t), e !== null && (Xo(e, t, n), Qn(e, n));
}
function ix(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), rm(e, n);
}
function cx(e, t) {
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
      throw Error(Te(314));
  }
  r !== null && r.delete(t), rm(e, n);
}
var lm;
lm = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Xn.current) Yn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Yn = !1, Qg(e, t, n);
    Yn = !!(e.flags & 131072);
  }
  else Yn = !1, ln && t.flags & 1048576 && cp(t, Za, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ra(e, t), e = t.pendingProps;
      var l = Wl(t, Rn.current);
      Ll(t, n), l = Ju(null, t, r, e, l, n);
      var o = qu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Gn(r) ? (o = !0, Ja(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Vu(t), l.updater = wi, t.stateNode = l, l._reactInternals = t, Yc(t, r, e, n), t = Qc(null, t, r, !0, o, n)) : (t.tag = 0, ln && o && Bu(t), _n(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ra(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = dx(r), e = ws(r, e), l) {
          case 0:
            t = Gc(null, t, r, e, n);
            break e;
          case 1:
            t = Sh(null, t, r, e, n);
            break e;
          case 11:
            t = Ch(null, t, r, e, n);
            break e;
          case 14:
            t = Eh(null, t, r, ws(r.type, e), n);
            break e;
        }
        throw Error(Te(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), Gc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), Sh(e, t, r, l, n);
    case 3:
      e: {
        if (Up(t), e === null) throw Error(Te(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, mp(e, t), ni(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = zl(Error(Te(423)), t), t = bh(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = zl(Error(Te(424)), t), t = bh(e, t, r, n, l);
          break e;
        } else for (ss = Er(t.stateNode.containerInfo.firstChild), rs = t, ln = !0, Es = null, n = fp(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Fl(), r === l) {
            t = qs(e, t, n);
            break e;
          }
          _n(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return gp(t), e === null && zc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, Bc(r, l) ? a = null : o !== null && Bc(r, o) && (t.flags |= 32), Fp(e, t), _n(e, t, a, n), t.child;
    case 6:
      return e === null && zc(t), null;
    case 13:
      return Hp(e, t, n);
    case 4:
      return Yu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ul(t, null, r, n) : _n(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), Ch(e, t, r, l, n);
    case 7:
      return _n(e, t, t.pendingProps, n), t.child;
    case 8:
      return _n(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _n(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, en(ei, r._currentValue), r._currentValue = a, o !== null) if (Is(o.value, a)) {
          if (o.children === l.children && !Xn.current) {
            t = qs(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var c = o.dependencies;
          if (c !== null) {
            a = o.child;
            for (var u = c.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = Ys(-1, n & -n), u.tag = 2;
                  var h = o.updateQueue;
                  if (h !== null) {
                    h = h.shared;
                    var y = h.pending;
                    y === null ? u.next = u : (u.next = y.next, y.next = u), h.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Kc(
                  o.return,
                  n,
                  t
                ), c.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (a = o.return, a === null) throw Error(Te(341));
            a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), Kc(a, n, t), a = o.sibling;
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
        _n(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, Ll(t, n), l = xs(l), r = r(l), t.flags |= 1, _n(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ws(r, t.pendingProps), l = ws(r.type, l), Eh(e, t, r, l, n);
    case 15:
      return Bp(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), Ra(e, t), t.tag = 1, Gn(r) ? (e = !0, Ja(t)) : e = !1, Ll(t, n), Dp(t, r, l), Yc(t, r, l, n), Qc(null, t, r, !0, e, n);
    case 19:
      return zp(e, t, n);
    case 22:
      return Wp(e, t, n);
  }
  throw Error(Te(156, t.tag));
};
function om(e, t) {
  return Rf(e, t);
}
function ux(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ms(e, t, n, r) {
  return new ux(e, t, n, r);
}
function id(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function dx(e) {
  if (typeof e == "function") return id(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === bu) return 11;
    if (e === Mu) return 14;
  }
  return 2;
}
function Ir(e, t) {
  var n = e.alternate;
  return n === null ? (n = ms(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Da(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") id(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case yl:
      return el(n.children, l, o, t);
    case Su:
      a = 8, l |= 8;
      break;
    case xc:
      return e = ms(12, n, t, l | 2), e.elementType = xc, e.lanes = o, e;
    case yc:
      return e = ms(13, n, t, l), e.elementType = yc, e.lanes = o, e;
    case vc:
      return e = ms(19, n, t, l), e.elementType = vc, e.lanes = o, e;
    case gf:
      return Ei(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case pf:
          a = 10;
          break e;
        case mf:
          a = 9;
          break e;
        case bu:
          a = 11;
          break e;
        case Mu:
          a = 14;
          break e;
        case fr:
          a = 16, r = null;
          break e;
      }
      throw Error(Te(130, e == null ? e : typeof e, ""));
  }
  return t = ms(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function el(e, t, n, r) {
  return e = ms(7, e, r, t), e.lanes = n, e;
}
function Ei(e, t, n, r) {
  return e = ms(22, e, r, t), e.elementType = gf, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ac(e, t, n) {
  return e = ms(6, e, null, t), e.lanes = n, e;
}
function ic(e, t, n) {
  return t = ms(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function hx(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ui(0), this.expirationTimes = Ui(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ui(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function cd(e, t, n, r, l, o, a, c, u) {
  return e = new hx(e, t, n, c, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ms(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Vu(o), e;
}
function fx(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: xl, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function am(e) {
  if (!e) return $r;
  e = e._reactInternals;
  e: {
    if (il(e) !== e || e.tag !== 1) throw Error(Te(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Gn(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(Te(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Gn(n)) return ap(e, n, t);
  }
  return t;
}
function im(e, t, n, r, l, o, a, c, u) {
  return e = cd(n, r, !0, e, l, o, a, c, u), e.context = am(null), n = e.current, r = Bn(), l = Mr(n), o = Ys(r, l), o.callback = t ?? null, Sr(n, o, l), e.current.lanes = l, Xo(e, l, r), Qn(e, r), e;
}
function Si(e, t, n, r) {
  var l = t.current, o = Bn(), a = Mr(l);
  return n = am(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ys(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Sr(l, t, a), e !== null && (Ms(e, l, a, o), Ta(e, l, a)), a;
}
function ui(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ph(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ud(e, t) {
  Ph(e, t), (e = e.alternate) && Ph(e, t);
}
function px() {
  return null;
}
var cm = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function dd(e) {
  this._internalRoot = e;
}
bi.prototype.render = dd.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(Te(409));
  Si(e, t, null, null);
};
bi.prototype.unmount = dd.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    ol(function() {
      Si(null, e, null, null);
    }), t[Qs] = null;
  }
};
function bi(e) {
  this._internalRoot = e;
}
bi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Wf();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < xr.length && t !== 0 && t < xr[n].priority; n++) ;
    xr.splice(n, 0, e), n === 0 && Uf(e);
  }
};
function hd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Mi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function _h() {
}
function mx(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var h = ui(a);
        o.call(h);
      };
    }
    var a = im(t, r, e, 0, null, !1, !1, "", _h);
    return e._reactRootContainer = a, e[Qs] = a.current, Po(e.nodeType === 8 ? e.parentNode : e), ol(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var c = r;
    r = function() {
      var h = ui(u);
      c.call(h);
    };
  }
  var u = cd(e, 0, !1, null, null, !1, !1, "", _h);
  return e._reactRootContainer = u, e[Qs] = u.current, Po(e.nodeType === 8 ? e.parentNode : e), ol(function() {
    Si(t, u, n, r);
  }), u;
}
function Ii(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var c = l;
      l = function() {
        var u = ui(a);
        c.call(u);
      };
    }
    Si(t, a, e, l);
  } else a = mx(n, t, e, l, r);
  return ui(a);
}
_f = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = xo(t.pendingLanes);
        n !== 0 && ($u(t, n | 1), Qn(t, pn()), !(Pt & 6) && (Kl = pn() + 500, Lr()));
      }
      break;
    case 13:
      ol(function() {
        var r = Js(e, 1);
        if (r !== null) {
          var l = Bn();
          Ms(r, e, 1, l);
        }
      }), ud(e, 1);
  }
};
Au = function(e) {
  if (e.tag === 13) {
    var t = Js(e, 134217728);
    if (t !== null) {
      var n = Bn();
      Ms(t, e, 134217728, n);
    }
    ud(e, 134217728);
  }
};
Bf = function(e) {
  if (e.tag === 13) {
    var t = Mr(e), n = Js(e, t);
    if (n !== null) {
      var r = Bn();
      Ms(n, e, t, r);
    }
    ud(e, t);
  }
};
Wf = function() {
  return Ht;
};
Ff = function(e, t) {
  var n = Ht;
  try {
    return Ht = e, t();
  } finally {
    Ht = n;
  }
};
Ic = function(e, t, n) {
  switch (t) {
    case "input":
      if (wc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = vi(r);
            if (!l) throw Error(Te(90));
            yf(r), wc(r, l);
          }
        }
      }
      break;
    case "textarea":
      Nf(e, n);
      break;
    case "select":
      t = n.value, t != null && Tl(e, !!n.multiple, t, !1);
  }
};
bf = ld;
Mf = ol;
var gx = { usingClientEntryPoint: !1, Events: [Qo, wl, vi, Ef, Sf, ld] }, co = { findFiberByHostInstance: Xr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, xx = { bundleType: co.bundleType, version: co.version, rendererPackageName: co.rendererPackageName, rendererConfig: co.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Zs.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = $f(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: co.findFiberByHostInstance || px, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Na = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Na.isDisabled && Na.supportsFiber) try {
    mi = Na.inject(xx), Ps = Na;
  } catch {
  }
}
os.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gx;
os.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!hd(t)) throw Error(Te(200));
  return fx(e, t, null, n);
};
os.createRoot = function(e, t) {
  if (!hd(e)) throw Error(Te(299));
  var n = !1, r = "", l = cm;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = cd(e, 1, !1, null, null, n, !1, r, l), e[Qs] = t.current, Po(e.nodeType === 8 ? e.parentNode : e), new dd(t);
};
os.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(Te(188)) : (e = Object.keys(e).join(","), Error(Te(268, e)));
  return e = $f(t), e = e === null ? null : e.stateNode, e;
};
os.flushSync = function(e) {
  return ol(e);
};
os.hydrate = function(e, t, n) {
  if (!Mi(t)) throw Error(Te(200));
  return Ii(null, e, t, !0, n);
};
os.hydrateRoot = function(e, t, n) {
  if (!hd(e)) throw Error(Te(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = cm;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = im(t, null, e, 1, n ?? null, l, !1, o, a), e[Qs] = t.current, Po(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new bi(t);
};
os.render = function(e, t, n) {
  if (!Mi(t)) throw Error(Te(200));
  return Ii(null, e, t, !1, n);
};
os.unmountComponentAtNode = function(e) {
  if (!Mi(e)) throw Error(Te(40));
  return e._reactRootContainer ? (ol(function() {
    Ii(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Qs] = null;
    });
  }), !0) : !1;
};
os.unstable_batchedUpdates = ld;
os.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Mi(n)) throw Error(Te(200));
  if (e == null || e._reactInternals === void 0) throw Error(Te(38));
  return Ii(e, t, n, !1, r);
};
os.version = "18.3.1-next-f1338f8080-20240426";
function um() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(um);
    } catch (e) {
      console.error(e);
    }
}
um(), uf.exports = os;
var Bs = uf.exports, Bh = Bs;
Wa.createRoot = Bh.createRoot, Wa.hydrateRoot = Bh.hydrateRoot;
var dm = { exports: {} }, Ti = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yx = i, vx = Symbol.for("react.element"), Nx = Symbol.for("react.fragment"), kx = Object.prototype.hasOwnProperty, wx = yx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, jx = { key: !0, ref: !0, __self: !0, __source: !0 };
function hm(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) kx.call(t, r) && !jx.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: vx, type: e, key: o, ref: a, props: l, _owner: wx.current };
}
Ti.Fragment = Nx;
Ti.jsx = hm;
Ti.jsxs = hm;
dm.exports = Ti;
var s = dm.exports;
let vr = [], fm = 120, cc = !1;
async function Cx() {
  if (!cc) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          Ex(n), cc = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    cc = !0;
  }
}
function Ex(e) {
  Array.isArray(e) && (vr = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Xs(e) {
  for (let t = vr.length - 1; t >= 0; t--) {
    const n = vr[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return vr.length > 0 ? {
    offsetMin: vr[0].offsetBeforeMin,
    label: vr[0].labelBefore
  } : { offsetMin: fm, label: "LOCAL" };
}
function pm(e, t) {
  return vr.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function di(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, a, c] = t.split(":").map(Number);
  for (const u of vr)
    if (u.offsetBeforeMin > u.offsetAfterMin) {
      const h = (u.offsetBeforeMin - u.offsetAfterMin) / 60, y = new Date(u.switchEpochMs + u.offsetAfterMin * 6e4);
      if (y.getUTCFullYear() === n && y.getUTCMonth() + 1 === r && y.getUTCDate() === l) {
        const p = y.getUTCHours();
        if (o >= p && o < p + h)
          return {
            isAmbiguous: !0,
            transition: u,
            firstOccurrenceEpoch: new Date(Date.UTC(n, r - 1, l, o, a, c)).getTime() - u.offsetBeforeMin * 6e4,
            secondOccurrenceEpoch: new Date(Date.UTC(n, r - 1, l, o, a, c)).getTime() - u.offsetAfterMin * 6e4
          };
      }
    }
  return { isAmbiguous: !1 };
}
function Sx(e) {
  const { offsetMin: t, label: n } = Xs(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function bx(e) {
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
function Jr(e, t = "LOCAL") {
  return t === "UTC" ? bx(e) : Sx(e);
}
function Wh(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Jr(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function Vr(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, a] = e.split("-").map(Number), [c, u, h = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(a) || isNaN(c) || isNaN(u)) return null;
  const y = Date.UTC(l, o - 1, a, c, u, h);
  if (n === "UTC")
    return y;
  const p = di(e, t);
  if (p.isAmbiguous)
    return r === 2 ? p.secondOccurrenceEpoch : p.firstOccurrenceEpoch;
  const f = y - fm * 6e4, { offsetMin: v } = Xs(f);
  let b = y - v * 6e4;
  const E = Xs(b);
  return E.offsetMin !== v && (b = y - E.offsetMin * 6e4), b;
}
function Mx({
  timeRange: e,
  baseEpochMs: t,
  timeMode: n,
  setTimeMode: r,
  activeStationId: l,
  hideBackToGrid: o,
  onResetActiveStation: a,
  onOpenRangeModal: c,
  onOpenBookmarksModal: u,
  onOpenHelpModal: h,
  onToggleDrawer: y,
  isInitialSetup: p = !1,
  selectedCount: f = 0,
  totalCount: v = 0,
  onResetStudio: b
}) {
  const [E, D] = i.useState(!1);
  i.useEffect(() => {
    if (!E) return;
    const S = (C) => {
      C.key === "Escape" && D(!1);
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [E]);
  const k = i.useMemo(() => {
    const S = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), C = (e == null ? void 0 : e.durationMs) || 0;
    if (!S || C <= 0) return "-- ➔ --";
    const N = S + C, g = (re) => String(re).padStart(2, "0"), $ = Jr(S, n), w = Jr(N, n), _ = `${$.year}-${g($.month)}-${g($.day)}`, G = `${g($.hour)}:${g($.minute)}:${g($.second)}`, I = `${w.year}-${g(w.month)}-${g(w.day)}`, R = `${g(w.hour)}:${g(w.minute)}:${g(w.second)}`, se = n === "UTC" ? " (UTC)" : $.label ? ` (${$.label})` : "", ne = _ === I ? R : `${I} ${R}`;
    return `${_} ${G} ➔ ${ne}${se}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), m = i.useMemo(() => {
    const S = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (S >= 1440) {
      const C = (S / 1440).toFixed(1);
      return `(${C.endsWith(".0") ? parseInt(C, 10) : C}d / ${S}m Total)`;
    }
    return `(${S}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), j = () => {
    D(!1), b == null || b();
  }, M = E ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => D(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (S) => S.stopPropagation(), dir: "ltr", children: [
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
          onClick: () => D(!1),
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
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: () => D(!1), children: "CANCEL" }),
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: j, children: [
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
          onClick: c,
          title: "Click to modify mission time window",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: k }),
            /* @__PURE__ */ s.jsx("span", { className: "total-duration", children: m })
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
          onClick: y,
          title: "Click to change selected station pool",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "beacon-dot" }),
            /* @__PURE__ */ s.jsx("span", { className: "selection-label", children: "SELECTED:" }),
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: f }),
            /* @__PURE__ */ s.jsxs("span", { className: "selection-total", children: [
              "/ ",
              v
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
          onClick: u,
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
          onClick: h,
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
          onClick: () => D(!0),
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
          onClick: y,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && M && Bs.createPortal(M, document.body)
  ] });
}
const hl = (e) => String(e).padStart(2, "0");
function Mt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const f = new Date(e), v = hl(f.getUTCHours()), b = hl(f.getUTCMinutes()), E = hl(f.getUTCSeconds()), D = l ? `${v}:${b}:${E}` : `${v}:${b}`;
    return r ? `${D} UTC` : D;
  }
  const { offsetMin: o, label: a } = Xs(e), c = new Date(e + o * 60 * 1e3), u = hl(c.getUTCHours()), h = hl(c.getUTCMinutes()), y = hl(c.getUTCSeconds()), p = l ? `${u}:${h}:${y}` : `${u}:${h}`;
  return r ? `${p} ${a}` : p;
}
const Ix = 600, Fh = 250, hs = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map(), iu = /* @__PURE__ */ new Set(), Uh = 4;
let Dl = 0, Ss = [];
function cu(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Fh) * Fh;
}
function mm() {
  var e;
  if (!(Dl >= Uh || Ss.length === 0))
    for (Ss = Ss.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); Dl < Uh && Ss.length > 0; ) {
      const t = Ss.pop();
      !t || (e = t.signal) != null && e.aborted || (Dl++, Tx(t));
    }
}
function Pa(e, t, n, r = "mon-0") {
  const l = cu(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (hs.size >= Ix) {
    const c = hs.keys().next().value, u = hs.get(c);
    u && u.startsWith("blob:") && URL.revokeObjectURL(u), hs.delete(c);
  }
  hs.set(a, n), iu.forEach((c) => c(e, l, n, o));
}
async function Tx(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const c = l ? `&displayId=${encodeURIComponent(l)}` : "", u = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${c}`, { signal: o });
    if (u.status === 200) {
      const h = await u.blob(), y = URL.createObjectURL(h);
      Pa(n, r, y, l), a(y);
    } else u.status === 204 ? (Pa(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (c) {
    c.name !== "AbortError" ? (Pa(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } finally {
    Dl = Math.max(0, Dl - 1), Yr.delete(t), mm();
  }
}
const Pn = {
  /**
   * Gets a cached frame URL by station, timestamp, and optional displayId.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} [displayId='mon-0']
   * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
   */
  get(e, t, n = "mon-0") {
    const r = cu(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!hs.has(o)) return null;
    const a = hs.get(o);
    return hs.delete(o), hs.set(o, a), a;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: Pa,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    hs.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), hs.clear(), Yr.clear(), Ss = [], Dl = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return iu.add(e), () => iu.delete(e);
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
    const l = cu(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
    if (hs.has(a))
      return Promise.resolve(this.get(e, l, o));
    if (Yr.has(a))
      return Yr.get(a);
    const c = new Promise((u) => {
      if (n != null && n.aborted) {
        u(null);
        return;
      }
      Ss = Ss.filter((y) => y.hostname === e && y.displayId === o && y.key !== a ? (Yr.delete(y.key), y.resolve(null), !1) : !0);
      const h = { key: a, hostname: e, epochMs: l, displayId: o, signal: n, resolve: u };
      n && n.addEventListener("abort", () => {
        Ss = Ss.filter((y) => y.key !== a), Yr.delete(a), u(null);
      }, { once: !0 }), Ss.push(h), mm();
    });
    return Yr.set(a, c), c;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Pn.clearAll();
});
const fd = "ITB_STUDIO_SESSION_CACHE_V2", gm = "itb_player_audio_settings";
let uc = null;
function $x() {
  try {
    const e = localStorage.getItem(fd);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function xm(e) {
  e && (uc && clearTimeout(uc), uc = setTimeout(() => {
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
      localStorage.setItem(fd, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function Ax() {
  try {
    localStorage.removeItem(fd);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function Pl() {
  try {
    const e = localStorage.getItem(gm);
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
function Rx(e) {
  try {
    localStorage.setItem(gm, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let mr = null, Il = null, dc = null, zn = 0, fl = 0, ka = -60, Vo = 1;
function Lx() {
  if (!mr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (mr = new e());
  }
  return mr && mr.state === "suspended" && mr.resume().catch(() => {
  }), mr;
}
function hi(e, t = 1) {
  if (!e) return null;
  Vo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Lx();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(Vo, n.currentTime), Il = e, Ox(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function Hh(e) {
  if (Vo = Math.max(0, Number(e) || 1), Il != null && Il.__audioGainNode && mr)
    try {
      Il.__audioGainNode.gain.setValueAtTime(Vo, mr.currentTime);
    } catch {
    }
}
function Ox() {
  if (dc) return;
  const e = new Uint8Array(256), t = () => {
    const n = Il, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      zn *= 0.85, fl *= 0.85, zn < 1e-3 && (zn = 0), fl < 1e-3 && (fl = 0), ka = zn > 1e-3 ? 20 * Math.log10(zn) : -60;
    else
      try {
        r.getByteTimeDomainData(e);
        let l = 0, o = 0;
        for (let c = 0; c < e.length; c++) {
          const u = (e[c] - 128) / 128;
          l += u * u;
          const h = Math.abs(u);
          h > o && (o = h);
        }
        const a = Math.sqrt(l / e.length);
        zn = a > zn ? zn * 0.3 + a * 0.7 : zn * 0.85 + a * 0.15, fl = Math.max(zn, o), ka = zn > 1e-4 ? 20 * Math.log10(zn) : -60;
      } catch {
        zn = 0, fl = 0, ka = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: zn,
        peak: fl,
        db: ka,
        gain: Vo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), dc = requestAnimationFrame(t);
  };
  dc = requestAnimationFrame(t);
}
function ym({ isPlaying: e = !1 }) {
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
function Dx({
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
      onClick: (c) => c.stopPropagation(),
      children: /* @__PURE__ */ s.jsxs("div", { className: "vertical-display-strip", role: "toolbar", children: [
        l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `display-strip-btn btn-auto ${a ? "is-active" : ""}`,
            onClick: (c) => {
              c.stopPropagation(), n == null || n("auto");
            },
            title: "Auto-Director: Automatically follow active keyboard/mouse cuts",
            "aria-label": "Auto-Director",
            children: /* @__PURE__ */ s.jsx("span", { className: "auto-icon", children: "⚡" })
          }
        ),
        e.map((c, u) => {
          const h = (c.displayId ?? c.DisplayId ?? `mon-${u}`).toLowerCase(), y = !a && o === h, p = c.width ?? c.Width ?? 1920, f = c.height ?? c.Height ?? 1080, v = c.displayName ?? c.DisplayName ?? `Monitor ${u + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${y ? "is-active" : ""}`,
              onClick: (b) => {
                b.stopPropagation(), n == null || n(h);
              },
              title: `Switch window to Monitor ${u + 1}: ${v} (${p}×${f})`,
              "aria-label": `Monitor ${u + 1}`,
              children: /* @__PURE__ */ s.jsx("span", { className: "number-label", children: u + 1 })
            },
            h
          );
        })
      ] })
    }
  );
}
function vm({
  displays: e = [],
  activeDisplayId: t = "mon-0",
  onSelectDisplay: n,
  isTransitioning: r = !1,
  mode: l = "AUTO",
  // 'AUTO' or 'MANUAL'
  activeTimeRange: o = ""
}) {
  const a = l === "AUTO", c = i.useMemo(() => {
    if (!e || e.length <= 1) return null;
    let b = 1 / 0, E = 1 / 0, D = -1 / 0, k = -1 / 0;
    e.forEach((M) => {
      const S = M.x ?? M.X ?? 0, C = M.y ?? M.Y ?? 0, N = M.width ?? M.Width ?? 1920, g = M.height ?? M.Height ?? 1080;
      b = Math.min(b, S), E = Math.min(E, C), D = Math.max(D, S + N), k = Math.max(k, C + g);
    });
    const m = Math.max(1, D - b), j = Math.max(1, k - E);
    return { minX: b, minY: E, totalW: m, totalH: j };
  }, [e]);
  if (!e || e.length <= 1 || !c)
    return null;
  const u = e.find((b) => (b.displayId ?? b.DisplayId) === t) || e[0], h = e.indexOf(u), y = h >= 0 ? h + 1 : 1, f = (u ? u.displayName ?? u.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), v = f && !f.toLowerCase().includes("screen") ? `SCREEN ${y} (${f.toUpperCase()})` : f ? f.toUpperCase() : `SCREEN ${y}`;
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${a ? "is-auto-mode is-read-only" : "is-manual-mode is-interactive"} ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (b) => b.stopPropagation(),
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "hud-header", children: /* @__PURE__ */ s.jsxs(
          "span",
          {
            className: `hud-badge ${l.toLowerCase()} ${a ? "is-read-only" : "is-interactive"}`,
            title: a ? "Auto-Director Active: Reflecting active screen at current playhead position (Locked / Read-Only)" : "Manual Override: Click any screen box below to switch active display",
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-pulse" }),
              /* @__PURE__ */ s.jsx("span", { className: "hud-mode-text", children: a ? "⚡ AUTO-DIRECTOR" : "✋ OVERRIDE" }),
              /* @__PURE__ */ s.jsx("span", { className: "hud-colon", children: ":" }),
              /* @__PURE__ */ s.jsx("span", { className: "hud-screen-text", children: v }),
              a && /* @__PURE__ */ s.jsx("span", { className: "hud-lock-icon", title: "Auto-Director is controlling screen cuts (Selection Read-Only)", children: "🔒" }),
              o && /* @__PURE__ */ s.jsxs("span", { className: "hud-time-range", children: [
                " [",
                o,
                "]"
              ] })
            ]
          }
        ) }),
        a && /* @__PURE__ */ s.jsxs("div", { className: "hud-reflection-indicator", title: "Status reflection: Displays active screen selected by Auto-Director cuts", children: [
          /* @__PURE__ */ s.jsx("span", { className: "reflection-icon", children: "👁️" }),
          /* @__PURE__ */ s.jsx("span", { className: "reflection-text", children: "AUTO-DIRECTOR REFLECTION" })
        ] }),
        r && /* @__PURE__ */ s.jsxs("div", { className: "hud-transition-alert", children: [
          /* @__PURE__ */ s.jsx("span", { className: "transition-icon", children: "⚡" }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "SWITCHED TO ",
            v
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "hud-canvas-wrap", children: /* @__PURE__ */ s.jsx(
          "svg",
          {
            className: "hud-topology-svg",
            viewBox: `0 0 ${c.totalW} ${c.totalH}`,
            preserveAspectRatio: "xMidYMid meet",
            children: e.map((b, E) => {
              const D = b.displayId ?? b.DisplayId ?? `mon-${E}`, k = (b.x ?? b.X ?? 0) - c.minX, m = (b.y ?? b.Y ?? 0) - c.minY, j = b.width ?? b.Width ?? 1920, M = b.height ?? b.Height ?? 1080, S = D === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${S ? "is-active" : "is-inactive"} ${a ? "is-read-only" : "is-interactive"}`,
                  onClick: (C) => {
                    C.stopPropagation(), !a && (n == null || n(D));
                  },
                  children: [
                    /* @__PURE__ */ s.jsx("title", { children: a ? `Screen ${E + 1} (${S ? "Active by Auto-Director" : "Inactive"}) • Auto-Director Reflection (Read-Only)` : `Click to switch to Screen ${E + 1}` }),
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: k + 10,
                        y: m + 10,
                        width: Math.max(10, j - 20),
                        height: Math.max(10, M - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: k + j / 2,
                        y: m + M / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: E + 1
                      }
                    )
                  ]
                },
                D
              );
            })
          }
        ) })
      ]
    }
  );
}
function Px({
  station: e,
  currentEpochMs: t,
  isOffline: n,
  isSolo: r,
  isPlaying: l,
  setIsPlaying: o,
  baseEpochMs: a,
  totalDurationMs: c,
  outPointMs: u,
  setPlayheadMs: h,
  isSpotlightActive: y,
  globalGaps: p = [],
  recordingSegments: f = {},
  playbackSpeed: v = 1,
  activeAudioStationId: b = null,
  directorPlan: E = null,
  isAutoDirectorEnabled: D = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: m = null,
  areAllDisplaysPlaced: j = !1,
  hideDisplayStrip: M = !1,
  isDecoderAllowed: S = !0,
  maxHeight: C = null
}) {
  var ze;
  const N = e.hostname || e.name || e.id || "", g = Math.round(t), [$, w] = i.useState(() => !N || !g ? null : Pn.get(N, g) || null), [_, G] = i.useState(""), [I, R] = i.useState(!1), [se, ne] = i.useState(!1), [re, P] = i.useState(!1), F = i.useRef(l), T = i.useRef(null), B = i.useRef(0), U = i.useRef(t - a), we = i.useRef(t - a), K = i.useRef(!1), z = i.useRef(null), V = i.useRef(!1);
  U.current = t - a;
  const ge = (e == null ? void 0 : e.displays) || ((ze = e == null ? void 0 : e.topology) == null ? void 0 : ze.displays) || [], [ye, ve] = i.useState(null);
  i.useEffect(() => {
    ve(null);
  }, [k]);
  const Oe = i.useMemo(() => {
    const ee = E || (e == null ? void 0 : e.directorPlan);
    return !ee || !ee.segments || ee.segments.length === 0 ? null : ee.segments.find((ue) => {
      const L = ue.startEpochMs ?? ue.StartEpochMs ?? 0, Y = ue.endEpochMs ?? ue.EndEpochMs ?? 0;
      return t >= L && t <= Y;
    }) || ee.segments[0];
  }, [E, e == null ? void 0 : e.directorPlan, t]), xe = i.useMemo(() => {
    var ee;
    return ge.length > 1 && D !== !1 && Oe ? (Oe.targetDisplayId || Oe.TargetDisplayId || "mon-0").toLowerCase() : ye ? ye.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : (((ee = ge[0]) == null ? void 0 : ee.displayId) || "mon-0").toLowerCase();
  }, [ye, k, ge, D, Oe]), Ee = i.useRef(xe), [tt, nt] = i.useState(!1);
  i.useEffect(() => {
    if (Ee.current && Ee.current !== xe) {
      nt(!0);
      const ee = setTimeout(() => nt(!1), 2e3);
      return Ee.current = xe, () => clearTimeout(ee);
    }
    Ee.current = xe;
  }, [xe]);
  const zt = f[e == null ? void 0 : e.id] || f[N] || (e == null ? void 0 : e.segments) || [], jt = zt.length === 0 || zt.some((ee) => {
    const ue = ee.startEpochMs ?? ee.startEpoch ?? 0, L = ee.endEpochMs ?? ee.endEpoch ?? 0;
    return t >= ue && t <= L;
  }), St = !!(r ? !Pl().isMuted : b && (e.id === b || N === b)), H = i.useCallback(() => {
    if (!T.current) return;
    const ee = Pl();
    if (r)
      T.current.volume = ee.volume, T.current.muted = ee.isMuted, ee.isMuted || hi(T.current);
    else {
      const ue = !!(b && (e.id === b || N === b));
      T.current.muted = !ue, ue && (T.current.volume = ee.volume, hi(T.current));
    }
  }, [r, b, e.id, N]);
  i.useEffect(() => {
    H();
  }, [H]), i.useEffect(() => {
    const ee = (ue) => {
      T.current && ue.detail && H();
    };
    return window.addEventListener("itb-audio-state-changed", ee), () => window.removeEventListener("itb-audio-state-changed", ee);
  }, [H]), i.useEffect(() => {
    T.current && (T.current.defaultPlaybackRate = v, T.current.playbackRate = v);
  }, [v]), i.useEffect(() => {
    if (n || !g || !N) return;
    if (l && S) {
      F.current = !0;
      return;
    }
    const ee = F.current;
    F.current = l;
    let ue = !0;
    const L = new AbortController(), Y = Pn.get(N, g, xe);
    if (Y) {
      w(Y), ne(!1), P(!1);
      return;
    }
    P(!0);
    const q = setTimeout(() => {
      ue && Pn.fetchFrame(N, g, L.signal, xe).then((J) => {
        ue && (P(!1), J && J !== "NO_SIGNAL" ? (w(J), ne(!1)) : J === "NO_SIGNAL" && ne(!0));
      });
    }, l ? 180 : ee ? 25 : 40), le = Pn.subscribe((J, ie, Fe, Je) => {
      J === N && ie === g && (!Je || Je === xe) && ue && (P(!1), Fe && Fe !== "NO_SIGNAL" ? (w(Fe), ne(!1)) : Fe === "NO_SIGNAL" && ne(!0));
    });
    return () => {
      ue = !1, clearTimeout(q), L.abort(), le();
    };
  }, [N, g, n, l, r, I, xe, S]), i.useEffect(() => {
    if (!N || !(r || l && S)) {
      (!l || !S) && (z.current && clearTimeout(z.current), K.current = !1, G(""), R(!1), T.current && (T.current.pause(), T.current.removeAttribute("src"), T.current.load()));
      return;
    }
    let ue = null;
    return l && !y && jt ? ue = setTimeout(() => {
      const L = U.current;
      B.current = L, we.current = L, K.current = !1;
      const Y = C && C < 1080 ? `&maxHeight=${C}` : "", Z = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + L}&displayId=${encodeURIComponent(xe)}${Y}&_t=${Date.now()}`;
      R(!1), G(Z);
    }, 80) : l || (z.current && clearTimeout(z.current), K.current = !1, G(""), R(!1), T.current && (T.current.pause(), T.current.removeAttribute("src"), T.current.load())), () => {
      ue && clearTimeout(ue);
    };
  }, [l, r, N, a, c, y, jt, xe, S, C]), i.useEffect(() => {
    if (!N || !(r || l)) return;
    const ue = U.current, L = Math.abs(ue - we.current);
    if (!l || L < 800) {
      we.current = ue;
      return;
    }
    return K.current = !0, we.current = ue, B.current = ue, T.current && T.current.pause(), R(!1), z.current && clearTimeout(z.current), z.current = setTimeout(() => {
      if (!jt || y) {
        G(""), R(!1), K.current = !1;
        return;
      }
      const Y = U.current, Z = C && C < 1080 ? `&maxHeight=${C}` : "", q = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + Y}&displayId=${encodeURIComponent(xe)}${Z}&_t=${Date.now()}`;
      G(q);
    }, 75), () => {
      z.current && clearTimeout(z.current);
    };
  }, [t, l, r, N, a, c, y, jt, xe, S, C]), i.useEffect(() => {
    if (r || !l || !T.current || !I || K.current) return;
    const ee = (U.current - B.current) / 1e3;
    if (ee >= 0) {
      const ue = T.current, L = ue.currentTime, Y = Math.abs(L - ee);
      if (Y > 0.35 && Y < 3)
        try {
          ue.currentTime = ee;
        } catch {
        }
    }
  }, [r, l, t, I]), i.useEffect(() => {
    if (!r || !l || !_ || !I || y) return;
    let ee = null, ue = T.current ? T.current.currentTime : 0, L = performance.now(), Y = B.current + Math.round(ue * 1e3);
    const Z = () => {
      const q = T.current;
      if (q && !q.paused && !q.ended && !V.current && !K.current) {
        const le = performance.now(), J = q.currentTime;
        Math.abs(J - ue) > 5e-4 && (ue = J, L = le);
        const ie = Math.max(0, (le - L) / 1e3), Fe = q.playbackRate || v || 1, Je = ue + ie * Fe;
        let _e = B.current + Math.round(Je * 1e3);
        const pt = _e - Y;
        if (pt < 0 && pt > -300 && (_e = Y), _e >= u) {
          o == null || o(!1), h == null || h(u);
          return;
        }
        const st = a + _e, ct = p == null ? void 0 : p.find((Ze) => st >= Ze.startEpochMs && st < Ze.endEpochMs);
        if (ct) {
          V.current = !0;
          const Ze = ct.endEpochMs - a;
          h(Ze), B.current = Ze, Y = Ze, we.current = Ze;
          const Gt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + Ze}&_t=${Date.now()}`;
          R(!1), G(Gt), setTimeout(() => {
            V.current = !1;
          }, 300);
          return;
        }
        _e !== Y && (Y = _e, we.current = _e, h == null || h(_e));
      }
      ee = requestAnimationFrame(Z);
    };
    return ee = requestAnimationFrame(Z), () => {
      ee && cancelAnimationFrame(ee);
    };
  }, [
    r,
    l,
    _,
    I,
    y,
    v,
    u,
    a,
    c,
    N,
    p,
    h,
    o
  ]);
  const Ae = () => {
    if (V.current) return;
    const ee = a + U.current, ue = zt.map((L) => ({ start: L.startEpochMs ?? L.startEpoch ?? 0, end: L.endEpochMs ?? L.endEpoch ?? 0 })).filter((L) => L.start > ee + 200).sort((L, Y) => L.start - Y.start)[0];
    if (ue && ue.start - a < u) {
      V.current = !0;
      const L = ue.start - a;
      h(L), B.current = L;
      const Y = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + L}&_t=${Date.now()}`;
      R(!1), G(Y), setTimeout(() => {
        V.current = !1;
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
        ref: T,
        src: _,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: I ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: I ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !St,
        onLoadedData: () => {
          T.current && (T.current.defaultPlaybackRate = v, T.current.playbackRate = v);
        },
        onCanPlay: () => {
          H(), T.current && (T.current.defaultPlaybackRate = v, T.current.playbackRate = v), l && T.current && T.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          K.current = !1, R(!0), H(), T.current && (T.current.defaultPlaybackRate = v, T.current.playbackRate = v);
        },
        onWaiting: () => {
          R(!1);
        },
        onTimeUpdate: () => {
          var ee;
          !I && ((ee = T.current) == null ? void 0 : ee.currentTime) > 0 && (K.current = !1, R(!0));
        },
        onEnded: Ae
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && I && !y ? 0 : 2,
          pointerEvents: "none"
        },
        children: $ && !se ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: $,
            alt: N,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => ne(!0)
          }
        ) : (!$ || se || !jt) && !_ ? /* @__PURE__ */ s.jsx(ym, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && jt && !I && !y && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          N
        ] })
      ] })
    ] }) }),
    ge.length > 1 && /* @__PURE__ */ s.jsx(
      vm,
      {
        displays: ge,
        activeDisplayId: xe,
        onSelectDisplay: (ee) => {
          D || (ve(ee), m == null || m(ee));
        },
        isTransitioning: tt,
        mode: D ? "AUTO" : "MANUAL"
      }
    ),
    !M && /* @__PURE__ */ s.jsx(
      Dx,
      {
        displays: ge,
        activeDisplayId: xe,
        onSelectDisplay: (ee) => {
          ve(ee), m == null || m(ee);
        },
        areAllDisplaysPlaced: j,
        isAutoDirectorEnabled: D
      }
    )
  ] });
}
function _x({
  station: e,
  isSolo: t = !1,
  stationsCount: n = 1,
  onDeselectStation: r = null,
  currentEpochMs: l,
  timeMode: o = "LOCAL",
  isPlaying: a,
  setIsPlaying: c,
  baseEpochMs: u,
  totalDurationMs: h,
  outPointMs: y,
  setPlayheadMs: p,
  isSpotlightActive: f,
  globalGaps: v = [],
  onOpenSpotlight: b,
  onSelectActiveStation: E,
  recordingSegments: D = {},
  playbackSpeed: k = 1,
  activeAudioStationId: m = null,
  onSoloAudio: j,
  directorPlan: M = null,
  isAutoDirectorEnabled: S = !0,
  targetDisplayId: C = "auto",
  onSelectDisplayId: N = null,
  areAllDisplaysPlaced: g = !1,
  _slotIndex: $ = 0,
  borderColor: w = null,
  onSwapWithNext: _ = null,
  isDecoderAllowed: G = !0,
  maxHeight: I = null
}) {
  var T;
  const R = !!(m && (e.id === m || e.hostname && e.hostname === m)), se = (e.hostname || e.name || "").includes("Offline"), ne = se ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((T = e == null ? void 0 : e.topology) == null ? void 0 : T.displays) || []).length > 1;
  const P = () => {
    if (t) {
      const B = C && C !== "auto" && C !== "director" ? C : null;
      b && b(e.id, B);
    } else
      E && E(e.id);
  }, F = (B) => {
    B.preventDefault(), B.stopPropagation(), t && E && (c && c(!1), E(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: P,
      onContextMenu: F,
      className: `camera-card ${ne} ${t ? "is-solo-card" : ""}`,
      style: w ? { borderColor: w } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${ne}` }),
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
            j && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${R ? "audio-active" : ""}`,
                onClick: (B) => {
                  B.stopPropagation(), j(R ? null : e.id);
                },
                title: R ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: R ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor", fillOpacity: "0.25" }),
                  /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" })
                ] }) : /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                ] })
              }
            ),
            b && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (B) => {
                  B.stopPropagation();
                  const U = C && C !== "auto" && C !== "director" ? C : null;
                  b(e.id, U);
                },
                title: "Cinema Fullscreen Inspection",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) })
              }
            ),
            E && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (B) => {
                  B.stopPropagation(), t && c && c(!1), E(t ? null : e.id);
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
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${se ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Px,
            {
              station: e,
              currentEpochMs: l,
              isOffline: se,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: c,
              baseEpochMs: u,
              totalDurationMs: h,
              outPointMs: y,
              setPlayheadMs: p,
              isSpotlightActive: f,
              globalGaps: v,
              recordingSegments: D,
              playbackSpeed: k,
              activeAudioStationId: m,
              directorPlan: M,
              isAutoDirectorEnabled: S,
              targetDisplayId: C,
              onSelectDisplayId: N,
              areAllDisplaysPlaced: g,
              hideDisplayStrip: !0,
              isDecoderAllowed: G,
              maxHeight: I
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
        !se && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          Mt(l, o)
        ] }) })
      ]
    }
  ) });
}
const vo = ["top-right", "bottom-right", "bottom-left", "top-left"];
function Nm(e) {
  if (!e || typeof e != "string")
    return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
  const t = e.trim().toLowerCase();
  if (vo.includes(t)) {
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
function uu(e) {
  const t = Nm(e);
  return t.isCustom ? `CUSTOM (${Math.round(t.xPct)}% X, ${Math.round(t.yPct)}% Y)` : (t.preset || "top-right").toUpperCase();
}
function Bx({
  currentEpochMs: e,
  position: t = null,
  onPositionChange: n = null
}) {
  var G;
  const r = i.useRef(null), l = i.useRef(null), [o, a] = i.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), c = t || o, u = Nm(c), [h, y] = i.useState(!1), [p, f] = i.useState(null);
  i.useEffect(() => {
    h || (u.isCustom ? f({ xPct: u.xPct, yPct: u.yPct }) : f(null));
  }, [c, h, u.isCustom, u.xPct, u.yPct]);
  const v = i.useCallback((I) => {
    I && (I.preventDefault(), I.stopPropagation());
    let R;
    if (u.isCustom || !vo.includes(u.preset))
      R = "top-right";
    else {
      const ne = (vo.indexOf(u.preset) + 1) % vo.length;
      R = vo[ne];
    }
    a(R), f(null);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", R);
    } catch {
    }
    n && n(R);
  }, [u.isCustom, u.preset, n]), b = i.useCallback((I) => {
    if (I.button !== void 0 && I.button !== 0 || I.target.closest(".btn-cycle-corner")) return;
    const R = r.current;
    if (!R) return;
    const se = R.parentElement;
    if (!se) return;
    const ne = R.getBoundingClientRect(), re = se.getBoundingClientRect();
    l.current = {
      startX: I.clientX,
      startY: I.clientY,
      clockWidth: ne.width,
      clockHeight: ne.height,
      parentRect: re,
      offsetX: I.clientX - ne.left,
      offsetY: I.clientY - ne.top,
      hasMoved: !1
    };
    const P = (T) => {
      if (!l.current) return;
      const B = l.current, U = Math.hypot(T.clientX - B.startX, T.clientY - B.startY);
      if (!B.hasMoved && U > 4 && (B.hasMoved = !0, y(!0)), !B.hasMoved) return;
      const we = B.parentRect.width, K = B.parentRect.height, z = Math.max(1, we - B.clockWidth - 28), V = Math.max(1, K - B.clockHeight - 28), ge = T.clientX - B.parentRect.left - B.offsetX - 14, ye = T.clientY - B.parentRect.top - B.offsetY - 14, ve = Math.max(0, Math.min(z, ge)), Oe = Math.max(0, Math.min(V, ye)), xe = Math.round(ve / z * 1e3) / 10, Ee = Math.round(Oe / V * 1e3) / 10;
      f({ xPct: xe, yPct: Ee });
    }, F = (T) => {
      window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", F), window.removeEventListener("pointercancel", F);
      const B = l.current;
      if (l.current = null, y(!1), !B) return;
      if (!B.hasMoved) {
        v();
        return;
      }
      const U = Math.max(1, B.parentRect.width - B.clockWidth - 28), we = Math.max(1, B.parentRect.height - B.clockHeight - 28), K = T.clientX - B.parentRect.left - B.offsetX - 14, z = T.clientY - B.parentRect.top - B.offsetY - 14, V = Math.max(0, Math.min(U, K)), ge = Math.max(0, Math.min(we, z)), ye = V / U * 100, ve = ge / we * 100;
      let Oe;
      ye > 94 && ve < 6 ? Oe = "top-right" : ye < 6 && ve < 6 ? Oe = "top-left" : ye > 94 && ve > 94 ? Oe = "bottom-right" : ye < 6 && ve > 94 ? Oe = "bottom-left" : Oe = `custom:${ye.toFixed(1)},${ve.toFixed(1)}`, a(Oe);
      try {
        localStorage.setItem("itb_canvas_utc_clock_pos", Oe);
      } catch {
      }
      n && n(Oe);
    };
    window.addEventListener("pointermove", P), window.addEventListener("pointerup", F), window.addEventListener("pointercancel", F);
  }, [v, n]), E = new Date(e || Date.now()), D = E.getUTCFullYear(), k = String(E.getUTCMonth() + 1).padStart(2, "0"), m = String(E.getUTCDate()).padStart(2, "0"), j = String(E.getUTCHours()).padStart(2, "0"), M = String(E.getUTCMinutes()).padStart(2, "0"), S = String(E.getUTCSeconds()).padStart(2, "0"), C = `${D}-${k}-${m}`, N = `${j}:${M}:${S} UTC`, g = p !== null || u.isCustom, $ = p || (u.isCustom ? { xPct: u.xPct, yPct: u.yPct } : null);
  let w;
  if ($) {
    const I = $.xPct / 100, R = $.yPct / 100;
    w = {
      left: `calc(14px + (100% - 28px) * ${I})`,
      top: `calc(14px + (100% - 28px) * ${R})`,
      transform: `translate(-${$.xPct}%, -${$.yPct}%)`,
      right: "auto",
      bottom: "auto"
    };
  }
  const _ = !g && u.preset ? `corner-${u.preset}` : "";
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      ref: r,
      className: `canvas-utc-wall-clock ${_} ${h ? "is-dragging" : ""} ${g ? "is-custom" : ""}`,
      style: w,
      onPointerDown: b,
      title: "Persistent Canvas UTC Wall Clock • Drag to place anywhere on canvas • Click or use [⤢] to cycle corners",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: C }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-sep", children: "•" }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-time-val", children: N })
        ] }),
        h && $ && /* @__PURE__ */ s.jsx("div", { className: "clock-drag-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
          Math.round($.xPct),
          "%, ",
          Math.round($.yPct),
          "%"
        ] }) }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cycle-corner",
            onClick: v,
            title: g ? `Custom Position (${Math.round(($ == null ? void 0 : $.xPct) || 0)}%, ${Math.round(($ == null ? void 0 : $.yPct) || 0)}%) • Click to snap to TOP-RIGHT` : `Current corner: ${((G = u.preset) == null ? void 0 : G.toUpperCase()) || "TOP-RIGHT"} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function Wx() {
  const [e, t] = i.useState(null), [n, r] = i.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  if (i.useEffect(() => {
    const a = (u) => {
      t(u.detail || null);
    }, c = (u) => {
      u.detail && r(u.detail);
    };
    return window.addEventListener("itb-active-audio-source", a), window.addEventListener("itb-live-audio-level", c), () => {
      window.removeEventListener("itb-active-audio-source", a), window.removeEventListener("itb-live-audio-level", c);
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
const _a = 2500, Fx = {
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
function Ux(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Fx[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function km(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Ux), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Hx(e, t = " + ") {
  return km(e).join(t);
}
function uo(e) {
  return Hx(e, "+");
}
const hc = 2200, fc = 400;
function wm({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN",
  // Options: 'NONE' | 'BURN_IN' | 'OFF'
  targetStationId: r = null,
  targetDisplayId: l = null,
  displays: o = [],
  directorPlan: a = null
}) {
  const u = (n || "NONE").toUpperCase().replace("-", "_") === "BURN_IN", h = i.useMemo(() => {
    if (!u || !t.length || !e) return null;
    let f = l ? String(l).toLowerCase() : null;
    if (f === "auto" && (a != null && a.segments)) {
      const b = a.segments.find((E) => e >= E.startEpochMs && e < E.endEpochMs);
      f = ((b == null ? void 0 : b.activeDisplayId) || "mon-0").toLowerCase();
    }
    const v = r ? String(r).toLowerCase() : null;
    for (let b = t.length - 1; b >= 0; b--) {
      const E = t[b];
      if (!E) continue;
      if (v) {
        const m = (E.stationId || E.stationHostname || E.stationName || E.hostname || "").toLowerCase();
        if (m && m !== v)
          continue;
      }
      if (f && f !== "canvas" && f !== "all-displays") {
        let m = (E.displayId || E.DisplayId || "").toLowerCase();
        if (!m && o && o.length > 0) {
          const j = E.x ?? E.X, M = E.y ?? E.Y;
          if (typeof j == "number" && typeof M == "number") {
            const S = o.find((C) => {
              const N = C.X ?? C.x ?? 0, g = C.Y ?? C.y ?? 0, $ = C.Width ?? C.width ?? 1920, w = C.Height ?? C.height ?? 1080;
              return j >= N && j < N + $ && M >= g && M < g + w;
            });
            S && (m = (S.DisplayId || S.displayId || "mon-0").toLowerCase());
          }
        }
        if (m || (m = "mon-0"), f !== m)
          continue;
      }
      const D = E.epochMs + _a, k = e - D;
      if (k >= 0 && k <= hc)
        return {
          ...E,
          elapsed: k
        };
    }
    return null;
  }, [u, e, t, r, l, o, a]);
  if (!u || !h) return null;
  let y = 1;
  if (h.elapsed > hc - fc) {
    const f = (h.elapsed - (hc - fc)) / fc;
    y = Math.max(0, 1 - f);
  }
  if (y <= 0.05) return null;
  const p = km(h.keyCombination);
  return p.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: y }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: p.map((f, v) => /* @__PURE__ */ s.jsxs(pi.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: f.toUpperCase() }) }),
    v < p.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, v)) }) }) : null;
}
function on(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function zx(e) {
  const t = on(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Kx(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Vx({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var E, D, k, m, j, M;
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
    return ((E = l.layout) == null ? void 0 : E.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), c = o.transitionType || "smooth", u = o.timestampEpochMs - a;
  if (t < u)
    return ((D = l.layout) == null ? void 0 : D.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((k = o.layout) == null ? void 0 : k.placements) || n;
  if (c === "cut")
    return ((m = l.layout) == null ? void 0 : m.placements) || n;
  const h = (t - u) / a, y = on(h, 0, 1), p = c === "linear" ? y : zx(y), f = ((j = l.layout) == null ? void 0 : j.placements) || [], v = ((M = o.layout) == null ? void 0 : M.placements) || [], b = v.map((S) => {
    const C = f.find((G) => G.stationId === S.stationId && G.displayId === S.displayId);
    if (!C)
      return {
        ...S,
        opacity: Math.max(0.05, p)
      };
    const N = Math.round(C.x + (S.x - C.x) * p), g = Math.round(C.y + (S.y - C.y) * p), $ = Math.round(C.width + (S.width - C.width) * p), w = Math.round(C.height + (S.height - C.height) * p), _ = Number(((C.rotation || 0) + ((S.rotation || 0) - (C.rotation || 0)) * p).toFixed(1));
    return {
      ...S,
      x: N,
      y: g,
      width: $,
      height: w,
      rotation: _,
      opacity: 1
    };
  });
  return f.forEach((S) => {
    v.some((N) => N.stationId === S.stationId && N.displayId === S.displayId) || b.push({
      ...S,
      opacity: Math.max(0, 1 - p)
    });
  }), b;
}
function Yx({
  prevTimeline: e,
  newPlacements: t,
  currentEpochMs: n,
  baseEpochMs: r,
  toleranceMs: l = 500,
  virtualW: o = 1920,
  virtualH: a = 1080,
  fps: c = 30,
  utcClockPosition: u = null
}) {
  var k, m, j;
  const h = [...(e == null ? void 0 : e.keyframes) || []];
  if (h.length === 0) {
    const M = u || "top-right", S = {
      id: `kf_root_${Date.now()}`,
      timestampEpochMs: r,
      transitionDurationSec: 0.5,
      transitionType: "smooth",
      utcClockPosition: M,
      layout: {
        width: o,
        height: a,
        backgroundColor: "#070A10",
        fps: c,
        utcClockPosition: M,
        placements: t
      }
    };
    return {
      nextTimeline: { ...e || {}, keyframes: [S] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: S
    };
  }
  const y = h.findIndex((M) => Math.abs(M.timestampEpochMs - n) <= l);
  if (y >= 0) {
    const M = h[y].utcClockPosition || ((k = h[y].layout) == null ? void 0 : k.utcClockPosition), S = u || M || "top-right";
    return h[y] = {
      ...h[y],
      utcClockPosition: S,
      layout: {
        ...h[y].layout,
        width: o,
        height: a,
        utcClockPosition: S,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: h },
      newIndex: y,
      isNewKeyframe: !1,
      activeKeyframe: h[y]
    };
  }
  if (n <= r + l) {
    const M = h[0].utcClockPosition || ((m = h[0].layout) == null ? void 0 : m.utcClockPosition), S = u || M || "top-right";
    return h[0] = {
      ...h[0],
      utcClockPosition: S,
      layout: {
        ...h[0].layout,
        width: o,
        height: a,
        utcClockPosition: S,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: h },
      newIndex: 0,
      isNewKeyframe: !1,
      activeKeyframe: h[0]
    };
  }
  const p = [...h].reverse().find((M) => M.timestampEpochMs <= n) || h[0], f = u || (p == null ? void 0 : p.utcClockPosition) || ((j = p == null ? void 0 : p.layout) == null ? void 0 : j.utcClockPosition) || "top-right", v = {
    id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestampEpochMs: Math.round(n),
    transitionDurationSec: 0.5,
    transitionType: "smooth",
    utcClockPosition: f,
    layout: {
      width: o,
      height: a,
      backgroundColor: "#070A10",
      fps: c,
      utcClockPosition: f,
      placements: t
    }
  }, b = [...h, v].sort((M, S) => M.timestampEpochMs - S.timestampEpochMs), E = b.findIndex((M) => M.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: b },
    newIndex: E >= 0 ? E : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function du(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function hu(e, t, n) {
  if (!e || !Array.isArray(e.keyframes) || t < 0 || t >= e.keyframes.length)
    return e;
  const r = [...e.keyframes], l = r[t], o = n || "top-right";
  return r[t] = {
    ...l,
    utcClockPosition: o,
    layout: {
      ...l.layout || {},
      utcClockPosition: o
    }
  }, {
    ...e,
    keyframes: r
  };
}
function Xx(e, t) {
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
function zh(e, t, n, r = 500) {
  var f;
  const l = (e == null ? void 0 : e.keyframes) || [], o = l.findIndex((v) => Math.abs(v.timestampEpochMs - t) <= r);
  if (o >= 0)
    return {
      nextTimeline: e,
      newIndex: o,
      isNew: !1
    };
  const a = [...l].reverse().find((v) => v.timestampEpochMs <= t) || l[0], c = (n == null ? void 0 : n.utcClockPosition) || (a == null ? void 0 : a.utcClockPosition) || ((f = a == null ? void 0 : a.layout) == null ? void 0 : f.utcClockPosition) || "top-right", u = n ? JSON.parse(JSON.stringify(n)) : {};
  u.utcClockPosition = c;
  const h = {
    id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestampEpochMs: Math.round(t),
    transitionDurationSec: 0.5,
    transitionType: "smooth",
    utcClockPosition: c,
    layout: u
  }, y = [...l, h].sort((v, b) => v.timestampEpochMs - b.timestampEpochMs), p = y.findIndex((v) => v.id === h.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: y
    },
    newIndex: p >= 0 ? p : 0,
    isNew: !0
  };
}
function Gx(e, t = [], n = [], r = null, l = null, o = "mon-0") {
  let a = Array.isArray(e) ? e.map((h) => ({
    ...h,
    startEpochMs: h.startEpochMs ?? h.StartEpochMs ?? 0,
    endEpochMs: h.endEpochMs ?? h.EndEpochMs ?? 0,
    targetDisplayId: (h.targetDisplayId || h.TargetDisplayId || o || "mon-0").toLowerCase()
  })).sort((h, y) => h.startEpochMs - y.startEpochMs) : [];
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
      for (let h = 0; h < a.length - 1; h++)
        a[h + 1].startEpochMs > a[h].endEpochMs && (a[h].endEpochMs = a[h + 1].startEpochMs);
    }
  const c = [];
  Array.isArray(n) && n.length > 0 && n.forEach((h) => {
    const y = h.startEpochMs ?? h.StartEpochMs ?? h.startEpoch ?? 0, p = h.endEpochMs ?? h.EndEpochMs ?? h.endEpoch ?? 0;
    p > y && c.push({ startEpoch: y, endEpoch: p });
  }), Array.isArray(t) && t.filter((h) => h.type === "global").forEach((h) => {
    const y = h.startEpochMs ?? h.startEpoch ?? 0, p = h.endEpochMs ?? h.endEpoch ?? 0;
    p > y && !c.some((f) => f.startEpoch === y && f.endEpoch === p) && c.push({ startEpoch: y, endEpoch: p });
  }), c.forEach((h) => {
    const y = h.startEpoch, p = h.endEpoch, f = [];
    a.forEach((v) => {
      v.endEpochMs <= y || v.startEpochMs >= p ? f.push(v) : (v.startEpochMs < y && f.push({
        ...v,
        endEpochMs: y
      }), v.endEpochMs > p && f.push({
        ...v,
        startEpochMs: p
      }));
    }), a = f;
  }), (t || []).filter((h) => h.type !== "global").forEach((h) => {
    const y = h.startEpochMs ?? h.StartEpochMs ?? h.startEpoch ?? 0, p = h.endEpochMs ?? h.EndEpochMs ?? h.endEpoch ?? 0;
    if (!(!y || !p || p <= y))
      for (let f = a.length - 1; f > 0; f--) {
        const v = a[f].startEpochMs;
        v >= y && v <= p && a[f].startEpochMs === a[f - 1].endEpochMs && (a[f - 1].endEpochMs = a[f].endEpochMs, a.splice(f, 1));
      }
  });
  for (let h = a.length - 1; h > 0; h--)
    a[h].targetDisplayId === a[h - 1].targetDisplayId && a[h].startEpochMs === a[h - 1].endEpochMs && (a[h - 1].endEpochMs = a[h].endEpochMs, a.splice(h, 1));
  return a;
}
const jm = 4;
function Qx(e, t) {
  return !t || t <= 0 ? null : t <= 360 ? 360 : t <= 540 ? 480 : t <= 750 ? 720 : null;
}
function Jx(e, {
  maxConcurrentDecoders: t = jm,
  activeAudioStationId: n = null,
  selectedFeedIndex: r = null,
  hoveredFeedIndex: l = null
} = {}) {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  if (e.length <= t)
    return e.map(() => !0);
  const a = e.map((u, h) => {
    var E, D;
    const y = u.width || 1920, p = u.height || 1080;
    let f = y * p;
    const v = (u.stationId || u.hostname || ((E = u.station) == null ? void 0 : E.id) || ((D = u.station) == null ? void 0 : D.hostname) || "").toLowerCase(), b = (n || "").toLowerCase();
    return b && (v === b || v.includes(b) || b.includes(v)) && (f += 1e8), r === h && (f += 5e7), l === h && (f += 25e6), { idx: h, score: f };
  });
  a.sort((u, h) => h.score - u.score);
  const c = new Set(a.slice(0, t).map((u) => u.idx));
  return e.map((u, h) => c.has(h));
}
const Ba = [
  { id: "4K", label: "4K UHD", shortLabel: "4K", baseH: 2160, desc: "Ultra-High Density" },
  { id: "2K", label: "2K QHD / WQXGA", shortLabel: "2K", baseH: 1440, desc: "High Pixel Density (Default)" },
  { id: "FHD", label: "1080p FHD", shortLabel: "FHD", baseH: 1080, desc: "Standard Full HD" },
  { id: "HD", label: "720p HD", shortLabel: "HD", baseH: 720, desc: "Compact Fast Export" }
], Fs = "CUSTOM", es = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 2560, h: 1440 },
  { id: "16:10", label: "16:10 WUXGA / WQXGA", ratio: 16 / 10, w: 2560, h: 1600 },
  { id: "19:10", label: "19:10 NOC Extended", ratio: 19 / 10, w: 2736, h: 1440 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 3440, h: 1440 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 5120, h: 1440 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1920, h: 1440 }
], qx = "16:9", fu = 2560, pu = 1440;
function Cs(e, t = 320, n = 7680) {
  let r = Number(e);
  return isNaN(r) && (r = t), r = Math.max(t, Math.min(n, Math.round(r))), r -= r % 2, r;
}
function mu(e) {
  if (!e || typeof e != "string") return null;
  const t = e.trim().match(/^(\d{3,5})\s*[xX×]\s*(\d{3,5})$/);
  if (t) {
    const n = Cs(parseInt(t[1], 10), 320, 7680), r = Cs(parseInt(t[2], 10), 180, 4320);
    return { w: n, h: r };
  }
  return null;
}
function gu(e) {
  if (!e || typeof e != "string") return null;
  const t = e.trim().match(/^([\d.]+)\s*:\s*([\d.]+)$/);
  if (t) {
    const n = parseFloat(t[1]), r = parseFloat(t[2]);
    if (n > 0 && r > 0)
      return n / r;
  }
  return null;
}
function ur(e = "2K", t = "16:9", n = null) {
  if ((e === "CUSTOM" || n && !Ba.some((c) => c.id === e)) && n && n.w && n.h)
    return {
      w: Cs(n.w, 320, 7680),
      h: Cs(n.h, 180, 4320)
    };
  if (typeof e == "string" && (e.includes("x") || e.includes("X") || e.includes("×"))) {
    const c = mu(e);
    if (c) return c;
  }
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
  const r = es.find((c) => c.id === t), l = r ? r.ratio : gu(t) || 16 / 9, o = e === "4K" ? 2160 : e === "2K" ? 1440 : e === "HD" ? 720 : 1080;
  let a = Math.round(o * l);
  return a -= a % 2, { w: a, h: o };
}
function Hr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 19 / 10) < 0.04 ? "19:10" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
const $t = [
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
], Zx = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function ey(e, t, n) {
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
function gr(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, a = n / r;
  let c, u, h, y;
  return o >= a ? (c = n, u = Math.round(c / o), h = e, y = t + Math.round((r - u) / 2)) : (u = r, c = Math.round(u * o), h = e + Math.round((n - c) / 2), y = t), { x: h, y, width: c, height: u };
}
function dr(e, t = fu, n = pu) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const u = e[0], h = u.nativeAspectRatio || (u.sourceWidth && u.sourceHeight ? u.sourceWidth / u.sourceHeight : 16 / 9), { x: y, y: p, width: f, height: v } = gr(0, 0, t, n, h);
    return [{
      ...u,
      x: y,
      y: p,
      width: f,
      height: v,
      sourceWidth: u.sourceWidth || 1920,
      sourceHeight: u.sourceHeight || 1080,
      nativeAspectRatio: h,
      aspectRatio: h,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: $t[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const u = Math.round(t / 2);
    return e.slice(0, 2).map((h, y) => {
      const p = h.nativeAspectRatio || (h.sourceWidth && h.sourceHeight ? h.sourceWidth / h.sourceHeight : 1.7777777777777777), { x: f, y: v, width: b, height: E } = gr(y * u, 0, u, n, p);
      return {
        ...h,
        x: f,
        y: v,
        width: b,
        height: E,
        sourceWidth: h.sourceWidth || 1920,
        sourceHeight: h.sourceHeight || 1080,
        nativeAspectRatio: p,
        aspectRatio: p,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: $t[y % $t.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const f = Math.round(t / 3);
      return e.slice(0, 3).map((v, b) => {
        const E = v.nativeAspectRatio || (v.sourceWidth && v.sourceHeight ? v.sourceWidth / v.sourceHeight : 1.7777777777777777), { x: D, y: k, width: m, height: j } = gr(b * f, 0, f, n, E);
        return {
          ...v,
          x: D,
          y: k,
          width: m,
          height: j,
          sourceWidth: v.sourceWidth || 1920,
          sourceHeight: v.sourceHeight || 1080,
          nativeAspectRatio: E,
          aspectRatio: E,
          zIndex: b,
          rotation: 0,
          borderWidth: 2,
          borderColor: $t[b % $t.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const h = Math.round(t / 2), y = Math.round(n / 2), p = [
      { cx: 0, cy: 0 },
      { cx: h, cy: 0 },
      { cx: Math.round(h / 2), cy: y }
    ];
    return e.slice(0, 3).map((f, v) => {
      const b = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: E, cy: D } = p[v], { x: k, y: m, width: j, height: M } = gr(E, D, h, y, b);
      return {
        ...f,
        x: k,
        y: m,
        width: j,
        height: M,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: b,
        aspectRatio: b,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: $t[v % $t.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 4) {
    const u = Math.round(t / 2), h = Math.round(n / 2), y = [
      { cx: 0, cy: 0 },
      { cx: u, cy: 0 },
      { cx: 0, cy: h },
      { cx: u, cy: h }
    ];
    return e.slice(0, 4).map((p, f) => {
      const v = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: b, cy: E } = y[f], { x: D, y: k, width: m, height: j } = gr(b, E, u, h, v);
      return {
        ...p,
        x: D,
        y: k,
        width: m,
        height: j,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: v,
        aspectRatio: v,
        zIndex: f,
        rotation: 0,
        borderWidth: 2,
        borderColor: $t[f % $t.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), a = Math.floor(t / l), c = Math.floor(n / o);
  return e.map((u, h) => {
    const y = h % l, p = Math.floor(h / l), f = u.nativeAspectRatio || (u.sourceWidth && u.sourceHeight ? u.sourceWidth / u.sourceHeight : 16 / 9), { x: v, y: b, width: E, height: D } = gr(y * a, p * c, a, c, f);
    return {
      ...u,
      x: v,
      y: b,
      width: E,
      height: D,
      sourceWidth: u.sourceWidth || 1920,
      sourceHeight: u.sourceHeight || 1080,
      nativeAspectRatio: f,
      aspectRatio: f,
      zIndex: h,
      rotation: 0,
      borderWidth: 2,
      borderColor: $t[h % $t.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function ty({
  activeStation: e,
  timelineStations: t = [],
  allStations: n = [],
  onSelectActiveStation: r,
  onOpenSpotlight: l,
  onStationContextMenu: o,
  onDeselectStation: a = null,
  stationAutoDirectorMap: c = {},
  onToggleStationAutoDirector: u = null,
  baseEpochMs: h = 0,
  playheadMs: y = 0,
  playheadEpochMs: p = 0,
  timeMode: f = "LOCAL",
  isPlaying: v = !1,
  setIsPlaying: b,
  totalDurationMs: E,
  inPointMs: D = 0,
  outPointMs: k,
  setPlayheadMs: m,
  globalGaps: j = [],
  recordingSegments: M = {},
  playbackSpeed: S = 1,
  onChangePlaybackSpeed: C,
  keystrokeMode: N = "BurnIn",
  keystrokes: g = [],
  directorPlan: $ = null,
  onOverrideDisplay: w,
  onResetOverride: _,
  compositionLayout: G = "canvas",
  onChangeCompositionLayout: I,
  isAutoDirectorEnabled: R = !0,
  onToggleAutoDirector: se,
  onUpdateCanvasLayout: ne,
  canvasLayoutTimeline: re = null,
  onUpdateCanvasLayoutTimeline: P,
  activeKfIndex: F = 0,
  setActiveKfIndex: T,
  isModalOpen: B = !1,
  isGridFullscreen: U = void 0,
  onToggleGridFullscreen: we = null,
  activeFocusZone: K = "timeline",
  onFocusZoneChange: z = null
}) {
  const V = p > 0 ? p : h + y, [ge, ye] = i.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [ve, Oe] = i.useState(() => {
    var d;
    return ((d = t[0]) == null ? void 0 : d.id) || null;
  }), [xe, Ee] = i.useState(!1), [tt, nt] = i.useState(!1), [zt, jt] = i.useState(!1), [St, H] = i.useState(null), [Ae, ze] = i.useState({ index: null, position: null }), [ee, ue] = i.useState(!1), [L, Y] = i.useState(!1), [Z, q] = i.useState(!1), [le, J] = i.useState(!1), [ie, Fe] = i.useState(!1), [Je, _e] = i.useState(""), [pt, st] = i.useState(""), ct = i.useRef(null), [Ze, Gt] = i.useState(() => {
    try {
      const d = localStorage.getItem("itb_canvas_saved_presets");
      return d ? JSON.parse(d) : [];
    } catch {
      return [];
    }
  }), tn = (d) => {
    Gt(d);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(d));
    } catch {
    }
  }, [Tt, mt] = i.useState(!1), Rt = U !== void 0 ? U : Tt, [at, gt] = i.useState(!1);
  i.useRef(null);
  const fn = i.useRef(null), It = i.useRef(null), qt = i.useRef(null), [Ut, Ke] = i.useState({ width: 960, height: 540 }), [fe, Ue] = i.useState(null), [vt, he] = i.useState(!1), [te, de] = i.useState(null), [Ce, Be] = i.useState(""), et = i.useRef(null), [rt, Nt] = i.useState("");
  i.useEffect(() => {
    te !== null && et.current && (et.current.focus(), et.current.select());
  }, [te]), i.useEffect(() => {
    const d = (x) => {
      x.key === "Escape" && (he(!1), Ue(null));
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, []);
  const [it, dt] = i.useState(!1), [Kt, _t] = i.useState(!1), [Qt, Jt] = i.useState(!1), xn = i.useRef(null);
  i.useEffect(() => {
    if (!Qt) return;
    const d = (A) => {
      xn.current && !xn.current.contains(A.target) && Jt(!1);
    }, x = (A) => {
      A.key === "Escape" && Jt(!1);
    };
    return window.addEventListener("mousedown", d), window.addEventListener("keydown", x), () => {
      window.removeEventListener("mousedown", d), window.removeEventListener("keydown", x);
    };
  }, [Qt]), i.useEffect(() => {
    Jt(!1);
  }, [fe]);
  const [yn, is] = i.useState(!1), [Jn, cs] = i.useState(!1), [vs, cl] = i.useState({ vertical: null, horizontal: null }), [nn, Ws] = i.useState(!0), [Gl, Ql] = i.useState(!0), [er, qn] = i.useState(null), [Ln, On] = i.useState({ x: 0, y: 0, isInside: !1 }), tr = i.useRef(null), dn = i.useRef(null), En = i.useRef(!1), [kn, Lt] = i.useState("auto-grid"), Or = i.useRef(!0);
  i.useEffect(() => {
    const d = setTimeout(() => {
      Or.current = !1;
    }, 400);
    return () => clearTimeout(d);
  }, []);
  const Un = i.useRef([]), Vt = i.useRef([]), Ns = i.useRef(null), [, Dr] = i.useState(0), Ts = i.useRef(null), [Pr, Jl] = i.useState(null), Ot = i.useCallback((d, x = "success", A = "💾") => {
    Ts.current && clearTimeout(Ts.current), Jl({ text: d, type: x, icon: A }), Ts.current = setTimeout(() => {
      Jl(null), Ts.current = null;
    }, 2200);
  }, []), [mn, nr] = i.useState(() => {
    var A, Q, X, W, oe, Ne;
    const d = (X = (Q = (A = re == null ? void 0 : re.keyframes) == null ? void 0 : A[0]) == null ? void 0 : Q.layout) == null ? void 0 : X.width, x = (Ne = (oe = (W = re == null ? void 0 : re.keyframes) == null ? void 0 : W[0]) == null ? void 0 : oe.layout) == null ? void 0 : Ne.height;
    if (d && x && d >= 320 && x >= 180)
      return { w: Cs(d), h: Cs(x, 180, 4320) };
    try {
      const pe = localStorage.getItem("itb_studio_canvas_custom_w"), ke = localStorage.getItem("itb_studio_canvas_custom_h");
      if (pe && ke) {
        const qe = parseInt(pe, 10), lt = parseInt(ke, 10);
        if (qe >= 320 && lt >= 180)
          return { w: Cs(qe), h: Cs(lt, 180, 4320) };
      }
    } catch {
    }
    return { w: 2560, h: 1440 };
  }), [Yt, _r] = i.useState(() => {
    const d = re == null ? void 0 : re.resolution;
    if (d && (Ba.some((x) => x.id === d) || d === Fs || mu(d)))
      return d;
    try {
      const x = localStorage.getItem("itb_studio_canvas_resolution");
      if (x && (Ba.some((A) => A.id === x) || x === Fs || mu(x))) return x;
    } catch {
    }
    return "2K";
  }), [Ct, us] = i.useState(() => {
    var Q, X, W, oe, Ne, pe;
    const d = re == null ? void 0 : re.aspectRatio;
    if (d && es.some((ke) => ke.id === d))
      return d;
    const x = (W = (X = (Q = re == null ? void 0 : re.keyframes) == null ? void 0 : Q[0]) == null ? void 0 : X.layout) == null ? void 0 : W.width, A = (pe = (Ne = (oe = re == null ? void 0 : re.keyframes) == null ? void 0 : oe[0]) == null ? void 0 : Ne.layout) == null ? void 0 : pe.height;
    if (x && A) {
      const ke = x / A, qe = es.find((lt) => Math.abs(lt.ratio - ke) < 0.04);
      if (qe) return qe.id;
    }
    try {
      const ke = localStorage.getItem("itb_studio_canvas_aspect");
      if (ke && (es.some((qe) => qe.id === ke) || gu(ke))) return ke;
    } catch {
    }
    return qx;
  }), ql = i.useMemo(() => ur(Yt, Ct, mn), [Yt, Ct, mn]), Le = ql.w, Re = ql.h, Br = i.useMemo(() => {
    const d = es.find((A) => A.id === Ct);
    if (d) return { ...d, w: Le, h: Re };
    const x = Le && Re && Re > 0 ? Le / Re : 16 / 9;
    return {
      id: Ct,
      label: `${Ct}`,
      ratio: x,
      w: Le,
      h: Re
    };
  }, [Ct, Le, Re]).ratio, [sr, Wr] = i.useState(""), [ul, Zl] = i.useState(""), [O, ae] = i.useState(null);
  i.useEffect(() => {
    ie && (Wr(String(Le)), Zl(String(Re)), ae(null));
  }, [ie]), i.useEffect(() => {
    if (!Z && !le && !ie && !L)
      return;
    const d = (x) => {
      x.target.closest(".wing-floating-popout") || x.target.closest(".btn-wing-tool") || (q(!1), J(!1), Fe(!1), Y(!1));
    };
    return window.addEventListener("mousedown", d, !0), () => window.removeEventListener("mousedown", d, !0);
  }, [Z, le, ie, L]);
  const [ce, je] = i.useState(() => {
    try {
      const d = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (d !== null) return d === "true";
    } catch {
    }
    return !1;
  }), $e = i.useCallback(() => {
    je((d) => {
      const x = !d;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(x));
      } catch {
      }
      return x;
    });
  }, []), Me = i.useMemo(() => {
    const d = [], x = Le >= 3e3 ? 200 : 100, A = x / 2, Q = x / 10;
    for (let X = 0; X <= Le; X += Q) {
      const W = X % x === 0, oe = !W && X % A === 0;
      d.push({ val: X, isMajor: W, isMed: oe });
    }
    return d;
  }, [Le]), Se = i.useMemo(() => {
    const d = [];
    for (let X = 0; X <= Re; X += 10) {
      const W = X % 100 === 0, oe = !W && X % 50 === 0;
      d.push({ val: X, isMajor: W, isMed: oe });
    }
    return d;
  }, [Re]), He = i.useCallback((d) => {
    const x = tr.current || It.current;
    if (!x) return;
    const A = x.getBoundingClientRect(), Q = on(Math.round((d.clientX - A.left) / A.width * Le), 0, Le), X = on(Math.round((d.clientY - A.top) / A.height * Re), 0, Re);
    On({ x: Q, y: X, isInside: !0 });
  }, [Le, Re]), Ge = i.useCallback(() => {
    On((d) => ({ ...d, isInside: !1 }));
  }, []), We = i.useCallback(() => {
    const d = qt.current;
    if (!d) return;
    const x = d.getBoundingClientRect(), A = 104, Q = nn ? 20 : 0, X = nn ? 18 : 0, W = Math.max(320, Math.floor(x.width || 960) - A - 16 - Q), oe = Math.max(180, Math.floor(x.height || 540) - 16 - X);
    let Ne, pe;
    ce ? (Ne = W, pe = Math.round(Ne / Br)) : W / oe >= Br ? (pe = oe, Ne = Math.round(pe * Br)) : (Ne = W, pe = Math.round(Ne / Br)), Ke((ke) => ke.width === Ne && ke.height === pe ? ke : { width: Ne, height: pe });
  }, [ce, Br, nn]);
  i.useEffect(() => {
    const d = qt.current;
    if (!d) return;
    We();
    let x = null;
    return typeof ResizeObserver < "u" && (x = new ResizeObserver(() => {
      We();
    }), x.observe(d)), window.addEventListener("resize", We), () => {
      x && x.disconnect(), window.removeEventListener("resize", We);
    };
  }, [We]);
  const De = i.useMemo(() => (t && t.length > 0 ? t : n).map((x) => {
    const A = x.displays && x.displays.length > 0 ? x.displays : x.topology && x.topology.displays && x.topology.displays.length > 0 ? x.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: x.width || 1920, height: x.height || 1080 }], Q = A.find((pe) => pe.isPrimary) || A[0], X = Q.width || Q.Width || x.width || 1920, W = Q.height || Q.Height || x.height || 1080, oe = X && W ? X / W : 16 / 9, Ne = A.length > 1;
    return {
      stationId: x.id,
      displayId: "auto",
      label: `${x.displayName || x.roleAlias || x.hostname || x.name} - ${Ne ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: x.displayName || x.roleAlias || x.hostname || x.name,
      stationHostname: x.hostname || x.id,
      isPrimary: !0,
      sourceWidth: X,
      sourceHeight: W,
      nativeAspectRatio: oe,
      aspectRatio: oe,
      width: X,
      height: W
    };
  }), [t, n]), Ye = i.useMemo(() => {
    const d = t && t.length > 0 ? t : n, x = [];
    return d.forEach((A) => {
      const Q = A.displays && A.displays.length > 0 ? A.displays : A.topology && A.topology.displays && A.topology.displays.length > 0 ? A.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: A.width || 1920, height: A.height || 1080 }], X = Q.find((pe) => pe.isPrimary) || Q[0], W = X.width || X.Width || A.width || 1920, oe = X.height || X.Height || A.height || 1080, Ne = W / oe;
      x.push({
        stationId: A.id,
        displayId: "auto",
        label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${Q.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: A.displayName || A.roleAlias || A.hostname || A.name,
        stationHostname: A.hostname || A.id,
        isPrimary: !0,
        sourceWidth: W,
        sourceHeight: oe,
        nativeAspectRatio: Ne,
        aspectRatio: Ne,
        width: W,
        height: oe
      }), Q.length > 1 && Q.forEach((pe, ke) => {
        const qe = (pe.displayId || `mon-${ke}`).toLowerCase(), lt = pe.displayNumber || ke + 1, ht = pe.displayName || `Screen ${lt}`, Ie = pe.width || pe.Width || A.width || 1920, xt = pe.height || pe.Height || A.height || 1080, Xt = Ie / xt;
        x.push({
          stationId: A.id,
          displayId: qe,
          label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${ht}`,
          stationName: A.displayName || A.roleAlias || A.hostname || A.name,
          stationHostname: A.hostname || A.id,
          isPrimary: !!pe.isPrimary,
          sourceWidth: Ie,
          sourceHeight: xt,
          nativeAspectRatio: Xt,
          aspectRatio: Xt,
          width: Ie,
          height: xt
        });
      });
    }), x;
  }, [t, n]), [Pe, Ve] = i.useState(() => {
    var d;
    if (((d = re == null ? void 0 : re.keyframes) == null ? void 0 : d.length) > 0) {
      const x = JSON.parse(JSON.stringify(re));
      if (t && t.length > 0) {
        const A = new Set(t.map((X) => X.id));
        if (x.keyframes.forEach((X) => {
          var W, oe;
          ((oe = (W = X.layout) == null ? void 0 : W.placements) == null ? void 0 : oe.length) > 0 && (X.layout.placements = X.layout.placements.filter((Ne) => A.has(Ne.stationId)));
        }), x.keyframes.some((X) => {
          var W, oe;
          return ((oe = (W = X.layout) == null ? void 0 : W.placements) == null ? void 0 : oe.length) > 0;
        })) return x;
      } else
        return x;
    }
    return {
      id: "canvas-timeline-root",
      keyframes: [
        {
          id: "kf_root_0",
          timestampEpochMs: h,
          transitionDurationSec: 0.5,
          transitionType: "smooth",
          utcClockPosition: ge,
          layout: {
            width: fu,
            height: pu,
            backgroundColor: "#070A10",
            fps: 30,
            utcClockPosition: ge,
            placements: dr(De, fu, pu)
          }
        }
      ]
    };
  }), Bt = i.useRef(""), kt = i.useRef(Pe);
  kt.current = Pe, i.useEffect(() => {
    var d;
    if (((d = re == null ? void 0 : re.keyframes) == null ? void 0 : d.length) > 0) {
      const x = JSON.stringify(re);
      if (x === Bt.current) return;
      if (kt.current && x === JSON.stringify(kt.current)) {
        Bt.current = x;
        return;
      }
      Bt.current = x;
      const A = JSON.parse(x);
      if (t && t.length > 0) {
        const X = new Set(t.map((W) => W.id));
        A.keyframes.forEach((W) => {
          var oe, Ne;
          ((Ne = (oe = W.layout) == null ? void 0 : oe.placements) == null ? void 0 : Ne.length) > 0 && (W.layout.placements = W.layout.placements.filter((pe) => X.has(pe.stationId)));
        });
      }
      Ve(A), A.keyframes.some((X) => {
        var W, oe;
        return ((oe = (W = X.layout) == null ? void 0 : W.placements) == null ? void 0 : oe.length) > 0;
      }) && (En.current = !0, Lt("custom"));
    }
  }, [re, t]);
  const ft = Pe.keyframes || [], ds = i.useMemo(() => Kx(ft, V), [ft, V]), wt = on(
    F ?? ds,
    0,
    Math.max(0, ft.length - 1)
  ), Dt = ft[wt] || ft[ds] || ft[0], me = i.useMemo(() => {
    var d;
    return ((d = Dt == null ? void 0 : Dt.layout) == null ? void 0 : d.placements) || [];
  }, [Dt]), $s = i.useMemo(() => {
    var d;
    return (Dt == null ? void 0 : Dt.utcClockPosition) || ((d = Dt == null ? void 0 : Dt.layout) == null ? void 0 : d.utcClockPosition) || ge;
  }, [Dt, ge]);
  i.useEffect(() => {
    fe >= 0 && me[fe] ? Nt(me[fe].label ?? "") : Nt("");
  }, [fe, me]);
  const rr = i.useCallback((d = "Action") => ({
    label: d,
    timeline: JSON.parse(JSON.stringify(Pe)),
    resolutionId: Yt,
    aspectId: Ct,
    presetId: kn,
    selectedFeedIndex: fe
  }), [Pe, Yt, Ct, kn, fe]), Zn = i.useCallback((d = "Action") => {
    const x = rr(d);
    Un.current.push(x), Un.current.length > 50 && Un.current.shift(), Vt.current = [], Dr((A) => A + 1);
  }, [rr]), md = i.useCallback(() => {
    Ns.current && (Un.current.push(Ns.current), Un.current.length > 50 && Un.current.shift(), Vt.current = [], Ns.current = null, Dr((d) => d + 1));
  }, []), gd = i.useCallback(() => {
    const d = p > 0 ? p : h + y, x = 500;
    if (d <= h + x) return wt;
    const A = Dt != null && Dt.layout ? JSON.parse(JSON.stringify(Dt.layout)) : {
      width: Le,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      utcClockPosition: $s,
      placements: me
    };
    A.utcClockPosition = A.utcClockPosition || $s;
    const { nextTimeline: Q, newIndex: X, isNew: W } = zh(Pe, d, A, x);
    return W && (Ve(Q), P && P(Q), T && T(X), Ot(
      `Keyframe #${X + 1} created at ${Mt(d, f, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), X;
  }, [p, h, y, wt, Dt, Le, Re, me, $s, Pe, P, T, f, Ot]), ot = i.useCallback((d, x = null) => {
    x && Zn(x);
    const A = p > 0 ? p : h + y;
    Ve((Q) => {
      const { nextTimeline: X, newIndex: W, isNewKeyframe: oe } = Yx({
        prevTimeline: Q,
        newPlacements: d,
        currentEpochMs: A,
        baseEpochMs: h,
        toleranceMs: 500,
        virtualW: Le,
        virtualH: Re,
        fps: 30,
        utcClockPosition: $s
      });
      return P && P(X), T && T(W), oe && W > 0 && Ot(
        `Keyframe #${W + 1} created at ${Mt(A, f, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), X;
    });
  }, [p, h, y, Le, Re, $s, P, T, f, Ot, Zn]);
  i.useEffect(() => {
    if (De.length > 0 && (!me || me.length === 0) && !En.current) {
      const d = es.find((A) => A.id === Ct) || es[0], x = dr(De, d.w, d.h);
      x.length > 0 && (ot(x), Lt("auto-grid"));
    }
  }, [De, me, ot, Ct]);
  const qo = i.useRef("");
  i.useEffect(() => {
    const d = (t || []).map((x) => x.id).sort().join(",");
    if (qo.current === "") {
      qo.current = d;
      return;
    }
    if (qo.current !== d && (qo.current = d, t && t.length > 0)) {
      const x = new Set(t.map((A) => A.id));
      if (kn === "auto-grid" || !En.current) {
        const A = es.find((X) => X.id === Ct) || es[0], Q = dr(De, A.w, A.h);
        Q.length > 0 && ot(Q);
      } else if (me && me.length > 0) {
        const A = me.filter((Q) => x.has(Q.stationId));
        if (A.length !== me.length)
          if (A.length === 0) {
            const Q = dr(De, Le, Re);
            ot(Q);
          } else
            ot(A);
      }
    }
  }, [t, De, kn, Ct, me, ot, Le, Re]), i.useEffect(() => {
    ne && ne({
      width: Le,
      height: Re,
      resolution: Yt,
      aspectRatio: Ct,
      backgroundColor: "#070A10",
      fps: 30,
      placements: me,
      timeline: Pe
    });
  }, [me, Pe, ne, Le, Re, Yt, Ct]);
  const Rm = i.useCallback((d) => {
    if (Yt === d) return;
    const x = ur(Yt, Ct, mn), A = ur(d, Ct, mn);
    _r(d);
    try {
      localStorage.setItem("itb_studio_canvas_resolution", d);
    } catch {
    }
    const Q = A.w / x.w, X = A.h / x.h, W = me.map((oe) => ({
      ...oe,
      x: Math.round(oe.x * Q),
      y: Math.round(oe.y * X),
      width: Math.max(40, Math.round(oe.width * Q)),
      height: Math.max(30, Math.round(oe.height * X))
    }));
    ot(W, `Resolution change to ${d}`), Ot(`Canvas Resolution: ${d} (${A.w}×${A.h})`, "info", "📺");
  }, [Yt, Ct, mn, me, ot, Ot]), $i = i.useCallback(() => {
    const d = parseInt(sr, 10), x = parseInt(ul, 10);
    if (isNaN(d) || isNaN(x)) {
      ae("Enter valid numbers");
      return;
    }
    if (d < 320 || d > 7680) {
      ae("Width: 320 - 7680px");
      return;
    }
    if (x < 180 || x > 4320) {
      ae("Height: 180 - 4320px");
      return;
    }
    ae(null);
    const A = Cs(d, 320, 7680), Q = Cs(x, 180, 4320), X = ur(Yt, Ct, mn), W = { w: A, h: Q };
    nr(W), _r(Fs);
    const oe = Hr(A, Q);
    us(oe);
    try {
      localStorage.setItem("itb_studio_canvas_resolution", Fs), localStorage.setItem("itb_studio_canvas_custom_w", String(A)), localStorage.setItem("itb_studio_canvas_custom_h", String(Q)), localStorage.setItem("itb_studio_canvas_aspect", oe);
    } catch {
    }
    if (X.w !== W.w || X.h !== W.h) {
      const Ne = W.w / X.w, pe = W.h / X.h, ke = me.map((qe) => ({
        ...qe,
        x: Math.round(qe.x * Ne),
        y: Math.round(qe.y * pe),
        width: Math.max(40, Math.round(qe.width * Ne)),
        height: Math.max(30, Math.round(qe.height * pe))
      }));
      ot(ke, `Custom resolution set to ${A}×${Q}`);
    }
    Fe(!1), Ot(`Canvas Resolution: Custom (${A}×${Q})`, "info", "📺");
  }, [sr, ul, Yt, Ct, mn, me, ot, Ot]), Lm = i.useCallback((d) => {
    if (Ct === d) return;
    const x = ur(Yt, Ct, mn);
    let A;
    if (Yt === Fs && (mn != null && mn.h)) {
      const Q = es.find((oe) => oe.id === d), X = Q ? Q.ratio : gu(d) || 16 / 9;
      A = { w: Cs(Math.round(mn.h * X), 320, 7680), h: mn.h }, nr(A);
      try {
        localStorage.setItem("itb_studio_canvas_custom_w", String(A.w)), localStorage.setItem("itb_studio_canvas_custom_h", String(A.h));
      } catch {
      }
    } else
      A = ur(Yt, d, mn);
    us(d);
    try {
      localStorage.setItem("itb_studio_canvas_aspect", d);
    } catch {
    }
    if (En.current) {
      const Q = A.w / x.w, X = A.h / x.h, W = me.map((oe) => ({
        ...oe,
        x: Math.round(oe.x * Q),
        y: Math.round(oe.y * X),
        width: Math.max(40, Math.round(oe.width * Q)),
        height: Math.max(30, Math.round(oe.height * X))
      }));
      ot(W, `Aspect change to ${d}`);
    } else {
      const Q = De.length > 0 ? De : me && me.length > 0 ? me : Ye, X = dr(Q, A.w, A.h);
      ot(X, `Aspect change to ${d}`);
    }
    Ot(`Canvas Aspect: ${d} (${A.w}×${A.h})`, "info", "📐");
  }, [Ct, Yt, mn, De, me, Ye, ot, Ot]), xd = i.useCallback((d) => {
    const x = me.length > 0 ? Math.max(...me.map((pe) => pe.zIndex || 0)) + 1 : 0, A = $t[me.length % $t.length], Q = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 16 / 9), X = Q >= 1 ? 640 : Math.round(360 * Q), W = Q >= 1 ? Math.round(640 / Q) : 360, oe = {
      stationId: d.stationId,
      displayId: d.displayId,
      label: d.label,
      x: 100 + me.length * 40 % 800,
      y: 80 + me.length * 40 % 500,
      width: X,
      height: W,
      sourceWidth: d.sourceWidth || 1920,
      sourceHeight: d.sourceHeight || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q,
      zIndex: x,
      rotation: 0,
      borderWidth: 2,
      borderColor: A,
      shadowEffect: "deep",
      borderRadius: 0
    }, Ne = [...me, oe];
    ot(Ne), Ue(Ne.length - 1);
  }, [me, ot]), Zo = i.useCallback((d) => {
    const x = me.filter((A, Q) => Q !== d);
    ot(x), Ue((A) => x.length === 0 ? null : A !== null ? Math.min(A, x.length - 1) : null);
  }, [me, ot]), yd = i.useCallback(() => {
    ot([]), Ue(null);
  }, [ot]), ea = (d) => {
    const x = d.map((Q, X) => ({ p: Q, origIdx: X }));
    x.sort((Q, X) => (Q.p.zIndex ?? Q.origIdx) - (X.p.zIndex ?? X.origIdx));
    const A = [...d];
    return x.forEach(({ origIdx: Q }, X) => {
      A[Q] = { ...A[Q], zIndex: X + 1 };
    }), A;
  };
  i.useCallback((d = fe) => {
    if (d < 0 || !me[d]) return;
    const x = ea(me), A = x[d].zIndex, Q = x.length;
    if (A >= Q) return;
    const X = x.map((W, oe) => oe === d ? { ...W, zIndex: Q } : W.zIndex > A ? { ...W, zIndex: W.zIndex - 1 } : W);
    ot(X);
  }, [fe, me, ot]), i.useCallback((d = fe) => {
    if (d < 0 || !me[d]) return;
    const x = ea(me), A = x[d].zIndex;
    if (A <= 1) return;
    const Q = x.map((X, W) => W === d ? { ...X, zIndex: 1 } : X.zIndex < A ? { ...X, zIndex: X.zIndex + 1 } : X);
    ot(Q);
  }, [fe, me, ot]);
  const vd = i.useCallback((d = fe) => {
    if (d < 0 || !me[d]) return;
    const x = ea(me), A = x[d].zIndex, Q = A + 1;
    if (Q > x.length) return;
    const X = x.map((W, oe) => oe === d ? { ...W, zIndex: Q } : W.zIndex === Q ? { ...W, zIndex: A } : W);
    ot(X);
  }, [fe, me, ot]), Nd = i.useCallback((d = fe) => {
    if (d < 0 || !me[d]) return;
    const x = ea(me), A = x[d].zIndex, Q = A - 1;
    if (Q < 1) return;
    const X = x.map((W, oe) => oe === d ? { ...W, zIndex: Q } : W.zIndex === Q ? { ...W, zIndex: A } : W);
    ot(X);
  }, [fe, me, ot]), eo = i.useCallback((d) => {
    if (fe < 0 || !me[fe]) return;
    const x = me.map((A, Q) => Q === fe ? { ...A, ...d } : A);
    ot(x);
  }, [fe, me, ot]), ta = i.useCallback((d, x, A = !0) => {
    if (d < 0 || !me[d]) return;
    const Q = typeof x == "string" ? x.trim() : "", X = Q.length > 0 ? Q : null;
    if (me[d].label === X) return;
    const W = me.map((oe, Ne) => Ne === d ? { ...oe, label: X } : oe);
    ot(W, A ? "Rename Screen Title" : null);
  }, [me, ot]), Ai = i.useCallback((d) => {
    if (d < 0 || !me[d]) {
      de(null);
      return;
    }
    ta(d, Ce, !0), de(null);
  }, [me, Ce, ta]), Om = i.useCallback((d = 90) => {
    const x = me[fe];
    if (!x) return;
    const Q = ((x.rotation || 0) + d) % 360;
    eo({ rotation: Q });
  }, [fe, me, eo]), Ri = i.useCallback((d = fe) => {
    if (d < 0 || !me[d]) return;
    const x = me.length, A = me.map((Q, X) => X === d ? {
      ...Q,
      x: 0,
      y: 0,
      width: Le,
      height: Re,
      zIndex: x
    } : Q);
    ot(A);
  }, [fe, me, ot, Le, Re]), lr = i.useCallback((d) => {
    let x = [];
    const A = De.length > 0 ? De : Ye.length > 0 ? Ye : me;
    switch (d) {
      case "auto":
      case "auto-grid":
        x = dr(A, Le, Re);
        break;
      case "1x1":
        A.length > 0 && (x = [{
          ...A[0],
          x: 0,
          y: 0,
          width: Le,
          height: Re,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: $t[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (A.length >= 2) {
          const Q = Math.round(Le / 2);
          x = A.slice(0, 2).map((X, W) => {
            const oe = X.nativeAspectRatio || (X.sourceWidth && X.sourceHeight ? X.sourceWidth / X.sourceHeight : 1.7777777777777777), { x: Ne, y: pe, width: ke, height: qe } = gr(W * Q, 0, Q, Re, oe);
            return {
              ...X,
              x: Ne,
              y: pe,
              width: ke,
              height: qe,
              sourceWidth: X.sourceWidth || 1920,
              sourceHeight: X.sourceHeight || 1080,
              nativeAspectRatio: oe,
              aspectRatio: oe,
              zIndex: W + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: $t[W % $t.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          x = dr(A, Le, Re);
        break;
      case "2x2": {
        const Q = Math.round(Le / 2), X = Math.round(Re / 2);
        x = A.slice(0, 4).map((W, oe) => ({
          ...W,
          x: oe % 2 * Q,
          y: Math.floor(oe / 2) * X,
          width: Q,
          height: X,
          zIndex: oe,
          rotation: 0,
          borderWidth: 2,
          borderColor: $t[oe % $t.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (A.length >= 2) {
          x = [
            { ...A[0], x: 0, y: 0, width: Le, height: Re, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: $t[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Q = A.slice(1, 4), X = Math.round(Le * 0.23), W = Math.round(X / (16 / 9));
          Q.forEach((oe, Ne) => {
            x.push({
              ...oe,
              x: Le - X - 24,
              y: 24 + Ne * (W + 16),
              width: X,
              height: W,
              zIndex: 10 + Ne,
              rotation: 0,
              borderWidth: 3,
              borderColor: $t[(Ne + 1) % $t.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (A.length >= 3) {
          const Q = Math.round(Le * 0.666), X = Le - Q, W = Math.round(Re / 2);
          x = [
            { ...A[0], x: 0, y: 0, width: Q, height: Re, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: $t[0], shadowEffect: "deep", borderRadius: 0 },
            { ...A[1], x: Q, y: 0, width: X, height: W, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: $t[1], shadowEffect: "deep", borderRadius: 0 },
            { ...A[2], x: Q, y: W, width: X, height: W, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: $t[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (A.length >= 3)
          if (Le / Re >= 2.5) {
            const X = Math.round(Le / 3);
            x = A.slice(0, 3).map((W, oe) => {
              const Ne = W.nativeAspectRatio || (W.sourceWidth && W.sourceHeight ? W.sourceWidth / W.sourceHeight : 1.7777777777777777), { x: pe, y: ke, width: qe, height: lt } = gr(oe * X, 0, X, Re, Ne);
              return {
                ...W,
                x: pe,
                y: ke,
                width: qe,
                height: lt,
                sourceWidth: W.sourceWidth || 1920,
                sourceHeight: W.sourceHeight || 1080,
                nativeAspectRatio: Ne,
                aspectRatio: Ne,
                zIndex: oe,
                rotation: 0,
                borderWidth: 2,
                borderColor: $t[oe % $t.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const X = Math.round(Le / 2), W = Math.round(Re / 2);
            x = [
              { ...A[0], x: 0, y: 0, width: X, height: W, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: $t[0], shadowEffect: "deep", borderRadius: 0 },
              { ...A[1], x: X, y: 0, width: X, height: W, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: $t[1], shadowEffect: "deep", borderRadius: 0 },
              { ...A[2], x: Math.round(X / 2), y: W, width: X, height: W, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: $t[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    x.length > 0 && (ot(x), Ue(0), d === "auto" || d === "auto-grid" ? Lt("auto-grid") : (Lt(d), En.current = !0));
  }, [Ye, me, ot, Le, Re]), kd = i.useCallback(() => {
    const d = Je.trim() || `Custom Layout ${Ze.length + 1}`, A = [{
      id: `preset-${Date.now()}`,
      name: d,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(me)),
      keyframes: JSON.parse(JSON.stringify(ft))
    }, ...Ze];
    tn(A), _e(""), ue(!1);
  }, [Je, Ze, me, ft]), Dm = i.useCallback((d) => {
    !d || !d.placements || (ot(d.placements), Ue(0), Lt("custom"), En.current = !0, Y(!1));
  }, [ot]), Pm = i.useCallback((d, x) => {
    x == null || x.stopPropagation();
    const A = Ze.filter((Q) => Q.id !== d);
    tn(A);
  }, [Ze]), _m = i.useCallback(() => {
    const d = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Le,
      height: Re,
      aspectRatio: Ct,
      placements: me,
      timeline: Pe
    }, x = JSON.stringify(d, null, 2), A = new window.Blob([x], { type: "application/json" }), Q = window.URL.createObjectURL(A), X = document.createElement("a"), W = /* @__PURE__ */ new Date(), oe = (pe) => String(pe).padStart(2, "0"), Ne = `${W.getFullYear()}${oe(W.getMonth() + 1)}${oe(W.getDate())}_${oe(W.getHours())}${oe(W.getMinutes())}${oe(W.getSeconds())}`;
    X.href = Q, X.download = `canvas_layout_${Ne}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), window.URL.revokeObjectURL(Q);
  }, [me, Pe, Le, Re, Ct]), Bm = i.useCallback((d) => {
    var Q;
    const x = (Q = d.target.files) == null ? void 0 : Q[0];
    if (!x) return;
    const A = new window.FileReader();
    A.onload = (X) => {
      var W, oe, Ne;
      try {
        const pe = JSON.parse(X.target.result);
        if (pe.width && pe.height) {
          const qe = es.find((lt) => lt.w === pe.width && lt.h === pe.height);
          qe && us(qe.id);
        } else if (pe.aspectRatio) {
          const qe = es.find((lt) => lt.id === pe.aspectRatio);
          qe && us(qe.id);
        }
        let ke = null;
        Array.isArray(pe) ? ke = pe : pe.placements && Array.isArray(pe.placements) ? ke = pe.placements : (W = pe.layout) != null && W.placements && Array.isArray(pe.layout.placements) && (ke = pe.layout.placements), ke && ke.length > 0 && (ot(ke), Ue(0), Lt("custom"), En.current = !0), ((Ne = (oe = pe.timeline) == null ? void 0 : oe.keyframes) == null ? void 0 : Ne.length) > 0 && (Ve(pe.timeline), P && P(pe.timeline));
      } catch (pe) {
        console.error("Failed to parse imported canvas JSON:", pe), alert(`Canvas Import Error: ${pe.message}`);
      }
    }, A.readAsText(x), d.target.value = "";
  }, [ot, P]), Li = (d, x) => {
    if (d.button !== 0) return;
    d.stopPropagation(), d.preventDefault(), Ue(x), z == null || z("canvas"), En.current = !0, Lt("custom");
    const A = gd(), Q = tr.current || It.current;
    if (!Q) return;
    const X = Q.getBoundingClientRect(), W = me[x];
    if (!W) return;
    Ns.current = rr("Move Feed"), dn.current = {
      mode: "drag",
      index: x,
      startX: d.clientX,
      startY: d.clientY,
      initialX: W.x,
      initialY: W.y,
      initialW: W.width,
      initialH: W.height,
      scaleX: Le / X.width,
      scaleY: Re / X.height,
      activeSnapZone: null
    }, is(!0);
    const oe = (pe) => {
      if (!dn.current || dn.current.mode !== "drag") return;
      const ke = dn.current, qe = tr.current || It.current;
      if (!qe) return;
      const lt = qe.getBoundingClientRect(), ht = (pe.clientX - ke.startX) * ke.scaleX, Ie = (pe.clientY - ke.startY) * ke.scaleY;
      let xt = Math.round(ke.initialX + ht), Xt = Math.round(ke.initialY + Ie);
      xt = on(xt, 0, Le - ke.initialW), Xt = on(Xt, 0, Re - ke.initialH);
      const Hn = Gl && !pe.altKey;
      let Wt = null, wn = null, In = null;
      if (Hn) {
        const Qe = pe.clientX - lt.left, bt = pe.clientY - lt.top, Ft = 32, be = Math.round(Le / 2), Et = Math.round(Re / 2);
        if (Qe <= Ft ? bt <= lt.height * 0.22 ? Wt = { x: 0, y: 0, width: be, height: Et, label: "◰ Top-Left Quarter" } : bt >= lt.height * 0.78 ? Wt = { x: 0, y: Et, width: be, height: Et, label: "◱ Bottom-Left Quarter" } : Wt = { x: 0, y: 0, width: be, height: Re, label: "◧ Left Half (50%)" } : Qe >= lt.width - Ft ? bt <= lt.height * 0.22 ? Wt = { x: be, y: 0, width: be, height: Et, label: "◲ Top-Right Quarter" } : bt >= lt.height * 0.78 ? Wt = { x: be, y: Et, width: be, height: Et, label: "◳ Bottom-Right Quarter" } : Wt = { x: be, y: 0, width: be, height: Re, label: "◨ Right Half (50%)" } : bt <= Ft && Qe >= lt.width * 0.25 && Qe <= lt.width * 0.75 && (Wt = { x: 0, y: 0, width: Le, height: Re, label: "🗖 Full Canvas Maximize" }), !Wt) {
          const ir = me.filter((ut, Ur) => Ur !== ke.index), As = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Le, targetX: Le - ke.initialW, guide: 100 },
            { snapTo: be, targetX: be - Math.round(ke.initialW / 2), guide: 50 }
          ];
          ir.forEach((ut) => {
            As.push({ snapTo: ut.x, targetX: ut.x, guide: ut.x / Le * 100 }), As.push({ snapTo: ut.x + ut.width, targetX: ut.x + ut.width - ke.initialW, guide: (ut.x + ut.width) / Le * 100 }), As.push({ snapTo: ut.x + ut.width, targetX: ut.x + ut.width, guide: (ut.x + ut.width) / Le * 100 }), As.push({ snapTo: ut.x, targetX: ut.x - ke.initialW, guide: ut.x / Le * 100 });
          });
          let Id = 18;
          As.forEach((ut) => {
            const Ur = Math.abs(xt - ut.targetX);
            Ur < Id && (Id = Ur, xt = ut.targetX, wn = ut.guide);
          });
          const to = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Re, targetY: Re - ke.initialH, guide: 100 },
            { snapTo: Et, targetY: Et - Math.round(ke.initialH / 2), guide: 50 }
          ];
          ir.forEach((ut) => {
            to.push({ snapTo: ut.y, targetY: ut.y, guide: ut.y / Re * 100 }), to.push({ snapTo: ut.y + ut.height, targetY: ut.y + ut.height - ke.initialH, guide: (ut.y + ut.height) / Re * 100 }), to.push({ snapTo: ut.y + ut.height, targetY: ut.y + ut.height, guide: (ut.y + ut.height) / Re * 100 }), to.push({ snapTo: ut.y, targetY: ut.y - ke.initialH, guide: ut.y / Re * 100 });
          });
          let Td = 18;
          to.forEach((ut) => {
            const Ur = Math.abs(Xt - ut.targetY);
            Ur < Td && (Td = Ur, Xt = ut.targetY, In = ut.guide);
          });
        }
      }
      ke.activeSnapZone = Wt, ke.latestX = xt, ke.latestY = Xt, qn(Wt), cl({ vertical: wn, horizontal: In }), Ve((Qe) => {
        const bt = [...Qe.keyframes || []], Ft = A < bt.length ? A : wt;
        if (!bt[Ft]) return Qe;
        const be = [...bt[Ft].layout.placements || []];
        return be[ke.index] ? (be[ke.index] = { ...be[ke.index], x: xt, y: Xt }, bt[Ft] = {
          ...bt[Ft],
          layout: { ...bt[Ft].layout, placements: be }
        }, { ...Qe, keyframes: bt }) : Qe;
      });
    }, Ne = () => {
      var pe;
      if (is(!1), cl({ vertical: null, horizontal: null }), (pe = dn.current) != null && pe.activeSnapZone) {
        const ke = dn.current.activeSnapZone, qe = dn.current.index;
        Ve((lt) => {
          const ht = [...lt.keyframes || []], Ie = A < ht.length ? A : wt;
          if (!ht[Ie]) return lt;
          const xt = [...ht[Ie].layout.placements || []];
          return xt[qe] ? (xt[qe] = {
            ...xt[qe],
            x: ke.x,
            y: ke.y,
            width: ke.width,
            height: ke.height
          }, ht[Ie] = {
            ...ht[Ie],
            layout: { ...ht[Ie].layout, placements: xt }
          }, { ...lt, keyframes: ht }) : lt;
        });
      }
      if (dn.current) {
        const ke = dn.current, qe = ke.initialX, lt = ke.initialY, ht = ke.activeSnapZone ? ke.activeSnapZone.x : ke.latestX ?? qe, Ie = ke.activeSnapZone ? ke.activeSnapZone.y : ke.latestY ?? lt;
        ht !== qe || Ie !== lt ? (md(), P && Ve((xt) => (P(xt), xt))) : Ns.current = null;
      }
      qn(null), dn.current = null, window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", Ne);
    };
    window.addEventListener("mousemove", oe), window.addEventListener("mouseup", Ne);
  }, na = (d, x, A = "br") => {
    if (d.button !== 0) return;
    d.stopPropagation(), d.preventDefault(), Ue(x), En.current = !0, Lt("custom");
    const Q = gd();
    if (!It.current) return;
    const X = It.current.getBoundingClientRect(), W = me[x];
    if (!W) return;
    Ns.current = rr("Resize Feed");
    const oe = Ye.find((ht) => ht.stationId === W.stationId && ht.displayId === W.displayId), Ne = W.sourceWidth || (oe == null ? void 0 : oe.sourceWidth) || 1920, pe = W.sourceHeight || (oe == null ? void 0 : oe.sourceHeight) || 1080, ke = W.nativeAspectRatio || W.aspectRatio || (oe == null ? void 0 : oe.nativeAspectRatio) || Ne / pe || W.width / W.height || 16 / 9;
    dn.current = {
      mode: "resize",
      corner: A,
      index: x,
      startX: d.clientX,
      startY: d.clientY,
      initialX: W.x,
      initialY: W.y,
      initialW: W.width,
      initialH: W.height,
      sourceWidth: Ne,
      sourceHeight: pe,
      nativeAspectRatio: ke,
      scaleX: Le / X.width,
      scaleY: Re / X.height
    }, cs(!0);
    const qe = (ht) => {
      if (!dn.current || dn.current.mode !== "resize") return;
      const Ie = dn.current, xt = (ht.clientX - Ie.startX) * Ie.scaleX, Xt = (ht.clientY - Ie.startY) * Ie.scaleY, Hn = ht.ctrlKey || ht.shiftKey || ht.metaKey, Wt = Ie.nativeAspectRatio > 0 ? Ie.nativeAspectRatio : Ie.initialW / Ie.initialH;
      let wn = Ie.initialX, In = Ie.initialY, Qe = Ie.initialW, bt = Ie.initialH;
      if (Ie.corner === "br") {
        const Ft = Le - Ie.initialX, be = Re - Ie.initialY;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ft, Math.round(Ie.initialW + xt))), yt = Math.round(Et / Wt);
          yt > be && (yt = be, Et = Math.round(yt * Wt)), yt < 90 && (yt = 90, Et = Math.round(yt * Wt)), Qe = Et, bt = yt;
        } else
          Qe = on(Math.round(Ie.initialW + xt), 160, Ft), bt = on(Math.round(Ie.initialH + Xt), 90, be);
      } else if (Ie.corner === "bl") {
        const Ft = Ie.initialX + Ie.initialW, be = Re - Ie.initialY;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ft, Math.round(Ie.initialW - xt))), yt = Math.round(Et / Wt);
          yt > be && (yt = be, Et = Math.round(yt * Wt)), yt < 90 && (yt = 90, Et = Math.round(yt * Wt)), Qe = Et, bt = yt, wn = Ie.initialX + Ie.initialW - Qe;
        } else
          Qe = on(Math.round(Ie.initialW - xt), 160, Ft), bt = on(Math.round(Ie.initialH + Xt), 90, be), wn = Ie.initialX + Ie.initialW - Qe;
      } else if (Ie.corner === "tr") {
        const Ft = Le - Ie.initialX, be = Ie.initialY + Ie.initialH;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ft, Math.round(Ie.initialW + xt))), yt = Math.round(Et / Wt);
          yt > be && (yt = be, Et = Math.round(yt * Wt)), yt < 90 && (yt = 90, Et = Math.round(yt * Wt)), Qe = Et, bt = yt, In = Ie.initialY + Ie.initialH - bt;
        } else
          Qe = on(Math.round(Ie.initialW + xt), 160, Ft), bt = on(Math.round(Ie.initialH - Xt), 90, be), In = Ie.initialY + Ie.initialH - bt;
      } else if (Ie.corner === "tl") {
        const Ft = Ie.initialX + Ie.initialW, be = Ie.initialY + Ie.initialH;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ft, Math.round(Ie.initialW - xt))), yt = Math.round(Et / Wt);
          yt > be && (yt = be, Et = Math.round(yt * Wt)), yt < 90 && (yt = 90, Et = Math.round(yt * Wt)), Qe = Et, bt = yt, wn = Ie.initialX + Ie.initialW - Qe, In = Ie.initialY + Ie.initialH - bt;
        } else
          Qe = on(Math.round(Ie.initialW - xt), 160, Ft), bt = on(Math.round(Ie.initialH - Xt), 90, be), wn = Ie.initialX + Ie.initialW - Qe, In = Ie.initialY + Ie.initialH - bt;
      }
      Ve((Ft) => {
        const be = [...Ft.keyframes || []], Et = Q < be.length ? Q : wt;
        if (!be[Et]) return Ft;
        const yt = [...be[Et].layout.placements || []];
        return yt[Ie.index] ? (yt[Ie.index] = {
          ...yt[Ie.index],
          x: wn,
          y: In,
          width: Qe,
          height: bt,
          sourceWidth: Ie.sourceWidth,
          sourceHeight: Ie.sourceHeight,
          nativeAspectRatio: Ie.nativeAspectRatio,
          aspectRatio: Ie.nativeAspectRatio
        }, be[Et] = {
          ...be[Et],
          layout: { ...be[Et].layout, placements: yt }
        }, { ...Ft, keyframes: be }) : Ft;
      });
    }, lt = () => {
      if (dn.current) {
        const ht = dn.current, Ie = ht.latestW ?? ht.initialW, xt = ht.latestH ?? ht.initialH;
        Ie !== ht.initialW || xt !== ht.initialH ? (md(), P && Ve((Xt) => (P(Xt), Xt))) : Ns.current = null;
      }
      cs(!1), dn.current = null, window.removeEventListener("mousemove", qe), window.removeEventListener("mouseup", lt);
    };
    window.addEventListener("mousemove", qe), window.addEventListener("mouseup", lt);
  }, Wm = i.useCallback((d) => {
    const x = me[d];
    if (!x) return;
    const A = Ye.find((Ne) => Ne.stationId === x.stationId && Ne.displayId === x.displayId), Q = x.nativeAspectRatio || x.aspectRatio || (A == null ? void 0 : A.nativeAspectRatio) || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 16 / 9);
    let X = x.width, W = Math.round(X / Q);
    x.y + W > Re && (W = Re - x.y, X = Math.round(W * Q)), x.x + X > Le && (X = Le - x.x, W = Math.round(X / Q));
    const oe = me.map((Ne, pe) => pe === d ? {
      ...Ne,
      width: Math.max(160, X),
      height: Math.max(90, W),
      sourceWidth: x.sourceWidth || (A == null ? void 0 : A.sourceWidth) || 1920,
      sourceHeight: x.sourceHeight || (A == null ? void 0 : A.sourceHeight) || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q
    } : Ne);
    ot(oe, "Snap Native Aspect");
  }, [me, Ye, ot]), Oi = i.useCallback(() => {
    if (Un.current.length === 0) return;
    const d = rr("Redo State");
    Vt.current.push(d), Vt.current.length > 50 && Vt.current.shift();
    const x = Un.current.pop();
    x && (Ve(x.timeline), P && P(x.timeline), x.resolutionId && x.resolutionId !== Yt && _r(x.resolutionId), x.aspectId && x.aspectId !== Ct && us(x.aspectId), x.presetId && Lt(x.presetId), x.selectedFeedIndex !== void 0 && Ue(x.selectedFeedIndex), En.current = !0, Dr((A) => A + 1), Ot(`Undo: ${x.label || "Previous State"}`, "undo", "↺"));
  }, [rr, P, Ct, Ot]), Di = i.useCallback(() => {
    if (Vt.current.length === 0) return;
    const d = rr("Undo State");
    Un.current.push(d), Un.current.length > 50 && Un.current.shift();
    const x = Vt.current.pop();
    x && (Ve(x.timeline), P && P(x.timeline), x.resolutionId && x.resolutionId !== Yt && _r(x.resolutionId), x.aspectId && x.aspectId !== Ct && us(x.aspectId), x.presetId && Lt(x.presetId), x.selectedFeedIndex !== void 0 && Ue(x.selectedFeedIndex), En.current = !0, Dr((A) => A + 1), Ot(`Redo: ${x.label || "Restored State"}`, "info", "↻"));
  }, [rr, P, Ct, Ot]), wd = i.useCallback(() => {
    const x = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(me)),
      keyframes: JSON.parse(JSON.stringify(ft)),
      aspectId: Ct,
      width: Le,
      height: Re
    }, ...Ze.filter((A) => A.id !== "preset-quicksave")];
    tn(x);
    try {
      xm({
        canvasLayoutTimeline: Pe,
        selectedAspectId: Ct,
        selectedPresetId: kn,
        isFullWidth: ce
      });
    } catch (A) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", A);
    }
    Ot(`State Saved (${Le}×${Re} • ${me.length} Feeds)`, "success", "💾");
  }, [me, ft, Ct, Le, Re, Ze, tn, Pe, kn, ce, Ot]);
  i.useEffect(() => {
    const d = () => Oi(), x = () => Di(), A = () => wd();
    return window.addEventListener("itb:studio-undo", d), window.addEventListener("itb:studio-redo", x), window.addEventListener("itb:studio-save-now", A), () => {
      window.removeEventListener("itb:studio-undo", d), window.removeEventListener("itb:studio-redo", x), window.removeEventListener("itb:studio-save-now", A);
    };
  }, [Oi, Di, wd]);
  const Fm = i.useCallback(() => {
    if (we) {
      we();
      return;
    }
    mt((d) => {
      const x = !d;
      if (x) {
        r && r(null);
        const A = fn.current;
        A && A.requestFullscreen && A.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return x;
    });
  }, [we, r]), jd = i.useCallback(() => {
    const d = p > 0 ? p : h + y, x = Dt != null && Dt.layout ? JSON.parse(JSON.stringify(Dt.layout)) : {
      width: Le,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      utcClockPosition: $s,
      placements: JSON.parse(JSON.stringify(me))
    };
    x.utcClockPosition = x.utcClockPosition || $s;
    const { nextTimeline: A, newIndex: Q, isNew: X } = zh(
      Pe,
      d,
      x
    );
    X ? (Zn("Add Keyframe"), Ve(A), P && P(A), T && T(Q), Ot(`Keyframe #${Q + 1} created at ${Mt(d, f, { includeSeconds: !0 })}`, "success", "💎")) : (T && T(Q), Ot(`Jumped to existing Keyframe #${Q + 1}`, "info", "💎"));
  }, [p, h, y, Dt, me, Le, Re, $s, Pe, P, T, f, Ot, Zn]), Um = i.useCallback(() => {
    if (ft.length <= 1 || wt === 0) {
      Ot("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Zn("Delete Keyframe");
    const { nextTimeline: d, success: x, newIndex: A } = Xx(Pe, wt);
    x && (Ve(d), P && P(d), T && T(A), Ot("Keyframe deleted", "info", "🗑️"));
  }, [ft, wt, Pe, P, T, Ot, Zn]), Hm = i.useCallback((d) => {
    wt !== 0 && (Zn("Update Transition Type"), Ve((x) => {
      const A = du(x, wt, { transitionType: d });
      return P && P(A), A;
    }));
  }, [wt, P, Zn]), zm = i.useCallback((d) => {
    wt !== 0 && (Zn("Update Transition Duration"), Ve((x) => {
      const A = du(x, wt, { transitionDurationSec: d });
      return P && P(A), A;
    }));
  }, [wt, P, Zn]), Fr = i.useCallback((d) => {
    if (d < 0 || d >= ft.length) return;
    const x = ft[d];
    if (!x) return;
    if (m && h) {
      const Q = Math.max(0, x.timestampEpochMs - h);
      m(Q);
    }
    T && T(d);
    const A = Mt(x.timestampEpochMs, f, { includeSeconds: !0 });
    Ot(`Jumped to Keyframe #${d + 1} (${A})`, "info", "❖");
  }, [ft, h, m, T, f, Ot]), Cd = i.useCallback(() => {
    wt > 0 && Fr(wt - 1);
  }, [wt, Fr]), Ed = i.useCallback(() => {
    wt < ft.length - 1 && Fr(wt + 1);
  }, [wt, ft.length, Fr]), Km = i.useCallback((d) => {
    ye(d);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", d);
    } catch {
    }
    Zn("Move Clock Position"), Ve((x) => {
      const A = hu(x, wt, d);
      return P && P(A), A;
    }), Ot(`Clock moved to ${d} (Keyframe #${wt + 1})`, "info", "⏱️");
  }, [wt, ye, Zn, P, Ot]);
  i.useEffect(() => {
    const d = (x) => {
      if (!(x.target.tagName === "INPUT" || x.target.tagName === "TEXTAREA" || x.target.isContentEditable)) {
        if (x.key === "Delete" || x.key === "Backspace") {
          fe >= 0 && me[fe] && (x.preventDefault(), Zo(fe));
          return;
        }
        if ((x.code === "Space" || x.key === " ") && b) {
          x.preventDefault(), z == null || z("timeline"), b((A) => !A);
          return;
        }
        if (x.key === "[" || x.altKey && x.key === "ArrowLeft") {
          x.preventDefault(), Cd();
          return;
        }
        if (x.key === "]" || x.altKey && x.key === "ArrowRight") {
          x.preventDefault(), Ed();
          return;
        }
        if ((x.key === "k" || x.key === "K") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), jd();
          return;
        }
        if (x.key === "Escape") {
          Ee(!1), nt(!1), jt(!1), Y(!1), _t(!1), dt(!1), Jt(!1), ue(!1), he(!1), Ue(null), z == null || z("timeline");
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(x.key)) {
          if (x.ctrlKey || x.altKey || x.metaKey)
            return;
          if ((K === "canvas" || vt && fe !== null) && fe !== null && fe >= 0 && me[fe]) {
            x.preventDefault(), En.current = !0, Lt("custom");
            const Q = x.shiftKey ? 20 : 5;
            let X = 0, W = 0;
            x.key === "ArrowLeft" && (X = -Q), x.key === "ArrowRight" && (X = Q), x.key === "ArrowUp" && (W = -Q), x.key === "ArrowDown" && (W = Q);
            const oe = me[fe], Ne = on(oe.x + X, 0, Le - oe.width), pe = on(oe.y + W, 0, Re - oe.height), ke = me.map((qe, lt) => lt === fe ? { ...qe, x: Ne, y: pe } : qe);
            ot(ke);
            return;
          }
        }
        if ((x.key === "r" || x.key === "R") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), Ws((A) => !A);
          return;
        }
        if ((x.key === "s" || x.key === "S") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), Ql((A) => !A);
          return;
        }
      }
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [fe, me, Zo, ot, Ws, Ql]);
  const Sd = i.useMemo(() => Vx({
    keyframes: ft,
    currentEpochMs: V,
    currentPlacements: me,
    isEditing: yn || Jn
  }), [yn, Jn, ft, V, me]), Vm = i.useMemo(() => Sd.map((d, x) => ({ ...d, originalIndex: x })).sort((d, x) => (d.zIndex ?? d.originalIndex) - (x.zIndex ?? x.originalIndex)), [Sd]), Ym = i.useMemo(() => Jx(me, {
    maxConcurrentDecoders: jm,
    activeAudioStationId: ve,
    selectedFeedIndex: fe
  }), [me, ve, fe]), or = me[fe] || null, { filteredPlaced: ar, filteredUnplaced: sa } = i.useMemo(() => {
    const d = (pt || "").toLowerCase(), x = me.map((W, oe) => {
      const Ne = W.zIndex ?? oe + 1, pe = Ye.find((ke) => ke.stationId === W.stationId && ke.displayId === W.displayId);
      return {
        type: "placed",
        origIdx: oe,
        placement: W,
        feed: pe,
        stationId: W.stationId,
        displayId: W.displayId,
        label: W.label || (pe == null ? void 0 : pe.label) || `${W.stationId} (${W.displayId})`,
        layerRank: Ne,
        isSelected: oe === fe,
        sourceWidth: W.sourceWidth || (pe == null ? void 0 : pe.sourceWidth) || 1920,
        sourceHeight: W.sourceHeight || (pe == null ? void 0 : pe.sourceHeight) || 1080
      };
    });
    x.sort((W, oe) => oe.layerRank - W.layerRank);
    const A = Ye.filter((W) => !me.some((oe) => oe.stationId === W.stationId && oe.displayId === W.displayId)).map((W) => ({
      type: "unplaced",
      feed: W,
      stationId: W.stationId,
      displayId: W.displayId,
      label: W.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: W.sourceWidth || 1920,
      sourceHeight: W.sourceHeight || 1080
    })), Q = d ? x.filter((W) => W.label.toLowerCase().includes(d)) : x, X = d ? A.filter((W) => W.label.toLowerCase().includes(d)) : A;
    return { filteredPlaced: Q, filteredUnplaced: X };
  }, [me, Ye, fe, pt]), bd = i.useCallback((d, x) => {
    d.stopPropagation(), H(x), d.dataTransfer.effectAllowed = "copyMove", d.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: x.origIdx,
      type: x.type,
      stationId: x.stationId,
      displayId: x.displayId
    }));
  }, []), Xm = i.useCallback((d, x) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer.dropEffect = "move";
    const A = d.currentTarget.getBoundingClientRect(), Q = A.top + A.height / 2, X = d.clientY < Q ? "above" : "below";
    ze((W) => W.index === x && W.position === X ? W : { index: x, position: X });
  }, []), Gm = i.useCallback((d, x) => {
    d.stopPropagation(), ze((A) => A.index === x ? { index: null, position: null } : A);
  }, []), Md = i.useCallback(() => {
    H(null), ze({ index: null, position: null });
  }, []), Qm = i.useCallback((d, x) => {
    d.preventDefault(), d.stopPropagation();
    const A = Ae;
    ze({ index: null, position: null }), H(null);
    const Q = d.dataTransfer.getData("text/plain");
    if (Q)
      try {
        const X = JSON.parse(Q);
        if (X.type === "placed") {
          const W = X.origIdx, oe = ar.findIndex((ht) => ht.origIdx === W);
          if (oe === -1) return;
          let Ne = x;
          if (A.position === "below" && (Ne += 1), oe < Ne && (Ne -= 1), oe === Ne) return;
          const pe = [...ar], [ke] = pe.splice(oe, 1);
          pe.splice(Ne, 0, ke);
          const qe = pe.length, lt = me.map((ht, Ie) => {
            const xt = pe.findIndex((Xt) => Xt.origIdx === Ie);
            return xt !== -1 ? {
              ...ht,
              zIndex: qe - xt
            } : ht;
          });
          ot(lt), Ue(ke.origIdx);
        } else if (X.type === "unplaced") {
          const W = Ye.find((Wt) => Wt.stationId === X.stationId && Wt.displayId === X.displayId);
          if (!W) return;
          const oe = W.nativeAspectRatio || (W.sourceWidth && W.sourceHeight ? W.sourceWidth / W.sourceHeight : 16 / 9), Ne = oe >= 1 ? 640 : Math.round(360 * oe), pe = oe >= 1 ? Math.round(640 / oe) : 360, ke = $t[me.length % $t.length];
          let qe = x;
          A.position === "below" && (qe += 1);
          const lt = {
            stationId: W.stationId,
            displayId: W.displayId,
            label: W.label,
            x: 100 + me.length * 40 % 800,
            y: 80 + me.length * 40 % 500,
            width: Ne,
            height: pe,
            sourceWidth: W.sourceWidth || 1920,
            sourceHeight: W.sourceHeight || 1080,
            nativeAspectRatio: oe,
            aspectRatio: oe,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: ke,
            shadowEffect: "deep",
            borderRadius: 0
          }, ht = [...me, lt], Ie = ht.length - 1, xt = [...ar];
          xt.splice(qe, 0, { origIdx: Ie });
          const Xt = xt.length, Hn = ht.map((Wt, wn) => {
            const In = xt.findIndex((Qe) => Qe.origIdx === wn);
            return {
              ...Wt,
              zIndex: In !== -1 ? Xt - In : 1
            };
          });
          ot(Hn), Ue(Ie);
        }
      } catch (X) {
        console.warn("Failed to handle layer drag drop:", X);
      }
  }, [Ae, ar, me, Ye, ot]), Jm = i.useCallback((d) => {
    d.preventDefault();
    const x = d.dataTransfer.getData("text/plain");
    if (!(!x || !It.current))
      try {
        const A = JSON.parse(x), Q = It.current.getBoundingClientRect(), X = d.clientX - Q.left, W = d.clientY - Q.top, oe = on(Math.round(X / Q.width * Le), 0, Le - 320), Ne = on(Math.round(W / Q.height * Re), 0, Re - 180);
        if (A.type === "unplaced") {
          const pe = Ye.find((ke) => ke.stationId === A.stationId && ke.displayId === A.displayId);
          if (pe) {
            const ke = pe.nativeAspectRatio || (pe.sourceWidth && pe.sourceHeight ? pe.sourceWidth / pe.sourceHeight : 1.7777777777777777), qe = ke >= 1 ? 640 : Math.round(360 * ke), lt = ke >= 1 ? Math.round(640 / ke) : 360, ht = me.length > 0 ? Math.max(...me.map((Hn) => Hn.zIndex || 0)) + 1 : 1, Ie = $t[me.length % $t.length], xt = {
              stationId: pe.stationId,
              displayId: pe.displayId,
              label: pe.label,
              x: on(oe, 0, Le - qe),
              y: on(Ne, 0, Re - lt),
              width: qe,
              height: lt,
              sourceWidth: pe.sourceWidth || 1920,
              sourceHeight: pe.sourceHeight || 1080,
              nativeAspectRatio: ke,
              aspectRatio: ke,
              zIndex: ht,
              rotation: 0,
              borderWidth: 2,
              borderColor: Ie,
              shadowEffect: "deep",
              borderRadius: 0
            }, Xt = [...me, xt];
            ot(Xt), Ue(Xt.length - 1);
          }
        } else if (A.type === "placed" && A.origIdx !== void 0) {
          const pe = me.map((ke, qe) => qe === A.origIdx ? {
            ...ke,
            x: on(oe, 0, Le - ke.width),
            y: on(Ne, 0, Re - ke.height)
          } : ke);
          ot(pe), Ue(A.origIdx);
        }
      } catch (A) {
        console.warn("Canvas drop failed:", A);
      }
  }, [Ye, me, ot, Le, Re]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: fn,
      className: `multicam-viewport-root canvas-grid ${Rt ? "fullscreen-grid-active" : ""}`,
      children: [
        (yn || Jn) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: yn ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        Pr && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Pr.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Pr.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Pr.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs(
          "div",
          {
            ref: qt,
            className: `canvas-stage-wrapper ${ce ? "is-full-width-mode" : "is-fit-stage-mode"}`,
            onClick: (d) => {
              var x, A;
              (d.target === qt.current || (A = (x = d.target) == null ? void 0 : x.classList) != null && A.contains("canvas-stage-wrapper")) && (Ue(null), he(!1), z == null || z("timeline"));
            },
            children: [
              zt && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                      me.length,
                      " on canvas"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => jt(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Filter workstations / displays...",
                    value: pt,
                    onChange: (d) => st(d.target.value)
                  }
                ) }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                  ar.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: ar.length })
                    ] }),
                    ar.map((d, x) => {
                      const A = St && St.type === "placed" && St.origIdx === d.origIdx, X = Ae.index === x ? Ae.position === "above" ? "drop-above" : "drop-below" : "";
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row ${d.isSelected ? "is-selected" : ""} ${A ? "is-dragging-row" : ""} ${X}`,
                          draggable: !0,
                          onDragStart: (W) => bd(W, d),
                          onDragOver: (W) => Xm(W, x),
                          onDragLeave: (W) => Gm(W, x),
                          onDrop: (W) => Qm(W, x),
                          onDragEnd: Md,
                          onClick: () => Ue(d.origIdx),
                          title: `Drag to reorder layer (${d.label})`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                            /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${d.layerRank}`, children: [
                              "#",
                              d.layerRank
                            ] }),
                            /* @__PURE__ */ s.jsx("span", { className: `status-dot ${d.isSelected ? "active" : ""}` }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: d.label, children: d.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              d.sourceWidth,
                              "×",
                              d.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (W) => W.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => vd(d.origIdx),
                                  title: "Bring Forward (Layer +1)",
                                  children: "⬆️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => Nd(d.origIdx),
                                  title: "Send Backward (Layer -1)",
                                  children: "⬇️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-remove-row",
                                  onClick: () => Zo(d.origIdx),
                                  title: "Remove from canvas",
                                  children: "✕"
                                }
                              )
                            ] })
                          ]
                        },
                        `feed-layer-${d.stationId}-${d.displayId}-${d.origIdx}`
                      );
                    })
                  ] }),
                  sa.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: sa.length })
                    ] }),
                    sa.map((d) => {
                      const x = St && St.type === "unplaced" && St.stationId === d.stationId && St.displayId === d.displayId;
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row unplaced ${x ? "is-dragging-row" : ""}`,
                          draggable: !0,
                          onDragStart: (A) => bd(A, d),
                          onDragEnd: Md,
                          onClick: () => xd(d.feed),
                          title: `Drag onto canvas or layers, or click to add ${d.label}`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                            /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                            /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: d.label, children: d.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              d.sourceWidth,
                              "×",
                              d.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (A) => A.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-add-row",
                                onClick: () => xd(d.feed),
                                title: "Add to canvas",
                                children: "＋ ADD"
                              }
                            ) })
                          ]
                        },
                        `unplaced-feed-${d.stationId}-${d.displayId}`
                      );
                    })
                  ] }),
                  ar.length === 0 && sa.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => lr("auto"), children: "⊞ ADD ALL FEEDS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: yd, children: "🗑️ CLEAR CANVAS" })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
                /* @__PURE__ */ s.jsxs("aside", { className: `canvas-left-wing-dock ${Z || le || ie ? "has-active-popout" : ""}`, children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${zt ? "active" : ""}`,
                      onClick: () => jt((d) => !d),
                      title: `Feeds & Layers Palette (${me.length}/${Ye.length} on canvas)`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: me.length }),
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
                        className: `btn-wing-tool ${Z ? "active" : ""}`,
                        onClick: () => {
                          q((d) => !d), J(!1);
                        },
                        title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                        ]
                      }
                    ),
                    Z && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "LAYOUT PRESETS" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => q(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${kn === "auto-grid" ? "active" : ""}`,
                          onClick: () => {
                            Lt("auto-grid"), lr("auto-grid"), q(!1);
                          },
                          children: [
                            /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                            /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                              const d = new Set((t && t.length > 0 ? t : n).map((Q) => Q.id)), x = (me || []).filter((Q) => d.has(Q.stationId)), A = (t && t.length > 0 ? t : n).filter((Q) => !x.some((X) => X.stationId === Q.id));
                              return x.length > 0 ? x.length + A.length : De.length;
                            })() })
                          ]
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${kn === "1x1" ? "active" : ""}`,
                          onClick: () => {
                            Lt("1x1"), lr("1x1"), q(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${kn === "1x2" ? "active" : ""}`,
                          onClick: () => {
                            Lt("1x2"), lr("1x2"), q(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${kn === "2x2" ? "active" : ""}`,
                          onClick: () => {
                            Lt("2x2"), lr("2x2"), q(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${kn === "1+3-pip" ? "active" : ""}`,
                          onClick: () => {
                            Lt("1+3-pip"), lr("1+3-pip"), q(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${kn === "hero-stacked" ? "active" : ""}`,
                          onClick: () => {
                            Lt("hero-stacked"), lr("hero-stacked"), q(!1);
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
                        className: `btn-wing-tool ${ie ? "active" : ""}`,
                        onClick: () => {
                          Fe((d) => !d), J(!1), q(!1);
                        },
                        title: `Canvas Resolution: ${Yt === Fs ? `Custom (${Le}×${Re}px)` : Yt} (${Le}×${Re}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📺" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", style: Yt === Fs ? { fontSize: "7px" } : void 0, children: Yt === Fs ? "CUSTOM" : Yt })
                        ]
                      }
                    ),
                    ie && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout resolution-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "CANVAS RESOLUTION" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Fe(!1), children: "✕" })
                      ] }),
                      Ba.map((d) => {
                        const x = ur(d.id, Ct, mn);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${Yt === d.id ? "active" : ""}`,
                            onClick: () => {
                              Rm(d.id), Fe(!1);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { children: d.label }),
                              /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                                x.w,
                                "×",
                                x.h
                              ] })
                            ]
                          },
                          d.id
                        );
                      }),
                      /* @__PURE__ */ s.jsx("div", { className: "popout-divider" }),
                      /* @__PURE__ */ s.jsxs("div", { className: "custom-res-container", children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "custom-res-header", children: [
                          /* @__PURE__ */ s.jsx("span", { children: "MANUAL / CUSTOM" }),
                          Yt === Fs && /* @__PURE__ */ s.jsx("span", { className: "custom-active-tag", children: "ACTIVE" })
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "custom-res-inputs-row", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "custom-dim-field", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "field-lbl", children: "W" }),
                            /* @__PURE__ */ s.jsx(
                              "input",
                              {
                                type: "number",
                                className: "custom-dim-input",
                                min: "320",
                                max: "7680",
                                step: "2",
                                value: sr,
                                onChange: (d) => Wr(d.target.value),
                                onKeyDown: (d) => {
                                  d.key === "Enter" && $i();
                                },
                                placeholder: "Width",
                                title: "Width in pixels (320-7680, even)"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "dim-times", children: "×" }),
                          /* @__PURE__ */ s.jsxs("div", { className: "custom-dim-field", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "field-lbl", children: "H" }),
                            /* @__PURE__ */ s.jsx(
                              "input",
                              {
                                type: "number",
                                className: "custom-dim-input",
                                min: "180",
                                max: "4320",
                                step: "2",
                                value: ul,
                                onChange: (d) => Zl(d.target.value),
                                onKeyDown: (d) => {
                                  d.key === "Enter" && $i();
                                },
                                placeholder: "Height",
                                title: "Height in pixels (180-4320, even)"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-apply-custom-res",
                              onClick: $i,
                              title: "Apply custom resolution",
                              children: "SET"
                            }
                          )
                        ] }),
                        O && /* @__PURE__ */ s.jsx("div", { className: "custom-res-error-msg", children: O })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "wing-popout-wrapper", children: [
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `btn-wing-tool ${le ? "active" : ""}`,
                        onClick: () => {
                          J((d) => !d), Fe(!1), q(!1);
                        },
                        title: `Aspect Ratio: ${Ct} (${Le}×${Re}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Ct })
                        ]
                      }
                    ),
                    le && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "CANVAS ASPECT" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => J(!1), children: "✕" })
                      ] }),
                      es.map((d) => {
                        const x = ur(Yt, d.id);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${Ct === d.id ? "active" : ""}`,
                            onClick: () => {
                              Lm(d.id), J(!1);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { children: d.label }),
                              /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                                x.w,
                                "×",
                                x.h
                              ] })
                            ]
                          },
                          d.id
                        );
                      })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${ce ? "highlight-emerald" : "highlight-cyan"}`,
                      onClick: $e,
                      title: ce ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: ce ? "↔" : "⊞" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: ce ? "100%" : "FIT" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Gl ? "active" : ""}`,
                      onClick: () => Ql((d) => !d),
                      title: Gl ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                      className: `btn-wing-tool ${nn ? "active" : ""}`,
                      onClick: () => Ws((d) => !d),
                      title: nn ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                      onClick: Oi,
                      disabled: Un.current.length === 0,
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
                      onClick: Di,
                      disabled: Vt.current.length === 0,
                      title: "Redo (Ctrl+Y)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↻" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "REDO" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: `canvas-viewport-with-rulers ${nn ? "has-rulers" : ""}`, children: [
                  nn && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-top-row", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Le}×${Re}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Ln.isInside ? `${Ln.x},${Ln.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        className: "canvas-ruler-top-bar",
                        style: {
                          width: Ut.width > 180 ? `${Ut.width}px` : "100%"
                        },
                        children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-x",
                            viewBox: `0 0 ${Le} 18`,
                            preserveAspectRatio: "none",
                            children: [
                              or && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: or.x,
                                  y: "0",
                                  width: or.width,
                                  height: "18",
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              Me.map((d) => d.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: d.val, y1: "0", x2: d.val, y2: "16", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: d.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: d.val })
                              ] }, `rx-${d.val}`) : d.isMed ? /* @__PURE__ */ s.jsx("line", { x1: d.val, y1: "6", x2: d.val, y2: "16", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${d.val}`) : /* @__PURE__ */ s.jsx("line", { x1: d.val, y1: "11", x2: d.val, y2: "16", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${d.val}`)),
                              Ln.isInside && /* @__PURE__ */ s.jsx(
                                "line",
                                {
                                  x1: Ln.x,
                                  y1: "0",
                                  x2: Ln.x,
                                  y2: "18",
                                  stroke: "#06B6D4",
                                  strokeWidth: "2"
                                }
                              )
                            ]
                          }
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-main-row", children: [
                    nn && /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        className: "canvas-ruler-left-bar",
                        style: {
                          height: Ut.height > 100 ? `${Ut.height}px` : "auto"
                        },
                        children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-y",
                            viewBox: `0 0 20 ${Re}`,
                            preserveAspectRatio: "none",
                            children: [
                              or && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: "0",
                                  y: or.y,
                                  width: "20",
                                  height: or.height,
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              Se.map((d) => d.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: "0", y1: d.val, x2: "16", y2: d.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: "2", y: d.val + 7, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: d.val })
                              ] }, `ry-${d.val}`) : d.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "6", y1: d.val, x2: "18", y2: d.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${d.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "11", y1: d.val, x2: "18", y2: d.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${d.val}`)),
                              Ln.isInside && /* @__PURE__ */ s.jsx(
                                "line",
                                {
                                  x1: "0",
                                  y1: Ln.y,
                                  x2: "20",
                                  y2: Ln.y,
                                  stroke: "#06B6D4",
                                  strokeWidth: "2"
                                }
                              )
                            ]
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        ref: (d) => {
                          It.current = d, tr.current = d;
                        },
                        className: `canvas-master-frame-16-9 ${ce ? "is-full-width" : "is-fit-stage"}`,
                        style: {
                          width: Ut.width > 180 ? `${Ut.width}px` : "100%",
                          height: Ut.height > 100 ? `${Ut.height}px` : "auto",
                          aspectRatio: `${Le} / ${Re}`
                        },
                        onMouseMove: He,
                        onMouseLeave: Ge,
                        onDragOver: (d) => {
                          d.preventDefault(), d.dataTransfer.dropEffect = "copy";
                        },
                        onDrop: Jm,
                        onClick: (d) => {
                          var x, A, Q, X, W, oe;
                          (d.target === It.current || (A = (x = d.target) == null ? void 0 : x.classList) != null && A.contains("canvas-master-frame-16-9") || (X = (Q = d.target) == null ? void 0 : Q.classList) != null && X.contains("corner-accent") || (oe = (W = d.target) == null ? void 0 : W.classList) != null && oe.contains("canvas-work-surface")) && (Ue(null), he(!1), z == null || z("timeline"));
                        },
                        children: [
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                          er && /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "canvas-snap-ghost-preview",
                              style: {
                                position: "absolute",
                                left: `${er.x / Le * 100}%`,
                                top: `${er.y / Re * 100}%`,
                                width: `${er.width / Le * 100}%`,
                                height: `${er.height / Re * 100}%`,
                                zIndex: 9990,
                                pointerEvents: "none"
                              },
                              children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                                /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                                /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: er.label })
                              ] })
                            }
                          ),
                          vs.vertical !== null && /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "canvas-snap-guide-v",
                              style: {
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                left: `${vs.vertical}%`,
                                width: "2px",
                                background: "#06B6D4",
                                boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                                zIndex: 9999,
                                pointerEvents: "none"
                              }
                            }
                          ),
                          vs.horizontal !== null && /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "canvas-snap-guide-h",
                              style: {
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: `${vs.horizontal}%`,
                                height: "2px",
                                background: "#06B6D4",
                                boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                                zIndex: 9999,
                                pointerEvents: "none"
                              }
                            }
                          ),
                          me.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                            /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                            /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                            /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                            /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => jt(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => lr("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                            ] })
                          ] }),
                          Vm.map((d) => {
                            var Ft;
                            const x = d.originalIndex, A = fe === x, Q = yn && fe === x, X = Jn && fe === x, W = (n.length > 0 ? n : t).find(
                              (be) => {
                                var Et, yt, ir, As;
                                return be.id === d.stationId || ((Et = be.hostname) == null ? void 0 : Et.toLowerCase()) === ((yt = d.stationId) == null ? void 0 : yt.toLowerCase()) || ((ir = be.id) == null ? void 0 : ir.toLowerCase()) === ((As = d.stationId) == null ? void 0 : As.toLowerCase());
                              }
                            ), oe = Ye.find((be) => be.stationId === d.stationId && be.displayId === d.displayId), Ne = W || {
                              id: d.stationId,
                              hostname: (oe == null ? void 0 : oe.stationHostname) || d.stationHostname || d.stationId,
                              displayName: (oe == null ? void 0 : oe.stationName) || d.label || d.stationId,
                              displays: oe ? [{ displayId: oe.displayId, width: oe.sourceWidth, height: oe.sourceHeight }] : []
                            }, pe = (Ne == null ? void 0 : Ne.displays) || ((Ft = Ne == null ? void 0 : Ne.topology) == null ? void 0 : Ft.displays) || [], ke = me.filter(
                              (be) => be.stationId === d.stationId || Ne && (be.stationId === Ne.id || be.stationId === Ne.hostname)
                            ), qe = pe.length > 1 && ke.length >= pe.length, lt = d.borderColor || $t[x % $t.length], ht = d.borderWidth !== void 0 ? d.borderWidth : 2, Ie = d.rotation || 0, xt = d.shadowEffect || "deep", Xt = d.borderRadius || 0, Hn = d.x / Le * 100, Wt = d.y / Re * 100, wn = d.width / Le * 100, In = d.height / Re * 100, Qe = ey(xt, A, lt);
                            d.y < 50, d.x < 100, d.x + d.width > Le - 100;
                            const bt = d.zIndex !== void 0 ? d.zIndex : x + 1;
                            return /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: `canvas-feed-card-box ${A ? "is-selected" : ""} ${Q ? "is-dragging" : ""} ${X ? "is-resizing" : ""}`,
                                style: {
                                  position: "absolute",
                                  left: `${Hn}%`,
                                  top: `${Wt}%`,
                                  width: `${wn}%`,
                                  height: `${In}%`,
                                  zIndex: Q || X ? 2e3 : A ? 1e3 + bt * 10 : bt * 10,
                                  transformOrigin: "center center",
                                  border: `${ht}px solid ${lt}`,
                                  borderRadius: `${Xt}px`,
                                  boxShadow: Qe,
                                  opacity: d.opacity !== void 0 ? d.opacity : 1,
                                  pointerEvents: d.opacity !== void 0 && d.opacity < 0.1 ? "none" : "auto",
                                  cursor: Q ? "grabbing" : "grab",
                                  transition: Q || X || Or.current ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                                },
                                onMouseDown: (be) => Li(be, x),
                                onContextMenu: (be) => {
                                  be.preventDefault(), be.stopPropagation(), Ue(x), he(!0), z == null || z("canvas");
                                },
                                onClick: (be) => {
                                  be.stopPropagation(), Ue(x), z == null || z("canvas");
                                },
                                children: [
                                  /* @__PURE__ */ s.jsxs(
                                    "div",
                                    {
                                      className: "box-header-badge",
                                      onMouseDown: (be) => Li(be, x),
                                      onDoubleClick: () => Ri(x),
                                      title: "Click and drag to move window (Double-click to expand 1x1)",
                                      children: [
                                        /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                          /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                          /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                          te === x ? /* @__PURE__ */ s.jsxs(
                                            "span",
                                            {
                                              className: "badge-title-edit-container",
                                              onClick: (be) => be.stopPropagation(),
                                              onMouseDown: (be) => be.stopPropagation(),
                                              onDoubleClick: (be) => be.stopPropagation(),
                                              children: [
                                                /* @__PURE__ */ s.jsx(
                                                  "input",
                                                  {
                                                    ref: et,
                                                    type: "text",
                                                    className: "badge-title-input",
                                                    value: Ce,
                                                    placeholder: `${Ne.displayName || d.stationId} (${d.displayId})`,
                                                    onChange: (be) => Be(be.target.value),
                                                    onKeyDown: (be) => {
                                                      be.stopPropagation(), be.key === "Enter" ? (be.preventDefault(), Ai(x)) : be.key === "Escape" && (be.preventDefault(), de(null));
                                                    },
                                                    onBlur: () => Ai(x)
                                                  }
                                                ),
                                                /* @__PURE__ */ s.jsx(
                                                  "button",
                                                  {
                                                    type: "button",
                                                    className: "btn-edit-title is-saving",
                                                    onClick: (be) => {
                                                      be.stopPropagation(), Ai(x);
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
                                                onDoubleClick: (be) => {
                                                  be.stopPropagation(), de(x), Be(d.label || "");
                                                },
                                                title: "Double-click to rename screen (burned into video)",
                                                children: d.label || `${Ne.displayName || d.stationId} (${d.displayId})`
                                              }
                                            ),
                                            /* @__PURE__ */ s.jsx(
                                              "button",
                                              {
                                                type: "button",
                                                className: "btn-edit-title",
                                                onClick: (be) => {
                                                  be.stopPropagation(), de(x), Be(d.label || "");
                                                },
                                                title: "Rename screen title (burned into video)",
                                                children: "✏️"
                                              }
                                            )
                                          ] })
                                        ] }),
                                        A && /* @__PURE__ */ s.jsx(
                                          "span",
                                          {
                                            className: `badge-focus-nudge ${K === "canvas" ? "is-focused" : "is-idle"}`,
                                            onClick: (be) => {
                                              be.stopPropagation(), z == null || z(K === "canvas" ? "timeline" : "canvas");
                                            },
                                            title: K === "canvas" ? "Screen focused: Arrow keys nudge position (Shift: 20px, Normal: 5px). Click timeline or press Esc for Playhead scrubbing." : "Playhead focused: Arrow keys scrub timeline. Click to enable Arrow key screen nudging.",
                                            children: K === "canvas" ? "🎯 NUDGE [◀▲▼▶]" : "⏱️ PLAYHEAD"
                                          }
                                        ),
                                        /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                          Math.round(d.width),
                                          "×",
                                          Math.round(d.height),
                                          " (",
                                          Hr(d.width, d.height),
                                          ") @ (",
                                          Math.round(d.x),
                                          ",",
                                          Math.round(d.y),
                                          ")",
                                          Ie !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                            "📐",
                                            Ie,
                                            "°"
                                          ] })
                                        ] }),
                                        /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${bt}`, children: [
                                          "#$",
                                          bt
                                        ] }),
                                        /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: `btn-badge-action-inspector ${A && vt ? "active" : ""}`,
                                            onClick: (be) => {
                                              be.stopPropagation(), Ue(x), he((Et) => !Et || fe !== x);
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
                                          transform: Ie ? `rotate(${Ie}deg)` : void 0,
                                          transformOrigin: "center center",
                                          transition: Q ? "none" : "transform 0.2s ease-out"
                                        },
                                        children: /* @__PURE__ */ s.jsx(
                                          _x,
                                          {
                                            station: Ne,
                                            isSolo: !1,
                                            currentEpochMs: V,
                                            timeMode: f,
                                            isPlaying: v,
                                            setIsPlaying: b,
                                            baseEpochMs: h,
                                            totalDurationMs: E,
                                            outPointMs: k,
                                            setPlayheadMs: m,
                                            globalGaps: j,
                                            onOpenSpotlight: l,
                                            onSelectActiveStation: null,
                                            recordingSegments: M,
                                            playbackSpeed: S,
                                            activeAudioStationId: ve,
                                            onSoloAudio: Oe,
                                            directorPlan: $ || (Ne == null ? void 0 : Ne.directorPlan),
                                            isAutoDirectorEnabled: c ? c[Ne.id] ?? !0 : !0,
                                            stationsCount: t.length,
                                            onDeselectStation: a,
                                            targetDisplayId: d.displayId,
                                            onSelectDisplayId: (be) => {
                                              if (c ? c[Ne.id] ?? !0 : !0) return;
                                              const yt = me.map((ir, As) => As === x ? { ...ir, displayId: be } : ir);
                                              ot(yt);
                                            },
                                            areAllDisplaysPlaced: qe,
                                            slotIndex: x,
                                            borderColor: lt,
                                            isDecoderAllowed: Ym[x] ?? !0,
                                            maxHeight: Qx(
                                              Math.round((d.width || 1920) * (((Ut == null ? void 0 : Ut.width) || 960) / Le)),
                                              Math.round((d.height || 1080) * (((Ut == null ? void 0 : Ut.height) || 540) / Re))
                                            )
                                          }
                                        )
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      wm,
                                      {
                                        currentEpochMs: V,
                                        keystrokes: g,
                                        keystrokeMode: N,
                                        targetStationId: d.stationId || (Ne == null ? void 0 : Ne.id) || (Ne == null ? void 0 : Ne.hostname),
                                        targetDisplayId: d.displayId,
                                        displays: pe,
                                        directorPlan: $ || (Ne == null ? void 0 : Ne.directorPlan)
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "card-drag-surface",
                                        onMouseDown: (be) => Li(be, x),
                                        onDoubleClick: () => Ri(x),
                                        title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                                      }
                                    )
                                  ] }),
                                  A && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-tl",
                                        onMouseDown: (be) => na(be, x, "tl"),
                                        title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Hr(d.sourceWidth, d.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-tr",
                                        onMouseDown: (be) => na(be, x, "tr"),
                                        title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Hr(d.sourceWidth, d.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-bl",
                                        onMouseDown: (be) => na(be, x, "bl"),
                                        title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Hr(d.sourceWidth, d.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-br",
                                        onMouseDown: (be) => na(be, x, "br"),
                                        title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Hr(d.sourceWidth, d.sourceHeight)})`,
                                        children: "↘"
                                      }
                                    )
                                  ] })
                                ]
                              },
                              `feed-${d.stationId}-${d.displayId}-${x}`
                            );
                          }),
                          !B && vt && fe !== null && or && (() => {
                            const d = or, x = fe, A = d.borderColor || $t[x % $t.length], Q = d.borderWidth !== void 0 ? d.borderWidth : 2, X = d.rotation || 0, W = d.shadowEffect || "deep", oe = d.zIndex !== void 0 ? d.zIndex : x + 1, Ne = d.x / Le * 100, pe = d.width / Le * 100, ke = Ne + pe / 2;
                            let qe = `${ke}%`, lt = "translateX(-50%)";
                            ke < 28 ? (qe = `${Math.max(1, Ne)}%`, lt = "none") : ke > 72 && (qe = `${Math.min(99, Ne + pe)}%`, lt = "translateX(-100%)");
                            let ht;
                            const Ie = d.y < 38;
                            Ie ? ht = `${(d.y + 26) / Re * 100}%` : ht = `calc(${d.y / Re * 100}% - 34px)`;
                            const xt = d.y / Re > 0.6, Xt = Ie || d.y / Re < 0.15, Hn = xt && !Xt, Wt = ke > 65 || Ne + pe > 75, wn = (n.length > 0 ? n : t).find(
                              (Qe) => {
                                var bt, Ft;
                                return Qe.id === d.stationId || ((bt = Qe.hostname) == null ? void 0 : bt.toLowerCase()) === ((Ft = d.stationId) == null ? void 0 : Ft.toLowerCase());
                              }
                            ), In = wn ? wn.id : d.stationId;
                            return /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: "floating-feed-inspector compact-hud-inspector",
                                style: {
                                  position: "absolute",
                                  left: qe,
                                  top: ht,
                                  transform: lt,
                                  zIndex: 4500
                                },
                                onMouseDown: (Qe) => Qe.stopPropagation(),
                                onClick: (Qe) => Qe.stopPropagation(),
                                children: [
                                  /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${d.label || In} • Layer #${oe}`, children: [
                                    "🎛️ #$",
                                    oe
                                  ] }),
                                  /* @__PURE__ */ s.jsxs("div", { className: "inspector-group title-rename-group", children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "inspector-group-label", children: "TITLE:" }),
                                    /* @__PURE__ */ s.jsx(
                                      "input",
                                      {
                                        type: "text",
                                        className: "inspector-title-input",
                                        value: rt,
                                        placeholder: `${(wn == null ? void 0 : wn.displayName) || d.stationId} (${d.displayId})`,
                                        onChange: (Qe) => Nt(Qe.target.value),
                                        onKeyDown: (Qe) => {
                                          Qe.key === "Enter" && (Qe.preventDefault(), ta(fe, rt));
                                        },
                                        onBlur: () => {
                                          ta(fe, rt);
                                        },
                                        title: "Rename screen feed (displayed on canvas and burned into exported video)"
                                      }
                                    )
                                  ] }),
                                  /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", ref: xn, children: [
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: "btn-mini-tool color-swatch-trigger",
                                        onClick: () => Jt((Qe) => !Qe),
                                        title: "🎨 Frame Color: Choose border color",
                                        children: /* @__PURE__ */ s.jsx(
                                          "span",
                                          {
                                            className: "swatch-circle",
                                            style: { backgroundColor: A === "transparent" ? "#1E293B" : A }
                                          }
                                        )
                                      }
                                    ),
                                    Qt && /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: `compact-color-palette-popover ${Hn ? "open-upwards" : "open-downwards"} ${Wt ? "align-right" : "align-left"}`,
                                        onClick: (Qe) => Qe.stopPropagation(),
                                        onMouseDown: (Qe) => Qe.stopPropagation(),
                                        children: Zx.map((Qe) => /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: `btn-color-dot ${A === Qe ? "is-active" : ""}`,
                                            style: { backgroundColor: Qe === "transparent" ? "#1E293B" : Qe },
                                            onClick: () => {
                                              eo({ borderColor: Qe }), Jt(!1);
                                            },
                                            title: Qe === "transparent" ? "No Border (Transparent)" : `Border Color: ${Qe}`
                                          },
                                          Qe
                                        ))
                                      }
                                    )
                                  ] }),
                                  /* @__PURE__ */ s.jsxs(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool",
                                      onClick: () => {
                                        const Qe = [0, 2, 4, 8], bt = Qe[(Qe.indexOf(Q) + 1) % Qe.length];
                                        eo({ borderWidth: bt });
                                      },
                                      title: `Border Width: ${Q}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                                      children: [
                                        "📏 ",
                                        Q,
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
                                        const Qe = ["none", "deep", "glow-cyan", "glow-emerald"], bt = Qe[(Qe.indexOf(W) + 1) % Qe.length];
                                        eo({ shadowEffect: bt });
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
                                        onClick: () => vd(x),
                                        title: "Step Layer Up (+1)",
                                        children: "▲"
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: "btn-mini-tool",
                                        onClick: () => Nd(x),
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
                                      onClick: () => Om(90),
                                      title: `Rotate: Step 90° clockwise (Current: ${X}°)`,
                                      children: "↺ 90°"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool highlight",
                                      onClick: () => Wm(x),
                                      title: `Snap to Native Recorded Aspect (${Hr(d.sourceWidth, d.sourceHeight)})`,
                                      children: "📐 NATIVE"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool highlight",
                                      onClick: () => Ri(x),
                                      title: "1x1 Focus Mode (Double-click window to toggle)",
                                      children: "⛶ 1x1"
                                    }
                                  ),
                                  l && /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool",
                                      onClick: () => l(In, d.displayId),
                                      title: "Deep Forensic Multi-Angle Spotlight",
                                      children: "🔍"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool btn-del-feed",
                                      onClick: () => Zo(x),
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
                                        Ue(null), he(!1);
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
                            Bx,
                            {
                              currentEpochMs: V,
                              position: $s,
                              onPositionChange: (d) => {
                                ye(d);
                                try {
                                  localStorage.setItem("itb_canvas_utc_clock_pos", d);
                                } catch {
                                }
                                Zn("Move Clock Position"), Ve((x) => {
                                  const A = hu(x, wt, d);
                                  return P && P(A), A;
                                }), Ot(`Clock moved to ${d} (Keyframe #${wt + 1})`, "info", "⏱️");
                              }
                            }
                          ),
                          /* @__PURE__ */ s.jsx(Wx, {}),
                          /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-stage-hud", onClick: (d) => d.stopPropagation(), children: [
                            /* @__PURE__ */ s.jsxs("div", { className: "hud-main-cluster", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "hud-btn hud-prev-kf",
                                  disabled: wt <= 0,
                                  onClick: (d) => {
                                    d.stopPropagation(), Cd();
                                  },
                                  title: "Jump to Previous Keyframe ([ or Alt+Left)",
                                  children: "◀"
                                }
                              ),
                              /* @__PURE__ */ s.jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: `hud-pill-kf ${tt ? "active" : ""}`,
                                  onClick: (d) => {
                                    d.stopPropagation(), nt((x) => !x), Ee(!1);
                                  },
                                  title: "Keyframe Navigator: Click to inspect and jump across keyframes",
                                  children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-diamond", children: "❖" }),
                                    /* @__PURE__ */ s.jsxs("span", { className: "hud-kf-num", children: [
                                      "KF ",
                                      wt + 1,
                                      "/",
                                      ft.length
                                    ] }),
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-kf-time", children: Mt((Dt == null ? void 0 : Dt.timestampEpochMs) || V, f, { includeSeconds: !0 }) }),
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-caret", children: "▾" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "hud-btn hud-next-kf",
                                  disabled: wt >= ft.length - 1,
                                  onClick: (d) => {
                                    d.stopPropagation(), Ed();
                                  },
                                  title: "Jump to Next Keyframe (] or Alt+Right)",
                                  children: "▶"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "hud-btn hud-add-kf",
                                  onClick: (d) => {
                                    d.stopPropagation(), jd();
                                  },
                                  title: "Add Layout Keyframe at Playhead (K)",
                                  children: "+ KF"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `hud-btn hud-settings-kf ${xe ? "active" : ""}`,
                                  onClick: (d) => {
                                    d.stopPropagation(), Ee((x) => !x), nt(!1);
                                  },
                                  title: "Keyframe Settings Inspector",
                                  children: "⚙"
                                }
                              )
                            ] }),
                            tt && /* @__PURE__ */ s.jsxs("div", { className: "hud-stage-dropdown", onClick: (d) => d.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "hud-drop-header", children: [
                                /* @__PURE__ */ s.jsxs("span", { children: [
                                  "KEYFRAME NAVIGATOR (",
                                  ft.length,
                                  ")"
                                ] }),
                                /* @__PURE__ */ s.jsx("button", { type: "button", className: "hud-drop-close", onClick: () => nt(!1), children: "✕" })
                              ] }),
                              /* @__PURE__ */ s.jsx("div", { className: "hud-drop-items", children: ft.map((d, x) => {
                                var pe, ke, qe;
                                const A = x === wt, Q = Mt(d.timestampEpochMs, f, { includeSeconds: !0 }), X = Math.max(0, (d.timestampEpochMs - h) / 1e3).toFixed(1), W = d.utcClockPosition || ((pe = d.layout) == null ? void 0 : pe.utcClockPosition) || "top-right", oe = ((qe = (ke = d.layout) == null ? void 0 : ke.placements) == null ? void 0 : qe.length) || 0, Ne = x === 0 ? "Root" : `${d.transitionType || "smooth"} (${d.transitionDurationSec ?? 0.5}s)`;
                                return /* @__PURE__ */ s.jsxs(
                                  "div",
                                  {
                                    className: `hud-drop-row ${A ? "is-active" : ""}`,
                                    onClick: () => {
                                      Fr(x), nt(!1);
                                    },
                                    title: `Seek to Keyframe #${x + 1} at ${Q}`,
                                    children: [
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-diamond", children: [
                                        "❖ #",
                                        x + 1
                                      ] }),
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-time", children: [
                                        Q,
                                        " (+",
                                        X,
                                        "s)"
                                      ] }),
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-meta", children: [
                                        "⏱️ ",
                                        W,
                                        " • 🖥️ ",
                                        oe,
                                        " • ",
                                        Ne
                                      ] })
                                    ]
                                  },
                                  d.id || x
                                );
                              }) })
                            ] }),
                            xe && /* @__PURE__ */ s.jsxs("div", { className: "hud-stage-settings-popover", onClick: (d) => d.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "settings-header", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-settings-nav",
                                    disabled: wt <= 0,
                                    onClick: () => Fr(wt - 1),
                                    title: "Previous Keyframe ([ or Alt+Left)",
                                    children: "◀"
                                  }
                                ),
                                /* @__PURE__ */ s.jsxs("span", { className: "settings-title", children: [
                                  "💎 KEYFRAME #",
                                  wt + 1,
                                  " of ",
                                  ft.length
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-settings-nav",
                                    disabled: wt >= ft.length - 1,
                                    onClick: () => Fr(wt + 1),
                                    title: "Next Keyframe (] or Alt+Right)",
                                    children: "▶"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-settings-close", onClick: () => Ee(!1), children: "✕" })
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "settings-body", children: [
                                wt > 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                  /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "INCOMING TRANSITION" }),
                                    /* @__PURE__ */ s.jsx("div", { className: "btn-group", children: ["smooth", "linear", "cut"].map((d) => /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-choice ${((Dt == null ? void 0 : Dt.transitionType) || "smooth") === d ? "is-active" : ""}`,
                                        onClick: () => Hm(d),
                                        children: d === "smooth" ? "⚡ Smooth" : d === "linear" ? "↗ Linear" : "✂ Cut"
                                      },
                                      d
                                    )) })
                                  ] }),
                                  (Dt == null ? void 0 : Dt.transitionType) !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "DURATION" }),
                                    /* @__PURE__ */ s.jsx("div", { className: "btn-group", children: [0.2, 0.5, 1, 1.5, 2].map((d) => /* @__PURE__ */ s.jsxs(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-choice ${((Dt == null ? void 0 : Dt.transitionDurationSec) ?? 0.5) === d ? "is-active" : ""}`,
                                        onClick: () => zm(d),
                                        children: [
                                          d,
                                          "s"
                                        ]
                                      },
                                      d
                                    )) })
                                  ] })
                                ] }) : /* @__PURE__ */ s.jsx("div", { className: "root-keyframe-badge", children: /* @__PURE__ */ s.jsx("span", { children: "ROOT KEYFRAME (t = 0 origin)" }) }),
                                /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "UTC CLOCK POSITION" }),
                                  /* @__PURE__ */ s.jsx("div", { className: "clock-grid", children: [
                                    { id: "top-left", label: "↖ Top-Left" },
                                    { id: "top-right", label: "↗ Top-Right" },
                                    { id: "bottom-left", label: "↙ Bottom-Left" },
                                    { id: "bottom-right", label: "↘ Bottom-Right" }
                                  ].map((d) => /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: `btn-choice ${$s === d.id ? "is-active" : ""}`,
                                      onClick: () => Km(d.id),
                                      children: d.label
                                    },
                                    d.id
                                  )) })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "ACTIVE COMPOSITION" }),
                                  /* @__PURE__ */ s.jsxs("div", { className: "composition-summary", children: [
                                    /* @__PURE__ */ s.jsxs("span", { children: [
                                      "📺 ",
                                      Le,
                                      "×",
                                      Re
                                    ] }),
                                    /* @__PURE__ */ s.jsxs("span", { children: [
                                      "🖥️ ",
                                      me.length,
                                      " Screens Placed"
                                    ] })
                                  ] })
                                ] }),
                                wt > 0 && /* @__PURE__ */ s.jsx("div", { className: "settings-footer", children: /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-kf-stage-delete",
                                    onClick: () => {
                                      Um(), Ee(!1);
                                    },
                                    children: "🗑️ Delete This Keyframe"
                                  }
                                ) })
                              ] })
                            ] })
                          ] })
                        ]
                      }
                    ),
                    " "
                  ] }),
                  " "
                ] }),
                " ",
                /* @__PURE__ */ s.jsxs("aside", { className: `canvas-right-wing-dock ${L ? "has-active-popout" : ""}`, children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-emerald",
                      onClick: () => ue(!0),
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
                        className: `btn-wing-tool ${L ? "active" : ""}`,
                        onClick: () => Y((d) => !d),
                        title: `Saved Presets Library (${Ze.length})`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Ze.length }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                        ]
                      }
                    ),
                    L && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Y(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Ze.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Ze.map((d) => {
                        var x;
                        return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                          Dm(d), Y(!1);
                        }, children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: d.name }),
                            /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                              ((x = d.placements) == null ? void 0 : x.length) || 0,
                              " screens • ",
                              d.dateStr
                            ] })
                          ] }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-del-preset",
                              onClick: (A) => Pm(d.id, A),
                              title: "Delete saved preset",
                              children: "🗑️"
                            }
                          )
                        ] }, d.id);
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: _m,
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
                        var d;
                        return (d = ct.current) == null ? void 0 : d.click();
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
                      ref: ct,
                      type: "file",
                      accept: ".json",
                      style: { display: "none" },
                      onChange: Bm
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-rose",
                      onClick: () => {
                        En.current = !1, Lt("auto-grid");
                        const d = De.length > 0 ? De : Ye, x = dr(d, Le, Re), A = {
                          id: "canvas-timeline-root",
                          keyframes: [
                            {
                              id: "kf_root_0",
                              timestampEpochMs: h,
                              transitionDurationSec: 0.5,
                              transitionType: "smooth",
                              layout: {
                                width: Le,
                                height: Re,
                                backgroundColor: "#070A10",
                                fps: 30,
                                placements: x
                              }
                            }
                          ]
                        };
                        Ve(A), P && P(A), Ue(0);
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
                      onClick: yd,
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
                      className: `btn-wing-tool ${Rt ? "active" : ""}`,
                      onClick: Fm,
                      title: "Fullscreen Canvas Grid (F)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Rt ? "⤓" : "⛶" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Rt ? "EXIT" : "FULL" })
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
        ee && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => ue(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (d) => d.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => ue(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: Je,
                onChange: (d) => _e(d.target.value),
                autoFocus: !0,
                onKeyDown: (d) => {
                  d.key === "Enter" && kd();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              me.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => ue(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: kd, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const pc = [0.5, 1, 1.25, 1.5, 2, 4];
function xu({
  activeStationId: e,
  isPlaying: t,
  setIsPlaying: n,
  isLooping: r = !0,
  setIsLooping: l,
  _playheadMs: o = 0,
  setPlayheadMs: a,
  inPointMs: c = 0,
  outPointMs: u = 36e5,
  totalDurationMs: h = 36e5,
  hasGridPlacements: y = !0,
  onStepFrameForward: p,
  onStepFrameBackward: f,
  playbackSpeed: v = 1,
  onChangeSpeed: b,
  onSetInPoint: E,
  onSetOutPoint: D,
  activeFocusZone: k = "timeline",
  onFocusZoneChange: m = null
}) {
  const [j, M] = i.useState(() => Pl()), { volume: S, isMuted: C } = j, N = !!(h > 0 || y || e);
  i.useEffect(() => {
    const F = (T) => {
      T.detail && M(T.detail);
    };
    return window.addEventListener("itb-audio-state-changed", F), () => window.removeEventListener("itb-audio-state-changed", F);
  }, []);
  const g = i.useCallback((F, T, B) => {
    const U = {
      volume: typeof F == "number" ? F : S,
      isMuted: typeof T == "boolean" ? T : C,
      channelMode: B || j.channelMode || "both"
    };
    M(U), Rx(U);
  }, [S, C, j.channelMode]), $ = (F) => {
    F == null || F.stopPropagation(), N && n(!t);
  }, w = (F) => {
    if (F == null || F.stopPropagation(), !N || !b) return;
    const T = pc.indexOf(v), B = T === -1 ? 1 : (T + 1) % pc.length;
    b(pc[B]);
  }, _ = (F) => {
    F == null || F.stopPropagation(), C ? g(S === 0 ? 0.5 : S, !1) : g(S, !0);
  }, G = (F) => {
    F.stopPropagation();
    const T = parseFloat(F.target.value);
    T === 0 ? g(0, !0) : g(T, !1);
  }, I = (F) => {
    const T = i.useRef(null), B = i.useRef(null), U = i.useRef(0), we = i.useCallback(() => {
      T.current && clearTimeout(T.current), B.current && clearInterval(B.current), T.current = null, B.current = null;
    }, []), K = i.useCallback((V = 1) => {
      if (n && n(!1), a) {
        const ge = 33 * V;
        a((ye) => {
          const ve = F === "forward" ? ye + ge : ye - ge;
          return Math.max(0, Math.min(h, ve));
        });
      } else F === "forward" && p ? p() : F === "backward" && f && f();
    }, [F]), z = i.useCallback((V) => {
      V.preventDefault(), V.stopPropagation(), N && (we(), K(1), U.current = performance.now(), T.current = setTimeout(() => {
        B.current = setInterval(() => {
          const ge = performance.now() - U.current, ye = ge > 2500 ? 4 : ge > 1e3 ? 2 : 1;
          K(ye);
        }, 50);
      }, 280));
    }, [K, we]);
    return i.useEffect(() => we, [we]), {
      onMouseDown: z,
      onMouseUp: we,
      onMouseLeave: we,
      onTouchStart: z,
      onTouchEnd: we
    };
  }, R = I("backward"), se = I("forward"), ne = (F) => {
    F.stopPropagation(), N && (n && n(!1), a && a(c));
  }, re = (F) => {
    F.stopPropagation(), N && (n && n(!1), a && a(u));
  }, P = () => C || S === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : S < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${N ? "is-expanded" : "is-compact-disabled"}`,
      title: N ? "" : "Playback ready",
      onMouseDown: () => m == null ? void 0 : m("timeline"),
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-ctrl-action btn-focus-indicator ${k === "canvas" ? "is-canvas" : "is-timeline"}`,
            onClick: (F) => {
              F.stopPropagation(), m == null || m(k === "canvas" ? "timeline" : "canvas");
            },
            title: k === "canvas" ? "Focus: Canvas Screen (Arrow keys nudge screen position). Click or press Esc to return to Playhead scrubbing." : "Focus: Timeline Playhead (Arrow keys step frames / seconds). Click to switch to Canvas screen nudging.",
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "focus-dot" }),
              /* @__PURE__ */ s.jsx("span", { className: "focus-label", children: k === "canvas" ? "🖥️ CANVAS" : "⏱️ PLAYHEAD" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !N,
            onClick: w,
            title: "Playback Speed",
            children: [
              v,
              "x"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cut-action cut-in",
            disabled: !E,
            onClick: (F) => {
              F.stopPropagation(), E == null || E();
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
              disabled: !N,
              onClick: (F) => {
                F.stopPropagation(), l && l(!r);
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
              disabled: !N,
              onClick: ne,
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
              disabled: !N,
              ...R,
              title: "Step 1 Frame Back (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "16 5 7 12 16 19 16 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-play-hero ${t ? "playing" : ""}`,
              disabled: !N,
              onClick: $,
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
              disabled: !N,
              ...se,
              title: "Step 1 Frame Forward (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "8 5 17 12 8 19 8 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-out",
              disabled: !N,
              onClick: re,
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
            disabled: !D,
            onClick: (F) => {
              F.stopPropagation(), D == null || D();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        N && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${C || S === 0 ? "is-muted" : ""}`,
              onClick: _,
              title: C ? "Unmute" : `Mute (${Math.round(S * 100)}%)`,
              children: P()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: C ? 0 : S,
              onChange: G,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const ny = 8;
function sy({
  activeStationName: e = "",
  stationHostname: t = "",
  stations: n = [],
  keystrokes: r = null,
  recordingSegments: l = {},
  baseEpochMs: o = 0,
  timeMode: a = "LOCAL",
  viewportStartMs: c = 0,
  viewportDurationMs: u = 36e5,
  pixelWidth: h = 1e3,
  onSeek: y
}) {
  const [p, f] = i.useState([]), [, v] = i.useState(!1), b = i.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((M) => ({
    id: M.id,
    name: M.displayName || M.hostname || M.name || M.id,
    hostname: M.hostname || M.id
  })) : t || e ? [{
    id: t || e,
    name: e || t,
    hostname: t || e
  }] : [], [n, t, e]);
  i.useEffect(() => {
    if (r != null)
      return;
    if (!b.length || !o || u <= 0) {
      f([]);
      return;
    }
    const M = new AbortController(), S = Math.max(0, o + c - _a), C = o + c + u + _a;
    v(!0);
    const N = b.map((g) => {
      const $ = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(g.hostname)}&startEpoch=${S}&endEpoch=${C}`;
      return fetch($, { signal: M.signal }).then((w) => w.ok ? w.json() : []).then((w) => (Array.isArray(w) ? w : []).map((_) => ({
        ..._,
        stationId: g.id,
        stationName: g.name
      }))).catch((w) => {
        if (w.name !== "AbortError") return [];
        throw w;
      });
    });
    return Promise.all(N).then((g) => {
      const $ = g.flat();
      f($), v(!1);
    }).catch((g) => {
      g.name !== "AbortError" && (f([]), v(!1));
    }), () => M.abort();
  }, [b, o, c, u, r]);
  const E = i.useMemo(() => {
    const M = r ?? p;
    return !M || !M.length ? [] : !l || Object.keys(l).length === 0 ? M : M.filter((S) => {
      const C = S.stationId || S.stationName || S.stationHostname || S.hostname, N = C && l[C] || C && l[C.toLowerCase()] || C && l[C.toUpperCase()];
      return N && Array.isArray(N) && N.length > 0 ? N.some((g) => {
        const $ = g.startEpochMs ?? g.startEpoch ?? 0, w = g.endEpochMs ?? g.endEpoch ?? 0;
        return S.epochMs >= $ && S.epochMs <= w;
      }) : !(N && Array.isArray(N) && N.length === 0);
    });
  }, [r, p, l]), D = i.useMemo(() => {
    if (!E.length || u <= 0 || h <= 0)
      return [];
    const M = o + c, S = M + u, C = [...E].sort((w, _) => w.epochMs - _.epochMs), N = [];
    let g = null, $ = -999;
    for (const w of C) {
      const _ = w.epochMs + _a;
      if (_ < M || _ > S)
        continue;
      const G = _ - o, I = (G - c) / u * h;
      if (g && I - $ < ny) {
        g.events.push(w), g.endOffsetMs = G, g.endEpochMs = _;
        const R = new Set(g.events.map((se) => se.stationName || se.stationHostname || e || "Workstation"));
        g.isMultiStation = R.size > 1, g.stationCount = R.size, $ = I;
      } else {
        const R = (G - c) / u * 100;
        g = {
          id: `kc_${w.epochMs}_${N.length}`,
          startOffsetMs: G,
          endOffsetMs: G,
          startEpochMs: _,
          endEpochMs: _,
          pct: R,
          events: [w],
          isMultiStation: !1,
          stationCount: 1
        }, N.push(g), $ = I;
      }
    }
    return N;
  }, [E, o, c, u, h]);
  function k(M) {
    if (!M.events.length) return "";
    if (M.events.length === 1)
      return uo(M.events[0].keyCombination);
    const S = M.events.find((g) => g.keyCombination.includes("+"));
    if (S) {
      const g = uo(S.keyCombination);
      return M.events.length > 1 ? `${g} (+${M.events.length - 1})` : g;
    }
    const C = uo(M.events[0].keyCombination);
    return M.events.every((g) => uo(g.keyCombination) === C) ? `${C} ×${M.events.length}` : `${C} (+${M.events.length - 1})`;
  }
  function m(M, S = "LOCAL") {
    return Mt(M, S);
  }
  function j(M) {
    const S = [];
    for (const C of M) {
      const N = uo(C.keyCombination);
      S.length && S[S.length - 1].key === N ? S[S.length - 1].count++ : S.push({ key: N, count: 1 });
    }
    return S;
  }
  return D.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: D.map((M) => {
    const S = M.events.length, C = S > 1, N = M.isMultiStation, g = k(M), $ = m(M.startEpochMs, a), w = M.pct < 10 ? "edge-left" : M.pct > 90 ? "edge-right" : "", _ = {};
    return M.events.forEach((G) => {
      const I = G.stationName || G.stationHostname || e || "Workstation";
      _[I] || (_[I] = []), _[I].push(G);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${C ? "is-cluster" : "is-single"} ${N ? "is-multi-station" : ""}`,
        style: { left: `${M.pct}%` },
        onClick: (G) => {
          G.stopPropagation(), y && y(M.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${g} at ${$}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            C && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: N ? `${M.stationCount}S` : S > 9 ? "9+" : S })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${w}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: N ? `MULTICAM KEYSTROKES (${M.stationCount} WORKSTATIONS • ${S} EVT)` : C ? `KEYSTROKE BURST (${S})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: $ })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(_).map(([G, I]) => {
              const R = j(I);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: G }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    I.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  R.slice(0, 6).map((se, ne) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    se.key,
                    se.count > 1 ? ` ×${se.count}` : ""
                  ] }, ne)),
                  R.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    R.length - 6,
                    " more"
                  ] })
                ] })
              ] }, G);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      M.id
    );
  }) }) : null;
}
const ry = i.memo(sy), mc = [
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
], ly = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function oy({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  totalDurationMs: l = 36e5,
  hoverMs: o = null,
  onHoverChange: a,
  onSeek: c,
  inPointMs: u = null,
  outPointMs: h = null,
  earliestMediaMs: y = null,
  movieBoundaries: p = null,
  stationHostname: f = "",
  activeStationName: v = "",
  stations: b = [],
  showKeystrokes: E = !0,
  keystrokes: D = [],
  recordingSegments: k = {}
}) {
  const m = i.useRef(null), [j, M] = i.useState(1e3);
  i.useEffect(() => {
    if (!m.current) return;
    const K = new ResizeObserver((z) => {
      for (let V of z)
        V.contentRect.width > 50 && M(V.contentRect.width);
    });
    return K.observe(m.current), () => K.disconnect();
  }, []);
  const S = i.useCallback((K) => !r || r <= 0 ? "0%" : `${(K - n) / r * 100}%`, [r, n]), C = i.useCallback((K) => {
    const V = (K - n) / r * 100;
    return V >= -5 && V <= 105;
  }, [n, r]), N = (K) => {
    if (!m.current) return;
    const z = m.current.getBoundingClientRect(), V = Math.max(0, Math.min(K.clientX - z.left, z.width)), ge = Math.round(n + V / z.width * r);
    a && a(ge);
  }, g = () => {
    a && a(null);
  }, $ = (K) => {
    if (!m.current || !c) return;
    const z = m.current.getBoundingClientRect(), V = Math.max(0, Math.min(K.clientX - z.left, z.width)), ge = Math.round(n + V / z.width * r);
    c(Math.max(0, Math.min(l, ge)));
  }, w = i.useMemo(() => {
    const K = Math.max(3, Math.floor(j / 95)), z = r / K;
    for (let V of mc)
      if (V >= z) return V;
    return mc[mc.length - 1];
  }, [r, j]), _ = i.useMemo(() => {
    if (!e || r <= 0) return [];
    const K = e + n, z = K + r, V = t === "LOCAL" ? Xs(K).offsetMin * 60 * 1e3 : 0, ge = K + V, ye = Math.ceil(ge / w) * w, ve = [];
    for (let Oe = ye; Oe <= z + V; Oe += w) {
      const xe = Oe - V, Ee = (xe - K) / r * 100;
      Ee >= 0 && Ee <= 100 && ve.push({
        epoch: xe,
        pct: Ee,
        label: Mt(xe, t, {
          includeSeconds: w < 6e4
        })
      });
    }
    return ve;
  }, [e, n, r, w, t]), G = i.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const K = e + n, z = K + r;
    return pm(K, z).map((V) => ({
      ...V,
      pct: (V.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), I = i.useMemo(() => {
    if (!r || !e) return [];
    const K = e + n, z = K + r, V = t === "UTC", ge = [], ye = V ? 0 : Xs(K).offsetMin * 60 * 1e3, ve = K + ye, Oe = z + ye, xe = new Date(ve);
    for (xe.setUTCHours(0, 0, 0, 0), xe.getTime() < ve && xe.setUTCDate(xe.getUTCDate() + 1); xe.getTime() <= Oe; ) {
      const tt = xe.getTime() - ye, nt = (tt - K) / r * 100, zt = String(xe.getUTCDate()).padStart(2, "0"), jt = ly[xe.getUTCMonth()], St = `${zt} ${jt}`;
      ge.push({ epoch: tt, pct: nt, dateLabel: St }), xe.setUTCDate(xe.getUTCDate() + 1);
    }
    return ge;
  }, [e, n, r, t]), {
    globalFirstMs: R = y,
    globalLastMs: se = null,
    currentFirstMs: ne = null,
    currentLastMs: re = null
  } = p || { globalFirstMs: y }, P = R !== null && ne !== null && Math.abs(R - ne) < 1e3, F = se !== null && re !== null && Math.abs(se - re) < 1e3, T = i.useMemo(() => {
    const K = [];
    return P ? C(R) && K.push({
      id: "first-combined",
      ms: R,
      pct: S(R),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${Mt(e + R, t)} (Click to jump)`
    }) : (C(R) && K.push({
      id: "first-global",
      ms: R,
      pct: S(R),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${Mt(e + R, t)} (Click to jump)`
    }), C(ne) && K.push({
      id: "first-current",
      ms: ne,
      pct: S(ne),
      className: "ruler-media-pin current-first",
      badge: v ? `FIRST (${v})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${Mt(e + ne, t)} (Click to jump)`
    })), F ? C(se) && K.push({
      id: "last-combined",
      ms: se,
      pct: S(se),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${Mt(e + se, t)} (Click to jump)`
    }) : (C(re) && K.push({
      id: "last-current",
      ms: re,
      pct: S(re),
      className: "ruler-media-pin current-last",
      badge: v ? `LAST (${v})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${Mt(e + re, t)} (Click to jump)`
    }), C(se) && K.push({
      id: "last-global",
      ms: se,
      pct: S(se),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${Mt(e + se, t)} (Click to jump)`
    })), K;
  }, [
    R,
    se,
    ne,
    re,
    P,
    F,
    e,
    t,
    v,
    C,
    S
  ]), B = i.useMemo(() => {
    const K = [];
    return typeof u == "number" && C(u) && K.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: u,
      pct: S(u),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${Mt(e + u, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof h == "number" && C(h) && K.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: h,
      pct: S(h),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${Mt(e + h, t, { includeSeconds: !0 })} (Click to seek)`
    }), K;
  }, [u, h, e, t, C, S]), U = o !== null ? S(o) : null, we = U !== null && U >= 0 && U <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: m,
      className: "timeline-ruler-root",
      onMouseMove: N,
      onMouseLeave: g,
      onClick: $,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          _.map((K) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${K.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: K.label })
          ] }, K.epoch)),
          E && /* @__PURE__ */ s.jsx(
            ry,
            {
              stationHostname: f,
              activeStationName: v,
              stations: b,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: j,
              onSeek: c,
              keystrokes: D,
              recordingSegments: k
            }
          ),
          G.map((K) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${K.pct}%` },
              title: `${K.description} (${K.labelBefore} ➔ ${K.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: K.description })
                ] })
              ]
            },
            K.switchEpochMs
          )),
          I.map((K) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${K.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: K.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            K.epoch
          )),
          T.map((K) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: K.className,
              style: { left: `${K.pct}` },
              onClick: (z) => {
                z.stopPropagation(), c && c(K.ms);
              },
              title: K.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: K.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            K.id
          )),
          B.map((K) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${K.type}-cut-tick`,
              style: { left: `${K.pct}` },
              onClick: (z) => {
                z.stopPropagation(), c && c(K.ms);
              },
              title: K.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: K.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: K.shortLabel })
                ] })
              ]
            },
            K.id
          ))
        ] }),
        we && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${U}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: Mt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Kn = (e) => String(e).padStart(2, "0");
function ay({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [c, u] = i.useState(!1), [h, y] = i.useState(!1), [p, f] = i.useState(""), [v, b] = i.useState(""), E = i.useCallback(($) => {
    if (!$ || isNaN($) || $ <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const I = new Date($);
      return {
        timeStr: `${Kn(I.getUTCHours())}:${Kn(I.getUTCMinutes())}:${Kn(I.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: w, label: _ } = Xs($), G = new Date($ + w * 60 * 1e3);
    return {
      timeStr: `${Kn(G.getUTCHours())}:${Kn(G.getUTCMinutes())}:${Kn(G.getUTCSeconds())}`,
      zoneLabel: _
    };
  }, [t]), D = i.useCallback(($) => {
    if (!$ || $ < 0) return "00:00:00";
    const w = Math.floor($ / 1e3), _ = Math.floor(w / 3600), G = Math.floor(w % 3600 / 60), I = w % 60;
    return `${Kn(_)}:${Kn(G)}:${Kn(I)}`;
  }, []), k = i.useMemo(() => E(e + r), [E, e, r]), m = i.useMemo(() => E(e + o), [E, e, o]), j = i.useMemo(() => D(Math.max(0, o - r)), [D, r, o]), M = i.useCallback(($, w) => {
    if (!$ || !$.trim()) return w;
    const G = $.trim().split(" ")[0].split(":").map(Number);
    if (G.length < 2 || G.some(isNaN)) return w;
    const [I, R, se = 0] = G;
    if (t === "UTC") {
      const V = new Date(e);
      V.setUTCHours(I, R, se, 0);
      let ge = V.getTime();
      for (; ge < e; ) ge += 864e5;
      for (; ge > e + n + 1e3; ) ge -= 864e5;
      const ye = ge - e;
      return isNaN(ye) ? w : Math.max(0, Math.min(n, ye));
    }
    const { offsetMin: ne } = Xs(e), re = new Date(e + ne * 6e4), P = re.getUTCFullYear(), F = re.getUTCMonth(), T = re.getUTCDate(), B = `${P}-${Kn(F + 1)}-${Kn(T)}`, U = `${Kn(I)}:${Kn(R)}:${Kn(se)}`, we = di(B, U);
    let K;
    if (we.isAmbiguous) {
      const V = e + w, ge = Math.abs(we.firstOccurrenceEpoch - V), ye = Math.abs(we.secondOccurrenceEpoch - V);
      K = ge <= ye ? we.firstOccurrenceEpoch : we.secondOccurrenceEpoch;
    } else {
      const V = Date.UTC(P, F, T, I, R, se), { offsetMin: ge } = Xs(V - ne * 6e4);
      K = V - ge * 6e4;
    }
    for (; K < e; ) K += 864e5;
    for (; K > e + n + 1e3; ) K -= 864e5;
    const z = K - e;
    return isNaN(z) ? w : Math.max(0, Math.min(n, z));
  }, [e, t, n]), S = () => {
    f(k.timeStr), u(!0);
  }, C = () => {
    if (u(!1), !p || !p.trim() || p.trim() === k.timeStr)
      return;
    const $ = M(p.trim(), r);
    $ !== null && !isNaN($) && $ < o && l($);
  }, N = () => {
    b(m.timeStr), y(!0);
  }, g = () => {
    if (y(!1), !v || !v.trim() || v.trim() === m.timeStr)
      return;
    const $ = M(v.trim(), o);
    $ !== null && !isNaN($) && $ > r && a($);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "tactical-timecode-console", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "console-row in-accent", children: [
      /* @__PURE__ */ s.jsx("span", { className: "console-tag", children: "IN" }),
      c ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: p,
          autoFocus: !0,
          onChange: ($) => f($.target.value),
          onBlur: C,
          onKeyDown: ($) => {
            $.key === "Enter" && C(), $.key === "Escape" && u(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: S,
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
      h ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: v,
          autoFocus: !0,
          onChange: ($) => b($.target.value),
          onBlur: g,
          onKeyDown: ($) => {
            $.key === "Enter" && g(), $.key === "Escape" && y(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: N,
          title: `Click to edit OUT time (${m.zoneLabel})`,
          children: [
            m.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: m.zoneLabel })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "console-duration-shelf", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "dur-label-group", children: [
        /* @__PURE__ */ s.jsx("span", { className: "dur-dot" }),
        /* @__PURE__ */ s.jsx("span", { className: "dur-title", children: "DUR" })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: j })
    ] })
  ] });
}
function iy({
  minimapRef: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  totalDurationMs: r = 36e5,
  viewportStartMs: l = 0,
  viewportDurationMs: o = 36e5,
  zoomLevel: a = 1,
  inPointMs: c = 0,
  outPointMs: u = 36e5,
  playheadMs: h = 0,
  onStartDragMinimap: y
}) {
  const p = Math.max(0, Math.min(100, c / r * 100)), f = Math.max(0, Math.min(100, u / r * 100)), v = Math.max(0, f - p), b = Math.max(0, Math.min(100, l / r * 100)), E = Math.max(0, Math.min(100 - b, o / r * 100)), D = b + E, k = a > 1.05, m = 7, j = v >= 10, M = v >= 16, S = j, C = M, N = S && Math.abs(b - p) < m, g = k && E >= 12 && !N, $ = C && Math.abs(D - f) < m, w = k && E >= 12 && !$;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (_) => y && y("minimap-viewport", _),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${p}%`, width: `${v}%` },
            children: [
              S && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: Mt(t + c, n) }),
              C && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: Mt(t + u, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${b}%`, width: `${E}%` },
            children: [
              g && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: Mt(t + l, n) }),
              w && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: Mt(t + l + o, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "minimap-needle",
            style: { left: `${h / r * 100}%` }
          }
        )
      ]
    }
  );
}
function cy({
  earliestMediaMs: e,
  latestMediaMs: t,
  hasActiveCut: n,
  onJumpToFirst: r,
  onJumpToLast: l,
  onContextualFit: o,
  onResetZoom: a,
  baseEpochMs: c,
  timeMode: u,
  keystrokeMode: h = "BURN_IN",
  // 'NONE' | 'BURN_IN'
  onChangeKeystrokeMode: y,
  showRulerKeystrokes: p = !1,
  onToggleRulerKeystrokes: f
}) {
  const v = (h || "NONE").toUpperCase().replace("-", "_"), b = () => {
    y && y(v === "BURN_IN" ? "NONE" : "BURN_IN");
  }, E = () => v === "BURN_IN" ? "KEYS: BURN-IN" : "KEYS: OFF";
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline-viewport-actions-group", children: [
    y && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action keys-mode-btn mode-${v === "BURN_IN" ? "burn-in" : "none"}`,
        onClick: b,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: E() })
        ]
      }
    ),
    f && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${p ? "active" : "inactive"}`,
        onClick: f,
        title: p ? "Hide Keystroke Ticks on Ruler" : "Show Keystroke Ticks on Ruler",
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
        title: `Jump playhead to first media (${Mt(c + e, u)})`,
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
        title: `Jump playhead to last media (${Mt(c + t, u)})`,
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
const Ds = /* @__PURE__ */ new Map(), gl = /* @__PURE__ */ new Map();
let zs = [], _l = 0;
const Kh = 3, uy = 8e3, dy = 80;
function Cm() {
  setTimeout(hy, 0);
}
function hy() {
  var e;
  if (!(_l >= Kh || zs.length === 0))
    for (zs = zs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); _l < Kh && zs.length > 0; ) {
      const t = zs.pop();
      !t || (e = t.signal) != null && e.aborted || (_l++, fy(t));
    }
}
async function fy(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: c, displayId: u } = e;
  let h = !1, y = null;
  const p = () => {
    h || (h = !0, y && clearTimeout(y), _l = Math.max(0, _l - 1), gl.delete(t), Cm());
  };
  y = setTimeout(() => {
    p(), c(null);
  }, uy);
  try {
    const f = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${u ? `&displayId=${encodeURIComponent(u)}` : ""}`, v = await fetch(f, { signal: a });
    if (v.ok && v.status !== 204) {
      const b = await v.blob();
      if (b && b.size > 1500) {
        const E = URL.createObjectURL(b);
        if (Ds.size >= dy) {
          const D = Ds.keys().next().value, k = Ds.get(D);
          k && URL.revokeObjectURL(k), Ds.delete(D);
        }
        Ds.set(t, E), c(E);
        return;
      }
    }
    c(null);
  } catch {
    c(null);
  } finally {
    p();
  }
}
const Vh = {
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
    return Ds.get(o);
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
    if (Ds.has(a))
      return Promise.resolve(Ds.get(a));
    if (gl.has(a))
      return gl.get(a);
    const c = new Promise((u) => {
      if (l != null && l.aborted) {
        u(null);
        return;
      }
      const h = {
        key: a,
        hostname: e,
        startEpoch: t,
        endEpoch: n,
        frameCount: r,
        displayId: o || "mon-0",
        signal: l,
        resolve: u
      };
      l && l.addEventListener("abort", () => {
        zs = zs.filter((y) => y.key !== a), gl.delete(a), u(null);
      }, { once: !0 }), zs.push(h), Cm();
    });
    return gl.set(a, c), c;
  },
  clear() {
    Ds.forEach((e) => URL.revokeObjectURL(e)), Ds.clear(), gl.clear(), zs = [], _l = 0;
  }
}, py = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, ns = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, qr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function yu({
  hostname: e,
  displayId: t = "mon-0",
  activeSegments: n = [],
  viewportStartMs: r = 0,
  viewportDurationMs: l = 36e5,
  baseEpochMs: o = 0,
  inPointMs: a = 0,
  outPointMs: c = 36e5,
  globalGaps: u = [],
  gaps: h = [],
  directorSegments: y = [],
  isAutoDirectorEnabled: p = !1,
  showDirectorCoverage: f = !1,
  stepperSegments: v = null,
  isCanvasSummary: b = !1
}) {
  const [E, D] = i.useState({}), k = i.useRef(E);
  k.current = E;
  const m = i.useMemo(() => py(l), [l]), j = i.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: w, framesPerTile: _ } = m, G = [], I = o + r, R = I + l, se = I - w, ne = R + w, re = [...n].sort((U, we) => ns(U) - ns(we)), P = b ? u || [] : [...u || [], ...h || []], F = (U, we) => !P || P.length === 0 ? !1 : P.some((K) => {
      const z = K.startEpochMs ?? K.startEpoch ?? K.start ?? 0, V = K.endEpochMs ?? K.endEpoch ?? K.end ?? 0;
      return V <= z ? !1 : Math.max(U, z) < Math.min(we, V);
    }), T = o + a, B = o + c;
    if (re.forEach((U, we) => {
      const K = Math.round(ns(U)), z = Math.round(qr(U));
      if (z <= K) return;
      const V = Math.max(K, T), ge = Math.min(z, B);
      if (ge <= V) return;
      const ye = Math.max(V, se), ve = Math.min(ge, ne);
      if (ve <= ye) return;
      const Oe = Math.floor(ye / w) * w;
      for (let xe = Oe; xe < ve; xe += w) {
        const Ee = xe + w, tt = Math.max(V, xe), nt = Math.min(ge, Ee);
        nt > tt && !F(tt, nt) && G.push({
          key: `${e}_${t}_${tt}_${nt}_${_}`,
          sIdx: we,
          startEpoch: tt,
          endEpoch: nt,
          framesPerTile: _,
          displayId: t
        });
      }
    }), G.length > 20) {
      const U = o + r + l / 2;
      G.sort((we, K) => {
        const z = Math.abs((we.startEpoch + we.endEpoch) / 2 - U), V = Math.abs((K.startEpoch + K.endEpoch) / 2 - U);
        return z - V;
      }), G.length = 20, G.sort((we, K) => we.startEpoch - K.startEpoch);
    }
    return G;
  }, [n, o, e, t, r, l, m, a, c, h, u]);
  i.useEffect(() => {
    if (j.length === 0) return;
    let w = !0;
    const _ = new AbortController(), G = [], I = {};
    let R = !1;
    j.forEach((T) => {
      const B = Vh.get(e, T.startEpoch, T.endEpoch, T.framesPerTile, t);
      B ? k.current[T.key] !== B && (I[T.key] = B, R = !0) : G.push(T);
    });
    const se = new Set(j.map((T) => T.key)), ne = k.current, re = {};
    let P = !1;
    if (Object.keys(ne).forEach((T) => {
      se.has(T) ? re[T] = ne[T] : P = !0;
    }), R || P) {
      const T = { ...re, ...I };
      k.current = T, D(T);
    }
    if (G.length === 0) return () => {
      w = !1;
    };
    const F = setTimeout(() => {
      G.forEach((T) => {
        Vh.fetchTile(e, T.startEpoch, T.endEpoch, T.framesPerTile, _.signal, t).then((B) => {
          w && B && (k.current[T.key] = B, D((U) => ({ ...U, [T.key]: B })));
        });
      });
    }, 150);
    return () => {
      w = !1, clearTimeout(F), _.abort();
    };
  }, [j, e, t]);
  const M = (a - r) / l * 100, S = (c - r) / l * 100, C = i.useMemo(() => {
    if (j.length === 0 || !o || l <= 0) return [];
    const w = r, _ = r + l;
    return j.map((G) => {
      const I = G.startEpoch - o, R = G.endEpoch - o;
      if (R <= w || I >= _) return null;
      const se = Math.max(w, I), ne = Math.min(_, R);
      return {
        key: G.key,
        spriteUrl: E[G.key] || null,
        leftPct: (se - w) / l * 100,
        widthPct: (ne - se) / l * 100
      };
    }).filter(Boolean);
  }, [j, o, r, l, E]), N = i.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const w = r, _ = r + l;
    return n.map((G, I) => {
      const R = Math.round(ns(G)) - o, se = Math.round(qr(G)) - o;
      if (se <= w || R >= _) return null;
      const ne = Math.max(w, R), re = Math.min(_, se);
      return {
        id: I,
        leftPct: (ne - w) / l * 100,
        widthPct: (re - ne) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), g = i.useMemo(() => {
    if (!o || l <= 0) return [];
    const w = [...n].sort((F, T) => ns(F) - ns(T)), _ = [], G = r, I = r + l, R = o + G, se = o + I, ne = o + (a !== void 0 ? a : G), re = o + (c !== void 0 ? c : I);
    if (w.length > 0) {
      const F = ns(w[0]);
      F > R && _.push({ startEpoch: R, endEpoch: F });
    } else l > 0 && _.push({ startEpoch: R, endEpoch: se });
    for (let F = 0; F < w.length - 1; F++) {
      const T = qr(w[F]), B = ns(w[F + 1]);
      B - T > 1e3 && _.push({ startEpoch: T, endEpoch: B });
    }
    if (w.length > 0) {
      const F = qr(w[w.length - 1]);
      F < se && _.push({ startEpoch: F, endEpoch: se });
    }
    const P = [];
    return u && u.length > 0 && u.forEach((F, T) => {
      const B = Math.max(F.startEpochMs ?? F.StartEpochMs, ne), U = Math.min(F.endEpochMs ?? F.EndEpochMs, re);
      if (U > B && U > R && B < se) {
        const we = Math.max(R, B), K = Math.min(se, U), z = (K - o - (we - o)) / l * 100;
        z > 0 && P.push({
          id: `global-${T}`,
          type: "global",
          startEpoch: we,
          endEpoch: K,
          leftPct: (we - o - G) / l * 100,
          widthPct: z,
          durationSec: Math.round((U - B) / 1e3)
        });
      }
    }), b || _.forEach((F, T) => {
      let B = [F];
      u && u.length > 0 && u.forEach((U) => {
        const we = Math.max(U.startEpochMs ?? U.StartEpochMs, ne), K = Math.min(U.endEpochMs ?? U.EndEpochMs, re);
        if (K <= we) return;
        const z = [];
        B.forEach((V) => {
          K <= V.startEpoch || we >= V.endEpoch ? z.push(V) : (we > V.startEpoch && z.push({ startEpoch: V.startEpoch, endEpoch: we }), K < V.endEpoch && z.push({ startEpoch: K, endEpoch: V.endEpoch }));
        }), B = z;
      }), B.forEach((U, we) => {
        if (U.endEpoch - U.startEpoch < 1e3 || U.endEpoch <= R || U.startEpoch >= se) return;
        const K = Math.max(R, U.startEpoch), z = Math.min(se, U.endEpoch), V = (z - o - (K - o)) / l * 100;
        V > 0 && P.push({
          id: `station-${T}-${we}`,
          type: "station",
          startEpoch: K,
          endEpoch: z,
          leftPct: (K - o - G) / l * 100,
          widthPct: V,
          durationSec: Math.round((U.endEpoch - U.startEpoch) / 1e3)
        });
      });
    }), P;
  }, [n, u, o, r, l, a, c, b]), $ = i.useMemo(() => {
    if (!f || !p || !y || y.length === 0) return [];
    const w = (t || "mon-0").toLowerCase(), _ = r, G = r + l;
    return y.map((I, R) => {
      const se = (I.startEpochMs ?? I.StartEpochMs ?? 0) - o, ne = (I.endEpochMs ?? I.EndEpochMs ?? 0) - o;
      if (ne <= _ || se >= G) return null;
      const re = Math.max(_, se), P = Math.min(G, ne), F = (re - _) / l * 100, T = (P - re) / l * 100;
      if (T <= 0) return null;
      const U = (I.targetDisplayId || I.TargetDisplayId || "mon-0").toLowerCase() === w;
      return {
        id: `cov_${R}`,
        isFeatured: U,
        leftPct: F,
        widthPct: T
      };
    }).filter(Boolean);
  }, [f, p, y, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: g.map((w) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `gap-full-block ${w.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
        style: { left: `${w.leftPct}%`, width: `${w.widthPct}%` },
        title: w.type === "global" ? `Shared Gap: ${w.durationSec}s will be skipped` : `Station Gap: ${w.durationSec}s No-Signal`,
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
          w.widthPct > 2.5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${w.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: w.type === "global" ? `✂ SKIPPED (${w.durationSec}s)` : "NO SIGNAL" }) })
        ]
      },
      w.id
    )) }),
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: C.map((w) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `spritesheet-tile-block ${w.spriteUrl ? "is-loaded" : "is-loading"}`,
        style: {
          position: "absolute",
          left: `${w.leftPct}%`,
          width: `${w.widthPct}%`,
          height: "100%",
          backgroundImage: w.spriteUrl ? `url("${w.spriteUrl}")` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "opacity 0.25s ease"
        },
        children: !w.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
      },
      w.key
    )) }),
    $.map((w) => w.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${w.leftPct}%`, width: `${w.widthPct}%` },
        title: "Display Featured by Auto-Director"
      },
      w.id
    ) : /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-mask-dimmed",
        style: { left: `${w.leftPct}%`, width: `${w.widthPct}%` },
        title: "Display Off-Air (Masked by Auto-Director)"
      },
      w.id
    )),
    /* @__PURE__ */ s.jsxs("div", { className: `data-presence-layer ${v ? "has-stepper" : ""}`, children: [
      N.map((w) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "data-presence-bar recorded-bar",
          style: { left: `${w.leftPct}%`, width: `${w.widthPct}%` },
          title: "Recorded Video"
        },
        `bar_${w.id}`
      )),
      g.map((w) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `data-presence-bar gap-bar ${w.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${w.leftPct}%`, width: `${w.widthPct}%` },
          title: w.type === "global" ? `Shared Gap: ${w.durationSec}s skipped in export` : `Signal Loss / Gap: ${w.durationSec}s (No Video)`
        },
        `gap_bar_${w.id}`
      ))
    ] }),
    v && v.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: p ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      v.map((w, _) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${w.dispNum}`,
          style: { left: `${w.leftPct}%`, width: `${w.widthPct}%` },
          title: `Auto-Director: Screen ${w.dispNum} (${w.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: w.dispNum })
        },
        `stp_${_}`
      )),
      g && g.map((w) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-gap-block ${w.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${w.leftPct}%`, width: `${w.widthPct}%` },
          title: w.type === "global" ? `Global Gap: ${w.durationSec}s skipped in export (No switches)` : `Station Gap: ${w.durationSec}s No Signal (No switches)`,
          children: w.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "stepper-gap-badge", children: w.type === "global" ? "✂ SKIPPED" : "NO SIGNAL" })
        },
        `gap_stp_${w.id}`
      ))
    ] }) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    M > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, M)}%` } }),
    S < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, S)}%`, right: 0 } })
  ] });
}
function my({
  station: e,
  isExpanded: t = !1,
  onToggleExpand: n,
  isAutoDirectorEnabled: r = !0,
  onToggleAutoDirector: l,
  canvasPlacements: o = [],
  onToggleDisplayOnCanvas: a,
  directorPlan: c = null,
  isActive: u = !0,
  onSelect: h,
  onStationContextMenu: y,
  onDeselectStation: p,
  viewportStartMs: f = 0,
  viewportDurationMs: v = 36e5,
  inPointMs: b = 0,
  outPointMs: E = 36e5,
  baseEpochMs: D = 0,
  segments: k = [],
  recordingSegments: m = {},
  globalGaps: j = []
}) {
  const M = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", S = (e == null ? void 0 : e.id) || M, C = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", N = (e == null ? void 0 : e.hostname) || "", g = i.useMemo(() => {
    var T, B, U;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((T = e == null ? void 0 : e.displayTopology) == null ? void 0 : T.displays) || ((B = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : B.Displays) || ((U = e == null ? void 0 : e.topology) == null ? void 0 : U.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), $ = i.useMemo(() => {
    var B, U;
    const T = g.find((we) => we.isPrimary || we.IsPrimary);
    return ((T == null ? void 0 : T.displayId) || (T == null ? void 0 : T.DisplayId) || ((B = g[0]) == null ? void 0 : B.displayId) || ((U = g[0]) == null ? void 0 : U.DisplayId) || "mon-0").toLowerCase();
  }, [g]), w = c || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), _ = i.useMemo(() => (w == null ? void 0 : w.segments) || (w == null ? void 0 : w.Segments) || [], [w]), G = _ && _.length > 0, I = !!(g && g.length > 1), R = !!(t && I), se = i.useMemo(() => {
    let T = m[S] || m[M] || k || [];
    if (!T || T.length === 0) {
      const B = (S || "").toLowerCase(), U = (M || "").toLowerCase();
      for (const [we, K] of Object.entries(m || {})) {
        const z = we.toLowerCase();
        if (B && z === B || U && z === U) {
          T = K;
          break;
        }
      }
    }
    if ((!T || T.length === 0) && (T = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !T || T.length === 0)
      for (const B of g) {
        const U = B.segments || B.Segments || [];
        if (U.length > 0) {
          T = U;
          break;
        }
      }
    return (T || []).filter((B) => qr(B) - ns(B) > 0);
  }, [m, k, S, M, e, g]), ne = i.useMemo(() => {
    if (!D || v <= 0) return [];
    const T = [...se].sort((z, V) => ns(z) - ns(V)), B = [], U = D + v;
    if (j && j.length > 0 && j.forEach((z) => {
      const V = z.startEpochMs ?? z.StartEpochMs ?? 0, ge = z.endEpochMs ?? z.EndEpochMs ?? 0;
      ge > V && B.push({ startEpoch: V, endEpoch: ge, type: "global" });
    }), T.length === 0)
      return B.push({ startEpoch: D, endEpoch: U, type: "station" }), B;
    const we = Math.round(ns(T[0]));
    we - D > 2e3 && (B.some((V) => V.type === "global" && V.startEpoch <= D && V.endEpoch >= we) || B.push({ startEpoch: D, endEpoch: we, type: "station" }));
    for (let z = 0; z < T.length - 1; z++) {
      const V = Math.round(qr(T[z])), ge = Math.round(ns(T[z + 1]));
      ge - V > 2e3 && (B.some((ve) => ve.type === "global" && ve.startEpoch <= V && ve.endEpoch >= ge) || B.push({ startEpoch: V, endEpoch: ge, type: "station" }));
    }
    const K = Math.round(qr(T[T.length - 1]));
    return U - K > 2e3 && (B.some((V) => V.type === "global" && V.startEpoch <= K && V.endEpoch >= U) || B.push({ startEpoch: K, endEpoch: U, type: "station" })), B;
  }, [se, j, D, v]), re = i.useMemo(() => {
    const T = D + b, B = D + E;
    return Gx(_, ne, j, T, B, $);
  }, [_, ne, j, D, b, E, $]), P = i.useMemo(() => {
    if (!G || v <= 0) return null;
    const T = f, B = f + v;
    return re.map((U, we) => {
      const K = (U.startEpochMs ?? U.StartEpochMs ?? 0) - D, z = (U.endEpochMs ?? U.EndEpochMs ?? 0) - D;
      if (z <= T || K >= B) return null;
      const V = Math.max(T, K), ge = Math.min(B, z), ye = (V - T) / v * 100, ve = (ge - V) / v * 100;
      if (ve <= 0) return null;
      const Oe = (U.targetDisplayId || U.TargetDisplayId || "mon-0").toLowerCase(), xe = g.findIndex((nt) => (nt.displayId || nt.DisplayId || "").toLowerCase() === Oe);
      let Ee = xe >= 0 ? xe + 1 : null;
      if (!Ee) {
        const nt = Oe.match(/\d+/);
        Ee = nt ? parseInt(nt[0], 10) + 1 : 1;
      }
      const tt = xe >= 0 ? g[xe].displayName || g[xe].DisplayName || `Screen ${Ee}` : `Screen ${Ee}`;
      return {
        id: we,
        dispNum: Ee,
        dispLabel: tt,
        leftPct: ye,
        widthPct: ve
      };
    }).filter(Boolean);
  }, [G, re, g, D, f, v]), F = i.useCallback((T) => {
    const B = (T || "mon-0").toLowerCase();
    return o.some((U) => {
      if (U.stationId !== S) return !1;
      const we = (U.displayId || "mon-0").toLowerCase();
      return we === B || we === "auto" && (B === "mon-0" || B === "screen-0");
    });
  }, [o, S]);
  return R ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
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
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: C, children: C }),
        I && l && /* @__PURE__ */ s.jsx(
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
        I && l && /* @__PURE__ */ s.jsxs(
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
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: g.map((T, B) => {
      const U = (T.displayId || T.DisplayId || `mon-${B}`).toLowerCase(), we = T.displayNumber || T.DisplayNumber || B + 1, K = T.displayName || T.DisplayName || "", z = K && !K.toLowerCase().includes(M.toLowerCase()) ? K : `Screen ${we}${T.isPrimary || B === 0 ? " (Main)" : ""}`, V = F(U), ge = (() => {
        if (T.segments && T.segments.length > 0) return T.segments;
        const ye = `${S}/${U}`.toLowerCase(), ve = `${M}/${U}`.toLowerCase(), Oe = `${S}_${U}`.toLowerCase(), xe = `${M}_${U}`.toLowerCase();
        for (const [Ee, tt] of Object.entries(m || {})) {
          const nt = Ee.toLowerCase();
          if (nt === ye || nt === ve || nt === Oe || nt === xe) return tt;
        }
        return U === "mon-0" || T.isPrimary || B === 0 ? se : [];
      })();
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${z} (${T.width || 1920}×${T.height || 1080})`, children: z }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${V ? "is-on-canvas" : ""}`,
                  onClick: (ye) => {
                    ye.stopPropagation(), a(e.id, U);
                  },
                  title: V ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: V ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              yu,
              {
                hostname: M,
                displayId: U,
                activeSegments: ge,
                viewportStartMs: f,
                viewportDurationMs: v,
                baseEpochMs: D,
                inPointMs: b,
                outPointMs: E,
                globalGaps: j,
                directorSegments: re,
                isAutoDirectorEnabled: r,
                gaps: ne,
                showDirectorCoverage: I
              }
            )
          ]
        },
        `${e.id}-${U}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        h && h(), I && n && n();
      },
      onContextMenu: (T) => {
        y && (T.preventDefault(), T.stopPropagation(), y(T, e));
      },
      className: `timeline-track-container station-collapsed-track ${u ? "active-track" : ""} ${I ? "has-stepper" : "no-stepper"}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${C}${N ? ` (${N})` : ""} • Click to select${I ? " / expand" : ""}`,
            children: [
              I && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (T) => {
                    T.stopPropagation(), n == null || n();
                  },
                  title: "Expand station tracks",
                  children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: C, children: C }),
              I && l && /* @__PURE__ */ s.jsx(
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
              p && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-track-deselect",
                  title: `Remove ${C} from project`,
                  onClick: (T) => {
                    T.stopPropagation(), p(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          yu,
          {
            hostname: M,
            displayId: $,
            activeSegments: se,
            viewportStartMs: f,
            viewportDurationMs: v,
            baseEpochMs: D,
            inPointMs: b,
            outPointMs: E,
            globalGaps: j,
            isAutoDirectorEnabled: r,
            gaps: ne,
            stepperSegments: I ? P : null
          }
        )
      ]
    }
  );
}
const pl = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map();
function gy(e, t, n, r = 250) {
  const l = (e || "").replace(/^live\//i, "").toLowerCase().trim(), o = Math.floor(t / 1e4) * 1e4, a = Math.ceil(n / 1e4) * 1e4;
  return `${l}_${o}_${a}_${r}`;
}
const tl = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 250) {
    const l = gy(e, t, n, r);
    return pl.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 250) {
    if (!e || n <= t) return null;
    const o = (e || "").replace(/^live\//i, "").trim(), a = Math.floor(t / 1e4) * 1e4, c = Math.ceil(n / 1e4) * 1e4, u = `${o.toLowerCase()}_${a}_${c}_${l}`;
    if (pl.has(u))
      return pl.get(u);
    if (ho.has(u))
      return ho.get(u);
    const h = (async () => {
      try {
        const y = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(o)}&startEpoch=${a}&endEpoch=${c}&points=${l}`, p = await fetch(y, { signal: r });
        if (!p.ok) {
          if (p.status === 204) return null;
          throw new Error(`HTTP ${p.status}`);
        }
        const f = await p.json();
        if (Array.isArray(f) && f.length > 0)
          return pl.set(u, f), f;
      } catch (y) {
        if (y.name !== "AbortError") {
          const p = new Array(l).fill(0.02);
          return pl.set(u, p), p;
        }
      } finally {
        ho.delete(u);
      }
      return null;
    })();
    return ho.set(u, h), h;
  },
  /**
   * Clears cached waveforms (e.g. on project change)
   */
  clear() {
    pl.clear(), ho.clear();
  }
}, wa = {
  sys: "#8B5CF6",
  // Tactical Violet (System Audio / PC Output)
  mic: "#F59E0B"
};
function fi(e, t = 100, n = 24, r = 1, l = {}) {
  const o = l.yCenter !== void 0 ? l.yCenter : n / 2, a = l.maxHalfHeight !== void 0 ? l.maxHalfHeight : n / 2 - 1.5;
  if (!e || !Array.isArray(e) || e.length === 0)
    return `M 0,${o} L ${t},${o}`;
  const c = e.length, u = t / Math.max(1, c - 1), h = Math.max(0, Math.min(3, Number(r) || 1));
  let y = "";
  for (let f = 0; f < c; f++) {
    const v = f * u, b = Math.min(1, Math.max(0.02, (e[f] || 0) * h)), E = o - b * a;
    y += f === 0 ? `M ${v.toFixed(2)},${E.toFixed(2)}` : ` L ${v.toFixed(2)},${E.toFixed(2)}`;
  }
  let p = "";
  for (let f = c - 1; f >= 0; f--) {
    const v = f * u, b = Math.min(1, Math.max(0.02, (e[f] || 0) * h)), E = o + b * a;
    p += ` L ${v.toFixed(2)},${E.toFixed(2)}`;
  }
  return `${y}${p} Z`;
}
function xy(e, t = 100, n = 24, r = 1) {
  let l = null, o = null;
  e && typeof e == "object" && !Array.isArray(e) && e.sys && e.mic ? (l = e.sys, o = e.mic) : Array.isArray(e) && (l = e.map((u, h) => Math.min(1, Math.max(0.02, u * (1 + 0.12 * Math.sin(h * 0.45))))), o = e.map((u, h) => Math.min(1, Math.max(0.02, u * (0.92 + 0.15 * Math.cos(h * 0.38))))));
  const a = fi(l, t, n, r, {
    yCenter: n * 0.25,
    maxHalfHeight: n * 0.25 - 1.2
  }), c = fi(o, t, n, r, {
    yCenter: n * 0.75,
    maxHalfHeight: n * 0.25 - 1.2
  });
  return { sysPath: a, micPath: c };
}
const ja = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function Em({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: l = "#06B6D4" }) {
  const o = t === "both", a = t === "sys", c = t === "mic", u = i.useMemo(() => !o || !e ? null : xy(e, 100, 24, n), [o, e, n]), h = i.useMemo(() => o || !e ? null : fi(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [o, e, n]);
  if (r)
    return /* @__PURE__ */ s.jsxs("div", { className: "waveform-loading-shimmer", title: "Decoding Station Audio Waveform...", children: [
      /* @__PURE__ */ s.jsx("div", { className: "shimmer-scanner" }),
      /* @__PURE__ */ s.jsx("span", { className: "shimmer-text", children: "DECODING AUDIO..." })
    ] });
  if (o) {
    const p = wa.sys, f = wa.mic;
    return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg waveform-svg-dual", children: [
      /* @__PURE__ */ s.jsx(
        "path",
        {
          d: (u == null ? void 0 : u.sysPath) || "M 0,6 L 100,6",
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
          d: (u == null ? void 0 : u.micPath) || "M 0,18 L 100,18",
          fill: f,
          fillOpacity: "0.45",
          stroke: f,
          strokeWidth: "1.1",
          strokeOpacity: "0.9",
          className: "waveform-mic-path"
        }
      )
    ] });
  }
  const y = a ? wa.sys : c ? wa.mic : l || "#06B6D4";
  return /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
    "path",
    {
      d: h || fi(e, 100, 24, n),
      fill: y,
      fillOpacity: "0.45",
      stroke: y,
      strokeWidth: "1.2",
      strokeOpacity: "0.85"
    }
  ) });
}
function yy({
  clip: e,
  lane: t,
  laneColor: n,
  isSelected: r,
  onSelect: l,
  onOpenMenu: o,
  onTrimDrag: a,
  onClipMoveDrag: c,
  onToggleChannelMode: u,
  vpStartEpoch: h,
  viewportDurationMs: y,
  timeMode: p,
  stationName: f
}) {
  const [v, b] = i.useState(() => tl.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [E, D] = i.useState(!1);
  i.useEffect(() => {
    let R = !0;
    const se = new AbortController(), ne = tl.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (ne) {
      b(ne), D(!1);
      return;
    }
    return b(null), D(!0), tl.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, se.signal, 250).then((re) => {
      R && (re && b(re), D(!1));
    }).catch(() => {
      R && D(!1);
    }), () => {
      R = !1, se.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const k = e.startEpochMs, m = e.endEpochMs, j = Math.max(1, m - k), M = (e.gain || 1) * (t.gain || 1), S = Math.max(h, k), C = Math.min(h + y, m), N = (S - h) / y * 100, g = (C - S) / y * 100;
  if (g <= 0) return null;
  const $ = e.channelMode || t.channelMode || "both", w = e.fadeInMs ?? 50, _ = e.fadeOutMs ?? 50, G = Math.min(45, w / j * 100), I = Math.min(45, _ / j * 100);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-clip-block ${t.isMuted ? "lane-muted" : ""} ${r ? "is-selected" : ""}`,
      style: {
        left: `${N}%`,
        width: `${g}%`,
        borderLeftColor: n
      },
      onClick: l,
      onMouseDown: (R) => {
        !R.target.closest(".trim-handle") && !R.target.closest(".btn-menu-close") && !R.target.closest(".clip-channel-tag") && (c == null || c(R));
      },
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${f} [${$.toUpperCase()}] (${Mt(k, p, { includeSeconds: !0 })} - ${Mt(m, p, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${w}ms / OUT ${_}ms
Drag body: Move in time • Drag edges: Trim • Click tag: Toggle channel • Double-click: Edit`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (R) => a(R, "start"),
            title: "Drag to trim Clip In-Point"
          }
        ),
        w > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-in-ramp",
            style: { width: `${G}%` },
            title: `Fade In: ${w}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 0,100", fill: "rgba(6, 182, 212, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "100", x2: "100", y2: "0", stroke: "#38BDF8", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Em,
          {
            peaks: v,
            channelMode: $,
            effectiveGain: M,
            isLoadingWaveform: E,
            laneColor: n
          }
        ) }),
        _ > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${I}%` },
            title: `Fade Out: ${_}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 100,100", fill: "rgba(244, 63, 94, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "0", x2: "100", y2: "100", stroke: "#F43F5E", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: f }),
          /* @__PURE__ */ s.jsx(
            "span",
            {
              className: `clip-channel-tag mode-${$}`,
              onClick: (R) => {
                R.stopPropagation(), u == null || u();
              },
              title: `Channel Mode: ${$.toUpperCase()} (Click to cycle BOTH / SYS / MIC)`,
              children: $.toUpperCase()
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
            onMouseDown: (R) => a(R, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function vy({
  masterActiveClips: e,
  stations: t,
  vpStartEpoch: n,
  viewportDurationMs: r,
  timeMode: l,
  onExpand: o
}) {
  const [a, c] = i.useState({}), [u, h] = i.useState(!1);
  i.useEffect(() => {
    let b = !0;
    const E = new AbortController(), D = /* @__PURE__ */ new Set();
    if (e.forEach((k) => {
      k.sourceStationId && !tl.get(k.sourceStationId, k.startEpochMs, k.endEpochMs, 200) && D.add(k);
    }), D.size > 0) {
      h(!0);
      const k = Array.from(D).map(
        (m) => tl.fetchWaveform(m.sourceStationId, m.startEpochMs, m.endEpochMs, E.signal, 200)
      );
      Promise.allSettled(k).then(() => {
        b && (h(!1), c({}));
      });
    }
    return () => {
      b = !1, E.abort();
    };
  }, [e]);
  const y = new Set(e.map((b) => b.effectiveChannelMode || "both")), p = y.has("both") || y.has("sys") && y.has("mic") ? "both" : y.has("sys") ? "sys" : y.has("mic") ? "mic" : "both", f = i.useMemo(() => {
    const E = new Array(200).fill(0);
    let D = !1;
    return e.forEach((k) => {
      const m = tl.get(k.sourceStationId, k.startEpochMs, k.endEpochMs, 200);
      if (!m || !m.length) return;
      D = !0;
      const j = k.startEpochMs, M = k.endEpochMs - j;
      if (M <= 0) return;
      const S = typeof k.effectiveGain == "number" ? k.effectiveGain : 1;
      for (let C = 0; C < 200; C++) {
        const N = n + C / 200 * r;
        if (N >= j && N <= k.endEpochMs) {
          const g = (N - j) / M, $ = Math.min(m.length - 1, Math.max(0, Math.floor(g * m.length))), w = (m[$] || 0) * S;
          w > E[C] && (E[C] = w);
        }
      }
    }), D ? E : new Array(200).fill(0.03);
  }, [e, n, r, a]), v = Array.from(new Set(e.map((b) => {
    const E = t.find((D) => D.id === b.sourceStationId);
    return E ? E.displayName || E.hostname || E.id : b.sourceStationId;
  }))).join(" + ");
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `collapsed-master-clip aggregated-mode mode-${p}`,
      style: {
        left: "0%",
        width: "100%",
        borderLeftColor: "#06B6D4"
      },
      onDoubleClick: o,
      title: `Audio Master Mix: ${v} [${p.toUpperCase()}]
Double-click to expand multitrack audio lanes`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Em,
          {
            peaks: f,
            channelMode: p,
            effectiveGain: 1,
            isLoadingWaveform: u,
            laneColor: "#06B6D4"
          }
        ) }),
        /* @__PURE__ */ s.jsxs("div", { className: "collapsed-clip-info", children: [
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-clip-station", children: v || "MASTER AUDIO BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: `clip-channel-tag mode-${p}`, children: p.toUpperCase() }),
          /* @__PURE__ */ s.jsxs("span", { className: "collapsed-clip-gain", children: [
            e.length,
            " ",
            e.length === 1 ? "TRACK" : "TRACKS",
            " IN MIX"
          ] })
        ] })
      ]
    }
  );
}
function Ny({
  audioPlan: e,
  stations: t = [],
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  baseEpochMs: l = 0,
  playheadMs: o = 0,
  onSplitSegment: a,
  onChangeSegmentStation: c,
  onChangeSegmentGain: u,
  onFollowVisualFeed: h,
  isAutoFollow: y = !1,
  timeMode: p = "LOCAL",
  onUpdateAudioPlan: f = null
}) {
  const v = i.useRef(null), [b, E] = i.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [D, k] = i.useState(!1), [m, j] = i.useState(null), [M, S] = i.useState(1), [C, N] = i.useState(50), [g, $] = i.useState(50), [w, _] = i.useState([]), [G, I] = i.useState(null), [R, se] = i.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  i.useEffect(() => {
    const L = (Y) => {
      Y.detail && se(Y.detail);
    };
    return window.addEventListener("itb-live-audio-level", L), () => window.removeEventListener("itb-live-audio-level", L);
  }, []);
  const ne = i.useCallback(() => {
    E((L) => {
      const Y = !L;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(Y));
      } catch {
      }
      return Y;
    });
  }, []), [re, P] = i.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map((L, Y) => {
        var Z;
        return {
          id: `clip_${Y}_${L.startEpochMs || L.StartEpochMs}`,
          startEpochMs: L.startEpochMs ?? L.StartEpochMs ?? l,
          endEpochMs: L.endEpochMs ?? L.EndEpochMs ?? l + r,
          sourceStationId: L.sourceStationId ?? L.SourceStationId ?? (((Z = t[0]) == null ? void 0 : Z.id) || "station-0"),
          gain: L.gain ?? L.Gain ?? 1,
          channelMode: L.channelMode ?? L.ChannelMode ?? "both",
          fadeInMs: L.fadeInMs ?? L.FadeInMs ?? 50,
          fadeOutMs: L.fadeOutMs ?? L.FadeOutMs ?? 50
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
  ]), F = l + o, T = l + n, B = T + r, U = i.useCallback((L) => {
    if (!f) return;
    const Y = [];
    L.forEach((Z) => {
      Z.isMuted || D || Z.clips.forEach((q) => {
        Y.push({
          startEpochMs: q.startEpochMs,
          endEpochMs: q.endEpochMs,
          sourceStationId: q.sourceStationId,
          gain: q.gain * Z.gain,
          channelMode: q.channelMode || Z.channelMode || "both",
          fadeInMs: q.fadeInMs ?? 50,
          fadeOutMs: q.fadeOutMs ?? 50
        });
      });
    }), Y.sort((Z, q) => Z.startEpochMs - q.startEpochMs), f({ segments: Y });
  }, [f, D]);
  i.useEffect(() => {
    let L = null;
    for (const Y of re)
      if (!(Y.isMuted || D)) {
        for (const Z of Y.clips)
          if (F >= Z.startEpochMs && F <= Z.endEpochMs) {
            const q = t.find((le) => le.id === Z.sourceStationId);
            L = {
              stationId: Z.sourceStationId,
              stationName: q ? q.displayName || q.hostname || q.id : Z.sourceStationId,
              channelMode: Z.channelMode || Y.channelMode || "both",
              gain: Z.gain * Y.gain,
              isPlaying: R.isPlaying
            };
            break;
          }
        if (L) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: L }));
  }, [re, D, F, t, R.isPlaying]), i.useEffect(() => {
    const L = () => {
      w.length !== 0 && (P((q) => {
        const le = q.map((J) => ({
          ...J,
          clips: J.clips.filter((ie) => !w.includes(ie.id))
        }));
        return U(le), le;
      }), _([]), j(null));
    }, Y = (q) => {
      if (q.key === "Delete" || q.key === "Backspace") {
        const le = q.target;
        if (le.tagName === "INPUT" || le.tagName === "TEXTAREA" || le.isContentEditable) return;
        w.length > 0 && (q.preventDefault(), L());
      }
    }, Z = () => L();
    return window.addEventListener("keydown", Y), window.addEventListener("itb:studio-delete-selected", Z), () => {
      window.removeEventListener("keydown", Y), window.removeEventListener("itb:studio-delete-selected", Z);
    };
  }, [w, U]);
  const we = i.useCallback(() => {
    P((L) => {
      const Z = `A${L.length + 1}`, q = {
        id: Z,
        name: `Track ${Z}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, le = [...L, q];
      return U(le), le;
    });
  }, [U]), K = i.useCallback((L) => {
    P((Y) => {
      if (Y.length <= 1) return Y;
      const Z = Y.filter((q) => q.id !== L);
      return U(Z), Z;
    });
  }, [U]), z = i.useCallback((L) => {
    P((Y) => {
      const Z = Y.map((q) => q.id === L ? { ...q, isMuted: !q.isMuted } : q);
      return U(Z), Z;
    });
  }, [U]), V = i.useCallback((L) => {
    P((Y) => {
      var le;
      const Z = (le = Y.find((J) => J.id === L)) == null ? void 0 : le.isSolo, q = Y.map((J) => ({
        ...J,
        isSolo: J.id === L ? !Z : !1,
        isMuted: J.id === L ? !1 : !Z
      }));
      return U(q), q;
    });
  }, [U]), ge = i.useCallback((L) => {
    const Y = ["both", "sys", "mic"];
    P((Z) => {
      const q = Z.map((le) => {
        if (le.id !== L) return le;
        const J = le.channelMode || "both", ie = Y[(Y.indexOf(J) + 1) % Y.length];
        return {
          ...le,
          channelMode: ie,
          clips: le.clips.map((Fe) => ({ ...Fe, channelMode: ie }))
        };
      });
      return U(q), q;
    });
  }, [U]), ye = i.useCallback((L, Y) => {
    const Z = Math.max(0, Math.min(2, Number(Y)));
    P((q) => {
      const le = q.map((J) => J.id === L ? { ...J, gain: Z } : J);
      return U(le), le;
    }), Hh(Z);
  }, [U]), ve = i.useCallback((L, Y) => {
    Y && P((Z) => {
      const q = Z.map((le) => {
        if (le.id !== L) return le;
        if (le.clips.length === 0) {
          const J = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: Y,
            gain: 1,
            channelMode: le.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...le, clips: [J] };
        }
        return {
          ...le,
          clips: le.clips.map((J) => ({ ...J, sourceStationId: Y }))
        };
      });
      return U(q), q;
    });
  }, [l, r, U]), Oe = i.useCallback((L, Y = null, Z = null) => {
    var pt;
    const q = Y || ((pt = t[0]) == null ? void 0 : pt.id) || "station-0", le = Z !== null ? Z : F, J = Math.min(r, 6e4), ie = le + J, Fe = re.find((st) => st.id === L), Je = (Fe == null ? void 0 : Fe.channelMode) || "both", _e = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(le),
      endEpochMs: Math.round(ie),
      sourceStationId: q,
      gain: 1,
      channelMode: Je,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    P((st) => {
      const ct = st.map((Ze) => Ze.id === L ? {
        ...Ze,
        clips: [...Ze.clips, _e].sort((Gt, tn) => Gt.startEpochMs - tn.startEpochMs)
      } : Ze);
      return U(ct), ct;
    });
  }, [re, F, r, t, U]), xe = i.useCallback((L, Y = null) => {
    P((Z) => {
      const q = Z.map((le) => {
        if (L && le.id !== L) return le;
        const J = [];
        return le.clips.forEach((ie) => {
          (!Y || ie.id === Y || w.includes(ie.id)) && F > ie.startEpochMs + 500 && F < ie.endEpochMs - 500 ? (J.push({ ...ie, endEpochMs: F }), J.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: F,
            endEpochMs: ie.endEpochMs,
            sourceStationId: ie.sourceStationId,
            gain: ie.gain,
            channelMode: ie.channelMode || le.channelMode || "both",
            fadeInMs: ie.fadeInMs ?? 50,
            fadeOutMs: ie.fadeOutMs ?? 50
          })) : J.push(ie);
        }), { ...le, clips: J };
      });
      return U(q), q;
    }), j(null);
  }, [F, w, U]), Ee = i.useCallback(() => {
    xe(null, null);
  }, [xe]), tt = i.useCallback((L, Y) => {
    P((Z) => {
      const q = Z.map((le) => le.id !== L ? le : {
        ...le,
        clips: le.clips.filter((J) => J.id !== Y)
      });
      return U(q), q;
    }), j(null);
  }, [U]), nt = i.useCallback((L, Y, Z) => {
    P((q) => {
      const le = q.map((J) => J.id !== L ? J : {
        ...J,
        clips: J.clips.map((ie) => ie.id === Y ? { ...ie, sourceStationId: Z } : ie)
      });
      return U(le), le;
    }), j((q) => q ? { ...q, stationId: Z } : null);
  }, [U]), zt = i.useCallback((L, Y, Z) => {
    const q = Math.max(0, Math.min(2.5, Number(Z)));
    S(q), P((le) => {
      const J = le.map((ie) => ie.id !== L ? ie : {
        ...ie,
        clips: ie.clips.map((Fe) => Fe.id === Y ? { ...Fe, gain: q } : Fe)
      });
      return U(J), J;
    }), Hh(q);
  }, [U]), jt = i.useCallback((L, Y, Z, q) => {
    const le = Math.max(0, Math.min(1e4, Math.round(Number(q) || 0)));
    Z === "in" ? N(le) : $(le), P((J) => {
      const ie = J.map((Fe) => Fe.id !== L ? Fe : {
        ...Fe,
        clips: Fe.clips.map((Je) => Je.id === Y ? Z === "in" ? { ...Je, fadeInMs: le } : { ...Je, fadeOutMs: le } : Je)
      });
      return U(ie), ie;
    }), j((J) => J ? Z === "in" ? { ...J, fadeInMs: le } : { ...J, fadeOutMs: le } : null);
  }, [U]), St = i.useCallback((L, Y, Z) => {
    var Gt, tn;
    if (L.preventDefault(), L.stopPropagation(), L.button !== 0) return;
    const q = re.find((Tt) => Tt.id === Y), le = (Gt = q == null ? void 0 : q.clips) == null ? void 0 : Gt.find((Tt) => Tt.id === Z);
    if (!le) return;
    const J = L.clientX, ie = le.startEpochMs, Je = le.endEpochMs - ie, _e = v.current;
    if (!_e) return;
    const pt = (tn = _e.querySelector(".audio-lane-timeline")) == null ? void 0 : tn.getBoundingClientRect();
    if (!pt || pt.width <= 0) return;
    let st = !1;
    const ct = (Tt) => {
      const mt = Tt.clientX - J;
      Math.abs(mt) > 3 && (st = !0);
      const Rt = mt / pt.width * r;
      let at = Math.round(ie + Rt), gt = at + Je;
      const fn = 12 / pt.width * r;
      Math.abs(at - F) <= fn ? (at = F, gt = at + Je) : Math.abs(gt - F) <= fn && (gt = F, at = gt - Je), at < l && (at = l, gt = at + Je), P((It) => It.map((qt) => qt.id !== Y ? qt : {
        ...qt,
        clips: qt.clips.map((Ut) => Ut.id === Z ? { ...Ut, startEpochMs: at, endEpochMs: gt } : Ut)
      }));
    }, Ze = () => {
      window.removeEventListener("mousemove", ct), window.removeEventListener("mouseup", Ze), st && P((Tt) => (U(Tt), Tt));
    };
    window.addEventListener("mousemove", ct), window.addEventListener("mouseup", Ze);
  }, [re, r, F, l, U]), H = i.useCallback((L, Y, Z, q) => {
    L.preventDefault(), L.stopPropagation();
    const le = L.clientX, J = re.find((st) => st.id === Y), ie = J == null ? void 0 : J.clips.find((st) => st.id === Z);
    if (!ie) return;
    const Fe = ie.startEpochMs, Je = ie.endEpochMs, _e = (st) => {
      var Tt;
      const ct = st.clientX - le, Ze = (Tt = v.current) == null ? void 0 : Tt.querySelector(".audio-lane-timeline");
      if (!Ze) return;
      const Gt = Ze.getBoundingClientRect(), tn = ct / Gt.width * r;
      P((mt) => mt.map((Rt) => Rt.id !== Y ? Rt : {
        ...Rt,
        clips: Rt.clips.map((at) => {
          if (at.id !== Z) return at;
          if (q === "start") {
            const gt = Math.min(Je - 500, Fe + tn);
            return { ...at, startEpochMs: Math.round(gt) };
          } else {
            const gt = Math.max(Fe + 500, Je + tn);
            return { ...at, endEpochMs: Math.round(gt) };
          }
        })
      }));
    }, pt = () => {
      window.removeEventListener("mousemove", _e), window.removeEventListener("mouseup", pt), P((st) => (U(st), st));
    };
    window.addEventListener("mousemove", _e), window.addEventListener("mouseup", pt);
  }, [re, r, U]), Ae = i.useCallback((L, Y, Z) => {
    P((q) => {
      const le = q.map((J) => J.id !== L ? J : {
        ...J,
        clips: J.clips.map((ie) => ie.id === Y ? { ...ie, channelMode: Z } : ie)
      });
      return U(le), le;
    }), j((q) => q ? { ...q, channelMode: Z } : null);
  }, [U]), ze = i.useCallback((L, Y) => {
    var Je;
    const Z = re.find((_e) => _e.id === L), q = (Je = Z == null ? void 0 : Z.clips) == null ? void 0 : Je.find((_e) => _e.id === Y);
    if (!q) return;
    const le = q.channelMode || Z.channelMode || "both", J = ["both", "sys", "mic"], ie = (J.indexOf(le) + 1) % J.length, Fe = J[ie];
    Ae(L, Y, Fe);
  }, [re, Ae]), ee = (L, Y, Z) => {
    L.preventDefault(), L.stopPropagation();
    const q = 280, le = 390, J = Math.max(16, Math.min(window.innerWidth - q - 16, L.clientX - q / 2));
    let ie = L.clientY - le - 12;
    ie < 80 && (ie = Math.min(window.innerHeight - le - 16, L.clientY + 24)), S(Z.gain || 1), N(Z.fadeInMs ?? 50), $(Z.fadeOutMs ?? 50), j({
      laneId: Y,
      clipId: Z.id,
      s: Z.startEpochMs,
      e: Z.endEpochMs,
      x: J,
      y: ie,
      stationId: Z.sourceStationId,
      gain: Z.gain || 1,
      channelMode: Z.channelMode || "both",
      fadeInMs: Z.fadeInMs ?? 50,
      fadeOutMs: Z.fadeOutMs ?? 50
    });
  };
  i.useEffect(() => {
    if (!m) return;
    const L = () => j(null), Y = (Z) => {
      Z.key === "Escape" && j(null);
    };
    return window.addEventListener("click", L), window.addEventListener("keydown", Y), () => {
      window.removeEventListener("click", L), window.removeEventListener("keydown", Y);
    };
  }, [m]);
  const ue = i.useMemo(() => {
    if (D) return [];
    const L = re.some((q) => q.isSolo), Y = re.filter((q) => L ? q.isSolo : !q.isMuted), Z = [];
    return Y.forEach((q) => {
      const le = ja[re.indexOf(q) % ja.length];
      q.clips.forEach((J) => {
        Z.push({
          ...J,
          laneId: q.id,
          laneName: q.name,
          laneColor: le,
          effectiveChannelMode: J.channelMode || q.channelMode || "both",
          effectiveGain: (J.gain || 1) * (q.gain || 1)
        });
      });
    }), Z.sort((q, le) => q.startEpochMs - le.startEpochMs);
  }, [re, D]);
  return !t || t.length === 0 ? null : b ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: v, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: ne,
            title: "Collapse Audio Master Bus",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          re.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: we,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-split-playhead",
            onClick: Ee,
            title: "Split clip at playhead (Ctrl+K / Razor Tool)",
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "vu-meter-readout", title: `Current Master Level: ${R.db.toFixed(1)} dB`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: R.db > -55 ? `${R.db.toFixed(0)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "vu-meter-groove", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "vu-meter-bar",
              style: {
                width: `${Math.min(100, Math.max(0, (R.peak || 0) * 100))}%`,
                background: R.peak > 0.85 ? "#F43F5E" : R.peak > 0.65 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${D ? "is-muted" : ""}`,
            onClick: () => {
              k((L) => {
                const Y = !L;
                return U(re), Y;
              });
            },
            title: D ? "Unmute All Audio Buses" : "Mute All Audio Buses",
            children: D ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: re.map((L, Y) => {
      const Z = ja[Y % ja.length], q = G === L.id, le = t.find((J) => {
        var ie;
        return J.id === ((ie = L.clips[0]) == null ? void 0 : ie.sourceStationId);
      }) || t[0];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-header", style: { borderLeftColor: Z }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "lane-ident", children: [
            /* @__PURE__ */ s.jsx("span", { className: "lane-badge", style: { backgroundColor: Z }, children: L.id }),
            /* @__PURE__ */ s.jsx("span", { className: "lane-name", children: L.name })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-selector", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (le == null ? void 0 : le.id) || "",
              onChange: (J) => ve(L.id, J.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((J) => /* @__PURE__ */ s.jsx("option", { value: J.id, children: J.displayName || J.hostname || J.id }, J.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${L.isMuted ? "active" : ""}`,
                onClick: () => z(L.id),
                title: L.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${L.isSolo ? "active" : ""}`,
                onClick: () => V(L.id),
                title: L.isSolo ? "Unsolo Lane" : "Solo Lane",
                children: "S"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-channel-mode mode-${L.channelMode || "both"}`,
                onClick: () => ge(L.id),
                title: `Discrete Audio Channel: ${(L.channelMode || "both").toUpperCase()} (Click to toggle BOTH / SYS / MIC)`,
                children: (L.channelMode || "both").toUpperCase()
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
                value: L.gain,
                onChange: (J) => ye(L.id, J.target.value),
                title: `Lane Gain: ${Math.round(L.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(L.gain * 100),
              "%"
            ] })
          ] }),
          re.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => K(L.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${q ? "is-drag-over" : ""}`,
            onClick: () => _([]),
            onDragOver: (J) => {
              J.preventDefault(), J.dataTransfer.dropEffect = "copy", G !== L.id && I(L.id);
            },
            onDragLeave: () => {
              G === L.id && I(null);
            },
            onDrop: (J) => {
              J.preventDefault(), I(null);
              const ie = J.dataTransfer.getData("text/station-id") || J.dataTransfer.getData("text/plain");
              if (ie) {
                const Fe = J.currentTarget.getBoundingClientRect(), Je = Math.max(0, Math.min(1, (J.clientX - Fe.left) / Fe.width)), _e = Math.round(T + Je * r);
                Oe(L.id, ie, _e);
              }
            },
            onDoubleClick: (J) => {
              var _e;
              const ie = J.currentTarget.getBoundingClientRect(), Fe = Math.max(0, Math.min(1, (J.clientX - ie.left) / ie.width)), Je = Math.round(T + Fe * r);
              Oe(L.id, (_e = t[0]) == null ? void 0 : _e.id, Je);
            },
            children: [
              L.clips.map((J) => {
                const ie = t.find((Je) => Je.id === J.sourceStationId), Fe = ie ? ie.displayName || ie.hostname || ie.id : J.sourceStationId;
                return J.endEpochMs <= T || J.startEpochMs >= B ? null : /* @__PURE__ */ s.jsx(
                  yy,
                  {
                    clip: J,
                    lane: L,
                    laneColor: Z,
                    isSelected: w.includes(J.id),
                    onSelect: (Je) => {
                      Je.stopPropagation(), Je.ctrlKey || Je.metaKey ? _(
                        (_e) => _e.includes(J.id) ? _e.filter((pt) => pt !== J.id) : [..._e, J.id]
                      ) : _([J.id]);
                    },
                    onOpenMenu: (Je) => ee(Je, L.id, J),
                    onTrimDrag: (Je, _e) => H(Je, L.id, J.id, _e),
                    onClipMoveDrag: (Je) => St(Je, L.id, J.id),
                    onToggleChannelMode: () => ze(L.id, J.id),
                    vpStartEpoch: T,
                    viewportDurationMs: r,
                    timeMode: p,
                    stationName: Fe
                  },
                  J.id
                );
              }),
              L.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var J;
                    return Oe(L.id, (J = t[0]) == null ? void 0 : J.id, F);
                  },
                  title: "Click or drop workstation here to insert audio clip",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK OR DRAG WORKSTATION HERE (",
                    L.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, L.id);
    }) }),
    m && Bs.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: m.x, top: m.y },
          onClick: (L) => L.stopPropagation(),
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-close",
                  onClick: () => j(null),
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE WORKSTATION" }),
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((L) => {
                const Y = L.id === m.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${Y ? "is-selected" : ""}`,
                    onClick: () => nt(m.laneId, m.clipId, L.id),
                    children: L.displayName || L.hostname || L.id
                  },
                  L.id
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
                    className: `btn-channel-chip mode-both ${m.channelMode === "both" ? "is-selected" : ""}`,
                    onClick: () => Ae(m.laneId, m.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${m.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => Ae(m.laneId, m.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${m.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => Ae(m.laneId, m.clipId, "mic"),
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
                  onChange: (L) => zt(m.laneId, m.clipId, L.target.value),
                  className: "menu-gain-slider"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME FADE IN / FADE OUT" }),
                /* @__PURE__ */ s.jsxs("span", { className: "fade-val", children: [
                  C,
                  "ms / ",
                  g,
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
                      value: C,
                      onChange: (L) => jt(m.laneId, m.clipId, "in", L.target.value),
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
                      value: g,
                      onChange: (L) => jt(m.laneId, m.clipId, "out", L.target.value),
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
                  onClick: () => xe(m.laneId, m.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => tt(m.laneId, m.clipId),
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
      ref: v,
      title: "Audio Master Bus is Collapsed. Click or double-click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", onClick: ne, children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: D || ue.length === 0 ? "🔇" : "🔊" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: ue.length > 0 ? `${ue.length} CLIPS ACTIVE` : D ? "MUTED" : "0 ACTIVE" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: R.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "audio-track-timeline collapsed-bus-timeline",
            onClick: (L) => {
              L.target.closest(".collapsed-master-clip") || ne();
            },
            children: ue.length === 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
              /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS (0 ACTIVE) — CLICK TO EXPAND MULTI-TRACK LANES ]" })
            ] }) : /* @__PURE__ */ s.jsx(
              vy,
              {
                masterActiveClips: ue,
                stations: t,
                vpStartEpoch: T,
                viewportDurationMs: r,
                timeMode: p,
                onExpand: ne
              }
            )
          }
        )
      ]
    }
  );
}
function ky({
  canvasLayoutTimeline: e,
  activeKfIndex: t = 0,
  onSelectKeyframe: n,
  onAddKeyframeAtEpoch: r,
  onDeleteKeyframe: l,
  onUpdateKeyframeEpoch: o,
  onUpdateKeyframeTransition: a,
  onUpdateKeyframeClockPosition: c,
  viewportStartMs: u = 0,
  viewportDurationMs: h = 36e5,
  baseEpochMs: y = 0,
  totalDurationMs: p = 36e5,
  playheadMs: f = 0,
  inPointMs: v = 0,
  outPointMs: b = 36e5,
  timeMode: E = "LOCAL"
}) {
  const D = i.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [k, m] = i.useState(null), [j, M] = i.useState(null), [S, C] = i.useState(!1), N = y + f, g = y + u, $ = g + h, w = i.useCallback((I) => {
    if (!D || I < 0 || I >= D.length) return;
    const R = D[I];
    R && (n && n(I, R.timestampEpochMs), M(I), C(!1));
  }, [D, n]);
  i.useEffect(() => {
    const I = (R) => {
      R.target.tagName === "INPUT" || R.target.tagName === "TEXTAREA" || R.target.isContentEditable || (R.key === "[" || R.altKey && R.key === "ArrowLeft" ? (R.preventDefault(), t > 0 && w(t - 1)) : (R.key === "]" || R.altKey && R.key === "ArrowRight") && (R.preventDefault(), t < D.length - 1 && w(t + 1)));
    };
    return window.addEventListener("keydown", I), () => window.removeEventListener("keydown", I);
  }, [t, D, w]), i.useEffect(() => {
    if (j === null) return;
    const I = (se) => {
      se.key === "Escape" && M(null);
    }, R = (se) => {
      !se.target.closest(".kf-inspector-popover") && !se.target.closest(".kf-marker-diamond") && !se.target.closest(".btn-row-settings") && M(null);
    };
    return window.addEventListener("keydown", I), window.addEventListener("mousedown", R), () => {
      window.removeEventListener("keydown", I), window.removeEventListener("mousedown", R);
    };
  }, [j]), i.useEffect(() => {
    if (!S) return;
    const I = (R) => {
      !R.target.closest(".kf-quick-jump-dropdown") && !R.target.closest(".kf-count-pill") && C(!1);
    };
    return window.addEventListener("mousedown", I), () => window.removeEventListener("mousedown", I);
  }, [S]);
  const _ = (I) => {
    const R = I.currentTarget.getBoundingClientRect(), se = I.clientX - R.left, ne = Math.max(0, Math.min(1, se / R.width)), re = Math.round(g + ne * h);
    r && r(re);
  }, G = (I, R, se) => {
    if (I.button !== 0) return;
    I.stopPropagation(), I.preventDefault();
    const ne = I.clientX, re = se.timestampEpochMs, P = se.id || `kf_${R}_${re}`, F = I.currentTarget.closest(".track-surface");
    if (!F) return;
    let T = !1;
    m({
      idx: R,
      kfId: P,
      startClientX: ne,
      initialEpoch: re,
      currentEpoch: re
    });
    const B = (we) => {
      const K = we.clientX - ne;
      Math.abs(K) > 3 && (T = !0);
      const z = F.getBoundingClientRect(), V = K / z.width * h;
      let ge = Math.round(re + V);
      ge = Math.max(y, Math.min(y + p, ge));
      const ye = y + v, ve = y + b, Oe = 14 / z.width * h;
      Math.abs(ge - N) <= Oe ? ge = N : Math.abs(ge - ye) <= Oe ? ge = ye : Math.abs(ge - ve) <= Oe && (ge = ve), m((xe) => xe ? { ...xe, currentEpoch: ge } : null);
    }, U = (we) => {
      window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", U), m(null);
      const K = F.getBoundingClientRect(), V = (we.clientX - ne) / K.width * h;
      let ge = Math.round(re + V);
      ge = Math.max(y, Math.min(y + p, ge));
      const ye = y + v, ve = y + b, Oe = 14 / K.width * h;
      Math.abs(ge - N) <= Oe ? ge = N : Math.abs(ge - ye) <= Oe ? ge = ye : Math.abs(ge - ve) <= Oe && (ge = ve), T ? (o && o(P, ge), n && n(R, ge)) : (n && n(R, re), M((xe) => xe === R ? null : R));
    };
    window.addEventListener("mousemove", B), window.addEventListener("mouseup", U);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `canvas-keyframe-track-row ${j !== null || S ? "has-active-popover" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("div", { className: "kf-nav-cluster", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-kf-nav btn-prev-kf",
            disabled: t <= 0,
            onClick: (I) => {
              I.stopPropagation(), w(t - 1);
            },
            title: "Jump to Previous Keyframe ([ or Alt+Left)",
            children: "◀"
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `kf-count-pill ${S ? "is-active" : ""}`,
            onClick: (I) => {
              I.stopPropagation(), C((R) => !R);
            },
            title: "Keyframe Navigator: Click to inspect and jump across keyframes",
            children: [
              /* @__PURE__ */ s.jsx("span", { children: D.length > 0 ? `KF ${t + 1}/${D.length}` : "0 KF" }),
              /* @__PURE__ */ s.jsx("span", { className: "pill-caret", children: "▾" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-kf-nav btn-next-kf",
            disabled: t >= D.length - 1,
            onClick: (I) => {
              I.stopPropagation(), w(t + 1);
            },
            title: "Jump to Next Keyframe (] or Alt+Right)",
            children: "▶"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (I) => {
            I.stopPropagation(), r && r(N);
          },
          title: "Add layout keyframe at playhead position (+ / K)",
          children: "+ KF"
        }
      ),
      S && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "kf-quick-jump-dropdown",
          onClick: (I) => I.stopPropagation(),
          onMouseDown: (I) => I.stopPropagation(),
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "dropdown-header", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "dropdown-title", children: [
                "KEYFRAME NAVIGATOR (",
                D.length,
                ")"
              ] }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-close-dropdown",
                  onClick: () => C(!1),
                  title: "Close",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "dropdown-list", children: D.map((I, R) => {
              var U, we, K;
              const se = R === t, ne = Mt(I.timestampEpochMs, E, { includeSeconds: !0 }), re = Math.max(0, (I.timestampEpochMs - y) / 1e3).toFixed(1), P = I.utcClockPosition || ((U = I.layout) == null ? void 0 : U.utcClockPosition) || "top-right", F = uu(P), T = ((K = (we = I.layout) == null ? void 0 : we.placements) == null ? void 0 : K.length) || 0, B = R === 0 ? "Root" : `${I.transitionType || "smooth"} (${I.transitionDurationSec ?? 0.5}s)`;
              return /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `kf-jump-row ${se ? "is-active" : ""}`,
                  onClick: () => w(R),
                  title: `Seek to Keyframe #${R + 1} at ${ne}`,
                  children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-idx", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "diamond-mini", children: "❖" }),
                      /* @__PURE__ */ s.jsxs("span", { className: "idx-num", children: [
                        "#",
                        R + 1
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-time", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "time-val", children: ne }),
                      /* @__PURE__ */ s.jsxs("span", { className: "offset-val", children: [
                        "+",
                        re,
                        "s"
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-meta", children: [
                      /* @__PURE__ */ s.jsxs("span", { className: "meta-badge clock-badge", title: "UTC Clock Position", children: [
                        "⏱️ ",
                        F
                      ] }),
                      /* @__PURE__ */ s.jsx("span", { className: "meta-badge trans-badge", title: "Transition", children: B }),
                      /* @__PURE__ */ s.jsxs("span", { className: "meta-badge feeds-badge", title: "Feeds on canvas", children: [
                        "🖥️ ",
                        T
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx("div", { className: "row-col-action", children: /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-row-settings",
                        onClick: (z) => {
                          z.stopPropagation(), w(R);
                        },
                        title: "View & Edit Keyframe Settings",
                        children: "⚙"
                      }
                    ) })
                  ]
                },
                I.id || R
              );
            }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "track-surface",
        onClick: _,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          D.map((I, R) => {
            var ve, Oe, xe, Ee, tt, nt, zt, jt, St;
            const se = (k == null ? void 0 : k.idx) === R, ne = se ? k.currentEpoch : I.timestampEpochMs;
            if (ne < g - 5e4 || ne > $ + 5e4) return null;
            const re = (ne - g) / h * 100;
            if (re < -2 || re > 102) return null;
            const P = R === t, F = j === R && !se, T = re < 15, B = re > 85, U = T ? "align-left" : B ? "align-right" : "align-center", we = Mt(ne, E, { includeSeconds: !0 }), K = `${I.transitionType || "smooth"} (${I.transitionDurationSec ?? 0.5}s)`, z = Math.max(0, (ne - y) / 1e3).toFixed(1), V = I.utcClockPosition || ((ve = I.layout) == null ? void 0 : ve.utcClockPosition) || "top-right", ge = uu(V), ye = ((xe = (Oe = I.layout) == null ? void 0 : Oe.placements) == null ? void 0 : xe.length) || 0;
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${P ? "is-active" : ""} ${se ? "is-dragging" : ""} ${F ? "has-active-popover" : ""}`,
                style: { left: `${re}%` },
                onMouseDown: (H) => G(H, R, I),
                onContextMenu: (H) => {
                  H.preventDefault(), H.stopPropagation(), D.length > 1 && l && l(R);
                },
                title: `Keyframe #${R + 1} at ${we} (+${z}s) • ${K} • Clock: ${ge} • Feeds: ${ye}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  se && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: we }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      z,
                      "s"
                    ] }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-clock-pos", children: [
                      "⏱️ ",
                      ge
                    ] })
                  ] }),
                  F && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `kf-inspector-popover ${U}`,
                      onClick: (H) => H.stopPropagation(),
                      onMouseDown: (H) => H.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-nav",
                              disabled: R <= 0,
                              onClick: (H) => {
                                H.stopPropagation(), w(R - 1);
                              },
                              title: "Jump to Previous Keyframe ([ or Alt+Left)",
                              children: "◀"
                            }
                          ),
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            R + 1,
                            " of ",
                            D.length
                          ] }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-nav",
                              disabled: R >= D.length - 1,
                              onClick: (H) => {
                                H.stopPropagation(), w(R + 1);
                              },
                              title: "Jump to Next Keyframe (] or Alt+Right)",
                              children: "▶"
                            }
                          ),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: we }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (H) => {
                                H.stopPropagation(), M(null);
                              },
                              title: "Close Settings (Esc)",
                              children: "✕"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          R > 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                              /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "INCOMING TRANSITION" }),
                              /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-trans-choice ${(I.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                    onClick: () => a == null ? void 0 : a(R, { transitionType: "smooth" }),
                                    title: "Smooth Bezier transition into keyframe layout",
                                    children: "⚡ Smooth"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-trans-choice ${I.transitionType === "linear" ? "is-active" : ""}`,
                                    onClick: () => a == null ? void 0 : a(R, { transitionType: "linear" }),
                                    title: "Linear transition into keyframe layout",
                                    children: "↗ Linear"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-trans-choice ${I.transitionType === "cut" ? "is-active" : ""}`,
                                    onClick: () => a == null ? void 0 : a(R, { transitionType: "cut" }),
                                    title: "Instant cut into keyframe layout",
                                    children: "✂ Cut"
                                  }
                                )
                              ] })
                            ] }),
                            I.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                              /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION DURATION" }),
                              /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((H) => /* @__PURE__ */ s.jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-dur-choice ${(I.transitionDurationSec ?? 0.5) === H ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(R, { transitionDurationSec: H }),
                                  children: [
                                    H,
                                    "s"
                                  ]
                                },
                                H
                              )) })
                            ] })
                          ] }) : /* @__PURE__ */ s.jsxs("div", { className: "kf-root-notice-bar", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-root-tag", children: "ROOT KEYFRAME" }),
                            /* @__PURE__ */ s.jsx("span", { className: "kf-root-desc", children: "Base layout governing cut origin (t = 0)" })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-field-header-row", children: [
                              /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "UTC CLOCK POSITION" }),
                              /* @__PURE__ */ s.jsxs("span", { className: "kf-current-clock-badge", children: [
                                "⏱️ ",
                                ge
                              ] })
                            ] }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-clock-pos-buttons", children: [
                              { id: "top-left", label: "↖ Top-Left" },
                              { id: "top-right", label: "↗ Top-Right" },
                              { id: "bottom-left", label: "↙ Bottom-Left" },
                              { id: "bottom-right", label: "↘ Bottom-Right" }
                            ].map((H) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-clock-pos-choice ${V === H.id ? "is-active" : ""}`,
                                onClick: () => c == null ? void 0 : c(R, H.id),
                                title: `Set UTC Wall Clock to ${H.label}`,
                                children: H.label
                              },
                              H.id
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row kf-layout-summary-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "ACTIVE FEEDS & COMPOSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-layout-summary-box", children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "summary-header", children: [
                                /* @__PURE__ */ s.jsxs("span", { className: "summary-res", children: [
                                  "📺 ",
                                  ((Ee = I.layout) == null ? void 0 : Ee.width) || 1920,
                                  "×",
                                  ((tt = I.layout) == null ? void 0 : tt.height) || 1080
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "summary-count", children: [
                                  "🖥️ ",
                                  ((zt = (nt = I.layout) == null ? void 0 : nt.placements) == null ? void 0 : zt.length) || 0,
                                  " Screens"
                                ] })
                              ] }),
                              ((St = (jt = I.layout) == null ? void 0 : jt.placements) == null ? void 0 : St.length) > 0 ? /* @__PURE__ */ s.jsx("div", { className: "summary-feed-tags", children: I.layout.placements.map((H, Ae) => /* @__PURE__ */ s.jsx(
                                "span",
                                {
                                  className: "feed-tag",
                                  title: `${H.stationId} (${H.displayId || "mon-0"}) • Dim: ${H.width}×${H.height} • Pos: (${H.x}, ${H.y})`,
                                  children: H.label || `${H.stationId} (${H.displayId || "mon-0"})`
                                },
                                Ae
                              )) }) : /* @__PURE__ */ s.jsx("span", { className: "no-feeds-hint", children: "No feeds placed on canvas in this keyframe" })
                            ] })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-footer", children: [
                            !P && /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-kf-seek",
                                onClick: (H) => {
                                  H.stopPropagation(), w(R);
                                },
                                title: "Seek Playhead to this Keyframe",
                                children: "📍 Jump Playhead Here"
                              }
                            ),
                            R > 0 && /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-kf-delete",
                                onClick: (H) => {
                                  H.stopPropagation(), l && l(R), M(null);
                                },
                                title: "Delete this keyframe",
                                children: "🗑️ Delete Keyframe"
                              }
                            )
                          ] })
                        ] })
                      ]
                    }
                  )
                ]
              },
              `kf-${R}`
            );
          })
        ]
      }
    )
  ] });
}
function wy({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: c
}) {
  const u = ($) => !r || r <= 0 ? "0%" : `${($ - n) / r * 100}%`, h = (o - n) / r * 100, y = (a - n) / r * 100, p = (l - n) / r * 100, f = p >= -0.2 && p <= 100.2, v = Math.max(0, Math.min(100, p)), b = Math.max(0, h), E = Math.min(100, y), D = Math.max(0, E - b), k = ($) => (w) => {
    w.preventDefault(), w.stopPropagation(), typeof c == "function" && c($, w);
  }, m = h < 1.5, j = y > 98.5, M = h <= 0.2 && h >= -0.2, S = y >= 99.8 && y <= 100.2, C = p >= -0.2 && p < 3.5, N = p > 96.5 && p <= 100.2, g = i.useMemo(() => Mt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    D > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${b}%`, width: `${D}%` },
        onMouseDown: k("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${m ? "flipped" : ""} ${M ? "at-edge" : ""}`,
        style: { left: u(o) },
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
        className: `marker out-marker ${j ? "flipped" : ""} ${S ? "at-edge" : ""}`,
        style: { left: u(a) },
        onMouseDown: k("out"),
        title: "Drag OUT Point",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "handle-badge", children: "OUT" }),
          /* @__PURE__ */ s.jsx("div", { className: "marker-core-line" })
        ]
      }
    ),
    f && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "playhead-needle",
        style: { left: `${v}%` },
        onMouseDown: k("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${C ? "edge-left" : ""} ${N ? "edge-right" : ""}`, children: g }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const jy = pi.memo(wy);
function Cy({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = i.useRef(null);
  if (i.useEffect(() => {
    if (!e) return;
    const p = (f) => {
      f.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [e, l]), !e) return null;
  const a = 210, c = 150, u = Math.min(e.x, window.innerWidth - a - 12), h = Math.min(e.y, window.innerHeight - c - 12), y = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: h, left: u },
      onClick: (p) => p.stopPropagation(),
      onContextMenu: (p) => p.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "header-tag", children: "TIMELINE POSITION" }),
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: Mt(t + e.targetMs, n) })
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
  return Bs.createPortal(y, document.body);
}
function Ey({
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
    const c = l(r.estimatedFileSizeBytes), u = r.removedGlobalGapsCount > 0 ? ` • ${r.removedGlobalGapsCount} global gap(s) skipped` : "";
    return `Export Cut (Ctrl+E) • Est: ~${c}${u}`;
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
const Sy = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function by({
  stationIdsKey: e,
  inPointMs: t,
  outPointMs: n,
  baseEpochMs: r,
  onEstimateLoaded: l
}) {
  const [o, a] = i.useState(null), [c, u] = i.useState(!1), h = i.useRef(l);
  return i.useEffect(() => {
    h.current = l;
  }, [l]), i.useEffect(() => {
    if (!e || n <= t || !r) {
      a(null);
      return;
    }
    const y = new AbortController();
    u(!0);
    const p = setTimeout(async () => {
      try {
        const f = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, v = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(f),
          signal: y.signal
        });
        if (v.ok) {
          const b = await v.json();
          a(b), h.current && h.current(b);
        }
      } catch (f) {
        f.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", f);
      } finally {
        u(!1);
      }
    }, 350);
    return () => {
      clearTimeout(p), y.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: c, formatEstimateSize: Sy };
}
function My({
  viewportDurationMs: e,
  totalDurationMs: t,
  playheadMs: n,
  setPlayheadMs: r,
  inPointMs: l,
  setInPointMs: o,
  outPointMs: a,
  setOutPointMs: c,
  viewportStartMs: u,
  setViewportStartMs: h,
  getMsFromClientX: y,
  minimapRef: p
}) {
  const [f, v] = i.useState(null), [b, E] = i.useState(null), D = (k, m) => {
    v(k), E({
      target: k,
      startX: m.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: u
    });
  };
  return i.useEffect(() => {
    if (!f) return;
    const k = e * 0.015, m = (M) => {
      if (f === "minimap-viewport" && (p != null && p.current)) {
        const C = p.current.getBoundingClientRect(), g = Math.max(0, Math.min(M.clientX - C.left, C.width)) / C.width * t, $ = Math.max(0, Math.min(g - e / 2, t - e));
        h($);
        return;
      }
      const S = y(M.clientX);
      if (f === "playhead") {
        let C = S;
        Math.abs(C - l) <= k ? C = l : Math.abs(C - a) <= k && (C = a), r(Math.max(0, Math.min(t, C)));
      } else if (f === "in") {
        const C = a - 1e3;
        o(Math.max(0, Math.min(S, C)));
      } else if (f === "out") {
        const C = l + 1e3;
        c(Math.min(t, Math.max(S, C)));
      } else if (f === "range" && b) {
        const C = S - y(b.startX), N = b.initialOut - b.initialIn;
        let g = b.initialIn + C, $ = b.initialOut + C;
        g < 0 ? (g = 0, $ = N) : $ > t && ($ = t, g = t - N), o(g), c($);
      }
    }, j = () => {
      v(null), E(null);
    };
    return window.addEventListener("mousemove", m), window.addEventListener("mouseup", j), () => {
      window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", j);
    };
  }, [
    f,
    b,
    y,
    l,
    a,
    n,
    t,
    e,
    r,
    o,
    c,
    h,
    p
  ]), { draggingTarget: f, handleStartDrag: D };
}
const hr = 4, ml = 230, fo = 58;
function Sm({
  stations: e = [],
  activeStationId: t,
  onSelectActiveStation: n,
  onStationContextMenu: r,
  onDeselectStation: l,
  stationAutoDirectorMap: o = {},
  onToggleStationAutoDirector: a,
  baseEpochMs: c = 0,
  timeMode: u = "LOCAL",
  totalDurationMs: h = 36e5,
  zoomLevel: y = 1,
  onZoomChange: p,
  onZoomReset: f,
  playheadMs: v = 0,
  setPlayheadMs: b,
  inPointMs: E = 0,
  setInPointMs: D,
  outPointMs: k = 36e5,
  setOutPointMs: m,
  onExport: j,
  recordingSegments: M = {},
  movieBoundaries: S,
  viewportStartMs: C = 0,
  onViewportStartChange: N,
  onEstimateLoaded: g,
  onFitRange: $,
  onJumpViewportTo: w,
  keystrokeMode: _ = "BURN_IN",
  onChangeKeystrokeMode: G,
  keystrokes: I = [],
  showKeystrokes: R = !1,
  showRulerKeystrokes: se = !1,
  onToggleRulerKeystrokes: ne,
  _onSplitDirectorSegment: re,
  _onChangeDirectorSegmentDisplay: P,
  _onResetDirectorSegmentToAuto: F,
  audioRoutingPlan: T,
  onSplitAudioSegment: B,
  onChangeAudioSegmentStation: U,
  onChangeAudioSegmentGain: we,
  onFollowVisualFeed: K,
  isAutoFollowAudio: z,
  canvasLayoutTimeline: V,
  activeKfIndex: ge = 0,
  onSelectKeyframe: ye,
  onAddKeyframeAtEpoch: ve,
  onDeleteKeyframe: Oe,
  onUpdateKeyframeEpoch: xe,
  onUpdateKeyframeTransition: Ee,
  onUpdateKeyframeClockPosition: tt,
  onToggleDisplayOnCanvas: nt,
  onUpdateAudioPlan: zt
}) {
  var Ue, vt;
  const [jt, St] = i.useState(null), [H, Ae] = i.useState(0), [ze, ee] = i.useState(null), [ue, L] = i.useState(!0), Y = (he) => {
    var de, Ce, Be;
    return ((he == null ? void 0 : he.displays) || (he == null ? void 0 : he.Displays) || ((de = he == null ? void 0 : he.displayTopology) == null ? void 0 : de.displays) || ((Ce = he == null ? void 0 : he.DisplayTopology) == null ? void 0 : Ce.Displays) || ((Be = he == null ? void 0 : he.topology) == null ? void 0 : Be.displays) || []).length;
  }, [Z, q] = i.useState(() => {
    var he;
    return e.length === 1 && Y(e[0]) > 1 ? (he = e[0]) == null ? void 0 : he.id : null;
  });
  i.useEffect(() => {
    var he;
    if (e.length === 1 && !Z && ((he = e[0]) != null && he.id) && Y(e[0]) > 1)
      q(e[0].id);
    else if (Z) {
      const te = e.find((de) => de.id === Z);
      (!te || Y(te) <= 1) && q(null);
    }
  }, [e, Z]);
  const le = i.useRef(null), J = i.useRef(null), ie = h / Math.max(1, y), Fe = Math.ceil(e.length / hr) || 1, Je = i.useMemo(() => {
    const he = H * hr;
    return e.slice(he, he + hr);
  }, [e, H]);
  i.useEffect(() => {
    if (!t && !Z) return;
    const he = Z || t, te = e.findIndex((de) => de.id === he);
    if (te !== -1) {
      const de = Math.floor(te / hr);
      de !== H && Ae(de);
    }
  }, [t, Z, e, H]);
  const _e = ((Ue = V == null ? void 0 : V.keyframes) == null ? void 0 : Ue[ge]) || ((vt = V == null ? void 0 : V.keyframes) == null ? void 0 : vt[0]), pt = i.useMemo(() => {
    var he;
    return ((he = _e == null ? void 0 : _e.layout) == null ? void 0 : he.placements) || [];
  }, [_e]), st = i.useMemo(() => e.find((he) => he.id === t) || null, [e, t]), ct = (S == null ? void 0 : S.globalFirstMs) ?? null, Ze = (S == null ? void 0 : S.globalLastMs) ?? null, Gt = i.useMemo(() => (E > 500 || k < h - 500) && k - E >= 1e3, [E, k, h]), tn = i.useMemo(() => e.map((he) => he.id).sort().join(","), [e]), { estimateData: Tt, isEstimating: mt, formatEstimateSize: Rt } = by({
    stationIdsKey: tn,
    inPointMs: E,
    outPointMs: k,
    baseEpochMs: c,
    onEstimateLoaded: g
  }), at = i.useCallback((he) => {
    if (!le.current) return C;
    const te = le.current.getBoundingClientRect(), de = te.left + ml, Ce = te.width - ml - fo;
    if (Ce <= 0) return C;
    const Be = Math.max(0, Math.min(he - de, Ce));
    return Math.round(C + Be / Ce * ie);
  }, [C, ie]), { draggingTarget: gt, handleStartDrag: fn } = My({
    viewportDurationMs: ie,
    totalDurationMs: h,
    playheadMs: v,
    setPlayheadMs: b,
    inPointMs: E,
    setInPointMs: D,
    outPointMs: k,
    setOutPointMs: m,
    viewportStartMs: C,
    setViewportStartMs: N,
    getMsFromClientX: at,
    minimapRef: J
  }), It = i.useRef(y);
  It.current = y;
  const qt = i.useRef(C);
  qt.current = C;
  const Ut = i.useRef(h);
  Ut.current = h;
  const Ke = i.useRef(v);
  Ke.current = v, i.useEffect(() => {
    const he = le.current;
    if (!he) return;
    const te = (de) => {
      de.preventDefault(), de.stopPropagation();
      const Ce = de.ctrlKey || de.shiftKey, Be = It.current, et = qt.current, rt = Ut.current, Nt = Ke.current;
      if (Ce) {
        const it = Math.abs(de.deltaX) > Math.abs(de.deltaY) ? de.deltaX : de.deltaY;
        if (it === 0) return;
        const dt = rt / Math.max(1, Be), Kt = Math.max(0, rt - dt), _t = dt * 0.08 * (it > 0 ? 1 : -1);
        N == null || N(Math.max(0, Math.min(Kt, et + _t)));
      } else {
        if (de.deltaY === 0) return;
        const dt = de.deltaY < 0 ? 1.25 : 0.8, Kt = Math.max(32, rt / 2e3), _t = he.getBoundingClientRect(), Qt = _t.left + ml, Jt = _t.width - ml - fo;
        let xn = 0.5;
        if (Jt > 0)
          if (de.clientX >= Qt && de.clientX <= _t.right - fo)
            xn = Math.max(0, Math.min(1, (de.clientX - Qt) / Jt));
          else {
            const nn = rt / Math.max(1, Be), Ws = (Nt - et) / nn;
            xn = Ws >= 0 && Ws <= 1 ? Ws : 0.5;
          }
        const yn = Math.max(1, Math.min(Kt, Math.round(Be * dt * 100) / 100));
        if (yn === Be) return;
        const is = rt / Be, Jn = rt / yn, vs = et + xn * is - xn * Jn, cl = Math.max(0, rt - Jn);
        p == null || p(yn), N == null || N(Math.max(0, Math.min(cl, vs)));
      }
    };
    return he.addEventListener("wheel", te, { passive: !1, capture: !0 }), () => he.removeEventListener("wheel", te, { capture: !0 });
  }, [p, N]);
  const fe = e.length > 0 && Math.abs(k - E) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: le,
      className: "timeline-board-root",
      onContextMenu: (he) => {
        var de;
        he.preventDefault();
        const te = (de = le.current) == null ? void 0 : de.getBoundingClientRect();
        !te || he.clientX - te.left < ml || he.clientX > te.right - fo || ee({ x: he.clientX, y: he.clientY, targetMs: Math.max(0, Math.min(h, at(he.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            ay,
            {
              baseEpochMs: c,
              timeMode: u,
              totalDurationMs: h,
              inPointMs: E,
              setInPointMs: D,
              outPointMs: k,
              setOutPointMs: m
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                iy,
                {
                  minimapRef: J,
                  baseEpochMs: c,
                  timeMode: u,
                  totalDurationMs: h,
                  viewportStartMs: C,
                  viewportDurationMs: ie,
                  zoomLevel: y,
                  inPointMs: E,
                  outPointMs: k,
                  playheadMs: v,
                  onStartDragMinimap: fn
                }
              ),
              /* @__PURE__ */ s.jsx(
                cy,
                {
                  earliestMediaMs: ct,
                  latestMediaMs: Ze,
                  hasActiveCut: Gt,
                  onJumpToFirst: () => {
                    ct !== null && (b == null || b(ct), w == null || w(ct, "start"));
                  },
                  onJumpToLast: () => {
                    Ze !== null && (b == null || b(Ze), w == null || w(Ze, "end"));
                  },
                  onContextualFit: () => {
                    Gt ? $ == null || $(E, k) : ct !== null && Ze !== null && Ze > ct ? $ == null || $(ct, Ze) : f == null || f();
                  },
                  onResetZoom: f,
                  baseEpochMs: c,
                  timeMode: u,
                  keystrokeMode: _,
                  onChangeKeystrokeMode: G,
                  showRulerKeystrokes: se,
                  onToggleRulerKeystrokes: ne
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              oy,
              {
                baseEpochMs: c,
                timeMode: u,
                viewportStartMs: C,
                viewportDurationMs: ie,
                totalDurationMs: h,
                hoverMs: jt,
                onHoverChange: St,
                onSeek: (he) => b == null ? void 0 : b(he),
                inPointMs: E,
                outPointMs: k,
                earliestMediaMs: ct,
                movieBoundaries: S,
                stationHostname: (st == null ? void 0 : st.hostname) || (st == null ? void 0 : st.id) || (st == null ? void 0 : st.name),
                activeStationName: (st == null ? void 0 : st.displayName) || (st == null ? void 0 : st.hostname) || (st == null ? void 0 : st.name),
                stations: e,
                showKeystrokes: !!(se ?? R),
                keystrokes: I,
                recordingSegments: M
              }
            ) })
          ] })
        ] }),
        Fe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: H === 0,
              onClick: () => Ae((he) => Math.max(0, he - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            H * hr + 1,
            "–",
            Math.min(e.length, (H + 1) * hr),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: H >= Fe - 1,
              onClick: () => Ae((he) => Math.min(Fe - 1, he + 1)),
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
            onMouseMove: (he) => {
              if (gt || !le.current) return;
              const te = le.current.getBoundingClientRect();
              he.clientX >= te.left + ml && he.clientX <= te.right - fo ? St(at(he.clientX)) : St(null);
            },
            onMouseLeave: () => !gt && St(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => L((he) => !he), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: ue ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  ue && Fe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: H === 0,
                        onClick: (he) => {
                          he.stopPropagation(), Ae((te) => Math.max(0, te - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      H + 1,
                      "/",
                      Fe,
                      " (",
                      H * hr + 1,
                      "–",
                      Math.min(e.length, (H + 1) * hr),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: H >= Fe - 1,
                        onClick: (he) => {
                          he.stopPropagation(), Ae((te) => Math.min(Fe - 1, te + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !ue && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => L(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (pt == null ? void 0 : pt.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var Be, et, rt, Nt, it;
                    const he = (pt == null ? void 0 : pt.find((dt) => dt.isPrimary || dt.isFocused)) || (pt == null ? void 0 : pt[0]), te = (he == null ? void 0 : he.stationId) || ((Be = e[0]) == null ? void 0 : Be.hostname) || ((et = e[0]) == null ? void 0 : et.id), de = (he == null ? void 0 : he.displayId) || "mon-0";
                    let Ce = [];
                    if (pt && pt.length > 0) {
                      const dt = /* @__PURE__ */ new Map();
                      pt.forEach((Kt) => {
                        var Qt;
                        (M[Kt.stationId] || M[(Qt = Kt.stationId) == null ? void 0 : Qt.toLowerCase()] || []).forEach((Jt) => {
                          const xn = `${Jt.startEpochMs || Jt.start}_${Jt.endEpochMs || Jt.end}`;
                          dt.has(xn) || dt.set(xn, Jt);
                        });
                      }), Ce = Array.from(dt.values());
                    }
                    return Ce.length === 0 && (Ce = M[(rt = e[0]) == null ? void 0 : rt.id] || M[(Nt = e[0]) == null ? void 0 : Nt.hostname] || ((it = e[0]) == null ? void 0 : it.segments) || []), /* @__PURE__ */ s.jsx(
                      yu,
                      {
                        hostname: te,
                        displayId: de,
                        activeSegments: Ce,
                        viewportStartMs: C,
                        viewportDurationMs: ie,
                        baseEpochMs: c,
                        inPointMs: E,
                        outPointMs: k,
                        globalGaps: (Tt == null ? void 0 : Tt.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                ue && (e.length > 0 ? Je.map((he) => {
                  const te = !!(t && he.id === t), de = Z === he.id, Ce = o ? o[he.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    my,
                    {
                      station: he,
                      isExpanded: de && Y(he) > 1,
                      onToggleExpand: () => {
                        Y(he) > 1 && q((Be) => Be === he.id ? null : he.id);
                      },
                      isAutoDirectorEnabled: Ce,
                      onToggleAutoDirector: a,
                      canvasPlacements: pt,
                      onToggleDisplayOnCanvas: nt,
                      directorPlan: he.directorPlan,
                      isActive: te,
                      onSelect: () => n == null ? void 0 : n(he.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: C,
                      viewportDurationMs: ie,
                      inPointMs: E,
                      outPointMs: k,
                      baseEpochMs: c,
                      segments: M[he.id] || M[he.hostname] || he.segments || [],
                      recordingSegments: M,
                      globalGaps: (Tt == null ? void 0 : Tt.removedGlobalGaps) || []
                    },
                    he.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Ny,
                  {
                    audioPlan: T,
                    stations: e,
                    viewportStartMs: C,
                    viewportDurationMs: ie,
                    baseEpochMs: c,
                    playheadMs: v,
                    onSplitSegment: B,
                    onChangeSegmentStation: U,
                    onChangeSegmentGain: we,
                    onFollowVisualFeed: K,
                    isAutoFollow: z,
                    timeMode: u,
                    onUpdateAudioPlan: zt
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  ky,
                  {
                    canvasLayoutTimeline: V,
                    activeKfIndex: ge,
                    onSelectKeyframe: ye,
                    onAddKeyframeAtEpoch: ve,
                    onDeleteKeyframe: Oe,
                    onUpdateKeyframeEpoch: xe,
                    onUpdateKeyframeTransition: Ee,
                    onUpdateKeyframeClockPosition: tt,
                    viewportStartMs: C,
                    viewportDurationMs: ie,
                    baseEpochMs: c,
                    totalDurationMs: h,
                    playheadMs: v,
                    inPointMs: E,
                    outPointMs: k,
                    timeMode: u
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                Ey,
                {
                  isRangeValid: fe,
                  onExport: j,
                  isEstimating: mt,
                  estimateData: Tt,
                  formatEstimateSize: Rt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          jy,
          {
            baseEpochMs: c,
            timeMode: u,
            viewportStartMs: C,
            viewportDurationMs: ie,
            playheadMs: v,
            inPointMs: E,
            outPointMs: k,
            onStartDrag: fn
          }
        ),
        /* @__PURE__ */ s.jsx(
          Cy,
          {
            contextMenu: ze,
            baseEpochMs: c,
            timeMode: u,
            onAction: (he) => {
              ze && (he === "playhead" ? b == null || b(ze.targetMs) : he === "in" ? D == null || D(Math.max(0, Math.min(ze.targetMs, k - 1e3))) : he === "out" && (m == null || m(Math.min(h, Math.max(ze.targetMs, E + 1e3)))), ee(null));
            },
            onClose: () => ee(null)
          }
        )
      ]
    }
  );
}
function Iy({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
              const a = !o && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), c = !o && (r == null ? void 0 : r.coveragePct) >= 100 && !(r != null && r.hasGaps);
              let u, h;
              return o ? (u = "SCANNING...", h = "is-loading") : a ? (u = "NO RECORDINGS", h = "gap-warning") : c ? (u = "100% COVERAGE", h = "full-archived") : (u = r != null && r.hasGaps ? "GAPS DETECTED" : `${r == null ? void 0 : r.coveragePct}% COVERAGE`, h = "gap-warning"), /* @__PURE__ */ s.jsxs("span", { className: `status-indicator-badge ${h}`, children: [
                /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                u
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
          /* @__PURE__ */ s.jsx("div", { className: "card-gap-track-container", title: o ? "Scanning chunks..." : `Recorded: ${r.recordedDuration} (${r.coveragePct}%)`, children: o ? /* @__PURE__ */ s.jsx("div", { className: "track-loading-shimmer" }) : /* @__PURE__ */ s.jsx("div", { className: "card-gap-track", children: r.segments.map((a, c) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: `track-segment ${a.type === "rec" ? "rec" : "gap"}`,
              style: {
                left: `${a.startPct}%`,
                width: `${a.widthPct}%`
              }
            },
            c
          )) }) })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "card-bottom-action", children: /* @__PURE__ */ s.jsx("div", { className: `custom-checkbox-pill ${t ? "checked" : ""}`, children: t ? "✓ SELECTED" : "+ ADD TO WORKSPACE" }) })
      ]
    }
  );
}
function Ty({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-gaps-bar", children: /* @__PURE__ */ s.jsx("div", { className: "row-gap-track", title: o ? "Scanning segments..." : `Coverage: ${r.coveragePct}%`, children: o ? /* @__PURE__ */ s.jsx("div", { className: "row-loading-shimmer" }) : r.segments.map((a, c) => /* @__PURE__ */ s.jsx(
          "div",
          {
            className: `track-seg ${a.type === "rec" ? "rec" : "gap"}`,
            style: { left: `${a.startPct}%`, width: `${a.widthPct}%` }
          },
          c
        )) }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-specs", children: /* @__PURE__ */ s.jsx("span", { className: "specs-text", children: o ? "..." : `${r.resolution} • ${r.fps}fps` }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-size", children: /* @__PURE__ */ s.jsx("span", { className: "size-text", children: o ? "..." : r.fileSize }) })
      ]
    }
  );
}
function $y({ station: e, isSelected: t, onToggle: n, meta: r }) {
  var u, h;
  const l = e.displayName || e.hostname || e.name || "", o = r == null ? void 0 : r.isLoading, a = !o && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), c = o ? "loading" : a ? "critical" : ((u = r.trafficStatus) == null ? void 0 : u.level) || (r.hasGaps ? "critical" : "optimal");
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
      /* @__PURE__ */ s.jsx("div", { className: `status-dot ${c}`, title: o ? "Scanning..." : (h = r.trafficStatus) == null ? void 0 : h.label }),
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
      /* @__PURE__ */ s.jsx("span", { className: `coverage-pct ${c}`, children: o ? "..." : `${r.coveragePct}%` })
    ] })
  ] });
}
function Ay({
  searchTerm: e,
  onSearchChange: t,
  sortAlpha: n,
  onToggleSort: r,
  effectiveTabs: l,
  selectedTabId: o,
  onSelectTab: a,
  isLoadingTabs: c,
  allStations: u,
  selectedStationIds: h,
  filterMode: y,
  onFilterModeChange: p,
  filteredCount: f,
  selectedInTabCount: v,
  unselectedInTabCount: b,
  activeTabName: E,
  onSelectAllInScope: D,
  onClearInScope: k,
  viewMode: m = "grid",
  onViewModeChange: j,
  isDrawerMode: M = !1
}) {
  const [S, C] = i.useState(!1), N = y !== "all", g = !E || E.toLowerCase() === "all", $ = g ? "Select All" : `Select ${E}`, w = g ? "Clear All" : `Clear ${E}`;
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
            onChange: (_) => t(_.target.value)
          }
        )
      ] }),
      M && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${S ? "open" : ""} ${N ? "has-filter" : ""}`,
          onClick: () => C(!S),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            N && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !M && j && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${m === "grid" ? "active" : ""}`,
            onClick: () => j("grid"),
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
            className: `btn-view-mode ${m === "table" ? "active" : ""}`,
            onClick: () => j("table"),
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
          onChange: (_) => a(_.target.value),
          children: l.map((_) => {
            const G = _.id === "all" ? u.map((R) => R.id) : _.stationIds || [], I = G.filter((R) => h.includes(R)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: _.id, children: [
              _.name,
              " (",
              I,
              "/",
              G.length,
              ")"
            ] }, _.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: D, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: k, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        c && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((_) => {
        const G = o === _.id, I = _.id === "all" ? u.map((ne) => ne.id) : _.stationIds || [], R = I.length, se = I.filter((ne) => h.includes(ne)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${G ? "active" : ""}`,
            onClick: () => a(_.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: _.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${se > 0 ? "has-selected" : ""}`, children: [
                se,
                "/",
                R
              ] })
            ]
          },
          _.id
        );
      }) })
    ] })),
    (!M || S) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${M ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "all" ? "active" : ""}`,
            onClick: () => p("all"),
            children: [
              "All (",
              f,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "selected" ? "active" : ""}`,
            onClick: () => p("selected"),
            children: [
              "Sel (",
              v,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "unselected" ? "active" : ""}`,
            onClick: () => p("unselected"),
            children: [
              "Unsel (",
              b,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "gaps" ? "active" : ""}`,
            onClick: () => p("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "audio" ? "active" : ""}`,
            onClick: () => p("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !M && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: D, children: [
          "+ ",
          $
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: k, children: [
          "✕ ",
          w
        ] })
      ] })
    ] })
  ] });
}
function Ry({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: a = "table"
}) {
  if (r === 0) return null;
  const c = Math.min((e - 1) * n + 1, r), u = Math.min(e * n, r), h = a === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], y = t <= 1, p = (f) => {
    if (f === n) return !0;
    const v = Math.min(n, r), b = Math.min(f, r), E = Math.ceil(r / n), D = Math.ceil(r / f);
    return v !== b || E !== D;
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `hub-pagination-bar ${y ? "is-single-page-mode" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "pagination-range-info", children: [
      /* @__PURE__ */ s.jsx("span", { children: "SHOWING" }),
      /* @__PURE__ */ s.jsxs("strong", { className: "accent-num", children: [
        c,
        "-",
        u
      ] }),
      /* @__PURE__ */ s.jsx("span", { children: "OF" }),
      /* @__PURE__ */ s.jsx("strong", { className: "total-num", children: r }),
      /* @__PURE__ */ s.jsx("span", { children: "STATIONS" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: `pagination-controls ${y ? "controls-disabled-compact" : ""}`, children: [
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: h.map((f) => {
        const v = n === f, b = !p(f);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${v ? "active" : ""} ${b ? "redundant-disabled" : ""}`,
            disabled: b,
            onClick: () => o(f),
            title: b ? `All stations already fit on screen (Total: ${r})` : `Show ${f} per page`,
            children: f
          },
          f
        );
      }) })
    ] })
  ] });
}
function Ly({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, a] = i.useState(!1), c = i.useRef(null);
  i.useEffect(() => {
    const f = (v) => {
      c.current && !c.current.contains(v.target) && a(!1);
    };
    return o && document.addEventListener("mousedown", f), () => document.removeEventListener("mousedown", f);
  }, [o]);
  const u = i.useMemo(() => {
    const f = new Map(t.map((v) => [v.id, v]));
    return e.map((v) => f.get(v) || { id: v, hostname: `Station ${v}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const h = u.slice(0, l), y = u.slice(l), p = y.length > 0;
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
      h.map((f) => {
        const v = f.displayName || f.hostname || f.name || f.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: v, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: v }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (b) => {
                b.stopPropagation(), n(f.id);
              },
              title: `Remove ${v}`,
              children: "✕"
            }
          )
        ] }, f.id);
      }),
      p && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-container", ref: c, children: [
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
                y.length,
                " MORE"
              ] }),
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "18 15 12 9 6 15" }) })
            ]
          }
        ),
        o && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-menu upward", children: [
          /* @__PURE__ */ s.jsx("div", { className: "popover-header", children: /* @__PURE__ */ s.jsxs("span", { children: [
            "ADDITIONAL WORKSTATIONS (",
            y.length,
            ")"
          ] }) }),
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: y.map((f) => {
            const v = f.displayName || f.hostname || f.name || f.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: v, children: v }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(f.id),
                  title: `Remove ${v}`,
                  children: "✕"
                }
              )
            ] }, f.id);
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
const bm = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Yh(e, t, n = bm) {
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
function Oy(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function Dy(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function Py(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = bm) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), c = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), u = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), h = (e == null ? void 0 : e.fps) || 30, y = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? Dy(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const N = Yh(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: a,
      audioChannels: c,
      resolution: u,
      fps: h,
      fileSize: y,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: N,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const p = l, f = l + o, v = [];
  for (const N of t) {
    const g = Math.max(N.startEpoch, p), $ = Math.min(N.endEpoch, f);
    $ > g && v.push({ startEpoch: g, endEpoch: $ });
  }
  v.sort((N, g) => N.startEpoch - g.endEpoch);
  const b = [];
  for (const N of v)
    if (b.length === 0)
      b.push({ ...N });
    else {
      const g = b[b.length - 1];
      N.startEpoch <= g.endEpoch + 1e3 ? g.endEpoch = Math.max(g.endEpoch, N.endEpoch) : b.push({ ...N });
    }
  let E = 0;
  for (const N of b)
    E += N.endEpoch - N.startEpoch;
  const D = o > 0 ? E / o * 100 : 0, k = D > 0 && D < 1 ? Number(D.toFixed(1)) : Math.min(100, Math.round(D)), m = [];
  let j = p, M = 0;
  for (const N of b) {
    if (N.startEpoch > j + 2e3) {
      const w = (N.startEpoch - j) / o * 100, _ = (j - p) / o * 100;
      m.push({
        type: "gap",
        startPct: Math.max(0, _),
        widthPct: Math.min(100, w)
      }), M++;
    }
    const g = (N.endEpoch - N.startEpoch) / o * 100, $ = (N.startEpoch - p) / o * 100;
    m.push({
      type: "rec",
      startPct: Math.max(0, $),
      widthPct: Math.min(100, g)
    }), j = N.endEpoch;
  }
  if (j < f - 2e3) {
    const N = (f - j) / o * 100, g = (j - p) / o * 100;
    m.push({
      type: "gap",
      startPct: Math.max(0, g),
      widthPct: Math.min(100, N)
    }), M++;
  }
  const S = M > 0 || k < 100, C = Yh(k, S, r);
  return {
    coveragePct: k,
    recordedDuration: Oy(E),
    totalRecordedMs: E,
    hasAudio: a,
    audioChannels: c,
    resolution: u,
    fps: h,
    fileSize: y,
    hasGaps: S,
    gapsCount: M,
    trafficStatus: C,
    segments: m.length > 0 ? m : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const _y = Object.freeze([]), By = 12;
function Wy({
  isOpen: e,
  onToggle: t,
  onClose: n,
  allStations: r = [],
  selectedStationIds: l = [],
  onToggleStation: o,
  onUpdateSelections: a,
  isInitialSetup: c,
  isLoadingStations: u = !1,
  isLoadingSegments: h = !1,
  onApply: y,
  onOpenRangeModal: p,
  systemTabs: f = _y,
  recordingSegments: v = {},
  baseEpochMs: b = 0,
  durationMs: E = 0
}) {
  const [D, k] = i.useState([]), [m, j] = i.useState("all"), [M, S] = i.useState(""), [C, N] = i.useState(!0), [g, $] = i.useState("all"), [w, _] = i.useState(null), [G, I] = i.useState(!1), [R, se] = i.useState(15), [ne, re] = i.useState(8), [P, F] = i.useState(1), T = i.useRef(!1), B = i.useRef(null), U = u && r.length === 0, we = r.length === 0 && !u;
  let K = "is-closed";
  c || we || U ? K = "is-full-width" : e && (K = "is-open"), i.useLayoutEffect(() => {
    const ee = () => {
      if (!B.current) return;
      const L = B.current.clientHeight;
      if (L <= 0) return;
      const Y = B.current.querySelector(".station-row, .hub-table-row"), Z = Y ? Y.offsetHeight : 40;
      if (Z > 0) {
        const le = Math.floor(L / Z) - 2, ie = [5, 10, 15, 20, 25, 30].filter((Fe) => Fe <= le).pop() || 5;
        se(ie);
      }
      const q = B.current.clientWidth;
      if (q > 0) {
        const ie = Math.max(1, Math.floor((q + 12) / 252)), Je = Math.max(1, Math.floor((L + 12) / (175 + 12))), _e = Math.max(ie * Je, ie);
        re(_e);
      }
    };
    ee(), window.addEventListener("resize", ee);
    const ue = new ResizeObserver(ee);
    return B.current && ue.observe(B.current), () => {
      window.removeEventListener("resize", ee), ue.disconnect();
    };
  }, [w, r.length]), i.useEffect(() => {
    if (f && f.length > 0) {
      k(f);
      return;
    }
    if (T.current || !e && !c) return;
    T.current = !0;
    let ee = !0;
    return (async () => {
      I(!0);
      try {
        const L = await fetch("/api/v1/dashboard/tabs");
        if (L.ok && ee) {
          const Y = await L.json();
          Array.isArray(Y) && k(Y);
        }
      } catch (L) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", L);
      } finally {
        ee && I(!1);
      }
    })(), () => {
      ee = !1;
    };
  }, [e, c, f]);
  const z = i.useMemo(() => {
    const ee = D.length > 0 ? D : f;
    if (ee && ee.length > 0) {
      const ue = ee.map((L) => {
        const Y = L.hostnames || L.assignedHostnames || L.stations || L.stationIds || [], Z = r.filter((q) => {
          const le = (q.hostname || q.name || "").trim().toLowerCase();
          return Y.some((J) => typeof J == "string" ? J.trim().toLowerCase() === le || le.includes(J.trim().toLowerCase()) : (J.hostname || J.name || "").trim().toLowerCase() === le);
        }).map((q) => q.id);
        return {
          id: String(L.id || L.tabId || L.name),
          name: L.name || "Tab",
          stationIds: Z
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((L) => L.id) },
        ...ue.filter((L) => L.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((ue) => ue.id) }];
  }, [D, f, r]), V = i.useMemo(() => z.find((ee) => ee.id === m) || z[0], [z, m]), ge = i.useMemo(() => !V || V.id === "all" ? r.map((ee) => ee.id) : V.stationIds || [], [V, r]), ye = i.useMemo(() => !v || Object.keys(v).length === 0 ? r.filter((ee) => ee.isLoaded || ee.segments && ee.segments.length > 0).length : r.filter((ee) => v[ee.id] !== void 0 || ee.isLoaded).length, [r, v]), ve = i.useMemo(() => !!(h || u && r.length > 0 || r.length > 0 && ye < r.length && Object.keys(v).length > 0), [h, u, r.length, ye, v]), Oe = i.useMemo(() => {
    const ee = /* @__PURE__ */ new Map(), ue = { baseEpochMs: b, durationMs: E };
    for (const L of r) {
      const Z = !(v && v[L.id] !== void 0 || L.isLoaded === !0 || L.segments && L.segments.length > 0) && (ve || u || h), q = v && v[L.id] || L.segments || [], le = Py(L, q, ue);
      ee.set(L.id, {
        ...le,
        hasAudio: L.hasAudio !== void 0 ? L.hasAudio : le == null ? void 0 : le.hasAudio,
        audioLabel: L.audioLabel || (L.hasAudio ? "AAC" : (le == null ? void 0 : le.audioLabel) || "NONE"),
        audioChannels: L.audioChannels ? L.audioChannels === 1 ? "Mono" : "Stereo" : le == null ? void 0 : le.audioChannels,
        feedSpec: L.feedSpec || (le == null ? void 0 : le.feedSpec) || `${L.resolution || "1080p"} • ${L.fps || 30}fps`,
        resolution: L.resolution || (le == null ? void 0 : le.resolution) || "1080p",
        fps: L.fps || (le == null ? void 0 : le.fps) || 30,
        isLoading: Z
      });
    }
    return ee;
  }, [r, v, b, E, ve, u, h]), xe = i.useMemo(() => r.filter((ee) => {
    const ue = Oe.get(ee.id), L = v && v[ee.id] && v[ee.id].length > 0 || ee.segments && ee.segments.length > 0, Y = ue && (ue.coveragePct > 0 || ue.totalRecordedMs > 0), Z = typeof ee.recordingsCount == "number" && ee.recordingsCount > 0;
    return ue && !ue.isLoading ? Y || L : Z || L;
  }), [r, Oe, v]), Ee = i.useMemo(() => xe.filter((ee) => {
    if (V.id !== "all" && !ge.includes(ee.id) || !(ee.displayName || ee.hostname || ee.name || "").toLowerCase().includes(M.toLowerCase())) return !1;
    const L = l.includes(ee.id), Y = Oe.get(ee.id);
    return g === "selected" ? L : g === "unselected" ? !L : g === "gaps" ? Y == null ? void 0 : Y.hasGaps : g === "audio" ? Y == null ? void 0 : Y.hasAudio : !0;
  }).sort((ee, ue) => C ? (ee.displayName || ee.hostname || "").localeCompare(ue.displayName || ue.hostname || "") : 0), [xe, V, ge, M, g, l, C, Oe]), tt = i.useMemo(() => w !== null ? w : Ee.length > By ? "table" : "grid", [w, Ee.length]), nt = tt === "table" ? R : ne, zt = Math.max(1, Math.ceil(Ee.length / nt));
  i.useEffect(() => {
    F(1);
  }, [m, M, g, tt]), i.useEffect(() => {
    P > zt && F(zt);
  }, [zt, P]);
  const jt = i.useMemo(() => {
    if (K !== "is-full-width") return Ee;
    const ee = (P - 1) * nt;
    return Ee.slice(ee, ee + nt);
  }, [Ee, P, nt, K]), St = () => {
    if (!a) return;
    const ee = V.id === "all" ? Ee.map((ue) => ue.id) : ge;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...ee])));
  }, H = () => {
    if (!a) return;
    const ee = new Set(
      V.id === "all" ? Ee.map((ue) => ue.id) : ge
    );
    a(l.filter((ue) => !ee.has(ue)));
  }, Ae = ge.filter((ee) => l.includes(ee)).length, ze = Ee.filter((ee) => l.includes(ee.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${K}`, children: [
    K !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => K === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            ve && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              ye,
              "/",
              r.length
            ] })
          ] })
        ] }),
        K === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      K === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: St,
            disabled: Ee.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                Ee.length,
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
            onClick: H,
            disabled: ze === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                ze,
                ")"
              ] })
            ]
          }
        )
      ] }),
      ve && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? ye / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: U ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : we ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: p, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: K === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      K === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      K === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${ve ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: ve ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: ve ? `ANALYZING TIMELINE ARCHIVES • ${ye} OF ${xe.length} STATIONS SYNCED (${xe.length > 0 ? Math.min(100, Math.round(ye / xe.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${xe.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: ve ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(ye / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Ay,
        {
          searchTerm: M,
          onSearchChange: S,
          sortAlpha: C,
          onToggleSort: () => N(!C),
          effectiveTabs: z,
          selectedTabId: m,
          onSelectTab: (ee) => {
            j(ee), _(null);
          },
          isLoadingTabs: G,
          allStations: xe,
          selectedStationIds: l,
          filterMode: g,
          onFilterModeChange: $,
          filteredCount: Ee.length,
          selectedInTabCount: Ae,
          unselectedInTabCount: ge.length - Ae,
          activeTabName: V.name,
          onSelectAllInScope: St,
          onClearInScope: H,
          viewMode: tt,
          onViewModeChange: K === "is-full-width" ? _ : null,
          isDrawerMode: K !== "is-full-width"
        }
      ),
      K === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: St,
              disabled: Ee.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  Ee.length,
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
              onClick: H,
              disabled: ze === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  ze,
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
      K === "is-full-width" && tt === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${K === "is-full-width" ? tt === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: jt.map((ee) => {
            const ue = l.includes(ee.id), L = Oe.get(ee.id);
            return K === "is-full-width" ? tt === "grid" ? /* @__PURE__ */ s.jsx(
              Iy,
              {
                station: ee,
                isSelected: ue,
                onToggle: o,
                meta: L
              },
              ee.id
            ) : /* @__PURE__ */ s.jsx(
              Ty,
              {
                station: ee,
                isSelected: ue,
                onToggle: o,
                meta: L
              },
              ee.id
            ) : /* @__PURE__ */ s.jsx(
              $y,
              {
                station: ee,
                isSelected: ue,
                onToggle: o,
                meta: L
              },
              ee.id
            );
          })
        }
      ),
      K === "is-full-width" && /* @__PURE__ */ s.jsx(
        Ry,
        {
          currentPage: P,
          totalPages: zt,
          pageSize: nt,
          totalItems: Ee.length,
          onPageChange: F,
          onPageSizeChange: (ee) => {
            tt === "table" ? se(ee) : re(ee), F(1);
          },
          viewMode: tt
        }
      ),
      K === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Ly,
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
            onClick: y,
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
const Dn = (e) => String(e).padStart(2, "0"), Fy = [
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
], Uy = [
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
function Xh({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [a, c] = i.useState(e), [u, h] = i.useState(null), y = i.useRef(null), { h: p, m: f, s: v } = i.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const $ = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, $[0] || 0)),
      m: Math.min(59, Math.max(0, $[1] || 0)),
      s: Math.min(59, Math.max(0, $[2] || 0))
    };
  }, [e]), b = i.useMemo(() => p >= 12, [p]);
  i.useEffect(() => {
    c(e);
  }, [e]);
  const E = () => {
    const w = a.replace(/[^0-9:]/g, "").trim().split(":").filter((se) => se.length > 0);
    let _ = 0, G = 0, I = 0;
    w.length >= 1 && (_ = Math.min(23, Math.max(0, parseInt(w[0], 10) || 0))), w.length >= 2 && (G = Math.min(59, Math.max(0, parseInt(w[1], 10) || 0))), w.length >= 3 && l && (I = Math.min(59, Math.max(0, parseInt(w[2], 10) || 0)));
    const R = l ? `${Dn(_)}:${Dn(G)}:${Dn(I)}` : `${Dn(_)}:${Dn(G)}`;
    c(R), t && t(R, { h: _, m: G, s: I });
  }, D = ($) => {
    let w = p;
    $ === "AM" && p >= 12 ? w = p - 12 : $ === "PM" && p < 12 && (w = p + 12);
    const _ = l ? `${Dn(w)}:${Dn(f)}:${Dn(v)}` : `${Dn(w)}:${Dn(f)}`;
    c(_), t && t(_, { h: w, m: f, s: v });
  }, k = i.useCallback(($, w) => {
    if (!y.current) return null;
    const _ = y.current.getBoundingClientRect(), G = _.left + _.width / 2, I = _.top + _.height / 2, R = $.clientX - G, se = $.clientY - I;
    let ne = Math.atan2(se, R) * 180 / Math.PI + 90;
    if (ne < 0 && (ne += 360), w === "hours") {
      const re = Math.round(ne / 30) % 12;
      return b ? re === 0 ? 12 : re + 12 : re === 0 ? 0 : re;
    }
    return Math.round(ne / 6) % 60;
  }, [b]), m = i.useCallback(($, w) => {
    let _ = p, G = f, I = v;
    $ === "hours" ? _ = w : $ === "minutes" ? G = w : $ === "seconds" && (I = w);
    const R = l ? `${Dn(_)}:${Dn(G)}:${Dn(I)}` : `${Dn(_)}:${Dn(G)}`;
    c(R), t && t(R, { h: _, m: G, s: I });
  }, [p, f, v, l, t]), j = ($, w) => {
    w.preventDefault(), w.stopPropagation(), h($);
    const _ = k(w, $);
    _ !== null && m($, _);
  };
  i.useEffect(() => {
    if (!u) return;
    const $ = (_) => {
      const G = k(_, u);
      G !== null && m(u, G);
    }, w = () => {
      h(null);
    };
    return window.addEventListener("pointermove", $), window.addEventListener("pointerup", w), () => {
      window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", w);
    };
  }, [u, k, m]);
  const M = i.useMemo(() => p % 12 * 30, [p]), S = i.useMemo(() => f % 60 * 6, [f]), C = i.useMemo(() => v % 60 * 6, [v]), N = b ? Uy : Fy, g = i.useMemo(() => {
    const $ = [];
    for (let w = 0; w < 60; w++) {
      const _ = (w * 6 - 90) * (Math.PI / 180), G = w % 5 === 0, I = 104, R = G ? 93 : 98;
      $.push({
        index: w,
        x1: 110 + R * Math.cos(_),
        y1: 110 + R * Math.sin(_),
        x2: 110 + I * Math.cos(_),
        y2: 110 + I * Math.sin(_),
        isMajor: G
      });
    }
    return $;
  }, []);
  return /* @__PURE__ */ s.jsxs("div", { className: `tactical-24h-clock-picker ${r} ${o} ${u ? "is-dragging" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "clock-header-shelf", children: [
      /* @__PURE__ */ s.jsx("span", { className: "shelf-label", children: n }),
      /* @__PURE__ */ s.jsxs("div", { className: "shelf-controls-group", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "am-pm-toggle-pill", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${b ? "" : "active"}`,
              onClick: () => D("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${b ? "active" : ""}`,
              onClick: () => D("PM"),
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
            onChange: ($) => c($.target.value),
            onBlur: E,
            onKeyDown: ($) => {
              $.key === "Enter" && $.currentTarget.blur();
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
        ref: y,
        className: "clock-dial-svg",
        viewBox: "0 0 220 220",
        children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "105", className: "dial-background" }),
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "88", className: "dial-track-ring" }),
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: g.map(($) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: $.x1,
              y1: $.y1,
              x2: $.x2,
              y2: $.y2,
              className: `dial-tick ${$.isMajor ? "major" : "minor"}`
            },
            `tick-${$.index}`
          )) }),
          N.map(($) => {
            const w = ($.angle - 90) * (Math.PI / 180), _ = 76, G = 110 + _ * Math.cos(w), I = 110 + _ * Math.sin(w), R = p === $.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: G,
                y: I,
                className: `dial-num ${R ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: $.label
              },
              `dial-h-${$.val}`
            );
          }),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-hour ${u === "hours" ? "dragging" : ""}`,
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
                    onPointerDown: ($) => j("hours", $)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${u === "minutes" ? "dragging" : ""}`,
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
                    onPointerDown: ($) => j("minutes", $)
                  }
                )
              ]
            }
          ),
          l && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${u === "seconds" ? "dragging" : ""}`,
              transform: `rotate(${C} 110 110)`,
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
                    onPointerDown: ($) => j("seconds", $)
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
const Ca = 7 * 24 * 60 * 60 * 1e3, Zt = (e) => String(e).padStart(2, "0");
function Hy({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [c, u] = i.useState(""), [h, y] = i.useState(""), [p, f] = i.useState("00:00:00"), [v, b] = i.useState("00:00:00"), [E, D] = i.useState(() => /* @__PURE__ */ new Date()), [k, m] = i.useState(null), [j, M] = i.useState([]), [S, C] = i.useState(!1), [N, g] = i.useState(""), [$, w] = i.useState([]), _ = i.useMemo(() => new Set($), [$]), [G, I] = i.useState(1), [R, se] = i.useState(2), [ne, re] = i.useState(null);
  i.useEffect(() => {
    if (!e) return;
    let H = !0;
    return (async () => {
      try {
        const ze = await fetch(`/api/v1/extractor-advanced/recording-dates?timeMode=${o}`);
        if (ze.ok) {
          const ee = await ze.json();
          H && Array.isArray(ee) && w(ee);
        }
      } catch (ze) {
        console.warn("[MasterTimeRangeModal] Failed to fetch recording dates:", ze);
      }
    })(), () => {
      H = !1;
    };
  }, [e, o]);
  const P = i.useCallback(() => {
    try {
      const H = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (H) {
        const Ae = JSON.parse(H);
        Array.isArray(Ae) && M(Ae);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((H) => H.ok ? H.json() : null).then((H) => {
      Array.isArray(H) && H.length > 0 && M(H);
    }).catch(() => {
    });
  }, []);
  i.useEffect(() => {
    if (!e) return;
    P();
    let H = n == null ? void 0 : n.startEpochMs, Ae = n == null ? void 0 : n.endEpochMs;
    if (!H || isNaN(H))
      if (n != null && n.start) {
        const ue = String(n.start).trim();
        if (ue.includes("T")) {
          const [L, Y] = ue.split("T");
          H = Vr(L, Y.substring(0, 8), o);
        } else if (ue.includes(" ")) {
          const [L, Y] = ue.split(" ");
          H = Vr(L, Y.substring(0, 8), o);
        } else
          H = Date.now() - 24 * 3600 * 1e3;
      } else
        Ae = Date.now(), H = Ae - 24 * 3600 * 1e3;
    if (!Ae || isNaN(Ae))
      if (n != null && n.end) {
        const ue = String(n.end).trim();
        if (ue.includes("T")) {
          const [L, Y] = ue.split("T");
          Ae = Vr(L, Y.substring(0, 8), o);
        } else if (ue.includes(" ")) {
          const [L, Y] = ue.split(" ");
          Ae = Vr(L, Y.substring(0, 8), o);
        } else
          Ae = (H || Date.now()) + 24 * 3600 * 1e3;
      } else
        Ae = (H || Date.now()) + 24 * 3600 * 1e3;
    re(null);
    const ze = Jr(H, o), ee = Jr(Ae, o);
    u(`${ze.year}-${Zt(ze.month)}-${Zt(ze.day)}`), y(`${ee.year}-${Zt(ee.month)}-${Zt(ee.day)}`), f(`${Zt(ze.hour)}:${Zt(ze.minute)}:${Zt(ze.second)}`), b(`${Zt(ee.hour)}:${Zt(ee.minute)}:${Zt(ee.second)}`), D(new Date(Date.UTC(ze.year, ze.month - 1, 1)));
  }, [e, n, o, P]);
  const F = i.useCallback(() => {
    c && !h && y(c);
  }, [c, h]), T = h || c, B = i.useMemo(() => c ? `${c}T${p}` : "", [c, p]), U = i.useMemo(() => T ? `${T}T${v}` : "", [T, v]), we = i.useMemo(() => {
    const H = {};
    return j.forEach((Ae) => {
      const ze = Ae.startTime || Ae.start, ee = Ae.endTime || Ae.end || ze;
      if (!ze) return;
      const ue = String(ze).substring(0, 10), L = String(ee).substring(0, 10), [Y, Z, q] = ue.split("-").map(Number), [le, J, ie] = L.split("-").map(Number);
      if (isNaN(Y) || isNaN(Z) || isNaN(q) || isNaN(le) || isNaN(J) || isNaN(ie)) return;
      let Fe = new Date(Date.UTC(Y, Z - 1, q));
      const Je = new Date(Date.UTC(le, J - 1, ie));
      for (; Fe.getTime() <= Je.getTime(); ) {
        const _e = `${Fe.getUTCFullYear()}-${Zt(Fe.getUTCMonth() + 1)}-${Zt(Fe.getUTCDate())}`;
        H[_e] || (H[_e] = []), H[_e].push(Ae), Fe.setUTCDate(Fe.getUTCDate() + 1);
      }
    }), H;
  }, [j]), K = async (H, Ae) => {
    if (Ae && Ae.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ze = j.filter((ee) => (ee.id || ee.startTime) !== H);
    M(ze);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(ze)), localStorage.setItem("itb_bookmarks", JSON.stringify(ze)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: ze }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${H}`, { method: "DELETE" });
    } catch {
    }
  }, z = (H) => {
    const Ae = H.startTime || H.start, ze = H.endTime || H.end;
    if (!Ae || !ze) return;
    const ee = Ae.substring(0, 10), ue = Ae.includes("T") ? Ae.split("T")[1].substring(0, 8) : "00:00:00", L = ze.substring(0, 10), Y = ze.includes("T") ? ze.split("T")[1].substring(0, 8) : "23:59:59";
    u(ee), y(L), f(ue), b(Y);
    const [Z, q] = ee.split("-").map(Number);
    D(new Date(Date.UTC(Z, q - 1, 1))), C(!1);
  }, V = (H) => {
    l ? (l(H), t && t()) : z(H);
  }, ge = i.useMemo(() => {
    if (o === "UTC" || !B.includes("T")) return { isAmbiguous: !1 };
    const [H, Ae] = B.split("T");
    return di(H, Ae);
  }, [B, o]), ye = i.useMemo(() => {
    if (o === "UTC" || !U.includes("T")) return { isAmbiguous: !1 };
    const [H, Ae] = U.split("T");
    return di(H, Ae);
  }, [U, o]), ve = i.useMemo(() => {
    if (!c || !T) return null;
    const H = Vr(c, p, o, G), Ae = Vr(T, v, o, R);
    return H === null || Ae === null || isNaN(H) || isNaN(Ae) ? null : { startEpoch: H, endEpoch: Ae, durationMs: Ae - H };
  }, [c, p, T, v, o, G, R]), Oe = i.useMemo(() => !ve || ve.durationMs <= 0 ? [] : pm(ve.startEpoch, ve.endEpoch), [ve]), xe = i.useMemo(() => {
    if (!ve || ve.durationMs <= 0) return "0h";
    const H = ve.durationMs / (1e3 * 60 * 60);
    return H >= 24 ? `${(H / 24).toFixed(1)}d (${H.toFixed(0)}h)` : `${H.toFixed(1)}h`;
  }, [ve]), Ee = i.useMemo(() => {
    const H = E.getUTCFullYear(), Ae = E.getUTCMonth(), ze = new Date(Date.UTC(H, Ae, 1)).getUTCDay(), ee = new Date(Date.UTC(H, Ae + 1, 0)).getUTCDate(), ue = [];
    for (let L = 0; L < ze; L++) ue.push(null);
    for (let L = 1; L <= ee; L++) ue.push(`${H}-${Zt(Ae + 1)}-${Zt(L)}`);
    return ue;
  }, [E]), tt = (H) => {
    if (H) {
      if (re(null), !c || c && h)
        u(H), y("");
      else if (c && !h)
        if (H < c)
          u(H), y("");
        else {
          const Ae = (/* @__PURE__ */ new Date(c + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(H + "T00:00:00Z")).getTime() - Ae > Ca) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const ee = new Date(Ae + Ca);
            y(`${ee.getUTCFullYear()}-${Zt(ee.getUTCMonth() + 1)}-${Zt(ee.getUTCDate())}`);
          } else
            y(H);
        }
    }
  }, nt = (H, Ae) => {
    re(Ae);
    const ze = Date.now(), ee = ze - H, ue = Jr(ee, o), L = Jr(ze, o);
    u(`${ue.year}-${Zt(ue.month)}-${Zt(ue.day)}`), y(`${L.year}-${Zt(L.month)}-${Zt(L.day)}`), f(`${Zt(ue.hour)}:${Zt(ue.minute)}:${Zt(ue.second)}`), b(`${Zt(L.hour)}:${Zt(L.minute)}:${Zt(L.second)}`), D(new Date(Date.UTC(ue.year, ue.month - 1, 1)));
  }, zt = () => {
    if (F(), !ve || isNaN(ve.startEpoch) || isNaN(ve.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (ve.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (ve.durationMs > Ca) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: B,
      end: U,
      startEpochMs: ve.startEpoch,
      endEpochMs: ve.endEpoch,
      durationMs: ve.durationMs,
      timeMode: o
    }), t && t();
  }, jt = i.useMemo(() => {
    if (!N.trim()) return j;
    const H = N.toLowerCase();
    return j.filter(
      (Ae) => (Ae.title || Ae.name || "").toLowerCase().includes(H) || (Ae.startTime || "").includes(H)
    );
  }, [j, N]);
  if (!e) return null;
  const St = o === "UTC";
  return Bs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (H) => H.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${St ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: St ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${St ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${St ? "active" : ""}`,
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
                onClick: () => C(!S),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: j.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      Oe.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Oe.map((H) => `${H.description} (${H.labelBefore} ➔ ${H.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${ne === "7d" ? "active" : ""}`,
            onClick: () => nt(7 * 24 * 3600 * 1e3, "7d"),
            children: [
              "7d Week Max ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${ne === "3d" ? "active" : ""}`,
            onClick: () => nt(3 * 24 * 3600 * 1e3, "3d"),
            children: [
              "3d Block ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${ne === "24h" ? "active" : ""}`,
            onClick: () => nt(24 * 3600 * 1e3, "24h"),
            children: [
              "24h Day ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${ne === "8h" ? "active" : ""}`,
            onClick: () => nt(8 * 3600 * 1e3, "8h"),
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
                value: N,
                onChange: (H) => g(H.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            jt.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: jt.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : jt.map((H) => {
          var L;
          const Ae = H.id || H.startTime, ze = H.title || H.name || "Untitled Mission", ee = (H.startTime || "").replace("T", " "), ue = (H.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => z(H), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: ze }),
                H.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  H.cutStationName
                ] }),
                ((L = H.stationIds) == null ? void 0 : L.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  H.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                ee,
                " ➔ ",
                ue
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (Y) => {
                    Y.stopPropagation(), z(H);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (Y) => {
                    Y.stopPropagation(), V(H);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (Y) => K(Ae, Y),
                  children: "✕"
                }
              )
            ] })
          ] }, Ae);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: E.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((H) => new Date(Date.UTC(H.getUTCFullYear(), H.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((H) => new Date(Date.UTC(H.getUTCFullYear(), H.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Ee.map((H, Ae) => {
            if (!H) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${Ae}`);
            const ze = parseInt(H.split("-")[2], 10), ee = H === c, ue = H === (h || c), L = h || k, Y = c && L && H > c && H < L, Z = we[H], q = !!(Z && Z.length > 0), le = _.has(H);
            let J = "";
            return q && (J += `${Z.length} Bookmark(s) on this date`), le && (J += (J ? " • " : "") + "Recordings available"), /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${ee ? "start-edge" : ""} ${ue ? "end-edge" : ""} ${Y ? "in-range" : ""} ${q ? "has-bookmark" : ""} ${le ? "has-recordings" : ""}`,
                onClick: () => tt(H),
                onMouseEnter: () => !h && c && m(H),
                onMouseLeave: () => m(null),
                title: J || void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: ze }),
                  le && /* @__PURE__ */ s.jsx("span", { className: "cal-cell-recording-dot", "aria-label": "Recordings available" }),
                  q && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (ie) => {
                        ie.stopPropagation(), C(!0), g(H);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Z.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Z.length })
                      ]
                    }
                  )
                ]
              },
              H
            );
          }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "cal-indicators-legend", children: [
            /* @__PURE__ */ s.jsxs("span", { className: "legend-item recordings", children: [
              /* @__PURE__ */ s.jsx("span", { className: "legend-dot green" }),
              " Recordings"
            ] }),
            j.length > 0 && /* @__PURE__ */ s.jsxs("span", { className: "legend-item bookmarks", children: [
              /* @__PURE__ */ s.jsx("span", { className: "legend-icon amber", children: "🔖" }),
              " Bookmarks"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "range-status-footer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "point-chip start", children: [
              /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "FROM:" }),
              /* @__PURE__ */ s.jsx("strong", { children: c || "SELECT" })
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "arrow-sep", children: "➔" }),
            /* @__PURE__ */ s.jsxs("div", { className: "point-chip end", children: [
              /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "TO:" }),
              /* @__PURE__ */ s.jsx("strong", { children: h || c || "--" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: F, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Xh,
            {
              label: "START TIME (FROM)",
              value: p,
              onChange: (H) => {
                F(), f(H), re(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Xh,
            {
              label: "END TIME (TO)",
              value: v,
              onChange: (H) => {
                F(), b(H), re(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (ge.isAmbiguous || ye.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        ge.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
            ge.transition.labelBefore,
            " / ",
            ge.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: G === 1 ? "active" : "",
                onClick: () => I(1),
                children: [
                  "1st Occurrence (",
                  ge.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: G === 2 ? "active" : "",
                onClick: () => I(2),
                children: [
                  "2nd Occurrence (",
                  ge.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        ye.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            ye.transition.labelBefore,
            " / ",
            ye.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: R === 1 ? "active" : "",
                onClick: () => se(1),
                children: [
                  "1st Occurrence (",
                  ye.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: R === 2 ? "active" : "",
                onClick: () => se(2),
                children: [
                  "2nd Occurrence (",
                  ye.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: ve && ve.durationMs > Ca ? "#f43f5e" : "#22d3ee" }, children: xe }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Oe.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: zt, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Mm = "extractor_incident_bookmarks_fallback", zy = ["itb_studio_bookmarks", "itb_bookmarks", Mm];
function Ky({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, c] = i.useState([]), [u, h] = i.useState(""), [y, p] = i.useState(!1), [f, v] = i.useState(!1), [b, E] = i.useState(null), [D, k] = i.useState(""), m = i.useCallback((I) => {
    zy.forEach((R) => {
      try {
        localStorage.setItem(R, JSON.stringify(I));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: I }));
  }, []), j = i.useCallback(async () => {
    p(!0);
    try {
      const I = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (I.ok) {
        const R = await I.json(), se = Array.isArray(R) ? R : [];
        c(se), m(se);
        return;
      }
    } catch (I) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", I);
    } finally {
      p(!1);
    }
    try {
      const I = localStorage.getItem(Mm) || localStorage.getItem("itb_studio_bookmarks");
      I && c(JSON.parse(I));
    } catch {
    }
  }, [m]);
  if (i.useEffect(() => {
    e && j();
  }, [e, j]), !e) return null;
  const M = async () => {
    var K, z, V, ge, ye, ve;
    if (!u.trim() || f) return;
    const I = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((K = n == null ? void 0 : n.timeRange) != null && K.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), R = (n == null ? void 0 : n.inPointMs) ?? 0, se = (n == null ? void 0 : n.outPointMs) ?? (((z = n == null ? void 0 : n.timeRange) == null ? void 0 : z.durationMs) || 0), ne = (n == null ? void 0 : n.playheadMs) ?? R, re = I + R, P = I + se, F = I + ne, T = (n == null ? void 0 : n.selectedStationIds) || [], B = (n == null ? void 0 : n.selectedStationNames) || [], U = ((V = n == null ? void 0 : n.allStationIds) == null ? void 0 : V.length) > 0 ? n.allStationIds : T, we = {
      title: u.trim(),
      startTime: ((ge = n == null ? void 0 : n.timeRange) == null ? void 0 : ge.start) || "",
      endTime: ((ye = n == null ? void 0 : n.timeRange) == null ? void 0 : ye.end) || "",
      baseEpochMs: I,
      timelineBaseEpochMs: I,
      inPointMs: R,
      outPointMs: se,
      playheadMs: ne,
      inEpochMs: re,
      outEpochMs: P,
      playheadEpochMs: F,
      selectedStationIds: T,
      selectedStationNames: B,
      allStationIds: U,
      stationIds: T.length > 0 ? T : U,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    v(!0);
    try {
      const Oe = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(we)
      });
      if (Oe.ok) {
        const xe = await Oe.json(), tt = [{
          ...we,
          ...xe.bookmark || {},
          inEpochMs: re,
          outEpochMs: P,
          playheadEpochMs: F,
          selectedStationIds: T,
          selectedStationNames: B,
          allStationIds: U,
          id: ((ve = xe.bookmark) == null ? void 0 : ve.id) || xe.id || `bm_${Date.now()}`
        }, ...a];
        c(tt), m(tt), h("");
      } else
        throw new Error(`Server returned ${Oe.status}`);
    } catch (Oe) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Oe);
      const Ee = [{
        ...we,
        inEpochMs: re,
        outEpochMs: P,
        playheadEpochMs: F,
        selectedStationIds: T,
        selectedStationNames: B,
        allStationIds: U,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      c(Ee), m(Ee), h("");
    } finally {
      v(!1);
    }
  }, S = async (I, R) => {
    if (R.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const se = a.filter((ne) => (ne.id || ne.startTime) !== I);
    c(se), m(se);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${I}`, { method: "DELETE" });
    } catch (ne) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", ne);
    }
  }, C = (I, R) => {
    R.stopPropagation(), E(I.id || I.startTime), k(I.title || I.name || "");
  }, N = async (I, R) => {
    if (R && R.stopPropagation(), !D.trim()) return;
    const se = a.find((P) => (P.id || P.startTime) === I), ne = D.trim(), re = a.map(
      (P) => (P.id || P.startTime) === I ? { ...P, title: ne, name: ne } : P
    );
    c(re), m(re), E(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${I}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...se, title: ne })
      });
    } catch (P) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", P);
    }
  }, g = (I) => {
    I.stopPropagation(), E(null);
  }, $ = (I) => !I || isNaN(I) ? "--:--:--" : Mt(I, o), w = (I) => {
    const R = I.startTime || I.StartTime, se = I.endTime || I.EndTime;
    if (!R) return "--";
    const ne = String(R).replace("T", " ").substring(0, 19), re = se ? String(se).replace("T", " ").substring(0, 19) : ne;
    return `${ne} ➔ ${re}`;
  }, _ = (I) => {
    let R = I.inEpochMs || I.InEpochMs, se = I.outEpochMs || I.OutEpochMs;
    if (!R || !se) {
      const ne = I.timelineBaseEpochMs || I.baseEpochMs || (I.startTime ? new Date(String(I.startTime).replace(" ", "T")).getTime() : 0), re = I.inPointMs ?? I.InPointMs, P = I.outPointMs ?? I.OutPointMs;
      ne && typeof re == "number" && typeof P == "number" && (re > 0 || P > 0) && (R = ne + re, se = ne + P);
    }
    if (R && se && !isNaN(R) && !isNaN(se) && R > 0) {
      const ne = $(R), re = $(se), P = Math.max(0, se - R), F = Math.floor(P / 6e4), T = Math.floor(F / 60), B = F % 60, U = T > 0 ? `${T}h ${B}m` : `${F}m`;
      return { timeText: `${ne} ➔ ${re}`, duration: U };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, G = (I) => {
    const R = I.selectedStationNames || [], se = I.selectedStationIds || I.cutStationIds || I.stationIds || [];
    return R.length > 0 ? R.join(", ") : se.length > 0 ? se.join(", ") : I.cutStationName ? I.cutStationName : I.activeStationName ? I.activeStationName : "All Stations in Scope";
  };
  return Bs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "bookmarks-modal-overlay", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-modal-card", onClick: (I) => I.stopPropagation(), children: [
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
              value: u,
              onChange: (I) => h(I.target.value),
              onKeyDown: (I) => I.key === "Enter" && M(),
              disabled: f,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${u.trim() && !f ? "active" : ""}`,
            onClick: M,
            disabled: !u.trim() || f,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                /* @__PURE__ */ s.jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: f ? "SAVING..." : "SAVE SNAPSHOT" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-section-heading", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "heading-title-group", children: [
          /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
          /* @__PURE__ */ s.jsx("span", { children: "SAVED TIMELINE EVENTS" })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: y ? "SYNCING..." : `${a.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: a.length === 0 && !y ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : a.map((I) => {
        var F, T, B;
        const R = I.id || I.startTime, se = b === R, ne = _(I), re = G(I), P = ((F = I.allStationIds) == null ? void 0 : F.length) || ((T = I.selectedStationIds) == null ? void 0 : T.length) || ((B = I.stationIds) == null ? void 0 : B.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${se ? "is-editing" : ""}`,
            onClick: () => {
              se || (r && r(I), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                se ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (U) => U.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: D,
                      onChange: (U) => k(U.target.value),
                      onKeyDown: (U) => {
                        U.key === "Enter" && N(R, U), U.key === "Escape" && g(U);
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
                        onClick: (U) => N(R, U),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: g,
                        title: "Cancel (Esc)",
                        children: "✕"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ s.jsxs("div", { className: "bm-title-row", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "bm-title", children: I.title || I.name || "Untitled Event" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-time-tag", children: I.createdAt ? new Date(I.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
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
                    /* @__PURE__ */ s.jsx("strong", { children: w(I) })
                  ] }),
                  P > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    P,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: ne.timeText }),
                    ne.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      ne.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${re}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: re })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (U) => U.stopPropagation(), children: [
                !se && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (U) => C(I, U),
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
                    onClick: (U) => S(R, U),
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
          R
        );
      }) })
    ] }) }),
    document.body
  );
}
const Gh = {
  USER: "itb_auth_user",
  ROLES: "itb_auth_roles"
};
function Im() {
  try {
    if (typeof window > "u") return "Guest Operator";
    const e = sessionStorage.getItem(Gh.USER) || localStorage.getItem(Gh.USER);
    if (e) {
      const t = JSON.parse(e), n = (t == null ? void 0 : t.displayName) || (t == null ? void 0 : t.username);
      if (n && typeof n == "string" && n.trim())
        return n.trim();
    }
  } catch {
  }
  return "Guest Operator";
}
function Vy(e) {
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
function Yy(e, t) {
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
function Xy({
  station: e,
  baseEpochMs: t = 0,
  totalDurationMs: n = 36e5,
  playheadMs: r = 0,
  setPlayheadMs: l,
  isPlaying: o = !1,
  setIsPlaying: a,
  playbackSpeed: c = 1,
  _timeMode: u = "LOCAL",
  inPointMs: h = 0,
  outPointMs: y = 36e5,
  isLooping: p = !0,
  recordingSegments: f = {},
  globalGaps: v = [],
  showWatermark: b = !0,
  directorPlan: E,
  onOverrideDisplay: D,
  onResetOverride: k,
  viewMode: m,
  onViewModeChange: j,
  onOpenFullscreen: M,
  isPipSwapped: S,
  onPipSwapChange: C,
  className: N = ""
}) {
  const g = i.useRef(null), $ = i.useRef(null), w = i.useRef(null), _ = i.useRef(r), G = i.useRef(r), I = i.useRef(r), R = i.useRef(!1), se = i.useRef(null), ne = i.useRef(o), re = i.useRef(!1);
  _.current = r;
  const P = e == null ? void 0 : e.id, F = e && (e.hostname || e.name) || "", T = i.useMemo(() => {
    var Be, et, rt, Nt;
    const te = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Be = e == null ? void 0 : e.displayTopology) == null ? void 0 : Be.displays) || ((et = e == null ? void 0 : e.displayTopology) == null ? void 0 : et.Displays) || ((rt = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : rt.Displays) || ((Nt = e == null ? void 0 : e.topology) == null ? void 0 : Nt.displays) || [];
    if (!Array.isArray(te) || te.length === 0) return [];
    const de = te.length > 1 && te.every((it) => (it.X ?? it.x ?? 0) === 0 && (it.Y ?? it.y ?? 0) === 0);
    let Ce = 0;
    return te.map((it, dt) => {
      const Kt = it.Width || it.width || 1920, _t = it.Height || it.height || 1080, Qt = de ? Ce : it.X ?? it.x ?? dt * Kt, Jt = de ? 0 : it.Y ?? it.y ?? 0;
      de && (Ce += Kt);
      const xn = (it.displayId ?? it.DisplayId ?? `mon-${dt}`).toLowerCase(), yn = it.displayNumber ?? it.DisplayNumber ?? dt + 1, cs = (it.displayName || it.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${yn}`, vs = !!(it.isPrimary ?? it.IsPrimary ?? dt === 0);
      return {
        ...it,
        displayId: xn,
        DisplayId: xn,
        displayIndex: dt,
        displayNumber: yn,
        DisplayNumber: yn,
        displayName: cs,
        DisplayName: cs,
        isPrimary: vs,
        IsPrimary: vs,
        x: Qt,
        y: Jt,
        X: Qt,
        Y: Jt,
        width: Kt,
        height: _t,
        Width: Kt,
        Height: _t
      };
    });
  }, [e]), B = T.length > 1, [U, we] = i.useState(() => {
    if (!B) return "mon-0";
    try {
      const te = localStorage.getItem("itb_solo_viewmode");
      if (te) return te;
    } catch {
    }
    return "canvas";
  }), z = B ? m !== void 0 ? m : U : "mon-0", V = i.useCallback((te) => {
    const de = typeof te == "function" ? te(z) : te;
    we(de);
    try {
      localStorage.setItem("itb_solo_viewmode", de);
    } catch {
    }
    j && j(de);
  }, [z, j]), [ge, ye] = i.useState(!1), ve = S !== void 0 ? S : ge, Oe = i.useCallback((te) => {
    const de = typeof te == "function" ? te(ve) : te;
    ye(de), C && C(de);
  }, [ve, C]), xe = i.useMemo(() => {
    const te = E || (e == null ? void 0 : e.directorPlan);
    if (!te || !te.segments || te.segments.length === 0) return null;
    const de = t + r;
    return te.segments.find((Ce) => {
      const Be = Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, et = Ce.endEpochMs ?? Ce.EndEpochMs ?? 0;
      return de >= Be && de <= et;
    }) || te.segments[0];
  }, [E, e == null ? void 0 : e.directorPlan, t, r]), Ee = i.useMemo(() => {
    var te, de;
    if (!B) return "mon-0";
    if (z === "split" || z === "pip" || z === "canvas" || z === "all-displays") {
      const Ce = (((te = T[0]) == null ? void 0 : te.displayId) ?? "mon-0").toLowerCase(), Be = (((de = T[1]) == null ? void 0 : de.displayId) ?? "mon-1").toLowerCase();
      return ve ? Be : Ce;
    }
    return z !== "director" ? z.toLowerCase() : ((xe == null ? void 0 : xe.targetDisplayId) ?? (xe == null ? void 0 : xe.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [B, z, xe, T, ve]), tt = i.useMemo(() => {
    var de;
    if (!B) return null;
    const te = T.find((Ce) => (Ce.displayId ?? Ce.DisplayId ?? "").toLowerCase() !== Ee);
    return te ? (te.displayId ?? te.DisplayId).toLowerCase() : (((de = T[1]) == null ? void 0 : de.displayId) || "mon-1").toLowerCase();
  }, [B, T, Ee]), nt = i.useMemo(() => {
    const te = T.find((Ce) => (Ce.displayId ?? "").toLowerCase() === (Ee || "").toLowerCase());
    if (te) return te.displayName || `Screen ${te.displayNumber || 1}`;
    if (Ee === "mon-0" || Ee === "0") return "Screen 1";
    if (Ee === "mon-1" || Ee === "1") return "Screen 2";
    const de = (Ee || "").match(/\d+/);
    if (de) {
      const Ce = parseInt(de[0], 10);
      return `Screen ${(Ee || "").startsWith("mon-") ? Ce + 1 : Ce}`;
    }
    return (Ee || "Screen 1").toUpperCase();
  }, [T, Ee]), zt = i.useMemo(() => {
    const te = T.find((de) => (de.displayId ?? "").toLowerCase() === (tt || "").toLowerCase());
    return te ? te.displayName || `Screen ${te.displayNumber || 2}` : "Screen 2";
  }, [T, tt]), jt = i.useMemo(() => z !== "director" && z !== "split" && z !== "pip" && z !== "canvas" ? !0 : !!((xe == null ? void 0 : xe.isManualOverride) ?? (xe == null ? void 0 : xe.IsManualOverride)), [z, xe]), [St, H] = i.useState({}), Ae = i.useRef(null), [ze, ee] = i.useState({ width: 0, height: 0 }), ue = i.useMemo(() => Vy(T), [T]);
  i.useEffect(() => {
    if (!B || z !== "canvas" && z !== "all-displays" || o)
      return;
    const te = () => {
      const Ce = Ae.current;
      if (!Ce) return;
      const Be = 48, et = 72, rt = Math.max(100, Ce.clientWidth - Be), Nt = Math.max(100, Ce.clientHeight - et), it = ue.totalWidth || 1920, dt = ue.totalHeight || 1080, Kt = it / dt;
      let _t = rt, Qt = _t / Kt;
      Qt > Nt && (Qt = Nt, _t = Qt * Kt), ee({ width: Math.round(_t), height: Math.round(Qt) });
    };
    te();
    const de = new ResizeObserver(te);
    return Ae.current && de.observe(Ae.current), () => de.disconnect();
  }, [B, z, ue]);
  const L = i.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  i.useEffect(() => {
    if (!B || z !== "canvas" && z !== "all-displays")
      return;
    let te = !0;
    const de = new AbortController(), Ce = L;
    T.forEach((et, rt) => {
      const Nt = (et.displayId ?? et.DisplayId ?? `mon-${rt}`).toLowerCase(), it = Pn.get(F, Ce, Nt);
      it ? H((dt) => ({ ...dt, [Nt]: it })) : Pn.fetchFrame(F, Ce, de.signal, Nt).then((dt) => {
        te && dt && H((Kt) => ({ ...Kt, [Nt]: dt }));
      });
    });
    const Be = Pn.subscribe((et, rt, Nt, it) => {
      et === F && rt === Ce && it && te && H((dt) => ({ ...dt, [it.toLowerCase()]: Nt }));
    });
    return () => {
      te = !1, de.abort(), Be();
    };
  }, [B, z, T, F, L]);
  const Y = i.useRef(Ee), Z = i.useMemo(() => e ? f[e.id] || f[e.hostname] || e.segments || [] : [], [e, f]), q = t + r, le = i.useMemo(() => Z.length === 0 ? !0 : Z.some((te) => {
    const de = (te.startEpochMs ?? te.startEpoch ?? 0) - 2e3, Ce = (te.endEpochMs ?? te.endEpoch ?? 0) + 2e3;
    return q >= de && q <= Ce;
  }), [Z, q]), J = !le && Z.length > 0, [ie, Fe] = i.useState("A"), [Je, _e] = i.useState(""), [pt, st] = i.useState(""), [ct, Ze] = i.useState(""), [Gt, tn] = i.useState(null), [Tt, mt] = i.useState(!1), [Rt, at] = i.useState(!1), [gt, fn] = i.useState(() => {
    if (!F) return null;
    const te = Math.round(t + r);
    return Pn.get(F, te, Ee) || null;
  }), [It, qt] = i.useState(null), Ut = ie === "A" ? g : $, Ke = i.useCallback(() => {
    const te = Pl();
    g.current && (g.current.volume = te.volume, g.current.muted = ie !== "A" || te.isMuted, g.current.defaultPlaybackRate = c, g.current.playbackRate = c, ie === "A" && !te.isMuted && hi(g.current)), $.current && ($.current.volume = te.volume, $.current.muted = ie !== "B" || te.isMuted, $.current.defaultPlaybackRate = c, $.current.playbackRate = c, ie === "B" && !te.isMuted && hi($.current)), w.current && (w.current.muted = !0, w.current.defaultPlaybackRate = c, w.current.playbackRate = c);
  }, [ie, c]);
  i.useEffect(() => {
    const te = (de) => {
      de.detail && (g.current && (g.current.volume = de.detail.volume), $.current && ($.current.volume = de.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", te), () => window.removeEventListener("itb-audio-state-changed", te);
  }, []), i.useEffect(() => {
    g.current && (g.current.defaultPlaybackRate = c, g.current.playbackRate = c), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c), w.current && (w.current.defaultPlaybackRate = c, w.current.playbackRate = c);
  }, [c]), i.useEffect(() => {
    if (!P || !F) return;
    if (o) {
      ne.current = !0;
      return;
    }
    const te = ne.current;
    ne.current = o;
    let de = !0;
    const Ce = new AbortController(), Be = Math.round(t + r), et = Pn.get(F, Be, Ee);
    if (et) {
      fn(et);
      return;
    }
    const Nt = setTimeout(() => {
      de && Pn.fetchFrame(F, Be, Ce.signal, Ee).then((dt) => {
        de && dt && fn(dt);
      });
    }, te ? 25 : 35), it = Pn.subscribe((dt, Kt, _t, Qt) => {
      dt === F && Kt === Be && (!Qt || Qt === Ee) && de && fn(_t);
    });
    return () => {
      de = !1, clearTimeout(Nt), Ce.abort(), it();
    };
  }, [P, F, t, r, o, Tt, Ee]), i.useEffect(() => {
    if (!B || z !== "split" && z !== "pip" || !tt || o) {
      qt(null);
      return;
    }
    let te = !0;
    const de = new AbortController(), Ce = Math.round(t + r), Be = Pn.get(F, Ce, tt);
    if (Be) {
      qt(Be);
      return;
    }
    const et = setTimeout(() => {
      te && Pn.fetchFrame(F, Ce, de.signal, tt).then((Nt) => {
        te && Nt && qt(Nt);
      });
    }, 40), rt = Pn.subscribe((Nt, it, dt, Kt) => {
      Nt === F && it === Ce && (!Kt || Kt === tt) && te && qt(dt);
    });
    return () => {
      te = !1, clearTimeout(et), de.abort(), rt();
    };
  }, [B, z, tt, P, F, t, r]);
  const fe = i.useCallback((te, de = Ee) => {
    const Ce = Math.round(t), Be = Math.round(t + n), et = Math.min(Be, Math.max(Ce, Math.round(t + te)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(F)}&startEpoch=${Ce}&endEpoch=${Be}&seekEpoch=${et}&displayId=${encodeURIComponent(de)}&_t=${Date.now()}`;
  }, [t, n, F, Ee]);
  i.useEffect(() => {
    if (!(!P || !F))
      if (o && le) {
        const te = _.current;
        G.current = te, I.current = te, R.current = !1;
        const de = fe(te, Ee);
        mt(!1), at(!0), Fe("A"), _e(de), st(""), tn(null), Ze((z === "split" || z === "pip") && tt ? fe(te, tt) : "");
      } else o || (se.current && clearTimeout(se.current), R.current = !1, _e(""), st(""), Ze(""), tn(null), mt(!1), at(!1), g.current && g.current.pause(), $.current && $.current.pause(), w.current && w.current.pause());
  }, [o, P, F, le, fe, Ee, z, tt]), i.useEffect(() => {
    if (Y.current !== Ee && (Y.current = Ee, o && le)) {
      const te = _.current;
      G.current = te;
      const de = fe(te, Ee);
      mt(!1), at(!0), Fe("A"), _e(de), st("");
    }
  }, [Ee, o, le, fe]), i.useEffect(() => {
    if (!P || !F) return;
    const te = Math.abs(r - I.current);
    if (!o || te < 15) {
      I.current = r;
      return;
    }
    return R.current = !0, I.current = r, G.current = r, g.current && g.current.pause(), $.current && $.current.pause(), w.current && w.current.pause(), mt(!1), at(!0), se.current && clearTimeout(se.current), se.current = setTimeout(() => {
      if (!le) {
        _e(""), st(""), Ze(""), at(!1), R.current = !1;
        return;
      }
      const de = _.current, Ce = fe(de, Ee);
      Fe("A"), _e(Ce), st(""), tn(null), (z === "split" || z === "pip") && tt && Ze(fe(de, tt));
    }, 75), () => {
      se.current && clearTimeout(se.current);
    };
  }, [r, o, P, F, le, fe, Ee, z, tt]), i.useEffect(() => {
    if (!o || !Tt || Z.length === 0) return;
    const te = t + _.current, de = Z.map((Ce) => ({
      start: Ce.startEpochMs ?? Ce.startEpoch ?? 0,
      end: Ce.endEpochMs ?? Ce.endEpoch ?? 0
    })).filter((Ce) => Ce.start > te + 500).sort((Ce, Be) => Ce.start - Be.start)[0];
    if (de && (!Gt || Gt.start !== de.start)) {
      const Ce = de.start - t;
      if (Ce < y) {
        const Be = fe(Ce, Ee);
        tn({ start: de.start, ms: Ce }), ie === "A" ? st(Be) : _e(Be);
      }
    }
  }, [o, Tt, r, t, y, Z, Gt, ie, fe, Ee]);
  const Ue = i.useCallback(() => {
    if (Gt) {
      const te = ie === "A" ? "B" : "A", de = te === "A" ? g : $;
      Fe(te), G.current = Gt.ms, I.current = Gt.ms, tn(null), de.current && de.current.play().then(() => {
        Ke();
      }).catch(() => {
      });
    } else
      p ? l(h) : a(!1);
  }, [Gt, ie, Ke, p, h, l, a]), vt = i.useCallback(() => {
    const te = Ut.current;
    if (!te || R.current || !o || re.current) return;
    const de = te.currentTime * 1e3, Ce = Math.round(G.current + de);
    if (v && v.length > 0) {
      const Be = t + Ce, et = v.find((rt) => Be >= rt.startEpochMs && Be < rt.endEpochMs);
      if (et) {
        re.current = !0;
        const rt = Math.round(et.endEpochMs - t) + 10;
        l(rt), setTimeout(() => {
          re.current = !1;
        }, 150);
        return;
      }
    }
    if (Ce >= y) {
      p ? l(h) : (a(!1), l(y));
      return;
    }
    I.current = Ce, l(Ce);
  }, [Ut, o, t, v, y, p, h, l, a]), he = Rt && o && !J;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${z} ${N}`, children: [
    B && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (te) => te.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${z === "director" ? "active" : ""}`,
          onClick: () => V("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${z === "canvas" ? "active" : ""}`,
          onClick: () => V("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${z === "split" ? "active" : ""}`,
          onClick: () => V("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${z === "pip" ? "active" : ""}`,
          onClick: () => V("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      T.map((te, de) => {
        const Ce = (te.displayId ?? `mon-${de}`).toLowerCase(), Be = te.displayNumber ?? de + 1, et = te.displayName || `Screen ${Be}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${z === Ce ? "active" : ""}`,
            onClick: () => V(Ce),
            title: `Pin directly to ${et}`,
            children: [
              "🖥️ ",
              Be
            ]
          },
          Ce
        );
      }),
      z === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          T.map((te, de) => {
            const Ce = (te.displayId ?? `mon-${de}`).toLowerCase(), Be = te.displayNumber ?? de + 1, et = te.displayName || `Screen ${Be}`, rt = Ee === Ce;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${rt ? "active" : ""} ${jt && rt ? "is-override" : ""}`,
                onClick: () => {
                  D == null || D(P, t + r, Ce);
                },
                title: `Punch ${et} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Be
                  ] }),
                  rt && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: jt ? "✋" : "⚡" })
                ]
              },
              `punch-${Ce}`
            );
          }),
          jt && k && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                k == null || k(P, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    B && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${jt ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: z === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : z === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : z === "pip" ? `🪟 PiP MODE: ${nt.toUpperCase()} (HERO)` : `${jt ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${nt.toUpperCase()}` }),
      jt && z === "director" && k && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => k == null ? void 0 : k(P, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    Je && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: g,
        src: Je,
        className: "feed-video-element",
        style: {
          opacity: Tt && ie === "A" ? 1 : 0,
          zIndex: ie === "A" ? 3 : 1,
          pointerEvents: ie === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ie === "A",
        preload: "auto",
        muted: ie !== "A" || Pl().isMuted,
        onCanPlay: () => {
          Ke(), o && ie === "A" && g.current && g.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ie === "A" && (R.current = !1, mt(!0), at(!1), g.current && (g.current.defaultPlaybackRate = c, g.current.playbackRate = c));
        },
        onWaiting: () => {
          ie === "A" && at(!0);
        },
        onTimeUpdate: () => {
          var te;
          ie === "A" && (!Tt && ((te = g.current) == null ? void 0 : te.currentTime) > 0 && (R.current = !1, mt(!0), at(!1), g.current && (g.current.defaultPlaybackRate = c, g.current.playbackRate = c)), vt());
        },
        onError: () => {
          ie === "A" && (R.current = !1, at(!1), mt(!1));
        },
        onEnded: () => {
          ie === "A" && Ue();
        }
      }
    ),
    pt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: $,
        src: pt,
        className: "feed-video-element",
        style: {
          opacity: Tt && ie === "B" ? 1 : 0,
          zIndex: ie === "B" ? 3 : 1,
          pointerEvents: ie === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ie === "B",
        preload: "auto",
        muted: ie !== "B" || Pl().isMuted,
        onCanPlay: () => {
          Ke(), o && ie === "B" && $.current && $.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ie === "B" && (R.current = !1, mt(!0), at(!1), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c));
        },
        onWaiting: () => {
          ie === "B" && at(!0);
        },
        onTimeUpdate: () => {
          var te;
          ie === "B" && (!Tt && ((te = $.current) == null ? void 0 : te.currentTime) > 0 && (R.current = !1, mt(!0), at(!1), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c)), vt());
        },
        onError: () => {
          ie === "B" && (R.current = !1, at(!1), mt(!1));
        },
        onEnded: () => {
          ie === "B" && Ue();
        }
      }
    ),
    z !== "split" && z !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: Tt ? 0 : 2 },
        children: J ? /* @__PURE__ */ s.jsx(ym, { isPlaying: o }) : gt && gt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: gt,
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
    z === "split" && B && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        gt && gt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: gt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        It && It !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: It, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    z === "pip" && B && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (te) => {
          te.stopPropagation(), Oe((de) => !de);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              zt.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          It && It !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: It, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (z === "canvas" || z === "all-displays") && B && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: Ae, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: ze.width ? `${ze.width}px` : "92%",
            height: ze.height ? `${ze.height}px` : "auto",
            aspectRatio: `${ue.totalWidth} / ${ue.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: T.map((te, de) => {
            const Ce = Yy(te, ue), Be = (te.displayId ?? te.DisplayId ?? `mon-${de}`).toLowerCase(), et = St[Be] || (Be === Ee ? gt : null), rt = !!(te.isPrimary ?? te.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${rt ? "is-primary" : ""}`,
                style: {
                  left: `${Ce.leftPct}%`,
                  top: `${Ce.topPct}%`,
                  width: `${Ce.widthPct}%`,
                  height: `${Ce.heightPct}%`
                },
                onClick: (Nt) => {
                  Nt.stopPropagation(), M ? M(Be) : V(Be);
                },
                title: `Display ${de + 1} (${te.width || 1920}x${te.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      rt ? "★ " : "",
                      "🖥 ",
                      de + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: te.displayName || te.DisplayName || Be.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      te.width || 1920,
                      "x",
                      te.height || 1080
                    ] }),
                    M && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (Nt) => {
                          Nt.stopPropagation(), M(Be);
                        },
                        title: `Open Display ${de + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  et && et !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: et,
                      className: "canvas-frame-img",
                      alt: Be
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      te.displayName || Be.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Be
            );
          })
        }
      )
    ] }),
    he && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          F,
          " • ",
          Ee.toUpperCase()
        ] })
      ] })
    ] }) }),
    z === "director" && xe && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Ee.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        Mt(xe.startEpochMs ?? xe.StartEpochMs ?? 0, u, { includeSeconds: !0 }),
        " - ",
        Mt(xe.endEpochMs ?? xe.EndEpochMs ?? 0, u, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    B && z !== "canvas" && /* @__PURE__ */ s.jsx(
      vm,
      {
        displays: T,
        activeDisplayId: Ee,
        mode: jt ? "MANUAL" : "AUTO",
        activeTimeRange: xe ? `${Mt(xe.startEpochMs ?? xe.StartEpochMs ?? 0, u, { includeSeconds: !0 })} - ${Mt(xe.endEpochMs ?? xe.EndEpochMs ?? 0, u, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (te) => {
          D && D(P, t + r, te), V(te);
        }
      }
    ),
    b && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      F
    ] }) })
  ] });
}
const Gy = [
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
function Tm({ isOpen: e, onClose: t }) {
  return i.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? Bs.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Gy.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
        /* @__PURE__ */ s.jsx("h4", { className: "group-title", children: n.title }),
        /* @__PURE__ */ s.jsx("div", { className: "group-items-list", children: n.shortcuts.map((l, o) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-row", children: [
          /* @__PURE__ */ s.jsx("div", { className: "keys-cluster", children: l.keys.map((a, c) => a === "or" || a === "+" || a === "← / →" || a === "Z / Y" ? /* @__PURE__ */ s.jsx("span", { className: "key-separator", children: a }, c) : /* @__PURE__ */ s.jsx("kbd", { className: "tactical-kbd", children: a }, c)) }),
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
const Qh = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), a = r % 60, c = Math.floor(n % 1e3 / 1e3 * t), u = (h) => String(h).padStart(2, "0");
  return `${u(l)}:${u(o)}:${u(a)}.${u(c)}`;
};
function Qy({
  isOpen: e,
  station: t,
  initialDisplayId: n = null,
  allStations: r = [],
  onSelectStation: l,
  onClose: o,
  baseEpochMs: a = 0,
  timeMode: c = "LOCAL",
  totalDurationMs: u = 36e5,
  zoomLevel: h = 1,
  onZoomChange: y,
  onZoomReset: p,
  onFitRange: f,
  onJumpViewportTo: v,
  viewportStartMs: b = 0,
  onViewportStartChange: E,
  playheadMs: D = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: m,
  inPointMs: j = 0,
  setInPointMs: M,
  outPointMs: S = 36e5,
  setOutPointMs: C,
  recordingSegments: N = {},
  globalGaps: g = [],
  onExport: $,
  isPlaying: w,
  setIsPlaying: _,
  isLooping: G = !0,
  setIsLooping: I,
  playbackSpeed: R,
  setPlaybackSpeed: se,
  keystrokeMode: ne = "BURN_IN",
  onChangeKeystrokeMode: re,
  keystrokes: P = [],
  showRulerKeystrokes: F = !1,
  onToggleRulerKeystrokes: T,
  directorPlan: B,
  onOverrideDisplay: U,
  onSplitDirectorSegment: we,
  onChangeDirectorSegmentDisplay: K,
  onResetDirectorSegmentToAuto: z
}) {
  var It, qt, Ut;
  const [V, ge] = i.useState(!1), ye = w !== void 0 ? w : V, ve = i.useCallback((Ke) => {
    const fe = typeof Ke == "function" ? Ke(ye) : Ke;
    _ ? _(fe) : ge(fe), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: fe } }));
  }, [ye, _]), [Oe, xe] = i.useState(!0), Ee = G !== void 0 ? G : Oe, tt = I || xe, [nt, zt] = i.useState(1), jt = R !== void 0 ? R : nt, St = se || zt, [H, Ae] = i.useState(null), [ze, ee] = i.useState(!1), [ue, L] = i.useState(g), Y = ((It = t == null ? void 0 : t.displays) == null ? void 0 : It.length) > 1 || ((Ut = (qt = t == null ? void 0 : t.topology) == null ? void 0 : qt.displays) == null ? void 0 : Ut.length) > 1, [Z, q] = i.useState(() => {
    if (!Y) return "mon-0";
    if (n) return n;
    try {
      const Ke = localStorage.getItem("itb_spotlight_viewmode");
      if (Ke) return Ke;
    } catch {
    }
    return "canvas";
  }), le = i.useCallback((Ke) => {
    q((fe) => {
      const Ue = typeof Ke == "function" ? Ke(fe) : Ke;
      try {
        localStorage.setItem("itb_spotlight_viewmode", Ue);
      } catch {
      }
      return Ue;
    });
  }, []), [J, ie] = i.useState(!1);
  i.useEffect(() => {
    if (e) {
      if (!Y) {
        q("mon-0");
        return;
      }
      if (n)
        q(n);
      else
        try {
          const Ke = localStorage.getItem("itb_spotlight_viewmode");
          q(Ke || "canvas");
        } catch {
          q("canvas");
        }
    }
  }, [e, n, Y, t == null ? void 0 : t.id]);
  const Fe = i.useRef(null), Je = i.useRef(h);
  Je.current = h;
  const _e = i.useRef(b);
  _e.current = b;
  const pt = i.useRef(u);
  pt.current = u;
  const st = i.useRef(t && t.id);
  i.useEffect(() => {
    var Ke, fe, Ue;
    t && t.id && st.current !== t.id && (st.current = t.id, St(1), ((Ke = t.displays) == null ? void 0 : Ke.length) > 1 || ((Ue = (fe = t.topology) == null ? void 0 : fe.displays) == null ? void 0 : Ue.length) > 1 || le("mon-0"));
  }, [t, St]);
  const ct = i.useMemo(() => t ? [t] : [], [t]);
  i.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), i.useEffect(() => {
    if (!e) return;
    const Ke = Fe.current;
    if (!Ke || !y || !E) return;
    const fe = (Ue) => {
      Ue.preventDefault(), Ue.stopPropagation();
      const vt = Ue.ctrlKey || Ue.shiftKey, he = Je.current, te = _e.current, de = pt.current || 36e5;
      if (vt) {
        const Ce = Math.abs(Ue.deltaX) > Math.abs(Ue.deltaY) ? Ue.deltaX : Ue.deltaY;
        if (Ce === 0) return;
        const Be = de / he, et = Math.max(0, de - Be), rt = Be * 0.08 * (Ce > 0 ? 1 : -1), Nt = Math.max(0, Math.min(et, te + rt));
        _e.current = Nt, E(Nt);
      } else {
        if (Ue.deltaY === 0) return;
        const Be = Ue.deltaY < 0 ? 1.25 : 0.8, et = Ke.getBoundingClientRect(), rt = et.left + 150, Nt = et.right - 58, it = Math.max(100, Nt - rt);
        let dt = 0.5;
        Ue.clientX >= rt && Ue.clientX <= Nt ? dt = (Ue.clientX - rt) / it : et.width > 0 && (dt = Math.max(0, Math.min(1, (Ue.clientX - et.left) / et.width)));
        const Kt = Math.max(32, de / 2e3), _t = Math.max(1, Math.min(Kt, Math.round(he * Be * 100) / 100));
        if (_t === he) return;
        const Qt = de / he, Jt = de / _t, yn = te + dt * Qt - dt * Jt, is = Math.max(0, de - Jt), Jn = Math.max(0, Math.min(is, yn));
        Je.current = _t, _e.current = Jn, E(Jn), y(_t);
      }
    };
    return Ke.addEventListener("wheel", fe, { passive: !1, capture: !0 }), () => Ke.removeEventListener("wheel", fe, { capture: !0 });
  }, [e, t, y, E]);
  const Ze = i.useCallback(() => {
    p ? p() : (_e.current = 0, Je.current = 1, E == null || E(0), y == null || y(1));
  }, [p, E, y]), Gt = i.useCallback((Ke, fe) => {
    if (f)
      f(Ke, fe);
    else {
      const Ue = Math.max(1e3, fe - Ke), vt = Math.max(500, Ue * 0.05), he = Math.max(0, Ke - vt), de = Math.min(u, fe + vt) - he, Ce = Math.max(32, u / 2e3), Be = Math.max(1, Math.min(Ce, Number((u / de).toFixed(1)))), et = u / Be, rt = Math.max(0, Math.min(he, u - et));
      _e.current = rt, Je.current = Be, E == null || E(rt), y == null || y(Be);
    }
  }, [f, u, E, y]), tn = i.useCallback((Ke, fe = "center") => {
    if (v)
      v(Ke, fe);
    else {
      if (Ke == null) return;
      const Ue = Je.current || 1, vt = u / Math.max(1, Ue), he = fe === "start" ? vt / 4 : vt * 0.75, te = Math.max(0, Math.min(Ke - he, u - vt));
      _e.current = te, E == null || E(te);
    }
  }, [v, u, E]), Tt = i.useCallback(() => {
    ve((Ke) => !Ke);
  }, [ve]), mt = i.useCallback(async () => {
    var vt;
    if (!t || Math.abs(S - j) < 1e3) return;
    const Ke = (ne || "NONE").toUpperCase().replace("-", "_"), fe = Ke === "NONE" || Ke === "OFF" ? "None" : "BurnIn", Ue = {
      createdBy: Im(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(j),
      outEpochMs: a + Math.round(S),
      keystrokeMode: fe,
      layoutMode: Y ? Z : "mon-0",
      targetDisplayId: !Y || Z === "mon-0" || Z === "mon-1" || Z.startsWith("mon-") ? Y ? Z : "mon-0" : null,
      isPipSwapped: J,
      directorSegments: Y ? (B == null ? void 0 : B.segments) || ((vt = t == null ? void 0 : t.directorPlan) == null ? void 0 : vt.segments) || [] : []
    };
    try {
      $ ? await $(Ue) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Ue)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Ue)
      });
    } catch (he) {
      console.warn("[SoloSpotlightModal] Export trigger error:", he);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, j, S, a, $, ne, Z, J, B]);
  i.useEffect(() => {
    if (!e || !t) return;
    const Ke = (fe) => {
      if ((fe.ctrlKey || fe.metaKey) && (fe.key === "e" || fe.key === "E")) {
        fe.preventDefault(), mt();
        return;
      }
      if (fe.key === "?" || fe.shiftKey && fe.code === "Slash") {
        fe.preventDefault(), ee((Ue) => !Ue);
        return;
      }
      if (ze) {
        fe.key === "Escape" && ee(!1);
        return;
      }
      if (fe.key === "Escape" || fe.code === "Escape") {
        fe.preventDefault(), fe.stopPropagation(), o == null || o();
        return;
      }
      if (fe.code === "Space") {
        fe.preventDefault(), Tt();
        return;
      }
      if (fe.code === "KeyI") {
        fe.preventDefault(), M(Math.max(0, Math.min(D, S - 1e3)));
        return;
      }
      if (fe.code === "KeyO") {
        fe.preventDefault(), C(Math.min(u, Math.max(D, j + 1e3)));
        return;
      }
      if (fe.code === "ArrowLeft" || fe.code === "ArrowRight") {
        fe.preventDefault(), ve(!1);
        const Ue = fe.code === "ArrowLeft";
        let vt;
        if (fe.ctrlKey || fe.metaKey)
          vt = 33;
        else if (fe.shiftKey)
          vt = 5e3;
        else {
          const he = Math.max(1, h);
          vt = Math.max(33, Math.round(1e3 / he));
        }
        m((he) => {
          const te = Ue ? he - vt : he + vt;
          return Math.max(0, Math.min(u, te));
        });
        return;
      }
      if (fe.key === "ArrowDown") {
        fe.preventDefault();
        const Ue = r.findIndex((vt) => vt.id === t.id);
        if (Ue !== -1) {
          const vt = (Ue + 1) % r.length;
          l(r[vt].id);
        }
        return;
      }
      if (fe.key === "ArrowUp") {
        fe.preventDefault();
        const Ue = r.findIndex((vt) => vt.id === t.id);
        if (Ue !== -1) {
          const vt = (Ue - 1 + r.length) % r.length;
          l(r[vt].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Ke, { capture: !0 }), () => window.removeEventListener("keydown", Ke, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    D,
    j,
    S,
    u,
    h,
    M,
    C,
    m,
    mt,
    Tt,
    ve,
    ze
  ]);
  const Rt = r.findIndex((Ke) => Ke.id === (t && t.id)), at = r[Rt - 1], gt = r[Rt + 1];
  if (!e || !t) return null;
  const fn = k > 0 ? k : Math.round(a + D);
  return Bs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      H && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${H.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          H.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          H.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          H.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: H.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Qh(S - j),
            " (",
            Mt(a + j, c),
            " → ",
            Mt(a + S, c),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Xy,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: u,
            playheadMs: D,
            setPlayheadMs: m,
            isPlaying: ye,
            setIsPlaying: ve,
            playbackSpeed: jt,
            timeMode: c,
            inPointMs: j,
            outPointMs: S,
            isLooping: Ee,
            recordingSegments: N,
            globalGaps: ue,
            showWatermark: !0,
            directorPlan: B || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: U,
            onResetOverride: z,
            viewMode: Z,
            onViewModeChange: le,
            isPipSwapped: J,
            onPipSwapChange: ie
          }
        ),
        /* @__PURE__ */ s.jsx(
          wm,
          {
            currentEpochMs: fn,
            keystrokes: P,
            keystrokeMode: ne,
            targetStationId: (t == null ? void 0 : t.id) || (t == null ? void 0 : t.hostname) || (t == null ? void 0 : t.stationId),
            targetDisplayId: Z === "canvas" || Z === "all-displays" ? "auto" : Z,
            displays: (t == null ? void 0 : t.displays) || (t == null ? void 0 : t.Displays),
            directorPlan: B || (t == null ? void 0 : t.directorPlan)
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
              onClick: (Ke) => {
                Ke.preventDefault(), Ke.stopPropagation(), o == null || o();
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
              onClick: () => ee(!0),
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
              disabled: !at,
              onClick: () => at && l(at.id),
              title: at ? `Previous: ${at.displayName || at.roleAlias || at.hostname || at.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            Rt + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !gt,
              onClick: () => gt && l(gt.id),
              title: gt ? `Next: ${gt.displayName || gt.roleAlias || gt.hostname || gt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${ye ? "is-playing-dimmed" : ""}`, ref: Fe, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Qh(S - j) })
            ] }),
            (() => {
              const Ke = Z === "mon-0" ? "SCREEN 1" : Z === "mon-1" ? "SCREEN 2" : Z.startsWith("mon-") ? `SCREEN ${parseInt(Z.slice(4)) + 1}` : Z.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: mt,
                  title: `Export Selected Cut Window as ${Ke} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: Z === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Ke})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            xu,
            {
              activeStationId: t.id,
              isPlaying: ye,
              setIsPlaying: Tt,
              isLooping: Ee,
              setIsLooping: tt,
              playbackSpeed: jt,
              onChangeSpeed: St,
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: u,
              inPointMs: j,
              setInPointMs: M,
              outPointMs: S,
              setOutPointMs: C,
              onSetInPoint: () => M(Math.max(0, Math.min(D, S - 1e3))),
              onSetOutPoint: () => C(Math.min(u, Math.max(D, j + 1e3))),
              onStepFrameBackward: () => {
                ve(!1), m((Ke) => Math.max(0, Ke - 33));
              },
              onStepFrameForward: () => {
                ve(!1), m((Ke) => Math.min(u, Ke + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: Mt(a + D, c) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Sm,
          {
            stations: ct,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: c,
            totalDurationMs: u,
            zoomLevel: h,
            onZoomChange: y,
            onZoomReset: Ze,
            onFitRange: Gt,
            onJumpViewportTo: tn,
            viewportStartMs: b,
            onViewportStartChange: E,
            playheadMs: D,
            setPlayheadMs: (Ke) => {
              ve(!1), m(Ke);
            },
            inPointMs: j,
            setInPointMs: M,
            outPointMs: S,
            setOutPointMs: C,
            recordingSegments: N,
            onExport: mt,
            onEstimateLoaded: (Ke) => {
              Ke != null && Ke.removedGlobalGaps && L(Ke.removedGlobalGaps);
            },
            keystrokeMode: ne,
            onChangeKeystrokeMode: re,
            keystrokes: P,
            showKeystrokes: F,
            showRulerKeystrokes: F,
            onToggleRulerKeystrokes: T,
            onSplitDirectorSegment: we,
            onChangeDirectorSegmentDisplay: K,
            onResetDirectorSegmentToAuto: z
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Tm,
        {
          isOpen: ze,
          onClose: () => ee(!1)
        }
      )
    ] }),
    document.body
  );
}
function $m({ isGlobalHost: e = !1 }) {
  const [t, n] = i.useState([]), [r, l] = i.useState(/* @__PURE__ */ new Set()), o = i.useRef(null), a = i.useRef(!1), c = i.useRef(0), [u, h] = i.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [y, p] = i.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), f = i.useCallback(async () => {
    if (!a.current && !(typeof document < "u" && document.hidden)) {
      a.current = !0;
      try {
        let N = await fetch("/api/v1/extractor-advanced/jobs");
        if (N.ok || (N = await fetch("/api/v1/extractor/jobs")), N.ok) {
          c.current = 0;
          const g = await N.json(), $ = Array.isArray(g) ? g : [];
          n($), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: $ }));
        } else
          c.current++;
      } catch (N) {
        c.current++, c.current <= 2 && console.warn("[ExportJobMonitor] Polling error:", N);
      } finally {
        a.current = !1;
      }
    }
  }, []);
  i.useEffect(() => {
    let N = !0, g = null;
    const $ = () => {
      if (!N) return;
      let _ = 2500;
      typeof document < "u" && document.hidden ? _ = 3e4 : c.current > 0 && (_ = Math.min(3e4, 2500 * Math.pow(2, Math.min(c.current, 4)))), g = setTimeout(async () => {
        await f(), $();
      }, _);
    }, w = () => {
      !document.hidden && N && (clearTimeout(g), c.current = 0, f().then($));
    };
    return document.addEventListener("visibilitychange", w), f().then($), () => {
      N = !1, clearTimeout(g), document.removeEventListener("visibilitychange", w);
    };
  }, [f]), i.useEffect(() => {
    const N = () => {
      p(!0), f();
    };
    return window.addEventListener("open-export-monitor", N), () => window.removeEventListener("open-export-monitor", N);
  }, [f]), i.useEffect(() => {
    if (!y || u) return;
    const N = (g) => {
      o.current && !o.current.contains(g.target) && !g.target.closest(".export-floating-hud") && p(!1);
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [y, u]);
  const v = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && v)
    return null;
  const b = t.filter((N) => N.status === "Processing" || N.status === "Queued"), E = t.filter((N) => N.status === "Completed" || N.isCompleted), D = () => {
    h((N) => {
      const g = !N;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(g));
      } catch {
      }
      return g;
    });
  }, k = () => {
    p(!1), h(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, m = (N, g) => {
    g.stopPropagation(), !(!N || r.has(N)) && (l(($) => new Set($).add(N)), setTimeout(() => {
      n(($) => {
        const w = $.filter((_) => (_.jobId || _.id) !== N);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: w })), w;
      }), l(($) => {
        const w = new Set($);
        return w.delete(N), w;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${N}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}`, { method: "DELETE" })).catch(($) => console.warn("[ExportJobMonitor] Dismiss failed:", $)));
  }, j = async (N, g) => {
    g.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${N}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}/bookmark`, { method: "POST" })), f();
    } catch ($) {
      console.warn("[ExportJobMonitor] Bookmark failed:", $);
    }
  }, M = (N, g) => {
    g.stopPropagation();
    const $ = N.networkFolderPath || (N.outputFilePath ? N.outputFilePath.substring(0, N.outputFilePath.lastIndexOf("\\")) : "");
    $ && (navigator.clipboard.writeText($), alert(`UNC Directory Path copied to clipboard:
${$}`));
  }, S = (N) => {
    const g = N.jobId || N.id, $ = `/api/v1/extractor-advanced/jobs/${g}/download`, w = document.createElement("a");
    w.href = $, w.download = N.fileName || `archive_${g}.tar`, document.body.appendChild(w), w.click(), document.body.removeChild(w), setTimeout(f, 1e3);
  }, C = (N) => {
    if (!N || N <= 0) return "0 B";
    const g = N / (1024 * 1024);
    return g >= 1e3 ? `${(g / 1024).toFixed(2)} GB` : `${g.toFixed(1)} MB`;
  };
  return t.length === 0 && !y ? null : Bs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !y && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${b.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => p(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${b.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: b.length > 0 ? `EXPORTS: ${b.length} PACKAGING` : `${E.length} ARCHIVE${E.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${b.length > 0 ? "" : "ready"}`, children: b.length > 0 ? `${b[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      y && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !u && p(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${u ? "pinned" : ""}`, onClick: (N) => N.stopPropagation(), children: [
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
                className: `btn-pin ${u ? "active" : ""}`,
                onClick: D,
                title: u ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: u ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: k, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((N) => {
          const g = N.status === "Completed" || N.isCompleted, $ = N.status === "Failed" || N.isFailed, w = N.status === "Processing" || N.status === "Queued", _ = N.jobId || N.id, G = r.has(_), I = g ? 100 : Math.round(N.progressPercent || N.progressPercentage || N.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${N.status.toLowerCase()} ${N.isBookmarked ? "is-bookmarked" : ""} ${G ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${N.status.toLowerCase()}`, children: g ? "READY" : N.status }),
                    /* @__PURE__ */ s.jsxs("span", { className: "operator-chip", title: `Export created by ${N.createdBy || "Guest Operator"}`, children: [
                      /* @__PURE__ */ s.jsx("span", { className: "chip-icon", children: "👤" }),
                      /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: N.createdBy || "Guest Operator" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: N.fileName, children: N.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (R) => m(_, R),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                (N.notes || N.Notes) && /* @__PURE__ */ s.jsxs("div", { className: "job-notes-callout", title: `Export Note: ${N.notes || N.Notes}`, children: [
                  /* @__PURE__ */ s.jsx("span", { className: "notes-icon", children: "📝" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-label", children: "NOTE:" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-body", children: N.notes || N.Notes })
                ] }),
                w && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: N.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      I,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, I)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      C(N.fileSizeBytes)
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "telemetry-tags", children: [
                      /* @__PURE__ */ s.jsxs("span", { className: "operator-mini-tag", title: `Initiated by ${N.createdBy || "Guest Operator"}`, children: [
                        "👤 ",
                        N.createdBy || "Guest Operator"
                      ] }),
                      /* @__PURE__ */ s.jsx("span", { className: "speed", children: N.speedMBps > 0 ? `${N.speedMBps.toFixed(1)} MB/s` : "Analyzing" }),
                      N.estimatedSecondsRemaining > 0 && /* @__PURE__ */ s.jsxs("span", { className: "eta", children: [
                        "ETA ~",
                        Math.ceil(N.estimatedSecondsRemaining),
                        "s"
                      ] })
                    ] })
                  ] })
                ] }),
                g && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "OPERATOR" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val highlight-cyan", title: N.createdBy || "Guest Operator", children: [
                      "👤 ",
                      N.createdBy || "Guest Operator"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: C(N.fileSizeBytes) })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "DOWNLOADS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val", children: [
                      "📥 ",
                      N.downloadCount || 0
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "COMPLETED" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val", children: N.completedAtUtc ? new Date(N.completedAtUtc).toLocaleTimeString() : "--:--" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "RETENTION" }),
                    /* @__PURE__ */ s.jsx("span", { className: `val policy-tag ${N.isBookmarked ? "pinned" : ""}`, children: N.isBookmarked ? "★ PINNED" : "24H PURGE" })
                  ] })
                ] }),
                g && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${N.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (R) => j(_, R),
                        title: N.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: N.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (R) => M(N, R),
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
                      onClick: () => S(N),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                $ && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  N.errorMessage || N.error || "Export failed"
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
function Jy({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const l = i.useRef(null);
  if (i.useEffect(() => {
    if (!e) return;
    const v = (E) => {
      E.key === "Escape" && (t == null || t());
    }, b = (E) => {
      l.current && !l.current.contains(E.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", b), window.addEventListener("keydown", v), () => {
      window.removeEventListener("mousedown", b), window.removeEventListener("keydown", v);
    };
  }, [e, t]), !e || !e.station) return null;
  const { x: o, y: a, station: c } = e, u = c.displayName || c.hostname || c.name || c.id, h = 220, y = 160, p = Math.max(10, Math.min(o, (typeof window < "u" ? window.innerWidth : 1920) - h - 12)), f = Math.max(10, Math.min(a, (typeof window < "u" ? window.innerHeight : 1080) - y - 12));
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: l,
      className: "station-context-menu-root",
      style: { top: `${f}px`, left: `${p}px` },
      onClick: (v) => v.stopPropagation(),
      onContextMenu: (v) => v.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "station-title", title: u, children: u }),
          /* @__PURE__ */ s.jsx("span", { className: "station-sub", children: c.hostname && u.toLowerCase() !== c.hostname.toLowerCase() ? `HOST: ${c.hostname}` : c.ipAddress || (c.isOnline ? "ONLINE" : "ACTIVE CHANNEL") })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "menu-divider" }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "menu-action-item deselect-action",
            onClick: () => {
              n == null || n(c.id), t == null || t();
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
              r == null || r(c.id), t == null || t();
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
function qy({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 2560, a = r.canvasHeight || 1440, c = o / a, u = r.resolution || "2K";
  let h;
  Math.abs(c - 16 / 9) < 0.05 ? h = "16:9 Broadcast" : Math.abs(c - 16 / 10) < 0.05 ? h = "16:10 WUXGA / WQXGA" : Math.abs(c - 19 / 10) < 0.05 ? h = "19:10 NOC Extended" : Math.abs(c - 32 / 9) < 0.15 ? h = "32:9 Dual Screen" : Math.abs(c - 21 / 9) < 0.15 ? h = "21:9 Ultrawide" : Math.abs(c - 4 / 3) < 0.15 ? h = "4:3 Standard" : h = `${Math.round(c * 100) / 100}:1 Custom`;
  const p = ((C, N) => {
    const g = Math.round(C * N / 2073600 * 6 * 10) / 10, $ = Math.round(g * 60 / 8 * 10) / 10;
    return `~${g} Mbps (~${$} MB/min)`;
  })(o, a), [f, v] = i.useState("BurnIn"), [b, E] = i.useState(""), [D, k] = i.useState(!1);
  if (!e) return null;
  const m = async () => {
    k(!0);
    try {
      await n(f, u, b), t();
    } finally {
      k(!1);
    }
  }, j = (r.layout || "DIRECTOR").toUpperCase(), M = r.stationsCount || 1, S = r.audioSegmentsCount || 1;
  return Bs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (C) => C.stopPropagation(), children: [
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
              j,
              "] (WYSIWYG ",
              h,
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
              c.toFixed(2),
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
              u,
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
              M,
              " WORKSTATION",
              M > 1 ? "S" : ""
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
              uu(typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right"),
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
                u,
                " • ",
                h,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "locked-res-metric", children: p })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "locked-res-desc", children: "Exact 1:1 WYSIWYG canvas rendering locked from workspace. Pre-configured canvas geometry, multi-screen tiles, typography, and UTC clock overlay export with zero distortion or scaling artifacts." })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT KEYSTROKE PRESENTATION" }),
        /* @__PURE__ */ s.jsxs("div", { className: "modes-grid", children: [
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${f === "BurnIn" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "BurnIn",
                checked: f === "BurnIn",
                onChange: () => v("BurnIn")
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "mode-content", children: [
              /* @__PURE__ */ s.jsx("div", { className: "mode-name", children: "HARD BURN-IN (IN-PLACE ON VIDEO)" }),
              /* @__PURE__ */ s.jsx("div", { className: "mode-desc", children: "Permanently bakes keystrokes directly onto the video pixels at the exact coordinate position of each screen for unalterable forensic evidence." })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${f === "None" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "None",
                checked: f === "None",
                onChange: () => v("None")
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
              value: b,
              onChange: (C) => E(C.target.value),
              rows: 2,
              maxLength: 500
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "notes-char-counter", children: [
            b.length,
            " / 500"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: D, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: m, disabled: D, children: D ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${o}×${a})` })
      ] })
    ] }) }),
    document.body
  );
}
function Zy(e, t, n, r, l = null) {
  const [o, a] = i.useState([]), [c, u] = i.useState({}), [h, y] = i.useState(!1), p = i.useRef(o);
  p.current = o;
  const f = i.useCallback(async () => {
    if (isNaN(e)) return;
    const E = e + t;
    y(!0);
    try {
      const D = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(E),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${D.toString()}`);
      if (k.ok) {
        const m = k.headers.get("content-type");
        if (m && m.includes("application/json")) {
          const j = await k.json(), S = (Array.isArray(j) ? j : j.stations || j.items || []).filter((C) => (C.recordingsCount || (C.segments ? C.segments.length : 0)) > 0).map((C) => {
            var N, g;
            return {
              id: String(C.id || C.stationId || C.agentId || C.hostname),
              hostname: C.hostname || "Station",
              roleAlias: C.roleAlias || null,
              roleHistory: C.roleHistory || [],
              displayName: C.displayName || C.roleAlias || C.hostname || "Station",
              isOnline: C.isOnline !== void 0 ? C.isOnline : !0,
              recordingsCount: C.recordingsCount || 0,
              segments: C.segments || [],
              displays: C.displays || C.Displays || ((N = C.displayTopology) == null ? void 0 : N.displays) || ((g = C.DisplayTopology) == null ? void 0 : g.Displays) || [],
              displayTopology: C.displayTopology || C.DisplayTopology || null,
              directorPlan: C.directorPlan || C.DirectorPlan || null,
              hasAudio: !!C.hasAudio,
              audioCodec: C.audioCodec || "",
              audioChannels: C.audioChannels || 0,
              audioLabel: C.audioLabel || (C.hasAudio ? "AAC" : "NONE"),
              width: C.width || 1920,
              height: C.height || 1080,
              fps: C.fps || 30,
              isVfr: !!C.isVfr,
              resolution: C.resolution || "1080p",
              feedSpec: C.feedSpec || "1080p • 30fps"
            };
          });
          a((C) => {
            if (!C || C.length === 0) return S;
            const N = new Map(C.map((w) => [w.id, w]));
            let g = C.length !== S.length;
            const $ = S.map((w) => {
              const _ = N.get(w.id);
              return _ ? _.isOnline === w.isOnline && _.displayName === w.displayName && _.roleAlias === w.roleAlias && _.feedSpec === w.feedSpec && _.recordingsCount === w.recordingsCount && _.fps === w.fps ? _ : (g = !0, { ..._, ...w }) : (g = !0, w);
            });
            return g ? $ : C;
          });
        }
      }
    } catch (D) {
      console.warn("[useStudioData] Failed fetching active stations:", D);
    } finally {
      y(!1);
    }
  }, [e, t, n.start, n.end, r]);
  i.useEffect(() => {
    f();
  }, [f]);
  const v = i.useMemo(() => {
    const E = /* @__PURE__ */ new Set();
    return o.forEach((D) => {
      D.id && E.add(D.id), D.hostname && E.add(D.hostname);
    }), Array.from(E).sort().join(",");
  }, [o]);
  i.useEffect(() => {
    if (!v || isNaN(e)) {
      u({});
      return;
    }
    let E = !0;
    return (async () => {
      try {
        const k = e + t, m = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(v)}&startEpoch=${e}&endEpoch=${k}`);
        if (m.ok && E) {
          const j = await m.json() || {}, M = {};
          (p.current || []).forEach((S) => {
            const C = j[S.id] || j[S.hostname] || j[S.displayName] || [];
            M[S.id] = C, M[S.hostname] = C;
          }), Object.keys(j).forEach((S) => {
            M[S] || (M[S] = j[S]);
          }), u(M);
        }
      } catch {
        E && u({});
      }
    })(), () => {
      E = !1;
    };
  }, [v, e, t]);
  const b = i.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let E = 1 / 0, D = -1 / 0;
    o.forEach((M) => {
      (c[M.id] || c[M.hostname] || M.segments || []).forEach((C) => {
        const N = C.startEpochMs ?? C.startEpoch ?? 0, g = C.endEpochMs ?? C.endEpoch ?? 0;
        N > 0 && N < E && (E = N), g > 0 && g > D && (D = g);
      });
    });
    let k = 1 / 0, m = -1 / 0;
    l && (c[l] || []).forEach((S) => {
      const C = S.startEpochMs ?? S.startEpoch ?? 0, N = S.endEpochMs ?? S.endEpoch ?? 0;
      C > 0 && C < k && (k = C), N > 0 && N > m && (m = N);
    });
    const j = (M) => M === 1 / 0 || M === -1 / 0 ? null : Math.max(0, Math.min(t, M - e));
    return {
      globalFirstMs: j(E),
      globalLastMs: j(D),
      currentFirstMs: j(k),
      currentLastMs: j(m)
    };
  }, [o, c, l, e, t]);
  return {
    allStations: o,
    setAllStations: a,
    recordingSegments: c,
    setRecordingSegments: u,
    isLoadingStations: h,
    refetchStations: f,
    movieBoundaries: b
  };
}
function e1({
  timelineBaseEpochMs: e,
  inPointMs: t,
  outPointMs: n,
  globalGaps: r = [],
  activeStation: l,
  spotlightStation: o,
  recordingSegments: a = {},
  initialPlayheadMs: c = 0,
  initialIsPlaying: u = !1,
  initialIsLooping: h = !0,
  initialPlaybackSpeed: y = 1,
  isGridMode: p = !1
}) {
  const [f, v] = i.useState(c), [b, E] = i.useState(u), [D, k] = i.useState(h), [m, j] = i.useState(y), M = i.useRef(null), S = i.useRef(null), C = o || l, N = i.useMemo(() => C ? a[C.id] || C.segments || [] : [], [C, a]), g = N.some((G) => {
    const I = G.startEpochMs ?? G.startEpoch ?? 0, R = G.endEpochMs ?? G.endEpoch ?? 0, se = e + f;
    return se >= I && se <= R;
  }), $ = !!(!p && C && g);
  i.useEffect(() => {
    v((G) => G < t ? t : G > n ? (E(!1), n) : G);
  }, [t, n]);
  const w = i.useCallback((G) => {
    M.current || (M.current = G);
    const I = (G - M.current) * m, R = Math.min(I, 250 * m);
    M.current = G, v((se) => {
      let ne = se + R;
      if (r && r.length > 0) {
        const re = e + ne, P = r.find((F) => re >= F.startEpochMs && re < F.endEpochMs);
        P && (ne = P.endEpochMs - e);
      }
      return ne >= n && (D ? ne = t : (E(!1), ne = n)), ne;
    }), b && (!$ || p) && (S.current = requestAnimationFrame(w));
  }, [b, D, t, n, r, e, $, m, p]);
  i.useEffect(() => (b && (!$ || p) ? (M.current = performance.now(), S.current = requestAnimationFrame(w)) : (S.current && cancelAnimationFrame(S.current), M.current = null), () => {
    S.current && cancelAnimationFrame(S.current);
  }), [b, w, $, p]);
  const _ = i.useCallback(() => {
    if (b)
      E(!1);
    else {
      let G = f;
      const I = e + G, R = r == null ? void 0 : r.find((se) => I >= se.startEpochMs && I < se.endEpochMs);
      if (R)
        G = R.endEpochMs - e;
      else if (C && !g) {
        const se = N.map((ne) => ({ start: ne.startEpochMs ?? ne.startEpoch ?? 0, end: ne.endEpochMs ?? ne.endEpoch ?? 0 })).filter((ne) => ne.start > I).sort((ne, re) => ne.start - re.start)[0];
        se && (G = se.start - e);
      }
      G !== f && v(G), E(!0);
    }
  }, [b, f, e, r, C, g, N]);
  return {
    playheadMs: f,
    setPlayheadMs: v,
    isPlaying: b,
    setIsPlaying: E,
    isLooping: D,
    setIsLooping: k,
    playbackSpeed: m,
    setPlaybackSpeed: j,
    togglePlaySmart: _
  };
}
function t1(e) {
  return 1 - Math.pow(1 - e, 3);
}
function n1({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = i.useState(n), [a, c] = i.useState(r), u = i.useRef(null), h = i.useRef(a);
  h.current = a;
  const y = i.useRef(l);
  y.current = l;
  const p = i.useRef(t);
  p.current = t;
  const f = Math.max(32, t / 2e3), v = t / l, b = i.useCallback((m, j = 280) => {
    u.current && cancelAnimationFrame(u.current);
    const M = h.current, S = m - M;
    if (Math.abs(S) < 1) return;
    const C = performance.now(), N = (g) => {
      const $ = g - C, w = Math.min(1, $ / j);
      c(Math.round(M + S * t1(w))), w < 1 ? u.current = requestAnimationFrame(N) : u.current = null;
    };
    u.current = requestAnimationFrame(N);
  }, []), E = i.useCallback((m, j) => {
    const M = Math.max(1e3, j - m), S = Math.max(500, M * 0.05), C = Math.max(0, m - S), g = Math.min(t, j + S) - C, $ = Math.max(1, Math.min(f, Number((t / g).toFixed(1)))), w = t / $, _ = Math.max(0, Math.min(C, t - w));
    b(_), o($);
  }, [t, f, b]), D = i.useCallback(() => {
    b(0), o(1);
  }, [b]), k = i.useCallback((m, j = "center") => {
    if (m == null) return;
    const M = j === "start" ? v / 4 : v * 0.75, S = Math.max(0, Math.min(m - M, t - v));
    b(S);
  }, [v, t, b]);
  return i.useEffect(() => () => {
    u.current && cancelAnimationFrame(u.current);
  }, []), i.useEffect(() => {
    let m = null;
    const j = (S) => {
      if (S.defaultPrevented) return;
      S.preventDefault(), S.stopPropagation();
      const C = S.ctrlKey || S.shiftKey, N = y.current, g = h.current, $ = p.current;
      if (C) {
        const w = Math.abs(S.deltaX) > Math.abs(S.deltaY) ? S.deltaX : S.deltaY;
        if (w === 0) return;
        const _ = $ / Math.max(1, N), G = Math.max(0, $ - _), I = _ * 0.08 * (w > 0 ? 1 : -1);
        c((R) => Math.max(0, Math.min(G, R + I)));
      } else {
        if (S.deltaY === 0) return;
        const _ = S.deltaY < 0 ? 1.25 : 0.8, G = Math.max(32, $ / 2e3), I = m ? m.getBoundingClientRect() : { left: 0, width: window.innerWidth }, R = Math.max(0, Math.min(I.width, S.clientX - I.left)), se = I.width > 0 ? R / I.width : 0.5;
        o((ne) => {
          const re = Math.max(1, Math.min(G, Math.round(ne * _ * 100) / 100));
          if (re === ne) return ne;
          const P = $ / ne, F = $ / re, B = g + se * P - se * F, U = Math.max(0, $ - F);
          return c(Math.max(0, Math.min(U, B))), re;
        });
      }
    }, M = () => {
      const S = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return S && !m ? (m = S, m.addEventListener("wheel", j, { passive: !1, capture: !0 }), !0) : !!m;
    };
    if (!M()) {
      const S = setInterval(() => {
        M() && clearInterval(S);
      }, 100);
      return () => {
        clearInterval(S), m && m.removeEventListener("wheel", j, { capture: !0 });
      };
    }
    return () => {
      m && m.removeEventListener("wheel", j, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: a,
    setViewportStartMs: c,
    viewportDurationMs: v,
    animateViewportTo: b,
    fitRange: E,
    resetZoom: D,
    jumpViewportTo: k
  };
}
function s1({
  activeStationId: e,
  spotlightStationId: t,
  timelineStations: n = [],
  selectedStationIdsCount: r = 0,
  onSelectActiveStation: l,
  setPlaybackSpeed: o,
  playheadMs: a,
  setPlayheadMs: c,
  inPointMs: u,
  setInPointMs: h,
  outPointMs: y,
  setOutPointMs: p,
  totalTimelineDurationMs: f,
  zoomLevel: v = 1,
  togglePlaySmart: b,
  onToggleHelpModal: E,
  onSplitDirectorAtPlayhead: D,
  isModalActive: k = !1,
  hasGridPlacements: m = !0,
  onToggleGridFullscreen: j,
  isGridFullscreen: M = !1,
  onExitGridFullscreen: S,
  activeFocusZone: C = "timeline"
}) {
  i.useEffect(() => {
    const N = (g) => {
      const $ = g.target;
      if (!($.tagName === "INPUT" || $.tagName === "TEXTAREA" || $.tagName === "SELECT" || $.isContentEditable || $.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (g.key === "?" || g.shiftKey && g.code === "Slash") {
          g.preventDefault(), E == null || E();
          return;
        }
        if (!(k || t)) {
          if (g.code === "KeyI" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), h == null || h(Math.max(0, Math.min(a, y - 1e3)));
            return;
          }
          if (g.code === "KeyO" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), p == null || p(Math.min(f, Math.max(a, u + 1e3)));
            return;
          }
          if (g.code === "KeyX" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), h == null || h(0), p == null || p(f);
            return;
          }
          if (g.code === "KeyL" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), o == null || o((_) => _ <= 0 ? 1 : _ === 1 ? 2 : _ === 2 ? 4 : _ >= 4 ? 8 : 1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-forward"));
            return;
          }
          if (g.code === "KeyK" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), o == null || o(1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-pause"));
            return;
          }
          if (g.code === "KeyJ" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-reverse"));
            return;
          }
          if (g.code === "KeyM" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-mute"));
            return;
          }
          if (g.code === "Digit1" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 1 } }));
            return;
          }
          if (g.code === "Digit2" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 2 } }));
            return;
          }
          if (g.code === "Digit4" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 4 } }));
            return;
          }
          if (g.code === "KeyG" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-auto-grid"));
            return;
          }
          if (g.code === "KeyR" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-reset-canvas"));
            return;
          }
          if (g.code === "KeyF" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-fullscreen"));
            return;
          }
          if ((g.code === "Equal" || g.code === "NumpadAdd" || g.code === "Insert") && !g.ctrlKey && !g.metaKey) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-add-keyframe"));
            return;
          }
          if ((g.code === "Delete" || g.code === "Backspace") && window.dispatchEvent(new CustomEvent("itb:studio-delete-selected")), g.code === "BracketLeft") {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "in" } }));
            return;
          }
          if (g.code === "BracketRight") {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "out" } }));
            return;
          }
          if (g.code === "Backslash") {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-fit-cut"));
            return;
          }
          if (g.code === "KeyS") {
            if (g.ctrlKey || g.metaKey) {
              g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-save-now"));
              return;
            } else if (!g.altKey) {
              g.preventDefault(), D == null || D();
              return;
            }
          }
          if (g.code === "KeyZ" && (g.ctrlKey || g.metaKey)) {
            g.preventDefault(), g.shiftKey ? window.dispatchEvent(new CustomEvent("itb:studio-redo")) : window.dispatchEvent(new CustomEvent("itb:studio-undo"));
            return;
          }
          if (g.code === "KeyY" && (g.ctrlKey || g.metaKey)) {
            g.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-redo"));
            return;
          }
          if (g.code === "Space") {
            if (g.preventDefault(), !m) return;
            b();
            return;
          }
          if (g.code === "KeyF" && !g.ctrlKey && !g.metaKey && !g.altKey) {
            g.preventDefault(), j == null || j();
            return;
          }
          if ((g.key === "Escape" || g.code === "Escape") && M) {
            g.preventDefault(), S == null || S();
            return;
          }
          if (g.key === "Home") {
            g.preventDefault(), c == null || c(u);
            return;
          }
          if (g.key === "End") {
            g.preventDefault(), c == null || c(y);
            return;
          }
          if (g.code === "ArrowLeft" || g.code === "ArrowRight") {
            if (C === "canvas" && !g.ctrlKey && !g.altKey && !g.metaKey)
              return;
            g.preventDefault();
            const _ = g.code === "ArrowLeft";
            let G;
            if (g.ctrlKey || g.metaKey)
              G = 33;
            else if (g.shiftKey)
              G = 5e3;
            else {
              const I = Math.max(1, v);
              G = Math.max(33, Math.round(1e3 / I));
            }
            c == null || c((I) => {
              const R = _ ? I - G : I + G;
              return Math.max(0, Math.min(f, R));
            });
            return;
          }
          if (g.code === "ArrowDown" || g.code === "ArrowUp") {
            if (C === "canvas" && !g.ctrlKey && !g.altKey && !g.metaKey || !e || n.length <= 1) return;
            g.preventDefault();
            const _ = n.findIndex((G) => G.id === e);
            if (_ === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (g.code === "ArrowDown") {
              const G = (_ + 1) % n.length;
              l(n[G].id), o(1);
            } else {
              const G = (_ - 1 + n.length) % n.length;
              l(n[G].id), o(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", N, { capture: !0 }), () => window.removeEventListener("keydown", N, { capture: !0 });
  }, [
    e,
    t,
    n,
    r,
    l,
    o,
    a,
    c,
    u,
    h,
    y,
    p,
    f,
    v,
    b,
    E,
    D,
    k,
    m,
    j,
    M,
    S,
    C
  ]);
}
const Jh = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = Wh(n, e), l = Wh(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, po = (e, t = null, n = "LOCAL") => {
  if (!e) return Date.now();
  if (typeof e == "number") return e;
  const r = String(e).trim();
  if (/^\d+$/.test(r)) return Number(r);
  if (r.endsWith("Z") || /[+-]\d{2}:?\d{2}$/.test(r)) {
    const u = Date.parse(r);
    if (!isNaN(u)) return u;
  }
  let l = r, o = t;
  if (!o) {
    if (r.includes("T")) {
      const u = r.split("T");
      l = u[0], o = u[1];
    } else if (r.includes(" ")) {
      const u = r.split(" ");
      l = u[0], o = u[1];
    }
  }
  if (l && o) {
    const u = o.replace(/[Zz].*$/, "").replace(/[+-]\d{2}:?\d{2}$/, "").substring(0, 8), h = Vr(l, u, n);
    if (h !== null && !isNaN(h)) return h;
  }
  const a = r.replace(" ", "T"), c = new Date(a).getTime();
  return isNaN(c) ? Date.now() : c;
};
function r1() {
  var ul, Zl;
  const e = i.useMemo(() => $x() || {}, []), [t, n] = i.useState(() => {
    var O, ae;
    return (O = e.timeRange) != null && O.startEpochMs && ((ae = e.timeRange) != null && ae.endEpochMs) ? e.timeRange : Jh();
  }), [r, l] = i.useState(e.timeMode || "LOCAL"), [o, a] = i.useState(e.keystrokeMode || "BURN_IN"), [c, u] = i.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !0);
  i.useEffect(() => {
    Cx().catch((O) => console.warn("[Studio] DST init error:", O));
  }, []);
  const h = i.useMemo(() => t.startEpochMs ? t.startEpochMs : po(t.start, null, r), [t.start, t.startEpochMs, r]), y = i.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), p = i.useMemo(() => h - y, [h, y]), f = i.useMemo(() => t.durationMs + 2 * y, [t.durationMs, y]), [v, b] = i.useState(e.selectedStationIds || []), [E, D] = i.useState(e.activeStationId || null), [k, m] = i.useState(null), [j, M] = i.useState(null), [S, C] = i.useState([]), [N, g] = i.useState(!1), [$, w] = i.useState(null), [_, G] = i.useState(() => {
    var O;
    return e.compositionScope || (((O = e.selectedStationIds) == null ? void 0 : O.length) > 1 ? "inter-station" : "intra-station");
  }), [I, R] = i.useState(() => {
    try {
      const O = localStorage.getItem("itb_composition_layout");
      if (O) return O;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), se = i.useCallback((O) => {
    R((ae) => {
      const ce = typeof O == "function" ? O(ae) : O;
      try {
        localStorage.setItem("itb_composition_layout", ce);
      } catch {
      }
      return ce;
    });
  }, []), [ne, re] = i.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [P, F] = i.useState(() => !!e.isPipSwapped), [T, B] = i.useState(() => e.audioRoutingPlan || null), [U, we] = i.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [K, z] = i.useState(!1), [V, ge] = i.useState(null), [ye, ve] = i.useState(() => e.canvasLayoutTimeline || null), [Oe, xe] = i.useState(0), Ee = i.useCallback((O) => {
    ve((ae) => {
      var Pe;
      const ce = [...(ae == null ? void 0 : ae.keyframes) || []], je = ce.findIndex((Ve) => Math.abs(Ve.timestampEpochMs - O) < 300);
      if (je >= 0)
        return xe(je), ae;
      const $e = ce[Oe] || ce[0], Me = ($e == null ? void 0 : $e.layout) || V || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Se = [...ce].reverse().find((Ve) => Ve.timestampEpochMs <= O) || $e, He = (Me == null ? void 0 : Me.utcClockPosition) || (Se == null ? void 0 : Se.utcClockPosition) || ((Pe = Se == null ? void 0 : Se.layout) == null ? void 0 : Pe.utcClockPosition) || "top-right", Ge = JSON.parse(JSON.stringify(Me));
      Ge.utcClockPosition = He;
      const We = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(O),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        utcClockPosition: He,
        layout: Ge
      }, De = [...ce, We].sort((Ve, Bt) => Ve.timestampEpochMs - Bt.timestampEpochMs), Ye = De.findIndex((Ve) => Ve.timestampEpochMs === Math.round(O));
      return xe(Ye >= 0 ? Ye : 0), {
        ...ae || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: De
      };
    });
  }, [Oe, V]), tt = i.useCallback((O, ae) => {
    ve((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : du(ce, O, ae));
  }, []), nt = i.useCallback((O) => {
    ve((ae) => {
      if (!(ae != null && ae.keyframes) || ae.keyframes.length <= 1) return ae;
      const ce = ae.keyframes.filter((je, $e) => $e !== O);
      return xe((je) => Math.max(0, je - 1)), { ...ae, keyframes: ce };
    });
  }, []), zt = i.useCallback((O, ae) => {
    ve((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : hu(ce, O, ae));
  }, []), jt = i.useCallback((O, ae) => {
    ve((ce) => {
      if (!(ce != null && ce.keyframes) || ce.keyframes.length === 0) return ce;
      const je = Math.round(ae), $e = typeof O == "number" && ce.keyframes[O] ? O : ce.keyframes.findIndex((He) => He.id === O);
      if ($e === -1) return ce;
      const Me = [...ce.keyframes];
      Me[$e] = {
        ...Me[$e],
        timestampEpochMs: je
      }, Me.sort((He, Ge) => He.timestampEpochMs - Ge.timestampEpochMs);
      const Se = Me.findIndex((He) => He.timestampEpochMs === je);
      return Se >= 0 && xe(Se), {
        ...ce,
        keyframes: Me
      };
    });
  }, []);
  i.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [St, H] = i.useState({}), Ae = i.useCallback((O) => {
    b((ae) => ae.filter((ce) => ce !== O)), E === O && D(null), k === O && m(null), ve((ae) => {
      if (!ae || !ae.keyframes) return ae;
      const ce = ae.keyframes.map((je) => {
        var $e;
        return {
          ...je,
          layout: {
            ...je.layout,
            placements: ((($e = je.layout) == null ? void 0 : $e.placements) || []).filter((Me) => Me.stationId !== O)
          }
        };
      });
      return { ...ae, keyframes: ce };
    });
  }, [E, k]), ze = i.useCallback((O, ae) => {
    O.preventDefault(), O.stopPropagation();
    const ce = 195, je = 110, $e = Math.min(O.clientX, window.innerWidth - ce - 10), Me = Math.min(O.clientY, window.innerHeight - je - 10);
    w({ x: $e, y: Me, station: ae });
  }, []), ee = i.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(f, e.inEpochMs - p)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(f, e.inPointMs)) : y, [e.inEpochMs, e.inPointMs, p, f, y]), ue = i.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(ee + 1e3, Math.min(f, e.outEpochMs - p)) : typeof e.outPointMs == "number" ? Math.max(ee + 1e3, Math.min(f, e.outPointMs)) : y + t.durationMs, [e.outEpochMs, e.outPointMs, p, f, y, t.durationMs, ee]), L = i.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(f, e.playheadEpochMs - p)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(f, e.playheadMs)) : ee, [e.playheadEpochMs, e.playheadMs, p, f, ee]), [Y, Z] = i.useState(ee), [q, le] = i.useState(ue);
  i.useEffect(() => {
    if (!p) return;
    const O = Math.round(p + Y), ae = Math.round(p + q);
    ve((ce) => {
      var He, Ge;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      let je = [...ce.keyframes], $e = !1, Me = je.find((We) => We.tag === "cut-in");
      if (Me)
        Me.timestampEpochMs !== O && (Me.timestampEpochMs = O, $e = !0);
      else {
        const We = je.find((De) => Math.abs(De.timestampEpochMs - O) < 500);
        if (We)
          We.tag = "cut-in", We.timestampEpochMs = O, $e = !0;
        else {
          const De = ((He = je[0]) == null ? void 0 : He.layout) || V || { width: 1920, height: 1080, placements: [] };
          je.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: O,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(De))
          }), $e = !0;
        }
      }
      let Se = je.find((We) => We.tag === "cut-out");
      if (Se)
        Se.timestampEpochMs !== ae && (Se.timestampEpochMs = ae, $e = !0);
      else {
        const We = je.find((De) => Math.abs(De.timestampEpochMs - ae) < 500 && De.tag !== "cut-in");
        if (We)
          We.tag = "cut-out", We.timestampEpochMs = ae, $e = !0;
        else {
          const De = ((Ge = je[je.length - 1]) == null ? void 0 : Ge.layout) || V || { width: 1920, height: 1080, placements: [] };
          je.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: ae,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(De))
          }), $e = !0;
        }
      }
      return $e ? (je.sort((We, De) => We.timestampEpochMs - De.timestampEpochMs), {
        ...ce,
        keyframes: je
      }) : ce;
    });
  }, [p, Y, q, V]);
  const { allStations: J, recordingSegments: ie, isLoadingStations: Fe, movieBoundaries: Je } = Zy(
    p,
    f,
    t,
    r,
    E
  ), _e = i.useMemo(() => J.find((O) => O.id === E) || null, [J, E]), pt = i.useCallback((O) => {
    H((ae) => {
      const ce = !(ae[O] ?? !0);
      return ve((je) => {
        if (!(je != null && je.keyframes)) return je;
        const $e = je.keyframes.map((Me) => {
          var We;
          const Se = ((We = Me.layout) == null ? void 0 : We.placements) || [];
          let He = !1;
          const Ge = Se.map((De) => {
            if (De.stationId === O) {
              if (!ce && (De.displayId === "auto" || !De.displayId)) {
                He = !0;
                const Ye = J.find((Pe) => Pe.id === O);
                return {
                  ...De,
                  displayId: "mon-0",
                  label: `${(Ye == null ? void 0 : Ye.displayName) || O} - Screen 1 (Main)`
                };
              } else if (ce && (De.displayId === "mon-0" || !De.displayId) && Se.filter((Pe) => Pe.stationId === O).length === 1) {
                He = !0;
                const Pe = J.find((Ve) => Ve.id === O);
                return {
                  ...De,
                  displayId: "auto",
                  label: `${(Pe == null ? void 0 : Pe.displayName) || O} - Central Composition (Auto-Director)`
                };
              }
            }
            return De;
          });
          return He ? {
            ...Me,
            layout: {
              ...Me.layout,
              placements: Ge
            }
          } : Me;
        });
        return { ...je, keyframes: $e };
      }), {
        ...ae,
        [O]: ce
      };
    });
  }, [J]), st = i.useCallback((O, ae) => {
    ve((ce) => {
      var De, Ye;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      const je = Oe >= 0 && Oe < ce.keyframes.length ? Oe : 0, $e = ce.keyframes[je], Me = ((De = $e == null ? void 0 : $e.layout) == null ? void 0 : De.placements) || [], Se = (ae || "mon-0").toLowerCase(), He = Me.findIndex((Pe) => {
        if (Pe.stationId !== O) return !1;
        const Ve = (Pe.displayId || "mon-0").toLowerCase();
        return Ve === Se || Ve === "auto" && (Se === "mon-0" || Se === "screen-0");
      });
      let Ge;
      if (He >= 0)
        Ge = Me.filter((Pe, Ve) => Ve !== He);
      else {
        const Pe = J.find((me) => me.id === O), Ve = ((Ye = Pe == null ? void 0 : Pe.displays) == null ? void 0 : Ye.find((me) => (me.displayId || "").toLowerCase() === Se)) || { width: 1920, height: 1080 }, Bt = Ve.width || 1920, kt = Ve.height || 1080, ft = Bt / kt, ds = ft >= 1 ? 640 : Math.round(360 * ft), wt = ft >= 1 ? Math.round(640 / ft) : 360, Dt = {
          stationId: O,
          displayId: Se,
          label: `${(Pe == null ? void 0 : Pe.displayName) || O} - ${Ve.displayName || Se}`,
          x: 120 + Me.length * 40 % 800,
          y: 100 + Me.length * 40 % 500,
          width: ds,
          height: wt,
          sourceWidth: Bt,
          sourceHeight: kt,
          nativeAspectRatio: ft,
          aspectRatio: ft,
          zIndex: Me.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ge = [...Me, Dt];
      }
      const We = [...ce.keyframes];
      return We[je] = {
        ...We[je],
        layout: {
          ...We[je].layout,
          placements: Ge
        }
      }, { ...ce, keyframes: We };
    });
  }, [Oe, J]), ct = i.useMemo(() => !v || v.length === 0 ? [] : J.filter((O) => v.includes(O.id)), [J, v]);
  i.useEffect(() => {
    !p || isNaN(p) || ve((O) => {
      if (O != null && O.keyframes && O.keyframes.length > 0) return O;
      const ae = p + (Y || 0), ce = p + (q || f || 36e5), je = V || {
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
            id: `kf_root_${ae}`,
            timestampEpochMs: Math.round(ae),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(je))
          },
          {
            id: `kf_out_${ce}`,
            timestampEpochMs: Math.round(ce),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(je))
          }
        ]
      };
    });
  }, [p, Y, q, f, V]), i.useEffect(() => {
    if (!ct || ct.length === 0 || !p || isNaN(p)) return;
    const O = p, ae = p + (f || 36e5);
    if (ae <= O) return;
    const ce = new AbortController(), je = setTimeout(() => {
      ct.forEach(($e) => {
        tl.fetchWaveform($e.id, O, ae, ce.signal, 250);
      });
    }, 300);
    return () => {
      clearTimeout(je), ce.abort();
    };
  }, [ct, p, f]);
  const Ze = i.useMemo(() => J.find((O) => O.id === k) || null, [J, k]), Gt = !!(k && Ze), tn = i.useRef("grid"), Tt = i.useRef(null), {
    playheadMs: mt,
    setPlayheadMs: Rt,
    isPlaying: at,
    setIsPlaying: gt,
    playbackSpeed: fn,
    setPlaybackSpeed: It,
    isLooping: qt,
    setIsLooping: Ut,
    togglePlaySmart: Ke
  } = e1({
    timelineBaseEpochMs: p,
    inPointMs: Y,
    outPointMs: q,
    globalGaps: S,
    activeStation: _e,
    spotlightStation: Ze,
    recordingSegments: ie,
    initialPlayheadMs: L,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !E
  }), {
    zoomLevel: fe,
    setZoomLevel: Ue,
    viewportStartMs: vt,
    setViewportStartMs: he,
    resetZoom: te,
    fitRange: de,
    jumpViewportTo: Ce
  } = n1({
    containerRef: Tt,
    totalTimelineDurationMs: f,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [Be, et] = i.useState(!1), [rt, Nt] = i.useState(!1), [it, dt] = i.useState(!1), [Kt, _t] = i.useState(!1), [Qt, Jt] = i.useState(
    !!(e.isWorkspaceActive && ((ul = e.selectedStationIds) == null ? void 0 : ul.length) > 0)
  ), [xn, yn] = i.useState([]), is = i.useMemo(() => ct && ct.length > 0 ? ct : _e ? [_e] : Ze ? [Ze] : [], [ct, _e, Ze]), Jn = i.useMemo(() => is.map((O) => `${O.id}:${O.hostname || O.id}:${O.displayName || ""}`).join("|"), [is]);
  i.useEffect(() => {
    const ae = (o || "NONE").toUpperCase().replace("-", "_") === "BURN_IN" || c;
    if (!is.length || !p || !ae) {
      yn([]);
      return;
    }
    const ce = Math.max(0, p - 5e3), je = p + f + 5e3, $e = new AbortController(), Me = is.map((Se) => {
      const He = Se.hostname || Se.displayName || Se.id, Ge = Se.displayName || Se.hostname || Se.name || Se.id;
      return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(He)}&startEpoch=${ce}&endEpoch=${je}`, { signal: $e.signal }).then((We) => We.ok ? We.json() : []).then((We) => (Array.isArray(We) ? We : []).map((De) => ({
        ...De,
        stationId: Se.id,
        stationName: Ge,
        stationHostname: Se.hostname || Se.id
      }))).catch((We) => {
        if (We.name !== "AbortError") return [];
        throw We;
      });
    });
    return Promise.all(Me).then((Se) => {
      const He = Se.flat();
      He.sort((Ge, We) => (Ge.epochMs || 0) - (We.epochMs || 0)), yn(He);
    }).catch((Se) => {
      Se.name !== "AbortError" && yn([]);
    }), () => $e.abort();
  }, [Jn, p, f, o, c]), i.useEffect(() => {
    Fe || (J.length === 0 ? ((v.length > 0 || E || Qt) && (b([]), D(null), m(null), Jt(!1)), _t(!0), g(!0)) : (g(!1), b((O) => {
      const ae = O.filter((ce) => J.some((je) => je.id === ce));
      return ae.length !== O.length ? (ae.length === 0 && (Jt(!1), _t(!0)), ae) : O;
    })));
  }, [Fe, J]);
  const cs = i.useCallback((O) => {
    if (O === null) {
      gt(!1), It(1), D(null);
      return;
    }
    O !== E && It(1), D(O);
  }, [E, gt, It]), vs = i.useCallback((O, ae = null) => {
    O !== E && It(1), tn.current = v.length <= 1 || E ? "spotlight" : "grid", D(O), m(O), M(ae || null);
  }, [E, v.length, It]), cl = i.useCallback(() => {
    m(null), M(null), tn.current === "grid" && D(null);
  }, []), nn = i.useMemo(() => {
    if (T != null && T.segments && T.segments.length > 0)
      return T;
    const O = v[0] || E || "mon-0";
    return {
      segments: [
        {
          startEpochMs: p,
          endEpochMs: p + f,
          sourceStationId: O
        }
      ]
    };
  }, [T, v, E, p, f]), Ws = i.useCallback((O) => {
    B((ae) => {
      const ce = ae || nn, je = [...ce.segments || []], $e = je.findIndex((Ye) => {
        const Pe = Ye.startEpochMs ?? Ye.StartEpochMs ?? 0, Ve = Ye.endEpochMs ?? Ye.EndEpochMs ?? 0;
        return O > Pe + 500 && O < Ve - 500;
      });
      if ($e === -1) return ae;
      const Me = je[$e], Se = Me.startEpochMs ?? Me.StartEpochMs ?? 0, He = Me.endEpochMs ?? Me.EndEpochMs ?? 0, Ge = Me.sourceStationId ?? Me.SourceStationId ?? v[0], We = { startEpochMs: Se, endEpochMs: O, sourceStationId: Ge }, De = { startEpochMs: O, endEpochMs: He, sourceStationId: Ge };
      return je.splice($e, 1, We, De), { ...ce, segments: je };
    });
  }, [nn, v]), Gl = i.useCallback((O, ae) => {
    B((ce) => {
      const je = ce || nn, $e = (je.segments || []).map((Me) => {
        const Se = Me.startEpochMs ?? Me.StartEpochMs ?? 0, He = Me.endEpochMs ?? Me.EndEpochMs ?? 0;
        return O >= Se && O <= He ? { ...Me, sourceStationId: ae } : Me;
      });
      return { ...je, segments: $e };
    }), we(!1);
  }, [nn]), Ql = i.useCallback((O, ae) => {
    B((ce) => {
      const je = ce || nn, $e = (je.segments || []).map((Me) => {
        const Se = Me.startEpochMs ?? Me.StartEpochMs ?? 0, He = Me.endEpochMs ?? Me.EndEpochMs ?? 0;
        return O >= Se && O <= He ? { ...Me, gain: ae } : Me;
      });
      return { ...je, segments: $e };
    });
  }, [nn]), er = i.useCallback(() => {
    we((O) => !O);
  }, []), [qn, Ln] = i.useState({}), On = i.useCallback((O) => {
    if (!O) return null;
    if (qn[O]) return qn[O];
    const ae = J.find((ce) => ce.id === O);
    return ae != null && ae.directorPlan ? ae.directorPlan : {
      stationId: O,
      segments: [
        {
          startEpochMs: p,
          endEpochMs: p + f,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [qn, J, p, f]), tr = i.useCallback((O, ae) => {
    O && Ln((ce) => {
      const je = ce[O] || On(O), $e = [...je.segments || []], Me = $e.findIndex((Ve) => {
        const Bt = Ve.startEpochMs ?? Ve.StartEpochMs ?? 0, kt = Ve.endEpochMs ?? Ve.EndEpochMs ?? 0;
        return ae > Bt + 500 && ae < kt - 500;
      });
      if (Me === -1) return ce;
      const Se = $e[Me], He = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Ge = Se.endEpochMs ?? Se.EndEpochMs ?? 0, We = Se.targetDisplayId ?? Se.TargetDisplayId ?? "mon-0", De = !!(Se.isManualOverride ?? Se.IsManualOverride), Ye = { ...Se, startEpochMs: He, endEpochMs: ae, targetDisplayId: We, isManualOverride: De }, Pe = { ...Se, startEpochMs: ae, endEpochMs: Ge, targetDisplayId: We, isManualOverride: De };
      return $e.splice(Me, 1, Ye, Pe), { ...ce, [O]: { ...je, segments: $e } };
    });
  }, [On]), dn = i.useCallback((O, ae, ce) => {
    O && Ln((je) => {
      const $e = je[O] || On(O), Me = [...$e.segments || []];
      let Se = Me.findIndex((Ge) => {
        const We = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, De = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ae > We && ae < De;
      });
      if (Se === -1 && (Se = Me.findIndex((Ge) => {
        const We = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, De = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ae >= We && ae <= De;
      })), Se === -1) return je;
      const He = Me[Se];
      return Me[Se] = { ...He, targetDisplayId: ce, isManualOverride: !0 }, { ...je, [O]: { ...$e, segments: Me } };
    });
  }, [On]), En = i.useCallback((O, ae) => {
    if (!O) return;
    const ce = J.find(($e) => $e.id === O), je = ce == null ? void 0 : ce.directorPlan;
    Ln(($e) => {
      var Bt;
      const Me = $e[O] || On(O), Se = [...Me.segments || []];
      let He = Se.findIndex((kt) => {
        const ft = kt.startEpochMs ?? kt.StartEpochMs ?? 0, ds = kt.endEpochMs ?? kt.EndEpochMs ?? 0;
        return ae > ft && ae < ds;
      });
      if (He === -1 && (He = Se.findIndex((kt) => {
        const ft = kt.startEpochMs ?? kt.StartEpochMs ?? 0, ds = kt.endEpochMs ?? kt.EndEpochMs ?? 0;
        return ae >= ft && ae <= ds;
      })), He === -1) return $e;
      const Ge = Se[He], We = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, De = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0, Ye = (We + De) / 2, Pe = (Bt = je == null ? void 0 : je.segments) == null ? void 0 : Bt.find((kt) => {
        const ft = kt.startEpochMs ?? kt.StartEpochMs ?? 0, ds = kt.endEpochMs ?? kt.EndEpochMs ?? 0;
        return Ye >= ft && Ye <= ds;
      }), Ve = Pe ? Pe.targetDisplayId ?? Pe.TargetDisplayId ?? "mon-0" : "mon-0";
      return Se[He] = { ...Ge, targetDisplayId: Ve, isManualOverride: !1 }, { ...$e, [O]: { ...Me, segments: Se } };
    });
  }, [J, On]);
  i.useEffect(() => {
    if (!ct || ct.length === 0 || isNaN(p)) return;
    const O = p + Y, ae = p + q;
    if (ae <= O) return;
    const ce = setTimeout(async () => {
      const je = ct.filter(($e) => {
        var Se;
        return ($e.displays || $e.Displays || ((Se = $e.displayTopology) == null ? void 0 : Se.displays) || []).length > 1;
      });
      if (je.length !== 0)
        for (const $e of je)
          try {
            const Me = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent($e.id)}&startEpoch=${O}&endEpoch=${ae}`);
            if (Me.ok) {
              const Se = await Me.json();
              Se != null && Se.segments && Se.segments.length > 0 && Ln((He) => {
                const Ge = He[$e.id] || $e.directorPlan, We = ((Ge == null ? void 0 : Ge.segments) || []).filter((Ye) => Ye.isManualOverride || Ye.IsManualOverride);
                if (We.length === 0)
                  return { ...He, [$e.id]: Se };
                const De = [...Se.segments];
                return We.forEach((Ye) => {
                  const Pe = Ye.startEpochMs ?? Ye.StartEpochMs, Ve = Ye.endEpochMs ?? Ye.EndEpochMs;
                  for (let Bt = De.length - 1; Bt >= 0; Bt--) {
                    const kt = De[Bt].startEpochMs ?? De[Bt].StartEpochMs, ft = De[Bt].endEpochMs ?? De[Bt].EndEpochMs;
                    if (!(ft <= Pe || kt >= Ve))
                      if (kt >= Pe && ft <= Ve)
                        De.splice(Bt, 1);
                      else if (kt < Pe && ft > Ve) {
                        const ds = { ...De[Bt], endEpochMs: Pe }, wt = { ...De[Bt], startEpochMs: Ve };
                        De.splice(Bt, 1, ds, wt);
                      } else kt < Pe ? De[Bt].endEpochMs = Pe : ft > Ve && (De[Bt].startEpochMs = Ve);
                  }
                  De.push(Ye);
                }), De.sort((Ye, Pe) => (Ye.startEpochMs ?? Ye.StartEpochMs) - (Pe.startEpochMs ?? Pe.StartEpochMs)), { ...He, [$e.id]: { ...Se, segments: De } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(ce);
  }, [Y, q, ct, p]);
  const kn = i.useMemo(() => ct.map((O) => ({
    ...O,
    directorPlan: qn[O.id] || O.directorPlan || On(O.id)
  })), [ct, qn, On]), Lt = i.useMemo(() => _e ? {
    ..._e,
    directorPlan: qn[_e.id] || _e.directorPlan || On(_e.id)
  } : null, [_e, qn, On]), Or = i.useMemo(() => Ze ? {
    ...Ze,
    directorPlan: qn[Ze.id] || Ze.directorPlan || On(Ze.id)
  } : null, [Ze, qn, On]), Un = (O, ae = 30) => {
    const ce = Math.max(0, O), je = Math.floor(ce / 1e3), $e = Math.floor(je / 3600), Me = Math.floor(je % 3600 / 60), Se = je % 60, He = Math.floor(ce % 1e3 / 1e3 * ae), Ge = (We) => String(We).padStart(2, "0");
    return `${Ge($e)}:${Ge(Me)}:${Ge(Se)}.${Ge(He)}`;
  }, [Vt, Ns] = i.useState(!1), [Dr, Ts] = i.useState(!0), [Pr, Jl] = i.useState(!1), Ot = i.useRef(null), mn = i.useMemo(() => {
    var je;
    const O = ye == null ? void 0 : ye.keyframes, ae = (O == null ? void 0 : O[Oe]) || (O == null ? void 0 : O[0]);
    return (((je = ae == null ? void 0 : ae.layout) == null ? void 0 : je.placements) || (V == null ? void 0 : V.placements) || []).length > 0 || v && v.length > 0;
  }, [ye, Oe, V, v]), nr = i.useCallback(() => {
    Ot.current && clearTimeout(Ot.current), Ts(!0), Ot.current = setTimeout(() => {
      Pr || Ts(!1);
    }, 2500);
  }, [Pr]);
  i.useEffect(() => {
    if (!Vt) {
      Ts(!0), Ot.current && clearTimeout(Ot.current);
      return;
    }
    const O = (ae) => {
      ae.clientY >= window.innerHeight - 280 && Ts(!0), nr();
    };
    return window.addEventListener("mousemove", O, { passive: !0 }), nr(), () => {
      window.removeEventListener("mousemove", O), Ot.current && clearTimeout(Ot.current);
    };
  }, [Vt, nr]);
  const Yt = i.useCallback(() => {
    Ns((O) => {
      const ae = !O;
      return ae ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), ae;
    });
  }, []), _r = i.useCallback(() => {
    Ns(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  i.useEffect(() => {
    var O, ae, ce, je;
    return Vt ? ((ae = (O = document.body) == null ? void 0 : O.classList) == null || ae.add("is-studio-fullscreen"), window.dispatchEvent(new CustomEvent("itb:studio-fullscreen-change", {
      detail: { isFullscreen: !0 }
    }))) : ((je = (ce = document.body) == null ? void 0 : ce.classList) == null || je.remove("is-studio-fullscreen"), window.dispatchEvent(new CustomEvent("itb:studio-fullscreen-change", {
      detail: { isFullscreen: !1 }
    }))), () => {
      var $e, Me;
      (Me = ($e = document.body) == null ? void 0 : $e.classList) == null || Me.remove("is-studio-fullscreen");
    };
  }, [Vt]), i.useEffect(() => {
    const O = () => {
      !document.fullscreenElement && Vt && Ns(!1);
    };
    return document.addEventListener("fullscreenchange", O), () => document.removeEventListener("fullscreenchange", O);
  }, [Vt]);
  const [Ct, us] = i.useState("timeline");
  s1({
    activeFocusZone: Ct,
    activeStationId: E,
    spotlightStationId: k,
    timelineStations: kn,
    selectedStationIdsCount: v.length,
    onSelectActiveStation: cs,
    setPlaybackSpeed: It,
    playheadMs: mt,
    setPlayheadMs: Rt,
    inPointMs: Y,
    setInPointMs: Z,
    outPointMs: q,
    setOutPointMs: le,
    totalTimelineDurationMs: f,
    zoomLevel: fe,
    togglePlaySmart: Ke,
    onToggleHelpModal: () => dt((O) => !O),
    onSplitDirectorAtPlayhead: () => {
      var ae, ce, je;
      const O = E || (v.length === 1 ? v[0] : null);
      if (O) {
        const $e = J.find((Se) => Se.id === O);
        (((ae = $e == null ? void 0 : $e.displays) == null ? void 0 : ae.length) > 1 || ((je = (ce = $e == null ? void 0 : $e.topology) == null ? void 0 : ce.displays) == null ? void 0 : je.length) > 1) && tr(O, p + mt);
      }
    },
    isModalActive: Be || rt || it,
    hasGridPlacements: mn,
    onToggleGridFullscreen: Yt,
    isGridFullscreen: Vt,
    onExitGridFullscreen: _r
  }), i.useEffect(() => {
    const O = p + Y, ae = p + q, ce = p + mt;
    xm({
      timeRange: t,
      timeMode: r,
      inPointMs: Y,
      outPointMs: q,
      playheadMs: Math.round(mt),
      inEpochMs: O,
      outEpochMs: ae,
      playheadEpochMs: ce,
      selectedStationIds: v,
      activeStationId: E,
      zoomLevel: fe,
      viewportStartMs: vt,
      isWorkspaceActive: Qt,
      isLooping: qt,
      playbackSpeed: fn,
      keystrokeMode: o,
      showRulerKeystrokes: c,
      compositionScope: _,
      compositionLayout: I,
      isAutoDirectorEnabled: ne,
      isPipSwapped: P,
      audioRoutingPlan: nn,
      isAutoFollowAudio: U,
      canvasLayoutTimeline: ye
    });
  }, [
    t,
    r,
    Y,
    q,
    mt,
    v,
    E,
    fe,
    vt,
    Qt,
    qt,
    fn,
    p,
    o,
    c,
    _,
    I,
    ne,
    P,
    nn,
    U,
    ye
  ]);
  const ql = i.useCallback((O) => {
    var We, De;
    const ae = po(O.startTime), ce = po(O.endTime), je = Math.max(0, ce - ae) || 144e5, $e = {
      start: O.startTime,
      end: O.endTime,
      durationMs: je,
      startEpochMs: ae,
      endEpochMs: ce
    }, Me = Math.max(6e4, Math.round(je * 0.05)), Se = ae - Me, He = je + 2 * Me;
    if (n($e), O.inEpochMs && O.outEpochMs) {
      const Ye = Math.max(0, Math.min(He, O.inEpochMs - Se)), Pe = Math.max(Ye + 1e3, Math.min(He, O.outEpochMs - Se)), Ve = O.playheadEpochMs ? Math.max(0, Math.min(He, O.playheadEpochMs - Se)) : Ye;
      Z(Ye), le(Pe), Rt(Ve);
    } else {
      const Ye = typeof O.inPointMs == "number" ? O.inPointMs : Me, Pe = typeof O.outPointMs == "number" ? O.outPointMs : Me + je, Ve = typeof O.playheadMs == "number" ? O.playheadMs : Ye;
      Z(Math.max(0, Math.min(He, Ye))), le(Math.max(0, Math.min(He, Pe))), Rt(Math.max(0, Math.min(He, Ve)));
    }
    const Ge = ((We = O.selectedStationIds) == null ? void 0 : We.length) > 0 ? O.selectedStationIds : ((De = O.cutStationIds) == null ? void 0 : De.length) > 0 ? O.cutStationIds : O.stationIds;
    if ((Ge == null ? void 0 : Ge.length) > 0) {
      b(Ge);
      const Ye = O.spotlightStationId || O.SpotlightStationId || null, Pe = O.activeStationId || O.ActiveStationId || null;
      Ye && Ge.includes(Ye) ? (D(Ye), m(Ye)) : Pe && Ge.includes(Pe) ? (D(Pe), m(null)) : (D(null), m(null));
    }
    O.keystrokeMode && a(O.keystrokeMode), Jt(!0), _t(!1);
  }, []), Le = i.useCallback((O) => {
    const ae = O.startEpochMs || po(O.start, null, r), ce = O.endEpochMs || po(O.end, null, r), je = Math.max(0, ce - ae) || 144e5, $e = Math.max(6e4, Math.round(je * 0.05)), Me = ae - $e, Se = je + 2 * $e;
    n({
      ...O,
      startEpochMs: ae,
      endEpochMs: ce,
      durationMs: je
    }), g(!1), Z($e), le($e + je), Rt($e), ve((He) => {
      if (!(He != null && He.keyframes) || He.keyframes.length === 0) return He;
      const Ge = He.keyframes.map((We, De) => De === 0 ? { ...We, timestampEpochMs: Me } : We).filter((We) => We.timestampEpochMs >= Me && We.timestampEpochMs <= Me + Se);
      return { ...He, keyframes: Ge };
    }), B((He) => {
      if (!(He != null && He.segments) || He.segments.length === 0) return He;
      if (!He.segments.some((We) => {
        const De = We.startEpochMs ?? We.StartEpochMs ?? 0;
        return (We.endEpochMs ?? We.EndEpochMs ?? 0) > Me && De < Me + Se;
      })) {
        const We = v[0] || E || "station-0";
        return {
          segments: [
            {
              startEpochMs: Me,
              endEpochMs: Me + Se,
              sourceStationId: We
            }
          ]
        };
      }
      return He;
    }), Ln({});
  }, [r, v, E]), Re = i.useCallback(() => {
    if (ct.map((ae) => ae.id).length === 0) return alert("No active stations selected in timeline.");
    z(!0);
  }, [ct]), pd = i.useCallback(async (O, ae, ce = "") => {
    var Ge, We, De, Ye;
    const je = ct.map((Pe) => Pe.id);
    if (je.length === 0) return;
    let $e = O === "None" ? "None" : "BurnIn";
    const Me = ae || "NATIVE", Se = {};
    ct.forEach((Pe) => {
      var Bt;
      const Ve = qn[Pe.id] || Pe.directorPlan;
      ((Bt = Ve == null ? void 0 : Ve.segments) == null ? void 0 : Bt.length) > 0 && (Se[Pe.id] = Ve.segments.map((kt) => ({
        startEpochMs: kt.startEpochMs ?? kt.StartEpochMs ?? 0,
        endEpochMs: kt.endEpochMs ?? kt.EndEpochMs ?? 0,
        targetDisplayId: kt.targetDisplayId ?? kt.TargetDisplayId ?? "mon-0",
        targetDisplayNumber: kt.targetDisplayNumber ?? kt.TargetDisplayNumber ?? 1,
        targetDisplayName: kt.targetDisplayName ?? kt.TargetDisplayName ?? "Screen 1",
        isManualOverride: !!(kt.isManualOverride ?? kt.IsManualOverride)
      })));
    });
    const He = Se[Lt == null ? void 0 : Lt.id] || ((Ge = Lt == null ? void 0 : Lt.displays) == null ? void 0 : Ge.length) > 1 || ((De = (We = Lt == null ? void 0 : Lt.topology) == null ? void 0 : We.displays) == null ? void 0 : De.length) > 1 ? ((Ye = Lt == null ? void 0 : Lt.directorPlan) == null ? void 0 : Ye.segments) || [] : [];
    try {
      const Pe = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: Im(),
          notes: (ce || "").trim(),
          stationIds: je,
          inEpochMs: p + Y,
          outEpochMs: p + q,
          keystrokeMode: $e,
          resolution: Me || (ye == null ? void 0 : ye.resolution) || (V == null ? void 0 : V.resolution) || "2K",
          videoQuality: Me || (ye == null ? void 0 : ye.resolution) || (V == null ? void 0 : V.resolution) || "2K",
          compositionScope: _,
          layoutMode: "canvas",
          canvasLayout: V,
          canvasLayoutTimeline: ye || (V == null ? void 0 : V.timeline) || null,
          isPipSwapped: P,
          isAutoDirectorEnabled: ne,
          directorSegments: He,
          stationDirectorSegments: Se,
          audioRoutingSegments: nn.segments || [],
          utcClockPosition: (() => {
            var Ve, Bt;
            if ((Bt = (Ve = ye == null ? void 0 : ye.keyframes) == null ? void 0 : Ve[0]) != null && Bt.utcClockPosition)
              return ye.keyframes[0].utcClockPosition;
            if (V != null && V.utcClockPosition)
              return V.utcClockPosition;
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!Pe.ok) {
        const Ve = await Pe.json().catch(() => ({}));
        throw new Error(Ve.message || Ve.error || `HTTP ${Pe.status}`);
      }
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (Pe) {
      console.error("[Studio] Export failed:", Pe), alert(`Failed to launch background master MP4 export job: ${Pe.message}`);
    }
  }, [ct, p, Y, q, _, V, ye, P, ne, Lt, nn]), Br = i.useCallback(() => {
    Ax();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const O = Jh(), ae = Math.max(6e4, Math.round(O.durationMs * 0.05));
    n(O), Z(ae), le(ae + O.durationMs), Rt(ae), b([]), D(null), m(null), gt(!1), It(1), a("BURN_IN"), te(), Jt(!1), _t(!0);
  }, [te, gt, It, Rt]), sr = !Qt || v.length === 0, Wr = p + mt;
  return i.useEffect(() => {
    const O = ye == null ? void 0 : ye.keyframes;
    if (!O || O.length === 0) return;
    let ae = 0;
    for (let ce = 0; ce < O.length && O[ce].timestampEpochMs <= Wr + 50; ce++)
      ae = ce;
    ae !== Oe && xe(ae);
  }, [Wr, ye == null ? void 0 : ye.keyframes, Oe]), /* @__PURE__ */ s.jsxs("div", { className: `extractor-advanced-studio ${Vt ? "is-cinema-mode" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Mx,
        {
          timeRange: t,
          baseEpochMs: h,
          timeMode: r,
          setTimeMode: l,
          activeStationId: E,
          hideBackToGrid: ct.length <= 1,
          onResetActiveStation: () => cs(null),
          onOpenRangeModal: () => et(!0),
          onOpenBookmarksModal: () => Nt(!0),
          onOpenHelpModal: () => dt(!0),
          onToggleDrawer: () => _t(!Kt),
          isInitialSetup: sr,
          selectedCount: v.length,
          totalCount: J.length,
          onResetStudio: Br
        }
      ),
      N && /* @__PURE__ */ s.jsxs("div", { className: "studio-scope-alert-banner", children: [
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
              onClick: () => et(!0),
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
              onClick: () => g(!1),
              title: "Dismiss Alert",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${Vt ? "cinema-fullscreen-mode" : ""}`, children: [
        Vt && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${Dr ? "" : "is-hud-hidden"}`, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "top-hud-left-group", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-exit-spotlight",
                onClick: _r,
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
                onClick: () => dt(!0),
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
              kn.length,
              " ACTIVE WORKSTATIONS"
            ] })
          ] })
        ] }),
        !sr && /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "studio-left-content",
            onMouseDown: (O) => {
              O.target.closest(".studio-bottom-timeline, .transport-bar-root, .transport-bar, .timeline-board") && us("timeline");
            },
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
                /* @__PURE__ */ s.jsx(
                  ty,
                  {
                    activeStation: Lt,
                    timelineStations: kn,
                    allStations: J,
                    onSelectActiveStation: cs,
                    onOpenSpotlight: vs,
                    onStationContextMenu: ze,
                    onDeselectStation: Ae,
                    stationAutoDirectorMap: St,
                    onToggleStationAutoDirector: pt,
                    onOpenDrawer: () => _t(!0),
                    baseEpochMs: p,
                    playheadMs: mt,
                    playheadEpochMs: Wr,
                    timeMode: r,
                    isPlaying: Gt ? !1 : at,
                    setIsPlaying: gt,
                    totalDurationMs: f,
                    inPointMs: Y,
                    outPointMs: q,
                    setPlayheadMs: Rt,
                    globalGaps: S,
                    recordingSegments: ie,
                    playbackSpeed: fn,
                    onChangePlaybackSpeed: It,
                    keystrokeMode: o,
                    keystrokes: xn,
                    directorPlan: Lt == null ? void 0 : Lt.directorPlan,
                    onOverrideDisplay: dn,
                    onResetOverride: En,
                    compositionScope: _,
                    onChangeCompositionScope: G,
                    compositionLayout: I,
                    onChangeCompositionLayout: se,
                    isAutoDirectorEnabled: ne,
                    onToggleAutoDirector: () => re((O) => !O),
                    isPipSwapped: P,
                    onTogglePipSwap: () => F((O) => !O),
                    onUpdateCanvasLayout: ge,
                    canvasLayoutTimeline: ye,
                    onUpdateCanvasLayoutTimeline: ve,
                    activeKfIndex: Oe,
                    setActiveKfIndex: xe,
                    isModalOpen: K || Be || rt || Gt || it,
                    isGridFullscreen: Vt,
                    onToggleGridFullscreen: Yt,
                    activeFocusZone: Ct,
                    onFocusZoneChange: us
                  }
                ),
                !Vt && /* @__PURE__ */ s.jsx(
                  xu,
                  {
                    activeFocusZone: Ct,
                    onFocusZoneChange: us,
                    hasGridPlacements: mn,
                    baseEpochMs: p,
                    timeMode: r,
                    totalDurationMs: f,
                    playheadMs: mt,
                    setPlayheadMs: Rt,
                    inPointMs: Y,
                    setInPointMs: Z,
                    outPointMs: q,
                    setOutPointMs: le,
                    activeStationId: E,
                    isPlaying: at,
                    setIsPlaying: Ke,
                    isLooping: qt,
                    setIsLooping: Ut,
                    playbackSpeed: fn,
                    onChangeSpeed: It,
                    onSetInPoint: () => Z(Math.max(0, Math.min(mt, q - 1e3))),
                    onSetOutPoint: () => le(Math.min(f, Math.max(mt, Y + 1e3))),
                    onStepFrameBackward: () => {
                      gt(!1), Rt((O) => Math.max(0, O - 33));
                    },
                    onStepFrameForward: () => {
                      gt(!1), Rt((O) => Math.min(f, O + 33));
                    }
                  }
                )
              ] }),
              Vt && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "cinema-bottom-sensor-strip",
                  onMouseEnter: () => {
                    Ts(!0), nr();
                  }
                }
              ),
              /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `studio-bottom-timeline ${Vt ? "cinema-timeline-island" : ""} ${Vt && !Dr ? "dock-hidden" : ""} ${Vt && at ? "is-playing-dimmed" : ""}`,
                  ref: Tt,
                  onMouseDown: () => us("timeline"),
                  onMouseEnter: () => Jl(!0),
                  onMouseLeave: () => {
                    Jl(!1), Vt && nr();
                  },
                  children: [
                    Vt && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                          /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                          /* @__PURE__ */ s.jsx("span", { className: "val", children: Un(q - Y) })
                        ] }),
                        /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "btn-export-cut-hero",
                            onClick: Re,
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
                        xu,
                        {
                          activeFocusZone: Ct,
                          onFocusZoneChange: us,
                          hasGridPlacements: mn,
                          baseEpochMs: p,
                          timeMode: r,
                          totalDurationMs: f,
                          playheadMs: mt,
                          setPlayheadMs: Rt,
                          inPointMs: Y,
                          setInPointMs: Z,
                          outPointMs: q,
                          setOutPointMs: le,
                          activeStationId: E,
                          isPlaying: at,
                          setIsPlaying: Ke,
                          isLooping: qt,
                          setIsLooping: Ut,
                          playbackSpeed: fn,
                          onChangeSpeed: It,
                          onSetInPoint: () => Z(Math.max(0, Math.min(mt, q - 1e3))),
                          onSetOutPoint: () => le(Math.min(f, Math.max(mt, Y + 1e3))),
                          onStepFrameBackward: () => {
                            gt(!1), Rt((O) => Math.max(0, O - 33));
                          },
                          onStepFrameForward: () => {
                            gt(!1), Rt((O) => Math.min(f, O + 33));
                          }
                        }
                      ),
                      /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                        /* @__PURE__ */ s.jsx("span", { className: "digits", children: Mt(p + mt, r) })
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      Sm,
                      {
                        stations: kn,
                        activeStationId: E,
                        onSelectActiveStation: (O) => cs(v.length <= 1 ? O : O === E ? null : O),
                        onStationContextMenu: ze,
                        onDeselectStation: Ae,
                        stationAutoDirectorMap: St,
                        onToggleStationAutoDirector: pt,
                        baseEpochMs: p,
                        timeMode: r,
                        totalDurationMs: f,
                        zoomLevel: fe,
                        onZoomChange: Ue,
                        onZoomReset: te,
                        onFitRange: de,
                        onJumpViewportTo: Ce,
                        playheadMs: mt,
                        setPlayheadMs: Rt,
                        inPointMs: Y,
                        setInPointMs: Z,
                        outPointMs: q,
                        setOutPointMs: le,
                        viewportStartMs: vt,
                        onViewportStartChange: he,
                        onExport: Re,
                        recordingSegments: ie,
                        movieBoundaries: Je,
                        onEstimateLoaded: (O) => (O == null ? void 0 : O.removedGlobalGaps) && C(O.removedGlobalGaps),
                        keystrokeMode: o,
                        onChangeKeystrokeMode: a,
                        keystrokes: xn,
                        showKeystrokes: c,
                        showRulerKeystrokes: c,
                        onToggleRulerKeystrokes: () => u((O) => !O),
                        onSplitDirectorSegment: tr,
                        onChangeDirectorSegmentDisplay: dn,
                        onResetDirectorSegmentToAuto: En,
                        audioRoutingPlan: nn,
                        onSplitAudioSegment: Ws,
                        onChangeAudioSegmentStation: Gl,
                        onChangeAudioSegmentGain: Ql,
                        onFollowVisualFeed: er,
                        isAutoFollowAudio: U,
                        canvasLayoutTimeline: ye,
                        activeKfIndex: Oe,
                        onSelectKeyframe: (O, ae) => {
                          xe(O), Rt(Math.max(0, ae - p));
                        },
                        onAddKeyframeAtEpoch: Ee,
                        onDeleteKeyframe: nt,
                        onUpdateKeyframeEpoch: jt,
                        onUpdateKeyframeTransition: tt,
                        onUpdateKeyframeClockPosition: zt,
                        onToggleDisplayOnCanvas: st,
                        onUpdateAudioPlan: B
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        !Vt && /* @__PURE__ */ s.jsx(
          Wy,
          {
            isOpen: Kt || sr,
            onToggle: () => _t(!Kt),
            onClose: () => _t(!1),
            allStations: J,
            selectedStationIds: v,
            onToggleStation: (O) => b((ae) => ae.includes(O) ? ae.filter((ce) => ce !== O) : [...ae, O]),
            onUpdateSelections: b,
            isInitialSetup: sr,
            isLoadingStations: Fe,
            recordingSegments: ie,
            baseEpochMs: h,
            durationMs: t.durationMs,
            onApply: () => {
              v.length > 0 && (D(null), m(null), Jt(!0), _t(!1));
            },
            onOpenRangeModal: () => et(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Hy,
      {
        isOpen: Be,
        onClose: () => et(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: ql,
        onApplyRange: Le
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ky,
      {
        isOpen: rt,
        onClose: () => Nt(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: p,
          timelineBaseEpochMs: p,
          playheadMs: mt,
          inPointMs: Y,
          outPointMs: q,
          selectedStationIds: v,
          selectedStationNames: J.filter((O) => v.includes(O.id)).map((O) => O.displayName || O.hostname || O.id),
          allStationIds: J.map((O) => O.id),
          activeStationId: E,
          activeStationName: (_e == null ? void 0 : _e.displayName) || (_e == null ? void 0 : _e.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: ql
      }
    ),
    /* @__PURE__ */ s.jsx(
      Tm,
      {
        isOpen: it,
        onClose: () => dt(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Qy,
      {
        isOpen: Gt,
        station: Or,
        initialDisplayId: j,
        allStations: kn,
        onSelectStation: (O) => {
          O !== k && It(1), D(O), m(O);
        },
        onClose: cl,
        baseEpochMs: p,
        timeMode: r,
        totalDurationMs: f,
        zoomLevel: fe,
        onZoomChange: Ue,
        onZoomReset: te,
        onFitRange: de,
        onJumpViewportTo: Ce,
        viewportStartMs: vt,
        onViewportStartChange: he,
        playheadMs: mt,
        setPlayheadMs: Rt,
        playheadEpochMs: Wr,
        inPointMs: Y,
        setInPointMs: Z,
        outPointMs: q,
        setOutPointMs: le,
        recordingSegments: ie,
        globalGaps: S,
        isPlaying: at,
        setIsPlaying: gt,
        isLooping: qt,
        setIsLooping: Ut,
        playbackSpeed: fn,
        setPlaybackSpeed: It,
        onExport: Re,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: xn,
        showRulerKeystrokes: c,
        onToggleRulerKeystrokes: () => u((O) => !O),
        directorPlan: Or == null ? void 0 : Or.directorPlan,
        onOverrideDisplay: dn,
        onSplitDirectorSegment: tr,
        onChangeDirectorSegmentDisplay: dn,
        onResetDirectorSegmentToAuto: En
      }
    ),
    /* @__PURE__ */ s.jsx(
      Jy,
      {
        menu: $,
        onClose: () => w(null),
        onDeselect: Ae,
        onFocusSolo: cs
      }
    ),
    /* @__PURE__ */ s.jsx(
      qy,
      {
        isOpen: K,
        onClose: () => z(!1),
        onConfirm: pd,
        compositionSummary: {
          scope: _,
          layout: (V == null ? void 0 : V.preset) || I,
          isPipSwapped: P,
          isAutoDirectorEnabled: ne,
          stationsCount: ct.length,
          audioSegmentsCount: ((Zl = nn == null ? void 0 : nn.segments) == null ? void 0 : Zl.length) || 1,
          resolution: (ye == null ? void 0 : ye.resolution) || (V == null ? void 0 : V.resolution) || "2K",
          canvasWidth: (V == null ? void 0 : V.width) || 2560,
          canvasHeight: (V == null ? void 0 : V.height) || 1440
        }
      }
    ),
    /* @__PURE__ */ s.jsx($m, {})
  ] });
}
const qh = "itb-extractor-advanced-theme", Zh = "itb-global-export-job-monitor-root";
function Am() {
  if (!(typeof document > "u") && !document.getElementById(qh)) {
    const e = document.createElement("link");
    e.id = qh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Am();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Zh);
  if (!t) {
    t = document.createElement("div"), t.id = Zh, document.body.appendChild(t);
    try {
      Wa.createRoot(t).render(pi.createElement($m, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function l1(e, t = {}) {
  Am();
  const n = Wa.createRoot(e);
  return n.render(pi.createElement(r1, t)), () => {
    n.unmount();
  };
}
export {
  $m as ExportJobMonitor,
  r1 as ExtractorAdvancedStudio,
  r1 as default,
  l1 as mount
};
