function Xp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var hh = { exports: {} }, kt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eo = Symbol.for("react.element"), Qp = Symbol.for("react.portal"), Jp = Symbol.for("react.fragment"), Zp = Symbol.for("react.strict_mode"), qp = Symbol.for("react.profiler"), em = Symbol.for("react.provider"), tm = Symbol.for("react.context"), nm = Symbol.for("react.forward_ref"), sm = Symbol.for("react.suspense"), rm = Symbol.for("react.memo"), lm = Symbol.for("react.lazy"), Uu = Symbol.iterator;
function om(e) {
  return e === null || typeof e != "object" ? null : (e = Uu && e[Uu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var fh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ph = Object.assign, mh = {};
function Ml(e, t, n) {
  this.props = e, this.context = t, this.refs = mh, this.updater = n || fh;
}
Ml.prototype.isReactComponent = {};
Ml.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ml.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function gh() {
}
gh.prototype = Ml.prototype;
function Bc(e, t, n) {
  this.props = e, this.context = t, this.refs = mh, this.updater = n || fh;
}
var Uc = Bc.prototype = new gh();
Uc.constructor = Bc;
ph(Uc, Ml.prototype);
Uc.isPureReactComponent = !0;
var Wu = Array.isArray, xh = Object.prototype.hasOwnProperty, Wc = { current: null }, yh = { key: !0, ref: !0, __self: !0, __source: !0 };
function vh(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) xh.call(t, r) && !yh.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var c = Array(i), d = 0; d < i; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: Eo, type: e, key: o, ref: a, props: l, _owner: Wc.current };
}
function am(e, t) {
  return { $$typeof: Eo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function zc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Eo;
}
function im(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var zu = /\/+/g;
function li(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? im("" + e.key) : t.toString(36);
}
function ea(e, t, n, r, l) {
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
        case Eo:
        case Qp:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + li(a, 0) : r, Wu(l) ? (n = "", e != null && (n = e.replace(zu, "$&/") + "/"), ea(l, t, n, "", function(d) {
    return d;
  })) : l != null && (zc(l) && (l = am(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(zu, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Wu(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + li(o, i);
    a += ea(o, t, n, c, l);
  }
  else if (c = om(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + li(o, i++), a += ea(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function Oo(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return ea(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function cm(e) {
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
var Fn = { current: null }, ta = { transition: null }, um = { ReactCurrentDispatcher: Fn, ReactCurrentBatchConfig: ta, ReactCurrentOwner: Wc };
function Nh() {
  throw Error("act(...) is not supported in production builds of React.");
}
kt.Children = { map: Oo, forEach: function(e, t, n) {
  Oo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Oo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Oo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!zc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
kt.Component = Ml;
kt.Fragment = Jp;
kt.Profiler = qp;
kt.PureComponent = Bc;
kt.StrictMode = Zp;
kt.Suspense = sm;
kt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = um;
kt.act = Nh;
kt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ph({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = Wc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (c in t) xh.call(t, c) && !yh.hasOwnProperty(c) && (r[c] = t[c] === void 0 && i !== void 0 ? i[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    i = Array(c);
    for (var d = 0; d < c; d++) i[d] = arguments[d + 2];
    r.children = i;
  }
  return { $$typeof: Eo, type: e.type, key: l, ref: o, props: r, _owner: a };
};
kt.createContext = function(e) {
  return e = { $$typeof: tm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: em, _context: e }, e.Consumer = e;
};
kt.createElement = vh;
kt.createFactory = function(e) {
  var t = vh.bind(null, e);
  return t.type = e, t;
};
kt.createRef = function() {
  return { current: null };
};
kt.forwardRef = function(e) {
  return { $$typeof: nm, render: e };
};
kt.isValidElement = zc;
kt.lazy = function(e) {
  return { $$typeof: lm, _payload: { _status: -1, _result: e }, _init: cm };
};
kt.memo = function(e, t) {
  return { $$typeof: rm, type: e, compare: t === void 0 ? null : t };
};
kt.startTransition = function(e) {
  var t = ta.transition;
  ta.transition = {};
  try {
    e();
  } finally {
    ta.transition = t;
  }
};
kt.unstable_act = Nh;
kt.useCallback = function(e, t) {
  return Fn.current.useCallback(e, t);
};
kt.useContext = function(e) {
  return Fn.current.useContext(e);
};
kt.useDebugValue = function() {
};
kt.useDeferredValue = function(e) {
  return Fn.current.useDeferredValue(e);
};
kt.useEffect = function(e, t) {
  return Fn.current.useEffect(e, t);
};
kt.useId = function() {
  return Fn.current.useId();
};
kt.useImperativeHandle = function(e, t, n) {
  return Fn.current.useImperativeHandle(e, t, n);
};
kt.useInsertionEffect = function(e, t) {
  return Fn.current.useInsertionEffect(e, t);
};
kt.useLayoutEffect = function(e, t) {
  return Fn.current.useLayoutEffect(e, t);
};
kt.useMemo = function(e, t) {
  return Fn.current.useMemo(e, t);
};
kt.useReducer = function(e, t, n) {
  return Fn.current.useReducer(e, t, n);
};
kt.useRef = function(e) {
  return Fn.current.useRef(e);
};
kt.useState = function(e) {
  return Fn.current.useState(e);
};
kt.useSyncExternalStore = function(e, t, n) {
  return Fn.current.useSyncExternalStore(e, t, n);
};
kt.useTransition = function() {
  return Fn.current.useTransition();
};
kt.version = "18.3.1";
hh.exports = kt;
var u = hh.exports;
const Co = /* @__PURE__ */ Xp(u);
var pa = {}, kh = { exports: {} }, rs = {}, wh = { exports: {} }, jh = {};
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
  function t(E, U) {
    var P = E.length;
    E.push(U);
    e: for (; 0 < P; ) {
      var K = P - 1 >>> 1, _ = E[K];
      if (0 < l(_, U)) E[K] = U, E[P] = _, P = K;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var U = E[0], P = E.pop();
    if (P !== U) {
      E[0] = P;
      e: for (var K = 0, _ = E.length, te = _ >>> 1; K < te; ) {
        var ne = 2 * (K + 1) - 1, X = E[ne], J = ne + 1, $e = E[J];
        if (0 > l(X, P)) J < _ && 0 > l($e, X) ? (E[K] = $e, E[J] = P, K = J) : (E[K] = X, E[ne] = P, K = ne);
        else if (J < _ && 0 > l($e, P)) E[K] = $e, E[J] = P, K = J;
        else break e;
      }
    }
    return U;
  }
  function l(E, U) {
    var P = E.sortIndex - U.sortIndex;
    return P !== 0 ? P : E.id - U.id;
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
  var c = [], d = [], N = 1, f = null, p = 3, v = !1, S = !1, I = !1, D = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, x = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(E) {
    for (var U = n(d); U !== null; ) {
      if (U.callback === null) r(d);
      else if (U.startTime <= E) r(d), U.sortIndex = U.expirationTime, t(c, U);
      else break;
      U = n(d);
    }
  }
  function T(E) {
    if (I = !1, g(E), !S) if (n(c) !== null) S = !0, re(w);
    else {
      var U = n(d);
      U !== null && Z(T, U.startTime - E);
    }
  }
  function w(E, U) {
    S = !1, I && (I = !1, k(A), A = -1), v = !0;
    var P = p;
    try {
      for (g(U), f = n(c); f !== null && (!(f.expirationTime > U) || E && !O()); ) {
        var K = f.callback;
        if (typeof K == "function") {
          f.callback = null, p = f.priorityLevel;
          var _ = K(f.expirationTime <= U);
          U = e.unstable_now(), typeof _ == "function" ? f.callback = _ : f === n(c) && r(c), g(U);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var te = !0;
      else {
        var ne = n(d);
        ne !== null && Z(T, ne.startTime - U), te = !1;
      }
      return te;
    } finally {
      f = null, p = P, v = !1;
    }
  }
  var C = !1, h = null, A = -1, y = 5, b = -1;
  function O() {
    return !(e.unstable_now() - b < y);
  }
  function z() {
    if (h !== null) {
      var E = e.unstable_now();
      b = E;
      var U = !0;
      try {
        U = h(!0, E);
      } finally {
        U ? $() : (C = !1, h = null);
      }
    } else C = !1;
  }
  var $;
  if (typeof x == "function") $ = function() {
    x(z);
  };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(), se = W.port2;
    W.port1.onmessage = z, $ = function() {
      se.postMessage(null);
    };
  } else $ = function() {
    D(z, 0);
  };
  function re(E) {
    h = E, C || (C = !0, $());
  }
  function Z(E, U) {
    A = D(function() {
      E(e.unstable_now());
    }, U);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    S || v || (S = !0, re(w));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : y = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(E) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var U = 3;
        break;
      default:
        U = p;
    }
    var P = p;
    p = U;
    try {
      return E();
    } finally {
      p = P;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, U) {
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
    var P = p;
    p = E;
    try {
      return U();
    } finally {
      p = P;
    }
  }, e.unstable_scheduleCallback = function(E, U, P) {
    var K = e.unstable_now();
    switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? K + P : K) : P = K, E) {
      case 1:
        var _ = -1;
        break;
      case 2:
        _ = 250;
        break;
      case 5:
        _ = 1073741823;
        break;
      case 4:
        _ = 1e4;
        break;
      default:
        _ = 5e3;
    }
    return _ = P + _, E = { id: N++, callback: U, priorityLevel: E, startTime: P, expirationTime: _, sortIndex: -1 }, P > K ? (E.sortIndex = P, t(d, E), n(c) === null && E === n(d) && (I ? (k(A), A = -1) : I = !0, Z(T, P - K))) : (E.sortIndex = _, t(c, E), S || v || (S = !0, re(w))), E;
  }, e.unstable_shouldYield = O, e.unstable_wrapCallback = function(E) {
    var U = p;
    return function() {
      var P = p;
      p = U;
      try {
        return E.apply(this, arguments);
      } finally {
        p = P;
      }
    };
  };
})(jh);
wh.exports = jh;
var dm = wh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hm = u, ss = dm;
function ge(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Eh = /* @__PURE__ */ new Set(), lo = {};
function Hr(e, t) {
  kl(e, t), kl(e + "Capture", t);
}
function kl(e, t) {
  for (lo[e] = t, e = 0; e < t.length; e++) Eh.add(t[e]);
}
var zs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bi = Object.prototype.hasOwnProperty, fm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Hu = {}, Ku = {};
function pm(e) {
  return Bi.call(Ku, e) ? !0 : Bi.call(Hu, e) ? !1 : fm.test(e) ? Ku[e] = !0 : (Hu[e] = !0, !1);
}
function mm(e, t, n, r) {
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
function gm(e, t, n, r) {
  if (t === null || typeof t > "u" || mm(e, t, n, r)) return !0;
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
function Bn(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var En = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  En[e] = new Bn(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  En[t] = new Bn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  En[e] = new Bn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  En[e] = new Bn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  En[e] = new Bn(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  En[e] = new Bn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  En[e] = new Bn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  En[e] = new Bn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  En[e] = new Bn(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Hc = /[\-:]([a-z])/g;
function Kc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Hc,
    Kc
  );
  En[t] = new Bn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Hc, Kc);
  En[t] = new Bn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Hc, Kc);
  En[t] = new Bn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  En[e] = new Bn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
En.xlinkHref = new Bn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  En[e] = new Bn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Vc(e, t, n, r) {
  var l = En.hasOwnProperty(t) ? En[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (gm(t, n, l, r) && (n = null), r || l === null ? pm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ys = hm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Do = Symbol.for("react.element"), qr = Symbol.for("react.portal"), el = Symbol.for("react.fragment"), Yc = Symbol.for("react.strict_mode"), Ui = Symbol.for("react.profiler"), Ch = Symbol.for("react.provider"), Sh = Symbol.for("react.context"), Gc = Symbol.for("react.forward_ref"), Wi = Symbol.for("react.suspense"), zi = Symbol.for("react.suspense_list"), Xc = Symbol.for("react.memo"), tr = Symbol.for("react.lazy"), bh = Symbol.for("react.offscreen"), Vu = Symbol.iterator;
function Ol(e) {
  return e === null || typeof e != "object" ? null : (e = Vu && e[Vu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var tn = Object.assign, oi;
function Vl(e) {
  if (oi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    oi = t && t[1] || "";
  }
  return `
` + oi + e;
}
var ai = !1;
function ii(e, t) {
  if (!e || ai) return "";
  ai = !0;
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
    ai = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Vl(e) : "";
}
function xm(e) {
  switch (e.tag) {
    case 5:
      return Vl(e.type);
    case 16:
      return Vl("Lazy");
    case 13:
      return Vl("Suspense");
    case 19:
      return Vl("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = ii(e.type, !1), e;
    case 11:
      return e = ii(e.type.render, !1), e;
    case 1:
      return e = ii(e.type, !0), e;
    default:
      return "";
  }
}
function Hi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case el:
      return "Fragment";
    case qr:
      return "Portal";
    case Ui:
      return "Profiler";
    case Yc:
      return "StrictMode";
    case Wi:
      return "Suspense";
    case zi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Sh:
      return (e.displayName || "Context") + ".Consumer";
    case Ch:
      return (e._context.displayName || "Context") + ".Provider";
    case Gc:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Xc:
      return t = e.displayName || null, t !== null ? t : Hi(e.type) || "Memo";
    case tr:
      t = e._payload, e = e._init;
      try {
        return Hi(e(t));
      } catch {
      }
  }
  return null;
}
function ym(e) {
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
      return Hi(t);
    case 8:
      return t === Yc ? "StrictMode" : "Mode";
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
function yr(e) {
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
function Mh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function vm(e) {
  var t = Mh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function Po(e) {
  e._valueTracker || (e._valueTracker = vm(e));
}
function Ih(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Mh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ma(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ki(e, t) {
  var n = t.checked;
  return tn({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Yu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = yr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Th(e, t) {
  t = t.checked, t != null && Vc(e, "checked", t, !1);
}
function Vi(e, t) {
  Th(e, t);
  var n = yr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Yi(e, t.type, n) : t.hasOwnProperty("defaultValue") && Yi(e, t.type, yr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Gu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Yi(e, t, n) {
  (t !== "number" || ma(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Yl = Array.isArray;
function hl(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + yr(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Gi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(ge(91));
  return tn({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Xu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(ge(92));
      if (Yl(n)) {
        if (1 < n.length) throw Error(ge(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: yr(n) };
}
function Ah(e, t) {
  var n = yr(t.value), r = yr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Qu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function $h(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Xi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? $h(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var _o, Rh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (_o = _o || document.createElement("div"), _o.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = _o.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function oo(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ql = {
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
}, Nm = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ql).forEach(function(e) {
  Nm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Ql[t] = Ql[e];
  });
});
function Lh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ql.hasOwnProperty(e) && Ql[e] ? ("" + t).trim() : t + "px";
}
function Oh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Lh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var km = tn({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Qi(e, t) {
  if (t) {
    if (km[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ge(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ge(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ge(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ge(62));
  }
}
function Ji(e, t) {
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
var Zi = null;
function Qc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var qi = null, fl = null, pl = null;
function Ju(e) {
  if (e = Mo(e)) {
    if (typeof qi != "function") throw Error(ge(280));
    var t = e.stateNode;
    t && (t = Ka(t), qi(e.stateNode, e.type, t));
  }
}
function Dh(e) {
  fl ? pl ? pl.push(e) : pl = [e] : fl = e;
}
function Ph() {
  if (fl) {
    var e = fl, t = pl;
    if (pl = fl = null, Ju(e), t) for (e = 0; e < t.length; e++) Ju(t[e]);
  }
}
function _h(e, t) {
  return e(t);
}
function Fh() {
}
var ci = !1;
function Bh(e, t, n) {
  if (ci) return e(t, n);
  ci = !0;
  try {
    return _h(e, t, n);
  } finally {
    ci = !1, (fl !== null || pl !== null) && (Fh(), Ph());
  }
}
function ao(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ka(n);
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
  if (n && typeof n != "function") throw Error(ge(231, t, typeof n));
  return n;
}
var ec = !1;
if (zs) try {
  var Dl = {};
  Object.defineProperty(Dl, "passive", { get: function() {
    ec = !0;
  } }), window.addEventListener("test", Dl, Dl), window.removeEventListener("test", Dl, Dl);
} catch {
  ec = !1;
}
function wm(e, t, n, r, l, o, a, i, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (N) {
    this.onError(N);
  }
}
var Jl = !1, ga = null, xa = !1, tc = null, jm = { onError: function(e) {
  Jl = !0, ga = e;
} };
function Em(e, t, n, r, l, o, a, i, c) {
  Jl = !1, ga = null, wm.apply(jm, arguments);
}
function Cm(e, t, n, r, l, o, a, i, c) {
  if (Em.apply(this, arguments), Jl) {
    if (Jl) {
      var d = ga;
      Jl = !1, ga = null;
    } else throw Error(ge(198));
    xa || (xa = !0, tc = d);
  }
}
function Kr(e) {
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
function Uh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Zu(e) {
  if (Kr(e) !== e) throw Error(ge(188));
}
function Sm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Kr(e), t === null) throw Error(ge(188));
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
        if (o === n) return Zu(l), e;
        if (o === r) return Zu(l), t;
        o = o.sibling;
      }
      throw Error(ge(188));
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
        if (!a) throw Error(ge(189));
      }
    }
    if (n.alternate !== r) throw Error(ge(190));
  }
  if (n.tag !== 3) throw Error(ge(188));
  return n.stateNode.current === n ? e : t;
}
function Wh(e) {
  return e = Sm(e), e !== null ? zh(e) : null;
}
function zh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = zh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Hh = ss.unstable_scheduleCallback, qu = ss.unstable_cancelCallback, bm = ss.unstable_shouldYield, Mm = ss.unstable_requestPaint, rn = ss.unstable_now, Im = ss.unstable_getCurrentPriorityLevel, Jc = ss.unstable_ImmediatePriority, Kh = ss.unstable_UserBlockingPriority, ya = ss.unstable_NormalPriority, Tm = ss.unstable_LowPriority, Vh = ss.unstable_IdlePriority, Ua = null, $s = null;
function Am(e) {
  if ($s && typeof $s.onCommitFiberRoot == "function") try {
    $s.onCommitFiberRoot(Ua, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var js = Math.clz32 ? Math.clz32 : Lm, $m = Math.log, Rm = Math.LN2;
function Lm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - ($m(e) / Rm | 0) | 0;
}
var Fo = 64, Bo = 4194304;
function Gl(e) {
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
function va(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var i = a & ~l;
    i !== 0 ? r = Gl(i) : (o &= a, o !== 0 && (r = Gl(o)));
  } else a = n & ~l, a !== 0 ? r = Gl(a) : o !== 0 && (r = Gl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - js(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Om(e, t) {
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
function Dm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - js(o), i = 1 << a, c = l[a];
    c === -1 ? (!(i & n) || i & r) && (l[a] = Om(i, t)) : c <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function nc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Yh() {
  var e = Fo;
  return Fo <<= 1, !(Fo & 4194240) && (Fo = 64), e;
}
function ui(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function So(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - js(t), e[t] = n;
}
function Pm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - js(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Zc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - js(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Ft = 0;
function Gh(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Xh, qc, Qh, Jh, Zh, sc = !1, Uo = [], ur = null, dr = null, hr = null, io = /* @__PURE__ */ new Map(), co = /* @__PURE__ */ new Map(), lr = [], _m = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ed(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ur = null;
      break;
    case "dragenter":
    case "dragleave":
      dr = null;
      break;
    case "mouseover":
    case "mouseout":
      hr = null;
      break;
    case "pointerover":
    case "pointerout":
      io.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      co.delete(t.pointerId);
  }
}
function Pl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Mo(t), t !== null && qc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Fm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ur = Pl(ur, e, t, n, r, l), !0;
    case "dragenter":
      return dr = Pl(dr, e, t, n, r, l), !0;
    case "mouseover":
      return hr = Pl(hr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return io.set(o, Pl(io.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, co.set(o, Pl(co.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function qh(e) {
  var t = $r(e.target);
  if (t !== null) {
    var n = Kr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Uh(n), t !== null) {
          e.blockedOn = t, Zh(e.priority, function() {
            Qh(n);
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
function na(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = rc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Zi = r, n.target.dispatchEvent(r), Zi = null;
    } else return t = Mo(n), t !== null && qc(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function td(e, t, n) {
  na(e) && n.delete(t);
}
function Bm() {
  sc = !1, ur !== null && na(ur) && (ur = null), dr !== null && na(dr) && (dr = null), hr !== null && na(hr) && (hr = null), io.forEach(td), co.forEach(td);
}
function _l(e, t) {
  e.blockedOn === t && (e.blockedOn = null, sc || (sc = !0, ss.unstable_scheduleCallback(ss.unstable_NormalPriority, Bm)));
}
function uo(e) {
  function t(l) {
    return _l(l, e);
  }
  if (0 < Uo.length) {
    _l(Uo[0], e);
    for (var n = 1; n < Uo.length; n++) {
      var r = Uo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ur !== null && _l(ur, e), dr !== null && _l(dr, e), hr !== null && _l(hr, e), io.forEach(t), co.forEach(t), n = 0; n < lr.length; n++) r = lr[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lr.length && (n = lr[0], n.blockedOn === null); ) qh(n), n.blockedOn === null && lr.shift();
}
var ml = Ys.ReactCurrentBatchConfig, Na = !0;
function Um(e, t, n, r) {
  var l = Ft, o = ml.transition;
  ml.transition = null;
  try {
    Ft = 1, eu(e, t, n, r);
  } finally {
    Ft = l, ml.transition = o;
  }
}
function Wm(e, t, n, r) {
  var l = Ft, o = ml.transition;
  ml.transition = null;
  try {
    Ft = 4, eu(e, t, n, r);
  } finally {
    Ft = l, ml.transition = o;
  }
}
function eu(e, t, n, r) {
  if (Na) {
    var l = rc(e, t, n, r);
    if (l === null) Ni(e, t, r, ka, n), ed(e, r);
    else if (Fm(l, e, t, n, r)) r.stopPropagation();
    else if (ed(e, r), t & 4 && -1 < _m.indexOf(e)) {
      for (; l !== null; ) {
        var o = Mo(l);
        if (o !== null && Xh(o), o = rc(e, t, n, r), o === null && Ni(e, t, r, ka, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ni(e, t, r, null, n);
  }
}
var ka = null;
function rc(e, t, n, r) {
  if (ka = null, e = Qc(r), e = $r(e), e !== null) if (t = Kr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Uh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ka = e, null;
}
function ef(e) {
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
      switch (Im()) {
        case Jc:
          return 1;
        case Kh:
          return 4;
        case ya:
        case Tm:
          return 16;
        case Vh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ir = null, tu = null, sa = null;
function tf() {
  if (sa) return sa;
  var e, t = tu, n = t.length, r, l = "value" in ir ? ir.value : ir.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return sa = l.slice(e, 1 < r ? 1 - r : void 0);
}
function ra(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Wo() {
  return !0;
}
function nd() {
  return !1;
}
function ls(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Wo : nd, this.isPropagationStopped = nd, this;
  }
  return tn(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Wo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Wo);
  }, persist: function() {
  }, isPersistent: Wo }), t;
}
var Il = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, nu = ls(Il), bo = tn({}, Il, { view: 0, detail: 0 }), zm = ls(bo), di, hi, Fl, Wa = tn({}, bo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: su, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Fl && (Fl && e.type === "mousemove" ? (di = e.screenX - Fl.screenX, hi = e.screenY - Fl.screenY) : hi = di = 0, Fl = e), di);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : hi;
} }), sd = ls(Wa), Hm = tn({}, Wa, { dataTransfer: 0 }), Km = ls(Hm), Vm = tn({}, bo, { relatedTarget: 0 }), fi = ls(Vm), Ym = tn({}, Il, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Gm = ls(Ym), Xm = tn({}, Il, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Qm = ls(Xm), Jm = tn({}, Il, { data: 0 }), rd = ls(Jm), Zm = {
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
}, qm = {
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
}, e0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function t0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = e0[e]) ? !!t[e] : !1;
}
function su() {
  return t0;
}
var n0 = tn({}, bo, { key: function(e) {
  if (e.key) {
    var t = Zm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ra(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? qm[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: su, charCode: function(e) {
  return e.type === "keypress" ? ra(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ra(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), s0 = ls(n0), r0 = tn({}, Wa, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ld = ls(r0), l0 = tn({}, bo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: su }), o0 = ls(l0), a0 = tn({}, Il, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), i0 = ls(a0), c0 = tn({}, Wa, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), u0 = ls(c0), d0 = [9, 13, 27, 32], ru = zs && "CompositionEvent" in window, Zl = null;
zs && "documentMode" in document && (Zl = document.documentMode);
var h0 = zs && "TextEvent" in window && !Zl, nf = zs && (!ru || Zl && 8 < Zl && 11 >= Zl), od = " ", ad = !1;
function sf(e, t) {
  switch (e) {
    case "keyup":
      return d0.indexOf(t.keyCode) !== -1;
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
function rf(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var tl = !1;
function f0(e, t) {
  switch (e) {
    case "compositionend":
      return rf(t);
    case "keypress":
      return t.which !== 32 ? null : (ad = !0, od);
    case "textInput":
      return e = t.data, e === od && ad ? null : e;
    default:
      return null;
  }
}
function p0(e, t) {
  if (tl) return e === "compositionend" || !ru && sf(e, t) ? (e = tf(), sa = tu = ir = null, tl = !1, e) : null;
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
      return nf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var m0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function id(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!m0[e.type] : t === "textarea";
}
function lf(e, t, n, r) {
  Dh(r), t = wa(t, "onChange"), 0 < t.length && (n = new nu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var ql = null, ho = null;
function g0(e) {
  xf(e, 0);
}
function za(e) {
  var t = rl(e);
  if (Ih(t)) return e;
}
function x0(e, t) {
  if (e === "change") return t;
}
var of = !1;
if (zs) {
  var pi;
  if (zs) {
    var mi = "oninput" in document;
    if (!mi) {
      var cd = document.createElement("div");
      cd.setAttribute("oninput", "return;"), mi = typeof cd.oninput == "function";
    }
    pi = mi;
  } else pi = !1;
  of = pi && (!document.documentMode || 9 < document.documentMode);
}
function ud() {
  ql && (ql.detachEvent("onpropertychange", af), ho = ql = null);
}
function af(e) {
  if (e.propertyName === "value" && za(ho)) {
    var t = [];
    lf(t, ho, e, Qc(e)), Bh(g0, t);
  }
}
function y0(e, t, n) {
  e === "focusin" ? (ud(), ql = t, ho = n, ql.attachEvent("onpropertychange", af)) : e === "focusout" && ud();
}
function v0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return za(ho);
}
function N0(e, t) {
  if (e === "click") return za(t);
}
function k0(e, t) {
  if (e === "input" || e === "change") return za(t);
}
function w0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Cs = typeof Object.is == "function" ? Object.is : w0;
function fo(e, t) {
  if (Cs(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Bi.call(t, l) || !Cs(e[l], t[l])) return !1;
  }
  return !0;
}
function dd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function hd(e, t) {
  var n = dd(e);
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
    n = dd(n);
  }
}
function cf(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? cf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function uf() {
  for (var e = window, t = ma(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ma(e.document);
  }
  return t;
}
function lu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function j0(e) {
  var t = uf(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && cf(n.ownerDocument.documentElement, n)) {
    if (r !== null && lu(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = hd(n, o);
        var a = hd(
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
var E0 = zs && "documentMode" in document && 11 >= document.documentMode, nl = null, lc = null, eo = null, oc = !1;
function fd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  oc || nl == null || nl !== ma(r) || (r = nl, "selectionStart" in r && lu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), eo && fo(eo, r) || (eo = r, r = wa(lc, "onSelect"), 0 < r.length && (t = new nu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = nl)));
}
function zo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var sl = { animationend: zo("Animation", "AnimationEnd"), animationiteration: zo("Animation", "AnimationIteration"), animationstart: zo("Animation", "AnimationStart"), transitionend: zo("Transition", "TransitionEnd") }, gi = {}, df = {};
zs && (df = document.createElement("div").style, "AnimationEvent" in window || (delete sl.animationend.animation, delete sl.animationiteration.animation, delete sl.animationstart.animation), "TransitionEvent" in window || delete sl.transitionend.transition);
function Ha(e) {
  if (gi[e]) return gi[e];
  if (!sl[e]) return e;
  var t = sl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in df) return gi[e] = t[n];
  return e;
}
var hf = Ha("animationend"), ff = Ha("animationiteration"), pf = Ha("animationstart"), mf = Ha("transitionend"), gf = /* @__PURE__ */ new Map(), pd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nr(e, t) {
  gf.set(e, t), Hr(t, [e]);
}
for (var xi = 0; xi < pd.length; xi++) {
  var yi = pd[xi], C0 = yi.toLowerCase(), S0 = yi[0].toUpperCase() + yi.slice(1);
  Nr(C0, "on" + S0);
}
Nr(hf, "onAnimationEnd");
Nr(ff, "onAnimationIteration");
Nr(pf, "onAnimationStart");
Nr("dblclick", "onDoubleClick");
Nr("focusin", "onFocus");
Nr("focusout", "onBlur");
Nr(mf, "onTransitionEnd");
kl("onMouseEnter", ["mouseout", "mouseover"]);
kl("onMouseLeave", ["mouseout", "mouseover"]);
kl("onPointerEnter", ["pointerout", "pointerover"]);
kl("onPointerLeave", ["pointerout", "pointerover"]);
Hr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Hr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Hr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Hr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Hr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Hr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Xl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), b0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xl));
function md(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Cm(r, t, void 0, e), e.currentTarget = null;
}
function xf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var i = r[a], c = i.instance, d = i.currentTarget;
        if (i = i.listener, c !== o && l.isPropagationStopped()) break e;
        md(l, i, d), o = c;
      }
      else for (a = 0; a < r.length; a++) {
        if (i = r[a], c = i.instance, d = i.currentTarget, i = i.listener, c !== o && l.isPropagationStopped()) break e;
        md(l, i, d), o = c;
      }
    }
  }
  if (xa) throw e = tc, xa = !1, tc = null, e;
}
function Yt(e, t) {
  var n = t[dc];
  n === void 0 && (n = t[dc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (yf(t, e, 2, !1), n.add(r));
}
function vi(e, t, n) {
  var r = 0;
  t && (r |= 4), yf(n, e, r, t);
}
var Ho = "_reactListening" + Math.random().toString(36).slice(2);
function po(e) {
  if (!e[Ho]) {
    e[Ho] = !0, Eh.forEach(function(n) {
      n !== "selectionchange" && (b0.has(n) || vi(n, !1, e), vi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ho] || (t[Ho] = !0, vi("selectionchange", !1, t));
  }
}
function yf(e, t, n, r) {
  switch (ef(t)) {
    case 1:
      var l = Um;
      break;
    case 4:
      l = Wm;
      break;
    default:
      l = eu;
  }
  n = l.bind(null, t, n, e), l = void 0, !ec || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ni(e, t, n, r, l) {
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
        if (a = $r(i), a === null) return;
        if (c = a.tag, c === 5 || c === 6) {
          r = o = a;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  Bh(function() {
    var d = o, N = Qc(n), f = [];
    e: {
      var p = gf.get(e);
      if (p !== void 0) {
        var v = nu, S = e;
        switch (e) {
          case "keypress":
            if (ra(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = s0;
            break;
          case "focusin":
            S = "focus", v = fi;
            break;
          case "focusout":
            S = "blur", v = fi;
            break;
          case "beforeblur":
          case "afterblur":
            v = fi;
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
            v = sd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Km;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = o0;
            break;
          case hf:
          case ff:
          case pf:
            v = Gm;
            break;
          case mf:
            v = i0;
            break;
          case "scroll":
            v = zm;
            break;
          case "wheel":
            v = u0;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Qm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = ld;
        }
        var I = (t & 4) !== 0, D = !I && e === "scroll", k = I ? p !== null ? p + "Capture" : null : p;
        I = [];
        for (var x = d, g; x !== null; ) {
          g = x;
          var T = g.stateNode;
          if (g.tag === 5 && T !== null && (g = T, k !== null && (T = ao(x, k), T != null && I.push(mo(x, T, g)))), D) break;
          x = x.return;
        }
        0 < I.length && (p = new v(p, S, null, n, N), f.push({ event: p, listeners: I }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", p && n !== Zi && (S = n.relatedTarget || n.fromElement) && ($r(S) || S[Hs])) break e;
        if ((v || p) && (p = N.window === N ? N : (p = N.ownerDocument) ? p.defaultView || p.parentWindow : window, v ? (S = n.relatedTarget || n.toElement, v = d, S = S ? $r(S) : null, S !== null && (D = Kr(S), S !== D || S.tag !== 5 && S.tag !== 6) && (S = null)) : (v = null, S = d), v !== S)) {
          if (I = sd, T = "onMouseLeave", k = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (I = ld, T = "onPointerLeave", k = "onPointerEnter", x = "pointer"), D = v == null ? p : rl(v), g = S == null ? p : rl(S), p = new I(T, x + "leave", v, n, N), p.target = D, p.relatedTarget = g, T = null, $r(N) === d && (I = new I(k, x + "enter", S, n, N), I.target = g, I.relatedTarget = D, T = I), D = T, v && S) t: {
            for (I = v, k = S, x = 0, g = I; g; g = Yr(g)) x++;
            for (g = 0, T = k; T; T = Yr(T)) g++;
            for (; 0 < x - g; ) I = Yr(I), x--;
            for (; 0 < g - x; ) k = Yr(k), g--;
            for (; x--; ) {
              if (I === k || k !== null && I === k.alternate) break t;
              I = Yr(I), k = Yr(k);
            }
            I = null;
          }
          else I = null;
          v !== null && gd(f, p, v, I, !1), S !== null && D !== null && gd(f, D, S, I, !0);
        }
      }
      e: {
        if (p = d ? rl(d) : window, v = p.nodeName && p.nodeName.toLowerCase(), v === "select" || v === "input" && p.type === "file") var w = x0;
        else if (id(p)) if (of) w = k0;
        else {
          w = v0;
          var C = y0;
        }
        else (v = p.nodeName) && v.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (w = N0);
        if (w && (w = w(e, d))) {
          lf(f, w, n, N);
          break e;
        }
        C && C(e, p, d), e === "focusout" && (C = p._wrapperState) && C.controlled && p.type === "number" && Yi(p, "number", p.value);
      }
      switch (C = d ? rl(d) : window, e) {
        case "focusin":
          (id(C) || C.contentEditable === "true") && (nl = C, lc = d, eo = null);
          break;
        case "focusout":
          eo = lc = nl = null;
          break;
        case "mousedown":
          oc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          oc = !1, fd(f, n, N);
          break;
        case "selectionchange":
          if (E0) break;
        case "keydown":
        case "keyup":
          fd(f, n, N);
      }
      var h;
      if (ru) e: {
        switch (e) {
          case "compositionstart":
            var A = "onCompositionStart";
            break e;
          case "compositionend":
            A = "onCompositionEnd";
            break e;
          case "compositionupdate":
            A = "onCompositionUpdate";
            break e;
        }
        A = void 0;
      }
      else tl ? sf(e, n) && (A = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      A && (nf && n.locale !== "ko" && (tl || A !== "onCompositionStart" ? A === "onCompositionEnd" && tl && (h = tf()) : (ir = N, tu = "value" in ir ? ir.value : ir.textContent, tl = !0)), C = wa(d, A), 0 < C.length && (A = new rd(A, e, null, n, N), f.push({ event: A, listeners: C }), h ? A.data = h : (h = rf(n), h !== null && (A.data = h)))), (h = h0 ? f0(e, n) : p0(e, n)) && (d = wa(d, "onBeforeInput"), 0 < d.length && (N = new rd("onBeforeInput", "beforeinput", null, n, N), f.push({ event: N, listeners: d }), N.data = h));
    }
    xf(f, t);
  });
}
function mo(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function wa(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = ao(e, n), o != null && r.unshift(mo(e, o, l)), o = ao(e, t), o != null && r.push(mo(e, o, l))), e = e.return;
  }
  return r;
}
function Yr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function gd(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var i = n, c = i.alternate, d = i.stateNode;
    if (c !== null && c === r) break;
    i.tag === 5 && d !== null && (i = d, l ? (c = ao(n, o), c != null && a.unshift(mo(n, c, i))) : l || (c = ao(n, o), c != null && a.push(mo(n, c, i)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var M0 = /\r\n?/g, I0 = /\u0000|\uFFFD/g;
function xd(e) {
  return (typeof e == "string" ? e : "" + e).replace(M0, `
`).replace(I0, "");
}
function Ko(e, t, n) {
  if (t = xd(t), xd(e) !== t && n) throw Error(ge(425));
}
function ja() {
}
var ac = null, ic = null;
function cc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var uc = typeof setTimeout == "function" ? setTimeout : void 0, T0 = typeof clearTimeout == "function" ? clearTimeout : void 0, yd = typeof Promise == "function" ? Promise : void 0, A0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof yd < "u" ? function(e) {
  return yd.resolve(null).then(e).catch($0);
} : uc;
function $0(e) {
  setTimeout(function() {
    throw e;
  });
}
function ki(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), uo(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  uo(t);
}
function fr(e) {
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
function vd(e) {
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
var Tl = Math.random().toString(36).slice(2), Ts = "__reactFiber$" + Tl, go = "__reactProps$" + Tl, Hs = "__reactContainer$" + Tl, dc = "__reactEvents$" + Tl, R0 = "__reactListeners$" + Tl, L0 = "__reactHandles$" + Tl;
function $r(e) {
  var t = e[Ts];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Hs] || n[Ts]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = vd(e); e !== null; ) {
        if (n = e[Ts]) return n;
        e = vd(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Mo(e) {
  return e = e[Ts] || e[Hs], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function rl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ge(33));
}
function Ka(e) {
  return e[go] || null;
}
var hc = [], ll = -1;
function kr(e) {
  return { current: e };
}
function Gt(e) {
  0 > ll || (e.current = hc[ll], hc[ll] = null, ll--);
}
function Kt(e, t) {
  ll++, hc[ll] = e.current, e.current = t;
}
var vr = {}, $n = kr(vr), Yn = kr(!1), Fr = vr;
function wl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return vr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Gn(e) {
  return e = e.childContextTypes, e != null;
}
function Ea() {
  Gt(Yn), Gt($n);
}
function Nd(e, t, n) {
  if ($n.current !== vr) throw Error(ge(168));
  Kt($n, t), Kt(Yn, n);
}
function vf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(ge(108, ym(e) || "Unknown", l));
  return tn({}, n, r);
}
function Ca(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vr, Fr = $n.current, Kt($n, e), Kt(Yn, Yn.current), !0;
}
function kd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(ge(169));
  n ? (e = vf(e, t, Fr), r.__reactInternalMemoizedMergedChildContext = e, Gt(Yn), Gt($n), Kt($n, e)) : Gt(Yn), Kt(Yn, n);
}
var Ps = null, Va = !1, wi = !1;
function Nf(e) {
  Ps === null ? Ps = [e] : Ps.push(e);
}
function O0(e) {
  Va = !0, Nf(e);
}
function wr() {
  if (!wi && Ps !== null) {
    wi = !0;
    var e = 0, t = Ft;
    try {
      var n = Ps;
      for (Ft = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ps = null, Va = !1;
    } catch (l) {
      throw Ps !== null && (Ps = Ps.slice(e + 1)), Hh(Jc, wr), l;
    } finally {
      Ft = t, wi = !1;
    }
  }
  return null;
}
var ol = [], al = 0, Sa = null, ba = 0, us = [], ds = 0, Br = null, Fs = 1, Bs = "";
function Ir(e, t) {
  ol[al++] = ba, ol[al++] = Sa, Sa = e, ba = t;
}
function kf(e, t, n) {
  us[ds++] = Fs, us[ds++] = Bs, us[ds++] = Br, Br = e;
  var r = Fs;
  e = Bs;
  var l = 32 - js(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - js(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, Fs = 1 << 32 - js(t) + l | n << l | r, Bs = o + e;
  } else Fs = 1 << o | n << l | r, Bs = e;
}
function ou(e) {
  e.return !== null && (Ir(e, 1), kf(e, 1, 0));
}
function au(e) {
  for (; e === Sa; ) Sa = ol[--al], ol[al] = null, ba = ol[--al], ol[al] = null;
  for (; e === Br; ) Br = us[--ds], us[ds] = null, Bs = us[--ds], us[ds] = null, Fs = us[--ds], us[ds] = null;
}
var ns = null, ts = null, Qt = !1, ks = null;
function wf(e, t) {
  var n = hs(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function wd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ns = e, ts = fr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ns = e, ts = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Br !== null ? { id: Fs, overflow: Bs } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = hs(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ns = e, ts = null, !0) : !1;
    default:
      return !1;
  }
}
function fc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function pc(e) {
  if (Qt) {
    var t = ts;
    if (t) {
      var n = t;
      if (!wd(e, t)) {
        if (fc(e)) throw Error(ge(418));
        t = fr(n.nextSibling);
        var r = ns;
        t && wd(e, t) ? wf(r, n) : (e.flags = e.flags & -4097 | 2, Qt = !1, ns = e);
      }
    } else {
      if (fc(e)) throw Error(ge(418));
      e.flags = e.flags & -4097 | 2, Qt = !1, ns = e;
    }
  }
}
function jd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ns = e;
}
function Vo(e) {
  if (e !== ns) return !1;
  if (!Qt) return jd(e), Qt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !cc(e.type, e.memoizedProps)), t && (t = ts)) {
    if (fc(e)) throw jf(), Error(ge(418));
    for (; t; ) wf(e, t), t = fr(t.nextSibling);
  }
  if (jd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ge(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ts = fr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ts = null;
    }
  } else ts = ns ? fr(e.stateNode.nextSibling) : null;
  return !0;
}
function jf() {
  for (var e = ts; e; ) e = fr(e.nextSibling);
}
function jl() {
  ts = ns = null, Qt = !1;
}
function iu(e) {
  ks === null ? ks = [e] : ks.push(e);
}
var D0 = Ys.ReactCurrentBatchConfig;
function Bl(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(ge(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(ge(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var i = l.refs;
        a === null ? delete i[o] : i[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(ge(284));
    if (!n._owner) throw Error(ge(290, e));
  }
  return e;
}
function Yo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(ge(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ed(e) {
  var t = e._init;
  return t(e._payload);
}
function Ef(e) {
  function t(k, x) {
    if (e) {
      var g = k.deletions;
      g === null ? (k.deletions = [x], k.flags |= 16) : g.push(x);
    }
  }
  function n(k, x) {
    if (!e) return null;
    for (; x !== null; ) t(k, x), x = x.sibling;
    return null;
  }
  function r(k, x) {
    for (k = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? k.set(x.key, x) : k.set(x.index, x), x = x.sibling;
    return k;
  }
  function l(k, x) {
    return k = xr(k, x), k.index = 0, k.sibling = null, k;
  }
  function o(k, x, g) {
    return k.index = g, e ? (g = k.alternate, g !== null ? (g = g.index, g < x ? (k.flags |= 2, x) : g) : (k.flags |= 2, x)) : (k.flags |= 1048576, x);
  }
  function a(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function i(k, x, g, T) {
    return x === null || x.tag !== 6 ? (x = Ii(g, k.mode, T), x.return = k, x) : (x = l(x, g), x.return = k, x);
  }
  function c(k, x, g, T) {
    var w = g.type;
    return w === el ? N(k, x, g.props.children, T, g.key) : x !== null && (x.elementType === w || typeof w == "object" && w !== null && w.$$typeof === tr && Ed(w) === x.type) ? (T = l(x, g.props), T.ref = Bl(k, x, g), T.return = k, T) : (T = da(g.type, g.key, g.props, null, k.mode, T), T.ref = Bl(k, x, g), T.return = k, T);
  }
  function d(k, x, g, T) {
    return x === null || x.tag !== 4 || x.stateNode.containerInfo !== g.containerInfo || x.stateNode.implementation !== g.implementation ? (x = Ti(g, k.mode, T), x.return = k, x) : (x = l(x, g.children || []), x.return = k, x);
  }
  function N(k, x, g, T, w) {
    return x === null || x.tag !== 7 ? (x = _r(g, k.mode, T, w), x.return = k, x) : (x = l(x, g), x.return = k, x);
  }
  function f(k, x, g) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return x = Ii("" + x, k.mode, g), x.return = k, x;
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Do:
          return g = da(x.type, x.key, x.props, null, k.mode, g), g.ref = Bl(k, null, x), g.return = k, g;
        case qr:
          return x = Ti(x, k.mode, g), x.return = k, x;
        case tr:
          var T = x._init;
          return f(k, T(x._payload), g);
      }
      if (Yl(x) || Ol(x)) return x = _r(x, k.mode, g, null), x.return = k, x;
      Yo(k, x);
    }
    return null;
  }
  function p(k, x, g, T) {
    var w = x !== null ? x.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number") return w !== null ? null : i(k, x, "" + g, T);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Do:
          return g.key === w ? c(k, x, g, T) : null;
        case qr:
          return g.key === w ? d(k, x, g, T) : null;
        case tr:
          return w = g._init, p(
            k,
            x,
            w(g._payload),
            T
          );
      }
      if (Yl(g) || Ol(g)) return w !== null ? null : N(k, x, g, T, null);
      Yo(k, g);
    }
    return null;
  }
  function v(k, x, g, T, w) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return k = k.get(g) || null, i(x, k, "" + T, w);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case Do:
          return k = k.get(T.key === null ? g : T.key) || null, c(x, k, T, w);
        case qr:
          return k = k.get(T.key === null ? g : T.key) || null, d(x, k, T, w);
        case tr:
          var C = T._init;
          return v(k, x, g, C(T._payload), w);
      }
      if (Yl(T) || Ol(T)) return k = k.get(g) || null, N(x, k, T, w, null);
      Yo(x, T);
    }
    return null;
  }
  function S(k, x, g, T) {
    for (var w = null, C = null, h = x, A = x = 0, y = null; h !== null && A < g.length; A++) {
      h.index > A ? (y = h, h = null) : y = h.sibling;
      var b = p(k, h, g[A], T);
      if (b === null) {
        h === null && (h = y);
        break;
      }
      e && h && b.alternate === null && t(k, h), x = o(b, x, A), C === null ? w = b : C.sibling = b, C = b, h = y;
    }
    if (A === g.length) return n(k, h), Qt && Ir(k, A), w;
    if (h === null) {
      for (; A < g.length; A++) h = f(k, g[A], T), h !== null && (x = o(h, x, A), C === null ? w = h : C.sibling = h, C = h);
      return Qt && Ir(k, A), w;
    }
    for (h = r(k, h); A < g.length; A++) y = v(h, k, A, g[A], T), y !== null && (e && y.alternate !== null && h.delete(y.key === null ? A : y.key), x = o(y, x, A), C === null ? w = y : C.sibling = y, C = y);
    return e && h.forEach(function(O) {
      return t(k, O);
    }), Qt && Ir(k, A), w;
  }
  function I(k, x, g, T) {
    var w = Ol(g);
    if (typeof w != "function") throw Error(ge(150));
    if (g = w.call(g), g == null) throw Error(ge(151));
    for (var C = w = null, h = x, A = x = 0, y = null, b = g.next(); h !== null && !b.done; A++, b = g.next()) {
      h.index > A ? (y = h, h = null) : y = h.sibling;
      var O = p(k, h, b.value, T);
      if (O === null) {
        h === null && (h = y);
        break;
      }
      e && h && O.alternate === null && t(k, h), x = o(O, x, A), C === null ? w = O : C.sibling = O, C = O, h = y;
    }
    if (b.done) return n(
      k,
      h
    ), Qt && Ir(k, A), w;
    if (h === null) {
      for (; !b.done; A++, b = g.next()) b = f(k, b.value, T), b !== null && (x = o(b, x, A), C === null ? w = b : C.sibling = b, C = b);
      return Qt && Ir(k, A), w;
    }
    for (h = r(k, h); !b.done; A++, b = g.next()) b = v(h, k, A, b.value, T), b !== null && (e && b.alternate !== null && h.delete(b.key === null ? A : b.key), x = o(b, x, A), C === null ? w = b : C.sibling = b, C = b);
    return e && h.forEach(function(z) {
      return t(k, z);
    }), Qt && Ir(k, A), w;
  }
  function D(k, x, g, T) {
    if (typeof g == "object" && g !== null && g.type === el && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Do:
          e: {
            for (var w = g.key, C = x; C !== null; ) {
              if (C.key === w) {
                if (w = g.type, w === el) {
                  if (C.tag === 7) {
                    n(k, C.sibling), x = l(C, g.props.children), x.return = k, k = x;
                    break e;
                  }
                } else if (C.elementType === w || typeof w == "object" && w !== null && w.$$typeof === tr && Ed(w) === C.type) {
                  n(k, C.sibling), x = l(C, g.props), x.ref = Bl(k, C, g), x.return = k, k = x;
                  break e;
                }
                n(k, C);
                break;
              } else t(k, C);
              C = C.sibling;
            }
            g.type === el ? (x = _r(g.props.children, k.mode, T, g.key), x.return = k, k = x) : (T = da(g.type, g.key, g.props, null, k.mode, T), T.ref = Bl(k, x, g), T.return = k, k = T);
          }
          return a(k);
        case qr:
          e: {
            for (C = g.key; x !== null; ) {
              if (x.key === C) if (x.tag === 4 && x.stateNode.containerInfo === g.containerInfo && x.stateNode.implementation === g.implementation) {
                n(k, x.sibling), x = l(x, g.children || []), x.return = k, k = x;
                break e;
              } else {
                n(k, x);
                break;
              }
              else t(k, x);
              x = x.sibling;
            }
            x = Ti(g, k.mode, T), x.return = k, k = x;
          }
          return a(k);
        case tr:
          return C = g._init, D(k, x, C(g._payload), T);
      }
      if (Yl(g)) return S(k, x, g, T);
      if (Ol(g)) return I(k, x, g, T);
      Yo(k, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, x !== null && x.tag === 6 ? (n(k, x.sibling), x = l(x, g), x.return = k, k = x) : (n(k, x), x = Ii(g, k.mode, T), x.return = k, k = x), a(k)) : n(k, x);
  }
  return D;
}
var El = Ef(!0), Cf = Ef(!1), Ma = kr(null), Ia = null, il = null, cu = null;
function uu() {
  cu = il = Ia = null;
}
function du(e) {
  var t = Ma.current;
  Gt(Ma), e._currentValue = t;
}
function mc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function gl(e, t) {
  Ia = e, cu = il = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Vn = !0), e.firstContext = null);
}
function ps(e) {
  var t = e._currentValue;
  if (cu !== e) if (e = { context: e, memoizedValue: t, next: null }, il === null) {
    if (Ia === null) throw Error(ge(308));
    il = e, Ia.dependencies = { lanes: 0, firstContext: e };
  } else il = il.next = e;
  return t;
}
var Rr = null;
function hu(e) {
  Rr === null ? Rr = [e] : Rr.push(e);
}
function Sf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, hu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ks(e, r);
}
function Ks(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var nr = !1;
function fu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Us(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function pr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, St & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ks(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, hu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ks(e, n);
}
function la(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Zc(e, n);
  }
}
function Cd(e, t) {
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
function Ta(e, t, n, r) {
  var l = e.updateQueue;
  nr = !1;
  var o = l.firstBaseUpdate, a = l.lastBaseUpdate, i = l.shared.pending;
  if (i !== null) {
    l.shared.pending = null;
    var c = i, d = c.next;
    c.next = null, a === null ? o = d : a.next = d, a = c;
    var N = e.alternate;
    N !== null && (N = N.updateQueue, i = N.lastBaseUpdate, i !== a && (i === null ? N.firstBaseUpdate = d : i.next = d, N.lastBaseUpdate = c));
  }
  if (o !== null) {
    var f = l.baseState;
    a = 0, N = d = c = null, i = o;
    do {
      var p = i.lane, v = i.eventTime;
      if ((r & p) === p) {
        N !== null && (N = N.next = {
          eventTime: v,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var S = e, I = i;
          switch (p = t, v = n, I.tag) {
            case 1:
              if (S = I.payload, typeof S == "function") {
                f = S.call(v, f, p);
                break e;
              }
              f = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = I.payload, p = typeof S == "function" ? S.call(v, f, p) : S, p == null) break e;
              f = tn({}, f, p);
              break e;
            case 2:
              nr = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [i] : p.push(i));
      } else v = { eventTime: v, lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, N === null ? (d = N = v, c = f) : N = N.next = v, a |= p;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        p = i, i = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (N === null && (c = f), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = N, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        a |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Wr |= a, e.lanes = a, e.memoizedState = f;
  }
}
function Sd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(ge(191, l));
      l.call(r);
    }
  }
}
var Io = {}, Rs = kr(Io), xo = kr(Io), yo = kr(Io);
function Lr(e) {
  if (e === Io) throw Error(ge(174));
  return e;
}
function pu(e, t) {
  switch (Kt(yo, t), Kt(xo, e), Kt(Rs, Io), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Xi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Xi(t, e);
  }
  Gt(Rs), Kt(Rs, t);
}
function Cl() {
  Gt(Rs), Gt(xo), Gt(yo);
}
function Mf(e) {
  Lr(yo.current);
  var t = Lr(Rs.current), n = Xi(t, e.type);
  t !== n && (Kt(xo, e), Kt(Rs, n));
}
function mu(e) {
  xo.current === e && (Gt(Rs), Gt(xo));
}
var qt = kr(0);
function Aa(e) {
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
var ji = [];
function gu() {
  for (var e = 0; e < ji.length; e++) ji[e]._workInProgressVersionPrimary = null;
  ji.length = 0;
}
var oa = Ys.ReactCurrentDispatcher, Ei = Ys.ReactCurrentBatchConfig, Ur = 0, en = null, pn = null, yn = null, $a = !1, to = !1, vo = 0, P0 = 0;
function In() {
  throw Error(ge(321));
}
function xu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Cs(e[n], t[n])) return !1;
  return !0;
}
function yu(e, t, n, r, l, o) {
  if (Ur = o, en = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, oa.current = e === null || e.memoizedState === null ? U0 : W0, e = n(r, l), to) {
    o = 0;
    do {
      if (to = !1, vo = 0, 25 <= o) throw Error(ge(301));
      o += 1, yn = pn = null, t.updateQueue = null, oa.current = z0, e = n(r, l);
    } while (to);
  }
  if (oa.current = Ra, t = pn !== null && pn.next !== null, Ur = 0, yn = pn = en = null, $a = !1, t) throw Error(ge(300));
  return e;
}
function vu() {
  var e = vo !== 0;
  return vo = 0, e;
}
function Is() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return yn === null ? en.memoizedState = yn = e : yn = yn.next = e, yn;
}
function ms() {
  if (pn === null) {
    var e = en.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = pn.next;
  var t = yn === null ? en.memoizedState : yn.next;
  if (t !== null) yn = t, pn = e;
  else {
    if (e === null) throw Error(ge(310));
    pn = e, e = { memoizedState: pn.memoizedState, baseState: pn.baseState, baseQueue: pn.baseQueue, queue: pn.queue, next: null }, yn === null ? en.memoizedState = yn = e : yn = yn.next = e;
  }
  return yn;
}
function No(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ci(e) {
  var t = ms(), n = t.queue;
  if (n === null) throw Error(ge(311));
  n.lastRenderedReducer = e;
  var r = pn, l = r.baseQueue, o = n.pending;
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
      var N = d.lane;
      if ((Ur & N) === N) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var f = {
          lane: N,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (i = c = f, a = r) : c = c.next = f, en.lanes |= N, Wr |= N;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? a = r : c.next = i, Cs(r, t.memoizedState) || (Vn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, en.lanes |= o, Wr |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Si(e) {
  var t = ms(), n = t.queue;
  if (n === null) throw Error(ge(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Cs(o, t.memoizedState) || (Vn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function If() {
}
function Tf(e, t) {
  var n = en, r = ms(), l = t(), o = !Cs(r.memoizedState, l);
  if (o && (r.memoizedState = l, Vn = !0), r = r.queue, Nu(Rf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || yn !== null && yn.memoizedState.tag & 1) {
    if (n.flags |= 2048, ko(9, $f.bind(null, n, r, l, t), void 0, null), vn === null) throw Error(ge(349));
    Ur & 30 || Af(n, t, l);
  }
  return l;
}
function Af(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = en.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, en.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function $f(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Lf(t) && Of(e);
}
function Rf(e, t, n) {
  return n(function() {
    Lf(t) && Of(e);
  });
}
function Lf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Cs(e, n);
  } catch {
    return !0;
  }
}
function Of(e) {
  var t = Ks(e, 1);
  t !== null && Es(t, e, 1, -1);
}
function bd(e) {
  var t = Is();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: No, lastRenderedState: e }, t.queue = e, e = e.dispatch = B0.bind(null, en, e), [t.memoizedState, e];
}
function ko(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = en.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, en.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Df() {
  return ms().memoizedState;
}
function aa(e, t, n, r) {
  var l = Is();
  en.flags |= e, l.memoizedState = ko(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ya(e, t, n, r) {
  var l = ms();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (pn !== null) {
    var a = pn.memoizedState;
    if (o = a.destroy, r !== null && xu(r, a.deps)) {
      l.memoizedState = ko(t, n, o, r);
      return;
    }
  }
  en.flags |= e, l.memoizedState = ko(1 | t, n, o, r);
}
function Md(e, t) {
  return aa(8390656, 8, e, t);
}
function Nu(e, t) {
  return Ya(2048, 8, e, t);
}
function Pf(e, t) {
  return Ya(4, 2, e, t);
}
function _f(e, t) {
  return Ya(4, 4, e, t);
}
function Ff(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Bf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ya(4, 4, Ff.bind(null, t, e), n);
}
function ku() {
}
function Uf(e, t) {
  var n = ms();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Wf(e, t) {
  var n = ms();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function zf(e, t, n) {
  return Ur & 21 ? (Cs(n, t) || (n = Yh(), en.lanes |= n, Wr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Vn = !0), e.memoizedState = n);
}
function _0(e, t) {
  var n = Ft;
  Ft = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Ei.transition;
  Ei.transition = {};
  try {
    e(!1), t();
  } finally {
    Ft = n, Ei.transition = r;
  }
}
function Hf() {
  return ms().memoizedState;
}
function F0(e, t, n) {
  var r = gr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Kf(e)) Vf(t, n);
  else if (n = Sf(e, t, n, r), n !== null) {
    var l = _n();
    Es(n, e, r, l), Yf(n, t, r);
  }
}
function B0(e, t, n) {
  var r = gr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Kf(e)) Vf(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, i = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = i, Cs(i, a)) {
        var c = t.interleaved;
        c === null ? (l.next = l, hu(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Sf(e, t, l, r), n !== null && (l = _n(), Es(n, e, r, l), Yf(n, t, r));
  }
}
function Kf(e) {
  var t = e.alternate;
  return e === en || t !== null && t === en;
}
function Vf(e, t) {
  to = $a = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Yf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Zc(e, n);
  }
}
var Ra = { readContext: ps, useCallback: In, useContext: In, useEffect: In, useImperativeHandle: In, useInsertionEffect: In, useLayoutEffect: In, useMemo: In, useReducer: In, useRef: In, useState: In, useDebugValue: In, useDeferredValue: In, useTransition: In, useMutableSource: In, useSyncExternalStore: In, useId: In, unstable_isNewReconciler: !1 }, U0 = { readContext: ps, useCallback: function(e, t) {
  return Is().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ps, useEffect: Md, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, aa(
    4194308,
    4,
    Ff.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return aa(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return aa(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Is();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Is();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = F0.bind(null, en, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Is();
  return e = { current: e }, t.memoizedState = e;
}, useState: bd, useDebugValue: ku, useDeferredValue: function(e) {
  return Is().memoizedState = e;
}, useTransition: function() {
  var e = bd(!1), t = e[0];
  return e = _0.bind(null, e[1]), Is().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = en, l = Is();
  if (Qt) {
    if (n === void 0) throw Error(ge(407));
    n = n();
  } else {
    if (n = t(), vn === null) throw Error(ge(349));
    Ur & 30 || Af(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Md(Rf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ko(9, $f.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Is(), t = vn.identifierPrefix;
  if (Qt) {
    var n = Bs, r = Fs;
    n = (r & ~(1 << 32 - js(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = vo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = P0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, W0 = {
  readContext: ps,
  useCallback: Uf,
  useContext: ps,
  useEffect: Nu,
  useImperativeHandle: Bf,
  useInsertionEffect: Pf,
  useLayoutEffect: _f,
  useMemo: Wf,
  useReducer: Ci,
  useRef: Df,
  useState: function() {
    return Ci(No);
  },
  useDebugValue: ku,
  useDeferredValue: function(e) {
    var t = ms();
    return zf(t, pn.memoizedState, e);
  },
  useTransition: function() {
    var e = Ci(No)[0], t = ms().memoizedState;
    return [e, t];
  },
  useMutableSource: If,
  useSyncExternalStore: Tf,
  useId: Hf,
  unstable_isNewReconciler: !1
}, z0 = { readContext: ps, useCallback: Uf, useContext: ps, useEffect: Nu, useImperativeHandle: Bf, useInsertionEffect: Pf, useLayoutEffect: _f, useMemo: Wf, useReducer: Si, useRef: Df, useState: function() {
  return Si(No);
}, useDebugValue: ku, useDeferredValue: function(e) {
  var t = ms();
  return pn === null ? t.memoizedState = e : zf(t, pn.memoizedState, e);
}, useTransition: function() {
  var e = Si(No)[0], t = ms().memoizedState;
  return [e, t];
}, useMutableSource: If, useSyncExternalStore: Tf, useId: Hf, unstable_isNewReconciler: !1 };
function vs(e, t) {
  if (e && e.defaultProps) {
    t = tn({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function gc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : tn({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ga = { isMounted: function(e) {
  return (e = e._reactInternals) ? Kr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = _n(), l = gr(e), o = Us(r, l);
  o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (Es(t, e, l, r), la(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = _n(), l = gr(e), o = Us(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (Es(t, e, l, r), la(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = _n(), r = gr(e), l = Us(n, r);
  l.tag = 2, t != null && (l.callback = t), t = pr(e, l, r), t !== null && (Es(t, e, r, n), la(t, e, r));
} };
function Id(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !fo(n, r) || !fo(l, o) : !0;
}
function Gf(e, t, n) {
  var r = !1, l = vr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ps(o) : (l = Gn(t) ? Fr : $n.current, r = t.contextTypes, o = (r = r != null) ? wl(e, l) : vr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ga, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Td(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ga.enqueueReplaceState(t, t.state, null);
}
function xc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, fu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ps(o) : (o = Gn(t) ? Fr : $n.current, l.context = wl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (gc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Ga.enqueueReplaceState(l, l.state, null), Ta(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Sl(e, t) {
  try {
    var n = "", r = t;
    do
      n += xm(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function bi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function yc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var H0 = typeof WeakMap == "function" ? WeakMap : Map;
function Xf(e, t, n) {
  n = Us(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Oa || (Oa = !0, Mc = r), yc(e, t);
  }, n;
}
function Qf(e, t, n) {
  n = Us(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      yc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    yc(e, t), typeof r != "function" && (mr === null ? mr = /* @__PURE__ */ new Set([this]) : mr.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function Ad(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new H0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = rg.bind(null, e, t, n), t.then(e, e));
}
function $d(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Rd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Us(-1, 1), t.tag = 2, pr(n, t, 1))), n.lanes |= 1), e);
}
var K0 = Ys.ReactCurrentOwner, Vn = !1;
function Pn(e, t, n, r) {
  t.child = e === null ? Cf(t, null, n, r) : El(t, e.child, n, r);
}
function Ld(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return gl(t, l), r = yu(e, t, n, r, o, l), n = vu(), e !== null && !Vn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Vs(e, t, l)) : (Qt && n && ou(t), t.flags |= 1, Pn(e, t, r, l), t.child);
}
function Od(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Iu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Jf(e, t, o, r, l)) : (e = da(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : fo, n(a, r) && e.ref === t.ref) return Vs(e, t, l);
  }
  return t.flags |= 1, e = xr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Jf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (fo(o, r) && e.ref === t.ref) if (Vn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Vn = !0);
    else return t.lanes = e.lanes, Vs(e, t, l);
  }
  return vc(e, t, n, r, l);
}
function Zf(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Kt(ul, qn), qn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Kt(ul, qn), qn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Kt(ul, qn), qn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Kt(ul, qn), qn |= r;
  return Pn(e, t, l, n), t.child;
}
function qf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function vc(e, t, n, r, l) {
  var o = Gn(n) ? Fr : $n.current;
  return o = wl(t, o), gl(t, l), n = yu(e, t, n, r, o, l), r = vu(), e !== null && !Vn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Vs(e, t, l)) : (Qt && r && ou(t), t.flags |= 1, Pn(e, t, n, l), t.child);
}
function Dd(e, t, n, r, l) {
  if (Gn(n)) {
    var o = !0;
    Ca(t);
  } else o = !1;
  if (gl(t, l), t.stateNode === null) ia(e, t), Gf(t, n, r), xc(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, i = t.memoizedProps;
    a.props = i;
    var c = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = ps(d) : (d = Gn(n) ? Fr : $n.current, d = wl(t, d));
    var N = n.getDerivedStateFromProps, f = typeof N == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && Td(t, a, r, d), nr = !1;
    var p = t.memoizedState;
    a.state = p, Ta(t, r, a, l), c = t.memoizedState, i !== r || p !== c || Yn.current || nr ? (typeof N == "function" && (gc(t, n, N, r), c = t.memoizedState), (i = nr || Id(t, n, i, r, p, c, d)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, bf(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : vs(t.type, i), a.props = d, f = t.pendingProps, p = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = ps(c) : (c = Gn(n) ? Fr : $n.current, c = wl(t, c));
    var v = n.getDerivedStateFromProps;
    (N = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== f || p !== c) && Td(t, a, r, c), nr = !1, p = t.memoizedState, a.state = p, Ta(t, r, a, l);
    var S = t.memoizedState;
    i !== f || p !== S || Yn.current || nr ? (typeof v == "function" && (gc(t, n, v, r), S = t.memoizedState), (d = nr || Id(t, n, d, r, p, S, c) || !1) ? (N || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, S, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, S, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), a.props = r, a.state = S, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Nc(e, t, n, r, o, l);
}
function Nc(e, t, n, r, l, o) {
  qf(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && kd(t, n, !1), Vs(e, t, o);
  r = t.stateNode, K0.current = t;
  var i = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = El(t, e.child, null, o), t.child = El(t, null, i, o)) : Pn(e, t, i, o), t.memoizedState = r.state, l && kd(t, n, !0), t.child;
}
function ep(e) {
  var t = e.stateNode;
  t.pendingContext ? Nd(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Nd(e, t.context, !1), pu(e, t.containerInfo);
}
function Pd(e, t, n, r, l) {
  return jl(), iu(l), t.flags |= 256, Pn(e, t, n, r), t.child;
}
var kc = { dehydrated: null, treeContext: null, retryLane: 0 };
function wc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function tp(e, t, n) {
  var r = t.pendingProps, l = qt.current, o = !1, a = (t.flags & 128) !== 0, i;
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Kt(qt, l & 1), e === null)
    return pc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = Ja(a, r, 0, null), e = _r(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = wc(n), t.memoizedState = kc, e) : wu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return V0(e, t, a, r, i, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, i = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = xr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = xr(i, o) : (o = _r(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? wc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = kc, r;
  }
  return o = e.child, e = o.sibling, r = xr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function wu(e, t) {
  return t = Ja({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Go(e, t, n, r) {
  return r !== null && iu(r), El(t, e.child, null, n), e = wu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function V0(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = bi(Error(ge(422))), Go(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Ja({ mode: "visible", children: r.children }, l, 0, null), o = _r(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && El(t, e.child, null, a), t.child.memoizedState = wc(a), t.memoizedState = kc, o);
  if (!(t.mode & 1)) return Go(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(ge(419)), r = bi(o, r, void 0), Go(e, t, a, r);
  }
  if (i = (a & e.childLanes) !== 0, Vn || i) {
    if (r = vn, r !== null) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ks(e, l), Es(r, e, l, -1));
    }
    return Mu(), r = bi(Error(ge(421))), Go(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = lg.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, ts = fr(l.nextSibling), ns = t, Qt = !0, ks = null, e !== null && (us[ds++] = Fs, us[ds++] = Bs, us[ds++] = Br, Fs = e.id, Bs = e.overflow, Br = t), t = wu(t, r.children), t.flags |= 4096, t);
}
function _d(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), mc(e.return, t, n);
}
function Mi(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function np(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Pn(e, t, r.children, n), r = qt.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && _d(e, n, t);
      else if (e.tag === 19) _d(e, n, t);
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
  if (Kt(qt, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Aa(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Mi(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Aa(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Mi(t, !0, n, null, o);
      break;
    case "together":
      Mi(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ia(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Vs(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Wr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ge(153));
  if (t.child !== null) {
    for (e = t.child, n = xr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = xr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Y0(e, t, n) {
  switch (t.tag) {
    case 3:
      ep(t), jl();
      break;
    case 5:
      Mf(t);
      break;
    case 1:
      Gn(t.type) && Ca(t);
      break;
    case 4:
      pu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Kt(Ma, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Kt(qt, qt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? tp(e, t, n) : (Kt(qt, qt.current & 1), e = Vs(e, t, n), e !== null ? e.sibling : null);
      Kt(qt, qt.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return np(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Kt(qt, qt.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Zf(e, t, n);
  }
  return Vs(e, t, n);
}
var sp, jc, rp, lp;
sp = function(e, t) {
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
jc = function() {
};
rp = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Lr(Rs.current);
    var o = null;
    switch (n) {
      case "input":
        l = Ki(e, l), r = Ki(e, r), o = [];
        break;
      case "select":
        l = tn({}, l, { value: void 0 }), r = tn({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Gi(e, l), r = Gi(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ja);
    }
    Qi(n, r);
    var a;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var i = l[d];
      for (a in i) i.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (lo.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (i = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== i && (c != null || i != null)) if (d === "style") if (i) {
        for (a in i) !i.hasOwnProperty(a) || c && c.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in c) c.hasOwnProperty(a) && i[a] !== c[a] && (n || (n = {}), n[a] = c[a]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, i = i ? i.__html : void 0, c != null && i !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (lo.hasOwnProperty(d) ? (c != null && d === "onScroll" && Yt("scroll", e), o || i === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
lp = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ul(e, t) {
  if (!Qt) switch (e.tailMode) {
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
function Tn(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function G0(e, t, n) {
  var r = t.pendingProps;
  switch (au(t), t.tag) {
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
      return Tn(t), null;
    case 1:
      return Gn(t.type) && Ea(), Tn(t), null;
    case 3:
      return r = t.stateNode, Cl(), Gt(Yn), Gt($n), gu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Vo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ks !== null && (Ac(ks), ks = null))), jc(e, t), Tn(t), null;
    case 5:
      mu(t);
      var l = Lr(yo.current);
      if (n = t.type, e !== null && t.stateNode != null) rp(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(ge(166));
          return Tn(t), null;
        }
        if (e = Lr(Rs.current), Vo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ts] = t, r[go] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Xl.length; l++) Yt(Xl[l], r);
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
              Yu(r, o), Yt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Yt("invalid", r);
              break;
            case "textarea":
              Xu(r, o), Yt("invalid", r);
          }
          Qi(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var i = o[a];
            a === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && Ko(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && Ko(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : lo.hasOwnProperty(a) && i != null && a === "onScroll" && Yt("scroll", r);
          }
          switch (n) {
            case "input":
              Po(r), Gu(r, o, !0);
              break;
            case "textarea":
              Po(r), Qu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ja);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = $h(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Ts] = t, e[go] = r, sp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = Ji(n, r), n) {
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
                for (l = 0; l < Xl.length; l++) Yt(Xl[l], e);
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
                Yu(e, r), l = Ki(e, r), Yt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = tn({}, r, { value: void 0 }), Yt("invalid", e);
                break;
              case "textarea":
                Xu(e, r), l = Gi(e, r), Yt("invalid", e);
                break;
              default:
                l = r;
            }
            Qi(n, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var c = i[o];
              o === "style" ? Oh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Rh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && oo(e, c) : typeof c == "number" && oo(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (lo.hasOwnProperty(o) ? c != null && o === "onScroll" && Yt("scroll", e) : c != null && Vc(e, o, c, a));
            }
            switch (n) {
              case "input":
                Po(e), Gu(e, r, !1);
                break;
              case "textarea":
                Po(e), Qu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + yr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? hl(e, !!r.multiple, o, !1) : r.defaultValue != null && hl(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ja);
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
      return Tn(t), null;
    case 6:
      if (e && t.stateNode != null) lp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(ge(166));
        if (n = Lr(yo.current), Lr(Rs.current), Vo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ts] = t, (o = r.nodeValue !== n) && (e = ns, e !== null)) switch (e.tag) {
            case 3:
              Ko(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ko(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ts] = t, t.stateNode = r;
      }
      return Tn(t), null;
    case 13:
      if (Gt(qt), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Qt && ts !== null && t.mode & 1 && !(t.flags & 128)) jf(), jl(), t.flags |= 98560, o = !1;
        else if (o = Vo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(ge(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(ge(317));
            o[Ts] = t;
          } else jl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Tn(t), o = !1;
        } else ks !== null && (Ac(ks), ks = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || qt.current & 1 ? mn === 0 && (mn = 3) : Mu())), t.updateQueue !== null && (t.flags |= 4), Tn(t), null);
    case 4:
      return Cl(), jc(e, t), e === null && po(t.stateNode.containerInfo), Tn(t), null;
    case 10:
      return du(t.type._context), Tn(t), null;
    case 17:
      return Gn(t.type) && Ea(), Tn(t), null;
    case 19:
      if (Gt(qt), o = t.memoizedState, o === null) return Tn(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) Ul(o, !1);
      else {
        if (mn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = Aa(e), a !== null) {
            for (t.flags |= 128, Ul(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Kt(qt, qt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && rn() > bl && (t.flags |= 128, r = !0, Ul(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Aa(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Ul(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Qt) return Tn(t), null;
        } else 2 * rn() - o.renderingStartTime > bl && n !== 1073741824 && (t.flags |= 128, r = !0, Ul(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = rn(), t.sibling = null, n = qt.current, Kt(qt, r ? n & 1 | 2 : n & 1), t) : (Tn(t), null);
    case 22:
    case 23:
      return bu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? qn & 1073741824 && (Tn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Tn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ge(156, t.tag));
}
function X0(e, t) {
  switch (au(t), t.tag) {
    case 1:
      return Gn(t.type) && Ea(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Cl(), Gt(Yn), Gt($n), gu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return mu(t), null;
    case 13:
      if (Gt(qt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ge(340));
        jl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Gt(qt), null;
    case 4:
      return Cl(), null;
    case 10:
      return du(t.type._context), null;
    case 22:
    case 23:
      return bu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Xo = !1, An = !1, Q0 = typeof WeakSet == "function" ? WeakSet : Set, We = null;
function cl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    sn(e, t, r);
  }
  else n.current = null;
}
function Ec(e, t, n) {
  try {
    n();
  } catch (r) {
    sn(e, t, r);
  }
}
var Fd = !1;
function J0(e, t) {
  if (ac = Na, e = uf(), lu(e)) {
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
        var a = 0, i = -1, c = -1, d = 0, N = 0, f = e, p = null;
        t: for (; ; ) {
          for (var v; f !== n || l !== 0 && f.nodeType !== 3 || (i = a + l), f !== o || r !== 0 && f.nodeType !== 3 || (c = a + r), f.nodeType === 3 && (a += f.nodeValue.length), (v = f.firstChild) !== null; )
            p = f, f = v;
          for (; ; ) {
            if (f === e) break t;
            if (p === n && ++d === l && (i = a), p === o && ++N === r && (c = a), (v = f.nextSibling) !== null) break;
            f = p, p = f.parentNode;
          }
          f = v;
        }
        n = i === -1 || c === -1 ? null : { start: i, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ic = { focusedElem: e, selectionRange: n }, Na = !1, We = t; We !== null; ) if (t = We, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, We = e;
  else for (; We !== null; ) {
    t = We;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var I = S.memoizedProps, D = S.memoizedState, k = t.stateNode, x = k.getSnapshotBeforeUpdate(t.elementType === t.type ? I : vs(t.type, I), D);
            k.__reactInternalSnapshotBeforeUpdate = x;
          }
          break;
        case 3:
          var g = t.stateNode.containerInfo;
          g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(ge(163));
      }
    } catch (T) {
      sn(t, t.return, T);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, We = e;
      break;
    }
    We = t.return;
  }
  return S = Fd, Fd = !1, S;
}
function no(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Ec(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Xa(e, t) {
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
function Cc(e) {
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
function op(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, op(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ts], delete t[go], delete t[dc], delete t[R0], delete t[L0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function ap(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Bd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || ap(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Sc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ja));
  else if (r !== 4 && (e = e.child, e !== null)) for (Sc(e, t, n), e = e.sibling; e !== null; ) Sc(e, t, n), e = e.sibling;
}
function bc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (bc(e, t, n), e = e.sibling; e !== null; ) bc(e, t, n), e = e.sibling;
}
var wn = null, Ns = !1;
function Zs(e, t, n) {
  for (n = n.child; n !== null; ) ip(e, t, n), n = n.sibling;
}
function ip(e, t, n) {
  if ($s && typeof $s.onCommitFiberUnmount == "function") try {
    $s.onCommitFiberUnmount(Ua, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      An || cl(n, t);
    case 6:
      var r = wn, l = Ns;
      wn = null, Zs(e, t, n), wn = r, Ns = l, wn !== null && (Ns ? (e = wn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : wn.removeChild(n.stateNode));
      break;
    case 18:
      wn !== null && (Ns ? (e = wn, n = n.stateNode, e.nodeType === 8 ? ki(e.parentNode, n) : e.nodeType === 1 && ki(e, n), uo(e)) : ki(wn, n.stateNode));
      break;
    case 4:
      r = wn, l = Ns, wn = n.stateNode.containerInfo, Ns = !0, Zs(e, t, n), wn = r, Ns = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!An && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Ec(n, t, a), l = l.next;
        } while (l !== r);
      }
      Zs(e, t, n);
      break;
    case 1:
      if (!An && (cl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        sn(n, t, i);
      }
      Zs(e, t, n);
      break;
    case 21:
      Zs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (An = (r = An) || n.memoizedState !== null, Zs(e, t, n), An = r) : Zs(e, t, n);
      break;
    default:
      Zs(e, t, n);
  }
}
function Ud(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Q0()), t.forEach(function(r) {
      var l = og.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function ys(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, a = t, i = a;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            wn = i.stateNode, Ns = !1;
            break e;
          case 3:
            wn = i.stateNode.containerInfo, Ns = !0;
            break e;
          case 4:
            wn = i.stateNode.containerInfo, Ns = !0;
            break e;
        }
        i = i.return;
      }
      if (wn === null) throw Error(ge(160));
      ip(o, a, l), wn = null, Ns = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      sn(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) cp(t, e), t = t.sibling;
}
function cp(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ys(t, e), Ms(e), r & 4) {
        try {
          no(3, e, e.return), Xa(3, e);
        } catch (I) {
          sn(e, e.return, I);
        }
        try {
          no(5, e, e.return);
        } catch (I) {
          sn(e, e.return, I);
        }
      }
      break;
    case 1:
      ys(t, e), Ms(e), r & 512 && n !== null && cl(n, n.return);
      break;
    case 5:
      if (ys(t, e), Ms(e), r & 512 && n !== null && cl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          oo(l, "");
        } catch (I) {
          sn(e, e.return, I);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, i = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          i === "input" && o.type === "radio" && o.name != null && Th(l, o), Ji(i, a);
          var d = Ji(i, o);
          for (a = 0; a < c.length; a += 2) {
            var N = c[a], f = c[a + 1];
            N === "style" ? Oh(l, f) : N === "dangerouslySetInnerHTML" ? Rh(l, f) : N === "children" ? oo(l, f) : Vc(l, N, f, d);
          }
          switch (i) {
            case "input":
              Vi(l, o);
              break;
            case "textarea":
              Ah(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var v = o.value;
              v != null ? hl(l, !!o.multiple, v, !1) : p !== !!o.multiple && (o.defaultValue != null ? hl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : hl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[go] = o;
        } catch (I) {
          sn(e, e.return, I);
        }
      }
      break;
    case 6:
      if (ys(t, e), Ms(e), r & 4) {
        if (e.stateNode === null) throw Error(ge(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (I) {
          sn(e, e.return, I);
        }
      }
      break;
    case 3:
      if (ys(t, e), Ms(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        uo(t.containerInfo);
      } catch (I) {
        sn(e, e.return, I);
      }
      break;
    case 4:
      ys(t, e), Ms(e);
      break;
    case 13:
      ys(t, e), Ms(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Cu = rn())), r & 4 && Ud(e);
      break;
    case 22:
      if (N = n !== null && n.memoizedState !== null, e.mode & 1 ? (An = (d = An) || N, ys(t, e), An = d) : ys(t, e), Ms(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !N && e.mode & 1) for (We = e, N = e.child; N !== null; ) {
          for (f = We = N; We !== null; ) {
            switch (p = We, v = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                no(4, p, p.return);
                break;
              case 1:
                cl(p, p.return);
                var S = p.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (I) {
                    sn(r, n, I);
                  }
                }
                break;
              case 5:
                cl(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  zd(f);
                  continue;
                }
            }
            v !== null ? (v.return = p, We = v) : zd(f);
          }
          N = N.sibling;
        }
        e: for (N = null, f = e; ; ) {
          if (f.tag === 5) {
            if (N === null) {
              N = f;
              try {
                l = f.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = f.stateNode, c = f.memoizedProps.style, a = c != null && c.hasOwnProperty("display") ? c.display : null, i.style.display = Lh("display", a));
              } catch (I) {
                sn(e, e.return, I);
              }
            }
          } else if (f.tag === 6) {
            if (N === null) try {
              f.stateNode.nodeValue = d ? "" : f.memoizedProps;
            } catch (I) {
              sn(e, e.return, I);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            N === f && (N = null), f = f.return;
          }
          N === f && (N = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      ys(t, e), Ms(e), r & 4 && Ud(e);
      break;
    case 21:
      break;
    default:
      ys(
        t,
        e
      ), Ms(e);
  }
}
function Ms(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (ap(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(ge(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (oo(l, ""), r.flags &= -33);
          var o = Bd(e);
          bc(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, i = Bd(e);
          Sc(e, i, a);
          break;
        default:
          throw Error(ge(161));
      }
    } catch (c) {
      sn(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Z0(e, t, n) {
  We = e, up(e);
}
function up(e, t, n) {
  for (var r = (e.mode & 1) !== 0; We !== null; ) {
    var l = We, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || Xo;
      if (!a) {
        var i = l.alternate, c = i !== null && i.memoizedState !== null || An;
        i = Xo;
        var d = An;
        if (Xo = a, (An = c) && !d) for (We = l; We !== null; ) a = We, c = a.child, a.tag === 22 && a.memoizedState !== null ? Hd(l) : c !== null ? (c.return = a, We = c) : Hd(l);
        for (; o !== null; ) We = o, up(o), o = o.sibling;
        We = l, Xo = i, An = d;
      }
      Wd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, We = o) : Wd(e);
  }
}
function Wd(e) {
  for (; We !== null; ) {
    var t = We;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            An || Xa(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !An) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : vs(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Sd(t, o, r);
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
              Sd(t, a, n);
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
                var N = d.memoizedState;
                if (N !== null) {
                  var f = N.dehydrated;
                  f !== null && uo(f);
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
            throw Error(ge(163));
        }
        An || t.flags & 512 && Cc(t);
      } catch (p) {
        sn(t, t.return, p);
      }
    }
    if (t === e) {
      We = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, We = n;
      break;
    }
    We = t.return;
  }
}
function zd(e) {
  for (; We !== null; ) {
    var t = We;
    if (t === e) {
      We = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, We = n;
      break;
    }
    We = t.return;
  }
}
function Hd(e) {
  for (; We !== null; ) {
    var t = We;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Xa(4, t);
          } catch (c) {
            sn(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              sn(t, l, c);
            }
          }
          var o = t.return;
          try {
            Cc(t);
          } catch (c) {
            sn(t, o, c);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Cc(t);
          } catch (c) {
            sn(t, a, c);
          }
      }
    } catch (c) {
      sn(t, t.return, c);
    }
    if (t === e) {
      We = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, We = i;
      break;
    }
    We = t.return;
  }
}
var q0 = Math.ceil, La = Ys.ReactCurrentDispatcher, ju = Ys.ReactCurrentOwner, fs = Ys.ReactCurrentBatchConfig, St = 0, vn = null, an = null, jn = 0, qn = 0, ul = kr(0), mn = 0, wo = null, Wr = 0, Qa = 0, Eu = 0, so = null, Kn = null, Cu = 0, bl = 1 / 0, Ds = null, Oa = !1, Mc = null, mr = null, Qo = !1, cr = null, Da = 0, ro = 0, Ic = null, ca = -1, ua = 0;
function _n() {
  return St & 6 ? rn() : ca !== -1 ? ca : ca = rn();
}
function gr(e) {
  return e.mode & 1 ? St & 2 && jn !== 0 ? jn & -jn : D0.transition !== null ? (ua === 0 && (ua = Yh()), ua) : (e = Ft, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ef(e.type)), e) : 1;
}
function Es(e, t, n, r) {
  if (50 < ro) throw ro = 0, Ic = null, Error(ge(185));
  So(e, n, r), (!(St & 2) || e !== vn) && (e === vn && (!(St & 2) && (Qa |= n), mn === 4 && or(e, jn)), Xn(e, r), n === 1 && St === 0 && !(t.mode & 1) && (bl = rn() + 500, Va && wr()));
}
function Xn(e, t) {
  var n = e.callbackNode;
  Dm(e, t);
  var r = va(e, e === vn ? jn : 0);
  if (r === 0) n !== null && qu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && qu(n), t === 1) e.tag === 0 ? O0(Kd.bind(null, e)) : Nf(Kd.bind(null, e)), A0(function() {
      !(St & 6) && wr();
    }), n = null;
    else {
      switch (Gh(r)) {
        case 1:
          n = Jc;
          break;
        case 4:
          n = Kh;
          break;
        case 16:
          n = ya;
          break;
        case 536870912:
          n = Vh;
          break;
        default:
          n = ya;
      }
      n = yp(n, dp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function dp(e, t) {
  if (ca = -1, ua = 0, St & 6) throw Error(ge(327));
  var n = e.callbackNode;
  if (xl() && e.callbackNode !== n) return null;
  var r = va(e, e === vn ? jn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Pa(e, r);
  else {
    t = r;
    var l = St;
    St |= 2;
    var o = fp();
    (vn !== e || jn !== t) && (Ds = null, bl = rn() + 500, Pr(e, t));
    do
      try {
        ng();
        break;
      } catch (i) {
        hp(e, i);
      }
    while (!0);
    uu(), La.current = o, St = l, an !== null ? t = 0 : (vn = null, jn = 0, t = mn);
  }
  if (t !== 0) {
    if (t === 2 && (l = nc(e), l !== 0 && (r = l, t = Tc(e, l))), t === 1) throw n = wo, Pr(e, 0), or(e, r), Xn(e, rn()), n;
    if (t === 6) or(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !eg(l) && (t = Pa(e, r), t === 2 && (o = nc(e), o !== 0 && (r = o, t = Tc(e, o))), t === 1)) throw n = wo, Pr(e, 0), or(e, r), Xn(e, rn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(ge(345));
        case 2:
          Tr(e, Kn, Ds);
          break;
        case 3:
          if (or(e, r), (r & 130023424) === r && (t = Cu + 500 - rn(), 10 < t)) {
            if (va(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              _n(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = uc(Tr.bind(null, e, Kn, Ds), t);
            break;
          }
          Tr(e, Kn, Ds);
          break;
        case 4:
          if (or(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - js(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = rn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * q0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = uc(Tr.bind(null, e, Kn, Ds), r);
            break;
          }
          Tr(e, Kn, Ds);
          break;
        case 5:
          Tr(e, Kn, Ds);
          break;
        default:
          throw Error(ge(329));
      }
    }
  }
  return Xn(e, rn()), e.callbackNode === n ? dp.bind(null, e) : null;
}
function Tc(e, t) {
  var n = so;
  return e.current.memoizedState.isDehydrated && (Pr(e, t).flags |= 256), e = Pa(e, t), e !== 2 && (t = Kn, Kn = n, t !== null && Ac(t)), e;
}
function Ac(e) {
  Kn === null ? Kn = e : Kn.push.apply(Kn, e);
}
function eg(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Cs(o(), l)) return !1;
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
function or(e, t) {
  for (t &= ~Eu, t &= ~Qa, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - js(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Kd(e) {
  if (St & 6) throw Error(ge(327));
  xl();
  var t = va(e, 0);
  if (!(t & 1)) return Xn(e, rn()), null;
  var n = Pa(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = nc(e);
    r !== 0 && (t = r, n = Tc(e, r));
  }
  if (n === 1) throw n = wo, Pr(e, 0), or(e, t), Xn(e, rn()), n;
  if (n === 6) throw Error(ge(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Tr(e, Kn, Ds), Xn(e, rn()), null;
}
function Su(e, t) {
  var n = St;
  St |= 1;
  try {
    return e(t);
  } finally {
    St = n, St === 0 && (bl = rn() + 500, Va && wr());
  }
}
function zr(e) {
  cr !== null && cr.tag === 0 && !(St & 6) && xl();
  var t = St;
  St |= 1;
  var n = fs.transition, r = Ft;
  try {
    if (fs.transition = null, Ft = 1, e) return e();
  } finally {
    Ft = r, fs.transition = n, St = t, !(St & 6) && wr();
  }
}
function bu() {
  qn = ul.current, Gt(ul);
}
function Pr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, T0(n)), an !== null) for (n = an.return; n !== null; ) {
    var r = n;
    switch (au(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ea();
        break;
      case 3:
        Cl(), Gt(Yn), Gt($n), gu();
        break;
      case 5:
        mu(r);
        break;
      case 4:
        Cl();
        break;
      case 13:
        Gt(qt);
        break;
      case 19:
        Gt(qt);
        break;
      case 10:
        du(r.type._context);
        break;
      case 22:
      case 23:
        bu();
    }
    n = n.return;
  }
  if (vn = e, an = e = xr(e.current, null), jn = qn = t, mn = 0, wo = null, Eu = Qa = Wr = 0, Kn = so = null, Rr !== null) {
    for (t = 0; t < Rr.length; t++) if (n = Rr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = l, r.next = a;
      }
      n.pending = r;
    }
    Rr = null;
  }
  return e;
}
function hp(e, t) {
  do {
    var n = an;
    try {
      if (uu(), oa.current = Ra, $a) {
        for (var r = en.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        $a = !1;
      }
      if (Ur = 0, yn = pn = en = null, to = !1, vo = 0, ju.current = null, n === null || n.return === null) {
        mn = 1, wo = t, an = null;
        break;
      }
      e: {
        var o = e, a = n.return, i = n, c = t;
        if (t = jn, i.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, N = i, f = N.tag;
          if (!(N.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = N.alternate;
            p ? (N.updateQueue = p.updateQueue, N.memoizedState = p.memoizedState, N.lanes = p.lanes) : (N.updateQueue = null, N.memoizedState = null);
          }
          var v = $d(a);
          if (v !== null) {
            v.flags &= -257, Rd(v, a, i, o, t), v.mode & 1 && Ad(o, d, t), t = v, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var I = /* @__PURE__ */ new Set();
              I.add(c), t.updateQueue = I;
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              Ad(o, d, t), Mu();
              break e;
            }
            c = Error(ge(426));
          }
        } else if (Qt && i.mode & 1) {
          var D = $d(a);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Rd(D, a, i, o, t), iu(Sl(c, i));
            break e;
          }
        }
        o = c = Sl(c, i), mn !== 4 && (mn = 2), so === null ? so = [o] : so.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Xf(o, c, t);
              Cd(o, k);
              break e;
            case 1:
              i = c;
              var x = o.type, g = o.stateNode;
              if (!(o.flags & 128) && (typeof x.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (mr === null || !mr.has(g)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var T = Qf(o, i, t);
                Cd(o, T);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      mp(n);
    } catch (w) {
      t = w, an === n && n !== null && (an = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function fp() {
  var e = La.current;
  return La.current = Ra, e === null ? Ra : e;
}
function Mu() {
  (mn === 0 || mn === 3 || mn === 2) && (mn = 4), vn === null || !(Wr & 268435455) && !(Qa & 268435455) || or(vn, jn);
}
function Pa(e, t) {
  var n = St;
  St |= 2;
  var r = fp();
  (vn !== e || jn !== t) && (Ds = null, Pr(e, t));
  do
    try {
      tg();
      break;
    } catch (l) {
      hp(e, l);
    }
  while (!0);
  if (uu(), St = n, La.current = r, an !== null) throw Error(ge(261));
  return vn = null, jn = 0, mn;
}
function tg() {
  for (; an !== null; ) pp(an);
}
function ng() {
  for (; an !== null && !bm(); ) pp(an);
}
function pp(e) {
  var t = xp(e.alternate, e, qn);
  e.memoizedProps = e.pendingProps, t === null ? mp(e) : an = t, ju.current = null;
}
function mp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = X0(n, t), n !== null) {
        n.flags &= 32767, an = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        mn = 6, an = null;
        return;
      }
    } else if (n = G0(n, t, qn), n !== null) {
      an = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      an = t;
      return;
    }
    an = t = e;
  } while (t !== null);
  mn === 0 && (mn = 5);
}
function Tr(e, t, n) {
  var r = Ft, l = fs.transition;
  try {
    fs.transition = null, Ft = 1, sg(e, t, n, r);
  } finally {
    fs.transition = l, Ft = r;
  }
  return null;
}
function sg(e, t, n, r) {
  do
    xl();
  while (cr !== null);
  if (St & 6) throw Error(ge(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(ge(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Pm(e, o), e === vn && (an = vn = null, jn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Qo || (Qo = !0, yp(ya, function() {
    return xl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = fs.transition, fs.transition = null;
    var a = Ft;
    Ft = 1;
    var i = St;
    St |= 4, ju.current = null, J0(e, n), cp(n, e), j0(ic), Na = !!ac, ic = ac = null, e.current = n, Z0(n), Mm(), St = i, Ft = a, fs.transition = o;
  } else e.current = n;
  if (Qo && (Qo = !1, cr = e, Da = l), o = e.pendingLanes, o === 0 && (mr = null), Am(n.stateNode), Xn(e, rn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Oa) throw Oa = !1, e = Mc, Mc = null, e;
  return Da & 1 && e.tag !== 0 && xl(), o = e.pendingLanes, o & 1 ? e === Ic ? ro++ : (ro = 0, Ic = e) : ro = 0, wr(), null;
}
function xl() {
  if (cr !== null) {
    var e = Gh(Da), t = fs.transition, n = Ft;
    try {
      if (fs.transition = null, Ft = 16 > e ? 16 : e, cr === null) var r = !1;
      else {
        if (e = cr, cr = null, Da = 0, St & 6) throw Error(ge(331));
        var l = St;
        for (St |= 4, We = e.current; We !== null; ) {
          var o = We, a = o.child;
          if (We.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var c = 0; c < i.length; c++) {
                var d = i[c];
                for (We = d; We !== null; ) {
                  var N = We;
                  switch (N.tag) {
                    case 0:
                    case 11:
                    case 15:
                      no(8, N, o);
                  }
                  var f = N.child;
                  if (f !== null) f.return = N, We = f;
                  else for (; We !== null; ) {
                    N = We;
                    var p = N.sibling, v = N.return;
                    if (op(N), N === d) {
                      We = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = v, We = p;
                      break;
                    }
                    We = v;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var I = S.child;
                if (I !== null) {
                  S.child = null;
                  do {
                    var D = I.sibling;
                    I.sibling = null, I = D;
                  } while (I !== null);
                }
              }
              We = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, We = a;
          else e: for (; We !== null; ) {
            if (o = We, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                no(9, o, o.return);
            }
            var k = o.sibling;
            if (k !== null) {
              k.return = o.return, We = k;
              break e;
            }
            We = o.return;
          }
        }
        var x = e.current;
        for (We = x; We !== null; ) {
          a = We;
          var g = a.child;
          if (a.subtreeFlags & 2064 && g !== null) g.return = a, We = g;
          else e: for (a = x; We !== null; ) {
            if (i = We, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  Xa(9, i);
              }
            } catch (w) {
              sn(i, i.return, w);
            }
            if (i === a) {
              We = null;
              break e;
            }
            var T = i.sibling;
            if (T !== null) {
              T.return = i.return, We = T;
              break e;
            }
            We = i.return;
          }
        }
        if (St = l, wr(), $s && typeof $s.onPostCommitFiberRoot == "function") try {
          $s.onPostCommitFiberRoot(Ua, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Ft = n, fs.transition = t;
    }
  }
  return !1;
}
function Vd(e, t, n) {
  t = Sl(n, t), t = Xf(e, t, 1), e = pr(e, t, 1), t = _n(), e !== null && (So(e, 1, t), Xn(e, t));
}
function sn(e, t, n) {
  if (e.tag === 3) Vd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Vd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mr === null || !mr.has(r))) {
        e = Sl(n, e), e = Qf(t, e, 1), t = pr(t, e, 1), e = _n(), t !== null && (So(t, 1, e), Xn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function rg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = _n(), e.pingedLanes |= e.suspendedLanes & n, vn === e && (jn & n) === n && (mn === 4 || mn === 3 && (jn & 130023424) === jn && 500 > rn() - Cu ? Pr(e, 0) : Eu |= n), Xn(e, t);
}
function gp(e, t) {
  t === 0 && (e.mode & 1 ? (t = Bo, Bo <<= 1, !(Bo & 130023424) && (Bo = 4194304)) : t = 1);
  var n = _n();
  e = Ks(e, t), e !== null && (So(e, t, n), Xn(e, n));
}
function lg(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), gp(e, n);
}
function og(e, t) {
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
      throw Error(ge(314));
  }
  r !== null && r.delete(t), gp(e, n);
}
var xp;
xp = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Yn.current) Vn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Vn = !1, Y0(e, t, n);
    Vn = !!(e.flags & 131072);
  }
  else Vn = !1, Qt && t.flags & 1048576 && kf(t, ba, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ia(e, t), e = t.pendingProps;
      var l = wl(t, $n.current);
      gl(t, n), l = yu(null, t, r, e, l, n);
      var o = vu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Gn(r) ? (o = !0, Ca(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, fu(t), l.updater = Ga, t.stateNode = l, l._reactInternals = t, xc(t, r, e, n), t = Nc(null, t, r, !0, o, n)) : (t.tag = 0, Qt && o && ou(t), Pn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ia(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = ig(r), e = vs(r, e), l) {
          case 0:
            t = vc(null, t, r, e, n);
            break e;
          case 1:
            t = Dd(null, t, r, e, n);
            break e;
          case 11:
            t = Ld(null, t, r, e, n);
            break e;
          case 14:
            t = Od(null, t, r, vs(r.type, e), n);
            break e;
        }
        throw Error(ge(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), vc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), Dd(e, t, r, l, n);
    case 3:
      e: {
        if (ep(t), e === null) throw Error(ge(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, bf(e, t), Ta(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Sl(Error(ge(423)), t), t = Pd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Sl(Error(ge(424)), t), t = Pd(e, t, r, n, l);
          break e;
        } else for (ts = fr(t.stateNode.containerInfo.firstChild), ns = t, Qt = !0, ks = null, n = Cf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (jl(), r === l) {
            t = Vs(e, t, n);
            break e;
          }
          Pn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Mf(t), e === null && pc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, cc(r, l) ? a = null : o !== null && cc(r, o) && (t.flags |= 32), qf(e, t), Pn(e, t, a, n), t.child;
    case 6:
      return e === null && pc(t), null;
    case 13:
      return tp(e, t, n);
    case 4:
      return pu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = El(t, null, r, n) : Pn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), Ld(e, t, r, l, n);
    case 7:
      return Pn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Pn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Pn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, Kt(Ma, r._currentValue), r._currentValue = a, o !== null) if (Cs(o.value, a)) {
          if (o.children === l.children && !Yn.current) {
            t = Vs(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            a = o.child;
            for (var c = i.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = Us(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var N = d.pending;
                    N === null ? c.next = c : (c.next = N.next, N.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), mc(
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
            if (a = o.return, a === null) throw Error(ge(341));
            a.lanes |= n, i = a.alternate, i !== null && (i.lanes |= n), mc(a, n, t), a = o.sibling;
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
        Pn(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, gl(t, n), l = ps(l), r = r(l), t.flags |= 1, Pn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = vs(r, t.pendingProps), l = vs(r.type, l), Od(e, t, r, l, n);
    case 15:
      return Jf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), ia(e, t), t.tag = 1, Gn(r) ? (e = !0, Ca(t)) : e = !1, gl(t, n), Gf(t, r, l), xc(t, r, l, n), Nc(null, t, r, !0, e, n);
    case 19:
      return np(e, t, n);
    case 22:
      return Zf(e, t, n);
  }
  throw Error(ge(156, t.tag));
};
function yp(e, t) {
  return Hh(e, t);
}
function ag(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function hs(e, t, n, r) {
  return new ag(e, t, n, r);
}
function Iu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function ig(e) {
  if (typeof e == "function") return Iu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Gc) return 11;
    if (e === Xc) return 14;
  }
  return 2;
}
function xr(e, t) {
  var n = e.alternate;
  return n === null ? (n = hs(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function da(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") Iu(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case el:
      return _r(n.children, l, o, t);
    case Yc:
      a = 8, l |= 8;
      break;
    case Ui:
      return e = hs(12, n, t, l | 2), e.elementType = Ui, e.lanes = o, e;
    case Wi:
      return e = hs(13, n, t, l), e.elementType = Wi, e.lanes = o, e;
    case zi:
      return e = hs(19, n, t, l), e.elementType = zi, e.lanes = o, e;
    case bh:
      return Ja(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ch:
          a = 10;
          break e;
        case Sh:
          a = 9;
          break e;
        case Gc:
          a = 11;
          break e;
        case Xc:
          a = 14;
          break e;
        case tr:
          a = 16, r = null;
          break e;
      }
      throw Error(ge(130, e == null ? e : typeof e, ""));
  }
  return t = hs(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function _r(e, t, n, r) {
  return e = hs(7, e, r, t), e.lanes = n, e;
}
function Ja(e, t, n, r) {
  return e = hs(22, e, r, t), e.elementType = bh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Ii(e, t, n) {
  return e = hs(6, e, null, t), e.lanes = n, e;
}
function Ti(e, t, n) {
  return t = hs(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function cg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ui(0), this.expirationTimes = ui(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ui(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Tu(e, t, n, r, l, o, a, i, c) {
  return e = new cg(e, t, n, i, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = hs(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, fu(o), e;
}
function ug(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: qr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function vp(e) {
  if (!e) return vr;
  e = e._reactInternals;
  e: {
    if (Kr(e) !== e || e.tag !== 1) throw Error(ge(170));
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
    throw Error(ge(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Gn(n)) return vf(e, n, t);
  }
  return t;
}
function Np(e, t, n, r, l, o, a, i, c) {
  return e = Tu(n, r, !0, e, l, o, a, i, c), e.context = vp(null), n = e.current, r = _n(), l = gr(n), o = Us(r, l), o.callback = t ?? null, pr(n, o, l), e.current.lanes = l, So(e, l, r), Xn(e, r), e;
}
function Za(e, t, n, r) {
  var l = t.current, o = _n(), a = gr(l);
  return n = vp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Us(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = pr(l, t, a), e !== null && (Es(e, l, a, o), la(e, l, a)), a;
}
function _a(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Yd(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Au(e, t) {
  Yd(e, t), (e = e.alternate) && Yd(e, t);
}
function dg() {
  return null;
}
var kp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function $u(e) {
  this._internalRoot = e;
}
qa.prototype.render = $u.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ge(409));
  Za(e, t, null, null);
};
qa.prototype.unmount = $u.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    zr(function() {
      Za(null, e, null, null);
    }), t[Hs] = null;
  }
};
function qa(e) {
  this._internalRoot = e;
}
qa.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Jh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lr.length && t !== 0 && t < lr[n].priority; n++) ;
    lr.splice(n, 0, e), n === 0 && qh(e);
  }
};
function Ru(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function ei(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Gd() {
}
function hg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = _a(a);
        o.call(d);
      };
    }
    var a = Np(t, r, e, 0, null, !1, !1, "", Gd);
    return e._reactRootContainer = a, e[Hs] = a.current, po(e.nodeType === 8 ? e.parentNode : e), zr(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var d = _a(c);
      i.call(d);
    };
  }
  var c = Tu(e, 0, !1, null, null, !1, !1, "", Gd);
  return e._reactRootContainer = c, e[Hs] = c.current, po(e.nodeType === 8 ? e.parentNode : e), zr(function() {
    Za(t, c, n, r);
  }), c;
}
function ti(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var c = _a(a);
        i.call(c);
      };
    }
    Za(t, a, e, l);
  } else a = hg(n, t, e, l, r);
  return _a(a);
}
Xh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Gl(t.pendingLanes);
        n !== 0 && (Zc(t, n | 1), Xn(t, rn()), !(St & 6) && (bl = rn() + 500, wr()));
      }
      break;
    case 13:
      zr(function() {
        var r = Ks(e, 1);
        if (r !== null) {
          var l = _n();
          Es(r, e, 1, l);
        }
      }), Au(e, 1);
  }
};
qc = function(e) {
  if (e.tag === 13) {
    var t = Ks(e, 134217728);
    if (t !== null) {
      var n = _n();
      Es(t, e, 134217728, n);
    }
    Au(e, 134217728);
  }
};
Qh = function(e) {
  if (e.tag === 13) {
    var t = gr(e), n = Ks(e, t);
    if (n !== null) {
      var r = _n();
      Es(n, e, t, r);
    }
    Au(e, t);
  }
};
Jh = function() {
  return Ft;
};
Zh = function(e, t) {
  var n = Ft;
  try {
    return Ft = e, t();
  } finally {
    Ft = n;
  }
};
qi = function(e, t, n) {
  switch (t) {
    case "input":
      if (Vi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ka(r);
            if (!l) throw Error(ge(90));
            Ih(r), Vi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ah(e, n);
      break;
    case "select":
      t = n.value, t != null && hl(e, !!n.multiple, t, !1);
  }
};
_h = Su;
Fh = zr;
var fg = { usingClientEntryPoint: !1, Events: [Mo, rl, Ka, Dh, Ph, Su] }, Wl = { findFiberByHostInstance: $r, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, pg = { bundleType: Wl.bundleType, version: Wl.version, rendererPackageName: Wl.rendererPackageName, rendererConfig: Wl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ys.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Wh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Wl.findFiberByHostInstance || dg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Jo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Jo.isDisabled && Jo.supportsFiber) try {
    Ua = Jo.inject(pg), $s = Jo;
  } catch {
  }
}
rs.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fg;
rs.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ru(t)) throw Error(ge(200));
  return ug(e, t, null, n);
};
rs.createRoot = function(e, t) {
  if (!Ru(e)) throw Error(ge(299));
  var n = !1, r = "", l = kp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Tu(e, 1, !1, null, null, n, !1, r, l), e[Hs] = t.current, po(e.nodeType === 8 ? e.parentNode : e), new $u(t);
};
rs.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ge(188)) : (e = Object.keys(e).join(","), Error(ge(268, e)));
  return e = Wh(t), e = e === null ? null : e.stateNode, e;
};
rs.flushSync = function(e) {
  return zr(e);
};
rs.hydrate = function(e, t, n) {
  if (!ei(t)) throw Error(ge(200));
  return ti(null, e, t, !0, n);
};
rs.hydrateRoot = function(e, t, n) {
  if (!Ru(e)) throw Error(ge(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = kp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Np(t, null, e, 1, n ?? null, l, !1, o, a), e[Hs] = t.current, po(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new qa(t);
};
rs.render = function(e, t, n) {
  if (!ei(t)) throw Error(ge(200));
  return ti(null, e, t, !1, n);
};
rs.unmountComponentAtNode = function(e) {
  if (!ei(e)) throw Error(ge(40));
  return e._reactRootContainer ? (zr(function() {
    ti(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Hs] = null;
    });
  }), !0) : !1;
};
rs.unstable_batchedUpdates = Su;
rs.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!ei(n)) throw Error(ge(200));
  if (e == null || e._reactInternals === void 0) throw Error(ge(38));
  return ti(e, t, n, !1, r);
};
rs.version = "18.3.1-next-f1338f8080-20240426";
function wp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wp);
    } catch (e) {
      console.error(e);
    }
}
wp(), kh.exports = rs;
var Gs = kh.exports, Xd = Gs;
pa.createRoot = Xd.createRoot, pa.hydrateRoot = Xd.hydrateRoot;
var jp = { exports: {} }, ni = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mg = u, gg = Symbol.for("react.element"), xg = Symbol.for("react.fragment"), yg = Object.prototype.hasOwnProperty, vg = mg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Ng = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ep(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) yg.call(t, r) && !Ng.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: gg, type: e, key: o, ref: a, props: l, _owner: vg.current };
}
ni.Fragment = xg;
ni.jsx = Ep;
ni.jsxs = Ep;
jp.exports = ni;
var s = jp.exports;
let ar = [], Cp = 120, Ai = !1;
async function kg() {
  if (!Ai) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          wg(n), Ai = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Ai = !0;
  }
}
function wg(e) {
  Array.isArray(e) && (ar = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Ws(e) {
  for (let t = ar.length - 1; t >= 0; t--) {
    const n = ar[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return ar.length > 0 ? {
    offsetMin: ar[0].offsetBeforeMin,
    label: ar[0].labelBefore
  } : { offsetMin: Cp, label: "LOCAL" };
}
function Sp(e, t) {
  return ar.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Fa(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, a, i] = t.split(":").map(Number);
  for (const c of ar)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const d = (c.offsetBeforeMin - c.offsetAfterMin) / 60, N = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (N.getUTCFullYear() === n && N.getUTCMonth() + 1 === r && N.getUTCDate() === l) {
        const f = N.getUTCHours();
        if (o >= f && o < f + d)
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
function jg(e) {
  const { offsetMin: t, label: n } = Ws(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function Eg(e) {
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
function Or(e, t = "LOCAL") {
  return t === "UTC" ? Eg(e) : jg(e);
}
function Qd(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Or(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function $c(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, a] = e.split("-").map(Number), [i, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(a) || isNaN(i) || isNaN(c)) return null;
  const N = Date.UTC(l, o - 1, a, i, c, d);
  if (n === "UTC")
    return N;
  const f = Fa(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const p = N - Cp * 6e4, { offsetMin: v } = Ws(p);
  let S = N - v * 6e4;
  const I = Ws(S);
  return I.offsetMin !== v && (S = N - I.offsetMin * 6e4), S;
}
function Cg({
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
  onToggleDrawer: N,
  isInitialSetup: f = !1,
  selectedCount: p = 0,
  totalCount: v = 0,
  onResetStudio: S
}) {
  const [I, D] = u.useState(!1);
  u.useEffect(() => {
    if (!I) return;
    const w = (C) => {
      C.key === "Escape" && D(!1);
    };
    return window.addEventListener("keydown", w), () => window.removeEventListener("keydown", w);
  }, [I]);
  const k = u.useMemo(() => {
    const w = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), C = (e == null ? void 0 : e.durationMs) || 0;
    if (!w || C <= 0) return "-- ➔ --";
    const h = w + C, A = (Z) => String(Z).padStart(2, "0"), y = Or(w, n), b = Or(h, n), O = `${y.year}-${A(y.month)}-${A(y.day)}`, z = `${A(y.hour)}:${A(y.minute)}:${A(y.second)}`, $ = `${b.year}-${A(b.month)}-${A(b.day)}`, W = `${A(b.hour)}:${A(b.minute)}:${A(b.second)}`, se = n === "UTC" ? " (UTC)" : y.label ? ` (${y.label})` : "", re = O === $ ? W : `${$} ${W}`;
    return `${O} ${z} ➔ ${re}${se}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), x = u.useMemo(() => {
    const w = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (w >= 1440) {
      const C = (w / 1440).toFixed(1);
      return `(${C.endsWith(".0") ? parseInt(C, 10) : C}d / ${w}m Total)`;
    }
    return `(${w}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), g = () => {
    D(!1), S == null || S();
  }, T = I ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => D(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (w) => w.stopPropagation(), dir: "ltr", children: [
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
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: g, children: [
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
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: k }),
            /* @__PURE__ */ s.jsx("span", { className: "total-duration", children: x })
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
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: p }),
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
      !f && /* @__PURE__ */ s.jsx(
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
    typeof document < "u" && T && Gs.createPortal(T, document.body)
  ] });
}
const Gr = (e) => String(e).padStart(2, "0");
function Et(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const p = new Date(e), v = Gr(p.getUTCHours()), S = Gr(p.getUTCMinutes()), I = Gr(p.getUTCSeconds()), D = l ? `${v}:${S}:${I}` : `${v}:${S}`;
    return r ? `${D} UTC` : D;
  }
  const { offsetMin: o, label: a } = Ws(e), i = new Date(e + o * 60 * 1e3), c = Gr(i.getUTCHours()), d = Gr(i.getUTCMinutes()), N = Gr(i.getUTCSeconds()), f = l ? `${c}:${d}:${N}` : `${c}:${d}`;
  return r ? `${f} ${a}` : f;
}
const Sg = 600, Jd = 250, cs = /* @__PURE__ */ new Map(), Ar = /* @__PURE__ */ new Map(), Rc = /* @__PURE__ */ new Set(), Zd = 4;
let yl = 0, ws = [];
function Lc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Jd) * Jd;
}
function bp() {
  var e;
  if (!(yl >= Zd || ws.length === 0))
    for (ws = ws.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); yl < Zd && ws.length > 0; ) {
      const t = ws.pop();
      !t || (e = t.signal) != null && e.aborted || (yl++, bg(t));
    }
}
function ha(e, t, n, r = "mon-0") {
  const l = Lc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (cs.size >= Sg) {
    const i = cs.keys().next().value, c = cs.get(i);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), cs.delete(i);
  }
  cs.set(a, n), Rc.forEach((i) => i(e, l, n, o));
}
async function bg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const i = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${i}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), N = URL.createObjectURL(d);
      ha(n, r, N, l), a(N);
    } else c.status === 204 ? (ha(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (i) {
    i.name !== "AbortError" ? (ha(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } finally {
    yl = Math.max(0, yl - 1), Ar.delete(t), bp();
  }
}
const Dn = {
  /**
   * Gets a cached frame URL by station, timestamp, and optional displayId.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} [displayId='mon-0']
   * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
   */
  get(e, t, n = "mon-0") {
    const r = Lc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!cs.has(o)) return null;
    const a = cs.get(o);
    return cs.delete(o), cs.set(o, a), a;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: ha,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    cs.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), cs.clear(), Ar.clear(), ws = [], yl = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return Rc.add(e), () => Rc.delete(e);
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
    const l = Lc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
    if (cs.has(a))
      return Promise.resolve(this.get(e, l, o));
    if (Ar.has(a))
      return Ar.get(a);
    const i = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      ws = ws.filter((N) => N.hostname === e && N.displayId === o && N.key !== a ? (Ar.delete(N.key), N.resolve(null), !1) : !0);
      const d = { key: a, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        ws = ws.filter((N) => N.key !== a), Ar.delete(a), c(null);
      }, { once: !0 }), ws.push(d), bp();
    });
    return Ar.set(a, i), i;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Dn.clearAll();
});
const Lu = "ITB_STUDIO_SESSION_CACHE_V2", Mp = "itb_player_audio_settings";
let $i = null;
function Mg() {
  try {
    const e = localStorage.getItem(Lu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function Ip(e) {
  e && ($i && clearTimeout($i), $i = setTimeout(() => {
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
      localStorage.setItem(Lu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function Ig() {
  try {
    localStorage.removeItem(Lu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function vl() {
  try {
    const e = localStorage.getItem(Mp);
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
function Tg(e) {
  try {
    localStorage.setItem(Mp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let sr = null, dl = null, Ri = null, zn = 0, Xr = 0, Zo = -60, jo = 1;
function Ag() {
  if (!sr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (sr = new e());
  }
  return sr && sr.state === "suspended" && sr.resume().catch(() => {
  }), sr;
}
function Ba(e, t = 1) {
  if (!e) return null;
  jo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Ag();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(jo, n.currentTime), dl = e, $g(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function qd(e) {
  if (jo = Math.max(0, Number(e) || 1), dl != null && dl.__audioGainNode && sr)
    try {
      dl.__audioGainNode.gain.setValueAtTime(jo, sr.currentTime);
    } catch {
    }
}
function $g() {
  if (Ri) return;
  const e = new Uint8Array(256), t = () => {
    const n = dl, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      zn *= 0.85, Xr *= 0.85, zn < 1e-3 && (zn = 0), Xr < 1e-3 && (Xr = 0), Zo = zn > 1e-3 ? 20 * Math.log10(zn) : -60;
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
        zn = a > zn ? zn * 0.3 + a * 0.7 : zn * 0.85 + a * 0.15, Xr = Math.max(zn, o), Zo = zn > 1e-4 ? 20 * Math.log10(zn) : -60;
      } catch {
        zn = 0, Xr = 0, Zo = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: zn,
        peak: Xr,
        db: Zo,
        gain: jo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), Ri = requestAnimationFrame(t);
  };
  Ri = requestAnimationFrame(t);
}
function Tp({ isPlaying: e = !1 }) {
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
function Rg({
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
          const d = (i.displayId ?? i.DisplayId ?? `mon-${c}`).toLowerCase(), N = !a && o === d, f = i.width ?? i.Width ?? 1920, p = i.height ?? i.Height ?? 1080, v = i.displayName ?? i.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${N ? "is-active" : ""}`,
              onClick: (S) => {
                S.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${v} (${f}×${p})`,
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
function Ap({
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
    let v = 1 / 0, S = 1 / 0, I = -1 / 0, D = -1 / 0;
    e.forEach((g) => {
      const T = g.x ?? g.X ?? 0, w = g.y ?? g.Y ?? 0, C = g.width ?? g.Width ?? 1920, h = g.height ?? g.Height ?? 1080;
      v = Math.min(v, T), S = Math.min(S, w), I = Math.max(I, T + C), D = Math.max(D, w + h);
    });
    const k = Math.max(1, I - v), x = Math.max(1, D - S);
    return { minX: v, minY: S, totalW: k, totalH: x };
  }, [e]);
  if (!e || e.length <= 1 || !a)
    return null;
  const i = e.find((v) => (v.displayId ?? v.DisplayId) === t) || e[0], c = e.indexOf(i), d = c >= 0 ? c + 1 : 1, f = (i ? i.displayName ?? i.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), p = f && !f.toLowerCase().includes("screen") ? `SCREEN ${d} (${f.toUpperCase()})` : f ? f.toUpperCase() : `SCREEN ${d}`;
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (v) => v.stopPropagation(),
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "hud-header", children: /* @__PURE__ */ s.jsxs("span", { className: `hud-badge ${l.toLowerCase()}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "hud-pulse" }),
          l === "MANUAL" ? "✋ OVERRIDE" : "⚡ AUTO",
          " : ",
          p,
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
            p
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "hud-canvas-wrap", children: /* @__PURE__ */ s.jsx(
          "svg",
          {
            className: "hud-topology-svg",
            viewBox: `0 0 ${a.totalW} ${a.totalH}`,
            preserveAspectRatio: "xMidYMid meet",
            children: e.map((v, S) => {
              const I = v.displayId ?? v.DisplayId ?? `mon-${S}`, D = (v.x ?? v.X ?? 0) - a.minX, k = (v.y ?? v.Y ?? 0) - a.minY, x = v.width ?? v.Width ?? 1920, g = v.height ?? v.Height ?? 1080, T = I === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${T ? "is-active" : ""}`,
                  onClick: (w) => {
                    w.stopPropagation(), n == null || n(I);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: D + 10,
                        y: k + 10,
                        width: Math.max(10, x - 20),
                        height: Math.max(10, g - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: D + x / 2,
                        y: k + g / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: S + 1
                      }
                    )
                  ]
                },
                I
              );
            })
          }
        ) })
      ]
    }
  );
}
function Lg({
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
  isSpotlightActive: N,
  globalGaps: f = [],
  recordingSegments: p = {},
  playbackSpeed: v = 1,
  activeAudioStationId: S = null,
  directorPlan: I = null,
  isAutoDirectorEnabled: D = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: x = null,
  areAllDisplaysPlaced: g = !1,
  hideDisplayStrip: T = !1
}) {
  var oe;
  const w = e.hostname || e.name || e.id || "", C = Math.round(t), [h, A] = u.useState(() => !w || !C ? null : Dn.get(w, C) || null), [y, b] = u.useState(""), [O, z] = u.useState(!1), [$, W] = u.useState(!1), [se, re] = u.useState(!1), Z = u.useRef(l), E = u.useRef(null), U = u.useRef(0), P = u.useRef(t - a), K = u.useRef(t - a), _ = u.useRef(!1), te = u.useRef(null), ne = u.useRef(!1);
  P.current = t - a;
  const X = (e == null ? void 0 : e.displays) || ((oe = e == null ? void 0 : e.topology) == null ? void 0 : oe.displays) || [], [J, $e] = u.useState(null);
  u.useEffect(() => {
    $e(null);
  }, [k]);
  const Fe = u.useMemo(() => {
    const Q = I || (e == null ? void 0 : e.directorPlan);
    return !Q || !Q.segments || Q.segments.length === 0 ? null : Q.segments.find((B) => {
      const H = B.startEpochMs ?? B.StartEpochMs ?? 0, ue = B.endEpochMs ?? B.EndEpochMs ?? 0;
      return t >= H && t <= ue;
    }) || Q.segments[0];
  }, [I, e == null ? void 0 : e.directorPlan, t]), Ee = u.useMemo(() => {
    var Q;
    return J ? J.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : X.length > 1 && D !== !1 && Fe ? (Fe.targetDisplayId || Fe.TargetDisplayId || "mon-0").toLowerCase() : (((Q = X[0]) == null ? void 0 : Q.displayId) || "mon-0").toLowerCase();
  }, [J, k, X, D, Fe]), Ye = u.useRef(Ee), [Ie, Ce] = u.useState(!1);
  u.useEffect(() => {
    if (Ye.current && Ye.current !== Ee) {
      Ce(!0);
      const Q = setTimeout(() => Ce(!1), 2e3);
      return Ye.current = Ee, () => clearTimeout(Q);
    }
    Ye.current = Ee;
  }, [Ee]);
  const Qe = p[e == null ? void 0 : e.id] || p[w] || (e == null ? void 0 : e.segments) || [], ct = Qe.length === 0 || Qe.some((Q) => {
    const B = Q.startEpochMs ?? Q.startEpoch ?? 0, H = Q.endEpochMs ?? Q.endEpoch ?? 0;
    return t >= B && t <= H;
  }), R = !!(r ? !vl().isMuted : S && (e.id === S || w === S)), V = u.useCallback(() => {
    if (!E.current) return;
    const Q = vl();
    if (r)
      E.current.volume = Q.volume, E.current.muted = Q.isMuted, Q.isMuted || Ba(E.current);
    else {
      const B = !!(S && (e.id === S || w === S));
      E.current.muted = !B, B && (E.current.volume = Q.volume, Ba(E.current));
    }
  }, [r, S, e.id, w]);
  u.useEffect(() => {
    V();
  }, [V]), u.useEffect(() => {
    const Q = (B) => {
      E.current && B.detail && V();
    };
    return window.addEventListener("itb-audio-state-changed", Q), () => window.removeEventListener("itb-audio-state-changed", Q);
  }, [V]), u.useEffect(() => {
    E.current && (E.current.defaultPlaybackRate = v, E.current.playbackRate = v);
  }, [v]), u.useEffect(() => {
    if (n || !C || !w) return;
    if (l) {
      Z.current = !0;
      return;
    }
    const Q = Z.current;
    Z.current = l;
    let B = !0;
    const H = new AbortController(), ue = Dn.get(w, C, Ee);
    if (ue) {
      A(ue), W(!1), re(!1);
      return;
    }
    re(!0);
    const Ae = setTimeout(() => {
      B && Dn.fetchFrame(w, C, H.signal, Ee).then((ze) => {
        B && (re(!1), ze && ze !== "NO_SIGNAL" ? (A(ze), W(!1)) : ze === "NO_SIGNAL" && W(!0));
      });
    }, Q ? 25 : 40), Me = Dn.subscribe((ze, xe, Ge, He) => {
      ze === w && xe === C && (!He || He === Ee) && B && (re(!1), Ge && Ge !== "NO_SIGNAL" ? (A(Ge), W(!1)) : Ge === "NO_SIGNAL" && W(!0));
    });
    return () => {
      B = !1, clearTimeout(Ae), H.abort(), Me();
    };
  }, [w, C, n, l, r, O, Ee]), u.useEffect(() => {
    if (!w || !(r || l)) {
      l || (te.current && clearTimeout(te.current), _.current = !1, b(""), z(!1), E.current && (E.current.pause(), E.current.removeAttribute("src"), E.current.load()));
      return;
    }
    let B = null;
    return l && !N && ct ? B = setTimeout(() => {
      const H = P.current;
      U.current = H, K.current = H, _.current = !1;
      const ue = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + H}&displayId=${encodeURIComponent(Ee)}&_t=${Date.now()}`;
      z(!1), b(ue);
    }, 80) : l || (te.current && clearTimeout(te.current), _.current = !1, b(""), z(!1), E.current && (E.current.pause(), E.current.removeAttribute("src"), E.current.load())), () => {
      B && clearTimeout(B);
    };
  }, [l, r, w, a, i, N, ct, Ee]), u.useEffect(() => {
    if (!w || !(r || l)) return;
    const B = P.current, H = Math.abs(B - K.current);
    if (!l || H < 800) {
      K.current = B;
      return;
    }
    return _.current = !0, K.current = B, U.current = B, E.current && E.current.pause(), z(!1), te.current && clearTimeout(te.current), te.current = setTimeout(() => {
      if (!ct || N) {
        b(""), z(!1), _.current = !1;
        return;
      }
      const ue = P.current, ie = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + ue}&displayId=${encodeURIComponent(Ee)}&_t=${Date.now()}`;
      b(ie);
    }, 75), () => {
      te.current && clearTimeout(te.current);
    };
  }, [t, l, r, w, a, i, N, ct, Ee]), u.useEffect(() => {
    if (r || !l || !E.current || !O || _.current) return;
    const Q = (P.current - U.current) / 1e3;
    if (Q >= 0) {
      const B = E.current, H = B.currentTime, ue = Math.abs(H - Q);
      if (ue > 0.35 && ue < 3)
        try {
          B.currentTime = Q;
        } catch {
        }
    }
  }, [r, l, t, O]), u.useEffect(() => {
    if (!r || !l || !y || !O || N) return;
    let Q = null, B = E.current ? E.current.currentTime : 0, H = performance.now(), ue = U.current + Math.round(B * 1e3);
    const ie = () => {
      const Ae = E.current;
      if (Ae && !Ae.paused && !Ae.ended && !ne.current && !_.current) {
        const Me = performance.now(), ze = Ae.currentTime;
        Math.abs(ze - B) > 5e-4 && (B = ze, H = Me);
        const xe = Math.max(0, (Me - H) / 1e3), Ge = Ae.playbackRate || v || 1, He = B + xe * Ge;
        let wt = U.current + Math.round(He * 1e3);
        const pt = wt - ue;
        if (pt < 0 && pt > -300 && (wt = ue), wt >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const st = a + wt, Rt = f == null ? void 0 : f.find((rt) => st >= rt.startEpochMs && st < rt.endEpochMs);
        if (Rt) {
          ne.current = !0;
          const rt = Rt.endEpochMs - a;
          d(rt), U.current = rt, ue = rt, K.current = rt;
          const Jt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + rt}&_t=${Date.now()}`;
          z(!1), b(Jt), setTimeout(() => {
            ne.current = !1;
          }, 300);
          return;
        }
        wt !== ue && (ue = wt, K.current = wt, d == null || d(wt));
      }
      Q = requestAnimationFrame(ie);
    };
    return Q = requestAnimationFrame(ie), () => {
      Q && cancelAnimationFrame(Q);
    };
  }, [
    r,
    l,
    y,
    O,
    N,
    v,
    c,
    a,
    i,
    w,
    f,
    d,
    o
  ]);
  const ae = () => {
    if (ne.current) return;
    const Q = a + P.current, B = Qe.map((H) => ({ start: H.startEpochMs ?? H.startEpoch ?? 0, end: H.endEpochMs ?? H.endEpoch ?? 0 })).filter((H) => H.start > Q + 200).sort((H, ue) => H.start - ue.start)[0];
    if (B && B.start - a < c) {
      ne.current = !0;
      const H = B.start - a;
      d(H), U.current = H;
      const ue = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + H}&_t=${Date.now()}`;
      z(!1), b(ue), setTimeout(() => {
        ne.current = !1;
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
    (r || l) && y && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: E,
        src: y,
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
        muted: !R,
        onLoadedData: () => {
          E.current && (E.current.defaultPlaybackRate = v, E.current.playbackRate = v);
        },
        onCanPlay: () => {
          V(), E.current && (E.current.defaultPlaybackRate = v, E.current.playbackRate = v), l && E.current && E.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          _.current = !1, z(!0), V(), E.current && (E.current.defaultPlaybackRate = v, E.current.playbackRate = v);
        },
        onWaiting: () => {
          z(!1);
        },
        onTimeUpdate: () => {
          var Q;
          !O && ((Q = E.current) == null ? void 0 : Q.currentTime) > 0 && (_.current = !1, z(!0));
        },
        onEnded: ae
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
        children: h && !$ ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: h,
            alt: w,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => W(!0)
          }
        ) : (!h || $ || !ct) && !y ? /* @__PURE__ */ s.jsx(Tp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && ct && !O && !N && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    X.length > 1 && /* @__PURE__ */ s.jsx(
      Ap,
      {
        displays: X,
        activeDisplayId: Ee,
        onSelectDisplay: (Q) => {
          $e(Q), x == null || x(Q);
        },
        isTransitioning: Ie,
        mode: D ? "AUTO" : "MANUAL"
      }
    ),
    !T && /* @__PURE__ */ s.jsx(
      Rg,
      {
        displays: X,
        activeDisplayId: Ee,
        onSelectDisplay: (Q) => {
          $e(Q), x == null || x(Q);
        },
        areAllDisplaysPlaced: g,
        isAutoDirectorEnabled: D
      }
    )
  ] });
}
function Og({
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
  outPointMs: N,
  setPlayheadMs: f,
  isSpotlightActive: p,
  globalGaps: v = [],
  onOpenSpotlight: S,
  onSelectActiveStation: I,
  recordingSegments: D = {},
  playbackSpeed: k = 1,
  activeAudioStationId: x = null,
  onSoloAudio: g,
  directorPlan: T = null,
  isAutoDirectorEnabled: w = !0,
  targetDisplayId: C = "auto",
  onSelectDisplayId: h = null,
  areAllDisplaysPlaced: A = !1,
  _slotIndex: y = 0,
  borderColor: b = null,
  onSwapWithNext: O = null
}) {
  var E;
  const z = !!(x && (e.id === x || e.hostname && e.hostname === x)), $ = (e.hostname || e.name || "").includes("Offline"), W = $ ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((E = e == null ? void 0 : e.topology) == null ? void 0 : E.displays) || []).length > 1;
  const re = () => {
    if (t) {
      const U = C && C !== "auto" && C !== "director" ? C : null;
      S && S(e.id, U);
    } else
      I && I(e.id);
  }, Z = (U) => {
    U.preventDefault(), U.stopPropagation(), t && I && (i && i(!1), I(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: re,
      onContextMenu: Z,
      className: `camera-card ${W} ${t ? "is-solo-card" : ""}`,
      style: b ? { borderColor: b } : void 0,
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
                onClick: (U) => {
                  U.stopPropagation(), O();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            g && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${z ? "audio-active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), g(z ? null : e.id);
                },
                title: z ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: z ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
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
                onClick: (U) => {
                  U.stopPropagation();
                  const P = C && C !== "auto" && C !== "director" ? C : null;
                  S(e.id, P);
                },
                title: "Cinema Fullscreen Inspection",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) })
              }
            ),
            I && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), t && i && i(!1), I(t ? null : e.id);
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
                onClick: (U) => {
                  U.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${$ ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Lg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: $,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: i,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: N,
              setPlayheadMs: f,
              isSpotlightActive: p,
              globalGaps: v,
              recordingSegments: D,
              playbackSpeed: k,
              activeAudioStationId: x,
              directorPlan: T,
              isAutoDirectorEnabled: w,
              targetDisplayId: C,
              onSelectDisplayId: h,
              areAllDisplaysPlaced: A,
              hideDisplayStrip: !0
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
        !$ && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          Et(l, o)
        ] }) })
      ]
    }
  ) });
}
const Li = ["top-right", "bottom-right", "bottom-left", "top-left"];
function Dg({
  currentEpochMs: e,
  position: t = null,
  onPositionChange: n = null
}) {
  const [r, l] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), o = t || r, a = u.useCallback((D) => {
    D && (D.preventDefault(), D.stopPropagation());
    const x = (Li.indexOf(o) + 1) % Li.length, g = Li[x];
    l(g);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", g);
    } catch {
    }
    n && n(g);
  }, [o, n]), i = new Date(e || Date.now()), c = i.getUTCFullYear(), d = String(i.getUTCMonth() + 1).padStart(2, "0"), N = String(i.getUTCDate()).padStart(2, "0"), f = String(i.getUTCHours()).padStart(2, "0"), p = String(i.getUTCMinutes()).padStart(2, "0"), v = String(i.getUTCSeconds()).padStart(2, "0"), S = `${c}-${d}-${N}`, I = `${f}:${p}:${v} UTC`;
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `canvas-utc-wall-clock corner-${o}`,
      onClick: a,
      title: "Persistent Canvas UTC Wall Clock • Click or use [⤢] to cycle corner position (Permanent orientation clock)",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: S }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-sep", children: "•" }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-time-val", children: I })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cycle-corner",
            onClick: a,
            title: `Current corner: ${o.toUpperCase()} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function Pg() {
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
function Zt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function _g(e) {
  const t = Zt(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Fg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Bg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var I, D, k, x, g, T;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let w = 0; w < e.length; w++)
    if (e[w].timestampEpochMs <= t)
      l = e[w], o = e[w + 1] || e[w];
    else {
      o === l && e[w] && (o = e[w]);
      break;
    }
  if (l === o)
    return ((I = l.layout) == null ? void 0 : I.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), i = o.transitionType || "smooth", c = o.timestampEpochMs - a;
  if (t < c)
    return ((D = l.layout) == null ? void 0 : D.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((k = o.layout) == null ? void 0 : k.placements) || n;
  if (i === "cut")
    return ((x = l.layout) == null ? void 0 : x.placements) || n;
  const d = (t - c) / a, N = Zt(d, 0, 1), f = i === "linear" ? N : _g(N), p = ((g = l.layout) == null ? void 0 : g.placements) || [], v = ((T = o.layout) == null ? void 0 : T.placements) || [], S = v.map((w) => {
    const C = p.find((z) => z.stationId === w.stationId && z.displayId === w.displayId);
    if (!C)
      return {
        ...w,
        opacity: Math.max(0.05, f)
      };
    const h = Math.round(C.x + (w.x - C.x) * f), A = Math.round(C.y + (w.y - C.y) * f), y = Math.round(C.width + (w.width - C.width) * f), b = Math.round(C.height + (w.height - C.height) * f), O = Number(((C.rotation || 0) + ((w.rotation || 0) - (C.rotation || 0)) * f).toFixed(1));
    return {
      ...w,
      x: h,
      y: A,
      width: y,
      height: b,
      rotation: O,
      opacity: 1
    };
  });
  return p.forEach((w) => {
    v.some((h) => h.stationId === w.stationId && h.displayId === w.displayId) || S.push({
      ...w,
      opacity: Math.max(0, 1 - f)
    });
  }), S;
}
function Ug({
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
    const S = {
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
  const N = {
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
  }, f = [...c, N].sort((S, I) => S.timestampEpochMs - I.timestampEpochMs), p = f.findIndex((S) => S.id === N.id);
  return {
    nextTimeline: { ...e, keyframes: f },
    newIndex: p >= 0 ? p : 0,
    isNewKeyframe: !0,
    activeKeyframe: N
  };
}
function Oc(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function Wg(e, t) {
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
function eh(e, t, n, r = 500) {
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
  }, i = [...l, a].sort((d, N) => d.timestampEpochMs - N.timestampEpochMs), c = i.findIndex((d) => d.id === a.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: i
    },
    newIndex: c >= 0 ? c : 0,
    isNew: !0
  };
}
function zg(e, t = [], n = [], r = null, l = null, o = "mon-0") {
  let a = Array.isArray(e) ? e.map((d) => ({
    ...d,
    startEpochMs: d.startEpochMs ?? d.StartEpochMs ?? 0,
    endEpochMs: d.endEpochMs ?? d.EndEpochMs ?? 0,
    targetDisplayId: (d.targetDisplayId || d.TargetDisplayId || o || "mon-0").toLowerCase()
  })).sort((d, N) => d.startEpochMs - N.startEpochMs) : [];
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
    const N = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, f = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    f > N && i.push({ startEpoch: N, endEpoch: f });
  }), Array.isArray(t) && t.filter((d) => d.type === "global").forEach((d) => {
    const N = d.startEpochMs ?? d.startEpoch ?? 0, f = d.endEpochMs ?? d.endEpoch ?? 0;
    f > N && !i.some((p) => p.startEpoch === N && p.endEpoch === f) && i.push({ startEpoch: N, endEpoch: f });
  }), i.forEach((d) => {
    const N = d.startEpoch, f = d.endEpoch, p = [];
    a.forEach((v) => {
      v.endEpochMs <= N || v.startEpochMs >= f ? p.push(v) : (v.startEpochMs < N && p.push({
        ...v,
        endEpochMs: N
      }), v.endEpochMs > f && p.push({
        ...v,
        startEpochMs: f
      }));
    }), a = p;
  }), (t || []).filter((d) => d.type !== "global").forEach((d) => {
    const N = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, f = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    if (!(!N || !f || f <= N))
      for (let p = a.length - 1; p > 0; p--) {
        const v = a[p].startEpochMs;
        v >= N && v <= f && a[p].startEpochMs === a[p - 1].endEpochMs && (a[p - 1].endEpochMs = a[p].endEpochMs, a.splice(p, 1));
      }
  });
  for (let d = a.length - 1; d > 0; d--)
    a[d].targetDisplayId === a[d - 1].targetDisplayId && a[d].startEpochMs === a[d - 1].endEpochMs && (a[d - 1].endEpochMs = a[d].endEpochMs, a.splice(d, 1));
  return a;
}
const is = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], Dc = 1920, Pc = 1080, Nt = [
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
], Hg = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function Kg(e, t, n) {
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
function Qr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function rr(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, a = n / r;
  let i, c, d, N;
  return o >= a ? (i = n, c = Math.round(i / o), d = e, N = t + Math.round((r - c) / 2)) : (c = r, i = Math.round(c * o), d = e + Math.round((n - i) / 2), N = t), { x: d, y: N, width: i, height: c };
}
function qs(e, t = Dc, n = Pc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: N, y: f, width: p, height: v } = rr(0, 0, t, n, d);
    return [{
      ...c,
      x: N,
      y: f,
      width: p,
      height: v,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: Nt[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, N) => {
      const f = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: p, y: v, width: S, height: I } = rr(N * c, 0, c, n, f);
      return {
        ...d,
        x: p,
        y: v,
        width: S,
        height: I,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: f,
        aspectRatio: f,
        zIndex: N,
        rotation: 0,
        borderWidth: 2,
        borderColor: Nt[N % Nt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const p = Math.round(t / 3);
      return e.slice(0, 3).map((v, S) => {
        const I = v.nativeAspectRatio || (v.sourceWidth && v.sourceHeight ? v.sourceWidth / v.sourceHeight : 1.7777777777777777), { x: D, y: k, width: x, height: g } = rr(S * p, 0, p, n, I);
        return {
          ...v,
          x: D,
          y: k,
          width: x,
          height: g,
          sourceWidth: v.sourceWidth || 1920,
          sourceHeight: v.sourceHeight || 1080,
          nativeAspectRatio: I,
          aspectRatio: I,
          zIndex: S,
          rotation: 0,
          borderWidth: 2,
          borderColor: Nt[S % Nt.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), N = Math.round(n / 2), f = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: N }
    ];
    return e.slice(0, 3).map((p, v) => {
      const S = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: I, cy: D } = f[v], { x: k, y: x, width: g, height: T } = rr(I, D, d, N, S);
      return {
        ...p,
        x: k,
        y: x,
        width: g,
        height: T,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: S,
        aspectRatio: S,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: Nt[v % Nt.length],
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
    return e.slice(0, 4).map((f, p) => {
      const v = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: S, cy: I } = N[p], { x: D, y: k, width: x, height: g } = rr(S, I, c, d, v);
      return {
        ...f,
        x: D,
        y: k,
        width: x,
        height: g,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: v,
        aspectRatio: v,
        zIndex: p,
        rotation: 0,
        borderWidth: 2,
        borderColor: Nt[p % Nt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), a = Math.floor(t / l), i = Math.floor(n / o);
  return e.map((c, d) => {
    const N = d % l, f = Math.floor(d / l), p = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: S, width: I, height: D } = rr(N * a, f * i, a, i, p);
    return {
      ...c,
      x: v,
      y: S,
      width: I,
      height: D,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: p,
      aspectRatio: p,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: Nt[d % Nt.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function Vg({
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
  playheadMs: N = 0,
  playheadEpochMs: f = 0,
  timeMode: p = "LOCAL",
  isPlaying: v = !1,
  setIsPlaying: S,
  totalDurationMs: I,
  inPointMs: D = 0,
  outPointMs: k,
  setPlayheadMs: x,
  globalGaps: g = [],
  recordingSegments: T = {},
  playbackSpeed: w = 1,
  onChangePlaybackSpeed: C,
  keystrokeMode: h = "BurnIn",
  keystrokes: A = [],
  directorPlan: y = null,
  onOverrideDisplay: b,
  onResetOverride: O,
  compositionLayout: z = "canvas",
  onChangeCompositionLayout: $,
  isAutoDirectorEnabled: W = !0,
  onToggleAutoDirector: se,
  onUpdateCanvasLayout: re,
  canvasLayoutTimeline: Z = null,
  onUpdateCanvasLayoutTimeline: E,
  activeKfIndex: U = 0,
  setActiveKfIndex: P,
  isModalOpen: K = !1,
  isGridFullscreen: _ = void 0,
  onToggleGridFullscreen: te = null
}) {
  const ne = f > 0 ? f : d + N, [X, J] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [$e, Fe] = u.useState(() => {
    var m;
    return ((m = t[0]) == null ? void 0 : m.id) || null;
  }), [Ee, Ye] = u.useState(!1), [Ie, Ce] = u.useState(null), [Qe, ct] = u.useState({ index: null, position: null }), [R, V] = u.useState(!1), [ae, oe] = u.useState(!1), [Q, B] = u.useState(!1), [H, ue] = u.useState(!1), [ie, Ae] = u.useState(""), [Me, ze] = u.useState(""), xe = u.useRef(null), [Ge, He] = u.useState(() => {
    try {
      const m = localStorage.getItem("itb_canvas_saved_presets");
      return m ? JSON.parse(m) : [];
    } catch {
      return [];
    }
  }), wt = (m) => {
    He(m);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(m));
    } catch {
    }
  }, [pt, st] = u.useState(!1), Rt = _ !== void 0 ? _ : pt, [rt, Jt] = u.useState(!1);
  u.useRef(null);
  const gn = u.useRef(null), Lt = u.useRef(null), Cn = u.useRef(null), [gt, mt] = u.useState({ width: 960, height: 540 }), [qe, Xe] = u.useState(0), [Ot, Bt] = u.useState(!1);
  u.useEffect(() => {
    const m = (j) => {
      j.key === "Escape" && Bt(!1);
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, []);
  const [cn, Sn] = u.useState(!1), [os, Le] = u.useState(!1), [Re, Je] = u.useState(!1), [dt, Tt] = u.useState(!1), [ee, me] = u.useState(!1), [ve, q] = u.useState({ vertical: null, horizontal: null }), [Oe, _e] = u.useState(!0), [et, Ve] = u.useState(!0), [ht, xt] = u.useState(null), [At, Vt] = u.useState({ x: 0, y: 0, isInside: !1 }), un = u.useRef(null), Dt = u.useRef(null), bt = u.useRef(!1), [ln, Ut] = u.useState("auto-grid"), jt = u.useRef([]), Nn = u.useRef([]), gs = u.useRef(null), [, Ls] = u.useState(0), jr = u.useRef(null), [bn, Ss] = u.useState(null), Mt = u.useCallback((m, j = "success", L = "💾") => {
    jr.current && clearTimeout(jr.current), Ss({ text: m, type: j, icon: L }), jr.current = setTimeout(() => {
      Ss(null), jr.current = null;
    }, 2200);
  }, []), [$t, as] = u.useState(() => {
    var L, G, Y, F, ce, be;
    const m = (Y = (G = (L = Z == null ? void 0 : Z.keyframes) == null ? void 0 : L[0]) == null ? void 0 : G.layout) == null ? void 0 : Y.width, j = (be = (ce = (F = Z == null ? void 0 : Z.keyframes) == null ? void 0 : F[0]) == null ? void 0 : ce.layout) == null ? void 0 : be.height;
    if (m && j) {
      const he = is.find((ke) => ke.w === m && ke.h === j);
      if (he) return he.id;
    }
    return "16:9";
  }), [Un, Er] = u.useState(() => {
    try {
      const m = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (m !== null) return m === "true";
    } catch {
    }
    return !1;
  }), Mn = u.useCallback(() => {
    Er((m) => {
      const j = !m;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(j));
      } catch {
      }
      return j;
    });
  }, []), bs = u.useMemo(() => is.find((m) => m.id === $t) || is[0], [$t]), De = bs.w, je = bs.h, Os = bs.ratio, To = u.useMemo(() => {
    const m = [], j = De >= 3e3 ? 200 : 100, L = j / 2, G = j / 10;
    for (let Y = 0; Y <= De; Y += G) {
      const F = Y % j === 0, ce = !F && Y % L === 0;
      m.push({ val: Y, isMajor: F, isMed: ce });
    }
    return m;
  }, [De]), Cr = u.useMemo(() => {
    const m = [];
    for (let Y = 0; Y <= je; Y += 10) {
      const F = Y % 100 === 0, ce = !F && Y % 50 === 0;
      m.push({ val: Y, isMajor: F, isMed: ce });
    }
    return m;
  }, [je]), Ao = u.useCallback((m) => {
    const j = un.current || Lt.current;
    if (!j) return;
    const L = j.getBoundingClientRect(), G = Zt(Math.round((m.clientX - L.left) / L.width * De), 0, De), Y = Zt(Math.round((m.clientY - L.top) / L.height * je), 0, je);
    Vt({ x: G, y: Y, isInside: !0 });
  }, [De, je]), $o = u.useCallback(() => {
    Vt((m) => ({ ...m, isInside: !1 }));
  }, []), Qn = u.useCallback(() => {
    const m = Cn.current;
    if (!m) return;
    const j = m.getBoundingClientRect(), G = Math.max(320, Math.floor(j.width || 960) - 104 - 16), Y = Math.max(180, Math.floor(j.height || 540) - 16);
    let F, ce;
    Un ? (F = G, ce = Math.round(F / Os)) : G / Y >= Os ? (ce = Y, F = Math.round(ce * Os)) : (F = G, ce = Math.round(F / Os)), mt((be) => be.width === F && be.height === ce ? be : { width: F, height: ce });
  }, [Un, Os]);
  u.useEffect(() => {
    const m = Cn.current;
    if (!m) return;
    Qn();
    let j = null;
    return typeof ResizeObserver < "u" && (j = new ResizeObserver(() => {
      Qn();
    }), j.observe(m)), window.addEventListener("resize", Qn), () => {
      j && j.disconnect(), window.removeEventListener("resize", Qn);
    };
  }, [Qn]);
  const on = u.useMemo(() => (t && t.length > 0 ? t : n).map((j) => {
    const L = j.displays && j.displays.length > 0 ? j.displays : j.topology && j.topology.displays && j.topology.displays.length > 0 ? j.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: j.width || 1920, height: j.height || 1080 }], G = L.find((he) => he.isPrimary) || L[0], Y = G.width || G.Width || j.width || 1920, F = G.height || G.Height || j.height || 1080, ce = Y && F ? Y / F : 16 / 9, be = L.length > 1;
    return {
      stationId: j.id,
      displayId: "auto",
      label: `${j.displayName || j.roleAlias || j.hostname || j.name} - ${be ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: j.displayName || j.roleAlias || j.hostname || j.name,
      stationHostname: j.hostname || j.id,
      isPrimary: !0,
      sourceWidth: Y,
      sourceHeight: F,
      nativeAspectRatio: ce,
      aspectRatio: ce,
      width: Y,
      height: F
    };
  }), [t, n]), Xt = u.useMemo(() => {
    const m = t && t.length > 0 ? t : n, j = [];
    return m.forEach((L) => {
      const G = L.displays && L.displays.length > 0 ? L.displays : L.topology && L.topology.displays && L.topology.displays.length > 0 ? L.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: L.width || 1920, height: L.height || 1080 }], Y = G.find((he) => he.isPrimary) || G[0], F = Y.width || Y.Width || L.width || 1920, ce = Y.height || Y.Height || L.height || 1080, be = F / ce;
      j.push({
        stationId: L.id,
        displayId: "auto",
        label: `${L.displayName || L.roleAlias || L.hostname || L.name} - ${G.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: L.displayName || L.roleAlias || L.hostname || L.name,
        stationHostname: L.hostname || L.id,
        isPrimary: !0,
        sourceWidth: F,
        sourceHeight: ce,
        nativeAspectRatio: be,
        aspectRatio: be,
        width: F,
        height: ce
      }), G.length > 1 && G.forEach((he, ke) => {
        const ut = (he.displayId || `mon-${ke}`).toLowerCase(), lt = he.displayNumber || ke + 1, ot = he.displayName || `Screen ${lt}`, pe = he.width || he.Width || L.width || 1920, at = he.height || he.Height || L.height || 1080, Pt = pe / at;
        j.push({
          stationId: L.id,
          displayId: ut,
          label: `${L.displayName || L.roleAlias || L.hostname || L.name} - ${ot}`,
          stationName: L.displayName || L.roleAlias || L.hostname || L.name,
          stationHostname: L.hostname || L.id,
          isPrimary: !!he.isPrimary,
          sourceWidth: pe,
          sourceHeight: at,
          nativeAspectRatio: Pt,
          aspectRatio: Pt,
          width: pe,
          height: at
        });
      });
    }), j;
  }, [t, n]), [xn, dn] = u.useState(() => {
    var m;
    if (((m = Z == null ? void 0 : Z.keyframes) == null ? void 0 : m.length) > 0) {
      const j = JSON.parse(JSON.stringify(Z));
      if (t && t.length > 0) {
        const L = new Set(t.map((Y) => Y.id));
        if (j.keyframes.forEach((Y) => {
          var F, ce;
          ((ce = (F = Y.layout) == null ? void 0 : F.placements) == null ? void 0 : ce.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((be) => L.has(be.stationId)));
        }), j.keyframes.some((Y) => {
          var F, ce;
          return ((ce = (F = Y.layout) == null ? void 0 : F.placements) == null ? void 0 : ce.length) > 0;
        })) return j;
      } else
        return j;
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
            width: Dc,
            height: Pc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: qs(on, Dc, Pc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var m;
    if (((m = Z == null ? void 0 : Z.keyframes) == null ? void 0 : m.length) > 0) {
      const j = JSON.parse(JSON.stringify(Z));
      if (t && t.length > 0) {
        const G = new Set(t.map((Y) => Y.id));
        j.keyframes.forEach((Y) => {
          var F, ce;
          ((ce = (F = Y.layout) == null ? void 0 : F.placements) == null ? void 0 : ce.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((be) => G.has(be.stationId)));
        });
      }
      dn(j), j.keyframes.some((G) => {
        var Y, F;
        return ((F = (Y = G.layout) == null ? void 0 : Y.placements) == null ? void 0 : F.length) > 0;
      }) && (bt.current = !0, Ut("custom"));
    }
  }, [Z, t]);
  const kn = xn.keyframes || [], Ro = u.useMemo(() => Fg(kn, ne), [kn, ne]), hn = Zt(
    U ?? Ro,
    0,
    Math.max(0, kn.length - 1)
  ), Wn = kn[hn] || kn[Ro] || kn[0], fe = u.useMemo(() => {
    var m;
    return ((m = Wn == null ? void 0 : Wn.layout) == null ? void 0 : m.placements) || [];
  }, [Wn]), Jn = u.useCallback((m = "Action") => ({
    label: m,
    timeline: JSON.parse(JSON.stringify(xn)),
    aspectId: $t,
    presetId: ln,
    selectedFeedIndex: qe
  }), [xn, $t, ln, qe]), Rn = u.useCallback((m = "Action") => {
    const j = Jn(m);
    jt.current.push(j), jt.current.length > 50 && jt.current.shift(), Nn.current = [], Ls((L) => L + 1);
  }, [Jn]), Al = u.useCallback(() => {
    gs.current && (jt.current.push(gs.current), jt.current.length > 50 && jt.current.shift(), Nn.current = [], gs.current = null, Ls((m) => m + 1));
  }, []), $l = u.useCallback(() => {
    const m = f > 0 ? f : d + N, j = 500;
    if (m <= d + j) return hn;
    const L = (Wn == null ? void 0 : Wn.layout) || {
      width: De,
      height: je,
      backgroundColor: "#070A10",
      fps: 30,
      placements: fe
    }, { nextTimeline: G, newIndex: Y, isNew: F } = eh(xn, m, L, j);
    return F && (dn(G), E && E(G), P && P(Y), Mt(
      `Keyframe #${Y + 1} created at ${Et(m, p, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), Y;
  }, [f, d, N, hn, Wn, De, je, fe, xn, E, P, p, Mt]), M = u.useCallback((m, j = null) => {
    j && Rn(j);
    const L = f > 0 ? f : d + N;
    dn((G) => {
      const { nextTimeline: Y, newIndex: F, isNewKeyframe: ce } = Ug({
        prevTimeline: G,
        newPlacements: m,
        currentEpochMs: L,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: De,
        virtualH: je,
        fps: 30
      });
      return E && E(Y), P && P(F), ce && F > 0 && Mt(
        `Keyframe #${F + 1} created at ${Et(L, p, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), Y;
    });
  }, [f, d, N, De, je, E, P, p, Mt, Rn]);
  u.useEffect(() => {
    if (on.length > 0 && (!fe || fe.length === 0) && !bt.current) {
      let m = $t;
      on.length === 2 && $t === "16:9" && (m = "32:9", as("32:9"));
      const j = is.find((G) => G.id === m) || is[0], L = qs(on, j.w, j.h);
      L.length > 0 && (M(L), Ut("auto-grid"));
    }
  }, [on, fe, M, $t]);
  const le = u.useRef("");
  u.useEffect(() => {
    const m = (t || []).map((j) => j.id).sort().join(",");
    if (le.current === "") {
      le.current = m;
      return;
    }
    if (le.current !== m && (le.current = m, t && t.length > 0)) {
      const j = new Set(t.map((L) => L.id));
      if (ln === "auto-grid" || !bt.current) {
        let L = $t;
        on.length === 2 && $t === "16:9" && (L = "32:9", as("32:9"));
        const G = is.find((F) => F.id === L) || is[0], Y = qs(on, G.w, G.h);
        Y.length > 0 && M(Y);
      } else if (fe && fe.length > 0) {
        const L = fe.filter((G) => j.has(G.stationId));
        if (L.length !== fe.length)
          if (L.length === 0) {
            const G = qs(on, De, je);
            M(G);
          } else
            M(L);
      }
    }
  }, [t, on, ln, $t, fe, M, De, je]), u.useEffect(() => {
    re && re({
      width: De,
      height: je,
      backgroundColor: "#070A10",
      fps: 30,
      placements: fe,
      timeline: xn
    });
  }, [fe, xn, re, De, je]);
  const de = u.useCallback((m) => {
    const j = bs, L = is.find((G) => G.id === m) || is[0];
    if (j.id !== L.id)
      if (as(L.id), bt.current) {
        const G = L.w / j.w, Y = L.h / j.h, F = fe.map((ce) => ({
          ...ce,
          x: Math.round(ce.x * G),
          y: Math.round(ce.y * Y),
          width: Math.round(ce.width * G),
          height: Math.round(ce.height * Y)
        }));
        M(F);
      } else {
        const G = on.length > 0 ? on : fe && fe.length > 0 ? fe : Xt, Y = qs(G, L.w, L.h);
        M(Y);
      }
  }, [bs, fe, Xt, M]), ye = u.useCallback((m) => {
    const j = fe.length > 0 ? Math.max(...fe.map((he) => he.zIndex || 0)) + 1 : 0, L = Nt[fe.length % Nt.length], G = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 16 / 9), Y = G >= 1 ? 640 : Math.round(360 * G), F = G >= 1 ? Math.round(640 / G) : 360, ce = {
      stationId: m.stationId,
      displayId: m.displayId,
      label: m.label,
      x: 100 + fe.length * 40 % 800,
      y: 80 + fe.length * 40 % 500,
      width: Y,
      height: F,
      sourceWidth: m.sourceWidth || 1920,
      sourceHeight: m.sourceHeight || 1080,
      nativeAspectRatio: G,
      aspectRatio: G,
      zIndex: j,
      rotation: 0,
      borderWidth: 2,
      borderColor: L,
      shadowEffect: "deep",
      borderRadius: 0
    }, be = [...fe, ce];
    M(be), Xe(be.length - 1);
  }, [fe, M]), we = u.useCallback((m) => {
    const j = fe.filter((L, G) => G !== m);
    M(j), Xe((L) => Math.max(0, L - 1));
  }, [fe, M]), Ne = u.useCallback(() => {
    M([]), Xe(-1);
  }, [M]), Se = (m) => {
    const j = m.map((G, Y) => ({ p: G, origIdx: Y }));
    j.sort((G, Y) => (G.p.zIndex ?? G.origIdx) - (Y.p.zIndex ?? Y.origIdx));
    const L = [...m];
    return j.forEach(({ origIdx: G }, Y) => {
      L[G] = { ...L[G], zIndex: Y + 1 };
    }), L;
  };
  u.useCallback((m = qe) => {
    if (m < 0 || !fe[m]) return;
    const j = Se(fe), L = j[m].zIndex, G = j.length;
    if (L >= G) return;
    const Y = j.map((F, ce) => ce === m ? { ...F, zIndex: G } : F.zIndex > L ? { ...F, zIndex: F.zIndex - 1 } : F);
    M(Y);
  }, [qe, fe, M]), u.useCallback((m = qe) => {
    if (m < 0 || !fe[m]) return;
    const j = Se(fe), L = j[m].zIndex;
    if (L <= 1) return;
    const G = j.map((Y, F) => F === m ? { ...Y, zIndex: 1 } : Y.zIndex < L ? { ...Y, zIndex: Y.zIndex + 1 } : Y);
    M(G);
  }, [qe, fe, M]);
  const Te = u.useCallback((m = qe) => {
    if (m < 0 || !fe[m]) return;
    const j = Se(fe), L = j[m].zIndex, G = L + 1;
    if (G > j.length) return;
    const Y = j.map((F, ce) => ce === m ? { ...F, zIndex: G } : F.zIndex === G ? { ...F, zIndex: L } : F);
    M(Y);
  }, [qe, fe, M]), Ke = u.useCallback((m = qe) => {
    if (m < 0 || !fe[m]) return;
    const j = Se(fe), L = j[m].zIndex, G = L - 1;
    if (G < 1) return;
    const Y = j.map((F, ce) => ce === m ? { ...F, zIndex: G } : F.zIndex === G ? { ...F, zIndex: L } : F);
    M(Y);
  }, [qe, fe, M]), Be = u.useCallback((m) => {
    if (qe < 0 || !fe[qe]) return;
    const j = fe.map((L, G) => G === qe ? { ...L, ...m } : L);
    M(j);
  }, [qe, fe, M]), Ue = u.useCallback((m = 90) => {
    const j = fe[qe];
    if (!j) return;
    const G = ((j.rotation || 0) + m) % 360;
    Be({ rotation: G });
  }, [qe, fe, Be]), tt = u.useCallback((m = qe) => {
    if (m < 0 || !fe[m]) return;
    const j = fe.length, L = fe.map((G, Y) => Y === m ? {
      ...G,
      x: 0,
      y: 0,
      width: De,
      height: je,
      zIndex: j
    } : G);
    M(L);
  }, [qe, fe, M, De, je]), Ze = u.useCallback((m) => {
    let j = [];
    const L = on.length > 0 ? on : Xt.length > 0 ? Xt : fe;
    switch (m) {
      case "auto":
      case "auto-grid":
        j = qs(L, De, je);
        break;
      case "1x1":
        L.length > 0 && (j = [{
          ...L[0],
          x: 0,
          y: 0,
          width: De,
          height: je,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: Nt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (L.length >= 2) {
          const G = Math.round(De / 2);
          j = L.slice(0, 2).map((Y, F) => {
            const ce = Y.nativeAspectRatio || (Y.sourceWidth && Y.sourceHeight ? Y.sourceWidth / Y.sourceHeight : 1.7777777777777777), { x: be, y: he, width: ke, height: ut } = rr(F * G, 0, G, je, ce);
            return {
              ...Y,
              x: be,
              y: he,
              width: ke,
              height: ut,
              sourceWidth: Y.sourceWidth || 1920,
              sourceHeight: Y.sourceHeight || 1080,
              nativeAspectRatio: ce,
              aspectRatio: ce,
              zIndex: F + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: Nt[F % Nt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          j = qs(L, De, je);
        break;
      case "2x2": {
        const G = Math.round(De / 2), Y = Math.round(je / 2);
        j = L.slice(0, 4).map((F, ce) => ({
          ...F,
          x: ce % 2 * G,
          y: Math.floor(ce / 2) * Y,
          width: G,
          height: Y,
          zIndex: ce,
          rotation: 0,
          borderWidth: 2,
          borderColor: Nt[ce % Nt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (L.length >= 2) {
          j = [
            { ...L[0], x: 0, y: 0, width: De, height: je, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: Nt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const G = L.slice(1, 4), Y = Math.round(De * 0.23), F = Math.round(Y / (16 / 9));
          G.forEach((ce, be) => {
            j.push({
              ...ce,
              x: De - Y - 24,
              y: 24 + be * (F + 16),
              width: Y,
              height: F,
              zIndex: 10 + be,
              rotation: 0,
              borderWidth: 3,
              borderColor: Nt[(be + 1) % Nt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (L.length >= 3) {
          const G = Math.round(De * 0.666), Y = De - G, F = Math.round(je / 2);
          j = [
            { ...L[0], x: 0, y: 0, width: G, height: je, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Nt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...L[1], x: G, y: 0, width: Y, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Nt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...L[2], x: G, y: F, width: Y, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Nt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (L.length >= 3)
          if (De / je >= 2.5) {
            const Y = Math.round(De / 3);
            j = L.slice(0, 3).map((F, ce) => {
              const be = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 1.7777777777777777), { x: he, y: ke, width: ut, height: lt } = rr(ce * Y, 0, Y, je, be);
              return {
                ...F,
                x: he,
                y: ke,
                width: ut,
                height: lt,
                sourceWidth: F.sourceWidth || 1920,
                sourceHeight: F.sourceHeight || 1080,
                nativeAspectRatio: be,
                aspectRatio: be,
                zIndex: ce,
                rotation: 0,
                borderWidth: 2,
                borderColor: Nt[ce % Nt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const Y = Math.round(De / 2), F = Math.round(je / 2);
            j = [
              { ...L[0], x: 0, y: 0, width: Y, height: F, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Nt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...L[1], x: Y, y: 0, width: Y, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Nt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...L[2], x: Math.round(Y / 2), y: F, width: Y, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Nt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    j.length > 0 && (M(j), Xe(0), m === "auto" || m === "auto-grid" ? Ut("auto-grid") : (Ut(m), bt.current = !0));
  }, [Xt, fe, M, De, je]), Ct = u.useCallback(() => {
    const m = ie.trim() || `Custom Layout ${Ge.length + 1}`, L = [{
      id: `preset-${Date.now()}`,
      name: m,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(fe)),
      keyframes: JSON.parse(JSON.stringify(kn))
    }, ...Ge];
    wt(L), Ae(""), V(!1);
  }, [ie, Ge, fe, kn]), nn = u.useCallback((m) => {
    !m || !m.placements || (M(m.placements), Xe(0), Ut("custom"), bt.current = !0, oe(!1));
  }, [M]), zt = u.useCallback((m, j) => {
    j == null || j.stopPropagation();
    const L = Ge.filter((G) => G.id !== m);
    wt(L);
  }, [Ge]), fn = u.useCallback(() => {
    const m = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: De,
      height: je,
      aspectRatio: $t,
      placements: fe,
      timeline: xn
    }, j = JSON.stringify(m, null, 2), L = new window.Blob([j], { type: "application/json" }), G = window.URL.createObjectURL(L), Y = document.createElement("a"), F = /* @__PURE__ */ new Date(), ce = (he) => String(he).padStart(2, "0"), be = `${F.getFullYear()}${ce(F.getMonth() + 1)}${ce(F.getDate())}_${ce(F.getHours())}${ce(F.getMinutes())}${ce(F.getSeconds())}`;
    Y.href = G, Y.download = `canvas_layout_${be}.json`, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), window.URL.revokeObjectURL(G);
  }, [fe, xn, De, je, $t]), xs = u.useCallback((m) => {
    var G;
    const j = (G = m.target.files) == null ? void 0 : G[0];
    if (!j) return;
    const L = new window.FileReader();
    L.onload = (Y) => {
      var F, ce, be;
      try {
        const he = JSON.parse(Y.target.result);
        if (he.width && he.height) {
          const ut = is.find((lt) => lt.w === he.width && lt.h === he.height);
          ut && as(ut.id);
        } else if (he.aspectRatio) {
          const ut = is.find((lt) => lt.id === he.aspectRatio);
          ut && as(ut.id);
        }
        let ke = null;
        Array.isArray(he) ? ke = he : he.placements && Array.isArray(he.placements) ? ke = he.placements : (F = he.layout) != null && F.placements && Array.isArray(he.layout.placements) && (ke = he.layout.placements), ke && ke.length > 0 && (M(ke), Xe(0), Ut("custom"), bt.current = !0), ((be = (ce = he.timeline) == null ? void 0 : ce.keyframes) == null ? void 0 : be.length) > 0 && (dn(he.timeline), E && E(he.timeline));
      } catch (he) {
        console.error("Failed to parse imported canvas JSON:", he), alert(`Canvas Import Error: ${he.message}`);
      }
    }, L.readAsText(j), m.target.value = "";
  }, [M, E]), Sr = (m, j) => {
    if (m.button !== 0) return;
    m.stopPropagation(), m.preventDefault(), Xe(j), bt.current = !0, Ut("custom");
    const L = $l(), G = un.current || Lt.current;
    if (!G) return;
    const Y = G.getBoundingClientRect(), F = fe[j];
    if (!F) return;
    gs.current = Jn("Move Feed"), Dt.current = {
      mode: "drag",
      index: j,
      startX: m.clientX,
      startY: m.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      scaleX: De / Y.width,
      scaleY: je / Y.height,
      activeSnapZone: null
    }, Tt(!0);
    const ce = (he) => {
      if (!Dt.current || Dt.current.mode !== "drag") return;
      const ke = Dt.current, ut = un.current || Lt.current;
      if (!ut) return;
      const lt = ut.getBoundingClientRect(), ot = (he.clientX - ke.startX) * ke.scaleX, pe = (he.clientY - ke.startY) * ke.scaleY;
      let at = Math.round(ke.initialX + ot), Pt = Math.round(ke.initialY + pe);
      at = Zt(at, 0, De - ke.initialW), Pt = Zt(Pt, 0, je - ke.initialH);
      const yt = et && !he.altKey;
      let vt = null, Ln = null, Zn = null;
      if (yt) {
        const Wt = he.clientX - lt.left, It = he.clientY - lt.top, _t = 32, Pe = Math.round(De / 2), ft = Math.round(je / 2);
        if (Wt <= _t ? It <= lt.height * 0.22 ? vt = { x: 0, y: 0, width: Pe, height: ft, label: "◰ Top-Left Quarter" } : It >= lt.height * 0.78 ? vt = { x: 0, y: ft, width: Pe, height: ft, label: "◱ Bottom-Left Quarter" } : vt = { x: 0, y: 0, width: Pe, height: je, label: "◧ Left Half (50%)" } : Wt >= lt.width - _t ? It <= lt.height * 0.22 ? vt = { x: Pe, y: 0, width: Pe, height: ft, label: "◲ Top-Right Quarter" } : It >= lt.height * 0.78 ? vt = { x: Pe, y: ft, width: Pe, height: ft, label: "◳ Bottom-Right Quarter" } : vt = { x: Pe, y: 0, width: Pe, height: je, label: "◨ Right Half (50%)" } : It <= _t && Wt >= lt.width * 0.25 && Wt <= lt.width * 0.75 && (vt = { x: 0, y: 0, width: De, height: je, label: "🗖 Full Canvas Maximize" }), !vt) {
          const br = fe.filter((nt, Mr) => Mr !== ke.index), Js = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: De, targetX: De - ke.initialW, guide: 100 },
            { snapTo: Pe, targetX: Pe - Math.round(ke.initialW / 2), guide: 50 }
          ];
          br.forEach((nt) => {
            Js.push({ snapTo: nt.x, targetX: nt.x, guide: nt.x / De * 100 }), Js.push({ snapTo: nt.x + nt.width, targetX: nt.x + nt.width - ke.initialW, guide: (nt.x + nt.width) / De * 100 }), Js.push({ snapTo: nt.x + nt.width, targetX: nt.x + nt.width, guide: (nt.x + nt.width) / De * 100 }), Js.push({ snapTo: nt.x, targetX: nt.x - ke.initialW, guide: nt.x / De * 100 });
          });
          let Fu = 18;
          Js.forEach((nt) => {
            const Mr = Math.abs(at - nt.targetX);
            Mr < Fu && (Fu = Mr, at = nt.targetX, Ln = nt.guide);
          });
          const Ll = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: je, targetY: je - ke.initialH, guide: 100 },
            { snapTo: ft, targetY: ft - Math.round(ke.initialH / 2), guide: 50 }
          ];
          br.forEach((nt) => {
            Ll.push({ snapTo: nt.y, targetY: nt.y, guide: nt.y / je * 100 }), Ll.push({ snapTo: nt.y + nt.height, targetY: nt.y + nt.height - ke.initialH, guide: (nt.y + nt.height) / je * 100 }), Ll.push({ snapTo: nt.y + nt.height, targetY: nt.y + nt.height, guide: (nt.y + nt.height) / je * 100 }), Ll.push({ snapTo: nt.y, targetY: nt.y - ke.initialH, guide: nt.y / je * 100 });
          });
          let Bu = 18;
          Ll.forEach((nt) => {
            const Mr = Math.abs(Pt - nt.targetY);
            Mr < Bu && (Bu = Mr, Pt = nt.targetY, Zn = nt.guide);
          });
        }
      }
      ke.activeSnapZone = vt, ke.latestX = at, ke.latestY = Pt, xt(vt), q({ vertical: Ln, horizontal: Zn }), dn((Wt) => {
        const It = [...Wt.keyframes || []], _t = L < It.length ? L : hn;
        if (!It[_t]) return Wt;
        const Pe = [...It[_t].layout.placements || []];
        return Pe[ke.index] ? (Pe[ke.index] = { ...Pe[ke.index], x: at, y: Pt }, It[_t] = {
          ...It[_t],
          layout: { ...It[_t].layout, placements: Pe }
        }, { ...Wt, keyframes: It }) : Wt;
      });
    }, be = () => {
      var he;
      if (Tt(!1), q({ vertical: null, horizontal: null }), (he = Dt.current) != null && he.activeSnapZone) {
        const ke = Dt.current.activeSnapZone, ut = Dt.current.index;
        dn((lt) => {
          const ot = [...lt.keyframes || []], pe = L < ot.length ? L : hn;
          if (!ot[pe]) return lt;
          const at = [...ot[pe].layout.placements || []];
          return at[ut] ? (at[ut] = {
            ...at[ut],
            x: ke.x,
            y: ke.y,
            width: ke.width,
            height: ke.height
          }, ot[pe] = {
            ...ot[pe],
            layout: { ...ot[pe].layout, placements: at }
          }, { ...lt, keyframes: ot }) : lt;
        });
      }
      if (Dt.current) {
        const ke = Dt.current, ut = ke.initialX, lt = ke.initialY, ot = ke.activeSnapZone ? ke.activeSnapZone.x : ke.latestX ?? ut, pe = ke.activeSnapZone ? ke.activeSnapZone.y : ke.latestY ?? lt;
        ot !== ut || pe !== lt ? (Al(), E && dn((at) => (E(at), at))) : gs.current = null;
      }
      xt(null), Dt.current = null, window.removeEventListener("mousemove", ce), window.removeEventListener("mouseup", be);
    };
    window.addEventListener("mousemove", ce), window.addEventListener("mouseup", be);
  }, Vr = (m, j, L = "br") => {
    if (m.button !== 0) return;
    m.stopPropagation(), m.preventDefault(), Xe(j), bt.current = !0, Ut("custom");
    const G = $l();
    if (!Lt.current) return;
    const Y = Lt.current.getBoundingClientRect(), F = fe[j];
    if (!F) return;
    gs.current = Jn("Resize Feed");
    const ce = Xt.find((ot) => ot.stationId === F.stationId && ot.displayId === F.displayId), be = F.sourceWidth || (ce == null ? void 0 : ce.sourceWidth) || 1920, he = F.sourceHeight || (ce == null ? void 0 : ce.sourceHeight) || 1080, ke = F.nativeAspectRatio || F.aspectRatio || (ce == null ? void 0 : ce.nativeAspectRatio) || be / he || F.width / F.height || 16 / 9;
    Dt.current = {
      mode: "resize",
      corner: L,
      index: j,
      startX: m.clientX,
      startY: m.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      sourceWidth: be,
      sourceHeight: he,
      nativeAspectRatio: ke,
      scaleX: De / Y.width,
      scaleY: je / Y.height
    }, me(!0);
    const ut = (ot) => {
      if (!Dt.current || Dt.current.mode !== "resize") return;
      const pe = Dt.current, at = (ot.clientX - pe.startX) * pe.scaleX, Pt = (ot.clientY - pe.startY) * pe.scaleY, yt = ot.ctrlKey || ot.shiftKey || ot.metaKey, vt = pe.nativeAspectRatio > 0 ? pe.nativeAspectRatio : pe.initialW / pe.initialH;
      let Ln = pe.initialX, Zn = pe.initialY, Wt = pe.initialW, It = pe.initialH;
      if (pe.corner === "br") {
        const _t = De - pe.initialX, Pe = je - pe.initialY;
        if (yt) {
          let ft = Math.max(160, Math.min(_t, Math.round(pe.initialW + at))), it = Math.round(ft / vt);
          it > Pe && (it = Pe, ft = Math.round(it * vt)), it < 90 && (it = 90, ft = Math.round(it * vt)), Wt = ft, It = it;
        } else
          Wt = Zt(Math.round(pe.initialW + at), 160, _t), It = Zt(Math.round(pe.initialH + Pt), 90, Pe);
      } else if (pe.corner === "bl") {
        const _t = pe.initialX + pe.initialW, Pe = je - pe.initialY;
        if (yt) {
          let ft = Math.max(160, Math.min(_t, Math.round(pe.initialW - at))), it = Math.round(ft / vt);
          it > Pe && (it = Pe, ft = Math.round(it * vt)), it < 90 && (it = 90, ft = Math.round(it * vt)), Wt = ft, It = it, Ln = pe.initialX + pe.initialW - Wt;
        } else
          Wt = Zt(Math.round(pe.initialW - at), 160, _t), It = Zt(Math.round(pe.initialH + Pt), 90, Pe), Ln = pe.initialX + pe.initialW - Wt;
      } else if (pe.corner === "tr") {
        const _t = De - pe.initialX, Pe = pe.initialY + pe.initialH;
        if (yt) {
          let ft = Math.max(160, Math.min(_t, Math.round(pe.initialW + at))), it = Math.round(ft / vt);
          it > Pe && (it = Pe, ft = Math.round(it * vt)), it < 90 && (it = 90, ft = Math.round(it * vt)), Wt = ft, It = it, Zn = pe.initialY + pe.initialH - It;
        } else
          Wt = Zt(Math.round(pe.initialW + at), 160, _t), It = Zt(Math.round(pe.initialH - Pt), 90, Pe), Zn = pe.initialY + pe.initialH - It;
      } else if (pe.corner === "tl") {
        const _t = pe.initialX + pe.initialW, Pe = pe.initialY + pe.initialH;
        if (yt) {
          let ft = Math.max(160, Math.min(_t, Math.round(pe.initialW - at))), it = Math.round(ft / vt);
          it > Pe && (it = Pe, ft = Math.round(it * vt)), it < 90 && (it = 90, ft = Math.round(it * vt)), Wt = ft, It = it, Ln = pe.initialX + pe.initialW - Wt, Zn = pe.initialY + pe.initialH - It;
        } else
          Wt = Zt(Math.round(pe.initialW - at), 160, _t), It = Zt(Math.round(pe.initialH - Pt), 90, Pe), Ln = pe.initialX + pe.initialW - Wt, Zn = pe.initialY + pe.initialH - It;
      }
      dn((_t) => {
        const Pe = [..._t.keyframes || []], ft = G < Pe.length ? G : hn;
        if (!Pe[ft]) return _t;
        const it = [...Pe[ft].layout.placements || []];
        return it[pe.index] ? (it[pe.index] = {
          ...it[pe.index],
          x: Ln,
          y: Zn,
          width: Wt,
          height: It,
          sourceWidth: pe.sourceWidth,
          sourceHeight: pe.sourceHeight,
          nativeAspectRatio: pe.nativeAspectRatio,
          aspectRatio: pe.nativeAspectRatio
        }, Pe[ft] = {
          ...Pe[ft],
          layout: { ...Pe[ft].layout, placements: it }
        }, { ..._t, keyframes: Pe }) : _t;
      });
    }, lt = () => {
      if (Dt.current) {
        const ot = Dt.current, pe = ot.latestW ?? ot.initialW, at = ot.latestH ?? ot.initialH;
        pe !== ot.initialW || at !== ot.initialH ? (Al(), E && dn((Pt) => (E(Pt), Pt))) : gs.current = null;
      }
      me(!1), Dt.current = null, window.removeEventListener("mousemove", ut), window.removeEventListener("mouseup", lt);
    };
    window.addEventListener("mousemove", ut), window.addEventListener("mouseup", lt);
  }, Rl = u.useCallback((m) => {
    const j = fe[m];
    if (!j) return;
    const L = Xt.find((be) => be.stationId === j.stationId && be.displayId === j.displayId), G = j.nativeAspectRatio || j.aspectRatio || (L == null ? void 0 : L.nativeAspectRatio) || (j.sourceWidth && j.sourceHeight ? j.sourceWidth / j.sourceHeight : 16 / 9);
    let Y = j.width, F = Math.round(Y / G);
    j.y + F > je && (F = je - j.y, Y = Math.round(F * G)), j.x + Y > De && (Y = De - j.x, F = Math.round(Y / G));
    const ce = fe.map((be, he) => he === m ? {
      ...be,
      width: Math.max(160, Y),
      height: Math.max(90, F),
      sourceWidth: j.sourceWidth || (L == null ? void 0 : L.sourceWidth) || 1920,
      sourceHeight: j.sourceHeight || (L == null ? void 0 : L.sourceHeight) || 1080,
      nativeAspectRatio: G,
      aspectRatio: G
    } : be);
    M(ce, "Snap Native Aspect");
  }, [fe, Xt, M]), si = u.useCallback(() => {
    if (jt.current.length === 0) return;
    const m = Jn("Redo State");
    Nn.current.push(m), Nn.current.length > 50 && Nn.current.shift();
    const j = jt.current.pop();
    j && (dn(j.timeline), E && E(j.timeline), j.aspectId && j.aspectId !== $t && as(j.aspectId), j.presetId && Ut(j.presetId), j.selectedFeedIndex !== void 0 && Xe(j.selectedFeedIndex), bt.current = !0, Ls((L) => L + 1), Mt(`Undo: ${j.label || "Previous State"}`, "undo", "↺"));
  }, [Jn, E, $t, Mt]), ri = u.useCallback(() => {
    if (Nn.current.length === 0) return;
    const m = Jn("Undo State");
    jt.current.push(m), jt.current.length > 50 && jt.current.shift();
    const j = Nn.current.pop();
    j && (dn(j.timeline), E && E(j.timeline), j.aspectId && j.aspectId !== $t && as(j.aspectId), j.presetId && Ut(j.presetId), j.selectedFeedIndex !== void 0 && Xe(j.selectedFeedIndex), bt.current = !0, Ls((L) => L + 1), Mt(`Redo: ${j.label || "Restored State"}`, "info", "↻"));
  }, [Jn, E, $t, Mt]), Ou = u.useCallback(() => {
    const j = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(fe)),
      keyframes: JSON.parse(JSON.stringify(kn)),
      aspectId: $t,
      width: De,
      height: je
    }, ...Ge.filter((L) => L.id !== "preset-quicksave")];
    wt(j);
    try {
      Ip({
        canvasLayoutTimeline: xn,
        selectedAspectId: $t,
        selectedPresetId: ln,
        isFullWidth: Un
      });
    } catch (L) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", L);
    }
    Mt(`State Saved (${De}×${je} • ${fe.length} Feeds)`, "success", "💾");
  }, [fe, kn, $t, De, je, Ge, wt, xn, ln, Un, Mt]);
  u.useEffect(() => {
    const m = () => si(), j = () => ri(), L = () => Ou();
    return window.addEventListener("itb:studio-undo", m), window.addEventListener("itb:studio-redo", j), window.addEventListener("itb:studio-save-now", L), () => {
      window.removeEventListener("itb:studio-undo", m), window.removeEventListener("itb:studio-redo", j), window.removeEventListener("itb:studio-save-now", L);
    };
  }, [si, ri, Ou]);
  const Wp = u.useCallback(() => {
    if (te) {
      te();
      return;
    }
    st((m) => {
      const j = !m;
      if (j) {
        r && r(null);
        const L = gn.current;
        L && L.requestFullscreen && L.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return j;
    });
  }, [te, r]), zp = u.useCallback(() => {
    const m = f > 0 ? f : d + N, { nextTimeline: j, newIndex: L, isNew: G } = eh(
      xn,
      m,
      (Wn == null ? void 0 : Wn.layout) || {
        width: De,
        height: je,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(fe))
      }
    );
    G ? (Rn("Add Keyframe"), dn(j), E && E(j), P && P(L), Mt(`Keyframe #${L + 1} created at ${Et(m, p, { includeSeconds: !0 })}`, "success", "💎")) : (P && P(L), Mt(`Jumped to existing Keyframe #${L + 1}`, "info", "💎"));
  }, [f, d, N, Wn, fe, De, je, xn, E, P, p, Mt, Rn]);
  u.useCallback(() => {
    if (kn.length <= 1 || hn === 0) {
      Mt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Rn("Delete Keyframe");
    const { nextTimeline: m, success: j, newIndex: L } = Wg(xn, hn);
    j && (dn(m), E && E(m), P && P(L), Mt("Keyframe deleted", "info", "🗑️"));
  }, [kn, hn, xn, E, P, Mt, Rn]), u.useCallback((m) => {
    hn !== 0 && (Rn("Update Transition Type"), dn((j) => {
      const L = Oc(j, hn, { transitionType: m });
      return E && E(L), L;
    }));
  }, [hn, E, Rn]), u.useCallback((m) => {
    hn !== 0 && (Rn("Update Transition Duration"), dn((j) => {
      const L = Oc(j, hn, { transitionDurationSec: m });
      return E && E(L), L;
    }));
  }, [hn, E, Rn]), u.useEffect(() => {
    const m = (j) => {
      if (!(j.target.tagName === "INPUT" || j.target.tagName === "TEXTAREA" || j.target.isContentEditable)) {
        if (j.key === "Delete" || j.key === "Backspace") {
          qe >= 0 && fe[qe] && (j.preventDefault(), we(qe));
          return;
        }
        if ((j.code === "Space" || j.key === " ") && S) {
          j.preventDefault(), S((L) => !L);
          return;
        }
        if ((j.key === "k" || j.key === "K") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), zp();
          return;
        }
        if (j.key === "Escape") {
          Ye(!1), oe(!1), Le(!1), Sn(!1), Je(!1), V(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(j.key)) {
          if (qe >= 0 && fe[qe]) {
            j.preventDefault(), bt.current = !0, Ut("custom");
            const L = j.shiftKey ? 1 : 10;
            let G = 0, Y = 0;
            j.key === "ArrowLeft" && (G = -L), j.key === "ArrowRight" && (G = L), j.key === "ArrowUp" && (Y = -L), j.key === "ArrowDown" && (Y = L);
            const F = fe[qe], ce = Zt(F.x + G, 0, De - F.width), be = Zt(F.y + Y, 0, je - F.height), he = fe.map((ke, ut) => ut === qe ? { ...ke, x: ce, y: be } : ke);
            M(he);
          }
          return;
        }
        if ((j.key === "r" || j.key === "R") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), _e((L) => !L);
          return;
        }
        if ((j.key === "s" || j.key === "S") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), Ve((L) => !L);
          return;
        }
      }
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [qe, fe, we, M, _e, Ve]);
  const Du = u.useMemo(() => Bg({
    keyframes: kn,
    currentEpochMs: ne,
    currentPlacements: fe,
    isEditing: dt || ee
  }), [dt, ee, kn, ne, fe]), Hp = u.useMemo(() => Du.map((m, j) => ({ ...m, originalIndex: j })).sort((m, j) => (m.zIndex ?? m.originalIndex) - (j.zIndex ?? j.originalIndex)), [Du]), Xs = fe[qe] || null, { filteredPlaced: Qs, filteredUnplaced: Lo } = u.useMemo(() => {
    const m = (Me || "").toLowerCase(), j = fe.map((F, ce) => {
      const be = F.zIndex ?? ce + 1, he = Xt.find((ke) => ke.stationId === F.stationId && ke.displayId === F.displayId);
      return {
        type: "placed",
        origIdx: ce,
        placement: F,
        feed: he,
        stationId: F.stationId,
        displayId: F.displayId,
        label: F.label || (he == null ? void 0 : he.label) || `${F.stationId} (${F.displayId})`,
        layerRank: be,
        isSelected: ce === qe,
        sourceWidth: F.sourceWidth || (he == null ? void 0 : he.sourceWidth) || 1920,
        sourceHeight: F.sourceHeight || (he == null ? void 0 : he.sourceHeight) || 1080
      };
    });
    j.sort((F, ce) => ce.layerRank - F.layerRank);
    const L = Xt.filter((F) => !fe.some((ce) => ce.stationId === F.stationId && ce.displayId === F.displayId)).map((F) => ({
      type: "unplaced",
      feed: F,
      stationId: F.stationId,
      displayId: F.displayId,
      label: F.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: F.sourceWidth || 1920,
      sourceHeight: F.sourceHeight || 1080
    })), G = m ? j.filter((F) => F.label.toLowerCase().includes(m)) : j, Y = m ? L.filter((F) => F.label.toLowerCase().includes(m)) : L;
    return { filteredPlaced: G, filteredUnplaced: Y };
  }, [fe, Xt, qe, Me]), Pu = u.useCallback((m, j) => {
    m.stopPropagation(), Ce(j), m.dataTransfer.effectAllowed = "copyMove", m.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: j.origIdx,
      type: j.type,
      stationId: j.stationId,
      displayId: j.displayId
    }));
  }, []), Kp = u.useCallback((m, j) => {
    m.preventDefault(), m.stopPropagation(), m.dataTransfer.dropEffect = "move";
    const L = m.currentTarget.getBoundingClientRect(), G = L.top + L.height / 2, Y = m.clientY < G ? "above" : "below";
    ct((F) => F.index === j && F.position === Y ? F : { index: j, position: Y });
  }, []), Vp = u.useCallback((m, j) => {
    m.stopPropagation(), ct((L) => L.index === j ? { index: null, position: null } : L);
  }, []), _u = u.useCallback(() => {
    Ce(null), ct({ index: null, position: null });
  }, []), Yp = u.useCallback((m, j) => {
    m.preventDefault(), m.stopPropagation();
    const L = Qe;
    ct({ index: null, position: null }), Ce(null);
    const G = m.dataTransfer.getData("text/plain");
    if (G)
      try {
        const Y = JSON.parse(G);
        if (Y.type === "placed") {
          const F = Y.origIdx, ce = Qs.findIndex((ot) => ot.origIdx === F);
          if (ce === -1) return;
          let be = j;
          if (L.position === "below" && (be += 1), ce < be && (be -= 1), ce === be) return;
          const he = [...Qs], [ke] = he.splice(ce, 1);
          he.splice(be, 0, ke);
          const ut = he.length, lt = fe.map((ot, pe) => {
            const at = he.findIndex((Pt) => Pt.origIdx === pe);
            return at !== -1 ? {
              ...ot,
              zIndex: ut - at
            } : ot;
          });
          M(lt), Xe(ke.origIdx);
        } else if (Y.type === "unplaced") {
          const F = Xt.find((vt) => vt.stationId === Y.stationId && vt.displayId === Y.displayId);
          if (!F) return;
          const ce = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 16 / 9), be = ce >= 1 ? 640 : Math.round(360 * ce), he = ce >= 1 ? Math.round(640 / ce) : 360, ke = Nt[fe.length % Nt.length];
          let ut = j;
          L.position === "below" && (ut += 1);
          const lt = {
            stationId: F.stationId,
            displayId: F.displayId,
            label: F.label,
            x: 100 + fe.length * 40 % 800,
            y: 80 + fe.length * 40 % 500,
            width: be,
            height: he,
            sourceWidth: F.sourceWidth || 1920,
            sourceHeight: F.sourceHeight || 1080,
            nativeAspectRatio: ce,
            aspectRatio: ce,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: ke,
            shadowEffect: "deep",
            borderRadius: 0
          }, ot = [...fe, lt], pe = ot.length - 1, at = [...Qs];
          at.splice(ut, 0, { origIdx: pe });
          const Pt = at.length, yt = ot.map((vt, Ln) => {
            const Zn = at.findIndex((Wt) => Wt.origIdx === Ln);
            return {
              ...vt,
              zIndex: Zn !== -1 ? Pt - Zn : 1
            };
          });
          M(yt), Xe(pe);
        }
      } catch (Y) {
        console.warn("Failed to handle layer drag drop:", Y);
      }
  }, [Qe, Qs, fe, Xt, M]), Gp = u.useCallback((m) => {
    m.preventDefault();
    const j = m.dataTransfer.getData("text/plain");
    if (!(!j || !Lt.current))
      try {
        const L = JSON.parse(j), G = Lt.current.getBoundingClientRect(), Y = m.clientX - G.left, F = m.clientY - G.top, ce = Zt(Math.round(Y / G.width * De), 0, De - 320), be = Zt(Math.round(F / G.height * je), 0, je - 180);
        if (L.type === "unplaced") {
          const he = Xt.find((ke) => ke.stationId === L.stationId && ke.displayId === L.displayId);
          if (he) {
            const ke = he.nativeAspectRatio || (he.sourceWidth && he.sourceHeight ? he.sourceWidth / he.sourceHeight : 1.7777777777777777), ut = ke >= 1 ? 640 : Math.round(360 * ke), lt = ke >= 1 ? Math.round(640 / ke) : 360, ot = fe.length > 0 ? Math.max(...fe.map((yt) => yt.zIndex || 0)) + 1 : 1, pe = Nt[fe.length % Nt.length], at = {
              stationId: he.stationId,
              displayId: he.displayId,
              label: he.label,
              x: Zt(ce, 0, De - ut),
              y: Zt(be, 0, je - lt),
              width: ut,
              height: lt,
              sourceWidth: he.sourceWidth || 1920,
              sourceHeight: he.sourceHeight || 1080,
              nativeAspectRatio: ke,
              aspectRatio: ke,
              zIndex: ot,
              rotation: 0,
              borderWidth: 2,
              borderColor: pe,
              shadowEffect: "deep",
              borderRadius: 0
            }, Pt = [...fe, at];
            M(Pt), Xe(Pt.length - 1);
          }
        } else if (L.type === "placed" && L.origIdx !== void 0) {
          const he = fe.map((ke, ut) => ut === L.origIdx ? {
            ...ke,
            x: Zt(ce, 0, De - ke.width),
            y: Zt(be, 0, je - ke.height)
          } : ke);
          M(he), Xe(L.origIdx);
        }
      } catch (L) {
        console.warn("Canvas drop failed:", L);
      }
  }, [Xt, fe, M, De, je]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: gn,
      className: `multicam-viewport-root canvas-grid ${Rt ? "fullscreen-grid-active" : ""}`,
      children: [
        (dt || ee) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: dt ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        bn && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${bn.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: bn.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: bn.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: Cn, className: `canvas-stage-wrapper ${Un ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          Ee && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  fe.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Ye(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: Me,
                onChange: (m) => ze(m.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Qs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Qs.length })
                ] }),
                Qs.map((m, j) => {
                  const L = Ie && Ie.type === "placed" && Ie.origIdx === m.origIdx, Y = Qe.index === j ? Qe.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${m.isSelected ? "is-selected" : ""} ${L ? "is-dragging-row" : ""} ${Y}`,
                      draggable: !0,
                      onDragStart: (F) => Pu(F, m),
                      onDragOver: (F) => Kp(F, j),
                      onDragLeave: (F) => Vp(F, j),
                      onDrop: (F) => Yp(F, j),
                      onDragEnd: _u,
                      onClick: () => Xe(m.origIdx),
                      title: `Drag to reorder layer (${m.label})`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                        /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${m.layerRank}`, children: [
                          "#",
                          m.layerRank
                        ] }),
                        /* @__PURE__ */ s.jsx("span", { className: `status-dot ${m.isSelected ? "active" : ""}` }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: m.label, children: m.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          m.sourceWidth,
                          "×",
                          m.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (F) => F.stopPropagation(), children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Te(m.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Ke(m.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => we(m.origIdx),
                              title: "Remove from canvas",
                              children: "✕"
                            }
                          )
                        ] })
                      ]
                    },
                    `feed-layer-${m.stationId}-${m.displayId}-${m.origIdx}`
                  );
                })
              ] }),
              Lo.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Lo.length })
                ] }),
                Lo.map((m) => {
                  const j = Ie && Ie.type === "unplaced" && Ie.stationId === m.stationId && Ie.displayId === m.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${j ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (L) => Pu(L, m),
                      onDragEnd: _u,
                      onClick: () => ye(m.feed),
                      title: `Drag onto canvas or layers, or click to add ${m.label}`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                        /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                        /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: m.label, children: m.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          m.sourceWidth,
                          "×",
                          m.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (L) => L.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-add-row",
                            onClick: () => ye(m.feed),
                            title: "Add to canvas",
                            children: "＋ ADD"
                          }
                        ) })
                      ]
                    },
                    `unplaced-feed-${m.stationId}-${m.displayId}`
                  );
                })
              ] }),
              Qs.length === 0 && Lo.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Ze("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: Ne, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${Ee ? "active" : ""}`,
                  onClick: () => Ye((m) => !m),
                  title: `Feeds & Layers Palette (${fe.length}/${Xt.length} on canvas)`,
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
                    className: `btn-wing-tool ${Q ? "active" : ""}`,
                    onClick: () => {
                      B((m) => !m), ue(!1);
                    },
                    title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                    ]
                  }
                ),
                Q && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${ln === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        Ut("auto-grid"), Ze("auto-grid"), B(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const m = new Set((t && t.length > 0 ? t : n).map((G) => G.id)), j = (fe || []).filter((G) => m.has(G.stationId)), L = (t && t.length > 0 ? t : n).filter((G) => !j.some((Y) => Y.stationId === G.id));
                          return j.length > 0 ? j.length + L.length : on.length;
                        })() })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${ln === "1x1" ? "active" : ""}`,
                      onClick: () => {
                        Ut("1x1"), Ze("1x1"), B(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${ln === "1x2" ? "active" : ""}`,
                      onClick: () => {
                        Ut("1x2"), Ze("1x2"), B(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${ln === "2x2" ? "active" : ""}`,
                      onClick: () => {
                        Ut("2x2"), Ze("2x2"), B(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${ln === "1+3-pip" ? "active" : ""}`,
                      onClick: () => {
                        Ut("1+3-pip"), Ze("1+3-pip"), B(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${ln === "hero-stacked" ? "active" : ""}`,
                      onClick: () => {
                        Ut("hero-stacked"), Ze("hero-stacked"), B(!1);
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
                    className: `btn-wing-tool ${H ? "active" : ""}`,
                    onClick: () => {
                      ue((m) => !m), B(!1);
                    },
                    title: `Aspect Ratio: ${$t} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: $t })
                    ]
                  }
                ),
                H && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  is.map((m) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${$t === m.id ? "active" : ""}`,
                      onClick: () => {
                        de(m.id), ue(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: m.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                          m.w,
                          "×",
                          m.h
                        ] })
                      ]
                    },
                    m.id
                  ))
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${Un ? "highlight-emerald" : "highlight-cyan"}`,
                  onClick: Mn,
                  title: Un ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Un ? "↔" : "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Un ? "100%" : "FIT" })
                  ]
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${et ? "active" : ""}`,
                  onClick: () => Ve((m) => !m),
                  title: et ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                  className: `btn-wing-tool ${Oe ? "active" : ""}`,
                  onClick: () => _e((m) => !m),
                  title: Oe ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  onClick: si,
                  disabled: jt.current.length === 0,
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
                  onClick: ri,
                  disabled: Nn.current.length === 0,
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
                ref: (m) => {
                  Lt.current = m, un.current = m;
                },
                className: `canvas-master-frame-16-9 ${Un ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: gt.width > 180 ? `${gt.width}px` : "100%",
                  height: gt.height > 100 ? `${gt.height}px` : "auto",
                  aspectRatio: `${De} / ${je}`
                },
                onMouseMove: Ao,
                onMouseLeave: $o,
                onDragOver: (m) => {
                  m.preventDefault(), m.dataTransfer.dropEffect = "copy";
                },
                onDrop: Gp,
                onClick: () => Bt(!1),
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                  ht && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-ghost-preview",
                      style: {
                        position: "absolute",
                        left: `${ht.x / De * 100}%`,
                        top: `${ht.y / je * 100}%`,
                        width: `${ht.width / De * 100}%`,
                        height: `${ht.height / je * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: ht.label })
                      ] })
                    }
                  ),
                  Oe && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${De}×${je}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: At.isInside ? `${At.x},${At.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${De} 20`,
                        preserveAspectRatio: "none",
                        children: [
                          Xs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: Xs.x,
                              y: "0",
                              width: Xs.width,
                              height: "20",
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          To.map((m) => m.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: m.val, y1: "0", x2: m.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: m.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: m.val })
                          ] }, `rx-${m.val}`) : m.isMed ? /* @__PURE__ */ s.jsx("line", { x1: m.val, y1: "8", x2: m.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${m.val}`) : /* @__PURE__ */ s.jsx("line", { x1: m.val, y1: "13", x2: m.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${m.val}`)),
                          At.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: At.x,
                              y1: "0",
                              x2: At.x,
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
                        viewBox: `0 0 20 ${je}`,
                        preserveAspectRatio: "none",
                        children: [
                          Xs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: "0",
                              y: Xs.y,
                              width: "20",
                              height: Xs.height,
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          Cr.map((m) => m.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: m.val, x2: "18", y2: m.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: m.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: m.val })
                          ] }, `ry-${m.val}`) : m.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: m.val, x2: "18", y2: m.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${m.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: m.val, x2: "18", y2: m.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${m.val}`)),
                          At.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: At.y,
                              x2: "20",
                              y2: At.y,
                              stroke: "#06B6D4",
                              strokeWidth: "2"
                            }
                          )
                        ]
                      }
                    ) })
                  ] }),
                  ve.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${ve.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  ve.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${ve.horizontal}%`,
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
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Ye(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Ze("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Hp.map((m) => {
                    var _t;
                    const j = m.originalIndex, L = qe === j, G = dt && qe === j, Y = ee && qe === j, F = (n.length > 0 ? n : t).find(
                      (Pe) => {
                        var ft, it, br, Js;
                        return Pe.id === m.stationId || ((ft = Pe.hostname) == null ? void 0 : ft.toLowerCase()) === ((it = m.stationId) == null ? void 0 : it.toLowerCase()) || ((br = Pe.id) == null ? void 0 : br.toLowerCase()) === ((Js = m.stationId) == null ? void 0 : Js.toLowerCase());
                      }
                    ), ce = Xt.find((Pe) => Pe.stationId === m.stationId && Pe.displayId === m.displayId), be = F || {
                      id: m.stationId,
                      hostname: (ce == null ? void 0 : ce.stationHostname) || m.stationHostname || m.stationId,
                      displayName: (ce == null ? void 0 : ce.stationName) || m.label || m.stationId,
                      displays: ce ? [{ displayId: ce.displayId, width: ce.sourceWidth, height: ce.sourceHeight }] : []
                    }, he = (be == null ? void 0 : be.displays) || ((_t = be == null ? void 0 : be.topology) == null ? void 0 : _t.displays) || [], ke = fe.filter(
                      (Pe) => Pe.stationId === m.stationId || be && (Pe.stationId === be.id || Pe.stationId === be.hostname)
                    ), ut = he.length > 1 && ke.length >= he.length, lt = m.borderColor || Nt[j % Nt.length], ot = m.borderWidth !== void 0 ? m.borderWidth : 2, pe = m.rotation || 0, at = m.shadowEffect || "deep", Pt = m.borderRadius || 0, yt = m.x / De * 100, vt = m.y / je * 100, Ln = m.width / De * 100, Zn = m.height / je * 100, Wt = Kg(at, L, lt);
                    m.y < 50, m.x < 100, m.x + m.width > De - 100;
                    const It = m.zIndex !== void 0 ? m.zIndex : j + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${L ? "is-selected" : ""} ${G ? "is-dragging" : ""} ${Y ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${yt}%`,
                          top: `${vt}%`,
                          width: `${Ln}%`,
                          height: `${Zn}%`,
                          zIndex: It * 10 + (G ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${ot}px solid ${lt}`,
                          borderRadius: `${Pt}px`,
                          boxShadow: Wt,
                          opacity: m.opacity !== void 0 ? m.opacity : 1,
                          pointerEvents: m.opacity !== void 0 && m.opacity < 0.1 ? "none" : "auto",
                          cursor: G ? "grabbing" : "grab",
                          transition: G || Y ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (Pe) => Sr(Pe, j),
                        onContextMenu: (Pe) => {
                          Pe.preventDefault(), Pe.stopPropagation(), Xe(j), Bt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (Pe) => Sr(Pe, j),
                              onDoubleClick: () => tt(j),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: m.label || `${be.displayName || m.stationId} (${m.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(m.width),
                                  "×",
                                  Math.round(m.height),
                                  " (",
                                  Qr(m.width, m.height),
                                  ") @ (",
                                  Math.round(m.x),
                                  ",",
                                  Math.round(m.y),
                                  ")",
                                  pe !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    pe,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${It}`, children: [
                                  "#$",
                                  It
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-badge-action-inspector ${L && Ot ? "active" : ""}`,
                                    onClick: (Pe) => {
                                      Pe.stopPropagation(), Xe(j), Bt((ft) => !ft || qe !== j);
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
                                  transform: pe ? `rotate(${pe}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: G ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Og,
                                  {
                                    station: be,
                                    isSolo: !1,
                                    currentEpochMs: ne,
                                    timeMode: p,
                                    isPlaying: v,
                                    setIsPlaying: S,
                                    baseEpochMs: d,
                                    totalDurationMs: I,
                                    outPointMs: k,
                                    setPlayheadMs: x,
                                    globalGaps: g,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: T,
                                    playbackSpeed: w,
                                    activeAudioStationId: $e,
                                    onSoloAudio: Fe,
                                    directorPlan: y || (be == null ? void 0 : be.directorPlan),
                                    isAutoDirectorEnabled: i ? i[be.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: a,
                                    targetDisplayId: m.displayId,
                                    onSelectDisplayId: (Pe) => {
                                      const ft = fe.map((it, br) => br === j ? { ...it, displayId: Pe } : it);
                                      M(ft);
                                    },
                                    areAllDisplaysPlaced: ut,
                                    slotIndex: j,
                                    borderColor: lt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (Pe) => Sr(Pe, j),
                                onDoubleClick: () => tt(j),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          L && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (Pe) => Vr(Pe, j, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Qr(m.sourceWidth, m.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (Pe) => Vr(Pe, j, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Qr(m.sourceWidth, m.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (Pe) => Vr(Pe, j, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Qr(m.sourceWidth, m.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (Pe) => Vr(Pe, j, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Qr(m.sourceWidth, m.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${m.stationId}-${m.displayId}-${j}`
                    );
                  }),
                  !K && Ot && qe !== null && Xs && (() => {
                    const m = Xs, j = qe, L = m.borderColor || Nt[j % Nt.length], G = m.borderWidth !== void 0 ? m.borderWidth : 2, Y = m.rotation || 0, F = m.shadowEffect || "deep", ce = m.zIndex !== void 0 ? m.zIndex : j + 1, be = m.x / De * 100, he = m.width / De * 100, ke = be + he / 2;
                    let ut = `${ke}%`, lt = "translateX(-50%)";
                    ke < 28 ? (ut = `${Math.max(1, be)}%`, lt = "none") : ke > 72 && (ut = `${Math.min(99, be + he)}%`, lt = "translateX(-100%)");
                    const ot = m.y + m.height + 8;
                    let pe;
                    ot + 45 > je ? pe = `${Math.max(20, (m.y + m.height - 44) / je * 100)}%` : pe = `${ot / je * 100}%`;
                    const at = (n.length > 0 ? n : t).find(
                      (yt) => {
                        var vt, Ln;
                        return yt.id === m.stationId || ((vt = yt.hostname) == null ? void 0 : vt.toLowerCase()) === ((Ln = m.stationId) == null ? void 0 : Ln.toLowerCase());
                      }
                    ), Pt = at ? at.id : m.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector compact-hud-inspector",
                        style: {
                          position: "absolute",
                          left: ut,
                          top: pe,
                          transform: lt,
                          zIndex: 99999
                        },
                        onMouseDown: (yt) => yt.stopPropagation(),
                        onClick: (yt) => yt.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${m.label || Pt} • Layer #${ce}`, children: [
                            "🎛️ #$",
                            ce
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool color-swatch-trigger",
                                onClick: () => Je((yt) => !yt),
                                title: "🎨 Frame Color: Choose border color",
                                children: /* @__PURE__ */ s.jsx(
                                  "span",
                                  {
                                    className: "swatch-circle",
                                    style: { backgroundColor: L === "transparent" ? "#1E293B" : L }
                                  }
                                )
                              }
                            ),
                            Re && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Hg.map((yt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${L === yt ? "is-active" : ""}`,
                                style: { backgroundColor: yt === "transparent" ? "#1E293B" : yt },
                                onClick: () => {
                                  Be({ borderColor: yt }), Je(!1);
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
                                const yt = [0, 2, 4, 8], vt = yt[(yt.indexOf(G) + 1) % yt.length];
                                Be({ borderWidth: vt });
                              },
                              title: `Border Width: ${G}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                              children: [
                                "📏 ",
                                G,
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
                                const yt = ["none", "deep", "glow-cyan", "glow-emerald"], vt = yt[(yt.indexOf(F) + 1) % yt.length];
                                Be({ shadowEffect: vt });
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
                                onClick: () => Te(j),
                                title: "Step Layer Up (+1)",
                                children: "▲"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Ke(j),
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
                              onClick: () => Ue(90),
                              title: `Rotate: Step 90° clockwise (Current: ${Y}°)`,
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => Rl(j),
                              title: `Snap to Native Recorded Aspect (${Qr(m.sourceWidth, m.sourceHeight)})`,
                              children: "📐 NATIVE"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => tt(j),
                              title: "1x1 Focus Mode (Double-click window to toggle)",
                              children: "⛶ 1x1"
                            }
                          ),
                          l && /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => l(Pt, m.displayId),
                              title: "Deep Forensic Multi-Angle Spotlight",
                              children: "🔍"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-del-feed",
                              onClick: () => we(j),
                              title: "Remove Screen from Canvas",
                              children: "🗑️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-close-inspector",
                              onClick: () => Xe(null),
                              title: "Close Menu (Esc)",
                              children: "✕"
                            }
                          )
                        ]
                      }
                    );
                  })(),
                  /* @__PURE__ */ s.jsx(
                    Dg,
                    {
                      currentEpochMs: ne,
                      position: X,
                      onPositionChange: (m) => {
                        J(m);
                        try {
                          localStorage.setItem("itb_canvas_utc_clock_pos", m);
                        } catch {
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx(Pg, {})
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => V(!0),
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
                    className: `btn-wing-tool ${ae ? "active" : ""}`,
                    onClick: () => oe((m) => !m),
                    title: `Saved Presets Library (${Ge.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Ge.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                ae && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => oe(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Ge.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Ge.map((m) => {
                    var j;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      nn(m), oe(!1);
                    }, children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: m.name }),
                        /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                          ((j = m.placements) == null ? void 0 : j.length) || 0,
                          " screens • ",
                          m.dateStr
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-del-preset",
                          onClick: (L) => zt(m.id, L),
                          title: "Delete saved preset",
                          children: "🗑️"
                        }
                      )
                    ] }, m.id);
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool",
                  onClick: fn,
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
                    var m;
                    return (m = xe.current) == null ? void 0 : m.click();
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
                  ref: xe,
                  type: "file",
                  accept: ".json",
                  style: { display: "none" },
                  onChange: xs
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-rose",
                  onClick: () => {
                    bt.current = !1, Ut("auto-grid");
                    const m = on.length > 0 ? on : Xt, j = qs(m, De, je), L = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: De,
                            height: je,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: j
                          }
                        }
                      ]
                    };
                    dn(L), E && E(L), Xe(0);
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
                  onClick: Ne,
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
                  onClick: Wp,
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
        ] }) }),
        " ",
        R && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => V(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => V(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: ie,
                onChange: (m) => Ae(m.target.value),
                autoFocus: !0,
                onKeyDown: (m) => {
                  m.key === "Enter" && Ct();
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
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => V(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Ct, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const Oi = [0.5, 1, 1.25, 1.5, 2, 4];
function _c({
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
  hasGridPlacements: N = !0,
  onStepFrameForward: f,
  onStepFrameBackward: p,
  playbackSpeed: v = 1,
  onChangeSpeed: S,
  onSetInPoint: I,
  onSetOutPoint: D
}) {
  const [k, x] = u.useState(() => vl()), { volume: g, isMuted: T } = k, w = !!(N && d > 0);
  u.useEffect(() => {
    const Z = (E) => {
      E.detail && x(E.detail);
    };
    return window.addEventListener("itb-audio-state-changed", Z), () => window.removeEventListener("itb-audio-state-changed", Z);
  }, []);
  const C = u.useCallback((Z, E, U) => {
    const P = {
      volume: typeof Z == "number" ? Z : g,
      isMuted: typeof E == "boolean" ? E : T,
      channelMode: U || k.channelMode || "both"
    };
    x(P), Tg(P);
  }, [g, T, k.channelMode]), h = (Z) => {
    Z == null || Z.stopPropagation(), w && n(!t);
  }, A = (Z) => {
    if (Z == null || Z.stopPropagation(), !w || !S) return;
    const E = Oi.indexOf(v), U = E === -1 ? 1 : (E + 1) % Oi.length;
    S(Oi[U]);
  }, y = (Z) => {
    Z == null || Z.stopPropagation(), T ? C(g === 0 ? 0.5 : g, !1) : C(g, !0);
  }, b = (Z) => {
    Z.stopPropagation();
    const E = parseFloat(Z.target.value);
    E === 0 ? C(0, !0) : C(E, !1);
  }, O = (Z) => {
    const E = u.useRef(null), U = u.useRef(null), P = u.useRef(0), K = u.useCallback(() => {
      E.current && clearTimeout(E.current), U.current && clearInterval(U.current), E.current = null, U.current = null;
    }, []), _ = u.useCallback((ne = 1) => {
      if (n && n(!1), a) {
        const X = 33 * ne;
        a((J) => {
          const $e = Z === "forward" ? J + X : J - X;
          return Math.max(0, Math.min(d, $e));
        });
      } else Z === "forward" && f ? f() : Z === "backward" && p && p();
    }, [Z]), te = u.useCallback((ne) => {
      ne.preventDefault(), ne.stopPropagation(), w && (K(), _(1), P.current = performance.now(), E.current = setTimeout(() => {
        U.current = setInterval(() => {
          const X = performance.now() - P.current, J = X > 2500 ? 4 : X > 1e3 ? 2 : 1;
          _(J);
        }, 50);
      }, 280));
    }, [_, K]);
    return u.useEffect(() => K, [K]), {
      onMouseDown: te,
      onMouseUp: K,
      onMouseLeave: K,
      onTouchStart: te,
      onTouchEnd: K
    };
  }, z = O("backward"), $ = O("forward"), W = (Z) => {
    Z.stopPropagation(), w && (n && n(!1), a && a(i));
  }, se = (Z) => {
    Z.stopPropagation(), w && (n && n(!1), a && a(c));
  }, re = () => T || g === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : g < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !w,
            onClick: A,
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
            disabled: !I,
            onClick: (Z) => {
              Z.stopPropagation(), I == null || I();
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
              onClick: (Z) => {
                Z.stopPropagation(), l && l(!r);
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
              onClick: W,
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
              ...z,
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
              disabled: !w,
              ...$,
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
              onClick: se,
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
            onClick: (Z) => {
              Z.stopPropagation(), D == null || D();
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
              className: `btn-audio-mute ${T || g === 0 ? "is-muted" : ""}`,
              onClick: y,
              title: T ? "Unmute" : `Mute (${Math.round(g * 100)}%)`,
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
              value: T ? 0 : g,
              onChange: b,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const fa = 2500, Yg = {
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
function Gg(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Yg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function $p(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Gg), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Rp(e, t = " + ") {
  return $p(e).join(t);
}
function zl(e) {
  return Rp(e, "+");
}
const Xg = 8;
function Qg({
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
  const [N, f] = u.useState([]), [, p] = u.useState(!1), v = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((g) => ({
    id: g.id,
    name: g.displayName || g.hostname || g.name || g.id,
    hostname: g.hostname || g.id
  })) : t || e ? [{
    id: t || e,
    name: e || t,
    hostname: t || e
  }] : [], [n, t, e]);
  u.useEffect(() => {
    if (r && Array.isArray(r) && r.length > 0)
      return;
    if (!v.length || !l || i <= 0) {
      f([]);
      return;
    }
    const g = new AbortController(), T = Math.max(0, l + a - fa), w = l + a + i + fa;
    p(!0);
    const C = v.map((h) => {
      const A = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(h.hostname)}&startEpoch=${T}&endEpoch=${w}`;
      return fetch(A, { signal: g.signal }).then((y) => y.ok ? y.json() : []).then((y) => (Array.isArray(y) ? y : []).map((b) => ({
        ...b,
        stationId: h.id,
        stationName: h.name
      }))).catch((y) => {
        if (y.name !== "AbortError") return [];
        throw y;
      });
    });
    return Promise.all(C).then((h) => {
      const A = h.flat();
      f(A), p(!1);
    }).catch((h) => {
      h.name !== "AbortError" && (f([]), p(!1));
    }), () => g.abort();
  }, [v, l, a, i, r]);
  const S = r && Array.isArray(r) && r.length > 0 ? r : N, I = u.useMemo(() => {
    if (!S.length || i <= 0 || c <= 0)
      return [];
    const g = l + a, T = g + i, w = [...S].sort((y, b) => y.epochMs - b.epochMs), C = [];
    let h = null, A = -999;
    for (const y of w) {
      const b = y.epochMs + fa;
      if (b < g || b > T)
        continue;
      const O = b - l, z = (O - a) / i * c;
      if (h && z - A < Xg) {
        h.events.push(y), h.endOffsetMs = O, h.endEpochMs = b;
        const $ = new Set(h.events.map((W) => W.stationName || "Workstation"));
        h.isMultiStation = $.size > 1, h.stationCount = $.size, A = z;
      } else {
        const $ = (O - a) / i * 100;
        h = {
          id: `kc_${y.epochMs}_${C.length}`,
          startOffsetMs: O,
          endOffsetMs: O,
          startEpochMs: b,
          endEpochMs: b,
          pct: $,
          events: [y],
          isMultiStation: !1,
          stationCount: 1
        }, C.push(h), A = z;
      }
    }
    return C;
  }, [S, l, a, i, c]);
  function D(g) {
    if (!g.events.length) return "";
    if (g.events.length === 1)
      return zl(g.events[0].keyCombination);
    const T = g.events.find((h) => h.keyCombination.includes("+"));
    if (T) {
      const h = zl(T.keyCombination);
      return g.events.length > 1 ? `${h} (+${g.events.length - 1})` : h;
    }
    const w = zl(g.events[0].keyCombination);
    return g.events.every((h) => zl(h.keyCombination) === w) ? `${w} ×${g.events.length}` : `${w} (+${g.events.length - 1})`;
  }
  function k(g, T = "LOCAL") {
    return Et(g, T);
  }
  function x(g) {
    const T = [];
    for (const w of g) {
      const C = zl(w.keyCombination);
      T.length && T[T.length - 1].key === C ? T[T.length - 1].count++ : T.push({ key: C, count: 1 });
    }
    return T;
  }
  return I.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: I.map((g) => {
    const T = g.events.length, w = T > 1, C = g.isMultiStation, h = D(g), A = k(g.startEpochMs, o), y = g.pct < 10 ? "edge-left" : g.pct > 90 ? "edge-right" : "", b = {};
    return g.events.forEach((O) => {
      const z = O.stationName || e || "Workstation";
      b[z] || (b[z] = []), b[z].push(O);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${w ? "is-cluster" : "is-single"} ${C ? "is-multi-station" : ""}`,
        style: { left: `${g.pct}%` },
        onClick: (O) => {
          O.stopPropagation(), d && d(g.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${h} at ${A}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            w && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: C ? `${g.stationCount}S` : T > 9 ? "9+" : T })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${y}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: C ? `MULTICAM KEYSTROKES (${g.stationCount} WORKSTATIONS • ${T} EVT)` : w ? `KEYSTROKE BURST (${T})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: A })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(b).map(([O, z]) => {
              const $ = x(z);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: O }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    z.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  $.slice(0, 6).map((W, se) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    W.key,
                    W.count > 1 ? ` ×${W.count}` : ""
                  ] }, se)),
                  $.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    $.length - 6,
                    " more"
                  ] })
                ] })
              ] }, O);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      g.id
    );
  }) }) : null;
}
const Jg = u.memo(Qg), Di = [
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
], Zg = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function qg({
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
  earliestMediaMs: N = null,
  movieBoundaries: f = null,
  stationHostname: p = "",
  activeStationName: v = "",
  showKeystrokes: S = !0,
  keystrokes: I = []
}) {
  const D = u.useRef(null), [k, x] = u.useState(1e3);
  u.useEffect(() => {
    if (!D.current) return;
    const _ = new ResizeObserver((te) => {
      for (let ne of te)
        ne.contentRect.width > 50 && x(ne.contentRect.width);
    });
    return _.observe(D.current), () => _.disconnect();
  }, []);
  const g = u.useCallback((_) => !r || r <= 0 ? "0%" : `${(_ - n) / r * 100}%`, [r, n]), T = u.useCallback((_) => {
    const ne = (_ - n) / r * 100;
    return ne >= -5 && ne <= 105;
  }, [n, r]), w = (_) => {
    if (!D.current) return;
    const te = D.current.getBoundingClientRect(), ne = Math.max(0, Math.min(_.clientX - te.left, te.width)), X = Math.round(n + ne / te.width * r);
    a && a(X);
  }, C = () => {
    a && a(null);
  }, h = (_) => {
    if (!D.current || !i) return;
    const te = D.current.getBoundingClientRect(), ne = Math.max(0, Math.min(_.clientX - te.left, te.width)), X = Math.round(n + ne / te.width * r);
    i(Math.max(0, Math.min(l, X)));
  }, A = u.useMemo(() => {
    const _ = Math.max(3, Math.floor(k / 95)), te = r / _;
    for (let ne of Di)
      if (ne >= te) return ne;
    return Di[Di.length - 1];
  }, [r, k]), y = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const _ = e + n, te = _ + r, ne = t === "LOCAL" ? Ws(_).offsetMin * 60 * 1e3 : 0, X = _ + ne, J = Math.ceil(X / A) * A, $e = [];
    for (let Fe = J; Fe <= te + ne; Fe += A) {
      const Ee = Fe - ne, Ye = (Ee - _) / r * 100;
      Ye >= 0 && Ye <= 100 && $e.push({
        epoch: Ee,
        pct: Ye,
        label: Et(Ee, t, {
          includeSeconds: A < 6e4
        })
      });
    }
    return $e;
  }, [e, n, r, A, t]), b = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const _ = e + n, te = _ + r;
    return Sp(_, te).map((ne) => ({
      ...ne,
      pct: (ne.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), O = u.useMemo(() => {
    if (!r || !e) return [];
    const _ = e + n, te = _ + r, ne = t === "UTC", X = [], J = ne ? 0 : Ws(_).offsetMin * 60 * 1e3, $e = _ + J, Fe = te + J, Ee = new Date($e);
    for (Ee.setUTCHours(0, 0, 0, 0), Ee.getTime() < $e && Ee.setUTCDate(Ee.getUTCDate() + 1); Ee.getTime() <= Fe; ) {
      const Ie = Ee.getTime() - J, Ce = (Ie - _) / r * 100, Qe = String(Ee.getUTCDate()).padStart(2, "0"), ct = Zg[Ee.getUTCMonth()], R = `${Qe} ${ct}`;
      X.push({ epoch: Ie, pct: Ce, dateLabel: R }), Ee.setUTCDate(Ee.getUTCDate() + 1);
    }
    return X;
  }, [e, n, r, t]), {
    globalFirstMs: z = N,
    globalLastMs: $ = null,
    currentFirstMs: W = null,
    currentLastMs: se = null
  } = f || { globalFirstMs: N }, re = z !== null && W !== null && Math.abs(z - W) < 1e3, Z = $ !== null && se !== null && Math.abs($ - se) < 1e3, E = u.useMemo(() => {
    const _ = [];
    return re ? T(z) && _.push({
      id: "first-combined",
      ms: z,
      pct: g(z),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${Et(e + z, t)} (Click to jump)`
    }) : (T(z) && _.push({
      id: "first-global",
      ms: z,
      pct: g(z),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${Et(e + z, t)} (Click to jump)`
    }), T(W) && _.push({
      id: "first-current",
      ms: W,
      pct: g(W),
      className: "ruler-media-pin current-first",
      badge: v ? `FIRST (${v})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${Et(e + W, t)} (Click to jump)`
    })), Z ? T($) && _.push({
      id: "last-combined",
      ms: $,
      pct: g($),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${Et(e + $, t)} (Click to jump)`
    }) : (T(se) && _.push({
      id: "last-current",
      ms: se,
      pct: g(se),
      className: "ruler-media-pin current-last",
      badge: v ? `LAST (${v})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${Et(e + se, t)} (Click to jump)`
    }), T($) && _.push({
      id: "last-global",
      ms: $,
      pct: g($),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${Et(e + $, t)} (Click to jump)`
    })), _;
  }, [
    z,
    $,
    W,
    se,
    re,
    Z,
    e,
    t,
    v,
    T,
    g
  ]), U = u.useMemo(() => {
    const _ = [];
    return typeof c == "number" && T(c) && _.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: g(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${Et(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && T(d) && _.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: g(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${Et(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), _;
  }, [c, d, e, t, T, g]), P = o !== null ? g(o) : null, K = P !== null && P >= 0 && P <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: D,
      className: "timeline-ruler-root",
      onMouseMove: w,
      onMouseLeave: C,
      onClick: h,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          y.map((_) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${_.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: _.label })
          ] }, _.epoch)),
          S && /* @__PURE__ */ s.jsx(
            Jg,
            {
              stationHostname: p,
              activeStationName: v,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: k,
              onSeek: i,
              keystrokes: I
            }
          ),
          b.map((_) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${_.pct}%` },
              title: `${_.description} (${_.labelBefore} ➔ ${_.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: _.description })
                ] })
              ]
            },
            _.switchEpochMs
          )),
          O.map((_) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${_.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: _.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            _.epoch
          )),
          E.map((_) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: _.className,
              style: { left: `${_.pct}` },
              onClick: (te) => {
                te.stopPropagation(), i && i(_.ms);
              },
              title: _.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: _.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            _.id
          )),
          U.map((_) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${_.type}-cut-tick`,
              style: { left: `${_.pct}` },
              onClick: (te) => {
                te.stopPropagation(), i && i(_.ms);
              },
              title: _.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: _.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: _.shortLabel })
                ] })
              ]
            },
            _.id
          ))
        ] }),
        K && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${P}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: Et(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Hn = (e) => String(e).padStart(2, "0");
function ex({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [i, c] = u.useState(!1), [d, N] = u.useState(!1), [f, p] = u.useState(""), [v, S] = u.useState(""), I = u.useCallback((y) => {
    if (!y || isNaN(y) || y <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const $ = new Date(y);
      return {
        timeStr: `${Hn($.getUTCHours())}:${Hn($.getUTCMinutes())}:${Hn($.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: b, label: O } = Ws(y), z = new Date(y + b * 60 * 1e3);
    return {
      timeStr: `${Hn(z.getUTCHours())}:${Hn(z.getUTCMinutes())}:${Hn(z.getUTCSeconds())}`,
      zoneLabel: O
    };
  }, [t]), D = u.useCallback((y) => {
    if (!y || y < 0) return "00:00:00";
    const b = Math.floor(y / 1e3), O = Math.floor(b / 3600), z = Math.floor(b % 3600 / 60), $ = b % 60;
    return `${Hn(O)}:${Hn(z)}:${Hn($)}`;
  }, []), k = u.useMemo(() => I(e + r), [I, e, r]), x = u.useMemo(() => I(e + o), [I, e, o]), g = u.useMemo(() => D(Math.max(0, o - r)), [D, r, o]), T = u.useCallback((y, b) => {
    if (!y || !y.trim()) return b;
    const z = y.trim().split(" ")[0].split(":").map(Number);
    if (z.length < 2 || z.some(isNaN)) return b;
    const [$, W, se = 0] = z;
    if (t === "UTC") {
      const J = new Date(e);
      J.setUTCHours($, W, se, 0);
      let $e = J.getTime();
      for (; $e < e; ) $e += 864e5;
      for (; $e > e + n + 1e3; ) $e -= 864e5;
      const Fe = $e - e;
      return isNaN(Fe) ? b : Math.max(0, Math.min(n, Fe));
    }
    const { offsetMin: re } = Ws(e), Z = new Date(e + re * 6e4), E = Z.getUTCFullYear(), U = Z.getUTCMonth(), P = Z.getUTCDate(), K = `${E}-${Hn(U + 1)}-${Hn(P)}`, _ = `${Hn($)}:${Hn(W)}:${Hn(se)}`, te = Fa(K, _);
    let ne;
    if (te.isAmbiguous) {
      const J = e + b, $e = Math.abs(te.firstOccurrenceEpoch - J), Fe = Math.abs(te.secondOccurrenceEpoch - J);
      ne = $e <= Fe ? te.firstOccurrenceEpoch : te.secondOccurrenceEpoch;
    } else {
      const J = Date.UTC(E, U, P, $, W, se), { offsetMin: $e } = Ws(J - re * 6e4);
      ne = J - $e * 6e4;
    }
    for (; ne < e; ) ne += 864e5;
    for (; ne > e + n + 1e3; ) ne -= 864e5;
    const X = ne - e;
    return isNaN(X) ? b : Math.max(0, Math.min(n, X));
  }, [e, t, n]), w = () => {
    p(k.timeStr), c(!0);
  }, C = () => {
    if (c(!1), !f || !f.trim() || f.trim() === k.timeStr)
      return;
    const y = T(f.trim(), r);
    y !== null && !isNaN(y) && y < o && l(y);
  }, h = () => {
    S(x.timeStr), N(!0);
  }, A = () => {
    if (N(!1), !v || !v.trim() || v.trim() === x.timeStr)
      return;
    const y = T(v.trim(), o);
    y !== null && !isNaN(y) && y > r && a(y);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "tactical-timecode-console", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "console-row in-accent", children: [
      /* @__PURE__ */ s.jsx("span", { className: "console-tag", children: "IN" }),
      i ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: f,
          autoFocus: !0,
          onChange: (y) => p(y.target.value),
          onBlur: C,
          onKeyDown: (y) => {
            y.key === "Enter" && C(), y.key === "Escape" && c(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: w,
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
          onChange: (y) => S(y.target.value),
          onBlur: A,
          onKeyDown: (y) => {
            y.key === "Enter" && A(), y.key === "Escape" && N(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: h,
          title: `Click to edit OUT time (${x.zoneLabel})`,
          children: [
            x.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: x.zoneLabel })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "console-duration-shelf", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "dur-label-group", children: [
        /* @__PURE__ */ s.jsx("span", { className: "dur-dot" }),
        /* @__PURE__ */ s.jsx("span", { className: "dur-title", children: "DUR" })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: g })
    ] })
  ] });
}
function tx({
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
  onStartDragMinimap: N
}) {
  const f = Math.max(0, Math.min(100, i / r * 100)), p = Math.max(0, Math.min(100, c / r * 100)), v = Math.max(0, p - f), S = Math.max(0, Math.min(100, l / r * 100)), I = Math.max(0, Math.min(100 - S, o / r * 100)), D = S + I, k = a > 1.05, x = 7, g = v >= 10, T = v >= 16, w = g, C = T, h = w && Math.abs(S - f) < x, A = k && I >= 12 && !h, y = C && Math.abs(D - p) < x, b = k && I >= 12 && !y;
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
            style: { left: `${f}%`, width: `${v}%` },
            children: [
              w && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: Et(t + i, n) }),
              C && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: Et(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${S}%`, width: `${I}%` },
            children: [
              A && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: Et(t + l, n) }),
              b && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: Et(t + l + o, n) })
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
function nx({
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
  onChangeKeystrokeMode: N,
  showRulerKeystrokes: f = !1,
  onToggleRulerKeystrokes: p
}) {
  const v = (d || "NONE").toUpperCase().replace("-", "_"), S = () => {
    N && N(v === "NONE" || v === "OFF" ? "BURN_IN" : v === "BURN_IN" ? "CAPTION" : "NONE");
  }, I = () => {
    switch (v) {
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
        className: `btn-vp-action keys-mode-btn mode-${v.toLowerCase().replace("_", "-")}`,
        onClick: S,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in / Soft Caption)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: I() })
        ]
      }
    ),
    p && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${f ? "active" : "inactive"}`,
        onClick: p,
        title: f ? "Hide Keystroke Ticks on Ruler" : "Show Keystroke Ticks on Ruler (Default: Off)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "3", fill: f ? "currentColor" : "none" }),
            /* @__PURE__ */ s.jsx("path", { d: "M3 12h3M18 12h3M12 3v3M12 18v3" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: f ? "RULER TICKS: ON" : "RULER TICKS: OFF" })
        ]
      }
    ),
    e !== null && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: "btn-vp-action",
        onClick: r,
        title: `Jump playhead to first media (${Et(i + e, c)})`,
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
        title: `Jump playhead to last media (${Et(i + t, c)})`,
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
const As = /* @__PURE__ */ new Map(), Zr = /* @__PURE__ */ new Map();
let _s = [], Nl = 0;
const th = 3, sx = 8e3, rx = 80;
function Lp() {
  setTimeout(lx, 0);
}
function lx() {
  var e;
  if (!(Nl >= th || _s.length === 0))
    for (_s = _s.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); Nl < th && _s.length > 0; ) {
      const t = _s.pop();
      !t || (e = t.signal) != null && e.aborted || (Nl++, ox(t));
    }
}
async function ox(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: i, displayId: c } = e;
  let d = !1, N = null;
  const f = () => {
    d || (d = !0, N && clearTimeout(N), Nl = Math.max(0, Nl - 1), Zr.delete(t), Lp());
  };
  N = setTimeout(() => {
    f(), i(null);
  }, sx);
  try {
    const p = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, v = await fetch(p, { signal: a });
    if (v.ok && v.status !== 204) {
      const S = await v.blob();
      if (S && S.size > 1500) {
        const I = URL.createObjectURL(S);
        if (As.size >= rx) {
          const D = As.keys().next().value, k = As.get(D);
          k && URL.revokeObjectURL(k), As.delete(D);
        }
        As.set(t, I), i(I);
        return;
      }
    }
    i(null);
  } catch {
    i(null);
  } finally {
    f();
  }
}
const nh = {
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
    return As.get(o);
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
    if (As.has(a))
      return Promise.resolve(As.get(a));
    if (Zr.has(a))
      return Zr.get(a);
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
        _s = _s.filter((N) => N.key !== a), Zr.delete(a), c(null);
      }, { once: !0 }), _s.push(d), Lp();
    });
    return Zr.set(a, i), i;
  },
  clear() {
    As.forEach((e) => URL.revokeObjectURL(e)), As.clear(), Zr.clear(), _s = [], Nl = 0;
  }
}, ax = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, es = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Dr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Fc({
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
  directorSegments: N = [],
  isAutoDirectorEnabled: f = !1,
  showDirectorCoverage: p = !1,
  stepperSegments: v = null
}) {
  const [S, I] = u.useState({}), D = u.useRef(S);
  D.current = S;
  const k = u.useMemo(() => ax(l), [l]), x = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: y, framesPerTile: b } = k, O = [], z = o + r, $ = z + l, W = z - y, se = $ + y, re = [...n].sort((K, _) => es(K) - es(_)), Z = [...c || [], ...d || []], E = (K, _) => !Z || Z.length === 0 ? !1 : Z.some((te) => {
      const ne = te.startEpochMs ?? te.startEpoch ?? te.start ?? 0, X = te.endEpochMs ?? te.endEpoch ?? te.end ?? 0;
      return X <= ne ? !1 : Math.max(K, ne) < Math.min(_, X);
    }), U = o + a, P = o + i;
    if (re.forEach((K, _) => {
      const te = Math.round(es(K)), ne = Math.round(Dr(K));
      if (ne <= te) return;
      const X = Math.max(te, U), J = Math.min(ne, P);
      if (J <= X) return;
      const $e = Math.max(X, W), Fe = Math.min(J, se);
      if (Fe <= $e) return;
      const Ee = Math.floor($e / y) * y;
      for (let Ye = Ee; Ye < Fe; Ye += y) {
        const Ie = Ye + y, Ce = Math.max(X, Ye), Qe = Math.min(J, Ie);
        Qe > Ce && !E(Ce, Qe) && O.push({
          key: `${e}_${t}_${Ce}_${Qe}_${b}`,
          sIdx: _,
          startEpoch: Ce,
          endEpoch: Qe,
          framesPerTile: b,
          displayId: t
        });
      }
    }), O.length > 20) {
      const K = o + r + l / 2;
      O.sort((_, te) => {
        const ne = Math.abs((_.startEpoch + _.endEpoch) / 2 - K), X = Math.abs((te.startEpoch + te.endEpoch) / 2 - K);
        return ne - X;
      }), O.length = 20, O.sort((_, te) => _.startEpoch - te.startEpoch);
    }
    return O;
  }, [n, o, e, t, r, l, k, a, i, d, c]);
  u.useEffect(() => {
    if (x.length === 0) return;
    let y = !0;
    const b = new AbortController(), O = [], z = {};
    let $ = !1;
    x.forEach((U) => {
      const P = nh.get(e, U.startEpoch, U.endEpoch, U.framesPerTile, t);
      P ? D.current[U.key] !== P && (z[U.key] = P, $ = !0) : O.push(U);
    });
    const W = new Set(x.map((U) => U.key)), se = D.current, re = {};
    let Z = !1;
    if (Object.keys(se).forEach((U) => {
      W.has(U) ? re[U] = se[U] : Z = !0;
    }), $ || Z) {
      const U = { ...re, ...z };
      D.current = U, I(U);
    }
    if (O.length === 0) return () => {
      y = !1;
    };
    const E = setTimeout(() => {
      O.forEach((U) => {
        nh.fetchTile(e, U.startEpoch, U.endEpoch, U.framesPerTile, b.signal, t).then((P) => {
          y && P && (D.current[U.key] = P, I((K) => ({ ...K, [U.key]: P })));
        });
      });
    }, 150);
    return () => {
      y = !1, clearTimeout(E), b.abort();
    };
  }, [x, e, t]);
  const g = (a - r) / l * 100, T = (i - r) / l * 100, w = u.useMemo(() => {
    if (x.length === 0 || !o || l <= 0) return [];
    const y = r, b = r + l;
    return x.map((O) => {
      const z = O.startEpoch - o, $ = O.endEpoch - o;
      if ($ <= y || z >= b) return null;
      const W = Math.max(y, z), se = Math.min(b, $);
      return {
        key: O.key,
        spriteUrl: S[O.key] || null,
        leftPct: (W - y) / l * 100,
        widthPct: (se - W) / l * 100
      };
    }).filter(Boolean);
  }, [x, o, r, l, S]), C = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const y = r, b = r + l;
    return n.map((O, z) => {
      const $ = Math.round(es(O)) - o, W = Math.round(Dr(O)) - o;
      if (W <= y || $ >= b) return null;
      const se = Math.max(y, $), re = Math.min(b, W);
      return {
        id: z,
        leftPct: (se - y) / l * 100,
        widthPct: (re - se) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), h = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const y = [...n].sort((E, U) => es(E) - es(U)), b = [], O = r, z = r + l, $ = o + O, W = o + z, se = o + (a !== void 0 ? a : O), re = o + (i !== void 0 ? i : z);
    if (y.length > 0) {
      const E = es(y[0]);
      E > $ && b.push({ startEpoch: $, endEpoch: E });
    } else l > 0 && b.push({ startEpoch: $, endEpoch: W });
    for (let E = 0; E < y.length - 1; E++) {
      const U = Dr(y[E]), P = es(y[E + 1]);
      P - U > 1e3 && b.push({ startEpoch: U, endEpoch: P });
    }
    if (y.length > 0) {
      const E = Dr(y[y.length - 1]);
      E < W && b.push({ startEpoch: E, endEpoch: W });
    }
    const Z = [];
    return c && c.length > 0 && c.forEach((E, U) => {
      const P = Math.max(E.startEpochMs ?? E.StartEpochMs, se), K = Math.min(E.endEpochMs ?? E.EndEpochMs, re);
      if (K > P && K > $ && P < W) {
        const _ = Math.max($, P), te = Math.min(W, K), ne = (te - o - (_ - o)) / l * 100;
        ne > 0 && Z.push({
          id: `global-${U}`,
          type: "global",
          startEpoch: _,
          endEpoch: te,
          leftPct: (_ - o - O) / l * 100,
          widthPct: ne,
          durationSec: Math.round((K - P) / 1e3)
        });
      }
    }), b.forEach((E, U) => {
      let P = [E];
      c && c.length > 0 && c.forEach((K) => {
        const _ = Math.max(K.startEpochMs ?? K.StartEpochMs, se), te = Math.min(K.endEpochMs ?? K.EndEpochMs, re);
        if (te <= _) return;
        const ne = [];
        P.forEach((X) => {
          te <= X.startEpoch || _ >= X.endEpoch ? ne.push(X) : (_ > X.startEpoch && ne.push({ startEpoch: X.startEpoch, endEpoch: _ }), te < X.endEpoch && ne.push({ startEpoch: te, endEpoch: X.endEpoch }));
        }), P = ne;
      }), P.forEach((K, _) => {
        if (K.endEpoch - K.startEpoch < 1e3 || K.endEpoch <= $ || K.startEpoch >= W) return;
        const te = Math.max($, K.startEpoch), ne = Math.min(W, K.endEpoch), X = (ne - o - (te - o)) / l * 100;
        X > 0 && Z.push({
          id: `station-${U}-${_}`,
          type: "station",
          startEpoch: te,
          endEpoch: ne,
          leftPct: (te - o - O) / l * 100,
          widthPct: X,
          durationSec: Math.round((K.endEpoch - K.startEpoch) / 1e3)
        });
      });
    }), Z;
  }, [n, c, o, r, l, a, i]), A = u.useMemo(() => {
    if (!p || !f || !N || N.length === 0) return [];
    const y = (t || "mon-0").toLowerCase(), b = r, O = r + l;
    return N.map((z, $) => {
      const W = (z.startEpochMs ?? z.StartEpochMs ?? 0) - o, se = (z.endEpochMs ?? z.EndEpochMs ?? 0) - o;
      if (se <= b || W >= O) return null;
      const re = Math.max(b, W), Z = Math.min(O, se), E = (re - b) / l * 100, U = (Z - re) / l * 100;
      if (U <= 0) return null;
      const K = (z.targetDisplayId || z.TargetDisplayId || "mon-0").toLowerCase() === y;
      return {
        id: `cov_${$}`,
        isFeatured: K,
        leftPct: E,
        widthPct: U
      };
    }).filter(Boolean);
  }, [p, f, N, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: h.map((y) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `gap-full-block ${y.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
        style: { left: `${y.leftPct}%`, width: `${y.widthPct}%` },
        title: y.type === "global" ? `Shared Gap: ${y.durationSec}s will be skipped` : `Station Gap: ${y.durationSec}s No-Signal`,
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
          y.widthPct > 5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${y.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: y.type === "global" ? `✂ SKIPPED (${y.durationSec}s)` : "NO SIGNAL" }) })
        ]
      },
      y.id
    )) }),
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: w.map((y) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `spritesheet-tile-block ${y.spriteUrl ? "is-loaded" : "is-loading"}`,
        style: {
          position: "absolute",
          left: `${y.leftPct}%`,
          width: `${y.widthPct}%`,
          height: "100%",
          backgroundImage: y.spriteUrl ? `url("${y.spriteUrl}")` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "opacity 0.25s ease"
        },
        children: !y.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
      },
      y.key
    )) }),
    A.map((y) => y.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${y.leftPct}%`, width: `${y.widthPct}%` },
        title: "Display Featured by Auto-Director"
      },
      y.id
    ) : /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-mask-dimmed",
        style: { left: `${y.leftPct}%`, width: `${y.widthPct}%` },
        title: "Display Off-Air (Masked by Auto-Director)"
      },
      y.id
    )),
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${v ? "has-stepper" : ""}`, children: C.map((y) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${y.leftPct}%`, width: `${y.widthPct}%` }
      },
      `bar_${y.id}`
    )) }),
    v && v.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: f ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      v.map((y, b) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${y.dispNum}`,
          style: { left: `${y.leftPct}%`, width: `${y.widthPct}%` },
          title: `Auto-Director: Screen ${y.dispNum} (${y.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: y.dispNum })
        },
        `stp_${b}`
      )),
      h && h.map((y) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-gap-block ${y.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${y.leftPct}%`, width: `${y.widthPct}%` },
          title: y.type === "global" ? `Global Gap: ${y.durationSec}s skipped in export (No switches)` : `Station Gap: ${y.durationSec}s No Signal (No switches)`,
          children: y.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "stepper-gap-badge", children: y.type === "global" ? "✂ SKIPPED" : "NO SIGNAL" })
        },
        `gap_stp_${y.id}`
      ))
    ] }) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    g > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, g)}%` } }),
    T < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, T)}%`, right: 0 } })
  ] });
}
function ix({
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
  onStationContextMenu: N,
  onDeselectStation: f,
  viewportStartMs: p = 0,
  viewportDurationMs: v = 36e5,
  inPointMs: S = 0,
  outPointMs: I = 36e5,
  baseEpochMs: D = 0,
  segments: k = [],
  recordingSegments: x = {},
  globalGaps: g = []
}) {
  const T = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", w = (e == null ? void 0 : e.id) || T, C = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", h = (e == null ? void 0 : e.hostname) || "", A = u.useMemo(() => {
    var P, K, _;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((P = e == null ? void 0 : e.displayTopology) == null ? void 0 : P.displays) || ((K = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : K.Displays) || ((_ = e == null ? void 0 : e.topology) == null ? void 0 : _.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), y = u.useMemo(() => {
    var K, _;
    const P = A.find((te) => te.isPrimary || te.IsPrimary);
    return ((P == null ? void 0 : P.displayId) || (P == null ? void 0 : P.DisplayId) || ((K = A[0]) == null ? void 0 : K.displayId) || ((_ = A[0]) == null ? void 0 : _.DisplayId) || "mon-0").toLowerCase();
  }, [A]), b = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), O = u.useMemo(() => (b == null ? void 0 : b.segments) || (b == null ? void 0 : b.Segments) || [], [b]), z = O && O.length > 0, $ = !!(A && A.length > 1), W = !!(t && $), se = u.useMemo(() => {
    let P = x[w] || x[T] || k || [];
    if (!P || P.length === 0) {
      const K = (w || "").toLowerCase(), _ = (T || "").toLowerCase();
      for (const [te, ne] of Object.entries(x || {})) {
        const X = te.toLowerCase();
        if (K && X === K || _ && X === _) {
          P = ne;
          break;
        }
      }
    }
    if ((!P || P.length === 0) && (P = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !P || P.length === 0)
      for (const K of A) {
        const _ = K.segments || K.Segments || [];
        if (_.length > 0) {
          P = _;
          break;
        }
      }
    return (P || []).filter((K) => Dr(K) - es(K) > 0);
  }, [x, k, w, T, e, A]), re = u.useMemo(() => {
    if (!D || v <= 0) return [];
    const P = [...se].sort((X, J) => es(X) - es(J)), K = [], _ = D + v;
    if (g && g.length > 0 && g.forEach((X) => {
      const J = X.startEpochMs ?? X.StartEpochMs ?? 0, $e = X.endEpochMs ?? X.EndEpochMs ?? 0;
      $e > J && K.push({ startEpoch: J, endEpoch: $e, type: "global" });
    }), P.length === 0)
      return K.push({ startEpoch: D, endEpoch: _, type: "station" }), K;
    const te = Math.round(es(P[0]));
    te - D > 2e3 && (K.some((J) => J.type === "global" && J.startEpoch <= D && J.endEpoch >= te) || K.push({ startEpoch: D, endEpoch: te, type: "station" }));
    for (let X = 0; X < P.length - 1; X++) {
      const J = Math.round(Dr(P[X])), $e = Math.round(es(P[X + 1]));
      $e - J > 2e3 && (K.some((Ee) => Ee.type === "global" && Ee.startEpoch <= J && Ee.endEpoch >= $e) || K.push({ startEpoch: J, endEpoch: $e, type: "station" }));
    }
    const ne = Math.round(Dr(P[P.length - 1]));
    return _ - ne > 2e3 && (K.some((J) => J.type === "global" && J.startEpoch <= ne && J.endEpoch >= _) || K.push({ startEpoch: ne, endEpoch: _, type: "station" })), K;
  }, [se, g, D, v]), Z = u.useMemo(() => {
    const P = D + S, K = D + I;
    return zg(O, re, g, P, K, y);
  }, [O, re, g, D, S, I, y]), E = u.useMemo(() => {
    if (!z || v <= 0) return null;
    const P = p, K = p + v;
    return Z.map((_, te) => {
      const ne = (_.startEpochMs ?? _.StartEpochMs ?? 0) - D, X = (_.endEpochMs ?? _.EndEpochMs ?? 0) - D;
      if (X <= P || ne >= K) return null;
      const J = Math.max(P, ne), $e = Math.min(K, X), Fe = (J - P) / v * 100, Ee = ($e - J) / v * 100;
      if (Ee <= 0) return null;
      const Ye = (_.targetDisplayId || _.TargetDisplayId || "mon-0").toLowerCase(), Ie = A.findIndex((ct) => (ct.displayId || ct.DisplayId || "").toLowerCase() === Ye);
      let Ce = Ie >= 0 ? Ie + 1 : null;
      if (!Ce) {
        const ct = Ye.match(/\d+/);
        Ce = ct ? parseInt(ct[0], 10) + 1 : 1;
      }
      const Qe = Ie >= 0 ? A[Ie].displayName || A[Ie].DisplayName || `Screen ${Ce}` : `Screen ${Ce}`;
      return {
        id: te,
        dispNum: Ce,
        dispLabel: Qe,
        leftPct: Fe,
        widthPct: Ee
      };
    }).filter(Boolean);
  }, [z, Z, A, D, p, v]), U = u.useCallback((P) => {
    const K = (P || "mon-0").toLowerCase();
    return o.some((_) => {
      if (_.stationId !== w) return !1;
      const te = (_.displayId || "mon-0").toLowerCase();
      return te === K || te === "auto" && (K === "mon-0" || K === "screen-0");
    });
  }, [o, w]);
  return W ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (P) => {
              P.stopPropagation(), n == null || n();
            },
            title: "Collapse station tracks",
            children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "6 9 12 15 18 9" }) })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: C, children: C }),
        l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
            onClick: (P) => {
              P.stopPropagation(), l(e.id);
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
            onClick: (P) => {
              P.stopPropagation(), l(e.id);
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
            onClick: (P) => {
              P.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: A.map((P, K) => {
      const _ = (P.displayId || P.DisplayId || `mon-${K}`).toLowerCase(), te = P.displayNumber || P.DisplayNumber || K + 1, ne = P.displayName || P.DisplayName || "", X = ne && !ne.toLowerCase().includes(T.toLowerCase()) ? ne : `Screen ${te}${P.isPrimary || K === 0 ? " (Main)" : ""}`, J = U(_);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${X} (${P.width || 1920}×${P.height || 1080})`, children: X }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${J ? "is-on-canvas" : ""}`,
                  onClick: ($e) => {
                    $e.stopPropagation(), a(e.id, _);
                  },
                  title: J ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: J ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Fc,
              {
                hostname: T,
                displayId: _,
                activeSegments: se,
                viewportStartMs: p,
                viewportDurationMs: v,
                baseEpochMs: D,
                inPointMs: S,
                outPointMs: I,
                globalGaps: g,
                directorSegments: Z,
                isAutoDirectorEnabled: r,
                gaps: re,
                showDirectorCoverage: $
              }
            )
          ]
        },
        `${e.id}-${_}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), $ && n && n();
      },
      onContextMenu: (P) => {
        N && (P.preventDefault(), P.stopPropagation(), N(P, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${$ ? "has-stepper" : "no-stepper"}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${C}${h ? ` (${h})` : ""} • Click to select${$ ? " / expand" : ""}`,
            children: [
              $ && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (P) => {
                    P.stopPropagation(), n == null || n();
                  },
                  title: "Expand station tracks",
                  children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: C, children: C }),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (P) => {
                    P.stopPropagation(), l(e.id);
                  },
                  title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
                  children: r ? "⚡ AUTO" : "✋ OFF"
                }
              ),
              f && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-track-deselect",
                  title: `Remove ${C} from project`,
                  onClick: (P) => {
                    P.stopPropagation(), f(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Fc,
          {
            hostname: T,
            displayId: y,
            activeSegments: se,
            viewportStartMs: p,
            viewportDurationMs: v,
            baseEpochMs: D,
            inPointMs: S,
            outPointMs: I,
            globalGaps: g,
            isAutoDirectorEnabled: r,
            gaps: re,
            stepperSegments: $ ? E : null
          }
        )
      ]
    }
  );
}
const Jr = /* @__PURE__ */ new Map(), Hl = /* @__PURE__ */ new Map();
function sh(e, t, n, r = 200) {
  return `${(e || "").toLowerCase()}_${Math.round(t)}_${Math.round(n)}_${r}`;
}
const Pi = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 200) {
    const l = sh(e, t, n, r);
    return Jr.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 200) {
    if (!e || n <= t) return null;
    const o = sh(e, t, n, l);
    if (Jr.has(o))
      return Jr.get(o);
    if (Hl.has(o))
      return Hl.get(o);
    const a = (async () => {
      try {
        const i = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(e)}&startEpoch=${Math.round(t)}&endEpoch=${Math.round(n)}&points=${l}`, c = await fetch(i, { signal: r });
        if (!c.ok) {
          if (c.status === 204) return null;
          throw new Error(`HTTP ${c.status}`);
        }
        const d = await c.json();
        if (Array.isArray(d) && d.length > 0)
          return Jr.set(o, d), d;
      } catch (i) {
        if (i.name !== "AbortError") {
          const c = new Array(l).fill(0.03);
          return Jr.set(o, c), c;
        }
      } finally {
        Hl.delete(o);
      }
      return null;
    })();
    return Hl.set(o, a), a;
  },
  /**
   * Clears cached waveforms (e.g. on project change)
   */
  clear() {
    Jr.clear(), Hl.clear();
  }
};
function cx(e, t = 100, n = 24, r = 1) {
  if (!e || !Array.isArray(e) || e.length === 0) {
    const f = n / 2;
    return `M 0,${f} L ${t},${f}`;
  }
  const l = e.length, o = n / 2, a = n / 2 - 1.5, i = t / Math.max(1, l - 1), c = Math.max(0, Math.min(3, Number(r) || 1));
  let d = "";
  for (let f = 0; f < l; f++) {
    const p = f * i, v = Math.min(1, Math.max(0.02, (e[f] || 0) * c)), S = o - v * a;
    d += f === 0 ? `M ${p.toFixed(2)},${S.toFixed(2)}` : ` L ${p.toFixed(2)},${S.toFixed(2)}`;
  }
  let N = "";
  for (let f = l - 1; f >= 0; f--) {
    const p = f * i, v = Math.min(1, Math.max(0.02, (e[f] || 0) * c)), S = o + v * a;
    N += ` L ${p.toFixed(2)},${S.toFixed(2)}`;
  }
  return `${d}${N} Z`;
}
const rh = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function ux({
  clip: e,
  lane: t,
  laneColor: n,
  isSelected: r,
  onSelect: l,
  onOpenMenu: o,
  onTrimDrag: a,
  vpStartEpoch: i,
  viewportDurationMs: c,
  timeMode: d,
  stationName: N
}) {
  const [f, p] = u.useState(() => Pi.get(e.sourceStationId, e.startEpochMs, e.endEpochMs) || null);
  u.useEffect(() => {
    let C = !0;
    const h = new AbortController(), A = Pi.get(e.sourceStationId, e.startEpochMs, e.endEpochMs);
    if (A) {
      p(A);
      return;
    }
    return Pi.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, h.signal, 180).then((y) => {
      C && y && p(y);
    }).catch(() => {
    }), () => {
      C = !1, h.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const v = e.startEpochMs, S = e.endEpochMs, I = (e.gain || 1) * (t.gain || 1), D = u.useMemo(() => cx(f, 100, 24, I), [f, I]), k = Math.max(i, v), x = Math.min(i + c, S), g = (k - i) / c * 100, T = (x - k) / c * 100;
  if (T <= 0) return null;
  const w = e.channelMode || t.channelMode || "both";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-clip-block ${t.isMuted ? "lane-muted" : ""} ${r ? "is-selected" : ""}`,
      style: {
        left: `${g}%`,
        width: `${T}%`,
        borderLeftColor: n
      },
      onClick: l,
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${N} [${w.toUpperCase()}] (${Et(v, d, { includeSeconds: !0 })} - ${Et(S, d, { includeSeconds: !0 })}) • Gain: ${Math.round(e.gain * 100)}%`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (C) => a(C, "start"),
            title: "Drag to trim Clip In-Point"
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
          "path",
          {
            d: D,
            fill: n,
            fillOpacity: "0.45",
            stroke: n,
            strokeWidth: "1.2",
            strokeOpacity: "0.85"
          }
        ) }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: N }),
          /* @__PURE__ */ s.jsx("span", { className: `clip-channel-tag mode-${w}`, children: w.toUpperCase() }),
          /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
            Math.round(e.gain * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-right",
            onMouseDown: (C) => a(C, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function dx({
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
  isAutoFollow: N = !1,
  timeMode: f = "LOCAL",
  onUpdateAudioPlan: p = null
}) {
  const v = u.useRef(null), [S, I] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [D, k] = u.useState(!1), [x, g] = u.useState(null), [T, w] = u.useState(1), [C, h] = u.useState([]), [A, y] = u.useState(null), [b, O] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const R = (V) => {
      V.detail && O(V.detail);
    };
    return window.addEventListener("itb-live-audio-level", R), () => window.removeEventListener("itb-live-audio-level", R);
  }, []);
  const z = u.useCallback(() => {
    I((R) => {
      const V = !R;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(V));
      } catch {
      }
      return V;
    });
  }, []), [$, W] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map((R, V) => {
        var ae;
        return {
          id: `clip_${V}_${R.startEpochMs || R.StartEpochMs}`,
          startEpochMs: R.startEpochMs ?? R.StartEpochMs ?? l,
          endEpochMs: R.endEpochMs ?? R.EndEpochMs ?? l + r,
          sourceStationId: R.sourceStationId ?? R.SourceStationId ?? (((ae = t[0]) == null ? void 0 : ae.id) || "station-0"),
          gain: R.gain ?? R.Gain ?? 1,
          channelMode: R.channelMode ?? R.ChannelMode ?? "both"
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
  ]), se = l + o, re = l + n, Z = re + r, E = u.useCallback((R) => {
    if (!p) return;
    const V = [];
    R.forEach((ae) => {
      ae.isMuted || D || ae.clips.forEach((oe) => {
        V.push({
          startEpochMs: oe.startEpochMs,
          endEpochMs: oe.endEpochMs,
          sourceStationId: oe.sourceStationId,
          gain: oe.gain * ae.gain,
          channelMode: oe.channelMode || ae.channelMode || "both"
        });
      });
    }), V.sort((ae, oe) => ae.startEpochMs - oe.startEpochMs), p({ segments: V });
  }, [p, D]);
  u.useEffect(() => {
    let R = null;
    for (const V of $)
      if (!(V.isMuted || D)) {
        for (const ae of V.clips)
          if (se >= ae.startEpochMs && se <= ae.endEpochMs) {
            const oe = t.find((Q) => Q.id === ae.sourceStationId);
            R = {
              stationId: ae.sourceStationId,
              stationName: oe ? oe.displayName || oe.hostname || oe.id : ae.sourceStationId,
              channelMode: ae.channelMode || V.channelMode || "both",
              gain: ae.gain * V.gain,
              isPlaying: b.isPlaying
            };
            break;
          }
        if (R) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: R }));
  }, [$, D, se, t, b.isPlaying]), u.useEffect(() => {
    const R = () => {
      C.length !== 0 && (W((oe) => {
        const Q = oe.map((B) => ({
          ...B,
          clips: B.clips.filter((H) => !C.includes(H.id))
        }));
        return E(Q), Q;
      }), h([]), g(null));
    }, V = (oe) => {
      if (oe.key === "Delete" || oe.key === "Backspace") {
        const Q = oe.target;
        if (Q.tagName === "INPUT" || Q.tagName === "TEXTAREA" || Q.isContentEditable) return;
        C.length > 0 && (oe.preventDefault(), R());
      }
    }, ae = () => R();
    return window.addEventListener("keydown", V), window.addEventListener("itb:studio-delete-selected", ae), () => {
      window.removeEventListener("keydown", V), window.removeEventListener("itb:studio-delete-selected", ae);
    };
  }, [C, E]);
  const U = u.useCallback(() => {
    W((R) => {
      const ae = `A${R.length + 1}`, oe = {
        id: ae,
        name: `Track ${ae}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, Q = [...R, oe];
      return E(Q), Q;
    });
  }, [E]), P = u.useCallback((R) => {
    W((V) => {
      if (V.length <= 1) return V;
      const ae = V.filter((oe) => oe.id !== R);
      return E(ae), ae;
    });
  }, [E]), K = u.useCallback((R) => {
    W((V) => {
      const ae = V.map((oe) => oe.id === R ? { ...oe, isMuted: !oe.isMuted } : oe);
      return E(ae), ae;
    });
  }, [E]), _ = u.useCallback((R) => {
    W((V) => {
      var Q;
      const ae = (Q = V.find((B) => B.id === R)) == null ? void 0 : Q.isSolo, oe = V.map((B) => ({
        ...B,
        isSolo: B.id === R ? !ae : !1,
        isMuted: B.id === R ? !1 : !ae
      }));
      return E(oe), oe;
    });
  }, [E]), te = u.useCallback((R) => {
    const V = ["both", "sys", "mic"];
    W((ae) => {
      const oe = ae.map((Q) => {
        if (Q.id !== R) return Q;
        const B = Q.channelMode || "both", H = V[(V.indexOf(B) + 1) % V.length];
        return {
          ...Q,
          channelMode: H,
          clips: Q.clips.map((ue) => ({ ...ue, channelMode: H }))
        };
      });
      return E(oe), oe;
    });
  }, [E]), ne = u.useCallback((R, V) => {
    const ae = Math.max(0, Math.min(2, Number(V)));
    W((oe) => {
      const Q = oe.map((B) => B.id === R ? { ...B, gain: ae } : B);
      return E(Q), Q;
    }), qd(ae);
  }, [E]), X = u.useCallback((R, V) => {
    V && W((ae) => {
      const oe = ae.map((Q) => {
        if (Q.id !== R) return Q;
        if (Q.clips.length === 0) {
          const B = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: V,
            gain: 1,
            channelMode: Q.channelMode || "both"
          };
          return { ...Q, clips: [B] };
        }
        return {
          ...Q,
          clips: Q.clips.map((B) => ({ ...B, sourceStationId: V }))
        };
      });
      return E(oe), oe;
    });
  }, [l, r, E]), J = u.useCallback((R, V = null, ae = null) => {
    var Me;
    const oe = V || ((Me = t[0]) == null ? void 0 : Me.id) || "station-0", Q = ae !== null ? ae : se, B = Math.min(r, 6e4), H = Q + B, ue = $.find((ze) => ze.id === R), ie = (ue == null ? void 0 : ue.channelMode) || "both", Ae = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(Q),
      endEpochMs: Math.round(H),
      sourceStationId: oe,
      gain: 1,
      channelMode: ie
    };
    W((ze) => {
      const xe = ze.map((Ge) => Ge.id === R ? {
        ...Ge,
        clips: [...Ge.clips, Ae].sort((He, wt) => He.startEpochMs - wt.startEpochMs)
      } : Ge);
      return E(xe), xe;
    });
  }, [$, se, r, t, E]), $e = u.useCallback((R, V = null) => {
    W((ae) => {
      const oe = ae.map((Q) => {
        if (R && Q.id !== R) return Q;
        const B = [];
        return Q.clips.forEach((H) => {
          (!V || H.id === V || C.includes(H.id)) && se > H.startEpochMs + 500 && se < H.endEpochMs - 500 ? (B.push({ ...H, endEpochMs: se }), B.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: se,
            endEpochMs: H.endEpochMs,
            sourceStationId: H.sourceStationId,
            gain: H.gain,
            channelMode: H.channelMode || Q.channelMode || "both"
          })) : B.push(H);
        }), { ...Q, clips: B };
      });
      return E(oe), oe;
    }), g(null);
  }, [se, C, E]), Fe = u.useCallback(() => {
    $e(null, null);
  }, [$e]), Ee = u.useCallback((R, V) => {
    W((ae) => {
      const oe = ae.map((Q) => Q.id !== R ? Q : { ...Q, clips: Q.clips.filter((B) => B.id !== V) });
      return E(oe), oe;
    }), g(null);
  }, [E]), Ye = u.useCallback((R, V, ae) => {
    W((oe) => {
      const Q = oe.map((B) => B.id !== R ? B : {
        ...B,
        clips: B.clips.map((H) => H.id === V ? { ...H, sourceStationId: ae } : H)
      });
      return E(Q), Q;
    }), g((oe) => oe ? { ...oe, stationId: ae } : null);
  }, [E]), Ie = u.useCallback((R, V, ae) => {
    const oe = Math.max(0, Math.min(2.5, Number(ae)));
    w(oe), W((Q) => {
      const B = Q.map((H) => H.id !== R ? H : {
        ...H,
        clips: H.clips.map((ue) => ue.id === V ? { ...ue, gain: oe } : ue)
      });
      return E(B), B;
    }), qd(oe);
  }, [E]), Ce = u.useCallback((R, V, ae, oe) => {
    R.preventDefault(), R.stopPropagation();
    const Q = R.clientX, B = $.find((ze) => ze.id === V), H = B == null ? void 0 : B.clips.find((ze) => ze.id === ae);
    if (!H) return;
    const ue = H.startEpochMs, ie = H.endEpochMs, Ae = (ze) => {
      var pt;
      const xe = ze.clientX - Q, Ge = (pt = v.current) == null ? void 0 : pt.querySelector(".audio-lane-timeline");
      if (!Ge) return;
      const He = Ge.getBoundingClientRect(), wt = xe / He.width * r;
      W((st) => st.map((Rt) => Rt.id !== V ? Rt : {
        ...Rt,
        clips: Rt.clips.map((rt) => {
          if (rt.id !== ae) return rt;
          if (oe === "start") {
            const Jt = Math.min(ie - 500, ue + wt);
            return { ...rt, startEpochMs: Math.round(Jt) };
          } else {
            const Jt = Math.max(ue + 500, ie + wt);
            return { ...rt, endEpochMs: Math.round(Jt) };
          }
        })
      }));
    }, Me = () => {
      window.removeEventListener("mousemove", Ae), window.removeEventListener("mouseup", Me), W((ze) => (E(ze), ze));
    };
    window.addEventListener("mousemove", Ae), window.addEventListener("mouseup", Me);
  }, [$, r, E]), Qe = (R, V, ae) => {
    R.preventDefault(), R.stopPropagation();
    const oe = 260, Q = 280, B = Math.max(16, Math.min(window.innerWidth - oe - 16, R.clientX - oe / 2));
    let H = R.clientY - Q - 12;
    H < 140 && (H = Math.min(window.innerHeight - Q - 16, R.clientY + 24)), w(ae.gain || 1), g({
      laneId: V,
      clipId: ae.id,
      s: ae.startEpochMs,
      e: ae.endEpochMs,
      x: B,
      y: H,
      stationId: ae.sourceStationId,
      gain: ae.gain || 1,
      channelMode: ae.channelMode || "both"
    });
  };
  u.useEffect(() => {
    if (!x) return;
    const R = () => g(null), V = (ae) => {
      ae.key === "Escape" && g(null);
    };
    return window.addEventListener("click", R), window.addEventListener("keydown", V), () => {
      window.removeEventListener("click", R), window.removeEventListener("keydown", V);
    };
  }, [x]);
  const ct = u.useMemo(() => $.reduce((R, V) => R + (V.isMuted ? 0 : V.clips.length), 0), [$]);
  return !t || t.length === 0 ? null : S ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: v, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: z,
            title: "Collapse Audio Master Bus",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          $.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: U,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-split-playhead",
            onClick: Fe,
            title: "Split clip at playhead (Ctrl+K / Razor Tool)",
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "master-vu-readout", children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: b.isPlaying ? `${b.db.toFixed(1)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "master-vu-bar-outer", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "master-vu-bar-inner",
              style: {
                width: `${Math.min(100, Math.max(0, b.rms * 120))}%`,
                background: b.db > -3 ? "#F43F5E" : b.db > -9 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${D ? "is-muted" : ""}`,
            onClick: () => k((R) => !R),
            title: D ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: D ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: $.map((R, V) => {
      const ae = rh[V % rh.length], oe = t.find((B) => {
        var H, ue;
        return B.id === (((H = R.clips[0]) == null ? void 0 : H.sourceStationId) || ((ue = t[0]) == null ? void 0 : ue.id));
      }), Q = A === R.id;
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${ae}26`, borderColor: `${ae}80`, color: ae }, children: R.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: R.name }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-lane-channel-mode mode-${R.channelMode || "both"}`,
              onClick: () => te(R.id),
              title: `Discrete Audio Channel: ${(R.channelMode || "both").toUpperCase()} (Click to toggle BOTH / SYS / MIC)`,
              children: (R.channelMode || "both") === "mic" ? "🎤 MIC" : (R.channelMode || "both") === "sys" ? "🔊 SYS" : "🎧 BOTH"
            }
          ),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-dropdown-wrapper", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (oe == null ? void 0 : oe.id) || "",
              onChange: (B) => X(R.id, B.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((B) => /* @__PURE__ */ s.jsx("option", { value: B.id, children: B.displayName || B.hostname || B.id }, B.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${R.isMuted ? "active" : ""}`,
                onClick: () => K(R.id),
                title: R.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${R.isSolo ? "active" : ""}`,
                onClick: () => _(R.id),
                title: R.isSolo ? "Unsolo Lane" : "Solo Lane",
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
                value: R.gain,
                onChange: (B) => ne(R.id, B.target.value),
                title: `Lane Gain: ${Math.round(R.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(R.gain * 100),
              "%"
            ] })
          ] }),
          $.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => P(R.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${Q ? "is-drag-over" : ""}`,
            onClick: () => h([]),
            onDragOver: (B) => {
              B.preventDefault(), B.dataTransfer.dropEffect = "copy", A !== R.id && y(R.id);
            },
            onDragLeave: () => {
              A === R.id && y(null);
            },
            onDrop: (B) => {
              B.preventDefault(), y(null);
              const H = B.dataTransfer.getData("text/station-id") || B.dataTransfer.getData("text/plain");
              if (H) {
                const ue = B.currentTarget.getBoundingClientRect(), ie = Math.max(0, Math.min(1, (B.clientX - ue.left) / ue.width)), Ae = Math.round(re + ie * r);
                J(R.id, H, Ae);
              }
            },
            onDoubleClick: (B) => {
              var Ae;
              const H = B.currentTarget.getBoundingClientRect(), ue = Math.max(0, Math.min(1, (B.clientX - H.left) / H.width)), ie = Math.round(re + ue * r);
              J(R.id, (Ae = t[0]) == null ? void 0 : Ae.id, ie);
            },
            children: [
              R.clips.map((B) => {
                const H = t.find((ie) => ie.id === B.sourceStationId), ue = H ? H.displayName || H.hostname || H.id : B.sourceStationId;
                return B.endEpochMs <= re || B.startEpochMs >= Z ? null : /* @__PURE__ */ s.jsx(
                  ux,
                  {
                    clip: B,
                    lane: R,
                    laneColor: ae,
                    isSelected: C.includes(B.id),
                    onSelect: (ie) => {
                      ie.stopPropagation(), ie.ctrlKey || ie.metaKey ? h(
                        (Ae) => Ae.includes(B.id) ? Ae.filter((Me) => Me !== B.id) : [...Ae, B.id]
                      ) : h([B.id]);
                    },
                    onOpenMenu: (ie) => Qe(ie, R.id, B),
                    onTrimDrag: (ie, Ae) => Ce(ie, R.id, B.id, Ae),
                    vpStartEpoch: re,
                    viewportDurationMs: r,
                    timeMode: f,
                    stationName: ue
                  },
                  B.id
                );
              }),
              R.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var B;
                    return J(R.id, (B = t[0]) == null ? void 0 : B.id, se);
                  },
                  title: "Click or drop workstation here to insert audio clip",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK OR DRAG WORKSTATION HERE (",
                    R.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, R.id);
    }) }),
    x && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "audio-clip-context-menu",
        style: { left: x.x, top: x.y },
        onClick: (R) => R.stopPropagation(),
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
            /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-close",
                onClick: () => g(null),
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE WORKSTATION" }),
            /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((R) => {
              const V = R.id === x.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${V ? "is-selected" : ""}`,
                  onClick: () => Ye(x.laneId, x.clipId, R.id),
                  children: R.displayName || R.hostname || R.id
                },
                R.id
              );
            }) })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME GAIN" }),
              /* @__PURE__ */ s.jsxs("span", { className: "gain-val", children: [
                Math.round(T * 100),
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
                value: T,
                onChange: (R) => Ie(x.laneId, x.clipId, R.target.value),
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
                onClick: () => $e(x.laneId, x.clipId),
                title: "Split clip at timeline playhead (Ctrl+K)",
                children: "✂️ SPLIT AT PLAYHEAD"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action delete",
                onClick: () => Ee(x.laneId, x.clipId),
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
      ref: v,
      onClick: z,
      title: "Audio Master Bus is Collapsed. Click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔇" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: ct > 0 ? `${ct} CLIPS ACTIVE` : "MUTED (0 ACTIVE)" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: b.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-timeline collapsed-bus-timeline", children: [
          /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS — CLICK TO EXPAND MULTI-TRACK LANES (A1, A2...) ]" })
        ] })
      ]
    }
  );
}
function hx({
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
  totalDurationMs: N = 36e5,
  playheadMs: f = 0,
  inPointMs: p = 0,
  outPointMs: v = 36e5,
  timeMode: S = "LOCAL"
}) {
  const I = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [D, k] = u.useState(null), [x, g] = u.useState(null);
  Co.useEffect(() => {
    if (x === null) return;
    const y = (O) => {
      O.key === "Escape" && g(null);
    }, b = (O) => {
      !O.target.closest(".kf-inspector-popover") && !O.target.closest(".kf-marker-diamond") && g(null);
    };
    return window.addEventListener("keydown", y), window.addEventListener("mousedown", b), () => {
      window.removeEventListener("keydown", y), window.removeEventListener("mousedown", b);
    };
  }, [x]);
  const T = d + f, w = d + i, C = w + c, h = (y) => {
    const b = y.currentTarget.getBoundingClientRect(), O = y.clientX - b.left, z = Math.max(0, Math.min(1, O / b.width)), $ = Math.round(w + z * c);
    r && r($);
  }, A = (y, b, O) => {
    if (y.button !== 0) return;
    y.stopPropagation(), y.preventDefault();
    const z = y.clientX, $ = O.timestampEpochMs, W = O.id || `kf_${b}_${$}`, se = y.currentTarget.closest(".track-surface");
    if (!se) return;
    let re = !1;
    k({
      idx: b,
      kfId: W,
      startClientX: z,
      initialEpoch: $,
      currentEpoch: $
    });
    const Z = (U) => {
      const P = U.clientX - z;
      Math.abs(P) > 3 && (re = !0);
      const K = se.getBoundingClientRect(), _ = P / K.width * c;
      let te = Math.round($ + _);
      te = Math.max(d, Math.min(d + N, te));
      const ne = d + p, X = d + v, J = 14 / K.width * c;
      Math.abs(te - T) <= J ? te = T : Math.abs(te - ne) <= J ? te = ne : Math.abs(te - X) <= J && (te = X), k(($e) => $e ? { ...$e, currentEpoch: te } : null);
    }, E = (U) => {
      window.removeEventListener("mousemove", Z), window.removeEventListener("mouseup", E), k(null);
      const P = se.getBoundingClientRect(), _ = (U.clientX - z) / P.width * c;
      let te = Math.round($ + _);
      te = Math.max(d, Math.min(d + N, te));
      const ne = d + p, X = d + v, J = 14 / P.width * c;
      Math.abs(te - T) <= J ? te = T : Math.abs(te - ne) <= J ? te = ne : Math.abs(te - X) <= J && (te = X), re ? (o && o(W, te), n && n(b, te)) : (n && n(b, $), g(($e) => $e === b ? null : b));
    };
    window.addEventListener("mousemove", Z), window.addEventListener("mouseup", E);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        I.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (y) => {
            y.stopPropagation(), r && r(T);
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
          I.map((y, b) => {
            const O = (D == null ? void 0 : D.idx) === b, z = O ? D.currentEpoch : y.timestampEpochMs;
            if (z < w - 5e4 || z > C + 5e4) return null;
            const $ = (z - w) / c * 100;
            if ($ < -2 || $ > 102) return null;
            const W = b === t, se = Et(z, S, { includeSeconds: !0 }), re = `${y.transitionType || "smooth"} (${y.transitionDurationSec ?? 0.5}s)`, Z = Math.max(0, (z - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${W ? "is-active" : ""} ${O ? "is-dragging" : ""}`,
                style: { left: `${$}%` },
                onMouseDown: (E) => A(E, b, y),
                onContextMenu: (E) => {
                  E.preventDefault(), E.stopPropagation(), I.length > 1 && l && l(b);
                },
                title: `Keyframe #${b + 1} at ${se} (+${Z}s) • ${re}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  O && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: se }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      Z,
                      "s"
                    ] })
                  ] }),
                  x === b && !O && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (E) => E.stopPropagation(),
                      onMouseDown: (E) => E.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            b + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: se }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (E) => {
                                E.stopPropagation(), g(null);
                              },
                              title: "Close",
                              children: "✕"
                            }
                          )
                        ] }),
                        b > 0 ? /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${(y.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(b, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${y.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(b, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${y.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(b, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          y.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((E) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(y.transitionDurationSec ?? 0.5) === E ? "is-active" : ""}`,
                                onClick: () => a == null ? void 0 : a(b, { transitionDurationSec: E }),
                                children: [
                                  E,
                                  "s"
                                ]
                              },
                              E
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (E) => {
                                E.stopPropagation(), l && l(b), g(null);
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
              `kf-${b}`
            );
          })
        ]
      }
    )
  ] });
}
function fx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: i
}) {
  const c = (y) => !r || r <= 0 ? "0%" : `${(y - n) / r * 100}%`, d = (o - n) / r * 100, N = (a - n) / r * 100, f = (l - n) / r * 100, p = f >= -0.2 && f <= 100.2, v = Math.max(0, Math.min(100, f)), S = Math.max(0, d), I = Math.min(100, N), D = Math.max(0, I - S), k = (y) => (b) => {
    b.preventDefault(), b.stopPropagation(), typeof i == "function" && i(y, b);
  }, x = d < 1.5, g = N > 98.5, T = d <= 0.2 && d >= -0.2, w = N >= 99.8 && N <= 100.2, C = f >= -0.2 && f < 3.5, h = f > 96.5 && f <= 100.2, A = u.useMemo(() => Et(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    D > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${S}%`, width: `${D}%` },
        onMouseDown: k("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${x ? "flipped" : ""} ${T ? "at-edge" : ""}`,
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
        className: `marker out-marker ${g ? "flipped" : ""} ${w ? "at-edge" : ""}`,
        style: { left: c(a) },
        onMouseDown: k("out"),
        title: "Drag OUT Point",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "handle-badge", children: "OUT" }),
          /* @__PURE__ */ s.jsx("div", { className: "marker-core-line" })
        ]
      }
    ),
    p && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "playhead-needle",
        style: { left: `${v}%` },
        onMouseDown: k("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${C ? "edge-left" : ""} ${h ? "edge-right" : ""}`, children: A }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const px = Co.memo(fx);
function mx({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const f = (p) => {
      p.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, l]), !e) return null;
  const a = 210, i = 150, c = Math.min(e.x, window.innerWidth - a - 12), d = Math.min(e.y, window.innerHeight - i - 12), N = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: d, left: c },
      onClick: (f) => f.stopPropagation(),
      onContextMenu: (f) => f.preventDefault(),
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
  return Gs.createPortal(N, document.body);
}
function gx({
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
const xx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function yx({
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
    const N = new AbortController();
    c(!0);
    const f = setTimeout(async () => {
      try {
        const p = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, v = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
          signal: N.signal
        });
        if (v.ok) {
          const S = await v.json();
          a(S), d.current && d.current(S);
        }
      } catch (p) {
        p.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", p);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(f), N.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: i, formatEstimateSize: xx };
}
function vx({
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
  getMsFromClientX: N,
  minimapRef: f
}) {
  const [p, v] = u.useState(null), [S, I] = u.useState(null), D = (k, x) => {
    v(k), I({
      target: k,
      startX: x.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!p) return;
    const k = e * 0.015, x = (T) => {
      if (p === "minimap-viewport" && (f != null && f.current)) {
        const C = f.current.getBoundingClientRect(), A = Math.max(0, Math.min(T.clientX - C.left, C.width)) / C.width * t, y = Math.max(0, Math.min(A - e / 2, t - e));
        d(y);
        return;
      }
      const w = N(T.clientX);
      if (p === "playhead") {
        let C = w;
        Math.abs(C - l) <= k ? C = l : Math.abs(C - a) <= k && (C = a), r(Math.max(0, Math.min(t, C)));
      } else if (p === "in") {
        const C = a - 1e3;
        o(Math.max(0, Math.min(w, C)));
      } else if (p === "out") {
        const C = l + 1e3;
        i(Math.min(t, Math.max(w, C)));
      } else if (p === "range" && S) {
        const C = w - N(S.startX), h = S.initialOut - S.initialIn;
        let A = S.initialIn + C, y = S.initialOut + C;
        A < 0 ? (A = 0, y = h) : y > t && (y = t, A = t - h), o(A), i(y);
      }
    }, g = () => {
      v(null), I(null);
    };
    return window.addEventListener("mousemove", x), window.addEventListener("mouseup", g), () => {
      window.removeEventListener("mousemove", x), window.removeEventListener("mouseup", g);
    };
  }, [
    p,
    S,
    N,
    l,
    a,
    n,
    t,
    e,
    r,
    o,
    i,
    d,
    f
  ]), { draggingTarget: p, handleStartDrag: D };
}
const er = 4;
function Op({
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
  zoomLevel: N = 1,
  onZoomChange: f,
  onZoomReset: p,
  playheadMs: v = 0,
  setPlayheadMs: S,
  inPointMs: I = 0,
  setInPointMs: D,
  outPointMs: k = 36e5,
  setOutPointMs: x,
  onExport: g,
  recordingSegments: T = {},
  movieBoundaries: w,
  viewportStartMs: C = 0,
  onViewportStartChange: h,
  onEstimateLoaded: A,
  onFitRange: y,
  onJumpViewportTo: b,
  keystrokeMode: O = "BURN_IN",
  onChangeKeystrokeMode: z,
  keystrokes: $ = [],
  showKeystrokes: W = !1,
  showRulerKeystrokes: se = !1,
  onToggleRulerKeystrokes: re,
  _onSplitDirectorSegment: Z,
  _onChangeDirectorSegmentDisplay: E,
  _onResetDirectorSegmentToAuto: U,
  audioRoutingPlan: P,
  onSplitAudioSegment: K,
  onChangeAudioSegmentStation: _,
  onChangeAudioSegmentGain: te,
  onFollowVisualFeed: ne,
  isAutoFollowAudio: X,
  canvasLayoutTimeline: J,
  activeKfIndex: $e = 0,
  onSelectKeyframe: Fe,
  onAddKeyframeAtEpoch: Ee,
  onDeleteKeyframe: Ye,
  onUpdateKeyframeEpoch: Ie,
  onToggleDisplayOnCanvas: Ce,
  onUpdateAudioPlan: Qe
}) {
  var Le, Re, Je, dt, Tt, ee, me, ve;
  const [ct, R] = u.useState(null), [V, ae] = u.useState(0), [oe, Q] = u.useState(null), [B, H] = u.useState(!0), ue = (q) => {
    var _e, et, Ve;
    return ((q == null ? void 0 : q.displays) || (q == null ? void 0 : q.Displays) || ((_e = q == null ? void 0 : q.displayTopology) == null ? void 0 : _e.displays) || ((et = q == null ? void 0 : q.DisplayTopology) == null ? void 0 : et.Displays) || ((Ve = q == null ? void 0 : q.topology) == null ? void 0 : Ve.displays) || []).length;
  }, [ie, Ae] = u.useState(() => {
    var q;
    return e.length === 1 && ue(e[0]) > 1 ? (q = e[0]) == null ? void 0 : q.id : null;
  });
  u.useEffect(() => {
    var q;
    if (e.length === 1 && !ie && ((q = e[0]) != null && q.id) && ue(e[0]) > 1)
      Ae(e[0].id);
    else if (ie) {
      const Oe = e.find((_e) => _e.id === ie);
      (!Oe || ue(Oe) <= 1) && Ae(null);
    }
  }, [e, ie]);
  const Me = u.useRef(null), ze = u.useRef(null), xe = d / Math.max(1, N), Ge = Math.ceil(e.length / er) || 1, He = u.useMemo(() => {
    const q = V * er;
    return e.slice(q, q + er);
  }, [e, V]);
  u.useEffect(() => {
    if (!t && !ie) return;
    const q = ie || t, Oe = e.findIndex((_e) => _e.id === q);
    if (Oe !== -1) {
      const _e = Math.floor(Oe / er);
      _e !== V && ae(_e);
    }
  }, [t, ie, e, V]);
  const wt = ((Le = J == null ? void 0 : J.keyframes) == null ? void 0 : Le[$e]) || ((Re = J == null ? void 0 : J.keyframes) == null ? void 0 : Re[0]), pt = u.useMemo(() => {
    var q;
    return ((q = wt == null ? void 0 : wt.layout) == null ? void 0 : q.placements) || [];
  }, [wt]), st = u.useMemo(() => e.find((q) => q.id === t) || null, [e, t]), Rt = (w == null ? void 0 : w.globalFirstMs) ?? null, rt = (w == null ? void 0 : w.globalLastMs) ?? null, Jt = u.useMemo(() => (I > 500 || k < d - 500) && k - I >= 1e3, [I, k, d]), gn = u.useMemo(() => e.map((q) => q.id).sort().join(","), [e]), { estimateData: Lt, isEstimating: Cn, formatEstimateSize: gt } = yx({
    stationIdsKey: gn,
    inPointMs: I,
    outPointMs: k,
    baseEpochMs: i,
    onEstimateLoaded: A
  }), mt = u.useCallback((q) => {
    if (!Me.current) return C;
    const Oe = Me.current.getBoundingClientRect(), _e = Oe.left + 200, et = Oe.width - 200 - 58;
    if (et <= 0) return C;
    const Ve = Math.max(0, Math.min(q - _e, et));
    return Math.round(C + Ve / et * xe);
  }, [C, xe]), { draggingTarget: qe, handleStartDrag: Xe } = vx({
    viewportDurationMs: xe,
    totalDurationMs: d,
    playheadMs: v,
    setPlayheadMs: S,
    inPointMs: I,
    setInPointMs: D,
    outPointMs: k,
    setOutPointMs: x,
    viewportStartMs: C,
    setViewportStartMs: h,
    getMsFromClientX: mt,
    minimapRef: ze
  }), Ot = u.useRef(N);
  Ot.current = N;
  const Bt = u.useRef(C);
  Bt.current = C;
  const cn = u.useRef(d);
  cn.current = d;
  const Sn = u.useRef(v);
  Sn.current = v, u.useEffect(() => {
    const q = Me.current;
    if (!q) return;
    const Oe = (_e) => {
      _e.preventDefault(), _e.stopPropagation();
      const et = _e.ctrlKey || _e.shiftKey, Ve = Ot.current, ht = Bt.current, xt = cn.current, At = Sn.current;
      if (et) {
        const Vt = Math.abs(_e.deltaX) > Math.abs(_e.deltaY) ? _e.deltaX : _e.deltaY;
        if (Vt === 0) return;
        const un = xt / Math.max(1, Ve), Dt = Math.max(0, xt - un), bt = un * 0.08 * (Vt > 0 ? 1 : -1);
        h == null || h(Math.max(0, Math.min(Dt, ht + bt)));
      } else {
        if (_e.deltaY === 0) return;
        const un = _e.deltaY < 0 ? 1.25 : 0.8, Dt = Math.max(32, xt / 2e3), bt = q.getBoundingClientRect(), ln = bt.left + 200, Ut = bt.width - 200 - 58;
        let jt = 0.5;
        if (Ut > 0)
          if (_e.clientX >= ln && _e.clientX <= bt.right - 58)
            jt = Math.max(0, Math.min(1, (_e.clientX - ln) / Ut));
          else {
            const Mt = xt / Math.max(1, Ve), $t = (At - ht) / Mt;
            jt = $t >= 0 && $t <= 1 ? $t : 0.5;
          }
        const Nn = Math.max(1, Math.min(Dt, Math.round(Ve * un * 100) / 100));
        if (Nn === Ve) return;
        const gs = xt / Ve, Ls = xt / Nn, bn = ht + jt * gs - jt * Ls, Ss = Math.max(0, xt - Ls);
        f == null || f(Nn), h == null || h(Math.max(0, Math.min(Ss, bn)));
      }
    };
    return q.addEventListener("wheel", Oe, { passive: !1, capture: !0 }), () => q.removeEventListener("wheel", Oe, { capture: !0 });
  }, [f, h]);
  const os = e.length > 0 && Math.abs(k - I) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Me,
      className: "timeline-board-root",
      onContextMenu: (q) => {
        var _e;
        q.preventDefault();
        const Oe = (_e = Me.current) == null ? void 0 : _e.getBoundingClientRect();
        !Oe || q.clientX - Oe.left < 200 || q.clientX > Oe.right - 58 || Q({ x: q.clientX, y: q.clientY, targetMs: Math.max(0, Math.min(d, mt(q.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            ex,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: I,
              setInPointMs: D,
              outPointMs: k,
              setOutPointMs: x
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                tx,
                {
                  minimapRef: ze,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: C,
                  viewportDurationMs: xe,
                  zoomLevel: N,
                  inPointMs: I,
                  outPointMs: k,
                  playheadMs: v,
                  onStartDragMinimap: Xe
                }
              ),
              /* @__PURE__ */ s.jsx(
                nx,
                {
                  earliestMediaMs: Rt,
                  latestMediaMs: rt,
                  hasActiveCut: Jt,
                  onJumpToFirst: () => {
                    Rt !== null && (S == null || S(Rt), b == null || b(Rt, "start"));
                  },
                  onJumpToLast: () => {
                    rt !== null && (S == null || S(rt), b == null || b(rt, "end"));
                  },
                  onContextualFit: () => {
                    Jt ? y == null || y(I, k) : Rt !== null && rt !== null && rt > Rt ? y == null || y(Rt, rt) : p == null || p();
                  },
                  onResetZoom: p,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: O,
                  onChangeKeystrokeMode: z,
                  showRulerKeystrokes: se,
                  onToggleRulerKeystrokes: re
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              qg,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: C,
                viewportDurationMs: xe,
                totalDurationMs: d,
                hoverMs: ct,
                onHoverChange: R,
                onSeek: (q) => S == null ? void 0 : S(q),
                inPointMs: I,
                outPointMs: k,
                earliestMediaMs: Rt,
                movieBoundaries: w,
                stationHostname: (st == null ? void 0 : st.hostname) || (st == null ? void 0 : st.id) || (st == null ? void 0 : st.name),
                activeStationName: (st == null ? void 0 : st.displayName) || (st == null ? void 0 : st.hostname) || (st == null ? void 0 : st.name),
                showKeystrokes: !!(se ?? W),
                keystrokes: $
              }
            ) })
          ] })
        ] }),
        Ge > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: V === 0,
              onClick: () => ae((q) => Math.max(0, q - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            V * er + 1,
            "–",
            Math.min(e.length, (V + 1) * er),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: V >= Ge - 1,
              onClick: () => ae((q) => Math.min(Ge - 1, q + 1)),
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
            onMouseMove: (q) => {
              if (qe || !Me.current) return;
              const Oe = Me.current.getBoundingClientRect();
              q.clientX >= Oe.left + 200 && q.clientX <= Oe.right - 58 ? R(mt(q.clientX)) : R(null);
            },
            onMouseLeave: () => !qe && R(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => H((q) => !q), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: B ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  B && Ge > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: V === 0,
                        onClick: (q) => {
                          q.stopPropagation(), ae((Oe) => Math.max(0, Oe - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      V + 1,
                      "/",
                      Ge,
                      " (",
                      V * er + 1,
                      "–",
                      Math.min(e.length, (V + 1) * er),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: V >= Ge - 1,
                        onClick: (q) => {
                          q.stopPropagation(), ae((Oe) => Math.min(Ge - 1, Oe + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !B && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => H(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && /* @__PURE__ */ s.jsx(
                    Fc,
                    {
                      hostname: ((Je = e[0]) == null ? void 0 : Je.hostname) || ((dt = e[0]) == null ? void 0 : dt.id),
                      displayId: "mon-0",
                      activeSegments: T[(Tt = e[0]) == null ? void 0 : Tt.id] || T[(ee = e[0]) == null ? void 0 : ee.hostname] || ((me = e[0]) == null ? void 0 : me.segments) || [],
                      viewportStartMs: C,
                      viewportDurationMs: xe,
                      baseEpochMs: i,
                      inPointMs: I,
                      outPointMs: k,
                      globalGaps: (Lt == null ? void 0 : Lt.removedGlobalGaps) || [],
                      isAutoDirectorEnabled: !1
                    }
                  ) })
                ] }),
                B && (e.length > 0 ? He.map((q) => {
                  const Oe = !!(t && q.id === t), _e = ie === q.id, et = o ? o[q.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    ix,
                    {
                      station: q,
                      isExpanded: _e && ue(q) > 1,
                      onToggleExpand: () => {
                        ue(q) > 1 && Ae((Ve) => Ve === q.id ? null : q.id);
                      },
                      isAutoDirectorEnabled: et,
                      onToggleAutoDirector: a,
                      canvasPlacements: pt,
                      onToggleDisplayOnCanvas: Ce,
                      directorPlan: q.directorPlan,
                      isActive: Oe,
                      onSelect: () => n == null ? void 0 : n(q.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: C,
                      viewportDurationMs: xe,
                      inPointMs: I,
                      outPointMs: k,
                      baseEpochMs: i,
                      segments: T[q.id] || T[q.hostname] || q.segments || [],
                      recordingSegments: T,
                      globalGaps: (Lt == null ? void 0 : Lt.removedGlobalGaps) || []
                    },
                    q.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  dx,
                  {
                    audioPlan: P,
                    stations: e,
                    viewportStartMs: C,
                    viewportDurationMs: xe,
                    baseEpochMs: i,
                    playheadMs: v,
                    onSplitSegment: K,
                    onChangeSegmentStation: _,
                    onChangeSegmentGain: te,
                    onFollowVisualFeed: ne,
                    isAutoFollow: X,
                    timeMode: c,
                    onUpdateAudioPlan: Qe
                  }
                ),
                ((ve = J == null ? void 0 : J.keyframes) == null ? void 0 : ve.length) > 0 && /* @__PURE__ */ s.jsx(
                  hx,
                  {
                    canvasLayoutTimeline: J,
                    activeKfIndex: $e,
                    onSelectKeyframe: Fe,
                    onAddKeyframeAtEpoch: Ee,
                    onDeleteKeyframe: Ye,
                    onUpdateKeyframeEpoch: Ie,
                    viewportStartMs: C,
                    viewportDurationMs: xe,
                    baseEpochMs: i,
                    totalDurationMs: d,
                    playheadMs: v,
                    inPointMs: I,
                    outPointMs: k,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                gx,
                {
                  isRangeValid: os,
                  onExport: g,
                  isEstimating: Cn,
                  estimateData: Lt,
                  formatEstimateSize: gt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          px,
          {
            baseEpochMs: i,
            timeMode: c,
            viewportStartMs: C,
            viewportDurationMs: xe,
            playheadMs: v,
            inPointMs: I,
            outPointMs: k,
            onStartDrag: Xe
          }
        ),
        /* @__PURE__ */ s.jsx(
          mx,
          {
            contextMenu: oe,
            baseEpochMs: i,
            timeMode: c,
            onAction: (q) => {
              oe && (q === "playhead" ? S == null || S(oe.targetMs) : q === "in" ? D == null || D(Math.max(0, Math.min(oe.targetMs, k - 1e3))) : q === "out" && (x == null || x(Math.min(d, Math.max(oe.targetMs, I + 1e3)))), Q(null));
            },
            onClose: () => Q(null)
          }
        )
      ]
    }
  );
}
function Nx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function kx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function wx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function jx({
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
  filterMode: N,
  onFilterModeChange: f,
  filteredCount: p,
  selectedInTabCount: v,
  unselectedInTabCount: S,
  activeTabName: I,
  onSelectAllInScope: D,
  onClearInScope: k,
  viewMode: x = "grid",
  onViewModeChange: g,
  isDrawerMode: T = !1
}) {
  const [w, C] = u.useState(!1), h = N !== "all", A = !I || I.toLowerCase() === "all", y = A ? "Select All" : `Select ${I}`, b = A ? "Clear All" : `Clear ${I}`;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-filter-bar-root ${T ? "is-drawer-compact" : ""}`, children: [
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
      T && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${w ? "open" : ""} ${h ? "has-filter" : ""}`,
          onClick: () => C(!w),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            h && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !T && g && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${x === "grid" ? "active" : ""}`,
            onClick: () => g("grid"),
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
            className: `btn-view-mode ${x === "table" ? "active" : ""}`,
            onClick: () => g("table"),
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
    l.length > 1 && (T ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (O) => a(O.target.value),
          children: l.map((O) => {
            const z = O.id === "all" ? c.map((W) => W.id) : O.stationIds || [], $ = z.filter((W) => d.includes(W)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: O.id, children: [
              O.name,
              " (",
              $,
              "/",
              z.length,
              ")"
            ] }, O.id);
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
        i && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((O) => {
        const z = o === O.id, $ = O.id === "all" ? c.map((re) => re.id) : O.stationIds || [], W = $.length, se = $.filter((re) => d.includes(re)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${z ? "active" : ""}`,
            onClick: () => a(O.id),
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
    (!T || w) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${T ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${N === "all" ? "active" : ""}`,
            onClick: () => f("all"),
            children: [
              "All (",
              p,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${N === "selected" ? "active" : ""}`,
            onClick: () => f("selected"),
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
            className: `filter-pill ${N === "unselected" ? "active" : ""}`,
            onClick: () => f("unselected"),
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
            onClick: () => f("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${N === "audio" ? "active" : ""}`,
            onClick: () => f("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !T && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: D, children: [
          "+ ",
          y
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: k, children: [
          "✕ ",
          b
        ] })
      ] })
    ] })
  ] });
}
function Ex({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: a = "table"
}) {
  if (r === 0) return null;
  const i = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = a === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], N = t <= 1, f = (p) => {
    if (p === n) return !0;
    const v = Math.min(n, r), S = Math.min(p, r), I = Math.ceil(r / n), D = Math.ceil(r / p);
    return v !== S || I !== D;
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `hub-pagination-bar ${N ? "is-single-page-mode" : ""}`, children: [
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((p) => {
        const v = n === p, S = !f(p);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${v ? "active" : ""} ${S ? "redundant-disabled" : ""}`,
            disabled: S,
            onClick: () => o(p),
            title: S ? `All stations already fit on screen (Total: ${r})` : `Show ${p} per page`,
            children: p
          },
          p
        );
      }) })
    ] })
  ] });
}
function Cx({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, a] = u.useState(!1), i = u.useRef(null);
  u.useEffect(() => {
    const p = (v) => {
      i.current && !i.current.contains(v.target) && a(!1);
    };
    return o && document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [o]);
  const c = u.useMemo(() => {
    const p = new Map(t.map((v) => [v.id, v]));
    return e.map((v) => p.get(v) || { id: v, hostname: `Station ${v}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = c.slice(0, l), N = c.slice(l), f = N.length > 0;
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
      d.map((p) => {
        const v = p.displayName || p.hostname || p.name || p.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: v, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: v }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (S) => {
                S.stopPropagation(), n(p.id);
              },
              title: `Remove ${v}`,
              children: "✕"
            }
          )
        ] }, p.id);
      }),
      f && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-container", ref: i, children: [
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: N.map((p) => {
            const v = p.displayName || p.hostname || p.name || p.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: v, children: v }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(p.id),
                  title: `Remove ${v}`,
                  children: "✕"
                }
              )
            ] }, p.id);
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
const Dp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function lh(e, t, n = Dp) {
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
function Sx(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function bx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function Mx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Dp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, N = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? bx(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const h = lh(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: a,
      audioChannels: i,
      resolution: c,
      fps: d,
      fileSize: N,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: h,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const f = l, p = l + o, v = [];
  for (const h of t) {
    const A = Math.max(h.startEpoch, f), y = Math.min(h.endEpoch, p);
    y > A && v.push({ startEpoch: A, endEpoch: y });
  }
  v.sort((h, A) => h.startEpoch - A.endEpoch);
  const S = [];
  for (const h of v)
    if (S.length === 0)
      S.push({ ...h });
    else {
      const A = S[S.length - 1];
      h.startEpoch <= A.endEpoch + 1e3 ? A.endEpoch = Math.max(A.endEpoch, h.endEpoch) : S.push({ ...h });
    }
  let I = 0;
  for (const h of S)
    I += h.endEpoch - h.startEpoch;
  const D = o > 0 ? I / o * 100 : 0, k = D > 0 && D < 1 ? Number(D.toFixed(1)) : Math.min(100, Math.round(D)), x = [];
  let g = f, T = 0;
  for (const h of S) {
    if (h.startEpoch > g + 2e3) {
      const b = (h.startEpoch - g) / o * 100, O = (g - f) / o * 100;
      x.push({
        type: "gap",
        startPct: Math.max(0, O),
        widthPct: Math.min(100, b)
      }), T++;
    }
    const A = (h.endEpoch - h.startEpoch) / o * 100, y = (h.startEpoch - f) / o * 100;
    x.push({
      type: "rec",
      startPct: Math.max(0, y),
      widthPct: Math.min(100, A)
    }), g = h.endEpoch;
  }
  if (g < p - 2e3) {
    const h = (p - g) / o * 100, A = (g - f) / o * 100;
    x.push({
      type: "gap",
      startPct: Math.max(0, A),
      widthPct: Math.min(100, h)
    }), T++;
  }
  const w = T > 0 || k < 100, C = lh(k, w, r);
  return {
    coveragePct: k,
    recordedDuration: Sx(I),
    totalRecordedMs: I,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: N,
    hasGaps: w,
    gapsCount: T,
    trafficStatus: C,
    segments: x.length > 0 ? x : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const Ix = Object.freeze([]), Tx = 12;
function Ax({
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
  onApply: N,
  onOpenRangeModal: f,
  systemTabs: p = Ix,
  recordingSegments: v = {},
  baseEpochMs: S = 0,
  durationMs: I = 0
}) {
  const [D, k] = u.useState([]), [x, g] = u.useState("all"), [T, w] = u.useState(""), [C, h] = u.useState(!0), [A, y] = u.useState("all"), [b, O] = u.useState(null), [z, $] = u.useState(!1), [W, se] = u.useState(15), [re, Z] = u.useState(8), [E, U] = u.useState(1), P = u.useRef(!1), K = u.useRef(null), _ = c && r.length === 0, te = r.length === 0 && !c;
  let ne = "is-closed";
  i || te || _ ? ne = "is-full-width" : e && (ne = "is-open"), u.useLayoutEffect(() => {
    const H = () => {
      if (!K.current) return;
      const ie = K.current.clientHeight;
      if (ie <= 0) return;
      const Ae = K.current.querySelector(".station-row, .hub-table-row"), Me = Ae ? Ae.offsetHeight : 40;
      if (Me > 0) {
        const xe = Math.floor(ie / Me) - 2, He = [5, 10, 15, 20, 25, 30].filter((wt) => wt <= xe).pop() || 5;
        se(He);
      }
      const ze = K.current.clientWidth;
      if (ze > 0) {
        const He = Math.max(1, Math.floor((ze + 12) / 252)), pt = Math.max(1, Math.floor((ie + 12) / (175 + 12))), st = Math.max(He * pt, He);
        Z(st);
      }
    };
    H(), window.addEventListener("resize", H);
    const ue = new ResizeObserver(H);
    return K.current && ue.observe(K.current), () => {
      window.removeEventListener("resize", H), ue.disconnect();
    };
  }, [b, r.length]), u.useEffect(() => {
    if (p && p.length > 0) {
      k(p);
      return;
    }
    if (P.current || !e && !i) return;
    P.current = !0;
    let H = !0;
    return (async () => {
      $(!0);
      try {
        const ie = await fetch("/api/v1/dashboard/tabs");
        if (ie.ok && H) {
          const Ae = await ie.json();
          Array.isArray(Ae) && k(Ae);
        }
      } catch (ie) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", ie);
      } finally {
        H && $(!1);
      }
    })(), () => {
      H = !1;
    };
  }, [e, i, p]);
  const X = u.useMemo(() => {
    const H = D.length > 0 ? D : p;
    if (H && H.length > 0) {
      const ue = H.map((ie) => {
        const Ae = ie.hostnames || ie.assignedHostnames || ie.stations || ie.stationIds || [], Me = r.filter((ze) => {
          const xe = (ze.hostname || ze.name || "").trim().toLowerCase();
          return Ae.some((Ge) => typeof Ge == "string" ? Ge.trim().toLowerCase() === xe || xe.includes(Ge.trim().toLowerCase()) : (Ge.hostname || Ge.name || "").trim().toLowerCase() === xe);
        }).map((ze) => ze.id);
        return {
          id: String(ie.id || ie.tabId || ie.name),
          name: ie.name || "Tab",
          stationIds: Me
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((ie) => ie.id) },
        ...ue.filter((ie) => ie.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((ue) => ue.id) }];
  }, [D, p, r]), J = u.useMemo(() => X.find((H) => H.id === x) || X[0], [X, x]), $e = u.useMemo(() => !J || J.id === "all" ? r.map((H) => H.id) : J.stationIds || [], [J, r]), Fe = u.useMemo(() => !v || Object.keys(v).length === 0 ? r.filter((H) => H.isLoaded || H.segments && H.segments.length > 0).length : r.filter((H) => v[H.id] !== void 0 || H.isLoaded).length, [r, v]), Ee = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && Fe < r.length && Object.keys(v).length > 0), [d, c, r.length, Fe, v]), Ye = u.useMemo(() => {
    const H = /* @__PURE__ */ new Map(), ue = { baseEpochMs: S, durationMs: I };
    for (const ie of r) {
      const Me = !(v && v[ie.id] !== void 0 || ie.isLoaded === !0 || ie.segments && ie.segments.length > 0) && (Ee || c || d), ze = v && v[ie.id] || ie.segments || [], xe = Mx(ie, ze, ue);
      H.set(ie.id, {
        ...xe,
        hasAudio: ie.hasAudio !== void 0 ? ie.hasAudio : xe == null ? void 0 : xe.hasAudio,
        audioLabel: ie.audioLabel || (ie.hasAudio ? "AAC" : (xe == null ? void 0 : xe.audioLabel) || "NONE"),
        audioChannels: ie.audioChannels ? ie.audioChannels === 1 ? "Mono" : "Stereo" : xe == null ? void 0 : xe.audioChannels,
        feedSpec: ie.feedSpec || (xe == null ? void 0 : xe.feedSpec) || `${ie.resolution || "1080p"} • ${ie.fps || 30}fps`,
        resolution: ie.resolution || (xe == null ? void 0 : xe.resolution) || "1080p",
        fps: ie.fps || (xe == null ? void 0 : xe.fps) || 30,
        isLoading: Me
      });
    }
    return H;
  }, [r, v, S, I, Ee, c, d]), Ie = u.useMemo(() => r.filter((H) => {
    const ue = Ye.get(H.id), ie = v && v[H.id] && v[H.id].length > 0 || H.segments && H.segments.length > 0, Ae = ue && (ue.coveragePct > 0 || ue.totalRecordedMs > 0), Me = typeof H.recordingsCount == "number" && H.recordingsCount > 0;
    return ue && !ue.isLoading ? Ae || ie : Me || ie;
  }), [r, Ye, v]), Ce = u.useMemo(() => Ie.filter((H) => {
    if (J.id !== "all" && !$e.includes(H.id) || !(H.displayName || H.hostname || H.name || "").toLowerCase().includes(T.toLowerCase())) return !1;
    const ie = l.includes(H.id), Ae = Ye.get(H.id);
    return A === "selected" ? ie : A === "unselected" ? !ie : A === "gaps" ? Ae == null ? void 0 : Ae.hasGaps : A === "audio" ? Ae == null ? void 0 : Ae.hasAudio : !0;
  }).sort((H, ue) => C ? (H.displayName || H.hostname || "").localeCompare(ue.displayName || ue.hostname || "") : 0), [Ie, J, $e, T, A, l, C, Ye]), Qe = u.useMemo(() => b !== null ? b : Ce.length > Tx ? "table" : "grid", [b, Ce.length]), ct = Qe === "table" ? W : re, R = Math.max(1, Math.ceil(Ce.length / ct));
  u.useEffect(() => {
    U(1);
  }, [x, T, A, Qe]), u.useEffect(() => {
    E > R && U(R);
  }, [R, E]);
  const V = u.useMemo(() => {
    if (ne !== "is-full-width") return Ce;
    const H = (E - 1) * ct;
    return Ce.slice(H, H + ct);
  }, [Ce, E, ct, ne]), ae = () => {
    if (!a) return;
    const H = J.id === "all" ? Ce.map((ue) => ue.id) : $e;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...H])));
  }, oe = () => {
    if (!a) return;
    const H = new Set(
      J.id === "all" ? Ce.map((ue) => ue.id) : $e
    );
    a(l.filter((ue) => !H.has(ue)));
  }, Q = $e.filter((H) => l.includes(H)).length, B = Ce.filter((H) => l.includes(H.id)).length;
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
            Ee && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              Fe,
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
            onClick: ae,
            disabled: Ce.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                Ce.length,
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
            onClick: oe,
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
      Ee && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? Fe / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: _ ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : te ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: f, children: "Change Time Scope" })
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
      ne === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${Ee ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: Ee ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: Ee ? `ANALYZING TIMELINE ARCHIVES • ${Fe} OF ${Ie.length} STATIONS SYNCED (${Ie.length > 0 ? Math.min(100, Math.round(Fe / Ie.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${Ie.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: Ee ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(Fe / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        jx,
        {
          searchTerm: T,
          onSearchChange: w,
          sortAlpha: C,
          onToggleSort: () => h(!C),
          effectiveTabs: X,
          selectedTabId: x,
          onSelectTab: (H) => {
            g(H), O(null);
          },
          isLoadingTabs: z,
          allStations: Ie,
          selectedStationIds: l,
          filterMode: A,
          onFilterModeChange: y,
          filteredCount: Ce.length,
          selectedInTabCount: Q,
          unselectedInTabCount: $e.length - Q,
          activeTabName: J.name,
          onSelectAllInScope: ae,
          onClearInScope: oe,
          viewMode: Qe,
          onViewModeChange: ne === "is-full-width" ? O : null,
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
              onClick: ae,
              disabled: Ce.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  Ce.length,
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
              onClick: oe,
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
          /* @__PURE__ */ s.jsx("strong", { children: l.length }),
          " / ",
          r.length,
          " Stations"
        ] }) })
      ] }),
      ne === "is-full-width" && Qe === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: K,
          className: `station-list ${ne === "is-full-width" ? Qe === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: V.map((H) => {
            const ue = l.includes(H.id), ie = Ye.get(H.id);
            return ne === "is-full-width" ? Qe === "grid" ? /* @__PURE__ */ s.jsx(
              Nx,
              {
                station: H,
                isSelected: ue,
                onToggle: o,
                meta: ie
              },
              H.id
            ) : /* @__PURE__ */ s.jsx(
              kx,
              {
                station: H,
                isSelected: ue,
                onToggle: o,
                meta: ie
              },
              H.id
            ) : /* @__PURE__ */ s.jsx(
              wx,
              {
                station: H,
                isSelected: ue,
                onToggle: o,
                meta: ie
              },
              H.id
            );
          })
        }
      ),
      ne === "is-full-width" && /* @__PURE__ */ s.jsx(
        Ex,
        {
          currentPage: E,
          totalPages: R,
          pageSize: ct,
          totalItems: Ce.length,
          onPageChange: U,
          onPageSizeChange: (H) => {
            Qe === "table" ? se(H) : Z(H), U(1);
          },
          viewMode: Qe
        }
      ),
      ne === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Cx,
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
const On = (e) => String(e).padStart(2, "0"), $x = [
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
], Rx = [
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
function oh({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [a, i] = u.useState(e), [c, d] = u.useState(null), N = u.useRef(null), { h: f, m: p, s: v } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const y = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, y[0] || 0)),
      m: Math.min(59, Math.max(0, y[1] || 0)),
      s: Math.min(59, Math.max(0, y[2] || 0))
    };
  }, [e]), S = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const I = () => {
    const b = a.replace(/[^0-9:]/g, "").trim().split(":").filter((se) => se.length > 0);
    let O = 0, z = 0, $ = 0;
    b.length >= 1 && (O = Math.min(23, Math.max(0, parseInt(b[0], 10) || 0))), b.length >= 2 && (z = Math.min(59, Math.max(0, parseInt(b[1], 10) || 0))), b.length >= 3 && l && ($ = Math.min(59, Math.max(0, parseInt(b[2], 10) || 0)));
    const W = l ? `${On(O)}:${On(z)}:${On($)}` : `${On(O)}:${On(z)}`;
    i(W), t && t(W, { h: O, m: z, s: $ });
  }, D = (y) => {
    let b = f;
    y === "AM" && f >= 12 ? b = f - 12 : y === "PM" && f < 12 && (b = f + 12);
    const O = l ? `${On(b)}:${On(p)}:${On(v)}` : `${On(b)}:${On(p)}`;
    i(O), t && t(O, { h: b, m: p, s: v });
  }, k = u.useCallback((y, b) => {
    if (!N.current) return null;
    const O = N.current.getBoundingClientRect(), z = O.left + O.width / 2, $ = O.top + O.height / 2, W = y.clientX - z, se = y.clientY - $;
    let re = Math.atan2(se, W) * 180 / Math.PI + 90;
    if (re < 0 && (re += 360), b === "hours") {
      const Z = Math.round(re / 30) % 12;
      return S ? Z === 0 ? 12 : Z + 12 : Z === 0 ? 0 : Z;
    }
    return Math.round(re / 6) % 60;
  }, [S]), x = u.useCallback((y, b) => {
    let O = f, z = p, $ = v;
    y === "hours" ? O = b : y === "minutes" ? z = b : y === "seconds" && ($ = b);
    const W = l ? `${On(O)}:${On(z)}:${On($)}` : `${On(O)}:${On(z)}`;
    i(W), t && t(W, { h: O, m: z, s: $ });
  }, [f, p, v, l, t]), g = (y, b) => {
    b.preventDefault(), b.stopPropagation(), d(y);
    const O = k(b, y);
    O !== null && x(y, O);
  };
  u.useEffect(() => {
    if (!c) return;
    const y = (O) => {
      const z = k(O, c);
      z !== null && x(c, z);
    }, b = () => {
      d(null);
    };
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", b), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b);
    };
  }, [c, k, x]);
  const T = u.useMemo(() => f % 12 * 30, [f]), w = u.useMemo(() => p % 60 * 6, [p]), C = u.useMemo(() => v % 60 * 6, [v]), h = S ? Rx : $x, A = u.useMemo(() => {
    const y = [];
    for (let b = 0; b < 60; b++) {
      const O = (b * 6 - 90) * (Math.PI / 180), z = b % 5 === 0, $ = 104, W = z ? 93 : 98;
      y.push({
        index: b,
        x1: 110 + W * Math.cos(O),
        y1: 110 + W * Math.sin(O),
        x2: 110 + $ * Math.cos(O),
        y2: 110 + $ * Math.sin(O),
        isMajor: z
      });
    }
    return y;
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
              onClick: () => D("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${S ? "active" : ""}`,
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
            onChange: (y) => i(y.target.value),
            onBlur: I,
            onKeyDown: (y) => {
              y.key === "Enter" && y.currentTarget.blur();
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: A.map((y) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: y.x1,
              y1: y.y1,
              x2: y.x2,
              y2: y.y2,
              className: `dial-tick ${y.isMajor ? "major" : "minor"}`
            },
            `tick-${y.index}`
          )) }),
          h.map((y) => {
            const b = (y.angle - 90) * (Math.PI / 180), O = 76, z = 110 + O * Math.cos(b), $ = 110 + O * Math.sin(b), W = f === y.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: z,
                y: $,
                className: `dial-num ${W ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: y.label
              },
              `dial-h-${y.val}`
            );
          }),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-hour ${c === "hours" ? "dragging" : ""}`,
              transform: `rotate(${T} 110 110)`,
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
                    onPointerDown: (y) => g("hours", y)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${c === "minutes" ? "dragging" : ""}`,
              transform: `rotate(${w} 110 110)`,
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
                    onPointerDown: (y) => g("minutes", y)
                  }
                )
              ]
            }
          ),
          l && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${c === "seconds" ? "dragging" : ""}`,
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
                    onPointerDown: (y) => g("seconds", y)
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
const qo = 7 * 24 * 60 * 60 * 1e3, Ht = (e) => String(e).padStart(2, "0");
function Lx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, N] = u.useState(""), [f, p] = u.useState("00:00:00"), [v, S] = u.useState("00:00:00"), [I, D] = u.useState(() => /* @__PURE__ */ new Date()), [k, x] = u.useState(null), [g, T] = u.useState([]), [w, C] = u.useState(!1), [h, A] = u.useState(""), [y, b] = u.useState(1), [O, z] = u.useState(2), [$, W] = u.useState(null), se = u.useCallback(() => {
    try {
      const R = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (R) {
        const V = JSON.parse(R);
        Array.isArray(V) && T(V);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((R) => R.ok ? R.json() : null).then((R) => {
      Array.isArray(R) && R.length > 0 && T(R);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    se();
    let R = n == null ? void 0 : n.startEpochMs, V = n == null ? void 0 : n.endEpochMs;
    if (!R || isNaN(R))
      if (n != null && n.start) {
        const Q = String(n.start).replace(" ", "T"), B = new Date(Q).getTime();
        R = isNaN(B) ? Date.now() - 24 * 3600 * 1e3 : B;
      } else
        V = Date.now(), R = V - 24 * 3600 * 1e3;
    if (!V || isNaN(V))
      if (n != null && n.end) {
        const Q = String(n.end).replace(" ", "T"), B = new Date(Q).getTime();
        V = isNaN(B) ? Date.now() : B;
      } else
        V = R + 24 * 3600 * 1e3;
    W(null);
    const ae = Or(R, o), oe = Or(V, o);
    c(`${ae.year}-${Ht(ae.month)}-${Ht(ae.day)}`), N(`${oe.year}-${Ht(oe.month)}-${Ht(oe.day)}`), p(`${Ht(ae.hour)}:${Ht(ae.minute)}:${Ht(ae.second)}`), S(`${Ht(oe.hour)}:${Ht(oe.minute)}:${Ht(oe.second)}`), D(new Date(Date.UTC(ae.year, ae.month - 1, 1)));
  }, [e, n, o, se]);
  const re = u.useCallback(() => {
    i && !d && N(i);
  }, [i, d]), Z = d || i, E = u.useMemo(() => i ? `${i}T${f}` : "", [i, f]), U = u.useMemo(() => Z ? `${Z}T${v}` : "", [Z, v]), P = u.useMemo(() => {
    const R = {};
    return g.forEach((V) => {
      const ae = V.startTime || V.start, oe = V.endTime || V.end || ae;
      if (!ae) return;
      const Q = String(ae).substring(0, 10), B = String(oe).substring(0, 10), [H, ue, ie] = Q.split("-").map(Number), [Ae, Me, ze] = B.split("-").map(Number);
      if (isNaN(H) || isNaN(ue) || isNaN(ie) || isNaN(Ae) || isNaN(Me) || isNaN(ze)) return;
      let xe = new Date(Date.UTC(H, ue - 1, ie));
      const Ge = new Date(Date.UTC(Ae, Me - 1, ze));
      for (; xe.getTime() <= Ge.getTime(); ) {
        const He = `${xe.getUTCFullYear()}-${Ht(xe.getUTCMonth() + 1)}-${Ht(xe.getUTCDate())}`;
        R[He] || (R[He] = []), R[He].push(V), xe.setUTCDate(xe.getUTCDate() + 1);
      }
    }), R;
  }, [g]), K = async (R, V) => {
    if (V && V.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ae = g.filter((oe) => (oe.id || oe.startTime) !== R);
    T(ae);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(ae)), localStorage.setItem("itb_bookmarks", JSON.stringify(ae)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: ae }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, { method: "DELETE" });
    } catch {
    }
  }, _ = (R) => {
    const V = R.startTime || R.start, ae = R.endTime || R.end;
    if (!V || !ae) return;
    const oe = V.substring(0, 10), Q = V.includes("T") ? V.split("T")[1].substring(0, 8) : "00:00:00", B = ae.substring(0, 10), H = ae.includes("T") ? ae.split("T")[1].substring(0, 8) : "23:59:59";
    c(oe), N(B), p(Q), S(H);
    const [ue, ie] = oe.split("-").map(Number);
    D(new Date(Date.UTC(ue, ie - 1, 1))), C(!1);
  }, te = (R) => {
    l ? (l(R), t && t()) : _(R);
  }, ne = u.useMemo(() => {
    if (o === "UTC" || !E.includes("T")) return { isAmbiguous: !1 };
    const [R, V] = E.split("T");
    return Fa(R, V);
  }, [E, o]), X = u.useMemo(() => {
    if (o === "UTC" || !U.includes("T")) return { isAmbiguous: !1 };
    const [R, V] = U.split("T");
    return Fa(R, V);
  }, [U, o]), J = u.useMemo(() => {
    if (!i || !Z) return null;
    const R = $c(i, f, o, y), V = $c(Z, v, o, O);
    return R === null || V === null || isNaN(R) || isNaN(V) ? null : { startEpoch: R, endEpoch: V, durationMs: V - R };
  }, [i, f, Z, v, o, y, O]), $e = u.useMemo(() => !J || J.durationMs <= 0 ? [] : Sp(J.startEpoch, J.endEpoch), [J]), Fe = u.useMemo(() => {
    if (!J || J.durationMs <= 0) return "0h";
    const R = J.durationMs / (1e3 * 60 * 60);
    return R >= 24 ? `${(R / 24).toFixed(1)}d (${R.toFixed(0)}h)` : `${R.toFixed(1)}h`;
  }, [J]), Ee = u.useMemo(() => {
    const R = I.getUTCFullYear(), V = I.getUTCMonth(), ae = new Date(Date.UTC(R, V, 1)).getUTCDay(), oe = new Date(Date.UTC(R, V + 1, 0)).getUTCDate(), Q = [];
    for (let B = 0; B < ae; B++) Q.push(null);
    for (let B = 1; B <= oe; B++) Q.push(`${R}-${Ht(V + 1)}-${Ht(B)}`);
    return Q;
  }, [I]), Ye = (R) => {
    if (R) {
      if (W(null), !i || i && d)
        c(R), N("");
      else if (i && !d)
        if (R < i)
          c(R), N("");
        else {
          const V = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(R + "T00:00:00Z")).getTime() - V > qo) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const oe = new Date(V + qo);
            N(`${oe.getUTCFullYear()}-${Ht(oe.getUTCMonth() + 1)}-${Ht(oe.getUTCDate())}`);
          } else
            N(R);
        }
    }
  }, Ie = (R, V) => {
    W(V);
    const ae = Date.now(), oe = ae - R, Q = Or(oe, o), B = Or(ae, o);
    c(`${Q.year}-${Ht(Q.month)}-${Ht(Q.day)}`), N(`${B.year}-${Ht(B.month)}-${Ht(B.day)}`), p(`${Ht(Q.hour)}:${Ht(Q.minute)}:${Ht(Q.second)}`), S(`${Ht(B.hour)}:${Ht(B.minute)}:${Ht(B.second)}`), D(new Date(Date.UTC(Q.year, Q.month - 1, 1)));
  }, Ce = () => {
    if (re(), !J || isNaN(J.startEpoch) || isNaN(J.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (J.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (J.durationMs > qo) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: E,
      end: U,
      startEpochMs: J.startEpoch,
      endEpochMs: J.endEpoch,
      durationMs: J.durationMs,
      timeMode: o
    }), t && t();
  }, Qe = u.useMemo(() => {
    if (!h.trim()) return g;
    const R = h.toLowerCase();
    return g.filter(
      (V) => (V.title || V.name || "").toLowerCase().includes(R) || (V.startTime || "").includes(R)
    );
  }, [g, h]);
  if (!e) return null;
  const ct = o === "UTC";
  return Gs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (R) => R.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${ct ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: ct ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ct ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ct ? "active" : ""}`,
                  onClick: () => a("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${w ? "active" : ""}`,
                onClick: () => C(!w),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: g.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      $e.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: $e.map((R) => `${R.description} (${R.labelBefore} ➔ ${R.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "7d" ? "active" : ""}`,
            onClick: () => Ie(7 * 24 * 3600 * 1e3, "7d"),
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
            onClick: () => Ie(3 * 24 * 3600 * 1e3, "3d"),
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
            onClick: () => Ie(24 * 3600 * 1e3, "24h"),
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
            onClick: () => Ie(8 * 3600 * 1e3, "8h"),
            children: [
              "8h Shift ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        )
      ] }),
      w && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
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
                onChange: (R) => A(R.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            Qe.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: Qe.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : Qe.map((R) => {
          var B;
          const V = R.id || R.startTime, ae = R.title || R.name || "Untitled Mission", oe = (R.startTime || "").replace("T", " "), Q = (R.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => _(R), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: ae }),
                R.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  R.cutStationName
                ] }),
                ((B = R.stationIds) == null ? void 0 : B.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  R.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                oe,
                " ➔ ",
                Q
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (H) => {
                    H.stopPropagation(), _(R);
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
                    H.stopPropagation(), te(R);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (H) => K(V, H),
                  children: "✕"
                }
              )
            ] })
          ] }, V);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: I.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((R) => new Date(Date.UTC(R.getUTCFullYear(), R.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((R) => new Date(Date.UTC(R.getUTCFullYear(), R.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Ee.map((R, V) => {
            if (!R) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${V}`);
            const ae = parseInt(R.split("-")[2], 10), oe = R === i, Q = R === (d || i), B = d || k, H = i && B && R > i && R < B, ue = P[R], ie = !!(ue && ue.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${oe ? "start-edge" : ""} ${Q ? "end-edge" : ""} ${H ? "in-range" : ""} ${ie ? "has-bookmark" : ""}`,
                onClick: () => Ye(R),
                onMouseEnter: () => !d && i && x(R),
                onMouseLeave: () => x(null),
                title: ie ? `${ue.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: ae }),
                  ie && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Ae) => {
                        Ae.stopPropagation(), C(!0), A(R);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        ue.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: ue.length })
                      ]
                    }
                  )
                ]
              },
              R
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
            oh,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (R) => {
                re(), p(R), W(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            oh,
            {
              label: "END TIME (TO)",
              value: v,
              onChange: (R) => {
                re(), S(R), W(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (ne.isAmbiguous || X.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
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
                className: y === 1 ? "active" : "",
                onClick: () => b(1),
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
                className: y === 2 ? "active" : "",
                onClick: () => b(2),
                children: [
                  "2nd Occurrence (",
                  ne.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        X.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            X.transition.labelBefore,
            " / ",
            X.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: O === 1 ? "active" : "",
                onClick: () => z(1),
                children: [
                  "1st Occurrence (",
                  X.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: O === 2 ? "active" : "",
                onClick: () => z(2),
                children: [
                  "2nd Occurrence (",
                  X.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: J && J.durationMs > qo ? "#f43f5e" : "#22d3ee" }, children: Fe }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: $e.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Ce, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Pp = "extractor_incident_bookmarks_fallback", Ox = ["itb_studio_bookmarks", "itb_bookmarks", Pp];
function Dx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [N, f] = u.useState(!1), [p, v] = u.useState(!1), [S, I] = u.useState(null), [D, k] = u.useState(""), x = u.useCallback(($) => {
    Ox.forEach((W) => {
      try {
        localStorage.setItem(W, JSON.stringify($));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: $ }));
  }, []), g = u.useCallback(async () => {
    f(!0);
    try {
      const $ = await fetch("/api/v1/extractor-advanced/bookmarks");
      if ($.ok) {
        const W = await $.json(), se = Array.isArray(W) ? W : [];
        i(se), x(se);
        return;
      }
    } catch ($) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", $);
    } finally {
      f(!1);
    }
    try {
      const $ = localStorage.getItem(Pp) || localStorage.getItem("itb_studio_bookmarks");
      $ && i(JSON.parse($));
    } catch {
    }
  }, [x]);
  if (u.useEffect(() => {
    e && g();
  }, [e, g]), !e) return null;
  const T = async () => {
    var ne, X, J, $e, Fe, Ee;
    if (!c.trim() || p) return;
    const $ = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((ne = n == null ? void 0 : n.timeRange) != null && ne.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), W = (n == null ? void 0 : n.inPointMs) ?? 0, se = (n == null ? void 0 : n.outPointMs) ?? (((X = n == null ? void 0 : n.timeRange) == null ? void 0 : X.durationMs) || 0), re = (n == null ? void 0 : n.playheadMs) ?? W, Z = $ + W, E = $ + se, U = $ + re, P = (n == null ? void 0 : n.selectedStationIds) || [], K = (n == null ? void 0 : n.selectedStationNames) || [], _ = ((J = n == null ? void 0 : n.allStationIds) == null ? void 0 : J.length) > 0 ? n.allStationIds : P, te = {
      title: c.trim(),
      startTime: (($e = n == null ? void 0 : n.timeRange) == null ? void 0 : $e.start) || "",
      endTime: ((Fe = n == null ? void 0 : n.timeRange) == null ? void 0 : Fe.end) || "",
      baseEpochMs: $,
      timelineBaseEpochMs: $,
      inPointMs: W,
      outPointMs: se,
      playheadMs: re,
      inEpochMs: Z,
      outEpochMs: E,
      playheadEpochMs: U,
      selectedStationIds: P,
      selectedStationNames: K,
      allStationIds: _,
      stationIds: P.length > 0 ? P : _,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    v(!0);
    try {
      const Ye = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(te)
      });
      if (Ye.ok) {
        const Ie = await Ye.json(), Qe = [{
          ...te,
          ...Ie.bookmark || {},
          inEpochMs: Z,
          outEpochMs: E,
          playheadEpochMs: U,
          selectedStationIds: P,
          selectedStationNames: K,
          allStationIds: _,
          id: ((Ee = Ie.bookmark) == null ? void 0 : Ee.id) || Ie.id || `bm_${Date.now()}`
        }, ...a];
        i(Qe), x(Qe), d("");
      } else
        throw new Error(`Server returned ${Ye.status}`);
    } catch (Ye) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Ye);
      const Ce = [{
        ...te,
        inEpochMs: Z,
        outEpochMs: E,
        playheadEpochMs: U,
        selectedStationIds: P,
        selectedStationNames: K,
        allStationIds: _,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(Ce), x(Ce), d("");
    } finally {
      v(!1);
    }
  }, w = async ($, W) => {
    if (W.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const se = a.filter((re) => (re.id || re.startTime) !== $);
    i(se), x(se);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, { method: "DELETE" });
    } catch (re) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", re);
    }
  }, C = ($, W) => {
    W.stopPropagation(), I($.id || $.startTime), k($.title || $.name || "");
  }, h = async ($, W) => {
    if (W && W.stopPropagation(), !D.trim()) return;
    const se = a.find((E) => (E.id || E.startTime) === $), re = D.trim(), Z = a.map(
      (E) => (E.id || E.startTime) === $ ? { ...E, title: re, name: re } : E
    );
    i(Z), x(Z), I(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...se, title: re })
      });
    } catch (E) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", E);
    }
  }, A = ($) => {
    $.stopPropagation(), I(null);
  }, y = ($) => !$ || isNaN($) ? "--:--:--" : Et($, o), b = ($) => {
    const W = $.startTime || $.StartTime, se = $.endTime || $.EndTime;
    if (!W) return "--";
    const re = String(W).replace("T", " ").substring(0, 19), Z = se ? String(se).replace("T", " ").substring(0, 19) : re;
    return `${re} ➔ ${Z}`;
  }, O = ($) => {
    let W = $.inEpochMs || $.InEpochMs, se = $.outEpochMs || $.OutEpochMs;
    if (!W || !se) {
      const re = $.timelineBaseEpochMs || $.baseEpochMs || ($.startTime ? new Date(String($.startTime).replace(" ", "T")).getTime() : 0), Z = $.inPointMs ?? $.InPointMs, E = $.outPointMs ?? $.OutPointMs;
      re && typeof Z == "number" && typeof E == "number" && (Z > 0 || E > 0) && (W = re + Z, se = re + E);
    }
    if (W && se && !isNaN(W) && !isNaN(se) && W > 0) {
      const re = y(W), Z = y(se), E = Math.max(0, se - W), U = Math.floor(E / 6e4), P = Math.floor(U / 60), K = U % 60, _ = P > 0 ? `${P}h ${K}m` : `${U}m`;
      return { timeText: `${re} ➔ ${Z}`, duration: _ };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, z = ($) => {
    const W = $.selectedStationNames || [], se = $.selectedStationIds || $.cutStationIds || $.stationIds || [];
    return W.length > 0 ? W.join(", ") : se.length > 0 ? se.join(", ") : $.cutStationName ? $.cutStationName : $.activeStationName ? $.activeStationName : "All Stations in Scope";
  };
  return Gs.createPortal(
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
              onKeyDown: ($) => $.key === "Enter" && T(),
              disabled: p,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !p ? "active" : ""}`,
            onClick: T,
            disabled: !c.trim() || p,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                /* @__PURE__ */ s.jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: p ? "SAVING..." : "SAVE SNAPSHOT" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-section-heading", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "heading-title-group", children: [
          /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
          /* @__PURE__ */ s.jsx("span", { children: "SAVED TIMELINE EVENTS" })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: N ? "SYNCING..." : `${a.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: a.length === 0 && !N ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : a.map(($) => {
        var U, P, K;
        const W = $.id || $.startTime, se = S === W, re = O($), Z = z($), E = ((U = $.allStationIds) == null ? void 0 : U.length) || ((P = $.selectedStationIds) == null ? void 0 : P.length) || ((K = $.stationIds) == null ? void 0 : K.length) || 0;
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
                se ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (_) => _.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: D,
                      onChange: (_) => k(_.target.value),
                      onKeyDown: (_) => {
                        _.key === "Enter" && h(W, _), _.key === "Escape" && A(_);
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
                        onClick: (_) => h(W, _),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: A,
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
                    /* @__PURE__ */ s.jsx("strong", { children: b($) })
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
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: re.timeText }),
                    re.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      re.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${Z}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: Z })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (_) => _.stopPropagation(), children: [
                !se && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (_) => C($, _),
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
                    onClick: (_) => w(W, _),
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
const ah = {
  USER: "itb_auth_user",
  ROLES: "itb_auth_roles"
};
function _p() {
  try {
    if (typeof window > "u") return "Guest Operator";
    const e = sessionStorage.getItem(ah.USER) || localStorage.getItem(ah.USER);
    if (e) {
      const t = JSON.parse(e), n = (t == null ? void 0 : t.displayName) || (t == null ? void 0 : t.username);
      if (n && typeof n == "string" && n.trim())
        return n.trim();
    }
  } catch {
  }
  return "Guest Operator";
}
function Px(e) {
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
function _x(e, t) {
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
function Fx({
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
  outPointMs: N = 36e5,
  isLooping: f = !0,
  recordingSegments: p = {},
  globalGaps: v = [],
  showWatermark: S = !0,
  directorPlan: I,
  onOverrideDisplay: D,
  onResetOverride: k,
  viewMode: x,
  onViewModeChange: g,
  onOpenFullscreen: T,
  isPipSwapped: w,
  onPipSwapChange: C,
  className: h = ""
}) {
  const A = u.useRef(null), y = u.useRef(null), b = u.useRef(null), O = u.useRef(r), z = u.useRef(r), $ = u.useRef(r), W = u.useRef(!1), se = u.useRef(null), re = u.useRef(o), Z = u.useRef(!1);
  O.current = r;
  const E = e == null ? void 0 : e.id, U = e && (e.hostname || e.name) || "", P = u.useMemo(() => {
    var q, Oe, _e, et;
    const ee = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((q = e == null ? void 0 : e.displayTopology) == null ? void 0 : q.displays) || ((Oe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Oe.Displays) || ((_e = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : _e.Displays) || ((et = e == null ? void 0 : e.topology) == null ? void 0 : et.displays) || [];
    if (!Array.isArray(ee) || ee.length === 0) return [];
    const me = ee.length > 1 && ee.every((Ve) => (Ve.X ?? Ve.x ?? 0) === 0 && (Ve.Y ?? Ve.y ?? 0) === 0);
    let ve = 0;
    return ee.map((Ve, ht) => {
      const xt = Ve.Width || Ve.width || 1920, At = Ve.Height || Ve.height || 1080, Vt = me ? ve : Ve.X ?? Ve.x ?? ht * xt, un = me ? 0 : Ve.Y ?? Ve.y ?? 0;
      me && (ve += xt);
      const Dt = (Ve.displayId ?? Ve.DisplayId ?? `mon-${ht}`).toLowerCase(), bt = Ve.displayNumber ?? Ve.DisplayNumber ?? ht + 1, jt = (Ve.displayName || Ve.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${bt}`, Nn = !!(Ve.isPrimary ?? Ve.IsPrimary ?? ht === 0);
      return {
        ...Ve,
        displayId: Dt,
        DisplayId: Dt,
        displayIndex: ht,
        displayNumber: bt,
        DisplayNumber: bt,
        displayName: jt,
        DisplayName: jt,
        isPrimary: Nn,
        IsPrimary: Nn,
        x: Vt,
        y: un,
        X: Vt,
        Y: un,
        width: xt,
        height: At,
        Width: xt,
        Height: At
      };
    });
  }, [e]), K = P.length > 1, [_, te] = u.useState(() => {
    if (!K) return "mon-0";
    try {
      const ee = localStorage.getItem("itb_solo_viewmode");
      if (ee) return ee;
    } catch {
    }
    return "canvas";
  }), X = K ? x !== void 0 ? x : _ : "mon-0", J = u.useCallback((ee) => {
    const me = typeof ee == "function" ? ee(X) : ee;
    te(me);
    try {
      localStorage.setItem("itb_solo_viewmode", me);
    } catch {
    }
    g && g(me);
  }, [X, g]), [$e, Fe] = u.useState(!1), Ee = w !== void 0 ? w : $e, Ye = u.useCallback((ee) => {
    const me = typeof ee == "function" ? ee(Ee) : ee;
    Fe(me), C && C(me);
  }, [Ee, C]), Ie = u.useMemo(() => {
    const ee = I || (e == null ? void 0 : e.directorPlan);
    if (!ee || !ee.segments || ee.segments.length === 0) return null;
    const me = t + r;
    return ee.segments.find((ve) => {
      const q = ve.startEpochMs ?? ve.StartEpochMs ?? 0, Oe = ve.endEpochMs ?? ve.EndEpochMs ?? 0;
      return me >= q && me <= Oe;
    }) || ee.segments[0];
  }, [I, e == null ? void 0 : e.directorPlan, t, r]), Ce = u.useMemo(() => {
    var ee, me;
    if (!K) return "mon-0";
    if (X === "split" || X === "pip" || X === "canvas" || X === "all-displays") {
      const ve = (((ee = P[0]) == null ? void 0 : ee.displayId) ?? "mon-0").toLowerCase(), q = (((me = P[1]) == null ? void 0 : me.displayId) ?? "mon-1").toLowerCase();
      return Ee ? q : ve;
    }
    return X !== "director" ? X.toLowerCase() : ((Ie == null ? void 0 : Ie.targetDisplayId) ?? (Ie == null ? void 0 : Ie.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [K, X, Ie, P, Ee]), Qe = u.useMemo(() => {
    var me;
    if (!K) return null;
    const ee = P.find((ve) => (ve.displayId ?? ve.DisplayId ?? "").toLowerCase() !== Ce);
    return ee ? (ee.displayId ?? ee.DisplayId).toLowerCase() : (((me = P[1]) == null ? void 0 : me.displayId) || "mon-1").toLowerCase();
  }, [K, P, Ce]), ct = u.useMemo(() => {
    const ee = P.find((ve) => (ve.displayId ?? "").toLowerCase() === (Ce || "").toLowerCase());
    if (ee) return ee.displayName || `Screen ${ee.displayNumber || 1}`;
    if (Ce === "mon-0" || Ce === "0") return "Screen 1";
    if (Ce === "mon-1" || Ce === "1") return "Screen 2";
    const me = (Ce || "").match(/\d+/);
    if (me) {
      const ve = parseInt(me[0], 10);
      return `Screen ${(Ce || "").startsWith("mon-") ? ve + 1 : ve}`;
    }
    return (Ce || "Screen 1").toUpperCase();
  }, [P, Ce]), R = u.useMemo(() => {
    const ee = P.find((me) => (me.displayId ?? "").toLowerCase() === (Qe || "").toLowerCase());
    return ee ? ee.displayName || `Screen ${ee.displayNumber || 2}` : "Screen 2";
  }, [P, Qe]), V = u.useMemo(() => X !== "director" && X !== "split" && X !== "pip" && X !== "canvas" ? !0 : !!((Ie == null ? void 0 : Ie.isManualOverride) ?? (Ie == null ? void 0 : Ie.IsManualOverride)), [X, Ie]), [ae, oe] = u.useState({}), Q = u.useRef(null), [B, H] = u.useState({ width: 0, height: 0 }), ue = u.useMemo(() => Px(P), [P]);
  u.useEffect(() => {
    if (!K || X !== "canvas" && X !== "all-displays" || o)
      return;
    const ee = () => {
      const ve = Q.current;
      if (!ve) return;
      const q = 48, Oe = 72, _e = Math.max(100, ve.clientWidth - q), et = Math.max(100, ve.clientHeight - Oe), Ve = ue.totalWidth || 1920, ht = ue.totalHeight || 1080, xt = Ve / ht;
      let At = _e, Vt = At / xt;
      Vt > et && (Vt = et, At = Vt * xt), H({ width: Math.round(At), height: Math.round(Vt) });
    };
    ee();
    const me = new ResizeObserver(ee);
    return Q.current && me.observe(Q.current), () => me.disconnect();
  }, [K, X, ue]);
  const ie = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!K || X !== "canvas" && X !== "all-displays")
      return;
    let ee = !0;
    const me = new AbortController(), ve = ie;
    P.forEach((Oe, _e) => {
      const et = (Oe.displayId ?? Oe.DisplayId ?? `mon-${_e}`).toLowerCase(), Ve = Dn.get(U, ve, et);
      Ve ? oe((ht) => ({ ...ht, [et]: Ve })) : Dn.fetchFrame(U, ve, me.signal, et).then((ht) => {
        ee && ht && oe((xt) => ({ ...xt, [et]: ht }));
      });
    });
    const q = Dn.subscribe((Oe, _e, et, Ve) => {
      Oe === U && _e === ve && Ve && ee && oe((ht) => ({ ...ht, [Ve.toLowerCase()]: et }));
    });
    return () => {
      ee = !1, me.abort(), q();
    };
  }, [K, X, P, U, ie]);
  const Ae = u.useRef(Ce), Me = u.useMemo(() => e ? p[e.id] || p[e.hostname] || e.segments || [] : [], [e, p]), ze = t + r, xe = u.useMemo(() => Me.length === 0 ? !0 : Me.some((ee) => {
    const me = (ee.startEpochMs ?? ee.startEpoch ?? 0) - 2e3, ve = (ee.endEpochMs ?? ee.endEpoch ?? 0) + 2e3;
    return ze >= me && ze <= ve;
  }), [Me, ze]), Ge = !xe && Me.length > 0, [He, wt] = u.useState("A"), [pt, st] = u.useState(""), [Rt, rt] = u.useState(""), [Jt, gn] = u.useState(""), [Lt, Cn] = u.useState(null), [gt, mt] = u.useState(!1), [qe, Xe] = u.useState(!1), [Ot, Bt] = u.useState(() => {
    if (!U) return null;
    const ee = Math.round(t + r);
    return Dn.get(U, ee, Ce) || null;
  }), [cn, Sn] = u.useState(null), os = He === "A" ? A : y, Le = u.useCallback(() => {
    const ee = vl();
    A.current && (A.current.volume = ee.volume, A.current.muted = He !== "A" || ee.isMuted, A.current.defaultPlaybackRate = i, A.current.playbackRate = i, He === "A" && !ee.isMuted && Ba(A.current)), y.current && (y.current.volume = ee.volume, y.current.muted = He !== "B" || ee.isMuted, y.current.defaultPlaybackRate = i, y.current.playbackRate = i, He === "B" && !ee.isMuted && Ba(y.current)), b.current && (b.current.muted = !0, b.current.defaultPlaybackRate = i, b.current.playbackRate = i);
  }, [He, i]);
  u.useEffect(() => {
    const ee = (me) => {
      me.detail && (A.current && (A.current.volume = me.detail.volume), y.current && (y.current.volume = me.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", ee), () => window.removeEventListener("itb-audio-state-changed", ee);
  }, []), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i), y.current && (y.current.defaultPlaybackRate = i, y.current.playbackRate = i), b.current && (b.current.defaultPlaybackRate = i, b.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!E || !U) return;
    if (o) {
      re.current = !0;
      return;
    }
    const ee = re.current;
    re.current = o;
    let me = !0;
    const ve = new AbortController(), q = Math.round(t + r), Oe = Dn.get(U, q, Ce);
    if (Oe) {
      Bt(Oe);
      return;
    }
    const et = setTimeout(() => {
      me && Dn.fetchFrame(U, q, ve.signal, Ce).then((ht) => {
        me && ht && Bt(ht);
      });
    }, ee ? 25 : 35), Ve = Dn.subscribe((ht, xt, At, Vt) => {
      ht === U && xt === q && (!Vt || Vt === Ce) && me && Bt(At);
    });
    return () => {
      me = !1, clearTimeout(et), ve.abort(), Ve();
    };
  }, [E, U, t, r, o, gt, Ce]), u.useEffect(() => {
    if (!K || X !== "split" && X !== "pip" || !Qe || o) {
      Sn(null);
      return;
    }
    let ee = !0;
    const me = new AbortController(), ve = Math.round(t + r), q = Dn.get(U, ve, Qe);
    if (q) {
      Sn(q);
      return;
    }
    const Oe = setTimeout(() => {
      ee && Dn.fetchFrame(U, ve, me.signal, Qe).then((et) => {
        ee && et && Sn(et);
      });
    }, 40), _e = Dn.subscribe((et, Ve, ht, xt) => {
      et === U && Ve === ve && (!xt || xt === Qe) && ee && Sn(ht);
    });
    return () => {
      ee = !1, clearTimeout(Oe), me.abort(), _e();
    };
  }, [K, X, Qe, E, U, t, r]);
  const Re = u.useCallback((ee, me = Ce) => {
    const ve = Math.round(t), q = Math.round(t + n), Oe = Math.min(q, Math.max(ve, Math.round(t + ee)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(U)}&startEpoch=${ve}&endEpoch=${q}&seekEpoch=${Oe}&displayId=${encodeURIComponent(me)}&_t=${Date.now()}`;
  }, [t, n, U, Ce]);
  u.useEffect(() => {
    if (!(!E || !U))
      if (o && xe) {
        const ee = O.current;
        z.current = ee, $.current = ee, W.current = !1;
        const me = Re(ee, Ce);
        mt(!1), Xe(!0), wt("A"), st(me), rt(""), Cn(null), gn((X === "split" || X === "pip") && Qe ? Re(ee, Qe) : "");
      } else o || (se.current && clearTimeout(se.current), W.current = !1, st(""), rt(""), gn(""), Cn(null), mt(!1), Xe(!1), A.current && A.current.pause(), y.current && y.current.pause(), b.current && b.current.pause());
  }, [o, E, U, xe, Re, Ce, X, Qe]), u.useEffect(() => {
    if (Ae.current !== Ce && (Ae.current = Ce, o && xe)) {
      const ee = O.current;
      z.current = ee;
      const me = Re(ee, Ce);
      mt(!1), Xe(!0), wt("A"), st(me), rt("");
    }
  }, [Ce, o, xe, Re]), u.useEffect(() => {
    if (!E || !U) return;
    const ee = Math.abs(r - $.current);
    if (!o || ee < 15) {
      $.current = r;
      return;
    }
    return W.current = !0, $.current = r, z.current = r, A.current && A.current.pause(), y.current && y.current.pause(), b.current && b.current.pause(), mt(!1), Xe(!0), se.current && clearTimeout(se.current), se.current = setTimeout(() => {
      if (!xe) {
        st(""), rt(""), gn(""), Xe(!1), W.current = !1;
        return;
      }
      const me = O.current, ve = Re(me, Ce);
      wt("A"), st(ve), rt(""), Cn(null), (X === "split" || X === "pip") && Qe && gn(Re(me, Qe));
    }, 75), () => {
      se.current && clearTimeout(se.current);
    };
  }, [r, o, E, U, xe, Re, Ce, X, Qe]), u.useEffect(() => {
    if (!o || !gt || Me.length === 0) return;
    const ee = t + O.current, me = Me.map((ve) => ({
      start: ve.startEpochMs ?? ve.startEpoch ?? 0,
      end: ve.endEpochMs ?? ve.endEpoch ?? 0
    })).filter((ve) => ve.start > ee + 500).sort((ve, q) => ve.start - q.start)[0];
    if (me && (!Lt || Lt.start !== me.start)) {
      const ve = me.start - t;
      if (ve < N) {
        const q = Re(ve, Ce);
        Cn({ start: me.start, ms: ve }), He === "A" ? rt(q) : st(q);
      }
    }
  }, [o, gt, r, t, N, Me, Lt, He, Re, Ce]);
  const Je = u.useCallback(() => {
    if (Lt) {
      const ee = He === "A" ? "B" : "A", me = ee === "A" ? A : y;
      wt(ee), z.current = Lt.ms, $.current = Lt.ms, Cn(null), me.current && me.current.play().then(() => {
        Le();
      }).catch(() => {
      });
    } else
      f ? l(d) : a(!1);
  }, [Lt, He, Le, f, d, l, a]), dt = u.useCallback(() => {
    const ee = os.current;
    if (!ee || W.current || !o || Z.current) return;
    const me = ee.currentTime * 1e3, ve = Math.round(z.current + me);
    if (v && v.length > 0) {
      const q = t + ve, Oe = v.find((_e) => q >= _e.startEpochMs && q < _e.endEpochMs);
      if (Oe) {
        Z.current = !0;
        const _e = Math.round(Oe.endEpochMs - t) + 10;
        l(_e), setTimeout(() => {
          Z.current = !1;
        }, 150);
        return;
      }
    }
    if (ve >= N) {
      f ? l(d) : (a(!1), l(N));
      return;
    }
    $.current = ve, l(ve);
  }, [os, o, t, v, N, f, d, l, a]), Tt = qe && o && !Ge;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${X} ${h}`, children: [
    K && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (ee) => ee.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${X === "director" ? "active" : ""}`,
          onClick: () => J("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${X === "canvas" ? "active" : ""}`,
          onClick: () => J("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${X === "split" ? "active" : ""}`,
          onClick: () => J("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${X === "pip" ? "active" : ""}`,
          onClick: () => J("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      P.map((ee, me) => {
        const ve = (ee.displayId ?? `mon-${me}`).toLowerCase(), q = ee.displayNumber ?? me + 1, Oe = ee.displayName || `Screen ${q}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${X === ve ? "active" : ""}`,
            onClick: () => J(ve),
            title: `Pin directly to ${Oe}`,
            children: [
              "🖥️ ",
              q
            ]
          },
          ve
        );
      }),
      X === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          P.map((ee, me) => {
            const ve = (ee.displayId ?? `mon-${me}`).toLowerCase(), q = ee.displayNumber ?? me + 1, Oe = ee.displayName || `Screen ${q}`, _e = Ce === ve;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${_e ? "active" : ""} ${V && _e ? "is-override" : ""}`,
                onClick: () => {
                  D == null || D(E, t + r, ve);
                },
                title: `Punch ${Oe} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    q
                  ] }),
                  _e && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: V ? "✋" : "⚡" })
                ]
              },
              `punch-${ve}`
            );
          }),
          V && k && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                k == null || k(E, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    K && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${V ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: X === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : X === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : X === "pip" ? `🪟 PiP MODE: ${ct.toUpperCase()} (HERO)` : `${V ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${ct.toUpperCase()}` }),
      V && X === "director" && k && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => k == null ? void 0 : k(E, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    pt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: A,
        src: pt,
        className: "feed-video-element",
        style: {
          opacity: gt && He === "A" ? 1 : 0,
          zIndex: He === "A" ? 3 : 1,
          pointerEvents: He === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: He === "A",
        preload: "auto",
        muted: He !== "A" || vl().isMuted,
        onCanPlay: () => {
          Le(), o && He === "A" && A.current && A.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          He === "A" && (W.current = !1, mt(!0), Xe(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i));
        },
        onWaiting: () => {
          He === "A" && Xe(!0);
        },
        onTimeUpdate: () => {
          var ee;
          He === "A" && (!gt && ((ee = A.current) == null ? void 0 : ee.currentTime) > 0 && (W.current = !1, mt(!0), Xe(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i)), dt());
        },
        onError: () => {
          He === "A" && (W.current = !1, Xe(!1), mt(!1));
        },
        onEnded: () => {
          He === "A" && Je();
        }
      }
    ),
    Rt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: y,
        src: Rt,
        className: "feed-video-element",
        style: {
          opacity: gt && He === "B" ? 1 : 0,
          zIndex: He === "B" ? 3 : 1,
          pointerEvents: He === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: He === "B",
        preload: "auto",
        muted: He !== "B" || vl().isMuted,
        onCanPlay: () => {
          Le(), o && He === "B" && y.current && y.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          He === "B" && (W.current = !1, mt(!0), Xe(!1), y.current && (y.current.defaultPlaybackRate = i, y.current.playbackRate = i));
        },
        onWaiting: () => {
          He === "B" && Xe(!0);
        },
        onTimeUpdate: () => {
          var ee;
          He === "B" && (!gt && ((ee = y.current) == null ? void 0 : ee.currentTime) > 0 && (W.current = !1, mt(!0), Xe(!1), y.current && (y.current.defaultPlaybackRate = i, y.current.playbackRate = i)), dt());
        },
        onError: () => {
          He === "B" && (W.current = !1, Xe(!1), mt(!1));
        },
        onEnded: () => {
          He === "B" && Je();
        }
      }
    ),
    X !== "split" && X !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: gt ? 0 : 2 },
        children: Ge ? /* @__PURE__ */ s.jsx(Tp, { isPlaying: o }) : Ot && Ot !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Ot,
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
    X === "split" && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Ot && Ot !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Ot, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        cn && cn !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: cn, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    X === "pip" && K && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (ee) => {
          ee.stopPropagation(), Ye((me) => !me);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              R.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          cn && cn !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: cn, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (X === "canvas" || X === "all-displays") && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: Q, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: B.width ? `${B.width}px` : "92%",
            height: B.height ? `${B.height}px` : "auto",
            aspectRatio: `${ue.totalWidth} / ${ue.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: P.map((ee, me) => {
            const ve = _x(ee, ue), q = (ee.displayId ?? ee.DisplayId ?? `mon-${me}`).toLowerCase(), Oe = ae[q] || (q === Ce ? Ot : null), _e = !!(ee.isPrimary ?? ee.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${_e ? "is-primary" : ""}`,
                style: {
                  left: `${ve.leftPct}%`,
                  top: `${ve.topPct}%`,
                  width: `${ve.widthPct}%`,
                  height: `${ve.heightPct}%`
                },
                onClick: (et) => {
                  et.stopPropagation(), T ? T(q) : J(q);
                },
                title: `Display ${me + 1} (${ee.width || 1920}x${ee.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      _e ? "★ " : "",
                      "🖥 ",
                      me + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: ee.displayName || ee.DisplayName || q.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      ee.width || 1920,
                      "x",
                      ee.height || 1080
                    ] }),
                    T && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (et) => {
                          et.stopPropagation(), T(q);
                        },
                        title: `Open Display ${me + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Oe && Oe !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Oe,
                      className: "canvas-frame-img",
                      alt: q
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      ee.displayName || q.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              q
            );
          })
        }
      )
    ] }),
    Tt && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          U,
          " • ",
          Ce.toUpperCase()
        ] })
      ] })
    ] }) }),
    X === "director" && Ie && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Ce.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        Et(Ie.startEpochMs ?? Ie.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        Et(Ie.endEpochMs ?? Ie.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    K && X !== "canvas" && /* @__PURE__ */ s.jsx(
      Ap,
      {
        displays: P,
        activeDisplayId: Ce,
        mode: V ? "MANUAL" : "AUTO",
        activeTimeRange: Ie ? `${Et(Ie.startEpochMs ?? Ie.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${Et(Ie.endEpochMs ?? Ie.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (ee) => {
          D && D(E, t + r, ee), J(ee);
        }
      }
    ),
    S && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      U
    ] }) })
  ] });
}
const _i = 2200, Fi = 400;
function Bx({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], N = d.epochMs + fa, f = e - N;
      if (f >= 0 && f <= _i)
        return {
          ...d,
          elapsed: f
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let a = 1;
  if (o.elapsed > _i - Fi) {
    const c = (o.elapsed - (_i - Fi)) / Fi;
    a = Math.max(0, 1 - c);
  }
  if (a <= 0.05) return null;
  if (r === "CAPTION") {
    const c = Rp(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const i = $p(o.keyCombination);
  return i.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: i.map((c, d) => /* @__PURE__ */ s.jsxs(Co.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < i.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const Ux = [
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
function Fp({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? Gs.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Ux.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const ih = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), a = r % 60, i = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(a)}.${c(i)}`;
};
function Wx({
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
  onZoomChange: N,
  onZoomReset: f,
  onFitRange: p,
  onJumpViewportTo: v,
  viewportStartMs: S = 0,
  onViewportStartChange: I,
  playheadMs: D = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: x,
  inPointMs: g = 0,
  setInPointMs: T,
  outPointMs: w = 36e5,
  setOutPointMs: C,
  recordingSegments: h = {},
  globalGaps: A = [],
  onExport: y,
  isPlaying: b,
  setIsPlaying: O,
  isLooping: z = !0,
  setIsLooping: $,
  playbackSpeed: W,
  setPlaybackSpeed: se,
  keystrokeMode: re = "BURN_IN",
  onChangeKeystrokeMode: Z,
  keystrokes: E = [],
  showRulerKeystrokes: U = !1,
  onToggleRulerKeystrokes: P,
  directorPlan: K,
  onOverrideDisplay: _,
  onSplitDirectorSegment: te,
  onChangeDirectorSegmentDisplay: ne,
  onResetDirectorSegmentToAuto: X
}) {
  var cn, Sn, os;
  const [J, $e] = u.useState(!1), Fe = b !== void 0 ? b : J, Ee = u.useCallback((Le) => {
    const Re = typeof Le == "function" ? Le(Fe) : Le;
    O ? O(Re) : $e(Re), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Re } }));
  }, [Fe, O]), [Ye, Ie] = u.useState(!0), Ce = z !== void 0 ? z : Ye, Qe = $ || Ie, [ct, R] = u.useState(1), V = W !== void 0 ? W : ct, ae = se || R, [oe, Q] = u.useState(null), [B, H] = u.useState(!1), [ue, ie] = u.useState(A), Ae = ((cn = t == null ? void 0 : t.displays) == null ? void 0 : cn.length) > 1 || ((os = (Sn = t == null ? void 0 : t.topology) == null ? void 0 : Sn.displays) == null ? void 0 : os.length) > 1, [Me, ze] = u.useState(() => {
    if (!Ae) return "mon-0";
    if (n) return n;
    try {
      const Le = localStorage.getItem("itb_spotlight_viewmode");
      if (Le) return Le;
    } catch {
    }
    return "canvas";
  }), xe = u.useCallback((Le) => {
    ze((Re) => {
      const Je = typeof Le == "function" ? Le(Re) : Le;
      try {
        localStorage.setItem("itb_spotlight_viewmode", Je);
      } catch {
      }
      return Je;
    });
  }, []), [Ge, He] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!Ae) {
        ze("mon-0");
        return;
      }
      if (n)
        ze(n);
      else
        try {
          const Le = localStorage.getItem("itb_spotlight_viewmode");
          ze(Le || "canvas");
        } catch {
          ze("canvas");
        }
    }
  }, [e, n, Ae, t == null ? void 0 : t.id]);
  const wt = u.useRef(null), pt = u.useRef(d);
  pt.current = d;
  const st = u.useRef(S);
  st.current = S;
  const Rt = u.useRef(c);
  Rt.current = c;
  const rt = u.useRef(t && t.id);
  u.useEffect(() => {
    var Le, Re, Je;
    t && t.id && rt.current !== t.id && (rt.current = t.id, ae(1), ((Le = t.displays) == null ? void 0 : Le.length) > 1 || ((Je = (Re = t.topology) == null ? void 0 : Re.displays) == null ? void 0 : Je.length) > 1 || xe("mon-0"));
  }, [t, ae]);
  const Jt = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Le = wt.current;
    if (!Le || !N || !I) return;
    const Re = (Je) => {
      Je.preventDefault(), Je.stopPropagation();
      const dt = Je.ctrlKey || Je.shiftKey, Tt = pt.current, ee = st.current, me = Rt.current || 36e5;
      if (dt) {
        const ve = Math.abs(Je.deltaX) > Math.abs(Je.deltaY) ? Je.deltaX : Je.deltaY;
        if (ve === 0) return;
        const q = me / Tt, Oe = Math.max(0, me - q), _e = q * 0.08 * (ve > 0 ? 1 : -1), et = Math.max(0, Math.min(Oe, ee + _e));
        st.current = et, I(et);
      } else {
        if (Je.deltaY === 0) return;
        const q = Je.deltaY < 0 ? 1.25 : 0.8, Oe = Le.getBoundingClientRect(), _e = Oe.left + 150, et = Oe.right - 58, Ve = Math.max(100, et - _e);
        let ht = 0.5;
        Je.clientX >= _e && Je.clientX <= et ? ht = (Je.clientX - _e) / Ve : Oe.width > 0 && (ht = Math.max(0, Math.min(1, (Je.clientX - Oe.left) / Oe.width)));
        const xt = Math.max(32, me / 2e3), At = Math.max(1, Math.min(xt, Math.round(Tt * q * 100) / 100));
        if (At === Tt) return;
        const Vt = me / Tt, un = me / At, bt = ee + ht * Vt - ht * un, ln = Math.max(0, me - un), Ut = Math.max(0, Math.min(ln, bt));
        pt.current = At, st.current = Ut, I(Ut), N(At);
      }
    };
    return Le.addEventListener("wheel", Re, { passive: !1, capture: !0 }), () => Le.removeEventListener("wheel", Re, { capture: !0 });
  }, [e, t, N, I]);
  const gn = u.useCallback(() => {
    f ? f() : (st.current = 0, pt.current = 1, I == null || I(0), N == null || N(1));
  }, [f, I, N]), Lt = u.useCallback((Le, Re) => {
    if (p)
      p(Le, Re);
    else {
      const Je = Math.max(1e3, Re - Le), dt = Math.max(500, Je * 0.05), Tt = Math.max(0, Le - dt), me = Math.min(c, Re + dt) - Tt, ve = Math.max(32, c / 2e3), q = Math.max(1, Math.min(ve, Number((c / me).toFixed(1)))), Oe = c / q, _e = Math.max(0, Math.min(Tt, c - Oe));
      st.current = _e, pt.current = q, I == null || I(_e), N == null || N(q);
    }
  }, [p, c, I, N]), Cn = u.useCallback((Le, Re = "center") => {
    if (v)
      v(Le, Re);
    else {
      if (Le == null) return;
      const Je = pt.current || 1, dt = c / Math.max(1, Je), Tt = Re === "start" ? dt / 4 : dt * 0.75, ee = Math.max(0, Math.min(Le - Tt, c - dt));
      st.current = ee, I == null || I(ee);
    }
  }, [v, c, I]), gt = u.useCallback(() => {
    Ee((Le) => !Le);
  }, [Ee]), mt = u.useCallback(async () => {
    var dt;
    if (!t || Math.abs(w - g) < 1e3) return;
    const Le = (re || "NONE").toUpperCase().replace("-", "_");
    let Re;
    Le === "NONE" || Le === "OFF" ? Re = "None" : Le === "CAPTION" ? Re = "Caption" : Re = "BurnIn";
    const Je = {
      createdBy: _p(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(g),
      outEpochMs: a + Math.round(w),
      keystrokeMode: Re,
      layoutMode: Ae ? Me : "mon-0",
      targetDisplayId: !Ae || Me === "mon-0" || Me === "mon-1" || Me.startsWith("mon-") ? Ae ? Me : "mon-0" : null,
      isPipSwapped: Ge,
      directorSegments: Ae ? (K == null ? void 0 : K.segments) || ((dt = t == null ? void 0 : t.directorPlan) == null ? void 0 : dt.segments) || [] : []
    };
    try {
      y ? await y(Je) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Je)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Je)
      });
    } catch (Tt) {
      console.warn("[SoloSpotlightModal] Export trigger error:", Tt);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, g, w, a, y, re, Me, Ge, K]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Le = (Re) => {
      if ((Re.ctrlKey || Re.metaKey) && (Re.key === "e" || Re.key === "E")) {
        Re.preventDefault(), mt();
        return;
      }
      if (Re.key === "?" || Re.shiftKey && Re.code === "Slash") {
        Re.preventDefault(), H((Je) => !Je);
        return;
      }
      if (B) {
        Re.key === "Escape" && H(!1);
        return;
      }
      if (Re.key === "Escape" || Re.code === "Escape") {
        Re.preventDefault(), Re.stopPropagation(), o == null || o();
        return;
      }
      if (Re.code === "Space") {
        Re.preventDefault(), gt();
        return;
      }
      if (Re.code === "KeyI") {
        Re.preventDefault(), T(Math.max(0, Math.min(D, w - 1e3)));
        return;
      }
      if (Re.code === "KeyO") {
        Re.preventDefault(), C(Math.min(c, Math.max(D, g + 1e3)));
        return;
      }
      if (Re.code === "ArrowLeft" || Re.code === "ArrowRight") {
        Re.preventDefault(), Ee(!1);
        const Je = Re.code === "ArrowLeft";
        let dt;
        if (Re.ctrlKey || Re.metaKey)
          dt = 33;
        else if (Re.shiftKey)
          dt = 5e3;
        else {
          const Tt = Math.max(1, d);
          dt = Math.max(33, Math.round(1e3 / Tt));
        }
        x((Tt) => {
          const ee = Je ? Tt - dt : Tt + dt;
          return Math.max(0, Math.min(c, ee));
        });
        return;
      }
      if (Re.key === "ArrowDown") {
        Re.preventDefault();
        const Je = r.findIndex((dt) => dt.id === t.id);
        if (Je !== -1) {
          const dt = (Je + 1) % r.length;
          l(r[dt].id);
        }
        return;
      }
      if (Re.key === "ArrowUp") {
        Re.preventDefault();
        const Je = r.findIndex((dt) => dt.id === t.id);
        if (Je !== -1) {
          const dt = (Je - 1 + r.length) % r.length;
          l(r[dt].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Le, { capture: !0 }), () => window.removeEventListener("keydown", Le, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    D,
    g,
    w,
    c,
    d,
    T,
    C,
    x,
    mt,
    gt,
    Ee,
    B
  ]);
  const qe = r.findIndex((Le) => Le.id === (t && t.id)), Xe = r[qe - 1], Ot = r[qe + 1];
  if (!e || !t) return null;
  const Bt = k > 0 ? k : Math.round(a + D);
  return Gs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      oe && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${oe.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          oe.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          oe.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          oe.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: oe.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            ih(w - g),
            " (",
            Et(a + g, i),
            " → ",
            Et(a + w, i),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Fx,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: c,
            playheadMs: D,
            setPlayheadMs: x,
            isPlaying: Fe,
            setIsPlaying: Ee,
            playbackSpeed: V,
            timeMode: i,
            inPointMs: g,
            outPointMs: w,
            isLooping: Ce,
            recordingSegments: h,
            globalGaps: ue,
            showWatermark: !0,
            directorPlan: K || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: _,
            onResetOverride: X,
            viewMode: Me,
            onViewModeChange: xe,
            isPipSwapped: Ge,
            onPipSwapChange: He
          }
        ),
        /* @__PURE__ */ s.jsx(
          Bx,
          {
            currentEpochMs: Bt,
            keystrokes: E,
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
              onClick: (Le) => {
                Le.preventDefault(), Le.stopPropagation(), o == null || o();
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
              onClick: () => H(!0),
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
              disabled: !Xe,
              onClick: () => Xe && l(Xe.id),
              title: Xe ? `Previous: ${Xe.displayName || Xe.roleAlias || Xe.hostname || Xe.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            qe + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !Ot,
              onClick: () => Ot && l(Ot.id),
              title: Ot ? `Next: ${Ot.displayName || Ot.roleAlias || Ot.hostname || Ot.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${Fe ? "is-playing-dimmed" : ""}`, ref: wt, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: ih(w - g) })
            ] }),
            (() => {
              const Le = Me === "mon-0" ? "SCREEN 1" : Me === "mon-1" ? "SCREEN 2" : Me.startsWith("mon-") ? `SCREEN ${parseInt(Me.slice(4)) + 1}` : Me.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: mt,
                  title: `Export Selected Cut Window as ${Le} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: Me === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Le})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            _c,
            {
              activeStationId: t.id,
              isPlaying: Fe,
              setIsPlaying: gt,
              isLooping: Ce,
              setIsLooping: Qe,
              playbackSpeed: V,
              onChangeSpeed: ae,
              baseEpochMs: a,
              timeMode: i,
              totalDurationMs: c,
              inPointMs: g,
              setInPointMs: T,
              outPointMs: w,
              setOutPointMs: C,
              onSetInPoint: () => T(Math.max(0, Math.min(D, w - 1e3))),
              onSetOutPoint: () => C(Math.min(c, Math.max(D, g + 1e3))),
              onStepFrameBackward: () => {
                Ee(!1), x((Le) => Math.max(0, Le - 33));
              },
              onStepFrameForward: () => {
                Ee(!1), x((Le) => Math.min(c, Le + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: Et(a + D, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Op,
          {
            stations: Jt,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: i,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: N,
            onZoomReset: gn,
            onFitRange: Lt,
            onJumpViewportTo: Cn,
            viewportStartMs: S,
            onViewportStartChange: I,
            playheadMs: D,
            setPlayheadMs: (Le) => {
              Ee(!1), x(Le);
            },
            inPointMs: g,
            setInPointMs: T,
            outPointMs: w,
            setOutPointMs: C,
            recordingSegments: h,
            onExport: mt,
            onEstimateLoaded: (Le) => {
              Le != null && Le.removedGlobalGaps && ie(Le.removedGlobalGaps);
            },
            keystrokeMode: re,
            onChangeKeystrokeMode: Z,
            keystrokes: E,
            showKeystrokes: U,
            showRulerKeystrokes: U,
            onToggleRulerKeystrokes: P,
            onSplitDirectorSegment: te,
            onChangeDirectorSegmentDisplay: ne,
            onResetDirectorSegmentToAuto: X
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Fp,
        {
          isOpen: B,
          onClose: () => H(!1)
        }
      )
    ] }),
    document.body
  );
}
function Bp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), a = u.useRef(!1), i = u.useRef(0), [c, d] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [N, f] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), p = u.useCallback(async () => {
    if (!a.current && !(typeof document < "u" && document.hidden)) {
      a.current = !0;
      try {
        let h = await fetch("/api/v1/extractor-advanced/jobs");
        if (h.ok || (h = await fetch("/api/v1/extractor/jobs")), h.ok) {
          i.current = 0;
          const A = await h.json(), y = Array.isArray(A) ? A : [];
          n(y), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: y }));
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
    let h = !0, A = null;
    const y = () => {
      if (!h) return;
      let O = 2500;
      typeof document < "u" && document.hidden ? O = 3e4 : i.current > 0 && (O = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), A = setTimeout(async () => {
        await p(), y();
      }, O);
    }, b = () => {
      !document.hidden && h && (clearTimeout(A), i.current = 0, p().then(y));
    };
    return document.addEventListener("visibilitychange", b), p().then(y), () => {
      h = !1, clearTimeout(A), document.removeEventListener("visibilitychange", b);
    };
  }, [p]), u.useEffect(() => {
    const h = () => {
      f(!0), p();
    };
    return window.addEventListener("open-export-monitor", h), () => window.removeEventListener("open-export-monitor", h);
  }, [p]), u.useEffect(() => {
    if (!N || c) return;
    const h = (A) => {
      o.current && !o.current.contains(A.target) && !A.target.closest(".export-floating-hud") && f(!1);
    };
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [N, c]);
  const v = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && v)
    return null;
  const S = t.filter((h) => h.status === "Processing" || h.status === "Queued"), I = t.filter((h) => h.status === "Completed" || h.isCompleted), D = () => {
    d((h) => {
      const A = !h;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(A));
      } catch {
      }
      return A;
    });
  }, k = () => {
    f(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, x = (h, A) => {
    A.stopPropagation(), !(!h || r.has(h)) && (l((y) => new Set(y).add(h)), setTimeout(() => {
      n((y) => {
        const b = y.filter((O) => (O.jobId || O.id) !== h);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: b })), b;
      }), l((y) => {
        const b = new Set(y);
        return b.delete(h), b;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${h}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}`, { method: "DELETE" })).catch((y) => console.warn("[ExportJobMonitor] Dismiss failed:", y)));
  }, g = async (h, A) => {
    A.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${h}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}/bookmark`, { method: "POST" })), p();
    } catch (y) {
      console.warn("[ExportJobMonitor] Bookmark failed:", y);
    }
  }, T = (h, A) => {
    A.stopPropagation();
    const y = h.networkFolderPath || (h.outputFilePath ? h.outputFilePath.substring(0, h.outputFilePath.lastIndexOf("\\")) : "");
    y && (navigator.clipboard.writeText(y), alert(`UNC Directory Path copied to clipboard:
${y}`));
  }, w = (h) => {
    const A = h.jobId || h.id, y = `/api/v1/extractor-advanced/jobs/${A}/download`, b = document.createElement("a");
    b.href = y, b.download = h.fileName || `archive_${A}.tar`, document.body.appendChild(b), b.click(), document.body.removeChild(b), setTimeout(p, 1e3);
  }, C = (h) => {
    if (!h || h <= 0) return "0 B";
    const A = h / (1024 * 1024);
    return A >= 1e3 ? `${(A / 1024).toFixed(2)} GB` : `${A.toFixed(1)} MB`;
  };
  return t.length === 0 && !N ? null : Gs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !N && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${S.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${S.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: S.length > 0 ? `EXPORTS: ${S.length} PACKAGING` : `${I.length} ARCHIVE${I.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${S.length > 0 ? "" : "ready"}`, children: S.length > 0 ? `${S[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      N && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && f(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (h) => h.stopPropagation(), children: [
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
                onClick: D,
                title: c ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: c ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: k, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((h) => {
          const A = h.status === "Completed" || h.isCompleted, y = h.status === "Failed" || h.isFailed, b = h.status === "Processing" || h.status === "Queued", O = h.jobId || h.id, z = r.has(O), $ = A ? 100 : Math.round(h.progressPercent || h.progressPercentage || h.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${h.status.toLowerCase()} ${h.isBookmarked ? "is-bookmarked" : ""} ${z ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${h.status.toLowerCase()}`, children: A ? "READY" : h.status }),
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
                      onClick: (W) => x(O, W),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                b && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: h.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      $,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, $)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      C(h.fileSizeBytes)
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
                A && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "OPERATOR" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val highlight-cyan", title: h.createdBy || "Guest Operator", children: [
                      "👤 ",
                      h.createdBy || "Guest Operator"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: C(h.fileSizeBytes) })
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
                A && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${h.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (W) => g(O, W),
                        title: h.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: h.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (W) => T(h, W),
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
                      onClick: () => w(h),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                y && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  h.errorMessage || h.error || "Export failed"
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
function zx({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const l = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const d = (f) => {
      f.key === "Escape" && (t == null || t());
    }, N = (f) => {
      l.current && !l.current.contains(f.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", N), window.addEventListener("keydown", d), () => {
      window.removeEventListener("mousedown", N), window.removeEventListener("keydown", d);
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
function Hx({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 1920, a = r.canvasHeight || 1080, i = o / a;
  let c;
  Math.abs(i - 32 / 9) < 0.15 ? c = "32:9 Dual Screen" : Math.abs(i - 21 / 9) < 0.15 ? c = "21:9 Ultrawide" : Math.abs(i - 16 / 10) < 0.15 ? c = "16:10 WUXGA" : Math.abs(i - 4 / 3) < 0.15 ? c = "4:3 Standard" : Math.abs(i - 16 / 9) < 0.15 ? c = "16:9 Broadcast" : c = `${Math.round(i * 100) / 100}:1 Custom`;
  const d = (h) => {
    const A = Math.round(h * i);
    return A - A % 2;
  }, N = (h, A) => {
    const y = Math.round(h * A / 2073600 * 6 * 10) / 10, b = Math.round(y * 60 / 8 * 10) / 10;
    return `~${y} Mbps (~${b} MB/min)`;
  }, f = [
    {
      id: "NATIVE",
      badge: `Native 1:1 (${o}×${a})`,
      res: `${o} × ${a}`,
      bitrate: N(o, a),
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
  ], [p, v] = u.useState("BurnIn"), [S, I] = u.useState(r.resolution || "NATIVE"), [D, k] = u.useState(!1);
  if (!e) return null;
  const x = async () => {
    k(!0);
    try {
      await n(p, S), t();
    } finally {
      k(!1);
    }
  }, g = (r.layout || "DIRECTOR").toUpperCase(), T = r.stationsCount || 1, w = r.audioSegmentsCount || 1, C = f.find((h) => h.id === S) || f[0];
  return Gs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (h) => h.stopPropagation(), children: [
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
              g,
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
              a,
              " (Ratio ",
              i.toFixed(2),
              ":1)"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "TARGET RESOLUTION:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value highlight", children: [
              C.res,
              " (",
              C.badge,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "ACTIVE STATIONS:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value", children: [
              T,
              " WORKSTATION",
              T > 1 ? "S" : ""
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUDIO MASTER MIX:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: w > 1 ? `DYNAMIC ROUTING (${w} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK & DISPLAY TOPOLOGY HUD)" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "UTC WALL CLOCK:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value enabled", children: [
              "PERMANENT (BURNED-IN AT ",
              (typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "TOP-RIGHT").toUpperCase(),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: f.map((h) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${S === h.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: h.id,
              checked: S === h.id,
              onChange: () => I(h.id)
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "quality-card-body", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "quality-card-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "quality-badge", children: h.badge }),
              /* @__PURE__ */ s.jsx("span", { className: "quality-res", children: h.res })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-metric", children: h.bitrate }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-desc", children: h.desc })
          ] })
        ] }, h.id)) }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT KEYSTROKE PRESENTATION" }),
        /* @__PURE__ */ s.jsxs("div", { className: "modes-grid", children: [
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${p === "BurnIn" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "BurnIn",
                checked: p === "BurnIn",
                onChange: () => v("BurnIn")
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "mode-content", children: [
              /* @__PURE__ */ s.jsx("div", { className: "mode-name", children: "HARD BURN-IN (IN-PLACE ON VIDEO)" }),
              /* @__PURE__ */ s.jsx("div", { className: "mode-desc", children: "Permanently bakes keystrokes directly onto the video pixels at the exact coordinate position of each screen for unalterable forensic evidence." })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${p === "None" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "None",
                checked: p === "None",
                onChange: () => v("None")
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: D, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: x, disabled: D, children: D ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${C.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Kx(e, t, n, r, l = null) {
  const [o, a] = u.useState([]), [i, c] = u.useState({}), [d, N] = u.useState(!1), f = u.useRef(o);
  f.current = o;
  const p = u.useCallback(async () => {
    if (isNaN(e)) return;
    const I = e + t;
    N(!0);
    try {
      const D = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(I),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${D.toString()}`);
      if (k.ok) {
        const x = k.headers.get("content-type");
        if (x && x.includes("application/json")) {
          const g = await k.json(), w = (Array.isArray(g) ? g : g.stations || g.items || []).filter((C) => (C.recordingsCount || (C.segments ? C.segments.length : 0)) > 0).map((C) => {
            var h, A;
            return {
              id: String(C.id || C.stationId || C.agentId || C.hostname),
              hostname: C.hostname || "Station",
              roleAlias: C.roleAlias || null,
              roleHistory: C.roleHistory || [],
              displayName: C.displayName || C.roleAlias || C.hostname || "Station",
              isOnline: C.isOnline !== void 0 ? C.isOnline : !0,
              recordingsCount: C.recordingsCount || 0,
              segments: C.segments || [],
              displays: C.displays || C.Displays || ((h = C.displayTopology) == null ? void 0 : h.displays) || ((A = C.DisplayTopology) == null ? void 0 : A.Displays) || [],
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
            if (!C || C.length === 0) return w;
            const h = new Map(C.map((b) => [b.id, b]));
            let A = C.length !== w.length;
            const y = w.map((b) => {
              const O = h.get(b.id);
              return O ? O.isOnline === b.isOnline && O.displayName === b.displayName && O.roleAlias === b.roleAlias && O.feedSpec === b.feedSpec && O.recordingsCount === b.recordingsCount && O.fps === b.fps ? O : (A = !0, { ...O, ...b }) : (A = !0, b);
            });
            return A ? y : C;
          });
        }
      }
    } catch (D) {
      console.warn("[useStudioData] Failed fetching active stations:", D);
    } finally {
      N(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    p();
  }, [p]);
  const v = u.useMemo(() => {
    const I = /* @__PURE__ */ new Set();
    return o.forEach((D) => {
      D.id && I.add(D.id), D.hostname && I.add(D.hostname);
    }), Array.from(I).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!v || isNaN(e)) {
      c({});
      return;
    }
    let I = !0;
    return (async () => {
      try {
        const k = e + t, x = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(v)}&startEpoch=${e}&endEpoch=${k}`);
        if (x.ok && I) {
          const g = await x.json() || {}, T = {};
          (f.current || []).forEach((w) => {
            const C = g[w.id] || g[w.hostname] || g[w.displayName] || [];
            T[w.id] = C, T[w.hostname] = C;
          }), Object.keys(g).forEach((w) => {
            T[w] || (T[w] = g[w]);
          }), c(T);
        }
      } catch {
        I && c({});
      }
    })(), () => {
      I = !1;
    };
  }, [v, e, t]);
  const S = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let I = 1 / 0, D = -1 / 0;
    o.forEach((T) => {
      (i[T.id] || i[T.hostname] || T.segments || []).forEach((C) => {
        const h = C.startEpochMs ?? C.startEpoch ?? 0, A = C.endEpochMs ?? C.endEpoch ?? 0;
        h > 0 && h < I && (I = h), A > 0 && A > D && (D = A);
      });
    });
    let k = 1 / 0, x = -1 / 0;
    l && (i[l] || []).forEach((w) => {
      const C = w.startEpochMs ?? w.startEpoch ?? 0, h = w.endEpochMs ?? w.endEpoch ?? 0;
      C > 0 && C < k && (k = C), h > 0 && h > x && (x = h);
    });
    const g = (T) => T === 1 / 0 || T === -1 / 0 ? null : Math.max(0, Math.min(t, T - e));
    return {
      globalFirstMs: g(I),
      globalLastMs: g(D),
      currentFirstMs: g(k),
      currentLastMs: g(x)
    };
  }, [o, i, l, e, t]);
  return {
    allStations: o,
    setAllStations: a,
    recordingSegments: i,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: p,
    movieBoundaries: S
  };
}
function Vx({
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
  initialPlaybackSpeed: N = 1,
  isGridMode: f = !1
}) {
  const [p, v] = u.useState(i), [S, I] = u.useState(c), [D, k] = u.useState(d), [x, g] = u.useState(N), T = u.useRef(null), w = u.useRef(null), C = o || l, h = u.useMemo(() => C ? a[C.id] || C.segments || [] : [], [C, a]), A = h.some((z) => {
    const $ = z.startEpochMs ?? z.startEpoch ?? 0, W = z.endEpochMs ?? z.endEpoch ?? 0, se = e + p;
    return se >= $ && se <= W;
  }), y = !!(!f && C && A);
  u.useEffect(() => {
    v((z) => z < t ? t : z > n ? (I(!1), n) : z);
  }, [t, n]);
  const b = u.useCallback((z) => {
    T.current || (T.current = z);
    const $ = (z - T.current) * x, W = Math.min($, 250 * x);
    T.current = z, v((se) => {
      let re = se + W;
      if (r && r.length > 0) {
        const Z = e + re, E = r.find((U) => Z >= U.startEpochMs && Z < U.endEpochMs);
        E && (re = E.endEpochMs - e);
      }
      return re >= n && (D ? re = t : (I(!1), re = n)), re;
    }), S && (!y || f) && (w.current = requestAnimationFrame(b));
  }, [S, D, t, n, r, e, y, x, f]);
  u.useEffect(() => (S && (!y || f) ? (T.current = performance.now(), w.current = requestAnimationFrame(b)) : (w.current && cancelAnimationFrame(w.current), T.current = null), () => {
    w.current && cancelAnimationFrame(w.current);
  }), [S, b, y, f]);
  const O = u.useCallback(() => {
    if (S)
      I(!1);
    else {
      let z = p;
      const $ = e + z, W = r == null ? void 0 : r.find((se) => $ >= se.startEpochMs && $ < se.endEpochMs);
      if (W)
        z = W.endEpochMs - e;
      else if (C && !A) {
        const se = h.map((re) => ({ start: re.startEpochMs ?? re.startEpoch ?? 0, end: re.endEpochMs ?? re.endEpoch ?? 0 })).filter((re) => re.start > $).sort((re, Z) => re.start - Z.start)[0];
        se && (z = se.start - e);
      }
      z !== p && v(z), I(!0);
    }
  }, [S, p, e, r, C, A, h]);
  return {
    playheadMs: p,
    setPlayheadMs: v,
    isPlaying: S,
    setIsPlaying: I,
    isLooping: D,
    setIsLooping: k,
    playbackSpeed: x,
    setPlaybackSpeed: g,
    togglePlaySmart: O
  };
}
function Yx(e) {
  return 1 - Math.pow(1 - e, 3);
}
function Gx({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [a, i] = u.useState(r), c = u.useRef(null), d = u.useRef(a);
  d.current = a;
  const N = u.useRef(l);
  N.current = l;
  const f = u.useRef(t);
  f.current = t;
  const p = Math.max(32, t / 2e3), v = t / l, S = u.useCallback((x, g = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const T = d.current, w = x - T;
    if (Math.abs(w) < 1) return;
    const C = performance.now(), h = (A) => {
      const y = A - C, b = Math.min(1, y / g);
      i(Math.round(T + w * Yx(b))), b < 1 ? c.current = requestAnimationFrame(h) : c.current = null;
    };
    c.current = requestAnimationFrame(h);
  }, []), I = u.useCallback((x, g) => {
    const T = Math.max(1e3, g - x), w = Math.max(500, T * 0.05), C = Math.max(0, x - w), A = Math.min(t, g + w) - C, y = Math.max(1, Math.min(p, Number((t / A).toFixed(1)))), b = t / y, O = Math.max(0, Math.min(C, t - b));
    S(O), o(y);
  }, [t, p, S]), D = u.useCallback(() => {
    S(0), o(1);
  }, [S]), k = u.useCallback((x, g = "center") => {
    if (x == null) return;
    const T = g === "start" ? v / 4 : v * 0.75, w = Math.max(0, Math.min(x - T, t - v));
    S(w);
  }, [v, t, S]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let x = null;
    const g = (w) => {
      if (w.defaultPrevented) return;
      w.preventDefault(), w.stopPropagation();
      const C = w.ctrlKey || w.shiftKey, h = N.current, A = d.current, y = f.current;
      if (C) {
        const b = Math.abs(w.deltaX) > Math.abs(w.deltaY) ? w.deltaX : w.deltaY;
        if (b === 0) return;
        const O = y / Math.max(1, h), z = Math.max(0, y - O), $ = O * 0.08 * (b > 0 ? 1 : -1);
        i((W) => Math.max(0, Math.min(z, W + $)));
      } else {
        if (w.deltaY === 0) return;
        const O = w.deltaY < 0 ? 1.25 : 0.8, z = Math.max(32, y / 2e3), $ = x ? x.getBoundingClientRect() : { left: 0, width: window.innerWidth }, W = Math.max(0, Math.min($.width, w.clientX - $.left)), se = $.width > 0 ? W / $.width : 0.5;
        o((re) => {
          const Z = Math.max(1, Math.min(z, Math.round(re * O * 100) / 100));
          if (Z === re) return re;
          const E = y / re, U = y / Z, K = A + se * E - se * U, _ = Math.max(0, y - U);
          return i(Math.max(0, Math.min(_, K))), Z;
        });
      }
    }, T = () => {
      const w = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return w && !x ? (x = w, x.addEventListener("wheel", g, { passive: !1, capture: !0 }), !0) : !!x;
    };
    if (!T()) {
      const w = setInterval(() => {
        T() && clearInterval(w);
      }, 100);
      return () => {
        clearInterval(w), x && x.removeEventListener("wheel", g, { capture: !0 });
      };
    }
    return () => {
      x && x.removeEventListener("wheel", g, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: a,
    setViewportStartMs: i,
    viewportDurationMs: v,
    animateViewportTo: S,
    fitRange: I,
    resetZoom: D,
    jumpViewportTo: k
  };
}
function Xx({
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
  outPointMs: N,
  setOutPointMs: f,
  totalTimelineDurationMs: p,
  zoomLevel: v = 1,
  togglePlaySmart: S,
  onToggleHelpModal: I,
  onSplitDirectorAtPlayhead: D,
  isModalActive: k = !1,
  hasGridPlacements: x = !0,
  onToggleGridFullscreen: g,
  isGridFullscreen: T = !1,
  onExitGridFullscreen: w
}) {
  u.useEffect(() => {
    const C = (h) => {
      const A = h.target;
      if (!(A.tagName === "INPUT" || A.tagName === "TEXTAREA" || A.tagName === "SELECT" || A.isContentEditable || A.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), I == null || I();
          return;
        }
        if (!(k || t)) {
          if (h.code === "KeyI" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), d == null || d(Math.max(0, Math.min(a, N - 1e3)));
            return;
          }
          if (h.code === "KeyO" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), f == null || f(Math.min(p, Math.max(a, c + 1e3)));
            return;
          }
          if (h.code === "KeyX" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), d == null || d(0), f == null || f(p);
            return;
          }
          if (h.code === "KeyL" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), o == null || o((b) => b <= 0 ? 1 : b === 1 ? 2 : b === 2 ? 4 : b >= 4 ? 8 : 1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-forward"));
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
              h.preventDefault(), D == null || D();
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
            if (h.preventDefault(), !x) return;
            S();
            return;
          }
          if (h.code === "KeyF" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), g == null || g();
            return;
          }
          if ((h.key === "Escape" || h.code === "Escape") && T) {
            h.preventDefault(), w == null || w();
            return;
          }
          if (h.key === "Home") {
            h.preventDefault(), i == null || i(c);
            return;
          }
          if (h.key === "End") {
            h.preventDefault(), i == null || i(N);
            return;
          }
          if (h.code === "ArrowLeft" || h.code === "ArrowRight") {
            h.preventDefault();
            const b = h.code === "ArrowLeft";
            let O;
            if (h.ctrlKey || h.metaKey)
              O = 33;
            else if (h.shiftKey)
              O = 5e3;
            else {
              const z = Math.max(1, v);
              O = Math.max(33, Math.round(1e3 / z));
            }
            i == null || i((z) => {
              const $ = b ? z - O : z + O;
              return Math.max(0, Math.min(p, $));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const b = n.findIndex((O) => O.id === e);
            if (b === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const O = (b + 1) % n.length;
              l(n[O].id), o(1);
            } else {
              const O = (b - 1 + n.length) % n.length;
              l(n[O].id), o(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", C, { capture: !0 }), () => window.removeEventListener("keydown", C, { capture: !0 });
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
    N,
    f,
    p,
    v,
    S,
    I,
    D,
    k,
    x,
    g,
    T,
    w
  ]);
}
const ch = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = Qd(n, e), l = Qd(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, Kl = (e, t = null, n = "LOCAL") => {
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
    const c = o.substring(0, 8), d = $c(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const a = r.replace(" ", "T"), i = new Date(a).getTime();
  return isNaN(i) ? Date.now() : i;
};
function Qx() {
  var Al, $l;
  const e = u.useMemo(() => Mg() || {}, []), [t, n] = u.useState(() => {
    var M, le;
    return (M = e.timeRange) != null && M.startEpochMs && ((le = e.timeRange) != null && le.endEpochMs) ? e.timeRange : ch();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    kg().catch((M) => console.warn("[Studio] DST init error:", M));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Kl(t.start), [t.start, t.startEpochMs]), N = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - N, [d, N]), p = u.useMemo(() => t.durationMs + 2 * N, [t.durationMs, N]), [v, S] = u.useState(e.selectedStationIds || []), [I, D] = u.useState(e.activeStationId || null), [k, x] = u.useState(null), [g, T] = u.useState(null), [w, C] = u.useState([]), [h, A] = u.useState(!1), [y, b] = u.useState(null), [O, z] = u.useState(() => {
    var M;
    return e.compositionScope || (((M = e.selectedStationIds) == null ? void 0 : M.length) > 1 ? "inter-station" : "intra-station");
  }), [$, W] = u.useState(() => {
    try {
      const M = localStorage.getItem("itb_composition_layout");
      if (M) return M;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), se = u.useCallback((M) => {
    W((le) => {
      const de = typeof M == "function" ? M(le) : M;
      try {
        localStorage.setItem("itb_composition_layout", de);
      } catch {
      }
      return de;
    });
  }, []), [re, Z] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [E, U] = u.useState(() => !!e.isPipSwapped), [P, K] = u.useState(() => e.audioRoutingPlan || null), [_, te] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [ne, X] = u.useState(!1), [J, $e] = u.useState(null), [Fe, Ee] = u.useState(() => e.canvasLayoutTimeline || null), [Ye, Ie] = u.useState(0), Ce = u.useCallback((M) => {
    Ee((le) => {
      const de = [...(le == null ? void 0 : le.keyframes) || []], ye = de.findIndex((Be) => Math.abs(Be.timestampEpochMs - M) < 300);
      if (ye >= 0)
        return Ie(ye), le;
      const we = de[Ye] || de[0], Ne = (we == null ? void 0 : we.layout) || J || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Se = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(M),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Ne))
      }, Te = [...de, Se].sort((Be, Ue) => Be.timestampEpochMs - Ue.timestampEpochMs), Ke = Te.findIndex((Be) => Be.timestampEpochMs === Math.round(M));
      return Ie(Ke >= 0 ? Ke : 0), {
        ...le || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: Te
      };
    });
  }, [Ye, J]), Qe = u.useCallback((M, le) => {
    Ee((de) => !(de != null && de.keyframes) || de.keyframes.length === 0 ? de : Oc(de, M, le));
  }, []), ct = u.useCallback((M) => {
    Ee((le) => {
      if (!(le != null && le.keyframes) || le.keyframes.length <= 1) return le;
      const de = le.keyframes.filter((ye, we) => we !== M);
      return Ie((ye) => Math.max(0, ye - 1)), { ...le, keyframes: de };
    });
  }, []), R = u.useCallback((M, le) => {
    Ee((de) => {
      if (!(de != null && de.keyframes) || de.keyframes.length === 0) return de;
      const ye = Math.round(le), we = typeof M == "number" && de.keyframes[M] ? M : de.keyframes.findIndex((Te) => Te.id === M);
      if (we === -1) return de;
      const Ne = [...de.keyframes];
      Ne[we] = {
        ...Ne[we],
        timestampEpochMs: ye
      }, Ne.sort((Te, Ke) => Te.timestampEpochMs - Ke.timestampEpochMs);
      const Se = Ne.findIndex((Te) => Te.timestampEpochMs === ye);
      return Se >= 0 && Ie(Se), {
        ...de,
        keyframes: Ne
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [V, ae] = u.useState({}), oe = u.useCallback((M) => {
    S((le) => le.filter((de) => de !== M)), I === M && D(null), k === M && x(null), Ee((le) => {
      if (!le || !le.keyframes) return le;
      const de = le.keyframes.map((ye) => {
        var we;
        return {
          ...ye,
          layout: {
            ...ye.layout,
            placements: (((we = ye.layout) == null ? void 0 : we.placements) || []).filter((Ne) => Ne.stationId !== M)
          }
        };
      });
      return { ...le, keyframes: de };
    });
  }, [I, k]), Q = u.useCallback((M, le) => {
    M.preventDefault(), M.stopPropagation();
    const de = 195, ye = 110, we = Math.min(M.clientX, window.innerWidth - de - 10), Ne = Math.min(M.clientY, window.innerHeight - ye - 10);
    b({ x: we, y: Ne, station: le });
  }, []), B = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(p, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(p, e.inPointMs)) : N, [e.inEpochMs, e.inPointMs, f, p, N]), H = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(B + 1e3, Math.min(p, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(B + 1e3, Math.min(p, e.outPointMs)) : N + t.durationMs, [e.outEpochMs, e.outPointMs, f, p, N, t.durationMs, B]), ue = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(p, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(p, e.playheadMs)) : B, [e.playheadEpochMs, e.playheadMs, f, p, B]), [ie, Ae] = u.useState(B), [Me, ze] = u.useState(H);
  u.useEffect(() => {
    if (!f) return;
    const M = Math.round(f + ie), le = Math.round(f + Me);
    Ee((de) => {
      var Te, Ke;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      let ye = [...de.keyframes], we = !1, Ne = ye.find((Be) => Be.tag === "cut-in");
      if (Ne)
        Ne.timestampEpochMs !== M && (Ne.timestampEpochMs = M, we = !0);
      else {
        const Be = ye.find((Ue) => Math.abs(Ue.timestampEpochMs - M) < 500);
        if (Be)
          Be.tag = "cut-in", Be.timestampEpochMs = M, we = !0;
        else {
          const Ue = ((Te = ye[0]) == null ? void 0 : Te.layout) || J || { width: 1920, height: 1080, placements: [] };
          ye.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: M,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ue))
          }), we = !0;
        }
      }
      let Se = ye.find((Be) => Be.tag === "cut-out");
      if (Se)
        Se.timestampEpochMs !== le && (Se.timestampEpochMs = le, we = !0);
      else {
        const Be = ye.find((Ue) => Math.abs(Ue.timestampEpochMs - le) < 500 && Ue.tag !== "cut-in");
        if (Be)
          Be.tag = "cut-out", Be.timestampEpochMs = le, we = !0;
        else {
          const Ue = ((Ke = ye[ye.length - 1]) == null ? void 0 : Ke.layout) || J || { width: 1920, height: 1080, placements: [] };
          ye.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: le,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ue))
          }), we = !0;
        }
      }
      return we ? (ye.sort((Be, Ue) => Be.timestampEpochMs - Ue.timestampEpochMs), {
        ...de,
        keyframes: ye
      }) : de;
    });
  }, [f, ie, Me, J]);
  const { allStations: xe, recordingSegments: Ge, isLoadingStations: He, movieBoundaries: wt } = Kx(
    f,
    p,
    t,
    r,
    I
  ), pt = u.useMemo(() => xe.find((M) => M.id === I) || null, [xe, I]), st = u.useCallback((M) => {
    ae((le) => {
      const de = !(le[M] ?? !0);
      return Ee((ye) => {
        if (!(ye != null && ye.keyframes)) return ye;
        const we = ye.keyframes.map((Ne) => {
          var Be;
          const Se = ((Be = Ne.layout) == null ? void 0 : Be.placements) || [];
          let Te = !1;
          const Ke = Se.map((Ue) => {
            if (Ue.stationId === M) {
              if (!de && (Ue.displayId === "auto" || !Ue.displayId)) {
                Te = !0;
                const tt = xe.find((Ze) => Ze.id === M);
                return {
                  ...Ue,
                  displayId: "mon-0",
                  label: `${(tt == null ? void 0 : tt.displayName) || M} - Screen 1 (Main)`
                };
              } else if (de && (Ue.displayId === "mon-0" || !Ue.displayId) && Se.filter((Ze) => Ze.stationId === M).length === 1) {
                Te = !0;
                const Ze = xe.find((Ct) => Ct.id === M);
                return {
                  ...Ue,
                  displayId: "auto",
                  label: `${(Ze == null ? void 0 : Ze.displayName) || M} - Central Composition (Auto-Director)`
                };
              }
            }
            return Ue;
          });
          return Te ? {
            ...Ne,
            layout: {
              ...Ne.layout,
              placements: Ke
            }
          } : Ne;
        });
        return { ...ye, keyframes: we };
      }), {
        ...le,
        [M]: de
      };
    });
  }, [xe]), Rt = u.useCallback((M, le) => {
    Ee((de) => {
      var Ue, tt;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      const ye = Ye >= 0 && Ye < de.keyframes.length ? Ye : 0, we = de.keyframes[ye], Ne = ((Ue = we == null ? void 0 : we.layout) == null ? void 0 : Ue.placements) || [], Se = (le || "mon-0").toLowerCase(), Te = Ne.findIndex((Ze) => {
        if (Ze.stationId !== M) return !1;
        const Ct = (Ze.displayId || "mon-0").toLowerCase();
        return Ct === Se || Ct === "auto" && (Se === "mon-0" || Se === "screen-0");
      });
      let Ke;
      if (Te >= 0)
        Ke = Ne.filter((Ze, Ct) => Ct !== Te);
      else {
        const Ze = xe.find((Rl) => Rl.id === M), Ct = ((tt = Ze == null ? void 0 : Ze.displays) == null ? void 0 : tt.find((Rl) => (Rl.displayId || "").toLowerCase() === Se)) || { width: 1920, height: 1080 }, nn = Ct.width || 1920, zt = Ct.height || 1080, fn = nn / zt, xs = fn >= 1 ? 640 : Math.round(360 * fn), Sr = fn >= 1 ? Math.round(640 / fn) : 360, Vr = {
          stationId: M,
          displayId: Se,
          label: `${(Ze == null ? void 0 : Ze.displayName) || M} - ${Ct.displayName || Se}`,
          x: 120 + Ne.length * 40 % 800,
          y: 100 + Ne.length * 40 % 500,
          width: xs,
          height: Sr,
          sourceWidth: nn,
          sourceHeight: zt,
          nativeAspectRatio: fn,
          aspectRatio: fn,
          zIndex: Ne.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ke = [...Ne, Vr];
      }
      const Be = [...de.keyframes];
      return Be[ye] = {
        ...Be[ye],
        layout: {
          ...Be[ye].layout,
          placements: Ke
        }
      }, { ...de, keyframes: Be };
    });
  }, [Ye, xe]), rt = u.useMemo(() => !v || v.length === 0 ? [] : xe.filter((M) => v.includes(M.id)), [xe, v]), Jt = u.useMemo(() => xe.find((M) => M.id === k) || null, [xe, k]), gn = !!(k && Jt), Lt = u.useRef("grid"), Cn = u.useRef(null), {
    playheadMs: gt,
    setPlayheadMs: mt,
    isPlaying: qe,
    setIsPlaying: Xe,
    playbackSpeed: Ot,
    setPlaybackSpeed: Bt,
    isLooping: cn,
    setIsLooping: Sn,
    togglePlaySmart: os
  } = Vx({
    timelineBaseEpochMs: f,
    inPointMs: ie,
    outPointMs: Me,
    globalGaps: w,
    activeStation: pt,
    spotlightStation: Jt,
    recordingSegments: Ge,
    initialPlayheadMs: ue,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !I
  }), {
    zoomLevel: Le,
    setZoomLevel: Re,
    viewportStartMs: Je,
    setViewportStartMs: dt,
    resetZoom: Tt,
    fitRange: ee,
    jumpViewportTo: me
  } = Gx({
    containerRef: Cn,
    totalTimelineDurationMs: p,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [ve, q] = u.useState(!1), [Oe, _e] = u.useState(!1), [et, Ve] = u.useState(!1), [ht, xt] = u.useState(!1), [At, Vt] = u.useState(
    !!(e.isWorkspaceActive && ((Al = e.selectedStationIds) == null ? void 0 : Al.length) > 0)
  ), [un, Dt] = u.useState([]);
  u.useEffect(() => {
    const M = gn && Jt || pt, le = (M == null ? void 0 : M.hostname) || (M == null ? void 0 : M.displayName) || (M == null ? void 0 : M.id), de = (o || "NONE").toUpperCase().replace("-", "_");
    if (!le || !f || !(de !== "NONE" && de !== "OFF" || i)) {
      Dt([]);
      return;
    }
    const we = Math.max(0, f - 5e3), Ne = f + p + 5e3, Se = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(le)}&startEpoch=${we}&endEpoch=${Ne}`, { signal: Se.signal }).then((Te) => Te.ok ? Te.json() : []).then((Te) => Dt(Array.isArray(Te) ? Te : [])).catch((Te) => {
      Te.name !== "AbortError" && Dt([]);
    }), () => Se.abort();
  }, [pt, Jt, gn, f, p, o, i]), u.useEffect(() => {
    He || (xe.length === 0 ? ((v.length > 0 || I || At) && (S([]), D(null), x(null), Vt(!1)), xt(!0), A(!0)) : (A(!1), S((M) => {
      const le = M.filter((de) => xe.some((ye) => ye.id === de));
      return le.length !== M.length ? (le.length === 0 && (Vt(!1), xt(!0)), le) : M;
    })));
  }, [He, xe]);
  const bt = u.useCallback((M) => {
    if (M === null) {
      Xe(!1), Bt(1), D(null);
      return;
    }
    M !== I && Bt(1), D(M);
  }, [I, Xe, Bt]), ln = u.useCallback((M, le = null) => {
    M !== I && Bt(1), Lt.current = v.length <= 1 || I ? "spotlight" : "grid", D(M), x(M), T(le || null);
  }, [I, v.length, Bt]), Ut = u.useCallback(() => {
    x(null), T(null), Lt.current === "grid" && D(null);
  }, []), jt = u.useMemo(() => {
    if (P != null && P.segments && P.segments.length > 0)
      return P;
    const M = v[0] || I || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          sourceStationId: M
        }
      ]
    };
  }, [P, v, I, f, p]), Nn = u.useCallback((M) => {
    K((le) => {
      const de = le || jt, ye = [...de.segments || []], we = ye.findIndex((tt) => {
        const Ze = tt.startEpochMs ?? tt.StartEpochMs ?? 0, Ct = tt.endEpochMs ?? tt.EndEpochMs ?? 0;
        return M > Ze + 500 && M < Ct - 500;
      });
      if (we === -1) return le;
      const Ne = ye[we], Se = Ne.startEpochMs ?? Ne.StartEpochMs ?? 0, Te = Ne.endEpochMs ?? Ne.EndEpochMs ?? 0, Ke = Ne.sourceStationId ?? Ne.SourceStationId ?? v[0], Be = { startEpochMs: Se, endEpochMs: M, sourceStationId: Ke }, Ue = { startEpochMs: M, endEpochMs: Te, sourceStationId: Ke };
      return ye.splice(we, 1, Be, Ue), { ...de, segments: ye };
    });
  }, [jt, v]), gs = u.useCallback((M, le) => {
    K((de) => {
      const ye = de || jt, we = (ye.segments || []).map((Ne) => {
        const Se = Ne.startEpochMs ?? Ne.StartEpochMs ?? 0, Te = Ne.endEpochMs ?? Ne.EndEpochMs ?? 0;
        return M >= Se && M <= Te ? { ...Ne, sourceStationId: le } : Ne;
      });
      return { ...ye, segments: we };
    }), te(!1);
  }, [jt]), Ls = u.useCallback((M, le) => {
    K((de) => {
      const ye = de || jt, we = (ye.segments || []).map((Ne) => {
        const Se = Ne.startEpochMs ?? Ne.StartEpochMs ?? 0, Te = Ne.endEpochMs ?? Ne.EndEpochMs ?? 0;
        return M >= Se && M <= Te ? { ...Ne, gain: le } : Ne;
      });
      return { ...ye, segments: we };
    });
  }, [jt]), jr = u.useCallback(() => {
    te((M) => !M);
  }, []), [bn, Ss] = u.useState({}), Mt = u.useCallback((M) => {
    if (!M) return null;
    if (bn[M]) return bn[M];
    const le = xe.find((de) => de.id === M);
    return le != null && le.directorPlan ? le.directorPlan : {
      stationId: M,
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [bn, xe, f, p]), $t = u.useCallback((M, le) => {
    M && Ss((de) => {
      const ye = de[M] || Mt(M), we = [...ye.segments || []], Ne = we.findIndex((Ct) => {
        const nn = Ct.startEpochMs ?? Ct.StartEpochMs ?? 0, zt = Ct.endEpochMs ?? Ct.EndEpochMs ?? 0;
        return le > nn + 500 && le < zt - 500;
      });
      if (Ne === -1) return de;
      const Se = we[Ne], Te = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Ke = Se.endEpochMs ?? Se.EndEpochMs ?? 0, Be = Se.targetDisplayId ?? Se.TargetDisplayId ?? "mon-0", Ue = !!(Se.isManualOverride ?? Se.IsManualOverride), tt = { ...Se, startEpochMs: Te, endEpochMs: le, targetDisplayId: Be, isManualOverride: Ue }, Ze = { ...Se, startEpochMs: le, endEpochMs: Ke, targetDisplayId: Be, isManualOverride: Ue };
      return we.splice(Ne, 1, tt, Ze), { ...de, [M]: { ...ye, segments: we } };
    });
  }, [Mt]), as = u.useCallback((M, le, de) => {
    M && Ss((ye) => {
      const we = ye[M] || Mt(M), Ne = [...we.segments || []];
      let Se = Ne.findIndex((Ke) => {
        const Be = Ke.startEpochMs ?? Ke.StartEpochMs ?? 0, Ue = Ke.endEpochMs ?? Ke.EndEpochMs ?? 0;
        return le > Be && le < Ue;
      });
      if (Se === -1 && (Se = Ne.findIndex((Ke) => {
        const Be = Ke.startEpochMs ?? Ke.StartEpochMs ?? 0, Ue = Ke.endEpochMs ?? Ke.EndEpochMs ?? 0;
        return le >= Be && le <= Ue;
      })), Se === -1) return ye;
      const Te = Ne[Se];
      return Ne[Se] = { ...Te, targetDisplayId: de, isManualOverride: !0 }, { ...ye, [M]: { ...we, segments: Ne } };
    });
  }, [Mt]), Un = u.useCallback((M, le) => {
    if (!M) return;
    const de = xe.find((we) => we.id === M), ye = de == null ? void 0 : de.directorPlan;
    Ss((we) => {
      var nn;
      const Ne = we[M] || Mt(M), Se = [...Ne.segments || []];
      let Te = Se.findIndex((zt) => {
        const fn = zt.startEpochMs ?? zt.StartEpochMs ?? 0, xs = zt.endEpochMs ?? zt.EndEpochMs ?? 0;
        return le > fn && le < xs;
      });
      if (Te === -1 && (Te = Se.findIndex((zt) => {
        const fn = zt.startEpochMs ?? zt.StartEpochMs ?? 0, xs = zt.endEpochMs ?? zt.EndEpochMs ?? 0;
        return le >= fn && le <= xs;
      })), Te === -1) return we;
      const Ke = Se[Te], Be = Ke.startEpochMs ?? Ke.StartEpochMs ?? 0, Ue = Ke.endEpochMs ?? Ke.EndEpochMs ?? 0, tt = (Be + Ue) / 2, Ze = (nn = ye == null ? void 0 : ye.segments) == null ? void 0 : nn.find((zt) => {
        const fn = zt.startEpochMs ?? zt.StartEpochMs ?? 0, xs = zt.endEpochMs ?? zt.EndEpochMs ?? 0;
        return tt >= fn && tt <= xs;
      }), Ct = Ze ? Ze.targetDisplayId ?? Ze.TargetDisplayId ?? "mon-0" : "mon-0";
      return Se[Te] = { ...Ke, targetDisplayId: Ct, isManualOverride: !1 }, { ...we, [M]: { ...Ne, segments: Se } };
    });
  }, [xe, Mt]);
  u.useEffect(() => {
    if (!rt || rt.length === 0 || isNaN(f)) return;
    const M = f + ie, le = f + Me;
    if (le <= M) return;
    const de = setTimeout(async () => {
      const ye = rt.filter((we) => {
        var Se;
        return (we.displays || we.Displays || ((Se = we.displayTopology) == null ? void 0 : Se.displays) || []).length > 1;
      });
      if (ye.length !== 0)
        for (const we of ye)
          try {
            const Ne = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(we.id)}&startEpoch=${M}&endEpoch=${le}`);
            if (Ne.ok) {
              const Se = await Ne.json();
              Se != null && Se.segments && Se.segments.length > 0 && Ss((Te) => {
                const Ke = Te[we.id] || we.directorPlan, Be = ((Ke == null ? void 0 : Ke.segments) || []).filter((tt) => tt.isManualOverride || tt.IsManualOverride);
                if (Be.length === 0)
                  return { ...Te, [we.id]: Se };
                const Ue = [...Se.segments];
                return Be.forEach((tt) => {
                  const Ze = tt.startEpochMs ?? tt.StartEpochMs, Ct = tt.endEpochMs ?? tt.EndEpochMs;
                  for (let nn = Ue.length - 1; nn >= 0; nn--) {
                    const zt = Ue[nn].startEpochMs ?? Ue[nn].StartEpochMs, fn = Ue[nn].endEpochMs ?? Ue[nn].EndEpochMs;
                    if (!(fn <= Ze || zt >= Ct))
                      if (zt >= Ze && fn <= Ct)
                        Ue.splice(nn, 1);
                      else if (zt < Ze && fn > Ct) {
                        const xs = { ...Ue[nn], endEpochMs: Ze }, Sr = { ...Ue[nn], startEpochMs: Ct };
                        Ue.splice(nn, 1, xs, Sr);
                      } else zt < Ze ? Ue[nn].endEpochMs = Ze : fn > Ct && (Ue[nn].startEpochMs = Ct);
                  }
                  Ue.push(tt);
                }), Ue.sort((tt, Ze) => (tt.startEpochMs ?? tt.StartEpochMs) - (Ze.startEpochMs ?? Ze.StartEpochMs)), { ...Te, [we.id]: { ...Se, segments: Ue } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(de);
  }, [ie, Me, rt, f]);
  const Er = u.useMemo(() => rt.map((M) => ({
    ...M,
    directorPlan: bn[M.id] || M.directorPlan || Mt(M.id)
  })), [rt, bn, Mt]), Mn = u.useMemo(() => pt ? {
    ...pt,
    directorPlan: bn[pt.id] || pt.directorPlan || Mt(pt.id)
  } : null, [pt, bn, Mt]), bs = u.useMemo(() => Jt ? {
    ...Jt,
    directorPlan: bn[Jt.id] || Jt.directorPlan || Mt(Jt.id)
  } : null, [Jt, bn, Mt]), De = (M, le = 30) => {
    const de = Math.max(0, M), ye = Math.floor(de / 1e3), we = Math.floor(ye / 3600), Ne = Math.floor(ye % 3600 / 60), Se = ye % 60, Te = Math.floor(de % 1e3 / 1e3 * le), Ke = (Be) => String(Be).padStart(2, "0");
    return `${Ke(we)}:${Ke(Ne)}:${Ke(Se)}.${Ke(Te)}`;
  }, [je, Os] = u.useState(!1), [To, Cr] = u.useState(!0), [Ao, $o] = u.useState(!1), Qn = u.useRef(null), on = u.useMemo(() => {
    var ye;
    const M = Fe == null ? void 0 : Fe.keyframes, le = (M == null ? void 0 : M[Ye]) || (M == null ? void 0 : M[0]);
    return (((ye = le == null ? void 0 : le.layout) == null ? void 0 : ye.placements) || (J == null ? void 0 : J.placements) || []).length > 0 || v && v.length > 0;
  }, [Fe, Ye, J, v]), Xt = u.useCallback(() => {
    Qn.current && clearTimeout(Qn.current), Cr(!0), Qn.current = setTimeout(() => {
      Ao || Cr(!1);
    }, 2500);
  }, [Ao]);
  u.useEffect(() => {
    if (!je) {
      Cr(!0), Qn.current && clearTimeout(Qn.current);
      return;
    }
    const M = (le) => {
      le.clientY >= window.innerHeight - 280 && Cr(!0), Xt();
    };
    return window.addEventListener("mousemove", M, { passive: !0 }), Xt(), () => {
      window.removeEventListener("mousemove", M), Qn.current && clearTimeout(Qn.current);
    };
  }, [je, Xt]);
  const xn = u.useCallback(() => {
    Os((M) => {
      const le = !M;
      return le ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), le;
    });
  }, []), dn = u.useCallback(() => {
    Os(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  u.useEffect(() => {
    const M = () => {
      !document.fullscreenElement && je && Os(!1);
    };
    return document.addEventListener("fullscreenchange", M), () => document.removeEventListener("fullscreenchange", M);
  }, [je]), Xx({
    activeStationId: I,
    spotlightStationId: k,
    timelineStations: Er,
    selectedStationIdsCount: v.length,
    onSelectActiveStation: bt,
    setPlaybackSpeed: Bt,
    playheadMs: gt,
    setPlayheadMs: mt,
    inPointMs: ie,
    setInPointMs: Ae,
    outPointMs: Me,
    setOutPointMs: ze,
    totalTimelineDurationMs: p,
    zoomLevel: Le,
    togglePlaySmart: os,
    onToggleHelpModal: () => Ve((M) => !M),
    onSplitDirectorAtPlayhead: () => {
      var le, de, ye;
      const M = I || (v.length === 1 ? v[0] : null);
      if (M) {
        const we = xe.find((Se) => Se.id === M);
        (((le = we == null ? void 0 : we.displays) == null ? void 0 : le.length) > 1 || ((ye = (de = we == null ? void 0 : we.topology) == null ? void 0 : de.displays) == null ? void 0 : ye.length) > 1) && $t(M, f + gt);
      }
    },
    isModalActive: ve || Oe || et,
    hasGridPlacements: on,
    onToggleGridFullscreen: xn,
    isGridFullscreen: je,
    onExitGridFullscreen: dn
  }), u.useEffect(() => {
    const M = f + ie, le = f + Me, de = f + gt;
    Ip({
      timeRange: t,
      timeMode: r,
      inPointMs: ie,
      outPointMs: Me,
      playheadMs: Math.round(gt),
      inEpochMs: M,
      outEpochMs: le,
      playheadEpochMs: de,
      selectedStationIds: v,
      activeStationId: I,
      zoomLevel: Le,
      viewportStartMs: Je,
      isWorkspaceActive: At,
      isLooping: cn,
      playbackSpeed: Ot,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: O,
      compositionLayout: $,
      isAutoDirectorEnabled: re,
      isPipSwapped: E,
      audioRoutingPlan: jt,
      isAutoFollowAudio: _,
      canvasLayoutTimeline: Fe
    });
  }, [
    t,
    r,
    ie,
    Me,
    gt,
    v,
    I,
    Le,
    Je,
    At,
    cn,
    Ot,
    f,
    o,
    i,
    O,
    $,
    re,
    E,
    jt,
    _,
    Fe
  ]);
  const kn = u.useCallback((M) => {
    var Be, Ue;
    const le = Kl(M.startTime), de = Kl(M.endTime), ye = Math.max(0, de - le) || 144e5, we = {
      start: M.startTime,
      end: M.endTime,
      durationMs: ye,
      startEpochMs: le,
      endEpochMs: de
    }, Ne = Math.max(6e4, Math.round(ye * 0.05)), Se = le - Ne, Te = ye + 2 * Ne;
    if (n(we), M.inEpochMs && M.outEpochMs) {
      const tt = Math.max(0, Math.min(Te, M.inEpochMs - Se)), Ze = Math.max(tt + 1e3, Math.min(Te, M.outEpochMs - Se)), Ct = M.playheadEpochMs ? Math.max(0, Math.min(Te, M.playheadEpochMs - Se)) : tt;
      Ae(tt), ze(Ze), mt(Ct);
    } else {
      const tt = typeof M.inPointMs == "number" ? M.inPointMs : Ne, Ze = typeof M.outPointMs == "number" ? M.outPointMs : Ne + ye, Ct = typeof M.playheadMs == "number" ? M.playheadMs : tt;
      Ae(Math.max(0, Math.min(Te, tt))), ze(Math.max(0, Math.min(Te, Ze))), mt(Math.max(0, Math.min(Te, Ct)));
    }
    const Ke = ((Be = M.selectedStationIds) == null ? void 0 : Be.length) > 0 ? M.selectedStationIds : ((Ue = M.cutStationIds) == null ? void 0 : Ue.length) > 0 ? M.cutStationIds : M.stationIds;
    if ((Ke == null ? void 0 : Ke.length) > 0) {
      S(Ke);
      const tt = M.spotlightStationId || M.SpotlightStationId || null, Ze = M.activeStationId || M.ActiveStationId || null;
      tt && Ke.includes(tt) ? (D(tt), x(tt)) : Ze && Ke.includes(Ze) ? (D(Ze), x(null)) : (D(null), x(null));
    }
    M.keystrokeMode && a(M.keystrokeMode), Vt(!0), xt(!1);
  }, []), Ro = u.useCallback((M) => {
    const le = M.startEpochMs || Kl(M.start, null, r), de = M.endEpochMs || Kl(M.end, null, r), ye = Math.max(0, de - le) || 144e5, we = Math.max(6e4, Math.round(ye * 0.05)), Ne = le - we, Se = ye + 2 * we;
    n({
      ...M,
      startEpochMs: le,
      endEpochMs: de,
      durationMs: ye
    }), A(!1), Ae(we), ze(we + ye), mt(we), Ee((Te) => {
      if (!(Te != null && Te.keyframes) || Te.keyframes.length === 0) return Te;
      const Ke = Te.keyframes.map((Be, Ue) => Ue === 0 ? { ...Be, timestampEpochMs: Ne } : Be).filter((Be) => Be.timestampEpochMs >= Ne && Be.timestampEpochMs <= Ne + Se);
      return { ...Te, keyframes: Ke };
    }), K((Te) => {
      if (!(Te != null && Te.segments) || Te.segments.length === 0) return Te;
      if (!Te.segments.some((Be) => {
        const Ue = Be.startEpochMs ?? Be.StartEpochMs ?? 0;
        return (Be.endEpochMs ?? Be.EndEpochMs ?? 0) > Ne && Ue < Ne + Se;
      })) {
        const Be = v[0] || I || "station-0";
        return {
          segments: [
            {
              startEpochMs: Ne,
              endEpochMs: Ne + Se,
              sourceStationId: Be
            }
          ]
        };
      }
      return Te;
    }), Ss({});
  }, [r, v, I]), hn = u.useCallback(() => {
    if (rt.map((le) => le.id).length === 0) return alert("No active stations selected in timeline.");
    X(!0);
  }, [rt]), Wn = u.useCallback(async (M, le) => {
    var Se, Te, Ke, Be;
    const de = rt.map((Ue) => Ue.id);
    if (de.length === 0) return;
    let ye = M === "None" ? "None" : "BurnIn";
    const we = le || "NATIVE", Ne = ((Se = Mn == null ? void 0 : Mn.displays) == null ? void 0 : Se.length) > 1 || ((Ke = (Te = Mn == null ? void 0 : Mn.topology) == null ? void 0 : Te.displays) == null ? void 0 : Ke.length) > 1 ? ((Be = Mn == null ? void 0 : Mn.directorPlan) == null ? void 0 : Be.segments) || [] : [];
    try {
      const Ue = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: _p(),
          stationIds: de,
          inEpochMs: f + ie,
          outEpochMs: f + Me,
          keystrokeMode: ye,
          resolution: we,
          videoQuality: we,
          compositionScope: O,
          layoutMode: "canvas",
          canvasLayout: J,
          canvasLayoutTimeline: Fe,
          isPipSwapped: E,
          isAutoDirectorEnabled: re,
          directorSegments: Ne,
          audioRoutingSegments: jt.segments || [],
          utcClockPosition: (() => {
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!Ue.ok) throw new Error(`HTTP ${Ue.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (Ue) {
      console.error("[Studio] Export failed:", Ue), alert("Failed to launch background master MP4 export job.");
    }
  }, [rt, f, ie, Me, O, J, Fe, E, re, Mn, jt]), fe = u.useCallback(() => {
    Ig();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const M = ch(), le = Math.max(6e4, Math.round(M.durationMs * 0.05));
    n(M), Ae(le), ze(le + M.durationMs), mt(le), S([]), D(null), x(null), Xe(!1), Bt(1), a("BURN_IN"), Tt(), Vt(!1), xt(!0);
  }, [Tt, Xe, Bt, mt]), Jn = !At || v.length === 0, Rn = f + gt;
  return u.useEffect(() => {
    const M = Fe == null ? void 0 : Fe.keyframes;
    if (!M || M.length === 0) return;
    let le = 0;
    for (let de = 0; de < M.length && M[de].timestampEpochMs <= Rn + 50; de++)
      le = de;
    le !== Ye && Ie(le);
  }, [Rn, Fe == null ? void 0 : Fe.keyframes, Ye]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Cg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: I,
          hideBackToGrid: rt.length <= 1,
          onResetActiveStation: () => bt(null),
          onOpenRangeModal: () => q(!0),
          onOpenBookmarksModal: () => _e(!0),
          onOpenHelpModal: () => Ve(!0),
          onToggleDrawer: () => xt(!ht),
          isInitialSetup: Jn,
          selectedCount: v.length,
          totalCount: xe.length,
          onResetStudio: fe
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
              onClick: () => q(!0),
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
              onClick: () => A(!1),
              title: "Dismiss Alert",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${je ? "cinema-fullscreen-mode" : ""}`, children: [
        je && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${To ? "" : "is-hud-hidden"}`, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "top-hud-left-group", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-exit-spotlight",
                onClick: dn,
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
                onClick: () => Ve(!0),
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
              Er.length,
              " ACTIVE WORKSTATIONS"
            ] })
          ] })
        ] }),
        !Jn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              Vg,
              {
                activeStation: Mn,
                timelineStations: Er,
                allStations: xe,
                onSelectActiveStation: bt,
                onOpenSpotlight: ln,
                onStationContextMenu: Q,
                onDeselectStation: oe,
                stationAutoDirectorMap: V,
                onToggleStationAutoDirector: st,
                onOpenDrawer: () => xt(!0),
                baseEpochMs: f,
                playheadMs: gt,
                playheadEpochMs: Rn,
                timeMode: r,
                isPlaying: gn ? !1 : qe,
                setIsPlaying: Xe,
                totalDurationMs: p,
                inPointMs: ie,
                outPointMs: Me,
                setPlayheadMs: mt,
                globalGaps: w,
                recordingSegments: Ge,
                playbackSpeed: Ot,
                onChangePlaybackSpeed: Bt,
                keystrokeMode: o,
                keystrokes: un,
                directorPlan: Mn == null ? void 0 : Mn.directorPlan,
                onOverrideDisplay: as,
                onResetOverride: Un,
                compositionScope: O,
                onChangeCompositionScope: z,
                compositionLayout: $,
                onChangeCompositionLayout: se,
                isAutoDirectorEnabled: re,
                onToggleAutoDirector: () => Z((M) => !M),
                isPipSwapped: E,
                onTogglePipSwap: () => U((M) => !M),
                onUpdateCanvasLayout: $e,
                canvasLayoutTimeline: Fe,
                onUpdateCanvasLayoutTimeline: Ee,
                activeKfIndex: Ye,
                setActiveKfIndex: Ie,
                isModalOpen: ne || ve || Oe || gn || et,
                isGridFullscreen: je,
                onToggleGridFullscreen: xn
              }
            ),
            !je && /* @__PURE__ */ s.jsx(
              _c,
              {
                hasGridPlacements: on,
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: p,
                playheadMs: gt,
                setPlayheadMs: mt,
                inPointMs: ie,
                setInPointMs: Ae,
                outPointMs: Me,
                setOutPointMs: ze,
                activeStationId: I,
                isPlaying: qe,
                setIsPlaying: os,
                isLooping: cn,
                setIsLooping: Sn,
                playbackSpeed: Ot,
                onChangeSpeed: Bt,
                onSetInPoint: () => Ae(Math.max(0, Math.min(gt, Me - 1e3))),
                onSetOutPoint: () => ze(Math.min(p, Math.max(gt, ie + 1e3))),
                onStepFrameBackward: () => {
                  Xe(!1), mt((M) => Math.max(0, M - 33));
                },
                onStepFrameForward: () => {
                  Xe(!1), mt((M) => Math.min(p, M + 33));
                }
              }
            )
          ] }),
          je && /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "cinema-bottom-sensor-strip",
              onMouseEnter: () => {
                Cr(!0), Xt();
              }
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `studio-bottom-timeline ${je ? "cinema-timeline-island" : ""} ${je && !To ? "dock-hidden" : ""} ${je && qe ? "is-playing-dimmed" : ""}`,
              ref: Cn,
              onMouseEnter: () => $o(!0),
              onMouseLeave: () => {
                $o(!1), je && Xt();
              },
              children: [
                je && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                      /* @__PURE__ */ s.jsx("span", { className: "val", children: De(Me - ie) })
                    ] }),
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "btn-export-cut-hero",
                        onClick: hn,
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
                    _c,
                    {
                      hasGridPlacements: on,
                      baseEpochMs: f,
                      timeMode: r,
                      totalDurationMs: p,
                      playheadMs: gt,
                      setPlayheadMs: mt,
                      inPointMs: ie,
                      setInPointMs: Ae,
                      outPointMs: Me,
                      setOutPointMs: ze,
                      activeStationId: I,
                      isPlaying: qe,
                      setIsPlaying: os,
                      isLooping: cn,
                      setIsLooping: Sn,
                      playbackSpeed: Ot,
                      onChangeSpeed: Bt,
                      onSetInPoint: () => Ae(Math.max(0, Math.min(gt, Me - 1e3))),
                      onSetOutPoint: () => ze(Math.min(p, Math.max(gt, ie + 1e3))),
                      onStepFrameBackward: () => {
                        Xe(!1), mt((M) => Math.max(0, M - 33));
                      },
                      onStepFrameForward: () => {
                        Xe(!1), mt((M) => Math.min(p, M + 33));
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                    /* @__PURE__ */ s.jsx("span", { className: "digits", children: Et(f + gt, r) })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  Op,
                  {
                    stations: Er,
                    activeStationId: I,
                    onSelectActiveStation: (M) => bt(v.length <= 1 ? M : M === I ? null : M),
                    onStationContextMenu: Q,
                    onDeselectStation: oe,
                    stationAutoDirectorMap: V,
                    onToggleStationAutoDirector: st,
                    baseEpochMs: f,
                    timeMode: r,
                    totalDurationMs: p,
                    zoomLevel: Le,
                    onZoomChange: Re,
                    onZoomReset: Tt,
                    onFitRange: ee,
                    onJumpViewportTo: me,
                    playheadMs: gt,
                    setPlayheadMs: mt,
                    inPointMs: ie,
                    setInPointMs: Ae,
                    outPointMs: Me,
                    setOutPointMs: ze,
                    viewportStartMs: Je,
                    onViewportStartChange: dt,
                    onExport: hn,
                    recordingSegments: Ge,
                    movieBoundaries: wt,
                    onEstimateLoaded: (M) => (M == null ? void 0 : M.removedGlobalGaps) && C(M.removedGlobalGaps),
                    keystrokeMode: o,
                    onChangeKeystrokeMode: a,
                    keystrokes: un,
                    showKeystrokes: i,
                    showRulerKeystrokes: i,
                    onToggleRulerKeystrokes: () => c((M) => !M),
                    onSplitDirectorSegment: $t,
                    onChangeDirectorSegmentDisplay: as,
                    onResetDirectorSegmentToAuto: Un,
                    audioRoutingPlan: jt,
                    onSplitAudioSegment: Nn,
                    onChangeAudioSegmentStation: gs,
                    onChangeAudioSegmentGain: Ls,
                    onFollowVisualFeed: jr,
                    isAutoFollowAudio: _,
                    canvasLayoutTimeline: Fe,
                    activeKfIndex: Ye,
                    onSelectKeyframe: (M, le) => {
                      Ie(M), mt(Math.max(0, le - f));
                    },
                    onAddKeyframeAtEpoch: Ce,
                    onDeleteKeyframe: ct,
                    onUpdateKeyframeEpoch: R,
                    onUpdateKeyframeTransition: Qe,
                    onToggleDisplayOnCanvas: Rt,
                    onUpdateAudioPlan: K
                  }
                )
              ]
            }
          )
        ] }),
        !je && /* @__PURE__ */ s.jsx(
          Ax,
          {
            isOpen: ht || Jn,
            onToggle: () => xt(!ht),
            onClose: () => xt(!1),
            allStations: xe,
            selectedStationIds: v,
            onToggleStation: (M) => S((le) => le.includes(M) ? le.filter((de) => de !== M) : [...le, M]),
            onUpdateSelections: S,
            isInitialSetup: Jn,
            isLoadingStations: He,
            recordingSegments: Ge,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              v.length > 0 && (D(null), x(null), Vt(!0), xt(!1));
            },
            onOpenRangeModal: () => q(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Lx,
      {
        isOpen: ve,
        onClose: () => q(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: kn,
        onApplyRange: Ro
      }
    ),
    /* @__PURE__ */ s.jsx(
      Dx,
      {
        isOpen: Oe,
        onClose: () => _e(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: gt,
          inPointMs: ie,
          outPointMs: Me,
          selectedStationIds: v,
          selectedStationNames: xe.filter((M) => v.includes(M.id)).map((M) => M.displayName || M.hostname || M.id),
          allStationIds: xe.map((M) => M.id),
          activeStationId: I,
          activeStationName: (pt == null ? void 0 : pt.displayName) || (pt == null ? void 0 : pt.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: kn
      }
    ),
    /* @__PURE__ */ s.jsx(
      Fp,
      {
        isOpen: et,
        onClose: () => Ve(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Wx,
      {
        isOpen: gn,
        station: bs,
        initialDisplayId: g,
        allStations: Er,
        onSelectStation: (M) => {
          M !== k && Bt(1), D(M), x(M);
        },
        onClose: Ut,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: p,
        zoomLevel: Le,
        onZoomChange: Re,
        onZoomReset: Tt,
        onFitRange: ee,
        onJumpViewportTo: me,
        viewportStartMs: Je,
        onViewportStartChange: dt,
        playheadMs: gt,
        setPlayheadMs: mt,
        playheadEpochMs: Rn,
        inPointMs: ie,
        setInPointMs: Ae,
        outPointMs: Me,
        setOutPointMs: ze,
        recordingSegments: Ge,
        globalGaps: w,
        isPlaying: qe,
        setIsPlaying: Xe,
        isLooping: cn,
        setIsLooping: Sn,
        playbackSpeed: Ot,
        setPlaybackSpeed: Bt,
        onExport: hn,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: un,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c((M) => !M),
        directorPlan: bs == null ? void 0 : bs.directorPlan,
        onOverrideDisplay: as,
        onSplitDirectorSegment: $t,
        onChangeDirectorSegmentDisplay: as,
        onResetDirectorSegmentToAuto: Un
      }
    ),
    /* @__PURE__ */ s.jsx(
      zx,
      {
        menu: y,
        onClose: () => b(null),
        onDeselect: oe,
        onFocusSolo: bt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Hx,
      {
        isOpen: ne,
        onClose: () => X(!1),
        onConfirm: Wn,
        compositionSummary: {
          scope: O,
          layout: (J == null ? void 0 : J.preset) || $,
          isPipSwapped: E,
          isAutoDirectorEnabled: re,
          stationsCount: rt.length,
          audioSegmentsCount: (($l = jt == null ? void 0 : jt.segments) == null ? void 0 : $l.length) || 1,
          resolution: (Fe == null ? void 0 : Fe.resolution) || "NATIVE",
          canvasWidth: (J == null ? void 0 : J.width) || 1920,
          canvasHeight: (J == null ? void 0 : J.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Bp, {})
  ] });
}
const uh = "itb-extractor-advanced-theme", dh = "itb-global-export-job-monitor-root";
function Up() {
  if (!(typeof document > "u") && !document.getElementById(uh)) {
    const e = document.createElement("link");
    e.id = uh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Up();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(dh);
  if (!t) {
    t = document.createElement("div"), t.id = dh, document.body.appendChild(t);
    try {
      pa.createRoot(t).render(Co.createElement(Bp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Jx(e, t = {}) {
  Up();
  const n = pa.createRoot(e);
  return n.render(Co.createElement(Qx, t)), () => {
    n.unmount();
  };
}
export {
  Bp as ExportJobMonitor,
  Qx as ExtractorAdvancedStudio,
  Qx as default,
  Jx as mount
};
