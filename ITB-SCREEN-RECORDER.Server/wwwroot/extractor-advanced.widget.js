function Xm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qh = { exports: {} }, Tt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vl = Symbol.for("react.element"), Gm = Symbol.for("react.portal"), Qm = Symbol.for("react.fragment"), Jm = Symbol.for("react.strict_mode"), qm = Symbol.for("react.profiler"), Zm = Symbol.for("react.provider"), e0 = Symbol.for("react.context"), t0 = Symbol.for("react.forward_ref"), n0 = Symbol.for("react.suspense"), s0 = Symbol.for("react.memo"), r0 = Symbol.for("react.lazy"), Id = Symbol.iterator;
function o0(e) {
  return e === null || typeof e != "object" ? null : (e = Id && e[Id] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Zh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ef = Object.assign, tf = {};
function Vo(e, t, n) {
  this.props = e, this.context = t, this.refs = tf, this.updater = n || Zh;
}
Vo.prototype.isReactComponent = {};
Vo.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Vo.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function nf() {
}
nf.prototype = Vo.prototype;
function gu(e, t, n) {
  this.props = e, this.context = t, this.refs = tf, this.updater = n || Zh;
}
var xu = gu.prototype = new nf();
xu.constructor = gu;
ef(xu, Vo.prototype);
xu.isPureReactComponent = !0;
var Td = Array.isArray, sf = Object.prototype.hasOwnProperty, yu = { current: null }, rf = { key: !0, ref: !0, __self: !0, __source: !0 };
function of(e, t, n) {
  var r, o = {}, l = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (l = "" + t.key), t) sf.call(t, r) && !rf.hasOwnProperty(r) && (o[r] = t[r]);
  var c = arguments.length - 2;
  if (c === 1) o.children = n;
  else if (1 < c) {
    for (var u = Array(c), d = 0; d < c; d++) u[d] = arguments[d + 2];
    o.children = u;
  }
  if (e && e.defaultProps) for (r in c = e.defaultProps, c) o[r] === void 0 && (o[r] = c[r]);
  return { $$typeof: Vl, type: e, key: l, ref: a, props: o, _owner: yu.current };
}
function l0(e, t) {
  return { $$typeof: Vl, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function vu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Vl;
}
function a0(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var $d = /\/+/g;
function Di(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? a0("" + e.key) : t.toString(36);
}
function ja(e, t, n, r, o) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else switch (l) {
    case "string":
    case "number":
      a = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Vl:
        case Gm:
          a = !0;
      }
  }
  if (a) return a = e, o = o(a), e = r === "" ? "." + Di(a, 0) : r, Td(o) ? (n = "", e != null && (n = e.replace($d, "$&/") + "/"), ja(o, t, n, "", function(d) {
    return d;
  })) : o != null && (vu(o) && (o = l0(o, n + (!o.key || a && a.key === o.key ? "" : ("" + o.key).replace($d, "$&/") + "/") + e)), t.push(o)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Td(e)) for (var c = 0; c < e.length; c++) {
    l = e[c];
    var u = r + Di(l, c);
    a += ja(l, t, n, u, o);
  }
  else if (u = o0(e), typeof u == "function") for (e = u.call(e), c = 0; !(l = e.next()).done; ) l = l.value, u = r + Di(l, c++), a += ja(l, t, n, u, o);
  else if (l === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function na(e, t, n) {
  if (e == null) return e;
  var r = [], o = 0;
  return ja(e, r, "", "", function(l) {
    return t.call(n, l, o++);
  }), r;
}
function i0(e) {
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
var Wn = { current: null }, Ca = { transition: null }, c0 = { ReactCurrentDispatcher: Wn, ReactCurrentBatchConfig: Ca, ReactCurrentOwner: yu };
function lf() {
  throw Error("act(...) is not supported in production builds of React.");
}
Tt.Children = { map: na, forEach: function(e, t, n) {
  na(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return na(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return na(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!vu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Tt.Component = Vo;
Tt.Fragment = Qm;
Tt.Profiler = qm;
Tt.PureComponent = gu;
Tt.StrictMode = Jm;
Tt.Suspense = n0;
Tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = c0;
Tt.act = lf;
Tt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ef({}, e.props), o = e.key, l = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (l = t.ref, a = yu.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
    for (u in t) sf.call(t, u) && !rf.hasOwnProperty(u) && (r[u] = t[u] === void 0 && c !== void 0 ? c[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    c = Array(u);
    for (var d = 0; d < u; d++) c[d] = arguments[d + 2];
    r.children = c;
  }
  return { $$typeof: Vl, type: e.type, key: o, ref: l, props: r, _owner: a };
};
Tt.createContext = function(e) {
  return e = { $$typeof: e0, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Zm, _context: e }, e.Consumer = e;
};
Tt.createElement = of;
Tt.createFactory = function(e) {
  var t = of.bind(null, e);
  return t.type = e, t;
};
Tt.createRef = function() {
  return { current: null };
};
Tt.forwardRef = function(e) {
  return { $$typeof: t0, render: e };
};
Tt.isValidElement = vu;
Tt.lazy = function(e) {
  return { $$typeof: r0, _payload: { _status: -1, _result: e }, _init: i0 };
};
Tt.memo = function(e, t) {
  return { $$typeof: s0, type: e, compare: t === void 0 ? null : t };
};
Tt.startTransition = function(e) {
  var t = Ca.transition;
  Ca.transition = {};
  try {
    e();
  } finally {
    Ca.transition = t;
  }
};
Tt.unstable_act = lf;
Tt.useCallback = function(e, t) {
  return Wn.current.useCallback(e, t);
};
Tt.useContext = function(e) {
  return Wn.current.useContext(e);
};
Tt.useDebugValue = function() {
};
Tt.useDeferredValue = function(e) {
  return Wn.current.useDeferredValue(e);
};
Tt.useEffect = function(e, t) {
  return Wn.current.useEffect(e, t);
};
Tt.useId = function() {
  return Wn.current.useId();
};
Tt.useImperativeHandle = function(e, t, n) {
  return Wn.current.useImperativeHandle(e, t, n);
};
Tt.useInsertionEffect = function(e, t) {
  return Wn.current.useInsertionEffect(e, t);
};
Tt.useLayoutEffect = function(e, t) {
  return Wn.current.useLayoutEffect(e, t);
};
Tt.useMemo = function(e, t) {
  return Wn.current.useMemo(e, t);
};
Tt.useReducer = function(e, t, n) {
  return Wn.current.useReducer(e, t, n);
};
Tt.useRef = function(e) {
  return Wn.current.useRef(e);
};
Tt.useState = function(e) {
  return Wn.current.useState(e);
};
Tt.useSyncExternalStore = function(e, t, n) {
  return Wn.current.useSyncExternalStore(e, t, n);
};
Tt.useTransition = function() {
  return Wn.current.useTransition();
};
Tt.version = "18.3.1";
qh.exports = Tt;
var i = qh.exports;
const fi = /* @__PURE__ */ Xm(i);
var Fa = {}, af = { exports: {} }, os = {}, cf = { exports: {} }, uf = {};
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
  function t(U, Y) {
    var T = U.length;
    U.push(Y);
    e: for (; 0 < T; ) {
      var H = T - 1 >>> 1, z = U[H];
      if (0 < o(z, Y)) U[H] = Y, U[T] = z, T = H;
      else break e;
    }
  }
  function n(U) {
    return U.length === 0 ? null : U[0];
  }
  function r(U) {
    if (U.length === 0) return null;
    var Y = U[0], T = U.pop();
    if (T !== Y) {
      U[0] = T;
      e: for (var H = 0, z = U.length, xe = z >>> 1; H < xe; ) {
        var X = 2 * (H + 1) - 1, V = U[X], K = X + 1, ge = U[K];
        if (0 > o(V, T)) K < z && 0 > o(ge, V) ? (U[H] = ge, U[K] = T, H = K) : (U[H] = V, U[X] = T, H = X);
        else if (K < z && 0 > o(ge, T)) U[H] = ge, U[K] = T, H = K;
        else break e;
      }
    }
    return Y;
  }
  function o(U, Y) {
    var T = U.sortIndex - Y.sortIndex;
    return T !== 0 ? T : U.id - Y.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function() {
      return l.now();
    };
  } else {
    var a = Date, c = a.now();
    e.unstable_now = function() {
      return a.now() - c;
    };
  }
  var u = [], d = [], y = 1, m = null, f = 3, v = !1, M = !1, j = !1, O = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function N(U) {
    for (var Y = n(d); Y !== null; ) {
      if (Y.callback === null) r(d);
      else if (Y.startTime <= U) r(d), Y.sortIndex = Y.expirationTime, t(u, Y);
      else break;
      Y = n(d);
    }
  }
  function b(U) {
    if (j = !1, N(U), !M) if (n(u) !== null) M = !0, se(E);
    else {
      var Y = n(d);
      Y !== null && oe(b, Y.startTime - U);
    }
  }
  function E(U, Y) {
    M = !1, j && (j = !1, k(p), p = -1), v = !0;
    var T = f;
    try {
      for (N(Y), m = n(u); m !== null && (!(m.expirationTime > Y) || U && !W()); ) {
        var H = m.callback;
        if (typeof H == "function") {
          m.callback = null, f = m.priorityLevel;
          var z = H(m.expirationTime <= Y);
          Y = e.unstable_now(), typeof z == "function" ? m.callback = z : m === n(u) && r(u), N(Y);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var xe = !0;
      else {
        var X = n(d);
        X !== null && oe(b, X.startTime - Y), xe = !1;
      }
      return xe;
    } finally {
      m = null, f = T, v = !1;
    }
  }
  var S = !1, w = null, p = -1, $ = 5, C = -1;
  function W() {
    return !(e.unstable_now() - C < $);
  }
  function ee() {
    if (w !== null) {
      var U = e.unstable_now();
      C = U;
      var Y = !0;
      try {
        Y = w(!0, U);
      } finally {
        Y ? I() : (S = !1, w = null);
      }
    } else S = !1;
  }
  var I;
  if (typeof g == "function") I = function() {
    g(ee);
  };
  else if (typeof MessageChannel < "u") {
    var R = new MessageChannel(), ne = R.port2;
    R.port1.onmessage = ee, I = function() {
      ne.postMessage(null);
    };
  } else I = function() {
    O(ee, 0);
  };
  function se(U) {
    w = U, S || (S = !0, I());
  }
  function oe(U, Y) {
    p = O(function() {
      U(e.unstable_now());
    }, Y);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(U) {
    U.callback = null;
  }, e.unstable_continueExecution = function() {
    M || v || (M = !0, se(E));
  }, e.unstable_forceFrameRate = function(U) {
    0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < U ? Math.floor(1e3 / U) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return f;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(U) {
    switch (f) {
      case 1:
      case 2:
      case 3:
        var Y = 3;
        break;
      default:
        Y = f;
    }
    var T = f;
    f = Y;
    try {
      return U();
    } finally {
      f = T;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(U, Y) {
    switch (U) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        U = 3;
    }
    var T = f;
    f = U;
    try {
      return Y();
    } finally {
      f = T;
    }
  }, e.unstable_scheduleCallback = function(U, Y, T) {
    var H = e.unstable_now();
    switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? H + T : H) : T = H, U) {
      case 1:
        var z = -1;
        break;
      case 2:
        z = 250;
        break;
      case 5:
        z = 1073741823;
        break;
      case 4:
        z = 1e4;
        break;
      default:
        z = 5e3;
    }
    return z = T + z, U = { id: y++, callback: Y, priorityLevel: U, startTime: T, expirationTime: z, sortIndex: -1 }, T > H ? (U.sortIndex = T, t(d, U), n(u) === null && U === n(d) && (j ? (k(p), p = -1) : j = !0, oe(b, T - H))) : (U.sortIndex = z, t(u, U), M || v || (M = !0, se(E))), U;
  }, e.unstable_shouldYield = W, e.unstable_wrapCallback = function(U) {
    var Y = f;
    return function() {
      var T = f;
      f = Y;
      try {
        return U.apply(this, arguments);
      } finally {
        f = T;
      }
    };
  };
})(uf);
cf.exports = uf;
var u0 = cf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var d0 = i, rs = u0;
function Ae(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var df = /* @__PURE__ */ new Set(), Ml = {};
function lo(e, t) {
  Fo(e, t), Fo(e + "Capture", t);
}
function Fo(e, t) {
  for (Ml[e] = t, e = 0; e < t.length; e++) df.add(t[e]);
}
var Gs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), mc = Object.prototype.hasOwnProperty, h0 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ad = {}, Rd = {};
function f0(e) {
  return mc.call(Rd, e) ? !0 : mc.call(Ad, e) ? !1 : h0.test(e) ? Rd[e] = !0 : (Ad[e] = !0, !1);
}
function p0(e, t, n, r) {
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
function m0(e, t, n, r) {
  if (t === null || typeof t > "u" || p0(e, t, n, r)) return !0;
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
function Un(e, t, n, r, o, l, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = a;
}
var Mn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Mn[e] = new Un(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Mn[t] = new Un(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Mn[e] = new Un(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Mn[e] = new Un(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Mn[e] = new Un(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Mn[e] = new Un(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Mn[e] = new Un(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Mn[e] = new Un(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Mn[e] = new Un(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Nu = /[\-:]([a-z])/g;
function ku(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Nu,
    ku
  );
  Mn[t] = new Un(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Nu, ku);
  Mn[t] = new Un(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Nu, ku);
  Mn[t] = new Un(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Mn[e] = new Un(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Mn.xlinkHref = new Un("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Mn[e] = new Un(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function wu(e, t, n, r) {
  var o = Mn.hasOwnProperty(t) ? Mn[t] : null;
  (o !== null ? o.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (m0(t, n, o, r) && (n = null), r || o === null ? f0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName, r = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Zs = d0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sa = Symbol.for("react.element"), xo = Symbol.for("react.portal"), yo = Symbol.for("react.fragment"), ju = Symbol.for("react.strict_mode"), gc = Symbol.for("react.profiler"), hf = Symbol.for("react.provider"), ff = Symbol.for("react.context"), Cu = Symbol.for("react.forward_ref"), xc = Symbol.for("react.suspense"), yc = Symbol.for("react.suspense_list"), Eu = Symbol.for("react.memo"), fr = Symbol.for("react.lazy"), pf = Symbol.for("react.offscreen"), Ld = Symbol.iterator;
function nl(e) {
  return e === null || typeof e != "object" ? null : (e = Ld && e[Ld] || e["@@iterator"], typeof e == "function" ? e : null);
}
var un = Object.assign, Pi;
function pl(e) {
  if (Pi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Pi = t && t[1] || "";
  }
  return `
` + Pi + e;
}
var _i = !1;
function Fi(e, t) {
  if (!e || _i) return "";
  _i = !0;
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
      for (var o = d.stack.split(`
`), l = r.stack.split(`
`), a = o.length - 1, c = l.length - 1; 1 <= a && 0 <= c && o[a] !== l[c]; ) c--;
      for (; 1 <= a && 0 <= c; a--, c--) if (o[a] !== l[c]) {
        if (a !== 1 || c !== 1)
          do
            if (a--, c--, 0 > c || o[a] !== l[c]) {
              var u = `
` + o[a].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= a && 0 <= c);
        break;
      }
    }
  } finally {
    _i = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? pl(e) : "";
}
function g0(e) {
  switch (e.tag) {
    case 5:
      return pl(e.type);
    case 16:
      return pl("Lazy");
    case 13:
      return pl("Suspense");
    case 19:
      return pl("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Fi(e.type, !1), e;
    case 11:
      return e = Fi(e.type.render, !1), e;
    case 1:
      return e = Fi(e.type, !0), e;
    default:
      return "";
  }
}
function vc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case yo:
      return "Fragment";
    case xo:
      return "Portal";
    case gc:
      return "Profiler";
    case ju:
      return "StrictMode";
    case xc:
      return "Suspense";
    case yc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ff:
      return (e.displayName || "Context") + ".Consumer";
    case hf:
      return (e._context.displayName || "Context") + ".Provider";
    case Cu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Eu:
      return t = e.displayName || null, t !== null ? t : vc(e.type) || "Memo";
    case fr:
      t = e._payload, e = e._init;
      try {
        return vc(e(t));
      } catch {
      }
  }
  return null;
}
function x0(e) {
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
      return vc(t);
    case 8:
      return t === ju ? "StrictMode" : "Mode";
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
function mf(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function y0(e) {
  var t = mf(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var o = n.get, l = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return o.call(this);
    }, set: function(a) {
      r = "" + a, l.call(this, a);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(a) {
      r = "" + a;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function ra(e) {
  e._valueTracker || (e._valueTracker = y0(e));
}
function gf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = mf(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Wa(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Nc(e, t) {
  var n = t.checked;
  return un({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Od(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Tr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function xf(e, t) {
  t = t.checked, t != null && wu(e, "checked", t, !1);
}
function kc(e, t) {
  xf(e, t);
  var n = Tr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? wc(e, t.type, n) : t.hasOwnProperty("defaultValue") && wc(e, t.type, Tr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Dd(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function wc(e, t, n) {
  (t !== "number" || Wa(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ml = Array.isArray;
function To(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Tr(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        e[o].selected = !0, r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function jc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(Ae(91));
  return un({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Pd(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(Ae(92));
      if (ml(n)) {
        if (1 < n.length) throw Error(Ae(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Tr(n) };
}
function yf(e, t) {
  var n = Tr(t.value), r = Tr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function _d(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function vf(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Cc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? vf(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var oa, Nf = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, o) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, o);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (oa = oa || document.createElement("div"), oa.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = oa.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Il(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var vl = {
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
}, v0 = ["Webkit", "ms", "Moz", "O"];
Object.keys(vl).forEach(function(e) {
  v0.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), vl[t] = vl[e];
  });
});
function kf(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || vl.hasOwnProperty(e) && vl[e] ? ("" + t).trim() : t + "px";
}
function wf(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, o = kf(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o;
  }
}
var N0 = un({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Ec(e, t) {
  if (t) {
    if (N0[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(Ae(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Ae(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(Ae(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Ae(62));
  }
}
function Sc(e, t) {
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
var bc = null;
function Su(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Mc = null, $o = null, Ao = null;
function Fd(e) {
  if (e = Gl(e)) {
    if (typeof Mc != "function") throw Error(Ae(280));
    var t = e.stateNode;
    t && (t = yi(t), Mc(e.stateNode, e.type, t));
  }
}
function jf(e) {
  $o ? Ao ? Ao.push(e) : Ao = [e] : $o = e;
}
function Cf() {
  if ($o) {
    var e = $o, t = Ao;
    if (Ao = $o = null, Fd(e), t) for (e = 0; e < t.length; e++) Fd(t[e]);
  }
}
function Ef(e, t) {
  return e(t);
}
function Sf() {
}
var Wi = !1;
function bf(e, t, n) {
  if (Wi) return e(t, n);
  Wi = !0;
  try {
    return Ef(e, t, n);
  } finally {
    Wi = !1, ($o !== null || Ao !== null) && (Sf(), Cf());
  }
}
function Tl(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = yi(n);
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
  if (n && typeof n != "function") throw Error(Ae(231, t, typeof n));
  return n;
}
var Ic = !1;
if (Gs) try {
  var sl = {};
  Object.defineProperty(sl, "passive", { get: function() {
    Ic = !0;
  } }), window.addEventListener("test", sl, sl), window.removeEventListener("test", sl, sl);
} catch {
  Ic = !1;
}
function k0(e, t, n, r, o, l, a, c, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (y) {
    this.onError(y);
  }
}
var Nl = !1, Ua = null, Ba = !1, Tc = null, w0 = { onError: function(e) {
  Nl = !0, Ua = e;
} };
function j0(e, t, n, r, o, l, a, c, u) {
  Nl = !1, Ua = null, k0.apply(w0, arguments);
}
function C0(e, t, n, r, o, l, a, c, u) {
  if (j0.apply(this, arguments), Nl) {
    if (Nl) {
      var d = Ua;
      Nl = !1, Ua = null;
    } else throw Error(Ae(198));
    Ba || (Ba = !0, Tc = d);
  }
}
function ao(e) {
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
function Mf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Wd(e) {
  if (ao(e) !== e) throw Error(Ae(188));
}
function E0(e) {
  var t = e.alternate;
  if (!t) {
    if (t = ao(e), t === null) throw Error(Ae(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var l = o.alternate;
    if (l === null) {
      if (r = o.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === l.child) {
      for (l = o.child; l; ) {
        if (l === n) return Wd(o), e;
        if (l === r) return Wd(o), t;
        l = l.sibling;
      }
      throw Error(Ae(188));
    }
    if (n.return !== r.return) n = o, r = l;
    else {
      for (var a = !1, c = o.child; c; ) {
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
      if (!a) {
        for (c = l.child; c; ) {
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
        if (!a) throw Error(Ae(189));
      }
    }
    if (n.alternate !== r) throw Error(Ae(190));
  }
  if (n.tag !== 3) throw Error(Ae(188));
  return n.stateNode.current === n ? e : t;
}
function If(e) {
  return e = E0(e), e !== null ? Tf(e) : null;
}
function Tf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Tf(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var $f = rs.unstable_scheduleCallback, Ud = rs.unstable_cancelCallback, S0 = rs.unstable_shouldYield, b0 = rs.unstable_requestPaint, fn = rs.unstable_now, M0 = rs.unstable_getCurrentPriorityLevel, bu = rs.unstable_ImmediatePriority, Af = rs.unstable_UserBlockingPriority, Ha = rs.unstable_NormalPriority, I0 = rs.unstable_LowPriority, Rf = rs.unstable_IdlePriority, pi = null, Os = null;
function T0(e) {
  if (Os && typeof Os.onCommitFiberRoot == "function") try {
    Os.onCommitFiberRoot(pi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ss = Math.clz32 ? Math.clz32 : R0, $0 = Math.log, A0 = Math.LN2;
function R0(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - ($0(e) / A0 | 0) | 0;
}
var la = 64, aa = 4194304;
function gl(e) {
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
function za(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, o = e.suspendedLanes, l = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var c = a & ~o;
    c !== 0 ? r = gl(c) : (l &= a, l !== 0 && (r = gl(l)));
  } else a = n & ~o, a !== 0 ? r = gl(a) : l !== 0 && (r = gl(l));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & o) && (o = r & -r, l = t & -t, o >= l || o === 16 && (l & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ss(t), o = 1 << n, r |= e[n], t &= ~o;
  return r;
}
function L0(e, t) {
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
function O0(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
    var a = 31 - Ss(l), c = 1 << a, u = o[a];
    u === -1 ? (!(c & n) || c & r) && (o[a] = L0(c, t)) : u <= t && (e.expiredLanes |= c), l &= ~c;
  }
}
function $c(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Lf() {
  var e = la;
  return la <<= 1, !(la & 4194240) && (la = 64), e;
}
function Ui(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Yl(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ss(t), e[t] = n;
}
function D0(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - Ss(n), l = 1 << o;
    t[o] = 0, r[o] = -1, e[o] = -1, n &= ~l;
  }
}
function Mu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ss(n), o = 1 << r;
    o & t | e[r] & t && (e[r] |= t), n &= ~o;
  }
}
var zt = 0;
function Of(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Df, Iu, Pf, _f, Ff, Ac = !1, ia = [], wr = null, jr = null, Cr = null, $l = /* @__PURE__ */ new Map(), Al = /* @__PURE__ */ new Map(), xr = [], P0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Bd(e, t) {
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
      $l.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Al.delete(t.pointerId);
  }
}
function rl(e, t, n, r, o, l) {
  return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: l, targetContainers: [o] }, t !== null && (t = Gl(t), t !== null && Iu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function _0(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return wr = rl(wr, e, t, n, r, o), !0;
    case "dragenter":
      return jr = rl(jr, e, t, n, r, o), !0;
    case "mouseover":
      return Cr = rl(Cr, e, t, n, r, o), !0;
    case "pointerover":
      var l = o.pointerId;
      return $l.set(l, rl($l.get(l) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return l = o.pointerId, Al.set(l, rl(Al.get(l) || null, e, t, n, r, o)), !0;
  }
  return !1;
}
function Wf(e) {
  var t = Xr(e.target);
  if (t !== null) {
    var n = ao(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Mf(n), t !== null) {
          e.blockedOn = t, Ff(e.priority, function() {
            Pf(n);
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
function Ea(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Rc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      bc = r, n.target.dispatchEvent(r), bc = null;
    } else return t = Gl(n), t !== null && Iu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Hd(e, t, n) {
  Ea(e) && n.delete(t);
}
function F0() {
  Ac = !1, wr !== null && Ea(wr) && (wr = null), jr !== null && Ea(jr) && (jr = null), Cr !== null && Ea(Cr) && (Cr = null), $l.forEach(Hd), Al.forEach(Hd);
}
function ol(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ac || (Ac = !0, rs.unstable_scheduleCallback(rs.unstable_NormalPriority, F0)));
}
function Rl(e) {
  function t(o) {
    return ol(o, e);
  }
  if (0 < ia.length) {
    ol(ia[0], e);
    for (var n = 1; n < ia.length; n++) {
      var r = ia[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (wr !== null && ol(wr, e), jr !== null && ol(jr, e), Cr !== null && ol(Cr, e), $l.forEach(t), Al.forEach(t), n = 0; n < xr.length; n++) r = xr[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < xr.length && (n = xr[0], n.blockedOn === null); ) Wf(n), n.blockedOn === null && xr.shift();
}
var Ro = Zs.ReactCurrentBatchConfig, Ka = !0;
function W0(e, t, n, r) {
  var o = zt, l = Ro.transition;
  Ro.transition = null;
  try {
    zt = 1, Tu(e, t, n, r);
  } finally {
    zt = o, Ro.transition = l;
  }
}
function U0(e, t, n, r) {
  var o = zt, l = Ro.transition;
  Ro.transition = null;
  try {
    zt = 4, Tu(e, t, n, r);
  } finally {
    zt = o, Ro.transition = l;
  }
}
function Tu(e, t, n, r) {
  if (Ka) {
    var o = Rc(e, t, n, r);
    if (o === null) Ji(e, t, r, Va, n), Bd(e, r);
    else if (_0(o, e, t, n, r)) r.stopPropagation();
    else if (Bd(e, r), t & 4 && -1 < P0.indexOf(e)) {
      for (; o !== null; ) {
        var l = Gl(o);
        if (l !== null && Df(l), l = Rc(e, t, n, r), l === null && Ji(e, t, r, Va, n), l === o) break;
        o = l;
      }
      o !== null && r.stopPropagation();
    } else Ji(e, t, r, null, n);
  }
}
var Va = null;
function Rc(e, t, n, r) {
  if (Va = null, e = Su(r), e = Xr(e), e !== null) if (t = ao(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Mf(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Va = e, null;
}
function Uf(e) {
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
      switch (M0()) {
        case bu:
          return 1;
        case Af:
          return 4;
        case Ha:
        case I0:
          return 16;
        case Rf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Nr = null, $u = null, Sa = null;
function Bf() {
  if (Sa) return Sa;
  var e, t = $u, n = t.length, r, o = "value" in Nr ? Nr.value : Nr.textContent, l = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === o[l - r]; r++) ;
  return Sa = o.slice(e, 1 < r ? 1 - r : void 0);
}
function ba(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function ca() {
  return !0;
}
function zd() {
  return !1;
}
function ls(e) {
  function t(n, r, o, l, a) {
    this._reactName = n, this._targetInst = o, this.type = r, this.nativeEvent = l, this.target = a, this.currentTarget = null;
    for (var c in e) e.hasOwnProperty(c) && (n = e[c], this[c] = n ? n(l) : l[c]);
    return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? ca : zd, this.isPropagationStopped = zd, this;
  }
  return un(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ca);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ca);
  }, persist: function() {
  }, isPersistent: ca }), t;
}
var Yo = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Au = ls(Yo), Xl = un({}, Yo, { view: 0, detail: 0 }), B0 = ls(Xl), Bi, Hi, ll, mi = un({}, Xl, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ru, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ll && (ll && e.type === "mousemove" ? (Bi = e.screenX - ll.screenX, Hi = e.screenY - ll.screenY) : Hi = Bi = 0, ll = e), Bi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Hi;
} }), Kd = ls(mi), H0 = un({}, mi, { dataTransfer: 0 }), z0 = ls(H0), K0 = un({}, Xl, { relatedTarget: 0 }), zi = ls(K0), V0 = un({}, Yo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Y0 = ls(V0), X0 = un({}, Yo, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), G0 = ls(X0), Q0 = un({}, Yo, { data: 0 }), Vd = ls(Q0), J0 = {
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
}, q0 = {
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
}, Z0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function eg(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Z0[e]) ? !!t[e] : !1;
}
function Ru() {
  return eg;
}
var tg = un({}, Xl, { key: function(e) {
  if (e.key) {
    var t = J0[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ba(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? q0[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ru, charCode: function(e) {
  return e.type === "keypress" ? ba(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ba(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), ng = ls(tg), sg = un({}, mi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Yd = ls(sg), rg = un({}, Xl, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ru }), og = ls(rg), lg = un({}, Yo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ag = ls(lg), ig = un({}, mi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), cg = ls(ig), ug = [9, 13, 27, 32], Lu = Gs && "CompositionEvent" in window, kl = null;
Gs && "documentMode" in document && (kl = document.documentMode);
var dg = Gs && "TextEvent" in window && !kl, Hf = Gs && (!Lu || kl && 8 < kl && 11 >= kl), Xd = " ", Gd = !1;
function zf(e, t) {
  switch (e) {
    case "keyup":
      return ug.indexOf(t.keyCode) !== -1;
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
function Kf(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var vo = !1;
function hg(e, t) {
  switch (e) {
    case "compositionend":
      return Kf(t);
    case "keypress":
      return t.which !== 32 ? null : (Gd = !0, Xd);
    case "textInput":
      return e = t.data, e === Xd && Gd ? null : e;
    default:
      return null;
  }
}
function fg(e, t) {
  if (vo) return e === "compositionend" || !Lu && zf(e, t) ? (e = Bf(), Sa = $u = Nr = null, vo = !1, e) : null;
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
      return Hf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var pg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Qd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!pg[e.type] : t === "textarea";
}
function Vf(e, t, n, r) {
  jf(r), t = Ya(t, "onChange"), 0 < t.length && (n = new Au("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var wl = null, Ll = null;
function mg(e) {
  sp(e, 0);
}
function gi(e) {
  var t = wo(e);
  if (gf(t)) return e;
}
function gg(e, t) {
  if (e === "change") return t;
}
var Yf = !1;
if (Gs) {
  var Ki;
  if (Gs) {
    var Vi = "oninput" in document;
    if (!Vi) {
      var Jd = document.createElement("div");
      Jd.setAttribute("oninput", "return;"), Vi = typeof Jd.oninput == "function";
    }
    Ki = Vi;
  } else Ki = !1;
  Yf = Ki && (!document.documentMode || 9 < document.documentMode);
}
function qd() {
  wl && (wl.detachEvent("onpropertychange", Xf), Ll = wl = null);
}
function Xf(e) {
  if (e.propertyName === "value" && gi(Ll)) {
    var t = [];
    Vf(t, Ll, e, Su(e)), bf(mg, t);
  }
}
function xg(e, t, n) {
  e === "focusin" ? (qd(), wl = t, Ll = n, wl.attachEvent("onpropertychange", Xf)) : e === "focusout" && qd();
}
function yg(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return gi(Ll);
}
function vg(e, t) {
  if (e === "click") return gi(t);
}
function Ng(e, t) {
  if (e === "input" || e === "change") return gi(t);
}
function kg(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ms = typeof Object.is == "function" ? Object.is : kg;
function Ol(e, t) {
  if (Ms(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!mc.call(t, o) || !Ms(e[o], t[o])) return !1;
  }
  return !0;
}
function Zd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function eh(e, t) {
  var n = Zd(e);
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
    n = Zd(n);
  }
}
function Gf(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Gf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Qf() {
  for (var e = window, t = Wa(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Wa(e.document);
  }
  return t;
}
function Ou(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function wg(e) {
  var t = Qf(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Gf(n.ownerDocument.documentElement, n)) {
    if (r !== null && Ou(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var o = n.textContent.length, l = Math.min(r.start, o);
        r = r.end === void 0 ? l : Math.min(r.end, o), !e.extend && l > r && (o = r, r = l, l = o), o = eh(n, l);
        var a = eh(
          n,
          r
        );
        o && a && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== a.node || e.focusOffset !== a.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), l > r ? (e.addRange(t), e.extend(a.node, a.offset)) : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var jg = Gs && "documentMode" in document && 11 >= document.documentMode, No = null, Lc = null, jl = null, Oc = !1;
function th(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Oc || No == null || No !== Wa(r) || (r = No, "selectionStart" in r && Ou(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), jl && Ol(jl, r) || (jl = r, r = Ya(Lc, "onSelect"), 0 < r.length && (t = new Au("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = No)));
}
function ua(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var ko = { animationend: ua("Animation", "AnimationEnd"), animationiteration: ua("Animation", "AnimationIteration"), animationstart: ua("Animation", "AnimationStart"), transitionend: ua("Transition", "TransitionEnd") }, Yi = {}, Jf = {};
Gs && (Jf = document.createElement("div").style, "AnimationEvent" in window || (delete ko.animationend.animation, delete ko.animationiteration.animation, delete ko.animationstart.animation), "TransitionEvent" in window || delete ko.transitionend.transition);
function xi(e) {
  if (Yi[e]) return Yi[e];
  if (!ko[e]) return e;
  var t = ko[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Jf) return Yi[e] = t[n];
  return e;
}
var qf = xi("animationend"), Zf = xi("animationiteration"), ep = xi("animationstart"), tp = xi("transitionend"), np = /* @__PURE__ */ new Map(), nh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ar(e, t) {
  np.set(e, t), lo(t, [e]);
}
for (var Xi = 0; Xi < nh.length; Xi++) {
  var Gi = nh[Xi], Cg = Gi.toLowerCase(), Eg = Gi[0].toUpperCase() + Gi.slice(1);
  Ar(Cg, "on" + Eg);
}
Ar(qf, "onAnimationEnd");
Ar(Zf, "onAnimationIteration");
Ar(ep, "onAnimationStart");
Ar("dblclick", "onDoubleClick");
Ar("focusin", "onFocus");
Ar("focusout", "onBlur");
Ar(tp, "onTransitionEnd");
Fo("onMouseEnter", ["mouseout", "mouseover"]);
Fo("onMouseLeave", ["mouseout", "mouseover"]);
Fo("onPointerEnter", ["pointerout", "pointerover"]);
Fo("onPointerLeave", ["pointerout", "pointerover"]);
lo("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
lo("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
lo("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
lo("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
lo("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
lo("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var xl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Sg = new Set("cancel close invalid load scroll toggle".split(" ").concat(xl));
function sh(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, C0(r, t, void 0, e), e.currentTarget = null;
}
function sp(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], o = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var c = r[a], u = c.instance, d = c.currentTarget;
        if (c = c.listener, u !== l && o.isPropagationStopped()) break e;
        sh(o, c, d), l = u;
      }
      else for (a = 0; a < r.length; a++) {
        if (c = r[a], u = c.instance, d = c.currentTarget, c = c.listener, u !== l && o.isPropagationStopped()) break e;
        sh(o, c, d), l = u;
      }
    }
  }
  if (Ba) throw e = Tc, Ba = !1, Tc = null, e;
}
function sn(e, t) {
  var n = t[Wc];
  n === void 0 && (n = t[Wc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (rp(t, e, 2, !1), n.add(r));
}
function Qi(e, t, n) {
  var r = 0;
  t && (r |= 4), rp(n, e, r, t);
}
var da = "_reactListening" + Math.random().toString(36).slice(2);
function Dl(e) {
  if (!e[da]) {
    e[da] = !0, df.forEach(function(n) {
      n !== "selectionchange" && (Sg.has(n) || Qi(n, !1, e), Qi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[da] || (t[da] = !0, Qi("selectionchange", !1, t));
  }
}
function rp(e, t, n, r) {
  switch (Uf(t)) {
    case 1:
      var o = W0;
      break;
    case 4:
      o = U0;
      break;
    default:
      o = Tu;
  }
  n = o.bind(null, t, n, e), o = void 0, !Ic || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), r ? o !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: o }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, { passive: o }) : e.addEventListener(t, n, !1);
}
function Ji(e, t, n, r, o) {
  var l = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var a = r.tag;
    if (a === 3 || a === 4) {
      var c = r.stateNode.containerInfo;
      if (c === o || c.nodeType === 8 && c.parentNode === o) break;
      if (a === 4) for (a = r.return; a !== null; ) {
        var u = a.tag;
        if ((u === 3 || u === 4) && (u = a.stateNode.containerInfo, u === o || u.nodeType === 8 && u.parentNode === o)) return;
        a = a.return;
      }
      for (; c !== null; ) {
        if (a = Xr(c), a === null) return;
        if (u = a.tag, u === 5 || u === 6) {
          r = l = a;
          continue e;
        }
        c = c.parentNode;
      }
    }
    r = r.return;
  }
  bf(function() {
    var d = l, y = Su(n), m = [];
    e: {
      var f = np.get(e);
      if (f !== void 0) {
        var v = Au, M = e;
        switch (e) {
          case "keypress":
            if (ba(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = ng;
            break;
          case "focusin":
            M = "focus", v = zi;
            break;
          case "focusout":
            M = "blur", v = zi;
            break;
          case "beforeblur":
          case "afterblur":
            v = zi;
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
            v = Kd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = z0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = og;
            break;
          case qf:
          case Zf:
          case ep:
            v = Y0;
            break;
          case tp:
            v = ag;
            break;
          case "scroll":
            v = B0;
            break;
          case "wheel":
            v = cg;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = G0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Yd;
        }
        var j = (t & 4) !== 0, O = !j && e === "scroll", k = j ? f !== null ? f + "Capture" : null : f;
        j = [];
        for (var g = d, N; g !== null; ) {
          N = g;
          var b = N.stateNode;
          if (N.tag === 5 && b !== null && (N = b, k !== null && (b = Tl(g, k), b != null && j.push(Pl(g, b, N)))), O) break;
          g = g.return;
        }
        0 < j.length && (f = new v(f, M, null, n, y), m.push({ event: f, listeners: j }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (f = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", f && n !== bc && (M = n.relatedTarget || n.fromElement) && (Xr(M) || M[Qs])) break e;
        if ((v || f) && (f = y.window === y ? y : (f = y.ownerDocument) ? f.defaultView || f.parentWindow : window, v ? (M = n.relatedTarget || n.toElement, v = d, M = M ? Xr(M) : null, M !== null && (O = ao(M), M !== O || M.tag !== 5 && M.tag !== 6) && (M = null)) : (v = null, M = d), v !== M)) {
          if (j = Kd, b = "onMouseLeave", k = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (j = Yd, b = "onPointerLeave", k = "onPointerEnter", g = "pointer"), O = v == null ? f : wo(v), N = M == null ? f : wo(M), f = new j(b, g + "leave", v, n, y), f.target = O, f.relatedTarget = N, b = null, Xr(y) === d && (j = new j(k, g + "enter", M, n, y), j.target = N, j.relatedTarget = O, b = j), O = b, v && M) t: {
            for (j = v, k = M, g = 0, N = j; N; N = uo(N)) g++;
            for (N = 0, b = k; b; b = uo(b)) N++;
            for (; 0 < g - N; ) j = uo(j), g--;
            for (; 0 < N - g; ) k = uo(k), N--;
            for (; g--; ) {
              if (j === k || k !== null && j === k.alternate) break t;
              j = uo(j), k = uo(k);
            }
            j = null;
          }
          else j = null;
          v !== null && rh(m, f, v, j, !1), M !== null && O !== null && rh(m, O, M, j, !0);
        }
      }
      e: {
        if (f = d ? wo(d) : window, v = f.nodeName && f.nodeName.toLowerCase(), v === "select" || v === "input" && f.type === "file") var E = gg;
        else if (Qd(f)) if (Yf) E = Ng;
        else {
          E = yg;
          var S = xg;
        }
        else (v = f.nodeName) && v.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (E = vg);
        if (E && (E = E(e, d))) {
          Vf(m, E, n, y);
          break e;
        }
        S && S(e, f, d), e === "focusout" && (S = f._wrapperState) && S.controlled && f.type === "number" && wc(f, "number", f.value);
      }
      switch (S = d ? wo(d) : window, e) {
        case "focusin":
          (Qd(S) || S.contentEditable === "true") && (No = S, Lc = d, jl = null);
          break;
        case "focusout":
          jl = Lc = No = null;
          break;
        case "mousedown":
          Oc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Oc = !1, th(m, n, y);
          break;
        case "selectionchange":
          if (jg) break;
        case "keydown":
        case "keyup":
          th(m, n, y);
      }
      var w;
      if (Lu) e: {
        switch (e) {
          case "compositionstart":
            var p = "onCompositionStart";
            break e;
          case "compositionend":
            p = "onCompositionEnd";
            break e;
          case "compositionupdate":
            p = "onCompositionUpdate";
            break e;
        }
        p = void 0;
      }
      else vo ? zf(e, n) && (p = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (p = "onCompositionStart");
      p && (Hf && n.locale !== "ko" && (vo || p !== "onCompositionStart" ? p === "onCompositionEnd" && vo && (w = Bf()) : (Nr = y, $u = "value" in Nr ? Nr.value : Nr.textContent, vo = !0)), S = Ya(d, p), 0 < S.length && (p = new Vd(p, e, null, n, y), m.push({ event: p, listeners: S }), w ? p.data = w : (w = Kf(n), w !== null && (p.data = w)))), (w = dg ? hg(e, n) : fg(e, n)) && (d = Ya(d, "onBeforeInput"), 0 < d.length && (y = new Vd("onBeforeInput", "beforeinput", null, n, y), m.push({ event: y, listeners: d }), y.data = w));
    }
    sp(m, t);
  });
}
function Pl(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ya(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e, l = o.stateNode;
    o.tag === 5 && l !== null && (o = l, l = Tl(e, n), l != null && r.unshift(Pl(e, l, o)), l = Tl(e, t), l != null && r.push(Pl(e, l, o))), e = e.return;
  }
  return r;
}
function uo(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function rh(e, t, n, r, o) {
  for (var l = t._reactName, a = []; n !== null && n !== r; ) {
    var c = n, u = c.alternate, d = c.stateNode;
    if (u !== null && u === r) break;
    c.tag === 5 && d !== null && (c = d, o ? (u = Tl(n, l), u != null && a.unshift(Pl(n, u, c))) : o || (u = Tl(n, l), u != null && a.push(Pl(n, u, c)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var bg = /\r\n?/g, Mg = /\u0000|\uFFFD/g;
function oh(e) {
  return (typeof e == "string" ? e : "" + e).replace(bg, `
`).replace(Mg, "");
}
function ha(e, t, n) {
  if (t = oh(t), oh(e) !== t && n) throw Error(Ae(425));
}
function Xa() {
}
var Dc = null, Pc = null;
function _c(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Fc = typeof setTimeout == "function" ? setTimeout : void 0, Ig = typeof clearTimeout == "function" ? clearTimeout : void 0, lh = typeof Promise == "function" ? Promise : void 0, Tg = typeof queueMicrotask == "function" ? queueMicrotask : typeof lh < "u" ? function(e) {
  return lh.resolve(null).then(e).catch($g);
} : Fc;
function $g(e) {
  setTimeout(function() {
    throw e;
  });
}
function qi(e, t) {
  var n = t, r = 0;
  do {
    var o = n.nextSibling;
    if (e.removeChild(n), o && o.nodeType === 8) if (n = o.data, n === "/$") {
      if (r === 0) {
        e.removeChild(o), Rl(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = o;
  } while (n);
  Rl(t);
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
function ah(e) {
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
var Xo = Math.random().toString(36).slice(2), Rs = "__reactFiber$" + Xo, _l = "__reactProps$" + Xo, Qs = "__reactContainer$" + Xo, Wc = "__reactEvents$" + Xo, Ag = "__reactListeners$" + Xo, Rg = "__reactHandles$" + Xo;
function Xr(e) {
  var t = e[Rs];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Qs] || n[Rs]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ah(e); e !== null; ) {
        if (n = e[Rs]) return n;
        e = ah(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Gl(e) {
  return e = e[Rs] || e[Qs], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function wo(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Ae(33));
}
function yi(e) {
  return e[_l] || null;
}
var Uc = [], jo = -1;
function Rr(e) {
  return { current: e };
}
function rn(e) {
  0 > jo || (e.current = Uc[jo], Uc[jo] = null, jo--);
}
function Zt(e, t) {
  jo++, Uc[jo] = e.current, e.current = t;
}
var $r = {}, Rn = Rr($r), Xn = Rr(!1), to = $r;
function Wo(e, t) {
  var n = e.type.contextTypes;
  if (!n) return $r;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var o = {}, l;
  for (l in n) o[l] = t[l];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
}
function Gn(e) {
  return e = e.childContextTypes, e != null;
}
function Ga() {
  rn(Xn), rn(Rn);
}
function ih(e, t, n) {
  if (Rn.current !== $r) throw Error(Ae(168));
  Zt(Rn, t), Zt(Xn, n);
}
function op(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(Ae(108, x0(e) || "Unknown", o));
  return un({}, n, r);
}
function Qa(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || $r, to = Rn.current, Zt(Rn, e), Zt(Xn, Xn.current), !0;
}
function ch(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(Ae(169));
  n ? (e = op(e, t, to), r.__reactInternalMemoizedMergedChildContext = e, rn(Xn), rn(Rn), Zt(Rn, e)) : rn(Xn), Zt(Xn, n);
}
var Hs = null, vi = !1, Zi = !1;
function lp(e) {
  Hs === null ? Hs = [e] : Hs.push(e);
}
function Lg(e) {
  vi = !0, lp(e);
}
function Lr() {
  if (!Zi && Hs !== null) {
    Zi = !0;
    var e = 0, t = zt;
    try {
      var n = Hs;
      for (zt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Hs = null, vi = !1;
    } catch (o) {
      throw Hs !== null && (Hs = Hs.slice(e + 1)), $f(bu, Lr), o;
    } finally {
      zt = t, Zi = !1;
    }
  }
  return null;
}
var Co = [], Eo = 0, Ja = null, qa = 0, hs = [], fs = 0, no = null, Ks = 1, Vs = "";
function zr(e, t) {
  Co[Eo++] = qa, Co[Eo++] = Ja, Ja = e, qa = t;
}
function ap(e, t, n) {
  hs[fs++] = Ks, hs[fs++] = Vs, hs[fs++] = no, no = e;
  var r = Ks;
  e = Vs;
  var o = 32 - Ss(r) - 1;
  r &= ~(1 << o), n += 1;
  var l = 32 - Ss(t) + o;
  if (30 < l) {
    var a = o - o % 5;
    l = (r & (1 << a) - 1).toString(32), r >>= a, o -= a, Ks = 1 << 32 - Ss(t) + o | n << o | r, Vs = l + e;
  } else Ks = 1 << l | n << o | r, Vs = e;
}
function Du(e) {
  e.return !== null && (zr(e, 1), ap(e, 1, 0));
}
function Pu(e) {
  for (; e === Ja; ) Ja = Co[--Eo], Co[Eo] = null, qa = Co[--Eo], Co[Eo] = null;
  for (; e === no; ) no = hs[--fs], hs[fs] = null, Vs = hs[--fs], hs[fs] = null, Ks = hs[--fs], hs[fs] = null;
}
var ss = null, ns = null, on = !1, Cs = null;
function ip(e, t) {
  var n = ps(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function uh(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ss = e, ns = Er(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ss = e, ns = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = no !== null ? { id: Ks, overflow: Vs } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ps(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ss = e, ns = null, !0) : !1;
    default:
      return !1;
  }
}
function Bc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Hc(e) {
  if (on) {
    var t = ns;
    if (t) {
      var n = t;
      if (!uh(e, t)) {
        if (Bc(e)) throw Error(Ae(418));
        t = Er(n.nextSibling);
        var r = ss;
        t && uh(e, t) ? ip(r, n) : (e.flags = e.flags & -4097 | 2, on = !1, ss = e);
      }
    } else {
      if (Bc(e)) throw Error(Ae(418));
      e.flags = e.flags & -4097 | 2, on = !1, ss = e;
    }
  }
}
function dh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ss = e;
}
function fa(e) {
  if (e !== ss) return !1;
  if (!on) return dh(e), on = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !_c(e.type, e.memoizedProps)), t && (t = ns)) {
    if (Bc(e)) throw cp(), Error(Ae(418));
    for (; t; ) ip(e, t), t = Er(t.nextSibling);
  }
  if (dh(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(Ae(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ns = Er(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ns = null;
    }
  } else ns = ss ? Er(e.stateNode.nextSibling) : null;
  return !0;
}
function cp() {
  for (var e = ns; e; ) e = Er(e.nextSibling);
}
function Uo() {
  ns = ss = null, on = !1;
}
function _u(e) {
  Cs === null ? Cs = [e] : Cs.push(e);
}
var Og = Zs.ReactCurrentBatchConfig;
function al(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(Ae(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(Ae(147, e));
      var o = r, l = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l ? t.ref : (t = function(a) {
        var c = o.refs;
        a === null ? delete c[l] : c[l] = a;
      }, t._stringRef = l, t);
    }
    if (typeof e != "string") throw Error(Ae(284));
    if (!n._owner) throw Error(Ae(290, e));
  }
  return e;
}
function pa(e, t) {
  throw e = Object.prototype.toString.call(t), Error(Ae(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function hh(e) {
  var t = e._init;
  return t(e._payload);
}
function up(e) {
  function t(k, g) {
    if (e) {
      var N = k.deletions;
      N === null ? (k.deletions = [g], k.flags |= 16) : N.push(g);
    }
  }
  function n(k, g) {
    if (!e) return null;
    for (; g !== null; ) t(k, g), g = g.sibling;
    return null;
  }
  function r(k, g) {
    for (k = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? k.set(g.key, g) : k.set(g.index, g), g = g.sibling;
    return k;
  }
  function o(k, g) {
    return k = Ir(k, g), k.index = 0, k.sibling = null, k;
  }
  function l(k, g, N) {
    return k.index = N, e ? (N = k.alternate, N !== null ? (N = N.index, N < g ? (k.flags |= 2, g) : N) : (k.flags |= 2, g)) : (k.flags |= 1048576, g);
  }
  function a(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function c(k, g, N, b) {
    return g === null || g.tag !== 6 ? (g = lc(N, k.mode, b), g.return = k, g) : (g = o(g, N), g.return = k, g);
  }
  function u(k, g, N, b) {
    var E = N.type;
    return E === yo ? y(k, g, N.props.children, b, N.key) : g !== null && (g.elementType === E || typeof E == "object" && E !== null && E.$$typeof === fr && hh(E) === g.type) ? (b = o(g, N.props), b.ref = al(k, g, N), b.return = k, b) : (b = La(N.type, N.key, N.props, null, k.mode, b), b.ref = al(k, g, N), b.return = k, b);
  }
  function d(k, g, N, b) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== N.containerInfo || g.stateNode.implementation !== N.implementation ? (g = ac(N, k.mode, b), g.return = k, g) : (g = o(g, N.children || []), g.return = k, g);
  }
  function y(k, g, N, b, E) {
    return g === null || g.tag !== 7 ? (g = eo(N, k.mode, b, E), g.return = k, g) : (g = o(g, N), g.return = k, g);
  }
  function m(k, g, N) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = lc("" + g, k.mode, N), g.return = k, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case sa:
          return N = La(g.type, g.key, g.props, null, k.mode, N), N.ref = al(k, null, g), N.return = k, N;
        case xo:
          return g = ac(g, k.mode, N), g.return = k, g;
        case fr:
          var b = g._init;
          return m(k, b(g._payload), N);
      }
      if (ml(g) || nl(g)) return g = eo(g, k.mode, N, null), g.return = k, g;
      pa(k, g);
    }
    return null;
  }
  function f(k, g, N, b) {
    var E = g !== null ? g.key : null;
    if (typeof N == "string" && N !== "" || typeof N == "number") return E !== null ? null : c(k, g, "" + N, b);
    if (typeof N == "object" && N !== null) {
      switch (N.$$typeof) {
        case sa:
          return N.key === E ? u(k, g, N, b) : null;
        case xo:
          return N.key === E ? d(k, g, N, b) : null;
        case fr:
          return E = N._init, f(
            k,
            g,
            E(N._payload),
            b
          );
      }
      if (ml(N) || nl(N)) return E !== null ? null : y(k, g, N, b, null);
      pa(k, N);
    }
    return null;
  }
  function v(k, g, N, b, E) {
    if (typeof b == "string" && b !== "" || typeof b == "number") return k = k.get(N) || null, c(g, k, "" + b, E);
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case sa:
          return k = k.get(b.key === null ? N : b.key) || null, u(g, k, b, E);
        case xo:
          return k = k.get(b.key === null ? N : b.key) || null, d(g, k, b, E);
        case fr:
          var S = b._init;
          return v(k, g, N, S(b._payload), E);
      }
      if (ml(b) || nl(b)) return k = k.get(N) || null, y(g, k, b, E, null);
      pa(g, b);
    }
    return null;
  }
  function M(k, g, N, b) {
    for (var E = null, S = null, w = g, p = g = 0, $ = null; w !== null && p < N.length; p++) {
      w.index > p ? ($ = w, w = null) : $ = w.sibling;
      var C = f(k, w, N[p], b);
      if (C === null) {
        w === null && (w = $);
        break;
      }
      e && w && C.alternate === null && t(k, w), g = l(C, g, p), S === null ? E = C : S.sibling = C, S = C, w = $;
    }
    if (p === N.length) return n(k, w), on && zr(k, p), E;
    if (w === null) {
      for (; p < N.length; p++) w = m(k, N[p], b), w !== null && (g = l(w, g, p), S === null ? E = w : S.sibling = w, S = w);
      return on && zr(k, p), E;
    }
    for (w = r(k, w); p < N.length; p++) $ = v(w, k, p, N[p], b), $ !== null && (e && $.alternate !== null && w.delete($.key === null ? p : $.key), g = l($, g, p), S === null ? E = $ : S.sibling = $, S = $);
    return e && w.forEach(function(W) {
      return t(k, W);
    }), on && zr(k, p), E;
  }
  function j(k, g, N, b) {
    var E = nl(N);
    if (typeof E != "function") throw Error(Ae(150));
    if (N = E.call(N), N == null) throw Error(Ae(151));
    for (var S = E = null, w = g, p = g = 0, $ = null, C = N.next(); w !== null && !C.done; p++, C = N.next()) {
      w.index > p ? ($ = w, w = null) : $ = w.sibling;
      var W = f(k, w, C.value, b);
      if (W === null) {
        w === null && (w = $);
        break;
      }
      e && w && W.alternate === null && t(k, w), g = l(W, g, p), S === null ? E = W : S.sibling = W, S = W, w = $;
    }
    if (C.done) return n(
      k,
      w
    ), on && zr(k, p), E;
    if (w === null) {
      for (; !C.done; p++, C = N.next()) C = m(k, C.value, b), C !== null && (g = l(C, g, p), S === null ? E = C : S.sibling = C, S = C);
      return on && zr(k, p), E;
    }
    for (w = r(k, w); !C.done; p++, C = N.next()) C = v(w, k, p, C.value, b), C !== null && (e && C.alternate !== null && w.delete(C.key === null ? p : C.key), g = l(C, g, p), S === null ? E = C : S.sibling = C, S = C);
    return e && w.forEach(function(ee) {
      return t(k, ee);
    }), on && zr(k, p), E;
  }
  function O(k, g, N, b) {
    if (typeof N == "object" && N !== null && N.type === yo && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
      switch (N.$$typeof) {
        case sa:
          e: {
            for (var E = N.key, S = g; S !== null; ) {
              if (S.key === E) {
                if (E = N.type, E === yo) {
                  if (S.tag === 7) {
                    n(k, S.sibling), g = o(S, N.props.children), g.return = k, k = g;
                    break e;
                  }
                } else if (S.elementType === E || typeof E == "object" && E !== null && E.$$typeof === fr && hh(E) === S.type) {
                  n(k, S.sibling), g = o(S, N.props), g.ref = al(k, S, N), g.return = k, k = g;
                  break e;
                }
                n(k, S);
                break;
              } else t(k, S);
              S = S.sibling;
            }
            N.type === yo ? (g = eo(N.props.children, k.mode, b, N.key), g.return = k, k = g) : (b = La(N.type, N.key, N.props, null, k.mode, b), b.ref = al(k, g, N), b.return = k, k = b);
          }
          return a(k);
        case xo:
          e: {
            for (S = N.key; g !== null; ) {
              if (g.key === S) if (g.tag === 4 && g.stateNode.containerInfo === N.containerInfo && g.stateNode.implementation === N.implementation) {
                n(k, g.sibling), g = o(g, N.children || []), g.return = k, k = g;
                break e;
              } else {
                n(k, g);
                break;
              }
              else t(k, g);
              g = g.sibling;
            }
            g = ac(N, k.mode, b), g.return = k, k = g;
          }
          return a(k);
        case fr:
          return S = N._init, O(k, g, S(N._payload), b);
      }
      if (ml(N)) return M(k, g, N, b);
      if (nl(N)) return j(k, g, N, b);
      pa(k, N);
    }
    return typeof N == "string" && N !== "" || typeof N == "number" ? (N = "" + N, g !== null && g.tag === 6 ? (n(k, g.sibling), g = o(g, N), g.return = k, k = g) : (n(k, g), g = lc(N, k.mode, b), g.return = k, k = g), a(k)) : n(k, g);
  }
  return O;
}
var Bo = up(!0), dp = up(!1), Za = Rr(null), ei = null, So = null, Fu = null;
function Wu() {
  Fu = So = ei = null;
}
function Uu(e) {
  var t = Za.current;
  rn(Za), e._currentValue = t;
}
function zc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Lo(e, t) {
  ei = e, Fu = So = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Yn = !0), e.firstContext = null);
}
function gs(e) {
  var t = e._currentValue;
  if (Fu !== e) if (e = { context: e, memoizedValue: t, next: null }, So === null) {
    if (ei === null) throw Error(Ae(308));
    So = e, ei.dependencies = { lanes: 0, firstContext: e };
  } else So = So.next = e;
  return t;
}
var Gr = null;
function Bu(e) {
  Gr === null ? Gr = [e] : Gr.push(e);
}
function hp(e, t, n, r) {
  var o = t.interleaved;
  return o === null ? (n.next = n, Bu(t)) : (n.next = o.next, o.next = n), t.interleaved = n, Js(e, r);
}
function Js(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var pr = !1;
function Hu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function fp(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ys(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Sr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, Pt & 2) {
    var o = r.pending;
    return o === null ? t.next = t : (t.next = o.next, o.next = t), r.pending = t, Js(e, n);
  }
  return o = r.interleaved, o === null ? (t.next = t, Bu(r)) : (t.next = o.next, o.next = t), r.interleaved = t, Js(e, n);
}
function Ma(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Mu(e, n);
  }
}
function fh(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var o = null, l = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var a = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        l === null ? o = l = a : l = l.next = a, n = n.next;
      } while (n !== null);
      l === null ? o = l = t : l = l.next = t;
    } else o = l = t;
    n = { baseState: r.baseState, firstBaseUpdate: o, lastBaseUpdate: l, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ti(e, t, n, r) {
  var o = e.updateQueue;
  pr = !1;
  var l = o.firstBaseUpdate, a = o.lastBaseUpdate, c = o.shared.pending;
  if (c !== null) {
    o.shared.pending = null;
    var u = c, d = u.next;
    u.next = null, a === null ? l = d : a.next = d, a = u;
    var y = e.alternate;
    y !== null && (y = y.updateQueue, c = y.lastBaseUpdate, c !== a && (c === null ? y.firstBaseUpdate = d : c.next = d, y.lastBaseUpdate = u));
  }
  if (l !== null) {
    var m = o.baseState;
    a = 0, y = d = u = null, c = l;
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
          var M = e, j = c;
          switch (f = t, v = n, j.tag) {
            case 1:
              if (M = j.payload, typeof M == "function") {
                m = M.call(v, m, f);
                break e;
              }
              m = M;
              break e;
            case 3:
              M.flags = M.flags & -65537 | 128;
            case 0:
              if (M = j.payload, f = typeof M == "function" ? M.call(v, m, f) : M, f == null) break e;
              m = un({}, m, f);
              break e;
            case 2:
              pr = !0;
          }
        }
        c.callback !== null && c.lane !== 0 && (e.flags |= 64, f = o.effects, f === null ? o.effects = [c] : f.push(c));
      } else v = { eventTime: v, lane: f, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, y === null ? (d = y = v, u = m) : y = y.next = v, a |= f;
      if (c = c.next, c === null) {
        if (c = o.shared.pending, c === null) break;
        f = c, c = f.next, f.next = null, o.lastBaseUpdate = f, o.shared.pending = null;
      }
    } while (!0);
    if (y === null && (u = m), o.baseState = u, o.firstBaseUpdate = d, o.lastBaseUpdate = y, t = o.shared.interleaved, t !== null) {
      o = t;
      do
        a |= o.lane, o = o.next;
      while (o !== t);
    } else l === null && (o.shared.lanes = 0);
    ro |= a, e.lanes = a, e.memoizedState = m;
  }
}
function ph(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], o = r.callback;
    if (o !== null) {
      if (r.callback = null, r = n, typeof o != "function") throw Error(Ae(191, o));
      o.call(r);
    }
  }
}
var Ql = {}, Ds = Rr(Ql), Fl = Rr(Ql), Wl = Rr(Ql);
function Qr(e) {
  if (e === Ql) throw Error(Ae(174));
  return e;
}
function zu(e, t) {
  switch (Zt(Wl, t), Zt(Fl, e), Zt(Ds, Ql), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Cc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Cc(t, e);
  }
  rn(Ds), Zt(Ds, t);
}
function Ho() {
  rn(Ds), rn(Fl), rn(Wl);
}
function pp(e) {
  Qr(Wl.current);
  var t = Qr(Ds.current), n = Cc(t, e.type);
  t !== n && (Zt(Fl, e), Zt(Ds, n));
}
function Ku(e) {
  Fl.current === e && (rn(Ds), rn(Fl));
}
var an = Rr(0);
function ni(e) {
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
var ec = [];
function Vu() {
  for (var e = 0; e < ec.length; e++) ec[e]._workInProgressVersionPrimary = null;
  ec.length = 0;
}
var Ia = Zs.ReactCurrentDispatcher, tc = Zs.ReactCurrentBatchConfig, so = 0, cn = null, vn = null, jn = null, si = !1, Cl = !1, Ul = 0, Dg = 0;
function Tn() {
  throw Error(Ae(321));
}
function Yu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ms(e[n], t[n])) return !1;
  return !0;
}
function Xu(e, t, n, r, o, l) {
  if (so = l, cn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ia.current = e === null || e.memoizedState === null ? Wg : Ug, e = n(r, o), Cl) {
    l = 0;
    do {
      if (Cl = !1, Ul = 0, 25 <= l) throw Error(Ae(301));
      l += 1, jn = vn = null, t.updateQueue = null, Ia.current = Bg, e = n(r, o);
    } while (Cl);
  }
  if (Ia.current = ri, t = vn !== null && vn.next !== null, so = 0, jn = vn = cn = null, si = !1, t) throw Error(Ae(300));
  return e;
}
function Gu() {
  var e = Ul !== 0;
  return Ul = 0, e;
}
function As() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return jn === null ? cn.memoizedState = jn = e : jn = jn.next = e, jn;
}
function xs() {
  if (vn === null) {
    var e = cn.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = vn.next;
  var t = jn === null ? cn.memoizedState : jn.next;
  if (t !== null) jn = t, vn = e;
  else {
    if (e === null) throw Error(Ae(310));
    vn = e, e = { memoizedState: vn.memoizedState, baseState: vn.baseState, baseQueue: vn.baseQueue, queue: vn.queue, next: null }, jn === null ? cn.memoizedState = jn = e : jn = jn.next = e;
  }
  return jn;
}
function Bl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function nc(e) {
  var t = xs(), n = t.queue;
  if (n === null) throw Error(Ae(311));
  n.lastRenderedReducer = e;
  var r = vn, o = r.baseQueue, l = n.pending;
  if (l !== null) {
    if (o !== null) {
      var a = o.next;
      o.next = l.next, l.next = a;
    }
    r.baseQueue = o = l, n.pending = null;
  }
  if (o !== null) {
    l = o.next, r = r.baseState;
    var c = a = null, u = null, d = l;
    do {
      var y = d.lane;
      if ((so & y) === y) u !== null && (u = u.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var m = {
          lane: y,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        u === null ? (c = u = m, a = r) : u = u.next = m, cn.lanes |= y, ro |= y;
      }
      d = d.next;
    } while (d !== null && d !== l);
    u === null ? a = r : u.next = c, Ms(r, t.memoizedState) || (Yn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    o = e;
    do
      l = o.lane, cn.lanes |= l, ro |= l, o = o.next;
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function sc(e) {
  var t = xs(), n = t.queue;
  if (n === null) throw Error(Ae(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, o = n.pending, l = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var a = o = o.next;
    do
      l = e(l, a.action), a = a.next;
    while (a !== o);
    Ms(l, t.memoizedState) || (Yn = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
  }
  return [l, r];
}
function mp() {
}
function gp(e, t) {
  var n = cn, r = xs(), o = t(), l = !Ms(r.memoizedState, o);
  if (l && (r.memoizedState = o, Yn = !0), r = r.queue, Qu(vp.bind(null, n, r, e), [e]), r.getSnapshot !== t || l || jn !== null && jn.memoizedState.tag & 1) {
    if (n.flags |= 2048, Hl(9, yp.bind(null, n, r, o, t), void 0, null), Cn === null) throw Error(Ae(349));
    so & 30 || xp(n, t, o);
  }
  return o;
}
function xp(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = cn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, cn.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function yp(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Np(t) && kp(e);
}
function vp(e, t, n) {
  return n(function() {
    Np(t) && kp(e);
  });
}
function Np(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ms(e, n);
  } catch {
    return !0;
  }
}
function kp(e) {
  var t = Js(e, 1);
  t !== null && bs(t, e, 1, -1);
}
function mh(e) {
  var t = As();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Bl, lastRenderedState: e }, t.queue = e, e = e.dispatch = Fg.bind(null, cn, e), [t.memoizedState, e];
}
function Hl(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = cn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, cn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function wp() {
  return xs().memoizedState;
}
function Ta(e, t, n, r) {
  var o = As();
  cn.flags |= e, o.memoizedState = Hl(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ni(e, t, n, r) {
  var o = xs();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (vn !== null) {
    var a = vn.memoizedState;
    if (l = a.destroy, r !== null && Yu(r, a.deps)) {
      o.memoizedState = Hl(t, n, l, r);
      return;
    }
  }
  cn.flags |= e, o.memoizedState = Hl(1 | t, n, l, r);
}
function gh(e, t) {
  return Ta(8390656, 8, e, t);
}
function Qu(e, t) {
  return Ni(2048, 8, e, t);
}
function jp(e, t) {
  return Ni(4, 2, e, t);
}
function Cp(e, t) {
  return Ni(4, 4, e, t);
}
function Ep(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Sp(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ni(4, 4, Ep.bind(null, t, e), n);
}
function Ju() {
}
function bp(e, t) {
  var n = xs();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Yu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Mp(e, t) {
  var n = xs();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Yu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ip(e, t, n) {
  return so & 21 ? (Ms(n, t) || (n = Lf(), cn.lanes |= n, ro |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Yn = !0), e.memoizedState = n);
}
function Pg(e, t) {
  var n = zt;
  zt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = tc.transition;
  tc.transition = {};
  try {
    e(!1), t();
  } finally {
    zt = n, tc.transition = r;
  }
}
function Tp() {
  return xs().memoizedState;
}
function _g(e, t, n) {
  var r = Mr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, $p(e)) Ap(t, n);
  else if (n = hp(e, t, n, r), n !== null) {
    var o = Fn();
    bs(n, e, r, o), Rp(n, t, r);
  }
}
function Fg(e, t, n) {
  var r = Mr(e), o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if ($p(e)) Ap(t, o);
  else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
      var a = t.lastRenderedState, c = l(a, n);
      if (o.hasEagerState = !0, o.eagerState = c, Ms(c, a)) {
        var u = t.interleaved;
        u === null ? (o.next = o, Bu(t)) : (o.next = u.next, u.next = o), t.interleaved = o;
        return;
      }
    } catch {
    } finally {
    }
    n = hp(e, t, o, r), n !== null && (o = Fn(), bs(n, e, r, o), Rp(n, t, r));
  }
}
function $p(e) {
  var t = e.alternate;
  return e === cn || t !== null && t === cn;
}
function Ap(e, t) {
  Cl = si = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Rp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Mu(e, n);
  }
}
var ri = { readContext: gs, useCallback: Tn, useContext: Tn, useEffect: Tn, useImperativeHandle: Tn, useInsertionEffect: Tn, useLayoutEffect: Tn, useMemo: Tn, useReducer: Tn, useRef: Tn, useState: Tn, useDebugValue: Tn, useDeferredValue: Tn, useTransition: Tn, useMutableSource: Tn, useSyncExternalStore: Tn, useId: Tn, unstable_isNewReconciler: !1 }, Wg = { readContext: gs, useCallback: function(e, t) {
  return As().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: gs, useEffect: gh, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ta(
    4194308,
    4,
    Ep.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ta(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ta(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = As();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = As();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = _g.bind(null, cn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = As();
  return e = { current: e }, t.memoizedState = e;
}, useState: mh, useDebugValue: Ju, useDeferredValue: function(e) {
  return As().memoizedState = e;
}, useTransition: function() {
  var e = mh(!1), t = e[0];
  return e = Pg.bind(null, e[1]), As().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = cn, o = As();
  if (on) {
    if (n === void 0) throw Error(Ae(407));
    n = n();
  } else {
    if (n = t(), Cn === null) throw Error(Ae(349));
    so & 30 || xp(r, t, n);
  }
  o.memoizedState = n;
  var l = { value: n, getSnapshot: t };
  return o.queue = l, gh(vp.bind(
    null,
    r,
    l,
    e
  ), [e]), r.flags |= 2048, Hl(9, yp.bind(null, r, l, n, t), void 0, null), n;
}, useId: function() {
  var e = As(), t = Cn.identifierPrefix;
  if (on) {
    var n = Vs, r = Ks;
    n = (r & ~(1 << 32 - Ss(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ul++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Dg++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Ug = {
  readContext: gs,
  useCallback: bp,
  useContext: gs,
  useEffect: Qu,
  useImperativeHandle: Sp,
  useInsertionEffect: jp,
  useLayoutEffect: Cp,
  useMemo: Mp,
  useReducer: nc,
  useRef: wp,
  useState: function() {
    return nc(Bl);
  },
  useDebugValue: Ju,
  useDeferredValue: function(e) {
    var t = xs();
    return Ip(t, vn.memoizedState, e);
  },
  useTransition: function() {
    var e = nc(Bl)[0], t = xs().memoizedState;
    return [e, t];
  },
  useMutableSource: mp,
  useSyncExternalStore: gp,
  useId: Tp,
  unstable_isNewReconciler: !1
}, Bg = { readContext: gs, useCallback: bp, useContext: gs, useEffect: Qu, useImperativeHandle: Sp, useInsertionEffect: jp, useLayoutEffect: Cp, useMemo: Mp, useReducer: sc, useRef: wp, useState: function() {
  return sc(Bl);
}, useDebugValue: Ju, useDeferredValue: function(e) {
  var t = xs();
  return vn === null ? t.memoizedState = e : Ip(t, vn.memoizedState, e);
}, useTransition: function() {
  var e = sc(Bl)[0], t = xs().memoizedState;
  return [e, t];
}, useMutableSource: mp, useSyncExternalStore: gp, useId: Tp, unstable_isNewReconciler: !1 };
function ks(e, t) {
  if (e && e.defaultProps) {
    t = un({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Kc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : un({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ki = { isMounted: function(e) {
  return (e = e._reactInternals) ? ao(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Fn(), o = Mr(e), l = Ys(r, o);
  l.payload = t, n != null && (l.callback = n), t = Sr(e, l, o), t !== null && (bs(t, e, o, r), Ma(t, e, o));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Fn(), o = Mr(e), l = Ys(r, o);
  l.tag = 1, l.payload = t, n != null && (l.callback = n), t = Sr(e, l, o), t !== null && (bs(t, e, o, r), Ma(t, e, o));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Fn(), r = Mr(e), o = Ys(n, r);
  o.tag = 2, t != null && (o.callback = t), t = Sr(e, o, r), t !== null && (bs(t, e, r, n), Ma(t, e, r));
} };
function xh(e, t, n, r, o, l, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, l, a) : t.prototype && t.prototype.isPureReactComponent ? !Ol(n, r) || !Ol(o, l) : !0;
}
function Lp(e, t, n) {
  var r = !1, o = $r, l = t.contextType;
  return typeof l == "object" && l !== null ? l = gs(l) : (o = Gn(t) ? to : Rn.current, r = t.contextTypes, l = (r = r != null) ? Wo(e, o) : $r), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ki, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = l), t;
}
function yh(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ki.enqueueReplaceState(t, t.state, null);
}
function Vc(e, t, n, r) {
  var o = e.stateNode;
  o.props = n, o.state = e.memoizedState, o.refs = {}, Hu(e);
  var l = t.contextType;
  typeof l == "object" && l !== null ? o.context = gs(l) : (l = Gn(t) ? to : Rn.current, o.context = Wo(e, l)), o.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (Kc(e, t, l, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && ki.enqueueReplaceState(o, o.state, null), ti(e, n, o, r), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function zo(e, t) {
  try {
    var n = "", r = t;
    do
      n += g0(r), r = r.return;
    while (r);
    var o = n;
  } catch (l) {
    o = `
Error generating stack: ` + l.message + `
` + l.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function rc(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Yc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Hg = typeof WeakMap == "function" ? WeakMap : Map;
function Op(e, t, n) {
  n = Ys(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    li || (li = !0, su = r), Yc(e, t);
  }, n;
}
function Dp(e, t, n) {
  n = Ys(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    n.payload = function() {
      return r(o);
    }, n.callback = function() {
      Yc(e, t);
    };
  }
  var l = e.stateNode;
  return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
    Yc(e, t), typeof r != "function" && (br === null ? br = /* @__PURE__ */ new Set([this]) : br.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function vh(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Hg();
    var o = /* @__PURE__ */ new Set();
    r.set(t, o);
  } else o = r.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), r.set(t, o));
  o.has(n) || (o.add(n), e = sx.bind(null, e, t, n), t.then(e, e));
}
function Nh(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function kh(e, t, n, r, o) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ys(-1, 1), t.tag = 2, Sr(n, t, 1))), n.lanes |= 1), e);
}
var zg = Zs.ReactCurrentOwner, Yn = !1;
function _n(e, t, n, r) {
  t.child = e === null ? dp(t, null, n, r) : Bo(t, e.child, n, r);
}
function wh(e, t, n, r, o) {
  n = n.render;
  var l = t.ref;
  return Lo(t, o), r = Xu(e, t, n, r, l, o), n = Gu(), e !== null && !Yn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, qs(e, t, o)) : (on && n && Du(t), t.flags |= 1, _n(e, t, r, o), t.child);
}
function jh(e, t, n, r, o) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" && !od(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, Pp(e, t, l, r, o)) : (e = La(n.type, null, r, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (l = e.child, !(e.lanes & o)) {
    var a = l.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Ol, n(a, r) && e.ref === t.ref) return qs(e, t, o);
  }
  return t.flags |= 1, e = Ir(l, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Pp(e, t, n, r, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (Ol(l, r) && e.ref === t.ref) if (Yn = !1, t.pendingProps = r = l, (e.lanes & o) !== 0) e.flags & 131072 && (Yn = !0);
    else return t.lanes = e.lanes, qs(e, t, o);
  }
  return Xc(e, t, n, r, o);
}
function _p(e, t, n) {
  var r = t.pendingProps, o = r.children, l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Zt(Mo, es), es |= n;
  else {
    if (!(n & 1073741824)) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Zt(Mo, es), es |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = l !== null ? l.baseLanes : n, Zt(Mo, es), es |= r;
  }
  else l !== null ? (r = l.baseLanes | n, t.memoizedState = null) : r = n, Zt(Mo, es), es |= r;
  return _n(e, t, o, n), t.child;
}
function Fp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Xc(e, t, n, r, o) {
  var l = Gn(n) ? to : Rn.current;
  return l = Wo(t, l), Lo(t, o), n = Xu(e, t, n, r, l, o), r = Gu(), e !== null && !Yn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, qs(e, t, o)) : (on && r && Du(t), t.flags |= 1, _n(e, t, n, o), t.child);
}
function Ch(e, t, n, r, o) {
  if (Gn(n)) {
    var l = !0;
    Qa(t);
  } else l = !1;
  if (Lo(t, o), t.stateNode === null) $a(e, t), Lp(t, n, r), Vc(t, n, r, o), r = !0;
  else if (e === null) {
    var a = t.stateNode, c = t.memoizedProps;
    a.props = c;
    var u = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = gs(d) : (d = Gn(n) ? to : Rn.current, d = Wo(t, d));
    var y = n.getDerivedStateFromProps, m = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    m || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== r || u !== d) && yh(t, a, r, d), pr = !1;
    var f = t.memoizedState;
    a.state = f, ti(t, r, a, o), u = t.memoizedState, c !== r || f !== u || Xn.current || pr ? (typeof y == "function" && (Kc(t, n, y, r), u = t.memoizedState), (c = pr || xh(t, n, c, r, f, u, d)) ? (m || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), a.props = r, a.state = u, a.context = d, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, fp(e, t), c = t.memoizedProps, d = t.type === t.elementType ? c : ks(t.type, c), a.props = d, m = t.pendingProps, f = a.context, u = n.contextType, typeof u == "object" && u !== null ? u = gs(u) : (u = Gn(n) ? to : Rn.current, u = Wo(t, u));
    var v = n.getDerivedStateFromProps;
    (y = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== m || f !== u) && yh(t, a, r, u), pr = !1, f = t.memoizedState, a.state = f, ti(t, r, a, o);
    var M = t.memoizedState;
    c !== m || f !== M || Xn.current || pr ? (typeof v == "function" && (Kc(t, n, v, r), M = t.memoizedState), (d = pr || xh(t, n, d, r, f, M, u) || !1) ? (y || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, M, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, M, u)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = M), a.props = r, a.state = M, a.context = u, r = d) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Gc(e, t, n, r, l, o);
}
function Gc(e, t, n, r, o, l) {
  Fp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return o && ch(t, n, !1), qs(e, t, l);
  r = t.stateNode, zg.current = t;
  var c = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Bo(t, e.child, null, l), t.child = Bo(t, null, c, l)) : _n(e, t, c, l), t.memoizedState = r.state, o && ch(t, n, !0), t.child;
}
function Wp(e) {
  var t = e.stateNode;
  t.pendingContext ? ih(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ih(e, t.context, !1), zu(e, t.containerInfo);
}
function Eh(e, t, n, r, o) {
  return Uo(), _u(o), t.flags |= 256, _n(e, t, n, r), t.child;
}
var Qc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Jc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Up(e, t, n) {
  var r = t.pendingProps, o = an.current, l = !1, a = (t.flags & 128) !== 0, c;
  if ((c = a) || (c = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), c ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), Zt(an, o & 1), e === null)
    return Hc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, l ? (r = t.mode, l = t.child, a = { mode: "hidden", children: a }, !(r & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = a) : l = Ci(a, r, 0, null), e = eo(e, r, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = Jc(n), t.memoizedState = Qc, e) : qu(t, a));
  if (o = e.memoizedState, o !== null && (c = o.dehydrated, c !== null)) return Kg(e, t, a, r, c, o, n);
  if (l) {
    l = r.fallback, a = t.mode, o = e.child, c = o.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== o ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Ir(o, u), r.subtreeFlags = o.subtreeFlags & 14680064), c !== null ? l = Ir(c, l) : (l = eo(l, a, n, null), l.flags |= 2), l.return = t, r.return = t, r.sibling = l, t.child = r, r = l, l = t.child, a = e.child.memoizedState, a = a === null ? Jc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, l.memoizedState = a, l.childLanes = e.childLanes & ~n, t.memoizedState = Qc, r;
  }
  return l = e.child, e = l.sibling, r = Ir(l, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function qu(e, t) {
  return t = Ci({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ma(e, t, n, r) {
  return r !== null && _u(r), Bo(t, e.child, null, n), e = qu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Kg(e, t, n, r, o, l, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = rc(Error(Ae(422))), ma(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = r.fallback, o = t.mode, r = Ci({ mode: "visible", children: r.children }, o, 0, null), l = eo(l, o, a, null), l.flags |= 2, r.return = t, l.return = t, r.sibling = l, t.child = r, t.mode & 1 && Bo(t, e.child, null, a), t.child.memoizedState = Jc(a), t.memoizedState = Qc, l);
  if (!(t.mode & 1)) return ma(e, t, a, null);
  if (o.data === "$!") {
    if (r = o.nextSibling && o.nextSibling.dataset, r) var c = r.dgst;
    return r = c, l = Error(Ae(419)), r = rc(l, r, void 0), ma(e, t, a, r);
  }
  if (c = (a & e.childLanes) !== 0, Yn || c) {
    if (r = Cn, r !== null) {
      switch (a & -a) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
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
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      o = o & (r.suspendedLanes | a) ? 0 : o, o !== 0 && o !== l.retryLane && (l.retryLane = o, Js(e, o), bs(r, e, o, -1));
    }
    return rd(), r = rc(Error(Ae(421))), ma(e, t, a, r);
  }
  return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = rx.bind(null, e), o._reactRetry = t, null) : (e = l.treeContext, ns = Er(o.nextSibling), ss = t, on = !0, Cs = null, e !== null && (hs[fs++] = Ks, hs[fs++] = Vs, hs[fs++] = no, Ks = e.id, Vs = e.overflow, no = t), t = qu(t, r.children), t.flags |= 4096, t);
}
function Sh(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), zc(e.return, t, n);
}
function oc(e, t, n, r, o) {
  var l = e.memoizedState;
  l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: o } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = r, l.tail = n, l.tailMode = o);
}
function Bp(e, t, n) {
  var r = t.pendingProps, o = r.revealOrder, l = r.tail;
  if (_n(e, t, r.children, n), r = an.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Sh(e, n, t);
      else if (e.tag === 19) Sh(e, n, t);
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
  if (Zt(an, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (o) {
    case "forwards":
      for (n = t.child, o = null; n !== null; ) e = n.alternate, e !== null && ni(e) === null && (o = n), n = n.sibling;
      n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), oc(t, !1, o, n, l);
      break;
    case "backwards":
      for (n = null, o = t.child, t.child = null; o !== null; ) {
        if (e = o.alternate, e !== null && ni(e) === null) {
          t.child = o;
          break;
        }
        e = o.sibling, o.sibling = n, n = o, o = e;
      }
      oc(t, !0, n, null, l);
      break;
    case "together":
      oc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function $a(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function qs(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), ro |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(Ae(153));
  if (t.child !== null) {
    for (e = t.child, n = Ir(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ir(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Vg(e, t, n) {
  switch (t.tag) {
    case 3:
      Wp(t), Uo();
      break;
    case 5:
      pp(t);
      break;
    case 1:
      Gn(t.type) && Qa(t);
      break;
    case 4:
      zu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, o = t.memoizedProps.value;
      Zt(Za, r._currentValue), r._currentValue = o;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Zt(an, an.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Up(e, t, n) : (Zt(an, an.current & 1), e = qs(e, t, n), e !== null ? e.sibling : null);
      Zt(an, an.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Bp(e, t, n);
        t.flags |= 128;
      }
      if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Zt(an, an.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, _p(e, t, n);
  }
  return qs(e, t, n);
}
var Hp, qc, zp, Kp;
Hp = function(e, t) {
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
qc = function() {
};
zp = function(e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    e = t.stateNode, Qr(Ds.current);
    var l = null;
    switch (n) {
      case "input":
        o = Nc(e, o), r = Nc(e, r), l = [];
        break;
      case "select":
        o = un({}, o, { value: void 0 }), r = un({}, r, { value: void 0 }), l = [];
        break;
      case "textarea":
        o = jc(e, o), r = jc(e, r), l = [];
        break;
      default:
        typeof o.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Xa);
    }
    Ec(n, r);
    var a;
    n = null;
    for (d in o) if (!r.hasOwnProperty(d) && o.hasOwnProperty(d) && o[d] != null) if (d === "style") {
      var c = o[d];
      for (a in c) c.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Ml.hasOwnProperty(d) ? l || (l = []) : (l = l || []).push(d, null));
    for (d in r) {
      var u = r[d];
      if (c = o != null ? o[d] : void 0, r.hasOwnProperty(d) && u !== c && (u != null || c != null)) if (d === "style") if (c) {
        for (a in c) !c.hasOwnProperty(a) || u && u.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in u) u.hasOwnProperty(a) && c[a] !== u[a] && (n || (n = {}), n[a] = u[a]);
      } else n || (l || (l = []), l.push(
        d,
        n
      )), n = u;
      else d === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, c = c ? c.__html : void 0, u != null && c !== u && (l = l || []).push(d, u)) : d === "children" ? typeof u != "string" && typeof u != "number" || (l = l || []).push(d, "" + u) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Ml.hasOwnProperty(d) ? (u != null && d === "onScroll" && sn("scroll", e), l || c === u || (l = [])) : (l = l || []).push(d, u));
    }
    n && (l = l || []).push("style", n);
    var d = l;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Kp = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function il(e, t) {
  if (!on) switch (e.tailMode) {
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
  if (t) for (var o = e.child; o !== null; ) n |= o.lanes | o.childLanes, r |= o.subtreeFlags & 14680064, r |= o.flags & 14680064, o.return = e, o = o.sibling;
  else for (o = e.child; o !== null; ) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, o.return = e, o = o.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Yg(e, t, n) {
  var r = t.pendingProps;
  switch (Pu(t), t.tag) {
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
      return Gn(t.type) && Ga(), $n(t), null;
    case 3:
      return r = t.stateNode, Ho(), rn(Xn), rn(Rn), Vu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (fa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Cs !== null && (lu(Cs), Cs = null))), qc(e, t), $n(t), null;
    case 5:
      Ku(t);
      var o = Qr(Wl.current);
      if (n = t.type, e !== null && t.stateNode != null) zp(e, t, n, r, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(Ae(166));
          return $n(t), null;
        }
        if (e = Qr(Ds.current), fa(t)) {
          r = t.stateNode, n = t.type;
          var l = t.memoizedProps;
          switch (r[Rs] = t, r[_l] = l, e = (t.mode & 1) !== 0, n) {
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
              for (o = 0; o < xl.length; o++) sn(xl[o], r);
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
              Od(r, l), sn("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!l.multiple }, sn("invalid", r);
              break;
            case "textarea":
              Pd(r, l), sn("invalid", r);
          }
          Ec(n, l), o = null;
          for (var a in l) if (l.hasOwnProperty(a)) {
            var c = l[a];
            a === "children" ? typeof c == "string" ? r.textContent !== c && (l.suppressHydrationWarning !== !0 && ha(r.textContent, c, e), o = ["children", c]) : typeof c == "number" && r.textContent !== "" + c && (l.suppressHydrationWarning !== !0 && ha(
              r.textContent,
              c,
              e
            ), o = ["children", "" + c]) : Ml.hasOwnProperty(a) && c != null && a === "onScroll" && sn("scroll", r);
          }
          switch (n) {
            case "input":
              ra(r), Dd(r, l, !0);
              break;
            case "textarea":
              ra(r), _d(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = Xa);
          }
          r = o, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = vf(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Rs] = t, e[_l] = r, Hp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = Sc(n, r), n) {
              case "dialog":
                sn("cancel", e), sn("close", e), o = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                sn("load", e), o = r;
                break;
              case "video":
              case "audio":
                for (o = 0; o < xl.length; o++) sn(xl[o], e);
                o = r;
                break;
              case "source":
                sn("error", e), o = r;
                break;
              case "img":
              case "image":
              case "link":
                sn(
                  "error",
                  e
                ), sn("load", e), o = r;
                break;
              case "details":
                sn("toggle", e), o = r;
                break;
              case "input":
                Od(e, r), o = Nc(e, r), sn("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, o = un({}, r, { value: void 0 }), sn("invalid", e);
                break;
              case "textarea":
                Pd(e, r), o = jc(e, r), sn("invalid", e);
                break;
              default:
                o = r;
            }
            Ec(n, o), c = o;
            for (l in c) if (c.hasOwnProperty(l)) {
              var u = c[l];
              l === "style" ? wf(e, u) : l === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Nf(e, u)) : l === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Il(e, u) : typeof u == "number" && Il(e, "" + u) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (Ml.hasOwnProperty(l) ? u != null && l === "onScroll" && sn("scroll", e) : u != null && wu(e, l, u, a));
            }
            switch (n) {
              case "input":
                ra(e), Dd(e, r, !1);
                break;
              case "textarea":
                ra(e), _d(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Tr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, l = r.value, l != null ? To(e, !!r.multiple, l, !1) : r.defaultValue != null && To(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = Xa);
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
      if (e && t.stateNode != null) Kp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(Ae(166));
        if (n = Qr(Wl.current), Qr(Ds.current), fa(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Rs] = t, (l = r.nodeValue !== n) && (e = ss, e !== null)) switch (e.tag) {
            case 3:
              ha(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && ha(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          l && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Rs] = t, t.stateNode = r;
      }
      return $n(t), null;
    case 13:
      if (rn(an), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (on && ns !== null && t.mode & 1 && !(t.flags & 128)) cp(), Uo(), t.flags |= 98560, l = !1;
        else if (l = fa(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!l) throw Error(Ae(318));
            if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(Ae(317));
            l[Rs] = t;
          } else Uo(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          $n(t), l = !1;
        } else Cs !== null && (lu(Cs), Cs = null), l = !0;
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || an.current & 1 ? Nn === 0 && (Nn = 3) : rd())), t.updateQueue !== null && (t.flags |= 4), $n(t), null);
    case 4:
      return Ho(), qc(e, t), e === null && Dl(t.stateNode.containerInfo), $n(t), null;
    case 10:
      return Uu(t.type._context), $n(t), null;
    case 17:
      return Gn(t.type) && Ga(), $n(t), null;
    case 19:
      if (rn(an), l = t.memoizedState, l === null) return $n(t), null;
      if (r = (t.flags & 128) !== 0, a = l.rendering, a === null) if (r) il(l, !1);
      else {
        if (Nn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = ni(e), a !== null) {
            for (t.flags |= 128, il(l, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) l = n, e = r, l.flags &= 14680066, a = l.alternate, a === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, l.type = a.type, e = a.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Zt(an, an.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        l.tail !== null && fn() > Ko && (t.flags |= 128, r = !0, il(l, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ni(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), il(l, !0), l.tail === null && l.tailMode === "hidden" && !a.alternate && !on) return $n(t), null;
        } else 2 * fn() - l.renderingStartTime > Ko && n !== 1073741824 && (t.flags |= 128, r = !0, il(l, !1), t.lanes = 4194304);
        l.isBackwards ? (a.sibling = t.child, t.child = a) : (n = l.last, n !== null ? n.sibling = a : t.child = a, l.last = a);
      }
      return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = fn(), t.sibling = null, n = an.current, Zt(an, r ? n & 1 | 2 : n & 1), t) : ($n(t), null);
    case 22:
    case 23:
      return sd(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? es & 1073741824 && ($n(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : $n(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Ae(156, t.tag));
}
function Xg(e, t) {
  switch (Pu(t), t.tag) {
    case 1:
      return Gn(t.type) && Ga(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Ho(), rn(Xn), rn(Rn), Vu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ku(t), null;
    case 13:
      if (rn(an), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(Ae(340));
        Uo();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return rn(an), null;
    case 4:
      return Ho(), null;
    case 10:
      return Uu(t.type._context), null;
    case 22:
    case 23:
      return sd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ga = !1, An = !1, Gg = typeof WeakSet == "function" ? WeakSet : Set, Ye = null;
function bo(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    hn(e, t, r);
  }
  else n.current = null;
}
function Zc(e, t, n) {
  try {
    n();
  } catch (r) {
    hn(e, t, r);
  }
}
var bh = !1;
function Qg(e, t) {
  if (Dc = Ka, e = Qf(), Ou(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var o = r.anchorOffset, l = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, l.nodeType;
        } catch {
          n = null;
          break e;
        }
        var a = 0, c = -1, u = -1, d = 0, y = 0, m = e, f = null;
        t: for (; ; ) {
          for (var v; m !== n || o !== 0 && m.nodeType !== 3 || (c = a + o), m !== l || r !== 0 && m.nodeType !== 3 || (u = a + r), m.nodeType === 3 && (a += m.nodeValue.length), (v = m.firstChild) !== null; )
            f = m, m = v;
          for (; ; ) {
            if (m === e) break t;
            if (f === n && ++d === o && (c = a), f === l && ++y === r && (u = a), (v = m.nextSibling) !== null) break;
            m = f, f = m.parentNode;
          }
          m = v;
        }
        n = c === -1 || u === -1 ? null : { start: c, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Pc = { focusedElem: e, selectionRange: n }, Ka = !1, Ye = t; Ye !== null; ) if (t = Ye, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ye = e;
  else for (; Ye !== null; ) {
    t = Ye;
    try {
      var M = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (M !== null) {
            var j = M.memoizedProps, O = M.memoizedState, k = t.stateNode, g = k.getSnapshotBeforeUpdate(t.elementType === t.type ? j : ks(t.type, j), O);
            k.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var N = t.stateNode.containerInfo;
          N.nodeType === 1 ? N.textContent = "" : N.nodeType === 9 && N.documentElement && N.removeChild(N.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(Ae(163));
      }
    } catch (b) {
      hn(t, t.return, b);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Ye = e;
      break;
    }
    Ye = t.return;
  }
  return M = bh, bh = !1, M;
}
function El(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var o = r = r.next;
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        o.destroy = void 0, l !== void 0 && Zc(t, n, l);
      }
      o = o.next;
    } while (o !== r);
  }
}
function wi(e, t) {
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
function eu(e) {
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
function Vp(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Vp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Rs], delete t[_l], delete t[Wc], delete t[Ag], delete t[Rg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Yp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Mh(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Yp(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function tu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Xa));
  else if (r !== 4 && (e = e.child, e !== null)) for (tu(e, t, n), e = e.sibling; e !== null; ) tu(e, t, n), e = e.sibling;
}
function nu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (nu(e, t, n), e = e.sibling; e !== null; ) nu(e, t, n), e = e.sibling;
}
var Sn = null, ws = !1;
function cr(e, t, n) {
  for (n = n.child; n !== null; ) Xp(e, t, n), n = n.sibling;
}
function Xp(e, t, n) {
  if (Os && typeof Os.onCommitFiberUnmount == "function") try {
    Os.onCommitFiberUnmount(pi, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      An || bo(n, t);
    case 6:
      var r = Sn, o = ws;
      Sn = null, cr(e, t, n), Sn = r, ws = o, Sn !== null && (ws ? (e = Sn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Sn.removeChild(n.stateNode));
      break;
    case 18:
      Sn !== null && (ws ? (e = Sn, n = n.stateNode, e.nodeType === 8 ? qi(e.parentNode, n) : e.nodeType === 1 && qi(e, n), Rl(e)) : qi(Sn, n.stateNode));
      break;
    case 4:
      r = Sn, o = ws, Sn = n.stateNode.containerInfo, ws = !0, cr(e, t, n), Sn = r, ws = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!An && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        o = r = r.next;
        do {
          var l = o, a = l.destroy;
          l = l.tag, a !== void 0 && (l & 2 || l & 4) && Zc(n, t, a), o = o.next;
        } while (o !== r);
      }
      cr(e, t, n);
      break;
    case 1:
      if (!An && (bo(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
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
function Ih(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Gg()), t.forEach(function(r) {
      var o = ox.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(o, o));
    });
  }
}
function Ns(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var o = n[r];
    try {
      var l = e, a = t, c = a;
      e: for (; c !== null; ) {
        switch (c.tag) {
          case 5:
            Sn = c.stateNode, ws = !1;
            break e;
          case 3:
            Sn = c.stateNode.containerInfo, ws = !0;
            break e;
          case 4:
            Sn = c.stateNode.containerInfo, ws = !0;
            break e;
        }
        c = c.return;
      }
      if (Sn === null) throw Error(Ae(160));
      Xp(l, a, o), Sn = null, ws = !1;
      var u = o.alternate;
      u !== null && (u.return = null), o.return = null;
    } catch (d) {
      hn(o, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Gp(t, e), t = t.sibling;
}
function Gp(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ns(t, e), $s(e), r & 4) {
        try {
          El(3, e, e.return), wi(3, e);
        } catch (j) {
          hn(e, e.return, j);
        }
        try {
          El(5, e, e.return);
        } catch (j) {
          hn(e, e.return, j);
        }
      }
      break;
    case 1:
      Ns(t, e), $s(e), r & 512 && n !== null && bo(n, n.return);
      break;
    case 5:
      if (Ns(t, e), $s(e), r & 512 && n !== null && bo(n, n.return), e.flags & 32) {
        var o = e.stateNode;
        try {
          Il(o, "");
        } catch (j) {
          hn(e, e.return, j);
        }
      }
      if (r & 4 && (o = e.stateNode, o != null)) {
        var l = e.memoizedProps, a = n !== null ? n.memoizedProps : l, c = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          c === "input" && l.type === "radio" && l.name != null && xf(o, l), Sc(c, a);
          var d = Sc(c, l);
          for (a = 0; a < u.length; a += 2) {
            var y = u[a], m = u[a + 1];
            y === "style" ? wf(o, m) : y === "dangerouslySetInnerHTML" ? Nf(o, m) : y === "children" ? Il(o, m) : wu(o, y, m, d);
          }
          switch (c) {
            case "input":
              kc(o, l);
              break;
            case "textarea":
              yf(o, l);
              break;
            case "select":
              var f = o._wrapperState.wasMultiple;
              o._wrapperState.wasMultiple = !!l.multiple;
              var v = l.value;
              v != null ? To(o, !!l.multiple, v, !1) : f !== !!l.multiple && (l.defaultValue != null ? To(
                o,
                !!l.multiple,
                l.defaultValue,
                !0
              ) : To(o, !!l.multiple, l.multiple ? [] : "", !1));
          }
          o[_l] = l;
        } catch (j) {
          hn(e, e.return, j);
        }
      }
      break;
    case 6:
      if (Ns(t, e), $s(e), r & 4) {
        if (e.stateNode === null) throw Error(Ae(162));
        o = e.stateNode, l = e.memoizedProps;
        try {
          o.nodeValue = l;
        } catch (j) {
          hn(e, e.return, j);
        }
      }
      break;
    case 3:
      if (Ns(t, e), $s(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Rl(t.containerInfo);
      } catch (j) {
        hn(e, e.return, j);
      }
      break;
    case 4:
      Ns(t, e), $s(e);
      break;
    case 13:
      Ns(t, e), $s(e), o = e.child, o.flags & 8192 && (l = o.memoizedState !== null, o.stateNode.isHidden = l, !l || o.alternate !== null && o.alternate.memoizedState !== null || (td = fn())), r & 4 && Ih(e);
      break;
    case 22:
      if (y = n !== null && n.memoizedState !== null, e.mode & 1 ? (An = (d = An) || y, Ns(t, e), An = d) : Ns(t, e), $s(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !y && e.mode & 1) for (Ye = e, y = e.child; y !== null; ) {
          for (m = Ye = y; Ye !== null; ) {
            switch (f = Ye, v = f.child, f.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                El(4, f, f.return);
                break;
              case 1:
                bo(f, f.return);
                var M = f.stateNode;
                if (typeof M.componentWillUnmount == "function") {
                  r = f, n = f.return;
                  try {
                    t = r, M.props = t.memoizedProps, M.state = t.memoizedState, M.componentWillUnmount();
                  } catch (j) {
                    hn(r, n, j);
                  }
                }
                break;
              case 5:
                bo(f, f.return);
                break;
              case 22:
                if (f.memoizedState !== null) {
                  $h(m);
                  continue;
                }
            }
            v !== null ? (v.return = f, Ye = v) : $h(m);
          }
          y = y.sibling;
        }
        e: for (y = null, m = e; ; ) {
          if (m.tag === 5) {
            if (y === null) {
              y = m;
              try {
                o = m.stateNode, d ? (l = o.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (c = m.stateNode, u = m.memoizedProps.style, a = u != null && u.hasOwnProperty("display") ? u.display : null, c.style.display = kf("display", a));
              } catch (j) {
                hn(e, e.return, j);
              }
            }
          } else if (m.tag === 6) {
            if (y === null) try {
              m.stateNode.nodeValue = d ? "" : m.memoizedProps;
            } catch (j) {
              hn(e, e.return, j);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            y === m && (y = null), m = m.return;
          }
          y === m && (y = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Ns(t, e), $s(e), r & 4 && Ih(e);
      break;
    case 21:
      break;
    default:
      Ns(
        t,
        e
      ), $s(e);
  }
}
function $s(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Yp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(Ae(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Il(o, ""), r.flags &= -33);
          var l = Mh(e);
          nu(e, l, o);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, c = Mh(e);
          tu(e, c, a);
          break;
        default:
          throw Error(Ae(161));
      }
    } catch (u) {
      hn(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Jg(e, t, n) {
  Ye = e, Qp(e);
}
function Qp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Ye !== null; ) {
    var o = Ye, l = o.child;
    if (o.tag === 22 && r) {
      var a = o.memoizedState !== null || ga;
      if (!a) {
        var c = o.alternate, u = c !== null && c.memoizedState !== null || An;
        c = ga;
        var d = An;
        if (ga = a, (An = u) && !d) for (Ye = o; Ye !== null; ) a = Ye, u = a.child, a.tag === 22 && a.memoizedState !== null ? Ah(o) : u !== null ? (u.return = a, Ye = u) : Ah(o);
        for (; l !== null; ) Ye = l, Qp(l), l = l.sibling;
        Ye = o, ga = c, An = d;
      }
      Th(e);
    } else o.subtreeFlags & 8772 && l !== null ? (l.return = o, Ye = l) : Th(e);
  }
}
function Th(e) {
  for (; Ye !== null; ) {
    var t = Ye;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            An || wi(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !An) if (n === null) r.componentDidMount();
            else {
              var o = t.elementType === t.type ? n.memoizedProps : ks(t.type, n.memoizedProps);
              r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var l = t.updateQueue;
            l !== null && ph(t, l, r);
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
              ph(t, a, n);
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
              var d = t.alternate;
              if (d !== null) {
                var y = d.memoizedState;
                if (y !== null) {
                  var m = y.dehydrated;
                  m !== null && Rl(m);
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
            throw Error(Ae(163));
        }
        An || t.flags & 512 && eu(t);
      } catch (f) {
        hn(t, t.return, f);
      }
    }
    if (t === e) {
      Ye = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Ye = n;
      break;
    }
    Ye = t.return;
  }
}
function $h(e) {
  for (; Ye !== null; ) {
    var t = Ye;
    if (t === e) {
      Ye = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Ye = n;
      break;
    }
    Ye = t.return;
  }
}
function Ah(e) {
  for (; Ye !== null; ) {
    var t = Ye;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            wi(4, t);
          } catch (u) {
            hn(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              hn(t, o, u);
            }
          }
          var l = t.return;
          try {
            eu(t);
          } catch (u) {
            hn(t, l, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            eu(t);
          } catch (u) {
            hn(t, a, u);
          }
      }
    } catch (u) {
      hn(t, t.return, u);
    }
    if (t === e) {
      Ye = null;
      break;
    }
    var c = t.sibling;
    if (c !== null) {
      c.return = t.return, Ye = c;
      break;
    }
    Ye = t.return;
  }
}
var qg = Math.ceil, oi = Zs.ReactCurrentDispatcher, Zu = Zs.ReactCurrentOwner, ms = Zs.ReactCurrentBatchConfig, Pt = 0, Cn = null, gn = null, bn = 0, es = 0, Mo = Rr(0), Nn = 0, zl = null, ro = 0, ji = 0, ed = 0, Sl = null, Vn = null, td = 0, Ko = 1 / 0, Bs = null, li = !1, su = null, br = null, xa = !1, kr = null, ai = 0, bl = 0, ru = null, Aa = -1, Ra = 0;
function Fn() {
  return Pt & 6 ? fn() : Aa !== -1 ? Aa : Aa = fn();
}
function Mr(e) {
  return e.mode & 1 ? Pt & 2 && bn !== 0 ? bn & -bn : Og.transition !== null ? (Ra === 0 && (Ra = Lf()), Ra) : (e = zt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Uf(e.type)), e) : 1;
}
function bs(e, t, n, r) {
  if (50 < bl) throw bl = 0, ru = null, Error(Ae(185));
  Yl(e, n, r), (!(Pt & 2) || e !== Cn) && (e === Cn && (!(Pt & 2) && (ji |= n), Nn === 4 && yr(e, bn)), Qn(e, r), n === 1 && Pt === 0 && !(t.mode & 1) && (Ko = fn() + 500, vi && Lr()));
}
function Qn(e, t) {
  var n = e.callbackNode;
  O0(e, t);
  var r = za(e, e === Cn ? bn : 0);
  if (r === 0) n !== null && Ud(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Ud(n), t === 1) e.tag === 0 ? Lg(Rh.bind(null, e)) : lp(Rh.bind(null, e)), Tg(function() {
      !(Pt & 6) && Lr();
    }), n = null;
    else {
      switch (Of(r)) {
        case 1:
          n = bu;
          break;
        case 4:
          n = Af;
          break;
        case 16:
          n = Ha;
          break;
        case 536870912:
          n = Rf;
          break;
        default:
          n = Ha;
      }
      n = rm(n, Jp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Jp(e, t) {
  if (Aa = -1, Ra = 0, Pt & 6) throw Error(Ae(327));
  var n = e.callbackNode;
  if (Oo() && e.callbackNode !== n) return null;
  var r = za(e, e === Cn ? bn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ii(e, r);
  else {
    t = r;
    var o = Pt;
    Pt |= 2;
    var l = Zp();
    (Cn !== e || bn !== t) && (Bs = null, Ko = fn() + 500, Zr(e, t));
    do
      try {
        tx();
        break;
      } catch (c) {
        qp(e, c);
      }
    while (!0);
    Wu(), oi.current = l, Pt = o, gn !== null ? t = 0 : (Cn = null, bn = 0, t = Nn);
  }
  if (t !== 0) {
    if (t === 2 && (o = $c(e), o !== 0 && (r = o, t = ou(e, o))), t === 1) throw n = zl, Zr(e, 0), yr(e, r), Qn(e, fn()), n;
    if (t === 6) yr(e, r);
    else {
      if (o = e.current.alternate, !(r & 30) && !Zg(o) && (t = ii(e, r), t === 2 && (l = $c(e), l !== 0 && (r = l, t = ou(e, l))), t === 1)) throw n = zl, Zr(e, 0), yr(e, r), Qn(e, fn()), n;
      switch (e.finishedWork = o, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(Ae(345));
        case 2:
          Kr(e, Vn, Bs);
          break;
        case 3:
          if (yr(e, r), (r & 130023424) === r && (t = td + 500 - fn(), 10 < t)) {
            if (za(e, 0) !== 0) break;
            if (o = e.suspendedLanes, (o & r) !== r) {
              Fn(), e.pingedLanes |= e.suspendedLanes & o;
              break;
            }
            e.timeoutHandle = Fc(Kr.bind(null, e, Vn, Bs), t);
            break;
          }
          Kr(e, Vn, Bs);
          break;
        case 4:
          if (yr(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var a = 31 - Ss(r);
            l = 1 << a, a = t[a], a > o && (o = a), r &= ~l;
          }
          if (r = o, r = fn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * qg(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Fc(Kr.bind(null, e, Vn, Bs), r);
            break;
          }
          Kr(e, Vn, Bs);
          break;
        case 5:
          Kr(e, Vn, Bs);
          break;
        default:
          throw Error(Ae(329));
      }
    }
  }
  return Qn(e, fn()), e.callbackNode === n ? Jp.bind(null, e) : null;
}
function ou(e, t) {
  var n = Sl;
  return e.current.memoizedState.isDehydrated && (Zr(e, t).flags |= 256), e = ii(e, t), e !== 2 && (t = Vn, Vn = n, t !== null && lu(t)), e;
}
function lu(e) {
  Vn === null ? Vn = e : Vn.push.apply(Vn, e);
}
function Zg(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var o = n[r], l = o.getSnapshot;
        o = o.value;
        try {
          if (!Ms(l(), o)) return !1;
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
  for (t &= ~ed, t &= ~ji, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ss(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Rh(e) {
  if (Pt & 6) throw Error(Ae(327));
  Oo();
  var t = za(e, 0);
  if (!(t & 1)) return Qn(e, fn()), null;
  var n = ii(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = $c(e);
    r !== 0 && (t = r, n = ou(e, r));
  }
  if (n === 1) throw n = zl, Zr(e, 0), yr(e, t), Qn(e, fn()), n;
  if (n === 6) throw Error(Ae(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Kr(e, Vn, Bs), Qn(e, fn()), null;
}
function nd(e, t) {
  var n = Pt;
  Pt |= 1;
  try {
    return e(t);
  } finally {
    Pt = n, Pt === 0 && (Ko = fn() + 500, vi && Lr());
  }
}
function oo(e) {
  kr !== null && kr.tag === 0 && !(Pt & 6) && Oo();
  var t = Pt;
  Pt |= 1;
  var n = ms.transition, r = zt;
  try {
    if (ms.transition = null, zt = 1, e) return e();
  } finally {
    zt = r, ms.transition = n, Pt = t, !(Pt & 6) && Lr();
  }
}
function sd() {
  es = Mo.current, rn(Mo);
}
function Zr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Ig(n)), gn !== null) for (n = gn.return; n !== null; ) {
    var r = n;
    switch (Pu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ga();
        break;
      case 3:
        Ho(), rn(Xn), rn(Rn), Vu();
        break;
      case 5:
        Ku(r);
        break;
      case 4:
        Ho();
        break;
      case 13:
        rn(an);
        break;
      case 19:
        rn(an);
        break;
      case 10:
        Uu(r.type._context);
        break;
      case 22:
      case 23:
        sd();
    }
    n = n.return;
  }
  if (Cn = e, gn = e = Ir(e.current, null), bn = es = t, Nn = 0, zl = null, ed = ji = ro = 0, Vn = Sl = null, Gr !== null) {
    for (t = 0; t < Gr.length; t++) if (n = Gr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var o = r.next, l = n.pending;
      if (l !== null) {
        var a = l.next;
        l.next = o, r.next = a;
      }
      n.pending = r;
    }
    Gr = null;
  }
  return e;
}
function qp(e, t) {
  do {
    var n = gn;
    try {
      if (Wu(), Ia.current = ri, si) {
        for (var r = cn.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), r = r.next;
        }
        si = !1;
      }
      if (so = 0, jn = vn = cn = null, Cl = !1, Ul = 0, Zu.current = null, n === null || n.return === null) {
        Nn = 1, zl = t, gn = null;
        break;
      }
      e: {
        var l = e, a = n.return, c = n, u = t;
        if (t = bn, c.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var d = u, y = c, m = y.tag;
          if (!(y.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var f = y.alternate;
            f ? (y.updateQueue = f.updateQueue, y.memoizedState = f.memoizedState, y.lanes = f.lanes) : (y.updateQueue = null, y.memoizedState = null);
          }
          var v = Nh(a);
          if (v !== null) {
            v.flags &= -257, kh(v, a, c, l, t), v.mode & 1 && vh(l, d, t), t = v, u = d;
            var M = t.updateQueue;
            if (M === null) {
              var j = /* @__PURE__ */ new Set();
              j.add(u), t.updateQueue = j;
            } else M.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              vh(l, d, t), rd();
              break e;
            }
            u = Error(Ae(426));
          }
        } else if (on && c.mode & 1) {
          var O = Nh(a);
          if (O !== null) {
            !(O.flags & 65536) && (O.flags |= 256), kh(O, a, c, l, t), _u(zo(u, c));
            break e;
          }
        }
        l = u = zo(u, c), Nn !== 4 && (Nn = 2), Sl === null ? Sl = [l] : Sl.push(l), l = a;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536, t &= -t, l.lanes |= t;
              var k = Op(l, u, t);
              fh(l, k);
              break e;
            case 1:
              c = u;
              var g = l.type, N = l.stateNode;
              if (!(l.flags & 128) && (typeof g.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && (br === null || !br.has(N)))) {
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var b = Dp(l, c, t);
                fh(l, b);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      tm(n);
    } catch (E) {
      t = E, gn === n && n !== null && (gn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Zp() {
  var e = oi.current;
  return oi.current = ri, e === null ? ri : e;
}
function rd() {
  (Nn === 0 || Nn === 3 || Nn === 2) && (Nn = 4), Cn === null || !(ro & 268435455) && !(ji & 268435455) || yr(Cn, bn);
}
function ii(e, t) {
  var n = Pt;
  Pt |= 2;
  var r = Zp();
  (Cn !== e || bn !== t) && (Bs = null, Zr(e, t));
  do
    try {
      ex();
      break;
    } catch (o) {
      qp(e, o);
    }
  while (!0);
  if (Wu(), Pt = n, oi.current = r, gn !== null) throw Error(Ae(261));
  return Cn = null, bn = 0, Nn;
}
function ex() {
  for (; gn !== null; ) em(gn);
}
function tx() {
  for (; gn !== null && !S0(); ) em(gn);
}
function em(e) {
  var t = sm(e.alternate, e, es);
  e.memoizedProps = e.pendingProps, t === null ? tm(e) : gn = t, Zu.current = null;
}
function tm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Xg(n, t), n !== null) {
        n.flags &= 32767, gn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Nn = 6, gn = null;
        return;
      }
    } else if (n = Yg(n, t, es), n !== null) {
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
  var r = zt, o = ms.transition;
  try {
    ms.transition = null, zt = 1, nx(e, t, n, r);
  } finally {
    ms.transition = o, zt = r;
  }
  return null;
}
function nx(e, t, n, r) {
  do
    Oo();
  while (kr !== null);
  if (Pt & 6) throw Error(Ae(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(Ae(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var l = n.lanes | n.childLanes;
  if (D0(e, l), e === Cn && (gn = Cn = null, bn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xa || (xa = !0, rm(Ha, function() {
    return Oo(), null;
  })), l = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || l) {
    l = ms.transition, ms.transition = null;
    var a = zt;
    zt = 1;
    var c = Pt;
    Pt |= 4, Zu.current = null, Qg(e, n), Gp(n, e), wg(Pc), Ka = !!Dc, Pc = Dc = null, e.current = n, Jg(n), b0(), Pt = c, zt = a, ms.transition = l;
  } else e.current = n;
  if (xa && (xa = !1, kr = e, ai = o), l = e.pendingLanes, l === 0 && (br = null), T0(n.stateNode), Qn(e, fn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) o = t[n], r(o.value, { componentStack: o.stack, digest: o.digest });
  if (li) throw li = !1, e = su, su = null, e;
  return ai & 1 && e.tag !== 0 && Oo(), l = e.pendingLanes, l & 1 ? e === ru ? bl++ : (bl = 0, ru = e) : bl = 0, Lr(), null;
}
function Oo() {
  if (kr !== null) {
    var e = Of(ai), t = ms.transition, n = zt;
    try {
      if (ms.transition = null, zt = 16 > e ? 16 : e, kr === null) var r = !1;
      else {
        if (e = kr, kr = null, ai = 0, Pt & 6) throw Error(Ae(331));
        var o = Pt;
        for (Pt |= 4, Ye = e.current; Ye !== null; ) {
          var l = Ye, a = l.child;
          if (Ye.flags & 16) {
            var c = l.deletions;
            if (c !== null) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                for (Ye = d; Ye !== null; ) {
                  var y = Ye;
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      El(8, y, l);
                  }
                  var m = y.child;
                  if (m !== null) m.return = y, Ye = m;
                  else for (; Ye !== null; ) {
                    y = Ye;
                    var f = y.sibling, v = y.return;
                    if (Vp(y), y === d) {
                      Ye = null;
                      break;
                    }
                    if (f !== null) {
                      f.return = v, Ye = f;
                      break;
                    }
                    Ye = v;
                  }
                }
              }
              var M = l.alternate;
              if (M !== null) {
                var j = M.child;
                if (j !== null) {
                  M.child = null;
                  do {
                    var O = j.sibling;
                    j.sibling = null, j = O;
                  } while (j !== null);
                }
              }
              Ye = l;
            }
          }
          if (l.subtreeFlags & 2064 && a !== null) a.return = l, Ye = a;
          else e: for (; Ye !== null; ) {
            if (l = Ye, l.flags & 2048) switch (l.tag) {
              case 0:
              case 11:
              case 15:
                El(9, l, l.return);
            }
            var k = l.sibling;
            if (k !== null) {
              k.return = l.return, Ye = k;
              break e;
            }
            Ye = l.return;
          }
        }
        var g = e.current;
        for (Ye = g; Ye !== null; ) {
          a = Ye;
          var N = a.child;
          if (a.subtreeFlags & 2064 && N !== null) N.return = a, Ye = N;
          else e: for (a = g; Ye !== null; ) {
            if (c = Ye, c.flags & 2048) try {
              switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  wi(9, c);
              }
            } catch (E) {
              hn(c, c.return, E);
            }
            if (c === a) {
              Ye = null;
              break e;
            }
            var b = c.sibling;
            if (b !== null) {
              b.return = c.return, Ye = b;
              break e;
            }
            Ye = c.return;
          }
        }
        if (Pt = o, Lr(), Os && typeof Os.onPostCommitFiberRoot == "function") try {
          Os.onPostCommitFiberRoot(pi, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      zt = n, ms.transition = t;
    }
  }
  return !1;
}
function Lh(e, t, n) {
  t = zo(n, t), t = Op(e, t, 1), e = Sr(e, t, 1), t = Fn(), e !== null && (Yl(e, 1, t), Qn(e, t));
}
function hn(e, t, n) {
  if (e.tag === 3) Lh(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Lh(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (br === null || !br.has(r))) {
        e = zo(n, e), e = Dp(t, e, 1), t = Sr(t, e, 1), e = Fn(), t !== null && (Yl(t, 1, e), Qn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function sx(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Fn(), e.pingedLanes |= e.suspendedLanes & n, Cn === e && (bn & n) === n && (Nn === 4 || Nn === 3 && (bn & 130023424) === bn && 500 > fn() - td ? Zr(e, 0) : ed |= n), Qn(e, t);
}
function nm(e, t) {
  t === 0 && (e.mode & 1 ? (t = aa, aa <<= 1, !(aa & 130023424) && (aa = 4194304)) : t = 1);
  var n = Fn();
  e = Js(e, t), e !== null && (Yl(e, t, n), Qn(e, n));
}
function rx(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), nm(e, n);
}
function ox(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(Ae(314));
  }
  r !== null && r.delete(t), nm(e, n);
}
var sm;
sm = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Xn.current) Yn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Yn = !1, Vg(e, t, n);
    Yn = !!(e.flags & 131072);
  }
  else Yn = !1, on && t.flags & 1048576 && ap(t, qa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      $a(e, t), e = t.pendingProps;
      var o = Wo(t, Rn.current);
      Lo(t, n), o = Xu(null, t, r, e, o, n);
      var l = Gu();
      return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Gn(r) ? (l = !0, Qa(t)) : l = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Hu(t), o.updater = ki, t.stateNode = o, o._reactInternals = t, Vc(t, r, e, n), t = Gc(null, t, r, !0, l, n)) : (t.tag = 0, on && l && Du(t), _n(null, t, o, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch ($a(e, t), e = t.pendingProps, o = r._init, r = o(r._payload), t.type = r, o = t.tag = ax(r), e = ks(r, e), o) {
          case 0:
            t = Xc(null, t, r, e, n);
            break e;
          case 1:
            t = Ch(null, t, r, e, n);
            break e;
          case 11:
            t = wh(null, t, r, e, n);
            break e;
          case 14:
            t = jh(null, t, r, ks(r.type, e), n);
            break e;
        }
        throw Error(Ae(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : ks(r, o), Xc(e, t, r, o, n);
    case 1:
      return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : ks(r, o), Ch(e, t, r, o, n);
    case 3:
      e: {
        if (Wp(t), e === null) throw Error(Ae(387));
        r = t.pendingProps, l = t.memoizedState, o = l.element, fp(e, t), ti(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, l.isDehydrated) if (l = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
          o = zo(Error(Ae(423)), t), t = Eh(e, t, r, n, o);
          break e;
        } else if (r !== o) {
          o = zo(Error(Ae(424)), t), t = Eh(e, t, r, n, o);
          break e;
        } else for (ns = Er(t.stateNode.containerInfo.firstChild), ss = t, on = !0, Cs = null, n = dp(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Uo(), r === o) {
            t = qs(e, t, n);
            break e;
          }
          _n(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return pp(t), e === null && Hc(t), r = t.type, o = t.pendingProps, l = e !== null ? e.memoizedProps : null, a = o.children, _c(r, o) ? a = null : l !== null && _c(r, l) && (t.flags |= 32), Fp(e, t), _n(e, t, a, n), t.child;
    case 6:
      return e === null && Hc(t), null;
    case 13:
      return Up(e, t, n);
    case 4:
      return zu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Bo(t, null, r, n) : _n(e, t, r, n), t.child;
    case 11:
      return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : ks(r, o), wh(e, t, r, o, n);
    case 7:
      return _n(e, t, t.pendingProps, n), t.child;
    case 8:
      return _n(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _n(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, o = t.pendingProps, l = t.memoizedProps, a = o.value, Zt(Za, r._currentValue), r._currentValue = a, l !== null) if (Ms(l.value, a)) {
          if (l.children === o.children && !Xn.current) {
            t = qs(e, t, n);
            break e;
          }
        } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
          var c = l.dependencies;
          if (c !== null) {
            a = l.child;
            for (var u = c.firstContext; u !== null; ) {
              if (u.context === r) {
                if (l.tag === 1) {
                  u = Ys(-1, n & -n), u.tag = 2;
                  var d = l.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var y = d.pending;
                    y === null ? u.next = u : (u.next = y.next, y.next = u), d.pending = u;
                  }
                }
                l.lanes |= n, u = l.alternate, u !== null && (u.lanes |= n), zc(
                  l.return,
                  n,
                  t
                ), c.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (l.tag === 10) a = l.type === t.type ? null : l.child;
          else if (l.tag === 18) {
            if (a = l.return, a === null) throw Error(Ae(341));
            a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), zc(a, n, t), a = l.sibling;
          } else a = l.child;
          if (a !== null) a.return = l;
          else for (a = l; a !== null; ) {
            if (a === t) {
              a = null;
              break;
            }
            if (l = a.sibling, l !== null) {
              l.return = a.return, a = l;
              break;
            }
            a = a.return;
          }
          l = a;
        }
        _n(e, t, o.children, n), t = t.child;
      }
      return t;
    case 9:
      return o = t.type, r = t.pendingProps.children, Lo(t, n), o = gs(o), r = r(o), t.flags |= 1, _n(e, t, r, n), t.child;
    case 14:
      return r = t.type, o = ks(r, t.pendingProps), o = ks(r.type, o), jh(e, t, r, o, n);
    case 15:
      return Pp(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : ks(r, o), $a(e, t), t.tag = 1, Gn(r) ? (e = !0, Qa(t)) : e = !1, Lo(t, n), Lp(t, r, o), Vc(t, r, o, n), Gc(null, t, r, !0, e, n);
    case 19:
      return Bp(e, t, n);
    case 22:
      return _p(e, t, n);
  }
  throw Error(Ae(156, t.tag));
};
function rm(e, t) {
  return $f(e, t);
}
function lx(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ps(e, t, n, r) {
  return new lx(e, t, n, r);
}
function od(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function ax(e) {
  if (typeof e == "function") return od(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Cu) return 11;
    if (e === Eu) return 14;
  }
  return 2;
}
function Ir(e, t) {
  var n = e.alternate;
  return n === null ? (n = ps(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function La(e, t, n, r, o, l) {
  var a = 2;
  if (r = e, typeof e == "function") od(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case yo:
      return eo(n.children, o, l, t);
    case ju:
      a = 8, o |= 8;
      break;
    case gc:
      return e = ps(12, n, t, o | 2), e.elementType = gc, e.lanes = l, e;
    case xc:
      return e = ps(13, n, t, o), e.elementType = xc, e.lanes = l, e;
    case yc:
      return e = ps(19, n, t, o), e.elementType = yc, e.lanes = l, e;
    case pf:
      return Ci(n, o, l, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case hf:
          a = 10;
          break e;
        case ff:
          a = 9;
          break e;
        case Cu:
          a = 11;
          break e;
        case Eu:
          a = 14;
          break e;
        case fr:
          a = 16, r = null;
          break e;
      }
      throw Error(Ae(130, e == null ? e : typeof e, ""));
  }
  return t = ps(a, n, t, o), t.elementType = e, t.type = r, t.lanes = l, t;
}
function eo(e, t, n, r) {
  return e = ps(7, e, r, t), e.lanes = n, e;
}
function Ci(e, t, n, r) {
  return e = ps(22, e, r, t), e.elementType = pf, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function lc(e, t, n) {
  return e = ps(6, e, null, t), e.lanes = n, e;
}
function ac(e, t, n) {
  return t = ps(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function ix(e, t, n, r, o) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ui(0), this.expirationTimes = Ui(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ui(0), this.identifierPrefix = r, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
}
function ld(e, t, n, r, o, l, a, c, u) {
  return e = new ix(e, t, n, c, u), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = ps(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Hu(l), e;
}
function cx(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: xo, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function om(e) {
  if (!e) return $r;
  e = e._reactInternals;
  e: {
    if (ao(e) !== e || e.tag !== 1) throw Error(Ae(170));
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
    throw Error(Ae(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Gn(n)) return op(e, n, t);
  }
  return t;
}
function lm(e, t, n, r, o, l, a, c, u) {
  return e = ld(n, r, !0, e, o, l, a, c, u), e.context = om(null), n = e.current, r = Fn(), o = Mr(n), l = Ys(r, o), l.callback = t ?? null, Sr(n, l, o), e.current.lanes = o, Yl(e, o, r), Qn(e, r), e;
}
function Ei(e, t, n, r) {
  var o = t.current, l = Fn(), a = Mr(o);
  return n = om(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ys(l, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Sr(o, t, a), e !== null && (bs(e, o, a, l), Ma(e, o, a)), a;
}
function ci(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Oh(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ad(e, t) {
  Oh(e, t), (e = e.alternate) && Oh(e, t);
}
function ux() {
  return null;
}
var am = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function id(e) {
  this._internalRoot = e;
}
Si.prototype.render = id.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(Ae(409));
  Ei(e, t, null, null);
};
Si.prototype.unmount = id.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    oo(function() {
      Ei(null, e, null, null);
    }), t[Qs] = null;
  }
};
function Si(e) {
  this._internalRoot = e;
}
Si.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = _f();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < xr.length && t !== 0 && t < xr[n].priority; n++) ;
    xr.splice(n, 0, e), n === 0 && Wf(e);
  }
};
function cd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function bi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Dh() {
}
function dx(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var l = r;
      r = function() {
        var d = ci(a);
        l.call(d);
      };
    }
    var a = lm(t, r, e, 0, null, !1, !1, "", Dh);
    return e._reactRootContainer = a, e[Qs] = a.current, Dl(e.nodeType === 8 ? e.parentNode : e), oo(), a;
  }
  for (; o = e.lastChild; ) e.removeChild(o);
  if (typeof r == "function") {
    var c = r;
    r = function() {
      var d = ci(u);
      c.call(d);
    };
  }
  var u = ld(e, 0, !1, null, null, !1, !1, "", Dh);
  return e._reactRootContainer = u, e[Qs] = u.current, Dl(e.nodeType === 8 ? e.parentNode : e), oo(function() {
    Ei(t, u, n, r);
  }), u;
}
function Mi(e, t, n, r, o) {
  var l = n._reactRootContainer;
  if (l) {
    var a = l;
    if (typeof o == "function") {
      var c = o;
      o = function() {
        var u = ci(a);
        c.call(u);
      };
    }
    Ei(t, a, e, o);
  } else a = dx(n, t, e, o, r);
  return ci(a);
}
Df = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = gl(t.pendingLanes);
        n !== 0 && (Mu(t, n | 1), Qn(t, fn()), !(Pt & 6) && (Ko = fn() + 500, Lr()));
      }
      break;
    case 13:
      oo(function() {
        var r = Js(e, 1);
        if (r !== null) {
          var o = Fn();
          bs(r, e, 1, o);
        }
      }), ad(e, 1);
  }
};
Iu = function(e) {
  if (e.tag === 13) {
    var t = Js(e, 134217728);
    if (t !== null) {
      var n = Fn();
      bs(t, e, 134217728, n);
    }
    ad(e, 134217728);
  }
};
Pf = function(e) {
  if (e.tag === 13) {
    var t = Mr(e), n = Js(e, t);
    if (n !== null) {
      var r = Fn();
      bs(n, e, t, r);
    }
    ad(e, t);
  }
};
_f = function() {
  return zt;
};
Ff = function(e, t) {
  var n = zt;
  try {
    return zt = e, t();
  } finally {
    zt = n;
  }
};
Mc = function(e, t, n) {
  switch (t) {
    case "input":
      if (kc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = yi(r);
            if (!o) throw Error(Ae(90));
            gf(r), kc(r, o);
          }
        }
      }
      break;
    case "textarea":
      yf(e, n);
      break;
    case "select":
      t = n.value, t != null && To(e, !!n.multiple, t, !1);
  }
};
Ef = nd;
Sf = oo;
var hx = { usingClientEntryPoint: !1, Events: [Gl, wo, yi, jf, Cf, nd] }, cl = { findFiberByHostInstance: Xr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, fx = { bundleType: cl.bundleType, version: cl.version, rendererPackageName: cl.rendererPackageName, rendererConfig: cl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Zs.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = If(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: cl.findFiberByHostInstance || ux, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ya = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ya.isDisabled && ya.supportsFiber) try {
    pi = ya.inject(fx), Os = ya;
  } catch {
  }
}
os.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = hx;
os.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!cd(t)) throw Error(Ae(200));
  return cx(e, t, null, n);
};
os.createRoot = function(e, t) {
  if (!cd(e)) throw Error(Ae(299));
  var n = !1, r = "", o = am;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = ld(e, 1, !1, null, null, n, !1, r, o), e[Qs] = t.current, Dl(e.nodeType === 8 ? e.parentNode : e), new id(t);
};
os.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(Ae(188)) : (e = Object.keys(e).join(","), Error(Ae(268, e)));
  return e = If(t), e = e === null ? null : e.stateNode, e;
};
os.flushSync = function(e) {
  return oo(e);
};
os.hydrate = function(e, t, n) {
  if (!bi(t)) throw Error(Ae(200));
  return Mi(null, e, t, !0, n);
};
os.hydrateRoot = function(e, t, n) {
  if (!cd(e)) throw Error(Ae(405));
  var r = n != null && n.hydratedSources || null, o = !1, l = "", a = am;
  if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = lm(t, null, e, 1, n ?? null, o, !1, l, a), e[Qs] = t.current, Dl(e), r) for (e = 0; e < r.length; e++) n = r[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(
    n,
    o
  );
  return new Si(t);
};
os.render = function(e, t, n) {
  if (!bi(t)) throw Error(Ae(200));
  return Mi(null, e, t, !1, n);
};
os.unmountComponentAtNode = function(e) {
  if (!bi(e)) throw Error(Ae(40));
  return e._reactRootContainer ? (oo(function() {
    Mi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Qs] = null;
    });
  }), !0) : !1;
};
os.unstable_batchedUpdates = nd;
os.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!bi(n)) throw Error(Ae(200));
  if (e == null || e._reactInternals === void 0) throw Error(Ae(38));
  return Mi(e, t, n, !1, r);
};
os.version = "18.3.1-next-f1338f8080-20240426";
function im() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(im);
    } catch (e) {
      console.error(e);
    }
}
im(), af.exports = os;
var Ps = af.exports, Ph = Ps;
Fa.createRoot = Ph.createRoot, Fa.hydrateRoot = Ph.hydrateRoot;
var cm = { exports: {} }, Ii = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var px = i, mx = Symbol.for("react.element"), gx = Symbol.for("react.fragment"), xx = Object.prototype.hasOwnProperty, yx = px.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, vx = { key: !0, ref: !0, __self: !0, __source: !0 };
function um(e, t, n) {
  var r, o = {}, l = null, a = null;
  n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) xx.call(t, r) && !vx.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) o[r] === void 0 && (o[r] = t[r]);
  return { $$typeof: mx, type: e, key: l, ref: a, props: o, _owner: yx.current };
}
Ii.Fragment = gx;
Ii.jsx = um;
Ii.jsxs = um;
cm.exports = Ii;
var s = cm.exports;
let vr = [], dm = 120, ic = !1;
async function Nx() {
  if (!ic) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          kx(n), ic = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    ic = !0;
  }
}
function kx(e) {
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
  } : { offsetMin: dm, label: "LOCAL" };
}
function hm(e, t) {
  return vr.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function ui(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, o] = e.split("-").map(Number), [l, a, c] = t.split(":").map(Number);
  for (const u of vr)
    if (u.offsetBeforeMin > u.offsetAfterMin) {
      const d = (u.offsetBeforeMin - u.offsetAfterMin) / 60, y = new Date(u.switchEpochMs + u.offsetAfterMin * 6e4);
      if (y.getUTCFullYear() === n && y.getUTCMonth() + 1 === r && y.getUTCDate() === o) {
        const m = y.getUTCHours();
        if (l >= m && l < m + d)
          return {
            isAmbiguous: !0,
            transition: u,
            firstOccurrenceEpoch: new Date(Date.UTC(n, r - 1, o, l, a, c)).getTime() - u.offsetBeforeMin * 6e4,
            secondOccurrenceEpoch: new Date(Date.UTC(n, r - 1, o, l, a, c)).getTime() - u.offsetAfterMin * 6e4
          };
      }
    }
  return { isAmbiguous: !1 };
}
function wx(e) {
  const { offsetMin: t, label: n } = Xs(e), r = e + t * 60 * 1e3, o = new Date(r);
  return {
    year: o.getUTCFullYear(),
    month: o.getUTCMonth() + 1,
    day: o.getUTCDate(),
    hour: o.getUTCHours(),
    minute: o.getUTCMinutes(),
    second: o.getUTCSeconds(),
    offsetMin: t,
    label: n
  };
}
function jx(e) {
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
  return t === "UTC" ? jx(e) : wx(e);
}
function _h(e, t = "LOCAL") {
  const n = (o) => String(o).padStart(2, "0"), r = Jr(e, t);
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
  const [o, l, a] = e.split("-").map(Number), [c, u, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(o) || isNaN(l) || isNaN(a) || isNaN(c) || isNaN(u)) return null;
  const y = Date.UTC(o, l - 1, a, c, u, d);
  if (n === "UTC")
    return y;
  const m = ui(e, t);
  if (m.isAmbiguous)
    return r === 2 ? m.secondOccurrenceEpoch : m.firstOccurrenceEpoch;
  const f = y - dm * 6e4, { offsetMin: v } = Xs(f);
  let M = y - v * 6e4;
  const j = Xs(M);
  return j.offsetMin !== v && (M = y - j.offsetMin * 6e4), M;
}
function Cx({
  timeRange: e,
  baseEpochMs: t,
  timeMode: n,
  setTimeMode: r,
  activeStationId: o,
  hideBackToGrid: l,
  onResetActiveStation: a,
  onOpenRangeModal: c,
  onOpenBookmarksModal: u,
  onOpenHelpModal: d,
  onToggleDrawer: y,
  isInitialSetup: m = !1,
  selectedCount: f = 0,
  totalCount: v = 0,
  onResetStudio: M
}) {
  const [j, O] = i.useState(!1);
  i.useEffect(() => {
    if (!j) return;
    const E = (S) => {
      S.key === "Escape" && O(!1);
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [j]);
  const k = i.useMemo(() => {
    const E = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), S = (e == null ? void 0 : e.durationMs) || 0;
    if (!E || S <= 0) return "-- ➔ --";
    const w = E + S, p = (oe) => String(oe).padStart(2, "0"), $ = Jr(E, n), C = Jr(w, n), W = `${$.year}-${p($.month)}-${p($.day)}`, ee = `${p($.hour)}:${p($.minute)}:${p($.second)}`, I = `${C.year}-${p(C.month)}-${p(C.day)}`, R = `${p(C.hour)}:${p(C.minute)}:${p(C.second)}`, ne = n === "UTC" ? " (UTC)" : $.label ? ` (${$.label})` : "", se = W === I ? R : `${I} ${R}`;
    return `${W} ${ee} ➔ ${se}${ne}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), g = i.useMemo(() => {
    const E = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (E >= 1440) {
      const S = (E / 1440).toFixed(1);
      return `(${S.endsWith(".0") ? parseInt(S, 10) : S}d / ${E}m Total)`;
    }
    return `(${E}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), N = () => {
    O(!1), M == null || M();
  }, b = j ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => O(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (E) => E.stopPropagation(), dir: "ltr", children: [
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
          onClick: () => O(!1),
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
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: () => O(!1), children: "CANCEL" }),
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: N, children: [
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
      !l && o && /* @__PURE__ */ s.jsx("button", { type: "button", onClick: a, className: "btn-grid-return", children: "⊞ Back to Grid" }),
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
          onClick: () => O(!0),
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
          onClick: y,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && b && Ps.createPortal(b, document.body)
  ] });
}
const ho = (e) => String(e).padStart(2, "0");
function Et(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, o = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (o = !!n.includeSeconds)), t === "UTC") {
    const f = new Date(e), v = ho(f.getUTCHours()), M = ho(f.getUTCMinutes()), j = ho(f.getUTCSeconds()), O = o ? `${v}:${M}:${j}` : `${v}:${M}`;
    return r ? `${O} UTC` : O;
  }
  const { offsetMin: l, label: a } = Xs(e), c = new Date(e + l * 60 * 1e3), u = ho(c.getUTCHours()), d = ho(c.getUTCMinutes()), y = ho(c.getUTCSeconds()), m = o ? `${u}:${d}:${y}` : `${u}:${d}`;
  return r ? `${m} ${a}` : m;
}
const Ex = 600, Fh = 250, ds = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map(), au = /* @__PURE__ */ new Set(), Wh = 4;
let Do = 0, Es = [];
function iu(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Fh) * Fh;
}
function fm() {
  var e;
  if (!(Do >= Wh || Es.length === 0))
    for (Es = Es.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); Do < Wh && Es.length > 0; ) {
      const t = Es.pop();
      !t || (e = t.signal) != null && e.aborted || (Do++, Sx(t));
    }
}
function Oa(e, t, n, r = "mon-0") {
  const o = iu(t), l = r || "mon-0", a = `${e}_${l}_${o}`;
  if (ds.size >= Ex) {
    const c = ds.keys().next().value, u = ds.get(c);
    u && u.startsWith("blob:") && URL.revokeObjectURL(u), ds.delete(c);
  }
  ds.set(a, n), au.forEach((c) => c(e, o, n, l));
}
async function Sx(e) {
  const { key: t, hostname: n, epochMs: r, displayId: o, signal: l, resolve: a } = e;
  try {
    if (l != null && l.aborted) {
      a(null);
      return;
    }
    const c = o ? `&displayId=${encodeURIComponent(o)}` : "", u = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${c}`, { signal: l });
    if (u.status === 200) {
      const d = await u.blob(), y = URL.createObjectURL(d);
      Oa(n, r, y, o), a(y);
    } else u.status === 204 ? (Oa(n, r, "NO_SIGNAL", o), a("NO_SIGNAL")) : a(null);
  } catch (c) {
    c.name !== "AbortError" ? (Oa(n, r, "NO_SIGNAL", o), a("NO_SIGNAL")) : a(null);
  } finally {
    Do = Math.max(0, Do - 1), Yr.delete(t), fm();
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
    const r = iu(t), l = `${e}_${n || "mon-0"}_${r}`;
    if (!ds.has(l)) return null;
    const a = ds.get(l);
    return ds.delete(l), ds.set(l, a), a;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: Oa,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    ds.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), ds.clear(), Yr.clear(), Es = [], Do = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return au.add(e), () => au.delete(e);
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
    const o = iu(t), l = r || "mon-0", a = `${e}_${l}_${o}`;
    if (ds.has(a))
      return Promise.resolve(this.get(e, o, l));
    if (Yr.has(a))
      return Yr.get(a);
    const c = new Promise((u) => {
      if (n != null && n.aborted) {
        u(null);
        return;
      }
      Es = Es.filter((y) => y.hostname === e && y.displayId === l && y.key !== a ? (Yr.delete(y.key), y.resolve(null), !1) : !0);
      const d = { key: a, hostname: e, epochMs: o, displayId: l, signal: n, resolve: u };
      n && n.addEventListener("abort", () => {
        Es = Es.filter((y) => y.key !== a), Yr.delete(a), u(null);
      }, { once: !0 }), Es.push(d), fm();
    });
    return Yr.set(a, c), c;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Pn.clearAll();
});
const ud = "ITB_STUDIO_SESSION_CACHE_V2", pm = "itb_player_audio_settings";
let cc = null;
function bx() {
  try {
    const e = localStorage.getItem(ud);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function mm(e) {
  e && (cc && clearTimeout(cc), cc = setTimeout(() => {
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
      localStorage.setItem(ud, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function Mx() {
  try {
    localStorage.removeItem(ud);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function Po() {
  try {
    const e = localStorage.getItem(pm);
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
function Ix(e) {
  try {
    localStorage.setItem(pm, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let mr = null, Io = null, uc = null, zn = 0, fo = 0, va = -60, Kl = 1;
function Tx() {
  if (!mr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (mr = new e());
  }
  return mr && mr.state === "suspended" && mr.resume().catch(() => {
  }), mr;
}
function di(e, t = 1) {
  if (!e) return null;
  Kl = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Tx();
    if (!n) return null;
    let r = e.__audioSourceNode, o = e.__audioGainNode, l = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), o = n.createGain(), l = n.createAnalyser(), l.fftSize = 256, l.smoothingTimeConstant = 0.5, r.connect(o), o.connect(l), l.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = o, e.__audioAnalyserNode = l;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return o && o.gain.setValueAtTime(Kl, n.currentTime), Io = e, $x(), { ctx: n, gainNode: o, analyserNode: l };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function Uh(e) {
  if (Kl = Math.max(0, Number(e) || 1), Io != null && Io.__audioGainNode && mr)
    try {
      Io.__audioGainNode.gain.setValueAtTime(Kl, mr.currentTime);
    } catch {
    }
}
function $x() {
  if (uc) return;
  const e = new Uint8Array(256), t = () => {
    const n = Io, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      zn *= 0.85, fo *= 0.85, zn < 1e-3 && (zn = 0), fo < 1e-3 && (fo = 0), va = zn > 1e-3 ? 20 * Math.log10(zn) : -60;
    else
      try {
        r.getByteTimeDomainData(e);
        let o = 0, l = 0;
        for (let c = 0; c < e.length; c++) {
          const u = (e[c] - 128) / 128;
          o += u * u;
          const d = Math.abs(u);
          d > l && (l = d);
        }
        const a = Math.sqrt(o / e.length);
        zn = a > zn ? zn * 0.3 + a * 0.7 : zn * 0.85 + a * 0.15, fo = Math.max(zn, l), va = zn > 1e-4 ? 20 * Math.log10(zn) : -60;
      } catch {
        zn = 0, fo = 0, va = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: zn,
        peak: fo,
        db: va,
        gain: Kl,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), uc = requestAnimationFrame(t);
  };
  uc = requestAnimationFrame(t);
}
function gm({ isPlaying: e = !1 }) {
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
function Ax({
  displays: e = [],
  activeDisplayId: t = "mon-0",
  onSelectDisplay: n,
  areAllDisplaysPlaced: r = !1,
  isAutoDirectorEnabled: o = !1
}) {
  if (!e || e.length <= 1)
    return null;
  const l = (t || "mon-0").toLowerCase(), a = l === "auto" || l === "director";
  return /* @__PURE__ */ s.jsx(
    "aside",
    {
      className: `tactical-display-strip-wrapper ${r ? "are-all-placed" : ""}`,
      "aria-label": "Workstation Display Switcher",
      onClick: (c) => c.stopPropagation(),
      children: /* @__PURE__ */ s.jsxs("div", { className: "vertical-display-strip", role: "toolbar", children: [
        o && /* @__PURE__ */ s.jsx(
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
          const d = (c.displayId ?? c.DisplayId ?? `mon-${u}`).toLowerCase(), y = !a && l === d, m = c.width ?? c.Width ?? 1920, f = c.height ?? c.Height ?? 1080, v = c.displayName ?? c.DisplayName ?? `Monitor ${u + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${y ? "is-active" : ""}`,
              onClick: (M) => {
                M.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${u + 1}: ${v} (${m}×${f})`,
              "aria-label": `Monitor ${u + 1}`,
              children: /* @__PURE__ */ s.jsx("span", { className: "number-label", children: u + 1 })
            },
            d
          );
        })
      ] })
    }
  );
}
function xm({
  displays: e = [],
  activeDisplayId: t = "mon-0",
  onSelectDisplay: n,
  isTransitioning: r = !1,
  mode: o = "AUTO",
  // 'AUTO' or 'MANUAL'
  activeTimeRange: l = ""
}) {
  const a = o === "AUTO", c = i.useMemo(() => {
    if (!e || e.length <= 1) return null;
    let M = 1 / 0, j = 1 / 0, O = -1 / 0, k = -1 / 0;
    e.forEach((b) => {
      const E = b.x ?? b.X ?? 0, S = b.y ?? b.Y ?? 0, w = b.width ?? b.Width ?? 1920, p = b.height ?? b.Height ?? 1080;
      M = Math.min(M, E), j = Math.min(j, S), O = Math.max(O, E + w), k = Math.max(k, S + p);
    });
    const g = Math.max(1, O - M), N = Math.max(1, k - j);
    return { minX: M, minY: j, totalW: g, totalH: N };
  }, [e]);
  if (!e || e.length <= 1 || !c)
    return null;
  const u = e.find((M) => (M.displayId ?? M.DisplayId) === t) || e[0], d = e.indexOf(u), y = d >= 0 ? d + 1 : 1, f = (u ? u.displayName ?? u.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), v = f && !f.toLowerCase().includes("screen") ? `SCREEN ${y} (${f.toUpperCase()})` : f ? f.toUpperCase() : `SCREEN ${y}`;
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${a ? "is-auto-mode is-read-only" : "is-manual-mode is-interactive"} ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (M) => M.stopPropagation(),
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "hud-header", children: /* @__PURE__ */ s.jsxs(
          "span",
          {
            className: `hud-badge ${o.toLowerCase()} ${a ? "is-read-only" : "is-interactive"}`,
            title: a ? "Auto-Director Active: Reflecting active screen at current playhead position (Locked / Read-Only)" : "Manual Override: Click any screen box below to switch active display",
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-pulse" }),
              /* @__PURE__ */ s.jsx("span", { className: "hud-mode-text", children: a ? "⚡ AUTO-DIRECTOR" : "✋ OVERRIDE" }),
              /* @__PURE__ */ s.jsx("span", { className: "hud-colon", children: ":" }),
              /* @__PURE__ */ s.jsx("span", { className: "hud-screen-text", children: v }),
              a && /* @__PURE__ */ s.jsx("span", { className: "hud-lock-icon", title: "Auto-Director is controlling screen cuts (Selection Read-Only)", children: "🔒" }),
              l && /* @__PURE__ */ s.jsxs("span", { className: "hud-time-range", children: [
                " [",
                l,
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
            children: e.map((M, j) => {
              const O = M.displayId ?? M.DisplayId ?? `mon-${j}`, k = (M.x ?? M.X ?? 0) - c.minX, g = (M.y ?? M.Y ?? 0) - c.minY, N = M.width ?? M.Width ?? 1920, b = M.height ?? M.Height ?? 1080, E = O === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${E ? "is-active" : "is-inactive"} ${a ? "is-read-only" : "is-interactive"}`,
                  onClick: (S) => {
                    S.stopPropagation(), !a && (n == null || n(O));
                  },
                  children: [
                    /* @__PURE__ */ s.jsx("title", { children: a ? `Screen ${j + 1} (${E ? "Active by Auto-Director" : "Inactive"}) • Auto-Director Reflection (Read-Only)` : `Click to switch to Screen ${j + 1}` }),
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: k + 10,
                        y: g + 10,
                        width: Math.max(10, N - 20),
                        height: Math.max(10, b - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: k + N / 2,
                        y: g + b / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: j + 1
                      }
                    )
                  ]
                },
                O
              );
            })
          }
        ) })
      ]
    }
  );
}
function Rx({
  station: e,
  currentEpochMs: t,
  isOffline: n,
  isSolo: r,
  isPlaying: o,
  setIsPlaying: l,
  baseEpochMs: a,
  totalDurationMs: c,
  outPointMs: u,
  setPlayheadMs: d,
  isSpotlightActive: y,
  globalGaps: m = [],
  recordingSegments: f = {},
  playbackSpeed: v = 1,
  activeAudioStationId: M = null,
  directorPlan: j = null,
  isAutoDirectorEnabled: O = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: g = null,
  areAllDisplaysPlaced: N = !1,
  hideDisplayStrip: b = !1,
  isDecoderAllowed: E = !0,
  maxHeight: S = null
}) {
  var _;
  const w = e.hostname || e.name || e.id || "", p = Math.round(t), [$, C] = i.useState(() => !w || !p ? null : Pn.get(w, p) || null), [W, ee] = i.useState(""), [I, R] = i.useState(!1), [ne, se] = i.useState(!1), [oe, U] = i.useState(!1), [Y, T] = i.useState(!1), H = i.useRef(o), z = i.useRef(null), xe = i.useRef(null), X = i.useRef(0), V = i.useRef(t - a), K = i.useRef(t - a), ge = i.useRef(!1), fe = i.useRef(null), ye = i.useRef(!1);
  V.current = t - a;
  const De = (e == null ? void 0 : e.displays) || ((_ = e == null ? void 0 : e.topology) == null ? void 0 : _.displays) || [], [Ce, Ie] = i.useState(null);
  i.useEffect(() => {
    Ie(null);
  }, [k]);
  const Ze = i.useMemo(() => {
    const P = j || (e == null ? void 0 : e.directorPlan);
    return !P || !P.segments || P.segments.length === 0 ? null : P.segments.find((Q) => {
      const le = Q.startEpochMs ?? Q.StartEpochMs ?? 0, re = Q.endEpochMs ?? Q.EndEpochMs ?? 0;
      return t >= le && t <= re;
    }) || P.segments[0];
  }, [j, e == null ? void 0 : e.directorPlan, t]), Xe = i.useMemo(() => {
    var P;
    return De.length > 1 && O !== !1 && Ze ? (Ze.targetDisplayId || Ze.TargetDisplayId || "mon-0").toLowerCase() : Ce ? Ce.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : (((P = De[0]) == null ? void 0 : P.displayId) || "mon-0").toLowerCase();
  }, [Ce, k, De, O, Ze]), Ht = i.useRef(Xe), [Ot, ft] = i.useState(!1);
  i.useEffect(() => {
    if (Ht.current && Ht.current !== Xe) {
      ft(!0);
      const P = setTimeout(() => ft(!1), 2e3);
      return Ht.current = Xe, () => clearTimeout(P);
    }
    Ht.current = Xe;
  }, [Xe]);
  const G = f[e == null ? void 0 : e.id] || f[w] || (e == null ? void 0 : e.segments) || [], Le = G.length === 0 || G.some((P) => {
    const Q = P.startEpochMs ?? P.startEpoch ?? 0, le = P.endEpochMs ?? P.endEpoch ?? 0;
    return t >= Q && t <= le;
  }), B = !!(r ? !Po().isMuted : M && (e.id === M || w === M)), D = i.useCallback(() => {
    if (!z.current) return;
    const P = Po();
    if (r)
      z.current.volume = P.volume, z.current.muted = P.isMuted, P.isMuted || di(z.current);
    else {
      const Q = !!(M && (e.id === M || w === M));
      z.current.muted = !Q, Q && (z.current.volume = P.volume, di(z.current));
    }
  }, [r, M, e.id, w]);
  i.useEffect(() => {
    D();
  }, [D]), i.useEffect(() => {
    const P = (Q) => {
      z.current && Q.detail && D();
    };
    return window.addEventListener("itb-audio-state-changed", P), () => window.removeEventListener("itb-audio-state-changed", P);
  }, [D]), i.useEffect(() => {
    z.current && (z.current.defaultPlaybackRate = v, z.current.playbackRate = v);
  }, [v]), i.useEffect(() => {
    if (n || !p || !w) return;
    if (o && E) {
      H.current = !0;
      return;
    }
    const P = H.current;
    H.current = o;
    let Q = !0;
    const le = new AbortController(), re = Pn.get(w, p, Xe);
    if (re) {
      C(re), U(!1), T(!1);
      return;
    }
    T(!0);
    const Ee = setTimeout(() => {
      Q && Pn.fetchFrame(w, p, le.signal, Xe).then((st) => {
        Q && (T(!1), st && st !== "NO_SIGNAL" ? (C(st), U(!1)) : st === "NO_SIGNAL" && U(!0));
      });
    }, o ? 180 : P ? 25 : 40), ze = Pn.subscribe((st, Je, pt, ut) => {
      st === w && Je === p && (!ut || ut === Xe) && Q && (T(!1), pt && pt !== "NO_SIGNAL" ? (C(pt), U(!1)) : pt === "NO_SIGNAL" && U(!0));
    });
    return () => {
      Q = !1, clearTimeout(Ee), le.abort(), ze();
    };
  }, [w, p, n, o, r, I, Xe, E]), i.useEffect(() => {
    if (!w || !(r || o && E)) {
      (!o || !E) && (fe.current && clearTimeout(fe.current), xe.current && clearTimeout(xe.current), ge.current = !1, ee(""), R(!1), se(!1), z.current && (z.current.pause(), z.current.removeAttribute("src"), z.current.load()));
      return;
    }
    let Q = null;
    return o && !y && Le ? Q = setTimeout(() => {
      const le = V.current;
      X.current = le, K.current = le, ge.current = !1;
      const re = S && S < 1080 ? `&maxHeight=${S}` : "", we = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + le}&displayId=${encodeURIComponent(Xe)}${re}&_t=${Date.now()}`;
      R(!1), ee(we);
    }, 80) : o || (fe.current && clearTimeout(fe.current), ge.current = !1, ee(""), R(!1), z.current && (z.current.pause(), z.current.removeAttribute("src"), z.current.load())), () => {
      Q && clearTimeout(Q);
    };
  }, [o, r, w, a, c, y, Le, Xe, E, S]), i.useEffect(() => {
    if (!w || !(r || o)) return;
    const Q = V.current, le = Math.abs(Q - K.current);
    if (!o || le < 800) {
      K.current = Q;
      return;
    }
    return ge.current = !0, K.current = Q, X.current = Q, z.current && z.current.pause(), R(!1), fe.current && clearTimeout(fe.current), fe.current = setTimeout(() => {
      if (!Le || y) {
        ee(""), R(!1), ge.current = !1;
        return;
      }
      const re = V.current, we = S && S < 1080 ? `&maxHeight=${S}` : "", Ee = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + re}&displayId=${encodeURIComponent(Xe)}${we}&_t=${Date.now()}`;
      ee(Ee);
    }, 75), () => {
      fe.current && clearTimeout(fe.current);
    };
  }, [t, o, r, w, a, c, y, Le, Xe, E, S]), i.useEffect(() => {
    if (r || !o || !z.current || !I || ge.current) return;
    const P = (V.current - X.current) / 1e3;
    if (P >= 0) {
      const Q = z.current, re = Q.currentTime - P, we = v || 1;
      if (Math.abs(re) > 3)
        try {
          Q.currentTime = P;
        } catch {
        }
      else re < -0.15 ? Q.playbackRate = we * 1.04 : re > 0.15 ? Q.playbackRate = we * 0.96 : Q.playbackRate !== we && (Q.playbackRate = we);
    }
  }, [r, o, t, I, v]), i.useEffect(() => {
    if (!r || !o || !W || !I || y) return;
    let P = null, Q = z.current ? z.current.currentTime : 0, le = performance.now(), re = X.current + Math.round(Q * 1e3);
    const we = () => {
      const Ee = z.current;
      if (Ee && !Ee.paused && !Ee.ended && !ye.current && !ge.current) {
        const ze = performance.now(), st = Ee.currentTime;
        Math.abs(st - Q) > 5e-4 && (Q = st, le = ze);
        const Je = Math.max(0, (ze - le) / 1e3), pt = Ee.playbackRate || v || 1, ut = Q + Je * pt;
        let nt = X.current + Math.round(ut * 1e3);
        const tt = nt - re;
        if (tt < 0 && tt > -300 && (nt = re), nt >= u) {
          l == null || l(!1), d == null || d(u);
          return;
        }
        const en = a + nt, _t = m == null ? void 0 : m.find((bt) => en >= bt.startEpochMs && en < bt.endEpochMs);
        if (_t) {
          ye.current = !0;
          const bt = _t.endEpochMs - a;
          d(bt), X.current = bt, re = bt, K.current = bt;
          const it = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + bt}&_t=${Date.now()}`;
          R(!1), ee(it), setTimeout(() => {
            ye.current = !1;
          }, 300);
          return;
        }
        nt !== re && (re = nt, K.current = nt, d == null || d(nt));
      }
      P = requestAnimationFrame(we);
    };
    return P = requestAnimationFrame(we), () => {
      P && cancelAnimationFrame(P);
    };
  }, [
    r,
    o,
    W,
    I,
    y,
    v,
    u,
    a,
    c,
    w,
    m,
    d,
    l
  ]);
  const J = () => {
    if (ye.current) return;
    const P = a + V.current, Q = G.map((le) => ({ start: le.startEpochMs ?? le.startEpoch ?? 0, end: le.endEpochMs ?? le.endEpoch ?? 0 })).filter((le) => le.start > P + 200).sort((le, re) => le.start - re.start)[0];
    if (Q && Q.start - a < u) {
      ye.current = !0;
      const le = Q.start - a;
      d(le), X.current = le;
      const re = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + le}&_t=${Date.now()}`;
      R(!1), ee(re), setTimeout(() => {
        ye.current = !1;
      }, 300);
      return;
    }
    l && l(!1);
  };
  return n ? /* @__PURE__ */ s.jsxs("div", { className: "offline-state-overlay", children: [
    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
      /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
    ] }),
    /* @__PURE__ */ s.jsx("span", { children: "SIGNAL LOST" })
  ] }) : /* @__PURE__ */ s.jsxs("div", { className: "camera-card-feed-root", children: [
    (r || o) && W && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: z,
        src: W,
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
        muted: !B,
        onLoadedData: () => {
          z.current && (z.current.defaultPlaybackRate = v, z.current.playbackRate = v);
        },
        onCanPlay: () => {
          xe.current && (clearTimeout(xe.current), xe.current = null), se(!1), D(), z.current && (z.current.defaultPlaybackRate = v, z.current.playbackRate = v), o && z.current && z.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          xe.current && (clearTimeout(xe.current), xe.current = null), se(!1), ge.current = !1, R(!0), D(), z.current && (z.current.defaultPlaybackRate = v, z.current.playbackRate = v);
        },
        onWaiting: () => {
          xe.current && clearTimeout(xe.current), xe.current = setTimeout(() => {
            se(!0);
          }, 450);
        },
        onTimeUpdate: () => {
          var P;
          xe.current && (clearTimeout(xe.current), xe.current = null), se(!1), !I && ((P = z.current) == null ? void 0 : P.currentTime) > 0 && (ge.current = !1, R(!0));
        },
        onEnded: J
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || o) && I && !y ? 0 : 2,
          pointerEvents: "none"
        },
        children: $ && !oe ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: $,
            alt: w,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => U(!0)
          }
        ) : (!$ || oe || !Le) && !W ? /* @__PURE__ */ s.jsx(gm, { isPlaying: o }) : null
      }
    ),
    (r || o) && o && Le && (!I || ne) && !y && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          w
        ] })
      ] })
    ] }) }),
    De.length > 1 && /* @__PURE__ */ s.jsx(
      xm,
      {
        displays: De,
        activeDisplayId: Xe,
        onSelectDisplay: (P) => {
          O || (Ie(P), g == null || g(P));
        },
        isTransitioning: Ot,
        mode: O ? "AUTO" : "MANUAL"
      }
    ),
    !b && /* @__PURE__ */ s.jsx(
      Ax,
      {
        displays: De,
        activeDisplayId: Xe,
        onSelectDisplay: (P) => {
          Ie(P), g == null || g(P);
        },
        areAllDisplaysPlaced: N,
        isAutoDirectorEnabled: O
      }
    )
  ] });
}
function Lx({
  station: e,
  isSolo: t = !1,
  stationsCount: n = 1,
  onDeselectStation: r = null,
  currentEpochMs: o,
  timeMode: l = "LOCAL",
  isPlaying: a,
  setIsPlaying: c,
  baseEpochMs: u,
  totalDurationMs: d,
  outPointMs: y,
  setPlayheadMs: m,
  isSpotlightActive: f,
  globalGaps: v = [],
  onOpenSpotlight: M,
  onSelectActiveStation: j,
  recordingSegments: O = {},
  playbackSpeed: k = 1,
  activeAudioStationId: g = null,
  onSoloAudio: N,
  directorPlan: b = null,
  isAutoDirectorEnabled: E = !0,
  targetDisplayId: S = "auto",
  onSelectDisplayId: w = null,
  areAllDisplaysPlaced: p = !1,
  _slotIndex: $ = 0,
  borderColor: C = null,
  onSwapWithNext: W = null,
  isDecoderAllowed: ee = !0,
  maxHeight: I = null
}) {
  var T;
  const R = !!(g && (e.id === g || e.hostname && e.hostname === g)), ne = (e.hostname || e.name || "").includes("Offline"), se = ne ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((T = e == null ? void 0 : e.topology) == null ? void 0 : T.displays) || []).length > 1;
  const U = () => {
    if (t) {
      const H = S && S !== "auto" && S !== "director" ? S : null;
      M && M(e.id, H);
    } else
      j && j(e.id);
  }, Y = (H) => {
    H.preventDefault(), H.stopPropagation(), t && j && (c && c(!1), j(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: U,
      onContextMenu: Y,
      className: `camera-card ${se} ${t ? "is-solo-card" : ""}`,
      style: C ? { borderColor: C } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${se}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            W && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (H) => {
                  H.stopPropagation(), W();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            N && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${R ? "audio-active" : ""}`,
                onClick: (H) => {
                  H.stopPropagation(), N(R ? null : e.id);
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
            M && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (H) => {
                  H.stopPropagation();
                  const z = S && S !== "auto" && S !== "director" ? S : null;
                  M(e.id, z);
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
                onClick: (H) => {
                  H.stopPropagation(), t && c && c(!1), j(t ? null : e.id);
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
                onClick: (H) => {
                  H.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${ne ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Rx,
            {
              station: e,
              currentEpochMs: o,
              isOffline: ne,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: c,
              baseEpochMs: u,
              totalDurationMs: d,
              outPointMs: y,
              setPlayheadMs: m,
              isSpotlightActive: f,
              globalGaps: v,
              recordingSegments: O,
              playbackSpeed: k,
              activeAudioStationId: g,
              directorPlan: b,
              isAutoDirectorEnabled: E,
              targetDisplayId: S,
              onSelectDisplayId: w,
              areAllDisplaysPlaced: p,
              hideDisplayStrip: !0,
              isDecoderAllowed: ee,
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
        !ne && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          Et(o, l)
        ] }) })
      ]
    }
  ) });
}
const yl = ["top-right", "bottom-right", "bottom-left", "top-left"];
function ym(e) {
  if (!e || typeof e != "string")
    return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
  const t = e.trim().toLowerCase();
  if (yl.includes(t)) {
    const n = t.includes("right") ? 100 : 0, r = t.includes("bottom") ? 100 : 0;
    return { isCustom: !1, preset: t, xPct: n, yPct: r };
  }
  if (t.startsWith("custom:") || t.includes(",")) {
    const n = t.replace("custom:", "").split(/[,;]/);
    if (n.length >= 2) {
      const r = parseFloat(n[0].replace("%", "")), o = parseFloat(n[1].replace("%", ""));
      if (!isNaN(r) && !isNaN(o))
        return {
          isCustom: !0,
          preset: null,
          xPct: Math.max(0, Math.min(100, r)),
          yPct: Math.max(0, Math.min(100, o))
        };
    }
  }
  return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
}
function cu(e) {
  const t = ym(e);
  return t.isCustom ? `CUSTOM (${Math.round(t.xPct)}% X, ${Math.round(t.yPct)}% Y)` : (t.preset || "top-right").toUpperCase();
}
function Ox({
  currentEpochMs: e,
  position: t = null,
  onPositionChange: n = null
}) {
  var ee;
  const r = i.useRef(null), o = i.useRef(null), [l, a] = i.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), c = t || l, u = ym(c), [d, y] = i.useState(!1), [m, f] = i.useState(null);
  i.useEffect(() => {
    d || (u.isCustom ? f({ xPct: u.xPct, yPct: u.yPct }) : f(null));
  }, [c, d, u.isCustom, u.xPct, u.yPct]);
  const v = i.useCallback((I) => {
    I && (I.preventDefault(), I.stopPropagation());
    let R;
    if (u.isCustom || !yl.includes(u.preset))
      R = "top-right";
    else {
      const se = (yl.indexOf(u.preset) + 1) % yl.length;
      R = yl[se];
    }
    a(R), f(null);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", R);
    } catch {
    }
    n && n(R);
  }, [u.isCustom, u.preset, n]), M = i.useCallback((I) => {
    if (I.button !== void 0 && I.button !== 0 || I.target.closest(".btn-cycle-corner")) return;
    const R = r.current;
    if (!R) return;
    const ne = R.parentElement;
    if (!ne) return;
    const se = R.getBoundingClientRect(), oe = ne.getBoundingClientRect();
    o.current = {
      startX: I.clientX,
      startY: I.clientY,
      clockWidth: se.width,
      clockHeight: se.height,
      parentRect: oe,
      offsetX: I.clientX - se.left,
      offsetY: I.clientY - se.top,
      hasMoved: !1
    };
    const U = (T) => {
      if (!o.current) return;
      const H = o.current, z = Math.hypot(T.clientX - H.startX, T.clientY - H.startY);
      if (!H.hasMoved && z > 4 && (H.hasMoved = !0, y(!0)), !H.hasMoved) return;
      const xe = H.parentRect.width, X = H.parentRect.height, V = Math.max(1, xe - H.clockWidth - 28), K = Math.max(1, X - H.clockHeight - 28), ge = T.clientX - H.parentRect.left - H.offsetX - 14, fe = T.clientY - H.parentRect.top - H.offsetY - 14, ye = Math.max(0, Math.min(V, ge)), De = Math.max(0, Math.min(K, fe)), Ce = Math.round(ye / V * 1e3) / 10, Ie = Math.round(De / K * 1e3) / 10;
      f({ xPct: Ce, yPct: Ie });
    }, Y = (T) => {
      window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", Y);
      const H = o.current;
      if (o.current = null, y(!1), !H) return;
      if (!H.hasMoved) {
        v();
        return;
      }
      const z = Math.max(1, H.parentRect.width - H.clockWidth - 28), xe = Math.max(1, H.parentRect.height - H.clockHeight - 28), X = T.clientX - H.parentRect.left - H.offsetX - 14, V = T.clientY - H.parentRect.top - H.offsetY - 14, K = Math.max(0, Math.min(z, X)), ge = Math.max(0, Math.min(xe, V)), fe = K / z * 100, ye = ge / xe * 100;
      let De;
      fe > 94 && ye < 6 ? De = "top-right" : fe < 6 && ye < 6 ? De = "top-left" : fe > 94 && ye > 94 ? De = "bottom-right" : fe < 6 && ye > 94 ? De = "bottom-left" : De = `custom:${fe.toFixed(1)},${ye.toFixed(1)}`, a(De);
      try {
        localStorage.setItem("itb_canvas_utc_clock_pos", De);
      } catch {
      }
      n && n(De);
    };
    window.addEventListener("pointermove", U), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", Y);
  }, [v, n]), j = new Date(e || Date.now()), O = j.getUTCFullYear(), k = String(j.getUTCMonth() + 1).padStart(2, "0"), g = String(j.getUTCDate()).padStart(2, "0"), N = String(j.getUTCHours()).padStart(2, "0"), b = String(j.getUTCMinutes()).padStart(2, "0"), E = String(j.getUTCSeconds()).padStart(2, "0"), S = `${O}-${k}-${g}`, w = `${N}:${b}:${E} UTC`, p = m !== null || u.isCustom, $ = m || (u.isCustom ? { xPct: u.xPct, yPct: u.yPct } : null);
  let C;
  if ($) {
    const I = $.xPct / 100, R = $.yPct / 100;
    C = {
      left: `calc(14px + (100% - 28px) * ${I})`,
      top: `calc(14px + (100% - 28px) * ${R})`,
      transform: `translate(-${$.xPct}%, -${$.yPct}%)`,
      right: "auto",
      bottom: "auto"
    };
  }
  const W = !p && u.preset ? `corner-${u.preset}` : "";
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      ref: r,
      className: `canvas-utc-wall-clock ${W} ${d ? "is-dragging" : ""} ${p ? "is-custom" : ""}`,
      style: C,
      onPointerDown: M,
      title: "Persistent Canvas UTC Wall Clock • Drag to place anywhere on canvas • Click or use [⤢] to cycle corners",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: S }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-sep", children: "•" }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-time-val", children: w })
        ] }),
        d && $ && /* @__PURE__ */ s.jsx("div", { className: "clock-drag-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
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
            title: p ? `Custom Position (${Math.round(($ == null ? void 0 : $.xPct) || 0)}%, ${Math.round(($ == null ? void 0 : $.yPct) || 0)}%) • Click to snap to TOP-RIGHT` : `Current corner: ${((ee = u.preset) == null ? void 0 : ee.toUpperCase()) || "TOP-RIGHT"} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function Dx() {
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
  const o = (e.channelMode || "both").toUpperCase(), l = Math.round((e.gain || 1) * 100);
  return /* @__PURE__ */ s.jsxs("div", { className: "active-audio-source-overlay", title: `Playing Audio from ${e.stationName} (${o}) • Gain ${l}%`, children: [
    /* @__PURE__ */ s.jsx("div", { className: "audio-live-pulse-dot" }),
    /* @__PURE__ */ s.jsx("span", { className: "audio-source-icon", children: "🔊" }),
    /* @__PURE__ */ s.jsx("span", { className: "audio-source-label", children: "PLAYING AUDIO:" }),
    /* @__PURE__ */ s.jsx("span", { className: "audio-source-station", children: e.stationName }),
    /* @__PURE__ */ s.jsx("span", { className: `audio-channel-badge mode-${(e.channelMode || "both").toLowerCase()}`, children: o === "MIC" ? "🎤 MIC" : o === "SYS" ? "🔊 SYS" : "🎧 BOTH" }),
    /* @__PURE__ */ s.jsxs("span", { className: "audio-gain-badge", children: [
      l,
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
const Da = 2500, Px = {
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
function _x(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const o = parseInt(n[1], 10);
    return Px[o] || `Key(${o})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function vm(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((l) => l.trim()).filter(Boolean).map(_x), r = /* @__PURE__ */ new Set(), o = [];
  for (const l of n)
    l && (r.has(l) || (r.add(l), o.push(l)));
  return o;
}
function Fx(e, t = " + ") {
  return vm(e).join(t);
}
function ul(e) {
  return Fx(e, "+");
}
const dc = 2200, hc = 400;
function Nm({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN",
  // Options: 'NONE' | 'BURN_IN' | 'OFF'
  targetStationId: r = null,
  targetDisplayId: o = null,
  displays: l = [],
  directorPlan: a = null
}) {
  const u = (n || "NONE").toUpperCase().replace("-", "_") === "BURN_IN", d = i.useMemo(() => {
    if (!u || !t.length || !e) return null;
    let f = o ? String(o).toLowerCase() : null;
    if (f === "auto" && (a != null && a.segments)) {
      const M = a.segments.find((j) => e >= j.startEpochMs && e < j.endEpochMs);
      f = ((M == null ? void 0 : M.activeDisplayId) || "mon-0").toLowerCase();
    }
    const v = r ? String(r).toLowerCase() : null;
    for (let M = t.length - 1; M >= 0; M--) {
      const j = t[M];
      if (!j) continue;
      if (v) {
        const g = (j.stationId || j.stationHostname || j.stationName || j.hostname || "").toLowerCase();
        if (g && g !== v)
          continue;
      }
      if (f && f !== "canvas" && f !== "all-displays") {
        let g = (j.displayId || j.DisplayId || "").toLowerCase();
        if (!g && l && l.length > 0) {
          const N = j.x ?? j.X, b = j.y ?? j.Y;
          if (typeof N == "number" && typeof b == "number") {
            const E = l.find((S) => {
              const w = S.X ?? S.x ?? 0, p = S.Y ?? S.y ?? 0, $ = S.Width ?? S.width ?? 1920, C = S.Height ?? S.height ?? 1080;
              return N >= w && N < w + $ && b >= p && b < p + C;
            });
            E && (g = (E.DisplayId || E.displayId || "mon-0").toLowerCase());
          }
        }
        if (g || (g = "mon-0"), f !== g)
          continue;
      }
      const O = j.epochMs + Da, k = e - O;
      if (k >= 0 && k <= dc)
        return {
          ...j,
          elapsed: k
        };
    }
    return null;
  }, [u, e, t, r, o, l, a]);
  if (!u || !d) return null;
  let y = 1;
  if (d.elapsed > dc - hc) {
    const f = (d.elapsed - (dc - hc)) / hc;
    y = Math.max(0, 1 - f);
  }
  if (y <= 0.05) return null;
  const m = vm(d.keyCombination);
  return m.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: y }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: m.map((f, v) => /* @__PURE__ */ s.jsxs(fi.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: f.toUpperCase() }) }),
    v < m.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, v)) }) }) : null;
}
function ln(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Wx(e) {
  const t = ln(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Ux(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Bx({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var j, O, k, g, N, b;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let o = e[0], l = e[0];
  for (let E = 0; E < e.length; E++)
    if (e[E].timestampEpochMs <= t)
      o = e[E], l = e[E + 1] || e[E];
    else {
      l === o && e[E] && (l = e[E]);
      break;
    }
  if (o === l)
    return ((j = o.layout) == null ? void 0 : j.placements) || n;
  const a = Math.max(100, (l.transitionDurationSec || 0.5) * 1e3), c = l.transitionType || "smooth", u = l.timestampEpochMs - a;
  if (t < u)
    return ((O = o.layout) == null ? void 0 : O.placements) || n;
  if (t >= l.timestampEpochMs)
    return ((k = l.layout) == null ? void 0 : k.placements) || n;
  if (c === "cut")
    return ((g = o.layout) == null ? void 0 : g.placements) || n;
  const d = (t - u) / a, y = ln(d, 0, 1), m = c === "linear" ? y : Wx(y), f = ((N = o.layout) == null ? void 0 : N.placements) || [], v = ((b = l.layout) == null ? void 0 : b.placements) || [], M = v.map((E) => {
    const S = f.find((ee) => ee.stationId === E.stationId && ee.displayId === E.displayId);
    if (!S)
      return {
        ...E,
        opacity: Math.max(0.05, m)
      };
    const w = Math.round(S.x + (E.x - S.x) * m), p = Math.round(S.y + (E.y - S.y) * m), $ = Math.round(S.width + (E.width - S.width) * m), C = Math.round(S.height + (E.height - S.height) * m), W = Number(((S.rotation || 0) + ((E.rotation || 0) - (S.rotation || 0)) * m).toFixed(1));
    return {
      ...E,
      x: w,
      y: p,
      width: $,
      height: C,
      rotation: W,
      opacity: 1
    };
  });
  return f.forEach((E) => {
    v.some((w) => w.stationId === E.stationId && w.displayId === E.displayId) || M.push({
      ...E,
      opacity: Math.max(0, 1 - m)
    });
  }), M;
}
function Hx({
  prevTimeline: e,
  newPlacements: t,
  currentEpochMs: n,
  baseEpochMs: r,
  toleranceMs: o = 500,
  virtualW: l = 1920,
  virtualH: a = 1080,
  fps: c = 30,
  utcClockPosition: u = null
}) {
  var k, g, N;
  const d = [...(e == null ? void 0 : e.keyframes) || []];
  if (d.length === 0) {
    const b = u || "top-right", E = {
      id: `kf_root_${Date.now()}`,
      timestampEpochMs: r,
      transitionDurationSec: 0.5,
      transitionType: "smooth",
      utcClockPosition: b,
      layout: {
        width: l,
        height: a,
        backgroundColor: "#070A10",
        fps: c,
        utcClockPosition: b,
        placements: t
      }
    };
    return {
      nextTimeline: { ...e || {}, keyframes: [E] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: E
    };
  }
  const y = d.findIndex((b) => Math.abs(b.timestampEpochMs - n) <= o);
  if (y >= 0) {
    const b = d[y].utcClockPosition || ((k = d[y].layout) == null ? void 0 : k.utcClockPosition), E = u || b || "top-right";
    return d[y] = {
      ...d[y],
      utcClockPosition: E,
      layout: {
        ...d[y].layout,
        width: l,
        height: a,
        utcClockPosition: E,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: d },
      newIndex: y,
      isNewKeyframe: !1,
      activeKeyframe: d[y]
    };
  }
  if (n <= r + o) {
    const b = d[0].utcClockPosition || ((g = d[0].layout) == null ? void 0 : g.utcClockPosition), E = u || b || "top-right";
    return d[0] = {
      ...d[0],
      utcClockPosition: E,
      layout: {
        ...d[0].layout,
        width: l,
        height: a,
        utcClockPosition: E,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: d },
      newIndex: 0,
      isNewKeyframe: !1,
      activeKeyframe: d[0]
    };
  }
  const m = [...d].reverse().find((b) => b.timestampEpochMs <= n) || d[0], f = u || (m == null ? void 0 : m.utcClockPosition) || ((N = m == null ? void 0 : m.layout) == null ? void 0 : N.utcClockPosition) || "top-right", v = {
    id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestampEpochMs: Math.round(n),
    transitionDurationSec: 0.5,
    transitionType: "smooth",
    utcClockPosition: f,
    layout: {
      width: l,
      height: a,
      backgroundColor: "#070A10",
      fps: c,
      utcClockPosition: f,
      placements: t
    }
  }, M = [...d, v].sort((b, E) => b.timestampEpochMs - E.timestampEpochMs), j = M.findIndex((b) => b.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: M },
    newIndex: j >= 0 ? j : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function uu(e, t, { transitionType: n, transitionDurationSec: r }) {
  if (!e || !Array.isArray(e.keyframes) || t < 0 || t >= e.keyframes.length)
    return e;
  const o = [...e.keyframes], l = o[t];
  return o[t] = {
    ...l,
    ...n !== void 0 ? { transitionType: n } : {},
    ...r !== void 0 ? { transitionDurationSec: Math.max(0.1, Number(r)) } : {}
  }, {
    ...e,
    keyframes: o
  };
}
function du(e, t, n) {
  if (!e || !Array.isArray(e.keyframes) || t < 0 || t >= e.keyframes.length)
    return e;
  const r = [...e.keyframes], o = r[t], l = n || "top-right";
  return r[t] = {
    ...o,
    utcClockPosition: l,
    layout: {
      ...o.layout || {},
      utcClockPosition: l
    }
  }, {
    ...e,
    keyframes: r
  };
}
function zx(e, t) {
  if (!e || !Array.isArray(e.keyframes) || t <= 0 || t >= e.keyframes.length)
    return {
      nextTimeline: e,
      success: !1,
      newIndex: Math.max(0, t || 0)
    };
  const n = e.keyframes.filter((o, l) => l !== t), r = Math.max(0, t - 1);
  return {
    nextTimeline: {
      ...e,
      keyframes: n
    },
    success: !0,
    newIndex: r
  };
}
function Bh(e, t, n, r = 500) {
  var f;
  const o = (e == null ? void 0 : e.keyframes) || [], l = o.findIndex((v) => Math.abs(v.timestampEpochMs - t) <= r);
  if (l >= 0)
    return {
      nextTimeline: e,
      newIndex: l,
      isNew: !1
    };
  const a = [...o].reverse().find((v) => v.timestampEpochMs <= t) || o[0], c = (n == null ? void 0 : n.utcClockPosition) || (a == null ? void 0 : a.utcClockPosition) || ((f = a == null ? void 0 : a.layout) == null ? void 0 : f.utcClockPosition) || "top-right", u = n ? JSON.parse(JSON.stringify(n)) : {};
  u.utcClockPosition = c;
  const d = {
    id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestampEpochMs: Math.round(t),
    transitionDurationSec: 0.5,
    transitionType: "smooth",
    utcClockPosition: c,
    layout: u
  }, y = [...o, d].sort((v, M) => v.timestampEpochMs - M.timestampEpochMs), m = y.findIndex((v) => v.id === d.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: y
    },
    newIndex: m >= 0 ? m : 0,
    isNew: !0
  };
}
function Kx(e, t = [], n = [], r = null, o = null, l = "mon-0") {
  let a = Array.isArray(e) ? e.map((d) => ({
    ...d,
    startEpochMs: d.startEpochMs ?? d.StartEpochMs ?? 0,
    endEpochMs: d.endEpochMs ?? d.EndEpochMs ?? 0,
    targetDisplayId: (d.targetDisplayId || d.TargetDisplayId || l || "mon-0").toLowerCase()
  })).sort((d, y) => d.startEpochMs - y.startEpochMs) : [];
  if (r !== null && o !== null && o > r)
    if (a.length === 0)
      a.push({
        startEpochMs: r,
        endEpochMs: o,
        targetDisplayId: (l || "mon-0").toLowerCase(),
        isManualOverride: !1
      });
    else {
      a[0].startEpochMs > r && (a[0].startEpochMs = r), a[a.length - 1].endEpochMs < o && (a[a.length - 1].endEpochMs = o);
      for (let d = 0; d < a.length - 1; d++)
        a[d + 1].startEpochMs > a[d].endEpochMs && (a[d].endEpochMs = a[d + 1].startEpochMs);
    }
  const c = [];
  Array.isArray(n) && n.length > 0 && n.forEach((d) => {
    const y = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, m = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    m > y && c.push({ startEpoch: y, endEpoch: m });
  }), Array.isArray(t) && t.filter((d) => d.type === "global").forEach((d) => {
    const y = d.startEpochMs ?? d.startEpoch ?? 0, m = d.endEpochMs ?? d.endEpoch ?? 0;
    m > y && !c.some((f) => f.startEpoch === y && f.endEpoch === m) && c.push({ startEpoch: y, endEpoch: m });
  }), c.forEach((d) => {
    const y = d.startEpoch, m = d.endEpoch, f = [];
    a.forEach((v) => {
      v.endEpochMs <= y || v.startEpochMs >= m ? f.push(v) : (v.startEpochMs < y && f.push({
        ...v,
        endEpochMs: y
      }), v.endEpochMs > m && f.push({
        ...v,
        startEpochMs: m
      }));
    }), a = f;
  }), (t || []).filter((d) => d.type !== "global").forEach((d) => {
    const y = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, m = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    if (!(!y || !m || m <= y))
      for (let f = a.length - 1; f > 0; f--) {
        const v = a[f].startEpochMs;
        v >= y && v <= m && a[f].startEpochMs === a[f - 1].endEpochMs && (a[f - 1].endEpochMs = a[f].endEpochMs, a.splice(f, 1));
      }
  });
  for (let d = a.length - 1; d > 0; d--)
    a[d].targetDisplayId === a[d - 1].targetDisplayId && a[d].startEpochMs === a[d - 1].endEpochMs && (a[d - 1].endEpochMs = a[d].endEpochMs, a.splice(d, 1));
  return a;
}
const km = 6;
function Vx(e, t) {
  return !t || t <= 0 ? null : t <= 360 ? 360 : t <= 540 ? 480 : t <= 750 ? 720 : null;
}
function Yx(e, {
  maxConcurrentDecoders: t = km,
  activeAudioStationId: n = null,
  selectedFeedIndex: r = null,
  hoveredFeedIndex: o = null
} = {}) {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  const l = Math.min(6, Math.max(1, Number(t) || 6));
  if (e.length <= l)
    return e.map(() => !0);
  const c = e.map((d, y) => {
    var O, k;
    const m = d.width || 1920, f = d.height || 1080;
    let v = m * f;
    const M = (d.stationId || d.hostname || ((O = d.station) == null ? void 0 : O.id) || ((k = d.station) == null ? void 0 : k.hostname) || "").toLowerCase(), j = (n || "").toLowerCase();
    return j && (M === j || M.includes(j) || j.includes(M)) && (v += 1e8), r === y && (v += 5e7), o === y && (v += 25e6), { idx: y, score: v };
  });
  c.sort((d, y) => y.score - d.score);
  const u = new Set(c.slice(0, l).map((d) => d.idx));
  return e.map((d, y) => u.has(y));
}
const Pa = [
  { id: "4K", label: "4K UHD", shortLabel: "4K", baseH: 2160, desc: "Ultra-High Density" },
  { id: "2K", label: "2K QHD / WQXGA", shortLabel: "2K", baseH: 1440, desc: "High Pixel Density (Default)" },
  { id: "FHD", label: "1080p FHD", shortLabel: "FHD", baseH: 1080, desc: "Standard Full HD" },
  { id: "HD", label: "720p HD", shortLabel: "HD", baseH: 720, desc: "Compact Fast Export" }
], Ws = "CUSTOM", Us = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 2560, h: 1440 },
  { id: "16:10", label: "16:10 WUXGA / WQXGA", ratio: 16 / 10, w: 2560, h: 1600 },
  { id: "19:10", label: "19:10 NOC Extended", ratio: 19 / 10, w: 2736, h: 1440 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 3440, h: 1440 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 5120, h: 1440 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1920, h: 1440 }
], Xx = "16:9", Gx = 2560, Qx = 1440;
function js(e, t = 320, n = 7680) {
  let r = Number(e);
  return isNaN(r) && (r = t), r = Math.max(t, Math.min(n, Math.round(r))), r -= r % 2, r;
}
function hu(e) {
  if (!e || typeof e != "string") return null;
  const t = e.trim().match(/^(\d{3,5})\s*[xX×]\s*(\d{3,5})$/);
  if (t) {
    const n = js(parseInt(t[1], 10), 320, 7680), r = js(parseInt(t[2], 10), 180, 4320);
    return { w: n, h: r };
  }
  return null;
}
function fu(e) {
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
  if ((e === "CUSTOM" || n && !Pa.some((c) => c.id === e)) && n && n.w && n.h)
    return {
      w: js(n.w, 320, 7680),
      h: js(n.h, 180, 4320)
    };
  if (typeof e == "string" && (e.includes("x") || e.includes("X") || e.includes("×"))) {
    const c = hu(e);
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
  const r = Us.find((c) => c.id === t), o = r ? r.ratio : fu(t) || 16 / 9, l = e === "4K" ? 2160 : e === "2K" ? 1440 : e === "HD" ? 720 : 1080;
  let a = Math.round(l * o);
  return a -= a % 2, { w: a, h: l };
}
function Hr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 19 / 10) < 0.04 ? "19:10" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
const It = [
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
], Jx = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function qx(e, t, n) {
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
function gr(e, t, n, r, o) {
  const l = o > 0 ? o : 1.7777777777777777, a = n / r;
  let c, u, d, y;
  return l >= a ? (c = n, u = Math.round(c / l), d = e, y = t + Math.round((r - u) / 2)) : (u = r, c = Math.round(u * l), d = e + Math.round((n - c) / 2), y = t), { x: d, y, width: c, height: u };
}
function dr(e, t = Gx, n = Qx) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const u = e[0], d = u.nativeAspectRatio || (u.sourceWidth && u.sourceHeight ? u.sourceWidth / u.sourceHeight : 16 / 9), { x: y, y: m, width: f, height: v } = gr(0, 0, t, n, d);
    return [{
      ...u,
      x: y,
      y: m,
      width: f,
      height: v,
      sourceWidth: u.sourceWidth || 1920,
      sourceHeight: u.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: It[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const u = Math.round(t / 2);
    return e.slice(0, 2).map((d, y) => {
      const m = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: f, y: v, width: M, height: j } = gr(y * u, 0, u, n, m);
      return {
        ...d,
        x: f,
        y: v,
        width: M,
        height: j,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: m,
        aspectRatio: m,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: It[y % It.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const f = Math.round(t / 3);
      return e.slice(0, 3).map((v, M) => {
        const j = v.nativeAspectRatio || (v.sourceWidth && v.sourceHeight ? v.sourceWidth / v.sourceHeight : 1.7777777777777777), { x: O, y: k, width: g, height: N } = gr(M * f, 0, f, n, j);
        return {
          ...v,
          x: O,
          y: k,
          width: g,
          height: N,
          sourceWidth: v.sourceWidth || 1920,
          sourceHeight: v.sourceHeight || 1080,
          nativeAspectRatio: j,
          aspectRatio: j,
          zIndex: M,
          rotation: 0,
          borderWidth: 2,
          borderColor: It[M % It.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), y = Math.round(n / 2), m = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: y }
    ];
    return e.slice(0, 3).map((f, v) => {
      const M = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: j, cy: O } = m[v], { x: k, y: g, width: N, height: b } = gr(j, O, d, y, M);
      return {
        ...f,
        x: k,
        y: g,
        width: N,
        height: b,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: M,
        aspectRatio: M,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: It[v % It.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 4) {
    const u = Math.round(t / 2), d = Math.round(n / 2), y = [
      { cx: 0, cy: 0 },
      { cx: u, cy: 0 },
      { cx: 0, cy: d },
      { cx: u, cy: d }
    ];
    return e.slice(0, 4).map((m, f) => {
      const v = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: M, cy: j } = y[f], { x: O, y: k, width: g, height: N } = gr(M, j, u, d, v);
      return {
        ...m,
        x: O,
        y: k,
        width: g,
        height: N,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: v,
        aspectRatio: v,
        zIndex: f,
        rotation: 0,
        borderWidth: 2,
        borderColor: It[f % It.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const o = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), l = Math.ceil(r / o), a = Math.floor(t / o), c = Math.floor(n / l);
  return e.map((u, d) => {
    const y = d % o, m = Math.floor(d / o), f = u.nativeAspectRatio || (u.sourceWidth && u.sourceHeight ? u.sourceWidth / u.sourceHeight : 16 / 9), { x: v, y: M, width: j, height: O } = gr(y * a, m * c, a, c, f);
    return {
      ...u,
      x: v,
      y: M,
      width: j,
      height: O,
      sourceWidth: u.sourceWidth || 1920,
      sourceHeight: u.sourceHeight || 1080,
      nativeAspectRatio: f,
      aspectRatio: f,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: It[d % It.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function Zx({
  activeStation: e,
  timelineStations: t = [],
  allStations: n = [],
  onSelectActiveStation: r,
  onOpenSpotlight: o,
  onStationContextMenu: l,
  onDeselectStation: a = null,
  stationAutoDirectorMap: c = {},
  onToggleStationAutoDirector: u = null,
  baseEpochMs: d = 0,
  playheadMs: y = 0,
  playheadEpochMs: m = 0,
  timeMode: f = "LOCAL",
  isPlaying: v = !1,
  setIsPlaying: M,
  totalDurationMs: j,
  inPointMs: O = 0,
  outPointMs: k,
  setPlayheadMs: g,
  globalGaps: N = [],
  recordingSegments: b = {},
  playbackSpeed: E = 1,
  onChangePlaybackSpeed: S,
  keystrokeMode: w = "BurnIn",
  keystrokes: p = [],
  directorPlan: $ = null,
  onOverrideDisplay: C,
  onResetOverride: W,
  compositionLayout: ee = "canvas",
  onChangeCompositionLayout: I,
  isAutoDirectorEnabled: R = !0,
  onToggleAutoDirector: ne,
  onUpdateCanvasLayout: se,
  canvasLayoutTimeline: oe = null,
  onUpdateCanvasLayoutTimeline: U,
  activeKfIndex: Y = 0,
  setActiveKfIndex: T,
  isModalOpen: H = !1,
  isGridFullscreen: z = void 0,
  onToggleGridFullscreen: xe = null,
  activeFocusZone: X = "timeline",
  onFocusZoneChange: V = null
}) {
  const K = m > 0 ? m : d + y, [ge, fe] = i.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [ye, De] = i.useState(() => {
    var h;
    return ((h = t[0]) == null ? void 0 : h.id) || null;
  }), [Ce, Ie] = i.useState(!1), [Ze, Xe] = i.useState(!1), [Ht, Ot] = i.useState(!1), [ft, G] = i.useState(null), [Le, B] = i.useState({ index: null, position: null }), [D, J] = i.useState(!1), [_, P] = i.useState(!1), [Q, le] = i.useState(!1), [re, we] = i.useState(!1), [Ee, ze] = i.useState(!1), [st, Je] = i.useState(""), [pt, ut] = i.useState(""), nt = i.useRef(null), [tt, en] = i.useState(() => {
    try {
      const h = localStorage.getItem("itb_canvas_saved_presets");
      return h ? JSON.parse(h) : [];
    } catch {
      return [];
    }
  }), _t = (h) => {
    en(h);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(h));
    } catch {
    }
  }, [bt, it] = i.useState(!1), mt = z !== void 0 ? z : bt, [gt, Dt] = i.useState(!1);
  i.useRef(null);
  const pn = i.useRef(null), Nt = i.useRef(null), tn = i.useRef(null), [Gt, He] = i.useState({ width: 960, height: 540 }), [pe, Ue] = i.useState(null), [kt, de] = i.useState(!1), [te, ue] = i.useState(null), [je, Fe] = i.useState(""), et = i.useRef(null), [rt, wt] = i.useState("");
  i.useEffect(() => {
    te !== null && et.current && (et.current.focus(), et.current.select());
  }, [te]), i.useEffect(() => {
    const h = (x) => {
      x.key === "Escape" && (de(!1), Ue(null));
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, []);
  const [at, dt] = i.useState(!1), [Kt, Ft] = i.useState(!1), [Qt, Jt] = i.useState(!1), xn = i.useRef(null);
  i.useEffect(() => {
    if (!Qt) return;
    const h = (A) => {
      xn.current && !xn.current.contains(A.target) && Jt(!1);
    }, x = (A) => {
      A.key === "Escape" && Jt(!1);
    };
    return window.addEventListener("mousedown", h), window.addEventListener("keydown", x), () => {
      window.removeEventListener("mousedown", h), window.removeEventListener("keydown", x);
    };
  }, [Qt]), i.useEffect(() => {
    Jt(!1);
  }, [pe]);
  const [yn, as] = i.useState(!1), [Jn, is] = i.useState(!1), [ys, io] = i.useState({ vertical: null, horizontal: null }), [nn, _s] = i.useState(!0), [Go, Qo] = i.useState(!0), [er, qn] = i.useState(null), [Ln, On] = i.useState({ x: 0, y: 0, isInside: !1 }), tr = i.useRef(null), dn = i.useRef(null), En = i.useRef(!1), [kn, $t] = i.useState("auto-grid"), Or = i.useRef(!0);
  i.useEffect(() => {
    const h = setTimeout(() => {
      Or.current = !1;
    }, 400);
    return () => clearTimeout(h);
  }, []);
  const Bn = i.useRef([]), Vt = i.useRef([]), vs = i.useRef(null), [, Dr] = i.useState(0), Is = i.useRef(null), [Pr, Jo] = i.useState(null), Rt = i.useCallback((h, x = "success", A = "💾") => {
    Is.current && clearTimeout(Is.current), Jo({ text: h, type: x, icon: A }), Is.current = setTimeout(() => {
      Jo(null), Is.current = null;
    }, 2200);
  }, []), [mn, nr] = i.useState(() => {
    var A, Z, q, F, ae, ve;
    const h = (q = (Z = (A = oe == null ? void 0 : oe.keyframes) == null ? void 0 : A[0]) == null ? void 0 : Z.layout) == null ? void 0 : q.width, x = (ve = (ae = (F = oe == null ? void 0 : oe.keyframes) == null ? void 0 : F[0]) == null ? void 0 : ae.layout) == null ? void 0 : ve.height;
    if (h && x && h >= 320 && x >= 180)
      return { w: js(h), h: js(x, 180, 4320) };
    try {
      const me = localStorage.getItem("itb_studio_canvas_custom_w"), Ne = localStorage.getItem("itb_studio_canvas_custom_h");
      if (me && Ne) {
        const qe = parseInt(me, 10), ot = parseInt(Ne, 10);
        if (qe >= 320 && ot >= 180)
          return { w: js(qe), h: js(ot, 180, 4320) };
      }
    } catch {
    }
    return { w: 2560, h: 1440 };
  }), [Yt, _r] = i.useState(() => {
    const h = oe == null ? void 0 : oe.resolution;
    if (h && (Pa.some((x) => x.id === h) || h === Ws || hu(h)))
      return h;
    try {
      const x = localStorage.getItem("itb_studio_canvas_resolution");
      if (x && (Pa.some((A) => A.id === x) || x === Ws || hu(x))) return x;
    } catch {
    }
    return "2K";
  }), [At, cs] = i.useState(() => {
    var Z, q, F, ae, ve, me;
    const h = oe == null ? void 0 : oe.aspectRatio;
    if (h && Us.some((Ne) => Ne.id === h))
      return h;
    const x = (F = (q = (Z = oe == null ? void 0 : oe.keyframes) == null ? void 0 : Z[0]) == null ? void 0 : q.layout) == null ? void 0 : F.width, A = (me = (ve = (ae = oe == null ? void 0 : oe.keyframes) == null ? void 0 : ae[0]) == null ? void 0 : ve.layout) == null ? void 0 : me.height;
    if (x && A) {
      const Ne = x / A, qe = Us.find((ot) => Math.abs(ot.ratio - Ne) < 0.04);
      if (qe) return qe.id;
    }
    try {
      const Ne = localStorage.getItem("itb_studio_canvas_aspect");
      if (Ne && (Us.some((qe) => qe.id === Ne) || fu(Ne))) return Ne;
    } catch {
    }
    return Xx;
  }), qo = i.useMemo(() => ur(Yt, At, mn), [Yt, At, mn]), Oe = qo.w, Re = qo.h, Fr = i.useMemo(() => {
    const h = Us.find((A) => A.id === At);
    if (h) return { ...h, w: Oe, h: Re };
    const x = Oe && Re && Re > 0 ? Oe / Re : 16 / 9;
    return {
      id: At,
      label: `${At}`,
      ratio: x,
      w: Oe,
      h: Re
    };
  }, [At, Oe, Re]).ratio, [sr, Wr] = i.useState(""), [co, Zo] = i.useState(""), [L, ie] = i.useState(null);
  i.useEffect(() => {
    Ee && (Wr(String(Oe)), Zo(String(Re)), ie(null));
  }, [Ee]), i.useEffect(() => {
    if (!Q && !re && !Ee && !_)
      return;
    const h = (x) => {
      x.target.closest(".wing-floating-popout") || x.target.closest(".btn-wing-tool") || (le(!1), we(!1), ze(!1), P(!1));
    };
    return window.addEventListener("mousedown", h, !0), () => window.removeEventListener("mousedown", h, !0);
  }, [Q, re, Ee, _]);
  const [ce, ke] = i.useState(() => {
    try {
      const h = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (h !== null) return h === "true";
    } catch {
    }
    return !1;
  }), $e = i.useCallback(() => {
    ke((h) => {
      const x = !h;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(x));
      } catch {
      }
      return x;
    });
  }, []), Se = i.useMemo(() => {
    const h = [], x = Oe >= 3e3 ? 200 : 100, A = x / 2, Z = x / 10;
    for (let q = 0; q <= Oe; q += Z) {
      const F = q % x === 0, ae = !F && q % A === 0;
      h.push({ val: q, isMajor: F, isMed: ae });
    }
    return h;
  }, [Oe]), be = i.useMemo(() => {
    const h = [];
    for (let q = 0; q <= Re; q += 10) {
      const F = q % 100 === 0, ae = !F && q % 50 === 0;
      h.push({ val: q, isMajor: F, isMed: ae });
    }
    return h;
  }, [Re]), Be = i.useCallback((h) => {
    const x = tr.current || Nt.current;
    if (!x) return;
    const A = x.getBoundingClientRect(), Z = ln(Math.round((h.clientX - A.left) / A.width * Oe), 0, Oe), q = ln(Math.round((h.clientY - A.top) / A.height * Re), 0, Re);
    On({ x: Z, y: q, isInside: !0 });
  }, [Oe, Re]), Ge = i.useCallback(() => {
    On((h) => ({ ...h, isInside: !1 }));
  }, []), We = i.useCallback(() => {
    const h = tn.current;
    if (!h) return;
    const x = h.getBoundingClientRect(), A = 104, Z = nn ? 20 : 0, q = nn ? 18 : 0, F = Math.max(320, Math.floor(x.width || 960) - A - 16 - Z), ae = Math.max(180, Math.floor(x.height || 540) - 16 - q);
    let ve, me;
    ce ? (ve = F, me = Math.round(ve / Fr)) : F / ae >= Fr ? (me = ae, ve = Math.round(me * Fr)) : (ve = F, me = Math.round(ve / Fr)), He((Ne) => Ne.width === ve && Ne.height === me ? Ne : { width: ve, height: me });
  }, [ce, Fr, nn]);
  i.useEffect(() => {
    const h = tn.current;
    if (!h) return;
    We();
    let x = null;
    return typeof ResizeObserver < "u" && (x = new ResizeObserver(() => {
      We();
    }), x.observe(h)), window.addEventListener("resize", We), () => {
      x && x.disconnect(), window.removeEventListener("resize", We);
    };
  }, [We]);
  const Pe = i.useMemo(() => (t && t.length > 0 ? t : n).map((x) => {
    const A = x.displays && x.displays.length > 0 ? x.displays : x.topology && x.topology.displays && x.topology.displays.length > 0 ? x.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: x.width || 1920, height: x.height || 1080 }], Z = A.find((me) => me.isPrimary) || A[0], q = Z.width || Z.Width || x.width || 1920, F = Z.height || Z.Height || x.height || 1080, ae = q && F ? q / F : 16 / 9, ve = A.length > 1;
    return {
      stationId: x.id,
      displayId: "auto",
      label: `${x.displayName || x.roleAlias || x.hostname || x.name} - ${ve ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: x.displayName || x.roleAlias || x.hostname || x.name,
      stationHostname: x.hostname || x.id,
      isPrimary: !0,
      sourceWidth: q,
      sourceHeight: F,
      nativeAspectRatio: ae,
      aspectRatio: ae,
      width: q,
      height: F
    };
  }), [t, n]), Ve = i.useMemo(() => {
    const h = t && t.length > 0 ? t : n, x = [];
    return h.forEach((A) => {
      const Z = A.displays && A.displays.length > 0 ? A.displays : A.topology && A.topology.displays && A.topology.displays.length > 0 ? A.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: A.width || 1920, height: A.height || 1080 }], q = Z.find((me) => me.isPrimary) || Z[0], F = q.width || q.Width || A.width || 1920, ae = q.height || q.Height || A.height || 1080, ve = F / ae;
      x.push({
        stationId: A.id,
        displayId: "auto",
        label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${Z.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: A.displayName || A.roleAlias || A.hostname || A.name,
        stationHostname: A.hostname || A.id,
        isPrimary: !0,
        sourceWidth: F,
        sourceHeight: ae,
        nativeAspectRatio: ve,
        aspectRatio: ve,
        width: F,
        height: ae
      }), Z.length > 1 && Z.forEach((me, Ne) => {
        const qe = (me.displayId || `mon-${Ne}`).toLowerCase(), ot = me.displayNumber || Ne + 1, ht = me.displayName || `Screen ${ot}`, Te = me.width || me.Width || A.width || 1920, yt = me.height || me.Height || A.height || 1080, Xt = Te / yt;
        x.push({
          stationId: A.id,
          displayId: qe,
          label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${ht}`,
          stationName: A.displayName || A.roleAlias || A.hostname || A.name,
          stationHostname: A.hostname || A.id,
          isPrimary: !!me.isPrimary,
          sourceWidth: Te,
          sourceHeight: yt,
          nativeAspectRatio: Xt,
          aspectRatio: Xt,
          width: Te,
          height: yt
        });
      });
    }), x;
  }, [t, n]), [_e, Ke] = i.useState(() => {
    var h;
    if (((h = oe == null ? void 0 : oe.keyframes) == null ? void 0 : h.length) > 0) {
      const x = JSON.parse(JSON.stringify(oe));
      if (t && t.length > 0) {
        const A = new Set(t.map((q) => q.id));
        if (x.keyframes.forEach((q) => {
          var F, ae;
          ((ae = (F = q.layout) == null ? void 0 : F.placements) == null ? void 0 : ae.length) > 0 && (q.layout.placements = q.layout.placements.filter((ve) => A.has(ve.stationId)));
        }), x.keyframes.some((q) => {
          var F, ae;
          return ((ae = (F = q.layout) == null ? void 0 : F.placements) == null ? void 0 : ae.length) > 0;
        })) return x;
      } else
        return x;
    }
    return {
      id: "canvas-timeline-root",
      keyframes: [
        {
          id: "kf_root_0",
          timestampEpochMs: d,
          transitionDurationSec: 0.5,
          transitionType: "smooth",
          utcClockPosition: ge,
          layout: {
            width: Oe,
            height: Re,
            backgroundColor: "#070A10",
            fps: 30,
            utcClockPosition: ge,
            placements: dr(Pe, Oe, Re)
          }
        }
      ]
    };
  }), Wt = i.useRef(""), jt = i.useRef(_e);
  jt.current = _e, i.useEffect(() => {
    var h;
    if (((h = oe == null ? void 0 : oe.keyframes) == null ? void 0 : h.length) > 0) {
      const x = JSON.stringify(oe);
      if (x === Wt.current) return;
      if (jt.current && x === JSON.stringify(jt.current)) {
        Wt.current = x;
        return;
      }
      Wt.current = x;
      const A = JSON.parse(x);
      if (t && t.length > 0) {
        const q = new Set(t.map((F) => F.id));
        A.keyframes.forEach((F) => {
          var ae, ve;
          ((ve = (ae = F.layout) == null ? void 0 : ae.placements) == null ? void 0 : ve.length) > 0 && (F.layout.placements = F.layout.placements.filter((me) => q.has(me.stationId)));
        });
      }
      Ke(A), A.keyframes.some((q) => {
        var F, ae;
        return ((ae = (F = q.layout) == null ? void 0 : F.placements) == null ? void 0 : ae.length) > 0;
      }) && (En.current = !0, $t("custom"));
    }
  }, [oe, t]);
  const xt = _e.keyframes || [], us = i.useMemo(() => Ux(xt, K), [xt, K]), Ct = ln(
    Y ?? us,
    0,
    Math.max(0, xt.length - 1)
  ), Lt = xt[Ct] || xt[us] || xt[0], he = i.useMemo(() => {
    var h;
    return ((h = Lt == null ? void 0 : Lt.layout) == null ? void 0 : h.placements) || [];
  }, [Lt]), Fs = i.useMemo(() => {
    var h;
    return (Lt == null ? void 0 : Lt.utcClockPosition) || ((h = Lt == null ? void 0 : Lt.layout) == null ? void 0 : h.utcClockPosition) || ge;
  }, [Lt, ge]);
  i.useEffect(() => {
    pe >= 0 && he[pe] ? wt(he[pe].label ?? "") : wt("");
  }, [pe, he]);
  const rr = i.useCallback((h = "Action") => ({
    label: h,
    timeline: JSON.parse(JSON.stringify(_e)),
    resolutionId: Yt,
    aspectId: At,
    presetId: kn,
    selectedFeedIndex: pe
  }), [_e, Yt, At, kn, pe]), Zn = i.useCallback((h = "Action") => {
    const x = rr(h);
    Bn.current.push(x), Bn.current.length > 50 && Bn.current.shift(), Vt.current = [], Dr((A) => A + 1);
  }, [rr]), hd = i.useCallback(() => {
    vs.current && (Bn.current.push(vs.current), Bn.current.length > 50 && Bn.current.shift(), Vt.current = [], vs.current = null, Dr((h) => h + 1));
  }, []), fd = i.useCallback(() => {
    const h = m > 0 ? m : d + y, x = 500;
    if (h <= d + x) return Ct;
    const A = Lt != null && Lt.layout ? JSON.parse(JSON.stringify(Lt.layout)) : {
      width: Oe,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      utcClockPosition: Fs,
      placements: he
    };
    A.utcClockPosition = A.utcClockPosition || Fs;
    const { nextTimeline: Z, newIndex: q, isNew: F } = Bh(_e, h, A, x);
    return F && (Ke(Z), U && U(Z), T && T(q), Rt(
      `Keyframe #${q + 1} created at ${Et(h, f, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), q;
  }, [m, d, y, Ct, Lt, Oe, Re, he, Fs, _e, U, T, f, Rt]), lt = i.useCallback((h, x = null) => {
    x && Zn(x);
    const A = m > 0 ? m : d + y;
    Ke((Z) => {
      const { nextTimeline: q, newIndex: F, isNewKeyframe: ae } = Hx({
        prevTimeline: Z,
        newPlacements: h,
        currentEpochMs: A,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Oe,
        virtualH: Re,
        fps: 30,
        utcClockPosition: Fs
      });
      return U && U(q), T && T(F), ae && F > 0 && Rt(
        `Keyframe #${F + 1} created at ${Et(A, f, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), q;
    });
  }, [m, d, y, Oe, Re, Fs, U, T, f, Rt, Zn]);
  i.useEffect(() => {
    if (Pe.length > 0 && (!he || he.length === 0) && !En.current) {
      const h = dr(Pe, Oe, Re);
      h.length > 0 && (lt(h), $t("auto-grid"));
    }
  }, [Pe, he, lt, Oe, Re]);
  const pd = i.useRef("");
  i.useEffect(() => {
    if (!t || t.length === 0 || Pe.length === 0) return;
    const h = (t || []).map((Z) => Z.id).sort().join(","), x = new Set((he || []).map((Z) => Z.stationId)), A = t.some((Z) => !x.has(Z.id));
    if (pd.current !== h || A) {
      if (pd.current = h, kn === "auto-grid" || !En.current || A || !he || he.length === 0) {
        const Z = dr(Pe, Oe, Re);
        Z.length > 0 && lt(Z);
      } else if (he && he.length > 0) {
        const Z = new Set(t.map((F) => F.id)), q = he.filter((F) => Z.has(F.stationId));
        if (q.length !== he.length)
          if (q.length === 0) {
            const F = dr(Pe, Oe, Re);
            lt(F);
          } else
            lt(q);
      }
    }
  }, [t, Pe, kn, he, lt, Oe, Re]), i.useEffect(() => {
    se && se({
      width: Oe,
      height: Re,
      resolution: Yt,
      aspectRatio: At,
      backgroundColor: "#070A10",
      fps: 30,
      placements: he,
      timeline: _e
    });
  }, [he, _e, se, Oe, Re, Yt, At]);
  const Tm = i.useCallback((h) => {
    if (Yt === h) return;
    const x = ur(Yt, At, mn), A = ur(h, At, mn);
    _r(h);
    try {
      localStorage.setItem("itb_studio_canvas_resolution", h);
    } catch {
    }
    const Z = A.w / x.w, q = A.h / x.h, F = he.map((ae) => ({
      ...ae,
      x: Math.round(ae.x * Z),
      y: Math.round(ae.y * q),
      width: Math.max(40, Math.round(ae.width * Z)),
      height: Math.max(30, Math.round(ae.height * q))
    }));
    lt(F, `Resolution change to ${h}`), Rt(`Canvas Resolution: ${h} (${A.w}×${A.h})`, "info", "📺");
  }, [Yt, At, mn, he, lt, Rt]), Ti = i.useCallback(() => {
    const h = parseInt(sr, 10), x = parseInt(co, 10);
    if (isNaN(h) || isNaN(x)) {
      ie("Enter valid numbers");
      return;
    }
    if (h < 320 || h > 7680) {
      ie("Width: 320 - 7680px");
      return;
    }
    if (x < 180 || x > 4320) {
      ie("Height: 180 - 4320px");
      return;
    }
    ie(null);
    const A = js(h, 320, 7680), Z = js(x, 180, 4320), q = ur(Yt, At, mn), F = { w: A, h: Z };
    nr(F), _r(Ws);
    const ae = Hr(A, Z);
    cs(ae);
    try {
      localStorage.setItem("itb_studio_canvas_resolution", Ws), localStorage.setItem("itb_studio_canvas_custom_w", String(A)), localStorage.setItem("itb_studio_canvas_custom_h", String(Z)), localStorage.setItem("itb_studio_canvas_aspect", ae);
    } catch {
    }
    if (q.w !== F.w || q.h !== F.h) {
      const ve = F.w / q.w, me = F.h / q.h, Ne = he.map((qe) => ({
        ...qe,
        x: Math.round(qe.x * ve),
        y: Math.round(qe.y * me),
        width: Math.max(40, Math.round(qe.width * ve)),
        height: Math.max(30, Math.round(qe.height * me))
      }));
      lt(Ne, `Custom resolution set to ${A}×${Z}`);
    }
    ze(!1), Rt(`Canvas Resolution: Custom (${A}×${Z})`, "info", "📺");
  }, [sr, co, Yt, At, mn, he, lt, Rt]), $m = i.useCallback((h) => {
    if (At === h) return;
    const x = ur(Yt, At, mn);
    let A;
    if (Yt === Ws && (mn != null && mn.h)) {
      const Z = Us.find((ae) => ae.id === h), q = Z ? Z.ratio : fu(h) || 16 / 9;
      A = { w: js(Math.round(mn.h * q), 320, 7680), h: mn.h }, nr(A);
      try {
        localStorage.setItem("itb_studio_canvas_custom_w", String(A.w)), localStorage.setItem("itb_studio_canvas_custom_h", String(A.h));
      } catch {
      }
    } else
      A = ur(Yt, h, mn);
    cs(h);
    try {
      localStorage.setItem("itb_studio_canvas_aspect", h);
    } catch {
    }
    if (En.current) {
      const Z = A.w / x.w, q = A.h / x.h, F = he.map((ae) => ({
        ...ae,
        x: Math.round(ae.x * Z),
        y: Math.round(ae.y * q),
        width: Math.max(40, Math.round(ae.width * Z)),
        height: Math.max(30, Math.round(ae.height * q))
      }));
      lt(F, `Aspect change to ${h}`);
    } else {
      const Z = Pe.length > 0 ? Pe : he && he.length > 0 ? he : Ve, q = dr(Z, A.w, A.h);
      lt(q, `Aspect change to ${h}`);
    }
    Rt(`Canvas Aspect: ${h} (${A.w}×${A.h})`, "info", "📐");
  }, [At, Yt, mn, Pe, he, Ve, lt, Rt]), md = i.useCallback((h) => {
    if (he.length >= 6) {
      alert("Maximum concurrent studio playback screens reached (Hard cap: 6 screens). Please remove or replace a screen.");
      return;
    }
    const x = he.length > 0 ? Math.max(...he.map((me) => me.zIndex || 0)) + 1 : 0, A = It[he.length % It.length], Z = h.nativeAspectRatio || (h.sourceWidth && h.sourceHeight ? h.sourceWidth / h.sourceHeight : 16 / 9), q = Z >= 1 ? 640 : Math.round(360 * Z), F = Z >= 1 ? Math.round(640 / Z) : 360, ae = {
      stationId: h.stationId,
      displayId: h.displayId,
      label: h.label,
      x: 100 + he.length * 40 % 800,
      y: 80 + he.length * 40 % 500,
      width: q,
      height: F,
      sourceWidth: h.sourceWidth || 1920,
      sourceHeight: h.sourceHeight || 1080,
      nativeAspectRatio: Z,
      aspectRatio: Z,
      zIndex: x,
      rotation: 0,
      borderWidth: 2,
      borderColor: A,
      shadowEffect: "deep",
      borderRadius: 0
    }, ve = [...he, ae];
    lt(ve), Ue(ve.length - 1);
  }, [he, lt]), Jl = i.useCallback((h) => {
    const x = he.filter((A, Z) => Z !== h);
    lt(x), Ue((A) => x.length === 0 ? null : A !== null ? Math.min(A, x.length - 1) : null);
  }, [he, lt]), gd = i.useCallback(() => {
    lt([]), Ue(null);
  }, [lt]), ql = (h) => {
    const x = h.map((Z, q) => ({ p: Z, origIdx: q }));
    x.sort((Z, q) => (Z.p.zIndex ?? Z.origIdx) - (q.p.zIndex ?? q.origIdx));
    const A = [...h];
    return x.forEach(({ origIdx: Z }, q) => {
      A[Z] = { ...A[Z], zIndex: q + 1 };
    }), A;
  };
  i.useCallback((h = pe) => {
    if (h < 0 || !he[h]) return;
    const x = ql(he), A = x[h].zIndex, Z = x.length;
    if (A >= Z) return;
    const q = x.map((F, ae) => ae === h ? { ...F, zIndex: Z } : F.zIndex > A ? { ...F, zIndex: F.zIndex - 1 } : F);
    lt(q);
  }, [pe, he, lt]), i.useCallback((h = pe) => {
    if (h < 0 || !he[h]) return;
    const x = ql(he), A = x[h].zIndex;
    if (A <= 1) return;
    const Z = x.map((q, F) => F === h ? { ...q, zIndex: 1 } : q.zIndex < A ? { ...q, zIndex: q.zIndex + 1 } : q);
    lt(Z);
  }, [pe, he, lt]);
  const xd = i.useCallback((h = pe) => {
    if (h < 0 || !he[h]) return;
    const x = ql(he), A = x[h].zIndex, Z = A + 1;
    if (Z > x.length) return;
    const q = x.map((F, ae) => ae === h ? { ...F, zIndex: Z } : F.zIndex === Z ? { ...F, zIndex: A } : F);
    lt(q);
  }, [pe, he, lt]), yd = i.useCallback((h = pe) => {
    if (h < 0 || !he[h]) return;
    const x = ql(he), A = x[h].zIndex, Z = A - 1;
    if (Z < 1) return;
    const q = x.map((F, ae) => ae === h ? { ...F, zIndex: Z } : F.zIndex === Z ? { ...F, zIndex: A } : F);
    lt(q);
  }, [pe, he, lt]), el = i.useCallback((h) => {
    if (pe < 0 || !he[pe]) return;
    const x = he.map((A, Z) => Z === pe ? { ...A, ...h } : A);
    lt(x);
  }, [pe, he, lt]), Zl = i.useCallback((h, x, A = !0) => {
    if (h < 0 || !he[h]) return;
    const Z = typeof x == "string" ? x.trim() : "", q = Z.length > 0 ? Z : null;
    if (he[h].label === q) return;
    const F = he.map((ae, ve) => ve === h ? { ...ae, label: q } : ae);
    lt(F, A ? "Rename Screen Title" : null);
  }, [he, lt]), $i = i.useCallback((h) => {
    if (h < 0 || !he[h]) {
      ue(null);
      return;
    }
    Zl(h, je, !0), ue(null);
  }, [he, je, Zl]), Am = i.useCallback((h = 90) => {
    const x = he[pe];
    if (!x) return;
    const Z = ((x.rotation || 0) + h) % 360;
    el({ rotation: Z });
  }, [pe, he, el]), Ai = i.useCallback((h = pe) => {
    if (h < 0 || !he[h]) return;
    const x = he.length, A = he.map((Z, q) => q === h ? {
      ...Z,
      x: 0,
      y: 0,
      width: Oe,
      height: Re,
      zIndex: x
    } : Z);
    lt(A);
  }, [pe, he, lt, Oe, Re]), or = i.useCallback((h) => {
    let x = [];
    const A = Pe.length > 0 ? Pe : Ve.length > 0 ? Ve : he;
    switch (h) {
      case "auto":
      case "auto-grid":
        x = dr(A, Oe, Re);
        break;
      case "1x1":
        A.length > 0 && (x = [{
          ...A[0],
          x: 0,
          y: 0,
          width: Oe,
          height: Re,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: It[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (A.length >= 2) {
          const Z = Math.round(Oe / 2);
          x = A.slice(0, 2).map((q, F) => {
            const ae = q.nativeAspectRatio || (q.sourceWidth && q.sourceHeight ? q.sourceWidth / q.sourceHeight : 1.7777777777777777), { x: ve, y: me, width: Ne, height: qe } = gr(F * Z, 0, Z, Re, ae);
            return {
              ...q,
              x: ve,
              y: me,
              width: Ne,
              height: qe,
              sourceWidth: q.sourceWidth || 1920,
              sourceHeight: q.sourceHeight || 1080,
              nativeAspectRatio: ae,
              aspectRatio: ae,
              zIndex: F + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: It[F % It.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          x = dr(A, Oe, Re);
        break;
      case "2x2": {
        const Z = Math.round(Oe / 2), q = Math.round(Re / 2);
        x = A.slice(0, 4).map((F, ae) => ({
          ...F,
          x: ae % 2 * Z,
          y: Math.floor(ae / 2) * q,
          width: Z,
          height: q,
          zIndex: ae,
          rotation: 0,
          borderWidth: 2,
          borderColor: It[ae % It.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (A.length >= 2) {
          x = [
            { ...A[0], x: 0, y: 0, width: Oe, height: Re, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: It[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Z = A.slice(1, 4), q = Math.round(Oe * 0.23), F = Math.round(q / (16 / 9));
          Z.forEach((ae, ve) => {
            x.push({
              ...ae,
              x: Oe - q - 24,
              y: 24 + ve * (F + 16),
              width: q,
              height: F,
              zIndex: 10 + ve,
              rotation: 0,
              borderWidth: 3,
              borderColor: It[(ve + 1) % It.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (A.length >= 3) {
          const Z = Math.round(Oe * 0.666), q = Oe - Z, F = Math.round(Re / 2);
          x = [
            { ...A[0], x: 0, y: 0, width: Z, height: Re, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: It[0], shadowEffect: "deep", borderRadius: 0 },
            { ...A[1], x: Z, y: 0, width: q, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: It[1], shadowEffect: "deep", borderRadius: 0 },
            { ...A[2], x: Z, y: F, width: q, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: It[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (A.length >= 3)
          if (Oe / Re >= 2.5) {
            const q = Math.round(Oe / 3);
            x = A.slice(0, 3).map((F, ae) => {
              const ve = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 1.7777777777777777), { x: me, y: Ne, width: qe, height: ot } = gr(ae * q, 0, q, Re, ve);
              return {
                ...F,
                x: me,
                y: Ne,
                width: qe,
                height: ot,
                sourceWidth: F.sourceWidth || 1920,
                sourceHeight: F.sourceHeight || 1080,
                nativeAspectRatio: ve,
                aspectRatio: ve,
                zIndex: ae,
                rotation: 0,
                borderWidth: 2,
                borderColor: It[ae % It.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const q = Math.round(Oe / 2), F = Math.round(Re / 2);
            x = [
              { ...A[0], x: 0, y: 0, width: q, height: F, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: It[0], shadowEffect: "deep", borderRadius: 0 },
              { ...A[1], x: q, y: 0, width: q, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: It[1], shadowEffect: "deep", borderRadius: 0 },
              { ...A[2], x: Math.round(q / 2), y: F, width: q, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: It[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    x.length > 0 && (lt(x), Ue(0), h === "auto" || h === "auto-grid" ? $t("auto-grid") : ($t(h), En.current = !0));
  }, [Ve, he, lt, Oe, Re]), vd = i.useCallback(() => {
    const h = st.trim() || `Custom Layout ${tt.length + 1}`, A = [{
      id: `preset-${Date.now()}`,
      name: h,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(he)),
      keyframes: JSON.parse(JSON.stringify(xt))
    }, ...tt];
    _t(A), Je(""), J(!1);
  }, [st, tt, he, xt]), Rm = i.useCallback((h) => {
    !h || !h.placements || (lt(h.placements), Ue(0), $t("custom"), En.current = !0, P(!1));
  }, [lt]), Lm = i.useCallback((h, x) => {
    x == null || x.stopPropagation();
    const A = tt.filter((Z) => Z.id !== h);
    _t(A);
  }, [tt]), Om = i.useCallback(() => {
    const h = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Oe,
      height: Re,
      aspectRatio: At,
      placements: he,
      timeline: _e
    }, x = JSON.stringify(h, null, 2), A = new window.Blob([x], { type: "application/json" }), Z = window.URL.createObjectURL(A), q = document.createElement("a"), F = /* @__PURE__ */ new Date(), ae = (me) => String(me).padStart(2, "0"), ve = `${F.getFullYear()}${ae(F.getMonth() + 1)}${ae(F.getDate())}_${ae(F.getHours())}${ae(F.getMinutes())}${ae(F.getSeconds())}`;
    q.href = Z, q.download = `canvas_layout_${ve}.json`, document.body.appendChild(q), q.click(), document.body.removeChild(q), window.URL.revokeObjectURL(Z);
  }, [he, _e, Oe, Re, At]), Dm = i.useCallback((h) => {
    var Z;
    const x = (Z = h.target.files) == null ? void 0 : Z[0];
    if (!x) return;
    const A = new window.FileReader();
    A.onload = (q) => {
      var F, ae, ve;
      try {
        const me = JSON.parse(q.target.result);
        if (me.width && me.height) {
          const qe = Us.find((ot) => ot.w === me.width && ot.h === me.height);
          qe && cs(qe.id);
        } else if (me.aspectRatio) {
          const qe = Us.find((ot) => ot.id === me.aspectRatio);
          qe && cs(qe.id);
        }
        let Ne = null;
        Array.isArray(me) ? Ne = me : me.placements && Array.isArray(me.placements) ? Ne = me.placements : (F = me.layout) != null && F.placements && Array.isArray(me.layout.placements) && (Ne = me.layout.placements), Ne && Ne.length > 0 && (lt(Ne), Ue(0), $t("custom"), En.current = !0), ((ve = (ae = me.timeline) == null ? void 0 : ae.keyframes) == null ? void 0 : ve.length) > 0 && (Ke(me.timeline), U && U(me.timeline));
      } catch (me) {
        console.error("Failed to parse imported canvas JSON:", me), alert(`Canvas Import Error: ${me.message}`);
      }
    }, A.readAsText(x), h.target.value = "";
  }, [lt, U]), Ri = (h, x) => {
    if (h.button !== 0) return;
    h.stopPropagation(), h.preventDefault(), Ue(x), V == null || V("canvas"), En.current = !0, $t("custom");
    const A = fd(), Z = tr.current || Nt.current;
    if (!Z) return;
    const q = Z.getBoundingClientRect(), F = he[x];
    if (!F) return;
    vs.current = rr("Move Feed"), dn.current = {
      mode: "drag",
      index: x,
      startX: h.clientX,
      startY: h.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      scaleX: Oe / q.width,
      scaleY: Re / q.height,
      activeSnapZone: null
    }, as(!0);
    const ae = (me) => {
      if (!dn.current || dn.current.mode !== "drag") return;
      const Ne = dn.current, qe = tr.current || Nt.current;
      if (!qe) return;
      const ot = qe.getBoundingClientRect(), ht = (me.clientX - Ne.startX) * Ne.scaleX, Te = (me.clientY - Ne.startY) * Ne.scaleY;
      let yt = Math.round(Ne.initialX + ht), Xt = Math.round(Ne.initialY + Te);
      yt = ln(yt, 0, Oe - Ne.initialW), Xt = ln(Xt, 0, Re - Ne.initialH);
      const Hn = Go && !me.altKey;
      let Ut = null, wn = null, In = null;
      if (Hn) {
        const Qe = me.clientX - ot.left, Mt = me.clientY - ot.top, Bt = 32, Me = Math.round(Oe / 2), St = Math.round(Re / 2);
        if (Qe <= Bt ? Mt <= ot.height * 0.22 ? Ut = { x: 0, y: 0, width: Me, height: St, label: "◰ Top-Left Quarter" } : Mt >= ot.height * 0.78 ? Ut = { x: 0, y: St, width: Me, height: St, label: "◱ Bottom-Left Quarter" } : Ut = { x: 0, y: 0, width: Me, height: Re, label: "◧ Left Half (50%)" } : Qe >= ot.width - Bt ? Mt <= ot.height * 0.22 ? Ut = { x: Me, y: 0, width: Me, height: St, label: "◲ Top-Right Quarter" } : Mt >= ot.height * 0.78 ? Ut = { x: Me, y: St, width: Me, height: St, label: "◳ Bottom-Right Quarter" } : Ut = { x: Me, y: 0, width: Me, height: Re, label: "◨ Right Half (50%)" } : Mt <= Bt && Qe >= ot.width * 0.25 && Qe <= ot.width * 0.75 && (Ut = { x: 0, y: 0, width: Oe, height: Re, label: "🗖 Full Canvas Maximize" }), !Ut) {
          const ir = he.filter((ct, Br) => Br !== Ne.index), Ts = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Oe, targetX: Oe - Ne.initialW, guide: 100 },
            { snapTo: Me, targetX: Me - Math.round(Ne.initialW / 2), guide: 50 }
          ];
          ir.forEach((ct) => {
            Ts.push({ snapTo: ct.x, targetX: ct.x, guide: ct.x / Oe * 100 }), Ts.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width - Ne.initialW, guide: (ct.x + ct.width) / Oe * 100 }), Ts.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width, guide: (ct.x + ct.width) / Oe * 100 }), Ts.push({ snapTo: ct.x, targetX: ct.x - Ne.initialW, guide: ct.x / Oe * 100 });
          });
          let bd = 18;
          Ts.forEach((ct) => {
            const Br = Math.abs(yt - ct.targetX);
            Br < bd && (bd = Br, yt = ct.targetX, wn = ct.guide);
          });
          const tl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Re, targetY: Re - Ne.initialH, guide: 100 },
            { snapTo: St, targetY: St - Math.round(Ne.initialH / 2), guide: 50 }
          ];
          ir.forEach((ct) => {
            tl.push({ snapTo: ct.y, targetY: ct.y, guide: ct.y / Re * 100 }), tl.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height - Ne.initialH, guide: (ct.y + ct.height) / Re * 100 }), tl.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height, guide: (ct.y + ct.height) / Re * 100 }), tl.push({ snapTo: ct.y, targetY: ct.y - Ne.initialH, guide: ct.y / Re * 100 });
          });
          let Md = 18;
          tl.forEach((ct) => {
            const Br = Math.abs(Xt - ct.targetY);
            Br < Md && (Md = Br, Xt = ct.targetY, In = ct.guide);
          });
        }
      }
      Ne.activeSnapZone = Ut, Ne.latestX = yt, Ne.latestY = Xt, qn(Ut), io({ vertical: wn, horizontal: In }), Ke((Qe) => {
        const Mt = [...Qe.keyframes || []], Bt = A < Mt.length ? A : Ct;
        if (!Mt[Bt]) return Qe;
        const Me = [...Mt[Bt].layout.placements || []];
        return Me[Ne.index] ? (Me[Ne.index] = { ...Me[Ne.index], x: yt, y: Xt }, Mt[Bt] = {
          ...Mt[Bt],
          layout: { ...Mt[Bt].layout, placements: Me }
        }, { ...Qe, keyframes: Mt }) : Qe;
      });
    }, ve = () => {
      var me;
      if (as(!1), io({ vertical: null, horizontal: null }), (me = dn.current) != null && me.activeSnapZone) {
        const Ne = dn.current.activeSnapZone, qe = dn.current.index;
        Ke((ot) => {
          const ht = [...ot.keyframes || []], Te = A < ht.length ? A : Ct;
          if (!ht[Te]) return ot;
          const yt = [...ht[Te].layout.placements || []];
          return yt[qe] ? (yt[qe] = {
            ...yt[qe],
            x: Ne.x,
            y: Ne.y,
            width: Ne.width,
            height: Ne.height
          }, ht[Te] = {
            ...ht[Te],
            layout: { ...ht[Te].layout, placements: yt }
          }, { ...ot, keyframes: ht }) : ot;
        });
      }
      if (dn.current) {
        const Ne = dn.current, qe = Ne.initialX, ot = Ne.initialY, ht = Ne.activeSnapZone ? Ne.activeSnapZone.x : Ne.latestX ?? qe, Te = Ne.activeSnapZone ? Ne.activeSnapZone.y : Ne.latestY ?? ot;
        ht !== qe || Te !== ot ? (hd(), U && Ke((yt) => (U(yt), yt))) : vs.current = null;
      }
      qn(null), dn.current = null, window.removeEventListener("mousemove", ae), window.removeEventListener("mouseup", ve);
    };
    window.addEventListener("mousemove", ae), window.addEventListener("mouseup", ve);
  }, ea = (h, x, A = "br") => {
    if (h.button !== 0) return;
    h.stopPropagation(), h.preventDefault(), Ue(x), En.current = !0, $t("custom");
    const Z = fd();
    if (!Nt.current) return;
    const q = Nt.current.getBoundingClientRect(), F = he[x];
    if (!F) return;
    vs.current = rr("Resize Feed");
    const ae = Ve.find((ht) => ht.stationId === F.stationId && ht.displayId === F.displayId), ve = F.sourceWidth || (ae == null ? void 0 : ae.sourceWidth) || 1920, me = F.sourceHeight || (ae == null ? void 0 : ae.sourceHeight) || 1080, Ne = F.nativeAspectRatio || F.aspectRatio || (ae == null ? void 0 : ae.nativeAspectRatio) || ve / me || F.width / F.height || 16 / 9;
    dn.current = {
      mode: "resize",
      corner: A,
      index: x,
      startX: h.clientX,
      startY: h.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      sourceWidth: ve,
      sourceHeight: me,
      nativeAspectRatio: Ne,
      scaleX: Oe / q.width,
      scaleY: Re / q.height
    }, is(!0);
    const qe = (ht) => {
      if (!dn.current || dn.current.mode !== "resize") return;
      const Te = dn.current, yt = (ht.clientX - Te.startX) * Te.scaleX, Xt = (ht.clientY - Te.startY) * Te.scaleY, Hn = ht.ctrlKey || ht.shiftKey || ht.metaKey, Ut = Te.nativeAspectRatio > 0 ? Te.nativeAspectRatio : Te.initialW / Te.initialH;
      let wn = Te.initialX, In = Te.initialY, Qe = Te.initialW, Mt = Te.initialH;
      if (Te.corner === "br") {
        const Bt = Oe - Te.initialX, Me = Re - Te.initialY;
        if (Hn) {
          let St = Math.max(160, Math.min(Bt, Math.round(Te.initialW + yt))), vt = Math.round(St / Ut);
          vt > Me && (vt = Me, St = Math.round(vt * Ut)), vt < 90 && (vt = 90, St = Math.round(vt * Ut)), Qe = St, Mt = vt;
        } else
          Qe = ln(Math.round(Te.initialW + yt), 160, Bt), Mt = ln(Math.round(Te.initialH + Xt), 90, Me);
      } else if (Te.corner === "bl") {
        const Bt = Te.initialX + Te.initialW, Me = Re - Te.initialY;
        if (Hn) {
          let St = Math.max(160, Math.min(Bt, Math.round(Te.initialW - yt))), vt = Math.round(St / Ut);
          vt > Me && (vt = Me, St = Math.round(vt * Ut)), vt < 90 && (vt = 90, St = Math.round(vt * Ut)), Qe = St, Mt = vt, wn = Te.initialX + Te.initialW - Qe;
        } else
          Qe = ln(Math.round(Te.initialW - yt), 160, Bt), Mt = ln(Math.round(Te.initialH + Xt), 90, Me), wn = Te.initialX + Te.initialW - Qe;
      } else if (Te.corner === "tr") {
        const Bt = Oe - Te.initialX, Me = Te.initialY + Te.initialH;
        if (Hn) {
          let St = Math.max(160, Math.min(Bt, Math.round(Te.initialW + yt))), vt = Math.round(St / Ut);
          vt > Me && (vt = Me, St = Math.round(vt * Ut)), vt < 90 && (vt = 90, St = Math.round(vt * Ut)), Qe = St, Mt = vt, In = Te.initialY + Te.initialH - Mt;
        } else
          Qe = ln(Math.round(Te.initialW + yt), 160, Bt), Mt = ln(Math.round(Te.initialH - Xt), 90, Me), In = Te.initialY + Te.initialH - Mt;
      } else if (Te.corner === "tl") {
        const Bt = Te.initialX + Te.initialW, Me = Te.initialY + Te.initialH;
        if (Hn) {
          let St = Math.max(160, Math.min(Bt, Math.round(Te.initialW - yt))), vt = Math.round(St / Ut);
          vt > Me && (vt = Me, St = Math.round(vt * Ut)), vt < 90 && (vt = 90, St = Math.round(vt * Ut)), Qe = St, Mt = vt, wn = Te.initialX + Te.initialW - Qe, In = Te.initialY + Te.initialH - Mt;
        } else
          Qe = ln(Math.round(Te.initialW - yt), 160, Bt), Mt = ln(Math.round(Te.initialH - Xt), 90, Me), wn = Te.initialX + Te.initialW - Qe, In = Te.initialY + Te.initialH - Mt;
      }
      Ke((Bt) => {
        const Me = [...Bt.keyframes || []], St = Z < Me.length ? Z : Ct;
        if (!Me[St]) return Bt;
        const vt = [...Me[St].layout.placements || []];
        return vt[Te.index] ? (vt[Te.index] = {
          ...vt[Te.index],
          x: wn,
          y: In,
          width: Qe,
          height: Mt,
          sourceWidth: Te.sourceWidth,
          sourceHeight: Te.sourceHeight,
          nativeAspectRatio: Te.nativeAspectRatio,
          aspectRatio: Te.nativeAspectRatio
        }, Me[St] = {
          ...Me[St],
          layout: { ...Me[St].layout, placements: vt }
        }, { ...Bt, keyframes: Me }) : Bt;
      });
    }, ot = () => {
      if (dn.current) {
        const ht = dn.current, Te = ht.latestW ?? ht.initialW, yt = ht.latestH ?? ht.initialH;
        Te !== ht.initialW || yt !== ht.initialH ? (hd(), U && Ke((Xt) => (U(Xt), Xt))) : vs.current = null;
      }
      is(!1), dn.current = null, window.removeEventListener("mousemove", qe), window.removeEventListener("mouseup", ot);
    };
    window.addEventListener("mousemove", qe), window.addEventListener("mouseup", ot);
  }, Pm = i.useCallback((h) => {
    const x = he[h];
    if (!x) return;
    const A = Ve.find((ve) => ve.stationId === x.stationId && ve.displayId === x.displayId), Z = x.nativeAspectRatio || x.aspectRatio || (A == null ? void 0 : A.nativeAspectRatio) || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 16 / 9);
    let q = x.width, F = Math.round(q / Z);
    x.y + F > Re && (F = Re - x.y, q = Math.round(F * Z)), x.x + q > Oe && (q = Oe - x.x, F = Math.round(q / Z));
    const ae = he.map((ve, me) => me === h ? {
      ...ve,
      width: Math.max(160, q),
      height: Math.max(90, F),
      sourceWidth: x.sourceWidth || (A == null ? void 0 : A.sourceWidth) || 1920,
      sourceHeight: x.sourceHeight || (A == null ? void 0 : A.sourceHeight) || 1080,
      nativeAspectRatio: Z,
      aspectRatio: Z
    } : ve);
    lt(ae, "Snap Native Aspect");
  }, [he, Ve, lt]), Li = i.useCallback(() => {
    if (Bn.current.length === 0) return;
    const h = rr("Redo State");
    Vt.current.push(h), Vt.current.length > 50 && Vt.current.shift();
    const x = Bn.current.pop();
    x && (Ke(x.timeline), U && U(x.timeline), x.resolutionId && x.resolutionId !== Yt && _r(x.resolutionId), x.aspectId && x.aspectId !== At && cs(x.aspectId), x.presetId && $t(x.presetId), x.selectedFeedIndex !== void 0 && Ue(x.selectedFeedIndex), En.current = !0, Dr((A) => A + 1), Rt(`Undo: ${x.label || "Previous State"}`, "undo", "↺"));
  }, [rr, U, At, Rt]), Oi = i.useCallback(() => {
    if (Vt.current.length === 0) return;
    const h = rr("Undo State");
    Bn.current.push(h), Bn.current.length > 50 && Bn.current.shift();
    const x = Vt.current.pop();
    x && (Ke(x.timeline), U && U(x.timeline), x.resolutionId && x.resolutionId !== Yt && _r(x.resolutionId), x.aspectId && x.aspectId !== At && cs(x.aspectId), x.presetId && $t(x.presetId), x.selectedFeedIndex !== void 0 && Ue(x.selectedFeedIndex), En.current = !0, Dr((A) => A + 1), Rt(`Redo: ${x.label || "Restored State"}`, "info", "↻"));
  }, [rr, U, At, Rt]), Nd = i.useCallback(() => {
    const x = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(he)),
      keyframes: JSON.parse(JSON.stringify(xt)),
      aspectId: At,
      width: Oe,
      height: Re
    }, ...tt.filter((A) => A.id !== "preset-quicksave")];
    _t(x);
    try {
      mm({
        canvasLayoutTimeline: _e,
        selectedAspectId: At,
        selectedPresetId: kn,
        isFullWidth: ce
      });
    } catch (A) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", A);
    }
    Rt(`State Saved (${Oe}×${Re} • ${he.length} Feeds)`, "success", "💾");
  }, [he, xt, At, Oe, Re, tt, _t, _e, kn, ce, Rt]);
  i.useEffect(() => {
    const h = () => Li(), x = () => Oi(), A = () => Nd();
    return window.addEventListener("itb:studio-undo", h), window.addEventListener("itb:studio-redo", x), window.addEventListener("itb:studio-save-now", A), () => {
      window.removeEventListener("itb:studio-undo", h), window.removeEventListener("itb:studio-redo", x), window.removeEventListener("itb:studio-save-now", A);
    };
  }, [Li, Oi, Nd]);
  const _m = i.useCallback(() => {
    if (xe) {
      xe();
      return;
    }
    it((h) => {
      const x = !h;
      if (x) {
        r && r(null);
        const A = pn.current;
        A && A.requestFullscreen && A.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return x;
    });
  }, [xe, r]), kd = i.useCallback(() => {
    const h = m > 0 ? m : d + y, x = Lt != null && Lt.layout ? JSON.parse(JSON.stringify(Lt.layout)) : {
      width: Oe,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      utcClockPosition: Fs,
      placements: JSON.parse(JSON.stringify(he))
    };
    x.utcClockPosition = x.utcClockPosition || Fs;
    const { nextTimeline: A, newIndex: Z, isNew: q } = Bh(
      _e,
      h,
      x
    );
    q ? (Zn("Add Keyframe"), Ke(A), U && U(A), T && T(Z), Rt(`Keyframe #${Z + 1} created at ${Et(h, f, { includeSeconds: !0 })}`, "success", "💎")) : (T && T(Z), Rt(`Jumped to existing Keyframe #${Z + 1}`, "info", "💎"));
  }, [m, d, y, Lt, he, Oe, Re, Fs, _e, U, T, f, Rt, Zn]), Fm = i.useCallback(() => {
    if (xt.length <= 1 || Ct === 0) {
      Rt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Zn("Delete Keyframe");
    const { nextTimeline: h, success: x, newIndex: A } = zx(_e, Ct);
    x && (Ke(h), U && U(h), T && T(A), Rt("Keyframe deleted", "info", "🗑️"));
  }, [xt, Ct, _e, U, T, Rt, Zn]), Wm = i.useCallback((h) => {
    Ct !== 0 && (Zn("Update Transition Type"), Ke((x) => {
      const A = uu(x, Ct, { transitionType: h });
      return U && U(A), A;
    }));
  }, [Ct, U, Zn]), Um = i.useCallback((h) => {
    Ct !== 0 && (Zn("Update Transition Duration"), Ke((x) => {
      const A = uu(x, Ct, { transitionDurationSec: h });
      return U && U(A), A;
    }));
  }, [Ct, U, Zn]), Ur = i.useCallback((h) => {
    if (h < 0 || h >= xt.length) return;
    const x = xt[h];
    if (!x) return;
    if (g && d) {
      const Z = Math.max(0, x.timestampEpochMs - d);
      g(Z);
    }
    T && T(h);
    const A = Et(x.timestampEpochMs, f, { includeSeconds: !0 });
    Rt(`Jumped to Keyframe #${h + 1} (${A})`, "info", "❖");
  }, [xt, d, g, T, f, Rt]), wd = i.useCallback(() => {
    Ct > 0 && Ur(Ct - 1);
  }, [Ct, Ur]), jd = i.useCallback(() => {
    Ct < xt.length - 1 && Ur(Ct + 1);
  }, [Ct, xt.length, Ur]);
  i.useCallback((h) => {
    fe(h);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", h);
    } catch {
    }
    Zn("Move Clock Position"), Ke((x) => {
      const A = du(x, Ct, h);
      return U && U(A), A;
    }), Rt(`Clock moved to ${h} (Keyframe #${Ct + 1})`, "info", "⏱️");
  }, [Ct, fe, Zn, U, Rt]), i.useEffect(() => {
    const h = (x) => {
      if (!(x.target.tagName === "INPUT" || x.target.tagName === "TEXTAREA" || x.target.isContentEditable)) {
        if (x.key === "Delete" || x.key === "Backspace") {
          pe >= 0 && he[pe] && (x.preventDefault(), Jl(pe));
          return;
        }
        if ((x.code === "Space" || x.key === " ") && M) {
          x.preventDefault(), V == null || V("timeline"), M((A) => !A);
          return;
        }
        if (x.key === "[" || x.altKey && x.key === "ArrowLeft") {
          x.preventDefault(), wd();
          return;
        }
        if (x.key === "]" || x.altKey && x.key === "ArrowRight") {
          x.preventDefault(), jd();
          return;
        }
        if ((x.key === "k" || x.key === "K") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), kd();
          return;
        }
        if (x.key === "Escape") {
          Ie(!1), Xe(!1), Ot(!1), P(!1), Ft(!1), dt(!1), Jt(!1), J(!1), de(!1), Ue(null), V == null || V("timeline");
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(x.key)) {
          if (x.ctrlKey || x.altKey || x.metaKey)
            return;
          if ((X === "canvas" || kt && pe !== null) && pe !== null && pe >= 0 && he[pe]) {
            x.preventDefault(), En.current = !0, $t("custom");
            const Z = x.shiftKey ? 20 : 5;
            let q = 0, F = 0;
            x.key === "ArrowLeft" && (q = -Z), x.key === "ArrowRight" && (q = Z), x.key === "ArrowUp" && (F = -Z), x.key === "ArrowDown" && (F = Z);
            const ae = he[pe], ve = ln(ae.x + q, 0, Oe - ae.width), me = ln(ae.y + F, 0, Re - ae.height), Ne = he.map((qe, ot) => ot === pe ? { ...qe, x: ve, y: me } : qe);
            lt(Ne);
            return;
          }
        }
        if ((x.key === "r" || x.key === "R") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), _s((A) => !A);
          return;
        }
        if ((x.key === "s" || x.key === "S") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), Qo((A) => !A);
          return;
        }
      }
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [pe, he, Jl, lt, _s, Qo]);
  const Cd = i.useMemo(() => Bx({
    keyframes: xt,
    currentEpochMs: K,
    currentPlacements: he,
    isEditing: yn || Jn
  }), [yn, Jn, xt, K, he]), Bm = i.useMemo(() => Cd.map((h, x) => ({ ...h, originalIndex: x })).sort((h, x) => (h.zIndex ?? h.originalIndex) - (x.zIndex ?? x.originalIndex)), [Cd]), Hm = i.useMemo(() => Yx(he, {
    maxConcurrentDecoders: km,
    activeAudioStationId: ye,
    selectedFeedIndex: pe
  }), [he, ye, pe]), lr = he[pe] || null, { filteredPlaced: ar, filteredUnplaced: ta } = i.useMemo(() => {
    const h = (pt || "").toLowerCase(), x = he.map((F, ae) => {
      const ve = F.zIndex ?? ae + 1, me = Ve.find((Ne) => Ne.stationId === F.stationId && Ne.displayId === F.displayId);
      return {
        type: "placed",
        origIdx: ae,
        placement: F,
        feed: me,
        stationId: F.stationId,
        displayId: F.displayId,
        label: F.label || (me == null ? void 0 : me.label) || `${F.stationId} (${F.displayId})`,
        layerRank: ve,
        isSelected: ae === pe,
        sourceWidth: F.sourceWidth || (me == null ? void 0 : me.sourceWidth) || 1920,
        sourceHeight: F.sourceHeight || (me == null ? void 0 : me.sourceHeight) || 1080
      };
    });
    x.sort((F, ae) => ae.layerRank - F.layerRank);
    const A = Ve.filter((F) => !he.some((ae) => ae.stationId === F.stationId && ae.displayId === F.displayId)).map((F) => ({
      type: "unplaced",
      feed: F,
      stationId: F.stationId,
      displayId: F.displayId,
      label: F.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: F.sourceWidth || 1920,
      sourceHeight: F.sourceHeight || 1080
    })), Z = h ? x.filter((F) => F.label.toLowerCase().includes(h)) : x, q = h ? A.filter((F) => F.label.toLowerCase().includes(h)) : A;
    return { filteredPlaced: Z, filteredUnplaced: q };
  }, [he, Ve, pe, pt]), Ed = i.useCallback((h, x) => {
    h.stopPropagation(), G(x), h.dataTransfer.effectAllowed = "copyMove", h.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: x.origIdx,
      type: x.type,
      stationId: x.stationId,
      displayId: x.displayId
    }));
  }, []), zm = i.useCallback((h, x) => {
    h.preventDefault(), h.stopPropagation(), h.dataTransfer.dropEffect = "move";
    const A = h.currentTarget.getBoundingClientRect(), Z = A.top + A.height / 2, q = h.clientY < Z ? "above" : "below";
    B((F) => F.index === x && F.position === q ? F : { index: x, position: q });
  }, []), Km = i.useCallback((h, x) => {
    h.stopPropagation(), B((A) => A.index === x ? { index: null, position: null } : A);
  }, []), Sd = i.useCallback(() => {
    G(null), B({ index: null, position: null });
  }, []), Vm = i.useCallback((h, x) => {
    h.preventDefault(), h.stopPropagation();
    const A = Le;
    B({ index: null, position: null }), G(null);
    const Z = h.dataTransfer.getData("text/plain");
    if (Z)
      try {
        const q = JSON.parse(Z);
        if (q.type === "placed") {
          const F = q.origIdx, ae = ar.findIndex((ht) => ht.origIdx === F);
          if (ae === -1) return;
          let ve = x;
          if (A.position === "below" && (ve += 1), ae < ve && (ve -= 1), ae === ve) return;
          const me = [...ar], [Ne] = me.splice(ae, 1);
          me.splice(ve, 0, Ne);
          const qe = me.length, ot = he.map((ht, Te) => {
            const yt = me.findIndex((Xt) => Xt.origIdx === Te);
            return yt !== -1 ? {
              ...ht,
              zIndex: qe - yt
            } : ht;
          });
          lt(ot), Ue(Ne.origIdx);
        } else if (q.type === "unplaced") {
          const F = Ve.find((Ut) => Ut.stationId === q.stationId && Ut.displayId === q.displayId);
          if (!F) return;
          const ae = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 16 / 9), ve = ae >= 1 ? 640 : Math.round(360 * ae), me = ae >= 1 ? Math.round(640 / ae) : 360, Ne = It[he.length % It.length];
          let qe = x;
          A.position === "below" && (qe += 1);
          const ot = {
            stationId: F.stationId,
            displayId: F.displayId,
            label: F.label,
            x: 100 + he.length * 40 % 800,
            y: 80 + he.length * 40 % 500,
            width: ve,
            height: me,
            sourceWidth: F.sourceWidth || 1920,
            sourceHeight: F.sourceHeight || 1080,
            nativeAspectRatio: ae,
            aspectRatio: ae,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: Ne,
            shadowEffect: "deep",
            borderRadius: 0
          }, ht = [...he, ot], Te = ht.length - 1, yt = [...ar];
          yt.splice(qe, 0, { origIdx: Te });
          const Xt = yt.length, Hn = ht.map((Ut, wn) => {
            const In = yt.findIndex((Qe) => Qe.origIdx === wn);
            return {
              ...Ut,
              zIndex: In !== -1 ? Xt - In : 1
            };
          });
          lt(Hn), Ue(Te);
        }
      } catch (q) {
        console.warn("Failed to handle layer drag drop:", q);
      }
  }, [Le, ar, he, Ve, lt]), Ym = i.useCallback((h) => {
    h.preventDefault();
    const x = h.dataTransfer.getData("text/plain");
    if (!(!x || !Nt.current))
      try {
        const A = JSON.parse(x), Z = Nt.current.getBoundingClientRect(), q = h.clientX - Z.left, F = h.clientY - Z.top, ae = ln(Math.round(q / Z.width * Oe), 0, Oe - 320), ve = ln(Math.round(F / Z.height * Re), 0, Re - 180);
        if (A.type === "unplaced") {
          if (he.length >= 6) {
            alert("Maximum concurrent studio playback screens reached (Hard cap: 6 screens). Please remove or replace a screen.");
            return;
          }
          const me = Ve.find((Ne) => Ne.stationId === A.stationId && Ne.displayId === A.displayId);
          if (me) {
            const Ne = me.nativeAspectRatio || (me.sourceWidth && me.sourceHeight ? me.sourceWidth / me.sourceHeight : 1.7777777777777777), qe = Ne >= 1 ? 640 : Math.round(360 * Ne), ot = Ne >= 1 ? Math.round(640 / Ne) : 360, ht = he.length > 0 ? Math.max(...he.map((Hn) => Hn.zIndex || 0)) + 1 : 1, Te = It[he.length % It.length], yt = {
              stationId: me.stationId,
              displayId: me.displayId,
              label: me.label,
              x: ln(ae, 0, Oe - qe),
              y: ln(ve, 0, Re - ot),
              width: qe,
              height: ot,
              sourceWidth: me.sourceWidth || 1920,
              sourceHeight: me.sourceHeight || 1080,
              nativeAspectRatio: Ne,
              aspectRatio: Ne,
              zIndex: ht,
              rotation: 0,
              borderWidth: 2,
              borderColor: Te,
              shadowEffect: "deep",
              borderRadius: 0
            }, Xt = [...he, yt];
            lt(Xt), Ue(Xt.length - 1);
          }
        } else if (A.type === "placed" && A.origIdx !== void 0) {
          const me = he.map((Ne, qe) => qe === A.origIdx ? {
            ...Ne,
            x: ln(ae, 0, Oe - Ne.width),
            y: ln(ve, 0, Re - Ne.height)
          } : Ne);
          lt(me), Ue(A.origIdx);
        }
      } catch (A) {
        console.warn("Canvas drop failed:", A);
      }
  }, [Ve, he, lt, Oe, Re]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: pn,
      className: `multicam-viewport-root canvas-grid ${mt ? "fullscreen-grid-active" : ""}`,
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
            ref: tn,
            className: `canvas-stage-wrapper ${ce ? "is-full-width-mode" : "is-fit-stage-mode"}`,
            onClick: (h) => {
              var x, A;
              (h.target === tn.current || (A = (x = h.target) == null ? void 0 : x.classList) != null && A.contains("canvas-stage-wrapper")) && (Ue(null), de(!1), V == null || V("timeline"));
            },
            children: [
              Ht && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                      he.length,
                      " on canvas"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Ot(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Filter workstations / displays...",
                    value: pt,
                    onChange: (h) => ut(h.target.value)
                  }
                ) }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                  ar.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: ar.length })
                    ] }),
                    ar.map((h, x) => {
                      const A = ft && ft.type === "placed" && ft.origIdx === h.origIdx, q = Le.index === x ? Le.position === "above" ? "drop-above" : "drop-below" : "";
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row ${h.isSelected ? "is-selected" : ""} ${A ? "is-dragging-row" : ""} ${q}`,
                          draggable: !0,
                          onDragStart: (F) => Ed(F, h),
                          onDragOver: (F) => zm(F, x),
                          onDragLeave: (F) => Km(F, x),
                          onDrop: (F) => Vm(F, x),
                          onDragEnd: Sd,
                          onClick: () => Ue(h.origIdx),
                          title: `Drag to reorder layer (${h.label})`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                            /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${h.layerRank}`, children: [
                              "#",
                              h.layerRank
                            ] }),
                            /* @__PURE__ */ s.jsx("span", { className: `status-dot ${h.isSelected ? "active" : ""}` }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: h.label, children: h.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              h.sourceWidth,
                              "×",
                              h.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (F) => F.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => xd(h.origIdx),
                                  title: "Bring Forward (Layer +1)",
                                  children: "⬆️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => yd(h.origIdx),
                                  title: "Send Backward (Layer -1)",
                                  children: "⬇️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-remove-row",
                                  onClick: () => Jl(h.origIdx),
                                  title: "Remove from canvas",
                                  children: "✕"
                                }
                              )
                            ] })
                          ]
                        },
                        `feed-layer-${h.stationId}-${h.displayId}-${h.origIdx}`
                      );
                    })
                  ] }),
                  ta.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: ta.length })
                    ] }),
                    ta.map((h) => {
                      const x = ft && ft.type === "unplaced" && ft.stationId === h.stationId && ft.displayId === h.displayId;
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row unplaced ${x ? "is-dragging-row" : ""}`,
                          draggable: !0,
                          onDragStart: (A) => Ed(A, h),
                          onDragEnd: Sd,
                          onClick: () => md(h.feed),
                          title: `Drag onto canvas or layers, or click to add ${h.label}`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                            /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                            /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: h.label, children: h.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              h.sourceWidth,
                              "×",
                              h.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (A) => A.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-add-row",
                                onClick: () => md(h.feed),
                                title: "Add to canvas",
                                children: "＋ ADD"
                              }
                            ) })
                          ]
                        },
                        `unplaced-feed-${h.stationId}-${h.displayId}`
                      );
                    })
                  ] }),
                  ar.length === 0 && ta.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => or("auto"), children: "⊞ ADD ALL FEEDS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: gd, children: "🗑️ CLEAR CANVAS" })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
                /* @__PURE__ */ s.jsxs("aside", { className: `canvas-left-wing-dock ${Q || re || Ee ? "has-active-popout" : ""}`, children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Ht ? "active" : ""}`,
                      onClick: () => Ot((h) => !h),
                      title: `Feeds & Layers Palette (${he.length}/${Ve.length} on canvas)`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: he.length }),
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
                        className: `btn-wing-tool ${Q ? "active" : ""}`,
                        onClick: () => {
                          le((h) => !h), we(!1);
                        },
                        title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                        ]
                      }
                    ),
                    Q && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "LAYOUT PRESETS" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => le(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${kn === "auto-grid" ? "active" : ""}`,
                          onClick: () => {
                            $t("auto-grid"), or("auto-grid"), le(!1);
                          },
                          children: [
                            /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                            /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                              const h = new Set((t && t.length > 0 ? t : n).map((Z) => Z.id)), x = (he || []).filter((Z) => h.has(Z.stationId)), A = (t && t.length > 0 ? t : n).filter((Z) => !x.some((q) => q.stationId === Z.id));
                              return x.length > 0 ? x.length + A.length : Pe.length;
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
                            $t("1x1"), or("1x1"), le(!1);
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
                            $t("1x2"), or("1x2"), le(!1);
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
                            $t("2x2"), or("2x2"), le(!1);
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
                            $t("1+3-pip"), or("1+3-pip"), le(!1);
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
                            $t("hero-stacked"), or("hero-stacked"), le(!1);
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
                        className: `btn-wing-tool ${Ee ? "active" : ""}`,
                        onClick: () => {
                          ze((h) => !h), we(!1), le(!1);
                        },
                        title: `Canvas Resolution: ${Yt === Ws ? `Custom (${Oe}×${Re}px)` : Yt} (${Oe}×${Re}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📺" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", style: Yt === Ws ? { fontSize: "7px" } : void 0, children: Yt === Ws ? "CUSTOM" : Yt })
                        ]
                      }
                    ),
                    Ee && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout resolution-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "CANVAS RESOLUTION" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => ze(!1), children: "✕" })
                      ] }),
                      Pa.map((h) => {
                        const x = ur(h.id, At, mn);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${Yt === h.id ? "active" : ""}`,
                            onClick: () => {
                              Tm(h.id), ze(!1);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { children: h.label }),
                              /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                                x.w,
                                "×",
                                x.h
                              ] })
                            ]
                          },
                          h.id
                        );
                      }),
                      /* @__PURE__ */ s.jsx("div", { className: "popout-divider" }),
                      /* @__PURE__ */ s.jsxs("div", { className: "custom-res-container", children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "custom-res-header", children: [
                          /* @__PURE__ */ s.jsx("span", { children: "MANUAL / CUSTOM" }),
                          Yt === Ws && /* @__PURE__ */ s.jsx("span", { className: "custom-active-tag", children: "ACTIVE" })
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
                                onChange: (h) => Wr(h.target.value),
                                onKeyDown: (h) => {
                                  h.key === "Enter" && Ti();
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
                                value: co,
                                onChange: (h) => Zo(h.target.value),
                                onKeyDown: (h) => {
                                  h.key === "Enter" && Ti();
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
                              onClick: Ti,
                              title: "Apply custom resolution",
                              children: "SET"
                            }
                          )
                        ] }),
                        L && /* @__PURE__ */ s.jsx("div", { className: "custom-res-error-msg", children: L })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "wing-popout-wrapper", children: [
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `btn-wing-tool ${re ? "active" : ""}`,
                        onClick: () => {
                          we((h) => !h), ze(!1), le(!1);
                        },
                        title: `Aspect Ratio: ${At} (${Oe}×${Re}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: At })
                        ]
                      }
                    ),
                    re && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "CANVAS ASPECT" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => we(!1), children: "✕" })
                      ] }),
                      Us.map((h) => {
                        const x = ur(Yt, h.id);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${At === h.id ? "active" : ""}`,
                            onClick: () => {
                              $m(h.id), we(!1);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { children: h.label }),
                              /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                                x.w,
                                "×",
                                x.h
                              ] })
                            ]
                          },
                          h.id
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
                      className: `btn-wing-tool ${Go ? "active" : ""}`,
                      onClick: () => Qo((h) => !h),
                      title: Go ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                      onClick: () => _s((h) => !h),
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
                      onClick: Li,
                      disabled: Bn.current.length === 0,
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
                      onClick: Oi,
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
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Oe}×${Re}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Ln.isInside ? `${Ln.x},${Ln.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        className: "canvas-ruler-top-bar",
                        style: {
                          width: Gt.width > 180 ? `${Gt.width}px` : "100%"
                        },
                        children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-x",
                            viewBox: `0 0 ${Oe} 18`,
                            preserveAspectRatio: "none",
                            children: [
                              lr && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: lr.x,
                                  y: "0",
                                  width: lr.width,
                                  height: "18",
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              Se.map((h) => h.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: h.val, y1: "0", x2: h.val, y2: "16", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: h.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: h.val })
                              ] }, `rx-${h.val}`) : h.isMed ? /* @__PURE__ */ s.jsx("line", { x1: h.val, y1: "6", x2: h.val, y2: "16", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${h.val}`) : /* @__PURE__ */ s.jsx("line", { x1: h.val, y1: "11", x2: h.val, y2: "16", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${h.val}`)),
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
                          height: Gt.height > 100 ? `${Gt.height}px` : "auto"
                        },
                        children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-y",
                            viewBox: `0 0 20 ${Re}`,
                            preserveAspectRatio: "none",
                            children: [
                              lr && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: "0",
                                  y: lr.y,
                                  width: "20",
                                  height: lr.height,
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              be.map((h) => h.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: "0", y1: h.val, x2: "16", y2: h.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: "2", y: h.val + 7, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: h.val })
                              ] }, `ry-${h.val}`) : h.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "6", y1: h.val, x2: "18", y2: h.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${h.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "11", y1: h.val, x2: "18", y2: h.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${h.val}`)),
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
                        ref: (h) => {
                          Nt.current = h, tr.current = h;
                        },
                        className: `canvas-master-frame-16-9 ${ce ? "is-full-width" : "is-fit-stage"}`,
                        style: {
                          width: Gt.width > 180 ? `${Gt.width}px` : "100%",
                          height: Gt.height > 100 ? `${Gt.height}px` : "auto",
                          aspectRatio: `${Oe} / ${Re}`
                        },
                        onMouseMove: Be,
                        onMouseLeave: Ge,
                        onDragOver: (h) => {
                          h.preventDefault(), h.dataTransfer.dropEffect = "copy";
                        },
                        onDrop: Ym,
                        onClick: (h) => {
                          var x, A, Z, q, F, ae;
                          (h.target === Nt.current || (A = (x = h.target) == null ? void 0 : x.classList) != null && A.contains("canvas-master-frame-16-9") || (q = (Z = h.target) == null ? void 0 : Z.classList) != null && q.contains("corner-accent") || (ae = (F = h.target) == null ? void 0 : F.classList) != null && ae.contains("canvas-work-surface")) && (Ue(null), de(!1), V == null || V("timeline"));
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
                                left: `${er.x / Oe * 100}%`,
                                top: `${er.y / Re * 100}%`,
                                width: `${er.width / Oe * 100}%`,
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
                          ys.vertical !== null && /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "canvas-snap-guide-v",
                              style: {
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                left: `${ys.vertical}%`,
                                width: "2px",
                                background: "#06B6D4",
                                boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                                zIndex: 9999,
                                pointerEvents: "none"
                              }
                            }
                          ),
                          ys.horizontal !== null && /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "canvas-snap-guide-h",
                              style: {
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: `${ys.horizontal}%`,
                                height: "2px",
                                background: "#06B6D4",
                                boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                                zIndex: 9999,
                                pointerEvents: "none"
                              }
                            }
                          ),
                          he.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                            /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                            /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                            /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                            /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Ot(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => or("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                            ] })
                          ] }),
                          Bm.map((h) => {
                            var Bt;
                            const x = h.originalIndex, A = pe === x, Z = yn && pe === x, q = Jn && pe === x, F = (n.length > 0 ? n : t).find(
                              (Me) => {
                                var St, vt, ir, Ts;
                                return Me.id === h.stationId || ((St = Me.hostname) == null ? void 0 : St.toLowerCase()) === ((vt = h.stationId) == null ? void 0 : vt.toLowerCase()) || ((ir = Me.id) == null ? void 0 : ir.toLowerCase()) === ((Ts = h.stationId) == null ? void 0 : Ts.toLowerCase());
                              }
                            ), ae = Ve.find((Me) => Me.stationId === h.stationId && Me.displayId === h.displayId), ve = F || {
                              id: h.stationId,
                              hostname: (ae == null ? void 0 : ae.stationHostname) || h.stationHostname || h.stationId,
                              displayName: (ae == null ? void 0 : ae.stationName) || h.label || h.stationId,
                              displays: ae ? [{ displayId: ae.displayId, width: ae.sourceWidth, height: ae.sourceHeight }] : []
                            }, me = (ve == null ? void 0 : ve.displays) || ((Bt = ve == null ? void 0 : ve.topology) == null ? void 0 : Bt.displays) || [], Ne = he.filter(
                              (Me) => Me.stationId === h.stationId || ve && (Me.stationId === ve.id || Me.stationId === ve.hostname)
                            ), qe = me.length > 1 && Ne.length >= me.length, ot = h.borderColor || It[x % It.length], ht = h.borderWidth !== void 0 ? h.borderWidth : 2, Te = h.rotation || 0, yt = h.shadowEffect || "deep", Xt = h.borderRadius || 0, Hn = h.x / Oe * 100, Ut = h.y / Re * 100, wn = h.width / Oe * 100, In = h.height / Re * 100, Qe = qx(yt, A, ot);
                            h.y < 50, h.x < 100, h.x + h.width > Oe - 100;
                            const Mt = h.zIndex !== void 0 ? h.zIndex : x + 1;
                            return /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: `canvas-feed-card-box ${A ? "is-selected" : ""} ${Z ? "is-dragging" : ""} ${q ? "is-resizing" : ""}`,
                                style: {
                                  position: "absolute",
                                  left: `${Hn}%`,
                                  top: `${Ut}%`,
                                  width: `${wn}%`,
                                  height: `${In}%`,
                                  zIndex: Z || q ? 2e3 : A ? 1e3 + Mt * 10 : Mt * 10,
                                  transformOrigin: "center center",
                                  border: `${ht}px solid ${ot}`,
                                  borderRadius: `${Xt}px`,
                                  boxShadow: Qe,
                                  opacity: h.opacity !== void 0 ? h.opacity : 1,
                                  pointerEvents: h.opacity !== void 0 && h.opacity < 0.1 ? "none" : "auto",
                                  cursor: Z ? "grabbing" : "grab",
                                  transition: Z || q || Or.current ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                                },
                                onMouseDown: (Me) => Ri(Me, x),
                                onContextMenu: (Me) => {
                                  Me.preventDefault(), Me.stopPropagation(), Ue(x), de(!0), V == null || V("canvas");
                                },
                                onClick: (Me) => {
                                  Me.stopPropagation(), Ue(x), V == null || V("canvas");
                                },
                                children: [
                                  /* @__PURE__ */ s.jsxs(
                                    "div",
                                    {
                                      className: "box-header-badge",
                                      onMouseDown: (Me) => Ri(Me, x),
                                      onDoubleClick: () => Ai(x),
                                      title: "Click and drag to move window (Double-click to expand 1x1)",
                                      children: [
                                        /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                          /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                          /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                          te === x ? /* @__PURE__ */ s.jsxs(
                                            "span",
                                            {
                                              className: "badge-title-edit-container",
                                              onClick: (Me) => Me.stopPropagation(),
                                              onMouseDown: (Me) => Me.stopPropagation(),
                                              onDoubleClick: (Me) => Me.stopPropagation(),
                                              children: [
                                                /* @__PURE__ */ s.jsx(
                                                  "input",
                                                  {
                                                    ref: et,
                                                    type: "text",
                                                    className: "badge-title-input",
                                                    value: je,
                                                    placeholder: `${ve.displayName || h.stationId} (${h.displayId})`,
                                                    onChange: (Me) => Fe(Me.target.value),
                                                    onKeyDown: (Me) => {
                                                      Me.stopPropagation(), Me.key === "Enter" ? (Me.preventDefault(), $i(x)) : Me.key === "Escape" && (Me.preventDefault(), ue(null));
                                                    },
                                                    onBlur: () => $i(x)
                                                  }
                                                ),
                                                /* @__PURE__ */ s.jsx(
                                                  "button",
                                                  {
                                                    type: "button",
                                                    className: "btn-edit-title is-saving",
                                                    onClick: (Me) => {
                                                      Me.stopPropagation(), $i(x);
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
                                                onDoubleClick: (Me) => {
                                                  Me.stopPropagation(), ue(x), Fe(h.label || "");
                                                },
                                                title: "Double-click to rename screen (burned into video)",
                                                children: h.label || `${ve.displayName || h.stationId} (${h.displayId})`
                                              }
                                            ),
                                            /* @__PURE__ */ s.jsx(
                                              "button",
                                              {
                                                type: "button",
                                                className: "btn-edit-title",
                                                onClick: (Me) => {
                                                  Me.stopPropagation(), ue(x), Fe(h.label || "");
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
                                            className: `badge-focus-nudge ${X === "canvas" ? "is-focused" : "is-idle"}`,
                                            onClick: (Me) => {
                                              Me.stopPropagation(), V == null || V(X === "canvas" ? "timeline" : "canvas");
                                            },
                                            title: X === "canvas" ? "Screen focused: Arrow keys nudge position (Shift: 20px, Normal: 5px). Click timeline or press Esc for Playhead scrubbing." : "Playhead focused: Arrow keys scrub timeline. Click to enable Arrow key screen nudging.",
                                            children: X === "canvas" ? "🎯 NUDGE [◀▲▼▶]" : "⏱️ PLAYHEAD"
                                          }
                                        ),
                                        /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                          Math.round(h.width),
                                          "×",
                                          Math.round(h.height),
                                          " (",
                                          Hr(h.width, h.height),
                                          ") @ (",
                                          Math.round(h.x),
                                          ",",
                                          Math.round(h.y),
                                          ")",
                                          Te !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                            "📐",
                                            Te,
                                            "°"
                                          ] })
                                        ] }),
                                        /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${Mt}`, children: [
                                          "#$",
                                          Mt
                                        ] }),
                                        /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: `btn-badge-action-inspector ${A && kt ? "active" : ""}`,
                                            onClick: (Me) => {
                                              Me.stopPropagation(), Ue(x), de((St) => !St || pe !== x);
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
                                          transform: Te ? `rotate(${Te}deg)` : void 0,
                                          transformOrigin: "center center",
                                          transition: Z ? "none" : "transform 0.2s ease-out"
                                        },
                                        children: /* @__PURE__ */ s.jsx(
                                          Lx,
                                          {
                                            station: ve,
                                            isSolo: !1,
                                            currentEpochMs: K,
                                            timeMode: f,
                                            isPlaying: v,
                                            setIsPlaying: M,
                                            baseEpochMs: d,
                                            totalDurationMs: j,
                                            outPointMs: k,
                                            setPlayheadMs: g,
                                            globalGaps: N,
                                            onOpenSpotlight: o,
                                            onSelectActiveStation: null,
                                            recordingSegments: b,
                                            playbackSpeed: E,
                                            activeAudioStationId: ye,
                                            onSoloAudio: De,
                                            directorPlan: $ || (ve == null ? void 0 : ve.directorPlan),
                                            isAutoDirectorEnabled: c ? c[ve.id] ?? !0 : !0,
                                            stationsCount: t.length,
                                            onDeselectStation: a,
                                            targetDisplayId: h.displayId,
                                            onSelectDisplayId: (Me) => {
                                              if (c ? c[ve.id] ?? !0 : !0) return;
                                              const vt = he.map((ir, Ts) => Ts === x ? { ...ir, displayId: Me } : ir);
                                              lt(vt);
                                            },
                                            areAllDisplaysPlaced: qe,
                                            slotIndex: x,
                                            borderColor: ot,
                                            isDecoderAllowed: Hm[x] ?? !0,
                                            maxHeight: Vx(
                                              Math.round((h.width || 1920) * (((Gt == null ? void 0 : Gt.width) || 960) / Oe)),
                                              Math.round((h.height || 1080) * (((Gt == null ? void 0 : Gt.height) || 540) / Re))
                                            )
                                          }
                                        )
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      Nm,
                                      {
                                        currentEpochMs: K,
                                        keystrokes: p,
                                        keystrokeMode: w,
                                        targetStationId: h.stationId || (ve == null ? void 0 : ve.id) || (ve == null ? void 0 : ve.hostname),
                                        targetDisplayId: h.displayId,
                                        displays: me,
                                        directorPlan: $ || (ve == null ? void 0 : ve.directorPlan)
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "card-drag-surface",
                                        onMouseDown: (Me) => Ri(Me, x),
                                        onDoubleClick: () => Ai(x),
                                        title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                                      }
                                    )
                                  ] }),
                                  A && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-tl",
                                        onMouseDown: (Me) => ea(Me, x, "tl"),
                                        title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Hr(h.sourceWidth, h.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-tr",
                                        onMouseDown: (Me) => ea(Me, x, "tr"),
                                        title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Hr(h.sourceWidth, h.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-bl",
                                        onMouseDown: (Me) => ea(Me, x, "bl"),
                                        title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Hr(h.sourceWidth, h.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-br",
                                        onMouseDown: (Me) => ea(Me, x, "br"),
                                        title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Hr(h.sourceWidth, h.sourceHeight)})`,
                                        children: "↘"
                                      }
                                    )
                                  ] })
                                ]
                              },
                              `feed-${h.stationId}-${h.displayId}-${x}`
                            );
                          }),
                          !H && kt && pe !== null && lr && (() => {
                            const h = lr, x = pe, A = h.borderColor || It[x % It.length], Z = h.borderWidth !== void 0 ? h.borderWidth : 2, q = h.rotation || 0, F = h.shadowEffect || "deep", ae = h.zIndex !== void 0 ? h.zIndex : x + 1, ve = h.x / Oe * 100, me = h.width / Oe * 100, Ne = ve + me / 2;
                            let qe = `${Ne}%`, ot = "translateX(-50%)";
                            Ne < 28 ? (qe = `${Math.max(1, ve)}%`, ot = "none") : Ne > 72 && (qe = `${Math.min(99, ve + me)}%`, ot = "translateX(-100%)");
                            let ht;
                            const Te = h.y < 38;
                            Te ? ht = `${(h.y + 26) / Re * 100}%` : ht = `calc(${h.y / Re * 100}% - 34px)`;
                            const yt = h.y / Re > 0.6, Xt = Te || h.y / Re < 0.15, Hn = yt && !Xt, Ut = Ne > 65 || ve + me > 75, wn = (n.length > 0 ? n : t).find(
                              (Qe) => {
                                var Mt, Bt;
                                return Qe.id === h.stationId || ((Mt = Qe.hostname) == null ? void 0 : Mt.toLowerCase()) === ((Bt = h.stationId) == null ? void 0 : Bt.toLowerCase());
                              }
                            ), In = wn ? wn.id : h.stationId;
                            return /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: "floating-feed-inspector compact-hud-inspector",
                                style: {
                                  position: "absolute",
                                  left: qe,
                                  top: ht,
                                  transform: ot,
                                  zIndex: 4500
                                },
                                onMouseDown: (Qe) => Qe.stopPropagation(),
                                onClick: (Qe) => Qe.stopPropagation(),
                                children: [
                                  /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${h.label || In} • Layer #${ae}`, children: [
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
                                        value: rt,
                                        placeholder: `${(wn == null ? void 0 : wn.displayName) || h.stationId} (${h.displayId})`,
                                        onChange: (Qe) => wt(Qe.target.value),
                                        onKeyDown: (Qe) => {
                                          Qe.key === "Enter" && (Qe.preventDefault(), Zl(pe, rt));
                                        },
                                        onBlur: () => {
                                          Zl(pe, rt);
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
                                        className: `compact-color-palette-popover ${Hn ? "open-upwards" : "open-downwards"} ${Ut ? "align-right" : "align-left"}`,
                                        onClick: (Qe) => Qe.stopPropagation(),
                                        onMouseDown: (Qe) => Qe.stopPropagation(),
                                        children: Jx.map((Qe) => /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: `btn-color-dot ${A === Qe ? "is-active" : ""}`,
                                            style: { backgroundColor: Qe === "transparent" ? "#1E293B" : Qe },
                                            onClick: () => {
                                              el({ borderColor: Qe }), Jt(!1);
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
                                        const Qe = [0, 2, 4, 8], Mt = Qe[(Qe.indexOf(Z) + 1) % Qe.length];
                                        el({ borderWidth: Mt });
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
                                      className: `btn-mini-tool ${F !== "none" ? "highlight-glow" : ""}`,
                                      onClick: () => {
                                        const Qe = ["none", "deep", "glow-cyan", "glow-emerald"], Mt = Qe[(Qe.indexOf(F) + 1) % Qe.length];
                                        el({ shadowEffect: Mt });
                                      },
                                      title: `Shadow Effect: ${F} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`,
                                      children: "🌑"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsxs("div", { className: "mini-layer-dock", children: [
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: "btn-mini-tool",
                                        onClick: () => xd(x),
                                        title: "Step Layer Up (+1)",
                                        children: "▲"
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: "btn-mini-tool",
                                        onClick: () => yd(x),
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
                                      onClick: () => Am(90),
                                      title: `Rotate: Step 90° clockwise (Current: ${q}°)`,
                                      children: "↺ 90°"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool highlight",
                                      onClick: () => Pm(x),
                                      title: `Snap to Native Recorded Aspect (${Hr(h.sourceWidth, h.sourceHeight)})`,
                                      children: "📐 NATIVE"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool highlight",
                                      onClick: () => Ai(x),
                                      title: "1x1 Focus Mode (Double-click window to toggle)",
                                      children: "⛶ 1x1"
                                    }
                                  ),
                                  o && /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool",
                                      onClick: () => o(In, h.displayId),
                                      title: "Deep Forensic Multi-Angle Spotlight",
                                      children: "🔍"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool btn-del-feed",
                                      onClick: () => Jl(x),
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
                                        Ue(null), de(!1);
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
                            Ox,
                            {
                              currentEpochMs: K,
                              position: Fs,
                              onPositionChange: (h) => {
                                fe(h);
                                try {
                                  localStorage.setItem("itb_canvas_utc_clock_pos", h);
                                } catch {
                                }
                                Zn("Move Clock Position"), Ke((x) => {
                                  const A = du(x, Ct, h);
                                  return U && U(A), A;
                                }), Rt(`Clock moved to ${h} (Keyframe #${Ct + 1})`, "info", "⏱️");
                              }
                            }
                          ),
                          /* @__PURE__ */ s.jsx(Dx, {}),
                          /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-stage-hud", onClick: (h) => h.stopPropagation(), children: [
                            /* @__PURE__ */ s.jsxs("div", { className: "hud-main-cluster", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "hud-btn hud-prev-kf",
                                  disabled: Ct <= 0,
                                  onClick: (h) => {
                                    h.stopPropagation(), wd();
                                  },
                                  title: "Jump to Previous Keyframe ([ or Alt+Left)",
                                  children: "◀"
                                }
                              ),
                              /* @__PURE__ */ s.jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: `hud-pill-kf ${Ze ? "active" : ""}`,
                                  onClick: (h) => {
                                    h.stopPropagation(), Xe((x) => !x), Ie(!1);
                                  },
                                  title: "Keyframe Navigator: Click to inspect and jump across keyframes",
                                  children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-diamond", children: "❖" }),
                                    /* @__PURE__ */ s.jsxs("span", { className: "hud-kf-num", children: [
                                      "KF ",
                                      Ct + 1,
                                      "/",
                                      xt.length
                                    ] }),
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-kf-time", children: Et((Lt == null ? void 0 : Lt.timestampEpochMs) || K, f, { includeSeconds: !0 }) }),
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-caret", children: "▾" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "hud-btn hud-next-kf",
                                  disabled: Ct >= xt.length - 1,
                                  onClick: (h) => {
                                    h.stopPropagation(), jd();
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
                                  onClick: (h) => {
                                    h.stopPropagation(), kd();
                                  },
                                  title: "Add Layout Keyframe at Playhead (K)",
                                  children: "+ KF"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `hud-btn hud-settings-kf ${Ce ? "active" : ""}`,
                                  onClick: (h) => {
                                    h.stopPropagation(), Ie((x) => !x), Xe(!1);
                                  },
                                  title: "Keyframe Settings Inspector",
                                  children: "⚙"
                                }
                              )
                            ] }),
                            Ze && /* @__PURE__ */ s.jsxs("div", { className: "hud-stage-dropdown", onClick: (h) => h.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "hud-drop-header", children: [
                                /* @__PURE__ */ s.jsxs("span", { children: [
                                  "KEYFRAME NAVIGATOR (",
                                  xt.length,
                                  ")"
                                ] }),
                                /* @__PURE__ */ s.jsx("button", { type: "button", className: "hud-drop-close", onClick: () => Xe(!1), children: "✕" })
                              ] }),
                              /* @__PURE__ */ s.jsx("div", { className: "hud-drop-items", children: xt.map((h, x) => {
                                var me, Ne, qe;
                                const A = x === Ct, Z = Et(h.timestampEpochMs, f, { includeSeconds: !0 }), q = Math.max(0, (h.timestampEpochMs - d) / 1e3).toFixed(1), F = h.utcClockPosition || ((me = h.layout) == null ? void 0 : me.utcClockPosition) || "top-right", ae = ((qe = (Ne = h.layout) == null ? void 0 : Ne.placements) == null ? void 0 : qe.length) || 0, ve = x === 0 ? "Root" : `${h.transitionType || "smooth"} (${h.transitionDurationSec ?? 0.5}s)`;
                                return /* @__PURE__ */ s.jsxs(
                                  "div",
                                  {
                                    className: `hud-drop-row ${A ? "is-active" : ""}`,
                                    onClick: () => {
                                      Ur(x), Xe(!1);
                                    },
                                    title: `Seek to Keyframe #${x + 1} at ${Z}`,
                                    children: [
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-diamond", children: [
                                        "❖ #",
                                        x + 1
                                      ] }),
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-time", children: [
                                        Z,
                                        " (+",
                                        q,
                                        "s)"
                                      ] }),
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-meta", children: [
                                        "⏱️ ",
                                        F,
                                        " • 🖥️ ",
                                        ae,
                                        " • ",
                                        ve
                                      ] })
                                    ]
                                  },
                                  h.id || x
                                );
                              }) })
                            ] }),
                            Ce && /* @__PURE__ */ s.jsxs("div", { className: "hud-stage-settings-popover", onClick: (h) => h.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "settings-header", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-settings-nav",
                                    disabled: Ct <= 0,
                                    onClick: () => Ur(Ct - 1),
                                    title: "Previous Keyframe ([ or Alt+Left)",
                                    children: "◀"
                                  }
                                ),
                                /* @__PURE__ */ s.jsxs("span", { className: "settings-title", children: [
                                  "💎 KEYFRAME #",
                                  Ct + 1,
                                  " of ",
                                  xt.length
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-settings-nav",
                                    disabled: Ct >= xt.length - 1,
                                    onClick: () => Ur(Ct + 1),
                                    title: "Next Keyframe (] or Alt+Right)",
                                    children: "▶"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-settings-close", onClick: () => Ie(!1), children: "✕" })
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "settings-body", children: [
                                Ct > 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                  /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "INCOMING TRANSITION" }),
                                    /* @__PURE__ */ s.jsx("div", { className: "btn-group", children: ["smooth", "linear", "cut"].map((h) => /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-choice ${((Lt == null ? void 0 : Lt.transitionType) || "smooth") === h ? "is-active" : ""}`,
                                        onClick: () => Wm(h),
                                        children: h === "smooth" ? "⚡ Smooth" : h === "linear" ? "↗ Linear" : "✂ Cut"
                                      },
                                      h
                                    )) })
                                  ] }),
                                  (Lt == null ? void 0 : Lt.transitionType) !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "DURATION" }),
                                    /* @__PURE__ */ s.jsx("div", { className: "btn-group", children: [0.2, 0.5, 1, 1.5, 2].map((h) => /* @__PURE__ */ s.jsxs(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-choice ${((Lt == null ? void 0 : Lt.transitionDurationSec) ?? 0.5) === h ? "is-active" : ""}`,
                                        onClick: () => Um(h),
                                        children: [
                                          h,
                                          "s"
                                        ]
                                      },
                                      h
                                    )) })
                                  ] })
                                ] }) : /* @__PURE__ */ s.jsx("div", { className: "root-keyframe-badge", children: /* @__PURE__ */ s.jsx("span", { children: "ROOT KEYFRAME (t = 0 origin)" }) }),
                                /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "ACTIVE COMPOSITION" }),
                                  /* @__PURE__ */ s.jsxs("div", { className: "composition-summary", children: [
                                    /* @__PURE__ */ s.jsxs("span", { children: [
                                      "📺 ",
                                      Oe,
                                      "×",
                                      Re
                                    ] }),
                                    /* @__PURE__ */ s.jsxs("span", { children: [
                                      "🖥️ ",
                                      he.length,
                                      " Screens Placed"
                                    ] })
                                  ] })
                                ] }),
                                Ct > 0 && /* @__PURE__ */ s.jsx("div", { className: "settings-footer", children: /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-kf-stage-delete",
                                    onClick: () => {
                                      Fm(), Ie(!1);
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
                /* @__PURE__ */ s.jsxs("aside", { className: `canvas-right-wing-dock ${_ ? "has-active-popout" : ""}`, children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-emerald",
                      onClick: () => J(!0),
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
                        className: `btn-wing-tool ${_ ? "active" : ""}`,
                        onClick: () => P((h) => !h),
                        title: `Saved Presets Library (${tt.length})`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: tt.length }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                        ]
                      }
                    ),
                    _ && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => P(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: tt.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : tt.map((h) => {
                        var x;
                        return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                          Rm(h), P(!1);
                        }, children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: h.name }),
                            /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                              ((x = h.placements) == null ? void 0 : x.length) || 0,
                              " screens • ",
                              h.dateStr
                            ] })
                          ] }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-del-preset",
                              onClick: (A) => Lm(h.id, A),
                              title: "Delete saved preset",
                              children: "🗑️"
                            }
                          )
                        ] }, h.id);
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: Om,
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
                        var h;
                        return (h = nt.current) == null ? void 0 : h.click();
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
                      ref: nt,
                      type: "file",
                      accept: ".json",
                      style: { display: "none" },
                      onChange: Dm
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-rose",
                      onClick: () => {
                        En.current = !1, $t("auto-grid");
                        const h = Pe.length > 0 ? Pe : Ve, x = dr(h, Oe, Re), A = {
                          id: "canvas-timeline-root",
                          keyframes: [
                            {
                              id: "kf_root_0",
                              timestampEpochMs: d,
                              transitionDurationSec: 0.5,
                              transitionType: "smooth",
                              layout: {
                                width: Oe,
                                height: Re,
                                backgroundColor: "#070A10",
                                fps: 30,
                                placements: x
                              }
                            }
                          ]
                        };
                        Ke(A), U && U(A), Ue(0);
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
                      onClick: gd,
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
                      className: `btn-wing-tool ${mt ? "active" : ""}`,
                      onClick: _m,
                      title: "Fullscreen Canvas Grid (F)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: mt ? "⤓" : "⛶" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: mt ? "EXIT" : "FULL" })
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
        D && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => J(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (h) => h.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => J(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: st,
                onChange: (h) => Je(h.target.value),
                autoFocus: !0,
                onKeyDown: (h) => {
                  h.key === "Enter" && vd();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              he.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => J(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: vd, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const fc = [0.5, 1, 1.25, 1.5, 2, 4];
function pu({
  activeStationId: e,
  isPlaying: t,
  setIsPlaying: n,
  isLooping: r = !0,
  setIsLooping: o,
  _playheadMs: l = 0,
  setPlayheadMs: a,
  inPointMs: c = 0,
  outPointMs: u = 36e5,
  totalDurationMs: d = 36e5,
  hasGridPlacements: y = !0,
  onStepFrameForward: m,
  onStepFrameBackward: f,
  playbackSpeed: v = 1,
  onChangeSpeed: M,
  onSetInPoint: j,
  onSetOutPoint: O,
  activeFocusZone: k = "timeline",
  onFocusZoneChange: g = null
}) {
  const [N, b] = i.useState(() => Po()), { volume: E, isMuted: S } = N, w = !!(d > 0 || y || e);
  i.useEffect(() => {
    const Y = (T) => {
      T.detail && b(T.detail);
    };
    return window.addEventListener("itb-audio-state-changed", Y), () => window.removeEventListener("itb-audio-state-changed", Y);
  }, []);
  const p = i.useCallback((Y, T, H) => {
    const z = {
      volume: typeof Y == "number" ? Y : E,
      isMuted: typeof T == "boolean" ? T : S,
      channelMode: H || N.channelMode || "both"
    };
    b(z), Ix(z);
  }, [E, S, N.channelMode]), $ = (Y) => {
    Y == null || Y.stopPropagation(), w && n(!t);
  }, C = (Y) => {
    if (Y == null || Y.stopPropagation(), !w || !M) return;
    const T = fc.indexOf(v), H = T === -1 ? 1 : (T + 1) % fc.length;
    M(fc[H]);
  }, W = (Y) => {
    Y == null || Y.stopPropagation(), S ? p(E === 0 ? 0.5 : E, !1) : p(E, !0);
  }, ee = (Y) => {
    Y.stopPropagation();
    const T = parseFloat(Y.target.value);
    T === 0 ? p(0, !0) : p(T, !1);
  }, I = (Y) => {
    const T = i.useRef(null), H = i.useRef(null), z = i.useRef(0), xe = i.useCallback(() => {
      T.current && clearTimeout(T.current), H.current && clearInterval(H.current), T.current = null, H.current = null;
    }, []), X = i.useCallback((K = 1) => {
      if (n && n(!1), a) {
        const ge = 33 * K;
        a((fe) => {
          const ye = Y === "forward" ? fe + ge : fe - ge;
          return Math.max(0, Math.min(d, ye));
        });
      } else Y === "forward" && m ? m() : Y === "backward" && f && f();
    }, [Y]), V = i.useCallback((K) => {
      K.preventDefault(), K.stopPropagation(), w && (xe(), X(1), z.current = performance.now(), T.current = setTimeout(() => {
        H.current = setInterval(() => {
          const ge = performance.now() - z.current, fe = ge > 2500 ? 4 : ge > 1e3 ? 2 : 1;
          X(fe);
        }, 50);
      }, 280));
    }, [X, xe]);
    return i.useEffect(() => xe, [xe]), {
      onMouseDown: V,
      onMouseUp: xe,
      onMouseLeave: xe,
      onTouchStart: V,
      onTouchEnd: xe
    };
  }, R = I("backward"), ne = I("forward"), se = (Y) => {
    Y.stopPropagation(), w && (n && n(!1), a && a(c));
  }, oe = (Y) => {
    Y.stopPropagation(), w && (n && n(!1), a && a(u));
  }, U = () => S || E === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : E < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${w ? "is-expanded" : "is-compact-disabled"}`,
      title: w ? "" : "Playback ready",
      onMouseDown: () => g == null ? void 0 : g("timeline"),
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-ctrl-action btn-focus-indicator ${k === "canvas" ? "is-canvas" : "is-timeline"}`,
            onClick: (Y) => {
              Y.stopPropagation(), g == null || g(k === "canvas" ? "timeline" : "canvas");
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
            disabled: !w,
            onClick: C,
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
            disabled: !j,
            onClick: (Y) => {
              Y.stopPropagation(), j == null || j();
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
              disabled: !w,
              onClick: (Y) => {
                Y.stopPropagation(), o && o(!r);
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
              disabled: !w,
              onClick: se,
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
              disabled: !w,
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
              disabled: !w,
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
              disabled: !w,
              ...ne,
              title: "Step 1 Frame Forward (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "8 5 17 12 8 19 8 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-out",
              disabled: !w,
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
            disabled: !O,
            onClick: (Y) => {
              Y.stopPropagation(), O == null || O();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        w && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${S || E === 0 ? "is-muted" : ""}`,
              onClick: W,
              title: S ? "Unmute" : `Mute (${Math.round(E * 100)}%)`,
              children: U()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: S ? 0 : E,
              onChange: ee,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const ey = 8;
function ty({
  activeStationName: e = "",
  stationHostname: t = "",
  stations: n = [],
  keystrokes: r = null,
  recordingSegments: o = {},
  baseEpochMs: l = 0,
  timeMode: a = "LOCAL",
  viewportStartMs: c = 0,
  viewportDurationMs: u = 36e5,
  pixelWidth: d = 1e3,
  onSeek: y
}) {
  const [m, f] = i.useState([]), [, v] = i.useState(!1), M = i.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((b) => ({
    id: b.id,
    name: b.displayName || b.hostname || b.name || b.id,
    hostname: b.hostname || b.id
  })) : t || e ? [{
    id: t || e,
    name: e || t,
    hostname: t || e
  }] : [], [n, t, e]);
  i.useEffect(() => {
    if (r != null)
      return;
    if (!M.length || !l || u <= 0) {
      f([]);
      return;
    }
    const b = new AbortController(), E = Math.max(0, l + c - Da), S = l + c + u + Da;
    v(!0);
    const w = M.map((p) => {
      const $ = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(p.hostname)}&startEpoch=${E}&endEpoch=${S}`;
      return fetch($, { signal: b.signal }).then((C) => C.ok ? C.json() : []).then((C) => (Array.isArray(C) ? C : []).map((W) => ({
        ...W,
        stationId: p.id,
        stationName: p.name
      }))).catch((C) => {
        if (C.name !== "AbortError") return [];
        throw C;
      });
    });
    return Promise.all(w).then((p) => {
      const $ = p.flat();
      f($), v(!1);
    }).catch((p) => {
      p.name !== "AbortError" && (f([]), v(!1));
    }), () => b.abort();
  }, [M, l, c, u, r]);
  const j = i.useMemo(() => {
    const b = r ?? m;
    return !b || !b.length ? [] : !o || Object.keys(o).length === 0 ? b : b.filter((E) => {
      const S = E.stationId || E.stationName || E.stationHostname || E.hostname, w = S && o[S] || S && o[S.toLowerCase()] || S && o[S.toUpperCase()];
      return w && Array.isArray(w) && w.length > 0 ? w.some((p) => {
        const $ = p.startEpochMs ?? p.startEpoch ?? 0, C = p.endEpochMs ?? p.endEpoch ?? 0;
        return E.epochMs >= $ && E.epochMs <= C;
      }) : !(w && Array.isArray(w) && w.length === 0);
    });
  }, [r, m, o]), O = i.useMemo(() => {
    if (!j.length || u <= 0 || d <= 0)
      return [];
    const b = l + c, E = b + u, S = [...j].sort((C, W) => C.epochMs - W.epochMs), w = [];
    let p = null, $ = -999;
    for (const C of S) {
      const W = C.epochMs + Da;
      if (W < b || W > E)
        continue;
      const ee = W - l, I = (ee - c) / u * d;
      if (p && I - $ < ey) {
        p.events.push(C), p.endOffsetMs = ee, p.endEpochMs = W;
        const R = new Set(p.events.map((ne) => ne.stationName || ne.stationHostname || e || "Workstation"));
        p.isMultiStation = R.size > 1, p.stationCount = R.size, $ = I;
      } else {
        const R = (ee - c) / u * 100;
        p = {
          id: `kc_${C.epochMs}_${w.length}`,
          startOffsetMs: ee,
          endOffsetMs: ee,
          startEpochMs: W,
          endEpochMs: W,
          pct: R,
          events: [C],
          isMultiStation: !1,
          stationCount: 1
        }, w.push(p), $ = I;
      }
    }
    return w;
  }, [j, l, c, u, d]);
  function k(b) {
    if (!b.events.length) return "";
    if (b.events.length === 1)
      return ul(b.events[0].keyCombination);
    const E = b.events.find((p) => p.keyCombination.includes("+"));
    if (E) {
      const p = ul(E.keyCombination);
      return b.events.length > 1 ? `${p} (+${b.events.length - 1})` : p;
    }
    const S = ul(b.events[0].keyCombination);
    return b.events.every((p) => ul(p.keyCombination) === S) ? `${S} ×${b.events.length}` : `${S} (+${b.events.length - 1})`;
  }
  function g(b, E = "LOCAL") {
    return Et(b, E);
  }
  function N(b) {
    const E = [];
    for (const S of b) {
      const w = ul(S.keyCombination);
      E.length && E[E.length - 1].key === w ? E[E.length - 1].count++ : E.push({ key: w, count: 1 });
    }
    return E;
  }
  return O.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: O.map((b) => {
    const E = b.events.length, S = E > 1, w = b.isMultiStation, p = k(b), $ = g(b.startEpochMs, a), C = b.pct < 10 ? "edge-left" : b.pct > 90 ? "edge-right" : "", W = {};
    return b.events.forEach((ee) => {
      const I = ee.stationName || ee.stationHostname || e || "Workstation";
      W[I] || (W[I] = []), W[I].push(ee);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${S ? "is-cluster" : "is-single"} ${w ? "is-multi-station" : ""}`,
        style: { left: `${b.pct}%` },
        onClick: (ee) => {
          ee.stopPropagation(), y && y(b.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${p} at ${$}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            S && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: w ? `${b.stationCount}S` : E > 9 ? "9+" : E })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${C}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: w ? `MULTICAM KEYSTROKES (${b.stationCount} WORKSTATIONS • ${E} EVT)` : S ? `KEYSTROKE BURST (${E})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: $ })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(W).map(([ee, I]) => {
              const R = N(I);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: ee }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    I.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  R.slice(0, 6).map((ne, se) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    ne.key,
                    ne.count > 1 ? ` ×${ne.count}` : ""
                  ] }, se)),
                  R.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    R.length - 6,
                    " more"
                  ] })
                ] })
              ] }, ee);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      b.id
    );
  }) }) : null;
}
const ny = i.memo(ty), pc = [
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
], sy = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function ry({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  totalDurationMs: o = 36e5,
  hoverMs: l = null,
  onHoverChange: a,
  onSeek: c,
  inPointMs: u = null,
  outPointMs: d = null,
  earliestMediaMs: y = null,
  movieBoundaries: m = null,
  stationHostname: f = "",
  activeStationName: v = "",
  stations: M = [],
  showKeystrokes: j = !0,
  keystrokes: O = [],
  recordingSegments: k = {}
}) {
  const g = i.useRef(null), [N, b] = i.useState(1e3);
  i.useEffect(() => {
    if (!g.current) return;
    const X = new ResizeObserver((V) => {
      for (let K of V)
        K.contentRect.width > 50 && b(K.contentRect.width);
    });
    return X.observe(g.current), () => X.disconnect();
  }, []);
  const E = i.useCallback((X) => !r || r <= 0 ? "0%" : `${(X - n) / r * 100}%`, [r, n]), S = i.useCallback((X) => {
    const K = (X - n) / r * 100;
    return K >= -5 && K <= 105;
  }, [n, r]), w = (X) => {
    if (!g.current) return;
    const V = g.current.getBoundingClientRect(), K = Math.max(0, Math.min(X.clientX - V.left, V.width)), ge = Math.round(n + K / V.width * r);
    a && a(ge);
  }, p = () => {
    a && a(null);
  }, $ = (X) => {
    if (!g.current || !c) return;
    const V = g.current.getBoundingClientRect(), K = Math.max(0, Math.min(X.clientX - V.left, V.width)), ge = Math.round(n + K / V.width * r);
    c(Math.max(0, Math.min(o, ge)));
  }, C = i.useMemo(() => {
    const X = Math.max(3, Math.floor(N / 95)), V = r / X;
    for (let K of pc)
      if (K >= V) return K;
    return pc[pc.length - 1];
  }, [r, N]), W = i.useMemo(() => {
    if (!e || r <= 0) return [];
    const X = e + n, V = X + r, K = t === "LOCAL" ? Xs(X).offsetMin * 60 * 1e3 : 0, ge = X + K, fe = Math.ceil(ge / C) * C, ye = [];
    for (let De = fe; De <= V + K; De += C) {
      const Ce = De - K, Ie = (Ce - X) / r * 100;
      Ie >= 0 && Ie <= 100 && ye.push({
        epoch: Ce,
        pct: Ie,
        label: Et(Ce, t, {
          includeSeconds: C < 6e4
        })
      });
    }
    return ye;
  }, [e, n, r, C, t]), ee = i.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const X = e + n, V = X + r;
    return hm(X, V).map((K) => ({
      ...K,
      pct: (K.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), I = i.useMemo(() => {
    if (!r || !e) return [];
    const X = e + n, V = X + r, K = t === "UTC", ge = [], fe = K ? 0 : Xs(X).offsetMin * 60 * 1e3, ye = X + fe, De = V + fe, Ce = new Date(ye);
    for (Ce.setUTCHours(0, 0, 0, 0), Ce.getTime() < ye && Ce.setUTCDate(Ce.getUTCDate() + 1); Ce.getTime() <= De; ) {
      const Ze = Ce.getTime() - fe, Xe = (Ze - X) / r * 100, Ht = String(Ce.getUTCDate()).padStart(2, "0"), Ot = sy[Ce.getUTCMonth()], ft = `${Ht} ${Ot}`;
      ge.push({ epoch: Ze, pct: Xe, dateLabel: ft }), Ce.setUTCDate(Ce.getUTCDate() + 1);
    }
    return ge;
  }, [e, n, r, t]), {
    globalFirstMs: R = y,
    globalLastMs: ne = null,
    currentFirstMs: se = null,
    currentLastMs: oe = null
  } = m || { globalFirstMs: y }, U = R !== null && se !== null && Math.abs(R - se) < 1e3, Y = ne !== null && oe !== null && Math.abs(ne - oe) < 1e3, T = i.useMemo(() => {
    const X = [];
    return U ? S(R) && X.push({
      id: "first-combined",
      ms: R,
      pct: E(R),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${Et(e + R, t)} (Click to jump)`
    }) : (S(R) && X.push({
      id: "first-global",
      ms: R,
      pct: E(R),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${Et(e + R, t)} (Click to jump)`
    }), S(se) && X.push({
      id: "first-current",
      ms: se,
      pct: E(se),
      className: "ruler-media-pin current-first",
      badge: v ? `FIRST (${v})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${Et(e + se, t)} (Click to jump)`
    })), Y ? S(ne) && X.push({
      id: "last-combined",
      ms: ne,
      pct: E(ne),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${Et(e + ne, t)} (Click to jump)`
    }) : (S(oe) && X.push({
      id: "last-current",
      ms: oe,
      pct: E(oe),
      className: "ruler-media-pin current-last",
      badge: v ? `LAST (${v})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${Et(e + oe, t)} (Click to jump)`
    }), S(ne) && X.push({
      id: "last-global",
      ms: ne,
      pct: E(ne),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${Et(e + ne, t)} (Click to jump)`
    })), X;
  }, [
    R,
    ne,
    se,
    oe,
    U,
    Y,
    e,
    t,
    v,
    S,
    E
  ]), H = i.useMemo(() => {
    const X = [];
    return typeof u == "number" && S(u) && X.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: u,
      pct: E(u),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${Et(e + u, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && S(d) && X.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: E(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${Et(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), X;
  }, [u, d, e, t, S, E]), z = l !== null ? E(l) : null, xe = z !== null && z >= 0 && z <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: g,
      className: "timeline-ruler-root",
      onMouseMove: w,
      onMouseLeave: p,
      onClick: $,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          W.map((X) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${X.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: X.label })
          ] }, X.epoch)),
          j && /* @__PURE__ */ s.jsx(
            ny,
            {
              stationHostname: f,
              activeStationName: v,
              stations: M,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: N,
              onSeek: c,
              keystrokes: O,
              recordingSegments: k
            }
          ),
          ee.map((X) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${X.pct}%` },
              title: `${X.description} (${X.labelBefore} ➔ ${X.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: X.description })
                ] })
              ]
            },
            X.switchEpochMs
          )),
          I.map((X) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${X.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: X.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            X.epoch
          )),
          T.map((X) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: X.className,
              style: { left: `${X.pct}` },
              onClick: (V) => {
                V.stopPropagation(), c && c(X.ms);
              },
              title: X.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: X.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            X.id
          )),
          H.map((X) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${X.type}-cut-tick`,
              style: { left: `${X.pct}` },
              onClick: (V) => {
                V.stopPropagation(), c && c(X.ms);
              },
              title: X.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: X.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: X.shortLabel })
                ] })
              ]
            },
            X.id
          ))
        ] }),
        xe && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${z}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: Et(e + l, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Kn = (e) => String(e).padStart(2, "0");
function oy({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: o,
  outPointMs: l = 36e5,
  setOutPointMs: a
}) {
  const [c, u] = i.useState(!1), [d, y] = i.useState(!1), [m, f] = i.useState(""), [v, M] = i.useState(""), j = i.useCallback(($) => {
    if (!$ || isNaN($) || $ <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const I = new Date($);
      return {
        timeStr: `${Kn(I.getUTCHours())}:${Kn(I.getUTCMinutes())}:${Kn(I.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: C, label: W } = Xs($), ee = new Date($ + C * 60 * 1e3);
    return {
      timeStr: `${Kn(ee.getUTCHours())}:${Kn(ee.getUTCMinutes())}:${Kn(ee.getUTCSeconds())}`,
      zoneLabel: W
    };
  }, [t]), O = i.useCallback(($) => {
    if (!$ || $ < 0) return "00:00:00";
    const C = Math.floor($ / 1e3), W = Math.floor(C / 3600), ee = Math.floor(C % 3600 / 60), I = C % 60;
    return `${Kn(W)}:${Kn(ee)}:${Kn(I)}`;
  }, []), k = i.useMemo(() => j(e + r), [j, e, r]), g = i.useMemo(() => j(e + l), [j, e, l]), N = i.useMemo(() => O(Math.max(0, l - r)), [O, r, l]), b = i.useCallback(($, C) => {
    if (!$ || !$.trim()) return C;
    const ee = $.trim().split(" ")[0].split(":").map(Number);
    if (ee.length < 2 || ee.some(isNaN)) return C;
    const [I, R, ne = 0] = ee;
    if (t === "UTC") {
      const K = new Date(e);
      K.setUTCHours(I, R, ne, 0);
      let ge = K.getTime();
      for (; ge < e; ) ge += 864e5;
      for (; ge > e + n + 1e3; ) ge -= 864e5;
      const fe = ge - e;
      return isNaN(fe) ? C : Math.max(0, Math.min(n, fe));
    }
    const { offsetMin: se } = Xs(e), oe = new Date(e + se * 6e4), U = oe.getUTCFullYear(), Y = oe.getUTCMonth(), T = oe.getUTCDate(), H = `${U}-${Kn(Y + 1)}-${Kn(T)}`, z = `${Kn(I)}:${Kn(R)}:${Kn(ne)}`, xe = ui(H, z);
    let X;
    if (xe.isAmbiguous) {
      const K = e + C, ge = Math.abs(xe.firstOccurrenceEpoch - K), fe = Math.abs(xe.secondOccurrenceEpoch - K);
      X = ge <= fe ? xe.firstOccurrenceEpoch : xe.secondOccurrenceEpoch;
    } else {
      const K = Date.UTC(U, Y, T, I, R, ne), { offsetMin: ge } = Xs(K - se * 6e4);
      X = K - ge * 6e4;
    }
    for (; X < e; ) X += 864e5;
    for (; X > e + n + 1e3; ) X -= 864e5;
    const V = X - e;
    return isNaN(V) ? C : Math.max(0, Math.min(n, V));
  }, [e, t, n]), E = () => {
    f(k.timeStr), u(!0);
  }, S = () => {
    if (u(!1), !m || !m.trim() || m.trim() === k.timeStr)
      return;
    const $ = b(m.trim(), r);
    $ !== null && !isNaN($) && $ < l && o($);
  }, w = () => {
    M(g.timeStr), y(!0);
  }, p = () => {
    if (y(!1), !v || !v.trim() || v.trim() === g.timeStr)
      return;
    const $ = b(v.trim(), l);
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
          value: m,
          autoFocus: !0,
          onChange: ($) => f($.target.value),
          onBlur: S,
          onKeyDown: ($) => {
            $.key === "Enter" && S(), $.key === "Escape" && u(!1);
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
          value: v,
          autoFocus: !0,
          onChange: ($) => M($.target.value),
          onBlur: p,
          onKeyDown: ($) => {
            $.key === "Enter" && p(), $.key === "Escape" && y(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: w,
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: N })
    ] })
  ] });
}
function ly({
  minimapRef: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  totalDurationMs: r = 36e5,
  viewportStartMs: o = 0,
  viewportDurationMs: l = 36e5,
  zoomLevel: a = 1,
  inPointMs: c = 0,
  outPointMs: u = 36e5,
  playheadMs: d = 0,
  onStartDragMinimap: y
}) {
  const m = Math.max(0, Math.min(100, c / r * 100)), f = Math.max(0, Math.min(100, u / r * 100)), v = Math.max(0, f - m), M = Math.max(0, Math.min(100, o / r * 100)), j = Math.max(0, Math.min(100 - M, l / r * 100)), O = M + j, k = a > 1.05, g = 7, N = v >= 10, b = v >= 16, E = N, S = b, w = E && Math.abs(M - m) < g, p = k && j >= 12 && !w, $ = S && Math.abs(O - f) < g, C = k && j >= 12 && !$;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (W) => y && y("minimap-viewport", W),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${m}%`, width: `${v}%` },
            children: [
              E && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: Et(t + c, n) }),
              S && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: Et(t + u, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${M}%`, width: `${j}%` },
            children: [
              p && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: Et(t + o, n) }),
              C && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: Et(t + o + l, n) })
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
function ay({
  earliestMediaMs: e,
  latestMediaMs: t,
  hasActiveCut: n,
  onJumpToFirst: r,
  onJumpToLast: o,
  onContextualFit: l,
  onResetZoom: a,
  baseEpochMs: c,
  timeMode: u,
  keystrokeMode: d = "BURN_IN",
  // 'NONE' | 'BURN_IN'
  onChangeKeystrokeMode: y,
  showRulerKeystrokes: m = !1,
  onToggleRulerKeystrokes: f
}) {
  const v = (d || "NONE").toUpperCase().replace("-", "_"), M = () => {
    y && y(v === "BURN_IN" ? "NONE" : "BURN_IN");
  }, j = () => v === "BURN_IN" ? "KEYS: BURN-IN" : "KEYS: OFF";
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline-viewport-actions-group", children: [
    y && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action keys-mode-btn mode-${v === "BURN_IN" ? "burn-in" : "none"}`,
        onClick: M,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: j() })
        ]
      }
    ),
    f && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${m ? "active" : "inactive"}`,
        onClick: f,
        title: m ? "Hide Keystroke Ticks on Ruler" : "Show Keystroke Ticks on Ruler",
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
        title: `Jump playhead to first media (${Et(c + e, u)})`,
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
        onClick: o,
        title: `Jump playhead to last media (${Et(c + t, u)})`,
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
        onClick: l,
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
const Ls = /* @__PURE__ */ new Map(), go = /* @__PURE__ */ new Map();
let zs = [], _o = 0;
const Hh = 3, iy = 8e3, cy = 80;
function wm() {
  setTimeout(uy, 0);
}
function uy() {
  var e;
  if (!(_o >= Hh || zs.length === 0))
    for (zs = zs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); _o < Hh && zs.length > 0; ) {
      const t = zs.pop();
      !t || (e = t.signal) != null && e.aborted || (_o++, dy(t));
    }
}
async function dy(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: o, frameCount: l, signal: a, resolve: c, displayId: u } = e;
  let d = !1, y = null;
  const m = () => {
    d || (d = !0, y && clearTimeout(y), _o = Math.max(0, _o - 1), go.delete(t), wm());
  };
  y = setTimeout(() => {
    m(), c(null);
  }, iy);
  try {
    const f = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${o}&frameCount=${l}&tileWidth=100&tileHeight=50${u ? `&displayId=${encodeURIComponent(u)}` : ""}`, v = await fetch(f, { signal: a });
    if (v.ok && v.status !== 204) {
      const M = await v.blob();
      if (M && M.size > 1500) {
        const j = URL.createObjectURL(M);
        if (Ls.size >= cy) {
          const O = Ls.keys().next().value, k = Ls.get(O);
          k && URL.revokeObjectURL(k), Ls.delete(O);
        }
        Ls.set(t, j), c(j);
        return;
      }
    }
    c(null);
  } catch {
    c(null);
  } finally {
    m();
  }
}
const zh = {
  /**
   * Gets a cached spritesheet tile URL synchronously.
   * 
   * @param {string} hostname
   * @param {number} startEpoch
   * @param {number} endEpoch
   * @param {number} [frameCount=6]
   * @returns {string|undefined} Blob URL if cached.
   */
  get(e, t, n, r = 6, o = null) {
    const l = `${e}_${o || "mon-0"}_${t}_${n}_${r}`;
    return Ls.get(l);
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
  fetchTile(e, t, n, r = 6, o = null, l = null) {
    const a = `${e}_${l || "mon-0"}_${t}_${n}_${r}`;
    if (Ls.has(a))
      return Promise.resolve(Ls.get(a));
    if (go.has(a))
      return go.get(a);
    const c = new Promise((u) => {
      if (o != null && o.aborted) {
        u(null);
        return;
      }
      const d = {
        key: a,
        hostname: e,
        startEpoch: t,
        endEpoch: n,
        frameCount: r,
        displayId: l || "mon-0",
        signal: o,
        resolve: u
      };
      o && o.addEventListener("abort", () => {
        zs = zs.filter((y) => y.key !== a), go.delete(a), u(null);
      }, { once: !0 }), zs.push(d), wm();
    });
    return go.set(a, c), c;
  },
  clear() {
    Ls.forEach((e) => URL.revokeObjectURL(e)), Ls.clear(), go.clear(), zs = [], _o = 0;
  }
}, hy = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, ts = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, qr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function mu({
  hostname: e,
  displayId: t = "mon-0",
  activeSegments: n = [],
  viewportStartMs: r = 0,
  viewportDurationMs: o = 36e5,
  baseEpochMs: l = 0,
  inPointMs: a = 0,
  outPointMs: c = 36e5,
  globalGaps: u = [],
  gaps: d = [],
  directorSegments: y = [],
  isAutoDirectorEnabled: m = !1,
  showDirectorCoverage: f = !1,
  stepperSegments: v = null,
  isCanvasSummary: M = !1
}) {
  const [j, O] = i.useState({}), k = i.useRef(j);
  k.current = j;
  const g = i.useMemo(() => hy(o), [o]), N = i.useMemo(() => {
    if (n.length === 0 || !l || o <= 0) return [];
    const { tileDurationMs: C, framesPerTile: W } = g, ee = [], I = l + r, R = I + o, ne = I - C, se = R + C, oe = [...n].sort((z, xe) => ts(z) - ts(xe)), U = M ? u || [] : [...u || [], ...d || []], Y = (z, xe) => !U || U.length === 0 ? !1 : U.some((X) => {
      const V = X.startEpochMs ?? X.startEpoch ?? X.start ?? 0, K = X.endEpochMs ?? X.endEpoch ?? X.end ?? 0;
      return K <= V ? !1 : Math.max(z, V) < Math.min(xe, K);
    }), T = l + a, H = l + c;
    if (oe.forEach((z, xe) => {
      const X = Math.round(ts(z)), V = Math.round(qr(z));
      if (V <= X) return;
      const K = Math.max(X, T), ge = Math.min(V, H);
      if (ge <= K) return;
      const fe = Math.max(K, ne), ye = Math.min(ge, se);
      if (ye <= fe) return;
      const De = Math.floor(fe / C) * C;
      for (let Ce = De; Ce < ye; Ce += C) {
        const Ie = Ce + C, Ze = Math.max(K, Ce), Xe = Math.min(ge, Ie);
        Xe > Ze && !Y(Ze, Xe) && ee.push({
          key: `${e}_${t}_${Ze}_${Xe}_${W}`,
          sIdx: xe,
          startEpoch: Ze,
          endEpoch: Xe,
          framesPerTile: W,
          displayId: t
        });
      }
    }), ee.length > 20) {
      const z = l + r + o / 2;
      ee.sort((xe, X) => {
        const V = Math.abs((xe.startEpoch + xe.endEpoch) / 2 - z), K = Math.abs((X.startEpoch + X.endEpoch) / 2 - z);
        return V - K;
      }), ee.length = 20, ee.sort((xe, X) => xe.startEpoch - X.startEpoch);
    }
    return ee;
  }, [n, l, e, t, r, o, g, a, c, d, u]);
  i.useEffect(() => {
    if (N.length === 0) return;
    let C = !0;
    const W = new AbortController(), ee = [], I = {};
    let R = !1;
    N.forEach((T) => {
      const H = zh.get(e, T.startEpoch, T.endEpoch, T.framesPerTile, t);
      H ? k.current[T.key] !== H && (I[T.key] = H, R = !0) : ee.push(T);
    });
    const ne = new Set(N.map((T) => T.key)), se = k.current, oe = {};
    let U = !1;
    if (Object.keys(se).forEach((T) => {
      ne.has(T) ? oe[T] = se[T] : U = !0;
    }), R || U) {
      const T = { ...oe, ...I };
      k.current = T, O(T);
    }
    if (ee.length === 0) return () => {
      C = !1;
    };
    const Y = setTimeout(() => {
      ee.forEach((T) => {
        zh.fetchTile(e, T.startEpoch, T.endEpoch, T.framesPerTile, W.signal, t).then((H) => {
          C && H && (k.current[T.key] = H, O((z) => ({ ...z, [T.key]: H })));
        });
      });
    }, 150);
    return () => {
      C = !1, clearTimeout(Y), W.abort();
    };
  }, [N, e, t]);
  const b = (a - r) / o * 100, E = (c - r) / o * 100, S = i.useMemo(() => {
    if (N.length === 0 || !l || o <= 0) return [];
    const C = r, W = r + o;
    return N.map((ee) => {
      const I = ee.startEpoch - l, R = ee.endEpoch - l;
      if (R <= C || I >= W) return null;
      const ne = Math.max(C, I), se = Math.min(W, R);
      return {
        key: ee.key,
        spriteUrl: j[ee.key] || null,
        leftPct: (ne - C) / o * 100,
        widthPct: (se - ne) / o * 100
      };
    }).filter(Boolean);
  }, [N, l, r, o, j]), w = i.useMemo(() => {
    if (n.length === 0 || !l || o <= 0) return [];
    const C = r, W = r + o;
    return n.map((ee, I) => {
      const R = Math.round(ts(ee)) - l, ne = Math.round(qr(ee)) - l;
      if (ne <= C || R >= W) return null;
      const se = Math.max(C, R), oe = Math.min(W, ne);
      return {
        id: I,
        leftPct: (se - C) / o * 100,
        widthPct: (oe - se) / o * 100
      };
    }).filter(Boolean);
  }, [n, l, r, o]), p = i.useMemo(() => {
    if (!l || o <= 0) return [];
    const C = [...n].sort((Y, T) => ts(Y) - ts(T)), W = [], ee = r, I = r + o, R = l + ee, ne = l + I, se = l + (a !== void 0 ? a : ee), oe = l + (c !== void 0 ? c : I);
    if (C.length > 0) {
      const Y = ts(C[0]);
      Y > R && W.push({ startEpoch: R, endEpoch: Y });
    } else o > 0 && W.push({ startEpoch: R, endEpoch: ne });
    for (let Y = 0; Y < C.length - 1; Y++) {
      const T = qr(C[Y]), H = ts(C[Y + 1]);
      H - T > 1e3 && W.push({ startEpoch: T, endEpoch: H });
    }
    if (C.length > 0) {
      const Y = qr(C[C.length - 1]);
      Y < ne && W.push({ startEpoch: Y, endEpoch: ne });
    }
    const U = [];
    return u && u.length > 0 && u.forEach((Y, T) => {
      const H = Math.max(Y.startEpochMs ?? Y.StartEpochMs, se), z = Math.min(Y.endEpochMs ?? Y.EndEpochMs, oe);
      if (z > H && z > R && H < ne) {
        const xe = Math.max(R, H), X = Math.min(ne, z), V = (X - l - (xe - l)) / o * 100;
        V > 0 && U.push({
          id: `global-${T}`,
          type: "global",
          startEpoch: xe,
          endEpoch: X,
          leftPct: (xe - l - ee) / o * 100,
          widthPct: V,
          durationSec: Math.round((z - H) / 1e3)
        });
      }
    }), M || W.forEach((Y, T) => {
      let H = [Y];
      u && u.length > 0 && u.forEach((z) => {
        const xe = Math.max(z.startEpochMs ?? z.StartEpochMs, se), X = Math.min(z.endEpochMs ?? z.EndEpochMs, oe);
        if (X <= xe) return;
        const V = [];
        H.forEach((K) => {
          X <= K.startEpoch || xe >= K.endEpoch ? V.push(K) : (xe > K.startEpoch && V.push({ startEpoch: K.startEpoch, endEpoch: xe }), X < K.endEpoch && V.push({ startEpoch: X, endEpoch: K.endEpoch }));
        }), H = V;
      }), H.forEach((z, xe) => {
        if (z.endEpoch - z.startEpoch < 1e3 || z.endEpoch <= R || z.startEpoch >= ne) return;
        const X = Math.max(R, z.startEpoch), V = Math.min(ne, z.endEpoch), K = (V - l - (X - l)) / o * 100;
        K > 0 && U.push({
          id: `station-${T}-${xe}`,
          type: "station",
          startEpoch: X,
          endEpoch: V,
          leftPct: (X - l - ee) / o * 100,
          widthPct: K,
          durationSec: Math.round((z.endEpoch - z.startEpoch) / 1e3)
        });
      });
    }), U;
  }, [n, u, l, r, o, a, c, M]), $ = i.useMemo(() => {
    if (!f || !m || !y || y.length === 0) return [];
    const C = (t || "mon-0").toLowerCase(), W = r, ee = r + o;
    return y.map((I, R) => {
      const ne = (I.startEpochMs ?? I.StartEpochMs ?? 0) - l, se = (I.endEpochMs ?? I.EndEpochMs ?? 0) - l;
      if (se <= W || ne >= ee) return null;
      const oe = Math.max(W, ne), U = Math.min(ee, se), Y = (oe - W) / o * 100, T = (U - oe) / o * 100;
      if (T <= 0) return null;
      const z = (I.targetDisplayId || I.TargetDisplayId || "mon-0").toLowerCase() === C;
      return {
        id: `cov_${R}`,
        isFeatured: z,
        leftPct: Y,
        widthPct: T
      };
    }).filter(Boolean);
  }, [f, m, y, t, l, r, o]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: p.map((C) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `gap-full-block ${C.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
        style: { left: `${C.leftPct}%`, width: `${C.widthPct}%` },
        title: C.type === "global" ? `Shared Gap: ${C.durationSec}s will be skipped` : `Station Gap: ${C.durationSec}s No-Signal`,
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
          C.widthPct > 2.5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${C.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: C.type === "global" ? `✂ SKIPPED (${C.durationSec}s)` : "NO SIGNAL" }) })
        ]
      },
      C.id
    )) }),
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: S.map((C) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `spritesheet-tile-block ${C.spriteUrl ? "is-loaded" : "is-loading"}`,
        style: {
          position: "absolute",
          left: `${C.leftPct}%`,
          width: `${C.widthPct}%`,
          height: "100%",
          backgroundImage: C.spriteUrl ? `url("${C.spriteUrl}")` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "opacity 0.25s ease"
        },
        children: !C.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
      },
      C.key
    )) }),
    $.map((C) => C.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${C.leftPct}%`, width: `${C.widthPct}%` },
        title: "Display Featured by Auto-Director"
      },
      C.id
    ) : /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-mask-dimmed",
        style: { left: `${C.leftPct}%`, width: `${C.widthPct}%` },
        title: "Display Off-Air (Masked by Auto-Director)"
      },
      C.id
    )),
    /* @__PURE__ */ s.jsxs("div", { className: `data-presence-layer ${v ? "has-stepper" : ""}`, children: [
      w.map((C) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "data-presence-bar recorded-bar",
          style: { left: `${C.leftPct}%`, width: `${C.widthPct}%` },
          title: "Recorded Video"
        },
        `bar_${C.id}`
      )),
      p.map((C) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `data-presence-bar gap-bar ${C.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${C.leftPct}%`, width: `${C.widthPct}%` },
          title: C.type === "global" ? `Shared Gap: ${C.durationSec}s skipped in export` : `Signal Loss / Gap: ${C.durationSec}s (No Video)`
        },
        `gap_bar_${C.id}`
      ))
    ] }),
    v && v.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: m ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      v.map((C, W) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${C.dispNum}`,
          style: { left: `${C.leftPct}%`, width: `${C.widthPct}%` },
          title: `Auto-Director: Screen ${C.dispNum} (${C.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: C.dispNum })
        },
        `stp_${W}`
      )),
      p && p.map((C) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-gap-block ${C.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${C.leftPct}%`, width: `${C.widthPct}%` },
          title: C.type === "global" ? `Global Gap: ${C.durationSec}s skipped in export (No switches)` : `Station Gap: ${C.durationSec}s No Signal (No switches)`,
          children: C.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "stepper-gap-badge", children: C.type === "global" ? "✂ SKIPPED" : "NO SIGNAL" })
        },
        `gap_stp_${C.id}`
      ))
    ] }) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    b > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, b)}%` } }),
    E < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, E)}%`, right: 0 } })
  ] });
}
function fy({
  station: e,
  isExpanded: t = !1,
  onToggleExpand: n,
  isAutoDirectorEnabled: r = !0,
  onToggleAutoDirector: o,
  canvasPlacements: l = [],
  onToggleDisplayOnCanvas: a,
  directorPlan: c = null,
  isActive: u = !0,
  onSelect: d,
  onStationContextMenu: y,
  onDeselectStation: m,
  viewportStartMs: f = 0,
  viewportDurationMs: v = 36e5,
  inPointMs: M = 0,
  outPointMs: j = 36e5,
  baseEpochMs: O = 0,
  segments: k = [],
  recordingSegments: g = {},
  globalGaps: N = []
}) {
  const b = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", E = (e == null ? void 0 : e.id) || b, S = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", w = (e == null ? void 0 : e.hostname) || "", p = i.useMemo(() => {
    var T, H, z;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((T = e == null ? void 0 : e.displayTopology) == null ? void 0 : T.displays) || ((H = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : H.Displays) || ((z = e == null ? void 0 : e.topology) == null ? void 0 : z.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), $ = i.useMemo(() => {
    var H, z;
    const T = p.find((xe) => xe.isPrimary || xe.IsPrimary);
    return ((T == null ? void 0 : T.displayId) || (T == null ? void 0 : T.DisplayId) || ((H = p[0]) == null ? void 0 : H.displayId) || ((z = p[0]) == null ? void 0 : z.DisplayId) || "mon-0").toLowerCase();
  }, [p]), C = c || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), W = i.useMemo(() => (C == null ? void 0 : C.segments) || (C == null ? void 0 : C.Segments) || [], [C]), ee = W && W.length > 0, I = !!(p && p.length > 1), R = !!(t && I), ne = i.useMemo(() => {
    let T = g[E] || g[b] || k || [];
    if (!T || T.length === 0) {
      const H = (E || "").toLowerCase(), z = (b || "").toLowerCase();
      for (const [xe, X] of Object.entries(g || {})) {
        const V = xe.toLowerCase();
        if (H && V === H || z && V === z) {
          T = X;
          break;
        }
      }
    }
    if ((!T || T.length === 0) && (T = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !T || T.length === 0)
      for (const H of p) {
        const z = H.segments || H.Segments || [];
        if (z.length > 0) {
          T = z;
          break;
        }
      }
    return (T || []).filter((H) => qr(H) - ts(H) > 0);
  }, [g, k, E, b, e, p]), se = i.useMemo(() => {
    if (!O || v <= 0) return [];
    const T = [...ne].sort((V, K) => ts(V) - ts(K)), H = [], z = O + v;
    if (N && N.length > 0 && N.forEach((V) => {
      const K = V.startEpochMs ?? V.StartEpochMs ?? 0, ge = V.endEpochMs ?? V.EndEpochMs ?? 0;
      ge > K && H.push({ startEpoch: K, endEpoch: ge, type: "global" });
    }), T.length === 0)
      return H.push({ startEpoch: O, endEpoch: z, type: "station" }), H;
    const xe = Math.round(ts(T[0]));
    xe - O > 2e3 && (H.some((K) => K.type === "global" && K.startEpoch <= O && K.endEpoch >= xe) || H.push({ startEpoch: O, endEpoch: xe, type: "station" }));
    for (let V = 0; V < T.length - 1; V++) {
      const K = Math.round(qr(T[V])), ge = Math.round(ts(T[V + 1]));
      ge - K > 2e3 && (H.some((ye) => ye.type === "global" && ye.startEpoch <= K && ye.endEpoch >= ge) || H.push({ startEpoch: K, endEpoch: ge, type: "station" }));
    }
    const X = Math.round(qr(T[T.length - 1]));
    return z - X > 2e3 && (H.some((K) => K.type === "global" && K.startEpoch <= X && K.endEpoch >= z) || H.push({ startEpoch: X, endEpoch: z, type: "station" })), H;
  }, [ne, N, O, v]), oe = i.useMemo(() => {
    const T = O + M, H = O + j;
    return Kx(W, se, N, T, H, $);
  }, [W, se, N, O, M, j, $]), U = i.useMemo(() => {
    if (!ee || v <= 0) return null;
    const T = f, H = f + v;
    return oe.map((z, xe) => {
      const X = (z.startEpochMs ?? z.StartEpochMs ?? 0) - O, V = (z.endEpochMs ?? z.EndEpochMs ?? 0) - O;
      if (V <= T || X >= H) return null;
      const K = Math.max(T, X), ge = Math.min(H, V), fe = (K - T) / v * 100, ye = (ge - K) / v * 100;
      if (ye <= 0) return null;
      const De = (z.targetDisplayId || z.TargetDisplayId || "mon-0").toLowerCase(), Ce = p.findIndex((Xe) => (Xe.displayId || Xe.DisplayId || "").toLowerCase() === De);
      let Ie = Ce >= 0 ? Ce + 1 : null;
      if (!Ie) {
        const Xe = De.match(/\d+/);
        Ie = Xe ? parseInt(Xe[0], 10) + 1 : 1;
      }
      const Ze = Ce >= 0 ? p[Ce].displayName || p[Ce].DisplayName || `Screen ${Ie}` : `Screen ${Ie}`;
      return {
        id: xe,
        dispNum: Ie,
        dispLabel: Ze,
        leftPct: fe,
        widthPct: ye
      };
    }).filter(Boolean);
  }, [ee, oe, p, O, f, v]), Y = i.useCallback((T) => {
    const H = (T || "mon-0").toLowerCase();
    return l.some((z) => {
      if (z.stationId !== E) return !1;
      const xe = (z.displayId || "mon-0").toLowerCase();
      return xe === H || xe === "auto" && (H === "mon-0" || H === "screen-0");
    });
  }, [l, E]);
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
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: S, children: S }),
        I && o && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
            onClick: (T) => {
              T.stopPropagation(), o(e.id);
            },
            title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
            children: r ? "⚡ AUTO" : "✋ OFF"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-timeline", children: [
        I && o && /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-station-auto-director ${r ? "is-active" : "is-inactive"}`,
            onClick: (T) => {
              T.stopPropagation(), o(e.id);
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
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: p.map((T, H) => {
      const z = (T.displayId || T.DisplayId || `mon-${H}`).toLowerCase(), xe = T.displayNumber || T.DisplayNumber || H + 1, X = T.displayName || T.DisplayName || "", V = X && !X.toLowerCase().includes(b.toLowerCase()) ? X : `Screen ${xe}${T.isPrimary || H === 0 ? " (Main)" : ""}`, K = Y(z), ge = (() => {
        if (T.segments && T.segments.length > 0) return T.segments;
        const fe = `${E}/${z}`.toLowerCase(), ye = `${b}/${z}`.toLowerCase(), De = `${E}_${z}`.toLowerCase(), Ce = `${b}_${z}`.toLowerCase();
        for (const [Ie, Ze] of Object.entries(g || {})) {
          const Xe = Ie.toLowerCase();
          if (Xe === fe || Xe === ye || Xe === De || Xe === Ce) return Ze;
        }
        return z === "mon-0" || T.isPrimary || H === 0 ? ne : [];
      })();
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${V} (${T.width || 1920}×${T.height || 1080})`, children: V }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${K ? "is-on-canvas" : ""}`,
                  onClick: (fe) => {
                    fe.stopPropagation(), a(e.id, z);
                  },
                  title: K ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: K ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              mu,
              {
                hostname: b,
                displayId: z,
                activeSegments: ge,
                viewportStartMs: f,
                viewportDurationMs: v,
                baseEpochMs: O,
                inPointMs: M,
                outPointMs: j,
                globalGaps: N,
                directorSegments: oe,
                isAutoDirectorEnabled: r,
                gaps: se,
                showDirectorCoverage: I
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
        d && d(), I && n && n();
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
            title: `Workstation: ${S}${w ? ` (${w})` : ""} • Click to select${I ? " / expand" : ""}`,
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
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: S, children: S }),
              I && o && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (T) => {
                    T.stopPropagation(), o(e.id);
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
                  title: `Remove ${S} from project`,
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
          mu,
          {
            hostname: b,
            displayId: $,
            activeSegments: ne,
            viewportStartMs: f,
            viewportDurationMs: v,
            baseEpochMs: O,
            inPointMs: M,
            outPointMs: j,
            globalGaps: N,
            isAutoDirectorEnabled: r,
            gaps: se,
            stepperSegments: I ? U : null
          }
        )
      ]
    }
  );
}
const po = /* @__PURE__ */ new Map(), dl = /* @__PURE__ */ new Map();
function py(e, t, n, r = 250) {
  const o = (e || "").replace(/^live\//i, "").toLowerCase().trim(), l = Math.floor(t / 1e4) * 1e4, a = Math.ceil(n / 1e4) * 1e4;
  return `${o}_${l}_${a}_${r}`;
}
const _a = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 250) {
    const o = py(e, t, n, r);
    return po.get(o) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, o = 250) {
    if (!e || n <= t) return null;
    const l = (e || "").replace(/^live\//i, "").trim(), a = Math.floor(t / 1e4) * 1e4, c = Math.ceil(n / 1e4) * 1e4, u = `${l.toLowerCase()}_${a}_${c}_${o}`;
    if (po.has(u))
      return po.get(u);
    if (dl.has(u))
      return dl.get(u);
    const d = (async () => {
      try {
        const y = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(l)}&startEpoch=${a}&endEpoch=${c}&points=${o}`, m = await fetch(y, { signal: r });
        if (!m.ok) {
          if (m.status === 204) return null;
          throw new Error(`HTTP ${m.status}`);
        }
        const f = await m.json();
        if (Array.isArray(f) && f.length > 0)
          return po.set(u, f), f;
      } catch (y) {
        if (y.name !== "AbortError") {
          const m = new Array(o).fill(0.02);
          return po.set(u, m), m;
        }
      } finally {
        dl.delete(u);
      }
      return null;
    })();
    return dl.set(u, d), d;
  },
  /**
   * Clears cached waveforms (e.g. on project change)
   */
  clear() {
    po.clear(), dl.clear();
  }
}, Na = {
  sys: "#8B5CF6",
  // Tactical Violet (System Audio / PC Output)
  mic: "#F59E0B"
};
function hi(e, t = 100, n = 24, r = 1, o = {}) {
  const l = o.yCenter !== void 0 ? o.yCenter : n / 2, a = o.maxHalfHeight !== void 0 ? o.maxHalfHeight : n / 2 - 1.5;
  if (!e || !Array.isArray(e) || e.length === 0)
    return `M 0,${l} L ${t},${l}`;
  const c = e.length, u = t / Math.max(1, c - 1), d = Math.max(0, Math.min(3, Number(r) || 1));
  let y = "";
  for (let f = 0; f < c; f++) {
    const v = f * u, M = Math.min(1, Math.max(0.02, (e[f] || 0) * d)), j = l - M * a;
    y += f === 0 ? `M ${v.toFixed(2)},${j.toFixed(2)}` : ` L ${v.toFixed(2)},${j.toFixed(2)}`;
  }
  let m = "";
  for (let f = c - 1; f >= 0; f--) {
    const v = f * u, M = Math.min(1, Math.max(0.02, (e[f] || 0) * d)), j = l + M * a;
    m += ` L ${v.toFixed(2)},${j.toFixed(2)}`;
  }
  return `${y}${m} Z`;
}
function my(e, t = 100, n = 24, r = 1) {
  let o = null, l = null;
  e && typeof e == "object" && !Array.isArray(e) && e.sys && e.mic ? (o = e.sys, l = e.mic) : Array.isArray(e) && (o = e.map((u, d) => Math.min(1, Math.max(0.02, u * (1 + 0.12 * Math.sin(d * 0.45))))), l = e.map((u, d) => Math.min(1, Math.max(0.02, u * (0.92 + 0.15 * Math.cos(d * 0.38))))));
  const a = hi(o, t, n, r, {
    yCenter: n * 0.25,
    maxHalfHeight: n * 0.25 - 1.2
  }), c = hi(l, t, n, r, {
    yCenter: n * 0.75,
    maxHalfHeight: n * 0.25 - 1.2
  });
  return { sysPath: a, micPath: c };
}
const ka = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function gy({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: o = "#06B6D4" }) {
  const l = t === "both", a = t === "sys", c = t === "mic", u = i.useMemo(() => !l || !e ? null : my(e, 100, 24, n), [l, e, n]), d = i.useMemo(() => l || !e ? null : hi(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [l, e, n]);
  if (r)
    return /* @__PURE__ */ s.jsxs("div", { className: "waveform-loading-shimmer", title: "Decoding Station Audio Waveform...", children: [
      /* @__PURE__ */ s.jsx("div", { className: "shimmer-scanner" }),
      /* @__PURE__ */ s.jsx("span", { className: "shimmer-text", children: "DECODING AUDIO..." })
    ] });
  if (l) {
    const m = Na.sys, f = Na.mic;
    return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg waveform-svg-dual", children: [
      /* @__PURE__ */ s.jsx(
        "path",
        {
          d: (u == null ? void 0 : u.sysPath) || "M 0,6 L 100,6",
          fill: m,
          fillOpacity: "0.45",
          stroke: m,
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
  const y = a ? Na.sys : c ? Na.mic : o || "#06B6D4";
  return /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
    "path",
    {
      d: d || hi(e, 100, 24, n),
      fill: y,
      fillOpacity: "0.45",
      stroke: y,
      strokeWidth: "1.2",
      strokeOpacity: "0.85"
    }
  ) });
}
function xy({
  clip: e,
  lane: t,
  laneColor: n,
  isSelected: r,
  onSelect: o,
  onOpenMenu: l,
  onTrimDrag: a,
  onClipMoveDrag: c,
  onToggleChannelMode: u,
  vpStartEpoch: d,
  viewportDurationMs: y,
  timeMode: m,
  stationName: f
}) {
  const [v, M] = i.useState(() => _a.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [j, O] = i.useState(!1);
  i.useEffect(() => {
    let R = !0;
    const ne = new AbortController(), se = _a.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (se) {
      M(se), O(!1);
      return;
    }
    return M(null), O(!0), _a.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, ne.signal, 250).then((oe) => {
      R && (oe && M(oe), O(!1));
    }).catch(() => {
      R && O(!1);
    }), () => {
      R = !1, ne.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const k = e.startEpochMs, g = e.endEpochMs, N = Math.max(1, g - k), b = (e.gain || 1) * (t.gain || 1), E = Math.max(d, k), S = Math.min(d + y, g), w = (E - d) / y * 100, p = (S - E) / y * 100;
  if (p <= 0) return null;
  const $ = e.channelMode || t.channelMode || "both", C = e.fadeInMs ?? 50, W = e.fadeOutMs ?? 50, ee = Math.min(45, C / N * 100), I = Math.min(45, W / N * 100);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-clip-block ${t.isMuted ? "lane-muted" : ""} ${r ? "is-selected" : ""}`,
      style: {
        left: `${w}%`,
        width: `${p}%`,
        borderLeftColor: n
      },
      onClick: o,
      onMouseDown: (R) => {
        !R.target.closest(".trim-handle") && !R.target.closest(".btn-menu-close") && !R.target.closest(".clip-channel-tag") && (c == null || c(R));
      },
      onDoubleClick: l,
      onContextMenu: l,
      title: `Audio Clip: ${f} [${$.toUpperCase()}] (${Et(k, m, { includeSeconds: !0 })} - ${Et(g, m, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${C}ms / OUT ${W}ms
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
        C > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-in-ramp",
            style: { width: `${ee}%` },
            title: `Fade In: ${C}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 0,100", fill: "rgba(6, 182, 212, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "100", x2: "100", y2: "0", stroke: "#38BDF8", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          gy,
          {
            peaks: v,
            channelMode: $,
            effectiveGain: b,
            isLoadingWaveform: j,
            laneColor: n
          }
        ) }),
        W > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${I}%` },
            title: `Fade Out: ${W}ms`,
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
function yy({
  audioPlan: e,
  stations: t = [],
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  baseEpochMs: o = 0,
  playheadMs: l = 0,
  onSplitSegment: a,
  onChangeSegmentStation: c,
  onChangeSegmentGain: u,
  onFollowVisualFeed: d,
  isAutoFollow: y = !1,
  timeMode: m = "LOCAL",
  onUpdateAudioPlan: f = null
}) {
  const v = i.useRef(null), M = i.useRef(!1), [j, O] = i.useState(() => {
    var B;
    return e != null && e.segments && e.segments.length > 0 ? [
      {
        id: "A1",
        name: "Track A1",
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: e.segments.map((D, J) => {
          var _;
          return {
            id: D.id || `clip_${J}_${D.startEpochMs || D.StartEpochMs}`,
            startEpochMs: D.startEpochMs ?? D.StartEpochMs ?? o,
            endEpochMs: D.endEpochMs ?? D.EndEpochMs ?? o + r,
            sourceStationId: D.sourceStationId ?? D.SourceStationId ?? (((_ = t[0]) == null ? void 0 : _.id) || "station-0"),
            gain: D.gain ?? D.Gain ?? 1,
            channelMode: D.channelMode ?? D.ChannelMode ?? "both",
            fadeInMs: D.fadeInMs ?? D.FadeInMs ?? 50,
            fadeOutMs: D.fadeOutMs ?? D.FadeOutMs ?? 50
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
        clips: [
          {
            id: `clip_default_${Date.now()}`,
            startEpochMs: o,
            endEpochMs: o + r,
            sourceStationId: ((B = t[0]) == null ? void 0 : B.id) || "station-0",
            gain: 1,
            channelMode: "both",
            fadeInMs: 50,
            fadeOutMs: 50
          }
        ]
      }
    ];
  }), [k, g] = i.useState(!1), [N, b] = i.useState(null), [E, S] = i.useState(1), [w, p] = i.useState(50), [$, C] = i.useState(50), [W, ee] = i.useState([]), [I, R] = i.useState(null), [ne, se] = i.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  i.useEffect(() => {
    const B = (D) => {
      D.detail && se(D.detail);
    };
    return window.addEventListener("itb-live-audio-level", B), () => window.removeEventListener("itb-live-audio-level", B);
  }, []), i.useEffect(() => {
    M.current || !(e != null && e.segments) || e.segments.length === 0 || O((B) => {
      const D = B.find((_) => _.id === "A1") || B[0], J = e.segments.map((_, P) => {
        var Q;
        return {
          id: _.id || `clip_${P}_${_.startEpochMs || _.StartEpochMs}`,
          startEpochMs: _.startEpochMs ?? _.StartEpochMs ?? o,
          endEpochMs: _.endEpochMs ?? _.EndEpochMs ?? o + r,
          sourceStationId: _.sourceStationId ?? _.SourceStationId ?? (((Q = t[0]) == null ? void 0 : Q.id) || "station-0"),
          gain: _.gain ?? _.Gain ?? 1,
          channelMode: _.channelMode ?? _.ChannelMode ?? (D == null ? void 0 : D.channelMode) ?? "both",
          fadeInMs: _.fadeInMs ?? _.FadeInMs ?? 50,
          fadeOutMs: _.fadeOutMs ?? _.FadeOutMs ?? 50
        };
      });
      return [
        {
          ...D || {
            id: "A1",
            name: "Track A1",
            isMuted: !1,
            isSolo: !1,
            gain: 1,
            channelMode: "both"
          },
          clips: J
        }
      ];
    });
  }, [e, o, r, t]);
  const oe = o + l, U = o + n, Y = U + r, T = i.useCallback((B) => {
    if (!f) return;
    const D = [];
    B.forEach((J) => {
      J.isMuted || k || J.clips.forEach((_) => {
        D.push({
          startEpochMs: _.startEpochMs,
          endEpochMs: _.endEpochMs,
          sourceStationId: _.sourceStationId,
          gain: _.gain * J.gain,
          channelMode: _.channelMode || J.channelMode || "both",
          fadeInMs: _.fadeInMs ?? 50,
          fadeOutMs: _.fadeOutMs ?? 50
        });
      });
    }), D.sort((J, _) => J.startEpochMs - _.startEpochMs), f({ segments: D });
  }, [f, k]);
  i.useEffect(() => {
    let B = null;
    for (const D of j)
      if (!(D.isMuted || k)) {
        for (const J of D.clips)
          if (oe >= J.startEpochMs && oe <= J.endEpochMs) {
            const _ = t.find((P) => P.id === J.sourceStationId);
            B = {
              stationId: J.sourceStationId,
              stationName: _ ? _.displayName || _.hostname || _.id : J.sourceStationId,
              channelMode: J.channelMode || D.channelMode || "both",
              gain: J.gain * D.gain,
              isPlaying: ne.isPlaying
            };
            break;
          }
        if (B) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: B }));
  }, [j, k, oe, t, ne.isPlaying]), i.useEffect(() => {
    const B = () => {
      W.length !== 0 && (O((_) => {
        const P = _.map((Q) => ({
          ...Q,
          clips: Q.clips.filter((le) => !W.includes(le.id))
        }));
        return T(P), P;
      }), ee([]), b(null));
    }, D = (_) => {
      if (_.key === "Delete" || _.key === "Backspace") {
        const P = _.target;
        if (P.tagName === "INPUT" || P.tagName === "TEXTAREA" || P.isContentEditable) return;
        W.length > 0 && (_.preventDefault(), B());
      }
    }, J = () => B();
    return window.addEventListener("keydown", D), window.addEventListener("itb:studio-delete-selected", J), () => {
      window.removeEventListener("keydown", D), window.removeEventListener("itb:studio-delete-selected", J);
    };
  }, [W, T]);
  const H = i.useCallback(() => {
    O((B) => {
      const J = `A${B.length + 1}`, _ = {
        id: J,
        name: `Track ${J}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, P = [...B, _];
      return T(P), P;
    });
  }, [T]);
  i.useCallback((B) => {
    O((D) => {
      if (D.length <= 1) return D;
      const J = D.filter((_) => _.id !== B);
      return T(J), J;
    });
  }, [T]);
  const z = i.useCallback((B) => {
    O((D) => {
      const J = D.map((_) => _.id === B ? { ..._, isMuted: !_.isMuted } : _);
      return T(J), J;
    });
  }, [T]), xe = i.useCallback((B) => {
    O((D) => {
      var P;
      const J = (P = D.find((Q) => Q.id === B)) == null ? void 0 : P.isSolo, _ = D.map((Q) => ({
        ...Q,
        isSolo: Q.id === B ? !J : !1,
        isMuted: Q.id === B ? !1 : !J
      }));
      return T(_), _;
    });
  }, [T]), X = i.useCallback((B) => {
    const D = ["both", "sys", "mic"];
    O((J) => {
      const _ = J.map((P) => {
        if (P.id !== B) return P;
        const Q = P.channelMode || "both", le = D[(D.indexOf(Q) + 1) % D.length];
        return {
          ...P,
          channelMode: le,
          clips: P.clips.map((re) => ({ ...re, channelMode: le }))
        };
      });
      return T(_), _;
    });
  }, [T]), V = i.useCallback((B, D) => {
    const J = Math.max(0, Math.min(2, Number(D)));
    O((_) => {
      const P = _.map((Q) => Q.id === B ? { ...Q, gain: J } : Q);
      return T(P), P;
    }), Uh(J);
  }, [T]), K = i.useCallback((B, D) => {
    D && O((J) => {
      const _ = J.map((P) => {
        if (P.id !== B) return P;
        if (P.clips.length === 0) {
          const Q = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: o,
            endEpochMs: o + r,
            sourceStationId: D,
            gain: 1,
            channelMode: P.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...P, clips: [Q] };
        }
        return {
          ...P,
          clips: P.clips.map((Q) => ({ ...Q, sourceStationId: D }))
        };
      });
      return T(_), _;
    });
  }, [o, r, T]), ge = i.useCallback((B, D = null, J = null) => {
    var ze;
    const _ = D || ((ze = t[0]) == null ? void 0 : ze.id) || "station-0", P = J !== null ? J : oe, Q = Math.min(r, 6e4), le = P + Q, re = j.find((st) => st.id === B), we = (re == null ? void 0 : re.channelMode) || "both", Ee = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(P),
      endEpochMs: Math.round(le),
      sourceStationId: _,
      gain: 1,
      channelMode: we,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    O((st) => {
      const Je = st.map((pt) => pt.id === B ? {
        ...pt,
        clips: [...pt.clips, Ee].sort((ut, nt) => ut.startEpochMs - nt.startEpochMs)
      } : pt);
      return T(Je), Je;
    });
  }, [j, oe, r, t, T]), fe = i.useCallback((B, D = null) => {
    O((J) => {
      const _ = J.map((P) => {
        if (B && P.id !== B) return P;
        const Q = [];
        return P.clips.forEach((le) => {
          (!D || le.id === D || W.includes(le.id)) && oe > le.startEpochMs + 500 && oe < le.endEpochMs - 500 ? (Q.push({ ...le, endEpochMs: oe }), Q.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: oe,
            endEpochMs: le.endEpochMs,
            sourceStationId: le.sourceStationId,
            gain: le.gain,
            channelMode: le.channelMode || P.channelMode || "both",
            fadeInMs: le.fadeInMs ?? 50,
            fadeOutMs: le.fadeOutMs ?? 50
          })) : Q.push(le);
        }), { ...P, clips: Q };
      });
      return T(_), _;
    }), b(null);
  }, [oe, W, T]), ye = i.useCallback(() => {
    fe(null, null);
  }, [fe]);
  i.useEffect(() => {
    const B = (D) => {
      var J;
      if ((D.ctrlKey || D.metaKey) && (D.key === "k" || D.key === "K")) {
        if (["INPUT", "TEXTAREA", "SELECT"].includes((J = document.activeElement) == null ? void 0 : J.tagName)) return;
        D.preventDefault(), D.stopPropagation(), ye();
      }
    };
    return window.addEventListener("keydown", B), () => window.removeEventListener("keydown", B);
  }, [ye]);
  const De = i.useCallback((B, D) => {
    O((J) => {
      const _ = J.map((P) => P.id !== B ? P : {
        ...P,
        clips: P.clips.filter((Q) => Q.id !== D)
      });
      return T(_), _;
    }), b(null);
  }, [T]), Ce = i.useCallback((B, D, J) => {
    O((_) => {
      const P = _.map((Q) => Q.id !== B ? Q : {
        ...Q,
        clips: Q.clips.map((le) => le.id === D ? { ...le, sourceStationId: J } : le)
      });
      return T(P), P;
    }), b((_) => _ ? { ..._, stationId: J } : null);
  }, [T]), Ie = i.useCallback((B, D, J) => {
    const _ = Math.max(0, Math.min(2.5, Number(J)));
    S(_), O((P) => {
      const Q = P.map((le) => le.id !== B ? le : {
        ...le,
        clips: le.clips.map((re) => re.id === D ? { ...re, gain: _ } : re)
      });
      return T(Q), Q;
    }), Uh(_);
  }, [T]), Ze = i.useCallback((B, D, J, _) => {
    const P = Math.max(0, Math.min(1e4, Math.round(Number(_) || 0)));
    J === "in" ? p(P) : C(P), O((Q) => {
      const le = Q.map((re) => re.id !== B ? re : {
        ...re,
        clips: re.clips.map((we) => we.id === D ? J === "in" ? { ...we, fadeInMs: P } : { ...we, fadeOutMs: P } : we)
      });
      return T(le), le;
    }), b((Q) => Q ? J === "in" ? { ...Q, fadeInMs: P } : { ...Q, fadeOutMs: P } : null);
  }, [T]), Xe = i.useCallback((B, D) => {
    O((J) => {
      const _ = J.map((P) => {
        if (P.id !== B) return P;
        const Q = Math.max(0, Math.min(2, Math.round((P.gain + D) * 100) / 100));
        return { ...P, gain: Q };
      });
      return T(_), _;
    });
  }, [T]), Ht = i.useCallback((B, D, J) => {
    var ut, nt, tt, en;
    if (B.preventDefault(), B.stopPropagation(), B.button !== 0) return;
    const _ = j.find((_t) => _t.id === D), P = (ut = _ == null ? void 0 : _.clips) == null ? void 0 : ut.find((_t) => _t.id === J);
    if (!P) return;
    M.current = !0;
    const Q = B.clientX, le = P.startEpochMs, we = P.endEpochMs - le, Ee = B.currentTarget.closest(".track-surface") || B.currentTarget.closest(".audio-track-surface") || ((nt = v.current) == null ? void 0 : nt.querySelector(".track-surface")) || ((tt = v.current) == null ? void 0 : tt.querySelector(".audio-track-surface")) || ((en = v.current) == null ? void 0 : en.querySelector(".audio-lane-timeline"));
    if (!Ee) return;
    const ze = Ee.getBoundingClientRect();
    if (!ze || ze.width <= 0) return;
    let st = !1;
    const Je = (_t) => {
      const bt = _t.clientX - Q;
      Math.abs(bt) > 2 && (st = !0);
      const it = bt / ze.width * r;
      let mt = Math.round(le + it), gt = mt + we;
      const Dt = 12 / ze.width * r;
      Math.abs(mt - oe) <= Dt ? (mt = oe, gt = mt + we) : Math.abs(gt - oe) <= Dt && (gt = oe, mt = gt - we), mt < o && (mt = o, gt = mt + we), O((pn) => pn.map((Nt) => Nt.id !== D ? Nt : {
        ...Nt,
        clips: Nt.clips.map((tn) => tn.id === J ? { ...tn, startEpochMs: mt, endEpochMs: gt } : tn)
      }));
    }, pt = () => {
      window.removeEventListener("mousemove", Je), window.removeEventListener("mouseup", pt), M.current = !1, st && O((_t) => (T(_t), _t));
    };
    window.addEventListener("mousemove", Je), window.addEventListener("mouseup", pt);
  }, [j, r, oe, o, T]), Ot = i.useCallback((B, D, J, _) => {
    var pt, ut, nt;
    B.preventDefault(), B.stopPropagation();
    const P = B.clientX, Q = j.find((tt) => tt.id === D), le = Q == null ? void 0 : Q.clips.find((tt) => tt.id === J);
    if (!le) return;
    M.current = !0;
    const re = le.startEpochMs, we = le.endEpochMs, Ee = B.currentTarget.closest(".track-surface") || B.currentTarget.closest(".audio-track-surface") || ((pt = v.current) == null ? void 0 : pt.querySelector(".track-surface")) || ((ut = v.current) == null ? void 0 : ut.querySelector(".audio-track-surface")) || ((nt = v.current) == null ? void 0 : nt.querySelector(".audio-lane-timeline"));
    if (!Ee) return;
    const ze = Ee.getBoundingClientRect();
    if (!ze || ze.width <= 0) return;
    const st = (tt) => {
      const _t = (tt.clientX - P) / ze.width * r;
      O((bt) => bt.map((it) => it.id !== D ? it : {
        ...it,
        clips: it.clips.map((mt) => {
          if (mt.id !== J) return mt;
          if (_ === "start") {
            const gt = Math.min(we - 500, re + _t);
            return { ...mt, startEpochMs: Math.round(gt) };
          } else {
            const gt = Math.max(re + 500, we + _t);
            return { ...mt, endEpochMs: Math.round(gt) };
          }
        })
      }));
    }, Je = () => {
      window.removeEventListener("mousemove", st), window.removeEventListener("mouseup", Je), M.current = !1, O((tt) => (T(tt), tt));
    };
    window.addEventListener("mousemove", st), window.addEventListener("mouseup", Je);
  }, [j, r, T]), ft = i.useCallback((B, D, J) => {
    O((_) => {
      const P = _.map((Q) => Q.id !== B ? Q : {
        ...Q,
        clips: Q.clips.map((le) => le.id === D ? { ...le, channelMode: J } : le)
      });
      return T(P), P;
    }), b((_) => _ ? { ..._, channelMode: J } : null);
  }, [T]), G = i.useCallback((B, D) => {
    var we;
    const J = j.find((Ee) => Ee.id === B), _ = (we = J == null ? void 0 : J.clips) == null ? void 0 : we.find((Ee) => Ee.id === D);
    if (!_) return;
    const P = _.channelMode || J.channelMode || "both", Q = ["both", "sys", "mic"], le = (Q.indexOf(P) + 1) % Q.length, re = Q[le];
    ft(B, D, re);
  }, [j, ft]), Le = (B, D, J) => {
    B.preventDefault(), B.stopPropagation();
    const _ = 280, P = 390, Q = Math.max(16, Math.min(window.innerWidth - _ - 16, B.clientX - _ / 2));
    let le = B.clientY - P - 12;
    le < 80 && (le = Math.min(window.innerHeight - P - 16, B.clientY + 24)), S(J.gain || 1), p(J.fadeInMs ?? 50), C(J.fadeOutMs ?? 50), b({
      laneId: D,
      clipId: J.id,
      s: J.startEpochMs,
      e: J.endEpochMs,
      x: Q,
      y: le,
      stationId: J.sourceStationId,
      gain: J.gain || 1,
      channelMode: J.channelMode || "both",
      fadeInMs: J.fadeInMs ?? 50,
      fadeOutMs: J.fadeOutMs ?? 50
    });
  };
  return i.useEffect(() => {
    if (!N) return;
    const B = () => b(null), D = (J) => {
      J.key === "Escape" && b(null);
    };
    return window.addEventListener("click", B), window.addEventListener("keydown", D), () => {
      window.removeEventListener("click", B), window.removeEventListener("keydown", D);
    };
  }, [N]), i.useMemo(() => {
    if (k) return [];
    const B = j.some((_) => _.isSolo), D = j.filter((_) => B ? _.isSolo : !_.isMuted), J = [];
    return D.forEach((_) => {
      const P = ka[j.indexOf(_) % ka.length];
      _.clips.forEach((Q) => {
        J.push({
          ...Q,
          laneId: _.id,
          laneName: _.name,
          laneColor: P,
          effectiveChannelMode: Q.channelMode || _.channelMode || "both",
          effectiveGain: (Q.gain || 1) * (_.gain || 1)
        });
      });
    }), J.sort((_, P) => _.startEpochMs - P.startEpochMs);
  }, [j, k]), !t || t.length === 0 ? null : /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-tracks-wrapper", ref: v, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: k ? "🔇" : "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          j.length,
          " ",
          j.length === 1 ? "TRACK" : "TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: H,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-split-playhead",
            onClick: ye,
            title: `Split audio clips at playhead (${Et(oe, m, { includeSeconds: !0 })}) [Ctrl+K]`,
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "master-vu-readout", title: `Current Master Level: ${ne.db.toFixed(1)} dB`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: ne.db > -55 ? `${ne.db.toFixed(0)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "master-vu-bar-outer", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "master-vu-bar-inner",
              style: {
                width: `${Math.min(100, Math.max(0, (ne.peak || 0) * 100))}%`,
                background: ne.peak > 0.85 ? "#F43F5E" : ne.peak > 0.65 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${k ? "is-muted" : ""}`,
            onClick: () => g((B) => !B),
            title: k ? "Unmute Master Audio" : "Mute Master Audio",
            children: k ? "🔇 MUTED" : "🔊 MUTE"
          }
        )
      ] })
    ] }),
    j.map((B, D) => {
      var le;
      const J = ka[D % ka.length], _ = I === B.id, P = t.find((re) => {
        var we;
        return re.id === ((we = B.clips[0]) == null ? void 0 : we.sourceStationId);
      }) || t[0], Q = P ? P.displayName || P.hostname || P.id : ((le = t[0]) == null ? void 0 : le.displayName) || "Station";
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container audio-routing-track-container station-collapsed-track",
          children: [
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: "track-sidebar station-collapsed-sidebar audio-track-sidebar",
                style: { borderLeftColor: J },
                title: `Audio Track: ${B.name} • Station: ${Q} [${(B.channelMode || "both").toUpperCase()}]`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${B.isMuted || k ? "idle" : "online"}`, title: B.isMuted ? "Audio Muted" : "Audio Active" }),
                  /* @__PURE__ */ s.jsx("span", { className: "audio-lane-icon", title: "Audio Bus", children: B.isMuted || k ? "🔇" : "🔊" }),
                  /* @__PURE__ */ s.jsx("span", { className: "audio-lane-tag", style: { backgroundColor: J }, title: `Lane ${B.id}`, children: B.id }),
                  /* @__PURE__ */ s.jsx("div", { className: "audio-station-picker", title: "Change Audio Workstation Source", children: /* @__PURE__ */ s.jsx(
                    "select",
                    {
                      className: "audio-station-select",
                      value: (P == null ? void 0 : P.id) || "",
                      onChange: (re) => K(B.id, re.target.value),
                      title: "Select source workstation for audio track",
                      children: t.map((re) => /* @__PURE__ */ s.jsx("option", { value: re.id, children: re.displayName || re.hostname || re.id }, re.id))
                    }
                  ) }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `btn-channel-toggle mode-${B.channelMode || "both"}`,
                      onClick: () => X(B.id),
                      title: `Audio Channel: ${(B.channelMode || "both").toUpperCase()} (Click to toggle SYS \\ MIC \\ BOTH)`,
                      children: (B.channelMode || "both") === "both" ? "⚡ BOTH" : (B.channelMode || "both") === "sys" ? "💻 SYS" : "🎙️ MIC"
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "audio-gain-cluster", title: `Master Track Gain: ${Math.round(B.gain * 100)}%`, children: [
                    /* @__PURE__ */ s.jsx(
                      "input",
                      {
                        type: "range",
                        min: "0",
                        max: "2",
                        step: "0.05",
                        value: B.gain,
                        onChange: (re) => V(B.id, re.target.value),
                        className: "audio-gain-slider",
                        title: `Track Gain: ${Math.round(B.gain * 100)}%`
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "gain-pct-badge", children: [
                      Math.round(B.gain * 100),
                      "%"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-gain-nudge btn-gain-down",
                        onClick: () => Xe(B.id, -0.1),
                        title: "Decrease Gain (-10%) relative to other sources",
                        children: "-"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-gain-nudge btn-gain-up",
                        onClick: () => Xe(B.id, 0.1),
                        title: "Increase Gain (+10%) relative to other sources",
                        children: "+"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "audio-mute-solo-btns", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-audio-mute ${B.isMuted ? "is-active" : ""}`,
                        onClick: () => z(B.id),
                        title: B.isMuted ? "Unmute Track" : "Mute Track",
                        children: "M"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-audio-solo ${B.isSolo ? "is-active" : ""}`,
                        onClick: () => xe(B.id),
                        title: B.isSolo ? "Unsolo Track" : "Solo Track",
                        children: "S"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "btn-lane-split-razor",
                      onClick: (re) => {
                        re.stopPropagation(), fe(B.id, null);
                      },
                      title: `Split ${B.id} at playhead (${Et(oe, m, { includeSeconds: !0 })}) [Ctrl+K]`,
                      children: "✂️"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `track-surface audio-track-surface ${_ ? "is-drag-over" : ""}`,
                onClick: () => ee([]),
                onDragOver: (re) => {
                  re.preventDefault(), re.dataTransfer.dropEffect = "copy", I !== B.id && R(B.id);
                },
                onDragLeave: () => {
                  I === B.id && R(null);
                },
                onDrop: (re) => {
                  re.preventDefault(), R(null);
                  const we = re.dataTransfer.getData("text/station-id") || re.dataTransfer.getData("text/plain");
                  if (we) {
                    const Ee = re.currentTarget.getBoundingClientRect(), ze = Math.max(0, Math.min(1, (re.clientX - Ee.left) / Ee.width)), st = Math.round(U + ze * r);
                    ge(B.id, we, st);
                  }
                },
                onDoubleClick: (re) => {
                  var st;
                  const we = re.currentTarget.getBoundingClientRect(), Ee = Math.max(0, Math.min(1, (re.clientX - we.left) / we.width)), ze = Math.round(U + Ee * r);
                  ge(B.id, (st = t[0]) == null ? void 0 : st.id, ze);
                },
                children: [
                  B.clips.map((re) => {
                    const we = t.find((ze) => ze.id === re.sourceStationId), Ee = we ? we.displayName || we.hostname || we.id : re.sourceStationId;
                    return re.endEpochMs <= U || re.startEpochMs >= Y ? null : /* @__PURE__ */ s.jsx(
                      xy,
                      {
                        clip: re,
                        lane: B,
                        laneColor: J,
                        isSelected: W.includes(re.id),
                        onSelect: (ze) => {
                          ze.stopPropagation(), ze.ctrlKey || ze.metaKey ? ee(
                            (st) => st.includes(re.id) ? st.filter((Je) => Je !== re.id) : [...st, re.id]
                          ) : ee([re.id]);
                        },
                        onOpenMenu: (ze) => Le(ze, B.id, re),
                        onTrimDrag: (ze, st) => Ot(ze, B.id, re.id, st),
                        onClipMoveDrag: (ze) => Ht(ze, B.id, re.id),
                        onToggleChannelMode: () => G(B.id, re.id),
                        vpStartEpoch: U,
                        viewportDurationMs: r,
                        timeMode: m,
                        stationName: Ee
                      },
                      re.id
                    );
                  }),
                  B.clips.length === 0 && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "empty-lane-placeholder",
                      onClick: () => {
                        var re;
                        return ge(B.id, (re = t[0]) == null ? void 0 : re.id, oe);
                      },
                      title: "Click or drop workstation here to insert audio clip",
                      children: /* @__PURE__ */ s.jsxs("span", { children: [
                        "＋ CLICK OR DRAG WORKSTATION HERE (",
                        B.name,
                        ")"
                      ] })
                    }
                  )
                ]
              }
            )
          ]
        },
        B.id
      );
    }),
    N && Ps.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: N.x, top: N.y },
          onClick: (B) => B.stopPropagation(),
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-close",
                  onClick: () => b(null),
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE WORKSTATION" }),
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((B) => {
                const D = B.id === N.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${D ? "is-selected" : ""}`,
                    onClick: () => Ce(N.laneId, N.clipId, B.id),
                    children: B.displayName || B.hostname || B.id
                  },
                  B.id
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
                    className: `btn-channel-chip mode-both ${N.channelMode === "both" ? "is-selected" : ""}`,
                    onClick: () => ft(N.laneId, N.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${N.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => ft(N.laneId, N.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${N.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => ft(N.laneId, N.clipId, "mic"),
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
                  Math.round(E * 100),
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
                  value: E,
                  onChange: (B) => Ie(N.laneId, N.clipId, B.target.value),
                  className: "menu-gain-slider"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME FADE IN / FADE OUT" }),
                /* @__PURE__ */ s.jsxs("span", { className: "fade-val", children: [
                  w,
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
                      value: w,
                      onChange: (B) => Ze(N.laneId, N.clipId, "in", B.target.value),
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
                      onChange: (B) => Ze(N.laneId, N.clipId, "out", B.target.value),
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
                  onClick: () => fe(N.laneId, N.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => De(N.laneId, N.clipId),
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
  ] });
}
function vy({
  canvasLayoutTimeline: e,
  activeKfIndex: t = 0,
  onSelectKeyframe: n,
  onAddKeyframeAtEpoch: r,
  onDeleteKeyframe: o,
  onUpdateKeyframeEpoch: l,
  onUpdateKeyframeTransition: a,
  onUpdateKeyframeClockPosition: c,
  viewportStartMs: u = 0,
  viewportDurationMs: d = 36e5,
  baseEpochMs: y = 0,
  totalDurationMs: m = 36e5,
  playheadMs: f = 0,
  inPointMs: v = 0,
  outPointMs: M = 36e5,
  timeMode: j = "LOCAL"
}) {
  const O = i.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [k, g] = i.useState(null), [N, b] = i.useState(null), [E, S] = i.useState(!1), w = y + f, p = y + u, $ = p + d, C = i.useCallback((I) => {
    if (!O || I < 0 || I >= O.length) return;
    const R = O[I];
    R && (n && n(I, R.timestampEpochMs), b(I), S(!1));
  }, [O, n]);
  i.useEffect(() => {
    const I = (R) => {
      R.target.tagName === "INPUT" || R.target.tagName === "TEXTAREA" || R.target.isContentEditable || (R.key === "[" || R.altKey && R.key === "ArrowLeft" ? (R.preventDefault(), t > 0 && C(t - 1)) : (R.key === "]" || R.altKey && R.key === "ArrowRight") && (R.preventDefault(), t < O.length - 1 && C(t + 1)));
    };
    return window.addEventListener("keydown", I), () => window.removeEventListener("keydown", I);
  }, [t, O, C]), i.useEffect(() => {
    if (N === null) return;
    const I = (ne) => {
      ne.key === "Escape" && b(null);
    }, R = (ne) => {
      !ne.target.closest(".kf-inspector-popover") && !ne.target.closest(".kf-marker-diamond") && !ne.target.closest(".btn-row-settings") && b(null);
    };
    return window.addEventListener("keydown", I), window.addEventListener("mousedown", R), () => {
      window.removeEventListener("keydown", I), window.removeEventListener("mousedown", R);
    };
  }, [N]), i.useEffect(() => {
    if (!E) return;
    const I = (R) => {
      !R.target.closest(".kf-quick-jump-dropdown") && !R.target.closest(".kf-count-pill") && S(!1);
    };
    return window.addEventListener("mousedown", I), () => window.removeEventListener("mousedown", I);
  }, [E]);
  const W = (I) => {
    const R = I.currentTarget.getBoundingClientRect(), ne = I.clientX - R.left, se = Math.max(0, Math.min(1, ne / R.width)), oe = Math.round(p + se * d);
    r && r(oe);
  }, ee = (I, R, ne) => {
    if (I.button !== 0) return;
    I.stopPropagation(), I.preventDefault();
    const se = I.clientX, oe = ne.timestampEpochMs, U = ne.id || `kf_${R}_${oe}`, Y = I.currentTarget.closest(".track-surface");
    if (!Y) return;
    let T = !1;
    g({
      idx: R,
      kfId: U,
      startClientX: se,
      initialEpoch: oe,
      currentEpoch: oe
    });
    const H = (xe) => {
      const X = xe.clientX - se;
      Math.abs(X) > 3 && (T = !0);
      const V = Y.getBoundingClientRect(), K = X / V.width * d;
      let ge = Math.round(oe + K);
      ge = Math.max(y, Math.min(y + m, ge));
      const fe = y + v, ye = y + M, De = 14 / V.width * d;
      Math.abs(ge - w) <= De ? ge = w : Math.abs(ge - fe) <= De ? ge = fe : Math.abs(ge - ye) <= De && (ge = ye), g((Ce) => Ce ? { ...Ce, currentEpoch: ge } : null);
    }, z = (xe) => {
      window.removeEventListener("mousemove", H), window.removeEventListener("mouseup", z), g(null);
      const X = Y.getBoundingClientRect(), K = (xe.clientX - se) / X.width * d;
      let ge = Math.round(oe + K);
      ge = Math.max(y, Math.min(y + m, ge));
      const fe = y + v, ye = y + M, De = 14 / X.width * d;
      Math.abs(ge - w) <= De ? ge = w : Math.abs(ge - fe) <= De ? ge = fe : Math.abs(ge - ye) <= De && (ge = ye), T ? (l && l(U, ge), n && n(R, ge)) : (n && n(R, oe), b((Ce) => Ce === R ? null : R));
    };
    window.addEventListener("mousemove", H), window.addEventListener("mouseup", z);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `canvas-keyframe-track-row ${N !== null || E ? "has-active-popover" : ""}`, children: [
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
              I.stopPropagation(), C(t - 1);
            },
            title: "Jump to Previous Keyframe ([ or Alt+Left)",
            children: "◀"
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `kf-count-pill ${E ? "is-active" : ""}`,
            onClick: (I) => {
              I.stopPropagation(), S((R) => !R);
            },
            title: "Keyframe Navigator: Click to inspect and jump across keyframes",
            children: [
              /* @__PURE__ */ s.jsx("span", { children: O.length > 0 ? `KF ${t + 1}/${O.length}` : "0 KF" }),
              /* @__PURE__ */ s.jsx("span", { className: "pill-caret", children: "▾" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-kf-nav btn-next-kf",
            disabled: t >= O.length - 1,
            onClick: (I) => {
              I.stopPropagation(), C(t + 1);
            },
            title: "Jump to Next Keyframe (] or Alt+Right)",
            children: "▶"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-kf-nav btn-del-current-kf",
            disabled: t <= 0 || O.length <= 1,
            onClick: (I) => {
              I.stopPropagation(), t > 0 && o && (o(t), b(null));
            },
            title: t > 0 ? `Delete Current Keyframe #${t + 1}` : "Root Keyframe 1 cannot be deleted",
            children: "🗑"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (I) => {
            I.stopPropagation(), r && r(w);
          },
          title: "Add layout keyframe at playhead position (+ / K)",
          children: "+ KF"
        }
      ),
      E && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "kf-quick-jump-dropdown",
          onClick: (I) => I.stopPropagation(),
          onMouseDown: (I) => I.stopPropagation(),
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "dropdown-header", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "dropdown-title", children: [
                "KEYFRAME NAVIGATOR (",
                O.length,
                ")"
              ] }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-close-dropdown",
                  onClick: () => S(!1),
                  title: "Close",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "dropdown-list", children: O.map((I, R) => {
              var z, xe, X;
              const ne = R === t, se = Et(I.timestampEpochMs, j, { includeSeconds: !0 }), oe = Math.max(0, (I.timestampEpochMs - y) / 1e3).toFixed(1), U = I.utcClockPosition || ((z = I.layout) == null ? void 0 : z.utcClockPosition) || "top-right", Y = cu(U), T = ((X = (xe = I.layout) == null ? void 0 : xe.placements) == null ? void 0 : X.length) || 0, H = R === 0 ? "Root" : `${I.transitionType || "smooth"} (${I.transitionDurationSec ?? 0.5}s)`;
              return /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `kf-jump-row ${ne ? "is-active" : ""}`,
                  onClick: () => C(R),
                  title: `Seek to Keyframe #${R + 1} at ${se}`,
                  children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-idx", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "diamond-mini", children: "❖" }),
                      /* @__PURE__ */ s.jsxs("span", { className: "idx-num", children: [
                        "#",
                        R + 1
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-time", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "time-val", children: se }),
                      /* @__PURE__ */ s.jsxs("span", { className: "offset-val", children: [
                        "+",
                        oe,
                        "s"
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-meta", children: [
                      /* @__PURE__ */ s.jsxs("span", { className: "meta-badge clock-badge", title: "UTC Clock Position", children: [
                        "⏱️ ",
                        Y
                      ] }),
                      /* @__PURE__ */ s.jsx("span", { className: "meta-badge trans-badge", title: "Transition", children: H }),
                      /* @__PURE__ */ s.jsxs("span", { className: "meta-badge feeds-badge", title: "Feeds on canvas", children: [
                        "🖥️ ",
                        T
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-action", children: [
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-row-settings",
                          onClick: (V) => {
                            V.stopPropagation(), C(R);
                          },
                          title: "View & Edit Keyframe Settings",
                          children: "⚙"
                        }
                      ),
                      R > 0 && /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-row-delete",
                          onClick: (V) => {
                            V.stopPropagation(), o && (o(R), N === R && b(null));
                          },
                          title: `Delete Keyframe #${R + 1}`,
                          children: "🗑"
                        }
                      )
                    ] })
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
        onClick: W,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          O.map((I, R) => {
            var ye, De, Ce, Ie, Ze, Xe, Ht, Ot, ft;
            const ne = (k == null ? void 0 : k.idx) === R, se = ne ? k.currentEpoch : I.timestampEpochMs;
            if (se < p - 5e4 || se > $ + 5e4) return null;
            const oe = (se - p) / d * 100;
            if (oe < -2 || oe > 102) return null;
            const U = R === t, Y = N === R && !ne, T = oe < 15, H = oe > 85, z = T ? "align-left" : H ? "align-right" : "align-center", xe = Et(se, j, { includeSeconds: !0 }), X = `${I.transitionType || "smooth"} (${I.transitionDurationSec ?? 0.5}s)`, V = Math.max(0, (se - y) / 1e3).toFixed(1), K = I.utcClockPosition || ((ye = I.layout) == null ? void 0 : ye.utcClockPosition) || "top-right", ge = cu(K), fe = ((Ce = (De = I.layout) == null ? void 0 : De.placements) == null ? void 0 : Ce.length) || 0;
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${U ? "is-active" : ""} ${ne ? "is-dragging" : ""} ${Y ? "has-active-popover" : ""}`,
                style: { left: `${oe}%` },
                onMouseDown: (G) => ee(G, R, I),
                onContextMenu: (G) => {
                  G.preventDefault(), G.stopPropagation(), O.length > 1 && o && o(R);
                },
                title: `Keyframe #${R + 1} at ${xe} (+${V}s) • ${X} • Clock: ${ge} • Feeds: ${fe}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  ne && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: xe }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      V,
                      "s"
                    ] }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-clock-pos", children: [
                      "⏱️ ",
                      ge
                    ] })
                  ] }),
                  Y && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `kf-inspector-popover ${z}`,
                      onClick: (G) => G.stopPropagation(),
                      onMouseDown: (G) => G.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-nav",
                              disabled: R <= 0,
                              onClick: (G) => {
                                G.stopPropagation(), C(R - 1);
                              },
                              title: "Jump to Previous Keyframe ([ or Alt+Left)",
                              children: "◀"
                            }
                          ),
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            R + 1,
                            " of ",
                            O.length
                          ] }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-nav",
                              disabled: R >= O.length - 1,
                              onClick: (G) => {
                                G.stopPropagation(), C(R + 1);
                              },
                              title: "Jump to Next Keyframe (] or Alt+Right)",
                              children: "▶"
                            }
                          ),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: xe }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (G) => {
                                G.stopPropagation(), b(null);
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
                              /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((G) => /* @__PURE__ */ s.jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-dur-choice ${(I.transitionDurationSec ?? 0.5) === G ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(R, { transitionDurationSec: G }),
                                  children: [
                                    G,
                                    "s"
                                  ]
                                },
                                G
                              )) })
                            ] })
                          ] }) : /* @__PURE__ */ s.jsxs("div", { className: "kf-root-notice-bar", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-root-tag", children: "ROOT KEYFRAME" }),
                            /* @__PURE__ */ s.jsx("span", { className: "kf-root-desc", children: "Base layout governing cut origin (t = 0)" })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row kf-layout-summary-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "ACTIVE FEEDS & COMPOSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-layout-summary-box", children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "summary-header", children: [
                                /* @__PURE__ */ s.jsxs("span", { className: "summary-res", children: [
                                  "📺 ",
                                  ((Ie = I.layout) == null ? void 0 : Ie.width) || 1920,
                                  "×",
                                  ((Ze = I.layout) == null ? void 0 : Ze.height) || 1080
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "summary-count", children: [
                                  "🖥️ ",
                                  ((Ht = (Xe = I.layout) == null ? void 0 : Xe.placements) == null ? void 0 : Ht.length) || 0,
                                  " Screens"
                                ] })
                              ] }),
                              ((ft = (Ot = I.layout) == null ? void 0 : Ot.placements) == null ? void 0 : ft.length) > 0 ? /* @__PURE__ */ s.jsx("div", { className: "summary-feed-tags", children: I.layout.placements.map((G, Le) => /* @__PURE__ */ s.jsx(
                                "span",
                                {
                                  className: "feed-tag",
                                  title: `${G.stationId} (${G.displayId || "mon-0"}) • Dim: ${G.width}×${G.height} • Pos: (${G.x}, ${G.y})`,
                                  children: G.label || `${G.stationId} (${G.displayId || "mon-0"})`
                                },
                                Le
                              )) }) : /* @__PURE__ */ s.jsx("span", { className: "no-feeds-hint", children: "No feeds placed on canvas in this keyframe" })
                            ] })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-footer", children: [
                            !U && /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-kf-seek",
                                onClick: (G) => {
                                  G.stopPropagation(), C(R);
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
                                onClick: (G) => {
                                  G.stopPropagation(), o && o(R), b(null);
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
function Ny({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: o = 0,
  inPointMs: l = 0,
  outPointMs: a = 36e5,
  onStartDrag: c
}) {
  const u = ($) => !r || r <= 0 ? "0%" : `${($ - n) / r * 100}%`, d = (l - n) / r * 100, y = (a - n) / r * 100, m = (o - n) / r * 100, f = m >= -0.2 && m <= 100.2, v = Math.max(0, Math.min(100, m)), M = Math.max(0, d), j = Math.min(100, y), O = Math.max(0, j - M), k = ($) => (C) => {
    C.preventDefault(), C.stopPropagation(), typeof c == "function" && c($, C);
  }, g = d < 1.5, N = y > 98.5, b = d <= 0.2 && d >= -0.2, E = y >= 99.8 && y <= 100.2, S = m >= -0.2 && m < 3.5, w = m > 96.5 && m <= 100.2, p = i.useMemo(() => Et(e + o, t), [e, o, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    O > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${M}%`, width: `${O}%` },
        onMouseDown: k("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${g ? "flipped" : ""} ${b ? "at-edge" : ""}`,
        style: { left: u(l) },
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
        className: `marker out-marker ${N ? "flipped" : ""} ${E ? "at-edge" : ""}`,
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
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${S ? "edge-left" : ""} ${w ? "edge-right" : ""}`, children: p }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const ky = fi.memo(Ny);
function wy({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: o
}) {
  const l = i.useRef(null);
  if (i.useEffect(() => {
    if (!e) return;
    const m = (f) => {
      f.key === "Escape" && o && o();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e, o]), !e) return null;
  const a = 210, c = 150, u = Math.min(e.x, window.innerWidth - a - 12), d = Math.min(e.y, window.innerHeight - c - 12), y = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: l,
      className: "timeline-context-menu",
      style: { top: d, left: u },
      onClick: (m) => m.stopPropagation(),
      onContextMenu: (m) => m.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "header-tag", children: "TIMELINE POSITION" }),
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: Et(t + e.targetMs, n) })
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
  return Ps.createPortal(y, document.body);
}
function jy({
  isRangeValid: e,
  onExport: t,
  isEstimating: n,
  estimateData: r,
  formatEstimateSize: o,
  stationsCount: l = 0
}) {
  const a = () => {
    if (l === 0) return "Select stations to enable export";
    if (!e) return "Select a valid IN/OUT range to export";
    if (!r) return "Export Synchronized Multi-Track Clip (Ctrl+E)";
    const c = o(r.estimatedFileSizeBytes), u = r.removedGlobalGapsCount > 0 ? ` • ${r.removedGlobalGapsCount} global gap(s) skipped` : "";
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
            o(r.estimatedFileSizeBytes)
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
const Cy = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function Ey({
  stationIdsKey: e,
  inPointMs: t,
  outPointMs: n,
  baseEpochMs: r,
  onEstimateLoaded: o
}) {
  const [l, a] = i.useState(null), [c, u] = i.useState(!1), d = i.useRef(o);
  return i.useEffect(() => {
    d.current = o;
  }, [o]), i.useEffect(() => {
    if (!e || n <= t || !r) {
      a(null);
      return;
    }
    const y = new AbortController();
    u(!0);
    const m = setTimeout(async () => {
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
          const M = await v.json();
          a(M), d.current && d.current(M);
        }
      } catch (f) {
        f.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", f);
      } finally {
        u(!1);
      }
    }, 350);
    return () => {
      clearTimeout(m), y.abort();
    };
  }, [e, t, n, r]), { estimateData: l, isEstimating: c, formatEstimateSize: Cy };
}
function Sy({
  viewportDurationMs: e,
  totalDurationMs: t,
  playheadMs: n,
  setPlayheadMs: r,
  inPointMs: o,
  setInPointMs: l,
  outPointMs: a,
  setOutPointMs: c,
  viewportStartMs: u,
  setViewportStartMs: d,
  getMsFromClientX: y,
  minimapRef: m
}) {
  const [f, v] = i.useState(null), [M, j] = i.useState(null), O = (k, g) => {
    v(k), j({
      target: k,
      startX: g.clientX,
      initialPlayhead: n,
      initialIn: o,
      initialOut: a,
      initialViewportStart: u
    });
  };
  return i.useEffect(() => {
    if (!f) return;
    const k = e * 0.015, g = (b) => {
      if (f === "minimap-viewport" && (m != null && m.current)) {
        const S = m.current.getBoundingClientRect(), p = Math.max(0, Math.min(b.clientX - S.left, S.width)) / S.width * t, $ = Math.max(0, Math.min(p - e / 2, t - e));
        d($);
        return;
      }
      const E = y(b.clientX);
      if (f === "playhead") {
        let S = E;
        Math.abs(S - o) <= k ? S = o : Math.abs(S - a) <= k && (S = a), r(Math.max(0, Math.min(t, S)));
      } else if (f === "in") {
        const S = a - 1e3;
        l(Math.max(0, Math.min(E, S)));
      } else if (f === "out") {
        const S = o + 1e3;
        c(Math.min(t, Math.max(E, S)));
      } else if (f === "range" && M) {
        const S = E - y(M.startX), w = M.initialOut - M.initialIn;
        let p = M.initialIn + S, $ = M.initialOut + S;
        p < 0 ? (p = 0, $ = w) : $ > t && ($ = t, p = t - w), l(p), c($);
      }
    }, N = () => {
      v(null), j(null);
    };
    return window.addEventListener("mousemove", g), window.addEventListener("mouseup", N), () => {
      window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", N);
    };
  }, [
    f,
    M,
    y,
    o,
    a,
    n,
    t,
    e,
    r,
    l,
    c,
    d,
    m
  ]), { draggingTarget: f, handleStartDrag: O };
}
const hr = 4, mo = 230, hl = 58;
function jm({
  stations: e = [],
  activeStationId: t,
  onSelectActiveStation: n,
  onStationContextMenu: r,
  onDeselectStation: o,
  stationAutoDirectorMap: l = {},
  onToggleStationAutoDirector: a,
  baseEpochMs: c = 0,
  timeMode: u = "LOCAL",
  totalDurationMs: d = 36e5,
  zoomLevel: y = 1,
  onZoomChange: m,
  onZoomReset: f,
  playheadMs: v = 0,
  setPlayheadMs: M,
  inPointMs: j = 0,
  setInPointMs: O,
  outPointMs: k = 36e5,
  setOutPointMs: g,
  onExport: N,
  recordingSegments: b = {},
  movieBoundaries: E,
  viewportStartMs: S = 0,
  onViewportStartChange: w,
  onEstimateLoaded: p,
  onFitRange: $,
  onJumpViewportTo: C,
  keystrokeMode: W = "BURN_IN",
  onChangeKeystrokeMode: ee,
  keystrokes: I = [],
  showKeystrokes: R = !1,
  showRulerKeystrokes: ne = !1,
  onToggleRulerKeystrokes: se,
  _onSplitDirectorSegment: oe,
  _onChangeDirectorSegmentDisplay: U,
  _onResetDirectorSegmentToAuto: Y,
  audioRoutingPlan: T,
  onSplitAudioSegment: H,
  onChangeAudioSegmentStation: z,
  onChangeAudioSegmentGain: xe,
  onFollowVisualFeed: X,
  isAutoFollowAudio: V,
  canvasLayoutTimeline: K,
  activeKfIndex: ge = 0,
  onSelectKeyframe: fe,
  onAddKeyframeAtEpoch: ye,
  onDeleteKeyframe: De,
  onUpdateKeyframeEpoch: Ce,
  onUpdateKeyframeTransition: Ie,
  onUpdateKeyframeClockPosition: Ze,
  onToggleDisplayOnCanvas: Xe,
  onUpdateAudioPlan: Ht
}) {
  var Ue, kt;
  const [Ot, ft] = i.useState(null), [G, Le] = i.useState(0), [B, D] = i.useState(null), [J, _] = i.useState(!0), P = (de) => {
    var ue, je, Fe;
    return ((de == null ? void 0 : de.displays) || (de == null ? void 0 : de.Displays) || ((ue = de == null ? void 0 : de.displayTopology) == null ? void 0 : ue.displays) || ((je = de == null ? void 0 : de.DisplayTopology) == null ? void 0 : je.Displays) || ((Fe = de == null ? void 0 : de.topology) == null ? void 0 : Fe.displays) || []).length;
  }, [Q, le] = i.useState(() => {
    var de;
    return e.length === 1 && P(e[0]) > 1 ? (de = e[0]) == null ? void 0 : de.id : null;
  });
  i.useEffect(() => {
    var de;
    if (e.length === 1 && !Q && ((de = e[0]) != null && de.id) && P(e[0]) > 1)
      le(e[0].id);
    else if (Q) {
      const te = e.find((ue) => ue.id === Q);
      (!te || P(te) <= 1) && le(null);
    }
  }, [e, Q]);
  const re = i.useRef(null), we = i.useRef(null), Ee = d / Math.max(1, y), ze = Math.ceil(e.length / hr) || 1, st = i.useMemo(() => {
    const de = G * hr;
    return e.slice(de, de + hr);
  }, [e, G]);
  i.useEffect(() => {
    if (!t && !Q) return;
    const de = Q || t, te = e.findIndex((ue) => ue.id === de);
    if (te !== -1) {
      const ue = Math.floor(te / hr);
      ue !== G && Le(ue);
    }
  }, [t, Q, e, G]);
  const Je = ((Ue = K == null ? void 0 : K.keyframes) == null ? void 0 : Ue[ge]) || ((kt = K == null ? void 0 : K.keyframes) == null ? void 0 : kt[0]), pt = i.useMemo(() => {
    var de;
    return ((de = Je == null ? void 0 : Je.layout) == null ? void 0 : de.placements) || [];
  }, [Je]), ut = i.useMemo(() => e.find((de) => de.id === t) || null, [e, t]), nt = (E == null ? void 0 : E.globalFirstMs) ?? null, tt = (E == null ? void 0 : E.globalLastMs) ?? null, en = i.useMemo(() => (j > 500 || k < d - 500) && k - j >= 1e3, [j, k, d]), _t = i.useMemo(() => e.map((de) => de.id).sort().join(","), [e]), { estimateData: bt, isEstimating: it, formatEstimateSize: mt } = Ey({
    stationIdsKey: _t,
    inPointMs: j,
    outPointMs: k,
    baseEpochMs: c,
    onEstimateLoaded: p
  }), gt = i.useCallback((de) => {
    if (!re.current) return S;
    const te = re.current.getBoundingClientRect(), ue = te.left + mo, je = te.width - mo - hl;
    if (je <= 0) return S;
    const Fe = Math.max(0, Math.min(de - ue, je));
    return Math.round(S + Fe / je * Ee);
  }, [S, Ee]), { draggingTarget: Dt, handleStartDrag: pn } = Sy({
    viewportDurationMs: Ee,
    totalDurationMs: d,
    playheadMs: v,
    setPlayheadMs: M,
    inPointMs: j,
    setInPointMs: O,
    outPointMs: k,
    setOutPointMs: g,
    viewportStartMs: S,
    setViewportStartMs: w,
    getMsFromClientX: gt,
    minimapRef: we
  }), Nt = i.useRef(y);
  Nt.current = y;
  const tn = i.useRef(S);
  tn.current = S;
  const Gt = i.useRef(d);
  Gt.current = d;
  const He = i.useRef(v);
  He.current = v, i.useEffect(() => {
    const de = re.current;
    if (!de) return;
    const te = (ue) => {
      ue.preventDefault(), ue.stopPropagation();
      const je = ue.ctrlKey || ue.shiftKey, Fe = Nt.current, et = tn.current, rt = Gt.current, wt = He.current;
      if (je) {
        const at = Math.abs(ue.deltaX) > Math.abs(ue.deltaY) ? ue.deltaX : ue.deltaY;
        if (at === 0) return;
        const dt = rt / Math.max(1, Fe), Kt = Math.max(0, rt - dt), Ft = dt * 0.08 * (at > 0 ? 1 : -1);
        w == null || w(Math.max(0, Math.min(Kt, et + Ft)));
      } else {
        if (ue.deltaY === 0) return;
        const dt = ue.deltaY < 0 ? 1.25 : 0.8, Kt = Math.max(32, rt / 2e3), Ft = de.getBoundingClientRect(), Qt = Ft.left + mo, Jt = Ft.width - mo - hl;
        let xn = 0.5;
        if (Jt > 0)
          if (ue.clientX >= Qt && ue.clientX <= Ft.right - hl)
            xn = Math.max(0, Math.min(1, (ue.clientX - Qt) / Jt));
          else {
            const nn = rt / Math.max(1, Fe), _s = (wt - et) / nn;
            xn = _s >= 0 && _s <= 1 ? _s : 0.5;
          }
        const yn = Math.max(1, Math.min(Kt, Math.round(Fe * dt * 100) / 100));
        if (yn === Fe) return;
        const as = rt / Fe, Jn = rt / yn, ys = et + xn * as - xn * Jn, io = Math.max(0, rt - Jn);
        m == null || m(yn), w == null || w(Math.max(0, Math.min(io, ys)));
      }
    };
    return de.addEventListener("wheel", te, { passive: !1, capture: !0 }), () => de.removeEventListener("wheel", te, { capture: !0 });
  }, [m, w]);
  const pe = e.length > 0 && Math.abs(k - j) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: re,
      className: "timeline-board-root",
      onContextMenu: (de) => {
        var ue;
        de.preventDefault();
        const te = (ue = re.current) == null ? void 0 : ue.getBoundingClientRect();
        !te || de.clientX - te.left < mo || de.clientX > te.right - hl || D({ x: de.clientX, y: de.clientY, targetMs: Math.max(0, Math.min(d, gt(de.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            oy,
            {
              baseEpochMs: c,
              timeMode: u,
              totalDurationMs: d,
              inPointMs: j,
              setInPointMs: O,
              outPointMs: k,
              setOutPointMs: g
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                ly,
                {
                  minimapRef: we,
                  baseEpochMs: c,
                  timeMode: u,
                  totalDurationMs: d,
                  viewportStartMs: S,
                  viewportDurationMs: Ee,
                  zoomLevel: y,
                  inPointMs: j,
                  outPointMs: k,
                  playheadMs: v,
                  onStartDragMinimap: pn
                }
              ),
              /* @__PURE__ */ s.jsx(
                ay,
                {
                  earliestMediaMs: nt,
                  latestMediaMs: tt,
                  hasActiveCut: en,
                  onJumpToFirst: () => {
                    nt !== null && (M == null || M(nt), C == null || C(nt, "start"));
                  },
                  onJumpToLast: () => {
                    tt !== null && (M == null || M(tt), C == null || C(tt, "end"));
                  },
                  onContextualFit: () => {
                    en ? $ == null || $(j, k) : nt !== null && tt !== null && tt > nt ? $ == null || $(nt, tt) : f == null || f();
                  },
                  onResetZoom: f,
                  baseEpochMs: c,
                  timeMode: u,
                  keystrokeMode: W,
                  onChangeKeystrokeMode: ee,
                  showRulerKeystrokes: ne,
                  onToggleRulerKeystrokes: se
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              ry,
              {
                baseEpochMs: c,
                timeMode: u,
                viewportStartMs: S,
                viewportDurationMs: Ee,
                totalDurationMs: d,
                hoverMs: Ot,
                onHoverChange: ft,
                onSeek: (de) => M == null ? void 0 : M(de),
                inPointMs: j,
                outPointMs: k,
                earliestMediaMs: nt,
                movieBoundaries: E,
                stationHostname: (ut == null ? void 0 : ut.hostname) || (ut == null ? void 0 : ut.id) || (ut == null ? void 0 : ut.name),
                activeStationName: (ut == null ? void 0 : ut.displayName) || (ut == null ? void 0 : ut.hostname) || (ut == null ? void 0 : ut.name),
                stations: e,
                showKeystrokes: !!(ne ?? R),
                keystrokes: I,
                recordingSegments: b
              }
            ) })
          ] })
        ] }),
        ze > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: G === 0,
              onClick: () => Le((de) => Math.max(0, de - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            G * hr + 1,
            "–",
            Math.min(e.length, (G + 1) * hr),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: G >= ze - 1,
              onClick: () => Le((de) => Math.min(ze - 1, de + 1)),
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
            onMouseMove: (de) => {
              if (Dt || !re.current) return;
              const te = re.current.getBoundingClientRect();
              de.clientX >= te.left + mo && de.clientX <= te.right - hl ? ft(gt(de.clientX)) : ft(null);
            },
            onMouseLeave: () => !Dt && ft(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => _((de) => !de), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: J ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  J && ze > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: G === 0,
                        onClick: (de) => {
                          de.stopPropagation(), Le((te) => Math.max(0, te - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      G + 1,
                      "/",
                      ze,
                      " (",
                      G * hr + 1,
                      "–",
                      Math.min(e.length, (G + 1) * hr),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: G >= ze - 1,
                        onClick: (de) => {
                          de.stopPropagation(), Le((te) => Math.min(ze - 1, te + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !J && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => _(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (pt == null ? void 0 : pt.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var Fe, et, rt, wt, at;
                    const de = (pt == null ? void 0 : pt.find((dt) => dt.isPrimary || dt.isFocused)) || (pt == null ? void 0 : pt[0]), te = (de == null ? void 0 : de.stationId) || ((Fe = e[0]) == null ? void 0 : Fe.hostname) || ((et = e[0]) == null ? void 0 : et.id), ue = (de == null ? void 0 : de.displayId) || "mon-0";
                    let je = [];
                    if (pt && pt.length > 0) {
                      const dt = /* @__PURE__ */ new Map();
                      pt.forEach((Kt) => {
                        var Qt;
                        (b[Kt.stationId] || b[(Qt = Kt.stationId) == null ? void 0 : Qt.toLowerCase()] || []).forEach((Jt) => {
                          const xn = `${Jt.startEpochMs || Jt.start}_${Jt.endEpochMs || Jt.end}`;
                          dt.has(xn) || dt.set(xn, Jt);
                        });
                      }), je = Array.from(dt.values());
                    }
                    return je.length === 0 && (je = b[(rt = e[0]) == null ? void 0 : rt.id] || b[(wt = e[0]) == null ? void 0 : wt.hostname] || ((at = e[0]) == null ? void 0 : at.segments) || []), /* @__PURE__ */ s.jsx(
                      mu,
                      {
                        hostname: te,
                        displayId: ue,
                        activeSegments: je,
                        viewportStartMs: S,
                        viewportDurationMs: Ee,
                        baseEpochMs: c,
                        inPointMs: j,
                        outPointMs: k,
                        globalGaps: (bt == null ? void 0 : bt.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                J && (e.length > 0 ? st.map((de) => {
                  const te = !!(t && de.id === t), ue = Q === de.id, je = l ? l[de.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    fy,
                    {
                      station: de,
                      isExpanded: ue && P(de) > 1,
                      onToggleExpand: () => {
                        P(de) > 1 && le((Fe) => Fe === de.id ? null : de.id);
                      },
                      isAutoDirectorEnabled: je,
                      onToggleAutoDirector: a,
                      canvasPlacements: pt,
                      onToggleDisplayOnCanvas: Xe,
                      directorPlan: de.directorPlan,
                      isActive: te,
                      onSelect: () => n == null ? void 0 : n(de.id),
                      onStationContextMenu: r,
                      onDeselectStation: o,
                      viewportStartMs: S,
                      viewportDurationMs: Ee,
                      inPointMs: j,
                      outPointMs: k,
                      baseEpochMs: c,
                      segments: b[de.id] || b[de.hostname] || de.segments || [],
                      recordingSegments: b,
                      globalGaps: (bt == null ? void 0 : bt.removedGlobalGaps) || []
                    },
                    de.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  yy,
                  {
                    audioPlan: T,
                    stations: e,
                    viewportStartMs: S,
                    viewportDurationMs: Ee,
                    baseEpochMs: c,
                    playheadMs: v,
                    onSplitSegment: H,
                    onChangeSegmentStation: z,
                    onChangeSegmentGain: xe,
                    onFollowVisualFeed: X,
                    isAutoFollow: V,
                    timeMode: u,
                    onUpdateAudioPlan: Ht
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  vy,
                  {
                    canvasLayoutTimeline: K,
                    activeKfIndex: ge,
                    onSelectKeyframe: fe,
                    onAddKeyframeAtEpoch: ye,
                    onDeleteKeyframe: De,
                    onUpdateKeyframeEpoch: Ce,
                    onUpdateKeyframeTransition: Ie,
                    onUpdateKeyframeClockPosition: Ze,
                    viewportStartMs: S,
                    viewportDurationMs: Ee,
                    baseEpochMs: c,
                    totalDurationMs: d,
                    playheadMs: v,
                    inPointMs: j,
                    outPointMs: k,
                    timeMode: u
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                jy,
                {
                  isRangeValid: pe,
                  onExport: N,
                  isEstimating: it,
                  estimateData: bt,
                  formatEstimateSize: mt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          ky,
          {
            baseEpochMs: c,
            timeMode: u,
            viewportStartMs: S,
            viewportDurationMs: Ee,
            playheadMs: v,
            inPointMs: j,
            outPointMs: k,
            onStartDrag: pn
          }
        ),
        /* @__PURE__ */ s.jsx(
          wy,
          {
            contextMenu: B,
            baseEpochMs: c,
            timeMode: u,
            onAction: (de) => {
              B && (de === "playhead" ? M == null || M(B.targetMs) : de === "in" ? O == null || O(Math.max(0, Math.min(B.targetMs, k - 1e3))) : de === "out" && (g == null || g(Math.min(d, Math.max(B.targetMs, j + 1e3)))), D(null));
            },
            onClose: () => D(null)
          }
        )
      ]
    }
  );
}
function by({ station: e, isSelected: t, onToggle: n, meta: r }) {
  const o = e.displayName || e.hostname || e.name || "", l = r == null ? void 0 : r.isLoading;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => n(e.id),
      className: `hub-station-card ${t ? "is-selected" : ""} ${l ? "is-syncing" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-top", children: [
          /* @__PURE__ */ s.jsx("div", { className: "monitor-icon-wrap", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
            /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
          ] }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-top-badges", children: [
            /* @__PURE__ */ s.jsx("span", { className: `audio-pill ${l ? "loading" : r.hasAudio ? "has-audio" : "no-audio"}`, title: r.audioChannels, children: l ? /* @__PURE__ */ s.jsx("span", { children: "CHECKING..." }) : r.hasAudio ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
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
              const a = !l && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), c = !l && (r == null ? void 0 : r.coveragePct) >= 100 && !(r != null && r.hasGaps);
              let u, d;
              return l ? (u = "SCANNING...", d = "is-loading") : a ? (u = "NO RECORDINGS", d = "gap-warning") : c ? (u = "100% COVERAGE", d = "full-archived") : (u = r != null && r.hasGaps ? "GAPS DETECTED" : `${r == null ? void 0 : r.coveragePct}% COVERAGE`, d = "gap-warning"), /* @__PURE__ */ s.jsxs("span", { className: `status-indicator-badge ${d}`, children: [
                /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                u
              ] });
            })()
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "card-info", children: [
          /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", minWidth: 0, marginBottom: "8px" }, children: [
            /* @__PURE__ */ s.jsx("span", { className: "station-card-title", children: o }),
            e.hostname && o.toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { style: { fontSize: "10px", color: "#94a3b8", background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: "4px", whiteSpace: "nowrap" }, title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "recording-specs-grid", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "RECORDED" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value highlight", children: l ? "..." : r.recordedDuration })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "COVERAGE" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value", children: l ? "..." : `${r.coveragePct}%` })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "VIDEO FEED" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value", children: l ? "Scanning..." : `${r.resolution} • ${r.fps}fps` })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "SIZE" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value", children: l ? "..." : r.fileSize })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "card-gap-track-container", title: l ? "Scanning chunks..." : `Recorded: ${r.recordedDuration} (${r.coveragePct}%)`, children: l ? /* @__PURE__ */ s.jsx("div", { className: "track-loading-shimmer" }) : /* @__PURE__ */ s.jsx("div", { className: "card-gap-track", children: r.segments.map((a, c) => /* @__PURE__ */ s.jsx(
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
function My({ station: e, isSelected: t, onToggle: n, meta: r }) {
  const o = e.displayName || e.hostname || e.name || "", l = r == null ? void 0 : r.isLoading;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => n(e.id),
      className: `hub-table-row ${t ? "is-selected" : ""} ${l ? "is-syncing" : ""}`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-check", children: /* @__PURE__ */ s.jsx("div", { className: `row-checkbox ${t ? "checked" : ""}`, children: t && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-name", children: /* @__PURE__ */ s.jsxs("span", { className: "station-name-text", title: e.hostname ? `Physical: ${e.hostname}` : o, children: [
          o,
          e.hostname && o.toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsxs("small", { style: { fontSize: "10px", color: "#94a3b8", marginLeft: "6px" }, children: [
            "(",
            e.hostname,
            ")"
          ] })
        ] }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-audio", children: /* @__PURE__ */ s.jsx("span", { className: `badge-pill ${l ? "audio-loading" : r.hasAudio ? "audio-on" : "audio-off"}`, title: r.audioChannels, children: l ? "..." : r.hasAudio ? "AUDIO" : "MUTED" }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-coverage", children: /* @__PURE__ */ s.jsx("span", { className: "coverage-text", children: l ? "Scanning..." : `${r.recordedDuration} (${r.coveragePct}%)` }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-gaps-bar", children: /* @__PURE__ */ s.jsx("div", { className: "row-gap-track", title: l ? "Scanning segments..." : `Coverage: ${r.coveragePct}%`, children: l ? /* @__PURE__ */ s.jsx("div", { className: "row-loading-shimmer" }) : r.segments.map((a, c) => /* @__PURE__ */ s.jsx(
          "div",
          {
            className: `track-seg ${a.type === "rec" ? "rec" : "gap"}`,
            style: { left: `${a.startPct}%`, width: `${a.widthPct}%` }
          },
          c
        )) }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-specs", children: /* @__PURE__ */ s.jsx("span", { className: "specs-text", children: l ? "..." : `${r.resolution} • ${r.fps}fps` }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-size", children: /* @__PURE__ */ s.jsx("span", { className: "size-text", children: l ? "..." : r.fileSize }) })
      ]
    }
  );
}
function Iy({ station: e, isSelected: t, onToggle: n, meta: r }) {
  var u, d;
  const o = e.displayName || e.hostname || e.name || "", l = r == null ? void 0 : r.isLoading, a = !l && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), c = l ? "loading" : a ? "critical" : ((u = r.trafficStatus) == null ? void 0 : u.level) || (r.hasGaps ? "critical" : "optimal");
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
      /* @__PURE__ */ s.jsx("div", { className: `status-dot ${c}`, title: l ? "Scanning..." : (d = r.trafficStatus) == null ? void 0 : d.label }),
      /* @__PURE__ */ s.jsxs("span", { className: "hostname", title: e.hostname ? `Physical: ${e.hostname}` : o, children: [
        o,
        e.hostname && o.toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsxs("small", { className: "physical-host-sub", children: [
          " (",
          e.hostname,
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "mini-row-tags", children: [
      r.hasAudio && !l && /* @__PURE__ */ s.jsx("span", { className: "mini-audio-icon", title: r.audioChannels, children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }) }) }),
      /* @__PURE__ */ s.jsx("span", { className: `coverage-pct ${c}`, children: l ? "..." : `${r.coveragePct}%` })
    ] })
  ] });
}
function Ty({
  searchTerm: e,
  onSearchChange: t,
  sortAlpha: n,
  onToggleSort: r,
  effectiveTabs: o,
  selectedTabId: l,
  onSelectTab: a,
  isLoadingTabs: c,
  allStations: u,
  selectedStationIds: d,
  filterMode: y,
  onFilterModeChange: m,
  filteredCount: f,
  selectedInTabCount: v,
  unselectedInTabCount: M,
  activeTabName: j,
  onSelectAllInScope: O,
  onClearInScope: k,
  viewMode: g = "grid",
  onViewModeChange: N,
  isDrawerMode: b = !1
}) {
  const [E, S] = i.useState(!1), w = y !== "all", p = !j || j.toLowerCase() === "all", $ = p ? "Select All" : `Select ${j}`, C = p ? "Clear All" : `Clear ${j}`;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-filter-bar-root ${b ? "is-drawer-compact" : ""}`, children: [
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
            onChange: (W) => t(W.target.value)
          }
        )
      ] }),
      b && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${E ? "open" : ""} ${w ? "has-filter" : ""}`,
          onClick: () => S(!E),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            w && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !b && N && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${g === "grid" ? "active" : ""}`,
            onClick: () => N("grid"),
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
            onClick: () => N("table"),
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
    o.length > 1 && (b ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: l,
          onChange: (W) => a(W.target.value),
          children: o.map((W) => {
            const ee = W.id === "all" ? u.map((R) => R.id) : W.stationIds || [], I = ee.filter((R) => d.includes(R)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: W.id, children: [
              W.name,
              " (",
              I,
              "/",
              ee.length,
              ")"
            ] }, W.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: O, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: k, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        c && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: o.map((W) => {
        const ee = l === W.id, I = W.id === "all" ? u.map((se) => se.id) : W.stationIds || [], R = I.length, ne = I.filter((se) => d.includes(se)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${ee ? "active" : ""}`,
            onClick: () => a(W.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: W.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${ne > 0 ? "has-selected" : ""}`, children: [
                ne,
                "/",
                R
              ] })
            ]
          },
          W.id
        );
      }) })
    ] })),
    (!b || E) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${b ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "all" ? "active" : ""}`,
            onClick: () => m("all"),
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
            onClick: () => m("selected"),
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
            onClick: () => m("unselected"),
            children: [
              "Unsel (",
              M,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "gaps" ? "active" : ""}`,
            onClick: () => m("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "audio" ? "active" : ""}`,
            onClick: () => m("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !b && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: O, children: [
          "+ ",
          $
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: k, children: [
          "✕ ",
          C
        ] })
      ] })
    ] })
  ] });
}
function $y({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: o,
  onPageSizeChange: l,
  viewMode: a = "table"
}) {
  if (r === 0) return null;
  const c = Math.min((e - 1) * n + 1, r), u = Math.min(e * n, r), d = a === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], y = t <= 1, m = (f) => {
    if (f === n) return !0;
    const v = Math.min(n, r), M = Math.min(f, r), j = Math.ceil(r / n), O = Math.ceil(r / f);
    return v !== M || j !== O;
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
          onClick: () => o(1),
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
          onClick: () => o(e - 1),
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
          onClick: () => o(e + 1),
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
          onClick: () => o(t),
          title: "Last Page",
          children: "»"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "pagination-size-selector", children: [
      /* @__PURE__ */ s.jsx("span", { className: "selector-label", children: "PER PAGE:" }),
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((f) => {
        const v = n === f, M = !m(f);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${v ? "active" : ""} ${M ? "redundant-disabled" : ""}`,
            disabled: M,
            onClick: () => l(f),
            title: M ? `All stations already fit on screen (Total: ${r})` : `Show ${f} per page`,
            children: f
          },
          f
        );
      }) })
    ] })
  ] });
}
function Ay({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: o = 3
}) {
  const [l, a] = i.useState(!1), c = i.useRef(null);
  i.useEffect(() => {
    const f = (v) => {
      c.current && !c.current.contains(v.target) && a(!1);
    };
    return l && document.addEventListener("mousedown", f), () => document.removeEventListener("mousedown", f);
  }, [l]);
  const u = i.useMemo(() => {
    const f = new Map(t.map((v) => [v.id, v]));
    return e.map((v) => f.get(v) || { id: v, hostname: `Station ${v}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = u.slice(0, o), y = u.slice(o), m = y.length > 0;
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
      d.map((f) => {
        const v = f.displayName || f.hostname || f.name || f.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: v, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: v }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (M) => {
                M.stopPropagation(), n(f.id);
              },
              title: `Remove ${v}`,
              children: "✕"
            }
          )
        ] }, f.id);
      }),
      m && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-container", ref: c, children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-overflow-pill ${l ? "active" : ""}`,
            onClick: () => a(!l),
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
        l && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-menu upward", children: [
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
const Cm = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Kh(e, t, n = Cm) {
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
function Ry(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = t % 60, l = (a) => String(a).padStart(2, "0");
  return `${l(n)}:${l(r)}:${l(o)}`;
}
function Ly(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function Oy(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Cm) {
  const { baseEpochMs: o, durationMs: l } = n, a = !!(e != null && e.hasAudio), c = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), u = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, y = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? Ly(e.bytesRecorded) : "--");
  if (!l || l <= 0 || !Array.isArray(t) || t.length === 0) {
    const w = Kh(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: a,
      audioChannels: c,
      resolution: u,
      fps: d,
      fileSize: y,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: w,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const m = o, f = o + l, v = [];
  for (const w of t) {
    const p = Math.max(w.startEpoch, m), $ = Math.min(w.endEpoch, f);
    $ > p && v.push({ startEpoch: p, endEpoch: $ });
  }
  v.sort((w, p) => w.startEpoch - p.endEpoch);
  const M = [];
  for (const w of v)
    if (M.length === 0)
      M.push({ ...w });
    else {
      const p = M[M.length - 1];
      w.startEpoch <= p.endEpoch + 1e3 ? p.endEpoch = Math.max(p.endEpoch, w.endEpoch) : M.push({ ...w });
    }
  let j = 0;
  for (const w of M)
    j += w.endEpoch - w.startEpoch;
  const O = l > 0 ? j / l * 100 : 0, k = O > 0 && O < 1 ? Number(O.toFixed(1)) : Math.min(100, Math.round(O)), g = [];
  let N = m, b = 0;
  for (const w of M) {
    if (w.startEpoch > N + 2e3) {
      const C = (w.startEpoch - N) / l * 100, W = (N - m) / l * 100;
      g.push({
        type: "gap",
        startPct: Math.max(0, W),
        widthPct: Math.min(100, C)
      }), b++;
    }
    const p = (w.endEpoch - w.startEpoch) / l * 100, $ = (w.startEpoch - m) / l * 100;
    g.push({
      type: "rec",
      startPct: Math.max(0, $),
      widthPct: Math.min(100, p)
    }), N = w.endEpoch;
  }
  if (N < f - 2e3) {
    const w = (f - N) / l * 100, p = (N - m) / l * 100;
    g.push({
      type: "gap",
      startPct: Math.max(0, p),
      widthPct: Math.min(100, w)
    }), b++;
  }
  const E = b > 0 || k < 100, S = Kh(k, E, r);
  return {
    coveragePct: k,
    recordedDuration: Ry(j),
    totalRecordedMs: j,
    hasAudio: a,
    audioChannels: c,
    resolution: u,
    fps: d,
    fileSize: y,
    hasGaps: E,
    gapsCount: b,
    trafficStatus: S,
    segments: g.length > 0 ? g : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const Dy = Object.freeze([]), Py = 12;
function _y({
  isOpen: e,
  onToggle: t,
  onClose: n,
  allStations: r = [],
  selectedStationIds: o = [],
  onToggleStation: l,
  onUpdateSelections: a,
  isInitialSetup: c,
  isLoadingStations: u = !1,
  isLoadingSegments: d = !1,
  onApply: y,
  onOpenRangeModal: m,
  systemTabs: f = Dy,
  recordingSegments: v = {},
  baseEpochMs: M = 0,
  durationMs: j = 0
}) {
  const [O, k] = i.useState([]), [g, N] = i.useState("all"), [b, E] = i.useState(""), [S, w] = i.useState(!0), [p, $] = i.useState("all"), [C, W] = i.useState(null), [ee, I] = i.useState(!1), [R, ne] = i.useState(15), [se, oe] = i.useState(8), [U, Y] = i.useState(1), T = i.useRef(!1), H = i.useRef(null), z = u && r.length === 0, xe = r.length === 0 && !u;
  let X = "is-closed";
  c || xe || z ? X = "is-full-width" : e && (X = "is-open"), i.useLayoutEffect(() => {
    const D = () => {
      if (!H.current) return;
      const _ = H.current.clientHeight;
      if (_ <= 0) return;
      const P = H.current.querySelector(".station-row, .hub-table-row"), Q = P ? P.offsetHeight : 40;
      if (Q > 0) {
        const re = Math.floor(_ / Q) - 2, Ee = [5, 10, 15, 20, 25, 30].filter((ze) => ze <= re).pop() || 5;
        ne(Ee);
      }
      const le = H.current.clientWidth;
      if (le > 0) {
        const Ee = Math.max(1, Math.floor((le + 12) / 252)), st = Math.max(1, Math.floor((_ + 12) / (175 + 12))), Je = Math.max(Ee * st, Ee);
        oe(Je);
      }
    };
    D(), window.addEventListener("resize", D);
    const J = new ResizeObserver(D);
    return H.current && J.observe(H.current), () => {
      window.removeEventListener("resize", D), J.disconnect();
    };
  }, [C, r.length]), i.useEffect(() => {
    if (f && f.length > 0) {
      k(f);
      return;
    }
    if (T.current || !e && !c) return;
    T.current = !0;
    let D = !0;
    return (async () => {
      I(!0);
      try {
        const _ = await fetch("/api/v1/dashboard/tabs");
        if (_.ok && D) {
          const P = await _.json();
          Array.isArray(P) && k(P);
        }
      } catch (_) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", _);
      } finally {
        D && I(!1);
      }
    })(), () => {
      D = !1;
    };
  }, [e, c, f]);
  const V = i.useMemo(() => {
    const D = O.length > 0 ? O : f;
    if (D && D.length > 0) {
      const J = D.map((_) => {
        const P = _.hostnames || _.assignedHostnames || _.stations || _.stationIds || [], Q = r.filter((le) => {
          const re = (le.hostname || le.name || "").trim().toLowerCase();
          return P.some((we) => typeof we == "string" ? we.trim().toLowerCase() === re || re.includes(we.trim().toLowerCase()) : (we.hostname || we.name || "").trim().toLowerCase() === re);
        }).map((le) => le.id);
        return {
          id: String(_.id || _.tabId || _.name),
          name: _.name || "Tab",
          stationIds: Q
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((_) => _.id) },
        ...J.filter((_) => _.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((J) => J.id) }];
  }, [O, f, r]), K = i.useMemo(() => V.find((D) => D.id === g) || V[0], [V, g]), ge = i.useMemo(() => !K || K.id === "all" ? r.map((D) => D.id) : K.stationIds || [], [K, r]), fe = i.useMemo(() => !v || Object.keys(v).length === 0 ? r.filter((D) => D.isLoaded || D.segments && D.segments.length > 0).length : r.filter((D) => v[D.id] !== void 0 || D.isLoaded).length, [r, v]), ye = i.useMemo(() => !!(d || u && r.length > 0 || r.length > 0 && fe < r.length && Object.keys(v).length > 0), [d, u, r.length, fe, v]), De = i.useMemo(() => {
    const D = /* @__PURE__ */ new Map(), J = { baseEpochMs: M, durationMs: j };
    for (const _ of r) {
      const Q = !(v && v[_.id] !== void 0 || _.isLoaded === !0 || _.segments && _.segments.length > 0) && (ye || u || d), le = v && v[_.id] || _.segments || [], re = Oy(_, le, J);
      D.set(_.id, {
        ...re,
        hasAudio: _.hasAudio !== void 0 ? _.hasAudio : re == null ? void 0 : re.hasAudio,
        audioLabel: _.audioLabel || (_.hasAudio ? "AAC" : (re == null ? void 0 : re.audioLabel) || "NONE"),
        audioChannels: _.audioChannels ? _.audioChannels === 1 ? "Mono" : "Stereo" : re == null ? void 0 : re.audioChannels,
        feedSpec: _.feedSpec || (re == null ? void 0 : re.feedSpec) || `${_.resolution || "1080p"} • ${_.fps || 30}fps`,
        resolution: _.resolution || (re == null ? void 0 : re.resolution) || "1080p",
        fps: _.fps || (re == null ? void 0 : re.fps) || 30,
        isLoading: Q
      });
    }
    return D;
  }, [r, v, M, j, ye, u, d]), Ce = i.useMemo(() => r.filter((D) => {
    const J = De.get(D.id), _ = v && v[D.id] && v[D.id].length > 0 || D.segments && D.segments.length > 0, P = J && (J.coveragePct > 0 || J.totalRecordedMs > 0), Q = typeof D.recordingsCount == "number" && D.recordingsCount > 0;
    return J && !J.isLoading ? P || _ : Q || _;
  }), [r, De, v]), Ie = i.useMemo(() => Ce.filter((D) => {
    if (K.id !== "all" && !ge.includes(D.id) || !(D.displayName || D.hostname || D.name || "").toLowerCase().includes(b.toLowerCase())) return !1;
    const _ = o.includes(D.id), P = De.get(D.id);
    return p === "selected" ? _ : p === "unselected" ? !_ : p === "gaps" ? P == null ? void 0 : P.hasGaps : p === "audio" ? P == null ? void 0 : P.hasAudio : !0;
  }).sort((D, J) => S ? (D.displayName || D.hostname || "").localeCompare(J.displayName || J.hostname || "") : 0), [Ce, K, ge, b, p, o, S, De]), Ze = i.useMemo(() => C !== null ? C : Ie.length > Py ? "table" : "grid", [C, Ie.length]), Xe = Ze === "table" ? R : se, Ht = Math.max(1, Math.ceil(Ie.length / Xe));
  i.useEffect(() => {
    Y(1);
  }, [g, b, p, Ze]), i.useEffect(() => {
    U > Ht && Y(Ht);
  }, [Ht, U]);
  const Ot = i.useMemo(() => {
    if (X !== "is-full-width") return Ie;
    const D = (U - 1) * Xe;
    return Ie.slice(D, D + Xe);
  }, [Ie, U, Xe, X]), ft = () => {
    if (!a) return;
    const D = K.id === "all" ? Ie.map((J) => J.id) : ge;
    a(Array.from(/* @__PURE__ */ new Set([...o, ...D])));
  }, G = () => {
    if (!a) return;
    const D = new Set(
      K.id === "all" ? Ie.map((J) => J.id) : ge
    );
    a(o.filter((J) => !D.has(J)));
  }, Le = ge.filter((D) => o.includes(D)).length, B = Ie.filter((D) => o.includes(D.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${X}`, children: [
    X !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => X === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            o.length,
            "/",
            r.length,
            ")",
            ye && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              fe,
              "/",
              r.length
            ] })
          ] })
        ] }),
        X === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      X === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: ft,
            disabled: Ie.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                Ie.length,
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
            onClick: G,
            disabled: B === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                B,
                ")"
              ] })
            ]
          }
        )
      ] }),
      ye && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? fe / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: z ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : xe ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: m, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: X === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      X === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      X === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${ye ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: ye ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: ye ? `ANALYZING TIMELINE ARCHIVES • ${fe} OF ${Ce.length} STATIONS SYNCED (${Ce.length > 0 ? Math.min(100, Math.round(fe / Ce.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${Ce.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: ye ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(fe / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Ty,
        {
          searchTerm: b,
          onSearchChange: E,
          sortAlpha: S,
          onToggleSort: () => w(!S),
          effectiveTabs: V,
          selectedTabId: g,
          onSelectTab: (D) => {
            N(D), W(null);
          },
          isLoadingTabs: ee,
          allStations: Ce,
          selectedStationIds: o,
          filterMode: p,
          onFilterModeChange: $,
          filteredCount: Ie.length,
          selectedInTabCount: Le,
          unselectedInTabCount: ge.length - Le,
          activeTabName: K.name,
          onSelectAllInScope: ft,
          onClearInScope: G,
          viewMode: Ze,
          onViewModeChange: X === "is-full-width" ? W : null,
          isDrawerMode: X !== "is-full-width"
        }
      ),
      X === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: ft,
              disabled: Ie.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  Ie.length,
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
              onClick: G,
              disabled: B === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  B,
                  ")"
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "bulk-actions-right", children: /* @__PURE__ */ s.jsxs("span", { className: "bulk-stats-label", children: [
          "Active Selection: ",
          /* @__PURE__ */ s.jsx("strong", { children: o.length }),
          " / ",
          r.length,
          " Stations"
        ] }) })
      ] }),
      X === "is-full-width" && Ze === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: H,
          className: `station-list ${X === "is-full-width" ? Ze === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: Ot.map((D) => {
            const J = o.includes(D.id), _ = De.get(D.id);
            return X === "is-full-width" ? Ze === "grid" ? /* @__PURE__ */ s.jsx(
              by,
              {
                station: D,
                isSelected: J,
                onToggle: l,
                meta: _
              },
              D.id
            ) : /* @__PURE__ */ s.jsx(
              My,
              {
                station: D,
                isSelected: J,
                onToggle: l,
                meta: _
              },
              D.id
            ) : /* @__PURE__ */ s.jsx(
              Iy,
              {
                station: D,
                isSelected: J,
                onToggle: l,
                meta: _
              },
              D.id
            );
          })
        }
      ),
      X === "is-full-width" && /* @__PURE__ */ s.jsx(
        $y,
        {
          currentPage: U,
          totalPages: Ht,
          pageSize: Xe,
          totalItems: Ie.length,
          onPageChange: Y,
          onPageSizeChange: (D) => {
            Ze === "table" ? ne(D) : oe(D), Y(1);
          },
          viewMode: Ze
        }
      ),
      X === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Ay,
          {
            selectedStationIds: o,
            allStations: r,
            onToggleStation: l,
            onClearAll: () => a && a([]),
            maxVisible: 3
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-start-hero",
            disabled: o.length === 0,
            onClick: y,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "5 3 19 12 5 21 5 3" }) }),
              /* @__PURE__ */ s.jsx("span", { children: o.length === 0 ? "SELECT AT LEAST ONE STATION" : `START WORKSPACE (${o.length} SELECTED)` })
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
], Wy = [
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
function Vh({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: o = !0,
  className: l = ""
}) {
  const [a, c] = i.useState(e), [u, d] = i.useState(null), y = i.useRef(null), { h: m, m: f, s: v } = i.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const $ = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, $[0] || 0)),
      m: Math.min(59, Math.max(0, $[1] || 0)),
      s: Math.min(59, Math.max(0, $[2] || 0))
    };
  }, [e]), M = i.useMemo(() => m >= 12, [m]);
  i.useEffect(() => {
    c(e);
  }, [e]);
  const j = () => {
    const C = a.replace(/[^0-9:]/g, "").trim().split(":").filter((ne) => ne.length > 0);
    let W = 0, ee = 0, I = 0;
    C.length >= 1 && (W = Math.min(23, Math.max(0, parseInt(C[0], 10) || 0))), C.length >= 2 && (ee = Math.min(59, Math.max(0, parseInt(C[1], 10) || 0))), C.length >= 3 && o && (I = Math.min(59, Math.max(0, parseInt(C[2], 10) || 0)));
    const R = o ? `${Dn(W)}:${Dn(ee)}:${Dn(I)}` : `${Dn(W)}:${Dn(ee)}`;
    c(R), t && t(R, { h: W, m: ee, s: I });
  }, O = ($) => {
    let C = m;
    $ === "AM" && m >= 12 ? C = m - 12 : $ === "PM" && m < 12 && (C = m + 12);
    const W = o ? `${Dn(C)}:${Dn(f)}:${Dn(v)}` : `${Dn(C)}:${Dn(f)}`;
    c(W), t && t(W, { h: C, m: f, s: v });
  }, k = i.useCallback(($, C) => {
    if (!y.current) return null;
    const W = y.current.getBoundingClientRect(), ee = W.left + W.width / 2, I = W.top + W.height / 2, R = $.clientX - ee, ne = $.clientY - I;
    let se = Math.atan2(ne, R) * 180 / Math.PI + 90;
    if (se < 0 && (se += 360), C === "hours") {
      const oe = Math.round(se / 30) % 12;
      return M ? oe === 0 ? 12 : oe + 12 : oe === 0 ? 0 : oe;
    }
    return Math.round(se / 6) % 60;
  }, [M]), g = i.useCallback(($, C) => {
    let W = m, ee = f, I = v;
    $ === "hours" ? W = C : $ === "minutes" ? ee = C : $ === "seconds" && (I = C);
    const R = o ? `${Dn(W)}:${Dn(ee)}:${Dn(I)}` : `${Dn(W)}:${Dn(ee)}`;
    c(R), t && t(R, { h: W, m: ee, s: I });
  }, [m, f, v, o, t]), N = ($, C) => {
    C.preventDefault(), C.stopPropagation(), d($);
    const W = k(C, $);
    W !== null && g($, W);
  };
  i.useEffect(() => {
    if (!u) return;
    const $ = (W) => {
      const ee = k(W, u);
      ee !== null && g(u, ee);
    }, C = () => {
      d(null);
    };
    return window.addEventListener("pointermove", $), window.addEventListener("pointerup", C), () => {
      window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", C);
    };
  }, [u, k, g]);
  const b = i.useMemo(() => m % 12 * 30, [m]), E = i.useMemo(() => f % 60 * 6, [f]), S = i.useMemo(() => v % 60 * 6, [v]), w = M ? Wy : Fy, p = i.useMemo(() => {
    const $ = [];
    for (let C = 0; C < 60; C++) {
      const W = (C * 6 - 90) * (Math.PI / 180), ee = C % 5 === 0, I = 104, R = ee ? 93 : 98;
      $.push({
        index: C,
        x1: 110 + R * Math.cos(W),
        y1: 110 + R * Math.sin(W),
        x2: 110 + I * Math.cos(W),
        y2: 110 + I * Math.sin(W),
        isMajor: ee
      });
    }
    return $;
  }, []);
  return /* @__PURE__ */ s.jsxs("div", { className: `tactical-24h-clock-picker ${r} ${l} ${u ? "is-dragging" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "clock-header-shelf", children: [
      /* @__PURE__ */ s.jsx("span", { className: "shelf-label", children: n }),
      /* @__PURE__ */ s.jsxs("div", { className: "shelf-controls-group", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "am-pm-toggle-pill", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${M ? "" : "active"}`,
              onClick: () => O("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${M ? "active" : ""}`,
              onClick: () => O("PM"),
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
            onBlur: j,
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: p.map(($) => /* @__PURE__ */ s.jsx(
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
          w.map(($) => {
            const C = ($.angle - 90) * (Math.PI / 180), W = 76, ee = 110 + W * Math.cos(C), I = 110 + W * Math.sin(C), R = m === $.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: ee,
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
              transform: `rotate(${b} 110 110)`,
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
                    onPointerDown: ($) => N("hours", $)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${u === "minutes" ? "dragging" : ""}`,
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
                    onPointerDown: ($) => N("minutes", $)
                  }
                )
              ]
            }
          ),
          o && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${u === "seconds" ? "dragging" : ""}`,
              transform: `rotate(${S} 110 110)`,
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
                    onPointerDown: ($) => N("seconds", $)
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
const wa = 7 * 24 * 60 * 60 * 1e3, qt = (e) => String(e).padStart(2, "0");
function Uy({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: o,
  timeMode: l = "LOCAL",
  onTimeModeChange: a
}) {
  const [c, u] = i.useState(""), [d, y] = i.useState(""), [m, f] = i.useState("00:00:00"), [v, M] = i.useState("00:00:00"), [j, O] = i.useState(() => /* @__PURE__ */ new Date()), [k, g] = i.useState(null), [N, b] = i.useState([]), [E, S] = i.useState(!1), [w, p] = i.useState(""), [$, C] = i.useState([]), W = i.useMemo(() => new Set($), [$]), [ee, I] = i.useState(1), [R, ne] = i.useState(2), [se, oe] = i.useState(null);
  i.useEffect(() => {
    if (!e) return;
    let G = !0;
    return (async () => {
      try {
        const B = await fetch(`/api/v1/extractor-advanced/recording-dates?timeMode=${l}`);
        if (B.ok) {
          const D = await B.json();
          G && Array.isArray(D) && C(D);
        }
      } catch (B) {
        console.warn("[MasterTimeRangeModal] Failed to fetch recording dates:", B);
      }
    })(), () => {
      G = !1;
    };
  }, [e, l]);
  const U = i.useCallback(() => {
    try {
      const G = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (G) {
        const Le = JSON.parse(G);
        Array.isArray(Le) && b(Le);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((G) => G.ok ? G.json() : null).then((G) => {
      Array.isArray(G) && G.length > 0 && b(G);
    }).catch(() => {
    });
  }, []);
  i.useEffect(() => {
    if (!e) return;
    U();
    let G = n == null ? void 0 : n.startEpochMs, Le = n == null ? void 0 : n.endEpochMs;
    if (!G || isNaN(G))
      if (n != null && n.start) {
        const J = String(n.start).trim();
        if (J.includes("T")) {
          const [_, P] = J.split("T");
          G = Vr(_, P.substring(0, 8), l);
        } else if (J.includes(" ")) {
          const [_, P] = J.split(" ");
          G = Vr(_, P.substring(0, 8), l);
        } else
          G = Date.now() - 24 * 3600 * 1e3;
      } else
        Le = Date.now(), G = Le - 24 * 3600 * 1e3;
    if (!Le || isNaN(Le))
      if (n != null && n.end) {
        const J = String(n.end).trim();
        if (J.includes("T")) {
          const [_, P] = J.split("T");
          Le = Vr(_, P.substring(0, 8), l);
        } else if (J.includes(" ")) {
          const [_, P] = J.split(" ");
          Le = Vr(_, P.substring(0, 8), l);
        } else
          Le = (G || Date.now()) + 24 * 3600 * 1e3;
      } else
        Le = (G || Date.now()) + 24 * 3600 * 1e3;
    oe(null);
    const B = Jr(G, l), D = Jr(Le, l);
    u(`${B.year}-${qt(B.month)}-${qt(B.day)}`), y(`${D.year}-${qt(D.month)}-${qt(D.day)}`), f(`${qt(B.hour)}:${qt(B.minute)}:${qt(B.second)}`), M(`${qt(D.hour)}:${qt(D.minute)}:${qt(D.second)}`), O(new Date(Date.UTC(B.year, B.month - 1, 1)));
  }, [e, n, l, U]);
  const Y = i.useCallback(() => {
    c && !d && y(c);
  }, [c, d]), T = d || c, H = i.useMemo(() => c ? `${c}T${m}` : "", [c, m]), z = i.useMemo(() => T ? `${T}T${v}` : "", [T, v]), xe = i.useMemo(() => {
    const G = {};
    return N.forEach((Le) => {
      const B = Le.startTime || Le.start, D = Le.endTime || Le.end || B;
      if (!B) return;
      const J = String(B).substring(0, 10), _ = String(D).substring(0, 10), [P, Q, le] = J.split("-").map(Number), [re, we, Ee] = _.split("-").map(Number);
      if (isNaN(P) || isNaN(Q) || isNaN(le) || isNaN(re) || isNaN(we) || isNaN(Ee)) return;
      let ze = new Date(Date.UTC(P, Q - 1, le));
      const st = new Date(Date.UTC(re, we - 1, Ee));
      for (; ze.getTime() <= st.getTime(); ) {
        const Je = `${ze.getUTCFullYear()}-${qt(ze.getUTCMonth() + 1)}-${qt(ze.getUTCDate())}`;
        G[Je] || (G[Je] = []), G[Je].push(Le), ze.setUTCDate(ze.getUTCDate() + 1);
      }
    }), G;
  }, [N]), X = async (G, Le) => {
    if (Le && Le.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const B = N.filter((D) => (D.id || D.startTime) !== G);
    b(B);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(B)), localStorage.setItem("itb_bookmarks", JSON.stringify(B)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: B }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${G}`, { method: "DELETE" });
    } catch {
    }
  }, V = (G) => {
    const Le = G.startTime || G.start, B = G.endTime || G.end;
    if (!Le || !B) return;
    const D = Le.substring(0, 10), J = Le.includes("T") ? Le.split("T")[1].substring(0, 8) : "00:00:00", _ = B.substring(0, 10), P = B.includes("T") ? B.split("T")[1].substring(0, 8) : "23:59:59";
    u(D), y(_), f(J), M(P);
    const [Q, le] = D.split("-").map(Number);
    O(new Date(Date.UTC(Q, le - 1, 1))), S(!1);
  }, K = (G) => {
    o ? (o(G), t && t()) : V(G);
  }, ge = i.useMemo(() => {
    if (l === "UTC" || !H.includes("T")) return { isAmbiguous: !1 };
    const [G, Le] = H.split("T");
    return ui(G, Le);
  }, [H, l]), fe = i.useMemo(() => {
    if (l === "UTC" || !z.includes("T")) return { isAmbiguous: !1 };
    const [G, Le] = z.split("T");
    return ui(G, Le);
  }, [z, l]), ye = i.useMemo(() => {
    if (!c || !T) return null;
    const G = Vr(c, m, l, ee), Le = Vr(T, v, l, R);
    return G === null || Le === null || isNaN(G) || isNaN(Le) ? null : { startEpoch: G, endEpoch: Le, durationMs: Le - G };
  }, [c, m, T, v, l, ee, R]), De = i.useMemo(() => !ye || ye.durationMs <= 0 ? [] : hm(ye.startEpoch, ye.endEpoch), [ye]), Ce = i.useMemo(() => {
    if (!ye || ye.durationMs <= 0) return "0h";
    const G = ye.durationMs / (1e3 * 60 * 60);
    return G >= 24 ? `${(G / 24).toFixed(1)}d (${G.toFixed(0)}h)` : `${G.toFixed(1)}h`;
  }, [ye]), Ie = i.useMemo(() => {
    const G = j.getUTCFullYear(), Le = j.getUTCMonth(), B = new Date(Date.UTC(G, Le, 1)).getUTCDay(), D = new Date(Date.UTC(G, Le + 1, 0)).getUTCDate(), J = [];
    for (let _ = 0; _ < B; _++) J.push(null);
    for (let _ = 1; _ <= D; _++) J.push(`${G}-${qt(Le + 1)}-${qt(_)}`);
    return J;
  }, [j]), Ze = (G) => {
    if (G) {
      if (oe(null), !c || c && d)
        u(G), y("");
      else if (c && !d)
        if (G < c)
          u(G), y("");
        else {
          const Le = (/* @__PURE__ */ new Date(c + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(G + "T00:00:00Z")).getTime() - Le > wa) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const D = new Date(Le + wa);
            y(`${D.getUTCFullYear()}-${qt(D.getUTCMonth() + 1)}-${qt(D.getUTCDate())}`);
          } else
            y(G);
        }
    }
  }, Xe = (G, Le) => {
    oe(Le);
    const B = Date.now(), D = B - G, J = Jr(D, l), _ = Jr(B, l);
    u(`${J.year}-${qt(J.month)}-${qt(J.day)}`), y(`${_.year}-${qt(_.month)}-${qt(_.day)}`), f(`${qt(J.hour)}:${qt(J.minute)}:${qt(J.second)}`), M(`${qt(_.hour)}:${qt(_.minute)}:${qt(_.second)}`), O(new Date(Date.UTC(J.year, J.month - 1, 1)));
  }, Ht = () => {
    if (Y(), !ye || isNaN(ye.startEpoch) || isNaN(ye.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (ye.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (ye.durationMs > wa) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: H,
      end: z,
      startEpochMs: ye.startEpoch,
      endEpochMs: ye.endEpoch,
      durationMs: ye.durationMs,
      timeMode: l
    }), t && t();
  }, Ot = i.useMemo(() => {
    if (!w.trim()) return N;
    const G = w.toLowerCase();
    return N.filter(
      (Le) => (Le.title || Le.name || "").toLowerCase().includes(G) || (Le.startTime || "").includes(G)
    );
  }, [N, w]);
  if (!e) return null;
  const ft = l === "UTC";
  return Ps.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (G) => G.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${ft ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: ft ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ft ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ft ? "active" : ""}`,
                  onClick: () => a("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${E ? "active" : ""}`,
                onClick: () => S(!E),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: N.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      De.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: De.map((G) => `${G.description} (${G.labelBefore} ➔ ${G.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${se === "7d" ? "active" : ""}`,
            onClick: () => Xe(7 * 24 * 3600 * 1e3, "7d"),
            children: [
              "7d Week Max ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${se === "3d" ? "active" : ""}`,
            onClick: () => Xe(3 * 24 * 3600 * 1e3, "3d"),
            children: [
              "3d Block ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${se === "24h" ? "active" : ""}`,
            onClick: () => Xe(24 * 3600 * 1e3, "24h"),
            children: [
              "24h Day ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${se === "8h" ? "active" : ""}`,
            onClick: () => Xe(8 * 3600 * 1e3, "8h"),
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
                value: w,
                onChange: (G) => p(G.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            Ot.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: Ot.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : Ot.map((G) => {
          var _;
          const Le = G.id || G.startTime, B = G.title || G.name || "Untitled Mission", D = (G.startTime || "").replace("T", " "), J = (G.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => V(G), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: B }),
                G.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  G.cutStationName
                ] }),
                ((_ = G.stationIds) == null ? void 0 : _.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  G.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                D,
                " ➔ ",
                J
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (P) => {
                    P.stopPropagation(), V(G);
                  },
                  children: "SET SCOPE"
                }
              ),
              o && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (P) => {
                    P.stopPropagation(), K(G);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (P) => X(Le, P),
                  children: "✕"
                }
              )
            ] })
          ] }, Le);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: j.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => O((G) => new Date(Date.UTC(G.getUTCFullYear(), G.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => O((G) => new Date(Date.UTC(G.getUTCFullYear(), G.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Ie.map((G, Le) => {
            if (!G) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${Le}`);
            const B = parseInt(G.split("-")[2], 10), D = G === c, J = G === (d || c), _ = d || k, P = c && _ && G > c && G < _, Q = xe[G], le = !!(Q && Q.length > 0), re = W.has(G);
            let we = "";
            return le && (we += `${Q.length} Bookmark(s) on this date`), re && (we += (we ? " • " : "") + "Recordings available"), /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${D ? "start-edge" : ""} ${J ? "end-edge" : ""} ${P ? "in-range" : ""} ${le ? "has-bookmark" : ""} ${re ? "has-recordings" : ""}`,
                onClick: () => Ze(G),
                onMouseEnter: () => !d && c && g(G),
                onMouseLeave: () => g(null),
                title: we || void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: B }),
                  re && /* @__PURE__ */ s.jsx("span", { className: "cal-cell-recording-dot", "aria-label": "Recordings available" }),
                  le && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Ee) => {
                        Ee.stopPropagation(), S(!0), p(G);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Q.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Q.length })
                      ]
                    }
                  )
                ]
              },
              G
            );
          }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "cal-indicators-legend", children: [
            /* @__PURE__ */ s.jsxs("span", { className: "legend-item recordings", children: [
              /* @__PURE__ */ s.jsx("span", { className: "legend-dot green" }),
              " Recordings"
            ] }),
            N.length > 0 && /* @__PURE__ */ s.jsxs("span", { className: "legend-item bookmarks", children: [
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
              /* @__PURE__ */ s.jsx("strong", { children: d || c || "--" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: Y, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Vh,
            {
              label: "START TIME (FROM)",
              value: m,
              onChange: (G) => {
                Y(), f(G), oe(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Vh,
            {
              label: "END TIME (TO)",
              value: v,
              onChange: (G) => {
                Y(), M(G), oe(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (ge.isAmbiguous || fe.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
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
                className: ee === 1 ? "active" : "",
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
                className: ee === 2 ? "active" : "",
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
        fe.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            fe.transition.labelBefore,
            " / ",
            fe.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: R === 1 ? "active" : "",
                onClick: () => ne(1),
                children: [
                  "1st Occurrence (",
                  fe.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: R === 2 ? "active" : "",
                onClick: () => ne(2),
                children: [
                  "2nd Occurrence (",
                  fe.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: ye && ye.durationMs > wa ? "#f43f5e" : "#22d3ee" }, children: Ce }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: De.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Ht, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Em = "extractor_incident_bookmarks_fallback", By = ["itb_studio_bookmarks", "itb_bookmarks", Em];
function Hy({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: o
}) {
  const l = o || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, c] = i.useState([]), [u, d] = i.useState(""), [y, m] = i.useState(!1), [f, v] = i.useState(!1), [M, j] = i.useState(null), [O, k] = i.useState(""), g = i.useCallback((I) => {
    By.forEach((R) => {
      try {
        localStorage.setItem(R, JSON.stringify(I));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: I }));
  }, []), N = i.useCallback(async () => {
    m(!0);
    try {
      const I = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (I.ok) {
        const R = await I.json(), ne = Array.isArray(R) ? R : [];
        c(ne), g(ne);
        return;
      }
    } catch (I) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", I);
    } finally {
      m(!1);
    }
    try {
      const I = localStorage.getItem(Em) || localStorage.getItem("itb_studio_bookmarks");
      I && c(JSON.parse(I));
    } catch {
    }
  }, [g]);
  if (i.useEffect(() => {
    e && N();
  }, [e, N]), !e) return null;
  const b = async () => {
    var X, V, K, ge, fe, ye;
    if (!u.trim() || f) return;
    const I = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((X = n == null ? void 0 : n.timeRange) != null && X.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), R = (n == null ? void 0 : n.inPointMs) ?? 0, ne = (n == null ? void 0 : n.outPointMs) ?? (((V = n == null ? void 0 : n.timeRange) == null ? void 0 : V.durationMs) || 0), se = (n == null ? void 0 : n.playheadMs) ?? R, oe = I + R, U = I + ne, Y = I + se, T = (n == null ? void 0 : n.selectedStationIds) || [], H = (n == null ? void 0 : n.selectedStationNames) || [], z = ((K = n == null ? void 0 : n.allStationIds) == null ? void 0 : K.length) > 0 ? n.allStationIds : T, xe = {
      title: u.trim(),
      startTime: ((ge = n == null ? void 0 : n.timeRange) == null ? void 0 : ge.start) || "",
      endTime: ((fe = n == null ? void 0 : n.timeRange) == null ? void 0 : fe.end) || "",
      baseEpochMs: I,
      timelineBaseEpochMs: I,
      inPointMs: R,
      outPointMs: ne,
      playheadMs: se,
      inEpochMs: oe,
      outEpochMs: U,
      playheadEpochMs: Y,
      selectedStationIds: T,
      selectedStationNames: H,
      allStationIds: z,
      stationIds: T.length > 0 ? T : z,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    v(!0);
    try {
      const De = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(xe)
      });
      if (De.ok) {
        const Ce = await De.json(), Ze = [{
          ...xe,
          ...Ce.bookmark || {},
          inEpochMs: oe,
          outEpochMs: U,
          playheadEpochMs: Y,
          selectedStationIds: T,
          selectedStationNames: H,
          allStationIds: z,
          id: ((ye = Ce.bookmark) == null ? void 0 : ye.id) || Ce.id || `bm_${Date.now()}`
        }, ...a];
        c(Ze), g(Ze), d("");
      } else
        throw new Error(`Server returned ${De.status}`);
    } catch (De) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", De);
      const Ie = [{
        ...xe,
        inEpochMs: oe,
        outEpochMs: U,
        playheadEpochMs: Y,
        selectedStationIds: T,
        selectedStationNames: H,
        allStationIds: z,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      c(Ie), g(Ie), d("");
    } finally {
      v(!1);
    }
  }, E = async (I, R) => {
    if (R.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ne = a.filter((se) => (se.id || se.startTime) !== I);
    c(ne), g(ne);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${I}`, { method: "DELETE" });
    } catch (se) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", se);
    }
  }, S = (I, R) => {
    R.stopPropagation(), j(I.id || I.startTime), k(I.title || I.name || "");
  }, w = async (I, R) => {
    if (R && R.stopPropagation(), !O.trim()) return;
    const ne = a.find((U) => (U.id || U.startTime) === I), se = O.trim(), oe = a.map(
      (U) => (U.id || U.startTime) === I ? { ...U, title: se, name: se } : U
    );
    c(oe), g(oe), j(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${I}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ne, title: se })
      });
    } catch (U) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", U);
    }
  }, p = (I) => {
    I.stopPropagation(), j(null);
  }, $ = (I) => !I || isNaN(I) ? "--:--:--" : Et(I, l), C = (I) => {
    const R = I.startTime || I.StartTime, ne = I.endTime || I.EndTime;
    if (!R) return "--";
    const se = String(R).replace("T", " ").substring(0, 19), oe = ne ? String(ne).replace("T", " ").substring(0, 19) : se;
    return `${se} ➔ ${oe}`;
  }, W = (I) => {
    let R = I.inEpochMs || I.InEpochMs, ne = I.outEpochMs || I.OutEpochMs;
    if (!R || !ne) {
      const se = I.timelineBaseEpochMs || I.baseEpochMs || (I.startTime ? new Date(String(I.startTime).replace(" ", "T")).getTime() : 0), oe = I.inPointMs ?? I.InPointMs, U = I.outPointMs ?? I.OutPointMs;
      se && typeof oe == "number" && typeof U == "number" && (oe > 0 || U > 0) && (R = se + oe, ne = se + U);
    }
    if (R && ne && !isNaN(R) && !isNaN(ne) && R > 0) {
      const se = $(R), oe = $(ne), U = Math.max(0, ne - R), Y = Math.floor(U / 6e4), T = Math.floor(Y / 60), H = Y % 60, z = T > 0 ? `${T}h ${H}m` : `${Y}m`;
      return { timeText: `${se} ➔ ${oe}`, duration: z };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, ee = (I) => {
    const R = I.selectedStationNames || [], ne = I.selectedStationIds || I.cutStationIds || I.stationIds || [];
    return R.length > 0 ? R.join(", ") : ne.length > 0 ? ne.join(", ") : I.cutStationName ? I.cutStationName : I.activeStationName ? I.activeStationName : "All Stations in Scope";
  };
  return Ps.createPortal(
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
              onChange: (I) => d(I.target.value),
              onKeyDown: (I) => I.key === "Enter" && b(),
              disabled: f,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${u.trim() && !f ? "active" : ""}`,
            onClick: b,
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
        var Y, T, H;
        const R = I.id || I.startTime, ne = M === R, se = W(I), oe = ee(I), U = ((Y = I.allStationIds) == null ? void 0 : Y.length) || ((T = I.selectedStationIds) == null ? void 0 : T.length) || ((H = I.stationIds) == null ? void 0 : H.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${ne ? "is-editing" : ""}`,
            onClick: () => {
              ne || (r && r(I), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                ne ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (z) => z.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: O,
                      onChange: (z) => k(z.target.value),
                      onKeyDown: (z) => {
                        z.key === "Enter" && w(R, z), z.key === "Escape" && p(z);
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
                        onClick: (z) => w(R, z),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: p,
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
                    /* @__PURE__ */ s.jsx("strong", { children: C(I) })
                  ] }),
                  U > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    U,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: se.timeText }),
                    se.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      se.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${oe}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: oe })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (z) => z.stopPropagation(), children: [
                !ne && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (z) => S(I, z),
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
                    onClick: (z) => E(R, z),
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
const Yh = {
  USER: "itb_auth_user",
  ROLES: "itb_auth_roles"
};
function Sm() {
  try {
    if (typeof window > "u") return "Guest Operator";
    const e = sessionStorage.getItem(Yh.USER) || localStorage.getItem(Yh.USER);
    if (e) {
      const t = JSON.parse(e), n = (t == null ? void 0 : t.displayName) || (t == null ? void 0 : t.username);
      if (n && typeof n == "string" && n.trim())
        return n.trim();
    }
  } catch {
  }
  return "Guest Operator";
}
function zy(e) {
  if (!e || e.length === 0)
    return { minX: 0, minY: 0, totalWidth: 1920, totalHeight: 1080 };
  const t = Math.min(...e.map((l) => l.X ?? l.x ?? 0)), n = Math.min(...e.map((l) => l.Y ?? l.y ?? 0)), r = Math.max(...e.map((l) => (l.X ?? l.x ?? 0) + (l.Width || l.width || 1920))), o = Math.max(...e.map((l) => (l.Y ?? l.y ?? 0) + (l.Height || l.height || 1080)));
  return {
    minX: t,
    minY: n,
    totalWidth: Math.max(1, r - t),
    totalHeight: Math.max(1, o - n)
  };
}
function Ky(e, t) {
  if (!e || !t || t.totalWidth <= 0 || t.totalHeight <= 0)
    return { leftPct: 0, topPct: 0, widthPct: 100, heightPct: 100 };
  const n = e.X ?? e.x ?? 0, r = e.Y ?? e.y ?? 0, o = e.Width || e.width || 1920, l = e.Height || e.height || 1080;
  return {
    leftPct: (n - t.minX) / t.totalWidth * 100,
    topPct: (r - t.minY) / t.totalHeight * 100,
    widthPct: o / t.totalWidth * 100,
    heightPct: l / t.totalHeight * 100
  };
}
function Vy({
  station: e,
  baseEpochMs: t = 0,
  totalDurationMs: n = 36e5,
  playheadMs: r = 0,
  setPlayheadMs: o,
  isPlaying: l = !1,
  setIsPlaying: a,
  playbackSpeed: c = 1,
  _timeMode: u = "LOCAL",
  inPointMs: d = 0,
  outPointMs: y = 36e5,
  isLooping: m = !0,
  recordingSegments: f = {},
  globalGaps: v = [],
  showWatermark: M = !0,
  directorPlan: j,
  onOverrideDisplay: O,
  onResetOverride: k,
  viewMode: g,
  onViewModeChange: N,
  onOpenFullscreen: b,
  isPipSwapped: E,
  onPipSwapChange: S,
  className: w = ""
}) {
  const p = i.useRef(null), $ = i.useRef(null), C = i.useRef(null), W = i.useRef(r), ee = i.useRef(r), I = i.useRef(r), R = i.useRef(!1), ne = i.useRef(null), se = i.useRef(l), oe = i.useRef(!1);
  W.current = r;
  const U = e == null ? void 0 : e.id, Y = e && (e.hostname || e.name) || "", T = i.useMemo(() => {
    var Fe, et, rt, wt;
    const te = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Fe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Fe.displays) || ((et = e == null ? void 0 : e.displayTopology) == null ? void 0 : et.Displays) || ((rt = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : rt.Displays) || ((wt = e == null ? void 0 : e.topology) == null ? void 0 : wt.displays) || [];
    if (!Array.isArray(te) || te.length === 0) return [];
    const ue = te.length > 1 && te.every((at) => (at.X ?? at.x ?? 0) === 0 && (at.Y ?? at.y ?? 0) === 0);
    let je = 0;
    return te.map((at, dt) => {
      const Kt = at.Width || at.width || 1920, Ft = at.Height || at.height || 1080, Qt = ue ? je : at.X ?? at.x ?? dt * Kt, Jt = ue ? 0 : at.Y ?? at.y ?? 0;
      ue && (je += Kt);
      const xn = (at.displayId ?? at.DisplayId ?? `mon-${dt}`).toLowerCase(), yn = at.displayNumber ?? at.DisplayNumber ?? dt + 1, is = (at.displayName || at.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${yn}`, ys = !!(at.isPrimary ?? at.IsPrimary ?? dt === 0);
      return {
        ...at,
        displayId: xn,
        DisplayId: xn,
        displayIndex: dt,
        displayNumber: yn,
        DisplayNumber: yn,
        displayName: is,
        DisplayName: is,
        isPrimary: ys,
        IsPrimary: ys,
        x: Qt,
        y: Jt,
        X: Qt,
        Y: Jt,
        width: Kt,
        height: Ft,
        Width: Kt,
        Height: Ft
      };
    });
  }, [e]), H = T.length > 1, [z, xe] = i.useState(() => {
    if (!H) return "mon-0";
    try {
      const te = localStorage.getItem("itb_solo_viewmode");
      if (te) return te;
    } catch {
    }
    return "canvas";
  }), V = H ? g !== void 0 ? g : z : "mon-0", K = i.useCallback((te) => {
    const ue = typeof te == "function" ? te(V) : te;
    xe(ue);
    try {
      localStorage.setItem("itb_solo_viewmode", ue);
    } catch {
    }
    N && N(ue);
  }, [V, N]), [ge, fe] = i.useState(!1), ye = E !== void 0 ? E : ge, De = i.useCallback((te) => {
    const ue = typeof te == "function" ? te(ye) : te;
    fe(ue), S && S(ue);
  }, [ye, S]), Ce = i.useMemo(() => {
    const te = j || (e == null ? void 0 : e.directorPlan);
    if (!te || !te.segments || te.segments.length === 0) return null;
    const ue = t + r;
    return te.segments.find((je) => {
      const Fe = je.startEpochMs ?? je.StartEpochMs ?? 0, et = je.endEpochMs ?? je.EndEpochMs ?? 0;
      return ue >= Fe && ue <= et;
    }) || te.segments[0];
  }, [j, e == null ? void 0 : e.directorPlan, t, r]), Ie = i.useMemo(() => {
    var te, ue;
    if (!H) return "mon-0";
    if (V === "split" || V === "pip" || V === "canvas" || V === "all-displays") {
      const je = (((te = T[0]) == null ? void 0 : te.displayId) ?? "mon-0").toLowerCase(), Fe = (((ue = T[1]) == null ? void 0 : ue.displayId) ?? "mon-1").toLowerCase();
      return ye ? Fe : je;
    }
    return V !== "director" ? V.toLowerCase() : ((Ce == null ? void 0 : Ce.targetDisplayId) ?? (Ce == null ? void 0 : Ce.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [H, V, Ce, T, ye]), Ze = i.useMemo(() => {
    var ue;
    if (!H) return null;
    const te = T.find((je) => (je.displayId ?? je.DisplayId ?? "").toLowerCase() !== Ie);
    return te ? (te.displayId ?? te.DisplayId).toLowerCase() : (((ue = T[1]) == null ? void 0 : ue.displayId) || "mon-1").toLowerCase();
  }, [H, T, Ie]), Xe = i.useMemo(() => {
    const te = T.find((je) => (je.displayId ?? "").toLowerCase() === (Ie || "").toLowerCase());
    if (te) return te.displayName || `Screen ${te.displayNumber || 1}`;
    if (Ie === "mon-0" || Ie === "0") return "Screen 1";
    if (Ie === "mon-1" || Ie === "1") return "Screen 2";
    const ue = (Ie || "").match(/\d+/);
    if (ue) {
      const je = parseInt(ue[0], 10);
      return `Screen ${(Ie || "").startsWith("mon-") ? je + 1 : je}`;
    }
    return (Ie || "Screen 1").toUpperCase();
  }, [T, Ie]), Ht = i.useMemo(() => {
    const te = T.find((ue) => (ue.displayId ?? "").toLowerCase() === (Ze || "").toLowerCase());
    return te ? te.displayName || `Screen ${te.displayNumber || 2}` : "Screen 2";
  }, [T, Ze]), Ot = i.useMemo(() => V !== "director" && V !== "split" && V !== "pip" && V !== "canvas" ? !0 : !!((Ce == null ? void 0 : Ce.isManualOverride) ?? (Ce == null ? void 0 : Ce.IsManualOverride)), [V, Ce]), [ft, G] = i.useState({}), Le = i.useRef(null), [B, D] = i.useState({ width: 0, height: 0 }), J = i.useMemo(() => zy(T), [T]);
  i.useEffect(() => {
    if (!H || V !== "canvas" && V !== "all-displays" || l)
      return;
    const te = () => {
      const je = Le.current;
      if (!je) return;
      const Fe = 48, et = 72, rt = Math.max(100, je.clientWidth - Fe), wt = Math.max(100, je.clientHeight - et), at = J.totalWidth || 1920, dt = J.totalHeight || 1080, Kt = at / dt;
      let Ft = rt, Qt = Ft / Kt;
      Qt > wt && (Qt = wt, Ft = Qt * Kt), D({ width: Math.round(Ft), height: Math.round(Qt) });
    };
    te();
    const ue = new ResizeObserver(te);
    return Le.current && ue.observe(Le.current), () => ue.disconnect();
  }, [H, V, J]);
  const _ = i.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  i.useEffect(() => {
    if (!H || V !== "canvas" && V !== "all-displays")
      return;
    let te = !0;
    const ue = new AbortController(), je = _;
    T.forEach((et, rt) => {
      const wt = (et.displayId ?? et.DisplayId ?? `mon-${rt}`).toLowerCase(), at = Pn.get(Y, je, wt);
      at ? G((dt) => ({ ...dt, [wt]: at })) : Pn.fetchFrame(Y, je, ue.signal, wt).then((dt) => {
        te && dt && G((Kt) => ({ ...Kt, [wt]: dt }));
      });
    });
    const Fe = Pn.subscribe((et, rt, wt, at) => {
      et === Y && rt === je && at && te && G((dt) => ({ ...dt, [at.toLowerCase()]: wt }));
    });
    return () => {
      te = !1, ue.abort(), Fe();
    };
  }, [H, V, T, Y, _]);
  const P = i.useRef(Ie), Q = i.useMemo(() => e ? f[e.id] || f[e.hostname] || e.segments || [] : [], [e, f]), le = t + r, re = i.useMemo(() => Q.length === 0 ? !0 : Q.some((te) => {
    const ue = (te.startEpochMs ?? te.startEpoch ?? 0) - 2e3, je = (te.endEpochMs ?? te.endEpoch ?? 0) + 2e3;
    return le >= ue && le <= je;
  }), [Q, le]), we = !re && Q.length > 0, [Ee, ze] = i.useState("A"), [st, Je] = i.useState(""), [pt, ut] = i.useState(""), [nt, tt] = i.useState(""), [en, _t] = i.useState(null), [bt, it] = i.useState(!1), [mt, gt] = i.useState(!1), [Dt, pn] = i.useState(() => {
    if (!Y) return null;
    const te = Math.round(t + r);
    return Pn.get(Y, te, Ie) || null;
  }), [Nt, tn] = i.useState(null), Gt = Ee === "A" ? p : $, He = i.useCallback(() => {
    const te = Po();
    p.current && (p.current.volume = te.volume, p.current.muted = Ee !== "A" || te.isMuted, p.current.defaultPlaybackRate = c, p.current.playbackRate = c, Ee === "A" && !te.isMuted && di(p.current)), $.current && ($.current.volume = te.volume, $.current.muted = Ee !== "B" || te.isMuted, $.current.defaultPlaybackRate = c, $.current.playbackRate = c, Ee === "B" && !te.isMuted && di($.current)), C.current && (C.current.muted = !0, C.current.defaultPlaybackRate = c, C.current.playbackRate = c);
  }, [Ee, c]);
  i.useEffect(() => {
    const te = (ue) => {
      ue.detail && (p.current && (p.current.volume = ue.detail.volume), $.current && ($.current.volume = ue.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", te), () => window.removeEventListener("itb-audio-state-changed", te);
  }, []), i.useEffect(() => {
    p.current && (p.current.defaultPlaybackRate = c, p.current.playbackRate = c), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c), C.current && (C.current.defaultPlaybackRate = c, C.current.playbackRate = c);
  }, [c]), i.useEffect(() => {
    if (!U || !Y) return;
    if (l) {
      se.current = !0;
      return;
    }
    const te = se.current;
    se.current = l;
    let ue = !0;
    const je = new AbortController(), Fe = Math.round(t + r), et = Pn.get(Y, Fe, Ie);
    if (et) {
      pn(et);
      return;
    }
    const wt = setTimeout(() => {
      ue && Pn.fetchFrame(Y, Fe, je.signal, Ie).then((dt) => {
        ue && dt && pn(dt);
      });
    }, te ? 25 : 35), at = Pn.subscribe((dt, Kt, Ft, Qt) => {
      dt === Y && Kt === Fe && (!Qt || Qt === Ie) && ue && pn(Ft);
    });
    return () => {
      ue = !1, clearTimeout(wt), je.abort(), at();
    };
  }, [U, Y, t, r, l, bt, Ie]), i.useEffect(() => {
    if (!H || V !== "split" && V !== "pip" || !Ze || l) {
      tn(null);
      return;
    }
    let te = !0;
    const ue = new AbortController(), je = Math.round(t + r), Fe = Pn.get(Y, je, Ze);
    if (Fe) {
      tn(Fe);
      return;
    }
    const et = setTimeout(() => {
      te && Pn.fetchFrame(Y, je, ue.signal, Ze).then((wt) => {
        te && wt && tn(wt);
      });
    }, 40), rt = Pn.subscribe((wt, at, dt, Kt) => {
      wt === Y && at === je && (!Kt || Kt === Ze) && te && tn(dt);
    });
    return () => {
      te = !1, clearTimeout(et), ue.abort(), rt();
    };
  }, [H, V, Ze, U, Y, t, r]);
  const pe = i.useCallback((te, ue = Ie) => {
    const je = Math.round(t), Fe = Math.round(t + n), et = Math.min(Fe, Math.max(je, Math.round(t + te)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(Y)}&startEpoch=${je}&endEpoch=${Fe}&seekEpoch=${et}&displayId=${encodeURIComponent(ue)}&_t=${Date.now()}`;
  }, [t, n, Y, Ie]);
  i.useEffect(() => {
    if (!(!U || !Y))
      if (l && re) {
        const te = W.current;
        ee.current = te, I.current = te, R.current = !1;
        const ue = pe(te, Ie);
        it(!1), gt(!0), ze("A"), Je(ue), ut(""), _t(null), tt((V === "split" || V === "pip") && Ze ? pe(te, Ze) : "");
      } else l || (ne.current && clearTimeout(ne.current), R.current = !1, Je(""), ut(""), tt(""), _t(null), it(!1), gt(!1), p.current && p.current.pause(), $.current && $.current.pause(), C.current && C.current.pause());
  }, [l, U, Y, re, pe, Ie, V, Ze]), i.useEffect(() => {
    if (P.current !== Ie && (P.current = Ie, l && re)) {
      const te = W.current;
      ee.current = te;
      const ue = pe(te, Ie);
      it(!1), gt(!0), ze("A"), Je(ue), ut("");
    }
  }, [Ie, l, re, pe]), i.useEffect(() => {
    if (!U || !Y) return;
    const te = Math.abs(r - I.current);
    if (!l || te < 15) {
      I.current = r;
      return;
    }
    return R.current = !0, I.current = r, ee.current = r, p.current && p.current.pause(), $.current && $.current.pause(), C.current && C.current.pause(), it(!1), gt(!0), ne.current && clearTimeout(ne.current), ne.current = setTimeout(() => {
      if (!re) {
        Je(""), ut(""), tt(""), gt(!1), R.current = !1;
        return;
      }
      const ue = W.current, je = pe(ue, Ie);
      ze("A"), Je(je), ut(""), _t(null), (V === "split" || V === "pip") && Ze && tt(pe(ue, Ze));
    }, 75), () => {
      ne.current && clearTimeout(ne.current);
    };
  }, [r, l, U, Y, re, pe, Ie, V, Ze]), i.useEffect(() => {
    if (!l || !bt || Q.length === 0) return;
    const te = t + W.current, ue = Q.map((je) => ({
      start: je.startEpochMs ?? je.startEpoch ?? 0,
      end: je.endEpochMs ?? je.endEpoch ?? 0
    })).filter((je) => je.start > te + 500).sort((je, Fe) => je.start - Fe.start)[0];
    if (ue && (!en || en.start !== ue.start)) {
      const je = ue.start - t;
      if (je < y) {
        const Fe = pe(je, Ie);
        _t({ start: ue.start, ms: je }), Ee === "A" ? ut(Fe) : Je(Fe);
      }
    }
  }, [l, bt, r, t, y, Q, en, Ee, pe, Ie]);
  const Ue = i.useCallback(() => {
    if (en) {
      const te = Ee === "A" ? "B" : "A", ue = te === "A" ? p : $;
      ze(te), ee.current = en.ms, I.current = en.ms, _t(null), ue.current && ue.current.play().then(() => {
        He();
      }).catch(() => {
      });
    } else
      m ? o(d) : a(!1);
  }, [en, Ee, He, m, d, o, a]), kt = i.useCallback(() => {
    const te = Gt.current;
    if (!te || R.current || !l || oe.current) return;
    const ue = te.currentTime * 1e3, je = Math.round(ee.current + ue);
    if (v && v.length > 0) {
      const Fe = t + je, et = v.find((rt) => Fe >= rt.startEpochMs && Fe < rt.endEpochMs);
      if (et) {
        oe.current = !0;
        const rt = Math.round(et.endEpochMs - t) + 10;
        o(rt), setTimeout(() => {
          oe.current = !1;
        }, 150);
        return;
      }
    }
    if (je >= y) {
      m ? o(d) : (a(!1), o(y));
      return;
    }
    I.current = je, o(je);
  }, [Gt, l, t, v, y, m, d, o, a]), de = mt && l && !we;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${V} ${w}`, children: [
    H && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (te) => te.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "director" ? "active" : ""}`,
          onClick: () => K("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "canvas" ? "active" : ""}`,
          onClick: () => K("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "split" ? "active" : ""}`,
          onClick: () => K("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "pip" ? "active" : ""}`,
          onClick: () => K("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      T.map((te, ue) => {
        const je = (te.displayId ?? `mon-${ue}`).toLowerCase(), Fe = te.displayNumber ?? ue + 1, et = te.displayName || `Screen ${Fe}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${V === je ? "active" : ""}`,
            onClick: () => K(je),
            title: `Pin directly to ${et}`,
            children: [
              "🖥️ ",
              Fe
            ]
          },
          je
        );
      }),
      V === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          T.map((te, ue) => {
            const je = (te.displayId ?? `mon-${ue}`).toLowerCase(), Fe = te.displayNumber ?? ue + 1, et = te.displayName || `Screen ${Fe}`, rt = Ie === je;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${rt ? "active" : ""} ${Ot && rt ? "is-override" : ""}`,
                onClick: () => {
                  O == null || O(U, t + r, je);
                },
                title: `Punch ${et} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Fe
                  ] }),
                  rt && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: Ot ? "✋" : "⚡" })
                ]
              },
              `punch-${je}`
            );
          }),
          Ot && k && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                k == null || k(U, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    H && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${Ot ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: V === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : V === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : V === "pip" ? `🪟 PiP MODE: ${Xe.toUpperCase()} (HERO)` : `${Ot ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${Xe.toUpperCase()}` }),
      Ot && V === "director" && k && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => k == null ? void 0 : k(U, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    st && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: p,
        src: st,
        className: "feed-video-element",
        style: {
          opacity: bt && Ee === "A" ? 1 : 0,
          zIndex: Ee === "A" ? 3 : 1,
          pointerEvents: Ee === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Ee === "A",
        preload: "auto",
        muted: Ee !== "A" || Po().isMuted,
        onCanPlay: () => {
          He(), l && Ee === "A" && p.current && p.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ee === "A" && (R.current = !1, it(!0), gt(!1), p.current && (p.current.defaultPlaybackRate = c, p.current.playbackRate = c));
        },
        onWaiting: () => {
          Ee === "A" && gt(!0);
        },
        onTimeUpdate: () => {
          var te;
          Ee === "A" && (!bt && ((te = p.current) == null ? void 0 : te.currentTime) > 0 && (R.current = !1, it(!0), gt(!1), p.current && (p.current.defaultPlaybackRate = c, p.current.playbackRate = c)), kt());
        },
        onError: () => {
          Ee === "A" && (R.current = !1, gt(!1), it(!1));
        },
        onEnded: () => {
          Ee === "A" && Ue();
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
          opacity: bt && Ee === "B" ? 1 : 0,
          zIndex: Ee === "B" ? 3 : 1,
          pointerEvents: Ee === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Ee === "B",
        preload: "auto",
        muted: Ee !== "B" || Po().isMuted,
        onCanPlay: () => {
          He(), l && Ee === "B" && $.current && $.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ee === "B" && (R.current = !1, it(!0), gt(!1), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c));
        },
        onWaiting: () => {
          Ee === "B" && gt(!0);
        },
        onTimeUpdate: () => {
          var te;
          Ee === "B" && (!bt && ((te = $.current) == null ? void 0 : te.currentTime) > 0 && (R.current = !1, it(!0), gt(!1), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c)), kt());
        },
        onError: () => {
          Ee === "B" && (R.current = !1, gt(!1), it(!1));
        },
        onEnded: () => {
          Ee === "B" && Ue();
        }
      }
    ),
    V !== "split" && V !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: bt ? 0 : 2 },
        children: we ? /* @__PURE__ */ s.jsx(gm, { isPlaying: l }) : Dt && Dt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Dt,
            className: "feed-static-image",
            alt: "Playback Frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            }
          }
        ) : l ? null : /* @__PURE__ */ s.jsx("div", { className: "feed-decode-pending", children: /* @__PURE__ */ s.jsx("span", { children: "DECODE PENDING..." }) })
      }
    ),
    V === "split" && H && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Dt && Dt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Dt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        Nt && Nt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Nt, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    V === "pip" && H && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (te) => {
          te.stopPropagation(), De((ue) => !ue);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              Ht.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          Nt && Nt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Nt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (V === "canvas" || V === "all-displays") && H && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: Le, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: B.width ? `${B.width}px` : "92%",
            height: B.height ? `${B.height}px` : "auto",
            aspectRatio: `${J.totalWidth} / ${J.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: T.map((te, ue) => {
            const je = Ky(te, J), Fe = (te.displayId ?? te.DisplayId ?? `mon-${ue}`).toLowerCase(), et = ft[Fe] || (Fe === Ie ? Dt : null), rt = !!(te.isPrimary ?? te.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${rt ? "is-primary" : ""}`,
                style: {
                  left: `${je.leftPct}%`,
                  top: `${je.topPct}%`,
                  width: `${je.widthPct}%`,
                  height: `${je.heightPct}%`
                },
                onClick: (wt) => {
                  wt.stopPropagation(), b ? b(Fe) : K(Fe);
                },
                title: `Display ${ue + 1} (${te.width || 1920}x${te.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      rt ? "★ " : "",
                      "🖥 ",
                      ue + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: te.displayName || te.DisplayName || Fe.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      te.width || 1920,
                      "x",
                      te.height || 1080
                    ] }),
                    b && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (wt) => {
                          wt.stopPropagation(), b(Fe);
                        },
                        title: `Open Display ${ue + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  et && et !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: et,
                      className: "canvas-frame-img",
                      alt: Fe
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      te.displayName || Fe.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Fe
            );
          })
        }
      )
    ] }),
    de && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          Y,
          " • ",
          Ie.toUpperCase()
        ] })
      ] })
    ] }) }),
    V === "director" && Ce && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Ie.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        Et(Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, u, { includeSeconds: !0 }),
        " - ",
        Et(Ce.endEpochMs ?? Ce.EndEpochMs ?? 0, u, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    H && V !== "canvas" && /* @__PURE__ */ s.jsx(
      xm,
      {
        displays: T,
        activeDisplayId: Ie,
        mode: Ot ? "MANUAL" : "AUTO",
        activeTimeRange: Ce ? `${Et(Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, u, { includeSeconds: !0 })} - ${Et(Ce.endEpochMs ?? Ce.EndEpochMs ?? 0, u, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (te) => {
          O && O(U, t + r, te), K(te);
        }
      }
    ),
    M && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      Y
    ] }) })
  ] });
}
const Yy = [
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
function bm({ isOpen: e, onClose: t }) {
  return i.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? Ps.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Yy.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
        /* @__PURE__ */ s.jsx("h4", { className: "group-title", children: n.title }),
        /* @__PURE__ */ s.jsx("div", { className: "group-items-list", children: n.shortcuts.map((o, l) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-row", children: [
          /* @__PURE__ */ s.jsx("div", { className: "keys-cluster", children: o.keys.map((a, c) => a === "or" || a === "+" || a === "← / →" || a === "Z / Y" ? /* @__PURE__ */ s.jsx("span", { className: "key-separator", children: a }, c) : /* @__PURE__ */ s.jsx("kbd", { className: "tactical-kbd", children: a }, c)) }),
          /* @__PURE__ */ s.jsx("span", { className: "shortcut-desc", children: o.desc })
        ] }, l)) })
      ] }, r)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("span", { className: "footer-hint", children: "💡 Pro-Tip: Hardware-code mapped (I/O/J/K/L) ensures flawless operation across Hebrew & English keyboard layouts." }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-got-it", onClick: t, children: "GOT IT" })
      ] })
    ] }) }),
    document.body
  ) : null;
}
const Xh = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), o = Math.floor(r / 3600), l = Math.floor(r % 3600 / 60), a = r % 60, c = Math.floor(n % 1e3 / 1e3 * t), u = (d) => String(d).padStart(2, "0");
  return `${u(o)}:${u(l)}:${u(a)}.${u(c)}`;
};
function Xy({
  isOpen: e,
  station: t,
  initialDisplayId: n = null,
  allStations: r = [],
  onSelectStation: o,
  onClose: l,
  baseEpochMs: a = 0,
  timeMode: c = "LOCAL",
  totalDurationMs: u = 36e5,
  zoomLevel: d = 1,
  onZoomChange: y,
  onZoomReset: m,
  onFitRange: f,
  onJumpViewportTo: v,
  viewportStartMs: M = 0,
  onViewportStartChange: j,
  playheadMs: O = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: g,
  inPointMs: N = 0,
  setInPointMs: b,
  outPointMs: E = 36e5,
  setOutPointMs: S,
  recordingSegments: w = {},
  globalGaps: p = [],
  onExport: $,
  isPlaying: C,
  setIsPlaying: W,
  isLooping: ee = !0,
  setIsLooping: I,
  playbackSpeed: R,
  setPlaybackSpeed: ne,
  keystrokeMode: se = "BURN_IN",
  onChangeKeystrokeMode: oe,
  keystrokes: U = [],
  showRulerKeystrokes: Y = !1,
  onToggleRulerKeystrokes: T,
  directorPlan: H,
  onOverrideDisplay: z,
  onSplitDirectorSegment: xe,
  onChangeDirectorSegmentDisplay: X,
  onResetDirectorSegmentToAuto: V
}) {
  var Nt, tn, Gt;
  const [K, ge] = i.useState(!1), fe = C !== void 0 ? C : K, ye = i.useCallback((He) => {
    const pe = typeof He == "function" ? He(fe) : He;
    W ? W(pe) : ge(pe), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: pe } }));
  }, [fe, W]), [De, Ce] = i.useState(!0), Ie = ee !== void 0 ? ee : De, Ze = I || Ce, [Xe, Ht] = i.useState(1), Ot = R !== void 0 ? R : Xe, ft = ne || Ht, [G, Le] = i.useState(null), [B, D] = i.useState(!1), [J, _] = i.useState(p), P = ((Nt = t == null ? void 0 : t.displays) == null ? void 0 : Nt.length) > 1 || ((Gt = (tn = t == null ? void 0 : t.topology) == null ? void 0 : tn.displays) == null ? void 0 : Gt.length) > 1, [Q, le] = i.useState(() => {
    if (!P) return "mon-0";
    if (n) return n;
    try {
      const He = localStorage.getItem("itb_spotlight_viewmode");
      if (He) return He;
    } catch {
    }
    return "canvas";
  }), re = i.useCallback((He) => {
    le((pe) => {
      const Ue = typeof He == "function" ? He(pe) : He;
      try {
        localStorage.setItem("itb_spotlight_viewmode", Ue);
      } catch {
      }
      return Ue;
    });
  }, []), [we, Ee] = i.useState(!1);
  i.useEffect(() => {
    if (e) {
      if (!P) {
        le("mon-0");
        return;
      }
      if (n)
        le(n);
      else
        try {
          const He = localStorage.getItem("itb_spotlight_viewmode");
          le(He || "canvas");
        } catch {
          le("canvas");
        }
    }
  }, [e, n, P, t == null ? void 0 : t.id]);
  const ze = i.useRef(null), st = i.useRef(d);
  st.current = d;
  const Je = i.useRef(M);
  Je.current = M;
  const pt = i.useRef(u);
  pt.current = u;
  const ut = i.useRef(t && t.id);
  i.useEffect(() => {
    var He, pe, Ue;
    t && t.id && ut.current !== t.id && (ut.current = t.id, ft(1), ((He = t.displays) == null ? void 0 : He.length) > 1 || ((Ue = (pe = t.topology) == null ? void 0 : pe.displays) == null ? void 0 : Ue.length) > 1 || re("mon-0"));
  }, [t, ft]);
  const nt = i.useMemo(() => t ? [t] : [], [t]);
  i.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), i.useEffect(() => {
    if (!e) return;
    const He = ze.current;
    if (!He || !y || !j) return;
    const pe = (Ue) => {
      Ue.preventDefault(), Ue.stopPropagation();
      const kt = Ue.ctrlKey || Ue.shiftKey, de = st.current, te = Je.current, ue = pt.current || 36e5;
      if (kt) {
        const je = Math.abs(Ue.deltaX) > Math.abs(Ue.deltaY) ? Ue.deltaX : Ue.deltaY;
        if (je === 0) return;
        const Fe = ue / de, et = Math.max(0, ue - Fe), rt = Fe * 0.08 * (je > 0 ? 1 : -1), wt = Math.max(0, Math.min(et, te + rt));
        Je.current = wt, j(wt);
      } else {
        if (Ue.deltaY === 0) return;
        const Fe = Ue.deltaY < 0 ? 1.25 : 0.8, et = He.getBoundingClientRect(), rt = et.left + 150, wt = et.right - 58, at = Math.max(100, wt - rt);
        let dt = 0.5;
        Ue.clientX >= rt && Ue.clientX <= wt ? dt = (Ue.clientX - rt) / at : et.width > 0 && (dt = Math.max(0, Math.min(1, (Ue.clientX - et.left) / et.width)));
        const Kt = Math.max(32, ue / 2e3), Ft = Math.max(1, Math.min(Kt, Math.round(de * Fe * 100) / 100));
        if (Ft === de) return;
        const Qt = ue / de, Jt = ue / Ft, yn = te + dt * Qt - dt * Jt, as = Math.max(0, ue - Jt), Jn = Math.max(0, Math.min(as, yn));
        st.current = Ft, Je.current = Jn, j(Jn), y(Ft);
      }
    };
    return He.addEventListener("wheel", pe, { passive: !1, capture: !0 }), () => He.removeEventListener("wheel", pe, { capture: !0 });
  }, [e, t, y, j]);
  const tt = i.useCallback(() => {
    m ? m() : (Je.current = 0, st.current = 1, j == null || j(0), y == null || y(1));
  }, [m, j, y]), en = i.useCallback((He, pe) => {
    if (f)
      f(He, pe);
    else {
      const Ue = Math.max(1e3, pe - He), kt = Math.max(500, Ue * 0.05), de = Math.max(0, He - kt), ue = Math.min(u, pe + kt) - de, je = Math.max(32, u / 2e3), Fe = Math.max(1, Math.min(je, Number((u / ue).toFixed(1)))), et = u / Fe, rt = Math.max(0, Math.min(de, u - et));
      Je.current = rt, st.current = Fe, j == null || j(rt), y == null || y(Fe);
    }
  }, [f, u, j, y]), _t = i.useCallback((He, pe = "center") => {
    if (v)
      v(He, pe);
    else {
      if (He == null) return;
      const Ue = st.current || 1, kt = u / Math.max(1, Ue), de = pe === "start" ? kt / 4 : kt * 0.75, te = Math.max(0, Math.min(He - de, u - kt));
      Je.current = te, j == null || j(te);
    }
  }, [v, u, j]), bt = i.useCallback(() => {
    ye((He) => !He);
  }, [ye]), it = i.useCallback(async () => {
    var kt;
    if (!t || Math.abs(E - N) < 1e3) return;
    const He = (se || "NONE").toUpperCase().replace("-", "_"), pe = He === "NONE" || He === "OFF" ? "None" : "BurnIn", Ue = {
      createdBy: Sm(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(N),
      outEpochMs: a + Math.round(E),
      keystrokeMode: pe,
      layoutMode: P ? Q : "mon-0",
      targetDisplayId: !P || Q === "mon-0" || Q === "mon-1" || Q.startsWith("mon-") ? P ? Q : "mon-0" : null,
      isPipSwapped: we,
      directorSegments: P ? (H == null ? void 0 : H.segments) || ((kt = t == null ? void 0 : t.directorPlan) == null ? void 0 : kt.segments) || [] : []
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
    } catch (de) {
      console.warn("[SoloSpotlightModal] Export trigger error:", de);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, N, E, a, $, se, Q, we, H]);
  i.useEffect(() => {
    if (!e || !t) return;
    const He = (pe) => {
      if ((pe.ctrlKey || pe.metaKey) && (pe.key === "e" || pe.key === "E")) {
        pe.preventDefault(), it();
        return;
      }
      if (pe.key === "?" || pe.shiftKey && pe.code === "Slash") {
        pe.preventDefault(), D((Ue) => !Ue);
        return;
      }
      if (B) {
        pe.key === "Escape" && D(!1);
        return;
      }
      if (pe.key === "Escape" || pe.code === "Escape") {
        pe.preventDefault(), pe.stopPropagation(), l == null || l();
        return;
      }
      if (pe.code === "Space") {
        pe.preventDefault(), bt();
        return;
      }
      if (pe.code === "KeyI") {
        pe.preventDefault(), b(Math.max(0, Math.min(O, E - 1e3)));
        return;
      }
      if (pe.code === "KeyO") {
        pe.preventDefault(), S(Math.min(u, Math.max(O, N + 1e3)));
        return;
      }
      if (pe.code === "ArrowLeft" || pe.code === "ArrowRight") {
        pe.preventDefault(), ye(!1);
        const Ue = pe.code === "ArrowLeft";
        let kt;
        if (pe.ctrlKey || pe.metaKey)
          kt = 33;
        else if (pe.shiftKey)
          kt = 5e3;
        else {
          const de = Math.max(1, d);
          kt = Math.max(33, Math.round(1e3 / de));
        }
        g((de) => {
          const te = Ue ? de - kt : de + kt;
          return Math.max(0, Math.min(u, te));
        });
        return;
      }
      if (pe.key === "ArrowDown") {
        pe.preventDefault();
        const Ue = r.findIndex((kt) => kt.id === t.id);
        if (Ue !== -1) {
          const kt = (Ue + 1) % r.length;
          o(r[kt].id);
        }
        return;
      }
      if (pe.key === "ArrowUp") {
        pe.preventDefault();
        const Ue = r.findIndex((kt) => kt.id === t.id);
        if (Ue !== -1) {
          const kt = (Ue - 1 + r.length) % r.length;
          o(r[kt].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", He, { capture: !0 }), () => window.removeEventListener("keydown", He, { capture: !0 });
  }, [
    e,
    t,
    r,
    o,
    l,
    O,
    N,
    E,
    u,
    d,
    b,
    S,
    g,
    it,
    bt,
    ye,
    B
  ]);
  const mt = r.findIndex((He) => He.id === (t && t.id)), gt = r[mt - 1], Dt = r[mt + 1];
  if (!e || !t) return null;
  const pn = k > 0 ? k : Math.round(a + O);
  return Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      G && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${G.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          G.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          G.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          G.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: G.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Xh(E - N),
            " (",
            Et(a + N, c),
            " → ",
            Et(a + E, c),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Vy,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: u,
            playheadMs: O,
            setPlayheadMs: g,
            isPlaying: fe,
            setIsPlaying: ye,
            playbackSpeed: Ot,
            timeMode: c,
            inPointMs: N,
            outPointMs: E,
            isLooping: Ie,
            recordingSegments: w,
            globalGaps: J,
            showWatermark: !0,
            directorPlan: H || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: z,
            onResetOverride: V,
            viewMode: Q,
            onViewModeChange: re,
            isPipSwapped: we,
            onPipSwapChange: Ee
          }
        ),
        /* @__PURE__ */ s.jsx(
          Nm,
          {
            currentEpochMs: pn,
            keystrokes: U,
            keystrokeMode: se,
            targetStationId: (t == null ? void 0 : t.id) || (t == null ? void 0 : t.hostname) || (t == null ? void 0 : t.stationId),
            targetDisplayId: Q === "canvas" || Q === "all-displays" ? "auto" : Q,
            displays: (t == null ? void 0 : t.displays) || (t == null ? void 0 : t.Displays),
            directorPlan: H || (t == null ? void 0 : t.directorPlan)
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
              onClick: (He) => {
                He.preventDefault(), He.stopPropagation(), l == null || l();
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
              onClick: () => D(!0),
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
              disabled: !gt,
              onClick: () => gt && o(gt.id),
              title: gt ? `Previous: ${gt.displayName || gt.roleAlias || gt.hostname || gt.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            mt + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !Dt,
              onClick: () => Dt && o(Dt.id),
              title: Dt ? `Next: ${Dt.displayName || Dt.roleAlias || Dt.hostname || Dt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${fe ? "is-playing-dimmed" : ""}`, ref: ze, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Xh(E - N) })
            ] }),
            (() => {
              const He = Q === "mon-0" ? "SCREEN 1" : Q === "mon-1" ? "SCREEN 2" : Q.startsWith("mon-") ? `SCREEN ${parseInt(Q.slice(4)) + 1}` : Q.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: it,
                  title: `Export Selected Cut Window as ${He} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: Q === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${He})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            pu,
            {
              activeStationId: t.id,
              isPlaying: fe,
              setIsPlaying: bt,
              isLooping: Ie,
              setIsLooping: Ze,
              playbackSpeed: Ot,
              onChangeSpeed: ft,
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: u,
              inPointMs: N,
              setInPointMs: b,
              outPointMs: E,
              setOutPointMs: S,
              onSetInPoint: () => b(Math.max(0, Math.min(O, E - 1e3))),
              onSetOutPoint: () => S(Math.min(u, Math.max(O, N + 1e3))),
              onStepFrameBackward: () => {
                ye(!1), g((He) => Math.max(0, He - 33));
              },
              onStepFrameForward: () => {
                ye(!1), g((He) => Math.min(u, He + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: Et(a + O, c) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          jm,
          {
            stations: nt,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: c,
            totalDurationMs: u,
            zoomLevel: d,
            onZoomChange: y,
            onZoomReset: tt,
            onFitRange: en,
            onJumpViewportTo: _t,
            viewportStartMs: M,
            onViewportStartChange: j,
            playheadMs: O,
            setPlayheadMs: (He) => {
              ye(!1), g(He);
            },
            inPointMs: N,
            setInPointMs: b,
            outPointMs: E,
            setOutPointMs: S,
            recordingSegments: w,
            onExport: it,
            onEstimateLoaded: (He) => {
              He != null && He.removedGlobalGaps && _(He.removedGlobalGaps);
            },
            keystrokeMode: se,
            onChangeKeystrokeMode: oe,
            keystrokes: U,
            showKeystrokes: Y,
            showRulerKeystrokes: Y,
            onToggleRulerKeystrokes: T,
            onSplitDirectorSegment: xe,
            onChangeDirectorSegmentDisplay: X,
            onResetDirectorSegmentToAuto: V
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        bm,
        {
          isOpen: B,
          onClose: () => D(!1)
        }
      )
    ] }),
    document.body
  );
}
function Mm({ isGlobalHost: e = !1 }) {
  const [t, n] = i.useState([]), [r, o] = i.useState(/* @__PURE__ */ new Set()), l = i.useRef(null), a = i.useRef(!1), c = i.useRef(0), [u, d] = i.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [y, m] = i.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), f = i.useCallback(async () => {
    if (!a.current && !(typeof document < "u" && document.hidden)) {
      a.current = !0;
      try {
        let w = await fetch("/api/v1/extractor-advanced/jobs");
        if (w.ok || (w = await fetch("/api/v1/extractor/jobs")), w.ok) {
          c.current = 0;
          const p = await w.json(), $ = Array.isArray(p) ? p : [];
          n($), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: $ }));
        } else
          c.current++;
      } catch (w) {
        c.current++, c.current <= 2 && console.warn("[ExportJobMonitor] Polling error:", w);
      } finally {
        a.current = !1;
      }
    }
  }, []);
  i.useEffect(() => {
    let w = !0, p = null;
    const $ = () => {
      if (!w) return;
      let W = 2500;
      typeof document < "u" && document.hidden ? W = 3e4 : c.current > 0 && (W = Math.min(3e4, 2500 * Math.pow(2, Math.min(c.current, 4)))), p = setTimeout(async () => {
        await f(), $();
      }, W);
    }, C = () => {
      !document.hidden && w && (clearTimeout(p), c.current = 0, f().then($));
    };
    return document.addEventListener("visibilitychange", C), f().then($), () => {
      w = !1, clearTimeout(p), document.removeEventListener("visibilitychange", C);
    };
  }, [f]), i.useEffect(() => {
    const w = () => {
      m(!0), f();
    };
    return window.addEventListener("open-export-monitor", w), () => window.removeEventListener("open-export-monitor", w);
  }, [f]), i.useEffect(() => {
    if (!y || u) return;
    const w = (p) => {
      l.current && !l.current.contains(p.target) && !p.target.closest(".export-floating-hud") && m(!1);
    };
    return document.addEventListener("pointerdown", w), () => document.removeEventListener("pointerdown", w);
  }, [y, u]);
  const v = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && v)
    return null;
  const M = t.filter((w) => w.status === "Processing" || w.status === "Queued"), j = t.filter((w) => w.status === "Completed" || w.isCompleted), O = () => {
    d((w) => {
      const p = !w;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(p));
      } catch {
      }
      return p;
    });
  }, k = () => {
    m(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, g = (w, p) => {
    p.stopPropagation(), !(!w || r.has(w)) && (o(($) => new Set($).add(w)), setTimeout(() => {
      n(($) => {
        const C = $.filter((W) => (W.jobId || W.id) !== w);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: C })), C;
      }), o(($) => {
        const C = new Set($);
        return C.delete(w), C;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${w}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${w}`, { method: "DELETE" })).catch(($) => console.warn("[ExportJobMonitor] Dismiss failed:", $)));
  }, N = async (w, p) => {
    p.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${w}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${w}/bookmark`, { method: "POST" })), f();
    } catch ($) {
      console.warn("[ExportJobMonitor] Bookmark failed:", $);
    }
  }, b = (w, p) => {
    p.stopPropagation();
    const $ = w.networkFolderPath || (w.outputFilePath ? w.outputFilePath.substring(0, w.outputFilePath.lastIndexOf("\\")) : "");
    $ && (navigator.clipboard.writeText($), alert(`UNC Directory Path copied to clipboard:
${$}`));
  }, E = (w) => {
    const p = w.jobId || w.id, $ = `/api/v1/extractor-advanced/jobs/${p}/download`, C = document.createElement("a");
    C.href = $, C.download = w.fileName || `archive_${p}.tar`, document.body.appendChild(C), C.click(), document.body.removeChild(C), setTimeout(f, 1e3);
  }, S = (w) => {
    if (!w || w <= 0) return "0 B";
    const p = w / (1024 * 1024);
    return p >= 1e3 ? `${(p / 1024).toFixed(2)} GB` : `${p.toFixed(1)} MB`;
  };
  return t.length === 0 && !y ? null : Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !y && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${M.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => m(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${M.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: M.length > 0 ? `EXPORTS: ${M.length} PACKAGING` : `${j.length} ARCHIVE${j.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${M.length > 0 ? "" : "ready"}`, children: M.length > 0 ? `${M[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      y && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !u && m(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: l, className: `export-drawer-panel ${u ? "pinned" : ""}`, onClick: (w) => w.stopPropagation(), children: [
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
                onClick: O,
                title: u ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: u ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: k, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((w) => {
          const p = w.status === "Completed" || w.isCompleted, $ = w.status === "Failed" || w.isFailed, C = w.status === "Processing" || w.status === "Queued", W = w.jobId || w.id, ee = r.has(W), I = p ? 100 : Math.round(w.progressPercent || w.progressPercentage || w.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${w.status.toLowerCase()} ${w.isBookmarked ? "is-bookmarked" : ""} ${ee ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${w.status.toLowerCase()}`, children: p ? "READY" : w.status }),
                    /* @__PURE__ */ s.jsxs("span", { className: "operator-chip", title: `Export created by ${w.createdBy || "Guest Operator"}`, children: [
                      /* @__PURE__ */ s.jsx("span", { className: "chip-icon", children: "👤" }),
                      /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: w.createdBy || "Guest Operator" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: w.fileName, children: w.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (R) => g(W, R),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                (w.notes || w.Notes) && /* @__PURE__ */ s.jsxs("div", { className: "job-notes-callout", title: `Export Note: ${w.notes || w.Notes}`, children: [
                  /* @__PURE__ */ s.jsx("span", { className: "notes-icon", children: "📝" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-label", children: "NOTE:" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-body", children: w.notes || w.Notes })
                ] }),
                C && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: w.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      I,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, I)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      S(w.fileSizeBytes)
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "telemetry-tags", children: [
                      /* @__PURE__ */ s.jsxs("span", { className: "operator-mini-tag", title: `Initiated by ${w.createdBy || "Guest Operator"}`, children: [
                        "👤 ",
                        w.createdBy || "Guest Operator"
                      ] }),
                      /* @__PURE__ */ s.jsx("span", { className: "speed", children: w.speedMBps > 0 ? `${w.speedMBps.toFixed(1)} MB/s` : "Analyzing" }),
                      w.estimatedSecondsRemaining > 0 && /* @__PURE__ */ s.jsxs("span", { className: "eta", children: [
                        "ETA ~",
                        Math.ceil(w.estimatedSecondsRemaining),
                        "s"
                      ] })
                    ] })
                  ] })
                ] }),
                p && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "OPERATOR" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val highlight-cyan", title: w.createdBy || "Guest Operator", children: [
                      "👤 ",
                      w.createdBy || "Guest Operator"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: S(w.fileSizeBytes) })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "DOWNLOADS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val", children: [
                      "📥 ",
                      w.downloadCount || 0
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "COMPLETED" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val", children: w.completedAtUtc ? new Date(w.completedAtUtc).toLocaleTimeString() : "--:--" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "RETENTION" }),
                    /* @__PURE__ */ s.jsx("span", { className: `val policy-tag ${w.isBookmarked ? "pinned" : ""}`, children: w.isBookmarked ? "★ PINNED" : "24H PURGE" })
                  ] })
                ] }),
                p && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${w.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (R) => N(W, R),
                        title: w.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: w.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (R) => b(w, R),
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
                      onClick: () => E(w),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                $ && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  w.errorMessage || w.error || "Export failed"
                ] }) })
              ]
            },
            W
          );
        }) })
      ] }) })
    ] }),
    document.body
  );
}
function Gy({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const o = i.useRef(null);
  if (i.useEffect(() => {
    if (!e) return;
    const v = (j) => {
      j.key === "Escape" && (t == null || t());
    }, M = (j) => {
      o.current && !o.current.contains(j.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", M), window.addEventListener("keydown", v), () => {
      window.removeEventListener("mousedown", M), window.removeEventListener("keydown", v);
    };
  }, [e, t]), !e || !e.station) return null;
  const { x: l, y: a, station: c } = e, u = c.displayName || c.hostname || c.name || c.id, d = 220, y = 160, m = Math.max(10, Math.min(l, (typeof window < "u" ? window.innerWidth : 1920) - d - 12)), f = Math.max(10, Math.min(a, (typeof window < "u" ? window.innerHeight : 1080) - y - 12));
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "station-context-menu-root",
      style: { top: `${f}px`, left: `${m}px` },
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
function Qy({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: o = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const l = r.canvasWidth || 2560, a = r.canvasHeight || 1440, c = l / a, u = r.resolution || "2K";
  let d;
  Math.abs(c - 16 / 9) < 0.05 ? d = "16:9 Broadcast" : Math.abs(c - 16 / 10) < 0.05 ? d = "16:10 WUXGA / WQXGA" : Math.abs(c - 19 / 10) < 0.05 ? d = "19:10 NOC Extended" : Math.abs(c - 32 / 9) < 0.15 ? d = "32:9 Dual Screen" : Math.abs(c - 21 / 9) < 0.15 ? d = "21:9 Ultrawide" : Math.abs(c - 4 / 3) < 0.15 ? d = "4:3 Standard" : d = `${Math.round(c * 100) / 100}:1 Custom`;
  const m = ((S, w) => {
    const p = Math.round(S * w / 2073600 * 6 * 10) / 10, $ = Math.round(p * 60 / 8 * 10) / 10;
    return `~${p} Mbps (~${$} MB/min)`;
  })(l, a), [f, v] = i.useState("BurnIn"), [M, j] = i.useState(""), [O, k] = i.useState(!1);
  if (!e) return null;
  const g = async () => {
    k(!0);
    try {
      await n(f, u, M), t();
    } finally {
      k(!1);
    }
  }, N = (r.layout || "DIRECTOR").toUpperCase(), b = r.stationsCount || 1, E = r.audioSegmentsCount || 1;
  return Ps.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (S) => S.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("span", { className: "dot" }),
          /* @__PURE__ */ s.jsx("h3", { children: o })
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
              N,
              "] (WYSIWYG ",
              d,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "CANVAS GEOMETRY:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value", children: [
              l,
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
              l,
              " × ",
              a,
              " (",
              u,
              " • WYSIWYG MATCH)"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "ESTIMATED BITRATE:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: m })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "ACTIVE STATIONS:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value", children: [
              b,
              " WORKSTATION",
              b > 1 ? "S" : ""
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUDIO MASTER MIX:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: E > 1 ? `DYNAMIC ROUTING (${E} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK & DISPLAY TOPOLOGY HUD)" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "UTC WALL CLOCK:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value enabled", children: [
              "PERMANENT (BURNED-IN AT ",
              cu(typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right"),
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
                l,
                " × ",
                a,
                " (",
                u,
                " • ",
                d,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "locked-res-metric", children: m })
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
              value: M,
              onChange: (S) => j(S.target.value),
              rows: 2,
              maxLength: 500
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "notes-char-counter", children: [
            M.length,
            " / 500"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: O, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: g, disabled: O, children: O ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${l}×${a})` })
      ] })
    ] }) }),
    document.body
  );
}
function Jy(e, t, n, r, o = null) {
  const [l, a] = i.useState([]), [c, u] = i.useState({}), [d, y] = i.useState(!1), m = i.useRef(l);
  m.current = l;
  const f = i.useCallback(async () => {
    if (isNaN(e)) return;
    const j = e + t;
    y(!0);
    try {
      const O = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(j),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${O.toString()}`);
      if (k.ok) {
        const g = k.headers.get("content-type");
        if (g && g.includes("application/json")) {
          const N = await k.json(), E = (Array.isArray(N) ? N : N.stations || N.items || []).filter((S) => (S.recordingsCount || (S.segments ? S.segments.length : 0)) > 0).map((S) => {
            var w, p;
            return {
              id: String(S.id || S.stationId || S.agentId || S.hostname),
              hostname: S.hostname || "Station",
              roleAlias: S.roleAlias || null,
              roleHistory: S.roleHistory || [],
              displayName: S.displayName || S.roleAlias || S.hostname || "Station",
              isOnline: S.isOnline !== void 0 ? S.isOnline : !0,
              recordingsCount: S.recordingsCount || 0,
              segments: S.segments || [],
              displays: S.displays || S.Displays || ((w = S.displayTopology) == null ? void 0 : w.displays) || ((p = S.DisplayTopology) == null ? void 0 : p.Displays) || [],
              displayTopology: S.displayTopology || S.DisplayTopology || null,
              directorPlan: S.directorPlan || S.DirectorPlan || null,
              hasAudio: !!S.hasAudio,
              audioCodec: S.audioCodec || "",
              audioChannels: S.audioChannels || 0,
              audioLabel: S.audioLabel || (S.hasAudio ? "AAC" : "NONE"),
              width: S.width || 1920,
              height: S.height || 1080,
              fps: S.fps || 30,
              isVfr: !!S.isVfr,
              resolution: S.resolution || "1080p",
              feedSpec: S.feedSpec || "1080p • 30fps"
            };
          });
          a((S) => {
            if (!S || S.length === 0) return E;
            const w = new Map(S.map((C) => [C.id, C]));
            let p = S.length !== E.length;
            const $ = E.map((C) => {
              const W = w.get(C.id);
              return W ? W.isOnline === C.isOnline && W.displayName === C.displayName && W.roleAlias === C.roleAlias && W.feedSpec === C.feedSpec && W.recordingsCount === C.recordingsCount && W.fps === C.fps ? W : (p = !0, { ...W, ...C }) : (p = !0, C);
            });
            return p ? $ : S;
          });
        }
      }
    } catch (O) {
      console.warn("[useStudioData] Failed fetching active stations:", O);
    } finally {
      y(!1);
    }
  }, [e, t, n.start, n.end, r]);
  i.useEffect(() => {
    f();
  }, [f]);
  const v = i.useMemo(() => {
    const j = /* @__PURE__ */ new Set();
    return l.forEach((O) => {
      O.id && j.add(O.id), O.hostname && j.add(O.hostname);
    }), Array.from(j).sort().join(",");
  }, [l]);
  i.useEffect(() => {
    if (!v || isNaN(e)) {
      u({});
      return;
    }
    let j = !0;
    return (async () => {
      try {
        const k = e + t, g = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(v)}&startEpoch=${e}&endEpoch=${k}`);
        if (g.ok && j) {
          const N = await g.json() || {}, b = {};
          (m.current || []).forEach((E) => {
            const S = N[E.id] || N[E.hostname] || N[E.displayName] || [];
            b[E.id] = S, b[E.hostname] = S;
          }), Object.keys(N).forEach((E) => {
            b[E] || (b[E] = N[E]);
          }), u(b);
        }
      } catch {
        j && u({});
      }
    })(), () => {
      j = !1;
    };
  }, [v, e, t]);
  const M = i.useMemo(() => {
    if (!l.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let j = 1 / 0, O = -1 / 0;
    l.forEach((b) => {
      (c[b.id] || c[b.hostname] || b.segments || []).forEach((S) => {
        const w = S.startEpochMs ?? S.startEpoch ?? 0, p = S.endEpochMs ?? S.endEpoch ?? 0;
        w > 0 && w < j && (j = w), p > 0 && p > O && (O = p);
      });
    });
    let k = 1 / 0, g = -1 / 0;
    o && (c[o] || []).forEach((E) => {
      const S = E.startEpochMs ?? E.startEpoch ?? 0, w = E.endEpochMs ?? E.endEpoch ?? 0;
      S > 0 && S < k && (k = S), w > 0 && w > g && (g = w);
    });
    const N = (b) => b === 1 / 0 || b === -1 / 0 ? null : Math.max(0, Math.min(t, b - e));
    return {
      globalFirstMs: N(j),
      globalLastMs: N(O),
      currentFirstMs: N(k),
      currentLastMs: N(g)
    };
  }, [l, c, o, e, t]);
  return {
    allStations: l,
    setAllStations: a,
    recordingSegments: c,
    setRecordingSegments: u,
    isLoadingStations: d,
    refetchStations: f,
    movieBoundaries: M
  };
}
function qy({
  timelineBaseEpochMs: e,
  inPointMs: t,
  outPointMs: n,
  globalGaps: r = [],
  activeStation: o,
  spotlightStation: l,
  recordingSegments: a = {},
  initialPlayheadMs: c = 0,
  initialIsPlaying: u = !1,
  initialIsLooping: d = !0,
  initialPlaybackSpeed: y = 1,
  isGridMode: m = !1
}) {
  const [f, v] = i.useState(c), [M, j] = i.useState(u), [O, k] = i.useState(d), [g, N] = i.useState(y), b = i.useRef(null), E = i.useRef(null), S = l || o, w = i.useMemo(() => S ? a[S.id] || S.segments || [] : [], [S, a]), p = w.some((ee) => {
    const I = ee.startEpochMs ?? ee.startEpoch ?? 0, R = ee.endEpochMs ?? ee.endEpoch ?? 0, ne = e + f;
    return ne >= I && ne <= R;
  }), $ = !!(!m && S && p);
  i.useEffect(() => {
    v((ee) => ee < t ? t : ee > n ? (j(!1), n) : ee);
  }, [t, n]);
  const C = i.useCallback((ee) => {
    b.current || (b.current = ee);
    const I = (ee - b.current) * g, R = Math.min(I, 250 * g);
    b.current = ee, v((ne) => {
      let se = ne + R;
      if (r && r.length > 0) {
        const oe = e + se, U = r.find((Y) => oe >= Y.startEpochMs && oe < Y.endEpochMs);
        U && (se = U.endEpochMs - e);
      }
      return se >= n && (O ? se = t : (j(!1), se = n)), se;
    }), M && (!$ || m) && (E.current = requestAnimationFrame(C));
  }, [M, O, t, n, r, e, $, g, m]);
  i.useEffect(() => (M && (!$ || m) ? (b.current = performance.now(), E.current = requestAnimationFrame(C)) : (E.current && cancelAnimationFrame(E.current), b.current = null), () => {
    E.current && cancelAnimationFrame(E.current);
  }), [M, C, $, m]);
  const W = i.useCallback(() => {
    if (M)
      j(!1);
    else {
      let ee = f;
      const I = e + ee, R = r == null ? void 0 : r.find((ne) => I >= ne.startEpochMs && I < ne.endEpochMs);
      if (R)
        ee = R.endEpochMs - e;
      else if (S && !p) {
        const ne = w.map((se) => ({ start: se.startEpochMs ?? se.startEpoch ?? 0, end: se.endEpochMs ?? se.endEpoch ?? 0 })).filter((se) => se.start > I).sort((se, oe) => se.start - oe.start)[0];
        ne && (ee = ne.start - e);
      }
      ee !== f && v(ee), j(!0);
    }
  }, [M, f, e, r, S, p, w]);
  return {
    playheadMs: f,
    setPlayheadMs: v,
    isPlaying: M,
    setIsPlaying: j,
    isLooping: O,
    setIsLooping: k,
    playbackSpeed: g,
    setPlaybackSpeed: N,
    togglePlaySmart: W
  };
}
function Zy(e) {
  return 1 - Math.pow(1 - e, 3);
}
function e1({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [o, l] = i.useState(n), [a, c] = i.useState(r), u = i.useRef(null), d = i.useRef(a);
  d.current = a;
  const y = i.useRef(o);
  y.current = o;
  const m = i.useRef(t);
  m.current = t;
  const f = Math.max(32, t / 2e3), v = t / o, M = i.useCallback((g, N = 280) => {
    u.current && cancelAnimationFrame(u.current);
    const b = d.current, E = g - b;
    if (Math.abs(E) < 1) return;
    const S = performance.now(), w = (p) => {
      const $ = p - S, C = Math.min(1, $ / N);
      c(Math.round(b + E * Zy(C))), C < 1 ? u.current = requestAnimationFrame(w) : u.current = null;
    };
    u.current = requestAnimationFrame(w);
  }, []), j = i.useCallback((g, N) => {
    const b = Math.max(1e3, N - g), E = Math.max(500, b * 0.05), S = Math.max(0, g - E), p = Math.min(t, N + E) - S, $ = Math.max(1, Math.min(f, Number((t / p).toFixed(1)))), C = t / $, W = Math.max(0, Math.min(S, t - C));
    M(W), l($);
  }, [t, f, M]), O = i.useCallback(() => {
    M(0), l(1);
  }, [M]), k = i.useCallback((g, N = "center") => {
    if (g == null) return;
    const b = N === "start" ? v / 4 : v * 0.75, E = Math.max(0, Math.min(g - b, t - v));
    M(E);
  }, [v, t, M]);
  return i.useEffect(() => () => {
    u.current && cancelAnimationFrame(u.current);
  }, []), i.useEffect(() => {
    let g = null;
    const N = (E) => {
      if (E.defaultPrevented) return;
      E.preventDefault(), E.stopPropagation();
      const S = E.ctrlKey || E.shiftKey, w = y.current, p = d.current, $ = m.current;
      if (S) {
        const C = Math.abs(E.deltaX) > Math.abs(E.deltaY) ? E.deltaX : E.deltaY;
        if (C === 0) return;
        const W = $ / Math.max(1, w), ee = Math.max(0, $ - W), I = W * 0.08 * (C > 0 ? 1 : -1);
        c((R) => Math.max(0, Math.min(ee, R + I)));
      } else {
        if (E.deltaY === 0) return;
        const W = E.deltaY < 0 ? 1.25 : 0.8, ee = Math.max(32, $ / 2e3), I = g ? g.getBoundingClientRect() : { left: 0, width: window.innerWidth }, R = Math.max(0, Math.min(I.width, E.clientX - I.left)), ne = I.width > 0 ? R / I.width : 0.5;
        l((se) => {
          const oe = Math.max(1, Math.min(ee, Math.round(se * W * 100) / 100));
          if (oe === se) return se;
          const U = $ / se, Y = $ / oe, H = p + ne * U - ne * Y, z = Math.max(0, $ - Y);
          return c(Math.max(0, Math.min(z, H))), oe;
        });
      }
    }, b = () => {
      const E = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return E && !g ? (g = E, g.addEventListener("wheel", N, { passive: !1, capture: !0 }), !0) : !!g;
    };
    if (!b()) {
      const E = setInterval(() => {
        b() && clearInterval(E);
      }, 100);
      return () => {
        clearInterval(E), g && g.removeEventListener("wheel", N, { capture: !0 });
      };
    }
    return () => {
      g && g.removeEventListener("wheel", N, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: o,
    setZoomLevel: l,
    viewportStartMs: a,
    setViewportStartMs: c,
    viewportDurationMs: v,
    animateViewportTo: M,
    fitRange: j,
    resetZoom: O,
    jumpViewportTo: k
  };
}
function t1({
  activeStationId: e,
  spotlightStationId: t,
  timelineStations: n = [],
  selectedStationIdsCount: r = 0,
  onSelectActiveStation: o,
  setPlaybackSpeed: l,
  playheadMs: a,
  setPlayheadMs: c,
  inPointMs: u,
  setInPointMs: d,
  outPointMs: y,
  setOutPointMs: m,
  totalTimelineDurationMs: f,
  zoomLevel: v = 1,
  togglePlaySmart: M,
  onToggleHelpModal: j,
  onSplitDirectorAtPlayhead: O,
  isModalActive: k = !1,
  hasGridPlacements: g = !0,
  onToggleGridFullscreen: N,
  isGridFullscreen: b = !1,
  onExitGridFullscreen: E,
  activeFocusZone: S = "timeline"
}) {
  i.useEffect(() => {
    const w = (p) => {
      const $ = p.target;
      if (!($.tagName === "INPUT" || $.tagName === "TEXTAREA" || $.tagName === "SELECT" || $.isContentEditable || $.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (p.key === "?" || p.shiftKey && p.code === "Slash") {
          p.preventDefault(), j == null || j();
          return;
        }
        if (!(k || t)) {
          if (p.code === "KeyI" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), d == null || d(Math.max(0, Math.min(a, y - 1e3)));
            return;
          }
          if (p.code === "KeyO" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), m == null || m(Math.min(f, Math.max(a, u + 1e3)));
            return;
          }
          if (p.code === "KeyX" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), d == null || d(0), m == null || m(f);
            return;
          }
          if (p.code === "KeyL" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), l == null || l((W) => W <= 0 ? 1 : W === 1 ? 2 : W === 2 ? 4 : W >= 4 ? 8 : 1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-forward"));
            return;
          }
          if (p.code === "KeyK" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), l == null || l(1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-pause"));
            return;
          }
          if (p.code === "KeyJ" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-reverse"));
            return;
          }
          if (p.code === "KeyM" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-mute"));
            return;
          }
          if (p.code === "Digit1" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 1 } }));
            return;
          }
          if (p.code === "Digit2" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 2 } }));
            return;
          }
          if (p.code === "Digit4" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 4 } }));
            return;
          }
          if (p.code === "KeyG" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-auto-grid"));
            return;
          }
          if (p.code === "KeyR" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-reset-canvas"));
            return;
          }
          if (p.code === "KeyF" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-fullscreen"));
            return;
          }
          if ((p.code === "Equal" || p.code === "NumpadAdd" || p.code === "Insert") && !p.ctrlKey && !p.metaKey) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-add-keyframe"));
            return;
          }
          if ((p.code === "Delete" || p.code === "Backspace") && window.dispatchEvent(new CustomEvent("itb:studio-delete-selected")), p.code === "BracketLeft") {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "in" } }));
            return;
          }
          if (p.code === "BracketRight") {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "out" } }));
            return;
          }
          if (p.code === "Backslash") {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-fit-cut"));
            return;
          }
          if (p.code === "KeyS") {
            if (p.ctrlKey || p.metaKey) {
              p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-save-now"));
              return;
            } else if (!p.altKey) {
              p.preventDefault(), O == null || O();
              return;
            }
          }
          if (p.code === "KeyZ" && (p.ctrlKey || p.metaKey)) {
            p.preventDefault(), p.shiftKey ? window.dispatchEvent(new CustomEvent("itb:studio-redo")) : window.dispatchEvent(new CustomEvent("itb:studio-undo"));
            return;
          }
          if (p.code === "KeyY" && (p.ctrlKey || p.metaKey)) {
            p.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-redo"));
            return;
          }
          if (p.code === "Space") {
            if (p.preventDefault(), !g) return;
            M();
            return;
          }
          if (p.code === "KeyF" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), N == null || N();
            return;
          }
          if ((p.key === "Escape" || p.code === "Escape") && b) {
            p.preventDefault(), E == null || E();
            return;
          }
          if (p.key === "Home") {
            p.preventDefault(), c == null || c(u);
            return;
          }
          if (p.key === "End") {
            p.preventDefault(), c == null || c(y);
            return;
          }
          if (p.code === "ArrowLeft" || p.code === "ArrowRight") {
            if (S === "canvas" && !p.ctrlKey && !p.altKey && !p.metaKey)
              return;
            p.preventDefault();
            const W = p.code === "ArrowLeft";
            let ee;
            if (p.ctrlKey || p.metaKey)
              ee = 33;
            else if (p.shiftKey)
              ee = 5e3;
            else {
              const I = Math.max(1, v);
              ee = Math.max(33, Math.round(1e3 / I));
            }
            c == null || c((I) => {
              const R = W ? I - ee : I + ee;
              return Math.max(0, Math.min(f, R));
            });
            return;
          }
          if (p.code === "ArrowDown" || p.code === "ArrowUp") {
            if (S === "canvas" && !p.ctrlKey && !p.altKey && !p.metaKey || !e || n.length <= 1) return;
            p.preventDefault();
            const W = n.findIndex((ee) => ee.id === e);
            if (W === -1) {
              o(n[0].id), l(1);
              return;
            }
            if (p.code === "ArrowDown") {
              const ee = (W + 1) % n.length;
              o(n[ee].id), l(1);
            } else {
              const ee = (W - 1 + n.length) % n.length;
              o(n[ee].id), l(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", w, { capture: !0 }), () => window.removeEventListener("keydown", w, { capture: !0 });
  }, [
    e,
    t,
    n,
    r,
    o,
    l,
    a,
    c,
    u,
    d,
    y,
    m,
    f,
    v,
    M,
    j,
    O,
    k,
    g,
    N,
    b,
    E,
    S
  ]);
}
const Gh = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = _h(n, e), o = _h(t, e);
  return {
    start: r.fullStr,
    end: o.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, fl = (e, t = null, n = "LOCAL") => {
  if (!e) return Date.now();
  if (typeof e == "number") return e;
  const r = String(e).trim();
  if (/^\d+$/.test(r)) return Number(r);
  if (r.endsWith("Z") || /[+-]\d{2}:?\d{2}$/.test(r)) {
    const u = Date.parse(r);
    if (!isNaN(u)) return u;
  }
  let o = r, l = t;
  if (!l) {
    if (r.includes("T")) {
      const u = r.split("T");
      o = u[0], l = u[1];
    } else if (r.includes(" ")) {
      const u = r.split(" ");
      o = u[0], l = u[1];
    }
  }
  if (o && l) {
    const u = l.replace(/[Zz].*$/, "").replace(/[+-]\d{2}:?\d{2}$/, "").substring(0, 8), d = Vr(o, u, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const a = r.replace(" ", "T"), c = new Date(a).getTime();
  return isNaN(c) ? Date.now() : c;
};
function n1() {
  var co, Zo;
  const e = i.useMemo(() => bx() || {}, []), [t, n] = i.useState(() => {
    var L, ie;
    return (L = e.timeRange) != null && L.startEpochMs && ((ie = e.timeRange) != null && ie.endEpochMs) ? e.timeRange : Gh();
  }), [r, o] = i.useState(e.timeMode || "LOCAL"), [l, a] = i.useState(e.keystrokeMode || "BURN_IN"), [c, u] = i.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !0);
  i.useEffect(() => {
    Nx().catch((L) => console.warn("[Studio] DST init error:", L));
  }, []);
  const d = i.useMemo(() => t.startEpochMs ? t.startEpochMs : fl(t.start, null, r), [t.start, t.startEpochMs, r]), y = i.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), m = i.useMemo(() => d - y, [d, y]), f = i.useMemo(() => t.durationMs + 2 * y, [t.durationMs, y]), [v, M] = i.useState(e.selectedStationIds || []), [j, O] = i.useState(e.activeStationId || null), [k, g] = i.useState(null), [N, b] = i.useState(null), [E, S] = i.useState([]), [w, p] = i.useState(!1), [$, C] = i.useState(null), [W, ee] = i.useState(() => {
    var L;
    return e.compositionScope || (((L = e.selectedStationIds) == null ? void 0 : L.length) > 1 ? "inter-station" : "intra-station");
  }), [I, R] = i.useState(() => {
    try {
      const L = localStorage.getItem("itb_composition_layout");
      if (L) return L;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), ne = i.useCallback((L) => {
    R((ie) => {
      const ce = typeof L == "function" ? L(ie) : L;
      try {
        localStorage.setItem("itb_composition_layout", ce);
      } catch {
      }
      return ce;
    });
  }, []), [se, oe] = i.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [U, Y] = i.useState(() => !!e.isPipSwapped), [T, H] = i.useState(() => e.audioRoutingPlan || null), [z, xe] = i.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [X, V] = i.useState(!1), [K, ge] = i.useState(null), [fe, ye] = i.useState(() => e.canvasLayoutTimeline || null), [De, Ce] = i.useState(0), Ie = i.useCallback((L) => {
    ye((ie) => {
      var _e;
      const ce = [...(ie == null ? void 0 : ie.keyframes) || []], ke = ce.findIndex((Ke) => Math.abs(Ke.timestampEpochMs - L) < 300);
      if (ke >= 0)
        return Ce(ke), ie;
      const $e = ce[De] || ce[0], Se = ($e == null ? void 0 : $e.layout) || K || {
        width: (K == null ? void 0 : K.width) || 2560,
        height: (K == null ? void 0 : K.height) || 1440,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, be = [...ce].reverse().find((Ke) => Ke.timestampEpochMs <= L) || $e, Be = (Se == null ? void 0 : Se.utcClockPosition) || (be == null ? void 0 : be.utcClockPosition) || ((_e = be == null ? void 0 : be.layout) == null ? void 0 : _e.utcClockPosition) || "top-right", Ge = JSON.parse(JSON.stringify(Se));
      Ge.utcClockPosition = Be;
      const We = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(L),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        utcClockPosition: Be,
        layout: Ge
      }, Pe = [...ce, We].sort((Ke, Wt) => Ke.timestampEpochMs - Wt.timestampEpochMs), Ve = Pe.findIndex((Ke) => Ke.timestampEpochMs === Math.round(L));
      return Ce(Ve >= 0 ? Ve : 0), {
        ...ie || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: Pe
      };
    });
  }, [De, K]), Ze = i.useCallback((L, ie) => {
    ye((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : uu(ce, L, ie));
  }, []), Xe = i.useCallback((L) => {
    ye((ie) => {
      if (!(ie != null && ie.keyframes) || ie.keyframes.length <= 1 || L === 0) return ie;
      const ce = ie.keyframes.filter((ke, $e) => $e !== L);
      return Ce((ke) => ke === L ? Math.max(0, L - 1) : ke > L ? ke - 1 : Math.min(ke, ce.length - 1)), { ...ie, keyframes: ce };
    });
  }, []), Ht = i.useCallback((L, ie) => {
    ye((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : du(ce, L, ie));
  }, []), Ot = i.useCallback((L, ie) => {
    ye((ce) => {
      if (!(ce != null && ce.keyframes) || ce.keyframes.length === 0) return ce;
      const ke = Math.round(ie), $e = typeof L == "number" && ce.keyframes[L] ? L : ce.keyframes.findIndex((Be) => Be.id === L);
      if ($e === -1) return ce;
      const Se = [...ce.keyframes];
      Se[$e] = {
        ...Se[$e],
        timestampEpochMs: ke
      }, Se.sort((Be, Ge) => Be.timestampEpochMs - Ge.timestampEpochMs);
      const be = Se.findIndex((Be) => Be.timestampEpochMs === ke);
      return be >= 0 && Ce(be), {
        ...ce,
        keyframes: Se
      };
    });
  }, []);
  i.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [ft, G] = i.useState({}), Le = i.useCallback((L) => {
    M((ie) => ie.filter((ce) => ce !== L)), j === L && O(null), k === L && g(null), ye((ie) => {
      if (!ie || !ie.keyframes) return ie;
      const ce = ie.keyframes.map((ke) => {
        var $e;
        return {
          ...ke,
          layout: {
            ...ke.layout,
            placements: ((($e = ke.layout) == null ? void 0 : $e.placements) || []).filter((Se) => Se.stationId !== L)
          }
        };
      });
      return { ...ie, keyframes: ce };
    });
  }, [j, k]), B = i.useCallback((L, ie) => {
    L.preventDefault(), L.stopPropagation();
    const ce = 195, ke = 110, $e = Math.min(L.clientX, window.innerWidth - ce - 10), Se = Math.min(L.clientY, window.innerHeight - ke - 10);
    C({ x: $e, y: Se, station: ie });
  }, []), D = i.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(f, e.inEpochMs - m)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(f, e.inPointMs)) : y, [e.inEpochMs, e.inPointMs, m, f, y]), J = i.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(D + 1e3, Math.min(f, e.outEpochMs - m)) : typeof e.outPointMs == "number" ? Math.max(D + 1e3, Math.min(f, e.outPointMs)) : y + t.durationMs, [e.outEpochMs, e.outPointMs, m, f, y, t.durationMs, D]), _ = i.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(f, e.playheadEpochMs - m)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(f, e.playheadMs)) : D, [e.playheadEpochMs, e.playheadMs, m, f, D]), [P, Q] = i.useState(D), [le, re] = i.useState(J);
  i.useEffect(() => {
    if (!m) return;
    const L = Math.round(m + P), ie = Math.round(m + le);
    ye((ce) => {
      var Be, Ge;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      let ke = [...ce.keyframes], $e = !1, Se = ke.find((We) => We.tag === "cut-in");
      if (Se)
        Se.timestampEpochMs !== L && (Se.timestampEpochMs = L, $e = !0);
      else {
        const We = ke.find((Pe) => Math.abs(Pe.timestampEpochMs - L) < 500);
        if (We)
          We.tag = "cut-in", We.timestampEpochMs = L, $e = !0;
        else {
          const Pe = ((Be = ke[0]) == null ? void 0 : Be.layout) || K || { width: 1920, height: 1080, placements: [] };
          ke.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: L,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Pe))
          }), $e = !0;
        }
      }
      let be = ke.find((We) => We.tag === "cut-out");
      if (be)
        be.timestampEpochMs !== ie && (be.timestampEpochMs = ie, $e = !0);
      else {
        const We = ke.find((Pe) => Math.abs(Pe.timestampEpochMs - ie) < 500 && Pe.tag !== "cut-in");
        if (We)
          We.tag = "cut-out", We.timestampEpochMs = ie, $e = !0;
        else {
          const Pe = ((Ge = ke[ke.length - 1]) == null ? void 0 : Ge.layout) || K || { width: 1920, height: 1080, placements: [] };
          ke.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: ie,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Pe))
          }), $e = !0;
        }
      }
      return $e ? (ke.sort((We, Pe) => We.timestampEpochMs - Pe.timestampEpochMs), {
        ...ce,
        keyframes: ke
      }) : ce;
    });
  }, [m, P, le, K]);
  const { allStations: we, recordingSegments: Ee, isLoadingStations: ze, movieBoundaries: st } = Jy(
    m,
    f,
    t,
    r,
    j
  ), Je = i.useMemo(() => we.find((L) => L.id === j) || null, [we, j]), pt = i.useCallback((L) => {
    G((ie) => {
      const ce = !(ie[L] ?? !0);
      return ye((ke) => {
        if (!(ke != null && ke.keyframes)) return ke;
        const $e = ke.keyframes.map((Se) => {
          var We;
          const be = ((We = Se.layout) == null ? void 0 : We.placements) || [];
          let Be = !1;
          const Ge = be.map((Pe) => {
            if (Pe.stationId === L) {
              if (!ce && (Pe.displayId === "auto" || !Pe.displayId)) {
                Be = !0;
                const Ve = we.find((_e) => _e.id === L);
                return {
                  ...Pe,
                  displayId: "mon-0",
                  label: `${(Ve == null ? void 0 : Ve.displayName) || L} - Screen 1 (Main)`
                };
              } else if (ce && (Pe.displayId === "mon-0" || !Pe.displayId) && be.filter((_e) => _e.stationId === L).length === 1) {
                Be = !0;
                const _e = we.find((Ke) => Ke.id === L);
                return {
                  ...Pe,
                  displayId: "auto",
                  label: `${(_e == null ? void 0 : _e.displayName) || L} - Central Composition (Auto-Director)`
                };
              }
            }
            return Pe;
          });
          return Be ? {
            ...Se,
            layout: {
              ...Se.layout,
              placements: Ge
            }
          } : Se;
        });
        return { ...ke, keyframes: $e };
      }), {
        ...ie,
        [L]: ce
      };
    });
  }, [we]), ut = i.useCallback((L, ie) => {
    ye((ce) => {
      var Pe, Ve;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      const ke = De >= 0 && De < ce.keyframes.length ? De : 0, $e = ce.keyframes[ke], Se = ((Pe = $e == null ? void 0 : $e.layout) == null ? void 0 : Pe.placements) || [], be = (ie || "mon-0").toLowerCase(), Be = Se.findIndex((_e) => {
        if (_e.stationId !== L) return !1;
        const Ke = (_e.displayId || "mon-0").toLowerCase();
        return Ke === be || Ke === "auto" && (be === "mon-0" || be === "screen-0");
      });
      let Ge;
      if (Be >= 0)
        Ge = Se.filter((_e, Ke) => Ke !== Be);
      else {
        const _e = we.find((he) => he.id === L), Ke = ((Ve = _e == null ? void 0 : _e.displays) == null ? void 0 : Ve.find((he) => (he.displayId || "").toLowerCase() === be)) || { width: 1920, height: 1080 }, Wt = Ke.width || 1920, jt = Ke.height || 1080, xt = Wt / jt, us = xt >= 1 ? 640 : Math.round(360 * xt), Ct = xt >= 1 ? Math.round(640 / xt) : 360, Lt = {
          stationId: L,
          displayId: be,
          label: `${(_e == null ? void 0 : _e.displayName) || L} - ${Ke.displayName || be}`,
          x: 120 + Se.length * 40 % 800,
          y: 100 + Se.length * 40 % 500,
          width: us,
          height: Ct,
          sourceWidth: Wt,
          sourceHeight: jt,
          nativeAspectRatio: xt,
          aspectRatio: xt,
          zIndex: Se.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ge = [...Se, Lt];
      }
      const We = [...ce.keyframes];
      return We[ke] = {
        ...We[ke],
        layout: {
          ...We[ke].layout,
          placements: Ge
        }
      }, { ...ce, keyframes: We };
    });
  }, [De, we]), nt = i.useMemo(() => !v || v.length === 0 ? [] : we.filter((L) => v.includes(L.id)), [we, v]);
  i.useEffect(() => {
    !m || isNaN(m) || ye((L) => {
      if (L != null && L.keyframes && L.keyframes.length > 0) return L;
      const ie = m + (P || 0), ce = m + (le || f || 36e5), ke = (K == null ? void 0 : K.width) || 2560, $e = (K == null ? void 0 : K.height) || 1440, Se = K || {
        width: ke,
        height: $e,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      };
      return {
        width: ke,
        height: $e,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: [
          {
            id: `kf_root_${ie}`,
            timestampEpochMs: Math.round(ie),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Se))
          },
          {
            id: `kf_out_${ce}`,
            timestampEpochMs: Math.round(ce),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Se))
          }
        ]
      };
    });
  }, [m, P, le, f, K]), i.useEffect(() => {
    if (!nt || nt.length === 0 || !m || isNaN(m)) return;
    const L = m, ie = m + (f || 36e5);
    if (ie <= L) return;
    const ce = new AbortController(), ke = setTimeout(() => {
      nt.forEach(($e) => {
        _a.fetchWaveform($e.id, L, ie, ce.signal, 250);
      });
    }, 300);
    return () => {
      clearTimeout(ke), ce.abort();
    };
  }, [nt, m, f]);
  const tt = i.useMemo(() => we.find((L) => L.id === k) || null, [we, k]), en = !!(k && tt), _t = i.useRef("grid"), bt = i.useRef(null), {
    playheadMs: it,
    setPlayheadMs: mt,
    isPlaying: gt,
    setIsPlaying: Dt,
    playbackSpeed: pn,
    setPlaybackSpeed: Nt,
    isLooping: tn,
    setIsLooping: Gt,
    togglePlaySmart: He
  } = qy({
    timelineBaseEpochMs: m,
    inPointMs: P,
    outPointMs: le,
    globalGaps: E,
    activeStation: Je,
    spotlightStation: tt,
    recordingSegments: Ee,
    initialPlayheadMs: _,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !j
  }), {
    zoomLevel: pe,
    setZoomLevel: Ue,
    viewportStartMs: kt,
    setViewportStartMs: de,
    resetZoom: te,
    fitRange: ue,
    jumpViewportTo: je
  } = e1({
    containerRef: bt,
    totalTimelineDurationMs: f,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [Fe, et] = i.useState(!1), [rt, wt] = i.useState(!1), [at, dt] = i.useState(!1), [Kt, Ft] = i.useState(!1), [Qt, Jt] = i.useState(
    !!(e.isWorkspaceActive && ((co = e.selectedStationIds) == null ? void 0 : co.length) > 0)
  ), [xn, yn] = i.useState([]), as = i.useMemo(() => nt && nt.length > 0 ? nt : Je ? [Je] : tt ? [tt] : [], [nt, Je, tt]), Jn = i.useMemo(() => as.map((L) => `${L.id}:${L.hostname || L.id}:${L.displayName || ""}`).join("|"), [as]);
  i.useEffect(() => {
    const ie = (l || "NONE").toUpperCase().replace("-", "_") === "BURN_IN" || c;
    if (!as.length || !m || !ie) {
      yn([]);
      return;
    }
    const ce = Math.max(0, m - 5e3), ke = m + f + 5e3, $e = new AbortController(), Se = as.map((be) => {
      const Be = be.hostname || be.displayName || be.id, Ge = be.displayName || be.hostname || be.name || be.id;
      return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(Be)}&startEpoch=${ce}&endEpoch=${ke}`, { signal: $e.signal }).then((We) => We.ok ? We.json() : []).then((We) => (Array.isArray(We) ? We : []).map((Pe) => ({
        ...Pe,
        stationId: be.id,
        stationName: Ge,
        stationHostname: be.hostname || be.id
      }))).catch((We) => {
        if (We.name !== "AbortError") return [];
        throw We;
      });
    });
    return Promise.all(Se).then((be) => {
      const Be = be.flat();
      Be.sort((Ge, We) => (Ge.epochMs || 0) - (We.epochMs || 0)), yn(Be);
    }).catch((be) => {
      be.name !== "AbortError" && yn([]);
    }), () => $e.abort();
  }, [Jn, m, f, l, c]), i.useEffect(() => {
    ze || (we.length === 0 ? ((v.length > 0 || j || Qt) && (M([]), O(null), g(null), Jt(!1)), Ft(!0), p(!0)) : (p(!1), M((L) => {
      const ie = L.filter((ce) => we.some((ke) => ke.id === ce));
      return ie.length !== L.length ? (ie.length === 0 && (Jt(!1), Ft(!0)), ie) : L;
    })));
  }, [ze, we]);
  const is = i.useCallback((L) => {
    if (L === null) {
      Dt(!1), Nt(1), O(null);
      return;
    }
    L !== j && Nt(1), O(L);
  }, [j, Dt, Nt]), ys = i.useCallback((L, ie = null) => {
    L !== j && Nt(1), _t.current = v.length <= 1 || j ? "spotlight" : "grid", O(L), g(L), b(ie || null);
  }, [j, v.length, Nt]), io = i.useCallback(() => {
    g(null), b(null), _t.current === "grid" && O(null);
  }, []), nn = i.useMemo(() => {
    if (T != null && T.segments && T.segments.length > 0)
      return T;
    const L = v[0] || j || "mon-0";
    return {
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + f,
          sourceStationId: L
        }
      ]
    };
  }, [T, v, j, m, f]), _s = i.useCallback((L) => {
    H((ie) => {
      const ce = ie || nn, ke = [...ce.segments || []], $e = ke.findIndex((Ve) => {
        const _e = Ve.startEpochMs ?? Ve.StartEpochMs ?? 0, Ke = Ve.endEpochMs ?? Ve.EndEpochMs ?? 0;
        return L > _e + 500 && L < Ke - 500;
      });
      if ($e === -1) return ie;
      const Se = ke[$e], be = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Be = Se.endEpochMs ?? Se.EndEpochMs ?? 0, Ge = Se.sourceStationId ?? Se.SourceStationId ?? v[0], We = { startEpochMs: be, endEpochMs: L, sourceStationId: Ge }, Pe = { startEpochMs: L, endEpochMs: Be, sourceStationId: Ge };
      return ke.splice($e, 1, We, Pe), { ...ce, segments: ke };
    });
  }, [nn, v]), Go = i.useCallback((L, ie) => {
    H((ce) => {
      const ke = ce || nn, $e = (ke.segments || []).map((Se) => {
        const be = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Be = Se.endEpochMs ?? Se.EndEpochMs ?? 0;
        return L >= be && L <= Be ? { ...Se, sourceStationId: ie } : Se;
      });
      return { ...ke, segments: $e };
    }), xe(!1);
  }, [nn]), Qo = i.useCallback((L, ie) => {
    H((ce) => {
      const ke = ce || nn, $e = (ke.segments || []).map((Se) => {
        const be = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Be = Se.endEpochMs ?? Se.EndEpochMs ?? 0;
        return L >= be && L <= Be ? { ...Se, gain: ie } : Se;
      });
      return { ...ke, segments: $e };
    });
  }, [nn]), er = i.useCallback(() => {
    xe((L) => !L);
  }, []), [qn, Ln] = i.useState({}), On = i.useCallback((L) => {
    if (!L) return null;
    if (qn[L]) return qn[L];
    const ie = we.find((ce) => ce.id === L);
    return ie != null && ie.directorPlan ? ie.directorPlan : {
      stationId: L,
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + f,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [qn, we, m, f]), tr = i.useCallback((L, ie) => {
    L && Ln((ce) => {
      const ke = ce[L] || On(L), $e = [...ke.segments || []], Se = $e.findIndex((Ke) => {
        const Wt = Ke.startEpochMs ?? Ke.StartEpochMs ?? 0, jt = Ke.endEpochMs ?? Ke.EndEpochMs ?? 0;
        return ie > Wt + 500 && ie < jt - 500;
      });
      if (Se === -1) return ce;
      const be = $e[Se], Be = be.startEpochMs ?? be.StartEpochMs ?? 0, Ge = be.endEpochMs ?? be.EndEpochMs ?? 0, We = be.targetDisplayId ?? be.TargetDisplayId ?? "mon-0", Pe = !!(be.isManualOverride ?? be.IsManualOverride), Ve = { ...be, startEpochMs: Be, endEpochMs: ie, targetDisplayId: We, isManualOverride: Pe }, _e = { ...be, startEpochMs: ie, endEpochMs: Ge, targetDisplayId: We, isManualOverride: Pe };
      return $e.splice(Se, 1, Ve, _e), { ...ce, [L]: { ...ke, segments: $e } };
    });
  }, [On]), dn = i.useCallback((L, ie, ce) => {
    L && Ln((ke) => {
      const $e = ke[L] || On(L), Se = [...$e.segments || []];
      let be = Se.findIndex((Ge) => {
        const We = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Pe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ie > We && ie < Pe;
      });
      if (be === -1 && (be = Se.findIndex((Ge) => {
        const We = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Pe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ie >= We && ie <= Pe;
      })), be === -1) return ke;
      const Be = Se[be];
      return Se[be] = { ...Be, targetDisplayId: ce, isManualOverride: !0 }, { ...ke, [L]: { ...$e, segments: Se } };
    });
  }, [On]), En = i.useCallback((L, ie) => {
    if (!L) return;
    const ce = we.find(($e) => $e.id === L), ke = ce == null ? void 0 : ce.directorPlan;
    Ln(($e) => {
      var Wt;
      const Se = $e[L] || On(L), be = [...Se.segments || []];
      let Be = be.findIndex((jt) => {
        const xt = jt.startEpochMs ?? jt.StartEpochMs ?? 0, us = jt.endEpochMs ?? jt.EndEpochMs ?? 0;
        return ie > xt && ie < us;
      });
      if (Be === -1 && (Be = be.findIndex((jt) => {
        const xt = jt.startEpochMs ?? jt.StartEpochMs ?? 0, us = jt.endEpochMs ?? jt.EndEpochMs ?? 0;
        return ie >= xt && ie <= us;
      })), Be === -1) return $e;
      const Ge = be[Be], We = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Pe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0, Ve = (We + Pe) / 2, _e = (Wt = ke == null ? void 0 : ke.segments) == null ? void 0 : Wt.find((jt) => {
        const xt = jt.startEpochMs ?? jt.StartEpochMs ?? 0, us = jt.endEpochMs ?? jt.EndEpochMs ?? 0;
        return Ve >= xt && Ve <= us;
      }), Ke = _e ? _e.targetDisplayId ?? _e.TargetDisplayId ?? "mon-0" : "mon-0";
      return be[Be] = { ...Ge, targetDisplayId: Ke, isManualOverride: !1 }, { ...$e, [L]: { ...Se, segments: be } };
    });
  }, [we, On]);
  i.useEffect(() => {
    if (!nt || nt.length === 0 || isNaN(m)) return;
    const L = m + P, ie = m + le;
    if (ie <= L) return;
    const ce = setTimeout(async () => {
      const ke = nt.filter(($e) => {
        var be;
        return ($e.displays || $e.Displays || ((be = $e.displayTopology) == null ? void 0 : be.displays) || []).length > 1;
      });
      if (ke.length !== 0)
        for (const $e of ke)
          try {
            const Se = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent($e.id)}&startEpoch=${L}&endEpoch=${ie}`);
            if (Se.ok) {
              const be = await Se.json();
              be != null && be.segments && be.segments.length > 0 && Ln((Be) => {
                const Ge = Be[$e.id] || $e.directorPlan, We = ((Ge == null ? void 0 : Ge.segments) || []).filter((Ve) => Ve.isManualOverride || Ve.IsManualOverride);
                if (We.length === 0)
                  return { ...Be, [$e.id]: be };
                const Pe = [...be.segments];
                return We.forEach((Ve) => {
                  const _e = Ve.startEpochMs ?? Ve.StartEpochMs, Ke = Ve.endEpochMs ?? Ve.EndEpochMs;
                  for (let Wt = Pe.length - 1; Wt >= 0; Wt--) {
                    const jt = Pe[Wt].startEpochMs ?? Pe[Wt].StartEpochMs, xt = Pe[Wt].endEpochMs ?? Pe[Wt].EndEpochMs;
                    if (!(xt <= _e || jt >= Ke))
                      if (jt >= _e && xt <= Ke)
                        Pe.splice(Wt, 1);
                      else if (jt < _e && xt > Ke) {
                        const us = { ...Pe[Wt], endEpochMs: _e }, Ct = { ...Pe[Wt], startEpochMs: Ke };
                        Pe.splice(Wt, 1, us, Ct);
                      } else jt < _e ? Pe[Wt].endEpochMs = _e : xt > Ke && (Pe[Wt].startEpochMs = Ke);
                  }
                  Pe.push(Ve);
                }), Pe.sort((Ve, _e) => (Ve.startEpochMs ?? Ve.StartEpochMs) - (_e.startEpochMs ?? _e.StartEpochMs)), { ...Be, [$e.id]: { ...be, segments: Pe } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(ce);
  }, [P, le, nt, m]);
  const kn = i.useMemo(() => nt.map((L) => ({
    ...L,
    directorPlan: qn[L.id] || L.directorPlan || On(L.id)
  })), [nt, qn, On]), $t = i.useMemo(() => Je ? {
    ...Je,
    directorPlan: qn[Je.id] || Je.directorPlan || On(Je.id)
  } : null, [Je, qn, On]), Or = i.useMemo(() => tt ? {
    ...tt,
    directorPlan: qn[tt.id] || tt.directorPlan || On(tt.id)
  } : null, [tt, qn, On]), Bn = (L, ie = 30) => {
    const ce = Math.max(0, L), ke = Math.floor(ce / 1e3), $e = Math.floor(ke / 3600), Se = Math.floor(ke % 3600 / 60), be = ke % 60, Be = Math.floor(ce % 1e3 / 1e3 * ie), Ge = (We) => String(We).padStart(2, "0");
    return `${Ge($e)}:${Ge(Se)}:${Ge(be)}.${Ge(Be)}`;
  }, [Vt, vs] = i.useState(!1), [Dr, Is] = i.useState(!0), [Pr, Jo] = i.useState(!1), Rt = i.useRef(null), mn = i.useMemo(() => {
    var ke;
    const L = fe == null ? void 0 : fe.keyframes, ie = (L == null ? void 0 : L[De]) || (L == null ? void 0 : L[0]);
    return (((ke = ie == null ? void 0 : ie.layout) == null ? void 0 : ke.placements) || (K == null ? void 0 : K.placements) || []).length > 0 || v && v.length > 0;
  }, [fe, De, K, v]), nr = i.useCallback(() => {
    Rt.current && clearTimeout(Rt.current), Is(!0), Rt.current = setTimeout(() => {
      Pr || Is(!1);
    }, 2500);
  }, [Pr]);
  i.useEffect(() => {
    if (!Vt) {
      Is(!0), Rt.current && clearTimeout(Rt.current);
      return;
    }
    const L = (ie) => {
      ie.clientY >= window.innerHeight - 280 && Is(!0), nr();
    };
    return window.addEventListener("mousemove", L, { passive: !0 }), nr(), () => {
      window.removeEventListener("mousemove", L), Rt.current && clearTimeout(Rt.current);
    };
  }, [Vt, nr]);
  const Yt = i.useCallback(() => {
    vs((L) => {
      const ie = !L;
      return ie ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), ie;
    });
  }, []), _r = i.useCallback(() => {
    vs(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  i.useEffect(() => {
    var L, ie, ce, ke;
    return Vt ? ((ie = (L = document.body) == null ? void 0 : L.classList) == null || ie.add("is-studio-fullscreen"), window.dispatchEvent(new CustomEvent("itb:studio-fullscreen-change", {
      detail: { isFullscreen: !0 }
    }))) : ((ke = (ce = document.body) == null ? void 0 : ce.classList) == null || ke.remove("is-studio-fullscreen"), window.dispatchEvent(new CustomEvent("itb:studio-fullscreen-change", {
      detail: { isFullscreen: !1 }
    }))), () => {
      var $e, Se;
      (Se = ($e = document.body) == null ? void 0 : $e.classList) == null || Se.remove("is-studio-fullscreen");
    };
  }, [Vt]), i.useEffect(() => {
    const L = () => {
      !document.fullscreenElement && Vt && vs(!1);
    };
    return document.addEventListener("fullscreenchange", L), () => document.removeEventListener("fullscreenchange", L);
  }, [Vt]);
  const [At, cs] = i.useState("timeline");
  t1({
    activeFocusZone: At,
    activeStationId: j,
    spotlightStationId: k,
    timelineStations: kn,
    selectedStationIdsCount: v.length,
    onSelectActiveStation: is,
    setPlaybackSpeed: Nt,
    playheadMs: it,
    setPlayheadMs: mt,
    inPointMs: P,
    setInPointMs: Q,
    outPointMs: le,
    setOutPointMs: re,
    totalTimelineDurationMs: f,
    zoomLevel: pe,
    togglePlaySmart: He,
    onToggleHelpModal: () => dt((L) => !L),
    onSplitDirectorAtPlayhead: () => {
      var ie, ce, ke;
      const L = j || (v.length === 1 ? v[0] : null);
      if (L) {
        const $e = we.find((be) => be.id === L);
        (((ie = $e == null ? void 0 : $e.displays) == null ? void 0 : ie.length) > 1 || ((ke = (ce = $e == null ? void 0 : $e.topology) == null ? void 0 : ce.displays) == null ? void 0 : ke.length) > 1) && tr(L, m + it);
      }
    },
    isModalActive: Fe || rt || at,
    hasGridPlacements: mn,
    onToggleGridFullscreen: Yt,
    isGridFullscreen: Vt,
    onExitGridFullscreen: _r
  }), i.useEffect(() => {
    const L = m + P, ie = m + le, ce = m + it;
    mm({
      timeRange: t,
      timeMode: r,
      inPointMs: P,
      outPointMs: le,
      playheadMs: Math.round(it),
      inEpochMs: L,
      outEpochMs: ie,
      playheadEpochMs: ce,
      selectedStationIds: v,
      activeStationId: j,
      zoomLevel: pe,
      viewportStartMs: kt,
      isWorkspaceActive: Qt,
      isLooping: tn,
      playbackSpeed: pn,
      keystrokeMode: l,
      showRulerKeystrokes: c,
      compositionScope: W,
      compositionLayout: I,
      isAutoDirectorEnabled: se,
      isPipSwapped: U,
      audioRoutingPlan: nn,
      isAutoFollowAudio: z,
      canvasLayoutTimeline: fe
    });
  }, [
    t,
    r,
    P,
    le,
    it,
    v,
    j,
    pe,
    kt,
    Qt,
    tn,
    pn,
    m,
    l,
    c,
    W,
    I,
    se,
    U,
    nn,
    z,
    fe
  ]);
  const qo = i.useCallback((L) => {
    var We, Pe;
    const ie = fl(L.startTime), ce = fl(L.endTime), ke = Math.max(0, ce - ie) || 144e5, $e = {
      start: L.startTime,
      end: L.endTime,
      durationMs: ke,
      startEpochMs: ie,
      endEpochMs: ce
    }, Se = Math.max(6e4, Math.round(ke * 0.05)), be = ie - Se, Be = ke + 2 * Se;
    if (n($e), L.inEpochMs && L.outEpochMs) {
      const Ve = Math.max(0, Math.min(Be, L.inEpochMs - be)), _e = Math.max(Ve + 1e3, Math.min(Be, L.outEpochMs - be)), Ke = L.playheadEpochMs ? Math.max(0, Math.min(Be, L.playheadEpochMs - be)) : Ve;
      Q(Ve), re(_e), mt(Ke);
    } else {
      const Ve = typeof L.inPointMs == "number" ? L.inPointMs : Se, _e = typeof L.outPointMs == "number" ? L.outPointMs : Se + ke, Ke = typeof L.playheadMs == "number" ? L.playheadMs : Ve;
      Q(Math.max(0, Math.min(Be, Ve))), re(Math.max(0, Math.min(Be, _e))), mt(Math.max(0, Math.min(Be, Ke)));
    }
    const Ge = ((We = L.selectedStationIds) == null ? void 0 : We.length) > 0 ? L.selectedStationIds : ((Pe = L.cutStationIds) == null ? void 0 : Pe.length) > 0 ? L.cutStationIds : L.stationIds;
    if ((Ge == null ? void 0 : Ge.length) > 0) {
      M(Ge);
      const Ve = L.spotlightStationId || L.SpotlightStationId || null, _e = L.activeStationId || L.ActiveStationId || null;
      Ve && Ge.includes(Ve) ? (O(Ve), g(Ve)) : _e && Ge.includes(_e) ? (O(_e), g(null)) : (O(null), g(null));
    }
    L.keystrokeMode && a(L.keystrokeMode), Jt(!0), Ft(!1);
  }, []), Oe = i.useCallback((L) => {
    const ie = L.startEpochMs || fl(L.start, null, r), ce = L.endEpochMs || fl(L.end, null, r), ke = Math.max(0, ce - ie) || 144e5, $e = Math.max(6e4, Math.round(ke * 0.05)), Se = ie - $e, be = ke + 2 * $e;
    n({
      ...L,
      startEpochMs: ie,
      endEpochMs: ce,
      durationMs: ke
    }), p(!1), Q($e), re($e + ke), mt($e), ye((Be) => {
      if (!(Be != null && Be.keyframes) || Be.keyframes.length === 0) return Be;
      const Ge = Be.keyframes.map((We, Pe) => Pe === 0 ? { ...We, timestampEpochMs: Se } : We).filter((We) => We.timestampEpochMs >= Se && We.timestampEpochMs <= Se + be);
      return { ...Be, keyframes: Ge };
    }), H((Be) => {
      if (!(Be != null && Be.segments) || Be.segments.length === 0) return Be;
      if (!Be.segments.some((We) => {
        const Pe = We.startEpochMs ?? We.StartEpochMs ?? 0;
        return (We.endEpochMs ?? We.EndEpochMs ?? 0) > Se && Pe < Se + be;
      })) {
        const We = v[0] || j || "station-0";
        return {
          segments: [
            {
              startEpochMs: Se,
              endEpochMs: Se + be,
              sourceStationId: We
            }
          ]
        };
      }
      return Be;
    }), Ln({});
  }, [r, v, j]), Re = i.useCallback(() => {
    if (nt.map((ie) => ie.id).length === 0) return alert("No active stations selected in timeline.");
    V(!0);
  }, [nt]), dd = i.useCallback(async (L, ie, ce = "") => {
    var Ge, We, Pe, Ve;
    const ke = nt.map((_e) => _e.id);
    if (ke.length === 0) return;
    let $e = L === "None" ? "None" : "BurnIn";
    const Se = ie || "NATIVE", be = {};
    nt.forEach((_e) => {
      var Wt;
      const Ke = qn[_e.id] || _e.directorPlan;
      ((Wt = Ke == null ? void 0 : Ke.segments) == null ? void 0 : Wt.length) > 0 && (be[_e.id] = Ke.segments.map((jt) => ({
        startEpochMs: jt.startEpochMs ?? jt.StartEpochMs ?? 0,
        endEpochMs: jt.endEpochMs ?? jt.EndEpochMs ?? 0,
        targetDisplayId: jt.targetDisplayId ?? jt.TargetDisplayId ?? "mon-0",
        targetDisplayNumber: jt.targetDisplayNumber ?? jt.TargetDisplayNumber ?? 1,
        targetDisplayName: jt.targetDisplayName ?? jt.TargetDisplayName ?? "Screen 1",
        isManualOverride: !!(jt.isManualOverride ?? jt.IsManualOverride)
      })));
    });
    const Be = be[$t == null ? void 0 : $t.id] || ((Ge = $t == null ? void 0 : $t.displays) == null ? void 0 : Ge.length) > 1 || ((Pe = (We = $t == null ? void 0 : $t.topology) == null ? void 0 : We.displays) == null ? void 0 : Pe.length) > 1 ? ((Ve = $t == null ? void 0 : $t.directorPlan) == null ? void 0 : Ve.segments) || [] : [];
    try {
      const _e = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: Sm(),
          notes: (ce || "").trim(),
          stationIds: ke,
          inEpochMs: m + P,
          outEpochMs: m + le,
          keystrokeMode: $e,
          resolution: Se || (fe == null ? void 0 : fe.resolution) || (K == null ? void 0 : K.resolution) || "2K",
          videoQuality: Se || (fe == null ? void 0 : fe.resolution) || (K == null ? void 0 : K.resolution) || "2K",
          compositionScope: W,
          layoutMode: "canvas",
          canvasLayout: K,
          canvasLayoutTimeline: fe || (K == null ? void 0 : K.timeline) || null,
          isPipSwapped: U,
          isAutoDirectorEnabled: se,
          directorSegments: Be,
          stationDirectorSegments: be,
          audioRoutingSegments: nn.segments || [],
          utcClockPosition: (() => {
            var Ke, Wt;
            if ((Wt = (Ke = fe == null ? void 0 : fe.keyframes) == null ? void 0 : Ke[0]) != null && Wt.utcClockPosition)
              return fe.keyframes[0].utcClockPosition;
            if (K != null && K.utcClockPosition)
              return K.utcClockPosition;
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!_e.ok) {
        const Ke = await _e.json().catch(() => ({}));
        throw new Error(Ke.message || Ke.error || `HTTP ${_e.status}`);
      }
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (_e) {
      console.error("[Studio] Export failed:", _e), alert(`Failed to launch background master MP4 export job: ${_e.message}`);
    }
  }, [nt, m, P, le, W, K, fe, U, se, $t, nn]), Fr = i.useCallback(() => {
    Mx();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const L = Gh(), ie = Math.max(6e4, Math.round(L.durationMs * 0.05));
    n(L), Q(ie), re(ie + L.durationMs), mt(ie), M([]), O(null), g(null), Dt(!1), Nt(1), a("BURN_IN"), te(), Jt(!1), Ft(!0);
  }, [te, Dt, Nt, mt]), sr = !Qt || v.length === 0, Wr = m + it;
  return i.useEffect(() => {
    const L = fe == null ? void 0 : fe.keyframes;
    if (!L || L.length === 0) return;
    let ie = 0;
    for (let ce = 0; ce < L.length && L[ce].timestampEpochMs <= Wr + 50; ce++)
      ie = ce;
    ie !== De && Ce(ie);
  }, [Wr, fe == null ? void 0 : fe.keyframes, De]), /* @__PURE__ */ s.jsxs("div", { className: `extractor-advanced-studio ${Vt ? "is-cinema-mode" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Cx,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: o,
          activeStationId: j,
          hideBackToGrid: nt.length <= 1,
          onResetActiveStation: () => is(null),
          onOpenRangeModal: () => et(!0),
          onOpenBookmarksModal: () => wt(!0),
          onOpenHelpModal: () => dt(!0),
          onToggleDrawer: () => Ft(!Kt),
          isInitialSetup: sr,
          selectedCount: v.length,
          totalCount: we.length,
          onResetStudio: Fr
        }
      ),
      w && /* @__PURE__ */ s.jsxs("div", { className: "studio-scope-alert-banner", children: [
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
              onClick: () => p(!1),
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
            onMouseDown: (L) => {
              L.target.closest(".studio-bottom-timeline, .transport-bar-root, .transport-bar, .timeline-board") && cs("timeline");
            },
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
                /* @__PURE__ */ s.jsx(
                  Zx,
                  {
                    activeStation: $t,
                    timelineStations: kn,
                    allStations: we,
                    onSelectActiveStation: is,
                    onOpenSpotlight: ys,
                    onStationContextMenu: B,
                    onDeselectStation: Le,
                    stationAutoDirectorMap: ft,
                    onToggleStationAutoDirector: pt,
                    onOpenDrawer: () => Ft(!0),
                    baseEpochMs: m,
                    playheadMs: it,
                    playheadEpochMs: Wr,
                    timeMode: r,
                    isPlaying: en ? !1 : gt,
                    setIsPlaying: Dt,
                    totalDurationMs: f,
                    inPointMs: P,
                    outPointMs: le,
                    setPlayheadMs: mt,
                    globalGaps: E,
                    recordingSegments: Ee,
                    playbackSpeed: pn,
                    onChangePlaybackSpeed: Nt,
                    keystrokeMode: l,
                    keystrokes: xn,
                    directorPlan: $t == null ? void 0 : $t.directorPlan,
                    onOverrideDisplay: dn,
                    onResetOverride: En,
                    compositionScope: W,
                    onChangeCompositionScope: ee,
                    compositionLayout: I,
                    onChangeCompositionLayout: ne,
                    isAutoDirectorEnabled: se,
                    onToggleAutoDirector: () => oe((L) => !L),
                    isPipSwapped: U,
                    onTogglePipSwap: () => Y((L) => !L),
                    onUpdateCanvasLayout: ge,
                    canvasLayoutTimeline: fe,
                    onUpdateCanvasLayoutTimeline: ye,
                    activeKfIndex: De,
                    setActiveKfIndex: Ce,
                    isModalOpen: X || Fe || rt || en || at,
                    isGridFullscreen: Vt,
                    onToggleGridFullscreen: Yt,
                    activeFocusZone: At,
                    onFocusZoneChange: cs
                  }
                ),
                !Vt && /* @__PURE__ */ s.jsx(
                  pu,
                  {
                    activeFocusZone: At,
                    onFocusZoneChange: cs,
                    hasGridPlacements: mn,
                    baseEpochMs: m,
                    timeMode: r,
                    totalDurationMs: f,
                    playheadMs: it,
                    setPlayheadMs: mt,
                    inPointMs: P,
                    setInPointMs: Q,
                    outPointMs: le,
                    setOutPointMs: re,
                    activeStationId: j,
                    isPlaying: gt,
                    setIsPlaying: He,
                    isLooping: tn,
                    setIsLooping: Gt,
                    playbackSpeed: pn,
                    onChangeSpeed: Nt,
                    onSetInPoint: () => Q(Math.max(0, Math.min(it, le - 1e3))),
                    onSetOutPoint: () => re(Math.min(f, Math.max(it, P + 1e3))),
                    onStepFrameBackward: () => {
                      Dt(!1), mt((L) => Math.max(0, L - 33));
                    },
                    onStepFrameForward: () => {
                      Dt(!1), mt((L) => Math.min(f, L + 33));
                    }
                  }
                )
              ] }),
              Vt && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "cinema-bottom-sensor-strip",
                  onMouseEnter: () => {
                    Is(!0), nr();
                  }
                }
              ),
              /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `studio-bottom-timeline ${Vt ? "cinema-timeline-island" : ""} ${Vt && !Dr ? "dock-hidden" : ""} ${Vt && gt ? "is-playing-dimmed" : ""}`,
                  ref: bt,
                  onMouseDown: () => cs("timeline"),
                  onMouseEnter: () => Jo(!0),
                  onMouseLeave: () => {
                    Jo(!1), Vt && nr();
                  },
                  children: [
                    Vt && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                          /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                          /* @__PURE__ */ s.jsx("span", { className: "val", children: Bn(le - P) })
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
                        pu,
                        {
                          activeFocusZone: At,
                          onFocusZoneChange: cs,
                          hasGridPlacements: mn,
                          baseEpochMs: m,
                          timeMode: r,
                          totalDurationMs: f,
                          playheadMs: it,
                          setPlayheadMs: mt,
                          inPointMs: P,
                          setInPointMs: Q,
                          outPointMs: le,
                          setOutPointMs: re,
                          activeStationId: j,
                          isPlaying: gt,
                          setIsPlaying: He,
                          isLooping: tn,
                          setIsLooping: Gt,
                          playbackSpeed: pn,
                          onChangeSpeed: Nt,
                          onSetInPoint: () => Q(Math.max(0, Math.min(it, le - 1e3))),
                          onSetOutPoint: () => re(Math.min(f, Math.max(it, P + 1e3))),
                          onStepFrameBackward: () => {
                            Dt(!1), mt((L) => Math.max(0, L - 33));
                          },
                          onStepFrameForward: () => {
                            Dt(!1), mt((L) => Math.min(f, L + 33));
                          }
                        }
                      ),
                      /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                        /* @__PURE__ */ s.jsx("span", { className: "digits", children: Et(m + it, r) })
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      jm,
                      {
                        stations: kn,
                        activeStationId: j,
                        onSelectActiveStation: (L) => is(v.length <= 1 ? L : L === j ? null : L),
                        onStationContextMenu: B,
                        onDeselectStation: Le,
                        stationAutoDirectorMap: ft,
                        onToggleStationAutoDirector: pt,
                        baseEpochMs: m,
                        timeMode: r,
                        totalDurationMs: f,
                        zoomLevel: pe,
                        onZoomChange: Ue,
                        onZoomReset: te,
                        onFitRange: ue,
                        onJumpViewportTo: je,
                        playheadMs: it,
                        setPlayheadMs: mt,
                        inPointMs: P,
                        setInPointMs: Q,
                        outPointMs: le,
                        setOutPointMs: re,
                        viewportStartMs: kt,
                        onViewportStartChange: de,
                        onExport: Re,
                        recordingSegments: Ee,
                        movieBoundaries: st,
                        onEstimateLoaded: (L) => (L == null ? void 0 : L.removedGlobalGaps) && S(L.removedGlobalGaps),
                        keystrokeMode: l,
                        onChangeKeystrokeMode: a,
                        keystrokes: xn,
                        showKeystrokes: c,
                        showRulerKeystrokes: c,
                        onToggleRulerKeystrokes: () => u((L) => !L),
                        onSplitDirectorSegment: tr,
                        onChangeDirectorSegmentDisplay: dn,
                        onResetDirectorSegmentToAuto: En,
                        audioRoutingPlan: nn,
                        onSplitAudioSegment: _s,
                        onChangeAudioSegmentStation: Go,
                        onChangeAudioSegmentGain: Qo,
                        onFollowVisualFeed: er,
                        isAutoFollowAudio: z,
                        canvasLayoutTimeline: fe,
                        activeKfIndex: De,
                        onSelectKeyframe: (L, ie) => {
                          Ce(L), mt(Math.max(0, ie - m));
                        },
                        onAddKeyframeAtEpoch: Ie,
                        onDeleteKeyframe: Xe,
                        onUpdateKeyframeEpoch: Ot,
                        onUpdateKeyframeTransition: Ze,
                        onUpdateKeyframeClockPosition: Ht,
                        onToggleDisplayOnCanvas: ut,
                        onUpdateAudioPlan: H
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        !Vt && /* @__PURE__ */ s.jsx(
          _y,
          {
            isOpen: Kt || sr,
            onToggle: () => Ft(!Kt),
            onClose: () => Ft(!1),
            allStations: we,
            selectedStationIds: v,
            onToggleStation: (L) => M((ie) => ie.includes(L) ? ie.filter((ce) => ce !== L) : [...ie, L]),
            onUpdateSelections: M,
            isInitialSetup: sr,
            isLoadingStations: ze,
            recordingSegments: Ee,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              v.length > 0 && (O(null), g(null), Jt(!0), Ft(!1));
            },
            onOpenRangeModal: () => et(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Uy,
      {
        isOpen: Fe,
        onClose: () => et(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: o,
        onLoadBookmark: qo,
        onApplyRange: Oe
      }
    ),
    /* @__PURE__ */ s.jsx(
      Hy,
      {
        isOpen: rt,
        onClose: () => wt(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: m,
          timelineBaseEpochMs: m,
          playheadMs: it,
          inPointMs: P,
          outPointMs: le,
          selectedStationIds: v,
          selectedStationNames: we.filter((L) => v.includes(L.id)).map((L) => L.displayName || L.hostname || L.id),
          allStationIds: we.map((L) => L.id),
          activeStationId: j,
          activeStationName: (Je == null ? void 0 : Je.displayName) || (Je == null ? void 0 : Je.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: l
        },
        onLoadBookmark: qo
      }
    ),
    /* @__PURE__ */ s.jsx(
      bm,
      {
        isOpen: at,
        onClose: () => dt(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Xy,
      {
        isOpen: en,
        station: Or,
        initialDisplayId: N,
        allStations: kn,
        onSelectStation: (L) => {
          L !== k && Nt(1), O(L), g(L);
        },
        onClose: io,
        baseEpochMs: m,
        timeMode: r,
        totalDurationMs: f,
        zoomLevel: pe,
        onZoomChange: Ue,
        onZoomReset: te,
        onFitRange: ue,
        onJumpViewportTo: je,
        viewportStartMs: kt,
        onViewportStartChange: de,
        playheadMs: it,
        setPlayheadMs: mt,
        playheadEpochMs: Wr,
        inPointMs: P,
        setInPointMs: Q,
        outPointMs: le,
        setOutPointMs: re,
        recordingSegments: Ee,
        globalGaps: E,
        isPlaying: gt,
        setIsPlaying: Dt,
        isLooping: tn,
        setIsLooping: Gt,
        playbackSpeed: pn,
        setPlaybackSpeed: Nt,
        onExport: Re,
        keystrokeMode: l,
        onChangeKeystrokeMode: a,
        keystrokes: xn,
        showRulerKeystrokes: c,
        onToggleRulerKeystrokes: () => u((L) => !L),
        directorPlan: Or == null ? void 0 : Or.directorPlan,
        onOverrideDisplay: dn,
        onSplitDirectorSegment: tr,
        onChangeDirectorSegmentDisplay: dn,
        onResetDirectorSegmentToAuto: En
      }
    ),
    /* @__PURE__ */ s.jsx(
      Gy,
      {
        menu: $,
        onClose: () => C(null),
        onDeselect: Le,
        onFocusSolo: is
      }
    ),
    /* @__PURE__ */ s.jsx(
      Qy,
      {
        isOpen: X,
        onClose: () => V(!1),
        onConfirm: dd,
        compositionSummary: {
          scope: W,
          layout: (K == null ? void 0 : K.preset) || I,
          isPipSwapped: U,
          isAutoDirectorEnabled: se,
          stationsCount: nt.length,
          audioSegmentsCount: ((Zo = nn == null ? void 0 : nn.segments) == null ? void 0 : Zo.length) || 1,
          resolution: (fe == null ? void 0 : fe.resolution) || (K == null ? void 0 : K.resolution) || "2K",
          canvasWidth: (K == null ? void 0 : K.width) || 2560,
          canvasHeight: (K == null ? void 0 : K.height) || 1440
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Mm, {})
  ] });
}
const Qh = "itb-extractor-advanced-theme", Jh = "itb-global-export-job-monitor-root";
function Im() {
  if (!(typeof document > "u") && !document.getElementById(Qh)) {
    const e = document.createElement("link");
    e.id = Qh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Im();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Jh);
  if (!t) {
    t = document.createElement("div"), t.id = Jh, document.body.appendChild(t);
    try {
      Fa.createRoot(t).render(fi.createElement(Mm, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function s1(e, t = {}) {
  Im();
  const n = Fa.createRoot(e);
  return n.render(fi.createElement(n1, t)), () => {
    n.unmount();
  };
}
export {
  Mm as ExportJobMonitor,
  n1 as ExtractorAdvancedStudio,
  n1 as default,
  s1 as mount
};
