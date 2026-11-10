function Qm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qh = { exports: {} }, $t = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yo = Symbol.for("react.element"), Jm = Symbol.for("react.portal"), qm = Symbol.for("react.fragment"), Zm = Symbol.for("react.strict_mode"), e0 = Symbol.for("react.profiler"), t0 = Symbol.for("react.provider"), n0 = Symbol.for("react.context"), s0 = Symbol.for("react.forward_ref"), r0 = Symbol.for("react.suspense"), l0 = Symbol.for("react.memo"), o0 = Symbol.for("react.lazy"), Id = Symbol.iterator;
function a0(e) {
  return e === null || typeof e != "object" ? null : (e = Id && e[Id] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Zh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ef = Object.assign, tf = {};
function Kl(e, t, n) {
  this.props = e, this.context = t, this.refs = tf, this.updater = n || Zh;
}
Kl.prototype.isReactComponent = {};
Kl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Kl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function nf() {
}
nf.prototype = Kl.prototype;
function gu(e, t, n) {
  this.props = e, this.context = t, this.refs = tf, this.updater = n || Zh;
}
var xu = gu.prototype = new nf();
xu.constructor = gu;
ef(xu, Kl.prototype);
xu.isPureReactComponent = !0;
var Td = Array.isArray, sf = Object.prototype.hasOwnProperty, yu = { current: null }, rf = { key: !0, ref: !0, __self: !0, __source: !0 };
function lf(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) sf.call(t, r) && !rf.hasOwnProperty(r) && (l[r] = t[r]);
  var c = arguments.length - 2;
  if (c === 1) l.children = n;
  else if (1 < c) {
    for (var u = Array(c), h = 0; h < c; h++) u[h] = arguments[h + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in c = e.defaultProps, c) l[r] === void 0 && (l[r] = c[r]);
  return { $$typeof: Yo, type: e, key: o, ref: a, props: l, _owner: yu.current };
}
function i0(e, t) {
  return { $$typeof: Yo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function vu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Yo;
}
function c0(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var $d = /\/+/g;
function Di(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? c0("" + e.key) : t.toString(36);
}
function ja(e, t, n, r, l) {
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
        case Jm:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + Di(a, 0) : r, Td(l) ? (n = "", e != null && (n = e.replace($d, "$&/") + "/"), ja(l, t, n, "", function(h) {
    return h;
  })) : l != null && (vu(l) && (l = i0(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace($d, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Td(e)) for (var c = 0; c < e.length; c++) {
    o = e[c];
    var u = r + Di(o, c);
    a += ja(o, t, n, u, l);
  }
  else if (u = a0(e), typeof u == "function") for (e = u.call(e), c = 0; !(o = e.next()).done; ) o = o.value, u = r + Di(o, c++), a += ja(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function na(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return ja(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function u0(e) {
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
var Bn = { current: null }, Ca = { transition: null }, d0 = { ReactCurrentDispatcher: Bn, ReactCurrentBatchConfig: Ca, ReactCurrentOwner: yu };
function of() {
  throw Error("act(...) is not supported in production builds of React.");
}
$t.Children = { map: na, forEach: function(e, t, n) {
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
$t.Component = Kl;
$t.Fragment = qm;
$t.Profiler = e0;
$t.PureComponent = gu;
$t.StrictMode = Zm;
$t.Suspense = r0;
$t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = d0;
$t.act = of;
$t.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ef({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = yu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
    for (u in t) sf.call(t, u) && !rf.hasOwnProperty(u) && (r[u] = t[u] === void 0 && c !== void 0 ? c[u] : t[u]);
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
$t.createContext = function(e) {
  return e = { $$typeof: n0, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: t0, _context: e }, e.Consumer = e;
};
$t.createElement = lf;
$t.createFactory = function(e) {
  var t = lf.bind(null, e);
  return t.type = e, t;
};
$t.createRef = function() {
  return { current: null };
};
$t.forwardRef = function(e) {
  return { $$typeof: s0, render: e };
};
$t.isValidElement = vu;
$t.lazy = function(e) {
  return { $$typeof: o0, _payload: { _status: -1, _result: e }, _init: u0 };
};
$t.memo = function(e, t) {
  return { $$typeof: l0, type: e, compare: t === void 0 ? null : t };
};
$t.startTransition = function(e) {
  var t = Ca.transition;
  Ca.transition = {};
  try {
    e();
  } finally {
    Ca.transition = t;
  }
};
$t.unstable_act = of;
$t.useCallback = function(e, t) {
  return Bn.current.useCallback(e, t);
};
$t.useContext = function(e) {
  return Bn.current.useContext(e);
};
$t.useDebugValue = function() {
};
$t.useDeferredValue = function(e) {
  return Bn.current.useDeferredValue(e);
};
$t.useEffect = function(e, t) {
  return Bn.current.useEffect(e, t);
};
$t.useId = function() {
  return Bn.current.useId();
};
$t.useImperativeHandle = function(e, t, n) {
  return Bn.current.useImperativeHandle(e, t, n);
};
$t.useInsertionEffect = function(e, t) {
  return Bn.current.useInsertionEffect(e, t);
};
$t.useLayoutEffect = function(e, t) {
  return Bn.current.useLayoutEffect(e, t);
};
$t.useMemo = function(e, t) {
  return Bn.current.useMemo(e, t);
};
$t.useReducer = function(e, t, n) {
  return Bn.current.useReducer(e, t, n);
};
$t.useRef = function(e) {
  return Bn.current.useRef(e);
};
$t.useState = function(e) {
  return Bn.current.useState(e);
};
$t.useSyncExternalStore = function(e, t, n) {
  return Bn.current.useSyncExternalStore(e, t, n);
};
$t.useTransition = function() {
  return Bn.current.useTransition();
};
$t.version = "18.3.1";
qh.exports = $t;
var i = qh.exports;
const fi = /* @__PURE__ */ Qm(i);
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
  function t(F, Y) {
    var T = F.length;
    F.push(Y);
    e: for (; 0 < T; ) {
      var B = T - 1 >>> 1, U = F[B];
      if (0 < l(U, Y)) F[B] = Y, F[T] = U, T = B;
      else break e;
    }
  }
  function n(F) {
    return F.length === 0 ? null : F[0];
  }
  function r(F) {
    if (F.length === 0) return null;
    var Y = F[0], T = F.pop();
    if (T !== Y) {
      F[0] = T;
      e: for (var B = 0, U = F.length, ve = U >>> 1; B < ve; ) {
        var G = 2 * (B + 1) - 1, V = F[G], z = G + 1, ge = F[z];
        if (0 > l(V, T)) z < U && 0 > l(ge, V) ? (F[B] = ge, F[z] = T, B = z) : (F[B] = V, F[G] = T, B = G);
        else if (z < U && 0 > l(ge, T)) F[B] = ge, F[z] = T, B = z;
        else break e;
      }
    }
    return Y;
  }
  function l(F, Y) {
    var T = F.sortIndex - Y.sortIndex;
    return T !== 0 ? T : F.id - Y.id;
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
  var u = [], h = [], y = 1, m = null, f = 3, v = !1, I = !1, S = !1, O = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function k(F) {
    for (var Y = n(h); Y !== null; ) {
      if (Y.callback === null) r(h);
      else if (Y.startTime <= F) r(h), Y.sortIndex = Y.expirationTime, t(u, Y);
      else break;
      Y = n(h);
    }
  }
  function b(F) {
    if (S = !1, k(F), !I) if (n(u) !== null) I = !0, le(C);
    else {
      var Y = n(h);
      Y !== null && ae(b, Y.startTime - F);
    }
  }
  function C(F, Y) {
    I = !1, S && (S = !1, w(p), p = -1), v = !0;
    var T = f;
    try {
      for (k(Y), m = n(u); m !== null && (!(m.expirationTime > Y) || F && !_()); ) {
        var B = m.callback;
        if (typeof B == "function") {
          m.callback = null, f = m.priorityLevel;
          var U = B(m.expirationTime <= Y);
          Y = e.unstable_now(), typeof U == "function" ? m.callback = U : m === n(u) && r(u), k(Y);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var ve = !0;
      else {
        var G = n(h);
        G !== null && ae(b, G.startTime - Y), ve = !1;
      }
      return ve;
    } finally {
      m = null, f = T, v = !1;
    }
  }
  var E = !1, N = null, p = -1, $ = 5, j = -1;
  function _() {
    return !(e.unstable_now() - j < $);
  }
  function J() {
    if (N !== null) {
      var F = e.unstable_now();
      j = F;
      var Y = !0;
      try {
        Y = N(!0, F);
      } finally {
        Y ? M() : (E = !1, N = null);
      }
    } else E = !1;
  }
  var M;
  if (typeof g == "function") M = function() {
    g(J);
  };
  else if (typeof MessageChannel < "u") {
    var R = new MessageChannel(), re = R.port2;
    R.port1.onmessage = J, M = function() {
      re.postMessage(null);
    };
  } else M = function() {
    O(J, 0);
  };
  function le(F) {
    N = F, E || (E = !0, M());
  }
  function ae(F, Y) {
    p = O(function() {
      F(e.unstable_now());
    }, Y);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(F) {
    F.callback = null;
  }, e.unstable_continueExecution = function() {
    I || v || (I = !0, le(C));
  }, e.unstable_forceFrameRate = function(F) {
    0 > F || 125 < F ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < F ? Math.floor(1e3 / F) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return f;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(F) {
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
      return F();
    } finally {
      f = T;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(F, Y) {
    switch (F) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        F = 3;
    }
    var T = f;
    f = F;
    try {
      return Y();
    } finally {
      f = T;
    }
  }, e.unstable_scheduleCallback = function(F, Y, T) {
    var B = e.unstable_now();
    switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? B + T : B) : T = B, F) {
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
    return U = T + U, F = { id: y++, callback: Y, priorityLevel: F, startTime: T, expirationTime: U, sortIndex: -1 }, T > B ? (F.sortIndex = T, t(h, F), n(u) === null && F === n(h) && (S ? (w(p), p = -1) : S = !0, ae(b, T - B))) : (F.sortIndex = U, t(u, F), I || v || (I = !0, le(C))), F;
  }, e.unstable_shouldYield = _, e.unstable_wrapCallback = function(F) {
    var Y = f;
    return function() {
      var T = f;
      f = Y;
      try {
        return F.apply(this, arguments);
      } finally {
        f = T;
      }
    };
  };
})(uf);
cf.exports = uf;
var h0 = cf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f0 = i, ls = h0;
function Le(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var df = /* @__PURE__ */ new Set(), Io = {};
function ol(e, t) {
  _l(e, t), _l(e + "Capture", t);
}
function _l(e, t) {
  for (Io[e] = t, e = 0; e < t.length; e++) df.add(t[e]);
}
var Qs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), mc = Object.prototype.hasOwnProperty, p0 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ad = {}, Rd = {};
function m0(e) {
  return mc.call(Rd, e) ? !0 : mc.call(Ad, e) ? !1 : p0.test(e) ? Rd[e] = !0 : (Ad[e] = !0, !1);
}
function g0(e, t, n, r) {
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
function x0(e, t, n, r) {
  if (t === null || typeof t > "u" || g0(e, t, n, r)) return !0;
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
function Un(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
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
  var l = Mn.hasOwnProperty(t) ? Mn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (x0(t, n, l, r) && (n = null), r || l === null ? m0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var er = f0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sa = Symbol.for("react.element"), gl = Symbol.for("react.portal"), xl = Symbol.for("react.fragment"), ju = Symbol.for("react.strict_mode"), gc = Symbol.for("react.profiler"), hf = Symbol.for("react.provider"), ff = Symbol.for("react.context"), Cu = Symbol.for("react.forward_ref"), xc = Symbol.for("react.suspense"), yc = Symbol.for("react.suspense_list"), Eu = Symbol.for("react.memo"), pr = Symbol.for("react.lazy"), pf = Symbol.for("react.offscreen"), Ld = Symbol.iterator;
function no(e) {
  return e === null || typeof e != "object" ? null : (e = Ld && e[Ld] || e["@@iterator"], typeof e == "function" ? e : null);
}
var un = Object.assign, Pi;
function mo(e) {
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
    _i = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? mo(e) : "";
}
function y0(e) {
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
    case xl:
      return "Fragment";
    case gl:
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
    case pr:
      t = e._payload, e = e._init;
      try {
        return vc(e(t));
      } catch {
      }
  }
  return null;
}
function v0(e) {
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
function N0(e) {
  var t = mf(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function ra(e) {
  e._valueTracker || (e._valueTracker = N0(e));
}
function gf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = mf(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ba(e) {
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
  (t !== "number" || Ba(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var go = Array.isArray;
function Il(e, t, n, r) {
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
function jc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(Le(91));
  return un({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Pd(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(Le(92));
      if (go(n)) {
        if (1 < n.length) throw Error(Le(93));
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
var la, Nf = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (la = la || document.createElement("div"), la.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = la.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
}, k0 = ["Webkit", "ms", "Moz", "O"];
Object.keys(No).forEach(function(e) {
  k0.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), No[t] = No[e];
  });
});
function kf(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || No.hasOwnProperty(e) && No[e] ? ("" + t).trim() : t + "px";
}
function wf(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = kf(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var w0 = un({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Ec(e, t) {
  if (t) {
    if (w0[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(Le(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Le(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(Le(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Le(62));
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
var Mc = null, Tl = null, $l = null;
function Fd(e) {
  if (e = Qo(e)) {
    if (typeof Mc != "function") throw Error(Le(280));
    var t = e.stateNode;
    t && (t = yi(t), Mc(e.stateNode, e.type, t));
  }
}
function jf(e) {
  Tl ? $l ? $l.push(e) : $l = [e] : Tl = e;
}
function Cf() {
  if (Tl) {
    var e = Tl, t = $l;
    if ($l = Tl = null, Fd(e), t) for (e = 0; e < t.length; e++) Fd(t[e]);
  }
}
function Ef(e, t) {
  return e(t);
}
function Sf() {
}
var Bi = !1;
function bf(e, t, n) {
  if (Bi) return e(t, n);
  Bi = !0;
  try {
    return Ef(e, t, n);
  } finally {
    Bi = !1, (Tl !== null || $l !== null) && (Sf(), Cf());
  }
}
function $o(e, t) {
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
  if (n && typeof n != "function") throw Error(Le(231, t, typeof n));
  return n;
}
var Ic = !1;
if (Qs) try {
  var so = {};
  Object.defineProperty(so, "passive", { get: function() {
    Ic = !0;
  } }), window.addEventListener("test", so, so), window.removeEventListener("test", so, so);
} catch {
  Ic = !1;
}
function j0(e, t, n, r, l, o, a, c, u) {
  var h = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, h);
  } catch (y) {
    this.onError(y);
  }
}
var ko = !1, Ua = null, Wa = !1, Tc = null, C0 = { onError: function(e) {
  ko = !0, Ua = e;
} };
function E0(e, t, n, r, l, o, a, c, u) {
  ko = !1, Ua = null, j0.apply(C0, arguments);
}
function S0(e, t, n, r, l, o, a, c, u) {
  if (E0.apply(this, arguments), ko) {
    if (ko) {
      var h = Ua;
      ko = !1, Ua = null;
    } else throw Error(Le(198));
    Wa || (Wa = !0, Tc = h);
  }
}
function al(e) {
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
function Bd(e) {
  if (al(e) !== e) throw Error(Le(188));
}
function b0(e) {
  var t = e.alternate;
  if (!t) {
    if (t = al(e), t === null) throw Error(Le(188));
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
        if (o === n) return Bd(l), e;
        if (o === r) return Bd(l), t;
        o = o.sibling;
      }
      throw Error(Le(188));
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
        if (!a) throw Error(Le(189));
      }
    }
    if (n.alternate !== r) throw Error(Le(190));
  }
  if (n.tag !== 3) throw Error(Le(188));
  return n.stateNode.current === n ? e : t;
}
function If(e) {
  return e = b0(e), e !== null ? Tf(e) : null;
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
var $f = ls.unstable_scheduleCallback, Ud = ls.unstable_cancelCallback, M0 = ls.unstable_shouldYield, I0 = ls.unstable_requestPaint, mn = ls.unstable_now, T0 = ls.unstable_getCurrentPriorityLevel, bu = ls.unstable_ImmediatePriority, Af = ls.unstable_UserBlockingPriority, Ha = ls.unstable_NormalPriority, $0 = ls.unstable_LowPriority, Rf = ls.unstable_IdlePriority, pi = null, Ds = null;
function A0(e) {
  if (Ds && typeof Ds.onCommitFiberRoot == "function") try {
    Ds.onCommitFiberRoot(pi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var bs = Math.clz32 ? Math.clz32 : O0, R0 = Math.log, L0 = Math.LN2;
function O0(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (R0(e) / L0 | 0) | 0;
}
var oa = 64, aa = 4194304;
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
function za(e, t) {
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
function D0(e, t) {
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
function P0(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - bs(o), c = 1 << a, u = l[a];
    u === -1 ? (!(c & n) || c & r) && (l[a] = D0(c, t)) : u <= t && (e.expiredLanes |= c), o &= ~c;
  }
}
function $c(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Lf() {
  var e = oa;
  return oa <<= 1, !(oa & 4194240) && (oa = 64), e;
}
function Ui(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Xo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - bs(t), e[t] = n;
}
function _0(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - bs(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Mu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - bs(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Ht = 0;
function Of(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Df, Iu, Pf, _f, Ff, Ac = !1, ia = [], wr = null, jr = null, Cr = null, Ao = /* @__PURE__ */ new Map(), Ro = /* @__PURE__ */ new Map(), xr = [], F0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Wd(e, t) {
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
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Qo(t), t !== null && Iu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function B0(e, t, n, r, l) {
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
function Bf(e) {
  var t = Xr(e.target);
  if (t !== null) {
    var n = al(t);
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
    } else return t = Qo(n), t !== null && Iu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Hd(e, t, n) {
  Ea(e) && n.delete(t);
}
function U0() {
  Ac = !1, wr !== null && Ea(wr) && (wr = null), jr !== null && Ea(jr) && (jr = null), Cr !== null && Ea(Cr) && (Cr = null), Ao.forEach(Hd), Ro.forEach(Hd);
}
function lo(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ac || (Ac = !0, ls.unstable_scheduleCallback(ls.unstable_NormalPriority, U0)));
}
function Lo(e) {
  function t(l) {
    return lo(l, e);
  }
  if (0 < ia.length) {
    lo(ia[0], e);
    for (var n = 1; n < ia.length; n++) {
      var r = ia[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (wr !== null && lo(wr, e), jr !== null && lo(jr, e), Cr !== null && lo(Cr, e), Ao.forEach(t), Ro.forEach(t), n = 0; n < xr.length; n++) r = xr[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < xr.length && (n = xr[0], n.blockedOn === null); ) Bf(n), n.blockedOn === null && xr.shift();
}
var Al = er.ReactCurrentBatchConfig, Ka = !0;
function W0(e, t, n, r) {
  var l = Ht, o = Al.transition;
  Al.transition = null;
  try {
    Ht = 1, Tu(e, t, n, r);
  } finally {
    Ht = l, Al.transition = o;
  }
}
function H0(e, t, n, r) {
  var l = Ht, o = Al.transition;
  Al.transition = null;
  try {
    Ht = 4, Tu(e, t, n, r);
  } finally {
    Ht = l, Al.transition = o;
  }
}
function Tu(e, t, n, r) {
  if (Ka) {
    var l = Rc(e, t, n, r);
    if (l === null) Ji(e, t, r, Va, n), Wd(e, r);
    else if (B0(l, e, t, n, r)) r.stopPropagation();
    else if (Wd(e, r), t & 4 && -1 < F0.indexOf(e)) {
      for (; l !== null; ) {
        var o = Qo(l);
        if (o !== null && Df(o), o = Rc(e, t, n, r), o === null && Ji(e, t, r, Va, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ji(e, t, r, null, n);
  }
}
var Va = null;
function Rc(e, t, n, r) {
  if (Va = null, e = Su(r), e = Xr(e), e !== null) if (t = al(e), t === null) e = null;
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
      switch (T0()) {
        case bu:
          return 1;
        case Af:
          return 4;
        case Ha:
        case $0:
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
function Wf() {
  if (Sa) return Sa;
  var e, t = $u, n = t.length, r, l = "value" in Nr ? Nr.value : Nr.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return Sa = l.slice(e, 1 < r ? 1 - r : void 0);
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
function as(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var c in e) e.hasOwnProperty(c) && (n = e[c], this[c] = n ? n(o) : o[c]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ca : zd, this.isPropagationStopped = zd, this;
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
var Vl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Au = as(Vl), Go = un({}, Vl, { view: 0, detail: 0 }), z0 = as(Go), Wi, Hi, oo, mi = un({}, Go, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ru, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== oo && (oo && e.type === "mousemove" ? (Wi = e.screenX - oo.screenX, Hi = e.screenY - oo.screenY) : Hi = Wi = 0, oo = e), Wi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Hi;
} }), Kd = as(mi), K0 = un({}, mi, { dataTransfer: 0 }), V0 = as(K0), Y0 = un({}, Go, { relatedTarget: 0 }), zi = as(Y0), X0 = un({}, Vl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), G0 = as(X0), Q0 = un({}, Vl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), J0 = as(Q0), q0 = un({}, Vl, { data: 0 }), Vd = as(q0), Z0 = {
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
}, eg = {
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
}, tg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function ng(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = tg[e]) ? !!t[e] : !1;
}
function Ru() {
  return ng;
}
var sg = un({}, Go, { key: function(e) {
  if (e.key) {
    var t = Z0[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ba(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? eg[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ru, charCode: function(e) {
  return e.type === "keypress" ? ba(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ba(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), rg = as(sg), lg = un({}, mi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Yd = as(lg), og = un({}, Go, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ru }), ag = as(og), ig = un({}, Vl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), cg = as(ig), ug = un({}, mi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), dg = as(ug), hg = [9, 13, 27, 32], Lu = Qs && "CompositionEvent" in window, wo = null;
Qs && "documentMode" in document && (wo = document.documentMode);
var fg = Qs && "TextEvent" in window && !wo, Hf = Qs && (!Lu || wo && 8 < wo && 11 >= wo), Xd = " ", Gd = !1;
function zf(e, t) {
  switch (e) {
    case "keyup":
      return hg.indexOf(t.keyCode) !== -1;
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
var yl = !1;
function pg(e, t) {
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
function mg(e, t) {
  if (yl) return e === "compositionend" || !Lu && zf(e, t) ? (e = Wf(), Sa = $u = Nr = null, yl = !1, e) : null;
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
var gg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Qd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!gg[e.type] : t === "textarea";
}
function Vf(e, t, n, r) {
  jf(r), t = Ya(t, "onChange"), 0 < t.length && (n = new Au("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var jo = null, Oo = null;
function xg(e) {
  sp(e, 0);
}
function gi(e) {
  var t = kl(e);
  if (gf(t)) return e;
}
function yg(e, t) {
  if (e === "change") return t;
}
var Yf = !1;
if (Qs) {
  var Ki;
  if (Qs) {
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
  jo && (jo.detachEvent("onpropertychange", Xf), Oo = jo = null);
}
function Xf(e) {
  if (e.propertyName === "value" && gi(Oo)) {
    var t = [];
    Vf(t, Oo, e, Su(e)), bf(xg, t);
  }
}
function vg(e, t, n) {
  e === "focusin" ? (qd(), jo = t, Oo = n, jo.attachEvent("onpropertychange", Xf)) : e === "focusout" && qd();
}
function Ng(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return gi(Oo);
}
function kg(e, t) {
  if (e === "click") return gi(t);
}
function wg(e, t) {
  if (e === "input" || e === "change") return gi(t);
}
function jg(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Is = typeof Object.is == "function" ? Object.is : jg;
function Do(e, t) {
  if (Is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!mc.call(t, l) || !Is(e[l], t[l])) return !1;
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
  for (var e = window, t = Ba(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ba(e.document);
  }
  return t;
}
function Ou(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Cg(e) {
  var t = Qf(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Gf(n.ownerDocument.documentElement, n)) {
    if (r !== null && Ou(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = eh(n, o);
        var a = eh(
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
var Eg = Qs && "documentMode" in document && 11 >= document.documentMode, vl = null, Lc = null, Co = null, Oc = !1;
function th(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Oc || vl == null || vl !== Ba(r) || (r = vl, "selectionStart" in r && Ou(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Co && Do(Co, r) || (Co = r, r = Ya(Lc, "onSelect"), 0 < r.length && (t = new Au("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = vl)));
}
function ua(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Nl = { animationend: ua("Animation", "AnimationEnd"), animationiteration: ua("Animation", "AnimationIteration"), animationstart: ua("Animation", "AnimationStart"), transitionend: ua("Transition", "TransitionEnd") }, Yi = {}, Jf = {};
Qs && (Jf = document.createElement("div").style, "AnimationEvent" in window || (delete Nl.animationend.animation, delete Nl.animationiteration.animation, delete Nl.animationstart.animation), "TransitionEvent" in window || delete Nl.transitionend.transition);
function xi(e) {
  if (Yi[e]) return Yi[e];
  if (!Nl[e]) return e;
  var t = Nl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Jf) return Yi[e] = t[n];
  return e;
}
var qf = xi("animationend"), Zf = xi("animationiteration"), ep = xi("animationstart"), tp = xi("transitionend"), np = /* @__PURE__ */ new Map(), nh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ar(e, t) {
  np.set(e, t), ol(t, [e]);
}
for (var Xi = 0; Xi < nh.length; Xi++) {
  var Gi = nh[Xi], Sg = Gi.toLowerCase(), bg = Gi[0].toUpperCase() + Gi.slice(1);
  Ar(Sg, "on" + bg);
}
Ar(qf, "onAnimationEnd");
Ar(Zf, "onAnimationIteration");
Ar(ep, "onAnimationStart");
Ar("dblclick", "onDoubleClick");
Ar("focusin", "onFocus");
Ar("focusout", "onBlur");
Ar(tp, "onTransitionEnd");
_l("onMouseEnter", ["mouseout", "mouseover"]);
_l("onMouseLeave", ["mouseout", "mouseover"]);
_l("onPointerEnter", ["pointerout", "pointerover"]);
_l("onPointerLeave", ["pointerout", "pointerover"]);
ol("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
ol("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
ol("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ol("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
ol("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
ol("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var yo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Mg = new Set("cancel close invalid load scroll toggle".split(" ").concat(yo));
function sh(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, S0(r, t, void 0, e), e.currentTarget = null;
}
function sp(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var c = r[a], u = c.instance, h = c.currentTarget;
        if (c = c.listener, u !== o && l.isPropagationStopped()) break e;
        sh(l, c, h), o = u;
      }
      else for (a = 0; a < r.length; a++) {
        if (c = r[a], u = c.instance, h = c.currentTarget, c = c.listener, u !== o && l.isPropagationStopped()) break e;
        sh(l, c, h), o = u;
      }
    }
  }
  if (Wa) throw e = Tc, Wa = !1, Tc = null, e;
}
function nn(e, t) {
  var n = t[Bc];
  n === void 0 && (n = t[Bc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (rp(t, e, 2, !1), n.add(r));
}
function Qi(e, t, n) {
  var r = 0;
  t && (r |= 4), rp(n, e, r, t);
}
var da = "_reactListening" + Math.random().toString(36).slice(2);
function Po(e) {
  if (!e[da]) {
    e[da] = !0, df.forEach(function(n) {
      n !== "selectionchange" && (Mg.has(n) || Qi(n, !1, e), Qi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[da] || (t[da] = !0, Qi("selectionchange", !1, t));
  }
}
function rp(e, t, n, r) {
  switch (Uf(t)) {
    case 1:
      var l = W0;
      break;
    case 4:
      l = H0;
      break;
    default:
      l = Tu;
  }
  n = l.bind(null, t, n, e), l = void 0, !Ic || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ji(e, t, n, r, l) {
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
  bf(function() {
    var h = o, y = Su(n), m = [];
    e: {
      var f = np.get(e);
      if (f !== void 0) {
        var v = Au, I = e;
        switch (e) {
          case "keypress":
            if (ba(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = rg;
            break;
          case "focusin":
            I = "focus", v = zi;
            break;
          case "focusout":
            I = "blur", v = zi;
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
            v = V0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = ag;
            break;
          case qf:
          case Zf:
          case ep:
            v = G0;
            break;
          case tp:
            v = cg;
            break;
          case "scroll":
            v = z0;
            break;
          case "wheel":
            v = dg;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = J0;
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
        var S = (t & 4) !== 0, O = !S && e === "scroll", w = S ? f !== null ? f + "Capture" : null : f;
        S = [];
        for (var g = h, k; g !== null; ) {
          k = g;
          var b = k.stateNode;
          if (k.tag === 5 && b !== null && (k = b, w !== null && (b = $o(g, w), b != null && S.push(_o(g, b, k)))), O) break;
          g = g.return;
        }
        0 < S.length && (f = new v(f, I, null, n, y), m.push({ event: f, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (f = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", f && n !== bc && (I = n.relatedTarget || n.fromElement) && (Xr(I) || I[Js])) break e;
        if ((v || f) && (f = y.window === y ? y : (f = y.ownerDocument) ? f.defaultView || f.parentWindow : window, v ? (I = n.relatedTarget || n.toElement, v = h, I = I ? Xr(I) : null, I !== null && (O = al(I), I !== O || I.tag !== 5 && I.tag !== 6) && (I = null)) : (v = null, I = h), v !== I)) {
          if (S = Kd, b = "onMouseLeave", w = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (S = Yd, b = "onPointerLeave", w = "onPointerEnter", g = "pointer"), O = v == null ? f : kl(v), k = I == null ? f : kl(I), f = new S(b, g + "leave", v, n, y), f.target = O, f.relatedTarget = k, b = null, Xr(y) === h && (S = new S(w, g + "enter", I, n, y), S.target = k, S.relatedTarget = O, b = S), O = b, v && I) t: {
            for (S = v, w = I, g = 0, k = S; k; k = ul(k)) g++;
            for (k = 0, b = w; b; b = ul(b)) k++;
            for (; 0 < g - k; ) S = ul(S), g--;
            for (; 0 < k - g; ) w = ul(w), k--;
            for (; g--; ) {
              if (S === w || w !== null && S === w.alternate) break t;
              S = ul(S), w = ul(w);
            }
            S = null;
          }
          else S = null;
          v !== null && rh(m, f, v, S, !1), I !== null && O !== null && rh(m, O, I, S, !0);
        }
      }
      e: {
        if (f = h ? kl(h) : window, v = f.nodeName && f.nodeName.toLowerCase(), v === "select" || v === "input" && f.type === "file") var C = yg;
        else if (Qd(f)) if (Yf) C = wg;
        else {
          C = Ng;
          var E = vg;
        }
        else (v = f.nodeName) && v.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (C = kg);
        if (C && (C = C(e, h))) {
          Vf(m, C, n, y);
          break e;
        }
        E && E(e, f, h), e === "focusout" && (E = f._wrapperState) && E.controlled && f.type === "number" && wc(f, "number", f.value);
      }
      switch (E = h ? kl(h) : window, e) {
        case "focusin":
          (Qd(E) || E.contentEditable === "true") && (vl = E, Lc = h, Co = null);
          break;
        case "focusout":
          Co = Lc = vl = null;
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
          if (Eg) break;
        case "keydown":
        case "keyup":
          th(m, n, y);
      }
      var N;
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
      else yl ? zf(e, n) && (p = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (p = "onCompositionStart");
      p && (Hf && n.locale !== "ko" && (yl || p !== "onCompositionStart" ? p === "onCompositionEnd" && yl && (N = Wf()) : (Nr = y, $u = "value" in Nr ? Nr.value : Nr.textContent, yl = !0)), E = Ya(h, p), 0 < E.length && (p = new Vd(p, e, null, n, y), m.push({ event: p, listeners: E }), N ? p.data = N : (N = Kf(n), N !== null && (p.data = N)))), (N = fg ? pg(e, n) : mg(e, n)) && (h = Ya(h, "onBeforeInput"), 0 < h.length && (y = new Vd("onBeforeInput", "beforeinput", null, n, y), m.push({ event: y, listeners: h }), y.data = N));
    }
    sp(m, t);
  });
}
function _o(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ya(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = $o(e, n), o != null && r.unshift(_o(e, o, l)), o = $o(e, t), o != null && r.push(_o(e, o, l))), e = e.return;
  }
  return r;
}
function ul(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function rh(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var c = n, u = c.alternate, h = c.stateNode;
    if (u !== null && u === r) break;
    c.tag === 5 && h !== null && (c = h, l ? (u = $o(n, o), u != null && a.unshift(_o(n, u, c))) : l || (u = $o(n, o), u != null && a.push(_o(n, u, c)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var Ig = /\r\n?/g, Tg = /\u0000|\uFFFD/g;
function lh(e) {
  return (typeof e == "string" ? e : "" + e).replace(Ig, `
`).replace(Tg, "");
}
function ha(e, t, n) {
  if (t = lh(t), lh(e) !== t && n) throw Error(Le(425));
}
function Xa() {
}
var Dc = null, Pc = null;
function _c(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Fc = typeof setTimeout == "function" ? setTimeout : void 0, $g = typeof clearTimeout == "function" ? clearTimeout : void 0, oh = typeof Promise == "function" ? Promise : void 0, Ag = typeof queueMicrotask == "function" ? queueMicrotask : typeof oh < "u" ? function(e) {
  return oh.resolve(null).then(e).catch(Rg);
} : Fc;
function Rg(e) {
  setTimeout(function() {
    throw e;
  });
}
function qi(e, t) {
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
var Yl = Math.random().toString(36).slice(2), Ls = "__reactFiber$" + Yl, Fo = "__reactProps$" + Yl, Js = "__reactContainer$" + Yl, Bc = "__reactEvents$" + Yl, Lg = "__reactListeners$" + Yl, Og = "__reactHandles$" + Yl;
function Xr(e) {
  var t = e[Ls];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Js] || n[Ls]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ah(e); e !== null; ) {
        if (n = e[Ls]) return n;
        e = ah(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Qo(e) {
  return e = e[Ls] || e[Js], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function kl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Le(33));
}
function yi(e) {
  return e[Fo] || null;
}
var Uc = [], wl = -1;
function Rr(e) {
  return { current: e };
}
function sn(e) {
  0 > wl || (e.current = Uc[wl], Uc[wl] = null, wl--);
}
function qt(e, t) {
  wl++, Uc[wl] = e.current, e.current = t;
}
var $r = {}, Rn = Rr($r), Gn = Rr(!1), tl = $r;
function Fl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return $r;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Qn(e) {
  return e = e.childContextTypes, e != null;
}
function Ga() {
  sn(Gn), sn(Rn);
}
function ih(e, t, n) {
  if (Rn.current !== $r) throw Error(Le(168));
  qt(Rn, t), qt(Gn, n);
}
function lp(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(Le(108, v0(e) || "Unknown", l));
  return un({}, n, r);
}
function Qa(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || $r, tl = Rn.current, qt(Rn, e), qt(Gn, Gn.current), !0;
}
function ch(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(Le(169));
  n ? (e = lp(e, t, tl), r.__reactInternalMemoizedMergedChildContext = e, sn(Gn), sn(Rn), qt(Rn, e)) : sn(Gn), qt(Gn, n);
}
var zs = null, vi = !1, Zi = !1;
function op(e) {
  zs === null ? zs = [e] : zs.push(e);
}
function Dg(e) {
  vi = !0, op(e);
}
function Lr() {
  if (!Zi && zs !== null) {
    Zi = !0;
    var e = 0, t = Ht;
    try {
      var n = zs;
      for (Ht = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      zs = null, vi = !1;
    } catch (l) {
      throw zs !== null && (zs = zs.slice(e + 1)), $f(bu, Lr), l;
    } finally {
      Ht = t, Zi = !1;
    }
  }
  return null;
}
var jl = [], Cl = 0, Ja = null, qa = 0, fs = [], ps = 0, nl = null, Vs = 1, Ys = "";
function zr(e, t) {
  jl[Cl++] = qa, jl[Cl++] = Ja, Ja = e, qa = t;
}
function ap(e, t, n) {
  fs[ps++] = Vs, fs[ps++] = Ys, fs[ps++] = nl, nl = e;
  var r = Vs;
  e = Ys;
  var l = 32 - bs(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - bs(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, Vs = 1 << 32 - bs(t) + l | n << l | r, Ys = o + e;
  } else Vs = 1 << o | n << l | r, Ys = e;
}
function Du(e) {
  e.return !== null && (zr(e, 1), ap(e, 1, 0));
}
function Pu(e) {
  for (; e === Ja; ) Ja = jl[--Cl], jl[Cl] = null, qa = jl[--Cl], jl[Cl] = null;
  for (; e === nl; ) nl = fs[--ps], fs[ps] = null, Ys = fs[--ps], fs[ps] = null, Vs = fs[--ps], fs[ps] = null;
}
var rs = null, ss = null, rn = !1, Es = null;
function ip(e, t) {
  var n = ms(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function uh(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, rs = e, ss = Er(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, rs = e, ss = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = nl !== null ? { id: Vs, overflow: Ys } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ms(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, rs = e, ss = null, !0) : !1;
    default:
      return !1;
  }
}
function Wc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Hc(e) {
  if (rn) {
    var t = ss;
    if (t) {
      var n = t;
      if (!uh(e, t)) {
        if (Wc(e)) throw Error(Le(418));
        t = Er(n.nextSibling);
        var r = rs;
        t && uh(e, t) ? ip(r, n) : (e.flags = e.flags & -4097 | 2, rn = !1, rs = e);
      }
    } else {
      if (Wc(e)) throw Error(Le(418));
      e.flags = e.flags & -4097 | 2, rn = !1, rs = e;
    }
  }
}
function dh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  rs = e;
}
function fa(e) {
  if (e !== rs) return !1;
  if (!rn) return dh(e), rn = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !_c(e.type, e.memoizedProps)), t && (t = ss)) {
    if (Wc(e)) throw cp(), Error(Le(418));
    for (; t; ) ip(e, t), t = Er(t.nextSibling);
  }
  if (dh(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(Le(317));
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
function cp() {
  for (var e = ss; e; ) e = Er(e.nextSibling);
}
function Bl() {
  ss = rs = null, rn = !1;
}
function _u(e) {
  Es === null ? Es = [e] : Es.push(e);
}
var Pg = er.ReactCurrentBatchConfig;
function ao(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(Le(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(Le(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var c = l.refs;
        a === null ? delete c[o] : c[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(Le(284));
    if (!n._owner) throw Error(Le(290, e));
  }
  return e;
}
function pa(e, t) {
  throw e = Object.prototype.toString.call(t), Error(Le(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function hh(e) {
  var t = e._init;
  return t(e._payload);
}
function up(e) {
  function t(w, g) {
    if (e) {
      var k = w.deletions;
      k === null ? (w.deletions = [g], w.flags |= 16) : k.push(g);
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
    return w = Ir(w, g), w.index = 0, w.sibling = null, w;
  }
  function o(w, g, k) {
    return w.index = k, e ? (k = w.alternate, k !== null ? (k = k.index, k < g ? (w.flags |= 2, g) : k) : (w.flags |= 2, g)) : (w.flags |= 1048576, g);
  }
  function a(w) {
    return e && w.alternate === null && (w.flags |= 2), w;
  }
  function c(w, g, k, b) {
    return g === null || g.tag !== 6 ? (g = oc(k, w.mode, b), g.return = w, g) : (g = l(g, k), g.return = w, g);
  }
  function u(w, g, k, b) {
    var C = k.type;
    return C === xl ? y(w, g, k.props.children, b, k.key) : g !== null && (g.elementType === C || typeof C == "object" && C !== null && C.$$typeof === pr && hh(C) === g.type) ? (b = l(g, k.props), b.ref = ao(w, g, k), b.return = w, b) : (b = La(k.type, k.key, k.props, null, w.mode, b), b.ref = ao(w, g, k), b.return = w, b);
  }
  function h(w, g, k, b) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== k.containerInfo || g.stateNode.implementation !== k.implementation ? (g = ac(k, w.mode, b), g.return = w, g) : (g = l(g, k.children || []), g.return = w, g);
  }
  function y(w, g, k, b, C) {
    return g === null || g.tag !== 7 ? (g = el(k, w.mode, b, C), g.return = w, g) : (g = l(g, k), g.return = w, g);
  }
  function m(w, g, k) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = oc("" + g, w.mode, k), g.return = w, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case sa:
          return k = La(g.type, g.key, g.props, null, w.mode, k), k.ref = ao(w, null, g), k.return = w, k;
        case gl:
          return g = ac(g, w.mode, k), g.return = w, g;
        case pr:
          var b = g._init;
          return m(w, b(g._payload), k);
      }
      if (go(g) || no(g)) return g = el(g, w.mode, k, null), g.return = w, g;
      pa(w, g);
    }
    return null;
  }
  function f(w, g, k, b) {
    var C = g !== null ? g.key : null;
    if (typeof k == "string" && k !== "" || typeof k == "number") return C !== null ? null : c(w, g, "" + k, b);
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case sa:
          return k.key === C ? u(w, g, k, b) : null;
        case gl:
          return k.key === C ? h(w, g, k, b) : null;
        case pr:
          return C = k._init, f(
            w,
            g,
            C(k._payload),
            b
          );
      }
      if (go(k) || no(k)) return C !== null ? null : y(w, g, k, b, null);
      pa(w, k);
    }
    return null;
  }
  function v(w, g, k, b, C) {
    if (typeof b == "string" && b !== "" || typeof b == "number") return w = w.get(k) || null, c(g, w, "" + b, C);
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case sa:
          return w = w.get(b.key === null ? k : b.key) || null, u(g, w, b, C);
        case gl:
          return w = w.get(b.key === null ? k : b.key) || null, h(g, w, b, C);
        case pr:
          var E = b._init;
          return v(w, g, k, E(b._payload), C);
      }
      if (go(b) || no(b)) return w = w.get(k) || null, y(g, w, b, C, null);
      pa(g, b);
    }
    return null;
  }
  function I(w, g, k, b) {
    for (var C = null, E = null, N = g, p = g = 0, $ = null; N !== null && p < k.length; p++) {
      N.index > p ? ($ = N, N = null) : $ = N.sibling;
      var j = f(w, N, k[p], b);
      if (j === null) {
        N === null && (N = $);
        break;
      }
      e && N && j.alternate === null && t(w, N), g = o(j, g, p), E === null ? C = j : E.sibling = j, E = j, N = $;
    }
    if (p === k.length) return n(w, N), rn && zr(w, p), C;
    if (N === null) {
      for (; p < k.length; p++) N = m(w, k[p], b), N !== null && (g = o(N, g, p), E === null ? C = N : E.sibling = N, E = N);
      return rn && zr(w, p), C;
    }
    for (N = r(w, N); p < k.length; p++) $ = v(N, w, p, k[p], b), $ !== null && (e && $.alternate !== null && N.delete($.key === null ? p : $.key), g = o($, g, p), E === null ? C = $ : E.sibling = $, E = $);
    return e && N.forEach(function(_) {
      return t(w, _);
    }), rn && zr(w, p), C;
  }
  function S(w, g, k, b) {
    var C = no(k);
    if (typeof C != "function") throw Error(Le(150));
    if (k = C.call(k), k == null) throw Error(Le(151));
    for (var E = C = null, N = g, p = g = 0, $ = null, j = k.next(); N !== null && !j.done; p++, j = k.next()) {
      N.index > p ? ($ = N, N = null) : $ = N.sibling;
      var _ = f(w, N, j.value, b);
      if (_ === null) {
        N === null && (N = $);
        break;
      }
      e && N && _.alternate === null && t(w, N), g = o(_, g, p), E === null ? C = _ : E.sibling = _, E = _, N = $;
    }
    if (j.done) return n(
      w,
      N
    ), rn && zr(w, p), C;
    if (N === null) {
      for (; !j.done; p++, j = k.next()) j = m(w, j.value, b), j !== null && (g = o(j, g, p), E === null ? C = j : E.sibling = j, E = j);
      return rn && zr(w, p), C;
    }
    for (N = r(w, N); !j.done; p++, j = k.next()) j = v(N, w, p, j.value, b), j !== null && (e && j.alternate !== null && N.delete(j.key === null ? p : j.key), g = o(j, g, p), E === null ? C = j : E.sibling = j, E = j);
    return e && N.forEach(function(J) {
      return t(w, J);
    }), rn && zr(w, p), C;
  }
  function O(w, g, k, b) {
    if (typeof k == "object" && k !== null && k.type === xl && k.key === null && (k = k.props.children), typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case sa:
          e: {
            for (var C = k.key, E = g; E !== null; ) {
              if (E.key === C) {
                if (C = k.type, C === xl) {
                  if (E.tag === 7) {
                    n(w, E.sibling), g = l(E, k.props.children), g.return = w, w = g;
                    break e;
                  }
                } else if (E.elementType === C || typeof C == "object" && C !== null && C.$$typeof === pr && hh(C) === E.type) {
                  n(w, E.sibling), g = l(E, k.props), g.ref = ao(w, E, k), g.return = w, w = g;
                  break e;
                }
                n(w, E);
                break;
              } else t(w, E);
              E = E.sibling;
            }
            k.type === xl ? (g = el(k.props.children, w.mode, b, k.key), g.return = w, w = g) : (b = La(k.type, k.key, k.props, null, w.mode, b), b.ref = ao(w, g, k), b.return = w, w = b);
          }
          return a(w);
        case gl:
          e: {
            for (E = k.key; g !== null; ) {
              if (g.key === E) if (g.tag === 4 && g.stateNode.containerInfo === k.containerInfo && g.stateNode.implementation === k.implementation) {
                n(w, g.sibling), g = l(g, k.children || []), g.return = w, w = g;
                break e;
              } else {
                n(w, g);
                break;
              }
              else t(w, g);
              g = g.sibling;
            }
            g = ac(k, w.mode, b), g.return = w, w = g;
          }
          return a(w);
        case pr:
          return E = k._init, O(w, g, E(k._payload), b);
      }
      if (go(k)) return I(w, g, k, b);
      if (no(k)) return S(w, g, k, b);
      pa(w, k);
    }
    return typeof k == "string" && k !== "" || typeof k == "number" ? (k = "" + k, g !== null && g.tag === 6 ? (n(w, g.sibling), g = l(g, k), g.return = w, w = g) : (n(w, g), g = oc(k, w.mode, b), g.return = w, w = g), a(w)) : n(w, g);
  }
  return O;
}
var Ul = up(!0), dp = up(!1), Za = Rr(null), ei = null, El = null, Fu = null;
function Bu() {
  Fu = El = ei = null;
}
function Uu(e) {
  var t = Za.current;
  sn(Za), e._currentValue = t;
}
function zc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Rl(e, t) {
  ei = e, Fu = El = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Xn = !0), e.firstContext = null);
}
function xs(e) {
  var t = e._currentValue;
  if (Fu !== e) if (e = { context: e, memoizedValue: t, next: null }, El === null) {
    if (ei === null) throw Error(Le(308));
    El = e, ei.dependencies = { lanes: 0, firstContext: e };
  } else El = El.next = e;
  return t;
}
var Gr = null;
function Wu(e) {
  Gr === null ? Gr = [e] : Gr.push(e);
}
function hp(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Wu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, qs(e, r);
}
function qs(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var mr = !1;
function Hu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function fp(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Xs(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Sr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, Pt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, qs(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Wu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, qs(e, n);
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
function ti(e, t, n, r) {
  var l = e.updateQueue;
  mr = !1;
  var o = l.firstBaseUpdate, a = l.lastBaseUpdate, c = l.shared.pending;
  if (c !== null) {
    l.shared.pending = null;
    var u = c, h = u.next;
    u.next = null, a === null ? o = h : a.next = h, a = u;
    var y = e.alternate;
    y !== null && (y = y.updateQueue, c = y.lastBaseUpdate, c !== a && (c === null ? y.firstBaseUpdate = h : c.next = h, y.lastBaseUpdate = u));
  }
  if (o !== null) {
    var m = l.baseState;
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
          var I = e, S = c;
          switch (f = t, v = n, S.tag) {
            case 1:
              if (I = S.payload, typeof I == "function") {
                m = I.call(v, m, f);
                break e;
              }
              m = I;
              break e;
            case 3:
              I.flags = I.flags & -65537 | 128;
            case 0:
              if (I = S.payload, f = typeof I == "function" ? I.call(v, m, f) : I, f == null) break e;
              m = un({}, m, f);
              break e;
            case 2:
              mr = !0;
          }
        }
        c.callback !== null && c.lane !== 0 && (e.flags |= 64, f = l.effects, f === null ? l.effects = [c] : f.push(c));
      } else v = { eventTime: v, lane: f, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, y === null ? (h = y = v, u = m) : y = y.next = v, a |= f;
      if (c = c.next, c === null) {
        if (c = l.shared.pending, c === null) break;
        f = c, c = f.next, f.next = null, l.lastBaseUpdate = f, l.shared.pending = null;
      }
    } while (!0);
    if (y === null && (u = m), l.baseState = u, l.firstBaseUpdate = h, l.lastBaseUpdate = y, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        a |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    rl |= a, e.lanes = a, e.memoizedState = m;
  }
}
function ph(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(Le(191, l));
      l.call(r);
    }
  }
}
var Jo = {}, Ps = Rr(Jo), Bo = Rr(Jo), Uo = Rr(Jo);
function Qr(e) {
  if (e === Jo) throw Error(Le(174));
  return e;
}
function zu(e, t) {
  switch (qt(Uo, t), qt(Bo, e), qt(Ps, Jo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Cc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Cc(t, e);
  }
  sn(Ps), qt(Ps, t);
}
function Wl() {
  sn(Ps), sn(Bo), sn(Uo);
}
function pp(e) {
  Qr(Uo.current);
  var t = Qr(Ps.current), n = Cc(t, e.type);
  t !== n && (qt(Bo, e), qt(Ps, n));
}
function Ku(e) {
  Bo.current === e && (sn(Ps), sn(Bo));
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
var Ia = er.ReactCurrentDispatcher, tc = er.ReactCurrentBatchConfig, sl = 0, cn = null, Nn = null, jn = null, si = !1, Eo = !1, Wo = 0, _g = 0;
function Tn() {
  throw Error(Le(321));
}
function Yu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Is(e[n], t[n])) return !1;
  return !0;
}
function Xu(e, t, n, r, l, o) {
  if (sl = o, cn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ia.current = e === null || e.memoizedState === null ? Wg : Hg, e = n(r, l), Eo) {
    o = 0;
    do {
      if (Eo = !1, Wo = 0, 25 <= o) throw Error(Le(301));
      o += 1, jn = Nn = null, t.updateQueue = null, Ia.current = zg, e = n(r, l);
    } while (Eo);
  }
  if (Ia.current = ri, t = Nn !== null && Nn.next !== null, sl = 0, jn = Nn = cn = null, si = !1, t) throw Error(Le(300));
  return e;
}
function Gu() {
  var e = Wo !== 0;
  return Wo = 0, e;
}
function Rs() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return jn === null ? cn.memoizedState = jn = e : jn = jn.next = e, jn;
}
function ys() {
  if (Nn === null) {
    var e = cn.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Nn.next;
  var t = jn === null ? cn.memoizedState : jn.next;
  if (t !== null) jn = t, Nn = e;
  else {
    if (e === null) throw Error(Le(310));
    Nn = e, e = { memoizedState: Nn.memoizedState, baseState: Nn.baseState, baseQueue: Nn.baseQueue, queue: Nn.queue, next: null }, jn === null ? cn.memoizedState = jn = e : jn = jn.next = e;
  }
  return jn;
}
function Ho(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function nc(e) {
  var t = ys(), n = t.queue;
  if (n === null) throw Error(Le(311));
  n.lastRenderedReducer = e;
  var r = Nn, l = r.baseQueue, o = n.pending;
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
      if ((sl & y) === y) u !== null && (u = u.next = { lane: 0, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }), r = h.hasEagerState ? h.eagerState : e(r, h.action);
      else {
        var m = {
          lane: y,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        };
        u === null ? (c = u = m, a = r) : u = u.next = m, cn.lanes |= y, rl |= y;
      }
      h = h.next;
    } while (h !== null && h !== o);
    u === null ? a = r : u.next = c, Is(r, t.memoizedState) || (Xn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, cn.lanes |= o, rl |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function sc(e) {
  var t = ys(), n = t.queue;
  if (n === null) throw Error(Le(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Is(o, t.memoizedState) || (Xn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function mp() {
}
function gp(e, t) {
  var n = cn, r = ys(), l = t(), o = !Is(r.memoizedState, l);
  if (o && (r.memoizedState = l, Xn = !0), r = r.queue, Qu(vp.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || jn !== null && jn.memoizedState.tag & 1) {
    if (n.flags |= 2048, zo(9, yp.bind(null, n, r, l, t), void 0, null), Cn === null) throw Error(Le(349));
    sl & 30 || xp(n, t, l);
  }
  return l;
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
    return !Is(e, n);
  } catch {
    return !0;
  }
}
function kp(e) {
  var t = qs(e, 1);
  t !== null && Ms(t, e, 1, -1);
}
function mh(e) {
  var t = Rs();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ho, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ug.bind(null, cn, e), [t.memoizedState, e];
}
function zo(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = cn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, cn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function wp() {
  return ys().memoizedState;
}
function Ta(e, t, n, r) {
  var l = Rs();
  cn.flags |= e, l.memoizedState = zo(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ni(e, t, n, r) {
  var l = ys();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Nn !== null) {
    var a = Nn.memoizedState;
    if (o = a.destroy, r !== null && Yu(r, a.deps)) {
      l.memoizedState = zo(t, n, o, r);
      return;
    }
  }
  cn.flags |= e, l.memoizedState = zo(1 | t, n, o, r);
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
  var n = ys();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Yu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Mp(e, t) {
  var n = ys();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Yu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ip(e, t, n) {
  return sl & 21 ? (Is(n, t) || (n = Lf(), cn.lanes |= n, rl |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Xn = !0), e.memoizedState = n);
}
function Fg(e, t) {
  var n = Ht;
  Ht = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = tc.transition;
  tc.transition = {};
  try {
    e(!1), t();
  } finally {
    Ht = n, tc.transition = r;
  }
}
function Tp() {
  return ys().memoizedState;
}
function Bg(e, t, n) {
  var r = Mr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, $p(e)) Ap(t, n);
  else if (n = hp(e, t, n, r), n !== null) {
    var l = Fn();
    Ms(n, e, r, l), Rp(n, t, r);
  }
}
function Ug(e, t, n) {
  var r = Mr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if ($p(e)) Ap(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, c = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = c, Is(c, a)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Wu(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = hp(e, t, l, r), n !== null && (l = Fn(), Ms(n, e, r, l), Rp(n, t, r));
  }
}
function $p(e) {
  var t = e.alternate;
  return e === cn || t !== null && t === cn;
}
function Ap(e, t) {
  Eo = si = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Rp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Mu(e, n);
  }
}
var ri = { readContext: xs, useCallback: Tn, useContext: Tn, useEffect: Tn, useImperativeHandle: Tn, useInsertionEffect: Tn, useLayoutEffect: Tn, useMemo: Tn, useReducer: Tn, useRef: Tn, useState: Tn, useDebugValue: Tn, useDeferredValue: Tn, useTransition: Tn, useMutableSource: Tn, useSyncExternalStore: Tn, useId: Tn, unstable_isNewReconciler: !1 }, Wg = { readContext: xs, useCallback: function(e, t) {
  return Rs().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: xs, useEffect: gh, useImperativeHandle: function(e, t, n) {
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
  var n = Rs();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Rs();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Bg.bind(null, cn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Rs();
  return e = { current: e }, t.memoizedState = e;
}, useState: mh, useDebugValue: Ju, useDeferredValue: function(e) {
  return Rs().memoizedState = e;
}, useTransition: function() {
  var e = mh(!1), t = e[0];
  return e = Fg.bind(null, e[1]), Rs().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = cn, l = Rs();
  if (rn) {
    if (n === void 0) throw Error(Le(407));
    n = n();
  } else {
    if (n = t(), Cn === null) throw Error(Le(349));
    sl & 30 || xp(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, gh(vp.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, zo(9, yp.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Rs(), t = Cn.identifierPrefix;
  if (rn) {
    var n = Ys, r = Vs;
    n = (r & ~(1 << 32 - bs(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Wo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = _g++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Hg = {
  readContext: xs,
  useCallback: bp,
  useContext: xs,
  useEffect: Qu,
  useImperativeHandle: Sp,
  useInsertionEffect: jp,
  useLayoutEffect: Cp,
  useMemo: Mp,
  useReducer: nc,
  useRef: wp,
  useState: function() {
    return nc(Ho);
  },
  useDebugValue: Ju,
  useDeferredValue: function(e) {
    var t = ys();
    return Ip(t, Nn.memoizedState, e);
  },
  useTransition: function() {
    var e = nc(Ho)[0], t = ys().memoizedState;
    return [e, t];
  },
  useMutableSource: mp,
  useSyncExternalStore: gp,
  useId: Tp,
  unstable_isNewReconciler: !1
}, zg = { readContext: xs, useCallback: bp, useContext: xs, useEffect: Qu, useImperativeHandle: Sp, useInsertionEffect: jp, useLayoutEffect: Cp, useMemo: Mp, useReducer: sc, useRef: wp, useState: function() {
  return sc(Ho);
}, useDebugValue: Ju, useDeferredValue: function(e) {
  var t = ys();
  return Nn === null ? t.memoizedState = e : Ip(t, Nn.memoizedState, e);
}, useTransition: function() {
  var e = sc(Ho)[0], t = ys().memoizedState;
  return [e, t];
}, useMutableSource: mp, useSyncExternalStore: gp, useId: Tp, unstable_isNewReconciler: !1 };
function ws(e, t) {
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
  return (e = e._reactInternals) ? al(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Fn(), l = Mr(e), o = Xs(r, l);
  o.payload = t, n != null && (o.callback = n), t = Sr(e, o, l), t !== null && (Ms(t, e, l, r), Ma(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Fn(), l = Mr(e), o = Xs(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Sr(e, o, l), t !== null && (Ms(t, e, l, r), Ma(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Fn(), r = Mr(e), l = Xs(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Sr(e, l, r), t !== null && (Ms(t, e, r, n), Ma(t, e, r));
} };
function xh(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !Do(n, r) || !Do(l, o) : !0;
}
function Lp(e, t, n) {
  var r = !1, l = $r, o = t.contextType;
  return typeof o == "object" && o !== null ? o = xs(o) : (l = Qn(t) ? tl : Rn.current, r = t.contextTypes, o = (r = r != null) ? Fl(e, l) : $r), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ki, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function yh(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ki.enqueueReplaceState(t, t.state, null);
}
function Vc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Hu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = xs(o) : (o = Qn(t) ? tl : Rn.current, l.context = Fl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Kc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ki.enqueueReplaceState(l, l.state, null), ti(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Hl(e, t) {
  try {
    var n = "", r = t;
    do
      n += y0(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
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
var Kg = typeof WeakMap == "function" ? WeakMap : Map;
function Op(e, t, n) {
  n = Xs(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    oi || (oi = !0, su = r), Yc(e, t);
  }, n;
}
function Dp(e, t, n) {
  n = Xs(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Yc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Yc(e, t), typeof r != "function" && (br === null ? br = /* @__PURE__ */ new Set([this]) : br.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function vh(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Kg();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = lx.bind(null, e, t, n), t.then(e, e));
}
function Nh(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function kh(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Xs(-1, 1), t.tag = 2, Sr(n, t, 1))), n.lanes |= 1), e);
}
var Vg = er.ReactCurrentOwner, Xn = !1;
function _n(e, t, n, r) {
  t.child = e === null ? dp(t, null, n, r) : Ul(t, e.child, n, r);
}
function wh(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Rl(t, l), r = Xu(e, t, n, r, o, l), n = Gu(), e !== null && !Xn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Zs(e, t, l)) : (rn && n && Du(t), t.flags |= 1, _n(e, t, r, l), t.child);
}
function jh(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !ld(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Pp(e, t, o, r, l)) : (e = La(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Do, n(a, r) && e.ref === t.ref) return Zs(e, t, l);
  }
  return t.flags |= 1, e = Ir(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Pp(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Do(o, r) && e.ref === t.ref) if (Xn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Xn = !0);
    else return t.lanes = e.lanes, Zs(e, t, l);
  }
  return Xc(e, t, n, r, l);
}
function _p(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, qt(bl, ts), ts |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, qt(bl, ts), ts |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, qt(bl, ts), ts |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, qt(bl, ts), ts |= r;
  return _n(e, t, l, n), t.child;
}
function Fp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Xc(e, t, n, r, l) {
  var o = Qn(n) ? tl : Rn.current;
  return o = Fl(t, o), Rl(t, l), n = Xu(e, t, n, r, o, l), r = Gu(), e !== null && !Xn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Zs(e, t, l)) : (rn && r && Du(t), t.flags |= 1, _n(e, t, n, l), t.child);
}
function Ch(e, t, n, r, l) {
  if (Qn(n)) {
    var o = !0;
    Qa(t);
  } else o = !1;
  if (Rl(t, l), t.stateNode === null) $a(e, t), Lp(t, n, r), Vc(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, c = t.memoizedProps;
    a.props = c;
    var u = a.context, h = n.contextType;
    typeof h == "object" && h !== null ? h = xs(h) : (h = Qn(n) ? tl : Rn.current, h = Fl(t, h));
    var y = n.getDerivedStateFromProps, m = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    m || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== r || u !== h) && yh(t, a, r, h), mr = !1;
    var f = t.memoizedState;
    a.state = f, ti(t, r, a, l), u = t.memoizedState, c !== r || f !== u || Gn.current || mr ? (typeof y == "function" && (Kc(t, n, y, r), u = t.memoizedState), (c = mr || xh(t, n, c, r, f, u, h)) ? (m || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), a.props = r, a.state = u, a.context = h, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, fp(e, t), c = t.memoizedProps, h = t.type === t.elementType ? c : ws(t.type, c), a.props = h, m = t.pendingProps, f = a.context, u = n.contextType, typeof u == "object" && u !== null ? u = xs(u) : (u = Qn(n) ? tl : Rn.current, u = Fl(t, u));
    var v = n.getDerivedStateFromProps;
    (y = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== m || f !== u) && yh(t, a, r, u), mr = !1, f = t.memoizedState, a.state = f, ti(t, r, a, l);
    var I = t.memoizedState;
    c !== m || f !== I || Gn.current || mr ? (typeof v == "function" && (Kc(t, n, v, r), I = t.memoizedState), (h = mr || xh(t, n, h, r, f, I, u) || !1) ? (y || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, I, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, I, u)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = I), a.props = r, a.state = I, a.context = u, r = h) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Gc(e, t, n, r, o, l);
}
function Gc(e, t, n, r, l, o) {
  Fp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && ch(t, n, !1), Zs(e, t, o);
  r = t.stateNode, Vg.current = t;
  var c = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Ul(t, e.child, null, o), t.child = Ul(t, null, c, o)) : _n(e, t, c, o), t.memoizedState = r.state, l && ch(t, n, !0), t.child;
}
function Bp(e) {
  var t = e.stateNode;
  t.pendingContext ? ih(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ih(e, t.context, !1), zu(e, t.containerInfo);
}
function Eh(e, t, n, r, l) {
  return Bl(), _u(l), t.flags |= 256, _n(e, t, n, r), t.child;
}
var Qc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Jc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Up(e, t, n) {
  var r = t.pendingProps, l = an.current, o = !1, a = (t.flags & 128) !== 0, c;
  if ((c = a) || (c = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), c ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), qt(an, l & 1), e === null)
    return Hc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = Ci(a, r, 0, null), e = el(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Jc(n), t.memoizedState = Qc, e) : qu(t, a));
  if (l = e.memoizedState, l !== null && (c = l.dehydrated, c !== null)) return Yg(e, t, a, r, c, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, c = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Ir(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), c !== null ? o = Ir(c, o) : (o = el(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Jc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Qc, r;
  }
  return o = e.child, e = o.sibling, r = Ir(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function qu(e, t) {
  return t = Ci({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ma(e, t, n, r) {
  return r !== null && _u(r), Ul(t, e.child, null, n), e = qu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Yg(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = rc(Error(Le(422))), ma(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Ci({ mode: "visible", children: r.children }, l, 0, null), o = el(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Ul(t, e.child, null, a), t.child.memoizedState = Jc(a), t.memoizedState = Qc, o);
  if (!(t.mode & 1)) return ma(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var c = r.dgst;
    return r = c, o = Error(Le(419)), r = rc(o, r, void 0), ma(e, t, a, r);
  }
  if (c = (a & e.childLanes) !== 0, Xn || c) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, qs(e, l), Ms(r, e, l, -1));
    }
    return rd(), r = rc(Error(Le(421))), ma(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = ox.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, ss = Er(l.nextSibling), rs = t, rn = !0, Es = null, e !== null && (fs[ps++] = Vs, fs[ps++] = Ys, fs[ps++] = nl, Vs = e.id, Ys = e.overflow, nl = t), t = qu(t, r.children), t.flags |= 4096, t);
}
function Sh(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), zc(e.return, t, n);
}
function lc(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Wp(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
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
  if (qt(an, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ni(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), lc(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ni(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      lc(t, !0, n, null, o);
      break;
    case "together":
      lc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function $a(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Zs(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), rl |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(Le(153));
  if (t.child !== null) {
    for (e = t.child, n = Ir(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ir(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Xg(e, t, n) {
  switch (t.tag) {
    case 3:
      Bp(t), Bl();
      break;
    case 5:
      pp(t);
      break;
    case 1:
      Qn(t.type) && Qa(t);
      break;
    case 4:
      zu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      qt(Za, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (qt(an, an.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Up(e, t, n) : (qt(an, an.current & 1), e = Zs(e, t, n), e !== null ? e.sibling : null);
      qt(an, an.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Wp(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), qt(an, an.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, _p(e, t, n);
  }
  return Zs(e, t, n);
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
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Qr(Ps.current);
    var o = null;
    switch (n) {
      case "input":
        l = Nc(e, l), r = Nc(e, r), o = [];
        break;
      case "select":
        l = un({}, l, { value: void 0 }), r = un({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = jc(e, l), r = jc(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Xa);
    }
    Ec(n, r);
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
      else h === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, c = c ? c.__html : void 0, u != null && c !== u && (o = o || []).push(h, u)) : h === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(h, "" + u) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && (Io.hasOwnProperty(h) ? (u != null && h === "onScroll" && nn("scroll", e), o || c === u || (o = [])) : (o = o || []).push(h, u));
    }
    n && (o = o || []).push("style", n);
    var h = o;
    (t.updateQueue = h) && (t.flags |= 4);
  }
};
Kp = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function io(e, t) {
  if (!rn) switch (e.tailMode) {
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
function Gg(e, t, n) {
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
      return Qn(t.type) && Ga(), $n(t), null;
    case 3:
      return r = t.stateNode, Wl(), sn(Gn), sn(Rn), Vu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (fa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Es !== null && (ou(Es), Es = null))), qc(e, t), $n(t), null;
    case 5:
      Ku(t);
      var l = Qr(Uo.current);
      if (n = t.type, e !== null && t.stateNode != null) zp(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(Le(166));
          return $n(t), null;
        }
        if (e = Qr(Ps.current), fa(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ls] = t, r[Fo] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              nn("cancel", r), nn("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              nn("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < yo.length; l++) nn(yo[l], r);
              break;
            case "source":
              nn("error", r);
              break;
            case "img":
            case "image":
            case "link":
              nn(
                "error",
                r
              ), nn("load", r);
              break;
            case "details":
              nn("toggle", r);
              break;
            case "input":
              Od(r, o), nn("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, nn("invalid", r);
              break;
            case "textarea":
              Pd(r, o), nn("invalid", r);
          }
          Ec(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var c = o[a];
            a === "children" ? typeof c == "string" ? r.textContent !== c && (o.suppressHydrationWarning !== !0 && ha(r.textContent, c, e), l = ["children", c]) : typeof c == "number" && r.textContent !== "" + c && (o.suppressHydrationWarning !== !0 && ha(
              r.textContent,
              c,
              e
            ), l = ["children", "" + c]) : Io.hasOwnProperty(a) && c != null && a === "onScroll" && nn("scroll", r);
          }
          switch (n) {
            case "input":
              ra(r), Dd(r, o, !0);
              break;
            case "textarea":
              ra(r), _d(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Xa);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = vf(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Ls] = t, e[Fo] = r, Hp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = Sc(n, r), n) {
              case "dialog":
                nn("cancel", e), nn("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                nn("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < yo.length; l++) nn(yo[l], e);
                l = r;
                break;
              case "source":
                nn("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                nn(
                  "error",
                  e
                ), nn("load", e), l = r;
                break;
              case "details":
                nn("toggle", e), l = r;
                break;
              case "input":
                Od(e, r), l = Nc(e, r), nn("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = un({}, r, { value: void 0 }), nn("invalid", e);
                break;
              case "textarea":
                Pd(e, r), l = jc(e, r), nn("invalid", e);
                break;
              default:
                l = r;
            }
            Ec(n, l), c = l;
            for (o in c) if (c.hasOwnProperty(o)) {
              var u = c[o];
              o === "style" ? wf(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Nf(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && To(e, u) : typeof u == "number" && To(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Io.hasOwnProperty(o) ? u != null && o === "onScroll" && nn("scroll", e) : u != null && wu(e, o, u, a));
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
                e.multiple = !!r.multiple, o = r.value, o != null ? Il(e, !!r.multiple, o, !1) : r.defaultValue != null && Il(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Xa);
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
        if (typeof r != "string" && t.stateNode === null) throw Error(Le(166));
        if (n = Qr(Uo.current), Qr(Ps.current), fa(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ls] = t, (o = r.nodeValue !== n) && (e = rs, e !== null)) switch (e.tag) {
            case 3:
              ha(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && ha(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ls] = t, t.stateNode = r;
      }
      return $n(t), null;
    case 13:
      if (sn(an), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (rn && ss !== null && t.mode & 1 && !(t.flags & 128)) cp(), Bl(), t.flags |= 98560, o = !1;
        else if (o = fa(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(Le(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(Le(317));
            o[Ls] = t;
          } else Bl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          $n(t), o = !1;
        } else Es !== null && (ou(Es), Es = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || an.current & 1 ? kn === 0 && (kn = 3) : rd())), t.updateQueue !== null && (t.flags |= 4), $n(t), null);
    case 4:
      return Wl(), qc(e, t), e === null && Po(t.stateNode.containerInfo), $n(t), null;
    case 10:
      return Uu(t.type._context), $n(t), null;
    case 17:
      return Qn(t.type) && Ga(), $n(t), null;
    case 19:
      if (sn(an), o = t.memoizedState, o === null) return $n(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) io(o, !1);
      else {
        if (kn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = ni(e), a !== null) {
            for (t.flags |= 128, io(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return qt(an, an.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && mn() > zl && (t.flags |= 128, r = !0, io(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ni(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), io(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !rn) return $n(t), null;
        } else 2 * mn() - o.renderingStartTime > zl && n !== 1073741824 && (t.flags |= 128, r = !0, io(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = mn(), t.sibling = null, n = an.current, qt(an, r ? n & 1 | 2 : n & 1), t) : ($n(t), null);
    case 22:
    case 23:
      return sd(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ts & 1073741824 && ($n(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : $n(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Le(156, t.tag));
}
function Qg(e, t) {
  switch (Pu(t), t.tag) {
    case 1:
      return Qn(t.type) && Ga(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Wl(), sn(Gn), sn(Rn), Vu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ku(t), null;
    case 13:
      if (sn(an), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(Le(340));
        Bl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return sn(an), null;
    case 4:
      return Wl(), null;
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
var ga = !1, An = !1, Jg = typeof WeakSet == "function" ? WeakSet : Set, Ve = null;
function Sl(e, t) {
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
function qg(e, t) {
  if (Dc = Ka, e = Qf(), Ou(e)) {
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
        var a = 0, c = -1, u = -1, h = 0, y = 0, m = e, f = null;
        t: for (; ; ) {
          for (var v; m !== n || l !== 0 && m.nodeType !== 3 || (c = a + l), m !== o || r !== 0 && m.nodeType !== 3 || (u = a + r), m.nodeType === 3 && (a += m.nodeValue.length), (v = m.firstChild) !== null; )
            f = m, m = v;
          for (; ; ) {
            if (m === e) break t;
            if (f === n && ++h === l && (c = a), f === o && ++y === r && (u = a), (v = m.nextSibling) !== null) break;
            m = f, f = m.parentNode;
          }
          m = v;
        }
        n = c === -1 || u === -1 ? null : { start: c, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Pc = { focusedElem: e, selectionRange: n }, Ka = !1, Ve = t; Ve !== null; ) if (t = Ve, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ve = e;
  else for (; Ve !== null; ) {
    t = Ve;
    try {
      var I = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (I !== null) {
            var S = I.memoizedProps, O = I.memoizedState, w = t.stateNode, g = w.getSnapshotBeforeUpdate(t.elementType === t.type ? S : ws(t.type, S), O);
            w.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var k = t.stateNode.containerInfo;
          k.nodeType === 1 ? k.textContent = "" : k.nodeType === 9 && k.documentElement && k.removeChild(k.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(Le(163));
      }
    } catch (b) {
      hn(t, t.return, b);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Ve = e;
      break;
    }
    Ve = t.return;
  }
  return I = bh, bh = !1, I;
}
function So(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Zc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
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
  t !== null && (e.alternate = null, Vp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ls], delete t[Fo], delete t[Bc], delete t[Lg], delete t[Og])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
var Sn = null, js = !1;
function dr(e, t, n) {
  for (n = n.child; n !== null; ) Xp(e, t, n), n = n.sibling;
}
function Xp(e, t, n) {
  if (Ds && typeof Ds.onCommitFiberUnmount == "function") try {
    Ds.onCommitFiberUnmount(pi, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      An || Sl(n, t);
    case 6:
      var r = Sn, l = js;
      Sn = null, dr(e, t, n), Sn = r, js = l, Sn !== null && (js ? (e = Sn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Sn.removeChild(n.stateNode));
      break;
    case 18:
      Sn !== null && (js ? (e = Sn, n = n.stateNode, e.nodeType === 8 ? qi(e.parentNode, n) : e.nodeType === 1 && qi(e, n), Lo(e)) : qi(Sn, n.stateNode));
      break;
    case 4:
      r = Sn, l = js, Sn = n.stateNode.containerInfo, js = !0, dr(e, t, n), Sn = r, js = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!An && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Zc(n, t, a), l = l.next;
        } while (l !== r);
      }
      dr(e, t, n);
      break;
    case 1:
      if (!An && (Sl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (c) {
        hn(n, t, c);
      }
      dr(e, t, n);
      break;
    case 21:
      dr(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (An = (r = An) || n.memoizedState !== null, dr(e, t, n), An = r) : dr(e, t, n);
      break;
    default:
      dr(e, t, n);
  }
}
function Ih(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Jg()), t.forEach(function(r) {
      var l = ax.bind(null, e, r);
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
      if (Sn === null) throw Error(Le(160));
      Xp(o, a, l), Sn = null, js = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (h) {
      hn(l, t, h);
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
      if (ks(t, e), As(e), r & 4) {
        try {
          So(3, e, e.return), wi(3, e);
        } catch (S) {
          hn(e, e.return, S);
        }
        try {
          So(5, e, e.return);
        } catch (S) {
          hn(e, e.return, S);
        }
      }
      break;
    case 1:
      ks(t, e), As(e), r & 512 && n !== null && Sl(n, n.return);
      break;
    case 5:
      if (ks(t, e), As(e), r & 512 && n !== null && Sl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          To(l, "");
        } catch (S) {
          hn(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, c = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          c === "input" && o.type === "radio" && o.name != null && xf(l, o), Sc(c, a);
          var h = Sc(c, o);
          for (a = 0; a < u.length; a += 2) {
            var y = u[a], m = u[a + 1];
            y === "style" ? wf(l, m) : y === "dangerouslySetInnerHTML" ? Nf(l, m) : y === "children" ? To(l, m) : wu(l, y, m, h);
          }
          switch (c) {
            case "input":
              kc(l, o);
              break;
            case "textarea":
              yf(l, o);
              break;
            case "select":
              var f = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var v = o.value;
              v != null ? Il(l, !!o.multiple, v, !1) : f !== !!o.multiple && (o.defaultValue != null ? Il(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Il(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Fo] = o;
        } catch (S) {
          hn(e, e.return, S);
        }
      }
      break;
    case 6:
      if (ks(t, e), As(e), r & 4) {
        if (e.stateNode === null) throw Error(Le(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (S) {
          hn(e, e.return, S);
        }
      }
      break;
    case 3:
      if (ks(t, e), As(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Lo(t.containerInfo);
      } catch (S) {
        hn(e, e.return, S);
      }
      break;
    case 4:
      ks(t, e), As(e);
      break;
    case 13:
      ks(t, e), As(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (td = mn())), r & 4 && Ih(e);
      break;
    case 22:
      if (y = n !== null && n.memoizedState !== null, e.mode & 1 ? (An = (h = An) || y, ks(t, e), An = h) : ks(t, e), As(e), r & 8192) {
        if (h = e.memoizedState !== null, (e.stateNode.isHidden = h) && !y && e.mode & 1) for (Ve = e, y = e.child; y !== null; ) {
          for (m = Ve = y; Ve !== null; ) {
            switch (f = Ve, v = f.child, f.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                So(4, f, f.return);
                break;
              case 1:
                Sl(f, f.return);
                var I = f.stateNode;
                if (typeof I.componentWillUnmount == "function") {
                  r = f, n = f.return;
                  try {
                    t = r, I.props = t.memoizedProps, I.state = t.memoizedState, I.componentWillUnmount();
                  } catch (S) {
                    hn(r, n, S);
                  }
                }
                break;
              case 5:
                Sl(f, f.return);
                break;
              case 22:
                if (f.memoizedState !== null) {
                  $h(m);
                  continue;
                }
            }
            v !== null ? (v.return = f, Ve = v) : $h(m);
          }
          y = y.sibling;
        }
        e: for (y = null, m = e; ; ) {
          if (m.tag === 5) {
            if (y === null) {
              y = m;
              try {
                l = m.stateNode, h ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = m.stateNode, u = m.memoizedProps.style, a = u != null && u.hasOwnProperty("display") ? u.display : null, c.style.display = kf("display", a));
              } catch (S) {
                hn(e, e.return, S);
              }
            }
          } else if (m.tag === 6) {
            if (y === null) try {
              m.stateNode.nodeValue = h ? "" : m.memoizedProps;
            } catch (S) {
              hn(e, e.return, S);
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
      ks(t, e), As(e), r & 4 && Ih(e);
      break;
    case 21:
      break;
    default:
      ks(
        t,
        e
      ), As(e);
  }
}
function As(e) {
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
        throw Error(Le(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (To(l, ""), r.flags &= -33);
          var o = Mh(e);
          nu(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, c = Mh(e);
          tu(e, c, a);
          break;
        default:
          throw Error(Le(161));
      }
    } catch (u) {
      hn(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Zg(e, t, n) {
  Ve = e, Qp(e);
}
function Qp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Ve !== null; ) {
    var l = Ve, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || ga;
      if (!a) {
        var c = l.alternate, u = c !== null && c.memoizedState !== null || An;
        c = ga;
        var h = An;
        if (ga = a, (An = u) && !h) for (Ve = l; Ve !== null; ) a = Ve, u = a.child, a.tag === 22 && a.memoizedState !== null ? Ah(l) : u !== null ? (u.return = a, Ve = u) : Ah(l);
        for (; o !== null; ) Ve = o, Qp(o), o = o.sibling;
        Ve = l, ga = c, An = h;
      }
      Th(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Ve = o) : Th(e);
  }
}
function Th(e) {
  for (; Ve !== null; ) {
    var t = Ve;
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
              var l = t.elementType === t.type ? n.memoizedProps : ws(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && ph(t, o, r);
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
              var h = t.alternate;
              if (h !== null) {
                var y = h.memoizedState;
                if (y !== null) {
                  var m = y.dehydrated;
                  m !== null && Lo(m);
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
            throw Error(Le(163));
        }
        An || t.flags & 512 && eu(t);
      } catch (f) {
        hn(t, t.return, f);
      }
    }
    if (t === e) {
      Ve = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Ve = n;
      break;
    }
    Ve = t.return;
  }
}
function $h(e) {
  for (; Ve !== null; ) {
    var t = Ve;
    if (t === e) {
      Ve = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Ve = n;
      break;
    }
    Ve = t.return;
  }
}
function Ah(e) {
  for (; Ve !== null; ) {
    var t = Ve;
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
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              hn(t, l, u);
            }
          }
          var o = t.return;
          try {
            eu(t);
          } catch (u) {
            hn(t, o, u);
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
      Ve = null;
      break;
    }
    var c = t.sibling;
    if (c !== null) {
      c.return = t.return, Ve = c;
      break;
    }
    Ve = t.return;
  }
}
var ex = Math.ceil, li = er.ReactCurrentDispatcher, Zu = er.ReactCurrentOwner, gs = er.ReactCurrentBatchConfig, Pt = 0, Cn = null, xn = null, bn = 0, ts = 0, bl = Rr(0), kn = 0, Ko = null, rl = 0, ji = 0, ed = 0, bo = null, Yn = null, td = 0, zl = 1 / 0, Hs = null, oi = !1, su = null, br = null, xa = !1, kr = null, ai = 0, Mo = 0, ru = null, Aa = -1, Ra = 0;
function Fn() {
  return Pt & 6 ? mn() : Aa !== -1 ? Aa : Aa = mn();
}
function Mr(e) {
  return e.mode & 1 ? Pt & 2 && bn !== 0 ? bn & -bn : Pg.transition !== null ? (Ra === 0 && (Ra = Lf()), Ra) : (e = Ht, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Uf(e.type)), e) : 1;
}
function Ms(e, t, n, r) {
  if (50 < Mo) throw Mo = 0, ru = null, Error(Le(185));
  Xo(e, n, r), (!(Pt & 2) || e !== Cn) && (e === Cn && (!(Pt & 2) && (ji |= n), kn === 4 && yr(e, bn)), Jn(e, r), n === 1 && Pt === 0 && !(t.mode & 1) && (zl = mn() + 500, vi && Lr()));
}
function Jn(e, t) {
  var n = e.callbackNode;
  P0(e, t);
  var r = za(e, e === Cn ? bn : 0);
  if (r === 0) n !== null && Ud(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Ud(n), t === 1) e.tag === 0 ? Dg(Rh.bind(null, e)) : op(Rh.bind(null, e)), Ag(function() {
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
  if (Aa = -1, Ra = 0, Pt & 6) throw Error(Le(327));
  var n = e.callbackNode;
  if (Ll() && e.callbackNode !== n) return null;
  var r = za(e, e === Cn ? bn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ii(e, r);
  else {
    t = r;
    var l = Pt;
    Pt |= 2;
    var o = Zp();
    (Cn !== e || bn !== t) && (Hs = null, zl = mn() + 500, Zr(e, t));
    do
      try {
        sx();
        break;
      } catch (c) {
        qp(e, c);
      }
    while (!0);
    Bu(), li.current = o, Pt = l, xn !== null ? t = 0 : (Cn = null, bn = 0, t = kn);
  }
  if (t !== 0) {
    if (t === 2 && (l = $c(e), l !== 0 && (r = l, t = lu(e, l))), t === 1) throw n = Ko, Zr(e, 0), yr(e, r), Jn(e, mn()), n;
    if (t === 6) yr(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !tx(l) && (t = ii(e, r), t === 2 && (o = $c(e), o !== 0 && (r = o, t = lu(e, o))), t === 1)) throw n = Ko, Zr(e, 0), yr(e, r), Jn(e, mn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(Le(345));
        case 2:
          Kr(e, Yn, Hs);
          break;
        case 3:
          if (yr(e, r), (r & 130023424) === r && (t = td + 500 - mn(), 10 < t)) {
            if (za(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Fn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Fc(Kr.bind(null, e, Yn, Hs), t);
            break;
          }
          Kr(e, Yn, Hs);
          break;
        case 4:
          if (yr(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - bs(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = mn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ex(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Fc(Kr.bind(null, e, Yn, Hs), r);
            break;
          }
          Kr(e, Yn, Hs);
          break;
        case 5:
          Kr(e, Yn, Hs);
          break;
        default:
          throw Error(Le(329));
      }
    }
  }
  return Jn(e, mn()), e.callbackNode === n ? Jp.bind(null, e) : null;
}
function lu(e, t) {
  var n = bo;
  return e.current.memoizedState.isDehydrated && (Zr(e, t).flags |= 256), e = ii(e, t), e !== 2 && (t = Yn, Yn = n, t !== null && ou(t)), e;
}
function ou(e) {
  Yn === null ? Yn = e : Yn.push.apply(Yn, e);
}
function tx(e) {
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
  for (t &= ~ed, t &= ~ji, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - bs(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Rh(e) {
  if (Pt & 6) throw Error(Le(327));
  Ll();
  var t = za(e, 0);
  if (!(t & 1)) return Jn(e, mn()), null;
  var n = ii(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = $c(e);
    r !== 0 && (t = r, n = lu(e, r));
  }
  if (n === 1) throw n = Ko, Zr(e, 0), yr(e, t), Jn(e, mn()), n;
  if (n === 6) throw Error(Le(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Kr(e, Yn, Hs), Jn(e, mn()), null;
}
function nd(e, t) {
  var n = Pt;
  Pt |= 1;
  try {
    return e(t);
  } finally {
    Pt = n, Pt === 0 && (zl = mn() + 500, vi && Lr());
  }
}
function ll(e) {
  kr !== null && kr.tag === 0 && !(Pt & 6) && Ll();
  var t = Pt;
  Pt |= 1;
  var n = gs.transition, r = Ht;
  try {
    if (gs.transition = null, Ht = 1, e) return e();
  } finally {
    Ht = r, gs.transition = n, Pt = t, !(Pt & 6) && Lr();
  }
}
function sd() {
  ts = bl.current, sn(bl);
}
function Zr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, $g(n)), xn !== null) for (n = xn.return; n !== null; ) {
    var r = n;
    switch (Pu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ga();
        break;
      case 3:
        Wl(), sn(Gn), sn(Rn), Vu();
        break;
      case 5:
        Ku(r);
        break;
      case 4:
        Wl();
        break;
      case 13:
        sn(an);
        break;
      case 19:
        sn(an);
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
  if (Cn = e, xn = e = Ir(e.current, null), bn = ts = t, kn = 0, Ko = null, ed = ji = rl = 0, Yn = bo = null, Gr !== null) {
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
function qp(e, t) {
  do {
    var n = xn;
    try {
      if (Bu(), Ia.current = ri, si) {
        for (var r = cn.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        si = !1;
      }
      if (sl = 0, jn = Nn = cn = null, Eo = !1, Wo = 0, Zu.current = null, n === null || n.return === null) {
        kn = 1, Ko = t, xn = null;
        break;
      }
      e: {
        var o = e, a = n.return, c = n, u = t;
        if (t = bn, c.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var h = u, y = c, m = y.tag;
          if (!(y.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var f = y.alternate;
            f ? (y.updateQueue = f.updateQueue, y.memoizedState = f.memoizedState, y.lanes = f.lanes) : (y.updateQueue = null, y.memoizedState = null);
          }
          var v = Nh(a);
          if (v !== null) {
            v.flags &= -257, kh(v, a, c, o, t), v.mode & 1 && vh(o, h, t), t = v, u = h;
            var I = t.updateQueue;
            if (I === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(u), t.updateQueue = S;
            } else I.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              vh(o, h, t), rd();
              break e;
            }
            u = Error(Le(426));
          }
        } else if (rn && c.mode & 1) {
          var O = Nh(a);
          if (O !== null) {
            !(O.flags & 65536) && (O.flags |= 256), kh(O, a, c, o, t), _u(Hl(u, c));
            break e;
          }
        }
        o = u = Hl(u, c), kn !== 4 && (kn = 2), bo === null ? bo = [o] : bo.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var w = Op(o, u, t);
              fh(o, w);
              break e;
            case 1:
              c = u;
              var g = o.type, k = o.stateNode;
              if (!(o.flags & 128) && (typeof g.getDerivedStateFromError == "function" || k !== null && typeof k.componentDidCatch == "function" && (br === null || !br.has(k)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var b = Dp(o, c, t);
                fh(o, b);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      tm(n);
    } catch (C) {
      t = C, xn === n && n !== null && (xn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Zp() {
  var e = li.current;
  return li.current = ri, e === null ? ri : e;
}
function rd() {
  (kn === 0 || kn === 3 || kn === 2) && (kn = 4), Cn === null || !(rl & 268435455) && !(ji & 268435455) || yr(Cn, bn);
}
function ii(e, t) {
  var n = Pt;
  Pt |= 2;
  var r = Zp();
  (Cn !== e || bn !== t) && (Hs = null, Zr(e, t));
  do
    try {
      nx();
      break;
    } catch (l) {
      qp(e, l);
    }
  while (!0);
  if (Bu(), Pt = n, li.current = r, xn !== null) throw Error(Le(261));
  return Cn = null, bn = 0, kn;
}
function nx() {
  for (; xn !== null; ) em(xn);
}
function sx() {
  for (; xn !== null && !M0(); ) em(xn);
}
function em(e) {
  var t = sm(e.alternate, e, ts);
  e.memoizedProps = e.pendingProps, t === null ? tm(e) : xn = t, Zu.current = null;
}
function tm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Qg(n, t), n !== null) {
        n.flags &= 32767, xn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        kn = 6, xn = null;
        return;
      }
    } else if (n = Gg(n, t, ts), n !== null) {
      xn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      xn = t;
      return;
    }
    xn = t = e;
  } while (t !== null);
  kn === 0 && (kn = 5);
}
function Kr(e, t, n) {
  var r = Ht, l = gs.transition;
  try {
    gs.transition = null, Ht = 1, rx(e, t, n, r);
  } finally {
    gs.transition = l, Ht = r;
  }
  return null;
}
function rx(e, t, n, r) {
  do
    Ll();
  while (kr !== null);
  if (Pt & 6) throw Error(Le(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(Le(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (_0(e, o), e === Cn && (xn = Cn = null, bn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xa || (xa = !0, rm(Ha, function() {
    return Ll(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = gs.transition, gs.transition = null;
    var a = Ht;
    Ht = 1;
    var c = Pt;
    Pt |= 4, Zu.current = null, qg(e, n), Gp(n, e), Cg(Pc), Ka = !!Dc, Pc = Dc = null, e.current = n, Zg(n), I0(), Pt = c, Ht = a, gs.transition = o;
  } else e.current = n;
  if (xa && (xa = !1, kr = e, ai = l), o = e.pendingLanes, o === 0 && (br = null), A0(n.stateNode), Jn(e, mn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (oi) throw oi = !1, e = su, su = null, e;
  return ai & 1 && e.tag !== 0 && Ll(), o = e.pendingLanes, o & 1 ? e === ru ? Mo++ : (Mo = 0, ru = e) : Mo = 0, Lr(), null;
}
function Ll() {
  if (kr !== null) {
    var e = Of(ai), t = gs.transition, n = Ht;
    try {
      if (gs.transition = null, Ht = 16 > e ? 16 : e, kr === null) var r = !1;
      else {
        if (e = kr, kr = null, ai = 0, Pt & 6) throw Error(Le(331));
        var l = Pt;
        for (Pt |= 4, Ve = e.current; Ve !== null; ) {
          var o = Ve, a = o.child;
          if (Ve.flags & 16) {
            var c = o.deletions;
            if (c !== null) {
              for (var u = 0; u < c.length; u++) {
                var h = c[u];
                for (Ve = h; Ve !== null; ) {
                  var y = Ve;
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      So(8, y, o);
                  }
                  var m = y.child;
                  if (m !== null) m.return = y, Ve = m;
                  else for (; Ve !== null; ) {
                    y = Ve;
                    var f = y.sibling, v = y.return;
                    if (Vp(y), y === h) {
                      Ve = null;
                      break;
                    }
                    if (f !== null) {
                      f.return = v, Ve = f;
                      break;
                    }
                    Ve = v;
                  }
                }
              }
              var I = o.alternate;
              if (I !== null) {
                var S = I.child;
                if (S !== null) {
                  I.child = null;
                  do {
                    var O = S.sibling;
                    S.sibling = null, S = O;
                  } while (S !== null);
                }
              }
              Ve = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, Ve = a;
          else e: for (; Ve !== null; ) {
            if (o = Ve, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                So(9, o, o.return);
            }
            var w = o.sibling;
            if (w !== null) {
              w.return = o.return, Ve = w;
              break e;
            }
            Ve = o.return;
          }
        }
        var g = e.current;
        for (Ve = g; Ve !== null; ) {
          a = Ve;
          var k = a.child;
          if (a.subtreeFlags & 2064 && k !== null) k.return = a, Ve = k;
          else e: for (a = g; Ve !== null; ) {
            if (c = Ve, c.flags & 2048) try {
              switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  wi(9, c);
              }
            } catch (C) {
              hn(c, c.return, C);
            }
            if (c === a) {
              Ve = null;
              break e;
            }
            var b = c.sibling;
            if (b !== null) {
              b.return = c.return, Ve = b;
              break e;
            }
            Ve = c.return;
          }
        }
        if (Pt = l, Lr(), Ds && typeof Ds.onPostCommitFiberRoot == "function") try {
          Ds.onPostCommitFiberRoot(pi, e);
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
function Lh(e, t, n) {
  t = Hl(n, t), t = Op(e, t, 1), e = Sr(e, t, 1), t = Fn(), e !== null && (Xo(e, 1, t), Jn(e, t));
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
        e = Hl(n, e), e = Dp(t, e, 1), t = Sr(t, e, 1), e = Fn(), t !== null && (Xo(t, 1, e), Jn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function lx(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Fn(), e.pingedLanes |= e.suspendedLanes & n, Cn === e && (bn & n) === n && (kn === 4 || kn === 3 && (bn & 130023424) === bn && 500 > mn() - td ? Zr(e, 0) : ed |= n), Jn(e, t);
}
function nm(e, t) {
  t === 0 && (e.mode & 1 ? (t = aa, aa <<= 1, !(aa & 130023424) && (aa = 4194304)) : t = 1);
  var n = Fn();
  e = qs(e, t), e !== null && (Xo(e, t, n), Jn(e, n));
}
function ox(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), nm(e, n);
}
function ax(e, t) {
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
      throw Error(Le(314));
  }
  r !== null && r.delete(t), nm(e, n);
}
var sm;
sm = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Gn.current) Xn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Xn = !1, Xg(e, t, n);
    Xn = !!(e.flags & 131072);
  }
  else Xn = !1, rn && t.flags & 1048576 && ap(t, qa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      $a(e, t), e = t.pendingProps;
      var l = Fl(t, Rn.current);
      Rl(t, n), l = Xu(null, t, r, e, l, n);
      var o = Gu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Qn(r) ? (o = !0, Qa(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Hu(t), l.updater = ki, t.stateNode = l, l._reactInternals = t, Vc(t, r, e, n), t = Gc(null, t, r, !0, o, n)) : (t.tag = 0, rn && o && Du(t), _n(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch ($a(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = cx(r), e = ws(r, e), l) {
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
            t = jh(null, t, r, ws(r.type, e), n);
            break e;
        }
        throw Error(Le(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), Xc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), Ch(e, t, r, l, n);
    case 3:
      e: {
        if (Bp(t), e === null) throw Error(Le(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, fp(e, t), ti(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Hl(Error(Le(423)), t), t = Eh(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Hl(Error(Le(424)), t), t = Eh(e, t, r, n, l);
          break e;
        } else for (ss = Er(t.stateNode.containerInfo.firstChild), rs = t, rn = !0, Es = null, n = dp(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Bl(), r === l) {
            t = Zs(e, t, n);
            break e;
          }
          _n(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return pp(t), e === null && Hc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, _c(r, l) ? a = null : o !== null && _c(r, o) && (t.flags |= 32), Fp(e, t), _n(e, t, a, n), t.child;
    case 6:
      return e === null && Hc(t), null;
    case 13:
      return Up(e, t, n);
    case 4:
      return zu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ul(t, null, r, n) : _n(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), wh(e, t, r, l, n);
    case 7:
      return _n(e, t, t.pendingProps, n), t.child;
    case 8:
      return _n(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _n(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, qt(Za, r._currentValue), r._currentValue = a, o !== null) if (Is(o.value, a)) {
          if (o.children === l.children && !Gn.current) {
            t = Zs(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var c = o.dependencies;
          if (c !== null) {
            a = o.child;
            for (var u = c.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = Xs(-1, n & -n), u.tag = 2;
                  var h = o.updateQueue;
                  if (h !== null) {
                    h = h.shared;
                    var y = h.pending;
                    y === null ? u.next = u : (u.next = y.next, y.next = u), h.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), zc(
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
            if (a = o.return, a === null) throw Error(Le(341));
            a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), zc(a, n, t), a = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, Rl(t, n), l = xs(l), r = r(l), t.flags |= 1, _n(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ws(r, t.pendingProps), l = ws(r.type, l), jh(e, t, r, l, n);
    case 15:
      return Pp(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ws(r, l), $a(e, t), t.tag = 1, Qn(r) ? (e = !0, Qa(t)) : e = !1, Rl(t, n), Lp(t, r, l), Vc(t, r, l, n), Gc(null, t, r, !0, e, n);
    case 19:
      return Wp(e, t, n);
    case 22:
      return _p(e, t, n);
  }
  throw Error(Le(156, t.tag));
};
function rm(e, t) {
  return $f(e, t);
}
function ix(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ms(e, t, n, r) {
  return new ix(e, t, n, r);
}
function ld(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function cx(e) {
  if (typeof e == "function") return ld(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Cu) return 11;
    if (e === Eu) return 14;
  }
  return 2;
}
function Ir(e, t) {
  var n = e.alternate;
  return n === null ? (n = ms(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function La(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") ld(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case xl:
      return el(n.children, l, o, t);
    case ju:
      a = 8, l |= 8;
      break;
    case gc:
      return e = ms(12, n, t, l | 2), e.elementType = gc, e.lanes = o, e;
    case xc:
      return e = ms(13, n, t, l), e.elementType = xc, e.lanes = o, e;
    case yc:
      return e = ms(19, n, t, l), e.elementType = yc, e.lanes = o, e;
    case pf:
      return Ci(n, l, o, t);
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
        case pr:
          a = 16, r = null;
          break e;
      }
      throw Error(Le(130, e == null ? e : typeof e, ""));
  }
  return t = ms(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function el(e, t, n, r) {
  return e = ms(7, e, r, t), e.lanes = n, e;
}
function Ci(e, t, n, r) {
  return e = ms(22, e, r, t), e.elementType = pf, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function oc(e, t, n) {
  return e = ms(6, e, null, t), e.lanes = n, e;
}
function ac(e, t, n) {
  return t = ms(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function ux(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ui(0), this.expirationTimes = Ui(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ui(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function od(e, t, n, r, l, o, a, c, u) {
  return e = new ux(e, t, n, c, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ms(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Hu(o), e;
}
function dx(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: gl, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function lm(e) {
  if (!e) return $r;
  e = e._reactInternals;
  e: {
    if (al(e) !== e || e.tag !== 1) throw Error(Le(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Qn(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(Le(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Qn(n)) return lp(e, n, t);
  }
  return t;
}
function om(e, t, n, r, l, o, a, c, u) {
  return e = od(n, r, !0, e, l, o, a, c, u), e.context = lm(null), n = e.current, r = Fn(), l = Mr(n), o = Xs(r, l), o.callback = t ?? null, Sr(n, o, l), e.current.lanes = l, Xo(e, l, r), Jn(e, r), e;
}
function Ei(e, t, n, r) {
  var l = t.current, o = Fn(), a = Mr(l);
  return n = lm(n), t.context === null ? t.context = n : t.pendingContext = n, t = Xs(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Sr(l, t, a), e !== null && (Ms(e, l, a, o), Ma(e, l, a)), a;
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
function hx() {
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
  if (t === null) throw Error(Le(409));
  Ei(e, t, null, null);
};
Si.prototype.unmount = id.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    ll(function() {
      Ei(null, e, null, null);
    }), t[Js] = null;
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
    xr.splice(n, 0, e), n === 0 && Bf(e);
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
function fx(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var h = ci(a);
        o.call(h);
      };
    }
    var a = om(t, r, e, 0, null, !1, !1, "", Dh);
    return e._reactRootContainer = a, e[Js] = a.current, Po(e.nodeType === 8 ? e.parentNode : e), ll(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var c = r;
    r = function() {
      var h = ci(u);
      c.call(h);
    };
  }
  var u = od(e, 0, !1, null, null, !1, !1, "", Dh);
  return e._reactRootContainer = u, e[Js] = u.current, Po(e.nodeType === 8 ? e.parentNode : e), ll(function() {
    Ei(t, u, n, r);
  }), u;
}
function Mi(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var c = l;
      l = function() {
        var u = ci(a);
        c.call(u);
      };
    }
    Ei(t, a, e, l);
  } else a = fx(n, t, e, l, r);
  return ci(a);
}
Df = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = xo(t.pendingLanes);
        n !== 0 && (Mu(t, n | 1), Jn(t, mn()), !(Pt & 6) && (zl = mn() + 500, Lr()));
      }
      break;
    case 13:
      ll(function() {
        var r = qs(e, 1);
        if (r !== null) {
          var l = Fn();
          Ms(r, e, 1, l);
        }
      }), ad(e, 1);
  }
};
Iu = function(e) {
  if (e.tag === 13) {
    var t = qs(e, 134217728);
    if (t !== null) {
      var n = Fn();
      Ms(t, e, 134217728, n);
    }
    ad(e, 134217728);
  }
};
Pf = function(e) {
  if (e.tag === 13) {
    var t = Mr(e), n = qs(e, t);
    if (n !== null) {
      var r = Fn();
      Ms(n, e, t, r);
    }
    ad(e, t);
  }
};
_f = function() {
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
Mc = function(e, t, n) {
  switch (t) {
    case "input":
      if (kc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = yi(r);
            if (!l) throw Error(Le(90));
            gf(r), kc(r, l);
          }
        }
      }
      break;
    case "textarea":
      yf(e, n);
      break;
    case "select":
      t = n.value, t != null && Il(e, !!n.multiple, t, !1);
  }
};
Ef = nd;
Sf = ll;
var px = { usingClientEntryPoint: !1, Events: [Qo, kl, yi, jf, Cf, nd] }, co = { findFiberByHostInstance: Xr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, mx = { bundleType: co.bundleType, version: co.version, rendererPackageName: co.rendererPackageName, rendererConfig: co.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: er.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = If(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: co.findFiberByHostInstance || hx, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ya = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ya.isDisabled && ya.supportsFiber) try {
    pi = ya.inject(mx), Ds = ya;
  } catch {
  }
}
os.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = px;
os.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!cd(t)) throw Error(Le(200));
  return dx(e, t, null, n);
};
os.createRoot = function(e, t) {
  if (!cd(e)) throw Error(Le(299));
  var n = !1, r = "", l = am;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = od(e, 1, !1, null, null, n, !1, r, l), e[Js] = t.current, Po(e.nodeType === 8 ? e.parentNode : e), new id(t);
};
os.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(Le(188)) : (e = Object.keys(e).join(","), Error(Le(268, e)));
  return e = If(t), e = e === null ? null : e.stateNode, e;
};
os.flushSync = function(e) {
  return ll(e);
};
os.hydrate = function(e, t, n) {
  if (!bi(t)) throw Error(Le(200));
  return Mi(null, e, t, !0, n);
};
os.hydrateRoot = function(e, t, n) {
  if (!cd(e)) throw Error(Le(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = am;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = om(t, null, e, 1, n ?? null, l, !1, o, a), e[Js] = t.current, Po(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Si(t);
};
os.render = function(e, t, n) {
  if (!bi(t)) throw Error(Le(200));
  return Mi(null, e, t, !1, n);
};
os.unmountComponentAtNode = function(e) {
  if (!bi(e)) throw Error(Le(40));
  return e._reactRootContainer ? (ll(function() {
    Mi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Js] = null;
    });
  }), !0) : !1;
};
os.unstable_batchedUpdates = nd;
os.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!bi(n)) throw Error(Le(200));
  if (e == null || e._reactInternals === void 0) throw Error(Le(38));
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
var _s = af.exports, Ph = _s;
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
var gx = i, xx = Symbol.for("react.element"), yx = Symbol.for("react.fragment"), vx = Object.prototype.hasOwnProperty, Nx = gx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, kx = { key: !0, ref: !0, __self: !0, __source: !0 };
function um(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) vx.call(t, r) && !kx.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: xx, type: e, key: o, ref: a, props: l, _owner: Nx.current };
}
Ii.Fragment = yx;
Ii.jsx = um;
Ii.jsxs = um;
cm.exports = Ii;
var s = cm.exports;
let vr = [], dm = 120, ic = !1;
async function wx() {
  if (!ic) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          jx(n), ic = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    ic = !0;
  }
}
function jx(e) {
  Array.isArray(e) && (vr = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Gs(e) {
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
  const [n, r, l] = e.split("-").map(Number), [o, a, c] = t.split(":").map(Number);
  for (const u of vr)
    if (u.offsetBeforeMin > u.offsetAfterMin) {
      const h = (u.offsetBeforeMin - u.offsetAfterMin) / 60, y = new Date(u.switchEpochMs + u.offsetAfterMin * 6e4);
      if (y.getUTCFullYear() === n && y.getUTCMonth() + 1 === r && y.getUTCDate() === l) {
        const m = y.getUTCHours();
        if (o >= m && o < m + h)
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
function Cx(e) {
  const { offsetMin: t, label: n } = Gs(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function Ex(e) {
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
  return t === "UTC" ? Ex(e) : Cx(e);
}
function _h(e, t = "LOCAL") {
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
  const m = ui(e, t);
  if (m.isAmbiguous)
    return r === 2 ? m.secondOccurrenceEpoch : m.firstOccurrenceEpoch;
  const f = y - dm * 6e4, { offsetMin: v } = Gs(f);
  let I = y - v * 6e4;
  const S = Gs(I);
  return S.offsetMin !== v && (I = y - S.offsetMin * 6e4), I;
}
function Sx({
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
  isInitialSetup: m = !1,
  selectedCount: f = 0,
  totalCount: v = 0,
  onResetStudio: I
}) {
  const [S, O] = i.useState(!1);
  i.useEffect(() => {
    if (!S) return;
    const C = (E) => {
      E.key === "Escape" && O(!1);
    };
    return window.addEventListener("keydown", C), () => window.removeEventListener("keydown", C);
  }, [S]);
  const w = i.useMemo(() => {
    const C = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), E = (e == null ? void 0 : e.durationMs) || 0;
    if (!C || E <= 0) return "-- ➔ --";
    const N = C + E, p = (ae) => String(ae).padStart(2, "0"), $ = Jr(C, n), j = Jr(N, n), _ = `${$.year}-${p($.month)}-${p($.day)}`, J = `${p($.hour)}:${p($.minute)}:${p($.second)}`, M = `${j.year}-${p(j.month)}-${p(j.day)}`, R = `${p(j.hour)}:${p(j.minute)}:${p(j.second)}`, re = n === "UTC" ? " (UTC)" : $.label ? ` (${$.label})` : "", le = _ === M ? R : `${M} ${R}`;
    return `${_} ${J} ➔ ${le}${re}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), g = i.useMemo(() => {
    const C = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (C >= 1440) {
      const E = (C / 1440).toFixed(1);
      return `(${E.endsWith(".0") ? parseInt(E, 10) : E}d / ${C}m Total)`;
    }
    return `(${C}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), k = () => {
    O(!1), I == null || I();
  }, b = S ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => O(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (C) => C.stopPropagation(), dir: "ltr", children: [
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
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: k, children: [
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
    typeof document < "u" && b && _s.createPortal(b, document.body)
  ] });
}
const dl = (e) => String(e).padStart(2, "0");
function St(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const f = new Date(e), v = dl(f.getUTCHours()), I = dl(f.getUTCMinutes()), S = dl(f.getUTCSeconds()), O = l ? `${v}:${I}:${S}` : `${v}:${I}`;
    return r ? `${O} UTC` : O;
  }
  const { offsetMin: o, label: a } = Gs(e), c = new Date(e + o * 60 * 1e3), u = dl(c.getUTCHours()), h = dl(c.getUTCMinutes()), y = dl(c.getUTCSeconds()), m = l ? `${u}:${h}:${y}` : `${u}:${h}`;
  return r ? `${m} ${a}` : m;
}
const bx = 600, Fh = 250, hs = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map(), au = /* @__PURE__ */ new Set(), Bh = 4;
let Ol = 0, Ss = [];
function iu(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Fh) * Fh;
}
function fm() {
  var e;
  if (!(Ol >= Bh || Ss.length === 0))
    for (Ss = Ss.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); Ol < Bh && Ss.length > 0; ) {
      const t = Ss.pop();
      !t || (e = t.signal) != null && e.aborted || (Ol++, Mx(t));
    }
}
function Oa(e, t, n, r = "mon-0") {
  const l = iu(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (hs.size >= bx) {
    const c = hs.keys().next().value, u = hs.get(c);
    u && u.startsWith("blob:") && URL.revokeObjectURL(u), hs.delete(c);
  }
  hs.set(a, n), au.forEach((c) => c(e, l, n, o));
}
async function Mx(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const c = l ? `&displayId=${encodeURIComponent(l)}` : "", u = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${c}`, { signal: o });
    if (u.status === 200) {
      const h = await u.blob(), y = URL.createObjectURL(h);
      Oa(n, r, y, l), a(y);
    } else u.status === 204 ? (Oa(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (c) {
    c.name !== "AbortError" ? (Oa(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } finally {
    Ol = Math.max(0, Ol - 1), Yr.delete(t), fm();
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
    const r = iu(t), o = `${e}_${n || "mon-0"}_${r}`;
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
  set: Oa,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    hs.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), hs.clear(), Yr.clear(), Ss = [], Ol = 0;
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
    const l = iu(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
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
      }, { once: !0 }), Ss.push(h), fm();
    });
    return Yr.set(a, c), c;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Pn.clearAll();
});
const ud = "ITB_STUDIO_SESSION_CACHE_V2", pm = "itb_player_audio_settings";
let cc = null;
function Ix() {
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
function Tx() {
  try {
    localStorage.removeItem(ud);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function Dl() {
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
function $x(e) {
  try {
    localStorage.setItem(pm, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let gr = null, Ml = null, uc = null, zn = 0, hl = 0, va = -60, Vo = 1;
function Ax() {
  if (!gr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (gr = new e());
  }
  return gr && gr.state === "suspended" && gr.resume().catch(() => {
  }), gr;
}
function di(e, t = 1) {
  if (!e) return null;
  Vo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Ax();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(Vo, n.currentTime), Ml = e, Rx(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function Uh(e) {
  if (Vo = Math.max(0, Number(e) || 1), Ml != null && Ml.__audioGainNode && gr)
    try {
      Ml.__audioGainNode.gain.setValueAtTime(Vo, gr.currentTime);
    } catch {
    }
}
function Rx() {
  if (uc) return;
  const e = new Uint8Array(256), t = () => {
    const n = Ml, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      zn *= 0.85, hl *= 0.85, zn < 1e-3 && (zn = 0), hl < 1e-3 && (hl = 0), va = zn > 1e-3 ? 20 * Math.log10(zn) : -60;
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
        zn = a > zn ? zn * 0.3 + a * 0.7 : zn * 0.85 + a * 0.15, hl = Math.max(zn, o), va = zn > 1e-4 ? 20 * Math.log10(zn) : -60;
      } catch {
        zn = 0, hl = 0, va = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: zn,
        peak: hl,
        db: va,
        gain: Vo,
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
function Lx({
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
          const h = (c.displayId ?? c.DisplayId ?? `mon-${u}`).toLowerCase(), y = !a && o === h, m = c.width ?? c.Width ?? 1920, f = c.height ?? c.Height ?? 1080, v = c.displayName ?? c.DisplayName ?? `Monitor ${u + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${y ? "is-active" : ""}`,
              onClick: (I) => {
                I.stopPropagation(), n == null || n(h);
              },
              title: `Switch window to Monitor ${u + 1}: ${v} (${m}×${f})`,
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
function xm({
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
    let I = 1 / 0, S = 1 / 0, O = -1 / 0, w = -1 / 0;
    e.forEach((b) => {
      const C = b.x ?? b.X ?? 0, E = b.y ?? b.Y ?? 0, N = b.width ?? b.Width ?? 1920, p = b.height ?? b.Height ?? 1080;
      I = Math.min(I, C), S = Math.min(S, E), O = Math.max(O, C + N), w = Math.max(w, E + p);
    });
    const g = Math.max(1, O - I), k = Math.max(1, w - S);
    return { minX: I, minY: S, totalW: g, totalH: k };
  }, [e]);
  if (!e || e.length <= 1 || !c)
    return null;
  const u = e.find((I) => (I.displayId ?? I.DisplayId) === t) || e[0], h = e.indexOf(u), y = h >= 0 ? h + 1 : 1, f = (u ? u.displayName ?? u.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), v = f && !f.toLowerCase().includes("screen") ? `SCREEN ${y} (${f.toUpperCase()})` : f ? f.toUpperCase() : `SCREEN ${y}`;
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${a ? "is-auto-mode is-read-only" : "is-manual-mode is-interactive"} ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (I) => I.stopPropagation(),
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
            children: e.map((I, S) => {
              const O = I.displayId ?? I.DisplayId ?? `mon-${S}`, w = (I.x ?? I.X ?? 0) - c.minX, g = (I.y ?? I.Y ?? 0) - c.minY, k = I.width ?? I.Width ?? 1920, b = I.height ?? I.Height ?? 1080, C = O === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${C ? "is-active" : "is-inactive"} ${a ? "is-read-only" : "is-interactive"}`,
                  onClick: (E) => {
                    E.stopPropagation(), !a && (n == null || n(O));
                  },
                  children: [
                    /* @__PURE__ */ s.jsx("title", { children: a ? `Screen ${S + 1} (${C ? "Active by Auto-Director" : "Inactive"}) • Auto-Director Reflection (Read-Only)` : `Click to switch to Screen ${S + 1}` }),
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: w + 10,
                        y: g + 10,
                        width: Math.max(10, k - 20),
                        height: Math.max(10, b - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: w + k / 2,
                        y: g + b / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: S + 1
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
function Ox({
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
  globalGaps: m = [],
  recordingSegments: f = {},
  playbackSpeed: v = 1,
  activeAudioStationId: I = null,
  directorPlan: S = null,
  isAutoDirectorEnabled: O = !0,
  targetDisplayId: w = "auto",
  onSelectDisplayId: g = null,
  areAllDisplaysPlaced: k = !1,
  hideDisplayStrip: b = !1,
  isDecoderAllowed: C = !0,
  maxHeight: E = null
}) {
  var X;
  const N = e.hostname || e.name || e.id || "", p = Math.round(t), [$, j] = i.useState(() => !N || !p ? null : Pn.get(N, p) || null), [_, J] = i.useState(""), [M, R] = i.useState(!1), [re, le] = i.useState(!1), [ae, F] = i.useState(!1), [Y, T] = i.useState(!1), B = i.useRef(l), U = i.useRef(null), ve = i.useRef(null), G = i.useRef(0), V = i.useRef(t - a), z = i.useRef(t - a), ge = i.useRef(!1), ye = i.useRef(null), Ne = i.useRef(!1);
  V.current = t - a;
  const Pe = (e == null ? void 0 : e.displays) || ((X = e == null ? void 0 : e.topology) == null ? void 0 : X.displays) || [], [Se, Ie] = i.useState(null);
  i.useEffect(() => {
    Ie(null);
  }, [w]);
  const Ze = i.useMemo(() => {
    const H = S || (e == null ? void 0 : e.directorPlan);
    return !H || !H.segments || H.segments.length === 0 ? null : H.segments.find((ne) => {
      const se = ne.startEpochMs ?? ne.StartEpochMs ?? 0, de = ne.endEpochMs ?? ne.EndEpochMs ?? 0;
      return t >= se && t <= de;
    }) || H.segments[0];
  }, [S, e == null ? void 0 : e.directorPlan, t]), Ye = i.useMemo(() => {
    var H;
    return Pe.length > 1 && O !== !1 && Ze ? (Ze.targetDisplayId || Ze.TargetDisplayId || "mon-0").toLowerCase() : Se ? Se.toLowerCase() : w && w !== "auto" && w !== "director" ? w.toLowerCase() : (((H = Pe[0]) == null ? void 0 : H.displayId) || "mon-0").toLowerCase();
  }, [Se, w, Pe, O, Ze]), Wt = i.useRef(Ye), [It, wt] = i.useState(!1);
  i.useEffect(() => {
    if (Wt.current && Wt.current !== Ye) {
      wt(!0);
      const H = setTimeout(() => wt(!1), 2e3);
      return Wt.current = Ye, () => clearTimeout(H);
    }
    Wt.current = Ye;
  }, [Ye]);
  const Q = f[e == null ? void 0 : e.id] || f[N] || (e == null ? void 0 : e.segments) || [], D = Q.length === 0 || Q.some((H) => {
    const ne = H.startEpochMs ?? H.startEpoch ?? 0, se = H.endEpochMs ?? H.endEpoch ?? 0;
    return t >= ne && t <= se;
  }), Z = !!(r ? !Dl().isMuted : I && (e.id === I || N === I)), P = i.useCallback(() => {
    if (!U.current) return;
    const H = Dl();
    if (r)
      U.current.volume = H.volume, U.current.muted = H.isMuted, H.isMuted || di(U.current);
    else {
      const ne = !!(I && (e.id === I || N === I));
      U.current.muted = !ne, ne && (U.current.volume = H.volume, di(U.current));
    }
  }, [r, I, e.id, N]);
  i.useEffect(() => {
    P();
  }, [P]), i.useEffect(() => {
    const H = (ne) => {
      U.current && ne.detail && P();
    };
    return window.addEventListener("itb-audio-state-changed", H), () => window.removeEventListener("itb-audio-state-changed", H);
  }, [P]), i.useEffect(() => {
    U.current && (U.current.defaultPlaybackRate = v, U.current.playbackRate = v);
  }, [v]), i.useEffect(() => {
    if (n || !p || !N) return;
    if (l && C) {
      B.current = !0;
      return;
    }
    const H = B.current;
    B.current = l;
    let ne = !0;
    const se = new AbortController(), de = Pn.get(N, p, Ye);
    if (de) {
      j(de), F(!1), T(!1);
      return;
    }
    T(!0);
    const ke = setTimeout(() => {
      ne && Pn.fetchFrame(N, p, se.signal, Ye).then((ft) => {
        ne && (T(!1), ft && ft !== "NO_SIGNAL" ? (j(ft), F(!1)) : ft === "NO_SIGNAL" && F(!0));
      });
    }, l ? 180 : H ? 25 : 40), Xe = Pn.subscribe((ft, qe, gt, ct) => {
      ft === N && qe === p && (!ct || ct === Ye) && ne && (T(!1), gt && gt !== "NO_SIGNAL" ? (j(gt), F(!1)) : gt === "NO_SIGNAL" && F(!0));
    });
    return () => {
      ne = !1, clearTimeout(ke), se.abort(), Xe();
    };
  }, [N, p, n, l, r, M, Ye, C]), i.useEffect(() => {
    if (!N || !(r || l && C)) {
      (!l || !C) && (ye.current && clearTimeout(ye.current), ve.current && clearTimeout(ve.current), ge.current = !1, J(""), R(!1), le(!1), U.current && (U.current.pause(), U.current.removeAttribute("src"), U.current.load()));
      return;
    }
    let ne = null;
    return l && !y && D ? ne = setTimeout(() => {
      const se = V.current;
      G.current = se, z.current = se, ge.current = !1;
      const de = E && E < 1080 ? `&maxHeight=${E}` : "", De = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + se}&displayId=${encodeURIComponent(Ye)}${de}&_t=${Date.now()}`;
      R(!1), J(De);
    }, 80) : l || (ye.current && clearTimeout(ye.current), ge.current = !1, J(""), R(!1), U.current && (U.current.pause(), U.current.removeAttribute("src"), U.current.load())), () => {
      ne && clearTimeout(ne);
    };
  }, [l, r, N, a, c, y, D, Ye, C, E]), i.useEffect(() => {
    if (!N || !(r || l)) return;
    const ne = V.current, se = Math.abs(ne - z.current);
    if (!l || se < 800) {
      z.current = ne;
      return;
    }
    return ge.current = !0, z.current = ne, G.current = ne, U.current && U.current.pause(), R(!1), ye.current && clearTimeout(ye.current), ye.current = setTimeout(() => {
      if (!D || y) {
        J(""), R(!1), ge.current = !1;
        return;
      }
      const de = V.current, De = E && E < 1080 ? `&maxHeight=${E}` : "", ke = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + de}&displayId=${encodeURIComponent(Ye)}${De}&_t=${Date.now()}`;
      J(ke);
    }, 75), () => {
      ye.current && clearTimeout(ye.current);
    };
  }, [t, l, r, N, a, c, y, D, Ye, C, E]), i.useEffect(() => {
    if (r || !l || !U.current || !M || ge.current) return;
    const H = (V.current - G.current) / 1e3;
    if (H >= 0) {
      const ne = U.current, de = ne.currentTime - H, De = v || 1;
      if (Math.abs(de) > 3)
        try {
          ne.currentTime = H;
        } catch {
        }
      else de < -0.15 ? ne.playbackRate = De * 1.04 : de > 0.15 ? ne.playbackRate = De * 0.96 : ne.playbackRate !== De && (ne.playbackRate = De);
    }
  }, [r, l, t, M, v]), i.useEffect(() => {
    if (!r || !l || !_ || !M || y) return;
    let H = null, ne = U.current ? U.current.currentTime : 0, se = performance.now(), de = G.current + Math.round(ne * 1e3);
    const De = () => {
      const ke = U.current;
      if (ke && !ke.paused && !ke.ended && !Ne.current && !ge.current) {
        const Xe = performance.now(), ft = ke.currentTime;
        Math.abs(ft - ne) > 5e-4 && (ne = ft, se = Xe);
        const qe = Math.max(0, (Xe - se) / 1e3), gt = ke.playbackRate || v || 1, ct = ne + qe * gt;
        let et = G.current + Math.round(ct * 1e3);
        const at = et - de;
        if (at < 0 && at > -300 && (et = de), et >= u) {
          o == null || o(!1), h == null || h(u);
          return;
        }
        const Ot = a + et, Zt = m == null ? void 0 : m.find((xt) => Ot >= xt.startEpochMs && Ot < xt.endEpochMs);
        if (Zt) {
          Ne.current = !0;
          const xt = Zt.endEpochMs - a;
          h(xt), G.current = xt, de = xt, z.current = xt;
          const nt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + xt}&_t=${Date.now()}`;
          R(!1), J(nt), setTimeout(() => {
            Ne.current = !1;
          }, 300);
          return;
        }
        et !== de && (de = et, z.current = et, h == null || h(et));
      }
      H = requestAnimationFrame(De);
    };
    return H = requestAnimationFrame(De), () => {
      H && cancelAnimationFrame(H);
    };
  }, [
    r,
    l,
    _,
    M,
    y,
    v,
    u,
    a,
    c,
    N,
    m,
    h,
    o
  ]);
  const W = () => {
    if (Ne.current) return;
    const H = a + V.current, ne = Q.map((se) => ({ start: se.startEpochMs ?? se.startEpoch ?? 0, end: se.endEpochMs ?? se.endEpoch ?? 0 })).filter((se) => se.start > H + 200).sort((se, de) => se.start - de.start)[0];
    if (ne && ne.start - a < u) {
      Ne.current = !0;
      const se = ne.start - a;
      h(se), G.current = se;
      const de = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(N)}&startEpoch=${a}&endEpoch=${a + c}&seekEpoch=${a + se}&_t=${Date.now()}`;
      R(!1), J(de), setTimeout(() => {
        Ne.current = !1;
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
        ref: U,
        src: _,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: M ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: M ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !Z,
        onLoadedData: () => {
          U.current && (U.current.defaultPlaybackRate = v, U.current.playbackRate = v);
        },
        onCanPlay: () => {
          ve.current && (clearTimeout(ve.current), ve.current = null), le(!1), P(), U.current && (U.current.defaultPlaybackRate = v, U.current.playbackRate = v), l && U.current && U.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ve.current && (clearTimeout(ve.current), ve.current = null), le(!1), ge.current = !1, R(!0), P(), U.current && (U.current.defaultPlaybackRate = v, U.current.playbackRate = v);
        },
        onWaiting: () => {
          ve.current && clearTimeout(ve.current), ve.current = setTimeout(() => {
            le(!0);
          }, 450);
        },
        onTimeUpdate: () => {
          var H;
          ve.current && (clearTimeout(ve.current), ve.current = null), le(!1), !M && ((H = U.current) == null ? void 0 : H.currentTime) > 0 && (ge.current = !1, R(!0));
        },
        onEnded: W
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && M && !y ? 0 : 2,
          pointerEvents: "none"
        },
        children: $ && !ae ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: $,
            alt: N,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => F(!0)
          }
        ) : (!$ || ae || !D) && !_ ? /* @__PURE__ */ s.jsx(gm, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && D && (!M || re) && !y && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    Pe.length > 1 && /* @__PURE__ */ s.jsx(
      xm,
      {
        displays: Pe,
        activeDisplayId: Ye,
        onSelectDisplay: (H) => {
          O || (Ie(H), g == null || g(H));
        },
        isTransitioning: It,
        mode: O ? "AUTO" : "MANUAL"
      }
    ),
    !b && /* @__PURE__ */ s.jsx(
      Lx,
      {
        displays: Pe,
        activeDisplayId: Ye,
        onSelectDisplay: (H) => {
          Ie(H), g == null || g(H);
        },
        areAllDisplaysPlaced: k,
        isAutoDirectorEnabled: O
      }
    )
  ] });
}
function Dx({
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
  setPlayheadMs: m,
  isSpotlightActive: f,
  globalGaps: v = [],
  onOpenSpotlight: I,
  onSelectActiveStation: S,
  recordingSegments: O = {},
  playbackSpeed: w = 1,
  activeAudioStationId: g = null,
  onSoloAudio: k,
  directorPlan: b = null,
  isAutoDirectorEnabled: C = !0,
  targetDisplayId: E = "auto",
  onSelectDisplayId: N = null,
  areAllDisplaysPlaced: p = !1,
  _slotIndex: $ = 0,
  borderColor: j = null,
  onSwapWithNext: _ = null,
  isDecoderAllowed: J = !0,
  maxHeight: M = null
}) {
  var T;
  const R = !!(g && (e.id === g || e.hostname && e.hostname === g)), re = (e.hostname || e.name || "").includes("Offline"), le = re ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((T = e == null ? void 0 : e.topology) == null ? void 0 : T.displays) || []).length > 1;
  const F = () => {
    if (t) {
      const B = E && E !== "auto" && E !== "director" ? E : null;
      I && I(e.id, B);
    } else
      S && S(e.id);
  }, Y = (B) => {
    B.preventDefault(), B.stopPropagation(), t && S && (c && c(!1), S(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: F,
      onContextMenu: Y,
      className: `camera-card ${le} ${t ? "is-solo-card" : ""}`,
      style: j ? { borderColor: j } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${le}` }),
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
            k && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${R ? "audio-active" : ""}`,
                onClick: (B) => {
                  B.stopPropagation(), k(R ? null : e.id);
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
            I && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (B) => {
                  B.stopPropagation();
                  const U = E && E !== "auto" && E !== "director" ? E : null;
                  I(e.id, U);
                },
                title: "Cinema Fullscreen Inspection",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) })
              }
            ),
            S && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (B) => {
                  B.stopPropagation(), t && c && c(!1), S(t ? null : e.id);
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
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${re ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Ox,
            {
              station: e,
              currentEpochMs: l,
              isOffline: re,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: c,
              baseEpochMs: u,
              totalDurationMs: h,
              outPointMs: y,
              setPlayheadMs: m,
              isSpotlightActive: f,
              globalGaps: v,
              recordingSegments: O,
              playbackSpeed: w,
              activeAudioStationId: g,
              directorPlan: b,
              isAutoDirectorEnabled: C,
              targetDisplayId: E,
              onSelectDisplayId: N,
              areAllDisplaysPlaced: p,
              hideDisplayStrip: !0,
              isDecoderAllowed: J,
              maxHeight: M
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
        !re && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
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
const vo = ["top-right", "bottom-right", "bottom-left", "top-left"];
function ym(e) {
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
function cu(e) {
  const t = ym(e);
  return t.isCustom ? `CUSTOM (${Math.round(t.xPct)}% X, ${Math.round(t.yPct)}% Y)` : (t.preset || "top-right").toUpperCase();
}
function Px({
  currentEpochMs: e,
  position: t = null,
  onPositionChange: n = null
}) {
  var J;
  const r = i.useRef(null), l = i.useRef(null), [o, a] = i.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), c = t || o, u = ym(c), [h, y] = i.useState(!1), [m, f] = i.useState(null);
  i.useEffect(() => {
    h || (u.isCustom ? f({ xPct: u.xPct, yPct: u.yPct }) : f(null));
  }, [c, h, u.isCustom, u.xPct, u.yPct]);
  const v = i.useCallback((M) => {
    M && (M.preventDefault(), M.stopPropagation());
    let R;
    if (u.isCustom || !vo.includes(u.preset))
      R = "top-right";
    else {
      const le = (vo.indexOf(u.preset) + 1) % vo.length;
      R = vo[le];
    }
    a(R), f(null);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", R);
    } catch {
    }
    n && n(R);
  }, [u.isCustom, u.preset, n]), I = i.useCallback((M) => {
    if (M.button !== void 0 && M.button !== 0 || M.target.closest(".btn-cycle-corner")) return;
    const R = r.current;
    if (!R) return;
    const re = R.parentElement;
    if (!re) return;
    const le = R.getBoundingClientRect(), ae = re.getBoundingClientRect();
    l.current = {
      startX: M.clientX,
      startY: M.clientY,
      clockWidth: le.width,
      clockHeight: le.height,
      parentRect: ae,
      offsetX: M.clientX - le.left,
      offsetY: M.clientY - le.top,
      hasMoved: !1
    };
    const F = (T) => {
      if (!l.current) return;
      const B = l.current, U = Math.hypot(T.clientX - B.startX, T.clientY - B.startY);
      if (!B.hasMoved && U > 4 && (B.hasMoved = !0, y(!0)), !B.hasMoved) return;
      const ve = B.parentRect.width, G = B.parentRect.height, V = Math.max(1, ve - B.clockWidth - 28), z = Math.max(1, G - B.clockHeight - 28), ge = T.clientX - B.parentRect.left - B.offsetX - 14, ye = T.clientY - B.parentRect.top - B.offsetY - 14, Ne = Math.max(0, Math.min(V, ge)), Pe = Math.max(0, Math.min(z, ye)), Se = Math.round(Ne / V * 1e3) / 10, Ie = Math.round(Pe / z * 1e3) / 10;
      f({ xPct: Se, yPct: Ie });
    }, Y = (T) => {
      window.removeEventListener("pointermove", F), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", Y);
      const B = l.current;
      if (l.current = null, y(!1), !B) return;
      if (!B.hasMoved) {
        v();
        return;
      }
      const U = Math.max(1, B.parentRect.width - B.clockWidth - 28), ve = Math.max(1, B.parentRect.height - B.clockHeight - 28), G = T.clientX - B.parentRect.left - B.offsetX - 14, V = T.clientY - B.parentRect.top - B.offsetY - 14, z = Math.max(0, Math.min(U, G)), ge = Math.max(0, Math.min(ve, V)), ye = z / U * 100, Ne = ge / ve * 100;
      let Pe;
      ye > 94 && Ne < 6 ? Pe = "top-right" : ye < 6 && Ne < 6 ? Pe = "top-left" : ye > 94 && Ne > 94 ? Pe = "bottom-right" : ye < 6 && Ne > 94 ? Pe = "bottom-left" : Pe = `custom:${ye.toFixed(1)},${Ne.toFixed(1)}`, a(Pe);
      try {
        localStorage.setItem("itb_canvas_utc_clock_pos", Pe);
      } catch {
      }
      n && n(Pe);
    };
    window.addEventListener("pointermove", F), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", Y);
  }, [v, n]), S = new Date(e || Date.now()), O = S.getUTCFullYear(), w = String(S.getUTCMonth() + 1).padStart(2, "0"), g = String(S.getUTCDate()).padStart(2, "0"), k = String(S.getUTCHours()).padStart(2, "0"), b = String(S.getUTCMinutes()).padStart(2, "0"), C = String(S.getUTCSeconds()).padStart(2, "0"), E = `${O}-${w}-${g}`, N = `${k}:${b}:${C} UTC`, p = m !== null || u.isCustom, $ = m || (u.isCustom ? { xPct: u.xPct, yPct: u.yPct } : null);
  let j;
  if ($) {
    const M = $.xPct / 100, R = $.yPct / 100;
    j = {
      left: `calc(14px + (100% - 28px) * ${M})`,
      top: `calc(14px + (100% - 28px) * ${R})`,
      transform: `translate(-${$.xPct}%, -${$.yPct}%)`,
      right: "auto",
      bottom: "auto"
    };
  }
  const _ = !p && u.preset ? `corner-${u.preset}` : "";
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      ref: r,
      className: `canvas-utc-wall-clock ${_} ${h ? "is-dragging" : ""} ${p ? "is-custom" : ""}`,
      style: j,
      onPointerDown: I,
      title: "Persistent Canvas UTC Wall Clock • Drag to place anywhere on canvas • Click or use [⤢] to cycle corners",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: E }),
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
            title: p ? `Custom Position (${Math.round(($ == null ? void 0 : $.xPct) || 0)}%, ${Math.round(($ == null ? void 0 : $.yPct) || 0)}%) • Click to snap to TOP-RIGHT` : `Current corner: ${((J = u.preset) == null ? void 0 : J.toUpperCase()) || "TOP-RIGHT"} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function _x() {
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
const Da = 2500, Fx = {
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
function Bx(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Fx[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function vm(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Bx), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Ux(e, t = " + ") {
  return vm(e).join(t);
}
function uo(e) {
  return Ux(e, "+");
}
const dc = 2200, hc = 400;
function Nm({
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
      const I = a.segments.find((S) => e >= S.startEpochMs && e < S.endEpochMs);
      f = ((I == null ? void 0 : I.activeDisplayId) || "mon-0").toLowerCase();
    }
    const v = r ? String(r).toLowerCase() : null;
    for (let I = t.length - 1; I >= 0; I--) {
      const S = t[I];
      if (!S) continue;
      if (v) {
        const g = (S.stationId || S.stationHostname || S.stationName || S.hostname || "").toLowerCase();
        if (g && g !== v)
          continue;
      }
      if (f && f !== "canvas" && f !== "all-displays") {
        let g = (S.displayId || S.DisplayId || "").toLowerCase();
        if (!g && o && o.length > 0) {
          const k = S.x ?? S.X, b = S.y ?? S.Y;
          if (typeof k == "number" && typeof b == "number") {
            const C = o.find((E) => {
              const N = E.X ?? E.x ?? 0, p = E.Y ?? E.y ?? 0, $ = E.Width ?? E.width ?? 1920, j = E.Height ?? E.height ?? 1080;
              return k >= N && k < N + $ && b >= p && b < p + j;
            });
            C && (g = (C.DisplayId || C.displayId || "mon-0").toLowerCase());
          }
        }
        if (g || (g = "mon-0"), f !== g)
          continue;
      }
      const O = S.epochMs + Da, w = e - O;
      if (w >= 0 && w <= dc)
        return {
          ...S,
          elapsed: w
        };
    }
    return null;
  }, [u, e, t, r, l, o, a]);
  if (!u || !h) return null;
  let y = 1;
  if (h.elapsed > dc - hc) {
    const f = (h.elapsed - (dc - hc)) / hc;
    y = Math.max(0, 1 - f);
  }
  if (y <= 0.05) return null;
  const m = vm(h.keyCombination);
  return m.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: y }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: m.map((f, v) => /* @__PURE__ */ s.jsxs(fi.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: f.toUpperCase() }) }),
    v < m.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, v)) }) }) : null;
}
function on(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Wx(e) {
  const t = on(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Hx(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function zx({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var S, O, w, g, k, b;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let C = 0; C < e.length; C++)
    if (e[C].timestampEpochMs <= t)
      l = e[C], o = e[C + 1] || e[C];
    else {
      o === l && e[C] && (o = e[C]);
      break;
    }
  if (l === o)
    return ((S = l.layout) == null ? void 0 : S.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), c = o.transitionType || "smooth", u = o.timestampEpochMs - a;
  if (t < u)
    return ((O = l.layout) == null ? void 0 : O.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((w = o.layout) == null ? void 0 : w.placements) || n;
  if (c === "cut")
    return ((g = l.layout) == null ? void 0 : g.placements) || n;
  const h = (t - u) / a, y = on(h, 0, 1), m = c === "linear" ? y : Wx(y), f = ((k = l.layout) == null ? void 0 : k.placements) || [], v = ((b = o.layout) == null ? void 0 : b.placements) || [], I = v.map((C) => {
    const E = f.find((J) => J.stationId === C.stationId && J.displayId === C.displayId);
    if (!E)
      return {
        ...C,
        opacity: Math.max(0.05, m)
      };
    const N = Math.round(E.x + (C.x - E.x) * m), p = Math.round(E.y + (C.y - E.y) * m), $ = Math.round(E.width + (C.width - E.width) * m), j = Math.round(E.height + (C.height - E.height) * m), _ = Number(((E.rotation || 0) + ((C.rotation || 0) - (E.rotation || 0)) * m).toFixed(1));
    return {
      ...C,
      x: N,
      y: p,
      width: $,
      height: j,
      rotation: _,
      opacity: 1
    };
  });
  return f.forEach((C) => {
    v.some((N) => N.stationId === C.stationId && N.displayId === C.displayId) || I.push({
      ...C,
      opacity: Math.max(0, 1 - m)
    });
  }), I;
}
function Kx({
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
  var w, g, k;
  const h = [...(e == null ? void 0 : e.keyframes) || []];
  if (h.length === 0) {
    const b = u || "top-right", C = {
      id: `kf_root_${Date.now()}`,
      timestampEpochMs: r,
      transitionDurationSec: 0.5,
      transitionType: "smooth",
      utcClockPosition: b,
      layout: {
        width: o,
        height: a,
        backgroundColor: "#070A10",
        fps: c,
        utcClockPosition: b,
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
  const y = h.findIndex((b) => Math.abs(b.timestampEpochMs - n) <= l);
  if (y >= 0) {
    const b = h[y].utcClockPosition || ((w = h[y].layout) == null ? void 0 : w.utcClockPosition), C = u || b || "top-right";
    return h[y] = {
      ...h[y],
      utcClockPosition: C,
      layout: {
        ...h[y].layout,
        width: o,
        height: a,
        utcClockPosition: C,
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
    const b = h[0].utcClockPosition || ((g = h[0].layout) == null ? void 0 : g.utcClockPosition), C = u || b || "top-right";
    return h[0] = {
      ...h[0],
      utcClockPosition: C,
      layout: {
        ...h[0].layout,
        width: o,
        height: a,
        utcClockPosition: C,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: h },
      newIndex: 0,
      isNewKeyframe: !1,
      activeKeyframe: h[0]
    };
  }
  const m = [...h].reverse().find((b) => b.timestampEpochMs <= n) || h[0], f = u || (m == null ? void 0 : m.utcClockPosition) || ((k = m == null ? void 0 : m.layout) == null ? void 0 : k.utcClockPosition) || "top-right", v = {
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
  }, I = [...h, v].sort((b, C) => b.timestampEpochMs - C.timestampEpochMs), S = I.findIndex((b) => b.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: I },
    newIndex: S >= 0 ? S : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function uu(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function du(e, t, n) {
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
function Vx(e, t) {
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
function Wh(e, t, n, r = 500) {
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
  }, y = [...l, h].sort((v, I) => v.timestampEpochMs - I.timestampEpochMs), m = y.findIndex((v) => v.id === h.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: y
    },
    newIndex: m >= 0 ? m : 0,
    isNew: !0
  };
}
function Yx(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, a = n / r;
  let c, u, h, y;
  return o >= a ? (c = n, u = Math.round(c / o), h = e, y = t + Math.round((r - u) / 2)) : (u = r, c = Math.round(u * o), h = e + Math.round((n - c) / 2), y = t), { x: h, y, width: c, height: u };
}
const km = [
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
];
function Xx(e, t, n, r = 16 / 9) {
  if (e <= 0) return { rows: 1, cols: 1, cardW: t, cardH: n, totalArea: 0 };
  const l = r > 0 ? r : 16 / 9;
  let o = null, a = -1;
  for (let c = 1; c <= e; c++) {
    const u = Math.ceil(e / c), h = t / u, y = n / c;
    let m = Math.min(y, h / l), f = m * l;
    f > h && (f = h, m = f / l);
    const v = e * f * m;
    (v > a * 1.001 || Math.abs(v - a) <= a * 1e-3 && u >= c) && (a = v, o = {
      rows: c,
      cols: u,
      cardW: Math.round(f),
      cardH: Math.round(m),
      totalArea: v
    });
  }
  return o;
}
function Gx(e, t, n, r = null) {
  if (e <= 0) return [];
  if (r) {
    const h = Xx(e, t, n, r), { rows: y, cols: m, cardW: f, cardH: v } = h, I = m * f, S = y * v, O = Math.max(0, Math.round((t - I) / 2)), w = Math.max(0, Math.round((n - S) / 2));
    return Array.from({ length: e }, (g, k) => {
      const b = Math.floor(k / m), C = k % m, E = b === y - 1, N = e % m, $ = Math.round((m - (E && N !== 0 ? N : m)) * f / 2);
      return {
        cx: O + $ + C * f,
        cy: w + b * v,
        cw: f,
        ch: v
      };
    });
  }
  const l = t / n >= 2.5, o = e === 1 ? 1 : e === 2 ? 2 : e === 3 && l ? 3 : e <= 4 ? 2 : e <= 6 ? 3 : e <= 8 ? 4 : Math.ceil(Math.sqrt(e)), a = Math.ceil(e / o), c = Math.round(t / o), u = Math.round(n / a);
  return Array.from({ length: e }, (h, y) => {
    const m = Math.floor(y / o), f = y % o, v = m === a - 1 && e % o !== 0 ? e % o : o;
    return {
      cx: Math.round((o - v) * c / 2) + f * c,
      cy: m * u,
      cw: c,
      ch: u
    };
  });
}
function Qx(e, t, n, r = 2, l = km) {
  const o = e.nativeAspectRatio || (e.sourceWidth && e.sourceHeight ? e.sourceWidth / e.sourceHeight : 1.7777777777777777), { x: a, y: c, width: u, height: h } = Yx(n.cx, n.cy, n.cw, n.ch, o);
  return {
    ...e,
    x: a,
    y: c,
    width: u,
    height: h,
    sourceWidth: e.sourceWidth || 1920,
    sourceHeight: e.sourceHeight || 1080,
    nativeAspectRatio: o,
    aspectRatio: o,
    zIndex: t,
    rotation: 0,
    borderWidth: r === 1 ? 0 : 2,
    borderColor: l[t % l.length],
    shadowEffect: "deep",
    borderRadius: 0
  };
}
function En(e, t = 1920, n = 1080, r = km) {
  const l = e ? e.length : 0;
  if (l === 0) return [];
  let o = 0;
  e.slice(0, l).forEach((u) => {
    const h = u.nativeAspectRatio || (u.sourceWidth && u.sourceHeight ? u.sourceWidth / u.sourceHeight : 1.7777777777777777);
    o += h > 0 ? h : 16 / 9;
  });
  const a = o / l, c = Gx(l, t, n, a);
  return e.slice(0, l).map((u, h) => Qx(u, h, c[h], l, r));
}
function Jx(e, t = [], n = [], r = null, l = null, o = "mon-0") {
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
    const y = h.startEpochMs ?? h.StartEpochMs ?? h.startEpoch ?? 0, m = h.endEpochMs ?? h.EndEpochMs ?? h.endEpoch ?? 0;
    m > y && c.push({ startEpoch: y, endEpoch: m });
  }), Array.isArray(t) && t.filter((h) => h.type === "global").forEach((h) => {
    const y = h.startEpochMs ?? h.startEpoch ?? 0, m = h.endEpochMs ?? h.endEpoch ?? 0;
    m > y && !c.some((f) => f.startEpoch === y && f.endEpoch === m) && c.push({ startEpoch: y, endEpoch: m });
  }), c.forEach((h) => {
    const y = h.startEpoch, m = h.endEpoch, f = [];
    a.forEach((v) => {
      v.endEpochMs <= y || v.startEpochMs >= m ? f.push(v) : (v.startEpochMs < y && f.push({
        ...v,
        endEpochMs: y
      }), v.endEpochMs > m && f.push({
        ...v,
        startEpochMs: m
      }));
    }), a = f;
  }), (t || []).filter((h) => h.type !== "global").forEach((h) => {
    const y = h.startEpochMs ?? h.StartEpochMs ?? h.startEpoch ?? 0, m = h.endEpochMs ?? h.EndEpochMs ?? h.endEpoch ?? 0;
    if (!(!y || !m || m <= y))
      for (let f = a.length - 1; f > 0; f--) {
        const v = a[f].startEpochMs;
        v >= y && v <= m && a[f].startEpochMs === a[f - 1].endEpochMs && (a[f - 1].endEpochMs = a[f].endEpochMs, a.splice(f, 1));
      }
  });
  for (let h = a.length - 1; h > 0; h--)
    a[h].targetDisplayId === a[h - 1].targetDisplayId && a[h].startEpochMs === a[h - 1].endEpochMs && (a[h - 1].endEpochMs = a[h].endEpochMs, a.splice(h, 1));
  return a;
}
const wm = 6;
function qx(e, t) {
  return !t || t <= 0 ? null : t <= 360 ? 360 : t <= 540 ? 480 : t <= 750 ? 720 : null;
}
function Zx(e, {
  maxConcurrentDecoders: t = wm,
  activeAudioStationId: n = null,
  selectedFeedIndex: r = null,
  hoveredFeedIndex: l = null
} = {}) {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  const o = Math.min(6, Math.max(1, Number(t) || 6));
  if (e.length <= o)
    return e.map(() => !0);
  const c = e.map((h, y) => {
    var O, w;
    const m = h.width || 1920, f = h.height || 1080;
    let v = m * f;
    const I = (h.stationId || h.hostname || ((O = h.station) == null ? void 0 : O.id) || ((w = h.station) == null ? void 0 : w.hostname) || "").toLowerCase(), S = (n || "").toLowerCase();
    return S && (I === S || I.includes(S) || S.includes(I)) && (v += 1e8), r === y && (v += 5e7), l === y && (v += 25e6), { idx: y, score: v };
  });
  c.sort((h, y) => y.score - h.score);
  const u = new Set(c.slice(0, o).map((h) => h.idx));
  return e.map((h, y) => u.has(y));
}
const Pa = [
  { id: "4K", label: "4K UHD", shortLabel: "4K", baseH: 2160, desc: "Ultra-High Density" },
  { id: "2K", label: "2K QHD / WQXGA", shortLabel: "2K", baseH: 1440, desc: "High Pixel Density (Default)" },
  { id: "FHD", label: "1080p FHD", shortLabel: "FHD", baseH: 1080, desc: "Standard Full HD" },
  { id: "HD", label: "720p HD", shortLabel: "HD", baseH: 720, desc: "Compact Fast Export" }
], Us = "CUSTOM", Ws = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 2560, h: 1440 },
  { id: "16:10", label: "16:10 WUXGA / WQXGA", ratio: 16 / 10, w: 2560, h: 1600 },
  { id: "19:10", label: "19:10 NOC Extended", ratio: 19 / 10, w: 2736, h: 1440 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 3440, h: 1440 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 5120, h: 1440 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1920, h: 1440 }
], ey = "16:9";
function Cs(e, t = 320, n = 7680) {
  let r = Number(e);
  return isNaN(r) && (r = t), r = Math.max(t, Math.min(n, Math.round(r))), r -= r % 2, r;
}
function hu(e) {
  if (!e || typeof e != "string") return null;
  const t = e.trim().match(/^(\d{3,5})\s*[xX×]\s*(\d{3,5})$/);
  if (t) {
    const n = Cs(parseInt(t[1], 10), 320, 7680), r = Cs(parseInt(t[2], 10), 180, 4320);
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
function hr(e = "2K", t = "16:9", n = null) {
  if ((e === "CUSTOM" || n && !Pa.some((c) => c.id === e)) && n && n.w && n.h)
    return {
      w: Cs(n.w, 320, 7680),
      h: Cs(n.h, 180, 4320)
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
  const r = Ws.find((c) => c.id === t), l = r ? r.ratio : fu(t) || 16 / 9, o = e === "4K" ? 2160 : e === "2K" ? 1440 : e === "HD" ? 720 : 1080;
  let a = Math.round(o * l);
  return a -= a % 2, { w: a, h: o };
}
function Hr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 19 / 10) < 0.04 ? "19:10" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
const Kn = [
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
], ty = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function ny(e, t, n) {
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
function sy({
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
  playheadEpochMs: m = 0,
  timeMode: f = "LOCAL",
  isPlaying: v = !1,
  setIsPlaying: I,
  totalDurationMs: S,
  inPointMs: O = 0,
  outPointMs: w,
  setPlayheadMs: g,
  globalGaps: k = [],
  recordingSegments: b = {},
  playbackSpeed: C = 1,
  onChangePlaybackSpeed: E,
  keystrokeMode: N = "BurnIn",
  keystrokes: p = [],
  directorPlan: $ = null,
  onOverrideDisplay: j,
  onResetOverride: _,
  compositionLayout: J = "canvas",
  onChangeCompositionLayout: M,
  isAutoDirectorEnabled: R = !0,
  onToggleAutoDirector: re,
  onUpdateCanvasLayout: le,
  canvasLayoutTimeline: ae = null,
  onUpdateCanvasLayoutTimeline: F,
  activeKfIndex: Y = 0,
  setActiveKfIndex: T,
  isModalOpen: B = !1,
  isGridFullscreen: U = void 0,
  onToggleGridFullscreen: ve = null,
  activeFocusZone: G = "timeline",
  onFocusZoneChange: V = null
}) {
  const z = m > 0 ? m : h + y, [ge, ye] = i.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [Ne, Pe] = i.useState(() => {
    var d;
    return ((d = t[0]) == null ? void 0 : d.id) || null;
  }), [Se, Ie] = i.useState(!1), [Ze, Ye] = i.useState(!1), [Wt, It] = i.useState(!1), [wt, Q] = i.useState(null), [D, Z] = i.useState({ index: null, position: null }), [P, W] = i.useState(!1), [X, H] = i.useState(!1), [ne, se] = i.useState(!1), [de, De] = i.useState(!1), [ke, Xe] = i.useState(!1), [ft, qe] = i.useState(""), [gt, ct] = i.useState(""), et = i.useRef(null), [at, Ot] = i.useState(() => {
    try {
      const d = localStorage.getItem("itb_canvas_saved_presets");
      return d ? JSON.parse(d) : [];
    } catch {
      return [];
    }
  }), Zt = (d) => {
    Ot(d);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(d));
    } catch {
    }
  }, [xt, nt] = i.useState(!1), jt = U !== void 0 ? U : xt, [At, Dt] = i.useState(!1);
  i.useRef(null);
  const ln = i.useRef(null), Ct = i.useRef(null), fn = i.useRef(null), [Xt, ze] = i.useState({ width: 960, height: 540 }), [xe, Ue] = i.useState(null), [yt, me] = i.useState(!1), [ee, ue] = i.useState(null), [Ee, Fe] = i.useState(""), tt = i.useRef(null), [st, vt] = i.useState("");
  i.useEffect(() => {
    ee !== null && tt.current && (tt.current.focus(), tt.current.select());
  }, [ee]), i.useEffect(() => {
    const d = (x) => {
      x.key === "Escape" && (me(!1), Ue(null));
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, []);
  const [ot, ut] = i.useState(!1), [zt, _t] = i.useState(!1), [Gt, Qt] = i.useState(!1), yn = i.useRef(null);
  i.useEffect(() => {
    if (!Gt) return;
    const d = (A) => {
      yn.current && !yn.current.contains(A.target) && Qt(!1);
    }, x = (A) => {
      A.key === "Escape" && Qt(!1);
    };
    return window.addEventListener("mousedown", d), window.addEventListener("keydown", x), () => {
      window.removeEventListener("mousedown", d), window.removeEventListener("keydown", x);
    };
  }, [Gt]), i.useEffect(() => {
    Qt(!1);
  }, [xe]);
  const [vn, is] = i.useState(!1), [qn, cs] = i.useState(!1), [vs, il] = i.useState({ vertical: null, horizontal: null }), [en, Fs] = i.useState(!0), [Xl, Gl] = i.useState(!0), [tr, Zn] = i.useState(null), [Ln, On] = i.useState({ x: 0, y: 0, isInside: !1 }), nr = i.useRef(null), dn = i.useRef(null), pn = i.useRef(!1), [tn, Tt] = i.useState("auto-grid"), Or = i.useRef(!0);
  i.useEffect(() => {
    const d = setTimeout(() => {
      Or.current = !1;
    }, 400);
    return () => clearTimeout(d);
  }, []);
  const Wn = i.useRef([]), Kt = i.useRef([]), Ns = i.useRef(null), [, Dr] = i.useState(0), Ts = i.useRef(null), [Pr, Ql] = i.useState(null), Lt = i.useCallback((d, x = "success", A = "💾") => {
    Ts.current && clearTimeout(Ts.current), Ql({ text: d, type: x, icon: A }), Ts.current = setTimeout(() => {
      Ql(null), Ts.current = null;
    }, 2200);
  }, []), [gn, sr] = i.useState(() => {
    var A, q, te, K, oe, he;
    const d = (te = (q = (A = ae == null ? void 0 : ae.keyframes) == null ? void 0 : A[0]) == null ? void 0 : q.layout) == null ? void 0 : te.width, x = (he = (oe = (K = ae == null ? void 0 : ae.keyframes) == null ? void 0 : K[0]) == null ? void 0 : oe.layout) == null ? void 0 : he.height;
    if (d && x && d >= 320 && x >= 180)
      return { w: Cs(d), h: Cs(x, 180, 4320) };
    try {
      const pe = localStorage.getItem("itb_studio_canvas_custom_w"), we = localStorage.getItem("itb_studio_canvas_custom_h");
      if (pe && we) {
        const Qe = parseInt(pe, 10), lt = parseInt(we, 10);
        if (Qe >= 320 && lt >= 180)
          return { w: Cs(Qe), h: Cs(lt, 180, 4320) };
      }
    } catch {
    }
    return { w: 2560, h: 1440 };
  }), [Vt, _r] = i.useState(() => {
    const d = ae == null ? void 0 : ae.resolution;
    if (d && (Pa.some((x) => x.id === d) || d === Us || hu(d)))
      return d;
    try {
      const x = localStorage.getItem("itb_studio_canvas_resolution");
      if (x && (Pa.some((A) => A.id === x) || x === Us || hu(x))) return x;
    } catch {
    }
    return "2K";
  }), [Rt, us] = i.useState(() => {
    var q, te, K, oe, he, pe;
    const d = ae == null ? void 0 : ae.aspectRatio;
    if (d && Ws.some((we) => we.id === d))
      return d;
    const x = (K = (te = (q = ae == null ? void 0 : ae.keyframes) == null ? void 0 : q[0]) == null ? void 0 : te.layout) == null ? void 0 : K.width, A = (pe = (he = (oe = ae == null ? void 0 : ae.keyframes) == null ? void 0 : oe[0]) == null ? void 0 : he.layout) == null ? void 0 : pe.height;
    if (x && A) {
      const we = x / A, Qe = Ws.find((lt) => Math.abs(lt.ratio - we) < 0.04);
      if (Qe) return Qe.id;
    }
    try {
      const we = localStorage.getItem("itb_studio_canvas_aspect");
      if (we && (Ws.some((Qe) => Qe.id === we) || fu(we))) return we;
    } catch {
    }
    return ey;
  }), Jl = i.useMemo(() => hr(Vt, Rt, gn), [Vt, Rt, gn]), be = Jl.w, Ce = Jl.h, Fr = i.useMemo(() => {
    const d = Ws.find((A) => A.id === Rt);
    if (d) return { ...d, w: be, h: Ce };
    const x = be && Ce && Ce > 0 ? be / Ce : 16 / 9;
    return {
      id: Rt,
      label: `${Rt}`,
      ratio: x,
      w: be,
      h: Ce
    };
  }, [Rt, be, Ce]).ratio, [rr, Br] = i.useState(""), [cl, ql] = i.useState(""), [L, ie] = i.useState(null);
  i.useEffect(() => {
    ke && (Br(String(be)), ql(String(Ce)), ie(null));
  }, [ke]), i.useEffect(() => {
    if (!ne && !de && !ke && !X)
      return;
    const d = (x) => {
      x.target.closest(".wing-floating-popout") || x.target.closest(".btn-wing-tool") || (se(!1), De(!1), Xe(!1), H(!1));
    };
    return window.addEventListener("mousedown", d, !0), () => window.removeEventListener("mousedown", d, !0);
  }, [ne, de, ke, X]);
  const [ce, je] = i.useState(() => {
    try {
      const d = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (d !== null) return d === "true";
    } catch {
    }
    return !1;
  }), Re = i.useCallback(() => {
    je((d) => {
      const x = !d;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(x));
      } catch {
      }
      return x;
    });
  }, []), Me = i.useMemo(() => {
    const d = [], x = be >= 3e3 ? 200 : 100, A = x / 2, q = x / 10;
    for (let te = 0; te <= be; te += q) {
      const K = te % x === 0, oe = !K && te % A === 0;
      d.push({ val: te, isMajor: K, isMed: oe });
    }
    return d;
  }, [be]), Te = i.useMemo(() => {
    const d = [];
    for (let te = 0; te <= Ce; te += 10) {
      const K = te % 100 === 0, oe = !K && te % 50 === 0;
      d.push({ val: te, isMajor: K, isMed: oe });
    }
    return d;
  }, [Ce]), We = i.useCallback((d) => {
    const x = nr.current || Ct.current;
    if (!x) return;
    const A = x.getBoundingClientRect(), q = on(Math.round((d.clientX - A.left) / A.width * be), 0, be), te = on(Math.round((d.clientY - A.top) / A.height * Ce), 0, Ce);
    On({ x: q, y: te, isInside: !0 });
  }, [be, Ce]), Ge = i.useCallback(() => {
    On((d) => ({ ...d, isInside: !1 }));
  }, []), Be = i.useCallback(() => {
    const d = fn.current;
    if (!d) return;
    const x = d.getBoundingClientRect(), A = 104, q = en ? 20 : 0, te = en ? 18 : 0, K = Math.max(320, Math.floor(x.width || 960) - A - 16 - q), oe = Math.max(180, Math.floor(x.height || 540) - 16 - te);
    let he, pe;
    ce ? (he = K, pe = Math.round(he / Fr)) : K / oe >= Fr ? (pe = oe, he = Math.round(pe * Fr)) : (he = K, pe = Math.round(he / Fr)), ze((we) => we.width === he && we.height === pe ? we : { width: he, height: pe });
  }, [ce, Fr, en]);
  i.useEffect(() => {
    const d = fn.current;
    if (!d) return;
    Be();
    let x = null;
    return typeof ResizeObserver < "u" && (x = new ResizeObserver(() => {
      Be();
    }), x.observe(d)), window.addEventListener("resize", Be), () => {
      x && x.disconnect(), window.removeEventListener("resize", Be);
    };
  }, [Be]);
  const Oe = i.useMemo(() => (t && t.length > 0 ? t : n).map((x) => {
    const A = x.displays && x.displays.length > 0 ? x.displays : x.topology && x.topology.displays && x.topology.displays.length > 0 ? x.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: x.width || 1920, height: x.height || 1080 }], q = A.find((pe) => pe.isPrimary) || A[0], te = q.width || q.Width || x.width || 1920, K = q.height || q.Height || x.height || 1080, oe = te && K ? te / K : 16 / 9, he = A.length > 1;
    return {
      stationId: x.id,
      displayId: "auto",
      label: `${x.displayName || x.roleAlias || x.hostname || x.name} - ${he ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: x.displayName || x.roleAlias || x.hostname || x.name,
      stationHostname: x.hostname || x.id,
      isPrimary: !0,
      sourceWidth: te,
      sourceHeight: K,
      nativeAspectRatio: oe,
      aspectRatio: oe,
      width: te,
      height: K
    };
  }), [t, n]), He = i.useMemo(() => {
    const d = t && t.length > 0 ? t : n, x = [];
    return d.forEach((A) => {
      const q = A.displays && A.displays.length > 0 ? A.displays : A.topology && A.topology.displays && A.topology.displays.length > 0 ? A.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: A.width || 1920, height: A.height || 1080 }], te = q.find((pe) => pe.isPrimary) || q[0], K = te.width || te.Width || A.width || 1920, oe = te.height || te.Height || A.height || 1080, he = K / oe;
      x.push({
        stationId: A.id,
        displayId: "auto",
        label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${q.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: A.displayName || A.roleAlias || A.hostname || A.name,
        stationHostname: A.hostname || A.id,
        isPrimary: !0,
        sourceWidth: K,
        sourceHeight: oe,
        nativeAspectRatio: he,
        aspectRatio: he,
        width: K,
        height: oe
      }), q.length > 1 && q.forEach((pe, we) => {
        const Qe = (pe.displayId || `mon-${we}`).toLowerCase(), lt = pe.displayNumber || we + 1, dt = pe.displayName || `Screen ${lt}`, Ae = pe.width || pe.Width || A.width || 1920, pt = pe.height || pe.Height || A.height || 1080, Yt = Ae / pt;
        x.push({
          stationId: A.id,
          displayId: Qe,
          label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${dt}`,
          stationName: A.displayName || A.roleAlias || A.hostname || A.name,
          stationHostname: A.hostname || A.id,
          isPrimary: !!pe.isPrimary,
          sourceWidth: Ae,
          sourceHeight: pt,
          nativeAspectRatio: Yt,
          aspectRatio: Yt,
          width: Ae,
          height: pt
        });
      });
    }), x;
  }, [t, n]), [_e, Ke] = i.useState(() => {
    var d;
    if (((d = ae == null ? void 0 : ae.keyframes) == null ? void 0 : d.length) > 0) {
      const x = JSON.parse(JSON.stringify(ae));
      if (t && t.length > 0) {
        const A = new Set(t.map((te) => te.id));
        if (x.keyframes.forEach((te) => {
          var K, oe;
          ((oe = (K = te.layout) == null ? void 0 : K.placements) == null ? void 0 : oe.length) > 0 && (te.layout.placements = te.layout.placements.filter((he) => A.has(he.stationId)));
        }), x.keyframes.some((te) => {
          var K, oe;
          return ((oe = (K = te.layout) == null ? void 0 : K.placements) == null ? void 0 : oe.length) > 0;
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
            width: be,
            height: Ce,
            backgroundColor: "#070A10",
            fps: 30,
            utcClockPosition: ge,
            placements: En(Oe, be, Ce)
          }
        }
      ]
    };
  }), Ft = i.useRef(""), Nt = i.useRef(_e);
  Nt.current = _e, i.useEffect(() => {
    var d;
    if (((d = ae == null ? void 0 : ae.keyframes) == null ? void 0 : d.length) > 0) {
      const x = JSON.stringify(ae);
      if (x === Ft.current) return;
      if (Nt.current && x === JSON.stringify(Nt.current)) {
        Ft.current = x;
        return;
      }
      Ft.current = x;
      const A = JSON.parse(x);
      if (t && t.length > 0) {
        const te = new Set(t.map((K) => K.id));
        A.keyframes.forEach((K) => {
          var oe, he;
          ((he = (oe = K.layout) == null ? void 0 : oe.placements) == null ? void 0 : he.length) > 0 && (K.layout.placements = K.layout.placements.filter((pe) => te.has(pe.stationId)));
        });
      }
      Ke(A), A.keyframes.some((te) => {
        var K, oe;
        return ((oe = (K = te.layout) == null ? void 0 : K.placements) == null ? void 0 : oe.length) > 0;
      }) && (A.keyframes.some((K) => {
        var oe;
        return ((oe = K.layout) == null ? void 0 : oe.preset) === "custom" || K.preset === "custom";
      }) ? (pn.current = !0, Tt("custom")) : Tt("auto-grid"));
    }
  }, [ae, t]);
  const ht = _e.keyframes || [], ds = i.useMemo(() => Hx(ht, z), [ht, z]), kt = on(
    Y ?? ds,
    0,
    Math.max(0, ht.length - 1)
  ), bt = ht[kt] || ht[ds] || ht[0], fe = i.useMemo(() => {
    var d;
    return ((d = bt == null ? void 0 : bt.layout) == null ? void 0 : d.placements) || [];
  }, [bt]), Bs = i.useMemo(() => {
    var d;
    return (bt == null ? void 0 : bt.utcClockPosition) || ((d = bt == null ? void 0 : bt.layout) == null ? void 0 : d.utcClockPosition) || ge;
  }, [bt, ge]);
  i.useEffect(() => {
    xe >= 0 && fe[xe] ? vt(fe[xe].label ?? "") : vt("");
  }, [xe, fe]);
  const lr = i.useCallback((d = "Action") => ({
    label: d,
    timeline: JSON.parse(JSON.stringify(_e)),
    resolutionId: Vt,
    aspectId: Rt,
    presetId: tn,
    selectedFeedIndex: xe
  }), [_e, Vt, Rt, tn, xe]), es = i.useCallback((d = "Action") => {
    const x = lr(d);
    Wn.current.push(x), Wn.current.length > 50 && Wn.current.shift(), Kt.current = [], Dr((A) => A + 1);
  }, [lr]), hd = i.useCallback(() => {
    Ns.current && (Wn.current.push(Ns.current), Wn.current.length > 50 && Wn.current.shift(), Kt.current = [], Ns.current = null, Dr((d) => d + 1));
  }, []), fd = i.useCallback(() => {
    const d = m > 0 ? m : h + y, x = 500;
    if (d <= h + x) return kt;
    const A = bt != null && bt.layout ? JSON.parse(JSON.stringify(bt.layout)) : {
      width: be,
      height: Ce,
      backgroundColor: "#070A10",
      fps: 30,
      utcClockPosition: Bs,
      placements: fe
    };
    A.utcClockPosition = A.utcClockPosition || Bs;
    const { nextTimeline: q, newIndex: te, isNew: K } = Wh(_e, d, A, x);
    return K && (Ke(q), F && F(q), T && T(te), Lt(
      `Keyframe #${te + 1} created at ${St(d, f, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), te;
  }, [m, h, y, kt, bt, be, Ce, fe, Bs, _e, F, T, f, Lt]), rt = i.useCallback((d, x = null) => {
    x && es(x);
    const A = m > 0 ? m : h + y;
    Ke((q) => {
      const { nextTimeline: te, newIndex: K, isNewKeyframe: oe } = Kx({
        prevTimeline: q,
        newPlacements: d,
        currentEpochMs: A,
        baseEpochMs: h,
        toleranceMs: 500,
        virtualW: be,
        virtualH: Ce,
        fps: 30,
        utcClockPosition: Bs
      });
      return F && F(te), T && T(K), oe && K > 0 && Lt(
        `Keyframe #${K + 1} created at ${St(A, f, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), te;
    });
  }, [m, h, y, be, Ce, Bs, F, T, f, Lt, es]);
  i.useEffect(() => {
    if (Oe.length > 0 && (!fe || fe.length === 0) && !pn.current) {
      const d = En(Oe, be, Ce);
      d.length > 0 && (rt(d), Tt("auto-grid"));
    }
  }, [Oe, fe, rt, be, Ce]);
  const pd = i.useRef("");
  i.useEffect(() => {
    if (!t || t.length === 0 || Oe.length === 0) return;
    const d = (t || []).map((q) => q.id).sort().join(","), x = new Set((fe || []).map((q) => q.stationId)), A = t.some((q) => !x.has(q.id));
    if (pd.current !== d || A) {
      if (pd.current = d, tn === "auto-grid" || !pn.current || A || !fe || fe.length === 0) {
        const q = En(Oe, be, Ce);
        q.length > 0 && rt(q);
      } else if (fe && fe.length > 0) {
        const q = new Set(t.map((K) => K.id)), te = fe.filter((K) => q.has(K.stationId));
        if (te.length !== fe.length)
          if (te.length === 0) {
            const K = En(Oe, be, Ce);
            rt(K);
          } else
            rt(te);
      }
    }
  }, [t, Oe, tn, fe, rt, be, Ce]);
  const Zl = i.useRef({ w: be, h: Ce });
  i.useEffect(() => {
    var A, q;
    if (!bt || !fe || fe.length === 0) return;
    const d = (A = bt.layout) == null ? void 0 : A.width, x = (q = bt.layout) == null ? void 0 : q.height;
    if (d && x && (d !== be || x !== Ce)) {
      if (Zl.current.w === be && Zl.current.h === Ce && Zl.current.kfW === d && Zl.current.kfH === x)
        return;
      if (Zl.current = { w: be, h: Ce, kfW: d, kfH: x }, tn === "auto-grid" || !pn.current) {
        const te = Oe.length > 0 ? Oe : fe, K = En(te, be, Ce);
        K.length > 0 && rt(K, `Auto-fit to ${be}×${Ce}`);
      } else {
        const te = be / d, K = Ce / x, oe = fe.map((he) => ({
          ...he,
          x: Math.round(he.x * te),
          y: Math.round(he.y * K),
          width: Math.max(40, Math.round(he.width * te)),
          height: Math.max(30, Math.round(he.height * K))
        }));
        rt(oe, `Rescaled to ${be}×${Ce}`);
      }
    }
  }, [be, Ce, bt, fe, tn, Oe, rt]), i.useEffect(() => {
    le && le({
      width: be,
      height: Ce,
      resolution: Vt,
      aspectRatio: Rt,
      backgroundColor: "#070A10",
      fps: 30,
      placements: fe,
      timeline: _e
    });
  }, [fe, _e, le, be, Ce, Vt, Rt]);
  const $m = i.useCallback((d) => {
    if (Vt === d) return;
    const x = hr(Vt, Rt, gn), A = hr(d, Rt, gn);
    _r(d);
    try {
      localStorage.setItem("itb_studio_canvas_resolution", d);
    } catch {
    }
    if (!pn.current || tn === "auto-grid") {
      const q = Oe.length > 0 ? Oe : fe && fe.length > 0 ? fe : He, te = En(q, A.w, A.h);
      rt(te, `Resolution change to ${d}`);
    } else {
      const q = A.w / x.w, te = A.h / x.h, K = fe.map((oe) => ({
        ...oe,
        x: Math.round(oe.x * q),
        y: Math.round(oe.y * te),
        width: Math.max(40, Math.round(oe.width * q)),
        height: Math.max(30, Math.round(oe.height * te))
      }));
      rt(K, `Resolution change to ${d}`);
    }
    Lt(`Canvas Resolution: ${d} (${A.w}×${A.h})`, "info", "📺");
  }, [Vt, Rt, gn, fe, Oe, He, tn, rt, Lt]), Ti = i.useCallback(() => {
    const d = parseInt(rr, 10), x = parseInt(cl, 10);
    if (isNaN(d) || isNaN(x)) {
      ie("Enter valid numbers");
      return;
    }
    if (d < 320 || d > 7680) {
      ie("Width: 320 - 7680px");
      return;
    }
    if (x < 180 || x > 4320) {
      ie("Height: 180 - 4320px");
      return;
    }
    ie(null);
    const A = Cs(d, 320, 7680), q = Cs(x, 180, 4320), te = hr(Vt, Rt, gn), K = { w: A, h: q };
    sr(K), _r(Us);
    const oe = Hr(A, q);
    us(oe);
    try {
      localStorage.setItem("itb_studio_canvas_resolution", Us), localStorage.setItem("itb_studio_canvas_custom_w", String(A)), localStorage.setItem("itb_studio_canvas_custom_h", String(q)), localStorage.setItem("itb_studio_canvas_aspect", oe);
    } catch {
    }
    if (te.w !== K.w || te.h !== K.h)
      if (!pn.current || tn === "auto-grid") {
        const he = Oe.length > 0 ? Oe : fe && fe.length > 0 ? fe : He, pe = En(he, K.w, K.h);
        rt(pe, `Custom resolution set to ${A}×${q}`);
      } else {
        const he = K.w / te.w, pe = K.h / te.h, we = fe.map((Qe) => ({
          ...Qe,
          x: Math.round(Qe.x * he),
          y: Math.round(Qe.y * pe),
          width: Math.max(40, Math.round(Qe.width * he)),
          height: Math.max(30, Math.round(Qe.height * pe))
        }));
        rt(we, `Custom resolution set to ${A}×${q}`);
      }
    Xe(!1), Lt(`Canvas Resolution: Custom (${A}×${q})`, "info", "📺");
  }, [rr, cl, Vt, Rt, gn, fe, Oe, He, tn, rt, Lt]), Am = i.useCallback((d) => {
    if (Rt === d) return;
    const x = hr(Vt, Rt, gn);
    let A;
    if (Vt === Us && (gn != null && gn.h)) {
      const q = Ws.find((oe) => oe.id === d), te = q ? q.ratio : fu(d) || 16 / 9;
      A = { w: Cs(Math.round(gn.h * te), 320, 7680), h: gn.h }, sr(A);
      try {
        localStorage.setItem("itb_studio_canvas_custom_w", String(A.w)), localStorage.setItem("itb_studio_canvas_custom_h", String(A.h));
      } catch {
      }
    } else
      A = hr(Vt, d, gn);
    us(d);
    try {
      localStorage.setItem("itb_studio_canvas_aspect", d);
    } catch {
    }
    if (!pn.current || tn === "auto-grid") {
      const q = Oe.length > 0 ? Oe : fe && fe.length > 0 ? fe : He, te = En(q, A.w, A.h);
      rt(te, `Aspect change to ${d}`);
    } else {
      const q = A.w / x.w, te = A.h / x.h, K = fe.map((oe) => ({
        ...oe,
        x: Math.round(oe.x * q),
        y: Math.round(oe.y * te),
        width: Math.max(40, Math.round(oe.width * q)),
        height: Math.max(30, Math.round(oe.height * te))
      }));
      rt(K, `Aspect change to ${d}`);
    }
    Lt(`Canvas Aspect: ${d} (${A.w}×${A.h})`, "info", "📐");
  }, [Rt, Vt, gn, Oe, fe, He, rt, Lt]), md = i.useCallback((d) => {
    if (fe.length >= 6) {
      alert("Maximum concurrent studio playback screens reached (Hard cap: 6 screens). Please remove or replace a screen.");
      return;
    }
    const x = fe.length > 0 ? Math.max(...fe.map((pe) => pe.zIndex || 0)) + 1 : 0, A = Kn[fe.length % Kn.length], q = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 16 / 9), te = q >= 1 ? 640 : Math.round(360 * q), K = q >= 1 ? Math.round(640 / q) : 360, oe = {
      stationId: d.stationId,
      displayId: d.displayId,
      label: d.label,
      x: 100 + fe.length * 40 % 800,
      y: 80 + fe.length * 40 % 500,
      width: te,
      height: K,
      sourceWidth: d.sourceWidth || 1920,
      sourceHeight: d.sourceHeight || 1080,
      nativeAspectRatio: q,
      aspectRatio: q,
      zIndex: x,
      rotation: 0,
      borderWidth: 2,
      borderColor: A,
      shadowEffect: "deep",
      borderRadius: 0
    }, he = [...fe, oe];
    rt(he), Ue(he.length - 1);
  }, [fe, rt]), qo = i.useCallback((d) => {
    const x = fe.filter((A, q) => q !== d);
    rt(x), Ue((A) => x.length === 0 ? null : A !== null ? Math.min(A, x.length - 1) : null);
  }, [fe, rt]), gd = i.useCallback(() => {
    rt([]), Ue(null);
  }, [rt]), Rm = (d) => {
    const x = d.map((q, te) => ({ p: q, origIdx: te }));
    x.sort((q, te) => (q.p.zIndex ?? q.origIdx) - (te.p.zIndex ?? te.origIdx));
    const A = [...d];
    return x.forEach(({ origIdx: q }, te) => {
      A[q] = { ...A[q], zIndex: te + 1 };
    }), A;
  }, or = i.useCallback((d, x) => {
    if (d < 0 || !fe[d]) return;
    const A = Rm(fe), q = A[d].zIndex, te = A.length;
    let K;
    if (x === "front") {
      if (q >= te) return;
      K = A.map((oe, he) => he === d ? { ...oe, zIndex: te } : oe.zIndex > q ? { ...oe, zIndex: oe.zIndex - 1 } : oe);
    } else if (x === "back") {
      if (q <= 1) return;
      K = A.map((oe, he) => he === d ? { ...oe, zIndex: 1 } : oe.zIndex < q ? { ...oe, zIndex: oe.zIndex + 1 } : oe);
    } else if (x === "forward") {
      const oe = q + 1;
      if (oe > te) return;
      K = A.map((he, pe) => pe === d ? { ...he, zIndex: oe } : he.zIndex === oe ? { ...he, zIndex: q } : he);
    } else if (x === "backward") {
      const oe = q - 1;
      if (oe < 1) return;
      K = A.map((he, pe) => pe === d ? { ...he, zIndex: oe } : he.zIndex === oe ? { ...he, zIndex: q } : he);
    }
    K && rt(K);
  }, [fe, rt]);
  i.useCallback((d = xe) => or(d, "front"), [or, xe]), i.useCallback((d = xe) => or(d, "back"), [or, xe]);
  const xd = i.useCallback((d = xe) => or(d, "forward"), [or, xe]), yd = i.useCallback((d = xe) => or(d, "backward"), [or, xe]), eo = i.useCallback((d) => {
    if (xe < 0 || !fe[xe]) return;
    const x = fe.map((A, q) => q === xe ? { ...A, ...d } : A);
    rt(x);
  }, [xe, fe, rt]), Zo = i.useCallback((d, x, A = !0) => {
    if (d < 0 || !fe[d]) return;
    const q = typeof x == "string" ? x.trim() : "", te = q.length > 0 ? q : null;
    if (fe[d].label === te) return;
    const K = fe.map((oe, he) => he === d ? { ...oe, label: te } : oe);
    rt(K, A ? "Rename Screen Title" : null);
  }, [fe, rt]), $i = i.useCallback((d) => {
    if (d < 0 || !fe[d]) {
      ue(null);
      return;
    }
    Zo(d, Ee, !0), ue(null);
  }, [fe, Ee, Zo]), Lm = i.useCallback((d = 90) => {
    const x = fe[xe];
    if (!x) return;
    const q = ((x.rotation || 0) + d) % 360;
    eo({ rotation: q });
  }, [xe, fe, eo]), Ai = i.useCallback((d = xe) => {
    if (d < 0 || !fe[d]) return;
    const x = fe.length, A = fe.map((q, te) => te === d ? {
      ...q,
      x: 0,
      y: 0,
      width: be,
      height: Ce,
      zIndex: x
    } : q);
    rt(A);
  }, [xe, fe, rt, be, Ce]), ar = i.useCallback((d) => {
    let x = [];
    const A = Oe.length > 0 ? Oe : He.length > 0 ? He : fe, q = (te, K, oe, he, pe, we = 0, Qe = {}) => ({
      ...te,
      x: K,
      y: oe,
      width: he,
      height: pe,
      sourceWidth: te.sourceWidth || 1920,
      sourceHeight: te.sourceHeight || 1080,
      nativeAspectRatio: te.nativeAspectRatio || 16 / 9,
      aspectRatio: te.aspectRatio || 16 / 9,
      zIndex: we,
      rotation: 0,
      borderWidth: Qe.borderWidth ?? 2,
      borderColor: Qe.borderColor ?? Kn[we % Kn.length],
      shadowEffect: Qe.shadowEffect ?? "deep",
      borderRadius: Qe.borderRadius ?? 0
    });
    switch (d) {
      case "auto":
      case "auto-grid":
        x = En(A, be, Ce);
        break;
      case "1x1":
        x = A.length > 0 ? En(A.slice(0, 1), be, Ce) : [];
        break;
      case "1x2":
        x = A.length >= 2 ? En(A.slice(0, 2), be, Ce) : En(A, be, Ce);
        break;
      case "2x2":
        x = A.length >= 4 ? En(A.slice(0, 4), be, Ce) : En(A, be, Ce);
        break;
      case "3-grid":
        x = A.length >= 3 ? En(A.slice(0, 3), be, Ce) : En(A, be, Ce);
        break;
      case "1+3-pip":
        if (A.length >= 2) {
          x = [
            q(A[0], 0, 0, be, Ce, 0, { borderWidth: 0, shadowEffect: "none" })
          ];
          const te = Math.round(be * 0.23), K = Math.round(te / (16 / 9));
          A.slice(1, 4).forEach((oe, he) => {
            x.push(q(
              oe,
              be - te - 24,
              24 + he * (K + 16),
              te,
              K,
              10 + he,
              { borderWidth: 3, borderColor: Kn[(he + 1) % Kn.length], shadowEffect: "glow-cyan", borderRadius: 6 }
            ));
          });
        }
        break;
      case "hero-stacked":
        if (A.length >= 3) {
          const te = Math.round(be * 0.666), K = be - te, oe = Math.round(Ce / 2);
          x = [
            q(A[0], 0, 0, te, Ce, 0),
            q(A[1], te, 0, K, oe, 1),
            q(A[2], te, oe, K, oe, 2)
          ];
        }
        break;
    }
    x.length > 0 && (rt(x), Ue(0), d === "auto" || d === "auto-grid" ? (Tt("auto-grid"), pn.current = !1) : (Tt(d), pn.current = !0));
  }, [He, fe, Oe, rt, be, Ce]), vd = i.useCallback(() => {
    const d = ft.trim() || `Custom Layout ${at.length + 1}`, A = [{
      id: `preset-${Date.now()}`,
      name: d,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(fe)),
      keyframes: JSON.parse(JSON.stringify(ht))
    }, ...at];
    Zt(A), qe(""), W(!1);
  }, [ft, at, fe, ht]), Om = i.useCallback((d) => {
    !d || !d.placements || (rt(d.placements), Ue(0), Tt("custom"), pn.current = !0, H(!1));
  }, [rt]), Dm = i.useCallback((d, x) => {
    x == null || x.stopPropagation();
    const A = at.filter((q) => q.id !== d);
    Zt(A);
  }, [at]), Pm = i.useCallback(() => {
    const d = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: be,
      height: Ce,
      aspectRatio: Rt,
      placements: fe,
      timeline: _e
    }, x = JSON.stringify(d, null, 2), A = new window.Blob([x], { type: "application/json" }), q = window.URL.createObjectURL(A), te = document.createElement("a"), K = /* @__PURE__ */ new Date(), oe = (pe) => String(pe).padStart(2, "0"), he = `${K.getFullYear()}${oe(K.getMonth() + 1)}${oe(K.getDate())}_${oe(K.getHours())}${oe(K.getMinutes())}${oe(K.getSeconds())}`;
    te.href = q, te.download = `canvas_layout_${he}.json`, document.body.appendChild(te), te.click(), document.body.removeChild(te), window.URL.revokeObjectURL(q);
  }, [fe, _e, be, Ce, Rt]), _m = i.useCallback((d) => {
    var q;
    const x = (q = d.target.files) == null ? void 0 : q[0];
    if (!x) return;
    const A = new window.FileReader();
    A.onload = (te) => {
      var K, oe, he;
      try {
        const pe = JSON.parse(te.target.result);
        if (pe.width && pe.height) {
          const Qe = Ws.find((lt) => lt.w === pe.width && lt.h === pe.height);
          Qe && us(Qe.id);
        } else if (pe.aspectRatio) {
          const Qe = Ws.find((lt) => lt.id === pe.aspectRatio);
          Qe && us(Qe.id);
        }
        let we = null;
        Array.isArray(pe) ? we = pe : pe.placements && Array.isArray(pe.placements) ? we = pe.placements : (K = pe.layout) != null && K.placements && Array.isArray(pe.layout.placements) && (we = pe.layout.placements), we && we.length > 0 && (rt(we), Ue(0), Tt("custom"), pn.current = !0), ((he = (oe = pe.timeline) == null ? void 0 : oe.keyframes) == null ? void 0 : he.length) > 0 && (Ke(pe.timeline), F && F(pe.timeline));
      } catch (pe) {
        console.error("Failed to parse imported canvas JSON:", pe), alert(`Canvas Import Error: ${pe.message}`);
      }
    }, A.readAsText(x), d.target.value = "";
  }, [rt, F]), Ri = (d, x) => {
    if (d.button !== 0) return;
    d.stopPropagation(), d.preventDefault(), Ue(x), V == null || V("canvas"), pn.current = !0, Tt("custom");
    const A = fd(), q = nr.current || Ct.current;
    if (!q) return;
    const te = q.getBoundingClientRect(), K = fe[x];
    if (!K) return;
    Ns.current = lr("Move Feed"), dn.current = {
      mode: "drag",
      index: x,
      startX: d.clientX,
      startY: d.clientY,
      initialX: K.x,
      initialY: K.y,
      initialW: K.width,
      initialH: K.height,
      scaleX: be / te.width,
      scaleY: Ce / te.height,
      activeSnapZone: null
    }, is(!0);
    const oe = (pe) => {
      if (!dn.current || dn.current.mode !== "drag") return;
      const we = dn.current, Qe = nr.current || Ct.current;
      if (!Qe) return;
      const lt = Qe.getBoundingClientRect(), dt = (pe.clientX - we.startX) * we.scaleX, Ae = (pe.clientY - we.startY) * we.scaleY;
      let pt = Math.round(we.initialX + dt), Yt = Math.round(we.initialY + Ae);
      pt = on(pt, 0, be - we.initialW), Yt = on(Yt, 0, Ce - we.initialH);
      const Hn = Xl && !pe.altKey;
      let Bt = null, wn = null, In = null;
      if (Hn) {
        const Je = pe.clientX - lt.left, Mt = pe.clientY - lt.top, Ut = 32, $e = Math.round(be / 2), Et = Math.round(Ce / 2);
        if (Je <= Ut ? Mt <= lt.height * 0.22 ? Bt = { x: 0, y: 0, width: $e, height: Et, label: "◰ Top-Left Quarter" } : Mt >= lt.height * 0.78 ? Bt = { x: 0, y: Et, width: $e, height: Et, label: "◱ Bottom-Left Quarter" } : Bt = { x: 0, y: 0, width: $e, height: Ce, label: "◧ Left Half (50%)" } : Je >= lt.width - Ut ? Mt <= lt.height * 0.22 ? Bt = { x: $e, y: 0, width: $e, height: Et, label: "◲ Top-Right Quarter" } : Mt >= lt.height * 0.78 ? Bt = { x: $e, y: Et, width: $e, height: Et, label: "◳ Bottom-Right Quarter" } : Bt = { x: $e, y: 0, width: $e, height: Ce, label: "◨ Right Half (50%)" } : Mt <= Ut && Je >= lt.width * 0.25 && Je <= lt.width * 0.75 && (Bt = { x: 0, y: 0, width: be, height: Ce, label: "🗖 Full Canvas Maximize" }), !Bt) {
          const ur = fe.filter((it, Wr) => Wr !== we.index), $s = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: be, targetX: be - we.initialW, guide: 100 },
            { snapTo: $e, targetX: $e - Math.round(we.initialW / 2), guide: 50 }
          ];
          ur.forEach((it) => {
            $s.push({ snapTo: it.x, targetX: it.x, guide: it.x / be * 100 }), $s.push({ snapTo: it.x + it.width, targetX: it.x + it.width - we.initialW, guide: (it.x + it.width) / be * 100 }), $s.push({ snapTo: it.x + it.width, targetX: it.x + it.width, guide: (it.x + it.width) / be * 100 }), $s.push({ snapTo: it.x, targetX: it.x - we.initialW, guide: it.x / be * 100 });
          });
          let bd = 18;
          $s.forEach((it) => {
            const Wr = Math.abs(pt - it.targetX);
            Wr < bd && (bd = Wr, pt = it.targetX, wn = it.guide);
          });
          const to = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Ce, targetY: Ce - we.initialH, guide: 100 },
            { snapTo: Et, targetY: Et - Math.round(we.initialH / 2), guide: 50 }
          ];
          ur.forEach((it) => {
            to.push({ snapTo: it.y, targetY: it.y, guide: it.y / Ce * 100 }), to.push({ snapTo: it.y + it.height, targetY: it.y + it.height - we.initialH, guide: (it.y + it.height) / Ce * 100 }), to.push({ snapTo: it.y + it.height, targetY: it.y + it.height, guide: (it.y + it.height) / Ce * 100 }), to.push({ snapTo: it.y, targetY: it.y - we.initialH, guide: it.y / Ce * 100 });
          });
          let Md = 18;
          to.forEach((it) => {
            const Wr = Math.abs(Yt - it.targetY);
            Wr < Md && (Md = Wr, Yt = it.targetY, In = it.guide);
          });
        }
      }
      we.activeSnapZone = Bt, we.latestX = pt, we.latestY = Yt, Zn(Bt), il({ vertical: wn, horizontal: In }), Ke((Je) => {
        const Mt = [...Je.keyframes || []], Ut = A < Mt.length ? A : kt;
        if (!Mt[Ut]) return Je;
        const $e = [...Mt[Ut].layout.placements || []];
        return $e[we.index] ? ($e[we.index] = { ...$e[we.index], x: pt, y: Yt }, Mt[Ut] = {
          ...Mt[Ut],
          layout: { ...Mt[Ut].layout, placements: $e }
        }, { ...Je, keyframes: Mt }) : Je;
      });
    }, he = () => {
      var pe;
      if (is(!1), il({ vertical: null, horizontal: null }), (pe = dn.current) != null && pe.activeSnapZone) {
        const we = dn.current.activeSnapZone, Qe = dn.current.index;
        Ke((lt) => {
          const dt = [...lt.keyframes || []], Ae = A < dt.length ? A : kt;
          if (!dt[Ae]) return lt;
          const pt = [...dt[Ae].layout.placements || []];
          return pt[Qe] ? (pt[Qe] = {
            ...pt[Qe],
            x: we.x,
            y: we.y,
            width: we.width,
            height: we.height
          }, dt[Ae] = {
            ...dt[Ae],
            layout: { ...dt[Ae].layout, placements: pt }
          }, { ...lt, keyframes: dt }) : lt;
        });
      }
      if (dn.current) {
        const we = dn.current, Qe = we.initialX, lt = we.initialY, dt = we.activeSnapZone ? we.activeSnapZone.x : we.latestX ?? Qe, Ae = we.activeSnapZone ? we.activeSnapZone.y : we.latestY ?? lt;
        dt !== Qe || Ae !== lt ? (hd(), F && Ke((pt) => (F(pt), pt))) : Ns.current = null;
      }
      Zn(null), dn.current = null, window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", he);
    };
    window.addEventListener("mousemove", oe), window.addEventListener("mouseup", he);
  }, ea = (d, x, A = "br") => {
    if (d.button !== 0) return;
    d.stopPropagation(), d.preventDefault(), Ue(x), pn.current = !0, Tt("custom");
    const q = fd();
    if (!Ct.current) return;
    const te = Ct.current.getBoundingClientRect(), K = fe[x];
    if (!K) return;
    Ns.current = lr("Resize Feed");
    const oe = He.find((dt) => dt.stationId === K.stationId && dt.displayId === K.displayId), he = K.sourceWidth || (oe == null ? void 0 : oe.sourceWidth) || 1920, pe = K.sourceHeight || (oe == null ? void 0 : oe.sourceHeight) || 1080, we = K.nativeAspectRatio || K.aspectRatio || (oe == null ? void 0 : oe.nativeAspectRatio) || he / pe || K.width / K.height || 16 / 9;
    dn.current = {
      mode: "resize",
      corner: A,
      index: x,
      startX: d.clientX,
      startY: d.clientY,
      initialX: K.x,
      initialY: K.y,
      initialW: K.width,
      initialH: K.height,
      sourceWidth: he,
      sourceHeight: pe,
      nativeAspectRatio: we,
      scaleX: be / te.width,
      scaleY: Ce / te.height
    }, cs(!0);
    const Qe = (dt) => {
      if (!dn.current || dn.current.mode !== "resize") return;
      const Ae = dn.current, pt = (dt.clientX - Ae.startX) * Ae.scaleX, Yt = (dt.clientY - Ae.startY) * Ae.scaleY, Hn = dt.ctrlKey || dt.shiftKey || dt.metaKey, Bt = Ae.nativeAspectRatio > 0 ? Ae.nativeAspectRatio : Ae.initialW / Ae.initialH;
      let wn = Ae.initialX, In = Ae.initialY, Je = Ae.initialW, Mt = Ae.initialH;
      if (Ae.corner === "br") {
        const Ut = be - Ae.initialX, $e = Ce - Ae.initialY;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ut, Math.round(Ae.initialW + pt))), mt = Math.round(Et / Bt);
          mt > $e && (mt = $e, Et = Math.round(mt * Bt)), mt < 90 && (mt = 90, Et = Math.round(mt * Bt)), Je = Et, Mt = mt;
        } else
          Je = on(Math.round(Ae.initialW + pt), 160, Ut), Mt = on(Math.round(Ae.initialH + Yt), 90, $e);
      } else if (Ae.corner === "bl") {
        const Ut = Ae.initialX + Ae.initialW, $e = Ce - Ae.initialY;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ut, Math.round(Ae.initialW - pt))), mt = Math.round(Et / Bt);
          mt > $e && (mt = $e, Et = Math.round(mt * Bt)), mt < 90 && (mt = 90, Et = Math.round(mt * Bt)), Je = Et, Mt = mt, wn = Ae.initialX + Ae.initialW - Je;
        } else
          Je = on(Math.round(Ae.initialW - pt), 160, Ut), Mt = on(Math.round(Ae.initialH + Yt), 90, $e), wn = Ae.initialX + Ae.initialW - Je;
      } else if (Ae.corner === "tr") {
        const Ut = be - Ae.initialX, $e = Ae.initialY + Ae.initialH;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ut, Math.round(Ae.initialW + pt))), mt = Math.round(Et / Bt);
          mt > $e && (mt = $e, Et = Math.round(mt * Bt)), mt < 90 && (mt = 90, Et = Math.round(mt * Bt)), Je = Et, Mt = mt, In = Ae.initialY + Ae.initialH - Mt;
        } else
          Je = on(Math.round(Ae.initialW + pt), 160, Ut), Mt = on(Math.round(Ae.initialH - Yt), 90, $e), In = Ae.initialY + Ae.initialH - Mt;
      } else if (Ae.corner === "tl") {
        const Ut = Ae.initialX + Ae.initialW, $e = Ae.initialY + Ae.initialH;
        if (Hn) {
          let Et = Math.max(160, Math.min(Ut, Math.round(Ae.initialW - pt))), mt = Math.round(Et / Bt);
          mt > $e && (mt = $e, Et = Math.round(mt * Bt)), mt < 90 && (mt = 90, Et = Math.round(mt * Bt)), Je = Et, Mt = mt, wn = Ae.initialX + Ae.initialW - Je, In = Ae.initialY + Ae.initialH - Mt;
        } else
          Je = on(Math.round(Ae.initialW - pt), 160, Ut), Mt = on(Math.round(Ae.initialH - Yt), 90, $e), wn = Ae.initialX + Ae.initialW - Je, In = Ae.initialY + Ae.initialH - Mt;
      }
      Ke((Ut) => {
        const $e = [...Ut.keyframes || []], Et = q < $e.length ? q : kt;
        if (!$e[Et]) return Ut;
        const mt = [...$e[Et].layout.placements || []];
        return mt[Ae.index] ? (mt[Ae.index] = {
          ...mt[Ae.index],
          x: wn,
          y: In,
          width: Je,
          height: Mt,
          sourceWidth: Ae.sourceWidth,
          sourceHeight: Ae.sourceHeight,
          nativeAspectRatio: Ae.nativeAspectRatio,
          aspectRatio: Ae.nativeAspectRatio
        }, $e[Et] = {
          ...$e[Et],
          layout: { ...$e[Et].layout, placements: mt }
        }, { ...Ut, keyframes: $e }) : Ut;
      });
    }, lt = () => {
      if (dn.current) {
        const dt = dn.current, Ae = dt.latestW ?? dt.initialW, pt = dt.latestH ?? dt.initialH;
        Ae !== dt.initialW || pt !== dt.initialH ? (hd(), F && Ke((Yt) => (F(Yt), Yt))) : Ns.current = null;
      }
      cs(!1), dn.current = null, window.removeEventListener("mousemove", Qe), window.removeEventListener("mouseup", lt);
    };
    window.addEventListener("mousemove", Qe), window.addEventListener("mouseup", lt);
  }, Fm = i.useCallback((d) => {
    const x = fe[d];
    if (!x) return;
    const A = He.find((he) => he.stationId === x.stationId && he.displayId === x.displayId), q = x.nativeAspectRatio || x.aspectRatio || (A == null ? void 0 : A.nativeAspectRatio) || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 16 / 9);
    let te = x.width, K = Math.round(te / q);
    x.y + K > Ce && (K = Ce - x.y, te = Math.round(K * q)), x.x + te > be && (te = be - x.x, K = Math.round(te / q));
    const oe = fe.map((he, pe) => pe === d ? {
      ...he,
      width: Math.max(160, te),
      height: Math.max(90, K),
      sourceWidth: x.sourceWidth || (A == null ? void 0 : A.sourceWidth) || 1920,
      sourceHeight: x.sourceHeight || (A == null ? void 0 : A.sourceHeight) || 1080,
      nativeAspectRatio: q,
      aspectRatio: q
    } : he);
    rt(oe, "Snap Native Aspect");
  }, [fe, He, rt]), Li = i.useCallback(() => {
    if (Wn.current.length === 0) return;
    const d = lr("Redo State");
    Kt.current.push(d), Kt.current.length > 50 && Kt.current.shift();
    const x = Wn.current.pop();
    x && (Ke(x.timeline), F && F(x.timeline), x.resolutionId && x.resolutionId !== Vt && _r(x.resolutionId), x.aspectId && x.aspectId !== Rt && us(x.aspectId), x.presetId && Tt(x.presetId), x.selectedFeedIndex !== void 0 && Ue(x.selectedFeedIndex), pn.current = !0, Dr((A) => A + 1), Lt(`Undo: ${x.label || "Previous State"}`, "undo", "↺"));
  }, [lr, F, Rt, Lt]), Oi = i.useCallback(() => {
    if (Kt.current.length === 0) return;
    const d = lr("Undo State");
    Wn.current.push(d), Wn.current.length > 50 && Wn.current.shift();
    const x = Kt.current.pop();
    x && (Ke(x.timeline), F && F(x.timeline), x.resolutionId && x.resolutionId !== Vt && _r(x.resolutionId), x.aspectId && x.aspectId !== Rt && us(x.aspectId), x.presetId && Tt(x.presetId), x.selectedFeedIndex !== void 0 && Ue(x.selectedFeedIndex), pn.current = !0, Dr((A) => A + 1), Lt(`Redo: ${x.label || "Restored State"}`, "info", "↻"));
  }, [lr, F, Rt, Lt]), Nd = i.useCallback(() => {
    const x = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(fe)),
      keyframes: JSON.parse(JSON.stringify(ht)),
      aspectId: Rt,
      width: be,
      height: Ce
    }, ...at.filter((A) => A.id !== "preset-quicksave")];
    Zt(x);
    try {
      mm({
        canvasLayoutTimeline: _e,
        selectedAspectId: Rt,
        selectedPresetId: tn,
        isFullWidth: ce
      });
    } catch (A) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", A);
    }
    Lt(`State Saved (${be}×${Ce} • ${fe.length} Feeds)`, "success", "💾");
  }, [fe, ht, Rt, be, Ce, at, Zt, _e, tn, ce, Lt]);
  i.useEffect(() => {
    const d = () => Li(), x = () => Oi(), A = () => Nd();
    return window.addEventListener("itb:studio-undo", d), window.addEventListener("itb:studio-redo", x), window.addEventListener("itb:studio-save-now", A), () => {
      window.removeEventListener("itb:studio-undo", d), window.removeEventListener("itb:studio-redo", x), window.removeEventListener("itb:studio-save-now", A);
    };
  }, [Li, Oi, Nd]);
  const Bm = i.useCallback(() => {
    if (ve) {
      ve();
      return;
    }
    nt((d) => {
      const x = !d;
      if (x) {
        r && r(null);
        const A = ln.current;
        A && A.requestFullscreen && A.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return x;
    });
  }, [ve, r]), kd = i.useCallback(() => {
    const d = m > 0 ? m : h + y, x = bt != null && bt.layout ? JSON.parse(JSON.stringify(bt.layout)) : {
      width: be,
      height: Ce,
      backgroundColor: "#070A10",
      fps: 30,
      utcClockPosition: Bs,
      placements: JSON.parse(JSON.stringify(fe))
    };
    x.utcClockPosition = x.utcClockPosition || Bs;
    const { nextTimeline: A, newIndex: q, isNew: te } = Wh(
      _e,
      d,
      x
    );
    te ? (es("Add Keyframe"), Ke(A), F && F(A), T && T(q), Lt(`Keyframe #${q + 1} created at ${St(d, f, { includeSeconds: !0 })}`, "success", "💎")) : (T && T(q), Lt(`Jumped to existing Keyframe #${q + 1}`, "info", "💎"));
  }, [m, h, y, bt, fe, be, Ce, Bs, _e, F, T, f, Lt, es]), Um = i.useCallback(() => {
    if (ht.length <= 1 || kt === 0) {
      Lt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    es("Delete Keyframe");
    const { nextTimeline: d, success: x, newIndex: A } = Vx(_e, kt);
    x && (Ke(d), F && F(d), T && T(A), Lt("Keyframe deleted", "info", "🗑️"));
  }, [ht, kt, _e, F, T, Lt, es]), Wm = i.useCallback((d) => {
    kt !== 0 && (es("Update Transition Type"), Ke((x) => {
      const A = uu(x, kt, { transitionType: d });
      return F && F(A), A;
    }));
  }, [kt, F, es]), Hm = i.useCallback((d) => {
    kt !== 0 && (es("Update Transition Duration"), Ke((x) => {
      const A = uu(x, kt, { transitionDurationSec: d });
      return F && F(A), A;
    }));
  }, [kt, F, es]), Ur = i.useCallback((d) => {
    if (d < 0 || d >= ht.length) return;
    const x = ht[d];
    if (!x) return;
    if (g && h) {
      const q = Math.max(0, x.timestampEpochMs - h);
      g(q);
    }
    T && T(d);
    const A = St(x.timestampEpochMs, f, { includeSeconds: !0 });
    Lt(`Jumped to Keyframe #${d + 1} (${A})`, "info", "❖");
  }, [ht, h, g, T, f, Lt]), wd = i.useCallback(() => {
    kt > 0 && Ur(kt - 1);
  }, [kt, Ur]), jd = i.useCallback(() => {
    kt < ht.length - 1 && Ur(kt + 1);
  }, [kt, ht.length, Ur]);
  i.useCallback((d) => {
    ye(d);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", d);
    } catch {
    }
    es("Move Clock Position"), Ke((x) => {
      const A = du(x, kt, d);
      return F && F(A), A;
    }), Lt(`Clock moved to ${d} (Keyframe #${kt + 1})`, "info", "⏱️");
  }, [kt, ye, es, F, Lt]), i.useEffect(() => {
    const d = (x) => {
      if (!(x.target.tagName === "INPUT" || x.target.tagName === "TEXTAREA" || x.target.isContentEditable)) {
        if (x.key === "Delete" || x.key === "Backspace") {
          xe >= 0 && fe[xe] && (x.preventDefault(), qo(xe));
          return;
        }
        if ((x.code === "Space" || x.key === " ") && I) {
          x.preventDefault(), V == null || V("timeline"), I((A) => !A);
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
          Ie(!1), Ye(!1), It(!1), H(!1), _t(!1), ut(!1), Qt(!1), W(!1), me(!1), Ue(null), V == null || V("timeline");
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(x.key)) {
          if (x.ctrlKey || x.altKey || x.metaKey)
            return;
          if ((G === "canvas" || yt && xe !== null) && xe !== null && xe >= 0 && fe[xe]) {
            x.preventDefault(), pn.current = !0, Tt("custom");
            const q = x.shiftKey ? 20 : 5;
            let te = 0, K = 0;
            x.key === "ArrowLeft" && (te = -q), x.key === "ArrowRight" && (te = q), x.key === "ArrowUp" && (K = -q), x.key === "ArrowDown" && (K = q);
            const oe = fe[xe], he = on(oe.x + te, 0, be - oe.width), pe = on(oe.y + K, 0, Ce - oe.height), we = fe.map((Qe, lt) => lt === xe ? { ...Qe, x: he, y: pe } : Qe);
            rt(we);
            return;
          }
        }
        if ((x.key === "r" || x.key === "R") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), Fs((A) => !A);
          return;
        }
        if ((x.key === "s" || x.key === "S") && !x.ctrlKey && !x.metaKey && !x.altKey) {
          x.preventDefault(), Gl((A) => !A);
          return;
        }
      }
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [xe, fe, qo, rt, Fs, Gl]);
  const Cd = i.useMemo(() => zx({
    keyframes: ht,
    currentEpochMs: z,
    currentPlacements: fe,
    isEditing: vn || qn
  }), [vn, qn, ht, z, fe]), zm = i.useMemo(() => Cd.map((d, x) => ({ ...d, originalIndex: x })).sort((d, x) => (d.zIndex ?? d.originalIndex) - (x.zIndex ?? x.originalIndex)), [Cd]), Km = i.useMemo(() => Zx(fe, {
    maxConcurrentDecoders: wm,
    activeAudioStationId: Ne,
    selectedFeedIndex: xe
  }), [fe, Ne, xe]), ir = fe[xe] || null, { filteredPlaced: cr, filteredUnplaced: ta } = i.useMemo(() => {
    const d = (gt || "").toLowerCase(), x = fe.map((K, oe) => {
      const he = K.zIndex ?? oe + 1, pe = He.find((we) => we.stationId === K.stationId && we.displayId === K.displayId);
      return {
        type: "placed",
        origIdx: oe,
        placement: K,
        feed: pe,
        stationId: K.stationId,
        displayId: K.displayId,
        label: K.label || (pe == null ? void 0 : pe.label) || `${K.stationId} (${K.displayId})`,
        layerRank: he,
        isSelected: oe === xe,
        sourceWidth: K.sourceWidth || (pe == null ? void 0 : pe.sourceWidth) || 1920,
        sourceHeight: K.sourceHeight || (pe == null ? void 0 : pe.sourceHeight) || 1080
      };
    });
    x.sort((K, oe) => oe.layerRank - K.layerRank);
    const A = He.filter((K) => !fe.some((oe) => oe.stationId === K.stationId && oe.displayId === K.displayId)).map((K) => ({
      type: "unplaced",
      feed: K,
      stationId: K.stationId,
      displayId: K.displayId,
      label: K.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: K.sourceWidth || 1920,
      sourceHeight: K.sourceHeight || 1080
    })), q = d ? x.filter((K) => K.label.toLowerCase().includes(d)) : x, te = d ? A.filter((K) => K.label.toLowerCase().includes(d)) : A;
    return { filteredPlaced: q, filteredUnplaced: te };
  }, [fe, He, xe, gt]), Ed = i.useCallback((d, x) => {
    d.stopPropagation(), Q(x), d.dataTransfer.effectAllowed = "copyMove", d.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: x.origIdx,
      type: x.type,
      stationId: x.stationId,
      displayId: x.displayId
    }));
  }, []), Vm = i.useCallback((d, x) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer.dropEffect = "move";
    const A = d.currentTarget.getBoundingClientRect(), q = A.top + A.height / 2, te = d.clientY < q ? "above" : "below";
    Z((K) => K.index === x && K.position === te ? K : { index: x, position: te });
  }, []), Ym = i.useCallback((d, x) => {
    d.stopPropagation(), Z((A) => A.index === x ? { index: null, position: null } : A);
  }, []), Sd = i.useCallback(() => {
    Q(null), Z({ index: null, position: null });
  }, []), Xm = i.useCallback((d, x) => {
    d.preventDefault(), d.stopPropagation();
    const A = D;
    Z({ index: null, position: null }), Q(null);
    const q = d.dataTransfer.getData("text/plain");
    if (q)
      try {
        const te = JSON.parse(q);
        if (te.type === "placed") {
          const K = te.origIdx, oe = cr.findIndex((dt) => dt.origIdx === K);
          if (oe === -1) return;
          let he = x;
          if (A.position === "below" && (he += 1), oe < he && (he -= 1), oe === he) return;
          const pe = [...cr], [we] = pe.splice(oe, 1);
          pe.splice(he, 0, we);
          const Qe = pe.length, lt = fe.map((dt, Ae) => {
            const pt = pe.findIndex((Yt) => Yt.origIdx === Ae);
            return pt !== -1 ? {
              ...dt,
              zIndex: Qe - pt
            } : dt;
          });
          rt(lt), Ue(we.origIdx);
        } else if (te.type === "unplaced") {
          const K = He.find((Bt) => Bt.stationId === te.stationId && Bt.displayId === te.displayId);
          if (!K) return;
          const oe = K.nativeAspectRatio || (K.sourceWidth && K.sourceHeight ? K.sourceWidth / K.sourceHeight : 16 / 9), he = oe >= 1 ? 640 : Math.round(360 * oe), pe = oe >= 1 ? Math.round(640 / oe) : 360, we = Kn[fe.length % Kn.length];
          let Qe = x;
          A.position === "below" && (Qe += 1);
          const lt = {
            stationId: K.stationId,
            displayId: K.displayId,
            label: K.label,
            x: 100 + fe.length * 40 % 800,
            y: 80 + fe.length * 40 % 500,
            width: he,
            height: pe,
            sourceWidth: K.sourceWidth || 1920,
            sourceHeight: K.sourceHeight || 1080,
            nativeAspectRatio: oe,
            aspectRatio: oe,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: we,
            shadowEffect: "deep",
            borderRadius: 0
          }, dt = [...fe, lt], Ae = dt.length - 1, pt = [...cr];
          pt.splice(Qe, 0, { origIdx: Ae });
          const Yt = pt.length, Hn = dt.map((Bt, wn) => {
            const In = pt.findIndex((Je) => Je.origIdx === wn);
            return {
              ...Bt,
              zIndex: In !== -1 ? Yt - In : 1
            };
          });
          rt(Hn), Ue(Ae);
        }
      } catch (te) {
        console.warn("Failed to handle layer drag drop:", te);
      }
  }, [D, cr, fe, He, rt]), Gm = i.useCallback((d) => {
    d.preventDefault();
    const x = d.dataTransfer.getData("text/plain");
    if (!(!x || !Ct.current))
      try {
        const A = JSON.parse(x), q = Ct.current.getBoundingClientRect(), te = d.clientX - q.left, K = d.clientY - q.top, oe = on(Math.round(te / q.width * be), 0, be - 320), he = on(Math.round(K / q.height * Ce), 0, Ce - 180);
        if (A.type === "unplaced") {
          if (fe.length >= 6) {
            alert("Maximum concurrent studio playback screens reached (Hard cap: 6 screens). Please remove or replace a screen.");
            return;
          }
          const pe = He.find((we) => we.stationId === A.stationId && we.displayId === A.displayId);
          if (pe) {
            const we = pe.nativeAspectRatio || (pe.sourceWidth && pe.sourceHeight ? pe.sourceWidth / pe.sourceHeight : 1.7777777777777777), Qe = we >= 1 ? 640 : Math.round(360 * we), lt = we >= 1 ? Math.round(640 / we) : 360, dt = fe.length > 0 ? Math.max(...fe.map((Hn) => Hn.zIndex || 0)) + 1 : 1, Ae = Kn[fe.length % Kn.length], pt = {
              stationId: pe.stationId,
              displayId: pe.displayId,
              label: pe.label,
              x: on(oe, 0, be - Qe),
              y: on(he, 0, Ce - lt),
              width: Qe,
              height: lt,
              sourceWidth: pe.sourceWidth || 1920,
              sourceHeight: pe.sourceHeight || 1080,
              nativeAspectRatio: we,
              aspectRatio: we,
              zIndex: dt,
              rotation: 0,
              borderWidth: 2,
              borderColor: Ae,
              shadowEffect: "deep",
              borderRadius: 0
            }, Yt = [...fe, pt];
            rt(Yt), Ue(Yt.length - 1);
          }
        } else if (A.type === "placed" && A.origIdx !== void 0) {
          const pe = fe.map((we, Qe) => Qe === A.origIdx ? {
            ...we,
            x: on(oe, 0, be - we.width),
            y: on(he, 0, Ce - we.height)
          } : we);
          rt(pe), Ue(A.origIdx);
        }
      } catch (A) {
        console.warn("Canvas drop failed:", A);
      }
  }, [He, fe, rt, be, Ce]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: ln,
      className: `multicam-viewport-root canvas-grid ${jt ? "fullscreen-grid-active" : ""}`,
      children: [
        (vn || qn) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: vn ? "grabbing" : "nwse-resize",
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
            ref: fn,
            className: `canvas-stage-wrapper ${ce ? "is-full-width-mode" : "is-fit-stage-mode"}`,
            onClick: (d) => {
              var x, A;
              (d.target === fn.current || (A = (x = d.target) == null ? void 0 : x.classList) != null && A.contains("canvas-stage-wrapper")) && (Ue(null), me(!1), V == null || V("timeline"));
            },
            children: [
              Wt && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                      fe.length,
                      " on canvas"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => It(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Filter workstations / displays...",
                    value: gt,
                    onChange: (d) => ct(d.target.value)
                  }
                ) }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                  cr.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: cr.length })
                    ] }),
                    cr.map((d, x) => {
                      const A = wt && wt.type === "placed" && wt.origIdx === d.origIdx, te = D.index === x ? D.position === "above" ? "drop-above" : "drop-below" : "";
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row ${d.isSelected ? "is-selected" : ""} ${A ? "is-dragging-row" : ""} ${te}`,
                          draggable: !0,
                          onDragStart: (K) => Ed(K, d),
                          onDragOver: (K) => Vm(K, x),
                          onDragLeave: (K) => Ym(K, x),
                          onDrop: (K) => Xm(K, x),
                          onDragEnd: Sd,
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
                            /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (K) => K.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => xd(d.origIdx),
                                  title: "Bring Forward (Layer +1)",
                                  children: "⬆️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => yd(d.origIdx),
                                  title: "Send Backward (Layer -1)",
                                  children: "⬇️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-remove-row",
                                  onClick: () => qo(d.origIdx),
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
                  ta.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: ta.length })
                    ] }),
                    ta.map((d) => {
                      const x = wt && wt.type === "unplaced" && wt.stationId === d.stationId && wt.displayId === d.displayId;
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row unplaced ${x ? "is-dragging-row" : ""}`,
                          draggable: !0,
                          onDragStart: (A) => Ed(A, d),
                          onDragEnd: Sd,
                          onClick: () => md(d.feed),
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
                                onClick: () => md(d.feed),
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
                  cr.length === 0 && ta.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => ar("auto"), children: "⊞ ADD ALL FEEDS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: gd, children: "🗑️ CLEAR CANVAS" })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
                /* @__PURE__ */ s.jsxs("aside", { className: `canvas-left-wing-dock ${ne || de || ke ? "has-active-popout" : ""}`, children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Wt ? "active" : ""}`,
                      onClick: () => It((d) => !d),
                      title: `Feeds & Layers Palette (${fe.length}/${He.length} on canvas)`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: fe.length }),
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
                        className: `btn-wing-tool ${ne ? "active" : ""}`,
                        onClick: () => {
                          se((d) => !d), De(!1);
                        },
                        title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                        ]
                      }
                    ),
                    ne && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "LAYOUT PRESETS" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => se(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${tn === "auto-grid" ? "active" : ""}`,
                          onClick: () => {
                            Tt("auto-grid"), ar("auto-grid"), se(!1);
                          },
                          children: [
                            /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                            /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                              const d = new Set((t && t.length > 0 ? t : n).map((q) => q.id)), x = (fe || []).filter((q) => d.has(q.stationId)), A = (t && t.length > 0 ? t : n).filter((q) => !x.some((te) => te.stationId === q.id));
                              return x.length > 0 ? x.length + A.length : Oe.length;
                            })() })
                          ]
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${tn === "1x1" ? "active" : ""}`,
                          onClick: () => {
                            Tt("1x1"), ar("1x1"), se(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${tn === "1x2" ? "active" : ""}`,
                          onClick: () => {
                            Tt("1x2"), ar("1x2"), se(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${tn === "2x2" ? "active" : ""}`,
                          onClick: () => {
                            Tt("2x2"), ar("2x2"), se(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${tn === "1+3-pip" ? "active" : ""}`,
                          onClick: () => {
                            Tt("1+3-pip"), ar("1+3-pip"), se(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${tn === "hero-stacked" ? "active" : ""}`,
                          onClick: () => {
                            Tt("hero-stacked"), ar("hero-stacked"), se(!1);
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
                        className: `btn-wing-tool ${ke ? "active" : ""}`,
                        onClick: () => {
                          Xe((d) => !d), De(!1), se(!1);
                        },
                        title: `Canvas Resolution: ${Vt === Us ? `Custom (${be}×${Ce}px)` : Vt} (${be}×${Ce}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📺" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", style: Vt === Us ? { fontSize: "7px" } : void 0, children: Vt === Us ? "CUSTOM" : Vt })
                        ]
                      }
                    ),
                    ke && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout resolution-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "CANVAS RESOLUTION" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Xe(!1), children: "✕" })
                      ] }),
                      Pa.map((d) => {
                        const x = hr(d.id, Rt, gn);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${Vt === d.id ? "active" : ""}`,
                            onClick: () => {
                              $m(d.id), Xe(!1);
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
                          Vt === Us && /* @__PURE__ */ s.jsx("span", { className: "custom-active-tag", children: "ACTIVE" })
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
                                value: rr,
                                onChange: (d) => Br(d.target.value),
                                onKeyDown: (d) => {
                                  d.key === "Enter" && Ti();
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
                                value: cl,
                                onChange: (d) => ql(d.target.value),
                                onKeyDown: (d) => {
                                  d.key === "Enter" && Ti();
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
                        className: `btn-wing-tool ${de ? "active" : ""}`,
                        onClick: () => {
                          De((d) => !d), Xe(!1), se(!1);
                        },
                        title: `Aspect Ratio: ${Rt} (${be}×${Ce}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Rt })
                        ]
                      }
                    ),
                    de && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "popout-title", children: "CANVAS ASPECT" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => De(!1), children: "✕" })
                      ] }),
                      Ws.map((d) => {
                        const x = hr(Vt, d.id);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${Rt === d.id ? "active" : ""}`,
                            onClick: () => {
                              Am(d.id), De(!1);
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
                      onClick: Re,
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
                      className: `btn-wing-tool ${Xl ? "active" : ""}`,
                      onClick: () => Gl((d) => !d),
                      title: Xl ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                      className: `btn-wing-tool ${en ? "active" : ""}`,
                      onClick: () => Fs((d) => !d),
                      title: en ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                      disabled: Wn.current.length === 0,
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
                      disabled: Kt.current.length === 0,
                      title: "Redo (Ctrl+Y)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↻" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "REDO" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: `canvas-viewport-with-rulers ${en ? "has-rulers" : ""}`, children: [
                  en && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-top-row", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${be}×${Ce}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Ln.isInside ? `${Ln.x},${Ln.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        className: "canvas-ruler-top-bar",
                        style: {
                          width: Xt.width > 180 ? `${Xt.width}px` : "100%"
                        },
                        children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-x",
                            viewBox: `0 0 ${be} 18`,
                            preserveAspectRatio: "none",
                            children: [
                              ir && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: ir.x,
                                  y: "0",
                                  width: ir.width,
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
                    en && /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        className: "canvas-ruler-left-bar",
                        style: {
                          height: Xt.height > 100 ? `${Xt.height}px` : "auto"
                        },
                        children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-y",
                            viewBox: `0 0 20 ${Ce}`,
                            preserveAspectRatio: "none",
                            children: [
                              ir && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: "0",
                                  y: ir.y,
                                  width: "20",
                                  height: ir.height,
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              Te.map((d) => d.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
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
                          Ct.current = d, nr.current = d;
                        },
                        className: `canvas-master-frame-16-9 ${ce ? "is-full-width" : "is-fit-stage"}`,
                        style: {
                          width: Xt.width > 180 ? `${Xt.width}px` : "100%",
                          height: Xt.height > 100 ? `${Xt.height}px` : "auto",
                          aspectRatio: `${be} / ${Ce}`
                        },
                        onMouseMove: We,
                        onMouseLeave: Ge,
                        onDragOver: (d) => {
                          d.preventDefault(), d.dataTransfer.dropEffect = "copy";
                        },
                        onDrop: Gm,
                        onClick: (d) => {
                          var x, A, q, te, K, oe;
                          (d.target === Ct.current || (A = (x = d.target) == null ? void 0 : x.classList) != null && A.contains("canvas-master-frame-16-9") || (te = (q = d.target) == null ? void 0 : q.classList) != null && te.contains("corner-accent") || (oe = (K = d.target) == null ? void 0 : K.classList) != null && oe.contains("canvas-work-surface")) && (Ue(null), me(!1), V == null || V("timeline"));
                        },
                        children: [
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                          /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                          tr && /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "canvas-snap-ghost-preview",
                              style: {
                                position: "absolute",
                                left: `${tr.x / be * 100}%`,
                                top: `${tr.y / Ce * 100}%`,
                                width: `${tr.width / be * 100}%`,
                                height: `${tr.height / Ce * 100}%`,
                                zIndex: 9990,
                                pointerEvents: "none"
                              },
                              children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                                /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                                /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: tr.label })
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
                          fe.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                            /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                            /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                            /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                            /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => It(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => ar("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                            ] })
                          ] }),
                          zm.map((d) => {
                            var Ut;
                            const x = d.originalIndex, A = xe === x, q = vn && xe === x, te = qn && xe === x, K = (n.length > 0 ? n : t).find(
                              ($e) => {
                                var Et, mt, ur, $s;
                                return $e.id === d.stationId || ((Et = $e.hostname) == null ? void 0 : Et.toLowerCase()) === ((mt = d.stationId) == null ? void 0 : mt.toLowerCase()) || ((ur = $e.id) == null ? void 0 : ur.toLowerCase()) === (($s = d.stationId) == null ? void 0 : $s.toLowerCase());
                              }
                            ), oe = He.find(($e) => $e.stationId === d.stationId && $e.displayId === d.displayId), he = K || {
                              id: d.stationId,
                              hostname: (oe == null ? void 0 : oe.stationHostname) || d.stationHostname || d.stationId,
                              displayName: (oe == null ? void 0 : oe.stationName) || d.label || d.stationId,
                              displays: oe ? [{ displayId: oe.displayId, width: oe.sourceWidth, height: oe.sourceHeight }] : []
                            }, pe = (he == null ? void 0 : he.displays) || ((Ut = he == null ? void 0 : he.topology) == null ? void 0 : Ut.displays) || [], we = fe.filter(
                              ($e) => $e.stationId === d.stationId || he && ($e.stationId === he.id || $e.stationId === he.hostname)
                            ), Qe = pe.length > 1 && we.length >= pe.length, lt = d.borderColor || Kn[x % Kn.length], dt = d.borderWidth !== void 0 ? d.borderWidth : 2, Ae = d.rotation || 0, pt = d.shadowEffect || "deep", Yt = d.borderRadius || 0, Hn = d.x / be * 100, Bt = d.y / Ce * 100, wn = d.width / be * 100, In = d.height / Ce * 100, Je = ny(pt, A, lt);
                            d.y < 50, d.x < 100, d.x + d.width > be - 100;
                            const Mt = d.zIndex !== void 0 ? d.zIndex : x + 1;
                            return /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: `canvas-feed-card-box ${A ? "is-selected" : ""} ${q ? "is-dragging" : ""} ${te ? "is-resizing" : ""}`,
                                style: {
                                  position: "absolute",
                                  left: `${Hn}%`,
                                  top: `${Bt}%`,
                                  width: `${wn}%`,
                                  height: `${In}%`,
                                  zIndex: q || te ? 2e3 : A ? 1e3 + Mt * 10 : Mt * 10,
                                  transformOrigin: "center center",
                                  border: `${dt}px solid ${lt}`,
                                  borderRadius: `${Yt}px`,
                                  boxShadow: Je,
                                  opacity: d.opacity !== void 0 ? d.opacity : 1,
                                  pointerEvents: d.opacity !== void 0 && d.opacity < 0.1 ? "none" : "auto",
                                  cursor: q ? "grabbing" : "grab",
                                  transition: q || te || Or.current ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                                },
                                onMouseDown: ($e) => Ri($e, x),
                                onContextMenu: ($e) => {
                                  $e.preventDefault(), $e.stopPropagation(), Ue(x), me(!0), V == null || V("canvas");
                                },
                                onClick: ($e) => {
                                  $e.stopPropagation(), Ue(x), V == null || V("canvas");
                                },
                                children: [
                                  /* @__PURE__ */ s.jsxs(
                                    "div",
                                    {
                                      className: "box-header-badge",
                                      onMouseDown: ($e) => Ri($e, x),
                                      onDoubleClick: () => Ai(x),
                                      title: "Click and drag to move window (Double-click to expand 1x1)",
                                      children: [
                                        /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                          /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                          /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                          ee === x ? /* @__PURE__ */ s.jsxs(
                                            "span",
                                            {
                                              className: "badge-title-edit-container",
                                              onClick: ($e) => $e.stopPropagation(),
                                              onMouseDown: ($e) => $e.stopPropagation(),
                                              onDoubleClick: ($e) => $e.stopPropagation(),
                                              children: [
                                                /* @__PURE__ */ s.jsx(
                                                  "input",
                                                  {
                                                    ref: tt,
                                                    type: "text",
                                                    className: "badge-title-input",
                                                    value: Ee,
                                                    placeholder: `${he.displayName || d.stationId} (${d.displayId})`,
                                                    onChange: ($e) => Fe($e.target.value),
                                                    onKeyDown: ($e) => {
                                                      $e.stopPropagation(), $e.key === "Enter" ? ($e.preventDefault(), $i(x)) : $e.key === "Escape" && ($e.preventDefault(), ue(null));
                                                    },
                                                    onBlur: () => $i(x)
                                                  }
                                                ),
                                                /* @__PURE__ */ s.jsx(
                                                  "button",
                                                  {
                                                    type: "button",
                                                    className: "btn-edit-title is-saving",
                                                    onClick: ($e) => {
                                                      $e.stopPropagation(), $i(x);
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
                                                onDoubleClick: ($e) => {
                                                  $e.stopPropagation(), ue(x), Fe(d.label || "");
                                                },
                                                title: "Double-click to rename screen (burned into video)",
                                                children: d.label || `${he.displayName || d.stationId} (${d.displayId})`
                                              }
                                            ),
                                            /* @__PURE__ */ s.jsx(
                                              "button",
                                              {
                                                type: "button",
                                                className: "btn-edit-title",
                                                onClick: ($e) => {
                                                  $e.stopPropagation(), ue(x), Fe(d.label || "");
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
                                            className: `badge-focus-nudge ${G === "canvas" ? "is-focused" : "is-idle"}`,
                                            onClick: ($e) => {
                                              $e.stopPropagation(), V == null || V(G === "canvas" ? "timeline" : "canvas");
                                            },
                                            title: G === "canvas" ? "Screen focused: Arrow keys nudge position (Shift: 20px, Normal: 5px). Click timeline or press Esc for Playhead scrubbing." : "Playhead focused: Arrow keys scrub timeline. Click to enable Arrow key screen nudging.",
                                            children: G === "canvas" ? "🎯 NUDGE [◀▲▼▶]" : "⏱️ PLAYHEAD"
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
                                          Ae !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                            "📐",
                                            Ae,
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
                                            className: `btn-badge-action-inspector ${A && yt ? "active" : ""}`,
                                            onClick: ($e) => {
                                              $e.stopPropagation(), Ue(x), me((Et) => !Et || xe !== x);
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
                                          transform: Ae ? `rotate(${Ae}deg)` : void 0,
                                          transformOrigin: "center center",
                                          transition: q ? "none" : "transform 0.2s ease-out"
                                        },
                                        children: /* @__PURE__ */ s.jsx(
                                          Dx,
                                          {
                                            station: he,
                                            isSolo: !1,
                                            currentEpochMs: z,
                                            timeMode: f,
                                            isPlaying: v,
                                            setIsPlaying: I,
                                            baseEpochMs: h,
                                            totalDurationMs: S,
                                            outPointMs: w,
                                            setPlayheadMs: g,
                                            globalGaps: k,
                                            onOpenSpotlight: l,
                                            onSelectActiveStation: null,
                                            recordingSegments: b,
                                            playbackSpeed: C,
                                            activeAudioStationId: Ne,
                                            onSoloAudio: Pe,
                                            directorPlan: $ || (he == null ? void 0 : he.directorPlan),
                                            isAutoDirectorEnabled: c ? c[he.id] ?? !0 : !0,
                                            stationsCount: t.length,
                                            onDeselectStation: a,
                                            targetDisplayId: d.displayId,
                                            onSelectDisplayId: ($e) => {
                                              if (c ? c[he.id] ?? !0 : !0) return;
                                              const mt = fe.map((ur, $s) => $s === x ? { ...ur, displayId: $e } : ur);
                                              rt(mt);
                                            },
                                            areAllDisplaysPlaced: Qe,
                                            slotIndex: x,
                                            borderColor: lt,
                                            isDecoderAllowed: Km[x] ?? !0,
                                            maxHeight: qx(
                                              Math.round((d.width || 1920) * (((Xt == null ? void 0 : Xt.width) || 960) / be)),
                                              Math.round((d.height || 1080) * (((Xt == null ? void 0 : Xt.height) || 540) / Ce))
                                            )
                                          }
                                        )
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      Nm,
                                      {
                                        currentEpochMs: z,
                                        keystrokes: p,
                                        keystrokeMode: N,
                                        targetStationId: d.stationId || (he == null ? void 0 : he.id) || (he == null ? void 0 : he.hostname),
                                        targetDisplayId: d.displayId,
                                        displays: pe,
                                        directorPlan: $ || (he == null ? void 0 : he.directorPlan)
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "card-drag-surface",
                                        onMouseDown: ($e) => Ri($e, x),
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
                                        onMouseDown: ($e) => ea($e, x, "tl"),
                                        title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Hr(d.sourceWidth, d.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-tr",
                                        onMouseDown: ($e) => ea($e, x, "tr"),
                                        title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Hr(d.sourceWidth, d.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-bl",
                                        onMouseDown: ($e) => ea($e, x, "bl"),
                                        title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Hr(d.sourceWidth, d.sourceHeight)})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: "resize-handle-corner resize-handle-br",
                                        onMouseDown: ($e) => ea($e, x, "br"),
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
                          !B && yt && xe !== null && ir && (() => {
                            const d = ir, x = xe, A = d.borderColor || Kn[x % Kn.length], q = d.borderWidth !== void 0 ? d.borderWidth : 2, te = d.rotation || 0, K = d.shadowEffect || "deep", oe = d.zIndex !== void 0 ? d.zIndex : x + 1, he = d.x / be * 100, pe = d.width / be * 100, we = he + pe / 2;
                            let Qe = `${we}%`, lt = "translateX(-50%)";
                            we < 28 ? (Qe = `${Math.max(1, he)}%`, lt = "none") : we > 72 && (Qe = `${Math.min(99, he + pe)}%`, lt = "translateX(-100%)");
                            let dt;
                            const Ae = d.y < 38;
                            Ae ? dt = `${(d.y + 26) / Ce * 100}%` : dt = `calc(${d.y / Ce * 100}% - 34px)`;
                            const pt = d.y / Ce > 0.6, Yt = Ae || d.y / Ce < 0.15, Hn = pt && !Yt, Bt = we > 65 || he + pe > 75, wn = (n.length > 0 ? n : t).find(
                              (Je) => {
                                var Mt, Ut;
                                return Je.id === d.stationId || ((Mt = Je.hostname) == null ? void 0 : Mt.toLowerCase()) === ((Ut = d.stationId) == null ? void 0 : Ut.toLowerCase());
                              }
                            ), In = wn ? wn.id : d.stationId;
                            return /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: "floating-feed-inspector compact-hud-inspector",
                                style: {
                                  position: "absolute",
                                  left: Qe,
                                  top: dt,
                                  transform: lt,
                                  zIndex: 4500
                                },
                                onMouseDown: (Je) => Je.stopPropagation(),
                                onClick: (Je) => Je.stopPropagation(),
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
                                        value: st,
                                        placeholder: `${(wn == null ? void 0 : wn.displayName) || d.stationId} (${d.displayId})`,
                                        onChange: (Je) => vt(Je.target.value),
                                        onKeyDown: (Je) => {
                                          Je.key === "Enter" && (Je.preventDefault(), Zo(xe, st));
                                        },
                                        onBlur: () => {
                                          Zo(xe, st);
                                        },
                                        title: "Rename screen feed (displayed on canvas and burned into exported video)"
                                      }
                                    )
                                  ] }),
                                  /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", ref: yn, children: [
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: "btn-mini-tool color-swatch-trigger",
                                        onClick: () => Qt((Je) => !Je),
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
                                    Gt && /* @__PURE__ */ s.jsx(
                                      "div",
                                      {
                                        className: `compact-color-palette-popover ${Hn ? "open-upwards" : "open-downwards"} ${Bt ? "align-right" : "align-left"}`,
                                        onClick: (Je) => Je.stopPropagation(),
                                        onMouseDown: (Je) => Je.stopPropagation(),
                                        children: ty.map((Je) => /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: `btn-color-dot ${A === Je ? "is-active" : ""}`,
                                            style: { backgroundColor: Je === "transparent" ? "#1E293B" : Je },
                                            onClick: () => {
                                              eo({ borderColor: Je }), Qt(!1);
                                            },
                                            title: Je === "transparent" ? "No Border (Transparent)" : `Border Color: ${Je}`
                                          },
                                          Je
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
                                        const Je = [0, 2, 4, 8], Mt = Je[(Je.indexOf(q) + 1) % Je.length];
                                        eo({ borderWidth: Mt });
                                      },
                                      title: `Border Width: ${q}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                                      children: [
                                        "📏 ",
                                        q,
                                        "px"
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: `btn-mini-tool ${K !== "none" ? "highlight-glow" : ""}`,
                                      onClick: () => {
                                        const Je = ["none", "deep", "glow-cyan", "glow-emerald"], Mt = Je[(Je.indexOf(K) + 1) % Je.length];
                                        eo({ shadowEffect: Mt });
                                      },
                                      title: `Shadow Effect: ${K} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`,
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
                                      onClick: () => Lm(90),
                                      title: `Rotate: Step 90° clockwise (Current: ${te}°)`,
                                      children: "↺ 90°"
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "btn-mini-tool highlight",
                                      onClick: () => Fm(x),
                                      title: `Snap to Native Recorded Aspect (${Hr(d.sourceWidth, d.sourceHeight)})`,
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
                                      onClick: () => qo(x),
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
                                        Ue(null), me(!1);
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
                            Px,
                            {
                              currentEpochMs: z,
                              position: Bs,
                              onPositionChange: (d) => {
                                ye(d);
                                try {
                                  localStorage.setItem("itb_canvas_utc_clock_pos", d);
                                } catch {
                                }
                                es("Move Clock Position"), Ke((x) => {
                                  const A = du(x, kt, d);
                                  return F && F(A), A;
                                }), Lt(`Clock moved to ${d} (Keyframe #${kt + 1})`, "info", "⏱️");
                              }
                            }
                          ),
                          /* @__PURE__ */ s.jsx(_x, {}),
                          /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-stage-hud", onClick: (d) => d.stopPropagation(), children: [
                            /* @__PURE__ */ s.jsxs("div", { className: "hud-main-cluster", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "hud-btn hud-prev-kf",
                                  disabled: kt <= 0,
                                  onClick: (d) => {
                                    d.stopPropagation(), wd();
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
                                  onClick: (d) => {
                                    d.stopPropagation(), Ye((x) => !x), Ie(!1);
                                  },
                                  title: "Keyframe Navigator: Click to inspect and jump across keyframes",
                                  children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-diamond", children: "❖" }),
                                    /* @__PURE__ */ s.jsxs("span", { className: "hud-kf-num", children: [
                                      "KF ",
                                      kt + 1,
                                      "/",
                                      ht.length
                                    ] }),
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-kf-time", children: St((bt == null ? void 0 : bt.timestampEpochMs) || z, f, { includeSeconds: !0 }) }),
                                    /* @__PURE__ */ s.jsx("span", { className: "hud-caret", children: "▾" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "hud-btn hud-next-kf",
                                  disabled: kt >= ht.length - 1,
                                  onClick: (d) => {
                                    d.stopPropagation(), jd();
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
                                    d.stopPropagation(), kd();
                                  },
                                  title: "Add Layout Keyframe at Playhead (K)",
                                  children: "+ KF"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `hud-btn hud-settings-kf ${Se ? "active" : ""}`,
                                  onClick: (d) => {
                                    d.stopPropagation(), Ie((x) => !x), Ye(!1);
                                  },
                                  title: "Keyframe Settings Inspector",
                                  children: "⚙"
                                }
                              )
                            ] }),
                            Ze && /* @__PURE__ */ s.jsxs("div", { className: "hud-stage-dropdown", onClick: (d) => d.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "hud-drop-header", children: [
                                /* @__PURE__ */ s.jsxs("span", { children: [
                                  "KEYFRAME NAVIGATOR (",
                                  ht.length,
                                  ")"
                                ] }),
                                /* @__PURE__ */ s.jsx("button", { type: "button", className: "hud-drop-close", onClick: () => Ye(!1), children: "✕" })
                              ] }),
                              /* @__PURE__ */ s.jsx("div", { className: "hud-drop-items", children: ht.map((d, x) => {
                                var pe, we, Qe;
                                const A = x === kt, q = St(d.timestampEpochMs, f, { includeSeconds: !0 }), te = Math.max(0, (d.timestampEpochMs - h) / 1e3).toFixed(1), K = d.utcClockPosition || ((pe = d.layout) == null ? void 0 : pe.utcClockPosition) || "top-right", oe = ((Qe = (we = d.layout) == null ? void 0 : we.placements) == null ? void 0 : Qe.length) || 0, he = x === 0 ? "Root" : `${d.transitionType || "smooth"} (${d.transitionDurationSec ?? 0.5}s)`;
                                return /* @__PURE__ */ s.jsxs(
                                  "div",
                                  {
                                    className: `hud-drop-row ${A ? "is-active" : ""}`,
                                    onClick: () => {
                                      Ur(x), Ye(!1);
                                    },
                                    title: `Seek to Keyframe #${x + 1} at ${q}`,
                                    children: [
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-diamond", children: [
                                        "❖ #",
                                        x + 1
                                      ] }),
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-time", children: [
                                        q,
                                        " (+",
                                        te,
                                        "s)"
                                      ] }),
                                      /* @__PURE__ */ s.jsxs("span", { className: "row-meta", children: [
                                        "⏱️ ",
                                        K,
                                        " • 🖥️ ",
                                        oe,
                                        " • ",
                                        he
                                      ] })
                                    ]
                                  },
                                  d.id || x
                                );
                              }) })
                            ] }),
                            Se && /* @__PURE__ */ s.jsxs("div", { className: "hud-stage-settings-popover", onClick: (d) => d.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "settings-header", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-settings-nav",
                                    disabled: kt <= 0,
                                    onClick: () => Ur(kt - 1),
                                    title: "Previous Keyframe ([ or Alt+Left)",
                                    children: "◀"
                                  }
                                ),
                                /* @__PURE__ */ s.jsxs("span", { className: "settings-title", children: [
                                  "💎 KEYFRAME #",
                                  kt + 1,
                                  " of ",
                                  ht.length
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-settings-nav",
                                    disabled: kt >= ht.length - 1,
                                    onClick: () => Ur(kt + 1),
                                    title: "Next Keyframe (] or Alt+Right)",
                                    children: "▶"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-settings-close", onClick: () => Ie(!1), children: "✕" })
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "settings-body", children: [
                                kt > 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                  /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "INCOMING TRANSITION" }),
                                    /* @__PURE__ */ s.jsx("div", { className: "btn-group", children: ["smooth", "linear", "cut"].map((d) => /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-choice ${((bt == null ? void 0 : bt.transitionType) || "smooth") === d ? "is-active" : ""}`,
                                        onClick: () => Wm(d),
                                        children: d === "smooth" ? "⚡ Smooth" : d === "linear" ? "↗ Linear" : "✂ Cut"
                                      },
                                      d
                                    )) })
                                  ] }),
                                  (bt == null ? void 0 : bt.transitionType) !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "settings-section", children: [
                                    /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "DURATION" }),
                                    /* @__PURE__ */ s.jsx("div", { className: "btn-group", children: [0.2, 0.5, 1, 1.5, 2].map((d) => /* @__PURE__ */ s.jsxs(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-choice ${((bt == null ? void 0 : bt.transitionDurationSec) ?? 0.5) === d ? "is-active" : ""}`,
                                        onClick: () => Hm(d),
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
                                  /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "ACTIVE COMPOSITION" }),
                                  /* @__PURE__ */ s.jsxs("div", { className: "composition-summary", children: [
                                    /* @__PURE__ */ s.jsxs("span", { children: [
                                      "📺 ",
                                      be,
                                      "×",
                                      Ce
                                    ] }),
                                    /* @__PURE__ */ s.jsxs("span", { children: [
                                      "🖥️ ",
                                      fe.length,
                                      " Screens Placed"
                                    ] })
                                  ] })
                                ] }),
                                kt > 0 && /* @__PURE__ */ s.jsx("div", { className: "settings-footer", children: /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-kf-stage-delete",
                                    onClick: () => {
                                      Um(), Ie(!1);
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
                /* @__PURE__ */ s.jsxs("aside", { className: `canvas-right-wing-dock ${X ? "has-active-popout" : ""}`, children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-emerald",
                      onClick: () => W(!0),
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
                        className: `btn-wing-tool ${X ? "active" : ""}`,
                        onClick: () => H((d) => !d),
                        title: `Saved Presets Library (${at.length})`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: at.length }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                        ]
                      }
                    ),
                    X && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => H(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: at.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : at.map((d) => {
                        var x;
                        return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                          Om(d), H(!1);
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
                              onClick: (A) => Dm(d.id, A),
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
                      onClick: Pm,
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
                        return (d = et.current) == null ? void 0 : d.click();
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
                      ref: et,
                      type: "file",
                      accept: ".json",
                      style: { display: "none" },
                      onChange: _m
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-rose",
                      onClick: () => {
                        pn.current = !1, Tt("auto-grid");
                        const d = Oe.length > 0 ? Oe : He, x = En(d, be, Ce), A = {
                          id: "canvas-timeline-root",
                          keyframes: [
                            {
                              id: "kf_root_0",
                              timestampEpochMs: h,
                              transitionDurationSec: 0.5,
                              transitionType: "smooth",
                              layout: {
                                width: be,
                                height: Ce,
                                backgroundColor: "#070A10",
                                fps: 30,
                                placements: x
                              }
                            }
                          ]
                        };
                        Ke(A), F && F(A), Ue(0);
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
                      className: `btn-wing-tool ${jt ? "active" : ""}`,
                      onClick: Bm,
                      title: "Fullscreen Canvas Grid (F)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: jt ? "⤓" : "⛶" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: jt ? "EXIT" : "FULL" })
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
        P && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => W(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (d) => d.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => W(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: ft,
                onChange: (d) => qe(d.target.value),
                autoFocus: !0,
                onKeyDown: (d) => {
                  d.key === "Enter" && vd();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              fe.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => W(!1), children: "Cancel" }),
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
  setIsLooping: l,
  _playheadMs: o = 0,
  setPlayheadMs: a,
  inPointMs: c = 0,
  outPointMs: u = 36e5,
  totalDurationMs: h = 36e5,
  hasGridPlacements: y = !0,
  onStepFrameForward: m,
  onStepFrameBackward: f,
  playbackSpeed: v = 1,
  onChangeSpeed: I,
  onSetInPoint: S,
  onSetOutPoint: O,
  activeFocusZone: w = "timeline",
  onFocusZoneChange: g = null
}) {
  const [k, b] = i.useState(() => Dl()), { volume: C, isMuted: E } = k, N = !!(h > 0 || y || e);
  i.useEffect(() => {
    const Y = (T) => {
      T.detail && b(T.detail);
    };
    return window.addEventListener("itb-audio-state-changed", Y), () => window.removeEventListener("itb-audio-state-changed", Y);
  }, []);
  const p = i.useCallback((Y, T, B) => {
    const U = {
      volume: typeof Y == "number" ? Y : C,
      isMuted: typeof T == "boolean" ? T : E,
      channelMode: B || k.channelMode || "both"
    };
    b(U), $x(U);
  }, [C, E, k.channelMode]), $ = (Y) => {
    Y == null || Y.stopPropagation(), N && n(!t);
  }, j = (Y) => {
    if (Y == null || Y.stopPropagation(), !N || !I) return;
    const T = fc.indexOf(v), B = T === -1 ? 1 : (T + 1) % fc.length;
    I(fc[B]);
  }, _ = (Y) => {
    Y == null || Y.stopPropagation(), E ? p(C === 0 ? 0.5 : C, !1) : p(C, !0);
  }, J = (Y) => {
    Y.stopPropagation();
    const T = parseFloat(Y.target.value);
    T === 0 ? p(0, !0) : p(T, !1);
  }, M = (Y) => {
    const T = i.useRef(null), B = i.useRef(null), U = i.useRef(0), ve = i.useCallback(() => {
      T.current && clearTimeout(T.current), B.current && clearInterval(B.current), T.current = null, B.current = null;
    }, []), G = i.useCallback((z = 1) => {
      if (n && n(!1), a) {
        const ge = 33 * z;
        a((ye) => {
          const Ne = Y === "forward" ? ye + ge : ye - ge;
          return Math.max(0, Math.min(h, Ne));
        });
      } else Y === "forward" && m ? m() : Y === "backward" && f && f();
    }, [Y]), V = i.useCallback((z) => {
      z.preventDefault(), z.stopPropagation(), N && (ve(), G(1), U.current = performance.now(), T.current = setTimeout(() => {
        B.current = setInterval(() => {
          const ge = performance.now() - U.current, ye = ge > 2500 ? 4 : ge > 1e3 ? 2 : 1;
          G(ye);
        }, 50);
      }, 280));
    }, [G, ve]);
    return i.useEffect(() => ve, [ve]), {
      onMouseDown: V,
      onMouseUp: ve,
      onMouseLeave: ve,
      onTouchStart: V,
      onTouchEnd: ve
    };
  }, R = M("backward"), re = M("forward"), le = (Y) => {
    Y.stopPropagation(), N && (n && n(!1), a && a(c));
  }, ae = (Y) => {
    Y.stopPropagation(), N && (n && n(!1), a && a(u));
  }, F = () => E || C === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : C < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      onMouseDown: () => g == null ? void 0 : g("timeline"),
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-ctrl-action btn-focus-indicator ${w === "canvas" ? "is-canvas" : "is-timeline"}`,
            onClick: (Y) => {
              Y.stopPropagation(), g == null || g(w === "canvas" ? "timeline" : "canvas");
            },
            title: w === "canvas" ? "Focus: Canvas Screen (Arrow keys nudge screen position). Click or press Esc to return to Playhead scrubbing." : "Focus: Timeline Playhead (Arrow keys step frames / seconds). Click to switch to Canvas screen nudging.",
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "focus-dot" }),
              /* @__PURE__ */ s.jsx("span", { className: "focus-label", children: w === "canvas" ? "🖥️ CANVAS" : "⏱️ PLAYHEAD" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !N,
            onClick: j,
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
            disabled: !S,
            onClick: (Y) => {
              Y.stopPropagation(), S == null || S();
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
              onClick: (Y) => {
                Y.stopPropagation(), l && l(!r);
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
              onClick: le,
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
              ...re,
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
              onClick: ae,
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
        N && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${E || C === 0 ? "is-muted" : ""}`,
              onClick: _,
              title: E ? "Unmute" : `Mute (${Math.round(C * 100)}%)`,
              children: F()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: E ? 0 : C,
              onChange: J,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const ry = 8;
function ly({
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
  const [m, f] = i.useState([]), [, v] = i.useState(!1), I = i.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((b) => ({
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
    if (!I.length || !o || u <= 0) {
      f([]);
      return;
    }
    const b = new AbortController(), C = Math.max(0, o + c - Da), E = o + c + u + Da;
    v(!0);
    const N = I.map((p) => {
      const $ = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(p.hostname)}&startEpoch=${C}&endEpoch=${E}`;
      return fetch($, { signal: b.signal }).then((j) => j.ok ? j.json() : []).then((j) => (Array.isArray(j) ? j : []).map((_) => ({
        ..._,
        stationId: p.id,
        stationName: p.name
      }))).catch((j) => {
        if (j.name !== "AbortError") return [];
        throw j;
      });
    });
    return Promise.all(N).then((p) => {
      const $ = p.flat();
      f($), v(!1);
    }).catch((p) => {
      p.name !== "AbortError" && (f([]), v(!1));
    }), () => b.abort();
  }, [I, o, c, u, r]);
  const S = i.useMemo(() => {
    const b = r ?? m;
    return !b || !b.length ? [] : !l || Object.keys(l).length === 0 ? b : b.filter((C) => {
      const E = C.stationId || C.stationName || C.stationHostname || C.hostname, N = E && l[E] || E && l[E.toLowerCase()] || E && l[E.toUpperCase()];
      return N && Array.isArray(N) && N.length > 0 ? N.some((p) => {
        const $ = p.startEpochMs ?? p.startEpoch ?? 0, j = p.endEpochMs ?? p.endEpoch ?? 0;
        return C.epochMs >= $ && C.epochMs <= j;
      }) : !(N && Array.isArray(N) && N.length === 0);
    });
  }, [r, m, l]), O = i.useMemo(() => {
    if (!S.length || u <= 0 || h <= 0)
      return [];
    const b = o + c, C = b + u, E = [...S].sort((j, _) => j.epochMs - _.epochMs), N = [];
    let p = null, $ = -999;
    for (const j of E) {
      const _ = j.epochMs + Da;
      if (_ < b || _ > C)
        continue;
      const J = _ - o, M = (J - c) / u * h;
      if (p && M - $ < ry) {
        p.events.push(j), p.endOffsetMs = J, p.endEpochMs = _;
        const R = new Set(p.events.map((re) => re.stationName || re.stationHostname || e || "Workstation"));
        p.isMultiStation = R.size > 1, p.stationCount = R.size, $ = M;
      } else {
        const R = (J - c) / u * 100;
        p = {
          id: `kc_${j.epochMs}_${N.length}`,
          startOffsetMs: J,
          endOffsetMs: J,
          startEpochMs: _,
          endEpochMs: _,
          pct: R,
          events: [j],
          isMultiStation: !1,
          stationCount: 1
        }, N.push(p), $ = M;
      }
    }
    return N;
  }, [S, o, c, u, h]);
  function w(b) {
    if (!b.events.length) return "";
    if (b.events.length === 1)
      return uo(b.events[0].keyCombination);
    const C = b.events.find((p) => p.keyCombination.includes("+"));
    if (C) {
      const p = uo(C.keyCombination);
      return b.events.length > 1 ? `${p} (+${b.events.length - 1})` : p;
    }
    const E = uo(b.events[0].keyCombination);
    return b.events.every((p) => uo(p.keyCombination) === E) ? `${E} ×${b.events.length}` : `${E} (+${b.events.length - 1})`;
  }
  function g(b, C = "LOCAL") {
    return St(b, C);
  }
  function k(b) {
    const C = [];
    for (const E of b) {
      const N = uo(E.keyCombination);
      C.length && C[C.length - 1].key === N ? C[C.length - 1].count++ : C.push({ key: N, count: 1 });
    }
    return C;
  }
  return O.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: O.map((b) => {
    const C = b.events.length, E = C > 1, N = b.isMultiStation, p = w(b), $ = g(b.startEpochMs, a), j = b.pct < 10 ? "edge-left" : b.pct > 90 ? "edge-right" : "", _ = {};
    return b.events.forEach((J) => {
      const M = J.stationName || J.stationHostname || e || "Workstation";
      _[M] || (_[M] = []), _[M].push(J);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${E ? "is-cluster" : "is-single"} ${N ? "is-multi-station" : ""}`,
        style: { left: `${b.pct}%` },
        onClick: (J) => {
          J.stopPropagation(), y && y(b.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${p} at ${$}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            E && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: N ? `${b.stationCount}S` : C > 9 ? "9+" : C })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${j}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: N ? `MULTICAM KEYSTROKES (${b.stationCount} WORKSTATIONS • ${C} EVT)` : E ? `KEYSTROKE BURST (${C})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: $ })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(_).map(([J, M]) => {
              const R = k(M);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: J }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    M.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  R.slice(0, 6).map((re, le) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    re.key,
                    re.count > 1 ? ` ×${re.count}` : ""
                  ] }, le)),
                  R.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    R.length - 6,
                    " more"
                  ] })
                ] })
              ] }, J);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      b.id
    );
  }) }) : null;
}
const oy = i.memo(ly), pc = [
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
], ay = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function iy({
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
  movieBoundaries: m = null,
  stationHostname: f = "",
  activeStationName: v = "",
  stations: I = [],
  showKeystrokes: S = !0,
  keystrokes: O = [],
  recordingSegments: w = {}
}) {
  const g = i.useRef(null), [k, b] = i.useState(1e3);
  i.useEffect(() => {
    if (!g.current) return;
    const G = new ResizeObserver((V) => {
      for (let z of V)
        z.contentRect.width > 50 && b(z.contentRect.width);
    });
    return G.observe(g.current), () => G.disconnect();
  }, []);
  const C = i.useCallback((G) => !r || r <= 0 ? "0%" : `${(G - n) / r * 100}%`, [r, n]), E = i.useCallback((G) => {
    const z = (G - n) / r * 100;
    return z >= -5 && z <= 105;
  }, [n, r]), N = (G) => {
    if (!g.current) return;
    const V = g.current.getBoundingClientRect(), z = Math.max(0, Math.min(G.clientX - V.left, V.width)), ge = Math.round(n + z / V.width * r);
    a && a(ge);
  }, p = () => {
    a && a(null);
  }, $ = (G) => {
    if (!g.current || !c) return;
    const V = g.current.getBoundingClientRect(), z = Math.max(0, Math.min(G.clientX - V.left, V.width)), ge = Math.round(n + z / V.width * r);
    c(Math.max(0, Math.min(l, ge)));
  }, j = i.useMemo(() => {
    const G = Math.max(3, Math.floor(k / 95)), V = r / G;
    for (let z of pc)
      if (z >= V) return z;
    return pc[pc.length - 1];
  }, [r, k]), _ = i.useMemo(() => {
    if (!e || r <= 0) return [];
    const G = e + n, V = G + r, z = t === "LOCAL" ? Gs(G).offsetMin * 60 * 1e3 : 0, ge = G + z, ye = Math.ceil(ge / j) * j, Ne = [];
    for (let Pe = ye; Pe <= V + z; Pe += j) {
      const Se = Pe - z, Ie = (Se - G) / r * 100;
      Ie >= 0 && Ie <= 100 && Ne.push({
        epoch: Se,
        pct: Ie,
        label: St(Se, t, {
          includeSeconds: j < 6e4
        })
      });
    }
    return Ne;
  }, [e, n, r, j, t]), J = i.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const G = e + n, V = G + r;
    return hm(G, V).map((z) => ({
      ...z,
      pct: (z.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), M = i.useMemo(() => {
    if (!r || !e) return [];
    const G = e + n, V = G + r, z = t === "UTC", ge = [], ye = z ? 0 : Gs(G).offsetMin * 60 * 1e3, Ne = G + ye, Pe = V + ye, Se = new Date(Ne);
    for (Se.setUTCHours(0, 0, 0, 0), Se.getTime() < Ne && Se.setUTCDate(Se.getUTCDate() + 1); Se.getTime() <= Pe; ) {
      const Ze = Se.getTime() - ye, Ye = (Ze - G) / r * 100, Wt = String(Se.getUTCDate()).padStart(2, "0"), It = ay[Se.getUTCMonth()], wt = `${Wt} ${It}`;
      ge.push({ epoch: Ze, pct: Ye, dateLabel: wt }), Se.setUTCDate(Se.getUTCDate() + 1);
    }
    return ge;
  }, [e, n, r, t]), {
    globalFirstMs: R = y,
    globalLastMs: re = null,
    currentFirstMs: le = null,
    currentLastMs: ae = null
  } = m || { globalFirstMs: y }, F = R !== null && le !== null && Math.abs(R - le) < 1e3, Y = re !== null && ae !== null && Math.abs(re - ae) < 1e3, T = i.useMemo(() => {
    const G = [];
    return F ? E(R) && G.push({
      id: "first-combined",
      ms: R,
      pct: C(R),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${St(e + R, t)} (Click to jump)`
    }) : (E(R) && G.push({
      id: "first-global",
      ms: R,
      pct: C(R),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${St(e + R, t)} (Click to jump)`
    }), E(le) && G.push({
      id: "first-current",
      ms: le,
      pct: C(le),
      className: "ruler-media-pin current-first",
      badge: v ? `FIRST (${v})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${St(e + le, t)} (Click to jump)`
    })), Y ? E(re) && G.push({
      id: "last-combined",
      ms: re,
      pct: C(re),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${St(e + re, t)} (Click to jump)`
    }) : (E(ae) && G.push({
      id: "last-current",
      ms: ae,
      pct: C(ae),
      className: "ruler-media-pin current-last",
      badge: v ? `LAST (${v})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${St(e + ae, t)} (Click to jump)`
    }), E(re) && G.push({
      id: "last-global",
      ms: re,
      pct: C(re),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${St(e + re, t)} (Click to jump)`
    })), G;
  }, [
    R,
    re,
    le,
    ae,
    F,
    Y,
    e,
    t,
    v,
    E,
    C
  ]), B = i.useMemo(() => {
    const G = [];
    return typeof u == "number" && E(u) && G.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: u,
      pct: C(u),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${St(e + u, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof h == "number" && E(h) && G.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: h,
      pct: C(h),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${St(e + h, t, { includeSeconds: !0 })} (Click to seek)`
    }), G;
  }, [u, h, e, t, E, C]), U = o !== null ? C(o) : null, ve = U !== null && U >= 0 && U <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: g,
      className: "timeline-ruler-root",
      onMouseMove: N,
      onMouseLeave: p,
      onClick: $,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          _.map((G) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${G.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: G.label })
          ] }, G.epoch)),
          S && /* @__PURE__ */ s.jsx(
            oy,
            {
              stationHostname: f,
              activeStationName: v,
              stations: I,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: k,
              onSeek: c,
              keystrokes: O,
              recordingSegments: w
            }
          ),
          J.map((G) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${G.pct}%` },
              title: `${G.description} (${G.labelBefore} ➔ ${G.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: G.description })
                ] })
              ]
            },
            G.switchEpochMs
          )),
          M.map((G) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${G.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: G.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            G.epoch
          )),
          T.map((G) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: G.className,
              style: { left: `${G.pct}` },
              onClick: (V) => {
                V.stopPropagation(), c && c(G.ms);
              },
              title: G.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: G.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            G.id
          )),
          B.map((G) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${G.type}-cut-tick`,
              style: { left: `${G.pct}` },
              onClick: (V) => {
                V.stopPropagation(), c && c(G.ms);
              },
              title: G.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: G.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: G.shortLabel })
                ] })
              ]
            },
            G.id
          ))
        ] }),
        ve && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${U}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: St(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Vn = (e) => String(e).padStart(2, "0");
function cy({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [c, u] = i.useState(!1), [h, y] = i.useState(!1), [m, f] = i.useState(""), [v, I] = i.useState(""), S = i.useCallback(($) => {
    if (!$ || isNaN($) || $ <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const M = new Date($);
      return {
        timeStr: `${Vn(M.getUTCHours())}:${Vn(M.getUTCMinutes())}:${Vn(M.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: j, label: _ } = Gs($), J = new Date($ + j * 60 * 1e3);
    return {
      timeStr: `${Vn(J.getUTCHours())}:${Vn(J.getUTCMinutes())}:${Vn(J.getUTCSeconds())}`,
      zoneLabel: _
    };
  }, [t]), O = i.useCallback(($) => {
    if (!$ || $ < 0) return "00:00:00";
    const j = Math.floor($ / 1e3), _ = Math.floor(j / 3600), J = Math.floor(j % 3600 / 60), M = j % 60;
    return `${Vn(_)}:${Vn(J)}:${Vn(M)}`;
  }, []), w = i.useMemo(() => S(e + r), [S, e, r]), g = i.useMemo(() => S(e + o), [S, e, o]), k = i.useMemo(() => O(Math.max(0, o - r)), [O, r, o]), b = i.useCallback(($, j) => {
    if (!$ || !$.trim()) return j;
    const J = $.trim().split(" ")[0].split(":").map(Number);
    if (J.length < 2 || J.some(isNaN)) return j;
    const [M, R, re = 0] = J;
    if (t === "UTC") {
      const z = new Date(e);
      z.setUTCHours(M, R, re, 0);
      let ge = z.getTime();
      for (; ge < e; ) ge += 864e5;
      for (; ge > e + n + 1e3; ) ge -= 864e5;
      const ye = ge - e;
      return isNaN(ye) ? j : Math.max(0, Math.min(n, ye));
    }
    const { offsetMin: le } = Gs(e), ae = new Date(e + le * 6e4), F = ae.getUTCFullYear(), Y = ae.getUTCMonth(), T = ae.getUTCDate(), B = `${F}-${Vn(Y + 1)}-${Vn(T)}`, U = `${Vn(M)}:${Vn(R)}:${Vn(re)}`, ve = ui(B, U);
    let G;
    if (ve.isAmbiguous) {
      const z = e + j, ge = Math.abs(ve.firstOccurrenceEpoch - z), ye = Math.abs(ve.secondOccurrenceEpoch - z);
      G = ge <= ye ? ve.firstOccurrenceEpoch : ve.secondOccurrenceEpoch;
    } else {
      const z = Date.UTC(F, Y, T, M, R, re), { offsetMin: ge } = Gs(z - le * 6e4);
      G = z - ge * 6e4;
    }
    for (; G < e; ) G += 864e5;
    for (; G > e + n + 1e3; ) G -= 864e5;
    const V = G - e;
    return isNaN(V) ? j : Math.max(0, Math.min(n, V));
  }, [e, t, n]), C = () => {
    f(w.timeStr), u(!0);
  }, E = () => {
    if (u(!1), !m || !m.trim() || m.trim() === w.timeStr)
      return;
    const $ = b(m.trim(), r);
    $ !== null && !isNaN($) && $ < o && l($);
  }, N = () => {
    I(g.timeStr), y(!0);
  }, p = () => {
    if (y(!1), !v || !v.trim() || v.trim() === g.timeStr)
      return;
    const $ = b(v.trim(), o);
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
          onBlur: E,
          onKeyDown: ($) => {
            $.key === "Enter" && E(), $.key === "Escape" && u(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: C,
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
      h ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: v,
          autoFocus: !0,
          onChange: ($) => I($.target.value),
          onBlur: p,
          onKeyDown: ($) => {
            $.key === "Enter" && p(), $.key === "Escape" && y(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: N,
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: k })
    ] })
  ] });
}
function uy({
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
  const m = Math.max(0, Math.min(100, c / r * 100)), f = Math.max(0, Math.min(100, u / r * 100)), v = Math.max(0, f - m), I = Math.max(0, Math.min(100, l / r * 100)), S = Math.max(0, Math.min(100 - I, o / r * 100)), O = I + S, w = a > 1.05, g = 7, k = v >= 10, b = v >= 16, C = k, E = b, N = C && Math.abs(I - m) < g, p = w && S >= 12 && !N, $ = E && Math.abs(O - f) < g, j = w && S >= 12 && !$;
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
            style: { left: `${m}%`, width: `${v}%` },
            children: [
              C && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: St(t + c, n) }),
              E && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: St(t + u, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${I}%`, width: `${S}%` },
            children: [
              p && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: St(t + l, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: St(t + l + o, n) })
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
function dy({
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
  showRulerKeystrokes: m = !1,
  onToggleRulerKeystrokes: f
}) {
  const v = (h || "NONE").toUpperCase().replace("-", "_"), I = () => {
    y && y(v === "BURN_IN" ? "NONE" : "BURN_IN");
  }, S = () => v === "BURN_IN" ? "KEYS: BURN-IN" : "KEYS: OFF";
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline-viewport-actions-group", children: [
    y && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action keys-mode-btn mode-${v === "BURN_IN" ? "burn-in" : "none"}`,
        onClick: I,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: S() })
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
        title: `Jump playhead to first media (${St(c + e, u)})`,
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
        title: `Jump playhead to last media (${St(c + t, u)})`,
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
const Os = /* @__PURE__ */ new Map(), ml = /* @__PURE__ */ new Map();
let Ks = [], Pl = 0;
const Hh = 3, hy = 8e3, fy = 80;
function jm() {
  setTimeout(py, 0);
}
function py() {
  var e;
  if (!(Pl >= Hh || Ks.length === 0))
    for (Ks = Ks.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); Pl < Hh && Ks.length > 0; ) {
      const t = Ks.pop();
      !t || (e = t.signal) != null && e.aborted || (Pl++, my(t));
    }
}
async function my(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: c, displayId: u } = e;
  let h = !1, y = null;
  const m = () => {
    h || (h = !0, y && clearTimeout(y), Pl = Math.max(0, Pl - 1), ml.delete(t), jm());
  };
  y = setTimeout(() => {
    m(), c(null);
  }, hy);
  try {
    const f = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${u ? `&displayId=${encodeURIComponent(u)}` : ""}`, v = await fetch(f, { signal: a });
    if (v.ok && v.status !== 204) {
      const I = await v.blob();
      if (I && I.size > 1500) {
        const S = URL.createObjectURL(I);
        if (Os.size >= fy) {
          const O = Os.keys().next().value, w = Os.get(O);
          w && URL.revokeObjectURL(w), Os.delete(O);
        }
        Os.set(t, S), c(S);
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
  get(e, t, n, r = 6, l = null) {
    const o = `${e}_${l || "mon-0"}_${t}_${n}_${r}`;
    return Os.get(o);
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
    if (Os.has(a))
      return Promise.resolve(Os.get(a));
    if (ml.has(a))
      return ml.get(a);
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
        Ks = Ks.filter((y) => y.key !== a), ml.delete(a), u(null);
      }, { once: !0 }), Ks.push(h), jm();
    });
    return ml.set(a, c), c;
  },
  clear() {
    Os.forEach((e) => URL.revokeObjectURL(e)), Os.clear(), ml.clear(), Ks = [], Pl = 0;
  }
}, gy = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, ns = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, qr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function mu({
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
  isAutoDirectorEnabled: m = !1,
  showDirectorCoverage: f = !1,
  stepperSegments: v = null,
  isCanvasSummary: I = !1
}) {
  const [S, O] = i.useState({}), w = i.useRef(S);
  w.current = S;
  const g = i.useMemo(() => gy(l), [l]), k = i.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: j, framesPerTile: _ } = g, J = [], M = o + r, R = M + l, re = M - j, le = R + j, ae = [...n].sort((U, ve) => ns(U) - ns(ve)), F = I ? u || [] : [...u || [], ...h || []], Y = (U, ve) => !F || F.length === 0 ? !1 : F.some((G) => {
      const V = G.startEpochMs ?? G.startEpoch ?? G.start ?? 0, z = G.endEpochMs ?? G.endEpoch ?? G.end ?? 0;
      return z <= V ? !1 : Math.max(U, V) < Math.min(ve, z);
    }), T = o + a, B = o + c;
    if (ae.forEach((U, ve) => {
      const G = Math.round(ns(U)), V = Math.round(qr(U));
      if (V <= G) return;
      const z = Math.max(G, T), ge = Math.min(V, B);
      if (ge <= z) return;
      const ye = Math.max(z, re), Ne = Math.min(ge, le);
      if (Ne <= ye) return;
      const Pe = Math.floor(ye / j) * j;
      for (let Se = Pe; Se < Ne; Se += j) {
        const Ie = Se + j, Ze = Math.max(z, Se), Ye = Math.min(ge, Ie);
        Ye > Ze && !Y(Ze, Ye) && J.push({
          key: `${e}_${t}_${Ze}_${Ye}_${_}`,
          sIdx: ve,
          startEpoch: Ze,
          endEpoch: Ye,
          framesPerTile: _,
          displayId: t
        });
      }
    }), J.length > 20) {
      const U = o + r + l / 2;
      J.sort((ve, G) => {
        const V = Math.abs((ve.startEpoch + ve.endEpoch) / 2 - U), z = Math.abs((G.startEpoch + G.endEpoch) / 2 - U);
        return V - z;
      }), J.length = 20, J.sort((ve, G) => ve.startEpoch - G.startEpoch);
    }
    return J;
  }, [n, o, e, t, r, l, g, a, c, h, u]);
  i.useEffect(() => {
    if (k.length === 0) return;
    let j = !0;
    const _ = new AbortController(), J = [], M = {};
    let R = !1;
    k.forEach((T) => {
      const B = zh.get(e, T.startEpoch, T.endEpoch, T.framesPerTile, t);
      B ? w.current[T.key] !== B && (M[T.key] = B, R = !0) : J.push(T);
    });
    const re = new Set(k.map((T) => T.key)), le = w.current, ae = {};
    let F = !1;
    if (Object.keys(le).forEach((T) => {
      re.has(T) ? ae[T] = le[T] : F = !0;
    }), R || F) {
      const T = { ...ae, ...M };
      w.current = T, O(T);
    }
    if (J.length === 0) return () => {
      j = !1;
    };
    const Y = setTimeout(() => {
      J.forEach((T) => {
        zh.fetchTile(e, T.startEpoch, T.endEpoch, T.framesPerTile, _.signal, t).then((B) => {
          j && B && (w.current[T.key] = B, O((U) => ({ ...U, [T.key]: B })));
        });
      });
    }, 150);
    return () => {
      j = !1, clearTimeout(Y), _.abort();
    };
  }, [k, e, t]);
  const b = (a - r) / l * 100, C = (c - r) / l * 100, E = i.useMemo(() => {
    if (k.length === 0 || !o || l <= 0) return [];
    const j = r, _ = r + l;
    return k.map((J) => {
      const M = J.startEpoch - o, R = J.endEpoch - o;
      if (R <= j || M >= _) return null;
      const re = Math.max(j, M), le = Math.min(_, R);
      return {
        key: J.key,
        spriteUrl: S[J.key] || null,
        leftPct: (re - j) / l * 100,
        widthPct: (le - re) / l * 100
      };
    }).filter(Boolean);
  }, [k, o, r, l, S]), N = i.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const j = r, _ = r + l;
    return n.map((J, M) => {
      const R = Math.round(ns(J)) - o, re = Math.round(qr(J)) - o;
      if (re <= j || R >= _) return null;
      const le = Math.max(j, R), ae = Math.min(_, re);
      return {
        id: M,
        leftPct: (le - j) / l * 100,
        widthPct: (ae - le) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), p = i.useMemo(() => {
    if (!o || l <= 0) return [];
    const j = [...n].sort((Y, T) => ns(Y) - ns(T)), _ = [], J = r, M = r + l, R = o + J, re = o + M, le = o + (a !== void 0 ? a : J), ae = o + (c !== void 0 ? c : M);
    if (j.length > 0) {
      const Y = ns(j[0]);
      Y > R && _.push({ startEpoch: R, endEpoch: Y });
    } else l > 0 && _.push({ startEpoch: R, endEpoch: re });
    for (let Y = 0; Y < j.length - 1; Y++) {
      const T = qr(j[Y]), B = ns(j[Y + 1]);
      B - T > 1e3 && _.push({ startEpoch: T, endEpoch: B });
    }
    if (j.length > 0) {
      const Y = qr(j[j.length - 1]);
      Y < re && _.push({ startEpoch: Y, endEpoch: re });
    }
    const F = [];
    return u && u.length > 0 && u.forEach((Y, T) => {
      const B = Math.max(Y.startEpochMs ?? Y.StartEpochMs, le), U = Math.min(Y.endEpochMs ?? Y.EndEpochMs, ae);
      if (U > B && U > R && B < re) {
        const ve = Math.max(R, B), G = Math.min(re, U), V = (G - o - (ve - o)) / l * 100;
        V > 0 && F.push({
          id: `global-${T}`,
          type: "global",
          startEpoch: ve,
          endEpoch: G,
          leftPct: (ve - o - J) / l * 100,
          widthPct: V,
          durationSec: Math.round((U - B) / 1e3)
        });
      }
    }), I || _.forEach((Y, T) => {
      let B = [Y];
      u && u.length > 0 && u.forEach((U) => {
        const ve = Math.max(U.startEpochMs ?? U.StartEpochMs, le), G = Math.min(U.endEpochMs ?? U.EndEpochMs, ae);
        if (G <= ve) return;
        const V = [];
        B.forEach((z) => {
          G <= z.startEpoch || ve >= z.endEpoch ? V.push(z) : (ve > z.startEpoch && V.push({ startEpoch: z.startEpoch, endEpoch: ve }), G < z.endEpoch && V.push({ startEpoch: G, endEpoch: z.endEpoch }));
        }), B = V;
      }), B.forEach((U, ve) => {
        if (U.endEpoch - U.startEpoch < 1e3 || U.endEpoch <= R || U.startEpoch >= re) return;
        const G = Math.max(R, U.startEpoch), V = Math.min(re, U.endEpoch), z = (V - o - (G - o)) / l * 100;
        z > 0 && F.push({
          id: `station-${T}-${ve}`,
          type: "station",
          startEpoch: G,
          endEpoch: V,
          leftPct: (G - o - J) / l * 100,
          widthPct: z,
          durationSec: Math.round((U.endEpoch - U.startEpoch) / 1e3)
        });
      });
    }), F;
  }, [n, u, o, r, l, a, c, I]), $ = i.useMemo(() => {
    if (!f || !m || !y || y.length === 0) return [];
    const j = (t || "mon-0").toLowerCase(), _ = r, J = r + l;
    return y.map((M, R) => {
      const re = (M.startEpochMs ?? M.StartEpochMs ?? 0) - o, le = (M.endEpochMs ?? M.EndEpochMs ?? 0) - o;
      if (le <= _ || re >= J) return null;
      const ae = Math.max(_, re), F = Math.min(J, le), Y = (ae - _) / l * 100, T = (F - ae) / l * 100;
      if (T <= 0) return null;
      const U = (M.targetDisplayId || M.TargetDisplayId || "mon-0").toLowerCase() === j;
      return {
        id: `cov_${R}`,
        isFeatured: U,
        leftPct: Y,
        widthPct: T
      };
    }).filter(Boolean);
  }, [f, m, y, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: p.map((j) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `gap-full-block ${j.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
        style: { left: `${j.leftPct}%`, width: `${j.widthPct}%` },
        title: j.type === "global" ? `Shared Gap: ${j.durationSec}s will be skipped` : `Station Gap: ${j.durationSec}s No-Signal`,
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
          j.widthPct > 2.5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${j.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: j.type === "global" ? `✂ SKIPPED (${j.durationSec}s)` : "NO SIGNAL" }) })
        ]
      },
      j.id
    )) }),
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: E.map((j) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `spritesheet-tile-block ${j.spriteUrl ? "is-loaded" : "is-loading"}`,
        style: {
          position: "absolute",
          left: `${j.leftPct}%`,
          width: `${j.widthPct}%`,
          height: "100%",
          backgroundImage: j.spriteUrl ? `url("${j.spriteUrl}")` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "opacity 0.25s ease"
        },
        children: !j.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
      },
      j.key
    )) }),
    $.map((j) => j.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${j.leftPct}%`, width: `${j.widthPct}%` },
        title: "Display Featured by Auto-Director"
      },
      j.id
    ) : /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-mask-dimmed",
        style: { left: `${j.leftPct}%`, width: `${j.widthPct}%` },
        title: "Display Off-Air (Masked by Auto-Director)"
      },
      j.id
    )),
    /* @__PURE__ */ s.jsxs("div", { className: `data-presence-layer ${v ? "has-stepper" : ""}`, children: [
      N.map((j) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "data-presence-bar recorded-bar",
          style: { left: `${j.leftPct}%`, width: `${j.widthPct}%` },
          title: "Recorded Video"
        },
        `bar_${j.id}`
      )),
      p.map((j) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `data-presence-bar gap-bar ${j.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${j.leftPct}%`, width: `${j.widthPct}%` },
          title: j.type === "global" ? `Shared Gap: ${j.durationSec}s skipped in export` : `Signal Loss / Gap: ${j.durationSec}s (No Video)`
        },
        `gap_bar_${j.id}`
      ))
    ] }),
    v && v.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: m ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      v.map((j, _) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${j.dispNum}`,
          style: { left: `${j.leftPct}%`, width: `${j.widthPct}%` },
          title: `Auto-Director: Screen ${j.dispNum} (${j.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: j.dispNum })
        },
        `stp_${_}`
      )),
      p && p.map((j) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-gap-block ${j.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${j.leftPct}%`, width: `${j.widthPct}%` },
          title: j.type === "global" ? `Global Gap: ${j.durationSec}s skipped in export (No switches)` : `Station Gap: ${j.durationSec}s No Signal (No switches)`,
          children: j.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "stepper-gap-badge", children: j.type === "global" ? "✂ SKIPPED" : "NO SIGNAL" })
        },
        `gap_stp_${j.id}`
      ))
    ] }) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    b > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, b)}%` } }),
    C < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, C)}%`, right: 0 } })
  ] });
}
function xy({
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
  onDeselectStation: m,
  viewportStartMs: f = 0,
  viewportDurationMs: v = 36e5,
  inPointMs: I = 0,
  outPointMs: S = 36e5,
  baseEpochMs: O = 0,
  segments: w = [],
  recordingSegments: g = {},
  globalGaps: k = []
}) {
  const b = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", C = (e == null ? void 0 : e.id) || b, E = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", N = (e == null ? void 0 : e.hostname) || "", p = i.useMemo(() => {
    var T, B, U;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((T = e == null ? void 0 : e.displayTopology) == null ? void 0 : T.displays) || ((B = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : B.Displays) || ((U = e == null ? void 0 : e.topology) == null ? void 0 : U.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), $ = i.useMemo(() => {
    var B, U;
    const T = p.find((ve) => ve.isPrimary || ve.IsPrimary);
    return ((T == null ? void 0 : T.displayId) || (T == null ? void 0 : T.DisplayId) || ((B = p[0]) == null ? void 0 : B.displayId) || ((U = p[0]) == null ? void 0 : U.DisplayId) || "mon-0").toLowerCase();
  }, [p]), j = c || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), _ = i.useMemo(() => (j == null ? void 0 : j.segments) || (j == null ? void 0 : j.Segments) || [], [j]), J = _ && _.length > 0, M = !!(p && p.length > 1), R = !!(t && M), re = i.useMemo(() => {
    let T = g[C] || g[b] || w || [];
    if (!T || T.length === 0) {
      const B = (C || "").toLowerCase(), U = (b || "").toLowerCase();
      for (const [ve, G] of Object.entries(g || {})) {
        const V = ve.toLowerCase();
        if (B && V === B || U && V === U) {
          T = G;
          break;
        }
      }
    }
    if ((!T || T.length === 0) && (T = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !T || T.length === 0)
      for (const B of p) {
        const U = B.segments || B.Segments || [];
        if (U.length > 0) {
          T = U;
          break;
        }
      }
    return (T || []).filter((B) => qr(B) - ns(B) > 0);
  }, [g, w, C, b, e, p]), le = i.useMemo(() => {
    if (!O || v <= 0) return [];
    const T = [...re].sort((V, z) => ns(V) - ns(z)), B = [], U = O + v;
    if (k && k.length > 0 && k.forEach((V) => {
      const z = V.startEpochMs ?? V.StartEpochMs ?? 0, ge = V.endEpochMs ?? V.EndEpochMs ?? 0;
      ge > z && B.push({ startEpoch: z, endEpoch: ge, type: "global" });
    }), T.length === 0)
      return B.push({ startEpoch: O, endEpoch: U, type: "station" }), B;
    const ve = Math.round(ns(T[0]));
    ve - O > 2e3 && (B.some((z) => z.type === "global" && z.startEpoch <= O && z.endEpoch >= ve) || B.push({ startEpoch: O, endEpoch: ve, type: "station" }));
    for (let V = 0; V < T.length - 1; V++) {
      const z = Math.round(qr(T[V])), ge = Math.round(ns(T[V + 1]));
      ge - z > 2e3 && (B.some((Ne) => Ne.type === "global" && Ne.startEpoch <= z && Ne.endEpoch >= ge) || B.push({ startEpoch: z, endEpoch: ge, type: "station" }));
    }
    const G = Math.round(qr(T[T.length - 1]));
    return U - G > 2e3 && (B.some((z) => z.type === "global" && z.startEpoch <= G && z.endEpoch >= U) || B.push({ startEpoch: G, endEpoch: U, type: "station" })), B;
  }, [re, k, O, v]), ae = i.useMemo(() => {
    const T = O + I, B = O + S;
    return Jx(_, le, k, T, B, $);
  }, [_, le, k, O, I, S, $]), F = i.useMemo(() => {
    if (!J || v <= 0) return null;
    const T = f, B = f + v;
    return ae.map((U, ve) => {
      const G = (U.startEpochMs ?? U.StartEpochMs ?? 0) - O, V = (U.endEpochMs ?? U.EndEpochMs ?? 0) - O;
      if (V <= T || G >= B) return null;
      const z = Math.max(T, G), ge = Math.min(B, V), ye = (z - T) / v * 100, Ne = (ge - z) / v * 100;
      if (Ne <= 0) return null;
      const Pe = (U.targetDisplayId || U.TargetDisplayId || "mon-0").toLowerCase(), Se = p.findIndex((Ye) => (Ye.displayId || Ye.DisplayId || "").toLowerCase() === Pe);
      let Ie = Se >= 0 ? Se + 1 : null;
      if (!Ie) {
        const Ye = Pe.match(/\d+/);
        Ie = Ye ? parseInt(Ye[0], 10) + 1 : 1;
      }
      const Ze = Se >= 0 ? p[Se].displayName || p[Se].DisplayName || `Screen ${Ie}` : `Screen ${Ie}`;
      return {
        id: ve,
        dispNum: Ie,
        dispLabel: Ze,
        leftPct: ye,
        widthPct: Ne
      };
    }).filter(Boolean);
  }, [J, ae, p, O, f, v]), Y = i.useCallback((T) => {
    const B = (T || "mon-0").toLowerCase();
    return o.some((U) => {
      if (U.stationId !== C) return !1;
      const ve = (U.displayId || "mon-0").toLowerCase();
      return ve === B || ve === "auto" && (B === "mon-0" || B === "screen-0");
    });
  }, [o, C]);
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
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: E, children: E }),
        M && l && /* @__PURE__ */ s.jsx(
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
        M && l && /* @__PURE__ */ s.jsxs(
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
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: p.map((T, B) => {
      const U = (T.displayId || T.DisplayId || `mon-${B}`).toLowerCase(), ve = T.displayNumber || T.DisplayNumber || B + 1, G = T.displayName || T.DisplayName || "", V = G && !G.toLowerCase().includes(b.toLowerCase()) ? G : `Screen ${ve}${T.isPrimary || B === 0 ? " (Main)" : ""}`, z = Y(U), ge = (() => {
        if (T.segments && T.segments.length > 0) return T.segments;
        const ye = `${C}/${U}`.toLowerCase(), Ne = `${b}/${U}`.toLowerCase(), Pe = `${C}_${U}`.toLowerCase(), Se = `${b}_${U}`.toLowerCase();
        for (const [Ie, Ze] of Object.entries(g || {})) {
          const Ye = Ie.toLowerCase();
          if (Ye === ye || Ye === Ne || Ye === Pe || Ye === Se) return Ze;
        }
        return U === "mon-0" || T.isPrimary || B === 0 ? re : [];
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
                  className: `btn-add-screen-canvas ${z ? "is-on-canvas" : ""}`,
                  onClick: (ye) => {
                    ye.stopPropagation(), a(e.id, U);
                  },
                  title: z ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: z ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              mu,
              {
                hostname: b,
                displayId: U,
                activeSegments: ge,
                viewportStartMs: f,
                viewportDurationMs: v,
                baseEpochMs: O,
                inPointMs: I,
                outPointMs: S,
                globalGaps: k,
                directorSegments: ae,
                isAutoDirectorEnabled: r,
                gaps: le,
                showDirectorCoverage: M
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
        h && h(), M && n && n();
      },
      onContextMenu: (T) => {
        y && (T.preventDefault(), T.stopPropagation(), y(T, e));
      },
      className: `timeline-track-container station-collapsed-track ${u ? "active-track" : ""} ${M ? "has-stepper" : "no-stepper"}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${E}${N ? ` (${N})` : ""} • Click to select${M ? " / expand" : ""}`,
            children: [
              M && /* @__PURE__ */ s.jsx(
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
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: E, children: E }),
              M && l && /* @__PURE__ */ s.jsx(
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
                  title: `Remove ${E} from project`,
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
            activeSegments: re,
            viewportStartMs: f,
            viewportDurationMs: v,
            baseEpochMs: O,
            inPointMs: I,
            outPointMs: S,
            globalGaps: k,
            isAutoDirectorEnabled: r,
            gaps: le,
            stepperSegments: M ? F : null
          }
        )
      ]
    }
  );
}
const fl = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map();
function yy(e, t, n, r = 250) {
  const l = (e || "").replace(/^live\//i, "").toLowerCase().trim(), o = Math.floor(t / 1e4) * 1e4, a = Math.ceil(n / 1e4) * 1e4;
  return `${l}_${o}_${a}_${r}`;
}
const _a = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 250) {
    const l = yy(e, t, n, r);
    return fl.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 250) {
    if (!e || n <= t) return null;
    const o = (e || "").replace(/^live\//i, "").trim(), a = Math.floor(t / 1e4) * 1e4, c = Math.ceil(n / 1e4) * 1e4, u = `${o.toLowerCase()}_${a}_${c}_${l}`;
    if (fl.has(u))
      return fl.get(u);
    if (ho.has(u))
      return ho.get(u);
    const h = (async () => {
      try {
        const y = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(o)}&startEpoch=${a}&endEpoch=${c}&points=${l}`, m = await fetch(y, { signal: r });
        if (!m.ok) {
          if (m.status === 204) return null;
          throw new Error(`HTTP ${m.status}`);
        }
        const f = await m.json();
        if (Array.isArray(f) && f.length > 0)
          return fl.set(u, f), f;
      } catch (y) {
        if (y.name !== "AbortError") {
          const m = new Array(l).fill(0.02);
          return fl.set(u, m), m;
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
    fl.clear(), ho.clear();
  }
}, Na = {
  sys: "#8B5CF6",
  // Tactical Violet (System Audio / PC Output)
  mic: "#F59E0B"
};
function hi(e, t = 100, n = 24, r = 1, l = {}) {
  const o = l.yCenter !== void 0 ? l.yCenter : n / 2, a = l.maxHalfHeight !== void 0 ? l.maxHalfHeight : n / 2 - 1.5;
  if (!e || !Array.isArray(e) || e.length === 0)
    return `M 0,${o} L ${t},${o}`;
  const c = e.length, u = t / Math.max(1, c - 1), h = Math.max(0, Math.min(3, Number(r) || 1));
  let y = "";
  for (let f = 0; f < c; f++) {
    const v = f * u, I = Math.min(1, Math.max(0.02, (e[f] || 0) * h)), S = o - I * a;
    y += f === 0 ? `M ${v.toFixed(2)},${S.toFixed(2)}` : ` L ${v.toFixed(2)},${S.toFixed(2)}`;
  }
  let m = "";
  for (let f = c - 1; f >= 0; f--) {
    const v = f * u, I = Math.min(1, Math.max(0.02, (e[f] || 0) * h)), S = o + I * a;
    m += ` L ${v.toFixed(2)},${S.toFixed(2)}`;
  }
  return `${y}${m} Z`;
}
function vy(e, t = 100, n = 24, r = 1) {
  let l = null, o = null;
  e && typeof e == "object" && !Array.isArray(e) && e.sys && e.mic ? (l = e.sys, o = e.mic) : Array.isArray(e) && (l = e.map((u, h) => Math.min(1, Math.max(0.02, u * (1 + 0.12 * Math.sin(h * 0.45))))), o = e.map((u, h) => Math.min(1, Math.max(0.02, u * (0.92 + 0.15 * Math.cos(h * 0.38))))));
  const a = hi(l, t, n, r, {
    yCenter: n * 0.5,
    maxHalfHeight: n * 0.5 - 1.5
  }), c = hi(o, t, n, r, {
    yCenter: n * 0.5,
    maxHalfHeight: n * 0.5 - 1.5
  });
  return { sysPath: a, micPath: c };
}
const ka = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function Ny({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: l = "#06B6D4" }) {
  const o = t === "both", a = t === "sys", c = t === "mic", u = i.useMemo(() => !o || !e ? null : vy(e, 100, 24, n), [o, e, n]), h = i.useMemo(() => o || !e ? null : hi(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [o, e, n]);
  if (r)
    return /* @__PURE__ */ s.jsxs("div", { className: "waveform-loading-shimmer", title: "Decoding Station Audio Waveform...", children: [
      /* @__PURE__ */ s.jsx("div", { className: "shimmer-scanner" }),
      /* @__PURE__ */ s.jsx("span", { className: "shimmer-text", children: "DECODING AUDIO..." })
    ] });
  if (o) {
    const m = Na.sys, f = Na.mic;
    return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg waveform-svg-dual", children: [
      /* @__PURE__ */ s.jsx(
        "path",
        {
          d: (u == null ? void 0 : u.sysPath) || "M 0,12 L 100,12",
          fill: m,
          fillOpacity: "0.38",
          stroke: m,
          strokeWidth: "1.1",
          strokeOpacity: "0.85",
          className: "waveform-sys-path"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "path",
        {
          d: (u == null ? void 0 : u.micPath) || "M 0,12 L 100,12",
          fill: f,
          fillOpacity: "0.38",
          stroke: f,
          strokeWidth: "1.1",
          strokeOpacity: "0.85",
          className: "waveform-mic-path"
        }
      )
    ] });
  }
  const y = a ? Na.sys : c ? Na.mic : l || "#06B6D4";
  return /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
    "path",
    {
      d: h || hi(e, 100, 24, n),
      fill: y,
      fillOpacity: "0.45",
      stroke: y,
      strokeWidth: "1.2",
      strokeOpacity: "0.85"
    }
  ) });
}
function ky({
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
  timeMode: m,
  stationName: f
}) {
  const [v, I] = i.useState(() => _a.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [S, O] = i.useState(!1);
  i.useEffect(() => {
    let R = !0;
    const re = new AbortController(), le = _a.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (le) {
      I(le), O(!1);
      return;
    }
    return I(null), O(!0), _a.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, re.signal, 250).then((ae) => {
      R && (ae && I(ae), O(!1));
    }).catch(() => {
      R && O(!1);
    }), () => {
      R = !1, re.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const w = e.startEpochMs, g = e.endEpochMs, k = Math.max(1, g - w), b = (e.gain || 1) * (t.gain || 1), C = Math.max(h, w), E = Math.min(h + y, g), N = (C - h) / y * 100, p = (E - C) / y * 100;
  if (p <= 0) return null;
  const $ = e.channelMode || t.channelMode || "both", j = e.fadeInMs ?? 50, _ = e.fadeOutMs ?? 50, J = Math.min(45, j / k * 100), M = Math.min(45, _ / k * 100);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-clip-block ${t.isMuted ? "lane-muted" : ""} ${r ? "is-selected" : ""}`,
      style: {
        left: `${N}%`,
        width: `${p}%`,
        borderLeftColor: n
      },
      onClick: l,
      onMouseDown: (R) => {
        !R.target.closest(".trim-handle") && !R.target.closest(".btn-menu-close") && !R.target.closest(".clip-channel-tag") && (c == null || c(R));
      },
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${f} [${$.toUpperCase()}] (${St(w, m, { includeSeconds: !0 })} - ${St(g, m, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${j}ms / OUT ${_}ms
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
        j > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-in-ramp",
            style: { width: `${J}%` },
            title: `Fade In: ${j}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 0,100", fill: "rgba(6, 182, 212, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "100", x2: "100", y2: "0", stroke: "#38BDF8", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Ny,
          {
            peaks: v,
            channelMode: $,
            effectiveGain: b,
            isLoadingWaveform: S,
            laneColor: n
          }
        ) }),
        _ > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${M}%` },
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
function wy({
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
  timeMode: m = "LOCAL",
  onUpdateAudioPlan: f = null
}) {
  const v = i.useRef(null), I = i.useRef(!1), [S, O] = i.useState(() => {
    var D;
    return e != null && e.segments && e.segments.length > 0 ? [
      {
        id: "A1",
        name: "Track A1",
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: e.segments.map((Z, P) => {
          var W;
          return {
            id: Z.id || `clip_${P}_${Z.startEpochMs || Z.StartEpochMs}`,
            startEpochMs: Z.startEpochMs ?? Z.StartEpochMs ?? l,
            endEpochMs: Z.endEpochMs ?? Z.EndEpochMs ?? l + r,
            sourceStationId: Z.sourceStationId ?? Z.SourceStationId ?? (((W = t[0]) == null ? void 0 : W.id) || "station-0"),
            gain: Z.gain ?? Z.Gain ?? 1,
            channelMode: Z.channelMode ?? Z.ChannelMode ?? "both",
            fadeInMs: Z.fadeInMs ?? Z.FadeInMs ?? 50,
            fadeOutMs: Z.fadeOutMs ?? Z.FadeOutMs ?? 50
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
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: ((D = t[0]) == null ? void 0 : D.id) || "station-0",
            gain: 1,
            channelMode: "both",
            fadeInMs: 50,
            fadeOutMs: 50
          }
        ]
      }
    ];
  }), [w, g] = i.useState(!1), [k, b] = i.useState(null), [C, E] = i.useState(1), [N, p] = i.useState(50), [$, j] = i.useState(50), [_, J] = i.useState([]), [M, R] = i.useState(null), [re, le] = i.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  i.useEffect(() => {
    const D = (Z) => {
      Z.detail && le(Z.detail);
    };
    return window.addEventListener("itb-live-audio-level", D), () => window.removeEventListener("itb-live-audio-level", D);
  }, []), i.useEffect(() => {
    I.current || !(e != null && e.segments) || e.segments.length === 0 || O((D) => {
      const Z = D.find((W) => W.id === "A1") || D[0], P = e.segments.map((W, X) => {
        var H;
        return {
          id: W.id || `clip_${X}_${W.startEpochMs || W.StartEpochMs}`,
          startEpochMs: W.startEpochMs ?? W.StartEpochMs ?? l,
          endEpochMs: W.endEpochMs ?? W.EndEpochMs ?? l + r,
          sourceStationId: W.sourceStationId ?? W.SourceStationId ?? (((H = t[0]) == null ? void 0 : H.id) || "station-0"),
          gain: W.gain ?? W.Gain ?? 1,
          channelMode: W.channelMode ?? W.ChannelMode ?? (Z == null ? void 0 : Z.channelMode) ?? "both",
          fadeInMs: W.fadeInMs ?? W.FadeInMs ?? 50,
          fadeOutMs: W.fadeOutMs ?? W.FadeOutMs ?? 50
        };
      });
      return [
        {
          ...Z || {
            id: "A1",
            name: "Track A1",
            isMuted: !1,
            isSolo: !1,
            gain: 1,
            channelMode: "both"
          },
          clips: P
        }
      ];
    });
  }, [e, l, r, t]);
  const ae = l + o, F = l + n, Y = F + r, T = i.useCallback((D) => {
    if (!f) return;
    const Z = [];
    D.forEach((P) => {
      P.isMuted || w || P.clips.forEach((W) => {
        Z.push({
          startEpochMs: W.startEpochMs,
          endEpochMs: W.endEpochMs,
          sourceStationId: W.sourceStationId,
          gain: W.gain * P.gain,
          channelMode: W.channelMode || P.channelMode || "both",
          fadeInMs: W.fadeInMs ?? 50,
          fadeOutMs: W.fadeOutMs ?? 50
        });
      });
    }), Z.sort((P, W) => P.startEpochMs - W.startEpochMs), f({ segments: Z });
  }, [f, w]);
  i.useEffect(() => {
    let D = null;
    for (const Z of S)
      if (!(Z.isMuted || w)) {
        for (const P of Z.clips)
          if (ae >= P.startEpochMs && ae <= P.endEpochMs) {
            const W = t.find((X) => X.id === P.sourceStationId);
            D = {
              stationId: P.sourceStationId,
              stationName: W ? W.displayName || W.hostname || W.id : P.sourceStationId,
              channelMode: P.channelMode || Z.channelMode || "both",
              gain: P.gain * Z.gain,
              isPlaying: re.isPlaying
            };
            break;
          }
        if (D) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: D }));
  }, [S, w, ae, t, re.isPlaying]), i.useEffect(() => {
    const D = () => {
      _.length !== 0 && (O((W) => {
        const X = W.map((H) => ({
          ...H,
          clips: H.clips.filter((ne) => !_.includes(ne.id))
        }));
        return T(X), X;
      }), J([]), b(null));
    }, Z = (W) => {
      if (W.key === "Delete" || W.key === "Backspace") {
        const X = W.target;
        if (X.tagName === "INPUT" || X.tagName === "TEXTAREA" || X.isContentEditable) return;
        _.length > 0 && (W.preventDefault(), D());
      }
    }, P = () => D();
    return window.addEventListener("keydown", Z), window.addEventListener("itb:studio-delete-selected", P), () => {
      window.removeEventListener("keydown", Z), window.removeEventListener("itb:studio-delete-selected", P);
    };
  }, [_, T]), i.useCallback(() => {
    O((D) => {
      const P = `A${D.length + 1}`, W = {
        id: P,
        name: `Track ${P}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, X = [...D, W];
      return T(X), X;
    });
  }, [T]), i.useCallback((D) => {
    O((Z) => {
      if (Z.length <= 1) return Z;
      const P = Z.filter((W) => W.id !== D);
      return T(P), P;
    });
  }, [T]);
  const B = i.useCallback((D) => {
    O((Z) => {
      const P = Z.map((W) => W.id === D ? { ...W, isMuted: !W.isMuted } : W);
      return T(P), P;
    });
  }, [T]), U = i.useCallback((D) => {
    O((Z) => {
      var X;
      const P = (X = Z.find((H) => H.id === D)) == null ? void 0 : X.isSolo, W = Z.map((H) => ({
        ...H,
        isSolo: H.id === D ? !P : !1,
        isMuted: H.id === D ? !1 : !P
      }));
      return T(W), W;
    });
  }, [T]), ve = i.useCallback((D) => {
    const Z = ["both", "sys", "mic"];
    O((P) => {
      const W = P.map((X) => {
        if (X.id !== D) return X;
        const H = X.channelMode || "both", ne = Z[(Z.indexOf(H) + 1) % Z.length];
        return {
          ...X,
          channelMode: ne,
          clips: X.clips.map((se) => ({ ...se, channelMode: ne }))
        };
      });
      return T(W), W;
    });
  }, [T]), G = i.useCallback((D, Z) => {
    const P = Math.max(0, Math.min(2, Number(Z)));
    O((W) => {
      const X = W.map((H) => H.id === D ? { ...H, gain: P } : H);
      return T(X), X;
    }), Uh(P);
  }, [T]), V = i.useCallback((D, Z) => {
    Z && O((P) => {
      const W = P.map((X) => {
        if (X.id !== D) return X;
        if (X.clips.length === 0) {
          const H = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: Z,
            gain: 1,
            channelMode: X.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...X, clips: [H] };
        }
        return {
          ...X,
          clips: X.clips.map((H) => ({ ...H, sourceStationId: Z }))
        };
      });
      return T(W), W;
    });
  }, [l, r, T]), z = i.useCallback((D, Z = null, P = null) => {
    var ke;
    const W = Z || ((ke = t[0]) == null ? void 0 : ke.id) || "station-0", X = P !== null ? P : ae, H = Math.min(r, 6e4), ne = X + H, se = S.find((Xe) => Xe.id === D), de = (se == null ? void 0 : se.channelMode) || "both", De = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(X),
      endEpochMs: Math.round(ne),
      sourceStationId: W,
      gain: 1,
      channelMode: de,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    O((Xe) => {
      const ft = Xe.map((qe) => qe.id === D ? {
        ...qe,
        clips: [...qe.clips, De].sort((gt, ct) => gt.startEpochMs - ct.startEpochMs)
      } : qe);
      return T(ft), ft;
    });
  }, [S, ae, r, t, T]), ge = i.useCallback((D, Z = null) => {
    O((P) => {
      const W = P.map((X) => {
        if (D && X.id !== D) return X;
        const H = [];
        return X.clips.forEach((ne) => {
          (!Z || ne.id === Z || _.includes(ne.id)) && ae > ne.startEpochMs + 500 && ae < ne.endEpochMs - 500 ? (H.push({ ...ne, endEpochMs: ae }), H.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: ae,
            endEpochMs: ne.endEpochMs,
            sourceStationId: ne.sourceStationId,
            gain: ne.gain,
            channelMode: ne.channelMode || X.channelMode || "both",
            fadeInMs: ne.fadeInMs ?? 50,
            fadeOutMs: ne.fadeOutMs ?? 50
          })) : H.push(ne);
        }), { ...X, clips: H };
      });
      return T(W), W;
    }), b(null);
  }, [ae, _, T]), ye = i.useCallback(() => {
    ge(null, null);
  }, [ge]);
  i.useEffect(() => {
    const D = (Z) => {
      var P;
      if ((Z.ctrlKey || Z.metaKey) && (Z.key === "k" || Z.key === "K")) {
        if (["INPUT", "TEXTAREA", "SELECT"].includes((P = document.activeElement) == null ? void 0 : P.tagName)) return;
        Z.preventDefault(), Z.stopPropagation(), ye();
      }
    };
    return window.addEventListener("keydown", D), () => window.removeEventListener("keydown", D);
  }, [ye]);
  const Ne = i.useCallback((D, Z) => {
    O((P) => {
      const W = P.map((X) => X.id !== D ? X : {
        ...X,
        clips: X.clips.filter((H) => H.id !== Z)
      });
      return T(W), W;
    }), b(null);
  }, [T]), Pe = i.useCallback((D, Z, P) => {
    O((W) => {
      const X = W.map((H) => H.id !== D ? H : {
        ...H,
        clips: H.clips.map((ne) => ne.id === Z ? { ...ne, sourceStationId: P } : ne)
      });
      return T(X), X;
    }), b((W) => W ? { ...W, stationId: P } : null);
  }, [T]), Se = i.useCallback((D, Z, P) => {
    const W = Math.max(0, Math.min(2.5, Number(P)));
    E(W), O((X) => {
      const H = X.map((ne) => ne.id !== D ? ne : {
        ...ne,
        clips: ne.clips.map((se) => se.id === Z ? { ...se, gain: W } : se)
      });
      return T(H), H;
    }), Uh(W);
  }, [T]), Ie = i.useCallback((D, Z, P, W) => {
    const X = Math.max(0, Math.min(1e4, Math.round(Number(W) || 0)));
    P === "in" ? p(X) : j(X), O((H) => {
      const ne = H.map((se) => se.id !== D ? se : {
        ...se,
        clips: se.clips.map((de) => de.id === Z ? P === "in" ? { ...de, fadeInMs: X } : { ...de, fadeOutMs: X } : de)
      });
      return T(ne), ne;
    }), b((H) => H ? P === "in" ? { ...H, fadeInMs: X } : { ...H, fadeOutMs: X } : null);
  }, [T]), Ze = i.useCallback((D, Z) => {
    O((P) => {
      const W = P.map((X) => {
        if (X.id !== D) return X;
        const H = Math.max(0, Math.min(2, Math.round((X.gain + Z) * 100) / 100));
        return { ...X, gain: H };
      });
      return T(W), W;
    });
  }, [T]), Ye = i.useCallback((D, Z, P) => {
    var gt, ct, et, at;
    if (D.preventDefault(), D.stopPropagation(), D.button !== 0) return;
    const W = S.find((Ot) => Ot.id === Z), X = (gt = W == null ? void 0 : W.clips) == null ? void 0 : gt.find((Ot) => Ot.id === P);
    if (!X) return;
    I.current = !0;
    const H = D.clientX, ne = X.startEpochMs, de = X.endEpochMs - ne, De = D.currentTarget.closest(".track-surface") || D.currentTarget.closest(".audio-track-surface") || ((ct = v.current) == null ? void 0 : ct.querySelector(".track-surface")) || ((et = v.current) == null ? void 0 : et.querySelector(".audio-track-surface")) || ((at = v.current) == null ? void 0 : at.querySelector(".audio-lane-timeline"));
    if (!De) return;
    const ke = De.getBoundingClientRect();
    if (!ke || ke.width <= 0) return;
    let Xe = !1;
    const ft = (Ot) => {
      const Zt = Ot.clientX - H;
      Math.abs(Zt) > 2 && (Xe = !0);
      const xt = Zt / ke.width * r;
      let nt = Math.round(ne + xt), jt = nt + de;
      const At = 12 / ke.width * r;
      Math.abs(nt - ae) <= At ? (nt = ae, jt = nt + de) : Math.abs(jt - ae) <= At && (jt = ae, nt = jt - de), nt < l && (nt = l, jt = nt + de), O((Dt) => Dt.map((ln) => ln.id !== Z ? ln : {
        ...ln,
        clips: ln.clips.map((Ct) => Ct.id === P ? { ...Ct, startEpochMs: nt, endEpochMs: jt } : Ct)
      }));
    }, qe = () => {
      window.removeEventListener("mousemove", ft), window.removeEventListener("mouseup", qe), I.current = !1, Xe && O((Ot) => (T(Ot), Ot));
    };
    window.addEventListener("mousemove", ft), window.addEventListener("mouseup", qe);
  }, [S, r, ae, l, T]), Wt = i.useCallback((D, Z, P, W) => {
    var qe, gt, ct;
    D.preventDefault(), D.stopPropagation();
    const X = D.clientX, H = S.find((et) => et.id === Z), ne = H == null ? void 0 : H.clips.find((et) => et.id === P);
    if (!ne) return;
    I.current = !0;
    const se = ne.startEpochMs, de = ne.endEpochMs, De = D.currentTarget.closest(".track-surface") || D.currentTarget.closest(".audio-track-surface") || ((qe = v.current) == null ? void 0 : qe.querySelector(".track-surface")) || ((gt = v.current) == null ? void 0 : gt.querySelector(".audio-track-surface")) || ((ct = v.current) == null ? void 0 : ct.querySelector(".audio-lane-timeline"));
    if (!De) return;
    const ke = De.getBoundingClientRect();
    if (!ke || ke.width <= 0) return;
    const Xe = (et) => {
      const Ot = (et.clientX - X) / ke.width * r;
      O((Zt) => Zt.map((xt) => xt.id !== Z ? xt : {
        ...xt,
        clips: xt.clips.map((nt) => {
          if (nt.id !== P) return nt;
          if (W === "start") {
            const jt = Math.min(de - 500, se + Ot);
            return { ...nt, startEpochMs: Math.round(jt) };
          } else {
            const jt = Math.max(se + 500, de + Ot);
            return { ...nt, endEpochMs: Math.round(jt) };
          }
        })
      }));
    }, ft = () => {
      window.removeEventListener("mousemove", Xe), window.removeEventListener("mouseup", ft), I.current = !1, O((et) => (T(et), et));
    };
    window.addEventListener("mousemove", Xe), window.addEventListener("mouseup", ft);
  }, [S, r, T]), It = i.useCallback((D, Z, P) => {
    O((W) => {
      const X = W.map((H) => H.id !== D ? H : {
        ...H,
        clips: H.clips.map((ne) => ne.id === Z ? { ...ne, channelMode: P } : ne)
      });
      return T(X), X;
    }), b((W) => W ? { ...W, channelMode: P } : null);
  }, [T]), wt = i.useCallback((D, Z) => {
    var de;
    const P = S.find((De) => De.id === D), W = (de = P == null ? void 0 : P.clips) == null ? void 0 : de.find((De) => De.id === Z);
    if (!W) return;
    const X = W.channelMode || P.channelMode || "both", H = ["both", "sys", "mic"], ne = (H.indexOf(X) + 1) % H.length, se = H[ne];
    It(D, Z, se);
  }, [S, It]), Q = (D, Z, P) => {
    D.preventDefault(), D.stopPropagation();
    const W = 280, X = 390, H = Math.max(16, Math.min(window.innerWidth - W - 16, D.clientX - W / 2));
    let ne = D.clientY - X - 12;
    ne < 80 && (ne = Math.min(window.innerHeight - X - 16, D.clientY + 24)), E(P.gain || 1), p(P.fadeInMs ?? 50), j(P.fadeOutMs ?? 50), b({
      laneId: Z,
      clipId: P.id,
      s: P.startEpochMs,
      e: P.endEpochMs,
      x: H,
      y: ne,
      stationId: P.sourceStationId,
      gain: P.gain || 1,
      channelMode: P.channelMode || "both",
      fadeInMs: P.fadeInMs ?? 50,
      fadeOutMs: P.fadeOutMs ?? 50
    });
  };
  return i.useEffect(() => {
    if (!k) return;
    const D = () => b(null), Z = (P) => {
      P.key === "Escape" && b(null);
    };
    return window.addEventListener("click", D), window.addEventListener("keydown", Z), () => {
      window.removeEventListener("click", D), window.removeEventListener("keydown", Z);
    };
  }, [k]), i.useMemo(() => {
    if (w) return [];
    const D = S.some((W) => W.isSolo), Z = S.filter((W) => D ? W.isSolo : !W.isMuted), P = [];
    return Z.forEach((W) => {
      const X = ka[S.indexOf(W) % ka.length];
      W.clips.forEach((H) => {
        P.push({
          ...H,
          laneId: W.id,
          laneName: W.name,
          laneColor: X,
          effectiveChannelMode: H.channelMode || W.channelMode || "both",
          effectiveGain: (H.gain || 1) * (W.gain || 1)
        });
      });
    }), P.sort((W, X) => W.startEpochMs - X.startEpochMs);
  }, [S, w]), !t || t.length === 0 ? null : /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-tracks-wrapper", ref: v, children: [
    S.map((D, Z) => {
      var ne;
      const P = ka[Z % ka.length], W = M === D.id, X = t.find((se) => {
        var de;
        return se.id === ((de = D.clips[0]) == null ? void 0 : de.sourceStationId);
      }) || t[0], H = X ? X.displayName || X.hostname || X.id : ((ne = t[0]) == null ? void 0 : ne.displayName) || "Station";
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container audio-routing-track-container station-collapsed-track",
          children: [
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: "track-sidebar station-collapsed-sidebar audio-track-sidebar",
                style: { borderLeftColor: P },
                title: `Audio Track: ${D.name} • Station: ${H} [${(D.channelMode || "both").toUpperCase()}]`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${D.isMuted || w ? "idle" : "online"}`, title: D.isMuted ? "Audio Muted" : "Audio Active" }),
                  /* @__PURE__ */ s.jsx("span", { className: "audio-lane-icon", title: "Audio Bus", children: D.isMuted || w ? "🔇" : "🔊" }),
                  /* @__PURE__ */ s.jsx("span", { className: "audio-lane-tag", style: { backgroundColor: P }, title: `Lane ${D.id}`, children: D.id }),
                  /* @__PURE__ */ s.jsx("div", { className: "audio-station-picker", title: "Change Audio Workstation Source", children: /* @__PURE__ */ s.jsx(
                    "select",
                    {
                      className: "audio-station-select",
                      value: (X == null ? void 0 : X.id) || "",
                      onChange: (se) => V(D.id, se.target.value),
                      title: "Select source workstation for audio track",
                      children: t.map((se) => /* @__PURE__ */ s.jsx("option", { value: se.id, children: se.displayName || se.hostname || se.id }, se.id))
                    }
                  ) }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `btn-channel-toggle mode-${D.channelMode || "both"}`,
                      onClick: () => ve(D.id),
                      title: `Audio Channel: ${(D.channelMode || "both").toUpperCase()} (Click to toggle SYS \\ MIC \\ BOTH)`,
                      children: (D.channelMode || "both") === "both" ? "⚡ BOTH" : (D.channelMode || "both") === "sys" ? "💻 SYS" : "🎙️ MIC"
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "audio-gain-cluster", title: `Master Track Gain: ${Math.round(D.gain * 100)}%`, children: [
                    /* @__PURE__ */ s.jsx(
                      "input",
                      {
                        type: "range",
                        min: "0",
                        max: "2",
                        step: "0.05",
                        value: D.gain,
                        onChange: (se) => G(D.id, se.target.value),
                        className: "audio-gain-slider",
                        title: `Track Gain: ${Math.round(D.gain * 100)}%`
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "gain-pct-badge", children: [
                      Math.round(D.gain * 100),
                      "%"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-gain-nudge btn-gain-down",
                        onClick: () => Ze(D.id, -0.1),
                        title: "Decrease Gain (-10%) relative to other sources",
                        children: "-"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-gain-nudge btn-gain-up",
                        onClick: () => Ze(D.id, 0.1),
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
                        className: `btn-audio-mute ${D.isMuted ? "is-active" : ""}`,
                        onClick: () => B(D.id),
                        title: D.isMuted ? "Unmute Track" : "Mute Track",
                        children: "M"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-audio-solo ${D.isSolo ? "is-active" : ""}`,
                        onClick: () => U(D.id),
                        title: D.isSolo ? "Unsolo Track" : "Solo Track",
                        children: "S"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "btn-lane-split-razor",
                      onClick: (se) => {
                        se.stopPropagation(), ge(D.id, null);
                      },
                      title: `Split ${D.id} at playhead (${St(ae, m, { includeSeconds: !0 })}) [Ctrl+K]`,
                      children: "✂️"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `track-surface audio-track-surface ${W ? "is-drag-over" : ""}`,
                onClick: () => J([]),
                onDragOver: (se) => {
                  se.preventDefault(), se.dataTransfer.dropEffect = "copy", M !== D.id && R(D.id);
                },
                onDragLeave: () => {
                  M === D.id && R(null);
                },
                onDrop: (se) => {
                  se.preventDefault(), R(null);
                  const de = se.dataTransfer.getData("text/station-id") || se.dataTransfer.getData("text/plain");
                  if (de) {
                    const De = se.currentTarget.getBoundingClientRect(), ke = Math.max(0, Math.min(1, (se.clientX - De.left) / De.width)), Xe = Math.round(F + ke * r);
                    z(D.id, de, Xe);
                  }
                },
                onDoubleClick: (se) => {
                  var Xe;
                  const de = se.currentTarget.getBoundingClientRect(), De = Math.max(0, Math.min(1, (se.clientX - de.left) / de.width)), ke = Math.round(F + De * r);
                  z(D.id, (Xe = t[0]) == null ? void 0 : Xe.id, ke);
                },
                children: [
                  D.clips.map((se) => {
                    const de = t.find((ke) => ke.id === se.sourceStationId), De = de ? de.displayName || de.hostname || de.id : se.sourceStationId;
                    return se.endEpochMs <= F || se.startEpochMs >= Y ? null : /* @__PURE__ */ s.jsx(
                      ky,
                      {
                        clip: se,
                        lane: D,
                        laneColor: P,
                        isSelected: _.includes(se.id),
                        onSelect: (ke) => {
                          ke.stopPropagation(), ke.ctrlKey || ke.metaKey ? J(
                            (Xe) => Xe.includes(se.id) ? Xe.filter((ft) => ft !== se.id) : [...Xe, se.id]
                          ) : J([se.id]);
                        },
                        onOpenMenu: (ke) => Q(ke, D.id, se),
                        onTrimDrag: (ke, Xe) => Wt(ke, D.id, se.id, Xe),
                        onClipMoveDrag: (ke) => Ye(ke, D.id, se.id),
                        onToggleChannelMode: () => wt(D.id, se.id),
                        vpStartEpoch: F,
                        viewportDurationMs: r,
                        timeMode: m,
                        stationName: De
                      },
                      se.id
                    );
                  }),
                  D.clips.length === 0 && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "empty-lane-placeholder",
                      onClick: () => {
                        var se;
                        return z(D.id, (se = t[0]) == null ? void 0 : se.id, ae);
                      },
                      title: "Click or drop workstation here to insert audio clip",
                      children: /* @__PURE__ */ s.jsxs("span", { children: [
                        "＋ CLICK OR DRAG WORKSTATION HERE (",
                        D.name,
                        ")"
                      ] })
                    }
                  )
                ]
              }
            )
          ]
        },
        D.id
      );
    }),
    k && _s.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: k.x, top: k.y },
          onClick: (D) => D.stopPropagation(),
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
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((D) => {
                const Z = D.id === k.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${Z ? "is-selected" : ""}`,
                    onClick: () => Pe(k.laneId, k.clipId, D.id),
                    children: D.displayName || D.hostname || D.id
                  },
                  D.id
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
                    className: `btn-channel-chip mode-both ${k.channelMode === "both" ? "is-selected" : ""}`,
                    onClick: () => It(k.laneId, k.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${k.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => It(k.laneId, k.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${k.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => It(k.laneId, k.clipId, "mic"),
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
                  Math.round(C * 100),
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
                  value: C,
                  onChange: (D) => Se(k.laneId, k.clipId, D.target.value),
                  className: "menu-gain-slider"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME FADE IN / FADE OUT" }),
                /* @__PURE__ */ s.jsxs("span", { className: "fade-val", children: [
                  N,
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
                      value: N,
                      onChange: (D) => Ie(k.laneId, k.clipId, "in", D.target.value),
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
                      onChange: (D) => Ie(k.laneId, k.clipId, "out", D.target.value),
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
                  onClick: () => ge(k.laneId, k.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => Ne(k.laneId, k.clipId),
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
function jy({
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
  totalDurationMs: m = 36e5,
  playheadMs: f = 0,
  inPointMs: v = 0,
  outPointMs: I = 36e5,
  timeMode: S = "LOCAL"
}) {
  const O = i.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [w, g] = i.useState(null), [k, b] = i.useState(null), [C, E] = i.useState(!1), N = y + f, p = y + u, $ = p + h, j = i.useCallback((M) => {
    if (!O || M < 0 || M >= O.length) return;
    const R = O[M];
    R && (n && n(M, R.timestampEpochMs), b(M), E(!1));
  }, [O, n]);
  i.useEffect(() => {
    const M = (R) => {
      R.target.tagName === "INPUT" || R.target.tagName === "TEXTAREA" || R.target.isContentEditable || (R.key === "[" || R.altKey && R.key === "ArrowLeft" ? (R.preventDefault(), t > 0 && j(t - 1)) : (R.key === "]" || R.altKey && R.key === "ArrowRight") && (R.preventDefault(), t < O.length - 1 && j(t + 1)));
    };
    return window.addEventListener("keydown", M), () => window.removeEventListener("keydown", M);
  }, [t, O, j]), i.useEffect(() => {
    if (k === null) return;
    const M = (re) => {
      re.key === "Escape" && b(null);
    }, R = (re) => {
      !re.target.closest(".kf-inspector-popover") && !re.target.closest(".kf-marker-diamond") && !re.target.closest(".btn-row-settings") && b(null);
    };
    return window.addEventListener("keydown", M), window.addEventListener("mousedown", R), () => {
      window.removeEventListener("keydown", M), window.removeEventListener("mousedown", R);
    };
  }, [k]), i.useEffect(() => {
    if (!C) return;
    const M = (R) => {
      !R.target.closest(".kf-quick-jump-dropdown") && !R.target.closest(".kf-count-pill") && E(!1);
    };
    return window.addEventListener("mousedown", M), () => window.removeEventListener("mousedown", M);
  }, [C]);
  const _ = (M) => {
    const R = M.currentTarget.getBoundingClientRect(), re = M.clientX - R.left, le = Math.max(0, Math.min(1, re / R.width)), ae = Math.round(p + le * h);
    r && r(ae);
  }, J = (M, R, re) => {
    if (M.button !== 0) return;
    M.stopPropagation(), M.preventDefault();
    const le = M.clientX, ae = re.timestampEpochMs, F = re.id || `kf_${R}_${ae}`, Y = M.currentTarget.closest(".track-surface");
    if (!Y) return;
    let T = !1;
    g({
      idx: R,
      kfId: F,
      startClientX: le,
      initialEpoch: ae,
      currentEpoch: ae
    });
    const B = (ve) => {
      const G = ve.clientX - le;
      Math.abs(G) > 3 && (T = !0);
      const V = Y.getBoundingClientRect(), z = G / V.width * h;
      let ge = Math.round(ae + z);
      ge = Math.max(y, Math.min(y + m, ge));
      const ye = y + v, Ne = y + I, Pe = 14 / V.width * h;
      Math.abs(ge - N) <= Pe ? ge = N : Math.abs(ge - ye) <= Pe ? ge = ye : Math.abs(ge - Ne) <= Pe && (ge = Ne), g((Se) => Se ? { ...Se, currentEpoch: ge } : null);
    }, U = (ve) => {
      window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", U), g(null);
      const G = Y.getBoundingClientRect(), z = (ve.clientX - le) / G.width * h;
      let ge = Math.round(ae + z);
      ge = Math.max(y, Math.min(y + m, ge));
      const ye = y + v, Ne = y + I, Pe = 14 / G.width * h;
      Math.abs(ge - N) <= Pe ? ge = N : Math.abs(ge - ye) <= Pe ? ge = ye : Math.abs(ge - Ne) <= Pe && (ge = Ne), T ? (o && o(F, ge), n && n(R, ge)) : (n && n(R, ae), b((Se) => Se === R ? null : R));
    };
    window.addEventListener("mousemove", B), window.addEventListener("mouseup", U);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `canvas-keyframe-track-row ${k !== null || C ? "has-active-popover" : ""}`, children: [
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
            onClick: (M) => {
              M.stopPropagation(), j(t - 1);
            },
            title: "Jump to Previous Keyframe ([ or Alt+Left)",
            children: "◀"
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `kf-count-pill ${C ? "is-active" : ""}`,
            onClick: (M) => {
              M.stopPropagation(), E((R) => !R);
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
            onClick: (M) => {
              M.stopPropagation(), j(t + 1);
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
            onClick: (M) => {
              M.stopPropagation(), t > 0 && l && (l(t), b(null));
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
          onClick: (M) => {
            M.stopPropagation(), r && r(N);
          },
          title: "Add layout keyframe at playhead position (+ / K)",
          children: "+ KF"
        }
      ),
      C && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "kf-quick-jump-dropdown",
          onClick: (M) => M.stopPropagation(),
          onMouseDown: (M) => M.stopPropagation(),
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
                  onClick: () => E(!1),
                  title: "Close",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "dropdown-list", children: O.map((M, R) => {
              var U, ve, G;
              const re = R === t, le = St(M.timestampEpochMs, S, { includeSeconds: !0 }), ae = Math.max(0, (M.timestampEpochMs - y) / 1e3).toFixed(1), F = M.utcClockPosition || ((U = M.layout) == null ? void 0 : U.utcClockPosition) || "top-right", Y = cu(F), T = ((G = (ve = M.layout) == null ? void 0 : ve.placements) == null ? void 0 : G.length) || 0, B = R === 0 ? "Root" : `${M.transitionType || "smooth"} (${M.transitionDurationSec ?? 0.5}s)`;
              return /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `kf-jump-row ${re ? "is-active" : ""}`,
                  onClick: () => j(R),
                  title: `Seek to Keyframe #${R + 1} at ${le}`,
                  children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-idx", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "diamond-mini", children: "❖" }),
                      /* @__PURE__ */ s.jsxs("span", { className: "idx-num", children: [
                        "#",
                        R + 1
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-time", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "time-val", children: le }),
                      /* @__PURE__ */ s.jsxs("span", { className: "offset-val", children: [
                        "+",
                        ae,
                        "s"
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "row-col-meta", children: [
                      /* @__PURE__ */ s.jsxs("span", { className: "meta-badge clock-badge", title: "UTC Clock Position", children: [
                        "⏱️ ",
                        Y
                      ] }),
                      /* @__PURE__ */ s.jsx("span", { className: "meta-badge trans-badge", title: "Transition", children: B }),
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
                            V.stopPropagation(), j(R);
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
                            V.stopPropagation(), l && (l(R), k === R && b(null));
                          },
                          title: `Delete Keyframe #${R + 1}`,
                          children: "🗑"
                        }
                      )
                    ] })
                  ]
                },
                M.id || R
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
          O.map((M, R) => {
            var Ne, Pe, Se, Ie, Ze, Ye, Wt, It, wt;
            const re = (w == null ? void 0 : w.idx) === R, le = re ? w.currentEpoch : M.timestampEpochMs;
            if (le < p - 5e4 || le > $ + 5e4) return null;
            const ae = (le - p) / h * 100;
            if (ae < -2 || ae > 102) return null;
            const F = R === t, Y = k === R && !re, T = ae < 15, B = ae > 85, U = T ? "align-left" : B ? "align-right" : "align-center", ve = St(le, S, { includeSeconds: !0 }), G = `${M.transitionType || "smooth"} (${M.transitionDurationSec ?? 0.5}s)`, V = Math.max(0, (le - y) / 1e3).toFixed(1), z = M.utcClockPosition || ((Ne = M.layout) == null ? void 0 : Ne.utcClockPosition) || "top-right", ge = cu(z), ye = ((Se = (Pe = M.layout) == null ? void 0 : Pe.placements) == null ? void 0 : Se.length) || 0;
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${F ? "is-active" : ""} ${re ? "is-dragging" : ""} ${Y ? "has-active-popover" : ""}`,
                style: { left: `${ae}%` },
                onMouseDown: (Q) => J(Q, R, M),
                onContextMenu: (Q) => {
                  Q.preventDefault(), Q.stopPropagation(), O.length > 1 && l && l(R);
                },
                title: `Keyframe #${R + 1} at ${ve} (+${V}s) • ${G} • Clock: ${ge} • Feeds: ${ye}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  re && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: ve }),
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
                      className: `kf-inspector-popover ${U}`,
                      onClick: (Q) => Q.stopPropagation(),
                      onMouseDown: (Q) => Q.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-nav",
                              disabled: R <= 0,
                              onClick: (Q) => {
                                Q.stopPropagation(), j(R - 1);
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
                              onClick: (Q) => {
                                Q.stopPropagation(), j(R + 1);
                              },
                              title: "Jump to Next Keyframe (] or Alt+Right)",
                              children: "▶"
                            }
                          ),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: ve }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (Q) => {
                                Q.stopPropagation(), b(null);
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
                                    className: `btn-trans-choice ${(M.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                    onClick: () => a == null ? void 0 : a(R, { transitionType: "smooth" }),
                                    title: "Smooth Bezier transition into keyframe layout",
                                    children: "⚡ Smooth"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-trans-choice ${M.transitionType === "linear" ? "is-active" : ""}`,
                                    onClick: () => a == null ? void 0 : a(R, { transitionType: "linear" }),
                                    title: "Linear transition into keyframe layout",
                                    children: "↗ Linear"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-trans-choice ${M.transitionType === "cut" ? "is-active" : ""}`,
                                    onClick: () => a == null ? void 0 : a(R, { transitionType: "cut" }),
                                    title: "Instant cut into keyframe layout",
                                    children: "✂ Cut"
                                  }
                                )
                              ] })
                            ] }),
                            M.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                              /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION DURATION" }),
                              /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((Q) => /* @__PURE__ */ s.jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-dur-choice ${(M.transitionDurationSec ?? 0.5) === Q ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(R, { transitionDurationSec: Q }),
                                  children: [
                                    Q,
                                    "s"
                                  ]
                                },
                                Q
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
                                  ((Ie = M.layout) == null ? void 0 : Ie.width) || 1920,
                                  "×",
                                  ((Ze = M.layout) == null ? void 0 : Ze.height) || 1080
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "summary-count", children: [
                                  "🖥️ ",
                                  ((Wt = (Ye = M.layout) == null ? void 0 : Ye.placements) == null ? void 0 : Wt.length) || 0,
                                  " Screens"
                                ] })
                              ] }),
                              ((wt = (It = M.layout) == null ? void 0 : It.placements) == null ? void 0 : wt.length) > 0 ? /* @__PURE__ */ s.jsx("div", { className: "summary-feed-tags", children: M.layout.placements.map((Q, D) => /* @__PURE__ */ s.jsx(
                                "span",
                                {
                                  className: "feed-tag",
                                  title: `${Q.stationId} (${Q.displayId || "mon-0"}) • Dim: ${Q.width}×${Q.height} • Pos: (${Q.x}, ${Q.y})`,
                                  children: Q.label || `${Q.stationId} (${Q.displayId || "mon-0"})`
                                },
                                D
                              )) }) : /* @__PURE__ */ s.jsx("span", { className: "no-feeds-hint", children: "No feeds placed on canvas in this keyframe" })
                            ] })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-footer", children: [
                            !F && /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-kf-seek",
                                onClick: (Q) => {
                                  Q.stopPropagation(), j(R);
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
                                onClick: (Q) => {
                                  Q.stopPropagation(), l && l(R), b(null);
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
function Cy({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: c
}) {
  const u = ($) => !r || r <= 0 ? "0%" : `${($ - n) / r * 100}%`, h = (o - n) / r * 100, y = (a - n) / r * 100, m = (l - n) / r * 100, f = m >= -0.2 && m <= 100.2, v = Math.max(0, Math.min(100, m)), I = Math.max(0, h), S = Math.min(100, y), O = Math.max(0, S - I), w = ($) => (j) => {
    j.preventDefault(), j.stopPropagation(), typeof c == "function" && c($, j);
  }, g = h < 1.5, k = y > 98.5, b = h <= 0.2 && h >= -0.2, C = y >= 99.8 && y <= 100.2, E = m >= -0.2 && m < 3.5, N = m > 96.5 && m <= 100.2, p = i.useMemo(() => St(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    O > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${I}%`, width: `${O}%` },
        onMouseDown: w("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${g ? "flipped" : ""} ${b ? "at-edge" : ""}`,
        style: { left: u(o) },
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
        className: `marker out-marker ${k ? "flipped" : ""} ${C ? "at-edge" : ""}`,
        style: { left: u(a) },
        onMouseDown: w("out"),
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
        onMouseDown: w("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${E ? "edge-left" : ""} ${N ? "edge-right" : ""}`, children: p }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const Ey = fi.memo(Cy);
function Sy({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = i.useRef(null);
  if (i.useEffect(() => {
    if (!e) return;
    const m = (f) => {
      f.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e, l]), !e) return null;
  const a = 210, c = 150, u = Math.min(e.x, window.innerWidth - a - 12), h = Math.min(e.y, window.innerHeight - c - 12), y = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: h, left: u },
      onClick: (m) => m.stopPropagation(),
      onContextMenu: (m) => m.preventDefault(),
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
  return _s.createPortal(y, document.body);
}
function by({
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
const My = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function Iy({
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
          const I = await v.json();
          a(I), h.current && h.current(I);
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
  }, [e, t, n, r]), { estimateData: o, isEstimating: c, formatEstimateSize: My };
}
function Ty({
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
  minimapRef: m
}) {
  const [f, v] = i.useState(null), [I, S] = i.useState(null), O = (w, g) => {
    v(w), S({
      target: w,
      startX: g.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: u
    });
  };
  return i.useEffect(() => {
    if (!f) return;
    const w = e * 0.015, g = (b) => {
      if (f === "minimap-viewport" && (m != null && m.current)) {
        const E = m.current.getBoundingClientRect(), p = Math.max(0, Math.min(b.clientX - E.left, E.width)) / E.width * t, $ = Math.max(0, Math.min(p - e / 2, t - e));
        h($);
        return;
      }
      const C = y(b.clientX);
      if (f === "playhead") {
        let E = C;
        Math.abs(E - l) <= w ? E = l : Math.abs(E - a) <= w && (E = a), r(Math.max(0, Math.min(t, E)));
      } else if (f === "in") {
        const E = a - 1e3;
        o(Math.max(0, Math.min(C, E)));
      } else if (f === "out") {
        const E = l + 1e3;
        c(Math.min(t, Math.max(C, E)));
      } else if (f === "range" && I) {
        const E = C - y(I.startX), N = I.initialOut - I.initialIn;
        let p = I.initialIn + E, $ = I.initialOut + E;
        p < 0 ? (p = 0, $ = N) : $ > t && ($ = t, p = t - N), o(p), c($);
      }
    }, k = () => {
      v(null), S(null);
    };
    return window.addEventListener("mousemove", g), window.addEventListener("mouseup", k), () => {
      window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", k);
    };
  }, [
    f,
    I,
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
    m
  ]), { draggingTarget: f, handleStartDrag: O };
}
const fr = 4, pl = 230, fo = 58;
function Cm({
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
  onZoomChange: m,
  onZoomReset: f,
  playheadMs: v = 0,
  setPlayheadMs: I,
  inPointMs: S = 0,
  setInPointMs: O,
  outPointMs: w = 36e5,
  setOutPointMs: g,
  onExport: k,
  recordingSegments: b = {},
  movieBoundaries: C,
  viewportStartMs: E = 0,
  onViewportStartChange: N,
  onEstimateLoaded: p,
  onFitRange: $,
  onJumpViewportTo: j,
  keystrokeMode: _ = "BURN_IN",
  onChangeKeystrokeMode: J,
  keystrokes: M = [],
  showKeystrokes: R = !1,
  showRulerKeystrokes: re = !1,
  onToggleRulerKeystrokes: le,
  _onSplitDirectorSegment: ae,
  _onChangeDirectorSegmentDisplay: F,
  _onResetDirectorSegmentToAuto: Y,
  audioRoutingPlan: T,
  onSplitAudioSegment: B,
  onChangeAudioSegmentStation: U,
  onChangeAudioSegmentGain: ve,
  onFollowVisualFeed: G,
  isAutoFollowAudio: V,
  canvasLayoutTimeline: z,
  activeKfIndex: ge = 0,
  onSelectKeyframe: ye,
  onAddKeyframeAtEpoch: Ne,
  onDeleteKeyframe: Pe,
  onUpdateKeyframeEpoch: Se,
  onUpdateKeyframeTransition: Ie,
  onUpdateKeyframeClockPosition: Ze,
  onToggleDisplayOnCanvas: Ye,
  onUpdateAudioPlan: Wt
}) {
  var Ue, yt;
  const [It, wt] = i.useState(null), [Q, D] = i.useState(0), [Z, P] = i.useState(null), [W, X] = i.useState(!0), H = (me) => {
    var ue, Ee, Fe;
    return ((me == null ? void 0 : me.displays) || (me == null ? void 0 : me.Displays) || ((ue = me == null ? void 0 : me.displayTopology) == null ? void 0 : ue.displays) || ((Ee = me == null ? void 0 : me.DisplayTopology) == null ? void 0 : Ee.Displays) || ((Fe = me == null ? void 0 : me.topology) == null ? void 0 : Fe.displays) || []).length;
  }, [ne, se] = i.useState(() => {
    var me;
    return e.length === 1 && H(e[0]) > 1 ? (me = e[0]) == null ? void 0 : me.id : null;
  });
  i.useEffect(() => {
    var me;
    if (e.length === 1 && !ne && ((me = e[0]) != null && me.id) && H(e[0]) > 1)
      se(e[0].id);
    else if (ne) {
      const ee = e.find((ue) => ue.id === ne);
      (!ee || H(ee) <= 1) && se(null);
    }
  }, [e, ne]);
  const de = i.useRef(null), De = i.useRef(null), ke = h / Math.max(1, y), Xe = Math.ceil(e.length / fr) || 1, ft = i.useMemo(() => {
    const me = Q * fr;
    return e.slice(me, me + fr);
  }, [e, Q]);
  i.useEffect(() => {
    if (!t && !ne) return;
    const me = ne || t, ee = e.findIndex((ue) => ue.id === me);
    if (ee !== -1) {
      const ue = Math.floor(ee / fr);
      ue !== Q && D(ue);
    }
  }, [t, ne, e, Q]);
  const qe = ((Ue = z == null ? void 0 : z.keyframes) == null ? void 0 : Ue[ge]) || ((yt = z == null ? void 0 : z.keyframes) == null ? void 0 : yt[0]), gt = i.useMemo(() => {
    var me;
    return ((me = qe == null ? void 0 : qe.layout) == null ? void 0 : me.placements) || [];
  }, [qe]), ct = i.useMemo(() => e.find((me) => me.id === t) || null, [e, t]), et = (C == null ? void 0 : C.globalFirstMs) ?? null, at = (C == null ? void 0 : C.globalLastMs) ?? null, Ot = i.useMemo(() => (S > 500 || w < h - 500) && w - S >= 1e3, [S, w, h]), Zt = i.useMemo(() => e.map((me) => me.id).sort().join(","), [e]), { estimateData: xt, isEstimating: nt, formatEstimateSize: jt } = Iy({
    stationIdsKey: Zt,
    inPointMs: S,
    outPointMs: w,
    baseEpochMs: c,
    onEstimateLoaded: p
  }), At = i.useCallback((me) => {
    if (!de.current) return E;
    const ee = de.current.getBoundingClientRect(), ue = ee.left + pl, Ee = ee.width - pl - fo;
    if (Ee <= 0) return E;
    const Fe = Math.max(0, Math.min(me - ue, Ee));
    return Math.round(E + Fe / Ee * ke);
  }, [E, ke]), { draggingTarget: Dt, handleStartDrag: ln } = Ty({
    viewportDurationMs: ke,
    totalDurationMs: h,
    playheadMs: v,
    setPlayheadMs: I,
    inPointMs: S,
    setInPointMs: O,
    outPointMs: w,
    setOutPointMs: g,
    viewportStartMs: E,
    setViewportStartMs: N,
    getMsFromClientX: At,
    minimapRef: De
  }), Ct = i.useRef(y);
  Ct.current = y;
  const fn = i.useRef(E);
  fn.current = E;
  const Xt = i.useRef(h);
  Xt.current = h;
  const ze = i.useRef(v);
  ze.current = v, i.useEffect(() => {
    const me = de.current;
    if (!me) return;
    const ee = (ue) => {
      ue.preventDefault(), ue.stopPropagation();
      const Ee = ue.ctrlKey || ue.shiftKey, Fe = Ct.current, tt = fn.current, st = Xt.current, vt = ze.current;
      if (Ee) {
        const ot = Math.abs(ue.deltaX) > Math.abs(ue.deltaY) ? ue.deltaX : ue.deltaY;
        if (ot === 0) return;
        const ut = st / Math.max(1, Fe), zt = Math.max(0, st - ut), _t = ut * 0.08 * (ot > 0 ? 1 : -1);
        N == null || N(Math.max(0, Math.min(zt, tt + _t)));
      } else {
        if (ue.deltaY === 0) return;
        const ut = ue.deltaY < 0 ? 1.25 : 0.8, zt = Math.max(32, st / 2e3), _t = me.getBoundingClientRect(), Gt = _t.left + pl, Qt = _t.width - pl - fo;
        let yn = 0.5;
        if (Qt > 0)
          if (ue.clientX >= Gt && ue.clientX <= _t.right - fo)
            yn = Math.max(0, Math.min(1, (ue.clientX - Gt) / Qt));
          else {
            const en = st / Math.max(1, Fe), Fs = (vt - tt) / en;
            yn = Fs >= 0 && Fs <= 1 ? Fs : 0.5;
          }
        const vn = Math.max(1, Math.min(zt, Math.round(Fe * ut * 100) / 100));
        if (vn === Fe) return;
        const is = st / Fe, qn = st / vn, vs = tt + yn * is - yn * qn, il = Math.max(0, st - qn);
        m == null || m(vn), N == null || N(Math.max(0, Math.min(il, vs)));
      }
    };
    return me.addEventListener("wheel", ee, { passive: !1, capture: !0 }), () => me.removeEventListener("wheel", ee, { capture: !0 });
  }, [m, N]);
  const xe = e.length > 0 && Math.abs(w - S) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: de,
      className: "timeline-board-root",
      onContextMenu: (me) => {
        var ue;
        me.preventDefault();
        const ee = (ue = de.current) == null ? void 0 : ue.getBoundingClientRect();
        !ee || me.clientX - ee.left < pl || me.clientX > ee.right - fo || P({ x: me.clientX, y: me.clientY, targetMs: Math.max(0, Math.min(h, At(me.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            cy,
            {
              baseEpochMs: c,
              timeMode: u,
              totalDurationMs: h,
              inPointMs: S,
              setInPointMs: O,
              outPointMs: w,
              setOutPointMs: g
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                uy,
                {
                  minimapRef: De,
                  baseEpochMs: c,
                  timeMode: u,
                  totalDurationMs: h,
                  viewportStartMs: E,
                  viewportDurationMs: ke,
                  zoomLevel: y,
                  inPointMs: S,
                  outPointMs: w,
                  playheadMs: v,
                  onStartDragMinimap: ln
                }
              ),
              /* @__PURE__ */ s.jsx(
                dy,
                {
                  earliestMediaMs: et,
                  latestMediaMs: at,
                  hasActiveCut: Ot,
                  onJumpToFirst: () => {
                    et !== null && (I == null || I(et), j == null || j(et, "start"));
                  },
                  onJumpToLast: () => {
                    at !== null && (I == null || I(at), j == null || j(at, "end"));
                  },
                  onContextualFit: () => {
                    Ot ? $ == null || $(S, w) : et !== null && at !== null && at > et ? $ == null || $(et, at) : f == null || f();
                  },
                  onResetZoom: f,
                  baseEpochMs: c,
                  timeMode: u,
                  keystrokeMode: _,
                  onChangeKeystrokeMode: J,
                  showRulerKeystrokes: re,
                  onToggleRulerKeystrokes: le
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              iy,
              {
                baseEpochMs: c,
                timeMode: u,
                viewportStartMs: E,
                viewportDurationMs: ke,
                totalDurationMs: h,
                hoverMs: It,
                onHoverChange: wt,
                onSeek: (me) => I == null ? void 0 : I(me),
                inPointMs: S,
                outPointMs: w,
                earliestMediaMs: et,
                movieBoundaries: C,
                stationHostname: (ct == null ? void 0 : ct.hostname) || (ct == null ? void 0 : ct.id) || (ct == null ? void 0 : ct.name),
                activeStationName: (ct == null ? void 0 : ct.displayName) || (ct == null ? void 0 : ct.hostname) || (ct == null ? void 0 : ct.name),
                stations: e,
                showKeystrokes: !!(re ?? R),
                keystrokes: M,
                recordingSegments: b
              }
            ) })
          ] })
        ] }),
        Xe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Q === 0,
              onClick: () => D((me) => Math.max(0, me - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            Q * fr + 1,
            "–",
            Math.min(e.length, (Q + 1) * fr),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Q >= Xe - 1,
              onClick: () => D((me) => Math.min(Xe - 1, me + 1)),
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
            onMouseMove: (me) => {
              if (Dt || !de.current) return;
              const ee = de.current.getBoundingClientRect();
              me.clientX >= ee.left + pl && me.clientX <= ee.right - fo ? wt(At(me.clientX)) : wt(null);
            },
            onMouseLeave: () => !Dt && wt(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => X((me) => !me), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: W ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  W && Xe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Q === 0,
                        onClick: (me) => {
                          me.stopPropagation(), D((ee) => Math.max(0, ee - 1));
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
                      Xe,
                      " (",
                      Q * fr + 1,
                      "–",
                      Math.min(e.length, (Q + 1) * fr),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Q >= Xe - 1,
                        onClick: (me) => {
                          me.stopPropagation(), D((ee) => Math.min(Xe - 1, ee + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !W && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => X(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (gt == null ? void 0 : gt.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var Fe, tt, st, vt, ot;
                    const me = (gt == null ? void 0 : gt.find((ut) => ut.isPrimary || ut.isFocused)) || (gt == null ? void 0 : gt[0]), ee = (me == null ? void 0 : me.stationId) || ((Fe = e[0]) == null ? void 0 : Fe.hostname) || ((tt = e[0]) == null ? void 0 : tt.id), ue = (me == null ? void 0 : me.displayId) || "mon-0";
                    let Ee = [];
                    if (gt && gt.length > 0) {
                      const ut = /* @__PURE__ */ new Map();
                      gt.forEach((zt) => {
                        var Gt;
                        (b[zt.stationId] || b[(Gt = zt.stationId) == null ? void 0 : Gt.toLowerCase()] || []).forEach((Qt) => {
                          const yn = `${Qt.startEpochMs || Qt.start}_${Qt.endEpochMs || Qt.end}`;
                          ut.has(yn) || ut.set(yn, Qt);
                        });
                      }), Ee = Array.from(ut.values());
                    }
                    return Ee.length === 0 && (Ee = b[(st = e[0]) == null ? void 0 : st.id] || b[(vt = e[0]) == null ? void 0 : vt.hostname] || ((ot = e[0]) == null ? void 0 : ot.segments) || []), /* @__PURE__ */ s.jsx(
                      mu,
                      {
                        hostname: ee,
                        displayId: ue,
                        activeSegments: Ee,
                        viewportStartMs: E,
                        viewportDurationMs: ke,
                        baseEpochMs: c,
                        inPointMs: S,
                        outPointMs: w,
                        globalGaps: (xt == null ? void 0 : xt.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                W && (e.length > 0 ? ft.map((me) => {
                  const ee = !!(t && me.id === t), ue = ne === me.id, Ee = o ? o[me.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    xy,
                    {
                      station: me,
                      isExpanded: ue && H(me) > 1,
                      onToggleExpand: () => {
                        H(me) > 1 && se((Fe) => Fe === me.id ? null : me.id);
                      },
                      isAutoDirectorEnabled: Ee,
                      onToggleAutoDirector: a,
                      canvasPlacements: gt,
                      onToggleDisplayOnCanvas: Ye,
                      directorPlan: me.directorPlan,
                      isActive: ee,
                      onSelect: () => n == null ? void 0 : n(me.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: E,
                      viewportDurationMs: ke,
                      inPointMs: S,
                      outPointMs: w,
                      baseEpochMs: c,
                      segments: b[me.id] || b[me.hostname] || me.segments || [],
                      recordingSegments: b,
                      globalGaps: (xt == null ? void 0 : xt.removedGlobalGaps) || []
                    },
                    me.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  wy,
                  {
                    audioPlan: T,
                    stations: e,
                    viewportStartMs: E,
                    viewportDurationMs: ke,
                    baseEpochMs: c,
                    playheadMs: v,
                    onSplitSegment: B,
                    onChangeSegmentStation: U,
                    onChangeSegmentGain: ve,
                    onFollowVisualFeed: G,
                    isAutoFollow: V,
                    timeMode: u,
                    onUpdateAudioPlan: Wt
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  jy,
                  {
                    canvasLayoutTimeline: z,
                    activeKfIndex: ge,
                    onSelectKeyframe: ye,
                    onAddKeyframeAtEpoch: Ne,
                    onDeleteKeyframe: Pe,
                    onUpdateKeyframeEpoch: Se,
                    onUpdateKeyframeTransition: Ie,
                    onUpdateKeyframeClockPosition: Ze,
                    viewportStartMs: E,
                    viewportDurationMs: ke,
                    baseEpochMs: c,
                    totalDurationMs: h,
                    playheadMs: v,
                    inPointMs: S,
                    outPointMs: w,
                    timeMode: u
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                by,
                {
                  isRangeValid: xe,
                  onExport: k,
                  isEstimating: nt,
                  estimateData: xt,
                  formatEstimateSize: jt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ey,
          {
            baseEpochMs: c,
            timeMode: u,
            viewportStartMs: E,
            viewportDurationMs: ke,
            playheadMs: v,
            inPointMs: S,
            outPointMs: w,
            onStartDrag: ln
          }
        ),
        /* @__PURE__ */ s.jsx(
          Sy,
          {
            contextMenu: Z,
            baseEpochMs: c,
            timeMode: u,
            onAction: (me) => {
              Z && (me === "playhead" ? I == null || I(Z.targetMs) : me === "in" ? O == null || O(Math.max(0, Math.min(Z.targetMs, w - 1e3))) : me === "out" && (g == null || g(Math.min(h, Math.max(Z.targetMs, S + 1e3)))), P(null));
            },
            onClose: () => P(null)
          }
        )
      ]
    }
  );
}
function $y({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Ay({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Ry({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Ly({
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
  onFilterModeChange: m,
  filteredCount: f,
  selectedInTabCount: v,
  unselectedInTabCount: I,
  activeTabName: S,
  onSelectAllInScope: O,
  onClearInScope: w,
  viewMode: g = "grid",
  onViewModeChange: k,
  isDrawerMode: b = !1
}) {
  const [C, E] = i.useState(!1), N = y !== "all", p = !S || S.toLowerCase() === "all", $ = p ? "Select All" : `Select ${S}`, j = p ? "Clear All" : `Clear ${S}`;
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
            onChange: (_) => t(_.target.value)
          }
        )
      ] }),
      b && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${C ? "open" : ""} ${N ? "has-filter" : ""}`,
          onClick: () => E(!C),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            N && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !b && k && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${g === "grid" ? "active" : ""}`,
            onClick: () => k("grid"),
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
            onClick: () => k("table"),
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
    l.length > 1 && (b ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (_) => a(_.target.value),
          children: l.map((_) => {
            const J = _.id === "all" ? u.map((R) => R.id) : _.stationIds || [], M = J.filter((R) => h.includes(R)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: _.id, children: [
              _.name,
              " (",
              M,
              "/",
              J.length,
              ")"
            ] }, _.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: O, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: w, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        c && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((_) => {
        const J = o === _.id, M = _.id === "all" ? u.map((le) => le.id) : _.stationIds || [], R = M.length, re = M.filter((le) => h.includes(le)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${J ? "active" : ""}`,
            onClick: () => a(_.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: _.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${re > 0 ? "has-selected" : ""}`, children: [
                re,
                "/",
                R
              ] })
            ]
          },
          _.id
        );
      }) })
    ] })),
    (!b || C) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${b ? "is-collapsed-tray" : ""}`, children: [
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
              I,
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
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: w, children: [
          "✕ ",
          j
        ] })
      ] })
    ] })
  ] });
}
function Oy({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: a = "table"
}) {
  if (r === 0) return null;
  const c = Math.min((e - 1) * n + 1, r), u = Math.min(e * n, r), h = a === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], y = t <= 1, m = (f) => {
    if (f === n) return !0;
    const v = Math.min(n, r), I = Math.min(f, r), S = Math.ceil(r / n), O = Math.ceil(r / f);
    return v !== I || S !== O;
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
        const v = n === f, I = !m(f);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${v ? "active" : ""} ${I ? "redundant-disabled" : ""}`,
            disabled: I,
            onClick: () => o(f),
            title: I ? `All stations already fit on screen (Total: ${r})` : `Show ${f} per page`,
            children: f
          },
          f
        );
      }) })
    ] })
  ] });
}
function Dy({
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
  const h = u.slice(0, l), y = u.slice(l), m = y.length > 0;
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
              onClick: (I) => {
                I.stopPropagation(), n(f.id);
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
const Em = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Kh(e, t, n = Em) {
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
function Py(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function _y(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function Fy(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Em) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), c = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), u = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), h = (e == null ? void 0 : e.fps) || 30, y = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? _y(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const N = Kh(0, !0, r);
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
  const m = l, f = l + o, v = [];
  for (const N of t) {
    const p = Math.max(N.startEpoch, m), $ = Math.min(N.endEpoch, f);
    $ > p && v.push({ startEpoch: p, endEpoch: $ });
  }
  v.sort((N, p) => N.startEpoch - p.endEpoch);
  const I = [];
  for (const N of v)
    if (I.length === 0)
      I.push({ ...N });
    else {
      const p = I[I.length - 1];
      N.startEpoch <= p.endEpoch + 1e3 ? p.endEpoch = Math.max(p.endEpoch, N.endEpoch) : I.push({ ...N });
    }
  let S = 0;
  for (const N of I)
    S += N.endEpoch - N.startEpoch;
  const O = o > 0 ? S / o * 100 : 0, w = O > 0 && O < 1 ? Number(O.toFixed(1)) : Math.min(100, Math.round(O)), g = [];
  let k = m, b = 0;
  for (const N of I) {
    if (N.startEpoch > k + 2e3) {
      const j = (N.startEpoch - k) / o * 100, _ = (k - m) / o * 100;
      g.push({
        type: "gap",
        startPct: Math.max(0, _),
        widthPct: Math.min(100, j)
      }), b++;
    }
    const p = (N.endEpoch - N.startEpoch) / o * 100, $ = (N.startEpoch - m) / o * 100;
    g.push({
      type: "rec",
      startPct: Math.max(0, $),
      widthPct: Math.min(100, p)
    }), k = N.endEpoch;
  }
  if (k < f - 2e3) {
    const N = (f - k) / o * 100, p = (k - m) / o * 100;
    g.push({
      type: "gap",
      startPct: Math.max(0, p),
      widthPct: Math.min(100, N)
    }), b++;
  }
  const C = b > 0 || w < 100, E = Kh(w, C, r);
  return {
    coveragePct: w,
    recordedDuration: Py(S),
    totalRecordedMs: S,
    hasAudio: a,
    audioChannels: c,
    resolution: u,
    fps: h,
    fileSize: y,
    hasGaps: C,
    gapsCount: b,
    trafficStatus: E,
    segments: g.length > 0 ? g : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const By = Object.freeze([]), Uy = 12;
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
  onOpenRangeModal: m,
  systemTabs: f = By,
  recordingSegments: v = {},
  baseEpochMs: I = 0,
  durationMs: S = 0
}) {
  const [O, w] = i.useState([]), [g, k] = i.useState("all"), [b, C] = i.useState(""), [E, N] = i.useState(!0), [p, $] = i.useState("all"), [j, _] = i.useState(null), [J, M] = i.useState(!1), [R, re] = i.useState(15), [le, ae] = i.useState(8), [F, Y] = i.useState(1), T = i.useRef(!1), B = i.useRef(null), U = u && r.length === 0, ve = r.length === 0 && !u;
  let G = "is-closed";
  c || ve || U ? G = "is-full-width" : e && (G = "is-open"), i.useLayoutEffect(() => {
    const P = () => {
      if (!B.current) return;
      const X = B.current.clientHeight;
      if (X <= 0) return;
      const H = B.current.querySelector(".station-row, .hub-table-row"), ne = H ? H.offsetHeight : 40;
      if (ne > 0) {
        const de = Math.floor(X / ne) - 2, ke = [5, 10, 15, 20, 25, 30].filter((Xe) => Xe <= de).pop() || 5;
        re(ke);
      }
      const se = B.current.clientWidth;
      if (se > 0) {
        const ke = Math.max(1, Math.floor((se + 12) / 252)), ft = Math.max(1, Math.floor((X + 12) / (175 + 12))), qe = Math.max(ke * ft, ke);
        ae(qe);
      }
    };
    P(), window.addEventListener("resize", P);
    const W = new ResizeObserver(P);
    return B.current && W.observe(B.current), () => {
      window.removeEventListener("resize", P), W.disconnect();
    };
  }, [j, r.length]), i.useEffect(() => {
    if (f && f.length > 0) {
      w(f);
      return;
    }
    if (T.current || !e && !c) return;
    T.current = !0;
    let P = !0;
    return (async () => {
      M(!0);
      try {
        const X = await fetch("/api/v1/dashboard/tabs");
        if (X.ok && P) {
          const H = await X.json();
          Array.isArray(H) && w(H);
        }
      } catch (X) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", X);
      } finally {
        P && M(!1);
      }
    })(), () => {
      P = !1;
    };
  }, [e, c, f]);
  const V = i.useMemo(() => {
    const P = O.length > 0 ? O : f;
    if (P && P.length > 0) {
      const W = P.map((X) => {
        const H = X.hostnames || X.assignedHostnames || X.stations || X.stationIds || [], ne = r.filter((se) => {
          const de = (se.hostname || se.name || "").trim().toLowerCase();
          return H.some((De) => typeof De == "string" ? De.trim().toLowerCase() === de || de.includes(De.trim().toLowerCase()) : (De.hostname || De.name || "").trim().toLowerCase() === de);
        }).map((se) => se.id);
        return {
          id: String(X.id || X.tabId || X.name),
          name: X.name || "Tab",
          stationIds: ne
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((X) => X.id) },
        ...W.filter((X) => X.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((W) => W.id) }];
  }, [O, f, r]), z = i.useMemo(() => V.find((P) => P.id === g) || V[0], [V, g]), ge = i.useMemo(() => !z || z.id === "all" ? r.map((P) => P.id) : z.stationIds || [], [z, r]), ye = i.useMemo(() => !v || Object.keys(v).length === 0 ? r.filter((P) => P.isLoaded || P.segments && P.segments.length > 0).length : r.filter((P) => v[P.id] !== void 0 || P.isLoaded).length, [r, v]), Ne = i.useMemo(() => !!(h || u && r.length > 0 || r.length > 0 && ye < r.length && Object.keys(v).length > 0), [h, u, r.length, ye, v]), Pe = i.useMemo(() => {
    const P = /* @__PURE__ */ new Map(), W = { baseEpochMs: I, durationMs: S };
    for (const X of r) {
      const ne = !(v && v[X.id] !== void 0 || X.isLoaded === !0 || X.segments && X.segments.length > 0) && (Ne || u || h), se = v && v[X.id] || X.segments || [], de = Fy(X, se, W);
      P.set(X.id, {
        ...de,
        hasAudio: X.hasAudio !== void 0 ? X.hasAudio : de == null ? void 0 : de.hasAudio,
        audioLabel: X.audioLabel || (X.hasAudio ? "AAC" : (de == null ? void 0 : de.audioLabel) || "NONE"),
        audioChannels: X.audioChannels ? X.audioChannels === 1 ? "Mono" : "Stereo" : de == null ? void 0 : de.audioChannels,
        feedSpec: X.feedSpec || (de == null ? void 0 : de.feedSpec) || `${X.resolution || "1080p"} • ${X.fps || 30}fps`,
        resolution: X.resolution || (de == null ? void 0 : de.resolution) || "1080p",
        fps: X.fps || (de == null ? void 0 : de.fps) || 30,
        isLoading: ne
      });
    }
    return P;
  }, [r, v, I, S, Ne, u, h]), Se = i.useMemo(() => r.filter((P) => {
    const W = Pe.get(P.id), X = v && v[P.id] && v[P.id].length > 0 || P.segments && P.segments.length > 0, H = W && (W.coveragePct > 0 || W.totalRecordedMs > 0), ne = typeof P.recordingsCount == "number" && P.recordingsCount > 0;
    return W && !W.isLoading ? H || X : ne || X;
  }), [r, Pe, v]), Ie = i.useMemo(() => Se.filter((P) => {
    if (z.id !== "all" && !ge.includes(P.id) || !(P.displayName || P.hostname || P.name || "").toLowerCase().includes(b.toLowerCase())) return !1;
    const X = l.includes(P.id), H = Pe.get(P.id);
    return p === "selected" ? X : p === "unselected" ? !X : p === "gaps" ? H == null ? void 0 : H.hasGaps : p === "audio" ? H == null ? void 0 : H.hasAudio : !0;
  }).sort((P, W) => E ? (P.displayName || P.hostname || "").localeCompare(W.displayName || W.hostname || "") : 0), [Se, z, ge, b, p, l, E, Pe]), Ze = i.useMemo(() => j !== null ? j : Ie.length > Uy ? "table" : "grid", [j, Ie.length]), Ye = Ze === "table" ? R : le, Wt = Math.max(1, Math.ceil(Ie.length / Ye));
  i.useEffect(() => {
    Y(1);
  }, [g, b, p, Ze]), i.useEffect(() => {
    F > Wt && Y(Wt);
  }, [Wt, F]);
  const It = i.useMemo(() => {
    if (G !== "is-full-width") return Ie;
    const P = (F - 1) * Ye;
    return Ie.slice(P, P + Ye);
  }, [Ie, F, Ye, G]), wt = () => {
    if (!a) return;
    const P = z.id === "all" ? Ie.map((W) => W.id) : ge;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...P])));
  }, Q = () => {
    if (!a) return;
    const P = new Set(
      z.id === "all" ? Ie.map((W) => W.id) : ge
    );
    a(l.filter((W) => !P.has(W)));
  }, D = ge.filter((P) => l.includes(P)).length, Z = Ie.filter((P) => l.includes(P.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${G}`, children: [
    G !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => G === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            Ne && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              ye,
              "/",
              r.length
            ] })
          ] })
        ] }),
        G === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      G === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: wt,
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
            onClick: Q,
            disabled: Z === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                Z,
                ")"
              ] })
            ]
          }
        )
      ] }),
      Ne && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
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
    ] }) : ve ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: m, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: G === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      G === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      G === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${Ne ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: Ne ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: Ne ? `ANALYZING TIMELINE ARCHIVES • ${ye} OF ${Se.length} STATIONS SYNCED (${Se.length > 0 ? Math.min(100, Math.round(ye / Se.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${Se.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: Ne ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
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
        Ly,
        {
          searchTerm: b,
          onSearchChange: C,
          sortAlpha: E,
          onToggleSort: () => N(!E),
          effectiveTabs: V,
          selectedTabId: g,
          onSelectTab: (P) => {
            k(P), _(null);
          },
          isLoadingTabs: J,
          allStations: Se,
          selectedStationIds: l,
          filterMode: p,
          onFilterModeChange: $,
          filteredCount: Ie.length,
          selectedInTabCount: D,
          unselectedInTabCount: ge.length - D,
          activeTabName: z.name,
          onSelectAllInScope: wt,
          onClearInScope: Q,
          viewMode: Ze,
          onViewModeChange: G === "is-full-width" ? _ : null,
          isDrawerMode: G !== "is-full-width"
        }
      ),
      G === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: wt,
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
              onClick: Q,
              disabled: Z === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  Z,
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
      G === "is-full-width" && Ze === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${G === "is-full-width" ? Ze === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: It.map((P) => {
            const W = l.includes(P.id), X = Pe.get(P.id);
            return G === "is-full-width" ? Ze === "grid" ? /* @__PURE__ */ s.jsx(
              $y,
              {
                station: P,
                isSelected: W,
                onToggle: o,
                meta: X
              },
              P.id
            ) : /* @__PURE__ */ s.jsx(
              Ay,
              {
                station: P,
                isSelected: W,
                onToggle: o,
                meta: X
              },
              P.id
            ) : /* @__PURE__ */ s.jsx(
              Ry,
              {
                station: P,
                isSelected: W,
                onToggle: o,
                meta: X
              },
              P.id
            );
          })
        }
      ),
      G === "is-full-width" && /* @__PURE__ */ s.jsx(
        Oy,
        {
          currentPage: F,
          totalPages: Wt,
          pageSize: Ye,
          totalItems: Ie.length,
          onPageChange: Y,
          onPageSizeChange: (P) => {
            Ze === "table" ? re(P) : ae(P), Y(1);
          },
          viewMode: Ze
        }
      ),
      G === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Dy,
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
const Dn = (e) => String(e).padStart(2, "0"), Hy = [
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
], zy = [
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
  showSeconds: l = !0,
  className: o = ""
}) {
  const [a, c] = i.useState(e), [u, h] = i.useState(null), y = i.useRef(null), { h: m, m: f, s: v } = i.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const $ = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, $[0] || 0)),
      m: Math.min(59, Math.max(0, $[1] || 0)),
      s: Math.min(59, Math.max(0, $[2] || 0))
    };
  }, [e]), I = i.useMemo(() => m >= 12, [m]);
  i.useEffect(() => {
    c(e);
  }, [e]);
  const S = () => {
    const j = a.replace(/[^0-9:]/g, "").trim().split(":").filter((re) => re.length > 0);
    let _ = 0, J = 0, M = 0;
    j.length >= 1 && (_ = Math.min(23, Math.max(0, parseInt(j[0], 10) || 0))), j.length >= 2 && (J = Math.min(59, Math.max(0, parseInt(j[1], 10) || 0))), j.length >= 3 && l && (M = Math.min(59, Math.max(0, parseInt(j[2], 10) || 0)));
    const R = l ? `${Dn(_)}:${Dn(J)}:${Dn(M)}` : `${Dn(_)}:${Dn(J)}`;
    c(R), t && t(R, { h: _, m: J, s: M });
  }, O = ($) => {
    let j = m;
    $ === "AM" && m >= 12 ? j = m - 12 : $ === "PM" && m < 12 && (j = m + 12);
    const _ = l ? `${Dn(j)}:${Dn(f)}:${Dn(v)}` : `${Dn(j)}:${Dn(f)}`;
    c(_), t && t(_, { h: j, m: f, s: v });
  }, w = i.useCallback(($, j) => {
    if (!y.current) return null;
    const _ = y.current.getBoundingClientRect(), J = _.left + _.width / 2, M = _.top + _.height / 2, R = $.clientX - J, re = $.clientY - M;
    let le = Math.atan2(re, R) * 180 / Math.PI + 90;
    if (le < 0 && (le += 360), j === "hours") {
      const ae = Math.round(le / 30) % 12;
      return I ? ae === 0 ? 12 : ae + 12 : ae === 0 ? 0 : ae;
    }
    return Math.round(le / 6) % 60;
  }, [I]), g = i.useCallback(($, j) => {
    let _ = m, J = f, M = v;
    $ === "hours" ? _ = j : $ === "minutes" ? J = j : $ === "seconds" && (M = j);
    const R = l ? `${Dn(_)}:${Dn(J)}:${Dn(M)}` : `${Dn(_)}:${Dn(J)}`;
    c(R), t && t(R, { h: _, m: J, s: M });
  }, [m, f, v, l, t]), k = ($, j) => {
    j.preventDefault(), j.stopPropagation(), h($);
    const _ = w(j, $);
    _ !== null && g($, _);
  };
  i.useEffect(() => {
    if (!u) return;
    const $ = (_) => {
      const J = w(_, u);
      J !== null && g(u, J);
    }, j = () => {
      h(null);
    };
    return window.addEventListener("pointermove", $), window.addEventListener("pointerup", j), () => {
      window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", j);
    };
  }, [u, w, g]);
  const b = i.useMemo(() => m % 12 * 30, [m]), C = i.useMemo(() => f % 60 * 6, [f]), E = i.useMemo(() => v % 60 * 6, [v]), N = I ? zy : Hy, p = i.useMemo(() => {
    const $ = [];
    for (let j = 0; j < 60; j++) {
      const _ = (j * 6 - 90) * (Math.PI / 180), J = j % 5 === 0, M = 104, R = J ? 93 : 98;
      $.push({
        index: j,
        x1: 110 + R * Math.cos(_),
        y1: 110 + R * Math.sin(_),
        x2: 110 + M * Math.cos(_),
        y2: 110 + M * Math.sin(_),
        isMajor: J
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
              className: `btn-period ${I ? "" : "active"}`,
              onClick: () => O("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${I ? "active" : ""}`,
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
            onBlur: S,
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
          N.map(($) => {
            const j = ($.angle - 90) * (Math.PI / 180), _ = 76, J = 110 + _ * Math.cos(j), M = 110 + _ * Math.sin(j), R = m === $.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: J,
                y: M,
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
                    onPointerDown: ($) => k("hours", $)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${u === "minutes" ? "dragging" : ""}`,
              transform: `rotate(${C} 110 110)`,
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
                    onPointerDown: ($) => k("minutes", $)
                  }
                )
              ]
            }
          ),
          l && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${u === "seconds" ? "dragging" : ""}`,
              transform: `rotate(${E} 110 110)`,
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
                    onPointerDown: ($) => k("seconds", $)
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
const wa = 7 * 24 * 60 * 60 * 1e3, Jt = (e) => String(e).padStart(2, "0");
function Ky({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [c, u] = i.useState(""), [h, y] = i.useState(""), [m, f] = i.useState("00:00:00"), [v, I] = i.useState("00:00:00"), [S, O] = i.useState(() => /* @__PURE__ */ new Date()), [w, g] = i.useState(null), [k, b] = i.useState([]), [C, E] = i.useState(!1), [N, p] = i.useState(""), [$, j] = i.useState([]), _ = i.useMemo(() => new Set($), [$]), [J, M] = i.useState(1), [R, re] = i.useState(2), [le, ae] = i.useState(null);
  i.useEffect(() => {
    if (!e) return;
    let Q = !0;
    return (async () => {
      try {
        const Z = await fetch(`/api/v1/extractor-advanced/recording-dates?timeMode=${o}`);
        if (Z.ok) {
          const P = await Z.json();
          Q && Array.isArray(P) && j(P);
        }
      } catch (Z) {
        console.warn("[MasterTimeRangeModal] Failed to fetch recording dates:", Z);
      }
    })(), () => {
      Q = !1;
    };
  }, [e, o]);
  const F = i.useCallback(() => {
    try {
      const Q = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (Q) {
        const D = JSON.parse(Q);
        Array.isArray(D) && b(D);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((Q) => Q.ok ? Q.json() : null).then((Q) => {
      Array.isArray(Q) && Q.length > 0 && b(Q);
    }).catch(() => {
    });
  }, []);
  i.useEffect(() => {
    if (!e) return;
    F();
    let Q = n == null ? void 0 : n.startEpochMs, D = n == null ? void 0 : n.endEpochMs;
    if (!Q || isNaN(Q))
      if (n != null && n.start) {
        const W = String(n.start).trim();
        if (W.includes("T")) {
          const [X, H] = W.split("T");
          Q = Vr(X, H.substring(0, 8), o);
        } else if (W.includes(" ")) {
          const [X, H] = W.split(" ");
          Q = Vr(X, H.substring(0, 8), o);
        } else
          Q = Date.now() - 24 * 3600 * 1e3;
      } else
        D = Date.now(), Q = D - 24 * 3600 * 1e3;
    if (!D || isNaN(D))
      if (n != null && n.end) {
        const W = String(n.end).trim();
        if (W.includes("T")) {
          const [X, H] = W.split("T");
          D = Vr(X, H.substring(0, 8), o);
        } else if (W.includes(" ")) {
          const [X, H] = W.split(" ");
          D = Vr(X, H.substring(0, 8), o);
        } else
          D = (Q || Date.now()) + 24 * 3600 * 1e3;
      } else
        D = (Q || Date.now()) + 24 * 3600 * 1e3;
    ae(null);
    const Z = Jr(Q, o), P = Jr(D, o);
    u(`${Z.year}-${Jt(Z.month)}-${Jt(Z.day)}`), y(`${P.year}-${Jt(P.month)}-${Jt(P.day)}`), f(`${Jt(Z.hour)}:${Jt(Z.minute)}:${Jt(Z.second)}`), I(`${Jt(P.hour)}:${Jt(P.minute)}:${Jt(P.second)}`), O(new Date(Date.UTC(Z.year, Z.month - 1, 1)));
  }, [e, n, o, F]);
  const Y = i.useCallback(() => {
    c && !h && y(c);
  }, [c, h]), T = h || c, B = i.useMemo(() => c ? `${c}T${m}` : "", [c, m]), U = i.useMemo(() => T ? `${T}T${v}` : "", [T, v]), ve = i.useMemo(() => {
    const Q = {};
    return k.forEach((D) => {
      const Z = D.startTime || D.start, P = D.endTime || D.end || Z;
      if (!Z) return;
      const W = String(Z).substring(0, 10), X = String(P).substring(0, 10), [H, ne, se] = W.split("-").map(Number), [de, De, ke] = X.split("-").map(Number);
      if (isNaN(H) || isNaN(ne) || isNaN(se) || isNaN(de) || isNaN(De) || isNaN(ke)) return;
      let Xe = new Date(Date.UTC(H, ne - 1, se));
      const ft = new Date(Date.UTC(de, De - 1, ke));
      for (; Xe.getTime() <= ft.getTime(); ) {
        const qe = `${Xe.getUTCFullYear()}-${Jt(Xe.getUTCMonth() + 1)}-${Jt(Xe.getUTCDate())}`;
        Q[qe] || (Q[qe] = []), Q[qe].push(D), Xe.setUTCDate(Xe.getUTCDate() + 1);
      }
    }), Q;
  }, [k]), G = async (Q, D) => {
    if (D && D.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const Z = k.filter((P) => (P.id || P.startTime) !== Q);
    b(Z);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(Z)), localStorage.setItem("itb_bookmarks", JSON.stringify(Z)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: Z }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${Q}`, { method: "DELETE" });
    } catch {
    }
  }, V = (Q) => {
    const D = Q.startTime || Q.start, Z = Q.endTime || Q.end;
    if (!D || !Z) return;
    const P = D.substring(0, 10), W = D.includes("T") ? D.split("T")[1].substring(0, 8) : "00:00:00", X = Z.substring(0, 10), H = Z.includes("T") ? Z.split("T")[1].substring(0, 8) : "23:59:59";
    u(P), y(X), f(W), I(H);
    const [ne, se] = P.split("-").map(Number);
    O(new Date(Date.UTC(ne, se - 1, 1))), E(!1);
  }, z = (Q) => {
    l ? (l(Q), t && t()) : V(Q);
  }, ge = i.useMemo(() => {
    if (o === "UTC" || !B.includes("T")) return { isAmbiguous: !1 };
    const [Q, D] = B.split("T");
    return ui(Q, D);
  }, [B, o]), ye = i.useMemo(() => {
    if (o === "UTC" || !U.includes("T")) return { isAmbiguous: !1 };
    const [Q, D] = U.split("T");
    return ui(Q, D);
  }, [U, o]), Ne = i.useMemo(() => {
    if (!c || !T) return null;
    const Q = Vr(c, m, o, J), D = Vr(T, v, o, R);
    return Q === null || D === null || isNaN(Q) || isNaN(D) ? null : { startEpoch: Q, endEpoch: D, durationMs: D - Q };
  }, [c, m, T, v, o, J, R]), Pe = i.useMemo(() => !Ne || Ne.durationMs <= 0 ? [] : hm(Ne.startEpoch, Ne.endEpoch), [Ne]), Se = i.useMemo(() => {
    if (!Ne || Ne.durationMs <= 0) return "0h";
    const Q = Ne.durationMs / (1e3 * 60 * 60);
    return Q >= 24 ? `${(Q / 24).toFixed(1)}d (${Q.toFixed(0)}h)` : `${Q.toFixed(1)}h`;
  }, [Ne]), Ie = i.useMemo(() => {
    const Q = S.getUTCFullYear(), D = S.getUTCMonth(), Z = new Date(Date.UTC(Q, D, 1)).getUTCDay(), P = new Date(Date.UTC(Q, D + 1, 0)).getUTCDate(), W = [];
    for (let X = 0; X < Z; X++) W.push(null);
    for (let X = 1; X <= P; X++) W.push(`${Q}-${Jt(D + 1)}-${Jt(X)}`);
    return W;
  }, [S]), Ze = (Q) => {
    if (Q) {
      if (ae(null), !c || c && h)
        u(Q), y("");
      else if (c && !h)
        if (Q < c)
          u(Q), y("");
        else {
          const D = (/* @__PURE__ */ new Date(c + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(Q + "T00:00:00Z")).getTime() - D > wa) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const P = new Date(D + wa);
            y(`${P.getUTCFullYear()}-${Jt(P.getUTCMonth() + 1)}-${Jt(P.getUTCDate())}`);
          } else
            y(Q);
        }
    }
  }, Ye = (Q, D) => {
    ae(D);
    const Z = Date.now(), P = Z - Q, W = Jr(P, o), X = Jr(Z, o);
    u(`${W.year}-${Jt(W.month)}-${Jt(W.day)}`), y(`${X.year}-${Jt(X.month)}-${Jt(X.day)}`), f(`${Jt(W.hour)}:${Jt(W.minute)}:${Jt(W.second)}`), I(`${Jt(X.hour)}:${Jt(X.minute)}:${Jt(X.second)}`), O(new Date(Date.UTC(W.year, W.month - 1, 1)));
  }, Wt = () => {
    if (Y(), !Ne || isNaN(Ne.startEpoch) || isNaN(Ne.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (Ne.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (Ne.durationMs > wa) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: B,
      end: U,
      startEpochMs: Ne.startEpoch,
      endEpochMs: Ne.endEpoch,
      durationMs: Ne.durationMs,
      timeMode: o
    }), t && t();
  }, It = i.useMemo(() => {
    if (!N.trim()) return k;
    const Q = N.toLowerCase();
    return k.filter(
      (D) => (D.title || D.name || "").toLowerCase().includes(Q) || (D.startTime || "").includes(Q)
    );
  }, [k, N]);
  if (!e) return null;
  const wt = o === "UTC";
  return _s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (Q) => Q.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${wt ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: wt ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${wt ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${wt ? "active" : ""}`,
                  onClick: () => a("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${C ? "active" : ""}`,
                onClick: () => E(!C),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: k.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      Pe.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Pe.map((Q) => `${Q.description} (${Q.labelBefore} ➔ ${Q.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${le === "7d" ? "active" : ""}`,
            onClick: () => Ye(7 * 24 * 3600 * 1e3, "7d"),
            children: [
              "7d Week Max ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${le === "3d" ? "active" : ""}`,
            onClick: () => Ye(3 * 24 * 3600 * 1e3, "3d"),
            children: [
              "3d Block ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${le === "24h" ? "active" : ""}`,
            onClick: () => Ye(24 * 3600 * 1e3, "24h"),
            children: [
              "24h Day ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${le === "8h" ? "active" : ""}`,
            onClick: () => Ye(8 * 3600 * 1e3, "8h"),
            children: [
              "8h Shift ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        )
      ] }),
      C && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
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
                onChange: (Q) => p(Q.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            It.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: It.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : It.map((Q) => {
          var X;
          const D = Q.id || Q.startTime, Z = Q.title || Q.name || "Untitled Mission", P = (Q.startTime || "").replace("T", " "), W = (Q.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => V(Q), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: Z }),
                Q.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  Q.cutStationName
                ] }),
                ((X = Q.stationIds) == null ? void 0 : X.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  Q.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                P,
                " ➔ ",
                W
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (H) => {
                    H.stopPropagation(), V(Q);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (H) => {
                    H.stopPropagation(), z(Q);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (H) => G(D, H),
                  children: "✕"
                }
              )
            ] })
          ] }, D);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: S.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => O((Q) => new Date(Date.UTC(Q.getUTCFullYear(), Q.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => O((Q) => new Date(Date.UTC(Q.getUTCFullYear(), Q.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Ie.map((Q, D) => {
            if (!Q) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${D}`);
            const Z = parseInt(Q.split("-")[2], 10), P = Q === c, W = Q === (h || c), X = h || w, H = c && X && Q > c && Q < X, ne = ve[Q], se = !!(ne && ne.length > 0), de = _.has(Q);
            let De = "";
            return se && (De += `${ne.length} Bookmark(s) on this date`), de && (De += (De ? " • " : "") + "Recordings available"), /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${P ? "start-edge" : ""} ${W ? "end-edge" : ""} ${H ? "in-range" : ""} ${se ? "has-bookmark" : ""} ${de ? "has-recordings" : ""}`,
                onClick: () => Ze(Q),
                onMouseEnter: () => !h && c && g(Q),
                onMouseLeave: () => g(null),
                title: De || void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: Z }),
                  de && /* @__PURE__ */ s.jsx("span", { className: "cal-cell-recording-dot", "aria-label": "Recordings available" }),
                  se && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (ke) => {
                        ke.stopPropagation(), E(!0), p(Q);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        ne.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: ne.length })
                      ]
                    }
                  )
                ]
              },
              Q
            );
          }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "cal-indicators-legend", children: [
            /* @__PURE__ */ s.jsxs("span", { className: "legend-item recordings", children: [
              /* @__PURE__ */ s.jsx("span", { className: "legend-dot green" }),
              " Recordings"
            ] }),
            k.length > 0 && /* @__PURE__ */ s.jsxs("span", { className: "legend-item bookmarks", children: [
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: Y, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Vh,
            {
              label: "START TIME (FROM)",
              value: m,
              onChange: (Q) => {
                Y(), f(Q), ae(null);
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
              onChange: (Q) => {
                Y(), I(Q), ae(null);
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
                className: J === 1 ? "active" : "",
                onClick: () => M(1),
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
                className: J === 2 ? "active" : "",
                onClick: () => M(2),
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
                onClick: () => re(1),
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
                onClick: () => re(2),
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
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: Ne && Ne.durationMs > wa ? "#f43f5e" : "#22d3ee" }, children: Se }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Pe.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Wt, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Sm = "extractor_incident_bookmarks_fallback", Vy = ["itb_studio_bookmarks", "itb_bookmarks", Sm];
function Yy({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, c] = i.useState([]), [u, h] = i.useState(""), [y, m] = i.useState(!1), [f, v] = i.useState(!1), [I, S] = i.useState(null), [O, w] = i.useState(""), g = i.useCallback((M) => {
    Vy.forEach((R) => {
      try {
        localStorage.setItem(R, JSON.stringify(M));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: M }));
  }, []), k = i.useCallback(async () => {
    m(!0);
    try {
      const M = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (M.ok) {
        const R = await M.json(), re = Array.isArray(R) ? R : [];
        c(re), g(re);
        return;
      }
    } catch (M) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", M);
    } finally {
      m(!1);
    }
    try {
      const M = localStorage.getItem(Sm) || localStorage.getItem("itb_studio_bookmarks");
      M && c(JSON.parse(M));
    } catch {
    }
  }, [g]);
  if (i.useEffect(() => {
    e && k();
  }, [e, k]), !e) return null;
  const b = async () => {
    var G, V, z, ge, ye, Ne;
    if (!u.trim() || f) return;
    const M = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((G = n == null ? void 0 : n.timeRange) != null && G.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), R = (n == null ? void 0 : n.inPointMs) ?? 0, re = (n == null ? void 0 : n.outPointMs) ?? (((V = n == null ? void 0 : n.timeRange) == null ? void 0 : V.durationMs) || 0), le = (n == null ? void 0 : n.playheadMs) ?? R, ae = M + R, F = M + re, Y = M + le, T = (n == null ? void 0 : n.selectedStationIds) || [], B = (n == null ? void 0 : n.selectedStationNames) || [], U = ((z = n == null ? void 0 : n.allStationIds) == null ? void 0 : z.length) > 0 ? n.allStationIds : T, ve = {
      title: u.trim(),
      startTime: ((ge = n == null ? void 0 : n.timeRange) == null ? void 0 : ge.start) || "",
      endTime: ((ye = n == null ? void 0 : n.timeRange) == null ? void 0 : ye.end) || "",
      baseEpochMs: M,
      timelineBaseEpochMs: M,
      inPointMs: R,
      outPointMs: re,
      playheadMs: le,
      inEpochMs: ae,
      outEpochMs: F,
      playheadEpochMs: Y,
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
      const Pe = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ve)
      });
      if (Pe.ok) {
        const Se = await Pe.json(), Ze = [{
          ...ve,
          ...Se.bookmark || {},
          inEpochMs: ae,
          outEpochMs: F,
          playheadEpochMs: Y,
          selectedStationIds: T,
          selectedStationNames: B,
          allStationIds: U,
          id: ((Ne = Se.bookmark) == null ? void 0 : Ne.id) || Se.id || `bm_${Date.now()}`
        }, ...a];
        c(Ze), g(Ze), h("");
      } else
        throw new Error(`Server returned ${Pe.status}`);
    } catch (Pe) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Pe);
      const Ie = [{
        ...ve,
        inEpochMs: ae,
        outEpochMs: F,
        playheadEpochMs: Y,
        selectedStationIds: T,
        selectedStationNames: B,
        allStationIds: U,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      c(Ie), g(Ie), h("");
    } finally {
      v(!1);
    }
  }, C = async (M, R) => {
    if (R.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const re = a.filter((le) => (le.id || le.startTime) !== M);
    c(re), g(re);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${M}`, { method: "DELETE" });
    } catch (le) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", le);
    }
  }, E = (M, R) => {
    R.stopPropagation(), S(M.id || M.startTime), w(M.title || M.name || "");
  }, N = async (M, R) => {
    if (R && R.stopPropagation(), !O.trim()) return;
    const re = a.find((F) => (F.id || F.startTime) === M), le = O.trim(), ae = a.map(
      (F) => (F.id || F.startTime) === M ? { ...F, title: le, name: le } : F
    );
    c(ae), g(ae), S(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${M}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...re, title: le })
      });
    } catch (F) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", F);
    }
  }, p = (M) => {
    M.stopPropagation(), S(null);
  }, $ = (M) => !M || isNaN(M) ? "--:--:--" : St(M, o), j = (M) => {
    const R = M.startTime || M.StartTime, re = M.endTime || M.EndTime;
    if (!R) return "--";
    const le = String(R).replace("T", " ").substring(0, 19), ae = re ? String(re).replace("T", " ").substring(0, 19) : le;
    return `${le} ➔ ${ae}`;
  }, _ = (M) => {
    let R = M.inEpochMs || M.InEpochMs, re = M.outEpochMs || M.OutEpochMs;
    if (!R || !re) {
      const le = M.timelineBaseEpochMs || M.baseEpochMs || (M.startTime ? new Date(String(M.startTime).replace(" ", "T")).getTime() : 0), ae = M.inPointMs ?? M.InPointMs, F = M.outPointMs ?? M.OutPointMs;
      le && typeof ae == "number" && typeof F == "number" && (ae > 0 || F > 0) && (R = le + ae, re = le + F);
    }
    if (R && re && !isNaN(R) && !isNaN(re) && R > 0) {
      const le = $(R), ae = $(re), F = Math.max(0, re - R), Y = Math.floor(F / 6e4), T = Math.floor(Y / 60), B = Y % 60, U = T > 0 ? `${T}h ${B}m` : `${Y}m`;
      return { timeText: `${le} ➔ ${ae}`, duration: U };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, J = (M) => {
    const R = M.selectedStationNames || [], re = M.selectedStationIds || M.cutStationIds || M.stationIds || [];
    return R.length > 0 ? R.join(", ") : re.length > 0 ? re.join(", ") : M.cutStationName ? M.cutStationName : M.activeStationName ? M.activeStationName : "All Stations in Scope";
  };
  return _s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "bookmarks-modal-overlay", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-modal-card", onClick: (M) => M.stopPropagation(), children: [
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
              onChange: (M) => h(M.target.value),
              onKeyDown: (M) => M.key === "Enter" && b(),
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
      ] }) : a.map((M) => {
        var Y, T, B;
        const R = M.id || M.startTime, re = I === R, le = _(M), ae = J(M), F = ((Y = M.allStationIds) == null ? void 0 : Y.length) || ((T = M.selectedStationIds) == null ? void 0 : T.length) || ((B = M.stationIds) == null ? void 0 : B.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${re ? "is-editing" : ""}`,
            onClick: () => {
              re || (r && r(M), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                re ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (U) => U.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: O,
                      onChange: (U) => w(U.target.value),
                      onKeyDown: (U) => {
                        U.key === "Enter" && N(R, U), U.key === "Escape" && p(U);
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
                        onClick: p,
                        title: "Cancel (Esc)",
                        children: "✕"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ s.jsxs("div", { className: "bm-title-row", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "bm-title", children: M.title || M.name || "Untitled Event" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-time-tag", children: M.createdAt ? new Date(M.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
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
                    /* @__PURE__ */ s.jsx("strong", { children: j(M) })
                  ] }),
                  F > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    F,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: le.timeText }),
                    le.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      le.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${ae}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: ae })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (U) => U.stopPropagation(), children: [
                !re && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (U) => E(M, U),
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
                    onClick: (U) => C(R, U),
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
function bm() {
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
function Xy(e) {
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
function Gy(e, t) {
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
function Qy({
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
  isLooping: m = !0,
  recordingSegments: f = {},
  globalGaps: v = [],
  showWatermark: I = !0,
  directorPlan: S,
  onOverrideDisplay: O,
  onResetOverride: w,
  viewMode: g,
  onViewModeChange: k,
  onOpenFullscreen: b,
  isPipSwapped: C,
  onPipSwapChange: E,
  className: N = ""
}) {
  const p = i.useRef(null), $ = i.useRef(null), j = i.useRef(null), _ = i.useRef(r), J = i.useRef(r), M = i.useRef(r), R = i.useRef(!1), re = i.useRef(null), le = i.useRef(o), ae = i.useRef(!1);
  _.current = r;
  const F = e == null ? void 0 : e.id, Y = e && (e.hostname || e.name) || "", T = i.useMemo(() => {
    var Fe, tt, st, vt;
    const ee = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Fe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Fe.displays) || ((tt = e == null ? void 0 : e.displayTopology) == null ? void 0 : tt.Displays) || ((st = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : st.Displays) || ((vt = e == null ? void 0 : e.topology) == null ? void 0 : vt.displays) || [];
    if (!Array.isArray(ee) || ee.length === 0) return [];
    const ue = ee.length > 1 && ee.every((ot) => (ot.X ?? ot.x ?? 0) === 0 && (ot.Y ?? ot.y ?? 0) === 0);
    let Ee = 0;
    return ee.map((ot, ut) => {
      const zt = ot.Width || ot.width || 1920, _t = ot.Height || ot.height || 1080, Gt = ue ? Ee : ot.X ?? ot.x ?? ut * zt, Qt = ue ? 0 : ot.Y ?? ot.y ?? 0;
      ue && (Ee += zt);
      const yn = (ot.displayId ?? ot.DisplayId ?? `mon-${ut}`).toLowerCase(), vn = ot.displayNumber ?? ot.DisplayNumber ?? ut + 1, cs = (ot.displayName || ot.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${vn}`, vs = !!(ot.isPrimary ?? ot.IsPrimary ?? ut === 0);
      return {
        ...ot,
        displayId: yn,
        DisplayId: yn,
        displayIndex: ut,
        displayNumber: vn,
        DisplayNumber: vn,
        displayName: cs,
        DisplayName: cs,
        isPrimary: vs,
        IsPrimary: vs,
        x: Gt,
        y: Qt,
        X: Gt,
        Y: Qt,
        width: zt,
        height: _t,
        Width: zt,
        Height: _t
      };
    });
  }, [e]), B = T.length > 1, [U, ve] = i.useState(() => {
    if (!B) return "mon-0";
    try {
      const ee = localStorage.getItem("itb_solo_viewmode");
      if (ee) return ee;
    } catch {
    }
    return "canvas";
  }), V = B ? g !== void 0 ? g : U : "mon-0", z = i.useCallback((ee) => {
    const ue = typeof ee == "function" ? ee(V) : ee;
    ve(ue);
    try {
      localStorage.setItem("itb_solo_viewmode", ue);
    } catch {
    }
    k && k(ue);
  }, [V, k]), [ge, ye] = i.useState(!1), Ne = C !== void 0 ? C : ge, Pe = i.useCallback((ee) => {
    const ue = typeof ee == "function" ? ee(Ne) : ee;
    ye(ue), E && E(ue);
  }, [Ne, E]), Se = i.useMemo(() => {
    const ee = S || (e == null ? void 0 : e.directorPlan);
    if (!ee || !ee.segments || ee.segments.length === 0) return null;
    const ue = t + r;
    return ee.segments.find((Ee) => {
      const Fe = Ee.startEpochMs ?? Ee.StartEpochMs ?? 0, tt = Ee.endEpochMs ?? Ee.EndEpochMs ?? 0;
      return ue >= Fe && ue <= tt;
    }) || ee.segments[0];
  }, [S, e == null ? void 0 : e.directorPlan, t, r]), Ie = i.useMemo(() => {
    var ee, ue;
    if (!B) return "mon-0";
    if (V === "split" || V === "pip" || V === "canvas" || V === "all-displays") {
      const Ee = (((ee = T[0]) == null ? void 0 : ee.displayId) ?? "mon-0").toLowerCase(), Fe = (((ue = T[1]) == null ? void 0 : ue.displayId) ?? "mon-1").toLowerCase();
      return Ne ? Fe : Ee;
    }
    return V !== "director" ? V.toLowerCase() : ((Se == null ? void 0 : Se.targetDisplayId) ?? (Se == null ? void 0 : Se.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [B, V, Se, T, Ne]), Ze = i.useMemo(() => {
    var ue;
    if (!B) return null;
    const ee = T.find((Ee) => (Ee.displayId ?? Ee.DisplayId ?? "").toLowerCase() !== Ie);
    return ee ? (ee.displayId ?? ee.DisplayId).toLowerCase() : (((ue = T[1]) == null ? void 0 : ue.displayId) || "mon-1").toLowerCase();
  }, [B, T, Ie]), Ye = i.useMemo(() => {
    const ee = T.find((Ee) => (Ee.displayId ?? "").toLowerCase() === (Ie || "").toLowerCase());
    if (ee) return ee.displayName || `Screen ${ee.displayNumber || 1}`;
    if (Ie === "mon-0" || Ie === "0") return "Screen 1";
    if (Ie === "mon-1" || Ie === "1") return "Screen 2";
    const ue = (Ie || "").match(/\d+/);
    if (ue) {
      const Ee = parseInt(ue[0], 10);
      return `Screen ${(Ie || "").startsWith("mon-") ? Ee + 1 : Ee}`;
    }
    return (Ie || "Screen 1").toUpperCase();
  }, [T, Ie]), Wt = i.useMemo(() => {
    const ee = T.find((ue) => (ue.displayId ?? "").toLowerCase() === (Ze || "").toLowerCase());
    return ee ? ee.displayName || `Screen ${ee.displayNumber || 2}` : "Screen 2";
  }, [T, Ze]), It = i.useMemo(() => V !== "director" && V !== "split" && V !== "pip" && V !== "canvas" ? !0 : !!((Se == null ? void 0 : Se.isManualOverride) ?? (Se == null ? void 0 : Se.IsManualOverride)), [V, Se]), [wt, Q] = i.useState({}), D = i.useRef(null), [Z, P] = i.useState({ width: 0, height: 0 }), W = i.useMemo(() => Xy(T), [T]);
  i.useEffect(() => {
    if (!B || V !== "canvas" && V !== "all-displays" || o)
      return;
    const ee = () => {
      const Ee = D.current;
      if (!Ee) return;
      const Fe = 48, tt = 72, st = Math.max(100, Ee.clientWidth - Fe), vt = Math.max(100, Ee.clientHeight - tt), ot = W.totalWidth || 1920, ut = W.totalHeight || 1080, zt = ot / ut;
      let _t = st, Gt = _t / zt;
      Gt > vt && (Gt = vt, _t = Gt * zt), P({ width: Math.round(_t), height: Math.round(Gt) });
    };
    ee();
    const ue = new ResizeObserver(ee);
    return D.current && ue.observe(D.current), () => ue.disconnect();
  }, [B, V, W]);
  const X = i.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  i.useEffect(() => {
    if (!B || V !== "canvas" && V !== "all-displays")
      return;
    let ee = !0;
    const ue = new AbortController(), Ee = X;
    T.forEach((tt, st) => {
      const vt = (tt.displayId ?? tt.DisplayId ?? `mon-${st}`).toLowerCase(), ot = Pn.get(Y, Ee, vt);
      ot ? Q((ut) => ({ ...ut, [vt]: ot })) : Pn.fetchFrame(Y, Ee, ue.signal, vt).then((ut) => {
        ee && ut && Q((zt) => ({ ...zt, [vt]: ut }));
      });
    });
    const Fe = Pn.subscribe((tt, st, vt, ot) => {
      tt === Y && st === Ee && ot && ee && Q((ut) => ({ ...ut, [ot.toLowerCase()]: vt }));
    });
    return () => {
      ee = !1, ue.abort(), Fe();
    };
  }, [B, V, T, Y, X]);
  const H = i.useRef(Ie), ne = i.useMemo(() => e ? f[e.id] || f[e.hostname] || e.segments || [] : [], [e, f]), se = t + r, de = i.useMemo(() => ne.length === 0 ? !0 : ne.some((ee) => {
    const ue = (ee.startEpochMs ?? ee.startEpoch ?? 0) - 2e3, Ee = (ee.endEpochMs ?? ee.endEpoch ?? 0) + 2e3;
    return se >= ue && se <= Ee;
  }), [ne, se]), De = !de && ne.length > 0, [ke, Xe] = i.useState("A"), [ft, qe] = i.useState(""), [gt, ct] = i.useState(""), [et, at] = i.useState(""), [Ot, Zt] = i.useState(null), [xt, nt] = i.useState(!1), [jt, At] = i.useState(!1), [Dt, ln] = i.useState(() => {
    if (!Y) return null;
    const ee = Math.round(t + r);
    return Pn.get(Y, ee, Ie) || null;
  }), [Ct, fn] = i.useState(null), Xt = ke === "A" ? p : $, ze = i.useCallback(() => {
    const ee = Dl();
    p.current && (p.current.volume = ee.volume, p.current.muted = ke !== "A" || ee.isMuted, p.current.defaultPlaybackRate = c, p.current.playbackRate = c, ke === "A" && !ee.isMuted && di(p.current)), $.current && ($.current.volume = ee.volume, $.current.muted = ke !== "B" || ee.isMuted, $.current.defaultPlaybackRate = c, $.current.playbackRate = c, ke === "B" && !ee.isMuted && di($.current)), j.current && (j.current.muted = !0, j.current.defaultPlaybackRate = c, j.current.playbackRate = c);
  }, [ke, c]);
  i.useEffect(() => {
    const ee = (ue) => {
      ue.detail && (p.current && (p.current.volume = ue.detail.volume), $.current && ($.current.volume = ue.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", ee), () => window.removeEventListener("itb-audio-state-changed", ee);
  }, []), i.useEffect(() => {
    p.current && (p.current.defaultPlaybackRate = c, p.current.playbackRate = c), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c), j.current && (j.current.defaultPlaybackRate = c, j.current.playbackRate = c);
  }, [c]), i.useEffect(() => {
    if (!F || !Y) return;
    if (o) {
      le.current = !0;
      return;
    }
    const ee = le.current;
    le.current = o;
    let ue = !0;
    const Ee = new AbortController(), Fe = Math.round(t + r), tt = Pn.get(Y, Fe, Ie);
    if (tt) {
      ln(tt);
      return;
    }
    const vt = setTimeout(() => {
      ue && Pn.fetchFrame(Y, Fe, Ee.signal, Ie).then((ut) => {
        ue && ut && ln(ut);
      });
    }, ee ? 25 : 35), ot = Pn.subscribe((ut, zt, _t, Gt) => {
      ut === Y && zt === Fe && (!Gt || Gt === Ie) && ue && ln(_t);
    });
    return () => {
      ue = !1, clearTimeout(vt), Ee.abort(), ot();
    };
  }, [F, Y, t, r, o, xt, Ie]), i.useEffect(() => {
    if (!B || V !== "split" && V !== "pip" || !Ze || o) {
      fn(null);
      return;
    }
    let ee = !0;
    const ue = new AbortController(), Ee = Math.round(t + r), Fe = Pn.get(Y, Ee, Ze);
    if (Fe) {
      fn(Fe);
      return;
    }
    const tt = setTimeout(() => {
      ee && Pn.fetchFrame(Y, Ee, ue.signal, Ze).then((vt) => {
        ee && vt && fn(vt);
      });
    }, 40), st = Pn.subscribe((vt, ot, ut, zt) => {
      vt === Y && ot === Ee && (!zt || zt === Ze) && ee && fn(ut);
    });
    return () => {
      ee = !1, clearTimeout(tt), ue.abort(), st();
    };
  }, [B, V, Ze, F, Y, t, r]);
  const xe = i.useCallback((ee, ue = Ie) => {
    const Ee = Math.round(t), Fe = Math.round(t + n), tt = Math.min(Fe, Math.max(Ee, Math.round(t + ee)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(Y)}&startEpoch=${Ee}&endEpoch=${Fe}&seekEpoch=${tt}&displayId=${encodeURIComponent(ue)}&_t=${Date.now()}`;
  }, [t, n, Y, Ie]);
  i.useEffect(() => {
    if (!(!F || !Y))
      if (o && de) {
        const ee = _.current;
        J.current = ee, M.current = ee, R.current = !1;
        const ue = xe(ee, Ie);
        nt(!1), At(!0), Xe("A"), qe(ue), ct(""), Zt(null), at((V === "split" || V === "pip") && Ze ? xe(ee, Ze) : "");
      } else o || (re.current && clearTimeout(re.current), R.current = !1, qe(""), ct(""), at(""), Zt(null), nt(!1), At(!1), p.current && p.current.pause(), $.current && $.current.pause(), j.current && j.current.pause());
  }, [o, F, Y, de, xe, Ie, V, Ze]), i.useEffect(() => {
    if (H.current !== Ie && (H.current = Ie, o && de)) {
      const ee = _.current;
      J.current = ee;
      const ue = xe(ee, Ie);
      nt(!1), At(!0), Xe("A"), qe(ue), ct("");
    }
  }, [Ie, o, de, xe]), i.useEffect(() => {
    if (!F || !Y) return;
    const ee = Math.abs(r - M.current);
    if (!o || ee < 15) {
      M.current = r;
      return;
    }
    return R.current = !0, M.current = r, J.current = r, p.current && p.current.pause(), $.current && $.current.pause(), j.current && j.current.pause(), nt(!1), At(!0), re.current && clearTimeout(re.current), re.current = setTimeout(() => {
      if (!de) {
        qe(""), ct(""), at(""), At(!1), R.current = !1;
        return;
      }
      const ue = _.current, Ee = xe(ue, Ie);
      Xe("A"), qe(Ee), ct(""), Zt(null), (V === "split" || V === "pip") && Ze && at(xe(ue, Ze));
    }, 75), () => {
      re.current && clearTimeout(re.current);
    };
  }, [r, o, F, Y, de, xe, Ie, V, Ze]), i.useEffect(() => {
    if (!o || !xt || ne.length === 0) return;
    const ee = t + _.current, ue = ne.map((Ee) => ({
      start: Ee.startEpochMs ?? Ee.startEpoch ?? 0,
      end: Ee.endEpochMs ?? Ee.endEpoch ?? 0
    })).filter((Ee) => Ee.start > ee + 500).sort((Ee, Fe) => Ee.start - Fe.start)[0];
    if (ue && (!Ot || Ot.start !== ue.start)) {
      const Ee = ue.start - t;
      if (Ee < y) {
        const Fe = xe(Ee, Ie);
        Zt({ start: ue.start, ms: Ee }), ke === "A" ? ct(Fe) : qe(Fe);
      }
    }
  }, [o, xt, r, t, y, ne, Ot, ke, xe, Ie]);
  const Ue = i.useCallback(() => {
    if (Ot) {
      const ee = ke === "A" ? "B" : "A", ue = ee === "A" ? p : $;
      Xe(ee), J.current = Ot.ms, M.current = Ot.ms, Zt(null), ue.current && ue.current.play().then(() => {
        ze();
      }).catch(() => {
      });
    } else
      m ? l(h) : a(!1);
  }, [Ot, ke, ze, m, h, l, a]), yt = i.useCallback(() => {
    const ee = Xt.current;
    if (!ee || R.current || !o || ae.current) return;
    const ue = ee.currentTime * 1e3, Ee = Math.round(J.current + ue);
    if (v && v.length > 0) {
      const Fe = t + Ee, tt = v.find((st) => Fe >= st.startEpochMs && Fe < st.endEpochMs);
      if (tt) {
        ae.current = !0;
        const st = Math.round(tt.endEpochMs - t) + 10;
        l(st), setTimeout(() => {
          ae.current = !1;
        }, 150);
        return;
      }
    }
    if (Ee >= y) {
      m ? l(h) : (a(!1), l(y));
      return;
    }
    M.current = Ee, l(Ee);
  }, [Xt, o, t, v, y, m, h, l, a]), me = jt && o && !De;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${V} ${N}`, children: [
    B && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (ee) => ee.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "director" ? "active" : ""}`,
          onClick: () => z("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "canvas" ? "active" : ""}`,
          onClick: () => z("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "split" ? "active" : ""}`,
          onClick: () => z("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${V === "pip" ? "active" : ""}`,
          onClick: () => z("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      T.map((ee, ue) => {
        const Ee = (ee.displayId ?? `mon-${ue}`).toLowerCase(), Fe = ee.displayNumber ?? ue + 1, tt = ee.displayName || `Screen ${Fe}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${V === Ee ? "active" : ""}`,
            onClick: () => z(Ee),
            title: `Pin directly to ${tt}`,
            children: [
              "🖥️ ",
              Fe
            ]
          },
          Ee
        );
      }),
      V === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          T.map((ee, ue) => {
            const Ee = (ee.displayId ?? `mon-${ue}`).toLowerCase(), Fe = ee.displayNumber ?? ue + 1, tt = ee.displayName || `Screen ${Fe}`, st = Ie === Ee;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${st ? "active" : ""} ${It && st ? "is-override" : ""}`,
                onClick: () => {
                  O == null || O(F, t + r, Ee);
                },
                title: `Punch ${tt} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Fe
                  ] }),
                  st && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: It ? "✋" : "⚡" })
                ]
              },
              `punch-${Ee}`
            );
          }),
          It && w && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                w == null || w(F, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    B && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${It ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: V === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : V === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : V === "pip" ? `🪟 PiP MODE: ${Ye.toUpperCase()} (HERO)` : `${It ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${Ye.toUpperCase()}` }),
      It && V === "director" && w && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => w == null ? void 0 : w(F, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    ft && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: p,
        src: ft,
        className: "feed-video-element",
        style: {
          opacity: xt && ke === "A" ? 1 : 0,
          zIndex: ke === "A" ? 3 : 1,
          pointerEvents: ke === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ke === "A",
        preload: "auto",
        muted: ke !== "A" || Dl().isMuted,
        onCanPlay: () => {
          ze(), o && ke === "A" && p.current && p.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ke === "A" && (R.current = !1, nt(!0), At(!1), p.current && (p.current.defaultPlaybackRate = c, p.current.playbackRate = c));
        },
        onWaiting: () => {
          ke === "A" && At(!0);
        },
        onTimeUpdate: () => {
          var ee;
          ke === "A" && (!xt && ((ee = p.current) == null ? void 0 : ee.currentTime) > 0 && (R.current = !1, nt(!0), At(!1), p.current && (p.current.defaultPlaybackRate = c, p.current.playbackRate = c)), yt());
        },
        onError: () => {
          ke === "A" && (R.current = !1, At(!1), nt(!1));
        },
        onEnded: () => {
          ke === "A" && Ue();
        }
      }
    ),
    gt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: $,
        src: gt,
        className: "feed-video-element",
        style: {
          opacity: xt && ke === "B" ? 1 : 0,
          zIndex: ke === "B" ? 3 : 1,
          pointerEvents: ke === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ke === "B",
        preload: "auto",
        muted: ke !== "B" || Dl().isMuted,
        onCanPlay: () => {
          ze(), o && ke === "B" && $.current && $.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ke === "B" && (R.current = !1, nt(!0), At(!1), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c));
        },
        onWaiting: () => {
          ke === "B" && At(!0);
        },
        onTimeUpdate: () => {
          var ee;
          ke === "B" && (!xt && ((ee = $.current) == null ? void 0 : ee.currentTime) > 0 && (R.current = !1, nt(!0), At(!1), $.current && ($.current.defaultPlaybackRate = c, $.current.playbackRate = c)), yt());
        },
        onError: () => {
          ke === "B" && (R.current = !1, At(!1), nt(!1));
        },
        onEnded: () => {
          ke === "B" && Ue();
        }
      }
    ),
    V !== "split" && V !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: xt ? 0 : 2 },
        children: De ? /* @__PURE__ */ s.jsx(gm, { isPlaying: o }) : Dt && Dt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
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
        ) : o ? null : /* @__PURE__ */ s.jsx("div", { className: "feed-decode-pending", children: /* @__PURE__ */ s.jsx("span", { children: "DECODE PENDING..." }) })
      }
    ),
    V === "split" && B && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Dt && Dt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Dt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        Ct && Ct !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Ct, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    V === "pip" && B && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (ee) => {
          ee.stopPropagation(), Pe((ue) => !ue);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              Wt.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          Ct && Ct !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Ct, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (V === "canvas" || V === "all-displays") && B && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: D, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: Z.width ? `${Z.width}px` : "92%",
            height: Z.height ? `${Z.height}px` : "auto",
            aspectRatio: `${W.totalWidth} / ${W.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: T.map((ee, ue) => {
            const Ee = Gy(ee, W), Fe = (ee.displayId ?? ee.DisplayId ?? `mon-${ue}`).toLowerCase(), tt = wt[Fe] || (Fe === Ie ? Dt : null), st = !!(ee.isPrimary ?? ee.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${st ? "is-primary" : ""}`,
                style: {
                  left: `${Ee.leftPct}%`,
                  top: `${Ee.topPct}%`,
                  width: `${Ee.widthPct}%`,
                  height: `${Ee.heightPct}%`
                },
                onClick: (vt) => {
                  vt.stopPropagation(), b ? b(Fe) : z(Fe);
                },
                title: `Display ${ue + 1} (${ee.width || 1920}x${ee.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      st ? "★ " : "",
                      "🖥 ",
                      ue + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: ee.displayName || ee.DisplayName || Fe.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      ee.width || 1920,
                      "x",
                      ee.height || 1080
                    ] }),
                    b && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (vt) => {
                          vt.stopPropagation(), b(Fe);
                        },
                        title: `Open Display ${ue + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  tt && tt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: tt,
                      className: "canvas-frame-img",
                      alt: Fe
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      ee.displayName || Fe.toUpperCase(),
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
    me && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
    V === "director" && Se && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Ie.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        St(Se.startEpochMs ?? Se.StartEpochMs ?? 0, u, { includeSeconds: !0 }),
        " - ",
        St(Se.endEpochMs ?? Se.EndEpochMs ?? 0, u, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    B && V !== "canvas" && /* @__PURE__ */ s.jsx(
      xm,
      {
        displays: T,
        activeDisplayId: Ie,
        mode: It ? "MANUAL" : "AUTO",
        activeTimeRange: Se ? `${St(Se.startEpochMs ?? Se.StartEpochMs ?? 0, u, { includeSeconds: !0 })} - ${St(Se.endEpochMs ?? Se.EndEpochMs ?? 0, u, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (ee) => {
          O && O(F, t + r, ee), z(ee);
        }
      }
    ),
    I && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      Y
    ] }) })
  ] });
}
const Jy = [
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
function Mm({ isOpen: e, onClose: t }) {
  return i.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? _s.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Jy.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const Xh = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), a = r % 60, c = Math.floor(n % 1e3 / 1e3 * t), u = (h) => String(h).padStart(2, "0");
  return `${u(l)}:${u(o)}:${u(a)}.${u(c)}`;
};
function qy({
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
  onZoomReset: m,
  onFitRange: f,
  onJumpViewportTo: v,
  viewportStartMs: I = 0,
  onViewportStartChange: S,
  playheadMs: O = 0,
  playheadEpochMs: w = 0,
  setPlayheadMs: g,
  inPointMs: k = 0,
  setInPointMs: b,
  outPointMs: C = 36e5,
  setOutPointMs: E,
  recordingSegments: N = {},
  globalGaps: p = [],
  onExport: $,
  isPlaying: j,
  setIsPlaying: _,
  isLooping: J = !0,
  setIsLooping: M,
  playbackSpeed: R,
  setPlaybackSpeed: re,
  keystrokeMode: le = "BURN_IN",
  onChangeKeystrokeMode: ae,
  keystrokes: F = [],
  showRulerKeystrokes: Y = !1,
  onToggleRulerKeystrokes: T,
  directorPlan: B,
  onOverrideDisplay: U,
  onSplitDirectorSegment: ve,
  onChangeDirectorSegmentDisplay: G,
  onResetDirectorSegmentToAuto: V
}) {
  var Ct, fn, Xt;
  const [z, ge] = i.useState(!1), ye = j !== void 0 ? j : z, Ne = i.useCallback((ze) => {
    const xe = typeof ze == "function" ? ze(ye) : ze;
    _ ? _(xe) : ge(xe), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: xe } }));
  }, [ye, _]), [Pe, Se] = i.useState(!0), Ie = J !== void 0 ? J : Pe, Ze = M || Se, [Ye, Wt] = i.useState(1), It = R !== void 0 ? R : Ye, wt = re || Wt, [Q, D] = i.useState(null), [Z, P] = i.useState(!1), [W, X] = i.useState(p), H = ((Ct = t == null ? void 0 : t.displays) == null ? void 0 : Ct.length) > 1 || ((Xt = (fn = t == null ? void 0 : t.topology) == null ? void 0 : fn.displays) == null ? void 0 : Xt.length) > 1, [ne, se] = i.useState(() => {
    if (!H) return "mon-0";
    if (n) return n;
    try {
      const ze = localStorage.getItem("itb_spotlight_viewmode");
      if (ze) return ze;
    } catch {
    }
    return "canvas";
  }), de = i.useCallback((ze) => {
    se((xe) => {
      const Ue = typeof ze == "function" ? ze(xe) : ze;
      try {
        localStorage.setItem("itb_spotlight_viewmode", Ue);
      } catch {
      }
      return Ue;
    });
  }, []), [De, ke] = i.useState(!1);
  i.useEffect(() => {
    if (e) {
      if (!H) {
        se("mon-0");
        return;
      }
      if (n)
        se(n);
      else
        try {
          const ze = localStorage.getItem("itb_spotlight_viewmode");
          se(ze || "canvas");
        } catch {
          se("canvas");
        }
    }
  }, [e, n, H, t == null ? void 0 : t.id]);
  const Xe = i.useRef(null), ft = i.useRef(h);
  ft.current = h;
  const qe = i.useRef(I);
  qe.current = I;
  const gt = i.useRef(u);
  gt.current = u;
  const ct = i.useRef(t && t.id);
  i.useEffect(() => {
    var ze, xe, Ue;
    t && t.id && ct.current !== t.id && (ct.current = t.id, wt(1), ((ze = t.displays) == null ? void 0 : ze.length) > 1 || ((Ue = (xe = t.topology) == null ? void 0 : xe.displays) == null ? void 0 : Ue.length) > 1 || de("mon-0"));
  }, [t, wt]);
  const et = i.useMemo(() => t ? [t] : [], [t]);
  i.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), i.useEffect(() => {
    if (!e) return;
    const ze = Xe.current;
    if (!ze || !y || !S) return;
    const xe = (Ue) => {
      Ue.preventDefault(), Ue.stopPropagation();
      const yt = Ue.ctrlKey || Ue.shiftKey, me = ft.current, ee = qe.current, ue = gt.current || 36e5;
      if (yt) {
        const Ee = Math.abs(Ue.deltaX) > Math.abs(Ue.deltaY) ? Ue.deltaX : Ue.deltaY;
        if (Ee === 0) return;
        const Fe = ue / me, tt = Math.max(0, ue - Fe), st = Fe * 0.08 * (Ee > 0 ? 1 : -1), vt = Math.max(0, Math.min(tt, ee + st));
        qe.current = vt, S(vt);
      } else {
        if (Ue.deltaY === 0) return;
        const Fe = Ue.deltaY < 0 ? 1.25 : 0.8, tt = ze.getBoundingClientRect(), st = tt.left + 150, vt = tt.right - 58, ot = Math.max(100, vt - st);
        let ut = 0.5;
        Ue.clientX >= st && Ue.clientX <= vt ? ut = (Ue.clientX - st) / ot : tt.width > 0 && (ut = Math.max(0, Math.min(1, (Ue.clientX - tt.left) / tt.width)));
        const zt = Math.max(32, ue / 2e3), _t = Math.max(1, Math.min(zt, Math.round(me * Fe * 100) / 100));
        if (_t === me) return;
        const Gt = ue / me, Qt = ue / _t, vn = ee + ut * Gt - ut * Qt, is = Math.max(0, ue - Qt), qn = Math.max(0, Math.min(is, vn));
        ft.current = _t, qe.current = qn, S(qn), y(_t);
      }
    };
    return ze.addEventListener("wheel", xe, { passive: !1, capture: !0 }), () => ze.removeEventListener("wheel", xe, { capture: !0 });
  }, [e, t, y, S]);
  const at = i.useCallback(() => {
    m ? m() : (qe.current = 0, ft.current = 1, S == null || S(0), y == null || y(1));
  }, [m, S, y]), Ot = i.useCallback((ze, xe) => {
    if (f)
      f(ze, xe);
    else {
      const Ue = Math.max(1e3, xe - ze), yt = Math.max(500, Ue * 0.05), me = Math.max(0, ze - yt), ue = Math.min(u, xe + yt) - me, Ee = Math.max(32, u / 2e3), Fe = Math.max(1, Math.min(Ee, Number((u / ue).toFixed(1)))), tt = u / Fe, st = Math.max(0, Math.min(me, u - tt));
      qe.current = st, ft.current = Fe, S == null || S(st), y == null || y(Fe);
    }
  }, [f, u, S, y]), Zt = i.useCallback((ze, xe = "center") => {
    if (v)
      v(ze, xe);
    else {
      if (ze == null) return;
      const Ue = ft.current || 1, yt = u / Math.max(1, Ue), me = xe === "start" ? yt / 4 : yt * 0.75, ee = Math.max(0, Math.min(ze - me, u - yt));
      qe.current = ee, S == null || S(ee);
    }
  }, [v, u, S]), xt = i.useCallback(() => {
    Ne((ze) => !ze);
  }, [Ne]), nt = i.useCallback(async () => {
    var yt;
    if (!t || Math.abs(C - k) < 1e3) return;
    const ze = (le || "NONE").toUpperCase().replace("-", "_"), xe = ze === "NONE" || ze === "OFF" ? "None" : "BurnIn", Ue = {
      createdBy: bm(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(k),
      outEpochMs: a + Math.round(C),
      keystrokeMode: xe,
      layoutMode: H ? ne : "mon-0",
      targetDisplayId: !H || ne === "mon-0" || ne === "mon-1" || ne.startsWith("mon-") ? H ? ne : "mon-0" : null,
      isPipSwapped: De,
      directorSegments: H ? (B == null ? void 0 : B.segments) || ((yt = t == null ? void 0 : t.directorPlan) == null ? void 0 : yt.segments) || [] : []
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
    } catch (me) {
      console.warn("[SoloSpotlightModal] Export trigger error:", me);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, k, C, a, $, le, ne, De, B]);
  i.useEffect(() => {
    if (!e || !t) return;
    const ze = (xe) => {
      if ((xe.ctrlKey || xe.metaKey) && (xe.key === "e" || xe.key === "E")) {
        xe.preventDefault(), nt();
        return;
      }
      if (xe.key === "?" || xe.shiftKey && xe.code === "Slash") {
        xe.preventDefault(), P((Ue) => !Ue);
        return;
      }
      if (Z) {
        xe.key === "Escape" && P(!1);
        return;
      }
      if (xe.key === "Escape" || xe.code === "Escape") {
        xe.preventDefault(), xe.stopPropagation(), o == null || o();
        return;
      }
      if (xe.code === "Space") {
        xe.preventDefault(), xt();
        return;
      }
      if (xe.code === "KeyI") {
        xe.preventDefault(), b(Math.max(0, Math.min(O, C - 1e3)));
        return;
      }
      if (xe.code === "KeyO") {
        xe.preventDefault(), E(Math.min(u, Math.max(O, k + 1e3)));
        return;
      }
      if (xe.code === "ArrowLeft" || xe.code === "ArrowRight") {
        xe.preventDefault(), Ne(!1);
        const Ue = xe.code === "ArrowLeft";
        let yt;
        if (xe.ctrlKey || xe.metaKey)
          yt = 33;
        else if (xe.shiftKey)
          yt = 5e3;
        else {
          const me = Math.max(1, h);
          yt = Math.max(33, Math.round(1e3 / me));
        }
        g((me) => {
          const ee = Ue ? me - yt : me + yt;
          return Math.max(0, Math.min(u, ee));
        });
        return;
      }
      if (xe.key === "ArrowDown") {
        xe.preventDefault();
        const Ue = r.findIndex((yt) => yt.id === t.id);
        if (Ue !== -1) {
          const yt = (Ue + 1) % r.length;
          l(r[yt].id);
        }
        return;
      }
      if (xe.key === "ArrowUp") {
        xe.preventDefault();
        const Ue = r.findIndex((yt) => yt.id === t.id);
        if (Ue !== -1) {
          const yt = (Ue - 1 + r.length) % r.length;
          l(r[yt].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", ze, { capture: !0 }), () => window.removeEventListener("keydown", ze, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    O,
    k,
    C,
    u,
    h,
    b,
    E,
    g,
    nt,
    xt,
    Ne,
    Z
  ]);
  const jt = r.findIndex((ze) => ze.id === (t && t.id)), At = r[jt - 1], Dt = r[jt + 1];
  if (!e || !t) return null;
  const ln = w > 0 ? w : Math.round(a + O);
  return _s.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      Q && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${Q.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          Q.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          Q.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          Q.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: Q.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Xh(C - k),
            " (",
            St(a + k, c),
            " → ",
            St(a + C, c),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Qy,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: u,
            playheadMs: O,
            setPlayheadMs: g,
            isPlaying: ye,
            setIsPlaying: Ne,
            playbackSpeed: It,
            timeMode: c,
            inPointMs: k,
            outPointMs: C,
            isLooping: Ie,
            recordingSegments: N,
            globalGaps: W,
            showWatermark: !0,
            directorPlan: B || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: U,
            onResetOverride: V,
            viewMode: ne,
            onViewModeChange: de,
            isPipSwapped: De,
            onPipSwapChange: ke
          }
        ),
        /* @__PURE__ */ s.jsx(
          Nm,
          {
            currentEpochMs: ln,
            keystrokes: F,
            keystrokeMode: le,
            targetStationId: (t == null ? void 0 : t.id) || (t == null ? void 0 : t.hostname) || (t == null ? void 0 : t.stationId),
            targetDisplayId: ne === "canvas" || ne === "all-displays" ? "auto" : ne,
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
              onClick: (ze) => {
                ze.preventDefault(), ze.stopPropagation(), o == null || o();
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
              onClick: () => P(!0),
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
              disabled: !At,
              onClick: () => At && l(At.id),
              title: At ? `Previous: ${At.displayName || At.roleAlias || At.hostname || At.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            jt + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !Dt,
              onClick: () => Dt && l(Dt.id),
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${ye ? "is-playing-dimmed" : ""}`, ref: Xe, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Xh(C - k) })
            ] }),
            (() => {
              const ze = ne === "mon-0" ? "SCREEN 1" : ne === "mon-1" ? "SCREEN 2" : ne.startsWith("mon-") ? `SCREEN ${parseInt(ne.slice(4)) + 1}` : ne.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: nt,
                  title: `Export Selected Cut Window as ${ze} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: ne === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${ze})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            pu,
            {
              activeStationId: t.id,
              isPlaying: ye,
              setIsPlaying: xt,
              isLooping: Ie,
              setIsLooping: Ze,
              playbackSpeed: It,
              onChangeSpeed: wt,
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: u,
              inPointMs: k,
              setInPointMs: b,
              outPointMs: C,
              setOutPointMs: E,
              onSetInPoint: () => b(Math.max(0, Math.min(O, C - 1e3))),
              onSetOutPoint: () => E(Math.min(u, Math.max(O, k + 1e3))),
              onStepFrameBackward: () => {
                Ne(!1), g((ze) => Math.max(0, ze - 33));
              },
              onStepFrameForward: () => {
                Ne(!1), g((ze) => Math.min(u, ze + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(a + O, c) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Cm,
          {
            stations: et,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: c,
            totalDurationMs: u,
            zoomLevel: h,
            onZoomChange: y,
            onZoomReset: at,
            onFitRange: Ot,
            onJumpViewportTo: Zt,
            viewportStartMs: I,
            onViewportStartChange: S,
            playheadMs: O,
            setPlayheadMs: (ze) => {
              Ne(!1), g(ze);
            },
            inPointMs: k,
            setInPointMs: b,
            outPointMs: C,
            setOutPointMs: E,
            recordingSegments: N,
            onExport: nt,
            onEstimateLoaded: (ze) => {
              ze != null && ze.removedGlobalGaps && X(ze.removedGlobalGaps);
            },
            keystrokeMode: le,
            onChangeKeystrokeMode: ae,
            keystrokes: F,
            showKeystrokes: Y,
            showRulerKeystrokes: Y,
            onToggleRulerKeystrokes: T,
            onSplitDirectorSegment: ve,
            onChangeDirectorSegmentDisplay: G,
            onResetDirectorSegmentToAuto: V
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Mm,
        {
          isOpen: Z,
          onClose: () => P(!1)
        }
      )
    ] }),
    document.body
  );
}
function Im({ isGlobalHost: e = !1 }) {
  const [t, n] = i.useState([]), [r, l] = i.useState(/* @__PURE__ */ new Set()), o = i.useRef(null), a = i.useRef(!1), c = i.useRef(0), [u, h] = i.useState(() => {
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
        let N = await fetch("/api/v1/extractor-advanced/jobs");
        if (N.ok || (N = await fetch("/api/v1/extractor/jobs")), N.ok) {
          c.current = 0;
          const p = await N.json(), $ = Array.isArray(p) ? p : [];
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
    let N = !0, p = null;
    const $ = () => {
      if (!N) return;
      let _ = 2500;
      typeof document < "u" && document.hidden ? _ = 3e4 : c.current > 0 && (_ = Math.min(3e4, 2500 * Math.pow(2, Math.min(c.current, 4)))), p = setTimeout(async () => {
        await f(), $();
      }, _);
    }, j = () => {
      !document.hidden && N && (clearTimeout(p), c.current = 0, f().then($));
    };
    return document.addEventListener("visibilitychange", j), f().then($), () => {
      N = !1, clearTimeout(p), document.removeEventListener("visibilitychange", j);
    };
  }, [f]), i.useEffect(() => {
    const N = () => {
      m(!0), f();
    };
    return window.addEventListener("open-export-monitor", N), () => window.removeEventListener("open-export-monitor", N);
  }, [f]), i.useEffect(() => {
    if (!y || u) return;
    const N = (p) => {
      o.current && !o.current.contains(p.target) && !p.target.closest(".export-floating-hud") && m(!1);
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [y, u]);
  const v = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && v)
    return null;
  const I = t.filter((N) => N.status === "Processing" || N.status === "Queued"), S = t.filter((N) => N.status === "Completed" || N.isCompleted), O = () => {
    h((N) => {
      const p = !N;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(p));
      } catch {
      }
      return p;
    });
  }, w = () => {
    m(!1), h(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, g = (N, p) => {
    p.stopPropagation(), !(!N || r.has(N)) && (l(($) => new Set($).add(N)), setTimeout(() => {
      n(($) => {
        const j = $.filter((_) => (_.jobId || _.id) !== N);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: j })), j;
      }), l(($) => {
        const j = new Set($);
        return j.delete(N), j;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${N}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}`, { method: "DELETE" })).catch(($) => console.warn("[ExportJobMonitor] Dismiss failed:", $)));
  }, k = async (N, p) => {
    p.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${N}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}/bookmark`, { method: "POST" })), f();
    } catch ($) {
      console.warn("[ExportJobMonitor] Bookmark failed:", $);
    }
  }, b = (N, p) => {
    p.stopPropagation();
    const $ = N.networkFolderPath || (N.outputFilePath ? N.outputFilePath.substring(0, N.outputFilePath.lastIndexOf("\\")) : "");
    $ && (navigator.clipboard.writeText($), alert(`UNC Directory Path copied to clipboard:
${$}`));
  }, C = (N) => {
    const p = N.jobId || N.id, $ = `/api/v1/extractor-advanced/jobs/${p}/download`, j = document.createElement("a");
    j.href = $, j.download = N.fileName || `archive_${p}.tar`, document.body.appendChild(j), j.click(), document.body.removeChild(j), setTimeout(f, 1e3);
  }, E = (N) => {
    if (!N || N <= 0) return "0 B";
    const p = N / (1024 * 1024);
    return p >= 1e3 ? `${(p / 1024).toFixed(2)} GB` : `${p.toFixed(1)} MB`;
  };
  return t.length === 0 && !y ? null : _s.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !y && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${I.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => m(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${I.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: I.length > 0 ? `EXPORTS: ${I.length} PACKAGING` : `${S.length} ARCHIVE${S.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${I.length > 0 ? "" : "ready"}`, children: I.length > 0 ? `${I[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      y && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !u && m(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${u ? "pinned" : ""}`, onClick: (N) => N.stopPropagation(), children: [
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
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: w, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((N) => {
          const p = N.status === "Completed" || N.isCompleted, $ = N.status === "Failed" || N.isFailed, j = N.status === "Processing" || N.status === "Queued", _ = N.jobId || N.id, J = r.has(_), M = p ? 100 : Math.round(N.progressPercent || N.progressPercentage || N.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${N.status.toLowerCase()} ${N.isBookmarked ? "is-bookmarked" : ""} ${J ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${N.status.toLowerCase()}`, children: p ? "READY" : N.status }),
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
                      onClick: (R) => g(_, R),
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
                j && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: N.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      M,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, M)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      E(N.fileSizeBytes)
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
                p && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "OPERATOR" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val highlight-cyan", title: N.createdBy || "Guest Operator", children: [
                      "👤 ",
                      N.createdBy || "Guest Operator"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: E(N.fileSizeBytes) })
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
                p && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${N.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (R) => k(_, R),
                        title: N.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: N.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (R) => b(N, R),
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
                      onClick: () => C(N),
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
function Zy({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const l = i.useRef(null);
  if (i.useEffect(() => {
    if (!e) return;
    const v = (S) => {
      S.key === "Escape" && (t == null || t());
    }, I = (S) => {
      l.current && !l.current.contains(S.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", I), window.addEventListener("keydown", v), () => {
      window.removeEventListener("mousedown", I), window.removeEventListener("keydown", v);
    };
  }, [e, t]), !e || !e.station) return null;
  const { x: o, y: a, station: c } = e, u = c.displayName || c.hostname || c.name || c.id, h = 220, y = 160, m = Math.max(10, Math.min(o, (typeof window < "u" ? window.innerWidth : 1920) - h - 12)), f = Math.max(10, Math.min(a, (typeof window < "u" ? window.innerHeight : 1080) - y - 12));
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: l,
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
function e1({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 2560, a = r.canvasHeight || 1440, c = o / a, u = r.resolution || "2K";
  let h;
  Math.abs(c - 16 / 9) < 0.05 ? h = "16:9 Broadcast" : Math.abs(c - 16 / 10) < 0.05 ? h = "16:10 WUXGA / WQXGA" : Math.abs(c - 19 / 10) < 0.05 ? h = "19:10 NOC Extended" : Math.abs(c - 32 / 9) < 0.15 ? h = "32:9 Dual Screen" : Math.abs(c - 21 / 9) < 0.15 ? h = "21:9 Ultrawide" : Math.abs(c - 4 / 3) < 0.15 ? h = "4:3 Standard" : h = `${Math.round(c * 100) / 100}:1 Custom`;
  const m = ((E, N) => {
    const p = Math.round(E * N / 2073600 * 6 * 10) / 10, $ = Math.round(p * 60 / 8 * 10) / 10;
    return `~${p} Mbps (~${$} MB/min)`;
  })(o, a), [f, v] = i.useState("BurnIn"), [I, S] = i.useState(""), [O, w] = i.useState(!1);
  if (!e) return null;
  const g = async () => {
    w(!0);
    try {
      await n(f, u, I), t();
    } finally {
      w(!1);
    }
  }, k = (r.layout || "DIRECTOR").toUpperCase(), b = r.stationsCount || 1, C = r.audioSegmentsCount || 1;
  return _s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (E) => E.stopPropagation(), children: [
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
              k,
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
            /* @__PURE__ */ s.jsx("span", { className: "value", children: C > 1 ? `DYNAMIC ROUTING (${C} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
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
              value: I,
              onChange: (E) => S(E.target.value),
              rows: 2,
              maxLength: 500
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "notes-char-counter", children: [
            I.length,
            " / 500"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: O, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: g, disabled: O, children: O ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${o}×${a})` })
      ] })
    ] }) }),
    document.body
  );
}
function t1(e, t, n, r, l = null) {
  const [o, a] = i.useState([]), [c, u] = i.useState({}), [h, y] = i.useState(!1), m = i.useRef(o);
  m.current = o;
  const f = i.useCallback(async () => {
    if (isNaN(e)) return;
    const S = e + t;
    y(!0);
    try {
      const O = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(S),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), w = await fetch(`/api/v1/extractor-advanced/stations?${O.toString()}`);
      if (w.ok) {
        const g = w.headers.get("content-type");
        if (g && g.includes("application/json")) {
          const k = await w.json(), C = (Array.isArray(k) ? k : k.stations || k.items || []).filter((E) => (E.recordingsCount || (E.segments ? E.segments.length : 0)) > 0).map((E) => {
            var N, p;
            return {
              id: String(E.id || E.stationId || E.agentId || E.hostname),
              hostname: E.hostname || "Station",
              roleAlias: E.roleAlias || null,
              roleHistory: E.roleHistory || [],
              displayName: E.displayName || E.roleAlias || E.hostname || "Station",
              isOnline: E.isOnline !== void 0 ? E.isOnline : !0,
              recordingsCount: E.recordingsCount || 0,
              segments: E.segments || [],
              displays: E.displays || E.Displays || ((N = E.displayTopology) == null ? void 0 : N.displays) || ((p = E.DisplayTopology) == null ? void 0 : p.Displays) || [],
              displayTopology: E.displayTopology || E.DisplayTopology || null,
              directorPlan: E.directorPlan || E.DirectorPlan || null,
              hasAudio: !!E.hasAudio,
              audioCodec: E.audioCodec || "",
              audioChannels: E.audioChannels || 0,
              audioLabel: E.audioLabel || (E.hasAudio ? "AAC" : "NONE"),
              width: E.width || 1920,
              height: E.height || 1080,
              fps: E.fps || 30,
              isVfr: !!E.isVfr,
              resolution: E.resolution || "1080p",
              feedSpec: E.feedSpec || "1080p • 30fps"
            };
          });
          a((E) => {
            if (!E || E.length === 0) return C;
            const N = new Map(E.map((j) => [j.id, j]));
            let p = E.length !== C.length;
            const $ = C.map((j) => {
              const _ = N.get(j.id);
              return _ ? _.isOnline === j.isOnline && _.displayName === j.displayName && _.roleAlias === j.roleAlias && _.feedSpec === j.feedSpec && _.recordingsCount === j.recordingsCount && _.fps === j.fps ? _ : (p = !0, { ..._, ...j }) : (p = !0, j);
            });
            return p ? $ : E;
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
    const S = /* @__PURE__ */ new Set();
    return o.forEach((O) => {
      O.id && S.add(O.id), O.hostname && S.add(O.hostname);
    }), Array.from(S).sort().join(",");
  }, [o]);
  i.useEffect(() => {
    if (!v || isNaN(e)) {
      u({});
      return;
    }
    let S = !0;
    return (async () => {
      try {
        const w = e + t, g = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(v)}&startEpoch=${e}&endEpoch=${w}`);
        if (g.ok && S) {
          const k = await g.json() || {}, b = {};
          (m.current || []).forEach((C) => {
            const E = k[C.id] || k[C.hostname] || k[C.displayName] || [];
            b[C.id] = E, b[C.hostname] = E;
          }), Object.keys(k).forEach((C) => {
            b[C] || (b[C] = k[C]);
          }), u(b);
        }
      } catch {
        S && u({});
      }
    })(), () => {
      S = !1;
    };
  }, [v, e, t]);
  const I = i.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let S = 1 / 0, O = -1 / 0;
    o.forEach((b) => {
      (c[b.id] || c[b.hostname] || b.segments || []).forEach((E) => {
        const N = E.startEpochMs ?? E.startEpoch ?? 0, p = E.endEpochMs ?? E.endEpoch ?? 0;
        N > 0 && N < S && (S = N), p > 0 && p > O && (O = p);
      });
    });
    let w = 1 / 0, g = -1 / 0;
    l && (c[l] || []).forEach((C) => {
      const E = C.startEpochMs ?? C.startEpoch ?? 0, N = C.endEpochMs ?? C.endEpoch ?? 0;
      E > 0 && E < w && (w = E), N > 0 && N > g && (g = N);
    });
    const k = (b) => b === 1 / 0 || b === -1 / 0 ? null : Math.max(0, Math.min(t, b - e));
    return {
      globalFirstMs: k(S),
      globalLastMs: k(O),
      currentFirstMs: k(w),
      currentLastMs: k(g)
    };
  }, [o, c, l, e, t]);
  return {
    allStations: o,
    setAllStations: a,
    recordingSegments: c,
    setRecordingSegments: u,
    isLoadingStations: h,
    refetchStations: f,
    movieBoundaries: I
  };
}
function n1({
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
  isGridMode: m = !1
}) {
  const [f, v] = i.useState(c), [I, S] = i.useState(u), [O, w] = i.useState(h), [g, k] = i.useState(y), b = i.useRef(null), C = i.useRef(null), E = o || l, N = i.useMemo(() => E ? a[E.id] || E.segments || [] : [], [E, a]), p = N.some((J) => {
    const M = J.startEpochMs ?? J.startEpoch ?? 0, R = J.endEpochMs ?? J.endEpoch ?? 0, re = e + f;
    return re >= M && re <= R;
  }), $ = !!(!m && E && p);
  i.useEffect(() => {
    v((J) => J < t ? t : J > n ? (S(!1), n) : J);
  }, [t, n]);
  const j = i.useCallback((J) => {
    b.current || (b.current = J);
    const M = (J - b.current) * g, R = Math.min(M, 250 * g);
    b.current = J, v((re) => {
      let le = re + R;
      if (r && r.length > 0) {
        const ae = e + le, F = r.find((Y) => ae >= Y.startEpochMs && ae < Y.endEpochMs);
        F && (le = F.endEpochMs - e);
      }
      return le >= n && (O ? le = t : (S(!1), le = n)), le;
    }), I && (!$ || m) && (C.current = requestAnimationFrame(j));
  }, [I, O, t, n, r, e, $, g, m]);
  i.useEffect(() => (I && (!$ || m) ? (b.current = performance.now(), C.current = requestAnimationFrame(j)) : (C.current && cancelAnimationFrame(C.current), b.current = null), () => {
    C.current && cancelAnimationFrame(C.current);
  }), [I, j, $, m]);
  const _ = i.useCallback(() => {
    if (I)
      S(!1);
    else {
      let J = f;
      const M = e + J, R = r == null ? void 0 : r.find((re) => M >= re.startEpochMs && M < re.endEpochMs);
      if (R)
        J = R.endEpochMs - e;
      else if (E && !p) {
        const re = N.map((le) => ({ start: le.startEpochMs ?? le.startEpoch ?? 0, end: le.endEpochMs ?? le.endEpoch ?? 0 })).filter((le) => le.start > M).sort((le, ae) => le.start - ae.start)[0];
        re && (J = re.start - e);
      }
      J !== f && v(J), S(!0);
    }
  }, [I, f, e, r, E, p, N]);
  return {
    playheadMs: f,
    setPlayheadMs: v,
    isPlaying: I,
    setIsPlaying: S,
    isLooping: O,
    setIsLooping: w,
    playbackSpeed: g,
    setPlaybackSpeed: k,
    togglePlaySmart: _
  };
}
function s1(e) {
  return 1 - Math.pow(1 - e, 3);
}
function r1({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = i.useState(n), [a, c] = i.useState(r), u = i.useRef(null), h = i.useRef(a);
  h.current = a;
  const y = i.useRef(l);
  y.current = l;
  const m = i.useRef(t);
  m.current = t;
  const f = Math.max(32, t / 2e3), v = t / l, I = i.useCallback((g, k = 280) => {
    u.current && cancelAnimationFrame(u.current);
    const b = h.current, C = g - b;
    if (Math.abs(C) < 1) return;
    const E = performance.now(), N = (p) => {
      const $ = p - E, j = Math.min(1, $ / k);
      c(Math.round(b + C * s1(j))), j < 1 ? u.current = requestAnimationFrame(N) : u.current = null;
    };
    u.current = requestAnimationFrame(N);
  }, []), S = i.useCallback((g, k) => {
    const b = Math.max(1e3, k - g), C = Math.max(500, b * 0.05), E = Math.max(0, g - C), p = Math.min(t, k + C) - E, $ = Math.max(1, Math.min(f, Number((t / p).toFixed(1)))), j = t / $, _ = Math.max(0, Math.min(E, t - j));
    I(_), o($);
  }, [t, f, I]), O = i.useCallback(() => {
    I(0), o(1);
  }, [I]), w = i.useCallback((g, k = "center") => {
    if (g == null) return;
    const b = k === "start" ? v / 4 : v * 0.75, C = Math.max(0, Math.min(g - b, t - v));
    I(C);
  }, [v, t, I]);
  return i.useEffect(() => () => {
    u.current && cancelAnimationFrame(u.current);
  }, []), i.useEffect(() => {
    let g = null;
    const k = (C) => {
      if (C.defaultPrevented) return;
      C.preventDefault(), C.stopPropagation();
      const E = C.ctrlKey || C.shiftKey, N = y.current, p = h.current, $ = m.current;
      if (E) {
        const j = Math.abs(C.deltaX) > Math.abs(C.deltaY) ? C.deltaX : C.deltaY;
        if (j === 0) return;
        const _ = $ / Math.max(1, N), J = Math.max(0, $ - _), M = _ * 0.08 * (j > 0 ? 1 : -1);
        c((R) => Math.max(0, Math.min(J, R + M)));
      } else {
        if (C.deltaY === 0) return;
        const _ = C.deltaY < 0 ? 1.25 : 0.8, J = Math.max(32, $ / 2e3), M = g ? g.getBoundingClientRect() : { left: 0, width: window.innerWidth }, R = Math.max(0, Math.min(M.width, C.clientX - M.left)), re = M.width > 0 ? R / M.width : 0.5;
        o((le) => {
          const ae = Math.max(1, Math.min(J, Math.round(le * _ * 100) / 100));
          if (ae === le) return le;
          const F = $ / le, Y = $ / ae, B = p + re * F - re * Y, U = Math.max(0, $ - Y);
          return c(Math.max(0, Math.min(U, B))), ae;
        });
      }
    }, b = () => {
      const C = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return C && !g ? (g = C, g.addEventListener("wheel", k, { passive: !1, capture: !0 }), !0) : !!g;
    };
    if (!b()) {
      const C = setInterval(() => {
        b() && clearInterval(C);
      }, 100);
      return () => {
        clearInterval(C), g && g.removeEventListener("wheel", k, { capture: !0 });
      };
    }
    return () => {
      g && g.removeEventListener("wheel", k, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: a,
    setViewportStartMs: c,
    viewportDurationMs: v,
    animateViewportTo: I,
    fitRange: S,
    resetZoom: O,
    jumpViewportTo: w
  };
}
function l1({
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
  setOutPointMs: m,
  totalTimelineDurationMs: f,
  zoomLevel: v = 1,
  togglePlaySmart: I,
  onToggleHelpModal: S,
  onSplitDirectorAtPlayhead: O,
  isModalActive: w = !1,
  hasGridPlacements: g = !0,
  onToggleGridFullscreen: k,
  isGridFullscreen: b = !1,
  onExitGridFullscreen: C,
  activeFocusZone: E = "timeline"
}) {
  i.useEffect(() => {
    const N = (p) => {
      const $ = p.target;
      if (!($.tagName === "INPUT" || $.tagName === "TEXTAREA" || $.tagName === "SELECT" || $.isContentEditable || $.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (p.key === "?" || p.shiftKey && p.code === "Slash") {
          p.preventDefault(), S == null || S();
          return;
        }
        if (!(w || t)) {
          if (p.code === "KeyI" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), h == null || h(Math.max(0, Math.min(a, y - 1e3)));
            return;
          }
          if (p.code === "KeyO" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), m == null || m(Math.min(f, Math.max(a, u + 1e3)));
            return;
          }
          if (p.code === "KeyX" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), h == null || h(0), m == null || m(f);
            return;
          }
          if (p.code === "KeyL" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), o == null || o((_) => _ <= 0 ? 1 : _ === 1 ? 2 : _ === 2 ? 4 : _ >= 4 ? 8 : 1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-forward"));
            return;
          }
          if (p.code === "KeyK" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), o == null || o(1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-pause"));
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
            I();
            return;
          }
          if (p.code === "KeyF" && !p.ctrlKey && !p.metaKey && !p.altKey) {
            p.preventDefault(), k == null || k();
            return;
          }
          if ((p.key === "Escape" || p.code === "Escape") && b) {
            p.preventDefault(), C == null || C();
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
            if (E === "canvas" && !p.ctrlKey && !p.altKey && !p.metaKey)
              return;
            p.preventDefault();
            const _ = p.code === "ArrowLeft";
            let J;
            if (p.ctrlKey || p.metaKey)
              J = 33;
            else if (p.shiftKey)
              J = 5e3;
            else {
              const M = Math.max(1, v);
              J = Math.max(33, Math.round(1e3 / M));
            }
            c == null || c((M) => {
              const R = _ ? M - J : M + J;
              return Math.max(0, Math.min(f, R));
            });
            return;
          }
          if (p.code === "ArrowDown" || p.code === "ArrowUp") {
            if (E === "canvas" && !p.ctrlKey && !p.altKey && !p.metaKey || !e || n.length <= 1) return;
            p.preventDefault();
            const _ = n.findIndex((J) => J.id === e);
            if (_ === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (p.code === "ArrowDown") {
              const J = (_ + 1) % n.length;
              l(n[J].id), o(1);
            } else {
              const J = (_ - 1 + n.length) % n.length;
              l(n[J].id), o(1);
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
    m,
    f,
    v,
    I,
    S,
    O,
    w,
    g,
    k,
    b,
    C,
    E
  ]);
}
const Gh = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = _h(n, e), l = _h(t, e);
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
function o1() {
  var cl, ql;
  const e = i.useMemo(() => Ix() || {}, []), [t, n] = i.useState(() => {
    var L, ie;
    return (L = e.timeRange) != null && L.startEpochMs && ((ie = e.timeRange) != null && ie.endEpochMs) ? e.timeRange : Gh();
  }), [r, l] = i.useState(e.timeMode || "LOCAL"), [o, a] = i.useState(e.keystrokeMode || "BURN_IN"), [c, u] = i.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !0);
  i.useEffect(() => {
    wx().catch((L) => console.warn("[Studio] DST init error:", L));
  }, []);
  const h = i.useMemo(() => t.startEpochMs ? t.startEpochMs : po(t.start, null, r), [t.start, t.startEpochMs, r]), y = i.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), m = i.useMemo(() => h - y, [h, y]), f = i.useMemo(() => t.durationMs + 2 * y, [t.durationMs, y]), [v, I] = i.useState(e.selectedStationIds || []), [S, O] = i.useState(e.activeStationId || null), [w, g] = i.useState(null), [k, b] = i.useState(null), [C, E] = i.useState([]), [N, p] = i.useState(!1), [$, j] = i.useState(null), [_, J] = i.useState(() => {
    var L;
    return e.compositionScope || (((L = e.selectedStationIds) == null ? void 0 : L.length) > 1 ? "inter-station" : "intra-station");
  }), [M, R] = i.useState(() => {
    try {
      const L = localStorage.getItem("itb_composition_layout");
      if (L) return L;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), re = i.useCallback((L) => {
    R((ie) => {
      const ce = typeof L == "function" ? L(ie) : L;
      try {
        localStorage.setItem("itb_composition_layout", ce);
      } catch {
      }
      return ce;
    });
  }, []), [le, ae] = i.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [F, Y] = i.useState(() => !!e.isPipSwapped), [T, B] = i.useState(() => e.audioRoutingPlan || null), [U, ve] = i.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [G, V] = i.useState(!1), [z, ge] = i.useState(null), [ye, Ne] = i.useState(() => e.canvasLayoutTimeline || null), [Pe, Se] = i.useState(0), Ie = i.useCallback((L) => {
    Ne((ie) => {
      var _e;
      const ce = [...(ie == null ? void 0 : ie.keyframes) || []], je = ce.findIndex((Ke) => Math.abs(Ke.timestampEpochMs - L) < 300);
      if (je >= 0)
        return Se(je), ie;
      const Re = ce[Pe] || ce[0], Me = (Re == null ? void 0 : Re.layout) || z || {
        width: (z == null ? void 0 : z.width) || 2560,
        height: (z == null ? void 0 : z.height) || 1440,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Te = [...ce].reverse().find((Ke) => Ke.timestampEpochMs <= L) || Re, We = (Me == null ? void 0 : Me.utcClockPosition) || (Te == null ? void 0 : Te.utcClockPosition) || ((_e = Te == null ? void 0 : Te.layout) == null ? void 0 : _e.utcClockPosition) || "top-right", Ge = JSON.parse(JSON.stringify(Me));
      Ge.utcClockPosition = We;
      const Be = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(L),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        utcClockPosition: We,
        layout: Ge
      }, Oe = [...ce, Be].sort((Ke, Ft) => Ke.timestampEpochMs - Ft.timestampEpochMs), He = Oe.findIndex((Ke) => Ke.timestampEpochMs === Math.round(L));
      return Se(He >= 0 ? He : 0), {
        ...ie || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: Oe
      };
    });
  }, [Pe, z]), Ze = i.useCallback((L, ie) => {
    Ne((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : uu(ce, L, ie));
  }, []), Ye = i.useCallback((L) => {
    Ne((ie) => {
      if (!(ie != null && ie.keyframes) || ie.keyframes.length <= 1 || L === 0) return ie;
      const ce = ie.keyframes.filter((je, Re) => Re !== L);
      return Se((je) => je === L ? Math.max(0, L - 1) : je > L ? je - 1 : Math.min(je, ce.length - 1)), { ...ie, keyframes: ce };
    });
  }, []), Wt = i.useCallback((L, ie) => {
    Ne((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : du(ce, L, ie));
  }, []), It = i.useCallback((L, ie) => {
    Ne((ce) => {
      if (!(ce != null && ce.keyframes) || ce.keyframes.length === 0) return ce;
      const je = Math.round(ie), Re = typeof L == "number" && ce.keyframes[L] ? L : ce.keyframes.findIndex((We) => We.id === L);
      if (Re === -1) return ce;
      const Me = [...ce.keyframes];
      Me[Re] = {
        ...Me[Re],
        timestampEpochMs: je
      }, Me.sort((We, Ge) => We.timestampEpochMs - Ge.timestampEpochMs);
      const Te = Me.findIndex((We) => We.timestampEpochMs === je);
      return Te >= 0 && Se(Te), {
        ...ce,
        keyframes: Me
      };
    });
  }, []);
  i.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [wt, Q] = i.useState({}), D = i.useCallback((L) => {
    I((ie) => ie.filter((ce) => ce !== L)), S === L && O(null), w === L && g(null), Ne((ie) => {
      if (!ie || !ie.keyframes) return ie;
      const ce = ie.keyframes.map((je) => {
        var Re;
        return {
          ...je,
          layout: {
            ...je.layout,
            placements: (((Re = je.layout) == null ? void 0 : Re.placements) || []).filter((Me) => Me.stationId !== L)
          }
        };
      });
      return { ...ie, keyframes: ce };
    });
  }, [S, w]), Z = i.useCallback((L, ie) => {
    L.preventDefault(), L.stopPropagation();
    const ce = 195, je = 110, Re = Math.min(L.clientX, window.innerWidth - ce - 10), Me = Math.min(L.clientY, window.innerHeight - je - 10);
    j({ x: Re, y: Me, station: ie });
  }, []), P = i.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(f, e.inEpochMs - m)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(f, e.inPointMs)) : y, [e.inEpochMs, e.inPointMs, m, f, y]), W = i.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(P + 1e3, Math.min(f, e.outEpochMs - m)) : typeof e.outPointMs == "number" ? Math.max(P + 1e3, Math.min(f, e.outPointMs)) : y + t.durationMs, [e.outEpochMs, e.outPointMs, m, f, y, t.durationMs, P]), X = i.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(f, e.playheadEpochMs - m)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(f, e.playheadMs)) : P, [e.playheadEpochMs, e.playheadMs, m, f, P]), [H, ne] = i.useState(P), [se, de] = i.useState(W);
  i.useEffect(() => {
    if (!m) return;
    const L = Math.round(m + H), ie = Math.round(m + se);
    Ne((ce) => {
      var We, Ge;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      let je = [...ce.keyframes], Re = !1, Me = je.find((Be) => Be.tag === "cut-in");
      if (Me)
        Me.timestampEpochMs !== L && (Me.timestampEpochMs = L, Re = !0);
      else {
        const Be = je.find((Oe) => Math.abs(Oe.timestampEpochMs - L) < 500);
        if (Be)
          Be.tag = "cut-in", Be.timestampEpochMs = L, Re = !0;
        else {
          const Oe = ((We = je[0]) == null ? void 0 : We.layout) || z || { width: 1920, height: 1080, placements: [] };
          je.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: L,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Oe))
          }), Re = !0;
        }
      }
      let Te = je.find((Be) => Be.tag === "cut-out");
      if (Te)
        Te.timestampEpochMs !== ie && (Te.timestampEpochMs = ie, Re = !0);
      else {
        const Be = je.find((Oe) => Math.abs(Oe.timestampEpochMs - ie) < 500 && Oe.tag !== "cut-in");
        if (Be)
          Be.tag = "cut-out", Be.timestampEpochMs = ie, Re = !0;
        else {
          const Oe = ((Ge = je[je.length - 1]) == null ? void 0 : Ge.layout) || z || { width: 1920, height: 1080, placements: [] };
          je.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: ie,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Oe))
          }), Re = !0;
        }
      }
      return Re ? (je.sort((Be, Oe) => Be.timestampEpochMs - Oe.timestampEpochMs), {
        ...ce,
        keyframes: je
      }) : ce;
    });
  }, [m, H, se, z]);
  const { allStations: De, recordingSegments: ke, isLoadingStations: Xe, movieBoundaries: ft } = t1(
    m,
    f,
    t,
    r,
    S
  ), qe = i.useMemo(() => De.find((L) => L.id === S) || null, [De, S]), gt = i.useCallback((L) => {
    Q((ie) => {
      const ce = !(ie[L] ?? !0);
      return Ne((je) => {
        if (!(je != null && je.keyframes)) return je;
        const Re = je.keyframes.map((Me) => {
          var Be;
          const Te = ((Be = Me.layout) == null ? void 0 : Be.placements) || [];
          let We = !1;
          const Ge = Te.map((Oe) => {
            if (Oe.stationId === L) {
              if (!ce && (Oe.displayId === "auto" || !Oe.displayId)) {
                We = !0;
                const He = De.find((_e) => _e.id === L);
                return {
                  ...Oe,
                  displayId: "mon-0",
                  label: `${(He == null ? void 0 : He.displayName) || L} - Screen 1 (Main)`
                };
              } else if (ce && (Oe.displayId === "mon-0" || !Oe.displayId) && Te.filter((_e) => _e.stationId === L).length === 1) {
                We = !0;
                const _e = De.find((Ke) => Ke.id === L);
                return {
                  ...Oe,
                  displayId: "auto",
                  label: `${(_e == null ? void 0 : _e.displayName) || L} - Central Composition (Auto-Director)`
                };
              }
            }
            return Oe;
          });
          return We ? {
            ...Me,
            layout: {
              ...Me.layout,
              placements: Ge
            }
          } : Me;
        });
        return { ...je, keyframes: Re };
      }), {
        ...ie,
        [L]: ce
      };
    });
  }, [De]), ct = i.useCallback((L, ie) => {
    Ne((ce) => {
      var Oe, He;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      const je = Pe >= 0 && Pe < ce.keyframes.length ? Pe : 0, Re = ce.keyframes[je], Me = ((Oe = Re == null ? void 0 : Re.layout) == null ? void 0 : Oe.placements) || [], Te = (ie || "mon-0").toLowerCase(), We = Me.findIndex((_e) => {
        if (_e.stationId !== L) return !1;
        const Ke = (_e.displayId || "mon-0").toLowerCase();
        return Ke === Te || Ke === "auto" && (Te === "mon-0" || Te === "screen-0");
      });
      let Ge;
      if (We >= 0)
        Ge = Me.filter((_e, Ke) => Ke !== We);
      else {
        const _e = De.find((fe) => fe.id === L), Ke = ((He = _e == null ? void 0 : _e.displays) == null ? void 0 : He.find((fe) => (fe.displayId || "").toLowerCase() === Te)) || { width: 1920, height: 1080 }, Ft = Ke.width || 1920, Nt = Ke.height || 1080, ht = Ft / Nt, ds = ht >= 1 ? 640 : Math.round(360 * ht), kt = ht >= 1 ? Math.round(640 / ht) : 360, bt = {
          stationId: L,
          displayId: Te,
          label: `${(_e == null ? void 0 : _e.displayName) || L} - ${Ke.displayName || Te}`,
          x: 120 + Me.length * 40 % 800,
          y: 100 + Me.length * 40 % 500,
          width: ds,
          height: kt,
          sourceWidth: Ft,
          sourceHeight: Nt,
          nativeAspectRatio: ht,
          aspectRatio: ht,
          zIndex: Me.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ge = [...Me, bt];
      }
      const Be = [...ce.keyframes];
      return Be[je] = {
        ...Be[je],
        layout: {
          ...Be[je].layout,
          placements: Ge
        }
      }, { ...ce, keyframes: Be };
    });
  }, [Pe, De]), et = i.useMemo(() => !v || v.length === 0 ? [] : De.filter((L) => v.includes(L.id)), [De, v]);
  i.useEffect(() => {
    !m || isNaN(m) || Ne((L) => {
      if (L != null && L.keyframes && L.keyframes.length > 0) return L;
      const ie = m + (H || 0), ce = m + (se || f || 36e5), je = (z == null ? void 0 : z.width) || 2560, Re = (z == null ? void 0 : z.height) || 1440, Me = z || {
        width: je,
        height: Re,
        backgroundColor: "#070A10",
        preset: "auto-grid",
        fps: 30,
        placements: []
      };
      return {
        width: je,
        height: Re,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: [
          {
            id: `kf_root_${ie}`,
            timestampEpochMs: Math.round(ie),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Me))
          },
          {
            id: `kf_out_${ce}`,
            timestampEpochMs: Math.round(ce),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Me))
          }
        ]
      };
    });
  }, [m, H, se, f, z]), i.useEffect(() => {
    if (!et || et.length === 0 || !m || isNaN(m)) return;
    const L = m, ie = m + (f || 36e5);
    if (ie <= L) return;
    const ce = new AbortController(), je = setTimeout(() => {
      et.forEach((Re) => {
        _a.fetchWaveform(Re.id, L, ie, ce.signal, 250);
      });
    }, 300);
    return () => {
      clearTimeout(je), ce.abort();
    };
  }, [et, m, f]);
  const at = i.useMemo(() => De.find((L) => L.id === w) || null, [De, w]), Ot = !!(w && at), Zt = i.useRef("grid"), xt = i.useRef(null), {
    playheadMs: nt,
    setPlayheadMs: jt,
    isPlaying: At,
    setIsPlaying: Dt,
    playbackSpeed: ln,
    setPlaybackSpeed: Ct,
    isLooping: fn,
    setIsLooping: Xt,
    togglePlaySmart: ze
  } = n1({
    timelineBaseEpochMs: m,
    inPointMs: H,
    outPointMs: se,
    globalGaps: C,
    activeStation: qe,
    spotlightStation: at,
    recordingSegments: ke,
    initialPlayheadMs: X,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !S
  }), {
    zoomLevel: xe,
    setZoomLevel: Ue,
    viewportStartMs: yt,
    setViewportStartMs: me,
    resetZoom: ee,
    fitRange: ue,
    jumpViewportTo: Ee
  } = r1({
    containerRef: xt,
    totalTimelineDurationMs: f,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [Fe, tt] = i.useState(!1), [st, vt] = i.useState(!1), [ot, ut] = i.useState(!1), [zt, _t] = i.useState(!1), [Gt, Qt] = i.useState(
    !!(e.isWorkspaceActive && ((cl = e.selectedStationIds) == null ? void 0 : cl.length) > 0)
  ), [yn, vn] = i.useState([]), is = i.useMemo(() => et && et.length > 0 ? et : qe ? [qe] : at ? [at] : [], [et, qe, at]), qn = i.useMemo(() => is.map((L) => `${L.id}:${L.hostname || L.id}:${L.displayName || ""}`).join("|"), [is]);
  i.useEffect(() => {
    const ie = (o || "NONE").toUpperCase().replace("-", "_") === "BURN_IN" || c;
    if (!is.length || !m || !ie) {
      vn([]);
      return;
    }
    const ce = Math.max(0, m - 5e3), je = m + f + 5e3, Re = new AbortController(), Me = is.map((Te) => {
      const We = Te.hostname || Te.displayName || Te.id, Ge = Te.displayName || Te.hostname || Te.name || Te.id;
      return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(We)}&startEpoch=${ce}&endEpoch=${je}`, { signal: Re.signal }).then((Be) => Be.ok ? Be.json() : []).then((Be) => (Array.isArray(Be) ? Be : []).map((Oe) => ({
        ...Oe,
        stationId: Te.id,
        stationName: Ge,
        stationHostname: Te.hostname || Te.id
      }))).catch((Be) => {
        if (Be.name !== "AbortError") return [];
        throw Be;
      });
    });
    return Promise.all(Me).then((Te) => {
      const We = Te.flat();
      We.sort((Ge, Be) => (Ge.epochMs || 0) - (Be.epochMs || 0)), vn(We);
    }).catch((Te) => {
      Te.name !== "AbortError" && vn([]);
    }), () => Re.abort();
  }, [qn, m, f, o, c]), i.useEffect(() => {
    Xe || (De.length === 0 ? ((v.length > 0 || S || Gt) && (I([]), O(null), g(null), Qt(!1)), _t(!0), p(!0)) : (p(!1), I((L) => {
      const ie = L.filter((ce) => De.some((je) => je.id === ce));
      return ie.length !== L.length ? (ie.length === 0 && (Qt(!1), _t(!0)), ie) : L;
    })));
  }, [Xe, De]);
  const cs = i.useCallback((L) => {
    if (L === null) {
      Dt(!1), Ct(1), O(null);
      return;
    }
    L !== S && Ct(1), O(L);
  }, [S, Dt, Ct]), vs = i.useCallback((L, ie = null) => {
    L !== S && Ct(1), Zt.current = v.length <= 1 || S ? "spotlight" : "grid", O(L), g(L), b(ie || null);
  }, [S, v.length, Ct]), il = i.useCallback(() => {
    g(null), b(null), Zt.current === "grid" && O(null);
  }, []), en = i.useMemo(() => {
    if (T != null && T.segments && T.segments.length > 0)
      return T;
    const L = v[0] || S || "mon-0";
    return {
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + f,
          sourceStationId: L
        }
      ]
    };
  }, [T, v, S, m, f]), Fs = i.useCallback((L) => {
    B((ie) => {
      const ce = ie || en, je = [...ce.segments || []], Re = je.findIndex((He) => {
        const _e = He.startEpochMs ?? He.StartEpochMs ?? 0, Ke = He.endEpochMs ?? He.EndEpochMs ?? 0;
        return L > _e + 500 && L < Ke - 500;
      });
      if (Re === -1) return ie;
      const Me = je[Re], Te = Me.startEpochMs ?? Me.StartEpochMs ?? 0, We = Me.endEpochMs ?? Me.EndEpochMs ?? 0, Ge = Me.sourceStationId ?? Me.SourceStationId ?? v[0], Be = { startEpochMs: Te, endEpochMs: L, sourceStationId: Ge }, Oe = { startEpochMs: L, endEpochMs: We, sourceStationId: Ge };
      return je.splice(Re, 1, Be, Oe), { ...ce, segments: je };
    });
  }, [en, v]), Xl = i.useCallback((L, ie) => {
    B((ce) => {
      const je = ce || en, Re = (je.segments || []).map((Me) => {
        const Te = Me.startEpochMs ?? Me.StartEpochMs ?? 0, We = Me.endEpochMs ?? Me.EndEpochMs ?? 0;
        return L >= Te && L <= We ? { ...Me, sourceStationId: ie } : Me;
      });
      return { ...je, segments: Re };
    }), ve(!1);
  }, [en]), Gl = i.useCallback((L, ie) => {
    B((ce) => {
      const je = ce || en, Re = (je.segments || []).map((Me) => {
        const Te = Me.startEpochMs ?? Me.StartEpochMs ?? 0, We = Me.endEpochMs ?? Me.EndEpochMs ?? 0;
        return L >= Te && L <= We ? { ...Me, gain: ie } : Me;
      });
      return { ...je, segments: Re };
    });
  }, [en]), tr = i.useCallback(() => {
    ve((L) => !L);
  }, []), [Zn, Ln] = i.useState({}), On = i.useCallback((L) => {
    if (!L) return null;
    if (Zn[L]) return Zn[L];
    const ie = De.find((ce) => ce.id === L);
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
  }, [Zn, De, m, f]), nr = i.useCallback((L, ie) => {
    L && Ln((ce) => {
      const je = ce[L] || On(L), Re = [...je.segments || []], Me = Re.findIndex((Ke) => {
        const Ft = Ke.startEpochMs ?? Ke.StartEpochMs ?? 0, Nt = Ke.endEpochMs ?? Ke.EndEpochMs ?? 0;
        return ie > Ft + 500 && ie < Nt - 500;
      });
      if (Me === -1) return ce;
      const Te = Re[Me], We = Te.startEpochMs ?? Te.StartEpochMs ?? 0, Ge = Te.endEpochMs ?? Te.EndEpochMs ?? 0, Be = Te.targetDisplayId ?? Te.TargetDisplayId ?? "mon-0", Oe = !!(Te.isManualOverride ?? Te.IsManualOverride), He = { ...Te, startEpochMs: We, endEpochMs: ie, targetDisplayId: Be, isManualOverride: Oe }, _e = { ...Te, startEpochMs: ie, endEpochMs: Ge, targetDisplayId: Be, isManualOverride: Oe };
      return Re.splice(Me, 1, He, _e), { ...ce, [L]: { ...je, segments: Re } };
    });
  }, [On]), dn = i.useCallback((L, ie, ce) => {
    L && Ln((je) => {
      const Re = je[L] || On(L), Me = [...Re.segments || []];
      let Te = Me.findIndex((Ge) => {
        const Be = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Oe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ie > Be && ie < Oe;
      });
      if (Te === -1 && (Te = Me.findIndex((Ge) => {
        const Be = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Oe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ie >= Be && ie <= Oe;
      })), Te === -1) return je;
      const We = Me[Te];
      return Me[Te] = { ...We, targetDisplayId: ce, isManualOverride: !0 }, { ...je, [L]: { ...Re, segments: Me } };
    });
  }, [On]), pn = i.useCallback((L, ie) => {
    if (!L) return;
    const ce = De.find((Re) => Re.id === L), je = ce == null ? void 0 : ce.directorPlan;
    Ln((Re) => {
      var Ft;
      const Me = Re[L] || On(L), Te = [...Me.segments || []];
      let We = Te.findIndex((Nt) => {
        const ht = Nt.startEpochMs ?? Nt.StartEpochMs ?? 0, ds = Nt.endEpochMs ?? Nt.EndEpochMs ?? 0;
        return ie > ht && ie < ds;
      });
      if (We === -1 && (We = Te.findIndex((Nt) => {
        const ht = Nt.startEpochMs ?? Nt.StartEpochMs ?? 0, ds = Nt.endEpochMs ?? Nt.EndEpochMs ?? 0;
        return ie >= ht && ie <= ds;
      })), We === -1) return Re;
      const Ge = Te[We], Be = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Oe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0, He = (Be + Oe) / 2, _e = (Ft = je == null ? void 0 : je.segments) == null ? void 0 : Ft.find((Nt) => {
        const ht = Nt.startEpochMs ?? Nt.StartEpochMs ?? 0, ds = Nt.endEpochMs ?? Nt.EndEpochMs ?? 0;
        return He >= ht && He <= ds;
      }), Ke = _e ? _e.targetDisplayId ?? _e.TargetDisplayId ?? "mon-0" : "mon-0";
      return Te[We] = { ...Ge, targetDisplayId: Ke, isManualOverride: !1 }, { ...Re, [L]: { ...Me, segments: Te } };
    });
  }, [De, On]);
  i.useEffect(() => {
    if (!et || et.length === 0 || isNaN(m)) return;
    const L = m + H, ie = m + se;
    if (ie <= L) return;
    const ce = setTimeout(async () => {
      const je = et.filter((Re) => {
        var Te;
        return (Re.displays || Re.Displays || ((Te = Re.displayTopology) == null ? void 0 : Te.displays) || []).length > 1;
      });
      if (je.length !== 0)
        for (const Re of je)
          try {
            const Me = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(Re.id)}&startEpoch=${L}&endEpoch=${ie}`);
            if (Me.ok) {
              const Te = await Me.json();
              Te != null && Te.segments && Te.segments.length > 0 && Ln((We) => {
                const Ge = We[Re.id] || Re.directorPlan, Be = ((Ge == null ? void 0 : Ge.segments) || []).filter((He) => He.isManualOverride || He.IsManualOverride);
                if (Be.length === 0)
                  return { ...We, [Re.id]: Te };
                const Oe = [...Te.segments];
                return Be.forEach((He) => {
                  const _e = He.startEpochMs ?? He.StartEpochMs, Ke = He.endEpochMs ?? He.EndEpochMs;
                  for (let Ft = Oe.length - 1; Ft >= 0; Ft--) {
                    const Nt = Oe[Ft].startEpochMs ?? Oe[Ft].StartEpochMs, ht = Oe[Ft].endEpochMs ?? Oe[Ft].EndEpochMs;
                    if (!(ht <= _e || Nt >= Ke))
                      if (Nt >= _e && ht <= Ke)
                        Oe.splice(Ft, 1);
                      else if (Nt < _e && ht > Ke) {
                        const ds = { ...Oe[Ft], endEpochMs: _e }, kt = { ...Oe[Ft], startEpochMs: Ke };
                        Oe.splice(Ft, 1, ds, kt);
                      } else Nt < _e ? Oe[Ft].endEpochMs = _e : ht > Ke && (Oe[Ft].startEpochMs = Ke);
                  }
                  Oe.push(He);
                }), Oe.sort((He, _e) => (He.startEpochMs ?? He.StartEpochMs) - (_e.startEpochMs ?? _e.StartEpochMs)), { ...We, [Re.id]: { ...Te, segments: Oe } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(ce);
  }, [H, se, et, m]);
  const tn = i.useMemo(() => et.map((L) => ({
    ...L,
    directorPlan: Zn[L.id] || L.directorPlan || On(L.id)
  })), [et, Zn, On]), Tt = i.useMemo(() => qe ? {
    ...qe,
    directorPlan: Zn[qe.id] || qe.directorPlan || On(qe.id)
  } : null, [qe, Zn, On]), Or = i.useMemo(() => at ? {
    ...at,
    directorPlan: Zn[at.id] || at.directorPlan || On(at.id)
  } : null, [at, Zn, On]), Wn = (L, ie = 30) => {
    const ce = Math.max(0, L), je = Math.floor(ce / 1e3), Re = Math.floor(je / 3600), Me = Math.floor(je % 3600 / 60), Te = je % 60, We = Math.floor(ce % 1e3 / 1e3 * ie), Ge = (Be) => String(Be).padStart(2, "0");
    return `${Ge(Re)}:${Ge(Me)}:${Ge(Te)}.${Ge(We)}`;
  }, [Kt, Ns] = i.useState(!1), [Dr, Ts] = i.useState(!0), [Pr, Ql] = i.useState(!1), Lt = i.useRef(null), gn = i.useMemo(() => {
    var je;
    const L = ye == null ? void 0 : ye.keyframes, ie = (L == null ? void 0 : L[Pe]) || (L == null ? void 0 : L[0]);
    return (((je = ie == null ? void 0 : ie.layout) == null ? void 0 : je.placements) || (z == null ? void 0 : z.placements) || []).length > 0 || v && v.length > 0;
  }, [ye, Pe, z, v]), sr = i.useCallback(() => {
    Lt.current && clearTimeout(Lt.current), Ts(!0), Lt.current = setTimeout(() => {
      Pr || Ts(!1);
    }, 2500);
  }, [Pr]);
  i.useEffect(() => {
    if (!Kt) {
      Ts(!0), Lt.current && clearTimeout(Lt.current);
      return;
    }
    const L = (ie) => {
      ie.clientY >= window.innerHeight - 280 && Ts(!0), sr();
    };
    return window.addEventListener("mousemove", L, { passive: !0 }), sr(), () => {
      window.removeEventListener("mousemove", L), Lt.current && clearTimeout(Lt.current);
    };
  }, [Kt, sr]);
  const Vt = i.useCallback(() => {
    Ns((L) => {
      const ie = !L;
      return ie ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), ie;
    });
  }, []), _r = i.useCallback(() => {
    Ns(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  i.useEffect(() => {
    var L, ie, ce, je;
    return Kt ? ((ie = (L = document.body) == null ? void 0 : L.classList) == null || ie.add("is-studio-fullscreen"), window.dispatchEvent(new CustomEvent("itb:studio-fullscreen-change", {
      detail: { isFullscreen: !0 }
    }))) : ((je = (ce = document.body) == null ? void 0 : ce.classList) == null || je.remove("is-studio-fullscreen"), window.dispatchEvent(new CustomEvent("itb:studio-fullscreen-change", {
      detail: { isFullscreen: !1 }
    }))), () => {
      var Re, Me;
      (Me = (Re = document.body) == null ? void 0 : Re.classList) == null || Me.remove("is-studio-fullscreen");
    };
  }, [Kt]), i.useEffect(() => {
    const L = () => {
      !document.fullscreenElement && Kt && Ns(!1);
    };
    return document.addEventListener("fullscreenchange", L), () => document.removeEventListener("fullscreenchange", L);
  }, [Kt]);
  const [Rt, us] = i.useState("timeline");
  l1({
    activeFocusZone: Rt,
    activeStationId: S,
    spotlightStationId: w,
    timelineStations: tn,
    selectedStationIdsCount: v.length,
    onSelectActiveStation: cs,
    setPlaybackSpeed: Ct,
    playheadMs: nt,
    setPlayheadMs: jt,
    inPointMs: H,
    setInPointMs: ne,
    outPointMs: se,
    setOutPointMs: de,
    totalTimelineDurationMs: f,
    zoomLevel: xe,
    togglePlaySmart: ze,
    onToggleHelpModal: () => ut((L) => !L),
    onSplitDirectorAtPlayhead: () => {
      var ie, ce, je;
      const L = S || (v.length === 1 ? v[0] : null);
      if (L) {
        const Re = De.find((Te) => Te.id === L);
        (((ie = Re == null ? void 0 : Re.displays) == null ? void 0 : ie.length) > 1 || ((je = (ce = Re == null ? void 0 : Re.topology) == null ? void 0 : ce.displays) == null ? void 0 : je.length) > 1) && nr(L, m + nt);
      }
    },
    isModalActive: Fe || st || ot,
    hasGridPlacements: gn,
    onToggleGridFullscreen: Vt,
    isGridFullscreen: Kt,
    onExitGridFullscreen: _r
  }), i.useEffect(() => {
    const L = m + H, ie = m + se, ce = m + nt;
    mm({
      timeRange: t,
      timeMode: r,
      inPointMs: H,
      outPointMs: se,
      playheadMs: Math.round(nt),
      inEpochMs: L,
      outEpochMs: ie,
      playheadEpochMs: ce,
      selectedStationIds: v,
      activeStationId: S,
      zoomLevel: xe,
      viewportStartMs: yt,
      isWorkspaceActive: Gt,
      isLooping: fn,
      playbackSpeed: ln,
      keystrokeMode: o,
      showRulerKeystrokes: c,
      compositionScope: _,
      compositionLayout: M,
      isAutoDirectorEnabled: le,
      isPipSwapped: F,
      audioRoutingPlan: en,
      isAutoFollowAudio: U,
      canvasLayoutTimeline: ye
    });
  }, [
    t,
    r,
    H,
    se,
    nt,
    v,
    S,
    xe,
    yt,
    Gt,
    fn,
    ln,
    m,
    o,
    c,
    _,
    M,
    le,
    F,
    en,
    U,
    ye
  ]);
  const Jl = i.useCallback((L) => {
    var Be, Oe;
    const ie = po(L.startTime), ce = po(L.endTime), je = Math.max(0, ce - ie) || 144e5, Re = {
      start: L.startTime,
      end: L.endTime,
      durationMs: je,
      startEpochMs: ie,
      endEpochMs: ce
    }, Me = Math.max(6e4, Math.round(je * 0.05)), Te = ie - Me, We = je + 2 * Me;
    if (n(Re), L.inEpochMs && L.outEpochMs) {
      const He = Math.max(0, Math.min(We, L.inEpochMs - Te)), _e = Math.max(He + 1e3, Math.min(We, L.outEpochMs - Te)), Ke = L.playheadEpochMs ? Math.max(0, Math.min(We, L.playheadEpochMs - Te)) : He;
      ne(He), de(_e), jt(Ke);
    } else {
      const He = typeof L.inPointMs == "number" ? L.inPointMs : Me, _e = typeof L.outPointMs == "number" ? L.outPointMs : Me + je, Ke = typeof L.playheadMs == "number" ? L.playheadMs : He;
      ne(Math.max(0, Math.min(We, He))), de(Math.max(0, Math.min(We, _e))), jt(Math.max(0, Math.min(We, Ke)));
    }
    const Ge = ((Be = L.selectedStationIds) == null ? void 0 : Be.length) > 0 ? L.selectedStationIds : ((Oe = L.cutStationIds) == null ? void 0 : Oe.length) > 0 ? L.cutStationIds : L.stationIds;
    if ((Ge == null ? void 0 : Ge.length) > 0) {
      I(Ge);
      const He = L.spotlightStationId || L.SpotlightStationId || null, _e = L.activeStationId || L.ActiveStationId || null;
      He && Ge.includes(He) ? (O(He), g(He)) : _e && Ge.includes(_e) ? (O(_e), g(null)) : (O(null), g(null));
    }
    L.keystrokeMode && a(L.keystrokeMode), Qt(!0), _t(!1);
  }, []), be = i.useCallback((L) => {
    const ie = L.startEpochMs || po(L.start, null, r), ce = L.endEpochMs || po(L.end, null, r), je = Math.max(0, ce - ie) || 144e5, Re = Math.max(6e4, Math.round(je * 0.05)), Me = ie - Re, Te = je + 2 * Re;
    n({
      ...L,
      startEpochMs: ie,
      endEpochMs: ce,
      durationMs: je
    }), p(!1), ne(Re), de(Re + je), jt(Re), Ne((We) => {
      if (!(We != null && We.keyframes) || We.keyframes.length === 0) return We;
      const Ge = We.keyframes.map((Be, Oe) => Oe === 0 ? { ...Be, timestampEpochMs: Me } : Be).filter((Be) => Be.timestampEpochMs >= Me && Be.timestampEpochMs <= Me + Te);
      return { ...We, keyframes: Ge };
    }), B((We) => {
      if (!(We != null && We.segments) || We.segments.length === 0) return We;
      if (!We.segments.some((Be) => {
        const Oe = Be.startEpochMs ?? Be.StartEpochMs ?? 0;
        return (Be.endEpochMs ?? Be.EndEpochMs ?? 0) > Me && Oe < Me + Te;
      })) {
        const Be = v[0] || S || "station-0";
        return {
          segments: [
            {
              startEpochMs: Me,
              endEpochMs: Me + Te,
              sourceStationId: Be
            }
          ]
        };
      }
      return We;
    }), Ln({});
  }, [r, v, S]), Ce = i.useCallback(() => {
    if (et.map((ie) => ie.id).length === 0) return alert("No active stations selected in timeline.");
    V(!0);
  }, [et]), dd = i.useCallback(async (L, ie, ce = "") => {
    var Ge, Be, Oe, He;
    const je = et.map((_e) => _e.id);
    if (je.length === 0) return;
    let Re = L === "None" ? "None" : "BurnIn";
    const Me = ie || "NATIVE", Te = {};
    et.forEach((_e) => {
      var Ft;
      const Ke = Zn[_e.id] || _e.directorPlan;
      ((Ft = Ke == null ? void 0 : Ke.segments) == null ? void 0 : Ft.length) > 0 && (Te[_e.id] = Ke.segments.map((Nt) => ({
        startEpochMs: Nt.startEpochMs ?? Nt.StartEpochMs ?? 0,
        endEpochMs: Nt.endEpochMs ?? Nt.EndEpochMs ?? 0,
        targetDisplayId: Nt.targetDisplayId ?? Nt.TargetDisplayId ?? "mon-0",
        targetDisplayNumber: Nt.targetDisplayNumber ?? Nt.TargetDisplayNumber ?? 1,
        targetDisplayName: Nt.targetDisplayName ?? Nt.TargetDisplayName ?? "Screen 1",
        isManualOverride: !!(Nt.isManualOverride ?? Nt.IsManualOverride)
      })));
    });
    const We = Te[Tt == null ? void 0 : Tt.id] || ((Ge = Tt == null ? void 0 : Tt.displays) == null ? void 0 : Ge.length) > 1 || ((Oe = (Be = Tt == null ? void 0 : Tt.topology) == null ? void 0 : Be.displays) == null ? void 0 : Oe.length) > 1 ? ((He = Tt == null ? void 0 : Tt.directorPlan) == null ? void 0 : He.segments) || [] : [];
    try {
      const _e = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: bm(),
          notes: (ce || "").trim(),
          stationIds: je,
          inEpochMs: m + H,
          outEpochMs: m + se,
          keystrokeMode: Re,
          resolution: Me || (ye == null ? void 0 : ye.resolution) || (z == null ? void 0 : z.resolution) || "2K",
          videoQuality: Me || (ye == null ? void 0 : ye.resolution) || (z == null ? void 0 : z.resolution) || "2K",
          compositionScope: _,
          layoutMode: "canvas",
          canvasLayout: z,
          canvasLayoutTimeline: ye || (z == null ? void 0 : z.timeline) || null,
          isPipSwapped: F,
          isAutoDirectorEnabled: le,
          directorSegments: We,
          stationDirectorSegments: Te,
          audioRoutingSegments: en.segments || [],
          utcClockPosition: (() => {
            var Ke, Ft;
            if ((Ft = (Ke = ye == null ? void 0 : ye.keyframes) == null ? void 0 : Ke[0]) != null && Ft.utcClockPosition)
              return ye.keyframes[0].utcClockPosition;
            if (z != null && z.utcClockPosition)
              return z.utcClockPosition;
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
  }, [et, m, H, se, _, z, ye, F, le, Tt, en]), Fr = i.useCallback(() => {
    Tx();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const L = Gh(), ie = Math.max(6e4, Math.round(L.durationMs * 0.05));
    n(L), ne(ie), de(ie + L.durationMs), jt(ie), I([]), O(null), g(null), Dt(!1), Ct(1), a("BURN_IN"), ee(), Qt(!1), _t(!0);
  }, [ee, Dt, Ct, jt]), rr = !Gt || v.length === 0, Br = m + nt;
  return i.useEffect(() => {
    const L = ye == null ? void 0 : ye.keyframes;
    if (!L || L.length === 0) return;
    let ie = 0;
    for (let ce = 0; ce < L.length && L[ce].timestampEpochMs <= Br + 50; ce++)
      ie = ce;
    ie !== Pe && Se(ie);
  }, [Br, ye == null ? void 0 : ye.keyframes, Pe]), /* @__PURE__ */ s.jsxs("div", { className: `extractor-advanced-studio ${Kt ? "is-cinema-mode" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Sx,
        {
          timeRange: t,
          baseEpochMs: h,
          timeMode: r,
          setTimeMode: l,
          activeStationId: S,
          hideBackToGrid: et.length <= 1,
          onResetActiveStation: () => cs(null),
          onOpenRangeModal: () => tt(!0),
          onOpenBookmarksModal: () => vt(!0),
          onOpenHelpModal: () => ut(!0),
          onToggleDrawer: () => _t(!zt),
          isInitialSetup: rr,
          selectedCount: v.length,
          totalCount: De.length,
          onResetStudio: Fr
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
              onClick: () => tt(!0),
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
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${Kt ? "cinema-fullscreen-mode" : ""}`, children: [
        Kt && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${Dr ? "" : "is-hud-hidden"}`, children: [
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
                onClick: () => ut(!0),
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
              tn.length,
              " ACTIVE WORKSTATIONS"
            ] })
          ] })
        ] }),
        !rr && /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "studio-left-content",
            onMouseDown: (L) => {
              L.target.closest(".studio-bottom-timeline, .transport-bar-root, .transport-bar, .timeline-board") && us("timeline");
            },
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
                /* @__PURE__ */ s.jsx(
                  sy,
                  {
                    activeStation: Tt,
                    timelineStations: tn,
                    allStations: De,
                    onSelectActiveStation: cs,
                    onOpenSpotlight: vs,
                    onStationContextMenu: Z,
                    onDeselectStation: D,
                    stationAutoDirectorMap: wt,
                    onToggleStationAutoDirector: gt,
                    onOpenDrawer: () => _t(!0),
                    baseEpochMs: m,
                    playheadMs: nt,
                    playheadEpochMs: Br,
                    timeMode: r,
                    isPlaying: Ot ? !1 : At,
                    setIsPlaying: Dt,
                    totalDurationMs: f,
                    inPointMs: H,
                    outPointMs: se,
                    setPlayheadMs: jt,
                    globalGaps: C,
                    recordingSegments: ke,
                    playbackSpeed: ln,
                    onChangePlaybackSpeed: Ct,
                    keystrokeMode: o,
                    keystrokes: yn,
                    directorPlan: Tt == null ? void 0 : Tt.directorPlan,
                    onOverrideDisplay: dn,
                    onResetOverride: pn,
                    compositionScope: _,
                    onChangeCompositionScope: J,
                    compositionLayout: M,
                    onChangeCompositionLayout: re,
                    isAutoDirectorEnabled: le,
                    onToggleAutoDirector: () => ae((L) => !L),
                    isPipSwapped: F,
                    onTogglePipSwap: () => Y((L) => !L),
                    onUpdateCanvasLayout: ge,
                    canvasLayoutTimeline: ye,
                    onUpdateCanvasLayoutTimeline: Ne,
                    activeKfIndex: Pe,
                    setActiveKfIndex: Se,
                    isModalOpen: G || Fe || st || Ot || ot,
                    isGridFullscreen: Kt,
                    onToggleGridFullscreen: Vt,
                    activeFocusZone: Rt,
                    onFocusZoneChange: us
                  }
                ),
                !Kt && /* @__PURE__ */ s.jsx(
                  pu,
                  {
                    activeFocusZone: Rt,
                    onFocusZoneChange: us,
                    hasGridPlacements: gn,
                    baseEpochMs: m,
                    timeMode: r,
                    totalDurationMs: f,
                    playheadMs: nt,
                    setPlayheadMs: jt,
                    inPointMs: H,
                    setInPointMs: ne,
                    outPointMs: se,
                    setOutPointMs: de,
                    activeStationId: S,
                    isPlaying: At,
                    setIsPlaying: ze,
                    isLooping: fn,
                    setIsLooping: Xt,
                    playbackSpeed: ln,
                    onChangeSpeed: Ct,
                    onSetInPoint: () => ne(Math.max(0, Math.min(nt, se - 1e3))),
                    onSetOutPoint: () => de(Math.min(f, Math.max(nt, H + 1e3))),
                    onStepFrameBackward: () => {
                      Dt(!1), jt((L) => Math.max(0, L - 33));
                    },
                    onStepFrameForward: () => {
                      Dt(!1), jt((L) => Math.min(f, L + 33));
                    }
                  }
                )
              ] }),
              Kt && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "cinema-bottom-sensor-strip",
                  onMouseEnter: () => {
                    Ts(!0), sr();
                  }
                }
              ),
              /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: `studio-bottom-timeline ${Kt ? "cinema-timeline-island" : ""} ${Kt && !Dr ? "dock-hidden" : ""} ${Kt && At ? "is-playing-dimmed" : ""}`,
                  ref: xt,
                  onMouseDown: () => us("timeline"),
                  onMouseEnter: () => Ql(!0),
                  onMouseLeave: () => {
                    Ql(!1), Kt && sr();
                  },
                  children: [
                    Kt && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                          /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                          /* @__PURE__ */ s.jsx("span", { className: "val", children: Wn(se - H) })
                        ] }),
                        /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "btn-export-cut-hero",
                            onClick: Ce,
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
                          activeFocusZone: Rt,
                          onFocusZoneChange: us,
                          hasGridPlacements: gn,
                          baseEpochMs: m,
                          timeMode: r,
                          totalDurationMs: f,
                          playheadMs: nt,
                          setPlayheadMs: jt,
                          inPointMs: H,
                          setInPointMs: ne,
                          outPointMs: se,
                          setOutPointMs: de,
                          activeStationId: S,
                          isPlaying: At,
                          setIsPlaying: ze,
                          isLooping: fn,
                          setIsLooping: Xt,
                          playbackSpeed: ln,
                          onChangeSpeed: Ct,
                          onSetInPoint: () => ne(Math.max(0, Math.min(nt, se - 1e3))),
                          onSetOutPoint: () => de(Math.min(f, Math.max(nt, H + 1e3))),
                          onStepFrameBackward: () => {
                            Dt(!1), jt((L) => Math.max(0, L - 33));
                          },
                          onStepFrameForward: () => {
                            Dt(!1), jt((L) => Math.min(f, L + 33));
                          }
                        }
                      ),
                      /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                        /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(m + nt, r) })
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      Cm,
                      {
                        stations: tn,
                        activeStationId: S,
                        onSelectActiveStation: (L) => cs(v.length <= 1 ? L : L === S ? null : L),
                        onStationContextMenu: Z,
                        onDeselectStation: D,
                        stationAutoDirectorMap: wt,
                        onToggleStationAutoDirector: gt,
                        baseEpochMs: m,
                        timeMode: r,
                        totalDurationMs: f,
                        zoomLevel: xe,
                        onZoomChange: Ue,
                        onZoomReset: ee,
                        onFitRange: ue,
                        onJumpViewportTo: Ee,
                        playheadMs: nt,
                        setPlayheadMs: jt,
                        inPointMs: H,
                        setInPointMs: ne,
                        outPointMs: se,
                        setOutPointMs: de,
                        viewportStartMs: yt,
                        onViewportStartChange: me,
                        onExport: Ce,
                        recordingSegments: ke,
                        movieBoundaries: ft,
                        onEstimateLoaded: (L) => (L == null ? void 0 : L.removedGlobalGaps) && E(L.removedGlobalGaps),
                        keystrokeMode: o,
                        onChangeKeystrokeMode: a,
                        keystrokes: yn,
                        showKeystrokes: c,
                        showRulerKeystrokes: c,
                        onToggleRulerKeystrokes: () => u((L) => !L),
                        onSplitDirectorSegment: nr,
                        onChangeDirectorSegmentDisplay: dn,
                        onResetDirectorSegmentToAuto: pn,
                        audioRoutingPlan: en,
                        onSplitAudioSegment: Fs,
                        onChangeAudioSegmentStation: Xl,
                        onChangeAudioSegmentGain: Gl,
                        onFollowVisualFeed: tr,
                        isAutoFollowAudio: U,
                        canvasLayoutTimeline: ye,
                        activeKfIndex: Pe,
                        onSelectKeyframe: (L, ie) => {
                          Se(L), jt(Math.max(0, ie - m));
                        },
                        onAddKeyframeAtEpoch: Ie,
                        onDeleteKeyframe: Ye,
                        onUpdateKeyframeEpoch: It,
                        onUpdateKeyframeTransition: Ze,
                        onUpdateKeyframeClockPosition: Wt,
                        onToggleDisplayOnCanvas: ct,
                        onUpdateAudioPlan: B
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        !Kt && /* @__PURE__ */ s.jsx(
          Wy,
          {
            isOpen: zt || rr,
            onToggle: () => _t(!zt),
            onClose: () => _t(!1),
            allStations: De,
            selectedStationIds: v,
            onToggleStation: (L) => I((ie) => ie.includes(L) ? ie.filter((ce) => ce !== L) : [...ie, L]),
            onUpdateSelections: I,
            isInitialSetup: rr,
            isLoadingStations: Xe,
            recordingSegments: ke,
            baseEpochMs: h,
            durationMs: t.durationMs,
            onApply: () => {
              v.length > 0 && (O(null), g(null), Qt(!0), _t(!1));
            },
            onOpenRangeModal: () => tt(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Ky,
      {
        isOpen: Fe,
        onClose: () => tt(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: Jl,
        onApplyRange: be
      }
    ),
    /* @__PURE__ */ s.jsx(
      Yy,
      {
        isOpen: st,
        onClose: () => vt(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: m,
          timelineBaseEpochMs: m,
          playheadMs: nt,
          inPointMs: H,
          outPointMs: se,
          selectedStationIds: v,
          selectedStationNames: De.filter((L) => v.includes(L.id)).map((L) => L.displayName || L.hostname || L.id),
          allStationIds: De.map((L) => L.id),
          activeStationId: S,
          activeStationName: (qe == null ? void 0 : qe.displayName) || (qe == null ? void 0 : qe.hostname) || null,
          spotlightStationId: w,
          keystrokeMode: o
        },
        onLoadBookmark: Jl
      }
    ),
    /* @__PURE__ */ s.jsx(
      Mm,
      {
        isOpen: ot,
        onClose: () => ut(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      qy,
      {
        isOpen: Ot,
        station: Or,
        initialDisplayId: k,
        allStations: tn,
        onSelectStation: (L) => {
          L !== w && Ct(1), O(L), g(L);
        },
        onClose: il,
        baseEpochMs: m,
        timeMode: r,
        totalDurationMs: f,
        zoomLevel: xe,
        onZoomChange: Ue,
        onZoomReset: ee,
        onFitRange: ue,
        onJumpViewportTo: Ee,
        viewportStartMs: yt,
        onViewportStartChange: me,
        playheadMs: nt,
        setPlayheadMs: jt,
        playheadEpochMs: Br,
        inPointMs: H,
        setInPointMs: ne,
        outPointMs: se,
        setOutPointMs: de,
        recordingSegments: ke,
        globalGaps: C,
        isPlaying: At,
        setIsPlaying: Dt,
        isLooping: fn,
        setIsLooping: Xt,
        playbackSpeed: ln,
        setPlaybackSpeed: Ct,
        onExport: Ce,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: yn,
        showRulerKeystrokes: c,
        onToggleRulerKeystrokes: () => u((L) => !L),
        directorPlan: Or == null ? void 0 : Or.directorPlan,
        onOverrideDisplay: dn,
        onSplitDirectorSegment: nr,
        onChangeDirectorSegmentDisplay: dn,
        onResetDirectorSegmentToAuto: pn
      }
    ),
    /* @__PURE__ */ s.jsx(
      Zy,
      {
        menu: $,
        onClose: () => j(null),
        onDeselect: D,
        onFocusSolo: cs
      }
    ),
    /* @__PURE__ */ s.jsx(
      e1,
      {
        isOpen: G,
        onClose: () => V(!1),
        onConfirm: dd,
        compositionSummary: {
          scope: _,
          layout: (z == null ? void 0 : z.preset) || M,
          isPipSwapped: F,
          isAutoDirectorEnabled: le,
          stationsCount: et.length,
          audioSegmentsCount: ((ql = en == null ? void 0 : en.segments) == null ? void 0 : ql.length) || 1,
          resolution: (ye == null ? void 0 : ye.resolution) || (z == null ? void 0 : z.resolution) || "2K",
          canvasWidth: (z == null ? void 0 : z.width) || 2560,
          canvasHeight: (z == null ? void 0 : z.height) || 1440
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Im, {})
  ] });
}
const Qh = "itb-extractor-advanced-theme", Jh = "itb-global-export-job-monitor-root";
function Tm() {
  if (!(typeof document > "u") && !document.getElementById(Qh)) {
    const e = document.createElement("link");
    e.id = Qh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Tm();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Jh);
  if (!t) {
    t = document.createElement("div"), t.id = Jh, document.body.appendChild(t);
    try {
      Fa.createRoot(t).render(fi.createElement(Im, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function a1(e, t = {}) {
  Tm();
  const n = Fa.createRoot(e);
  return n.render(fi.createElement(o1, t)), () => {
    n.unmount();
  };
}
export {
  Im as ExportJobMonitor,
  o1 as ExtractorAdvancedStudio,
  o1 as default,
  a1 as mount
};
