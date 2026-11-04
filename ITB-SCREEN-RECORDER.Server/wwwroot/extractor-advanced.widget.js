function Pp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Qd = { exports: {} }, ft = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uo = Symbol.for("react.element"), _p = Symbol.for("react.portal"), Fp = Symbol.for("react.fragment"), Bp = Symbol.for("react.strict_mode"), Up = Symbol.for("react.profiler"), Wp = Symbol.for("react.provider"), zp = Symbol.for("react.context"), Hp = Symbol.for("react.forward_ref"), Vp = Symbol.for("react.suspense"), Kp = Symbol.for("react.memo"), Yp = Symbol.for("react.lazy"), Su = Symbol.iterator;
function Gp(e) {
  return e === null || typeof e != "object" ? null : (e = Su && e[Su] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Jd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Zd = Object.assign, qd = {};
function gl(e, t, n) {
  this.props = e, this.context = t, this.refs = qd, this.updater = n || Jd;
}
gl.prototype.isReactComponent = {};
gl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
gl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function eh() {
}
eh.prototype = gl.prototype;
function Cc(e, t, n) {
  this.props = e, this.context = t, this.refs = qd, this.updater = n || Jd;
}
var Ec = Cc.prototype = new eh();
Ec.constructor = Cc;
Zd(Ec, gl.prototype);
Ec.isPureReactComponent = !0;
var bu = Array.isArray, th = Object.prototype.hasOwnProperty, Sc = { current: null }, nh = { key: !0, ref: !0, __self: !0, __source: !0 };
function sh(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) th.call(t, r) && !nh.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), d = 0; d < a; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: uo, type: e, key: o, ref: i, props: l, _owner: Sc.current };
}
function Xp(e, t) {
  return { $$typeof: uo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function bc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === uo;
}
function Qp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Mu = /\/+/g;
function Yi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Qp("" + e.key) : t.toString(36);
}
function Fo(e, t, n, r, l) {
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
        case uo:
        case _p:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Yi(i, 0) : r, bu(l) ? (n = "", e != null && (n = e.replace(Mu, "$&/") + "/"), Fo(l, t, n, "", function(d) {
    return d;
  })) : l != null && (bc(l) && (l = Xp(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Mu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", bu(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var c = r + Yi(o, a);
    i += Fo(o, t, n, c, l);
  }
  else if (c = Gp(e), typeof c == "function") for (e = c.call(e), a = 0; !(o = e.next()).done; ) o = o.value, c = r + Yi(o, a++), i += Fo(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function No(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Fo(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Jp(e) {
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
var Rn = { current: null }, Bo = { transition: null }, Zp = { ReactCurrentDispatcher: Rn, ReactCurrentBatchConfig: Bo, ReactCurrentOwner: Sc };
function rh() {
  throw Error("act(...) is not supported in production builds of React.");
}
ft.Children = { map: No, forEach: function(e, t, n) {
  No(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return No(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return No(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!bc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
ft.Component = gl;
ft.Fragment = Fp;
ft.Profiler = Up;
ft.PureComponent = Cc;
ft.StrictMode = Bp;
ft.Suspense = Vp;
ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zp;
ft.act = rh;
ft.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Zd({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Sc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) th.call(t, c) && !nh.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var d = 0; d < c; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: uo, type: e.type, key: l, ref: o, props: r, _owner: i };
};
ft.createContext = function(e) {
  return e = { $$typeof: zp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Wp, _context: e }, e.Consumer = e;
};
ft.createElement = sh;
ft.createFactory = function(e) {
  var t = sh.bind(null, e);
  return t.type = e, t;
};
ft.createRef = function() {
  return { current: null };
};
ft.forwardRef = function(e) {
  return { $$typeof: Hp, render: e };
};
ft.isValidElement = bc;
ft.lazy = function(e) {
  return { $$typeof: Yp, _payload: { _status: -1, _result: e }, _init: Jp };
};
ft.memo = function(e, t) {
  return { $$typeof: Kp, type: e, compare: t === void 0 ? null : t };
};
ft.startTransition = function(e) {
  var t = Bo.transition;
  Bo.transition = {};
  try {
    e();
  } finally {
    Bo.transition = t;
  }
};
ft.unstable_act = rh;
ft.useCallback = function(e, t) {
  return Rn.current.useCallback(e, t);
};
ft.useContext = function(e) {
  return Rn.current.useContext(e);
};
ft.useDebugValue = function() {
};
ft.useDeferredValue = function(e) {
  return Rn.current.useDeferredValue(e);
};
ft.useEffect = function(e, t) {
  return Rn.current.useEffect(e, t);
};
ft.useId = function() {
  return Rn.current.useId();
};
ft.useImperativeHandle = function(e, t, n) {
  return Rn.current.useImperativeHandle(e, t, n);
};
ft.useInsertionEffect = function(e, t) {
  return Rn.current.useInsertionEffect(e, t);
};
ft.useLayoutEffect = function(e, t) {
  return Rn.current.useLayoutEffect(e, t);
};
ft.useMemo = function(e, t) {
  return Rn.current.useMemo(e, t);
};
ft.useReducer = function(e, t, n) {
  return Rn.current.useReducer(e, t, n);
};
ft.useRef = function(e) {
  return Rn.current.useRef(e);
};
ft.useState = function(e) {
  return Rn.current.useState(e);
};
ft.useSyncExternalStore = function(e, t, n) {
  return Rn.current.useSyncExternalStore(e, t, n);
};
ft.useTransition = function() {
  return Rn.current.useTransition();
};
ft.version = "18.3.1";
Qd.exports = ft;
var u = Qd.exports;
const ho = /* @__PURE__ */ Pp(u);
var qo = {}, lh = { exports: {} }, Gn = {}, oh = { exports: {} }, ih = {};
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
  function t(E, P) {
    var z = E.length;
    E.push(P);
    e: for (; 0 < z; ) {
      var q = z - 1 >>> 1, U = E[q];
      if (0 < l(U, P)) E[q] = P, E[z] = U, z = q;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var P = E[0], z = E.pop();
    if (z !== P) {
      E[0] = z;
      e: for (var q = 0, U = E.length, ge = U >>> 1; q < ge; ) {
        var ie = 2 * (q + 1) - 1, oe = E[ie], le = ie + 1, Fe = E[le];
        if (0 > l(oe, z)) le < U && 0 > l(Fe, oe) ? (E[q] = Fe, E[le] = z, q = le) : (E[q] = oe, E[ie] = z, q = ie);
        else if (le < U && 0 > l(Fe, z)) E[q] = Fe, E[le] = z, q = le;
        else break e;
      }
    }
    return P;
  }
  function l(E, P) {
    var z = E.sortIndex - P.sortIndex;
    return z !== 0 ? z : E.id - P.id;
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
  var c = [], d = [], N = 1, m = null, g = 3, k = !1, S = !1, b = !1, L = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(E) {
    for (var P = n(d); P !== null; ) {
      if (P.callback === null) r(d);
      else if (P.startTime <= E) r(d), P.sortIndex = P.expirationTime, t(c, P);
      else break;
      P = n(d);
    }
  }
  function M(E) {
    if (b = !1, h(E), !S) if (n(c) !== null) S = !0, F(T);
    else {
      var P = n(d);
      P !== null && D(M, P.startTime - E);
    }
  }
  function T(E, P) {
    S = !1, b && (b = !1, y(x), x = -1), k = !0;
    var z = g;
    try {
      for (h(P), m = n(c); m !== null && (!(m.expirationTime > P) || E && !O()); ) {
        var q = m.callback;
        if (typeof q == "function") {
          m.callback = null, g = m.priorityLevel;
          var U = q(m.expirationTime <= P);
          P = e.unstable_now(), typeof U == "function" ? m.callback = U : m === n(c) && r(c), h(P);
        } else r(c);
        m = n(c);
      }
      if (m !== null) var ge = !0;
      else {
        var ie = n(d);
        ie !== null && D(M, ie.startTime - P), ge = !1;
      }
      return ge;
    } finally {
      m = null, g = z, k = !1;
    }
  }
  var j = !1, v = null, x = -1, w = 5, I = -1;
  function O() {
    return !(e.unstable_now() - I < w);
  }
  function H() {
    if (v !== null) {
      var E = e.unstable_now();
      I = E;
      var P = !0;
      try {
        P = v(!0, E);
      } finally {
        P ? R() : (j = !1, v = null);
      }
    } else j = !1;
  }
  var R;
  if (typeof p == "function") R = function() {
    p(H);
  };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(), se = W.port2;
    W.port1.onmessage = H, R = function() {
      se.postMessage(null);
    };
  } else R = function() {
    L(H, 0);
  };
  function F(E) {
    v = E, j || (j = !0, R());
  }
  function D(E, P) {
    x = L(function() {
      E(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    S || k || (S = !0, F(T));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(E) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = g;
    }
    var z = g;
    g = P;
    try {
      return E();
    } finally {
      g = z;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, P) {
    switch (E) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        E = 3;
    }
    var z = g;
    g = E;
    try {
      return P();
    } finally {
      g = z;
    }
  }, e.unstable_scheduleCallback = function(E, P, z) {
    var q = e.unstable_now();
    switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? q + z : q) : z = q, E) {
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
    return U = z + U, E = { id: N++, callback: P, priorityLevel: E, startTime: z, expirationTime: U, sortIndex: -1 }, z > q ? (E.sortIndex = z, t(d, E), n(c) === null && E === n(d) && (b ? (y(x), x = -1) : b = !0, D(M, z - q))) : (E.sortIndex = U, t(c, E), S || k || (S = !0, F(T))), E;
  }, e.unstable_shouldYield = O, e.unstable_wrapCallback = function(E) {
    var P = g;
    return function() {
      var z = g;
      g = P;
      try {
        return E.apply(this, arguments);
      } finally {
        g = z;
      }
    };
  };
})(ih);
oh.exports = ih;
var qp = oh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var em = u, Yn = qp;
function pe(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ah = /* @__PURE__ */ new Set(), Kl = {};
function Rr(e, t) {
  cl(e, t), cl(e + "Capture", t);
}
function cl(e, t) {
  for (Kl[e] = t, e = 0; e < t.length; e++) ah.add(t[e]);
}
var Rs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Sa = Object.prototype.hasOwnProperty, tm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Iu = {}, Tu = {};
function nm(e) {
  return Sa.call(Tu, e) ? !0 : Sa.call(Iu, e) ? !1 : tm.test(e) ? Tu[e] = !0 : (Iu[e] = !0, !1);
}
function sm(e, t, n, r) {
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
function rm(e, t, n, r) {
  if (t === null || typeof t > "u" || sm(e, t, n, r)) return !0;
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
var xn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  xn[e] = new $n(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  xn[t] = new $n(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  xn[e] = new $n(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  xn[e] = new $n(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  xn[e] = new $n(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  xn[e] = new $n(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  xn[e] = new $n(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  xn[e] = new $n(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  xn[e] = new $n(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Mc = /[\-:]([a-z])/g;
function Ic(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Mc,
    Ic
  );
  xn[t] = new $n(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Mc, Ic);
  xn[t] = new $n(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Mc, Ic);
  xn[t] = new $n(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  xn[e] = new $n(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xn.xlinkHref = new $n("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  xn[e] = new $n(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Tc(e, t, n, r) {
  var l = xn.hasOwnProperty(t) ? xn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (rm(t, n, l, r) && (n = null), r || l === null ? nm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ds = em.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ko = Symbol.for("react.element"), Ur = Symbol.for("react.portal"), Wr = Symbol.for("react.fragment"), Ac = Symbol.for("react.strict_mode"), ba = Symbol.for("react.profiler"), ch = Symbol.for("react.provider"), uh = Symbol.for("react.context"), Rc = Symbol.for("react.forward_ref"), Ma = Symbol.for("react.suspense"), Ia = Symbol.for("react.suspense_list"), $c = Symbol.for("react.memo"), Vs = Symbol.for("react.lazy"), dh = Symbol.for("react.offscreen"), Au = Symbol.iterator;
function wl(e) {
  return e === null || typeof e != "object" ? null : (e = Au && e[Au] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Ht = Object.assign, Gi;
function Rl(e) {
  if (Gi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Gi = t && t[1] || "";
  }
  return `
` + Gi + e;
}
var Xi = !1;
function Qi(e, t) {
  if (!e || Xi) return "";
  Xi = !0;
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
    Xi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Rl(e) : "";
}
function lm(e) {
  switch (e.tag) {
    case 5:
      return Rl(e.type);
    case 16:
      return Rl("Lazy");
    case 13:
      return Rl("Suspense");
    case 19:
      return Rl("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Qi(e.type, !1), e;
    case 11:
      return e = Qi(e.type.render, !1), e;
    case 1:
      return e = Qi(e.type, !0), e;
    default:
      return "";
  }
}
function Ta(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Wr:
      return "Fragment";
    case Ur:
      return "Portal";
    case ba:
      return "Profiler";
    case Ac:
      return "StrictMode";
    case Ma:
      return "Suspense";
    case Ia:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case uh:
      return (e.displayName || "Context") + ".Consumer";
    case ch:
      return (e._context.displayName || "Context") + ".Provider";
    case Rc:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case $c:
      return t = e.displayName || null, t !== null ? t : Ta(e.type) || "Memo";
    case Vs:
      t = e._payload, e = e._init;
      try {
        return Ta(e(t));
      } catch {
      }
  }
  return null;
}
function om(e) {
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
      return Ta(t);
    case 8:
      return t === Ac ? "StrictMode" : "Mode";
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
function ar(e) {
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
function hh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function im(e) {
  var t = hh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function wo(e) {
  e._valueTracker || (e._valueTracker = im(e));
}
function fh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = hh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ei(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Aa(e, t) {
  var n = t.checked;
  return Ht({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Ru(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ar(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ph(e, t) {
  t = t.checked, t != null && Tc(e, "checked", t, !1);
}
function Ra(e, t) {
  ph(e, t);
  var n = ar(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? $a(e, t.type, n) : t.hasOwnProperty("defaultValue") && $a(e, t.type, ar(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function $u(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function $a(e, t, n) {
  (t !== "number" || ei(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var $l = Array.isArray;
function el(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ar(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function La(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(pe(91));
  return Ht({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Lu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(pe(92));
      if ($l(n)) {
        if (1 < n.length) throw Error(pe(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ar(n) };
}
function mh(e, t) {
  var n = ar(t.value), r = ar(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Ou(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function gh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Oa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? gh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var jo, xh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (jo = jo || document.createElement("div"), jo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = jo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Yl(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Pl = {
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
}, am = ["Webkit", "ms", "Moz", "O"];
Object.keys(Pl).forEach(function(e) {
  am.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Pl[t] = Pl[e];
  });
});
function yh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Pl.hasOwnProperty(e) && Pl[e] ? ("" + t).trim() : t + "px";
}
function vh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = yh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var cm = Ht({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Da(e, t) {
  if (t) {
    if (cm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(pe(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(pe(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(pe(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(pe(62));
  }
}
function Pa(e, t) {
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
var _a = null;
function Lc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Fa = null, tl = null, nl = null;
function Du(e) {
  if (e = mo(e)) {
    if (typeof Fa != "function") throw Error(pe(280));
    var t = e.stateNode;
    t && (t = Ti(t), Fa(e.stateNode, e.type, t));
  }
}
function Nh(e) {
  tl ? nl ? nl.push(e) : nl = [e] : tl = e;
}
function kh() {
  if (tl) {
    var e = tl, t = nl;
    if (nl = tl = null, Du(e), t) for (e = 0; e < t.length; e++) Du(t[e]);
  }
}
function wh(e, t) {
  return e(t);
}
function jh() {
}
var Ji = !1;
function Ch(e, t, n) {
  if (Ji) return e(t, n);
  Ji = !0;
  try {
    return wh(e, t, n);
  } finally {
    Ji = !1, (tl !== null || nl !== null) && (jh(), kh());
  }
}
function Gl(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ti(n);
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
  if (n && typeof n != "function") throw Error(pe(231, t, typeof n));
  return n;
}
var Ba = !1;
if (Rs) try {
  var jl = {};
  Object.defineProperty(jl, "passive", { get: function() {
    Ba = !0;
  } }), window.addEventListener("test", jl, jl), window.removeEventListener("test", jl, jl);
} catch {
  Ba = !1;
}
function um(e, t, n, r, l, o, i, a, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (N) {
    this.onError(N);
  }
}
var _l = !1, ti = null, ni = !1, Ua = null, dm = { onError: function(e) {
  _l = !0, ti = e;
} };
function hm(e, t, n, r, l, o, i, a, c) {
  _l = !1, ti = null, um.apply(dm, arguments);
}
function fm(e, t, n, r, l, o, i, a, c) {
  if (hm.apply(this, arguments), _l) {
    if (_l) {
      var d = ti;
      _l = !1, ti = null;
    } else throw Error(pe(198));
    ni || (ni = !0, Ua = d);
  }
}
function $r(e) {
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
function Eh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Pu(e) {
  if ($r(e) !== e) throw Error(pe(188));
}
function pm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = $r(e), t === null) throw Error(pe(188));
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
        if (o === n) return Pu(l), e;
        if (o === r) return Pu(l), t;
        o = o.sibling;
      }
      throw Error(pe(188));
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
        if (!i) throw Error(pe(189));
      }
    }
    if (n.alternate !== r) throw Error(pe(190));
  }
  if (n.tag !== 3) throw Error(pe(188));
  return n.stateNode.current === n ? e : t;
}
function Sh(e) {
  return e = pm(e), e !== null ? bh(e) : null;
}
function bh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = bh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Mh = Yn.unstable_scheduleCallback, _u = Yn.unstable_cancelCallback, mm = Yn.unstable_shouldYield, gm = Yn.unstable_requestPaint, qt = Yn.unstable_now, xm = Yn.unstable_getCurrentPriorityLevel, Oc = Yn.unstable_ImmediatePriority, Ih = Yn.unstable_UserBlockingPriority, si = Yn.unstable_NormalPriority, ym = Yn.unstable_LowPriority, Th = Yn.unstable_IdlePriority, Si = null, vs = null;
function vm(e) {
  if (vs && typeof vs.onCommitFiberRoot == "function") try {
    vs.onCommitFiberRoot(Si, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var cs = Math.clz32 ? Math.clz32 : wm, Nm = Math.log, km = Math.LN2;
function wm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Nm(e) / km | 0) | 0;
}
var Co = 64, Eo = 4194304;
function Ll(e) {
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
function ri(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? r = Ll(a) : (o &= i, o !== 0 && (r = Ll(o)));
  } else i = n & ~l, i !== 0 ? r = Ll(i) : o !== 0 && (r = Ll(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - cs(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function jm(e, t) {
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
function Cm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - cs(o), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & r) && (l[i] = jm(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function Wa(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ah() {
  var e = Co;
  return Co <<= 1, !(Co & 4194240) && (Co = 64), e;
}
function Zi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function fo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - cs(t), e[t] = n;
}
function Em(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - cs(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Dc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - cs(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Tt = 0;
function Rh(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var $h, Pc, Lh, Oh, Dh, za = !1, So = [], er = null, tr = null, nr = null, Xl = /* @__PURE__ */ new Map(), Ql = /* @__PURE__ */ new Map(), Xs = [], Sm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Fu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      er = null;
      break;
    case "dragenter":
    case "dragleave":
      tr = null;
      break;
    case "mouseover":
    case "mouseout":
      nr = null;
      break;
    case "pointerover":
    case "pointerout":
      Xl.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ql.delete(t.pointerId);
  }
}
function Cl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = mo(t), t !== null && Pc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function bm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return er = Cl(er, e, t, n, r, l), !0;
    case "dragenter":
      return tr = Cl(tr, e, t, n, r, l), !0;
    case "mouseover":
      return nr = Cl(nr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Xl.set(o, Cl(Xl.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Ql.set(o, Cl(Ql.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ph(e) {
  var t = kr(e.target);
  if (t !== null) {
    var n = $r(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Eh(n), t !== null) {
          e.blockedOn = t, Dh(e.priority, function() {
            Lh(n);
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
    var n = Ha(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      _a = r, n.target.dispatchEvent(r), _a = null;
    } else return t = mo(n), t !== null && Pc(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Bu(e, t, n) {
  Uo(e) && n.delete(t);
}
function Mm() {
  za = !1, er !== null && Uo(er) && (er = null), tr !== null && Uo(tr) && (tr = null), nr !== null && Uo(nr) && (nr = null), Xl.forEach(Bu), Ql.forEach(Bu);
}
function El(e, t) {
  e.blockedOn === t && (e.blockedOn = null, za || (za = !0, Yn.unstable_scheduleCallback(Yn.unstable_NormalPriority, Mm)));
}
function Jl(e) {
  function t(l) {
    return El(l, e);
  }
  if (0 < So.length) {
    El(So[0], e);
    for (var n = 1; n < So.length; n++) {
      var r = So[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (er !== null && El(er, e), tr !== null && El(tr, e), nr !== null && El(nr, e), Xl.forEach(t), Ql.forEach(t), n = 0; n < Xs.length; n++) r = Xs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Xs.length && (n = Xs[0], n.blockedOn === null); ) Ph(n), n.blockedOn === null && Xs.shift();
}
var sl = Ds.ReactCurrentBatchConfig, li = !0;
function Im(e, t, n, r) {
  var l = Tt, o = sl.transition;
  sl.transition = null;
  try {
    Tt = 1, _c(e, t, n, r);
  } finally {
    Tt = l, sl.transition = o;
  }
}
function Tm(e, t, n, r) {
  var l = Tt, o = sl.transition;
  sl.transition = null;
  try {
    Tt = 4, _c(e, t, n, r);
  } finally {
    Tt = l, sl.transition = o;
  }
}
function _c(e, t, n, r) {
  if (li) {
    var l = Ha(e, t, n, r);
    if (l === null) aa(e, t, r, oi, n), Fu(e, r);
    else if (bm(l, e, t, n, r)) r.stopPropagation();
    else if (Fu(e, r), t & 4 && -1 < Sm.indexOf(e)) {
      for (; l !== null; ) {
        var o = mo(l);
        if (o !== null && $h(o), o = Ha(e, t, n, r), o === null && aa(e, t, r, oi, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else aa(e, t, r, null, n);
  }
}
var oi = null;
function Ha(e, t, n, r) {
  if (oi = null, e = Lc(r), e = kr(e), e !== null) if (t = $r(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Eh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return oi = e, null;
}
function _h(e) {
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
      switch (xm()) {
        case Oc:
          return 1;
        case Ih:
          return 4;
        case si:
        case ym:
          return 16;
        case Th:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Zs = null, Fc = null, Wo = null;
function Fh() {
  if (Wo) return Wo;
  var e, t = Fc, n = t.length, r, l = "value" in Zs ? Zs.value : Zs.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Wo = l.slice(e, 1 < r ? 1 - r : void 0);
}
function zo(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function bo() {
  return !0;
}
function Uu() {
  return !1;
}
function Xn(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? bo : Uu, this.isPropagationStopped = Uu, this;
  }
  return Ht(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = bo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = bo);
  }, persist: function() {
  }, isPersistent: bo }), t;
}
var xl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Bc = Xn(xl), po = Ht({}, xl, { view: 0, detail: 0 }), Am = Xn(po), qi, ea, Sl, bi = Ht({}, po, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Uc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Sl && (Sl && e.type === "mousemove" ? (qi = e.screenX - Sl.screenX, ea = e.screenY - Sl.screenY) : ea = qi = 0, Sl = e), qi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ea;
} }), Wu = Xn(bi), Rm = Ht({}, bi, { dataTransfer: 0 }), $m = Xn(Rm), Lm = Ht({}, po, { relatedTarget: 0 }), ta = Xn(Lm), Om = Ht({}, xl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Dm = Xn(Om), Pm = Ht({}, xl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), _m = Xn(Pm), Fm = Ht({}, xl, { data: 0 }), zu = Xn(Fm), Bm = {
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
}, Wm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function zm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Wm[e]) ? !!t[e] : !1;
}
function Uc() {
  return zm;
}
var Hm = Ht({}, po, { key: function(e) {
  if (e.key) {
    var t = Bm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = zo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Um[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Uc, charCode: function(e) {
  return e.type === "keypress" ? zo(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? zo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Vm = Xn(Hm), Km = Ht({}, bi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Hu = Xn(Km), Ym = Ht({}, po, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Uc }), Gm = Xn(Ym), Xm = Ht({}, xl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Qm = Xn(Xm), Jm = Ht({}, bi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zm = Xn(Jm), qm = [9, 13, 27, 32], Wc = Rs && "CompositionEvent" in window, Fl = null;
Rs && "documentMode" in document && (Fl = document.documentMode);
var e0 = Rs && "TextEvent" in window && !Fl, Bh = Rs && (!Wc || Fl && 8 < Fl && 11 >= Fl), Vu = " ", Ku = !1;
function Uh(e, t) {
  switch (e) {
    case "keyup":
      return qm.indexOf(t.keyCode) !== -1;
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
function Wh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var zr = !1;
function t0(e, t) {
  switch (e) {
    case "compositionend":
      return Wh(t);
    case "keypress":
      return t.which !== 32 ? null : (Ku = !0, Vu);
    case "textInput":
      return e = t.data, e === Vu && Ku ? null : e;
    default:
      return null;
  }
}
function n0(e, t) {
  if (zr) return e === "compositionend" || !Wc && Uh(e, t) ? (e = Fh(), Wo = Fc = Zs = null, zr = !1, e) : null;
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
      return Bh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var s0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Yu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!s0[e.type] : t === "textarea";
}
function zh(e, t, n, r) {
  Nh(r), t = ii(t, "onChange"), 0 < t.length && (n = new Bc("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Bl = null, Zl = null;
function r0(e) {
  ef(e, 0);
}
function Mi(e) {
  var t = Kr(e);
  if (fh(t)) return e;
}
function l0(e, t) {
  if (e === "change") return t;
}
var Hh = !1;
if (Rs) {
  var na;
  if (Rs) {
    var sa = "oninput" in document;
    if (!sa) {
      var Gu = document.createElement("div");
      Gu.setAttribute("oninput", "return;"), sa = typeof Gu.oninput == "function";
    }
    na = sa;
  } else na = !1;
  Hh = na && (!document.documentMode || 9 < document.documentMode);
}
function Xu() {
  Bl && (Bl.detachEvent("onpropertychange", Vh), Zl = Bl = null);
}
function Vh(e) {
  if (e.propertyName === "value" && Mi(Zl)) {
    var t = [];
    zh(t, Zl, e, Lc(e)), Ch(r0, t);
  }
}
function o0(e, t, n) {
  e === "focusin" ? (Xu(), Bl = t, Zl = n, Bl.attachEvent("onpropertychange", Vh)) : e === "focusout" && Xu();
}
function i0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Mi(Zl);
}
function a0(e, t) {
  if (e === "click") return Mi(t);
}
function c0(e, t) {
  if (e === "input" || e === "change") return Mi(t);
}
function u0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var ds = typeof Object.is == "function" ? Object.is : u0;
function ql(e, t) {
  if (ds(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Sa.call(t, l) || !ds(e[l], t[l])) return !1;
  }
  return !0;
}
function Qu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ju(e, t) {
  var n = Qu(e);
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
    n = Qu(n);
  }
}
function Kh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Kh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Yh() {
  for (var e = window, t = ei(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ei(e.document);
  }
  return t;
}
function zc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function d0(e) {
  var t = Yh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Kh(n.ownerDocument.documentElement, n)) {
    if (r !== null && zc(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Ju(n, o);
        var i = Ju(
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
var h0 = Rs && "documentMode" in document && 11 >= document.documentMode, Hr = null, Va = null, Ul = null, Ka = !1;
function Zu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ka || Hr == null || Hr !== ei(r) || (r = Hr, "selectionStart" in r && zc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ul && ql(Ul, r) || (Ul = r, r = ii(Va, "onSelect"), 0 < r.length && (t = new Bc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Hr)));
}
function Mo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Vr = { animationend: Mo("Animation", "AnimationEnd"), animationiteration: Mo("Animation", "AnimationIteration"), animationstart: Mo("Animation", "AnimationStart"), transitionend: Mo("Transition", "TransitionEnd") }, ra = {}, Gh = {};
Rs && (Gh = document.createElement("div").style, "AnimationEvent" in window || (delete Vr.animationend.animation, delete Vr.animationiteration.animation, delete Vr.animationstart.animation), "TransitionEvent" in window || delete Vr.transitionend.transition);
function Ii(e) {
  if (ra[e]) return ra[e];
  if (!Vr[e]) return e;
  var t = Vr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Gh) return ra[e] = t[n];
  return e;
}
var Xh = Ii("animationend"), Qh = Ii("animationiteration"), Jh = Ii("animationstart"), Zh = Ii("transitionend"), qh = /* @__PURE__ */ new Map(), qu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ur(e, t) {
  qh.set(e, t), Rr(t, [e]);
}
for (var la = 0; la < qu.length; la++) {
  var oa = qu[la], f0 = oa.toLowerCase(), p0 = oa[0].toUpperCase() + oa.slice(1);
  ur(f0, "on" + p0);
}
ur(Xh, "onAnimationEnd");
ur(Qh, "onAnimationIteration");
ur(Jh, "onAnimationStart");
ur("dblclick", "onDoubleClick");
ur("focusin", "onFocus");
ur("focusout", "onBlur");
ur(Zh, "onTransitionEnd");
cl("onMouseEnter", ["mouseout", "mouseover"]);
cl("onMouseLeave", ["mouseout", "mouseover"]);
cl("onPointerEnter", ["pointerout", "pointerover"]);
cl("onPointerLeave", ["pointerout", "pointerover"]);
Rr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Rr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Rr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Rr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Rr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Rr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ol = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), m0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ol));
function ed(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, fm(r, t, void 0, e), e.currentTarget = null;
}
function ef(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], c = a.instance, d = a.currentTarget;
        if (a = a.listener, c !== o && l.isPropagationStopped()) break e;
        ed(l, a, d), o = c;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], c = a.instance, d = a.currentTarget, a = a.listener, c !== o && l.isPropagationStopped()) break e;
        ed(l, a, d), o = c;
      }
    }
  }
  if (ni) throw e = Ua, ni = !1, Ua = null, e;
}
function Pt(e, t) {
  var n = t[Ja];
  n === void 0 && (n = t[Ja] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (tf(t, e, 2, !1), n.add(r));
}
function ia(e, t, n) {
  var r = 0;
  t && (r |= 4), tf(n, e, r, t);
}
var Io = "_reactListening" + Math.random().toString(36).slice(2);
function eo(e) {
  if (!e[Io]) {
    e[Io] = !0, ah.forEach(function(n) {
      n !== "selectionchange" && (m0.has(n) || ia(n, !1, e), ia(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Io] || (t[Io] = !0, ia("selectionchange", !1, t));
  }
}
function tf(e, t, n, r) {
  switch (_h(t)) {
    case 1:
      var l = Im;
      break;
    case 4:
      l = Tm;
      break;
    default:
      l = _c;
  }
  n = l.bind(null, t, n, e), l = void 0, !Ba || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function aa(e, t, n, r, l) {
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
        if (i = kr(a), i === null) return;
        if (c = i.tag, c === 5 || c === 6) {
          r = o = i;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Ch(function() {
    var d = o, N = Lc(n), m = [];
    e: {
      var g = qh.get(e);
      if (g !== void 0) {
        var k = Bc, S = e;
        switch (e) {
          case "keypress":
            if (zo(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = Vm;
            break;
          case "focusin":
            S = "focus", k = ta;
            break;
          case "focusout":
            S = "blur", k = ta;
            break;
          case "beforeblur":
          case "afterblur":
            k = ta;
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
            k = Wu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = $m;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = Gm;
            break;
          case Xh:
          case Qh:
          case Jh:
            k = Dm;
            break;
          case Zh:
            k = Qm;
            break;
          case "scroll":
            k = Am;
            break;
          case "wheel":
            k = Zm;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = _m;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = Hu;
        }
        var b = (t & 4) !== 0, L = !b && e === "scroll", y = b ? g !== null ? g + "Capture" : null : g;
        b = [];
        for (var p = d, h; p !== null; ) {
          h = p;
          var M = h.stateNode;
          if (h.tag === 5 && M !== null && (h = M, y !== null && (M = Gl(p, y), M != null && b.push(to(p, M, h)))), L) break;
          p = p.return;
        }
        0 < b.length && (g = new k(g, S, null, n, N), m.push({ event: g, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", g && n !== _a && (S = n.relatedTarget || n.fromElement) && (kr(S) || S[$s])) break e;
        if ((k || g) && (g = N.window === N ? N : (g = N.ownerDocument) ? g.defaultView || g.parentWindow : window, k ? (S = n.relatedTarget || n.toElement, k = d, S = S ? kr(S) : null, S !== null && (L = $r(S), S !== L || S.tag !== 5 && S.tag !== 6) && (S = null)) : (k = null, S = d), k !== S)) {
          if (b = Wu, M = "onMouseLeave", y = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (b = Hu, M = "onPointerLeave", y = "onPointerEnter", p = "pointer"), L = k == null ? g : Kr(k), h = S == null ? g : Kr(S), g = new b(M, p + "leave", k, n, N), g.target = L, g.relatedTarget = h, M = null, kr(N) === d && (b = new b(y, p + "enter", S, n, N), b.target = h, b.relatedTarget = L, M = b), L = M, k && S) t: {
            for (b = k, y = S, p = 0, h = b; h; h = Dr(h)) p++;
            for (h = 0, M = y; M; M = Dr(M)) h++;
            for (; 0 < p - h; ) b = Dr(b), p--;
            for (; 0 < h - p; ) y = Dr(y), h--;
            for (; p--; ) {
              if (b === y || y !== null && b === y.alternate) break t;
              b = Dr(b), y = Dr(y);
            }
            b = null;
          }
          else b = null;
          k !== null && td(m, g, k, b, !1), S !== null && L !== null && td(m, L, S, b, !0);
        }
      }
      e: {
        if (g = d ? Kr(d) : window, k = g.nodeName && g.nodeName.toLowerCase(), k === "select" || k === "input" && g.type === "file") var T = l0;
        else if (Yu(g)) if (Hh) T = c0;
        else {
          T = i0;
          var j = o0;
        }
        else (k = g.nodeName) && k.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (T = a0);
        if (T && (T = T(e, d))) {
          zh(m, T, n, N);
          break e;
        }
        j && j(e, g, d), e === "focusout" && (j = g._wrapperState) && j.controlled && g.type === "number" && $a(g, "number", g.value);
      }
      switch (j = d ? Kr(d) : window, e) {
        case "focusin":
          (Yu(j) || j.contentEditable === "true") && (Hr = j, Va = d, Ul = null);
          break;
        case "focusout":
          Ul = Va = Hr = null;
          break;
        case "mousedown":
          Ka = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ka = !1, Zu(m, n, N);
          break;
        case "selectionchange":
          if (h0) break;
        case "keydown":
        case "keyup":
          Zu(m, n, N);
      }
      var v;
      if (Wc) e: {
        switch (e) {
          case "compositionstart":
            var x = "onCompositionStart";
            break e;
          case "compositionend":
            x = "onCompositionEnd";
            break e;
          case "compositionupdate":
            x = "onCompositionUpdate";
            break e;
        }
        x = void 0;
      }
      else zr ? Uh(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
      x && (Bh && n.locale !== "ko" && (zr || x !== "onCompositionStart" ? x === "onCompositionEnd" && zr && (v = Fh()) : (Zs = N, Fc = "value" in Zs ? Zs.value : Zs.textContent, zr = !0)), j = ii(d, x), 0 < j.length && (x = new zu(x, e, null, n, N), m.push({ event: x, listeners: j }), v ? x.data = v : (v = Wh(n), v !== null && (x.data = v)))), (v = e0 ? t0(e, n) : n0(e, n)) && (d = ii(d, "onBeforeInput"), 0 < d.length && (N = new zu("onBeforeInput", "beforeinput", null, n, N), m.push({ event: N, listeners: d }), N.data = v));
    }
    ef(m, t);
  });
}
function to(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ii(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Gl(e, n), o != null && r.unshift(to(e, o, l)), o = Gl(e, t), o != null && r.push(to(e, o, l))), e = e.return;
  }
  return r;
}
function Dr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function td(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, c = a.alternate, d = a.stateNode;
    if (c !== null && c === r) break;
    a.tag === 5 && d !== null && (a = d, l ? (c = Gl(n, o), c != null && i.unshift(to(n, c, a))) : l || (c = Gl(n, o), c != null && i.push(to(n, c, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var g0 = /\r\n?/g, x0 = /\u0000|\uFFFD/g;
function nd(e) {
  return (typeof e == "string" ? e : "" + e).replace(g0, `
`).replace(x0, "");
}
function To(e, t, n) {
  if (t = nd(t), nd(e) !== t && n) throw Error(pe(425));
}
function ai() {
}
var Ya = null, Ga = null;
function Xa(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Qa = typeof setTimeout == "function" ? setTimeout : void 0, y0 = typeof clearTimeout == "function" ? clearTimeout : void 0, sd = typeof Promise == "function" ? Promise : void 0, v0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof sd < "u" ? function(e) {
  return sd.resolve(null).then(e).catch(N0);
} : Qa;
function N0(e) {
  setTimeout(function() {
    throw e;
  });
}
function ca(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Jl(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Jl(t);
}
function sr(e) {
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
function rd(e) {
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
var yl = Math.random().toString(36).slice(2), xs = "__reactFiber$" + yl, no = "__reactProps$" + yl, $s = "__reactContainer$" + yl, Ja = "__reactEvents$" + yl, k0 = "__reactListeners$" + yl, w0 = "__reactHandles$" + yl;
function kr(e) {
  var t = e[xs];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[$s] || n[xs]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = rd(e); e !== null; ) {
        if (n = e[xs]) return n;
        e = rd(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function mo(e) {
  return e = e[xs] || e[$s], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Kr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(pe(33));
}
function Ti(e) {
  return e[no] || null;
}
var Za = [], Yr = -1;
function dr(e) {
  return { current: e };
}
function _t(e) {
  0 > Yr || (e.current = Za[Yr], Za[Yr] = null, Yr--);
}
function Dt(e, t) {
  Yr++, Za[Yr] = e.current, e.current = t;
}
var cr = {}, jn = dr(cr), Bn = dr(!1), br = cr;
function ul(e, t) {
  var n = e.type.contextTypes;
  if (!n) return cr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Un(e) {
  return e = e.childContextTypes, e != null;
}
function ci() {
  _t(Bn), _t(jn);
}
function ld(e, t, n) {
  if (jn.current !== cr) throw Error(pe(168));
  Dt(jn, t), Dt(Bn, n);
}
function nf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(pe(108, om(e) || "Unknown", l));
  return Ht({}, n, r);
}
function ui(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || cr, br = jn.current, Dt(jn, e), Dt(Bn, Bn.current), !0;
}
function od(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(pe(169));
  n ? (e = nf(e, t, br), r.__reactInternalMemoizedMergedChildContext = e, _t(Bn), _t(jn), Dt(jn, e)) : _t(Bn), Dt(Bn, n);
}
var Ss = null, Ai = !1, ua = !1;
function sf(e) {
  Ss === null ? Ss = [e] : Ss.push(e);
}
function j0(e) {
  Ai = !0, sf(e);
}
function hr() {
  if (!ua && Ss !== null) {
    ua = !0;
    var e = 0, t = Tt;
    try {
      var n = Ss;
      for (Tt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ss = null, Ai = !1;
    } catch (l) {
      throw Ss !== null && (Ss = Ss.slice(e + 1)), Mh(Oc, hr), l;
    } finally {
      Tt = t, ua = !1;
    }
  }
  return null;
}
var Gr = [], Xr = 0, di = null, hi = 0, Zn = [], qn = 0, Mr = null, Ms = 1, Is = "";
function yr(e, t) {
  Gr[Xr++] = hi, Gr[Xr++] = di, di = e, hi = t;
}
function rf(e, t, n) {
  Zn[qn++] = Ms, Zn[qn++] = Is, Zn[qn++] = Mr, Mr = e;
  var r = Ms;
  e = Is;
  var l = 32 - cs(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - cs(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Ms = 1 << 32 - cs(t) + l | n << l | r, Is = o + e;
  } else Ms = 1 << o | n << l | r, Is = e;
}
function Hc(e) {
  e.return !== null && (yr(e, 1), rf(e, 1, 0));
}
function Vc(e) {
  for (; e === di; ) di = Gr[--Xr], Gr[Xr] = null, hi = Gr[--Xr], Gr[Xr] = null;
  for (; e === Mr; ) Mr = Zn[--qn], Zn[qn] = null, Is = Zn[--qn], Zn[qn] = null, Ms = Zn[--qn], Zn[qn] = null;
}
var Kn = null, Vn = null, Ft = !1, is = null;
function lf(e, t) {
  var n = es(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function id(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Kn = e, Vn = sr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Kn = e, Vn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Mr !== null ? { id: Ms, overflow: Is } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = es(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Kn = e, Vn = null, !0) : !1;
    default:
      return !1;
  }
}
function qa(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ec(e) {
  if (Ft) {
    var t = Vn;
    if (t) {
      var n = t;
      if (!id(e, t)) {
        if (qa(e)) throw Error(pe(418));
        t = sr(n.nextSibling);
        var r = Kn;
        t && id(e, t) ? lf(r, n) : (e.flags = e.flags & -4097 | 2, Ft = !1, Kn = e);
      }
    } else {
      if (qa(e)) throw Error(pe(418));
      e.flags = e.flags & -4097 | 2, Ft = !1, Kn = e;
    }
  }
}
function ad(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Kn = e;
}
function Ao(e) {
  if (e !== Kn) return !1;
  if (!Ft) return ad(e), Ft = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Xa(e.type, e.memoizedProps)), t && (t = Vn)) {
    if (qa(e)) throw of(), Error(pe(418));
    for (; t; ) lf(e, t), t = sr(t.nextSibling);
  }
  if (ad(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(pe(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Vn = sr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Vn = null;
    }
  } else Vn = Kn ? sr(e.stateNode.nextSibling) : null;
  return !0;
}
function of() {
  for (var e = Vn; e; ) e = sr(e.nextSibling);
}
function dl() {
  Vn = Kn = null, Ft = !1;
}
function Kc(e) {
  is === null ? is = [e] : is.push(e);
}
var C0 = Ds.ReactCurrentBatchConfig;
function bl(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(pe(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(pe(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(pe(284));
    if (!n._owner) throw Error(pe(290, e));
  }
  return e;
}
function Ro(e, t) {
  throw e = Object.prototype.toString.call(t), Error(pe(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function cd(e) {
  var t = e._init;
  return t(e._payload);
}
function af(e) {
  function t(y, p) {
    if (e) {
      var h = y.deletions;
      h === null ? (y.deletions = [p], y.flags |= 16) : h.push(p);
    }
  }
  function n(y, p) {
    if (!e) return null;
    for (; p !== null; ) t(y, p), p = p.sibling;
    return null;
  }
  function r(y, p) {
    for (y = /* @__PURE__ */ new Map(); p !== null; ) p.key !== null ? y.set(p.key, p) : y.set(p.index, p), p = p.sibling;
    return y;
  }
  function l(y, p) {
    return y = ir(y, p), y.index = 0, y.sibling = null, y;
  }
  function o(y, p, h) {
    return y.index = h, e ? (h = y.alternate, h !== null ? (h = h.index, h < p ? (y.flags |= 2, p) : h) : (y.flags |= 2, p)) : (y.flags |= 1048576, p);
  }
  function i(y) {
    return e && y.alternate === null && (y.flags |= 2), y;
  }
  function a(y, p, h, M) {
    return p === null || p.tag !== 6 ? (p = xa(h, y.mode, M), p.return = y, p) : (p = l(p, h), p.return = y, p);
  }
  function c(y, p, h, M) {
    var T = h.type;
    return T === Wr ? N(y, p, h.props.children, M, h.key) : p !== null && (p.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Vs && cd(T) === p.type) ? (M = l(p, h.props), M.ref = bl(y, p, h), M.return = y, M) : (M = Qo(h.type, h.key, h.props, null, y.mode, M), M.ref = bl(y, p, h), M.return = y, M);
  }
  function d(y, p, h, M) {
    return p === null || p.tag !== 4 || p.stateNode.containerInfo !== h.containerInfo || p.stateNode.implementation !== h.implementation ? (p = ya(h, y.mode, M), p.return = y, p) : (p = l(p, h.children || []), p.return = y, p);
  }
  function N(y, p, h, M, T) {
    return p === null || p.tag !== 7 ? (p = Sr(h, y.mode, M, T), p.return = y, p) : (p = l(p, h), p.return = y, p);
  }
  function m(y, p, h) {
    if (typeof p == "string" && p !== "" || typeof p == "number") return p = xa("" + p, y.mode, h), p.return = y, p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case ko:
          return h = Qo(p.type, p.key, p.props, null, y.mode, h), h.ref = bl(y, null, p), h.return = y, h;
        case Ur:
          return p = ya(p, y.mode, h), p.return = y, p;
        case Vs:
          var M = p._init;
          return m(y, M(p._payload), h);
      }
      if ($l(p) || wl(p)) return p = Sr(p, y.mode, h, null), p.return = y, p;
      Ro(y, p);
    }
    return null;
  }
  function g(y, p, h, M) {
    var T = p !== null ? p.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number") return T !== null ? null : a(y, p, "" + h, M);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case ko:
          return h.key === T ? c(y, p, h, M) : null;
        case Ur:
          return h.key === T ? d(y, p, h, M) : null;
        case Vs:
          return T = h._init, g(
            y,
            p,
            T(h._payload),
            M
          );
      }
      if ($l(h) || wl(h)) return T !== null ? null : N(y, p, h, M, null);
      Ro(y, h);
    }
    return null;
  }
  function k(y, p, h, M, T) {
    if (typeof M == "string" && M !== "" || typeof M == "number") return y = y.get(h) || null, a(p, y, "" + M, T);
    if (typeof M == "object" && M !== null) {
      switch (M.$$typeof) {
        case ko:
          return y = y.get(M.key === null ? h : M.key) || null, c(p, y, M, T);
        case Ur:
          return y = y.get(M.key === null ? h : M.key) || null, d(p, y, M, T);
        case Vs:
          var j = M._init;
          return k(y, p, h, j(M._payload), T);
      }
      if ($l(M) || wl(M)) return y = y.get(h) || null, N(p, y, M, T, null);
      Ro(p, M);
    }
    return null;
  }
  function S(y, p, h, M) {
    for (var T = null, j = null, v = p, x = p = 0, w = null; v !== null && x < h.length; x++) {
      v.index > x ? (w = v, v = null) : w = v.sibling;
      var I = g(y, v, h[x], M);
      if (I === null) {
        v === null && (v = w);
        break;
      }
      e && v && I.alternate === null && t(y, v), p = o(I, p, x), j === null ? T = I : j.sibling = I, j = I, v = w;
    }
    if (x === h.length) return n(y, v), Ft && yr(y, x), T;
    if (v === null) {
      for (; x < h.length; x++) v = m(y, h[x], M), v !== null && (p = o(v, p, x), j === null ? T = v : j.sibling = v, j = v);
      return Ft && yr(y, x), T;
    }
    for (v = r(y, v); x < h.length; x++) w = k(v, y, x, h[x], M), w !== null && (e && w.alternate !== null && v.delete(w.key === null ? x : w.key), p = o(w, p, x), j === null ? T = w : j.sibling = w, j = w);
    return e && v.forEach(function(O) {
      return t(y, O);
    }), Ft && yr(y, x), T;
  }
  function b(y, p, h, M) {
    var T = wl(h);
    if (typeof T != "function") throw Error(pe(150));
    if (h = T.call(h), h == null) throw Error(pe(151));
    for (var j = T = null, v = p, x = p = 0, w = null, I = h.next(); v !== null && !I.done; x++, I = h.next()) {
      v.index > x ? (w = v, v = null) : w = v.sibling;
      var O = g(y, v, I.value, M);
      if (O === null) {
        v === null && (v = w);
        break;
      }
      e && v && O.alternate === null && t(y, v), p = o(O, p, x), j === null ? T = O : j.sibling = O, j = O, v = w;
    }
    if (I.done) return n(
      y,
      v
    ), Ft && yr(y, x), T;
    if (v === null) {
      for (; !I.done; x++, I = h.next()) I = m(y, I.value, M), I !== null && (p = o(I, p, x), j === null ? T = I : j.sibling = I, j = I);
      return Ft && yr(y, x), T;
    }
    for (v = r(y, v); !I.done; x++, I = h.next()) I = k(v, y, x, I.value, M), I !== null && (e && I.alternate !== null && v.delete(I.key === null ? x : I.key), p = o(I, p, x), j === null ? T = I : j.sibling = I, j = I);
    return e && v.forEach(function(H) {
      return t(y, H);
    }), Ft && yr(y, x), T;
  }
  function L(y, p, h, M) {
    if (typeof h == "object" && h !== null && h.type === Wr && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case ko:
          e: {
            for (var T = h.key, j = p; j !== null; ) {
              if (j.key === T) {
                if (T = h.type, T === Wr) {
                  if (j.tag === 7) {
                    n(y, j.sibling), p = l(j, h.props.children), p.return = y, y = p;
                    break e;
                  }
                } else if (j.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Vs && cd(T) === j.type) {
                  n(y, j.sibling), p = l(j, h.props), p.ref = bl(y, j, h), p.return = y, y = p;
                  break e;
                }
                n(y, j);
                break;
              } else t(y, j);
              j = j.sibling;
            }
            h.type === Wr ? (p = Sr(h.props.children, y.mode, M, h.key), p.return = y, y = p) : (M = Qo(h.type, h.key, h.props, null, y.mode, M), M.ref = bl(y, p, h), M.return = y, y = M);
          }
          return i(y);
        case Ur:
          e: {
            for (j = h.key; p !== null; ) {
              if (p.key === j) if (p.tag === 4 && p.stateNode.containerInfo === h.containerInfo && p.stateNode.implementation === h.implementation) {
                n(y, p.sibling), p = l(p, h.children || []), p.return = y, y = p;
                break e;
              } else {
                n(y, p);
                break;
              }
              else t(y, p);
              p = p.sibling;
            }
            p = ya(h, y.mode, M), p.return = y, y = p;
          }
          return i(y);
        case Vs:
          return j = h._init, L(y, p, j(h._payload), M);
      }
      if ($l(h)) return S(y, p, h, M);
      if (wl(h)) return b(y, p, h, M);
      Ro(y, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, p !== null && p.tag === 6 ? (n(y, p.sibling), p = l(p, h), p.return = y, y = p) : (n(y, p), p = xa(h, y.mode, M), p.return = y, y = p), i(y)) : n(y, p);
  }
  return L;
}
var hl = af(!0), cf = af(!1), fi = dr(null), pi = null, Qr = null, Yc = null;
function Gc() {
  Yc = Qr = pi = null;
}
function Xc(e) {
  var t = fi.current;
  _t(fi), e._currentValue = t;
}
function tc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function rl(e, t) {
  pi = e, Yc = Qr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Fn = !0), e.firstContext = null);
}
function ns(e) {
  var t = e._currentValue;
  if (Yc !== e) if (e = { context: e, memoizedValue: t, next: null }, Qr === null) {
    if (pi === null) throw Error(pe(308));
    Qr = e, pi.dependencies = { lanes: 0, firstContext: e };
  } else Qr = Qr.next = e;
  return t;
}
var wr = null;
function Qc(e) {
  wr === null ? wr = [e] : wr.push(e);
}
function uf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Qc(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ls(e, r);
}
function Ls(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Ks = !1;
function Jc(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function df(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ts(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function rr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, kt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ls(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Qc(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ls(e, n);
}
function Ho(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Dc(e, n);
  }
}
function ud(e, t) {
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
function mi(e, t, n, r) {
  var l = e.updateQueue;
  Ks = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, d = c.next;
    c.next = null, i === null ? o = d : i.next = d, i = c;
    var N = e.alternate;
    N !== null && (N = N.updateQueue, a = N.lastBaseUpdate, a !== i && (a === null ? N.firstBaseUpdate = d : a.next = d, N.lastBaseUpdate = c));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, N = d = c = null, a = o;
    do {
      var g = a.lane, k = a.eventTime;
      if ((r & g) === g) {
        N !== null && (N = N.next = {
          eventTime: k,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var S = e, b = a;
          switch (g = t, k = n, b.tag) {
            case 1:
              if (S = b.payload, typeof S == "function") {
                m = S.call(k, m, g);
                break e;
              }
              m = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = b.payload, g = typeof S == "function" ? S.call(k, m, g) : S, g == null) break e;
              m = Ht({}, m, g);
              break e;
            case 2:
              Ks = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [a] : g.push(a));
      } else k = { eventTime: k, lane: g, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, N === null ? (d = N = k, c = m) : N = N.next = k, i |= g;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        g = a, a = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
      }
    } while (!0);
    if (N === null && (c = m), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = N, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Tr |= i, e.lanes = i, e.memoizedState = m;
  }
}
function dd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(pe(191, l));
      l.call(r);
    }
  }
}
var go = {}, Ns = dr(go), so = dr(go), ro = dr(go);
function jr(e) {
  if (e === go) throw Error(pe(174));
  return e;
}
function Zc(e, t) {
  switch (Dt(ro, t), Dt(so, e), Dt(Ns, go), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Oa(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Oa(t, e);
  }
  _t(Ns), Dt(Ns, t);
}
function fl() {
  _t(Ns), _t(so), _t(ro);
}
function hf(e) {
  jr(ro.current);
  var t = jr(Ns.current), n = Oa(t, e.type);
  t !== n && (Dt(so, e), Dt(Ns, n));
}
function qc(e) {
  so.current === e && (_t(Ns), _t(so));
}
var Wt = dr(0);
function gi(e) {
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
var da = [];
function eu() {
  for (var e = 0; e < da.length; e++) da[e]._workInProgressVersionPrimary = null;
  da.length = 0;
}
var Vo = Ds.ReactCurrentDispatcher, ha = Ds.ReactCurrentBatchConfig, Ir = 0, zt = null, an = null, dn = null, xi = !1, Wl = !1, lo = 0, E0 = 0;
function Nn() {
  throw Error(pe(321));
}
function tu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!ds(e[n], t[n])) return !1;
  return !0;
}
function nu(e, t, n, r, l, o) {
  if (Ir = o, zt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Vo.current = e === null || e.memoizedState === null ? I0 : T0, e = n(r, l), Wl) {
    o = 0;
    do {
      if (Wl = !1, lo = 0, 25 <= o) throw Error(pe(301));
      o += 1, dn = an = null, t.updateQueue = null, Vo.current = A0, e = n(r, l);
    } while (Wl);
  }
  if (Vo.current = yi, t = an !== null && an.next !== null, Ir = 0, dn = an = zt = null, xi = !1, t) throw Error(pe(300));
  return e;
}
function su() {
  var e = lo !== 0;
  return lo = 0, e;
}
function gs() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return dn === null ? zt.memoizedState = dn = e : dn = dn.next = e, dn;
}
function ss() {
  if (an === null) {
    var e = zt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = an.next;
  var t = dn === null ? zt.memoizedState : dn.next;
  if (t !== null) dn = t, an = e;
  else {
    if (e === null) throw Error(pe(310));
    an = e, e = { memoizedState: an.memoizedState, baseState: an.baseState, baseQueue: an.baseQueue, queue: an.queue, next: null }, dn === null ? zt.memoizedState = dn = e : dn = dn.next = e;
  }
  return dn;
}
function oo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function fa(e) {
  var t = ss(), n = t.queue;
  if (n === null) throw Error(pe(311));
  n.lastRenderedReducer = e;
  var r = an, l = r.baseQueue, o = n.pending;
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
      var N = d.lane;
      if ((Ir & N) === N) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var m = {
          lane: N,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (a = c = m, i = r) : c = c.next = m, zt.lanes |= N, Tr |= N;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? i = r : c.next = a, ds(r, t.memoizedState) || (Fn = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, zt.lanes |= o, Tr |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function pa(e) {
  var t = ss(), n = t.queue;
  if (n === null) throw Error(pe(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    ds(o, t.memoizedState) || (Fn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function ff() {
}
function pf(e, t) {
  var n = zt, r = ss(), l = t(), o = !ds(r.memoizedState, l);
  if (o && (r.memoizedState = l, Fn = !0), r = r.queue, ru(xf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || dn !== null && dn.memoizedState.tag & 1) {
    if (n.flags |= 2048, io(9, gf.bind(null, n, r, l, t), void 0, null), hn === null) throw Error(pe(349));
    Ir & 30 || mf(n, t, l);
  }
  return l;
}
function mf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = zt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, zt.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function gf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, yf(t) && vf(e);
}
function xf(e, t, n) {
  return n(function() {
    yf(t) && vf(e);
  });
}
function yf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ds(e, n);
  } catch {
    return !0;
  }
}
function vf(e) {
  var t = Ls(e, 1);
  t !== null && us(t, e, 1, -1);
}
function hd(e) {
  var t = gs();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: oo, lastRenderedState: e }, t.queue = e, e = e.dispatch = M0.bind(null, zt, e), [t.memoizedState, e];
}
function io(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = zt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, zt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Nf() {
  return ss().memoizedState;
}
function Ko(e, t, n, r) {
  var l = gs();
  zt.flags |= e, l.memoizedState = io(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ri(e, t, n, r) {
  var l = ss();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (an !== null) {
    var i = an.memoizedState;
    if (o = i.destroy, r !== null && tu(r, i.deps)) {
      l.memoizedState = io(t, n, o, r);
      return;
    }
  }
  zt.flags |= e, l.memoizedState = io(1 | t, n, o, r);
}
function fd(e, t) {
  return Ko(8390656, 8, e, t);
}
function ru(e, t) {
  return Ri(2048, 8, e, t);
}
function kf(e, t) {
  return Ri(4, 2, e, t);
}
function wf(e, t) {
  return Ri(4, 4, e, t);
}
function jf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Cf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ri(4, 4, jf.bind(null, t, e), n);
}
function lu() {
}
function Ef(e, t) {
  var n = ss();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && tu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Sf(e, t) {
  var n = ss();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && tu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function bf(e, t, n) {
  return Ir & 21 ? (ds(n, t) || (n = Ah(), zt.lanes |= n, Tr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Fn = !0), e.memoizedState = n);
}
function S0(e, t) {
  var n = Tt;
  Tt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ha.transition;
  ha.transition = {};
  try {
    e(!1), t();
  } finally {
    Tt = n, ha.transition = r;
  }
}
function Mf() {
  return ss().memoizedState;
}
function b0(e, t, n) {
  var r = or(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, If(e)) Tf(t, n);
  else if (n = uf(e, t, n, r), n !== null) {
    var l = An();
    us(n, e, r, l), Af(n, t, r);
  }
}
function M0(e, t, n) {
  var r = or(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (If(e)) Tf(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, ds(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, Qc(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = uf(e, t, l, r), n !== null && (l = An(), us(n, e, r, l), Af(n, t, r));
  }
}
function If(e) {
  var t = e.alternate;
  return e === zt || t !== null && t === zt;
}
function Tf(e, t) {
  Wl = xi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Af(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Dc(e, n);
  }
}
var yi = { readContext: ns, useCallback: Nn, useContext: Nn, useEffect: Nn, useImperativeHandle: Nn, useInsertionEffect: Nn, useLayoutEffect: Nn, useMemo: Nn, useReducer: Nn, useRef: Nn, useState: Nn, useDebugValue: Nn, useDeferredValue: Nn, useTransition: Nn, useMutableSource: Nn, useSyncExternalStore: Nn, useId: Nn, unstable_isNewReconciler: !1 }, I0 = { readContext: ns, useCallback: function(e, t) {
  return gs().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ns, useEffect: fd, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ko(
    4194308,
    4,
    jf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ko(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ko(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = gs();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = gs();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = b0.bind(null, zt, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = gs();
  return e = { current: e }, t.memoizedState = e;
}, useState: hd, useDebugValue: lu, useDeferredValue: function(e) {
  return gs().memoizedState = e;
}, useTransition: function() {
  var e = hd(!1), t = e[0];
  return e = S0.bind(null, e[1]), gs().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = zt, l = gs();
  if (Ft) {
    if (n === void 0) throw Error(pe(407));
    n = n();
  } else {
    if (n = t(), hn === null) throw Error(pe(349));
    Ir & 30 || mf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, fd(xf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, io(9, gf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = gs(), t = hn.identifierPrefix;
  if (Ft) {
    var n = Is, r = Ms;
    n = (r & ~(1 << 32 - cs(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = lo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = E0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, T0 = {
  readContext: ns,
  useCallback: Ef,
  useContext: ns,
  useEffect: ru,
  useImperativeHandle: Cf,
  useInsertionEffect: kf,
  useLayoutEffect: wf,
  useMemo: Sf,
  useReducer: fa,
  useRef: Nf,
  useState: function() {
    return fa(oo);
  },
  useDebugValue: lu,
  useDeferredValue: function(e) {
    var t = ss();
    return bf(t, an.memoizedState, e);
  },
  useTransition: function() {
    var e = fa(oo)[0], t = ss().memoizedState;
    return [e, t];
  },
  useMutableSource: ff,
  useSyncExternalStore: pf,
  useId: Mf,
  unstable_isNewReconciler: !1
}, A0 = { readContext: ns, useCallback: Ef, useContext: ns, useEffect: ru, useImperativeHandle: Cf, useInsertionEffect: kf, useLayoutEffect: wf, useMemo: Sf, useReducer: pa, useRef: Nf, useState: function() {
  return pa(oo);
}, useDebugValue: lu, useDeferredValue: function(e) {
  var t = ss();
  return an === null ? t.memoizedState = e : bf(t, an.memoizedState, e);
}, useTransition: function() {
  var e = pa(oo)[0], t = ss().memoizedState;
  return [e, t];
}, useMutableSource: ff, useSyncExternalStore: pf, useId: Mf, unstable_isNewReconciler: !1 };
function ls(e, t) {
  if (e && e.defaultProps) {
    t = Ht({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function nc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Ht({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $i = { isMounted: function(e) {
  return (e = e._reactInternals) ? $r(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = An(), l = or(e), o = Ts(r, l);
  o.payload = t, n != null && (o.callback = n), t = rr(e, o, l), t !== null && (us(t, e, l, r), Ho(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = An(), l = or(e), o = Ts(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = rr(e, o, l), t !== null && (us(t, e, l, r), Ho(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = An(), r = or(e), l = Ts(n, r);
  l.tag = 2, t != null && (l.callback = t), t = rr(e, l, r), t !== null && (us(t, e, r, n), Ho(t, e, r));
} };
function pd(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !ql(n, r) || !ql(l, o) : !0;
}
function Rf(e, t, n) {
  var r = !1, l = cr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ns(o) : (l = Un(t) ? br : jn.current, r = t.contextTypes, o = (r = r != null) ? ul(e, l) : cr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = $i, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function md(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && $i.enqueueReplaceState(t, t.state, null);
}
function sc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Jc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ns(o) : (o = Un(t) ? br : jn.current, l.context = ul(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (nc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && $i.enqueueReplaceState(l, l.state, null), mi(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function pl(e, t) {
  try {
    var n = "", r = t;
    do
      n += lm(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ma(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function rc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var R0 = typeof WeakMap == "function" ? WeakMap : Map;
function $f(e, t, n) {
  n = Ts(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Ni || (Ni = !0, pc = r), rc(e, t);
  }, n;
}
function Lf(e, t, n) {
  n = Ts(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      rc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    rc(e, t), typeof r != "function" && (lr === null ? lr = /* @__PURE__ */ new Set([this]) : lr.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function gd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new R0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = K0.bind(null, e, t, n), t.then(e, e));
}
function xd(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function yd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ts(-1, 1), t.tag = 2, rr(n, t, 1))), n.lanes |= 1), e);
}
var $0 = Ds.ReactCurrentOwner, Fn = !1;
function Tn(e, t, n, r) {
  t.child = e === null ? cf(t, null, n, r) : hl(t, e.child, n, r);
}
function vd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return rl(t, l), r = nu(e, t, n, r, o, l), n = su(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Os(e, t, l)) : (Ft && n && Hc(t), t.flags |= 1, Tn(e, t, r, l), t.child);
}
function Nd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !fu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Of(e, t, o, r, l)) : (e = Qo(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : ql, n(i, r) && e.ref === t.ref) return Os(e, t, l);
  }
  return t.flags |= 1, e = ir(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Of(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (ql(o, r) && e.ref === t.ref) if (Fn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Fn = !0);
    else return t.lanes = e.lanes, Os(e, t, l);
  }
  return lc(e, t, n, r, l);
}
function Df(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Dt(Zr, Hn), Hn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Dt(Zr, Hn), Hn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Dt(Zr, Hn), Hn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Dt(Zr, Hn), Hn |= r;
  return Tn(e, t, l, n), t.child;
}
function Pf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function lc(e, t, n, r, l) {
  var o = Un(n) ? br : jn.current;
  return o = ul(t, o), rl(t, l), n = nu(e, t, n, r, o, l), r = su(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Os(e, t, l)) : (Ft && r && Hc(t), t.flags |= 1, Tn(e, t, n, l), t.child);
}
function kd(e, t, n, r, l) {
  if (Un(n)) {
    var o = !0;
    ui(t);
  } else o = !1;
  if (rl(t, l), t.stateNode === null) Yo(e, t), Rf(t, n, r), sc(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = ns(d) : (d = Un(n) ? br : jn.current, d = ul(t, d));
    var N = n.getDerivedStateFromProps, m = typeof N == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== d) && md(t, i, r, d), Ks = !1;
    var g = t.memoizedState;
    i.state = g, mi(t, r, i, l), c = t.memoizedState, a !== r || g !== c || Bn.current || Ks ? (typeof N == "function" && (nc(t, n, N, r), c = t.memoizedState), (a = Ks || pd(t, n, a, r, g, c, d)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = d, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, df(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : ls(t.type, a), i.props = d, m = t.pendingProps, g = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = ns(c) : (c = Un(n) ? br : jn.current, c = ul(t, c));
    var k = n.getDerivedStateFromProps;
    (N = typeof k == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== m || g !== c) && md(t, i, r, c), Ks = !1, g = t.memoizedState, i.state = g, mi(t, r, i, l);
    var S = t.memoizedState;
    a !== m || g !== S || Bn.current || Ks ? (typeof k == "function" && (nc(t, n, k, r), S = t.memoizedState), (d = Ks || pd(t, n, d, r, g, S, c) || !1) ? (N || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, S, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, S, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), i.props = r, i.state = S, i.context = c, r = d) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return oc(e, t, n, r, o, l);
}
function oc(e, t, n, r, l, o) {
  Pf(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && od(t, n, !1), Os(e, t, o);
  r = t.stateNode, $0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = hl(t, e.child, null, o), t.child = hl(t, null, a, o)) : Tn(e, t, a, o), t.memoizedState = r.state, l && od(t, n, !0), t.child;
}
function _f(e) {
  var t = e.stateNode;
  t.pendingContext ? ld(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ld(e, t.context, !1), Zc(e, t.containerInfo);
}
function wd(e, t, n, r, l) {
  return dl(), Kc(l), t.flags |= 256, Tn(e, t, n, r), t.child;
}
var ic = { dehydrated: null, treeContext: null, retryLane: 0 };
function ac(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ff(e, t, n) {
  var r = t.pendingProps, l = Wt.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Dt(Wt, l & 1), e === null)
    return ec(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Di(i, r, 0, null), e = Sr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = ac(n), t.memoizedState = ic, e) : ou(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return L0(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = ir(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = ir(a, o) : (o = Sr(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? ac(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = ic, r;
  }
  return o = e.child, e = o.sibling, r = ir(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function ou(e, t) {
  return t = Di({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function $o(e, t, n, r) {
  return r !== null && Kc(r), hl(t, e.child, null, n), e = ou(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function L0(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ma(Error(pe(422))), $o(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Di({ mode: "visible", children: r.children }, l, 0, null), o = Sr(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && hl(t, e.child, null, i), t.child.memoizedState = ac(i), t.memoizedState = ic, o);
  if (!(t.mode & 1)) return $o(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(pe(419)), r = ma(o, r, void 0), $o(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, Fn || a) {
    if (r = hn, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ls(e, l), us(r, e, l, -1));
    }
    return hu(), r = ma(Error(pe(421))), $o(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Y0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Vn = sr(l.nextSibling), Kn = t, Ft = !0, is = null, e !== null && (Zn[qn++] = Ms, Zn[qn++] = Is, Zn[qn++] = Mr, Ms = e.id, Is = e.overflow, Mr = t), t = ou(t, r.children), t.flags |= 4096, t);
}
function jd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), tc(e.return, t, n);
}
function ga(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Bf(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Tn(e, t, r.children, n), r = Wt.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && jd(e, n, t);
      else if (e.tag === 19) jd(e, n, t);
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
  if (Dt(Wt, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && gi(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ga(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && gi(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ga(t, !0, n, null, o);
      break;
    case "together":
      ga(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Yo(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Os(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Tr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(pe(153));
  if (t.child !== null) {
    for (e = t.child, n = ir(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ir(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function O0(e, t, n) {
  switch (t.tag) {
    case 3:
      _f(t), dl();
      break;
    case 5:
      hf(t);
      break;
    case 1:
      Un(t.type) && ui(t);
      break;
    case 4:
      Zc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Dt(fi, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Dt(Wt, Wt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ff(e, t, n) : (Dt(Wt, Wt.current & 1), e = Os(e, t, n), e !== null ? e.sibling : null);
      Dt(Wt, Wt.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Bf(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Dt(Wt, Wt.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Df(e, t, n);
  }
  return Os(e, t, n);
}
var Uf, cc, Wf, zf;
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
cc = function() {
};
Wf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, jr(Ns.current);
    var o = null;
    switch (n) {
      case "input":
        l = Aa(e, l), r = Aa(e, r), o = [];
        break;
      case "select":
        l = Ht({}, l, { value: void 0 }), r = Ht({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = La(e, l), r = La(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ai);
    }
    Da(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var a = l[d];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Kl.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (a = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== a && (c != null || a != null)) if (d === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Kl.hasOwnProperty(d) ? (c != null && d === "onScroll" && Pt("scroll", e), o || a === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
zf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ml(e, t) {
  if (!Ft) switch (e.tailMode) {
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
function D0(e, t, n) {
  var r = t.pendingProps;
  switch (Vc(t), t.tag) {
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
      return Un(t.type) && ci(), kn(t), null;
    case 3:
      return r = t.stateNode, fl(), _t(Bn), _t(jn), eu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ao(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, is !== null && (xc(is), is = null))), cc(e, t), kn(t), null;
    case 5:
      qc(t);
      var l = jr(ro.current);
      if (n = t.type, e !== null && t.stateNode != null) Wf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(pe(166));
          return kn(t), null;
        }
        if (e = jr(Ns.current), Ao(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[xs] = t, r[no] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Pt("cancel", r), Pt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Pt("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ol.length; l++) Pt(Ol[l], r);
              break;
            case "source":
              Pt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Pt(
                "error",
                r
              ), Pt("load", r);
              break;
            case "details":
              Pt("toggle", r);
              break;
            case "input":
              Ru(r, o), Pt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Pt("invalid", r);
              break;
            case "textarea":
              Lu(r, o), Pt("invalid", r);
          }
          Da(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && To(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && To(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Kl.hasOwnProperty(i) && a != null && i === "onScroll" && Pt("scroll", r);
          }
          switch (n) {
            case "input":
              wo(r), $u(r, o, !0);
              break;
            case "textarea":
              wo(r), Ou(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ai);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = gh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[xs] = t, e[no] = r, Uf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Pa(n, r), n) {
              case "dialog":
                Pt("cancel", e), Pt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Pt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ol.length; l++) Pt(Ol[l], e);
                l = r;
                break;
              case "source":
                Pt("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Pt(
                  "error",
                  e
                ), Pt("load", e), l = r;
                break;
              case "details":
                Pt("toggle", e), l = r;
                break;
              case "input":
                Ru(e, r), l = Aa(e, r), Pt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Ht({}, r, { value: void 0 }), Pt("invalid", e);
                break;
              case "textarea":
                Lu(e, r), l = La(e, r), Pt("invalid", e);
                break;
              default:
                l = r;
            }
            Da(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var c = a[o];
              o === "style" ? vh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && xh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Yl(e, c) : typeof c == "number" && Yl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Kl.hasOwnProperty(o) ? c != null && o === "onScroll" && Pt("scroll", e) : c != null && Tc(e, o, c, i));
            }
            switch (n) {
              case "input":
                wo(e), $u(e, r, !1);
                break;
              case "textarea":
                wo(e), Ou(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ar(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? el(e, !!r.multiple, o, !1) : r.defaultValue != null && el(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ai);
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
      if (e && t.stateNode != null) zf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(pe(166));
        if (n = jr(ro.current), jr(Ns.current), Ao(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[xs] = t, (o = r.nodeValue !== n) && (e = Kn, e !== null)) switch (e.tag) {
            case 3:
              To(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && To(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[xs] = t, t.stateNode = r;
      }
      return kn(t), null;
    case 13:
      if (_t(Wt), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Ft && Vn !== null && t.mode & 1 && !(t.flags & 128)) of(), dl(), t.flags |= 98560, o = !1;
        else if (o = Ao(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(pe(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(pe(317));
            o[xs] = t;
          } else dl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          kn(t), o = !1;
        } else is !== null && (xc(is), is = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Wt.current & 1 ? cn === 0 && (cn = 3) : hu())), t.updateQueue !== null && (t.flags |= 4), kn(t), null);
    case 4:
      return fl(), cc(e, t), e === null && eo(t.stateNode.containerInfo), kn(t), null;
    case 10:
      return Xc(t.type._context), kn(t), null;
    case 17:
      return Un(t.type) && ci(), kn(t), null;
    case 19:
      if (_t(Wt), o = t.memoizedState, o === null) return kn(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Ml(o, !1);
      else {
        if (cn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = gi(e), i !== null) {
            for (t.flags |= 128, Ml(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Dt(Wt, Wt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && qt() > ml && (t.flags |= 128, r = !0, Ml(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = gi(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Ml(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Ft) return kn(t), null;
        } else 2 * qt() - o.renderingStartTime > ml && n !== 1073741824 && (t.flags |= 128, r = !0, Ml(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = qt(), t.sibling = null, n = Wt.current, Dt(Wt, r ? n & 1 | 2 : n & 1), t) : (kn(t), null);
    case 22:
    case 23:
      return du(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Hn & 1073741824 && (kn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : kn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(pe(156, t.tag));
}
function P0(e, t) {
  switch (Vc(t), t.tag) {
    case 1:
      return Un(t.type) && ci(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return fl(), _t(Bn), _t(jn), eu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return qc(t), null;
    case 13:
      if (_t(Wt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(pe(340));
        dl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return _t(Wt), null;
    case 4:
      return fl(), null;
    case 10:
      return Xc(t.type._context), null;
    case 22:
    case 23:
      return du(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Lo = !1, wn = !1, _0 = typeof WeakSet == "function" ? WeakSet : Set, De = null;
function Jr(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Gt(e, t, r);
  }
  else n.current = null;
}
function uc(e, t, n) {
  try {
    n();
  } catch (r) {
    Gt(e, t, r);
  }
}
var Cd = !1;
function F0(e, t) {
  if (Ya = li, e = Yh(), zc(e)) {
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
        var i = 0, a = -1, c = -1, d = 0, N = 0, m = e, g = null;
        t: for (; ; ) {
          for (var k; m !== n || l !== 0 && m.nodeType !== 3 || (a = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (c = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (k = m.firstChild) !== null; )
            g = m, m = k;
          for (; ; ) {
            if (m === e) break t;
            if (g === n && ++d === l && (a = i), g === o && ++N === r && (c = i), (k = m.nextSibling) !== null) break;
            m = g, g = m.parentNode;
          }
          m = k;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ga = { focusedElem: e, selectionRange: n }, li = !1, De = t; De !== null; ) if (t = De, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, De = e;
  else for (; De !== null; ) {
    t = De;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var b = S.memoizedProps, L = S.memoizedState, y = t.stateNode, p = y.getSnapshotBeforeUpdate(t.elementType === t.type ? b : ls(t.type, b), L);
            y.__reactInternalSnapshotBeforeUpdate = p;
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
          throw Error(pe(163));
      }
    } catch (M) {
      Gt(t, t.return, M);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, De = e;
      break;
    }
    De = t.return;
  }
  return S = Cd, Cd = !1, S;
}
function zl(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && uc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Li(e, t) {
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
function dc(e) {
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
function Hf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Hf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[xs], delete t[no], delete t[Ja], delete t[k0], delete t[w0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Vf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ed(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Vf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function hc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ai));
  else if (r !== 4 && (e = e.child, e !== null)) for (hc(e, t, n), e = e.sibling; e !== null; ) hc(e, t, n), e = e.sibling;
}
function fc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (fc(e, t, n), e = e.sibling; e !== null; ) fc(e, t, n), e = e.sibling;
}
var mn = null, os = !1;
function zs(e, t, n) {
  for (n = n.child; n !== null; ) Kf(e, t, n), n = n.sibling;
}
function Kf(e, t, n) {
  if (vs && typeof vs.onCommitFiberUnmount == "function") try {
    vs.onCommitFiberUnmount(Si, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      wn || Jr(n, t);
    case 6:
      var r = mn, l = os;
      mn = null, zs(e, t, n), mn = r, os = l, mn !== null && (os ? (e = mn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : mn.removeChild(n.stateNode));
      break;
    case 18:
      mn !== null && (os ? (e = mn, n = n.stateNode, e.nodeType === 8 ? ca(e.parentNode, n) : e.nodeType === 1 && ca(e, n), Jl(e)) : ca(mn, n.stateNode));
      break;
    case 4:
      r = mn, l = os, mn = n.stateNode.containerInfo, os = !0, zs(e, t, n), mn = r, os = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!wn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && uc(n, t, i), l = l.next;
        } while (l !== r);
      }
      zs(e, t, n);
      break;
    case 1:
      if (!wn && (Jr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Gt(n, t, a);
      }
      zs(e, t, n);
      break;
    case 21:
      zs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (wn = (r = wn) || n.memoizedState !== null, zs(e, t, n), wn = r) : zs(e, t, n);
      break;
    default:
      zs(e, t, n);
  }
}
function Sd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new _0()), t.forEach(function(r) {
      var l = G0.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function rs(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            mn = a.stateNode, os = !1;
            break e;
          case 3:
            mn = a.stateNode.containerInfo, os = !0;
            break e;
          case 4:
            mn = a.stateNode.containerInfo, os = !0;
            break e;
        }
        a = a.return;
      }
      if (mn === null) throw Error(pe(160));
      Kf(o, i, l), mn = null, os = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      Gt(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Yf(t, e), t = t.sibling;
}
function Yf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (rs(t, e), ps(e), r & 4) {
        try {
          zl(3, e, e.return), Li(3, e);
        } catch (b) {
          Gt(e, e.return, b);
        }
        try {
          zl(5, e, e.return);
        } catch (b) {
          Gt(e, e.return, b);
        }
      }
      break;
    case 1:
      rs(t, e), ps(e), r & 512 && n !== null && Jr(n, n.return);
      break;
    case 5:
      if (rs(t, e), ps(e), r & 512 && n !== null && Jr(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Yl(l, "");
        } catch (b) {
          Gt(e, e.return, b);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && o.type === "radio" && o.name != null && ph(l, o), Pa(a, i);
          var d = Pa(a, o);
          for (i = 0; i < c.length; i += 2) {
            var N = c[i], m = c[i + 1];
            N === "style" ? vh(l, m) : N === "dangerouslySetInnerHTML" ? xh(l, m) : N === "children" ? Yl(l, m) : Tc(l, N, m, d);
          }
          switch (a) {
            case "input":
              Ra(l, o);
              break;
            case "textarea":
              mh(l, o);
              break;
            case "select":
              var g = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var k = o.value;
              k != null ? el(l, !!o.multiple, k, !1) : g !== !!o.multiple && (o.defaultValue != null ? el(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : el(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[no] = o;
        } catch (b) {
          Gt(e, e.return, b);
        }
      }
      break;
    case 6:
      if (rs(t, e), ps(e), r & 4) {
        if (e.stateNode === null) throw Error(pe(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (b) {
          Gt(e, e.return, b);
        }
      }
      break;
    case 3:
      if (rs(t, e), ps(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Jl(t.containerInfo);
      } catch (b) {
        Gt(e, e.return, b);
      }
      break;
    case 4:
      rs(t, e), ps(e);
      break;
    case 13:
      rs(t, e), ps(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (cu = qt())), r & 4 && Sd(e);
      break;
    case 22:
      if (N = n !== null && n.memoizedState !== null, e.mode & 1 ? (wn = (d = wn) || N, rs(t, e), wn = d) : rs(t, e), ps(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !N && e.mode & 1) for (De = e, N = e.child; N !== null; ) {
          for (m = De = N; De !== null; ) {
            switch (g = De, k = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                zl(4, g, g.return);
                break;
              case 1:
                Jr(g, g.return);
                var S = g.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (b) {
                    Gt(r, n, b);
                  }
                }
                break;
              case 5:
                Jr(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  Md(m);
                  continue;
                }
            }
            k !== null ? (k.return = g, De = k) : Md(m);
          }
          N = N.sibling;
        }
        e: for (N = null, m = e; ; ) {
          if (m.tag === 5) {
            if (N === null) {
              N = m;
              try {
                l = m.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = m.stateNode, c = m.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = yh("display", i));
              } catch (b) {
                Gt(e, e.return, b);
              }
            }
          } else if (m.tag === 6) {
            if (N === null) try {
              m.stateNode.nodeValue = d ? "" : m.memoizedProps;
            } catch (b) {
              Gt(e, e.return, b);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            N === m && (N = null), m = m.return;
          }
          N === m && (N = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      rs(t, e), ps(e), r & 4 && Sd(e);
      break;
    case 21:
      break;
    default:
      rs(
        t,
        e
      ), ps(e);
  }
}
function ps(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Vf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(pe(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Yl(l, ""), r.flags &= -33);
          var o = Ed(e);
          fc(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = Ed(e);
          hc(e, a, i);
          break;
        default:
          throw Error(pe(161));
      }
    } catch (c) {
      Gt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function B0(e, t, n) {
  De = e, Gf(e);
}
function Gf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; De !== null; ) {
    var l = De, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Lo;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || wn;
        a = Lo;
        var d = wn;
        if (Lo = i, (wn = c) && !d) for (De = l; De !== null; ) i = De, c = i.child, i.tag === 22 && i.memoizedState !== null ? Id(l) : c !== null ? (c.return = i, De = c) : Id(l);
        for (; o !== null; ) De = o, Gf(o), o = o.sibling;
        De = l, Lo = a, wn = d;
      }
      bd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, De = o) : bd(e);
  }
}
function bd(e) {
  for (; De !== null; ) {
    var t = De;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            wn || Li(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !wn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : ls(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && dd(t, o, r);
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
              dd(t, i, n);
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
                var N = d.memoizedState;
                if (N !== null) {
                  var m = N.dehydrated;
                  m !== null && Jl(m);
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
            throw Error(pe(163));
        }
        wn || t.flags & 512 && dc(t);
      } catch (g) {
        Gt(t, t.return, g);
      }
    }
    if (t === e) {
      De = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, De = n;
      break;
    }
    De = t.return;
  }
}
function Md(e) {
  for (; De !== null; ) {
    var t = De;
    if (t === e) {
      De = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, De = n;
      break;
    }
    De = t.return;
  }
}
function Id(e) {
  for (; De !== null; ) {
    var t = De;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Li(4, t);
          } catch (c) {
            Gt(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              Gt(t, l, c);
            }
          }
          var o = t.return;
          try {
            dc(t);
          } catch (c) {
            Gt(t, o, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            dc(t);
          } catch (c) {
            Gt(t, i, c);
          }
      }
    } catch (c) {
      Gt(t, t.return, c);
    }
    if (t === e) {
      De = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, De = a;
      break;
    }
    De = t.return;
  }
}
var U0 = Math.ceil, vi = Ds.ReactCurrentDispatcher, iu = Ds.ReactCurrentOwner, ts = Ds.ReactCurrentBatchConfig, kt = 0, hn = null, rn = null, gn = 0, Hn = 0, Zr = dr(0), cn = 0, ao = null, Tr = 0, Oi = 0, au = 0, Hl = null, _n = null, cu = 0, ml = 1 / 0, Es = null, Ni = !1, pc = null, lr = null, Oo = !1, qs = null, ki = 0, Vl = 0, mc = null, Go = -1, Xo = 0;
function An() {
  return kt & 6 ? qt() : Go !== -1 ? Go : Go = qt();
}
function or(e) {
  return e.mode & 1 ? kt & 2 && gn !== 0 ? gn & -gn : C0.transition !== null ? (Xo === 0 && (Xo = Ah()), Xo) : (e = Tt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : _h(e.type)), e) : 1;
}
function us(e, t, n, r) {
  if (50 < Vl) throw Vl = 0, mc = null, Error(pe(185));
  fo(e, n, r), (!(kt & 2) || e !== hn) && (e === hn && (!(kt & 2) && (Oi |= n), cn === 4 && Qs(e, gn)), Wn(e, r), n === 1 && kt === 0 && !(t.mode & 1) && (ml = qt() + 500, Ai && hr()));
}
function Wn(e, t) {
  var n = e.callbackNode;
  Cm(e, t);
  var r = ri(e, e === hn ? gn : 0);
  if (r === 0) n !== null && _u(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && _u(n), t === 1) e.tag === 0 ? j0(Td.bind(null, e)) : sf(Td.bind(null, e)), v0(function() {
      !(kt & 6) && hr();
    }), n = null;
    else {
      switch (Rh(r)) {
        case 1:
          n = Oc;
          break;
        case 4:
          n = Ih;
          break;
        case 16:
          n = si;
          break;
        case 536870912:
          n = Th;
          break;
        default:
          n = si;
      }
      n = np(n, Xf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Xf(e, t) {
  if (Go = -1, Xo = 0, kt & 6) throw Error(pe(327));
  var n = e.callbackNode;
  if (ll() && e.callbackNode !== n) return null;
  var r = ri(e, e === hn ? gn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = wi(e, r);
  else {
    t = r;
    var l = kt;
    kt |= 2;
    var o = Jf();
    (hn !== e || gn !== t) && (Es = null, ml = qt() + 500, Er(e, t));
    do
      try {
        H0();
        break;
      } catch (a) {
        Qf(e, a);
      }
    while (!0);
    Gc(), vi.current = o, kt = l, rn !== null ? t = 0 : (hn = null, gn = 0, t = cn);
  }
  if (t !== 0) {
    if (t === 2 && (l = Wa(e), l !== 0 && (r = l, t = gc(e, l))), t === 1) throw n = ao, Er(e, 0), Qs(e, r), Wn(e, qt()), n;
    if (t === 6) Qs(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !W0(l) && (t = wi(e, r), t === 2 && (o = Wa(e), o !== 0 && (r = o, t = gc(e, o))), t === 1)) throw n = ao, Er(e, 0), Qs(e, r), Wn(e, qt()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(pe(345));
        case 2:
          vr(e, _n, Es);
          break;
        case 3:
          if (Qs(e, r), (r & 130023424) === r && (t = cu + 500 - qt(), 10 < t)) {
            if (ri(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              An(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Qa(vr.bind(null, e, _n, Es), t);
            break;
          }
          vr(e, _n, Es);
          break;
        case 4:
          if (Qs(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - cs(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = qt() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * U0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Qa(vr.bind(null, e, _n, Es), r);
            break;
          }
          vr(e, _n, Es);
          break;
        case 5:
          vr(e, _n, Es);
          break;
        default:
          throw Error(pe(329));
      }
    }
  }
  return Wn(e, qt()), e.callbackNode === n ? Xf.bind(null, e) : null;
}
function gc(e, t) {
  var n = Hl;
  return e.current.memoizedState.isDehydrated && (Er(e, t).flags |= 256), e = wi(e, t), e !== 2 && (t = _n, _n = n, t !== null && xc(t)), e;
}
function xc(e) {
  _n === null ? _n = e : _n.push.apply(_n, e);
}
function W0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!ds(o(), l)) return !1;
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
function Qs(e, t) {
  for (t &= ~au, t &= ~Oi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - cs(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Td(e) {
  if (kt & 6) throw Error(pe(327));
  ll();
  var t = ri(e, 0);
  if (!(t & 1)) return Wn(e, qt()), null;
  var n = wi(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Wa(e);
    r !== 0 && (t = r, n = gc(e, r));
  }
  if (n === 1) throw n = ao, Er(e, 0), Qs(e, t), Wn(e, qt()), n;
  if (n === 6) throw Error(pe(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, vr(e, _n, Es), Wn(e, qt()), null;
}
function uu(e, t) {
  var n = kt;
  kt |= 1;
  try {
    return e(t);
  } finally {
    kt = n, kt === 0 && (ml = qt() + 500, Ai && hr());
  }
}
function Ar(e) {
  qs !== null && qs.tag === 0 && !(kt & 6) && ll();
  var t = kt;
  kt |= 1;
  var n = ts.transition, r = Tt;
  try {
    if (ts.transition = null, Tt = 1, e) return e();
  } finally {
    Tt = r, ts.transition = n, kt = t, !(kt & 6) && hr();
  }
}
function du() {
  Hn = Zr.current, _t(Zr);
}
function Er(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, y0(n)), rn !== null) for (n = rn.return; n !== null; ) {
    var r = n;
    switch (Vc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ci();
        break;
      case 3:
        fl(), _t(Bn), _t(jn), eu();
        break;
      case 5:
        qc(r);
        break;
      case 4:
        fl();
        break;
      case 13:
        _t(Wt);
        break;
      case 19:
        _t(Wt);
        break;
      case 10:
        Xc(r.type._context);
        break;
      case 22:
      case 23:
        du();
    }
    n = n.return;
  }
  if (hn = e, rn = e = ir(e.current, null), gn = Hn = t, cn = 0, ao = null, au = Oi = Tr = 0, _n = Hl = null, wr !== null) {
    for (t = 0; t < wr.length; t++) if (n = wr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    wr = null;
  }
  return e;
}
function Qf(e, t) {
  do {
    var n = rn;
    try {
      if (Gc(), Vo.current = yi, xi) {
        for (var r = zt.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        xi = !1;
      }
      if (Ir = 0, dn = an = zt = null, Wl = !1, lo = 0, iu.current = null, n === null || n.return === null) {
        cn = 1, ao = t, rn = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, c = t;
        if (t = gn, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, N = a, m = N.tag;
          if (!(N.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var g = N.alternate;
            g ? (N.updateQueue = g.updateQueue, N.memoizedState = g.memoizedState, N.lanes = g.lanes) : (N.updateQueue = null, N.memoizedState = null);
          }
          var k = xd(i);
          if (k !== null) {
            k.flags &= -257, yd(k, i, a, o, t), k.mode & 1 && gd(o, d, t), t = k, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var b = /* @__PURE__ */ new Set();
              b.add(c), t.updateQueue = b;
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              gd(o, d, t), hu();
              break e;
            }
            c = Error(pe(426));
          }
        } else if (Ft && a.mode & 1) {
          var L = xd(i);
          if (L !== null) {
            !(L.flags & 65536) && (L.flags |= 256), yd(L, i, a, o, t), Kc(pl(c, a));
            break e;
          }
        }
        o = c = pl(c, a), cn !== 4 && (cn = 2), Hl === null ? Hl = [o] : Hl.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var y = $f(o, c, t);
              ud(o, y);
              break e;
            case 1:
              a = c;
              var p = o.type, h = o.stateNode;
              if (!(o.flags & 128) && (typeof p.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (lr === null || !lr.has(h)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var M = Lf(o, a, t);
                ud(o, M);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      qf(n);
    } catch (T) {
      t = T, rn === n && n !== null && (rn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Jf() {
  var e = vi.current;
  return vi.current = yi, e === null ? yi : e;
}
function hu() {
  (cn === 0 || cn === 3 || cn === 2) && (cn = 4), hn === null || !(Tr & 268435455) && !(Oi & 268435455) || Qs(hn, gn);
}
function wi(e, t) {
  var n = kt;
  kt |= 2;
  var r = Jf();
  (hn !== e || gn !== t) && (Es = null, Er(e, t));
  do
    try {
      z0();
      break;
    } catch (l) {
      Qf(e, l);
    }
  while (!0);
  if (Gc(), kt = n, vi.current = r, rn !== null) throw Error(pe(261));
  return hn = null, gn = 0, cn;
}
function z0() {
  for (; rn !== null; ) Zf(rn);
}
function H0() {
  for (; rn !== null && !mm(); ) Zf(rn);
}
function Zf(e) {
  var t = tp(e.alternate, e, Hn);
  e.memoizedProps = e.pendingProps, t === null ? qf(e) : rn = t, iu.current = null;
}
function qf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = P0(n, t), n !== null) {
        n.flags &= 32767, rn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        cn = 6, rn = null;
        return;
      }
    } else if (n = D0(n, t, Hn), n !== null) {
      rn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      rn = t;
      return;
    }
    rn = t = e;
  } while (t !== null);
  cn === 0 && (cn = 5);
}
function vr(e, t, n) {
  var r = Tt, l = ts.transition;
  try {
    ts.transition = null, Tt = 1, V0(e, t, n, r);
  } finally {
    ts.transition = l, Tt = r;
  }
  return null;
}
function V0(e, t, n, r) {
  do
    ll();
  while (qs !== null);
  if (kt & 6) throw Error(pe(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(pe(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Em(e, o), e === hn && (rn = hn = null, gn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Oo || (Oo = !0, np(si, function() {
    return ll(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ts.transition, ts.transition = null;
    var i = Tt;
    Tt = 1;
    var a = kt;
    kt |= 4, iu.current = null, F0(e, n), Yf(n, e), d0(Ga), li = !!Ya, Ga = Ya = null, e.current = n, B0(n), gm(), kt = a, Tt = i, ts.transition = o;
  } else e.current = n;
  if (Oo && (Oo = !1, qs = e, ki = l), o = e.pendingLanes, o === 0 && (lr = null), vm(n.stateNode), Wn(e, qt()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ni) throw Ni = !1, e = pc, pc = null, e;
  return ki & 1 && e.tag !== 0 && ll(), o = e.pendingLanes, o & 1 ? e === mc ? Vl++ : (Vl = 0, mc = e) : Vl = 0, hr(), null;
}
function ll() {
  if (qs !== null) {
    var e = Rh(ki), t = ts.transition, n = Tt;
    try {
      if (ts.transition = null, Tt = 16 > e ? 16 : e, qs === null) var r = !1;
      else {
        if (e = qs, qs = null, ki = 0, kt & 6) throw Error(pe(331));
        var l = kt;
        for (kt |= 4, De = e.current; De !== null; ) {
          var o = De, i = o.child;
          if (De.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c];
                for (De = d; De !== null; ) {
                  var N = De;
                  switch (N.tag) {
                    case 0:
                    case 11:
                    case 15:
                      zl(8, N, o);
                  }
                  var m = N.child;
                  if (m !== null) m.return = N, De = m;
                  else for (; De !== null; ) {
                    N = De;
                    var g = N.sibling, k = N.return;
                    if (Hf(N), N === d) {
                      De = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = k, De = g;
                      break;
                    }
                    De = k;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var b = S.child;
                if (b !== null) {
                  S.child = null;
                  do {
                    var L = b.sibling;
                    b.sibling = null, b = L;
                  } while (b !== null);
                }
              }
              De = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, De = i;
          else e: for (; De !== null; ) {
            if (o = De, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                zl(9, o, o.return);
            }
            var y = o.sibling;
            if (y !== null) {
              y.return = o.return, De = y;
              break e;
            }
            De = o.return;
          }
        }
        var p = e.current;
        for (De = p; De !== null; ) {
          i = De;
          var h = i.child;
          if (i.subtreeFlags & 2064 && h !== null) h.return = i, De = h;
          else e: for (i = p; De !== null; ) {
            if (a = De, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Li(9, a);
              }
            } catch (T) {
              Gt(a, a.return, T);
            }
            if (a === i) {
              De = null;
              break e;
            }
            var M = a.sibling;
            if (M !== null) {
              M.return = a.return, De = M;
              break e;
            }
            De = a.return;
          }
        }
        if (kt = l, hr(), vs && typeof vs.onPostCommitFiberRoot == "function") try {
          vs.onPostCommitFiberRoot(Si, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Tt = n, ts.transition = t;
    }
  }
  return !1;
}
function Ad(e, t, n) {
  t = pl(n, t), t = $f(e, t, 1), e = rr(e, t, 1), t = An(), e !== null && (fo(e, 1, t), Wn(e, t));
}
function Gt(e, t, n) {
  if (e.tag === 3) Ad(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ad(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (lr === null || !lr.has(r))) {
        e = pl(n, e), e = Lf(t, e, 1), t = rr(t, e, 1), e = An(), t !== null && (fo(t, 1, e), Wn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function K0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = An(), e.pingedLanes |= e.suspendedLanes & n, hn === e && (gn & n) === n && (cn === 4 || cn === 3 && (gn & 130023424) === gn && 500 > qt() - cu ? Er(e, 0) : au |= n), Wn(e, t);
}
function ep(e, t) {
  t === 0 && (e.mode & 1 ? (t = Eo, Eo <<= 1, !(Eo & 130023424) && (Eo = 4194304)) : t = 1);
  var n = An();
  e = Ls(e, t), e !== null && (fo(e, t, n), Wn(e, n));
}
function Y0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), ep(e, n);
}
function G0(e, t) {
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
      throw Error(pe(314));
  }
  r !== null && r.delete(t), ep(e, n);
}
var tp;
tp = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Bn.current) Fn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Fn = !1, O0(e, t, n);
    Fn = !!(e.flags & 131072);
  }
  else Fn = !1, Ft && t.flags & 1048576 && rf(t, hi, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Yo(e, t), e = t.pendingProps;
      var l = ul(t, jn.current);
      rl(t, n), l = nu(null, t, r, e, l, n);
      var o = su();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Un(r) ? (o = !0, ui(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Jc(t), l.updater = $i, t.stateNode = l, l._reactInternals = t, sc(t, r, e, n), t = oc(null, t, r, !0, o, n)) : (t.tag = 0, Ft && o && Hc(t), Tn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Yo(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Q0(r), e = ls(r, e), l) {
          case 0:
            t = lc(null, t, r, e, n);
            break e;
          case 1:
            t = kd(null, t, r, e, n);
            break e;
          case 11:
            t = vd(null, t, r, e, n);
            break e;
          case 14:
            t = Nd(null, t, r, ls(r.type, e), n);
            break e;
        }
        throw Error(pe(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), lc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), kd(e, t, r, l, n);
    case 3:
      e: {
        if (_f(t), e === null) throw Error(pe(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, df(e, t), mi(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = pl(Error(pe(423)), t), t = wd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = pl(Error(pe(424)), t), t = wd(e, t, r, n, l);
          break e;
        } else for (Vn = sr(t.stateNode.containerInfo.firstChild), Kn = t, Ft = !0, is = null, n = cf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (dl(), r === l) {
            t = Os(e, t, n);
            break e;
          }
          Tn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return hf(t), e === null && ec(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Xa(r, l) ? i = null : o !== null && Xa(r, o) && (t.flags |= 32), Pf(e, t), Tn(e, t, i, n), t.child;
    case 6:
      return e === null && ec(t), null;
    case 13:
      return Ff(e, t, n);
    case 4:
      return Zc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hl(t, null, r, n) : Tn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), vd(e, t, r, l, n);
    case 7:
      return Tn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Tn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Tn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Dt(fi, r._currentValue), r._currentValue = i, o !== null) if (ds(o.value, i)) {
          if (o.children === l.children && !Bn.current) {
            t = Os(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            i = o.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = Ts(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var N = d.pending;
                    N === null ? c.next = c : (c.next = N.next, N.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), tc(
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
            if (i = o.return, i === null) throw Error(pe(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), tc(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, rl(t, n), l = ns(l), r = r(l), t.flags |= 1, Tn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ls(r, t.pendingProps), l = ls(r.type, l), Nd(e, t, r, l, n);
    case 15:
      return Of(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), Yo(e, t), t.tag = 1, Un(r) ? (e = !0, ui(t)) : e = !1, rl(t, n), Rf(t, r, l), sc(t, r, l, n), oc(null, t, r, !0, e, n);
    case 19:
      return Bf(e, t, n);
    case 22:
      return Df(e, t, n);
  }
  throw Error(pe(156, t.tag));
};
function np(e, t) {
  return Mh(e, t);
}
function X0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function es(e, t, n, r) {
  return new X0(e, t, n, r);
}
function fu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Q0(e) {
  if (typeof e == "function") return fu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Rc) return 11;
    if (e === $c) return 14;
  }
  return 2;
}
function ir(e, t) {
  var n = e.alternate;
  return n === null ? (n = es(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Qo(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") fu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Wr:
      return Sr(n.children, l, o, t);
    case Ac:
      i = 8, l |= 8;
      break;
    case ba:
      return e = es(12, n, t, l | 2), e.elementType = ba, e.lanes = o, e;
    case Ma:
      return e = es(13, n, t, l), e.elementType = Ma, e.lanes = o, e;
    case Ia:
      return e = es(19, n, t, l), e.elementType = Ia, e.lanes = o, e;
    case dh:
      return Di(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ch:
          i = 10;
          break e;
        case uh:
          i = 9;
          break e;
        case Rc:
          i = 11;
          break e;
        case $c:
          i = 14;
          break e;
        case Vs:
          i = 16, r = null;
          break e;
      }
      throw Error(pe(130, e == null ? e : typeof e, ""));
  }
  return t = es(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Sr(e, t, n, r) {
  return e = es(7, e, r, t), e.lanes = n, e;
}
function Di(e, t, n, r) {
  return e = es(22, e, r, t), e.elementType = dh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function xa(e, t, n) {
  return e = es(6, e, null, t), e.lanes = n, e;
}
function ya(e, t, n) {
  return t = es(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function J0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Zi(0), this.expirationTimes = Zi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function pu(e, t, n, r, l, o, i, a, c) {
  return e = new J0(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = es(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Jc(o), e;
}
function Z0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ur, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function sp(e) {
  if (!e) return cr;
  e = e._reactInternals;
  e: {
    if ($r(e) !== e || e.tag !== 1) throw Error(pe(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Un(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(pe(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Un(n)) return nf(e, n, t);
  }
  return t;
}
function rp(e, t, n, r, l, o, i, a, c) {
  return e = pu(n, r, !0, e, l, o, i, a, c), e.context = sp(null), n = e.current, r = An(), l = or(n), o = Ts(r, l), o.callback = t ?? null, rr(n, o, l), e.current.lanes = l, fo(e, l, r), Wn(e, r), e;
}
function Pi(e, t, n, r) {
  var l = t.current, o = An(), i = or(l);
  return n = sp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ts(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = rr(l, t, i), e !== null && (us(e, l, i, o), Ho(e, l, i)), i;
}
function ji(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Rd(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function mu(e, t) {
  Rd(e, t), (e = e.alternate) && Rd(e, t);
}
function q0() {
  return null;
}
var lp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function gu(e) {
  this._internalRoot = e;
}
_i.prototype.render = gu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(pe(409));
  Pi(e, t, null, null);
};
_i.prototype.unmount = gu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ar(function() {
      Pi(null, e, null, null);
    }), t[$s] = null;
  }
};
function _i(e) {
  this._internalRoot = e;
}
_i.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Oh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Xs.length && t !== 0 && t < Xs[n].priority; n++) ;
    Xs.splice(n, 0, e), n === 0 && Ph(e);
  }
};
function xu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Fi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function $d() {
}
function eg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = ji(i);
        o.call(d);
      };
    }
    var i = rp(t, r, e, 0, null, !1, !1, "", $d);
    return e._reactRootContainer = i, e[$s] = i.current, eo(e.nodeType === 8 ? e.parentNode : e), Ar(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var d = ji(c);
      a.call(d);
    };
  }
  var c = pu(e, 0, !1, null, null, !1, !1, "", $d);
  return e._reactRootContainer = c, e[$s] = c.current, eo(e.nodeType === 8 ? e.parentNode : e), Ar(function() {
    Pi(t, c, n, r);
  }), c;
}
function Bi(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = ji(i);
        a.call(c);
      };
    }
    Pi(t, i, e, l);
  } else i = eg(n, t, e, l, r);
  return ji(i);
}
$h = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ll(t.pendingLanes);
        n !== 0 && (Dc(t, n | 1), Wn(t, qt()), !(kt & 6) && (ml = qt() + 500, hr()));
      }
      break;
    case 13:
      Ar(function() {
        var r = Ls(e, 1);
        if (r !== null) {
          var l = An();
          us(r, e, 1, l);
        }
      }), mu(e, 1);
  }
};
Pc = function(e) {
  if (e.tag === 13) {
    var t = Ls(e, 134217728);
    if (t !== null) {
      var n = An();
      us(t, e, 134217728, n);
    }
    mu(e, 134217728);
  }
};
Lh = function(e) {
  if (e.tag === 13) {
    var t = or(e), n = Ls(e, t);
    if (n !== null) {
      var r = An();
      us(n, e, t, r);
    }
    mu(e, t);
  }
};
Oh = function() {
  return Tt;
};
Dh = function(e, t) {
  var n = Tt;
  try {
    return Tt = e, t();
  } finally {
    Tt = n;
  }
};
Fa = function(e, t, n) {
  switch (t) {
    case "input":
      if (Ra(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ti(r);
            if (!l) throw Error(pe(90));
            fh(r), Ra(r, l);
          }
        }
      }
      break;
    case "textarea":
      mh(e, n);
      break;
    case "select":
      t = n.value, t != null && el(e, !!n.multiple, t, !1);
  }
};
wh = uu;
jh = Ar;
var tg = { usingClientEntryPoint: !1, Events: [mo, Kr, Ti, Nh, kh, uu] }, Il = { findFiberByHostInstance: kr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ng = { bundleType: Il.bundleType, version: Il.version, rendererPackageName: Il.rendererPackageName, rendererConfig: Il.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ds.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Sh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Il.findFiberByHostInstance || q0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Do = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Do.isDisabled && Do.supportsFiber) try {
    Si = Do.inject(ng), vs = Do;
  } catch {
  }
}
Gn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tg;
Gn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!xu(t)) throw Error(pe(200));
  return Z0(e, t, null, n);
};
Gn.createRoot = function(e, t) {
  if (!xu(e)) throw Error(pe(299));
  var n = !1, r = "", l = lp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = pu(e, 1, !1, null, null, n, !1, r, l), e[$s] = t.current, eo(e.nodeType === 8 ? e.parentNode : e), new gu(t);
};
Gn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(pe(188)) : (e = Object.keys(e).join(","), Error(pe(268, e)));
  return e = Sh(t), e = e === null ? null : e.stateNode, e;
};
Gn.flushSync = function(e) {
  return Ar(e);
};
Gn.hydrate = function(e, t, n) {
  if (!Fi(t)) throw Error(pe(200));
  return Bi(null, e, t, !0, n);
};
Gn.hydrateRoot = function(e, t, n) {
  if (!xu(e)) throw Error(pe(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = lp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = rp(t, null, e, 1, n ?? null, l, !1, o, i), e[$s] = t.current, eo(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new _i(t);
};
Gn.render = function(e, t, n) {
  if (!Fi(t)) throw Error(pe(200));
  return Bi(null, e, t, !1, n);
};
Gn.unmountComponentAtNode = function(e) {
  if (!Fi(e)) throw Error(pe(40));
  return e._reactRootContainer ? (Ar(function() {
    Bi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[$s] = null;
    });
  }), !0) : !1;
};
Gn.unstable_batchedUpdates = uu;
Gn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Fi(n)) throw Error(pe(200));
  if (e == null || e._reactInternals === void 0) throw Error(pe(38));
  return Bi(e, t, n, !1, r);
};
Gn.version = "18.3.1-next-f1338f8080-20240426";
function op() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(op);
    } catch (e) {
      console.error(e);
    }
}
op(), lh.exports = Gn;
var Ps = lh.exports, Ld = Ps;
qo.createRoot = Ld.createRoot, qo.hydrateRoot = Ld.hydrateRoot;
var ip = { exports: {} }, Ui = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sg = u, rg = Symbol.for("react.element"), lg = Symbol.for("react.fragment"), og = Object.prototype.hasOwnProperty, ig = sg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ag = { key: !0, ref: !0, __self: !0, __source: !0 };
function ap(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) og.call(t, r) && !ag.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: rg, type: e, key: o, ref: i, props: l, _owner: ig.current };
}
Ui.Fragment = lg;
Ui.jsx = ap;
Ui.jsxs = ap;
ip.exports = Ui;
var s = ip.exports;
let Js = [], cp = 120, va = !1;
async function cg() {
  if (!va) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          ug(n), va = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    va = !0;
  }
}
function ug(e) {
  Array.isArray(e) && (Js = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function As(e) {
  for (let t = Js.length - 1; t >= 0; t--) {
    const n = Js[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return Js.length > 0 ? {
    offsetMin: Js[0].offsetBeforeMin,
    label: Js[0].labelBefore
  } : { offsetMin: cp, label: "LOCAL" };
}
function up(e, t) {
  return Js.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Ci(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, i, a] = t.split(":").map(Number);
  for (const c of Js)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const d = (c.offsetBeforeMin - c.offsetAfterMin) / 60, N = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (N.getUTCFullYear() === n && N.getUTCMonth() + 1 === r && N.getUTCDate() === l) {
        const m = N.getUTCHours();
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
function dg(e) {
  const { offsetMin: t, label: n } = As(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function hg(e) {
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
function Cr(e, t = "LOCAL") {
  return t === "UTC" ? hg(e) : dg(e);
}
function Od(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Cr(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function yc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, i] = e.split("-").map(Number), [a, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(i) || isNaN(a) || isNaN(c)) return null;
  const N = Date.UTC(l, o - 1, i, a, c, d);
  if (n === "UTC")
    return N;
  const m = Ci(e, t);
  if (m.isAmbiguous)
    return r === 2 ? m.secondOccurrenceEpoch : m.firstOccurrenceEpoch;
  const g = N - cp * 6e4, { offsetMin: k } = As(g);
  let S = N - k * 6e4;
  const b = As(S);
  return b.offsetMin !== k && (S = N - b.offsetMin * 6e4), S;
}
function fg({
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
  onToggleDrawer: N,
  isInitialSetup: m = !1,
  selectedCount: g = 0,
  totalCount: k = 0,
  onResetStudio: S
}) {
  const [b, L] = u.useState(!1);
  u.useEffect(() => {
    if (!b) return;
    const T = (j) => {
      j.key === "Escape" && L(!1);
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [b]);
  const y = u.useMemo(() => {
    const T = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!T || j <= 0) return "-- ➔ --";
    const v = T + j, x = (D) => String(D).padStart(2, "0"), w = Cr(T, n), I = Cr(v, n), O = `${w.year}-${x(w.month)}-${x(w.day)}`, H = `${x(w.hour)}:${x(w.minute)}:${x(w.second)}`, R = `${I.year}-${x(I.month)}-${x(I.day)}`, W = `${x(I.hour)}:${x(I.minute)}:${x(I.second)}`, se = n === "UTC" ? " (UTC)" : w.label ? ` (${w.label})` : "", F = O === R ? W : `${R} ${W}`;
    return `${O} ${H} ➔ ${F}${se}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), p = u.useMemo(() => {
    const T = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (T >= 1440) {
      const j = (T / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${T}m Total)`;
    }
    return `(${T}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), h = () => {
    L(!1), S == null || S();
  }, M = b ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => L(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (T) => T.stopPropagation(), dir: "ltr", children: [
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
          onClick: () => L(!1),
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
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: () => L(!1), children: "CANCEL" }),
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
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: y }),
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
          onClick: N,
          title: "Click to change selected station pool",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "beacon-dot" }),
            /* @__PURE__ */ s.jsx("span", { className: "selection-label", children: "SELECTED:" }),
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: g }),
            /* @__PURE__ */ s.jsxs("span", { className: "selection-total", children: [
              "/ ",
              k
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
          onClick: () => L(!0),
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
          onClick: N,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && M && Ps.createPortal(M, document.body)
  ] });
}
const Pr = (e) => String(e).padStart(2, "0");
function yt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const g = new Date(e), k = Pr(g.getUTCHours()), S = Pr(g.getUTCMinutes()), b = Pr(g.getUTCSeconds()), L = l ? `${k}:${S}:${b}` : `${k}:${S}`;
    return r ? `${L} UTC` : L;
  }
  const { offsetMin: o, label: i } = As(e), a = new Date(e + o * 60 * 1e3), c = Pr(a.getUTCHours()), d = Pr(a.getUTCMinutes()), N = Pr(a.getUTCSeconds()), m = l ? `${c}:${d}:${N}` : `${c}:${d}`;
  return r ? `${m} ${i}` : m;
}
const pg = 600, Dd = 250, Jn = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), vc = /* @__PURE__ */ new Set(), Pd = 4;
let ol = 0, as = [];
function Nc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Dd) * Dd;
}
function dp() {
  var e;
  if (!(ol >= Pd || as.length === 0))
    for (as = as.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); ol < Pd && as.length > 0; ) {
      const t = as.pop();
      !t || (e = t.signal) != null && e.aborted || (ol++, mg(t));
    }
}
function Jo(e, t, n, r = "mon-0") {
  const l = Nc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
  if (Jn.size >= pg) {
    const a = Jn.keys().next().value, c = Jn.get(a);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), Jn.delete(a);
  }
  Jn.set(i, n), vc.forEach((a) => a(e, l, n, o));
}
async function mg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: i } = e;
  try {
    if (o != null && o.aborted) {
      i(null);
      return;
    }
    const a = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${a}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), N = URL.createObjectURL(d);
      Jo(n, r, N, l), i(N);
    } else c.status === 204 ? (Jo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } catch (a) {
    a.name !== "AbortError" ? (Jo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } finally {
    ol = Math.max(0, ol - 1), Nr.delete(t), dp();
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
    const r = Nc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!Jn.has(o)) return null;
    const i = Jn.get(o);
    return Jn.delete(o), Jn.set(o, i), i;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: Jo,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    Jn.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), Jn.clear(), Nr.clear(), as = [], ol = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return vc.add(e), () => vc.delete(e);
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
    const l = Nc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
    if (Jn.has(i))
      return Promise.resolve(this.get(e, l, o));
    if (Nr.has(i))
      return Nr.get(i);
    const a = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      as = as.filter((N) => N.hostname === e && N.displayId === o && N.key !== i ? (Nr.delete(N.key), N.resolve(null), !1) : !0);
      const d = { key: i, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        as = as.filter((N) => N.key !== i), Nr.delete(i), c(null);
      }, { once: !0 }), as.push(d), dp();
    });
    return Nr.set(i, a), a;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  In.clearAll();
});
const yu = "ITB_STUDIO_SESSION_CACHE_V2", hp = "itb_player_audio_settings";
let Na = null;
function gg() {
  try {
    const e = localStorage.getItem(yu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function fp(e) {
  e && (Na && clearTimeout(Na), Na = setTimeout(() => {
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
      localStorage.setItem(yu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function xg() {
  try {
    localStorage.removeItem(yu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function il() {
  try {
    const e = localStorage.getItem(hp);
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
function yg(e) {
  try {
    localStorage.setItem(hp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let Ys = null, qr = null, ka = null, Dn = 0, _r = 0, Po = -60, co = 1;
function vg() {
  if (!Ys) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Ys = new e());
  }
  return Ys && Ys.state === "suspended" && Ys.resume().catch(() => {
  }), Ys;
}
function Ei(e, t = 1) {
  if (!e) return null;
  co = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = vg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (i) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", i);
      }
    return l && l.gain.setValueAtTime(co, n.currentTime), qr = e, Ng(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function _d(e) {
  if (co = Math.max(0, Number(e) || 1), qr != null && qr.__audioGainNode && Ys)
    try {
      qr.__audioGainNode.gain.setValueAtTime(co, Ys.currentTime);
    } catch {
    }
}
function Ng() {
  if (ka) return;
  const e = new Uint8Array(256), t = () => {
    const n = qr, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Dn *= 0.85, _r *= 0.85, Dn < 1e-3 && (Dn = 0), _r < 1e-3 && (_r = 0), Po = Dn > 1e-3 ? 20 * Math.log10(Dn) : -60;
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
        Dn = i > Dn ? Dn * 0.3 + i * 0.7 : Dn * 0.85 + i * 0.15, _r = Math.max(Dn, o), Po = Dn > 1e-4 ? 20 * Math.log10(Dn) : -60;
      } catch {
        Dn = 0, _r = 0, Po = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Dn,
        peak: _r,
        db: Po,
        gain: co,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), ka = requestAnimationFrame(t);
  };
  ka = requestAnimationFrame(t);
}
function pp({ isPlaying: e = !1 }) {
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
function kg({
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
          const d = (a.displayId ?? a.DisplayId ?? `mon-${c}`).toLowerCase(), N = !i && o === d, m = a.width ?? a.Width ?? 1920, g = a.height ?? a.Height ?? 1080, k = a.displayName ?? a.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${N ? "is-active" : ""}`,
              onClick: (S) => {
                S.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${k} (${m}×${g})`,
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
function wg({
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
  isSpotlightActive: N,
  globalGaps: m = [],
  recordingSegments: g = {},
  playbackSpeed: k = 1,
  activeAudioStationId: S = null,
  directorPlan: b = null,
  isAutoDirectorEnabled: L = !0,
  targetDisplayId: y = "auto",
  onSelectDisplayId: p = null,
  areAllDisplaysPlaced: h = !1,
  hideDisplayStrip: M = !1
}) {
  var Y;
  const T = e.hostname || e.name || e.id || "", j = Math.round(t), [v, x] = u.useState(() => !T || !j ? null : In.get(T, j) || null), [w, I] = u.useState(""), [O, H] = u.useState(!1), [R, W] = u.useState(!1), [se, F] = u.useState(!1), D = u.useRef(l), E = u.useRef(null), P = u.useRef(0), z = u.useRef(t - i), q = u.useRef(t - i), U = u.useRef(!1), ge = u.useRef(null), ie = u.useRef(!1);
  z.current = t - i;
  const oe = (e == null ? void 0 : e.displays) || ((Y = e == null ? void 0 : e.topology) == null ? void 0 : Y.displays) || [], [le, Fe] = u.useState(null);
  u.useEffect(() => {
    Fe(null);
  }, [y]);
  const V = u.useMemo(() => {
    const G = b || (e == null ? void 0 : e.directorPlan);
    return !G || !G.segments || G.segments.length === 0 ? null : G.segments.find((ue) => {
      const fe = ue.startEpochMs ?? ue.StartEpochMs ?? 0, ke = ue.endEpochMs ?? ue.EndEpochMs ?? 0;
      return t >= fe && t <= ke;
    }) || G.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t]), Z = u.useMemo(() => {
    var G;
    return le ? le.toLowerCase() : y && y !== "auto" && y !== "director" ? y.toLowerCase() : oe.length > 1 && L !== !1 && V ? (V.targetDisplayId || V.TargetDisplayId || "mon-0").toLowerCase() : (((G = oe[0]) == null ? void 0 : G.displayId) || "mon-0").toLowerCase();
  }, [le, y, oe, L, V]), ce = g[e == null ? void 0 : e.id] || g[T] || (e == null ? void 0 : e.segments) || [], J = ce.length === 0 || ce.some((G) => {
    const ue = G.startEpochMs ?? G.startEpoch ?? 0, fe = G.endEpochMs ?? G.endEpoch ?? 0;
    return t >= ue && t <= fe;
  }), re = !!(r ? !il().isMuted : S && (e.id === S || T === S)), Ne = u.useCallback(() => {
    if (!E.current) return;
    const G = il();
    if (r)
      E.current.volume = G.volume, E.current.muted = G.isMuted, G.isMuted || Ei(E.current);
    else {
      const ue = !!(S && (e.id === S || T === S));
      E.current.muted = !ue, ue && (E.current.volume = G.volume, Ei(E.current));
    }
  }, [r, S, e.id, T]);
  u.useEffect(() => {
    Ne();
  }, [Ne]), u.useEffect(() => {
    const G = (ue) => {
      E.current && ue.detail && Ne();
    };
    return window.addEventListener("itb-audio-state-changed", G), () => window.removeEventListener("itb-audio-state-changed", G);
  }, [Ne]), u.useEffect(() => {
    E.current && (E.current.defaultPlaybackRate = k, E.current.playbackRate = k);
  }, [k]), u.useEffect(() => {
    if (n || !j || !T) return;
    if (l) {
      D.current = !0;
      return;
    }
    const G = D.current;
    D.current = l;
    let ue = !0;
    const fe = new AbortController(), ke = In.get(T, j, Z);
    if (ke) {
      x(ke), W(!1), F(!1);
      return;
    }
    F(!0);
    const te = setTimeout(() => {
      ue && In.fetchFrame(T, j, fe.signal, Z).then((ve) => {
        ue && (F(!1), ve && ve !== "NO_SIGNAL" ? (x(ve), W(!1)) : ve === "NO_SIGNAL" && W(!0));
      });
    }, G ? 25 : 40), Pe = In.subscribe((ve, be, ze, Oe) => {
      ve === T && be === j && (!Oe || Oe === Z) && ue && (F(!1), ze && ze !== "NO_SIGNAL" ? (x(ze), W(!1)) : ze === "NO_SIGNAL" && W(!0));
    });
    return () => {
      ue = !1, clearTimeout(te), fe.abort(), Pe();
    };
  }, [T, j, n, l, r, O, Z]), u.useEffect(() => {
    if (!T || !(r || l)) {
      l || (ge.current && clearTimeout(ge.current), U.current = !1, I(""), H(!1), E.current && (E.current.pause(), E.current.removeAttribute("src"), E.current.load()));
      return;
    }
    let ue = null;
    return l && !N && J ? ue = setTimeout(() => {
      const fe = z.current;
      P.current = fe, q.current = fe, U.current = !1;
      const ke = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(T)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + fe}&displayId=${encodeURIComponent(Z)}&_t=${Date.now()}`;
      H(!1), I(ke);
    }, 80) : l || (ge.current && clearTimeout(ge.current), U.current = !1, I(""), H(!1), E.current && (E.current.pause(), E.current.removeAttribute("src"), E.current.load())), () => {
      ue && clearTimeout(ue);
    };
  }, [l, r, T, i, a, N, J, Z]), u.useEffect(() => {
    if (!T || !(r || l)) return;
    const ue = z.current, fe = Math.abs(ue - q.current);
    if (!l || fe < 800) {
      q.current = ue;
      return;
    }
    return U.current = !0, q.current = ue, P.current = ue, E.current && E.current.pause(), H(!1), ge.current && clearTimeout(ge.current), ge.current = setTimeout(() => {
      if (!J || N) {
        I(""), H(!1), U.current = !1;
        return;
      }
      const ke = z.current, Se = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(T)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ke}&displayId=${encodeURIComponent(Z)}&_t=${Date.now()}`;
      I(Se);
    }, 75), () => {
      ge.current && clearTimeout(ge.current);
    };
  }, [t, l, r, T, i, a, N, J, Z]), u.useEffect(() => {
    if (r || !l || !E.current || !O || U.current) return;
    const G = (z.current - P.current) / 1e3;
    if (G >= 0) {
      const ue = E.current, fe = ue.currentTime, ke = Math.abs(fe - G);
      if (ke > 0.35 && ke < 3)
        try {
          ue.currentTime = G;
        } catch {
        }
    }
  }, [r, l, t, O]), u.useEffect(() => {
    if (!r || !l || !w || !O || N) return;
    let G = null, ue = E.current ? E.current.currentTime : 0, fe = performance.now(), ke = P.current + Math.round(ue * 1e3);
    const Se = () => {
      const te = E.current;
      if (te && !te.paused && !te.ended && !ie.current && !U.current) {
        const Pe = performance.now(), ve = te.currentTime;
        Math.abs(ve - ue) > 5e-4 && (ue = ve, fe = Pe);
        const be = Math.max(0, (Pe - fe) / 1e3), ze = te.playbackRate || k || 1, Oe = ue + be * ze;
        let je = P.current + Math.round(Oe * 1e3);
        const Ye = je - ke;
        if (Ye < 0 && Ye > -300 && (je = ke), je >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Ue = i + je, en = m == null ? void 0 : m.find((qe) => Ue >= qe.startEpochMs && Ue < qe.endEpochMs);
        if (en) {
          ie.current = !0;
          const qe = en.endEpochMs - i;
          d(qe), P.current = qe, ke = qe, q.current = qe;
          const Ke = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(T)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + qe}&_t=${Date.now()}`;
          H(!1), I(Ke), setTimeout(() => {
            ie.current = !1;
          }, 300);
          return;
        }
        je !== ke && (ke = je, q.current = je, d == null || d(je));
      }
      G = requestAnimationFrame(Se);
    };
    return G = requestAnimationFrame(Se), () => {
      G && cancelAnimationFrame(G);
    };
  }, [
    r,
    l,
    w,
    O,
    N,
    k,
    c,
    i,
    a,
    T,
    m,
    d,
    o
  ]);
  const Be = () => {
    if (ie.current) return;
    const G = i + z.current, ue = ce.map((fe) => ({ start: fe.startEpochMs ?? fe.startEpoch ?? 0, end: fe.endEpochMs ?? fe.endEpoch ?? 0 })).filter((fe) => fe.start > G + 200).sort((fe, ke) => fe.start - ke.start)[0];
    if (ue && ue.start - i < c) {
      ie.current = !0;
      const fe = ue.start - i;
      d(fe), P.current = fe;
      const ke = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(T)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + fe}&_t=${Date.now()}`;
      H(!1), I(ke), setTimeout(() => {
        ie.current = !1;
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
    (r || l) && w && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: E,
        src: w,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: O ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: O ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !re,
        onLoadedData: () => {
          E.current && (E.current.defaultPlaybackRate = k, E.current.playbackRate = k);
        },
        onCanPlay: () => {
          Ne(), E.current && (E.current.defaultPlaybackRate = k, E.current.playbackRate = k), l && E.current && E.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          U.current = !1, H(!0), Ne(), E.current && (E.current.defaultPlaybackRate = k, E.current.playbackRate = k);
        },
        onWaiting: () => {
          H(!1);
        },
        onTimeUpdate: () => {
          var G;
          !O && ((G = E.current) == null ? void 0 : G.currentTime) > 0 && (U.current = !1, H(!0));
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
          zIndex: (r || l) && O && !N ? 0 : 2,
          pointerEvents: "none"
        },
        children: v && !R ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: v,
            alt: T,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => W(!0)
          }
        ) : (!v || R || !J) && !w ? /* @__PURE__ */ s.jsx(pp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && J && !O && !N && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          T
        ] })
      ] })
    ] }) }),
    !M && /* @__PURE__ */ s.jsx(
      kg,
      {
        displays: oe,
        activeDisplayId: Z,
        onSelectDisplay: (G) => {
          Fe(G), p == null || p(G);
        },
        areAllDisplaysPlaced: h,
        isAutoDirectorEnabled: L
      }
    )
  ] });
}
function jg({
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
  outPointMs: N,
  setPlayheadMs: m,
  isSpotlightActive: g,
  globalGaps: k = [],
  onOpenSpotlight: S,
  onSelectActiveStation: b,
  recordingSegments: L = {},
  playbackSpeed: y = 1,
  activeAudioStationId: p = null,
  onSoloAudio: h,
  directorPlan: M = null,
  isAutoDirectorEnabled: T = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: v = null,
  areAllDisplaysPlaced: x = !1,
  _slotIndex: w = 0,
  borderColor: I = null,
  onSwapWithNext: O = null
}) {
  var E;
  const H = !!(p && (e.id === p || e.hostname && e.hostname === p)), R = (e.hostname || e.name || "").includes("Offline"), W = R ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((E = e == null ? void 0 : e.topology) == null ? void 0 : E.displays) || []).length > 1;
  const F = () => {
    if (t) {
      const P = j && j !== "auto" && j !== "director" ? j : null;
      S && S(e.id, P);
    } else
      b && b(e.id);
  }, D = (P) => {
    P.preventDefault(), P.stopPropagation(), t && b && (a && a(!1), b(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: F,
      onContextMenu: D,
      className: `camera-card ${W} ${t ? "is-solo-card" : ""}`,
      style: I ? { borderColor: I } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${W}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            O && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (P) => {
                  P.stopPropagation(), O();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            h && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${H ? "audio-active" : ""}`,
                onClick: (P) => {
                  P.stopPropagation(), h(H ? null : e.id);
                },
                title: H ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: H ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor", fillOpacity: "0.25" }),
                  /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" })
                ] }) : /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                ] })
              }
            ),
            S && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (P) => {
                  P.stopPropagation();
                  const z = j && j !== "auto" && j !== "director" ? j : null;
                  S(e.id, z);
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
                onClick: (P) => {
                  P.stopPropagation(), t && a && a(!1), b(t ? null : e.id);
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
                onClick: (P) => {
                  P.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${R ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            wg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: R,
              isSolo: t,
              isPlaying: i,
              setIsPlaying: a,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: N,
              setPlayheadMs: m,
              isSpotlightActive: g,
              globalGaps: k,
              recordingSegments: L,
              playbackSpeed: y,
              activeAudioStationId: p,
              directorPlan: M,
              isAutoDirectorEnabled: T,
              targetDisplayId: j,
              onSelectDisplayId: v,
              areAllDisplaysPlaced: x,
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
        !R && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
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
function Ut(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Cg(e) {
  const t = Ut(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Eg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Sg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var b, L, y, p, h, M;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let T = 0; T < e.length; T++)
    if (e[T].timestampEpochMs <= t)
      l = e[T], o = e[T + 1] || e[T];
    else {
      o === l && e[T] && (o = e[T]);
      break;
    }
  if (l === o)
    return ((b = l.layout) == null ? void 0 : b.placements) || n;
  const i = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), a = o.transitionType || "smooth", c = o.timestampEpochMs - i;
  if (t < c)
    return ((L = l.layout) == null ? void 0 : L.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((y = o.layout) == null ? void 0 : y.placements) || n;
  if (a === "cut")
    return ((p = l.layout) == null ? void 0 : p.placements) || n;
  const d = (t - c) / i, N = Ut(d, 0, 1), m = a === "linear" ? N : Cg(N), g = ((h = l.layout) == null ? void 0 : h.placements) || [], k = ((M = o.layout) == null ? void 0 : M.placements) || [], S = k.map((T) => {
    const j = g.find((H) => H.stationId === T.stationId && H.displayId === T.displayId);
    if (!j)
      return {
        ...T,
        opacity: Math.max(0.05, m)
      };
    const v = Math.round(j.x + (T.x - j.x) * m), x = Math.round(j.y + (T.y - j.y) * m), w = Math.round(j.width + (T.width - j.width) * m), I = Math.round(j.height + (T.height - j.height) * m), O = Number(((j.rotation || 0) + ((T.rotation || 0) - (j.rotation || 0)) * m).toFixed(1));
    return {
      ...T,
      x: v,
      y: x,
      width: w,
      height: I,
      rotation: O,
      opacity: 1
    };
  });
  return g.forEach((T) => {
    k.some((v) => v.stationId === T.stationId && v.displayId === T.displayId) || S.push({
      ...T,
      opacity: Math.max(0, 1 - m)
    });
  }), S;
}
function bg({
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
    const S = {
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
      nextTimeline: { ...e || {}, keyframes: [S] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: S
    };
  }
  const d = c.findIndex((S) => Math.abs(S.timestampEpochMs - n) <= l);
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
  const N = {
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
  }, m = [...c, N].sort((S, b) => S.timestampEpochMs - b.timestampEpochMs), g = m.findIndex((S) => S.id === N.id);
  return {
    nextTimeline: { ...e, keyframes: m },
    newIndex: g >= 0 ? g : 0,
    isNewKeyframe: !0,
    activeKeyframe: N
  };
}
function kc(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function Mg(e, t) {
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
function Fd(e, t, n, r = 500) {
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
  }, a = [...l, i].sort((d, N) => d.timestampEpochMs - N.timestampEpochMs), c = a.findIndex((d) => d.id === i.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: a
    },
    newIndex: c >= 0 ? c : 0,
    isNew: !0
  };
}
const ms = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], wc = 1920, jc = 1080, ht = [
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
], Ig = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
], Tg = [
  { id: "none", label: "None" },
  { id: "deep", label: "Deep Cinema" },
  { id: "glow-cyan", label: "Cyan Glow" },
  { id: "glow-emerald", label: "Emerald Glow" },
  { id: "glow-rose", label: "Rose Glow" },
  { id: "glow-amber", label: "Amber Glow" }
];
function Ag(e, t, n) {
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
function xr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function Gs(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, i = n / r;
  let a, c, d, N;
  return o >= i ? (a = n, c = Math.round(a / o), d = e, N = t + Math.round((r - c) / 2)) : (c = r, a = Math.round(c * o), d = e + Math.round((n - a) / 2), N = t), { x: d, y: N, width: a, height: c };
}
function Fr(e, t = wc, n = jc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: N, y: m, width: g, height: k } = Gs(0, 0, t, n, d);
    return [{
      ...c,
      x: N,
      y: m,
      width: g,
      height: k,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: ht[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, N) => {
      const m = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: g, y: k, width: S, height: b } = Gs(N * c, 0, c, n, m);
      return {
        ...d,
        x: g,
        y: k,
        width: S,
        height: b,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: m,
        aspectRatio: m,
        zIndex: N,
        rotation: 0,
        borderWidth: 2,
        borderColor: ht[N % ht.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const g = Math.round(t / 3);
      return e.slice(0, 3).map((k, S) => {
        const b = k.nativeAspectRatio || (k.sourceWidth && k.sourceHeight ? k.sourceWidth / k.sourceHeight : 1.7777777777777777), { x: L, y, width: p, height: h } = Gs(S * g, 0, g, n, b);
        return {
          ...k,
          x: L,
          y,
          width: p,
          height: h,
          sourceWidth: k.sourceWidth || 1920,
          sourceHeight: k.sourceHeight || 1080,
          nativeAspectRatio: b,
          aspectRatio: b,
          zIndex: S,
          rotation: 0,
          borderWidth: 2,
          borderColor: ht[S % ht.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), N = Math.round(n / 2), m = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: N }
    ];
    return e.slice(0, 3).map((g, k) => {
      const S = g.nativeAspectRatio || (g.sourceWidth && g.sourceHeight ? g.sourceWidth / g.sourceHeight : 1.7777777777777777), { cx: b, cy: L } = m[k], { x: y, y: p, width: h, height: M } = Gs(b, L, d, N, S);
      return {
        ...g,
        x: y,
        y: p,
        width: h,
        height: M,
        sourceWidth: g.sourceWidth || 1920,
        sourceHeight: g.sourceHeight || 1080,
        nativeAspectRatio: S,
        aspectRatio: S,
        zIndex: k,
        rotation: 0,
        borderWidth: 2,
        borderColor: ht[k % ht.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 4) {
    const c = Math.round(t / 2), d = Math.round(n / 2), N = [
      { cx: 0, cy: 0 },
      { cx: c, cy: 0 },
      { cx: 0, cy: d },
      { cx: c, cy: d }
    ];
    return e.slice(0, 4).map((m, g) => {
      const k = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: S, cy: b } = N[g], { x: L, y, width: p, height: h } = Gs(S, b, c, d, k);
      return {
        ...m,
        x: L,
        y,
        width: p,
        height: h,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: k,
        aspectRatio: k,
        zIndex: g,
        rotation: 0,
        borderWidth: 2,
        borderColor: ht[g % ht.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), i = Math.floor(t / l), a = Math.floor(n / o);
  return e.map((c, d) => {
    const N = d % l, m = Math.floor(d / l), g = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: k, y: S, width: b, height: L } = Gs(N * i, m * a, i, a, g);
    return {
      ...c,
      x: k,
      y: S,
      width: b,
      height: L,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: g,
      aspectRatio: g,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: ht[d % ht.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function Rg({
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
  playheadMs: N = 0,
  playheadEpochMs: m = 0,
  timeMode: g = "LOCAL",
  isPlaying: k = !1,
  setIsPlaying: S,
  totalDurationMs: b,
  inPointMs: L = 0,
  outPointMs: y,
  setPlayheadMs: p,
  globalGaps: h = [],
  recordingSegments: M = {},
  playbackSpeed: T = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: v = "BurnIn",
  keystrokes: x = [],
  directorPlan: w = null,
  onOverrideDisplay: I,
  onResetOverride: O,
  compositionLayout: H = "canvas",
  onChangeCompositionLayout: R,
  isAutoDirectorEnabled: W = !0,
  onToggleAutoDirector: se,
  onUpdateCanvasLayout: F,
  canvasLayoutTimeline: D = null,
  onUpdateCanvasLayoutTimeline: E,
  activeKfIndex: P = 0,
  setActiveKfIndex: z,
  isModalOpen: q = !1
}) {
  const U = m > 0 ? m : d + N, [ge, ie] = u.useState(() => {
    var f;
    return ((f = t[0]) == null ? void 0 : f.id) || null;
  }), [oe, le] = u.useState(!1), [Fe, V] = u.useState(null), [Z, ce] = u.useState({ index: null, position: null }), [J, re] = u.useState(!1), [Ne, Be] = u.useState(!1), [Y, G] = u.useState(!1), [ue, fe] = u.useState(!1), [ke, Se] = u.useState(""), [te, Pe] = u.useState(""), ve = u.useRef(null), [be, ze] = u.useState(() => {
    try {
      const f = localStorage.getItem("itb_canvas_saved_presets");
      return f ? JSON.parse(f) : [];
    } catch {
      return [];
    }
  }), Oe = (f) => {
    ze(f);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(f));
    } catch {
    }
  }, [je, Ye] = u.useState(!1), [Ue, en] = u.useState(!1);
  u.useRef(null);
  const qe = u.useRef(null), Ke = u.useRef(null), ln = u.useRef(null), [Lt, fn] = u.useState({ width: 960, height: 540 }), [He, vt] = u.useState(0), [Cn, gt] = u.useState(!1);
  u.useEffect(() => {
    const f = (C) => {
      C.key === "Escape" && gt(!1);
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, []);
  const [Nt, En] = u.useState(!1), [wt, Rt] = u.useState(!1), [Bt, Xt] = u.useState(!1), [Ee, jt] = u.useState(!1), [ye, Ce] = u.useState(!1), [We, pt] = u.useState({ vertical: null, horizontal: null }), [Ct, X] = u.useState(!0), [me, we] = u.useState(!0), [_e, Xe] = u.useState(null), [Je, mt] = u.useState({ x: 0, y: 0, isInside: !1 }), Ze = u.useRef(null), Ge = u.useRef(null), ct = u.useRef(!1), [bt, dt] = u.useState("auto-grid"), Vt = u.useRef([]), yn = u.useRef([]), on = u.useRef(null), [, ks] = u.useState(0), hs = u.useRef(null), [Kt, fr] = u.useState(null), un = u.useCallback((f, C = "success", A = "💾") => {
    hs.current && clearTimeout(hs.current), fr({ text: f, type: C, icon: A }), hs.current = setTimeout(() => {
      fr(null), hs.current = null;
    }, 2200);
  }, []), [Qt, _s] = u.useState(() => {
    var A, Q, K, _, ne, Te;
    const f = (K = (Q = (A = D == null ? void 0 : D.keyframes) == null ? void 0 : A[0]) == null ? void 0 : Q.layout) == null ? void 0 : K.width, C = (Te = (ne = (_ = D == null ? void 0 : D.keyframes) == null ? void 0 : _[0]) == null ? void 0 : ne.layout) == null ? void 0 : Te.height;
    if (f && C) {
      const de = ms.find((xe) => xe.w === f && xe.h === C);
      if (de) return de.id;
    }
    return "16:9";
  }), [tn, Lr] = u.useState(() => {
    try {
      const f = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (f !== null) return f === "true";
    } catch {
    }
    return !1;
  }), Ln = u.useCallback(() => {
    Lr((f) => {
      const C = !f;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(C));
      } catch {
      }
      return C;
    });
  }, []), ws = u.useMemo(() => ms.find((f) => f.id === Qt) || ms[0], [Qt]), Me = ws.w, Re = ws.h, fs = ws.ratio, vn = u.useMemo(() => {
    const f = [], C = Me >= 3e3 ? 200 : 100, A = C / 2, Q = C / 10;
    for (let K = 0; K <= Me; K += Q) {
      const _ = K % C === 0, ne = !_ && K % A === 0;
      f.push({ val: K, isMajor: _, isMed: ne });
    }
    return f;
  }, [Me]), Or = u.useMemo(() => {
    const f = [];
    for (let K = 0; K <= Re; K += 10) {
      const _ = K % 100 === 0, ne = !_ && K % 50 === 0;
      f.push({ val: K, isMajor: _, isMed: ne });
    }
    return f;
  }, [Re]), xo = u.useCallback((f) => {
    const C = Ze.current || Ke.current;
    if (!C) return;
    const A = C.getBoundingClientRect(), Q = Ut(Math.round((f.clientX - A.left) / A.width * Me), 0, Me), K = Ut(Math.round((f.clientY - A.top) / A.height * Re), 0, Re);
    mt({ x: Q, y: K, isInside: !0 });
  }, [Me, Re]), Wi = u.useCallback(() => {
    mt((f) => ({ ...f, isInside: !1 }));
  }, []), Fs = u.useCallback(() => {
    const f = ln.current;
    if (!f) return;
    const C = f.getBoundingClientRect(), A = Math.max(320, Math.floor(C.width || 960) - 16), Q = Math.max(180, Math.floor(C.height || 540) - 16);
    let K, _;
    tn ? (K = A, _ = Math.round(K / fs)) : A / Q >= fs ? (_ = Q, K = Math.round(_ * fs)) : (K = A, _ = Math.round(K / fs)), fn((ne) => ne.width === K && ne.height === _ ? ne : { width: K, height: _ });
  }, [tn, fs]);
  u.useEffect(() => {
    const f = ln.current;
    if (!f) return;
    Fs();
    let C = null;
    return typeof ResizeObserver < "u" && (C = new ResizeObserver(() => {
      Fs();
    }), C.observe(f)), window.addEventListener("resize", Fs), () => {
      C && C.disconnect(), window.removeEventListener("resize", Fs);
    };
  }, [Fs]);
  const pr = u.useMemo(() => (t && t.length > 0 ? t : n).map((C) => {
    const A = C.displays && C.displays.length > 0 ? C.displays : C.topology && C.topology.displays && C.topology.displays.length > 0 ? C.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: C.width || 1920, height: C.height || 1080 }], Q = A.find((de) => de.isPrimary) || A[0], K = Q.width || Q.Width || C.width || 1920, _ = Q.height || Q.Height || C.height || 1080, ne = K && _ ? K / _ : 16 / 9, Te = A.length > 1;
    return {
      stationId: C.id,
      displayId: "auto",
      label: `${C.displayName || C.roleAlias || C.hostname || C.name} - ${Te ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: C.displayName || C.roleAlias || C.hostname || C.name,
      stationHostname: C.hostname || C.id,
      isPrimary: !0,
      sourceWidth: K,
      sourceHeight: _,
      nativeAspectRatio: ne,
      aspectRatio: ne,
      width: K,
      height: _
    };
  }), [t, n]), Jt = u.useMemo(() => {
    const f = n && n.length > 0 ? n : t, C = [];
    return f.forEach((A) => {
      const Q = A.displays && A.displays.length > 0 ? A.displays : A.topology && A.topology.displays && A.topology.displays.length > 0 ? A.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: A.width || 1920, height: A.height || 1080 }], K = Q.find((de) => de.isPrimary) || Q[0], _ = K.width || K.Width || A.width || 1920, ne = K.height || K.Height || A.height || 1080, Te = _ / ne;
      C.push({
        stationId: A.id,
        displayId: "auto",
        label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${Q.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: A.displayName || A.roleAlias || A.hostname || A.name,
        stationHostname: A.hostname || A.id,
        isPrimary: !0,
        sourceWidth: _,
        sourceHeight: ne,
        nativeAspectRatio: Te,
        aspectRatio: Te,
        width: _,
        height: ne
      }), Q.length > 1 && Q.forEach((de, xe) => {
        const it = (de.displayId || `mon-${xe}`).toLowerCase(), tt = de.displayNumber || xe + 1, nt = de.displayName || `Screen ${tt}`, he = de.width || de.Width || A.width || 1920, rt = de.height || de.Height || A.height || 1080, Mt = he / rt;
        C.push({
          stationId: A.id,
          displayId: it,
          label: `${A.displayName || A.roleAlias || A.hostname || A.name} - ${nt}`,
          stationName: A.displayName || A.roleAlias || A.hostname || A.name,
          stationHostname: A.hostname || A.id,
          isPrimary: !!de.isPrimary,
          sourceWidth: he,
          sourceHeight: rt,
          nativeAspectRatio: Mt,
          aspectRatio: Mt,
          width: he,
          height: rt
        });
      });
    }), C;
  }, [n, t]), [nn, Zt] = u.useState(() => {
    var f;
    return ((f = D == null ? void 0 : D.keyframes) == null ? void 0 : f.length) > 0 ? JSON.parse(JSON.stringify(D)) : {
      id: "canvas-timeline-root",
      keyframes: [
        {
          id: "kf_root_0",
          timestampEpochMs: d,
          transitionDurationSec: 0.5,
          transitionType: "smooth",
          layout: {
            width: wc,
            height: jc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: Fr(pr, wc, jc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var f;
    ((f = D == null ? void 0 : D.keyframes) == null ? void 0 : f.length) > 0 && (Zt(JSON.parse(JSON.stringify(D))), D.keyframes.some((A) => {
      var Q, K;
      return ((K = (Q = A.layout) == null ? void 0 : Q.placements) == null ? void 0 : K.length) > 0;
    }) && (ct.current = !0, dt("custom")));
  }, [D]);
  const pn = nn.keyframes || [], vl = u.useMemo(() => Eg(pn, U), [pn, U]), $ = Ut(
    P ?? vl,
    0,
    Math.max(0, pn.length - 1)
  ), ee = pn[$] || pn[vl] || pn[0], B = u.useMemo(() => {
    var f;
    return ((f = ee == null ? void 0 : ee.layout) == null ? void 0 : f.placements) || [];
  }, [ee]), Le = u.useCallback((f = "Action") => ({
    label: f,
    timeline: JSON.parse(JSON.stringify(nn)),
    aspectId: Qt,
    presetId: bt,
    selectedFeedIndex: He
  }), [nn, Qt, bt, He]), $e = u.useCallback((f = "Action") => {
    const C = Le(f);
    Vt.current.push(C), Vt.current.length > 50 && Vt.current.shift(), yn.current = [], ks((A) => A + 1);
  }, [Le]), Ie = u.useCallback(() => {
    on.current && (Vt.current.push(on.current), Vt.current.length > 50 && Vt.current.shift(), yn.current = [], on.current = null, ks((f) => f + 1));
  }, []), Ve = u.useCallback(() => {
    const f = m > 0 ? m : d + N, C = 500;
    if (f <= d + C) return $;
    const A = (ee == null ? void 0 : ee.layout) || {
      width: Me,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      placements: B
    }, { nextTimeline: Q, newIndex: K, isNew: _ } = Fd(nn, f, A, C);
    return _ && (Zt(Q), E && E(Q), z && z(K), un(
      `Keyframe #${K + 1} created at ${yt(f, g, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), K;
  }, [m, d, N, $, ee, Me, Re, B, nn, E, z, g, un]), ae = u.useCallback((f, C = null) => {
    C && $e(C);
    const A = m > 0 ? m : d + N;
    Zt((Q) => {
      const { nextTimeline: K, newIndex: _, isNewKeyframe: ne } = bg({
        prevTimeline: Q,
        newPlacements: f,
        currentEpochMs: A,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Me,
        virtualH: Re,
        fps: 30
      });
      return E && E(K), z && z(_), ne && _ > 0 && un(
        `Keyframe #${_ + 1} created at ${yt(A, g, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), K;
    });
  }, [m, d, N, Me, Re, E, z, g, un, $e]);
  u.useEffect(() => {
    if (pr.length > 0 && (!B || B.length === 0) && !ct.current) {
      let f = Qt;
      pr.length === 2 && Qt === "16:9" && (f = "32:9", _s("32:9"));
      const C = ms.find((Q) => Q.id === f) || ms[0], A = Fr(pr, C.w, C.h);
      A.length > 0 && (ae(A), dt("auto-grid"));
    }
  }, [pr, B, ae, Qt]), u.useEffect(() => {
    F && F({
      width: Me,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      placements: B,
      timeline: nn
    });
  }, [B, nn, F, Me, Re]);
  const et = u.useCallback((f) => {
    const C = ws, A = ms.find((Q) => Q.id === f) || ms[0];
    if (C.id !== A.id)
      if (_s(A.id), ct.current) {
        const Q = A.w / C.w, K = A.h / C.h, _ = B.map((ne) => ({
          ...ne,
          x: Math.round(ne.x * Q),
          y: Math.round(ne.y * K),
          width: Math.round(ne.width * Q),
          height: Math.round(ne.height * K)
        }));
        ae(_);
      } else {
        const Q = Fr(B && B.length > 0 ? B : Jt, A.w, A.h);
        ae(Q);
      }
  }, [ws, B, Jt, ae]), st = u.useCallback((f) => {
    const C = B.length > 0 ? Math.max(...B.map((de) => de.zIndex || 0)) + 1 : 0, A = ht[B.length % ht.length], Q = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9), K = Q >= 1 ? 640 : Math.round(360 * Q), _ = Q >= 1 ? Math.round(640 / Q) : 360, ne = {
      stationId: f.stationId,
      displayId: f.displayId,
      label: f.label,
      x: 100 + B.length * 40 % 800,
      y: 80 + B.length * 40 % 500,
      width: K,
      height: _,
      sourceWidth: f.sourceWidth || 1920,
      sourceHeight: f.sourceHeight || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q,
      zIndex: C,
      rotation: 0,
      borderWidth: 2,
      borderColor: A,
      shadowEffect: "deep",
      borderRadius: 0
    }, Te = [...B, ne];
    ae(Te), vt(Te.length - 1);
  }, [B, ae]), xt = u.useCallback((f) => {
    const C = B.filter((A, Q) => Q !== f);
    ae(C), vt((A) => Math.max(0, A - 1));
  }, [B, ae]), At = u.useCallback(() => {
    ae([]), vt(-1);
  }, [ae]), Et = (f) => {
    const C = f.map((Q, K) => ({ p: Q, origIdx: K }));
    C.sort((Q, K) => (Q.p.zIndex ?? Q.origIdx) - (K.p.zIndex ?? K.origIdx));
    const A = [...f];
    return C.forEach(({ origIdx: Q }, K) => {
      A[Q] = { ...A[Q], zIndex: K + 1 };
    }), A;
  }, sn = u.useCallback((f = He) => {
    if (f < 0 || !B[f]) return;
    const C = Et(B), A = C[f].zIndex, Q = C.length;
    if (A >= Q) return;
    const K = C.map((_, ne) => ne === f ? { ..._, zIndex: Q } : _.zIndex > A ? { ..._, zIndex: _.zIndex - 1 } : _);
    ae(K);
  }, [He, B, ae]), js = u.useCallback((f = He) => {
    if (f < 0 || !B[f]) return;
    const C = Et(B), A = C[f].zIndex;
    if (A <= 1) return;
    const Q = C.map((K, _) => _ === f ? { ...K, zIndex: 1 } : K.zIndex < A ? { ...K, zIndex: K.zIndex + 1 } : K);
    ae(Q);
  }, [He, B, ae]), Yt = u.useCallback((f = He) => {
    if (f < 0 || !B[f]) return;
    const C = Et(B), A = C[f].zIndex, Q = A + 1;
    if (Q > C.length) return;
    const K = C.map((_, ne) => ne === f ? { ..._, zIndex: Q } : _.zIndex === Q ? { ..._, zIndex: A } : _);
    ae(K);
  }, [He, B, ae]), Sn = u.useCallback((f = He) => {
    if (f < 0 || !B[f]) return;
    const C = Et(B), A = C[f].zIndex, Q = A - 1;
    if (Q < 1) return;
    const K = C.map((_, ne) => ne === f ? { ..._, zIndex: Q } : _.zIndex === Q ? { ..._, zIndex: A } : _);
    ae(K);
  }, [He, B, ae]), On = u.useCallback((f) => {
    if (He < 0 || !B[He]) return;
    const C = B.map((A, Q) => Q === He ? { ...A, ...f } : A);
    ae(C);
  }, [He, B, ae]), zi = u.useCallback((f = 90) => {
    const C = B[He];
    if (!C) return;
    const Q = ((C.rotation || 0) + f) % 360;
    On({ rotation: Q });
  }, [He, B, On]), Nl = u.useCallback((f = He) => {
    if (f < 0 || !B[f]) return;
    const C = B.length, A = B.map((Q, K) => K === f ? {
      ...Q,
      x: 0,
      y: 0,
      width: Me,
      height: Re,
      zIndex: C
    } : Q);
    ae(A);
  }, [He, B, ae, Me, Re]), Qn = u.useCallback((f) => {
    let C = [];
    const A = Jt.length > 0 ? Jt : B;
    switch (f) {
      case "auto":
      case "auto-grid":
        C = Fr(A, Me, Re);
        break;
      case "1x1":
        A.length > 0 && (C = [{
          ...A[0],
          x: 0,
          y: 0,
          width: Me,
          height: Re,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: ht[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (A.length >= 2) {
          const Q = Math.round(Me / 2);
          C = A.slice(0, 2).map((K, _) => {
            const ne = K.nativeAspectRatio || (K.sourceWidth && K.sourceHeight ? K.sourceWidth / K.sourceHeight : 1.7777777777777777), { x: Te, y: de, width: xe, height: it } = Gs(_ * Q, 0, Q, Re, ne);
            return {
              ...K,
              x: Te,
              y: de,
              width: xe,
              height: it,
              sourceWidth: K.sourceWidth || 1920,
              sourceHeight: K.sourceHeight || 1080,
              nativeAspectRatio: ne,
              aspectRatio: ne,
              zIndex: _ + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: ht[_ % ht.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          C = Fr(A, Me, Re);
        break;
      case "2x2": {
        const Q = Math.round(Me / 2), K = Math.round(Re / 2);
        C = A.slice(0, 4).map((_, ne) => ({
          ..._,
          x: ne % 2 * Q,
          y: Math.floor(ne / 2) * K,
          width: Q,
          height: K,
          zIndex: ne,
          rotation: 0,
          borderWidth: 2,
          borderColor: ht[ne % ht.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (A.length >= 2) {
          C = [
            { ...A[0], x: 0, y: 0, width: Me, height: Re, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: ht[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Q = A.slice(1, 4), K = Math.round(Me * 0.23), _ = Math.round(K / (16 / 9));
          Q.forEach((ne, Te) => {
            C.push({
              ...ne,
              x: Me - K - 24,
              y: 24 + Te * (_ + 16),
              width: K,
              height: _,
              zIndex: 10 + Te,
              rotation: 0,
              borderWidth: 3,
              borderColor: ht[(Te + 1) % ht.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (A.length >= 3) {
          const Q = Math.round(Me * 0.666), K = Me - Q, _ = Math.round(Re / 2);
          C = [
            { ...A[0], x: 0, y: 0, width: Q, height: Re, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: ht[0], shadowEffect: "deep", borderRadius: 0 },
            { ...A[1], x: Q, y: 0, width: K, height: _, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: ht[1], shadowEffect: "deep", borderRadius: 0 },
            { ...A[2], x: Q, y: _, width: K, height: _, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: ht[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (A.length >= 3)
          if (Me / Re >= 2.5) {
            const K = Math.round(Me / 3);
            C = A.slice(0, 3).map((_, ne) => {
              const Te = _.nativeAspectRatio || (_.sourceWidth && _.sourceHeight ? _.sourceWidth / _.sourceHeight : 1.7777777777777777), { x: de, y: xe, width: it, height: tt } = Gs(ne * K, 0, K, Re, Te);
              return {
                ..._,
                x: de,
                y: xe,
                width: it,
                height: tt,
                sourceWidth: _.sourceWidth || 1920,
                sourceHeight: _.sourceHeight || 1080,
                nativeAspectRatio: Te,
                aspectRatio: Te,
                zIndex: ne,
                rotation: 0,
                borderWidth: 2,
                borderColor: ht[ne % ht.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const K = Math.round(Me / 2), _ = Math.round(Re / 2);
            C = [
              { ...A[0], x: 0, y: 0, width: K, height: _, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: ht[0], shadowEffect: "deep", borderRadius: 0 },
              { ...A[1], x: K, y: 0, width: K, height: _, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: ht[1], shadowEffect: "deep", borderRadius: 0 },
              { ...A[2], x: Math.round(K / 2), y: _, width: K, height: _, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: ht[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    C.length > 0 && (ae(C), vt(0), f === "auto" || f === "auto-grid" ? dt("auto-grid") : (dt(f), ct.current = !0));
  }, [Jt, B, ae, Me, Re]), vu = u.useCallback(() => {
    const f = ke.trim() || `Custom Layout ${be.length + 1}`, A = [{
      id: `preset-${Date.now()}`,
      name: f,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(B)),
      keyframes: JSON.parse(JSON.stringify(pn))
    }, ...be];
    Oe(A), Se(""), re(!1);
  }, [ke, be, B, pn]), Ep = u.useCallback((f) => {
    !f || !f.placements || (ae(f.placements), vt(0), dt("custom"), ct.current = !0, Be(!1));
  }, [ae]), Sp = u.useCallback((f, C) => {
    C == null || C.stopPropagation();
    const A = be.filter((Q) => Q.id !== f);
    Oe(A);
  }, [be]), bp = u.useCallback(() => {
    const f = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Me,
      height: Re,
      aspectRatio: Qt,
      placements: B,
      timeline: nn
    }, C = JSON.stringify(f, null, 2), A = new window.Blob([C], { type: "application/json" }), Q = window.URL.createObjectURL(A), K = document.createElement("a"), _ = /* @__PURE__ */ new Date(), ne = (de) => String(de).padStart(2, "0"), Te = `${_.getFullYear()}${ne(_.getMonth() + 1)}${ne(_.getDate())}_${ne(_.getHours())}${ne(_.getMinutes())}${ne(_.getSeconds())}`;
    K.href = Q, K.download = `canvas_layout_${Te}.json`, document.body.appendChild(K), K.click(), document.body.removeChild(K), window.URL.revokeObjectURL(Q);
  }, [B, nn, Me, Re, Qt]), Mp = u.useCallback((f) => {
    var Q;
    const C = (Q = f.target.files) == null ? void 0 : Q[0];
    if (!C) return;
    const A = new window.FileReader();
    A.onload = (K) => {
      var _, ne, Te;
      try {
        const de = JSON.parse(K.target.result);
        if (de.width && de.height) {
          const it = ms.find((tt) => tt.w === de.width && tt.h === de.height);
          it && _s(it.id);
        } else if (de.aspectRatio) {
          const it = ms.find((tt) => tt.id === de.aspectRatio);
          it && _s(it.id);
        }
        let xe = null;
        Array.isArray(de) ? xe = de : de.placements && Array.isArray(de.placements) ? xe = de.placements : (_ = de.layout) != null && _.placements && Array.isArray(de.layout.placements) && (xe = de.layout.placements), xe && xe.length > 0 && (ae(xe), vt(0), dt("custom"), ct.current = !0), ((Te = (ne = de.timeline) == null ? void 0 : ne.keyframes) == null ? void 0 : Te.length) > 0 && (Zt(de.timeline), E && E(de.timeline));
      } catch (de) {
        console.error("Failed to parse imported canvas JSON:", de), alert(`Canvas Import Error: ${de.message}`);
      }
    }, A.readAsText(C), f.target.value = "";
  }, [ae, E]), Hi = (f, C) => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), vt(C), ct.current = !0, dt("custom");
    const A = Ve(), Q = Ze.current || Ke.current;
    if (!Q) return;
    const K = Q.getBoundingClientRect(), _ = B[C];
    if (!_) return;
    on.current = Le("Move Feed"), Ge.current = {
      mode: "drag",
      index: C,
      startX: f.clientX,
      startY: f.clientY,
      initialX: _.x,
      initialY: _.y,
      initialW: _.width,
      initialH: _.height,
      scaleX: Me / K.width,
      scaleY: Re / K.height,
      activeSnapZone: null
    }, jt(!0);
    const ne = (de) => {
      if (!Ge.current || Ge.current.mode !== "drag") return;
      const xe = Ge.current, it = Ze.current || Ke.current;
      if (!it) return;
      const tt = it.getBoundingClientRect(), nt = (de.clientX - xe.startX) * xe.scaleX, he = (de.clientY - xe.startY) * xe.scaleY;
      let rt = Math.round(xe.initialX + nt), Mt = Math.round(xe.initialY + he);
      rt = Ut(rt, 0, Me - xe.initialW), Mt = Ut(Mt, 0, Re - xe.initialH);
      const lt = me && !de.altKey;
      let ut = null, bn = null, zn = null;
      if (lt) {
        const $t = de.clientX - tt.left, St = de.clientY - tt.top, It = 32, Ae = Math.round(Me / 2), at = Math.round(Re / 2);
        if ($t <= It ? St <= tt.height * 0.22 ? ut = { x: 0, y: 0, width: Ae, height: at, label: "◰ Top-Left Quarter" } : St >= tt.height * 0.78 ? ut = { x: 0, y: at, width: Ae, height: at, label: "◱ Bottom-Left Quarter" } : ut = { x: 0, y: 0, width: Ae, height: Re, label: "◧ Left Half (50%)" } : $t >= tt.width - It ? St <= tt.height * 0.22 ? ut = { x: Ae, y: 0, width: Ae, height: at, label: "◲ Top-Right Quarter" } : St >= tt.height * 0.78 ? ut = { x: Ae, y: at, width: Ae, height: at, label: "◳ Bottom-Right Quarter" } : ut = { x: Ae, y: 0, width: Ae, height: Re, label: "◨ Right Half (50%)" } : St <= It && $t >= tt.width * 0.25 && $t <= tt.width * 0.75 && (ut = { x: 0, y: 0, width: Me, height: Re, label: "🗖 Full Canvas Maximize" }), !ut) {
          const mr = B.filter((Qe, gr) => gr !== xe.index), Ws = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Me, targetX: Me - xe.initialW, guide: 100 },
            { snapTo: Ae, targetX: Ae - Math.round(xe.initialW / 2), guide: 50 }
          ];
          mr.forEach((Qe) => {
            Ws.push({ snapTo: Qe.x, targetX: Qe.x, guide: Qe.x / Me * 100 }), Ws.push({ snapTo: Qe.x + Qe.width, targetX: Qe.x + Qe.width - xe.initialW, guide: (Qe.x + Qe.width) / Me * 100 }), Ws.push({ snapTo: Qe.x + Qe.width, targetX: Qe.x + Qe.width, guide: (Qe.x + Qe.width) / Me * 100 }), Ws.push({ snapTo: Qe.x, targetX: Qe.x - xe.initialW, guide: Qe.x / Me * 100 });
          });
          let Cu = 18;
          Ws.forEach((Qe) => {
            const gr = Math.abs(rt - Qe.targetX);
            gr < Cu && (Cu = gr, rt = Qe.targetX, bn = Qe.guide);
          });
          const kl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Re, targetY: Re - xe.initialH, guide: 100 },
            { snapTo: at, targetY: at - Math.round(xe.initialH / 2), guide: 50 }
          ];
          mr.forEach((Qe) => {
            kl.push({ snapTo: Qe.y, targetY: Qe.y, guide: Qe.y / Re * 100 }), kl.push({ snapTo: Qe.y + Qe.height, targetY: Qe.y + Qe.height - xe.initialH, guide: (Qe.y + Qe.height) / Re * 100 }), kl.push({ snapTo: Qe.y + Qe.height, targetY: Qe.y + Qe.height, guide: (Qe.y + Qe.height) / Re * 100 }), kl.push({ snapTo: Qe.y, targetY: Qe.y - xe.initialH, guide: Qe.y / Re * 100 });
          });
          let Eu = 18;
          kl.forEach((Qe) => {
            const gr = Math.abs(Mt - Qe.targetY);
            gr < Eu && (Eu = gr, Mt = Qe.targetY, zn = Qe.guide);
          });
        }
      }
      xe.activeSnapZone = ut, xe.latestX = rt, xe.latestY = Mt, Xe(ut), pt({ vertical: bn, horizontal: zn }), Zt(($t) => {
        const St = [...$t.keyframes || []], It = A < St.length ? A : $;
        if (!St[It]) return $t;
        const Ae = [...St[It].layout.placements || []];
        return Ae[xe.index] ? (Ae[xe.index] = { ...Ae[xe.index], x: rt, y: Mt }, St[It] = {
          ...St[It],
          layout: { ...St[It].layout, placements: Ae }
        }, { ...$t, keyframes: St }) : $t;
      });
    }, Te = () => {
      var de;
      if (jt(!1), pt({ vertical: null, horizontal: null }), (de = Ge.current) != null && de.activeSnapZone) {
        const xe = Ge.current.activeSnapZone, it = Ge.current.index;
        Zt((tt) => {
          const nt = [...tt.keyframes || []], he = A < nt.length ? A : $;
          if (!nt[he]) return tt;
          const rt = [...nt[he].layout.placements || []];
          return rt[it] ? (rt[it] = {
            ...rt[it],
            x: xe.x,
            y: xe.y,
            width: xe.width,
            height: xe.height
          }, nt[he] = {
            ...nt[he],
            layout: { ...nt[he].layout, placements: rt }
          }, { ...tt, keyframes: nt }) : tt;
        });
      }
      if (Ge.current) {
        const xe = Ge.current, it = xe.initialX, tt = xe.initialY, nt = xe.activeSnapZone ? xe.activeSnapZone.x : xe.latestX ?? it, he = xe.activeSnapZone ? xe.activeSnapZone.y : xe.latestY ?? tt;
        nt !== it || he !== tt ? (Ie(), E && Zt((rt) => (E(rt), rt))) : on.current = null;
      }
      Xe(null), Ge.current = null, window.removeEventListener("mousemove", ne), window.removeEventListener("mouseup", Te);
    };
    window.addEventListener("mousemove", ne), window.addEventListener("mouseup", Te);
  }, yo = (f, C, A = "br") => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), vt(C), ct.current = !0, dt("custom");
    const Q = Ve();
    if (!Ke.current) return;
    const K = Ke.current.getBoundingClientRect(), _ = B[C];
    if (!_) return;
    on.current = Le("Resize Feed");
    const ne = Jt.find((nt) => nt.stationId === _.stationId && nt.displayId === _.displayId), Te = _.sourceWidth || (ne == null ? void 0 : ne.sourceWidth) || 1920, de = _.sourceHeight || (ne == null ? void 0 : ne.sourceHeight) || 1080, xe = _.nativeAspectRatio || _.aspectRatio || (ne == null ? void 0 : ne.nativeAspectRatio) || Te / de || _.width / _.height || 16 / 9;
    Ge.current = {
      mode: "resize",
      corner: A,
      index: C,
      startX: f.clientX,
      startY: f.clientY,
      initialX: _.x,
      initialY: _.y,
      initialW: _.width,
      initialH: _.height,
      sourceWidth: Te,
      sourceHeight: de,
      nativeAspectRatio: xe,
      scaleX: Me / K.width,
      scaleY: Re / K.height
    }, Ce(!0);
    const it = (nt) => {
      if (!Ge.current || Ge.current.mode !== "resize") return;
      const he = Ge.current, rt = (nt.clientX - he.startX) * he.scaleX, Mt = (nt.clientY - he.startY) * he.scaleY, lt = nt.ctrlKey || nt.shiftKey || nt.metaKey, ut = he.nativeAspectRatio > 0 ? he.nativeAspectRatio : he.initialW / he.initialH;
      let bn = he.initialX, zn = he.initialY, $t = he.initialW, St = he.initialH;
      if (he.corner === "br") {
        const It = Me - he.initialX, Ae = Re - he.initialY;
        if (lt) {
          let at = Math.max(160, Math.min(It, Math.round(he.initialW + rt))), ot = Math.round(at / ut);
          ot > Ae && (ot = Ae, at = Math.round(ot * ut)), ot < 90 && (ot = 90, at = Math.round(ot * ut)), $t = at, St = ot;
        } else
          $t = Ut(Math.round(he.initialW + rt), 160, It), St = Ut(Math.round(he.initialH + Mt), 90, Ae);
      } else if (he.corner === "bl") {
        const It = he.initialX + he.initialW, Ae = Re - he.initialY;
        if (lt) {
          let at = Math.max(160, Math.min(It, Math.round(he.initialW - rt))), ot = Math.round(at / ut);
          ot > Ae && (ot = Ae, at = Math.round(ot * ut)), ot < 90 && (ot = 90, at = Math.round(ot * ut)), $t = at, St = ot, bn = he.initialX + he.initialW - $t;
        } else
          $t = Ut(Math.round(he.initialW - rt), 160, It), St = Ut(Math.round(he.initialH + Mt), 90, Ae), bn = he.initialX + he.initialW - $t;
      } else if (he.corner === "tr") {
        const It = Me - he.initialX, Ae = he.initialY + he.initialH;
        if (lt) {
          let at = Math.max(160, Math.min(It, Math.round(he.initialW + rt))), ot = Math.round(at / ut);
          ot > Ae && (ot = Ae, at = Math.round(ot * ut)), ot < 90 && (ot = 90, at = Math.round(ot * ut)), $t = at, St = ot, zn = he.initialY + he.initialH - St;
        } else
          $t = Ut(Math.round(he.initialW + rt), 160, It), St = Ut(Math.round(he.initialH - Mt), 90, Ae), zn = he.initialY + he.initialH - St;
      } else if (he.corner === "tl") {
        const It = he.initialX + he.initialW, Ae = he.initialY + he.initialH;
        if (lt) {
          let at = Math.max(160, Math.min(It, Math.round(he.initialW - rt))), ot = Math.round(at / ut);
          ot > Ae && (ot = Ae, at = Math.round(ot * ut)), ot < 90 && (ot = 90, at = Math.round(ot * ut)), $t = at, St = ot, bn = he.initialX + he.initialW - $t, zn = he.initialY + he.initialH - St;
        } else
          $t = Ut(Math.round(he.initialW - rt), 160, It), St = Ut(Math.round(he.initialH - Mt), 90, Ae), bn = he.initialX + he.initialW - $t, zn = he.initialY + he.initialH - St;
      }
      Zt((It) => {
        const Ae = [...It.keyframes || []], at = Q < Ae.length ? Q : $;
        if (!Ae[at]) return It;
        const ot = [...Ae[at].layout.placements || []];
        return ot[he.index] ? (ot[he.index] = {
          ...ot[he.index],
          x: bn,
          y: zn,
          width: $t,
          height: St,
          sourceWidth: he.sourceWidth,
          sourceHeight: he.sourceHeight,
          nativeAspectRatio: he.nativeAspectRatio,
          aspectRatio: he.nativeAspectRatio
        }, Ae[at] = {
          ...Ae[at],
          layout: { ...Ae[at].layout, placements: ot }
        }, { ...It, keyframes: Ae }) : It;
      });
    }, tt = () => {
      if (Ge.current) {
        const nt = Ge.current, he = nt.latestW ?? nt.initialW, rt = nt.latestH ?? nt.initialH;
        he !== nt.initialW || rt !== nt.initialH ? (Ie(), E && Zt((Mt) => (E(Mt), Mt))) : on.current = null;
      }
      Ce(!1), Ge.current = null, window.removeEventListener("mousemove", it), window.removeEventListener("mouseup", tt);
    };
    window.addEventListener("mousemove", it), window.addEventListener("mouseup", tt);
  }, Ip = u.useCallback((f) => {
    const C = B[f];
    if (!C) return;
    const A = Jt.find((Te) => Te.stationId === C.stationId && Te.displayId === C.displayId), Q = C.nativeAspectRatio || C.aspectRatio || (A == null ? void 0 : A.nativeAspectRatio) || (C.sourceWidth && C.sourceHeight ? C.sourceWidth / C.sourceHeight : 16 / 9);
    let K = C.width, _ = Math.round(K / Q);
    C.y + _ > Re && (_ = Re - C.y, K = Math.round(_ * Q)), C.x + K > Me && (K = Me - C.x, _ = Math.round(K / Q));
    const ne = B.map((Te, de) => de === f ? {
      ...Te,
      width: Math.max(160, K),
      height: Math.max(90, _),
      sourceWidth: C.sourceWidth || (A == null ? void 0 : A.sourceWidth) || 1920,
      sourceHeight: C.sourceHeight || (A == null ? void 0 : A.sourceHeight) || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q
    } : Te);
    ae(ne, "Snap Native Aspect");
  }, [B, Jt, ae]), Vi = u.useCallback(() => {
    if (Vt.current.length === 0) return;
    const f = Le("Redo State");
    yn.current.push(f), yn.current.length > 50 && yn.current.shift();
    const C = Vt.current.pop();
    C && (Zt(C.timeline), E && E(C.timeline), C.aspectId && C.aspectId !== Qt && _s(C.aspectId), C.presetId && dt(C.presetId), C.selectedFeedIndex !== void 0 && vt(C.selectedFeedIndex), ct.current = !0, ks((A) => A + 1), un(`Undo: ${C.label || "Previous State"}`, "undo", "↺"));
  }, [Le, E, Qt, un]), Ki = u.useCallback(() => {
    if (yn.current.length === 0) return;
    const f = Le("Undo State");
    Vt.current.push(f), Vt.current.length > 50 && Vt.current.shift();
    const C = yn.current.pop();
    C && (Zt(C.timeline), E && E(C.timeline), C.aspectId && C.aspectId !== Qt && _s(C.aspectId), C.presetId && dt(C.presetId), C.selectedFeedIndex !== void 0 && vt(C.selectedFeedIndex), ct.current = !0, ks((A) => A + 1), un(`Redo: ${C.label || "Restored State"}`, "info", "↻"));
  }, [Le, E, Qt, un]), Nu = u.useCallback(() => {
    const C = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(B)),
      keyframes: JSON.parse(JSON.stringify(pn)),
      aspectId: Qt,
      width: Me,
      height: Re
    }, ...be.filter((A) => A.id !== "preset-quicksave")];
    Oe(C);
    try {
      fp({
        canvasLayoutTimeline: nn,
        selectedAspectId: Qt,
        selectedPresetId: bt,
        isFullWidth: tn
      });
    } catch (A) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", A);
    }
    un(`State Saved (${Me}×${Re} • ${B.length} Feeds)`, "success", "💾");
  }, [B, pn, Qt, Me, Re, be, Oe, nn, bt, tn, un]);
  u.useEffect(() => {
    const f = () => Vi(), C = () => Ki(), A = () => Nu();
    return window.addEventListener("itb:studio-undo", f), window.addEventListener("itb:studio-redo", C), window.addEventListener("itb:studio-save-now", A), () => {
      window.removeEventListener("itb:studio-undo", f), window.removeEventListener("itb:studio-redo", C), window.removeEventListener("itb:studio-save-now", A);
    };
  }, [Vi, Ki, Nu]);
  const Tp = u.useCallback(() => {
    Ye((f) => {
      const C = !f;
      if (C) {
        r && r(null);
        const A = qe.current;
        A && A.requestFullscreen && A.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return C;
    });
  }, [r]), Ap = u.useCallback(() => {
    const f = m > 0 ? m : d + N, { nextTimeline: C, newIndex: A, isNew: Q } = Fd(
      nn,
      f,
      (ee == null ? void 0 : ee.layout) || {
        width: Me,
        height: Re,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(B))
      }
    );
    Q ? ($e("Add Keyframe"), Zt(C), E && E(C), z && z(A), un(`Keyframe #${A + 1} created at ${yt(f, g, { includeSeconds: !0 })}`, "success", "💎")) : (z && z(A), un(`Jumped to existing Keyframe #${A + 1}`, "info", "💎"));
  }, [m, d, N, ee, B, Me, Re, nn, E, z, g, un, $e]);
  u.useCallback(() => {
    if (pn.length <= 1 || $ === 0) {
      un("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    $e("Delete Keyframe");
    const { nextTimeline: f, success: C, newIndex: A } = Mg(nn, $);
    C && (Zt(f), E && E(f), z && z(A), un("Keyframe deleted", "info", "🗑️"));
  }, [pn, $, nn, E, z, un, $e]), u.useCallback((f) => {
    $ !== 0 && ($e("Update Transition Type"), Zt((C) => {
      const A = kc(C, $, { transitionType: f });
      return E && E(A), A;
    }));
  }, [$, E, $e]), u.useCallback((f) => {
    $ !== 0 && ($e("Update Transition Duration"), Zt((C) => {
      const A = kc(C, $, { transitionDurationSec: f });
      return E && E(A), A;
    }));
  }, [$, E, $e]), u.useEffect(() => {
    const f = (C) => {
      if (!(C.target.tagName === "INPUT" || C.target.tagName === "TEXTAREA" || C.target.isContentEditable)) {
        if (C.key === "Delete" || C.key === "Backspace") {
          He >= 0 && B[He] && (C.preventDefault(), xt(He));
          return;
        }
        if ((C.code === "Space" || C.key === " ") && S) {
          C.preventDefault(), S((A) => !A);
          return;
        }
        if ((C.key === "k" || C.key === "K") && !C.ctrlKey && !C.metaKey && !C.altKey) {
          C.preventDefault(), Ap();
          return;
        }
        if (C.key === "Escape") {
          le(!1), Be(!1), Rt(!1), En(!1), Xt(!1), re(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(C.key)) {
          if (He >= 0 && B[He]) {
            C.preventDefault(), ct.current = !0, dt("custom");
            const A = C.shiftKey ? 1 : 10;
            let Q = 0, K = 0;
            C.key === "ArrowLeft" && (Q = -A), C.key === "ArrowRight" && (Q = A), C.key === "ArrowUp" && (K = -A), C.key === "ArrowDown" && (K = A);
            const _ = B[He], ne = Ut(_.x + Q, 0, Me - _.width), Te = Ut(_.y + K, 0, Re - _.height), de = B.map((xe, it) => it === He ? { ...xe, x: ne, y: Te } : xe);
            ae(de);
          }
          return;
        }
        if ((C.key === "r" || C.key === "R") && !C.ctrlKey && !C.metaKey && !C.altKey) {
          C.preventDefault(), X((A) => !A);
          return;
        }
        if ((C.key === "s" || C.key === "S") && !C.ctrlKey && !C.metaKey && !C.altKey) {
          C.preventDefault(), we((A) => !A);
          return;
        }
      }
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [He, B, xt, ae, X, we]);
  const ku = u.useMemo(() => Sg({
    keyframes: pn,
    currentEpochMs: U,
    currentPlacements: B,
    isEditing: Ee || ye
  }), [Ee, ye, pn, U, B]), Rp = u.useMemo(() => ku.map((f, C) => ({ ...f, originalIndex: C })).sort((f, C) => (f.zIndex ?? f.originalIndex) - (C.zIndex ?? C.originalIndex)), [ku]), Bs = B[He] || null, { filteredPlaced: Us, filteredUnplaced: vo } = u.useMemo(() => {
    const f = (te || "").toLowerCase(), C = B.map((_, ne) => {
      const Te = _.zIndex ?? ne + 1, de = Jt.find((xe) => xe.stationId === _.stationId && xe.displayId === _.displayId);
      return {
        type: "placed",
        origIdx: ne,
        placement: _,
        feed: de,
        stationId: _.stationId,
        displayId: _.displayId,
        label: _.label || (de == null ? void 0 : de.label) || `${_.stationId} (${_.displayId})`,
        layerRank: Te,
        isSelected: ne === He,
        sourceWidth: _.sourceWidth || (de == null ? void 0 : de.sourceWidth) || 1920,
        sourceHeight: _.sourceHeight || (de == null ? void 0 : de.sourceHeight) || 1080
      };
    });
    C.sort((_, ne) => ne.layerRank - _.layerRank);
    const A = Jt.filter((_) => !B.some((ne) => ne.stationId === _.stationId && ne.displayId === _.displayId)).map((_) => ({
      type: "unplaced",
      feed: _,
      stationId: _.stationId,
      displayId: _.displayId,
      label: _.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: _.sourceWidth || 1920,
      sourceHeight: _.sourceHeight || 1080
    })), Q = f ? C.filter((_) => _.label.toLowerCase().includes(f)) : C, K = f ? A.filter((_) => _.label.toLowerCase().includes(f)) : A;
    return { filteredPlaced: Q, filteredUnplaced: K };
  }, [B, Jt, He, te]), wu = u.useCallback((f, C) => {
    f.stopPropagation(), V(C), f.dataTransfer.effectAllowed = "copyMove", f.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: C.origIdx,
      type: C.type,
      stationId: C.stationId,
      displayId: C.displayId
    }));
  }, []), $p = u.useCallback((f, C) => {
    f.preventDefault(), f.stopPropagation(), f.dataTransfer.dropEffect = "move";
    const A = f.currentTarget.getBoundingClientRect(), Q = A.top + A.height / 2, K = f.clientY < Q ? "above" : "below";
    ce((_) => _.index === C && _.position === K ? _ : { index: C, position: K });
  }, []), Lp = u.useCallback((f, C) => {
    f.stopPropagation(), ce((A) => A.index === C ? { index: null, position: null } : A);
  }, []), ju = u.useCallback(() => {
    V(null), ce({ index: null, position: null });
  }, []), Op = u.useCallback((f, C) => {
    f.preventDefault(), f.stopPropagation();
    const A = Z;
    ce({ index: null, position: null }), V(null);
    const Q = f.dataTransfer.getData("text/plain");
    if (Q)
      try {
        const K = JSON.parse(Q);
        if (K.type === "placed") {
          const _ = K.origIdx, ne = Us.findIndex((nt) => nt.origIdx === _);
          if (ne === -1) return;
          let Te = C;
          if (A.position === "below" && (Te += 1), ne < Te && (Te -= 1), ne === Te) return;
          const de = [...Us], [xe] = de.splice(ne, 1);
          de.splice(Te, 0, xe);
          const it = de.length, tt = B.map((nt, he) => {
            const rt = de.findIndex((Mt) => Mt.origIdx === he);
            return rt !== -1 ? {
              ...nt,
              zIndex: it - rt
            } : nt;
          });
          ae(tt), vt(xe.origIdx);
        } else if (K.type === "unplaced") {
          const _ = Jt.find((ut) => ut.stationId === K.stationId && ut.displayId === K.displayId);
          if (!_) return;
          const ne = _.nativeAspectRatio || (_.sourceWidth && _.sourceHeight ? _.sourceWidth / _.sourceHeight : 16 / 9), Te = ne >= 1 ? 640 : Math.round(360 * ne), de = ne >= 1 ? Math.round(640 / ne) : 360, xe = ht[B.length % ht.length];
          let it = C;
          A.position === "below" && (it += 1);
          const tt = {
            stationId: _.stationId,
            displayId: _.displayId,
            label: _.label,
            x: 100 + B.length * 40 % 800,
            y: 80 + B.length * 40 % 500,
            width: Te,
            height: de,
            sourceWidth: _.sourceWidth || 1920,
            sourceHeight: _.sourceHeight || 1080,
            nativeAspectRatio: ne,
            aspectRatio: ne,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: xe,
            shadowEffect: "deep",
            borderRadius: 0
          }, nt = [...B, tt], he = nt.length - 1, rt = [...Us];
          rt.splice(it, 0, { origIdx: he });
          const Mt = rt.length, lt = nt.map((ut, bn) => {
            const zn = rt.findIndex(($t) => $t.origIdx === bn);
            return {
              ...ut,
              zIndex: zn !== -1 ? Mt - zn : 1
            };
          });
          ae(lt), vt(he);
        }
      } catch (K) {
        console.warn("Failed to handle layer drag drop:", K);
      }
  }, [Z, Us, B, Jt, ae]), Dp = u.useCallback((f) => {
    f.preventDefault();
    const C = f.dataTransfer.getData("text/plain");
    if (!(!C || !Ke.current))
      try {
        const A = JSON.parse(C), Q = Ke.current.getBoundingClientRect(), K = f.clientX - Q.left, _ = f.clientY - Q.top, ne = Ut(Math.round(K / Q.width * Me), 0, Me - 320), Te = Ut(Math.round(_ / Q.height * Re), 0, Re - 180);
        if (A.type === "unplaced") {
          const de = Jt.find((xe) => xe.stationId === A.stationId && xe.displayId === A.displayId);
          if (de) {
            const xe = de.nativeAspectRatio || (de.sourceWidth && de.sourceHeight ? de.sourceWidth / de.sourceHeight : 1.7777777777777777), it = xe >= 1 ? 640 : Math.round(360 * xe), tt = xe >= 1 ? Math.round(640 / xe) : 360, nt = B.length > 0 ? Math.max(...B.map((lt) => lt.zIndex || 0)) + 1 : 1, he = ht[B.length % ht.length], rt = {
              stationId: de.stationId,
              displayId: de.displayId,
              label: de.label,
              x: Ut(ne, 0, Me - it),
              y: Ut(Te, 0, Re - tt),
              width: it,
              height: tt,
              sourceWidth: de.sourceWidth || 1920,
              sourceHeight: de.sourceHeight || 1080,
              nativeAspectRatio: xe,
              aspectRatio: xe,
              zIndex: nt,
              rotation: 0,
              borderWidth: 2,
              borderColor: he,
              shadowEffect: "deep",
              borderRadius: 0
            }, Mt = [...B, rt];
            ae(Mt), vt(Mt.length - 1);
          }
        } else if (A.type === "placed" && A.origIdx !== void 0) {
          const de = B.map((xe, it) => it === A.origIdx ? {
            ...xe,
            x: Ut(ne, 0, Me - xe.width),
            y: Ut(Te, 0, Re - xe.height)
          } : xe);
          ae(de), vt(A.origIdx);
        }
      } catch (A) {
        console.warn("Canvas drop failed:", A);
      }
  }, [Jt, B, ae, Me, Re]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: qe,
      className: `multicam-viewport-root canvas-grid ${je ? "fullscreen-grid-active" : ""}`,
      children: [
        (Ee || ye) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: Ee ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        Kt && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Kt.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Kt.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Kt.text })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "canvas-editing-arena", children: [
          /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-wing-tool ${oe ? "active" : ""}`,
                onClick: () => le((f) => !f),
                title: `Feeds & Layers Palette (${B.length}/${Jt.length} on canvas)`,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: B.length }),
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
                  className: `btn-wing-tool ${Y ? "active" : ""}`,
                  onClick: () => {
                    G((f) => !f), fe(!1);
                  },
                  title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                  ]
                }
              ),
              Y && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${bt === "auto-grid" ? "active" : ""}`,
                    onClick: () => {
                      dt("auto-grid"), Qn("auto-grid"), G(!1);
                    },
                    children: [
                      /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                      /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: Jt.length })
                    ]
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${bt === "1x1" ? "active" : ""}`,
                    onClick: () => {
                      dt("1x1"), Qn("1x1"), G(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${bt === "1x2" ? "active" : ""}`,
                    onClick: () => {
                      dt("1x2"), Qn("1x2"), G(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${bt === "2x2" ? "active" : ""}`,
                    onClick: () => {
                      dt("2x2"), Qn("2x2"), G(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${bt === "1+3-pip" ? "active" : ""}`,
                    onClick: () => {
                      dt("1+3-pip"), Qn("1+3-pip"), G(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${bt === "hero-stacked" ? "active" : ""}`,
                    onClick: () => {
                      dt("hero-stacked"), Qn("hero-stacked"), G(!1);
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
                  className: `btn-wing-tool ${ue ? "active" : ""}`,
                  onClick: () => {
                    fe((f) => !f), G(!1);
                  },
                  title: `Aspect Ratio: ${Qt} (Click to change)`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Qt })
                  ]
                }
              ),
              ue && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                ms.map((f) => /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Qt === f.id ? "active" : ""}`,
                    onClick: () => {
                      et(f.id), fe(!1);
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
                onClick: Ln,
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
                className: `btn-wing-tool ${me ? "active" : ""}`,
                onClick: () => we((f) => !f),
                title: me ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                className: `btn-wing-tool ${Ct ? "active" : ""}`,
                onClick: () => X((f) => !f),
                title: Ct ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                onClick: Vi,
                disabled: Vt.current.length === 0,
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
                onClick: Ki,
                disabled: yn.current.length === 0,
                title: "Redo (Ctrl+Y)",
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↻" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "REDO" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { ref: ln, className: `canvas-stage-wrapper ${tn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
            oe && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                  /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                  /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                    B.length,
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
                  value: te,
                  onChange: (f) => Pe(f.target.value)
                }
              ) }),
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                Us.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                    /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Us.length })
                  ] }),
                  Us.map((f, C) => {
                    const A = Fe && Fe.type === "placed" && Fe.origIdx === f.origIdx, K = Z.index === C ? Z.position === "above" ? "drop-above" : "drop-below" : "";
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `feed-layer-row ${f.isSelected ? "is-selected" : ""} ${A ? "is-dragging-row" : ""} ${K}`,
                        draggable: !0,
                        onDragStart: (_) => wu(_, f),
                        onDragOver: (_) => $p(_, C),
                        onDragLeave: (_) => Lp(_, C),
                        onDrop: (_) => Op(_, C),
                        onDragEnd: ju,
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
                                onClick: () => Yt(f.origIdx),
                                title: "Bring Forward (Layer +1)",
                                children: "⬆️"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => Sn(f.origIdx),
                                title: "Send Backward (Layer -1)",
                                children: "⬇️"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-remove-row",
                                onClick: () => xt(f.origIdx),
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
                vo.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                    /* @__PURE__ */ s.jsx("span", { className: "section-count", children: vo.length })
                  ] }),
                  vo.map((f) => {
                    const C = Fe && Fe.type === "unplaced" && Fe.stationId === f.stationId && Fe.displayId === f.displayId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `feed-layer-row unplaced ${C ? "is-dragging-row" : ""}`,
                        draggable: !0,
                        onDragStart: (A) => wu(A, f),
                        onDragEnd: ju,
                        onClick: () => st(f.feed),
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
                          /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (A) => A.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-add-row",
                              onClick: () => st(f.feed),
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
                Us.length === 0 && vo.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Qn("auto"), children: "⊞ ADD ALL FEEDS" }),
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: At, children: "🗑️ CLEAR CANVAS" })
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                ref: (f) => {
                  Ke.current = f, Ze.current = f;
                },
                className: `canvas-master-frame-16-9 ${tn ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: Lt.width > 180 ? `${Lt.width}px` : "100%",
                  height: Lt.height > 100 ? `${Lt.height}px` : "auto",
                  aspectRatio: `${Me} / ${Re}`
                },
                onMouseMove: xo,
                onMouseLeave: Wi,
                onDragOver: (f) => {
                  f.preventDefault(), f.dataTransfer.dropEffect = "copy";
                },
                onDrop: Dp,
                onClick: () => gt(!1),
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                  _e && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-ghost-preview",
                      style: {
                        position: "absolute",
                        left: `${_e.x / Me * 100}%`,
                        top: `${_e.y / Re * 100}%`,
                        width: `${_e.width / Me * 100}%`,
                        height: `${_e.height / Re * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: _e.label })
                      ] })
                    }
                  ),
                  Ct && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Me}×${Re}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Je.isInside ? `${Je.x},${Je.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${Me} 20`,
                        preserveAspectRatio: "none",
                        children: [
                          Bs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: Bs.x,
                              y: "0",
                              width: Bs.width,
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
                        viewBox: `0 0 20 ${Re}`,
                        preserveAspectRatio: "none",
                        children: [
                          Bs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: "0",
                              y: Bs.y,
                              width: "20",
                              height: Bs.height,
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          Or.map((f) => f.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
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
                  We.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${We.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  We.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${We.horizontal}%`,
                        height: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  B.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                    /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                    /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                    /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => le(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Qn("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Rp.map((f) => {
                    var It;
                    const C = f.originalIndex, A = He === C, Q = Ee && He === C, K = ye && He === C, _ = (n.length > 0 ? n : t).find(
                      (Ae) => {
                        var at, ot, mr, Ws;
                        return Ae.id === f.stationId || ((at = Ae.hostname) == null ? void 0 : at.toLowerCase()) === ((ot = f.stationId) == null ? void 0 : ot.toLowerCase()) || ((mr = Ae.id) == null ? void 0 : mr.toLowerCase()) === ((Ws = f.stationId) == null ? void 0 : Ws.toLowerCase());
                      }
                    ), ne = Jt.find((Ae) => Ae.stationId === f.stationId && Ae.displayId === f.displayId), Te = _ || {
                      id: f.stationId,
                      hostname: (ne == null ? void 0 : ne.stationHostname) || f.stationHostname || f.stationId,
                      displayName: (ne == null ? void 0 : ne.stationName) || f.label || f.stationId,
                      displays: ne ? [{ displayId: ne.displayId, width: ne.sourceWidth, height: ne.sourceHeight }] : []
                    }, de = (Te == null ? void 0 : Te.displays) || ((It = Te == null ? void 0 : Te.topology) == null ? void 0 : It.displays) || [], xe = B.filter(
                      (Ae) => Ae.stationId === f.stationId || Te && (Ae.stationId === Te.id || Ae.stationId === Te.hostname)
                    ), it = de.length > 1 && xe.length >= de.length, tt = f.borderColor || ht[C % ht.length], nt = f.borderWidth !== void 0 ? f.borderWidth : 2, he = f.rotation || 0, rt = f.shadowEffect || "deep", Mt = f.borderRadius || 0, lt = f.x / Me * 100, ut = f.y / Re * 100, bn = f.width / Me * 100, zn = f.height / Re * 100, $t = Ag(rt, A, tt);
                    f.y < 50, f.x < 100, f.x + f.width > Me - 100;
                    const St = f.zIndex !== void 0 ? f.zIndex : C + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${A ? "is-selected" : ""} ${Q ? "is-dragging" : ""} ${K ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${lt}%`,
                          top: `${ut}%`,
                          width: `${bn}%`,
                          height: `${zn}%`,
                          zIndex: St * 10 + (Q ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${nt}px solid ${tt}`,
                          borderRadius: `${Mt}px`,
                          boxShadow: $t,
                          opacity: f.opacity !== void 0 ? f.opacity : 1,
                          pointerEvents: f.opacity !== void 0 && f.opacity < 0.1 ? "none" : "auto",
                          cursor: Q ? "grabbing" : "grab",
                          transition: Q || K ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (Ae) => Hi(Ae, C),
                        onContextMenu: (Ae) => {
                          Ae.preventDefault(), Ae.stopPropagation(), vt(C), gt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (Ae) => Hi(Ae, C),
                              onDoubleClick: () => Nl(C),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: f.label || `${Te.displayName || f.stationId} (${f.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(f.width),
                                  "×",
                                  Math.round(f.height),
                                  " (",
                                  xr(f.width, f.height),
                                  ") @ (",
                                  Math.round(f.x),
                                  ",",
                                  Math.round(f.y),
                                  ")",
                                  he !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    he,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${St}`, children: [
                                  "#$",
                                  St
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-badge-action-inspector ${A && Cn ? "active" : ""}`,
                                    onClick: (Ae) => {
                                      Ae.stopPropagation(), vt(C), gt((at) => !at || He !== C);
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
                                  transform: he ? `rotate(${he}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: Q ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  jg,
                                  {
                                    station: Te,
                                    isSolo: !1,
                                    currentEpochMs: U,
                                    timeMode: g,
                                    isPlaying: k,
                                    setIsPlaying: S,
                                    baseEpochMs: d,
                                    totalDurationMs: b,
                                    outPointMs: y,
                                    setPlayheadMs: p,
                                    globalGaps: h,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: M,
                                    playbackSpeed: T,
                                    activeAudioStationId: ge,
                                    onSoloAudio: ie,
                                    directorPlan: w || (Te == null ? void 0 : Te.directorPlan),
                                    isAutoDirectorEnabled: a ? a[Te.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: i,
                                    targetDisplayId: f.displayId,
                                    onSelectDisplayId: (Ae) => {
                                      const at = B.map((ot, mr) => mr === C ? { ...ot, displayId: Ae } : ot);
                                      ae(at);
                                    },
                                    areAllDisplaysPlaced: it,
                                    slotIndex: C,
                                    borderColor: tt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (Ae) => Hi(Ae, C),
                                onDoubleClick: () => Nl(C),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          A && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (Ae) => yo(Ae, C, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${xr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (Ae) => yo(Ae, C, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${xr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (Ae) => yo(Ae, C, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${xr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (Ae) => yo(Ae, C, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${xr(f.sourceWidth, f.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${f.stationId}-${f.displayId}-${C}`
                    );
                  }),
                  !q && Cn && He !== null && Bs && (() => {
                    const f = Bs, C = He, A = f.borderColor || ht[C % ht.length], Q = f.borderWidth !== void 0 ? f.borderWidth : 2, K = f.rotation || 0, _ = f.shadowEffect || "deep", ne = f.zIndex !== void 0 ? f.zIndex : C + 1, Te = f.x / Me * 100, de = f.width / Me * 100, xe = Te + de / 2;
                    let it = `${xe}%`, tt = "translateX(-50%)";
                    xe < 28 ? (it = `${Math.max(1, Te)}%`, tt = "none") : xe > 72 && (it = `${Math.min(99, Te + de)}%`, tt = "translateX(-100%)");
                    const nt = f.y + f.height + 8;
                    let he;
                    nt + 45 > Re ? he = `${Math.max(20, (f.y + f.height - 44) / Re * 100)}%` : he = `${nt / Re * 100}%`;
                    const rt = (n.length > 0 ? n : t).find(
                      (lt) => {
                        var ut, bn;
                        return lt.id === f.stationId || ((ut = lt.hostname) == null ? void 0 : ut.toLowerCase()) === ((bn = f.stationId) == null ? void 0 : bn.toLowerCase());
                      }
                    ), Mt = rt ? rt.id : f.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector",
                        style: {
                          position: "absolute",
                          left: it,
                          top: he,
                          transform: tt,
                          zIndex: 99999
                        },
                        onMouseDown: (lt) => lt.stopPropagation(),
                        onClick: (lt) => lt.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen Controls: ${f.label || Mt} • Layer #${ne}`, children: [
                            "🎛️ #",
                            ne
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: "btn-color-swatch-trigger",
                                onClick: () => Xt((lt) => !lt),
                                title: "🎨 Border Color: Click to choose accent frame color",
                                children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "control-icon", children: "🎨" }),
                                  /* @__PURE__ */ s.jsx(
                                    "span",
                                    {
                                      className: "swatch-circle",
                                      style: { backgroundColor: A === "transparent" ? "#1E293B" : A }
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx("span", { className: "caret", children: "▾" })
                                ]
                              }
                            ),
                            Bt && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Ig.map((lt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${A === lt ? "is-active" : ""}`,
                                style: { backgroundColor: lt === "transparent" ? "#1E293B" : lt },
                                onClick: () => {
                                  On({ borderColor: lt }), Xt(!1);
                                },
                                title: lt === "transparent" ? "No Border (Transparent)" : `Set Border Color to ${lt}`
                              },
                              lt
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group width-select-group", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "control-icon", title: "Border Stroke Width", children: "📏" }),
                            /* @__PURE__ */ s.jsxs(
                              "select",
                              {
                                className: "tactical-select width-select",
                                value: Q,
                                onChange: (lt) => On({ borderWidth: Number(lt.target.value) }),
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
                                onChange: (lt) => On({ shadowEffect: lt.target.value }),
                                title: "Drop Shadow & Glow: Add visual depth or tactical glow to this window",
                                children: Tg.map((lt) => /* @__PURE__ */ s.jsx("option", { value: lt.id, children: lt.label }, lt.id))
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
                                onChange: (lt) => {
                                  const ut = lt.target.value;
                                  ut === "front" ? sn(C) : ut === "back" ? js(C) : ut === "up" ? Yt(C) : ut === "down" && Sn(C);
                                },
                                title: `Layer Stacking Order: Currently Layer #${ne}. Choose to bring in front or send behind.`,
                                children: [
                                  /* @__PURE__ */ s.jsxs("option", { value: "", disabled: !0, children: [
                                    "L#",
                                    ne,
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
                                onClick: () => zi(90),
                                title: "Rotate: Step 90 degrees clockwise (↺)",
                                children: "↺ 90°"
                              }
                            ),
                            /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-action-tool ${Nt ? "active" : ""}`,
                                onClick: () => En((lt) => !lt),
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
                                onChange: (lt) => On({ rotation: Number(lt.target.value) }),
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
                              onClick: () => Ip(C),
                              title: `Native Recorded Aspect Ratio: Snap window to its exact recorded aspect (${xr(f.sourceWidth, f.sourceHeight)}) to remove any distortion`,
                              children: [
                                "📐 NATIVE (",
                                xr(f.sourceWidth, f.sourceHeight),
                                ")"
                              ]
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool highlight",
                              onClick: () => Nl(C),
                              title: "1x1 Focus Viewport: Maximize this window to fill 100% of the canvas frame (Double-clicking the card also maximizes)",
                              children: "⊞ 1x1 FOCUS"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool",
                              onClick: () => l && l(Mt, f.displayId),
                              title: "Deep Forensic Spotlight: Open multi-angle synchronized forensic viewer for this workstation",
                              children: "🔍 SPOTLIGHT"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool btn-del-feed",
                              onClick: () => xt(C),
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
            )
          ] }),
          /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-wing-tool highlight-emerald",
                onClick: () => re(!0),
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
                  className: `btn-wing-tool ${Ne ? "active" : ""}`,
                  onClick: () => Be((f) => !f),
                  title: `Saved Presets Library (${be.length})`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: be.length }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                  ]
                }
              ),
              Ne && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Be(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: be.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : be.map((f) => {
                  var C;
                  return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                    Ep(f), Be(!1);
                  }, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: f.name }),
                      /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                        ((C = f.placements) == null ? void 0 : C.length) || 0,
                        " screens • ",
                        f.dateStr
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-del-preset",
                        onClick: (A) => Sp(f.id, A),
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
                onClick: bp,
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
                  return (f = ve.current) == null ? void 0 : f.click();
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
                ref: ve,
                type: "file",
                accept: ".json",
                style: { display: "none" },
                onChange: Mp
              }
            ),
            /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-wing-tool highlight-rose",
                onClick: () => {
                  ct.current = !1, dt("auto-grid");
                  const f = Fr(Jt, Me, Re), C = {
                    id: "canvas-timeline-root",
                    keyframes: [
                      {
                        id: "kf_root_0",
                        timestampEpochMs: d,
                        transitionDurationSec: 0.5,
                        transitionType: "smooth",
                        layout: {
                          width: Me,
                          height: Re,
                          backgroundColor: "#070A10",
                          fps: 30,
                          placements: f
                        }
                      }
                    ]
                  };
                  Zt(C), E && E(C), vt(0);
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
                onClick: At,
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
                onClick: Tp,
                title: "Fullscreen Canvas Grid (F)",
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: je ? "⤓" : "⛶" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: je ? "EXIT" : "FULL" })
                ]
              }
            )
          ] })
        ] }),
        " ",
        J && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => re(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (f) => f.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => re(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: ke,
                onChange: (f) => Se(f.target.value),
                autoFocus: !0,
                onKeyDown: (f) => {
                  f.key === "Enter" && vu();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              B.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => re(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: vu, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const wa = [0.5, 1, 1.25, 1.5, 2, 4];
function mp({
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
  onStepFrameForward: N,
  onStepFrameBackward: m,
  playbackSpeed: g = 1,
  onChangeSpeed: k,
  onSetInPoint: S,
  onSetOutPoint: b
}) {
  const [L, y] = u.useState(() => il()), { volume: p, isMuted: h } = L, M = !!e;
  u.useEffect(() => {
    const F = (D) => {
      D.detail && y(D.detail);
    };
    return window.addEventListener("itb-audio-state-changed", F), () => window.removeEventListener("itb-audio-state-changed", F);
  }, []);
  const T = u.useCallback((F, D, E) => {
    const P = {
      volume: typeof F == "number" ? F : p,
      isMuted: typeof D == "boolean" ? D : h,
      channelMode: E || L.channelMode || "both"
    };
    y(P), yg(P);
  }, [p, h, L.channelMode]), j = (F) => {
    F == null || F.stopPropagation(), M && n(!t);
  }, v = (F) => {
    if (F == null || F.stopPropagation(), !M || !k) return;
    const D = wa.indexOf(g), E = D === -1 ? 1 : (D + 1) % wa.length;
    k(wa[E]);
  }, x = (F) => {
    F == null || F.stopPropagation(), h ? T(p === 0 ? 0.5 : p, !1) : T(p, !0);
  }, w = (F) => {
    F.stopPropagation();
    const D = parseFloat(F.target.value);
    D === 0 ? T(0, !0) : T(D, !1);
  }, I = (F) => {
    const D = u.useRef(null), E = u.useRef(null), P = u.useRef(0), z = u.useCallback(() => {
      D.current && clearTimeout(D.current), E.current && clearInterval(E.current), D.current = null, E.current = null;
    }, []), q = u.useCallback((ge = 1) => {
      if (n && n(!1), i) {
        const ie = 33 * ge;
        i((oe) => {
          const le = F === "forward" ? oe + ie : oe - ie;
          return Math.max(0, Math.min(d, le));
        });
      } else F === "forward" && N ? N() : F === "backward" && m && m();
    }, [F]), U = u.useCallback((ge) => {
      ge.preventDefault(), ge.stopPropagation(), M && (z(), q(1), P.current = performance.now(), D.current = setTimeout(() => {
        E.current = setInterval(() => {
          const ie = performance.now() - P.current, oe = ie > 2500 ? 4 : ie > 1e3 ? 2 : 1;
          q(oe);
        }, 50);
      }, 280));
    }, [q, z]);
    return u.useEffect(() => z, [z]), {
      onMouseDown: U,
      onMouseUp: z,
      onMouseLeave: z,
      onTouchStart: U,
      onTouchEnd: z
    };
  }, O = I("backward"), H = I("forward"), R = (F) => {
    F.stopPropagation(), M && (n && n(!1), i && i(a));
  }, W = (F) => {
    F.stopPropagation(), M && (n && n(!1), i && i(c));
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
      title: M ? "" : "Select a station card above to enable timeline playback",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !M,
            onClick: v,
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
            disabled: !S,
            onClick: (F) => {
              F.stopPropagation(), S == null || S();
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
              disabled: !M,
              onClick: R,
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
              ...O,
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
              ...H,
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
              onClick: W,
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
            onClick: (F) => {
              F.stopPropagation(), b == null || b();
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
              onClick: x,
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
              onChange: w,
              className: "volume-slider"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-audio-mode-toggle",
              onClick: () => {
                const F = ["both", "mic", "sys", "stereo"], D = L.channelMode || "both", E = F[(F.indexOf(D) + 1) % F.length];
                T(p, h, E);
              },
              title: `Discrete Audio Channel: ${(L.channelMode || "both").toUpperCase()} (Click to cycle Both / Mic / System / Stereo)`,
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
              children: (L.channelMode || "both") === "mic" ? "🎤 MIC" : (L.channelMode || "both") === "sys" ? "🔊 SYS" : (L.channelMode || "both") === "stereo" ? "⮂ STEREO" : "🎧 BOTH"
            }
          )
        ] })
      ]
    }
  );
}
const Zo = 2500, $g = {
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
function Lg(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return $g[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function gp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Lg), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function xp(e, t = " + ") {
  return gp(e).join(t);
}
function Tl(e) {
  return xp(e, "+");
}
const Og = 8;
function Dg({
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
  const [d, N] = u.useState([]), [m, g] = u.useState(!1), k = t || e;
  u.useEffect(() => {
    if (n && Array.isArray(n) && n.length > 0)
      return;
    if (!k || !r || i <= 0) {
      N([]);
      return;
    }
    const h = new AbortController(), M = Math.max(0, r + o - Zo), T = r + o + i + Zo;
    g(!0);
    const j = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(k)}&startEpoch=${M}&endEpoch=${T}`;
    return fetch(j, { signal: h.signal }).then((v) => v.ok ? v.json() : []).then((v) => {
      N(Array.isArray(v) ? v : []), g(!1);
    }).catch((v) => {
      v.name !== "AbortError" && (N([]), g(!1));
    }), () => h.abort();
  }, [k, r, o, i, n]);
  const S = n && Array.isArray(n) && n.length > 0 ? n : d, b = u.useMemo(() => {
    if (!S.length || i <= 0 || a <= 0)
      return [];
    const h = r + o, M = h + i, T = [...S].sort((w, I) => w.epochMs - I.epochMs), j = [];
    let v = null, x = -999;
    for (const w of T) {
      const I = w.epochMs + Zo;
      if (I < h || I > M)
        continue;
      const O = I - r, H = (O - o) / i * a;
      if (v && H - x < Og)
        v.events.push(w), v.endOffsetMs = O, v.endEpochMs = I, x = H;
      else {
        const R = (O - o) / i * 100;
        v = {
          id: `kc_${w.epochMs}_${j.length}`,
          startOffsetMs: O,
          endOffsetMs: O,
          startEpochMs: I,
          endEpochMs: I,
          pct: R,
          events: [w]
        }, j.push(v), x = H;
      }
    }
    return j;
  }, [S, r, o, i, a]);
  function L(h) {
    if (!h.events.length) return "";
    if (h.events.length === 1)
      return Tl(h.events[0].keyCombination);
    const M = h.events.find((v) => v.keyCombination.includes("+"));
    if (M) {
      const v = Tl(M.keyCombination);
      return h.events.length > 1 ? `${v} (+${h.events.length - 1})` : v;
    }
    const T = Tl(h.events[0].keyCombination);
    return h.events.every((v) => Tl(v.keyCombination) === T) ? `${T} ×${h.events.length}` : `${T} (+${h.events.length - 1})`;
  }
  function y(h, M = "LOCAL") {
    return yt(h, M);
  }
  function p(h) {
    const M = [];
    for (const T of h) {
      const j = Tl(T.keyCombination);
      M.length && M[M.length - 1].key === j ? M[M.length - 1].count++ : M.push({ key: j, count: 1 });
    }
    return M;
  }
  return b.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: b.map((h) => {
    const M = h.events.length, T = M > 1, j = L(h), v = y(h.startEpochMs, l), x = p(h.events), w = h.pct < 10 ? "edge-left" : h.pct > 90 ? "edge-right" : "";
    return /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${T ? "is-cluster" : "is-single"}`,
        style: { left: `${h.pct}%` },
        onClick: (I) => {
          I.stopPropagation(), c && c(h.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${j} at ${v}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            T && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: M > 9 ? "9+" : M })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${w}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: T ? `KEYSTROKE BURST (${M})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: v })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
              x.slice(0, 8).map((I, O) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                I.key,
                I.count > 1 ? ` ×${I.count}` : ""
              ] }, O)),
              x.length > 8 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                "+",
                x.length - 8,
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
const Pg = u.memo(Dg), ja = [
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
], _g = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function Fg({
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
  earliestMediaMs: N = null,
  movieBoundaries: m = null,
  stationHostname: g = "",
  activeStationName: k = "",
  showKeystrokes: S = !0,
  keystrokes: b = []
}) {
  const L = u.useRef(null), [y, p] = u.useState(1e3);
  u.useEffect(() => {
    if (!L.current) return;
    const U = new ResizeObserver((ge) => {
      for (let ie of ge)
        ie.contentRect.width > 50 && p(ie.contentRect.width);
    });
    return U.observe(L.current), () => U.disconnect();
  }, []);
  const h = u.useCallback((U) => !r || r <= 0 ? "0%" : `${(U - n) / r * 100}%`, [r, n]), M = u.useCallback((U) => {
    const ie = (U - n) / r * 100;
    return ie >= -5 && ie <= 105;
  }, [n, r]), T = (U) => {
    if (!L.current) return;
    const ge = L.current.getBoundingClientRect(), ie = Math.max(0, Math.min(U.clientX - ge.left, ge.width)), oe = Math.round(n + ie / ge.width * r);
    i && i(oe);
  }, j = () => {
    i && i(null);
  }, v = (U) => {
    if (!L.current || !a) return;
    const ge = L.current.getBoundingClientRect(), ie = Math.max(0, Math.min(U.clientX - ge.left, ge.width)), oe = Math.round(n + ie / ge.width * r);
    a(Math.max(0, Math.min(l, oe)));
  }, x = u.useMemo(() => {
    const U = Math.max(3, Math.floor(y / 95)), ge = r / U;
    for (let ie of ja)
      if (ie >= ge) return ie;
    return ja[ja.length - 1];
  }, [r, y]), w = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const U = e + n, ge = U + r, ie = t === "LOCAL" ? As(U).offsetMin * 60 * 1e3 : 0, oe = U + ie, le = Math.ceil(oe / x) * x, Fe = [];
    for (let V = le; V <= ge + ie; V += x) {
      const Z = V - ie, ce = (Z - U) / r * 100;
      ce >= 0 && ce <= 100 && Fe.push({
        epoch: Z,
        pct: ce,
        label: yt(Z, t, {
          includeSeconds: x < 6e4
        })
      });
    }
    return Fe;
  }, [e, n, r, x, t]), I = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const U = e + n, ge = U + r;
    return up(U, ge).map((ie) => ({
      ...ie,
      pct: (ie.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), O = u.useMemo(() => {
    if (!r || !e) return [];
    const U = e + n, ge = U + r, ie = t === "UTC", oe = [], le = ie ? 0 : As(U).offsetMin * 60 * 1e3, Fe = U + le, V = ge + le, Z = new Date(Fe);
    for (Z.setUTCHours(0, 0, 0, 0), Z.getTime() < Fe && Z.setUTCDate(Z.getUTCDate() + 1); Z.getTime() <= V; ) {
      const J = Z.getTime() - le, re = (J - U) / r * 100, Ne = String(Z.getUTCDate()).padStart(2, "0"), Be = _g[Z.getUTCMonth()], Y = `${Ne} ${Be}`;
      oe.push({ epoch: J, pct: re, dateLabel: Y }), Z.setUTCDate(Z.getUTCDate() + 1);
    }
    return oe;
  }, [e, n, r, t]), {
    globalFirstMs: H = N,
    globalLastMs: R = null,
    currentFirstMs: W = null,
    currentLastMs: se = null
  } = m || { globalFirstMs: N }, F = H !== null && W !== null && Math.abs(H - W) < 1e3, D = R !== null && se !== null && Math.abs(R - se) < 1e3, E = u.useMemo(() => {
    const U = [];
    return F ? M(H) && U.push({
      id: "first-combined",
      ms: H,
      pct: h(H),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${yt(e + H, t)} (Click to jump)`
    }) : (M(H) && U.push({
      id: "first-global",
      ms: H,
      pct: h(H),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${yt(e + H, t)} (Click to jump)`
    }), M(W) && U.push({
      id: "first-current",
      ms: W,
      pct: h(W),
      className: "ruler-media-pin current-first",
      badge: k ? `FIRST (${k})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${yt(e + W, t)} (Click to jump)`
    })), D ? M(R) && U.push({
      id: "last-combined",
      ms: R,
      pct: h(R),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${yt(e + R, t)} (Click to jump)`
    }) : (M(se) && U.push({
      id: "last-current",
      ms: se,
      pct: h(se),
      className: "ruler-media-pin current-last",
      badge: k ? `LAST (${k})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${yt(e + se, t)} (Click to jump)`
    }), M(R) && U.push({
      id: "last-global",
      ms: R,
      pct: h(R),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${yt(e + R, t)} (Click to jump)`
    })), U;
  }, [
    H,
    R,
    W,
    se,
    F,
    D,
    e,
    t,
    k,
    M,
    h
  ]), P = u.useMemo(() => {
    const U = [];
    return typeof c == "number" && M(c) && U.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: h(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${yt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && M(d) && U.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: h(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${yt(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), U;
  }, [c, d, e, t, M, h]), z = o !== null ? h(o) : null, q = z !== null && z >= 0 && z <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: L,
      className: "timeline-ruler-root",
      onMouseMove: T,
      onMouseLeave: j,
      onClick: v,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          w.map((U) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${U.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: U.label })
          ] }, U.epoch)),
          S && /* @__PURE__ */ s.jsx(
            Pg,
            {
              stationHostname: g,
              activeStationName: k,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: y,
              onSeek: a,
              keystrokes: b
            }
          ),
          I.map((U) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${U.pct}%` },
              title: `${U.description} (${U.labelBefore} ➔ ${U.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: U.description })
                ] })
              ]
            },
            U.switchEpochMs
          )),
          O.map((U) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${U.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: U.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            U.epoch
          )),
          E.map((U) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: U.className,
              style: { left: `${U.pct}` },
              onClick: (ge) => {
                ge.stopPropagation(), a && a(U.ms);
              },
              title: U.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: U.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            U.id
          )),
          P.map((U) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${U.type}-cut-tick`,
              style: { left: `${U.pct}` },
              onClick: (ge) => {
                ge.stopPropagation(), a && a(U.ms);
              },
              title: U.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: U.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: U.shortLabel })
                ] })
              ]
            },
            U.id
          ))
        ] }),
        q && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${z}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: yt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Pn = (e) => String(e).padStart(2, "0");
function Bg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: i
}) {
  const [a, c] = u.useState(!1), [d, N] = u.useState(!1), [m, g] = u.useState(""), [k, S] = u.useState(""), b = u.useCallback((w) => {
    if (!w || isNaN(w) || w <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const R = new Date(w);
      return {
        timeStr: `${Pn(R.getUTCHours())}:${Pn(R.getUTCMinutes())}:${Pn(R.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: I, label: O } = As(w), H = new Date(w + I * 60 * 1e3);
    return {
      timeStr: `${Pn(H.getUTCHours())}:${Pn(H.getUTCMinutes())}:${Pn(H.getUTCSeconds())}`,
      zoneLabel: O
    };
  }, [t]), L = u.useCallback((w) => {
    if (!w || w < 0) return "00:00:00";
    const I = Math.floor(w / 1e3), O = Math.floor(I / 3600), H = Math.floor(I % 3600 / 60), R = I % 60;
    return `${Pn(O)}:${Pn(H)}:${Pn(R)}`;
  }, []), y = u.useMemo(() => b(e + r), [b, e, r]), p = u.useMemo(() => b(e + o), [b, e, o]), h = u.useMemo(() => L(Math.max(0, o - r)), [L, r, o]), M = u.useCallback((w, I) => {
    if (!w || !w.trim()) return I;
    const H = w.trim().split(" ")[0].split(":").map(Number);
    if (H.length < 2 || H.some(isNaN)) return I;
    const [R, W, se = 0] = H;
    if (t === "UTC") {
      const le = new Date(e);
      le.setUTCHours(R, W, se, 0);
      let Fe = le.getTime();
      for (; Fe < e; ) Fe += 864e5;
      for (; Fe > e + n + 1e3; ) Fe -= 864e5;
      const V = Fe - e;
      return isNaN(V) ? I : Math.max(0, Math.min(n, V));
    }
    const { offsetMin: F } = As(e), D = new Date(e + F * 6e4), E = D.getUTCFullYear(), P = D.getUTCMonth(), z = D.getUTCDate(), q = `${E}-${Pn(P + 1)}-${Pn(z)}`, U = `${Pn(R)}:${Pn(W)}:${Pn(se)}`, ge = Ci(q, U);
    let ie;
    if (ge.isAmbiguous) {
      const le = e + I, Fe = Math.abs(ge.firstOccurrenceEpoch - le), V = Math.abs(ge.secondOccurrenceEpoch - le);
      ie = Fe <= V ? ge.firstOccurrenceEpoch : ge.secondOccurrenceEpoch;
    } else {
      const le = Date.UTC(E, P, z, R, W, se), { offsetMin: Fe } = As(le - F * 6e4);
      ie = le - Fe * 6e4;
    }
    for (; ie < e; ) ie += 864e5;
    for (; ie > e + n + 1e3; ) ie -= 864e5;
    const oe = ie - e;
    return isNaN(oe) ? I : Math.max(0, Math.min(n, oe));
  }, [e, t, n]), T = () => {
    g(y.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !m || !m.trim() || m.trim() === y.timeStr)
      return;
    const w = M(m.trim(), r);
    w !== null && !isNaN(w) && w < o && l(w);
  }, v = () => {
    S(p.timeStr), N(!0);
  }, x = () => {
    if (N(!1), !k || !k.trim() || k.trim() === p.timeStr)
      return;
    const w = M(k.trim(), o);
    w !== null && !isNaN(w) && w > r && i(w);
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
          onChange: (w) => g(w.target.value),
          onBlur: j,
          onKeyDown: (w) => {
            w.key === "Enter" && j(), w.key === "Escape" && c(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: T,
          title: `Click to edit IN time (${y.zoneLabel})`,
          children: [
            y.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: y.zoneLabel })
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
          value: k,
          autoFocus: !0,
          onChange: (w) => S(w.target.value),
          onBlur: x,
          onKeyDown: (w) => {
            w.key === "Enter" && x(), w.key === "Escape" && N(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: v,
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
  onStartDragMinimap: N
}) {
  const m = Math.max(0, Math.min(100, a / r * 100)), g = Math.max(0, Math.min(100, c / r * 100)), k = Math.max(0, g - m), S = Math.max(0, Math.min(100, l / r * 100)), b = Math.max(0, Math.min(100 - S, o / r * 100)), L = S + b, y = i > 1.05, p = 7, h = k >= 10, M = k >= 16, T = h, j = M, v = T && Math.abs(S - m) < p, x = y && b >= 12 && !v, w = j && Math.abs(L - g) < p, I = y && b >= 12 && !w;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (O) => N && N("minimap-viewport", O),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${m}%`, width: `${k}%` },
            children: [
              T && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: yt(t + a, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: yt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${S}%`, width: `${b}%` },
            children: [
              x && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: yt(t + l, n) }),
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
function Wg({
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
  onChangeKeystrokeMode: N,
  showRulerKeystrokes: m = !1,
  onToggleRulerKeystrokes: g
}) {
  const k = (d || "NONE").toUpperCase().replace("-", "_"), S = () => {
    N && N(k === "NONE" || k === "OFF" ? "BURN_IN" : k === "BURN_IN" ? "CAPTION" : "NONE");
  }, b = () => {
    switch (k) {
      case "BURN_IN":
        return "KEYS: BURN-IN";
      case "CAPTION":
        return "KEYS: CAPTION";
      default:
        return "KEYS: OFF";
    }
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline-viewport-actions-group", children: [
    N && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action keys-mode-btn mode-${k.toLowerCase().replace("_", "-")}`,
        onClick: S,
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
const ys = /* @__PURE__ */ new Map(), Br = /* @__PURE__ */ new Map();
let bs = [], al = 0;
const Bd = 3, zg = 8e3, Hg = 80;
function yp() {
  setTimeout(Vg, 0);
}
function Vg() {
  var e;
  if (!(al >= Bd || bs.length === 0))
    for (bs = bs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); al < Bd && bs.length > 0; ) {
      const t = bs.pop();
      !t || (e = t.signal) != null && e.aborted || (al++, Kg(t));
    }
}
async function Kg(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: i, resolve: a, displayId: c } = e;
  let d = !1, N = null;
  const m = () => {
    d || (d = !0, N && clearTimeout(N), al = Math.max(0, al - 1), Br.delete(t), yp());
  };
  N = setTimeout(() => {
    m(), a(null);
  }, zg);
  try {
    const g = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, k = await fetch(g, { signal: i });
    if (k.ok && k.status !== 204) {
      const S = await k.blob();
      if (S && S.size > 1500) {
        const b = URL.createObjectURL(S);
        if (ys.size >= Hg) {
          const L = ys.keys().next().value, y = ys.get(L);
          y && URL.revokeObjectURL(y), ys.delete(L);
        }
        ys.set(t, b), a(b);
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
    return ys.get(o);
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
    if (ys.has(i))
      return Promise.resolve(ys.get(i));
    if (Br.has(i))
      return Br.get(i);
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
        bs = bs.filter((N) => N.key !== i), Br.delete(i), c(null);
      }, { once: !0 }), bs.push(d), yp();
    });
    return Br.set(i, a), a;
  },
  clear() {
    ys.forEach((e) => URL.revokeObjectURL(e)), ys.clear(), Br.clear(), bs = [], al = 0;
  }
}, Yg = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Cs = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Dl = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Wd({
  hostname: e,
  displayId: t = "mon-0",
  activeSegments: n = [],
  viewportStartMs: r = 0,
  viewportDurationMs: l = 36e5,
  baseEpochMs: o = 0,
  inPointMs: i = 0,
  outPointMs: a = 36e5,
  globalGaps: c = [],
  directorSegments: d = [],
  isAutoDirectorEnabled: N = !1,
  showDirectorCoverage: m = !1,
  stepperSegments: g = null
}) {
  const [k, S] = u.useState({}), b = u.useRef(k);
  b.current = k;
  const L = u.useMemo(() => Yg(l), [l]), y = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: x, framesPerTile: w } = L, I = [], O = o + r, H = O + l, R = O - x, W = H + x;
    if ([...n].sort((F, D) => Cs(F) - Cs(D)).forEach((F, D) => {
      const E = Math.round(Cs(F)), P = Math.round(Dl(F));
      if (P <= E) return;
      const z = Math.max(E, R), q = Math.min(P, W);
      if (q <= z) return;
      const U = Math.floor(z / x) * x;
      for (let ge = U; ge < q; ge += x) {
        const ie = ge + x, oe = Math.max(E, ge), le = Math.min(P, ie);
        le > oe && I.push({
          key: `${e}_${t}_${oe}_${le}_${w}`,
          sIdx: D,
          startEpoch: oe,
          endEpoch: le,
          framesPerTile: w,
          displayId: t
        });
      }
    }), I.length > 20) {
      const F = o + r + l / 2;
      I.sort((D, E) => {
        const P = Math.abs((D.startEpoch + D.endEpoch) / 2 - F), z = Math.abs((E.startEpoch + E.endEpoch) / 2 - F);
        return P - z;
      }), I.length = 20, I.sort((D, E) => D.startEpoch - E.startEpoch);
    }
    return I;
  }, [n, o, e, t, r, l, L]);
  u.useEffect(() => {
    if (y.length === 0) return;
    let x = !0;
    const w = new AbortController(), I = [], O = {};
    let H = !1;
    y.forEach((E) => {
      const P = Ud.get(e, E.startEpoch, E.endEpoch, E.framesPerTile, t);
      P ? b.current[E.key] !== P && (O[E.key] = P, H = !0) : I.push(E);
    });
    const R = new Set(y.map((E) => E.key)), W = b.current, se = {};
    let F = !1;
    if (Object.keys(W).forEach((E) => {
      R.has(E) ? se[E] = W[E] : F = !0;
    }), H || F) {
      const E = { ...se, ...O };
      b.current = E, S(E);
    }
    if (I.length === 0) return () => {
      x = !1;
    };
    const D = setTimeout(() => {
      I.forEach((E) => {
        Ud.fetchTile(e, E.startEpoch, E.endEpoch, E.framesPerTile, w.signal, t).then((P) => {
          x && P && (b.current[E.key] = P, S((z) => ({ ...z, [E.key]: P })));
        });
      });
    }, 150);
    return () => {
      x = !1, clearTimeout(D), w.abort();
    };
  }, [y, e, t]);
  const p = (i - r) / l * 100, h = (a - r) / l * 100, M = u.useMemo(() => {
    if (y.length === 0 || !o || l <= 0) return [];
    const x = r, w = r + l;
    return y.map((I) => {
      const O = I.startEpoch - o, H = I.endEpoch - o;
      if (H <= x || O >= w) return null;
      const R = Math.max(x, O), W = Math.min(w, H);
      return {
        key: I.key,
        spriteUrl: k[I.key] || null,
        leftPct: (R - x) / l * 100,
        widthPct: (W - R) / l * 100
      };
    }).filter(Boolean);
  }, [y, o, r, l, k]), T = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const x = r, w = r + l;
    return n.map((I, O) => {
      const H = Math.round(Cs(I)) - o, R = Math.round(Dl(I)) - o;
      if (R <= x || H >= w) return null;
      const W = Math.max(x, H), se = Math.min(w, R);
      return {
        id: O,
        leftPct: (W - x) / l * 100,
        widthPct: (se - W) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), j = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const x = [...n].sort((D, E) => Cs(D) - Cs(E)), w = [], I = r, O = r + l, H = o + I, R = o + O, W = o + (i !== void 0 ? i : I), se = o + (a !== void 0 ? a : O);
    if (x.length > 0) {
      const D = Cs(x[0]);
      D > H && w.push({ startEpoch: H, endEpoch: D });
    } else l > 0 && w.push({ startEpoch: H, endEpoch: R });
    for (let D = 0; D < x.length - 1; D++) {
      const E = Dl(x[D]), P = Cs(x[D + 1]);
      P - E > 1e3 && w.push({ startEpoch: E, endEpoch: P });
    }
    if (x.length > 0) {
      const D = Dl(x[x.length - 1]);
      D < R && w.push({ startEpoch: D, endEpoch: R });
    }
    const F = [];
    return c && c.length > 0 && c.forEach((D, E) => {
      const P = Math.max(D.startEpochMs ?? D.StartEpochMs, W), z = Math.min(D.endEpochMs ?? D.EndEpochMs, se);
      if (z > P && z > H && P < R) {
        const q = Math.max(H, P), ge = (Math.min(R, z) - o - (q - o)) / l * 100;
        ge > 0 && F.push({
          id: `global-${E}`,
          type: "global",
          leftPct: (q - o - I) / l * 100,
          widthPct: ge,
          durationSec: Math.round((z - P) / 1e3)
        });
      }
    }), w.forEach((D, E) => {
      let P = [D];
      c && c.length > 0 && c.forEach((z) => {
        const q = Math.max(z.startEpochMs ?? z.StartEpochMs, W), U = Math.min(z.endEpochMs ?? z.EndEpochMs, se);
        if (U <= q) return;
        const ge = [];
        P.forEach((ie) => {
          U <= ie.startEpoch || q >= ie.endEpoch ? ge.push(ie) : (q > ie.startEpoch && ge.push({ startEpoch: ie.startEpoch, endEpoch: q }), U < ie.endEpoch && ge.push({ startEpoch: U, endEpoch: ie.endEpoch }));
        }), P = ge;
      }), P.forEach((z, q) => {
        if (z.endEpoch - z.startEpoch < 1e3 || z.endEpoch <= H || z.startEpoch >= R) return;
        const U = Math.max(H, z.startEpoch), ie = (Math.min(R, z.endEpoch) - o - (U - o)) / l * 100;
        ie > 0 && F.push({
          id: `station-${E}-${q}`,
          type: "station",
          leftPct: (U - o - I) / l * 100,
          widthPct: ie,
          durationSec: Math.round((z.endEpoch - z.startEpoch) / 1e3)
        });
      });
    }), F;
  }, [n, c, o, r, l, i, a]), v = u.useMemo(() => {
    if (!m || !N || !d || d.length === 0) return [];
    const x = (t || "mon-0").toLowerCase(), w = r, I = r + l;
    return d.map((O, H) => {
      const R = (O.startEpochMs ?? O.StartEpochMs ?? 0) - o, W = (O.endEpochMs ?? O.EndEpochMs ?? 0) - o;
      if (W <= w || R >= I) return null;
      const se = Math.max(w, R), F = Math.min(I, W), D = (se - w) / l * 100, E = (F - se) / l * 100;
      if (E <= 0) return null;
      const z = (O.targetDisplayId || O.TargetDisplayId || "mon-0").toLowerCase() === x;
      return {
        id: `cov_${H}`,
        isFeatured: z,
        leftPct: D,
        widthPct: E
      };
    }).filter(Boolean);
  }, [m, N, d, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: j.map((x) => /* @__PURE__ */ s.jsxs(
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
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: M.map((x) => /* @__PURE__ */ s.jsx(
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
    v.map((x) => x.isFeatured ? /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${g ? "has-stepper" : ""}`, children: T.map((x) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` }
      },
      `bar_${x.id}`
    )) }),
    g && g.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: N ? g.map((x, w) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `stepper-block display-${x.dispNum}`,
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
        title: `Auto-Director: Screen ${x.dispNum} (${x.dispLabel})`,
        children: /* @__PURE__ */ s.jsx("span", { children: x.dispNum })
      },
      `stp_${w}`
    )) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    p > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, p)}%` } }),
    h < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, h)}%`, right: 0 } })
  ] });
}
function Gg({
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
  onStationContextMenu: N,
  onDeselectStation: m,
  viewportStartMs: g = 0,
  viewportDurationMs: k = 36e5,
  inPointMs: S = 0,
  outPointMs: b = 36e5,
  baseEpochMs: L = 0,
  segments: y = [],
  recordingSegments: p = {},
  globalGaps: h = []
}) {
  const M = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", T = (e == null ? void 0 : e.id) || M, j = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", v = (e == null ? void 0 : e.hostname) || "", x = u.useMemo(() => {
    var D, E, P;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((D = e == null ? void 0 : e.displayTopology) == null ? void 0 : D.displays) || ((E = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : E.Displays) || ((P = e == null ? void 0 : e.topology) == null ? void 0 : P.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), w = u.useMemo(() => {
    var E, P;
    const D = x.find((z) => z.isPrimary || z.IsPrimary);
    return ((D == null ? void 0 : D.displayId) || (D == null ? void 0 : D.DisplayId) || ((E = x[0]) == null ? void 0 : E.displayId) || ((P = x[0]) == null ? void 0 : P.DisplayId) || "mon-0").toLowerCase();
  }, [x]), I = a || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), O = u.useMemo(() => (I == null ? void 0 : I.segments) || (I == null ? void 0 : I.Segments) || [], [I]), H = O && O.length > 0, R = x.length > 1 || H, W = u.useMemo(() => {
    let D = p[T] || p[M] || y || [];
    if (!D || D.length === 0) {
      const E = (T || "").toLowerCase(), P = (M || "").toLowerCase();
      for (const [z, q] of Object.entries(p || {})) {
        const U = z.toLowerCase();
        if (E && U === E || P && U === P) {
          D = q;
          break;
        }
      }
    }
    if ((!D || D.length === 0) && (D = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !D || D.length === 0)
      for (const E of x) {
        const P = E.segments || E.Segments || [];
        if (P.length > 0) {
          D = P;
          break;
        }
      }
    return (D || []).filter((E) => Dl(E) - Cs(E) > 0);
  }, [p, y, T, M, e, x]), se = u.useMemo(() => {
    if (!H || k <= 0) return null;
    const D = g, E = g + k;
    return O.map((P, z) => {
      const q = (P.startEpochMs ?? P.StartEpochMs ?? 0) - L, U = (P.endEpochMs ?? P.EndEpochMs ?? 0) - L;
      if (U <= D || q >= E) return null;
      const ge = Math.max(D, q), ie = Math.min(E, U), oe = (ge - D) / k * 100, le = (ie - ge) / k * 100;
      if (le <= 0) return null;
      const Fe = (P.targetDisplayId || P.TargetDisplayId || "mon-0").toLowerCase(), V = x.findIndex((J) => (J.displayId || J.DisplayId || "").toLowerCase() === Fe);
      let Z = V >= 0 ? V + 1 : null;
      if (!Z) {
        const J = Fe.match(/\d+/);
        Z = J ? parseInt(J[0], 10) + 1 : 1;
      }
      const ce = V >= 0 ? x[V].displayName || x[V].DisplayName || `Screen ${Z}` : `Screen ${Z}`;
      return {
        id: z,
        dispNum: Z,
        dispLabel: ce,
        leftPct: oe,
        widthPct: le
      };
    }).filter(Boolean);
  }, [H, O, x, L, g, k]), F = u.useCallback((D) => {
    const E = (D || "mon-0").toLowerCase();
    return o.some((P) => P.stationId === T && (P.displayId || "mon-0").toLowerCase() === E);
  }, [o, T]);
  return t ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (D) => {
              D.stopPropagation(), n == null || n();
            },
            title: "Collapse station tracks (Preserves canvas placements)",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: j, children: j })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-timeline", children: [
        R && l ? /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-station-auto-director ${r ? "is-active" : "is-inactive"}`,
            onClick: (D) => {
              D.stopPropagation(), l(e.id);
            },
            title: r ? "Auto-Director is Active. Click to turn OFF for manual multi-screen canvas placement." : "Auto-Director is OFF. Primary screen active. Click to re-enable Auto-Director.",
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "dot" }),
              /* @__PURE__ */ s.jsx("span", { children: r ? "⚡ AUTO-DIRECTOR: ON" : "✋ AUTO-DIRECTOR: OFF" })
            ]
          }
        ) : /* @__PURE__ */ s.jsx("span", {}),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-close-accordion",
            onClick: (D) => {
              D.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: x.map((D, E) => {
      const P = (D.displayId || D.DisplayId || `mon-${E}`).toLowerCase(), z = D.displayNumber || D.DisplayNumber || E + 1, q = D.displayName || D.DisplayName || `SCREEN ${z}`, U = F(P);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${q} (${D.width || 1920}×${D.height || 1080})`, children: q }),
              !r && i && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${U ? "is-on-canvas" : ""}`,
                  onClick: (ge) => {
                    ge.stopPropagation(), i(e.id, P);
                  },
                  title: U ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: U ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Wd,
              {
                hostname: M,
                displayId: P,
                activeSegments: W,
                viewportStartMs: g,
                viewportDurationMs: k,
                baseEpochMs: L,
                inPointMs: S,
                outPointMs: b,
                globalGaps: h,
                directorSegments: O,
                isAutoDirectorEnabled: r,
                showDirectorCoverage: R
              }
            )
          ]
        },
        `${e.id}-${P}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), R && n && n();
      },
      onContextMenu: (D) => {
        N && (D.preventDefault(), D.stopPropagation(), N(D, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${R ? "has-stepper" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${j}${v ? ` (${v})` : ""} • Click to select / expand`,
            children: [
              R && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (D) => {
                    D.stopPropagation(), n == null || n();
                  },
                  title: "Expand multi-screen tracks (Screens 1 & 2)",
                  children: "▶"
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: j, children: j }),
              R && l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (D) => {
                    D.stopPropagation(), l(e.id);
                  },
                  title: r ? "Auto-Director is Active. Click to turn OFF (Hold Screen 1)" : "Auto-Director is OFF. Primary Screen 1 active. Click to turn ON",
                  children: r ? "⚡ AUTO" : "✋ OFF"
                }
              ),
              m && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-track-deselect",
                  title: `Remove ${j} from project`,
                  onClick: (D) => {
                    D.stopPropagation(), m(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Wd,
          {
            hostname: M,
            displayId: w,
            activeSegments: W,
            viewportStartMs: g,
            viewportDurationMs: k,
            baseEpochMs: L,
            inPointMs: S,
            outPointMs: b,
            globalGaps: h,
            isAutoDirectorEnabled: r,
            stepperSegments: R ? se : null
          }
        )
      ]
    }
  );
}
const zd = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function Xg({
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
  isAutoFollow: N = !1,
  timeMode: m = "LOCAL",
  onUpdateAudioPlan: g = null
}) {
  const k = u.useRef(null), [S, b] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [L, y] = u.useState(!1), [p, h] = u.useState(null), [M, T] = u.useState(1), [j, v] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const V = (Z) => {
      Z.detail && v(Z.detail);
    };
    return window.addEventListener("itb-live-audio-level", V), () => window.removeEventListener("itb-live-audio-level", V);
  }, []);
  const x = u.useCallback(() => {
    b((V) => {
      const Z = !V;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(Z));
      } catch {
      }
      return Z;
    });
  }, []), [w, I] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      clips: e.segments.map((V, Z) => {
        var ce;
        return {
          id: `clip_${Z}_${V.startEpochMs || V.StartEpochMs}`,
          startEpochMs: V.startEpochMs ?? V.StartEpochMs ?? l,
          endEpochMs: V.endEpochMs ?? V.EndEpochMs ?? l + r,
          sourceStationId: V.sourceStationId ?? V.SourceStationId ?? (((ce = t[0]) == null ? void 0 : ce.id) || "station-0"),
          gain: V.gain ?? V.Gain ?? 1
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
  ]), O = l + o, H = l + n, R = H + r, W = u.useCallback((V) => {
    if (!g) return;
    const Z = [];
    V.forEach((ce) => {
      ce.isMuted || L || ce.clips.forEach((J) => {
        Z.push({
          startEpochMs: J.startEpochMs,
          endEpochMs: J.endEpochMs,
          sourceStationId: J.sourceStationId,
          gain: J.gain * ce.gain
        });
      });
    }), Z.sort((ce, J) => ce.startEpochMs - J.startEpochMs), g({ segments: Z });
  }, [g, L]), se = u.useCallback(() => {
    I((V) => {
      const ce = `A${V.length + 1}`, J = {
        id: ce,
        name: `Track ${ce}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        clips: []
      }, re = [...V, J];
      return W(re), re;
    });
  }, [W]), F = u.useCallback((V) => {
    I((Z) => {
      if (Z.length <= 1) return Z;
      const ce = Z.filter((J) => J.id !== V);
      return W(ce), ce;
    });
  }, [W]), D = u.useCallback((V) => {
    I((Z) => {
      const ce = Z.map((J) => J.id === V ? { ...J, isMuted: !J.isMuted } : J);
      return W(ce), ce;
    });
  }, [W]), E = u.useCallback((V) => {
    I((Z) => {
      var re;
      const ce = (re = Z.find((Ne) => Ne.id === V)) == null ? void 0 : re.isSolo, J = Z.map((Ne) => ({
        ...Ne,
        isSolo: Ne.id === V ? !ce : !1,
        isMuted: Ne.id === V ? !1 : !ce
      }));
      return W(J), J;
    });
  }, [W]), P = u.useCallback((V, Z) => {
    const ce = Math.max(0, Math.min(2, Number(Z)));
    I((J) => {
      const re = J.map((Ne) => Ne.id === V ? { ...Ne, gain: ce } : Ne);
      return W(re), re;
    }), _d(ce);
  }, [W]), z = u.useCallback((V, Z = null, ce = null) => {
    var G;
    const J = Z || ((G = t[0]) == null ? void 0 : G.id) || "station-0", re = ce !== null ? ce : O, Ne = Math.min(r, 6e4), Be = re + Ne, Y = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(re),
      endEpochMs: Math.round(Be),
      sourceStationId: J,
      gain: 1
    };
    I((ue) => {
      const fe = ue.map((ke) => ke.id === V ? {
        ...ke,
        clips: [...ke.clips, Y].sort((Se, te) => Se.startEpochMs - te.startEpochMs)
      } : ke);
      return W(fe), fe;
    });
  }, [O, r, t, W]), q = u.useCallback((V, Z) => {
    I((ce) => {
      const J = ce.map((re) => {
        if (re.id !== V) return re;
        const Ne = [];
        return re.clips.forEach((Be) => {
          Be.id === Z && O > Be.startEpochMs + 500 && O < Be.endEpochMs - 500 ? (Ne.push({ ...Be, endEpochMs: O }), Ne.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: O,
            endEpochMs: Be.endEpochMs,
            sourceStationId: Be.sourceStationId,
            gain: Be.gain
          })) : Ne.push(Be);
        }), { ...re, clips: Ne };
      });
      return W(J), J;
    }), h(null);
  }, [O, W]), U = u.useCallback((V, Z) => {
    I((ce) => {
      const J = ce.map((re) => re.id !== V ? re : { ...re, clips: re.clips.filter((Ne) => Ne.id !== Z) });
      return W(J), J;
    }), h(null);
  }, [W]), ge = u.useCallback((V, Z, ce) => {
    I((J) => {
      const re = J.map((Ne) => Ne.id !== V ? Ne : {
        ...Ne,
        clips: Ne.clips.map((Be) => Be.id === Z ? { ...Be, sourceStationId: ce } : Be)
      });
      return W(re), re;
    }), h((J) => J ? { ...J, stationId: ce } : null);
  }, [W]), ie = u.useCallback((V, Z, ce) => {
    const J = Math.max(0, Math.min(2.5, Number(ce)));
    T(J), I((re) => {
      const Ne = re.map((Be) => Be.id !== V ? Be : {
        ...Be,
        clips: Be.clips.map((Y) => Y.id === Z ? { ...Y, gain: J } : Y)
      });
      return W(Ne), Ne;
    }), _d(J);
  }, [W]), oe = u.useCallback((V, Z, ce, J) => {
    V.preventDefault(), V.stopPropagation();
    const re = V.clientX, Ne = w.find((ke) => ke.id === Z), Be = Ne == null ? void 0 : Ne.clips.find((ke) => ke.id === ce);
    if (!Be) return;
    const Y = Be.startEpochMs, G = Be.endEpochMs, ue = (ke) => {
      var be;
      const Se = ke.clientX - re, te = (be = k.current) == null ? void 0 : be.querySelector(".audio-lane-timeline");
      if (!te) return;
      const Pe = te.getBoundingClientRect(), ve = Se / Pe.width * r;
      I((ze) => ze.map((Oe) => Oe.id !== Z ? Oe : {
        ...Oe,
        clips: Oe.clips.map((je) => {
          if (je.id !== ce) return je;
          if (J === "start") {
            const Ye = Math.min(G - 500, Y + ve);
            return { ...je, startEpochMs: Math.round(Ye) };
          } else {
            const Ye = Math.max(Y + 500, G + ve);
            return { ...je, endEpochMs: Math.round(Ye) };
          }
        })
      }));
    }, fe = () => {
      window.removeEventListener("mousemove", ue), window.removeEventListener("mouseup", fe), I((ke) => (W(ke), ke));
    };
    window.addEventListener("mousemove", ue), window.addEventListener("mouseup", fe);
  }, [w, r, W]), le = (V, Z, ce) => {
    V.preventDefault(), V.stopPropagation();
    const J = Math.min(window.innerWidth - 260, Math.max(16, V.clientX - 40)), re = Math.min(window.innerHeight - 280, Math.max(16, V.clientY - 200));
    T(ce.gain || 1), h({
      laneId: Z,
      clipId: ce.id,
      s: ce.startEpochMs,
      e: ce.endEpochMs,
      x: J,
      y: re,
      stationId: ce.sourceStationId,
      gain: ce.gain || 1
    });
  };
  u.useEffect(() => {
    if (!p) return;
    const V = () => h(null), Z = (ce) => {
      ce.key === "Escape" && h(null);
    };
    return window.addEventListener("click", V), window.addEventListener("keydown", Z), () => {
      window.removeEventListener("click", V), window.removeEventListener("keydown", Z);
    };
  }, [p]);
  const Fe = u.useMemo(() => w.reduce((V, Z) => V + (Z.isMuted ? 0 : Z.clips.length), 0), [w]);
  return !t || t.length === 0 ? null : S ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: k, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: x,
            title: "Collapse Audio Master Bus",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          w.length,
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
            className: `btn-master-mute ${L ? "is-muted" : ""}`,
            onClick: () => y((V) => !V),
            title: L ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: L ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: w.map((V, Z) => {
      const ce = zd[Z % zd.length];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${ce}26`, borderColor: `${ce}80`, color: ce }, children: V.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: V.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${V.isMuted ? "active" : ""}`,
                onClick: () => D(V.id),
                title: V.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${V.isSolo ? "active" : ""}`,
                onClick: () => E(V.id),
                title: V.isSolo ? "Unsolo Lane" : "Solo Lane",
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
                value: V.gain,
                onChange: (J) => P(V.id, J.target.value),
                title: `Lane Gain: ${Math.round(V.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(V.gain * 100),
              "%"
            ] })
          ] }),
          w.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => F(V.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "audio-lane-timeline",
            onDoubleClick: (J) => {
              var Y;
              const re = J.currentTarget.getBoundingClientRect(), Ne = Math.max(0, Math.min(1, (J.clientX - re.left) / re.width)), Be = Math.round(H + Ne * r);
              z(V.id, (Y = t[0]) == null ? void 0 : Y.id, Be);
            },
            children: [
              V.clips.map((J) => {
                const re = J.startEpochMs, Ne = J.endEpochMs, Be = t.find((Se) => Se.id === J.sourceStationId), Y = Be ? Be.displayName || Be.hostname || Be.id : J.sourceStationId;
                if (Ne <= H || re >= R) return null;
                const G = Math.max(H, re), ue = Math.min(R, Ne), fe = (G - H) / r * 100, ke = (ue - G) / r * 100;
                return ke <= 0 ? null : /* @__PURE__ */ s.jsxs(
                  "div",
                  {
                    className: `audio-clip-block ${V.isMuted ? "lane-muted" : ""}`,
                    style: {
                      left: `${fe}%`,
                      width: `${ke}%`,
                      borderLeftColor: ce
                    },
                    onClick: (Se) => le(Se, V.id, J),
                    onContextMenu: (Se) => le(Se, V.id, J),
                    title: `Audio Clip: ${Y} [${yt(re, m, { includeSeconds: !0 })} - ${yt(Ne, m, { includeSeconds: !0 })}] • Gain: ${Math.round(J.gain * 100)}%`,
                    children: [
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-left",
                          onMouseDown: (Se) => oe(Se, V.id, J.id, "start"),
                          title: "Drag to trim Clip In-Point"
                        }
                      ),
                      /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
                        "path",
                        {
                          d: "M0,12 L5,6 L10,18 L15,4 L20,20 L25,8 L30,16 L35,2 L40,22 L45,10 L50,14 L55,5 L60,19 L65,8 L70,16 L75,3 L80,21 L85,9 L90,15 L95,7 L100,12",
                          fill: "none",
                          stroke: ce,
                          strokeWidth: "1.2",
                          strokeOpacity: "0.85"
                        }
                      ) }) }),
                      /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: Y }),
                        /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
                          Math.round(J.gain * 100),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-right",
                          onMouseDown: (Se) => oe(Se, V.id, J.id, "end"),
                          title: "Drag to trim Clip Out-Point"
                        }
                      )
                    ]
                  },
                  J.id
                );
              }),
              V.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var J;
                    return z(V.id, (J = t[0]) == null ? void 0 : J.id, O);
                  },
                  title: "Click to insert audio clip at playhead",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK TO INSERT AUDIO CLIP (",
                    V.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, V.id);
    }) }),
    p && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "audio-clip-context-menu",
        style: { left: p.x, top: p.y },
        onClick: (V) => V.stopPropagation(),
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
            /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((V) => {
              const Z = V.id === p.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${Z ? "is-selected" : ""}`,
                  onClick: () => ge(p.laneId, p.clipId, V.id),
                  children: V.displayName || V.hostname || V.id
                },
                V.id
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
                onChange: (V) => ie(p.laneId, p.clipId, V.target.value),
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
                onClick: () => q(p.laneId, p.clipId),
                title: "Split clip at timeline playhead (Ctrl+K)",
                children: "✂️ SPLIT AT PLAYHEAD"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action delete",
                onClick: () => U(p.laneId, p.clipId),
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
      ref: k,
      onClick: x,
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
function Qg({
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
  totalDurationMs: N = 36e5,
  playheadMs: m = 0,
  timeMode: g = "LOCAL"
}) {
  const k = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [S, b] = u.useState(null), [L, y] = u.useState(null);
  ho.useEffect(() => {
    if (L === null) return;
    const v = (w) => {
      w.key === "Escape" && y(null);
    }, x = (w) => {
      !w.target.closest(".kf-inspector-popover") && !w.target.closest(".kf-marker-diamond") && y(null);
    };
    return window.addEventListener("keydown", v), window.addEventListener("mousedown", x), () => {
      window.removeEventListener("keydown", v), window.removeEventListener("mousedown", x);
    };
  }, [L]);
  const p = d + m, h = d + a, M = h + c, T = (v) => {
    const x = v.currentTarget.getBoundingClientRect(), w = v.clientX - x.left, I = Math.max(0, Math.min(1, w / x.width)), O = Math.round(h + I * c);
    r && r(O);
  }, j = (v, x, w) => {
    if (v.button !== 0) return;
    v.stopPropagation(), v.preventDefault();
    const I = v.clientX, O = w.timestampEpochMs, H = w.id || `kf_${x}_${O}`, R = v.currentTarget.closest(".track-surface");
    if (!R) return;
    let W = !1;
    b({
      idx: x,
      kfId: H,
      startClientX: I,
      initialEpoch: O,
      currentEpoch: O
    });
    const se = (D) => {
      const E = D.clientX - I;
      Math.abs(E) > 3 && (W = !0);
      const P = R.getBoundingClientRect(), z = E / P.width * c;
      let q = Math.round(O + z);
      q = Math.max(d, Math.min(d + N, q)), b((U) => U ? { ...U, currentEpoch: q } : null);
    }, F = (D) => {
      window.removeEventListener("mousemove", se), window.removeEventListener("mouseup", F), b(null);
      const E = R.getBoundingClientRect(), z = (D.clientX - I) / E.width * c;
      let q = Math.round(O + z);
      q = Math.max(d, Math.min(d + N, q)), W ? (o && o(H, q), n && n(x, q)) : (n && n(x, O), y((U) => U === x ? null : x));
    };
    window.addEventListener("mousemove", se), window.addEventListener("mouseup", F);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        k.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (v) => {
            v.stopPropagation(), r && r(p);
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
        onClick: T,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          k.map((v, x) => {
            const w = (S == null ? void 0 : S.idx) === x, I = w ? S.currentEpoch : v.timestampEpochMs;
            if (I < h - 5e4 || I > M + 5e4) return null;
            const O = (I - h) / c * 100;
            if (O < -2 || O > 102) return null;
            const H = x === t, R = yt(I, g, { includeSeconds: !0 }), W = `${v.transitionType || "smooth"} (${v.transitionDurationSec ?? 0.5}s)`, se = Math.max(0, (I - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${H ? "is-active" : ""} ${w ? "is-dragging" : ""}`,
                style: { left: `${O}%` },
                onMouseDown: (F) => j(F, x, v),
                onContextMenu: (F) => {
                  F.preventDefault(), F.stopPropagation(), k.length > 1 && l && l(x);
                },
                title: `Keyframe #${x + 1} at ${R} (+${se}s) • ${W}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  w && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: R }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      se,
                      "s"
                    ] })
                  ] }),
                  L === x && !w && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (F) => F.stopPropagation(),
                      onMouseDown: (F) => F.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            x + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: R }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (F) => {
                                F.stopPropagation(), y(null);
                              },
                              title: "Close",
                              children: "✕"
                            }
                          )
                        ] }),
                        x > 0 ? /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${(v.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(x, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${v.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(x, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${v.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(x, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          v.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((F) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(v.transitionDurationSec ?? 0.5) === F ? "is-active" : ""}`,
                                onClick: () => i == null ? void 0 : i(x, { transitionDurationSec: F }),
                                children: [
                                  F,
                                  "s"
                                ]
                              },
                              F
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (F) => {
                                F.stopPropagation(), l && l(x), y(null);
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
              `kf-${x}`
            );
          })
        ]
      }
    )
  ] });
}
function Jg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: i = 36e5,
  onStartDrag: a
}) {
  const c = (w) => !r || r <= 0 ? "0%" : `${(w - n) / r * 100}%`, d = (o - n) / r * 100, N = (i - n) / r * 100, m = (l - n) / r * 100, g = m >= -0.2 && m <= 100.2, k = Math.max(0, Math.min(100, m)), S = Math.max(0, d), b = Math.min(100, N), L = Math.max(0, b - S), y = (w) => (I) => {
    I.preventDefault(), I.stopPropagation(), typeof a == "function" && a(w, I);
  }, p = d < 1.5, h = N > 98.5, M = d <= 0.2 && d >= -0.2, T = N >= 99.8 && N <= 100.2, j = m >= -0.2 && m < 3.5, v = m > 96.5 && m <= 100.2, x = u.useMemo(() => yt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    L > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${S}%`, width: `${L}%` },
        onMouseDown: y("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${p ? "flipped" : ""} ${M ? "at-edge" : ""}`,
        style: { left: c(o) },
        onMouseDown: y("in"),
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
        className: `marker out-marker ${h ? "flipped" : ""} ${T ? "at-edge" : ""}`,
        style: { left: c(i) },
        onMouseDown: y("out"),
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
        style: { left: `${k}%` },
        onMouseDown: y("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${j ? "edge-left" : ""} ${v ? "edge-right" : ""}`, children: x }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const Zg = ho.memo(Jg);
function qg({
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
  const i = 210, a = 150, c = Math.min(e.x, window.innerWidth - i - 12), d = Math.min(e.y, window.innerHeight - a - 12), N = /* @__PURE__ */ s.jsxs(
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
  return Ps.createPortal(N, document.body);
}
function ex({
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
const tx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function nx({
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
    const N = new AbortController();
    c(!0);
    const m = setTimeout(async () => {
      try {
        const g = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, k = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(g),
          signal: N.signal
        });
        if (k.ok) {
          const S = await k.json();
          i(S), d.current && d.current(S);
        }
      } catch (g) {
        g.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", g);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(m), N.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: a, formatEstimateSize: tx };
}
function sx({
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
  getMsFromClientX: N,
  minimapRef: m
}) {
  const [g, k] = u.useState(null), [S, b] = u.useState(null), L = (y, p) => {
    k(y), b({
      target: y,
      startX: p.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: i,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!g) return;
    const y = e * 0.015, p = (M) => {
      if (g === "minimap-viewport" && (m != null && m.current)) {
        const j = m.current.getBoundingClientRect(), x = Math.max(0, Math.min(M.clientX - j.left, j.width)) / j.width * t, w = Math.max(0, Math.min(x - e / 2, t - e));
        d(w);
        return;
      }
      const T = N(M.clientX);
      if (g === "playhead") {
        let j = T;
        Math.abs(j - l) <= y ? j = l : Math.abs(j - i) <= y && (j = i), r(Math.max(0, Math.min(t, j)));
      } else if (g === "in") {
        const j = i - 1e3;
        o(Math.max(0, Math.min(T, j)));
      } else if (g === "out") {
        const j = l + 1e3;
        a(Math.min(t, Math.max(T, j)));
      } else if (g === "range" && S) {
        const j = T - N(S.startX), v = S.initialOut - S.initialIn;
        let x = S.initialIn + j, w = S.initialOut + j;
        x < 0 ? (x = 0, w = v) : w > t && (w = t, x = t - v), o(x), a(w);
      }
    }, h = () => {
      k(null), b(null);
    };
    return window.addEventListener("mousemove", p), window.addEventListener("mouseup", h), () => {
      window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", h);
    };
  }, [
    g,
    S,
    N,
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
  ]), { draggingTarget: g, handleStartDrag: L };
}
const Hs = 4;
function vp({
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
  zoomLevel: N = 1,
  _onZoomChange: m,
  onZoomReset: g,
  playheadMs: k = 0,
  setPlayheadMs: S,
  inPointMs: b = 0,
  setInPointMs: L,
  outPointMs: y = 36e5,
  setOutPointMs: p,
  onExport: h,
  recordingSegments: M = {},
  movieBoundaries: T,
  viewportStartMs: j = 0,
  onViewportStartChange: v,
  onEstimateLoaded: x,
  onFitRange: w,
  onJumpViewportTo: I,
  keystrokeMode: O = "BURN_IN",
  onChangeKeystrokeMode: H,
  keystrokes: R = [],
  showKeystrokes: W = !1,
  showRulerKeystrokes: se = !1,
  onToggleRulerKeystrokes: F,
  _onSplitDirectorSegment: D,
  _onChangeDirectorSegmentDisplay: E,
  _onResetDirectorSegmentToAuto: P,
  audioRoutingPlan: z,
  onSplitAudioSegment: q,
  onChangeAudioSegmentStation: U,
  onChangeAudioSegmentGain: ge,
  onFollowVisualFeed: ie,
  isAutoFollowAudio: oe,
  canvasLayoutTimeline: le,
  activeKfIndex: Fe = 0,
  onSelectKeyframe: V,
  onAddKeyframeAtEpoch: Z,
  onDeleteKeyframe: ce,
  onUpdateKeyframeEpoch: J,
  onToggleDisplayOnCanvas: re,
  onUpdateAudioPlan: Ne
}) {
  var Rt, Bt, Xt;
  const [Be, Y] = u.useState(null), [G, ue] = u.useState(0), [fe, ke] = u.useState(null), [Se, te] = u.useState(!0), [Pe, ve] = u.useState(null), be = u.useRef(null), ze = u.useRef(null), Oe = d / Math.max(1, N), je = Math.ceil(e.length / Hs) || 1, Ye = u.useMemo(() => {
    const Ee = G * Hs;
    return e.slice(Ee, Ee + Hs);
  }, [e, G]);
  u.useEffect(() => {
    if (!t && !Pe) return;
    const Ee = Pe || t, jt = e.findIndex((ye) => ye.id === Ee);
    if (jt !== -1) {
      const ye = Math.floor(jt / Hs);
      ye !== G && ue(ye);
    }
  }, [t, Pe, e, G]);
  const Ue = ((Rt = le == null ? void 0 : le.keyframes) == null ? void 0 : Rt[Fe]) || ((Bt = le == null ? void 0 : le.keyframes) == null ? void 0 : Bt[0]), en = u.useMemo(() => {
    var Ee;
    return ((Ee = Ue == null ? void 0 : Ue.layout) == null ? void 0 : Ee.placements) || [];
  }, [Ue]), qe = u.useMemo(() => e.find((Ee) => Ee.id === t) || null, [e, t]), Ke = (T == null ? void 0 : T.globalFirstMs) ?? null, ln = (T == null ? void 0 : T.globalLastMs) ?? null, Lt = u.useMemo(() => (b > 500 || y < d - 500) && y - b >= 1e3, [b, y, d]), fn = u.useMemo(() => e.map((Ee) => Ee.id).sort().join(","), [e]), { estimateData: He, isEstimating: vt, formatEstimateSize: Cn } = nx({
    stationIdsKey: fn,
    inPointMs: b,
    outPointMs: y,
    baseEpochMs: a,
    onEstimateLoaded: x
  }), gt = u.useCallback((Ee) => {
    if (!be.current) return j;
    const jt = be.current.getBoundingClientRect(), ye = jt.left + 180, Ce = jt.width - 180 - 58;
    if (Ce <= 0) return j;
    const We = Math.max(0, Math.min(Ee - ye, Ce));
    return Math.round(j + We / Ce * Oe);
  }, [j, Oe]), { draggingTarget: Nt, handleStartDrag: En } = sx({
    viewportDurationMs: Oe,
    totalDurationMs: d,
    playheadMs: k,
    setPlayheadMs: S,
    inPointMs: b,
    setInPointMs: L,
    outPointMs: y,
    setOutPointMs: p,
    viewportStartMs: j,
    setViewportStartMs: v,
    getMsFromClientX: gt,
    minimapRef: ze
  }), wt = e.length > 0 && Math.abs(y - b) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: be,
      className: "timeline-board-root",
      onContextMenu: (Ee) => {
        var ye;
        Ee.preventDefault();
        const jt = (ye = be.current) == null ? void 0 : ye.getBoundingClientRect();
        !jt || Ee.clientX - jt.left < 180 || Ee.clientX > jt.right - 58 || ke({ x: Ee.clientX, y: Ee.clientY, targetMs: Math.max(0, Math.min(d, gt(Ee.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Bg,
            {
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: b,
              setInPointMs: L,
              outPointMs: y,
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
                  viewportDurationMs: Oe,
                  zoomLevel: N,
                  inPointMs: b,
                  outPointMs: y,
                  playheadMs: k,
                  onStartDragMinimap: En
                }
              ),
              /* @__PURE__ */ s.jsx(
                Wg,
                {
                  earliestMediaMs: Ke,
                  latestMediaMs: ln,
                  hasActiveCut: Lt,
                  onJumpToFirst: () => {
                    Ke !== null && (S == null || S(Ke), I == null || I(Ke, "start"));
                  },
                  onJumpToLast: () => {
                    ln !== null && (S == null || S(ln), I == null || I(ln, "end"));
                  },
                  onContextualFit: () => {
                    Lt ? w == null || w(b, y) : Ke !== null && ln !== null && ln > Ke ? w == null || w(Ke, ln) : g == null || g();
                  },
                  onResetZoom: g,
                  baseEpochMs: a,
                  timeMode: c,
                  keystrokeMode: O,
                  onChangeKeystrokeMode: H,
                  showRulerKeystrokes: se,
                  onToggleRulerKeystrokes: F
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              Fg,
              {
                baseEpochMs: a,
                timeMode: c,
                viewportStartMs: j,
                viewportDurationMs: Oe,
                totalDurationMs: d,
                hoverMs: Be,
                onHoverChange: Y,
                onSeek: (Ee) => S == null ? void 0 : S(Ee),
                inPointMs: b,
                outPointMs: y,
                earliestMediaMs: Ke,
                movieBoundaries: T,
                stationHostname: (qe == null ? void 0 : qe.hostname) || (qe == null ? void 0 : qe.id) || (qe == null ? void 0 : qe.name),
                activeStationName: (qe == null ? void 0 : qe.displayName) || (qe == null ? void 0 : qe.hostname) || (qe == null ? void 0 : qe.name),
                showKeystrokes: !!(se ?? W),
                keystrokes: R
              }
            ) })
          ] })
        ] }),
        je > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: G === 0,
              onClick: () => ue((Ee) => Math.max(0, Ee - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            G * Hs + 1,
            "–",
            Math.min(e.length, (G + 1) * Hs),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: G >= je - 1,
              onClick: () => ue((Ee) => Math.min(je - 1, Ee + 1)),
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
            onMouseMove: (Ee) => {
              if (Nt || !be.current) return;
              const jt = be.current.getBoundingClientRect();
              Ee.clientX >= jt.left + 180 && Ee.clientX <= jt.right - 58 ? Y(gt(Ee.clientX)) : Y(null);
            },
            onMouseLeave: () => !Nt && Y(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => te((Ee) => !Ee), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: Se ? "▼" : "▶" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  Se && je > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: G === 0,
                        onClick: (Ee) => {
                          Ee.stopPropagation(), ue((jt) => Math.max(0, jt - 1));
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
                      je,
                      " (",
                      G * Hs + 1,
                      "–",
                      Math.min(e.length, (G + 1) * Hs),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: G >= je - 1,
                        onClick: (Ee) => {
                          Ee.stopPropagation(), ue((jt) => Math.min(je - 1, jt + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !Se && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => te(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: "▶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "🎬 ALL VIDEO (COLLAPSED)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      e.length,
                      " STATIONS"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: ((He == null ? void 0 : He.removedGlobalGaps) || []).map((Ee, jt) => {
                      const ye = Ee.startEpochMs - a, Ce = Ee.endEpochMs - a, We = (Math.max(j, ye) - j) / Oe * 100, Ct = (Math.min(j + Oe, Ce) - j) / Oe * 100 - We;
                      if (Ct <= 0) return null;
                      const X = Math.round((Ee.endEpochMs - Ee.startEpochMs) / 1e3);
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: "gap-full-block gap-global-skipped",
                          style: { left: `${We}%`, width: `${Ct}%` },
                          title: `Shared Gap: ${X}s skipped across all stations`,
                          children: [
                            /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
                            Ct > 5 && /* @__PURE__ */ s.jsx("div", { className: "gap-badge global-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
                              "✂ SKIPPED ($",
                              X,
                              "s)"
                            ] }) })
                          ]
                        },
                        `sum_gap_${jt}`
                      );
                    }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "data-presence-layer", children: /* @__PURE__ */ s.jsx("div", { className: "data-presence-bar", style: { left: "0%", width: "100%" } }) }),
                    b > j && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, (b - j) / Oe * 100)}%` } }),
                    y < j + Oe && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, (y - j) / Oe * 100)}%`, right: 0 } })
                  ] })
                ] }),
                Se && (e.length > 0 ? Ye.map((Ee) => {
                  const jt = !!(t && Ee.id === t), ye = Pe === Ee.id, Ce = o ? o[Ee.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Gg,
                    {
                      station: Ee,
                      isExpanded: ye,
                      onToggleExpand: () => ve((We) => We === Ee.id ? null : Ee.id),
                      isAutoDirectorEnabled: Ce,
                      onToggleAutoDirector: i,
                      canvasPlacements: en,
                      onToggleDisplayOnCanvas: re,
                      directorPlan: Ee.directorPlan,
                      isActive: jt,
                      onSelect: () => n == null ? void 0 : n(Ee.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: j,
                      viewportDurationMs: Oe,
                      inPointMs: b,
                      outPointMs: y,
                      baseEpochMs: a,
                      segments: M[Ee.id] || M[Ee.hostname] || Ee.segments || [],
                      recordingSegments: M,
                      globalGaps: (He == null ? void 0 : He.removedGlobalGaps) || []
                    },
                    Ee.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Xg,
                  {
                    audioPlan: z,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: Oe,
                    baseEpochMs: a,
                    playheadMs: k,
                    onSplitSegment: q,
                    onChangeSegmentStation: U,
                    onChangeSegmentGain: ge,
                    onFollowVisualFeed: ie,
                    isAutoFollow: oe,
                    timeMode: c,
                    onUpdateAudioPlan: Ne
                  }
                ),
                ((Xt = le == null ? void 0 : le.keyframes) == null ? void 0 : Xt.length) > 0 && /* @__PURE__ */ s.jsx(
                  Qg,
                  {
                    canvasLayoutTimeline: le,
                    activeKfIndex: Fe,
                    onSelectKeyframe: V,
                    onAddKeyframeAtEpoch: Z,
                    onDeleteKeyframe: ce,
                    onUpdateKeyframeEpoch: J,
                    viewportStartMs: j,
                    viewportDurationMs: Oe,
                    baseEpochMs: a,
                    totalDurationMs: d,
                    playheadMs: k,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                ex,
                {
                  isRangeValid: wt,
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
          Zg,
          {
            baseEpochMs: a,
            timeMode: c,
            viewportStartMs: j,
            viewportDurationMs: Oe,
            playheadMs: k,
            inPointMs: b,
            outPointMs: y,
            onStartDrag: En
          }
        ),
        /* @__PURE__ */ s.jsx(
          qg,
          {
            contextMenu: fe,
            baseEpochMs: a,
            timeMode: c,
            onAction: (Ee) => {
              fe && (Ee === "playhead" ? S == null || S(fe.targetMs) : Ee === "in" ? L == null || L(Math.max(0, Math.min(fe.targetMs, y - 1e3))) : Ee === "out" && (p == null || p(Math.min(d, Math.max(fe.targetMs, b + 1e3)))), ke(null));
            },
            onClose: () => ke(null)
          }
        )
      ]
    }
  );
}
function rx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function lx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function ox({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function ix({
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
  filterMode: N,
  onFilterModeChange: m,
  filteredCount: g,
  selectedInTabCount: k,
  unselectedInTabCount: S,
  activeTabName: b,
  onSelectAllInScope: L,
  onClearInScope: y,
  viewMode: p = "grid",
  onViewModeChange: h,
  isDrawerMode: M = !1
}) {
  const [T, j] = u.useState(!1), v = N !== "all", x = !b || b.toLowerCase() === "all", w = x ? "Select All" : `Select ${b}`, I = x ? "Clear All" : `Clear ${b}`;
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
            onChange: (O) => t(O.target.value)
          }
        )
      ] }),
      M && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${T ? "open" : ""} ${v ? "has-filter" : ""}`,
          onClick: () => j(!T),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            v && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
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
          onChange: (O) => i(O.target.value),
          children: l.map((O) => {
            const H = O.id === "all" ? c.map((W) => W.id) : O.stationIds || [], R = H.filter((W) => d.includes(W)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: O.id, children: [
              O.name,
              " (",
              R,
              "/",
              H.length,
              ")"
            ] }, O.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: L, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: y, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        a && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((O) => {
        const H = o === O.id, R = O.id === "all" ? c.map((F) => F.id) : O.stationIds || [], W = R.length, se = R.filter((F) => d.includes(F)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${H ? "active" : ""}`,
            onClick: () => i(O.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: O.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${se > 0 ? "has-selected" : ""}`, children: [
                se,
                "/",
                W
              ] })
            ]
          },
          O.id
        );
      }) })
    ] })),
    (!M || T) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${M ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${N === "all" ? "active" : ""}`,
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
            className: `filter-pill ${N === "selected" ? "active" : ""}`,
            onClick: () => m("selected"),
            children: [
              "Sel (",
              k,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${N === "unselected" ? "active" : ""}`,
            onClick: () => m("unselected"),
            children: [
              "Unsel (",
              S,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${N === "gaps" ? "active" : ""}`,
            onClick: () => m("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${N === "audio" ? "active" : ""}`,
            onClick: () => m("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !M && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: L, children: [
          "+ ",
          w
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: y, children: [
          "✕ ",
          I
        ] })
      ] })
    ] })
  ] });
}
function ax({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: i = "table"
}) {
  if (r === 0) return null;
  const a = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = i === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], N = t <= 1, m = (g) => {
    if (g === n) return !0;
    const k = Math.min(n, r), S = Math.min(g, r), b = Math.ceil(r / n), L = Math.ceil(r / g);
    return k !== S || b !== L;
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `hub-pagination-bar ${N ? "is-single-page-mode" : ""}`, children: [
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
    /* @__PURE__ */ s.jsxs("div", { className: `pagination-controls ${N ? "controls-disabled-compact" : ""}`, children: [
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
        const k = n === g, S = !m(g);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${k ? "active" : ""} ${S ? "redundant-disabled" : ""}`,
            disabled: S,
            onClick: () => o(g),
            title: S ? `All stations already fit on screen (Total: ${r})` : `Show ${g} per page`,
            children: g
          },
          g
        );
      }) })
    ] })
  ] });
}
function cx({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, i] = u.useState(!1), a = u.useRef(null);
  u.useEffect(() => {
    const g = (k) => {
      a.current && !a.current.contains(k.target) && i(!1);
    };
    return o && document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [o]);
  const c = u.useMemo(() => {
    const g = new Map(t.map((k) => [k.id, k]));
    return e.map((k) => g.get(k) || { id: k, hostname: `Station ${k}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = c.slice(0, l), N = c.slice(l), m = N.length > 0;
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
        const k = g.displayName || g.hostname || g.name || g.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: k, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: k }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (S) => {
                S.stopPropagation(), n(g.id);
              },
              title: `Remove ${k}`,
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
                N.length,
                " MORE"
              ] }),
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "18 15 12 9 6 15" }) })
            ]
          }
        ),
        o && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-menu upward", children: [
          /* @__PURE__ */ s.jsx("div", { className: "popover-header", children: /* @__PURE__ */ s.jsxs("span", { children: [
            "ADDITIONAL WORKSTATIONS (",
            N.length,
            ")"
          ] }) }),
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: N.map((g) => {
            const k = g.displayName || g.hostname || g.name || g.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: k, children: k }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(g.id),
                  title: `Remove ${k}`,
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
const Np = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Hd(e, t, n = Np) {
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
function ux(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (i) => String(i).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function dx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function hx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Np) {
  const { baseEpochMs: l, durationMs: o } = n, i = !!(e != null && e.hasAudio), a = (e == null ? void 0 : e.audioChannels) || (i ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, N = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? dx(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const v = Hd(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: i,
      audioChannels: a,
      resolution: c,
      fps: d,
      fileSize: N,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: v,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const m = l, g = l + o, k = [];
  for (const v of t) {
    const x = Math.max(v.startEpoch, m), w = Math.min(v.endEpoch, g);
    w > x && k.push({ startEpoch: x, endEpoch: w });
  }
  k.sort((v, x) => v.startEpoch - x.endEpoch);
  const S = [];
  for (const v of k)
    if (S.length === 0)
      S.push({ ...v });
    else {
      const x = S[S.length - 1];
      v.startEpoch <= x.endEpoch + 1e3 ? x.endEpoch = Math.max(x.endEpoch, v.endEpoch) : S.push({ ...v });
    }
  let b = 0;
  for (const v of S)
    b += v.endEpoch - v.startEpoch;
  const L = o > 0 ? b / o * 100 : 0, y = L > 0 && L < 1 ? Number(L.toFixed(1)) : Math.min(100, Math.round(L)), p = [];
  let h = m, M = 0;
  for (const v of S) {
    if (v.startEpoch > h + 2e3) {
      const I = (v.startEpoch - h) / o * 100, O = (h - m) / o * 100;
      p.push({
        type: "gap",
        startPct: Math.max(0, O),
        widthPct: Math.min(100, I)
      }), M++;
    }
    const x = (v.endEpoch - v.startEpoch) / o * 100, w = (v.startEpoch - m) / o * 100;
    p.push({
      type: "rec",
      startPct: Math.max(0, w),
      widthPct: Math.min(100, x)
    }), h = v.endEpoch;
  }
  if (h < g - 2e3) {
    const v = (g - h) / o * 100, x = (h - m) / o * 100;
    p.push({
      type: "gap",
      startPct: Math.max(0, x),
      widthPct: Math.min(100, v)
    }), M++;
  }
  const T = M > 0 || y < 100, j = Hd(y, T, r);
  return {
    coveragePct: y,
    recordedDuration: ux(b),
    totalRecordedMs: b,
    hasAudio: i,
    audioChannels: a,
    resolution: c,
    fps: d,
    fileSize: N,
    hasGaps: T,
    gapsCount: M,
    trafficStatus: j,
    segments: p.length > 0 ? p : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const fx = Object.freeze([]), px = 12;
function mx({
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
  onApply: N,
  onOpenRangeModal: m,
  systemTabs: g = fx,
  recordingSegments: k = {},
  baseEpochMs: S = 0,
  durationMs: b = 0
}) {
  const [L, y] = u.useState([]), [p, h] = u.useState("all"), [M, T] = u.useState(""), [j, v] = u.useState(!0), [x, w] = u.useState("all"), [I, O] = u.useState(null), [H, R] = u.useState(!1), [W, se] = u.useState(15), [F, D] = u.useState(8), [E, P] = u.useState(1), z = u.useRef(!1), q = u.useRef(null), U = c && r.length === 0, ge = r.length === 0 && !c;
  let ie = "is-closed";
  a || ge || U ? ie = "is-full-width" : e && (ie = "is-open"), u.useLayoutEffect(() => {
    const te = () => {
      if (!q.current) return;
      const ve = q.current.clientHeight;
      if (ve <= 0) return;
      const be = q.current.querySelector(".station-row, .hub-table-row"), ze = be ? be.offsetHeight : 40;
      if (ze > 0) {
        const je = Math.floor(ve / ze) - 2, Ue = [5, 10, 15, 20, 25, 30].filter((en) => en <= je).pop() || 5;
        se(Ue);
      }
      const Oe = q.current.clientWidth;
      if (Oe > 0) {
        const Ue = Math.max(1, Math.floor((Oe + 12) / 252)), qe = Math.max(1, Math.floor((ve + 12) / (175 + 12))), Ke = Math.max(Ue * qe, Ue);
        D(Ke);
      }
    };
    te(), window.addEventListener("resize", te);
    const Pe = new ResizeObserver(te);
    return q.current && Pe.observe(q.current), () => {
      window.removeEventListener("resize", te), Pe.disconnect();
    };
  }, [I, r.length]), u.useEffect(() => {
    if (g && g.length > 0) {
      y(g);
      return;
    }
    if (z.current || !e && !a) return;
    z.current = !0;
    let te = !0;
    return (async () => {
      R(!0);
      try {
        const ve = await fetch("/api/v1/dashboard/tabs");
        if (ve.ok && te) {
          const be = await ve.json();
          Array.isArray(be) && y(be);
        }
      } catch (ve) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", ve);
      } finally {
        te && R(!1);
      }
    })(), () => {
      te = !1;
    };
  }, [e, a, g]);
  const oe = u.useMemo(() => {
    const te = L.length > 0 ? L : g;
    if (te && te.length > 0) {
      const Pe = te.map((ve) => {
        const be = ve.hostnames || ve.assignedHostnames || ve.stations || ve.stationIds || [], ze = r.filter((Oe) => {
          const je = (Oe.hostname || Oe.name || "").trim().toLowerCase();
          return be.some((Ye) => typeof Ye == "string" ? Ye.trim().toLowerCase() === je || je.includes(Ye.trim().toLowerCase()) : (Ye.hostname || Ye.name || "").trim().toLowerCase() === je);
        }).map((Oe) => Oe.id);
        return {
          id: String(ve.id || ve.tabId || ve.name),
          name: ve.name || "Tab",
          stationIds: ze
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((ve) => ve.id) },
        ...Pe.filter((ve) => ve.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((Pe) => Pe.id) }];
  }, [L, g, r]), le = u.useMemo(() => oe.find((te) => te.id === p) || oe[0], [oe, p]), Fe = u.useMemo(() => !le || le.id === "all" ? r.map((te) => te.id) : le.stationIds || [], [le, r]), V = u.useMemo(() => !k || Object.keys(k).length === 0 ? r.filter((te) => te.isLoaded || te.segments && te.segments.length > 0).length : r.filter((te) => k[te.id] !== void 0 || te.isLoaded).length, [r, k]), Z = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && V < r.length && Object.keys(k).length > 0), [d, c, r.length, V, k]), ce = u.useMemo(() => {
    const te = /* @__PURE__ */ new Map(), Pe = { baseEpochMs: S, durationMs: b };
    for (const ve of r) {
      const ze = !(k && k[ve.id] !== void 0 || ve.isLoaded === !0 || ve.segments && ve.segments.length > 0) && (Z || c || d), Oe = k && k[ve.id] || ve.segments || [], je = hx(ve, Oe, Pe);
      te.set(ve.id, {
        ...je,
        hasAudio: ve.hasAudio !== void 0 ? ve.hasAudio : je == null ? void 0 : je.hasAudio,
        audioLabel: ve.audioLabel || (ve.hasAudio ? "AAC" : (je == null ? void 0 : je.audioLabel) || "NONE"),
        audioChannels: ve.audioChannels ? ve.audioChannels === 1 ? "Mono" : "Stereo" : je == null ? void 0 : je.audioChannels,
        feedSpec: ve.feedSpec || (je == null ? void 0 : je.feedSpec) || `${ve.resolution || "1080p"} • ${ve.fps || 30}fps`,
        resolution: ve.resolution || (je == null ? void 0 : je.resolution) || "1080p",
        fps: ve.fps || (je == null ? void 0 : je.fps) || 30,
        isLoading: ze
      });
    }
    return te;
  }, [r, k, S, b, Z, c, d]), J = u.useMemo(() => r.filter((te) => {
    const Pe = ce.get(te.id), ve = k && k[te.id] && k[te.id].length > 0 || te.segments && te.segments.length > 0, be = Pe && (Pe.coveragePct > 0 || Pe.totalRecordedMs > 0), ze = typeof te.recordingsCount == "number" && te.recordingsCount > 0;
    return Pe && !Pe.isLoading ? be || ve : ze || ve;
  }), [r, ce, k]), re = u.useMemo(() => J.filter((te) => {
    if (le.id !== "all" && !Fe.includes(te.id) || !(te.displayName || te.hostname || te.name || "").toLowerCase().includes(M.toLowerCase())) return !1;
    const ve = l.includes(te.id), be = ce.get(te.id);
    return x === "selected" ? ve : x === "unselected" ? !ve : x === "gaps" ? be == null ? void 0 : be.hasGaps : x === "audio" ? be == null ? void 0 : be.hasAudio : !0;
  }).sort((te, Pe) => j ? (te.displayName || te.hostname || "").localeCompare(Pe.displayName || Pe.hostname || "") : 0), [J, le, Fe, M, x, l, j, ce]), Ne = u.useMemo(() => I !== null ? I : re.length > px ? "table" : "grid", [I, re.length]), Be = Ne === "table" ? W : F, Y = Math.max(1, Math.ceil(re.length / Be));
  u.useEffect(() => {
    P(1);
  }, [p, M, x, Ne]), u.useEffect(() => {
    E > Y && P(Y);
  }, [Y, E]);
  const G = u.useMemo(() => {
    if (ie !== "is-full-width") return re;
    const te = (E - 1) * Be;
    return re.slice(te, te + Be);
  }, [re, E, Be, ie]), ue = () => {
    if (!i) return;
    const te = le.id === "all" ? re.map((Pe) => Pe.id) : Fe;
    i(Array.from(/* @__PURE__ */ new Set([...l, ...te])));
  }, fe = () => {
    if (!i) return;
    const te = new Set(
      le.id === "all" ? re.map((Pe) => Pe.id) : Fe
    );
    i(l.filter((Pe) => !te.has(Pe)));
  }, ke = Fe.filter((te) => l.includes(te)).length, Se = re.filter((te) => l.includes(te.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${ie}`, children: [
    ie !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => ie === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            Z && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              V,
              "/",
              r.length
            ] })
          ] })
        ] }),
        ie === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      ie === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: ue,
            disabled: re.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                re.length,
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
            onClick: fe,
            disabled: Se === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                Se,
                ")"
              ] })
            ]
          }
        )
      ] }),
      Z && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? V / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: U ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : ge ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: m, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: ie === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      ie === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      ie === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${Z ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: Z ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: Z ? `ANALYZING TIMELINE ARCHIVES • ${V} OF ${J.length} STATIONS SYNCED (${J.length > 0 ? Math.min(100, Math.round(V / J.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${J.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: Z ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(V / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        ix,
        {
          searchTerm: M,
          onSearchChange: T,
          sortAlpha: j,
          onToggleSort: () => v(!j),
          effectiveTabs: oe,
          selectedTabId: p,
          onSelectTab: (te) => {
            h(te), O(null);
          },
          isLoadingTabs: H,
          allStations: J,
          selectedStationIds: l,
          filterMode: x,
          onFilterModeChange: w,
          filteredCount: re.length,
          selectedInTabCount: ke,
          unselectedInTabCount: Fe.length - ke,
          activeTabName: le.name,
          onSelectAllInScope: ue,
          onClearInScope: fe,
          viewMode: Ne,
          onViewModeChange: ie === "is-full-width" ? O : null,
          isDrawerMode: ie !== "is-full-width"
        }
      ),
      ie === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: ue,
              disabled: re.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  re.length,
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
              onClick: fe,
              disabled: Se === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  Se,
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
      ie === "is-full-width" && Ne === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: q,
          className: `station-list ${ie === "is-full-width" ? Ne === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: G.map((te) => {
            const Pe = l.includes(te.id), ve = ce.get(te.id);
            return ie === "is-full-width" ? Ne === "grid" ? /* @__PURE__ */ s.jsx(
              rx,
              {
                station: te,
                isSelected: Pe,
                onToggle: o,
                meta: ve
              },
              te.id
            ) : /* @__PURE__ */ s.jsx(
              lx,
              {
                station: te,
                isSelected: Pe,
                onToggle: o,
                meta: ve
              },
              te.id
            ) : /* @__PURE__ */ s.jsx(
              ox,
              {
                station: te,
                isSelected: Pe,
                onToggle: o,
                meta: ve
              },
              te.id
            );
          })
        }
      ),
      ie === "is-full-width" && /* @__PURE__ */ s.jsx(
        ax,
        {
          currentPage: E,
          totalPages: Y,
          pageSize: Be,
          totalItems: re.length,
          onPageChange: P,
          onPageSizeChange: (te) => {
            Ne === "table" ? se(te) : D(te), P(1);
          },
          viewMode: Ne
        }
      ),
      ie === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          cx,
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
            onClick: N,
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
const Mn = (e) => String(e).padStart(2, "0"), gx = [
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
], xx = [
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
function Vd({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [i, a] = u.useState(e), [c, d] = u.useState(null), N = u.useRef(null), { h: m, m: g, s: k } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const w = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, w[0] || 0)),
      m: Math.min(59, Math.max(0, w[1] || 0)),
      s: Math.min(59, Math.max(0, w[2] || 0))
    };
  }, [e]), S = u.useMemo(() => m >= 12, [m]);
  u.useEffect(() => {
    a(e);
  }, [e]);
  const b = () => {
    const I = i.replace(/[^0-9:]/g, "").trim().split(":").filter((se) => se.length > 0);
    let O = 0, H = 0, R = 0;
    I.length >= 1 && (O = Math.min(23, Math.max(0, parseInt(I[0], 10) || 0))), I.length >= 2 && (H = Math.min(59, Math.max(0, parseInt(I[1], 10) || 0))), I.length >= 3 && l && (R = Math.min(59, Math.max(0, parseInt(I[2], 10) || 0)));
    const W = l ? `${Mn(O)}:${Mn(H)}:${Mn(R)}` : `${Mn(O)}:${Mn(H)}`;
    a(W), t && t(W, { h: O, m: H, s: R });
  }, L = (w) => {
    let I = m;
    w === "AM" && m >= 12 ? I = m - 12 : w === "PM" && m < 12 && (I = m + 12);
    const O = l ? `${Mn(I)}:${Mn(g)}:${Mn(k)}` : `${Mn(I)}:${Mn(g)}`;
    a(O), t && t(O, { h: I, m: g, s: k });
  }, y = u.useCallback((w, I) => {
    if (!N.current) return null;
    const O = N.current.getBoundingClientRect(), H = O.left + O.width / 2, R = O.top + O.height / 2, W = w.clientX - H, se = w.clientY - R;
    let F = Math.atan2(se, W) * 180 / Math.PI + 90;
    if (F < 0 && (F += 360), I === "hours") {
      const D = Math.round(F / 30) % 12;
      return S ? D === 0 ? 12 : D + 12 : D === 0 ? 0 : D;
    }
    return Math.round(F / 6) % 60;
  }, [S]), p = u.useCallback((w, I) => {
    let O = m, H = g, R = k;
    w === "hours" ? O = I : w === "minutes" ? H = I : w === "seconds" && (R = I);
    const W = l ? `${Mn(O)}:${Mn(H)}:${Mn(R)}` : `${Mn(O)}:${Mn(H)}`;
    a(W), t && t(W, { h: O, m: H, s: R });
  }, [m, g, k, l, t]), h = (w, I) => {
    I.preventDefault(), I.stopPropagation(), d(w);
    const O = y(I, w);
    O !== null && p(w, O);
  };
  u.useEffect(() => {
    if (!c) return;
    const w = (O) => {
      const H = y(O, c);
      H !== null && p(c, H);
    }, I = () => {
      d(null);
    };
    return window.addEventListener("pointermove", w), window.addEventListener("pointerup", I), () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", I);
    };
  }, [c, y, p]);
  const M = u.useMemo(() => m % 12 * 30, [m]), T = u.useMemo(() => g % 60 * 6, [g]), j = u.useMemo(() => k % 60 * 6, [k]), v = S ? xx : gx, x = u.useMemo(() => {
    const w = [];
    for (let I = 0; I < 60; I++) {
      const O = (I * 6 - 90) * (Math.PI / 180), H = I % 5 === 0, R = 104, W = H ? 93 : 98;
      w.push({
        index: I,
        x1: 110 + W * Math.cos(O),
        y1: 110 + W * Math.sin(O),
        x2: 110 + R * Math.cos(O),
        y2: 110 + R * Math.sin(O),
        isMajor: H
      });
    }
    return w;
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
              className: `btn-period ${S ? "" : "active"}`,
              onClick: () => L("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${S ? "active" : ""}`,
              onClick: () => L("PM"),
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
            onChange: (w) => a(w.target.value),
            onBlur: b,
            onKeyDown: (w) => {
              w.key === "Enter" && w.currentTarget.blur();
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
        ref: N,
        className: "clock-dial-svg",
        viewBox: "0 0 220 220",
        children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "105", className: "dial-background" }),
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "88", className: "dial-track-ring" }),
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: x.map((w) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: w.x1,
              y1: w.y1,
              x2: w.x2,
              y2: w.y2,
              className: `dial-tick ${w.isMajor ? "major" : "minor"}`
            },
            `tick-${w.index}`
          )) }),
          v.map((w) => {
            const I = (w.angle - 90) * (Math.PI / 180), O = 76, H = 110 + O * Math.cos(I), R = 110 + O * Math.sin(I), W = m === w.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: H,
                y: R,
                className: `dial-num ${W ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: w.label
              },
              `dial-h-${w.val}`
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
                    onPointerDown: (w) => h("hours", w)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${c === "minutes" ? "dragging" : ""}`,
              transform: `rotate(${T} 110 110)`,
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
                    onPointerDown: (w) => h("minutes", w)
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
                    onPointerDown: (w) => h("seconds", w)
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
const _o = 7 * 24 * 60 * 60 * 1e3, Ot = (e) => String(e).padStart(2, "0");
function yx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: i
}) {
  const [a, c] = u.useState(""), [d, N] = u.useState(""), [m, g] = u.useState("00:00:00"), [k, S] = u.useState("00:00:00"), [b, L] = u.useState(() => /* @__PURE__ */ new Date()), [y, p] = u.useState(null), [h, M] = u.useState([]), [T, j] = u.useState(!1), [v, x] = u.useState(""), [w, I] = u.useState(1), [O, H] = u.useState(2), [R, W] = u.useState(null), se = u.useCallback(() => {
    try {
      const Y = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (Y) {
        const G = JSON.parse(Y);
        Array.isArray(G) && M(G);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((Y) => Y.ok ? Y.json() : null).then((Y) => {
      Array.isArray(Y) && Y.length > 0 && M(Y);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    se();
    let Y = n == null ? void 0 : n.startEpochMs, G = n == null ? void 0 : n.endEpochMs;
    if (!Y || isNaN(Y))
      if (n != null && n.start) {
        const ke = String(n.start).replace(" ", "T"), Se = new Date(ke).getTime();
        Y = isNaN(Se) ? Date.now() - 24 * 3600 * 1e3 : Se;
      } else
        G = Date.now(), Y = G - 24 * 3600 * 1e3;
    if (!G || isNaN(G))
      if (n != null && n.end) {
        const ke = String(n.end).replace(" ", "T"), Se = new Date(ke).getTime();
        G = isNaN(Se) ? Date.now() : Se;
      } else
        G = Y + 24 * 3600 * 1e3;
    W(null);
    const ue = Cr(Y, o), fe = Cr(G, o);
    c(`${ue.year}-${Ot(ue.month)}-${Ot(ue.day)}`), N(`${fe.year}-${Ot(fe.month)}-${Ot(fe.day)}`), g(`${Ot(ue.hour)}:${Ot(ue.minute)}:${Ot(ue.second)}`), S(`${Ot(fe.hour)}:${Ot(fe.minute)}:${Ot(fe.second)}`), L(new Date(Date.UTC(ue.year, ue.month - 1, 1)));
  }, [e, n, o, se]);
  const F = u.useCallback(() => {
    a && !d && N(a);
  }, [a, d]), D = d || a, E = u.useMemo(() => a ? `${a}T${m}` : "", [a, m]), P = u.useMemo(() => D ? `${D}T${k}` : "", [D, k]), z = u.useMemo(() => {
    const Y = {};
    return h.forEach((G) => {
      const ue = G.startTime || G.start, fe = G.endTime || G.end || ue;
      if (!ue) return;
      const ke = String(ue).substring(0, 10), Se = String(fe).substring(0, 10), [te, Pe, ve] = ke.split("-").map(Number), [be, ze, Oe] = Se.split("-").map(Number);
      if (isNaN(te) || isNaN(Pe) || isNaN(ve) || isNaN(be) || isNaN(ze) || isNaN(Oe)) return;
      let je = new Date(Date.UTC(te, Pe - 1, ve));
      const Ye = new Date(Date.UTC(be, ze - 1, Oe));
      for (; je.getTime() <= Ye.getTime(); ) {
        const Ue = `${je.getUTCFullYear()}-${Ot(je.getUTCMonth() + 1)}-${Ot(je.getUTCDate())}`;
        Y[Ue] || (Y[Ue] = []), Y[Ue].push(G), je.setUTCDate(je.getUTCDate() + 1);
      }
    }), Y;
  }, [h]), q = async (Y, G) => {
    if (G && G.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ue = h.filter((fe) => (fe.id || fe.startTime) !== Y);
    M(ue);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(ue)), localStorage.setItem("itb_bookmarks", JSON.stringify(ue)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: ue }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${Y}`, { method: "DELETE" });
    } catch {
    }
  }, U = (Y) => {
    const G = Y.startTime || Y.start, ue = Y.endTime || Y.end;
    if (!G || !ue) return;
    const fe = G.substring(0, 10), ke = G.includes("T") ? G.split("T")[1].substring(0, 8) : "00:00:00", Se = ue.substring(0, 10), te = ue.includes("T") ? ue.split("T")[1].substring(0, 8) : "23:59:59";
    c(fe), N(Se), g(ke), S(te);
    const [Pe, ve] = fe.split("-").map(Number);
    L(new Date(Date.UTC(Pe, ve - 1, 1))), j(!1);
  }, ge = (Y) => {
    l ? (l(Y), t && t()) : U(Y);
  }, ie = u.useMemo(() => {
    if (o === "UTC" || !E.includes("T")) return { isAmbiguous: !1 };
    const [Y, G] = E.split("T");
    return Ci(Y, G);
  }, [E, o]), oe = u.useMemo(() => {
    if (o === "UTC" || !P.includes("T")) return { isAmbiguous: !1 };
    const [Y, G] = P.split("T");
    return Ci(Y, G);
  }, [P, o]), le = u.useMemo(() => {
    if (!a || !D) return null;
    const Y = yc(a, m, o, w), G = yc(D, k, o, O);
    return Y === null || G === null || isNaN(Y) || isNaN(G) ? null : { startEpoch: Y, endEpoch: G, durationMs: G - Y };
  }, [a, m, D, k, o, w, O]), Fe = u.useMemo(() => !le || le.durationMs <= 0 ? [] : up(le.startEpoch, le.endEpoch), [le]), V = u.useMemo(() => {
    if (!le || le.durationMs <= 0) return "0h";
    const Y = le.durationMs / (1e3 * 60 * 60);
    return Y >= 24 ? `${(Y / 24).toFixed(1)}d (${Y.toFixed(0)}h)` : `${Y.toFixed(1)}h`;
  }, [le]), Z = u.useMemo(() => {
    const Y = b.getUTCFullYear(), G = b.getUTCMonth(), ue = new Date(Date.UTC(Y, G, 1)).getUTCDay(), fe = new Date(Date.UTC(Y, G + 1, 0)).getUTCDate(), ke = [];
    for (let Se = 0; Se < ue; Se++) ke.push(null);
    for (let Se = 1; Se <= fe; Se++) ke.push(`${Y}-${Ot(G + 1)}-${Ot(Se)}`);
    return ke;
  }, [b]), ce = (Y) => {
    if (Y) {
      if (W(null), !a || a && d)
        c(Y), N("");
      else if (a && !d)
        if (Y < a)
          c(Y), N("");
        else {
          const G = (/* @__PURE__ */ new Date(a + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(Y + "T00:00:00Z")).getTime() - G > _o) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const fe = new Date(G + _o);
            N(`${fe.getUTCFullYear()}-${Ot(fe.getUTCMonth() + 1)}-${Ot(fe.getUTCDate())}`);
          } else
            N(Y);
        }
    }
  }, J = (Y, G) => {
    W(G);
    const ue = Date.now(), fe = ue - Y, ke = Cr(fe, o), Se = Cr(ue, o);
    c(`${ke.year}-${Ot(ke.month)}-${Ot(ke.day)}`), N(`${Se.year}-${Ot(Se.month)}-${Ot(Se.day)}`), g(`${Ot(ke.hour)}:${Ot(ke.minute)}:${Ot(ke.second)}`), S(`${Ot(Se.hour)}:${Ot(Se.minute)}:${Ot(Se.second)}`), L(new Date(Date.UTC(ke.year, ke.month - 1, 1)));
  }, re = () => {
    if (F(), !le || isNaN(le.startEpoch) || isNaN(le.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (le.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (le.durationMs > _o) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: E,
      end: P,
      startEpochMs: le.startEpoch,
      endEpochMs: le.endEpoch,
      durationMs: le.durationMs,
      timeMode: o
    }), t && t();
  }, Ne = u.useMemo(() => {
    if (!v.trim()) return h;
    const Y = v.toLowerCase();
    return h.filter(
      (G) => (G.title || G.name || "").toLowerCase().includes(Y) || (G.startTime || "").includes(Y)
    );
  }, [h, v]);
  if (!e) return null;
  const Be = o === "UTC";
  return Ps.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (Y) => Y.stopPropagation(), children: [
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
                className: `btn-bookmarks-pill ${T ? "active" : ""}`,
                onClick: () => j(!T),
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
          /* @__PURE__ */ s.jsx("span", { children: Fe.map((Y) => `${Y.description} (${Y.labelBefore} ➔ ${Y.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${R === "7d" ? "active" : ""}`,
            onClick: () => J(7 * 24 * 3600 * 1e3, "7d"),
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
            onClick: () => J(3 * 24 * 3600 * 1e3, "3d"),
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
            onClick: () => J(24 * 3600 * 1e3, "24h"),
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
            onClick: () => J(8 * 3600 * 1e3, "8h"),
            children: [
              "8h Shift ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        )
      ] }),
      T && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
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
                value: v,
                onChange: (Y) => x(Y.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            Ne.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: Ne.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : Ne.map((Y) => {
          var Se;
          const G = Y.id || Y.startTime, ue = Y.title || Y.name || "Untitled Mission", fe = (Y.startTime || "").replace("T", " "), ke = (Y.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => U(Y), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: ue }),
                Y.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  Y.cutStationName
                ] }),
                ((Se = Y.stationIds) == null ? void 0 : Se.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  Y.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                fe,
                " ➔ ",
                ke
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (te) => {
                    te.stopPropagation(), U(Y);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (te) => {
                    te.stopPropagation(), ge(Y);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (te) => q(G, te),
                  children: "✕"
                }
              )
            ] })
          ] }, G);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: b.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => L((Y) => new Date(Date.UTC(Y.getUTCFullYear(), Y.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => L((Y) => new Date(Date.UTC(Y.getUTCFullYear(), Y.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Z.map((Y, G) => {
            if (!Y) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${G}`);
            const ue = parseInt(Y.split("-")[2], 10), fe = Y === a, ke = Y === (d || a), Se = d || y, te = a && Se && Y > a && Y < Se, Pe = z[Y], ve = !!(Pe && Pe.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${fe ? "start-edge" : ""} ${ke ? "end-edge" : ""} ${te ? "in-range" : ""} ${ve ? "has-bookmark" : ""}`,
                onClick: () => ce(Y),
                onMouseEnter: () => !d && a && p(Y),
                onMouseLeave: () => p(null),
                title: ve ? `${Pe.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: ue }),
                  ve && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (be) => {
                        be.stopPropagation(), j(!0), x(Y);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Pe.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Pe.length })
                      ]
                    }
                  )
                ]
              },
              Y
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: F, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Vd,
            {
              label: "START TIME (FROM)",
              value: m,
              onChange: (Y) => {
                F(), g(Y), W(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Vd,
            {
              label: "END TIME (TO)",
              value: k,
              onChange: (Y) => {
                F(), S(Y), W(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (ie.isAmbiguous || oe.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        ie.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
            ie.transition.labelBefore,
            " / ",
            ie.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: w === 1 ? "active" : "",
                onClick: () => I(1),
                children: [
                  "1st Occurrence (",
                  ie.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: w === 2 ? "active" : "",
                onClick: () => I(2),
                children: [
                  "2nd Occurrence (",
                  ie.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        oe.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            oe.transition.labelBefore,
            " / ",
            oe.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: O === 1 ? "active" : "",
                onClick: () => H(1),
                children: [
                  "1st Occurrence (",
                  oe.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: O === 2 ? "active" : "",
                onClick: () => H(2),
                children: [
                  "2nd Occurrence (",
                  oe.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: le && le.durationMs > _o ? "#f43f5e" : "#22d3ee" }, children: V }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Fe.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: re, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const kp = "extractor_incident_bookmarks_fallback", vx = ["itb_studio_bookmarks", "itb_bookmarks", kp];
function Nx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [i, a] = u.useState([]), [c, d] = u.useState(""), [N, m] = u.useState(!1), [g, k] = u.useState(!1), [S, b] = u.useState(null), [L, y] = u.useState(""), p = u.useCallback((R) => {
    vx.forEach((W) => {
      try {
        localStorage.setItem(W, JSON.stringify(R));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: R }));
  }, []), h = u.useCallback(async () => {
    m(!0);
    try {
      const R = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (R.ok) {
        const W = await R.json(), se = Array.isArray(W) ? W : [];
        a(se), p(se);
        return;
      }
    } catch (R) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", R);
    } finally {
      m(!1);
    }
    try {
      const R = localStorage.getItem(kp) || localStorage.getItem("itb_studio_bookmarks");
      R && a(JSON.parse(R));
    } catch {
    }
  }, [p]);
  if (u.useEffect(() => {
    e && h();
  }, [e, h]), !e) return null;
  const M = async () => {
    var ie, oe, le, Fe, V, Z;
    if (!c.trim() || g) return;
    const R = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((ie = n == null ? void 0 : n.timeRange) != null && ie.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), W = (n == null ? void 0 : n.inPointMs) ?? 0, se = (n == null ? void 0 : n.outPointMs) ?? (((oe = n == null ? void 0 : n.timeRange) == null ? void 0 : oe.durationMs) || 0), F = (n == null ? void 0 : n.playheadMs) ?? W, D = R + W, E = R + se, P = R + F, z = (n == null ? void 0 : n.selectedStationIds) || [], q = (n == null ? void 0 : n.selectedStationNames) || [], U = ((le = n == null ? void 0 : n.allStationIds) == null ? void 0 : le.length) > 0 ? n.allStationIds : z, ge = {
      title: c.trim(),
      startTime: ((Fe = n == null ? void 0 : n.timeRange) == null ? void 0 : Fe.start) || "",
      endTime: ((V = n == null ? void 0 : n.timeRange) == null ? void 0 : V.end) || "",
      baseEpochMs: R,
      timelineBaseEpochMs: R,
      inPointMs: W,
      outPointMs: se,
      playheadMs: F,
      inEpochMs: D,
      outEpochMs: E,
      playheadEpochMs: P,
      selectedStationIds: z,
      selectedStationNames: q,
      allStationIds: U,
      stationIds: z.length > 0 ? z : U,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    k(!0);
    try {
      const ce = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ge)
      });
      if (ce.ok) {
        const J = await ce.json(), Ne = [{
          ...ge,
          ...J.bookmark || {},
          inEpochMs: D,
          outEpochMs: E,
          playheadEpochMs: P,
          selectedStationIds: z,
          selectedStationNames: q,
          allStationIds: U,
          id: ((Z = J.bookmark) == null ? void 0 : Z.id) || J.id || `bm_${Date.now()}`
        }, ...i];
        a(Ne), p(Ne), d("");
      } else
        throw new Error(`Server returned ${ce.status}`);
    } catch (ce) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", ce);
      const re = [{
        ...ge,
        inEpochMs: D,
        outEpochMs: E,
        playheadEpochMs: P,
        selectedStationIds: z,
        selectedStationNames: q,
        allStationIds: U,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...i];
      a(re), p(re), d("");
    } finally {
      k(!1);
    }
  }, T = async (R, W) => {
    if (W.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const se = i.filter((F) => (F.id || F.startTime) !== R);
    a(se), p(se);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, { method: "DELETE" });
    } catch (F) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", F);
    }
  }, j = (R, W) => {
    W.stopPropagation(), b(R.id || R.startTime), y(R.title || R.name || "");
  }, v = async (R, W) => {
    if (W && W.stopPropagation(), !L.trim()) return;
    const se = i.find((E) => (E.id || E.startTime) === R), F = L.trim(), D = i.map(
      (E) => (E.id || E.startTime) === R ? { ...E, title: F, name: F } : E
    );
    a(D), p(D), b(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...se, title: F })
      });
    } catch (E) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", E);
    }
  }, x = (R) => {
    R.stopPropagation(), b(null);
  }, w = (R) => !R || isNaN(R) ? "--:--:--" : yt(R, o), I = (R) => {
    const W = R.startTime || R.StartTime, se = R.endTime || R.EndTime;
    if (!W) return "--";
    const F = String(W).replace("T", " ").substring(0, 19), D = se ? String(se).replace("T", " ").substring(0, 19) : F;
    return `${F} ➔ ${D}`;
  }, O = (R) => {
    let W = R.inEpochMs || R.InEpochMs, se = R.outEpochMs || R.OutEpochMs;
    if (!W || !se) {
      const F = R.timelineBaseEpochMs || R.baseEpochMs || (R.startTime ? new Date(String(R.startTime).replace(" ", "T")).getTime() : 0), D = R.inPointMs ?? R.InPointMs, E = R.outPointMs ?? R.OutPointMs;
      F && typeof D == "number" && typeof E == "number" && (D > 0 || E > 0) && (W = F + D, se = F + E);
    }
    if (W && se && !isNaN(W) && !isNaN(se) && W > 0) {
      const F = w(W), D = w(se), E = Math.max(0, se - W), P = Math.floor(E / 6e4), z = Math.floor(P / 60), q = P % 60, U = z > 0 ? `${z}h ${q}m` : `${P}m`;
      return { timeText: `${F} ➔ ${D}`, duration: U };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, H = (R) => {
    const W = R.selectedStationNames || [], se = R.selectedStationIds || R.cutStationIds || R.stationIds || [];
    return W.length > 0 ? W.join(", ") : se.length > 0 ? se.join(", ") : R.cutStationName ? R.cutStationName : R.activeStationName ? R.activeStationName : "All Stations in Scope";
  };
  return Ps.createPortal(
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
              onKeyDown: (R) => R.key === "Enter" && M(),
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
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: N ? "SYNCING..." : `${i.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: i.length === 0 && !N ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : i.map((R) => {
        var P, z, q;
        const W = R.id || R.startTime, se = S === W, F = O(R), D = H(R), E = ((P = R.allStationIds) == null ? void 0 : P.length) || ((z = R.selectedStationIds) == null ? void 0 : z.length) || ((q = R.stationIds) == null ? void 0 : q.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${se ? "is-editing" : ""}`,
            onClick: () => {
              se || (r && r(R), t());
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
                      value: L,
                      onChange: (U) => y(U.target.value),
                      onKeyDown: (U) => {
                        U.key === "Enter" && v(W, U), U.key === "Escape" && x(U);
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
                        onClick: (U) => v(W, U),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: x,
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
                    /* @__PURE__ */ s.jsx("strong", { children: I(R) })
                  ] }),
                  E > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    E,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: F.timeText }),
                    F.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      F.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${D}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: D })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (U) => U.stopPropagation(), children: [
                !se && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (U) => j(R, U),
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
                    onClick: (U) => T(W, U),
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
          W
        );
      }) })
    ] }) }),
    document.body
  );
}
function kx({
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
    let m = 1 / 0, g = 1 / 0, k = -1 / 0, S = -1 / 0;
    e.forEach((y) => {
      const p = y.x ?? y.X ?? 0, h = y.y ?? y.Y ?? 0, M = y.width ?? y.Width ?? 1920, T = y.height ?? y.Height ?? 1080;
      m = Math.min(m, p), g = Math.min(g, h), k = Math.max(k, p + M), S = Math.max(S, h + T);
    });
    const b = Math.max(1, k - m), L = Math.max(1, S - g);
    return { minX: m, minY: g, totalW: b, totalH: L };
  }, [e]);
  if (!e || e.length <= 1 || !i)
    return null;
  const a = e.find((m) => (m.displayId ?? m.DisplayId) === t) || e[0];
  e.indexOf(a);
  const N = ((a ? a.displayName ?? a.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim() || "SCREEN").toUpperCase();
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
          N,
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
              const k = m.displayId ?? m.DisplayId ?? `mon-${g}`, S = (m.x ?? m.X ?? 0) - i.minX, b = (m.y ?? m.Y ?? 0) - i.minY, L = m.width ?? m.Width ?? 1920, y = m.height ?? m.Height ?? 1080, p = k === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${p ? "is-active" : ""}`,
                  onClick: (h) => {
                    h.stopPropagation(), n == null || n(k);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: S + 10,
                        y: b + 10,
                        width: Math.max(10, L - 20),
                        height: Math.max(10, y - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: S + L / 2,
                        y: b + y / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: g + 1
                      }
                    )
                  ]
                },
                k
              );
            })
          }
        ) })
      ]
    }
  );
}
function wx(e) {
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
function jx(e, t) {
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
function Cx({
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
  outPointMs: N = 36e5,
  isLooping: m = !0,
  recordingSegments: g = {},
  globalGaps: k = [],
  showWatermark: S = !0,
  directorPlan: b,
  onOverrideDisplay: L,
  onResetOverride: y,
  viewMode: p,
  onViewModeChange: h,
  onOpenFullscreen: M,
  isPipSwapped: T,
  onPipSwapChange: j,
  className: v = ""
}) {
  const x = u.useRef(null), w = u.useRef(null), I = u.useRef(null), O = u.useRef(r), H = u.useRef(r), R = u.useRef(r), W = u.useRef(!1), se = u.useRef(null), F = u.useRef(o), D = u.useRef(!1);
  O.current = r;
  const E = e == null ? void 0 : e.id, P = e && (e.hostname || e.name) || "", z = u.useMemo(() => {
    var _e, Xe, Je, mt;
    const X = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((_e = e == null ? void 0 : e.displayTopology) == null ? void 0 : _e.displays) || ((Xe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Xe.Displays) || ((Je = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : Je.Displays) || ((mt = e == null ? void 0 : e.topology) == null ? void 0 : mt.displays) || [];
    if (!Array.isArray(X) || X.length === 0) return [];
    const me = X.length > 1 && X.every((Ze) => (Ze.X ?? Ze.x ?? 0) === 0 && (Ze.Y ?? Ze.y ?? 0) === 0);
    let we = 0;
    return X.map((Ze, Ge) => {
      const ct = Ze.Width || Ze.width || 1920, bt = Ze.Height || Ze.height || 1080, dt = me ? we : Ze.X ?? Ze.x ?? Ge * ct, Vt = me ? 0 : Ze.Y ?? Ze.y ?? 0;
      me && (we += ct);
      const yn = (Ze.displayId ?? Ze.DisplayId ?? `mon-${Ge}`).toLowerCase(), on = Ze.displayNumber ?? Ze.DisplayNumber ?? Ge + 1, Kt = (Ze.displayName || Ze.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${on}`, fr = !!(Ze.isPrimary ?? Ze.IsPrimary ?? Ge === 0);
      return {
        ...Ze,
        displayId: yn,
        DisplayId: yn,
        displayIndex: Ge,
        displayNumber: on,
        DisplayNumber: on,
        displayName: Kt,
        DisplayName: Kt,
        isPrimary: fr,
        IsPrimary: fr,
        x: dt,
        y: Vt,
        X: dt,
        Y: Vt,
        width: ct,
        height: bt,
        Width: ct,
        Height: bt
      };
    });
  }, [e]), q = z.length > 1, [U, ge] = u.useState(() => {
    if (!q) return "mon-0";
    try {
      const X = localStorage.getItem("itb_solo_viewmode");
      if (X) return X;
    } catch {
    }
    return "canvas";
  }), oe = q ? p !== void 0 ? p : U : "mon-0", le = u.useCallback((X) => {
    const me = typeof X == "function" ? X(oe) : X;
    ge(me);
    try {
      localStorage.setItem("itb_solo_viewmode", me);
    } catch {
    }
    h && h(me);
  }, [oe, h]), [Fe, V] = u.useState(!1), Z = T !== void 0 ? T : Fe, ce = u.useCallback((X) => {
    const me = typeof X == "function" ? X(Z) : X;
    V(me), j && j(me);
  }, [Z, j]), J = u.useMemo(() => {
    const X = b || (e == null ? void 0 : e.directorPlan);
    if (!X || !X.segments || X.segments.length === 0) return null;
    const me = t + r;
    return X.segments.find((we) => {
      const _e = we.startEpochMs ?? we.StartEpochMs ?? 0, Xe = we.endEpochMs ?? we.EndEpochMs ?? 0;
      return me >= _e && me <= Xe;
    }) || X.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t, r]), re = u.useMemo(() => {
    var X, me;
    if (!q) return "mon-0";
    if (oe === "split" || oe === "pip" || oe === "canvas" || oe === "all-displays") {
      const we = (((X = z[0]) == null ? void 0 : X.displayId) ?? "mon-0").toLowerCase(), _e = (((me = z[1]) == null ? void 0 : me.displayId) ?? "mon-1").toLowerCase();
      return Z ? _e : we;
    }
    return oe !== "director" ? oe.toLowerCase() : ((J == null ? void 0 : J.targetDisplayId) ?? (J == null ? void 0 : J.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [q, oe, J, z, Z]), Ne = u.useMemo(() => {
    var me;
    if (!q) return null;
    const X = z.find((we) => (we.displayId ?? we.DisplayId ?? "").toLowerCase() !== re);
    return X ? (X.displayId ?? X.DisplayId).toLowerCase() : (((me = z[1]) == null ? void 0 : me.displayId) || "mon-1").toLowerCase();
  }, [q, z, re]), Be = u.useMemo(() => {
    const X = z.find((we) => (we.displayId ?? "").toLowerCase() === (re || "").toLowerCase());
    if (X) return X.displayName || `Screen ${X.displayNumber || 1}`;
    if (re === "mon-0" || re === "0") return "Screen 1";
    if (re === "mon-1" || re === "1") return "Screen 2";
    const me = (re || "").match(/\d+/);
    if (me) {
      const we = parseInt(me[0], 10);
      return `Screen ${(re || "").startsWith("mon-") ? we + 1 : we}`;
    }
    return (re || "Screen 1").toUpperCase();
  }, [z, re]), Y = u.useMemo(() => {
    const X = z.find((me) => (me.displayId ?? "").toLowerCase() === (Ne || "").toLowerCase());
    return X ? X.displayName || `Screen ${X.displayNumber || 2}` : "Screen 2";
  }, [z, Ne]), G = u.useMemo(() => oe !== "director" && oe !== "split" && oe !== "pip" && oe !== "canvas" ? !0 : !!((J == null ? void 0 : J.isManualOverride) ?? (J == null ? void 0 : J.IsManualOverride)), [oe, J]), [ue, fe] = u.useState({}), ke = u.useRef(null), [Se, te] = u.useState({ width: 0, height: 0 }), Pe = u.useMemo(() => wx(z), [z]);
  u.useEffect(() => {
    if (!q || oe !== "canvas" && oe !== "all-displays" || o)
      return;
    const X = () => {
      const we = ke.current;
      if (!we) return;
      const _e = 48, Xe = 72, Je = Math.max(100, we.clientWidth - _e), mt = Math.max(100, we.clientHeight - Xe), Ze = Pe.totalWidth || 1920, Ge = Pe.totalHeight || 1080, ct = Ze / Ge;
      let bt = Je, dt = bt / ct;
      dt > mt && (dt = mt, bt = dt * ct), te({ width: Math.round(bt), height: Math.round(dt) });
    };
    X();
    const me = new ResizeObserver(X);
    return ke.current && me.observe(ke.current), () => me.disconnect();
  }, [q, oe, Pe]);
  const ve = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!q || oe !== "canvas" && oe !== "all-displays")
      return;
    let X = !0;
    const me = new AbortController(), we = ve;
    z.forEach((Xe, Je) => {
      const mt = (Xe.displayId ?? Xe.DisplayId ?? `mon-${Je}`).toLowerCase(), Ze = In.get(P, we, mt);
      Ze ? fe((Ge) => ({ ...Ge, [mt]: Ze })) : In.fetchFrame(P, we, me.signal, mt).then((Ge) => {
        X && Ge && fe((ct) => ({ ...ct, [mt]: Ge }));
      });
    });
    const _e = In.subscribe((Xe, Je, mt, Ze) => {
      Xe === P && Je === we && Ze && X && fe((Ge) => ({ ...Ge, [Ze.toLowerCase()]: mt }));
    });
    return () => {
      X = !1, me.abort(), _e();
    };
  }, [q, oe, z, P, ve]);
  const be = u.useRef(re), ze = u.useMemo(() => e ? g[e.id] || g[e.hostname] || e.segments || [] : [], [e, g]), Oe = t + r, je = u.useMemo(() => ze.length === 0 ? !0 : ze.some((X) => {
    const me = (X.startEpochMs ?? X.startEpoch ?? 0) - 2e3, we = (X.endEpochMs ?? X.endEpoch ?? 0) + 2e3;
    return Oe >= me && Oe <= we;
  }), [ze, Oe]), Ye = !je && ze.length > 0, [Ue, en] = u.useState("A"), [qe, Ke] = u.useState(""), [ln, Lt] = u.useState(""), [fn, He] = u.useState(""), [vt, Cn] = u.useState(null), [gt, Nt] = u.useState(!1), [En, wt] = u.useState(!1), [Rt, Bt] = u.useState(() => {
    if (!P) return null;
    const X = Math.round(t + r);
    return In.get(P, X, re) || null;
  }), [Xt, Ee] = u.useState(null), jt = Ue === "A" ? x : w, ye = u.useCallback(() => {
    const X = il();
    x.current && (x.current.volume = X.volume, x.current.muted = Ue !== "A" || X.isMuted, x.current.defaultPlaybackRate = a, x.current.playbackRate = a, Ue === "A" && !X.isMuted && Ei(x.current)), w.current && (w.current.volume = X.volume, w.current.muted = Ue !== "B" || X.isMuted, w.current.defaultPlaybackRate = a, w.current.playbackRate = a, Ue === "B" && !X.isMuted && Ei(w.current)), I.current && (I.current.muted = !0, I.current.defaultPlaybackRate = a, I.current.playbackRate = a);
  }, [Ue, a]);
  u.useEffect(() => {
    const X = (me) => {
      me.detail && (x.current && (x.current.volume = me.detail.volume), w.current && (w.current.volume = me.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", X), () => window.removeEventListener("itb-audio-state-changed", X);
  }, []), u.useEffect(() => {
    x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a), w.current && (w.current.defaultPlaybackRate = a, w.current.playbackRate = a), I.current && (I.current.defaultPlaybackRate = a, I.current.playbackRate = a);
  }, [a]), u.useEffect(() => {
    if (!E || !P) return;
    if (o) {
      F.current = !0;
      return;
    }
    const X = F.current;
    F.current = o;
    let me = !0;
    const we = new AbortController(), _e = Math.round(t + r), Xe = In.get(P, _e, re);
    if (Xe) {
      Bt(Xe);
      return;
    }
    const mt = setTimeout(() => {
      me && In.fetchFrame(P, _e, we.signal, re).then((Ge) => {
        me && Ge && Bt(Ge);
      });
    }, X ? 25 : 35), Ze = In.subscribe((Ge, ct, bt, dt) => {
      Ge === P && ct === _e && (!dt || dt === re) && me && Bt(bt);
    });
    return () => {
      me = !1, clearTimeout(mt), we.abort(), Ze();
    };
  }, [E, P, t, r, o, gt, re]), u.useEffect(() => {
    if (!q || oe !== "split" && oe !== "pip" || !Ne || o) {
      Ee(null);
      return;
    }
    let X = !0;
    const me = new AbortController(), we = Math.round(t + r), _e = In.get(P, we, Ne);
    if (_e) {
      Ee(_e);
      return;
    }
    const Xe = setTimeout(() => {
      X && In.fetchFrame(P, we, me.signal, Ne).then((mt) => {
        X && mt && Ee(mt);
      });
    }, 40), Je = In.subscribe((mt, Ze, Ge, ct) => {
      mt === P && Ze === we && (!ct || ct === Ne) && X && Ee(Ge);
    });
    return () => {
      X = !1, clearTimeout(Xe), me.abort(), Je();
    };
  }, [q, oe, Ne, E, P, t, r]);
  const Ce = u.useCallback((X, me = re) => {
    const we = Math.round(t), _e = Math.round(t + n), Xe = Math.min(_e, Math.max(we, Math.round(t + X)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(P)}&startEpoch=${we}&endEpoch=${_e}&seekEpoch=${Xe}&displayId=${encodeURIComponent(me)}&_t=${Date.now()}`;
  }, [t, n, P, re]);
  u.useEffect(() => {
    if (!(!E || !P))
      if (o && je) {
        const X = O.current;
        H.current = X, R.current = X, W.current = !1;
        const me = Ce(X, re);
        Nt(!1), wt(!0), en("A"), Ke(me), Lt(""), Cn(null), He((oe === "split" || oe === "pip") && Ne ? Ce(X, Ne) : "");
      } else o || (se.current && clearTimeout(se.current), W.current = !1, Ke(""), Lt(""), He(""), Cn(null), Nt(!1), wt(!1), x.current && x.current.pause(), w.current && w.current.pause(), I.current && I.current.pause());
  }, [o, E, P, je, Ce, re, oe, Ne]), u.useEffect(() => {
    if (be.current !== re && (be.current = re, o && je)) {
      const X = O.current;
      H.current = X;
      const me = Ce(X, re);
      Nt(!1), wt(!0), en("A"), Ke(me), Lt("");
    }
  }, [re, o, je, Ce]), u.useEffect(() => {
    if (!E || !P) return;
    const X = Math.abs(r - R.current);
    if (!o || X < 15) {
      R.current = r;
      return;
    }
    return W.current = !0, R.current = r, H.current = r, x.current && x.current.pause(), w.current && w.current.pause(), I.current && I.current.pause(), Nt(!1), wt(!0), se.current && clearTimeout(se.current), se.current = setTimeout(() => {
      if (!je) {
        Ke(""), Lt(""), He(""), wt(!1), W.current = !1;
        return;
      }
      const me = O.current, we = Ce(me, re);
      en("A"), Ke(we), Lt(""), Cn(null), (oe === "split" || oe === "pip") && Ne && He(Ce(me, Ne));
    }, 75), () => {
      se.current && clearTimeout(se.current);
    };
  }, [r, o, E, P, je, Ce, re, oe, Ne]), u.useEffect(() => {
    if (!o || !gt || ze.length === 0) return;
    const X = t + O.current, me = ze.map((we) => ({
      start: we.startEpochMs ?? we.startEpoch ?? 0,
      end: we.endEpochMs ?? we.endEpoch ?? 0
    })).filter((we) => we.start > X + 500).sort((we, _e) => we.start - _e.start)[0];
    if (me && (!vt || vt.start !== me.start)) {
      const we = me.start - t;
      if (we < N) {
        const _e = Ce(we, re);
        Cn({ start: me.start, ms: we }), Ue === "A" ? Lt(_e) : Ke(_e);
      }
    }
  }, [o, gt, r, t, N, ze, vt, Ue, Ce, re]);
  const We = u.useCallback(() => {
    if (vt) {
      const X = Ue === "A" ? "B" : "A", me = X === "A" ? x : w;
      en(X), H.current = vt.ms, R.current = vt.ms, Cn(null), me.current && me.current.play().then(() => {
        ye();
      }).catch(() => {
      });
    } else
      m ? l(d) : i(!1);
  }, [vt, Ue, ye, m, d, l, i]), pt = u.useCallback(() => {
    const X = jt.current;
    if (!X || W.current || !o || D.current) return;
    const me = X.currentTime * 1e3, we = Math.round(H.current + me);
    if (k && k.length > 0) {
      const _e = t + we, Xe = k.find((Je) => _e >= Je.startEpochMs && _e < Je.endEpochMs);
      if (Xe) {
        D.current = !0;
        const Je = Math.round(Xe.endEpochMs - t) + 10;
        l(Je), setTimeout(() => {
          D.current = !1;
        }, 150);
        return;
      }
    }
    if (we >= N) {
      m ? l(d) : (i(!1), l(N));
      return;
    }
    R.current = we, l(we);
  }, [jt, o, t, k, N, m, d, l, i]), Ct = En && o && !Ye;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${oe} ${v}`, children: [
    q && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (X) => X.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${oe === "director" ? "active" : ""}`,
          onClick: () => le("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${oe === "canvas" ? "active" : ""}`,
          onClick: () => le("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${oe === "split" ? "active" : ""}`,
          onClick: () => le("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${oe === "pip" ? "active" : ""}`,
          onClick: () => le("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      z.map((X, me) => {
        const we = (X.displayId ?? `mon-${me}`).toLowerCase(), _e = X.displayNumber ?? me + 1, Xe = X.displayName || `Screen ${_e}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${oe === we ? "active" : ""}`,
            onClick: () => le(we),
            title: `Pin directly to ${Xe}`,
            children: [
              "🖥️ ",
              _e
            ]
          },
          we
        );
      }),
      oe === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          z.map((X, me) => {
            const we = (X.displayId ?? `mon-${me}`).toLowerCase(), _e = X.displayNumber ?? me + 1, Xe = X.displayName || `Screen ${_e}`, Je = re === we;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${Je ? "active" : ""} ${G && Je ? "is-override" : ""}`,
                onClick: () => {
                  L == null || L(E, t + r, we);
                },
                title: `Punch ${Xe} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    _e
                  ] }),
                  Je && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: G ? "✋" : "⚡" })
                ]
              },
              `punch-${we}`
            );
          }),
          G && y && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                y == null || y(E, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    q && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${G ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: oe === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : oe === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : oe === "pip" ? `🪟 PiP MODE: ${Be.toUpperCase()} (HERO)` : `${G ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${Be.toUpperCase()}` }),
      G && oe === "director" && y && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => y == null ? void 0 : y(E, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    qe && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: x,
        src: qe,
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
        muted: Ue !== "A" || il().isMuted,
        onCanPlay: () => {
          ye(), o && Ue === "A" && x.current && x.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "A" && (W.current = !1, Nt(!0), wt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "A" && wt(!0);
        },
        onTimeUpdate: () => {
          var X;
          Ue === "A" && (!gt && ((X = x.current) == null ? void 0 : X.currentTime) > 0 && (W.current = !1, Nt(!0), wt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a)), pt());
        },
        onError: () => {
          Ue === "A" && (W.current = !1, wt(!1), Nt(!1));
        },
        onEnded: () => {
          Ue === "A" && We();
        }
      }
    ),
    ln && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: w,
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
        muted: Ue !== "B" || il().isMuted,
        onCanPlay: () => {
          ye(), o && Ue === "B" && w.current && w.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "B" && (W.current = !1, Nt(!0), wt(!1), w.current && (w.current.defaultPlaybackRate = a, w.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "B" && wt(!0);
        },
        onTimeUpdate: () => {
          var X;
          Ue === "B" && (!gt && ((X = w.current) == null ? void 0 : X.currentTime) > 0 && (W.current = !1, Nt(!0), wt(!1), w.current && (w.current.defaultPlaybackRate = a, w.current.playbackRate = a)), pt());
        },
        onError: () => {
          Ue === "B" && (W.current = !1, wt(!1), Nt(!1));
        },
        onEnded: () => {
          Ue === "B" && We();
        }
      }
    ),
    oe !== "split" && oe !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: gt ? 0 : 2 },
        children: Ye ? /* @__PURE__ */ s.jsx(pp, { isPlaying: o }) : Rt && Rt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Rt,
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
    oe === "split" && q && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Rt && Rt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Rt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        Xt && Xt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Xt, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    oe === "pip" && q && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (X) => {
          X.stopPropagation(), ce((me) => !me);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              Y.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          Xt && Xt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Xt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (oe === "canvas" || oe === "all-displays") && q && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: ke, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: Se.width ? `${Se.width}px` : "92%",
            height: Se.height ? `${Se.height}px` : "auto",
            aspectRatio: `${Pe.totalWidth} / ${Pe.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: z.map((X, me) => {
            const we = jx(X, Pe), _e = (X.displayId ?? X.DisplayId ?? `mon-${me}`).toLowerCase(), Xe = ue[_e] || (_e === re ? Rt : null), Je = !!(X.isPrimary ?? X.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${Je ? "is-primary" : ""}`,
                style: {
                  left: `${we.leftPct}%`,
                  top: `${we.topPct}%`,
                  width: `${we.widthPct}%`,
                  height: `${we.heightPct}%`
                },
                onClick: (mt) => {
                  mt.stopPropagation(), M ? M(_e) : le(_e);
                },
                title: `Display ${me + 1} (${X.width || 1920}x${X.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      Je ? "★ " : "",
                      "🖥 ",
                      me + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: X.displayName || X.DisplayName || _e.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      X.width || 1920,
                      "x",
                      X.height || 1080
                    ] }),
                    M && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (mt) => {
                          mt.stopPropagation(), M(_e);
                        },
                        title: `Open Display ${me + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Xe && Xe !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Xe,
                      className: "canvas-frame-img",
                      alt: _e
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      X.displayName || _e.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              _e
            );
          })
        }
      )
    ] }),
    Ct && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          P,
          " • ",
          re.toUpperCase()
        ] })
      ] })
    ] }) }),
    oe === "director" && J && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        re.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        yt(J.startEpochMs ?? J.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        yt(J.endEpochMs ?? J.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    q && oe !== "canvas" && /* @__PURE__ */ s.jsx(
      kx,
      {
        displays: z,
        activeDisplayId: re,
        mode: G ? "MANUAL" : "AUTO",
        activeTimeRange: J ? `${yt(J.startEpochMs ?? J.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${yt(J.endEpochMs ?? J.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (X) => {
          L && L(E, t + r, X), le(X);
        }
      }
    ),
    S && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      P
    ] }) })
  ] });
}
const Ca = 2200, Ea = 400;
function Ex({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], N = d.epochMs + Zo, m = e - N;
      if (m >= 0 && m <= Ca)
        return {
          ...d,
          elapsed: m
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let i = 1;
  if (o.elapsed > Ca - Ea) {
    const c = (o.elapsed - (Ca - Ea)) / Ea;
    i = Math.max(0, 1 - c);
  }
  if (i <= 0.05) return null;
  if (r === "CAPTION") {
    const c = xp(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const a = gp(o.keyCombination);
  return a.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: a.map((c, d) => /* @__PURE__ */ s.jsxs(ho.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < a.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const Sx = [
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
function wp({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Sx.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const Kd = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), i = r % 60, a = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(i)}.${c(a)}`;
};
function bx({
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
  onZoomChange: N,
  onZoomReset: m,
  onFitRange: g,
  onJumpViewportTo: k,
  viewportStartMs: S = 0,
  onViewportStartChange: b,
  playheadMs: L = 0,
  playheadEpochMs: y = 0,
  setPlayheadMs: p,
  inPointMs: h = 0,
  setInPointMs: M,
  outPointMs: T = 36e5,
  setOutPointMs: j,
  recordingSegments: v = {},
  globalGaps: x = [],
  onExport: w,
  isPlaying: I,
  setIsPlaying: O,
  isLooping: H = !0,
  setIsLooping: R,
  playbackSpeed: W,
  setPlaybackSpeed: se,
  keystrokeMode: F = "BURN_IN",
  onChangeKeystrokeMode: D,
  keystrokes: E = [],
  showRulerKeystrokes: P = !1,
  onToggleRulerKeystrokes: z,
  directorPlan: q,
  onOverrideDisplay: U,
  onSplitDirectorSegment: ge,
  onChangeDirectorSegmentDisplay: ie,
  onResetDirectorSegmentToAuto: oe
}) {
  var Xt, Ee, jt;
  const [le, Fe] = u.useState(!1), V = I !== void 0 ? I : le, Z = u.useCallback((ye) => {
    const Ce = typeof ye == "function" ? ye(V) : ye;
    O ? O(Ce) : Fe(Ce), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Ce } }));
  }, [V, O]), [ce, J] = u.useState(!0), re = H !== void 0 ? H : ce, Ne = R || J, [Be, Y] = u.useState(1), G = W !== void 0 ? W : Be, ue = se || Y, [fe, ke] = u.useState(null), [Se, te] = u.useState(!1), [Pe, ve] = u.useState(x), be = ((Xt = t == null ? void 0 : t.displays) == null ? void 0 : Xt.length) > 1 || ((jt = (Ee = t == null ? void 0 : t.topology) == null ? void 0 : Ee.displays) == null ? void 0 : jt.length) > 1, [ze, Oe] = u.useState(() => {
    if (!be) return "mon-0";
    if (n) return n;
    try {
      const ye = localStorage.getItem("itb_spotlight_viewmode");
      if (ye) return ye;
    } catch {
    }
    return "canvas";
  }), je = u.useCallback((ye) => {
    Oe((Ce) => {
      const We = typeof ye == "function" ? ye(Ce) : ye;
      try {
        localStorage.setItem("itb_spotlight_viewmode", We);
      } catch {
      }
      return We;
    });
  }, []), [Ye, Ue] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!be) {
        Oe("mon-0");
        return;
      }
      if (n)
        Oe(n);
      else
        try {
          const ye = localStorage.getItem("itb_spotlight_viewmode");
          Oe(ye || "canvas");
        } catch {
          Oe("canvas");
        }
    }
  }, [e, n, be, t == null ? void 0 : t.id]);
  const en = u.useRef(null), qe = u.useRef(d);
  qe.current = d;
  const Ke = u.useRef(S);
  Ke.current = S;
  const ln = u.useRef(c);
  ln.current = c;
  const Lt = u.useRef(t && t.id);
  u.useEffect(() => {
    var ye, Ce, We;
    t && t.id && Lt.current !== t.id && (Lt.current = t.id, ue(1), ((ye = t.displays) == null ? void 0 : ye.length) > 1 || ((We = (Ce = t.topology) == null ? void 0 : Ce.displays) == null ? void 0 : We.length) > 1 || je("mon-0"));
  }, [t, ue]);
  const fn = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const ye = en.current;
    if (!ye || !N || !b) return;
    const Ce = (We) => {
      We.preventDefault(), We.stopPropagation();
      const pt = We.ctrlKey || We.shiftKey, Ct = qe.current, X = Ke.current, me = ln.current || 36e5;
      if (pt) {
        const we = Math.abs(We.deltaX) > Math.abs(We.deltaY) ? We.deltaX : We.deltaY;
        if (we === 0) return;
        const _e = me / Ct, Xe = Math.max(0, me - _e), Je = _e * 0.08 * (we > 0 ? 1 : -1), mt = Math.max(0, Math.min(Xe, X + Je));
        Ke.current = mt, b(mt);
      } else {
        if (We.deltaY === 0) return;
        const _e = We.deltaY < 0 ? 1.25 : 0.8, Xe = ye.getBoundingClientRect(), Je = Xe.left + 150, mt = Xe.right - 58, Ze = Math.max(100, mt - Je);
        let Ge = 0.5;
        We.clientX >= Je && We.clientX <= mt ? Ge = (We.clientX - Je) / Ze : Xe.width > 0 && (Ge = Math.max(0, Math.min(1, (We.clientX - Xe.left) / Xe.width)));
        const ct = Math.max(32, me / 2e3), bt = Math.max(1, Math.min(ct, Math.round(Ct * _e * 100) / 100));
        if (bt === Ct) return;
        const dt = me / Ct, Vt = me / bt, on = X + Ge * dt - Ge * Vt, ks = Math.max(0, me - Vt), hs = Math.max(0, Math.min(ks, on));
        qe.current = bt, Ke.current = hs, b(hs), N(bt);
      }
    };
    return ye.addEventListener("wheel", Ce, { passive: !1, capture: !0 }), () => ye.removeEventListener("wheel", Ce, { capture: !0 });
  }, [e, t, N, b]);
  const He = u.useCallback(() => {
    m ? m() : (Ke.current = 0, qe.current = 1, b == null || b(0), N == null || N(1));
  }, [m, b, N]), vt = u.useCallback((ye, Ce) => {
    if (g)
      g(ye, Ce);
    else {
      const We = Math.max(1e3, Ce - ye), pt = Math.max(500, We * 0.05), Ct = Math.max(0, ye - pt), me = Math.min(c, Ce + pt) - Ct, we = Math.max(32, c / 2e3), _e = Math.max(1, Math.min(we, Number((c / me).toFixed(1)))), Xe = c / _e, Je = Math.max(0, Math.min(Ct, c - Xe));
      Ke.current = Je, qe.current = _e, b == null || b(Je), N == null || N(_e);
    }
  }, [g, c, b, N]), Cn = u.useCallback((ye, Ce = "center") => {
    if (k)
      k(ye, Ce);
    else {
      if (ye == null) return;
      const We = qe.current || 1, pt = c / Math.max(1, We), Ct = Ce === "start" ? pt / 4 : pt * 0.75, X = Math.max(0, Math.min(ye - Ct, c - pt));
      Ke.current = X, b == null || b(X);
    }
  }, [k, c, b]), gt = u.useCallback(() => {
    Z((ye) => !ye);
  }, [Z]), Nt = u.useCallback(async () => {
    var pt;
    if (!t || Math.abs(T - h) < 1e3) return;
    const ye = (F || "NONE").toUpperCase().replace("-", "_");
    let Ce;
    ye === "NONE" || ye === "OFF" ? Ce = "None" : ye === "CAPTION" ? Ce = "Caption" : Ce = "BurnIn";
    const We = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: i + Math.round(h),
      outEpochMs: i + Math.round(T),
      keystrokeMode: Ce,
      layoutMode: be ? ze : "mon-0",
      targetDisplayId: !be || ze === "mon-0" || ze === "mon-1" || ze.startsWith("mon-") ? be ? ze : "mon-0" : null,
      isPipSwapped: Ye,
      directorSegments: be ? (q == null ? void 0 : q.segments) || ((pt = t == null ? void 0 : t.directorPlan) == null ? void 0 : pt.segments) || [] : []
    };
    try {
      w ? await w(We) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(We)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(We)
      });
    } catch (Ct) {
      console.warn("[SoloSpotlightModal] Export trigger error:", Ct);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, h, T, i, w, F, ze, Ye, q]);
  u.useEffect(() => {
    if (!e || !t) return;
    const ye = (Ce) => {
      if ((Ce.ctrlKey || Ce.metaKey) && (Ce.key === "e" || Ce.key === "E")) {
        Ce.preventDefault(), Nt();
        return;
      }
      if (Ce.key === "?" || Ce.shiftKey && Ce.code === "Slash") {
        Ce.preventDefault(), te((We) => !We);
        return;
      }
      if (Se) {
        Ce.key === "Escape" && te(!1);
        return;
      }
      if (Ce.key === "Escape" || Ce.code === "Escape") {
        Ce.preventDefault(), Ce.stopPropagation(), o == null || o();
        return;
      }
      if (Ce.code === "Space") {
        Ce.preventDefault(), gt();
        return;
      }
      if (Ce.code === "KeyI") {
        Ce.preventDefault(), M(Math.max(0, Math.min(L, T - 1e3)));
        return;
      }
      if (Ce.code === "KeyO") {
        Ce.preventDefault(), j(Math.min(c, Math.max(L, h + 1e3)));
        return;
      }
      if (Ce.code === "ArrowLeft" || Ce.code === "ArrowRight") {
        Ce.preventDefault(), Z(!1);
        const We = Ce.code === "ArrowLeft";
        let pt;
        if (Ce.ctrlKey || Ce.metaKey)
          pt = 33;
        else if (Ce.shiftKey)
          pt = 5e3;
        else {
          const Ct = Math.max(1, d);
          pt = Math.max(33, Math.round(1e3 / Ct));
        }
        p((Ct) => {
          const X = We ? Ct - pt : Ct + pt;
          return Math.max(0, Math.min(c, X));
        });
        return;
      }
      if (Ce.key === "ArrowDown") {
        Ce.preventDefault();
        const We = r.findIndex((pt) => pt.id === t.id);
        if (We !== -1) {
          const pt = (We + 1) % r.length;
          l(r[pt].id);
        }
        return;
      }
      if (Ce.key === "ArrowUp") {
        Ce.preventDefault();
        const We = r.findIndex((pt) => pt.id === t.id);
        if (We !== -1) {
          const pt = (We - 1 + r.length) % r.length;
          l(r[pt].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", ye, { capture: !0 }), () => window.removeEventListener("keydown", ye, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    L,
    h,
    T,
    c,
    d,
    M,
    j,
    p,
    Nt,
    gt,
    Z,
    Se
  ]);
  const En = r.findIndex((ye) => ye.id === (t && t.id)), wt = r[En - 1], Rt = r[En + 1];
  if (!e || !t) return null;
  const Bt = y > 0 ? y : Math.round(i + L);
  return Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      fe && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${fe.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          fe.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          fe.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          fe.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: fe.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Kd(T - h),
            " (",
            yt(i + h, a),
            " → ",
            yt(i + T, a),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Cx,
          {
            station: t,
            baseEpochMs: i,
            totalDurationMs: c,
            playheadMs: L,
            setPlayheadMs: p,
            isPlaying: V,
            setIsPlaying: Z,
            playbackSpeed: G,
            timeMode: a,
            inPointMs: h,
            outPointMs: T,
            isLooping: re,
            recordingSegments: v,
            globalGaps: Pe,
            showWatermark: !0,
            directorPlan: q || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: U,
            onResetOverride: oe,
            viewMode: ze,
            onViewModeChange: je,
            isPipSwapped: Ye,
            onPipSwapChange: Ue
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ex,
          {
            currentEpochMs: Bt,
            keystrokes: E,
            keystrokeMode: F
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
              onClick: (ye) => {
                ye.preventDefault(), ye.stopPropagation(), o == null || o();
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
              onClick: () => te(!0),
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
              disabled: !wt,
              onClick: () => wt && l(wt.id),
              title: wt ? `Previous: ${wt.displayName || wt.roleAlias || wt.hostname || wt.name} (↑)` : "First station",
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
              disabled: !Rt,
              onClick: () => Rt && l(Rt.id),
              title: Rt ? `Next: ${Rt.displayName || Rt.roleAlias || Rt.hostname || Rt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${V ? "is-playing-dimmed" : ""}`, ref: en, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Kd(T - h) })
            ] }),
            (() => {
              const ye = ze === "mon-0" ? "SCREEN 1" : ze === "mon-1" ? "SCREEN 2" : ze.startsWith("mon-") ? `SCREEN ${parseInt(ze.slice(4)) + 1}` : ze.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: Nt,
                  title: `Export Selected Cut Window as ${ye} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: ze === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${ye})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            mp,
            {
              activeStationId: t.id,
              isPlaying: V,
              setIsPlaying: gt,
              isLooping: re,
              setIsLooping: Ne,
              playbackSpeed: G,
              onChangeSpeed: ue,
              baseEpochMs: i,
              timeMode: a,
              totalDurationMs: c,
              inPointMs: h,
              setInPointMs: M,
              outPointMs: T,
              setOutPointMs: j,
              onSetInPoint: () => M(Math.max(0, Math.min(L, T - 1e3))),
              onSetOutPoint: () => j(Math.min(c, Math.max(L, h + 1e3))),
              onStepFrameBackward: () => {
                Z(!1), p((ye) => Math.max(0, ye - 33));
              },
              onStepFrameForward: () => {
                Z(!1), p((ye) => Math.min(c, ye + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: yt(i + L, a) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          vp,
          {
            stations: fn,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: i,
            timeMode: a,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: N,
            onZoomReset: He,
            onFitRange: vt,
            onJumpViewportTo: Cn,
            viewportStartMs: S,
            onViewportStartChange: b,
            playheadMs: L,
            setPlayheadMs: (ye) => {
              Z(!1), p(ye);
            },
            inPointMs: h,
            setInPointMs: M,
            outPointMs: T,
            setOutPointMs: j,
            recordingSegments: v,
            onExport: Nt,
            onEstimateLoaded: (ye) => {
              ye != null && ye.removedGlobalGaps && ve(ye.removedGlobalGaps);
            },
            keystrokeMode: F,
            onChangeKeystrokeMode: D,
            keystrokes: E,
            showKeystrokes: P,
            showRulerKeystrokes: P,
            onToggleRulerKeystrokes: z,
            onSplitDirectorSegment: ge,
            onChangeDirectorSegmentDisplay: ie,
            onResetDirectorSegmentToAuto: oe
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        wp,
        {
          isOpen: Se,
          onClose: () => te(!1)
        }
      )
    ] }),
    document.body
  );
}
function jp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), i = u.useRef(!1), a = u.useRef(0), [c, d] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [N, m] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), g = u.useCallback(async () => {
    if (!i.current && !(typeof document < "u" && document.hidden)) {
      i.current = !0;
      try {
        let v = await fetch("/api/v1/extractor-advanced/jobs");
        if (v.ok || (v = await fetch("/api/v1/extractor/jobs")), v.ok) {
          a.current = 0;
          const x = await v.json(), w = Array.isArray(x) ? x : [];
          n(w), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: w }));
        } else
          a.current++;
      } catch (v) {
        a.current++, a.current <= 2 && console.warn("[ExportJobMonitor] Polling error:", v);
      } finally {
        i.current = !1;
      }
    }
  }, []);
  u.useEffect(() => {
    let v = !0, x = null;
    const w = () => {
      if (!v) return;
      let O = 2500;
      typeof document < "u" && document.hidden ? O = 3e4 : a.current > 0 && (O = Math.min(3e4, 2500 * Math.pow(2, Math.min(a.current, 4)))), x = setTimeout(async () => {
        await g(), w();
      }, O);
    }, I = () => {
      !document.hidden && v && (clearTimeout(x), a.current = 0, g().then(w));
    };
    return document.addEventListener("visibilitychange", I), g().then(w), () => {
      v = !1, clearTimeout(x), document.removeEventListener("visibilitychange", I);
    };
  }, [g]), u.useEffect(() => {
    const v = () => {
      m(!0), g();
    };
    return window.addEventListener("open-export-monitor", v), () => window.removeEventListener("open-export-monitor", v);
  }, [g]), u.useEffect(() => {
    if (!N || c) return;
    const v = (x) => {
      o.current && !o.current.contains(x.target) && !x.target.closest(".export-floating-hud") && m(!1);
    };
    return document.addEventListener("pointerdown", v), () => document.removeEventListener("pointerdown", v);
  }, [N, c]);
  const k = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && k)
    return null;
  const S = t.filter((v) => v.status === "Processing" || v.status === "Queued"), b = t.filter((v) => v.status === "Completed" || v.isCompleted), L = () => {
    d((v) => {
      const x = !v;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(x));
      } catch {
      }
      return x;
    });
  }, y = () => {
    m(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, p = (v, x) => {
    x.stopPropagation(), !(!v || r.has(v)) && (l((w) => new Set(w).add(v)), setTimeout(() => {
      n((w) => {
        const I = w.filter((O) => (O.jobId || O.id) !== v);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: I })), I;
      }), l((w) => {
        const I = new Set(w);
        return I.delete(v), I;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${v}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${v}`, { method: "DELETE" })).catch((w) => console.warn("[ExportJobMonitor] Dismiss failed:", w)));
  }, h = async (v, x) => {
    x.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${v}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${v}/bookmark`, { method: "POST" })), g();
    } catch (w) {
      console.warn("[ExportJobMonitor] Bookmark failed:", w);
    }
  }, M = (v, x) => {
    x.stopPropagation();
    const w = v.networkFolderPath || (v.outputFilePath ? v.outputFilePath.substring(0, v.outputFilePath.lastIndexOf("\\")) : "");
    w && (navigator.clipboard.writeText(w), alert(`UNC Directory Path copied to clipboard:
${w}`));
  }, T = (v) => {
    const x = v.jobId || v.id, w = `/api/v1/extractor-advanced/jobs/${x}/download`, I = document.createElement("a");
    I.href = w, I.download = v.fileName || `archive_${x}.tar`, document.body.appendChild(I), I.click(), document.body.removeChild(I), setTimeout(g, 1e3);
  }, j = (v) => {
    if (!v || v <= 0) return "0 B";
    const x = v / (1024 * 1024);
    return x >= 1e3 ? `${(x / 1024).toFixed(2)} GB` : `${x.toFixed(1)} MB`;
  };
  return t.length === 0 && !N ? null : Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !N && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${S.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => m(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${S.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: S.length > 0 ? `EXPORTS: ${S.length} PACKAGING` : `${b.length} ARCHIVE${b.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${S.length > 0 ? "" : "ready"}`, children: S.length > 0 ? `${S[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      N && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && m(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (v) => v.stopPropagation(), children: [
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
                onClick: L,
                title: c ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: c ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: y, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((v) => {
          const x = v.status === "Completed" || v.isCompleted, w = v.status === "Failed" || v.isFailed, I = v.status === "Processing" || v.status === "Queued", O = v.jobId || v.id, H = r.has(O), R = x ? 100 : Math.round(v.progressPercent || v.progressPercentage || v.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${v.status.toLowerCase()} ${v.isBookmarked ? "is-bookmarked" : ""} ${H ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${v.status.toLowerCase()}`, children: x ? "READY" : v.status }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: v.fileName, children: v.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (W) => p(O, W),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                I && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: v.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      R,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, R)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      j(v.fileSizeBytes)
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "telemetry-tags", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "speed", children: v.speedMBps > 0 ? `${v.speedMBps.toFixed(1)} MB/s` : "Analyzing" }),
                      v.estimatedSecondsRemaining > 0 && /* @__PURE__ */ s.jsxs("span", { className: "eta", children: [
                        "ETA ~",
                        Math.ceil(v.estimatedSecondsRemaining),
                        "s"
                      ] })
                    ] })
                  ] })
                ] }),
                x && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: j(v.fileSizeBytes) })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "DOWNLOADS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val", children: [
                      "📥 ",
                      v.downloadCount || 0
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "COMPLETED" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val", children: v.completedAtUtc ? new Date(v.completedAtUtc).toLocaleTimeString() : "--:--" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "RETENTION" }),
                    /* @__PURE__ */ s.jsx("span", { className: `val policy-tag ${v.isBookmarked ? "pinned" : ""}`, children: v.isBookmarked ? "★ PINNED" : "24H PURGE" })
                  ] })
                ] }),
                x && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${v.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (W) => h(O, W),
                        title: v.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: v.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (W) => M(v, W),
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
                      onClick: () => T(v),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                w && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  v.errorMessage || v.error || "Export failed"
                ] }) })
              ]
            },
            O
          );
        }) })
      ] }) })
    ] }),
    document.body
  );
}
function Mx({
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
    }, N = (m) => {
      l.current && !l.current.contains(m.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", N), window.addEventListener("keydown", d), () => {
      window.removeEventListener("mousedown", N), window.removeEventListener("keydown", d);
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
function Ix({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 1920, i = r.canvasHeight || 1080, a = o / i;
  let c;
  Math.abs(a - 32 / 9) < 0.15 ? c = "32:9 Dual Screen" : Math.abs(a - 21 / 9) < 0.15 ? c = "21:9 Ultrawide" : Math.abs(a - 16 / 10) < 0.15 ? c = "16:10 WUXGA" : Math.abs(a - 4 / 3) < 0.15 ? c = "4:3 Standard" : Math.abs(a - 16 / 9) < 0.15 ? c = "16:9 Broadcast" : c = `${Math.round(a * 100) / 100}:1 Custom`;
  const d = (v) => {
    const x = Math.round(v * a);
    return x - x % 2;
  }, N = (v, x) => {
    const w = Math.round(v * x / 2073600 * 6 * 10) / 10, I = Math.round(w * 60 / 8 * 10) / 10;
    return `~${w} Mbps (~${I} MB/min)`;
  }, m = [
    {
      id: "NATIVE",
      badge: `Native 1:1 (${o}×${i})`,
      res: `${o} × ${i}`,
      bitrate: N(o, i),
      desc: "Exact 1:1 canvas match (Recommended). Preserves original recorded pixel fidelity without scaling or distortion."
    },
    {
      id: "4K",
      badge: `4K UHD (${d(2160)}×2160)`,
      res: `${d(2160)} × 2160`,
      bitrate: N(d(2160), 2160),
      desc: "Maximum resolution. Uncompromised multi-monitor canvas clarity for NOC video walls."
    },
    {
      id: "2K",
      badge: `2K QHD (${d(1440)}×1440)`,
      res: `${d(1440)} × 1440`,
      bitrate: N(d(1440), 1440),
      desc: "High pixel density. Preserves small fonts, HUD telemetry, and detailed application windows."
    },
    {
      id: "HD",
      badge: `HD 720p (${d(720)}×720)`,
      res: `${d(720)} × 720`,
      bitrate: N(d(720), 720),
      desc: "Compact file size, rapid export. Ideal for low-bandwidth operational networks or fast triage."
    }
  ], [g, k] = u.useState("BurnIn"), [S, b] = u.useState(r.resolution || "NATIVE"), [L, y] = u.useState(!1);
  if (!e) return null;
  const p = async () => {
    y(!0);
    try {
      await n(g, S), t();
    } finally {
      y(!1);
    }
  }, h = (r.layout || "DIRECTOR").toUpperCase(), M = r.stationsCount || 1, T = r.audioSegmentsCount || 1, j = m.find((v) => v.id === S) || m[0];
  return Ps.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (v) => v.stopPropagation(), children: [
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
            /* @__PURE__ */ s.jsx("span", { className: "value", children: T > 1 ? `DYNAMIC ROUTING (${T} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK TRANSITIONS)" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: m.map((v) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${S === v.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: v.id,
              checked: S === v.id,
              onChange: () => b(v.id)
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "quality-card-body", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "quality-card-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "quality-badge", children: v.badge }),
              /* @__PURE__ */ s.jsx("span", { className: "quality-res", children: v.res })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-metric", children: v.bitrate }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-desc", children: v.desc })
          ] })
        ] }, v.id)) }),
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
                onChange: () => k("BurnIn")
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
                onChange: () => k("None")
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: L, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: p, disabled: L, children: L ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Tx(e, t, n, r, l = null) {
  const [o, i] = u.useState([]), [a, c] = u.useState({}), [d, N] = u.useState(!1), m = u.useRef(o);
  m.current = o;
  const g = u.useCallback(async () => {
    if (isNaN(e)) return;
    const b = e + t;
    N(!0);
    try {
      const L = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(b),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), y = await fetch(`/api/v1/extractor-advanced/stations?${L.toString()}`);
      if (y.ok) {
        const p = y.headers.get("content-type");
        if (p && p.includes("application/json")) {
          const h = await y.json(), T = (Array.isArray(h) ? h : h.stations || h.items || []).filter((j) => (j.recordingsCount || (j.segments ? j.segments.length : 0)) > 0).map((j) => {
            var v, x;
            return {
              id: String(j.id || j.stationId || j.agentId || j.hostname),
              hostname: j.hostname || "Station",
              roleAlias: j.roleAlias || null,
              roleHistory: j.roleHistory || [],
              displayName: j.displayName || j.roleAlias || j.hostname || "Station",
              isOnline: j.isOnline !== void 0 ? j.isOnline : !0,
              recordingsCount: j.recordingsCount || 0,
              segments: j.segments || [],
              displays: j.displays || j.Displays || ((v = j.displayTopology) == null ? void 0 : v.displays) || ((x = j.DisplayTopology) == null ? void 0 : x.Displays) || [],
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
            if (!j || j.length === 0) return T;
            const v = new Map(j.map((I) => [I.id, I]));
            let x = j.length !== T.length;
            const w = T.map((I) => {
              const O = v.get(I.id);
              return O ? O.isOnline === I.isOnline && O.displayName === I.displayName && O.roleAlias === I.roleAlias && O.feedSpec === I.feedSpec && O.recordingsCount === I.recordingsCount && O.fps === I.fps ? O : (x = !0, { ...O, ...I }) : (x = !0, I);
            });
            return x ? w : j;
          });
        }
      }
    } catch (L) {
      console.warn("[useStudioData] Failed fetching active stations:", L);
    } finally {
      N(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    g();
  }, [g]);
  const k = u.useMemo(() => {
    const b = /* @__PURE__ */ new Set();
    return o.forEach((L) => {
      L.id && b.add(L.id), L.hostname && b.add(L.hostname);
    }), Array.from(b).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!k || isNaN(e)) {
      c({});
      return;
    }
    let b = !0;
    return (async () => {
      try {
        const y = e + t, p = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(k)}&startEpoch=${e}&endEpoch=${y}`);
        if (p.ok && b) {
          const h = await p.json() || {}, M = {};
          (m.current || []).forEach((T) => {
            const j = h[T.id] || h[T.hostname] || h[T.displayName] || [];
            M[T.id] = j, M[T.hostname] = j;
          }), Object.keys(h).forEach((T) => {
            M[T] || (M[T] = h[T]);
          }), c(M);
        }
      } catch {
        b && c({});
      }
    })(), () => {
      b = !1;
    };
  }, [k, e, t]);
  const S = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let b = 1 / 0, L = -1 / 0;
    o.forEach((M) => {
      (a[M.id] || a[M.hostname] || M.segments || []).forEach((j) => {
        const v = j.startEpochMs ?? j.startEpoch ?? 0, x = j.endEpochMs ?? j.endEpoch ?? 0;
        v > 0 && v < b && (b = v), x > 0 && x > L && (L = x);
      });
    });
    let y = 1 / 0, p = -1 / 0;
    l && (a[l] || []).forEach((T) => {
      const j = T.startEpochMs ?? T.startEpoch ?? 0, v = T.endEpochMs ?? T.endEpoch ?? 0;
      j > 0 && j < y && (y = j), v > 0 && v > p && (p = v);
    });
    const h = (M) => M === 1 / 0 || M === -1 / 0 ? null : Math.max(0, Math.min(t, M - e));
    return {
      globalFirstMs: h(b),
      globalLastMs: h(L),
      currentFirstMs: h(y),
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
    movieBoundaries: S
  };
}
function Ax({
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
  initialPlaybackSpeed: N = 1,
  isGridMode: m = !1
}) {
  const [g, k] = u.useState(a), [S, b] = u.useState(c), [L, y] = u.useState(d), [p, h] = u.useState(N), M = u.useRef(null), T = u.useRef(null), j = o || l, v = u.useMemo(() => j ? i[j.id] || j.segments || [] : [], [j, i]), x = v.some((H) => {
    const R = H.startEpochMs ?? H.startEpoch ?? 0, W = H.endEpochMs ?? H.endEpoch ?? 0, se = e + g;
    return se >= R && se <= W;
  }), w = !!(!m && j && x);
  u.useEffect(() => {
    k((H) => H < t ? t : H > n ? (b(!1), n) : H);
  }, [t, n]);
  const I = u.useCallback((H) => {
    M.current || (M.current = H);
    const R = (H - M.current) * p, W = Math.min(R, 250 * p);
    M.current = H, k((se) => {
      let F = se + W;
      if (r && r.length > 0) {
        const D = e + F, E = r.find((P) => D >= P.startEpochMs && D < P.endEpochMs);
        E && (F = E.endEpochMs - e);
      }
      return F >= n && (L ? F = t : (b(!1), F = n)), F;
    }), S && (!w || m) && (T.current = requestAnimationFrame(I));
  }, [S, L, t, n, r, e, w, p, m]);
  u.useEffect(() => (S && (!w || m) ? (M.current = performance.now(), T.current = requestAnimationFrame(I)) : (T.current && cancelAnimationFrame(T.current), M.current = null), () => {
    T.current && cancelAnimationFrame(T.current);
  }), [S, I, w, m]);
  const O = u.useCallback(() => {
    if (S)
      b(!1);
    else {
      let H = g;
      const R = e + H, W = r == null ? void 0 : r.find((se) => R >= se.startEpochMs && R < se.endEpochMs);
      if (W)
        H = W.endEpochMs - e;
      else if (j && !x) {
        const se = v.map((F) => ({ start: F.startEpochMs ?? F.startEpoch ?? 0, end: F.endEpochMs ?? F.endEpoch ?? 0 })).filter((F) => F.start > R).sort((F, D) => F.start - D.start)[0];
        se && (H = se.start - e);
      }
      H !== g && k(H), b(!0);
    }
  }, [S, g, e, r, j, x, v]);
  return {
    playheadMs: g,
    setPlayheadMs: k,
    isPlaying: S,
    setIsPlaying: b,
    isLooping: L,
    setIsLooping: y,
    playbackSpeed: p,
    setPlaybackSpeed: h,
    togglePlaySmart: O
  };
}
function Rx(e) {
  return 1 - Math.pow(1 - e, 3);
}
function $x({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [i, a] = u.useState(r), c = u.useRef(null), d = u.useRef(i);
  d.current = i;
  const N = Math.max(32, t / 2e3), m = t / l, g = u.useCallback((L, y = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const p = d.current, h = L - p;
    if (Math.abs(h) < 1) return;
    const M = performance.now(), T = (j) => {
      const v = j - M, x = Math.min(1, v / y);
      a(Math.round(p + h * Rx(x))), x < 1 ? c.current = requestAnimationFrame(T) : c.current = null;
    };
    c.current = requestAnimationFrame(T);
  }, []), k = u.useCallback((L, y) => {
    const p = Math.max(1e3, y - L), h = Math.max(500, p * 0.05), M = Math.max(0, L - h), j = Math.min(t, y + h) - M, v = Math.max(1, Math.min(N, Number((t / j).toFixed(1)))), x = t / v, w = Math.max(0, Math.min(M, t - x));
    g(w), o(v);
  }, [t, N, g]), S = u.useCallback(() => {
    g(0), o(1);
  }, [g]), b = u.useCallback((L, y = "center") => {
    if (L == null) return;
    const p = y === "start" ? m / 4 : m * 0.75, h = Math.max(0, Math.min(L - p, t - m));
    g(h);
  }, [m, t, g]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    const L = e == null ? void 0 : e.current;
    if (!L) return;
    const y = (p) => {
      if (p.preventDefault(), p.stopPropagation(), p.ctrlKey || p.shiftKey) {
        const M = Math.abs(p.deltaX) > Math.abs(p.deltaY) ? p.deltaX : p.deltaY;
        if (M === 0) return;
        const T = t / l, j = Math.max(0, t - T), v = T * 0.08 * (M > 0 ? 1 : -1);
        a((x) => Math.max(0, Math.min(j, x + v)));
      } else {
        if (p.deltaY === 0) return;
        const T = p.deltaY < 0 ? 1.25 : 0.8, j = L.getBoundingClientRect(), v = Math.max(0, Math.min(j.width, p.clientX - j.left)), x = j.width > 0 ? v / j.width : 0.5;
        o((w) => {
          const I = Math.max(1, Math.min(N, Math.round(w * T * 100) / 100));
          if (I === w) return w;
          const O = t / w, H = t / I, W = i + x * O - x * H, se = Math.max(0, t - H);
          return a(Math.max(0, Math.min(se, W))), I;
        });
      }
    };
    return L.addEventListener("wheel", y, { passive: !1, capture: !0 }), () => L.removeEventListener("wheel", y, { capture: !0 });
  }, [e, t, l, i, N]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: i,
    setViewportStartMs: a,
    viewportDurationMs: m,
    animateViewportTo: g,
    fitRange: k,
    resetZoom: S,
    jumpViewportTo: b
  };
}
function Lx({
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
  outPointMs: N,
  setOutPointMs: m,
  totalTimelineDurationMs: g,
  zoomLevel: k = 1,
  togglePlaySmart: S,
  onToggleHelpModal: b,
  onSplitDirectorAtPlayhead: L,
  isModalActive: y = !1
}) {
  u.useEffect(() => {
    const p = (h) => {
      const M = h.target;
      if (!(M.tagName === "INPUT" || M.tagName === "TEXTAREA" || M.tagName === "SELECT" || M.isContentEditable || M.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), b == null || b();
          return;
        }
        if (!(y || t)) {
          if (h.code === "KeyI") {
            h.preventDefault(), d(Math.max(0, Math.min(i, N - 1e3)));
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
              h.preventDefault(), L == null || L();
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
            S();
            return;
          }
          if (h.key === "Home") {
            h.preventDefault(), a(c);
            return;
          }
          if (h.key === "End") {
            h.preventDefault(), a(N);
            return;
          }
          if (h.code === "ArrowLeft" || h.code === "ArrowRight") {
            h.preventDefault();
            const j = h.code === "ArrowLeft";
            let v;
            if (h.ctrlKey || h.metaKey)
              v = 33;
            else if (h.shiftKey)
              v = 5e3;
            else {
              const x = Math.max(1, k);
              v = Math.max(33, Math.round(1e3 / x));
            }
            a((x) => {
              const w = j ? x - v : x + v;
              return Math.max(0, Math.min(g, w));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const j = n.findIndex((v) => v.id === e);
            if (j === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const v = (j + 1) % n.length;
              l(n[v].id), o(1);
            } else {
              const v = (j - 1 + n.length) % n.length;
              l(n[v].id), o(1);
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
    N,
    m,
    g,
    k,
    S,
    b,
    L,
    y
  ]);
}
const Yd = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = Od(n, e), l = Od(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, Al = (e, t = null, n = "LOCAL") => {
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
    const c = o.substring(0, 8), d = yc(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const i = r.replace(" ", "T"), a = new Date(i).getTime();
  return isNaN(a) ? Date.now() : a;
};
function Ox() {
  var pn, vl;
  const e = u.useMemo(() => gg() || {}, []), [t, n] = u.useState(() => {
    var $, ee;
    return ($ = e.timeRange) != null && $.startEpochMs && ((ee = e.timeRange) != null && ee.endEpochMs) ? e.timeRange : Yd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, i] = u.useState(e.keystrokeMode || "BURN_IN"), [a, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    cg().catch(($) => console.warn("[Studio] DST init error:", $));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Al(t.start), [t.start, t.startEpochMs]), N = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), m = u.useMemo(() => d - N, [d, N]), g = u.useMemo(() => t.durationMs + 2 * N, [t.durationMs, N]), [k, S] = u.useState(e.selectedStationIds || []), [b, L] = u.useState(e.activeStationId || null), [y, p] = u.useState(null), [h, M] = u.useState(null), [T, j] = u.useState([]), [v, x] = u.useState(!1), [w, I] = u.useState(null), [O, H] = u.useState(() => {
    var $;
    return e.compositionScope || ((($ = e.selectedStationIds) == null ? void 0 : $.length) > 1 ? "inter-station" : "intra-station");
  }), [R, W] = u.useState(() => {
    try {
      const $ = localStorage.getItem("itb_composition_layout");
      if ($) return $;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), se = u.useCallback(($) => {
    W((ee) => {
      const B = typeof $ == "function" ? $(ee) : $;
      try {
        localStorage.setItem("itb_composition_layout", B);
      } catch {
      }
      return B;
    });
  }, []), [F, D] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [E, P] = u.useState(() => !!e.isPipSwapped), [z, q] = u.useState(() => e.audioRoutingPlan || null), [U, ge] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [ie, oe] = u.useState(!1), [le, Fe] = u.useState(null), [V, Z] = u.useState(() => e.canvasLayoutTimeline || null), [ce, J] = u.useState(0), re = u.useCallback(($) => {
    Z((ee) => {
      const B = [...(ee == null ? void 0 : ee.keyframes) || []], Le = B.findIndex((st) => Math.abs(st.timestampEpochMs - $) < 300);
      if (Le >= 0)
        return J(Le), ee;
      const $e = B[ce] || B[0], Ie = ($e == null ? void 0 : $e.layout) || le || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Ve = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round($),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Ie))
      }, ae = [...B, Ve].sort((st, xt) => st.timestampEpochMs - xt.timestampEpochMs), et = ae.findIndex((st) => st.timestampEpochMs === Math.round($));
      return J(et >= 0 ? et : 0), {
        ...ee || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: ae
      };
    });
  }, [ce, le]), Ne = u.useCallback(($, ee) => {
    Z((B) => !(B != null && B.keyframes) || B.keyframes.length === 0 ? B : kc(B, $, ee));
  }, []), Be = u.useCallback(($) => {
    Z((ee) => {
      if (!(ee != null && ee.keyframes) || ee.keyframes.length <= 1) return ee;
      const B = ee.keyframes.filter((Le, $e) => $e !== $);
      return J((Le) => Math.max(0, Le - 1)), { ...ee, keyframes: B };
    });
  }, []), Y = u.useCallback(($, ee) => {
    Z((B) => {
      if (!(B != null && B.keyframes) || B.keyframes.length === 0) return B;
      const Le = Math.round(ee), $e = typeof $ == "number" && B.keyframes[$] ? $ : B.keyframes.findIndex((ae) => ae.id === $);
      if ($e === -1) return B;
      const Ie = [...B.keyframes];
      Ie[$e] = {
        ...Ie[$e],
        timestampEpochMs: Le
      }, Ie.sort((ae, et) => ae.timestampEpochMs - et.timestampEpochMs);
      const Ve = Ie.findIndex((ae) => ae.timestampEpochMs === Le);
      return Ve >= 0 && J(Ve), {
        ...B,
        keyframes: Ie
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [G, ue] = u.useState({}), fe = u.useCallback(($) => {
    ue((ee) => ({
      ...ee,
      [$]: !(ee[$] ?? !0)
    }));
  }, []), ke = u.useCallback(($) => {
    S((ee) => ee.filter((B) => B !== $)), b === $ && L(null), y === $ && p(null), Z((ee) => {
      if (!ee || !ee.keyframes) return ee;
      const B = ee.keyframes.map((Le) => {
        var $e;
        return {
          ...Le,
          layout: {
            ...Le.layout,
            placements: ((($e = Le.layout) == null ? void 0 : $e.placements) || []).filter((Ie) => Ie.stationId !== $)
          }
        };
      });
      return { ...ee, keyframes: B };
    });
  }, [b, y]), Se = u.useCallback(($, ee) => {
    $.preventDefault(), $.stopPropagation();
    const B = 195, Le = 110, $e = Math.min($.clientX, window.innerWidth - B - 10), Ie = Math.min($.clientY, window.innerHeight - Le - 10);
    I({ x: $e, y: Ie, station: ee });
  }, []), te = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(g, e.inEpochMs - m)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(g, e.inPointMs)) : N, [e.inEpochMs, e.inPointMs, m, g, N]), Pe = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(te + 1e3, Math.min(g, e.outEpochMs - m)) : typeof e.outPointMs == "number" ? Math.max(te + 1e3, Math.min(g, e.outPointMs)) : N + t.durationMs, [e.outEpochMs, e.outPointMs, m, g, N, t.durationMs, te]), ve = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(g, e.playheadEpochMs - m)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(g, e.playheadMs)) : te, [e.playheadEpochMs, e.playheadMs, m, g, te]), [be, ze] = u.useState(te), [Oe, je] = u.useState(Pe), { allStations: Ye, recordingSegments: Ue, isLoadingStations: en, movieBoundaries: qe } = Tx(
    m,
    g,
    t,
    r,
    b
  ), Ke = u.useMemo(() => Ye.find(($) => $.id === b) || null, [Ye, b]), ln = u.useCallback(($, ee) => {
    Z((B) => {
      var xt, At;
      if (!B || !B.keyframes || B.keyframes.length === 0) return B;
      const Le = ce >= 0 && ce < B.keyframes.length ? ce : 0, $e = B.keyframes[Le], Ie = ((xt = $e == null ? void 0 : $e.layout) == null ? void 0 : xt.placements) || [], Ve = (ee || "mon-0").toLowerCase(), ae = Ie.findIndex((Et) => Et.stationId === $ && (Et.displayId || "mon-0").toLowerCase() === Ve);
      let et;
      if (ae >= 0)
        et = Ie.filter((Et, sn) => sn !== ae);
      else {
        const Et = Ye.find((Qn) => Qn.id === $), sn = ((At = Et == null ? void 0 : Et.displays) == null ? void 0 : At.find((Qn) => (Qn.displayId || "").toLowerCase() === Ve)) || { width: 1920, height: 1080 }, js = sn.width || 1920, Yt = sn.height || 1080, Sn = js / Yt, On = Sn >= 1 ? 640 : Math.round(360 * Sn), zi = Sn >= 1 ? Math.round(640 / Sn) : 360, Nl = {
          stationId: $,
          displayId: Ve,
          label: `${(Et == null ? void 0 : Et.displayName) || $} - ${sn.displayName || Ve}`,
          x: 120 + Ie.length * 40 % 800,
          y: 100 + Ie.length * 40 % 500,
          width: On,
          height: zi,
          sourceWidth: js,
          sourceHeight: Yt,
          nativeAspectRatio: Sn,
          aspectRatio: Sn,
          zIndex: Ie.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        et = [...Ie, Nl];
      }
      const st = [...B.keyframes];
      return st[Le] = {
        ...st[Le],
        layout: {
          ...st[Le].layout,
          placements: et
        }
      }, { ...B, keyframes: st };
    });
  }, [ce, Ye]), Lt = u.useMemo(() => !k || k.length === 0 ? [] : Ye.filter(($) => k.includes($.id)), [Ye, k]), fn = u.useMemo(() => Ye.find(($) => $.id === y) || null, [Ye, y]), He = !!(y && fn), vt = u.useRef("grid"), Cn = u.useRef(null), {
    playheadMs: gt,
    setPlayheadMs: Nt,
    isPlaying: En,
    setIsPlaying: wt,
    playbackSpeed: Rt,
    setPlaybackSpeed: Bt,
    isLooping: Xt,
    setIsLooping: Ee,
    togglePlaySmart: jt
  } = Ax({
    timelineBaseEpochMs: m,
    inPointMs: be,
    outPointMs: Oe,
    globalGaps: T,
    activeStation: Ke,
    spotlightStation: fn,
    recordingSegments: Ue,
    initialPlayheadMs: ve,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !b
  }), {
    zoomLevel: ye,
    setZoomLevel: Ce,
    viewportStartMs: We,
    setViewportStartMs: pt,
    resetZoom: Ct,
    fitRange: X,
    jumpViewportTo: me
  } = $x({
    containerRef: Cn,
    totalTimelineDurationMs: g,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [we, _e] = u.useState(!1), [Xe, Je] = u.useState(!1), [mt, Ze] = u.useState(!1), [Ge, ct] = u.useState(!1), [bt, dt] = u.useState(
    !!(e.isWorkspaceActive && ((pn = e.selectedStationIds) == null ? void 0 : pn.length) > 0)
  ), [Vt, yn] = u.useState([]);
  u.useEffect(() => {
    const $ = He && fn || Ke, ee = ($ == null ? void 0 : $.hostname) || ($ == null ? void 0 : $.displayName) || ($ == null ? void 0 : $.id), B = (o || "NONE").toUpperCase().replace("-", "_");
    if (!ee || !m || !(B !== "NONE" && B !== "OFF" || a)) {
      yn([]);
      return;
    }
    const $e = Math.max(0, m - 5e3), Ie = m + g + 5e3, Ve = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(ee)}&startEpoch=${$e}&endEpoch=${Ie}`, { signal: Ve.signal }).then((ae) => ae.ok ? ae.json() : []).then((ae) => yn(Array.isArray(ae) ? ae : [])).catch((ae) => {
      ae.name !== "AbortError" && yn([]);
    }), () => Ve.abort();
  }, [Ke, fn, He, m, g, o, a]), u.useEffect(() => {
    en || (Ye.length === 0 ? ((k.length > 0 || b || bt) && (S([]), L(null), p(null), dt(!1)), ct(!0), x(!0)) : (x(!1), S(($) => {
      const ee = $.filter((B) => Ye.some((Le) => Le.id === B));
      return ee.length !== $.length ? (ee.length === 0 && (dt(!1), ct(!0)), ee) : $;
    })));
  }, [en, Ye]);
  const on = u.useCallback(($) => {
    if ($ === null) {
      wt(!1), Bt(1), L(null);
      return;
    }
    $ !== b && Bt(1), L($);
  }, [b, wt, Bt]), ks = u.useCallback(($, ee = null) => {
    $ !== b && Bt(1), vt.current = k.length <= 1 || b ? "spotlight" : "grid", L($), p($), M(ee || null);
  }, [b, k.length, Bt]), hs = u.useCallback(() => {
    p(null), M(null), vt.current === "grid" && L(null);
  }, []), Kt = u.useMemo(() => {
    if (z != null && z.segments && z.segments.length > 0)
      return z;
    const $ = k[0] || b || "mon-0";
    return {
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + g,
          sourceStationId: $
        }
      ]
    };
  }, [z, k, b, m, g]), fr = u.useCallback(($) => {
    q((ee) => {
      const B = ee || Kt, Le = [...B.segments || []], $e = Le.findIndex((At) => {
        const Et = At.startEpochMs ?? At.StartEpochMs ?? 0, sn = At.endEpochMs ?? At.EndEpochMs ?? 0;
        return $ > Et + 500 && $ < sn - 500;
      });
      if ($e === -1) return ee;
      const Ie = Le[$e], Ve = Ie.startEpochMs ?? Ie.StartEpochMs ?? 0, ae = Ie.endEpochMs ?? Ie.EndEpochMs ?? 0, et = Ie.sourceStationId ?? Ie.SourceStationId ?? k[0], st = { startEpochMs: Ve, endEpochMs: $, sourceStationId: et }, xt = { startEpochMs: $, endEpochMs: ae, sourceStationId: et };
      return Le.splice($e, 1, st, xt), { ...B, segments: Le };
    });
  }, [Kt, k]), un = u.useCallback(($, ee) => {
    q((B) => {
      const Le = B || Kt, $e = (Le.segments || []).map((Ie) => {
        const Ve = Ie.startEpochMs ?? Ie.StartEpochMs ?? 0, ae = Ie.endEpochMs ?? Ie.EndEpochMs ?? 0;
        return $ >= Ve && $ <= ae ? { ...Ie, sourceStationId: ee } : Ie;
      });
      return { ...Le, segments: $e };
    }), ge(!1);
  }, [Kt]), Qt = u.useCallback(($, ee) => {
    q((B) => {
      const Le = B || Kt, $e = (Le.segments || []).map((Ie) => {
        const Ve = Ie.startEpochMs ?? Ie.StartEpochMs ?? 0, ae = Ie.endEpochMs ?? Ie.EndEpochMs ?? 0;
        return $ >= Ve && $ <= ae ? { ...Ie, gain: ee } : Ie;
      });
      return { ...Le, segments: $e };
    });
  }, [Kt]), _s = u.useCallback(() => {
    ge(($) => !$);
  }, []), [tn, Lr] = u.useState({}), Ln = u.useCallback(($) => {
    if (!$) return null;
    if (tn[$]) return tn[$];
    const ee = Ye.find((B) => B.id === $);
    return ee != null && ee.directorPlan ? ee.directorPlan : {
      stationId: $,
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + g,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [tn, Ye, m, g]), ws = u.useCallback(($, ee) => {
    $ && Lr((B) => {
      const Le = B[$] || Ln($), $e = [...Le.segments || []], Ie = $e.findIndex((sn) => {
        const js = sn.startEpochMs ?? sn.StartEpochMs ?? 0, Yt = sn.endEpochMs ?? sn.EndEpochMs ?? 0;
        return ee > js + 500 && ee < Yt - 500;
      });
      if (Ie === -1) return B;
      const Ve = $e[Ie], ae = Ve.startEpochMs ?? Ve.StartEpochMs ?? 0, et = Ve.endEpochMs ?? Ve.EndEpochMs ?? 0, st = Ve.targetDisplayId ?? Ve.TargetDisplayId ?? "mon-0", xt = !!(Ve.isManualOverride ?? Ve.IsManualOverride), At = { ...Ve, startEpochMs: ae, endEpochMs: ee, targetDisplayId: st, isManualOverride: xt }, Et = { ...Ve, startEpochMs: ee, endEpochMs: et, targetDisplayId: st, isManualOverride: xt };
      return $e.splice(Ie, 1, At, Et), { ...B, [$]: { ...Le, segments: $e } };
    });
  }, [Ln]), Me = u.useCallback(($, ee, B) => {
    $ && Lr((Le) => {
      const $e = Le[$] || Ln($), Ie = [...$e.segments || []];
      let Ve = Ie.findIndex((et) => {
        const st = et.startEpochMs ?? et.StartEpochMs ?? 0, xt = et.endEpochMs ?? et.EndEpochMs ?? 0;
        return ee > st && ee < xt;
      });
      if (Ve === -1 && (Ve = Ie.findIndex((et) => {
        const st = et.startEpochMs ?? et.StartEpochMs ?? 0, xt = et.endEpochMs ?? et.EndEpochMs ?? 0;
        return ee >= st && ee <= xt;
      })), Ve === -1) return Le;
      const ae = Ie[Ve];
      return Ie[Ve] = { ...ae, targetDisplayId: B, isManualOverride: !0 }, { ...Le, [$]: { ...$e, segments: Ie } };
    });
  }, [Ln]), Re = u.useCallback(($, ee) => {
    if (!$) return;
    const B = Ye.find(($e) => $e.id === $), Le = B == null ? void 0 : B.directorPlan;
    Lr(($e) => {
      var js;
      const Ie = $e[$] || Ln($), Ve = [...Ie.segments || []];
      let ae = Ve.findIndex((Yt) => {
        const Sn = Yt.startEpochMs ?? Yt.StartEpochMs ?? 0, On = Yt.endEpochMs ?? Yt.EndEpochMs ?? 0;
        return ee > Sn && ee < On;
      });
      if (ae === -1 && (ae = Ve.findIndex((Yt) => {
        const Sn = Yt.startEpochMs ?? Yt.StartEpochMs ?? 0, On = Yt.endEpochMs ?? Yt.EndEpochMs ?? 0;
        return ee >= Sn && ee <= On;
      })), ae === -1) return $e;
      const et = Ve[ae], st = et.startEpochMs ?? et.StartEpochMs ?? 0, xt = et.endEpochMs ?? et.EndEpochMs ?? 0, At = (st + xt) / 2, Et = (js = Le == null ? void 0 : Le.segments) == null ? void 0 : js.find((Yt) => {
        const Sn = Yt.startEpochMs ?? Yt.StartEpochMs ?? 0, On = Yt.endEpochMs ?? Yt.EndEpochMs ?? 0;
        return At >= Sn && At <= On;
      }), sn = Et ? Et.targetDisplayId ?? Et.TargetDisplayId ?? "mon-0" : "mon-0";
      return Ve[ae] = { ...et, targetDisplayId: sn, isManualOverride: !1 }, { ...$e, [$]: { ...Ie, segments: Ve } };
    });
  }, [Ye, Ln]), fs = u.useMemo(() => Lt.map(($) => ({
    ...$,
    directorPlan: tn[$.id] || $.directorPlan || Ln($.id)
  })), [Lt, tn, Ln]), vn = u.useMemo(() => Ke ? {
    ...Ke,
    directorPlan: tn[Ke.id] || Ke.directorPlan || Ln(Ke.id)
  } : null, [Ke, tn, Ln]), Or = u.useMemo(() => fn ? {
    ...fn,
    directorPlan: tn[fn.id] || fn.directorPlan || Ln(fn.id)
  } : null, [fn, tn, Ln]);
  Lx({
    activeStationId: b,
    spotlightStationId: y,
    timelineStations: fs,
    selectedStationIdsCount: k.length,
    onSelectActiveStation: on,
    setPlaybackSpeed: Bt,
    playheadMs: gt,
    setPlayheadMs: Nt,
    inPointMs: be,
    setInPointMs: ze,
    outPointMs: Oe,
    setOutPointMs: je,
    totalTimelineDurationMs: g,
    zoomLevel: ye,
    togglePlaySmart: jt,
    onToggleHelpModal: () => Ze(($) => !$),
    onSplitDirectorAtPlayhead: () => {
      var ee, B, Le;
      const $ = b || (k.length === 1 ? k[0] : null);
      if ($) {
        const $e = Ye.find((Ve) => Ve.id === $);
        (((ee = $e == null ? void 0 : $e.displays) == null ? void 0 : ee.length) > 1 || ((Le = (B = $e == null ? void 0 : $e.topology) == null ? void 0 : B.displays) == null ? void 0 : Le.length) > 1) && ws($, m + gt);
      }
    },
    isModalActive: we || Xe || mt
  }), u.useEffect(() => {
    const $ = m + be, ee = m + Oe, B = m + gt;
    fp({
      timeRange: t,
      timeMode: r,
      inPointMs: be,
      outPointMs: Oe,
      playheadMs: Math.round(gt),
      inEpochMs: $,
      outEpochMs: ee,
      playheadEpochMs: B,
      selectedStationIds: k,
      activeStationId: b,
      zoomLevel: ye,
      viewportStartMs: We,
      isWorkspaceActive: bt,
      isLooping: Xt,
      playbackSpeed: Rt,
      keystrokeMode: o,
      showRulerKeystrokes: a,
      compositionScope: O,
      compositionLayout: R,
      isAutoDirectorEnabled: F,
      isPipSwapped: E,
      audioRoutingPlan: Kt,
      isAutoFollowAudio: U,
      canvasLayoutTimeline: V
    });
  }, [
    t,
    r,
    be,
    Oe,
    gt,
    k,
    b,
    ye,
    We,
    bt,
    Xt,
    Rt,
    m,
    o,
    a,
    O,
    R,
    F,
    E,
    Kt,
    U,
    V
  ]);
  const xo = u.useCallback(($) => {
    var st, xt;
    const ee = Al($.startTime), B = Al($.endTime), Le = Math.max(0, B - ee) || 144e5, $e = {
      start: $.startTime,
      end: $.endTime,
      durationMs: Le,
      startEpochMs: ee,
      endEpochMs: B
    }, Ie = Math.max(6e4, Math.round(Le * 0.05)), Ve = ee - Ie, ae = Le + 2 * Ie;
    if (n($e), $.inEpochMs && $.outEpochMs) {
      const At = Math.max(0, Math.min(ae, $.inEpochMs - Ve)), Et = Math.max(At + 1e3, Math.min(ae, $.outEpochMs - Ve)), sn = $.playheadEpochMs ? Math.max(0, Math.min(ae, $.playheadEpochMs - Ve)) : At;
      ze(At), je(Et), Nt(sn);
    } else {
      const At = typeof $.inPointMs == "number" ? $.inPointMs : Ie, Et = typeof $.outPointMs == "number" ? $.outPointMs : Ie + Le, sn = typeof $.playheadMs == "number" ? $.playheadMs : At;
      ze(Math.max(0, Math.min(ae, At))), je(Math.max(0, Math.min(ae, Et))), Nt(Math.max(0, Math.min(ae, sn)));
    }
    const et = ((st = $.selectedStationIds) == null ? void 0 : st.length) > 0 ? $.selectedStationIds : ((xt = $.cutStationIds) == null ? void 0 : xt.length) > 0 ? $.cutStationIds : $.stationIds;
    if ((et == null ? void 0 : et.length) > 0) {
      S(et);
      const At = $.spotlightStationId || $.SpotlightStationId || null, Et = $.activeStationId || $.ActiveStationId || null;
      At && et.includes(At) ? (L(At), p(At)) : Et && et.includes(Et) ? (L(Et), p(null)) : (L(null), p(null));
    }
    $.keystrokeMode && i($.keystrokeMode), dt(!0), ct(!1);
  }, []), Wi = u.useCallback(($) => {
    const ee = $.startEpochMs || Al($.start, null, r), B = $.endEpochMs || Al($.end, null, r), Le = Math.max(0, B - ee) || 144e5, $e = Math.max(6e4, Math.round(Le * 0.05)), Ie = ee - $e, Ve = Le + 2 * $e;
    n({
      ...$,
      startEpochMs: ee,
      endEpochMs: B,
      durationMs: Le
    }), x(!1), ze($e), je($e + Le), Nt($e), Z((ae) => {
      if (!(ae != null && ae.keyframes) || ae.keyframes.length === 0) return ae;
      const et = ae.keyframes.map((st, xt) => xt === 0 ? { ...st, timestampEpochMs: Ie } : st).filter((st) => st.timestampEpochMs >= Ie && st.timestampEpochMs <= Ie + Ve);
      return { ...ae, keyframes: et };
    }), q((ae) => {
      if (!(ae != null && ae.segments) || ae.segments.length === 0) return ae;
      if (!ae.segments.some((st) => {
        const xt = st.startEpochMs ?? st.StartEpochMs ?? 0;
        return (st.endEpochMs ?? st.EndEpochMs ?? 0) > Ie && xt < Ie + Ve;
      })) {
        const st = k[0] || b || "station-0";
        return {
          segments: [
            {
              startEpochMs: Ie,
              endEpochMs: Ie + Ve,
              sourceStationId: st
            }
          ]
        };
      }
      return ae;
    }), Lr({});
  }, [r, k, b]), Fs = u.useCallback(() => {
    if (Lt.map((ee) => ee.id).length === 0) return alert("No active stations selected in timeline.");
    oe(!0);
  }, [Lt]), pr = u.useCallback(async ($, ee) => {
    var Ve, ae, et, st;
    const B = Lt.map((xt) => xt.id);
    if (B.length === 0) return;
    let Le = $ === "None" ? "None" : "BurnIn";
    const $e = ee || "NATIVE", Ie = ((Ve = vn == null ? void 0 : vn.displays) == null ? void 0 : Ve.length) > 1 || ((et = (ae = vn == null ? void 0 : vn.topology) == null ? void 0 : ae.displays) == null ? void 0 : et.length) > 1 ? ((st = vn == null ? void 0 : vn.directorPlan) == null ? void 0 : st.segments) || [] : [];
    try {
      const xt = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: B,
          inEpochMs: m + be,
          outEpochMs: m + Oe,
          keystrokeMode: Le,
          resolution: $e,
          videoQuality: $e,
          compositionScope: O,
          layoutMode: "canvas",
          canvasLayout: le,
          canvasLayoutTimeline: V,
          isPipSwapped: E,
          isAutoDirectorEnabled: F,
          directorSegments: Ie,
          audioRoutingSegments: Kt.segments || []
        })
      });
      if (!xt.ok) throw new Error(`HTTP ${xt.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (xt) {
      console.error("[Studio] Export failed:", xt), alert("Failed to launch background master MP4 export job.");
    }
  }, [Lt, m, be, Oe, O, le, V, E, F, vn, Kt]), Jt = u.useCallback(() => {
    xg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const $ = Yd(), ee = Math.max(6e4, Math.round($.durationMs * 0.05));
    n($), ze(ee), je(ee + $.durationMs), Nt(ee), S([]), L(null), p(null), wt(!1), Bt(1), i("BURN_IN"), Ct(), dt(!1), ct(!0);
  }, [Ct, wt, Bt, Nt]), nn = !bt || k.length === 0, Zt = m + gt;
  return u.useEffect(() => {
    const $ = V == null ? void 0 : V.keyframes;
    if (!$ || $.length === 0) return;
    let ee = 0;
    for (let B = 0; B < $.length && $[B].timestampEpochMs <= Zt + 50; B++)
      ee = B;
    ee !== ce && J(ee);
  }, [Zt, V == null ? void 0 : V.keyframes, ce]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        fg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: b,
          hideBackToGrid: Lt.length <= 1,
          onResetActiveStation: () => on(null),
          onOpenRangeModal: () => _e(!0),
          onOpenBookmarksModal: () => Je(!0),
          onOpenHelpModal: () => Ze(!0),
          onToggleDrawer: () => ct(!Ge),
          isInitialSetup: nn,
          selectedCount: k.length,
          totalCount: Ye.length,
          onResetStudio: Jt
        }
      ),
      v && /* @__PURE__ */ s.jsxs("div", { className: "studio-scope-alert-banner", children: [
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
              onClick: () => _e(!0),
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
              onClick: () => x(!1),
              title: "Dismiss Alert",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "studio-lower-body", children: [
        !nn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              Rg,
              {
                activeStation: vn,
                timelineStations: fs,
                allStations: Ye,
                onSelectActiveStation: on,
                onOpenSpotlight: ks,
                onStationContextMenu: Se,
                onDeselectStation: ke,
                stationAutoDirectorMap: G,
                onToggleStationAutoDirector: fe,
                onOpenDrawer: () => ct(!0),
                baseEpochMs: m,
                playheadMs: gt,
                playheadEpochMs: Zt,
                timeMode: r,
                isPlaying: He ? !1 : En,
                setIsPlaying: wt,
                totalDurationMs: g,
                inPointMs: be,
                outPointMs: Oe,
                setPlayheadMs: Nt,
                globalGaps: T,
                recordingSegments: Ue,
                playbackSpeed: Rt,
                onChangePlaybackSpeed: Bt,
                keystrokeMode: o,
                keystrokes: Vt,
                directorPlan: vn == null ? void 0 : vn.directorPlan,
                onOverrideDisplay: Me,
                onResetOverride: Re,
                compositionScope: O,
                onChangeCompositionScope: H,
                compositionLayout: R,
                onChangeCompositionLayout: se,
                isAutoDirectorEnabled: F,
                onToggleAutoDirector: () => D(($) => !$),
                isPipSwapped: E,
                onTogglePipSwap: () => P(($) => !$),
                onUpdateCanvasLayout: Fe,
                canvasLayoutTimeline: V,
                onUpdateCanvasLayoutTimeline: Z,
                activeKfIndex: ce,
                setActiveKfIndex: J,
                isModalOpen: ie || we || Xe || He || mt
              }
            ),
            /* @__PURE__ */ s.jsx(
              mp,
              {
                baseEpochMs: m,
                timeMode: r,
                totalDurationMs: g,
                playheadMs: gt,
                setPlayheadMs: Nt,
                inPointMs: be,
                setInPointMs: ze,
                outPointMs: Oe,
                setOutPointMs: je,
                activeStationId: b,
                isPlaying: En,
                setIsPlaying: jt,
                isLooping: Xt,
                setIsLooping: Ee,
                playbackSpeed: Rt,
                onChangeSpeed: Bt,
                onSetInPoint: () => ze(Math.max(0, Math.min(gt, Oe - 1e3))),
                onSetOutPoint: () => je(Math.min(g, Math.max(gt, be + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: Cn, children: /* @__PURE__ */ s.jsx(
            vp,
            {
              stations: fs,
              activeStationId: b,
              onSelectActiveStation: ($) => on(k.length <= 1 ? $ : $ === b ? null : $),
              onStationContextMenu: Se,
              onDeselectStation: ke,
              stationAutoDirectorMap: G,
              onToggleStationAutoDirector: fe,
              baseEpochMs: m,
              timeMode: r,
              totalDurationMs: g,
              zoomLevel: ye,
              onZoomChange: Ce,
              onZoomReset: Ct,
              onFitRange: X,
              onJumpViewportTo: me,
              playheadMs: gt,
              setPlayheadMs: Nt,
              inPointMs: be,
              setInPointMs: ze,
              outPointMs: Oe,
              setOutPointMs: je,
              viewportStartMs: We,
              onViewportStartChange: pt,
              onExport: Fs,
              recordingSegments: Ue,
              movieBoundaries: qe,
              onEstimateLoaded: ($) => ($ == null ? void 0 : $.removedGlobalGaps) && j($.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: i,
              keystrokes: Vt,
              showKeystrokes: a,
              showRulerKeystrokes: a,
              onToggleRulerKeystrokes: () => c(($) => !$),
              onSplitDirectorSegment: ws,
              onChangeDirectorSegmentDisplay: Me,
              onResetDirectorSegmentToAuto: Re,
              audioRoutingPlan: Kt,
              onSplitAudioSegment: fr,
              onChangeAudioSegmentStation: un,
              onChangeAudioSegmentGain: Qt,
              onFollowVisualFeed: _s,
              isAutoFollowAudio: U,
              canvasLayoutTimeline: V,
              activeKfIndex: ce,
              onSelectKeyframe: ($, ee) => {
                J($), Nt(Math.max(0, ee - m));
              },
              onAddKeyframeAtEpoch: re,
              onDeleteKeyframe: Be,
              onUpdateKeyframeEpoch: Y,
              onUpdateKeyframeTransition: Ne,
              onToggleDisplayOnCanvas: ln,
              onUpdateAudioPlan: q
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          mx,
          {
            isOpen: Ge || nn,
            onToggle: () => ct(!Ge),
            onClose: () => ct(!1),
            allStations: Ye,
            selectedStationIds: k,
            onToggleStation: ($) => S((ee) => ee.includes($) ? ee.filter((B) => B !== $) : [...ee, $]),
            onUpdateSelections: S,
            isInitialSetup: nn,
            isLoadingStations: en,
            recordingSegments: Ue,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              k.length > 0 && (L(null), p(null), dt(!0), ct(!1));
            },
            onOpenRangeModal: () => _e(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      yx,
      {
        isOpen: we,
        onClose: () => _e(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: xo,
        onApplyRange: Wi
      }
    ),
    /* @__PURE__ */ s.jsx(
      Nx,
      {
        isOpen: Xe,
        onClose: () => Je(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: m,
          timelineBaseEpochMs: m,
          playheadMs: gt,
          inPointMs: be,
          outPointMs: Oe,
          selectedStationIds: k,
          selectedStationNames: Ye.filter(($) => k.includes($.id)).map(($) => $.displayName || $.hostname || $.id),
          allStationIds: Ye.map(($) => $.id),
          activeStationId: b,
          activeStationName: (Ke == null ? void 0 : Ke.displayName) || (Ke == null ? void 0 : Ke.hostname) || null,
          spotlightStationId: y,
          keystrokeMode: o
        },
        onLoadBookmark: xo
      }
    ),
    /* @__PURE__ */ s.jsx(
      wp,
      {
        isOpen: mt,
        onClose: () => Ze(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      bx,
      {
        isOpen: He,
        station: Or,
        initialDisplayId: h,
        allStations: fs,
        onSelectStation: ($) => {
          $ !== y && Bt(1), L($), p($);
        },
        onClose: hs,
        baseEpochMs: m,
        timeMode: r,
        totalDurationMs: g,
        zoomLevel: ye,
        onZoomChange: Ce,
        onZoomReset: Ct,
        onFitRange: X,
        onJumpViewportTo: me,
        viewportStartMs: We,
        onViewportStartChange: pt,
        playheadMs: gt,
        setPlayheadMs: Nt,
        playheadEpochMs: Zt,
        inPointMs: be,
        setInPointMs: ze,
        outPointMs: Oe,
        setOutPointMs: je,
        recordingSegments: Ue,
        globalGaps: T,
        isPlaying: En,
        setIsPlaying: wt,
        isLooping: Xt,
        setIsLooping: Ee,
        playbackSpeed: Rt,
        setPlaybackSpeed: Bt,
        onExport: Fs,
        keystrokeMode: o,
        onChangeKeystrokeMode: i,
        keystrokes: Vt,
        showRulerKeystrokes: a,
        onToggleRulerKeystrokes: () => c(($) => !$),
        directorPlan: Or == null ? void 0 : Or.directorPlan,
        onOverrideDisplay: Me,
        onSplitDirectorSegment: ws,
        onChangeDirectorSegmentDisplay: Me,
        onResetDirectorSegmentToAuto: Re
      }
    ),
    /* @__PURE__ */ s.jsx(
      Mx,
      {
        menu: w,
        onClose: () => I(null),
        onDeselect: ke,
        onFocusSolo: on
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ix,
      {
        isOpen: ie,
        onClose: () => oe(!1),
        onConfirm: pr,
        compositionSummary: {
          scope: O,
          layout: (le == null ? void 0 : le.preset) || R,
          isPipSwapped: E,
          isAutoDirectorEnabled: F,
          stationsCount: Lt.length,
          audioSegmentsCount: ((vl = Kt == null ? void 0 : Kt.segments) == null ? void 0 : vl.length) || 1,
          resolution: (V == null ? void 0 : V.resolution) || "NATIVE",
          canvasWidth: (le == null ? void 0 : le.width) || 1920,
          canvasHeight: (le == null ? void 0 : le.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(jp, {})
  ] });
}
const Gd = "itb-extractor-advanced-theme", Xd = "itb-global-export-job-monitor-root";
function Cp() {
  if (!(typeof document > "u") && !document.getElementById(Gd)) {
    const e = document.createElement("link");
    e.id = Gd, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Cp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Xd);
  if (!t) {
    t = document.createElement("div"), t.id = Xd, document.body.appendChild(t);
    try {
      qo.createRoot(t).render(ho.createElement(jp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Dx(e, t = {}) {
  Cp();
  const n = qo.createRoot(e);
  return n.render(ho.createElement(Ox, t)), () => {
    n.unmount();
  };
}
export {
  jp as ExportJobMonitor,
  Ox as ExtractorAdvancedStudio,
  Ox as default,
  Dx as mount
};
