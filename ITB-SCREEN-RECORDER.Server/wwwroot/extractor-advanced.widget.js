function Ap(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var zd = { exports: {} }, mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var io = Symbol.for("react.element"), $p = Symbol.for("react.portal"), Rp = Symbol.for("react.fragment"), Lp = Symbol.for("react.strict_mode"), Op = Symbol.for("react.profiler"), Dp = Symbol.for("react.provider"), Pp = Symbol.for("react.context"), _p = Symbol.for("react.forward_ref"), Fp = Symbol.for("react.suspense"), Bp = Symbol.for("react.memo"), Up = Symbol.for("react.lazy"), Nu = Symbol.iterator;
function Wp(e) {
  return e === null || typeof e != "object" ? null : (e = Nu && e[Nu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Hd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Vd = Object.assign, Kd = {};
function fl(e, t, n) {
  this.props = e, this.context = t, this.refs = Kd, this.updater = n || Hd;
}
fl.prototype.isReactComponent = {};
fl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
fl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Gd() {
}
Gd.prototype = fl.prototype;
function vc(e, t, n) {
  this.props = e, this.context = t, this.refs = Kd, this.updater = n || Hd;
}
var Nc = vc.prototype = new Gd();
Nc.constructor = vc;
Vd(Nc, fl.prototype);
Nc.isPureReactComponent = !0;
var ku = Array.isArray, Yd = Object.prototype.hasOwnProperty, kc = { current: null }, Xd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Qd(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) Yd.call(t, r) && !Xd.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), d = 0; d < a; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: io, type: e, key: o, ref: i, props: l, _owner: kc.current };
}
function zp(e, t) {
  return { $$typeof: io, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function wc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === io;
}
function Hp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var wu = /\/+/g;
function zi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Hp("" + e.key) : t.toString(36);
}
function Do(e, t, n, r, l) {
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
        case io:
        case $p:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + zi(i, 0) : r, ku(l) ? (n = "", e != null && (n = e.replace(wu, "$&/") + "/"), Do(l, t, n, "", function(d) {
    return d;
  })) : l != null && (wc(l) && (l = zp(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(wu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", ku(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var c = r + zi(o, a);
    i += Do(o, t, n, c, l);
  }
  else if (c = Wp(e), typeof c == "function") for (e = c.call(e), a = 0; !(o = e.next()).done; ) o = o.value, c = r + zi(o, a++), i += Do(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function xo(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Do(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Vp(e) {
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
var Tn = { current: null }, Po = { transition: null }, Kp = { ReactCurrentDispatcher: Tn, ReactCurrentBatchConfig: Po, ReactCurrentOwner: kc };
function Jd() {
  throw Error("act(...) is not supported in production builds of React.");
}
mt.Children = { map: xo, forEach: function(e, t, n) {
  xo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return xo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return xo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!wc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
mt.Component = fl;
mt.Fragment = Rp;
mt.Profiler = Op;
mt.PureComponent = vc;
mt.StrictMode = Lp;
mt.Suspense = Fp;
mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kp;
mt.act = Jd;
mt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Vd({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = kc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) Yd.call(t, c) && !Xd.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var d = 0; d < c; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: io, type: e.type, key: l, ref: o, props: r, _owner: i };
};
mt.createContext = function(e) {
  return e = { $$typeof: Pp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Dp, _context: e }, e.Consumer = e;
};
mt.createElement = Qd;
mt.createFactory = function(e) {
  var t = Qd.bind(null, e);
  return t.type = e, t;
};
mt.createRef = function() {
  return { current: null };
};
mt.forwardRef = function(e) {
  return { $$typeof: _p, render: e };
};
mt.isValidElement = wc;
mt.lazy = function(e) {
  return { $$typeof: Up, _payload: { _status: -1, _result: e }, _init: Vp };
};
mt.memo = function(e, t) {
  return { $$typeof: Bp, type: e, compare: t === void 0 ? null : t };
};
mt.startTransition = function(e) {
  var t = Po.transition;
  Po.transition = {};
  try {
    e();
  } finally {
    Po.transition = t;
  }
};
mt.unstable_act = Jd;
mt.useCallback = function(e, t) {
  return Tn.current.useCallback(e, t);
};
mt.useContext = function(e) {
  return Tn.current.useContext(e);
};
mt.useDebugValue = function() {
};
mt.useDeferredValue = function(e) {
  return Tn.current.useDeferredValue(e);
};
mt.useEffect = function(e, t) {
  return Tn.current.useEffect(e, t);
};
mt.useId = function() {
  return Tn.current.useId();
};
mt.useImperativeHandle = function(e, t, n) {
  return Tn.current.useImperativeHandle(e, t, n);
};
mt.useInsertionEffect = function(e, t) {
  return Tn.current.useInsertionEffect(e, t);
};
mt.useLayoutEffect = function(e, t) {
  return Tn.current.useLayoutEffect(e, t);
};
mt.useMemo = function(e, t) {
  return Tn.current.useMemo(e, t);
};
mt.useReducer = function(e, t, n) {
  return Tn.current.useReducer(e, t, n);
};
mt.useRef = function(e) {
  return Tn.current.useRef(e);
};
mt.useState = function(e) {
  return Tn.current.useState(e);
};
mt.useSyncExternalStore = function(e, t, n) {
  return Tn.current.useSyncExternalStore(e, t, n);
};
mt.useTransition = function() {
  return Tn.current.useTransition();
};
mt.version = "18.3.1";
zd.exports = mt;
var u = zd.exports;
const ao = /* @__PURE__ */ Ap(u);
var Qo = {}, Zd = { exports: {} }, Gn = {}, qd = { exports: {} }, eh = {};
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
  function t(S, U) {
    var F = S.length;
    S.push(U);
    e: for (; 0 < F; ) {
      var ee = F - 1 >>> 1, R = S[ee];
      if (0 < l(R, U)) S[ee] = U, S[F] = R, F = ee;
      else break e;
    }
  }
  function n(S) {
    return S.length === 0 ? null : S[0];
  }
  function r(S) {
    if (S.length === 0) return null;
    var U = S[0], F = S.pop();
    if (F !== U) {
      S[0] = F;
      e: for (var ee = 0, R = S.length, Z = R >>> 1; ee < Z; ) {
        var Q = 2 * (ee + 1) - 1, q = S[Q], Y = Q + 1, re = S[Y];
        if (0 > l(q, F)) Y < R && 0 > l(re, q) ? (S[ee] = re, S[Y] = F, ee = Y) : (S[ee] = q, S[Q] = F, ee = Q);
        else if (Y < R && 0 > l(re, F)) S[ee] = re, S[Y] = F, ee = Y;
        else break e;
      }
    }
    return U;
  }
  function l(S, U) {
    var F = S.sortIndex - U.sortIndex;
    return F !== 0 ? F : S.id - U.id;
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
  var c = [], d = [], y = 1, f = null, m = 3, x = !1, w = !1, E = !1, $ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(S) {
    for (var U = n(d); U !== null; ) {
      if (U.callback === null) r(d);
      else if (U.startTime <= S) r(d), U.sortIndex = U.expirationTime, t(c, U);
      else break;
      U = n(d);
    }
  }
  function k(S) {
    if (E = !1, h(S), !w) if (n(c) !== null) w = !0, B(M);
    else {
      var U = n(d);
      U !== null && W(k, U.startTime - S);
    }
  }
  function M(S, U) {
    w = !1, E && (E = !1, v(b), b = -1), x = !0;
    var F = m;
    try {
      for (h(U), f = n(c); f !== null && (!(f.expirationTime > U) || S && !_()); ) {
        var ee = f.callback;
        if (typeof ee == "function") {
          f.callback = null, m = f.priorityLevel;
          var R = ee(f.expirationTime <= U);
          U = e.unstable_now(), typeof R == "function" ? f.callback = R : f === n(c) && r(c), h(U);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var Z = !0;
      else {
        var Q = n(d);
        Q !== null && W(k, Q.startTime - U), Z = !1;
      }
      return Z;
    } finally {
      f = null, m = F, x = !1;
    }
  }
  var j = !1, N = null, b = -1, C = 5, I = -1;
  function _() {
    return !(e.unstable_now() - I < C);
  }
  function K() {
    if (N !== null) {
      var S = e.unstable_now();
      I = S;
      var U = !0;
      try {
        U = N(!0, S);
      } finally {
        U ? A() : (j = !1, N = null);
      }
    } else j = !1;
  }
  var A;
  if (typeof g == "function") A = function() {
    g(K);
  };
  else if (typeof MessageChannel < "u") {
    var z = new MessageChannel(), G = z.port2;
    z.port1.onmessage = K, A = function() {
      G.postMessage(null);
    };
  } else A = function() {
    $(K, 0);
  };
  function B(S) {
    N = S, j || (j = !0, A());
  }
  function W(S, U) {
    b = $(function() {
      S(e.unstable_now());
    }, U);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(S) {
    S.callback = null;
  }, e.unstable_continueExecution = function() {
    w || x || (w = !0, B(M));
  }, e.unstable_forceFrameRate = function(S) {
    0 > S || 125 < S ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < S ? Math.floor(1e3 / S) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(S) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var U = 3;
        break;
      default:
        U = m;
    }
    var F = m;
    m = U;
    try {
      return S();
    } finally {
      m = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(S, U) {
    switch (S) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        S = 3;
    }
    var F = m;
    m = S;
    try {
      return U();
    } finally {
      m = F;
    }
  }, e.unstable_scheduleCallback = function(S, U, F) {
    var ee = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? ee + F : ee) : F = ee, S) {
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
    return R = F + R, S = { id: y++, callback: U, priorityLevel: S, startTime: F, expirationTime: R, sortIndex: -1 }, F > ee ? (S.sortIndex = F, t(d, S), n(c) === null && S === n(d) && (E ? (v(b), b = -1) : E = !0, W(k, F - ee))) : (S.sortIndex = R, t(c, S), w || x || (w = !0, B(M))), S;
  }, e.unstable_shouldYield = _, e.unstable_wrapCallback = function(S) {
    var U = m;
    return function() {
      var F = m;
      m = U;
      try {
        return S.apply(this, arguments);
      } finally {
        m = F;
      }
    };
  };
})(eh);
qd.exports = eh;
var Gp = qd.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yp = u, Kn = Gp;
function fe(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var th = /* @__PURE__ */ new Set(), zl = {};
function Sr(e, t) {
  ol(e, t), ol(e + "Capture", t);
}
function ol(e, t) {
  for (zl[e] = t, e = 0; e < t.length; e++) th.add(t[e]);
}
var bs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wa = Object.prototype.hasOwnProperty, Xp = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ju = {}, Eu = {};
function Qp(e) {
  return wa.call(Eu, e) ? !0 : wa.call(ju, e) ? !1 : Xp.test(e) ? Eu[e] = !0 : (ju[e] = !0, !1);
}
function Jp(e, t, n, r) {
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
function Zp(e, t, n, r) {
  if (t === null || typeof t > "u" || Jp(e, t, n, r)) return !0;
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
function In(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var xn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  xn[e] = new In(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  xn[t] = new In(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  xn[e] = new In(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  xn[e] = new In(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  xn[e] = new In(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  xn[e] = new In(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  xn[e] = new In(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  xn[e] = new In(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  xn[e] = new In(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var jc = /[\-:]([a-z])/g;
function Ec(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    jc,
    Ec
  );
  xn[t] = new In(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(jc, Ec);
  xn[t] = new In(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(jc, Ec);
  xn[t] = new In(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  xn[e] = new In(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xn.xlinkHref = new In("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  xn[e] = new In(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Cc(e, t, n, r) {
  var l = xn.hasOwnProperty(t) ? xn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Zp(t, n, l, r) && (n = null), r || l === null ? Qp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var As = Yp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, yo = Symbol.for("react.element"), _r = Symbol.for("react.portal"), Fr = Symbol.for("react.fragment"), Sc = Symbol.for("react.strict_mode"), ja = Symbol.for("react.profiler"), nh = Symbol.for("react.provider"), sh = Symbol.for("react.context"), bc = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Ca = Symbol.for("react.suspense_list"), Mc = Symbol.for("react.memo"), Fs = Symbol.for("react.lazy"), rh = Symbol.for("react.offscreen"), Cu = Symbol.iterator;
function vl(e) {
  return e === null || typeof e != "object" ? null : (e = Cu && e[Cu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Vt = Object.assign, Hi;
function Il(e) {
  if (Hi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Hi = t && t[1] || "";
  }
  return `
` + Hi + e;
}
var Vi = !1;
function Ki(e, t) {
  if (!e || Vi) return "";
  Vi = !0;
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
    Vi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Il(e) : "";
}
function qp(e) {
  switch (e.tag) {
    case 5:
      return Il(e.type);
    case 16:
      return Il("Lazy");
    case 13:
      return Il("Suspense");
    case 19:
      return Il("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ki(e.type, !1), e;
    case 11:
      return e = Ki(e.type.render, !1), e;
    case 1:
      return e = Ki(e.type, !0), e;
    default:
      return "";
  }
}
function Sa(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Fr:
      return "Fragment";
    case _r:
      return "Portal";
    case ja:
      return "Profiler";
    case Sc:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Ca:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case sh:
      return (e.displayName || "Context") + ".Consumer";
    case nh:
      return (e._context.displayName || "Context") + ".Provider";
    case bc:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Mc:
      return t = e.displayName || null, t !== null ? t : Sa(e.type) || "Memo";
    case Fs:
      t = e._payload, e = e._init;
      try {
        return Sa(e(t));
      } catch {
      }
  }
  return null;
}
function em(e) {
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
      return Sa(t);
    case 8:
      return t === Sc ? "StrictMode" : "Mode";
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
function nr(e) {
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
function lh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function tm(e) {
  var t = lh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function vo(e) {
  e._valueTracker || (e._valueTracker = tm(e));
}
function oh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = lh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Jo(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ba(e, t) {
  var n = t.checked;
  return Vt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Su(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = nr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ih(e, t) {
  t = t.checked, t != null && Cc(e, "checked", t, !1);
}
function Ma(e, t) {
  ih(e, t);
  var n = nr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ta(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ta(e, t.type, nr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function bu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Ta(e, t, n) {
  (t !== "number" || Jo(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Al = Array.isArray;
function Jr(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + nr(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ia(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(fe(91));
  return Vt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Mu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(fe(92));
      if (Al(n)) {
        if (1 < n.length) throw Error(fe(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: nr(n) };
}
function ah(e, t) {
  var n = nr(t.value), r = nr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Tu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ch(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Aa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ch(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var No, uh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (No = No || document.createElement("div"), No.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = No.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Hl(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ll = {
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
}, nm = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ll).forEach(function(e) {
  nm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Ll[t] = Ll[e];
  });
});
function dh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ll.hasOwnProperty(e) && Ll[e] ? ("" + t).trim() : t + "px";
}
function hh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = dh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var sm = Vt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function $a(e, t) {
  if (t) {
    if (sm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(fe(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(fe(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(fe(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(fe(62));
  }
}
function Ra(e, t) {
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
var La = null;
function Tc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Oa = null, Zr = null, qr = null;
function Iu(e) {
  if (e = ho(e)) {
    if (typeof Oa != "function") throw Error(fe(280));
    var t = e.stateNode;
    t && (t = bi(t), Oa(e.stateNode, e.type, t));
  }
}
function fh(e) {
  Zr ? qr ? qr.push(e) : qr = [e] : Zr = e;
}
function ph() {
  if (Zr) {
    var e = Zr, t = qr;
    if (qr = Zr = null, Iu(e), t) for (e = 0; e < t.length; e++) Iu(t[e]);
  }
}
function mh(e, t) {
  return e(t);
}
function gh() {
}
var Gi = !1;
function xh(e, t, n) {
  if (Gi) return e(t, n);
  Gi = !0;
  try {
    return mh(e, t, n);
  } finally {
    Gi = !1, (Zr !== null || qr !== null) && (gh(), ph());
  }
}
function Vl(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = bi(n);
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
  if (n && typeof n != "function") throw Error(fe(231, t, typeof n));
  return n;
}
var Da = !1;
if (bs) try {
  var Nl = {};
  Object.defineProperty(Nl, "passive", { get: function() {
    Da = !0;
  } }), window.addEventListener("test", Nl, Nl), window.removeEventListener("test", Nl, Nl);
} catch {
  Da = !1;
}
function rm(e, t, n, r, l, o, i, a, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (y) {
    this.onError(y);
  }
}
var Ol = !1, Zo = null, qo = !1, Pa = null, lm = { onError: function(e) {
  Ol = !0, Zo = e;
} };
function om(e, t, n, r, l, o, i, a, c) {
  Ol = !1, Zo = null, rm.apply(lm, arguments);
}
function im(e, t, n, r, l, o, i, a, c) {
  if (om.apply(this, arguments), Ol) {
    if (Ol) {
      var d = Zo;
      Ol = !1, Zo = null;
    } else throw Error(fe(198));
    qo || (qo = !0, Pa = d);
  }
}
function br(e) {
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
function yh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Au(e) {
  if (br(e) !== e) throw Error(fe(188));
}
function am(e) {
  var t = e.alternate;
  if (!t) {
    if (t = br(e), t === null) throw Error(fe(188));
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
        if (o === n) return Au(l), e;
        if (o === r) return Au(l), t;
        o = o.sibling;
      }
      throw Error(fe(188));
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
        if (!i) throw Error(fe(189));
      }
    }
    if (n.alternate !== r) throw Error(fe(190));
  }
  if (n.tag !== 3) throw Error(fe(188));
  return n.stateNode.current === n ? e : t;
}
function vh(e) {
  return e = am(e), e !== null ? Nh(e) : null;
}
function Nh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Nh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var kh = Kn.unstable_scheduleCallback, $u = Kn.unstable_cancelCallback, cm = Kn.unstable_shouldYield, um = Kn.unstable_requestPaint, qt = Kn.unstable_now, dm = Kn.unstable_getCurrentPriorityLevel, Ic = Kn.unstable_ImmediatePriority, wh = Kn.unstable_UserBlockingPriority, ei = Kn.unstable_NormalPriority, hm = Kn.unstable_LowPriority, jh = Kn.unstable_IdlePriority, ji = null, xs = null;
function fm(e) {
  if (xs && typeof xs.onCommitFiberRoot == "function") try {
    xs.onCommitFiberRoot(ji, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var cs = Math.clz32 ? Math.clz32 : gm, pm = Math.log, mm = Math.LN2;
function gm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (pm(e) / mm | 0) | 0;
}
var ko = 64, wo = 4194304;
function $l(e) {
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
function ti(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? r = $l(a) : (o &= i, o !== 0 && (r = $l(o)));
  } else i = n & ~l, i !== 0 ? r = $l(i) : o !== 0 && (r = $l(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - cs(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function xm(e, t) {
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
function ym(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - cs(o), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & r) && (l[i] = xm(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function _a(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Eh() {
  var e = ko;
  return ko <<= 1, !(ko & 4194240) && (ko = 64), e;
}
function Yi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function co(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - cs(t), e[t] = n;
}
function vm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - cs(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Ac(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - cs(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var St = 0;
function Ch(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Sh, $c, bh, Mh, Th, Fa = !1, jo = [], Ys = null, Xs = null, Qs = null, Kl = /* @__PURE__ */ new Map(), Gl = /* @__PURE__ */ new Map(), zs = [], Nm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Ru(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Ys = null;
      break;
    case "dragenter":
    case "dragleave":
      Xs = null;
      break;
    case "mouseover":
    case "mouseout":
      Qs = null;
      break;
    case "pointerover":
    case "pointerout":
      Kl.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Gl.delete(t.pointerId);
  }
}
function kl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = ho(t), t !== null && $c(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function km(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return Ys = kl(Ys, e, t, n, r, l), !0;
    case "dragenter":
      return Xs = kl(Xs, e, t, n, r, l), !0;
    case "mouseover":
      return Qs = kl(Qs, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Kl.set(o, kl(Kl.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Gl.set(o, kl(Gl.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ih(e) {
  var t = mr(e.target);
  if (t !== null) {
    var n = br(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = yh(n), t !== null) {
          e.blockedOn = t, Th(e.priority, function() {
            bh(n);
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
function _o(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ba(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      La = r, n.target.dispatchEvent(r), La = null;
    } else return t = ho(n), t !== null && $c(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Lu(e, t, n) {
  _o(e) && n.delete(t);
}
function wm() {
  Fa = !1, Ys !== null && _o(Ys) && (Ys = null), Xs !== null && _o(Xs) && (Xs = null), Qs !== null && _o(Qs) && (Qs = null), Kl.forEach(Lu), Gl.forEach(Lu);
}
function wl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Fa || (Fa = !0, Kn.unstable_scheduleCallback(Kn.unstable_NormalPriority, wm)));
}
function Yl(e) {
  function t(l) {
    return wl(l, e);
  }
  if (0 < jo.length) {
    wl(jo[0], e);
    for (var n = 1; n < jo.length; n++) {
      var r = jo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Ys !== null && wl(Ys, e), Xs !== null && wl(Xs, e), Qs !== null && wl(Qs, e), Kl.forEach(t), Gl.forEach(t), n = 0; n < zs.length; n++) r = zs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < zs.length && (n = zs[0], n.blockedOn === null); ) Ih(n), n.blockedOn === null && zs.shift();
}
var el = As.ReactCurrentBatchConfig, ni = !0;
function jm(e, t, n, r) {
  var l = St, o = el.transition;
  el.transition = null;
  try {
    St = 1, Rc(e, t, n, r);
  } finally {
    St = l, el.transition = o;
  }
}
function Em(e, t, n, r) {
  var l = St, o = el.transition;
  el.transition = null;
  try {
    St = 4, Rc(e, t, n, r);
  } finally {
    St = l, el.transition = o;
  }
}
function Rc(e, t, n, r) {
  if (ni) {
    var l = Ba(e, t, n, r);
    if (l === null) ra(e, t, r, si, n), Ru(e, r);
    else if (km(l, e, t, n, r)) r.stopPropagation();
    else if (Ru(e, r), t & 4 && -1 < Nm.indexOf(e)) {
      for (; l !== null; ) {
        var o = ho(l);
        if (o !== null && Sh(o), o = Ba(e, t, n, r), o === null && ra(e, t, r, si, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ra(e, t, r, null, n);
  }
}
var si = null;
function Ba(e, t, n, r) {
  if (si = null, e = Tc(r), e = mr(e), e !== null) if (t = br(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = yh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return si = e, null;
}
function Ah(e) {
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
      switch (dm()) {
        case Ic:
          return 1;
        case wh:
          return 4;
        case ei:
        case hm:
          return 16;
        case jh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ks = null, Lc = null, Fo = null;
function $h() {
  if (Fo) return Fo;
  var e, t = Lc, n = t.length, r, l = "value" in Ks ? Ks.value : Ks.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Fo = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Bo(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Eo() {
  return !0;
}
function Ou() {
  return !1;
}
function Yn(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Eo : Ou, this.isPropagationStopped = Ou, this;
  }
  return Vt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Eo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Eo);
  }, persist: function() {
  }, isPersistent: Eo }), t;
}
var pl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Oc = Yn(pl), uo = Vt({}, pl, { view: 0, detail: 0 }), Cm = Yn(uo), Xi, Qi, jl, Ei = Vt({}, uo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Dc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== jl && (jl && e.type === "mousemove" ? (Xi = e.screenX - jl.screenX, Qi = e.screenY - jl.screenY) : Qi = Xi = 0, jl = e), Xi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Qi;
} }), Du = Yn(Ei), Sm = Vt({}, Ei, { dataTransfer: 0 }), bm = Yn(Sm), Mm = Vt({}, uo, { relatedTarget: 0 }), Ji = Yn(Mm), Tm = Vt({}, pl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Im = Yn(Tm), Am = Vt({}, pl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), $m = Yn(Am), Rm = Vt({}, pl, { data: 0 }), Pu = Yn(Rm), Lm = {
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
}, Om = {
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
}, Dm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Dm[e]) ? !!t[e] : !1;
}
function Dc() {
  return Pm;
}
var _m = Vt({}, uo, { key: function(e) {
  if (e.key) {
    var t = Lm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Bo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Om[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Dc, charCode: function(e) {
  return e.type === "keypress" ? Bo(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Bo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Fm = Yn(_m), Bm = Vt({}, Ei, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), _u = Yn(Bm), Um = Vt({}, uo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Dc }), Wm = Yn(Um), zm = Vt({}, pl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Hm = Yn(zm), Vm = Vt({}, Ei, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Km = Yn(Vm), Gm = [9, 13, 27, 32], Pc = bs && "CompositionEvent" in window, Dl = null;
bs && "documentMode" in document && (Dl = document.documentMode);
var Ym = bs && "TextEvent" in window && !Dl, Rh = bs && (!Pc || Dl && 8 < Dl && 11 >= Dl), Fu = " ", Bu = !1;
function Lh(e, t) {
  switch (e) {
    case "keyup":
      return Gm.indexOf(t.keyCode) !== -1;
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
function Oh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Br = !1;
function Xm(e, t) {
  switch (e) {
    case "compositionend":
      return Oh(t);
    case "keypress":
      return t.which !== 32 ? null : (Bu = !0, Fu);
    case "textInput":
      return e = t.data, e === Fu && Bu ? null : e;
    default:
      return null;
  }
}
function Qm(e, t) {
  if (Br) return e === "compositionend" || !Pc && Lh(e, t) ? (e = $h(), Fo = Lc = Ks = null, Br = !1, e) : null;
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
      return Rh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Jm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Uu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Jm[e.type] : t === "textarea";
}
function Dh(e, t, n, r) {
  fh(r), t = ri(t, "onChange"), 0 < t.length && (n = new Oc("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Pl = null, Xl = null;
function Zm(e) {
  Gh(e, 0);
}
function Ci(e) {
  var t = zr(e);
  if (oh(t)) return e;
}
function qm(e, t) {
  if (e === "change") return t;
}
var Ph = !1;
if (bs) {
  var Zi;
  if (bs) {
    var qi = "oninput" in document;
    if (!qi) {
      var Wu = document.createElement("div");
      Wu.setAttribute("oninput", "return;"), qi = typeof Wu.oninput == "function";
    }
    Zi = qi;
  } else Zi = !1;
  Ph = Zi && (!document.documentMode || 9 < document.documentMode);
}
function zu() {
  Pl && (Pl.detachEvent("onpropertychange", _h), Xl = Pl = null);
}
function _h(e) {
  if (e.propertyName === "value" && Ci(Xl)) {
    var t = [];
    Dh(t, Xl, e, Tc(e)), xh(Zm, t);
  }
}
function e0(e, t, n) {
  e === "focusin" ? (zu(), Pl = t, Xl = n, Pl.attachEvent("onpropertychange", _h)) : e === "focusout" && zu();
}
function t0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ci(Xl);
}
function n0(e, t) {
  if (e === "click") return Ci(t);
}
function s0(e, t) {
  if (e === "input" || e === "change") return Ci(t);
}
function r0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var ds = typeof Object.is == "function" ? Object.is : r0;
function Ql(e, t) {
  if (ds(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!wa.call(t, l) || !ds(e[l], t[l])) return !1;
  }
  return !0;
}
function Hu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Vu(e, t) {
  var n = Hu(e);
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
    n = Hu(n);
  }
}
function Fh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Bh() {
  for (var e = window, t = Jo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Jo(e.document);
  }
  return t;
}
function _c(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function l0(e) {
  var t = Bh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Fh(n.ownerDocument.documentElement, n)) {
    if (r !== null && _c(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Vu(n, o);
        var i = Vu(
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
var o0 = bs && "documentMode" in document && 11 >= document.documentMode, Ur = null, Ua = null, _l = null, Wa = !1;
function Ku(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Wa || Ur == null || Ur !== Jo(r) || (r = Ur, "selectionStart" in r && _c(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), _l && Ql(_l, r) || (_l = r, r = ri(Ua, "onSelect"), 0 < r.length && (t = new Oc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ur)));
}
function Co(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Wr = { animationend: Co("Animation", "AnimationEnd"), animationiteration: Co("Animation", "AnimationIteration"), animationstart: Co("Animation", "AnimationStart"), transitionend: Co("Transition", "TransitionEnd") }, ea = {}, Uh = {};
bs && (Uh = document.createElement("div").style, "AnimationEvent" in window || (delete Wr.animationend.animation, delete Wr.animationiteration.animation, delete Wr.animationstart.animation), "TransitionEvent" in window || delete Wr.transitionend.transition);
function Si(e) {
  if (ea[e]) return ea[e];
  if (!Wr[e]) return e;
  var t = Wr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Uh) return ea[e] = t[n];
  return e;
}
var Wh = Si("animationend"), zh = Si("animationiteration"), Hh = Si("animationstart"), Vh = Si("transitionend"), Kh = /* @__PURE__ */ new Map(), Gu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function rr(e, t) {
  Kh.set(e, t), Sr(t, [e]);
}
for (var ta = 0; ta < Gu.length; ta++) {
  var na = Gu[ta], i0 = na.toLowerCase(), a0 = na[0].toUpperCase() + na.slice(1);
  rr(i0, "on" + a0);
}
rr(Wh, "onAnimationEnd");
rr(zh, "onAnimationIteration");
rr(Hh, "onAnimationStart");
rr("dblclick", "onDoubleClick");
rr("focusin", "onFocus");
rr("focusout", "onBlur");
rr(Vh, "onTransitionEnd");
ol("onMouseEnter", ["mouseout", "mouseover"]);
ol("onMouseLeave", ["mouseout", "mouseover"]);
ol("onPointerEnter", ["pointerout", "pointerover"]);
ol("onPointerLeave", ["pointerout", "pointerover"]);
Sr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Sr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Sr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Sr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Sr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Sr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Rl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), c0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Rl));
function Yu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, im(r, t, void 0, e), e.currentTarget = null;
}
function Gh(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], c = a.instance, d = a.currentTarget;
        if (a = a.listener, c !== o && l.isPropagationStopped()) break e;
        Yu(l, a, d), o = c;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], c = a.instance, d = a.currentTarget, a = a.listener, c !== o && l.isPropagationStopped()) break e;
        Yu(l, a, d), o = c;
      }
    }
  }
  if (qo) throw e = Pa, qo = !1, Pa = null, e;
}
function Dt(e, t) {
  var n = t[Ga];
  n === void 0 && (n = t[Ga] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Yh(t, e, 2, !1), n.add(r));
}
function sa(e, t, n) {
  var r = 0;
  t && (r |= 4), Yh(n, e, r, t);
}
var So = "_reactListening" + Math.random().toString(36).slice(2);
function Jl(e) {
  if (!e[So]) {
    e[So] = !0, th.forEach(function(n) {
      n !== "selectionchange" && (c0.has(n) || sa(n, !1, e), sa(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[So] || (t[So] = !0, sa("selectionchange", !1, t));
  }
}
function Yh(e, t, n, r) {
  switch (Ah(t)) {
    case 1:
      var l = jm;
      break;
    case 4:
      l = Em;
      break;
    default:
      l = Rc;
  }
  n = l.bind(null, t, n, e), l = void 0, !Da || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ra(e, t, n, r, l) {
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
        if (i = mr(a), i === null) return;
        if (c = i.tag, c === 5 || c === 6) {
          r = o = i;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  xh(function() {
    var d = o, y = Tc(n), f = [];
    e: {
      var m = Kh.get(e);
      if (m !== void 0) {
        var x = Oc, w = e;
        switch (e) {
          case "keypress":
            if (Bo(n) === 0) break e;
          case "keydown":
          case "keyup":
            x = Fm;
            break;
          case "focusin":
            w = "focus", x = Ji;
            break;
          case "focusout":
            w = "blur", x = Ji;
            break;
          case "beforeblur":
          case "afterblur":
            x = Ji;
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
            x = Du;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = bm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Wm;
            break;
          case Wh:
          case zh:
          case Hh:
            x = Im;
            break;
          case Vh:
            x = Hm;
            break;
          case "scroll":
            x = Cm;
            break;
          case "wheel":
            x = Km;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = $m;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = _u;
        }
        var E = (t & 4) !== 0, $ = !E && e === "scroll", v = E ? m !== null ? m + "Capture" : null : m;
        E = [];
        for (var g = d, h; g !== null; ) {
          h = g;
          var k = h.stateNode;
          if (h.tag === 5 && k !== null && (h = k, v !== null && (k = Vl(g, v), k != null && E.push(Zl(g, k, h)))), $) break;
          g = g.return;
        }
        0 < E.length && (m = new x(m, w, null, n, y), f.push({ event: m, listeners: E }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", m && n !== La && (w = n.relatedTarget || n.fromElement) && (mr(w) || w[Ms])) break e;
        if ((x || m) && (m = y.window === y ? y : (m = y.ownerDocument) ? m.defaultView || m.parentWindow : window, x ? (w = n.relatedTarget || n.toElement, x = d, w = w ? mr(w) : null, w !== null && ($ = br(w), w !== $ || w.tag !== 5 && w.tag !== 6) && (w = null)) : (x = null, w = d), x !== w)) {
          if (E = Du, k = "onMouseLeave", v = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (E = _u, k = "onPointerLeave", v = "onPointerEnter", g = "pointer"), $ = x == null ? m : zr(x), h = w == null ? m : zr(w), m = new E(k, g + "leave", x, n, y), m.target = $, m.relatedTarget = h, k = null, mr(y) === d && (E = new E(v, g + "enter", w, n, y), E.target = h, E.relatedTarget = $, k = E), $ = k, x && w) t: {
            for (E = x, v = w, g = 0, h = E; h; h = $r(h)) g++;
            for (h = 0, k = v; k; k = $r(k)) h++;
            for (; 0 < g - h; ) E = $r(E), g--;
            for (; 0 < h - g; ) v = $r(v), h--;
            for (; g--; ) {
              if (E === v || v !== null && E === v.alternate) break t;
              E = $r(E), v = $r(v);
            }
            E = null;
          }
          else E = null;
          x !== null && Xu(f, m, x, E, !1), w !== null && $ !== null && Xu(f, $, w, E, !0);
        }
      }
      e: {
        if (m = d ? zr(d) : window, x = m.nodeName && m.nodeName.toLowerCase(), x === "select" || x === "input" && m.type === "file") var M = qm;
        else if (Uu(m)) if (Ph) M = s0;
        else {
          M = t0;
          var j = e0;
        }
        else (x = m.nodeName) && x.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (M = n0);
        if (M && (M = M(e, d))) {
          Dh(f, M, n, y);
          break e;
        }
        j && j(e, m, d), e === "focusout" && (j = m._wrapperState) && j.controlled && m.type === "number" && Ta(m, "number", m.value);
      }
      switch (j = d ? zr(d) : window, e) {
        case "focusin":
          (Uu(j) || j.contentEditable === "true") && (Ur = j, Ua = d, _l = null);
          break;
        case "focusout":
          _l = Ua = Ur = null;
          break;
        case "mousedown":
          Wa = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Wa = !1, Ku(f, n, y);
          break;
        case "selectionchange":
          if (o0) break;
        case "keydown":
        case "keyup":
          Ku(f, n, y);
      }
      var N;
      if (Pc) e: {
        switch (e) {
          case "compositionstart":
            var b = "onCompositionStart";
            break e;
          case "compositionend":
            b = "onCompositionEnd";
            break e;
          case "compositionupdate":
            b = "onCompositionUpdate";
            break e;
        }
        b = void 0;
      }
      else Br ? Lh(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
      b && (Rh && n.locale !== "ko" && (Br || b !== "onCompositionStart" ? b === "onCompositionEnd" && Br && (N = $h()) : (Ks = y, Lc = "value" in Ks ? Ks.value : Ks.textContent, Br = !0)), j = ri(d, b), 0 < j.length && (b = new Pu(b, e, null, n, y), f.push({ event: b, listeners: j }), N ? b.data = N : (N = Oh(n), N !== null && (b.data = N)))), (N = Ym ? Xm(e, n) : Qm(e, n)) && (d = ri(d, "onBeforeInput"), 0 < d.length && (y = new Pu("onBeforeInput", "beforeinput", null, n, y), f.push({ event: y, listeners: d }), y.data = N));
    }
    Gh(f, t);
  });
}
function Zl(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ri(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Vl(e, n), o != null && r.unshift(Zl(e, o, l)), o = Vl(e, t), o != null && r.push(Zl(e, o, l))), e = e.return;
  }
  return r;
}
function $r(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Xu(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, c = a.alternate, d = a.stateNode;
    if (c !== null && c === r) break;
    a.tag === 5 && d !== null && (a = d, l ? (c = Vl(n, o), c != null && i.unshift(Zl(n, c, a))) : l || (c = Vl(n, o), c != null && i.push(Zl(n, c, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var u0 = /\r\n?/g, d0 = /\u0000|\uFFFD/g;
function Qu(e) {
  return (typeof e == "string" ? e : "" + e).replace(u0, `
`).replace(d0, "");
}
function bo(e, t, n) {
  if (t = Qu(t), Qu(e) !== t && n) throw Error(fe(425));
}
function li() {
}
var za = null, Ha = null;
function Va(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ka = typeof setTimeout == "function" ? setTimeout : void 0, h0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Ju = typeof Promise == "function" ? Promise : void 0, f0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ju < "u" ? function(e) {
  return Ju.resolve(null).then(e).catch(p0);
} : Ka;
function p0(e) {
  setTimeout(function() {
    throw e;
  });
}
function la(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Yl(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Yl(t);
}
function Js(e) {
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
function Zu(e) {
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
var ml = Math.random().toString(36).slice(2), ms = "__reactFiber$" + ml, ql = "__reactProps$" + ml, Ms = "__reactContainer$" + ml, Ga = "__reactEvents$" + ml, m0 = "__reactListeners$" + ml, g0 = "__reactHandles$" + ml;
function mr(e) {
  var t = e[ms];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ms] || n[ms]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Zu(e); e !== null; ) {
        if (n = e[ms]) return n;
        e = Zu(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ho(e) {
  return e = e[ms] || e[Ms], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function zr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(fe(33));
}
function bi(e) {
  return e[ql] || null;
}
var Ya = [], Hr = -1;
function lr(e) {
  return { current: e };
}
function Pt(e) {
  0 > Hr || (e.current = Ya[Hr], Ya[Hr] = null, Hr--);
}
function $t(e, t) {
  Hr++, Ya[Hr] = e.current, e.current = t;
}
var sr = {}, kn = lr(sr), Pn = lr(!1), kr = sr;
function il(e, t) {
  var n = e.type.contextTypes;
  if (!n) return sr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function _n(e) {
  return e = e.childContextTypes, e != null;
}
function oi() {
  Pt(Pn), Pt(kn);
}
function qu(e, t, n) {
  if (kn.current !== sr) throw Error(fe(168));
  $t(kn, t), $t(Pn, n);
}
function Xh(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(fe(108, em(e) || "Unknown", l));
  return Vt({}, n, r);
}
function ii(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || sr, kr = kn.current, $t(kn, e), $t(Pn, Pn.current), !0;
}
function ed(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(fe(169));
  n ? (e = Xh(e, t, kr), r.__reactInternalMemoizedMergedChildContext = e, Pt(Pn), Pt(kn), $t(kn, e)) : Pt(Pn), $t(Pn, n);
}
var ks = null, Mi = !1, oa = !1;
function Qh(e) {
  ks === null ? ks = [e] : ks.push(e);
}
function x0(e) {
  Mi = !0, Qh(e);
}
function or() {
  if (!oa && ks !== null) {
    oa = !0;
    var e = 0, t = St;
    try {
      var n = ks;
      for (St = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      ks = null, Mi = !1;
    } catch (l) {
      throw ks !== null && (ks = ks.slice(e + 1)), kh(Ic, or), l;
    } finally {
      St = t, oa = !1;
    }
  }
  return null;
}
var Vr = [], Kr = 0, ai = null, ci = 0, Qn = [], Jn = 0, wr = null, js = 1, Es = "";
function hr(e, t) {
  Vr[Kr++] = ci, Vr[Kr++] = ai, ai = e, ci = t;
}
function Jh(e, t, n) {
  Qn[Jn++] = js, Qn[Jn++] = Es, Qn[Jn++] = wr, wr = e;
  var r = js;
  e = Es;
  var l = 32 - cs(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - cs(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, js = 1 << 32 - cs(t) + l | n << l | r, Es = o + e;
  } else js = 1 << o | n << l | r, Es = e;
}
function Fc(e) {
  e.return !== null && (hr(e, 1), Jh(e, 1, 0));
}
function Bc(e) {
  for (; e === ai; ) ai = Vr[--Kr], Vr[Kr] = null, ci = Vr[--Kr], Vr[Kr] = null;
  for (; e === wr; ) wr = Qn[--Jn], Qn[Jn] = null, Es = Qn[--Jn], Qn[Jn] = null, js = Qn[--Jn], Qn[Jn] = null;
}
var Vn = null, Hn = null, Bt = !1, is = null;
function Zh(e, t) {
  var n = Zn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function td(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Vn = e, Hn = Js(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Vn = e, Hn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = wr !== null ? { id: js, overflow: Es } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Zn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Vn = e, Hn = null, !0) : !1;
    default:
      return !1;
  }
}
function Xa(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Qa(e) {
  if (Bt) {
    var t = Hn;
    if (t) {
      var n = t;
      if (!td(e, t)) {
        if (Xa(e)) throw Error(fe(418));
        t = Js(n.nextSibling);
        var r = Vn;
        t && td(e, t) ? Zh(r, n) : (e.flags = e.flags & -4097 | 2, Bt = !1, Vn = e);
      }
    } else {
      if (Xa(e)) throw Error(fe(418));
      e.flags = e.flags & -4097 | 2, Bt = !1, Vn = e;
    }
  }
}
function nd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Vn = e;
}
function Mo(e) {
  if (e !== Vn) return !1;
  if (!Bt) return nd(e), Bt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Va(e.type, e.memoizedProps)), t && (t = Hn)) {
    if (Xa(e)) throw qh(), Error(fe(418));
    for (; t; ) Zh(e, t), t = Js(t.nextSibling);
  }
  if (nd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(fe(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Hn = Js(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Hn = null;
    }
  } else Hn = Vn ? Js(e.stateNode.nextSibling) : null;
  return !0;
}
function qh() {
  for (var e = Hn; e; ) e = Js(e.nextSibling);
}
function al() {
  Hn = Vn = null, Bt = !1;
}
function Uc(e) {
  is === null ? is = [e] : is.push(e);
}
var y0 = As.ReactCurrentBatchConfig;
function El(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(fe(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(fe(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(fe(284));
    if (!n._owner) throw Error(fe(290, e));
  }
  return e;
}
function To(e, t) {
  throw e = Object.prototype.toString.call(t), Error(fe(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function sd(e) {
  var t = e._init;
  return t(e._payload);
}
function ef(e) {
  function t(v, g) {
    if (e) {
      var h = v.deletions;
      h === null ? (v.deletions = [g], v.flags |= 16) : h.push(g);
    }
  }
  function n(v, g) {
    if (!e) return null;
    for (; g !== null; ) t(v, g), g = g.sibling;
    return null;
  }
  function r(v, g) {
    for (v = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? v.set(g.key, g) : v.set(g.index, g), g = g.sibling;
    return v;
  }
  function l(v, g) {
    return v = tr(v, g), v.index = 0, v.sibling = null, v;
  }
  function o(v, g, h) {
    return v.index = h, e ? (h = v.alternate, h !== null ? (h = h.index, h < g ? (v.flags |= 2, g) : h) : (v.flags |= 2, g)) : (v.flags |= 1048576, g);
  }
  function i(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function a(v, g, h, k) {
    return g === null || g.tag !== 6 ? (g = fa(h, v.mode, k), g.return = v, g) : (g = l(g, h), g.return = v, g);
  }
  function c(v, g, h, k) {
    var M = h.type;
    return M === Fr ? y(v, g, h.props.children, k, h.key) : g !== null && (g.elementType === M || typeof M == "object" && M !== null && M.$$typeof === Fs && sd(M) === g.type) ? (k = l(g, h.props), k.ref = El(v, g, h), k.return = v, k) : (k = Go(h.type, h.key, h.props, null, v.mode, k), k.ref = El(v, g, h), k.return = v, k);
  }
  function d(v, g, h, k) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== h.containerInfo || g.stateNode.implementation !== h.implementation ? (g = pa(h, v.mode, k), g.return = v, g) : (g = l(g, h.children || []), g.return = v, g);
  }
  function y(v, g, h, k, M) {
    return g === null || g.tag !== 7 ? (g = Nr(h, v.mode, k, M), g.return = v, g) : (g = l(g, h), g.return = v, g);
  }
  function f(v, g, h) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = fa("" + g, v.mode, h), g.return = v, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case yo:
          return h = Go(g.type, g.key, g.props, null, v.mode, h), h.ref = El(v, null, g), h.return = v, h;
        case _r:
          return g = pa(g, v.mode, h), g.return = v, g;
        case Fs:
          var k = g._init;
          return f(v, k(g._payload), h);
      }
      if (Al(g) || vl(g)) return g = Nr(g, v.mode, h, null), g.return = v, g;
      To(v, g);
    }
    return null;
  }
  function m(v, g, h, k) {
    var M = g !== null ? g.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number") return M !== null ? null : a(v, g, "" + h, k);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case yo:
          return h.key === M ? c(v, g, h, k) : null;
        case _r:
          return h.key === M ? d(v, g, h, k) : null;
        case Fs:
          return M = h._init, m(
            v,
            g,
            M(h._payload),
            k
          );
      }
      if (Al(h) || vl(h)) return M !== null ? null : y(v, g, h, k, null);
      To(v, h);
    }
    return null;
  }
  function x(v, g, h, k, M) {
    if (typeof k == "string" && k !== "" || typeof k == "number") return v = v.get(h) || null, a(g, v, "" + k, M);
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case yo:
          return v = v.get(k.key === null ? h : k.key) || null, c(g, v, k, M);
        case _r:
          return v = v.get(k.key === null ? h : k.key) || null, d(g, v, k, M);
        case Fs:
          var j = k._init;
          return x(v, g, h, j(k._payload), M);
      }
      if (Al(k) || vl(k)) return v = v.get(h) || null, y(g, v, k, M, null);
      To(g, k);
    }
    return null;
  }
  function w(v, g, h, k) {
    for (var M = null, j = null, N = g, b = g = 0, C = null; N !== null && b < h.length; b++) {
      N.index > b ? (C = N, N = null) : C = N.sibling;
      var I = m(v, N, h[b], k);
      if (I === null) {
        N === null && (N = C);
        break;
      }
      e && N && I.alternate === null && t(v, N), g = o(I, g, b), j === null ? M = I : j.sibling = I, j = I, N = C;
    }
    if (b === h.length) return n(v, N), Bt && hr(v, b), M;
    if (N === null) {
      for (; b < h.length; b++) N = f(v, h[b], k), N !== null && (g = o(N, g, b), j === null ? M = N : j.sibling = N, j = N);
      return Bt && hr(v, b), M;
    }
    for (N = r(v, N); b < h.length; b++) C = x(N, v, b, h[b], k), C !== null && (e && C.alternate !== null && N.delete(C.key === null ? b : C.key), g = o(C, g, b), j === null ? M = C : j.sibling = C, j = C);
    return e && N.forEach(function(_) {
      return t(v, _);
    }), Bt && hr(v, b), M;
  }
  function E(v, g, h, k) {
    var M = vl(h);
    if (typeof M != "function") throw Error(fe(150));
    if (h = M.call(h), h == null) throw Error(fe(151));
    for (var j = M = null, N = g, b = g = 0, C = null, I = h.next(); N !== null && !I.done; b++, I = h.next()) {
      N.index > b ? (C = N, N = null) : C = N.sibling;
      var _ = m(v, N, I.value, k);
      if (_ === null) {
        N === null && (N = C);
        break;
      }
      e && N && _.alternate === null && t(v, N), g = o(_, g, b), j === null ? M = _ : j.sibling = _, j = _, N = C;
    }
    if (I.done) return n(
      v,
      N
    ), Bt && hr(v, b), M;
    if (N === null) {
      for (; !I.done; b++, I = h.next()) I = f(v, I.value, k), I !== null && (g = o(I, g, b), j === null ? M = I : j.sibling = I, j = I);
      return Bt && hr(v, b), M;
    }
    for (N = r(v, N); !I.done; b++, I = h.next()) I = x(N, v, b, I.value, k), I !== null && (e && I.alternate !== null && N.delete(I.key === null ? b : I.key), g = o(I, g, b), j === null ? M = I : j.sibling = I, j = I);
    return e && N.forEach(function(K) {
      return t(v, K);
    }), Bt && hr(v, b), M;
  }
  function $(v, g, h, k) {
    if (typeof h == "object" && h !== null && h.type === Fr && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case yo:
          e: {
            for (var M = h.key, j = g; j !== null; ) {
              if (j.key === M) {
                if (M = h.type, M === Fr) {
                  if (j.tag === 7) {
                    n(v, j.sibling), g = l(j, h.props.children), g.return = v, v = g;
                    break e;
                  }
                } else if (j.elementType === M || typeof M == "object" && M !== null && M.$$typeof === Fs && sd(M) === j.type) {
                  n(v, j.sibling), g = l(j, h.props), g.ref = El(v, j, h), g.return = v, v = g;
                  break e;
                }
                n(v, j);
                break;
              } else t(v, j);
              j = j.sibling;
            }
            h.type === Fr ? (g = Nr(h.props.children, v.mode, k, h.key), g.return = v, v = g) : (k = Go(h.type, h.key, h.props, null, v.mode, k), k.ref = El(v, g, h), k.return = v, v = k);
          }
          return i(v);
        case _r:
          e: {
            for (j = h.key; g !== null; ) {
              if (g.key === j) if (g.tag === 4 && g.stateNode.containerInfo === h.containerInfo && g.stateNode.implementation === h.implementation) {
                n(v, g.sibling), g = l(g, h.children || []), g.return = v, v = g;
                break e;
              } else {
                n(v, g);
                break;
              }
              else t(v, g);
              g = g.sibling;
            }
            g = pa(h, v.mode, k), g.return = v, v = g;
          }
          return i(v);
        case Fs:
          return j = h._init, $(v, g, j(h._payload), k);
      }
      if (Al(h)) return w(v, g, h, k);
      if (vl(h)) return E(v, g, h, k);
      To(v, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, g !== null && g.tag === 6 ? (n(v, g.sibling), g = l(g, h), g.return = v, v = g) : (n(v, g), g = fa(h, v.mode, k), g.return = v, v = g), i(v)) : n(v, g);
  }
  return $;
}
var cl = ef(!0), tf = ef(!1), ui = lr(null), di = null, Gr = null, Wc = null;
function zc() {
  Wc = Gr = di = null;
}
function Hc(e) {
  var t = ui.current;
  Pt(ui), e._currentValue = t;
}
function Ja(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function tl(e, t) {
  di = e, Wc = Gr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Dn = !0), e.firstContext = null);
}
function es(e) {
  var t = e._currentValue;
  if (Wc !== e) if (e = { context: e, memoizedValue: t, next: null }, Gr === null) {
    if (di === null) throw Error(fe(308));
    Gr = e, di.dependencies = { lanes: 0, firstContext: e };
  } else Gr = Gr.next = e;
  return t;
}
var gr = null;
function Vc(e) {
  gr === null ? gr = [e] : gr.push(e);
}
function nf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Vc(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ts(e, r);
}
function Ts(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Bs = !1;
function Kc(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function sf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Cs(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Zs(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, vt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ts(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Vc(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ts(e, n);
}
function Uo(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ac(e, n);
  }
}
function rd(e, t) {
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
function hi(e, t, n, r) {
  var l = e.updateQueue;
  Bs = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, d = c.next;
    c.next = null, i === null ? o = d : i.next = d, i = c;
    var y = e.alternate;
    y !== null && (y = y.updateQueue, a = y.lastBaseUpdate, a !== i && (a === null ? y.firstBaseUpdate = d : a.next = d, y.lastBaseUpdate = c));
  }
  if (o !== null) {
    var f = l.baseState;
    i = 0, y = d = c = null, a = o;
    do {
      var m = a.lane, x = a.eventTime;
      if ((r & m) === m) {
        y !== null && (y = y.next = {
          eventTime: x,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, E = a;
          switch (m = t, x = n, E.tag) {
            case 1:
              if (w = E.payload, typeof w == "function") {
                f = w.call(x, f, m);
                break e;
              }
              f = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = E.payload, m = typeof w == "function" ? w.call(x, f, m) : w, m == null) break e;
              f = Vt({}, f, m);
              break e;
            case 2:
              Bs = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [a] : m.push(a));
      } else x = { eventTime: x, lane: m, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, y === null ? (d = y = x, c = f) : y = y.next = x, i |= m;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        m = a, a = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (y === null && (c = f), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = y, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Er |= i, e.lanes = i, e.memoizedState = f;
  }
}
function ld(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(fe(191, l));
      l.call(r);
    }
  }
}
var fo = {}, ys = lr(fo), eo = lr(fo), to = lr(fo);
function xr(e) {
  if (e === fo) throw Error(fe(174));
  return e;
}
function Gc(e, t) {
  switch ($t(to, t), $t(eo, e), $t(ys, fo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Aa(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Aa(t, e);
  }
  Pt(ys), $t(ys, t);
}
function ul() {
  Pt(ys), Pt(eo), Pt(to);
}
function rf(e) {
  xr(to.current);
  var t = xr(ys.current), n = Aa(t, e.type);
  t !== n && ($t(eo, e), $t(ys, n));
}
function Yc(e) {
  eo.current === e && (Pt(ys), Pt(eo));
}
var zt = lr(0);
function fi(e) {
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
var ia = [];
function Xc() {
  for (var e = 0; e < ia.length; e++) ia[e]._workInProgressVersionPrimary = null;
  ia.length = 0;
}
var Wo = As.ReactCurrentDispatcher, aa = As.ReactCurrentBatchConfig, jr = 0, Ht = null, ln = null, dn = null, pi = !1, Fl = !1, no = 0, v0 = 0;
function yn() {
  throw Error(fe(321));
}
function Qc(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!ds(e[n], t[n])) return !1;
  return !0;
}
function Jc(e, t, n, r, l, o) {
  if (jr = o, Ht = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Wo.current = e === null || e.memoizedState === null ? j0 : E0, e = n(r, l), Fl) {
    o = 0;
    do {
      if (Fl = !1, no = 0, 25 <= o) throw Error(fe(301));
      o += 1, dn = ln = null, t.updateQueue = null, Wo.current = C0, e = n(r, l);
    } while (Fl);
  }
  if (Wo.current = mi, t = ln !== null && ln.next !== null, jr = 0, dn = ln = Ht = null, pi = !1, t) throw Error(fe(300));
  return e;
}
function Zc() {
  var e = no !== 0;
  return no = 0, e;
}
function ps() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return dn === null ? Ht.memoizedState = dn = e : dn = dn.next = e, dn;
}
function ts() {
  if (ln === null) {
    var e = Ht.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ln.next;
  var t = dn === null ? Ht.memoizedState : dn.next;
  if (t !== null) dn = t, ln = e;
  else {
    if (e === null) throw Error(fe(310));
    ln = e, e = { memoizedState: ln.memoizedState, baseState: ln.baseState, baseQueue: ln.baseQueue, queue: ln.queue, next: null }, dn === null ? Ht.memoizedState = dn = e : dn = dn.next = e;
  }
  return dn;
}
function so(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ca(e) {
  var t = ts(), n = t.queue;
  if (n === null) throw Error(fe(311));
  n.lastRenderedReducer = e;
  var r = ln, l = r.baseQueue, o = n.pending;
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
      var y = d.lane;
      if ((jr & y) === y) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var f = {
          lane: y,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (a = c = f, i = r) : c = c.next = f, Ht.lanes |= y, Er |= y;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? i = r : c.next = a, ds(r, t.memoizedState) || (Dn = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Ht.lanes |= o, Er |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ua(e) {
  var t = ts(), n = t.queue;
  if (n === null) throw Error(fe(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    ds(o, t.memoizedState) || (Dn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function lf() {
}
function of(e, t) {
  var n = Ht, r = ts(), l = t(), o = !ds(r.memoizedState, l);
  if (o && (r.memoizedState = l, Dn = !0), r = r.queue, qc(uf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || dn !== null && dn.memoizedState.tag & 1) {
    if (n.flags |= 2048, ro(9, cf.bind(null, n, r, l, t), void 0, null), hn === null) throw Error(fe(349));
    jr & 30 || af(n, t, l);
  }
  return l;
}
function af(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ht.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ht.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function cf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, df(t) && hf(e);
}
function uf(e, t, n) {
  return n(function() {
    df(t) && hf(e);
  });
}
function df(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ds(e, n);
  } catch {
    return !0;
  }
}
function hf(e) {
  var t = Ts(e, 1);
  t !== null && us(t, e, 1, -1);
}
function od(e) {
  var t = ps();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: so, lastRenderedState: e }, t.queue = e, e = e.dispatch = w0.bind(null, Ht, e), [t.memoizedState, e];
}
function ro(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Ht.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ht.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function ff() {
  return ts().memoizedState;
}
function zo(e, t, n, r) {
  var l = ps();
  Ht.flags |= e, l.memoizedState = ro(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ti(e, t, n, r) {
  var l = ts();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ln !== null) {
    var i = ln.memoizedState;
    if (o = i.destroy, r !== null && Qc(r, i.deps)) {
      l.memoizedState = ro(t, n, o, r);
      return;
    }
  }
  Ht.flags |= e, l.memoizedState = ro(1 | t, n, o, r);
}
function id(e, t) {
  return zo(8390656, 8, e, t);
}
function qc(e, t) {
  return Ti(2048, 8, e, t);
}
function pf(e, t) {
  return Ti(4, 2, e, t);
}
function mf(e, t) {
  return Ti(4, 4, e, t);
}
function gf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function xf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ti(4, 4, gf.bind(null, t, e), n);
}
function eu() {
}
function yf(e, t) {
  var n = ts();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Qc(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function vf(e, t) {
  var n = ts();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Qc(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Nf(e, t, n) {
  return jr & 21 ? (ds(n, t) || (n = Eh(), Ht.lanes |= n, Er |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Dn = !0), e.memoizedState = n);
}
function N0(e, t) {
  var n = St;
  St = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = aa.transition;
  aa.transition = {};
  try {
    e(!1), t();
  } finally {
    St = n, aa.transition = r;
  }
}
function kf() {
  return ts().memoizedState;
}
function k0(e, t, n) {
  var r = er(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, wf(e)) jf(t, n);
  else if (n = nf(e, t, n, r), n !== null) {
    var l = Mn();
    us(n, e, r, l), Ef(n, t, r);
  }
}
function w0(e, t, n) {
  var r = er(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (wf(e)) jf(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, ds(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, Vc(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = nf(e, t, l, r), n !== null && (l = Mn(), us(n, e, r, l), Ef(n, t, r));
  }
}
function wf(e) {
  var t = e.alternate;
  return e === Ht || t !== null && t === Ht;
}
function jf(e, t) {
  Fl = pi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ef(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ac(e, n);
  }
}
var mi = { readContext: es, useCallback: yn, useContext: yn, useEffect: yn, useImperativeHandle: yn, useInsertionEffect: yn, useLayoutEffect: yn, useMemo: yn, useReducer: yn, useRef: yn, useState: yn, useDebugValue: yn, useDeferredValue: yn, useTransition: yn, useMutableSource: yn, useSyncExternalStore: yn, useId: yn, unstable_isNewReconciler: !1 }, j0 = { readContext: es, useCallback: function(e, t) {
  return ps().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: es, useEffect: id, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, zo(
    4194308,
    4,
    gf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return zo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return zo(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = ps();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ps();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = k0.bind(null, Ht, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ps();
  return e = { current: e }, t.memoizedState = e;
}, useState: od, useDebugValue: eu, useDeferredValue: function(e) {
  return ps().memoizedState = e;
}, useTransition: function() {
  var e = od(!1), t = e[0];
  return e = N0.bind(null, e[1]), ps().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Ht, l = ps();
  if (Bt) {
    if (n === void 0) throw Error(fe(407));
    n = n();
  } else {
    if (n = t(), hn === null) throw Error(fe(349));
    jr & 30 || af(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, id(uf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ro(9, cf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ps(), t = hn.identifierPrefix;
  if (Bt) {
    var n = Es, r = js;
    n = (r & ~(1 << 32 - cs(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = no++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = v0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, E0 = {
  readContext: es,
  useCallback: yf,
  useContext: es,
  useEffect: qc,
  useImperativeHandle: xf,
  useInsertionEffect: pf,
  useLayoutEffect: mf,
  useMemo: vf,
  useReducer: ca,
  useRef: ff,
  useState: function() {
    return ca(so);
  },
  useDebugValue: eu,
  useDeferredValue: function(e) {
    var t = ts();
    return Nf(t, ln.memoizedState, e);
  },
  useTransition: function() {
    var e = ca(so)[0], t = ts().memoizedState;
    return [e, t];
  },
  useMutableSource: lf,
  useSyncExternalStore: of,
  useId: kf,
  unstable_isNewReconciler: !1
}, C0 = { readContext: es, useCallback: yf, useContext: es, useEffect: qc, useImperativeHandle: xf, useInsertionEffect: pf, useLayoutEffect: mf, useMemo: vf, useReducer: ua, useRef: ff, useState: function() {
  return ua(so);
}, useDebugValue: eu, useDeferredValue: function(e) {
  var t = ts();
  return ln === null ? t.memoizedState = e : Nf(t, ln.memoizedState, e);
}, useTransition: function() {
  var e = ua(so)[0], t = ts().memoizedState;
  return [e, t];
}, useMutableSource: lf, useSyncExternalStore: of, useId: kf, unstable_isNewReconciler: !1 };
function ls(e, t) {
  if (e && e.defaultProps) {
    t = Vt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Za(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Vt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ii = { isMounted: function(e) {
  return (e = e._reactInternals) ? br(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Mn(), l = er(e), o = Cs(r, l);
  o.payload = t, n != null && (o.callback = n), t = Zs(e, o, l), t !== null && (us(t, e, l, r), Uo(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Mn(), l = er(e), o = Cs(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Zs(e, o, l), t !== null && (us(t, e, l, r), Uo(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Mn(), r = er(e), l = Cs(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Zs(e, l, r), t !== null && (us(t, e, r, n), Uo(t, e, r));
} };
function ad(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Ql(n, r) || !Ql(l, o) : !0;
}
function Cf(e, t, n) {
  var r = !1, l = sr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = es(o) : (l = _n(t) ? kr : kn.current, r = t.contextTypes, o = (r = r != null) ? il(e, l) : sr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ii, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function cd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ii.enqueueReplaceState(t, t.state, null);
}
function qa(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Kc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = es(o) : (o = _n(t) ? kr : kn.current, l.context = il(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Za(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Ii.enqueueReplaceState(l, l.state, null), hi(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function dl(e, t) {
  try {
    var n = "", r = t;
    do
      n += qp(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function da(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ec(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var S0 = typeof WeakMap == "function" ? WeakMap : Map;
function Sf(e, t, n) {
  n = Cs(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    xi || (xi = !0, uc = r), ec(e, t);
  }, n;
}
function bf(e, t, n) {
  n = Cs(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      ec(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    ec(e, t), typeof r != "function" && (qs === null ? qs = /* @__PURE__ */ new Set([this]) : qs.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function ud(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new S0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = B0.bind(null, e, t, n), t.then(e, e));
}
function dd(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function hd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Cs(-1, 1), t.tag = 2, Zs(n, t, 1))), n.lanes |= 1), e);
}
var b0 = As.ReactCurrentOwner, Dn = !1;
function bn(e, t, n, r) {
  t.child = e === null ? tf(t, null, n, r) : cl(t, e.child, n, r);
}
function fd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return tl(t, l), r = Jc(e, t, n, r, o, l), n = Zc(), e !== null && !Dn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Is(e, t, l)) : (Bt && n && Fc(t), t.flags |= 1, bn(e, t, r, l), t.child);
}
function pd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !au(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Mf(e, t, o, r, l)) : (e = Go(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Ql, n(i, r) && e.ref === t.ref) return Is(e, t, l);
  }
  return t.flags |= 1, e = tr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Mf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ql(o, r) && e.ref === t.ref) if (Dn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Dn = !0);
    else return t.lanes = e.lanes, Is(e, t, l);
  }
  return tc(e, t, n, r, l);
}
function Tf(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $t(Xr, zn), zn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, $t(Xr, zn), zn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, $t(Xr, zn), zn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, $t(Xr, zn), zn |= r;
  return bn(e, t, l, n), t.child;
}
function If(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function tc(e, t, n, r, l) {
  var o = _n(n) ? kr : kn.current;
  return o = il(t, o), tl(t, l), n = Jc(e, t, n, r, o, l), r = Zc(), e !== null && !Dn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Is(e, t, l)) : (Bt && r && Fc(t), t.flags |= 1, bn(e, t, n, l), t.child);
}
function md(e, t, n, r, l) {
  if (_n(n)) {
    var o = !0;
    ii(t);
  } else o = !1;
  if (tl(t, l), t.stateNode === null) Ho(e, t), Cf(t, n, r), qa(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = es(d) : (d = _n(n) ? kr : kn.current, d = il(t, d));
    var y = n.getDerivedStateFromProps, f = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    f || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== d) && cd(t, i, r, d), Bs = !1;
    var m = t.memoizedState;
    i.state = m, hi(t, r, i, l), c = t.memoizedState, a !== r || m !== c || Pn.current || Bs ? (typeof y == "function" && (Za(t, n, y, r), c = t.memoizedState), (a = Bs || ad(t, n, a, r, m, c, d)) ? (f || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = d, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, sf(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : ls(t.type, a), i.props = d, f = t.pendingProps, m = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = es(c) : (c = _n(n) ? kr : kn.current, c = il(t, c));
    var x = n.getDerivedStateFromProps;
    (y = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== f || m !== c) && cd(t, i, r, c), Bs = !1, m = t.memoizedState, i.state = m, hi(t, r, i, l);
    var w = t.memoizedState;
    a !== f || m !== w || Pn.current || Bs ? (typeof x == "function" && (Za(t, n, x, r), w = t.memoizedState), (d = Bs || ad(t, n, d, r, m, w, c) || !1) ? (y || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, w, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, w, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), i.props = r, i.state = w, i.context = c, r = d) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return nc(e, t, n, r, o, l);
}
function nc(e, t, n, r, l, o) {
  If(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && ed(t, n, !1), Is(e, t, o);
  r = t.stateNode, b0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = cl(t, e.child, null, o), t.child = cl(t, null, a, o)) : bn(e, t, a, o), t.memoizedState = r.state, l && ed(t, n, !0), t.child;
}
function Af(e) {
  var t = e.stateNode;
  t.pendingContext ? qu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && qu(e, t.context, !1), Gc(e, t.containerInfo);
}
function gd(e, t, n, r, l) {
  return al(), Uc(l), t.flags |= 256, bn(e, t, n, r), t.child;
}
var sc = { dehydrated: null, treeContext: null, retryLane: 0 };
function rc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function $f(e, t, n) {
  var r = t.pendingProps, l = zt.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), $t(zt, l & 1), e === null)
    return Qa(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Ri(i, r, 0, null), e = Nr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = rc(n), t.memoizedState = sc, e) : tu(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return M0(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = tr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = tr(a, o) : (o = Nr(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? rc(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = sc, r;
  }
  return o = e.child, e = o.sibling, r = tr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function tu(e, t) {
  return t = Ri({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Io(e, t, n, r) {
  return r !== null && Uc(r), cl(t, e.child, null, n), e = tu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function M0(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = da(Error(fe(422))), Io(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Ri({ mode: "visible", children: r.children }, l, 0, null), o = Nr(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && cl(t, e.child, null, i), t.child.memoizedState = rc(i), t.memoizedState = sc, o);
  if (!(t.mode & 1)) return Io(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(fe(419)), r = da(o, r, void 0), Io(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, Dn || a) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ts(e, l), us(r, e, l, -1));
    }
    return iu(), r = da(Error(fe(421))), Io(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = U0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Hn = Js(l.nextSibling), Vn = t, Bt = !0, is = null, e !== null && (Qn[Jn++] = js, Qn[Jn++] = Es, Qn[Jn++] = wr, js = e.id, Es = e.overflow, wr = t), t = tu(t, r.children), t.flags |= 4096, t);
}
function xd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ja(e.return, t, n);
}
function ha(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Rf(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (bn(e, t, r.children, n), r = zt.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && xd(e, n, t);
      else if (e.tag === 19) xd(e, n, t);
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
  if ($t(zt, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && fi(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ha(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && fi(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ha(t, !0, n, null, o);
      break;
    case "together":
      ha(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ho(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Is(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Er |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(fe(153));
  if (t.child !== null) {
    for (e = t.child, n = tr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = tr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function T0(e, t, n) {
  switch (t.tag) {
    case 3:
      Af(t), al();
      break;
    case 5:
      rf(t);
      break;
    case 1:
      _n(t.type) && ii(t);
      break;
    case 4:
      Gc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      $t(ui, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? ($t(zt, zt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? $f(e, t, n) : ($t(zt, zt.current & 1), e = Is(e, t, n), e !== null ? e.sibling : null);
      $t(zt, zt.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Rf(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), $t(zt, zt.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Tf(e, t, n);
  }
  return Is(e, t, n);
}
var Lf, lc, Of, Df;
Lf = function(e, t) {
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
lc = function() {
};
Of = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, xr(ys.current);
    var o = null;
    switch (n) {
      case "input":
        l = ba(e, l), r = ba(e, r), o = [];
        break;
      case "select":
        l = Vt({}, l, { value: void 0 }), r = Vt({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Ia(e, l), r = Ia(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = li);
    }
    $a(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var a = l[d];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (zl.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (a = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== a && (c != null || a != null)) if (d === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (zl.hasOwnProperty(d) ? (c != null && d === "onScroll" && Dt("scroll", e), o || a === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Df = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Cl(e, t) {
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
function vn(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function I0(e, t, n) {
  var r = t.pendingProps;
  switch (Bc(t), t.tag) {
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
      return vn(t), null;
    case 1:
      return _n(t.type) && oi(), vn(t), null;
    case 3:
      return r = t.stateNode, ul(), Pt(Pn), Pt(kn), Xc(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Mo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, is !== null && (fc(is), is = null))), lc(e, t), vn(t), null;
    case 5:
      Yc(t);
      var l = xr(to.current);
      if (n = t.type, e !== null && t.stateNode != null) Of(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(fe(166));
          return vn(t), null;
        }
        if (e = xr(ys.current), Mo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[ms] = t, r[ql] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Rl.length; l++) Dt(Rl[l], r);
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
              Su(r, o), Dt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Dt("invalid", r);
              break;
            case "textarea":
              Mu(r, o), Dt("invalid", r);
          }
          $a(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && bo(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && bo(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : zl.hasOwnProperty(i) && a != null && i === "onScroll" && Dt("scroll", r);
          }
          switch (n) {
            case "input":
              vo(r), bu(r, o, !0);
              break;
            case "textarea":
              vo(r), Tu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = li);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ch(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[ms] = t, e[ql] = r, Lf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Ra(n, r), n) {
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
                for (l = 0; l < Rl.length; l++) Dt(Rl[l], e);
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
                Su(e, r), l = ba(e, r), Dt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Vt({}, r, { value: void 0 }), Dt("invalid", e);
                break;
              case "textarea":
                Mu(e, r), l = Ia(e, r), Dt("invalid", e);
                break;
              default:
                l = r;
            }
            $a(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var c = a[o];
              o === "style" ? hh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && uh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Hl(e, c) : typeof c == "number" && Hl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (zl.hasOwnProperty(o) ? c != null && o === "onScroll" && Dt("scroll", e) : c != null && Cc(e, o, c, i));
            }
            switch (n) {
              case "input":
                vo(e), bu(e, r, !1);
                break;
              case "textarea":
                vo(e), Tu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + nr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Jr(e, !!r.multiple, o, !1) : r.defaultValue != null && Jr(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = li);
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
      return vn(t), null;
    case 6:
      if (e && t.stateNode != null) Df(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(fe(166));
        if (n = xr(to.current), xr(ys.current), Mo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[ms] = t, (o = r.nodeValue !== n) && (e = Vn, e !== null)) switch (e.tag) {
            case 3:
              bo(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && bo(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[ms] = t, t.stateNode = r;
      }
      return vn(t), null;
    case 13:
      if (Pt(zt), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Bt && Hn !== null && t.mode & 1 && !(t.flags & 128)) qh(), al(), t.flags |= 98560, o = !1;
        else if (o = Mo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(fe(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(fe(317));
            o[ms] = t;
          } else al(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          vn(t), o = !1;
        } else is !== null && (fc(is), is = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || zt.current & 1 ? on === 0 && (on = 3) : iu())), t.updateQueue !== null && (t.flags |= 4), vn(t), null);
    case 4:
      return ul(), lc(e, t), e === null && Jl(t.stateNode.containerInfo), vn(t), null;
    case 10:
      return Hc(t.type._context), vn(t), null;
    case 17:
      return _n(t.type) && oi(), vn(t), null;
    case 19:
      if (Pt(zt), o = t.memoizedState, o === null) return vn(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Cl(o, !1);
      else {
        if (on !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = fi(e), i !== null) {
            for (t.flags |= 128, Cl(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return $t(zt, zt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && qt() > hl && (t.flags |= 128, r = !0, Cl(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = fi(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Cl(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Bt) return vn(t), null;
        } else 2 * qt() - o.renderingStartTime > hl && n !== 1073741824 && (t.flags |= 128, r = !0, Cl(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = qt(), t.sibling = null, n = zt.current, $t(zt, r ? n & 1 | 2 : n & 1), t) : (vn(t), null);
    case 22:
    case 23:
      return ou(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? zn & 1073741824 && (vn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(fe(156, t.tag));
}
function A0(e, t) {
  switch (Bc(t), t.tag) {
    case 1:
      return _n(t.type) && oi(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return ul(), Pt(Pn), Pt(kn), Xc(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Yc(t), null;
    case 13:
      if (Pt(zt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(fe(340));
        al();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Pt(zt), null;
    case 4:
      return ul(), null;
    case 10:
      return Hc(t.type._context), null;
    case 22:
    case 23:
      return ou(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ao = !1, Nn = !1, $0 = typeof WeakSet == "function" ? WeakSet : Set, Oe = null;
function Yr(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Xt(e, t, r);
  }
  else n.current = null;
}
function oc(e, t, n) {
  try {
    n();
  } catch (r) {
    Xt(e, t, r);
  }
}
var yd = !1;
function R0(e, t) {
  if (za = ni, e = Bh(), _c(e)) {
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
        var i = 0, a = -1, c = -1, d = 0, y = 0, f = e, m = null;
        t: for (; ; ) {
          for (var x; f !== n || l !== 0 && f.nodeType !== 3 || (a = i + l), f !== o || r !== 0 && f.nodeType !== 3 || (c = i + r), f.nodeType === 3 && (i += f.nodeValue.length), (x = f.firstChild) !== null; )
            m = f, f = x;
          for (; ; ) {
            if (f === e) break t;
            if (m === n && ++d === l && (a = i), m === o && ++y === r && (c = i), (x = f.nextSibling) !== null) break;
            f = m, m = f.parentNode;
          }
          f = x;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ha = { focusedElem: e, selectionRange: n }, ni = !1, Oe = t; Oe !== null; ) if (t = Oe, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Oe = e;
  else for (; Oe !== null; ) {
    t = Oe;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var E = w.memoizedProps, $ = w.memoizedState, v = t.stateNode, g = v.getSnapshotBeforeUpdate(t.elementType === t.type ? E : ls(t.type, E), $);
            v.__reactInternalSnapshotBeforeUpdate = g;
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
          throw Error(fe(163));
      }
    } catch (k) {
      Xt(t, t.return, k);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Oe = e;
      break;
    }
    Oe = t.return;
  }
  return w = yd, yd = !1, w;
}
function Bl(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && oc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Ai(e, t) {
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
function ic(e) {
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
function Pf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Pf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ms], delete t[ql], delete t[Ga], delete t[m0], delete t[g0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function _f(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function vd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || _f(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ac(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = li));
  else if (r !== 4 && (e = e.child, e !== null)) for (ac(e, t, n), e = e.sibling; e !== null; ) ac(e, t, n), e = e.sibling;
}
function cc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (cc(e, t, n), e = e.sibling; e !== null; ) cc(e, t, n), e = e.sibling;
}
var mn = null, os = !1;
function _s(e, t, n) {
  for (n = n.child; n !== null; ) Ff(e, t, n), n = n.sibling;
}
function Ff(e, t, n) {
  if (xs && typeof xs.onCommitFiberUnmount == "function") try {
    xs.onCommitFiberUnmount(ji, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Nn || Yr(n, t);
    case 6:
      var r = mn, l = os;
      mn = null, _s(e, t, n), mn = r, os = l, mn !== null && (os ? (e = mn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : mn.removeChild(n.stateNode));
      break;
    case 18:
      mn !== null && (os ? (e = mn, n = n.stateNode, e.nodeType === 8 ? la(e.parentNode, n) : e.nodeType === 1 && la(e, n), Yl(e)) : la(mn, n.stateNode));
      break;
    case 4:
      r = mn, l = os, mn = n.stateNode.containerInfo, os = !0, _s(e, t, n), mn = r, os = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Nn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && oc(n, t, i), l = l.next;
        } while (l !== r);
      }
      _s(e, t, n);
      break;
    case 1:
      if (!Nn && (Yr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Xt(n, t, a);
      }
      _s(e, t, n);
      break;
    case 21:
      _s(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Nn = (r = Nn) || n.memoizedState !== null, _s(e, t, n), Nn = r) : _s(e, t, n);
      break;
    default:
      _s(e, t, n);
  }
}
function Nd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new $0()), t.forEach(function(r) {
      var l = W0.bind(null, e, r);
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
      if (mn === null) throw Error(fe(160));
      Ff(o, i, l), mn = null, os = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      Xt(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Bf(t, e), t = t.sibling;
}
function Bf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (rs(t, e), hs(e), r & 4) {
        try {
          Bl(3, e, e.return), Ai(3, e);
        } catch (E) {
          Xt(e, e.return, E);
        }
        try {
          Bl(5, e, e.return);
        } catch (E) {
          Xt(e, e.return, E);
        }
      }
      break;
    case 1:
      rs(t, e), hs(e), r & 512 && n !== null && Yr(n, n.return);
      break;
    case 5:
      if (rs(t, e), hs(e), r & 512 && n !== null && Yr(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Hl(l, "");
        } catch (E) {
          Xt(e, e.return, E);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && o.type === "radio" && o.name != null && ih(l, o), Ra(a, i);
          var d = Ra(a, o);
          for (i = 0; i < c.length; i += 2) {
            var y = c[i], f = c[i + 1];
            y === "style" ? hh(l, f) : y === "dangerouslySetInnerHTML" ? uh(l, f) : y === "children" ? Hl(l, f) : Cc(l, y, f, d);
          }
          switch (a) {
            case "input":
              Ma(l, o);
              break;
            case "textarea":
              ah(l, o);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var x = o.value;
              x != null ? Jr(l, !!o.multiple, x, !1) : m !== !!o.multiple && (o.defaultValue != null ? Jr(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Jr(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[ql] = o;
        } catch (E) {
          Xt(e, e.return, E);
        }
      }
      break;
    case 6:
      if (rs(t, e), hs(e), r & 4) {
        if (e.stateNode === null) throw Error(fe(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (E) {
          Xt(e, e.return, E);
        }
      }
      break;
    case 3:
      if (rs(t, e), hs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Yl(t.containerInfo);
      } catch (E) {
        Xt(e, e.return, E);
      }
      break;
    case 4:
      rs(t, e), hs(e);
      break;
    case 13:
      rs(t, e), hs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (ru = qt())), r & 4 && Nd(e);
      break;
    case 22:
      if (y = n !== null && n.memoizedState !== null, e.mode & 1 ? (Nn = (d = Nn) || y, rs(t, e), Nn = d) : rs(t, e), hs(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !y && e.mode & 1) for (Oe = e, y = e.child; y !== null; ) {
          for (f = Oe = y; Oe !== null; ) {
            switch (m = Oe, x = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Bl(4, m, m.return);
                break;
              case 1:
                Yr(m, m.return);
                var w = m.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (E) {
                    Xt(r, n, E);
                  }
                }
                break;
              case 5:
                Yr(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  wd(f);
                  continue;
                }
            }
            x !== null ? (x.return = m, Oe = x) : wd(f);
          }
          y = y.sibling;
        }
        e: for (y = null, f = e; ; ) {
          if (f.tag === 5) {
            if (y === null) {
              y = f;
              try {
                l = f.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = f.stateNode, c = f.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = dh("display", i));
              } catch (E) {
                Xt(e, e.return, E);
              }
            }
          } else if (f.tag === 6) {
            if (y === null) try {
              f.stateNode.nodeValue = d ? "" : f.memoizedProps;
            } catch (E) {
              Xt(e, e.return, E);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            y === f && (y = null), f = f.return;
          }
          y === f && (y = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      rs(t, e), hs(e), r & 4 && Nd(e);
      break;
    case 21:
      break;
    default:
      rs(
        t,
        e
      ), hs(e);
  }
}
function hs(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (_f(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(fe(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Hl(l, ""), r.flags &= -33);
          var o = vd(e);
          cc(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = vd(e);
          ac(e, a, i);
          break;
        default:
          throw Error(fe(161));
      }
    } catch (c) {
      Xt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function L0(e, t, n) {
  Oe = e, Uf(e);
}
function Uf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Oe !== null; ) {
    var l = Oe, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Ao;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || Nn;
        a = Ao;
        var d = Nn;
        if (Ao = i, (Nn = c) && !d) for (Oe = l; Oe !== null; ) i = Oe, c = i.child, i.tag === 22 && i.memoizedState !== null ? jd(l) : c !== null ? (c.return = i, Oe = c) : jd(l);
        for (; o !== null; ) Oe = o, Uf(o), o = o.sibling;
        Oe = l, Ao = a, Nn = d;
      }
      kd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Oe = o) : kd(e);
  }
}
function kd(e) {
  for (; Oe !== null; ) {
    var t = Oe;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Nn || Ai(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Nn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : ls(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && ld(t, o, r);
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
              ld(t, i, n);
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
                var y = d.memoizedState;
                if (y !== null) {
                  var f = y.dehydrated;
                  f !== null && Yl(f);
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
            throw Error(fe(163));
        }
        Nn || t.flags & 512 && ic(t);
      } catch (m) {
        Xt(t, t.return, m);
      }
    }
    if (t === e) {
      Oe = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Oe = n;
      break;
    }
    Oe = t.return;
  }
}
function wd(e) {
  for (; Oe !== null; ) {
    var t = Oe;
    if (t === e) {
      Oe = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Oe = n;
      break;
    }
    Oe = t.return;
  }
}
function jd(e) {
  for (; Oe !== null; ) {
    var t = Oe;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ai(4, t);
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
            ic(t);
          } catch (c) {
            Xt(t, o, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            ic(t);
          } catch (c) {
            Xt(t, i, c);
          }
      }
    } catch (c) {
      Xt(t, t.return, c);
    }
    if (t === e) {
      Oe = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, Oe = a;
      break;
    }
    Oe = t.return;
  }
}
var O0 = Math.ceil, gi = As.ReactCurrentDispatcher, nu = As.ReactCurrentOwner, qn = As.ReactCurrentBatchConfig, vt = 0, hn = null, sn = null, gn = 0, zn = 0, Xr = lr(0), on = 0, lo = null, Er = 0, $i = 0, su = 0, Ul = null, On = null, ru = 0, hl = 1 / 0, Ns = null, xi = !1, uc = null, qs = null, $o = !1, Gs = null, yi = 0, Wl = 0, dc = null, Vo = -1, Ko = 0;
function Mn() {
  return vt & 6 ? qt() : Vo !== -1 ? Vo : Vo = qt();
}
function er(e) {
  return e.mode & 1 ? vt & 2 && gn !== 0 ? gn & -gn : y0.transition !== null ? (Ko === 0 && (Ko = Eh()), Ko) : (e = St, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ah(e.type)), e) : 1;
}
function us(e, t, n, r) {
  if (50 < Wl) throw Wl = 0, dc = null, Error(fe(185));
  co(e, n, r), (!(vt & 2) || e !== hn) && (e === hn && (!(vt & 2) && ($i |= n), on === 4 && Hs(e, gn)), Fn(e, r), n === 1 && vt === 0 && !(t.mode & 1) && (hl = qt() + 500, Mi && or()));
}
function Fn(e, t) {
  var n = e.callbackNode;
  ym(e, t);
  var r = ti(e, e === hn ? gn : 0);
  if (r === 0) n !== null && $u(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && $u(n), t === 1) e.tag === 0 ? x0(Ed.bind(null, e)) : Qh(Ed.bind(null, e)), f0(function() {
      !(vt & 6) && or();
    }), n = null;
    else {
      switch (Ch(r)) {
        case 1:
          n = Ic;
          break;
        case 4:
          n = wh;
          break;
        case 16:
          n = ei;
          break;
        case 536870912:
          n = jh;
          break;
        default:
          n = ei;
      }
      n = Xf(n, Wf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Wf(e, t) {
  if (Vo = -1, Ko = 0, vt & 6) throw Error(fe(327));
  var n = e.callbackNode;
  if (nl() && e.callbackNode !== n) return null;
  var r = ti(e, e === hn ? gn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = vi(e, r);
  else {
    t = r;
    var l = vt;
    vt |= 2;
    var o = Hf();
    (hn !== e || gn !== t) && (Ns = null, hl = qt() + 500, vr(e, t));
    do
      try {
        _0();
        break;
      } catch (a) {
        zf(e, a);
      }
    while (!0);
    zc(), gi.current = o, vt = l, sn !== null ? t = 0 : (hn = null, gn = 0, t = on);
  }
  if (t !== 0) {
    if (t === 2 && (l = _a(e), l !== 0 && (r = l, t = hc(e, l))), t === 1) throw n = lo, vr(e, 0), Hs(e, r), Fn(e, qt()), n;
    if (t === 6) Hs(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !D0(l) && (t = vi(e, r), t === 2 && (o = _a(e), o !== 0 && (r = o, t = hc(e, o))), t === 1)) throw n = lo, vr(e, 0), Hs(e, r), Fn(e, qt()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(fe(345));
        case 2:
          fr(e, On, Ns);
          break;
        case 3:
          if (Hs(e, r), (r & 130023424) === r && (t = ru + 500 - qt(), 10 < t)) {
            if (ti(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Mn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ka(fr.bind(null, e, On, Ns), t);
            break;
          }
          fr(e, On, Ns);
          break;
        case 4:
          if (Hs(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - cs(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = qt() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * O0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ka(fr.bind(null, e, On, Ns), r);
            break;
          }
          fr(e, On, Ns);
          break;
        case 5:
          fr(e, On, Ns);
          break;
        default:
          throw Error(fe(329));
      }
    }
  }
  return Fn(e, qt()), e.callbackNode === n ? Wf.bind(null, e) : null;
}
function hc(e, t) {
  var n = Ul;
  return e.current.memoizedState.isDehydrated && (vr(e, t).flags |= 256), e = vi(e, t), e !== 2 && (t = On, On = n, t !== null && fc(t)), e;
}
function fc(e) {
  On === null ? On = e : On.push.apply(On, e);
}
function D0(e) {
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
function Hs(e, t) {
  for (t &= ~su, t &= ~$i, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - cs(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Ed(e) {
  if (vt & 6) throw Error(fe(327));
  nl();
  var t = ti(e, 0);
  if (!(t & 1)) return Fn(e, qt()), null;
  var n = vi(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = _a(e);
    r !== 0 && (t = r, n = hc(e, r));
  }
  if (n === 1) throw n = lo, vr(e, 0), Hs(e, t), Fn(e, qt()), n;
  if (n === 6) throw Error(fe(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, fr(e, On, Ns), Fn(e, qt()), null;
}
function lu(e, t) {
  var n = vt;
  vt |= 1;
  try {
    return e(t);
  } finally {
    vt = n, vt === 0 && (hl = qt() + 500, Mi && or());
  }
}
function Cr(e) {
  Gs !== null && Gs.tag === 0 && !(vt & 6) && nl();
  var t = vt;
  vt |= 1;
  var n = qn.transition, r = St;
  try {
    if (qn.transition = null, St = 1, e) return e();
  } finally {
    St = r, qn.transition = n, vt = t, !(vt & 6) && or();
  }
}
function ou() {
  zn = Xr.current, Pt(Xr);
}
function vr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, h0(n)), sn !== null) for (n = sn.return; n !== null; ) {
    var r = n;
    switch (Bc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && oi();
        break;
      case 3:
        ul(), Pt(Pn), Pt(kn), Xc();
        break;
      case 5:
        Yc(r);
        break;
      case 4:
        ul();
        break;
      case 13:
        Pt(zt);
        break;
      case 19:
        Pt(zt);
        break;
      case 10:
        Hc(r.type._context);
        break;
      case 22:
      case 23:
        ou();
    }
    n = n.return;
  }
  if (hn = e, sn = e = tr(e.current, null), gn = zn = t, on = 0, lo = null, su = $i = Er = 0, On = Ul = null, gr !== null) {
    for (t = 0; t < gr.length; t++) if (n = gr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    gr = null;
  }
  return e;
}
function zf(e, t) {
  do {
    var n = sn;
    try {
      if (zc(), Wo.current = mi, pi) {
        for (var r = Ht.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        pi = !1;
      }
      if (jr = 0, dn = ln = Ht = null, Fl = !1, no = 0, nu.current = null, n === null || n.return === null) {
        on = 1, lo = t, sn = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, c = t;
        if (t = gn, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, y = a, f = y.tag;
          if (!(y.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var m = y.alternate;
            m ? (y.updateQueue = m.updateQueue, y.memoizedState = m.memoizedState, y.lanes = m.lanes) : (y.updateQueue = null, y.memoizedState = null);
          }
          var x = dd(i);
          if (x !== null) {
            x.flags &= -257, hd(x, i, a, o, t), x.mode & 1 && ud(o, d, t), t = x, c = d;
            var w = t.updateQueue;
            if (w === null) {
              var E = /* @__PURE__ */ new Set();
              E.add(c), t.updateQueue = E;
            } else w.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              ud(o, d, t), iu();
              break e;
            }
            c = Error(fe(426));
          }
        } else if (Bt && a.mode & 1) {
          var $ = dd(i);
          if ($ !== null) {
            !($.flags & 65536) && ($.flags |= 256), hd($, i, a, o, t), Uc(dl(c, a));
            break e;
          }
        }
        o = c = dl(c, a), on !== 4 && (on = 2), Ul === null ? Ul = [o] : Ul.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var v = Sf(o, c, t);
              rd(o, v);
              break e;
            case 1:
              a = c;
              var g = o.type, h = o.stateNode;
              if (!(o.flags & 128) && (typeof g.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (qs === null || !qs.has(h)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var k = bf(o, a, t);
                rd(o, k);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Kf(n);
    } catch (M) {
      t = M, sn === n && n !== null && (sn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Hf() {
  var e = gi.current;
  return gi.current = mi, e === null ? mi : e;
}
function iu() {
  (on === 0 || on === 3 || on === 2) && (on = 4), hn === null || !(Er & 268435455) && !($i & 268435455) || Hs(hn, gn);
}
function vi(e, t) {
  var n = vt;
  vt |= 2;
  var r = Hf();
  (hn !== e || gn !== t) && (Ns = null, vr(e, t));
  do
    try {
      P0();
      break;
    } catch (l) {
      zf(e, l);
    }
  while (!0);
  if (zc(), vt = n, gi.current = r, sn !== null) throw Error(fe(261));
  return hn = null, gn = 0, on;
}
function P0() {
  for (; sn !== null; ) Vf(sn);
}
function _0() {
  for (; sn !== null && !cm(); ) Vf(sn);
}
function Vf(e) {
  var t = Yf(e.alternate, e, zn);
  e.memoizedProps = e.pendingProps, t === null ? Kf(e) : sn = t, nu.current = null;
}
function Kf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = A0(n, t), n !== null) {
        n.flags &= 32767, sn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        on = 6, sn = null;
        return;
      }
    } else if (n = I0(n, t, zn), n !== null) {
      sn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      sn = t;
      return;
    }
    sn = t = e;
  } while (t !== null);
  on === 0 && (on = 5);
}
function fr(e, t, n) {
  var r = St, l = qn.transition;
  try {
    qn.transition = null, St = 1, F0(e, t, n, r);
  } finally {
    qn.transition = l, St = r;
  }
  return null;
}
function F0(e, t, n, r) {
  do
    nl();
  while (Gs !== null);
  if (vt & 6) throw Error(fe(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(fe(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (vm(e, o), e === hn && (sn = hn = null, gn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || $o || ($o = !0, Xf(ei, function() {
    return nl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = qn.transition, qn.transition = null;
    var i = St;
    St = 1;
    var a = vt;
    vt |= 4, nu.current = null, R0(e, n), Bf(n, e), l0(Ha), ni = !!za, Ha = za = null, e.current = n, L0(n), um(), vt = a, St = i, qn.transition = o;
  } else e.current = n;
  if ($o && ($o = !1, Gs = e, yi = l), o = e.pendingLanes, o === 0 && (qs = null), fm(n.stateNode), Fn(e, qt()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (xi) throw xi = !1, e = uc, uc = null, e;
  return yi & 1 && e.tag !== 0 && nl(), o = e.pendingLanes, o & 1 ? e === dc ? Wl++ : (Wl = 0, dc = e) : Wl = 0, or(), null;
}
function nl() {
  if (Gs !== null) {
    var e = Ch(yi), t = qn.transition, n = St;
    try {
      if (qn.transition = null, St = 16 > e ? 16 : e, Gs === null) var r = !1;
      else {
        if (e = Gs, Gs = null, yi = 0, vt & 6) throw Error(fe(331));
        var l = vt;
        for (vt |= 4, Oe = e.current; Oe !== null; ) {
          var o = Oe, i = o.child;
          if (Oe.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c];
                for (Oe = d; Oe !== null; ) {
                  var y = Oe;
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Bl(8, y, o);
                  }
                  var f = y.child;
                  if (f !== null) f.return = y, Oe = f;
                  else for (; Oe !== null; ) {
                    y = Oe;
                    var m = y.sibling, x = y.return;
                    if (Pf(y), y === d) {
                      Oe = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = x, Oe = m;
                      break;
                    }
                    Oe = x;
                  }
                }
              }
              var w = o.alternate;
              if (w !== null) {
                var E = w.child;
                if (E !== null) {
                  w.child = null;
                  do {
                    var $ = E.sibling;
                    E.sibling = null, E = $;
                  } while (E !== null);
                }
              }
              Oe = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, Oe = i;
          else e: for (; Oe !== null; ) {
            if (o = Oe, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Bl(9, o, o.return);
            }
            var v = o.sibling;
            if (v !== null) {
              v.return = o.return, Oe = v;
              break e;
            }
            Oe = o.return;
          }
        }
        var g = e.current;
        for (Oe = g; Oe !== null; ) {
          i = Oe;
          var h = i.child;
          if (i.subtreeFlags & 2064 && h !== null) h.return = i, Oe = h;
          else e: for (i = g; Oe !== null; ) {
            if (a = Oe, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Ai(9, a);
              }
            } catch (M) {
              Xt(a, a.return, M);
            }
            if (a === i) {
              Oe = null;
              break e;
            }
            var k = a.sibling;
            if (k !== null) {
              k.return = a.return, Oe = k;
              break e;
            }
            Oe = a.return;
          }
        }
        if (vt = l, or(), xs && typeof xs.onPostCommitFiberRoot == "function") try {
          xs.onPostCommitFiberRoot(ji, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      St = n, qn.transition = t;
    }
  }
  return !1;
}
function Cd(e, t, n) {
  t = dl(n, t), t = Sf(e, t, 1), e = Zs(e, t, 1), t = Mn(), e !== null && (co(e, 1, t), Fn(e, t));
}
function Xt(e, t, n) {
  if (e.tag === 3) Cd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Cd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (qs === null || !qs.has(r))) {
        e = dl(n, e), e = bf(t, e, 1), t = Zs(t, e, 1), e = Mn(), t !== null && (co(t, 1, e), Fn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function B0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Mn(), e.pingedLanes |= e.suspendedLanes & n, hn === e && (gn & n) === n && (on === 4 || on === 3 && (gn & 130023424) === gn && 500 > qt() - ru ? vr(e, 0) : su |= n), Fn(e, t);
}
function Gf(e, t) {
  t === 0 && (e.mode & 1 ? (t = wo, wo <<= 1, !(wo & 130023424) && (wo = 4194304)) : t = 1);
  var n = Mn();
  e = Ts(e, t), e !== null && (co(e, t, n), Fn(e, n));
}
function U0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Gf(e, n);
}
function W0(e, t) {
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
      throw Error(fe(314));
  }
  r !== null && r.delete(t), Gf(e, n);
}
var Yf;
Yf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Pn.current) Dn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Dn = !1, T0(e, t, n);
    Dn = !!(e.flags & 131072);
  }
  else Dn = !1, Bt && t.flags & 1048576 && Jh(t, ci, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ho(e, t), e = t.pendingProps;
      var l = il(t, kn.current);
      tl(t, n), l = Jc(null, t, r, e, l, n);
      var o = Zc();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, _n(r) ? (o = !0, ii(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Kc(t), l.updater = Ii, t.stateNode = l, l._reactInternals = t, qa(t, r, e, n), t = nc(null, t, r, !0, o, n)) : (t.tag = 0, Bt && o && Fc(t), bn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ho(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = H0(r), e = ls(r, e), l) {
          case 0:
            t = tc(null, t, r, e, n);
            break e;
          case 1:
            t = md(null, t, r, e, n);
            break e;
          case 11:
            t = fd(null, t, r, e, n);
            break e;
          case 14:
            t = pd(null, t, r, ls(r.type, e), n);
            break e;
        }
        throw Error(fe(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), tc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), md(e, t, r, l, n);
    case 3:
      e: {
        if (Af(t), e === null) throw Error(fe(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, sf(e, t), hi(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = dl(Error(fe(423)), t), t = gd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = dl(Error(fe(424)), t), t = gd(e, t, r, n, l);
          break e;
        } else for (Hn = Js(t.stateNode.containerInfo.firstChild), Vn = t, Bt = !0, is = null, n = tf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (al(), r === l) {
            t = Is(e, t, n);
            break e;
          }
          bn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return rf(t), e === null && Qa(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Va(r, l) ? i = null : o !== null && Va(r, o) && (t.flags |= 32), If(e, t), bn(e, t, i, n), t.child;
    case 6:
      return e === null && Qa(t), null;
    case 13:
      return $f(e, t, n);
    case 4:
      return Gc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = cl(t, null, r, n) : bn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), fd(e, t, r, l, n);
    case 7:
      return bn(e, t, t.pendingProps, n), t.child;
    case 8:
      return bn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return bn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, $t(ui, r._currentValue), r._currentValue = i, o !== null) if (ds(o.value, i)) {
          if (o.children === l.children && !Pn.current) {
            t = Is(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            i = o.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = Cs(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var y = d.pending;
                    y === null ? c.next = c : (c.next = y.next, y.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ja(
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
            if (i = o.return, i === null) throw Error(fe(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Ja(i, n, t), i = o.sibling;
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
        bn(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, tl(t, n), l = es(l), r = r(l), t.flags |= 1, bn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ls(r, t.pendingProps), l = ls(r.type, l), pd(e, t, r, l, n);
    case 15:
      return Mf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), Ho(e, t), t.tag = 1, _n(r) ? (e = !0, ii(t)) : e = !1, tl(t, n), Cf(t, r, l), qa(t, r, l, n), nc(null, t, r, !0, e, n);
    case 19:
      return Rf(e, t, n);
    case 22:
      return Tf(e, t, n);
  }
  throw Error(fe(156, t.tag));
};
function Xf(e, t) {
  return kh(e, t);
}
function z0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Zn(e, t, n, r) {
  return new z0(e, t, n, r);
}
function au(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function H0(e) {
  if (typeof e == "function") return au(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === bc) return 11;
    if (e === Mc) return 14;
  }
  return 2;
}
function tr(e, t) {
  var n = e.alternate;
  return n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Go(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") au(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Fr:
      return Nr(n.children, l, o, t);
    case Sc:
      i = 8, l |= 8;
      break;
    case ja:
      return e = Zn(12, n, t, l | 2), e.elementType = ja, e.lanes = o, e;
    case Ea:
      return e = Zn(13, n, t, l), e.elementType = Ea, e.lanes = o, e;
    case Ca:
      return e = Zn(19, n, t, l), e.elementType = Ca, e.lanes = o, e;
    case rh:
      return Ri(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case nh:
          i = 10;
          break e;
        case sh:
          i = 9;
          break e;
        case bc:
          i = 11;
          break e;
        case Mc:
          i = 14;
          break e;
        case Fs:
          i = 16, r = null;
          break e;
      }
      throw Error(fe(130, e == null ? e : typeof e, ""));
  }
  return t = Zn(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Nr(e, t, n, r) {
  return e = Zn(7, e, r, t), e.lanes = n, e;
}
function Ri(e, t, n, r) {
  return e = Zn(22, e, r, t), e.elementType = rh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function fa(e, t, n) {
  return e = Zn(6, e, null, t), e.lanes = n, e;
}
function pa(e, t, n) {
  return t = Zn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function V0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Yi(0), this.expirationTimes = Yi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Yi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function cu(e, t, n, r, l, o, i, a, c) {
  return e = new V0(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Zn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Kc(o), e;
}
function K0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: _r, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Qf(e) {
  if (!e) return sr;
  e = e._reactInternals;
  e: {
    if (br(e) !== e || e.tag !== 1) throw Error(fe(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (_n(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(fe(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (_n(n)) return Xh(e, n, t);
  }
  return t;
}
function Jf(e, t, n, r, l, o, i, a, c) {
  return e = cu(n, r, !0, e, l, o, i, a, c), e.context = Qf(null), n = e.current, r = Mn(), l = er(n), o = Cs(r, l), o.callback = t ?? null, Zs(n, o, l), e.current.lanes = l, co(e, l, r), Fn(e, r), e;
}
function Li(e, t, n, r) {
  var l = t.current, o = Mn(), i = er(l);
  return n = Qf(n), t.context === null ? t.context = n : t.pendingContext = n, t = Cs(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Zs(l, t, i), e !== null && (us(e, l, i, o), Uo(e, l, i)), i;
}
function Ni(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Sd(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function uu(e, t) {
  Sd(e, t), (e = e.alternate) && Sd(e, t);
}
function G0() {
  return null;
}
var Zf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function du(e) {
  this._internalRoot = e;
}
Oi.prototype.render = du.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(fe(409));
  Li(e, t, null, null);
};
Oi.prototype.unmount = du.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Cr(function() {
      Li(null, e, null, null);
    }), t[Ms] = null;
  }
};
function Oi(e) {
  this._internalRoot = e;
}
Oi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Mh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < zs.length && t !== 0 && t < zs[n].priority; n++) ;
    zs.splice(n, 0, e), n === 0 && Ih(e);
  }
};
function hu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Di(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function bd() {
}
function Y0(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = Ni(i);
        o.call(d);
      };
    }
    var i = Jf(t, r, e, 0, null, !1, !1, "", bd);
    return e._reactRootContainer = i, e[Ms] = i.current, Jl(e.nodeType === 8 ? e.parentNode : e), Cr(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var d = Ni(c);
      a.call(d);
    };
  }
  var c = cu(e, 0, !1, null, null, !1, !1, "", bd);
  return e._reactRootContainer = c, e[Ms] = c.current, Jl(e.nodeType === 8 ? e.parentNode : e), Cr(function() {
    Li(t, c, n, r);
  }), c;
}
function Pi(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = Ni(i);
        a.call(c);
      };
    }
    Li(t, i, e, l);
  } else i = Y0(n, t, e, l, r);
  return Ni(i);
}
Sh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $l(t.pendingLanes);
        n !== 0 && (Ac(t, n | 1), Fn(t, qt()), !(vt & 6) && (hl = qt() + 500, or()));
      }
      break;
    case 13:
      Cr(function() {
        var r = Ts(e, 1);
        if (r !== null) {
          var l = Mn();
          us(r, e, 1, l);
        }
      }), uu(e, 1);
  }
};
$c = function(e) {
  if (e.tag === 13) {
    var t = Ts(e, 134217728);
    if (t !== null) {
      var n = Mn();
      us(t, e, 134217728, n);
    }
    uu(e, 134217728);
  }
};
bh = function(e) {
  if (e.tag === 13) {
    var t = er(e), n = Ts(e, t);
    if (n !== null) {
      var r = Mn();
      us(n, e, t, r);
    }
    uu(e, t);
  }
};
Mh = function() {
  return St;
};
Th = function(e, t) {
  var n = St;
  try {
    return St = e, t();
  } finally {
    St = n;
  }
};
Oa = function(e, t, n) {
  switch (t) {
    case "input":
      if (Ma(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = bi(r);
            if (!l) throw Error(fe(90));
            oh(r), Ma(r, l);
          }
        }
      }
      break;
    case "textarea":
      ah(e, n);
      break;
    case "select":
      t = n.value, t != null && Jr(e, !!n.multiple, t, !1);
  }
};
mh = lu;
gh = Cr;
var X0 = { usingClientEntryPoint: !1, Events: [ho, zr, bi, fh, ph, lu] }, Sl = { findFiberByHostInstance: mr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Q0 = { bundleType: Sl.bundleType, version: Sl.version, rendererPackageName: Sl.rendererPackageName, rendererConfig: Sl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: As.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = vh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Sl.findFiberByHostInstance || G0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ro = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ro.isDisabled && Ro.supportsFiber) try {
    ji = Ro.inject(Q0), xs = Ro;
  } catch {
  }
}
Gn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = X0;
Gn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!hu(t)) throw Error(fe(200));
  return K0(e, t, null, n);
};
Gn.createRoot = function(e, t) {
  if (!hu(e)) throw Error(fe(299));
  var n = !1, r = "", l = Zf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = cu(e, 1, !1, null, null, n, !1, r, l), e[Ms] = t.current, Jl(e.nodeType === 8 ? e.parentNode : e), new du(t);
};
Gn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(fe(188)) : (e = Object.keys(e).join(","), Error(fe(268, e)));
  return e = vh(t), e = e === null ? null : e.stateNode, e;
};
Gn.flushSync = function(e) {
  return Cr(e);
};
Gn.hydrate = function(e, t, n) {
  if (!Di(t)) throw Error(fe(200));
  return Pi(null, e, t, !0, n);
};
Gn.hydrateRoot = function(e, t, n) {
  if (!hu(e)) throw Error(fe(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = Zf;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = Jf(t, null, e, 1, n ?? null, l, !1, o, i), e[Ms] = t.current, Jl(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Oi(t);
};
Gn.render = function(e, t, n) {
  if (!Di(t)) throw Error(fe(200));
  return Pi(null, e, t, !1, n);
};
Gn.unmountComponentAtNode = function(e) {
  if (!Di(e)) throw Error(fe(40));
  return e._reactRootContainer ? (Cr(function() {
    Pi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ms] = null;
    });
  }), !0) : !1;
};
Gn.unstable_batchedUpdates = lu;
Gn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Di(n)) throw Error(fe(200));
  if (e == null || e._reactInternals === void 0) throw Error(fe(38));
  return Pi(e, t, n, !1, r);
};
Gn.version = "18.3.1-next-f1338f8080-20240426";
function qf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qf);
    } catch (e) {
      console.error(e);
    }
}
qf(), Zd.exports = Gn;
var $s = Zd.exports, Md = $s;
Qo.createRoot = Md.createRoot, Qo.hydrateRoot = Md.hydrateRoot;
var ep = { exports: {} }, _i = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var J0 = u, Z0 = Symbol.for("react.element"), q0 = Symbol.for("react.fragment"), eg = Object.prototype.hasOwnProperty, tg = J0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ng = { key: !0, ref: !0, __self: !0, __source: !0 };
function tp(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) eg.call(t, r) && !ng.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Z0, type: e, key: o, ref: i, props: l, _owner: tg.current };
}
_i.Fragment = q0;
_i.jsx = tp;
_i.jsxs = tp;
ep.exports = _i;
var s = ep.exports;
let Vs = [], np = 120, ma = !1;
async function sg() {
  if (!ma) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          rg(n), ma = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    ma = !0;
  }
}
function rg(e) {
  Array.isArray(e) && (Vs = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Ss(e) {
  for (let t = Vs.length - 1; t >= 0; t--) {
    const n = Vs[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return Vs.length > 0 ? {
    offsetMin: Vs[0].offsetBeforeMin,
    label: Vs[0].labelBefore
  } : { offsetMin: np, label: "LOCAL" };
}
function sp(e, t) {
  return Vs.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function ki(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, i, a] = t.split(":").map(Number);
  for (const c of Vs)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const d = (c.offsetBeforeMin - c.offsetAfterMin) / 60, y = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (y.getUTCFullYear() === n && y.getUTCMonth() + 1 === r && y.getUTCDate() === l) {
        const f = y.getUTCHours();
        if (o >= f && o < f + d)
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
function lg(e) {
  const { offsetMin: t, label: n } = Ss(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function og(e) {
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
function yr(e, t = "LOCAL") {
  return t === "UTC" ? og(e) : lg(e);
}
function Td(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = yr(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function pc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, i] = e.split("-").map(Number), [a, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(i) || isNaN(a) || isNaN(c)) return null;
  const y = Date.UTC(l, o - 1, i, a, c, d);
  if (n === "UTC")
    return y;
  const f = ki(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const m = y - np * 6e4, { offsetMin: x } = Ss(m);
  let w = y - x * 6e4;
  const E = Ss(w);
  return E.offsetMin !== x && (w = y - E.offsetMin * 6e4), w;
}
function ig({
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
  onToggleDrawer: y,
  isInitialSetup: f = !1,
  selectedCount: m = 0,
  totalCount: x = 0,
  onResetStudio: w
}) {
  const [E, $] = u.useState(!1);
  u.useEffect(() => {
    if (!E) return;
    const M = (j) => {
      j.key === "Escape" && $(!1);
    };
    return window.addEventListener("keydown", M), () => window.removeEventListener("keydown", M);
  }, [E]);
  const v = u.useMemo(() => {
    const M = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!M || j <= 0) return "-- ➔ --";
    const N = M + j, b = (W) => String(W).padStart(2, "0"), C = yr(M, n), I = yr(N, n), _ = `${C.year}-${b(C.month)}-${b(C.day)}`, K = `${b(C.hour)}:${b(C.minute)}:${b(C.second)}`, A = `${I.year}-${b(I.month)}-${b(I.day)}`, z = `${b(I.hour)}:${b(I.minute)}:${b(I.second)}`, G = n === "UTC" ? " (UTC)" : C.label ? ` (${C.label})` : "", B = _ === A ? z : `${A} ${z}`;
    return `${_} ${K} ➔ ${B}${G}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), g = u.useMemo(() => {
    const M = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (M >= 1440) {
      const j = (M / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${M}m Total)`;
    }
    return `(${M}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), h = () => {
    $(!1), w == null || w();
  }, k = E ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => $(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (M) => M.stopPropagation(), dir: "ltr", children: [
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
          onClick: () => $(!1),
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
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: () => $(!1), children: "CANCEL" }),
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
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: v }),
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
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: m }),
            /* @__PURE__ */ s.jsxs("span", { className: "selection-total", children: [
              "/ ",
              x
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
          onClick: () => $(!0),
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
          onClick: y,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && k && $s.createPortal(k, document.body)
  ] });
}
const Rr = (e) => String(e).padStart(2, "0");
function qe(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const m = new Date(e), x = Rr(m.getUTCHours()), w = Rr(m.getUTCMinutes()), E = Rr(m.getUTCSeconds()), $ = l ? `${x}:${w}:${E}` : `${x}:${w}`;
    return r ? `${$} UTC` : $;
  }
  const { offsetMin: o, label: i } = Ss(e), a = new Date(e + o * 60 * 1e3), c = Rr(a.getUTCHours()), d = Rr(a.getUTCMinutes()), y = Rr(a.getUTCSeconds()), f = l ? `${c}:${d}:${y}` : `${c}:${d}`;
  return r ? `${f} ${i}` : f;
}
const ag = 600, Id = 250, Xn = /* @__PURE__ */ new Map(), pr = /* @__PURE__ */ new Map(), mc = /* @__PURE__ */ new Set(), Ad = 4;
let sl = 0, as = [];
function gc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Id) * Id;
}
function rp() {
  var e;
  if (!(sl >= Ad || as.length === 0))
    for (as = as.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); sl < Ad && as.length > 0; ) {
      const t = as.pop();
      !t || (e = t.signal) != null && e.aborted || (sl++, cg(t));
    }
}
function Yo(e, t, n, r = "mon-0") {
  const l = gc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
  if (Xn.size >= ag) {
    const a = Xn.keys().next().value, c = Xn.get(a);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), Xn.delete(a);
  }
  Xn.set(i, n), mc.forEach((a) => a(e, l, n, o));
}
async function cg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: i } = e;
  try {
    if (o != null && o.aborted) {
      i(null);
      return;
    }
    const a = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${a}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), y = URL.createObjectURL(d);
      Yo(n, r, y, l), i(y);
    } else c.status === 204 ? (Yo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } catch (a) {
    a.name !== "AbortError" ? (Yo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } finally {
    sl = Math.max(0, sl - 1), pr.delete(t), rp();
  }
}
const Sn = {
  /**
   * Gets a cached frame URL by station, timestamp, and optional displayId.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} [displayId='mon-0']
   * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
   */
  get(e, t, n = "mon-0") {
    const r = gc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!Xn.has(o)) return null;
    const i = Xn.get(o);
    return Xn.delete(o), Xn.set(o, i), i;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: Yo,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    Xn.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), Xn.clear(), pr.clear(), as = [], sl = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return mc.add(e), () => mc.delete(e);
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
    const l = gc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
    if (Xn.has(i))
      return Promise.resolve(this.get(e, l, o));
    if (pr.has(i))
      return pr.get(i);
    const a = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      as = as.filter((y) => y.hostname === e && y.displayId === o && y.key !== i ? (pr.delete(y.key), y.resolve(null), !1) : !0);
      const d = { key: i, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        as = as.filter((y) => y.key !== i), pr.delete(i), c(null);
      }, { once: !0 }), as.push(d), rp();
    });
    return pr.set(i, a), a;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Sn.clearAll();
});
const fu = "ITB_STUDIO_SESSION_CACHE_V2", lp = "itb_player_audio_settings";
let ga = null;
function ug() {
  try {
    const e = localStorage.getItem(fu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function op(e) {
  e && (ga && clearTimeout(ga), ga = setTimeout(() => {
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
      localStorage.setItem(fu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function dg() {
  try {
    localStorage.removeItem(fu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function rl() {
  try {
    const e = localStorage.getItem(lp);
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
function hg(e) {
  try {
    localStorage.setItem(lp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let Us = null, Qr = null, xa = null, Rn = 0, Lr = 0, Lo = -60, oo = 1;
function fg() {
  if (!Us) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Us = new e());
  }
  return Us && Us.state === "suspended" && Us.resume().catch(() => {
  }), Us;
}
function wi(e, t = 1) {
  if (!e) return null;
  oo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = fg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (i) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", i);
      }
    return l && l.gain.setValueAtTime(oo, n.currentTime), Qr = e, mg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function pg(e) {
  if (oo = Math.max(0, Number(e) || 1), Qr != null && Qr.__audioGainNode && Us)
    try {
      Qr.__audioGainNode.gain.setValueAtTime(oo, Us.currentTime);
    } catch {
    }
}
function mg() {
  if (xa) return;
  const e = new Uint8Array(256), t = () => {
    const n = Qr, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Rn *= 0.85, Lr *= 0.85, Rn < 1e-3 && (Rn = 0), Lr < 1e-3 && (Lr = 0), Lo = Rn > 1e-3 ? 20 * Math.log10(Rn) : -60;
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
        Rn = i > Rn ? Rn * 0.3 + i * 0.7 : Rn * 0.85 + i * 0.15, Lr = Math.max(Rn, o), Lo = Rn > 1e-4 ? 20 * Math.log10(Rn) : -60;
      } catch {
        Rn = 0, Lr = 0, Lo = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Rn,
        peak: Lr,
        db: Lo,
        gain: oo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), xa = requestAnimationFrame(t);
  };
  xa = requestAnimationFrame(t);
}
function ip({ isPlaying: e = !1 }) {
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
function gg({
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
          const d = (a.displayId ?? a.DisplayId ?? `mon-${c}`).toLowerCase(), y = !i && o === d, f = a.width ?? a.Width ?? 1920, m = a.height ?? a.Height ?? 1080, x = a.displayName ?? a.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${y ? "is-active" : ""}`,
              onClick: (w) => {
                w.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${x} (${f}×${m})`,
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
function xg({
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
  isSpotlightActive: y,
  globalGaps: f = [],
  recordingSegments: m = {},
  playbackSpeed: x = 1,
  activeAudioStationId: w = null,
  directorPlan: E = null,
  isAutoDirectorEnabled: $ = !0,
  targetDisplayId: v = "auto",
  onSelectDisplayId: g = null,
  areAllDisplaysPlaced: h = !1
}) {
  var _e;
  const k = e.hostname || e.name || e.id || "", M = Math.round(t), [j, N] = u.useState(() => !k || !M ? null : Sn.get(k, M) || null), [b, C] = u.useState(""), [I, _] = u.useState(!1), [K, A] = u.useState(!1), [z, G] = u.useState(!1), B = u.useRef(l), W = u.useRef(null), S = u.useRef(0), U = u.useRef(t - i), F = u.useRef(t - i), ee = u.useRef(!1), R = u.useRef(null), Z = u.useRef(!1);
  U.current = t - i;
  const Q = (e == null ? void 0 : e.displays) || ((_e = e == null ? void 0 : e.topology) == null ? void 0 : _e.displays) || [], [q, Y] = u.useState(null);
  u.useEffect(() => {
    Y(null);
  }, [v]);
  const re = u.useMemo(() => {
    const D = E || (e == null ? void 0 : e.directorPlan);
    return !D || !D.segments || D.segments.length === 0 ? null : D.segments.find((X) => {
      const me = X.startEpochMs ?? X.StartEpochMs ?? 0, we = X.endEpochMs ?? X.EndEpochMs ?? 0;
      return t >= me && t <= we;
    }) || D.segments[0];
  }, [E, e == null ? void 0 : e.directorPlan, t]), te = u.useMemo(() => {
    var D;
    return q ? q.toLowerCase() : v && v !== "auto" && v !== "director" ? v.toLowerCase() : Q.length > 1 && $ !== !1 && re ? (re.targetDisplayId || re.TargetDisplayId || "mon-0").toLowerCase() : (((D = Q[0]) == null ? void 0 : D.displayId) || "mon-0").toLowerCase();
  }, [q, v, Q, $, re]), de = m[e == null ? void 0 : e.id] || m[k] || (e == null ? void 0 : e.segments) || [], be = de.length === 0 || de.some((D) => {
    const X = D.startEpochMs ?? D.startEpoch ?? 0, me = D.endEpochMs ?? D.endEpoch ?? 0;
    return t >= X && t <= me;
  }), ve = !!(r ? !rl().isMuted : w && (e.id === w || k === w)), ie = u.useCallback(() => {
    if (!W.current) return;
    const D = rl();
    if (r)
      W.current.volume = D.volume, W.current.muted = D.isMuted, D.isMuted || wi(W.current);
    else {
      const X = !!(w && (e.id === w || k === w));
      W.current.muted = !X, X && (W.current.volume = D.volume, wi(W.current));
    }
  }, [r, w, e.id, k]);
  u.useEffect(() => {
    ie();
  }, [ie]), u.useEffect(() => {
    const D = (X) => {
      W.current && X.detail && ie();
    };
    return window.addEventListener("itb-audio-state-changed", D), () => window.removeEventListener("itb-audio-state-changed", D);
  }, [ie]), u.useEffect(() => {
    W.current && (W.current.defaultPlaybackRate = x, W.current.playbackRate = x);
  }, [x]), u.useEffect(() => {
    if (n || !M || !k) return;
    if (l) {
      B.current = !0;
      return;
    }
    const D = B.current;
    B.current = l;
    let X = !0;
    const me = new AbortController(), we = Sn.get(k, M, te);
    if (we) {
      N(we), A(!1), G(!1);
      return;
    }
    G(!0);
    const Ne = setTimeout(() => {
      X && Sn.fetchFrame(k, M, me.signal, te).then((Ie) => {
        X && (G(!1), Ie && Ie !== "NO_SIGNAL" ? (N(Ie), A(!1)) : Ie === "NO_SIGNAL" && A(!0));
      });
    }, D ? 25 : 40), le = Sn.subscribe((Ie, ce, Be, Me) => {
      Ie === k && ce === M && (!Me || Me === te) && X && (G(!1), Be && Be !== "NO_SIGNAL" ? (N(Be), A(!1)) : Be === "NO_SIGNAL" && A(!0));
    });
    return () => {
      X = !1, clearTimeout(Ne), me.abort(), le();
    };
  }, [k, M, n, l, r, I, te]), u.useEffect(() => {
    if (!k || !(r || l)) {
      l || (R.current && clearTimeout(R.current), ee.current = !1, C(""), _(!1), W.current && (W.current.pause(), W.current.removeAttribute("src"), W.current.load()));
      return;
    }
    let X = null;
    return l && !y && be ? X = setTimeout(() => {
      const me = U.current;
      S.current = me, F.current = me, ee.current = !1;
      const we = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(k)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + me}&displayId=${encodeURIComponent(te)}&_t=${Date.now()}`;
      _(!1), C(we);
    }, 80) : l || (R.current && clearTimeout(R.current), ee.current = !1, C(""), _(!1), W.current && (W.current.pause(), W.current.removeAttribute("src"), W.current.load())), () => {
      X && clearTimeout(X);
    };
  }, [l, r, k, i, a, y, be, te]), u.useEffect(() => {
    if (!k || !(r || l)) return;
    const X = U.current, me = Math.abs(X - F.current);
    if (!l || me < 800) {
      F.current = X;
      return;
    }
    return ee.current = !0, F.current = X, S.current = X, W.current && W.current.pause(), _(!1), R.current && clearTimeout(R.current), R.current = setTimeout(() => {
      if (!be || y) {
        C(""), _(!1), ee.current = !1;
        return;
      }
      const we = U.current, Xe = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(k)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + we}&displayId=${encodeURIComponent(te)}&_t=${Date.now()}`;
      C(Xe);
    }, 75), () => {
      R.current && clearTimeout(R.current);
    };
  }, [t, l, r, k, i, a, y, be, te]), u.useEffect(() => {
    if (r || !l || !W.current || !I || ee.current) return;
    const D = (U.current - S.current) / 1e3;
    if (D >= 0) {
      const X = W.current, me = X.currentTime, we = Math.abs(me - D);
      if (we > 0.35 && we < 3)
        try {
          X.currentTime = D;
        } catch {
        }
    }
  }, [r, l, t, I]), u.useEffect(() => {
    if (!r || !l || !b || !I || y) return;
    let D = null, X = W.current ? W.current.currentTime : 0, me = performance.now(), we = S.current + Math.round(X * 1e3);
    const Xe = () => {
      const Ne = W.current;
      if (Ne && !Ne.paused && !Ne.ended && !Z.current && !ee.current) {
        const le = performance.now(), Ie = Ne.currentTime;
        Math.abs(Ie - X) > 5e-4 && (X = Ie, me = le);
        const ce = Math.max(0, (le - me) / 1e3), Be = Ne.playbackRate || x || 1, Me = X + ce * Be;
        let Ye = S.current + Math.round(Me * 1e3);
        const je = Ye - we;
        if (je < 0 && je > -300 && (Ye = we), Ye >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const ut = i + Ye, Ue = f == null ? void 0 : f.find((xt) => ut >= xt.startEpochMs && ut < xt.endEpochMs);
        if (Ue) {
          Z.current = !0;
          const xt = Ue.endEpochMs - i;
          d(xt), S.current = xt, we = xt, F.current = xt;
          const yt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(k)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + xt}&_t=${Date.now()}`;
          _(!1), C(yt), setTimeout(() => {
            Z.current = !1;
          }, 300);
          return;
        }
        Ye !== we && (we = Ye, F.current = Ye, d == null || d(Ye));
      }
      D = requestAnimationFrame(Xe);
    };
    return D = requestAnimationFrame(Xe), () => {
      D && cancelAnimationFrame(D);
    };
  }, [
    r,
    l,
    b,
    I,
    y,
    x,
    c,
    i,
    a,
    k,
    f,
    d,
    o
  ]);
  const ke = () => {
    if (Z.current) return;
    const D = i + U.current, X = de.map((me) => ({ start: me.startEpochMs ?? me.startEpoch ?? 0, end: me.endEpochMs ?? me.endEpoch ?? 0 })).filter((me) => me.start > D + 200).sort((me, we) => me.start - we.start)[0];
    if (X && X.start - i < c) {
      Z.current = !0;
      const me = X.start - i;
      d(me), S.current = me;
      const we = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(k)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + me}&_t=${Date.now()}`;
      _(!1), C(we), setTimeout(() => {
        Z.current = !1;
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
    (r || l) && b && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: W,
        src: b,
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
        muted: !ve,
        onLoadedData: () => {
          W.current && (W.current.defaultPlaybackRate = x, W.current.playbackRate = x);
        },
        onCanPlay: () => {
          ie(), W.current && (W.current.defaultPlaybackRate = x, W.current.playbackRate = x), l && W.current && W.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ee.current = !1, _(!0), ie(), W.current && (W.current.defaultPlaybackRate = x, W.current.playbackRate = x);
        },
        onWaiting: () => {
          _(!1);
        },
        onTimeUpdate: () => {
          var D;
          !I && ((D = W.current) == null ? void 0 : D.currentTime) > 0 && (ee.current = !1, _(!0));
        },
        onEnded: ke
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
        children: j && !K ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: j,
            alt: k,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => A(!0)
          }
        ) : (!j || K || !be) && !b ? /* @__PURE__ */ s.jsx(ip, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && be && !I && !y && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          k
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ s.jsx(
      gg,
      {
        displays: Q,
        activeDisplayId: te,
        onSelectDisplay: (D) => {
          Y(D), g == null || g(D);
        },
        areAllDisplaysPlaced: h,
        isAutoDirectorEnabled: $
      }
    )
  ] });
}
function yg({
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
  outPointMs: y,
  setPlayheadMs: f,
  isSpotlightActive: m,
  globalGaps: x = [],
  onOpenSpotlight: w,
  onSelectActiveStation: E,
  recordingSegments: $ = {},
  playbackSpeed: v = 1,
  activeAudioStationId: g = null,
  onSoloAudio: h,
  directorPlan: k = null,
  isAutoDirectorEnabled: M = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: N = null,
  areAllDisplaysPlaced: b = !1,
  _slotIndex: C = 0,
  borderColor: I = null,
  onSwapWithNext: _ = null
}) {
  var S;
  const K = !!(g && (e.id === g || e.hostname && e.hostname === g)), A = (e.hostname || e.name || "").includes("Offline"), z = A ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((S = e == null ? void 0 : e.topology) == null ? void 0 : S.displays) || []).length > 1;
  const B = () => {
    if (t) {
      const U = j && j !== "auto" && j !== "director" ? j : null;
      w && w(e.id, U);
    } else
      E && E(e.id);
  }, W = (U) => {
    U.preventDefault(), U.stopPropagation(), t && E && (a && a(!1), E(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: B,
      onContextMenu: W,
      className: `camera-card ${z} ${t ? "is-solo-card" : ""}`,
      style: I ? { borderColor: I } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${z}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            _ && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (U) => {
                  U.stopPropagation(), _();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            h && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${K ? "audio-active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), h(K ? null : e.id);
                },
                title: K ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: K ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor", fillOpacity: "0.25" }),
                  /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" })
                ] }) : /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                ] })
              }
            ),
            w && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (U) => {
                  U.stopPropagation();
                  const F = j && j !== "auto" && j !== "director" ? j : null;
                  w(e.id, F);
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
                onClick: (U) => {
                  U.stopPropagation(), t && a && a(!1), E(t ? null : e.id);
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
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${A ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            xg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: A,
              isSolo: t,
              isPlaying: i,
              setIsPlaying: a,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: y,
              setPlayheadMs: f,
              isSpotlightActive: m,
              globalGaps: x,
              recordingSegments: $,
              playbackSpeed: v,
              activeAudioStationId: g,
              directorPlan: k,
              isAutoDirectorEnabled: M,
              targetDisplayId: j,
              onSelectDisplayId: N,
              areAllDisplaysPlaced: b
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
        !A && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          qe(l, o)
        ] }) })
      ]
    }
  ) });
}
function Wt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function vg(e) {
  const t = Wt(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Ng(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function kg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var E, $, v, g, h, k;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let M = 0; M < e.length; M++)
    if (e[M].timestampEpochMs <= t)
      l = e[M], o = e[M + 1] || e[M];
    else {
      o === l && e[M] && (o = e[M]);
      break;
    }
  if (l === o)
    return ((E = l.layout) == null ? void 0 : E.placements) || n;
  const i = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), a = o.transitionType || "smooth", c = o.timestampEpochMs - i;
  if (t < c)
    return (($ = l.layout) == null ? void 0 : $.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((v = o.layout) == null ? void 0 : v.placements) || n;
  if (a === "cut")
    return ((g = l.layout) == null ? void 0 : g.placements) || n;
  const d = (t - c) / i, y = Wt(d, 0, 1), f = a === "linear" ? y : vg(y), m = ((h = l.layout) == null ? void 0 : h.placements) || [], x = ((k = o.layout) == null ? void 0 : k.placements) || [], w = x.map((M) => {
    const j = m.find((K) => K.stationId === M.stationId && K.displayId === M.displayId);
    if (!j)
      return {
        ...M,
        opacity: Math.max(0.05, f)
      };
    const N = Math.round(j.x + (M.x - j.x) * f), b = Math.round(j.y + (M.y - j.y) * f), C = Math.round(j.width + (M.width - j.width) * f), I = Math.round(j.height + (M.height - j.height) * f), _ = Number(((j.rotation || 0) + ((M.rotation || 0) - (j.rotation || 0)) * f).toFixed(1));
    return {
      ...M,
      x: N,
      y: b,
      width: C,
      height: I,
      rotation: _,
      opacity: 1
    };
  });
  return m.forEach((M) => {
    x.some((N) => N.stationId === M.stationId && N.displayId === M.displayId) || w.push({
      ...M,
      opacity: Math.max(0, 1 - f)
    });
  }), w;
}
function wg({
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
    const w = {
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
      nextTimeline: { ...e || {}, keyframes: [w] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: w
    };
  }
  const d = c.findIndex((w) => Math.abs(w.timestampEpochMs - n) <= l);
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
  const y = {
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
  }, f = [...c, y].sort((w, E) => w.timestampEpochMs - E.timestampEpochMs), m = f.findIndex((w) => w.id === y.id);
  return {
    nextTimeline: { ...e, keyframes: f },
    newIndex: m >= 0 ? m : 0,
    isNewKeyframe: !0,
    activeKeyframe: y
  };
}
function $d(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function jg(e, t) {
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
function Rd(e, t, n, r = 500) {
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
  }, a = [...l, i].sort((d, y) => d.timestampEpochMs - y.timestampEpochMs), c = a.findIndex((d) => d.id === i.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: a
    },
    newIndex: c >= 0 ? c : 0,
    isNew: !0
  };
}
const fs = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], xc = 1920, yc = 1080, pt = [
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
], Eg = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
], Cg = [
  { id: "none", label: "None" },
  { id: "deep", label: "Deep Cinema" },
  { id: "glow-cyan", label: "Cyan Glow" },
  { id: "glow-emerald", label: "Emerald Glow" },
  { id: "glow-rose", label: "Rose Glow" },
  { id: "glow-amber", label: "Amber Glow" }
];
function Sg(e, t, n) {
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
function dr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function Ws(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, i = n / r;
  let a, c, d, y;
  return o >= i ? (a = n, c = Math.round(a / o), d = e, y = t + Math.round((r - c) / 2)) : (c = r, a = Math.round(c * o), d = e + Math.round((n - a) / 2), y = t), { x: d, y, width: a, height: c };
}
function Or(e, t = xc, n = yc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: f, width: m, height: x } = Ws(0, 0, t, n, d);
    return [{
      ...c,
      x: y,
      y: f,
      width: m,
      height: x,
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
    return e.slice(0, 2).map((d, y) => {
      const f = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: m, y: x, width: w, height: E } = Ws(y * c, 0, c, n, f);
      return {
        ...d,
        x: m,
        y: x,
        width: w,
        height: E,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: f,
        aspectRatio: f,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[y % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const m = Math.round(t / 3);
      return e.slice(0, 3).map((x, w) => {
        const E = x.nativeAspectRatio || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 1.7777777777777777), { x: $, y: v, width: g, height: h } = Ws(w * m, 0, m, n, E);
        return {
          ...x,
          x: $,
          y: v,
          width: g,
          height: h,
          sourceWidth: x.sourceWidth || 1920,
          sourceHeight: x.sourceHeight || 1080,
          nativeAspectRatio: E,
          aspectRatio: E,
          zIndex: w,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[w % pt.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), y = Math.round(n / 2), f = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: y }
    ];
    return e.slice(0, 3).map((m, x) => {
      const w = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: E, cy: $ } = f[x], { x: v, y: g, width: h, height: k } = Ws(E, $, d, y, w);
      return {
        ...m,
        x: v,
        y: g,
        width: h,
        height: k,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: w,
        aspectRatio: w,
        zIndex: x,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[x % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 4) {
    const c = Math.round(t / 2), d = Math.round(n / 2), y = [
      { cx: 0, cy: 0 },
      { cx: c, cy: 0 },
      { cx: 0, cy: d },
      { cx: c, cy: d }
    ];
    return e.slice(0, 4).map((f, m) => {
      const x = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: w, cy: E } = y[m], { x: $, y: v, width: g, height: h } = Ws(w, E, c, d, x);
      return {
        ...f,
        x: $,
        y: v,
        width: g,
        height: h,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: x,
        aspectRatio: x,
        zIndex: m,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[m % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), i = Math.floor(t / l), a = Math.floor(n / o);
  return e.map((c, d) => {
    const y = d % l, f = Math.floor(d / l), m = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x, y: w, width: E, height: $ } = Ws(y * i, f * a, i, a, m);
    return {
      ...c,
      x,
      y: w,
      width: E,
      height: $,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: m,
      aspectRatio: m,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: pt[d % pt.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function bg({
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
  playheadMs: y = 0,
  playheadEpochMs: f = 0,
  timeMode: m = "LOCAL",
  isPlaying: x = !1,
  setIsPlaying: w,
  totalDurationMs: E,
  inPointMs: $ = 0,
  outPointMs: v,
  setPlayheadMs: g,
  globalGaps: h = [],
  recordingSegments: k = {},
  playbackSpeed: M = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: N = "BurnIn",
  keystrokes: b = [],
  directorPlan: C = null,
  onOverrideDisplay: I,
  onResetOverride: _,
  compositionLayout: K = "canvas",
  onChangeCompositionLayout: A,
  isAutoDirectorEnabled: z = !0,
  onToggleAutoDirector: G,
  onUpdateCanvasLayout: B,
  canvasLayoutTimeline: W = null,
  onUpdateCanvasLayoutTimeline: S,
  activeKfIndex: U = 0,
  setActiveKfIndex: F,
  isModalOpen: ee = !1
}) {
  const R = f > 0 ? f : d + y, [Z, Q] = u.useState(() => {
    var p;
    return ((p = t[0]) == null ? void 0 : p.id) || null;
  }), [q, Y] = u.useState(!1), [re, te] = u.useState(null), [de, be] = u.useState({ index: null, position: null }), [ve, ie] = u.useState(!1), [ke, _e] = u.useState(!1), [D, X] = u.useState(""), [me, we] = u.useState(""), Xe = u.useRef(null), [Ne, le] = u.useState(() => {
    try {
      const p = localStorage.getItem("itb_canvas_saved_presets");
      return p ? JSON.parse(p) : [];
    } catch {
      return [];
    }
  }), Ie = (p) => {
    le(p);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(p));
    } catch {
    }
  }, [ce, Be] = u.useState(!1), [Me, Ye] = u.useState(!1);
  u.useRef(null);
  const je = u.useRef(null), ut = u.useRef(null), Ue = u.useRef(null), [xt, yt] = u.useState({ width: 960, height: 540 }), [Pe, dt] = u.useState(0), [Qt, ns] = u.useState(!1), [Bn, bt] = u.useState(!1), [_t, Ut] = u.useState(!1), [ge, Nt] = u.useState(!1), [Qe, gt] = u.useState(!1), [fn, pn] = u.useState({ vertical: null, horizontal: null }), [en, wn] = u.useState(!0), [Ee, Se] = u.useState(!0), [We, ht] = u.useState(null), [kt, V] = u.useState({ x: 0, y: 0, isInside: !1 }), ue = u.useRef(null), ae = u.useRef(null), Ae = u.useRef(!1), [Ke, He] = u.useState("auto-grid"), Je = u.useRef([]), Ve = u.useRef([]), ot = u.useRef(null), [, Mt] = u.useState(0), Kt = u.useRef(null), [Jt, An] = u.useState(null), Gt = u.useCallback((p, T = "success", L = "💾") => {
    Kt.current && clearTimeout(Kt.current), An({ text: p, type: T, icon: L }), Kt.current = setTimeout(() => {
      An(null), Kt.current = null;
    }, 2200);
  }, []), [Rt, Ft] = u.useState(() => {
    var L, J, H, P, se, $e;
    const p = (H = (J = (L = W == null ? void 0 : W.keyframes) == null ? void 0 : L[0]) == null ? void 0 : J.layout) == null ? void 0 : H.width, T = ($e = (se = (P = W == null ? void 0 : W.keyframes) == null ? void 0 : P[0]) == null ? void 0 : se.layout) == null ? void 0 : $e.height;
    if (p && T) {
      const xe = fs.find((ye) => ye.w === p && ye.h === T);
      if (xe) return xe.id;
    }
    return "16:9";
  }), [jn, Mr] = u.useState(() => {
    try {
      const p = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (p !== null) return p === "true";
    } catch {
    }
    return !1;
  }), Tr = u.useCallback(() => {
    Mr((p) => {
      const T = !p;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(T));
      } catch {
      }
      return T;
    });
  }, []), ir = u.useMemo(() => fs.find((p) => p.id === Rt) || fs[0], [Rt]), Ce = ir.w, Te = ir.h, an = ir.ratio, gl = u.useMemo(() => {
    const p = [], T = Ce >= 3e3 ? 200 : 100, L = T / 2, J = T / 10;
    for (let H = 0; H <= Ce; H += J) {
      const P = H % T === 0, se = !P && H % L === 0;
      p.push({ val: H, isMajor: P, isMed: se });
    }
    return p;
  }, [Ce]), Ir = u.useMemo(() => {
    const p = [];
    for (let H = 0; H <= Te; H += 10) {
      const P = H % 100 === 0, se = !P && H % 50 === 0;
      p.push({ val: H, isMajor: P, isMed: se });
    }
    return p;
  }, [Te]), xl = u.useCallback((p) => {
    const T = ue.current || ut.current;
    if (!T) return;
    const L = T.getBoundingClientRect(), J = Wt(Math.round((p.clientX - L.left) / L.width * Ce), 0, Ce), H = Wt(Math.round((p.clientY - L.top) / L.height * Te), 0, Te);
    V({ x: J, y: H, isInside: !0 });
  }, [Ce, Te]), Ar = u.useCallback(() => {
    V((p) => ({ ...p, isInside: !1 }));
  }, []), tn = u.useCallback(() => {
    const p = Ue.current;
    if (!p) return;
    const T = p.getBoundingClientRect(), L = Math.max(320, Math.floor(T.width || 960) - 16), J = Math.max(180, Math.floor(T.height || 540) - 16);
    let H, P;
    jn ? (H = L, P = Math.round(H / an)) : L / J >= an ? (P = J, H = Math.round(P * an)) : (H = L, P = Math.round(H / an)), yt((se) => se.width === H && se.height === P ? se : { width: H, height: P });
  }, [jn, an]);
  u.useEffect(() => {
    const p = Ue.current;
    if (!p) return;
    tn();
    let T = null;
    return typeof ResizeObserver < "u" && (T = new ResizeObserver(() => {
      tn();
    }), T.observe(p)), window.addEventListener("resize", tn), () => {
      T && T.disconnect(), window.removeEventListener("resize", tn);
    };
  }, [tn]);
  const jt = u.useMemo(() => {
    const p = n && n.length > 0 ? n : t, T = [];
    return p.forEach((L) => {
      (L.displays && L.displays.length > 0 ? L.displays : L.topology && L.topology.displays && L.topology.displays.length > 0 ? L.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: L.width || 1920, height: L.height || 1080 }]).forEach((H, P) => {
        const se = (H.displayId || `mon-${P}`).toLowerCase(), $e = H.displayNumber || P + 1, xe = H.displayName || `Screen ${$e}`, ye = H.width || H.Width || L.width || 1920, tt = H.height || H.Height || L.height || 1080, et = ye / tt;
        T.push({
          stationId: L.id,
          displayId: se,
          label: `${L.displayName || L.roleAlias || L.hostname || L.name} - ${xe}`,
          stationName: L.displayName || L.roleAlias || L.hostname || L.name,
          stationHostname: L.hostname || L.id,
          isPrimary: !!H.isPrimary,
          sourceWidth: ye,
          sourceHeight: tt,
          nativeAspectRatio: et,
          aspectRatio: et,
          width: ye,
          height: tt
        });
      });
    }), T;
  }, [n, t]), [cn, un] = u.useState(() => {
    var p;
    return ((p = W == null ? void 0 : W.keyframes) == null ? void 0 : p.length) > 0 ? JSON.parse(JSON.stringify(W)) : {
      id: "canvas-timeline-root",
      keyframes: [
        {
          id: "kf_root_0",
          timestampEpochMs: d,
          transitionDurationSec: 0.5,
          transitionType: "smooth",
          layout: {
            width: xc,
            height: yc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: Or(jt, xc, yc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var p;
    ((p = W == null ? void 0 : W.keyframes) == null ? void 0 : p.length) > 0 && (un(JSON.parse(JSON.stringify(W))), W.keyframes.some((L) => {
      var J, H;
      return ((H = (J = L.layout) == null ? void 0 : J.placements) == null ? void 0 : H.length) > 0;
    }) && (Ae.current = !0, He("custom")));
  }, [W]);
  const nn = cn.keyframes || [], po = u.useMemo(() => Ng(nn, R), [nn, R]), Zt = Wt(
    U ?? po,
    0,
    Math.max(0, nn.length - 1)
  ), rn = nn[Zt] || nn[po] || nn[0], he = u.useMemo(() => {
    var p;
    return ((p = rn == null ? void 0 : rn.layout) == null ? void 0 : p.placements) || [];
  }, [rn]), ss = u.useCallback((p = "Action") => ({
    label: p,
    timeline: JSON.parse(JSON.stringify(cn)),
    aspectId: Rt,
    presetId: Ke,
    selectedFeedIndex: Pe
  }), [cn, Rt, Ke, Pe]), Un = u.useCallback((p = "Action") => {
    const T = ss(p);
    Je.current.push(T), Je.current.length > 50 && Je.current.shift(), Ve.current = [], Mt((L) => L + 1);
  }, [ss]), O = u.useCallback(() => {
    ot.current && (Je.current.push(ot.current), Je.current.length > 50 && Je.current.shift(), Ve.current = [], ot.current = null, Mt((p) => p + 1));
  }, []), oe = u.useCallback(() => {
    const p = f > 0 ? f : d + y, T = 500;
    if (p <= d + T) return Zt;
    const L = (rn == null ? void 0 : rn.layout) || {
      width: Ce,
      height: Te,
      backgroundColor: "#070A10",
      fps: 30,
      placements: he
    }, { nextTimeline: J, newIndex: H, isNew: P } = Rd(cn, p, L, T);
    return P && (un(J), S && S(J), F && F(H), Gt(
      `Keyframe #${H + 1} created at ${qe(p, m, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), H;
  }, [f, d, y, Zt, rn, Ce, Te, he, cn, S, F, m, Gt]), ne = u.useCallback((p, T = null) => {
    T && Un(T);
    const L = f > 0 ? f : d + y;
    un((J) => {
      const { nextTimeline: H, newIndex: P, isNewKeyframe: se } = wg({
        prevTimeline: J,
        newPlacements: p,
        currentEpochMs: L,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Ce,
        virtualH: Te,
        fps: 30
      });
      return S && S(H), F && F(P), se && P > 0 && Gt(
        `Keyframe #${P + 1} created at ${qe(L, m, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), H;
    });
  }, [f, d, y, Ce, Te, S, F, m, Gt, Un]);
  u.useEffect(() => {
    if (jt.length > 0 && (!he || he.length === 0) && !Ae.current) {
      let p = Rt;
      jt.length === 2 && Rt === "16:9" && (p = "32:9", Ft("32:9"));
      const T = fs.find((J) => J.id === p) || fs[0], L = Or(jt, T.w, T.h);
      L.length > 0 && (ne(L), He("auto-grid"));
    }
  }, [jt, he, ne, Rt]), u.useEffect(() => {
    B && B({
      width: Ce,
      height: Te,
      backgroundColor: "#070A10",
      fps: 30,
      placements: he,
      timeline: cn
    });
  }, [he, cn, B, Ce, Te]);
  const ze = u.useCallback((p) => {
    const T = ir, L = fs.find((J) => J.id === p) || fs[0];
    if (T.id !== L.id)
      if (Ft(L.id), Ae.current) {
        const J = L.w / T.w, H = L.h / T.h, P = he.map((se) => ({
          ...se,
          x: Math.round(se.x * J),
          y: Math.round(se.y * H),
          width: Math.round(se.width * J),
          height: Math.round(se.height * H)
        }));
        ne(P);
      } else {
        const J = Or(he && he.length > 0 ? he : jt, L.w, L.h);
        ne(J);
      }
  }, [ir, he, jt, ne]), Fe = u.useCallback((p) => {
    const T = he.length > 0 ? Math.max(...he.map((xe) => xe.zIndex || 0)) + 1 : 0, L = pt[he.length % pt.length], J = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 16 / 9), H = J >= 1 ? 640 : Math.round(360 * J), P = J >= 1 ? Math.round(640 / J) : 360, se = {
      stationId: p.stationId,
      displayId: p.displayId,
      label: p.label,
      x: 100 + he.length * 40 % 800,
      y: 80 + he.length * 40 % 500,
      width: H,
      height: P,
      sourceWidth: p.sourceWidth || 1920,
      sourceHeight: p.sourceHeight || 1080,
      nativeAspectRatio: J,
      aspectRatio: J,
      zIndex: T,
      rotation: 0,
      borderWidth: 2,
      borderColor: L,
      shadowEffect: "deep",
      borderRadius: 0
    }, $e = [...he, se];
    ne($e), dt($e.length - 1);
  }, [he, ne]), Le = u.useCallback((p) => {
    const T = he.filter((L, J) => J !== p);
    ne(T), dt((L) => Math.max(0, L - 1));
  }, [he, ne]), Ge = u.useCallback(() => {
    ne([]), dt(-1);
  }, [ne]), De = (p) => {
    const T = p.map((J, H) => ({ p: J, origIdx: H }));
    T.sort((J, H) => (J.p.zIndex ?? J.origIdx) - (H.p.zIndex ?? H.origIdx));
    const L = [...p];
    return T.forEach(({ origIdx: J }, H) => {
      L[J] = { ...L[J], zIndex: H + 1 };
    }), L;
  }, lt = u.useCallback((p = Pe) => {
    if (p < 0 || !he[p]) return;
    const T = De(he), L = T[p].zIndex, J = T.length;
    if (L >= J) return;
    const H = T.map((P, se) => se === p ? { ...P, zIndex: J } : P.zIndex > L ? { ...P, zIndex: P.zIndex - 1 } : P);
    ne(H);
  }, [Pe, he, ne]), ft = u.useCallback((p = Pe) => {
    if (p < 0 || !he[p]) return;
    const T = De(he), L = T[p].zIndex;
    if (L <= 1) return;
    const J = T.map((H, P) => P === p ? { ...H, zIndex: 1 } : H.zIndex < L ? { ...H, zIndex: H.zIndex + 1 } : H);
    ne(J);
  }, [Pe, he, ne]), Et = u.useCallback((p = Pe) => {
    if (p < 0 || !he[p]) return;
    const T = De(he), L = T[p].zIndex, J = L + 1;
    if (J > T.length) return;
    const H = T.map((P, se) => se === p ? { ...P, zIndex: J } : P.zIndex === J ? { ...P, zIndex: L } : P);
    ne(H);
  }, [Pe, he, ne]), Lt = u.useCallback((p = Pe) => {
    if (p < 0 || !he[p]) return;
    const T = De(he), L = T[p].zIndex, J = L - 1;
    if (J < 1) return;
    const H = T.map((P, se) => se === p ? { ...P, zIndex: J } : P.zIndex === J ? { ...P, zIndex: L } : P);
    ne(H);
  }, [Pe, he, ne]), Yt = u.useCallback((p) => {
    if (Pe < 0 || !he[Pe]) return;
    const T = he.map((L, J) => J === Pe ? { ...L, ...p } : L);
    ne(T);
  }, [Pe, he, ne]), $n = u.useCallback((p = 90) => {
    const T = he[Pe];
    if (!T) return;
    const J = ((T.rotation || 0) + p) % 360;
    Yt({ rotation: J });
  }, [Pe, he, Yt]), Rs = u.useCallback((p = Pe) => {
    if (p < 0 || !he[p]) return;
    const T = he.length, L = he.map((J, H) => H === p ? {
      ...J,
      x: 0,
      y: 0,
      width: Ce,
      height: Te,
      zIndex: T
    } : J);
    ne(L);
  }, [Pe, he, ne, Ce, Te]), Ot = u.useCallback((p) => {
    let T = [];
    const L = jt.length > 0 ? jt : he;
    switch (p) {
      case "auto":
      case "auto-grid":
        T = Or(L, Ce, Te);
        break;
      case "1x1":
        L.length > 0 && (T = [{
          ...L[0],
          x: 0,
          y: 0,
          width: Ce,
          height: Te,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: pt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (L.length >= 2) {
          const J = Math.round(Ce / 2);
          T = L.slice(0, 2).map((H, P) => {
            const se = H.nativeAspectRatio || (H.sourceWidth && H.sourceHeight ? H.sourceWidth / H.sourceHeight : 1.7777777777777777), { x: $e, y: xe, width: ye, height: tt } = Ws(P * J, 0, J, Te, se);
            return {
              ...H,
              x: $e,
              y: xe,
              width: ye,
              height: tt,
              sourceWidth: H.sourceWidth || 1920,
              sourceHeight: H.sourceHeight || 1080,
              nativeAspectRatio: se,
              aspectRatio: se,
              zIndex: P + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: pt[P % pt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          T = Or(L, Ce, Te);
        break;
      case "2x2": {
        const J = Math.round(Ce / 2), H = Math.round(Te / 2);
        T = L.slice(0, 4).map((P, se) => ({
          ...P,
          x: se % 2 * J,
          y: Math.floor(se / 2) * H,
          width: J,
          height: H,
          zIndex: se,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[se % pt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (L.length >= 2) {
          T = [
            { ...L[0], x: 0, y: 0, width: Ce, height: Te, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: pt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const J = L.slice(1, 4), H = Math.round(Ce * 0.23), P = Math.round(H / (16 / 9));
          J.forEach((se, $e) => {
            T.push({
              ...se,
              x: Ce - H - 24,
              y: 24 + $e * (P + 16),
              width: H,
              height: P,
              zIndex: 10 + $e,
              rotation: 0,
              borderWidth: 3,
              borderColor: pt[($e + 1) % pt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (L.length >= 3) {
          const J = Math.round(Ce * 0.666), H = Ce - J, P = Math.round(Te / 2);
          T = [
            { ...L[0], x: 0, y: 0, width: J, height: Te, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...L[1], x: J, y: 0, width: H, height: P, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...L[2], x: J, y: P, width: H, height: P, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (L.length >= 3)
          if (Ce / Te >= 2.5) {
            const H = Math.round(Ce / 3);
            T = L.slice(0, 3).map((P, se) => {
              const $e = P.nativeAspectRatio || (P.sourceWidth && P.sourceHeight ? P.sourceWidth / P.sourceHeight : 1.7777777777777777), { x: xe, y: ye, width: tt, height: et } = Ws(se * H, 0, H, Te, $e);
              return {
                ...P,
                x: xe,
                y: ye,
                width: tt,
                height: et,
                sourceWidth: P.sourceWidth || 1920,
                sourceHeight: P.sourceHeight || 1080,
                nativeAspectRatio: $e,
                aspectRatio: $e,
                zIndex: se,
                rotation: 0,
                borderWidth: 2,
                borderColor: pt[se % pt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const H = Math.round(Ce / 2), P = Math.round(Te / 2);
            T = [
              { ...L[0], x: 0, y: 0, width: H, height: P, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...L[1], x: H, y: 0, width: H, height: P, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...L[2], x: Math.round(H / 2), y: P, width: H, height: P, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    T.length > 0 && (ne(T), dt(0), p === "auto" || p === "auto-grid" ? He("auto-grid") : (He(p), Ae.current = !0));
  }, [jt, he, ne, Ce, Te]), Ls = u.useCallback(() => {
    const p = D.trim() || `Custom Layout ${Ne.length + 1}`, L = [{
      id: `preset-${Date.now()}`,
      name: p,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(he)),
      keyframes: JSON.parse(JSON.stringify(nn))
    }, ...Ne];
    Ie(L), X(""), ie(!1);
  }, [D, Ne, he, nn]), ar = u.useCallback((p) => {
    !p || !p.placements || (ne(p.placements), dt(0), He("custom"), Ae.current = !0, _e(!1));
  }, [ne]), yp = u.useCallback((p, T) => {
    T == null || T.stopPropagation();
    const L = Ne.filter((J) => J.id !== p);
    Ie(L);
  }, [Ne]), vp = u.useCallback(() => {
    const p = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Ce,
      height: Te,
      aspectRatio: Rt,
      placements: he,
      timeline: cn
    }, T = JSON.stringify(p, null, 2), L = new window.Blob([T], { type: "application/json" }), J = window.URL.createObjectURL(L), H = document.createElement("a"), P = /* @__PURE__ */ new Date(), se = (xe) => String(xe).padStart(2, "0"), $e = `${P.getFullYear()}${se(P.getMonth() + 1)}${se(P.getDate())}_${se(P.getHours())}${se(P.getMinutes())}${se(P.getSeconds())}`;
    H.href = J, H.download = `canvas_layout_${$e}.json`, document.body.appendChild(H), H.click(), document.body.removeChild(H), window.URL.revokeObjectURL(J);
  }, [he, cn, Ce, Te, Rt]), Np = u.useCallback((p) => {
    var J;
    const T = (J = p.target.files) == null ? void 0 : J[0];
    if (!T) return;
    const L = new window.FileReader();
    L.onload = (H) => {
      var P, se, $e;
      try {
        const xe = JSON.parse(H.target.result);
        if (xe.width && xe.height) {
          const tt = fs.find((et) => et.w === xe.width && et.h === xe.height);
          tt && Ft(tt.id);
        } else if (xe.aspectRatio) {
          const tt = fs.find((et) => et.id === xe.aspectRatio);
          tt && Ft(tt.id);
        }
        let ye = null;
        Array.isArray(xe) ? ye = xe : xe.placements && Array.isArray(xe.placements) ? ye = xe.placements : (P = xe.layout) != null && P.placements && Array.isArray(xe.layout.placements) && (ye = xe.layout.placements), ye && ye.length > 0 && (ne(ye), dt(0), He("custom"), Ae.current = !0), (($e = (se = xe.timeline) == null ? void 0 : se.keyframes) == null ? void 0 : $e.length) > 0 && (un(xe.timeline), S && S(xe.timeline));
      } catch (xe) {
        console.error("Failed to parse imported canvas JSON:", xe), alert(`Canvas Import Error: ${xe.message}`);
      }
    }, L.readAsText(T), p.target.value = "";
  }, [ne, S]), Fi = (p, T) => {
    if (p.button !== 0) return;
    p.stopPropagation(), p.preventDefault(), dt(T), Ae.current = !0, He("custom");
    const L = oe(), J = ue.current || ut.current;
    if (!J) return;
    const H = J.getBoundingClientRect(), P = he[T];
    if (!P) return;
    ot.current = ss("Move Feed"), ae.current = {
      mode: "drag",
      index: T,
      startX: p.clientX,
      startY: p.clientY,
      initialX: P.x,
      initialY: P.y,
      initialW: P.width,
      initialH: P.height,
      scaleX: Ce / H.width,
      scaleY: Te / H.height,
      activeSnapZone: null
    }, Nt(!0);
    const se = (xe) => {
      if (!ae.current || ae.current.mode !== "drag") return;
      const ye = ae.current, tt = ue.current || ut.current;
      if (!tt) return;
      const et = tt.getBoundingClientRect(), nt = (xe.clientX - ye.startX) * ye.scaleX, pe = (xe.clientY - ye.startY) * ye.scaleY;
      let it = Math.round(ye.initialX + nt), It = Math.round(ye.initialY + pe);
      it = Wt(it, 0, Ce - ye.initialW), It = Wt(It, 0, Te - ye.initialH);
      const st = Ee && !xe.altKey;
      let ct = null, En = null, Wn = null;
      if (st) {
        const Tt = xe.clientX - et.left, wt = xe.clientY - et.top, Ct = 32, Re = Math.round(Ce / 2), at = Math.round(Te / 2);
        if (Tt <= Ct ? wt <= et.height * 0.22 ? ct = { x: 0, y: 0, width: Re, height: at, label: "◰ Top-Left Quarter" } : wt >= et.height * 0.78 ? ct = { x: 0, y: at, width: Re, height: at, label: "◱ Bottom-Left Quarter" } : ct = { x: 0, y: 0, width: Re, height: Te, label: "◧ Left Half (50%)" } : Tt >= et.width - Ct ? wt <= et.height * 0.22 ? ct = { x: Re, y: 0, width: Re, height: at, label: "◲ Top-Right Quarter" } : wt >= et.height * 0.78 ? ct = { x: Re, y: at, width: Re, height: at, label: "◳ Bottom-Right Quarter" } : ct = { x: Re, y: 0, width: Re, height: Te, label: "◨ Right Half (50%)" } : wt <= Ct && Tt >= et.width * 0.25 && Tt <= et.width * 0.75 && (ct = { x: 0, y: 0, width: Ce, height: Te, label: "🗖 Full Canvas Maximize" }), !ct) {
          const cr = he.filter((Ze, ur) => ur !== ye.index), Ps = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Ce, targetX: Ce - ye.initialW, guide: 100 },
            { snapTo: Re, targetX: Re - Math.round(ye.initialW / 2), guide: 50 }
          ];
          cr.forEach((Ze) => {
            Ps.push({ snapTo: Ze.x, targetX: Ze.x, guide: Ze.x / Ce * 100 }), Ps.push({ snapTo: Ze.x + Ze.width, targetX: Ze.x + Ze.width - ye.initialW, guide: (Ze.x + Ze.width) / Ce * 100 }), Ps.push({ snapTo: Ze.x + Ze.width, targetX: Ze.x + Ze.width, guide: (Ze.x + Ze.width) / Ce * 100 }), Ps.push({ snapTo: Ze.x, targetX: Ze.x - ye.initialW, guide: Ze.x / Ce * 100 });
          });
          let yu = 18;
          Ps.forEach((Ze) => {
            const ur = Math.abs(it - Ze.targetX);
            ur < yu && (yu = ur, it = Ze.targetX, En = Ze.guide);
          });
          const yl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Te, targetY: Te - ye.initialH, guide: 100 },
            { snapTo: at, targetY: at - Math.round(ye.initialH / 2), guide: 50 }
          ];
          cr.forEach((Ze) => {
            yl.push({ snapTo: Ze.y, targetY: Ze.y, guide: Ze.y / Te * 100 }), yl.push({ snapTo: Ze.y + Ze.height, targetY: Ze.y + Ze.height - ye.initialH, guide: (Ze.y + Ze.height) / Te * 100 }), yl.push({ snapTo: Ze.y + Ze.height, targetY: Ze.y + Ze.height, guide: (Ze.y + Ze.height) / Te * 100 }), yl.push({ snapTo: Ze.y, targetY: Ze.y - ye.initialH, guide: Ze.y / Te * 100 });
          });
          let vu = 18;
          yl.forEach((Ze) => {
            const ur = Math.abs(It - Ze.targetY);
            ur < vu && (vu = ur, It = Ze.targetY, Wn = Ze.guide);
          });
        }
      }
      ye.activeSnapZone = ct, ye.latestX = it, ye.latestY = It, ht(ct), pn({ vertical: En, horizontal: Wn }), un((Tt) => {
        const wt = [...Tt.keyframes || []], Ct = L < wt.length ? L : Zt;
        if (!wt[Ct]) return Tt;
        const Re = [...wt[Ct].layout.placements || []];
        return Re[ye.index] ? (Re[ye.index] = { ...Re[ye.index], x: it, y: It }, wt[Ct] = {
          ...wt[Ct],
          layout: { ...wt[Ct].layout, placements: Re }
        }, { ...Tt, keyframes: wt }) : Tt;
      });
    }, $e = () => {
      var xe;
      if (Nt(!1), pn({ vertical: null, horizontal: null }), (xe = ae.current) != null && xe.activeSnapZone) {
        const ye = ae.current.activeSnapZone, tt = ae.current.index;
        un((et) => {
          const nt = [...et.keyframes || []], pe = L < nt.length ? L : Zt;
          if (!nt[pe]) return et;
          const it = [...nt[pe].layout.placements || []];
          return it[tt] ? (it[tt] = {
            ...it[tt],
            x: ye.x,
            y: ye.y,
            width: ye.width,
            height: ye.height
          }, nt[pe] = {
            ...nt[pe],
            layout: { ...nt[pe].layout, placements: it }
          }, { ...et, keyframes: nt }) : et;
        });
      }
      if (ae.current) {
        const ye = ae.current, tt = ye.initialX, et = ye.initialY, nt = ye.activeSnapZone ? ye.activeSnapZone.x : ye.latestX ?? tt, pe = ye.activeSnapZone ? ye.activeSnapZone.y : ye.latestY ?? et;
        nt !== tt || pe !== et ? (O(), S && un((it) => (S(it), it))) : ot.current = null;
      }
      ht(null), ae.current = null, window.removeEventListener("mousemove", se), window.removeEventListener("mouseup", $e);
    };
    window.addEventListener("mousemove", se), window.addEventListener("mouseup", $e);
  }, mo = (p, T, L = "br") => {
    if (p.button !== 0) return;
    p.stopPropagation(), p.preventDefault(), dt(T), Ae.current = !0, He("custom");
    const J = oe();
    if (!ut.current) return;
    const H = ut.current.getBoundingClientRect(), P = he[T];
    if (!P) return;
    ot.current = ss("Resize Feed");
    const se = jt.find((nt) => nt.stationId === P.stationId && nt.displayId === P.displayId), $e = P.sourceWidth || (se == null ? void 0 : se.sourceWidth) || 1920, xe = P.sourceHeight || (se == null ? void 0 : se.sourceHeight) || 1080, ye = P.nativeAspectRatio || P.aspectRatio || (se == null ? void 0 : se.nativeAspectRatio) || $e / xe || P.width / P.height || 16 / 9;
    ae.current = {
      mode: "resize",
      corner: L,
      index: T,
      startX: p.clientX,
      startY: p.clientY,
      initialX: P.x,
      initialY: P.y,
      initialW: P.width,
      initialH: P.height,
      sourceWidth: $e,
      sourceHeight: xe,
      nativeAspectRatio: ye,
      scaleX: Ce / H.width,
      scaleY: Te / H.height
    }, gt(!0);
    const tt = (nt) => {
      if (!ae.current || ae.current.mode !== "resize") return;
      const pe = ae.current, it = (nt.clientX - pe.startX) * pe.scaleX, It = (nt.clientY - pe.startY) * pe.scaleY, st = nt.ctrlKey || nt.shiftKey || nt.metaKey, ct = pe.nativeAspectRatio > 0 ? pe.nativeAspectRatio : pe.initialW / pe.initialH;
      let En = pe.initialX, Wn = pe.initialY, Tt = pe.initialW, wt = pe.initialH;
      if (pe.corner === "br") {
        const Ct = Ce - pe.initialX, Re = Te - pe.initialY;
        if (st) {
          let at = Math.max(160, Math.min(Ct, Math.round(pe.initialW + it))), rt = Math.round(at / ct);
          rt > Re && (rt = Re, at = Math.round(rt * ct)), rt < 90 && (rt = 90, at = Math.round(rt * ct)), Tt = at, wt = rt;
        } else
          Tt = Wt(Math.round(pe.initialW + it), 160, Ct), wt = Wt(Math.round(pe.initialH + It), 90, Re);
      } else if (pe.corner === "bl") {
        const Ct = pe.initialX + pe.initialW, Re = Te - pe.initialY;
        if (st) {
          let at = Math.max(160, Math.min(Ct, Math.round(pe.initialW - it))), rt = Math.round(at / ct);
          rt > Re && (rt = Re, at = Math.round(rt * ct)), rt < 90 && (rt = 90, at = Math.round(rt * ct)), Tt = at, wt = rt, En = pe.initialX + pe.initialW - Tt;
        } else
          Tt = Wt(Math.round(pe.initialW - it), 160, Ct), wt = Wt(Math.round(pe.initialH + It), 90, Re), En = pe.initialX + pe.initialW - Tt;
      } else if (pe.corner === "tr") {
        const Ct = Ce - pe.initialX, Re = pe.initialY + pe.initialH;
        if (st) {
          let at = Math.max(160, Math.min(Ct, Math.round(pe.initialW + it))), rt = Math.round(at / ct);
          rt > Re && (rt = Re, at = Math.round(rt * ct)), rt < 90 && (rt = 90, at = Math.round(rt * ct)), Tt = at, wt = rt, Wn = pe.initialY + pe.initialH - wt;
        } else
          Tt = Wt(Math.round(pe.initialW + it), 160, Ct), wt = Wt(Math.round(pe.initialH - It), 90, Re), Wn = pe.initialY + pe.initialH - wt;
      } else if (pe.corner === "tl") {
        const Ct = pe.initialX + pe.initialW, Re = pe.initialY + pe.initialH;
        if (st) {
          let at = Math.max(160, Math.min(Ct, Math.round(pe.initialW - it))), rt = Math.round(at / ct);
          rt > Re && (rt = Re, at = Math.round(rt * ct)), rt < 90 && (rt = 90, at = Math.round(rt * ct)), Tt = at, wt = rt, En = pe.initialX + pe.initialW - Tt, Wn = pe.initialY + pe.initialH - wt;
        } else
          Tt = Wt(Math.round(pe.initialW - it), 160, Ct), wt = Wt(Math.round(pe.initialH - It), 90, Re), En = pe.initialX + pe.initialW - Tt, Wn = pe.initialY + pe.initialH - wt;
      }
      un((Ct) => {
        const Re = [...Ct.keyframes || []], at = J < Re.length ? J : Zt;
        if (!Re[at]) return Ct;
        const rt = [...Re[at].layout.placements || []];
        return rt[pe.index] ? (rt[pe.index] = {
          ...rt[pe.index],
          x: En,
          y: Wn,
          width: Tt,
          height: wt,
          sourceWidth: pe.sourceWidth,
          sourceHeight: pe.sourceHeight,
          nativeAspectRatio: pe.nativeAspectRatio,
          aspectRatio: pe.nativeAspectRatio
        }, Re[at] = {
          ...Re[at],
          layout: { ...Re[at].layout, placements: rt }
        }, { ...Ct, keyframes: Re }) : Ct;
      });
    }, et = () => {
      if (ae.current) {
        const nt = ae.current, pe = nt.latestW ?? nt.initialW, it = nt.latestH ?? nt.initialH;
        pe !== nt.initialW || it !== nt.initialH ? (O(), S && un((It) => (S(It), It))) : ot.current = null;
      }
      gt(!1), ae.current = null, window.removeEventListener("mousemove", tt), window.removeEventListener("mouseup", et);
    };
    window.addEventListener("mousemove", tt), window.addEventListener("mouseup", et);
  }, kp = u.useCallback((p) => {
    const T = he[p];
    if (!T) return;
    const L = jt.find(($e) => $e.stationId === T.stationId && $e.displayId === T.displayId), J = T.nativeAspectRatio || T.aspectRatio || (L == null ? void 0 : L.nativeAspectRatio) || (T.sourceWidth && T.sourceHeight ? T.sourceWidth / T.sourceHeight : 16 / 9);
    let H = T.width, P = Math.round(H / J);
    T.y + P > Te && (P = Te - T.y, H = Math.round(P * J)), T.x + H > Ce && (H = Ce - T.x, P = Math.round(H / J));
    const se = he.map(($e, xe) => xe === p ? {
      ...$e,
      width: Math.max(160, H),
      height: Math.max(90, P),
      sourceWidth: T.sourceWidth || (L == null ? void 0 : L.sourceWidth) || 1920,
      sourceHeight: T.sourceHeight || (L == null ? void 0 : L.sourceHeight) || 1080,
      nativeAspectRatio: J,
      aspectRatio: J
    } : $e);
    ne(se, "Snap Native Aspect");
  }, [he, jt, ne]), Bi = u.useCallback(() => {
    if (Je.current.length === 0) return;
    const p = ss("Redo State");
    Ve.current.push(p), Ve.current.length > 50 && Ve.current.shift();
    const T = Je.current.pop();
    T && (un(T.timeline), S && S(T.timeline), T.aspectId && T.aspectId !== Rt && Ft(T.aspectId), T.presetId && He(T.presetId), T.selectedFeedIndex !== void 0 && dt(T.selectedFeedIndex), Ae.current = !0, Mt((L) => L + 1), Gt(`Undo: ${T.label || "Previous State"}`, "undo", "↺"));
  }, [ss, S, Rt, Gt]), Ui = u.useCallback(() => {
    if (Ve.current.length === 0) return;
    const p = ss("Undo State");
    Je.current.push(p), Je.current.length > 50 && Je.current.shift();
    const T = Ve.current.pop();
    T && (un(T.timeline), S && S(T.timeline), T.aspectId && T.aspectId !== Rt && Ft(T.aspectId), T.presetId && He(T.presetId), T.selectedFeedIndex !== void 0 && dt(T.selectedFeedIndex), Ae.current = !0, Mt((L) => L + 1), Gt(`Redo: ${T.label || "Restored State"}`, "info", "↻"));
  }, [ss, S, Rt, Gt]), Wi = u.useCallback(() => {
    const T = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(he)),
      keyframes: JSON.parse(JSON.stringify(nn)),
      aspectId: Rt,
      width: Ce,
      height: Te
    }, ...Ne.filter((L) => L.id !== "preset-quicksave")];
    Ie(T);
    try {
      op({
        canvasLayoutTimeline: cn,
        selectedAspectId: Rt,
        selectedPresetId: Ke,
        isFullWidth: jn
      });
    } catch (L) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", L);
    }
    Gt(`State Saved (${Ce}×${Te} • ${he.length} Feeds)`, "success", "💾");
  }, [he, nn, Rt, Ce, Te, Ne, Ie, cn, Ke, jn, Gt]);
  u.useEffect(() => {
    const p = () => Bi(), T = () => Ui(), L = () => Wi();
    return window.addEventListener("itb:studio-undo", p), window.addEventListener("itb:studio-redo", T), window.addEventListener("itb:studio-save-now", L), () => {
      window.removeEventListener("itb:studio-undo", p), window.removeEventListener("itb:studio-redo", T), window.removeEventListener("itb:studio-save-now", L);
    };
  }, [Bi, Ui, Wi]);
  const wp = u.useCallback(() => {
    Be((p) => {
      const T = !p;
      if (T) {
        r && r(null);
        const L = je.current;
        L && L.requestFullscreen && L.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return T;
    });
  }, [r]), pu = u.useCallback(() => {
    const p = f > 0 ? f : d + y, { nextTimeline: T, newIndex: L, isNew: J } = Rd(
      cn,
      p,
      (rn == null ? void 0 : rn.layout) || {
        width: Ce,
        height: Te,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(he))
      }
    );
    J ? (Un("Add Keyframe"), un(T), S && S(T), F && F(L), Gt(`Keyframe #${L + 1} created at ${qe(p, m, { includeSeconds: !0 })}`, "success", "💎")) : (F && F(L), Gt(`Jumped to existing Keyframe #${L + 1}`, "info", "💎"));
  }, [f, d, y, rn, he, Ce, Te, cn, S, F, m, Gt, Un]), jp = u.useCallback(() => {
    if (nn.length <= 1 || Zt === 0) {
      Gt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Un("Delete Keyframe");
    const { nextTimeline: p, success: T, newIndex: L } = jg(cn, Zt);
    T && (un(p), S && S(p), F && F(L), Gt("Keyframe deleted", "info", "🗑️"));
  }, [nn, Zt, cn, S, F, Gt, Un]), Ep = u.useCallback((p) => {
    Zt !== 0 && (Un("Update Transition Type"), un((T) => {
      const L = $d(T, Zt, { transitionType: p });
      return S && S(L), L;
    }));
  }, [Zt, S, Un]), Cp = u.useCallback((p) => {
    Zt !== 0 && (Un("Update Transition Duration"), un((T) => {
      const L = $d(T, Zt, { transitionDurationSec: p });
      return S && S(L), L;
    }));
  }, [Zt, S, Un]);
  u.useEffect(() => {
    const p = (T) => {
      if (!(T.target.tagName === "INPUT" || T.target.tagName === "TEXTAREA" || T.target.isContentEditable)) {
        if (T.key === "Delete" || T.key === "Backspace") {
          Pe >= 0 && he[Pe] && (T.preventDefault(), Le(Pe));
          return;
        }
        if ((T.code === "Space" || T.key === " ") && w) {
          T.preventDefault(), w((L) => !L);
          return;
        }
        if ((T.key === "k" || T.key === "K") && !T.ctrlKey && !T.metaKey && !T.altKey) {
          T.preventDefault(), pu();
          return;
        }
        if (T.key === "Escape") {
          Y(!1), _e(!1), bt(!1), ns(!1), Ut(!1), ie(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(T.key)) {
          if (Pe >= 0 && he[Pe]) {
            T.preventDefault(), Ae.current = !0, He("custom");
            const L = T.shiftKey ? 1 : 10;
            let J = 0, H = 0;
            T.key === "ArrowLeft" && (J = -L), T.key === "ArrowRight" && (J = L), T.key === "ArrowUp" && (H = -L), T.key === "ArrowDown" && (H = L);
            const P = he[Pe], se = Wt(P.x + J, 0, Ce - P.width), $e = Wt(P.y + H, 0, Te - P.height), xe = he.map((ye, tt) => tt === Pe ? { ...ye, x: se, y: $e } : ye);
            ne(xe);
          }
          return;
        }
        if ((T.key === "r" || T.key === "R") && !T.ctrlKey && !T.metaKey && !T.altKey) {
          T.preventDefault(), wn((L) => !L);
          return;
        }
        if ((T.key === "s" || T.key === "S") && !T.ctrlKey && !T.metaKey && !T.altKey) {
          T.preventDefault(), Se((L) => !L);
          return;
        }
      }
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [Pe, he, Le, ne, wn, Se]);
  const mu = u.useMemo(() => kg({
    keyframes: nn,
    currentEpochMs: R,
    currentPlacements: he,
    isEditing: ge || Qe
  }), [ge, Qe, nn, R, he]), Sp = u.useMemo(() => mu.map((p, T) => ({ ...p, originalIndex: T })).sort((p, T) => (p.zIndex ?? p.originalIndex) - (T.zIndex ?? T.originalIndex)), [mu]), Os = he[Pe] || null, { filteredPlaced: Ds, filteredUnplaced: go } = u.useMemo(() => {
    const p = (me || "").toLowerCase(), T = he.map((P, se) => {
      const $e = P.zIndex ?? se + 1, xe = jt.find((ye) => ye.stationId === P.stationId && ye.displayId === P.displayId);
      return {
        type: "placed",
        origIdx: se,
        placement: P,
        feed: xe,
        stationId: P.stationId,
        displayId: P.displayId,
        label: P.label || (xe == null ? void 0 : xe.label) || `${P.stationId} (${P.displayId})`,
        layerRank: $e,
        isSelected: se === Pe,
        sourceWidth: P.sourceWidth || (xe == null ? void 0 : xe.sourceWidth) || 1920,
        sourceHeight: P.sourceHeight || (xe == null ? void 0 : xe.sourceHeight) || 1080
      };
    });
    T.sort((P, se) => se.layerRank - P.layerRank);
    const L = jt.filter((P) => !he.some((se) => se.stationId === P.stationId && se.displayId === P.displayId)).map((P) => ({
      type: "unplaced",
      feed: P,
      stationId: P.stationId,
      displayId: P.displayId,
      label: P.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: P.sourceWidth || 1920,
      sourceHeight: P.sourceHeight || 1080
    })), J = p ? T.filter((P) => P.label.toLowerCase().includes(p)) : T, H = p ? L.filter((P) => P.label.toLowerCase().includes(p)) : L;
    return { filteredPlaced: J, filteredUnplaced: H };
  }, [he, jt, Pe, me]), gu = u.useCallback((p, T) => {
    p.stopPropagation(), te(T), p.dataTransfer.effectAllowed = "copyMove", p.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: T.origIdx,
      type: T.type,
      stationId: T.stationId,
      displayId: T.displayId
    }));
  }, []), bp = u.useCallback((p, T) => {
    p.preventDefault(), p.stopPropagation(), p.dataTransfer.dropEffect = "move";
    const L = p.currentTarget.getBoundingClientRect(), J = L.top + L.height / 2, H = p.clientY < J ? "above" : "below";
    be((P) => P.index === T && P.position === H ? P : { index: T, position: H });
  }, []), Mp = u.useCallback((p, T) => {
    p.stopPropagation(), be((L) => L.index === T ? { index: null, position: null } : L);
  }, []), xu = u.useCallback(() => {
    te(null), be({ index: null, position: null });
  }, []), Tp = u.useCallback((p, T) => {
    p.preventDefault(), p.stopPropagation();
    const L = de;
    be({ index: null, position: null }), te(null);
    const J = p.dataTransfer.getData("text/plain");
    if (J)
      try {
        const H = JSON.parse(J);
        if (H.type === "placed") {
          const P = H.origIdx, se = Ds.findIndex((nt) => nt.origIdx === P);
          if (se === -1) return;
          let $e = T;
          if (L.position === "below" && ($e += 1), se < $e && ($e -= 1), se === $e) return;
          const xe = [...Ds], [ye] = xe.splice(se, 1);
          xe.splice($e, 0, ye);
          const tt = xe.length, et = he.map((nt, pe) => {
            const it = xe.findIndex((It) => It.origIdx === pe);
            return it !== -1 ? {
              ...nt,
              zIndex: tt - it
            } : nt;
          });
          ne(et), dt(ye.origIdx);
        } else if (H.type === "unplaced") {
          const P = jt.find((ct) => ct.stationId === H.stationId && ct.displayId === H.displayId);
          if (!P) return;
          const se = P.nativeAspectRatio || (P.sourceWidth && P.sourceHeight ? P.sourceWidth / P.sourceHeight : 16 / 9), $e = se >= 1 ? 640 : Math.round(360 * se), xe = se >= 1 ? Math.round(640 / se) : 360, ye = pt[he.length % pt.length];
          let tt = T;
          L.position === "below" && (tt += 1);
          const et = {
            stationId: P.stationId,
            displayId: P.displayId,
            label: P.label,
            x: 100 + he.length * 40 % 800,
            y: 80 + he.length * 40 % 500,
            width: $e,
            height: xe,
            sourceWidth: P.sourceWidth || 1920,
            sourceHeight: P.sourceHeight || 1080,
            nativeAspectRatio: se,
            aspectRatio: se,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: ye,
            shadowEffect: "deep",
            borderRadius: 0
          }, nt = [...he, et], pe = nt.length - 1, it = [...Ds];
          it.splice(tt, 0, { origIdx: pe });
          const It = it.length, st = nt.map((ct, En) => {
            const Wn = it.findIndex((Tt) => Tt.origIdx === En);
            return {
              ...ct,
              zIndex: Wn !== -1 ? It - Wn : 1
            };
          });
          ne(st), dt(pe);
        }
      } catch (H) {
        console.warn("Failed to handle layer drag drop:", H);
      }
  }, [de, Ds, he, jt, ne]), Ip = u.useCallback((p) => {
    p.preventDefault();
    const T = p.dataTransfer.getData("text/plain");
    if (!(!T || !ut.current))
      try {
        const L = JSON.parse(T), J = ut.current.getBoundingClientRect(), H = p.clientX - J.left, P = p.clientY - J.top, se = Wt(Math.round(H / J.width * Ce), 0, Ce - 320), $e = Wt(Math.round(P / J.height * Te), 0, Te - 180);
        if (L.type === "unplaced") {
          const xe = jt.find((ye) => ye.stationId === L.stationId && ye.displayId === L.displayId);
          if (xe) {
            const ye = xe.nativeAspectRatio || (xe.sourceWidth && xe.sourceHeight ? xe.sourceWidth / xe.sourceHeight : 1.7777777777777777), tt = ye >= 1 ? 640 : Math.round(360 * ye), et = ye >= 1 ? Math.round(640 / ye) : 360, nt = he.length > 0 ? Math.max(...he.map((st) => st.zIndex || 0)) + 1 : 1, pe = pt[he.length % pt.length], it = {
              stationId: xe.stationId,
              displayId: xe.displayId,
              label: xe.label,
              x: Wt(se, 0, Ce - tt),
              y: Wt($e, 0, Te - et),
              width: tt,
              height: et,
              sourceWidth: xe.sourceWidth || 1920,
              sourceHeight: xe.sourceHeight || 1080,
              nativeAspectRatio: ye,
              aspectRatio: ye,
              zIndex: nt,
              rotation: 0,
              borderWidth: 2,
              borderColor: pe,
              shadowEffect: "deep",
              borderRadius: 0
            }, It = [...he, it];
            ne(It), dt(It.length - 1);
          }
        } else if (L.type === "placed" && L.origIdx !== void 0) {
          const xe = he.map((ye, tt) => tt === L.origIdx ? {
            ...ye,
            x: Wt(se, 0, Ce - ye.width),
            y: Wt($e, 0, Te - ye.height)
          } : ye);
          ne(xe), dt(L.origIdx);
        }
      } catch (L) {
        console.warn("Canvas drop failed:", L);
      }
  }, [jt, he, ne, Ce, Te]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: je,
      className: `multicam-viewport-root canvas-grid ${ce ? "fullscreen-grid-active" : ""}`,
      children: [
        (ge || Qe) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: ge ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        /* @__PURE__ */ s.jsxs("div", { className: "multicam-composition-mode-bar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "comp-mode-left", children: [
            /* @__PURE__ */ s.jsx("span", { className: "comp-icon", children: "🎛️" }),
            /* @__PURE__ */ s.jsx("span", { className: "comp-title", children: "LIVE CANVAS COMPOSER:" }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-comp-action ${q ? "active" : ""}`,
                onClick: () => Y((p) => !p),
                title: "Toggle Feeds Inventory & Layers Manager",
                children: [
                  "🗂️ FEEDS & LAYERS (",
                  he.length,
                  "/",
                  jt.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "comp-pill-group layouts", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-comp-tab ${Ke === "auto-grid" ? "active" : ""}`,
                  onClick: () => {
                    He("auto-grid"), Ot("auto-grid");
                  },
                  title: "Auto-Grid: Neatly arrange all available stations & displays",
                  children: [
                    "⊞ AUTO-GRID (",
                    jt.length,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-comp-tab ${Ke === "1x1" ? "active" : ""}`,
                  onClick: () => {
                    He("1x1"), Ot("1x1");
                  },
                  title: "Single Feed (1x1 Focus Frame)",
                  children: "⊞ 1x1"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-comp-tab ${Ke === "1x2" ? "active" : ""}`,
                  onClick: () => {
                    He("1x2"), Ot("1x2");
                  },
                  title: "Side-by-Side Dual Feeds (1x2 Dual)",
                  children: "⊞ 1x2 DUAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-comp-tab ${Ke === "2x2" ? "active" : ""}`,
                  onClick: () => {
                    He("2x2"), Ot("2x2");
                  },
                  title: "2x2 Quad Feeds Master Frame",
                  children: "⊞ 2x2 QUAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-comp-tab ${Ke === "1+3-pip" ? "active" : ""}`,
                  onClick: () => {
                    He("1+3-pip"), Ot("1+3-pip");
                  },
                  title: "Picture-in-Picture: 1 Full Master + 3 Insets",
                  children: "⊞ 1+3 PIP"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-comp-tab ${Ke === "hero-stacked" ? "active" : ""}`,
                  onClick: () => {
                    He("hero-stacked"), Ot("hero-stacked");
                  },
                  title: "Hero Main + 2 Stacked Displays",
                  children: "⊞ HERO+2"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-comp-action reset",
                  onClick: () => {
                    Ae.current = !1, He("auto-grid");
                    const p = Or(jt, Ce, Te), T = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: Ce,
                            height: Te,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: p
                          }
                        }
                      ]
                    };
                    un(T), S && S(T), dt(0);
                  },
                  title: "Restart Canvas: Reset to default AUTO-GRID with all screens",
                  children: "↺ RESET CANVAS"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-comp-tab clear",
                  onClick: Ge,
                  title: "Clear Canvas: Start fresh with an empty canvas",
                  children: "🗑️ CLEAR"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "comp-pill-group keyframe-inspector-group", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "kf-inspector-badge", title: `Active Keyframe #${Zt + 1} of ${nn.length} on canvas timeline`, children: [
                "💎 KF #",
                Zt + 1,
                "/",
                nn.length
              ] }),
              Zt > 0 && /* @__PURE__ */ s.jsxs("div", { className: "kf-transition-controls", children: [
                /* @__PURE__ */ s.jsx("span", { className: "trans-label", children: "TRANSITION:" }),
                /* @__PURE__ */ s.jsxs(
                  "select",
                  {
                    className: "select-trans-type",
                    value: rn.transitionType || "smooth",
                    onChange: (p) => Ep(p.target.value),
                    title: "Transition animation type into this keyframe",
                    children: [
                      /* @__PURE__ */ s.jsx("option", { value: "smooth", children: "⚡ Smooth" }),
                      /* @__PURE__ */ s.jsx("option", { value: "linear", children: "↗ Linear" }),
                      /* @__PURE__ */ s.jsx("option", { value: "cut", children: "✂ Cut" })
                    ]
                  }
                ),
                /* @__PURE__ */ s.jsxs(
                  "select",
                  {
                    className: "select-trans-duration",
                    value: rn.transitionDurationSec ?? 0.5,
                    onChange: (p) => Cp(parseFloat(p.target.value)),
                    title: "Transition duration (seconds)",
                    children: [
                      /* @__PURE__ */ s.jsx("option", { value: "0.2", children: "0.2s" }),
                      /* @__PURE__ */ s.jsx("option", { value: "0.3", children: "0.3s" }),
                      /* @__PURE__ */ s.jsx("option", { value: "0.5", children: "0.5s" }),
                      /* @__PURE__ */ s.jsx("option", { value: "0.75", children: "0.75s" }),
                      /* @__PURE__ */ s.jsx("option", { value: "1.0", children: "1.0s" }),
                      /* @__PURE__ */ s.jsx("option", { value: "1.5", children: "1.5s" }),
                      /* @__PURE__ */ s.jsx("option", { value: "2.0", children: "2.0s" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-add-kf-canvas",
                  onClick: pu,
                  title: "Add Keyframe at current playhead position (or press K)",
                  children: "＋ KF"
                }
              ),
              nn.length > 1 && Zt > 0 && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-del-kf-canvas",
                  onClick: jp,
                  title: "Delete active keyframe",
                  children: "🗑️"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "comp-pill-group aspect-group", children: [
              /* @__PURE__ */ s.jsx("span", { className: "aspect-label", children: "📐 EXPORT ASPECT:" }),
              /* @__PURE__ */ s.jsx(
                "select",
                {
                  className: "select-aspect-ratio",
                  value: Rt,
                  onChange: (p) => ze(p.target.value),
                  title: "Set Export Master Aspect Ratio (WYSIWYG Target)",
                  children: fs.map((p) => /* @__PURE__ */ s.jsxs("option", { value: p.id, children: [
                    p.label,
                    " (",
                    p.w,
                    "×",
                    p.h,
                    ")"
                  ] }, p.id))
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-width-mode ${jn ? "is-full" : "is-fit"}`,
                  onClick: Tr,
                  title: jn ? "Full Screen Width (100% Width) - Click for FIT PAGE" : "Fit Page - Click for 100% Full Width",
                  children: jn ? "↔ 100% WIDTH" : "⊞ FIT PAGE"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-ruler-toggle ${en ? "is-active" : ""}`,
                onClick: () => wn((p) => !p),
                title: en ? "Precision Rulers: ON (Press R to toggle)" : "Precision Rulers: OFF (Press R to toggle)",
                children: [
                  "📏 RULERS: ",
                  en ? "ON" : "OFF"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-snap-toggle ${Ee ? "is-active" : ""}`,
                onClick: () => Se((p) => !p),
                title: Ee ? "Windows Snap & Smart Guides: ON (Press S to toggle, hold Alt to bypass)" : "Windows Snap & Smart Guides: OFF (Press S to toggle)",
                children: [
                  "🧲 SNAP: ",
                  Ee ? "ON" : "OFF"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "comp-mode-right", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-comp-action save",
                onClick: () => ie(!0),
                title: "Save current canvas placement layout for future edits",
                children: "💾 SAVE PRESET"
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "saved-presets-dropdown-wrapper", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-comp-action ${ke ? "active" : ""}`,
                  onClick: () => _e((p) => !p),
                  title: "Load a saved custom layout preset",
                  children: [
                    "📁 SAVED PRESETS (",
                    Ne.length,
                    ") ▾"
                  ]
                }
              ),
              ke && /* @__PURE__ */ s.jsxs("div", { className: "saved-presets-menu-popover", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "popover-header", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "SAVED CANVAS PRESETS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => _e(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Ne.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: 'No saved custom presets yet. Arrange your canvas and click "SAVE PRESET"!' }) : Ne.map((p) => {
                  var T;
                  return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => ar(p), children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: p.name }),
                      /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                        ((T = p.placements) == null ? void 0 : T.length) || 0,
                        " screens • ",
                        p.dateStr
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-del-preset",
                        onClick: (L) => yp(p.id, L),
                        title: "Delete saved preset",
                        children: "🗑️"
                      }
                    )
                  ] }, p.id);
                }) })
              ] })
            ] }),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-comp-action undo",
                onClick: Bi,
                disabled: Je.current.length === 0,
                title: "Undo Canvas Action (CTRL+Z)",
                children: "↺ UNDO (Ctrl+Z)"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-comp-action redo",
                onClick: Ui,
                disabled: Ve.current.length === 0,
                title: "Redo Canvas Action (CTRL+Y)",
                children: "↻ REDO (Ctrl+Y)"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-comp-action save",
                onClick: Wi,
                title: "Save State (CTRL+S)",
                children: "💾 SAVE (Ctrl+S)"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-comp-action",
                onClick: vp,
                title: "Download/Export current canvas layout as a .json file",
                children: "📤 EXPORT CANVAS"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-comp-action",
                onClick: () => {
                  var p;
                  return (p = Xe.current) == null ? void 0 : p.click();
                },
                title: "Import/Load a canvas layout from a saved .json file",
                children: "📥 IMPORT CANVAS"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                ref: Xe,
                type: "file",
                accept: ".json",
                style: { display: "none" },
                onChange: Np
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-grid-fullscreen-top ${ce ? "active" : ""}`,
                onClick: wp,
                title: "Fullscreen Multi-Station Grid (F)",
                children: ce ? "⤓ EXIT FULLSCREEN" : "⛶ FULLSCREEN GRID"
              }
            )
          ] })
        ] }),
        Jt && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Jt.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Jt.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Jt.text })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { ref: Ue, className: `canvas-stage-wrapper ${jn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          q && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  he.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Y(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: me,
                onChange: (p) => we(p.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Ds.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Ds.length })
                ] }),
                Ds.map((p, T) => {
                  const L = re && re.type === "placed" && re.origIdx === p.origIdx, H = de.index === T ? de.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${p.isSelected ? "is-selected" : ""} ${L ? "is-dragging-row" : ""} ${H}`,
                      draggable: !0,
                      onDragStart: (P) => gu(P, p),
                      onDragOver: (P) => bp(P, T),
                      onDragLeave: (P) => Mp(P, T),
                      onDrop: (P) => Tp(P, T),
                      onDragEnd: xu,
                      onClick: () => dt(p.origIdx),
                      title: `Drag to reorder layer (${p.label})`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                        /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${p.layerRank}`, children: [
                          "#",
                          p.layerRank
                        ] }),
                        /* @__PURE__ */ s.jsx("span", { className: `status-dot ${p.isSelected ? "active" : ""}` }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: p.label, children: p.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          p.sourceWidth,
                          "×",
                          p.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (P) => P.stopPropagation(), children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Et(p.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Lt(p.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => Le(p.origIdx),
                              title: "Remove from canvas",
                              children: "✕"
                            }
                          )
                        ] })
                      ]
                    },
                    `feed-layer-${p.stationId}-${p.displayId}-${p.origIdx}`
                  );
                })
              ] }),
              go.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: go.length })
                ] }),
                go.map((p) => {
                  const T = re && re.type === "unplaced" && re.stationId === p.stationId && re.displayId === p.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${T ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (L) => gu(L, p),
                      onDragEnd: xu,
                      onClick: () => Fe(p.feed),
                      title: `Drag onto canvas or layers, or click to add ${p.label}`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                        /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                        /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: p.label, children: p.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          p.sourceWidth,
                          "×",
                          p.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (L) => L.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-add-row",
                            onClick: () => Fe(p.feed),
                            title: "Add to canvas",
                            children: "＋ ADD"
                          }
                        ) })
                      ]
                    },
                    `unplaced-feed-${p.stationId}-${p.displayId}`
                  );
                })
              ] }),
              Ds.length === 0 && go.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Ot("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: Ge, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs(
            "div",
            {
              ref: (p) => {
                ut.current = p, ue.current = p;
              },
              className: `canvas-master-frame-16-9 ${jn ? "is-full-width" : "is-fit-stage"}`,
              style: {
                width: xt.width > 180 ? `${xt.width}px` : "100%",
                height: xt.height > 100 ? `${xt.height}px` : "auto",
                aspectRatio: `${Ce} / ${Te}`
              },
              onMouseMove: xl,
              onMouseLeave: Ar,
              onDragOver: (p) => {
                p.preventDefault(), p.dataTransfer.dropEffect = "copy";
              },
              onDrop: Ip,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                We && /* @__PURE__ */ s.jsx(
                  "div",
                  {
                    className: "canvas-snap-ghost-preview",
                    style: {
                      position: "absolute",
                      left: `${We.x / Ce * 100}%`,
                      top: `${We.y / Te * 100}%`,
                      width: `${We.width / Ce * 100}%`,
                      height: `${We.height / Te * 100}%`,
                      zIndex: 9990,
                      pointerEvents: "none"
                    },
                    children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                      /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: We.label })
                    ] })
                  }
                ),
                en && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Ce}×${Te}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: kt.isInside ? `${kt.x},${kt.y}` : "px" }) }),
                  /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                    "svg",
                    {
                      className: "canvas-ruler-svg-x",
                      viewBox: `0 0 ${Ce} 20`,
                      preserveAspectRatio: "none",
                      children: [
                        Os && /* @__PURE__ */ s.jsx(
                          "rect",
                          {
                            x: Os.x,
                            y: "0",
                            width: Os.width,
                            height: "20",
                            fill: "rgba(6, 182, 212, 0.25)",
                            stroke: "#06B6D4",
                            strokeWidth: "1"
                          }
                        ),
                        gl.map((p) => p.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                          /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "0", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                          /* @__PURE__ */ s.jsx("text", { x: p.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: p.val })
                        ] }, `rx-${p.val}`) : p.isMed ? /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "8", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${p.val}`) : /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "13", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${p.val}`)),
                        kt.isInside && /* @__PURE__ */ s.jsx(
                          "line",
                          {
                            x1: kt.x,
                            y1: "0",
                            x2: kt.x,
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
                      viewBox: `0 0 20 ${Te}`,
                      preserveAspectRatio: "none",
                      children: [
                        Os && /* @__PURE__ */ s.jsx(
                          "rect",
                          {
                            x: "0",
                            y: Os.y,
                            width: "20",
                            height: Os.height,
                            fill: "rgba(6, 182, 212, 0.25)",
                            stroke: "#06B6D4",
                            strokeWidth: "1"
                          }
                        ),
                        Ir.map((p) => p.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                          /* @__PURE__ */ s.jsx("line", { x1: "0", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                          /* @__PURE__ */ s.jsx("text", { x: "2", y: p.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: p.val })
                        ] }, `ry-${p.val}`) : p.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${p.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${p.val}`)),
                        kt.isInside && /* @__PURE__ */ s.jsx(
                          "line",
                          {
                            x1: "0",
                            y1: kt.y,
                            x2: "20",
                            y2: kt.y,
                            stroke: "#06B6D4",
                            strokeWidth: "2"
                          }
                        )
                      ]
                    }
                  ) })
                ] }),
                fn.vertical !== null && /* @__PURE__ */ s.jsx(
                  "div",
                  {
                    className: "canvas-snap-guide-v",
                    style: {
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: `${fn.vertical}%`,
                      width: "2px",
                      background: "#06B6D4",
                      boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                      zIndex: 9999,
                      pointerEvents: "none"
                    }
                  }
                ),
                fn.horizontal !== null && /* @__PURE__ */ s.jsx(
                  "div",
                  {
                    className: "canvas-snap-guide-h",
                    style: {
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: `${fn.horizontal}%`,
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
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Y(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Ot("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                  ] })
                ] }),
                Sp.map((p) => {
                  var Ct;
                  const T = p.originalIndex, L = Pe === T, J = ge && Pe === T, H = Qe && Pe === T, P = (n.length > 0 ? n : t).find(
                    (Re) => {
                      var at, rt, cr, Ps;
                      return Re.id === p.stationId || ((at = Re.hostname) == null ? void 0 : at.toLowerCase()) === ((rt = p.stationId) == null ? void 0 : rt.toLowerCase()) || ((cr = Re.id) == null ? void 0 : cr.toLowerCase()) === ((Ps = p.stationId) == null ? void 0 : Ps.toLowerCase());
                    }
                  ), se = jt.find((Re) => Re.stationId === p.stationId && Re.displayId === p.displayId), $e = P || {
                    id: p.stationId,
                    hostname: (se == null ? void 0 : se.stationHostname) || p.stationHostname || p.stationId,
                    displayName: (se == null ? void 0 : se.stationName) || p.label || p.stationId,
                    displays: se ? [{ displayId: se.displayId, width: se.sourceWidth, height: se.sourceHeight }] : []
                  }, xe = ($e == null ? void 0 : $e.displays) || ((Ct = $e == null ? void 0 : $e.topology) == null ? void 0 : Ct.displays) || [], ye = he.filter(
                    (Re) => Re.stationId === p.stationId || $e && (Re.stationId === $e.id || Re.stationId === $e.hostname)
                  ), tt = xe.length > 1 && ye.length >= xe.length, et = p.borderColor || pt[T % pt.length], nt = p.borderWidth !== void 0 ? p.borderWidth : 2, pe = p.rotation || 0, it = p.shadowEffect || "deep", It = p.borderRadius || 0, st = p.x / Ce * 100, ct = p.y / Te * 100, En = p.width / Ce * 100, Wn = p.height / Te * 100, Tt = Sg(it, L, et);
                  p.y < 50, p.x < 100, p.x + p.width > Ce - 100;
                  const wt = p.zIndex !== void 0 ? p.zIndex : T + 1;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `canvas-feed-card-box ${L ? "is-selected" : ""} ${J ? "is-dragging" : ""} ${H ? "is-resizing" : ""}`,
                      style: {
                        position: "absolute",
                        left: `${st}%`,
                        top: `${ct}%`,
                        width: `${En}%`,
                        height: `${Wn}%`,
                        zIndex: wt * 10 + (J ? 100 : 0),
                        transformOrigin: "center center",
                        border: `${nt}px solid ${et}`,
                        borderRadius: `${It}px`,
                        boxShadow: Tt,
                        opacity: p.opacity !== void 0 ? p.opacity : 1,
                        pointerEvents: p.opacity !== void 0 && p.opacity < 0.1 ? "none" : "auto",
                        cursor: J ? "grabbing" : "grab",
                        transition: J || H ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                      },
                      onMouseDown: (Re) => Fi(Re, T),
                      onContextMenu: (Re) => o && o(Re, $e),
                      children: [
                        /* @__PURE__ */ s.jsxs(
                          "div",
                          {
                            className: "box-header-badge",
                            onMouseDown: (Re) => Fi(Re, T),
                            onDoubleClick: () => Rs(T),
                            title: "Click and drag to move window (Double-click to expand 1x1)",
                            children: [
                              /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                /* @__PURE__ */ s.jsx("span", { children: p.label || `${$e.displayName || p.stationId} (${p.displayId})` })
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                Math.round(p.width),
                                "×",
                                Math.round(p.height),
                                " (",
                                dr(p.width, p.height),
                                ") @ (",
                                Math.round(p.x),
                                ",",
                                Math.round(p.y),
                                ")",
                                pe !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                  "📐",
                                  pe,
                                  "°"
                                ] })
                              ] }),
                              /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${wt}`, children: [
                                "#",
                                wt
                              ] })
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
                                transition: J ? "none" : "transform 0.2s ease-out"
                              },
                              children: /* @__PURE__ */ s.jsx(
                                yg,
                                {
                                  station: $e,
                                  isSolo: !1,
                                  currentEpochMs: R,
                                  timeMode: m,
                                  isPlaying: x,
                                  setIsPlaying: w,
                                  baseEpochMs: d,
                                  totalDurationMs: E,
                                  outPointMs: v,
                                  setPlayheadMs: g,
                                  globalGaps: h,
                                  onOpenSpotlight: l,
                                  onSelectActiveStation: null,
                                  recordingSegments: k,
                                  playbackSpeed: M,
                                  activeAudioStationId: Z,
                                  onSoloAudio: Q,
                                  directorPlan: C || ($e == null ? void 0 : $e.directorPlan),
                                  isAutoDirectorEnabled: a ? a[$e.id] ?? !0 : !0,
                                  stationsCount: t.length,
                                  onDeselectStation: i,
                                  targetDisplayId: p.displayId,
                                  onSelectDisplayId: (Re) => {
                                    const at = he.map((rt, cr) => cr === T ? { ...rt, displayId: Re } : rt);
                                    ne(at);
                                  },
                                  areAllDisplaysPlaced: tt,
                                  slotIndex: T,
                                  borderColor: et
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "card-drag-surface",
                              onMouseDown: (Re) => Fi(Re, T),
                              onDoubleClick: () => Rs(T),
                              title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                            }
                          )
                        ] }),
                        L && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                          /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "resize-handle-corner resize-handle-tl",
                              onMouseDown: (Re) => mo(Re, T, "tl"),
                              title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${dr(p.sourceWidth, p.sourceHeight)})`
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "resize-handle-corner resize-handle-tr",
                              onMouseDown: (Re) => mo(Re, T, "tr"),
                              title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${dr(p.sourceWidth, p.sourceHeight)})`
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "resize-handle-corner resize-handle-bl",
                              onMouseDown: (Re) => mo(Re, T, "bl"),
                              title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${dr(p.sourceWidth, p.sourceHeight)})`
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "resize-handle-corner resize-handle-br",
                              onMouseDown: (Re) => mo(Re, T, "br"),
                              title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${dr(p.sourceWidth, p.sourceHeight)})`,
                              children: "↘"
                            }
                          )
                        ] })
                      ]
                    },
                    `feed-${p.stationId}-${p.displayId}-${T}`
                  );
                }),
                !ee && Pe !== null && Os && (() => {
                  const p = Os, T = Pe, L = p.borderColor || pt[T % pt.length], J = p.borderWidth !== void 0 ? p.borderWidth : 2, H = p.rotation || 0, P = p.shadowEffect || "deep", se = p.zIndex !== void 0 ? p.zIndex : T + 1, $e = p.y < 70, xe = p.x / Ce * 100, ye = p.width / Ce * 100, tt = xe + ye / 2;
                  let et = `${tt}%`, nt = "translateX(-50%)";
                  tt < 28 ? (et = `${Math.max(1, xe)}%`, nt = "none") : tt > 72 && (et = `${Math.min(99, xe + ye)}%`, nt = "translateX(-100%)");
                  let pe;
                  $e ? p.height < 110 ? pe = `min(calc(100% - 38px), ${(p.y + p.height + 6) / Te * 100}%)` : pe = `min(calc(100% - 38px), ${(p.y + 28) / Te * 100}%)` : pe = `max(4px, calc(${p.y / Te * 100}% - 38px))`;
                  const it = (n.length > 0 ? n : t).find(
                    (st) => {
                      var ct, En;
                      return st.id === p.stationId || ((ct = st.hostname) == null ? void 0 : ct.toLowerCase()) === ((En = p.stationId) == null ? void 0 : En.toLowerCase());
                    }
                  ), It = it ? it.id : p.stationId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `floating-feed-inspector ${$e ? "is-flipped-down" : ""}`,
                      style: {
                        position: "absolute",
                        left: et,
                        top: pe,
                        transform: nt,
                        zIndex: 99999
                      },
                      onMouseDown: (st) => st.stopPropagation(),
                      onClick: (st) => st.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen Controls: ${p.label || It} • Layer #${se}`, children: [
                          "🎛️ #",
                          se
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-color-swatch-trigger",
                              onClick: () => Ut((st) => !st),
                              title: "🎨 Border Color: Click to choose accent frame color",
                              children: [
                                /* @__PURE__ */ s.jsx("span", { className: "control-icon", children: "🎨" }),
                                /* @__PURE__ */ s.jsx(
                                  "span",
                                  {
                                    className: "swatch-circle",
                                    style: { backgroundColor: L === "transparent" ? "#1E293B" : L }
                                  }
                                ),
                                /* @__PURE__ */ s.jsx("span", { className: "caret", children: "▾" })
                              ]
                            }
                          ),
                          _t && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Eg.map((st) => /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: `btn-color-dot ${L === st ? "is-active" : ""}`,
                              style: { backgroundColor: st === "transparent" ? "#1E293B" : st },
                              onClick: () => {
                                Yt({ borderColor: st }), Ut(!1);
                              },
                              title: st === "transparent" ? "No Border (Transparent)" : `Set Border Color to ${st}`
                            },
                            st
                          )) })
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "inspector-group width-select-group", children: [
                          /* @__PURE__ */ s.jsx("span", { className: "control-icon", title: "Border Stroke Width", children: "📏" }),
                          /* @__PURE__ */ s.jsxs(
                            "select",
                            {
                              className: "tactical-select width-select",
                              value: J,
                              onChange: (st) => Yt({ borderWidth: Number(st.target.value) }),
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
                              value: P,
                              onChange: (st) => Yt({ shadowEffect: st.target.value }),
                              title: "Drop Shadow & Glow: Add visual depth or tactical glow to this window",
                              children: Cg.map((st) => /* @__PURE__ */ s.jsx("option", { value: st.id, children: st.label }, st.id))
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
                              onChange: (st) => {
                                const ct = st.target.value;
                                ct === "front" ? lt(T) : ct === "back" ? ft(T) : ct === "up" ? Et(T) : ct === "down" && Lt(T);
                              },
                              title: `Layer Stacking Order: Currently Layer #${se}. Choose to bring in front or send behind.`,
                              children: [
                                /* @__PURE__ */ s.jsxs("option", { value: "", disabled: !0, children: [
                                  "L#",
                                  se,
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
                              onClick: () => $n(90),
                              title: "Rotate: Step 90 degrees clockwise (↺)",
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: `btn-action-tool ${Qt ? "active" : ""}`,
                              onClick: () => ns((st) => !st),
                              title: `Fine Rotation: Click to toggle angle slider (Current: ${H}°)`,
                              children: [
                                "📐 ",
                                H,
                                "°"
                              ]
                            }
                          ),
                          Qt && /* @__PURE__ */ s.jsx(
                            "input",
                            {
                              type: "range",
                              min: "-180",
                              max: "180",
                              value: H,
                              onChange: (st) => Yt({ rotation: Number(st.target.value) }),
                              className: "rotation-slider",
                              title: `Adjust tilt angle: ${H}°`
                            }
                          )
                        ] }),
                        /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "btn-action-tool highlight",
                            onClick: () => kp(T),
                            title: `Native Recorded Aspect Ratio: Snap window to its exact recorded aspect (${dr(p.sourceWidth, p.sourceHeight)}) to remove any distortion`,
                            children: [
                              "📐 NATIVE (",
                              dr(p.sourceWidth, p.sourceHeight),
                              ")"
                            ]
                          }
                        ),
                        /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-action-tool highlight",
                            onClick: () => Rs(T),
                            title: "1x1 Focus Viewport: Maximize this window to fill 100% of the canvas frame (Double-clicking the card also maximizes)",
                            children: "⊞ 1x1 FOCUS"
                          }
                        ),
                        /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-action-tool",
                            onClick: () => l && l(It, p.displayId),
                            title: "Deep Forensic Spotlight: Open multi-angle synchronized forensic viewer for this workstation",
                            children: "🔍 SPOTLIGHT"
                          }
                        ),
                        /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-action-tool btn-del-feed",
                            onClick: () => Le(T),
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
        ve && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => ie(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (p) => p.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => ie(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: D,
                onChange: (p) => X(p.target.value),
                autoFocus: !0,
                onKeyDown: (p) => {
                  p.key === "Enter" && Ls();
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
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => ie(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Ls, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const ya = [0.5, 1, 1.25, 1.5, 2, 4];
function ap({
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
  onStepFrameForward: y,
  onStepFrameBackward: f,
  playbackSpeed: m = 1,
  onChangeSpeed: x,
  onSetInPoint: w,
  onSetOutPoint: E
}) {
  const [$, v] = u.useState(() => rl()), { volume: g, isMuted: h } = $, k = !!e;
  u.useEffect(() => {
    const B = (W) => {
      W.detail && v(W.detail);
    };
    return window.addEventListener("itb-audio-state-changed", B), () => window.removeEventListener("itb-audio-state-changed", B);
  }, []);
  const M = u.useCallback((B, W, S) => {
    const U = {
      volume: typeof B == "number" ? B : g,
      isMuted: typeof W == "boolean" ? W : h,
      channelMode: S || $.channelMode || "both"
    };
    v(U), hg(U);
  }, [g, h, $.channelMode]), j = (B) => {
    B == null || B.stopPropagation(), k && n(!t);
  }, N = (B) => {
    if (B == null || B.stopPropagation(), !k || !x) return;
    const W = ya.indexOf(m), S = W === -1 ? 1 : (W + 1) % ya.length;
    x(ya[S]);
  }, b = (B) => {
    B == null || B.stopPropagation(), h ? M(g === 0 ? 0.5 : g, !1) : M(g, !0);
  }, C = (B) => {
    B.stopPropagation();
    const W = parseFloat(B.target.value);
    W === 0 ? M(0, !0) : M(W, !1);
  }, I = (B) => {
    const W = u.useRef(null), S = u.useRef(null), U = u.useRef(0), F = u.useCallback(() => {
      W.current && clearTimeout(W.current), S.current && clearInterval(S.current), W.current = null, S.current = null;
    }, []), ee = u.useCallback((Z = 1) => {
      if (n && n(!1), i) {
        const Q = 33 * Z;
        i((q) => {
          const Y = B === "forward" ? q + Q : q - Q;
          return Math.max(0, Math.min(d, Y));
        });
      } else B === "forward" && y ? y() : B === "backward" && f && f();
    }, [B]), R = u.useCallback((Z) => {
      Z.preventDefault(), Z.stopPropagation(), k && (F(), ee(1), U.current = performance.now(), W.current = setTimeout(() => {
        S.current = setInterval(() => {
          const Q = performance.now() - U.current, q = Q > 2500 ? 4 : Q > 1e3 ? 2 : 1;
          ee(q);
        }, 50);
      }, 280));
    }, [ee, F]);
    return u.useEffect(() => F, [F]), {
      onMouseDown: R,
      onMouseUp: F,
      onMouseLeave: F,
      onTouchStart: R,
      onTouchEnd: F
    };
  }, _ = I("backward"), K = I("forward"), A = (B) => {
    B.stopPropagation(), k && (n && n(!1), i && i(a));
  }, z = (B) => {
    B.stopPropagation(), k && (n && n(!1), i && i(c));
  }, G = () => h || g === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${k ? "is-expanded" : "is-compact-disabled"}`,
      title: k ? "" : "Select a station card above to enable timeline playback",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !k,
            onClick: N,
            title: "Playback Speed",
            children: [
              m,
              "x"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cut-action cut-in",
            disabled: !w,
            onClick: (B) => {
              B.stopPropagation(), w == null || w();
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
              disabled: !k,
              onClick: (B) => {
                B.stopPropagation(), l && l(!r);
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
              disabled: !k,
              onClick: A,
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
              disabled: !k,
              ..._,
              title: "Step 1 Frame Back (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "16 5 7 12 16 19 16 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-play-hero ${t ? "playing" : ""}`,
              disabled: !k,
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
              disabled: !k,
              ...K,
              title: "Step 1 Frame Forward (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "8 5 17 12 8 19 8 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-out",
              disabled: !k,
              onClick: z,
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
            disabled: !E,
            onClick: (B) => {
              B.stopPropagation(), E == null || E();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        k && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${h || g === 0 ? "is-muted" : ""}`,
              onClick: b,
              title: h ? "Unmute" : `Mute (${Math.round(g * 100)}%)`,
              children: G()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: h ? 0 : g,
              onChange: C,
              className: "volume-slider"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-audio-mode-toggle",
              onClick: () => {
                const B = ["both", "mic", "sys", "stereo"], W = $.channelMode || "both", S = B[(B.indexOf(W) + 1) % B.length];
                M(g, h, S);
              },
              title: `Discrete Audio Channel: ${($.channelMode || "both").toUpperCase()} (Click to cycle Both / Mic / System / Stereo)`,
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
              children: ($.channelMode || "both") === "mic" ? "🎤 MIC" : ($.channelMode || "both") === "sys" ? "🔊 SYS" : ($.channelMode || "both") === "stereo" ? "⮂ STEREO" : "🎧 BOTH"
            }
          )
        ] })
      ]
    }
  );
}
const Xo = 2500, Mg = {
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
function Tg(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Mg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function cp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Tg), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function up(e, t = " + ") {
  return cp(e).join(t);
}
function bl(e) {
  return up(e, "+");
}
const Ig = 8;
function Ag({
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
  const [d, y] = u.useState([]), [f, m] = u.useState(!1), x = t || e;
  u.useEffect(() => {
    if (n && Array.isArray(n) && n.length > 0)
      return;
    if (!x || !r || i <= 0) {
      y([]);
      return;
    }
    const h = new AbortController(), k = Math.max(0, r + o - Xo), M = r + o + i + Xo;
    m(!0);
    const j = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(x)}&startEpoch=${k}&endEpoch=${M}`;
    return fetch(j, { signal: h.signal }).then((N) => N.ok ? N.json() : []).then((N) => {
      y(Array.isArray(N) ? N : []), m(!1);
    }).catch((N) => {
      N.name !== "AbortError" && (y([]), m(!1));
    }), () => h.abort();
  }, [x, r, o, i, n]);
  const w = n && Array.isArray(n) && n.length > 0 ? n : d, E = u.useMemo(() => {
    if (!w.length || i <= 0 || a <= 0)
      return [];
    const h = r + o, k = h + i, M = [...w].sort((C, I) => C.epochMs - I.epochMs), j = [];
    let N = null, b = -999;
    for (const C of M) {
      const I = C.epochMs + Xo;
      if (I < h || I > k)
        continue;
      const _ = I - r, K = (_ - o) / i * a;
      if (N && K - b < Ig)
        N.events.push(C), N.endOffsetMs = _, N.endEpochMs = I, b = K;
      else {
        const A = (_ - o) / i * 100;
        N = {
          id: `kc_${C.epochMs}_${j.length}`,
          startOffsetMs: _,
          endOffsetMs: _,
          startEpochMs: I,
          endEpochMs: I,
          pct: A,
          events: [C]
        }, j.push(N), b = K;
      }
    }
    return j;
  }, [w, r, o, i, a]);
  function $(h) {
    if (!h.events.length) return "";
    if (h.events.length === 1)
      return bl(h.events[0].keyCombination);
    const k = h.events.find((N) => N.keyCombination.includes("+"));
    if (k) {
      const N = bl(k.keyCombination);
      return h.events.length > 1 ? `${N} (+${h.events.length - 1})` : N;
    }
    const M = bl(h.events[0].keyCombination);
    return h.events.every((N) => bl(N.keyCombination) === M) ? `${M} ×${h.events.length}` : `${M} (+${h.events.length - 1})`;
  }
  function v(h, k = "LOCAL") {
    return qe(h, k);
  }
  function g(h) {
    const k = [];
    for (const M of h) {
      const j = bl(M.keyCombination);
      k.length && k[k.length - 1].key === j ? k[k.length - 1].count++ : k.push({ key: j, count: 1 });
    }
    return k;
  }
  return E.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: E.map((h) => {
    const k = h.events.length, M = k > 1, j = $(h), N = v(h.startEpochMs, l), b = g(h.events), C = h.pct < 10 ? "edge-left" : h.pct > 90 ? "edge-right" : "";
    return /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${M ? "is-cluster" : "is-single"}`,
        style: { left: `${h.pct}%` },
        onClick: (I) => {
          I.stopPropagation(), c && c(h.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${j} at ${N}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            M && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: k > 9 ? "9+" : k })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${C}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: M ? `KEYSTROKE BURST (${k})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: N })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
              b.slice(0, 8).map((I, _) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                I.key,
                I.count > 1 ? ` ×${I.count}` : ""
              ] }, _)),
              b.length > 8 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                "+",
                b.length - 8,
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
const $g = u.memo(Ag), va = [
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
], Rg = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function Lg({
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
  earliestMediaMs: y = null,
  movieBoundaries: f = null,
  stationHostname: m = "",
  activeStationName: x = "",
  showKeystrokes: w = !0,
  keystrokes: E = []
}) {
  const $ = u.useRef(null), [v, g] = u.useState(1e3);
  u.useEffect(() => {
    if (!$.current) return;
    const R = new ResizeObserver((Z) => {
      for (let Q of Z)
        Q.contentRect.width > 50 && g(Q.contentRect.width);
    });
    return R.observe($.current), () => R.disconnect();
  }, []);
  const h = u.useCallback((R) => !r || r <= 0 ? "0%" : `${(R - n) / r * 100}%`, [r, n]), k = u.useCallback((R) => {
    const Q = (R - n) / r * 100;
    return Q >= -5 && Q <= 105;
  }, [n, r]), M = (R) => {
    if (!$.current) return;
    const Z = $.current.getBoundingClientRect(), Q = Math.max(0, Math.min(R.clientX - Z.left, Z.width)), q = Math.round(n + Q / Z.width * r);
    i && i(q);
  }, j = () => {
    i && i(null);
  }, N = (R) => {
    if (!$.current || !a) return;
    const Z = $.current.getBoundingClientRect(), Q = Math.max(0, Math.min(R.clientX - Z.left, Z.width)), q = Math.round(n + Q / Z.width * r);
    a(Math.max(0, Math.min(l, q)));
  }, b = u.useMemo(() => {
    const R = Math.max(3, Math.floor(v / 95)), Z = r / R;
    for (let Q of va)
      if (Q >= Z) return Q;
    return va[va.length - 1];
  }, [r, v]), C = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const R = e + n, Z = R + r, Q = t === "LOCAL" ? Ss(R).offsetMin * 60 * 1e3 : 0, q = R + Q, Y = Math.ceil(q / b) * b, re = [];
    for (let te = Y; te <= Z + Q; te += b) {
      const de = te - Q, be = (de - R) / r * 100;
      be >= 0 && be <= 100 && re.push({
        epoch: de,
        pct: be,
        label: qe(de, t, {
          includeSeconds: b < 6e4
        })
      });
    }
    return re;
  }, [e, n, r, b, t]), I = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const R = e + n, Z = R + r;
    return sp(R, Z).map((Q) => ({
      ...Q,
      pct: (Q.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), _ = u.useMemo(() => {
    if (!r || !e) return [];
    const R = e + n, Z = R + r, Q = t === "UTC", q = [], Y = Q ? 0 : Ss(R).offsetMin * 60 * 1e3, re = R + Y, te = Z + Y, de = new Date(re);
    for (de.setUTCHours(0, 0, 0, 0), de.getTime() < re && de.setUTCDate(de.getUTCDate() + 1); de.getTime() <= te; ) {
      const ve = de.getTime() - Y, ie = (ve - R) / r * 100, ke = String(de.getUTCDate()).padStart(2, "0"), _e = Rg[de.getUTCMonth()], D = `${ke} ${_e}`;
      q.push({ epoch: ve, pct: ie, dateLabel: D }), de.setUTCDate(de.getUTCDate() + 1);
    }
    return q;
  }, [e, n, r, t]), {
    globalFirstMs: K = y,
    globalLastMs: A = null,
    currentFirstMs: z = null,
    currentLastMs: G = null
  } = f || { globalFirstMs: y }, B = K !== null && z !== null && Math.abs(K - z) < 1e3, W = A !== null && G !== null && Math.abs(A - G) < 1e3, S = u.useMemo(() => {
    const R = [];
    return B ? k(K) && R.push({
      id: "first-combined",
      ms: K,
      pct: h(K),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${qe(e + K, t)} (Click to jump)`
    }) : (k(K) && R.push({
      id: "first-global",
      ms: K,
      pct: h(K),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${qe(e + K, t)} (Click to jump)`
    }), k(z) && R.push({
      id: "first-current",
      ms: z,
      pct: h(z),
      className: "ruler-media-pin current-first",
      badge: x ? `FIRST (${x})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${qe(e + z, t)} (Click to jump)`
    })), W ? k(A) && R.push({
      id: "last-combined",
      ms: A,
      pct: h(A),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${qe(e + A, t)} (Click to jump)`
    }) : (k(G) && R.push({
      id: "last-current",
      ms: G,
      pct: h(G),
      className: "ruler-media-pin current-last",
      badge: x ? `LAST (${x})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${qe(e + G, t)} (Click to jump)`
    }), k(A) && R.push({
      id: "last-global",
      ms: A,
      pct: h(A),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${qe(e + A, t)} (Click to jump)`
    })), R;
  }, [
    K,
    A,
    z,
    G,
    B,
    W,
    e,
    t,
    x,
    k,
    h
  ]), U = u.useMemo(() => {
    const R = [];
    return typeof c == "number" && k(c) && R.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: h(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${qe(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && k(d) && R.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: h(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${qe(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), R;
  }, [c, d, e, t, k, h]), F = o !== null ? h(o) : null, ee = F !== null && F >= 0 && F <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: $,
      className: "timeline-ruler-root",
      onMouseMove: M,
      onMouseLeave: j,
      onClick: N,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          C.map((R) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${R.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: R.label })
          ] }, R.epoch)),
          w && /* @__PURE__ */ s.jsx(
            $g,
            {
              stationHostname: m,
              activeStationName: x,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: v,
              onSeek: a,
              keystrokes: E
            }
          ),
          I.map((R) => /* @__PURE__ */ s.jsxs(
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
          _.map((R) => /* @__PURE__ */ s.jsxs(
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
          S.map((R) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: R.className,
              style: { left: `${R.pct}` },
              onClick: (Z) => {
                Z.stopPropagation(), a && a(R.ms);
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
              onClick: (Z) => {
                Z.stopPropagation(), a && a(R.ms);
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
        ee && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${F}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: qe(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Ln = (e) => String(e).padStart(2, "0");
function Og({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: i
}) {
  const [a, c] = u.useState(!1), [d, y] = u.useState(!1), [f, m] = u.useState(""), [x, w] = u.useState(""), E = u.useCallback((C) => {
    if (!C || isNaN(C) || C <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const A = new Date(C);
      return {
        timeStr: `${Ln(A.getUTCHours())}:${Ln(A.getUTCMinutes())}:${Ln(A.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: I, label: _ } = Ss(C), K = new Date(C + I * 60 * 1e3);
    return {
      timeStr: `${Ln(K.getUTCHours())}:${Ln(K.getUTCMinutes())}:${Ln(K.getUTCSeconds())}`,
      zoneLabel: _
    };
  }, [t]), $ = u.useCallback((C) => {
    if (!C || C < 0) return "00:00:00";
    const I = Math.floor(C / 1e3), _ = Math.floor(I / 3600), K = Math.floor(I % 3600 / 60), A = I % 60;
    return `${Ln(_)}:${Ln(K)}:${Ln(A)}`;
  }, []), v = u.useMemo(() => E(e + r), [E, e, r]), g = u.useMemo(() => E(e + o), [E, e, o]), h = u.useMemo(() => $(Math.max(0, o - r)), [$, r, o]), k = u.useCallback((C, I) => {
    if (!C || !C.trim()) return I;
    const K = C.trim().split(" ")[0].split(":").map(Number);
    if (K.length < 2 || K.some(isNaN)) return I;
    const [A, z, G = 0] = K;
    if (t === "UTC") {
      const Y = new Date(e);
      Y.setUTCHours(A, z, G, 0);
      let re = Y.getTime();
      for (; re < e; ) re += 864e5;
      for (; re > e + n + 1e3; ) re -= 864e5;
      const te = re - e;
      return isNaN(te) ? I : Math.max(0, Math.min(n, te));
    }
    const { offsetMin: B } = Ss(e), W = new Date(e + B * 6e4), S = W.getUTCFullYear(), U = W.getUTCMonth(), F = W.getUTCDate(), ee = `${S}-${Ln(U + 1)}-${Ln(F)}`, R = `${Ln(A)}:${Ln(z)}:${Ln(G)}`, Z = ki(ee, R);
    let Q;
    if (Z.isAmbiguous) {
      const Y = e + I, re = Math.abs(Z.firstOccurrenceEpoch - Y), te = Math.abs(Z.secondOccurrenceEpoch - Y);
      Q = re <= te ? Z.firstOccurrenceEpoch : Z.secondOccurrenceEpoch;
    } else {
      const Y = Date.UTC(S, U, F, A, z, G), { offsetMin: re } = Ss(Y - B * 6e4);
      Q = Y - re * 6e4;
    }
    for (; Q < e; ) Q += 864e5;
    for (; Q > e + n + 1e3; ) Q -= 864e5;
    const q = Q - e;
    return isNaN(q) ? I : Math.max(0, Math.min(n, q));
  }, [e, t, n]), M = () => {
    m(v.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !f || !f.trim() || f.trim() === v.timeStr)
      return;
    const C = k(f.trim(), r);
    C !== null && !isNaN(C) && C < o && l(C);
  }, N = () => {
    w(g.timeStr), y(!0);
  }, b = () => {
    if (y(!1), !x || !x.trim() || x.trim() === g.timeStr)
      return;
    const C = k(x.trim(), o);
    C !== null && !isNaN(C) && C > r && i(C);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "tactical-timecode-console", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "console-row in-accent", children: [
      /* @__PURE__ */ s.jsx("span", { className: "console-tag", children: "IN" }),
      a ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: f,
          autoFocus: !0,
          onChange: (C) => m(C.target.value),
          onBlur: j,
          onKeyDown: (C) => {
            C.key === "Enter" && j(), C.key === "Escape" && c(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: M,
          title: `Click to edit IN time (${v.zoneLabel})`,
          children: [
            v.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: v.zoneLabel })
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
          value: x,
          autoFocus: !0,
          onChange: (C) => w(C.target.value),
          onBlur: b,
          onKeyDown: (C) => {
            C.key === "Enter" && b(), C.key === "Escape" && y(!1);
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: h })
    ] })
  ] });
}
function Dg({
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
  onStartDragMinimap: y
}) {
  const f = Math.max(0, Math.min(100, a / r * 100)), m = Math.max(0, Math.min(100, c / r * 100)), x = Math.max(0, m - f), w = Math.max(0, Math.min(100, l / r * 100)), E = Math.max(0, Math.min(100 - w, o / r * 100)), $ = w + E, v = i > 1.05, g = 7, h = x >= 10, k = x >= 16, M = h, j = k, N = M && Math.abs(w - f) < g, b = v && E >= 12 && !N, C = j && Math.abs($ - m) < g, I = v && E >= 12 && !C;
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
            style: { left: `${f}%`, width: `${x}%` },
            children: [
              M && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: qe(t + a, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: qe(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${w}%`, width: `${E}%` },
            children: [
              b && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: qe(t + l, n) }),
              I && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: qe(t + l + o, n) })
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
function Pg({
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
  onChangeKeystrokeMode: y,
  showRulerKeystrokes: f = !1,
  onToggleRulerKeystrokes: m
}) {
  const x = (d || "NONE").toUpperCase().replace("-", "_"), w = () => {
    y && y(x === "NONE" || x === "OFF" ? "BURN_IN" : x === "BURN_IN" ? "CAPTION" : "NONE");
  }, E = () => {
    switch (x) {
      case "BURN_IN":
        return "KEYS: BURN-IN";
      case "CAPTION":
        return "KEYS: CAPTION";
      default:
        return "KEYS: OFF";
    }
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline-viewport-actions-group", children: [
    y && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action keys-mode-btn mode-${x.toLowerCase().replace("_", "-")}`,
        onClick: w,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in / Soft Caption)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: E() })
        ]
      }
    ),
    m && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${f ? "active" : "inactive"}`,
        onClick: m,
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
        title: `Jump playhead to first media (${qe(a + e, c)})`,
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
        title: `Jump playhead to last media (${qe(a + t, c)})`,
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
const gs = /* @__PURE__ */ new Map(), Pr = /* @__PURE__ */ new Map();
let ws = [], ll = 0;
const Ld = 3, _g = 8e3, Fg = 80;
function dp() {
  setTimeout(Bg, 0);
}
function Bg() {
  var e;
  if (!(ll >= Ld || ws.length === 0))
    for (ws = ws.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); ll < Ld && ws.length > 0; ) {
      const t = ws.pop();
      !t || (e = t.signal) != null && e.aborted || (ll++, Ug(t));
    }
}
async function Ug(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: i, resolve: a, displayId: c } = e;
  let d = !1, y = null;
  const f = () => {
    d || (d = !0, y && clearTimeout(y), ll = Math.max(0, ll - 1), Pr.delete(t), dp());
  };
  y = setTimeout(() => {
    f(), a(null);
  }, _g);
  try {
    const m = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, x = await fetch(m, { signal: i });
    if (x.ok && x.status !== 204) {
      const w = await x.blob();
      if (w && w.size > 1500) {
        const E = URL.createObjectURL(w);
        if (gs.size >= Fg) {
          const $ = gs.keys().next().value, v = gs.get($);
          v && URL.revokeObjectURL(v), gs.delete($);
        }
        gs.set(t, E), a(E);
        return;
      }
    }
    a(null);
  } catch {
    a(null);
  } finally {
    f();
  }
}
const Od = {
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
    return gs.get(o);
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
    if (gs.has(i))
      return Promise.resolve(gs.get(i));
    if (Pr.has(i))
      return Pr.get(i);
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
        ws = ws.filter((y) => y.key !== i), Pr.delete(i), c(null);
      }, { once: !0 }), ws.push(d), dp();
    });
    return Pr.set(i, a), a;
  },
  clear() {
    gs.forEach((e) => URL.revokeObjectURL(e)), gs.clear(), Pr.clear(), ws = [], ll = 0;
  }
}, Wg = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, vs = (e) => e.startEpochMs ?? e.startEpoch ?? e.start ?? 0, Ml = (e) => e.endEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Dd({
  station: e,
  displayId: t = "mon-0",
  displayLabel: n = null,
  displayNumber: r = null,
  isActive: l,
  isCollapsed: o = !1,
  onSelect: i,
  onStationContextMenu: a,
  onDeselectStation: c,
  viewportStartMs: d = 0,
  viewportDurationMs: y = 36e5,
  inPointMs: f,
  outPointMs: m,
  baseEpochMs: x,
  segments: w = [],
  recordingSegments: E = {},
  globalGaps: $ = [],
  disableFilmstrip: v = !1
}) {
  const [g, h] = u.useState({}), k = u.useRef(g);
  k.current = g;
  const M = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", j = (e == null ? void 0 : e.id) || M, N = u.useMemo(() => {
    const S = E[j] || E[M] || w || [];
    return !S || S.length === 0 ? [] : S.filter((U) => Ml(U) - vs(U) > 0);
  }, [E, w, j, M]), b = u.useMemo(() => Wg(y), [y]), C = u.useMemo(() => {
    if (v || N.length === 0 || !x || y <= 0) return [];
    const { tileDurationMs: S, framesPerTile: U } = b, F = [], ee = x + d, R = ee + y, Z = ee - S, Q = R + S;
    if ([...N].sort((Y, re) => vs(Y) - vs(re)).forEach((Y, re) => {
      const te = Math.round(vs(Y)), de = Math.round(Ml(Y));
      if (de <= te) return;
      const be = Math.max(te, Z), ve = Math.min(de, Q);
      if (ve <= be) return;
      const ie = Math.floor(be / S) * S;
      for (let ke = ie; ke < ve; ke += S) {
        const _e = ke + S, D = Math.max(te, ke), X = Math.min(de, _e);
        X > D && F.push({
          key: `${M}_${t}_${D}_${X}_${U}`,
          sIdx: re,
          startEpoch: D,
          endEpoch: X,
          framesPerTile: U,
          displayId: t
        });
      }
    }), F.length > 20) {
      const Y = x + d + y / 2;
      F.sort((re, te) => {
        const de = Math.abs((re.startEpoch + re.endEpoch) / 2 - Y), be = Math.abs((te.startEpoch + te.endEpoch) / 2 - Y);
        return de - be;
      }), F.length = 20, F.sort((re, te) => re.startEpoch - te.startEpoch);
    }
    return F;
  }, [N, x, M, v, d, y, b]);
  u.useEffect(() => {
    if (C.length === 0) return;
    let S = !0;
    const U = new AbortController(), F = [], ee = {};
    let R = !1;
    C.forEach((te) => {
      const de = Od.get(M, te.startEpoch, te.endEpoch, te.framesPerTile, t);
      de ? k.current[te.key] !== de && (ee[te.key] = de, R = !0) : F.push(te);
    });
    const Z = new Set(C.map((te) => te.key)), Q = k.current, q = {};
    let Y = !1;
    if (Object.keys(Q).forEach((te) => {
      Z.has(te) ? q[te] = Q[te] : Y = !0;
    }), R || Y) {
      const te = { ...q, ...ee };
      k.current = te, h(te);
    }
    if (F.length === 0) return () => {
      S = !1;
    };
    const re = setTimeout(() => {
      F.forEach((te) => {
        Od.fetchTile(M, te.startEpoch, te.endEpoch, te.framesPerTile, U.signal, t).then((de) => {
          S && de && (k.current[te.key] = de, h((be) => ({ ...be, [te.key]: de })));
        });
      });
    }, 150);
    return () => {
      S = !1, clearTimeout(re), U.abort();
    };
  }, [C, M, t]);
  const I = (f - d) / y * 100, _ = (m - d) / y * 100, K = u.useMemo(() => {
    if (C.length === 0 || !x || y <= 0) return [];
    const S = d, U = d + y;
    return C.map((F) => {
      const ee = F.startEpoch - x, R = F.endEpoch - x;
      if (R <= S || ee >= U) return null;
      const Z = Math.max(S, ee), Q = Math.min(U, R);
      return {
        key: F.key,
        spriteUrl: g[F.key] || null,
        leftPct: (Z - S) / y * 100,
        widthPct: (Q - Z) / y * 100
      };
    }).filter(Boolean);
  }, [C, x, d, y, g]), A = u.useMemo(() => {
    if (N.length === 0 || !x || y <= 0) return [];
    const S = d, U = d + y;
    return N.map((F, ee) => {
      const R = Math.round(vs(F)) - x, Z = Math.round(Ml(F)) - x;
      if (Z <= S || R >= U) return null;
      const Q = Math.max(S, R), q = Math.min(U, Z);
      return {
        id: ee,
        leftPct: (Q - S) / y * 100,
        widthPct: (q - Q) / y * 100
      };
    }).filter(Boolean);
  }, [N, x, d, y]), z = u.useMemo(() => {
    if (!x || y <= 0) return [];
    const S = [...N].sort((re, te) => vs(re) - vs(te)), U = [], F = d, ee = d + y, R = x + F, Z = x + ee, Q = x + (f !== void 0 ? f : F), q = x + (m !== void 0 ? m : ee);
    if (S.length > 0) {
      const re = vs(S[0]);
      re > R && U.push({ startEpoch: R, endEpoch: re });
    } else y > 0 && U.push({ startEpoch: R, endEpoch: Z });
    for (let re = 0; re < S.length - 1; re++) {
      const te = Ml(S[re]), de = vs(S[re + 1]);
      de - te > 1e3 && U.push({ startEpoch: te, endEpoch: de });
    }
    if (S.length > 0) {
      const re = Ml(S[S.length - 1]);
      re < Z && U.push({ startEpoch: re, endEpoch: Z });
    }
    const Y = [];
    return $ && $.length > 0 && $.forEach((re, te) => {
      const de = Math.max(re.startEpochMs, Q), be = Math.min(re.endEpochMs, q);
      if (be > de && be > R && de < Z) {
        const ve = Math.max(R, de), ke = (Math.min(Z, be) - x - (ve - x)) / y * 100;
        ke > 0 && Y.push({
          id: `global-${te}`,
          type: "global",
          leftPct: (ve - x - F) / y * 100,
          widthPct: ke,
          durationSec: Math.round((be - de) / 1e3)
        });
      }
    }), U.forEach((re, te) => {
      let de = [re];
      $ && $.length > 0 && $.forEach((be) => {
        const ve = Math.max(be.startEpochMs, Q), ie = Math.min(be.endEpochMs, q);
        if (ie <= ve) return;
        const ke = [];
        de.forEach((_e) => {
          ie <= _e.startEpoch || ve >= _e.endEpoch ? ke.push(_e) : (ve > _e.startEpoch && ke.push({ startEpoch: _e.startEpoch, endEpoch: ve }), ie < _e.endEpoch && ke.push({ startEpoch: ie, endEpoch: _e.endEpoch }));
        }), de = ke;
      }), de.forEach((be, ve) => {
        if (be.endEpoch - be.startEpoch < 1e3 || be.endEpoch <= R || be.startEpoch >= Z) return;
        const ie = Math.max(R, be.startEpoch), _e = (Math.min(Z, be.endEpoch) - x - (ie - x)) / y * 100;
        _e > 0 && Y.push({
          id: `station-${te}-${ve}`,
          type: "station",
          leftPct: (ie - x - F) / y * 100,
          widthPct: _e,
          durationSec: Math.round((be.endEpoch - be.startEpoch) / 1e3)
        });
      });
    }), Y;
  }, [N, $, x, d, y, f, m]), G = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", B = (e == null ? void 0 : e.hostname) || "", W = !!(B && G && B.toLowerCase() !== G.toLowerCase());
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: i,
      onContextMenu: (S) => {
        a && (S.preventDefault(), S.stopPropagation(), a(S, e));
      },
      className: `timeline-track-container ${l ? "active-track" : "collapsed-track"} ${o ? "is-collapsed-sub" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar", title: `Workstation: ${G}${W ? ` (${B})` : ""} • Right-click for options`, children: [
          /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
          /* @__PURE__ */ s.jsxs("div", { className: "station-sidebar-labels", children: [
            /* @__PURE__ */ s.jsx("span", { className: "station-label", title: G, children: G }),
            r ? /* @__PURE__ */ s.jsxs("span", { className: "station-display-tag", title: `Display: ${n || `Screen ${r}`}`, children: [
              "🖥️ ",
              n || `SCREEN ${r}`
            ] }) : W ? /* @__PURE__ */ s.jsx("span", { className: "station-physical-sublabel", title: `Physical Machine: ${B}`, children: B }) : null
          ] }),
          c && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-track-deselect",
              title: `Remove ${G} from project`,
              onClick: (S) => {
                S.stopPropagation(), c(e.id);
              },
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
          /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: z.map((S) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `gap-full-block ${S.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
              style: { left: `${S.leftPct}%`, width: `${S.widthPct}%` },
              title: S.type === "global" ? `Shared Gap: ${S.durationSec}s will be skipped` : `Station Gap: ${S.durationSec}s No-Signal`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
                S.widthPct > 5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${S.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: S.type === "global" ? `✂ SKIPPED (${S.durationSec}s)` : "NO SIGNAL" }) })
              ]
            },
            S.id
          )) }),
          !v && /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: K.map((S) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: `spritesheet-tile-block ${S.spriteUrl ? "is-loaded" : "is-loading"}`,
              style: {
                position: "absolute",
                left: `${S.leftPct}%`,
                width: `${S.widthPct}%`,
                height: "100%",
                backgroundImage: S.spriteUrl ? `url("${S.spriteUrl}")` : "none",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                transition: "opacity 0.25s ease"
              },
              children: !S.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
            },
            S.key
          )) }),
          /* @__PURE__ */ s.jsx("div", { className: "data-presence-layer", children: A.map((S) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "data-presence-bar",
              style: { left: `${S.leftPct}%`, width: `${S.widthPct}%` }
            },
            `bar_${S.id}`
          )) }),
          I > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, I)}%` } }),
          _ < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, _)}%`, right: 0 } })
        ] })
      ]
    }
  );
}
function zg({
  stationId: e,
  directorPlan: t,
  isAutoDirectorEnabled: n = !0,
  onToggleAutoDirector: r,
  viewportStartMs: l = 0,
  viewportDurationMs: o = 36e5,
  baseEpochMs: i = 0,
  playheadMs: a = 0,
  onSplitSegment: c,
  onChangeSegmentDisplay: d,
  onResetSegmentToAuto: y,
  availableDisplays: f = [],
  timeMode: m = "LOCAL"
}) {
  const x = t == null ? void 0 : t.segments, w = u.useMemo(() => x || [], [x]), E = u.useRef(null), [$, v] = u.useState(null), g = i + a, h = i + l, k = h + o, M = u.useMemo(() => w.filter((A) => {
    const z = A.startEpochMs ?? A.StartEpochMs ?? 0;
    return (A.endEpochMs ?? A.EndEpochMs ?? 0) > h && z < k;
  }), [w, h, k]), j = u.useMemo(() => f && f.length > 0 ? f.map((A, z) => {
    const G = (A.displayId ?? A.DisplayId ?? `mon-${z}`).toLowerCase(), B = A.displayNumber ?? A.DisplayNumber ?? z + 1, S = (A.displayName || A.DisplayName || `Screen ${B}`).replace(/\s*\(mon-\d+\)/i, "").trim().toUpperCase();
    return {
      id: G,
      number: B,
      label: S
    };
  }) : [], [f]), N = u.useCallback((A) => {
    if (!A) return 1;
    const z = A.toLowerCase(), G = j.find((W) => W.id === z);
    if (G) return G.number;
    const B = z.match(/\d+/);
    if (B) {
      const W = parseInt(B[0], 10);
      return z.startsWith("mon-") ? W + 1 : W;
    }
    return 1;
  }, [j]), b = u.useCallback((A) => {
    if (!A) return "SCREEN 1";
    const z = A.toLowerCase(), G = j.find((W) => W.id === z);
    if (G) return G.label;
    if (z === "mon-0" || z === "0") return "SCREEN 1";
    if (z === "mon-1" || z === "1") return "SCREEN 2";
    const B = z.match(/\d+/);
    if (B) {
      const W = parseInt(B[0], 10);
      return `SCREEN ${z.startsWith("mon-") ? W + 1 : W}`;
    }
    return A.toUpperCase();
  }, [j]), C = u.useMemo(() => !w || w.length === 0 ? null : w.find((A) => {
    const z = A.startEpochMs ?? A.StartEpochMs ?? 0, G = A.endEpochMs ?? A.EndEpochMs ?? 0;
    return z <= g && g <= G;
  }) || w[0], [w, g]), I = ((C == null ? void 0 : C.targetDisplayId) ?? (C == null ? void 0 : C.TargetDisplayId) ?? "mon-0").toLowerCase(), _ = N(I), K = !!((C == null ? void 0 : C.isManualOverride) ?? (C == null ? void 0 : C.IsManualOverride));
  return u.useEffect(() => {
    if (!$) return;
    const A = () => v(null), z = (G) => {
      G.key === "Escape" && v(null);
    };
    return window.addEventListener("click", A), window.addEventListener("keydown", z), () => {
      window.removeEventListener("click", A), window.removeEventListener("keydown", z);
    };
  }, [$]), !f || f.length < 2 || !w || w.length === 0 ? null : /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: "director-track-container",
      "aria-label": "Auto-Director Track",
      ref: E,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "director-track-label", children: [
          /* @__PURE__ */ s.jsx("span", { className: "director-icon", children: "🎬" }),
          /* @__PURE__ */ s.jsx("span", { className: "director-title", children: "DIRECTOR" }),
          r && /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: `director-auto-toggle-btn ${n ? "is-enabled" : "is-disabled"}`,
              onClick: (A) => {
                A.stopPropagation(), r(e);
              },
              title: n ? "Auto-Director is ACTIVE for this station. Click to pause." : "Auto-Director is PAUSED for this station. Click to activate.",
              children: [
                /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                /* @__PURE__ */ s.jsx("span", { children: n ? "⚡ AUTO" : "✋ PAUSE" })
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "span",
            {
              className: `director-active-badge ${K ? "is-override" : "is-auto"}`,
              title: `Current orientation at playhead: Screen ${_} (${K ? "Manual Override" : "Auto-Director"})`,
              children: [
                /* @__PURE__ */ s.jsx("span", { className: "badge-pulse" }),
                K ? "✋ " : "⚡ ",
                `🖥 ${_}`
              ]
            }
          ),
          K && y && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "director-revert-btn",
              onClick: () => y(e, g),
              title: "Revert active override to AI Auto-Director",
              children: "↩ Auto"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "director-track-timeline", children: M.map((A, z) => {
          const G = A.startEpochMs ?? A.StartEpochMs ?? 0, B = A.endEpochMs ?? A.EndEpochMs ?? 0, W = (A.targetDisplayId ?? A.TargetDisplayId ?? "mon-0").toLowerCase(), S = N(W), U = b(W), F = !!(A.isManualOverride ?? A.IsManualOverride), ee = g >= G && g <= B, R = Math.max(G, h), Z = Math.min(B, k);
          if (Z <= R) return null;
          const Q = (R - h) / o * 100, q = (Z - h) / o * 100, Y = Q, re = Math.max(0.01, q - Q), te = Math.round((B - G) / 1e3), de = qe(G, m, { includeSeconds: !0 }), be = qe(B, m, { includeSeconds: !0 }), ve = (ke) => {
            var X;
            ke.preventDefault(), ke.stopPropagation();
            const _e = (X = E.current) == null ? void 0 : X.querySelector(".director-track-timeline");
            let D = null;
            if (_e) {
              const me = _e.getBoundingClientRect(), we = Math.max(0, Math.min(1, (ke.clientX - me.left) / me.width));
              D = Math.round(h + we * o);
            }
            v({
              s: G,
              e: B,
              x: ke.clientX,
              y: ke.clientY,
              targetDisplay: W,
              dispNumber: S,
              dispLabel: U,
              isOverride: F,
              clickEpoch: D
            });
          }, ie = (S - 1) % 4 + 1;
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `director-segment-block disp-theme-${ie} ${F ? "is-override" : "is-auto"} ${ee ? "is-active-at-playhead" : ""}`,
              style: {
                left: `${Y}%`,
                width: `${re}%`
              },
              title: `Screen ${S} (${U}) • ${de} - ${be} (${te}s) • ${F ? "Manual Override" : "Auto-Director"} • Right-click to edit`,
              onClick: ve,
              onContextMenu: ve,
              children: [
                re >= 2.5 ? /* @__PURE__ */ s.jsxs("span", { className: "segment-screen-badge", children: [
                  F && /* @__PURE__ */ s.jsx("span", { className: "override-indicator", children: "✋" }),
                  /* @__PURE__ */ s.jsx("span", { className: "screen-num", children: `🖥 ${S}` })
                ] }) : re >= 0.8 ? /* @__PURE__ */ s.jsxs("span", { className: "segment-screen-badge mini", children: [
                  F && /* @__PURE__ */ s.jsx("span", { className: "override-dot", children: "•" }),
                  /* @__PURE__ */ s.jsx("span", { className: "screen-num", children: S })
                ] }) : null,
                ee && /* @__PURE__ */ s.jsx("span", { className: "playhead-indicator-dot" })
              ]
            },
            `${G}-${B}-${z}`
          );
        }) }),
        $ && /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "director-context-menu",
            style: {
              position: "fixed",
              left: `${Math.min(window.innerWidth - 240, Math.max(10, $.x))}px`,
              top: `${Math.min(window.innerHeight - 260, Math.max(10, $.y))}px`,
              zIndex: 99999
            },
            onClick: (A) => A.stopPropagation(),
            onContextMenu: (A) => {
              A.preventDefault(), A.stopPropagation();
            },
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
                /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: $.isOverride ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR" }),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "menu-close-x",
                    onClick: () => v(null),
                    children: "✕"
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "menu-segment-info", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "info-time", children: [
                  qe($.s, m, { includeSeconds: !0 }),
                  " - ",
                  qe($.e, m, { includeSeconds: !0 })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "info-duration", children: [
                  Math.round(($.e - $.s) / 1e3),
                  "s • Current: Screen ",
                  $.dispNumber
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "menu-section-label", children: "SWITCH THIS SEGMENT TO:" }),
              /* @__PURE__ */ s.jsx("div", { className: "menu-options-list", children: j.map((A) => {
                const z = A.id === $.targetDisplay;
                return /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `menu-item-btn disp-btn ${z ? "active" : ""}`,
                    onClick: () => {
                      const G = Math.round(($.s + $.e) / 2);
                      d == null || d(e, G, A.id), v(null);
                    },
                    children: [
                      /* @__PURE__ */ s.jsxs("span", { className: "btn-label", children: [
                        "🖥️ Screen ",
                        A.number,
                        " (",
                        A.label,
                        ")"
                      ] }),
                      z && /* @__PURE__ */ s.jsx("span", { className: "menu-check", children: "✓ Active" })
                    ]
                  },
                  A.id
                );
              }) }),
              /* @__PURE__ */ s.jsx("div", { className: "menu-divider" }),
              /* @__PURE__ */ s.jsxs("div", { className: "menu-actions", children: [
                $.isOverride && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "menu-item-btn btn-reset-auto",
                    onClick: () => {
                      const A = Math.round(($.s + $.e) / 2);
                      y == null || y(e, A), v(null);
                    },
                    children: "⚡ Revert to Auto-Director"
                  }
                ),
                $.clickEpoch && $.clickEpoch > $.s + 1e3 && $.clickEpoch < $.e - 1e3 && /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "menu-item-btn btn-split",
                    onClick: () => {
                      c == null || c(e, $.clickEpoch), v(null);
                    },
                    children: [
                      "✂️ Split here (",
                      qe($.clickEpoch, m, { includeSeconds: !0 }),
                      ")"
                    ]
                  }
                ),
                g > $.s + 500 && g < $.e - 500 && /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "menu-item-btn btn-split",
                    onClick: () => {
                      c == null || c(e, g), v(null);
                    },
                    children: [
                      "✂️ Split at Playhead (",
                      qe(g, m, { includeSeconds: !0 }),
                      ")"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function Hg({
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
  isAutoFollow: y = !1,
  timeMode: f = "LOCAL"
}) {
  const m = u.useRef(null), [x, w] = u.useState(null), [E, $] = u.useState(1), [v, g] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_track_expanded") === "true";
    } catch {
      return !1;
    }
  }), [h, k] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const R = (Z) => {
      Z.detail && k(Z.detail);
    };
    return window.addEventListener("itb-live-audio-level", R), () => window.removeEventListener("itb-live-audio-level", R);
  }, []);
  const M = u.useCallback(() => {
    g((R) => {
      const Z = !R;
      try {
        localStorage.setItem("itb_audio_track_expanded", String(Z));
      } catch {
      }
      return Z;
    });
  }, []), j = u.useMemo(() => {
    var Z;
    if (e != null && e.segments && e.segments.length > 0)
      return e.segments;
    const R = ((Z = t[0]) == null ? void 0 : Z.id) || "station-0";
    return [
      {
        startEpochMs: l,
        endEpochMs: l + r * 2,
        sourceStationId: R,
        gain: 1
      }
    ];
  }, [e, t, l, r]), N = l + o, b = l + n, C = b + r, I = u.useMemo(() => !j || j.length === 0 ? null : j.find((R) => {
    const Z = R.startEpochMs ?? R.StartEpochMs ?? 0, Q = R.endEpochMs ?? R.EndEpochMs ?? 0;
    return Z <= N && N <= Q;
  }) || j[0], [j, N]), _ = (I == null ? void 0 : I.sourceStationId) ?? (I == null ? void 0 : I.SourceStationId) ?? "", K = u.useMemo(() => t.find((R) => R.id === _) || null, [t, _]), A = K ? K.displayName || K.hostname || K.id : _ === "MUTE" ? "MUTED" : _, z = (I == null ? void 0 : I.gain) ?? (I == null ? void 0 : I.Gain) ?? 1, G = u.useMemo(() => {
    if (!I) return "";
    const R = I.startEpochMs ?? I.StartEpochMs ?? 0;
    return qe(R, f, { includeSeconds: !0 });
  }, [I, f]), B = u.useMemo(() => {
    if (!I) return "";
    const R = I.endEpochMs ?? I.EndEpochMs ?? 0;
    return qe(R, f, { includeSeconds: !0 });
  }, [I, f]), W = u.useMemo(() => j.filter((R) => {
    const Z = R.startEpochMs ?? R.StartEpochMs ?? 0;
    return (R.endEpochMs ?? R.EndEpochMs ?? 0) > b && Z < C;
  }), [j, b, C]);
  u.useEffect(() => {
    if (!x) return;
    const R = () => w(null), Z = (Q) => {
      Q.key === "Escape" && w(null);
    };
    return window.addEventListener("click", R), window.addEventListener("keydown", Z), () => {
      window.removeEventListener("click", R), window.removeEventListener("keydown", Z);
    };
  }, [x]);
  const S = (R) => {
    if (R == null || R.stopPropagation(), !I) return;
    const Z = I.startEpochMs ?? I.StartEpochMs ?? 0, Q = I.endEpochMs ?? I.EndEpochMs ?? 0;
    N > Z + 500 && N < Q - 500 && (i == null || i(N), w(null));
  }, U = (R, Z, Q, q, Y = 1) => {
    var _e;
    R.preventDefault(), R.stopPropagation();
    const re = (_e = m.current) == null ? void 0 : _e.querySelector(".audio-track-timeline");
    let te = null;
    if (re) {
      const D = re.getBoundingClientRect(), X = Math.max(0, Math.min(1, (R.clientX - D.left) / D.width));
      te = Math.round(b + X * r);
    }
    const de = typeof Y == "number" && Y >= 0 ? Y : 1;
    $(de);
    const be = 290, ve = 440;
    let ie = R.clientX - 60;
    ie + be > window.innerWidth - 16 && (ie = window.innerWidth - be - 16), ie < 16 && (ie = 16);
    let ke;
    R.clientY > window.innerHeight * 0.45 ? ke = R.clientY - ve - 12 : ke = R.clientY + 12, ke < 16 && (ke = 16), ke + ve > window.innerHeight - 16 && (ke = Math.max(16, window.innerHeight - ve - 16)), w({
      s: Z,
      e: Q,
      x: ie,
      y: ke,
      currentStationId: q,
      currentGain: de,
      clickEpoch: te
    });
  }, F = (R) => {
    const Z = Math.max(0, Math.min(2.5, Number(R)));
    $(Z), x && (c == null || c(x.s, Z), pg(Z));
  }, ee = u.useMemo(() => {
    if (!h.isPlaying || h.rms < 5e-3)
      return [2, 2, 2, 2];
    const R = h.rms, Z = h.peak;
    return [
      Math.min(100, Math.max(15, Math.round(R * 125))),
      Math.min(100, Math.max(22, Math.round(Z * 130))),
      Math.min(100, Math.max(10, Math.round(R * 105))),
      Math.min(100, Math.max(28, Math.round(Z * 145)))
    ];
  }, [h]);
  return !t || t.length === 0 ? null : /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-routing-track-container ${v ? "is-expanded-track" : "is-compact-track"}`,
      "aria-label": "Audio Routing Track",
      ref: m,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "label-top-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🎙️" }),
            /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO" }),
            /* @__PURE__ */ s.jsxs(
              "span",
              {
                className: `audio-active-badge ${_ === "MUTE" ? "is-muted" : "is-active"}`,
                title: `Active audio source: ${A} [${G} - ${B}] • Gain: ${Math.round(z * 100)}% (${z > 0 ? (20 * Math.log10(z)).toFixed(1) + "dB" : "Mute"})`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "badge-live-vu", title: `Real-time Level: ${h.db.toFixed(1)} dB (RMS: ${Math.round(h.rms * 100)}%)`, children: /* @__PURE__ */ s.jsx(
                    "span",
                    {
                      className: "vu-meter-bar",
                      style: {
                        height: `${Math.min(100, Math.max(10, h.rms * 115))}%`,
                        background: h.db > -3 ? "#F43F5E" : h.db > -9 ? "#F59E0B" : "#10B981"
                      }
                    }
                  ) }),
                  /* @__PURE__ */ s.jsx("span", { className: "badge-text", children: _ === "MUTE" ? "MUTED" : A.toUpperCase() }),
                  z !== 1 && /* @__PURE__ */ s.jsxs("span", { className: "badge-gain-tag", children: [
                    Math.round(z * 100),
                    "%"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "audio-track-actions", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-audio-mini-action expand-toggle ${v ? "active" : ""}`,
                  onClick: M,
                  title: v ? "Collapse Audio Track to Compact (26px)" : "Expand Audio Track & Waveforms (74px)",
                  children: v ? "▲" : "▼"
                }
              ),
              d && t.length > 1 && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-audio-mini-action ${y ? "active" : ""}`,
                  onClick: d,
                  title: "Automatically route audio to whichever station is in active visual focus",
                  children: "🎯"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-audio-mini-action",
                  onClick: S,
                  title: "Split Audio Track at Playhead (✂️)",
                  children: "✂️"
                }
              )
            ] })
          ] }),
          v && /* @__PURE__ */ s.jsxs("div", { className: "label-bottom-expanded-meter", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "vu-scale-container", children: [
              /* @__PURE__ */ s.jsx("span", { className: "vu-db-readout", children: h.isPlaying ? `${h.db.toFixed(1)} dB` : "IDLE" }),
              /* @__PURE__ */ s.jsx("div", { className: "vu-led-track", children: /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "vu-led-fill",
                  style: {
                    width: `${Math.min(100, Math.max(0, h.rms * 120))}%`,
                    background: h.db > -3 ? "#F43F5E" : h.db > -9 ? "#F59E0B" : "#10B981"
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ s.jsxs("span", { className: "vu-gain-label", children: [
              "MASTER: ",
              Math.round(z * 100),
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "audio-track-timeline", children: W.map((R, Z) => {
          const Q = R.startEpochMs ?? R.StartEpochMs ?? 0, q = R.endEpochMs ?? R.EndEpochMs ?? 0, Y = R.sourceStationId ?? R.SourceStationId ?? "", re = R.gain ?? R.Gain ?? 1, te = t.find((D) => D.id === Y), de = te ? te.displayName || te.hostname || te.id : Y === "MUTE" ? "MUTED" : Y, be = Math.max(0, (Q - b) / r * 100), ve = Math.min(100, (q - b) / r * 100), ie = Math.max(0.1, ve - be), ke = I && (I.startEpochMs ?? I.StartEpochMs) === Q, _e = re > 0 ? (20 * Math.log10(re)).toFixed(1) + " dB" : "-∞ dB";
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `audio-segment-block ${ke ? "is-current" : ""} ${Y === "MUTE" ? "is-muted" : ""} ${v ? "is-expanded" : ""}`,
              style: {
                left: `${be}%`,
                width: `${ie}%`
              },
              onClick: (D) => U(D, Q, q, Y, re),
              onContextMenu: (D) => U(D, Q, q, Y, re),
              title: `Audio Source: ${de} [${qe(Q, f, { includeSeconds: !0 })} - ${qe(q, f, { includeSeconds: !0 })}] • Gain: ${Math.round(re * 100)}% (${_e}) — Right-click for Gain Scale & Settings`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "audio-segment-waveform-surface", children: /* @__PURE__ */ s.jsx(
                  "svg",
                  {
                    className: "audio-waveform-svg",
                    viewBox: "0 0 200 40",
                    preserveAspectRatio: "none",
                    children: Y === "MUTE" || re === 0 ? (
                      // Muted flat baseline
                      /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "20", x2: "200", y2: "20", stroke: "#F43F5E", strokeWidth: "1.5", strokeDasharray: "3 3", opacity: "0.6" })
                    ) : (
                      // Realistic Speech & Signal Waveform Peaks (Scaled by Segment Gain)
                      /* @__PURE__ */ s.jsxs("g", { className: "waveform-peaks", opacity: "0.85", children: [
                        Array.from({ length: 50 }).map((D, X) => {
                          const me = X / 50 * 200 + 2, we = Math.sin(Q / 1e3 + X * 0.7) * 1e4, Xe = Math.abs(we - Math.floor(we)), Ne = Math.sin(X * 0.25) * 0.4 + 0.6, le = (0.15 + Xe * 0.85) * Ne, Ie = Math.min(1, le * re), ce = Math.max(2, Ie * 18), Be = 20 - ce, Me = 20 + ce;
                          return /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: me,
                              y1: Be,
                              x2: me,
                              y2: Me,
                              stroke: re > 1.05 ? "#F59E0B" : ke ? "#34D399" : "#10B981",
                              strokeWidth: "2.5",
                              strokeLinecap: "round",
                              opacity: ke ? 0.95 : 0.75
                            },
                            `wave_bar_${X}`
                          );
                        }),
                        /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "20", x2: "200", y2: "20", stroke: "rgba(255,255,255,0.2)", strokeWidth: "0.5", strokeDasharray: "2 2" })
                      ] })
                    )
                  }
                ) }),
                /* @__PURE__ */ s.jsxs("div", { className: "audio-wave-anim", children: [
                  /* @__PURE__ */ s.jsx(
                    "span",
                    {
                      className: "bar b1",
                      style: {
                        height: ke ? `${ee[0]}%` : "20%",
                        background: h.db > -4 ? "#F43F5E" : h.db > -9 ? "#F59E0B" : "#10B981"
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "span",
                    {
                      className: "bar b2",
                      style: {
                        height: ke ? `${ee[1]}%` : "35%",
                        background: h.db > -4 ? "#F43F5E" : h.db > -9 ? "#F59E0B" : "#10B981"
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "span",
                    {
                      className: "bar b3",
                      style: {
                        height: ke ? `${ee[2]}%` : "15%",
                        background: h.db > -4 ? "#F43F5E" : h.db > -9 ? "#F59E0B" : "#10B981"
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "span",
                    {
                      className: "bar b4",
                      style: {
                        height: ke ? `${ee[3]}%` : "40%",
                        background: h.db > -4 ? "#F43F5E" : h.db > -9 ? "#F59E0B" : "#10B981"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "audio-segment-meta-group", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "audio-segment-label", children: Y === "MUTE" ? "🔇 MUTED" : `🎙️ ${de.toUpperCase()}` }),
                  re !== 1 && /* @__PURE__ */ s.jsxs("span", { className: `audio-segment-gain-badge ${re > 1 ? "is-boost" : "is-cut"}`, children: [
                    re > 1 ? `▲ ${_e}` : `▼ ${_e}`,
                    " (",
                    Math.round(re * 100),
                    "%)"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { className: "audio-segment-time", children: [
                  Math.round((q - Q) / 1e3),
                  "s"
                ] })
              ]
            },
            `audio_seg_${Z}_${Q}`
          );
        }) }),
        x && /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "audio-segment-context-menu",
            style: {
              position: "fixed",
              left: `${x.x}px`,
              top: `${x.y}px`,
              width: "290px",
              maxHeight: "calc(100vh - 32px)",
              overflowY: "auto",
              zIndex: 99999
            },
            onClick: (R) => R.stopPropagation(),
            onContextMenu: (R) => {
              R.preventDefault(), R.stopPropagation();
            },
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
                /* @__PURE__ */ s.jsx("span", { className: "menu-icon", children: "🎚️" }),
                /* @__PURE__ */ s.jsx("span", { children: "AUDIO SEGMENT & GAIN CONTROLLER" }),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "menu-close-x",
                    onClick: () => w(null),
                    title: "Close menu (Esc)",
                    style: { marginLeft: "auto", background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: "11px" },
                    children: "✕"
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "menu-segment-info", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "info-time", title: "Segment Start and End Time", children: [
                  "⏱️ ",
                  qe(x.s, f, { includeSeconds: !0 }),
                  " - ",
                  qe(x.e, f, { includeSeconds: !0 })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "info-duration", title: "Segment Duration", children: [
                  "⏳ ",
                  Math.round((x.e - x.s) / 1e3),
                  "s duration"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "menu-gain-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "gain-header-row", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "gain-label", children: "🔊 VOLUME GAIN SCALE:" }),
                  /* @__PURE__ */ s.jsxs("span", { className: `gain-readout ${E > 1 ? "is-boost" : E === 0 ? "is-mute" : "is-normal"}`, children: [
                    E > 1 ? "🚀 " : E === 0 ? "🔇 " : "🎚️ ",
                    Math.round(E * 100),
                    "% (",
                    E > 0 ? (20 * Math.log10(E)).toFixed(1) + " dB" : "-∞ dB",
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx("p", { className: "gain-subtitle", children: "Calibrate volume for this slice. Applied live to playback and encoded into export MP4." }),
                /* @__PURE__ */ s.jsxs("div", { className: "gain-slider-wrapper", children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "range",
                      min: "0",
                      max: "2.5",
                      step: "0.05",
                      value: E,
                      onChange: (R) => F(R.target.value),
                      className: "gain-range-slider",
                      title: `Adjust Audio Volume Gain: ${Math.round(E * 100)}% (${E > 0 ? (20 * Math.log10(E)).toFixed(1) + " dB" : "-∞ dB"})`
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "gain-ticks-scale", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tick", onClick: () => F(0), title: "Mute (0% / -∞ dB)", children: "0%" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tick", onClick: () => F(0.5), title: "Cut 50% (-6 dB)", children: "-6dB" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tick center", onClick: () => F(1), title: "Unity Gain (100% / 0 dB)", children: "0dB (100%)" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tick", onClick: () => F(1.41), title: "Boost +3 dB (141%)", children: "+3dB" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tick", onClick: () => F(2), title: "Boost +6 dB (200%)", children: "+6dB" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tick", onClick: () => F(2.5), title: "Max Boost +8 dB (250%)", children: "+8dB" })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "gain-presets-row", children: [
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `btn-gain-preset ${E === 0 ? "active" : ""}`,
                      onClick: () => F(0),
                      title: "Mute audio on this segment (0% / -∞ dB)",
                      children: "🔇 Mute"
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `btn-gain-preset ${Math.abs(E - 0.5) < 0.05 ? "active" : ""}`,
                      onClick: () => F(0.5),
                      title: "Attenuate volume by 50% (-6.0 dB) for loud passages",
                      children: "🔉 -6 dB"
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `btn-gain-preset unity ${Math.abs(E - 1) < 0.05 ? "active" : ""}`,
                      onClick: () => F(1),
                      title: "Reset volume to original unity recording level (100% / 0.0 dB)",
                      children: "⚖️ 0 dB (100%)"
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `btn-gain-preset ${Math.abs(E - 1.41) < 0.05 ? "active" : ""}`,
                      onClick: () => F(1.41),
                      title: "Boost volume by 141% (+3.0 dB) for clearer speech",
                      children: "🔊 +3 dB"
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `btn-gain-preset ${Math.abs(E - 2) < 0.05 ? "active" : ""}`,
                      onClick: () => F(2),
                      title: "Double volume (+6.0 dB / 200%) for quiet microphones",
                      children: "🚀 +6 dB"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "menu-stations-list", children: [
                /* @__PURE__ */ s.jsx("div", { className: "sub-header", children: "🖥️ ROUTE AUDIO FROM WORKSTATION:" }),
                t.map((R) => {
                  const Z = x.currentStationId === R.id, Q = R.displayName || R.hostname || R.id;
                  return /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-station-option ${Z ? "selected" : ""}`,
                      onClick: () => {
                        a == null || a(x.s, R.id), w(null);
                      },
                      title: `Route live audio from ${Q} during this segment`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                        /* @__PURE__ */ s.jsxs("span", { className: "name", children: [
                          "🖥️ ",
                          Q
                        ] }),
                        Z && /* @__PURE__ */ s.jsx("span", { className: "check", children: "✓" })
                      ]
                    },
                    R.id
                  );
                }),
                /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-option mute-option ${x.currentStationId === "MUTE" ? "selected" : ""}`,
                    onClick: () => {
                      a == null || a(x.s, "MUTE"), w(null);
                    },
                    title: "Mute all workstation audio during this segment",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "dot mute" }),
                      /* @__PURE__ */ s.jsx("span", { className: "name", children: "🔇 MUTE INTERVAL" }),
                      x.currentStationId === "MUTE" && /* @__PURE__ */ s.jsx("span", { className: "check", children: "✓" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "menu-footer", children: [
                x.clickEpoch && x.clickEpoch > x.s + 500 && x.clickEpoch < x.e - 500 && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-menu-split",
                    onClick: () => {
                      i == null || i(x.clickEpoch), w(null);
                    },
                    title: "Split this audio block at the clicked time to route different stations or gains",
                    children: /* @__PURE__ */ s.jsxs("span", { children: [
                      "✂️ SPLIT AT CLICK (",
                      qe(x.clickEpoch, f, { includeSeconds: !0 }),
                      ")"
                    ] })
                  }
                ),
                N > x.s + 500 && N < x.e - 500 && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-menu-split",
                    onClick: () => {
                      i == null || i(N), w(null);
                    },
                    title: "Split this audio block at the current playhead position",
                    children: /* @__PURE__ */ s.jsxs("span", { children: [
                      "✂️ SPLIT AT PLAYHEAD (",
                      qe(N, f, { includeSeconds: !0 }),
                      ")"
                    ] })
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function Vg({
  canvasLayoutTimeline: e,
  activeKfIndex: t = 0,
  onSelectKeyframe: n,
  onAddKeyframeAtEpoch: r,
  onDeleteKeyframe: l,
  onUpdateKeyframeEpoch: o,
  viewportStartMs: i = 0,
  viewportDurationMs: a = 36e5,
  baseEpochMs: c = 0,
  totalDurationMs: d = 36e5,
  playheadMs: y = 0,
  timeMode: f = "LOCAL"
}) {
  const m = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [x, w] = u.useState(null), E = c + y, $ = c + i, v = $ + a, g = (k) => {
    const M = k.currentTarget.getBoundingClientRect(), j = k.clientX - M.left, N = Math.max(0, Math.min(1, j / M.width)), b = Math.round($ + N * a);
    r && r(b);
  }, h = (k, M, j) => {
    if (k.button !== 0) return;
    k.stopPropagation(), k.preventDefault();
    const N = k.clientX, b = j.timestampEpochMs, C = j.id || `kf_${M}_${b}`, I = k.currentTarget.closest(".track-surface");
    if (!I) return;
    let _ = !1;
    w({
      idx: M,
      kfId: C,
      startClientX: N,
      initialEpoch: b,
      currentEpoch: b
    });
    const K = (z) => {
      const G = z.clientX - N;
      Math.abs(G) > 3 && (_ = !0);
      const B = I.getBoundingClientRect(), W = G / B.width * a;
      let S = Math.round(b + W);
      S = Math.max(c, Math.min(c + d, S)), w((U) => U ? { ...U, currentEpoch: S } : null);
    }, A = (z) => {
      window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", A), w(null);
      const G = I.getBoundingClientRect(), W = (z.clientX - N) / G.width * a;
      let S = Math.round(b + W);
      S = Math.max(c, Math.min(c + d, S)), _ ? (o && o(C, S), n && n(M, S)) : n && n(M, b);
    };
    window.addEventListener("mousemove", K), window.addEventListener("mouseup", A);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        m.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (k) => {
            k.stopPropagation(), r && r(E);
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
        onClick: g,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          m.map((k, M) => {
            const j = (x == null ? void 0 : x.idx) === M, N = j ? x.currentEpoch : k.timestampEpochMs;
            if (N < $ - 5e4 || N > v + 5e4) return null;
            const b = (N - $) / a * 100;
            if (b < -2 || b > 102) return null;
            const C = M === t, I = qe(N, f, { includeSeconds: !0 }), _ = `${k.transitionType || "smooth"} (${k.transitionDurationSec ?? 0.5}s)`, K = Math.max(0, (N - c) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${C ? "is-active" : ""} ${j ? "is-dragging" : ""}`,
                style: { left: `${b}%` },
                onMouseDown: (A) => h(A, M, k),
                onContextMenu: (A) => {
                  A.preventDefault(), A.stopPropagation(), m.length > 1 && l && l(M);
                },
                title: `Keyframe #${M + 1} at ${I} (+${K}s) • ${_}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  j && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: I }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      K,
                      "s"
                    ] })
                  ] })
                ]
              },
              `kf-${M}`
            );
          })
        ]
      }
    )
  ] });
}
function Kg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: i = 36e5,
  onStartDrag: a
}) {
  const c = (C) => !r || r <= 0 ? "0%" : `${(C - n) / r * 100}%`, d = (o - n) / r * 100, y = (i - n) / r * 100, f = (l - n) / r * 100, m = f >= -0.2 && f <= 100.2, x = Math.max(0, Math.min(100, f)), w = Math.max(0, d), E = Math.min(100, y), $ = Math.max(0, E - w), v = (C) => (I) => {
    I.preventDefault(), I.stopPropagation(), typeof a == "function" && a(C, I);
  }, g = d < 1.5, h = y > 98.5, k = d <= 0.2 && d >= -0.2, M = y >= 99.8 && y <= 100.2, j = f >= -0.2 && f < 3.5, N = f > 96.5 && f <= 100.2, b = u.useMemo(() => qe(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    $ > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${w}%`, width: `${$}%` },
        onMouseDown: v("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${g ? "flipped" : ""} ${k ? "at-edge" : ""}`,
        style: { left: c(o) },
        onMouseDown: v("in"),
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
        className: `marker out-marker ${h ? "flipped" : ""} ${M ? "at-edge" : ""}`,
        style: { left: c(i) },
        onMouseDown: v("out"),
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
        style: { left: `${x}%` },
        onMouseDown: v("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${j ? "edge-left" : ""} ${N ? "edge-right" : ""}`, children: b }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const Gg = ao.memo(Kg);
function Yg({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const f = (m) => {
      m.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, l]), !e) return null;
  const i = 210, a = 150, c = Math.min(e.x, window.innerWidth - i - 12), d = Math.min(e.y, window.innerHeight - a - 12), y = /* @__PURE__ */ s.jsxs(
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
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: qe(t + e.targetMs, n) })
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
  return $s.createPortal(y, document.body);
}
function Xg({
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
const Qg = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function Jg({
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
    const y = new AbortController();
    c(!0);
    const f = setTimeout(async () => {
      try {
        const m = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, x = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(m),
          signal: y.signal
        });
        if (x.ok) {
          const w = await x.json();
          i(w), d.current && d.current(w);
        }
      } catch (m) {
        m.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", m);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(f), y.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: a, formatEstimateSize: Qg };
}
function Zg({
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
  getMsFromClientX: y,
  minimapRef: f
}) {
  const [m, x] = u.useState(null), [w, E] = u.useState(null), $ = (v, g) => {
    x(v), E({
      target: v,
      startX: g.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: i,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!m) return;
    const v = e * 0.015, g = (k) => {
      if (m === "minimap-viewport" && (f != null && f.current)) {
        const j = f.current.getBoundingClientRect(), b = Math.max(0, Math.min(k.clientX - j.left, j.width)) / j.width * t, C = Math.max(0, Math.min(b - e / 2, t - e));
        d(C);
        return;
      }
      const M = y(k.clientX);
      if (m === "playhead") {
        let j = M;
        Math.abs(j - l) <= v ? j = l : Math.abs(j - i) <= v && (j = i), r(Math.max(0, Math.min(t, j)));
      } else if (m === "in") {
        const j = i - 1e3;
        o(Math.max(0, Math.min(M, j)));
      } else if (m === "out") {
        const j = l + 1e3;
        a(Math.min(t, Math.max(M, j)));
      } else if (m === "range" && w) {
        const j = M - y(w.startX), N = w.initialOut - w.initialIn;
        let b = w.initialIn + j, C = w.initialOut + j;
        b < 0 ? (b = 0, C = N) : C > t && (C = t, b = t - N), o(b), a(C);
      }
    }, h = () => {
      x(null), E(null);
    };
    return window.addEventListener("mousemove", g), window.addEventListener("mouseup", h), () => {
      window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", h);
    };
  }, [
    m,
    w,
    y,
    l,
    i,
    n,
    t,
    e,
    r,
    o,
    a,
    d,
    f
  ]), { draggingTarget: m, handleStartDrag: $ };
}
const Dr = 8;
function hp({
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
  zoomLevel: y = 1,
  _onZoomChange: f,
  onZoomReset: m,
  playheadMs: x = 0,
  setPlayheadMs: w,
  inPointMs: E = 0,
  setInPointMs: $,
  outPointMs: v = 36e5,
  setOutPointMs: g,
  onExport: h,
  recordingSegments: k = {},
  movieBoundaries: M,
  viewportStartMs: j = 0,
  onViewportStartChange: N,
  onEstimateLoaded: b,
  onFitRange: C,
  onJumpViewportTo: I,
  keystrokeMode: _ = "BURN_IN",
  onChangeKeystrokeMode: K,
  keystrokes: A = [],
  showKeystrokes: z = !1,
  showRulerKeystrokes: G = !1,
  onToggleRulerKeystrokes: B,
  onSplitDirectorSegment: W,
  onChangeDirectorSegmentDisplay: S,
  onResetDirectorSegmentToAuto: U,
  audioRoutingPlan: F,
  onSplitAudioSegment: ee,
  onChangeAudioSegmentStation: R,
  onChangeAudioSegmentGain: Z,
  onFollowVisualFeed: Q,
  isAutoFollowAudio: q,
  canvasLayoutTimeline: Y,
  activeKfIndex: re = 0,
  onSelectKeyframe: te,
  onAddKeyframeAtEpoch: de,
  onDeleteKeyframe: be,
  onUpdateKeyframeEpoch: ve
}) {
  var bt, _t, Ut;
  const [ie, ke] = u.useState(null), [_e, D] = u.useState(0), [X, me] = u.useState(null), we = u.useRef(null), Xe = u.useRef(null), Ne = d / Math.max(1, y), le = Math.ceil(e.length / Dr) || 1, Ie = u.useMemo(() => {
    const ge = _e * Dr;
    return e.slice(ge, ge + Dr);
  }, [e, _e]);
  u.useEffect(() => {
    if (!t) return;
    const ge = e.findIndex((Nt) => Nt.id === t);
    if (ge !== -1) {
      const Nt = Math.floor(ge / Dr);
      Nt !== _e && D(Nt);
    }
  }, [t, e, _e]);
  const ce = ((bt = Y == null ? void 0 : Y.keyframes) == null ? void 0 : bt[re]) || ((_t = Y == null ? void 0 : Y.keyframes) == null ? void 0 : _t[0]), Be = u.useMemo(() => {
    var ge;
    return ((ge = ce == null ? void 0 : ce.layout) == null ? void 0 : ge.placements) || [];
  }, [ce]), Me = u.useMemo(() => e.find((ge) => ge.id === t) || null, [e, t]), Ye = (M == null ? void 0 : M.globalFirstMs) ?? null, je = (M == null ? void 0 : M.globalLastMs) ?? null, ut = u.useMemo(() => (E > 500 || v < d - 500) && v - E >= 1e3, [E, v, d]), Ue = u.useMemo(() => e.map((ge) => ge.id).sort().join(","), [e]), { estimateData: xt, isEstimating: yt, formatEstimateSize: Pe } = Jg({
    stationIdsKey: Ue,
    inPointMs: E,
    outPointMs: v,
    baseEpochMs: a,
    onEstimateLoaded: b
  }), dt = u.useCallback((ge) => {
    if (!we.current) return j;
    const Nt = we.current.getBoundingClientRect(), Qe = Nt.left + 180, gt = Nt.width - 180 - 58;
    if (gt <= 0) return j;
    const fn = Math.max(0, Math.min(ge - Qe, gt));
    return Math.round(j + fn / gt * Ne);
  }, [j, Ne]), { draggingTarget: Qt, handleStartDrag: ns } = Zg({
    viewportDurationMs: Ne,
    totalDurationMs: d,
    playheadMs: x,
    setPlayheadMs: w,
    inPointMs: E,
    setInPointMs: $,
    outPointMs: v,
    setOutPointMs: g,
    viewportStartMs: j,
    setViewportStartMs: N,
    getMsFromClientX: dt,
    minimapRef: Xe
  }), Bn = e.length > 0 && Math.abs(v - E) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: we,
      className: "timeline-board-root",
      onContextMenu: (ge) => {
        var Qe;
        ge.preventDefault();
        const Nt = (Qe = we.current) == null ? void 0 : Qe.getBoundingClientRect();
        !Nt || ge.clientX - Nt.left < 180 || ge.clientX > Nt.right - 58 || me({ x: ge.clientX, y: ge.clientY, targetMs: Math.max(0, Math.min(d, dt(ge.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Og,
            {
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: E,
              setInPointMs: $,
              outPointMs: v,
              setOutPointMs: g
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                Dg,
                {
                  minimapRef: Xe,
                  baseEpochMs: a,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: j,
                  viewportDurationMs: Ne,
                  zoomLevel: y,
                  inPointMs: E,
                  outPointMs: v,
                  playheadMs: x,
                  onStartDragMinimap: ns
                }
              ),
              /* @__PURE__ */ s.jsx(
                Pg,
                {
                  earliestMediaMs: Ye,
                  latestMediaMs: je,
                  hasActiveCut: ut,
                  onJumpToFirst: () => {
                    Ye !== null && (w == null || w(Ye), I == null || I(Ye, "start"));
                  },
                  onJumpToLast: () => {
                    je !== null && (w == null || w(je), I == null || I(je, "end"));
                  },
                  onContextualFit: () => {
                    ut ? C == null || C(E, v) : Ye !== null && je !== null && je > Ye ? C == null || C(Ye, je) : m == null || m();
                  },
                  onResetZoom: m,
                  baseEpochMs: a,
                  timeMode: c,
                  keystrokeMode: _,
                  onChangeKeystrokeMode: K,
                  showRulerKeystrokes: G,
                  onToggleRulerKeystrokes: B
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              Lg,
              {
                baseEpochMs: a,
                timeMode: c,
                viewportStartMs: j,
                viewportDurationMs: Ne,
                totalDurationMs: d,
                hoverMs: ie,
                onHoverChange: ke,
                onSeek: (ge) => w == null ? void 0 : w(ge),
                inPointMs: E,
                outPointMs: v,
                earliestMediaMs: Ye,
                movieBoundaries: M,
                stationHostname: (Me == null ? void 0 : Me.hostname) || (Me == null ? void 0 : Me.id) || (Me == null ? void 0 : Me.name),
                activeStationName: (Me == null ? void 0 : Me.displayName) || (Me == null ? void 0 : Me.hostname) || (Me == null ? void 0 : Me.name),
                showKeystrokes: !!(G ?? z),
                keystrokes: A
              }
            ) })
          ] })
        ] }),
        le > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: _e === 0,
              onClick: () => D((ge) => Math.max(0, ge - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            _e * Dr + 1,
            "–",
            Math.min(e.length, (_e + 1) * Dr),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: _e >= le - 1,
              onClick: () => D((ge) => Math.min(le - 1, ge + 1)),
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
            onMouseMove: (ge) => {
              if (Qt || !we.current) return;
              const Nt = we.current.getBoundingClientRect();
              ge.clientX >= Nt.left + 180 && ge.clientX <= Nt.right - 58 ? ke(dt(ge.clientX)) : ke(null);
            },
            onMouseLeave: () => !Qt && ke(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                e.length > 0 ? Ie.map((ge) => {
                  var wn;
                  const Nt = ge.id === t, Qe = !!(t && t !== ge.id), gt = ge.displays || ((wn = ge.topology) == null ? void 0 : wn.displays) || [], fn = Be.filter(
                    (Ee) => Ee.stationId === ge.id || ge.hostname && Ee.stationId === ge.hostname
                  ), pn = gt.length > 1 && fn.length >= gt.length, en = o ? o[ge.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsxs(ao.Fragment, { children: [
                    Nt && gt.length > 1 ? gt.map((Ee, Se) => {
                      const We = (Ee.displayId || `mon-${Se}`).toLowerCase(), ht = Ee.displayName || `Screen ${Se + 1}`;
                      return /* @__PURE__ */ s.jsx(
                        Dd,
                        {
                          station: ge,
                          displayId: We,
                          displayLabel: ht,
                          displayNumber: Se + 1,
                          isActive: !0,
                          isCollapsed: !1,
                          onSelect: () => n == null ? void 0 : n(ge.id),
                          onStationContextMenu: r,
                          onDeselectStation: l,
                          viewportStartMs: j,
                          viewportDurationMs: Ne,
                          inPointMs: E,
                          outPointMs: v,
                          baseEpochMs: a,
                          segments: k[ge.id] || k[ge.hostname] || ge.segments || [],
                          recordingSegments: k,
                          globalGaps: (xt == null ? void 0 : xt.removedGlobalGaps) || [],
                          disableFilmstrip: !1
                        },
                        `${ge.id}-${We}`
                      );
                    }) : /* @__PURE__ */ s.jsx(
                      Dd,
                      {
                        station: ge,
                        isActive: Nt || !t,
                        isCollapsed: Qe,
                        onSelect: () => n == null ? void 0 : n(ge.id),
                        onStationContextMenu: r,
                        onDeselectStation: l,
                        viewportStartMs: j,
                        viewportDurationMs: Ne,
                        inPointMs: E,
                        outPointMs: v,
                        baseEpochMs: a,
                        segments: k[ge.id] || k[ge.hostname] || ge.segments || [],
                        recordingSegments: k,
                        globalGaps: (xt == null ? void 0 : xt.removedGlobalGaps) || [],
                        disableFilmstrip: Qe
                      }
                    ),
                    !pn && gt.length > 1 && /* @__PURE__ */ s.jsx(
                      zg,
                      {
                        stationId: ge.id,
                        isAutoDirectorEnabled: en,
                        onToggleAutoDirector: i,
                        directorPlan: ge.directorPlan || {
                          segments: [
                            { startEpochMs: a, endEpochMs: a + d, targetDisplayId: "mon-0", isManualOverride: !1 }
                          ]
                        },
                        viewportStartMs: j,
                        viewportDurationMs: Ne,
                        baseEpochMs: a,
                        playheadMs: x,
                        timeMode: c,
                        availableDisplays: gt,
                        onSplitSegment: W,
                        onChangeSegmentDisplay: S,
                        onResetSegmentToAuto: U
                      }
                    )
                  ] }, ge.id);
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] }),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Hg,
                  {
                    audioPlan: F,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: Ne,
                    baseEpochMs: a,
                    playheadMs: x,
                    onSplitSegment: ee,
                    onChangeSegmentStation: R,
                    onChangeSegmentGain: Z,
                    onFollowVisualFeed: Q,
                    isAutoFollow: q,
                    timeMode: c
                  }
                ),
                ((Ut = Y == null ? void 0 : Y.keyframes) == null ? void 0 : Ut.length) > 0 && /* @__PURE__ */ s.jsx(
                  Vg,
                  {
                    canvasLayoutTimeline: Y,
                    activeKfIndex: re,
                    onSelectKeyframe: te,
                    onAddKeyframeAtEpoch: de,
                    onDeleteKeyframe: be,
                    onUpdateKeyframeEpoch: ve,
                    viewportStartMs: j,
                    viewportDurationMs: Ne,
                    baseEpochMs: a,
                    totalDurationMs: d,
                    playheadMs: x,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                Xg,
                {
                  isRangeValid: Bn,
                  onExport: h,
                  isEstimating: yt,
                  estimateData: xt,
                  formatEstimateSize: Pe,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Gg,
          {
            baseEpochMs: a,
            timeMode: c,
            viewportStartMs: j,
            viewportDurationMs: Ne,
            playheadMs: x,
            inPointMs: E,
            outPointMs: v,
            onStartDrag: ns
          }
        ),
        /* @__PURE__ */ s.jsx(
          Yg,
          {
            contextMenu: X,
            baseEpochMs: a,
            timeMode: c,
            onAction: (ge) => {
              X && (ge === "playhead" ? w == null || w(X.targetMs) : ge === "in" ? $ == null || $(Math.max(0, Math.min(X.targetMs, v - 1e3))) : ge === "out" && (g == null || g(Math.min(d, Math.max(X.targetMs, E + 1e3)))), me(null));
            },
            onClose: () => me(null)
          }
        )
      ]
    }
  );
}
function qg({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function ex({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function tx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function nx({
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
  filterMode: y,
  onFilterModeChange: f,
  filteredCount: m,
  selectedInTabCount: x,
  unselectedInTabCount: w,
  activeTabName: E,
  onSelectAllInScope: $,
  onClearInScope: v,
  viewMode: g = "grid",
  onViewModeChange: h,
  isDrawerMode: k = !1
}) {
  const [M, j] = u.useState(!1), N = y !== "all", b = !E || E.toLowerCase() === "all", C = b ? "Select All" : `Select ${E}`, I = b ? "Clear All" : `Clear ${E}`;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-filter-bar-root ${k ? "is-drawer-compact" : ""}`, children: [
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
      k && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${M ? "open" : ""} ${N ? "has-filter" : ""}`,
          onClick: () => j(!M),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            N && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !k && h && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${g === "grid" ? "active" : ""}`,
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
            className: `btn-view-mode ${g === "table" ? "active" : ""}`,
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
    l.length > 1 && (k ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (_) => i(_.target.value),
          children: l.map((_) => {
            const K = _.id === "all" ? c.map((z) => z.id) : _.stationIds || [], A = K.filter((z) => d.includes(z)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: _.id, children: [
              _.name,
              " (",
              A,
              "/",
              K.length,
              ")"
            ] }, _.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: $, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: v, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        a && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((_) => {
        const K = o === _.id, A = _.id === "all" ? c.map((B) => B.id) : _.stationIds || [], z = A.length, G = A.filter((B) => d.includes(B)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${K ? "active" : ""}`,
            onClick: () => i(_.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: _.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${G > 0 ? "has-selected" : ""}`, children: [
                G,
                "/",
                z
              ] })
            ]
          },
          _.id
        );
      }) })
    ] })),
    (!k || M) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${k ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "all" ? "active" : ""}`,
            onClick: () => f("all"),
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
            className: `filter-pill ${y === "selected" ? "active" : ""}`,
            onClick: () => f("selected"),
            children: [
              "Sel (",
              x,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "unselected" ? "active" : ""}`,
            onClick: () => f("unselected"),
            children: [
              "Unsel (",
              w,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "gaps" ? "active" : ""}`,
            onClick: () => f("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${y === "audio" ? "active" : ""}`,
            onClick: () => f("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !k && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: $, children: [
          "+ ",
          C
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: v, children: [
          "✕ ",
          I
        ] })
      ] })
    ] })
  ] });
}
function sx({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: i = "table"
}) {
  if (r === 0) return null;
  const a = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = i === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], y = t <= 1, f = (m) => {
    if (m === n) return !0;
    const x = Math.min(n, r), w = Math.min(m, r), E = Math.ceil(r / n), $ = Math.ceil(r / m);
    return x !== w || E !== $;
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `hub-pagination-bar ${y ? "is-single-page-mode" : ""}`, children: [
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((m) => {
        const x = n === m, w = !f(m);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${x ? "active" : ""} ${w ? "redundant-disabled" : ""}`,
            disabled: w,
            onClick: () => o(m),
            title: w ? `All stations already fit on screen (Total: ${r})` : `Show ${m} per page`,
            children: m
          },
          m
        );
      }) })
    ] })
  ] });
}
function rx({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, i] = u.useState(!1), a = u.useRef(null);
  u.useEffect(() => {
    const m = (x) => {
      a.current && !a.current.contains(x.target) && i(!1);
    };
    return o && document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [o]);
  const c = u.useMemo(() => {
    const m = new Map(t.map((x) => [x.id, x]));
    return e.map((x) => m.get(x) || { id: x, hostname: `Station ${x}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = c.slice(0, l), y = c.slice(l), f = y.length > 0;
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
        const x = m.displayName || m.hostname || m.name || m.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: x, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: x }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (w) => {
                w.stopPropagation(), n(m.id);
              },
              title: `Remove ${x}`,
              children: "✕"
            }
          )
        ] }, m.id);
      }),
      f && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-container", ref: a, children: [
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: y.map((m) => {
            const x = m.displayName || m.hostname || m.name || m.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: x, children: x }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(m.id),
                  title: `Remove ${x}`,
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
const fp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Pd(e, t, n = fp) {
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
function lx(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (i) => String(i).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function ox(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function ix(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = fp) {
  const { baseEpochMs: l, durationMs: o } = n, i = !!(e != null && e.hasAudio), a = (e == null ? void 0 : e.audioChannels) || (i ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, y = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? ox(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const N = Pd(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: i,
      audioChannels: a,
      resolution: c,
      fps: d,
      fileSize: y,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: N,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const f = l, m = l + o, x = [];
  for (const N of t) {
    const b = Math.max(N.startEpoch, f), C = Math.min(N.endEpoch, m);
    C > b && x.push({ startEpoch: b, endEpoch: C });
  }
  x.sort((N, b) => N.startEpoch - b.endEpoch);
  const w = [];
  for (const N of x)
    if (w.length === 0)
      w.push({ ...N });
    else {
      const b = w[w.length - 1];
      N.startEpoch <= b.endEpoch + 1e3 ? b.endEpoch = Math.max(b.endEpoch, N.endEpoch) : w.push({ ...N });
    }
  let E = 0;
  for (const N of w)
    E += N.endEpoch - N.startEpoch;
  const $ = o > 0 ? E / o * 100 : 0, v = $ > 0 && $ < 1 ? Number($.toFixed(1)) : Math.min(100, Math.round($)), g = [];
  let h = f, k = 0;
  for (const N of w) {
    if (N.startEpoch > h + 2e3) {
      const I = (N.startEpoch - h) / o * 100, _ = (h - f) / o * 100;
      g.push({
        type: "gap",
        startPct: Math.max(0, _),
        widthPct: Math.min(100, I)
      }), k++;
    }
    const b = (N.endEpoch - N.startEpoch) / o * 100, C = (N.startEpoch - f) / o * 100;
    g.push({
      type: "rec",
      startPct: Math.max(0, C),
      widthPct: Math.min(100, b)
    }), h = N.endEpoch;
  }
  if (h < m - 2e3) {
    const N = (m - h) / o * 100, b = (h - f) / o * 100;
    g.push({
      type: "gap",
      startPct: Math.max(0, b),
      widthPct: Math.min(100, N)
    }), k++;
  }
  const M = k > 0 || v < 100, j = Pd(v, M, r);
  return {
    coveragePct: v,
    recordedDuration: lx(E),
    totalRecordedMs: E,
    hasAudio: i,
    audioChannels: a,
    resolution: c,
    fps: d,
    fileSize: y,
    hasGaps: M,
    gapsCount: k,
    trafficStatus: j,
    segments: g.length > 0 ? g : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const ax = Object.freeze([]), cx = 12;
function ux({
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
  onApply: y,
  onOpenRangeModal: f,
  systemTabs: m = ax,
  recordingSegments: x = {},
  baseEpochMs: w = 0,
  durationMs: E = 0
}) {
  const [$, v] = u.useState([]), [g, h] = u.useState("all"), [k, M] = u.useState(""), [j, N] = u.useState(!0), [b, C] = u.useState("all"), [I, _] = u.useState(null), [K, A] = u.useState(!1), [z, G] = u.useState(15), [B, W] = u.useState(8), [S, U] = u.useState(1), F = u.useRef(!1), ee = u.useRef(null), R = c && r.length === 0, Z = r.length === 0 && !c;
  let Q = "is-closed";
  a || Z || R ? Q = "is-full-width" : e && (Q = "is-open"), u.useLayoutEffect(() => {
    const le = () => {
      if (!ee.current) return;
      const ce = ee.current.clientHeight;
      if (ce <= 0) return;
      const Be = ee.current.querySelector(".station-row, .hub-table-row"), Me = Be ? Be.offsetHeight : 40;
      if (Me > 0) {
        const je = Math.floor(ce / Me) - 2, Ue = [5, 10, 15, 20, 25, 30].filter((xt) => xt <= je).pop() || 5;
        G(Ue);
      }
      const Ye = ee.current.clientWidth;
      if (Ye > 0) {
        const Ue = Math.max(1, Math.floor((Ye + 12) / 252)), yt = Math.max(1, Math.floor((ce + 12) / (175 + 12))), Pe = Math.max(Ue * yt, Ue);
        W(Pe);
      }
    };
    le(), window.addEventListener("resize", le);
    const Ie = new ResizeObserver(le);
    return ee.current && Ie.observe(ee.current), () => {
      window.removeEventListener("resize", le), Ie.disconnect();
    };
  }, [I, r.length]), u.useEffect(() => {
    if (m && m.length > 0) {
      v(m);
      return;
    }
    if (F.current || !e && !a) return;
    F.current = !0;
    let le = !0;
    return (async () => {
      A(!0);
      try {
        const ce = await fetch("/api/v1/dashboard/tabs");
        if (ce.ok && le) {
          const Be = await ce.json();
          Array.isArray(Be) && v(Be);
        }
      } catch (ce) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", ce);
      } finally {
        le && A(!1);
      }
    })(), () => {
      le = !1;
    };
  }, [e, a, m]);
  const q = u.useMemo(() => {
    const le = $.length > 0 ? $ : m;
    if (le && le.length > 0) {
      const Ie = le.map((ce) => {
        const Be = ce.hostnames || ce.assignedHostnames || ce.stations || ce.stationIds || [], Me = r.filter((Ye) => {
          const je = (Ye.hostname || Ye.name || "").trim().toLowerCase();
          return Be.some((ut) => typeof ut == "string" ? ut.trim().toLowerCase() === je || je.includes(ut.trim().toLowerCase()) : (ut.hostname || ut.name || "").trim().toLowerCase() === je);
        }).map((Ye) => Ye.id);
        return {
          id: String(ce.id || ce.tabId || ce.name),
          name: ce.name || "Tab",
          stationIds: Me
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((ce) => ce.id) },
        ...Ie.filter((ce) => ce.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((Ie) => Ie.id) }];
  }, [$, m, r]), Y = u.useMemo(() => q.find((le) => le.id === g) || q[0], [q, g]), re = u.useMemo(() => !Y || Y.id === "all" ? r.map((le) => le.id) : Y.stationIds || [], [Y, r]), te = u.useMemo(() => !x || Object.keys(x).length === 0 ? r.filter((le) => le.isLoaded || le.segments && le.segments.length > 0).length : r.filter((le) => x[le.id] !== void 0 || le.isLoaded).length, [r, x]), de = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && te < r.length && Object.keys(x).length > 0), [d, c, r.length, te, x]), be = u.useMemo(() => {
    const le = /* @__PURE__ */ new Map(), Ie = { baseEpochMs: w, durationMs: E };
    for (const ce of r) {
      const Me = !(x && x[ce.id] !== void 0 || ce.isLoaded === !0 || ce.segments && ce.segments.length > 0) && (de || c || d), Ye = x && x[ce.id] || ce.segments || [], je = ix(ce, Ye, Ie);
      le.set(ce.id, {
        ...je,
        hasAudio: ce.hasAudio !== void 0 ? ce.hasAudio : je == null ? void 0 : je.hasAudio,
        audioLabel: ce.audioLabel || (ce.hasAudio ? "AAC" : (je == null ? void 0 : je.audioLabel) || "NONE"),
        audioChannels: ce.audioChannels ? ce.audioChannels === 1 ? "Mono" : "Stereo" : je == null ? void 0 : je.audioChannels,
        feedSpec: ce.feedSpec || (je == null ? void 0 : je.feedSpec) || `${ce.resolution || "1080p"} • ${ce.fps || 30}fps`,
        resolution: ce.resolution || (je == null ? void 0 : je.resolution) || "1080p",
        fps: ce.fps || (je == null ? void 0 : je.fps) || 30,
        isLoading: Me
      });
    }
    return le;
  }, [r, x, w, E, de, c, d]), ve = u.useMemo(() => r.filter((le) => {
    const Ie = be.get(le.id), ce = x && x[le.id] && x[le.id].length > 0 || le.segments && le.segments.length > 0, Be = Ie && (Ie.coveragePct > 0 || Ie.totalRecordedMs > 0), Me = typeof le.recordingsCount == "number" && le.recordingsCount > 0;
    return Ie && !Ie.isLoading ? Be || ce : Me || ce;
  }), [r, be, x]), ie = u.useMemo(() => ve.filter((le) => {
    if (Y.id !== "all" && !re.includes(le.id) || !(le.displayName || le.hostname || le.name || "").toLowerCase().includes(k.toLowerCase())) return !1;
    const ce = l.includes(le.id), Be = be.get(le.id);
    return b === "selected" ? ce : b === "unselected" ? !ce : b === "gaps" ? Be == null ? void 0 : Be.hasGaps : b === "audio" ? Be == null ? void 0 : Be.hasAudio : !0;
  }).sort((le, Ie) => j ? (le.displayName || le.hostname || "").localeCompare(Ie.displayName || Ie.hostname || "") : 0), [ve, Y, re, k, b, l, j, be]), ke = u.useMemo(() => I !== null ? I : ie.length > cx ? "table" : "grid", [I, ie.length]), _e = ke === "table" ? z : B, D = Math.max(1, Math.ceil(ie.length / _e));
  u.useEffect(() => {
    U(1);
  }, [g, k, b, ke]), u.useEffect(() => {
    S > D && U(D);
  }, [D, S]);
  const X = u.useMemo(() => {
    if (Q !== "is-full-width") return ie;
    const le = (S - 1) * _e;
    return ie.slice(le, le + _e);
  }, [ie, S, _e, Q]), me = () => {
    if (!i) return;
    const le = Y.id === "all" ? ie.map((Ie) => Ie.id) : re;
    i(Array.from(/* @__PURE__ */ new Set([...l, ...le])));
  }, we = () => {
    if (!i) return;
    const le = new Set(
      Y.id === "all" ? ie.map((Ie) => Ie.id) : re
    );
    i(l.filter((Ie) => !le.has(Ie)));
  }, Xe = re.filter((le) => l.includes(le)).length, Ne = ie.filter((le) => l.includes(le.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${Q}`, children: [
    Q !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => Q === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            de && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              te,
              "/",
              r.length
            ] })
          ] })
        ] }),
        Q === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      Q === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: me,
            disabled: ie.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                ie.length,
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
            onClick: we,
            disabled: Ne === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                Ne,
                ")"
              ] })
            ]
          }
        )
      ] }),
      de && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? te / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: R ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : Z ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: f, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: Q === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      Q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      Q === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${de ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: de ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: de ? `ANALYZING TIMELINE ARCHIVES • ${te} OF ${ve.length} STATIONS SYNCED (${ve.length > 0 ? Math.min(100, Math.round(te / ve.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${ve.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: de ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(te / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        nx,
        {
          searchTerm: k,
          onSearchChange: M,
          sortAlpha: j,
          onToggleSort: () => N(!j),
          effectiveTabs: q,
          selectedTabId: g,
          onSelectTab: (le) => {
            h(le), _(null);
          },
          isLoadingTabs: K,
          allStations: ve,
          selectedStationIds: l,
          filterMode: b,
          onFilterModeChange: C,
          filteredCount: ie.length,
          selectedInTabCount: Xe,
          unselectedInTabCount: re.length - Xe,
          activeTabName: Y.name,
          onSelectAllInScope: me,
          onClearInScope: we,
          viewMode: ke,
          onViewModeChange: Q === "is-full-width" ? _ : null,
          isDrawerMode: Q !== "is-full-width"
        }
      ),
      Q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: me,
              disabled: ie.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  ie.length,
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
              onClick: we,
              disabled: Ne === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  Ne,
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
      Q === "is-full-width" && ke === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: ee,
          className: `station-list ${Q === "is-full-width" ? ke === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: X.map((le) => {
            const Ie = l.includes(le.id), ce = be.get(le.id);
            return Q === "is-full-width" ? ke === "grid" ? /* @__PURE__ */ s.jsx(
              qg,
              {
                station: le,
                isSelected: Ie,
                onToggle: o,
                meta: ce
              },
              le.id
            ) : /* @__PURE__ */ s.jsx(
              ex,
              {
                station: le,
                isSelected: Ie,
                onToggle: o,
                meta: ce
              },
              le.id
            ) : /* @__PURE__ */ s.jsx(
              tx,
              {
                station: le,
                isSelected: Ie,
                onToggle: o,
                meta: ce
              },
              le.id
            );
          })
        }
      ),
      Q === "is-full-width" && /* @__PURE__ */ s.jsx(
        sx,
        {
          currentPage: S,
          totalPages: D,
          pageSize: _e,
          totalItems: ie.length,
          onPageChange: U,
          onPageSizeChange: (le) => {
            ke === "table" ? G(le) : W(le), U(1);
          },
          viewMode: ke
        }
      ),
      Q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          rx,
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
const Cn = (e) => String(e).padStart(2, "0"), dx = [
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
], hx = [
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
function _d({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [i, a] = u.useState(e), [c, d] = u.useState(null), y = u.useRef(null), { h: f, m, s: x } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const C = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, C[0] || 0)),
      m: Math.min(59, Math.max(0, C[1] || 0)),
      s: Math.min(59, Math.max(0, C[2] || 0))
    };
  }, [e]), w = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    a(e);
  }, [e]);
  const E = () => {
    const I = i.replace(/[^0-9:]/g, "").trim().split(":").filter((G) => G.length > 0);
    let _ = 0, K = 0, A = 0;
    I.length >= 1 && (_ = Math.min(23, Math.max(0, parseInt(I[0], 10) || 0))), I.length >= 2 && (K = Math.min(59, Math.max(0, parseInt(I[1], 10) || 0))), I.length >= 3 && l && (A = Math.min(59, Math.max(0, parseInt(I[2], 10) || 0)));
    const z = l ? `${Cn(_)}:${Cn(K)}:${Cn(A)}` : `${Cn(_)}:${Cn(K)}`;
    a(z), t && t(z, { h: _, m: K, s: A });
  }, $ = (C) => {
    let I = f;
    C === "AM" && f >= 12 ? I = f - 12 : C === "PM" && f < 12 && (I = f + 12);
    const _ = l ? `${Cn(I)}:${Cn(m)}:${Cn(x)}` : `${Cn(I)}:${Cn(m)}`;
    a(_), t && t(_, { h: I, m, s: x });
  }, v = u.useCallback((C, I) => {
    if (!y.current) return null;
    const _ = y.current.getBoundingClientRect(), K = _.left + _.width / 2, A = _.top + _.height / 2, z = C.clientX - K, G = C.clientY - A;
    let B = Math.atan2(G, z) * 180 / Math.PI + 90;
    if (B < 0 && (B += 360), I === "hours") {
      const W = Math.round(B / 30) % 12;
      return w ? W === 0 ? 12 : W + 12 : W === 0 ? 0 : W;
    }
    return Math.round(B / 6) % 60;
  }, [w]), g = u.useCallback((C, I) => {
    let _ = f, K = m, A = x;
    C === "hours" ? _ = I : C === "minutes" ? K = I : C === "seconds" && (A = I);
    const z = l ? `${Cn(_)}:${Cn(K)}:${Cn(A)}` : `${Cn(_)}:${Cn(K)}`;
    a(z), t && t(z, { h: _, m: K, s: A });
  }, [f, m, x, l, t]), h = (C, I) => {
    I.preventDefault(), I.stopPropagation(), d(C);
    const _ = v(I, C);
    _ !== null && g(C, _);
  };
  u.useEffect(() => {
    if (!c) return;
    const C = (_) => {
      const K = v(_, c);
      K !== null && g(c, K);
    }, I = () => {
      d(null);
    };
    return window.addEventListener("pointermove", C), window.addEventListener("pointerup", I), () => {
      window.removeEventListener("pointermove", C), window.removeEventListener("pointerup", I);
    };
  }, [c, v, g]);
  const k = u.useMemo(() => f % 12 * 30, [f]), M = u.useMemo(() => m % 60 * 6, [m]), j = u.useMemo(() => x % 60 * 6, [x]), N = w ? hx : dx, b = u.useMemo(() => {
    const C = [];
    for (let I = 0; I < 60; I++) {
      const _ = (I * 6 - 90) * (Math.PI / 180), K = I % 5 === 0, A = 104, z = K ? 93 : 98;
      C.push({
        index: I,
        x1: 110 + z * Math.cos(_),
        y1: 110 + z * Math.sin(_),
        x2: 110 + A * Math.cos(_),
        y2: 110 + A * Math.sin(_),
        isMajor: K
      });
    }
    return C;
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
              className: `btn-period ${w ? "" : "active"}`,
              onClick: () => $("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${w ? "active" : ""}`,
              onClick: () => $("PM"),
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
            onChange: (C) => a(C.target.value),
            onBlur: E,
            onKeyDown: (C) => {
              C.key === "Enter" && C.currentTarget.blur();
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: b.map((C) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: C.x1,
              y1: C.y1,
              x2: C.x2,
              y2: C.y2,
              className: `dial-tick ${C.isMajor ? "major" : "minor"}`
            },
            `tick-${C.index}`
          )) }),
          N.map((C) => {
            const I = (C.angle - 90) * (Math.PI / 180), _ = 76, K = 110 + _ * Math.cos(I), A = 110 + _ * Math.sin(I), z = f === C.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: K,
                y: A,
                className: `dial-num ${z ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: C.label
              },
              `dial-h-${C.val}`
            );
          }),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-hour ${c === "hours" ? "dragging" : ""}`,
              transform: `rotate(${k} 110 110)`,
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
                    onPointerDown: (C) => h("hours", C)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${c === "minutes" ? "dragging" : ""}`,
              transform: `rotate(${M} 110 110)`,
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
                    onPointerDown: (C) => h("minutes", C)
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
                    onPointerDown: (C) => h("seconds", C)
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
const Oo = 7 * 24 * 60 * 60 * 1e3, At = (e) => String(e).padStart(2, "0");
function fx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: i
}) {
  const [a, c] = u.useState(""), [d, y] = u.useState(""), [f, m] = u.useState("00:00:00"), [x, w] = u.useState("00:00:00"), [E, $] = u.useState(() => /* @__PURE__ */ new Date()), [v, g] = u.useState(null), [h, k] = u.useState([]), [M, j] = u.useState(!1), [N, b] = u.useState(""), [C, I] = u.useState(1), [_, K] = u.useState(2), [A, z] = u.useState(null), G = u.useCallback(() => {
    try {
      const D = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (D) {
        const X = JSON.parse(D);
        Array.isArray(X) && k(X);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((D) => D.ok ? D.json() : null).then((D) => {
      Array.isArray(D) && D.length > 0 && k(D);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    G();
    let D = n == null ? void 0 : n.startEpochMs, X = n == null ? void 0 : n.endEpochMs;
    if (!D || isNaN(D))
      if (n != null && n.start) {
        const Xe = String(n.start).replace(" ", "T"), Ne = new Date(Xe).getTime();
        D = isNaN(Ne) ? Date.now() - 24 * 3600 * 1e3 : Ne;
      } else
        X = Date.now(), D = X - 24 * 3600 * 1e3;
    if (!X || isNaN(X))
      if (n != null && n.end) {
        const Xe = String(n.end).replace(" ", "T"), Ne = new Date(Xe).getTime();
        X = isNaN(Ne) ? Date.now() : Ne;
      } else
        X = D + 24 * 3600 * 1e3;
    z(null);
    const me = yr(D, o), we = yr(X, o);
    c(`${me.year}-${At(me.month)}-${At(me.day)}`), y(`${we.year}-${At(we.month)}-${At(we.day)}`), m(`${At(me.hour)}:${At(me.minute)}:${At(me.second)}`), w(`${At(we.hour)}:${At(we.minute)}:${At(we.second)}`), $(new Date(Date.UTC(me.year, me.month - 1, 1)));
  }, [e, n, o, G]);
  const B = u.useCallback(() => {
    a && !d && y(a);
  }, [a, d]), W = d || a, S = u.useMemo(() => a ? `${a}T${f}` : "", [a, f]), U = u.useMemo(() => W ? `${W}T${x}` : "", [W, x]), F = u.useMemo(() => {
    const D = {};
    return h.forEach((X) => {
      const me = X.startTime || X.start, we = X.endTime || X.end || me;
      if (!me) return;
      const Xe = String(me).substring(0, 10), Ne = String(we).substring(0, 10), [le, Ie, ce] = Xe.split("-").map(Number), [Be, Me, Ye] = Ne.split("-").map(Number);
      if (isNaN(le) || isNaN(Ie) || isNaN(ce) || isNaN(Be) || isNaN(Me) || isNaN(Ye)) return;
      let je = new Date(Date.UTC(le, Ie - 1, ce));
      const ut = new Date(Date.UTC(Be, Me - 1, Ye));
      for (; je.getTime() <= ut.getTime(); ) {
        const Ue = `${je.getUTCFullYear()}-${At(je.getUTCMonth() + 1)}-${At(je.getUTCDate())}`;
        D[Ue] || (D[Ue] = []), D[Ue].push(X), je.setUTCDate(je.getUTCDate() + 1);
      }
    }), D;
  }, [h]), ee = async (D, X) => {
    if (X && X.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const me = h.filter((we) => (we.id || we.startTime) !== D);
    k(me);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(me)), localStorage.setItem("itb_bookmarks", JSON.stringify(me)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: me }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${D}`, { method: "DELETE" });
    } catch {
    }
  }, R = (D) => {
    const X = D.startTime || D.start, me = D.endTime || D.end;
    if (!X || !me) return;
    const we = X.substring(0, 10), Xe = X.includes("T") ? X.split("T")[1].substring(0, 8) : "00:00:00", Ne = me.substring(0, 10), le = me.includes("T") ? me.split("T")[1].substring(0, 8) : "23:59:59";
    c(we), y(Ne), m(Xe), w(le);
    const [Ie, ce] = we.split("-").map(Number);
    $(new Date(Date.UTC(Ie, ce - 1, 1))), j(!1);
  }, Z = (D) => {
    l ? (l(D), t && t()) : R(D);
  }, Q = u.useMemo(() => {
    if (o === "UTC" || !S.includes("T")) return { isAmbiguous: !1 };
    const [D, X] = S.split("T");
    return ki(D, X);
  }, [S, o]), q = u.useMemo(() => {
    if (o === "UTC" || !U.includes("T")) return { isAmbiguous: !1 };
    const [D, X] = U.split("T");
    return ki(D, X);
  }, [U, o]), Y = u.useMemo(() => {
    if (!a || !W) return null;
    const D = pc(a, f, o, C), X = pc(W, x, o, _);
    return D === null || X === null || isNaN(D) || isNaN(X) ? null : { startEpoch: D, endEpoch: X, durationMs: X - D };
  }, [a, f, W, x, o, C, _]), re = u.useMemo(() => !Y || Y.durationMs <= 0 ? [] : sp(Y.startEpoch, Y.endEpoch), [Y]), te = u.useMemo(() => {
    if (!Y || Y.durationMs <= 0) return "0h";
    const D = Y.durationMs / (1e3 * 60 * 60);
    return D >= 24 ? `${(D / 24).toFixed(1)}d (${D.toFixed(0)}h)` : `${D.toFixed(1)}h`;
  }, [Y]), de = u.useMemo(() => {
    const D = E.getUTCFullYear(), X = E.getUTCMonth(), me = new Date(Date.UTC(D, X, 1)).getUTCDay(), we = new Date(Date.UTC(D, X + 1, 0)).getUTCDate(), Xe = [];
    for (let Ne = 0; Ne < me; Ne++) Xe.push(null);
    for (let Ne = 1; Ne <= we; Ne++) Xe.push(`${D}-${At(X + 1)}-${At(Ne)}`);
    return Xe;
  }, [E]), be = (D) => {
    if (D) {
      if (z(null), !a || a && d)
        c(D), y("");
      else if (a && !d)
        if (D < a)
          c(D), y("");
        else {
          const X = (/* @__PURE__ */ new Date(a + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(D + "T00:00:00Z")).getTime() - X > Oo) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const we = new Date(X + Oo);
            y(`${we.getUTCFullYear()}-${At(we.getUTCMonth() + 1)}-${At(we.getUTCDate())}`);
          } else
            y(D);
        }
    }
  }, ve = (D, X) => {
    z(X);
    const me = Date.now(), we = me - D, Xe = yr(we, o), Ne = yr(me, o);
    c(`${Xe.year}-${At(Xe.month)}-${At(Xe.day)}`), y(`${Ne.year}-${At(Ne.month)}-${At(Ne.day)}`), m(`${At(Xe.hour)}:${At(Xe.minute)}:${At(Xe.second)}`), w(`${At(Ne.hour)}:${At(Ne.minute)}:${At(Ne.second)}`), $(new Date(Date.UTC(Xe.year, Xe.month - 1, 1)));
  }, ie = () => {
    if (B(), !Y || isNaN(Y.startEpoch) || isNaN(Y.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (Y.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (Y.durationMs > Oo) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: S,
      end: U,
      startEpochMs: Y.startEpoch,
      endEpochMs: Y.endEpoch,
      durationMs: Y.durationMs,
      timeMode: o
    }), t && t();
  }, ke = u.useMemo(() => {
    if (!N.trim()) return h;
    const D = N.toLowerCase();
    return h.filter(
      (X) => (X.title || X.name || "").toLowerCase().includes(D) || (X.startTime || "").includes(D)
    );
  }, [h, N]);
  if (!e) return null;
  const _e = o === "UTC";
  return $s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (D) => D.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${_e ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: _e ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            i && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${_e ? "" : "active"}`,
                  onClick: () => i("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${_e ? "active" : ""}`,
                  onClick: () => i("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${M ? "active" : ""}`,
                onClick: () => j(!M),
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
      re.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: re.map((D) => `${D.description} (${D.labelBefore} ➔ ${D.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${A === "7d" ? "active" : ""}`,
            onClick: () => ve(7 * 24 * 3600 * 1e3, "7d"),
            children: [
              "7d Week Max ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${A === "3d" ? "active" : ""}`,
            onClick: () => ve(3 * 24 * 3600 * 1e3, "3d"),
            children: [
              "3d Block ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${A === "24h" ? "active" : ""}`,
            onClick: () => ve(24 * 3600 * 1e3, "24h"),
            children: [
              "24h Day ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${A === "8h" ? "active" : ""}`,
            onClick: () => ve(8 * 3600 * 1e3, "8h"),
            children: [
              "8h Shift ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        )
      ] }),
      M && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
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
                onChange: (D) => b(D.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            ke.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: ke.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : ke.map((D) => {
          var Ne;
          const X = D.id || D.startTime, me = D.title || D.name || "Untitled Mission", we = (D.startTime || "").replace("T", " "), Xe = (D.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => R(D), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: me }),
                D.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  D.cutStationName
                ] }),
                ((Ne = D.stationIds) == null ? void 0 : Ne.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  D.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                we,
                " ➔ ",
                Xe
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (le) => {
                    le.stopPropagation(), R(D);
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
                    le.stopPropagation(), Z(D);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (le) => ee(X, le),
                  children: "✕"
                }
              )
            ] })
          ] }, X);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: E.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => $((D) => new Date(Date.UTC(D.getUTCFullYear(), D.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => $((D) => new Date(Date.UTC(D.getUTCFullYear(), D.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: de.map((D, X) => {
            if (!D) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${X}`);
            const me = parseInt(D.split("-")[2], 10), we = D === a, Xe = D === (d || a), Ne = d || v, le = a && Ne && D > a && D < Ne, Ie = F[D], ce = !!(Ie && Ie.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${we ? "start-edge" : ""} ${Xe ? "end-edge" : ""} ${le ? "in-range" : ""} ${ce ? "has-bookmark" : ""}`,
                onClick: () => be(D),
                onMouseEnter: () => !d && a && g(D),
                onMouseLeave: () => g(null),
                title: ce ? `${Ie.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: me }),
                  ce && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Be) => {
                        Be.stopPropagation(), j(!0), b(D);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Ie.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Ie.length })
                      ]
                    }
                  )
                ]
              },
              D
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: B, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            _d,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (D) => {
                B(), m(D), z(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            _d,
            {
              label: "END TIME (TO)",
              value: x,
              onChange: (D) => {
                B(), w(D), z(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (Q.isAmbiguous || q.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        Q.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
            Q.transition.labelBefore,
            " / ",
            Q.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: C === 1 ? "active" : "",
                onClick: () => I(1),
                children: [
                  "1st Occurrence (",
                  Q.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: C === 2 ? "active" : "",
                onClick: () => I(2),
                children: [
                  "2nd Occurrence (",
                  Q.transition.labelAfter,
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
                onClick: () => K(1),
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
                onClick: () => K(2),
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
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: Y && Y.durationMs > Oo ? "#f43f5e" : "#22d3ee" }, children: te }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: re.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: ie, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const pp = "extractor_incident_bookmarks_fallback", px = ["itb_studio_bookmarks", "itb_bookmarks", pp];
function mx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [i, a] = u.useState([]), [c, d] = u.useState(""), [y, f] = u.useState(!1), [m, x] = u.useState(!1), [w, E] = u.useState(null), [$, v] = u.useState(""), g = u.useCallback((A) => {
    px.forEach((z) => {
      try {
        localStorage.setItem(z, JSON.stringify(A));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: A }));
  }, []), h = u.useCallback(async () => {
    f(!0);
    try {
      const A = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (A.ok) {
        const z = await A.json(), G = Array.isArray(z) ? z : [];
        a(G), g(G);
        return;
      }
    } catch (A) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", A);
    } finally {
      f(!1);
    }
    try {
      const A = localStorage.getItem(pp) || localStorage.getItem("itb_studio_bookmarks");
      A && a(JSON.parse(A));
    } catch {
    }
  }, [g]);
  if (u.useEffect(() => {
    e && h();
  }, [e, h]), !e) return null;
  const k = async () => {
    var Q, q, Y, re, te, de;
    if (!c.trim() || m) return;
    const A = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((Q = n == null ? void 0 : n.timeRange) != null && Q.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), z = (n == null ? void 0 : n.inPointMs) ?? 0, G = (n == null ? void 0 : n.outPointMs) ?? (((q = n == null ? void 0 : n.timeRange) == null ? void 0 : q.durationMs) || 0), B = (n == null ? void 0 : n.playheadMs) ?? z, W = A + z, S = A + G, U = A + B, F = (n == null ? void 0 : n.selectedStationIds) || [], ee = (n == null ? void 0 : n.selectedStationNames) || [], R = ((Y = n == null ? void 0 : n.allStationIds) == null ? void 0 : Y.length) > 0 ? n.allStationIds : F, Z = {
      title: c.trim(),
      startTime: ((re = n == null ? void 0 : n.timeRange) == null ? void 0 : re.start) || "",
      endTime: ((te = n == null ? void 0 : n.timeRange) == null ? void 0 : te.end) || "",
      baseEpochMs: A,
      timelineBaseEpochMs: A,
      inPointMs: z,
      outPointMs: G,
      playheadMs: B,
      inEpochMs: W,
      outEpochMs: S,
      playheadEpochMs: U,
      selectedStationIds: F,
      selectedStationNames: ee,
      allStationIds: R,
      stationIds: F.length > 0 ? F : R,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    x(!0);
    try {
      const be = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Z)
      });
      if (be.ok) {
        const ve = await be.json(), ke = [{
          ...Z,
          ...ve.bookmark || {},
          inEpochMs: W,
          outEpochMs: S,
          playheadEpochMs: U,
          selectedStationIds: F,
          selectedStationNames: ee,
          allStationIds: R,
          id: ((de = ve.bookmark) == null ? void 0 : de.id) || ve.id || `bm_${Date.now()}`
        }, ...i];
        a(ke), g(ke), d("");
      } else
        throw new Error(`Server returned ${be.status}`);
    } catch (be) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", be);
      const ie = [{
        ...Z,
        inEpochMs: W,
        outEpochMs: S,
        playheadEpochMs: U,
        selectedStationIds: F,
        selectedStationNames: ee,
        allStationIds: R,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...i];
      a(ie), g(ie), d("");
    } finally {
      x(!1);
    }
  }, M = async (A, z) => {
    if (z.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const G = i.filter((B) => (B.id || B.startTime) !== A);
    a(G), g(G);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${A}`, { method: "DELETE" });
    } catch (B) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", B);
    }
  }, j = (A, z) => {
    z.stopPropagation(), E(A.id || A.startTime), v(A.title || A.name || "");
  }, N = async (A, z) => {
    if (z && z.stopPropagation(), !$.trim()) return;
    const G = i.find((S) => (S.id || S.startTime) === A), B = $.trim(), W = i.map(
      (S) => (S.id || S.startTime) === A ? { ...S, title: B, name: B } : S
    );
    a(W), g(W), E(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${A}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...G, title: B })
      });
    } catch (S) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", S);
    }
  }, b = (A) => {
    A.stopPropagation(), E(null);
  }, C = (A) => !A || isNaN(A) ? "--:--:--" : qe(A, o), I = (A) => {
    const z = A.startTime || A.StartTime, G = A.endTime || A.EndTime;
    if (!z) return "--";
    const B = String(z).replace("T", " ").substring(0, 19), W = G ? String(G).replace("T", " ").substring(0, 19) : B;
    return `${B} ➔ ${W}`;
  }, _ = (A) => {
    let z = A.inEpochMs || A.InEpochMs, G = A.outEpochMs || A.OutEpochMs;
    if (!z || !G) {
      const B = A.timelineBaseEpochMs || A.baseEpochMs || (A.startTime ? new Date(String(A.startTime).replace(" ", "T")).getTime() : 0), W = A.inPointMs ?? A.InPointMs, S = A.outPointMs ?? A.OutPointMs;
      B && typeof W == "number" && typeof S == "number" && (W > 0 || S > 0) && (z = B + W, G = B + S);
    }
    if (z && G && !isNaN(z) && !isNaN(G) && z > 0) {
      const B = C(z), W = C(G), S = Math.max(0, G - z), U = Math.floor(S / 6e4), F = Math.floor(U / 60), ee = U % 60, R = F > 0 ? `${F}h ${ee}m` : `${U}m`;
      return { timeText: `${B} ➔ ${W}`, duration: R };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, K = (A) => {
    const z = A.selectedStationNames || [], G = A.selectedStationIds || A.cutStationIds || A.stationIds || [];
    return z.length > 0 ? z.join(", ") : G.length > 0 ? G.join(", ") : A.cutStationName ? A.cutStationName : A.activeStationName ? A.activeStationName : "All Stations in Scope";
  };
  return $s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "bookmarks-modal-overlay", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-modal-card", onClick: (A) => A.stopPropagation(), children: [
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
              onChange: (A) => d(A.target.value),
              onKeyDown: (A) => A.key === "Enter" && k(),
              disabled: m,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !m ? "active" : ""}`,
            onClick: k,
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
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: y ? "SYNCING..." : `${i.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: i.length === 0 && !y ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : i.map((A) => {
        var U, F, ee;
        const z = A.id || A.startTime, G = w === z, B = _(A), W = K(A), S = ((U = A.allStationIds) == null ? void 0 : U.length) || ((F = A.selectedStationIds) == null ? void 0 : F.length) || ((ee = A.stationIds) == null ? void 0 : ee.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${G ? "is-editing" : ""}`,
            onClick: () => {
              G || (r && r(A), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                G ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (R) => R.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: $,
                      onChange: (R) => v(R.target.value),
                      onKeyDown: (R) => {
                        R.key === "Enter" && N(z, R), R.key === "Escape" && b(R);
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
                        onClick: (R) => N(z, R),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: b,
                        title: "Cancel (Esc)",
                        children: "✕"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ s.jsxs("div", { className: "bm-title-row", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "bm-title", children: A.title || A.name || "Untitled Event" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-time-tag", children: A.createdAt ? new Date(A.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
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
                    /* @__PURE__ */ s.jsx("strong", { children: I(A) })
                  ] }),
                  S > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    S,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: B.timeText }),
                    B.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      B.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${W}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: W })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (R) => R.stopPropagation(), children: [
                !G && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (R) => j(A, R),
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
                    onClick: (R) => M(z, R),
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
          z
        );
      }) })
    ] }) }),
    document.body
  );
}
function gx({
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
    let f = 1 / 0, m = 1 / 0, x = -1 / 0, w = -1 / 0;
    e.forEach((v) => {
      const g = v.x ?? v.X ?? 0, h = v.y ?? v.Y ?? 0, k = v.width ?? v.Width ?? 1920, M = v.height ?? v.Height ?? 1080;
      f = Math.min(f, g), m = Math.min(m, h), x = Math.max(x, g + k), w = Math.max(w, h + M);
    });
    const E = Math.max(1, x - f), $ = Math.max(1, w - m);
    return { minX: f, minY: m, totalW: E, totalH: $ };
  }, [e]);
  if (!e || e.length <= 1 || !i)
    return null;
  const a = e.find((f) => (f.displayId ?? f.DisplayId) === t) || e[0];
  e.indexOf(a);
  const y = ((a ? a.displayName ?? a.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim() || "SCREEN").toUpperCase();
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (f) => f.stopPropagation(),
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "hud-header", children: /* @__PURE__ */ s.jsxs("span", { className: `hud-badge ${l.toLowerCase()}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "hud-pulse" }),
          l === "MANUAL" ? "✋ OVERRIDE" : "⚡ AUTO",
          " : ",
          y,
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
            children: e.map((f, m) => {
              const x = f.displayId ?? f.DisplayId ?? `mon-${m}`, w = (f.x ?? f.X ?? 0) - i.minX, E = (f.y ?? f.Y ?? 0) - i.minY, $ = f.width ?? f.Width ?? 1920, v = f.height ?? f.Height ?? 1080, g = x === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${g ? "is-active" : ""}`,
                  onClick: (h) => {
                    h.stopPropagation(), n == null || n(x);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: w + 10,
                        y: E + 10,
                        width: Math.max(10, $ - 20),
                        height: Math.max(10, v - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: w + $ / 2,
                        y: E + v / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: m + 1
                      }
                    )
                  ]
                },
                x
              );
            })
          }
        ) })
      ]
    }
  );
}
function xx(e) {
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
function yx(e, t) {
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
function vx({
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
  outPointMs: y = 36e5,
  isLooping: f = !0,
  recordingSegments: m = {},
  globalGaps: x = [],
  showWatermark: w = !0,
  directorPlan: E,
  onOverrideDisplay: $,
  onResetOverride: v,
  viewMode: g,
  onViewModeChange: h,
  onOpenFullscreen: k,
  isPipSwapped: M,
  onPipSwapChange: j,
  className: N = ""
}) {
  const b = u.useRef(null), C = u.useRef(null), I = u.useRef(null), _ = u.useRef(r), K = u.useRef(r), A = u.useRef(r), z = u.useRef(!1), G = u.useRef(null), B = u.useRef(o), W = u.useRef(!1);
  _.current = r;
  const S = e == null ? void 0 : e.id, U = e && (e.hostname || e.name) || "", F = u.useMemo(() => {
    var Ae, Ke, He, Je;
    const V = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ae = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ae.displays) || ((Ke = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ke.Displays) || ((He = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : He.Displays) || ((Je = e == null ? void 0 : e.topology) == null ? void 0 : Je.displays) || [];
    if (!Array.isArray(V) || V.length === 0) return [];
    const ue = V.length > 1 && V.every((Ve) => (Ve.X ?? Ve.x ?? 0) === 0 && (Ve.Y ?? Ve.y ?? 0) === 0);
    let ae = 0;
    return V.map((Ve, ot) => {
      const Mt = Ve.Width || Ve.width || 1920, Kt = Ve.Height || Ve.height || 1080, Jt = ue ? ae : Ve.X ?? Ve.x ?? ot * Mt, An = ue ? 0 : Ve.Y ?? Ve.y ?? 0;
      ue && (ae += Mt);
      const Gt = (Ve.displayId ?? Ve.DisplayId ?? `mon-${ot}`).toLowerCase(), Rt = Ve.displayNumber ?? Ve.DisplayNumber ?? ot + 1, Mr = (Ve.displayName || Ve.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${Rt}`, Tr = !!(Ve.isPrimary ?? Ve.IsPrimary ?? ot === 0);
      return {
        ...Ve,
        displayId: Gt,
        DisplayId: Gt,
        displayIndex: ot,
        displayNumber: Rt,
        DisplayNumber: Rt,
        displayName: Mr,
        DisplayName: Mr,
        isPrimary: Tr,
        IsPrimary: Tr,
        x: Jt,
        y: An,
        X: Jt,
        Y: An,
        width: Mt,
        height: Kt,
        Width: Mt,
        Height: Kt
      };
    });
  }, [e]), ee = F.length > 1, [R, Z] = u.useState(() => {
    if (!ee) return "mon-0";
    try {
      const V = localStorage.getItem("itb_solo_viewmode");
      if (V) return V;
    } catch {
    }
    return "canvas";
  }), q = ee ? g !== void 0 ? g : R : "mon-0", Y = u.useCallback((V) => {
    const ue = typeof V == "function" ? V(q) : V;
    Z(ue);
    try {
      localStorage.setItem("itb_solo_viewmode", ue);
    } catch {
    }
    h && h(ue);
  }, [q, h]), [re, te] = u.useState(!1), de = M !== void 0 ? M : re, be = u.useCallback((V) => {
    const ue = typeof V == "function" ? V(de) : V;
    te(ue), j && j(ue);
  }, [de, j]), ve = u.useMemo(() => {
    const V = E || (e == null ? void 0 : e.directorPlan);
    if (!V || !V.segments || V.segments.length === 0) return null;
    const ue = t + r;
    return V.segments.find((ae) => {
      const Ae = ae.startEpochMs ?? ae.StartEpochMs ?? 0, Ke = ae.endEpochMs ?? ae.EndEpochMs ?? 0;
      return ue >= Ae && ue <= Ke;
    }) || V.segments[0];
  }, [E, e == null ? void 0 : e.directorPlan, t, r]), ie = u.useMemo(() => {
    var V, ue;
    if (!ee) return "mon-0";
    if (q === "split" || q === "pip" || q === "canvas" || q === "all-displays") {
      const ae = (((V = F[0]) == null ? void 0 : V.displayId) ?? "mon-0").toLowerCase(), Ae = (((ue = F[1]) == null ? void 0 : ue.displayId) ?? "mon-1").toLowerCase();
      return de ? Ae : ae;
    }
    return q !== "director" ? q.toLowerCase() : ((ve == null ? void 0 : ve.targetDisplayId) ?? (ve == null ? void 0 : ve.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [ee, q, ve, F, de]), ke = u.useMemo(() => {
    var ue;
    if (!ee) return null;
    const V = F.find((ae) => (ae.displayId ?? ae.DisplayId ?? "").toLowerCase() !== ie);
    return V ? (V.displayId ?? V.DisplayId).toLowerCase() : (((ue = F[1]) == null ? void 0 : ue.displayId) || "mon-1").toLowerCase();
  }, [ee, F, ie]), _e = u.useMemo(() => {
    const V = F.find((ae) => (ae.displayId ?? "").toLowerCase() === (ie || "").toLowerCase());
    if (V) return V.displayName || `Screen ${V.displayNumber || 1}`;
    if (ie === "mon-0" || ie === "0") return "Screen 1";
    if (ie === "mon-1" || ie === "1") return "Screen 2";
    const ue = (ie || "").match(/\d+/);
    if (ue) {
      const ae = parseInt(ue[0], 10);
      return `Screen ${(ie || "").startsWith("mon-") ? ae + 1 : ae}`;
    }
    return (ie || "Screen 1").toUpperCase();
  }, [F, ie]), D = u.useMemo(() => {
    const V = F.find((ue) => (ue.displayId ?? "").toLowerCase() === (ke || "").toLowerCase());
    return V ? V.displayName || `Screen ${V.displayNumber || 2}` : "Screen 2";
  }, [F, ke]), X = u.useMemo(() => q !== "director" && q !== "split" && q !== "pip" && q !== "canvas" ? !0 : !!((ve == null ? void 0 : ve.isManualOverride) ?? (ve == null ? void 0 : ve.IsManualOverride)), [q, ve]), [me, we] = u.useState({}), Xe = u.useRef(null), [Ne, le] = u.useState({ width: 0, height: 0 }), Ie = u.useMemo(() => xx(F), [F]);
  u.useEffect(() => {
    if (!ee || q !== "canvas" && q !== "all-displays" || o)
      return;
    const V = () => {
      const ae = Xe.current;
      if (!ae) return;
      const Ae = 48, Ke = 72, He = Math.max(100, ae.clientWidth - Ae), Je = Math.max(100, ae.clientHeight - Ke), Ve = Ie.totalWidth || 1920, ot = Ie.totalHeight || 1080, Mt = Ve / ot;
      let Kt = He, Jt = Kt / Mt;
      Jt > Je && (Jt = Je, Kt = Jt * Mt), le({ width: Math.round(Kt), height: Math.round(Jt) });
    };
    V();
    const ue = new ResizeObserver(V);
    return Xe.current && ue.observe(Xe.current), () => ue.disconnect();
  }, [ee, q, Ie]);
  const ce = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!ee || q !== "canvas" && q !== "all-displays")
      return;
    let V = !0;
    const ue = new AbortController(), ae = ce;
    F.forEach((Ke, He) => {
      const Je = (Ke.displayId ?? Ke.DisplayId ?? `mon-${He}`).toLowerCase(), Ve = Sn.get(U, ae, Je);
      Ve ? we((ot) => ({ ...ot, [Je]: Ve })) : Sn.fetchFrame(U, ae, ue.signal, Je).then((ot) => {
        V && ot && we((Mt) => ({ ...Mt, [Je]: ot }));
      });
    });
    const Ae = Sn.subscribe((Ke, He, Je, Ve) => {
      Ke === U && He === ae && Ve && V && we((ot) => ({ ...ot, [Ve.toLowerCase()]: Je }));
    });
    return () => {
      V = !1, ue.abort(), Ae();
    };
  }, [ee, q, F, U, ce]);
  const Be = u.useRef(ie), Me = u.useMemo(() => e ? m[e.id] || m[e.hostname] || e.segments || [] : [], [e, m]), Ye = t + r, je = u.useMemo(() => Me.length === 0 ? !0 : Me.some((V) => {
    const ue = (V.startEpochMs ?? V.startEpoch ?? 0) - 2e3, ae = (V.endEpochMs ?? V.endEpoch ?? 0) + 2e3;
    return Ye >= ue && Ye <= ae;
  }), [Me, Ye]), ut = !je && Me.length > 0, [Ue, xt] = u.useState("A"), [yt, Pe] = u.useState(""), [dt, Qt] = u.useState(""), [ns, Bn] = u.useState(""), [bt, _t] = u.useState(null), [Ut, ge] = u.useState(!1), [Nt, Qe] = u.useState(!1), [gt, fn] = u.useState(() => {
    if (!U) return null;
    const V = Math.round(t + r);
    return Sn.get(U, V, ie) || null;
  }), [pn, en] = u.useState(null), wn = Ue === "A" ? b : C, Ee = u.useCallback(() => {
    const V = rl();
    b.current && (b.current.volume = V.volume, b.current.muted = Ue !== "A" || V.isMuted, b.current.defaultPlaybackRate = a, b.current.playbackRate = a, Ue === "A" && !V.isMuted && wi(b.current)), C.current && (C.current.volume = V.volume, C.current.muted = Ue !== "B" || V.isMuted, C.current.defaultPlaybackRate = a, C.current.playbackRate = a, Ue === "B" && !V.isMuted && wi(C.current)), I.current && (I.current.muted = !0, I.current.defaultPlaybackRate = a, I.current.playbackRate = a);
  }, [Ue, a]);
  u.useEffect(() => {
    const V = (ue) => {
      ue.detail && (b.current && (b.current.volume = ue.detail.volume), C.current && (C.current.volume = ue.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", V), () => window.removeEventListener("itb-audio-state-changed", V);
  }, []), u.useEffect(() => {
    b.current && (b.current.defaultPlaybackRate = a, b.current.playbackRate = a), C.current && (C.current.defaultPlaybackRate = a, C.current.playbackRate = a), I.current && (I.current.defaultPlaybackRate = a, I.current.playbackRate = a);
  }, [a]), u.useEffect(() => {
    if (!S || !U) return;
    if (o) {
      B.current = !0;
      return;
    }
    const V = B.current;
    B.current = o;
    let ue = !0;
    const ae = new AbortController(), Ae = Math.round(t + r), Ke = Sn.get(U, Ae, ie);
    if (Ke) {
      fn(Ke);
      return;
    }
    const Je = setTimeout(() => {
      ue && Sn.fetchFrame(U, Ae, ae.signal, ie).then((ot) => {
        ue && ot && fn(ot);
      });
    }, V ? 25 : 35), Ve = Sn.subscribe((ot, Mt, Kt, Jt) => {
      ot === U && Mt === Ae && (!Jt || Jt === ie) && ue && fn(Kt);
    });
    return () => {
      ue = !1, clearTimeout(Je), ae.abort(), Ve();
    };
  }, [S, U, t, r, o, Ut, ie]), u.useEffect(() => {
    if (!ee || q !== "split" && q !== "pip" || !ke || o) {
      en(null);
      return;
    }
    let V = !0;
    const ue = new AbortController(), ae = Math.round(t + r), Ae = Sn.get(U, ae, ke);
    if (Ae) {
      en(Ae);
      return;
    }
    const Ke = setTimeout(() => {
      V && Sn.fetchFrame(U, ae, ue.signal, ke).then((Je) => {
        V && Je && en(Je);
      });
    }, 40), He = Sn.subscribe((Je, Ve, ot, Mt) => {
      Je === U && Ve === ae && (!Mt || Mt === ke) && V && en(ot);
    });
    return () => {
      V = !1, clearTimeout(Ke), ue.abort(), He();
    };
  }, [ee, q, ke, S, U, t, r]);
  const Se = u.useCallback((V, ue = ie) => {
    const ae = Math.round(t), Ae = Math.round(t + n), Ke = Math.min(Ae, Math.max(ae, Math.round(t + V)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(U)}&startEpoch=${ae}&endEpoch=${Ae}&seekEpoch=${Ke}&displayId=${encodeURIComponent(ue)}&_t=${Date.now()}`;
  }, [t, n, U, ie]);
  u.useEffect(() => {
    if (!(!S || !U))
      if (o && je) {
        const V = _.current;
        K.current = V, A.current = V, z.current = !1;
        const ue = Se(V, ie);
        ge(!1), Qe(!0), xt("A"), Pe(ue), Qt(""), _t(null), Bn((q === "split" || q === "pip") && ke ? Se(V, ke) : "");
      } else o || (G.current && clearTimeout(G.current), z.current = !1, Pe(""), Qt(""), Bn(""), _t(null), ge(!1), Qe(!1), b.current && b.current.pause(), C.current && C.current.pause(), I.current && I.current.pause());
  }, [o, S, U, je, Se, ie, q, ke]), u.useEffect(() => {
    if (Be.current !== ie && (Be.current = ie, o && je)) {
      const V = _.current;
      K.current = V;
      const ue = Se(V, ie);
      ge(!1), Qe(!0), xt("A"), Pe(ue), Qt("");
    }
  }, [ie, o, je, Se]), u.useEffect(() => {
    if (!S || !U) return;
    const V = Math.abs(r - A.current);
    if (!o || V < 15) {
      A.current = r;
      return;
    }
    return z.current = !0, A.current = r, K.current = r, b.current && b.current.pause(), C.current && C.current.pause(), I.current && I.current.pause(), ge(!1), Qe(!0), G.current && clearTimeout(G.current), G.current = setTimeout(() => {
      if (!je) {
        Pe(""), Qt(""), Bn(""), Qe(!1), z.current = !1;
        return;
      }
      const ue = _.current, ae = Se(ue, ie);
      xt("A"), Pe(ae), Qt(""), _t(null), (q === "split" || q === "pip") && ke && Bn(Se(ue, ke));
    }, 75), () => {
      G.current && clearTimeout(G.current);
    };
  }, [r, o, S, U, je, Se, ie, q, ke]), u.useEffect(() => {
    if (!o || !Ut || Me.length === 0) return;
    const V = t + _.current, ue = Me.map((ae) => ({
      start: ae.startEpochMs ?? ae.startEpoch ?? 0,
      end: ae.endEpochMs ?? ae.endEpoch ?? 0
    })).filter((ae) => ae.start > V + 500).sort((ae, Ae) => ae.start - Ae.start)[0];
    if (ue && (!bt || bt.start !== ue.start)) {
      const ae = ue.start - t;
      if (ae < y) {
        const Ae = Se(ae, ie);
        _t({ start: ue.start, ms: ae }), Ue === "A" ? Qt(Ae) : Pe(Ae);
      }
    }
  }, [o, Ut, r, t, y, Me, bt, Ue, Se, ie]);
  const We = u.useCallback(() => {
    if (bt) {
      const V = Ue === "A" ? "B" : "A", ue = V === "A" ? b : C;
      xt(V), K.current = bt.ms, A.current = bt.ms, _t(null), ue.current && ue.current.play().then(() => {
        Ee();
      }).catch(() => {
      });
    } else
      f ? l(d) : i(!1);
  }, [bt, Ue, Ee, f, d, l, i]), ht = u.useCallback(() => {
    const V = wn.current;
    if (!V || z.current || !o || W.current) return;
    const ue = V.currentTime * 1e3, ae = Math.round(K.current + ue);
    if (x && x.length > 0) {
      const Ae = t + ae, Ke = x.find((He) => Ae >= He.startEpochMs && Ae < He.endEpochMs);
      if (Ke) {
        W.current = !0;
        const He = Math.round(Ke.endEpochMs - t) + 10;
        l(He), setTimeout(() => {
          W.current = !1;
        }, 150);
        return;
      }
    }
    if (ae >= y) {
      f ? l(d) : (i(!1), l(y));
      return;
    }
    A.current = ae, l(ae);
  }, [wn, o, t, x, y, f, d, l, i]), kt = Nt && o && !ut;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${q} ${N}`, children: [
    ee && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (V) => V.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "director" ? "active" : ""}`,
          onClick: () => Y("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "canvas" ? "active" : ""}`,
          onClick: () => Y("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "split" ? "active" : ""}`,
          onClick: () => Y("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "pip" ? "active" : ""}`,
          onClick: () => Y("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      F.map((V, ue) => {
        const ae = (V.displayId ?? `mon-${ue}`).toLowerCase(), Ae = V.displayNumber ?? ue + 1, Ke = V.displayName || `Screen ${Ae}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${q === ae ? "active" : ""}`,
            onClick: () => Y(ae),
            title: `Pin directly to ${Ke}`,
            children: [
              "🖥️ ",
              Ae
            ]
          },
          ae
        );
      }),
      q === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          F.map((V, ue) => {
            const ae = (V.displayId ?? `mon-${ue}`).toLowerCase(), Ae = V.displayNumber ?? ue + 1, Ke = V.displayName || `Screen ${Ae}`, He = ie === ae;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${He ? "active" : ""} ${X && He ? "is-override" : ""}`,
                onClick: () => {
                  $ == null || $(S, t + r, ae);
                },
                title: `Punch ${Ke} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ae
                  ] }),
                  He && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: X ? "✋" : "⚡" })
                ]
              },
              `punch-${ae}`
            );
          }),
          X && v && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                v == null || v(S, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    ee && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${X ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: q === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : q === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : q === "pip" ? `🪟 PiP MODE: ${_e.toUpperCase()} (HERO)` : `${X ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${_e.toUpperCase()}` }),
      X && q === "director" && v && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => v == null ? void 0 : v(S, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    yt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: b,
        src: yt,
        className: "feed-video-element",
        style: {
          opacity: Ut && Ue === "A" ? 1 : 0,
          zIndex: Ue === "A" ? 3 : 1,
          pointerEvents: Ue === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Ue === "A",
        preload: "auto",
        muted: Ue !== "A" || rl().isMuted,
        onCanPlay: () => {
          Ee(), o && Ue === "A" && b.current && b.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "A" && (z.current = !1, ge(!0), Qe(!1), b.current && (b.current.defaultPlaybackRate = a, b.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "A" && Qe(!0);
        },
        onTimeUpdate: () => {
          var V;
          Ue === "A" && (!Ut && ((V = b.current) == null ? void 0 : V.currentTime) > 0 && (z.current = !1, ge(!0), Qe(!1), b.current && (b.current.defaultPlaybackRate = a, b.current.playbackRate = a)), ht());
        },
        onError: () => {
          Ue === "A" && (z.current = !1, Qe(!1), ge(!1));
        },
        onEnded: () => {
          Ue === "A" && We();
        }
      }
    ),
    dt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: C,
        src: dt,
        className: "feed-video-element",
        style: {
          opacity: Ut && Ue === "B" ? 1 : 0,
          zIndex: Ue === "B" ? 3 : 1,
          pointerEvents: Ue === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Ue === "B",
        preload: "auto",
        muted: Ue !== "B" || rl().isMuted,
        onCanPlay: () => {
          Ee(), o && Ue === "B" && C.current && C.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "B" && (z.current = !1, ge(!0), Qe(!1), C.current && (C.current.defaultPlaybackRate = a, C.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "B" && Qe(!0);
        },
        onTimeUpdate: () => {
          var V;
          Ue === "B" && (!Ut && ((V = C.current) == null ? void 0 : V.currentTime) > 0 && (z.current = !1, ge(!0), Qe(!1), C.current && (C.current.defaultPlaybackRate = a, C.current.playbackRate = a)), ht());
        },
        onError: () => {
          Ue === "B" && (z.current = !1, Qe(!1), ge(!1));
        },
        onEnded: () => {
          Ue === "B" && We();
        }
      }
    ),
    q !== "split" && q !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: Ut ? 0 : 2 },
        children: ut ? /* @__PURE__ */ s.jsx(ip, { isPlaying: o }) : gt && gt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
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
    q === "split" && ee && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        gt && gt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: gt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        pn && pn !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: pn, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    q === "pip" && ee && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (V) => {
          V.stopPropagation(), be((ue) => !ue);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              D.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          pn && pn !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: pn, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (q === "canvas" || q === "all-displays") && ee && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: Xe, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: Ne.width ? `${Ne.width}px` : "92%",
            height: Ne.height ? `${Ne.height}px` : "auto",
            aspectRatio: `${Ie.totalWidth} / ${Ie.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: F.map((V, ue) => {
            const ae = yx(V, Ie), Ae = (V.displayId ?? V.DisplayId ?? `mon-${ue}`).toLowerCase(), Ke = me[Ae] || (Ae === ie ? gt : null), He = !!(V.isPrimary ?? V.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${He ? "is-primary" : ""}`,
                style: {
                  left: `${ae.leftPct}%`,
                  top: `${ae.topPct}%`,
                  width: `${ae.widthPct}%`,
                  height: `${ae.heightPct}%`
                },
                onClick: (Je) => {
                  Je.stopPropagation(), k ? k(Ae) : Y(Ae);
                },
                title: `Display ${ue + 1} (${V.width || 1920}x${V.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      He ? "★ " : "",
                      "🖥 ",
                      ue + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: V.displayName || V.DisplayName || Ae.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      V.width || 1920,
                      "x",
                      V.height || 1080
                    ] }),
                    k && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (Je) => {
                          Je.stopPropagation(), k(Ae);
                        },
                        title: `Open Display ${ue + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Ke && Ke !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Ke,
                      className: "canvas-frame-img",
                      alt: Ae
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      V.displayName || Ae.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Ae
            );
          })
        }
      )
    ] }),
    kt && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          ie.toUpperCase()
        ] })
      ] })
    ] }) }),
    q === "director" && ve && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        ie.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        qe(ve.startEpochMs ?? ve.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        qe(ve.endEpochMs ?? ve.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    ee && q !== "canvas" && /* @__PURE__ */ s.jsx(
      gx,
      {
        displays: F,
        activeDisplayId: ie,
        mode: X ? "MANUAL" : "AUTO",
        activeTimeRange: ve ? `${qe(ve.startEpochMs ?? ve.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${qe(ve.endEpochMs ?? ve.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (V) => {
          $ && $(S, t + r, V), Y(V);
        }
      }
    ),
    w && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      U
    ] }) })
  ] });
}
const Na = 2200, ka = 400;
function Nx({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], y = d.epochMs + Xo, f = e - y;
      if (f >= 0 && f <= Na)
        return {
          ...d,
          elapsed: f
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let i = 1;
  if (o.elapsed > Na - ka) {
    const c = (o.elapsed - (Na - ka)) / ka;
    i = Math.max(0, 1 - c);
  }
  if (i <= 0.05) return null;
  if (r === "CAPTION") {
    const c = up(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const a = cp(o.keyCombination);
  return a.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: a.map((c, d) => /* @__PURE__ */ s.jsxs(ao.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < a.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const kx = [
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
function mp({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? $s.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: kx.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const Fd = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), i = r % 60, a = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(i)}.${c(a)}`;
};
function wx({
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
  onZoomChange: y,
  onZoomReset: f,
  onFitRange: m,
  onJumpViewportTo: x,
  viewportStartMs: w = 0,
  onViewportStartChange: E,
  playheadMs: $ = 0,
  playheadEpochMs: v = 0,
  setPlayheadMs: g,
  inPointMs: h = 0,
  setInPointMs: k,
  outPointMs: M = 36e5,
  setOutPointMs: j,
  recordingSegments: N = {},
  globalGaps: b = [],
  onExport: C,
  isPlaying: I,
  setIsPlaying: _,
  isLooping: K = !0,
  setIsLooping: A,
  playbackSpeed: z,
  setPlaybackSpeed: G,
  keystrokeMode: B = "BURN_IN",
  onChangeKeystrokeMode: W,
  keystrokes: S = [],
  showRulerKeystrokes: U = !1,
  onToggleRulerKeystrokes: F,
  directorPlan: ee,
  onOverrideDisplay: R,
  onSplitDirectorSegment: Z,
  onChangeDirectorSegmentDisplay: Q,
  onResetDirectorSegmentToAuto: q
}) {
  var pn, en, wn;
  const [Y, re] = u.useState(!1), te = I !== void 0 ? I : Y, de = u.useCallback((Ee) => {
    const Se = typeof Ee == "function" ? Ee(te) : Ee;
    _ ? _(Se) : re(Se), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Se } }));
  }, [te, _]), [be, ve] = u.useState(!0), ie = K !== void 0 ? K : be, ke = A || ve, [_e, D] = u.useState(1), X = z !== void 0 ? z : _e, me = G || D, [we, Xe] = u.useState(null), [Ne, le] = u.useState(!1), [Ie, ce] = u.useState(b), Be = ((pn = t == null ? void 0 : t.displays) == null ? void 0 : pn.length) > 1 || ((wn = (en = t == null ? void 0 : t.topology) == null ? void 0 : en.displays) == null ? void 0 : wn.length) > 1, [Me, Ye] = u.useState(() => {
    if (!Be) return "mon-0";
    if (n) return n;
    try {
      const Ee = localStorage.getItem("itb_spotlight_viewmode");
      if (Ee) return Ee;
    } catch {
    }
    return "canvas";
  }), je = u.useCallback((Ee) => {
    Ye((Se) => {
      const We = typeof Ee == "function" ? Ee(Se) : Ee;
      try {
        localStorage.setItem("itb_spotlight_viewmode", We);
      } catch {
      }
      return We;
    });
  }, []), [ut, Ue] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!Be) {
        Ye("mon-0");
        return;
      }
      if (n)
        Ye(n);
      else
        try {
          const Ee = localStorage.getItem("itb_spotlight_viewmode");
          Ye(Ee || "canvas");
        } catch {
          Ye("canvas");
        }
    }
  }, [e, n, Be, t == null ? void 0 : t.id]);
  const xt = u.useRef(null), yt = u.useRef(d);
  yt.current = d;
  const Pe = u.useRef(w);
  Pe.current = w;
  const dt = u.useRef(c);
  dt.current = c;
  const Qt = u.useRef(t && t.id);
  u.useEffect(() => {
    var Ee, Se, We;
    t && t.id && Qt.current !== t.id && (Qt.current = t.id, me(1), ((Ee = t.displays) == null ? void 0 : Ee.length) > 1 || ((We = (Se = t.topology) == null ? void 0 : Se.displays) == null ? void 0 : We.length) > 1 || je("mon-0"));
  }, [t, me]);
  const ns = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Ee = xt.current;
    if (!Ee || !y || !E) return;
    const Se = (We) => {
      We.preventDefault(), We.stopPropagation();
      const ht = We.ctrlKey || We.shiftKey, kt = yt.current, V = Pe.current, ue = dt.current || 36e5;
      if (ht) {
        const ae = Math.abs(We.deltaX) > Math.abs(We.deltaY) ? We.deltaX : We.deltaY;
        if (ae === 0) return;
        const Ae = ue / kt, Ke = Math.max(0, ue - Ae), He = Ae * 0.08 * (ae > 0 ? 1 : -1), Je = Math.max(0, Math.min(Ke, V + He));
        Pe.current = Je, E(Je);
      } else {
        if (We.deltaY === 0) return;
        const Ae = We.deltaY < 0 ? 1.25 : 0.8, Ke = Ee.getBoundingClientRect(), He = Ke.left + 150, Je = Ke.right - 58, Ve = Math.max(100, Je - He);
        let ot = 0.5;
        We.clientX >= He && We.clientX <= Je ? ot = (We.clientX - He) / Ve : Ke.width > 0 && (ot = Math.max(0, Math.min(1, (We.clientX - Ke.left) / Ke.width)));
        const Mt = Math.max(32, ue / 2e3), Kt = Math.max(1, Math.min(Mt, Math.round(kt * Ae * 100) / 100));
        if (Kt === kt) return;
        const Jt = ue / kt, An = ue / Kt, Rt = V + ot * Jt - ot * An, Ft = Math.max(0, ue - An), jn = Math.max(0, Math.min(Ft, Rt));
        yt.current = Kt, Pe.current = jn, E(jn), y(Kt);
      }
    };
    return Ee.addEventListener("wheel", Se, { passive: !1, capture: !0 }), () => Ee.removeEventListener("wheel", Se, { capture: !0 });
  }, [e, t, y, E]);
  const Bn = u.useCallback(() => {
    f ? f() : (Pe.current = 0, yt.current = 1, E == null || E(0), y == null || y(1));
  }, [f, E, y]), bt = u.useCallback((Ee, Se) => {
    if (m)
      m(Ee, Se);
    else {
      const We = Math.max(1e3, Se - Ee), ht = Math.max(500, We * 0.05), kt = Math.max(0, Ee - ht), ue = Math.min(c, Se + ht) - kt, ae = Math.max(32, c / 2e3), Ae = Math.max(1, Math.min(ae, Number((c / ue).toFixed(1)))), Ke = c / Ae, He = Math.max(0, Math.min(kt, c - Ke));
      Pe.current = He, yt.current = Ae, E == null || E(He), y == null || y(Ae);
    }
  }, [m, c, E, y]), _t = u.useCallback((Ee, Se = "center") => {
    if (x)
      x(Ee, Se);
    else {
      if (Ee == null) return;
      const We = yt.current || 1, ht = c / Math.max(1, We), kt = Se === "start" ? ht / 4 : ht * 0.75, V = Math.max(0, Math.min(Ee - kt, c - ht));
      Pe.current = V, E == null || E(V);
    }
  }, [x, c, E]), Ut = u.useCallback(() => {
    de((Ee) => !Ee);
  }, [de]), ge = u.useCallback(async () => {
    var ht;
    if (!t || Math.abs(M - h) < 1e3) return;
    const Ee = (B || "NONE").toUpperCase().replace("-", "_");
    let Se;
    Ee === "NONE" || Ee === "OFF" ? Se = "None" : Ee === "CAPTION" ? Se = "Caption" : Se = "BurnIn";
    const We = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: i + Math.round(h),
      outEpochMs: i + Math.round(M),
      keystrokeMode: Se,
      layoutMode: Be ? Me : "mon-0",
      targetDisplayId: !Be || Me === "mon-0" || Me === "mon-1" || Me.startsWith("mon-") ? Be ? Me : "mon-0" : null,
      isPipSwapped: ut,
      directorSegments: Be ? (ee == null ? void 0 : ee.segments) || ((ht = t == null ? void 0 : t.directorPlan) == null ? void 0 : ht.segments) || [] : []
    };
    try {
      C ? await C(We) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(We)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(We)
      });
    } catch (kt) {
      console.warn("[SoloSpotlightModal] Export trigger error:", kt);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, h, M, i, C, B, Me, ut, ee]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Ee = (Se) => {
      if ((Se.ctrlKey || Se.metaKey) && (Se.key === "e" || Se.key === "E")) {
        Se.preventDefault(), ge();
        return;
      }
      if (Se.key === "?" || Se.shiftKey && Se.code === "Slash") {
        Se.preventDefault(), le((We) => !We);
        return;
      }
      if (Ne) {
        Se.key === "Escape" && le(!1);
        return;
      }
      if (Se.key === "Escape" || Se.code === "Escape") {
        Se.preventDefault(), Se.stopPropagation(), o == null || o();
        return;
      }
      if (Se.code === "Space") {
        Se.preventDefault(), Ut();
        return;
      }
      if (Se.code === "KeyI") {
        Se.preventDefault(), k(Math.max(0, Math.min($, M - 1e3)));
        return;
      }
      if (Se.code === "KeyO") {
        Se.preventDefault(), j(Math.min(c, Math.max($, h + 1e3)));
        return;
      }
      if (Se.code === "ArrowLeft" || Se.code === "ArrowRight") {
        Se.preventDefault(), de(!1);
        const We = Se.code === "ArrowLeft";
        let ht;
        if (Se.ctrlKey || Se.metaKey)
          ht = 33;
        else if (Se.shiftKey)
          ht = 5e3;
        else {
          const kt = Math.max(1, d);
          ht = Math.max(33, Math.round(1e3 / kt));
        }
        g((kt) => {
          const V = We ? kt - ht : kt + ht;
          return Math.max(0, Math.min(c, V));
        });
        return;
      }
      if (Se.key === "ArrowDown") {
        Se.preventDefault();
        const We = r.findIndex((ht) => ht.id === t.id);
        if (We !== -1) {
          const ht = (We + 1) % r.length;
          l(r[ht].id);
        }
        return;
      }
      if (Se.key === "ArrowUp") {
        Se.preventDefault();
        const We = r.findIndex((ht) => ht.id === t.id);
        if (We !== -1) {
          const ht = (We - 1 + r.length) % r.length;
          l(r[ht].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Ee, { capture: !0 }), () => window.removeEventListener("keydown", Ee, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    $,
    h,
    M,
    c,
    d,
    k,
    j,
    g,
    ge,
    Ut,
    de,
    Ne
  ]);
  const Nt = r.findIndex((Ee) => Ee.id === (t && t.id)), Qe = r[Nt - 1], gt = r[Nt + 1];
  if (!e || !t) return null;
  const fn = v > 0 ? v : Math.round(i + $);
  return $s.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      we && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${we.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          we.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          we.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          we.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: we.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Fd(M - h),
            " (",
            qe(i + h, a),
            " → ",
            qe(i + M, a),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          vx,
          {
            station: t,
            baseEpochMs: i,
            totalDurationMs: c,
            playheadMs: $,
            setPlayheadMs: g,
            isPlaying: te,
            setIsPlaying: de,
            playbackSpeed: X,
            timeMode: a,
            inPointMs: h,
            outPointMs: M,
            isLooping: ie,
            recordingSegments: N,
            globalGaps: Ie,
            showWatermark: !0,
            directorPlan: ee || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: R,
            onResetOverride: q,
            viewMode: Me,
            onViewModeChange: je,
            isPipSwapped: ut,
            onPipSwapChange: Ue
          }
        ),
        /* @__PURE__ */ s.jsx(
          Nx,
          {
            currentEpochMs: fn,
            keystrokes: S,
            keystrokeMode: B
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
              onClick: (Ee) => {
                Ee.preventDefault(), Ee.stopPropagation(), o == null || o();
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
              disabled: !Qe,
              onClick: () => Qe && l(Qe.id),
              title: Qe ? `Previous: ${Qe.displayName || Qe.roleAlias || Qe.hostname || Qe.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            Nt + 1,
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${te ? "is-playing-dimmed" : ""}`, ref: xt, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Fd(M - h) })
            ] }),
            (() => {
              const Ee = Me === "mon-0" ? "SCREEN 1" : Me === "mon-1" ? "SCREEN 2" : Me.startsWith("mon-") ? `SCREEN ${parseInt(Me.slice(4)) + 1}` : Me.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: ge,
                  title: `Export Selected Cut Window as ${Ee} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: Me === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Ee})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            ap,
            {
              activeStationId: t.id,
              isPlaying: te,
              setIsPlaying: Ut,
              isLooping: ie,
              setIsLooping: ke,
              playbackSpeed: X,
              onChangeSpeed: me,
              baseEpochMs: i,
              timeMode: a,
              totalDurationMs: c,
              inPointMs: h,
              setInPointMs: k,
              outPointMs: M,
              setOutPointMs: j,
              onSetInPoint: () => k(Math.max(0, Math.min($, M - 1e3))),
              onSetOutPoint: () => j(Math.min(c, Math.max($, h + 1e3))),
              onStepFrameBackward: () => {
                de(!1), g((Ee) => Math.max(0, Ee - 33));
              },
              onStepFrameForward: () => {
                de(!1), g((Ee) => Math.min(c, Ee + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: qe(i + $, a) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          hp,
          {
            stations: ns,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: i,
            timeMode: a,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: y,
            onZoomReset: Bn,
            onFitRange: bt,
            onJumpViewportTo: _t,
            viewportStartMs: w,
            onViewportStartChange: E,
            playheadMs: $,
            setPlayheadMs: (Ee) => {
              de(!1), g(Ee);
            },
            inPointMs: h,
            setInPointMs: k,
            outPointMs: M,
            setOutPointMs: j,
            recordingSegments: N,
            onExport: ge,
            onEstimateLoaded: (Ee) => {
              Ee != null && Ee.removedGlobalGaps && ce(Ee.removedGlobalGaps);
            },
            keystrokeMode: B,
            onChangeKeystrokeMode: W,
            keystrokes: S,
            showKeystrokes: U,
            showRulerKeystrokes: U,
            onToggleRulerKeystrokes: F,
            onSplitDirectorSegment: Z,
            onChangeDirectorSegmentDisplay: Q,
            onResetDirectorSegmentToAuto: q
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        mp,
        {
          isOpen: Ne,
          onClose: () => le(!1)
        }
      )
    ] }),
    document.body
  );
}
function gp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), i = u.useRef(!1), a = u.useRef(0), [c, d] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [y, f] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), m = u.useCallback(async () => {
    if (!i.current && !(typeof document < "u" && document.hidden)) {
      i.current = !0;
      try {
        let N = await fetch("/api/v1/extractor-advanced/jobs");
        if (N.ok || (N = await fetch("/api/v1/extractor/jobs")), N.ok) {
          a.current = 0;
          const b = await N.json(), C = Array.isArray(b) ? b : [];
          n(C), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: C }));
        } else
          a.current++;
      } catch (N) {
        a.current++, a.current <= 2 && console.warn("[ExportJobMonitor] Polling error:", N);
      } finally {
        i.current = !1;
      }
    }
  }, []);
  u.useEffect(() => {
    let N = !0, b = null;
    const C = () => {
      if (!N) return;
      let _ = 2500;
      typeof document < "u" && document.hidden ? _ = 3e4 : a.current > 0 && (_ = Math.min(3e4, 2500 * Math.pow(2, Math.min(a.current, 4)))), b = setTimeout(async () => {
        await m(), C();
      }, _);
    }, I = () => {
      !document.hidden && N && (clearTimeout(b), a.current = 0, m().then(C));
    };
    return document.addEventListener("visibilitychange", I), m().then(C), () => {
      N = !1, clearTimeout(b), document.removeEventListener("visibilitychange", I);
    };
  }, [m]), u.useEffect(() => {
    const N = () => {
      f(!0), m();
    };
    return window.addEventListener("open-export-monitor", N), () => window.removeEventListener("open-export-monitor", N);
  }, [m]), u.useEffect(() => {
    if (!y || c) return;
    const N = (b) => {
      o.current && !o.current.contains(b.target) && !b.target.closest(".export-floating-hud") && f(!1);
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [y, c]);
  const x = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && x)
    return null;
  const w = t.filter((N) => N.status === "Processing" || N.status === "Queued"), E = t.filter((N) => N.status === "Completed" || N.isCompleted), $ = () => {
    d((N) => {
      const b = !N;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(b));
      } catch {
      }
      return b;
    });
  }, v = () => {
    f(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, g = (N, b) => {
    b.stopPropagation(), !(!N || r.has(N)) && (l((C) => new Set(C).add(N)), setTimeout(() => {
      n((C) => {
        const I = C.filter((_) => (_.jobId || _.id) !== N);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: I })), I;
      }), l((C) => {
        const I = new Set(C);
        return I.delete(N), I;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${N}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}`, { method: "DELETE" })).catch((C) => console.warn("[ExportJobMonitor] Dismiss failed:", C)));
  }, h = async (N, b) => {
    b.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${N}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}/bookmark`, { method: "POST" })), m();
    } catch (C) {
      console.warn("[ExportJobMonitor] Bookmark failed:", C);
    }
  }, k = (N, b) => {
    b.stopPropagation();
    const C = N.networkFolderPath || (N.outputFilePath ? N.outputFilePath.substring(0, N.outputFilePath.lastIndexOf("\\")) : "");
    C && (navigator.clipboard.writeText(C), alert(`UNC Directory Path copied to clipboard:
${C}`));
  }, M = (N) => {
    const b = N.jobId || N.id, C = `/api/v1/extractor-advanced/jobs/${b}/download`, I = document.createElement("a");
    I.href = C, I.download = N.fileName || `archive_${b}.tar`, document.body.appendChild(I), I.click(), document.body.removeChild(I), setTimeout(m, 1e3);
  }, j = (N) => {
    if (!N || N <= 0) return "0 B";
    const b = N / (1024 * 1024);
    return b >= 1e3 ? `${(b / 1024).toFixed(2)} GB` : `${b.toFixed(1)} MB`;
  };
  return t.length === 0 && !y ? null : $s.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !y && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${w.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${w.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: w.length > 0 ? `EXPORTS: ${w.length} PACKAGING` : `${E.length} ARCHIVE${E.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${w.length > 0 ? "" : "ready"}`, children: w.length > 0 ? `${w[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      y && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && f(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (N) => N.stopPropagation(), children: [
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
                onClick: $,
                title: c ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: c ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: v, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((N) => {
          const b = N.status === "Completed" || N.isCompleted, C = N.status === "Failed" || N.isFailed, I = N.status === "Processing" || N.status === "Queued", _ = N.jobId || N.id, K = r.has(_), A = b ? 100 : Math.round(N.progressPercent || N.progressPercentage || N.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${N.status.toLowerCase()} ${N.isBookmarked ? "is-bookmarked" : ""} ${K ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${N.status.toLowerCase()}`, children: b ? "READY" : N.status }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: N.fileName, children: N.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (z) => g(_, z),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                I && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: N.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      A,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, A)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      j(N.fileSizeBytes)
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "telemetry-tags", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "speed", children: N.speedMBps > 0 ? `${N.speedMBps.toFixed(1)} MB/s` : "Analyzing" }),
                      N.estimatedSecondsRemaining > 0 && /* @__PURE__ */ s.jsxs("span", { className: "eta", children: [
                        "ETA ~",
                        Math.ceil(N.estimatedSecondsRemaining),
                        "s"
                      ] })
                    ] })
                  ] })
                ] }),
                b && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: j(N.fileSizeBytes) })
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
                b && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${N.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (z) => h(_, z),
                        title: N.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: N.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (z) => k(N, z),
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
                      onClick: () => M(N),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                C && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
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
function jx({
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
    }, y = (f) => {
      l.current && !l.current.contains(f.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", y), window.addEventListener("keydown", d), () => {
      window.removeEventListener("mousedown", y), window.removeEventListener("keydown", d);
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
function Ex({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 1920, i = r.canvasHeight || 1080, a = o / i;
  let c;
  Math.abs(a - 32 / 9) < 0.15 ? c = "32:9 Dual Screen" : Math.abs(a - 21 / 9) < 0.15 ? c = "21:9 Ultrawide" : Math.abs(a - 16 / 10) < 0.15 ? c = "16:10 WUXGA" : Math.abs(a - 4 / 3) < 0.15 ? c = "4:3 Standard" : Math.abs(a - 16 / 9) < 0.15 ? c = "16:9 Broadcast" : c = `${Math.round(a * 100) / 100}:1 Custom`;
  const d = (N) => {
    const b = Math.round(N * a);
    return b - b % 2;
  }, y = (N, b) => {
    const C = Math.round(N * b / 2073600 * 6 * 10) / 10, I = Math.round(C * 60 / 8 * 10) / 10;
    return `~${C} Mbps (~${I} MB/min)`;
  }, f = [
    {
      id: "NATIVE",
      badge: `Native 1:1 (${o}×${i})`,
      res: `${o} × ${i}`,
      bitrate: y(o, i),
      desc: "Exact 1:1 canvas match (Recommended). Preserves original recorded pixel fidelity without scaling or distortion."
    },
    {
      id: "4K",
      badge: `4K UHD (${d(2160)}×2160)`,
      res: `${d(2160)} × 2160`,
      bitrate: y(d(2160), 2160),
      desc: "Maximum resolution. Uncompromised multi-monitor canvas clarity for NOC video walls."
    },
    {
      id: "2K",
      badge: `2K QHD (${d(1440)}×1440)`,
      res: `${d(1440)} × 1440`,
      bitrate: y(d(1440), 1440),
      desc: "High pixel density. Preserves small fonts, HUD telemetry, and detailed application windows."
    },
    {
      id: "HD",
      badge: `HD 720p (${d(720)}×720)`,
      res: `${d(720)} × 720`,
      bitrate: y(d(720), 720),
      desc: "Compact file size, rapid export. Ideal for low-bandwidth operational networks or fast triage."
    }
  ], [m, x] = u.useState("BurnIn"), [w, E] = u.useState(r.resolution || "NATIVE"), [$, v] = u.useState(!1);
  if (!e) return null;
  const g = async () => {
    v(!0);
    try {
      await n(m, w), t();
    } finally {
      v(!1);
    }
  }, h = (r.layout || "DIRECTOR").toUpperCase(), k = r.stationsCount || 1, M = r.audioSegmentsCount || 1, j = f.find((N) => N.id === w) || f[0];
  return $s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (N) => N.stopPropagation(), children: [
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
              k,
              " WORKSTATION",
              k > 1 ? "S" : ""
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUDIO MASTER MIX:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: M > 1 ? `DYNAMIC ROUTING (${M} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK TRANSITIONS)" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: f.map((N) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${w === N.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: N.id,
              checked: w === N.id,
              onChange: () => E(N.id)
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "quality-card-body", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "quality-card-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "quality-badge", children: N.badge }),
              /* @__PURE__ */ s.jsx("span", { className: "quality-res", children: N.res })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-metric", children: N.bitrate }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-desc", children: N.desc })
          ] })
        ] }, N.id)) }),
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
                onChange: () => x("BurnIn")
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
                onChange: () => x("None")
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: $, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: g, disabled: $, children: $ ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Cx(e, t, n, r, l = null) {
  const [o, i] = u.useState([]), [a, c] = u.useState({}), [d, y] = u.useState(!1), f = u.useRef(o);
  f.current = o;
  const m = u.useCallback(async () => {
    if (isNaN(e)) return;
    const E = e + t;
    y(!0);
    try {
      const $ = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(E),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), v = await fetch(`/api/v1/extractor-advanced/stations?${$.toString()}`);
      if (v.ok) {
        const g = v.headers.get("content-type");
        if (g && g.includes("application/json")) {
          const h = await v.json(), M = (Array.isArray(h) ? h : h.stations || h.items || []).filter((j) => (j.recordingsCount || (j.segments ? j.segments.length : 0)) > 0).map((j) => {
            var N, b;
            return {
              id: String(j.id || j.stationId || j.agentId || j.hostname),
              hostname: j.hostname || "Station",
              roleAlias: j.roleAlias || null,
              roleHistory: j.roleHistory || [],
              displayName: j.displayName || j.roleAlias || j.hostname || "Station",
              isOnline: j.isOnline !== void 0 ? j.isOnline : !0,
              recordingsCount: j.recordingsCount || 0,
              segments: j.segments || [],
              displays: j.displays || j.Displays || ((N = j.displayTopology) == null ? void 0 : N.displays) || ((b = j.DisplayTopology) == null ? void 0 : b.Displays) || [],
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
            if (!j || j.length === 0) return M;
            const N = new Map(j.map((I) => [I.id, I]));
            let b = j.length !== M.length;
            const C = M.map((I) => {
              const _ = N.get(I.id);
              return _ ? _.isOnline === I.isOnline && _.displayName === I.displayName && _.roleAlias === I.roleAlias && _.feedSpec === I.feedSpec && _.recordingsCount === I.recordingsCount && _.fps === I.fps ? _ : (b = !0, { ..._, ...I }) : (b = !0, I);
            });
            return b ? C : j;
          });
        }
      }
    } catch ($) {
      console.warn("[useStudioData] Failed fetching active stations:", $);
    } finally {
      y(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    m();
  }, [m]);
  const x = u.useMemo(() => {
    const E = /* @__PURE__ */ new Set();
    return o.forEach(($) => {
      $.id && E.add($.id), $.hostname && E.add($.hostname);
    }), Array.from(E).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!x || isNaN(e)) {
      c({});
      return;
    }
    let E = !0;
    return (async () => {
      try {
        const v = e + t, g = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(x)}&startEpoch=${e}&endEpoch=${v}`);
        if (g.ok && E) {
          const h = await g.json() || {}, k = {};
          (f.current || []).forEach((M) => {
            const j = h[M.id] || h[M.hostname] || h[M.displayName] || [];
            k[M.id] = j, k[M.hostname] = j;
          }), Object.keys(h).forEach((M) => {
            k[M] || (k[M] = h[M]);
          }), c(k);
        }
      } catch {
        E && c({});
      }
    })(), () => {
      E = !1;
    };
  }, [x, e, t]);
  const w = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let E = 1 / 0, $ = -1 / 0;
    o.forEach((k) => {
      (a[k.id] || a[k.hostname] || k.segments || []).forEach((j) => {
        const N = j.startEpochMs ?? j.startEpoch ?? 0, b = j.endEpochMs ?? j.endEpoch ?? 0;
        N > 0 && N < E && (E = N), b > 0 && b > $ && ($ = b);
      });
    });
    let v = 1 / 0, g = -1 / 0;
    l && (a[l] || []).forEach((M) => {
      const j = M.startEpochMs ?? M.startEpoch ?? 0, N = M.endEpochMs ?? M.endEpoch ?? 0;
      j > 0 && j < v && (v = j), N > 0 && N > g && (g = N);
    });
    const h = (k) => k === 1 / 0 || k === -1 / 0 ? null : Math.max(0, Math.min(t, k - e));
    return {
      globalFirstMs: h(E),
      globalLastMs: h($),
      currentFirstMs: h(v),
      currentLastMs: h(g)
    };
  }, [o, a, l, e, t]);
  return {
    allStations: o,
    setAllStations: i,
    recordingSegments: a,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: m,
    movieBoundaries: w
  };
}
function Sx({
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
  initialPlaybackSpeed: y = 1,
  isGridMode: f = !1
}) {
  const [m, x] = u.useState(a), [w, E] = u.useState(c), [$, v] = u.useState(d), [g, h] = u.useState(y), k = u.useRef(null), M = u.useRef(null), j = o || l, N = u.useMemo(() => j ? i[j.id] || j.segments || [] : [], [j, i]), b = N.some((K) => {
    const A = K.startEpochMs ?? K.startEpoch ?? 0, z = K.endEpochMs ?? K.endEpoch ?? 0, G = e + m;
    return G >= A && G <= z;
  }), C = !!(!f && j && b);
  u.useEffect(() => {
    x((K) => K < t ? t : K > n ? (E(!1), n) : K);
  }, [t, n]);
  const I = u.useCallback((K) => {
    k.current || (k.current = K);
    const A = (K - k.current) * g, z = Math.min(A, 250 * g);
    k.current = K, x((G) => {
      let B = G + z;
      if (r && r.length > 0) {
        const W = e + B, S = r.find((U) => W >= U.startEpochMs && W < U.endEpochMs);
        S && (B = S.endEpochMs - e);
      }
      return B >= n && ($ ? B = t : (E(!1), B = n)), B;
    }), w && (!C || f) && (M.current = requestAnimationFrame(I));
  }, [w, $, t, n, r, e, C, g, f]);
  u.useEffect(() => (w && (!C || f) ? (k.current = performance.now(), M.current = requestAnimationFrame(I)) : (M.current && cancelAnimationFrame(M.current), k.current = null), () => {
    M.current && cancelAnimationFrame(M.current);
  }), [w, I, C, f]);
  const _ = u.useCallback(() => {
    if (w)
      E(!1);
    else {
      let K = m;
      const A = e + K, z = r == null ? void 0 : r.find((G) => A >= G.startEpochMs && A < G.endEpochMs);
      if (z)
        K = z.endEpochMs - e;
      else if (j && !b) {
        const G = N.map((B) => ({ start: B.startEpochMs ?? B.startEpoch ?? 0, end: B.endEpochMs ?? B.endEpoch ?? 0 })).filter((B) => B.start > A).sort((B, W) => B.start - W.start)[0];
        G && (K = G.start - e);
      }
      K !== m && x(K), E(!0);
    }
  }, [w, m, e, r, j, b, N]);
  return {
    playheadMs: m,
    setPlayheadMs: x,
    isPlaying: w,
    setIsPlaying: E,
    isLooping: $,
    setIsLooping: v,
    playbackSpeed: g,
    setPlaybackSpeed: h,
    togglePlaySmart: _
  };
}
function bx(e) {
  return 1 - Math.pow(1 - e, 3);
}
function Mx({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [i, a] = u.useState(r), c = u.useRef(null), d = u.useRef(i);
  d.current = i;
  const y = Math.max(32, t / 2e3), f = t / l, m = u.useCallback(($, v = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const g = d.current, h = $ - g;
    if (Math.abs(h) < 1) return;
    const k = performance.now(), M = (j) => {
      const N = j - k, b = Math.min(1, N / v);
      a(Math.round(g + h * bx(b))), b < 1 ? c.current = requestAnimationFrame(M) : c.current = null;
    };
    c.current = requestAnimationFrame(M);
  }, []), x = u.useCallback(($, v) => {
    const g = Math.max(1e3, v - $), h = Math.max(500, g * 0.05), k = Math.max(0, $ - h), j = Math.min(t, v + h) - k, N = Math.max(1, Math.min(y, Number((t / j).toFixed(1)))), b = t / N, C = Math.max(0, Math.min(k, t - b));
    m(C), o(N);
  }, [t, y, m]), w = u.useCallback(() => {
    m(0), o(1);
  }, [m]), E = u.useCallback(($, v = "center") => {
    if ($ == null) return;
    const g = v === "start" ? f / 4 : f * 0.75, h = Math.max(0, Math.min($ - g, t - f));
    m(h);
  }, [f, t, m]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    const $ = e == null ? void 0 : e.current;
    if (!$) return;
    const v = (g) => {
      if (g.preventDefault(), g.stopPropagation(), g.ctrlKey || g.shiftKey) {
        const k = Math.abs(g.deltaX) > Math.abs(g.deltaY) ? g.deltaX : g.deltaY;
        if (k === 0) return;
        const M = t / l, j = Math.max(0, t - M), N = M * 0.08 * (k > 0 ? 1 : -1);
        a((b) => Math.max(0, Math.min(j, b + N)));
      } else {
        if (g.deltaY === 0) return;
        const M = g.deltaY < 0 ? 1.25 : 0.8, j = $.getBoundingClientRect(), N = Math.max(0, Math.min(j.width, g.clientX - j.left)), b = j.width > 0 ? N / j.width : 0.5;
        o((C) => {
          const I = Math.max(1, Math.min(y, Math.round(C * M * 100) / 100));
          if (I === C) return C;
          const _ = t / C, K = t / I, z = i + b * _ - b * K, G = Math.max(0, t - K);
          return a(Math.max(0, Math.min(G, z))), I;
        });
      }
    };
    return $.addEventListener("wheel", v, { passive: !1, capture: !0 }), () => $.removeEventListener("wheel", v, { capture: !0 });
  }, [e, t, l, i, y]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: i,
    setViewportStartMs: a,
    viewportDurationMs: f,
    animateViewportTo: m,
    fitRange: x,
    resetZoom: w,
    jumpViewportTo: E
  };
}
function Tx({
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
  outPointMs: y,
  setOutPointMs: f,
  totalTimelineDurationMs: m,
  zoomLevel: x = 1,
  togglePlaySmart: w,
  onToggleHelpModal: E,
  onSplitDirectorAtPlayhead: $,
  isModalActive: v = !1
}) {
  u.useEffect(() => {
    const g = (h) => {
      const k = h.target;
      if (!(k.tagName === "INPUT" || k.tagName === "TEXTAREA" || k.tagName === "SELECT" || k.isContentEditable || k.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), E == null || E();
          return;
        }
        if (!(v || t)) {
          if (h.code === "KeyI") {
            h.preventDefault(), d(Math.max(0, Math.min(i, y - 1e3)));
            return;
          }
          if (h.code === "KeyO") {
            h.preventDefault(), f(Math.min(m, Math.max(i, c + 1e3)));
            return;
          }
          if (h.code === "KeyS") {
            if (h.ctrlKey || h.metaKey) {
              h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-save-now"));
              return;
            } else if (!h.altKey) {
              h.preventDefault(), $ == null || $();
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
            w();
            return;
          }
          if (h.key === "Home") {
            h.preventDefault(), a(c);
            return;
          }
          if (h.key === "End") {
            h.preventDefault(), a(y);
            return;
          }
          if (h.code === "ArrowLeft" || h.code === "ArrowRight") {
            h.preventDefault();
            const j = h.code === "ArrowLeft";
            let N;
            if (h.ctrlKey || h.metaKey)
              N = 33;
            else if (h.shiftKey)
              N = 5e3;
            else {
              const b = Math.max(1, x);
              N = Math.max(33, Math.round(1e3 / b));
            }
            a((b) => {
              const C = j ? b - N : b + N;
              return Math.max(0, Math.min(m, C));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const j = n.findIndex((N) => N.id === e);
            if (j === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const N = (j + 1) % n.length;
              l(n[N].id), o(1);
            } else {
              const N = (j - 1 + n.length) % n.length;
              l(n[N].id), o(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", g, { capture: !0 }), () => window.removeEventListener("keydown", g, { capture: !0 });
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
    y,
    f,
    m,
    x,
    w,
    E,
    $,
    v
  ]);
}
const Bd = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = Td(n, e), l = Td(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, Tl = (e, t = null, n = "LOCAL") => {
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
    const c = o.substring(0, 8), d = pc(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const i = r.replace(" ", "T"), a = new Date(i).getTime();
  return isNaN(a) ? Date.now() : a;
};
function Ix() {
  var ss, Un;
  const e = u.useMemo(() => ug() || {}, []), [t, n] = u.useState(() => {
    var O, oe;
    return (O = e.timeRange) != null && O.startEpochMs && ((oe = e.timeRange) != null && oe.endEpochMs) ? e.timeRange : Bd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, i] = u.useState(e.keystrokeMode || "BURN_IN"), [a, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    sg().catch((O) => console.warn("[Studio] DST init error:", O));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Tl(t.start), [t.start, t.startEpochMs]), y = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - y, [d, y]), m = u.useMemo(() => t.durationMs + 2 * y, [t.durationMs, y]), [x, w] = u.useState(e.selectedStationIds || []), [E, $] = u.useState(e.activeStationId || null), [v, g] = u.useState(null), [h, k] = u.useState(null), [M, j] = u.useState([]), [N, b] = u.useState(!1), [C, I] = u.useState(null), [_, K] = u.useState(() => {
    var O;
    return e.compositionScope || (((O = e.selectedStationIds) == null ? void 0 : O.length) > 1 ? "inter-station" : "intra-station");
  }), [A, z] = u.useState(() => {
    try {
      const O = localStorage.getItem("itb_composition_layout");
      if (O) return O;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), G = u.useCallback((O) => {
    z((oe) => {
      const ne = typeof O == "function" ? O(oe) : O;
      try {
        localStorage.setItem("itb_composition_layout", ne);
      } catch {
      }
      return ne;
    });
  }, []), [B, W] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [S, U] = u.useState(() => !!e.isPipSwapped), [F, ee] = u.useState(() => e.audioRoutingPlan || null), [R, Z] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [Q, q] = u.useState(!1), [Y, re] = u.useState(null), [te, de] = u.useState(() => e.canvasLayoutTimeline || null), [be, ve] = u.useState(0), ie = u.useCallback((O) => {
    de((oe) => {
      const ne = [...(oe == null ? void 0 : oe.keyframes) || []], ze = ne.findIndex((ft) => Math.abs(ft.timestampEpochMs - O) < 300);
      if (ze >= 0)
        return ve(ze), oe;
      const Fe = ne[be] || ne[0], Le = (Fe == null ? void 0 : Fe.layout) || Y || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Ge = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(O),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Le))
      }, De = [...ne, Ge].sort((ft, Et) => ft.timestampEpochMs - Et.timestampEpochMs), lt = De.findIndex((ft) => ft.timestampEpochMs === Math.round(O));
      return ve(lt >= 0 ? lt : 0), {
        ...oe || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: De
      };
    });
  }, [be, Y]), ke = u.useCallback((O) => {
    de((oe) => {
      if (!(oe != null && oe.keyframes) || oe.keyframes.length <= 1) return oe;
      const ne = oe.keyframes.filter((ze, Fe) => Fe !== O);
      return ve((ze) => Math.max(0, ze - 1)), { ...oe, keyframes: ne };
    });
  }, []), _e = u.useCallback((O, oe) => {
    de((ne) => {
      if (!(ne != null && ne.keyframes) || ne.keyframes.length === 0) return ne;
      const ze = Math.round(oe), Fe = typeof O == "number" && ne.keyframes[O] ? O : ne.keyframes.findIndex((De) => De.id === O);
      if (Fe === -1) return ne;
      const Le = [...ne.keyframes];
      Le[Fe] = {
        ...Le[Fe],
        timestampEpochMs: ze
      }, Le.sort((De, lt) => De.timestampEpochMs - lt.timestampEpochMs);
      const Ge = Le.findIndex((De) => De.timestampEpochMs === ze);
      return Ge >= 0 && ve(Ge), {
        ...ne,
        keyframes: Le
      };
    });
  }, []), [D, X] = u.useState({}), me = u.useCallback((O) => {
    X((oe) => ({
      ...oe,
      [O]: !(oe[O] ?? !0)
    }));
  }, []), we = u.useCallback((O) => {
    w((oe) => oe.filter((ne) => ne !== O)), E === O && $(null), v === O && g(null), de((oe) => {
      if (!oe || !oe.keyframes) return oe;
      const ne = oe.keyframes.map((ze) => {
        var Fe;
        return {
          ...ze,
          layout: {
            ...ze.layout,
            placements: (((Fe = ze.layout) == null ? void 0 : Fe.placements) || []).filter((Le) => Le.stationId !== O)
          }
        };
      });
      return { ...oe, keyframes: ne };
    });
  }, [E, v]), Xe = u.useCallback((O, oe) => {
    O.preventDefault(), O.stopPropagation();
    const ne = 195, ze = 110, Fe = Math.min(O.clientX, window.innerWidth - ne - 10), Le = Math.min(O.clientY, window.innerHeight - ze - 10);
    I({ x: Fe, y: Le, station: oe });
  }, []), Ne = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(m, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(m, e.inPointMs)) : y, [e.inEpochMs, e.inPointMs, f, m, y]), le = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(Ne + 1e3, Math.min(m, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(Ne + 1e3, Math.min(m, e.outPointMs)) : y + t.durationMs, [e.outEpochMs, e.outPointMs, f, m, y, t.durationMs, Ne]), Ie = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(m, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(m, e.playheadMs)) : Ne, [e.playheadEpochMs, e.playheadMs, f, m, Ne]), [ce, Be] = u.useState(Ne), [Me, Ye] = u.useState(le), { allStations: je, recordingSegments: ut, isLoadingStations: Ue, movieBoundaries: xt } = Cx(
    f,
    m,
    t,
    r,
    E
  ), yt = u.useMemo(() => je.find((O) => O.id === E) || null, [je, E]), Pe = u.useMemo(() => !x || x.length === 0 ? [] : je.filter((O) => x.includes(O.id)), [je, x]), dt = u.useMemo(() => je.find((O) => O.id === v) || null, [je, v]), Qt = !!(v && dt), ns = u.useRef("grid"), Bn = u.useRef(null), {
    playheadMs: bt,
    setPlayheadMs: _t,
    isPlaying: Ut,
    setIsPlaying: ge,
    playbackSpeed: Nt,
    setPlaybackSpeed: Qe,
    isLooping: gt,
    setIsLooping: fn,
    togglePlaySmart: pn
  } = Sx({
    timelineBaseEpochMs: f,
    inPointMs: ce,
    outPointMs: Me,
    globalGaps: M,
    activeStation: yt,
    spotlightStation: dt,
    recordingSegments: ut,
    initialPlayheadMs: Ie,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !E
  }), {
    zoomLevel: en,
    setZoomLevel: wn,
    viewportStartMs: Ee,
    setViewportStartMs: Se,
    resetZoom: We,
    fitRange: ht,
    jumpViewportTo: kt
  } = Mx({
    containerRef: Bn,
    totalTimelineDurationMs: m,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [V, ue] = u.useState(!1), [ae, Ae] = u.useState(!1), [Ke, He] = u.useState(!1), [Je, Ve] = u.useState(!1), [ot, Mt] = u.useState(
    !!(e.isWorkspaceActive && ((ss = e.selectedStationIds) == null ? void 0 : ss.length) > 0)
  ), [Kt, Jt] = u.useState([]);
  u.useEffect(() => {
    const O = Qt && dt || yt, oe = (O == null ? void 0 : O.hostname) || (O == null ? void 0 : O.displayName) || (O == null ? void 0 : O.id), ne = (o || "NONE").toUpperCase().replace("-", "_");
    if (!oe || !f || !(ne !== "NONE" && ne !== "OFF" || a)) {
      Jt([]);
      return;
    }
    const Fe = Math.max(0, f - 5e3), Le = f + m + 5e3, Ge = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(oe)}&startEpoch=${Fe}&endEpoch=${Le}`, { signal: Ge.signal }).then((De) => De.ok ? De.json() : []).then((De) => Jt(Array.isArray(De) ? De : [])).catch((De) => {
      De.name !== "AbortError" && Jt([]);
    }), () => Ge.abort();
  }, [yt, dt, Qt, f, m, o, a]), u.useEffect(() => {
    Ue || (je.length === 0 ? ((x.length > 0 || E || ot) && (w([]), $(null), g(null), Mt(!1)), Ve(!0), b(!0)) : (b(!1), w((O) => {
      const oe = O.filter((ne) => je.some((ze) => ze.id === ne));
      return oe.length !== O.length ? (oe.length === 0 && (Mt(!1), Ve(!0)), oe) : O;
    })));
  }, [Ue, je]);
  const An = u.useCallback((O) => {
    if (O === null) {
      ge(!1), Qe(1), $(null);
      return;
    }
    O !== E && Qe(1), $(O);
  }, [E, ge, Qe]), Gt = u.useCallback((O, oe = null) => {
    O !== E && Qe(1), ns.current = x.length <= 1 || E ? "spotlight" : "grid", $(O), g(O), k(oe || null);
  }, [E, x.length, Qe]), Rt = u.useCallback(() => {
    g(null), k(null), ns.current === "grid" && $(null);
  }, []), Ft = u.useMemo(() => {
    if (F != null && F.segments && F.segments.length > 0)
      return F;
    const O = x[0] || E || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + m,
          sourceStationId: O
        }
      ]
    };
  }, [F, x, E, f, m]), jn = u.useCallback((O) => {
    ee((oe) => {
      const ne = oe || Ft, ze = [...ne.segments || []], Fe = ze.findIndex((Lt) => {
        const Yt = Lt.startEpochMs ?? Lt.StartEpochMs ?? 0, $n = Lt.endEpochMs ?? Lt.EndEpochMs ?? 0;
        return O > Yt + 500 && O < $n - 500;
      });
      if (Fe === -1) return oe;
      const Le = ze[Fe], Ge = Le.startEpochMs ?? Le.StartEpochMs ?? 0, De = Le.endEpochMs ?? Le.EndEpochMs ?? 0, lt = Le.sourceStationId ?? Le.SourceStationId ?? x[0], ft = { startEpochMs: Ge, endEpochMs: O, sourceStationId: lt }, Et = { startEpochMs: O, endEpochMs: De, sourceStationId: lt };
      return ze.splice(Fe, 1, ft, Et), { ...ne, segments: ze };
    });
  }, [Ft, x]), Mr = u.useCallback((O, oe) => {
    ee((ne) => {
      const ze = ne || Ft, Fe = (ze.segments || []).map((Le) => {
        const Ge = Le.startEpochMs ?? Le.StartEpochMs ?? 0, De = Le.endEpochMs ?? Le.EndEpochMs ?? 0;
        return O >= Ge && O <= De ? { ...Le, sourceStationId: oe } : Le;
      });
      return { ...ze, segments: Fe };
    }), Z(!1);
  }, [Ft]), Tr = u.useCallback((O, oe) => {
    ee((ne) => {
      const ze = ne || Ft, Fe = (ze.segments || []).map((Le) => {
        const Ge = Le.startEpochMs ?? Le.StartEpochMs ?? 0, De = Le.endEpochMs ?? Le.EndEpochMs ?? 0;
        return O >= Ge && O <= De ? { ...Le, gain: oe } : Le;
      });
      return { ...ze, segments: Fe };
    });
  }, [Ft]), ir = u.useCallback(() => {
    Z((O) => !O);
  }, []), [Ce, Te] = u.useState({}), an = u.useCallback((O) => {
    if (!O) return null;
    if (Ce[O]) return Ce[O];
    const oe = je.find((ne) => ne.id === O);
    return oe != null && oe.directorPlan ? oe.directorPlan : {
      stationId: O,
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + m,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [Ce, je, f, m]), gl = u.useCallback((O, oe) => {
    O && Te((ne) => {
      const ze = ne[O] || an(O), Fe = [...ze.segments || []], Le = Fe.findIndex(($n) => {
        const Rs = $n.startEpochMs ?? $n.StartEpochMs ?? 0, Ot = $n.endEpochMs ?? $n.EndEpochMs ?? 0;
        return oe > Rs + 500 && oe < Ot - 500;
      });
      if (Le === -1) return ne;
      const Ge = Fe[Le], De = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, lt = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0, ft = Ge.targetDisplayId ?? Ge.TargetDisplayId ?? "mon-0", Et = !!(Ge.isManualOverride ?? Ge.IsManualOverride), Lt = { ...Ge, startEpochMs: De, endEpochMs: oe, targetDisplayId: ft, isManualOverride: Et }, Yt = { ...Ge, startEpochMs: oe, endEpochMs: lt, targetDisplayId: ft, isManualOverride: Et };
      return Fe.splice(Le, 1, Lt, Yt), { ...ne, [O]: { ...ze, segments: Fe } };
    });
  }, [an]), Ir = u.useCallback((O, oe, ne) => {
    O && Te((ze) => {
      const Fe = ze[O] || an(O), Le = [...Fe.segments || []];
      let Ge = Le.findIndex((lt) => {
        const ft = lt.startEpochMs ?? lt.StartEpochMs ?? 0, Et = lt.endEpochMs ?? lt.EndEpochMs ?? 0;
        return oe > ft && oe < Et;
      });
      if (Ge === -1 && (Ge = Le.findIndex((lt) => {
        const ft = lt.startEpochMs ?? lt.StartEpochMs ?? 0, Et = lt.endEpochMs ?? lt.EndEpochMs ?? 0;
        return oe >= ft && oe <= Et;
      })), Ge === -1) return ze;
      const De = Le[Ge];
      return Le[Ge] = { ...De, targetDisplayId: ne, isManualOverride: !0 }, { ...ze, [O]: { ...Fe, segments: Le } };
    });
  }, [an]), xl = u.useCallback((O, oe) => {
    if (!O) return;
    const ne = je.find((Fe) => Fe.id === O), ze = ne == null ? void 0 : ne.directorPlan;
    Te((Fe) => {
      var Rs;
      const Le = Fe[O] || an(O), Ge = [...Le.segments || []];
      let De = Ge.findIndex((Ot) => {
        const Ls = Ot.startEpochMs ?? Ot.StartEpochMs ?? 0, ar = Ot.endEpochMs ?? Ot.EndEpochMs ?? 0;
        return oe > Ls && oe < ar;
      });
      if (De === -1 && (De = Ge.findIndex((Ot) => {
        const Ls = Ot.startEpochMs ?? Ot.StartEpochMs ?? 0, ar = Ot.endEpochMs ?? Ot.EndEpochMs ?? 0;
        return oe >= Ls && oe <= ar;
      })), De === -1) return Fe;
      const lt = Ge[De], ft = lt.startEpochMs ?? lt.StartEpochMs ?? 0, Et = lt.endEpochMs ?? lt.EndEpochMs ?? 0, Lt = (ft + Et) / 2, Yt = (Rs = ze == null ? void 0 : ze.segments) == null ? void 0 : Rs.find((Ot) => {
        const Ls = Ot.startEpochMs ?? Ot.StartEpochMs ?? 0, ar = Ot.endEpochMs ?? Ot.EndEpochMs ?? 0;
        return Lt >= Ls && Lt <= ar;
      }), $n = Yt ? Yt.targetDisplayId ?? Yt.TargetDisplayId ?? "mon-0" : "mon-0";
      return Ge[De] = { ...lt, targetDisplayId: $n, isManualOverride: !1 }, { ...Fe, [O]: { ...Le, segments: Ge } };
    });
  }, [je, an]), Ar = u.useMemo(() => Pe.map((O) => ({
    ...O,
    directorPlan: Ce[O.id] || O.directorPlan || an(O.id)
  })), [Pe, Ce, an]), tn = u.useMemo(() => yt ? {
    ...yt,
    directorPlan: Ce[yt.id] || yt.directorPlan || an(yt.id)
  } : null, [yt, Ce, an]), jt = u.useMemo(() => dt ? {
    ...dt,
    directorPlan: Ce[dt.id] || dt.directorPlan || an(dt.id)
  } : null, [dt, Ce, an]);
  Tx({
    activeStationId: E,
    spotlightStationId: v,
    timelineStations: Ar,
    selectedStationIdsCount: x.length,
    onSelectActiveStation: An,
    setPlaybackSpeed: Qe,
    playheadMs: bt,
    setPlayheadMs: _t,
    inPointMs: ce,
    setInPointMs: Be,
    outPointMs: Me,
    setOutPointMs: Ye,
    totalTimelineDurationMs: m,
    zoomLevel: en,
    togglePlaySmart: pn,
    onToggleHelpModal: () => He((O) => !O),
    onSplitDirectorAtPlayhead: () => {
      var oe, ne, ze;
      const O = E || (x.length === 1 ? x[0] : null);
      if (O) {
        const Fe = je.find((Ge) => Ge.id === O);
        (((oe = Fe == null ? void 0 : Fe.displays) == null ? void 0 : oe.length) > 1 || ((ze = (ne = Fe == null ? void 0 : Fe.topology) == null ? void 0 : ne.displays) == null ? void 0 : ze.length) > 1) && gl(O, f + bt);
      }
    },
    isModalActive: V || ae || Ke
  }), u.useEffect(() => {
    const O = f + ce, oe = f + Me, ne = f + bt;
    op({
      timeRange: t,
      timeMode: r,
      inPointMs: ce,
      outPointMs: Me,
      playheadMs: Math.round(bt),
      inEpochMs: O,
      outEpochMs: oe,
      playheadEpochMs: ne,
      selectedStationIds: x,
      activeStationId: E,
      zoomLevel: en,
      viewportStartMs: Ee,
      isWorkspaceActive: ot,
      isLooping: gt,
      playbackSpeed: Nt,
      keystrokeMode: o,
      showRulerKeystrokes: a,
      compositionScope: _,
      compositionLayout: A,
      isAutoDirectorEnabled: B,
      isPipSwapped: S,
      audioRoutingPlan: Ft,
      isAutoFollowAudio: R,
      canvasLayoutTimeline: te
    });
  }, [
    t,
    r,
    ce,
    Me,
    bt,
    x,
    E,
    en,
    Ee,
    ot,
    gt,
    Nt,
    f,
    o,
    a,
    _,
    A,
    B,
    S,
    Ft,
    R,
    te
  ]);
  const cn = u.useCallback((O) => {
    var ft, Et;
    const oe = Tl(O.startTime), ne = Tl(O.endTime), ze = Math.max(0, ne - oe) || 144e5, Fe = {
      start: O.startTime,
      end: O.endTime,
      durationMs: ze,
      startEpochMs: oe,
      endEpochMs: ne
    }, Le = Math.max(6e4, Math.round(ze * 0.05)), Ge = oe - Le, De = ze + 2 * Le;
    if (n(Fe), O.inEpochMs && O.outEpochMs) {
      const Lt = Math.max(0, Math.min(De, O.inEpochMs - Ge)), Yt = Math.max(Lt + 1e3, Math.min(De, O.outEpochMs - Ge)), $n = O.playheadEpochMs ? Math.max(0, Math.min(De, O.playheadEpochMs - Ge)) : Lt;
      Be(Lt), Ye(Yt), _t($n);
    } else {
      const Lt = typeof O.inPointMs == "number" ? O.inPointMs : Le, Yt = typeof O.outPointMs == "number" ? O.outPointMs : Le + ze, $n = typeof O.playheadMs == "number" ? O.playheadMs : Lt;
      Be(Math.max(0, Math.min(De, Lt))), Ye(Math.max(0, Math.min(De, Yt))), _t(Math.max(0, Math.min(De, $n)));
    }
    const lt = ((ft = O.selectedStationIds) == null ? void 0 : ft.length) > 0 ? O.selectedStationIds : ((Et = O.cutStationIds) == null ? void 0 : Et.length) > 0 ? O.cutStationIds : O.stationIds;
    if ((lt == null ? void 0 : lt.length) > 0) {
      w(lt);
      const Lt = O.spotlightStationId || O.SpotlightStationId || null, Yt = O.activeStationId || O.ActiveStationId || null;
      Lt && lt.includes(Lt) ? ($(Lt), g(Lt)) : Yt && lt.includes(Yt) ? ($(Yt), g(null)) : ($(null), g(null));
    }
    O.keystrokeMode && i(O.keystrokeMode), Mt(!0), Ve(!1);
  }, []), un = u.useCallback((O) => {
    const oe = O.startEpochMs || Tl(O.start, null, r), ne = O.endEpochMs || Tl(O.end, null, r), ze = Math.max(0, ne - oe) || 144e5, Fe = Math.max(6e4, Math.round(ze * 0.05)), Le = oe - Fe, Ge = ze + 2 * Fe;
    n({
      ...O,
      startEpochMs: oe,
      endEpochMs: ne,
      durationMs: ze
    }), b(!1), Be(Fe), Ye(Fe + ze), _t(Fe), de((De) => {
      if (!(De != null && De.keyframes) || De.keyframes.length === 0) return De;
      const lt = De.keyframes.map((ft, Et) => Et === 0 ? { ...ft, timestampEpochMs: Le } : ft).filter((ft) => ft.timestampEpochMs >= Le && ft.timestampEpochMs <= Le + Ge);
      return { ...De, keyframes: lt };
    }), ee((De) => {
      if (!(De != null && De.segments) || De.segments.length === 0) return De;
      if (!De.segments.some((ft) => {
        const Et = ft.startEpochMs ?? ft.StartEpochMs ?? 0;
        return (ft.endEpochMs ?? ft.EndEpochMs ?? 0) > Le && Et < Le + Ge;
      })) {
        const ft = x[0] || E || "station-0";
        return {
          segments: [
            {
              startEpochMs: Le,
              endEpochMs: Le + Ge,
              sourceStationId: ft
            }
          ]
        };
      }
      return De;
    }), Te({});
  }, [r, x, E]), nn = u.useCallback(() => {
    if (Pe.map((oe) => oe.id).length === 0) return alert("No active stations selected in timeline.");
    q(!0);
  }, [Pe]), po = u.useCallback(async (O, oe) => {
    var Ge, De, lt, ft;
    const ne = Pe.map((Et) => Et.id);
    if (ne.length === 0) return;
    let ze = O === "None" ? "None" : "BurnIn";
    const Fe = oe || "NATIVE", Le = ((Ge = tn == null ? void 0 : tn.displays) == null ? void 0 : Ge.length) > 1 || ((lt = (De = tn == null ? void 0 : tn.topology) == null ? void 0 : De.displays) == null ? void 0 : lt.length) > 1 ? ((ft = tn == null ? void 0 : tn.directorPlan) == null ? void 0 : ft.segments) || [] : [];
    try {
      const Et = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: ne,
          inEpochMs: f + ce,
          outEpochMs: f + Me,
          keystrokeMode: ze,
          resolution: Fe,
          videoQuality: Fe,
          compositionScope: _,
          layoutMode: "canvas",
          canvasLayout: Y,
          canvasLayoutTimeline: te,
          isPipSwapped: S,
          isAutoDirectorEnabled: B,
          directorSegments: Le,
          audioRoutingSegments: Ft.segments || []
        })
      });
      if (!Et.ok) throw new Error(`HTTP ${Et.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (Et) {
      console.error("[Studio] Export failed:", Et), alert("Failed to launch background master MP4 export job.");
    }
  }, [Pe, f, ce, Me, _, Y, te, S, B, tn, Ft]), Zt = u.useCallback(() => {
    dg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const O = Bd(), oe = Math.max(6e4, Math.round(O.durationMs * 0.05));
    n(O), Be(oe), Ye(oe + O.durationMs), _t(oe), w([]), $(null), g(null), ge(!1), Qe(1), i("BURN_IN"), We(), Mt(!1), Ve(!0);
  }, [We, ge, Qe, _t]), rn = !ot || x.length === 0, he = f + bt;
  return u.useEffect(() => {
    const O = te == null ? void 0 : te.keyframes;
    if (!O || O.length === 0) return;
    let oe = 0;
    for (let ne = 0; ne < O.length && O[ne].timestampEpochMs <= he + 50; ne++)
      oe = ne;
    oe !== be && ve(oe);
  }, [he, te == null ? void 0 : te.keyframes, be]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        ig,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: E,
          hideBackToGrid: Pe.length <= 1,
          onResetActiveStation: () => An(null),
          onOpenRangeModal: () => ue(!0),
          onOpenBookmarksModal: () => Ae(!0),
          onOpenHelpModal: () => He(!0),
          onToggleDrawer: () => Ve(!Je),
          isInitialSetup: rn,
          selectedCount: x.length,
          totalCount: je.length,
          onResetStudio: Zt
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
              onClick: () => ue(!0),
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
              onClick: () => b(!1),
              title: "Dismiss Alert",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "studio-lower-body", children: [
        !rn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              bg,
              {
                activeStation: tn,
                timelineStations: Ar,
                allStations: je,
                onSelectActiveStation: An,
                onOpenSpotlight: Gt,
                onStationContextMenu: Xe,
                onDeselectStation: we,
                stationAutoDirectorMap: D,
                onToggleStationAutoDirector: me,
                onOpenDrawer: () => Ve(!0),
                baseEpochMs: f,
                playheadMs: bt,
                playheadEpochMs: he,
                timeMode: r,
                isPlaying: Qt ? !1 : Ut,
                setIsPlaying: ge,
                totalDurationMs: m,
                inPointMs: ce,
                outPointMs: Me,
                setPlayheadMs: _t,
                globalGaps: M,
                recordingSegments: ut,
                playbackSpeed: Nt,
                onChangePlaybackSpeed: Qe,
                keystrokeMode: o,
                keystrokes: Kt,
                directorPlan: tn == null ? void 0 : tn.directorPlan,
                onOverrideDisplay: Ir,
                onResetOverride: xl,
                compositionScope: _,
                onChangeCompositionScope: K,
                compositionLayout: A,
                onChangeCompositionLayout: G,
                isAutoDirectorEnabled: B,
                onToggleAutoDirector: () => W((O) => !O),
                isPipSwapped: S,
                onTogglePipSwap: () => U((O) => !O),
                onUpdateCanvasLayout: re,
                canvasLayoutTimeline: te,
                onUpdateCanvasLayoutTimeline: de,
                activeKfIndex: be,
                setActiveKfIndex: ve,
                isModalOpen: Q || V || ae || Qt || Ke
              }
            ),
            /* @__PURE__ */ s.jsx(
              ap,
              {
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: m,
                playheadMs: bt,
                setPlayheadMs: _t,
                inPointMs: ce,
                setInPointMs: Be,
                outPointMs: Me,
                setOutPointMs: Ye,
                activeStationId: E,
                isPlaying: Ut,
                setIsPlaying: pn,
                isLooping: gt,
                setIsLooping: fn,
                playbackSpeed: Nt,
                onChangeSpeed: Qe,
                onSetInPoint: () => Be(Math.max(0, Math.min(bt, Me - 1e3))),
                onSetOutPoint: () => Ye(Math.min(m, Math.max(bt, ce + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: Bn, children: /* @__PURE__ */ s.jsx(
            hp,
            {
              stations: Ar,
              activeStationId: E,
              onSelectActiveStation: (O) => An(x.length <= 1 ? O : O === E ? null : O),
              onStationContextMenu: Xe,
              onDeselectStation: we,
              stationAutoDirectorMap: D,
              onToggleStationAutoDirector: me,
              baseEpochMs: f,
              timeMode: r,
              totalDurationMs: m,
              zoomLevel: en,
              onZoomChange: wn,
              onZoomReset: We,
              onFitRange: ht,
              onJumpViewportTo: kt,
              playheadMs: bt,
              setPlayheadMs: _t,
              inPointMs: ce,
              setInPointMs: Be,
              outPointMs: Me,
              setOutPointMs: Ye,
              viewportStartMs: Ee,
              onViewportStartChange: Se,
              onExport: nn,
              recordingSegments: ut,
              movieBoundaries: xt,
              onEstimateLoaded: (O) => (O == null ? void 0 : O.removedGlobalGaps) && j(O.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: i,
              keystrokes: Kt,
              showKeystrokes: a,
              showRulerKeystrokes: a,
              onToggleRulerKeystrokes: () => c((O) => !O),
              onSplitDirectorSegment: gl,
              onChangeDirectorSegmentDisplay: Ir,
              onResetDirectorSegmentToAuto: xl,
              audioRoutingPlan: Ft,
              onSplitAudioSegment: jn,
              onChangeAudioSegmentStation: Mr,
              onChangeAudioSegmentGain: Tr,
              onFollowVisualFeed: ir,
              isAutoFollowAudio: R,
              canvasLayoutTimeline: te,
              activeKfIndex: be,
              onSelectKeyframe: (O, oe) => {
                ve(O), _t(Math.max(0, oe - f));
              },
              onAddKeyframeAtEpoch: ie,
              onDeleteKeyframe: ke,
              onUpdateKeyframeEpoch: _e
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          ux,
          {
            isOpen: Je || rn,
            onToggle: () => Ve(!Je),
            onClose: () => Ve(!1),
            allStations: je,
            selectedStationIds: x,
            onToggleStation: (O) => w((oe) => oe.includes(O) ? oe.filter((ne) => ne !== O) : [...oe, O]),
            onUpdateSelections: w,
            isInitialSetup: rn,
            isLoadingStations: Ue,
            recordingSegments: ut,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              x.length > 0 && ($(null), g(null), Mt(!0), Ve(!1));
            },
            onOpenRangeModal: () => ue(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      fx,
      {
        isOpen: V,
        onClose: () => ue(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: cn,
        onApplyRange: un
      }
    ),
    /* @__PURE__ */ s.jsx(
      mx,
      {
        isOpen: ae,
        onClose: () => Ae(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: bt,
          inPointMs: ce,
          outPointMs: Me,
          selectedStationIds: x,
          selectedStationNames: je.filter((O) => x.includes(O.id)).map((O) => O.displayName || O.hostname || O.id),
          allStationIds: je.map((O) => O.id),
          activeStationId: E,
          activeStationName: (yt == null ? void 0 : yt.displayName) || (yt == null ? void 0 : yt.hostname) || null,
          spotlightStationId: v,
          keystrokeMode: o
        },
        onLoadBookmark: cn
      }
    ),
    /* @__PURE__ */ s.jsx(
      mp,
      {
        isOpen: Ke,
        onClose: () => He(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      wx,
      {
        isOpen: Qt,
        station: jt,
        initialDisplayId: h,
        allStations: Ar,
        onSelectStation: (O) => {
          O !== v && Qe(1), $(O), g(O);
        },
        onClose: Rt,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: m,
        zoomLevel: en,
        onZoomChange: wn,
        onZoomReset: We,
        onFitRange: ht,
        onJumpViewportTo: kt,
        viewportStartMs: Ee,
        onViewportStartChange: Se,
        playheadMs: bt,
        setPlayheadMs: _t,
        playheadEpochMs: he,
        inPointMs: ce,
        setInPointMs: Be,
        outPointMs: Me,
        setOutPointMs: Ye,
        recordingSegments: ut,
        globalGaps: M,
        isPlaying: Ut,
        setIsPlaying: ge,
        isLooping: gt,
        setIsLooping: fn,
        playbackSpeed: Nt,
        setPlaybackSpeed: Qe,
        onExport: nn,
        keystrokeMode: o,
        onChangeKeystrokeMode: i,
        keystrokes: Kt,
        showRulerKeystrokes: a,
        onToggleRulerKeystrokes: () => c((O) => !O),
        directorPlan: jt == null ? void 0 : jt.directorPlan,
        onOverrideDisplay: Ir,
        onSplitDirectorSegment: gl,
        onChangeDirectorSegmentDisplay: Ir,
        onResetDirectorSegmentToAuto: xl
      }
    ),
    /* @__PURE__ */ s.jsx(
      jx,
      {
        menu: C,
        onClose: () => I(null),
        onDeselect: we,
        onFocusSolo: An
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ex,
      {
        isOpen: Q,
        onClose: () => q(!1),
        onConfirm: po,
        compositionSummary: {
          scope: _,
          layout: (Y == null ? void 0 : Y.preset) || A,
          isPipSwapped: S,
          isAutoDirectorEnabled: B,
          stationsCount: Pe.length,
          audioSegmentsCount: ((Un = Ft == null ? void 0 : Ft.segments) == null ? void 0 : Un.length) || 1,
          resolution: (te == null ? void 0 : te.resolution) || "NATIVE",
          canvasWidth: (Y == null ? void 0 : Y.width) || 1920,
          canvasHeight: (Y == null ? void 0 : Y.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(gp, {})
  ] });
}
const Ud = "itb-extractor-advanced-theme", Wd = "itb-global-export-job-monitor-root";
function xp() {
  if (!(typeof document > "u") && !document.getElementById(Ud)) {
    const e = document.createElement("link");
    e.id = Ud, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
xp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Wd);
  if (!t) {
    t = document.createElement("div"), t.id = Wd, document.body.appendChild(t);
    try {
      Qo.createRoot(t).render(ao.createElement(gp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Ax(e, t = {}) {
  xp();
  const n = Qo.createRoot(e);
  return n.render(ao.createElement(Ix, t)), () => {
    n.unmount();
  };
}
export {
  gp as ExportJobMonitor,
  Ix as ExtractorAdvancedStudio,
  Ix as default,
  Ax as mount
};
