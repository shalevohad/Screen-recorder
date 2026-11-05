function Zp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ph = { exports: {} }, Ct = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Co = Symbol.for("react.element"), qp = Symbol.for("react.portal"), em = Symbol.for("react.fragment"), tm = Symbol.for("react.strict_mode"), nm = Symbol.for("react.profiler"), sm = Symbol.for("react.provider"), rm = Symbol.for("react.context"), lm = Symbol.for("react.forward_ref"), om = Symbol.for("react.suspense"), am = Symbol.for("react.memo"), im = Symbol.for("react.lazy"), Hu = Symbol.iterator;
function cm(e) {
  return e === null || typeof e != "object" ? null : (e = Hu && e[Hu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var mh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, gh = Object.assign, xh = {};
function Il(e, t, n) {
  this.props = e, this.context = t, this.refs = xh, this.updater = n || mh;
}
Il.prototype.isReactComponent = {};
Il.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Il.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function yh() {
}
yh.prototype = Il.prototype;
function zc(e, t, n) {
  this.props = e, this.context = t, this.refs = xh, this.updater = n || mh;
}
var Hc = zc.prototype = new yh();
Hc.constructor = zc;
gh(Hc, Il.prototype);
Hc.isPureReactComponent = !0;
var Ku = Array.isArray, vh = Object.prototype.hasOwnProperty, Kc = { current: null }, Nh = { key: !0, ref: !0, __self: !0, __source: !0 };
function kh(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) vh.call(t, r) && !Nh.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var c = Array(i), d = 0; d < i; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: Co, type: e, key: o, ref: a, props: l, _owner: Kc.current };
}
function um(e, t) {
  return { $$typeof: Co, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Vc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Co;
}
function dm(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Vu = /\/+/g;
function ci(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? dm("" + e.key) : t.toString(36);
}
function sa(e, t, n, r, l) {
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
        case Co:
        case qp:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + ci(a, 0) : r, Ku(l) ? (n = "", e != null && (n = e.replace(Vu, "$&/") + "/"), sa(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Vc(l) && (l = um(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Vu, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Ku(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + ci(o, i);
    a += sa(o, t, n, c, l);
  }
  else if (c = cm(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + ci(o, i++), a += sa(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function Do(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return sa(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function hm(e) {
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
var Fn = { current: null }, ra = { transition: null }, fm = { ReactCurrentDispatcher: Fn, ReactCurrentBatchConfig: ra, ReactCurrentOwner: Kc };
function wh() {
  throw Error("act(...) is not supported in production builds of React.");
}
Ct.Children = { map: Do, forEach: function(e, t, n) {
  Do(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Do(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Do(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Vc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Ct.Component = Il;
Ct.Fragment = em;
Ct.Profiler = nm;
Ct.PureComponent = zc;
Ct.StrictMode = tm;
Ct.Suspense = om;
Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fm;
Ct.act = wh;
Ct.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = gh({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = Kc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (c in t) vh.call(t, c) && !Nh.hasOwnProperty(c) && (r[c] = t[c] === void 0 && i !== void 0 ? i[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    i = Array(c);
    for (var d = 0; d < c; d++) i[d] = arguments[d + 2];
    r.children = i;
  }
  return { $$typeof: Co, type: e.type, key: l, ref: o, props: r, _owner: a };
};
Ct.createContext = function(e) {
  return e = { $$typeof: rm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: sm, _context: e }, e.Consumer = e;
};
Ct.createElement = kh;
Ct.createFactory = function(e) {
  var t = kh.bind(null, e);
  return t.type = e, t;
};
Ct.createRef = function() {
  return { current: null };
};
Ct.forwardRef = function(e) {
  return { $$typeof: lm, render: e };
};
Ct.isValidElement = Vc;
Ct.lazy = function(e) {
  return { $$typeof: im, _payload: { _status: -1, _result: e }, _init: hm };
};
Ct.memo = function(e, t) {
  return { $$typeof: am, type: e, compare: t === void 0 ? null : t };
};
Ct.startTransition = function(e) {
  var t = ra.transition;
  ra.transition = {};
  try {
    e();
  } finally {
    ra.transition = t;
  }
};
Ct.unstable_act = wh;
Ct.useCallback = function(e, t) {
  return Fn.current.useCallback(e, t);
};
Ct.useContext = function(e) {
  return Fn.current.useContext(e);
};
Ct.useDebugValue = function() {
};
Ct.useDeferredValue = function(e) {
  return Fn.current.useDeferredValue(e);
};
Ct.useEffect = function(e, t) {
  return Fn.current.useEffect(e, t);
};
Ct.useId = function() {
  return Fn.current.useId();
};
Ct.useImperativeHandle = function(e, t, n) {
  return Fn.current.useImperativeHandle(e, t, n);
};
Ct.useInsertionEffect = function(e, t) {
  return Fn.current.useInsertionEffect(e, t);
};
Ct.useLayoutEffect = function(e, t) {
  return Fn.current.useLayoutEffect(e, t);
};
Ct.useMemo = function(e, t) {
  return Fn.current.useMemo(e, t);
};
Ct.useReducer = function(e, t, n) {
  return Fn.current.useReducer(e, t, n);
};
Ct.useRef = function(e) {
  return Fn.current.useRef(e);
};
Ct.useState = function(e) {
  return Fn.current.useState(e);
};
Ct.useSyncExternalStore = function(e, t, n) {
  return Fn.current.useSyncExternalStore(e, t, n);
};
Ct.useTransition = function() {
  return Fn.current.useTransition();
};
Ct.version = "18.3.1";
ph.exports = Ct;
var u = ph.exports;
const So = /* @__PURE__ */ Zp(u);
var xa = {}, Eh = { exports: {} }, ls = {}, jh = { exports: {} }, Ch = {};
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
  function t(I, U) {
    var O = I.length;
    I.push(U);
    e: for (; 0 < O; ) {
      var K = O - 1 >>> 1, R = I[K];
      if (0 < l(R, U)) I[K] = U, I[O] = R, O = K;
      else break e;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function r(I) {
    if (I.length === 0) return null;
    var U = I[0], O = I.pop();
    if (O !== U) {
      I[0] = O;
      e: for (var K = 0, R = I.length, oe = R >>> 1; K < oe; ) {
        var te = 2 * (K + 1) - 1, Z = I[te], Y = te + 1, Le = I[Y];
        if (0 > l(Z, O)) Y < R && 0 > l(Le, Z) ? (I[K] = Le, I[Y] = O, K = Y) : (I[K] = Z, I[te] = O, K = te);
        else if (Y < R && 0 > l(Le, O)) I[K] = Le, I[Y] = O, K = Y;
        else break e;
      }
    }
    return U;
  }
  function l(I, U) {
    var O = I.sortIndex - U.sortIndex;
    return O !== 0 ? O : I.id - U.id;
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
  var c = [], d = [], v = 1, f = null, p = 3, y = !1, S = !1, M = !1, _ = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(I) {
    for (var U = n(d); U !== null; ) {
      if (U.callback === null) r(d);
      else if (U.startTime <= I) r(d), U.sortIndex = U.expirationTime, t(c, U);
      else break;
      U = n(d);
    }
  }
  function T(I) {
    if (M = !1, m(I), !S) if (n(c) !== null) S = !0, ne(w);
    else {
      var U = n(d);
      U !== null && H(T, U.startTime - I);
    }
  }
  function w(I, U) {
    S = !1, M && (M = !1, k(A), A = -1), y = !0;
    var O = p;
    try {
      for (m(U), f = n(c); f !== null && (!(f.expirationTime > U) || I && !P()); ) {
        var K = f.callback;
        if (typeof K == "function") {
          f.callback = null, p = f.priorityLevel;
          var R = K(f.expirationTime <= U);
          U = e.unstable_now(), typeof R == "function" ? f.callback = R : f === n(c) && r(c), m(U);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var oe = !0;
      else {
        var te = n(d);
        te !== null && H(T, te.startTime - U), oe = !1;
      }
      return oe;
    } finally {
      f = null, p = O, y = !1;
    }
  }
  var b = !1, h = null, A = -1, E = 5, N = -1;
  function P() {
    return !(e.unstable_now() - N < E);
  }
  function W() {
    if (h !== null) {
      var I = e.unstable_now();
      N = I;
      var U = !0;
      try {
        U = h(!0, I);
      } finally {
        U ? L() : (b = !1, h = null);
      }
    } else b = !1;
  }
  var L;
  if (typeof g == "function") L = function() {
    g(W);
  };
  else if (typeof MessageChannel < "u") {
    var B = new MessageChannel(), re = B.port2;
    B.port1.onmessage = W, L = function() {
      re.postMessage(null);
    };
  } else L = function() {
    _(W, 0);
  };
  function ne(I) {
    h = I, b || (b = !0, L());
  }
  function H(I, U) {
    A = _(function() {
      I(e.unstable_now());
    }, U);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    S || y || (S = !0, ne(w));
  }, e.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < I ? Math.floor(1e3 / I) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(I) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var U = 3;
        break;
      default:
        U = p;
    }
    var O = p;
    p = U;
    try {
      return I();
    } finally {
      p = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(I, U) {
    switch (I) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        I = 3;
    }
    var O = p;
    p = I;
    try {
      return U();
    } finally {
      p = O;
    }
  }, e.unstable_scheduleCallback = function(I, U, O) {
    var K = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? K + O : K) : O = K, I) {
      case 1:
        var R = -1;
        break;
      case 2:
        R = 250;
        break;
      case 5:
        R = 1073741823;
        break;
      case 4:
        R = 1e4;
        break;
      default:
        R = 5e3;
    }
    return R = O + R, I = { id: v++, callback: U, priorityLevel: I, startTime: O, expirationTime: R, sortIndex: -1 }, O > K ? (I.sortIndex = O, t(d, I), n(c) === null && I === n(d) && (M ? (k(A), A = -1) : M = !0, H(T, O - K))) : (I.sortIndex = R, t(c, I), S || y || (S = !0, ne(w))), I;
  }, e.unstable_shouldYield = P, e.unstable_wrapCallback = function(I) {
    var U = p;
    return function() {
      var O = p;
      p = U;
      try {
        return I.apply(this, arguments);
      } finally {
        p = O;
      }
    };
  };
})(Ch);
jh.exports = Ch;
var pm = jh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mm = u, rs = pm;
function Ne(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Sh = /* @__PURE__ */ new Set(), oo = {};
function Hr(e, t) {
  wl(e, t), wl(e + "Capture", t);
}
function wl(e, t) {
  for (oo[e] = t, e = 0; e < t.length; e++) Sh.add(t[e]);
}
var zs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), zi = Object.prototype.hasOwnProperty, gm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Yu = {}, Gu = {};
function xm(e) {
  return zi.call(Gu, e) ? !0 : zi.call(Yu, e) ? !1 : gm.test(e) ? Gu[e] = !0 : (Yu[e] = !0, !1);
}
function ym(e, t, n, r) {
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
function vm(e, t, n, r) {
  if (t === null || typeof t > "u" || ym(e, t, n, r)) return !0;
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
var Sn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Sn[e] = new Bn(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Sn[t] = new Bn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Sn[e] = new Bn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Sn[e] = new Bn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Sn[e] = new Bn(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Sn[e] = new Bn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Sn[e] = new Bn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Sn[e] = new Bn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Sn[e] = new Bn(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Yc = /[\-:]([a-z])/g;
function Gc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Yc,
    Gc
  );
  Sn[t] = new Bn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Yc, Gc);
  Sn[t] = new Bn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Yc, Gc);
  Sn[t] = new Bn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Sn[e] = new Bn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Sn.xlinkHref = new Bn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Sn[e] = new Bn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Xc(e, t, n, r) {
  var l = Sn.hasOwnProperty(t) ? Sn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (vm(t, n, l, r) && (n = null), r || l === null ? xm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ys = mm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Po = Symbol.for("react.element"), el = Symbol.for("react.portal"), tl = Symbol.for("react.fragment"), Qc = Symbol.for("react.strict_mode"), Hi = Symbol.for("react.profiler"), Mh = Symbol.for("react.provider"), bh = Symbol.for("react.context"), Jc = Symbol.for("react.forward_ref"), Ki = Symbol.for("react.suspense"), Vi = Symbol.for("react.suspense_list"), Zc = Symbol.for("react.memo"), tr = Symbol.for("react.lazy"), Ih = Symbol.for("react.offscreen"), Xu = Symbol.iterator;
function Dl(e) {
  return e === null || typeof e != "object" ? null : (e = Xu && e[Xu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var sn = Object.assign, ui;
function Yl(e) {
  if (ui === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    ui = t && t[1] || "";
  }
  return `
` + ui + e;
}
var di = !1;
function hi(e, t) {
  if (!e || di) return "";
  di = !0;
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
    di = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Yl(e) : "";
}
function Nm(e) {
  switch (e.tag) {
    case 5:
      return Yl(e.type);
    case 16:
      return Yl("Lazy");
    case 13:
      return Yl("Suspense");
    case 19:
      return Yl("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = hi(e.type, !1), e;
    case 11:
      return e = hi(e.type.render, !1), e;
    case 1:
      return e = hi(e.type, !0), e;
    default:
      return "";
  }
}
function Yi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case tl:
      return "Fragment";
    case el:
      return "Portal";
    case Hi:
      return "Profiler";
    case Qc:
      return "StrictMode";
    case Ki:
      return "Suspense";
    case Vi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case bh:
      return (e.displayName || "Context") + ".Consumer";
    case Mh:
      return (e._context.displayName || "Context") + ".Provider";
    case Jc:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Zc:
      return t = e.displayName || null, t !== null ? t : Yi(e.type) || "Memo";
    case tr:
      t = e._payload, e = e._init;
      try {
        return Yi(e(t));
      } catch {
      }
  }
  return null;
}
function km(e) {
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
      return Yi(t);
    case 8:
      return t === Qc ? "StrictMode" : "Mode";
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
function Th(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function wm(e) {
  var t = Th(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function _o(e) {
  e._valueTracker || (e._valueTracker = wm(e));
}
function Ah(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Th(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ya(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Gi(e, t) {
  var n = t.checked;
  return sn({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Qu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = yr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function $h(e, t) {
  t = t.checked, t != null && Xc(e, "checked", t, !1);
}
function Xi(e, t) {
  $h(e, t);
  var n = yr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Qi(e, t.type, n) : t.hasOwnProperty("defaultValue") && Qi(e, t.type, yr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ju(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Qi(e, t, n) {
  (t !== "number" || ya(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Gl = Array.isArray;
function fl(e, t, n, r) {
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
function Ji(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(Ne(91));
  return sn({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Zu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(Ne(92));
      if (Gl(n)) {
        if (1 < n.length) throw Error(Ne(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: yr(n) };
}
function Rh(e, t) {
  var n = yr(t.value), r = yr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function qu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Lh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Zi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Lh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Fo, Oh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Fo = Fo || document.createElement("div"), Fo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Fo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function ao(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Jl = {
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
}, Em = ["Webkit", "ms", "Moz", "O"];
Object.keys(Jl).forEach(function(e) {
  Em.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Jl[t] = Jl[e];
  });
});
function Dh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Jl.hasOwnProperty(e) && Jl[e] ? ("" + t).trim() : t + "px";
}
function Ph(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Dh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var jm = sn({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function qi(e, t) {
  if (t) {
    if (jm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(Ne(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Ne(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(Ne(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Ne(62));
  }
}
function ec(e, t) {
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
var tc = null;
function qc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var nc = null, pl = null, ml = null;
function ed(e) {
  if (e = Io(e)) {
    if (typeof nc != "function") throw Error(Ne(280));
    var t = e.stateNode;
    t && (t = Xa(t), nc(e.stateNode, e.type, t));
  }
}
function _h(e) {
  pl ? ml ? ml.push(e) : ml = [e] : pl = e;
}
function Fh() {
  if (pl) {
    var e = pl, t = ml;
    if (ml = pl = null, ed(e), t) for (e = 0; e < t.length; e++) ed(t[e]);
  }
}
function Bh(e, t) {
  return e(t);
}
function Uh() {
}
var fi = !1;
function Wh(e, t, n) {
  if (fi) return e(t, n);
  fi = !0;
  try {
    return Bh(e, t, n);
  } finally {
    fi = !1, (pl !== null || ml !== null) && (Uh(), Fh());
  }
}
function io(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Xa(n);
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
  if (n && typeof n != "function") throw Error(Ne(231, t, typeof n));
  return n;
}
var sc = !1;
if (zs) try {
  var Pl = {};
  Object.defineProperty(Pl, "passive", { get: function() {
    sc = !0;
  } }), window.addEventListener("test", Pl, Pl), window.removeEventListener("test", Pl, Pl);
} catch {
  sc = !1;
}
function Cm(e, t, n, r, l, o, a, i, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Zl = !1, va = null, Na = !1, rc = null, Sm = { onError: function(e) {
  Zl = !0, va = e;
} };
function Mm(e, t, n, r, l, o, a, i, c) {
  Zl = !1, va = null, Cm.apply(Sm, arguments);
}
function bm(e, t, n, r, l, o, a, i, c) {
  if (Mm.apply(this, arguments), Zl) {
    if (Zl) {
      var d = va;
      Zl = !1, va = null;
    } else throw Error(Ne(198));
    Na || (Na = !0, rc = d);
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
function zh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function td(e) {
  if (Kr(e) !== e) throw Error(Ne(188));
}
function Im(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Kr(e), t === null) throw Error(Ne(188));
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
        if (o === n) return td(l), e;
        if (o === r) return td(l), t;
        o = o.sibling;
      }
      throw Error(Ne(188));
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
        if (!a) throw Error(Ne(189));
      }
    }
    if (n.alternate !== r) throw Error(Ne(190));
  }
  if (n.tag !== 3) throw Error(Ne(188));
  return n.stateNode.current === n ? e : t;
}
function Hh(e) {
  return e = Im(e), e !== null ? Kh(e) : null;
}
function Kh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Kh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Vh = rs.unstable_scheduleCallback, nd = rs.unstable_cancelCallback, Tm = rs.unstable_shouldYield, Am = rs.unstable_requestPaint, un = rs.unstable_now, $m = rs.unstable_getCurrentPriorityLevel, eu = rs.unstable_ImmediatePriority, Yh = rs.unstable_UserBlockingPriority, ka = rs.unstable_NormalPriority, Rm = rs.unstable_LowPriority, Gh = rs.unstable_IdlePriority, Ka = null, $s = null;
function Lm(e) {
  if ($s && typeof $s.onCommitFiberRoot == "function") try {
    $s.onCommitFiberRoot(Ka, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Es = Math.clz32 ? Math.clz32 : Pm, Om = Math.log, Dm = Math.LN2;
function Pm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Om(e) / Dm | 0) | 0;
}
var Bo = 64, Uo = 4194304;
function Xl(e) {
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
function wa(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var i = a & ~l;
    i !== 0 ? r = Xl(i) : (o &= a, o !== 0 && (r = Xl(o)));
  } else a = n & ~l, a !== 0 ? r = Xl(a) : o !== 0 && (r = Xl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Es(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function _m(e, t) {
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
function Fm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - Es(o), i = 1 << a, c = l[a];
    c === -1 ? (!(i & n) || i & r) && (l[a] = _m(i, t)) : c <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function lc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Xh() {
  var e = Bo;
  return Bo <<= 1, !(Bo & 4194240) && (Bo = 64), e;
}
function pi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Mo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Es(t), e[t] = n;
}
function Bm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Es(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function tu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Es(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Wt = 0;
function Qh(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Jh, nu, Zh, qh, ef, oc = !1, Wo = [], ur = null, dr = null, hr = null, co = /* @__PURE__ */ new Map(), uo = /* @__PURE__ */ new Map(), lr = [], Um = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function sd(e, t) {
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
      co.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      uo.delete(t.pointerId);
  }
}
function _l(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Io(t), t !== null && nu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Wm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ur = _l(ur, e, t, n, r, l), !0;
    case "dragenter":
      return dr = _l(dr, e, t, n, r, l), !0;
    case "mouseover":
      return hr = _l(hr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return co.set(o, _l(co.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, uo.set(o, _l(uo.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function tf(e) {
  var t = Ar(e.target);
  if (t !== null) {
    var n = Kr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = zh(n), t !== null) {
          e.blockedOn = t, ef(e.priority, function() {
            Zh(n);
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
function la(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ac(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      tc = r, n.target.dispatchEvent(r), tc = null;
    } else return t = Io(n), t !== null && nu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function rd(e, t, n) {
  la(e) && n.delete(t);
}
function zm() {
  oc = !1, ur !== null && la(ur) && (ur = null), dr !== null && la(dr) && (dr = null), hr !== null && la(hr) && (hr = null), co.forEach(rd), uo.forEach(rd);
}
function Fl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, oc || (oc = !0, rs.unstable_scheduleCallback(rs.unstable_NormalPriority, zm)));
}
function ho(e) {
  function t(l) {
    return Fl(l, e);
  }
  if (0 < Wo.length) {
    Fl(Wo[0], e);
    for (var n = 1; n < Wo.length; n++) {
      var r = Wo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ur !== null && Fl(ur, e), dr !== null && Fl(dr, e), hr !== null && Fl(hr, e), co.forEach(t), uo.forEach(t), n = 0; n < lr.length; n++) r = lr[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lr.length && (n = lr[0], n.blockedOn === null); ) tf(n), n.blockedOn === null && lr.shift();
}
var gl = Ys.ReactCurrentBatchConfig, Ea = !0;
function Hm(e, t, n, r) {
  var l = Wt, o = gl.transition;
  gl.transition = null;
  try {
    Wt = 1, su(e, t, n, r);
  } finally {
    Wt = l, gl.transition = o;
  }
}
function Km(e, t, n, r) {
  var l = Wt, o = gl.transition;
  gl.transition = null;
  try {
    Wt = 4, su(e, t, n, r);
  } finally {
    Wt = l, gl.transition = o;
  }
}
function su(e, t, n, r) {
  if (Ea) {
    var l = ac(e, t, n, r);
    if (l === null) ji(e, t, r, ja, n), sd(e, r);
    else if (Wm(l, e, t, n, r)) r.stopPropagation();
    else if (sd(e, r), t & 4 && -1 < Um.indexOf(e)) {
      for (; l !== null; ) {
        var o = Io(l);
        if (o !== null && Jh(o), o = ac(e, t, n, r), o === null && ji(e, t, r, ja, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ji(e, t, r, null, n);
  }
}
var ja = null;
function ac(e, t, n, r) {
  if (ja = null, e = qc(r), e = Ar(e), e !== null) if (t = Kr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = zh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ja = e, null;
}
function nf(e) {
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
      switch ($m()) {
        case eu:
          return 1;
        case Yh:
          return 4;
        case ka:
        case Rm:
          return 16;
        case Gh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ir = null, ru = null, oa = null;
function sf() {
  if (oa) return oa;
  var e, t = ru, n = t.length, r, l = "value" in ir ? ir.value : ir.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return oa = l.slice(e, 1 < r ? 1 - r : void 0);
}
function aa(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function zo() {
  return !0;
}
function ld() {
  return !1;
}
function os(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? zo : ld, this.isPropagationStopped = ld, this;
  }
  return sn(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = zo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = zo);
  }, persist: function() {
  }, isPersistent: zo }), t;
}
var Tl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, lu = os(Tl), bo = sn({}, Tl, { view: 0, detail: 0 }), Vm = os(bo), mi, gi, Bl, Va = sn({}, bo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ou, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Bl && (Bl && e.type === "mousemove" ? (mi = e.screenX - Bl.screenX, gi = e.screenY - Bl.screenY) : gi = mi = 0, Bl = e), mi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : gi;
} }), od = os(Va), Ym = sn({}, Va, { dataTransfer: 0 }), Gm = os(Ym), Xm = sn({}, bo, { relatedTarget: 0 }), xi = os(Xm), Qm = sn({}, Tl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Jm = os(Qm), Zm = sn({}, Tl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), qm = os(Zm), e0 = sn({}, Tl, { data: 0 }), ad = os(e0), t0 = {
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
}, n0 = {
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
}, s0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function r0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = s0[e]) ? !!t[e] : !1;
}
function ou() {
  return r0;
}
var l0 = sn({}, bo, { key: function(e) {
  if (e.key) {
    var t = t0[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = aa(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? n0[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ou, charCode: function(e) {
  return e.type === "keypress" ? aa(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? aa(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), o0 = os(l0), a0 = sn({}, Va, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), id = os(a0), i0 = sn({}, bo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ou }), c0 = os(i0), u0 = sn({}, Tl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), d0 = os(u0), h0 = sn({}, Va, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), f0 = os(h0), p0 = [9, 13, 27, 32], au = zs && "CompositionEvent" in window, ql = null;
zs && "documentMode" in document && (ql = document.documentMode);
var m0 = zs && "TextEvent" in window && !ql, rf = zs && (!au || ql && 8 < ql && 11 >= ql), cd = " ", ud = !1;
function lf(e, t) {
  switch (e) {
    case "keyup":
      return p0.indexOf(t.keyCode) !== -1;
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
function of(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var nl = !1;
function g0(e, t) {
  switch (e) {
    case "compositionend":
      return of(t);
    case "keypress":
      return t.which !== 32 ? null : (ud = !0, cd);
    case "textInput":
      return e = t.data, e === cd && ud ? null : e;
    default:
      return null;
  }
}
function x0(e, t) {
  if (nl) return e === "compositionend" || !au && lf(e, t) ? (e = sf(), oa = ru = ir = null, nl = !1, e) : null;
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
      return rf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var y0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function dd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!y0[e.type] : t === "textarea";
}
function af(e, t, n, r) {
  _h(r), t = Ca(t, "onChange"), 0 < t.length && (n = new lu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var eo = null, fo = null;
function v0(e) {
  vf(e, 0);
}
function Ya(e) {
  var t = ll(e);
  if (Ah(t)) return e;
}
function N0(e, t) {
  if (e === "change") return t;
}
var cf = !1;
if (zs) {
  var yi;
  if (zs) {
    var vi = "oninput" in document;
    if (!vi) {
      var hd = document.createElement("div");
      hd.setAttribute("oninput", "return;"), vi = typeof hd.oninput == "function";
    }
    yi = vi;
  } else yi = !1;
  cf = yi && (!document.documentMode || 9 < document.documentMode);
}
function fd() {
  eo && (eo.detachEvent("onpropertychange", uf), fo = eo = null);
}
function uf(e) {
  if (e.propertyName === "value" && Ya(fo)) {
    var t = [];
    af(t, fo, e, qc(e)), Wh(v0, t);
  }
}
function k0(e, t, n) {
  e === "focusin" ? (fd(), eo = t, fo = n, eo.attachEvent("onpropertychange", uf)) : e === "focusout" && fd();
}
function w0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ya(fo);
}
function E0(e, t) {
  if (e === "click") return Ya(t);
}
function j0(e, t) {
  if (e === "input" || e === "change") return Ya(t);
}
function C0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Cs = typeof Object.is == "function" ? Object.is : C0;
function po(e, t) {
  if (Cs(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!zi.call(t, l) || !Cs(e[l], t[l])) return !1;
  }
  return !0;
}
function pd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function md(e, t) {
  var n = pd(e);
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
    n = pd(n);
  }
}
function df(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? df(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function hf() {
  for (var e = window, t = ya(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ya(e.document);
  }
  return t;
}
function iu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function S0(e) {
  var t = hf(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && df(n.ownerDocument.documentElement, n)) {
    if (r !== null && iu(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = md(n, o);
        var a = md(
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
var M0 = zs && "documentMode" in document && 11 >= document.documentMode, sl = null, ic = null, to = null, cc = !1;
function gd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  cc || sl == null || sl !== ya(r) || (r = sl, "selectionStart" in r && iu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), to && po(to, r) || (to = r, r = Ca(ic, "onSelect"), 0 < r.length && (t = new lu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = sl)));
}
function Ho(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var rl = { animationend: Ho("Animation", "AnimationEnd"), animationiteration: Ho("Animation", "AnimationIteration"), animationstart: Ho("Animation", "AnimationStart"), transitionend: Ho("Transition", "TransitionEnd") }, Ni = {}, ff = {};
zs && (ff = document.createElement("div").style, "AnimationEvent" in window || (delete rl.animationend.animation, delete rl.animationiteration.animation, delete rl.animationstart.animation), "TransitionEvent" in window || delete rl.transitionend.transition);
function Ga(e) {
  if (Ni[e]) return Ni[e];
  if (!rl[e]) return e;
  var t = rl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ff) return Ni[e] = t[n];
  return e;
}
var pf = Ga("animationend"), mf = Ga("animationiteration"), gf = Ga("animationstart"), xf = Ga("transitionend"), yf = /* @__PURE__ */ new Map(), xd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nr(e, t) {
  yf.set(e, t), Hr(t, [e]);
}
for (var ki = 0; ki < xd.length; ki++) {
  var wi = xd[ki], b0 = wi.toLowerCase(), I0 = wi[0].toUpperCase() + wi.slice(1);
  Nr(b0, "on" + I0);
}
Nr(pf, "onAnimationEnd");
Nr(mf, "onAnimationIteration");
Nr(gf, "onAnimationStart");
Nr("dblclick", "onDoubleClick");
Nr("focusin", "onFocus");
Nr("focusout", "onBlur");
Nr(xf, "onTransitionEnd");
wl("onMouseEnter", ["mouseout", "mouseover"]);
wl("onMouseLeave", ["mouseout", "mouseover"]);
wl("onPointerEnter", ["pointerout", "pointerover"]);
wl("onPointerLeave", ["pointerout", "pointerover"]);
Hr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Hr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Hr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Hr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Hr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Hr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ql = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), T0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ql));
function yd(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, bm(r, t, void 0, e), e.currentTarget = null;
}
function vf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var i = r[a], c = i.instance, d = i.currentTarget;
        if (i = i.listener, c !== o && l.isPropagationStopped()) break e;
        yd(l, i, d), o = c;
      }
      else for (a = 0; a < r.length; a++) {
        if (i = r[a], c = i.instance, d = i.currentTarget, i = i.listener, c !== o && l.isPropagationStopped()) break e;
        yd(l, i, d), o = c;
      }
    }
  }
  if (Na) throw e = rc, Na = !1, rc = null, e;
}
function Qt(e, t) {
  var n = t[pc];
  n === void 0 && (n = t[pc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Nf(t, e, 2, !1), n.add(r));
}
function Ei(e, t, n) {
  var r = 0;
  t && (r |= 4), Nf(n, e, r, t);
}
var Ko = "_reactListening" + Math.random().toString(36).slice(2);
function mo(e) {
  if (!e[Ko]) {
    e[Ko] = !0, Sh.forEach(function(n) {
      n !== "selectionchange" && (T0.has(n) || Ei(n, !1, e), Ei(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ko] || (t[Ko] = !0, Ei("selectionchange", !1, t));
  }
}
function Nf(e, t, n, r) {
  switch (nf(t)) {
    case 1:
      var l = Hm;
      break;
    case 4:
      l = Km;
      break;
    default:
      l = su;
  }
  n = l.bind(null, t, n, e), l = void 0, !sc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ji(e, t, n, r, l) {
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
        if (a = Ar(i), a === null) return;
        if (c = a.tag, c === 5 || c === 6) {
          r = o = a;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  Wh(function() {
    var d = o, v = qc(n), f = [];
    e: {
      var p = yf.get(e);
      if (p !== void 0) {
        var y = lu, S = e;
        switch (e) {
          case "keypress":
            if (aa(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = o0;
            break;
          case "focusin":
            S = "focus", y = xi;
            break;
          case "focusout":
            S = "blur", y = xi;
            break;
          case "beforeblur":
          case "afterblur":
            y = xi;
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
            y = od;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Gm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = c0;
            break;
          case pf:
          case mf:
          case gf:
            y = Jm;
            break;
          case xf:
            y = d0;
            break;
          case "scroll":
            y = Vm;
            break;
          case "wheel":
            y = f0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = qm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = id;
        }
        var M = (t & 4) !== 0, _ = !M && e === "scroll", k = M ? p !== null ? p + "Capture" : null : p;
        M = [];
        for (var g = d, m; g !== null; ) {
          m = g;
          var T = m.stateNode;
          if (m.tag === 5 && T !== null && (m = T, k !== null && (T = io(g, k), T != null && M.push(go(g, T, m)))), _) break;
          g = g.return;
        }
        0 < M.length && (p = new y(p, S, null, n, v), f.push({ event: p, listeners: M }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", p && n !== tc && (S = n.relatedTarget || n.fromElement) && (Ar(S) || S[Hs])) break e;
        if ((y || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, y ? (S = n.relatedTarget || n.toElement, y = d, S = S ? Ar(S) : null, S !== null && (_ = Kr(S), S !== _ || S.tag !== 5 && S.tag !== 6) && (S = null)) : (y = null, S = d), y !== S)) {
          if (M = od, T = "onMouseLeave", k = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (M = id, T = "onPointerLeave", k = "onPointerEnter", g = "pointer"), _ = y == null ? p : ll(y), m = S == null ? p : ll(S), p = new M(T, g + "leave", y, n, v), p.target = _, p.relatedTarget = m, T = null, Ar(v) === d && (M = new M(k, g + "enter", S, n, v), M.target = m, M.relatedTarget = _, T = M), _ = T, y && S) t: {
            for (M = y, k = S, g = 0, m = M; m; m = Gr(m)) g++;
            for (m = 0, T = k; T; T = Gr(T)) m++;
            for (; 0 < g - m; ) M = Gr(M), g--;
            for (; 0 < m - g; ) k = Gr(k), m--;
            for (; g--; ) {
              if (M === k || k !== null && M === k.alternate) break t;
              M = Gr(M), k = Gr(k);
            }
            M = null;
          }
          else M = null;
          y !== null && vd(f, p, y, M, !1), S !== null && _ !== null && vd(f, _, S, M, !0);
        }
      }
      e: {
        if (p = d ? ll(d) : window, y = p.nodeName && p.nodeName.toLowerCase(), y === "select" || y === "input" && p.type === "file") var w = N0;
        else if (dd(p)) if (cf) w = j0;
        else {
          w = w0;
          var b = k0;
        }
        else (y = p.nodeName) && y.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (w = E0);
        if (w && (w = w(e, d))) {
          af(f, w, n, v);
          break e;
        }
        b && b(e, p, d), e === "focusout" && (b = p._wrapperState) && b.controlled && p.type === "number" && Qi(p, "number", p.value);
      }
      switch (b = d ? ll(d) : window, e) {
        case "focusin":
          (dd(b) || b.contentEditable === "true") && (sl = b, ic = d, to = null);
          break;
        case "focusout":
          to = ic = sl = null;
          break;
        case "mousedown":
          cc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          cc = !1, gd(f, n, v);
          break;
        case "selectionchange":
          if (M0) break;
        case "keydown":
        case "keyup":
          gd(f, n, v);
      }
      var h;
      if (au) e: {
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
      else nl ? lf(e, n) && (A = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      A && (rf && n.locale !== "ko" && (nl || A !== "onCompositionStart" ? A === "onCompositionEnd" && nl && (h = sf()) : (ir = v, ru = "value" in ir ? ir.value : ir.textContent, nl = !0)), b = Ca(d, A), 0 < b.length && (A = new ad(A, e, null, n, v), f.push({ event: A, listeners: b }), h ? A.data = h : (h = of(n), h !== null && (A.data = h)))), (h = m0 ? g0(e, n) : x0(e, n)) && (d = Ca(d, "onBeforeInput"), 0 < d.length && (v = new ad("onBeforeInput", "beforeinput", null, n, v), f.push({ event: v, listeners: d }), v.data = h));
    }
    vf(f, t);
  });
}
function go(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ca(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = io(e, n), o != null && r.unshift(go(e, o, l)), o = io(e, t), o != null && r.push(go(e, o, l))), e = e.return;
  }
  return r;
}
function Gr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function vd(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var i = n, c = i.alternate, d = i.stateNode;
    if (c !== null && c === r) break;
    i.tag === 5 && d !== null && (i = d, l ? (c = io(n, o), c != null && a.unshift(go(n, c, i))) : l || (c = io(n, o), c != null && a.push(go(n, c, i)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var A0 = /\r\n?/g, $0 = /\u0000|\uFFFD/g;
function Nd(e) {
  return (typeof e == "string" ? e : "" + e).replace(A0, `
`).replace($0, "");
}
function Vo(e, t, n) {
  if (t = Nd(t), Nd(e) !== t && n) throw Error(Ne(425));
}
function Sa() {
}
var uc = null, dc = null;
function hc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var fc = typeof setTimeout == "function" ? setTimeout : void 0, R0 = typeof clearTimeout == "function" ? clearTimeout : void 0, kd = typeof Promise == "function" ? Promise : void 0, L0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof kd < "u" ? function(e) {
  return kd.resolve(null).then(e).catch(O0);
} : fc;
function O0(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ci(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), ho(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  ho(t);
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
function wd(e) {
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
var Al = Math.random().toString(36).slice(2), Ts = "__reactFiber$" + Al, xo = "__reactProps$" + Al, Hs = "__reactContainer$" + Al, pc = "__reactEvents$" + Al, D0 = "__reactListeners$" + Al, P0 = "__reactHandles$" + Al;
function Ar(e) {
  var t = e[Ts];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Hs] || n[Ts]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = wd(e); e !== null; ) {
        if (n = e[Ts]) return n;
        e = wd(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Io(e) {
  return e = e[Ts] || e[Hs], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ll(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Ne(33));
}
function Xa(e) {
  return e[xo] || null;
}
var mc = [], ol = -1;
function kr(e) {
  return { current: e };
}
function Jt(e) {
  0 > ol || (e.current = mc[ol], mc[ol] = null, ol--);
}
function Gt(e, t) {
  ol++, mc[ol] = e.current, e.current = t;
}
var vr = {}, An = kr(vr), Gn = kr(!1), Fr = vr;
function El(e, t) {
  var n = e.type.contextTypes;
  if (!n) return vr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Xn(e) {
  return e = e.childContextTypes, e != null;
}
function Ma() {
  Jt(Gn), Jt(An);
}
function Ed(e, t, n) {
  if (An.current !== vr) throw Error(Ne(168));
  Gt(An, t), Gt(Gn, n);
}
function kf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(Ne(108, km(e) || "Unknown", l));
  return sn({}, n, r);
}
function ba(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vr, Fr = An.current, Gt(An, e), Gt(Gn, Gn.current), !0;
}
function jd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(Ne(169));
  n ? (e = kf(e, t, Fr), r.__reactInternalMemoizedMergedChildContext = e, Jt(Gn), Jt(An), Gt(An, e)) : Jt(Gn), Gt(Gn, n);
}
var Ps = null, Qa = !1, Si = !1;
function wf(e) {
  Ps === null ? Ps = [e] : Ps.push(e);
}
function _0(e) {
  Qa = !0, wf(e);
}
function wr() {
  if (!Si && Ps !== null) {
    Si = !0;
    var e = 0, t = Wt;
    try {
      var n = Ps;
      for (Wt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ps = null, Qa = !1;
    } catch (l) {
      throw Ps !== null && (Ps = Ps.slice(e + 1)), Vh(eu, wr), l;
    } finally {
      Wt = t, Si = !1;
    }
  }
  return null;
}
var al = [], il = 0, Ia = null, Ta = 0, us = [], ds = 0, Br = null, Fs = 1, Bs = "";
function br(e, t) {
  al[il++] = Ta, al[il++] = Ia, Ia = e, Ta = t;
}
function Ef(e, t, n) {
  us[ds++] = Fs, us[ds++] = Bs, us[ds++] = Br, Br = e;
  var r = Fs;
  e = Bs;
  var l = 32 - Es(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Es(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, Fs = 1 << 32 - Es(t) + l | n << l | r, Bs = o + e;
  } else Fs = 1 << o | n << l | r, Bs = e;
}
function cu(e) {
  e.return !== null && (br(e, 1), Ef(e, 1, 0));
}
function uu(e) {
  for (; e === Ia; ) Ia = al[--il], al[il] = null, Ta = al[--il], al[il] = null;
  for (; e === Br; ) Br = us[--ds], us[ds] = null, Bs = us[--ds], us[ds] = null, Fs = us[--ds], us[ds] = null;
}
var ss = null, ns = null, qt = !1, ks = null;
function jf(e, t) {
  var n = hs(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Cd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ss = e, ns = fr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ss = e, ns = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Br !== null ? { id: Fs, overflow: Bs } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = hs(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ss = e, ns = null, !0) : !1;
    default:
      return !1;
  }
}
function gc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function xc(e) {
  if (qt) {
    var t = ns;
    if (t) {
      var n = t;
      if (!Cd(e, t)) {
        if (gc(e)) throw Error(Ne(418));
        t = fr(n.nextSibling);
        var r = ss;
        t && Cd(e, t) ? jf(r, n) : (e.flags = e.flags & -4097 | 2, qt = !1, ss = e);
      }
    } else {
      if (gc(e)) throw Error(Ne(418));
      e.flags = e.flags & -4097 | 2, qt = !1, ss = e;
    }
  }
}
function Sd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ss = e;
}
function Yo(e) {
  if (e !== ss) return !1;
  if (!qt) return Sd(e), qt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !hc(e.type, e.memoizedProps)), t && (t = ns)) {
    if (gc(e)) throw Cf(), Error(Ne(418));
    for (; t; ) jf(e, t), t = fr(t.nextSibling);
  }
  if (Sd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(Ne(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ns = fr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ns = null;
    }
  } else ns = ss ? fr(e.stateNode.nextSibling) : null;
  return !0;
}
function Cf() {
  for (var e = ns; e; ) e = fr(e.nextSibling);
}
function jl() {
  ns = ss = null, qt = !1;
}
function du(e) {
  ks === null ? ks = [e] : ks.push(e);
}
var F0 = Ys.ReactCurrentBatchConfig;
function Ul(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(Ne(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(Ne(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var i = l.refs;
        a === null ? delete i[o] : i[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(Ne(284));
    if (!n._owner) throw Error(Ne(290, e));
  }
  return e;
}
function Go(e, t) {
  throw e = Object.prototype.toString.call(t), Error(Ne(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Md(e) {
  var t = e._init;
  return t(e._payload);
}
function Sf(e) {
  function t(k, g) {
    if (e) {
      var m = k.deletions;
      m === null ? (k.deletions = [g], k.flags |= 16) : m.push(g);
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
  function l(k, g) {
    return k = xr(k, g), k.index = 0, k.sibling = null, k;
  }
  function o(k, g, m) {
    return k.index = m, e ? (m = k.alternate, m !== null ? (m = m.index, m < g ? (k.flags |= 2, g) : m) : (k.flags |= 2, g)) : (k.flags |= 1048576, g);
  }
  function a(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function i(k, g, m, T) {
    return g === null || g.tag !== 6 ? (g = Ri(m, k.mode, T), g.return = k, g) : (g = l(g, m), g.return = k, g);
  }
  function c(k, g, m, T) {
    var w = m.type;
    return w === tl ? v(k, g, m.props.children, T, m.key) : g !== null && (g.elementType === w || typeof w == "object" && w !== null && w.$$typeof === tr && Md(w) === g.type) ? (T = l(g, m.props), T.ref = Ul(k, g, m), T.return = k, T) : (T = pa(m.type, m.key, m.props, null, k.mode, T), T.ref = Ul(k, g, m), T.return = k, T);
  }
  function d(k, g, m, T) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== m.containerInfo || g.stateNode.implementation !== m.implementation ? (g = Li(m, k.mode, T), g.return = k, g) : (g = l(g, m.children || []), g.return = k, g);
  }
  function v(k, g, m, T, w) {
    return g === null || g.tag !== 7 ? (g = Pr(m, k.mode, T, w), g.return = k, g) : (g = l(g, m), g.return = k, g);
  }
  function f(k, g, m) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = Ri("" + g, k.mode, m), g.return = k, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Po:
          return m = pa(g.type, g.key, g.props, null, k.mode, m), m.ref = Ul(k, null, g), m.return = k, m;
        case el:
          return g = Li(g, k.mode, m), g.return = k, g;
        case tr:
          var T = g._init;
          return f(k, T(g._payload), m);
      }
      if (Gl(g) || Dl(g)) return g = Pr(g, k.mode, m, null), g.return = k, g;
      Go(k, g);
    }
    return null;
  }
  function p(k, g, m, T) {
    var w = g !== null ? g.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number") return w !== null ? null : i(k, g, "" + m, T);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Po:
          return m.key === w ? c(k, g, m, T) : null;
        case el:
          return m.key === w ? d(k, g, m, T) : null;
        case tr:
          return w = m._init, p(
            k,
            g,
            w(m._payload),
            T
          );
      }
      if (Gl(m) || Dl(m)) return w !== null ? null : v(k, g, m, T, null);
      Go(k, m);
    }
    return null;
  }
  function y(k, g, m, T, w) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return k = k.get(m) || null, i(g, k, "" + T, w);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case Po:
          return k = k.get(T.key === null ? m : T.key) || null, c(g, k, T, w);
        case el:
          return k = k.get(T.key === null ? m : T.key) || null, d(g, k, T, w);
        case tr:
          var b = T._init;
          return y(k, g, m, b(T._payload), w);
      }
      if (Gl(T) || Dl(T)) return k = k.get(m) || null, v(g, k, T, w, null);
      Go(g, T);
    }
    return null;
  }
  function S(k, g, m, T) {
    for (var w = null, b = null, h = g, A = g = 0, E = null; h !== null && A < m.length; A++) {
      h.index > A ? (E = h, h = null) : E = h.sibling;
      var N = p(k, h, m[A], T);
      if (N === null) {
        h === null && (h = E);
        break;
      }
      e && h && N.alternate === null && t(k, h), g = o(N, g, A), b === null ? w = N : b.sibling = N, b = N, h = E;
    }
    if (A === m.length) return n(k, h), qt && br(k, A), w;
    if (h === null) {
      for (; A < m.length; A++) h = f(k, m[A], T), h !== null && (g = o(h, g, A), b === null ? w = h : b.sibling = h, b = h);
      return qt && br(k, A), w;
    }
    for (h = r(k, h); A < m.length; A++) E = y(h, k, A, m[A], T), E !== null && (e && E.alternate !== null && h.delete(E.key === null ? A : E.key), g = o(E, g, A), b === null ? w = E : b.sibling = E, b = E);
    return e && h.forEach(function(P) {
      return t(k, P);
    }), qt && br(k, A), w;
  }
  function M(k, g, m, T) {
    var w = Dl(m);
    if (typeof w != "function") throw Error(Ne(150));
    if (m = w.call(m), m == null) throw Error(Ne(151));
    for (var b = w = null, h = g, A = g = 0, E = null, N = m.next(); h !== null && !N.done; A++, N = m.next()) {
      h.index > A ? (E = h, h = null) : E = h.sibling;
      var P = p(k, h, N.value, T);
      if (P === null) {
        h === null && (h = E);
        break;
      }
      e && h && P.alternate === null && t(k, h), g = o(P, g, A), b === null ? w = P : b.sibling = P, b = P, h = E;
    }
    if (N.done) return n(
      k,
      h
    ), qt && br(k, A), w;
    if (h === null) {
      for (; !N.done; A++, N = m.next()) N = f(k, N.value, T), N !== null && (g = o(N, g, A), b === null ? w = N : b.sibling = N, b = N);
      return qt && br(k, A), w;
    }
    for (h = r(k, h); !N.done; A++, N = m.next()) N = y(h, k, A, N.value, T), N !== null && (e && N.alternate !== null && h.delete(N.key === null ? A : N.key), g = o(N, g, A), b === null ? w = N : b.sibling = N, b = N);
    return e && h.forEach(function(W) {
      return t(k, W);
    }), qt && br(k, A), w;
  }
  function _(k, g, m, T) {
    if (typeof m == "object" && m !== null && m.type === tl && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Po:
          e: {
            for (var w = m.key, b = g; b !== null; ) {
              if (b.key === w) {
                if (w = m.type, w === tl) {
                  if (b.tag === 7) {
                    n(k, b.sibling), g = l(b, m.props.children), g.return = k, k = g;
                    break e;
                  }
                } else if (b.elementType === w || typeof w == "object" && w !== null && w.$$typeof === tr && Md(w) === b.type) {
                  n(k, b.sibling), g = l(b, m.props), g.ref = Ul(k, b, m), g.return = k, k = g;
                  break e;
                }
                n(k, b);
                break;
              } else t(k, b);
              b = b.sibling;
            }
            m.type === tl ? (g = Pr(m.props.children, k.mode, T, m.key), g.return = k, k = g) : (T = pa(m.type, m.key, m.props, null, k.mode, T), T.ref = Ul(k, g, m), T.return = k, k = T);
          }
          return a(k);
        case el:
          e: {
            for (b = m.key; g !== null; ) {
              if (g.key === b) if (g.tag === 4 && g.stateNode.containerInfo === m.containerInfo && g.stateNode.implementation === m.implementation) {
                n(k, g.sibling), g = l(g, m.children || []), g.return = k, k = g;
                break e;
              } else {
                n(k, g);
                break;
              }
              else t(k, g);
              g = g.sibling;
            }
            g = Li(m, k.mode, T), g.return = k, k = g;
          }
          return a(k);
        case tr:
          return b = m._init, _(k, g, b(m._payload), T);
      }
      if (Gl(m)) return S(k, g, m, T);
      if (Dl(m)) return M(k, g, m, T);
      Go(k, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, g !== null && g.tag === 6 ? (n(k, g.sibling), g = l(g, m), g.return = k, k = g) : (n(k, g), g = Ri(m, k.mode, T), g.return = k, k = g), a(k)) : n(k, g);
  }
  return _;
}
var Cl = Sf(!0), Mf = Sf(!1), Aa = kr(null), $a = null, cl = null, hu = null;
function fu() {
  hu = cl = $a = null;
}
function pu(e) {
  var t = Aa.current;
  Jt(Aa), e._currentValue = t;
}
function yc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function xl(e, t) {
  $a = e, hu = cl = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Yn = !0), e.firstContext = null);
}
function ps(e) {
  var t = e._currentValue;
  if (hu !== e) if (e = { context: e, memoizedValue: t, next: null }, cl === null) {
    if ($a === null) throw Error(Ne(308));
    cl = e, $a.dependencies = { lanes: 0, firstContext: e };
  } else cl = cl.next = e;
  return t;
}
var $r = null;
function mu(e) {
  $r === null ? $r = [e] : $r.push(e);
}
function bf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, mu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ks(e, r);
}
function Ks(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var nr = !1;
function gu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function If(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Us(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function pr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, It & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ks(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, mu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ks(e, n);
}
function ia(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tu(e, n);
  }
}
function bd(e, t) {
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
function Ra(e, t, n, r) {
  var l = e.updateQueue;
  nr = !1;
  var o = l.firstBaseUpdate, a = l.lastBaseUpdate, i = l.shared.pending;
  if (i !== null) {
    l.shared.pending = null;
    var c = i, d = c.next;
    c.next = null, a === null ? o = d : a.next = d, a = c;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, i = v.lastBaseUpdate, i !== a && (i === null ? v.firstBaseUpdate = d : i.next = d, v.lastBaseUpdate = c));
  }
  if (o !== null) {
    var f = l.baseState;
    a = 0, v = d = c = null, i = o;
    do {
      var p = i.lane, y = i.eventTime;
      if ((r & p) === p) {
        v !== null && (v = v.next = {
          eventTime: y,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var S = e, M = i;
          switch (p = t, y = n, M.tag) {
            case 1:
              if (S = M.payload, typeof S == "function") {
                f = S.call(y, f, p);
                break e;
              }
              f = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = M.payload, p = typeof S == "function" ? S.call(y, f, p) : S, p == null) break e;
              f = sn({}, f, p);
              break e;
            case 2:
              nr = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [i] : p.push(i));
      } else y = { eventTime: y, lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, v === null ? (d = v = y, c = f) : v = v.next = y, a |= p;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        p = i, i = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (c = f), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        a |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Wr |= a, e.lanes = a, e.memoizedState = f;
  }
}
function Id(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(Ne(191, l));
      l.call(r);
    }
  }
}
var To = {}, Rs = kr(To), yo = kr(To), vo = kr(To);
function Rr(e) {
  if (e === To) throw Error(Ne(174));
  return e;
}
function xu(e, t) {
  switch (Gt(vo, t), Gt(yo, e), Gt(Rs, To), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Zi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Zi(t, e);
  }
  Jt(Rs), Gt(Rs, t);
}
function Sl() {
  Jt(Rs), Jt(yo), Jt(vo);
}
function Tf(e) {
  Rr(vo.current);
  var t = Rr(Rs.current), n = Zi(t, e.type);
  t !== n && (Gt(yo, e), Gt(Rs, n));
}
function yu(e) {
  yo.current === e && (Jt(Rs), Jt(yo));
}
var tn = kr(0);
function La(e) {
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
var Mi = [];
function vu() {
  for (var e = 0; e < Mi.length; e++) Mi[e]._workInProgressVersionPrimary = null;
  Mi.length = 0;
}
var ca = Ys.ReactCurrentDispatcher, bi = Ys.ReactCurrentBatchConfig, Ur = 0, nn = null, xn = null, Nn = null, Oa = !1, no = !1, No = 0, B0 = 0;
function bn() {
  throw Error(Ne(321));
}
function Nu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Cs(e[n], t[n])) return !1;
  return !0;
}
function ku(e, t, n, r, l, o) {
  if (Ur = o, nn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ca.current = e === null || e.memoizedState === null ? H0 : K0, e = n(r, l), no) {
    o = 0;
    do {
      if (no = !1, No = 0, 25 <= o) throw Error(Ne(301));
      o += 1, Nn = xn = null, t.updateQueue = null, ca.current = V0, e = n(r, l);
    } while (no);
  }
  if (ca.current = Da, t = xn !== null && xn.next !== null, Ur = 0, Nn = xn = nn = null, Oa = !1, t) throw Error(Ne(300));
  return e;
}
function wu() {
  var e = No !== 0;
  return No = 0, e;
}
function Is() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Nn === null ? nn.memoizedState = Nn = e : Nn = Nn.next = e, Nn;
}
function ms() {
  if (xn === null) {
    var e = nn.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = xn.next;
  var t = Nn === null ? nn.memoizedState : Nn.next;
  if (t !== null) Nn = t, xn = e;
  else {
    if (e === null) throw Error(Ne(310));
    xn = e, e = { memoizedState: xn.memoizedState, baseState: xn.baseState, baseQueue: xn.baseQueue, queue: xn.queue, next: null }, Nn === null ? nn.memoizedState = Nn = e : Nn = Nn.next = e;
  }
  return Nn;
}
function ko(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ii(e) {
  var t = ms(), n = t.queue;
  if (n === null) throw Error(Ne(311));
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
      if ((Ur & v) === v) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var f = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (i = c = f, a = r) : c = c.next = f, nn.lanes |= v, Wr |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? a = r : c.next = i, Cs(r, t.memoizedState) || (Yn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, nn.lanes |= o, Wr |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ti(e) {
  var t = ms(), n = t.queue;
  if (n === null) throw Error(Ne(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Cs(o, t.memoizedState) || (Yn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Af() {
}
function $f(e, t) {
  var n = nn, r = ms(), l = t(), o = !Cs(r.memoizedState, l);
  if (o && (r.memoizedState = l, Yn = !0), r = r.queue, Eu(Of.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Nn !== null && Nn.memoizedState.tag & 1) {
    if (n.flags |= 2048, wo(9, Lf.bind(null, n, r, l, t), void 0, null), kn === null) throw Error(Ne(349));
    Ur & 30 || Rf(n, t, l);
  }
  return l;
}
function Rf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = nn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, nn.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Lf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Df(t) && Pf(e);
}
function Of(e, t, n) {
  return n(function() {
    Df(t) && Pf(e);
  });
}
function Df(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Cs(e, n);
  } catch {
    return !0;
  }
}
function Pf(e) {
  var t = Ks(e, 1);
  t !== null && js(t, e, 1, -1);
}
function Td(e) {
  var t = Is();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ko, lastRenderedState: e }, t.queue = e, e = e.dispatch = z0.bind(null, nn, e), [t.memoizedState, e];
}
function wo(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = nn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, nn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function _f() {
  return ms().memoizedState;
}
function ua(e, t, n, r) {
  var l = Is();
  nn.flags |= e, l.memoizedState = wo(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ja(e, t, n, r) {
  var l = ms();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (xn !== null) {
    var a = xn.memoizedState;
    if (o = a.destroy, r !== null && Nu(r, a.deps)) {
      l.memoizedState = wo(t, n, o, r);
      return;
    }
  }
  nn.flags |= e, l.memoizedState = wo(1 | t, n, o, r);
}
function Ad(e, t) {
  return ua(8390656, 8, e, t);
}
function Eu(e, t) {
  return Ja(2048, 8, e, t);
}
function Ff(e, t) {
  return Ja(4, 2, e, t);
}
function Bf(e, t) {
  return Ja(4, 4, e, t);
}
function Uf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Wf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ja(4, 4, Uf.bind(null, t, e), n);
}
function ju() {
}
function zf(e, t) {
  var n = ms();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Nu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Hf(e, t) {
  var n = ms();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Nu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Kf(e, t, n) {
  return Ur & 21 ? (Cs(n, t) || (n = Xh(), nn.lanes |= n, Wr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Yn = !0), e.memoizedState = n);
}
function U0(e, t) {
  var n = Wt;
  Wt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = bi.transition;
  bi.transition = {};
  try {
    e(!1), t();
  } finally {
    Wt = n, bi.transition = r;
  }
}
function Vf() {
  return ms().memoizedState;
}
function W0(e, t, n) {
  var r = gr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Yf(e)) Gf(t, n);
  else if (n = bf(e, t, n, r), n !== null) {
    var l = _n();
    js(n, e, r, l), Xf(n, t, r);
  }
}
function z0(e, t, n) {
  var r = gr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Yf(e)) Gf(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, i = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = i, Cs(i, a)) {
        var c = t.interleaved;
        c === null ? (l.next = l, mu(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = bf(e, t, l, r), n !== null && (l = _n(), js(n, e, r, l), Xf(n, t, r));
  }
}
function Yf(e) {
  var t = e.alternate;
  return e === nn || t !== null && t === nn;
}
function Gf(e, t) {
  no = Oa = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Xf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tu(e, n);
  }
}
var Da = { readContext: ps, useCallback: bn, useContext: bn, useEffect: bn, useImperativeHandle: bn, useInsertionEffect: bn, useLayoutEffect: bn, useMemo: bn, useReducer: bn, useRef: bn, useState: bn, useDebugValue: bn, useDeferredValue: bn, useTransition: bn, useMutableSource: bn, useSyncExternalStore: bn, useId: bn, unstable_isNewReconciler: !1 }, H0 = { readContext: ps, useCallback: function(e, t) {
  return Is().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ps, useEffect: Ad, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ua(
    4194308,
    4,
    Uf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ua(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ua(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Is();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Is();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = W0.bind(null, nn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Is();
  return e = { current: e }, t.memoizedState = e;
}, useState: Td, useDebugValue: ju, useDeferredValue: function(e) {
  return Is().memoizedState = e;
}, useTransition: function() {
  var e = Td(!1), t = e[0];
  return e = U0.bind(null, e[1]), Is().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = nn, l = Is();
  if (qt) {
    if (n === void 0) throw Error(Ne(407));
    n = n();
  } else {
    if (n = t(), kn === null) throw Error(Ne(349));
    Ur & 30 || Rf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ad(Of.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, wo(9, Lf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Is(), t = kn.identifierPrefix;
  if (qt) {
    var n = Bs, r = Fs;
    n = (r & ~(1 << 32 - Es(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = No++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = B0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, K0 = {
  readContext: ps,
  useCallback: zf,
  useContext: ps,
  useEffect: Eu,
  useImperativeHandle: Wf,
  useInsertionEffect: Ff,
  useLayoutEffect: Bf,
  useMemo: Hf,
  useReducer: Ii,
  useRef: _f,
  useState: function() {
    return Ii(ko);
  },
  useDebugValue: ju,
  useDeferredValue: function(e) {
    var t = ms();
    return Kf(t, xn.memoizedState, e);
  },
  useTransition: function() {
    var e = Ii(ko)[0], t = ms().memoizedState;
    return [e, t];
  },
  useMutableSource: Af,
  useSyncExternalStore: $f,
  useId: Vf,
  unstable_isNewReconciler: !1
}, V0 = { readContext: ps, useCallback: zf, useContext: ps, useEffect: Eu, useImperativeHandle: Wf, useInsertionEffect: Ff, useLayoutEffect: Bf, useMemo: Hf, useReducer: Ti, useRef: _f, useState: function() {
  return Ti(ko);
}, useDebugValue: ju, useDeferredValue: function(e) {
  var t = ms();
  return xn === null ? t.memoizedState = e : Kf(t, xn.memoizedState, e);
}, useTransition: function() {
  var e = Ti(ko)[0], t = ms().memoizedState;
  return [e, t];
}, useMutableSource: Af, useSyncExternalStore: $f, useId: Vf, unstable_isNewReconciler: !1 };
function vs(e, t) {
  if (e && e.defaultProps) {
    t = sn({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function vc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : sn({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Za = { isMounted: function(e) {
  return (e = e._reactInternals) ? Kr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = _n(), l = gr(e), o = Us(r, l);
  o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (js(t, e, l, r), ia(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = _n(), l = gr(e), o = Us(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (js(t, e, l, r), ia(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = _n(), r = gr(e), l = Us(n, r);
  l.tag = 2, t != null && (l.callback = t), t = pr(e, l, r), t !== null && (js(t, e, r, n), ia(t, e, r));
} };
function $d(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !po(n, r) || !po(l, o) : !0;
}
function Qf(e, t, n) {
  var r = !1, l = vr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ps(o) : (l = Xn(t) ? Fr : An.current, r = t.contextTypes, o = (r = r != null) ? El(e, l) : vr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Za, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Rd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Za.enqueueReplaceState(t, t.state, null);
}
function Nc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, gu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ps(o) : (o = Xn(t) ? Fr : An.current, l.context = El(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (vc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Za.enqueueReplaceState(l, l.state, null), Ra(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Ml(e, t) {
  try {
    var n = "", r = t;
    do
      n += Nm(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Ai(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function kc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Y0 = typeof WeakMap == "function" ? WeakMap : Map;
function Jf(e, t, n) {
  n = Us(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    _a || (_a = !0, Ac = r), kc(e, t);
  }, n;
}
function Zf(e, t, n) {
  n = Us(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      kc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    kc(e, t), typeof r != "function" && (mr === null ? mr = /* @__PURE__ */ new Set([this]) : mr.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function Ld(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Y0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = ag.bind(null, e, t, n), t.then(e, e));
}
function Od(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Dd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Us(-1, 1), t.tag = 2, pr(n, t, 1))), n.lanes |= 1), e);
}
var G0 = Ys.ReactCurrentOwner, Yn = !1;
function Pn(e, t, n, r) {
  t.child = e === null ? Mf(t, null, n, r) : Cl(t, e.child, n, r);
}
function Pd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return xl(t, l), r = ku(e, t, n, r, o, l), n = wu(), e !== null && !Yn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Vs(e, t, l)) : (qt && n && cu(t), t.flags |= 1, Pn(e, t, r, l), t.child);
}
function _d(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !$u(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, qf(e, t, o, r, l)) : (e = pa(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : po, n(a, r) && e.ref === t.ref) return Vs(e, t, l);
  }
  return t.flags |= 1, e = xr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function qf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (po(o, r) && e.ref === t.ref) if (Yn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Yn = !0);
    else return t.lanes = e.lanes, Vs(e, t, l);
  }
  return wc(e, t, n, r, l);
}
function ep(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Gt(dl, es), es |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Gt(dl, es), es |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Gt(dl, es), es |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Gt(dl, es), es |= r;
  return Pn(e, t, l, n), t.child;
}
function tp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function wc(e, t, n, r, l) {
  var o = Xn(n) ? Fr : An.current;
  return o = El(t, o), xl(t, l), n = ku(e, t, n, r, o, l), r = wu(), e !== null && !Yn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Vs(e, t, l)) : (qt && r && cu(t), t.flags |= 1, Pn(e, t, n, l), t.child);
}
function Fd(e, t, n, r, l) {
  if (Xn(n)) {
    var o = !0;
    ba(t);
  } else o = !1;
  if (xl(t, l), t.stateNode === null) da(e, t), Qf(t, n, r), Nc(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, i = t.memoizedProps;
    a.props = i;
    var c = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = ps(d) : (d = Xn(n) ? Fr : An.current, d = El(t, d));
    var v = n.getDerivedStateFromProps, f = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && Rd(t, a, r, d), nr = !1;
    var p = t.memoizedState;
    a.state = p, Ra(t, r, a, l), c = t.memoizedState, i !== r || p !== c || Gn.current || nr ? (typeof v == "function" && (vc(t, n, v, r), c = t.memoizedState), (i = nr || $d(t, n, i, r, p, c, d)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, If(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : vs(t.type, i), a.props = d, f = t.pendingProps, p = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = ps(c) : (c = Xn(n) ? Fr : An.current, c = El(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== f || p !== c) && Rd(t, a, r, c), nr = !1, p = t.memoizedState, a.state = p, Ra(t, r, a, l);
    var S = t.memoizedState;
    i !== f || p !== S || Gn.current || nr ? (typeof y == "function" && (vc(t, n, y, r), S = t.memoizedState), (d = nr || $d(t, n, d, r, p, S, c) || !1) ? (v || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, S, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, S, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), a.props = r, a.state = S, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ec(e, t, n, r, o, l);
}
function Ec(e, t, n, r, l, o) {
  tp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && jd(t, n, !1), Vs(e, t, o);
  r = t.stateNode, G0.current = t;
  var i = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Cl(t, e.child, null, o), t.child = Cl(t, null, i, o)) : Pn(e, t, i, o), t.memoizedState = r.state, l && jd(t, n, !0), t.child;
}
function np(e) {
  var t = e.stateNode;
  t.pendingContext ? Ed(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ed(e, t.context, !1), xu(e, t.containerInfo);
}
function Bd(e, t, n, r, l) {
  return jl(), du(l), t.flags |= 256, Pn(e, t, n, r), t.child;
}
var jc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Cc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function sp(e, t, n) {
  var r = t.pendingProps, l = tn.current, o = !1, a = (t.flags & 128) !== 0, i;
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Gt(tn, l & 1), e === null)
    return xc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = ti(a, r, 0, null), e = Pr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Cc(n), t.memoizedState = jc, e) : Cu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return X0(e, t, a, r, i, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, i = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = xr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = xr(i, o) : (o = Pr(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Cc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = jc, r;
  }
  return o = e.child, e = o.sibling, r = xr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Cu(e, t) {
  return t = ti({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Xo(e, t, n, r) {
  return r !== null && du(r), Cl(t, e.child, null, n), e = Cu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function X0(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Ai(Error(Ne(422))), Xo(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = ti({ mode: "visible", children: r.children }, l, 0, null), o = Pr(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Cl(t, e.child, null, a), t.child.memoizedState = Cc(a), t.memoizedState = jc, o);
  if (!(t.mode & 1)) return Xo(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(Ne(419)), r = Ai(o, r, void 0), Xo(e, t, a, r);
  }
  if (i = (a & e.childLanes) !== 0, Yn || i) {
    if (r = kn, r !== null) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ks(e, l), js(r, e, l, -1));
    }
    return Au(), r = Ai(Error(Ne(421))), Xo(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = ig.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, ns = fr(l.nextSibling), ss = t, qt = !0, ks = null, e !== null && (us[ds++] = Fs, us[ds++] = Bs, us[ds++] = Br, Fs = e.id, Bs = e.overflow, Br = t), t = Cu(t, r.children), t.flags |= 4096, t);
}
function Ud(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), yc(e.return, t, n);
}
function $i(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function rp(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Pn(e, t, r.children, n), r = tn.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ud(e, n, t);
      else if (e.tag === 19) Ud(e, n, t);
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
  if (Gt(tn, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && La(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), $i(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && La(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      $i(t, !0, n, null, o);
      break;
    case "together":
      $i(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function da(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Vs(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Wr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(Ne(153));
  if (t.child !== null) {
    for (e = t.child, n = xr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = xr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Q0(e, t, n) {
  switch (t.tag) {
    case 3:
      np(t), jl();
      break;
    case 5:
      Tf(t);
      break;
    case 1:
      Xn(t.type) && ba(t);
      break;
    case 4:
      xu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Gt(Aa, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Gt(tn, tn.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? sp(e, t, n) : (Gt(tn, tn.current & 1), e = Vs(e, t, n), e !== null ? e.sibling : null);
      Gt(tn, tn.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return rp(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Gt(tn, tn.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, ep(e, t, n);
  }
  return Vs(e, t, n);
}
var lp, Sc, op, ap;
lp = function(e, t) {
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
Sc = function() {
};
op = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Rr(Rs.current);
    var o = null;
    switch (n) {
      case "input":
        l = Gi(e, l), r = Gi(e, r), o = [];
        break;
      case "select":
        l = sn({}, l, { value: void 0 }), r = sn({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Ji(e, l), r = Ji(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Sa);
    }
    qi(n, r);
    var a;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var i = l[d];
      for (a in i) i.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (oo.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (i = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== i && (c != null || i != null)) if (d === "style") if (i) {
        for (a in i) !i.hasOwnProperty(a) || c && c.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in c) c.hasOwnProperty(a) && i[a] !== c[a] && (n || (n = {}), n[a] = c[a]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, i = i ? i.__html : void 0, c != null && i !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (oo.hasOwnProperty(d) ? (c != null && d === "onScroll" && Qt("scroll", e), o || i === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
ap = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Wl(e, t) {
  if (!qt) switch (e.tailMode) {
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
function In(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function J0(e, t, n) {
  var r = t.pendingProps;
  switch (uu(t), t.tag) {
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
      return In(t), null;
    case 1:
      return Xn(t.type) && Ma(), In(t), null;
    case 3:
      return r = t.stateNode, Sl(), Jt(Gn), Jt(An), vu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Yo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ks !== null && (Lc(ks), ks = null))), Sc(e, t), In(t), null;
    case 5:
      yu(t);
      var l = Rr(vo.current);
      if (n = t.type, e !== null && t.stateNode != null) op(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(Ne(166));
          return In(t), null;
        }
        if (e = Rr(Rs.current), Yo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ts] = t, r[xo] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Qt("cancel", r), Qt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Qt("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ql.length; l++) Qt(Ql[l], r);
              break;
            case "source":
              Qt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Qt(
                "error",
                r
              ), Qt("load", r);
              break;
            case "details":
              Qt("toggle", r);
              break;
            case "input":
              Qu(r, o), Qt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Qt("invalid", r);
              break;
            case "textarea":
              Zu(r, o), Qt("invalid", r);
          }
          qi(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var i = o[a];
            a === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && Vo(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && Vo(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : oo.hasOwnProperty(a) && i != null && a === "onScroll" && Qt("scroll", r);
          }
          switch (n) {
            case "input":
              _o(r), Ju(r, o, !0);
              break;
            case "textarea":
              _o(r), qu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Sa);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Lh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Ts] = t, e[xo] = r, lp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = ec(n, r), n) {
              case "dialog":
                Qt("cancel", e), Qt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Qt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ql.length; l++) Qt(Ql[l], e);
                l = r;
                break;
              case "source":
                Qt("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Qt(
                  "error",
                  e
                ), Qt("load", e), l = r;
                break;
              case "details":
                Qt("toggle", e), l = r;
                break;
              case "input":
                Qu(e, r), l = Gi(e, r), Qt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = sn({}, r, { value: void 0 }), Qt("invalid", e);
                break;
              case "textarea":
                Zu(e, r), l = Ji(e, r), Qt("invalid", e);
                break;
              default:
                l = r;
            }
            qi(n, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var c = i[o];
              o === "style" ? Ph(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Oh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && ao(e, c) : typeof c == "number" && ao(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (oo.hasOwnProperty(o) ? c != null && o === "onScroll" && Qt("scroll", e) : c != null && Xc(e, o, c, a));
            }
            switch (n) {
              case "input":
                _o(e), Ju(e, r, !1);
                break;
              case "textarea":
                _o(e), qu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + yr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? fl(e, !!r.multiple, o, !1) : r.defaultValue != null && fl(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Sa);
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
      return In(t), null;
    case 6:
      if (e && t.stateNode != null) ap(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(Ne(166));
        if (n = Rr(vo.current), Rr(Rs.current), Yo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ts] = t, (o = r.nodeValue !== n) && (e = ss, e !== null)) switch (e.tag) {
            case 3:
              Vo(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Vo(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ts] = t, t.stateNode = r;
      }
      return In(t), null;
    case 13:
      if (Jt(tn), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (qt && ns !== null && t.mode & 1 && !(t.flags & 128)) Cf(), jl(), t.flags |= 98560, o = !1;
        else if (o = Yo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(Ne(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(Ne(317));
            o[Ts] = t;
          } else jl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          In(t), o = !1;
        } else ks !== null && (Lc(ks), ks = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || tn.current & 1 ? yn === 0 && (yn = 3) : Au())), t.updateQueue !== null && (t.flags |= 4), In(t), null);
    case 4:
      return Sl(), Sc(e, t), e === null && mo(t.stateNode.containerInfo), In(t), null;
    case 10:
      return pu(t.type._context), In(t), null;
    case 17:
      return Xn(t.type) && Ma(), In(t), null;
    case 19:
      if (Jt(tn), o = t.memoizedState, o === null) return In(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) Wl(o, !1);
      else {
        if (yn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = La(e), a !== null) {
            for (t.flags |= 128, Wl(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Gt(tn, tn.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && un() > bl && (t.flags |= 128, r = !0, Wl(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = La(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Wl(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !qt) return In(t), null;
        } else 2 * un() - o.renderingStartTime > bl && n !== 1073741824 && (t.flags |= 128, r = !0, Wl(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = un(), t.sibling = null, n = tn.current, Gt(tn, r ? n & 1 | 2 : n & 1), t) : (In(t), null);
    case 22:
    case 23:
      return Tu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? es & 1073741824 && (In(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : In(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Ne(156, t.tag));
}
function Z0(e, t) {
  switch (uu(t), t.tag) {
    case 1:
      return Xn(t.type) && Ma(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Sl(), Jt(Gn), Jt(An), vu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return yu(t), null;
    case 13:
      if (Jt(tn), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(Ne(340));
        jl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Jt(tn), null;
    case 4:
      return Sl(), null;
    case 10:
      return pu(t.type._context), null;
    case 22:
    case 23:
      return Tu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Qo = !1, Tn = !1, q0 = typeof WeakSet == "function" ? WeakSet : Set, He = null;
function ul(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    on(e, t, r);
  }
  else n.current = null;
}
function Mc(e, t, n) {
  try {
    n();
  } catch (r) {
    on(e, t, r);
  }
}
var Wd = !1;
function eg(e, t) {
  if (uc = Ea, e = hf(), iu(e)) {
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
        var a = 0, i = -1, c = -1, d = 0, v = 0, f = e, p = null;
        t: for (; ; ) {
          for (var y; f !== n || l !== 0 && f.nodeType !== 3 || (i = a + l), f !== o || r !== 0 && f.nodeType !== 3 || (c = a + r), f.nodeType === 3 && (a += f.nodeValue.length), (y = f.firstChild) !== null; )
            p = f, f = y;
          for (; ; ) {
            if (f === e) break t;
            if (p === n && ++d === l && (i = a), p === o && ++v === r && (c = a), (y = f.nextSibling) !== null) break;
            f = p, p = f.parentNode;
          }
          f = y;
        }
        n = i === -1 || c === -1 ? null : { start: i, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (dc = { focusedElem: e, selectionRange: n }, Ea = !1, He = t; He !== null; ) if (t = He, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, He = e;
  else for (; He !== null; ) {
    t = He;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var M = S.memoizedProps, _ = S.memoizedState, k = t.stateNode, g = k.getSnapshotBeforeUpdate(t.elementType === t.type ? M : vs(t.type, M), _);
            k.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var m = t.stateNode.containerInfo;
          m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(Ne(163));
      }
    } catch (T) {
      on(t, t.return, T);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, He = e;
      break;
    }
    He = t.return;
  }
  return S = Wd, Wd = !1, S;
}
function so(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Mc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function qa(e, t) {
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
function bc(e) {
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
function ip(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, ip(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ts], delete t[xo], delete t[pc], delete t[D0], delete t[P0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function cp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function zd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || cp(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ic(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Sa));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ic(e, t, n), e = e.sibling; e !== null; ) Ic(e, t, n), e = e.sibling;
}
function Tc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Tc(e, t, n), e = e.sibling; e !== null; ) Tc(e, t, n), e = e.sibling;
}
var jn = null, Ns = !1;
function Zs(e, t, n) {
  for (n = n.child; n !== null; ) up(e, t, n), n = n.sibling;
}
function up(e, t, n) {
  if ($s && typeof $s.onCommitFiberUnmount == "function") try {
    $s.onCommitFiberUnmount(Ka, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Tn || ul(n, t);
    case 6:
      var r = jn, l = Ns;
      jn = null, Zs(e, t, n), jn = r, Ns = l, jn !== null && (Ns ? (e = jn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : jn.removeChild(n.stateNode));
      break;
    case 18:
      jn !== null && (Ns ? (e = jn, n = n.stateNode, e.nodeType === 8 ? Ci(e.parentNode, n) : e.nodeType === 1 && Ci(e, n), ho(e)) : Ci(jn, n.stateNode));
      break;
    case 4:
      r = jn, l = Ns, jn = n.stateNode.containerInfo, Ns = !0, Zs(e, t, n), jn = r, Ns = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Tn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Mc(n, t, a), l = l.next;
        } while (l !== r);
      }
      Zs(e, t, n);
      break;
    case 1:
      if (!Tn && (ul(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        on(n, t, i);
      }
      Zs(e, t, n);
      break;
    case 21:
      Zs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Tn = (r = Tn) || n.memoizedState !== null, Zs(e, t, n), Tn = r) : Zs(e, t, n);
      break;
    default:
      Zs(e, t, n);
  }
}
function Hd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new q0()), t.forEach(function(r) {
      var l = cg.bind(null, e, r);
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
            jn = i.stateNode, Ns = !1;
            break e;
          case 3:
            jn = i.stateNode.containerInfo, Ns = !0;
            break e;
          case 4:
            jn = i.stateNode.containerInfo, Ns = !0;
            break e;
        }
        i = i.return;
      }
      if (jn === null) throw Error(Ne(160));
      up(o, a, l), jn = null, Ns = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      on(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) dp(t, e), t = t.sibling;
}
function dp(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ys(t, e), bs(e), r & 4) {
        try {
          so(3, e, e.return), qa(3, e);
        } catch (M) {
          on(e, e.return, M);
        }
        try {
          so(5, e, e.return);
        } catch (M) {
          on(e, e.return, M);
        }
      }
      break;
    case 1:
      ys(t, e), bs(e), r & 512 && n !== null && ul(n, n.return);
      break;
    case 5:
      if (ys(t, e), bs(e), r & 512 && n !== null && ul(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          ao(l, "");
        } catch (M) {
          on(e, e.return, M);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, i = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          i === "input" && o.type === "radio" && o.name != null && $h(l, o), ec(i, a);
          var d = ec(i, o);
          for (a = 0; a < c.length; a += 2) {
            var v = c[a], f = c[a + 1];
            v === "style" ? Ph(l, f) : v === "dangerouslySetInnerHTML" ? Oh(l, f) : v === "children" ? ao(l, f) : Xc(l, v, f, d);
          }
          switch (i) {
            case "input":
              Xi(l, o);
              break;
            case "textarea":
              Rh(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? fl(l, !!o.multiple, y, !1) : p !== !!o.multiple && (o.defaultValue != null ? fl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : fl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[xo] = o;
        } catch (M) {
          on(e, e.return, M);
        }
      }
      break;
    case 6:
      if (ys(t, e), bs(e), r & 4) {
        if (e.stateNode === null) throw Error(Ne(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (M) {
          on(e, e.return, M);
        }
      }
      break;
    case 3:
      if (ys(t, e), bs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        ho(t.containerInfo);
      } catch (M) {
        on(e, e.return, M);
      }
      break;
    case 4:
      ys(t, e), bs(e);
      break;
    case 13:
      ys(t, e), bs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (bu = un())), r & 4 && Hd(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (Tn = (d = Tn) || v, ys(t, e), Tn = d) : ys(t, e), bs(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (He = e, v = e.child; v !== null; ) {
          for (f = He = v; He !== null; ) {
            switch (p = He, y = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                so(4, p, p.return);
                break;
              case 1:
                ul(p, p.return);
                var S = p.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (M) {
                    on(r, n, M);
                  }
                }
                break;
              case 5:
                ul(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  Vd(f);
                  continue;
                }
            }
            y !== null ? (y.return = p, He = y) : Vd(f);
          }
          v = v.sibling;
        }
        e: for (v = null, f = e; ; ) {
          if (f.tag === 5) {
            if (v === null) {
              v = f;
              try {
                l = f.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = f.stateNode, c = f.memoizedProps.style, a = c != null && c.hasOwnProperty("display") ? c.display : null, i.style.display = Dh("display", a));
              } catch (M) {
                on(e, e.return, M);
              }
            }
          } else if (f.tag === 6) {
            if (v === null) try {
              f.stateNode.nodeValue = d ? "" : f.memoizedProps;
            } catch (M) {
              on(e, e.return, M);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            v === f && (v = null), f = f.return;
          }
          v === f && (v = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      ys(t, e), bs(e), r & 4 && Hd(e);
      break;
    case 21:
      break;
    default:
      ys(
        t,
        e
      ), bs(e);
  }
}
function bs(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (cp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(Ne(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (ao(l, ""), r.flags &= -33);
          var o = zd(e);
          Tc(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, i = zd(e);
          Ic(e, i, a);
          break;
        default:
          throw Error(Ne(161));
      }
    } catch (c) {
      on(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function tg(e, t, n) {
  He = e, hp(e);
}
function hp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; He !== null; ) {
    var l = He, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || Qo;
      if (!a) {
        var i = l.alternate, c = i !== null && i.memoizedState !== null || Tn;
        i = Qo;
        var d = Tn;
        if (Qo = a, (Tn = c) && !d) for (He = l; He !== null; ) a = He, c = a.child, a.tag === 22 && a.memoizedState !== null ? Yd(l) : c !== null ? (c.return = a, He = c) : Yd(l);
        for (; o !== null; ) He = o, hp(o), o = o.sibling;
        He = l, Qo = i, Tn = d;
      }
      Kd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, He = o) : Kd(e);
  }
}
function Kd(e) {
  for (; He !== null; ) {
    var t = He;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Tn || qa(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Tn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : vs(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Id(t, o, r);
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
              Id(t, a, n);
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
                  var f = v.dehydrated;
                  f !== null && ho(f);
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
            throw Error(Ne(163));
        }
        Tn || t.flags & 512 && bc(t);
      } catch (p) {
        on(t, t.return, p);
      }
    }
    if (t === e) {
      He = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, He = n;
      break;
    }
    He = t.return;
  }
}
function Vd(e) {
  for (; He !== null; ) {
    var t = He;
    if (t === e) {
      He = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, He = n;
      break;
    }
    He = t.return;
  }
}
function Yd(e) {
  for (; He !== null; ) {
    var t = He;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            qa(4, t);
          } catch (c) {
            on(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              on(t, l, c);
            }
          }
          var o = t.return;
          try {
            bc(t);
          } catch (c) {
            on(t, o, c);
          }
          break;
        case 5:
          var a = t.return;
          try {
            bc(t);
          } catch (c) {
            on(t, a, c);
          }
      }
    } catch (c) {
      on(t, t.return, c);
    }
    if (t === e) {
      He = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, He = i;
      break;
    }
    He = t.return;
  }
}
var ng = Math.ceil, Pa = Ys.ReactCurrentDispatcher, Su = Ys.ReactCurrentOwner, fs = Ys.ReactCurrentBatchConfig, It = 0, kn = null, fn = null, Cn = 0, es = 0, dl = kr(0), yn = 0, Eo = null, Wr = 0, ei = 0, Mu = 0, ro = null, Vn = null, bu = 0, bl = 1 / 0, Ds = null, _a = !1, Ac = null, mr = null, Jo = !1, cr = null, Fa = 0, lo = 0, $c = null, ha = -1, fa = 0;
function _n() {
  return It & 6 ? un() : ha !== -1 ? ha : ha = un();
}
function gr(e) {
  return e.mode & 1 ? It & 2 && Cn !== 0 ? Cn & -Cn : F0.transition !== null ? (fa === 0 && (fa = Xh()), fa) : (e = Wt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : nf(e.type)), e) : 1;
}
function js(e, t, n, r) {
  if (50 < lo) throw lo = 0, $c = null, Error(Ne(185));
  Mo(e, n, r), (!(It & 2) || e !== kn) && (e === kn && (!(It & 2) && (ei |= n), yn === 4 && or(e, Cn)), Qn(e, r), n === 1 && It === 0 && !(t.mode & 1) && (bl = un() + 500, Qa && wr()));
}
function Qn(e, t) {
  var n = e.callbackNode;
  Fm(e, t);
  var r = wa(e, e === kn ? Cn : 0);
  if (r === 0) n !== null && nd(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && nd(n), t === 1) e.tag === 0 ? _0(Gd.bind(null, e)) : wf(Gd.bind(null, e)), L0(function() {
      !(It & 6) && wr();
    }), n = null;
    else {
      switch (Qh(r)) {
        case 1:
          n = eu;
          break;
        case 4:
          n = Yh;
          break;
        case 16:
          n = ka;
          break;
        case 536870912:
          n = Gh;
          break;
        default:
          n = ka;
      }
      n = Np(n, fp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function fp(e, t) {
  if (ha = -1, fa = 0, It & 6) throw Error(Ne(327));
  var n = e.callbackNode;
  if (yl() && e.callbackNode !== n) return null;
  var r = wa(e, e === kn ? Cn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ba(e, r);
  else {
    t = r;
    var l = It;
    It |= 2;
    var o = mp();
    (kn !== e || Cn !== t) && (Ds = null, bl = un() + 500, Dr(e, t));
    do
      try {
        lg();
        break;
      } catch (i) {
        pp(e, i);
      }
    while (!0);
    fu(), Pa.current = o, It = l, fn !== null ? t = 0 : (kn = null, Cn = 0, t = yn);
  }
  if (t !== 0) {
    if (t === 2 && (l = lc(e), l !== 0 && (r = l, t = Rc(e, l))), t === 1) throw n = Eo, Dr(e, 0), or(e, r), Qn(e, un()), n;
    if (t === 6) or(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !sg(l) && (t = Ba(e, r), t === 2 && (o = lc(e), o !== 0 && (r = o, t = Rc(e, o))), t === 1)) throw n = Eo, Dr(e, 0), or(e, r), Qn(e, un()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(Ne(345));
        case 2:
          Ir(e, Vn, Ds);
          break;
        case 3:
          if (or(e, r), (r & 130023424) === r && (t = bu + 500 - un(), 10 < t)) {
            if (wa(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              _n(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = fc(Ir.bind(null, e, Vn, Ds), t);
            break;
          }
          Ir(e, Vn, Ds);
          break;
        case 4:
          if (or(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - Es(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = un() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ng(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = fc(Ir.bind(null, e, Vn, Ds), r);
            break;
          }
          Ir(e, Vn, Ds);
          break;
        case 5:
          Ir(e, Vn, Ds);
          break;
        default:
          throw Error(Ne(329));
      }
    }
  }
  return Qn(e, un()), e.callbackNode === n ? fp.bind(null, e) : null;
}
function Rc(e, t) {
  var n = ro;
  return e.current.memoizedState.isDehydrated && (Dr(e, t).flags |= 256), e = Ba(e, t), e !== 2 && (t = Vn, Vn = n, t !== null && Lc(t)), e;
}
function Lc(e) {
  Vn === null ? Vn = e : Vn.push.apply(Vn, e);
}
function sg(e) {
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
  for (t &= ~Mu, t &= ~ei, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Es(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Gd(e) {
  if (It & 6) throw Error(Ne(327));
  yl();
  var t = wa(e, 0);
  if (!(t & 1)) return Qn(e, un()), null;
  var n = Ba(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = lc(e);
    r !== 0 && (t = r, n = Rc(e, r));
  }
  if (n === 1) throw n = Eo, Dr(e, 0), or(e, t), Qn(e, un()), n;
  if (n === 6) throw Error(Ne(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ir(e, Vn, Ds), Qn(e, un()), null;
}
function Iu(e, t) {
  var n = It;
  It |= 1;
  try {
    return e(t);
  } finally {
    It = n, It === 0 && (bl = un() + 500, Qa && wr());
  }
}
function zr(e) {
  cr !== null && cr.tag === 0 && !(It & 6) && yl();
  var t = It;
  It |= 1;
  var n = fs.transition, r = Wt;
  try {
    if (fs.transition = null, Wt = 1, e) return e();
  } finally {
    Wt = r, fs.transition = n, It = t, !(It & 6) && wr();
  }
}
function Tu() {
  es = dl.current, Jt(dl);
}
function Dr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, R0(n)), fn !== null) for (n = fn.return; n !== null; ) {
    var r = n;
    switch (uu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ma();
        break;
      case 3:
        Sl(), Jt(Gn), Jt(An), vu();
        break;
      case 5:
        yu(r);
        break;
      case 4:
        Sl();
        break;
      case 13:
        Jt(tn);
        break;
      case 19:
        Jt(tn);
        break;
      case 10:
        pu(r.type._context);
        break;
      case 22:
      case 23:
        Tu();
    }
    n = n.return;
  }
  if (kn = e, fn = e = xr(e.current, null), Cn = es = t, yn = 0, Eo = null, Mu = ei = Wr = 0, Vn = ro = null, $r !== null) {
    for (t = 0; t < $r.length; t++) if (n = $r[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = l, r.next = a;
      }
      n.pending = r;
    }
    $r = null;
  }
  return e;
}
function pp(e, t) {
  do {
    var n = fn;
    try {
      if (fu(), ca.current = Da, Oa) {
        for (var r = nn.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Oa = !1;
      }
      if (Ur = 0, Nn = xn = nn = null, no = !1, No = 0, Su.current = null, n === null || n.return === null) {
        yn = 1, Eo = t, fn = null;
        break;
      }
      e: {
        var o = e, a = n.return, i = n, c = t;
        if (t = Cn, i.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = i, f = v.tag;
          if (!(v.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = v.alternate;
            p ? (v.updateQueue = p.updateQueue, v.memoizedState = p.memoizedState, v.lanes = p.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = Od(a);
          if (y !== null) {
            y.flags &= -257, Dd(y, a, i, o, t), y.mode & 1 && Ld(o, d, t), t = y, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var M = /* @__PURE__ */ new Set();
              M.add(c), t.updateQueue = M;
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              Ld(o, d, t), Au();
              break e;
            }
            c = Error(Ne(426));
          }
        } else if (qt && i.mode & 1) {
          var _ = Od(a);
          if (_ !== null) {
            !(_.flags & 65536) && (_.flags |= 256), Dd(_, a, i, o, t), du(Ml(c, i));
            break e;
          }
        }
        o = c = Ml(c, i), yn !== 4 && (yn = 2), ro === null ? ro = [o] : ro.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Jf(o, c, t);
              bd(o, k);
              break e;
            case 1:
              i = c;
              var g = o.type, m = o.stateNode;
              if (!(o.flags & 128) && (typeof g.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (mr === null || !mr.has(m)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var T = Zf(o, i, t);
                bd(o, T);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      xp(n);
    } catch (w) {
      t = w, fn === n && n !== null && (fn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function mp() {
  var e = Pa.current;
  return Pa.current = Da, e === null ? Da : e;
}
function Au() {
  (yn === 0 || yn === 3 || yn === 2) && (yn = 4), kn === null || !(Wr & 268435455) && !(ei & 268435455) || or(kn, Cn);
}
function Ba(e, t) {
  var n = It;
  It |= 2;
  var r = mp();
  (kn !== e || Cn !== t) && (Ds = null, Dr(e, t));
  do
    try {
      rg();
      break;
    } catch (l) {
      pp(e, l);
    }
  while (!0);
  if (fu(), It = n, Pa.current = r, fn !== null) throw Error(Ne(261));
  return kn = null, Cn = 0, yn;
}
function rg() {
  for (; fn !== null; ) gp(fn);
}
function lg() {
  for (; fn !== null && !Tm(); ) gp(fn);
}
function gp(e) {
  var t = vp(e.alternate, e, es);
  e.memoizedProps = e.pendingProps, t === null ? xp(e) : fn = t, Su.current = null;
}
function xp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Z0(n, t), n !== null) {
        n.flags &= 32767, fn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        yn = 6, fn = null;
        return;
      }
    } else if (n = J0(n, t, es), n !== null) {
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
function Ir(e, t, n) {
  var r = Wt, l = fs.transition;
  try {
    fs.transition = null, Wt = 1, og(e, t, n, r);
  } finally {
    fs.transition = l, Wt = r;
  }
  return null;
}
function og(e, t, n, r) {
  do
    yl();
  while (cr !== null);
  if (It & 6) throw Error(Ne(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(Ne(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Bm(e, o), e === kn && (fn = kn = null, Cn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Jo || (Jo = !0, Np(ka, function() {
    return yl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = fs.transition, fs.transition = null;
    var a = Wt;
    Wt = 1;
    var i = It;
    It |= 4, Su.current = null, eg(e, n), dp(n, e), S0(dc), Ea = !!uc, dc = uc = null, e.current = n, tg(n), Am(), It = i, Wt = a, fs.transition = o;
  } else e.current = n;
  if (Jo && (Jo = !1, cr = e, Fa = l), o = e.pendingLanes, o === 0 && (mr = null), Lm(n.stateNode), Qn(e, un()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (_a) throw _a = !1, e = Ac, Ac = null, e;
  return Fa & 1 && e.tag !== 0 && yl(), o = e.pendingLanes, o & 1 ? e === $c ? lo++ : (lo = 0, $c = e) : lo = 0, wr(), null;
}
function yl() {
  if (cr !== null) {
    var e = Qh(Fa), t = fs.transition, n = Wt;
    try {
      if (fs.transition = null, Wt = 16 > e ? 16 : e, cr === null) var r = !1;
      else {
        if (e = cr, cr = null, Fa = 0, It & 6) throw Error(Ne(331));
        var l = It;
        for (It |= 4, He = e.current; He !== null; ) {
          var o = He, a = o.child;
          if (He.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var c = 0; c < i.length; c++) {
                var d = i[c];
                for (He = d; He !== null; ) {
                  var v = He;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      so(8, v, o);
                  }
                  var f = v.child;
                  if (f !== null) f.return = v, He = f;
                  else for (; He !== null; ) {
                    v = He;
                    var p = v.sibling, y = v.return;
                    if (ip(v), v === d) {
                      He = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = y, He = p;
                      break;
                    }
                    He = y;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var M = S.child;
                if (M !== null) {
                  S.child = null;
                  do {
                    var _ = M.sibling;
                    M.sibling = null, M = _;
                  } while (M !== null);
                }
              }
              He = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, He = a;
          else e: for (; He !== null; ) {
            if (o = He, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                so(9, o, o.return);
            }
            var k = o.sibling;
            if (k !== null) {
              k.return = o.return, He = k;
              break e;
            }
            He = o.return;
          }
        }
        var g = e.current;
        for (He = g; He !== null; ) {
          a = He;
          var m = a.child;
          if (a.subtreeFlags & 2064 && m !== null) m.return = a, He = m;
          else e: for (a = g; He !== null; ) {
            if (i = He, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  qa(9, i);
              }
            } catch (w) {
              on(i, i.return, w);
            }
            if (i === a) {
              He = null;
              break e;
            }
            var T = i.sibling;
            if (T !== null) {
              T.return = i.return, He = T;
              break e;
            }
            He = i.return;
          }
        }
        if (It = l, wr(), $s && typeof $s.onPostCommitFiberRoot == "function") try {
          $s.onPostCommitFiberRoot(Ka, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Wt = n, fs.transition = t;
    }
  }
  return !1;
}
function Xd(e, t, n) {
  t = Ml(n, t), t = Jf(e, t, 1), e = pr(e, t, 1), t = _n(), e !== null && (Mo(e, 1, t), Qn(e, t));
}
function on(e, t, n) {
  if (e.tag === 3) Xd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Xd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mr === null || !mr.has(r))) {
        e = Ml(n, e), e = Zf(t, e, 1), t = pr(t, e, 1), e = _n(), t !== null && (Mo(t, 1, e), Qn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function ag(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = _n(), e.pingedLanes |= e.suspendedLanes & n, kn === e && (Cn & n) === n && (yn === 4 || yn === 3 && (Cn & 130023424) === Cn && 500 > un() - bu ? Dr(e, 0) : Mu |= n), Qn(e, t);
}
function yp(e, t) {
  t === 0 && (e.mode & 1 ? (t = Uo, Uo <<= 1, !(Uo & 130023424) && (Uo = 4194304)) : t = 1);
  var n = _n();
  e = Ks(e, t), e !== null && (Mo(e, t, n), Qn(e, n));
}
function ig(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), yp(e, n);
}
function cg(e, t) {
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
      throw Error(Ne(314));
  }
  r !== null && r.delete(t), yp(e, n);
}
var vp;
vp = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Gn.current) Yn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Yn = !1, Q0(e, t, n);
    Yn = !!(e.flags & 131072);
  }
  else Yn = !1, qt && t.flags & 1048576 && Ef(t, Ta, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      da(e, t), e = t.pendingProps;
      var l = El(t, An.current);
      xl(t, n), l = ku(null, t, r, e, l, n);
      var o = wu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Xn(r) ? (o = !0, ba(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, gu(t), l.updater = Za, t.stateNode = l, l._reactInternals = t, Nc(t, r, e, n), t = Ec(null, t, r, !0, o, n)) : (t.tag = 0, qt && o && cu(t), Pn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (da(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = dg(r), e = vs(r, e), l) {
          case 0:
            t = wc(null, t, r, e, n);
            break e;
          case 1:
            t = Fd(null, t, r, e, n);
            break e;
          case 11:
            t = Pd(null, t, r, e, n);
            break e;
          case 14:
            t = _d(null, t, r, vs(r.type, e), n);
            break e;
        }
        throw Error(Ne(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), wc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), Fd(e, t, r, l, n);
    case 3:
      e: {
        if (np(t), e === null) throw Error(Ne(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, If(e, t), Ra(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Ml(Error(Ne(423)), t), t = Bd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Ml(Error(Ne(424)), t), t = Bd(e, t, r, n, l);
          break e;
        } else for (ns = fr(t.stateNode.containerInfo.firstChild), ss = t, qt = !0, ks = null, n = Mf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
      return Tf(t), e === null && xc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, hc(r, l) ? a = null : o !== null && hc(r, o) && (t.flags |= 32), tp(e, t), Pn(e, t, a, n), t.child;
    case 6:
      return e === null && xc(t), null;
    case 13:
      return sp(e, t, n);
    case 4:
      return xu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Cl(t, null, r, n) : Pn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), Pd(e, t, r, l, n);
    case 7:
      return Pn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Pn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Pn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, Gt(Aa, r._currentValue), r._currentValue = a, o !== null) if (Cs(o.value, a)) {
          if (o.children === l.children && !Gn.current) {
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
                    var v = d.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), yc(
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
            if (a = o.return, a === null) throw Error(Ne(341));
            a.lanes |= n, i = a.alternate, i !== null && (i.lanes |= n), yc(a, n, t), a = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, xl(t, n), l = ps(l), r = r(l), t.flags |= 1, Pn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = vs(r, t.pendingProps), l = vs(r.type, l), _d(e, t, r, l, n);
    case 15:
      return qf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), da(e, t), t.tag = 1, Xn(r) ? (e = !0, ba(t)) : e = !1, xl(t, n), Qf(t, r, l), Nc(t, r, l, n), Ec(null, t, r, !0, e, n);
    case 19:
      return rp(e, t, n);
    case 22:
      return ep(e, t, n);
  }
  throw Error(Ne(156, t.tag));
};
function Np(e, t) {
  return Vh(e, t);
}
function ug(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function hs(e, t, n, r) {
  return new ug(e, t, n, r);
}
function $u(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function dg(e) {
  if (typeof e == "function") return $u(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Jc) return 11;
    if (e === Zc) return 14;
  }
  return 2;
}
function xr(e, t) {
  var n = e.alternate;
  return n === null ? (n = hs(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function pa(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") $u(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case tl:
      return Pr(n.children, l, o, t);
    case Qc:
      a = 8, l |= 8;
      break;
    case Hi:
      return e = hs(12, n, t, l | 2), e.elementType = Hi, e.lanes = o, e;
    case Ki:
      return e = hs(13, n, t, l), e.elementType = Ki, e.lanes = o, e;
    case Vi:
      return e = hs(19, n, t, l), e.elementType = Vi, e.lanes = o, e;
    case Ih:
      return ti(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Mh:
          a = 10;
          break e;
        case bh:
          a = 9;
          break e;
        case Jc:
          a = 11;
          break e;
        case Zc:
          a = 14;
          break e;
        case tr:
          a = 16, r = null;
          break e;
      }
      throw Error(Ne(130, e == null ? e : typeof e, ""));
  }
  return t = hs(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Pr(e, t, n, r) {
  return e = hs(7, e, r, t), e.lanes = n, e;
}
function ti(e, t, n, r) {
  return e = hs(22, e, r, t), e.elementType = Ih, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Ri(e, t, n) {
  return e = hs(6, e, null, t), e.lanes = n, e;
}
function Li(e, t, n) {
  return t = hs(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function hg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = pi(0), this.expirationTimes = pi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = pi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ru(e, t, n, r, l, o, a, i, c) {
  return e = new hg(e, t, n, i, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = hs(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, gu(o), e;
}
function fg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: el, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function kp(e) {
  if (!e) return vr;
  e = e._reactInternals;
  e: {
    if (Kr(e) !== e || e.tag !== 1) throw Error(Ne(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Xn(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(Ne(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Xn(n)) return kf(e, n, t);
  }
  return t;
}
function wp(e, t, n, r, l, o, a, i, c) {
  return e = Ru(n, r, !0, e, l, o, a, i, c), e.context = kp(null), n = e.current, r = _n(), l = gr(n), o = Us(r, l), o.callback = t ?? null, pr(n, o, l), e.current.lanes = l, Mo(e, l, r), Qn(e, r), e;
}
function ni(e, t, n, r) {
  var l = t.current, o = _n(), a = gr(l);
  return n = kp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Us(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = pr(l, t, a), e !== null && (js(e, l, a, o), ia(e, l, a)), a;
}
function Ua(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Qd(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Lu(e, t) {
  Qd(e, t), (e = e.alternate) && Qd(e, t);
}
function pg() {
  return null;
}
var Ep = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ou(e) {
  this._internalRoot = e;
}
si.prototype.render = Ou.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(Ne(409));
  ni(e, t, null, null);
};
si.prototype.unmount = Ou.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    zr(function() {
      ni(null, e, null, null);
    }), t[Hs] = null;
  }
};
function si(e) {
  this._internalRoot = e;
}
si.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = qh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lr.length && t !== 0 && t < lr[n].priority; n++) ;
    lr.splice(n, 0, e), n === 0 && tf(e);
  }
};
function Du(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function ri(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Jd() {
}
function mg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = Ua(a);
        o.call(d);
      };
    }
    var a = wp(t, r, e, 0, null, !1, !1, "", Jd);
    return e._reactRootContainer = a, e[Hs] = a.current, mo(e.nodeType === 8 ? e.parentNode : e), zr(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var d = Ua(c);
      i.call(d);
    };
  }
  var c = Ru(e, 0, !1, null, null, !1, !1, "", Jd);
  return e._reactRootContainer = c, e[Hs] = c.current, mo(e.nodeType === 8 ? e.parentNode : e), zr(function() {
    ni(t, c, n, r);
  }), c;
}
function li(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var c = Ua(a);
        i.call(c);
      };
    }
    ni(t, a, e, l);
  } else a = mg(n, t, e, l, r);
  return Ua(a);
}
Jh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Xl(t.pendingLanes);
        n !== 0 && (tu(t, n | 1), Qn(t, un()), !(It & 6) && (bl = un() + 500, wr()));
      }
      break;
    case 13:
      zr(function() {
        var r = Ks(e, 1);
        if (r !== null) {
          var l = _n();
          js(r, e, 1, l);
        }
      }), Lu(e, 1);
  }
};
nu = function(e) {
  if (e.tag === 13) {
    var t = Ks(e, 134217728);
    if (t !== null) {
      var n = _n();
      js(t, e, 134217728, n);
    }
    Lu(e, 134217728);
  }
};
Zh = function(e) {
  if (e.tag === 13) {
    var t = gr(e), n = Ks(e, t);
    if (n !== null) {
      var r = _n();
      js(n, e, t, r);
    }
    Lu(e, t);
  }
};
qh = function() {
  return Wt;
};
ef = function(e, t) {
  var n = Wt;
  try {
    return Wt = e, t();
  } finally {
    Wt = n;
  }
};
nc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Xi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Xa(r);
            if (!l) throw Error(Ne(90));
            Ah(r), Xi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Rh(e, n);
      break;
    case "select":
      t = n.value, t != null && fl(e, !!n.multiple, t, !1);
  }
};
Bh = Iu;
Uh = zr;
var gg = { usingClientEntryPoint: !1, Events: [Io, ll, Xa, _h, Fh, Iu] }, zl = { findFiberByHostInstance: Ar, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, xg = { bundleType: zl.bundleType, version: zl.version, rendererPackageName: zl.rendererPackageName, rendererConfig: zl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ys.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Hh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: zl.findFiberByHostInstance || pg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Zo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Zo.isDisabled && Zo.supportsFiber) try {
    Ka = Zo.inject(xg), $s = Zo;
  } catch {
  }
}
ls.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gg;
ls.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Du(t)) throw Error(Ne(200));
  return fg(e, t, null, n);
};
ls.createRoot = function(e, t) {
  if (!Du(e)) throw Error(Ne(299));
  var n = !1, r = "", l = Ep;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ru(e, 1, !1, null, null, n, !1, r, l), e[Hs] = t.current, mo(e.nodeType === 8 ? e.parentNode : e), new Ou(t);
};
ls.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(Ne(188)) : (e = Object.keys(e).join(","), Error(Ne(268, e)));
  return e = Hh(t), e = e === null ? null : e.stateNode, e;
};
ls.flushSync = function(e) {
  return zr(e);
};
ls.hydrate = function(e, t, n) {
  if (!ri(t)) throw Error(Ne(200));
  return li(null, e, t, !0, n);
};
ls.hydrateRoot = function(e, t, n) {
  if (!Du(e)) throw Error(Ne(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = Ep;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = wp(t, null, e, 1, n ?? null, l, !1, o, a), e[Hs] = t.current, mo(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new si(t);
};
ls.render = function(e, t, n) {
  if (!ri(t)) throw Error(Ne(200));
  return li(null, e, t, !1, n);
};
ls.unmountComponentAtNode = function(e) {
  if (!ri(e)) throw Error(Ne(40));
  return e._reactRootContainer ? (zr(function() {
    li(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Hs] = null;
    });
  }), !0) : !1;
};
ls.unstable_batchedUpdates = Iu;
ls.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!ri(n)) throw Error(Ne(200));
  if (e == null || e._reactInternals === void 0) throw Error(Ne(38));
  return li(e, t, n, !1, r);
};
ls.version = "18.3.1-next-f1338f8080-20240426";
function jp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jp);
    } catch (e) {
      console.error(e);
    }
}
jp(), Eh.exports = ls;
var Ls = Eh.exports, Zd = Ls;
xa.createRoot = Zd.createRoot, xa.hydrateRoot = Zd.hydrateRoot;
var Cp = { exports: {} }, oi = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yg = u, vg = Symbol.for("react.element"), Ng = Symbol.for("react.fragment"), kg = Object.prototype.hasOwnProperty, wg = yg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Eg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sp(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) kg.call(t, r) && !Eg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: vg, type: e, key: o, ref: a, props: l, _owner: wg.current };
}
oi.Fragment = Ng;
oi.jsx = Sp;
oi.jsxs = Sp;
Cp.exports = oi;
var s = Cp.exports;
let ar = [], Mp = 120, Oi = !1;
async function jg() {
  if (!Oi) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          Cg(n), Oi = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Oi = !0;
  }
}
function Cg(e) {
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
  } : { offsetMin: Mp, label: "LOCAL" };
}
function bp(e, t) {
  return ar.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Wa(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, a, i] = t.split(":").map(Number);
  for (const c of ar)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const d = (c.offsetBeforeMin - c.offsetAfterMin) / 60, v = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (v.getUTCFullYear() === n && v.getUTCMonth() + 1 === r && v.getUTCDate() === l) {
        const f = v.getUTCHours();
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
function Sg(e) {
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
function Mg(e) {
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
function Lr(e, t = "LOCAL") {
  return t === "UTC" ? Mg(e) : Sg(e);
}
function qd(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Lr(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function Oc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, a] = e.split("-").map(Number), [i, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(a) || isNaN(i) || isNaN(c)) return null;
  const v = Date.UTC(l, o - 1, a, i, c, d);
  if (n === "UTC")
    return v;
  const f = Wa(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const p = v - Mp * 6e4, { offsetMin: y } = Ws(p);
  let S = v - y * 6e4;
  const M = Ws(S);
  return M.offsetMin !== y && (S = v - M.offsetMin * 6e4), S;
}
function bg({
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
  isInitialSetup: f = !1,
  selectedCount: p = 0,
  totalCount: y = 0,
  onResetStudio: S
}) {
  const [M, _] = u.useState(!1);
  u.useEffect(() => {
    if (!M) return;
    const w = (b) => {
      b.key === "Escape" && _(!1);
    };
    return window.addEventListener("keydown", w), () => window.removeEventListener("keydown", w);
  }, [M]);
  const k = u.useMemo(() => {
    const w = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), b = (e == null ? void 0 : e.durationMs) || 0;
    if (!w || b <= 0) return "-- ➔ --";
    const h = w + b, A = (H) => String(H).padStart(2, "0"), E = Lr(w, n), N = Lr(h, n), P = `${E.year}-${A(E.month)}-${A(E.day)}`, W = `${A(E.hour)}:${A(E.minute)}:${A(E.second)}`, L = `${N.year}-${A(N.month)}-${A(N.day)}`, B = `${A(N.hour)}:${A(N.minute)}:${A(N.second)}`, re = n === "UTC" ? " (UTC)" : E.label ? ` (${E.label})` : "", ne = P === L ? B : `${L} ${B}`;
    return `${P} ${W} ➔ ${ne}${re}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), g = u.useMemo(() => {
    const w = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (w >= 1440) {
      const b = (w / 1440).toFixed(1);
      return `(${b.endsWith(".0") ? parseInt(b, 10) : b}d / ${w}m Total)`;
    }
    return `(${w}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), m = () => {
    _(!1), S == null || S();
  }, T = M ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => _(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (w) => w.stopPropagation(), dir: "ltr", children: [
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
          onClick: () => _(!1),
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
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: () => _(!1), children: "CANCEL" }),
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: m, children: [
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
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: p }),
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
          onClick: () => _(!0),
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
          onClick: v,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && T && Ls.createPortal(T, document.body)
  ] });
}
const Xr = (e) => String(e).padStart(2, "0");
function jt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const p = new Date(e), y = Xr(p.getUTCHours()), S = Xr(p.getUTCMinutes()), M = Xr(p.getUTCSeconds()), _ = l ? `${y}:${S}:${M}` : `${y}:${S}`;
    return r ? `${_} UTC` : _;
  }
  const { offsetMin: o, label: a } = Ws(e), i = new Date(e + o * 60 * 1e3), c = Xr(i.getUTCHours()), d = Xr(i.getUTCMinutes()), v = Xr(i.getUTCSeconds()), f = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${f} ${a}` : f;
}
const Ig = 600, eh = 250, cs = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Map(), Dc = /* @__PURE__ */ new Set(), th = 4;
let vl = 0, ws = [];
function Pc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / eh) * eh;
}
function Ip() {
  var e;
  if (!(vl >= th || ws.length === 0))
    for (ws = ws.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); vl < th && ws.length > 0; ) {
      const t = ws.pop();
      !t || (e = t.signal) != null && e.aborted || (vl++, Tg(t));
    }
}
function ma(e, t, n, r = "mon-0") {
  const l = Pc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (cs.size >= Ig) {
    const i = cs.keys().next().value, c = cs.get(i);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), cs.delete(i);
  }
  cs.set(a, n), Dc.forEach((i) => i(e, l, n, o));
}
async function Tg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const i = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${i}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), v = URL.createObjectURL(d);
      ma(n, r, v, l), a(v);
    } else c.status === 204 ? (ma(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (i) {
    i.name !== "AbortError" ? (ma(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } finally {
    vl = Math.max(0, vl - 1), Tr.delete(t), Ip();
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
    const r = Pc(t), o = `${e}_${n || "mon-0"}_${r}`;
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
  set: ma,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    cs.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), cs.clear(), Tr.clear(), ws = [], vl = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return Dc.add(e), () => Dc.delete(e);
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
    const l = Pc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
    if (cs.has(a))
      return Promise.resolve(this.get(e, l, o));
    if (Tr.has(a))
      return Tr.get(a);
    const i = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      ws = ws.filter((v) => v.hostname === e && v.displayId === o && v.key !== a ? (Tr.delete(v.key), v.resolve(null), !1) : !0);
      const d = { key: a, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        ws = ws.filter((v) => v.key !== a), Tr.delete(a), c(null);
      }, { once: !0 }), ws.push(d), Ip();
    });
    return Tr.set(a, i), i;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Dn.clearAll();
});
const Pu = "ITB_STUDIO_SESSION_CACHE_V2", Tp = "itb_player_audio_settings";
let Di = null;
function Ag() {
  try {
    const e = localStorage.getItem(Pu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function Ap(e) {
  e && (Di && clearTimeout(Di), Di = setTimeout(() => {
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
      localStorage.setItem(Pu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function $g() {
  try {
    localStorage.removeItem(Pu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function Nl() {
  try {
    const e = localStorage.getItem(Tp);
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
function Rg(e) {
  try {
    localStorage.setItem(Tp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let sr = null, hl = null, Pi = null, Hn = 0, Qr = 0, qo = -60, jo = 1;
function Lg() {
  if (!sr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (sr = new e());
  }
  return sr && sr.state === "suspended" && sr.resume().catch(() => {
  }), sr;
}
function za(e, t = 1) {
  if (!e) return null;
  jo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Lg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(jo, n.currentTime), hl = e, Og(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function nh(e) {
  if (jo = Math.max(0, Number(e) || 1), hl != null && hl.__audioGainNode && sr)
    try {
      hl.__audioGainNode.gain.setValueAtTime(jo, sr.currentTime);
    } catch {
    }
}
function Og() {
  if (Pi) return;
  const e = new Uint8Array(256), t = () => {
    const n = hl, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Hn *= 0.85, Qr *= 0.85, Hn < 1e-3 && (Hn = 0), Qr < 1e-3 && (Qr = 0), qo = Hn > 1e-3 ? 20 * Math.log10(Hn) : -60;
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
        Hn = a > Hn ? Hn * 0.3 + a * 0.7 : Hn * 0.85 + a * 0.15, Qr = Math.max(Hn, o), qo = Hn > 1e-4 ? 20 * Math.log10(Hn) : -60;
      } catch {
        Hn = 0, Qr = 0, qo = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Hn,
        peak: Qr,
        db: qo,
        gain: jo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), Pi = requestAnimationFrame(t);
  };
  Pi = requestAnimationFrame(t);
}
function $p({ isPlaying: e = !1 }) {
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
function Dg({
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
          const d = (i.displayId ?? i.DisplayId ?? `mon-${c}`).toLowerCase(), v = !a && o === d, f = i.width ?? i.Width ?? 1920, p = i.height ?? i.Height ?? 1080, y = i.displayName ?? i.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${v ? "is-active" : ""}`,
              onClick: (S) => {
                S.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${y} (${f}×${p})`,
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
function Rp({
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
    let y = 1 / 0, S = 1 / 0, M = -1 / 0, _ = -1 / 0;
    e.forEach((m) => {
      const T = m.x ?? m.X ?? 0, w = m.y ?? m.Y ?? 0, b = m.width ?? m.Width ?? 1920, h = m.height ?? m.Height ?? 1080;
      y = Math.min(y, T), S = Math.min(S, w), M = Math.max(M, T + b), _ = Math.max(_, w + h);
    });
    const k = Math.max(1, M - y), g = Math.max(1, _ - S);
    return { minX: y, minY: S, totalW: k, totalH: g };
  }, [e]);
  if (!e || e.length <= 1 || !a)
    return null;
  const i = e.find((y) => (y.displayId ?? y.DisplayId) === t) || e[0], c = e.indexOf(i), d = c >= 0 ? c + 1 : 1, f = (i ? i.displayName ?? i.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), p = f && !f.toLowerCase().includes("screen") ? `SCREEN ${d} (${f.toUpperCase()})` : f ? f.toUpperCase() : `SCREEN ${d}`;
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
            children: e.map((y, S) => {
              const M = y.displayId ?? y.DisplayId ?? `mon-${S}`, _ = (y.x ?? y.X ?? 0) - a.minX, k = (y.y ?? y.Y ?? 0) - a.minY, g = y.width ?? y.Width ?? 1920, m = y.height ?? y.Height ?? 1080, T = M === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${T ? "is-active" : ""}`,
                  onClick: (w) => {
                    w.stopPropagation(), n == null || n(M);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: _ + 10,
                        y: k + 10,
                        width: Math.max(10, g - 20),
                        height: Math.max(10, m - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: _ + g / 2,
                        y: k + m / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: S + 1
                      }
                    )
                  ]
                },
                M
              );
            })
          }
        ) })
      ]
    }
  );
}
function Pg({
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
  globalGaps: f = [],
  recordingSegments: p = {},
  playbackSpeed: y = 1,
  activeAudioStationId: S = null,
  directorPlan: M = null,
  isAutoDirectorEnabled: _ = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: g = null,
  areAllDisplaysPlaced: m = !1,
  hideDisplayStrip: T = !1
}) {
  var Ve;
  const w = e.hostname || e.name || e.id || "", b = Math.round(t), [h, A] = u.useState(() => !w || !b ? null : Dn.get(w, b) || null), [E, N] = u.useState(""), [P, W] = u.useState(!1), [L, B] = u.useState(!1), [re, ne] = u.useState(!1), H = u.useRef(l), I = u.useRef(null), U = u.useRef(0), O = u.useRef(t - a), K = u.useRef(t - a), R = u.useRef(!1), oe = u.useRef(null), te = u.useRef(!1);
  O.current = t - a;
  const Z = (e == null ? void 0 : e.displays) || ((Ve = e == null ? void 0 : e.topology) == null ? void 0 : Ve.displays) || [], [Y, Le] = u.useState(null);
  u.useEffect(() => {
    Le(null);
  }, [k]);
  const Be = u.useMemo(() => {
    const me = M || (e == null ? void 0 : e.directorPlan);
    return !me || !me.segments || me.segments.length === 0 ? null : me.segments.find((fe) => {
      const le = fe.startEpochMs ?? fe.StartEpochMs ?? 0, Se = fe.endEpochMs ?? fe.EndEpochMs ?? 0;
      return t >= le && t <= Se;
    }) || me.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t]), je = u.useMemo(() => {
    var me;
    return Y ? Y.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : Z.length > 1 && _ !== !1 && Be ? (Be.targetDisplayId || Be.TargetDisplayId || "mon-0").toLowerCase() : (((me = Z[0]) == null ? void 0 : me.displayId) || "mon-0").toLowerCase();
  }, [Y, k, Z, _, Be]), et = u.useRef(je), [be, Ie] = u.useState(!1);
  u.useEffect(() => {
    if (et.current && et.current !== je) {
      Ie(!0);
      const me = setTimeout(() => Ie(!1), 2e3);
      return et.current = je, () => clearTimeout(me);
    }
    et.current = je;
  }, [je]);
  const tt = p[e == null ? void 0 : e.id] || p[w] || (e == null ? void 0 : e.segments) || [], at = tt.length === 0 || tt.some((me) => {
    const fe = me.startEpochMs ?? me.startEpoch ?? 0, le = me.endEpochMs ?? me.endEpoch ?? 0;
    return t >= fe && t <= le;
  }), ie = !!(r ? !Nl().isMuted : S && (e.id === S || w === S)), ke = u.useCallback(() => {
    if (!I.current) return;
    const me = Nl();
    if (r)
      I.current.volume = me.volume, I.current.muted = me.isMuted, me.isMuted || za(I.current);
    else {
      const fe = !!(S && (e.id === S || w === S));
      I.current.muted = !fe, fe && (I.current.volume = me.volume, za(I.current));
    }
  }, [r, S, e.id, w]);
  u.useEffect(() => {
    ke();
  }, [ke]), u.useEffect(() => {
    const me = (fe) => {
      I.current && fe.detail && ke();
    };
    return window.addEventListener("itb-audio-state-changed", me), () => window.removeEventListener("itb-audio-state-changed", me);
  }, [ke]), u.useEffect(() => {
    I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !b || !w) return;
    if (l) {
      H.current = !0;
      return;
    }
    const me = H.current;
    H.current = l;
    let fe = !0;
    const le = new AbortController(), Se = Dn.get(w, b, je);
    if (Se) {
      A(Se), B(!1), ne(!1);
      return;
    }
    ne(!0);
    const ee = setTimeout(() => {
      fe && Dn.fetchFrame(w, b, le.signal, je).then((q) => {
        fe && (ne(!1), q && q !== "NO_SIGNAL" ? (A(q), B(!1)) : q === "NO_SIGNAL" && B(!0));
      });
    }, me ? 25 : 40), V = Dn.subscribe((q, X, Q, ce) => {
      q === w && X === b && (!ce || ce === je) && fe && (ne(!1), Q && Q !== "NO_SIGNAL" ? (A(Q), B(!1)) : Q === "NO_SIGNAL" && B(!0));
    });
    return () => {
      fe = !1, clearTimeout(ee), le.abort(), V();
    };
  }, [w, b, n, l, r, P, je]), u.useEffect(() => {
    if (!w || !(r || l)) {
      l || (oe.current && clearTimeout(oe.current), R.current = !1, N(""), W(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load()));
      return;
    }
    let fe = null;
    return l && !v && at ? fe = setTimeout(() => {
      const le = O.current;
      U.current = le, K.current = le, R.current = !1;
      const Se = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + le}&displayId=${encodeURIComponent(je)}&_t=${Date.now()}`;
      W(!1), N(Se);
    }, 80) : l || (oe.current && clearTimeout(oe.current), R.current = !1, N(""), W(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load())), () => {
      fe && clearTimeout(fe);
    };
  }, [l, r, w, a, i, v, at, je]), u.useEffect(() => {
    if (!w || !(r || l)) return;
    const fe = O.current, le = Math.abs(fe - K.current);
    if (!l || le < 800) {
      K.current = fe;
      return;
    }
    return R.current = !0, K.current = fe, U.current = fe, I.current && I.current.pause(), W(!1), oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      if (!at || v) {
        N(""), W(!1), R.current = !1;
        return;
      }
      const Se = O.current, $ = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Se}&displayId=${encodeURIComponent(je)}&_t=${Date.now()}`;
      N($);
    }, 75), () => {
      oe.current && clearTimeout(oe.current);
    };
  }, [t, l, r, w, a, i, v, at, je]), u.useEffect(() => {
    if (r || !l || !I.current || !P || R.current) return;
    const me = (O.current - U.current) / 1e3;
    if (me >= 0) {
      const fe = I.current, le = fe.currentTime, Se = Math.abs(le - me);
      if (Se > 0.35 && Se < 3)
        try {
          fe.currentTime = me;
        } catch {
        }
    }
  }, [r, l, t, P]), u.useEffect(() => {
    if (!r || !l || !E || !P || v) return;
    let me = null, fe = I.current ? I.current.currentTime : 0, le = performance.now(), Se = U.current + Math.round(fe * 1e3);
    const $ = () => {
      const ee = I.current;
      if (ee && !ee.paused && !ee.ended && !te.current && !R.current) {
        const V = performance.now(), q = ee.currentTime;
        Math.abs(q - fe) > 5e-4 && (fe = q, le = V);
        const X = Math.max(0, (V - le) / 1e3), Q = ee.playbackRate || y || 1, ce = fe + X * Q;
        let Ze = U.current + Math.round(ce * 1e3);
        const Oe = Ze - Se;
        if (Oe < 0 && Oe > -300 && (Ze = Se), Ze >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Ye = a + Ze, ot = f == null ? void 0 : f.find((Ge) => Ye >= Ge.startEpochMs && Ye < Ge.endEpochMs);
        if (ot) {
          te.current = !0;
          const Ge = ot.endEpochMs - a;
          d(Ge), U.current = Ge, Se = Ge, K.current = Ge;
          const Tt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Ge}&_t=${Date.now()}`;
          W(!1), N(Tt), setTimeout(() => {
            te.current = !1;
          }, 300);
          return;
        }
        Ze !== Se && (Se = Ze, K.current = Ze, d == null || d(Ze));
      }
      me = requestAnimationFrame($);
    };
    return me = requestAnimationFrame($), () => {
      me && cancelAnimationFrame(me);
    };
  }, [
    r,
    l,
    E,
    P,
    v,
    y,
    c,
    a,
    i,
    w,
    f,
    d,
    o
  ]);
  const Ke = () => {
    if (te.current) return;
    const me = a + O.current, fe = tt.map((le) => ({ start: le.startEpochMs ?? le.startEpoch ?? 0, end: le.endEpochMs ?? le.endEpoch ?? 0 })).filter((le) => le.start > me + 200).sort((le, Se) => le.start - Se.start)[0];
    if (fe && fe.start - a < c) {
      te.current = !0;
      const le = fe.start - a;
      d(le), U.current = le;
      const Se = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + le}&_t=${Date.now()}`;
      W(!1), N(Se), setTimeout(() => {
        te.current = !1;
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
    (r || l) && E && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: I,
        src: E,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: P ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: P ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !ie,
        onLoadedData: () => {
          I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
        },
        onCanPlay: () => {
          ke(), I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y), l && I.current && I.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          R.current = !1, W(!0), ke(), I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
        },
        onWaiting: () => {
          W(!1);
        },
        onTimeUpdate: () => {
          var me;
          !P && ((me = I.current) == null ? void 0 : me.currentTime) > 0 && (R.current = !1, W(!0));
        },
        onEnded: Ke
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && P && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: h && !L ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: h,
            alt: w,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => B(!0)
          }
        ) : (!h || L || !at) && !E ? /* @__PURE__ */ s.jsx($p, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && at && !P && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    Z.length > 1 && /* @__PURE__ */ s.jsx(
      Rp,
      {
        displays: Z,
        activeDisplayId: je,
        onSelectDisplay: (me) => {
          Le(me), g == null || g(me);
        },
        isTransitioning: be,
        mode: _ ? "AUTO" : "MANUAL"
      }
    ),
    !T && /* @__PURE__ */ s.jsx(
      Dg,
      {
        displays: Z,
        activeDisplayId: je,
        onSelectDisplay: (me) => {
          Le(me), g == null || g(me);
        },
        areAllDisplaysPlaced: m,
        isAutoDirectorEnabled: _
      }
    )
  ] });
}
function _g({
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
  setPlayheadMs: f,
  isSpotlightActive: p,
  globalGaps: y = [],
  onOpenSpotlight: S,
  onSelectActiveStation: M,
  recordingSegments: _ = {},
  playbackSpeed: k = 1,
  activeAudioStationId: g = null,
  onSoloAudio: m,
  directorPlan: T = null,
  isAutoDirectorEnabled: w = !0,
  targetDisplayId: b = "auto",
  onSelectDisplayId: h = null,
  areAllDisplaysPlaced: A = !1,
  _slotIndex: E = 0,
  borderColor: N = null,
  onSwapWithNext: P = null
}) {
  var I;
  const W = !!(g && (e.id === g || e.hostname && e.hostname === g)), L = (e.hostname || e.name || "").includes("Offline"), B = L ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((I = e == null ? void 0 : e.topology) == null ? void 0 : I.displays) || []).length > 1;
  const ne = () => {
    if (t) {
      const U = b && b !== "auto" && b !== "director" ? b : null;
      S && S(e.id, U);
    } else
      M && M(e.id);
  }, H = (U) => {
    U.preventDefault(), U.stopPropagation(), t && M && (i && i(!1), M(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: ne,
      onContextMenu: H,
      className: `camera-card ${B} ${t ? "is-solo-card" : ""}`,
      style: N ? { borderColor: N } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${B}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            P && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (U) => {
                  U.stopPropagation(), P();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            m && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${W ? "audio-active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), m(W ? null : e.id);
                },
                title: W ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: W ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
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
                  const O = b && b !== "auto" && b !== "director" ? b : null;
                  S(e.id, O);
                },
                title: "Cinema Fullscreen Inspection",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) })
              }
            ),
            M && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), t && i && i(!1), M(t ? null : e.id);
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
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${L ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Pg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: L,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: i,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: v,
              setPlayheadMs: f,
              isSpotlightActive: p,
              globalGaps: y,
              recordingSegments: _,
              playbackSpeed: k,
              activeAudioStationId: g,
              directorPlan: T,
              isAutoDirectorEnabled: w,
              targetDisplayId: b,
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
        !L && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          jt(l, o)
        ] }) })
      ]
    }
  ) });
}
const _i = ["top-right", "bottom-right", "bottom-left", "top-left"];
function Fg({
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
  }), o = t || r, a = u.useCallback((_) => {
    _ && (_.preventDefault(), _.stopPropagation());
    const g = (_i.indexOf(o) + 1) % _i.length, m = _i[g];
    l(m);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", m);
    } catch {
    }
    n && n(m);
  }, [o, n]), i = new Date(e || Date.now()), c = i.getUTCFullYear(), d = String(i.getUTCMonth() + 1).padStart(2, "0"), v = String(i.getUTCDate()).padStart(2, "0"), f = String(i.getUTCHours()).padStart(2, "0"), p = String(i.getUTCMinutes()).padStart(2, "0"), y = String(i.getUTCSeconds()).padStart(2, "0"), S = `${c}-${d}-${v}`, M = `${f}:${p}:${y} UTC`;
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
          /* @__PURE__ */ s.jsx("span", { className: "clock-time-val", children: M })
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
function Bg() {
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
function en(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Ug(e) {
  const t = en(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Wg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function zg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var M, _, k, g, m, T;
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
    return ((M = l.layout) == null ? void 0 : M.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), i = o.transitionType || "smooth", c = o.timestampEpochMs - a;
  if (t < c)
    return ((_ = l.layout) == null ? void 0 : _.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((k = o.layout) == null ? void 0 : k.placements) || n;
  if (i === "cut")
    return ((g = l.layout) == null ? void 0 : g.placements) || n;
  const d = (t - c) / a, v = en(d, 0, 1), f = i === "linear" ? v : Ug(v), p = ((m = l.layout) == null ? void 0 : m.placements) || [], y = ((T = o.layout) == null ? void 0 : T.placements) || [], S = y.map((w) => {
    const b = p.find((W) => W.stationId === w.stationId && W.displayId === w.displayId);
    if (!b)
      return {
        ...w,
        opacity: Math.max(0.05, f)
      };
    const h = Math.round(b.x + (w.x - b.x) * f), A = Math.round(b.y + (w.y - b.y) * f), E = Math.round(b.width + (w.width - b.width) * f), N = Math.round(b.height + (w.height - b.height) * f), P = Number(((b.rotation || 0) + ((w.rotation || 0) - (b.rotation || 0)) * f).toFixed(1));
    return {
      ...w,
      x: h,
      y: A,
      width: E,
      height: N,
      rotation: P,
      opacity: 1
    };
  });
  return p.forEach((w) => {
    y.some((h) => h.stationId === w.stationId && h.displayId === w.displayId) || S.push({
      ...w,
      opacity: Math.max(0, 1 - f)
    });
  }), S;
}
function Hg({
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
  }, f = [...c, v].sort((S, M) => S.timestampEpochMs - M.timestampEpochMs), p = f.findIndex((S) => S.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: f },
    newIndex: p >= 0 ? p : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function _c(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function Kg(e, t) {
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
function sh(e, t, n, r = 500) {
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
function Vg(e, t = [], n = [], r = null, l = null, o = "mon-0") {
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
    const v = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, f = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    f > v && i.push({ startEpoch: v, endEpoch: f });
  }), Array.isArray(t) && t.filter((d) => d.type === "global").forEach((d) => {
    const v = d.startEpochMs ?? d.startEpoch ?? 0, f = d.endEpochMs ?? d.endEpoch ?? 0;
    f > v && !i.some((p) => p.startEpoch === v && p.endEpoch === f) && i.push({ startEpoch: v, endEpoch: f });
  }), i.forEach((d) => {
    const v = d.startEpoch, f = d.endEpoch, p = [];
    a.forEach((y) => {
      y.endEpochMs <= v || y.startEpochMs >= f ? p.push(y) : (y.startEpochMs < v && p.push({
        ...y,
        endEpochMs: v
      }), y.endEpochMs > f && p.push({
        ...y,
        startEpochMs: f
      }));
    }), a = p;
  }), (t || []).filter((d) => d.type !== "global").forEach((d) => {
    const v = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, f = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    if (!(!v || !f || f <= v))
      for (let p = a.length - 1; p > 0; p--) {
        const y = a[p].startEpochMs;
        y >= v && y <= f && a[p].startEpochMs === a[p - 1].endEpochMs && (a[p - 1].endEpochMs = a[p].endEpochMs, a.splice(p, 1));
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
], Fc = 1920, Bc = 1080, Et = [
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
], Yg = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function Gg(e, t, n) {
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
function Jr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function rr(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, a = n / r;
  let i, c, d, v;
  return o >= a ? (i = n, c = Math.round(i / o), d = e, v = t + Math.round((r - c) / 2)) : (c = r, i = Math.round(c * o), d = e + Math.round((n - i) / 2), v = t), { x: d, y: v, width: i, height: c };
}
function qs(e, t = Fc, n = Bc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: f, width: p, height: y } = rr(0, 0, t, n, d);
    return [{
      ...c,
      x: v,
      y: f,
      width: p,
      height: y,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: Et[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, v) => {
      const f = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: p, y, width: S, height: M } = rr(v * c, 0, c, n, f);
      return {
        ...d,
        x: p,
        y,
        width: S,
        height: M,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: f,
        aspectRatio: f,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: Et[v % Et.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const p = Math.round(t / 3);
      return e.slice(0, 3).map((y, S) => {
        const M = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: _, y: k, width: g, height: m } = rr(S * p, 0, p, n, M);
        return {
          ...y,
          x: _,
          y: k,
          width: g,
          height: m,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: M,
          aspectRatio: M,
          zIndex: S,
          rotation: 0,
          borderWidth: 2,
          borderColor: Et[S % Et.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), v = Math.round(n / 2), f = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: v }
    ];
    return e.slice(0, 3).map((p, y) => {
      const S = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: M, cy: _ } = f[y], { x: k, y: g, width: m, height: T } = rr(M, _, d, v, S);
      return {
        ...p,
        x: k,
        y: g,
        width: m,
        height: T,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: S,
        aspectRatio: S,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: Et[y % Et.length],
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
    return e.slice(0, 4).map((f, p) => {
      const y = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: S, cy: M } = v[p], { x: _, y: k, width: g, height: m } = rr(S, M, c, d, y);
      return {
        ...f,
        x: _,
        y: k,
        width: g,
        height: m,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: y,
        aspectRatio: y,
        zIndex: p,
        rotation: 0,
        borderWidth: 2,
        borderColor: Et[p % Et.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), a = Math.floor(t / l), i = Math.floor(n / o);
  return e.map((c, d) => {
    const v = d % l, f = Math.floor(d / l), p = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: S, width: M, height: _ } = rr(v * a, f * i, a, i, p);
    return {
      ...c,
      x: y,
      y: S,
      width: M,
      height: _,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: p,
      aspectRatio: p,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: Et[d % Et.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function Xg({
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
  playheadEpochMs: f = 0,
  timeMode: p = "LOCAL",
  isPlaying: y = !1,
  setIsPlaying: S,
  totalDurationMs: M,
  inPointMs: _ = 0,
  outPointMs: k,
  setPlayheadMs: g,
  globalGaps: m = [],
  recordingSegments: T = {},
  playbackSpeed: w = 1,
  onChangePlaybackSpeed: b,
  keystrokeMode: h = "BurnIn",
  keystrokes: A = [],
  directorPlan: E = null,
  onOverrideDisplay: N,
  onResetOverride: P,
  compositionLayout: W = "canvas",
  onChangeCompositionLayout: L,
  isAutoDirectorEnabled: B = !0,
  onToggleAutoDirector: re,
  onUpdateCanvasLayout: ne,
  canvasLayoutTimeline: H = null,
  onUpdateCanvasLayoutTimeline: I,
  activeKfIndex: U = 0,
  setActiveKfIndex: O,
  isModalOpen: K = !1,
  isGridFullscreen: R = void 0,
  onToggleGridFullscreen: oe = null
}) {
  const te = f > 0 ? f : d + v, [Z, Y] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [Le, Be] = u.useState(() => {
    var x;
    return ((x = t[0]) == null ? void 0 : x.id) || null;
  }), [je, et] = u.useState(!1), [be, Ie] = u.useState(null), [tt, at] = u.useState({ index: null, position: null }), [ie, ke] = u.useState(!1), [Ke, Ve] = u.useState(!1), [me, fe] = u.useState(!1), [le, Se] = u.useState(!1), [$, ee] = u.useState(""), [V, q] = u.useState(""), X = u.useRef(null), [Q, ce] = u.useState(() => {
    try {
      const x = localStorage.getItem("itb_canvas_saved_presets");
      return x ? JSON.parse(x) : [];
    } catch {
      return [];
    }
  }), Ze = (x) => {
    ce(x);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(x));
    } catch {
    }
  }, [Oe, Ye] = u.useState(!1), ot = R !== void 0 ? R : Oe, [Ge, Tt] = u.useState(!1);
  u.useRef(null);
  const Rt = u.useRef(null), Lt = u.useRef(null), Ot = u.useRef(null), [lt, yt] = u.useState({ width: 960, height: 540 }), [Qe, Fe] = u.useState(0), [Nt, Dt] = u.useState(!1);
  u.useEffect(() => {
    const x = (j) => {
      j.key === "Escape" && Dt(!1);
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, []);
  const [an, cn] = u.useState(!1), [wn, De] = u.useState(!1), [Re, st] = u.useState(!1), [ae, nt] = u.useState(!1), [z, he] = u.useState(!1), [pe, Ue] = u.useState({ vertical: null, horizontal: null }), [Je, ut] = u.useState(!0), [dt, qe] = u.useState(!0), [ht, St] = u.useState(null), [Mt, Pt] = u.useState({ x: 0, y: 0, isInside: !1 }), rn = u.useRef(null), _t = u.useRef(null), zt = u.useRef(!1), [dn, Xt] = u.useState("auto-grid"), At = u.useRef([]), $n = u.useRef([]), gs = u.useRef(null), [, Ss] = u.useState(0), Vr = u.useRef(null), [Un, Gs] = u.useState(null), Ft = u.useCallback((x, j = "success", D = "💾") => {
    Vr.current && clearTimeout(Vr.current), Gs({ text: x, type: j, icon: D }), Vr.current = setTimeout(() => {
      Gs(null), Vr.current = null;
    }, 2200);
  }, []), [Kt, as] = u.useState(() => {
    var D, J, G, F, ue, Ae;
    const x = (G = (J = (D = H == null ? void 0 : H.keyframes) == null ? void 0 : D[0]) == null ? void 0 : J.layout) == null ? void 0 : G.width, j = (Ae = (ue = (F = H == null ? void 0 : H.keyframes) == null ? void 0 : F[0]) == null ? void 0 : ue.layout) == null ? void 0 : Ae.height;
    if (x && j) {
      const ge = is.find((Ee) => Ee.w === x && Ee.h === j);
      if (ge) return ge.id;
    }
    return "16:9";
  }), [Wn, Er] = u.useState(() => {
    try {
      const x = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (x !== null) return x === "true";
    } catch {
    }
    return !1;
  }), Mn = u.useCallback(() => {
    Er((x) => {
      const j = !x;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(j));
      } catch {
      }
      return j;
    });
  }, []), Ms = u.useMemo(() => is.find((x) => x.id === Kt) || is[0], [Kt]), Pe = Ms.w, Me = Ms.h, Os = Ms.ratio, Ao = u.useMemo(() => {
    const x = [], j = Pe >= 3e3 ? 200 : 100, D = j / 2, J = j / 10;
    for (let G = 0; G <= Pe; G += J) {
      const F = G % j === 0, ue = !F && G % D === 0;
      x.push({ val: G, isMajor: F, isMed: ue });
    }
    return x;
  }, [Pe]), jr = u.useMemo(() => {
    const x = [];
    for (let G = 0; G <= Me; G += 10) {
      const F = G % 100 === 0, ue = !F && G % 50 === 0;
      x.push({ val: G, isMajor: F, isMed: ue });
    }
    return x;
  }, [Me]), $o = u.useCallback((x) => {
    const j = rn.current || Lt.current;
    if (!j) return;
    const D = j.getBoundingClientRect(), J = en(Math.round((x.clientX - D.left) / D.width * Pe), 0, Pe), G = en(Math.round((x.clientY - D.top) / D.height * Me), 0, Me);
    Pt({ x: J, y: G, isInside: !0 });
  }, [Pe, Me]), Ro = u.useCallback(() => {
    Pt((x) => ({ ...x, isInside: !1 }));
  }, []), Jn = u.useCallback(() => {
    const x = Ot.current;
    if (!x) return;
    const j = x.getBoundingClientRect(), J = Math.max(320, Math.floor(j.width || 960) - 104 - 16), G = Math.max(180, Math.floor(j.height || 540) - 16);
    let F, ue;
    Wn ? (F = J, ue = Math.round(F / Os)) : J / G >= Os ? (ue = G, F = Math.round(ue * Os)) : (F = J, ue = Math.round(F / Os)), yt((Ae) => Ae.width === F && Ae.height === ue ? Ae : { width: F, height: ue });
  }, [Wn, Os]);
  u.useEffect(() => {
    const x = Ot.current;
    if (!x) return;
    Jn();
    let j = null;
    return typeof ResizeObserver < "u" && (j = new ResizeObserver(() => {
      Jn();
    }), j.observe(x)), window.addEventListener("resize", Jn), () => {
      j && j.disconnect(), window.removeEventListener("resize", Jn);
    };
  }, [Jn]);
  const hn = u.useMemo(() => (t && t.length > 0 ? t : n).map((j) => {
    const D = j.displays && j.displays.length > 0 ? j.displays : j.topology && j.topology.displays && j.topology.displays.length > 0 ? j.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: j.width || 1920, height: j.height || 1080 }], J = D.find((ge) => ge.isPrimary) || D[0], G = J.width || J.Width || j.width || 1920, F = J.height || J.Height || j.height || 1080, ue = G && F ? G / F : 16 / 9, Ae = D.length > 1;
    return {
      stationId: j.id,
      displayId: "auto",
      label: `${j.displayName || j.roleAlias || j.hostname || j.name} - ${Ae ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: j.displayName || j.roleAlias || j.hostname || j.name,
      stationHostname: j.hostname || j.id,
      isPrimary: !0,
      sourceWidth: G,
      sourceHeight: F,
      nativeAspectRatio: ue,
      aspectRatio: ue,
      width: G,
      height: F
    };
  }), [t, n]), Zt = u.useMemo(() => {
    const x = t && t.length > 0 ? t : n, j = [];
    return x.forEach((D) => {
      const J = D.displays && D.displays.length > 0 ? D.displays : D.topology && D.topology.displays && D.topology.displays.length > 0 ? D.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: D.width || 1920, height: D.height || 1080 }], G = J.find((ge) => ge.isPrimary) || J[0], F = G.width || G.Width || D.width || 1920, ue = G.height || G.Height || D.height || 1080, Ae = F / ue;
      j.push({
        stationId: D.id,
        displayId: "auto",
        label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${J.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: D.displayName || D.roleAlias || D.hostname || D.name,
        stationHostname: D.hostname || D.id,
        isPrimary: !0,
        sourceWidth: F,
        sourceHeight: ue,
        nativeAspectRatio: Ae,
        aspectRatio: Ae,
        width: F,
        height: ue
      }), J.length > 1 && J.forEach((ge, Ee) => {
        const xt = (ge.displayId || `mon-${Ee}`).toLowerCase(), ft = ge.displayNumber || Ee + 1, pt = ge.displayName || `Screen ${ft}`, ye = ge.width || ge.Width || D.width || 1920, mt = ge.height || ge.Height || D.height || 1080, Bt = ye / mt;
        j.push({
          stationId: D.id,
          displayId: xt,
          label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${pt}`,
          stationName: D.displayName || D.roleAlias || D.hostname || D.name,
          stationHostname: D.hostname || D.id,
          isPrimary: !!ge.isPrimary,
          sourceWidth: ye,
          sourceHeight: mt,
          nativeAspectRatio: Bt,
          aspectRatio: Bt,
          width: ye,
          height: mt
        });
      });
    }), j;
  }, [t, n]), [vn, pn] = u.useState(() => {
    var x;
    if (((x = H == null ? void 0 : H.keyframes) == null ? void 0 : x.length) > 0) {
      const j = JSON.parse(JSON.stringify(H));
      if (t && t.length > 0) {
        const D = new Set(t.map((G) => G.id));
        if (j.keyframes.forEach((G) => {
          var F, ue;
          ((ue = (F = G.layout) == null ? void 0 : F.placements) == null ? void 0 : ue.length) > 0 && (G.layout.placements = G.layout.placements.filter((Ae) => D.has(Ae.stationId)));
        }), j.keyframes.some((G) => {
          var F, ue;
          return ((ue = (F = G.layout) == null ? void 0 : F.placements) == null ? void 0 : ue.length) > 0;
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
            width: Fc,
            height: Bc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: qs(hn, Fc, Bc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var x;
    if (((x = H == null ? void 0 : H.keyframes) == null ? void 0 : x.length) > 0) {
      const j = JSON.parse(JSON.stringify(H));
      if (t && t.length > 0) {
        const J = new Set(t.map((G) => G.id));
        j.keyframes.forEach((G) => {
          var F, ue;
          ((ue = (F = G.layout) == null ? void 0 : F.placements) == null ? void 0 : ue.length) > 0 && (G.layout.placements = G.layout.placements.filter((Ae) => J.has(Ae.stationId)));
        });
      }
      pn(j), j.keyframes.some((J) => {
        var G, F;
        return ((F = (G = J.layout) == null ? void 0 : G.placements) == null ? void 0 : F.length) > 0;
      }) && (zt.current = !0, Xt("custom"));
    }
  }, [H, t]);
  const En = vn.keyframes || [], Lo = u.useMemo(() => Wg(En, te), [En, te]), mn = en(
    U ?? Lo,
    0,
    Math.max(0, En.length - 1)
  ), zn = En[mn] || En[Lo] || En[0], xe = u.useMemo(() => {
    var x;
    return ((x = zn == null ? void 0 : zn.layout) == null ? void 0 : x.placements) || [];
  }, [zn]), Zn = u.useCallback((x = "Action") => ({
    label: x,
    timeline: JSON.parse(JSON.stringify(vn)),
    aspectId: Kt,
    presetId: dn,
    selectedFeedIndex: Qe
  }), [vn, Kt, dn, Qe]), Rn = u.useCallback((x = "Action") => {
    const j = Zn(x);
    At.current.push(j), At.current.length > 50 && At.current.shift(), $n.current = [], Ss((D) => D + 1);
  }, [Zn]), $l = u.useCallback(() => {
    gs.current && (At.current.push(gs.current), At.current.length > 50 && At.current.shift(), $n.current = [], gs.current = null, Ss((x) => x + 1));
  }, []), Rl = u.useCallback(() => {
    const x = f > 0 ? f : d + v, j = 500;
    if (x <= d + j) return mn;
    const D = (zn == null ? void 0 : zn.layout) || {
      width: Pe,
      height: Me,
      backgroundColor: "#070A10",
      fps: 30,
      placements: xe
    }, { nextTimeline: J, newIndex: G, isNew: F } = sh(vn, x, D, j);
    return F && (pn(J), I && I(J), O && O(G), Ft(
      `Keyframe #${G + 1} created at ${jt(x, p, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), G;
  }, [f, d, v, mn, zn, Pe, Me, xe, vn, I, O, p, Ft]), C = u.useCallback((x, j = null) => {
    j && Rn(j);
    const D = f > 0 ? f : d + v;
    pn((J) => {
      const { nextTimeline: G, newIndex: F, isNewKeyframe: ue } = Hg({
        prevTimeline: J,
        newPlacements: x,
        currentEpochMs: D,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Pe,
        virtualH: Me,
        fps: 30
      });
      return I && I(G), O && O(F), ue && F > 0 && Ft(
        `Keyframe #${F + 1} created at ${jt(D, p, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), G;
    });
  }, [f, d, v, Pe, Me, I, O, p, Ft, Rn]);
  u.useEffect(() => {
    if (hn.length > 0 && (!xe || xe.length === 0) && !zt.current) {
      let x = Kt;
      hn.length === 2 && Kt === "16:9" && (x = "32:9", as("32:9"));
      const j = is.find((J) => J.id === x) || is[0], D = qs(hn, j.w, j.h);
      D.length > 0 && (C(D), Xt("auto-grid"));
    }
  }, [hn, xe, C, Kt]);
  const se = u.useRef("");
  u.useEffect(() => {
    const x = (t || []).map((j) => j.id).sort().join(",");
    if (se.current === "") {
      se.current = x;
      return;
    }
    if (se.current !== x && (se.current = x, t && t.length > 0)) {
      const j = new Set(t.map((D) => D.id));
      if (dn === "auto-grid" || !zt.current) {
        let D = Kt;
        hn.length === 2 && Kt === "16:9" && (D = "32:9", as("32:9"));
        const J = is.find((F) => F.id === D) || is[0], G = qs(hn, J.w, J.h);
        G.length > 0 && C(G);
      } else if (xe && xe.length > 0) {
        const D = xe.filter((J) => j.has(J.stationId));
        if (D.length !== xe.length)
          if (D.length === 0) {
            const J = qs(hn, Pe, Me);
            C(J);
          } else
            C(D);
      }
    }
  }, [t, hn, dn, Kt, xe, C, Pe, Me]), u.useEffect(() => {
    ne && ne({
      width: Pe,
      height: Me,
      backgroundColor: "#070A10",
      fps: 30,
      placements: xe,
      timeline: vn
    });
  }, [xe, vn, ne, Pe, Me]);
  const de = u.useCallback((x) => {
    const j = Ms, D = is.find((J) => J.id === x) || is[0];
    if (j.id !== D.id)
      if (as(D.id), zt.current) {
        const J = D.w / j.w, G = D.h / j.h, F = xe.map((ue) => ({
          ...ue,
          x: Math.round(ue.x * J),
          y: Math.round(ue.y * G),
          width: Math.round(ue.width * J),
          height: Math.round(ue.height * G)
        }));
        C(F);
      } else {
        const J = hn.length > 0 ? hn : xe && xe.length > 0 ? xe : Zt, G = qs(J, D.w, D.h);
        C(G);
      }
  }, [Ms, xe, Zt, C]), ve = u.useCallback((x) => {
    const j = xe.length > 0 ? Math.max(...xe.map((ge) => ge.zIndex || 0)) + 1 : 0, D = Et[xe.length % Et.length], J = x.nativeAspectRatio || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 16 / 9), G = J >= 1 ? 640 : Math.round(360 * J), F = J >= 1 ? Math.round(640 / J) : 360, ue = {
      stationId: x.stationId,
      displayId: x.displayId,
      label: x.label,
      x: 100 + xe.length * 40 % 800,
      y: 80 + xe.length * 40 % 500,
      width: G,
      height: F,
      sourceWidth: x.sourceWidth || 1920,
      sourceHeight: x.sourceHeight || 1080,
      nativeAspectRatio: J,
      aspectRatio: J,
      zIndex: j,
      rotation: 0,
      borderWidth: 2,
      borderColor: D,
      shadowEffect: "deep",
      borderRadius: 0
    }, Ae = [...xe, ue];
    C(Ae), Fe(Ae.length - 1);
  }, [xe, C]), Ce = u.useCallback((x) => {
    const j = xe.filter((D, J) => J !== x);
    C(j), Fe((D) => Math.max(0, D - 1));
  }, [xe, C]), we = u.useCallback(() => {
    C([]), Fe(-1);
  }, [C]), Te = (x) => {
    const j = x.map((J, G) => ({ p: J, origIdx: G }));
    j.sort((J, G) => (J.p.zIndex ?? J.origIdx) - (G.p.zIndex ?? G.origIdx));
    const D = [...x];
    return j.forEach(({ origIdx: J }, G) => {
      D[J] = { ...D[J], zIndex: G + 1 };
    }), D;
  };
  u.useCallback((x = Qe) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), D = j[x].zIndex, J = j.length;
    if (D >= J) return;
    const G = j.map((F, ue) => ue === x ? { ...F, zIndex: J } : F.zIndex > D ? { ...F, zIndex: F.zIndex - 1 } : F);
    C(G);
  }, [Qe, xe, C]), u.useCallback((x = Qe) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), D = j[x].zIndex;
    if (D <= 1) return;
    const J = j.map((G, F) => F === x ? { ...G, zIndex: 1 } : G.zIndex < D ? { ...G, zIndex: G.zIndex + 1 } : G);
    C(J);
  }, [Qe, xe, C]);
  const $e = u.useCallback((x = Qe) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), D = j[x].zIndex, J = D + 1;
    if (J > j.length) return;
    const G = j.map((F, ue) => ue === x ? { ...F, zIndex: J } : F.zIndex === J ? { ...F, zIndex: D } : F);
    C(G);
  }, [Qe, xe, C]), Xe = u.useCallback((x = Qe) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), D = j[x].zIndex, J = D - 1;
    if (J < 1) return;
    const G = j.map((F, ue) => ue === x ? { ...F, zIndex: J } : F.zIndex === J ? { ...F, zIndex: D } : F);
    C(G);
  }, [Qe, xe, C]), We = u.useCallback((x) => {
    if (Qe < 0 || !xe[Qe]) return;
    const j = xe.map((D, J) => J === Qe ? { ...D, ...x } : D);
    C(j);
  }, [Qe, xe, C]), ze = u.useCallback((x = 90) => {
    const j = xe[Qe];
    if (!j) return;
    const J = ((j.rotation || 0) + x) % 360;
    We({ rotation: J });
  }, [Qe, xe, We]), it = u.useCallback((x = Qe) => {
    if (x < 0 || !xe[x]) return;
    const j = xe.length, D = xe.map((J, G) => G === x ? {
      ...J,
      x: 0,
      y: 0,
      width: Pe,
      height: Me,
      zIndex: j
    } : J);
    C(D);
  }, [Qe, xe, C, Pe, Me]), rt = u.useCallback((x) => {
    let j = [];
    const D = hn.length > 0 ? hn : Zt.length > 0 ? Zt : xe;
    switch (x) {
      case "auto":
      case "auto-grid":
        j = qs(D, Pe, Me);
        break;
      case "1x1":
        D.length > 0 && (j = [{
          ...D[0],
          x: 0,
          y: 0,
          width: Pe,
          height: Me,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: Et[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (D.length >= 2) {
          const J = Math.round(Pe / 2);
          j = D.slice(0, 2).map((G, F) => {
            const ue = G.nativeAspectRatio || (G.sourceWidth && G.sourceHeight ? G.sourceWidth / G.sourceHeight : 1.7777777777777777), { x: Ae, y: ge, width: Ee, height: xt } = rr(F * J, 0, J, Me, ue);
            return {
              ...G,
              x: Ae,
              y: ge,
              width: Ee,
              height: xt,
              sourceWidth: G.sourceWidth || 1920,
              sourceHeight: G.sourceHeight || 1080,
              nativeAspectRatio: ue,
              aspectRatio: ue,
              zIndex: F + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: Et[F % Et.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          j = qs(D, Pe, Me);
        break;
      case "2x2": {
        const J = Math.round(Pe / 2), G = Math.round(Me / 2);
        j = D.slice(0, 4).map((F, ue) => ({
          ...F,
          x: ue % 2 * J,
          y: Math.floor(ue / 2) * G,
          width: J,
          height: G,
          zIndex: ue,
          rotation: 0,
          borderWidth: 2,
          borderColor: Et[ue % Et.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (D.length >= 2) {
          j = [
            { ...D[0], x: 0, y: 0, width: Pe, height: Me, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: Et[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const J = D.slice(1, 4), G = Math.round(Pe * 0.23), F = Math.round(G / (16 / 9));
          J.forEach((ue, Ae) => {
            j.push({
              ...ue,
              x: Pe - G - 24,
              y: 24 + Ae * (F + 16),
              width: G,
              height: F,
              zIndex: 10 + Ae,
              rotation: 0,
              borderWidth: 3,
              borderColor: Et[(Ae + 1) % Et.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (D.length >= 3) {
          const J = Math.round(Pe * 0.666), G = Pe - J, F = Math.round(Me / 2);
          j = [
            { ...D[0], x: 0, y: 0, width: J, height: Me, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Et[0], shadowEffect: "deep", borderRadius: 0 },
            { ...D[1], x: J, y: 0, width: G, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Et[1], shadowEffect: "deep", borderRadius: 0 },
            { ...D[2], x: J, y: F, width: G, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Et[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (D.length >= 3)
          if (Pe / Me >= 2.5) {
            const G = Math.round(Pe / 3);
            j = D.slice(0, 3).map((F, ue) => {
              const Ae = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 1.7777777777777777), { x: ge, y: Ee, width: xt, height: ft } = rr(ue * G, 0, G, Me, Ae);
              return {
                ...F,
                x: ge,
                y: Ee,
                width: xt,
                height: ft,
                sourceWidth: F.sourceWidth || 1920,
                sourceHeight: F.sourceHeight || 1080,
                nativeAspectRatio: Ae,
                aspectRatio: Ae,
                zIndex: ue,
                rotation: 0,
                borderWidth: 2,
                borderColor: Et[ue % Et.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const G = Math.round(Pe / 2), F = Math.round(Me / 2);
            j = [
              { ...D[0], x: 0, y: 0, width: G, height: F, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Et[0], shadowEffect: "deep", borderRadius: 0 },
              { ...D[1], x: G, y: 0, width: G, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Et[1], shadowEffect: "deep", borderRadius: 0 },
              { ...D[2], x: Math.round(G / 2), y: F, width: G, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Et[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    j.length > 0 && (C(j), Fe(0), x === "auto" || x === "auto-grid" ? Xt("auto-grid") : (Xt(x), zt.current = !0));
  }, [Zt, xe, C, Pe, Me]), bt = u.useCallback(() => {
    const x = $.trim() || `Custom Layout ${Q.length + 1}`, D = [{
      id: `preset-${Date.now()}`,
      name: x,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(xe)),
      keyframes: JSON.parse(JSON.stringify(En))
    }, ...Q];
    Ze(D), ee(""), ke(!1);
  }, [$, Q, xe, En]), ln = u.useCallback((x) => {
    !x || !x.placements || (C(x.placements), Fe(0), Xt("custom"), zt.current = !0, Ve(!1));
  }, [C]), Vt = u.useCallback((x, j) => {
    j == null || j.stopPropagation();
    const D = Q.filter((J) => J.id !== x);
    Ze(D);
  }, [Q]), gn = u.useCallback(() => {
    const x = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Pe,
      height: Me,
      aspectRatio: Kt,
      placements: xe,
      timeline: vn
    }, j = JSON.stringify(x, null, 2), D = new window.Blob([j], { type: "application/json" }), J = window.URL.createObjectURL(D), G = document.createElement("a"), F = /* @__PURE__ */ new Date(), ue = (ge) => String(ge).padStart(2, "0"), Ae = `${F.getFullYear()}${ue(F.getMonth() + 1)}${ue(F.getDate())}_${ue(F.getHours())}${ue(F.getMinutes())}${ue(F.getSeconds())}`;
    G.href = J, G.download = `canvas_layout_${Ae}.json`, document.body.appendChild(G), G.click(), document.body.removeChild(G), window.URL.revokeObjectURL(J);
  }, [xe, vn, Pe, Me, Kt]), xs = u.useCallback((x) => {
    var J;
    const j = (J = x.target.files) == null ? void 0 : J[0];
    if (!j) return;
    const D = new window.FileReader();
    D.onload = (G) => {
      var F, ue, Ae;
      try {
        const ge = JSON.parse(G.target.result);
        if (ge.width && ge.height) {
          const xt = is.find((ft) => ft.w === ge.width && ft.h === ge.height);
          xt && as(xt.id);
        } else if (ge.aspectRatio) {
          const xt = is.find((ft) => ft.id === ge.aspectRatio);
          xt && as(xt.id);
        }
        let Ee = null;
        Array.isArray(ge) ? Ee = ge : ge.placements && Array.isArray(ge.placements) ? Ee = ge.placements : (F = ge.layout) != null && F.placements && Array.isArray(ge.layout.placements) && (Ee = ge.layout.placements), Ee && Ee.length > 0 && (C(Ee), Fe(0), Xt("custom"), zt.current = !0), ((Ae = (ue = ge.timeline) == null ? void 0 : ue.keyframes) == null ? void 0 : Ae.length) > 0 && (pn(ge.timeline), I && I(ge.timeline));
      } catch (ge) {
        console.error("Failed to parse imported canvas JSON:", ge), alert(`Canvas Import Error: ${ge.message}`);
      }
    }, D.readAsText(j), x.target.value = "";
  }, [C, I]), Cr = (x, j) => {
    if (x.button !== 0) return;
    x.stopPropagation(), x.preventDefault(), Fe(j), zt.current = !0, Xt("custom");
    const D = Rl(), J = rn.current || Lt.current;
    if (!J) return;
    const G = J.getBoundingClientRect(), F = xe[j];
    if (!F) return;
    gs.current = Zn("Move Feed"), _t.current = {
      mode: "drag",
      index: j,
      startX: x.clientX,
      startY: x.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      scaleX: Pe / G.width,
      scaleY: Me / G.height,
      activeSnapZone: null
    }, nt(!0);
    const ue = (ge) => {
      if (!_t.current || _t.current.mode !== "drag") return;
      const Ee = _t.current, xt = rn.current || Lt.current;
      if (!xt) return;
      const ft = xt.getBoundingClientRect(), pt = (ge.clientX - Ee.startX) * Ee.scaleX, ye = (ge.clientY - Ee.startY) * Ee.scaleY;
      let mt = Math.round(Ee.initialX + pt), Bt = Math.round(Ee.initialY + ye);
      mt = en(mt, 0, Pe - Ee.initialW), Bt = en(Bt, 0, Me - Ee.initialH);
      const kt = dt && !ge.altKey;
      let wt = null, Ln = null, qn = null;
      if (kt) {
        const Ht = ge.clientX - ft.left, $t = ge.clientY - ft.top, Ut = 32, _e = Math.round(Pe / 2), vt = Math.round(Me / 2);
        if (Ht <= Ut ? $t <= ft.height * 0.22 ? wt = { x: 0, y: 0, width: _e, height: vt, label: "◰ Top-Left Quarter" } : $t >= ft.height * 0.78 ? wt = { x: 0, y: vt, width: _e, height: vt, label: "◱ Bottom-Left Quarter" } : wt = { x: 0, y: 0, width: _e, height: Me, label: "◧ Left Half (50%)" } : Ht >= ft.width - Ut ? $t <= ft.height * 0.22 ? wt = { x: _e, y: 0, width: _e, height: vt, label: "◲ Top-Right Quarter" } : $t >= ft.height * 0.78 ? wt = { x: _e, y: vt, width: _e, height: vt, label: "◳ Bottom-Right Quarter" } : wt = { x: _e, y: 0, width: _e, height: Me, label: "◨ Right Half (50%)" } : $t <= Ut && Ht >= ft.width * 0.25 && Ht <= ft.width * 0.75 && (wt = { x: 0, y: 0, width: Pe, height: Me, label: "🗖 Full Canvas Maximize" }), !wt) {
          const Sr = xe.filter((ct, Mr) => Mr !== Ee.index), Js = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Pe, targetX: Pe - Ee.initialW, guide: 100 },
            { snapTo: _e, targetX: _e - Math.round(Ee.initialW / 2), guide: 50 }
          ];
          Sr.forEach((ct) => {
            Js.push({ snapTo: ct.x, targetX: ct.x, guide: ct.x / Pe * 100 }), Js.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width - Ee.initialW, guide: (ct.x + ct.width) / Pe * 100 }), Js.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width, guide: (ct.x + ct.width) / Pe * 100 }), Js.push({ snapTo: ct.x, targetX: ct.x - Ee.initialW, guide: ct.x / Pe * 100 });
          });
          let Wu = 18;
          Js.forEach((ct) => {
            const Mr = Math.abs(mt - ct.targetX);
            Mr < Wu && (Wu = Mr, mt = ct.targetX, Ln = ct.guide);
          });
          const Ol = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Me, targetY: Me - Ee.initialH, guide: 100 },
            { snapTo: vt, targetY: vt - Math.round(Ee.initialH / 2), guide: 50 }
          ];
          Sr.forEach((ct) => {
            Ol.push({ snapTo: ct.y, targetY: ct.y, guide: ct.y / Me * 100 }), Ol.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height - Ee.initialH, guide: (ct.y + ct.height) / Me * 100 }), Ol.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height, guide: (ct.y + ct.height) / Me * 100 }), Ol.push({ snapTo: ct.y, targetY: ct.y - Ee.initialH, guide: ct.y / Me * 100 });
          });
          let zu = 18;
          Ol.forEach((ct) => {
            const Mr = Math.abs(Bt - ct.targetY);
            Mr < zu && (zu = Mr, Bt = ct.targetY, qn = ct.guide);
          });
        }
      }
      Ee.activeSnapZone = wt, Ee.latestX = mt, Ee.latestY = Bt, St(wt), Ue({ vertical: Ln, horizontal: qn }), pn((Ht) => {
        const $t = [...Ht.keyframes || []], Ut = D < $t.length ? D : mn;
        if (!$t[Ut]) return Ht;
        const _e = [...$t[Ut].layout.placements || []];
        return _e[Ee.index] ? (_e[Ee.index] = { ..._e[Ee.index], x: mt, y: Bt }, $t[Ut] = {
          ...$t[Ut],
          layout: { ...$t[Ut].layout, placements: _e }
        }, { ...Ht, keyframes: $t }) : Ht;
      });
    }, Ae = () => {
      var ge;
      if (nt(!1), Ue({ vertical: null, horizontal: null }), (ge = _t.current) != null && ge.activeSnapZone) {
        const Ee = _t.current.activeSnapZone, xt = _t.current.index;
        pn((ft) => {
          const pt = [...ft.keyframes || []], ye = D < pt.length ? D : mn;
          if (!pt[ye]) return ft;
          const mt = [...pt[ye].layout.placements || []];
          return mt[xt] ? (mt[xt] = {
            ...mt[xt],
            x: Ee.x,
            y: Ee.y,
            width: Ee.width,
            height: Ee.height
          }, pt[ye] = {
            ...pt[ye],
            layout: { ...pt[ye].layout, placements: mt }
          }, { ...ft, keyframes: pt }) : ft;
        });
      }
      if (_t.current) {
        const Ee = _t.current, xt = Ee.initialX, ft = Ee.initialY, pt = Ee.activeSnapZone ? Ee.activeSnapZone.x : Ee.latestX ?? xt, ye = Ee.activeSnapZone ? Ee.activeSnapZone.y : Ee.latestY ?? ft;
        pt !== xt || ye !== ft ? ($l(), I && pn((mt) => (I(mt), mt))) : gs.current = null;
      }
      St(null), _t.current = null, window.removeEventListener("mousemove", ue), window.removeEventListener("mouseup", Ae);
    };
    window.addEventListener("mousemove", ue), window.addEventListener("mouseup", Ae);
  }, Yr = (x, j, D = "br") => {
    if (x.button !== 0) return;
    x.stopPropagation(), x.preventDefault(), Fe(j), zt.current = !0, Xt("custom");
    const J = Rl();
    if (!Lt.current) return;
    const G = Lt.current.getBoundingClientRect(), F = xe[j];
    if (!F) return;
    gs.current = Zn("Resize Feed");
    const ue = Zt.find((pt) => pt.stationId === F.stationId && pt.displayId === F.displayId), Ae = F.sourceWidth || (ue == null ? void 0 : ue.sourceWidth) || 1920, ge = F.sourceHeight || (ue == null ? void 0 : ue.sourceHeight) || 1080, Ee = F.nativeAspectRatio || F.aspectRatio || (ue == null ? void 0 : ue.nativeAspectRatio) || Ae / ge || F.width / F.height || 16 / 9;
    _t.current = {
      mode: "resize",
      corner: D,
      index: j,
      startX: x.clientX,
      startY: x.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      sourceWidth: Ae,
      sourceHeight: ge,
      nativeAspectRatio: Ee,
      scaleX: Pe / G.width,
      scaleY: Me / G.height
    }, he(!0);
    const xt = (pt) => {
      if (!_t.current || _t.current.mode !== "resize") return;
      const ye = _t.current, mt = (pt.clientX - ye.startX) * ye.scaleX, Bt = (pt.clientY - ye.startY) * ye.scaleY, kt = pt.ctrlKey || pt.shiftKey || pt.metaKey, wt = ye.nativeAspectRatio > 0 ? ye.nativeAspectRatio : ye.initialW / ye.initialH;
      let Ln = ye.initialX, qn = ye.initialY, Ht = ye.initialW, $t = ye.initialH;
      if (ye.corner === "br") {
        const Ut = Pe - ye.initialX, _e = Me - ye.initialY;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(ye.initialW + mt))), gt = Math.round(vt / wt);
          gt > _e && (gt = _e, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt;
        } else
          Ht = en(Math.round(ye.initialW + mt), 160, Ut), $t = en(Math.round(ye.initialH + Bt), 90, _e);
      } else if (ye.corner === "bl") {
        const Ut = ye.initialX + ye.initialW, _e = Me - ye.initialY;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(ye.initialW - mt))), gt = Math.round(vt / wt);
          gt > _e && (gt = _e, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt, Ln = ye.initialX + ye.initialW - Ht;
        } else
          Ht = en(Math.round(ye.initialW - mt), 160, Ut), $t = en(Math.round(ye.initialH + Bt), 90, _e), Ln = ye.initialX + ye.initialW - Ht;
      } else if (ye.corner === "tr") {
        const Ut = Pe - ye.initialX, _e = ye.initialY + ye.initialH;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(ye.initialW + mt))), gt = Math.round(vt / wt);
          gt > _e && (gt = _e, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt, qn = ye.initialY + ye.initialH - $t;
        } else
          Ht = en(Math.round(ye.initialW + mt), 160, Ut), $t = en(Math.round(ye.initialH - Bt), 90, _e), qn = ye.initialY + ye.initialH - $t;
      } else if (ye.corner === "tl") {
        const Ut = ye.initialX + ye.initialW, _e = ye.initialY + ye.initialH;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(ye.initialW - mt))), gt = Math.round(vt / wt);
          gt > _e && (gt = _e, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt, Ln = ye.initialX + ye.initialW - Ht, qn = ye.initialY + ye.initialH - $t;
        } else
          Ht = en(Math.round(ye.initialW - mt), 160, Ut), $t = en(Math.round(ye.initialH - Bt), 90, _e), Ln = ye.initialX + ye.initialW - Ht, qn = ye.initialY + ye.initialH - $t;
      }
      pn((Ut) => {
        const _e = [...Ut.keyframes || []], vt = J < _e.length ? J : mn;
        if (!_e[vt]) return Ut;
        const gt = [..._e[vt].layout.placements || []];
        return gt[ye.index] ? (gt[ye.index] = {
          ...gt[ye.index],
          x: Ln,
          y: qn,
          width: Ht,
          height: $t,
          sourceWidth: ye.sourceWidth,
          sourceHeight: ye.sourceHeight,
          nativeAspectRatio: ye.nativeAspectRatio,
          aspectRatio: ye.nativeAspectRatio
        }, _e[vt] = {
          ..._e[vt],
          layout: { ..._e[vt].layout, placements: gt }
        }, { ...Ut, keyframes: _e }) : Ut;
      });
    }, ft = () => {
      if (_t.current) {
        const pt = _t.current, ye = pt.latestW ?? pt.initialW, mt = pt.latestH ?? pt.initialH;
        ye !== pt.initialW || mt !== pt.initialH ? ($l(), I && pn((Bt) => (I(Bt), Bt))) : gs.current = null;
      }
      he(!1), _t.current = null, window.removeEventListener("mousemove", xt), window.removeEventListener("mouseup", ft);
    };
    window.addEventListener("mousemove", xt), window.addEventListener("mouseup", ft);
  }, Ll = u.useCallback((x) => {
    const j = xe[x];
    if (!j) return;
    const D = Zt.find((Ae) => Ae.stationId === j.stationId && Ae.displayId === j.displayId), J = j.nativeAspectRatio || j.aspectRatio || (D == null ? void 0 : D.nativeAspectRatio) || (j.sourceWidth && j.sourceHeight ? j.sourceWidth / j.sourceHeight : 16 / 9);
    let G = j.width, F = Math.round(G / J);
    j.y + F > Me && (F = Me - j.y, G = Math.round(F * J)), j.x + G > Pe && (G = Pe - j.x, F = Math.round(G / J));
    const ue = xe.map((Ae, ge) => ge === x ? {
      ...Ae,
      width: Math.max(160, G),
      height: Math.max(90, F),
      sourceWidth: j.sourceWidth || (D == null ? void 0 : D.sourceWidth) || 1920,
      sourceHeight: j.sourceHeight || (D == null ? void 0 : D.sourceHeight) || 1080,
      nativeAspectRatio: J,
      aspectRatio: J
    } : Ae);
    C(ue, "Snap Native Aspect");
  }, [xe, Zt, C]), ai = u.useCallback(() => {
    if (At.current.length === 0) return;
    const x = Zn("Redo State");
    $n.current.push(x), $n.current.length > 50 && $n.current.shift();
    const j = At.current.pop();
    j && (pn(j.timeline), I && I(j.timeline), j.aspectId && j.aspectId !== Kt && as(j.aspectId), j.presetId && Xt(j.presetId), j.selectedFeedIndex !== void 0 && Fe(j.selectedFeedIndex), zt.current = !0, Ss((D) => D + 1), Ft(`Undo: ${j.label || "Previous State"}`, "undo", "↺"));
  }, [Zn, I, Kt, Ft]), ii = u.useCallback(() => {
    if ($n.current.length === 0) return;
    const x = Zn("Undo State");
    At.current.push(x), At.current.length > 50 && At.current.shift();
    const j = $n.current.pop();
    j && (pn(j.timeline), I && I(j.timeline), j.aspectId && j.aspectId !== Kt && as(j.aspectId), j.presetId && Xt(j.presetId), j.selectedFeedIndex !== void 0 && Fe(j.selectedFeedIndex), zt.current = !0, Ss((D) => D + 1), Ft(`Redo: ${j.label || "Restored State"}`, "info", "↻"));
  }, [Zn, I, Kt, Ft]), _u = u.useCallback(() => {
    const j = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(xe)),
      keyframes: JSON.parse(JSON.stringify(En)),
      aspectId: Kt,
      width: Pe,
      height: Me
    }, ...Q.filter((D) => D.id !== "preset-quicksave")];
    Ze(j);
    try {
      Ap({
        canvasLayoutTimeline: vn,
        selectedAspectId: Kt,
        selectedPresetId: dn,
        isFullWidth: Wn
      });
    } catch (D) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", D);
    }
    Ft(`State Saved (${Pe}×${Me} • ${xe.length} Feeds)`, "success", "💾");
  }, [xe, En, Kt, Pe, Me, Q, Ze, vn, dn, Wn, Ft]);
  u.useEffect(() => {
    const x = () => ai(), j = () => ii(), D = () => _u();
    return window.addEventListener("itb:studio-undo", x), window.addEventListener("itb:studio-redo", j), window.addEventListener("itb:studio-save-now", D), () => {
      window.removeEventListener("itb:studio-undo", x), window.removeEventListener("itb:studio-redo", j), window.removeEventListener("itb:studio-save-now", D);
    };
  }, [ai, ii, _u]);
  const Kp = u.useCallback(() => {
    if (oe) {
      oe();
      return;
    }
    Ye((x) => {
      const j = !x;
      if (j) {
        r && r(null);
        const D = Rt.current;
        D && D.requestFullscreen && D.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return j;
    });
  }, [oe, r]), Vp = u.useCallback(() => {
    const x = f > 0 ? f : d + v, { nextTimeline: j, newIndex: D, isNew: J } = sh(
      vn,
      x,
      (zn == null ? void 0 : zn.layout) || {
        width: Pe,
        height: Me,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(xe))
      }
    );
    J ? (Rn("Add Keyframe"), pn(j), I && I(j), O && O(D), Ft(`Keyframe #${D + 1} created at ${jt(x, p, { includeSeconds: !0 })}`, "success", "💎")) : (O && O(D), Ft(`Jumped to existing Keyframe #${D + 1}`, "info", "💎"));
  }, [f, d, v, zn, xe, Pe, Me, vn, I, O, p, Ft, Rn]);
  u.useCallback(() => {
    if (En.length <= 1 || mn === 0) {
      Ft("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Rn("Delete Keyframe");
    const { nextTimeline: x, success: j, newIndex: D } = Kg(vn, mn);
    j && (pn(x), I && I(x), O && O(D), Ft("Keyframe deleted", "info", "🗑️"));
  }, [En, mn, vn, I, O, Ft, Rn]), u.useCallback((x) => {
    mn !== 0 && (Rn("Update Transition Type"), pn((j) => {
      const D = _c(j, mn, { transitionType: x });
      return I && I(D), D;
    }));
  }, [mn, I, Rn]), u.useCallback((x) => {
    mn !== 0 && (Rn("Update Transition Duration"), pn((j) => {
      const D = _c(j, mn, { transitionDurationSec: x });
      return I && I(D), D;
    }));
  }, [mn, I, Rn]), u.useEffect(() => {
    const x = (j) => {
      if (!(j.target.tagName === "INPUT" || j.target.tagName === "TEXTAREA" || j.target.isContentEditable)) {
        if (j.key === "Delete" || j.key === "Backspace") {
          Qe >= 0 && xe[Qe] && (j.preventDefault(), Ce(Qe));
          return;
        }
        if ((j.code === "Space" || j.key === " ") && S) {
          j.preventDefault(), S((D) => !D);
          return;
        }
        if ((j.key === "k" || j.key === "K") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), Vp();
          return;
        }
        if (j.key === "Escape") {
          et(!1), Ve(!1), De(!1), cn(!1), st(!1), ke(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(j.key)) {
          if (Qe >= 0 && xe[Qe]) {
            j.preventDefault(), zt.current = !0, Xt("custom");
            const D = j.shiftKey ? 1 : 10;
            let J = 0, G = 0;
            j.key === "ArrowLeft" && (J = -D), j.key === "ArrowRight" && (J = D), j.key === "ArrowUp" && (G = -D), j.key === "ArrowDown" && (G = D);
            const F = xe[Qe], ue = en(F.x + J, 0, Pe - F.width), Ae = en(F.y + G, 0, Me - F.height), ge = xe.map((Ee, xt) => xt === Qe ? { ...Ee, x: ue, y: Ae } : Ee);
            C(ge);
          }
          return;
        }
        if ((j.key === "r" || j.key === "R") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), ut((D) => !D);
          return;
        }
        if ((j.key === "s" || j.key === "S") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), qe((D) => !D);
          return;
        }
      }
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [Qe, xe, Ce, C, ut, qe]);
  const Fu = u.useMemo(() => zg({
    keyframes: En,
    currentEpochMs: te,
    currentPlacements: xe,
    isEditing: ae || z
  }), [ae, z, En, te, xe]), Yp = u.useMemo(() => Fu.map((x, j) => ({ ...x, originalIndex: j })).sort((x, j) => (x.zIndex ?? x.originalIndex) - (j.zIndex ?? j.originalIndex)), [Fu]), Xs = xe[Qe] || null, { filteredPlaced: Qs, filteredUnplaced: Oo } = u.useMemo(() => {
    const x = (V || "").toLowerCase(), j = xe.map((F, ue) => {
      const Ae = F.zIndex ?? ue + 1, ge = Zt.find((Ee) => Ee.stationId === F.stationId && Ee.displayId === F.displayId);
      return {
        type: "placed",
        origIdx: ue,
        placement: F,
        feed: ge,
        stationId: F.stationId,
        displayId: F.displayId,
        label: F.label || (ge == null ? void 0 : ge.label) || `${F.stationId} (${F.displayId})`,
        layerRank: Ae,
        isSelected: ue === Qe,
        sourceWidth: F.sourceWidth || (ge == null ? void 0 : ge.sourceWidth) || 1920,
        sourceHeight: F.sourceHeight || (ge == null ? void 0 : ge.sourceHeight) || 1080
      };
    });
    j.sort((F, ue) => ue.layerRank - F.layerRank);
    const D = Zt.filter((F) => !xe.some((ue) => ue.stationId === F.stationId && ue.displayId === F.displayId)).map((F) => ({
      type: "unplaced",
      feed: F,
      stationId: F.stationId,
      displayId: F.displayId,
      label: F.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: F.sourceWidth || 1920,
      sourceHeight: F.sourceHeight || 1080
    })), J = x ? j.filter((F) => F.label.toLowerCase().includes(x)) : j, G = x ? D.filter((F) => F.label.toLowerCase().includes(x)) : D;
    return { filteredPlaced: J, filteredUnplaced: G };
  }, [xe, Zt, Qe, V]), Bu = u.useCallback((x, j) => {
    x.stopPropagation(), Ie(j), x.dataTransfer.effectAllowed = "copyMove", x.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: j.origIdx,
      type: j.type,
      stationId: j.stationId,
      displayId: j.displayId
    }));
  }, []), Gp = u.useCallback((x, j) => {
    x.preventDefault(), x.stopPropagation(), x.dataTransfer.dropEffect = "move";
    const D = x.currentTarget.getBoundingClientRect(), J = D.top + D.height / 2, G = x.clientY < J ? "above" : "below";
    at((F) => F.index === j && F.position === G ? F : { index: j, position: G });
  }, []), Xp = u.useCallback((x, j) => {
    x.stopPropagation(), at((D) => D.index === j ? { index: null, position: null } : D);
  }, []), Uu = u.useCallback(() => {
    Ie(null), at({ index: null, position: null });
  }, []), Qp = u.useCallback((x, j) => {
    x.preventDefault(), x.stopPropagation();
    const D = tt;
    at({ index: null, position: null }), Ie(null);
    const J = x.dataTransfer.getData("text/plain");
    if (J)
      try {
        const G = JSON.parse(J);
        if (G.type === "placed") {
          const F = G.origIdx, ue = Qs.findIndex((pt) => pt.origIdx === F);
          if (ue === -1) return;
          let Ae = j;
          if (D.position === "below" && (Ae += 1), ue < Ae && (Ae -= 1), ue === Ae) return;
          const ge = [...Qs], [Ee] = ge.splice(ue, 1);
          ge.splice(Ae, 0, Ee);
          const xt = ge.length, ft = xe.map((pt, ye) => {
            const mt = ge.findIndex((Bt) => Bt.origIdx === ye);
            return mt !== -1 ? {
              ...pt,
              zIndex: xt - mt
            } : pt;
          });
          C(ft), Fe(Ee.origIdx);
        } else if (G.type === "unplaced") {
          const F = Zt.find((wt) => wt.stationId === G.stationId && wt.displayId === G.displayId);
          if (!F) return;
          const ue = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 16 / 9), Ae = ue >= 1 ? 640 : Math.round(360 * ue), ge = ue >= 1 ? Math.round(640 / ue) : 360, Ee = Et[xe.length % Et.length];
          let xt = j;
          D.position === "below" && (xt += 1);
          const ft = {
            stationId: F.stationId,
            displayId: F.displayId,
            label: F.label,
            x: 100 + xe.length * 40 % 800,
            y: 80 + xe.length * 40 % 500,
            width: Ae,
            height: ge,
            sourceWidth: F.sourceWidth || 1920,
            sourceHeight: F.sourceHeight || 1080,
            nativeAspectRatio: ue,
            aspectRatio: ue,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: Ee,
            shadowEffect: "deep",
            borderRadius: 0
          }, pt = [...xe, ft], ye = pt.length - 1, mt = [...Qs];
          mt.splice(xt, 0, { origIdx: ye });
          const Bt = mt.length, kt = pt.map((wt, Ln) => {
            const qn = mt.findIndex((Ht) => Ht.origIdx === Ln);
            return {
              ...wt,
              zIndex: qn !== -1 ? Bt - qn : 1
            };
          });
          C(kt), Fe(ye);
        }
      } catch (G) {
        console.warn("Failed to handle layer drag drop:", G);
      }
  }, [tt, Qs, xe, Zt, C]), Jp = u.useCallback((x) => {
    x.preventDefault();
    const j = x.dataTransfer.getData("text/plain");
    if (!(!j || !Lt.current))
      try {
        const D = JSON.parse(j), J = Lt.current.getBoundingClientRect(), G = x.clientX - J.left, F = x.clientY - J.top, ue = en(Math.round(G / J.width * Pe), 0, Pe - 320), Ae = en(Math.round(F / J.height * Me), 0, Me - 180);
        if (D.type === "unplaced") {
          const ge = Zt.find((Ee) => Ee.stationId === D.stationId && Ee.displayId === D.displayId);
          if (ge) {
            const Ee = ge.nativeAspectRatio || (ge.sourceWidth && ge.sourceHeight ? ge.sourceWidth / ge.sourceHeight : 1.7777777777777777), xt = Ee >= 1 ? 640 : Math.round(360 * Ee), ft = Ee >= 1 ? Math.round(640 / Ee) : 360, pt = xe.length > 0 ? Math.max(...xe.map((kt) => kt.zIndex || 0)) + 1 : 1, ye = Et[xe.length % Et.length], mt = {
              stationId: ge.stationId,
              displayId: ge.displayId,
              label: ge.label,
              x: en(ue, 0, Pe - xt),
              y: en(Ae, 0, Me - ft),
              width: xt,
              height: ft,
              sourceWidth: ge.sourceWidth || 1920,
              sourceHeight: ge.sourceHeight || 1080,
              nativeAspectRatio: Ee,
              aspectRatio: Ee,
              zIndex: pt,
              rotation: 0,
              borderWidth: 2,
              borderColor: ye,
              shadowEffect: "deep",
              borderRadius: 0
            }, Bt = [...xe, mt];
            C(Bt), Fe(Bt.length - 1);
          }
        } else if (D.type === "placed" && D.origIdx !== void 0) {
          const ge = xe.map((Ee, xt) => xt === D.origIdx ? {
            ...Ee,
            x: en(ue, 0, Pe - Ee.width),
            y: en(Ae, 0, Me - Ee.height)
          } : Ee);
          C(ge), Fe(D.origIdx);
        }
      } catch (D) {
        console.warn("Canvas drop failed:", D);
      }
  }, [Zt, xe, C, Pe, Me]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Rt,
      className: `multicam-viewport-root canvas-grid ${ot ? "fullscreen-grid-active" : ""}`,
      children: [
        (ae || z) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: ae ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        Un && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Un.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Un.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Un.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: Ot, className: `canvas-stage-wrapper ${Wn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          je && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  xe.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => et(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: V,
                onChange: (x) => q(x.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Qs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Qs.length })
                ] }),
                Qs.map((x, j) => {
                  const D = be && be.type === "placed" && be.origIdx === x.origIdx, G = tt.index === j ? tt.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${x.isSelected ? "is-selected" : ""} ${D ? "is-dragging-row" : ""} ${G}`,
                      draggable: !0,
                      onDragStart: (F) => Bu(F, x),
                      onDragOver: (F) => Gp(F, j),
                      onDragLeave: (F) => Xp(F, j),
                      onDrop: (F) => Qp(F, j),
                      onDragEnd: Uu,
                      onClick: () => Fe(x.origIdx),
                      title: `Drag to reorder layer (${x.label})`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                        /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${x.layerRank}`, children: [
                          "#",
                          x.layerRank
                        ] }),
                        /* @__PURE__ */ s.jsx("span", { className: `status-dot ${x.isSelected ? "active" : ""}` }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: x.label, children: x.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          x.sourceWidth,
                          "×",
                          x.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (F) => F.stopPropagation(), children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => $e(x.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Xe(x.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => Ce(x.origIdx),
                              title: "Remove from canvas",
                              children: "✕"
                            }
                          )
                        ] })
                      ]
                    },
                    `feed-layer-${x.stationId}-${x.displayId}-${x.origIdx}`
                  );
                })
              ] }),
              Oo.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Oo.length })
                ] }),
                Oo.map((x) => {
                  const j = be && be.type === "unplaced" && be.stationId === x.stationId && be.displayId === x.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${j ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (D) => Bu(D, x),
                      onDragEnd: Uu,
                      onClick: () => ve(x.feed),
                      title: `Drag onto canvas or layers, or click to add ${x.label}`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                        /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                        /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: x.label, children: x.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          x.sourceWidth,
                          "×",
                          x.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (D) => D.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-add-row",
                            onClick: () => ve(x.feed),
                            title: "Add to canvas",
                            children: "＋ ADD"
                          }
                        ) })
                      ]
                    },
                    `unplaced-feed-${x.stationId}-${x.displayId}`
                  );
                })
              ] }),
              Qs.length === 0 && Oo.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => rt("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: we, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${je ? "active" : ""}`,
                  onClick: () => et((x) => !x),
                  title: `Feeds & Layers Palette (${xe.length}/${Zt.length} on canvas)`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: xe.length }),
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
                    className: `btn-wing-tool ${me ? "active" : ""}`,
                    onClick: () => {
                      fe((x) => !x), Se(!1);
                    },
                    title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                    ]
                  }
                ),
                me && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${dn === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        Xt("auto-grid"), rt("auto-grid"), fe(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const x = new Set((t && t.length > 0 ? t : n).map((J) => J.id)), j = (xe || []).filter((J) => x.has(J.stationId)), D = (t && t.length > 0 ? t : n).filter((J) => !j.some((G) => G.stationId === J.id));
                          return j.length > 0 ? j.length + D.length : hn.length;
                        })() })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${dn === "1x1" ? "active" : ""}`,
                      onClick: () => {
                        Xt("1x1"), rt("1x1"), fe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${dn === "1x2" ? "active" : ""}`,
                      onClick: () => {
                        Xt("1x2"), rt("1x2"), fe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${dn === "2x2" ? "active" : ""}`,
                      onClick: () => {
                        Xt("2x2"), rt("2x2"), fe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${dn === "1+3-pip" ? "active" : ""}`,
                      onClick: () => {
                        Xt("1+3-pip"), rt("1+3-pip"), fe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${dn === "hero-stacked" ? "active" : ""}`,
                      onClick: () => {
                        Xt("hero-stacked"), rt("hero-stacked"), fe(!1);
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
                    className: `btn-wing-tool ${le ? "active" : ""}`,
                    onClick: () => {
                      Se((x) => !x), fe(!1);
                    },
                    title: `Aspect Ratio: ${Kt} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Kt })
                    ]
                  }
                ),
                le && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  is.map((x) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Kt === x.id ? "active" : ""}`,
                      onClick: () => {
                        de(x.id), Se(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: x.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                          x.w,
                          "×",
                          x.h
                        ] })
                      ]
                    },
                    x.id
                  ))
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${Wn ? "highlight-emerald" : "highlight-cyan"}`,
                  onClick: Mn,
                  title: Wn ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Wn ? "↔" : "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Wn ? "100%" : "FIT" })
                  ]
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${dt ? "active" : ""}`,
                  onClick: () => qe((x) => !x),
                  title: dt ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                  className: `btn-wing-tool ${Je ? "active" : ""}`,
                  onClick: () => ut((x) => !x),
                  title: Je ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  onClick: ai,
                  disabled: At.current.length === 0,
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
                  onClick: ii,
                  disabled: $n.current.length === 0,
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
                ref: (x) => {
                  Lt.current = x, rn.current = x;
                },
                className: `canvas-master-frame-16-9 ${Wn ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: lt.width > 180 ? `${lt.width}px` : "100%",
                  height: lt.height > 100 ? `${lt.height}px` : "auto",
                  aspectRatio: `${Pe} / ${Me}`
                },
                onMouseMove: $o,
                onMouseLeave: Ro,
                onDragOver: (x) => {
                  x.preventDefault(), x.dataTransfer.dropEffect = "copy";
                },
                onDrop: Jp,
                onClick: () => Dt(!1),
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
                        left: `${ht.x / Pe * 100}%`,
                        top: `${ht.y / Me * 100}%`,
                        width: `${ht.width / Pe * 100}%`,
                        height: `${ht.height / Me * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: ht.label })
                      ] })
                    }
                  ),
                  Je && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Pe}×${Me}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Mt.isInside ? `${Mt.x},${Mt.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${Pe} 20`,
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
                          Ao.map((x) => x.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: x.val, y1: "0", x2: x.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: x.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: x.val })
                          ] }, `rx-${x.val}`) : x.isMed ? /* @__PURE__ */ s.jsx("line", { x1: x.val, y1: "8", x2: x.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${x.val}`) : /* @__PURE__ */ s.jsx("line", { x1: x.val, y1: "13", x2: x.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${x.val}`)),
                          Mt.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: Mt.x,
                              y1: "0",
                              x2: Mt.x,
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
                        viewBox: `0 0 20 ${Me}`,
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
                          jr.map((x) => x.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: x.val, x2: "18", y2: x.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: x.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: x.val })
                          ] }, `ry-${x.val}`) : x.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: x.val, x2: "18", y2: x.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${x.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: x.val, x2: "18", y2: x.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${x.val}`)),
                          Mt.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: Mt.y,
                              x2: "20",
                              y2: Mt.y,
                              stroke: "#06B6D4",
                              strokeWidth: "2"
                            }
                          )
                        ]
                      }
                    ) })
                  ] }),
                  pe.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${pe.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  pe.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${pe.horizontal}%`,
                        height: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  xe.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                    /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                    /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                    /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => et(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => rt("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Yp.map((x) => {
                    var Ut;
                    const j = x.originalIndex, D = Qe === j, J = ae && Qe === j, G = z && Qe === j, F = (n.length > 0 ? n : t).find(
                      (_e) => {
                        var vt, gt, Sr, Js;
                        return _e.id === x.stationId || ((vt = _e.hostname) == null ? void 0 : vt.toLowerCase()) === ((gt = x.stationId) == null ? void 0 : gt.toLowerCase()) || ((Sr = _e.id) == null ? void 0 : Sr.toLowerCase()) === ((Js = x.stationId) == null ? void 0 : Js.toLowerCase());
                      }
                    ), ue = Zt.find((_e) => _e.stationId === x.stationId && _e.displayId === x.displayId), Ae = F || {
                      id: x.stationId,
                      hostname: (ue == null ? void 0 : ue.stationHostname) || x.stationHostname || x.stationId,
                      displayName: (ue == null ? void 0 : ue.stationName) || x.label || x.stationId,
                      displays: ue ? [{ displayId: ue.displayId, width: ue.sourceWidth, height: ue.sourceHeight }] : []
                    }, ge = (Ae == null ? void 0 : Ae.displays) || ((Ut = Ae == null ? void 0 : Ae.topology) == null ? void 0 : Ut.displays) || [], Ee = xe.filter(
                      (_e) => _e.stationId === x.stationId || Ae && (_e.stationId === Ae.id || _e.stationId === Ae.hostname)
                    ), xt = ge.length > 1 && Ee.length >= ge.length, ft = x.borderColor || Et[j % Et.length], pt = x.borderWidth !== void 0 ? x.borderWidth : 2, ye = x.rotation || 0, mt = x.shadowEffect || "deep", Bt = x.borderRadius || 0, kt = x.x / Pe * 100, wt = x.y / Me * 100, Ln = x.width / Pe * 100, qn = x.height / Me * 100, Ht = Gg(mt, D, ft);
                    x.y < 50, x.x < 100, x.x + x.width > Pe - 100;
                    const $t = x.zIndex !== void 0 ? x.zIndex : j + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${D ? "is-selected" : ""} ${J ? "is-dragging" : ""} ${G ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${kt}%`,
                          top: `${wt}%`,
                          width: `${Ln}%`,
                          height: `${qn}%`,
                          zIndex: $t * 10 + (J ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${pt}px solid ${ft}`,
                          borderRadius: `${Bt}px`,
                          boxShadow: Ht,
                          opacity: x.opacity !== void 0 ? x.opacity : 1,
                          pointerEvents: x.opacity !== void 0 && x.opacity < 0.1 ? "none" : "auto",
                          cursor: J ? "grabbing" : "grab",
                          transition: J || G ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (_e) => Cr(_e, j),
                        onContextMenu: (_e) => {
                          _e.preventDefault(), _e.stopPropagation(), Fe(j), Dt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (_e) => Cr(_e, j),
                              onDoubleClick: () => it(j),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: x.label || `${Ae.displayName || x.stationId} (${x.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(x.width),
                                  "×",
                                  Math.round(x.height),
                                  " (",
                                  Jr(x.width, x.height),
                                  ") @ (",
                                  Math.round(x.x),
                                  ",",
                                  Math.round(x.y),
                                  ")",
                                  ye !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    ye,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${$t}`, children: [
                                  "#$",
                                  $t
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-badge-action-inspector ${D && Nt ? "active" : ""}`,
                                    onClick: (_e) => {
                                      _e.stopPropagation(), Fe(j), Dt((vt) => !vt || Qe !== j);
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
                                  transform: ye ? `rotate(${ye}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: J ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  _g,
                                  {
                                    station: Ae,
                                    isSolo: !1,
                                    currentEpochMs: te,
                                    timeMode: p,
                                    isPlaying: y,
                                    setIsPlaying: S,
                                    baseEpochMs: d,
                                    totalDurationMs: M,
                                    outPointMs: k,
                                    setPlayheadMs: g,
                                    globalGaps: m,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: T,
                                    playbackSpeed: w,
                                    activeAudioStationId: Le,
                                    onSoloAudio: Be,
                                    directorPlan: E || (Ae == null ? void 0 : Ae.directorPlan),
                                    isAutoDirectorEnabled: i ? i[Ae.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: a,
                                    targetDisplayId: x.displayId,
                                    onSelectDisplayId: (_e) => {
                                      const vt = xe.map((gt, Sr) => Sr === j ? { ...gt, displayId: _e } : gt);
                                      C(vt);
                                    },
                                    areAllDisplaysPlaced: xt,
                                    slotIndex: j,
                                    borderColor: ft
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (_e) => Cr(_e, j),
                                onDoubleClick: () => it(j),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          D && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (_e) => Yr(_e, j, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Jr(x.sourceWidth, x.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (_e) => Yr(_e, j, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Jr(x.sourceWidth, x.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (_e) => Yr(_e, j, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Jr(x.sourceWidth, x.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (_e) => Yr(_e, j, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Jr(x.sourceWidth, x.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${x.stationId}-${x.displayId}-${j}`
                    );
                  }),
                  !K && Nt && Qe !== null && Xs && (() => {
                    const x = Xs, j = Qe, D = x.borderColor || Et[j % Et.length], J = x.borderWidth !== void 0 ? x.borderWidth : 2, G = x.rotation || 0, F = x.shadowEffect || "deep", ue = x.zIndex !== void 0 ? x.zIndex : j + 1, Ae = x.x / Pe * 100, ge = x.width / Pe * 100, Ee = Ae + ge / 2;
                    let xt = `${Ee}%`, ft = "translateX(-50%)";
                    Ee < 28 ? (xt = `${Math.max(1, Ae)}%`, ft = "none") : Ee > 72 && (xt = `${Math.min(99, Ae + ge)}%`, ft = "translateX(-100%)");
                    const pt = x.y + x.height + 8;
                    let ye;
                    pt + 45 > Me ? ye = `${Math.max(20, (x.y + x.height - 44) / Me * 100)}%` : ye = `${pt / Me * 100}%`;
                    const mt = (n.length > 0 ? n : t).find(
                      (kt) => {
                        var wt, Ln;
                        return kt.id === x.stationId || ((wt = kt.hostname) == null ? void 0 : wt.toLowerCase()) === ((Ln = x.stationId) == null ? void 0 : Ln.toLowerCase());
                      }
                    ), Bt = mt ? mt.id : x.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector compact-hud-inspector",
                        style: {
                          position: "absolute",
                          left: xt,
                          top: ye,
                          transform: ft,
                          zIndex: 99999
                        },
                        onMouseDown: (kt) => kt.stopPropagation(),
                        onClick: (kt) => kt.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${x.label || Bt} • Layer #${ue}`, children: [
                            "🎛️ #$",
                            ue
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool color-swatch-trigger",
                                onClick: () => st((kt) => !kt),
                                title: "🎨 Frame Color: Choose border color",
                                children: /* @__PURE__ */ s.jsx(
                                  "span",
                                  {
                                    className: "swatch-circle",
                                    style: { backgroundColor: D === "transparent" ? "#1E293B" : D }
                                  }
                                )
                              }
                            ),
                            Re && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Yg.map((kt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${D === kt ? "is-active" : ""}`,
                                style: { backgroundColor: kt === "transparent" ? "#1E293B" : kt },
                                onClick: () => {
                                  We({ borderColor: kt }), st(!1);
                                },
                                title: kt === "transparent" ? "No Border (Transparent)" : `Border Color: ${kt}`
                              },
                              kt
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => {
                                const kt = [0, 2, 4, 8], wt = kt[(kt.indexOf(J) + 1) % kt.length];
                                We({ borderWidth: wt });
                              },
                              title: `Border Width: ${J}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                              children: [
                                "📏 ",
                                J,
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
                                const kt = ["none", "deep", "glow-cyan", "glow-emerald"], wt = kt[(kt.indexOf(F) + 1) % kt.length];
                                We({ shadowEffect: wt });
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
                                onClick: () => $e(j),
                                title: "Step Layer Up (+1)",
                                children: "▲"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Xe(j),
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
                              onClick: () => ze(90),
                              title: `Rotate: Step 90° clockwise (Current: ${G}°)`,
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => Ll(j),
                              title: `Snap to Native Recorded Aspect (${Jr(x.sourceWidth, x.sourceHeight)})`,
                              children: "📐 NATIVE"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => it(j),
                              title: "1x1 Focus Mode (Double-click window to toggle)",
                              children: "⛶ 1x1"
                            }
                          ),
                          l && /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => l(Bt, x.displayId),
                              title: "Deep Forensic Multi-Angle Spotlight",
                              children: "🔍"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-del-feed",
                              onClick: () => Ce(j),
                              title: "Remove Screen from Canvas",
                              children: "🗑️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-close-inspector",
                              onClick: () => Fe(null),
                              title: "Close Menu (Esc)",
                              children: "✕"
                            }
                          )
                        ]
                      }
                    );
                  })(),
                  /* @__PURE__ */ s.jsx(
                    Fg,
                    {
                      currentEpochMs: te,
                      position: Z,
                      onPositionChange: (x) => {
                        Y(x);
                        try {
                          localStorage.setItem("itb_canvas_utc_clock_pos", x);
                        } catch {
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx(Bg, {})
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => ke(!0),
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
                    className: `btn-wing-tool ${Ke ? "active" : ""}`,
                    onClick: () => Ve((x) => !x),
                    title: `Saved Presets Library (${Q.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Q.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                Ke && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Ve(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Q.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Q.map((x) => {
                    var j;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      ln(x), Ve(!1);
                    }, children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: x.name }),
                        /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                          ((j = x.placements) == null ? void 0 : j.length) || 0,
                          " screens • ",
                          x.dateStr
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-del-preset",
                          onClick: (D) => Vt(x.id, D),
                          title: "Delete saved preset",
                          children: "🗑️"
                        }
                      )
                    ] }, x.id);
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool",
                  onClick: gn,
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
                    var x;
                    return (x = X.current) == null ? void 0 : x.click();
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
                  ref: X,
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
                    zt.current = !1, Xt("auto-grid");
                    const x = hn.length > 0 ? hn : Zt, j = qs(x, Pe, Me), D = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: Pe,
                            height: Me,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: j
                          }
                        }
                      ]
                    };
                    pn(D), I && I(D), Fe(0);
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
                  onClick: we,
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
                  className: `btn-wing-tool ${ot ? "active" : ""}`,
                  onClick: Kp,
                  title: "Fullscreen Canvas Grid (F)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: ot ? "⤓" : "⛶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: ot ? "EXIT" : "FULL" })
                  ]
                }
              )
            ] })
          ] }),
          " "
        ] }) }),
        " ",
        ie && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => ke(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (x) => x.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => ke(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: $,
                onChange: (x) => ee(x.target.value),
                autoFocus: !0,
                onKeyDown: (x) => {
                  x.key === "Enter" && bt();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              xe.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => ke(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: bt, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const Fi = [0.5, 1, 1.25, 1.5, 2, 4];
function Uc({
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
  onStepFrameForward: f,
  onStepFrameBackward: p,
  playbackSpeed: y = 1,
  onChangeSpeed: S,
  onSetInPoint: M,
  onSetOutPoint: _
}) {
  const [k, g] = u.useState(() => Nl()), { volume: m, isMuted: T } = k, w = !!(v && d > 0);
  u.useEffect(() => {
    const H = (I) => {
      I.detail && g(I.detail);
    };
    return window.addEventListener("itb-audio-state-changed", H), () => window.removeEventListener("itb-audio-state-changed", H);
  }, []);
  const b = u.useCallback((H, I, U) => {
    const O = {
      volume: typeof H == "number" ? H : m,
      isMuted: typeof I == "boolean" ? I : T,
      channelMode: U || k.channelMode || "both"
    };
    g(O), Rg(O);
  }, [m, T, k.channelMode]), h = (H) => {
    H == null || H.stopPropagation(), w && n(!t);
  }, A = (H) => {
    if (H == null || H.stopPropagation(), !w || !S) return;
    const I = Fi.indexOf(y), U = I === -1 ? 1 : (I + 1) % Fi.length;
    S(Fi[U]);
  }, E = (H) => {
    H == null || H.stopPropagation(), T ? b(m === 0 ? 0.5 : m, !1) : b(m, !0);
  }, N = (H) => {
    H.stopPropagation();
    const I = parseFloat(H.target.value);
    I === 0 ? b(0, !0) : b(I, !1);
  }, P = (H) => {
    const I = u.useRef(null), U = u.useRef(null), O = u.useRef(0), K = u.useCallback(() => {
      I.current && clearTimeout(I.current), U.current && clearInterval(U.current), I.current = null, U.current = null;
    }, []), R = u.useCallback((te = 1) => {
      if (n && n(!1), a) {
        const Z = 33 * te;
        a((Y) => {
          const Le = H === "forward" ? Y + Z : Y - Z;
          return Math.max(0, Math.min(d, Le));
        });
      } else H === "forward" && f ? f() : H === "backward" && p && p();
    }, [H]), oe = u.useCallback((te) => {
      te.preventDefault(), te.stopPropagation(), w && (K(), R(1), O.current = performance.now(), I.current = setTimeout(() => {
        U.current = setInterval(() => {
          const Z = performance.now() - O.current, Y = Z > 2500 ? 4 : Z > 1e3 ? 2 : 1;
          R(Y);
        }, 50);
      }, 280));
    }, [R, K]);
    return u.useEffect(() => K, [K]), {
      onMouseDown: oe,
      onMouseUp: K,
      onMouseLeave: K,
      onTouchStart: oe,
      onTouchEnd: K
    };
  }, W = P("backward"), L = P("forward"), B = (H) => {
    H.stopPropagation(), w && (n && n(!1), a && a(i));
  }, re = (H) => {
    H.stopPropagation(), w && (n && n(!1), a && a(c));
  }, ne = () => T || m === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : m < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
            disabled: !M,
            onClick: (H) => {
              H.stopPropagation(), M == null || M();
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
              onClick: (H) => {
                H.stopPropagation(), l && l(!r);
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
              onClick: B,
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
              ...W,
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
              ...L,
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
            disabled: !_,
            onClick: (H) => {
              H.stopPropagation(), _ == null || _();
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
              className: `btn-audio-mute ${T || m === 0 ? "is-muted" : ""}`,
              onClick: E,
              title: T ? "Unmute" : `Mute (${Math.round(m * 100)}%)`,
              children: ne()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: T ? 0 : m,
              onChange: N,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const ga = 2500, Qg = {
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
function Jg(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Qg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function Lp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Jg), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Op(e, t = " + ") {
  return Lp(e).join(t);
}
function Hl(e) {
  return Op(e, "+");
}
const Zg = 8;
function qg({
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
  const [v, f] = u.useState([]), [, p] = u.useState(!1), y = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((m) => ({
    id: m.id,
    name: m.displayName || m.hostname || m.name || m.id,
    hostname: m.hostname || m.id
  })) : t || e ? [{
    id: t || e,
    name: e || t,
    hostname: t || e
  }] : [], [n, t, e]);
  u.useEffect(() => {
    if (r && Array.isArray(r) && r.length > 0)
      return;
    if (!y.length || !l || i <= 0) {
      f([]);
      return;
    }
    const m = new AbortController(), T = Math.max(0, l + a - ga), w = l + a + i + ga;
    p(!0);
    const b = y.map((h) => {
      const A = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(h.hostname)}&startEpoch=${T}&endEpoch=${w}`;
      return fetch(A, { signal: m.signal }).then((E) => E.ok ? E.json() : []).then((E) => (Array.isArray(E) ? E : []).map((N) => ({
        ...N,
        stationId: h.id,
        stationName: h.name
      }))).catch((E) => {
        if (E.name !== "AbortError") return [];
        throw E;
      });
    });
    return Promise.all(b).then((h) => {
      const A = h.flat();
      f(A), p(!1);
    }).catch((h) => {
      h.name !== "AbortError" && (f([]), p(!1));
    }), () => m.abort();
  }, [y, l, a, i, r]);
  const S = r && Array.isArray(r) && r.length > 0 ? r : v, M = u.useMemo(() => {
    if (!S.length || i <= 0 || c <= 0)
      return [];
    const m = l + a, T = m + i, w = [...S].sort((E, N) => E.epochMs - N.epochMs), b = [];
    let h = null, A = -999;
    for (const E of w) {
      const N = E.epochMs + ga;
      if (N < m || N > T)
        continue;
      const P = N - l, W = (P - a) / i * c;
      if (h && W - A < Zg) {
        h.events.push(E), h.endOffsetMs = P, h.endEpochMs = N;
        const L = new Set(h.events.map((B) => B.stationName || "Workstation"));
        h.isMultiStation = L.size > 1, h.stationCount = L.size, A = W;
      } else {
        const L = (P - a) / i * 100;
        h = {
          id: `kc_${E.epochMs}_${b.length}`,
          startOffsetMs: P,
          endOffsetMs: P,
          startEpochMs: N,
          endEpochMs: N,
          pct: L,
          events: [E],
          isMultiStation: !1,
          stationCount: 1
        }, b.push(h), A = W;
      }
    }
    return b;
  }, [S, l, a, i, c]);
  function _(m) {
    if (!m.events.length) return "";
    if (m.events.length === 1)
      return Hl(m.events[0].keyCombination);
    const T = m.events.find((h) => h.keyCombination.includes("+"));
    if (T) {
      const h = Hl(T.keyCombination);
      return m.events.length > 1 ? `${h} (+${m.events.length - 1})` : h;
    }
    const w = Hl(m.events[0].keyCombination);
    return m.events.every((h) => Hl(h.keyCombination) === w) ? `${w} ×${m.events.length}` : `${w} (+${m.events.length - 1})`;
  }
  function k(m, T = "LOCAL") {
    return jt(m, T);
  }
  function g(m) {
    const T = [];
    for (const w of m) {
      const b = Hl(w.keyCombination);
      T.length && T[T.length - 1].key === b ? T[T.length - 1].count++ : T.push({ key: b, count: 1 });
    }
    return T;
  }
  return M.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: M.map((m) => {
    const T = m.events.length, w = T > 1, b = m.isMultiStation, h = _(m), A = k(m.startEpochMs, o), E = m.pct < 10 ? "edge-left" : m.pct > 90 ? "edge-right" : "", N = {};
    return m.events.forEach((P) => {
      const W = P.stationName || e || "Workstation";
      N[W] || (N[W] = []), N[W].push(P);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${w ? "is-cluster" : "is-single"} ${b ? "is-multi-station" : ""}`,
        style: { left: `${m.pct}%` },
        onClick: (P) => {
          P.stopPropagation(), d && d(m.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${h} at ${A}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            w && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: b ? `${m.stationCount}S` : T > 9 ? "9+" : T })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${E}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: b ? `MULTICAM KEYSTROKES (${m.stationCount} WORKSTATIONS • ${T} EVT)` : w ? `KEYSTROKE BURST (${T})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: A })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(N).map(([P, W]) => {
              const L = g(W);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: P }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    W.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  L.slice(0, 6).map((B, re) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    B.key,
                    B.count > 1 ? ` ×${B.count}` : ""
                  ] }, re)),
                  L.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    L.length - 6,
                    " more"
                  ] })
                ] })
              ] }, P);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      m.id
    );
  }) }) : null;
}
const ex = u.memo(qg), Bi = [
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
], tx = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function nx({
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
  movieBoundaries: f = null,
  stationHostname: p = "",
  activeStationName: y = "",
  showKeystrokes: S = !0,
  keystrokes: M = []
}) {
  const _ = u.useRef(null), [k, g] = u.useState(1e3);
  u.useEffect(() => {
    if (!_.current) return;
    const R = new ResizeObserver((oe) => {
      for (let te of oe)
        te.contentRect.width > 50 && g(te.contentRect.width);
    });
    return R.observe(_.current), () => R.disconnect();
  }, []);
  const m = u.useCallback((R) => !r || r <= 0 ? "0%" : `${(R - n) / r * 100}%`, [r, n]), T = u.useCallback((R) => {
    const te = (R - n) / r * 100;
    return te >= -5 && te <= 105;
  }, [n, r]), w = (R) => {
    if (!_.current) return;
    const oe = _.current.getBoundingClientRect(), te = Math.max(0, Math.min(R.clientX - oe.left, oe.width)), Z = Math.round(n + te / oe.width * r);
    a && a(Z);
  }, b = () => {
    a && a(null);
  }, h = (R) => {
    if (!_.current || !i) return;
    const oe = _.current.getBoundingClientRect(), te = Math.max(0, Math.min(R.clientX - oe.left, oe.width)), Z = Math.round(n + te / oe.width * r);
    i(Math.max(0, Math.min(l, Z)));
  }, A = u.useMemo(() => {
    const R = Math.max(3, Math.floor(k / 95)), oe = r / R;
    for (let te of Bi)
      if (te >= oe) return te;
    return Bi[Bi.length - 1];
  }, [r, k]), E = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const R = e + n, oe = R + r, te = t === "LOCAL" ? Ws(R).offsetMin * 60 * 1e3 : 0, Z = R + te, Y = Math.ceil(Z / A) * A, Le = [];
    for (let Be = Y; Be <= oe + te; Be += A) {
      const je = Be - te, et = (je - R) / r * 100;
      et >= 0 && et <= 100 && Le.push({
        epoch: je,
        pct: et,
        label: jt(je, t, {
          includeSeconds: A < 6e4
        })
      });
    }
    return Le;
  }, [e, n, r, A, t]), N = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const R = e + n, oe = R + r;
    return bp(R, oe).map((te) => ({
      ...te,
      pct: (te.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), P = u.useMemo(() => {
    if (!r || !e) return [];
    const R = e + n, oe = R + r, te = t === "UTC", Z = [], Y = te ? 0 : Ws(R).offsetMin * 60 * 1e3, Le = R + Y, Be = oe + Y, je = new Date(Le);
    for (je.setUTCHours(0, 0, 0, 0), je.getTime() < Le && je.setUTCDate(je.getUTCDate() + 1); je.getTime() <= Be; ) {
      const be = je.getTime() - Y, Ie = (be - R) / r * 100, tt = String(je.getUTCDate()).padStart(2, "0"), at = tx[je.getUTCMonth()], ie = `${tt} ${at}`;
      Z.push({ epoch: be, pct: Ie, dateLabel: ie }), je.setUTCDate(je.getUTCDate() + 1);
    }
    return Z;
  }, [e, n, r, t]), {
    globalFirstMs: W = v,
    globalLastMs: L = null,
    currentFirstMs: B = null,
    currentLastMs: re = null
  } = f || { globalFirstMs: v }, ne = W !== null && B !== null && Math.abs(W - B) < 1e3, H = L !== null && re !== null && Math.abs(L - re) < 1e3, I = u.useMemo(() => {
    const R = [];
    return ne ? T(W) && R.push({
      id: "first-combined",
      ms: W,
      pct: m(W),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${jt(e + W, t)} (Click to jump)`
    }) : (T(W) && R.push({
      id: "first-global",
      ms: W,
      pct: m(W),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${jt(e + W, t)} (Click to jump)`
    }), T(B) && R.push({
      id: "first-current",
      ms: B,
      pct: m(B),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${jt(e + B, t)} (Click to jump)`
    })), H ? T(L) && R.push({
      id: "last-combined",
      ms: L,
      pct: m(L),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${jt(e + L, t)} (Click to jump)`
    }) : (T(re) && R.push({
      id: "last-current",
      ms: re,
      pct: m(re),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${jt(e + re, t)} (Click to jump)`
    }), T(L) && R.push({
      id: "last-global",
      ms: L,
      pct: m(L),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${jt(e + L, t)} (Click to jump)`
    })), R;
  }, [
    W,
    L,
    B,
    re,
    ne,
    H,
    e,
    t,
    y,
    T,
    m
  ]), U = u.useMemo(() => {
    const R = [];
    return typeof c == "number" && T(c) && R.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: m(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${jt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && T(d) && R.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: m(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${jt(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), R;
  }, [c, d, e, t, T, m]), O = o !== null ? m(o) : null, K = O !== null && O >= 0 && O <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: _,
      className: "timeline-ruler-root",
      onMouseMove: w,
      onMouseLeave: b,
      onClick: h,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          E.map((R) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${R.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: R.label })
          ] }, R.epoch)),
          S && /* @__PURE__ */ s.jsx(
            ex,
            {
              stationHostname: p,
              activeStationName: y,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: k,
              onSeek: i,
              keystrokes: M
            }
          ),
          N.map((R) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${R.pct}%` },
              title: `${R.description} (${R.labelBefore} ➔ ${R.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: R.description })
                ] })
              ]
            },
            R.switchEpochMs
          )),
          P.map((R) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${R.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: R.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            R.epoch
          )),
          I.map((R) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: R.className,
              style: { left: `${R.pct}` },
              onClick: (oe) => {
                oe.stopPropagation(), i && i(R.ms);
              },
              title: R.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: R.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            R.id
          )),
          U.map((R) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${R.type}-cut-tick`,
              style: { left: `${R.pct}` },
              onClick: (oe) => {
                oe.stopPropagation(), i && i(R.ms);
              },
              title: R.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: R.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: R.shortLabel })
                ] })
              ]
            },
            R.id
          ))
        ] }),
        K && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${O}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: jt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Kn = (e) => String(e).padStart(2, "0");
function sx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [i, c] = u.useState(!1), [d, v] = u.useState(!1), [f, p] = u.useState(""), [y, S] = u.useState(""), M = u.useCallback((E) => {
    if (!E || isNaN(E) || E <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const L = new Date(E);
      return {
        timeStr: `${Kn(L.getUTCHours())}:${Kn(L.getUTCMinutes())}:${Kn(L.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: N, label: P } = Ws(E), W = new Date(E + N * 60 * 1e3);
    return {
      timeStr: `${Kn(W.getUTCHours())}:${Kn(W.getUTCMinutes())}:${Kn(W.getUTCSeconds())}`,
      zoneLabel: P
    };
  }, [t]), _ = u.useCallback((E) => {
    if (!E || E < 0) return "00:00:00";
    const N = Math.floor(E / 1e3), P = Math.floor(N / 3600), W = Math.floor(N % 3600 / 60), L = N % 60;
    return `${Kn(P)}:${Kn(W)}:${Kn(L)}`;
  }, []), k = u.useMemo(() => M(e + r), [M, e, r]), g = u.useMemo(() => M(e + o), [M, e, o]), m = u.useMemo(() => _(Math.max(0, o - r)), [_, r, o]), T = u.useCallback((E, N) => {
    if (!E || !E.trim()) return N;
    const W = E.trim().split(" ")[0].split(":").map(Number);
    if (W.length < 2 || W.some(isNaN)) return N;
    const [L, B, re = 0] = W;
    if (t === "UTC") {
      const Y = new Date(e);
      Y.setUTCHours(L, B, re, 0);
      let Le = Y.getTime();
      for (; Le < e; ) Le += 864e5;
      for (; Le > e + n + 1e3; ) Le -= 864e5;
      const Be = Le - e;
      return isNaN(Be) ? N : Math.max(0, Math.min(n, Be));
    }
    const { offsetMin: ne } = Ws(e), H = new Date(e + ne * 6e4), I = H.getUTCFullYear(), U = H.getUTCMonth(), O = H.getUTCDate(), K = `${I}-${Kn(U + 1)}-${Kn(O)}`, R = `${Kn(L)}:${Kn(B)}:${Kn(re)}`, oe = Wa(K, R);
    let te;
    if (oe.isAmbiguous) {
      const Y = e + N, Le = Math.abs(oe.firstOccurrenceEpoch - Y), Be = Math.abs(oe.secondOccurrenceEpoch - Y);
      te = Le <= Be ? oe.firstOccurrenceEpoch : oe.secondOccurrenceEpoch;
    } else {
      const Y = Date.UTC(I, U, O, L, B, re), { offsetMin: Le } = Ws(Y - ne * 6e4);
      te = Y - Le * 6e4;
    }
    for (; te < e; ) te += 864e5;
    for (; te > e + n + 1e3; ) te -= 864e5;
    const Z = te - e;
    return isNaN(Z) ? N : Math.max(0, Math.min(n, Z));
  }, [e, t, n]), w = () => {
    p(k.timeStr), c(!0);
  }, b = () => {
    if (c(!1), !f || !f.trim() || f.trim() === k.timeStr)
      return;
    const E = T(f.trim(), r);
    E !== null && !isNaN(E) && E < o && l(E);
  }, h = () => {
    S(g.timeStr), v(!0);
  }, A = () => {
    if (v(!1), !y || !y.trim() || y.trim() === g.timeStr)
      return;
    const E = T(y.trim(), o);
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
          value: f,
          autoFocus: !0,
          onChange: (E) => p(E.target.value),
          onBlur: b,
          onKeyDown: (E) => {
            E.key === "Enter" && b(), E.key === "Escape" && c(!1);
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
          value: y,
          autoFocus: !0,
          onChange: (E) => S(E.target.value),
          onBlur: A,
          onKeyDown: (E) => {
            E.key === "Enter" && A(), E.key === "Escape" && v(!1);
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: m })
    ] })
  ] });
}
function rx({
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
  const f = Math.max(0, Math.min(100, i / r * 100)), p = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, p - f), S = Math.max(0, Math.min(100, l / r * 100)), M = Math.max(0, Math.min(100 - S, o / r * 100)), _ = S + M, k = a > 1.05, g = 7, m = y >= 10, T = y >= 16, w = m, b = T, h = w && Math.abs(S - f) < g, A = k && M >= 12 && !h, E = b && Math.abs(_ - p) < g, N = k && M >= 12 && !E;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (P) => v && v("minimap-viewport", P),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${f}%`, width: `${y}%` },
            children: [
              w && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: jt(t + i, n) }),
              b && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: jt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${S}%`, width: `${M}%` },
            children: [
              A && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: jt(t + l, n) }),
              N && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: jt(t + l + o, n) })
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
function lx({
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
  showRulerKeystrokes: f = !1,
  onToggleRulerKeystrokes: p
}) {
  const y = (d || "NONE").toUpperCase().replace("-", "_"), S = () => {
    v && v(y === "NONE" || y === "OFF" ? "BURN_IN" : y === "BURN_IN" ? "CAPTION" : "NONE");
  }, M = () => {
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
        onClick: S,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in / Soft Caption)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: M() })
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
        title: `Jump playhead to first media (${jt(i + e, c)})`,
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
        title: `Jump playhead to last media (${jt(i + t, c)})`,
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
const As = /* @__PURE__ */ new Map(), qr = /* @__PURE__ */ new Map();
let _s = [], kl = 0;
const rh = 3, ox = 8e3, ax = 80;
function Dp() {
  setTimeout(ix, 0);
}
function ix() {
  var e;
  if (!(kl >= rh || _s.length === 0))
    for (_s = _s.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); kl < rh && _s.length > 0; ) {
      const t = _s.pop();
      !t || (e = t.signal) != null && e.aborted || (kl++, cx(t));
    }
}
async function cx(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: i, displayId: c } = e;
  let d = !1, v = null;
  const f = () => {
    d || (d = !0, v && clearTimeout(v), kl = Math.max(0, kl - 1), qr.delete(t), Dp());
  };
  v = setTimeout(() => {
    f(), i(null);
  }, ox);
  try {
    const p = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(p, { signal: a });
    if (y.ok && y.status !== 204) {
      const S = await y.blob();
      if (S && S.size > 1500) {
        const M = URL.createObjectURL(S);
        if (As.size >= ax) {
          const _ = As.keys().next().value, k = As.get(_);
          k && URL.revokeObjectURL(k), As.delete(_);
        }
        As.set(t, M), i(M);
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
const lh = {
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
    if (qr.has(a))
      return qr.get(a);
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
        _s = _s.filter((v) => v.key !== a), qr.delete(a), c(null);
      }, { once: !0 }), _s.push(d), Dp();
    });
    return qr.set(a, i), i;
  },
  clear() {
    As.forEach((e) => URL.revokeObjectURL(e)), As.clear(), qr.clear(), _s = [], kl = 0;
  }
}, ux = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, ts = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Or = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Wc({
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
  isAutoDirectorEnabled: f = !1,
  showDirectorCoverage: p = !1,
  stepperSegments: y = null,
  isCanvasSummary: S = !1
}) {
  const [M, _] = u.useState({}), k = u.useRef(M);
  k.current = M;
  const g = u.useMemo(() => ux(l), [l]), m = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: N, framesPerTile: P } = g, W = [], L = o + r, B = L + l, re = L - N, ne = B + N, H = [...n].sort((R, oe) => ts(R) - ts(oe)), I = S ? c || [] : [...c || [], ...d || []], U = (R, oe) => !I || I.length === 0 ? !1 : I.some((te) => {
      const Z = te.startEpochMs ?? te.startEpoch ?? te.start ?? 0, Y = te.endEpochMs ?? te.endEpoch ?? te.end ?? 0;
      return Y <= Z ? !1 : Math.max(R, Z) < Math.min(oe, Y);
    }), O = o + a, K = o + i;
    if (H.forEach((R, oe) => {
      const te = Math.round(ts(R)), Z = Math.round(Or(R));
      if (Z <= te) return;
      const Y = Math.max(te, O), Le = Math.min(Z, K);
      if (Le <= Y) return;
      const Be = Math.max(Y, re), je = Math.min(Le, ne);
      if (je <= Be) return;
      const et = Math.floor(Be / N) * N;
      for (let be = et; be < je; be += N) {
        const Ie = be + N, tt = Math.max(Y, be), at = Math.min(Le, Ie);
        at > tt && !U(tt, at) && W.push({
          key: `${e}_${t}_${tt}_${at}_${P}`,
          sIdx: oe,
          startEpoch: tt,
          endEpoch: at,
          framesPerTile: P,
          displayId: t
        });
      }
    }), W.length > 20) {
      const R = o + r + l / 2;
      W.sort((oe, te) => {
        const Z = Math.abs((oe.startEpoch + oe.endEpoch) / 2 - R), Y = Math.abs((te.startEpoch + te.endEpoch) / 2 - R);
        return Z - Y;
      }), W.length = 20, W.sort((oe, te) => oe.startEpoch - te.startEpoch);
    }
    return W;
  }, [n, o, e, t, r, l, g, a, i, d, c]);
  u.useEffect(() => {
    if (m.length === 0) return;
    let N = !0;
    const P = new AbortController(), W = [], L = {};
    let B = !1;
    m.forEach((O) => {
      const K = lh.get(e, O.startEpoch, O.endEpoch, O.framesPerTile, t);
      K ? k.current[O.key] !== K && (L[O.key] = K, B = !0) : W.push(O);
    });
    const re = new Set(m.map((O) => O.key)), ne = k.current, H = {};
    let I = !1;
    if (Object.keys(ne).forEach((O) => {
      re.has(O) ? H[O] = ne[O] : I = !0;
    }), B || I) {
      const O = { ...H, ...L };
      k.current = O, _(O);
    }
    if (W.length === 0) return () => {
      N = !1;
    };
    const U = setTimeout(() => {
      W.forEach((O) => {
        lh.fetchTile(e, O.startEpoch, O.endEpoch, O.framesPerTile, P.signal, t).then((K) => {
          N && K && (k.current[O.key] = K, _((R) => ({ ...R, [O.key]: K })));
        });
      });
    }, 150);
    return () => {
      N = !1, clearTimeout(U), P.abort();
    };
  }, [m, e, t]);
  const T = (a - r) / l * 100, w = (i - r) / l * 100, b = u.useMemo(() => {
    if (m.length === 0 || !o || l <= 0) return [];
    const N = r, P = r + l;
    return m.map((W) => {
      const L = W.startEpoch - o, B = W.endEpoch - o;
      if (B <= N || L >= P) return null;
      const re = Math.max(N, L), ne = Math.min(P, B);
      return {
        key: W.key,
        spriteUrl: M[W.key] || null,
        leftPct: (re - N) / l * 100,
        widthPct: (ne - re) / l * 100
      };
    }).filter(Boolean);
  }, [m, o, r, l, M]), h = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const N = r, P = r + l;
    return n.map((W, L) => {
      const B = Math.round(ts(W)) - o, re = Math.round(Or(W)) - o;
      if (re <= N || B >= P) return null;
      const ne = Math.max(N, B), H = Math.min(P, re);
      return {
        id: L,
        leftPct: (ne - N) / l * 100,
        widthPct: (H - ne) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), A = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const N = [...n].sort((U, O) => ts(U) - ts(O)), P = [], W = r, L = r + l, B = o + W, re = o + L, ne = o + (a !== void 0 ? a : W), H = o + (i !== void 0 ? i : L);
    if (N.length > 0) {
      const U = ts(N[0]);
      U > B && P.push({ startEpoch: B, endEpoch: U });
    } else l > 0 && P.push({ startEpoch: B, endEpoch: re });
    for (let U = 0; U < N.length - 1; U++) {
      const O = Or(N[U]), K = ts(N[U + 1]);
      K - O > 1e3 && P.push({ startEpoch: O, endEpoch: K });
    }
    if (N.length > 0) {
      const U = Or(N[N.length - 1]);
      U < re && P.push({ startEpoch: U, endEpoch: re });
    }
    const I = [];
    return c && c.length > 0 && c.forEach((U, O) => {
      const K = Math.max(U.startEpochMs ?? U.StartEpochMs, ne), R = Math.min(U.endEpochMs ?? U.EndEpochMs, H);
      if (R > K && R > B && K < re) {
        const oe = Math.max(B, K), te = Math.min(re, R), Z = (te - o - (oe - o)) / l * 100;
        Z > 0 && I.push({
          id: `global-${O}`,
          type: "global",
          startEpoch: oe,
          endEpoch: te,
          leftPct: (oe - o - W) / l * 100,
          widthPct: Z,
          durationSec: Math.round((R - K) / 1e3)
        });
      }
    }), S || P.forEach((U, O) => {
      let K = [U];
      c && c.length > 0 && c.forEach((R) => {
        const oe = Math.max(R.startEpochMs ?? R.StartEpochMs, ne), te = Math.min(R.endEpochMs ?? R.EndEpochMs, H);
        if (te <= oe) return;
        const Z = [];
        K.forEach((Y) => {
          te <= Y.startEpoch || oe >= Y.endEpoch ? Z.push(Y) : (oe > Y.startEpoch && Z.push({ startEpoch: Y.startEpoch, endEpoch: oe }), te < Y.endEpoch && Z.push({ startEpoch: te, endEpoch: Y.endEpoch }));
        }), K = Z;
      }), K.forEach((R, oe) => {
        if (R.endEpoch - R.startEpoch < 1e3 || R.endEpoch <= B || R.startEpoch >= re) return;
        const te = Math.max(B, R.startEpoch), Z = Math.min(re, R.endEpoch), Y = (Z - o - (te - o)) / l * 100;
        Y > 0 && I.push({
          id: `station-${O}-${oe}`,
          type: "station",
          startEpoch: te,
          endEpoch: Z,
          leftPct: (te - o - W) / l * 100,
          widthPct: Y,
          durationSec: Math.round((R.endEpoch - R.startEpoch) / 1e3)
        });
      });
    }), I;
  }, [n, c, o, r, l, a, i, S]), E = u.useMemo(() => {
    if (!p || !f || !v || v.length === 0) return [];
    const N = (t || "mon-0").toLowerCase(), P = r, W = r + l;
    return v.map((L, B) => {
      const re = (L.startEpochMs ?? L.StartEpochMs ?? 0) - o, ne = (L.endEpochMs ?? L.EndEpochMs ?? 0) - o;
      if (ne <= P || re >= W) return null;
      const H = Math.max(P, re), I = Math.min(W, ne), U = (H - P) / l * 100, O = (I - H) / l * 100;
      if (O <= 0) return null;
      const R = (L.targetDisplayId || L.TargetDisplayId || "mon-0").toLowerCase() === N;
      return {
        id: `cov_${B}`,
        isFeatured: R,
        leftPct: U,
        widthPct: O
      };
    }).filter(Boolean);
  }, [p, f, v, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: A.map((N) => /* @__PURE__ */ s.jsxs(
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
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: b.map((N) => /* @__PURE__ */ s.jsx(
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
    y && y.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: f ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      y.map((N, P) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${N.dispNum}`,
          style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
          title: `Auto-Director: Screen ${N.dispNum} (${N.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: N.dispNum })
        },
        `stp_${P}`
      )),
      A && A.map((N) => /* @__PURE__ */ s.jsx(
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
    T > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, T)}%` } }),
    w < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, w)}%`, right: 0 } })
  ] });
}
function dx({
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
  onDeselectStation: f,
  viewportStartMs: p = 0,
  viewportDurationMs: y = 36e5,
  inPointMs: S = 0,
  outPointMs: M = 36e5,
  baseEpochMs: _ = 0,
  segments: k = [],
  recordingSegments: g = {},
  globalGaps: m = []
}) {
  const T = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", w = (e == null ? void 0 : e.id) || T, b = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", h = (e == null ? void 0 : e.hostname) || "", A = u.useMemo(() => {
    var O, K, R;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((O = e == null ? void 0 : e.displayTopology) == null ? void 0 : O.displays) || ((K = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : K.Displays) || ((R = e == null ? void 0 : e.topology) == null ? void 0 : R.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), E = u.useMemo(() => {
    var K, R;
    const O = A.find((oe) => oe.isPrimary || oe.IsPrimary);
    return ((O == null ? void 0 : O.displayId) || (O == null ? void 0 : O.DisplayId) || ((K = A[0]) == null ? void 0 : K.displayId) || ((R = A[0]) == null ? void 0 : R.DisplayId) || "mon-0").toLowerCase();
  }, [A]), N = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), P = u.useMemo(() => (N == null ? void 0 : N.segments) || (N == null ? void 0 : N.Segments) || [], [N]), W = P && P.length > 0, L = !!(A && A.length > 1), B = !!(t && L), re = u.useMemo(() => {
    let O = g[w] || g[T] || k || [];
    if (!O || O.length === 0) {
      const K = (w || "").toLowerCase(), R = (T || "").toLowerCase();
      for (const [oe, te] of Object.entries(g || {})) {
        const Z = oe.toLowerCase();
        if (K && Z === K || R && Z === R) {
          O = te;
          break;
        }
      }
    }
    if ((!O || O.length === 0) && (O = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !O || O.length === 0)
      for (const K of A) {
        const R = K.segments || K.Segments || [];
        if (R.length > 0) {
          O = R;
          break;
        }
      }
    return (O || []).filter((K) => Or(K) - ts(K) > 0);
  }, [g, k, w, T, e, A]), ne = u.useMemo(() => {
    if (!_ || y <= 0) return [];
    const O = [...re].sort((Z, Y) => ts(Z) - ts(Y)), K = [], R = _ + y;
    if (m && m.length > 0 && m.forEach((Z) => {
      const Y = Z.startEpochMs ?? Z.StartEpochMs ?? 0, Le = Z.endEpochMs ?? Z.EndEpochMs ?? 0;
      Le > Y && K.push({ startEpoch: Y, endEpoch: Le, type: "global" });
    }), O.length === 0)
      return K.push({ startEpoch: _, endEpoch: R, type: "station" }), K;
    const oe = Math.round(ts(O[0]));
    oe - _ > 2e3 && (K.some((Y) => Y.type === "global" && Y.startEpoch <= _ && Y.endEpoch >= oe) || K.push({ startEpoch: _, endEpoch: oe, type: "station" }));
    for (let Z = 0; Z < O.length - 1; Z++) {
      const Y = Math.round(Or(O[Z])), Le = Math.round(ts(O[Z + 1]));
      Le - Y > 2e3 && (K.some((je) => je.type === "global" && je.startEpoch <= Y && je.endEpoch >= Le) || K.push({ startEpoch: Y, endEpoch: Le, type: "station" }));
    }
    const te = Math.round(Or(O[O.length - 1]));
    return R - te > 2e3 && (K.some((Y) => Y.type === "global" && Y.startEpoch <= te && Y.endEpoch >= R) || K.push({ startEpoch: te, endEpoch: R, type: "station" })), K;
  }, [re, m, _, y]), H = u.useMemo(() => {
    const O = _ + S, K = _ + M;
    return Vg(P, ne, m, O, K, E);
  }, [P, ne, m, _, S, M, E]), I = u.useMemo(() => {
    if (!W || y <= 0) return null;
    const O = p, K = p + y;
    return H.map((R, oe) => {
      const te = (R.startEpochMs ?? R.StartEpochMs ?? 0) - _, Z = (R.endEpochMs ?? R.EndEpochMs ?? 0) - _;
      if (Z <= O || te >= K) return null;
      const Y = Math.max(O, te), Le = Math.min(K, Z), Be = (Y - O) / y * 100, je = (Le - Y) / y * 100;
      if (je <= 0) return null;
      const et = (R.targetDisplayId || R.TargetDisplayId || "mon-0").toLowerCase(), be = A.findIndex((at) => (at.displayId || at.DisplayId || "").toLowerCase() === et);
      let Ie = be >= 0 ? be + 1 : null;
      if (!Ie) {
        const at = et.match(/\d+/);
        Ie = at ? parseInt(at[0], 10) + 1 : 1;
      }
      const tt = be >= 0 ? A[be].displayName || A[be].DisplayName || `Screen ${Ie}` : `Screen ${Ie}`;
      return {
        id: oe,
        dispNum: Ie,
        dispLabel: tt,
        leftPct: Be,
        widthPct: je
      };
    }).filter(Boolean);
  }, [W, H, A, _, p, y]), U = u.useCallback((O) => {
    const K = (O || "mon-0").toLowerCase();
    return o.some((R) => {
      if (R.stationId !== w) return !1;
      const oe = (R.displayId || "mon-0").toLowerCase();
      return oe === K || oe === "auto" && (K === "mon-0" || K === "screen-0");
    });
  }, [o, w]);
  return B ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (O) => {
              O.stopPropagation(), n == null || n();
            },
            title: "Collapse station tracks",
            children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "6 9 12 15 18 9" }) })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: b, children: b }),
        L && l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
            onClick: (O) => {
              O.stopPropagation(), l(e.id);
            },
            title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
            children: r ? "⚡ AUTO" : "✋ OFF"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-timeline", children: [
        L && l && /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-station-auto-director ${r ? "is-active" : "is-inactive"}`,
            onClick: (O) => {
              O.stopPropagation(), l(e.id);
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
            onClick: (O) => {
              O.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: A.map((O, K) => {
      const R = (O.displayId || O.DisplayId || `mon-${K}`).toLowerCase(), oe = O.displayNumber || O.DisplayNumber || K + 1, te = O.displayName || O.DisplayName || "", Z = te && !te.toLowerCase().includes(T.toLowerCase()) ? te : `Screen ${oe}${O.isPrimary || K === 0 ? " (Main)" : ""}`, Y = U(R);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${Z} (${O.width || 1920}×${O.height || 1080})`, children: Z }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${Y ? "is-on-canvas" : ""}`,
                  onClick: (Le) => {
                    Le.stopPropagation(), a(e.id, R);
                  },
                  title: Y ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: Y ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Wc,
              {
                hostname: T,
                displayId: R,
                activeSegments: O.segments && O.segments.length > 0 ? O.segments : re,
                viewportStartMs: p,
                viewportDurationMs: y,
                baseEpochMs: _,
                inPointMs: S,
                outPointMs: M,
                globalGaps: m,
                directorSegments: H,
                isAutoDirectorEnabled: r,
                gaps: ne,
                showDirectorCoverage: L
              }
            )
          ]
        },
        `${e.id}-${R}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), L && n && n();
      },
      onContextMenu: (O) => {
        v && (O.preventDefault(), O.stopPropagation(), v(O, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${L ? "has-stepper" : "no-stepper"}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${b}${h ? ` (${h})` : ""} • Click to select${L ? " / expand" : ""}`,
            children: [
              L && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (O) => {
                    O.stopPropagation(), n == null || n();
                  },
                  title: "Expand station tracks",
                  children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: b, children: b }),
              L && l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (O) => {
                    O.stopPropagation(), l(e.id);
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
                  title: `Remove ${b} from project`,
                  onClick: (O) => {
                    O.stopPropagation(), f(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Wc,
          {
            hostname: T,
            displayId: E,
            activeSegments: re,
            viewportStartMs: p,
            viewportDurationMs: y,
            baseEpochMs: _,
            inPointMs: S,
            outPointMs: M,
            globalGaps: m,
            isAutoDirectorEnabled: r,
            gaps: ne,
            stepperSegments: L ? I : null
          }
        )
      ]
    }
  );
}
const Zr = /* @__PURE__ */ new Map(), Kl = /* @__PURE__ */ new Map();
function oh(e, t, n, r = 250) {
  return `${(e || "").replace(/^live\//i, "").toLowerCase().trim()}_${Math.round(t)}_${Math.round(n)}_${r}`;
}
const _r = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 250) {
    const l = oh(e, t, n, r);
    return Zr.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 250) {
    if (!e || n <= t) return null;
    const o = (e || "").replace(/^live\//i, "").trim(), a = oh(e, t, n, l);
    if (Zr.has(a))
      return Zr.get(a);
    if (Kl.has(a))
      return Kl.get(a);
    const i = (async () => {
      try {
        const c = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(o)}&startEpoch=${Math.round(t)}&endEpoch=${Math.round(n)}&points=${l}`, d = await fetch(c, { signal: r });
        if (!d.ok) {
          if (d.status === 204) return null;
          throw new Error(`HTTP ${d.status}`);
        }
        const v = await d.json();
        if (Array.isArray(v) && v.length > 0)
          return Zr.set(a, v), v;
      } catch (c) {
        if (c.name !== "AbortError") {
          const d = new Array(l).fill(0.02);
          return Zr.set(a, d), d;
        }
      } finally {
        Kl.delete(a);
      }
      return null;
    })();
    return Kl.set(a, i), i;
  },
  /**
   * Clears cached waveforms (e.g. on project change)
   */
  clear() {
    Zr.clear(), Kl.clear();
  }
}, ea = {
  sys: "#8B5CF6",
  // Tactical Violet (System Audio / PC Output)
  mic: "#F59E0B"
};
function Ha(e, t = 100, n = 24, r = 1, l = {}) {
  const o = l.yCenter !== void 0 ? l.yCenter : n / 2, a = l.maxHalfHeight !== void 0 ? l.maxHalfHeight : n / 2 - 1.5;
  if (!e || !Array.isArray(e) || e.length === 0)
    return `M 0,${o} L ${t},${o}`;
  const i = e.length, c = t / Math.max(1, i - 1), d = Math.max(0, Math.min(3, Number(r) || 1));
  let v = "";
  for (let p = 0; p < i; p++) {
    const y = p * c, S = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), M = o - S * a;
    v += p === 0 ? `M ${y.toFixed(2)},${M.toFixed(2)}` : ` L ${y.toFixed(2)},${M.toFixed(2)}`;
  }
  let f = "";
  for (let p = i - 1; p >= 0; p--) {
    const y = p * c, S = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), M = o + S * a;
    f += ` L ${y.toFixed(2)},${M.toFixed(2)}`;
  }
  return `${v}${f} Z`;
}
function hx(e, t = 100, n = 24, r = 1) {
  let l = null, o = null;
  e && typeof e == "object" && !Array.isArray(e) && e.sys && e.mic ? (l = e.sys, o = e.mic) : Array.isArray(e) && (l = e.map((c, d) => Math.min(1, Math.max(0.02, c * (1 + 0.12 * Math.sin(d * 0.45))))), o = e.map((c, d) => Math.min(1, Math.max(0.02, c * (0.92 + 0.15 * Math.cos(d * 0.38))))));
  const a = Ha(l, t, n, r, {
    yCenter: n * 0.25,
    maxHalfHeight: n * 0.25 - 1.2
  }), i = Ha(o, t, n, r, {
    yCenter: n * 0.75,
    maxHalfHeight: n * 0.25 - 1.2
  });
  return { sysPath: a, micPath: i };
}
const ta = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function Pp({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: l = "#06B6D4" }) {
  const o = t === "both", a = t === "sys", i = t === "mic", c = u.useMemo(() => !o || !e ? null : hx(e, 100, 24, n), [o, e, n]), d = u.useMemo(() => o || !e ? null : Ha(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [o, e, n]);
  if (r)
    return /* @__PURE__ */ s.jsxs("div", { className: "waveform-loading-shimmer", title: "Decoding Station Audio Waveform...", children: [
      /* @__PURE__ */ s.jsx("div", { className: "shimmer-scanner" }),
      /* @__PURE__ */ s.jsx("span", { className: "shimmer-text", children: "DECODING AUDIO..." })
    ] });
  if (o) {
    const f = ea.sys, p = ea.mic;
    return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg waveform-svg-dual", children: [
      /* @__PURE__ */ s.jsx(
        "path",
        {
          d: (c == null ? void 0 : c.sysPath) || "M 0,6 L 100,6",
          fill: f,
          fillOpacity: "0.45",
          stroke: f,
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
          fill: p,
          fillOpacity: "0.45",
          stroke: p,
          strokeWidth: "1.1",
          strokeOpacity: "0.9",
          className: "waveform-mic-path"
        }
      )
    ] });
  }
  const v = a ? ea.sys : i ? ea.mic : l || "#06B6D4";
  return /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
    "path",
    {
      d: d || Ha(e, 100, 24, n),
      fill: v,
      fillOpacity: "0.45",
      stroke: v,
      strokeWidth: "1.2",
      strokeOpacity: "0.85"
    }
  ) });
}
function fx({
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
  timeMode: f,
  stationName: p
}) {
  const [y, S] = u.useState(() => _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [M, _] = u.useState(!1);
  u.useEffect(() => {
    let B = !0;
    const re = new AbortController(), ne = _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (ne) {
      S(ne), _(!1);
      return;
    }
    return S(null), _(!0), _r.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, re.signal, 250).then((H) => {
      B && (H && S(H), _(!1));
    }).catch(() => {
      B && _(!1);
    }), () => {
      B = !1, re.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const k = e.startEpochMs, g = e.endEpochMs, m = Math.max(1, g - k), T = (e.gain || 1) * (t.gain || 1), w = Math.max(d, k), b = Math.min(d + v, g), h = (w - d) / v * 100, A = (b - w) / v * 100;
  if (A <= 0) return null;
  const E = e.channelMode || t.channelMode || "both", N = e.fadeInMs ?? 50, P = e.fadeOutMs ?? 50, W = Math.min(45, N / m * 100), L = Math.min(45, P / m * 100);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-clip-block ${t.isMuted ? "lane-muted" : ""} ${r ? "is-selected" : ""}`,
      style: {
        left: `${h}%`,
        width: `${A}%`,
        borderLeftColor: n
      },
      onClick: l,
      onMouseDown: (B) => {
        !B.target.closest(".trim-handle") && !B.target.closest(".btn-menu-close") && !B.target.closest(".clip-channel-tag") && (i == null || i(B));
      },
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${p} [${E.toUpperCase()}] (${jt(k, f, { includeSeconds: !0 })} - ${jt(g, f, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${N}ms / OUT ${P}ms
Drag body: Move in time • Drag edges: Trim • Click tag: Toggle channel • Double-click: Edit`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (B) => a(B, "start"),
            title: "Drag to trim Clip In-Point"
          }
        ),
        N > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-in-ramp",
            style: { width: `${W}%` },
            title: `Fade In: ${N}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 0,100", fill: "rgba(6, 182, 212, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "100", x2: "100", y2: "0", stroke: "#38BDF8", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Pp,
          {
            peaks: y,
            channelMode: E,
            effectiveGain: T,
            isLoadingWaveform: M,
            laneColor: n
          }
        ) }),
        P > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${L}%` },
            title: `Fade Out: ${P}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 100,100", fill: "rgba(244, 63, 94, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "0", x2: "100", y2: "100", stroke: "#F43F5E", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: p }),
          /* @__PURE__ */ s.jsx(
            "span",
            {
              className: `clip-channel-tag mode-${E}`,
              onClick: (B) => {
                B.stopPropagation(), c == null || c();
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
            onMouseDown: (B) => a(B, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function px({
  clip: e,
  vpStartEpoch: t,
  viewportDurationMs: n,
  timeMode: r,
  stationName: l,
  onExpand: o
}) {
  const [a, i] = u.useState(() => _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200) || null), [c, d] = u.useState(!1);
  u.useEffect(() => {
    let k = !0;
    const g = new AbortController(), m = _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200);
    if (m) {
      i(m), d(!1);
      return;
    }
    return i(null), d(!0), _r.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, g.signal, 200).then((T) => {
      k && (T && i(T), d(!1));
    }).catch(() => {
      k && d(!1);
    }), () => {
      k = !1, g.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const v = e.startEpochMs, f = e.endEpochMs, p = Math.max(t, v), y = Math.min(t + n, f), S = (p - t) / n * 100, M = (y - p) / n * 100;
  if (M <= 0) return null;
  const _ = e.effectiveChannelMode || "both";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `collapsed-master-clip mode-${_}`,
      style: {
        left: `${S}%`,
        width: `${M}%`,
        borderLeftColor: e.laneColor
      },
      onDoubleClick: o,
      title: `Master Audio Bus Stream: ${l} [${_.toUpperCase()}] (${jt(v, r, { includeSeconds: !0 })} - ${jt(f, r, { includeSeconds: !0 })})
Gain: ${Math.round(e.effectiveGain * 100)}%
Double-click to expand multitrack audio lanes`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Pp,
          {
            peaks: a,
            channelMode: _,
            effectiveGain: e.effectiveGain,
            isLoadingWaveform: c,
            laneColor: e.laneColor
          }
        ) }),
        /* @__PURE__ */ s.jsxs("div", { className: "collapsed-clip-info", children: [
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-clip-station", children: l }),
          /* @__PURE__ */ s.jsx("span", { className: `clip-channel-tag mode-${_}`, children: _.toUpperCase() }),
          /* @__PURE__ */ s.jsxs("span", { className: "collapsed-clip-gain", children: [
            Math.round(e.effectiveGain * 100),
            "%"
          ] })
        ] })
      ]
    }
  );
}
function mx({
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
  timeMode: f = "LOCAL",
  onUpdateAudioPlan: p = null
}) {
  const y = u.useRef(null), [S, M] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [_, k] = u.useState(!1), [g, m] = u.useState(null), [T, w] = u.useState(1), [b, h] = u.useState(50), [A, E] = u.useState(50), [N, P] = u.useState([]), [W, L] = u.useState(null), [B, re] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const $ = (ee) => {
      ee.detail && re(ee.detail);
    };
    return window.addEventListener("itb-live-audio-level", $), () => window.removeEventListener("itb-live-audio-level", $);
  }, []);
  const ne = u.useCallback(() => {
    M(($) => {
      const ee = !$;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(ee));
      } catch {
      }
      return ee;
    });
  }, []), [H, I] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map(($, ee) => {
        var V;
        return {
          id: `clip_${ee}_${$.startEpochMs || $.StartEpochMs}`,
          startEpochMs: $.startEpochMs ?? $.StartEpochMs ?? l,
          endEpochMs: $.endEpochMs ?? $.EndEpochMs ?? l + r,
          sourceStationId: $.sourceStationId ?? $.SourceStationId ?? (((V = t[0]) == null ? void 0 : V.id) || "station-0"),
          gain: $.gain ?? $.Gain ?? 1,
          channelMode: $.channelMode ?? $.ChannelMode ?? "both",
          fadeInMs: $.fadeInMs ?? $.FadeInMs ?? 50,
          fadeOutMs: $.fadeOutMs ?? $.FadeOutMs ?? 50
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
  ]), U = l + o, O = l + n, K = O + r, R = u.useCallback(($) => {
    if (!p) return;
    const ee = [];
    $.forEach((V) => {
      V.isMuted || _ || V.clips.forEach((q) => {
        ee.push({
          startEpochMs: q.startEpochMs,
          endEpochMs: q.endEpochMs,
          sourceStationId: q.sourceStationId,
          gain: q.gain * V.gain,
          channelMode: q.channelMode || V.channelMode || "both",
          fadeInMs: q.fadeInMs ?? 50,
          fadeOutMs: q.fadeOutMs ?? 50
        });
      });
    }), ee.sort((V, q) => V.startEpochMs - q.startEpochMs), p({ segments: ee });
  }, [p, _]);
  u.useEffect(() => {
    let $ = null;
    for (const ee of H)
      if (!(ee.isMuted || _)) {
        for (const V of ee.clips)
          if (U >= V.startEpochMs && U <= V.endEpochMs) {
            const q = t.find((X) => X.id === V.sourceStationId);
            $ = {
              stationId: V.sourceStationId,
              stationName: q ? q.displayName || q.hostname || q.id : V.sourceStationId,
              channelMode: V.channelMode || ee.channelMode || "both",
              gain: V.gain * ee.gain,
              isPlaying: B.isPlaying
            };
            break;
          }
        if ($) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: $ }));
  }, [H, _, U, t, B.isPlaying]), u.useEffect(() => {
    const $ = () => {
      N.length !== 0 && (I((q) => {
        const X = q.map((Q) => ({
          ...Q,
          clips: Q.clips.filter((ce) => !N.includes(ce.id))
        }));
        return R(X), X;
      }), P([]), m(null));
    }, ee = (q) => {
      if (q.key === "Delete" || q.key === "Backspace") {
        const X = q.target;
        if (X.tagName === "INPUT" || X.tagName === "TEXTAREA" || X.isContentEditable) return;
        N.length > 0 && (q.preventDefault(), $());
      }
    }, V = () => $();
    return window.addEventListener("keydown", ee), window.addEventListener("itb:studio-delete-selected", V), () => {
      window.removeEventListener("keydown", ee), window.removeEventListener("itb:studio-delete-selected", V);
    };
  }, [N, R]);
  const oe = u.useCallback(() => {
    I(($) => {
      const V = `A${$.length + 1}`, q = {
        id: V,
        name: `Track ${V}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, X = [...$, q];
      return R(X), X;
    });
  }, [R]), te = u.useCallback(($) => {
    I((ee) => {
      if (ee.length <= 1) return ee;
      const V = ee.filter((q) => q.id !== $);
      return R(V), V;
    });
  }, [R]), Z = u.useCallback(($) => {
    I((ee) => {
      const V = ee.map((q) => q.id === $ ? { ...q, isMuted: !q.isMuted } : q);
      return R(V), V;
    });
  }, [R]), Y = u.useCallback(($) => {
    I((ee) => {
      var X;
      const V = (X = ee.find((Q) => Q.id === $)) == null ? void 0 : X.isSolo, q = ee.map((Q) => ({
        ...Q,
        isSolo: Q.id === $ ? !V : !1,
        isMuted: Q.id === $ ? !1 : !V
      }));
      return R(q), q;
    });
  }, [R]), Le = u.useCallback(($) => {
    const ee = ["both", "sys", "mic"];
    I((V) => {
      const q = V.map((X) => {
        if (X.id !== $) return X;
        const Q = X.channelMode || "both", ce = ee[(ee.indexOf(Q) + 1) % ee.length];
        return {
          ...X,
          channelMode: ce,
          clips: X.clips.map((Ze) => ({ ...Ze, channelMode: ce }))
        };
      });
      return R(q), q;
    });
  }, [R]), Be = u.useCallback(($, ee) => {
    const V = Math.max(0, Math.min(2, Number(ee)));
    I((q) => {
      const X = q.map((Q) => Q.id === $ ? { ...Q, gain: V } : Q);
      return R(X), X;
    }), nh(V);
  }, [R]), je = u.useCallback(($, ee) => {
    ee && I((V) => {
      const q = V.map((X) => {
        if (X.id !== $) return X;
        if (X.clips.length === 0) {
          const Q = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: ee,
            gain: 1,
            channelMode: X.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...X, clips: [Q] };
        }
        return {
          ...X,
          clips: X.clips.map((Q) => ({ ...Q, sourceStationId: ee }))
        };
      });
      return R(q), q;
    });
  }, [l, r, R]), et = u.useCallback(($, ee = null, V = null) => {
    var ot;
    const q = ee || ((ot = t[0]) == null ? void 0 : ot.id) || "station-0", X = V !== null ? V : U, Q = Math.min(r, 6e4), ce = X + Q, Ze = H.find((Ge) => Ge.id === $), Oe = (Ze == null ? void 0 : Ze.channelMode) || "both", Ye = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(X),
      endEpochMs: Math.round(ce),
      sourceStationId: q,
      gain: 1,
      channelMode: Oe,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    I((Ge) => {
      const Tt = Ge.map((Rt) => Rt.id === $ ? {
        ...Rt,
        clips: [...Rt.clips, Ye].sort((Lt, Ot) => Lt.startEpochMs - Ot.startEpochMs)
      } : Rt);
      return R(Tt), Tt;
    });
  }, [H, U, r, t, R]), be = u.useCallback(($, ee = null) => {
    I((V) => {
      const q = V.map((X) => {
        if ($ && X.id !== $) return X;
        const Q = [];
        return X.clips.forEach((ce) => {
          (!ee || ce.id === ee || N.includes(ce.id)) && U > ce.startEpochMs + 500 && U < ce.endEpochMs - 500 ? (Q.push({ ...ce, endEpochMs: U }), Q.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: U,
            endEpochMs: ce.endEpochMs,
            sourceStationId: ce.sourceStationId,
            gain: ce.gain,
            channelMode: ce.channelMode || X.channelMode || "both",
            fadeInMs: ce.fadeInMs ?? 50,
            fadeOutMs: ce.fadeOutMs ?? 50
          })) : Q.push(ce);
        }), { ...X, clips: Q };
      });
      return R(q), q;
    }), m(null);
  }, [U, N, R]), Ie = u.useCallback(() => {
    be(null, null);
  }, [be]), tt = u.useCallback(($, ee) => {
    I((V) => {
      const q = V.map((X) => X.id !== $ ? X : {
        ...X,
        clips: X.clips.filter((Q) => Q.id !== ee)
      });
      return R(q), q;
    }), m(null);
  }, [R]), at = u.useCallback(($, ee, V) => {
    I((q) => {
      const X = q.map((Q) => Q.id !== $ ? Q : {
        ...Q,
        clips: Q.clips.map((ce) => ce.id === ee ? { ...ce, sourceStationId: V } : ce)
      });
      return R(X), X;
    }), m((q) => q ? { ...q, stationId: V } : null);
  }, [R]), ie = u.useCallback(($, ee, V) => {
    const q = Math.max(0, Math.min(2.5, Number(V)));
    w(q), I((X) => {
      const Q = X.map((ce) => ce.id !== $ ? ce : {
        ...ce,
        clips: ce.clips.map((Ze) => Ze.id === ee ? { ...Ze, gain: q } : Ze)
      });
      return R(Q), Q;
    }), nh(q);
  }, [R]), ke = u.useCallback(($, ee, V, q) => {
    const X = Math.max(0, Math.min(1e4, Math.round(Number(q) || 0)));
    V === "in" ? h(X) : E(X), I((Q) => {
      const ce = Q.map((Ze) => Ze.id !== $ ? Ze : {
        ...Ze,
        clips: Ze.clips.map((Oe) => Oe.id === ee ? V === "in" ? { ...Oe, fadeInMs: X } : { ...Oe, fadeOutMs: X } : Oe)
      });
      return R(ce), ce;
    }), m((Q) => Q ? V === "in" ? { ...Q, fadeInMs: X } : { ...Q, fadeOutMs: X } : null);
  }, [R]), Ke = u.useCallback(($, ee, V) => {
    var Lt, Ot;
    if ($.preventDefault(), $.stopPropagation(), $.button !== 0) return;
    const q = H.find((lt) => lt.id === ee), X = (Lt = q == null ? void 0 : q.clips) == null ? void 0 : Lt.find((lt) => lt.id === V);
    if (!X) return;
    const Q = $.clientX, ce = X.startEpochMs, Oe = X.endEpochMs - ce, Ye = y.current;
    if (!Ye) return;
    const ot = (Ot = Ye.querySelector(".audio-lane-timeline")) == null ? void 0 : Ot.getBoundingClientRect();
    if (!ot || ot.width <= 0) return;
    let Ge = !1;
    const Tt = (lt) => {
      const yt = lt.clientX - Q;
      Math.abs(yt) > 3 && (Ge = !0);
      const Qe = yt / ot.width * r;
      let Fe = Math.round(ce + Qe), Nt = Fe + Oe;
      const Dt = 12 / ot.width * r;
      Math.abs(Fe - U) <= Dt ? (Fe = U, Nt = Fe + Oe) : Math.abs(Nt - U) <= Dt && (Nt = U, Fe = Nt - Oe), Fe < l && (Fe = l, Nt = Fe + Oe), I((an) => an.map((cn) => cn.id !== ee ? cn : {
        ...cn,
        clips: cn.clips.map((wn) => wn.id === V ? { ...wn, startEpochMs: Fe, endEpochMs: Nt } : wn)
      }));
    }, Rt = () => {
      window.removeEventListener("mousemove", Tt), window.removeEventListener("mouseup", Rt), Ge && I((lt) => (R(lt), lt));
    };
    window.addEventListener("mousemove", Tt), window.addEventListener("mouseup", Rt);
  }, [H, r, U, l, R]), Ve = u.useCallback(($, ee, V, q) => {
    $.preventDefault(), $.stopPropagation();
    const X = $.clientX, Q = H.find((Ge) => Ge.id === ee), ce = Q == null ? void 0 : Q.clips.find((Ge) => Ge.id === V);
    if (!ce) return;
    const Ze = ce.startEpochMs, Oe = ce.endEpochMs, Ye = (Ge) => {
      var lt;
      const Tt = Ge.clientX - X, Rt = (lt = y.current) == null ? void 0 : lt.querySelector(".audio-lane-timeline");
      if (!Rt) return;
      const Lt = Rt.getBoundingClientRect(), Ot = Tt / Lt.width * r;
      I((yt) => yt.map((Qe) => Qe.id !== ee ? Qe : {
        ...Qe,
        clips: Qe.clips.map((Fe) => {
          if (Fe.id !== V) return Fe;
          if (q === "start") {
            const Nt = Math.min(Oe - 500, Ze + Ot);
            return { ...Fe, startEpochMs: Math.round(Nt) };
          } else {
            const Nt = Math.max(Ze + 500, Oe + Ot);
            return { ...Fe, endEpochMs: Math.round(Nt) };
          }
        })
      }));
    }, ot = () => {
      window.removeEventListener("mousemove", Ye), window.removeEventListener("mouseup", ot), I((Ge) => (R(Ge), Ge));
    };
    window.addEventListener("mousemove", Ye), window.addEventListener("mouseup", ot);
  }, [H, r, R]), me = u.useCallback(($, ee, V) => {
    I((q) => {
      const X = q.map((Q) => Q.id !== $ ? Q : {
        ...Q,
        clips: Q.clips.map((ce) => ce.id === ee ? { ...ce, channelMode: V } : ce)
      });
      return R(X), X;
    }), m((q) => q ? { ...q, channelMode: V } : null);
  }, [R]), fe = u.useCallback(($, ee) => {
    var Oe;
    const V = H.find((Ye) => Ye.id === $), q = (Oe = V == null ? void 0 : V.clips) == null ? void 0 : Oe.find((Ye) => Ye.id === ee);
    if (!q) return;
    const X = q.channelMode || V.channelMode || "both", Q = ["both", "sys", "mic"], ce = (Q.indexOf(X) + 1) % Q.length, Ze = Q[ce];
    me($, ee, Ze);
  }, [H, me]), le = ($, ee, V) => {
    $.preventDefault(), $.stopPropagation();
    const q = 280, X = 390, Q = Math.max(16, Math.min(window.innerWidth - q - 16, $.clientX - q / 2));
    let ce = $.clientY - X - 12;
    ce < 80 && (ce = Math.min(window.innerHeight - X - 16, $.clientY + 24)), w(V.gain || 1), h(V.fadeInMs ?? 50), E(V.fadeOutMs ?? 50), m({
      laneId: ee,
      clipId: V.id,
      s: V.startEpochMs,
      e: V.endEpochMs,
      x: Q,
      y: ce,
      stationId: V.sourceStationId,
      gain: V.gain || 1,
      channelMode: V.channelMode || "both",
      fadeInMs: V.fadeInMs ?? 50,
      fadeOutMs: V.fadeOutMs ?? 50
    });
  };
  u.useEffect(() => {
    if (!g) return;
    const $ = () => m(null), ee = (V) => {
      V.key === "Escape" && m(null);
    };
    return window.addEventListener("click", $), window.addEventListener("keydown", ee), () => {
      window.removeEventListener("click", $), window.removeEventListener("keydown", ee);
    };
  }, [g]);
  const Se = u.useMemo(() => {
    if (_) return [];
    const $ = H.some((q) => q.isSolo), ee = H.filter((q) => $ ? q.isSolo : !q.isMuted), V = [];
    return ee.forEach((q) => {
      const X = ta[H.indexOf(q) % ta.length];
      q.clips.forEach((Q) => {
        V.push({
          ...Q,
          laneId: q.id,
          laneName: q.name,
          laneColor: X,
          effectiveChannelMode: Q.channelMode || q.channelMode || "both",
          effectiveGain: (Q.gain || 1) * (q.gain || 1)
        });
      });
    }), V.sort((q, X) => q.startEpochMs - X.startEpochMs);
  }, [H, _]);
  return !t || t.length === 0 ? null : S ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: y, children: [
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
          H.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: oe,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-split-playhead",
            onClick: Ie,
            title: "Split clip at playhead (Ctrl+K / Razor Tool)",
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "vu-meter-readout", title: `Current Master Level: ${B.db.toFixed(1)} dB`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: B.db > -55 ? `${B.db.toFixed(0)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "vu-meter-groove", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "vu-meter-bar",
              style: {
                width: `${Math.min(100, Math.max(0, (B.peak || 0) * 100))}%`,
                background: B.peak > 0.85 ? "#F43F5E" : B.peak > 0.65 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${_ ? "is-muted" : ""}`,
            onClick: () => {
              k(($) => {
                const ee = !$;
                return R(H), ee;
              });
            },
            title: _ ? "Unmute All Audio Buses" : "Mute All Audio Buses",
            children: _ ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: H.map(($, ee) => {
      const V = ta[ee % ta.length], q = W === $.id, X = t.find((Q) => {
        var ce;
        return Q.id === ((ce = $.clips[0]) == null ? void 0 : ce.sourceStationId);
      }) || t[0];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-header", style: { borderLeftColor: V }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "lane-ident", children: [
            /* @__PURE__ */ s.jsx("span", { className: "lane-badge", style: { backgroundColor: V }, children: $.id }),
            /* @__PURE__ */ s.jsx("span", { className: "lane-name", children: $.name })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-selector", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (X == null ? void 0 : X.id) || "",
              onChange: (Q) => je($.id, Q.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((Q) => /* @__PURE__ */ s.jsx("option", { value: Q.id, children: Q.displayName || Q.hostname || Q.id }, Q.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${$.isMuted ? "active" : ""}`,
                onClick: () => Z($.id),
                title: $.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${$.isSolo ? "active" : ""}`,
                onClick: () => Y($.id),
                title: $.isSolo ? "Unsolo Lane" : "Solo Lane",
                children: "S"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-channel-mode mode-${$.channelMode || "both"}`,
                onClick: () => Le($.id),
                title: `Discrete Audio Channel: ${($.channelMode || "both").toUpperCase()} (Click to toggle BOTH / SYS / MIC)`,
                children: ($.channelMode || "both").toUpperCase()
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
                value: $.gain,
                onChange: (Q) => Be($.id, Q.target.value),
                title: `Lane Gain: ${Math.round($.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round($.gain * 100),
              "%"
            ] })
          ] }),
          H.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => te($.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${q ? "is-drag-over" : ""}`,
            onClick: () => P([]),
            onDragOver: (Q) => {
              Q.preventDefault(), Q.dataTransfer.dropEffect = "copy", W !== $.id && L($.id);
            },
            onDragLeave: () => {
              W === $.id && L(null);
            },
            onDrop: (Q) => {
              Q.preventDefault(), L(null);
              const ce = Q.dataTransfer.getData("text/station-id") || Q.dataTransfer.getData("text/plain");
              if (ce) {
                const Ze = Q.currentTarget.getBoundingClientRect(), Oe = Math.max(0, Math.min(1, (Q.clientX - Ze.left) / Ze.width)), Ye = Math.round(O + Oe * r);
                et($.id, ce, Ye);
              }
            },
            onDoubleClick: (Q) => {
              var Ye;
              const ce = Q.currentTarget.getBoundingClientRect(), Ze = Math.max(0, Math.min(1, (Q.clientX - ce.left) / ce.width)), Oe = Math.round(O + Ze * r);
              et($.id, (Ye = t[0]) == null ? void 0 : Ye.id, Oe);
            },
            children: [
              $.clips.map((Q) => {
                const ce = t.find((Oe) => Oe.id === Q.sourceStationId), Ze = ce ? ce.displayName || ce.hostname || ce.id : Q.sourceStationId;
                return Q.endEpochMs <= O || Q.startEpochMs >= K ? null : /* @__PURE__ */ s.jsx(
                  fx,
                  {
                    clip: Q,
                    lane: $,
                    laneColor: V,
                    isSelected: N.includes(Q.id),
                    onSelect: (Oe) => {
                      Oe.stopPropagation(), Oe.ctrlKey || Oe.metaKey ? P(
                        (Ye) => Ye.includes(Q.id) ? Ye.filter((ot) => ot !== Q.id) : [...Ye, Q.id]
                      ) : P([Q.id]);
                    },
                    onOpenMenu: (Oe) => le(Oe, $.id, Q),
                    onTrimDrag: (Oe, Ye) => Ve(Oe, $.id, Q.id, Ye),
                    onClipMoveDrag: (Oe) => Ke(Oe, $.id, Q.id),
                    onToggleChannelMode: () => fe($.id, Q.id),
                    vpStartEpoch: O,
                    viewportDurationMs: r,
                    timeMode: f,
                    stationName: Ze
                  },
                  Q.id
                );
              }),
              $.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var Q;
                    return et($.id, (Q = t[0]) == null ? void 0 : Q.id, U);
                  },
                  title: "Click or drop workstation here to insert audio clip",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK OR DRAG WORKSTATION HERE (",
                    $.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, $.id);
    }) }),
    g && Ls.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: g.x, top: g.y },
          onClick: ($) => $.stopPropagation(),
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-close",
                  onClick: () => m(null),
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE WORKSTATION" }),
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map(($) => {
                const ee = $.id === g.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${ee ? "is-selected" : ""}`,
                    onClick: () => at(g.laneId, g.clipId, $.id),
                    children: $.displayName || $.hostname || $.id
                  },
                  $.id
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
                    onClick: () => me(g.laneId, g.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${g.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => me(g.laneId, g.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${g.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => me(g.laneId, g.clipId, "mic"),
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
                  onChange: ($) => ie(g.laneId, g.clipId, $.target.value),
                  className: "menu-gain-slider"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME FADE IN / FADE OUT" }),
                /* @__PURE__ */ s.jsxs("span", { className: "fade-val", children: [
                  b,
                  "ms / ",
                  A,
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
                      value: b,
                      onChange: ($) => ke(g.laneId, g.clipId, "in", $.target.value),
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
                      value: A,
                      onChange: ($) => ke(g.laneId, g.clipId, "out", $.target.value),
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
                  onClick: () => be(g.laneId, g.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => tt(g.laneId, g.clipId),
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
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", onClick: ne, children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: _ || Se.length === 0 ? "🔇" : "🔊" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: Se.length > 0 ? `${Se.length} CLIPS ACTIVE` : _ ? "MUTED" : "0 ACTIVE" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: B.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "audio-track-timeline collapsed-bus-timeline",
            onClick: ($) => {
              $.target.closest(".collapsed-master-clip") || ne();
            },
            children: Se.length === 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
              /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS (0 ACTIVE) — CLICK TO EXPAND MULTI-TRACK LANES ]" })
            ] }) : Se.map(($) => {
              const ee = t.find((q) => q.id === $.sourceStationId), V = ee ? ee.displayName || ee.hostname || ee.id : $.sourceStationId;
              return $.endEpochMs <= O || $.startEpochMs >= K ? null : /* @__PURE__ */ s.jsx(
                px,
                {
                  clip: $,
                  vpStartEpoch: O,
                  viewportDurationMs: r,
                  timeMode: f,
                  stationName: V,
                  onExpand: ne
                },
                `master_${$.id}`
              );
            })
          }
        )
      ]
    }
  );
}
function gx({
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
  playheadMs: f = 0,
  inPointMs: p = 0,
  outPointMs: y = 36e5,
  timeMode: S = "LOCAL"
}) {
  const M = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [_, k] = u.useState(null), [g, m] = u.useState(null);
  So.useEffect(() => {
    if (g === null) return;
    const E = (P) => {
      P.key === "Escape" && m(null);
    }, N = (P) => {
      !P.target.closest(".kf-inspector-popover") && !P.target.closest(".kf-marker-diamond") && m(null);
    };
    return window.addEventListener("keydown", E), window.addEventListener("mousedown", N), () => {
      window.removeEventListener("keydown", E), window.removeEventListener("mousedown", N);
    };
  }, [g]);
  const T = d + f, w = d + i, b = w + c, h = (E) => {
    const N = E.currentTarget.getBoundingClientRect(), P = E.clientX - N.left, W = Math.max(0, Math.min(1, P / N.width)), L = Math.round(w + W * c);
    r && r(L);
  }, A = (E, N, P) => {
    if (E.button !== 0) return;
    E.stopPropagation(), E.preventDefault();
    const W = E.clientX, L = P.timestampEpochMs, B = P.id || `kf_${N}_${L}`, re = E.currentTarget.closest(".track-surface");
    if (!re) return;
    let ne = !1;
    k({
      idx: N,
      kfId: B,
      startClientX: W,
      initialEpoch: L,
      currentEpoch: L
    });
    const H = (U) => {
      const O = U.clientX - W;
      Math.abs(O) > 3 && (ne = !0);
      const K = re.getBoundingClientRect(), R = O / K.width * c;
      let oe = Math.round(L + R);
      oe = Math.max(d, Math.min(d + v, oe));
      const te = d + p, Z = d + y, Y = 14 / K.width * c;
      Math.abs(oe - T) <= Y ? oe = T : Math.abs(oe - te) <= Y ? oe = te : Math.abs(oe - Z) <= Y && (oe = Z), k((Le) => Le ? { ...Le, currentEpoch: oe } : null);
    }, I = (U) => {
      window.removeEventListener("mousemove", H), window.removeEventListener("mouseup", I), k(null);
      const O = re.getBoundingClientRect(), R = (U.clientX - W) / O.width * c;
      let oe = Math.round(L + R);
      oe = Math.max(d, Math.min(d + v, oe));
      const te = d + p, Z = d + y, Y = 14 / O.width * c;
      Math.abs(oe - T) <= Y ? oe = T : Math.abs(oe - te) <= Y ? oe = te : Math.abs(oe - Z) <= Y && (oe = Z), ne ? (o && o(B, oe), n && n(N, oe)) : (n && n(N, L), m((Le) => Le === N ? null : N));
    };
    window.addEventListener("mousemove", H), window.addEventListener("mouseup", I);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        M.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (E) => {
            E.stopPropagation(), r && r(T);
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
          M.map((E, N) => {
            const P = (_ == null ? void 0 : _.idx) === N, W = P ? _.currentEpoch : E.timestampEpochMs;
            if (W < w - 5e4 || W > b + 5e4) return null;
            const L = (W - w) / c * 100;
            if (L < -2 || L > 102) return null;
            const B = N === t, re = jt(W, S, { includeSeconds: !0 }), ne = `${E.transitionType || "smooth"} (${E.transitionDurationSec ?? 0.5}s)`, H = Math.max(0, (W - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${B ? "is-active" : ""} ${P ? "is-dragging" : ""}`,
                style: { left: `${L}%` },
                onMouseDown: (I) => A(I, N, E),
                onContextMenu: (I) => {
                  I.preventDefault(), I.stopPropagation(), M.length > 1 && l && l(N);
                },
                title: `Keyframe #${N + 1} at ${re} (+${H}s) • ${ne}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  P && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: re }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      H,
                      "s"
                    ] })
                  ] }),
                  g === N && !P && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (I) => I.stopPropagation(),
                      onMouseDown: (I) => I.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            N + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: re }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (I) => {
                                I.stopPropagation(), m(null);
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
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((I) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(E.transitionDurationSec ?? 0.5) === I ? "is-active" : ""}`,
                                onClick: () => a == null ? void 0 : a(N, { transitionDurationSec: I }),
                                children: [
                                  I,
                                  "s"
                                ]
                              },
                              I
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (I) => {
                                I.stopPropagation(), l && l(N), m(null);
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
function xx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: i
}) {
  const c = (E) => !r || r <= 0 ? "0%" : `${(E - n) / r * 100}%`, d = (o - n) / r * 100, v = (a - n) / r * 100, f = (l - n) / r * 100, p = f >= -0.2 && f <= 100.2, y = Math.max(0, Math.min(100, f)), S = Math.max(0, d), M = Math.min(100, v), _ = Math.max(0, M - S), k = (E) => (N) => {
    N.preventDefault(), N.stopPropagation(), typeof i == "function" && i(E, N);
  }, g = d < 1.5, m = v > 98.5, T = d <= 0.2 && d >= -0.2, w = v >= 99.8 && v <= 100.2, b = f >= -0.2 && f < 3.5, h = f > 96.5 && f <= 100.2, A = u.useMemo(() => jt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    _ > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${S}%`, width: `${_}%` },
        onMouseDown: k("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${g ? "flipped" : ""} ${T ? "at-edge" : ""}`,
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
        className: `marker out-marker ${m ? "flipped" : ""} ${w ? "at-edge" : ""}`,
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
        style: { left: `${y}%` },
        onMouseDown: k("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${b ? "edge-left" : ""} ${h ? "edge-right" : ""}`, children: A }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const yx = So.memo(xx);
function vx({
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
  const a = 210, i = 150, c = Math.min(e.x, window.innerWidth - a - 12), d = Math.min(e.y, window.innerHeight - i - 12), v = /* @__PURE__ */ s.jsxs(
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
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: jt(t + e.targetMs, n) })
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
  return Ls.createPortal(v, document.body);
}
function Nx({
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
const kx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function wx({
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
    const f = setTimeout(async () => {
      try {
        const p = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, y = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
          signal: v.signal
        });
        if (y.ok) {
          const S = await y.json();
          a(S), d.current && d.current(S);
        }
      } catch (p) {
        p.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", p);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(f), v.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: i, formatEstimateSize: kx };
}
function Ex({
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
  minimapRef: f
}) {
  const [p, y] = u.useState(null), [S, M] = u.useState(null), _ = (k, g) => {
    y(k), M({
      target: k,
      startX: g.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!p) return;
    const k = e * 0.015, g = (T) => {
      if (p === "minimap-viewport" && (f != null && f.current)) {
        const b = f.current.getBoundingClientRect(), A = Math.max(0, Math.min(T.clientX - b.left, b.width)) / b.width * t, E = Math.max(0, Math.min(A - e / 2, t - e));
        d(E);
        return;
      }
      const w = v(T.clientX);
      if (p === "playhead") {
        let b = w;
        Math.abs(b - l) <= k ? b = l : Math.abs(b - a) <= k && (b = a), r(Math.max(0, Math.min(t, b)));
      } else if (p === "in") {
        const b = a - 1e3;
        o(Math.max(0, Math.min(w, b)));
      } else if (p === "out") {
        const b = l + 1e3;
        i(Math.min(t, Math.max(w, b)));
      } else if (p === "range" && S) {
        const b = w - v(S.startX), h = S.initialOut - S.initialIn;
        let A = S.initialIn + b, E = S.initialOut + b;
        A < 0 ? (A = 0, E = h) : E > t && (E = t, A = t - h), o(A), i(E);
      }
    }, m = () => {
      y(null), M(null);
    };
    return window.addEventListener("mousemove", g), window.addEventListener("mouseup", m), () => {
      window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", m);
    };
  }, [
    p,
    S,
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
    f
  ]), { draggingTarget: p, handleStartDrag: _ };
}
const er = 4;
function _p({
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
  onZoomChange: f,
  onZoomReset: p,
  playheadMs: y = 0,
  setPlayheadMs: S,
  inPointMs: M = 0,
  setInPointMs: _,
  outPointMs: k = 36e5,
  setOutPointMs: g,
  onExport: m,
  recordingSegments: T = {},
  movieBoundaries: w,
  viewportStartMs: b = 0,
  onViewportStartChange: h,
  onEstimateLoaded: A,
  onFitRange: E,
  onJumpViewportTo: N,
  keystrokeMode: P = "BURN_IN",
  onChangeKeystrokeMode: W,
  keystrokes: L = [],
  showKeystrokes: B = !1,
  showRulerKeystrokes: re = !1,
  onToggleRulerKeystrokes: ne,
  _onSplitDirectorSegment: H,
  _onChangeDirectorSegmentDisplay: I,
  _onResetDirectorSegmentToAuto: U,
  audioRoutingPlan: O,
  onSplitAudioSegment: K,
  onChangeAudioSegmentStation: R,
  onChangeAudioSegmentGain: oe,
  onFollowVisualFeed: te,
  isAutoFollowAudio: Z,
  canvasLayoutTimeline: Y,
  activeKfIndex: Le = 0,
  onSelectKeyframe: Be,
  onAddKeyframeAtEpoch: je,
  onDeleteKeyframe: et,
  onUpdateKeyframeEpoch: be,
  onUpdateKeyframeTransition: Ie,
  onToggleDisplayOnCanvas: tt,
  onUpdateAudioPlan: at
}) {
  var Re, st;
  const [ie, ke] = u.useState(null), [Ke, Ve] = u.useState(0), [me, fe] = u.useState(null), [le, Se] = u.useState(!0), $ = (ae) => {
    var z, he, pe;
    return ((ae == null ? void 0 : ae.displays) || (ae == null ? void 0 : ae.Displays) || ((z = ae == null ? void 0 : ae.displayTopology) == null ? void 0 : z.displays) || ((he = ae == null ? void 0 : ae.DisplayTopology) == null ? void 0 : he.Displays) || ((pe = ae == null ? void 0 : ae.topology) == null ? void 0 : pe.displays) || []).length;
  }, [ee, V] = u.useState(() => {
    var ae;
    return e.length === 1 && $(e[0]) > 1 ? (ae = e[0]) == null ? void 0 : ae.id : null;
  });
  u.useEffect(() => {
    var ae;
    if (e.length === 1 && !ee && ((ae = e[0]) != null && ae.id) && $(e[0]) > 1)
      V(e[0].id);
    else if (ee) {
      const nt = e.find((z) => z.id === ee);
      (!nt || $(nt) <= 1) && V(null);
    }
  }, [e, ee]);
  const q = u.useRef(null), X = u.useRef(null), Q = d / Math.max(1, v), ce = Math.ceil(e.length / er) || 1, Ze = u.useMemo(() => {
    const ae = Ke * er;
    return e.slice(ae, ae + er);
  }, [e, Ke]);
  u.useEffect(() => {
    if (!t && !ee) return;
    const ae = ee || t, nt = e.findIndex((z) => z.id === ae);
    if (nt !== -1) {
      const z = Math.floor(nt / er);
      z !== Ke && Ve(z);
    }
  }, [t, ee, e, Ke]);
  const Oe = ((Re = Y == null ? void 0 : Y.keyframes) == null ? void 0 : Re[Le]) || ((st = Y == null ? void 0 : Y.keyframes) == null ? void 0 : st[0]), Ye = u.useMemo(() => {
    var ae;
    return ((ae = Oe == null ? void 0 : Oe.layout) == null ? void 0 : ae.placements) || [];
  }, [Oe]), ot = u.useMemo(() => e.find((ae) => ae.id === t) || null, [e, t]), Ge = (w == null ? void 0 : w.globalFirstMs) ?? null, Tt = (w == null ? void 0 : w.globalLastMs) ?? null, Rt = u.useMemo(() => (M > 500 || k < d - 500) && k - M >= 1e3, [M, k, d]), Lt = u.useMemo(() => e.map((ae) => ae.id).sort().join(","), [e]), { estimateData: Ot, isEstimating: lt, formatEstimateSize: yt } = wx({
    stationIdsKey: Lt,
    inPointMs: M,
    outPointMs: k,
    baseEpochMs: i,
    onEstimateLoaded: A
  }), Qe = u.useCallback((ae) => {
    if (!q.current) return b;
    const nt = q.current.getBoundingClientRect(), z = nt.left + 200, he = nt.width - 200 - 58;
    if (he <= 0) return b;
    const pe = Math.max(0, Math.min(ae - z, he));
    return Math.round(b + pe / he * Q);
  }, [b, Q]), { draggingTarget: Fe, handleStartDrag: Nt } = Ex({
    viewportDurationMs: Q,
    totalDurationMs: d,
    playheadMs: y,
    setPlayheadMs: S,
    inPointMs: M,
    setInPointMs: _,
    outPointMs: k,
    setOutPointMs: g,
    viewportStartMs: b,
    setViewportStartMs: h,
    getMsFromClientX: Qe,
    minimapRef: X
  }), Dt = u.useRef(v);
  Dt.current = v;
  const an = u.useRef(b);
  an.current = b;
  const cn = u.useRef(d);
  cn.current = d;
  const wn = u.useRef(y);
  wn.current = y, u.useEffect(() => {
    const ae = q.current;
    if (!ae) return;
    const nt = (z) => {
      z.preventDefault(), z.stopPropagation();
      const he = z.ctrlKey || z.shiftKey, pe = Dt.current, Ue = an.current, Je = cn.current, ut = wn.current;
      if (he) {
        const dt = Math.abs(z.deltaX) > Math.abs(z.deltaY) ? z.deltaX : z.deltaY;
        if (dt === 0) return;
        const qe = Je / Math.max(1, pe), ht = Math.max(0, Je - qe), St = qe * 0.08 * (dt > 0 ? 1 : -1);
        h == null || h(Math.max(0, Math.min(ht, Ue + St)));
      } else {
        if (z.deltaY === 0) return;
        const qe = z.deltaY < 0 ? 1.25 : 0.8, ht = Math.max(32, Je / 2e3), St = ae.getBoundingClientRect(), Mt = St.left + 200, Pt = St.width - 200 - 58;
        let rn = 0.5;
        if (Pt > 0)
          if (z.clientX >= Mt && z.clientX <= St.right - 58)
            rn = Math.max(0, Math.min(1, (z.clientX - Mt) / Pt));
          else {
            const gs = Je / Math.max(1, pe), Ss = (ut - Ue) / gs;
            rn = Ss >= 0 && Ss <= 1 ? Ss : 0.5;
          }
        const _t = Math.max(1, Math.min(ht, Math.round(pe * qe * 100) / 100));
        if (_t === pe) return;
        const zt = Je / pe, dn = Je / _t, At = Ue + rn * zt - rn * dn, $n = Math.max(0, Je - dn);
        f == null || f(_t), h == null || h(Math.max(0, Math.min($n, At)));
      }
    };
    return ae.addEventListener("wheel", nt, { passive: !1, capture: !0 }), () => ae.removeEventListener("wheel", nt, { capture: !0 });
  }, [f, h]);
  const De = e.length > 0 && Math.abs(k - M) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: q,
      className: "timeline-board-root",
      onContextMenu: (ae) => {
        var z;
        ae.preventDefault();
        const nt = (z = q.current) == null ? void 0 : z.getBoundingClientRect();
        !nt || ae.clientX - nt.left < 200 || ae.clientX > nt.right - 58 || fe({ x: ae.clientX, y: ae.clientY, targetMs: Math.max(0, Math.min(d, Qe(ae.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            sx,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: M,
              setInPointMs: _,
              outPointMs: k,
              setOutPointMs: g
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                rx,
                {
                  minimapRef: X,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: b,
                  viewportDurationMs: Q,
                  zoomLevel: v,
                  inPointMs: M,
                  outPointMs: k,
                  playheadMs: y,
                  onStartDragMinimap: Nt
                }
              ),
              /* @__PURE__ */ s.jsx(
                lx,
                {
                  earliestMediaMs: Ge,
                  latestMediaMs: Tt,
                  hasActiveCut: Rt,
                  onJumpToFirst: () => {
                    Ge !== null && (S == null || S(Ge), N == null || N(Ge, "start"));
                  },
                  onJumpToLast: () => {
                    Tt !== null && (S == null || S(Tt), N == null || N(Tt, "end"));
                  },
                  onContextualFit: () => {
                    Rt ? E == null || E(M, k) : Ge !== null && Tt !== null && Tt > Ge ? E == null || E(Ge, Tt) : p == null || p();
                  },
                  onResetZoom: p,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: P,
                  onChangeKeystrokeMode: W,
                  showRulerKeystrokes: re,
                  onToggleRulerKeystrokes: ne
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              nx,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: b,
                viewportDurationMs: Q,
                totalDurationMs: d,
                hoverMs: ie,
                onHoverChange: ke,
                onSeek: (ae) => S == null ? void 0 : S(ae),
                inPointMs: M,
                outPointMs: k,
                earliestMediaMs: Ge,
                movieBoundaries: w,
                stationHostname: (ot == null ? void 0 : ot.hostname) || (ot == null ? void 0 : ot.id) || (ot == null ? void 0 : ot.name),
                activeStationName: (ot == null ? void 0 : ot.displayName) || (ot == null ? void 0 : ot.hostname) || (ot == null ? void 0 : ot.name),
                showKeystrokes: !!(re ?? B),
                keystrokes: L
              }
            ) })
          ] })
        ] }),
        ce > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Ke === 0,
              onClick: () => Ve((ae) => Math.max(0, ae - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            Ke * er + 1,
            "–",
            Math.min(e.length, (Ke + 1) * er),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Ke >= ce - 1,
              onClick: () => Ve((ae) => Math.min(ce - 1, ae + 1)),
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
            onMouseMove: (ae) => {
              if (Fe || !q.current) return;
              const nt = q.current.getBoundingClientRect();
              ae.clientX >= nt.left + 200 && ae.clientX <= nt.right - 58 ? ke(Qe(ae.clientX)) : ke(null);
            },
            onMouseLeave: () => !Fe && ke(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => Se((ae) => !ae), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: le ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  le && ce > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Ke === 0,
                        onClick: (ae) => {
                          ae.stopPropagation(), Ve((nt) => Math.max(0, nt - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      Ke + 1,
                      "/",
                      ce,
                      " (",
                      Ke * er + 1,
                      "–",
                      Math.min(e.length, (Ke + 1) * er),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Ke >= ce - 1,
                        onClick: (ae) => {
                          ae.stopPropagation(), Ve((nt) => Math.min(ce - 1, nt + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !le && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => Se(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (Ye == null ? void 0 : Ye.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var pe, Ue, Je, ut, dt;
                    const ae = (Ye == null ? void 0 : Ye.find((qe) => qe.isPrimary || qe.isFocused)) || (Ye == null ? void 0 : Ye[0]), nt = (ae == null ? void 0 : ae.stationId) || ((pe = e[0]) == null ? void 0 : pe.hostname) || ((Ue = e[0]) == null ? void 0 : Ue.id), z = (ae == null ? void 0 : ae.displayId) || "mon-0";
                    let he = [];
                    if (Ye && Ye.length > 0) {
                      const qe = /* @__PURE__ */ new Map();
                      Ye.forEach((ht) => {
                        var Mt;
                        (T[ht.stationId] || T[(Mt = ht.stationId) == null ? void 0 : Mt.toLowerCase()] || []).forEach((Pt) => {
                          const rn = `${Pt.startEpochMs || Pt.start}_${Pt.endEpochMs || Pt.end}`;
                          qe.has(rn) || qe.set(rn, Pt);
                        });
                      }), he = Array.from(qe.values());
                    }
                    return he.length === 0 && (he = T[(Je = e[0]) == null ? void 0 : Je.id] || T[(ut = e[0]) == null ? void 0 : ut.hostname] || ((dt = e[0]) == null ? void 0 : dt.segments) || []), /* @__PURE__ */ s.jsx(
                      Wc,
                      {
                        hostname: nt,
                        displayId: z,
                        activeSegments: he,
                        viewportStartMs: b,
                        viewportDurationMs: Q,
                        baseEpochMs: i,
                        inPointMs: M,
                        outPointMs: k,
                        globalGaps: (Ot == null ? void 0 : Ot.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                le && (e.length > 0 ? Ze.map((ae) => {
                  const nt = !!(t && ae.id === t), z = ee === ae.id, he = o ? o[ae.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    dx,
                    {
                      station: ae,
                      isExpanded: z && $(ae) > 1,
                      onToggleExpand: () => {
                        $(ae) > 1 && V((pe) => pe === ae.id ? null : ae.id);
                      },
                      isAutoDirectorEnabled: he,
                      onToggleAutoDirector: a,
                      canvasPlacements: Ye,
                      onToggleDisplayOnCanvas: tt,
                      directorPlan: ae.directorPlan,
                      isActive: nt,
                      onSelect: () => n == null ? void 0 : n(ae.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: b,
                      viewportDurationMs: Q,
                      inPointMs: M,
                      outPointMs: k,
                      baseEpochMs: i,
                      segments: T[ae.id] || T[ae.hostname] || ae.segments || [],
                      recordingSegments: T,
                      globalGaps: (Ot == null ? void 0 : Ot.removedGlobalGaps) || []
                    },
                    ae.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  mx,
                  {
                    audioPlan: O,
                    stations: e,
                    viewportStartMs: b,
                    viewportDurationMs: Q,
                    baseEpochMs: i,
                    playheadMs: y,
                    onSplitSegment: K,
                    onChangeSegmentStation: R,
                    onChangeSegmentGain: oe,
                    onFollowVisualFeed: te,
                    isAutoFollow: Z,
                    timeMode: c,
                    onUpdateAudioPlan: at
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  gx,
                  {
                    canvasLayoutTimeline: Y,
                    activeKfIndex: Le,
                    onSelectKeyframe: Be,
                    onAddKeyframeAtEpoch: je,
                    onDeleteKeyframe: et,
                    onUpdateKeyframeEpoch: be,
                    onUpdateKeyframeTransition: Ie,
                    viewportStartMs: b,
                    viewportDurationMs: Q,
                    baseEpochMs: i,
                    totalDurationMs: d,
                    playheadMs: y,
                    inPointMs: M,
                    outPointMs: k,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                Nx,
                {
                  isRangeValid: De,
                  onExport: m,
                  isEstimating: lt,
                  estimateData: Ot,
                  formatEstimateSize: yt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          yx,
          {
            baseEpochMs: i,
            timeMode: c,
            viewportStartMs: b,
            viewportDurationMs: Q,
            playheadMs: y,
            inPointMs: M,
            outPointMs: k,
            onStartDrag: Nt
          }
        ),
        /* @__PURE__ */ s.jsx(
          vx,
          {
            contextMenu: me,
            baseEpochMs: i,
            timeMode: c,
            onAction: (ae) => {
              me && (ae === "playhead" ? S == null || S(me.targetMs) : ae === "in" ? _ == null || _(Math.max(0, Math.min(me.targetMs, k - 1e3))) : ae === "out" && (g == null || g(Math.min(d, Math.max(me.targetMs, M + 1e3)))), fe(null));
            },
            onClose: () => fe(null)
          }
        )
      ]
    }
  );
}
function jx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Cx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Sx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Mx({
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
  onFilterModeChange: f,
  filteredCount: p,
  selectedInTabCount: y,
  unselectedInTabCount: S,
  activeTabName: M,
  onSelectAllInScope: _,
  onClearInScope: k,
  viewMode: g = "grid",
  onViewModeChange: m,
  isDrawerMode: T = !1
}) {
  const [w, b] = u.useState(!1), h = v !== "all", A = !M || M.toLowerCase() === "all", E = A ? "Select All" : `Select ${M}`, N = A ? "Clear All" : `Clear ${M}`;
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
            onChange: (P) => t(P.target.value)
          }
        )
      ] }),
      T && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${w ? "open" : ""} ${h ? "has-filter" : ""}`,
          onClick: () => b(!w),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            h && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !T && m && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${g === "grid" ? "active" : ""}`,
            onClick: () => m("grid"),
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
            onClick: () => m("table"),
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
          onChange: (P) => a(P.target.value),
          children: l.map((P) => {
            const W = P.id === "all" ? c.map((B) => B.id) : P.stationIds || [], L = W.filter((B) => d.includes(B)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: P.id, children: [
              P.name,
              " (",
              L,
              "/",
              W.length,
              ")"
            ] }, P.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: _, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: k, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        i && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((P) => {
        const W = o === P.id, L = P.id === "all" ? c.map((ne) => ne.id) : P.stationIds || [], B = L.length, re = L.filter((ne) => d.includes(ne)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${W ? "active" : ""}`,
            onClick: () => a(P.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: P.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${re > 0 ? "has-selected" : ""}`, children: [
                re,
                "/",
                B
              ] })
            ]
          },
          P.id
        );
      }) })
    ] })),
    (!T || w) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${T ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "all" ? "active" : ""}`,
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
            className: `filter-pill ${v === "selected" ? "active" : ""}`,
            onClick: () => f("selected"),
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
            className: `filter-pill ${v === "gaps" ? "active" : ""}`,
            onClick: () => f("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "audio" ? "active" : ""}`,
            onClick: () => f("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !T && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: _, children: [
          "+ ",
          E
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: k, children: [
          "✕ ",
          N
        ] })
      ] })
    ] })
  ] });
}
function bx({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: a = "table"
}) {
  if (r === 0) return null;
  const i = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = a === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], v = t <= 1, f = (p) => {
    if (p === n) return !0;
    const y = Math.min(n, r), S = Math.min(p, r), M = Math.ceil(r / n), _ = Math.ceil(r / p);
    return y !== S || M !== _;
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((p) => {
        const y = n === p, S = !f(p);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${y ? "active" : ""} ${S ? "redundant-disabled" : ""}`,
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
function Ix({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, a] = u.useState(!1), i = u.useRef(null);
  u.useEffect(() => {
    const p = (y) => {
      i.current && !i.current.contains(y.target) && a(!1);
    };
    return o && document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [o]);
  const c = u.useMemo(() => {
    const p = new Map(t.map((y) => [y.id, y]));
    return e.map((y) => p.get(y) || { id: y, hostname: `Station ${y}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = c.slice(0, l), v = c.slice(l), f = v.length > 0;
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
        const y = p.displayName || p.hostname || p.name || p.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: y, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: y }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (S) => {
                S.stopPropagation(), n(p.id);
              },
              title: `Remove ${y}`,
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: v.map((p) => {
            const y = p.displayName || p.hostname || p.name || p.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: y, children: y }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(p.id),
                  title: `Remove ${y}`,
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
const Fp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function ah(e, t, n = Fp) {
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
function Tx(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function Ax(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function $x(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Fp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? Ax(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const h = ah(0, !0, r);
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
  const f = l, p = l + o, y = [];
  for (const h of t) {
    const A = Math.max(h.startEpoch, f), E = Math.min(h.endEpoch, p);
    E > A && y.push({ startEpoch: A, endEpoch: E });
  }
  y.sort((h, A) => h.startEpoch - A.endEpoch);
  const S = [];
  for (const h of y)
    if (S.length === 0)
      S.push({ ...h });
    else {
      const A = S[S.length - 1];
      h.startEpoch <= A.endEpoch + 1e3 ? A.endEpoch = Math.max(A.endEpoch, h.endEpoch) : S.push({ ...h });
    }
  let M = 0;
  for (const h of S)
    M += h.endEpoch - h.startEpoch;
  const _ = o > 0 ? M / o * 100 : 0, k = _ > 0 && _ < 1 ? Number(_.toFixed(1)) : Math.min(100, Math.round(_)), g = [];
  let m = f, T = 0;
  for (const h of S) {
    if (h.startEpoch > m + 2e3) {
      const N = (h.startEpoch - m) / o * 100, P = (m - f) / o * 100;
      g.push({
        type: "gap",
        startPct: Math.max(0, P),
        widthPct: Math.min(100, N)
      }), T++;
    }
    const A = (h.endEpoch - h.startEpoch) / o * 100, E = (h.startEpoch - f) / o * 100;
    g.push({
      type: "rec",
      startPct: Math.max(0, E),
      widthPct: Math.min(100, A)
    }), m = h.endEpoch;
  }
  if (m < p - 2e3) {
    const h = (p - m) / o * 100, A = (m - f) / o * 100;
    g.push({
      type: "gap",
      startPct: Math.max(0, A),
      widthPct: Math.min(100, h)
    }), T++;
  }
  const w = T > 0 || k < 100, b = ah(k, w, r);
  return {
    coveragePct: k,
    recordedDuration: Tx(M),
    totalRecordedMs: M,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: w,
    gapsCount: T,
    trafficStatus: b,
    segments: g.length > 0 ? g : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const Rx = Object.freeze([]), Lx = 12;
function Ox({
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
  onOpenRangeModal: f,
  systemTabs: p = Rx,
  recordingSegments: y = {},
  baseEpochMs: S = 0,
  durationMs: M = 0
}) {
  const [_, k] = u.useState([]), [g, m] = u.useState("all"), [T, w] = u.useState(""), [b, h] = u.useState(!0), [A, E] = u.useState("all"), [N, P] = u.useState(null), [W, L] = u.useState(!1), [B, re] = u.useState(15), [ne, H] = u.useState(8), [I, U] = u.useState(1), O = u.useRef(!1), K = u.useRef(null), R = c && r.length === 0, oe = r.length === 0 && !c;
  let te = "is-closed";
  i || oe || R ? te = "is-full-width" : e && (te = "is-open"), u.useLayoutEffect(() => {
    const le = () => {
      if (!K.current) return;
      const $ = K.current.clientHeight;
      if ($ <= 0) return;
      const ee = K.current.querySelector(".station-row, .hub-table-row"), V = ee ? ee.offsetHeight : 40;
      if (V > 0) {
        const X = Math.floor($ / V) - 2, ce = [5, 10, 15, 20, 25, 30].filter((Ze) => Ze <= X).pop() || 5;
        re(ce);
      }
      const q = K.current.clientWidth;
      if (q > 0) {
        const ce = Math.max(1, Math.floor((q + 12) / 252)), Oe = Math.max(1, Math.floor(($ + 12) / (175 + 12))), Ye = Math.max(ce * Oe, ce);
        H(Ye);
      }
    };
    le(), window.addEventListener("resize", le);
    const Se = new ResizeObserver(le);
    return K.current && Se.observe(K.current), () => {
      window.removeEventListener("resize", le), Se.disconnect();
    };
  }, [N, r.length]), u.useEffect(() => {
    if (p && p.length > 0) {
      k(p);
      return;
    }
    if (O.current || !e && !i) return;
    O.current = !0;
    let le = !0;
    return (async () => {
      L(!0);
      try {
        const $ = await fetch("/api/v1/dashboard/tabs");
        if ($.ok && le) {
          const ee = await $.json();
          Array.isArray(ee) && k(ee);
        }
      } catch ($) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", $);
      } finally {
        le && L(!1);
      }
    })(), () => {
      le = !1;
    };
  }, [e, i, p]);
  const Z = u.useMemo(() => {
    const le = _.length > 0 ? _ : p;
    if (le && le.length > 0) {
      const Se = le.map(($) => {
        const ee = $.hostnames || $.assignedHostnames || $.stations || $.stationIds || [], V = r.filter((q) => {
          const X = (q.hostname || q.name || "").trim().toLowerCase();
          return ee.some((Q) => typeof Q == "string" ? Q.trim().toLowerCase() === X || X.includes(Q.trim().toLowerCase()) : (Q.hostname || Q.name || "").trim().toLowerCase() === X);
        }).map((q) => q.id);
        return {
          id: String($.id || $.tabId || $.name),
          name: $.name || "Tab",
          stationIds: V
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map(($) => $.id) },
        ...Se.filter(($) => $.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((Se) => Se.id) }];
  }, [_, p, r]), Y = u.useMemo(() => Z.find((le) => le.id === g) || Z[0], [Z, g]), Le = u.useMemo(() => !Y || Y.id === "all" ? r.map((le) => le.id) : Y.stationIds || [], [Y, r]), Be = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter((le) => le.isLoaded || le.segments && le.segments.length > 0).length : r.filter((le) => y[le.id] !== void 0 || le.isLoaded).length, [r, y]), je = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && Be < r.length && Object.keys(y).length > 0), [d, c, r.length, Be, y]), et = u.useMemo(() => {
    const le = /* @__PURE__ */ new Map(), Se = { baseEpochMs: S, durationMs: M };
    for (const $ of r) {
      const V = !(y && y[$.id] !== void 0 || $.isLoaded === !0 || $.segments && $.segments.length > 0) && (je || c || d), q = y && y[$.id] || $.segments || [], X = $x($, q, Se);
      le.set($.id, {
        ...X,
        hasAudio: $.hasAudio !== void 0 ? $.hasAudio : X == null ? void 0 : X.hasAudio,
        audioLabel: $.audioLabel || ($.hasAudio ? "AAC" : (X == null ? void 0 : X.audioLabel) || "NONE"),
        audioChannels: $.audioChannels ? $.audioChannels === 1 ? "Mono" : "Stereo" : X == null ? void 0 : X.audioChannels,
        feedSpec: $.feedSpec || (X == null ? void 0 : X.feedSpec) || `${$.resolution || "1080p"} • ${$.fps || 30}fps`,
        resolution: $.resolution || (X == null ? void 0 : X.resolution) || "1080p",
        fps: $.fps || (X == null ? void 0 : X.fps) || 30,
        isLoading: V
      });
    }
    return le;
  }, [r, y, S, M, je, c, d]), be = u.useMemo(() => r.filter((le) => {
    const Se = et.get(le.id), $ = y && y[le.id] && y[le.id].length > 0 || le.segments && le.segments.length > 0, ee = Se && (Se.coveragePct > 0 || Se.totalRecordedMs > 0), V = typeof le.recordingsCount == "number" && le.recordingsCount > 0;
    return Se && !Se.isLoading ? ee || $ : V || $;
  }), [r, et, y]), Ie = u.useMemo(() => be.filter((le) => {
    if (Y.id !== "all" && !Le.includes(le.id) || !(le.displayName || le.hostname || le.name || "").toLowerCase().includes(T.toLowerCase())) return !1;
    const $ = l.includes(le.id), ee = et.get(le.id);
    return A === "selected" ? $ : A === "unselected" ? !$ : A === "gaps" ? ee == null ? void 0 : ee.hasGaps : A === "audio" ? ee == null ? void 0 : ee.hasAudio : !0;
  }).sort((le, Se) => b ? (le.displayName || le.hostname || "").localeCompare(Se.displayName || Se.hostname || "") : 0), [be, Y, Le, T, A, l, b, et]), tt = u.useMemo(() => N !== null ? N : Ie.length > Lx ? "table" : "grid", [N, Ie.length]), at = tt === "table" ? B : ne, ie = Math.max(1, Math.ceil(Ie.length / at));
  u.useEffect(() => {
    U(1);
  }, [g, T, A, tt]), u.useEffect(() => {
    I > ie && U(ie);
  }, [ie, I]);
  const ke = u.useMemo(() => {
    if (te !== "is-full-width") return Ie;
    const le = (I - 1) * at;
    return Ie.slice(le, le + at);
  }, [Ie, I, at, te]), Ke = () => {
    if (!a) return;
    const le = Y.id === "all" ? Ie.map((Se) => Se.id) : Le;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...le])));
  }, Ve = () => {
    if (!a) return;
    const le = new Set(
      Y.id === "all" ? Ie.map((Se) => Se.id) : Le
    );
    a(l.filter((Se) => !le.has(Se)));
  }, me = Le.filter((le) => l.includes(le)).length, fe = Ie.filter((le) => l.includes(le.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${te}`, children: [
    te !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => te === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            je && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              Be,
              "/",
              r.length
            ] })
          ] })
        ] }),
        te === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      te === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: Ke,
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
            onClick: Ve,
            disabled: fe === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                fe,
                ")"
              ] })
            ]
          }
        )
      ] }),
      je && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? Be / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: R ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : oe ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: f, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: te === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      te === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      te === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${je ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: je ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: je ? `ANALYZING TIMELINE ARCHIVES • ${Be} OF ${be.length} STATIONS SYNCED (${be.length > 0 ? Math.min(100, Math.round(Be / be.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${be.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: je ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(Be / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Mx,
        {
          searchTerm: T,
          onSearchChange: w,
          sortAlpha: b,
          onToggleSort: () => h(!b),
          effectiveTabs: Z,
          selectedTabId: g,
          onSelectTab: (le) => {
            m(le), P(null);
          },
          isLoadingTabs: W,
          allStations: be,
          selectedStationIds: l,
          filterMode: A,
          onFilterModeChange: E,
          filteredCount: Ie.length,
          selectedInTabCount: me,
          unselectedInTabCount: Le.length - me,
          activeTabName: Y.name,
          onSelectAllInScope: Ke,
          onClearInScope: Ve,
          viewMode: tt,
          onViewModeChange: te === "is-full-width" ? P : null,
          isDrawerMode: te !== "is-full-width"
        }
      ),
      te === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: Ke,
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
              onClick: Ve,
              disabled: fe === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  fe,
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
      te === "is-full-width" && tt === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${te === "is-full-width" ? tt === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: ke.map((le) => {
            const Se = l.includes(le.id), $ = et.get(le.id);
            return te === "is-full-width" ? tt === "grid" ? /* @__PURE__ */ s.jsx(
              jx,
              {
                station: le,
                isSelected: Se,
                onToggle: o,
                meta: $
              },
              le.id
            ) : /* @__PURE__ */ s.jsx(
              Cx,
              {
                station: le,
                isSelected: Se,
                onToggle: o,
                meta: $
              },
              le.id
            ) : /* @__PURE__ */ s.jsx(
              Sx,
              {
                station: le,
                isSelected: Se,
                onToggle: o,
                meta: $
              },
              le.id
            );
          })
        }
      ),
      te === "is-full-width" && /* @__PURE__ */ s.jsx(
        bx,
        {
          currentPage: I,
          totalPages: ie,
          pageSize: at,
          totalItems: Ie.length,
          onPageChange: U,
          onPageSizeChange: (le) => {
            tt === "table" ? re(le) : H(le), U(1);
          },
          viewMode: tt
        }
      ),
      te === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Ix,
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
const On = (e) => String(e).padStart(2, "0"), Dx = [
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
], Px = [
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
function ih({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [a, i] = u.useState(e), [c, d] = u.useState(null), v = u.useRef(null), { h: f, m: p, s: y } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const E = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, E[0] || 0)),
      m: Math.min(59, Math.max(0, E[1] || 0)),
      s: Math.min(59, Math.max(0, E[2] || 0))
    };
  }, [e]), S = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const M = () => {
    const N = a.replace(/[^0-9:]/g, "").trim().split(":").filter((re) => re.length > 0);
    let P = 0, W = 0, L = 0;
    N.length >= 1 && (P = Math.min(23, Math.max(0, parseInt(N[0], 10) || 0))), N.length >= 2 && (W = Math.min(59, Math.max(0, parseInt(N[1], 10) || 0))), N.length >= 3 && l && (L = Math.min(59, Math.max(0, parseInt(N[2], 10) || 0)));
    const B = l ? `${On(P)}:${On(W)}:${On(L)}` : `${On(P)}:${On(W)}`;
    i(B), t && t(B, { h: P, m: W, s: L });
  }, _ = (E) => {
    let N = f;
    E === "AM" && f >= 12 ? N = f - 12 : E === "PM" && f < 12 && (N = f + 12);
    const P = l ? `${On(N)}:${On(p)}:${On(y)}` : `${On(N)}:${On(p)}`;
    i(P), t && t(P, { h: N, m: p, s: y });
  }, k = u.useCallback((E, N) => {
    if (!v.current) return null;
    const P = v.current.getBoundingClientRect(), W = P.left + P.width / 2, L = P.top + P.height / 2, B = E.clientX - W, re = E.clientY - L;
    let ne = Math.atan2(re, B) * 180 / Math.PI + 90;
    if (ne < 0 && (ne += 360), N === "hours") {
      const H = Math.round(ne / 30) % 12;
      return S ? H === 0 ? 12 : H + 12 : H === 0 ? 0 : H;
    }
    return Math.round(ne / 6) % 60;
  }, [S]), g = u.useCallback((E, N) => {
    let P = f, W = p, L = y;
    E === "hours" ? P = N : E === "minutes" ? W = N : E === "seconds" && (L = N);
    const B = l ? `${On(P)}:${On(W)}:${On(L)}` : `${On(P)}:${On(W)}`;
    i(B), t && t(B, { h: P, m: W, s: L });
  }, [f, p, y, l, t]), m = (E, N) => {
    N.preventDefault(), N.stopPropagation(), d(E);
    const P = k(N, E);
    P !== null && g(E, P);
  };
  u.useEffect(() => {
    if (!c) return;
    const E = (P) => {
      const W = k(P, c);
      W !== null && g(c, W);
    }, N = () => {
      d(null);
    };
    return window.addEventListener("pointermove", E), window.addEventListener("pointerup", N), () => {
      window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", N);
    };
  }, [c, k, g]);
  const T = u.useMemo(() => f % 12 * 30, [f]), w = u.useMemo(() => p % 60 * 6, [p]), b = u.useMemo(() => y % 60 * 6, [y]), h = S ? Px : Dx, A = u.useMemo(() => {
    const E = [];
    for (let N = 0; N < 60; N++) {
      const P = (N * 6 - 90) * (Math.PI / 180), W = N % 5 === 0, L = 104, B = W ? 93 : 98;
      E.push({
        index: N,
        x1: 110 + B * Math.cos(P),
        y1: 110 + B * Math.sin(P),
        x2: 110 + L * Math.cos(P),
        y2: 110 + L * Math.sin(P),
        isMajor: W
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
              className: `btn-period ${S ? "" : "active"}`,
              onClick: () => _("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${S ? "active" : ""}`,
              onClick: () => _("PM"),
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
            onBlur: M,
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: A.map((E) => /* @__PURE__ */ s.jsx(
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
            const N = (E.angle - 90) * (Math.PI / 180), P = 76, W = 110 + P * Math.cos(N), L = 110 + P * Math.sin(N), B = f === E.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: W,
                y: L,
                className: `dial-num ${B ? "selected" : ""}`,
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
                    onPointerDown: (E) => m("hours", E)
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
                    onPointerDown: (E) => m("minutes", E)
                  }
                )
              ]
            }
          ),
          l && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${c === "seconds" ? "dragging" : ""}`,
              transform: `rotate(${b} 110 110)`,
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
                    onPointerDown: (E) => m("seconds", E)
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
const na = 7 * 24 * 60 * 60 * 1e3, Yt = (e) => String(e).padStart(2, "0");
function _x({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, v] = u.useState(""), [f, p] = u.useState("00:00:00"), [y, S] = u.useState("00:00:00"), [M, _] = u.useState(() => /* @__PURE__ */ new Date()), [k, g] = u.useState(null), [m, T] = u.useState([]), [w, b] = u.useState(!1), [h, A] = u.useState(""), [E, N] = u.useState(1), [P, W] = u.useState(2), [L, B] = u.useState(null), re = u.useCallback(() => {
    try {
      const ie = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (ie) {
        const ke = JSON.parse(ie);
        Array.isArray(ke) && T(ke);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((ie) => ie.ok ? ie.json() : null).then((ie) => {
      Array.isArray(ie) && ie.length > 0 && T(ie);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    re();
    let ie = n == null ? void 0 : n.startEpochMs, ke = n == null ? void 0 : n.endEpochMs;
    if (!ie || isNaN(ie))
      if (n != null && n.start) {
        const me = String(n.start).replace(" ", "T"), fe = new Date(me).getTime();
        ie = isNaN(fe) ? Date.now() - 24 * 3600 * 1e3 : fe;
      } else
        ke = Date.now(), ie = ke - 24 * 3600 * 1e3;
    if (!ke || isNaN(ke))
      if (n != null && n.end) {
        const me = String(n.end).replace(" ", "T"), fe = new Date(me).getTime();
        ke = isNaN(fe) ? Date.now() : fe;
      } else
        ke = ie + 24 * 3600 * 1e3;
    B(null);
    const Ke = Lr(ie, o), Ve = Lr(ke, o);
    c(`${Ke.year}-${Yt(Ke.month)}-${Yt(Ke.day)}`), v(`${Ve.year}-${Yt(Ve.month)}-${Yt(Ve.day)}`), p(`${Yt(Ke.hour)}:${Yt(Ke.minute)}:${Yt(Ke.second)}`), S(`${Yt(Ve.hour)}:${Yt(Ve.minute)}:${Yt(Ve.second)}`), _(new Date(Date.UTC(Ke.year, Ke.month - 1, 1)));
  }, [e, n, o, re]);
  const ne = u.useCallback(() => {
    i && !d && v(i);
  }, [i, d]), H = d || i, I = u.useMemo(() => i ? `${i}T${f}` : "", [i, f]), U = u.useMemo(() => H ? `${H}T${y}` : "", [H, y]), O = u.useMemo(() => {
    const ie = {};
    return m.forEach((ke) => {
      const Ke = ke.startTime || ke.start, Ve = ke.endTime || ke.end || Ke;
      if (!Ke) return;
      const me = String(Ke).substring(0, 10), fe = String(Ve).substring(0, 10), [le, Se, $] = me.split("-").map(Number), [ee, V, q] = fe.split("-").map(Number);
      if (isNaN(le) || isNaN(Se) || isNaN($) || isNaN(ee) || isNaN(V) || isNaN(q)) return;
      let X = new Date(Date.UTC(le, Se - 1, $));
      const Q = new Date(Date.UTC(ee, V - 1, q));
      for (; X.getTime() <= Q.getTime(); ) {
        const ce = `${X.getUTCFullYear()}-${Yt(X.getUTCMonth() + 1)}-${Yt(X.getUTCDate())}`;
        ie[ce] || (ie[ce] = []), ie[ce].push(ke), X.setUTCDate(X.getUTCDate() + 1);
      }
    }), ie;
  }, [m]), K = async (ie, ke) => {
    if (ke && ke.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const Ke = m.filter((Ve) => (Ve.id || Ve.startTime) !== ie);
    T(Ke);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(Ke)), localStorage.setItem("itb_bookmarks", JSON.stringify(Ke)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: Ke }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${ie}`, { method: "DELETE" });
    } catch {
    }
  }, R = (ie) => {
    const ke = ie.startTime || ie.start, Ke = ie.endTime || ie.end;
    if (!ke || !Ke) return;
    const Ve = ke.substring(0, 10), me = ke.includes("T") ? ke.split("T")[1].substring(0, 8) : "00:00:00", fe = Ke.substring(0, 10), le = Ke.includes("T") ? Ke.split("T")[1].substring(0, 8) : "23:59:59";
    c(Ve), v(fe), p(me), S(le);
    const [Se, $] = Ve.split("-").map(Number);
    _(new Date(Date.UTC(Se, $ - 1, 1))), b(!1);
  }, oe = (ie) => {
    l ? (l(ie), t && t()) : R(ie);
  }, te = u.useMemo(() => {
    if (o === "UTC" || !I.includes("T")) return { isAmbiguous: !1 };
    const [ie, ke] = I.split("T");
    return Wa(ie, ke);
  }, [I, o]), Z = u.useMemo(() => {
    if (o === "UTC" || !U.includes("T")) return { isAmbiguous: !1 };
    const [ie, ke] = U.split("T");
    return Wa(ie, ke);
  }, [U, o]), Y = u.useMemo(() => {
    if (!i || !H) return null;
    const ie = Oc(i, f, o, E), ke = Oc(H, y, o, P);
    return ie === null || ke === null || isNaN(ie) || isNaN(ke) ? null : { startEpoch: ie, endEpoch: ke, durationMs: ke - ie };
  }, [i, f, H, y, o, E, P]), Le = u.useMemo(() => !Y || Y.durationMs <= 0 ? [] : bp(Y.startEpoch, Y.endEpoch), [Y]), Be = u.useMemo(() => {
    if (!Y || Y.durationMs <= 0) return "0h";
    const ie = Y.durationMs / (1e3 * 60 * 60);
    return ie >= 24 ? `${(ie / 24).toFixed(1)}d (${ie.toFixed(0)}h)` : `${ie.toFixed(1)}h`;
  }, [Y]), je = u.useMemo(() => {
    const ie = M.getUTCFullYear(), ke = M.getUTCMonth(), Ke = new Date(Date.UTC(ie, ke, 1)).getUTCDay(), Ve = new Date(Date.UTC(ie, ke + 1, 0)).getUTCDate(), me = [];
    for (let fe = 0; fe < Ke; fe++) me.push(null);
    for (let fe = 1; fe <= Ve; fe++) me.push(`${ie}-${Yt(ke + 1)}-${Yt(fe)}`);
    return me;
  }, [M]), et = (ie) => {
    if (ie) {
      if (B(null), !i || i && d)
        c(ie), v("");
      else if (i && !d)
        if (ie < i)
          c(ie), v("");
        else {
          const ke = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(ie + "T00:00:00Z")).getTime() - ke > na) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const Ve = new Date(ke + na);
            v(`${Ve.getUTCFullYear()}-${Yt(Ve.getUTCMonth() + 1)}-${Yt(Ve.getUTCDate())}`);
          } else
            v(ie);
        }
    }
  }, be = (ie, ke) => {
    B(ke);
    const Ke = Date.now(), Ve = Ke - ie, me = Lr(Ve, o), fe = Lr(Ke, o);
    c(`${me.year}-${Yt(me.month)}-${Yt(me.day)}`), v(`${fe.year}-${Yt(fe.month)}-${Yt(fe.day)}`), p(`${Yt(me.hour)}:${Yt(me.minute)}:${Yt(me.second)}`), S(`${Yt(fe.hour)}:${Yt(fe.minute)}:${Yt(fe.second)}`), _(new Date(Date.UTC(me.year, me.month - 1, 1)));
  }, Ie = () => {
    if (ne(), !Y || isNaN(Y.startEpoch) || isNaN(Y.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (Y.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (Y.durationMs > na) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: I,
      end: U,
      startEpochMs: Y.startEpoch,
      endEpochMs: Y.endEpoch,
      durationMs: Y.durationMs,
      timeMode: o
    }), t && t();
  }, tt = u.useMemo(() => {
    if (!h.trim()) return m;
    const ie = h.toLowerCase();
    return m.filter(
      (ke) => (ke.title || ke.name || "").toLowerCase().includes(ie) || (ke.startTime || "").includes(ie)
    );
  }, [m, h]);
  if (!e) return null;
  const at = o === "UTC";
  return Ls.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (ie) => ie.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${at ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: at ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${at ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${at ? "active" : ""}`,
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
                onClick: () => b(!w),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: m.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      Le.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Le.map((ie) => `${ie.description} (${ie.labelBefore} ➔ ${ie.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${L === "7d" ? "active" : ""}`,
            onClick: () => be(7 * 24 * 3600 * 1e3, "7d"),
            children: [
              "7d Week Max ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${L === "3d" ? "active" : ""}`,
            onClick: () => be(3 * 24 * 3600 * 1e3, "3d"),
            children: [
              "3d Block ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${L === "24h" ? "active" : ""}`,
            onClick: () => be(24 * 3600 * 1e3, "24h"),
            children: [
              "24h Day ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${L === "8h" ? "active" : ""}`,
            onClick: () => be(8 * 3600 * 1e3, "8h"),
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
                onChange: (ie) => A(ie.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            tt.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: tt.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : tt.map((ie) => {
          var fe;
          const ke = ie.id || ie.startTime, Ke = ie.title || ie.name || "Untitled Mission", Ve = (ie.startTime || "").replace("T", " "), me = (ie.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => R(ie), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: Ke }),
                ie.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  ie.cutStationName
                ] }),
                ((fe = ie.stationIds) == null ? void 0 : fe.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  ie.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                Ve,
                " ➔ ",
                me
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (le) => {
                    le.stopPropagation(), R(ie);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (le) => {
                    le.stopPropagation(), oe(ie);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (le) => K(ke, le),
                  children: "✕"
                }
              )
            ] })
          ] }, ke);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: M.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => _((ie) => new Date(Date.UTC(ie.getUTCFullYear(), ie.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => _((ie) => new Date(Date.UTC(ie.getUTCFullYear(), ie.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: je.map((ie, ke) => {
            if (!ie) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${ke}`);
            const Ke = parseInt(ie.split("-")[2], 10), Ve = ie === i, me = ie === (d || i), fe = d || k, le = i && fe && ie > i && ie < fe, Se = O[ie], $ = !!(Se && Se.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${Ve ? "start-edge" : ""} ${me ? "end-edge" : ""} ${le ? "in-range" : ""} ${$ ? "has-bookmark" : ""}`,
                onClick: () => et(ie),
                onMouseEnter: () => !d && i && g(ie),
                onMouseLeave: () => g(null),
                title: $ ? `${Se.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: Ke }),
                  $ && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (ee) => {
                        ee.stopPropagation(), b(!0), A(ie);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Se.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Se.length })
                      ]
                    }
                  )
                ]
              },
              ie
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: ne, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            ih,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (ie) => {
                ne(), p(ie), B(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            ih,
            {
              label: "END TIME (TO)",
              value: y,
              onChange: (ie) => {
                ne(), S(ie), B(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (te.isAmbiguous || Z.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        te.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
            te.transition.labelBefore,
            " / ",
            te.transition.labelAfter,
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
                  te.transition.labelBefore,
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
                  te.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        Z.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            Z.transition.labelBefore,
            " / ",
            Z.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: P === 1 ? "active" : "",
                onClick: () => W(1),
                children: [
                  "1st Occurrence (",
                  Z.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: P === 2 ? "active" : "",
                onClick: () => W(2),
                children: [
                  "2nd Occurrence (",
                  Z.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: Y && Y.durationMs > na ? "#f43f5e" : "#22d3ee" }, children: Be }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Le.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Ie, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Bp = "extractor_incident_bookmarks_fallback", Fx = ["itb_studio_bookmarks", "itb_bookmarks", Bp];
function Bx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [v, f] = u.useState(!1), [p, y] = u.useState(!1), [S, M] = u.useState(null), [_, k] = u.useState(""), g = u.useCallback((L) => {
    Fx.forEach((B) => {
      try {
        localStorage.setItem(B, JSON.stringify(L));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: L }));
  }, []), m = u.useCallback(async () => {
    f(!0);
    try {
      const L = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (L.ok) {
        const B = await L.json(), re = Array.isArray(B) ? B : [];
        i(re), g(re);
        return;
      }
    } catch (L) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", L);
    } finally {
      f(!1);
    }
    try {
      const L = localStorage.getItem(Bp) || localStorage.getItem("itb_studio_bookmarks");
      L && i(JSON.parse(L));
    } catch {
    }
  }, [g]);
  if (u.useEffect(() => {
    e && m();
  }, [e, m]), !e) return null;
  const T = async () => {
    var te, Z, Y, Le, Be, je;
    if (!c.trim() || p) return;
    const L = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((te = n == null ? void 0 : n.timeRange) != null && te.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), B = (n == null ? void 0 : n.inPointMs) ?? 0, re = (n == null ? void 0 : n.outPointMs) ?? (((Z = n == null ? void 0 : n.timeRange) == null ? void 0 : Z.durationMs) || 0), ne = (n == null ? void 0 : n.playheadMs) ?? B, H = L + B, I = L + re, U = L + ne, O = (n == null ? void 0 : n.selectedStationIds) || [], K = (n == null ? void 0 : n.selectedStationNames) || [], R = ((Y = n == null ? void 0 : n.allStationIds) == null ? void 0 : Y.length) > 0 ? n.allStationIds : O, oe = {
      title: c.trim(),
      startTime: ((Le = n == null ? void 0 : n.timeRange) == null ? void 0 : Le.start) || "",
      endTime: ((Be = n == null ? void 0 : n.timeRange) == null ? void 0 : Be.end) || "",
      baseEpochMs: L,
      timelineBaseEpochMs: L,
      inPointMs: B,
      outPointMs: re,
      playheadMs: ne,
      inEpochMs: H,
      outEpochMs: I,
      playheadEpochMs: U,
      selectedStationIds: O,
      selectedStationNames: K,
      allStationIds: R,
      stationIds: O.length > 0 ? O : R,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    y(!0);
    try {
      const et = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(oe)
      });
      if (et.ok) {
        const be = await et.json(), tt = [{
          ...oe,
          ...be.bookmark || {},
          inEpochMs: H,
          outEpochMs: I,
          playheadEpochMs: U,
          selectedStationIds: O,
          selectedStationNames: K,
          allStationIds: R,
          id: ((je = be.bookmark) == null ? void 0 : je.id) || be.id || `bm_${Date.now()}`
        }, ...a];
        i(tt), g(tt), d("");
      } else
        throw new Error(`Server returned ${et.status}`);
    } catch (et) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", et);
      const Ie = [{
        ...oe,
        inEpochMs: H,
        outEpochMs: I,
        playheadEpochMs: U,
        selectedStationIds: O,
        selectedStationNames: K,
        allStationIds: R,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(Ie), g(Ie), d("");
    } finally {
      y(!1);
    }
  }, w = async (L, B) => {
    if (B.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const re = a.filter((ne) => (ne.id || ne.startTime) !== L);
    i(re), g(re);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${L}`, { method: "DELETE" });
    } catch (ne) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", ne);
    }
  }, b = (L, B) => {
    B.stopPropagation(), M(L.id || L.startTime), k(L.title || L.name || "");
  }, h = async (L, B) => {
    if (B && B.stopPropagation(), !_.trim()) return;
    const re = a.find((I) => (I.id || I.startTime) === L), ne = _.trim(), H = a.map(
      (I) => (I.id || I.startTime) === L ? { ...I, title: ne, name: ne } : I
    );
    i(H), g(H), M(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${L}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...re, title: ne })
      });
    } catch (I) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", I);
    }
  }, A = (L) => {
    L.stopPropagation(), M(null);
  }, E = (L) => !L || isNaN(L) ? "--:--:--" : jt(L, o), N = (L) => {
    const B = L.startTime || L.StartTime, re = L.endTime || L.EndTime;
    if (!B) return "--";
    const ne = String(B).replace("T", " ").substring(0, 19), H = re ? String(re).replace("T", " ").substring(0, 19) : ne;
    return `${ne} ➔ ${H}`;
  }, P = (L) => {
    let B = L.inEpochMs || L.InEpochMs, re = L.outEpochMs || L.OutEpochMs;
    if (!B || !re) {
      const ne = L.timelineBaseEpochMs || L.baseEpochMs || (L.startTime ? new Date(String(L.startTime).replace(" ", "T")).getTime() : 0), H = L.inPointMs ?? L.InPointMs, I = L.outPointMs ?? L.OutPointMs;
      ne && typeof H == "number" && typeof I == "number" && (H > 0 || I > 0) && (B = ne + H, re = ne + I);
    }
    if (B && re && !isNaN(B) && !isNaN(re) && B > 0) {
      const ne = E(B), H = E(re), I = Math.max(0, re - B), U = Math.floor(I / 6e4), O = Math.floor(U / 60), K = U % 60, R = O > 0 ? `${O}h ${K}m` : `${U}m`;
      return { timeText: `${ne} ➔ ${H}`, duration: R };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, W = (L) => {
    const B = L.selectedStationNames || [], re = L.selectedStationIds || L.cutStationIds || L.stationIds || [];
    return B.length > 0 ? B.join(", ") : re.length > 0 ? re.join(", ") : L.cutStationName ? L.cutStationName : L.activeStationName ? L.activeStationName : "All Stations in Scope";
  };
  return Ls.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "bookmarks-modal-overlay", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-modal-card", onClick: (L) => L.stopPropagation(), children: [
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
              onChange: (L) => d(L.target.value),
              onKeyDown: (L) => L.key === "Enter" && T(),
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
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: v ? "SYNCING..." : `${a.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: a.length === 0 && !v ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : a.map((L) => {
        var U, O, K;
        const B = L.id || L.startTime, re = S === B, ne = P(L), H = W(L), I = ((U = L.allStationIds) == null ? void 0 : U.length) || ((O = L.selectedStationIds) == null ? void 0 : O.length) || ((K = L.stationIds) == null ? void 0 : K.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${re ? "is-editing" : ""}`,
            onClick: () => {
              re || (r && r(L), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                re ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (R) => R.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: _,
                      onChange: (R) => k(R.target.value),
                      onKeyDown: (R) => {
                        R.key === "Enter" && h(B, R), R.key === "Escape" && A(R);
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
                        onClick: (R) => h(B, R),
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
                  /* @__PURE__ */ s.jsx("span", { className: "bm-title", children: L.title || L.name || "Untitled Event" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-time-tag", children: L.createdAt ? new Date(L.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
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
                    /* @__PURE__ */ s.jsx("strong", { children: N(L) })
                  ] }),
                  I > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    I,
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
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${H}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: H })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (R) => R.stopPropagation(), children: [
                !re && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (R) => b(L, R),
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
                    onClick: (R) => w(B, R),
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
const ch = {
  USER: "itb_auth_user",
  ROLES: "itb_auth_roles"
};
function Up() {
  try {
    if (typeof window > "u") return "Guest Operator";
    const e = sessionStorage.getItem(ch.USER) || localStorage.getItem(ch.USER);
    if (e) {
      const t = JSON.parse(e), n = (t == null ? void 0 : t.displayName) || (t == null ? void 0 : t.username);
      if (n && typeof n == "string" && n.trim())
        return n.trim();
    }
  } catch {
  }
  return "Guest Operator";
}
function Ux(e) {
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
function Wx(e, t) {
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
function zx({
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
  isLooping: f = !0,
  recordingSegments: p = {},
  globalGaps: y = [],
  showWatermark: S = !0,
  directorPlan: M,
  onOverrideDisplay: _,
  onResetOverride: k,
  viewMode: g,
  onViewModeChange: m,
  onOpenFullscreen: T,
  isPipSwapped: w,
  onPipSwapChange: b,
  className: h = ""
}) {
  const A = u.useRef(null), E = u.useRef(null), N = u.useRef(null), P = u.useRef(r), W = u.useRef(r), L = u.useRef(r), B = u.useRef(!1), re = u.useRef(null), ne = u.useRef(o), H = u.useRef(!1);
  P.current = r;
  const I = e == null ? void 0 : e.id, U = e && (e.hostname || e.name) || "", O = u.useMemo(() => {
    var Ue, Je, ut, dt;
    const z = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ue = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ue.displays) || ((Je = e == null ? void 0 : e.displayTopology) == null ? void 0 : Je.Displays) || ((ut = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : ut.Displays) || ((dt = e == null ? void 0 : e.topology) == null ? void 0 : dt.displays) || [];
    if (!Array.isArray(z) || z.length === 0) return [];
    const he = z.length > 1 && z.every((qe) => (qe.X ?? qe.x ?? 0) === 0 && (qe.Y ?? qe.y ?? 0) === 0);
    let pe = 0;
    return z.map((qe, ht) => {
      const St = qe.Width || qe.width || 1920, Mt = qe.Height || qe.height || 1080, Pt = he ? pe : qe.X ?? qe.x ?? ht * St, rn = he ? 0 : qe.Y ?? qe.y ?? 0;
      he && (pe += St);
      const _t = (qe.displayId ?? qe.DisplayId ?? `mon-${ht}`).toLowerCase(), zt = qe.displayNumber ?? qe.DisplayNumber ?? ht + 1, At = (qe.displayName || qe.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${zt}`, $n = !!(qe.isPrimary ?? qe.IsPrimary ?? ht === 0);
      return {
        ...qe,
        displayId: _t,
        DisplayId: _t,
        displayIndex: ht,
        displayNumber: zt,
        DisplayNumber: zt,
        displayName: At,
        DisplayName: At,
        isPrimary: $n,
        IsPrimary: $n,
        x: Pt,
        y: rn,
        X: Pt,
        Y: rn,
        width: St,
        height: Mt,
        Width: St,
        Height: Mt
      };
    });
  }, [e]), K = O.length > 1, [R, oe] = u.useState(() => {
    if (!K) return "mon-0";
    try {
      const z = localStorage.getItem("itb_solo_viewmode");
      if (z) return z;
    } catch {
    }
    return "canvas";
  }), Z = K ? g !== void 0 ? g : R : "mon-0", Y = u.useCallback((z) => {
    const he = typeof z == "function" ? z(Z) : z;
    oe(he);
    try {
      localStorage.setItem("itb_solo_viewmode", he);
    } catch {
    }
    m && m(he);
  }, [Z, m]), [Le, Be] = u.useState(!1), je = w !== void 0 ? w : Le, et = u.useCallback((z) => {
    const he = typeof z == "function" ? z(je) : z;
    Be(he), b && b(he);
  }, [je, b]), be = u.useMemo(() => {
    const z = M || (e == null ? void 0 : e.directorPlan);
    if (!z || !z.segments || z.segments.length === 0) return null;
    const he = t + r;
    return z.segments.find((pe) => {
      const Ue = pe.startEpochMs ?? pe.StartEpochMs ?? 0, Je = pe.endEpochMs ?? pe.EndEpochMs ?? 0;
      return he >= Ue && he <= Je;
    }) || z.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t, r]), Ie = u.useMemo(() => {
    var z, he;
    if (!K) return "mon-0";
    if (Z === "split" || Z === "pip" || Z === "canvas" || Z === "all-displays") {
      const pe = (((z = O[0]) == null ? void 0 : z.displayId) ?? "mon-0").toLowerCase(), Ue = (((he = O[1]) == null ? void 0 : he.displayId) ?? "mon-1").toLowerCase();
      return je ? Ue : pe;
    }
    return Z !== "director" ? Z.toLowerCase() : ((be == null ? void 0 : be.targetDisplayId) ?? (be == null ? void 0 : be.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [K, Z, be, O, je]), tt = u.useMemo(() => {
    var he;
    if (!K) return null;
    const z = O.find((pe) => (pe.displayId ?? pe.DisplayId ?? "").toLowerCase() !== Ie);
    return z ? (z.displayId ?? z.DisplayId).toLowerCase() : (((he = O[1]) == null ? void 0 : he.displayId) || "mon-1").toLowerCase();
  }, [K, O, Ie]), at = u.useMemo(() => {
    const z = O.find((pe) => (pe.displayId ?? "").toLowerCase() === (Ie || "").toLowerCase());
    if (z) return z.displayName || `Screen ${z.displayNumber || 1}`;
    if (Ie === "mon-0" || Ie === "0") return "Screen 1";
    if (Ie === "mon-1" || Ie === "1") return "Screen 2";
    const he = (Ie || "").match(/\d+/);
    if (he) {
      const pe = parseInt(he[0], 10);
      return `Screen ${(Ie || "").startsWith("mon-") ? pe + 1 : pe}`;
    }
    return (Ie || "Screen 1").toUpperCase();
  }, [O, Ie]), ie = u.useMemo(() => {
    const z = O.find((he) => (he.displayId ?? "").toLowerCase() === (tt || "").toLowerCase());
    return z ? z.displayName || `Screen ${z.displayNumber || 2}` : "Screen 2";
  }, [O, tt]), ke = u.useMemo(() => Z !== "director" && Z !== "split" && Z !== "pip" && Z !== "canvas" ? !0 : !!((be == null ? void 0 : be.isManualOverride) ?? (be == null ? void 0 : be.IsManualOverride)), [Z, be]), [Ke, Ve] = u.useState({}), me = u.useRef(null), [fe, le] = u.useState({ width: 0, height: 0 }), Se = u.useMemo(() => Ux(O), [O]);
  u.useEffect(() => {
    if (!K || Z !== "canvas" && Z !== "all-displays" || o)
      return;
    const z = () => {
      const pe = me.current;
      if (!pe) return;
      const Ue = 48, Je = 72, ut = Math.max(100, pe.clientWidth - Ue), dt = Math.max(100, pe.clientHeight - Je), qe = Se.totalWidth || 1920, ht = Se.totalHeight || 1080, St = qe / ht;
      let Mt = ut, Pt = Mt / St;
      Pt > dt && (Pt = dt, Mt = Pt * St), le({ width: Math.round(Mt), height: Math.round(Pt) });
    };
    z();
    const he = new ResizeObserver(z);
    return me.current && he.observe(me.current), () => he.disconnect();
  }, [K, Z, Se]);
  const $ = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!K || Z !== "canvas" && Z !== "all-displays")
      return;
    let z = !0;
    const he = new AbortController(), pe = $;
    O.forEach((Je, ut) => {
      const dt = (Je.displayId ?? Je.DisplayId ?? `mon-${ut}`).toLowerCase(), qe = Dn.get(U, pe, dt);
      qe ? Ve((ht) => ({ ...ht, [dt]: qe })) : Dn.fetchFrame(U, pe, he.signal, dt).then((ht) => {
        z && ht && Ve((St) => ({ ...St, [dt]: ht }));
      });
    });
    const Ue = Dn.subscribe((Je, ut, dt, qe) => {
      Je === U && ut === pe && qe && z && Ve((ht) => ({ ...ht, [qe.toLowerCase()]: dt }));
    });
    return () => {
      z = !1, he.abort(), Ue();
    };
  }, [K, Z, O, U, $]);
  const ee = u.useRef(Ie), V = u.useMemo(() => e ? p[e.id] || p[e.hostname] || e.segments || [] : [], [e, p]), q = t + r, X = u.useMemo(() => V.length === 0 ? !0 : V.some((z) => {
    const he = (z.startEpochMs ?? z.startEpoch ?? 0) - 2e3, pe = (z.endEpochMs ?? z.endEpoch ?? 0) + 2e3;
    return q >= he && q <= pe;
  }), [V, q]), Q = !X && V.length > 0, [ce, Ze] = u.useState("A"), [Oe, Ye] = u.useState(""), [ot, Ge] = u.useState(""), [Tt, Rt] = u.useState(""), [Lt, Ot] = u.useState(null), [lt, yt] = u.useState(!1), [Qe, Fe] = u.useState(!1), [Nt, Dt] = u.useState(() => {
    if (!U) return null;
    const z = Math.round(t + r);
    return Dn.get(U, z, Ie) || null;
  }), [an, cn] = u.useState(null), wn = ce === "A" ? A : E, De = u.useCallback(() => {
    const z = Nl();
    A.current && (A.current.volume = z.volume, A.current.muted = ce !== "A" || z.isMuted, A.current.defaultPlaybackRate = i, A.current.playbackRate = i, ce === "A" && !z.isMuted && za(A.current)), E.current && (E.current.volume = z.volume, E.current.muted = ce !== "B" || z.isMuted, E.current.defaultPlaybackRate = i, E.current.playbackRate = i, ce === "B" && !z.isMuted && za(E.current)), N.current && (N.current.muted = !0, N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [ce, i]);
  u.useEffect(() => {
    const z = (he) => {
      he.detail && (A.current && (A.current.volume = he.detail.volume), E.current && (E.current.volume = he.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", z), () => window.removeEventListener("itb-audio-state-changed", z);
  }, []), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i), E.current && (E.current.defaultPlaybackRate = i, E.current.playbackRate = i), N.current && (N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!I || !U) return;
    if (o) {
      ne.current = !0;
      return;
    }
    const z = ne.current;
    ne.current = o;
    let he = !0;
    const pe = new AbortController(), Ue = Math.round(t + r), Je = Dn.get(U, Ue, Ie);
    if (Je) {
      Dt(Je);
      return;
    }
    const dt = setTimeout(() => {
      he && Dn.fetchFrame(U, Ue, pe.signal, Ie).then((ht) => {
        he && ht && Dt(ht);
      });
    }, z ? 25 : 35), qe = Dn.subscribe((ht, St, Mt, Pt) => {
      ht === U && St === Ue && (!Pt || Pt === Ie) && he && Dt(Mt);
    });
    return () => {
      he = !1, clearTimeout(dt), pe.abort(), qe();
    };
  }, [I, U, t, r, o, lt, Ie]), u.useEffect(() => {
    if (!K || Z !== "split" && Z !== "pip" || !tt || o) {
      cn(null);
      return;
    }
    let z = !0;
    const he = new AbortController(), pe = Math.round(t + r), Ue = Dn.get(U, pe, tt);
    if (Ue) {
      cn(Ue);
      return;
    }
    const Je = setTimeout(() => {
      z && Dn.fetchFrame(U, pe, he.signal, tt).then((dt) => {
        z && dt && cn(dt);
      });
    }, 40), ut = Dn.subscribe((dt, qe, ht, St) => {
      dt === U && qe === pe && (!St || St === tt) && z && cn(ht);
    });
    return () => {
      z = !1, clearTimeout(Je), he.abort(), ut();
    };
  }, [K, Z, tt, I, U, t, r]);
  const Re = u.useCallback((z, he = Ie) => {
    const pe = Math.round(t), Ue = Math.round(t + n), Je = Math.min(Ue, Math.max(pe, Math.round(t + z)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(U)}&startEpoch=${pe}&endEpoch=${Ue}&seekEpoch=${Je}&displayId=${encodeURIComponent(he)}&_t=${Date.now()}`;
  }, [t, n, U, Ie]);
  u.useEffect(() => {
    if (!(!I || !U))
      if (o && X) {
        const z = P.current;
        W.current = z, L.current = z, B.current = !1;
        const he = Re(z, Ie);
        yt(!1), Fe(!0), Ze("A"), Ye(he), Ge(""), Ot(null), Rt((Z === "split" || Z === "pip") && tt ? Re(z, tt) : "");
      } else o || (re.current && clearTimeout(re.current), B.current = !1, Ye(""), Ge(""), Rt(""), Ot(null), yt(!1), Fe(!1), A.current && A.current.pause(), E.current && E.current.pause(), N.current && N.current.pause());
  }, [o, I, U, X, Re, Ie, Z, tt]), u.useEffect(() => {
    if (ee.current !== Ie && (ee.current = Ie, o && X)) {
      const z = P.current;
      W.current = z;
      const he = Re(z, Ie);
      yt(!1), Fe(!0), Ze("A"), Ye(he), Ge("");
    }
  }, [Ie, o, X, Re]), u.useEffect(() => {
    if (!I || !U) return;
    const z = Math.abs(r - L.current);
    if (!o || z < 15) {
      L.current = r;
      return;
    }
    return B.current = !0, L.current = r, W.current = r, A.current && A.current.pause(), E.current && E.current.pause(), N.current && N.current.pause(), yt(!1), Fe(!0), re.current && clearTimeout(re.current), re.current = setTimeout(() => {
      if (!X) {
        Ye(""), Ge(""), Rt(""), Fe(!1), B.current = !1;
        return;
      }
      const he = P.current, pe = Re(he, Ie);
      Ze("A"), Ye(pe), Ge(""), Ot(null), (Z === "split" || Z === "pip") && tt && Rt(Re(he, tt));
    }, 75), () => {
      re.current && clearTimeout(re.current);
    };
  }, [r, o, I, U, X, Re, Ie, Z, tt]), u.useEffect(() => {
    if (!o || !lt || V.length === 0) return;
    const z = t + P.current, he = V.map((pe) => ({
      start: pe.startEpochMs ?? pe.startEpoch ?? 0,
      end: pe.endEpochMs ?? pe.endEpoch ?? 0
    })).filter((pe) => pe.start > z + 500).sort((pe, Ue) => pe.start - Ue.start)[0];
    if (he && (!Lt || Lt.start !== he.start)) {
      const pe = he.start - t;
      if (pe < v) {
        const Ue = Re(pe, Ie);
        Ot({ start: he.start, ms: pe }), ce === "A" ? Ge(Ue) : Ye(Ue);
      }
    }
  }, [o, lt, r, t, v, V, Lt, ce, Re, Ie]);
  const st = u.useCallback(() => {
    if (Lt) {
      const z = ce === "A" ? "B" : "A", he = z === "A" ? A : E;
      Ze(z), W.current = Lt.ms, L.current = Lt.ms, Ot(null), he.current && he.current.play().then(() => {
        De();
      }).catch(() => {
      });
    } else
      f ? l(d) : a(!1);
  }, [Lt, ce, De, f, d, l, a]), ae = u.useCallback(() => {
    const z = wn.current;
    if (!z || B.current || !o || H.current) return;
    const he = z.currentTime * 1e3, pe = Math.round(W.current + he);
    if (y && y.length > 0) {
      const Ue = t + pe, Je = y.find((ut) => Ue >= ut.startEpochMs && Ue < ut.endEpochMs);
      if (Je) {
        H.current = !0;
        const ut = Math.round(Je.endEpochMs - t) + 10;
        l(ut), setTimeout(() => {
          H.current = !1;
        }, 150);
        return;
      }
    }
    if (pe >= v) {
      f ? l(d) : (a(!1), l(v));
      return;
    }
    L.current = pe, l(pe);
  }, [wn, o, t, y, v, f, d, l, a]), nt = Qe && o && !Q;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${Z} ${h}`, children: [
    K && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (z) => z.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "director" ? "active" : ""}`,
          onClick: () => Y("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "canvas" ? "active" : ""}`,
          onClick: () => Y("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "split" ? "active" : ""}`,
          onClick: () => Y("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "pip" ? "active" : ""}`,
          onClick: () => Y("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      O.map((z, he) => {
        const pe = (z.displayId ?? `mon-${he}`).toLowerCase(), Ue = z.displayNumber ?? he + 1, Je = z.displayName || `Screen ${Ue}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${Z === pe ? "active" : ""}`,
            onClick: () => Y(pe),
            title: `Pin directly to ${Je}`,
            children: [
              "🖥️ ",
              Ue
            ]
          },
          pe
        );
      }),
      Z === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          O.map((z, he) => {
            const pe = (z.displayId ?? `mon-${he}`).toLowerCase(), Ue = z.displayNumber ?? he + 1, Je = z.displayName || `Screen ${Ue}`, ut = Ie === pe;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${ut ? "active" : ""} ${ke && ut ? "is-override" : ""}`,
                onClick: () => {
                  _ == null || _(I, t + r, pe);
                },
                title: `Punch ${Je} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ue
                  ] }),
                  ut && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: ke ? "✋" : "⚡" })
                ]
              },
              `punch-${pe}`
            );
          }),
          ke && k && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                k == null || k(I, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    K && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${ke ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: Z === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : Z === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : Z === "pip" ? `🪟 PiP MODE: ${at.toUpperCase()} (HERO)` : `${ke ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${at.toUpperCase()}` }),
      ke && Z === "director" && k && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => k == null ? void 0 : k(I, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    Oe && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: A,
        src: Oe,
        className: "feed-video-element",
        style: {
          opacity: lt && ce === "A" ? 1 : 0,
          zIndex: ce === "A" ? 3 : 1,
          pointerEvents: ce === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ce === "A",
        preload: "auto",
        muted: ce !== "A" || Nl().isMuted,
        onCanPlay: () => {
          De(), o && ce === "A" && A.current && A.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ce === "A" && (B.current = !1, yt(!0), Fe(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i));
        },
        onWaiting: () => {
          ce === "A" && Fe(!0);
        },
        onTimeUpdate: () => {
          var z;
          ce === "A" && (!lt && ((z = A.current) == null ? void 0 : z.currentTime) > 0 && (B.current = !1, yt(!0), Fe(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i)), ae());
        },
        onError: () => {
          ce === "A" && (B.current = !1, Fe(!1), yt(!1));
        },
        onEnded: () => {
          ce === "A" && st();
        }
      }
    ),
    ot && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: E,
        src: ot,
        className: "feed-video-element",
        style: {
          opacity: lt && ce === "B" ? 1 : 0,
          zIndex: ce === "B" ? 3 : 1,
          pointerEvents: ce === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ce === "B",
        preload: "auto",
        muted: ce !== "B" || Nl().isMuted,
        onCanPlay: () => {
          De(), o && ce === "B" && E.current && E.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ce === "B" && (B.current = !1, yt(!0), Fe(!1), E.current && (E.current.defaultPlaybackRate = i, E.current.playbackRate = i));
        },
        onWaiting: () => {
          ce === "B" && Fe(!0);
        },
        onTimeUpdate: () => {
          var z;
          ce === "B" && (!lt && ((z = E.current) == null ? void 0 : z.currentTime) > 0 && (B.current = !1, yt(!0), Fe(!1), E.current && (E.current.defaultPlaybackRate = i, E.current.playbackRate = i)), ae());
        },
        onError: () => {
          ce === "B" && (B.current = !1, Fe(!1), yt(!1));
        },
        onEnded: () => {
          ce === "B" && st();
        }
      }
    ),
    Z !== "split" && Z !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: lt ? 0 : 2 },
        children: Q ? /* @__PURE__ */ s.jsx($p, { isPlaying: o }) : Nt && Nt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Nt,
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
    Z === "split" && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Nt && Nt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Nt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        an && an !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: an, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    Z === "pip" && K && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (z) => {
          z.stopPropagation(), et((he) => !he);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              ie.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          an && an !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: an, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (Z === "canvas" || Z === "all-displays") && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: me, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: fe.width ? `${fe.width}px` : "92%",
            height: fe.height ? `${fe.height}px` : "auto",
            aspectRatio: `${Se.totalWidth} / ${Se.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: O.map((z, he) => {
            const pe = Wx(z, Se), Ue = (z.displayId ?? z.DisplayId ?? `mon-${he}`).toLowerCase(), Je = Ke[Ue] || (Ue === Ie ? Nt : null), ut = !!(z.isPrimary ?? z.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${ut ? "is-primary" : ""}`,
                style: {
                  left: `${pe.leftPct}%`,
                  top: `${pe.topPct}%`,
                  width: `${pe.widthPct}%`,
                  height: `${pe.heightPct}%`
                },
                onClick: (dt) => {
                  dt.stopPropagation(), T ? T(Ue) : Y(Ue);
                },
                title: `Display ${he + 1} (${z.width || 1920}x${z.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      ut ? "★ " : "",
                      "🖥 ",
                      he + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: z.displayName || z.DisplayName || Ue.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      z.width || 1920,
                      "x",
                      z.height || 1080
                    ] }),
                    T && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (dt) => {
                          dt.stopPropagation(), T(Ue);
                        },
                        title: `Open Display ${he + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Je && Je !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Je,
                      className: "canvas-frame-img",
                      alt: Ue
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      z.displayName || Ue.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Ue
            );
          })
        }
      )
    ] }),
    nt && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          Ie.toUpperCase()
        ] })
      ] })
    ] }) }),
    Z === "director" && be && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Ie.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        jt(be.startEpochMs ?? be.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        jt(be.endEpochMs ?? be.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    K && Z !== "canvas" && /* @__PURE__ */ s.jsx(
      Rp,
      {
        displays: O,
        activeDisplayId: Ie,
        mode: ke ? "MANUAL" : "AUTO",
        activeTimeRange: be ? `${jt(be.startEpochMs ?? be.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${jt(be.endEpochMs ?? be.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (z) => {
          _ && _(I, t + r, z), Y(z);
        }
      }
    ),
    S && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      U
    ] }) })
  ] });
}
const Ui = 2200, Wi = 400;
function Hx({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], v = d.epochMs + ga, f = e - v;
      if (f >= 0 && f <= Ui)
        return {
          ...d,
          elapsed: f
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let a = 1;
  if (o.elapsed > Ui - Wi) {
    const c = (o.elapsed - (Ui - Wi)) / Wi;
    a = Math.max(0, 1 - c);
  }
  if (a <= 0.05) return null;
  if (r === "CAPTION") {
    const c = Op(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const i = Lp(o.keyCombination);
  return i.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: i.map((c, d) => /* @__PURE__ */ s.jsxs(So.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < i.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const Kx = [
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
function Wp({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? Ls.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Kx.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const uh = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), a = r % 60, i = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(a)}.${c(i)}`;
};
function Vx({
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
  onZoomReset: f,
  onFitRange: p,
  onJumpViewportTo: y,
  viewportStartMs: S = 0,
  onViewportStartChange: M,
  playheadMs: _ = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: g,
  inPointMs: m = 0,
  setInPointMs: T,
  outPointMs: w = 36e5,
  setOutPointMs: b,
  recordingSegments: h = {},
  globalGaps: A = [],
  onExport: E,
  isPlaying: N,
  setIsPlaying: P,
  isLooping: W = !0,
  setIsLooping: L,
  playbackSpeed: B,
  setPlaybackSpeed: re,
  keystrokeMode: ne = "BURN_IN",
  onChangeKeystrokeMode: H,
  keystrokes: I = [],
  showRulerKeystrokes: U = !1,
  onToggleRulerKeystrokes: O,
  directorPlan: K,
  onOverrideDisplay: R,
  onSplitDirectorSegment: oe,
  onChangeDirectorSegmentDisplay: te,
  onResetDirectorSegmentToAuto: Z
}) {
  var an, cn, wn;
  const [Y, Le] = u.useState(!1), Be = N !== void 0 ? N : Y, je = u.useCallback((De) => {
    const Re = typeof De == "function" ? De(Be) : De;
    P ? P(Re) : Le(Re), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Re } }));
  }, [Be, P]), [et, be] = u.useState(!0), Ie = W !== void 0 ? W : et, tt = L || be, [at, ie] = u.useState(1), ke = B !== void 0 ? B : at, Ke = re || ie, [Ve, me] = u.useState(null), [fe, le] = u.useState(!1), [Se, $] = u.useState(A), ee = ((an = t == null ? void 0 : t.displays) == null ? void 0 : an.length) > 1 || ((wn = (cn = t == null ? void 0 : t.topology) == null ? void 0 : cn.displays) == null ? void 0 : wn.length) > 1, [V, q] = u.useState(() => {
    if (!ee) return "mon-0";
    if (n) return n;
    try {
      const De = localStorage.getItem("itb_spotlight_viewmode");
      if (De) return De;
    } catch {
    }
    return "canvas";
  }), X = u.useCallback((De) => {
    q((Re) => {
      const st = typeof De == "function" ? De(Re) : De;
      try {
        localStorage.setItem("itb_spotlight_viewmode", st);
      } catch {
      }
      return st;
    });
  }, []), [Q, ce] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!ee) {
        q("mon-0");
        return;
      }
      if (n)
        q(n);
      else
        try {
          const De = localStorage.getItem("itb_spotlight_viewmode");
          q(De || "canvas");
        } catch {
          q("canvas");
        }
    }
  }, [e, n, ee, t == null ? void 0 : t.id]);
  const Ze = u.useRef(null), Oe = u.useRef(d);
  Oe.current = d;
  const Ye = u.useRef(S);
  Ye.current = S;
  const ot = u.useRef(c);
  ot.current = c;
  const Ge = u.useRef(t && t.id);
  u.useEffect(() => {
    var De, Re, st;
    t && t.id && Ge.current !== t.id && (Ge.current = t.id, Ke(1), ((De = t.displays) == null ? void 0 : De.length) > 1 || ((st = (Re = t.topology) == null ? void 0 : Re.displays) == null ? void 0 : st.length) > 1 || X("mon-0"));
  }, [t, Ke]);
  const Tt = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const De = Ze.current;
    if (!De || !v || !M) return;
    const Re = (st) => {
      st.preventDefault(), st.stopPropagation();
      const ae = st.ctrlKey || st.shiftKey, nt = Oe.current, z = Ye.current, he = ot.current || 36e5;
      if (ae) {
        const pe = Math.abs(st.deltaX) > Math.abs(st.deltaY) ? st.deltaX : st.deltaY;
        if (pe === 0) return;
        const Ue = he / nt, Je = Math.max(0, he - Ue), ut = Ue * 0.08 * (pe > 0 ? 1 : -1), dt = Math.max(0, Math.min(Je, z + ut));
        Ye.current = dt, M(dt);
      } else {
        if (st.deltaY === 0) return;
        const Ue = st.deltaY < 0 ? 1.25 : 0.8, Je = De.getBoundingClientRect(), ut = Je.left + 150, dt = Je.right - 58, qe = Math.max(100, dt - ut);
        let ht = 0.5;
        st.clientX >= ut && st.clientX <= dt ? ht = (st.clientX - ut) / qe : Je.width > 0 && (ht = Math.max(0, Math.min(1, (st.clientX - Je.left) / Je.width)));
        const St = Math.max(32, he / 2e3), Mt = Math.max(1, Math.min(St, Math.round(nt * Ue * 100) / 100));
        if (Mt === nt) return;
        const Pt = he / nt, rn = he / Mt, zt = z + ht * Pt - ht * rn, dn = Math.max(0, he - rn), Xt = Math.max(0, Math.min(dn, zt));
        Oe.current = Mt, Ye.current = Xt, M(Xt), v(Mt);
      }
    };
    return De.addEventListener("wheel", Re, { passive: !1, capture: !0 }), () => De.removeEventListener("wheel", Re, { capture: !0 });
  }, [e, t, v, M]);
  const Rt = u.useCallback(() => {
    f ? f() : (Ye.current = 0, Oe.current = 1, M == null || M(0), v == null || v(1));
  }, [f, M, v]), Lt = u.useCallback((De, Re) => {
    if (p)
      p(De, Re);
    else {
      const st = Math.max(1e3, Re - De), ae = Math.max(500, st * 0.05), nt = Math.max(0, De - ae), he = Math.min(c, Re + ae) - nt, pe = Math.max(32, c / 2e3), Ue = Math.max(1, Math.min(pe, Number((c / he).toFixed(1)))), Je = c / Ue, ut = Math.max(0, Math.min(nt, c - Je));
      Ye.current = ut, Oe.current = Ue, M == null || M(ut), v == null || v(Ue);
    }
  }, [p, c, M, v]), Ot = u.useCallback((De, Re = "center") => {
    if (y)
      y(De, Re);
    else {
      if (De == null) return;
      const st = Oe.current || 1, ae = c / Math.max(1, st), nt = Re === "start" ? ae / 4 : ae * 0.75, z = Math.max(0, Math.min(De - nt, c - ae));
      Ye.current = z, M == null || M(z);
    }
  }, [y, c, M]), lt = u.useCallback(() => {
    je((De) => !De);
  }, [je]), yt = u.useCallback(async () => {
    var ae;
    if (!t || Math.abs(w - m) < 1e3) return;
    const De = (ne || "NONE").toUpperCase().replace("-", "_");
    let Re;
    De === "NONE" || De === "OFF" ? Re = "None" : De === "CAPTION" ? Re = "Caption" : Re = "BurnIn";
    const st = {
      createdBy: Up(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(m),
      outEpochMs: a + Math.round(w),
      keystrokeMode: Re,
      layoutMode: ee ? V : "mon-0",
      targetDisplayId: !ee || V === "mon-0" || V === "mon-1" || V.startsWith("mon-") ? ee ? V : "mon-0" : null,
      isPipSwapped: Q,
      directorSegments: ee ? (K == null ? void 0 : K.segments) || ((ae = t == null ? void 0 : t.directorPlan) == null ? void 0 : ae.segments) || [] : []
    };
    try {
      E ? await E(st) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(st)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(st)
      });
    } catch (nt) {
      console.warn("[SoloSpotlightModal] Export trigger error:", nt);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, m, w, a, E, ne, V, Q, K]);
  u.useEffect(() => {
    if (!e || !t) return;
    const De = (Re) => {
      if ((Re.ctrlKey || Re.metaKey) && (Re.key === "e" || Re.key === "E")) {
        Re.preventDefault(), yt();
        return;
      }
      if (Re.key === "?" || Re.shiftKey && Re.code === "Slash") {
        Re.preventDefault(), le((st) => !st);
        return;
      }
      if (fe) {
        Re.key === "Escape" && le(!1);
        return;
      }
      if (Re.key === "Escape" || Re.code === "Escape") {
        Re.preventDefault(), Re.stopPropagation(), o == null || o();
        return;
      }
      if (Re.code === "Space") {
        Re.preventDefault(), lt();
        return;
      }
      if (Re.code === "KeyI") {
        Re.preventDefault(), T(Math.max(0, Math.min(_, w - 1e3)));
        return;
      }
      if (Re.code === "KeyO") {
        Re.preventDefault(), b(Math.min(c, Math.max(_, m + 1e3)));
        return;
      }
      if (Re.code === "ArrowLeft" || Re.code === "ArrowRight") {
        Re.preventDefault(), je(!1);
        const st = Re.code === "ArrowLeft";
        let ae;
        if (Re.ctrlKey || Re.metaKey)
          ae = 33;
        else if (Re.shiftKey)
          ae = 5e3;
        else {
          const nt = Math.max(1, d);
          ae = Math.max(33, Math.round(1e3 / nt));
        }
        g((nt) => {
          const z = st ? nt - ae : nt + ae;
          return Math.max(0, Math.min(c, z));
        });
        return;
      }
      if (Re.key === "ArrowDown") {
        Re.preventDefault();
        const st = r.findIndex((ae) => ae.id === t.id);
        if (st !== -1) {
          const ae = (st + 1) % r.length;
          l(r[ae].id);
        }
        return;
      }
      if (Re.key === "ArrowUp") {
        Re.preventDefault();
        const st = r.findIndex((ae) => ae.id === t.id);
        if (st !== -1) {
          const ae = (st - 1 + r.length) % r.length;
          l(r[ae].id);
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
    _,
    m,
    w,
    c,
    d,
    T,
    b,
    g,
    yt,
    lt,
    je,
    fe
  ]);
  const Qe = r.findIndex((De) => De.id === (t && t.id)), Fe = r[Qe - 1], Nt = r[Qe + 1];
  if (!e || !t) return null;
  const Dt = k > 0 ? k : Math.round(a + _);
  return Ls.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      Ve && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${Ve.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          Ve.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          Ve.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          Ve.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: Ve.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            uh(w - m),
            " (",
            jt(a + m, i),
            " → ",
            jt(a + w, i),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          zx,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: c,
            playheadMs: _,
            setPlayheadMs: g,
            isPlaying: Be,
            setIsPlaying: je,
            playbackSpeed: ke,
            timeMode: i,
            inPointMs: m,
            outPointMs: w,
            isLooping: Ie,
            recordingSegments: h,
            globalGaps: Se,
            showWatermark: !0,
            directorPlan: K || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: R,
            onResetOverride: Z,
            viewMode: V,
            onViewModeChange: X,
            isPipSwapped: Q,
            onPipSwapChange: ce
          }
        ),
        /* @__PURE__ */ s.jsx(
          Hx,
          {
            currentEpochMs: Dt,
            keystrokes: I,
            keystrokeMode: ne
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
              onClick: () => le(!0),
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
              disabled: !Fe,
              onClick: () => Fe && l(Fe.id),
              title: Fe ? `Previous: ${Fe.displayName || Fe.roleAlias || Fe.hostname || Fe.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            Qe + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !Nt,
              onClick: () => Nt && l(Nt.id),
              title: Nt ? `Next: ${Nt.displayName || Nt.roleAlias || Nt.hostname || Nt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${Be ? "is-playing-dimmed" : ""}`, ref: Ze, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: uh(w - m) })
            ] }),
            (() => {
              const De = V === "mon-0" ? "SCREEN 1" : V === "mon-1" ? "SCREEN 2" : V.startsWith("mon-") ? `SCREEN ${parseInt(V.slice(4)) + 1}` : V.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: yt,
                  title: `Export Selected Cut Window as ${De} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: V === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${De})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            Uc,
            {
              activeStationId: t.id,
              isPlaying: Be,
              setIsPlaying: lt,
              isLooping: Ie,
              setIsLooping: tt,
              playbackSpeed: ke,
              onChangeSpeed: Ke,
              baseEpochMs: a,
              timeMode: i,
              totalDurationMs: c,
              inPointMs: m,
              setInPointMs: T,
              outPointMs: w,
              setOutPointMs: b,
              onSetInPoint: () => T(Math.max(0, Math.min(_, w - 1e3))),
              onSetOutPoint: () => b(Math.min(c, Math.max(_, m + 1e3))),
              onStepFrameBackward: () => {
                je(!1), g((De) => Math.max(0, De - 33));
              },
              onStepFrameForward: () => {
                je(!1), g((De) => Math.min(c, De + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: jt(a + _, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          _p,
          {
            stations: Tt,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: i,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: v,
            onZoomReset: Rt,
            onFitRange: Lt,
            onJumpViewportTo: Ot,
            viewportStartMs: S,
            onViewportStartChange: M,
            playheadMs: _,
            setPlayheadMs: (De) => {
              je(!1), g(De);
            },
            inPointMs: m,
            setInPointMs: T,
            outPointMs: w,
            setOutPointMs: b,
            recordingSegments: h,
            onExport: yt,
            onEstimateLoaded: (De) => {
              De != null && De.removedGlobalGaps && $(De.removedGlobalGaps);
            },
            keystrokeMode: ne,
            onChangeKeystrokeMode: H,
            keystrokes: I,
            showKeystrokes: U,
            showRulerKeystrokes: U,
            onToggleRulerKeystrokes: O,
            onSplitDirectorSegment: oe,
            onChangeDirectorSegmentDisplay: te,
            onResetDirectorSegmentToAuto: Z
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Wp,
        {
          isOpen: fe,
          onClose: () => le(!1)
        }
      )
    ] }),
    document.body
  );
}
function zp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), a = u.useRef(!1), i = u.useRef(0), [c, d] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [v, f] = u.useState(() => {
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
          const A = await h.json(), E = Array.isArray(A) ? A : [];
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
    let h = !0, A = null;
    const E = () => {
      if (!h) return;
      let P = 2500;
      typeof document < "u" && document.hidden ? P = 3e4 : i.current > 0 && (P = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), A = setTimeout(async () => {
        await p(), E();
      }, P);
    }, N = () => {
      !document.hidden && h && (clearTimeout(A), i.current = 0, p().then(E));
    };
    return document.addEventListener("visibilitychange", N), p().then(E), () => {
      h = !1, clearTimeout(A), document.removeEventListener("visibilitychange", N);
    };
  }, [p]), u.useEffect(() => {
    const h = () => {
      f(!0), p();
    };
    return window.addEventListener("open-export-monitor", h), () => window.removeEventListener("open-export-monitor", h);
  }, [p]), u.useEffect(() => {
    if (!v || c) return;
    const h = (A) => {
      o.current && !o.current.contains(A.target) && !A.target.closest(".export-floating-hud") && f(!1);
    };
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [v, c]);
  const y = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && y)
    return null;
  const S = t.filter((h) => h.status === "Processing" || h.status === "Queued"), M = t.filter((h) => h.status === "Completed" || h.isCompleted), _ = () => {
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
  }, g = (h, A) => {
    A.stopPropagation(), !(!h || r.has(h)) && (l((E) => new Set(E).add(h)), setTimeout(() => {
      n((E) => {
        const N = E.filter((P) => (P.jobId || P.id) !== h);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: N })), N;
      }), l((E) => {
        const N = new Set(E);
        return N.delete(h), N;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${h}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}`, { method: "DELETE" })).catch((E) => console.warn("[ExportJobMonitor] Dismiss failed:", E)));
  }, m = async (h, A) => {
    A.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${h}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}/bookmark`, { method: "POST" })), p();
    } catch (E) {
      console.warn("[ExportJobMonitor] Bookmark failed:", E);
    }
  }, T = (h, A) => {
    A.stopPropagation();
    const E = h.networkFolderPath || (h.outputFilePath ? h.outputFilePath.substring(0, h.outputFilePath.lastIndexOf("\\")) : "");
    E && (navigator.clipboard.writeText(E), alert(`UNC Directory Path copied to clipboard:
${E}`));
  }, w = (h) => {
    const A = h.jobId || h.id, E = `/api/v1/extractor-advanced/jobs/${A}/download`, N = document.createElement("a");
    N.href = E, N.download = h.fileName || `archive_${A}.tar`, document.body.appendChild(N), N.click(), document.body.removeChild(N), setTimeout(p, 1e3);
  }, b = (h) => {
    if (!h || h <= 0) return "0 B";
    const A = h / (1024 * 1024);
    return A >= 1e3 ? `${(A / 1024).toFixed(2)} GB` : `${A.toFixed(1)} MB`;
  };
  return t.length === 0 && !v ? null : Ls.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !v && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${S.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${S.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: S.length > 0 ? `EXPORTS: ${S.length} PACKAGING` : `${M.length} ARCHIVE${M.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${S.length > 0 ? "" : "ready"}`, children: S.length > 0 ? `${S[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      v && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && f(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (h) => h.stopPropagation(), children: [
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
                onClick: _,
                title: c ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: c ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: k, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((h) => {
          const A = h.status === "Completed" || h.isCompleted, E = h.status === "Failed" || h.isFailed, N = h.status === "Processing" || h.status === "Queued", P = h.jobId || h.id, W = r.has(P), L = A ? 100 : Math.round(h.progressPercent || h.progressPercentage || h.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${h.status.toLowerCase()} ${h.isBookmarked ? "is-bookmarked" : ""} ${W ? "is-dismissing" : ""}`,
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
                      onClick: (B) => g(P, B),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                N && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: h.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      L,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, L)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      b(h.fileSizeBytes)
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
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: b(h.fileSizeBytes) })
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
                        onClick: (B) => m(P, B),
                        title: h.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: h.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (B) => T(h, B),
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
                E && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  h.errorMessage || h.error || "Export failed"
                ] }) })
              ]
            },
            P
          );
        }) })
      ] }) })
    ] }),
    document.body
  );
}
function Yx({
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
    }, v = (f) => {
      l.current && !l.current.contains(f.target) && (t == null || t());
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
function Gx({
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
  }, v = (h, A) => {
    const E = Math.round(h * A / 2073600 * 6 * 10) / 10, N = Math.round(E * 60 / 8 * 10) / 10;
    return `~${E} Mbps (~${N} MB/min)`;
  }, f = [
    {
      id: "NATIVE",
      badge: `Native 1:1 (${o}×${a})`,
      res: `${o} × ${a}`,
      bitrate: v(o, a),
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
  ], [p, y] = u.useState("BurnIn"), [S, M] = u.useState(r.resolution || "NATIVE"), [_, k] = u.useState(!1);
  if (!e) return null;
  const g = async () => {
    k(!0);
    try {
      await n(p, S), t();
    } finally {
      k(!1);
    }
  }, m = (r.layout || "DIRECTOR").toUpperCase(), T = r.stationsCount || 1, w = r.audioSegmentsCount || 1, b = f.find((h) => h.id === S) || f[0];
  return Ls.createPortal(
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
              m,
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
              b.res,
              " (",
              b.badge,
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
              onChange: () => M(h.id)
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
                onChange: () => y("BurnIn")
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
                onChange: () => y("None")
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: _, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: g, disabled: _, children: _ ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${b.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Xx(e, t, n, r, l = null) {
  const [o, a] = u.useState([]), [i, c] = u.useState({}), [d, v] = u.useState(!1), f = u.useRef(o);
  f.current = o;
  const p = u.useCallback(async () => {
    if (isNaN(e)) return;
    const M = e + t;
    v(!0);
    try {
      const _ = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(M),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${_.toString()}`);
      if (k.ok) {
        const g = k.headers.get("content-type");
        if (g && g.includes("application/json")) {
          const m = await k.json(), w = (Array.isArray(m) ? m : m.stations || m.items || []).filter((b) => (b.recordingsCount || (b.segments ? b.segments.length : 0)) > 0).map((b) => {
            var h, A;
            return {
              id: String(b.id || b.stationId || b.agentId || b.hostname),
              hostname: b.hostname || "Station",
              roleAlias: b.roleAlias || null,
              roleHistory: b.roleHistory || [],
              displayName: b.displayName || b.roleAlias || b.hostname || "Station",
              isOnline: b.isOnline !== void 0 ? b.isOnline : !0,
              recordingsCount: b.recordingsCount || 0,
              segments: b.segments || [],
              displays: b.displays || b.Displays || ((h = b.displayTopology) == null ? void 0 : h.displays) || ((A = b.DisplayTopology) == null ? void 0 : A.Displays) || [],
              displayTopology: b.displayTopology || b.DisplayTopology || null,
              directorPlan: b.directorPlan || b.DirectorPlan || null,
              hasAudio: !!b.hasAudio,
              audioCodec: b.audioCodec || "",
              audioChannels: b.audioChannels || 0,
              audioLabel: b.audioLabel || (b.hasAudio ? "AAC" : "NONE"),
              width: b.width || 1920,
              height: b.height || 1080,
              fps: b.fps || 30,
              isVfr: !!b.isVfr,
              resolution: b.resolution || "1080p",
              feedSpec: b.feedSpec || "1080p • 30fps"
            };
          });
          a((b) => {
            if (!b || b.length === 0) return w;
            const h = new Map(b.map((N) => [N.id, N]));
            let A = b.length !== w.length;
            const E = w.map((N) => {
              const P = h.get(N.id);
              return P ? P.isOnline === N.isOnline && P.displayName === N.displayName && P.roleAlias === N.roleAlias && P.feedSpec === N.feedSpec && P.recordingsCount === N.recordingsCount && P.fps === N.fps ? P : (A = !0, { ...P, ...N }) : (A = !0, N);
            });
            return A ? E : b;
          });
        }
      }
    } catch (_) {
      console.warn("[useStudioData] Failed fetching active stations:", _);
    } finally {
      v(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    p();
  }, [p]);
  const y = u.useMemo(() => {
    const M = /* @__PURE__ */ new Set();
    return o.forEach((_) => {
      _.id && M.add(_.id), _.hostname && M.add(_.hostname);
    }), Array.from(M).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!y || isNaN(e)) {
      c({});
      return;
    }
    let M = !0;
    return (async () => {
      try {
        const k = e + t, g = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${k}`);
        if (g.ok && M) {
          const m = await g.json() || {}, T = {};
          (f.current || []).forEach((w) => {
            const b = m[w.id] || m[w.hostname] || m[w.displayName] || [];
            T[w.id] = b, T[w.hostname] = b;
          }), Object.keys(m).forEach((w) => {
            T[w] || (T[w] = m[w]);
          }), c(T);
        }
      } catch {
        M && c({});
      }
    })(), () => {
      M = !1;
    };
  }, [y, e, t]);
  const S = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let M = 1 / 0, _ = -1 / 0;
    o.forEach((T) => {
      (i[T.id] || i[T.hostname] || T.segments || []).forEach((b) => {
        const h = b.startEpochMs ?? b.startEpoch ?? 0, A = b.endEpochMs ?? b.endEpoch ?? 0;
        h > 0 && h < M && (M = h), A > 0 && A > _ && (_ = A);
      });
    });
    let k = 1 / 0, g = -1 / 0;
    l && (i[l] || []).forEach((w) => {
      const b = w.startEpochMs ?? w.startEpoch ?? 0, h = w.endEpochMs ?? w.endEpoch ?? 0;
      b > 0 && b < k && (k = b), h > 0 && h > g && (g = h);
    });
    const m = (T) => T === 1 / 0 || T === -1 / 0 ? null : Math.max(0, Math.min(t, T - e));
    return {
      globalFirstMs: m(M),
      globalLastMs: m(_),
      currentFirstMs: m(k),
      currentLastMs: m(g)
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
function Qx({
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
  isGridMode: f = !1
}) {
  const [p, y] = u.useState(i), [S, M] = u.useState(c), [_, k] = u.useState(d), [g, m] = u.useState(v), T = u.useRef(null), w = u.useRef(null), b = o || l, h = u.useMemo(() => b ? a[b.id] || b.segments || [] : [], [b, a]), A = h.some((W) => {
    const L = W.startEpochMs ?? W.startEpoch ?? 0, B = W.endEpochMs ?? W.endEpoch ?? 0, re = e + p;
    return re >= L && re <= B;
  }), E = !!(!f && b && A);
  u.useEffect(() => {
    y((W) => W < t ? t : W > n ? (M(!1), n) : W);
  }, [t, n]);
  const N = u.useCallback((W) => {
    T.current || (T.current = W);
    const L = (W - T.current) * g, B = Math.min(L, 250 * g);
    T.current = W, y((re) => {
      let ne = re + B;
      if (r && r.length > 0) {
        const H = e + ne, I = r.find((U) => H >= U.startEpochMs && H < U.endEpochMs);
        I && (ne = I.endEpochMs - e);
      }
      return ne >= n && (_ ? ne = t : (M(!1), ne = n)), ne;
    }), S && (!E || f) && (w.current = requestAnimationFrame(N));
  }, [S, _, t, n, r, e, E, g, f]);
  u.useEffect(() => (S && (!E || f) ? (T.current = performance.now(), w.current = requestAnimationFrame(N)) : (w.current && cancelAnimationFrame(w.current), T.current = null), () => {
    w.current && cancelAnimationFrame(w.current);
  }), [S, N, E, f]);
  const P = u.useCallback(() => {
    if (S)
      M(!1);
    else {
      let W = p;
      const L = e + W, B = r == null ? void 0 : r.find((re) => L >= re.startEpochMs && L < re.endEpochMs);
      if (B)
        W = B.endEpochMs - e;
      else if (b && !A) {
        const re = h.map((ne) => ({ start: ne.startEpochMs ?? ne.startEpoch ?? 0, end: ne.endEpochMs ?? ne.endEpoch ?? 0 })).filter((ne) => ne.start > L).sort((ne, H) => ne.start - H.start)[0];
        re && (W = re.start - e);
      }
      W !== p && y(W), M(!0);
    }
  }, [S, p, e, r, b, A, h]);
  return {
    playheadMs: p,
    setPlayheadMs: y,
    isPlaying: S,
    setIsPlaying: M,
    isLooping: _,
    setIsLooping: k,
    playbackSpeed: g,
    setPlaybackSpeed: m,
    togglePlaySmart: P
  };
}
function Jx(e) {
  return 1 - Math.pow(1 - e, 3);
}
function Zx({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [a, i] = u.useState(r), c = u.useRef(null), d = u.useRef(a);
  d.current = a;
  const v = u.useRef(l);
  v.current = l;
  const f = u.useRef(t);
  f.current = t;
  const p = Math.max(32, t / 2e3), y = t / l, S = u.useCallback((g, m = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const T = d.current, w = g - T;
    if (Math.abs(w) < 1) return;
    const b = performance.now(), h = (A) => {
      const E = A - b, N = Math.min(1, E / m);
      i(Math.round(T + w * Jx(N))), N < 1 ? c.current = requestAnimationFrame(h) : c.current = null;
    };
    c.current = requestAnimationFrame(h);
  }, []), M = u.useCallback((g, m) => {
    const T = Math.max(1e3, m - g), w = Math.max(500, T * 0.05), b = Math.max(0, g - w), A = Math.min(t, m + w) - b, E = Math.max(1, Math.min(p, Number((t / A).toFixed(1)))), N = t / E, P = Math.max(0, Math.min(b, t - N));
    S(P), o(E);
  }, [t, p, S]), _ = u.useCallback(() => {
    S(0), o(1);
  }, [S]), k = u.useCallback((g, m = "center") => {
    if (g == null) return;
    const T = m === "start" ? y / 4 : y * 0.75, w = Math.max(0, Math.min(g - T, t - y));
    S(w);
  }, [y, t, S]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let g = null;
    const m = (w) => {
      if (w.defaultPrevented) return;
      w.preventDefault(), w.stopPropagation();
      const b = w.ctrlKey || w.shiftKey, h = v.current, A = d.current, E = f.current;
      if (b) {
        const N = Math.abs(w.deltaX) > Math.abs(w.deltaY) ? w.deltaX : w.deltaY;
        if (N === 0) return;
        const P = E / Math.max(1, h), W = Math.max(0, E - P), L = P * 0.08 * (N > 0 ? 1 : -1);
        i((B) => Math.max(0, Math.min(W, B + L)));
      } else {
        if (w.deltaY === 0) return;
        const P = w.deltaY < 0 ? 1.25 : 0.8, W = Math.max(32, E / 2e3), L = g ? g.getBoundingClientRect() : { left: 0, width: window.innerWidth }, B = Math.max(0, Math.min(L.width, w.clientX - L.left)), re = L.width > 0 ? B / L.width : 0.5;
        o((ne) => {
          const H = Math.max(1, Math.min(W, Math.round(ne * P * 100) / 100));
          if (H === ne) return ne;
          const I = E / ne, U = E / H, K = A + re * I - re * U, R = Math.max(0, E - U);
          return i(Math.max(0, Math.min(R, K))), H;
        });
      }
    }, T = () => {
      const w = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return w && !g ? (g = w, g.addEventListener("wheel", m, { passive: !1, capture: !0 }), !0) : !!g;
    };
    if (!T()) {
      const w = setInterval(() => {
        T() && clearInterval(w);
      }, 100);
      return () => {
        clearInterval(w), g && g.removeEventListener("wheel", m, { capture: !0 });
      };
    }
    return () => {
      g && g.removeEventListener("wheel", m, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: a,
    setViewportStartMs: i,
    viewportDurationMs: y,
    animateViewportTo: S,
    fitRange: M,
    resetZoom: _,
    jumpViewportTo: k
  };
}
function qx({
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
  setOutPointMs: f,
  totalTimelineDurationMs: p,
  zoomLevel: y = 1,
  togglePlaySmart: S,
  onToggleHelpModal: M,
  onSplitDirectorAtPlayhead: _,
  isModalActive: k = !1,
  hasGridPlacements: g = !0,
  onToggleGridFullscreen: m,
  isGridFullscreen: T = !1,
  onExitGridFullscreen: w
}) {
  u.useEffect(() => {
    const b = (h) => {
      const A = h.target;
      if (!(A.tagName === "INPUT" || A.tagName === "TEXTAREA" || A.tagName === "SELECT" || A.isContentEditable || A.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), M == null || M();
          return;
        }
        if (!(k || t)) {
          if (h.code === "KeyI" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), d == null || d(Math.max(0, Math.min(a, v - 1e3)));
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
              h.preventDefault(), _ == null || _();
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
            S();
            return;
          }
          if (h.code === "KeyF" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), m == null || m();
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
            h.preventDefault(), i == null || i(v);
            return;
          }
          if (h.code === "ArrowLeft" || h.code === "ArrowRight") {
            h.preventDefault();
            const N = h.code === "ArrowLeft";
            let P;
            if (h.ctrlKey || h.metaKey)
              P = 33;
            else if (h.shiftKey)
              P = 5e3;
            else {
              const W = Math.max(1, y);
              P = Math.max(33, Math.round(1e3 / W));
            }
            i == null || i((W) => {
              const L = N ? W - P : W + P;
              return Math.max(0, Math.min(p, L));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const N = n.findIndex((P) => P.id === e);
            if (N === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const P = (N + 1) % n.length;
              l(n[P].id), o(1);
            } else {
              const P = (N - 1 + n.length) % n.length;
              l(n[P].id), o(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", b, { capture: !0 }), () => window.removeEventListener("keydown", b, { capture: !0 });
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
    f,
    p,
    y,
    S,
    M,
    _,
    k,
    g,
    m,
    T,
    w
  ]);
}
const dh = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = qd(n, e), l = qd(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, Vl = (e, t = null, n = "LOCAL") => {
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
    const c = o.substring(0, 8), d = Oc(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const a = r.replace(" ", "T"), i = new Date(a).getTime();
  return isNaN(i) ? Date.now() : i;
};
function e1() {
  var $l, Rl;
  const e = u.useMemo(() => Ag() || {}, []), [t, n] = u.useState(() => {
    var C, se;
    return (C = e.timeRange) != null && C.startEpochMs && ((se = e.timeRange) != null && se.endEpochMs) ? e.timeRange : dh();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    jg().catch((C) => console.warn("[Studio] DST init error:", C));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Vl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - v, [d, v]), p = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, S] = u.useState(e.selectedStationIds || []), [M, _] = u.useState(e.activeStationId || null), [k, g] = u.useState(null), [m, T] = u.useState(null), [w, b] = u.useState([]), [h, A] = u.useState(!1), [E, N] = u.useState(null), [P, W] = u.useState(() => {
    var C;
    return e.compositionScope || (((C = e.selectedStationIds) == null ? void 0 : C.length) > 1 ? "inter-station" : "intra-station");
  }), [L, B] = u.useState(() => {
    try {
      const C = localStorage.getItem("itb_composition_layout");
      if (C) return C;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), re = u.useCallback((C) => {
    B((se) => {
      const de = typeof C == "function" ? C(se) : C;
      try {
        localStorage.setItem("itb_composition_layout", de);
      } catch {
      }
      return de;
    });
  }, []), [ne, H] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [I, U] = u.useState(() => !!e.isPipSwapped), [O, K] = u.useState(() => e.audioRoutingPlan || null), [R, oe] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [te, Z] = u.useState(!1), [Y, Le] = u.useState(null), [Be, je] = u.useState(() => e.canvasLayoutTimeline || null), [et, be] = u.useState(0), Ie = u.useCallback((C) => {
    je((se) => {
      const de = [...(se == null ? void 0 : se.keyframes) || []], ve = de.findIndex((We) => Math.abs(We.timestampEpochMs - C) < 300);
      if (ve >= 0)
        return be(ve), se;
      const Ce = de[et] || de[0], we = (Ce == null ? void 0 : Ce.layout) || Y || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Te = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(C),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(we))
      }, $e = [...de, Te].sort((We, ze) => We.timestampEpochMs - ze.timestampEpochMs), Xe = $e.findIndex((We) => We.timestampEpochMs === Math.round(C));
      return be(Xe >= 0 ? Xe : 0), {
        ...se || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: $e
      };
    });
  }, [et, Y]), tt = u.useCallback((C, se) => {
    je((de) => !(de != null && de.keyframes) || de.keyframes.length === 0 ? de : _c(de, C, se));
  }, []), at = u.useCallback((C) => {
    je((se) => {
      if (!(se != null && se.keyframes) || se.keyframes.length <= 1) return se;
      const de = se.keyframes.filter((ve, Ce) => Ce !== C);
      return be((ve) => Math.max(0, ve - 1)), { ...se, keyframes: de };
    });
  }, []), ie = u.useCallback((C, se) => {
    je((de) => {
      if (!(de != null && de.keyframes) || de.keyframes.length === 0) return de;
      const ve = Math.round(se), Ce = typeof C == "number" && de.keyframes[C] ? C : de.keyframes.findIndex(($e) => $e.id === C);
      if (Ce === -1) return de;
      const we = [...de.keyframes];
      we[Ce] = {
        ...we[Ce],
        timestampEpochMs: ve
      }, we.sort(($e, Xe) => $e.timestampEpochMs - Xe.timestampEpochMs);
      const Te = we.findIndex(($e) => $e.timestampEpochMs === ve);
      return Te >= 0 && be(Te), {
        ...de,
        keyframes: we
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [ke, Ke] = u.useState({}), Ve = u.useCallback((C) => {
    S((se) => se.filter((de) => de !== C)), M === C && _(null), k === C && g(null), je((se) => {
      if (!se || !se.keyframes) return se;
      const de = se.keyframes.map((ve) => {
        var Ce;
        return {
          ...ve,
          layout: {
            ...ve.layout,
            placements: (((Ce = ve.layout) == null ? void 0 : Ce.placements) || []).filter((we) => we.stationId !== C)
          }
        };
      });
      return { ...se, keyframes: de };
    });
  }, [M, k]), me = u.useCallback((C, se) => {
    C.preventDefault(), C.stopPropagation();
    const de = 195, ve = 110, Ce = Math.min(C.clientX, window.innerWidth - de - 10), we = Math.min(C.clientY, window.innerHeight - ve - 10);
    N({ x: Ce, y: we, station: se });
  }, []), fe = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(p, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(p, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, f, p, v]), le = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(fe + 1e3, Math.min(p, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(fe + 1e3, Math.min(p, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, f, p, v, t.durationMs, fe]), Se = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(p, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(p, e.playheadMs)) : fe, [e.playheadEpochMs, e.playheadMs, f, p, fe]), [$, ee] = u.useState(fe), [V, q] = u.useState(le);
  u.useEffect(() => {
    if (!f) return;
    const C = Math.round(f + $), se = Math.round(f + V);
    je((de) => {
      var $e, Xe;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      let ve = [...de.keyframes], Ce = !1, we = ve.find((We) => We.tag === "cut-in");
      if (we)
        we.timestampEpochMs !== C && (we.timestampEpochMs = C, Ce = !0);
      else {
        const We = ve.find((ze) => Math.abs(ze.timestampEpochMs - C) < 500);
        if (We)
          We.tag = "cut-in", We.timestampEpochMs = C, Ce = !0;
        else {
          const ze = (($e = ve[0]) == null ? void 0 : $e.layout) || Y || { width: 1920, height: 1080, placements: [] };
          ve.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: C,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(ze))
          }), Ce = !0;
        }
      }
      let Te = ve.find((We) => We.tag === "cut-out");
      if (Te)
        Te.timestampEpochMs !== se && (Te.timestampEpochMs = se, Ce = !0);
      else {
        const We = ve.find((ze) => Math.abs(ze.timestampEpochMs - se) < 500 && ze.tag !== "cut-in");
        if (We)
          We.tag = "cut-out", We.timestampEpochMs = se, Ce = !0;
        else {
          const ze = ((Xe = ve[ve.length - 1]) == null ? void 0 : Xe.layout) || Y || { width: 1920, height: 1080, placements: [] };
          ve.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: se,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(ze))
          }), Ce = !0;
        }
      }
      return Ce ? (ve.sort((We, ze) => We.timestampEpochMs - ze.timestampEpochMs), {
        ...de,
        keyframes: ve
      }) : de;
    });
  }, [f, $, V, Y]);
  const { allStations: X, recordingSegments: Q, isLoadingStations: ce, movieBoundaries: Ze } = Xx(
    f,
    p,
    t,
    r,
    M
  ), Oe = u.useMemo(() => X.find((C) => C.id === M) || null, [X, M]), Ye = u.useCallback((C) => {
    Ke((se) => {
      const de = !(se[C] ?? !0);
      return je((ve) => {
        if (!(ve != null && ve.keyframes)) return ve;
        const Ce = ve.keyframes.map((we) => {
          var We;
          const Te = ((We = we.layout) == null ? void 0 : We.placements) || [];
          let $e = !1;
          const Xe = Te.map((ze) => {
            if (ze.stationId === C) {
              if (!de && (ze.displayId === "auto" || !ze.displayId)) {
                $e = !0;
                const it = X.find((rt) => rt.id === C);
                return {
                  ...ze,
                  displayId: "mon-0",
                  label: `${(it == null ? void 0 : it.displayName) || C} - Screen 1 (Main)`
                };
              } else if (de && (ze.displayId === "mon-0" || !ze.displayId) && Te.filter((rt) => rt.stationId === C).length === 1) {
                $e = !0;
                const rt = X.find((bt) => bt.id === C);
                return {
                  ...ze,
                  displayId: "auto",
                  label: `${(rt == null ? void 0 : rt.displayName) || C} - Central Composition (Auto-Director)`
                };
              }
            }
            return ze;
          });
          return $e ? {
            ...we,
            layout: {
              ...we.layout,
              placements: Xe
            }
          } : we;
        });
        return { ...ve, keyframes: Ce };
      }), {
        ...se,
        [C]: de
      };
    });
  }, [X]), ot = u.useCallback((C, se) => {
    je((de) => {
      var ze, it;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      const ve = et >= 0 && et < de.keyframes.length ? et : 0, Ce = de.keyframes[ve], we = ((ze = Ce == null ? void 0 : Ce.layout) == null ? void 0 : ze.placements) || [], Te = (se || "mon-0").toLowerCase(), $e = we.findIndex((rt) => {
        if (rt.stationId !== C) return !1;
        const bt = (rt.displayId || "mon-0").toLowerCase();
        return bt === Te || bt === "auto" && (Te === "mon-0" || Te === "screen-0");
      });
      let Xe;
      if ($e >= 0)
        Xe = we.filter((rt, bt) => bt !== $e);
      else {
        const rt = X.find((Ll) => Ll.id === C), bt = ((it = rt == null ? void 0 : rt.displays) == null ? void 0 : it.find((Ll) => (Ll.displayId || "").toLowerCase() === Te)) || { width: 1920, height: 1080 }, ln = bt.width || 1920, Vt = bt.height || 1080, gn = ln / Vt, xs = gn >= 1 ? 640 : Math.round(360 * gn), Cr = gn >= 1 ? Math.round(640 / gn) : 360, Yr = {
          stationId: C,
          displayId: Te,
          label: `${(rt == null ? void 0 : rt.displayName) || C} - ${bt.displayName || Te}`,
          x: 120 + we.length * 40 % 800,
          y: 100 + we.length * 40 % 500,
          width: xs,
          height: Cr,
          sourceWidth: ln,
          sourceHeight: Vt,
          nativeAspectRatio: gn,
          aspectRatio: gn,
          zIndex: we.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Xe = [...we, Yr];
      }
      const We = [...de.keyframes];
      return We[ve] = {
        ...We[ve],
        layout: {
          ...We[ve].layout,
          placements: Xe
        }
      }, { ...de, keyframes: We };
    });
  }, [et, X]), Ge = u.useMemo(() => !y || y.length === 0 ? [] : X.filter((C) => y.includes(C.id)), [X, y]);
  u.useEffect(() => {
    !f || isNaN(f) || je((C) => {
      if (C != null && C.keyframes && C.keyframes.length > 0) return C;
      const se = f + ($ || 0), de = f + (V || p || 36e5), ve = Y || {
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
            id: `kf_root_${se}`,
            timestampEpochMs: Math.round(se),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(ve))
          },
          {
            id: `kf_out_${de}`,
            timestampEpochMs: Math.round(de),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(ve))
          }
        ]
      };
    });
  }, [f, $, V, p, Y]), u.useEffect(() => {
    if (!Ge || Ge.length === 0 || !f || isNaN(f)) return;
    const C = f + ($ || 0), se = f + (V || p || 36e5);
    se <= C || Ge.forEach((de) => {
      _r.fetchWaveform(de.id, C, se, null, 250);
    });
  }, [Ge, f, $, V, p]);
  const Tt = u.useMemo(() => X.find((C) => C.id === k) || null, [X, k]), Rt = !!(k && Tt), Lt = u.useRef("grid"), Ot = u.useRef(null), {
    playheadMs: lt,
    setPlayheadMs: yt,
    isPlaying: Qe,
    setIsPlaying: Fe,
    playbackSpeed: Nt,
    setPlaybackSpeed: Dt,
    isLooping: an,
    setIsLooping: cn,
    togglePlaySmart: wn
  } = Qx({
    timelineBaseEpochMs: f,
    inPointMs: $,
    outPointMs: V,
    globalGaps: w,
    activeStation: Oe,
    spotlightStation: Tt,
    recordingSegments: Q,
    initialPlayheadMs: Se,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !M
  }), {
    zoomLevel: De,
    setZoomLevel: Re,
    viewportStartMs: st,
    setViewportStartMs: ae,
    resetZoom: nt,
    fitRange: z,
    jumpViewportTo: he
  } = Zx({
    containerRef: Ot,
    totalTimelineDurationMs: p,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [pe, Ue] = u.useState(!1), [Je, ut] = u.useState(!1), [dt, qe] = u.useState(!1), [ht, St] = u.useState(!1), [Mt, Pt] = u.useState(
    !!(e.isWorkspaceActive && (($l = e.selectedStationIds) == null ? void 0 : $l.length) > 0)
  ), [rn, _t] = u.useState([]);
  u.useEffect(() => {
    const C = Rt && Tt || Oe, se = (C == null ? void 0 : C.hostname) || (C == null ? void 0 : C.displayName) || (C == null ? void 0 : C.id), de = (o || "NONE").toUpperCase().replace("-", "_");
    if (!se || !f || !(de !== "NONE" && de !== "OFF" || i)) {
      _t([]);
      return;
    }
    const Ce = Math.max(0, f - 5e3), we = f + p + 5e3, Te = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(se)}&startEpoch=${Ce}&endEpoch=${we}`, { signal: Te.signal }).then(($e) => $e.ok ? $e.json() : []).then(($e) => _t(Array.isArray($e) ? $e : [])).catch(($e) => {
      $e.name !== "AbortError" && _t([]);
    }), () => Te.abort();
  }, [Oe, Tt, Rt, f, p, o, i]), u.useEffect(() => {
    ce || (X.length === 0 ? ((y.length > 0 || M || Mt) && (S([]), _(null), g(null), Pt(!1)), St(!0), A(!0)) : (A(!1), S((C) => {
      const se = C.filter((de) => X.some((ve) => ve.id === de));
      return se.length !== C.length ? (se.length === 0 && (Pt(!1), St(!0)), se) : C;
    })));
  }, [ce, X]);
  const zt = u.useCallback((C) => {
    if (C === null) {
      Fe(!1), Dt(1), _(null);
      return;
    }
    C !== M && Dt(1), _(C);
  }, [M, Fe, Dt]), dn = u.useCallback((C, se = null) => {
    C !== M && Dt(1), Lt.current = y.length <= 1 || M ? "spotlight" : "grid", _(C), g(C), T(se || null);
  }, [M, y.length, Dt]), Xt = u.useCallback(() => {
    g(null), T(null), Lt.current === "grid" && _(null);
  }, []), At = u.useMemo(() => {
    if (O != null && O.segments && O.segments.length > 0)
      return O;
    const C = y[0] || M || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          sourceStationId: C
        }
      ]
    };
  }, [O, y, M, f, p]), $n = u.useCallback((C) => {
    K((se) => {
      const de = se || At, ve = [...de.segments || []], Ce = ve.findIndex((it) => {
        const rt = it.startEpochMs ?? it.StartEpochMs ?? 0, bt = it.endEpochMs ?? it.EndEpochMs ?? 0;
        return C > rt + 500 && C < bt - 500;
      });
      if (Ce === -1) return se;
      const we = ve[Ce], Te = we.startEpochMs ?? we.StartEpochMs ?? 0, $e = we.endEpochMs ?? we.EndEpochMs ?? 0, Xe = we.sourceStationId ?? we.SourceStationId ?? y[0], We = { startEpochMs: Te, endEpochMs: C, sourceStationId: Xe }, ze = { startEpochMs: C, endEpochMs: $e, sourceStationId: Xe };
      return ve.splice(Ce, 1, We, ze), { ...de, segments: ve };
    });
  }, [At, y]), gs = u.useCallback((C, se) => {
    K((de) => {
      const ve = de || At, Ce = (ve.segments || []).map((we) => {
        const Te = we.startEpochMs ?? we.StartEpochMs ?? 0, $e = we.endEpochMs ?? we.EndEpochMs ?? 0;
        return C >= Te && C <= $e ? { ...we, sourceStationId: se } : we;
      });
      return { ...ve, segments: Ce };
    }), oe(!1);
  }, [At]), Ss = u.useCallback((C, se) => {
    K((de) => {
      const ve = de || At, Ce = (ve.segments || []).map((we) => {
        const Te = we.startEpochMs ?? we.StartEpochMs ?? 0, $e = we.endEpochMs ?? we.EndEpochMs ?? 0;
        return C >= Te && C <= $e ? { ...we, gain: se } : we;
      });
      return { ...ve, segments: Ce };
    });
  }, [At]), Vr = u.useCallback(() => {
    oe((C) => !C);
  }, []), [Un, Gs] = u.useState({}), Ft = u.useCallback((C) => {
    if (!C) return null;
    if (Un[C]) return Un[C];
    const se = X.find((de) => de.id === C);
    return se != null && se.directorPlan ? se.directorPlan : {
      stationId: C,
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [Un, X, f, p]), Kt = u.useCallback((C, se) => {
    C && Gs((de) => {
      const ve = de[C] || Ft(C), Ce = [...ve.segments || []], we = Ce.findIndex((bt) => {
        const ln = bt.startEpochMs ?? bt.StartEpochMs ?? 0, Vt = bt.endEpochMs ?? bt.EndEpochMs ?? 0;
        return se > ln + 500 && se < Vt - 500;
      });
      if (we === -1) return de;
      const Te = Ce[we], $e = Te.startEpochMs ?? Te.StartEpochMs ?? 0, Xe = Te.endEpochMs ?? Te.EndEpochMs ?? 0, We = Te.targetDisplayId ?? Te.TargetDisplayId ?? "mon-0", ze = !!(Te.isManualOverride ?? Te.IsManualOverride), it = { ...Te, startEpochMs: $e, endEpochMs: se, targetDisplayId: We, isManualOverride: ze }, rt = { ...Te, startEpochMs: se, endEpochMs: Xe, targetDisplayId: We, isManualOverride: ze };
      return Ce.splice(we, 1, it, rt), { ...de, [C]: { ...ve, segments: Ce } };
    });
  }, [Ft]), as = u.useCallback((C, se, de) => {
    C && Gs((ve) => {
      const Ce = ve[C] || Ft(C), we = [...Ce.segments || []];
      let Te = we.findIndex((Xe) => {
        const We = Xe.startEpochMs ?? Xe.StartEpochMs ?? 0, ze = Xe.endEpochMs ?? Xe.EndEpochMs ?? 0;
        return se > We && se < ze;
      });
      if (Te === -1 && (Te = we.findIndex((Xe) => {
        const We = Xe.startEpochMs ?? Xe.StartEpochMs ?? 0, ze = Xe.endEpochMs ?? Xe.EndEpochMs ?? 0;
        return se >= We && se <= ze;
      })), Te === -1) return ve;
      const $e = we[Te];
      return we[Te] = { ...$e, targetDisplayId: de, isManualOverride: !0 }, { ...ve, [C]: { ...Ce, segments: we } };
    });
  }, [Ft]), Wn = u.useCallback((C, se) => {
    if (!C) return;
    const de = X.find((Ce) => Ce.id === C), ve = de == null ? void 0 : de.directorPlan;
    Gs((Ce) => {
      var ln;
      const we = Ce[C] || Ft(C), Te = [...we.segments || []];
      let $e = Te.findIndex((Vt) => {
        const gn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return se > gn && se < xs;
      });
      if ($e === -1 && ($e = Te.findIndex((Vt) => {
        const gn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return se >= gn && se <= xs;
      })), $e === -1) return Ce;
      const Xe = Te[$e], We = Xe.startEpochMs ?? Xe.StartEpochMs ?? 0, ze = Xe.endEpochMs ?? Xe.EndEpochMs ?? 0, it = (We + ze) / 2, rt = (ln = ve == null ? void 0 : ve.segments) == null ? void 0 : ln.find((Vt) => {
        const gn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return it >= gn && it <= xs;
      }), bt = rt ? rt.targetDisplayId ?? rt.TargetDisplayId ?? "mon-0" : "mon-0";
      return Te[$e] = { ...Xe, targetDisplayId: bt, isManualOverride: !1 }, { ...Ce, [C]: { ...we, segments: Te } };
    });
  }, [X, Ft]);
  u.useEffect(() => {
    if (!Ge || Ge.length === 0 || isNaN(f)) return;
    const C = f + $, se = f + V;
    if (se <= C) return;
    const de = setTimeout(async () => {
      const ve = Ge.filter((Ce) => {
        var Te;
        return (Ce.displays || Ce.Displays || ((Te = Ce.displayTopology) == null ? void 0 : Te.displays) || []).length > 1;
      });
      if (ve.length !== 0)
        for (const Ce of ve)
          try {
            const we = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(Ce.id)}&startEpoch=${C}&endEpoch=${se}`);
            if (we.ok) {
              const Te = await we.json();
              Te != null && Te.segments && Te.segments.length > 0 && Gs(($e) => {
                const Xe = $e[Ce.id] || Ce.directorPlan, We = ((Xe == null ? void 0 : Xe.segments) || []).filter((it) => it.isManualOverride || it.IsManualOverride);
                if (We.length === 0)
                  return { ...$e, [Ce.id]: Te };
                const ze = [...Te.segments];
                return We.forEach((it) => {
                  const rt = it.startEpochMs ?? it.StartEpochMs, bt = it.endEpochMs ?? it.EndEpochMs;
                  for (let ln = ze.length - 1; ln >= 0; ln--) {
                    const Vt = ze[ln].startEpochMs ?? ze[ln].StartEpochMs, gn = ze[ln].endEpochMs ?? ze[ln].EndEpochMs;
                    if (!(gn <= rt || Vt >= bt))
                      if (Vt >= rt && gn <= bt)
                        ze.splice(ln, 1);
                      else if (Vt < rt && gn > bt) {
                        const xs = { ...ze[ln], endEpochMs: rt }, Cr = { ...ze[ln], startEpochMs: bt };
                        ze.splice(ln, 1, xs, Cr);
                      } else Vt < rt ? ze[ln].endEpochMs = rt : gn > bt && (ze[ln].startEpochMs = bt);
                  }
                  ze.push(it);
                }), ze.sort((it, rt) => (it.startEpochMs ?? it.StartEpochMs) - (rt.startEpochMs ?? rt.StartEpochMs)), { ...$e, [Ce.id]: { ...Te, segments: ze } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(de);
  }, [$, V, Ge, f]);
  const Er = u.useMemo(() => Ge.map((C) => ({
    ...C,
    directorPlan: Un[C.id] || C.directorPlan || Ft(C.id)
  })), [Ge, Un, Ft]), Mn = u.useMemo(() => Oe ? {
    ...Oe,
    directorPlan: Un[Oe.id] || Oe.directorPlan || Ft(Oe.id)
  } : null, [Oe, Un, Ft]), Ms = u.useMemo(() => Tt ? {
    ...Tt,
    directorPlan: Un[Tt.id] || Tt.directorPlan || Ft(Tt.id)
  } : null, [Tt, Un, Ft]), Pe = (C, se = 30) => {
    const de = Math.max(0, C), ve = Math.floor(de / 1e3), Ce = Math.floor(ve / 3600), we = Math.floor(ve % 3600 / 60), Te = ve % 60, $e = Math.floor(de % 1e3 / 1e3 * se), Xe = (We) => String(We).padStart(2, "0");
    return `${Xe(Ce)}:${Xe(we)}:${Xe(Te)}.${Xe($e)}`;
  }, [Me, Os] = u.useState(!1), [Ao, jr] = u.useState(!0), [$o, Ro] = u.useState(!1), Jn = u.useRef(null), hn = u.useMemo(() => {
    var ve;
    const C = Be == null ? void 0 : Be.keyframes, se = (C == null ? void 0 : C[et]) || (C == null ? void 0 : C[0]);
    return (((ve = se == null ? void 0 : se.layout) == null ? void 0 : ve.placements) || (Y == null ? void 0 : Y.placements) || []).length > 0 || y && y.length > 0;
  }, [Be, et, Y, y]), Zt = u.useCallback(() => {
    Jn.current && clearTimeout(Jn.current), jr(!0), Jn.current = setTimeout(() => {
      $o || jr(!1);
    }, 2500);
  }, [$o]);
  u.useEffect(() => {
    if (!Me) {
      jr(!0), Jn.current && clearTimeout(Jn.current);
      return;
    }
    const C = (se) => {
      se.clientY >= window.innerHeight - 280 && jr(!0), Zt();
    };
    return window.addEventListener("mousemove", C, { passive: !0 }), Zt(), () => {
      window.removeEventListener("mousemove", C), Jn.current && clearTimeout(Jn.current);
    };
  }, [Me, Zt]);
  const vn = u.useCallback(() => {
    Os((C) => {
      const se = !C;
      return se ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), se;
    });
  }, []), pn = u.useCallback(() => {
    Os(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  u.useEffect(() => {
    const C = () => {
      !document.fullscreenElement && Me && Os(!1);
    };
    return document.addEventListener("fullscreenchange", C), () => document.removeEventListener("fullscreenchange", C);
  }, [Me]), qx({
    activeStationId: M,
    spotlightStationId: k,
    timelineStations: Er,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: zt,
    setPlaybackSpeed: Dt,
    playheadMs: lt,
    setPlayheadMs: yt,
    inPointMs: $,
    setInPointMs: ee,
    outPointMs: V,
    setOutPointMs: q,
    totalTimelineDurationMs: p,
    zoomLevel: De,
    togglePlaySmart: wn,
    onToggleHelpModal: () => qe((C) => !C),
    onSplitDirectorAtPlayhead: () => {
      var se, de, ve;
      const C = M || (y.length === 1 ? y[0] : null);
      if (C) {
        const Ce = X.find((Te) => Te.id === C);
        (((se = Ce == null ? void 0 : Ce.displays) == null ? void 0 : se.length) > 1 || ((ve = (de = Ce == null ? void 0 : Ce.topology) == null ? void 0 : de.displays) == null ? void 0 : ve.length) > 1) && Kt(C, f + lt);
      }
    },
    isModalActive: pe || Je || dt,
    hasGridPlacements: hn,
    onToggleGridFullscreen: vn,
    isGridFullscreen: Me,
    onExitGridFullscreen: pn
  }), u.useEffect(() => {
    const C = f + $, se = f + V, de = f + lt;
    Ap({
      timeRange: t,
      timeMode: r,
      inPointMs: $,
      outPointMs: V,
      playheadMs: Math.round(lt),
      inEpochMs: C,
      outEpochMs: se,
      playheadEpochMs: de,
      selectedStationIds: y,
      activeStationId: M,
      zoomLevel: De,
      viewportStartMs: st,
      isWorkspaceActive: Mt,
      isLooping: an,
      playbackSpeed: Nt,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: P,
      compositionLayout: L,
      isAutoDirectorEnabled: ne,
      isPipSwapped: I,
      audioRoutingPlan: At,
      isAutoFollowAudio: R,
      canvasLayoutTimeline: Be
    });
  }, [
    t,
    r,
    $,
    V,
    lt,
    y,
    M,
    De,
    st,
    Mt,
    an,
    Nt,
    f,
    o,
    i,
    P,
    L,
    ne,
    I,
    At,
    R,
    Be
  ]);
  const En = u.useCallback((C) => {
    var We, ze;
    const se = Vl(C.startTime), de = Vl(C.endTime), ve = Math.max(0, de - se) || 144e5, Ce = {
      start: C.startTime,
      end: C.endTime,
      durationMs: ve,
      startEpochMs: se,
      endEpochMs: de
    }, we = Math.max(6e4, Math.round(ve * 0.05)), Te = se - we, $e = ve + 2 * we;
    if (n(Ce), C.inEpochMs && C.outEpochMs) {
      const it = Math.max(0, Math.min($e, C.inEpochMs - Te)), rt = Math.max(it + 1e3, Math.min($e, C.outEpochMs - Te)), bt = C.playheadEpochMs ? Math.max(0, Math.min($e, C.playheadEpochMs - Te)) : it;
      ee(it), q(rt), yt(bt);
    } else {
      const it = typeof C.inPointMs == "number" ? C.inPointMs : we, rt = typeof C.outPointMs == "number" ? C.outPointMs : we + ve, bt = typeof C.playheadMs == "number" ? C.playheadMs : it;
      ee(Math.max(0, Math.min($e, it))), q(Math.max(0, Math.min($e, rt))), yt(Math.max(0, Math.min($e, bt)));
    }
    const Xe = ((We = C.selectedStationIds) == null ? void 0 : We.length) > 0 ? C.selectedStationIds : ((ze = C.cutStationIds) == null ? void 0 : ze.length) > 0 ? C.cutStationIds : C.stationIds;
    if ((Xe == null ? void 0 : Xe.length) > 0) {
      S(Xe);
      const it = C.spotlightStationId || C.SpotlightStationId || null, rt = C.activeStationId || C.ActiveStationId || null;
      it && Xe.includes(it) ? (_(it), g(it)) : rt && Xe.includes(rt) ? (_(rt), g(null)) : (_(null), g(null));
    }
    C.keystrokeMode && a(C.keystrokeMode), Pt(!0), St(!1);
  }, []), Lo = u.useCallback((C) => {
    const se = C.startEpochMs || Vl(C.start, null, r), de = C.endEpochMs || Vl(C.end, null, r), ve = Math.max(0, de - se) || 144e5, Ce = Math.max(6e4, Math.round(ve * 0.05)), we = se - Ce, Te = ve + 2 * Ce;
    n({
      ...C,
      startEpochMs: se,
      endEpochMs: de,
      durationMs: ve
    }), A(!1), ee(Ce), q(Ce + ve), yt(Ce), je(($e) => {
      if (!($e != null && $e.keyframes) || $e.keyframes.length === 0) return $e;
      const Xe = $e.keyframes.map((We, ze) => ze === 0 ? { ...We, timestampEpochMs: we } : We).filter((We) => We.timestampEpochMs >= we && We.timestampEpochMs <= we + Te);
      return { ...$e, keyframes: Xe };
    }), K(($e) => {
      if (!($e != null && $e.segments) || $e.segments.length === 0) return $e;
      if (!$e.segments.some((We) => {
        const ze = We.startEpochMs ?? We.StartEpochMs ?? 0;
        return (We.endEpochMs ?? We.EndEpochMs ?? 0) > we && ze < we + Te;
      })) {
        const We = y[0] || M || "station-0";
        return {
          segments: [
            {
              startEpochMs: we,
              endEpochMs: we + Te,
              sourceStationId: We
            }
          ]
        };
      }
      return $e;
    }), Gs({});
  }, [r, y, M]), mn = u.useCallback(() => {
    if (Ge.map((se) => se.id).length === 0) return alert("No active stations selected in timeline.");
    Z(!0);
  }, [Ge]), zn = u.useCallback(async (C, se) => {
    var Te, $e, Xe, We;
    const de = Ge.map((ze) => ze.id);
    if (de.length === 0) return;
    let ve = C === "None" ? "None" : "BurnIn";
    const Ce = se || "NATIVE", we = ((Te = Mn == null ? void 0 : Mn.displays) == null ? void 0 : Te.length) > 1 || ((Xe = ($e = Mn == null ? void 0 : Mn.topology) == null ? void 0 : $e.displays) == null ? void 0 : Xe.length) > 1 ? ((We = Mn == null ? void 0 : Mn.directorPlan) == null ? void 0 : We.segments) || [] : [];
    try {
      const ze = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: Up(),
          stationIds: de,
          inEpochMs: f + $,
          outEpochMs: f + V,
          keystrokeMode: ve,
          resolution: Ce,
          videoQuality: Ce,
          compositionScope: P,
          layoutMode: "canvas",
          canvasLayout: Y,
          canvasLayoutTimeline: Be,
          isPipSwapped: I,
          isAutoDirectorEnabled: ne,
          directorSegments: we,
          audioRoutingSegments: At.segments || [],
          utcClockPosition: (() => {
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!ze.ok) throw new Error(`HTTP ${ze.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (ze) {
      console.error("[Studio] Export failed:", ze), alert("Failed to launch background master MP4 export job.");
    }
  }, [Ge, f, $, V, P, Y, Be, I, ne, Mn, At]), xe = u.useCallback(() => {
    $g();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const C = dh(), se = Math.max(6e4, Math.round(C.durationMs * 0.05));
    n(C), ee(se), q(se + C.durationMs), yt(se), S([]), _(null), g(null), Fe(!1), Dt(1), a("BURN_IN"), nt(), Pt(!1), St(!0);
  }, [nt, Fe, Dt, yt]), Zn = !Mt || y.length === 0, Rn = f + lt;
  return u.useEffect(() => {
    const C = Be == null ? void 0 : Be.keyframes;
    if (!C || C.length === 0) return;
    let se = 0;
    for (let de = 0; de < C.length && C[de].timestampEpochMs <= Rn + 50; de++)
      se = de;
    se !== et && be(se);
  }, [Rn, Be == null ? void 0 : Be.keyframes, et]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        bg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: M,
          hideBackToGrid: Ge.length <= 1,
          onResetActiveStation: () => zt(null),
          onOpenRangeModal: () => Ue(!0),
          onOpenBookmarksModal: () => ut(!0),
          onOpenHelpModal: () => qe(!0),
          onToggleDrawer: () => St(!ht),
          isInitialSetup: Zn,
          selectedCount: y.length,
          totalCount: X.length,
          onResetStudio: xe
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
              onClick: () => Ue(!0),
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
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${Me ? "cinema-fullscreen-mode" : ""}`, children: [
        Me && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${Ao ? "" : "is-hud-hidden"}`, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "top-hud-left-group", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-exit-spotlight",
                onClick: pn,
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
                onClick: () => qe(!0),
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
        !Zn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              Xg,
              {
                activeStation: Mn,
                timelineStations: Er,
                allStations: X,
                onSelectActiveStation: zt,
                onOpenSpotlight: dn,
                onStationContextMenu: me,
                onDeselectStation: Ve,
                stationAutoDirectorMap: ke,
                onToggleStationAutoDirector: Ye,
                onOpenDrawer: () => St(!0),
                baseEpochMs: f,
                playheadMs: lt,
                playheadEpochMs: Rn,
                timeMode: r,
                isPlaying: Rt ? !1 : Qe,
                setIsPlaying: Fe,
                totalDurationMs: p,
                inPointMs: $,
                outPointMs: V,
                setPlayheadMs: yt,
                globalGaps: w,
                recordingSegments: Q,
                playbackSpeed: Nt,
                onChangePlaybackSpeed: Dt,
                keystrokeMode: o,
                keystrokes: rn,
                directorPlan: Mn == null ? void 0 : Mn.directorPlan,
                onOverrideDisplay: as,
                onResetOverride: Wn,
                compositionScope: P,
                onChangeCompositionScope: W,
                compositionLayout: L,
                onChangeCompositionLayout: re,
                isAutoDirectorEnabled: ne,
                onToggleAutoDirector: () => H((C) => !C),
                isPipSwapped: I,
                onTogglePipSwap: () => U((C) => !C),
                onUpdateCanvasLayout: Le,
                canvasLayoutTimeline: Be,
                onUpdateCanvasLayoutTimeline: je,
                activeKfIndex: et,
                setActiveKfIndex: be,
                isModalOpen: te || pe || Je || Rt || dt,
                isGridFullscreen: Me,
                onToggleGridFullscreen: vn
              }
            ),
            !Me && /* @__PURE__ */ s.jsx(
              Uc,
              {
                hasGridPlacements: hn,
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: p,
                playheadMs: lt,
                setPlayheadMs: yt,
                inPointMs: $,
                setInPointMs: ee,
                outPointMs: V,
                setOutPointMs: q,
                activeStationId: M,
                isPlaying: Qe,
                setIsPlaying: wn,
                isLooping: an,
                setIsLooping: cn,
                playbackSpeed: Nt,
                onChangeSpeed: Dt,
                onSetInPoint: () => ee(Math.max(0, Math.min(lt, V - 1e3))),
                onSetOutPoint: () => q(Math.min(p, Math.max(lt, $ + 1e3))),
                onStepFrameBackward: () => {
                  Fe(!1), yt((C) => Math.max(0, C - 33));
                },
                onStepFrameForward: () => {
                  Fe(!1), yt((C) => Math.min(p, C + 33));
                }
              }
            )
          ] }),
          Me && /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "cinema-bottom-sensor-strip",
              onMouseEnter: () => {
                jr(!0), Zt();
              }
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `studio-bottom-timeline ${Me ? "cinema-timeline-island" : ""} ${Me && !Ao ? "dock-hidden" : ""} ${Me && Qe ? "is-playing-dimmed" : ""}`,
              ref: Ot,
              onMouseEnter: () => Ro(!0),
              onMouseLeave: () => {
                Ro(!1), Me && Zt();
              },
              children: [
                Me && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                      /* @__PURE__ */ s.jsx("span", { className: "val", children: Pe(V - $) })
                    ] }),
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "btn-export-cut-hero",
                        onClick: mn,
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
                    Uc,
                    {
                      hasGridPlacements: hn,
                      baseEpochMs: f,
                      timeMode: r,
                      totalDurationMs: p,
                      playheadMs: lt,
                      setPlayheadMs: yt,
                      inPointMs: $,
                      setInPointMs: ee,
                      outPointMs: V,
                      setOutPointMs: q,
                      activeStationId: M,
                      isPlaying: Qe,
                      setIsPlaying: wn,
                      isLooping: an,
                      setIsLooping: cn,
                      playbackSpeed: Nt,
                      onChangeSpeed: Dt,
                      onSetInPoint: () => ee(Math.max(0, Math.min(lt, V - 1e3))),
                      onSetOutPoint: () => q(Math.min(p, Math.max(lt, $ + 1e3))),
                      onStepFrameBackward: () => {
                        Fe(!1), yt((C) => Math.max(0, C - 33));
                      },
                      onStepFrameForward: () => {
                        Fe(!1), yt((C) => Math.min(p, C + 33));
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                    /* @__PURE__ */ s.jsx("span", { className: "digits", children: jt(f + lt, r) })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  _p,
                  {
                    stations: Er,
                    activeStationId: M,
                    onSelectActiveStation: (C) => zt(y.length <= 1 ? C : C === M ? null : C),
                    onStationContextMenu: me,
                    onDeselectStation: Ve,
                    stationAutoDirectorMap: ke,
                    onToggleStationAutoDirector: Ye,
                    baseEpochMs: f,
                    timeMode: r,
                    totalDurationMs: p,
                    zoomLevel: De,
                    onZoomChange: Re,
                    onZoomReset: nt,
                    onFitRange: z,
                    onJumpViewportTo: he,
                    playheadMs: lt,
                    setPlayheadMs: yt,
                    inPointMs: $,
                    setInPointMs: ee,
                    outPointMs: V,
                    setOutPointMs: q,
                    viewportStartMs: st,
                    onViewportStartChange: ae,
                    onExport: mn,
                    recordingSegments: Q,
                    movieBoundaries: Ze,
                    onEstimateLoaded: (C) => (C == null ? void 0 : C.removedGlobalGaps) && b(C.removedGlobalGaps),
                    keystrokeMode: o,
                    onChangeKeystrokeMode: a,
                    keystrokes: rn,
                    showKeystrokes: i,
                    showRulerKeystrokes: i,
                    onToggleRulerKeystrokes: () => c((C) => !C),
                    onSplitDirectorSegment: Kt,
                    onChangeDirectorSegmentDisplay: as,
                    onResetDirectorSegmentToAuto: Wn,
                    audioRoutingPlan: At,
                    onSplitAudioSegment: $n,
                    onChangeAudioSegmentStation: gs,
                    onChangeAudioSegmentGain: Ss,
                    onFollowVisualFeed: Vr,
                    isAutoFollowAudio: R,
                    canvasLayoutTimeline: Be,
                    activeKfIndex: et,
                    onSelectKeyframe: (C, se) => {
                      be(C), yt(Math.max(0, se - f));
                    },
                    onAddKeyframeAtEpoch: Ie,
                    onDeleteKeyframe: at,
                    onUpdateKeyframeEpoch: ie,
                    onUpdateKeyframeTransition: tt,
                    onToggleDisplayOnCanvas: ot,
                    onUpdateAudioPlan: K
                  }
                )
              ]
            }
          )
        ] }),
        !Me && /* @__PURE__ */ s.jsx(
          Ox,
          {
            isOpen: ht || Zn,
            onToggle: () => St(!ht),
            onClose: () => St(!1),
            allStations: X,
            selectedStationIds: y,
            onToggleStation: (C) => S((se) => se.includes(C) ? se.filter((de) => de !== C) : [...se, C]),
            onUpdateSelections: S,
            isInitialSetup: Zn,
            isLoadingStations: ce,
            recordingSegments: Q,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (_(null), g(null), Pt(!0), St(!1));
            },
            onOpenRangeModal: () => Ue(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      _x,
      {
        isOpen: pe,
        onClose: () => Ue(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: En,
        onApplyRange: Lo
      }
    ),
    /* @__PURE__ */ s.jsx(
      Bx,
      {
        isOpen: Je,
        onClose: () => ut(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: lt,
          inPointMs: $,
          outPointMs: V,
          selectedStationIds: y,
          selectedStationNames: X.filter((C) => y.includes(C.id)).map((C) => C.displayName || C.hostname || C.id),
          allStationIds: X.map((C) => C.id),
          activeStationId: M,
          activeStationName: (Oe == null ? void 0 : Oe.displayName) || (Oe == null ? void 0 : Oe.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: En
      }
    ),
    /* @__PURE__ */ s.jsx(
      Wp,
      {
        isOpen: dt,
        onClose: () => qe(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Vx,
      {
        isOpen: Rt,
        station: Ms,
        initialDisplayId: m,
        allStations: Er,
        onSelectStation: (C) => {
          C !== k && Dt(1), _(C), g(C);
        },
        onClose: Xt,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: p,
        zoomLevel: De,
        onZoomChange: Re,
        onZoomReset: nt,
        onFitRange: z,
        onJumpViewportTo: he,
        viewportStartMs: st,
        onViewportStartChange: ae,
        playheadMs: lt,
        setPlayheadMs: yt,
        playheadEpochMs: Rn,
        inPointMs: $,
        setInPointMs: ee,
        outPointMs: V,
        setOutPointMs: q,
        recordingSegments: Q,
        globalGaps: w,
        isPlaying: Qe,
        setIsPlaying: Fe,
        isLooping: an,
        setIsLooping: cn,
        playbackSpeed: Nt,
        setPlaybackSpeed: Dt,
        onExport: mn,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: rn,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c((C) => !C),
        directorPlan: Ms == null ? void 0 : Ms.directorPlan,
        onOverrideDisplay: as,
        onSplitDirectorSegment: Kt,
        onChangeDirectorSegmentDisplay: as,
        onResetDirectorSegmentToAuto: Wn
      }
    ),
    /* @__PURE__ */ s.jsx(
      Yx,
      {
        menu: E,
        onClose: () => N(null),
        onDeselect: Ve,
        onFocusSolo: zt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Gx,
      {
        isOpen: te,
        onClose: () => Z(!1),
        onConfirm: zn,
        compositionSummary: {
          scope: P,
          layout: (Y == null ? void 0 : Y.preset) || L,
          isPipSwapped: I,
          isAutoDirectorEnabled: ne,
          stationsCount: Ge.length,
          audioSegmentsCount: ((Rl = At == null ? void 0 : At.segments) == null ? void 0 : Rl.length) || 1,
          resolution: (Be == null ? void 0 : Be.resolution) || "NATIVE",
          canvasWidth: (Y == null ? void 0 : Y.width) || 1920,
          canvasHeight: (Y == null ? void 0 : Y.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(zp, {})
  ] });
}
const hh = "itb-extractor-advanced-theme", fh = "itb-global-export-job-monitor-root";
function Hp() {
  if (!(typeof document > "u") && !document.getElementById(hh)) {
    const e = document.createElement("link");
    e.id = hh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Hp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(fh);
  if (!t) {
    t = document.createElement("div"), t.id = fh, document.body.appendChild(t);
    try {
      xa.createRoot(t).render(So.createElement(zp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function t1(e, t = {}) {
  Hp();
  const n = xa.createRoot(e);
  return n.render(So.createElement(e1, t)), () => {
    n.unmount();
  };
}
export {
  zp as ExportJobMonitor,
  e1 as ExtractorAdvancedStudio,
  e1 as default,
  t1 as mount
};
