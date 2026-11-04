function Pp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Qd = { exports: {} }, mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uo = Symbol.for("react.element"), _p = Symbol.for("react.portal"), Fp = Symbol.for("react.fragment"), Bp = Symbol.for("react.strict_mode"), Wp = Symbol.for("react.profiler"), Up = Symbol.for("react.provider"), zp = Symbol.for("react.context"), Hp = Symbol.for("react.forward_ref"), Vp = Symbol.for("react.suspense"), Kp = Symbol.for("react.memo"), Yp = Symbol.for("react.lazy"), Su = Symbol.iterator;
function Gp(e) {
  return e === null || typeof e != "object" ? null : (e = Su && e[Su] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Jd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Zd = Object.assign, qd = {};
function xl(e, t, n) {
  this.props = e, this.context = t, this.refs = qd, this.updater = n || Jd;
}
xl.prototype.isReactComponent = {};
xl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function eh() {
}
eh.prototype = xl.prototype;
function Cc(e, t, n) {
  this.props = e, this.context = t, this.refs = qd, this.updater = n || Jd;
}
var Ec = Cc.prototype = new eh();
Ec.constructor = Cc;
Zd(Ec, xl.prototype);
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
var An = { current: null }, Bo = { transition: null }, Zp = { ReactCurrentDispatcher: An, ReactCurrentBatchConfig: Bo, ReactCurrentOwner: Sc };
function rh() {
  throw Error("act(...) is not supported in production builds of React.");
}
mt.Children = { map: No, forEach: function(e, t, n) {
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
mt.Component = xl;
mt.Fragment = Fp;
mt.Profiler = Wp;
mt.PureComponent = Cc;
mt.StrictMode = Bp;
mt.Suspense = Vp;
mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zp;
mt.act = rh;
mt.cloneElement = function(e, t, n) {
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
mt.createContext = function(e) {
  return e = { $$typeof: zp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Up, _context: e }, e.Consumer = e;
};
mt.createElement = sh;
mt.createFactory = function(e) {
  var t = sh.bind(null, e);
  return t.type = e, t;
};
mt.createRef = function() {
  return { current: null };
};
mt.forwardRef = function(e) {
  return { $$typeof: Hp, render: e };
};
mt.isValidElement = bc;
mt.lazy = function(e) {
  return { $$typeof: Yp, _payload: { _status: -1, _result: e }, _init: Jp };
};
mt.memo = function(e, t) {
  return { $$typeof: Kp, type: e, compare: t === void 0 ? null : t };
};
mt.startTransition = function(e) {
  var t = Bo.transition;
  Bo.transition = {};
  try {
    e();
  } finally {
    Bo.transition = t;
  }
};
mt.unstable_act = rh;
mt.useCallback = function(e, t) {
  return An.current.useCallback(e, t);
};
mt.useContext = function(e) {
  return An.current.useContext(e);
};
mt.useDebugValue = function() {
};
mt.useDeferredValue = function(e) {
  return An.current.useDeferredValue(e);
};
mt.useEffect = function(e, t) {
  return An.current.useEffect(e, t);
};
mt.useId = function() {
  return An.current.useId();
};
mt.useImperativeHandle = function(e, t, n) {
  return An.current.useImperativeHandle(e, t, n);
};
mt.useInsertionEffect = function(e, t) {
  return An.current.useInsertionEffect(e, t);
};
mt.useLayoutEffect = function(e, t) {
  return An.current.useLayoutEffect(e, t);
};
mt.useMemo = function(e, t) {
  return An.current.useMemo(e, t);
};
mt.useReducer = function(e, t, n) {
  return An.current.useReducer(e, t, n);
};
mt.useRef = function(e) {
  return An.current.useRef(e);
};
mt.useState = function(e) {
  return An.current.useState(e);
};
mt.useSyncExternalStore = function(e, t, n) {
  return An.current.useSyncExternalStore(e, t, n);
};
mt.useTransition = function() {
  return An.current.useTransition();
};
mt.version = "18.3.1";
Qd.exports = mt;
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
  function t(T, A) {
    var D = T.length;
    T.push(A);
    e: for (; 0 < D; ) {
      var H = D - 1 >>> 1, _ = T[H];
      if (0 < l(_, A)) T[H] = A, T[D] = _, D = H;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var A = T[0], D = T.pop();
    if (D !== A) {
      T[0] = D;
      e: for (var H = 0, _ = T.length, ce = _ >>> 1; H < ce; ) {
        var ee = 2 * (H + 1) - 1, ie = T[ee], ae = ee + 1, Be = T[ae];
        if (0 > l(ie, D)) ae < _ && 0 > l(Be, ie) ? (T[H] = Be, T[ae] = D, H = ae) : (T[H] = ie, T[ee] = D, H = ee);
        else if (ae < _ && 0 > l(Be, D)) T[H] = Be, T[ae] = D, H = ae;
        else break e;
      }
    }
    return A;
  }
  function l(T, A) {
    var D = T.sortIndex - A.sortIndex;
    return D !== 0 ? D : T.id - A.id;
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
  var c = [], d = [], N = 1, m = null, g = 3, k = !1, E = !1, b = !1, P = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(T) {
    for (var A = n(d); A !== null; ) {
      if (A.callback === null) r(d);
      else if (A.startTime <= T) r(d), A.sortIndex = A.expirationTime, t(c, A);
      else break;
      A = n(d);
    }
  }
  function I(T) {
    if (b = !1, h(T), !E) if (n(c) !== null) E = !0, F(S);
    else {
      var A = n(d);
      A !== null && G(I, A.startTime - T);
    }
  }
  function S(T, A) {
    E = !1, b && (b = !1, v(x), x = -1), k = !0;
    var D = g;
    try {
      for (h(A), m = n(c); m !== null && (!(m.expirationTime > A) || T && !O()); ) {
        var H = m.callback;
        if (typeof H == "function") {
          m.callback = null, g = m.priorityLevel;
          var _ = H(m.expirationTime <= A);
          A = e.unstable_now(), typeof _ == "function" ? m.callback = _ : m === n(c) && r(c), h(A);
        } else r(c);
        m = n(c);
      }
      if (m !== null) var ce = !0;
      else {
        var ee = n(d);
        ee !== null && G(I, ee.startTime - A), ce = !1;
      }
      return ce;
    } finally {
      m = null, g = D, k = !1;
    }
  }
  var j = !1, y = null, x = -1, w = 5, M = -1;
  function O() {
    return !(e.unstable_now() - M < w);
  }
  function z() {
    if (y !== null) {
      var T = e.unstable_now();
      M = T;
      var A = !0;
      try {
        A = y(!0, T);
      } finally {
        A ? R() : (j = !1, y = null);
      }
    } else j = !1;
  }
  var R;
  if (typeof p == "function") R = function() {
    p(z);
  };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(), ne = W.port2;
    W.port1.onmessage = z, R = function() {
      ne.postMessage(null);
    };
  } else R = function() {
    P(z, 0);
  };
  function F(T) {
    y = T, j || (j = !0, R());
  }
  function G(T, A) {
    x = P(function() {
      T(e.unstable_now());
    }, A);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    E || k || (E = !0, F(S));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(T) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var A = 3;
        break;
      default:
        A = g;
    }
    var D = g;
    g = A;
    try {
      return T();
    } finally {
      g = D;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, A) {
    switch (T) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        T = 3;
    }
    var D = g;
    g = T;
    try {
      return A();
    } finally {
      g = D;
    }
  }, e.unstable_scheduleCallback = function(T, A, D) {
    var H = e.unstable_now();
    switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? H + D : H) : D = H, T) {
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
    return _ = D + _, T = { id: N++, callback: A, priorityLevel: T, startTime: D, expirationTime: _, sortIndex: -1 }, D > H ? (T.sortIndex = D, t(d, T), n(c) === null && T === n(d) && (b ? (v(x), x = -1) : b = !0, G(I, D - H))) : (T.sortIndex = _, t(c, T), E || k || (E = !0, F(S))), T;
  }, e.unstable_shouldYield = O, e.unstable_wrapCallback = function(T) {
    var A = g;
    return function() {
      var D = g;
      g = A;
      try {
        return T.apply(this, arguments);
      } finally {
        g = D;
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
function xe(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ah = /* @__PURE__ */ new Set(), Kl = {};
function Rr(e, t) {
  ul(e, t), ul(e + "Capture", t);
}
function ul(e, t) {
  for (Kl[e] = t, e = 0; e < t.length; e++) ah.add(t[e]);
}
var $s = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Sa = Object.prototype.hasOwnProperty, tm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Iu = {}, Tu = {};
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
function Rn(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var xn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  xn[e] = new Rn(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  xn[t] = new Rn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  xn[e] = new Rn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  xn[e] = new Rn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  xn[e] = new Rn(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  xn[e] = new Rn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  xn[e] = new Rn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  xn[e] = new Rn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  xn[e] = new Rn(e, 5, !1, e.toLowerCase(), null, !1, !1);
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
  xn[t] = new Rn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Mc, Ic);
  xn[t] = new Rn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Mc, Ic);
  xn[t] = new Rn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  xn[e] = new Rn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xn.xlinkHref = new Rn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  xn[e] = new Rn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Tc(e, t, n, r) {
  var l = xn.hasOwnProperty(t) ? xn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (rm(t, n, l, r) && (n = null), r || l === null ? nm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ps = em.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ko = Symbol.for("react.element"), Wr = Symbol.for("react.portal"), Ur = Symbol.for("react.fragment"), Ac = Symbol.for("react.strict_mode"), ba = Symbol.for("react.profiler"), ch = Symbol.for("react.provider"), uh = Symbol.for("react.context"), Rc = Symbol.for("react.forward_ref"), Ma = Symbol.for("react.suspense"), Ia = Symbol.for("react.suspense_list"), $c = Symbol.for("react.memo"), Ks = Symbol.for("react.lazy"), dh = Symbol.for("react.offscreen"), Au = Symbol.iterator;
function jl(e) {
  return e === null || typeof e != "object" ? null : (e = Au && e[Au] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Ht = Object.assign, Gi;
function $l(e) {
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
  return (e = e ? e.displayName || e.name : "") ? $l(e) : "";
}
function lm(e) {
  switch (e.tag) {
    case 5:
      return $l(e.type);
    case 16:
      return $l("Lazy");
    case 13:
      return $l("Suspense");
    case 19:
      return $l("SuspenseList");
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
    case Ur:
      return "Fragment";
    case Wr:
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
    case Ks:
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
function cr(e) {
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
  n = cr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ph(e, t) {
  t = t.checked, t != null && Tc(e, "checked", t, !1);
}
function Ra(e, t) {
  ph(e, t);
  var n = cr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? $a(e, t.type, n) : t.hasOwnProperty("defaultValue") && $a(e, t.type, cr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
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
var Ll = Array.isArray;
function tl(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + cr(n), t = null, l = 0; l < e.length; l++) {
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
  if (t.dangerouslySetInnerHTML != null) throw Error(xe(91));
  return Ht({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Lu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(xe(92));
      if (Ll(n)) {
        if (1 < n.length) throw Error(xe(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: cr(n) };
}
function mh(e, t) {
  var n = cr(t.value), r = cr(t.defaultValue);
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
    if (cm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(xe(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(xe(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(xe(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(xe(62));
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
var Fa = null, nl = null, sl = null;
function Du(e) {
  if (e = mo(e)) {
    if (typeof Fa != "function") throw Error(xe(280));
    var t = e.stateNode;
    t && (t = Ti(t), Fa(e.stateNode, e.type, t));
  }
}
function Nh(e) {
  nl ? sl ? sl.push(e) : sl = [e] : nl = e;
}
function kh() {
  if (nl) {
    var e = nl, t = sl;
    if (sl = nl = null, Du(e), t) for (e = 0; e < t.length; e++) Du(t[e]);
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
    Ji = !1, (nl !== null || sl !== null) && (jh(), kh());
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
  if (n && typeof n != "function") throw Error(xe(231, t, typeof n));
  return n;
}
var Ba = !1;
if ($s) try {
  var Cl = {};
  Object.defineProperty(Cl, "passive", { get: function() {
    Ba = !0;
  } }), window.addEventListener("test", Cl, Cl), window.removeEventListener("test", Cl, Cl);
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
var _l = !1, ti = null, ni = !1, Wa = null, dm = { onError: function(e) {
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
    } else throw Error(xe(198));
    ni || (ni = !0, Wa = d);
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
  if ($r(e) !== e) throw Error(xe(188));
}
function pm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = $r(e), t === null) throw Error(xe(188));
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
var Mh = Yn.unstable_scheduleCallback, _u = Yn.unstable_cancelCallback, mm = Yn.unstable_shouldYield, gm = Yn.unstable_requestPaint, qt = Yn.unstable_now, xm = Yn.unstable_getCurrentPriorityLevel, Oc = Yn.unstable_ImmediatePriority, Ih = Yn.unstable_UserBlockingPriority, si = Yn.unstable_NormalPriority, ym = Yn.unstable_LowPriority, Th = Yn.unstable_IdlePriority, Si = null, ks = null;
function vm(e) {
  if (ks && typeof ks.onCommitFiberRoot == "function") try {
    ks.onCommitFiberRoot(Si, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ds = Math.clz32 ? Math.clz32 : wm, Nm = Math.log, km = Math.LN2;
function wm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Nm(e) / km | 0) | 0;
}
var Co = 64, Eo = 4194304;
function Ol(e) {
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
    a !== 0 ? r = Ol(a) : (o &= i, o !== 0 && (r = Ol(o)));
  } else i = n & ~l, i !== 0 ? r = Ol(i) : o !== 0 && (r = Ol(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ds(t), l = 1 << n, r |= e[n], t &= ~l;
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
    var i = 31 - ds(o), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & r) && (l[i] = jm(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function Ua(e) {
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
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ds(t), e[t] = n;
}
function Em(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ds(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Dc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ds(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Mt = 0;
function Rh(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var $h, Pc, Lh, Oh, Dh, za = !1, So = [], tr = null, nr = null, sr = null, Xl = /* @__PURE__ */ new Map(), Ql = /* @__PURE__ */ new Map(), Qs = [], Sm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Fu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      tr = null;
      break;
    case "dragenter":
    case "dragleave":
      nr = null;
      break;
    case "mouseover":
    case "mouseout":
      sr = null;
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
function El(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = mo(t), t !== null && Pc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function bm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return tr = El(tr, e, t, n, r, l), !0;
    case "dragenter":
      return nr = El(nr, e, t, n, r, l), !0;
    case "mouseover":
      return sr = El(sr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Xl.set(o, El(Xl.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Ql.set(o, El(Ql.get(o) || null, e, t, n, r, l)), !0;
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
function Wo(e) {
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
  Wo(e) && n.delete(t);
}
function Mm() {
  za = !1, tr !== null && Wo(tr) && (tr = null), nr !== null && Wo(nr) && (nr = null), sr !== null && Wo(sr) && (sr = null), Xl.forEach(Bu), Ql.forEach(Bu);
}
function Sl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, za || (za = !0, Yn.unstable_scheduleCallback(Yn.unstable_NormalPriority, Mm)));
}
function Jl(e) {
  function t(l) {
    return Sl(l, e);
  }
  if (0 < So.length) {
    Sl(So[0], e);
    for (var n = 1; n < So.length; n++) {
      var r = So[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (tr !== null && Sl(tr, e), nr !== null && Sl(nr, e), sr !== null && Sl(sr, e), Xl.forEach(t), Ql.forEach(t), n = 0; n < Qs.length; n++) r = Qs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Qs.length && (n = Qs[0], n.blockedOn === null); ) Ph(n), n.blockedOn === null && Qs.shift();
}
var rl = Ps.ReactCurrentBatchConfig, li = !0;
function Im(e, t, n, r) {
  var l = Mt, o = rl.transition;
  rl.transition = null;
  try {
    Mt = 1, _c(e, t, n, r);
  } finally {
    Mt = l, rl.transition = o;
  }
}
function Tm(e, t, n, r) {
  var l = Mt, o = rl.transition;
  rl.transition = null;
  try {
    Mt = 4, _c(e, t, n, r);
  } finally {
    Mt = l, rl.transition = o;
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
var qs = null, Fc = null, Uo = null;
function Fh() {
  if (Uo) return Uo;
  var e, t = Fc, n = t.length, r, l = "value" in qs ? qs.value : qs.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Uo = l.slice(e, 1 < r ? 1 - r : void 0);
}
function zo(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function bo() {
  return !0;
}
function Wu() {
  return !1;
}
function Xn(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? bo : Wu, this.isPropagationStopped = Wu, this;
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
var yl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Bc = Xn(yl), po = Ht({}, yl, { view: 0, detail: 0 }), Am = Xn(po), qi, ea, bl, bi = Ht({}, po, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Wc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== bl && (bl && e.type === "mousemove" ? (qi = e.screenX - bl.screenX, ea = e.screenY - bl.screenY) : ea = qi = 0, bl = e), qi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ea;
} }), Uu = Xn(bi), Rm = Ht({}, bi, { dataTransfer: 0 }), $m = Xn(Rm), Lm = Ht({}, po, { relatedTarget: 0 }), ta = Xn(Lm), Om = Ht({}, yl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Dm = Xn(Om), Pm = Ht({}, yl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), _m = Xn(Pm), Fm = Ht({}, yl, { data: 0 }), zu = Xn(Fm), Bm = {
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
}, Wm = {
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
}, Um = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function zm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Um[e]) ? !!t[e] : !1;
}
function Wc() {
  return zm;
}
var Hm = Ht({}, po, { key: function(e) {
  if (e.key) {
    var t = Bm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = zo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Wm[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Wc, charCode: function(e) {
  return e.type === "keypress" ? zo(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? zo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Vm = Xn(Hm), Km = Ht({}, bi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Hu = Xn(Km), Ym = Ht({}, po, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Wc }), Gm = Xn(Ym), Xm = Ht({}, yl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Qm = Xn(Xm), Jm = Ht({}, bi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zm = Xn(Jm), qm = [9, 13, 27, 32], Uc = $s && "CompositionEvent" in window, Fl = null;
$s && "documentMode" in document && (Fl = document.documentMode);
var e0 = $s && "TextEvent" in window && !Fl, Bh = $s && (!Uc || Fl && 8 < Fl && 11 >= Fl), Vu = " ", Ku = !1;
function Wh(e, t) {
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
function Uh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var zr = !1;
function t0(e, t) {
  switch (e) {
    case "compositionend":
      return Uh(t);
    case "keypress":
      return t.which !== 32 ? null : (Ku = !0, Vu);
    case "textInput":
      return e = t.data, e === Vu && Ku ? null : e;
    default:
      return null;
  }
}
function n0(e, t) {
  if (zr) return e === "compositionend" || !Uc && Wh(e, t) ? (e = Fh(), Uo = Fc = qs = null, zr = !1, e) : null;
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
if ($s) {
  var na;
  if ($s) {
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
var fs = typeof Object.is == "function" ? Object.is : u0;
function ql(e, t) {
  if (fs(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Sa.call(t, l) || !fs(e[l], t[l])) return !1;
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
var h0 = $s && "documentMode" in document && 11 >= document.documentMode, Hr = null, Va = null, Wl = null, Ka = !1;
function Zu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ka || Hr == null || Hr !== ei(r) || (r = Hr, "selectionStart" in r && zc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Wl && ql(Wl, r) || (Wl = r, r = ii(Va, "onSelect"), 0 < r.length && (t = new Bc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Hr)));
}
function Mo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Vr = { animationend: Mo("Animation", "AnimationEnd"), animationiteration: Mo("Animation", "AnimationIteration"), animationstart: Mo("Animation", "AnimationStart"), transitionend: Mo("Transition", "TransitionEnd") }, ra = {}, Gh = {};
$s && (Gh = document.createElement("div").style, "AnimationEvent" in window || (delete Vr.animationend.animation, delete Vr.animationiteration.animation, delete Vr.animationstart.animation), "TransitionEvent" in window || delete Vr.transitionend.transition);
function Ii(e) {
  if (ra[e]) return ra[e];
  if (!Vr[e]) return e;
  var t = Vr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Gh) return ra[e] = t[n];
  return e;
}
var Xh = Ii("animationend"), Qh = Ii("animationiteration"), Jh = Ii("animationstart"), Zh = Ii("transitionend"), qh = /* @__PURE__ */ new Map(), qu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function dr(e, t) {
  qh.set(e, t), Rr(t, [e]);
}
for (var la = 0; la < qu.length; la++) {
  var oa = qu[la], f0 = oa.toLowerCase(), p0 = oa[0].toUpperCase() + oa.slice(1);
  dr(f0, "on" + p0);
}
dr(Xh, "onAnimationEnd");
dr(Qh, "onAnimationIteration");
dr(Jh, "onAnimationStart");
dr("dblclick", "onDoubleClick");
dr("focusin", "onFocus");
dr("focusout", "onBlur");
dr(Zh, "onTransitionEnd");
ul("onMouseEnter", ["mouseout", "mouseover"]);
ul("onMouseLeave", ["mouseout", "mouseover"]);
ul("onPointerEnter", ["pointerout", "pointerover"]);
ul("onPointerLeave", ["pointerout", "pointerover"]);
Rr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Rr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Rr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Rr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Rr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Rr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Dl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), m0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Dl));
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
  if (ni) throw e = Wa, ni = !1, Wa = null, e;
}
function Dt(e, t) {
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
        var k = Bc, E = e;
        switch (e) {
          case "keypress":
            if (zo(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = Vm;
            break;
          case "focusin":
            E = "focus", k = ta;
            break;
          case "focusout":
            E = "blur", k = ta;
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
            k = Uu;
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
        var b = (t & 4) !== 0, P = !b && e === "scroll", v = b ? g !== null ? g + "Capture" : null : g;
        b = [];
        for (var p = d, h; p !== null; ) {
          h = p;
          var I = h.stateNode;
          if (h.tag === 5 && I !== null && (h = I, v !== null && (I = Gl(p, v), I != null && b.push(to(p, I, h)))), P) break;
          p = p.return;
        }
        0 < b.length && (g = new k(g, E, null, n, N), m.push({ event: g, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", g && n !== _a && (E = n.relatedTarget || n.fromElement) && (kr(E) || E[Ls])) break e;
        if ((k || g) && (g = N.window === N ? N : (g = N.ownerDocument) ? g.defaultView || g.parentWindow : window, k ? (E = n.relatedTarget || n.toElement, k = d, E = E ? kr(E) : null, E !== null && (P = $r(E), E !== P || E.tag !== 5 && E.tag !== 6) && (E = null)) : (k = null, E = d), k !== E)) {
          if (b = Uu, I = "onMouseLeave", v = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (b = Hu, I = "onPointerLeave", v = "onPointerEnter", p = "pointer"), P = k == null ? g : Kr(k), h = E == null ? g : Kr(E), g = new b(I, p + "leave", k, n, N), g.target = P, g.relatedTarget = h, I = null, kr(N) === d && (b = new b(v, p + "enter", E, n, N), b.target = h, b.relatedTarget = P, I = b), P = I, k && E) t: {
            for (b = k, v = E, p = 0, h = b; h; h = Dr(h)) p++;
            for (h = 0, I = v; I; I = Dr(I)) h++;
            for (; 0 < p - h; ) b = Dr(b), p--;
            for (; 0 < h - p; ) v = Dr(v), h--;
            for (; p--; ) {
              if (b === v || v !== null && b === v.alternate) break t;
              b = Dr(b), v = Dr(v);
            }
            b = null;
          }
          else b = null;
          k !== null && td(m, g, k, b, !1), E !== null && P !== null && td(m, P, E, b, !0);
        }
      }
      e: {
        if (g = d ? Kr(d) : window, k = g.nodeName && g.nodeName.toLowerCase(), k === "select" || k === "input" && g.type === "file") var S = l0;
        else if (Yu(g)) if (Hh) S = c0;
        else {
          S = i0;
          var j = o0;
        }
        else (k = g.nodeName) && k.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (S = a0);
        if (S && (S = S(e, d))) {
          zh(m, S, n, N);
          break e;
        }
        j && j(e, g, d), e === "focusout" && (j = g._wrapperState) && j.controlled && g.type === "number" && $a(g, "number", g.value);
      }
      switch (j = d ? Kr(d) : window, e) {
        case "focusin":
          (Yu(j) || j.contentEditable === "true") && (Hr = j, Va = d, Wl = null);
          break;
        case "focusout":
          Wl = Va = Hr = null;
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
      var y;
      if (Uc) e: {
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
      else zr ? Wh(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
      x && (Bh && n.locale !== "ko" && (zr || x !== "onCompositionStart" ? x === "onCompositionEnd" && zr && (y = Fh()) : (qs = N, Fc = "value" in qs ? qs.value : qs.textContent, zr = !0)), j = ii(d, x), 0 < j.length && (x = new zu(x, e, null, n, N), m.push({ event: x, listeners: j }), y ? x.data = y : (y = Uh(n), y !== null && (x.data = y)))), (y = e0 ? t0(e, n) : n0(e, n)) && (d = ii(d, "onBeforeInput"), 0 < d.length && (N = new zu("onBeforeInput", "beforeinput", null, n, N), m.push({ event: N, listeners: d }), N.data = y));
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
  if (t = nd(t), nd(e) !== t && n) throw Error(xe(425));
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
function rr(e) {
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
var vl = Math.random().toString(36).slice(2), vs = "__reactFiber$" + vl, no = "__reactProps$" + vl, Ls = "__reactContainer$" + vl, Ja = "__reactEvents$" + vl, k0 = "__reactListeners$" + vl, w0 = "__reactHandles$" + vl;
function kr(e) {
  var t = e[vs];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ls] || n[vs]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = rd(e); e !== null; ) {
        if (n = e[vs]) return n;
        e = rd(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function mo(e) {
  return e = e[vs] || e[Ls], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Kr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(xe(33));
}
function Ti(e) {
  return e[no] || null;
}
var Za = [], Yr = -1;
function hr(e) {
  return { current: e };
}
function Pt(e) {
  0 > Yr || (e.current = Za[Yr], Za[Yr] = null, Yr--);
}
function Ot(e, t) {
  Yr++, Za[Yr] = e.current, e.current = t;
}
var ur = {}, wn = hr(ur), Bn = hr(!1), br = ur;
function dl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ur;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Wn(e) {
  return e = e.childContextTypes, e != null;
}
function ci() {
  Pt(Bn), Pt(wn);
}
function ld(e, t, n) {
  if (wn.current !== ur) throw Error(xe(168));
  Ot(wn, t), Ot(Bn, n);
}
function nf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(xe(108, om(e) || "Unknown", l));
  return Ht({}, n, r);
}
function ui(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ur, br = wn.current, Ot(wn, e), Ot(Bn, Bn.current), !0;
}
function od(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(xe(169));
  n ? (e = nf(e, t, br), r.__reactInternalMemoizedMergedChildContext = e, Pt(Bn), Pt(wn), Ot(wn, e)) : Pt(Bn), Ot(Bn, n);
}
var bs = null, Ai = !1, ua = !1;
function sf(e) {
  bs === null ? bs = [e] : bs.push(e);
}
function j0(e) {
  Ai = !0, sf(e);
}
function fr() {
  if (!ua && bs !== null) {
    ua = !0;
    var e = 0, t = Mt;
    try {
      var n = bs;
      for (Mt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      bs = null, Ai = !1;
    } catch (l) {
      throw bs !== null && (bs = bs.slice(e + 1)), Mh(Oc, fr), l;
    } finally {
      Mt = t, ua = !1;
    }
  }
  return null;
}
var Gr = [], Xr = 0, di = null, hi = 0, es = [], ts = 0, Mr = null, Is = 1, Ts = "";
function yr(e, t) {
  Gr[Xr++] = hi, Gr[Xr++] = di, di = e, hi = t;
}
function rf(e, t, n) {
  es[ts++] = Is, es[ts++] = Ts, es[ts++] = Mr, Mr = e;
  var r = Is;
  e = Ts;
  var l = 32 - ds(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - ds(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Is = 1 << 32 - ds(t) + l | n << l | r, Ts = o + e;
  } else Is = 1 << o | n << l | r, Ts = e;
}
function Hc(e) {
  e.return !== null && (yr(e, 1), rf(e, 1, 0));
}
function Vc(e) {
  for (; e === di; ) di = Gr[--Xr], Gr[Xr] = null, hi = Gr[--Xr], Gr[Xr] = null;
  for (; e === Mr; ) Mr = es[--ts], es[ts] = null, Ts = es[--ts], es[ts] = null, Is = es[--ts], es[ts] = null;
}
var Kn = null, Vn = null, Ft = !1, cs = null;
function lf(e, t) {
  var n = ns(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function id(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Kn = e, Vn = rr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Kn = e, Vn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Mr !== null ? { id: Is, overflow: Ts } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ns(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Kn = e, Vn = null, !0) : !1;
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
        if (qa(e)) throw Error(xe(418));
        t = rr(n.nextSibling);
        var r = Kn;
        t && id(e, t) ? lf(r, n) : (e.flags = e.flags & -4097 | 2, Ft = !1, Kn = e);
      }
    } else {
      if (qa(e)) throw Error(xe(418));
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
    if (qa(e)) throw of(), Error(xe(418));
    for (; t; ) lf(e, t), t = rr(t.nextSibling);
  }
  if (ad(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(xe(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Vn = rr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Vn = null;
    }
  } else Vn = Kn ? rr(e.stateNode.nextSibling) : null;
  return !0;
}
function of() {
  for (var e = Vn; e; ) e = rr(e.nextSibling);
}
function hl() {
  Vn = Kn = null, Ft = !1;
}
function Kc(e) {
  cs === null ? cs = [e] : cs.push(e);
}
var C0 = Ps.ReactCurrentBatchConfig;
function Ml(e, t, n) {
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
function Ro(e, t) {
  throw e = Object.prototype.toString.call(t), Error(xe(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function cd(e) {
  var t = e._init;
  return t(e._payload);
}
function af(e) {
  function t(v, p) {
    if (e) {
      var h = v.deletions;
      h === null ? (v.deletions = [p], v.flags |= 16) : h.push(p);
    }
  }
  function n(v, p) {
    if (!e) return null;
    for (; p !== null; ) t(v, p), p = p.sibling;
    return null;
  }
  function r(v, p) {
    for (v = /* @__PURE__ */ new Map(); p !== null; ) p.key !== null ? v.set(p.key, p) : v.set(p.index, p), p = p.sibling;
    return v;
  }
  function l(v, p) {
    return v = ar(v, p), v.index = 0, v.sibling = null, v;
  }
  function o(v, p, h) {
    return v.index = h, e ? (h = v.alternate, h !== null ? (h = h.index, h < p ? (v.flags |= 2, p) : h) : (v.flags |= 2, p)) : (v.flags |= 1048576, p);
  }
  function i(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function a(v, p, h, I) {
    return p === null || p.tag !== 6 ? (p = xa(h, v.mode, I), p.return = v, p) : (p = l(p, h), p.return = v, p);
  }
  function c(v, p, h, I) {
    var S = h.type;
    return S === Ur ? N(v, p, h.props.children, I, h.key) : p !== null && (p.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Ks && cd(S) === p.type) ? (I = l(p, h.props), I.ref = Ml(v, p, h), I.return = v, I) : (I = Qo(h.type, h.key, h.props, null, v.mode, I), I.ref = Ml(v, p, h), I.return = v, I);
  }
  function d(v, p, h, I) {
    return p === null || p.tag !== 4 || p.stateNode.containerInfo !== h.containerInfo || p.stateNode.implementation !== h.implementation ? (p = ya(h, v.mode, I), p.return = v, p) : (p = l(p, h.children || []), p.return = v, p);
  }
  function N(v, p, h, I, S) {
    return p === null || p.tag !== 7 ? (p = Sr(h, v.mode, I, S), p.return = v, p) : (p = l(p, h), p.return = v, p);
  }
  function m(v, p, h) {
    if (typeof p == "string" && p !== "" || typeof p == "number") return p = xa("" + p, v.mode, h), p.return = v, p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case ko:
          return h = Qo(p.type, p.key, p.props, null, v.mode, h), h.ref = Ml(v, null, p), h.return = v, h;
        case Wr:
          return p = ya(p, v.mode, h), p.return = v, p;
        case Ks:
          var I = p._init;
          return m(v, I(p._payload), h);
      }
      if (Ll(p) || jl(p)) return p = Sr(p, v.mode, h, null), p.return = v, p;
      Ro(v, p);
    }
    return null;
  }
  function g(v, p, h, I) {
    var S = p !== null ? p.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number") return S !== null ? null : a(v, p, "" + h, I);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case ko:
          return h.key === S ? c(v, p, h, I) : null;
        case Wr:
          return h.key === S ? d(v, p, h, I) : null;
        case Ks:
          return S = h._init, g(
            v,
            p,
            S(h._payload),
            I
          );
      }
      if (Ll(h) || jl(h)) return S !== null ? null : N(v, p, h, I, null);
      Ro(v, h);
    }
    return null;
  }
  function k(v, p, h, I, S) {
    if (typeof I == "string" && I !== "" || typeof I == "number") return v = v.get(h) || null, a(p, v, "" + I, S);
    if (typeof I == "object" && I !== null) {
      switch (I.$$typeof) {
        case ko:
          return v = v.get(I.key === null ? h : I.key) || null, c(p, v, I, S);
        case Wr:
          return v = v.get(I.key === null ? h : I.key) || null, d(p, v, I, S);
        case Ks:
          var j = I._init;
          return k(v, p, h, j(I._payload), S);
      }
      if (Ll(I) || jl(I)) return v = v.get(h) || null, N(p, v, I, S, null);
      Ro(p, I);
    }
    return null;
  }
  function E(v, p, h, I) {
    for (var S = null, j = null, y = p, x = p = 0, w = null; y !== null && x < h.length; x++) {
      y.index > x ? (w = y, y = null) : w = y.sibling;
      var M = g(v, y, h[x], I);
      if (M === null) {
        y === null && (y = w);
        break;
      }
      e && y && M.alternate === null && t(v, y), p = o(M, p, x), j === null ? S = M : j.sibling = M, j = M, y = w;
    }
    if (x === h.length) return n(v, y), Ft && yr(v, x), S;
    if (y === null) {
      for (; x < h.length; x++) y = m(v, h[x], I), y !== null && (p = o(y, p, x), j === null ? S = y : j.sibling = y, j = y);
      return Ft && yr(v, x), S;
    }
    for (y = r(v, y); x < h.length; x++) w = k(y, v, x, h[x], I), w !== null && (e && w.alternate !== null && y.delete(w.key === null ? x : w.key), p = o(w, p, x), j === null ? S = w : j.sibling = w, j = w);
    return e && y.forEach(function(O) {
      return t(v, O);
    }), Ft && yr(v, x), S;
  }
  function b(v, p, h, I) {
    var S = jl(h);
    if (typeof S != "function") throw Error(xe(150));
    if (h = S.call(h), h == null) throw Error(xe(151));
    for (var j = S = null, y = p, x = p = 0, w = null, M = h.next(); y !== null && !M.done; x++, M = h.next()) {
      y.index > x ? (w = y, y = null) : w = y.sibling;
      var O = g(v, y, M.value, I);
      if (O === null) {
        y === null && (y = w);
        break;
      }
      e && y && O.alternate === null && t(v, y), p = o(O, p, x), j === null ? S = O : j.sibling = O, j = O, y = w;
    }
    if (M.done) return n(
      v,
      y
    ), Ft && yr(v, x), S;
    if (y === null) {
      for (; !M.done; x++, M = h.next()) M = m(v, M.value, I), M !== null && (p = o(M, p, x), j === null ? S = M : j.sibling = M, j = M);
      return Ft && yr(v, x), S;
    }
    for (y = r(v, y); !M.done; x++, M = h.next()) M = k(y, v, x, M.value, I), M !== null && (e && M.alternate !== null && y.delete(M.key === null ? x : M.key), p = o(M, p, x), j === null ? S = M : j.sibling = M, j = M);
    return e && y.forEach(function(z) {
      return t(v, z);
    }), Ft && yr(v, x), S;
  }
  function P(v, p, h, I) {
    if (typeof h == "object" && h !== null && h.type === Ur && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case ko:
          e: {
            for (var S = h.key, j = p; j !== null; ) {
              if (j.key === S) {
                if (S = h.type, S === Ur) {
                  if (j.tag === 7) {
                    n(v, j.sibling), p = l(j, h.props.children), p.return = v, v = p;
                    break e;
                  }
                } else if (j.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Ks && cd(S) === j.type) {
                  n(v, j.sibling), p = l(j, h.props), p.ref = Ml(v, j, h), p.return = v, v = p;
                  break e;
                }
                n(v, j);
                break;
              } else t(v, j);
              j = j.sibling;
            }
            h.type === Ur ? (p = Sr(h.props.children, v.mode, I, h.key), p.return = v, v = p) : (I = Qo(h.type, h.key, h.props, null, v.mode, I), I.ref = Ml(v, p, h), I.return = v, v = I);
          }
          return i(v);
        case Wr:
          e: {
            for (j = h.key; p !== null; ) {
              if (p.key === j) if (p.tag === 4 && p.stateNode.containerInfo === h.containerInfo && p.stateNode.implementation === h.implementation) {
                n(v, p.sibling), p = l(p, h.children || []), p.return = v, v = p;
                break e;
              } else {
                n(v, p);
                break;
              }
              else t(v, p);
              p = p.sibling;
            }
            p = ya(h, v.mode, I), p.return = v, v = p;
          }
          return i(v);
        case Ks:
          return j = h._init, P(v, p, j(h._payload), I);
      }
      if (Ll(h)) return E(v, p, h, I);
      if (jl(h)) return b(v, p, h, I);
      Ro(v, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, p !== null && p.tag === 6 ? (n(v, p.sibling), p = l(p, h), p.return = v, v = p) : (n(v, p), p = xa(h, v.mode, I), p.return = v, v = p), i(v)) : n(v, p);
  }
  return P;
}
var fl = af(!0), cf = af(!1), fi = hr(null), pi = null, Qr = null, Yc = null;
function Gc() {
  Yc = Qr = pi = null;
}
function Xc(e) {
  var t = fi.current;
  Pt(fi), e._currentValue = t;
}
function tc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ll(e, t) {
  pi = e, Yc = Qr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Fn = !0), e.firstContext = null);
}
function rs(e) {
  var t = e._currentValue;
  if (Yc !== e) if (e = { context: e, memoizedValue: t, next: null }, Qr === null) {
    if (pi === null) throw Error(xe(308));
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
  return l === null ? (n.next = n, Qc(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Os(e, r);
}
function Os(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Ys = !1;
function Jc(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function df(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function As(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function lr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, wt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Os(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Qc(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Os(e, n);
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
  Ys = !1;
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
          var E = e, b = a;
          switch (g = t, k = n, b.tag) {
            case 1:
              if (E = b.payload, typeof E == "function") {
                m = E.call(k, m, g);
                break e;
              }
              m = E;
              break e;
            case 3:
              E.flags = E.flags & -65537 | 128;
            case 0:
              if (E = b.payload, g = typeof E == "function" ? E.call(k, m, g) : E, g == null) break e;
              m = Ht({}, m, g);
              break e;
            case 2:
              Ys = !0;
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
      if (r.callback = null, r = n, typeof l != "function") throw Error(xe(191, l));
      l.call(r);
    }
  }
}
var go = {}, ws = hr(go), so = hr(go), ro = hr(go);
function jr(e) {
  if (e === go) throw Error(xe(174));
  return e;
}
function Zc(e, t) {
  switch (Ot(ro, t), Ot(so, e), Ot(ws, go), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Oa(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Oa(t, e);
  }
  Pt(ws), Ot(ws, t);
}
function pl() {
  Pt(ws), Pt(so), Pt(ro);
}
function hf(e) {
  jr(ro.current);
  var t = jr(ws.current), n = Oa(t, e.type);
  t !== n && (Ot(so, e), Ot(ws, n));
}
function qc(e) {
  so.current === e && (Pt(ws), Pt(so));
}
var Ut = hr(0);
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
var Vo = Ps.ReactCurrentDispatcher, ha = Ps.ReactCurrentBatchConfig, Ir = 0, zt = null, on = null, dn = null, xi = !1, Ul = !1, lo = 0, E0 = 0;
function vn() {
  throw Error(xe(321));
}
function tu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!fs(e[n], t[n])) return !1;
  return !0;
}
function nu(e, t, n, r, l, o) {
  if (Ir = o, zt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Vo.current = e === null || e.memoizedState === null ? I0 : T0, e = n(r, l), Ul) {
    o = 0;
    do {
      if (Ul = !1, lo = 0, 25 <= o) throw Error(xe(301));
      o += 1, dn = on = null, t.updateQueue = null, Vo.current = A0, e = n(r, l);
    } while (Ul);
  }
  if (Vo.current = yi, t = on !== null && on.next !== null, Ir = 0, dn = on = zt = null, xi = !1, t) throw Error(xe(300));
  return e;
}
function su() {
  var e = lo !== 0;
  return lo = 0, e;
}
function ys() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return dn === null ? zt.memoizedState = dn = e : dn = dn.next = e, dn;
}
function ls() {
  if (on === null) {
    var e = zt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = on.next;
  var t = dn === null ? zt.memoizedState : dn.next;
  if (t !== null) dn = t, on = e;
  else {
    if (e === null) throw Error(xe(310));
    on = e, e = { memoizedState: on.memoizedState, baseState: on.baseState, baseQueue: on.baseQueue, queue: on.queue, next: null }, dn === null ? zt.memoizedState = dn = e : dn = dn.next = e;
  }
  return dn;
}
function oo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function fa(e) {
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
    c === null ? i = r : c.next = a, fs(r, t.memoizedState) || (Fn = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
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
function ff() {
}
function pf(e, t) {
  var n = zt, r = ls(), l = t(), o = !fs(r.memoizedState, l);
  if (o && (r.memoizedState = l, Fn = !0), r = r.queue, ru(xf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || dn !== null && dn.memoizedState.tag & 1) {
    if (n.flags |= 2048, io(9, gf.bind(null, n, r, l, t), void 0, null), hn === null) throw Error(xe(349));
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
    return !fs(e, n);
  } catch {
    return !0;
  }
}
function vf(e) {
  var t = Os(e, 1);
  t !== null && hs(t, e, 1, -1);
}
function hd(e) {
  var t = ys();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: oo, lastRenderedState: e }, t.queue = e, e = e.dispatch = M0.bind(null, zt, e), [t.memoizedState, e];
}
function io(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = zt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, zt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Nf() {
  return ls().memoizedState;
}
function Ko(e, t, n, r) {
  var l = ys();
  zt.flags |= e, l.memoizedState = io(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ri(e, t, n, r) {
  var l = ls();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (on !== null) {
    var i = on.memoizedState;
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
  var n = ls();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && tu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Sf(e, t) {
  var n = ls();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && tu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function bf(e, t, n) {
  return Ir & 21 ? (fs(n, t) || (n = Ah(), zt.lanes |= n, Tr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Fn = !0), e.memoizedState = n);
}
function S0(e, t) {
  var n = Mt;
  Mt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ha.transition;
  ha.transition = {};
  try {
    e(!1), t();
  } finally {
    Mt = n, ha.transition = r;
  }
}
function Mf() {
  return ls().memoizedState;
}
function b0(e, t, n) {
  var r = ir(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, If(e)) Tf(t, n);
  else if (n = uf(e, t, n, r), n !== null) {
    var l = Tn();
    hs(n, e, r, l), Af(n, t, r);
  }
}
function M0(e, t, n) {
  var r = ir(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (If(e)) Tf(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, fs(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, Qc(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = uf(e, t, l, r), n !== null && (l = Tn(), hs(n, e, r, l), Af(n, t, r));
  }
}
function If(e) {
  var t = e.alternate;
  return e === zt || t !== null && t === zt;
}
function Tf(e, t) {
  Ul = xi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Af(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Dc(e, n);
  }
}
var yi = { readContext: rs, useCallback: vn, useContext: vn, useEffect: vn, useImperativeHandle: vn, useInsertionEffect: vn, useLayoutEffect: vn, useMemo: vn, useReducer: vn, useRef: vn, useState: vn, useDebugValue: vn, useDeferredValue: vn, useTransition: vn, useMutableSource: vn, useSyncExternalStore: vn, useId: vn, unstable_isNewReconciler: !1 }, I0 = { readContext: rs, useCallback: function(e, t) {
  return ys().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: rs, useEffect: fd, useImperativeHandle: function(e, t, n) {
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
  var n = ys();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ys();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = b0.bind(null, zt, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ys();
  return e = { current: e }, t.memoizedState = e;
}, useState: hd, useDebugValue: lu, useDeferredValue: function(e) {
  return ys().memoizedState = e;
}, useTransition: function() {
  var e = hd(!1), t = e[0];
  return e = S0.bind(null, e[1]), ys().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = zt, l = ys();
  if (Ft) {
    if (n === void 0) throw Error(xe(407));
    n = n();
  } else {
    if (n = t(), hn === null) throw Error(xe(349));
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
  var e = ys(), t = hn.identifierPrefix;
  if (Ft) {
    var n = Ts, r = Is;
    n = (r & ~(1 << 32 - ds(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = lo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = E0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, T0 = {
  readContext: rs,
  useCallback: Ef,
  useContext: rs,
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
    var t = ls();
    return bf(t, on.memoizedState, e);
  },
  useTransition: function() {
    var e = fa(oo)[0], t = ls().memoizedState;
    return [e, t];
  },
  useMutableSource: ff,
  useSyncExternalStore: pf,
  useId: Mf,
  unstable_isNewReconciler: !1
}, A0 = { readContext: rs, useCallback: Ef, useContext: rs, useEffect: ru, useImperativeHandle: Cf, useInsertionEffect: kf, useLayoutEffect: wf, useMemo: Sf, useReducer: pa, useRef: Nf, useState: function() {
  return pa(oo);
}, useDebugValue: lu, useDeferredValue: function(e) {
  var t = ls();
  return on === null ? t.memoizedState = e : bf(t, on.memoizedState, e);
}, useTransition: function() {
  var e = pa(oo)[0], t = ls().memoizedState;
  return [e, t];
}, useMutableSource: ff, useSyncExternalStore: pf, useId: Mf, unstable_isNewReconciler: !1 };
function is(e, t) {
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
  var r = Tn(), l = ir(e), o = As(r, l);
  o.payload = t, n != null && (o.callback = n), t = lr(e, o, l), t !== null && (hs(t, e, l, r), Ho(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Tn(), l = ir(e), o = As(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = lr(e, o, l), t !== null && (hs(t, e, l, r), Ho(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Tn(), r = ir(e), l = As(n, r);
  l.tag = 2, t != null && (l.callback = t), t = lr(e, l, r), t !== null && (hs(t, e, r, n), Ho(t, e, r));
} };
function pd(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !ql(n, r) || !ql(l, o) : !0;
}
function Rf(e, t, n) {
  var r = !1, l = ur, o = t.contextType;
  return typeof o == "object" && o !== null ? o = rs(o) : (l = Wn(t) ? br : wn.current, r = t.contextTypes, o = (r = r != null) ? dl(e, l) : ur), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = $i, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function md(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && $i.enqueueReplaceState(t, t.state, null);
}
function sc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Jc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = rs(o) : (o = Wn(t) ? br : wn.current, l.context = dl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (nc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && $i.enqueueReplaceState(l, l.state, null), mi(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function ml(e, t) {
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
  n = As(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Ni || (Ni = !0, pc = r), rc(e, t);
  }, n;
}
function Lf(e, t, n) {
  n = As(-1, n), n.tag = 3;
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
    rc(e, t), typeof r != "function" && (or === null ? or = /* @__PURE__ */ new Set([this]) : or.add(this));
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
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = As(-1, 1), t.tag = 2, lr(n, t, 1))), n.lanes |= 1), e);
}
var $0 = Ps.ReactCurrentOwner, Fn = !1;
function In(e, t, n, r) {
  t.child = e === null ? cf(t, null, n, r) : fl(t, e.child, n, r);
}
function vd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return ll(t, l), r = nu(e, t, n, r, o, l), n = su(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ds(e, t, l)) : (Ft && n && Hc(t), t.flags |= 1, In(e, t, r, l), t.child);
}
function Nd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !fu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Of(e, t, o, r, l)) : (e = Qo(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : ql, n(i, r) && e.ref === t.ref) return Ds(e, t, l);
  }
  return t.flags |= 1, e = ar(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Of(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (ql(o, r) && e.ref === t.ref) if (Fn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Fn = !0);
    else return t.lanes = e.lanes, Ds(e, t, l);
  }
  return lc(e, t, n, r, l);
}
function Df(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ot(Zr, Hn), Hn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ot(Zr, Hn), Hn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Ot(Zr, Hn), Hn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Ot(Zr, Hn), Hn |= r;
  return In(e, t, l, n), t.child;
}
function Pf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function lc(e, t, n, r, l) {
  var o = Wn(n) ? br : wn.current;
  return o = dl(t, o), ll(t, l), n = nu(e, t, n, r, o, l), r = su(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ds(e, t, l)) : (Ft && r && Hc(t), t.flags |= 1, In(e, t, n, l), t.child);
}
function kd(e, t, n, r, l) {
  if (Wn(n)) {
    var o = !0;
    ui(t);
  } else o = !1;
  if (ll(t, l), t.stateNode === null) Yo(e, t), Rf(t, n, r), sc(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = rs(d) : (d = Wn(n) ? br : wn.current, d = dl(t, d));
    var N = n.getDerivedStateFromProps, m = typeof N == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== d) && md(t, i, r, d), Ys = !1;
    var g = t.memoizedState;
    i.state = g, mi(t, r, i, l), c = t.memoizedState, a !== r || g !== c || Bn.current || Ys ? (typeof N == "function" && (nc(t, n, N, r), c = t.memoizedState), (a = Ys || pd(t, n, a, r, g, c, d)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = d, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, df(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : is(t.type, a), i.props = d, m = t.pendingProps, g = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = rs(c) : (c = Wn(n) ? br : wn.current, c = dl(t, c));
    var k = n.getDerivedStateFromProps;
    (N = typeof k == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== m || g !== c) && md(t, i, r, c), Ys = !1, g = t.memoizedState, i.state = g, mi(t, r, i, l);
    var E = t.memoizedState;
    a !== m || g !== E || Bn.current || Ys ? (typeof k == "function" && (nc(t, n, k, r), E = t.memoizedState), (d = Ys || pd(t, n, d, r, g, E, c) || !1) ? (N || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, E, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, E, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = E), i.props = r, i.state = E, i.context = c, r = d) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return oc(e, t, n, r, o, l);
}
function oc(e, t, n, r, l, o) {
  Pf(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && od(t, n, !1), Ds(e, t, o);
  r = t.stateNode, $0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = fl(t, e.child, null, o), t.child = fl(t, null, a, o)) : In(e, t, a, o), t.memoizedState = r.state, l && od(t, n, !0), t.child;
}
function _f(e) {
  var t = e.stateNode;
  t.pendingContext ? ld(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ld(e, t.context, !1), Zc(e, t.containerInfo);
}
function wd(e, t, n, r, l) {
  return hl(), Kc(l), t.flags |= 256, In(e, t, n, r), t.child;
}
var ic = { dehydrated: null, treeContext: null, retryLane: 0 };
function ac(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ff(e, t, n) {
  var r = t.pendingProps, l = Ut.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ot(Ut, l & 1), e === null)
    return ec(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Di(i, r, 0, null), e = Sr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = ac(n), t.memoizedState = ic, e) : ou(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return L0(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = ar(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = ar(a, o) : (o = Sr(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? ac(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = ic, r;
  }
  return o = e.child, e = o.sibling, r = ar(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function ou(e, t) {
  return t = Di({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function $o(e, t, n, r) {
  return r !== null && Kc(r), fl(t, e.child, null, n), e = ou(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function L0(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ma(Error(xe(422))), $o(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Di({ mode: "visible", children: r.children }, l, 0, null), o = Sr(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && fl(t, e.child, null, i), t.child.memoizedState = ac(i), t.memoizedState = ic, o);
  if (!(t.mode & 1)) return $o(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(xe(419)), r = ma(o, r, void 0), $o(e, t, i, r);
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Os(e, l), hs(r, e, l, -1));
    }
    return hu(), r = ma(Error(xe(421))), $o(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Y0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Vn = rr(l.nextSibling), Kn = t, Ft = !0, cs = null, e !== null && (es[ts++] = Is, es[ts++] = Ts, es[ts++] = Mr, Is = e.id, Ts = e.overflow, Mr = t), t = ou(t, r.children), t.flags |= 4096, t);
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
  if (In(e, t, r.children, n), r = Ut.current, r & 2) r = r & 1 | 2, t.flags |= 128;
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
  if (Ot(Ut, r), !(t.mode & 1)) t.memoizedState = null;
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
function Ds(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Tr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(xe(153));
  if (t.child !== null) {
    for (e = t.child, n = ar(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ar(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function O0(e, t, n) {
  switch (t.tag) {
    case 3:
      _f(t), hl();
      break;
    case 5:
      hf(t);
      break;
    case 1:
      Wn(t.type) && ui(t);
      break;
    case 4:
      Zc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Ot(fi, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Ot(Ut, Ut.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ff(e, t, n) : (Ot(Ut, Ut.current & 1), e = Ds(e, t, n), e !== null ? e.sibling : null);
      Ot(Ut, Ut.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Bf(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Ot(Ut, Ut.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Df(e, t, n);
  }
  return Ds(e, t, n);
}
var Wf, cc, Uf, zf;
Wf = function(e, t) {
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
Uf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, jr(ws.current);
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
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Kl.hasOwnProperty(d) ? (c != null && d === "onScroll" && Dt("scroll", e), o || a === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
zf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Il(e, t) {
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
function Nn(e) {
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
      return Nn(t), null;
    case 1:
      return Wn(t.type) && ci(), Nn(t), null;
    case 3:
      return r = t.stateNode, pl(), Pt(Bn), Pt(wn), eu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ao(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, cs !== null && (xc(cs), cs = null))), cc(e, t), Nn(t), null;
    case 5:
      qc(t);
      var l = jr(ro.current);
      if (n = t.type, e !== null && t.stateNode != null) Uf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(xe(166));
          return Nn(t), null;
        }
        if (e = jr(ws.current), Ao(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[vs] = t, r[no] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Dl.length; l++) Dt(Dl[l], r);
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
              Ru(r, o), Dt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Dt("invalid", r);
              break;
            case "textarea":
              Lu(r, o), Dt("invalid", r);
          }
          Da(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && To(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && To(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Kl.hasOwnProperty(i) && a != null && i === "onScroll" && Dt("scroll", r);
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
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = gh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[vs] = t, e[no] = r, Wf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Pa(n, r), n) {
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
                for (l = 0; l < Dl.length; l++) Dt(Dl[l], e);
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
                Ru(e, r), l = Aa(e, r), Dt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Ht({}, r, { value: void 0 }), Dt("invalid", e);
                break;
              case "textarea":
                Lu(e, r), l = La(e, r), Dt("invalid", e);
                break;
              default:
                l = r;
            }
            Da(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var c = a[o];
              o === "style" ? vh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && xh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Yl(e, c) : typeof c == "number" && Yl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Kl.hasOwnProperty(o) ? c != null && o === "onScroll" && Dt("scroll", e) : c != null && Tc(e, o, c, i));
            }
            switch (n) {
              case "input":
                wo(e), $u(e, r, !1);
                break;
              case "textarea":
                wo(e), Ou(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + cr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? tl(e, !!r.multiple, o, !1) : r.defaultValue != null && tl(
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
      return Nn(t), null;
    case 6:
      if (e && t.stateNode != null) zf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(xe(166));
        if (n = jr(ro.current), jr(ws.current), Ao(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[vs] = t, (o = r.nodeValue !== n) && (e = Kn, e !== null)) switch (e.tag) {
            case 3:
              To(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && To(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[vs] = t, t.stateNode = r;
      }
      return Nn(t), null;
    case 13:
      if (Pt(Ut), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Ft && Vn !== null && t.mode & 1 && !(t.flags & 128)) of(), hl(), t.flags |= 98560, o = !1;
        else if (o = Ao(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(xe(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(xe(317));
            o[vs] = t;
          } else hl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Nn(t), o = !1;
        } else cs !== null && (xc(cs), cs = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ut.current & 1 ? an === 0 && (an = 3) : hu())), t.updateQueue !== null && (t.flags |= 4), Nn(t), null);
    case 4:
      return pl(), cc(e, t), e === null && eo(t.stateNode.containerInfo), Nn(t), null;
    case 10:
      return Xc(t.type._context), Nn(t), null;
    case 17:
      return Wn(t.type) && ci(), Nn(t), null;
    case 19:
      if (Pt(Ut), o = t.memoizedState, o === null) return Nn(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Il(o, !1);
      else {
        if (an !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = gi(e), i !== null) {
            for (t.flags |= 128, Il(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Ot(Ut, Ut.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && qt() > gl && (t.flags |= 128, r = !0, Il(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = gi(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Il(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Ft) return Nn(t), null;
        } else 2 * qt() - o.renderingStartTime > gl && n !== 1073741824 && (t.flags |= 128, r = !0, Il(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = qt(), t.sibling = null, n = Ut.current, Ot(Ut, r ? n & 1 | 2 : n & 1), t) : (Nn(t), null);
    case 22:
    case 23:
      return du(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Hn & 1073741824 && (Nn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Nn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(xe(156, t.tag));
}
function P0(e, t) {
  switch (Vc(t), t.tag) {
    case 1:
      return Wn(t.type) && ci(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return pl(), Pt(Bn), Pt(wn), eu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return qc(t), null;
    case 13:
      if (Pt(Ut), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(xe(340));
        hl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Pt(Ut), null;
    case 4:
      return pl(), null;
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
var Lo = !1, kn = !1, _0 = typeof WeakSet == "function" ? WeakSet : Set, Pe = null;
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
  for (Ga = { focusedElem: e, selectionRange: n }, li = !1, Pe = t; Pe !== null; ) if (t = Pe, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Pe = e;
  else for (; Pe !== null; ) {
    t = Pe;
    try {
      var E = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (E !== null) {
            var b = E.memoizedProps, P = E.memoizedState, v = t.stateNode, p = v.getSnapshotBeforeUpdate(t.elementType === t.type ? b : is(t.type, b), P);
            v.__reactInternalSnapshotBeforeUpdate = p;
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
    } catch (I) {
      Gt(t, t.return, I);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Pe = e;
      break;
    }
    Pe = t.return;
  }
  return E = Cd, Cd = !1, E;
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
  t !== null && (e.alternate = null, Hf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[vs], delete t[no], delete t[Ja], delete t[k0], delete t[w0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
var mn = null, as = !1;
function Hs(e, t, n) {
  for (n = n.child; n !== null; ) Kf(e, t, n), n = n.sibling;
}
function Kf(e, t, n) {
  if (ks && typeof ks.onCommitFiberUnmount == "function") try {
    ks.onCommitFiberUnmount(Si, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      kn || Jr(n, t);
    case 6:
      var r = mn, l = as;
      mn = null, Hs(e, t, n), mn = r, as = l, mn !== null && (as ? (e = mn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : mn.removeChild(n.stateNode));
      break;
    case 18:
      mn !== null && (as ? (e = mn, n = n.stateNode, e.nodeType === 8 ? ca(e.parentNode, n) : e.nodeType === 1 && ca(e, n), Jl(e)) : ca(mn, n.stateNode));
      break;
    case 4:
      r = mn, l = as, mn = n.stateNode.containerInfo, as = !0, Hs(e, t, n), mn = r, as = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!kn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && uc(n, t, i), l = l.next;
        } while (l !== r);
      }
      Hs(e, t, n);
      break;
    case 1:
      if (!kn && (Jr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Gt(n, t, a);
      }
      Hs(e, t, n);
      break;
    case 21:
      Hs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (kn = (r = kn) || n.memoizedState !== null, Hs(e, t, n), kn = r) : Hs(e, t, n);
      break;
    default:
      Hs(e, t, n);
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
function os(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            mn = a.stateNode, as = !1;
            break e;
          case 3:
            mn = a.stateNode.containerInfo, as = !0;
            break e;
          case 4:
            mn = a.stateNode.containerInfo, as = !0;
            break e;
        }
        a = a.return;
      }
      if (mn === null) throw Error(xe(160));
      Kf(o, i, l), mn = null, as = !1;
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
      if (os(t, e), gs(e), r & 4) {
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
      os(t, e), gs(e), r & 512 && n !== null && Jr(n, n.return);
      break;
    case 5:
      if (os(t, e), gs(e), r & 512 && n !== null && Jr(n, n.return), e.flags & 32) {
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
              k != null ? tl(l, !!o.multiple, k, !1) : g !== !!o.multiple && (o.defaultValue != null ? tl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : tl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[no] = o;
        } catch (b) {
          Gt(e, e.return, b);
        }
      }
      break;
    case 6:
      if (os(t, e), gs(e), r & 4) {
        if (e.stateNode === null) throw Error(xe(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (b) {
          Gt(e, e.return, b);
        }
      }
      break;
    case 3:
      if (os(t, e), gs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Jl(t.containerInfo);
      } catch (b) {
        Gt(e, e.return, b);
      }
      break;
    case 4:
      os(t, e), gs(e);
      break;
    case 13:
      os(t, e), gs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (cu = qt())), r & 4 && Sd(e);
      break;
    case 22:
      if (N = n !== null && n.memoizedState !== null, e.mode & 1 ? (kn = (d = kn) || N, os(t, e), kn = d) : os(t, e), gs(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !N && e.mode & 1) for (Pe = e, N = e.child; N !== null; ) {
          for (m = Pe = N; Pe !== null; ) {
            switch (g = Pe, k = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                zl(4, g, g.return);
                break;
              case 1:
                Jr(g, g.return);
                var E = g.stateNode;
                if (typeof E.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, E.props = t.memoizedProps, E.state = t.memoizedState, E.componentWillUnmount();
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
            k !== null ? (k.return = g, Pe = k) : Md(m);
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
      os(t, e), gs(e), r & 4 && Sd(e);
      break;
    case 21:
      break;
    default:
      os(
        t,
        e
      ), gs(e);
  }
}
function gs(e) {
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
        throw Error(xe(160));
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
          throw Error(xe(161));
      }
    } catch (c) {
      Gt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function B0(e, t, n) {
  Pe = e, Gf(e);
}
function Gf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Pe !== null; ) {
    var l = Pe, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Lo;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || kn;
        a = Lo;
        var d = kn;
        if (Lo = i, (kn = c) && !d) for (Pe = l; Pe !== null; ) i = Pe, c = i.child, i.tag === 22 && i.memoizedState !== null ? Id(l) : c !== null ? (c.return = i, Pe = c) : Id(l);
        for (; o !== null; ) Pe = o, Gf(o), o = o.sibling;
        Pe = l, Lo = a, kn = d;
      }
      bd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Pe = o) : bd(e);
  }
}
function bd(e) {
  for (; Pe !== null; ) {
    var t = Pe;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            kn || Li(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !kn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : is(t.type, n.memoizedProps);
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
            throw Error(xe(163));
        }
        kn || t.flags & 512 && dc(t);
      } catch (g) {
        Gt(t, t.return, g);
      }
    }
    if (t === e) {
      Pe = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Pe = n;
      break;
    }
    Pe = t.return;
  }
}
function Md(e) {
  for (; Pe !== null; ) {
    var t = Pe;
    if (t === e) {
      Pe = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Pe = n;
      break;
    }
    Pe = t.return;
  }
}
function Id(e) {
  for (; Pe !== null; ) {
    var t = Pe;
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
      Pe = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, Pe = a;
      break;
    }
    Pe = t.return;
  }
}
var W0 = Math.ceil, vi = Ps.ReactCurrentDispatcher, iu = Ps.ReactCurrentOwner, ss = Ps.ReactCurrentBatchConfig, wt = 0, hn = null, rn = null, gn = 0, Hn = 0, Zr = hr(0), an = 0, ao = null, Tr = 0, Oi = 0, au = 0, Hl = null, _n = null, cu = 0, gl = 1 / 0, Ss = null, Ni = !1, pc = null, or = null, Oo = !1, er = null, ki = 0, Vl = 0, mc = null, Go = -1, Xo = 0;
function Tn() {
  return wt & 6 ? qt() : Go !== -1 ? Go : Go = qt();
}
function ir(e) {
  return e.mode & 1 ? wt & 2 && gn !== 0 ? gn & -gn : C0.transition !== null ? (Xo === 0 && (Xo = Ah()), Xo) : (e = Mt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : _h(e.type)), e) : 1;
}
function hs(e, t, n, r) {
  if (50 < Vl) throw Vl = 0, mc = null, Error(xe(185));
  fo(e, n, r), (!(wt & 2) || e !== hn) && (e === hn && (!(wt & 2) && (Oi |= n), an === 4 && Js(e, gn)), Un(e, r), n === 1 && wt === 0 && !(t.mode & 1) && (gl = qt() + 500, Ai && fr()));
}
function Un(e, t) {
  var n = e.callbackNode;
  Cm(e, t);
  var r = ri(e, e === hn ? gn : 0);
  if (r === 0) n !== null && _u(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && _u(n), t === 1) e.tag === 0 ? j0(Td.bind(null, e)) : sf(Td.bind(null, e)), v0(function() {
      !(wt & 6) && fr();
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
  if (Go = -1, Xo = 0, wt & 6) throw Error(xe(327));
  var n = e.callbackNode;
  if (ol() && e.callbackNode !== n) return null;
  var r = ri(e, e === hn ? gn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = wi(e, r);
  else {
    t = r;
    var l = wt;
    wt |= 2;
    var o = Jf();
    (hn !== e || gn !== t) && (Ss = null, gl = qt() + 500, Er(e, t));
    do
      try {
        H0();
        break;
      } catch (a) {
        Qf(e, a);
      }
    while (!0);
    Gc(), vi.current = o, wt = l, rn !== null ? t = 0 : (hn = null, gn = 0, t = an);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ua(e), l !== 0 && (r = l, t = gc(e, l))), t === 1) throw n = ao, Er(e, 0), Js(e, r), Un(e, qt()), n;
    if (t === 6) Js(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !U0(l) && (t = wi(e, r), t === 2 && (o = Ua(e), o !== 0 && (r = o, t = gc(e, o))), t === 1)) throw n = ao, Er(e, 0), Js(e, r), Un(e, qt()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(xe(345));
        case 2:
          vr(e, _n, Ss);
          break;
        case 3:
          if (Js(e, r), (r & 130023424) === r && (t = cu + 500 - qt(), 10 < t)) {
            if (ri(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Tn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Qa(vr.bind(null, e, _n, Ss), t);
            break;
          }
          vr(e, _n, Ss);
          break;
        case 4:
          if (Js(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - ds(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = qt() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * W0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Qa(vr.bind(null, e, _n, Ss), r);
            break;
          }
          vr(e, _n, Ss);
          break;
        case 5:
          vr(e, _n, Ss);
          break;
        default:
          throw Error(xe(329));
      }
    }
  }
  return Un(e, qt()), e.callbackNode === n ? Xf.bind(null, e) : null;
}
function gc(e, t) {
  var n = Hl;
  return e.current.memoizedState.isDehydrated && (Er(e, t).flags |= 256), e = wi(e, t), e !== 2 && (t = _n, _n = n, t !== null && xc(t)), e;
}
function xc(e) {
  _n === null ? _n = e : _n.push.apply(_n, e);
}
function U0(e) {
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
function Js(e, t) {
  for (t &= ~au, t &= ~Oi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ds(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Td(e) {
  if (wt & 6) throw Error(xe(327));
  ol();
  var t = ri(e, 0);
  if (!(t & 1)) return Un(e, qt()), null;
  var n = wi(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ua(e);
    r !== 0 && (t = r, n = gc(e, r));
  }
  if (n === 1) throw n = ao, Er(e, 0), Js(e, t), Un(e, qt()), n;
  if (n === 6) throw Error(xe(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, vr(e, _n, Ss), Un(e, qt()), null;
}
function uu(e, t) {
  var n = wt;
  wt |= 1;
  try {
    return e(t);
  } finally {
    wt = n, wt === 0 && (gl = qt() + 500, Ai && fr());
  }
}
function Ar(e) {
  er !== null && er.tag === 0 && !(wt & 6) && ol();
  var t = wt;
  wt |= 1;
  var n = ss.transition, r = Mt;
  try {
    if (ss.transition = null, Mt = 1, e) return e();
  } finally {
    Mt = r, ss.transition = n, wt = t, !(wt & 6) && fr();
  }
}
function du() {
  Hn = Zr.current, Pt(Zr);
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
        pl(), Pt(Bn), Pt(wn), eu();
        break;
      case 5:
        qc(r);
        break;
      case 4:
        pl();
        break;
      case 13:
        Pt(Ut);
        break;
      case 19:
        Pt(Ut);
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
  if (hn = e, rn = e = ar(e.current, null), gn = Hn = t, an = 0, ao = null, au = Oi = Tr = 0, _n = Hl = null, wr !== null) {
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
      if (Ir = 0, dn = on = zt = null, Ul = !1, lo = 0, iu.current = null, n === null || n.return === null) {
        an = 1, ao = t, rn = null;
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
            var E = t.updateQueue;
            if (E === null) {
              var b = /* @__PURE__ */ new Set();
              b.add(c), t.updateQueue = b;
            } else E.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              gd(o, d, t), hu();
              break e;
            }
            c = Error(xe(426));
          }
        } else if (Ft && a.mode & 1) {
          var P = xd(i);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256), yd(P, i, a, o, t), Kc(ml(c, a));
            break e;
          }
        }
        o = c = ml(c, a), an !== 4 && (an = 2), Hl === null ? Hl = [o] : Hl.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var v = $f(o, c, t);
              ud(o, v);
              break e;
            case 1:
              a = c;
              var p = o.type, h = o.stateNode;
              if (!(o.flags & 128) && (typeof p.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (or === null || !or.has(h)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var I = Lf(o, a, t);
                ud(o, I);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      qf(n);
    } catch (S) {
      t = S, rn === n && n !== null && (rn = n = n.return);
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
  (an === 0 || an === 3 || an === 2) && (an = 4), hn === null || !(Tr & 268435455) && !(Oi & 268435455) || Js(hn, gn);
}
function wi(e, t) {
  var n = wt;
  wt |= 2;
  var r = Jf();
  (hn !== e || gn !== t) && (Ss = null, Er(e, t));
  do
    try {
      z0();
      break;
    } catch (l) {
      Qf(e, l);
    }
  while (!0);
  if (Gc(), wt = n, vi.current = r, rn !== null) throw Error(xe(261));
  return hn = null, gn = 0, an;
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
        an = 6, rn = null;
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
  an === 0 && (an = 5);
}
function vr(e, t, n) {
  var r = Mt, l = ss.transition;
  try {
    ss.transition = null, Mt = 1, V0(e, t, n, r);
  } finally {
    ss.transition = l, Mt = r;
  }
  return null;
}
function V0(e, t, n, r) {
  do
    ol();
  while (er !== null);
  if (wt & 6) throw Error(xe(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(xe(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Em(e, o), e === hn && (rn = hn = null, gn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Oo || (Oo = !0, np(si, function() {
    return ol(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ss.transition, ss.transition = null;
    var i = Mt;
    Mt = 1;
    var a = wt;
    wt |= 4, iu.current = null, F0(e, n), Yf(n, e), d0(Ga), li = !!Ya, Ga = Ya = null, e.current = n, B0(n), gm(), wt = a, Mt = i, ss.transition = o;
  } else e.current = n;
  if (Oo && (Oo = !1, er = e, ki = l), o = e.pendingLanes, o === 0 && (or = null), vm(n.stateNode), Un(e, qt()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ni) throw Ni = !1, e = pc, pc = null, e;
  return ki & 1 && e.tag !== 0 && ol(), o = e.pendingLanes, o & 1 ? e === mc ? Vl++ : (Vl = 0, mc = e) : Vl = 0, fr(), null;
}
function ol() {
  if (er !== null) {
    var e = Rh(ki), t = ss.transition, n = Mt;
    try {
      if (ss.transition = null, Mt = 16 > e ? 16 : e, er === null) var r = !1;
      else {
        if (e = er, er = null, ki = 0, wt & 6) throw Error(xe(331));
        var l = wt;
        for (wt |= 4, Pe = e.current; Pe !== null; ) {
          var o = Pe, i = o.child;
          if (Pe.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c];
                for (Pe = d; Pe !== null; ) {
                  var N = Pe;
                  switch (N.tag) {
                    case 0:
                    case 11:
                    case 15:
                      zl(8, N, o);
                  }
                  var m = N.child;
                  if (m !== null) m.return = N, Pe = m;
                  else for (; Pe !== null; ) {
                    N = Pe;
                    var g = N.sibling, k = N.return;
                    if (Hf(N), N === d) {
                      Pe = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = k, Pe = g;
                      break;
                    }
                    Pe = k;
                  }
                }
              }
              var E = o.alternate;
              if (E !== null) {
                var b = E.child;
                if (b !== null) {
                  E.child = null;
                  do {
                    var P = b.sibling;
                    b.sibling = null, b = P;
                  } while (b !== null);
                }
              }
              Pe = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, Pe = i;
          else e: for (; Pe !== null; ) {
            if (o = Pe, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                zl(9, o, o.return);
            }
            var v = o.sibling;
            if (v !== null) {
              v.return = o.return, Pe = v;
              break e;
            }
            Pe = o.return;
          }
        }
        var p = e.current;
        for (Pe = p; Pe !== null; ) {
          i = Pe;
          var h = i.child;
          if (i.subtreeFlags & 2064 && h !== null) h.return = i, Pe = h;
          else e: for (i = p; Pe !== null; ) {
            if (a = Pe, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Li(9, a);
              }
            } catch (S) {
              Gt(a, a.return, S);
            }
            if (a === i) {
              Pe = null;
              break e;
            }
            var I = a.sibling;
            if (I !== null) {
              I.return = a.return, Pe = I;
              break e;
            }
            Pe = a.return;
          }
        }
        if (wt = l, fr(), ks && typeof ks.onPostCommitFiberRoot == "function") try {
          ks.onPostCommitFiberRoot(Si, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Mt = n, ss.transition = t;
    }
  }
  return !1;
}
function Ad(e, t, n) {
  t = ml(n, t), t = $f(e, t, 1), e = lr(e, t, 1), t = Tn(), e !== null && (fo(e, 1, t), Un(e, t));
}
function Gt(e, t, n) {
  if (e.tag === 3) Ad(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ad(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (or === null || !or.has(r))) {
        e = ml(n, e), e = Lf(t, e, 1), t = lr(t, e, 1), e = Tn(), t !== null && (fo(t, 1, e), Un(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function K0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Tn(), e.pingedLanes |= e.suspendedLanes & n, hn === e && (gn & n) === n && (an === 4 || an === 3 && (gn & 130023424) === gn && 500 > qt() - cu ? Er(e, 0) : au |= n), Un(e, t);
}
function ep(e, t) {
  t === 0 && (e.mode & 1 ? (t = Eo, Eo <<= 1, !(Eo & 130023424) && (Eo = 4194304)) : t = 1);
  var n = Tn();
  e = Os(e, t), e !== null && (fo(e, t, n), Un(e, n));
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
      throw Error(xe(314));
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
      var l = dl(t, wn.current);
      ll(t, n), l = nu(null, t, r, e, l, n);
      var o = su();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Wn(r) ? (o = !0, ui(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Jc(t), l.updater = $i, t.stateNode = l, l._reactInternals = t, sc(t, r, e, n), t = oc(null, t, r, !0, o, n)) : (t.tag = 0, Ft && o && Hc(t), In(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Yo(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Q0(r), e = is(r, e), l) {
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
            t = Nd(null, t, r, is(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), lc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), kd(e, t, r, l, n);
    case 3:
      e: {
        if (_f(t), e === null) throw Error(xe(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, df(e, t), mi(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = ml(Error(xe(423)), t), t = wd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = ml(Error(xe(424)), t), t = wd(e, t, r, n, l);
          break e;
        } else for (Vn = rr(t.stateNode.containerInfo.firstChild), Kn = t, Ft = !0, cs = null, n = cf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (hl(), r === l) {
            t = Ds(e, t, n);
            break e;
          }
          In(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return hf(t), e === null && ec(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Xa(r, l) ? i = null : o !== null && Xa(r, o) && (t.flags |= 32), Pf(e, t), In(e, t, i, n), t.child;
    case 6:
      return e === null && ec(t), null;
    case 13:
      return Ff(e, t, n);
    case 4:
      return Zc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = fl(t, null, r, n) : In(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), vd(e, t, r, l, n);
    case 7:
      return In(e, t, t.pendingProps, n), t.child;
    case 8:
      return In(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return In(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Ot(fi, r._currentValue), r._currentValue = i, o !== null) if (fs(o.value, i)) {
          if (o.children === l.children && !Bn.current) {
            t = Ds(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            i = o.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = As(-1, n & -n), c.tag = 2;
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
            if (i = o.return, i === null) throw Error(xe(341));
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
        In(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, ll(t, n), l = rs(l), r = r(l), t.flags |= 1, In(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = is(r, t.pendingProps), l = is(r.type, l), Nd(e, t, r, l, n);
    case 15:
      return Of(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), Yo(e, t), t.tag = 1, Wn(r) ? (e = !0, ui(t)) : e = !1, ll(t, n), Rf(t, r, l), sc(t, r, l, n), oc(null, t, r, !0, e, n);
    case 19:
      return Bf(e, t, n);
    case 22:
      return Df(e, t, n);
  }
  throw Error(xe(156, t.tag));
};
function np(e, t) {
  return Mh(e, t);
}
function X0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ns(e, t, n, r) {
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
function ar(e, t) {
  var n = e.alternate;
  return n === null ? (n = ns(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Qo(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") fu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Ur:
      return Sr(n.children, l, o, t);
    case Ac:
      i = 8, l |= 8;
      break;
    case ba:
      return e = ns(12, n, t, l | 2), e.elementType = ba, e.lanes = o, e;
    case Ma:
      return e = ns(13, n, t, l), e.elementType = Ma, e.lanes = o, e;
    case Ia:
      return e = ns(19, n, t, l), e.elementType = Ia, e.lanes = o, e;
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
        case Ks:
          i = 16, r = null;
          break e;
      }
      throw Error(xe(130, e == null ? e : typeof e, ""));
  }
  return t = ns(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Sr(e, t, n, r) {
  return e = ns(7, e, r, t), e.lanes = n, e;
}
function Di(e, t, n, r) {
  return e = ns(22, e, r, t), e.elementType = dh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function xa(e, t, n) {
  return e = ns(6, e, null, t), e.lanes = n, e;
}
function ya(e, t, n) {
  return t = ns(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function J0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Zi(0), this.expirationTimes = Zi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function pu(e, t, n, r, l, o, i, a, c) {
  return e = new J0(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ns(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Jc(o), e;
}
function Z0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Wr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function sp(e) {
  if (!e) return ur;
  e = e._reactInternals;
  e: {
    if ($r(e) !== e || e.tag !== 1) throw Error(xe(170));
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
    if (Wn(n)) return nf(e, n, t);
  }
  return t;
}
function rp(e, t, n, r, l, o, i, a, c) {
  return e = pu(n, r, !0, e, l, o, i, a, c), e.context = sp(null), n = e.current, r = Tn(), l = ir(n), o = As(r, l), o.callback = t ?? null, lr(n, o, l), e.current.lanes = l, fo(e, l, r), Un(e, r), e;
}
function Pi(e, t, n, r) {
  var l = t.current, o = Tn(), i = ir(l);
  return n = sp(n), t.context === null ? t.context = n : t.pendingContext = n, t = As(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = lr(l, t, i), e !== null && (hs(e, l, i, o), Ho(e, l, i)), i;
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
  if (t === null) throw Error(xe(409));
  Pi(e, t, null, null);
};
_i.prototype.unmount = gu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ar(function() {
      Pi(null, e, null, null);
    }), t[Ls] = null;
  }
};
function _i(e) {
  this._internalRoot = e;
}
_i.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Oh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Qs.length && t !== 0 && t < Qs[n].priority; n++) ;
    Qs.splice(n, 0, e), n === 0 && Ph(e);
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
    return e._reactRootContainer = i, e[Ls] = i.current, eo(e.nodeType === 8 ? e.parentNode : e), Ar(), i;
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
  return e._reactRootContainer = c, e[Ls] = c.current, eo(e.nodeType === 8 ? e.parentNode : e), Ar(function() {
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
        var n = Ol(t.pendingLanes);
        n !== 0 && (Dc(t, n | 1), Un(t, qt()), !(wt & 6) && (gl = qt() + 500, fr()));
      }
      break;
    case 13:
      Ar(function() {
        var r = Os(e, 1);
        if (r !== null) {
          var l = Tn();
          hs(r, e, 1, l);
        }
      }), mu(e, 1);
  }
};
Pc = function(e) {
  if (e.tag === 13) {
    var t = Os(e, 134217728);
    if (t !== null) {
      var n = Tn();
      hs(t, e, 134217728, n);
    }
    mu(e, 134217728);
  }
};
Lh = function(e) {
  if (e.tag === 13) {
    var t = ir(e), n = Os(e, t);
    if (n !== null) {
      var r = Tn();
      hs(n, e, t, r);
    }
    mu(e, t);
  }
};
Oh = function() {
  return Mt;
};
Dh = function(e, t) {
  var n = Mt;
  try {
    return Mt = e, t();
  } finally {
    Mt = n;
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
            if (!l) throw Error(xe(90));
            fh(r), Ra(r, l);
          }
        }
      }
      break;
    case "textarea":
      mh(e, n);
      break;
    case "select":
      t = n.value, t != null && tl(e, !!n.multiple, t, !1);
  }
};
wh = uu;
jh = Ar;
var tg = { usingClientEntryPoint: !1, Events: [mo, Kr, Ti, Nh, kh, uu] }, Tl = { findFiberByHostInstance: kr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ng = { bundleType: Tl.bundleType, version: Tl.version, rendererPackageName: Tl.rendererPackageName, rendererConfig: Tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ps.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Sh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tl.findFiberByHostInstance || q0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Do = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Do.isDisabled && Do.supportsFiber) try {
    Si = Do.inject(ng), ks = Do;
  } catch {
  }
}
Gn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tg;
Gn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!xu(t)) throw Error(xe(200));
  return Z0(e, t, null, n);
};
Gn.createRoot = function(e, t) {
  if (!xu(e)) throw Error(xe(299));
  var n = !1, r = "", l = lp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = pu(e, 1, !1, null, null, n, !1, r, l), e[Ls] = t.current, eo(e.nodeType === 8 ? e.parentNode : e), new gu(t);
};
Gn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(xe(188)) : (e = Object.keys(e).join(","), Error(xe(268, e)));
  return e = Sh(t), e = e === null ? null : e.stateNode, e;
};
Gn.flushSync = function(e) {
  return Ar(e);
};
Gn.hydrate = function(e, t, n) {
  if (!Fi(t)) throw Error(xe(200));
  return Bi(null, e, t, !0, n);
};
Gn.hydrateRoot = function(e, t, n) {
  if (!xu(e)) throw Error(xe(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = lp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = rp(t, null, e, 1, n ?? null, l, !1, o, i), e[Ls] = t.current, eo(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new _i(t);
};
Gn.render = function(e, t, n) {
  if (!Fi(t)) throw Error(xe(200));
  return Bi(null, e, t, !1, n);
};
Gn.unmountComponentAtNode = function(e) {
  if (!Fi(e)) throw Error(xe(40));
  return e._reactRootContainer ? (Ar(function() {
    Bi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ls] = null;
    });
  }), !0) : !1;
};
Gn.unstable_batchedUpdates = uu;
Gn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Fi(n)) throw Error(xe(200));
  if (e == null || e._reactInternals === void 0) throw Error(xe(38));
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
var _s = lh.exports, Ld = _s;
qo.createRoot = Ld.createRoot, qo.hydrateRoot = Ld.hydrateRoot;
var ip = { exports: {} }, Wi = {};
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
Wi.Fragment = lg;
Wi.jsx = ap;
Wi.jsxs = ap;
ip.exports = Wi;
var s = ip.exports;
let Zs = [], cp = 120, va = !1;
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
  Array.isArray(e) && (Zs = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Rs(e) {
  for (let t = Zs.length - 1; t >= 0; t--) {
    const n = Zs[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return Zs.length > 0 ? {
    offsetMin: Zs[0].offsetBeforeMin,
    label: Zs[0].labelBefore
  } : { offsetMin: cp, label: "LOCAL" };
}
function up(e, t) {
  return Zs.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Ci(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, i, a] = t.split(":").map(Number);
  for (const c of Zs)
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
  const { offsetMin: t, label: n } = Rs(e), r = e + t * 60 * 1e3, l = new Date(r);
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
  const g = N - cp * 6e4, { offsetMin: k } = Rs(g);
  let E = N - k * 6e4;
  const b = Rs(E);
  return b.offsetMin !== k && (E = N - b.offsetMin * 6e4), E;
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
  onResetStudio: E
}) {
  const [b, P] = u.useState(!1);
  u.useEffect(() => {
    if (!b) return;
    const S = (j) => {
      j.key === "Escape" && P(!1);
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [b]);
  const v = u.useMemo(() => {
    const S = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!S || j <= 0) return "-- ➔ --";
    const y = S + j, x = (G) => String(G).padStart(2, "0"), w = Cr(S, n), M = Cr(y, n), O = `${w.year}-${x(w.month)}-${x(w.day)}`, z = `${x(w.hour)}:${x(w.minute)}:${x(w.second)}`, R = `${M.year}-${x(M.month)}-${x(M.day)}`, W = `${x(M.hour)}:${x(M.minute)}:${x(M.second)}`, ne = n === "UTC" ? " (UTC)" : w.label ? ` (${w.label})` : "", F = O === R ? W : `${R} ${W}`;
    return `${O} ${z} ➔ ${F}${ne}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), p = u.useMemo(() => {
    const S = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (S >= 1440) {
      const j = (S / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${S}m Total)`;
    }
    return `(${S}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), h = () => {
    P(!1), E == null || E();
  }, I = b ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => P(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (S) => S.stopPropagation(), dir: "ltr", children: [
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
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: v }),
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
          onClick: N,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && I && _s.createPortal(I, document.body)
  ] });
}
const Pr = (e) => String(e).padStart(2, "0");
function yt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const g = new Date(e), k = Pr(g.getUTCHours()), E = Pr(g.getUTCMinutes()), b = Pr(g.getUTCSeconds()), P = l ? `${k}:${E}:${b}` : `${k}:${E}`;
    return r ? `${P} UTC` : P;
  }
  const { offsetMin: o, label: i } = Rs(e), a = new Date(e + o * 60 * 1e3), c = Pr(a.getUTCHours()), d = Pr(a.getUTCMinutes()), N = Pr(a.getUTCSeconds()), m = l ? `${c}:${d}:${N}` : `${c}:${d}`;
  return r ? `${m} ${i}` : m;
}
const pg = 600, Dd = 250, qn = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), vc = /* @__PURE__ */ new Set(), Pd = 4;
let il = 0, us = [];
function Nc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Dd) * Dd;
}
function dp() {
  var e;
  if (!(il >= Pd || us.length === 0))
    for (us = us.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); il < Pd && us.length > 0; ) {
      const t = us.pop();
      !t || (e = t.signal) != null && e.aborted || (il++, mg(t));
    }
}
function Jo(e, t, n, r = "mon-0") {
  const l = Nc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
  if (qn.size >= pg) {
    const a = qn.keys().next().value, c = qn.get(a);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), qn.delete(a);
  }
  qn.set(i, n), vc.forEach((a) => a(e, l, n, o));
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
    il = Math.max(0, il - 1), Nr.delete(t), dp();
  }
}
const Mn = {
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
  set: Jo,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    qn.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), qn.clear(), Nr.clear(), us = [], il = 0;
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
    if (qn.has(i))
      return Promise.resolve(this.get(e, l, o));
    if (Nr.has(i))
      return Nr.get(i);
    const a = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      us = us.filter((N) => N.hostname === e && N.displayId === o && N.key !== i ? (Nr.delete(N.key), N.resolve(null), !1) : !0);
      const d = { key: i, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        us = us.filter((N) => N.key !== i), Nr.delete(i), c(null);
      }, { once: !0 }), us.push(d), dp();
    });
    return Nr.set(i, a), a;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Mn.clearAll();
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
function al() {
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
let Gs = null, qr = null, ka = null, Dn = 0, _r = 0, Po = -60, co = 1;
function vg() {
  if (!Gs) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Gs = new e());
  }
  return Gs && Gs.state === "suspended" && Gs.resume().catch(() => {
  }), Gs;
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
  if (co = Math.max(0, Number(e) || 1), qr != null && qr.__audioGainNode && Gs)
    try {
      qr.__audioGainNode.gain.setValueAtTime(co, Gs.currentTime);
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
              onClick: (E) => {
                E.stopPropagation(), n == null || n(d);
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
  activeAudioStationId: E = null,
  directorPlan: b = null,
  isAutoDirectorEnabled: P = !0,
  targetDisplayId: v = "auto",
  onSelectDisplayId: p = null,
  areAllDisplaysPlaced: h = !1,
  hideDisplayStrip: I = !1
}) {
  var X;
  const S = e.hostname || e.name || e.id || "", j = Math.round(t), [y, x] = u.useState(() => !S || !j ? null : Mn.get(S, j) || null), [w, M] = u.useState(""), [O, z] = u.useState(!1), [R, W] = u.useState(!1), [ne, F] = u.useState(!1), G = u.useRef(l), T = u.useRef(null), A = u.useRef(0), D = u.useRef(t - i), H = u.useRef(t - i), _ = u.useRef(!1), ce = u.useRef(null), ee = u.useRef(!1);
  D.current = t - i;
  const ie = (e == null ? void 0 : e.displays) || ((X = e == null ? void 0 : e.topology) == null ? void 0 : X.displays) || [], [ae, Be] = u.useState(null);
  u.useEffect(() => {
    Be(null);
  }, [v]);
  const V = u.useMemo(() => {
    const Q = b || (e == null ? void 0 : e.directorPlan);
    return !Q || !Q.segments || Q.segments.length === 0 ? null : Q.segments.find((fe) => {
      const ge = fe.startEpochMs ?? fe.StartEpochMs ?? 0, we = fe.endEpochMs ?? fe.EndEpochMs ?? 0;
      return t >= ge && t <= we;
    }) || Q.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t]), q = u.useMemo(() => {
    var Q;
    return ae ? ae.toLowerCase() : v && v !== "auto" && v !== "director" ? v.toLowerCase() : ie.length > 1 && P !== !1 && V ? (V.targetDisplayId || V.TargetDisplayId || "mon-0").toLowerCase() : (((Q = ie[0]) == null ? void 0 : Q.displayId) || "mon-0").toLowerCase();
  }, [ae, v, ie, P, V]), de = g[e == null ? void 0 : e.id] || g[S] || (e == null ? void 0 : e.segments) || [], Z = de.length === 0 || de.some((Q) => {
    const fe = Q.startEpochMs ?? Q.startEpoch ?? 0, ge = Q.endEpochMs ?? Q.endEpoch ?? 0;
    return t >= fe && t <= ge;
  }), le = !!(r ? !al().isMuted : E && (e.id === E || S === E)), ye = u.useCallback(() => {
    if (!T.current) return;
    const Q = al();
    if (r)
      T.current.volume = Q.volume, T.current.muted = Q.isMuted, Q.isMuted || Ei(T.current);
    else {
      const fe = !!(E && (e.id === E || S === E));
      T.current.muted = !fe, fe && (T.current.volume = Q.volume, Ei(T.current));
    }
  }, [r, E, e.id, S]);
  u.useEffect(() => {
    ye();
  }, [ye]), u.useEffect(() => {
    const Q = (fe) => {
      T.current && fe.detail && ye();
    };
    return window.addEventListener("itb-audio-state-changed", Q), () => window.removeEventListener("itb-audio-state-changed", Q);
  }, [ye]), u.useEffect(() => {
    T.current && (T.current.defaultPlaybackRate = k, T.current.playbackRate = k);
  }, [k]), u.useEffect(() => {
    if (n || !j || !S) return;
    if (l) {
      G.current = !0;
      return;
    }
    const Q = G.current;
    G.current = l;
    let fe = !0;
    const ge = new AbortController(), we = Mn.get(S, j, q);
    if (we) {
      x(we), W(!1), F(!1);
      return;
    }
    F(!0);
    const se = setTimeout(() => {
      fe && Mn.fetchFrame(S, j, ge.signal, q).then((ke) => {
        fe && (F(!1), ke && ke !== "NO_SIGNAL" ? (x(ke), W(!1)) : ke === "NO_SIGNAL" && W(!0));
      });
    }, Q ? 25 : 40), _e = Mn.subscribe((ke, Me, ze, De) => {
      ke === S && Me === j && (!De || De === q) && fe && (F(!1), ze && ze !== "NO_SIGNAL" ? (x(ze), W(!1)) : ze === "NO_SIGNAL" && W(!0));
    });
    return () => {
      fe = !1, clearTimeout(se), ge.abort(), _e();
    };
  }, [S, j, n, l, r, O, q]), u.useEffect(() => {
    if (!S || !(r || l)) {
      l || (ce.current && clearTimeout(ce.current), _.current = !1, M(""), z(!1), T.current && (T.current.pause(), T.current.removeAttribute("src"), T.current.load()));
      return;
    }
    let fe = null;
    return l && !N && Z ? fe = setTimeout(() => {
      const ge = D.current;
      A.current = ge, H.current = ge, _.current = !1;
      const we = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ge}&displayId=${encodeURIComponent(q)}&_t=${Date.now()}`;
      z(!1), M(we);
    }, 80) : l || (ce.current && clearTimeout(ce.current), _.current = !1, M(""), z(!1), T.current && (T.current.pause(), T.current.removeAttribute("src"), T.current.load())), () => {
      fe && clearTimeout(fe);
    };
  }, [l, r, S, i, a, N, Z, q]), u.useEffect(() => {
    if (!S || !(r || l)) return;
    const fe = D.current, ge = Math.abs(fe - H.current);
    if (!l || ge < 800) {
      H.current = fe;
      return;
    }
    return _.current = !0, H.current = fe, A.current = fe, T.current && T.current.pause(), z(!1), ce.current && clearTimeout(ce.current), ce.current = setTimeout(() => {
      if (!Z || N) {
        M(""), z(!1), _.current = !1;
        return;
      }
      const we = D.current, be = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + we}&displayId=${encodeURIComponent(q)}&_t=${Date.now()}`;
      M(be);
    }, 75), () => {
      ce.current && clearTimeout(ce.current);
    };
  }, [t, l, r, S, i, a, N, Z, q]), u.useEffect(() => {
    if (r || !l || !T.current || !O || _.current) return;
    const Q = (D.current - A.current) / 1e3;
    if (Q >= 0) {
      const fe = T.current, ge = fe.currentTime, we = Math.abs(ge - Q);
      if (we > 0.35 && we < 3)
        try {
          fe.currentTime = Q;
        } catch {
        }
    }
  }, [r, l, t, O]), u.useEffect(() => {
    if (!r || !l || !w || !O || N) return;
    let Q = null, fe = T.current ? T.current.currentTime : 0, ge = performance.now(), we = A.current + Math.round(fe * 1e3);
    const be = () => {
      const se = T.current;
      if (se && !se.paused && !se.ended && !ee.current && !_.current) {
        const _e = performance.now(), ke = se.currentTime;
        Math.abs(ke - fe) > 5e-4 && (fe = ke, ge = _e);
        const Me = Math.max(0, (_e - ge) / 1e3), ze = se.playbackRate || k || 1, De = fe + Me * ze;
        let je = A.current + Math.round(De * 1e3);
        const Qe = je - we;
        if (Qe < 0 && Qe > -300 && (je = we), je >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Ue = i + je, en = m == null ? void 0 : m.find((et) => Ue >= et.startEpochMs && Ue < et.endEpochMs);
        if (en) {
          ee.current = !0;
          const et = en.endEpochMs - i;
          d(et), A.current = et, we = et, H.current = et;
          const Ge = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + et}&_t=${Date.now()}`;
          z(!1), M(Ge), setTimeout(() => {
            ee.current = !1;
          }, 300);
          return;
        }
        je !== we && (we = je, H.current = je, d == null || d(je));
      }
      Q = requestAnimationFrame(be);
    };
    return Q = requestAnimationFrame(be), () => {
      Q && cancelAnimationFrame(Q);
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
    S,
    m,
    d,
    o
  ]);
  const Fe = () => {
    if (ee.current) return;
    const Q = i + D.current, fe = de.map((ge) => ({ start: ge.startEpochMs ?? ge.startEpoch ?? 0, end: ge.endEpochMs ?? ge.endEpoch ?? 0 })).filter((ge) => ge.start > Q + 200).sort((ge, we) => ge.start - we.start)[0];
    if (fe && fe.start - i < c) {
      ee.current = !0;
      const ge = fe.start - i;
      d(ge), A.current = ge;
      const we = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ge}&_t=${Date.now()}`;
      z(!1), M(we), setTimeout(() => {
        ee.current = !1;
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
        ref: T,
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
        muted: !le,
        onLoadedData: () => {
          T.current && (T.current.defaultPlaybackRate = k, T.current.playbackRate = k);
        },
        onCanPlay: () => {
          ye(), T.current && (T.current.defaultPlaybackRate = k, T.current.playbackRate = k), l && T.current && T.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          _.current = !1, z(!0), ye(), T.current && (T.current.defaultPlaybackRate = k, T.current.playbackRate = k);
        },
        onWaiting: () => {
          z(!1);
        },
        onTimeUpdate: () => {
          var Q;
          !O && ((Q = T.current) == null ? void 0 : Q.currentTime) > 0 && (_.current = !1, z(!0));
        },
        onEnded: Fe
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
        children: y && !R ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: y,
            alt: S,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => W(!0)
          }
        ) : (!y || R || !Z) && !w ? /* @__PURE__ */ s.jsx(pp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && Z && !O && !N && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          S
        ] })
      ] })
    ] }) }),
    !I && /* @__PURE__ */ s.jsx(
      kg,
      {
        displays: ie,
        activeDisplayId: q,
        onSelectDisplay: (Q) => {
          Be(Q), p == null || p(Q);
        },
        areAllDisplaysPlaced: h,
        isAutoDirectorEnabled: P
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
  onOpenSpotlight: E,
  onSelectActiveStation: b,
  recordingSegments: P = {},
  playbackSpeed: v = 1,
  activeAudioStationId: p = null,
  onSoloAudio: h,
  directorPlan: I = null,
  isAutoDirectorEnabled: S = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: y = null,
  areAllDisplaysPlaced: x = !1,
  _slotIndex: w = 0,
  borderColor: M = null,
  onSwapWithNext: O = null
}) {
  var T;
  const z = !!(p && (e.id === p || e.hostname && e.hostname === p)), R = (e.hostname || e.name || "").includes("Offline"), W = R ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((T = e == null ? void 0 : e.topology) == null ? void 0 : T.displays) || []).length > 1;
  const F = () => {
    if (t) {
      const A = j && j !== "auto" && j !== "director" ? j : null;
      E && E(e.id, A);
    } else
      b && b(e.id);
  }, G = (A) => {
    A.preventDefault(), A.stopPropagation(), t && b && (a && a(!1), b(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: F,
      onContextMenu: G,
      className: `camera-card ${W} ${t ? "is-solo-card" : ""}`,
      style: M ? { borderColor: M } : void 0,
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
                onClick: (A) => {
                  A.stopPropagation(), O();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            h && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${z ? "audio-active" : ""}`,
                onClick: (A) => {
                  A.stopPropagation(), h(z ? null : e.id);
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
            E && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (A) => {
                  A.stopPropagation();
                  const D = j && j !== "auto" && j !== "director" ? j : null;
                  E(e.id, D);
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
                onClick: (A) => {
                  A.stopPropagation(), t && a && a(!1), b(t ? null : e.id);
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
                onClick: (A) => {
                  A.stopPropagation(), r(e.id);
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
              recordingSegments: P,
              playbackSpeed: v,
              activeAudioStationId: p,
              directorPlan: I,
              isAutoDirectorEnabled: S,
              targetDisplayId: j,
              onSelectDisplayId: y,
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
function Wt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Cg(e) {
  const t = Wt(e, 0, 1);
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
  var b, P, v, p, h, I;
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
    return ((b = l.layout) == null ? void 0 : b.placements) || n;
  const i = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), a = o.transitionType || "smooth", c = o.timestampEpochMs - i;
  if (t < c)
    return ((P = l.layout) == null ? void 0 : P.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((v = o.layout) == null ? void 0 : v.placements) || n;
  if (a === "cut")
    return ((p = l.layout) == null ? void 0 : p.placements) || n;
  const d = (t - c) / i, N = Wt(d, 0, 1), m = a === "linear" ? N : Cg(N), g = ((h = l.layout) == null ? void 0 : h.placements) || [], k = ((I = o.layout) == null ? void 0 : I.placements) || [], E = k.map((S) => {
    const j = g.find((z) => z.stationId === S.stationId && z.displayId === S.displayId);
    if (!j)
      return {
        ...S,
        opacity: Math.max(0.05, m)
      };
    const y = Math.round(j.x + (S.x - j.x) * m), x = Math.round(j.y + (S.y - j.y) * m), w = Math.round(j.width + (S.width - j.width) * m), M = Math.round(j.height + (S.height - j.height) * m), O = Number(((j.rotation || 0) + ((S.rotation || 0) - (j.rotation || 0)) * m).toFixed(1));
    return {
      ...S,
      x: y,
      y: x,
      width: w,
      height: M,
      rotation: O,
      opacity: 1
    };
  });
  return g.forEach((S) => {
    k.some((y) => y.stationId === S.stationId && y.displayId === S.displayId) || E.push({
      ...S,
      opacity: Math.max(0, 1 - m)
    });
  }), E;
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
    const E = {
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
      nextTimeline: { ...e || {}, keyframes: [E] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: E
    };
  }
  const d = c.findIndex((E) => Math.abs(E.timestampEpochMs - n) <= l);
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
  }, m = [...c, N].sort((E, b) => E.timestampEpochMs - b.timestampEpochMs), g = m.findIndex((E) => E.id === N.id);
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
const xs = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], wc = 1920, jc = 1080, pt = [
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
function Xs(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, i = n / r;
  let a, c, d, N;
  return o >= i ? (a = n, c = Math.round(a / o), d = e, N = t + Math.round((r - c) / 2)) : (c = r, a = Math.round(c * o), d = e + Math.round((n - a) / 2), N = t), { x: d, y: N, width: a, height: c };
}
function Fr(e, t = wc, n = jc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: N, y: m, width: g, height: k } = Xs(0, 0, t, n, d);
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
      borderColor: pt[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, N) => {
      const m = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: g, y: k, width: E, height: b } = Xs(N * c, 0, c, n, m);
      return {
        ...d,
        x: g,
        y: k,
        width: E,
        height: b,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: m,
        aspectRatio: m,
        zIndex: N,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[N % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const g = Math.round(t / 3);
      return e.slice(0, 3).map((k, E) => {
        const b = k.nativeAspectRatio || (k.sourceWidth && k.sourceHeight ? k.sourceWidth / k.sourceHeight : 1.7777777777777777), { x: P, y: v, width: p, height: h } = Xs(E * g, 0, g, n, b);
        return {
          ...k,
          x: P,
          y: v,
          width: p,
          height: h,
          sourceWidth: k.sourceWidth || 1920,
          sourceHeight: k.sourceHeight || 1080,
          nativeAspectRatio: b,
          aspectRatio: b,
          zIndex: E,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[E % pt.length],
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
      const E = g.nativeAspectRatio || (g.sourceWidth && g.sourceHeight ? g.sourceWidth / g.sourceHeight : 1.7777777777777777), { cx: b, cy: P } = m[k], { x: v, y: p, width: h, height: I } = Xs(b, P, d, N, E);
      return {
        ...g,
        x: v,
        y: p,
        width: h,
        height: I,
        sourceWidth: g.sourceWidth || 1920,
        sourceHeight: g.sourceHeight || 1080,
        nativeAspectRatio: E,
        aspectRatio: E,
        zIndex: k,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[k % pt.length],
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
      const k = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: E, cy: b } = N[g], { x: P, y: v, width: p, height: h } = Xs(E, b, c, d, k);
      return {
        ...m,
        x: P,
        y: v,
        width: p,
        height: h,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: k,
        aspectRatio: k,
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
    const N = d % l, m = Math.floor(d / l), g = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: k, y: E, width: b, height: P } = Xs(N * i, m * a, i, a, g);
    return {
      ...c,
      x: k,
      y: E,
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
  setIsPlaying: E,
  totalDurationMs: b,
  inPointMs: P = 0,
  outPointMs: v,
  setPlayheadMs: p,
  globalGaps: h = [],
  recordingSegments: I = {},
  playbackSpeed: S = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: y = "BurnIn",
  keystrokes: x = [],
  directorPlan: w = null,
  onOverrideDisplay: M,
  onResetOverride: O,
  compositionLayout: z = "canvas",
  onChangeCompositionLayout: R,
  isAutoDirectorEnabled: W = !0,
  onToggleAutoDirector: ne,
  onUpdateCanvasLayout: F,
  canvasLayoutTimeline: G = null,
  onUpdateCanvasLayoutTimeline: T,
  activeKfIndex: A = 0,
  setActiveKfIndex: D,
  isModalOpen: H = !1
}) {
  const _ = m > 0 ? m : d + N, [ce, ee] = u.useState(() => {
    var f;
    return ((f = t[0]) == null ? void 0 : f.id) || null;
  }), [ie, ae] = u.useState(!1), [Be, V] = u.useState(null), [q, de] = u.useState({ index: null, position: null }), [Z, le] = u.useState(!1), [ye, Fe] = u.useState(!1), [X, Q] = u.useState(!1), [fe, ge] = u.useState(!1), [we, be] = u.useState(""), [se, _e] = u.useState(""), ke = u.useRef(null), [Me, ze] = u.useState(() => {
    try {
      const f = localStorage.getItem("itb_canvas_saved_presets");
      return f ? JSON.parse(f) : [];
    } catch {
      return [];
    }
  }), De = (f) => {
    ze(f);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(f));
    } catch {
    }
  }, [je, Qe] = u.useState(!1), [Ue, en] = u.useState(!1);
  u.useRef(null);
  const et = u.useRef(null), Ge = u.useRef(null), ln = u.useRef(null), [Rt, fn] = u.useState({ width: 960, height: 540 }), [He, vt] = u.useState(0), [jn, gt] = u.useState(!1);
  u.useEffect(() => {
    const f = (C) => {
      C.key === "Escape" && gt(!1);
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, []);
  const [Nt, Cn] = u.useState(!1), [kt, Tt] = u.useState(!1), [Bt, Xt] = u.useState(!1), [cn, $n] = u.useState(!1), [Ee, Se] = u.useState(!1), [re, We] = u.useState({ vertical: null, horizontal: null }), [Ke, K] = u.useState(!0), [ue, ve] = u.useState(!0), [Ce, Xe] = u.useState(null), [Je, dt] = u.useState({ x: 0, y: 0, isInside: !1 }), Ze = u.useRef(null), Ye = u.useRef(null), at = u.useRef(!1), [jt, ct] = u.useState("auto-grid"), $t = u.useRef([]), un = u.useRef([]), Vt = u.useRef(null), [, ps] = u.useState(0), Qn = u.useRef(null), [_t, js] = u.useState(null), Kt = u.useCallback((f, C = "success", $ = "💾") => {
    Qn.current && clearTimeout(Qn.current), js({ text: f, type: C, icon: $ }), Qn.current = setTimeout(() => {
      js(null), Qn.current = null;
    }, 2200);
  }, []), [Qt, Fs] = u.useState(() => {
    var $, J, Y, B, oe, Ae;
    const f = (Y = (J = ($ = G == null ? void 0 : G.keyframes) == null ? void 0 : $[0]) == null ? void 0 : J.layout) == null ? void 0 : Y.width, C = (Ae = (oe = (B = G == null ? void 0 : G.keyframes) == null ? void 0 : B[0]) == null ? void 0 : oe.layout) == null ? void 0 : Ae.height;
    if (f && C) {
      const pe = xs.find((Ne) => Ne.w === f && Ne.h === C);
      if (pe) return pe.id;
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
  }, []), Cs = u.useMemo(() => xs.find((f) => f.id === Qt) || xs[0], [Qt]), Ie = Cs.w, $e = Cs.h, ms = Cs.ratio, yn = u.useMemo(() => {
    const f = [], C = Ie >= 3e3 ? 200 : 100, $ = C / 2, J = C / 10;
    for (let Y = 0; Y <= Ie; Y += J) {
      const B = Y % C === 0, oe = !B && Y % $ === 0;
      f.push({ val: Y, isMajor: B, isMed: oe });
    }
    return f;
  }, [Ie]), Or = u.useMemo(() => {
    const f = [];
    for (let Y = 0; Y <= $e; Y += 10) {
      const B = Y % 100 === 0, oe = !B && Y % 50 === 0;
      f.push({ val: Y, isMajor: B, isMed: oe });
    }
    return f;
  }, [$e]), xo = u.useCallback((f) => {
    const C = Ze.current || Ge.current;
    if (!C) return;
    const $ = C.getBoundingClientRect(), J = Wt(Math.round((f.clientX - $.left) / $.width * Ie), 0, Ie), Y = Wt(Math.round((f.clientY - $.top) / $.height * $e), 0, $e);
    dt({ x: J, y: Y, isInside: !0 });
  }, [Ie, $e]), Ui = u.useCallback(() => {
    dt((f) => ({ ...f, isInside: !1 }));
  }, []), Bs = u.useCallback(() => {
    const f = ln.current;
    if (!f) return;
    const C = f.getBoundingClientRect(), $ = Math.max(320, Math.floor(C.width || 960) - 16), J = Math.max(180, Math.floor(C.height || 540) - 16);
    let Y, B;
    tn ? (Y = $, B = Math.round(Y / ms)) : $ / J >= ms ? (B = J, Y = Math.round(B * ms)) : (Y = $, B = Math.round(Y / ms)), fn((oe) => oe.width === Y && oe.height === B ? oe : { width: Y, height: B });
  }, [tn, ms]);
  u.useEffect(() => {
    const f = ln.current;
    if (!f) return;
    Bs();
    let C = null;
    return typeof ResizeObserver < "u" && (C = new ResizeObserver(() => {
      Bs();
    }), C.observe(f)), window.addEventListener("resize", Bs), () => {
      C && C.disconnect(), window.removeEventListener("resize", Bs);
    };
  }, [Bs]);
  const pr = u.useMemo(() => (t && t.length > 0 ? t : n).map((C) => {
    const $ = C.displays && C.displays.length > 0 ? C.displays : C.topology && C.topology.displays && C.topology.displays.length > 0 ? C.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: C.width || 1920, height: C.height || 1080 }], J = $.find((pe) => pe.isPrimary) || $[0], Y = J.width || J.Width || C.width || 1920, B = J.height || J.Height || C.height || 1080, oe = Y && B ? Y / B : 16 / 9, Ae = $.length > 1;
    return {
      stationId: C.id,
      displayId: "auto",
      label: `${C.displayName || C.roleAlias || C.hostname || C.name} - ${Ae ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: C.displayName || C.roleAlias || C.hostname || C.name,
      stationHostname: C.hostname || C.id,
      isPrimary: !0,
      sourceWidth: Y,
      sourceHeight: B,
      nativeAspectRatio: oe,
      aspectRatio: oe,
      width: Y,
      height: B
    };
  }), [t, n]), Jt = u.useMemo(() => {
    const f = n && n.length > 0 ? n : t, C = [];
    return f.forEach(($) => {
      const J = $.displays && $.displays.length > 0 ? $.displays : $.topology && $.topology.displays && $.topology.displays.length > 0 ? $.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: $.width || 1920, height: $.height || 1080 }], Y = J.find((pe) => pe.isPrimary) || J[0], B = Y.width || Y.Width || $.width || 1920, oe = Y.height || Y.Height || $.height || 1080, Ae = B / oe;
      C.push({
        stationId: $.id,
        displayId: "auto",
        label: `${$.displayName || $.roleAlias || $.hostname || $.name} - ${J.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: $.displayName || $.roleAlias || $.hostname || $.name,
        stationHostname: $.hostname || $.id,
        isPrimary: !0,
        sourceWidth: B,
        sourceHeight: oe,
        nativeAspectRatio: Ae,
        aspectRatio: Ae,
        width: B,
        height: oe
      }), J.length > 1 && J.forEach((pe, Ne) => {
        const ut = (pe.displayId || `mon-${Ne}`).toLowerCase(), nt = pe.displayNumber || Ne + 1, st = pe.displayName || `Screen ${nt}`, me = pe.width || pe.Width || $.width || 1920, lt = pe.height || pe.Height || $.height || 1080, St = me / lt;
        C.push({
          stationId: $.id,
          displayId: ut,
          label: `${$.displayName || $.roleAlias || $.hostname || $.name} - ${st}`,
          stationName: $.displayName || $.roleAlias || $.hostname || $.name,
          stationHostname: $.hostname || $.id,
          isPrimary: !!pe.isPrimary,
          sourceWidth: me,
          sourceHeight: lt,
          nativeAspectRatio: St,
          aspectRatio: St,
          width: me,
          height: lt
        });
      });
    }), C;
  }, [n, t]), [nn, Zt] = u.useState(() => {
    var f;
    return ((f = G == null ? void 0 : G.keyframes) == null ? void 0 : f.length) > 0 ? JSON.parse(JSON.stringify(G)) : {
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
    ((f = G == null ? void 0 : G.keyframes) == null ? void 0 : f.length) > 0 && (Zt(JSON.parse(JSON.stringify(G))), G.keyframes.some(($) => {
      var J, Y;
      return ((Y = (J = $.layout) == null ? void 0 : J.placements) == null ? void 0 : Y.length) > 0;
    }) && (at.current = !0, ct("custom")));
  }, [G]);
  const pn = nn.keyframes || [], Nl = u.useMemo(() => Eg(pn, _), [pn, _]), L = Wt(
    A ?? Nl,
    0,
    Math.max(0, pn.length - 1)
  ), te = pn[L] || pn[Nl] || pn[0], U = u.useMemo(() => {
    var f;
    return ((f = te == null ? void 0 : te.layout) == null ? void 0 : f.placements) || [];
  }, [te]), Oe = u.useCallback((f = "Action") => ({
    label: f,
    timeline: JSON.parse(JSON.stringify(nn)),
    aspectId: Qt,
    presetId: jt,
    selectedFeedIndex: He
  }), [nn, Qt, jt, He]), Le = u.useCallback((f = "Action") => {
    const C = Oe(f);
    $t.current.push(C), $t.current.length > 50 && $t.current.shift(), un.current = [], ps(($) => $ + 1);
  }, [Oe]), Te = u.useCallback(() => {
    Vt.current && ($t.current.push(Vt.current), $t.current.length > 50 && $t.current.shift(), un.current = [], Vt.current = null, ps((f) => f + 1));
  }, []), Ve = u.useCallback(() => {
    const f = m > 0 ? m : d + N, C = 500;
    if (f <= d + C) return L;
    const $ = (te == null ? void 0 : te.layout) || {
      width: Ie,
      height: $e,
      backgroundColor: "#070A10",
      fps: 30,
      placements: U
    }, { nextTimeline: J, newIndex: Y, isNew: B } = Fd(nn, f, $, C);
    return B && (Zt(J), T && T(J), D && D(Y), Kt(
      `Keyframe #${Y + 1} created at ${yt(f, g, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), Y;
  }, [m, d, N, L, te, Ie, $e, U, nn, T, D, g, Kt]), he = u.useCallback((f, C = null) => {
    C && Le(C);
    const $ = m > 0 ? m : d + N;
    Zt((J) => {
      const { nextTimeline: Y, newIndex: B, isNewKeyframe: oe } = bg({
        prevTimeline: J,
        newPlacements: f,
        currentEpochMs: $,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Ie,
        virtualH: $e,
        fps: 30
      });
      return T && T(Y), D && D(B), oe && B > 0 && Kt(
        `Keyframe #${B + 1} created at ${yt($, g, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), Y;
    });
  }, [m, d, N, Ie, $e, T, D, g, Kt, Le]);
  u.useEffect(() => {
    if (pr.length > 0 && (!U || U.length === 0) && !at.current) {
      let f = Qt;
      pr.length === 2 && Qt === "16:9" && (f = "32:9", Fs("32:9"));
      const C = xs.find((J) => J.id === f) || xs[0], $ = Fr(pr, C.w, C.h);
      $.length > 0 && (he($), ct("auto-grid"));
    }
  }, [pr, U, he, Qt]), u.useEffect(() => {
    F && F({
      width: Ie,
      height: $e,
      backgroundColor: "#070A10",
      fps: 30,
      placements: U,
      timeline: nn
    });
  }, [U, nn, F, Ie, $e]);
  const tt = u.useCallback((f) => {
    const C = Cs, $ = xs.find((J) => J.id === f) || xs[0];
    if (C.id !== $.id)
      if (Fs($.id), at.current) {
        const J = $.w / C.w, Y = $.h / C.h, B = U.map((oe) => ({
          ...oe,
          x: Math.round(oe.x * J),
          y: Math.round(oe.y * Y),
          width: Math.round(oe.width * J),
          height: Math.round(oe.height * Y)
        }));
        he(B);
      } else {
        const J = Fr(U && U.length > 0 ? U : Jt, $.w, $.h);
        he(J);
      }
  }, [Cs, U, Jt, he]), rt = u.useCallback((f) => {
    const C = U.length > 0 ? Math.max(...U.map((pe) => pe.zIndex || 0)) + 1 : 0, $ = pt[U.length % pt.length], J = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9), Y = J >= 1 ? 640 : Math.round(360 * J), B = J >= 1 ? Math.round(640 / J) : 360, oe = {
      stationId: f.stationId,
      displayId: f.displayId,
      label: f.label,
      x: 100 + U.length * 40 % 800,
      y: 80 + U.length * 40 % 500,
      width: Y,
      height: B,
      sourceWidth: f.sourceWidth || 1920,
      sourceHeight: f.sourceHeight || 1080,
      nativeAspectRatio: J,
      aspectRatio: J,
      zIndex: C,
      rotation: 0,
      borderWidth: 2,
      borderColor: $,
      shadowEffect: "deep",
      borderRadius: 0
    }, Ae = [...U, oe];
    he(Ae), vt(Ae.length - 1);
  }, [U, he]), xt = u.useCallback((f) => {
    const C = U.filter(($, J) => J !== f);
    he(C), vt(($) => Math.max(0, $ - 1));
  }, [U, he]), It = u.useCallback(() => {
    he([]), vt(-1);
  }, [he]), Ct = (f) => {
    const C = f.map((J, Y) => ({ p: J, origIdx: Y }));
    C.sort((J, Y) => (J.p.zIndex ?? J.origIdx) - (Y.p.zIndex ?? Y.origIdx));
    const $ = [...f];
    return C.forEach(({ origIdx: J }, Y) => {
      $[J] = { ...$[J], zIndex: Y + 1 };
    }), $;
  }, sn = u.useCallback((f = He) => {
    if (f < 0 || !U[f]) return;
    const C = Ct(U), $ = C[f].zIndex, J = C.length;
    if ($ >= J) return;
    const Y = C.map((B, oe) => oe === f ? { ...B, zIndex: J } : B.zIndex > $ ? { ...B, zIndex: B.zIndex - 1 } : B);
    he(Y);
  }, [He, U, he]), Es = u.useCallback((f = He) => {
    if (f < 0 || !U[f]) return;
    const C = Ct(U), $ = C[f].zIndex;
    if ($ <= 1) return;
    const J = C.map((Y, B) => B === f ? { ...Y, zIndex: 1 } : Y.zIndex < $ ? { ...Y, zIndex: Y.zIndex + 1 } : Y);
    he(J);
  }, [He, U, he]), Yt = u.useCallback((f = He) => {
    if (f < 0 || !U[f]) return;
    const C = Ct(U), $ = C[f].zIndex, J = $ + 1;
    if (J > C.length) return;
    const Y = C.map((B, oe) => oe === f ? { ...B, zIndex: J } : B.zIndex === J ? { ...B, zIndex: $ } : B);
    he(Y);
  }, [He, U, he]), En = u.useCallback((f = He) => {
    if (f < 0 || !U[f]) return;
    const C = Ct(U), $ = C[f].zIndex, J = $ - 1;
    if (J < 1) return;
    const Y = C.map((B, oe) => oe === f ? { ...B, zIndex: J } : B.zIndex === J ? { ...B, zIndex: $ } : B);
    he(Y);
  }, [He, U, he]), On = u.useCallback((f) => {
    if (He < 0 || !U[He]) return;
    const C = U.map(($, J) => J === He ? { ...$, ...f } : $);
    he(C);
  }, [He, U, he]), zi = u.useCallback((f = 90) => {
    const C = U[He];
    if (!C) return;
    const J = ((C.rotation || 0) + f) % 360;
    On({ rotation: J });
  }, [He, U, On]), kl = u.useCallback((f = He) => {
    if (f < 0 || !U[f]) return;
    const C = U.length, $ = U.map((J, Y) => Y === f ? {
      ...J,
      x: 0,
      y: 0,
      width: Ie,
      height: $e,
      zIndex: C
    } : J);
    he($);
  }, [He, U, he, Ie, $e]), Jn = u.useCallback((f) => {
    let C = [];
    const $ = Jt.length > 0 ? Jt : U;
    switch (f) {
      case "auto":
      case "auto-grid":
        C = Fr($, Ie, $e);
        break;
      case "1x1":
        $.length > 0 && (C = [{
          ...$[0],
          x: 0,
          y: 0,
          width: Ie,
          height: $e,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: pt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if ($.length >= 2) {
          const J = Math.round(Ie / 2);
          C = $.slice(0, 2).map((Y, B) => {
            const oe = Y.nativeAspectRatio || (Y.sourceWidth && Y.sourceHeight ? Y.sourceWidth / Y.sourceHeight : 1.7777777777777777), { x: Ae, y: pe, width: Ne, height: ut } = Xs(B * J, 0, J, $e, oe);
            return {
              ...Y,
              x: Ae,
              y: pe,
              width: Ne,
              height: ut,
              sourceWidth: Y.sourceWidth || 1920,
              sourceHeight: Y.sourceHeight || 1080,
              nativeAspectRatio: oe,
              aspectRatio: oe,
              zIndex: B + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: pt[B % pt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          C = Fr($, Ie, $e);
        break;
      case "2x2": {
        const J = Math.round(Ie / 2), Y = Math.round($e / 2);
        C = $.slice(0, 4).map((B, oe) => ({
          ...B,
          x: oe % 2 * J,
          y: Math.floor(oe / 2) * Y,
          width: J,
          height: Y,
          zIndex: oe,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[oe % pt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if ($.length >= 2) {
          C = [
            { ...$[0], x: 0, y: 0, width: Ie, height: $e, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: pt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const J = $.slice(1, 4), Y = Math.round(Ie * 0.23), B = Math.round(Y / (16 / 9));
          J.forEach((oe, Ae) => {
            C.push({
              ...oe,
              x: Ie - Y - 24,
              y: 24 + Ae * (B + 16),
              width: Y,
              height: B,
              zIndex: 10 + Ae,
              rotation: 0,
              borderWidth: 3,
              borderColor: pt[(Ae + 1) % pt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if ($.length >= 3) {
          const J = Math.round(Ie * 0.666), Y = Ie - J, B = Math.round($e / 2);
          C = [
            { ...$[0], x: 0, y: 0, width: J, height: $e, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...$[1], x: J, y: 0, width: Y, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...$[2], x: J, y: B, width: Y, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if ($.length >= 3)
          if (Ie / $e >= 2.5) {
            const Y = Math.round(Ie / 3);
            C = $.slice(0, 3).map((B, oe) => {
              const Ae = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 1.7777777777777777), { x: pe, y: Ne, width: ut, height: nt } = Xs(oe * Y, 0, Y, $e, Ae);
              return {
                ...B,
                x: pe,
                y: Ne,
                width: ut,
                height: nt,
                sourceWidth: B.sourceWidth || 1920,
                sourceHeight: B.sourceHeight || 1080,
                nativeAspectRatio: Ae,
                aspectRatio: Ae,
                zIndex: oe,
                rotation: 0,
                borderWidth: 2,
                borderColor: pt[oe % pt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const Y = Math.round(Ie / 2), B = Math.round($e / 2);
            C = [
              { ...$[0], x: 0, y: 0, width: Y, height: B, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...$[1], x: Y, y: 0, width: Y, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...$[2], x: Math.round(Y / 2), y: B, width: Y, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    C.length > 0 && (he(C), vt(0), f === "auto" || f === "auto-grid" ? ct("auto-grid") : (ct(f), at.current = !0));
  }, [Jt, U, he, Ie, $e]), vu = u.useCallback(() => {
    const f = we.trim() || `Custom Layout ${Me.length + 1}`, $ = [{
      id: `preset-${Date.now()}`,
      name: f,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(U)),
      keyframes: JSON.parse(JSON.stringify(pn))
    }, ...Me];
    De($), be(""), le(!1);
  }, [we, Me, U, pn]), Ep = u.useCallback((f) => {
    !f || !f.placements || (he(f.placements), vt(0), ct("custom"), at.current = !0, Fe(!1));
  }, [he]), Sp = u.useCallback((f, C) => {
    C == null || C.stopPropagation();
    const $ = Me.filter((J) => J.id !== f);
    De($);
  }, [Me]), bp = u.useCallback(() => {
    const f = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Ie,
      height: $e,
      aspectRatio: Qt,
      placements: U,
      timeline: nn
    }, C = JSON.stringify(f, null, 2), $ = new window.Blob([C], { type: "application/json" }), J = window.URL.createObjectURL($), Y = document.createElement("a"), B = /* @__PURE__ */ new Date(), oe = (pe) => String(pe).padStart(2, "0"), Ae = `${B.getFullYear()}${oe(B.getMonth() + 1)}${oe(B.getDate())}_${oe(B.getHours())}${oe(B.getMinutes())}${oe(B.getSeconds())}`;
    Y.href = J, Y.download = `canvas_layout_${Ae}.json`, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), window.URL.revokeObjectURL(J);
  }, [U, nn, Ie, $e, Qt]), Mp = u.useCallback((f) => {
    var J;
    const C = (J = f.target.files) == null ? void 0 : J[0];
    if (!C) return;
    const $ = new window.FileReader();
    $.onload = (Y) => {
      var B, oe, Ae;
      try {
        const pe = JSON.parse(Y.target.result);
        if (pe.width && pe.height) {
          const ut = xs.find((nt) => nt.w === pe.width && nt.h === pe.height);
          ut && Fs(ut.id);
        } else if (pe.aspectRatio) {
          const ut = xs.find((nt) => nt.id === pe.aspectRatio);
          ut && Fs(ut.id);
        }
        let Ne = null;
        Array.isArray(pe) ? Ne = pe : pe.placements && Array.isArray(pe.placements) ? Ne = pe.placements : (B = pe.layout) != null && B.placements && Array.isArray(pe.layout.placements) && (Ne = pe.layout.placements), Ne && Ne.length > 0 && (he(Ne), vt(0), ct("custom"), at.current = !0), ((Ae = (oe = pe.timeline) == null ? void 0 : oe.keyframes) == null ? void 0 : Ae.length) > 0 && (Zt(pe.timeline), T && T(pe.timeline));
      } catch (pe) {
        console.error("Failed to parse imported canvas JSON:", pe), alert(`Canvas Import Error: ${pe.message}`);
      }
    }, $.readAsText(C), f.target.value = "";
  }, [he, T]), Hi = (f, C) => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), vt(C), at.current = !0, ct("custom");
    const $ = Ve(), J = Ze.current || Ge.current;
    if (!J) return;
    const Y = J.getBoundingClientRect(), B = U[C];
    if (!B) return;
    Vt.current = Oe("Move Feed"), Ye.current = {
      mode: "drag",
      index: C,
      startX: f.clientX,
      startY: f.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      scaleX: Ie / Y.width,
      scaleY: $e / Y.height,
      activeSnapZone: null
    }, $n(!0);
    const oe = (pe) => {
      if (!Ye.current || Ye.current.mode !== "drag") return;
      const Ne = Ye.current, ut = Ze.current || Ge.current;
      if (!ut) return;
      const nt = ut.getBoundingClientRect(), st = (pe.clientX - Ne.startX) * Ne.scaleX, me = (pe.clientY - Ne.startY) * Ne.scaleY;
      let lt = Math.round(Ne.initialX + st), St = Math.round(Ne.initialY + me);
      lt = Wt(lt, 0, Ie - Ne.initialW), St = Wt(St, 0, $e - Ne.initialH);
      const ot = ue && !pe.altKey;
      let ft = null, Sn = null, zn = null;
      if (ot) {
        const At = pe.clientX - nt.left, Et = pe.clientY - nt.top, bt = 32, Re = Math.round(Ie / 2), ht = Math.round($e / 2);
        if (At <= bt ? Et <= nt.height * 0.22 ? ft = { x: 0, y: 0, width: Re, height: ht, label: "◰ Top-Left Quarter" } : Et >= nt.height * 0.78 ? ft = { x: 0, y: ht, width: Re, height: ht, label: "◱ Bottom-Left Quarter" } : ft = { x: 0, y: 0, width: Re, height: $e, label: "◧ Left Half (50%)" } : At >= nt.width - bt ? Et <= nt.height * 0.22 ? ft = { x: Re, y: 0, width: Re, height: ht, label: "◲ Top-Right Quarter" } : Et >= nt.height * 0.78 ? ft = { x: Re, y: ht, width: Re, height: ht, label: "◳ Bottom-Right Quarter" } : ft = { x: Re, y: 0, width: Re, height: $e, label: "◨ Right Half (50%)" } : Et <= bt && At >= nt.width * 0.25 && At <= nt.width * 0.75 && (ft = { x: 0, y: 0, width: Ie, height: $e, label: "🗖 Full Canvas Maximize" }), !ft) {
          const mr = U.filter((qe, gr) => gr !== Ne.index), zs = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Ie, targetX: Ie - Ne.initialW, guide: 100 },
            { snapTo: Re, targetX: Re - Math.round(Ne.initialW / 2), guide: 50 }
          ];
          mr.forEach((qe) => {
            zs.push({ snapTo: qe.x, targetX: qe.x, guide: qe.x / Ie * 100 }), zs.push({ snapTo: qe.x + qe.width, targetX: qe.x + qe.width - Ne.initialW, guide: (qe.x + qe.width) / Ie * 100 }), zs.push({ snapTo: qe.x + qe.width, targetX: qe.x + qe.width, guide: (qe.x + qe.width) / Ie * 100 }), zs.push({ snapTo: qe.x, targetX: qe.x - Ne.initialW, guide: qe.x / Ie * 100 });
          });
          let Cu = 18;
          zs.forEach((qe) => {
            const gr = Math.abs(lt - qe.targetX);
            gr < Cu && (Cu = gr, lt = qe.targetX, Sn = qe.guide);
          });
          const wl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: $e, targetY: $e - Ne.initialH, guide: 100 },
            { snapTo: ht, targetY: ht - Math.round(Ne.initialH / 2), guide: 50 }
          ];
          mr.forEach((qe) => {
            wl.push({ snapTo: qe.y, targetY: qe.y, guide: qe.y / $e * 100 }), wl.push({ snapTo: qe.y + qe.height, targetY: qe.y + qe.height - Ne.initialH, guide: (qe.y + qe.height) / $e * 100 }), wl.push({ snapTo: qe.y + qe.height, targetY: qe.y + qe.height, guide: (qe.y + qe.height) / $e * 100 }), wl.push({ snapTo: qe.y, targetY: qe.y - Ne.initialH, guide: qe.y / $e * 100 });
          });
          let Eu = 18;
          wl.forEach((qe) => {
            const gr = Math.abs(St - qe.targetY);
            gr < Eu && (Eu = gr, St = qe.targetY, zn = qe.guide);
          });
        }
      }
      Ne.activeSnapZone = ft, Ne.latestX = lt, Ne.latestY = St, Xe(ft), We({ vertical: Sn, horizontal: zn }), Zt((At) => {
        const Et = [...At.keyframes || []], bt = $ < Et.length ? $ : L;
        if (!Et[bt]) return At;
        const Re = [...Et[bt].layout.placements || []];
        return Re[Ne.index] ? (Re[Ne.index] = { ...Re[Ne.index], x: lt, y: St }, Et[bt] = {
          ...Et[bt],
          layout: { ...Et[bt].layout, placements: Re }
        }, { ...At, keyframes: Et }) : At;
      });
    }, Ae = () => {
      var pe;
      if ($n(!1), We({ vertical: null, horizontal: null }), (pe = Ye.current) != null && pe.activeSnapZone) {
        const Ne = Ye.current.activeSnapZone, ut = Ye.current.index;
        Zt((nt) => {
          const st = [...nt.keyframes || []], me = $ < st.length ? $ : L;
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
        st !== ut || me !== nt ? (Te(), T && Zt((lt) => (T(lt), lt))) : Vt.current = null;
      }
      Xe(null), Ye.current = null, window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", Ae);
    };
    window.addEventListener("mousemove", oe), window.addEventListener("mouseup", Ae);
  }, yo = (f, C, $ = "br") => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), vt(C), at.current = !0, ct("custom");
    const J = Ve();
    if (!Ge.current) return;
    const Y = Ge.current.getBoundingClientRect(), B = U[C];
    if (!B) return;
    Vt.current = Oe("Resize Feed");
    const oe = Jt.find((st) => st.stationId === B.stationId && st.displayId === B.displayId), Ae = B.sourceWidth || (oe == null ? void 0 : oe.sourceWidth) || 1920, pe = B.sourceHeight || (oe == null ? void 0 : oe.sourceHeight) || 1080, Ne = B.nativeAspectRatio || B.aspectRatio || (oe == null ? void 0 : oe.nativeAspectRatio) || Ae / pe || B.width / B.height || 16 / 9;
    Ye.current = {
      mode: "resize",
      corner: $,
      index: C,
      startX: f.clientX,
      startY: f.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      sourceWidth: Ae,
      sourceHeight: pe,
      nativeAspectRatio: Ne,
      scaleX: Ie / Y.width,
      scaleY: $e / Y.height
    }, Se(!0);
    const ut = (st) => {
      if (!Ye.current || Ye.current.mode !== "resize") return;
      const me = Ye.current, lt = (st.clientX - me.startX) * me.scaleX, St = (st.clientY - me.startY) * me.scaleY, ot = st.ctrlKey || st.shiftKey || st.metaKey, ft = me.nativeAspectRatio > 0 ? me.nativeAspectRatio : me.initialW / me.initialH;
      let Sn = me.initialX, zn = me.initialY, At = me.initialW, Et = me.initialH;
      if (me.corner === "br") {
        const bt = Ie - me.initialX, Re = $e - me.initialY;
        if (ot) {
          let ht = Math.max(160, Math.min(bt, Math.round(me.initialW + lt))), it = Math.round(ht / ft);
          it > Re && (it = Re, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Et = it;
        } else
          At = Wt(Math.round(me.initialW + lt), 160, bt), Et = Wt(Math.round(me.initialH + St), 90, Re);
      } else if (me.corner === "bl") {
        const bt = me.initialX + me.initialW, Re = $e - me.initialY;
        if (ot) {
          let ht = Math.max(160, Math.min(bt, Math.round(me.initialW - lt))), it = Math.round(ht / ft);
          it > Re && (it = Re, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Et = it, Sn = me.initialX + me.initialW - At;
        } else
          At = Wt(Math.round(me.initialW - lt), 160, bt), Et = Wt(Math.round(me.initialH + St), 90, Re), Sn = me.initialX + me.initialW - At;
      } else if (me.corner === "tr") {
        const bt = Ie - me.initialX, Re = me.initialY + me.initialH;
        if (ot) {
          let ht = Math.max(160, Math.min(bt, Math.round(me.initialW + lt))), it = Math.round(ht / ft);
          it > Re && (it = Re, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Et = it, zn = me.initialY + me.initialH - Et;
        } else
          At = Wt(Math.round(me.initialW + lt), 160, bt), Et = Wt(Math.round(me.initialH - St), 90, Re), zn = me.initialY + me.initialH - Et;
      } else if (me.corner === "tl") {
        const bt = me.initialX + me.initialW, Re = me.initialY + me.initialH;
        if (ot) {
          let ht = Math.max(160, Math.min(bt, Math.round(me.initialW - lt))), it = Math.round(ht / ft);
          it > Re && (it = Re, ht = Math.round(it * ft)), it < 90 && (it = 90, ht = Math.round(it * ft)), At = ht, Et = it, Sn = me.initialX + me.initialW - At, zn = me.initialY + me.initialH - Et;
        } else
          At = Wt(Math.round(me.initialW - lt), 160, bt), Et = Wt(Math.round(me.initialH - St), 90, Re), Sn = me.initialX + me.initialW - At, zn = me.initialY + me.initialH - Et;
      }
      Zt((bt) => {
        const Re = [...bt.keyframes || []], ht = J < Re.length ? J : L;
        if (!Re[ht]) return bt;
        const it = [...Re[ht].layout.placements || []];
        return it[me.index] ? (it[me.index] = {
          ...it[me.index],
          x: Sn,
          y: zn,
          width: At,
          height: Et,
          sourceWidth: me.sourceWidth,
          sourceHeight: me.sourceHeight,
          nativeAspectRatio: me.nativeAspectRatio,
          aspectRatio: me.nativeAspectRatio
        }, Re[ht] = {
          ...Re[ht],
          layout: { ...Re[ht].layout, placements: it }
        }, { ...bt, keyframes: Re }) : bt;
      });
    }, nt = () => {
      if (Ye.current) {
        const st = Ye.current, me = st.latestW ?? st.initialW, lt = st.latestH ?? st.initialH;
        me !== st.initialW || lt !== st.initialH ? (Te(), T && Zt((St) => (T(St), St))) : Vt.current = null;
      }
      Se(!1), Ye.current = null, window.removeEventListener("mousemove", ut), window.removeEventListener("mouseup", nt);
    };
    window.addEventListener("mousemove", ut), window.addEventListener("mouseup", nt);
  }, Ip = u.useCallback((f) => {
    const C = U[f];
    if (!C) return;
    const $ = Jt.find((Ae) => Ae.stationId === C.stationId && Ae.displayId === C.displayId), J = C.nativeAspectRatio || C.aspectRatio || ($ == null ? void 0 : $.nativeAspectRatio) || (C.sourceWidth && C.sourceHeight ? C.sourceWidth / C.sourceHeight : 16 / 9);
    let Y = C.width, B = Math.round(Y / J);
    C.y + B > $e && (B = $e - C.y, Y = Math.round(B * J)), C.x + Y > Ie && (Y = Ie - C.x, B = Math.round(Y / J));
    const oe = U.map((Ae, pe) => pe === f ? {
      ...Ae,
      width: Math.max(160, Y),
      height: Math.max(90, B),
      sourceWidth: C.sourceWidth || ($ == null ? void 0 : $.sourceWidth) || 1920,
      sourceHeight: C.sourceHeight || ($ == null ? void 0 : $.sourceHeight) || 1080,
      nativeAspectRatio: J,
      aspectRatio: J
    } : Ae);
    he(oe, "Snap Native Aspect");
  }, [U, Jt, he]), Vi = u.useCallback(() => {
    if ($t.current.length === 0) return;
    const f = Oe("Redo State");
    un.current.push(f), un.current.length > 50 && un.current.shift();
    const C = $t.current.pop();
    C && (Zt(C.timeline), T && T(C.timeline), C.aspectId && C.aspectId !== Qt && Fs(C.aspectId), C.presetId && ct(C.presetId), C.selectedFeedIndex !== void 0 && vt(C.selectedFeedIndex), at.current = !0, ps(($) => $ + 1), Kt(`Undo: ${C.label || "Previous State"}`, "undo", "↺"));
  }, [Oe, T, Qt, Kt]), Ki = u.useCallback(() => {
    if (un.current.length === 0) return;
    const f = Oe("Undo State");
    $t.current.push(f), $t.current.length > 50 && $t.current.shift();
    const C = un.current.pop();
    C && (Zt(C.timeline), T && T(C.timeline), C.aspectId && C.aspectId !== Qt && Fs(C.aspectId), C.presetId && ct(C.presetId), C.selectedFeedIndex !== void 0 && vt(C.selectedFeedIndex), at.current = !0, ps(($) => $ + 1), Kt(`Redo: ${C.label || "Restored State"}`, "info", "↻"));
  }, [Oe, T, Qt, Kt]), Nu = u.useCallback(() => {
    const C = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(U)),
      keyframes: JSON.parse(JSON.stringify(pn)),
      aspectId: Qt,
      width: Ie,
      height: $e
    }, ...Me.filter(($) => $.id !== "preset-quicksave")];
    De(C);
    try {
      fp({
        canvasLayoutTimeline: nn,
        selectedAspectId: Qt,
        selectedPresetId: jt,
        isFullWidth: tn
      });
    } catch ($) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", $);
    }
    Kt(`State Saved (${Ie}×${$e} • ${U.length} Feeds)`, "success", "💾");
  }, [U, pn, Qt, Ie, $e, Me, De, nn, jt, tn, Kt]);
  u.useEffect(() => {
    const f = () => Vi(), C = () => Ki(), $ = () => Nu();
    return window.addEventListener("itb:studio-undo", f), window.addEventListener("itb:studio-redo", C), window.addEventListener("itb:studio-save-now", $), () => {
      window.removeEventListener("itb:studio-undo", f), window.removeEventListener("itb:studio-redo", C), window.removeEventListener("itb:studio-save-now", $);
    };
  }, [Vi, Ki, Nu]);
  const Tp = u.useCallback(() => {
    Qe((f) => {
      const C = !f;
      if (C) {
        r && r(null);
        const $ = et.current;
        $ && $.requestFullscreen && $.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return C;
    });
  }, [r]), Ap = u.useCallback(() => {
    const f = m > 0 ? m : d + N, { nextTimeline: C, newIndex: $, isNew: J } = Fd(
      nn,
      f,
      (te == null ? void 0 : te.layout) || {
        width: Ie,
        height: $e,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(U))
      }
    );
    J ? (Le("Add Keyframe"), Zt(C), T && T(C), D && D($), Kt(`Keyframe #${$ + 1} created at ${yt(f, g, { includeSeconds: !0 })}`, "success", "💎")) : (D && D($), Kt(`Jumped to existing Keyframe #${$ + 1}`, "info", "💎"));
  }, [m, d, N, te, U, Ie, $e, nn, T, D, g, Kt, Le]);
  u.useCallback(() => {
    if (pn.length <= 1 || L === 0) {
      Kt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Le("Delete Keyframe");
    const { nextTimeline: f, success: C, newIndex: $ } = Mg(nn, L);
    C && (Zt(f), T && T(f), D && D($), Kt("Keyframe deleted", "info", "🗑️"));
  }, [pn, L, nn, T, D, Kt, Le]), u.useCallback((f) => {
    L !== 0 && (Le("Update Transition Type"), Zt((C) => {
      const $ = kc(C, L, { transitionType: f });
      return T && T($), $;
    }));
  }, [L, T, Le]), u.useCallback((f) => {
    L !== 0 && (Le("Update Transition Duration"), Zt((C) => {
      const $ = kc(C, L, { transitionDurationSec: f });
      return T && T($), $;
    }));
  }, [L, T, Le]), u.useEffect(() => {
    const f = (C) => {
      if (!(C.target.tagName === "INPUT" || C.target.tagName === "TEXTAREA" || C.target.isContentEditable)) {
        if (C.key === "Delete" || C.key === "Backspace") {
          He >= 0 && U[He] && (C.preventDefault(), xt(He));
          return;
        }
        if ((C.code === "Space" || C.key === " ") && E) {
          C.preventDefault(), E(($) => !$);
          return;
        }
        if ((C.key === "k" || C.key === "K") && !C.ctrlKey && !C.metaKey && !C.altKey) {
          C.preventDefault(), Ap();
          return;
        }
        if (C.key === "Escape") {
          ae(!1), Fe(!1), Tt(!1), Cn(!1), Xt(!1), le(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(C.key)) {
          if (He >= 0 && U[He]) {
            C.preventDefault(), at.current = !0, ct("custom");
            const $ = C.shiftKey ? 1 : 10;
            let J = 0, Y = 0;
            C.key === "ArrowLeft" && (J = -$), C.key === "ArrowRight" && (J = $), C.key === "ArrowUp" && (Y = -$), C.key === "ArrowDown" && (Y = $);
            const B = U[He], oe = Wt(B.x + J, 0, Ie - B.width), Ae = Wt(B.y + Y, 0, $e - B.height), pe = U.map((Ne, ut) => ut === He ? { ...Ne, x: oe, y: Ae } : Ne);
            he(pe);
          }
          return;
        }
        if ((C.key === "r" || C.key === "R") && !C.ctrlKey && !C.metaKey && !C.altKey) {
          C.preventDefault(), K(($) => !$);
          return;
        }
        if ((C.key === "s" || C.key === "S") && !C.ctrlKey && !C.metaKey && !C.altKey) {
          C.preventDefault(), ve(($) => !$);
          return;
        }
      }
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [He, U, xt, he, K, ve]);
  const ku = u.useMemo(() => Sg({
    keyframes: pn,
    currentEpochMs: _,
    currentPlacements: U,
    isEditing: cn || Ee
  }), [cn, Ee, pn, _, U]), Rp = u.useMemo(() => ku.map((f, C) => ({ ...f, originalIndex: C })).sort((f, C) => (f.zIndex ?? f.originalIndex) - (C.zIndex ?? C.originalIndex)), [ku]), Ws = U[He] || null, { filteredPlaced: Us, filteredUnplaced: vo } = u.useMemo(() => {
    const f = (se || "").toLowerCase(), C = U.map((B, oe) => {
      const Ae = B.zIndex ?? oe + 1, pe = Jt.find((Ne) => Ne.stationId === B.stationId && Ne.displayId === B.displayId);
      return {
        type: "placed",
        origIdx: oe,
        placement: B,
        feed: pe,
        stationId: B.stationId,
        displayId: B.displayId,
        label: B.label || (pe == null ? void 0 : pe.label) || `${B.stationId} (${B.displayId})`,
        layerRank: Ae,
        isSelected: oe === He,
        sourceWidth: B.sourceWidth || (pe == null ? void 0 : pe.sourceWidth) || 1920,
        sourceHeight: B.sourceHeight || (pe == null ? void 0 : pe.sourceHeight) || 1080
      };
    });
    C.sort((B, oe) => oe.layerRank - B.layerRank);
    const $ = Jt.filter((B) => !U.some((oe) => oe.stationId === B.stationId && oe.displayId === B.displayId)).map((B) => ({
      type: "unplaced",
      feed: B,
      stationId: B.stationId,
      displayId: B.displayId,
      label: B.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: B.sourceWidth || 1920,
      sourceHeight: B.sourceHeight || 1080
    })), J = f ? C.filter((B) => B.label.toLowerCase().includes(f)) : C, Y = f ? $.filter((B) => B.label.toLowerCase().includes(f)) : $;
    return { filteredPlaced: J, filteredUnplaced: Y };
  }, [U, Jt, He, se]), wu = u.useCallback((f, C) => {
    f.stopPropagation(), V(C), f.dataTransfer.effectAllowed = "copyMove", f.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: C.origIdx,
      type: C.type,
      stationId: C.stationId,
      displayId: C.displayId
    }));
  }, []), $p = u.useCallback((f, C) => {
    f.preventDefault(), f.stopPropagation(), f.dataTransfer.dropEffect = "move";
    const $ = f.currentTarget.getBoundingClientRect(), J = $.top + $.height / 2, Y = f.clientY < J ? "above" : "below";
    de((B) => B.index === C && B.position === Y ? B : { index: C, position: Y });
  }, []), Lp = u.useCallback((f, C) => {
    f.stopPropagation(), de(($) => $.index === C ? { index: null, position: null } : $);
  }, []), ju = u.useCallback(() => {
    V(null), de({ index: null, position: null });
  }, []), Op = u.useCallback((f, C) => {
    f.preventDefault(), f.stopPropagation();
    const $ = q;
    de({ index: null, position: null }), V(null);
    const J = f.dataTransfer.getData("text/plain");
    if (J)
      try {
        const Y = JSON.parse(J);
        if (Y.type === "placed") {
          const B = Y.origIdx, oe = Us.findIndex((st) => st.origIdx === B);
          if (oe === -1) return;
          let Ae = C;
          if ($.position === "below" && (Ae += 1), oe < Ae && (Ae -= 1), oe === Ae) return;
          const pe = [...Us], [Ne] = pe.splice(oe, 1);
          pe.splice(Ae, 0, Ne);
          const ut = pe.length, nt = U.map((st, me) => {
            const lt = pe.findIndex((St) => St.origIdx === me);
            return lt !== -1 ? {
              ...st,
              zIndex: ut - lt
            } : st;
          });
          he(nt), vt(Ne.origIdx);
        } else if (Y.type === "unplaced") {
          const B = Jt.find((ft) => ft.stationId === Y.stationId && ft.displayId === Y.displayId);
          if (!B) return;
          const oe = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 16 / 9), Ae = oe >= 1 ? 640 : Math.round(360 * oe), pe = oe >= 1 ? Math.round(640 / oe) : 360, Ne = pt[U.length % pt.length];
          let ut = C;
          $.position === "below" && (ut += 1);
          const nt = {
            stationId: B.stationId,
            displayId: B.displayId,
            label: B.label,
            x: 100 + U.length * 40 % 800,
            y: 80 + U.length * 40 % 500,
            width: Ae,
            height: pe,
            sourceWidth: B.sourceWidth || 1920,
            sourceHeight: B.sourceHeight || 1080,
            nativeAspectRatio: oe,
            aspectRatio: oe,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: Ne,
            shadowEffect: "deep",
            borderRadius: 0
          }, st = [...U, nt], me = st.length - 1, lt = [...Us];
          lt.splice(ut, 0, { origIdx: me });
          const St = lt.length, ot = st.map((ft, Sn) => {
            const zn = lt.findIndex((At) => At.origIdx === Sn);
            return {
              ...ft,
              zIndex: zn !== -1 ? St - zn : 1
            };
          });
          he(ot), vt(me);
        }
      } catch (Y) {
        console.warn("Failed to handle layer drag drop:", Y);
      }
  }, [q, Us, U, Jt, he]), Dp = u.useCallback((f) => {
    f.preventDefault();
    const C = f.dataTransfer.getData("text/plain");
    if (!(!C || !Ge.current))
      try {
        const $ = JSON.parse(C), J = Ge.current.getBoundingClientRect(), Y = f.clientX - J.left, B = f.clientY - J.top, oe = Wt(Math.round(Y / J.width * Ie), 0, Ie - 320), Ae = Wt(Math.round(B / J.height * $e), 0, $e - 180);
        if ($.type === "unplaced") {
          const pe = Jt.find((Ne) => Ne.stationId === $.stationId && Ne.displayId === $.displayId);
          if (pe) {
            const Ne = pe.nativeAspectRatio || (pe.sourceWidth && pe.sourceHeight ? pe.sourceWidth / pe.sourceHeight : 1.7777777777777777), ut = Ne >= 1 ? 640 : Math.round(360 * Ne), nt = Ne >= 1 ? Math.round(640 / Ne) : 360, st = U.length > 0 ? Math.max(...U.map((ot) => ot.zIndex || 0)) + 1 : 1, me = pt[U.length % pt.length], lt = {
              stationId: pe.stationId,
              displayId: pe.displayId,
              label: pe.label,
              x: Wt(oe, 0, Ie - ut),
              y: Wt(Ae, 0, $e - nt),
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
            }, St = [...U, lt];
            he(St), vt(St.length - 1);
          }
        } else if ($.type === "placed" && $.origIdx !== void 0) {
          const pe = U.map((Ne, ut) => ut === $.origIdx ? {
            ...Ne,
            x: Wt(oe, 0, Ie - Ne.width),
            y: Wt(Ae, 0, $e - Ne.height)
          } : Ne);
          he(pe), vt($.origIdx);
        }
      } catch ($) {
        console.warn("Canvas drop failed:", $);
      }
  }, [Jt, U, he, Ie, $e]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: et,
      className: `multicam-viewport-root canvas-grid ${je ? "fullscreen-grid-active" : ""}`,
      children: [
        (cn || Ee) && /* @__PURE__ */ s.jsx(
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
        /* @__PURE__ */ s.jsxs("div", { className: "canvas-editing-arena", children: [
          /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-wing-tool ${ie ? "active" : ""}`,
                onClick: () => ae((f) => !f),
                title: `Feeds & Layers Palette (${U.length}/${Jt.length} on canvas)`,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: U.length }),
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
                    className: `popout-item ${jt === "auto-grid" ? "active" : ""}`,
                    onClick: () => {
                      ct("auto-grid"), Jn("auto-grid"), Q(!1);
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
                    className: `popout-item ${jt === "1x1" ? "active" : ""}`,
                    onClick: () => {
                      ct("1x1"), Jn("1x1"), Q(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${jt === "1x2" ? "active" : ""}`,
                    onClick: () => {
                      ct("1x2"), Jn("1x2"), Q(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${jt === "2x2" ? "active" : ""}`,
                    onClick: () => {
                      ct("2x2"), Jn("2x2"), Q(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${jt === "1+3-pip" ? "active" : ""}`,
                    onClick: () => {
                      ct("1+3-pip"), Jn("1+3-pip"), Q(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${jt === "hero-stacked" ? "active" : ""}`,
                    onClick: () => {
                      ct("hero-stacked"), Jn("hero-stacked"), Q(!1);
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
                  title: `Aspect Ratio: ${Qt} (Click to change)`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Qt })
                  ]
                }
              ),
              fe && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                xs.map((f) => /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Qt === f.id ? "active" : ""}`,
                    onClick: () => {
                      tt(f.id), ge(!1);
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
                className: `btn-wing-tool ${ue ? "active" : ""}`,
                onClick: () => ve((f) => !f),
                title: ue ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                onClick: () => K((f) => !f),
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
                onClick: Vi,
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
                onClick: Ki,
                disabled: un.current.length === 0,
                title: "Redo (Ctrl+Y)",
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↻" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "REDO" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { ref: ln, className: `canvas-stage-wrapper ${tn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
            ie && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                  /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                  /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                    U.length,
                    " on canvas"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => ae(!1), children: "✕" })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Filter workstations / displays...",
                  value: se,
                  onChange: (f) => _e(f.target.value)
                }
              ) }),
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                Us.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                    /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Us.length })
                  ] }),
                  Us.map((f, C) => {
                    const $ = Be && Be.type === "placed" && Be.origIdx === f.origIdx, Y = q.index === C ? q.position === "above" ? "drop-above" : "drop-below" : "";
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `feed-layer-row ${f.isSelected ? "is-selected" : ""} ${$ ? "is-dragging-row" : ""} ${Y}`,
                        draggable: !0,
                        onDragStart: (B) => wu(B, f),
                        onDragOver: (B) => $p(B, C),
                        onDragLeave: (B) => Lp(B, C),
                        onDrop: (B) => Op(B, C),
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
                          /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (B) => B.stopPropagation(), children: [
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
                                onClick: () => En(f.origIdx),
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
                    const C = Be && Be.type === "unplaced" && Be.stationId === f.stationId && Be.displayId === f.displayId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `feed-layer-row unplaced ${C ? "is-dragging-row" : ""}`,
                        draggable: !0,
                        onDragStart: ($) => wu($, f),
                        onDragEnd: ju,
                        onClick: () => rt(f.feed),
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
                          /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: ($) => $.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-add-row",
                              onClick: () => rt(f.feed),
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
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Jn("auto"), children: "⊞ ADD ALL FEEDS" }),
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: It, children: "🗑️ CLEAR CANVAS" })
              ] })
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
                  aspectRatio: `${Ie} / ${$e}`
                },
                onMouseMove: xo,
                onMouseLeave: Ui,
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
                  Ce && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-ghost-preview",
                      style: {
                        position: "absolute",
                        left: `${Ce.x / Ie * 100}%`,
                        top: `${Ce.y / $e * 100}%`,
                        width: `${Ce.width / Ie * 100}%`,
                        height: `${Ce.height / $e * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: Ce.label })
                      ] })
                    }
                  ),
                  Ke && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Ie}×${$e}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Je.isInside ? `${Je.x},${Je.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${Ie} 20`,
                        preserveAspectRatio: "none",
                        children: [
                          Ws && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: Ws.x,
                              y: "0",
                              width: Ws.width,
                              height: "20",
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          yn.map((f) => f.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
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
                        viewBox: `0 0 20 ${$e}`,
                        preserveAspectRatio: "none",
                        children: [
                          Ws && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: "0",
                              y: Ws.y,
                              width: "20",
                              height: Ws.height,
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
                  U.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                    /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                    /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                    /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => ae(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Jn("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Rp.map((f) => {
                    var bt;
                    const C = f.originalIndex, $ = He === C, J = cn && He === C, Y = Ee && He === C, B = (n.length > 0 ? n : t).find(
                      (Re) => {
                        var ht, it, mr, zs;
                        return Re.id === f.stationId || ((ht = Re.hostname) == null ? void 0 : ht.toLowerCase()) === ((it = f.stationId) == null ? void 0 : it.toLowerCase()) || ((mr = Re.id) == null ? void 0 : mr.toLowerCase()) === ((zs = f.stationId) == null ? void 0 : zs.toLowerCase());
                      }
                    ), oe = Jt.find((Re) => Re.stationId === f.stationId && Re.displayId === f.displayId), Ae = B || {
                      id: f.stationId,
                      hostname: (oe == null ? void 0 : oe.stationHostname) || f.stationHostname || f.stationId,
                      displayName: (oe == null ? void 0 : oe.stationName) || f.label || f.stationId,
                      displays: oe ? [{ displayId: oe.displayId, width: oe.sourceWidth, height: oe.sourceHeight }] : []
                    }, pe = (Ae == null ? void 0 : Ae.displays) || ((bt = Ae == null ? void 0 : Ae.topology) == null ? void 0 : bt.displays) || [], Ne = U.filter(
                      (Re) => Re.stationId === f.stationId || Ae && (Re.stationId === Ae.id || Re.stationId === Ae.hostname)
                    ), ut = pe.length > 1 && Ne.length >= pe.length, nt = f.borderColor || pt[C % pt.length], st = f.borderWidth !== void 0 ? f.borderWidth : 2, me = f.rotation || 0, lt = f.shadowEffect || "deep", St = f.borderRadius || 0, ot = f.x / Ie * 100, ft = f.y / $e * 100, Sn = f.width / Ie * 100, zn = f.height / $e * 100, At = Ag(lt, $, nt);
                    f.y < 50, f.x < 100, f.x + f.width > Ie - 100;
                    const Et = f.zIndex !== void 0 ? f.zIndex : C + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${$ ? "is-selected" : ""} ${J ? "is-dragging" : ""} ${Y ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${ot}%`,
                          top: `${ft}%`,
                          width: `${Sn}%`,
                          height: `${zn}%`,
                          zIndex: Et * 10 + (J ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${st}px solid ${nt}`,
                          borderRadius: `${St}px`,
                          boxShadow: At,
                          opacity: f.opacity !== void 0 ? f.opacity : 1,
                          pointerEvents: f.opacity !== void 0 && f.opacity < 0.1 ? "none" : "auto",
                          cursor: J ? "grabbing" : "grab",
                          transition: J || Y ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (Re) => Hi(Re, C),
                        onContextMenu: (Re) => {
                          Re.preventDefault(), Re.stopPropagation(), vt(C), gt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (Re) => Hi(Re, C),
                              onDoubleClick: () => kl(C),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: f.label || `${Ae.displayName || f.stationId} (${f.displayId})` })
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
                                  me !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    me,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${Et}`, children: [
                                  "#$",
                                  Et
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-badge-action-inspector ${$ && jn ? "active" : ""}`,
                                    onClick: (Re) => {
                                      Re.stopPropagation(), vt(C), gt((ht) => !ht || He !== C);
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
                                  transition: J ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  jg,
                                  {
                                    station: Ae,
                                    isSolo: !1,
                                    currentEpochMs: _,
                                    timeMode: g,
                                    isPlaying: k,
                                    setIsPlaying: E,
                                    baseEpochMs: d,
                                    totalDurationMs: b,
                                    outPointMs: v,
                                    setPlayheadMs: p,
                                    globalGaps: h,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: I,
                                    playbackSpeed: S,
                                    activeAudioStationId: ce,
                                    onSoloAudio: ee,
                                    directorPlan: w || (Ae == null ? void 0 : Ae.directorPlan),
                                    isAutoDirectorEnabled: a ? a[Ae.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: i,
                                    targetDisplayId: f.displayId,
                                    onSelectDisplayId: (Re) => {
                                      const ht = U.map((it, mr) => mr === C ? { ...it, displayId: Re } : it);
                                      he(ht);
                                    },
                                    areAllDisplaysPlaced: ut,
                                    slotIndex: C,
                                    borderColor: nt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (Re) => Hi(Re, C),
                                onDoubleClick: () => kl(C),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          $ && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (Re) => yo(Re, C, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${xr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (Re) => yo(Re, C, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${xr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (Re) => yo(Re, C, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${xr(f.sourceWidth, f.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (Re) => yo(Re, C, "br"),
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
                  !H && jn && He !== null && Ws && (() => {
                    const f = Ws, C = He, $ = f.borderColor || pt[C % pt.length], J = f.borderWidth !== void 0 ? f.borderWidth : 2, Y = f.rotation || 0, B = f.shadowEffect || "deep", oe = f.zIndex !== void 0 ? f.zIndex : C + 1, Ae = f.x / Ie * 100, pe = f.width / Ie * 100, Ne = Ae + pe / 2;
                    let ut = `${Ne}%`, nt = "translateX(-50%)";
                    Ne < 28 ? (ut = `${Math.max(1, Ae)}%`, nt = "none") : Ne > 72 && (ut = `${Math.min(99, Ae + pe)}%`, nt = "translateX(-100%)");
                    const st = f.y + f.height + 8;
                    let me;
                    st + 45 > $e ? me = `${Math.max(20, (f.y + f.height - 44) / $e * 100)}%` : me = `${st / $e * 100}%`;
                    const lt = (n.length > 0 ? n : t).find(
                      (ot) => {
                        var ft, Sn;
                        return ot.id === f.stationId || ((ft = ot.hostname) == null ? void 0 : ft.toLowerCase()) === ((Sn = f.stationId) == null ? void 0 : Sn.toLowerCase());
                      }
                    ), St = lt ? lt.id : f.stationId;
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
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen Controls: ${f.label || St} • Layer #${oe}`, children: [
                            "🎛️ #",
                            oe
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: "btn-color-swatch-trigger",
                                onClick: () => Xt((ot) => !ot),
                                title: "🎨 Border Color: Click to choose accent frame color",
                                children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "control-icon", children: "🎨" }),
                                  /* @__PURE__ */ s.jsx(
                                    "span",
                                    {
                                      className: "swatch-circle",
                                      style: { backgroundColor: $ === "transparent" ? "#1E293B" : $ }
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsx("span", { className: "caret", children: "▾" })
                                ]
                              }
                            ),
                            Bt && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Ig.map((ot) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${$ === ot ? "is-active" : ""}`,
                                style: { backgroundColor: ot === "transparent" ? "#1E293B" : ot },
                                onClick: () => {
                                  On({ borderColor: ot }), Xt(!1);
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
                                value: J,
                                onChange: (ot) => On({ borderWidth: Number(ot.target.value) }),
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
                                value: B,
                                onChange: (ot) => On({ shadowEffect: ot.target.value }),
                                title: "Drop Shadow & Glow: Add visual depth or tactical glow to this window",
                                children: Tg.map((ot) => /* @__PURE__ */ s.jsx("option", { value: ot.id, children: ot.label }, ot.id))
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
                                  ft === "front" ? sn(C) : ft === "back" ? Es(C) : ft === "up" ? Yt(C) : ft === "down" && En(C);
                                },
                                title: `Layer Stacking Order: Currently Layer #${oe}. Choose to bring in front or send behind.`,
                                children: [
                                  /* @__PURE__ */ s.jsxs("option", { value: "", disabled: !0, children: [
                                    "L#",
                                    oe,
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
                                onClick: () => Cn((ot) => !ot),
                                title: `Fine Rotation: Click to toggle angle slider (Current: ${Y}°)`,
                                children: [
                                  "📐 ",
                                  Y,
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
                                value: Y,
                                onChange: (ot) => On({ rotation: Number(ot.target.value) }),
                                className: "rotation-slider",
                                title: `Adjust tilt angle: ${Y}°`
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
                              onClick: () => kl(C),
                              title: "1x1 Focus Viewport: Maximize this window to fill 100% of the canvas frame (Double-clicking the card also maximizes)",
                              children: "⊞ 1x1 FOCUS"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool",
                              onClick: () => l && l(St, f.displayId),
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
                onClick: () => le(!0),
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
                  onClick: () => Fe((f) => !f),
                  title: `Saved Presets Library (${Me.length})`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Me.length }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                  ]
                }
              ),
              ye && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Fe(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Me.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Me.map((f) => {
                  var C;
                  return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                    Ep(f), Fe(!1);
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
                        onClick: ($) => Sp(f.id, $),
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
                  at.current = !1, ct("auto-grid");
                  const f = Fr(Jt, Ie, $e), C = {
                    id: "canvas-timeline-root",
                    keyframes: [
                      {
                        id: "kf_root_0",
                        timestampEpochMs: d,
                        transitionDurationSec: 0.5,
                        transitionType: "smooth",
                        layout: {
                          width: Ie,
                          height: $e,
                          backgroundColor: "#070A10",
                          fps: 30,
                          placements: f
                        }
                      }
                    ]
                  };
                  Zt(C), T && T(C), vt(0);
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
                onClick: It,
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
        Z && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => le(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (f) => f.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => le(!1), children: "✕" })
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
                onChange: (f) => be(f.target.value),
                autoFocus: !0,
                onKeyDown: (f) => {
                  f.key === "Enter" && vu();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              U.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => le(!1), children: "Cancel" }),
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
  onSetInPoint: E,
  onSetOutPoint: b
}) {
  const [P, v] = u.useState(() => al()), { volume: p, isMuted: h } = P, I = !!e;
  u.useEffect(() => {
    const F = (G) => {
      G.detail && v(G.detail);
    };
    return window.addEventListener("itb-audio-state-changed", F), () => window.removeEventListener("itb-audio-state-changed", F);
  }, []);
  const S = u.useCallback((F, G, T) => {
    const A = {
      volume: typeof F == "number" ? F : p,
      isMuted: typeof G == "boolean" ? G : h,
      channelMode: T || P.channelMode || "both"
    };
    v(A), yg(A);
  }, [p, h, P.channelMode]), j = (F) => {
    F == null || F.stopPropagation(), I && n(!t);
  }, y = (F) => {
    if (F == null || F.stopPropagation(), !I || !k) return;
    const G = wa.indexOf(g), T = G === -1 ? 1 : (G + 1) % wa.length;
    k(wa[T]);
  }, x = (F) => {
    F == null || F.stopPropagation(), h ? S(p === 0 ? 0.5 : p, !1) : S(p, !0);
  }, w = (F) => {
    F.stopPropagation();
    const G = parseFloat(F.target.value);
    G === 0 ? S(0, !0) : S(G, !1);
  }, M = (F) => {
    const G = u.useRef(null), T = u.useRef(null), A = u.useRef(0), D = u.useCallback(() => {
      G.current && clearTimeout(G.current), T.current && clearInterval(T.current), G.current = null, T.current = null;
    }, []), H = u.useCallback((ce = 1) => {
      if (n && n(!1), i) {
        const ee = 33 * ce;
        i((ie) => {
          const ae = F === "forward" ? ie + ee : ie - ee;
          return Math.max(0, Math.min(d, ae));
        });
      } else F === "forward" && N ? N() : F === "backward" && m && m();
    }, [F]), _ = u.useCallback((ce) => {
      ce.preventDefault(), ce.stopPropagation(), I && (D(), H(1), A.current = performance.now(), G.current = setTimeout(() => {
        T.current = setInterval(() => {
          const ee = performance.now() - A.current, ie = ee > 2500 ? 4 : ee > 1e3 ? 2 : 1;
          H(ie);
        }, 50);
      }, 280));
    }, [H, D]);
    return u.useEffect(() => D, [D]), {
      onMouseDown: _,
      onMouseUp: D,
      onMouseLeave: D,
      onTouchStart: _,
      onTouchEnd: D
    };
  }, O = M("backward"), z = M("forward"), R = (F) => {
    F.stopPropagation(), I && (n && n(!1), i && i(a));
  }, W = (F) => {
    F.stopPropagation(), I && (n && n(!1), i && i(c));
  }, ne = () => h || p === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${I ? "is-expanded" : "is-compact-disabled"}`,
      title: I ? "" : "Select a station card above to enable timeline playback",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !I,
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
              disabled: !I,
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
              disabled: !I,
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
              disabled: !I,
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
              disabled: !I,
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
              disabled: !I,
              ...z,
              title: "Step 1 Frame Forward (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "8 5 17 12 8 19 8 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-out",
              disabled: !I,
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
        I && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${h || p === 0 ? "is-muted" : ""}`,
              onClick: x,
              title: h ? "Unmute" : `Mute (${Math.round(p * 100)}%)`,
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
                const F = ["both", "mic", "sys", "stereo"], G = P.channelMode || "both", T = F[(F.indexOf(G) + 1) % F.length];
                S(p, h, T);
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
function Al(e) {
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
    const h = new AbortController(), I = Math.max(0, r + o - Zo), S = r + o + i + Zo;
    g(!0);
    const j = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(k)}&startEpoch=${I}&endEpoch=${S}`;
    return fetch(j, { signal: h.signal }).then((y) => y.ok ? y.json() : []).then((y) => {
      N(Array.isArray(y) ? y : []), g(!1);
    }).catch((y) => {
      y.name !== "AbortError" && (N([]), g(!1));
    }), () => h.abort();
  }, [k, r, o, i, n]);
  const E = n && Array.isArray(n) && n.length > 0 ? n : d, b = u.useMemo(() => {
    if (!E.length || i <= 0 || a <= 0)
      return [];
    const h = r + o, I = h + i, S = [...E].sort((w, M) => w.epochMs - M.epochMs), j = [];
    let y = null, x = -999;
    for (const w of S) {
      const M = w.epochMs + Zo;
      if (M < h || M > I)
        continue;
      const O = M - r, z = (O - o) / i * a;
      if (y && z - x < Og)
        y.events.push(w), y.endOffsetMs = O, y.endEpochMs = M, x = z;
      else {
        const R = (O - o) / i * 100;
        y = {
          id: `kc_${w.epochMs}_${j.length}`,
          startOffsetMs: O,
          endOffsetMs: O,
          startEpochMs: M,
          endEpochMs: M,
          pct: R,
          events: [w]
        }, j.push(y), x = z;
      }
    }
    return j;
  }, [E, r, o, i, a]);
  function P(h) {
    if (!h.events.length) return "";
    if (h.events.length === 1)
      return Al(h.events[0].keyCombination);
    const I = h.events.find((y) => y.keyCombination.includes("+"));
    if (I) {
      const y = Al(I.keyCombination);
      return h.events.length > 1 ? `${y} (+${h.events.length - 1})` : y;
    }
    const S = Al(h.events[0].keyCombination);
    return h.events.every((y) => Al(y.keyCombination) === S) ? `${S} ×${h.events.length}` : `${S} (+${h.events.length - 1})`;
  }
  function v(h, I = "LOCAL") {
    return yt(h, I);
  }
  function p(h) {
    const I = [];
    for (const S of h) {
      const j = Al(S.keyCombination);
      I.length && I[I.length - 1].key === j ? I[I.length - 1].count++ : I.push({ key: j, count: 1 });
    }
    return I;
  }
  return b.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: b.map((h) => {
    const I = h.events.length, S = I > 1, j = P(h), y = v(h.startEpochMs, l), x = p(h.events), w = h.pct < 10 ? "edge-left" : h.pct > 90 ? "edge-right" : "";
    return /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${S ? "is-cluster" : "is-single"}`,
        style: { left: `${h.pct}%` },
        onClick: (M) => {
          M.stopPropagation(), c && c(h.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${j} at ${y}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            S && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: I > 9 ? "9+" : I })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${w}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: S ? `KEYSTROKE BURST (${I})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: y })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
              x.slice(0, 8).map((M, O) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                M.key,
                M.count > 1 ? ` ×${M.count}` : ""
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
  showKeystrokes: E = !0,
  keystrokes: b = []
}) {
  const P = u.useRef(null), [v, p] = u.useState(1e3);
  u.useEffect(() => {
    if (!P.current) return;
    const _ = new ResizeObserver((ce) => {
      for (let ee of ce)
        ee.contentRect.width > 50 && p(ee.contentRect.width);
    });
    return _.observe(P.current), () => _.disconnect();
  }, []);
  const h = u.useCallback((_) => !r || r <= 0 ? "0%" : `${(_ - n) / r * 100}%`, [r, n]), I = u.useCallback((_) => {
    const ee = (_ - n) / r * 100;
    return ee >= -5 && ee <= 105;
  }, [n, r]), S = (_) => {
    if (!P.current) return;
    const ce = P.current.getBoundingClientRect(), ee = Math.max(0, Math.min(_.clientX - ce.left, ce.width)), ie = Math.round(n + ee / ce.width * r);
    i && i(ie);
  }, j = () => {
    i && i(null);
  }, y = (_) => {
    if (!P.current || !a) return;
    const ce = P.current.getBoundingClientRect(), ee = Math.max(0, Math.min(_.clientX - ce.left, ce.width)), ie = Math.round(n + ee / ce.width * r);
    a(Math.max(0, Math.min(l, ie)));
  }, x = u.useMemo(() => {
    const _ = Math.max(3, Math.floor(v / 95)), ce = r / _;
    for (let ee of ja)
      if (ee >= ce) return ee;
    return ja[ja.length - 1];
  }, [r, v]), w = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const _ = e + n, ce = _ + r, ee = t === "LOCAL" ? Rs(_).offsetMin * 60 * 1e3 : 0, ie = _ + ee, ae = Math.ceil(ie / x) * x, Be = [];
    for (let V = ae; V <= ce + ee; V += x) {
      const q = V - ee, de = (q - _) / r * 100;
      de >= 0 && de <= 100 && Be.push({
        epoch: q,
        pct: de,
        label: yt(q, t, {
          includeSeconds: x < 6e4
        })
      });
    }
    return Be;
  }, [e, n, r, x, t]), M = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const _ = e + n, ce = _ + r;
    return up(_, ce).map((ee) => ({
      ...ee,
      pct: (ee.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), O = u.useMemo(() => {
    if (!r || !e) return [];
    const _ = e + n, ce = _ + r, ee = t === "UTC", ie = [], ae = ee ? 0 : Rs(_).offsetMin * 60 * 1e3, Be = _ + ae, V = ce + ae, q = new Date(Be);
    for (q.setUTCHours(0, 0, 0, 0), q.getTime() < Be && q.setUTCDate(q.getUTCDate() + 1); q.getTime() <= V; ) {
      const Z = q.getTime() - ae, le = (Z - _) / r * 100, ye = String(q.getUTCDate()).padStart(2, "0"), Fe = _g[q.getUTCMonth()], X = `${ye} ${Fe}`;
      ie.push({ epoch: Z, pct: le, dateLabel: X }), q.setUTCDate(q.getUTCDate() + 1);
    }
    return ie;
  }, [e, n, r, t]), {
    globalFirstMs: z = N,
    globalLastMs: R = null,
    currentFirstMs: W = null,
    currentLastMs: ne = null
  } = m || { globalFirstMs: N }, F = z !== null && W !== null && Math.abs(z - W) < 1e3, G = R !== null && ne !== null && Math.abs(R - ne) < 1e3, T = u.useMemo(() => {
    const _ = [];
    return F ? I(z) && _.push({
      id: "first-combined",
      ms: z,
      pct: h(z),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${yt(e + z, t)} (Click to jump)`
    }) : (I(z) && _.push({
      id: "first-global",
      ms: z,
      pct: h(z),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${yt(e + z, t)} (Click to jump)`
    }), I(W) && _.push({
      id: "first-current",
      ms: W,
      pct: h(W),
      className: "ruler-media-pin current-first",
      badge: k ? `FIRST (${k})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${yt(e + W, t)} (Click to jump)`
    })), G ? I(R) && _.push({
      id: "last-combined",
      ms: R,
      pct: h(R),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${yt(e + R, t)} (Click to jump)`
    }) : (I(ne) && _.push({
      id: "last-current",
      ms: ne,
      pct: h(ne),
      className: "ruler-media-pin current-last",
      badge: k ? `LAST (${k})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${yt(e + ne, t)} (Click to jump)`
    }), I(R) && _.push({
      id: "last-global",
      ms: R,
      pct: h(R),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${yt(e + R, t)} (Click to jump)`
    })), _;
  }, [
    z,
    R,
    W,
    ne,
    F,
    G,
    e,
    t,
    k,
    I,
    h
  ]), A = u.useMemo(() => {
    const _ = [];
    return typeof c == "number" && I(c) && _.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: h(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${yt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && I(d) && _.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: h(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${yt(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), _;
  }, [c, d, e, t, I, h]), D = o !== null ? h(o) : null, H = D !== null && D >= 0 && D <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: P,
      className: "timeline-ruler-root",
      onMouseMove: S,
      onMouseLeave: j,
      onClick: y,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          w.map((_) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${_.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: _.label })
          ] }, _.epoch)),
          E && /* @__PURE__ */ s.jsx(
            Pg,
            {
              stationHostname: g,
              activeStationName: k,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: v,
              onSeek: a,
              keystrokes: b
            }
          ),
          M.map((_) => /* @__PURE__ */ s.jsxs(
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
          T.map((_) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: _.className,
              style: { left: `${_.pct}` },
              onClick: (ce) => {
                ce.stopPropagation(), a && a(_.ms);
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
          A.map((_) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${_.type}-cut-tick`,
              style: { left: `${_.pct}` },
              onClick: (ce) => {
                ce.stopPropagation(), a && a(_.ms);
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
        H && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${D}%` }, children: [
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
  const [a, c] = u.useState(!1), [d, N] = u.useState(!1), [m, g] = u.useState(""), [k, E] = u.useState(""), b = u.useCallback((w) => {
    if (!w || isNaN(w) || w <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const R = new Date(w);
      return {
        timeStr: `${Pn(R.getUTCHours())}:${Pn(R.getUTCMinutes())}:${Pn(R.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: M, label: O } = Rs(w), z = new Date(w + M * 60 * 1e3);
    return {
      timeStr: `${Pn(z.getUTCHours())}:${Pn(z.getUTCMinutes())}:${Pn(z.getUTCSeconds())}`,
      zoneLabel: O
    };
  }, [t]), P = u.useCallback((w) => {
    if (!w || w < 0) return "00:00:00";
    const M = Math.floor(w / 1e3), O = Math.floor(M / 3600), z = Math.floor(M % 3600 / 60), R = M % 60;
    return `${Pn(O)}:${Pn(z)}:${Pn(R)}`;
  }, []), v = u.useMemo(() => b(e + r), [b, e, r]), p = u.useMemo(() => b(e + o), [b, e, o]), h = u.useMemo(() => P(Math.max(0, o - r)), [P, r, o]), I = u.useCallback((w, M) => {
    if (!w || !w.trim()) return M;
    const z = w.trim().split(" ")[0].split(":").map(Number);
    if (z.length < 2 || z.some(isNaN)) return M;
    const [R, W, ne = 0] = z;
    if (t === "UTC") {
      const ae = new Date(e);
      ae.setUTCHours(R, W, ne, 0);
      let Be = ae.getTime();
      for (; Be < e; ) Be += 864e5;
      for (; Be > e + n + 1e3; ) Be -= 864e5;
      const V = Be - e;
      return isNaN(V) ? M : Math.max(0, Math.min(n, V));
    }
    const { offsetMin: F } = Rs(e), G = new Date(e + F * 6e4), T = G.getUTCFullYear(), A = G.getUTCMonth(), D = G.getUTCDate(), H = `${T}-${Pn(A + 1)}-${Pn(D)}`, _ = `${Pn(R)}:${Pn(W)}:${Pn(ne)}`, ce = Ci(H, _);
    let ee;
    if (ce.isAmbiguous) {
      const ae = e + M, Be = Math.abs(ce.firstOccurrenceEpoch - ae), V = Math.abs(ce.secondOccurrenceEpoch - ae);
      ee = Be <= V ? ce.firstOccurrenceEpoch : ce.secondOccurrenceEpoch;
    } else {
      const ae = Date.UTC(T, A, D, R, W, ne), { offsetMin: Be } = Rs(ae - F * 6e4);
      ee = ae - Be * 6e4;
    }
    for (; ee < e; ) ee += 864e5;
    for (; ee > e + n + 1e3; ) ee -= 864e5;
    const ie = ee - e;
    return isNaN(ie) ? M : Math.max(0, Math.min(n, ie));
  }, [e, t, n]), S = () => {
    g(v.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !m || !m.trim() || m.trim() === v.timeStr)
      return;
    const w = I(m.trim(), r);
    w !== null && !isNaN(w) && w < o && l(w);
  }, y = () => {
    E(p.timeStr), N(!0);
  }, x = () => {
    if (N(!1), !k || !k.trim() || k.trim() === p.timeStr)
      return;
    const w = I(k.trim(), o);
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
          onClick: S,
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
          value: k,
          autoFocus: !0,
          onChange: (w) => E(w.target.value),
          onBlur: x,
          onKeyDown: (w) => {
            w.key === "Enter" && x(), w.key === "Escape" && N(!1);
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
function Wg({
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
  const m = Math.max(0, Math.min(100, a / r * 100)), g = Math.max(0, Math.min(100, c / r * 100)), k = Math.max(0, g - m), E = Math.max(0, Math.min(100, l / r * 100)), b = Math.max(0, Math.min(100 - E, o / r * 100)), P = E + b, v = i > 1.05, p = 7, h = k >= 10, I = k >= 16, S = h, j = I, y = S && Math.abs(E - m) < p, x = v && b >= 12 && !y, w = j && Math.abs(P - g) < p, M = v && b >= 12 && !w;
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
              S && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: yt(t + a, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: yt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${E}%`, width: `${b}%` },
            children: [
              x && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: yt(t + l, n) }),
              M && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: yt(t + l + o, n) })
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
function Ug({
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
  const k = (d || "NONE").toUpperCase().replace("-", "_"), E = () => {
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
        onClick: E,
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
const Ns = /* @__PURE__ */ new Map(), Br = /* @__PURE__ */ new Map();
let Ms = [], cl = 0;
const Bd = 3, zg = 8e3, Hg = 80;
function yp() {
  setTimeout(Vg, 0);
}
function Vg() {
  var e;
  if (!(cl >= Bd || Ms.length === 0))
    for (Ms = Ms.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); cl < Bd && Ms.length > 0; ) {
      const t = Ms.pop();
      !t || (e = t.signal) != null && e.aborted || (cl++, Kg(t));
    }
}
async function Kg(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: i, resolve: a, displayId: c } = e;
  let d = !1, N = null;
  const m = () => {
    d || (d = !0, N && clearTimeout(N), cl = Math.max(0, cl - 1), Br.delete(t), yp());
  };
  N = setTimeout(() => {
    m(), a(null);
  }, zg);
  try {
    const g = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, k = await fetch(g, { signal: i });
    if (k.ok && k.status !== 204) {
      const E = await k.blob();
      if (E && E.size > 1500) {
        const b = URL.createObjectURL(E);
        if (Ns.size >= Hg) {
          const P = Ns.keys().next().value, v = Ns.get(P);
          v && URL.revokeObjectURL(v), Ns.delete(P);
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
const Wd = {
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
        Ms = Ms.filter((N) => N.key !== i), Br.delete(i), c(null);
      }, { once: !0 }), Ms.push(d), yp();
    });
    return Br.set(i, a), a;
  },
  clear() {
    Ns.forEach((e) => URL.revokeObjectURL(e)), Ns.clear(), Br.clear(), Ms = [], cl = 0;
  }
}, Yg = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Zn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, el = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Ud({
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
  const [k, E] = u.useState({}), b = u.useRef(k);
  b.current = k;
  const P = u.useMemo(() => Yg(l), [l]), v = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: x, framesPerTile: w } = P, M = [], O = o + r, z = O + l, R = O - x, W = z + x;
    if ([...n].sort((F, G) => Zn(F) - Zn(G)).forEach((F, G) => {
      const T = Math.round(Zn(F)), A = Math.round(el(F));
      if (A <= T) return;
      const D = Math.max(T, R), H = Math.min(A, W);
      if (H <= D) return;
      const _ = Math.floor(D / x) * x;
      for (let ce = _; ce < H; ce += x) {
        const ee = ce + x, ie = Math.max(T, ce), ae = Math.min(A, ee);
        ae > ie && M.push({
          key: `${e}_${t}_${ie}_${ae}_${w}`,
          sIdx: G,
          startEpoch: ie,
          endEpoch: ae,
          framesPerTile: w,
          displayId: t
        });
      }
    }), M.length > 20) {
      const F = o + r + l / 2;
      M.sort((G, T) => {
        const A = Math.abs((G.startEpoch + G.endEpoch) / 2 - F), D = Math.abs((T.startEpoch + T.endEpoch) / 2 - F);
        return A - D;
      }), M.length = 20, M.sort((G, T) => G.startEpoch - T.startEpoch);
    }
    return M;
  }, [n, o, e, t, r, l, P]);
  u.useEffect(() => {
    if (v.length === 0) return;
    let x = !0;
    const w = new AbortController(), M = [], O = {};
    let z = !1;
    v.forEach((T) => {
      const A = Wd.get(e, T.startEpoch, T.endEpoch, T.framesPerTile, t);
      A ? b.current[T.key] !== A && (O[T.key] = A, z = !0) : M.push(T);
    });
    const R = new Set(v.map((T) => T.key)), W = b.current, ne = {};
    let F = !1;
    if (Object.keys(W).forEach((T) => {
      R.has(T) ? ne[T] = W[T] : F = !0;
    }), z || F) {
      const T = { ...ne, ...O };
      b.current = T, E(T);
    }
    if (M.length === 0) return () => {
      x = !1;
    };
    const G = setTimeout(() => {
      M.forEach((T) => {
        Wd.fetchTile(e, T.startEpoch, T.endEpoch, T.framesPerTile, w.signal, t).then((A) => {
          x && A && (b.current[T.key] = A, E((D) => ({ ...D, [T.key]: A })));
        });
      });
    }, 150);
    return () => {
      x = !1, clearTimeout(G), w.abort();
    };
  }, [v, e, t]);
  const p = (i - r) / l * 100, h = (a - r) / l * 100, I = u.useMemo(() => {
    if (v.length === 0 || !o || l <= 0) return [];
    const x = r, w = r + l;
    return v.map((M) => {
      const O = M.startEpoch - o, z = M.endEpoch - o;
      if (z <= x || O >= w) return null;
      const R = Math.max(x, O), W = Math.min(w, z);
      return {
        key: M.key,
        spriteUrl: k[M.key] || null,
        leftPct: (R - x) / l * 100,
        widthPct: (W - R) / l * 100
      };
    }).filter(Boolean);
  }, [v, o, r, l, k]), S = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const x = r, w = r + l;
    return n.map((M, O) => {
      const z = Math.round(Zn(M)) - o, R = Math.round(el(M)) - o;
      if (R <= x || z >= w) return null;
      const W = Math.max(x, z), ne = Math.min(w, R);
      return {
        id: O,
        leftPct: (W - x) / l * 100,
        widthPct: (ne - W) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), j = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const x = [...n].sort((G, T) => Zn(G) - Zn(T)), w = [], M = r, O = r + l, z = o + M, R = o + O, W = o + (i !== void 0 ? i : M), ne = o + (a !== void 0 ? a : O);
    if (x.length > 0) {
      const G = Zn(x[0]);
      G > z && w.push({ startEpoch: z, endEpoch: G });
    } else l > 0 && w.push({ startEpoch: z, endEpoch: R });
    for (let G = 0; G < x.length - 1; G++) {
      const T = el(x[G]), A = Zn(x[G + 1]);
      A - T > 1e3 && w.push({ startEpoch: T, endEpoch: A });
    }
    if (x.length > 0) {
      const G = el(x[x.length - 1]);
      G < R && w.push({ startEpoch: G, endEpoch: R });
    }
    const F = [];
    return c && c.length > 0 && c.forEach((G, T) => {
      const A = Math.max(G.startEpochMs ?? G.StartEpochMs, W), D = Math.min(G.endEpochMs ?? G.EndEpochMs, ne);
      if (D > A && D > z && A < R) {
        const H = Math.max(z, A), _ = Math.min(R, D), ce = (_ - o - (H - o)) / l * 100;
        ce > 0 && F.push({
          id: `global-${T}`,
          type: "global",
          startEpoch: H,
          endEpoch: _,
          leftPct: (H - o - M) / l * 100,
          widthPct: ce,
          durationSec: Math.round((D - A) / 1e3)
        });
      }
    }), w.forEach((G, T) => {
      let A = [G];
      c && c.length > 0 && c.forEach((D) => {
        const H = Math.max(D.startEpochMs ?? D.StartEpochMs, W), _ = Math.min(D.endEpochMs ?? D.EndEpochMs, ne);
        if (_ <= H) return;
        const ce = [];
        A.forEach((ee) => {
          _ <= ee.startEpoch || H >= ee.endEpoch ? ce.push(ee) : (H > ee.startEpoch && ce.push({ startEpoch: ee.startEpoch, endEpoch: H }), _ < ee.endEpoch && ce.push({ startEpoch: _, endEpoch: ee.endEpoch }));
        }), A = ce;
      }), A.forEach((D, H) => {
        if (D.endEpoch - D.startEpoch < 1e3 || D.endEpoch <= z || D.startEpoch >= R) return;
        const _ = Math.max(z, D.startEpoch), ce = Math.min(R, D.endEpoch), ee = (ce - o - (_ - o)) / l * 100;
        ee > 0 && F.push({
          id: `station-${T}-${H}`,
          type: "station",
          startEpoch: _,
          endEpoch: ce,
          leftPct: (_ - o - M) / l * 100,
          widthPct: ee,
          durationSec: Math.round((D.endEpoch - D.startEpoch) / 1e3)
        });
      });
    }), F;
  }, [n, c, o, r, l, i, a]), y = u.useMemo(() => {
    if (!m || !N || !d || d.length === 0) return [];
    const x = (t || "mon-0").toLowerCase(), w = r, M = r + l;
    return d.map((O, z) => {
      const R = (O.startEpochMs ?? O.StartEpochMs ?? 0) - o, W = (O.endEpochMs ?? O.EndEpochMs ?? 0) - o;
      if (W <= w || R >= M) return null;
      const ne = Math.max(w, R), F = Math.min(M, W), G = (ne - w) / l * 100, T = (F - ne) / l * 100;
      if (T <= 0) return null;
      const D = (O.targetDisplayId || O.TargetDisplayId || "mon-0").toLowerCase() === x;
      return {
        id: `cov_${z}`,
        isFeatured: D,
        leftPct: G,
        widthPct: T
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
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: I.map((x) => /* @__PURE__ */ s.jsx(
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
    y.map((x) => x.isFeatured ? /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${g ? "has-stepper" : ""}`, children: S.map((x) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` }
      },
      `bar_${x.id}`
    )) }),
    g && g.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: N ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      g.map((x, w) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${x.dispNum}`,
          style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
          title: `Auto-Director: Screen ${x.dispNum} (${x.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: x.dispNum })
        },
        `stp_${w}`
      )),
      j && j.map((x) => /* @__PURE__ */ s.jsx(
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
  inPointMs: E = 0,
  outPointMs: b = 36e5,
  baseEpochMs: P = 0,
  segments: v = [],
  recordingSegments: p = {},
  globalGaps: h = []
}) {
  const I = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", S = (e == null ? void 0 : e.id) || I, j = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", y = (e == null ? void 0 : e.hostname) || "", x = u.useMemo(() => {
    var A, D, H;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((A = e == null ? void 0 : e.displayTopology) == null ? void 0 : A.displays) || ((D = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : D.Displays) || ((H = e == null ? void 0 : e.topology) == null ? void 0 : H.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), w = u.useMemo(() => {
    var D, H;
    const A = x.find((_) => _.isPrimary || _.IsPrimary);
    return ((A == null ? void 0 : A.displayId) || (A == null ? void 0 : A.DisplayId) || ((D = x[0]) == null ? void 0 : D.displayId) || ((H = x[0]) == null ? void 0 : H.DisplayId) || "mon-0").toLowerCase();
  }, [x]), M = a || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), O = u.useMemo(() => (M == null ? void 0 : M.segments) || (M == null ? void 0 : M.Segments) || [], [M]), z = O && O.length > 0, R = x.length > 1 || z, W = u.useMemo(() => {
    let A = p[S] || p[I] || v || [];
    if (!A || A.length === 0) {
      const D = (S || "").toLowerCase(), H = (I || "").toLowerCase();
      for (const [_, ce] of Object.entries(p || {})) {
        const ee = _.toLowerCase();
        if (D && ee === D || H && ee === H) {
          A = ce;
          break;
        }
      }
    }
    if ((!A || A.length === 0) && (A = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !A || A.length === 0)
      for (const D of x) {
        const H = D.segments || D.Segments || [];
        if (H.length > 0) {
          A = H;
          break;
        }
      }
    return (A || []).filter((D) => el(D) - Zn(D) > 0);
  }, [p, v, S, I, e, x]), ne = u.useMemo(() => {
    if (!P || k <= 0) return [];
    const A = [...W].sort((H, _) => Zn(H) - Zn(_)), D = [];
    h && h.length > 0 && h.forEach((H) => {
      const _ = H.startEpochMs ?? H.StartEpochMs ?? 0, ce = H.endEpochMs ?? H.EndEpochMs ?? 0;
      ce > _ && D.push({ startEpoch: _, endEpoch: ce, type: "global" });
    });
    for (let H = 0; H < A.length - 1; H++) {
      const _ = el(A[H]), ce = Zn(A[H + 1]);
      ce - _ > 1e3 && D.push({ startEpoch: _, endEpoch: ce, type: "station" });
    }
    return D;
  }, [W, h, P, k]), F = u.useMemo(() => {
    if (!O || O.length === 0) return [];
    if (!ne || ne.length === 0) return O;
    let A = O.map((D) => ({
      ...D,
      startEpochMs: D.startEpochMs ?? D.StartEpochMs ?? 0,
      endEpochMs: D.endEpochMs ?? D.EndEpochMs ?? 0,
      targetDisplayId: (D.targetDisplayId || D.TargetDisplayId || "mon-0").toLowerCase()
    })).sort((D, H) => D.startEpochMs - H.startEpochMs);
    ne.forEach((D) => {
      const H = D.startEpoch, _ = D.endEpoch;
      if (!(!H || !_ || _ <= H))
        for (let ce = A.length - 1; ce > 0; ce--) {
          const ee = A[ce].startEpochMs;
          ee >= H && ee <= _ && (A[ce - 1].endEpochMs = A[ce].endEpochMs, A.splice(ce, 1));
        }
    });
    for (let D = A.length - 1; D > 0; D--)
      A[D].targetDisplayId === A[D - 1].targetDisplayId && (A[D - 1].endEpochMs = A[D].endEpochMs, A.splice(D, 1));
    return A;
  }, [O, ne]), G = u.useMemo(() => {
    if (!z || k <= 0) return null;
    const A = g, D = g + k;
    return F.map((H, _) => {
      const ce = (H.startEpochMs ?? H.StartEpochMs ?? 0) - P, ee = (H.endEpochMs ?? H.EndEpochMs ?? 0) - P;
      if (ee <= A || ce >= D) return null;
      const ie = Math.max(A, ce), ae = Math.min(D, ee), Be = (ie - A) / k * 100, V = (ae - ie) / k * 100;
      if (V <= 0) return null;
      const q = (H.targetDisplayId || H.TargetDisplayId || "mon-0").toLowerCase(), de = x.findIndex((ye) => (ye.displayId || ye.DisplayId || "").toLowerCase() === q);
      let Z = de >= 0 ? de + 1 : null;
      if (!Z) {
        const ye = q.match(/\d+/);
        Z = ye ? parseInt(ye[0], 10) + 1 : 1;
      }
      const le = de >= 0 ? x[de].displayName || x[de].DisplayName || `Screen ${Z}` : `Screen ${Z}`;
      return {
        id: _,
        dispNum: Z,
        dispLabel: le,
        leftPct: Be,
        widthPct: V
      };
    }).filter(Boolean);
  }, [z, O, x, P, g, k]), T = u.useCallback((A) => {
    const D = (A || "mon-0").toLowerCase();
    return o.some((H) => H.stationId === S && (H.displayId || "mon-0").toLowerCase() === D);
  }, [o, S]);
  return t ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (A) => {
              A.stopPropagation(), n == null || n();
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
            onClick: (A) => {
              A.stopPropagation(), l(e.id);
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
            onClick: (A) => {
              A.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: x.map((A, D) => {
      const H = (A.displayId || A.DisplayId || `mon-${D}`).toLowerCase(), _ = A.displayNumber || A.DisplayNumber || D + 1, ce = A.displayName || A.DisplayName || `SCREEN ${_}`, ee = T(H);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${ce} (${A.width || 1920}×${A.height || 1080})`, children: ce }),
              !r && i && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${ee ? "is-on-canvas" : ""}`,
                  onClick: (ie) => {
                    ie.stopPropagation(), i(e.id, H);
                  },
                  title: ee ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: ee ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Ud,
              {
                hostname: I,
                displayId: H,
                activeSegments: W,
                viewportStartMs: g,
                viewportDurationMs: k,
                baseEpochMs: P,
                inPointMs: E,
                outPointMs: b,
                globalGaps: h,
                directorSegments: F,
                isAutoDirectorEnabled: r,
                showDirectorCoverage: R
              }
            )
          ]
        },
        `${e.id}-${H}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), R && n && n();
      },
      onContextMenu: (A) => {
        N && (A.preventDefault(), A.stopPropagation(), N(A, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${R ? "has-stepper" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${j}${y ? ` (${y})` : ""} • Click to select / expand`,
            children: [
              R && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (A) => {
                    A.stopPropagation(), n == null || n();
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
                  onClick: (A) => {
                    A.stopPropagation(), l(e.id);
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
                  onClick: (A) => {
                    A.stopPropagation(), m(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ud,
          {
            hostname: I,
            displayId: w,
            activeSegments: W,
            viewportStartMs: g,
            viewportDurationMs: k,
            baseEpochMs: P,
            inPointMs: E,
            outPointMs: b,
            globalGaps: h,
            isAutoDirectorEnabled: r,
            stepperSegments: R ? G : null
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
  const k = u.useRef(null), [E, b] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [P, v] = u.useState(!1), [p, h] = u.useState(null), [I, S] = u.useState(1), [j, y] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const V = (q) => {
      q.detail && y(q.detail);
    };
    return window.addEventListener("itb-live-audio-level", V), () => window.removeEventListener("itb-live-audio-level", V);
  }, []);
  const x = u.useCallback(() => {
    b((V) => {
      const q = !V;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(q));
      } catch {
      }
      return q;
    });
  }, []), [w, M] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      clips: e.segments.map((V, q) => {
        var de;
        return {
          id: `clip_${q}_${V.startEpochMs || V.StartEpochMs}`,
          startEpochMs: V.startEpochMs ?? V.StartEpochMs ?? l,
          endEpochMs: V.endEpochMs ?? V.EndEpochMs ?? l + r,
          sourceStationId: V.sourceStationId ?? V.SourceStationId ?? (((de = t[0]) == null ? void 0 : de.id) || "station-0"),
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
  ]), O = l + o, z = l + n, R = z + r, W = u.useCallback((V) => {
    if (!g) return;
    const q = [];
    V.forEach((de) => {
      de.isMuted || P || de.clips.forEach((Z) => {
        q.push({
          startEpochMs: Z.startEpochMs,
          endEpochMs: Z.endEpochMs,
          sourceStationId: Z.sourceStationId,
          gain: Z.gain * de.gain
        });
      });
    }), q.sort((de, Z) => de.startEpochMs - Z.startEpochMs), g({ segments: q });
  }, [g, P]), ne = u.useCallback(() => {
    M((V) => {
      const de = `A${V.length + 1}`, Z = {
        id: de,
        name: `Track ${de}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        clips: []
      }, le = [...V, Z];
      return W(le), le;
    });
  }, [W]), F = u.useCallback((V) => {
    M((q) => {
      if (q.length <= 1) return q;
      const de = q.filter((Z) => Z.id !== V);
      return W(de), de;
    });
  }, [W]), G = u.useCallback((V) => {
    M((q) => {
      const de = q.map((Z) => Z.id === V ? { ...Z, isMuted: !Z.isMuted } : Z);
      return W(de), de;
    });
  }, [W]), T = u.useCallback((V) => {
    M((q) => {
      var le;
      const de = (le = q.find((ye) => ye.id === V)) == null ? void 0 : le.isSolo, Z = q.map((ye) => ({
        ...ye,
        isSolo: ye.id === V ? !de : !1,
        isMuted: ye.id === V ? !1 : !de
      }));
      return W(Z), Z;
    });
  }, [W]), A = u.useCallback((V, q) => {
    const de = Math.max(0, Math.min(2, Number(q)));
    M((Z) => {
      const le = Z.map((ye) => ye.id === V ? { ...ye, gain: de } : ye);
      return W(le), le;
    }), _d(de);
  }, [W]), D = u.useCallback((V, q = null, de = null) => {
    var Q;
    const Z = q || ((Q = t[0]) == null ? void 0 : Q.id) || "station-0", le = de !== null ? de : O, ye = Math.min(r, 6e4), Fe = le + ye, X = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(le),
      endEpochMs: Math.round(Fe),
      sourceStationId: Z,
      gain: 1
    };
    M((fe) => {
      const ge = fe.map((we) => we.id === V ? {
        ...we,
        clips: [...we.clips, X].sort((be, se) => be.startEpochMs - se.startEpochMs)
      } : we);
      return W(ge), ge;
    });
  }, [O, r, t, W]), H = u.useCallback((V, q) => {
    M((de) => {
      const Z = de.map((le) => {
        if (le.id !== V) return le;
        const ye = [];
        return le.clips.forEach((Fe) => {
          Fe.id === q && O > Fe.startEpochMs + 500 && O < Fe.endEpochMs - 500 ? (ye.push({ ...Fe, endEpochMs: O }), ye.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: O,
            endEpochMs: Fe.endEpochMs,
            sourceStationId: Fe.sourceStationId,
            gain: Fe.gain
          })) : ye.push(Fe);
        }), { ...le, clips: ye };
      });
      return W(Z), Z;
    }), h(null);
  }, [O, W]), _ = u.useCallback((V, q) => {
    M((de) => {
      const Z = de.map((le) => le.id !== V ? le : { ...le, clips: le.clips.filter((ye) => ye.id !== q) });
      return W(Z), Z;
    }), h(null);
  }, [W]), ce = u.useCallback((V, q, de) => {
    M((Z) => {
      const le = Z.map((ye) => ye.id !== V ? ye : {
        ...ye,
        clips: ye.clips.map((Fe) => Fe.id === q ? { ...Fe, sourceStationId: de } : Fe)
      });
      return W(le), le;
    }), h((Z) => Z ? { ...Z, stationId: de } : null);
  }, [W]), ee = u.useCallback((V, q, de) => {
    const Z = Math.max(0, Math.min(2.5, Number(de)));
    S(Z), M((le) => {
      const ye = le.map((Fe) => Fe.id !== V ? Fe : {
        ...Fe,
        clips: Fe.clips.map((X) => X.id === q ? { ...X, gain: Z } : X)
      });
      return W(ye), ye;
    }), _d(Z);
  }, [W]), ie = u.useCallback((V, q, de, Z) => {
    V.preventDefault(), V.stopPropagation();
    const le = V.clientX, ye = w.find((we) => we.id === q), Fe = ye == null ? void 0 : ye.clips.find((we) => we.id === de);
    if (!Fe) return;
    const X = Fe.startEpochMs, Q = Fe.endEpochMs, fe = (we) => {
      var Me;
      const be = we.clientX - le, se = (Me = k.current) == null ? void 0 : Me.querySelector(".audio-lane-timeline");
      if (!se) return;
      const _e = se.getBoundingClientRect(), ke = be / _e.width * r;
      M((ze) => ze.map((De) => De.id !== q ? De : {
        ...De,
        clips: De.clips.map((je) => {
          if (je.id !== de) return je;
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
      window.removeEventListener("mousemove", fe), window.removeEventListener("mouseup", ge), M((we) => (W(we), we));
    };
    window.addEventListener("mousemove", fe), window.addEventListener("mouseup", ge);
  }, [w, r, W]), ae = (V, q, de) => {
    V.preventDefault(), V.stopPropagation();
    const Z = Math.min(window.innerWidth - 260, Math.max(16, V.clientX - 40)), le = Math.min(window.innerHeight - 280, Math.max(16, V.clientY - 200));
    S(de.gain || 1), h({
      laneId: q,
      clipId: de.id,
      s: de.startEpochMs,
      e: de.endEpochMs,
      x: Z,
      y: le,
      stationId: de.sourceStationId,
      gain: de.gain || 1
    });
  };
  u.useEffect(() => {
    if (!p) return;
    const V = () => h(null), q = (de) => {
      de.key === "Escape" && h(null);
    };
    return window.addEventListener("click", V), window.addEventListener("keydown", q), () => {
      window.removeEventListener("click", V), window.removeEventListener("keydown", q);
    };
  }, [p]);
  const Be = u.useMemo(() => w.reduce((V, q) => V + (q.isMuted ? 0 : q.clips.length), 0), [w]);
  return !t || t.length === 0 ? null : E ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: k, children: [
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
            onClick: ne,
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
            onClick: () => v((V) => !V),
            title: P ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: P ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: w.map((V, q) => {
      const de = zd[q % zd.length];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${de}26`, borderColor: `${de}80`, color: de }, children: V.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: V.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${V.isMuted ? "active" : ""}`,
                onClick: () => G(V.id),
                title: V.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${V.isSolo ? "active" : ""}`,
                onClick: () => T(V.id),
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
                onChange: (Z) => A(V.id, Z.target.value),
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
            onDoubleClick: (Z) => {
              var X;
              const le = Z.currentTarget.getBoundingClientRect(), ye = Math.max(0, Math.min(1, (Z.clientX - le.left) / le.width)), Fe = Math.round(z + ye * r);
              D(V.id, (X = t[0]) == null ? void 0 : X.id, Fe);
            },
            children: [
              V.clips.map((Z) => {
                const le = Z.startEpochMs, ye = Z.endEpochMs, Fe = t.find((be) => be.id === Z.sourceStationId), X = Fe ? Fe.displayName || Fe.hostname || Fe.id : Z.sourceStationId;
                if (ye <= z || le >= R) return null;
                const Q = Math.max(z, le), fe = Math.min(R, ye), ge = (Q - z) / r * 100, we = (fe - Q) / r * 100;
                return we <= 0 ? null : /* @__PURE__ */ s.jsxs(
                  "div",
                  {
                    className: `audio-clip-block ${V.isMuted ? "lane-muted" : ""}`,
                    style: {
                      left: `${ge}%`,
                      width: `${we}%`,
                      borderLeftColor: de
                    },
                    onClick: (be) => ae(be, V.id, Z),
                    onContextMenu: (be) => ae(be, V.id, Z),
                    title: `Audio Clip: ${X} [${yt(le, m, { includeSeconds: !0 })} - ${yt(ye, m, { includeSeconds: !0 })}] • Gain: ${Math.round(Z.gain * 100)}%`,
                    children: [
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-left",
                          onMouseDown: (be) => ie(be, V.id, Z.id, "start"),
                          title: "Drag to trim Clip In-Point"
                        }
                      ),
                      /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
                        "path",
                        {
                          d: "M0,12 L5,6 L10,18 L15,4 L20,20 L25,8 L30,16 L35,2 L40,22 L45,10 L50,14 L55,5 L60,19 L65,8 L70,16 L75,3 L80,21 L85,9 L90,15 L95,7 L100,12",
                          fill: "none",
                          stroke: de,
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
                          onMouseDown: (be) => ie(be, V.id, Z.id, "end"),
                          title: "Drag to trim Clip Out-Point"
                        }
                      )
                    ]
                  },
                  Z.id
                );
              }),
              V.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var Z;
                    return D(V.id, (Z = t[0]) == null ? void 0 : Z.id, O);
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
              const q = V.id === p.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${q ? "is-selected" : ""}`,
                  onClick: () => ce(p.laneId, p.clipId, V.id),
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
                onChange: (V) => ee(p.laneId, p.clipId, V.target.value),
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
                onClick: () => H(p.laneId, p.clipId),
                title: "Split clip at timeline playhead (Ctrl+K)",
                children: "✂️ SPLIT AT PLAYHEAD"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action delete",
                onClick: () => _(p.laneId, p.clipId),
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
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: Be > 0 ? `${Be} CLIPS ACTIVE` : "MUTED (0 ACTIVE)" }),
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
  const k = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [E, b] = u.useState(null), [P, v] = u.useState(null);
  ho.useEffect(() => {
    if (P === null) return;
    const y = (w) => {
      w.key === "Escape" && v(null);
    }, x = (w) => {
      !w.target.closest(".kf-inspector-popover") && !w.target.closest(".kf-marker-diamond") && v(null);
    };
    return window.addEventListener("keydown", y), window.addEventListener("mousedown", x), () => {
      window.removeEventListener("keydown", y), window.removeEventListener("mousedown", x);
    };
  }, [P]);
  const p = d + m, h = d + a, I = h + c, S = (y) => {
    const x = y.currentTarget.getBoundingClientRect(), w = y.clientX - x.left, M = Math.max(0, Math.min(1, w / x.width)), O = Math.round(h + M * c);
    r && r(O);
  }, j = (y, x, w) => {
    if (y.button !== 0) return;
    y.stopPropagation(), y.preventDefault();
    const M = y.clientX, O = w.timestampEpochMs, z = w.id || `kf_${x}_${O}`, R = y.currentTarget.closest(".track-surface");
    if (!R) return;
    let W = !1;
    b({
      idx: x,
      kfId: z,
      startClientX: M,
      initialEpoch: O,
      currentEpoch: O
    });
    const ne = (G) => {
      const T = G.clientX - M;
      Math.abs(T) > 3 && (W = !0);
      const A = R.getBoundingClientRect(), D = T / A.width * c;
      let H = Math.round(O + D);
      H = Math.max(d, Math.min(d + N, H)), b((_) => _ ? { ..._, currentEpoch: H } : null);
    }, F = (G) => {
      window.removeEventListener("mousemove", ne), window.removeEventListener("mouseup", F), b(null);
      const T = R.getBoundingClientRect(), D = (G.clientX - M) / T.width * c;
      let H = Math.round(O + D);
      H = Math.max(d, Math.min(d + N, H)), W ? (o && o(z, H), n && n(x, H)) : (n && n(x, O), v((_) => _ === x ? null : x));
    };
    window.addEventListener("mousemove", ne), window.addEventListener("mouseup", F);
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
        onClick: S,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          k.map((y, x) => {
            const w = (E == null ? void 0 : E.idx) === x, M = w ? E.currentEpoch : y.timestampEpochMs;
            if (M < h - 5e4 || M > I + 5e4) return null;
            const O = (M - h) / c * 100;
            if (O < -2 || O > 102) return null;
            const z = x === t, R = yt(M, g, { includeSeconds: !0 }), W = `${y.transitionType || "smooth"} (${y.transitionDurationSec ?? 0.5}s)`, ne = Math.max(0, (M - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${z ? "is-active" : ""} ${w ? "is-dragging" : ""}`,
                style: { left: `${O}%` },
                onMouseDown: (F) => j(F, x, y),
                onContextMenu: (F) => {
                  F.preventDefault(), F.stopPropagation(), k.length > 1 && l && l(x);
                },
                title: `Keyframe #${x + 1} at ${R} (+${ne}s) • ${W}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  w && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: R }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      ne,
                      "s"
                    ] })
                  ] }),
                  P === x && !w && /* @__PURE__ */ s.jsxs(
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
                                F.stopPropagation(), v(null);
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
                                  className: `btn-trans-choice ${(y.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(x, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${y.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(x, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${y.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(x, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          y.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((F) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(y.transitionDurationSec ?? 0.5) === F ? "is-active" : ""}`,
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
                                F.stopPropagation(), l && l(x), v(null);
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
  const c = (w) => !r || r <= 0 ? "0%" : `${(w - n) / r * 100}%`, d = (o - n) / r * 100, N = (i - n) / r * 100, m = (l - n) / r * 100, g = m >= -0.2 && m <= 100.2, k = Math.max(0, Math.min(100, m)), E = Math.max(0, d), b = Math.min(100, N), P = Math.max(0, b - E), v = (w) => (M) => {
    M.preventDefault(), M.stopPropagation(), typeof a == "function" && a(w, M);
  }, p = d < 1.5, h = N > 98.5, I = d <= 0.2 && d >= -0.2, S = N >= 99.8 && N <= 100.2, j = m >= -0.2 && m < 3.5, y = m > 96.5 && m <= 100.2, x = u.useMemo(() => yt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    P > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${E}%`, width: `${P}%` },
        onMouseDown: v("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${p ? "flipped" : ""} ${I ? "at-edge" : ""}`,
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
        className: `marker out-marker ${h ? "flipped" : ""} ${S ? "at-edge" : ""}`,
        style: { left: c(i) },
        onMouseDown: v("out"),
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
        onMouseDown: v("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${j ? "edge-left" : ""} ${y ? "edge-right" : ""}`, children: x }),
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
  return _s.createPortal(N, document.body);
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
          const E = await k.json();
          i(E), d.current && d.current(E);
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
  const [g, k] = u.useState(null), [E, b] = u.useState(null), P = (v, p) => {
    k(v), b({
      target: v,
      startX: p.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: i,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!g) return;
    const v = e * 0.015, p = (I) => {
      if (g === "minimap-viewport" && (m != null && m.current)) {
        const j = m.current.getBoundingClientRect(), x = Math.max(0, Math.min(I.clientX - j.left, j.width)) / j.width * t, w = Math.max(0, Math.min(x - e / 2, t - e));
        d(w);
        return;
      }
      const S = N(I.clientX);
      if (g === "playhead") {
        let j = S;
        Math.abs(j - l) <= v ? j = l : Math.abs(j - i) <= v && (j = i), r(Math.max(0, Math.min(t, j)));
      } else if (g === "in") {
        const j = i - 1e3;
        o(Math.max(0, Math.min(S, j)));
      } else if (g === "out") {
        const j = l + 1e3;
        a(Math.min(t, Math.max(S, j)));
      } else if (g === "range" && E) {
        const j = S - N(E.startX), y = E.initialOut - E.initialIn;
        let x = E.initialIn + j, w = E.initialOut + j;
        x < 0 ? (x = 0, w = y) : w > t && (w = t, x = t - y), o(x), a(w);
      }
    }, h = () => {
      k(null), b(null);
    };
    return window.addEventListener("mousemove", p), window.addEventListener("mouseup", h), () => {
      window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", h);
    };
  }, [
    g,
    E,
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
  ]), { draggingTarget: g, handleStartDrag: P };
}
const Vs = 4;
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
  onZoomChange: m,
  onZoomReset: g,
  playheadMs: k = 0,
  setPlayheadMs: E,
  inPointMs: b = 0,
  setInPointMs: P,
  outPointMs: v = 36e5,
  setOutPointMs: p,
  onExport: h,
  recordingSegments: I = {},
  movieBoundaries: S,
  viewportStartMs: j = 0,
  onViewportStartChange: y,
  onEstimateLoaded: x,
  onFitRange: w,
  onJumpViewportTo: M,
  keystrokeMode: O = "BURN_IN",
  onChangeKeystrokeMode: z,
  keystrokes: R = [],
  showKeystrokes: W = !1,
  showRulerKeystrokes: ne = !1,
  onToggleRulerKeystrokes: F,
  _onSplitDirectorSegment: G,
  _onChangeDirectorSegmentDisplay: T,
  _onResetDirectorSegmentToAuto: A,
  audioRoutingPlan: D,
  onSplitAudioSegment: H,
  onChangeAudioSegmentStation: _,
  onChangeAudioSegmentGain: ce,
  onFollowVisualFeed: ee,
  isAutoFollowAudio: ie,
  canvasLayoutTimeline: ae,
  activeKfIndex: Be = 0,
  onSelectKeyframe: V,
  onAddKeyframeAtEpoch: q,
  onDeleteKeyframe: de,
  onUpdateKeyframeEpoch: Z,
  onToggleDisplayOnCanvas: le,
  onUpdateAudioPlan: ye
}) {
  var $n, Ee, Se;
  const [Fe, X] = u.useState(null), [Q, fe] = u.useState(0), [ge, we] = u.useState(null), [be, se] = u.useState(!0), [_e, ke] = u.useState(null), Me = u.useRef(null), ze = u.useRef(null), De = d / Math.max(1, N), je = Math.ceil(e.length / Vs) || 1, Qe = u.useMemo(() => {
    const re = Q * Vs;
    return e.slice(re, re + Vs);
  }, [e, Q]);
  u.useEffect(() => {
    if (!t && !_e) return;
    const re = _e || t, We = e.findIndex((Ke) => Ke.id === re);
    if (We !== -1) {
      const Ke = Math.floor(We / Vs);
      Ke !== Q && fe(Ke);
    }
  }, [t, _e, e, Q]);
  const Ue = (($n = ae == null ? void 0 : ae.keyframes) == null ? void 0 : $n[Be]) || ((Ee = ae == null ? void 0 : ae.keyframes) == null ? void 0 : Ee[0]), en = u.useMemo(() => {
    var re;
    return ((re = Ue == null ? void 0 : Ue.layout) == null ? void 0 : re.placements) || [];
  }, [Ue]), et = u.useMemo(() => e.find((re) => re.id === t) || null, [e, t]), Ge = (S == null ? void 0 : S.globalFirstMs) ?? null, ln = (S == null ? void 0 : S.globalLastMs) ?? null, Rt = u.useMemo(() => (b > 500 || v < d - 500) && v - b >= 1e3, [b, v, d]), fn = u.useMemo(() => e.map((re) => re.id).sort().join(","), [e]), { estimateData: He, isEstimating: vt, formatEstimateSize: jn } = nx({
    stationIdsKey: fn,
    inPointMs: b,
    outPointMs: v,
    baseEpochMs: a,
    onEstimateLoaded: x
  }), gt = u.useCallback((re) => {
    if (!Me.current) return j;
    const We = Me.current.getBoundingClientRect(), Ke = We.left + 180, K = We.width - 180 - 58;
    if (K <= 0) return j;
    const ue = Math.max(0, Math.min(re - Ke, K));
    return Math.round(j + ue / K * De);
  }, [j, De]), { draggingTarget: Nt, handleStartDrag: Cn } = sx({
    viewportDurationMs: De,
    totalDurationMs: d,
    playheadMs: k,
    setPlayheadMs: E,
    inPointMs: b,
    setInPointMs: P,
    outPointMs: v,
    setOutPointMs: p,
    viewportStartMs: j,
    setViewportStartMs: y,
    getMsFromClientX: gt,
    minimapRef: ze
  }), kt = u.useRef(N);
  kt.current = N;
  const Tt = u.useRef(j);
  Tt.current = j;
  const Bt = u.useRef(d);
  Bt.current = d;
  const Xt = u.useRef(k);
  Xt.current = k, u.useEffect(() => {
    const re = Me.current;
    if (!re) return;
    const We = (Ke) => {
      Ke.preventDefault(), Ke.stopPropagation();
      const K = Ke.ctrlKey || Ke.shiftKey, ue = kt.current, ve = Tt.current, Ce = Bt.current, Xe = Xt.current;
      if (K) {
        const Je = Math.abs(Ke.deltaX) > Math.abs(Ke.deltaY) ? Ke.deltaX : Ke.deltaY;
        if (Je === 0) return;
        const dt = Ce / Math.max(1, ue), Ze = Math.max(0, Ce - dt), Ye = dt * 0.08 * (Je > 0 ? 1 : -1);
        y == null || y(Math.max(0, Math.min(Ze, ve + Ye)));
      } else {
        if (Ke.deltaY === 0) return;
        const dt = Ke.deltaY < 0 ? 1.25 : 0.8, Ze = Math.max(32, Ce / 2e3), Ye = re.getBoundingClientRect(), at = Ye.left + 180, jt = Ye.width - 180 - 58;
        let ct = 0.5;
        if (jt > 0)
          if (Ke.clientX >= at && Ke.clientX <= Ye.right - 58)
            ct = Math.max(0, Math.min(1, (Ke.clientX - at) / jt));
          else {
            const js = Ce / Math.max(1, ue), Kt = (Xe - ve) / js;
            ct = Kt >= 0 && Kt <= 1 ? Kt : 0.5;
          }
        const $t = Math.max(1, Math.min(Ze, Math.round(ue * dt * 100) / 100));
        if ($t === ue) return;
        const un = Ce / ue, Vt = Ce / $t, Qn = ve + ct * un - ct * Vt, _t = Math.max(0, Ce - Vt);
        m == null || m($t), y == null || y(Math.max(0, Math.min(_t, Qn)));
      }
    };
    return re.addEventListener("wheel", We, { passive: !1, capture: !0 }), () => re.removeEventListener("wheel", We, { capture: !0 });
  }, [m, y]);
  const cn = e.length > 0 && Math.abs(v - b) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Me,
      className: "timeline-board-root",
      onContextMenu: (re) => {
        var Ke;
        re.preventDefault();
        const We = (Ke = Me.current) == null ? void 0 : Ke.getBoundingClientRect();
        !We || re.clientX - We.left < 180 || re.clientX > We.right - 58 || we({ x: re.clientX, y: re.clientY, targetMs: Math.max(0, Math.min(d, gt(re.clientX))) });
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
              setInPointMs: P,
              outPointMs: v,
              setOutPointMs: p
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                Wg,
                {
                  minimapRef: ze,
                  baseEpochMs: a,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: j,
                  viewportDurationMs: De,
                  zoomLevel: N,
                  inPointMs: b,
                  outPointMs: v,
                  playheadMs: k,
                  onStartDragMinimap: Cn
                }
              ),
              /* @__PURE__ */ s.jsx(
                Ug,
                {
                  earliestMediaMs: Ge,
                  latestMediaMs: ln,
                  hasActiveCut: Rt,
                  onJumpToFirst: () => {
                    Ge !== null && (E == null || E(Ge), M == null || M(Ge, "start"));
                  },
                  onJumpToLast: () => {
                    ln !== null && (E == null || E(ln), M == null || M(ln, "end"));
                  },
                  onContextualFit: () => {
                    Rt ? w == null || w(b, v) : Ge !== null && ln !== null && ln > Ge ? w == null || w(Ge, ln) : g == null || g();
                  },
                  onResetZoom: g,
                  baseEpochMs: a,
                  timeMode: c,
                  keystrokeMode: O,
                  onChangeKeystrokeMode: z,
                  showRulerKeystrokes: ne,
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
                viewportDurationMs: De,
                totalDurationMs: d,
                hoverMs: Fe,
                onHoverChange: X,
                onSeek: (re) => E == null ? void 0 : E(re),
                inPointMs: b,
                outPointMs: v,
                earliestMediaMs: Ge,
                movieBoundaries: S,
                stationHostname: (et == null ? void 0 : et.hostname) || (et == null ? void 0 : et.id) || (et == null ? void 0 : et.name),
                activeStationName: (et == null ? void 0 : et.displayName) || (et == null ? void 0 : et.hostname) || (et == null ? void 0 : et.name),
                showKeystrokes: !!(ne ?? W),
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
              disabled: Q === 0,
              onClick: () => fe((re) => Math.max(0, re - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            Q * Vs + 1,
            "–",
            Math.min(e.length, (Q + 1) * Vs),
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
              if (Nt || !Me.current) return;
              const We = Me.current.getBoundingClientRect();
              re.clientX >= We.left + 180 && re.clientX <= We.right - 58 ? X(gt(re.clientX)) : X(null);
            },
            onMouseLeave: () => !Nt && X(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => se((re) => !re), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: be ? "▼" : "▶" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  be && je > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
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
                      Q * Vs + 1,
                      "–",
                      Math.min(e.length, (Q + 1) * Vs),
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
                !be && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => se(!0), children: [
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
                      const Ke = re.startEpochMs - a, K = re.endEpochMs - a, ue = (Math.max(j, Ke) - j) / De * 100, Ce = (Math.min(j + De, K) - j) / De * 100 - ue;
                      if (Ce <= 0) return null;
                      const Xe = Math.round((re.endEpochMs - re.startEpochMs) / 1e3);
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: "gap-full-block gap-global-skipped",
                          style: { left: `${ue}%`, width: `${Ce}%` },
                          title: `Shared Gap: ${Xe}s skipped across all stations`,
                          children: [
                            /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
                            Ce > 5 && /* @__PURE__ */ s.jsx("div", { className: "gap-badge global-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
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
                    b > j && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, (b - j) / De * 100)}%` } }),
                    v < j + De && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, (v - j) / De * 100)}%`, right: 0 } })
                  ] })
                ] }),
                be && (e.length > 0 ? Qe.map((re) => {
                  const We = !!(t && re.id === t), Ke = _e === re.id, K = o ? o[re.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Gg,
                    {
                      station: re,
                      isExpanded: Ke,
                      onToggleExpand: () => ke((ue) => ue === re.id ? null : re.id),
                      isAutoDirectorEnabled: K,
                      onToggleAutoDirector: i,
                      canvasPlacements: en,
                      onToggleDisplayOnCanvas: le,
                      directorPlan: re.directorPlan,
                      isActive: We,
                      onSelect: () => n == null ? void 0 : n(re.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: j,
                      viewportDurationMs: De,
                      inPointMs: b,
                      outPointMs: v,
                      baseEpochMs: a,
                      segments: I[re.id] || I[re.hostname] || re.segments || [],
                      recordingSegments: I,
                      globalGaps: (He == null ? void 0 : He.removedGlobalGaps) || []
                    },
                    re.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Xg,
                  {
                    audioPlan: D,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: De,
                    baseEpochMs: a,
                    playheadMs: k,
                    onSplitSegment: H,
                    onChangeSegmentStation: _,
                    onChangeSegmentGain: ce,
                    onFollowVisualFeed: ee,
                    isAutoFollow: ie,
                    timeMode: c,
                    onUpdateAudioPlan: ye
                  }
                ),
                ((Se = ae == null ? void 0 : ae.keyframes) == null ? void 0 : Se.length) > 0 && /* @__PURE__ */ s.jsx(
                  Qg,
                  {
                    canvasLayoutTimeline: ae,
                    activeKfIndex: Be,
                    onSelectKeyframe: V,
                    onAddKeyframeAtEpoch: q,
                    onDeleteKeyframe: de,
                    onUpdateKeyframeEpoch: Z,
                    viewportStartMs: j,
                    viewportDurationMs: De,
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
                  isRangeValid: cn,
                  onExport: h,
                  isEstimating: vt,
                  estimateData: He,
                  formatEstimateSize: jn,
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
            viewportDurationMs: De,
            playheadMs: k,
            inPointMs: b,
            outPointMs: v,
            onStartDrag: Cn
          }
        ),
        /* @__PURE__ */ s.jsx(
          qg,
          {
            contextMenu: ge,
            baseEpochMs: a,
            timeMode: c,
            onAction: (re) => {
              ge && (re === "playhead" ? E == null || E(ge.targetMs) : re === "in" ? P == null || P(Math.max(0, Math.min(ge.targetMs, v - 1e3))) : re === "out" && (p == null || p(Math.min(d, Math.max(ge.targetMs, b + 1e3)))), we(null));
            },
            onClose: () => we(null)
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
  unselectedInTabCount: E,
  activeTabName: b,
  onSelectAllInScope: P,
  onClearInScope: v,
  viewMode: p = "grid",
  onViewModeChange: h,
  isDrawerMode: I = !1
}) {
  const [S, j] = u.useState(!1), y = N !== "all", x = !b || b.toLowerCase() === "all", w = x ? "Select All" : `Select ${b}`, M = x ? "Clear All" : `Clear ${b}`;
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
            onChange: (O) => t(O.target.value)
          }
        )
      ] }),
      I && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${S ? "open" : ""} ${y ? "has-filter" : ""}`,
          onClick: () => j(!S),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            y && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !I && h && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
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
    l.length > 1 && (I ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (O) => i(O.target.value),
          children: l.map((O) => {
            const z = O.id === "all" ? c.map((W) => W.id) : O.stationIds || [], R = z.filter((W) => d.includes(W)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: O.id, children: [
              O.name,
              " (",
              R,
              "/",
              z.length,
              ")"
            ] }, O.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: P, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: v, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        a && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((O) => {
        const z = o === O.id, R = O.id === "all" ? c.map((F) => F.id) : O.stationIds || [], W = R.length, ne = R.filter((F) => d.includes(F)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${z ? "active" : ""}`,
            onClick: () => i(O.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: O.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${ne > 0 ? "has-selected" : ""}`, children: [
                ne,
                "/",
                W
              ] })
            ]
          },
          O.id
        );
      }) })
    ] })),
    (!I || S) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${I ? "is-collapsed-tray" : ""}`, children: [
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
              E,
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
      !I && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: P, children: [
          "+ ",
          w
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: v, children: [
          "✕ ",
          M
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
    const k = Math.min(n, r), E = Math.min(g, r), b = Math.ceil(r / n), P = Math.ceil(r / g);
    return k !== E || b !== P;
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
        const k = n === g, E = !m(g);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${k ? "active" : ""} ${E ? "redundant-disabled" : ""}`,
            disabled: E,
            onClick: () => o(g),
            title: E ? `All stations already fit on screen (Total: ${r})` : `Show ${g} per page`,
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
              onClick: (E) => {
                E.stopPropagation(), n(g.id);
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
    const y = Hd(0, !0, r);
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
      trafficStatus: y,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const m = l, g = l + o, k = [];
  for (const y of t) {
    const x = Math.max(y.startEpoch, m), w = Math.min(y.endEpoch, g);
    w > x && k.push({ startEpoch: x, endEpoch: w });
  }
  k.sort((y, x) => y.startEpoch - x.endEpoch);
  const E = [];
  for (const y of k)
    if (E.length === 0)
      E.push({ ...y });
    else {
      const x = E[E.length - 1];
      y.startEpoch <= x.endEpoch + 1e3 ? x.endEpoch = Math.max(x.endEpoch, y.endEpoch) : E.push({ ...y });
    }
  let b = 0;
  for (const y of E)
    b += y.endEpoch - y.startEpoch;
  const P = o > 0 ? b / o * 100 : 0, v = P > 0 && P < 1 ? Number(P.toFixed(1)) : Math.min(100, Math.round(P)), p = [];
  let h = m, I = 0;
  for (const y of E) {
    if (y.startEpoch > h + 2e3) {
      const M = (y.startEpoch - h) / o * 100, O = (h - m) / o * 100;
      p.push({
        type: "gap",
        startPct: Math.max(0, O),
        widthPct: Math.min(100, M)
      }), I++;
    }
    const x = (y.endEpoch - y.startEpoch) / o * 100, w = (y.startEpoch - m) / o * 100;
    p.push({
      type: "rec",
      startPct: Math.max(0, w),
      widthPct: Math.min(100, x)
    }), h = y.endEpoch;
  }
  if (h < g - 2e3) {
    const y = (g - h) / o * 100, x = (h - m) / o * 100;
    p.push({
      type: "gap",
      startPct: Math.max(0, x),
      widthPct: Math.min(100, y)
    }), I++;
  }
  const S = I > 0 || v < 100, j = Hd(v, S, r);
  return {
    coveragePct: v,
    recordedDuration: ux(b),
    totalRecordedMs: b,
    hasAudio: i,
    audioChannels: a,
    resolution: c,
    fps: d,
    fileSize: N,
    hasGaps: S,
    gapsCount: I,
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
  baseEpochMs: E = 0,
  durationMs: b = 0
}) {
  const [P, v] = u.useState([]), [p, h] = u.useState("all"), [I, S] = u.useState(""), [j, y] = u.useState(!0), [x, w] = u.useState("all"), [M, O] = u.useState(null), [z, R] = u.useState(!1), [W, ne] = u.useState(15), [F, G] = u.useState(8), [T, A] = u.useState(1), D = u.useRef(!1), H = u.useRef(null), _ = c && r.length === 0, ce = r.length === 0 && !c;
  let ee = "is-closed";
  a || ce || _ ? ee = "is-full-width" : e && (ee = "is-open"), u.useLayoutEffect(() => {
    const se = () => {
      if (!H.current) return;
      const ke = H.current.clientHeight;
      if (ke <= 0) return;
      const Me = H.current.querySelector(".station-row, .hub-table-row"), ze = Me ? Me.offsetHeight : 40;
      if (ze > 0) {
        const je = Math.floor(ke / ze) - 2, Ue = [5, 10, 15, 20, 25, 30].filter((en) => en <= je).pop() || 5;
        ne(Ue);
      }
      const De = H.current.clientWidth;
      if (De > 0) {
        const Ue = Math.max(1, Math.floor((De + 12) / 252)), et = Math.max(1, Math.floor((ke + 12) / (175 + 12))), Ge = Math.max(Ue * et, Ue);
        G(Ge);
      }
    };
    se(), window.addEventListener("resize", se);
    const _e = new ResizeObserver(se);
    return H.current && _e.observe(H.current), () => {
      window.removeEventListener("resize", se), _e.disconnect();
    };
  }, [M, r.length]), u.useEffect(() => {
    if (g && g.length > 0) {
      v(g);
      return;
    }
    if (D.current || !e && !a) return;
    D.current = !0;
    let se = !0;
    return (async () => {
      R(!0);
      try {
        const ke = await fetch("/api/v1/dashboard/tabs");
        if (ke.ok && se) {
          const Me = await ke.json();
          Array.isArray(Me) && v(Me);
        }
      } catch (ke) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", ke);
      } finally {
        se && R(!1);
      }
    })(), () => {
      se = !1;
    };
  }, [e, a, g]);
  const ie = u.useMemo(() => {
    const se = P.length > 0 ? P : g;
    if (se && se.length > 0) {
      const _e = se.map((ke) => {
        const Me = ke.hostnames || ke.assignedHostnames || ke.stations || ke.stationIds || [], ze = r.filter((De) => {
          const je = (De.hostname || De.name || "").trim().toLowerCase();
          return Me.some((Qe) => typeof Qe == "string" ? Qe.trim().toLowerCase() === je || je.includes(Qe.trim().toLowerCase()) : (Qe.hostname || Qe.name || "").trim().toLowerCase() === je);
        }).map((De) => De.id);
        return {
          id: String(ke.id || ke.tabId || ke.name),
          name: ke.name || "Tab",
          stationIds: ze
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((ke) => ke.id) },
        ..._e.filter((ke) => ke.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((_e) => _e.id) }];
  }, [P, g, r]), ae = u.useMemo(() => ie.find((se) => se.id === p) || ie[0], [ie, p]), Be = u.useMemo(() => !ae || ae.id === "all" ? r.map((se) => se.id) : ae.stationIds || [], [ae, r]), V = u.useMemo(() => !k || Object.keys(k).length === 0 ? r.filter((se) => se.isLoaded || se.segments && se.segments.length > 0).length : r.filter((se) => k[se.id] !== void 0 || se.isLoaded).length, [r, k]), q = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && V < r.length && Object.keys(k).length > 0), [d, c, r.length, V, k]), de = u.useMemo(() => {
    const se = /* @__PURE__ */ new Map(), _e = { baseEpochMs: E, durationMs: b };
    for (const ke of r) {
      const ze = !(k && k[ke.id] !== void 0 || ke.isLoaded === !0 || ke.segments && ke.segments.length > 0) && (q || c || d), De = k && k[ke.id] || ke.segments || [], je = hx(ke, De, _e);
      se.set(ke.id, {
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
    return se;
  }, [r, k, E, b, q, c, d]), Z = u.useMemo(() => r.filter((se) => {
    const _e = de.get(se.id), ke = k && k[se.id] && k[se.id].length > 0 || se.segments && se.segments.length > 0, Me = _e && (_e.coveragePct > 0 || _e.totalRecordedMs > 0), ze = typeof se.recordingsCount == "number" && se.recordingsCount > 0;
    return _e && !_e.isLoading ? Me || ke : ze || ke;
  }), [r, de, k]), le = u.useMemo(() => Z.filter((se) => {
    if (ae.id !== "all" && !Be.includes(se.id) || !(se.displayName || se.hostname || se.name || "").toLowerCase().includes(I.toLowerCase())) return !1;
    const ke = l.includes(se.id), Me = de.get(se.id);
    return x === "selected" ? ke : x === "unselected" ? !ke : x === "gaps" ? Me == null ? void 0 : Me.hasGaps : x === "audio" ? Me == null ? void 0 : Me.hasAudio : !0;
  }).sort((se, _e) => j ? (se.displayName || se.hostname || "").localeCompare(_e.displayName || _e.hostname || "") : 0), [Z, ae, Be, I, x, l, j, de]), ye = u.useMemo(() => M !== null ? M : le.length > px ? "table" : "grid", [M, le.length]), Fe = ye === "table" ? W : F, X = Math.max(1, Math.ceil(le.length / Fe));
  u.useEffect(() => {
    A(1);
  }, [p, I, x, ye]), u.useEffect(() => {
    T > X && A(X);
  }, [X, T]);
  const Q = u.useMemo(() => {
    if (ee !== "is-full-width") return le;
    const se = (T - 1) * Fe;
    return le.slice(se, se + Fe);
  }, [le, T, Fe, ee]), fe = () => {
    if (!i) return;
    const se = ae.id === "all" ? le.map((_e) => _e.id) : Be;
    i(Array.from(/* @__PURE__ */ new Set([...l, ...se])));
  }, ge = () => {
    if (!i) return;
    const se = new Set(
      ae.id === "all" ? le.map((_e) => _e.id) : Be
    );
    i(l.filter((_e) => !se.has(_e)));
  }, we = Be.filter((se) => l.includes(se)).length, be = le.filter((se) => l.includes(se.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${ee}`, children: [
    ee !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => ee === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            q && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              V,
              "/",
              r.length
            ] })
          ] })
        ] }),
        ee === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      ee === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: fe,
            disabled: le.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                le.length,
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
            disabled: be === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                be,
                ")"
              ] })
            ]
          }
        )
      ] }),
      q && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? V / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: _ ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
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
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: ee === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      ee === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      ee === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${q ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: q ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: q ? `ANALYZING TIMELINE ARCHIVES • ${V} OF ${Z.length} STATIONS SYNCED (${Z.length > 0 ? Math.min(100, Math.round(V / Z.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${Z.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: q ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
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
          searchTerm: I,
          onSearchChange: S,
          sortAlpha: j,
          onToggleSort: () => y(!j),
          effectiveTabs: ie,
          selectedTabId: p,
          onSelectTab: (se) => {
            h(se), O(null);
          },
          isLoadingTabs: z,
          allStations: Z,
          selectedStationIds: l,
          filterMode: x,
          onFilterModeChange: w,
          filteredCount: le.length,
          selectedInTabCount: we,
          unselectedInTabCount: Be.length - we,
          activeTabName: ae.name,
          onSelectAllInScope: fe,
          onClearInScope: ge,
          viewMode: ye,
          onViewModeChange: ee === "is-full-width" ? O : null,
          isDrawerMode: ee !== "is-full-width"
        }
      ),
      ee === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: fe,
              disabled: le.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  le.length,
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
              disabled: be === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  be,
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
      ee === "is-full-width" && ye === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${ee === "is-full-width" ? ye === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: Q.map((se) => {
            const _e = l.includes(se.id), ke = de.get(se.id);
            return ee === "is-full-width" ? ye === "grid" ? /* @__PURE__ */ s.jsx(
              rx,
              {
                station: se,
                isSelected: _e,
                onToggle: o,
                meta: ke
              },
              se.id
            ) : /* @__PURE__ */ s.jsx(
              lx,
              {
                station: se,
                isSelected: _e,
                onToggle: o,
                meta: ke
              },
              se.id
            ) : /* @__PURE__ */ s.jsx(
              ox,
              {
                station: se,
                isSelected: _e,
                onToggle: o,
                meta: ke
              },
              se.id
            );
          })
        }
      ),
      ee === "is-full-width" && /* @__PURE__ */ s.jsx(
        ax,
        {
          currentPage: T,
          totalPages: X,
          pageSize: Fe,
          totalItems: le.length,
          onPageChange: A,
          onPageSizeChange: (se) => {
            ye === "table" ? ne(se) : G(se), A(1);
          },
          viewMode: ye
        }
      ),
      ee === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
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
const bn = (e) => String(e).padStart(2, "0"), gx = [
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
  }, [e]), E = u.useMemo(() => m >= 12, [m]);
  u.useEffect(() => {
    a(e);
  }, [e]);
  const b = () => {
    const M = i.replace(/[^0-9:]/g, "").trim().split(":").filter((ne) => ne.length > 0);
    let O = 0, z = 0, R = 0;
    M.length >= 1 && (O = Math.min(23, Math.max(0, parseInt(M[0], 10) || 0))), M.length >= 2 && (z = Math.min(59, Math.max(0, parseInt(M[1], 10) || 0))), M.length >= 3 && l && (R = Math.min(59, Math.max(0, parseInt(M[2], 10) || 0)));
    const W = l ? `${bn(O)}:${bn(z)}:${bn(R)}` : `${bn(O)}:${bn(z)}`;
    a(W), t && t(W, { h: O, m: z, s: R });
  }, P = (w) => {
    let M = m;
    w === "AM" && m >= 12 ? M = m - 12 : w === "PM" && m < 12 && (M = m + 12);
    const O = l ? `${bn(M)}:${bn(g)}:${bn(k)}` : `${bn(M)}:${bn(g)}`;
    a(O), t && t(O, { h: M, m: g, s: k });
  }, v = u.useCallback((w, M) => {
    if (!N.current) return null;
    const O = N.current.getBoundingClientRect(), z = O.left + O.width / 2, R = O.top + O.height / 2, W = w.clientX - z, ne = w.clientY - R;
    let F = Math.atan2(ne, W) * 180 / Math.PI + 90;
    if (F < 0 && (F += 360), M === "hours") {
      const G = Math.round(F / 30) % 12;
      return E ? G === 0 ? 12 : G + 12 : G === 0 ? 0 : G;
    }
    return Math.round(F / 6) % 60;
  }, [E]), p = u.useCallback((w, M) => {
    let O = m, z = g, R = k;
    w === "hours" ? O = M : w === "minutes" ? z = M : w === "seconds" && (R = M);
    const W = l ? `${bn(O)}:${bn(z)}:${bn(R)}` : `${bn(O)}:${bn(z)}`;
    a(W), t && t(W, { h: O, m: z, s: R });
  }, [m, g, k, l, t]), h = (w, M) => {
    M.preventDefault(), M.stopPropagation(), d(w);
    const O = v(M, w);
    O !== null && p(w, O);
  };
  u.useEffect(() => {
    if (!c) return;
    const w = (O) => {
      const z = v(O, c);
      z !== null && p(c, z);
    }, M = () => {
      d(null);
    };
    return window.addEventListener("pointermove", w), window.addEventListener("pointerup", M), () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", M);
    };
  }, [c, v, p]);
  const I = u.useMemo(() => m % 12 * 30, [m]), S = u.useMemo(() => g % 60 * 6, [g]), j = u.useMemo(() => k % 60 * 6, [k]), y = E ? xx : gx, x = u.useMemo(() => {
    const w = [];
    for (let M = 0; M < 60; M++) {
      const O = (M * 6 - 90) * (Math.PI / 180), z = M % 5 === 0, R = 104, W = z ? 93 : 98;
      w.push({
        index: M,
        x1: 110 + W * Math.cos(O),
        y1: 110 + W * Math.sin(O),
        x2: 110 + R * Math.cos(O),
        y2: 110 + R * Math.sin(O),
        isMajor: z
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
              className: `btn-period ${E ? "" : "active"}`,
              onClick: () => P("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${E ? "active" : ""}`,
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
          y.map((w) => {
            const M = (w.angle - 90) * (Math.PI / 180), O = 76, z = 110 + O * Math.cos(M), R = 110 + O * Math.sin(M), W = m === w.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: z,
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
const _o = 7 * 24 * 60 * 60 * 1e3, Lt = (e) => String(e).padStart(2, "0");
function yx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: i
}) {
  const [a, c] = u.useState(""), [d, N] = u.useState(""), [m, g] = u.useState("00:00:00"), [k, E] = u.useState("00:00:00"), [b, P] = u.useState(() => /* @__PURE__ */ new Date()), [v, p] = u.useState(null), [h, I] = u.useState([]), [S, j] = u.useState(!1), [y, x] = u.useState(""), [w, M] = u.useState(1), [O, z] = u.useState(2), [R, W] = u.useState(null), ne = u.useCallback(() => {
    try {
      const X = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (X) {
        const Q = JSON.parse(X);
        Array.isArray(Q) && I(Q);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((X) => X.ok ? X.json() : null).then((X) => {
      Array.isArray(X) && X.length > 0 && I(X);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    ne();
    let X = n == null ? void 0 : n.startEpochMs, Q = n == null ? void 0 : n.endEpochMs;
    if (!X || isNaN(X))
      if (n != null && n.start) {
        const we = String(n.start).replace(" ", "T"), be = new Date(we).getTime();
        X = isNaN(be) ? Date.now() - 24 * 3600 * 1e3 : be;
      } else
        Q = Date.now(), X = Q - 24 * 3600 * 1e3;
    if (!Q || isNaN(Q))
      if (n != null && n.end) {
        const we = String(n.end).replace(" ", "T"), be = new Date(we).getTime();
        Q = isNaN(be) ? Date.now() : be;
      } else
        Q = X + 24 * 3600 * 1e3;
    W(null);
    const fe = Cr(X, o), ge = Cr(Q, o);
    c(`${fe.year}-${Lt(fe.month)}-${Lt(fe.day)}`), N(`${ge.year}-${Lt(ge.month)}-${Lt(ge.day)}`), g(`${Lt(fe.hour)}:${Lt(fe.minute)}:${Lt(fe.second)}`), E(`${Lt(ge.hour)}:${Lt(ge.minute)}:${Lt(ge.second)}`), P(new Date(Date.UTC(fe.year, fe.month - 1, 1)));
  }, [e, n, o, ne]);
  const F = u.useCallback(() => {
    a && !d && N(a);
  }, [a, d]), G = d || a, T = u.useMemo(() => a ? `${a}T${m}` : "", [a, m]), A = u.useMemo(() => G ? `${G}T${k}` : "", [G, k]), D = u.useMemo(() => {
    const X = {};
    return h.forEach((Q) => {
      const fe = Q.startTime || Q.start, ge = Q.endTime || Q.end || fe;
      if (!fe) return;
      const we = String(fe).substring(0, 10), be = String(ge).substring(0, 10), [se, _e, ke] = we.split("-").map(Number), [Me, ze, De] = be.split("-").map(Number);
      if (isNaN(se) || isNaN(_e) || isNaN(ke) || isNaN(Me) || isNaN(ze) || isNaN(De)) return;
      let je = new Date(Date.UTC(se, _e - 1, ke));
      const Qe = new Date(Date.UTC(Me, ze - 1, De));
      for (; je.getTime() <= Qe.getTime(); ) {
        const Ue = `${je.getUTCFullYear()}-${Lt(je.getUTCMonth() + 1)}-${Lt(je.getUTCDate())}`;
        X[Ue] || (X[Ue] = []), X[Ue].push(Q), je.setUTCDate(je.getUTCDate() + 1);
      }
    }), X;
  }, [h]), H = async (X, Q) => {
    if (Q && Q.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const fe = h.filter((ge) => (ge.id || ge.startTime) !== X);
    I(fe);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(fe)), localStorage.setItem("itb_bookmarks", JSON.stringify(fe)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: fe }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${X}`, { method: "DELETE" });
    } catch {
    }
  }, _ = (X) => {
    const Q = X.startTime || X.start, fe = X.endTime || X.end;
    if (!Q || !fe) return;
    const ge = Q.substring(0, 10), we = Q.includes("T") ? Q.split("T")[1].substring(0, 8) : "00:00:00", be = fe.substring(0, 10), se = fe.includes("T") ? fe.split("T")[1].substring(0, 8) : "23:59:59";
    c(ge), N(be), g(we), E(se);
    const [_e, ke] = ge.split("-").map(Number);
    P(new Date(Date.UTC(_e, ke - 1, 1))), j(!1);
  }, ce = (X) => {
    l ? (l(X), t && t()) : _(X);
  }, ee = u.useMemo(() => {
    if (o === "UTC" || !T.includes("T")) return { isAmbiguous: !1 };
    const [X, Q] = T.split("T");
    return Ci(X, Q);
  }, [T, o]), ie = u.useMemo(() => {
    if (o === "UTC" || !A.includes("T")) return { isAmbiguous: !1 };
    const [X, Q] = A.split("T");
    return Ci(X, Q);
  }, [A, o]), ae = u.useMemo(() => {
    if (!a || !G) return null;
    const X = yc(a, m, o, w), Q = yc(G, k, o, O);
    return X === null || Q === null || isNaN(X) || isNaN(Q) ? null : { startEpoch: X, endEpoch: Q, durationMs: Q - X };
  }, [a, m, G, k, o, w, O]), Be = u.useMemo(() => !ae || ae.durationMs <= 0 ? [] : up(ae.startEpoch, ae.endEpoch), [ae]), V = u.useMemo(() => {
    if (!ae || ae.durationMs <= 0) return "0h";
    const X = ae.durationMs / (1e3 * 60 * 60);
    return X >= 24 ? `${(X / 24).toFixed(1)}d (${X.toFixed(0)}h)` : `${X.toFixed(1)}h`;
  }, [ae]), q = u.useMemo(() => {
    const X = b.getUTCFullYear(), Q = b.getUTCMonth(), fe = new Date(Date.UTC(X, Q, 1)).getUTCDay(), ge = new Date(Date.UTC(X, Q + 1, 0)).getUTCDate(), we = [];
    for (let be = 0; be < fe; be++) we.push(null);
    for (let be = 1; be <= ge; be++) we.push(`${X}-${Lt(Q + 1)}-${Lt(be)}`);
    return we;
  }, [b]), de = (X) => {
    if (X) {
      if (W(null), !a || a && d)
        c(X), N("");
      else if (a && !d)
        if (X < a)
          c(X), N("");
        else {
          const Q = (/* @__PURE__ */ new Date(a + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(X + "T00:00:00Z")).getTime() - Q > _o) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const ge = new Date(Q + _o);
            N(`${ge.getUTCFullYear()}-${Lt(ge.getUTCMonth() + 1)}-${Lt(ge.getUTCDate())}`);
          } else
            N(X);
        }
    }
  }, Z = (X, Q) => {
    W(Q);
    const fe = Date.now(), ge = fe - X, we = Cr(ge, o), be = Cr(fe, o);
    c(`${we.year}-${Lt(we.month)}-${Lt(we.day)}`), N(`${be.year}-${Lt(be.month)}-${Lt(be.day)}`), g(`${Lt(we.hour)}:${Lt(we.minute)}:${Lt(we.second)}`), E(`${Lt(be.hour)}:${Lt(be.minute)}:${Lt(be.second)}`), P(new Date(Date.UTC(we.year, we.month - 1, 1)));
  }, le = () => {
    if (F(), !ae || isNaN(ae.startEpoch) || isNaN(ae.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (ae.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (ae.durationMs > _o) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: T,
      end: A,
      startEpochMs: ae.startEpoch,
      endEpochMs: ae.endEpoch,
      durationMs: ae.durationMs,
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
  const Fe = o === "UTC";
  return _s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (X) => X.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${Fe ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: Fe ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            i && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Fe ? "" : "active"}`,
                  onClick: () => i("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Fe ? "active" : ""}`,
                  onClick: () => i("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${S ? "active" : ""}`,
                onClick: () => j(!S),
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
      Be.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Be.map((X) => `${X.description} (${X.labelBefore} ➔ ${X.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${R === "7d" ? "active" : ""}`,
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
            className: `btn-preset ${R === "3d" ? "active" : ""}`,
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
            className: `btn-preset ${R === "24h" ? "active" : ""}`,
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
            className: `btn-preset ${R === "8h" ? "active" : ""}`,
            onClick: () => Z(8 * 3600 * 1e3, "8h"),
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
                value: y,
                onChange: (X) => x(X.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            ye.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: ye.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : ye.map((X) => {
          var be;
          const Q = X.id || X.startTime, fe = X.title || X.name || "Untitled Mission", ge = (X.startTime || "").replace("T", " "), we = (X.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => _(X), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: fe }),
                X.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  X.cutStationName
                ] }),
                ((be = X.stationIds) == null ? void 0 : be.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
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
                  onClick: (se) => {
                    se.stopPropagation(), _(X);
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
                    se.stopPropagation(), ce(X);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (se) => H(Q, se),
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: q.map((X, Q) => {
            if (!X) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${Q}`);
            const fe = parseInt(X.split("-")[2], 10), ge = X === a, we = X === (d || a), be = d || v, se = a && be && X > a && X < be, _e = D[X], ke = !!(_e && _e.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${ge ? "start-edge" : ""} ${we ? "end-edge" : ""} ${se ? "in-range" : ""} ${ke ? "has-bookmark" : ""}`,
                onClick: () => de(X),
                onMouseEnter: () => !d && a && p(X),
                onMouseLeave: () => p(null),
                title: ke ? `${_e.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: fe }),
                  ke && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Me) => {
                        Me.stopPropagation(), j(!0), x(X);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        _e.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: _e.length })
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: F, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Vd,
            {
              label: "START TIME (FROM)",
              value: m,
              onChange: (X) => {
                F(), g(X), W(null);
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
              onChange: (X) => {
                F(), E(X), W(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (ee.isAmbiguous || ie.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        ee.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
            ee.transition.labelBefore,
            " / ",
            ee.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: w === 1 ? "active" : "",
                onClick: () => M(1),
                children: [
                  "1st Occurrence (",
                  ee.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: w === 2 ? "active" : "",
                onClick: () => M(2),
                children: [
                  "2nd Occurrence (",
                  ee.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        ie.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
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
                className: O === 1 ? "active" : "",
                onClick: () => z(1),
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
                className: O === 2 ? "active" : "",
                onClick: () => z(2),
                children: [
                  "2nd Occurrence (",
                  ie.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: ae && ae.durationMs > _o ? "#f43f5e" : "#22d3ee" }, children: V }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Be.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: le, children: "APPLY SCOPE" })
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
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [i, a] = u.useState([]), [c, d] = u.useState(""), [N, m] = u.useState(!1), [g, k] = u.useState(!1), [E, b] = u.useState(null), [P, v] = u.useState(""), p = u.useCallback((R) => {
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
        const W = await R.json(), ne = Array.isArray(W) ? W : [];
        a(ne), p(ne);
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
  const I = async () => {
    var ee, ie, ae, Be, V, q;
    if (!c.trim() || g) return;
    const R = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((ee = n == null ? void 0 : n.timeRange) != null && ee.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), W = (n == null ? void 0 : n.inPointMs) ?? 0, ne = (n == null ? void 0 : n.outPointMs) ?? (((ie = n == null ? void 0 : n.timeRange) == null ? void 0 : ie.durationMs) || 0), F = (n == null ? void 0 : n.playheadMs) ?? W, G = R + W, T = R + ne, A = R + F, D = (n == null ? void 0 : n.selectedStationIds) || [], H = (n == null ? void 0 : n.selectedStationNames) || [], _ = ((ae = n == null ? void 0 : n.allStationIds) == null ? void 0 : ae.length) > 0 ? n.allStationIds : D, ce = {
      title: c.trim(),
      startTime: ((Be = n == null ? void 0 : n.timeRange) == null ? void 0 : Be.start) || "",
      endTime: ((V = n == null ? void 0 : n.timeRange) == null ? void 0 : V.end) || "",
      baseEpochMs: R,
      timelineBaseEpochMs: R,
      inPointMs: W,
      outPointMs: ne,
      playheadMs: F,
      inEpochMs: G,
      outEpochMs: T,
      playheadEpochMs: A,
      selectedStationIds: D,
      selectedStationNames: H,
      allStationIds: _,
      stationIds: D.length > 0 ? D : _,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    k(!0);
    try {
      const de = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ce)
      });
      if (de.ok) {
        const Z = await de.json(), ye = [{
          ...ce,
          ...Z.bookmark || {},
          inEpochMs: G,
          outEpochMs: T,
          playheadEpochMs: A,
          selectedStationIds: D,
          selectedStationNames: H,
          allStationIds: _,
          id: ((q = Z.bookmark) == null ? void 0 : q.id) || Z.id || `bm_${Date.now()}`
        }, ...i];
        a(ye), p(ye), d("");
      } else
        throw new Error(`Server returned ${de.status}`);
    } catch (de) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", de);
      const le = [{
        ...ce,
        inEpochMs: G,
        outEpochMs: T,
        playheadEpochMs: A,
        selectedStationIds: D,
        selectedStationNames: H,
        allStationIds: _,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...i];
      a(le), p(le), d("");
    } finally {
      k(!1);
    }
  }, S = async (R, W) => {
    if (W.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ne = i.filter((F) => (F.id || F.startTime) !== R);
    a(ne), p(ne);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, { method: "DELETE" });
    } catch (F) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", F);
    }
  }, j = (R, W) => {
    W.stopPropagation(), b(R.id || R.startTime), v(R.title || R.name || "");
  }, y = async (R, W) => {
    if (W && W.stopPropagation(), !P.trim()) return;
    const ne = i.find((T) => (T.id || T.startTime) === R), F = P.trim(), G = i.map(
      (T) => (T.id || T.startTime) === R ? { ...T, title: F, name: F } : T
    );
    a(G), p(G), b(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ne, title: F })
      });
    } catch (T) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", T);
    }
  }, x = (R) => {
    R.stopPropagation(), b(null);
  }, w = (R) => !R || isNaN(R) ? "--:--:--" : yt(R, o), M = (R) => {
    const W = R.startTime || R.StartTime, ne = R.endTime || R.EndTime;
    if (!W) return "--";
    const F = String(W).replace("T", " ").substring(0, 19), G = ne ? String(ne).replace("T", " ").substring(0, 19) : F;
    return `${F} ➔ ${G}`;
  }, O = (R) => {
    let W = R.inEpochMs || R.InEpochMs, ne = R.outEpochMs || R.OutEpochMs;
    if (!W || !ne) {
      const F = R.timelineBaseEpochMs || R.baseEpochMs || (R.startTime ? new Date(String(R.startTime).replace(" ", "T")).getTime() : 0), G = R.inPointMs ?? R.InPointMs, T = R.outPointMs ?? R.OutPointMs;
      F && typeof G == "number" && typeof T == "number" && (G > 0 || T > 0) && (W = F + G, ne = F + T);
    }
    if (W && ne && !isNaN(W) && !isNaN(ne) && W > 0) {
      const F = w(W), G = w(ne), T = Math.max(0, ne - W), A = Math.floor(T / 6e4), D = Math.floor(A / 60), H = A % 60, _ = D > 0 ? `${D}h ${H}m` : `${A}m`;
      return { timeText: `${F} ➔ ${G}`, duration: _ };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, z = (R) => {
    const W = R.selectedStationNames || [], ne = R.selectedStationIds || R.cutStationIds || R.stationIds || [];
    return W.length > 0 ? W.join(", ") : ne.length > 0 ? ne.join(", ") : R.cutStationName ? R.cutStationName : R.activeStationName ? R.activeStationName : "All Stations in Scope";
  };
  return _s.createPortal(
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
              disabled: g,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !g ? "active" : ""}`,
            onClick: I,
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
        var A, D, H;
        const W = R.id || R.startTime, ne = E === W, F = O(R), G = z(R), T = ((A = R.allStationIds) == null ? void 0 : A.length) || ((D = R.selectedStationIds) == null ? void 0 : D.length) || ((H = R.stationIds) == null ? void 0 : H.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${ne ? "is-editing" : ""}`,
            onClick: () => {
              ne || (r && r(R), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                ne ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (_) => _.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: P,
                      onChange: (_) => v(_.target.value),
                      onKeyDown: (_) => {
                        _.key === "Enter" && y(W, _), _.key === "Escape" && x(_);
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
                        onClick: (_) => y(W, _),
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
                    /* @__PURE__ */ s.jsx("strong", { children: M(R) })
                  ] }),
                  T > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    T,
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
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${G}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: G })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (_) => _.stopPropagation(), children: [
                !ne && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (_) => j(R, _),
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
                    onClick: (_) => S(W, _),
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
    let m = 1 / 0, g = 1 / 0, k = -1 / 0, E = -1 / 0;
    e.forEach((v) => {
      const p = v.x ?? v.X ?? 0, h = v.y ?? v.Y ?? 0, I = v.width ?? v.Width ?? 1920, S = v.height ?? v.Height ?? 1080;
      m = Math.min(m, p), g = Math.min(g, h), k = Math.max(k, p + I), E = Math.max(E, h + S);
    });
    const b = Math.max(1, k - m), P = Math.max(1, E - g);
    return { minX: m, minY: g, totalW: b, totalH: P };
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
              const k = m.displayId ?? m.DisplayId ?? `mon-${g}`, E = (m.x ?? m.X ?? 0) - i.minX, b = (m.y ?? m.Y ?? 0) - i.minY, P = m.width ?? m.Width ?? 1920, v = m.height ?? m.Height ?? 1080, p = k === t;
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
                        x: E + 10,
                        y: b + 10,
                        width: Math.max(10, P - 20),
                        height: Math.max(10, v - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: E + P / 2,
                        y: b + v / 2,
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
  showWatermark: E = !0,
  directorPlan: b,
  onOverrideDisplay: P,
  onResetOverride: v,
  viewMode: p,
  onViewModeChange: h,
  onOpenFullscreen: I,
  isPipSwapped: S,
  onPipSwapChange: j,
  className: y = ""
}) {
  const x = u.useRef(null), w = u.useRef(null), M = u.useRef(null), O = u.useRef(r), z = u.useRef(r), R = u.useRef(r), W = u.useRef(!1), ne = u.useRef(null), F = u.useRef(o), G = u.useRef(!1);
  O.current = r;
  const T = e == null ? void 0 : e.id, A = e && (e.hostname || e.name) || "", D = u.useMemo(() => {
    var Ce, Xe, Je, dt;
    const K = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ce = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ce.displays) || ((Xe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Xe.Displays) || ((Je = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : Je.Displays) || ((dt = e == null ? void 0 : e.topology) == null ? void 0 : dt.displays) || [];
    if (!Array.isArray(K) || K.length === 0) return [];
    const ue = K.length > 1 && K.every((Ze) => (Ze.X ?? Ze.x ?? 0) === 0 && (Ze.Y ?? Ze.y ?? 0) === 0);
    let ve = 0;
    return K.map((Ze, Ye) => {
      const at = Ze.Width || Ze.width || 1920, jt = Ze.Height || Ze.height || 1080, ct = ue ? ve : Ze.X ?? Ze.x ?? Ye * at, $t = ue ? 0 : Ze.Y ?? Ze.y ?? 0;
      ue && (ve += at);
      const un = (Ze.displayId ?? Ze.DisplayId ?? `mon-${Ye}`).toLowerCase(), Vt = Ze.displayNumber ?? Ze.DisplayNumber ?? Ye + 1, _t = (Ze.displayName || Ze.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${Vt}`, js = !!(Ze.isPrimary ?? Ze.IsPrimary ?? Ye === 0);
      return {
        ...Ze,
        displayId: un,
        DisplayId: un,
        displayIndex: Ye,
        displayNumber: Vt,
        DisplayNumber: Vt,
        displayName: _t,
        DisplayName: _t,
        isPrimary: js,
        IsPrimary: js,
        x: ct,
        y: $t,
        X: ct,
        Y: $t,
        width: at,
        height: jt,
        Width: at,
        Height: jt
      };
    });
  }, [e]), H = D.length > 1, [_, ce] = u.useState(() => {
    if (!H) return "mon-0";
    try {
      const K = localStorage.getItem("itb_solo_viewmode");
      if (K) return K;
    } catch {
    }
    return "canvas";
  }), ie = H ? p !== void 0 ? p : _ : "mon-0", ae = u.useCallback((K) => {
    const ue = typeof K == "function" ? K(ie) : K;
    ce(ue);
    try {
      localStorage.setItem("itb_solo_viewmode", ue);
    } catch {
    }
    h && h(ue);
  }, [ie, h]), [Be, V] = u.useState(!1), q = S !== void 0 ? S : Be, de = u.useCallback((K) => {
    const ue = typeof K == "function" ? K(q) : K;
    V(ue), j && j(ue);
  }, [q, j]), Z = u.useMemo(() => {
    const K = b || (e == null ? void 0 : e.directorPlan);
    if (!K || !K.segments || K.segments.length === 0) return null;
    const ue = t + r;
    return K.segments.find((ve) => {
      const Ce = ve.startEpochMs ?? ve.StartEpochMs ?? 0, Xe = ve.endEpochMs ?? ve.EndEpochMs ?? 0;
      return ue >= Ce && ue <= Xe;
    }) || K.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t, r]), le = u.useMemo(() => {
    var K, ue;
    if (!H) return "mon-0";
    if (ie === "split" || ie === "pip" || ie === "canvas" || ie === "all-displays") {
      const ve = (((K = D[0]) == null ? void 0 : K.displayId) ?? "mon-0").toLowerCase(), Ce = (((ue = D[1]) == null ? void 0 : ue.displayId) ?? "mon-1").toLowerCase();
      return q ? Ce : ve;
    }
    return ie !== "director" ? ie.toLowerCase() : ((Z == null ? void 0 : Z.targetDisplayId) ?? (Z == null ? void 0 : Z.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [H, ie, Z, D, q]), ye = u.useMemo(() => {
    var ue;
    if (!H) return null;
    const K = D.find((ve) => (ve.displayId ?? ve.DisplayId ?? "").toLowerCase() !== le);
    return K ? (K.displayId ?? K.DisplayId).toLowerCase() : (((ue = D[1]) == null ? void 0 : ue.displayId) || "mon-1").toLowerCase();
  }, [H, D, le]), Fe = u.useMemo(() => {
    const K = D.find((ve) => (ve.displayId ?? "").toLowerCase() === (le || "").toLowerCase());
    if (K) return K.displayName || `Screen ${K.displayNumber || 1}`;
    if (le === "mon-0" || le === "0") return "Screen 1";
    if (le === "mon-1" || le === "1") return "Screen 2";
    const ue = (le || "").match(/\d+/);
    if (ue) {
      const ve = parseInt(ue[0], 10);
      return `Screen ${(le || "").startsWith("mon-") ? ve + 1 : ve}`;
    }
    return (le || "Screen 1").toUpperCase();
  }, [D, le]), X = u.useMemo(() => {
    const K = D.find((ue) => (ue.displayId ?? "").toLowerCase() === (ye || "").toLowerCase());
    return K ? K.displayName || `Screen ${K.displayNumber || 2}` : "Screen 2";
  }, [D, ye]), Q = u.useMemo(() => ie !== "director" && ie !== "split" && ie !== "pip" && ie !== "canvas" ? !0 : !!((Z == null ? void 0 : Z.isManualOverride) ?? (Z == null ? void 0 : Z.IsManualOverride)), [ie, Z]), [fe, ge] = u.useState({}), we = u.useRef(null), [be, se] = u.useState({ width: 0, height: 0 }), _e = u.useMemo(() => wx(D), [D]);
  u.useEffect(() => {
    if (!H || ie !== "canvas" && ie !== "all-displays" || o)
      return;
    const K = () => {
      const ve = we.current;
      if (!ve) return;
      const Ce = 48, Xe = 72, Je = Math.max(100, ve.clientWidth - Ce), dt = Math.max(100, ve.clientHeight - Xe), Ze = _e.totalWidth || 1920, Ye = _e.totalHeight || 1080, at = Ze / Ye;
      let jt = Je, ct = jt / at;
      ct > dt && (ct = dt, jt = ct * at), se({ width: Math.round(jt), height: Math.round(ct) });
    };
    K();
    const ue = new ResizeObserver(K);
    return we.current && ue.observe(we.current), () => ue.disconnect();
  }, [H, ie, _e]);
  const ke = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!H || ie !== "canvas" && ie !== "all-displays")
      return;
    let K = !0;
    const ue = new AbortController(), ve = ke;
    D.forEach((Xe, Je) => {
      const dt = (Xe.displayId ?? Xe.DisplayId ?? `mon-${Je}`).toLowerCase(), Ze = Mn.get(A, ve, dt);
      Ze ? ge((Ye) => ({ ...Ye, [dt]: Ze })) : Mn.fetchFrame(A, ve, ue.signal, dt).then((Ye) => {
        K && Ye && ge((at) => ({ ...at, [dt]: Ye }));
      });
    });
    const Ce = Mn.subscribe((Xe, Je, dt, Ze) => {
      Xe === A && Je === ve && Ze && K && ge((Ye) => ({ ...Ye, [Ze.toLowerCase()]: dt }));
    });
    return () => {
      K = !1, ue.abort(), Ce();
    };
  }, [H, ie, D, A, ke]);
  const Me = u.useRef(le), ze = u.useMemo(() => e ? g[e.id] || g[e.hostname] || e.segments || [] : [], [e, g]), De = t + r, je = u.useMemo(() => ze.length === 0 ? !0 : ze.some((K) => {
    const ue = (K.startEpochMs ?? K.startEpoch ?? 0) - 2e3, ve = (K.endEpochMs ?? K.endEpoch ?? 0) + 2e3;
    return De >= ue && De <= ve;
  }), [ze, De]), Qe = !je && ze.length > 0, [Ue, en] = u.useState("A"), [et, Ge] = u.useState(""), [ln, Rt] = u.useState(""), [fn, He] = u.useState(""), [vt, jn] = u.useState(null), [gt, Nt] = u.useState(!1), [Cn, kt] = u.useState(!1), [Tt, Bt] = u.useState(() => {
    if (!A) return null;
    const K = Math.round(t + r);
    return Mn.get(A, K, le) || null;
  }), [Xt, cn] = u.useState(null), $n = Ue === "A" ? x : w, Ee = u.useCallback(() => {
    const K = al();
    x.current && (x.current.volume = K.volume, x.current.muted = Ue !== "A" || K.isMuted, x.current.defaultPlaybackRate = a, x.current.playbackRate = a, Ue === "A" && !K.isMuted && Ei(x.current)), w.current && (w.current.volume = K.volume, w.current.muted = Ue !== "B" || K.isMuted, w.current.defaultPlaybackRate = a, w.current.playbackRate = a, Ue === "B" && !K.isMuted && Ei(w.current)), M.current && (M.current.muted = !0, M.current.defaultPlaybackRate = a, M.current.playbackRate = a);
  }, [Ue, a]);
  u.useEffect(() => {
    const K = (ue) => {
      ue.detail && (x.current && (x.current.volume = ue.detail.volume), w.current && (w.current.volume = ue.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", K), () => window.removeEventListener("itb-audio-state-changed", K);
  }, []), u.useEffect(() => {
    x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a), w.current && (w.current.defaultPlaybackRate = a, w.current.playbackRate = a), M.current && (M.current.defaultPlaybackRate = a, M.current.playbackRate = a);
  }, [a]), u.useEffect(() => {
    if (!T || !A) return;
    if (o) {
      F.current = !0;
      return;
    }
    const K = F.current;
    F.current = o;
    let ue = !0;
    const ve = new AbortController(), Ce = Math.round(t + r), Xe = Mn.get(A, Ce, le);
    if (Xe) {
      Bt(Xe);
      return;
    }
    const dt = setTimeout(() => {
      ue && Mn.fetchFrame(A, Ce, ve.signal, le).then((Ye) => {
        ue && Ye && Bt(Ye);
      });
    }, K ? 25 : 35), Ze = Mn.subscribe((Ye, at, jt, ct) => {
      Ye === A && at === Ce && (!ct || ct === le) && ue && Bt(jt);
    });
    return () => {
      ue = !1, clearTimeout(dt), ve.abort(), Ze();
    };
  }, [T, A, t, r, o, gt, le]), u.useEffect(() => {
    if (!H || ie !== "split" && ie !== "pip" || !ye || o) {
      cn(null);
      return;
    }
    let K = !0;
    const ue = new AbortController(), ve = Math.round(t + r), Ce = Mn.get(A, ve, ye);
    if (Ce) {
      cn(Ce);
      return;
    }
    const Xe = setTimeout(() => {
      K && Mn.fetchFrame(A, ve, ue.signal, ye).then((dt) => {
        K && dt && cn(dt);
      });
    }, 40), Je = Mn.subscribe((dt, Ze, Ye, at) => {
      dt === A && Ze === ve && (!at || at === ye) && K && cn(Ye);
    });
    return () => {
      K = !1, clearTimeout(Xe), ue.abort(), Je();
    };
  }, [H, ie, ye, T, A, t, r]);
  const Se = u.useCallback((K, ue = le) => {
    const ve = Math.round(t), Ce = Math.round(t + n), Xe = Math.min(Ce, Math.max(ve, Math.round(t + K)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(A)}&startEpoch=${ve}&endEpoch=${Ce}&seekEpoch=${Xe}&displayId=${encodeURIComponent(ue)}&_t=${Date.now()}`;
  }, [t, n, A, le]);
  u.useEffect(() => {
    if (!(!T || !A))
      if (o && je) {
        const K = O.current;
        z.current = K, R.current = K, W.current = !1;
        const ue = Se(K, le);
        Nt(!1), kt(!0), en("A"), Ge(ue), Rt(""), jn(null), He((ie === "split" || ie === "pip") && ye ? Se(K, ye) : "");
      } else o || (ne.current && clearTimeout(ne.current), W.current = !1, Ge(""), Rt(""), He(""), jn(null), Nt(!1), kt(!1), x.current && x.current.pause(), w.current && w.current.pause(), M.current && M.current.pause());
  }, [o, T, A, je, Se, le, ie, ye]), u.useEffect(() => {
    if (Me.current !== le && (Me.current = le, o && je)) {
      const K = O.current;
      z.current = K;
      const ue = Se(K, le);
      Nt(!1), kt(!0), en("A"), Ge(ue), Rt("");
    }
  }, [le, o, je, Se]), u.useEffect(() => {
    if (!T || !A) return;
    const K = Math.abs(r - R.current);
    if (!o || K < 15) {
      R.current = r;
      return;
    }
    return W.current = !0, R.current = r, z.current = r, x.current && x.current.pause(), w.current && w.current.pause(), M.current && M.current.pause(), Nt(!1), kt(!0), ne.current && clearTimeout(ne.current), ne.current = setTimeout(() => {
      if (!je) {
        Ge(""), Rt(""), He(""), kt(!1), W.current = !1;
        return;
      }
      const ue = O.current, ve = Se(ue, le);
      en("A"), Ge(ve), Rt(""), jn(null), (ie === "split" || ie === "pip") && ye && He(Se(ue, ye));
    }, 75), () => {
      ne.current && clearTimeout(ne.current);
    };
  }, [r, o, T, A, je, Se, le, ie, ye]), u.useEffect(() => {
    if (!o || !gt || ze.length === 0) return;
    const K = t + O.current, ue = ze.map((ve) => ({
      start: ve.startEpochMs ?? ve.startEpoch ?? 0,
      end: ve.endEpochMs ?? ve.endEpoch ?? 0
    })).filter((ve) => ve.start > K + 500).sort((ve, Ce) => ve.start - Ce.start)[0];
    if (ue && (!vt || vt.start !== ue.start)) {
      const ve = ue.start - t;
      if (ve < N) {
        const Ce = Se(ve, le);
        jn({ start: ue.start, ms: ve }), Ue === "A" ? Rt(Ce) : Ge(Ce);
      }
    }
  }, [o, gt, r, t, N, ze, vt, Ue, Se, le]);
  const re = u.useCallback(() => {
    if (vt) {
      const K = Ue === "A" ? "B" : "A", ue = K === "A" ? x : w;
      en(K), z.current = vt.ms, R.current = vt.ms, jn(null), ue.current && ue.current.play().then(() => {
        Ee();
      }).catch(() => {
      });
    } else
      m ? l(d) : i(!1);
  }, [vt, Ue, Ee, m, d, l, i]), We = u.useCallback(() => {
    const K = $n.current;
    if (!K || W.current || !o || G.current) return;
    const ue = K.currentTime * 1e3, ve = Math.round(z.current + ue);
    if (k && k.length > 0) {
      const Ce = t + ve, Xe = k.find((Je) => Ce >= Je.startEpochMs && Ce < Je.endEpochMs);
      if (Xe) {
        G.current = !0;
        const Je = Math.round(Xe.endEpochMs - t) + 10;
        l(Je), setTimeout(() => {
          G.current = !1;
        }, 150);
        return;
      }
    }
    if (ve >= N) {
      m ? l(d) : (i(!1), l(N));
      return;
    }
    R.current = ve, l(ve);
  }, [$n, o, t, k, N, m, d, l, i]), Ke = Cn && o && !Qe;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${ie} ${y}`, children: [
    H && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (K) => K.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${ie === "director" ? "active" : ""}`,
          onClick: () => ae("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${ie === "canvas" ? "active" : ""}`,
          onClick: () => ae("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${ie === "split" ? "active" : ""}`,
          onClick: () => ae("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${ie === "pip" ? "active" : ""}`,
          onClick: () => ae("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      D.map((K, ue) => {
        const ve = (K.displayId ?? `mon-${ue}`).toLowerCase(), Ce = K.displayNumber ?? ue + 1, Xe = K.displayName || `Screen ${Ce}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${ie === ve ? "active" : ""}`,
            onClick: () => ae(ve),
            title: `Pin directly to ${Xe}`,
            children: [
              "🖥️ ",
              Ce
            ]
          },
          ve
        );
      }),
      ie === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          D.map((K, ue) => {
            const ve = (K.displayId ?? `mon-${ue}`).toLowerCase(), Ce = K.displayNumber ?? ue + 1, Xe = K.displayName || `Screen ${Ce}`, Je = le === ve;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${Je ? "active" : ""} ${Q && Je ? "is-override" : ""}`,
                onClick: () => {
                  P == null || P(T, t + r, ve);
                },
                title: `Punch ${Xe} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ce
                  ] }),
                  Je && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: Q ? "✋" : "⚡" })
                ]
              },
              `punch-${ve}`
            );
          }),
          Q && v && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                v == null || v(T, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    H && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${Q ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: ie === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : ie === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : ie === "pip" ? `🪟 PiP MODE: ${Fe.toUpperCase()} (HERO)` : `${Q ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${Fe.toUpperCase()}` }),
      Q && ie === "director" && v && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => v == null ? void 0 : v(T, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    et && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: x,
        src: et,
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
        muted: Ue !== "A" || al().isMuted,
        onCanPlay: () => {
          Ee(), o && Ue === "A" && x.current && x.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "A" && (W.current = !1, Nt(!0), kt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "A" && kt(!0);
        },
        onTimeUpdate: () => {
          var K;
          Ue === "A" && (!gt && ((K = x.current) == null ? void 0 : K.currentTime) > 0 && (W.current = !1, Nt(!0), kt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a)), We());
        },
        onError: () => {
          Ue === "A" && (W.current = !1, kt(!1), Nt(!1));
        },
        onEnded: () => {
          Ue === "A" && re();
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
        muted: Ue !== "B" || al().isMuted,
        onCanPlay: () => {
          Ee(), o && Ue === "B" && w.current && w.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "B" && (W.current = !1, Nt(!0), kt(!1), w.current && (w.current.defaultPlaybackRate = a, w.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "B" && kt(!0);
        },
        onTimeUpdate: () => {
          var K;
          Ue === "B" && (!gt && ((K = w.current) == null ? void 0 : K.currentTime) > 0 && (W.current = !1, Nt(!0), kt(!1), w.current && (w.current.defaultPlaybackRate = a, w.current.playbackRate = a)), We());
        },
        onError: () => {
          Ue === "B" && (W.current = !1, kt(!1), Nt(!1));
        },
        onEnded: () => {
          Ue === "B" && re();
        }
      }
    ),
    ie !== "split" && ie !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: gt ? 0 : 2 },
        children: Qe ? /* @__PURE__ */ s.jsx(pp, { isPlaying: o }) : Tt && Tt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
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
    ie === "split" && H && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Tt && Tt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Tt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        Xt && Xt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Xt, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    ie === "pip" && H && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (K) => {
          K.stopPropagation(), de((ue) => !ue);
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
          Xt && Xt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Xt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (ie === "canvas" || ie === "all-displays") && H && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: we, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: be.width ? `${be.width}px` : "92%",
            height: be.height ? `${be.height}px` : "auto",
            aspectRatio: `${_e.totalWidth} / ${_e.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: D.map((K, ue) => {
            const ve = jx(K, _e), Ce = (K.displayId ?? K.DisplayId ?? `mon-${ue}`).toLowerCase(), Xe = fe[Ce] || (Ce === le ? Tt : null), Je = !!(K.isPrimary ?? K.IsPrimary);
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
                  dt.stopPropagation(), I ? I(Ce) : ae(Ce);
                },
                title: `Display ${ue + 1} (${K.width || 1920}x${K.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      Je ? "★ " : "",
                      "🖥 ",
                      ue + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: K.displayName || K.DisplayName || Ce.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      K.width || 1920,
                      "x",
                      K.height || 1080
                    ] }),
                    I && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (dt) => {
                          dt.stopPropagation(), I(Ce);
                        },
                        title: `Open Display ${ue + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Xe && Xe !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Xe,
                      className: "canvas-frame-img",
                      alt: Ce
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      K.displayName || Ce.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Ce
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
          A,
          " • ",
          le.toUpperCase()
        ] })
      ] })
    ] }) }),
    ie === "director" && Z && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        le.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        yt(Z.startEpochMs ?? Z.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        yt(Z.endEpochMs ?? Z.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    H && ie !== "canvas" && /* @__PURE__ */ s.jsx(
      kx,
      {
        displays: D,
        activeDisplayId: le,
        mode: Q ? "MANUAL" : "AUTO",
        activeTimeRange: Z ? `${yt(Z.startEpochMs ?? Z.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${yt(Z.endEpochMs ?? Z.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (K) => {
          P && P(T, t + r, K), ae(K);
        }
      }
    ),
    E && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      A
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
  viewportStartMs: E = 0,
  onViewportStartChange: b,
  playheadMs: P = 0,
  playheadEpochMs: v = 0,
  setPlayheadMs: p,
  inPointMs: h = 0,
  setInPointMs: I,
  outPointMs: S = 36e5,
  setOutPointMs: j,
  recordingSegments: y = {},
  globalGaps: x = [],
  onExport: w,
  isPlaying: M,
  setIsPlaying: O,
  isLooping: z = !0,
  setIsLooping: R,
  playbackSpeed: W,
  setPlaybackSpeed: ne,
  keystrokeMode: F = "BURN_IN",
  onChangeKeystrokeMode: G,
  keystrokes: T = [],
  showRulerKeystrokes: A = !1,
  onToggleRulerKeystrokes: D,
  directorPlan: H,
  onOverrideDisplay: _,
  onSplitDirectorSegment: ce,
  onChangeDirectorSegmentDisplay: ee,
  onResetDirectorSegmentToAuto: ie
}) {
  var Xt, cn, $n;
  const [ae, Be] = u.useState(!1), V = M !== void 0 ? M : ae, q = u.useCallback((Ee) => {
    const Se = typeof Ee == "function" ? Ee(V) : Ee;
    O ? O(Se) : Be(Se), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Se } }));
  }, [V, O]), [de, Z] = u.useState(!0), le = z !== void 0 ? z : de, ye = R || Z, [Fe, X] = u.useState(1), Q = W !== void 0 ? W : Fe, fe = ne || X, [ge, we] = u.useState(null), [be, se] = u.useState(!1), [_e, ke] = u.useState(x), Me = ((Xt = t == null ? void 0 : t.displays) == null ? void 0 : Xt.length) > 1 || (($n = (cn = t == null ? void 0 : t.topology) == null ? void 0 : cn.displays) == null ? void 0 : $n.length) > 1, [ze, De] = u.useState(() => {
    if (!Me) return "mon-0";
    if (n) return n;
    try {
      const Ee = localStorage.getItem("itb_spotlight_viewmode");
      if (Ee) return Ee;
    } catch {
    }
    return "canvas";
  }), je = u.useCallback((Ee) => {
    De((Se) => {
      const re = typeof Ee == "function" ? Ee(Se) : Ee;
      try {
        localStorage.setItem("itb_spotlight_viewmode", re);
      } catch {
      }
      return re;
    });
  }, []), [Qe, Ue] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!Me) {
        De("mon-0");
        return;
      }
      if (n)
        De(n);
      else
        try {
          const Ee = localStorage.getItem("itb_spotlight_viewmode");
          De(Ee || "canvas");
        } catch {
          De("canvas");
        }
    }
  }, [e, n, Me, t == null ? void 0 : t.id]);
  const en = u.useRef(null), et = u.useRef(d);
  et.current = d;
  const Ge = u.useRef(E);
  Ge.current = E;
  const ln = u.useRef(c);
  ln.current = c;
  const Rt = u.useRef(t && t.id);
  u.useEffect(() => {
    var Ee, Se, re;
    t && t.id && Rt.current !== t.id && (Rt.current = t.id, fe(1), ((Ee = t.displays) == null ? void 0 : Ee.length) > 1 || ((re = (Se = t.topology) == null ? void 0 : Se.displays) == null ? void 0 : re.length) > 1 || je("mon-0"));
  }, [t, fe]);
  const fn = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Ee = en.current;
    if (!Ee || !N || !b) return;
    const Se = (re) => {
      re.preventDefault(), re.stopPropagation();
      const We = re.ctrlKey || re.shiftKey, Ke = et.current, K = Ge.current, ue = ln.current || 36e5;
      if (We) {
        const ve = Math.abs(re.deltaX) > Math.abs(re.deltaY) ? re.deltaX : re.deltaY;
        if (ve === 0) return;
        const Ce = ue / Ke, Xe = Math.max(0, ue - Ce), Je = Ce * 0.08 * (ve > 0 ? 1 : -1), dt = Math.max(0, Math.min(Xe, K + Je));
        Ge.current = dt, b(dt);
      } else {
        if (re.deltaY === 0) return;
        const Ce = re.deltaY < 0 ? 1.25 : 0.8, Xe = Ee.getBoundingClientRect(), Je = Xe.left + 150, dt = Xe.right - 58, Ze = Math.max(100, dt - Je);
        let Ye = 0.5;
        re.clientX >= Je && re.clientX <= dt ? Ye = (re.clientX - Je) / Ze : Xe.width > 0 && (Ye = Math.max(0, Math.min(1, (re.clientX - Xe.left) / Xe.width)));
        const at = Math.max(32, ue / 2e3), jt = Math.max(1, Math.min(at, Math.round(Ke * Ce * 100) / 100));
        if (jt === Ke) return;
        const ct = ue / Ke, $t = ue / jt, Vt = K + Ye * ct - Ye * $t, ps = Math.max(0, ue - $t), Qn = Math.max(0, Math.min(ps, Vt));
        et.current = jt, Ge.current = Qn, b(Qn), N(jt);
      }
    };
    return Ee.addEventListener("wheel", Se, { passive: !1, capture: !0 }), () => Ee.removeEventListener("wheel", Se, { capture: !0 });
  }, [e, t, N, b]);
  const He = u.useCallback(() => {
    m ? m() : (Ge.current = 0, et.current = 1, b == null || b(0), N == null || N(1));
  }, [m, b, N]), vt = u.useCallback((Ee, Se) => {
    if (g)
      g(Ee, Se);
    else {
      const re = Math.max(1e3, Se - Ee), We = Math.max(500, re * 0.05), Ke = Math.max(0, Ee - We), ue = Math.min(c, Se + We) - Ke, ve = Math.max(32, c / 2e3), Ce = Math.max(1, Math.min(ve, Number((c / ue).toFixed(1)))), Xe = c / Ce, Je = Math.max(0, Math.min(Ke, c - Xe));
      Ge.current = Je, et.current = Ce, b == null || b(Je), N == null || N(Ce);
    }
  }, [g, c, b, N]), jn = u.useCallback((Ee, Se = "center") => {
    if (k)
      k(Ee, Se);
    else {
      if (Ee == null) return;
      const re = et.current || 1, We = c / Math.max(1, re), Ke = Se === "start" ? We / 4 : We * 0.75, K = Math.max(0, Math.min(Ee - Ke, c - We));
      Ge.current = K, b == null || b(K);
    }
  }, [k, c, b]), gt = u.useCallback(() => {
    q((Ee) => !Ee);
  }, [q]), Nt = u.useCallback(async () => {
    var We;
    if (!t || Math.abs(S - h) < 1e3) return;
    const Ee = (F || "NONE").toUpperCase().replace("-", "_");
    let Se;
    Ee === "NONE" || Ee === "OFF" ? Se = "None" : Ee === "CAPTION" ? Se = "Caption" : Se = "BurnIn";
    const re = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: i + Math.round(h),
      outEpochMs: i + Math.round(S),
      keystrokeMode: Se,
      layoutMode: Me ? ze : "mon-0",
      targetDisplayId: !Me || ze === "mon-0" || ze === "mon-1" || ze.startsWith("mon-") ? Me ? ze : "mon-0" : null,
      isPipSwapped: Qe,
      directorSegments: Me ? (H == null ? void 0 : H.segments) || ((We = t == null ? void 0 : t.directorPlan) == null ? void 0 : We.segments) || [] : []
    };
    try {
      w ? await w(re) : (await fetch("/api/v1/extractor-advanced/jobs", {
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
  }, [t, h, S, i, w, F, ze, Qe, H]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Ee = (Se) => {
      if ((Se.ctrlKey || Se.metaKey) && (Se.key === "e" || Se.key === "E")) {
        Se.preventDefault(), Nt();
        return;
      }
      if (Se.key === "?" || Se.shiftKey && Se.code === "Slash") {
        Se.preventDefault(), se((re) => !re);
        return;
      }
      if (be) {
        Se.key === "Escape" && se(!1);
        return;
      }
      if (Se.key === "Escape" || Se.code === "Escape") {
        Se.preventDefault(), Se.stopPropagation(), o == null || o();
        return;
      }
      if (Se.code === "Space") {
        Se.preventDefault(), gt();
        return;
      }
      if (Se.code === "KeyI") {
        Se.preventDefault(), I(Math.max(0, Math.min(P, S - 1e3)));
        return;
      }
      if (Se.code === "KeyO") {
        Se.preventDefault(), j(Math.min(c, Math.max(P, h + 1e3)));
        return;
      }
      if (Se.code === "ArrowLeft" || Se.code === "ArrowRight") {
        Se.preventDefault(), q(!1);
        const re = Se.code === "ArrowLeft";
        let We;
        if (Se.ctrlKey || Se.metaKey)
          We = 33;
        else if (Se.shiftKey)
          We = 5e3;
        else {
          const Ke = Math.max(1, d);
          We = Math.max(33, Math.round(1e3 / Ke));
        }
        p((Ke) => {
          const K = re ? Ke - We : Ke + We;
          return Math.max(0, Math.min(c, K));
        });
        return;
      }
      if (Se.key === "ArrowDown") {
        Se.preventDefault();
        const re = r.findIndex((We) => We.id === t.id);
        if (re !== -1) {
          const We = (re + 1) % r.length;
          l(r[We].id);
        }
        return;
      }
      if (Se.key === "ArrowUp") {
        Se.preventDefault();
        const re = r.findIndex((We) => We.id === t.id);
        if (re !== -1) {
          const We = (re - 1 + r.length) % r.length;
          l(r[We].id);
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
    P,
    h,
    S,
    c,
    d,
    I,
    j,
    p,
    Nt,
    gt,
    q,
    be
  ]);
  const Cn = r.findIndex((Ee) => Ee.id === (t && t.id)), kt = r[Cn - 1], Tt = r[Cn + 1];
  if (!e || !t) return null;
  const Bt = v > 0 ? v : Math.round(i + P);
  return _s.createPortal(
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
            Kd(S - h),
            " (",
            yt(i + h, a),
            " → ",
            yt(i + S, a),
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
            playheadMs: P,
            setPlayheadMs: p,
            isPlaying: V,
            setIsPlaying: q,
            playbackSpeed: Q,
            timeMode: a,
            inPointMs: h,
            outPointMs: S,
            isLooping: le,
            recordingSegments: y,
            globalGaps: _e,
            showWatermark: !0,
            directorPlan: H || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: _,
            onResetOverride: ie,
            viewMode: ze,
            onViewModeChange: je,
            isPipSwapped: Qe,
            onPipSwapChange: Ue
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ex,
          {
            currentEpochMs: Bt,
            keystrokes: T,
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
              disabled: !kt,
              onClick: () => kt && l(kt.id),
              title: kt ? `Previous: ${kt.displayName || kt.roleAlias || kt.hostname || kt.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            Cn + 1,
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${V ? "is-playing-dimmed" : ""}`, ref: en, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Kd(S - h) })
            ] }),
            (() => {
              const Ee = ze === "mon-0" ? "SCREEN 1" : ze === "mon-1" ? "SCREEN 2" : ze.startsWith("mon-") ? `SCREEN ${parseInt(ze.slice(4)) + 1}` : ze.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: Nt,
                  title: `Export Selected Cut Window as ${Ee} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: ze === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Ee})` })
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
              isLooping: le,
              setIsLooping: ye,
              playbackSpeed: Q,
              onChangeSpeed: fe,
              baseEpochMs: i,
              timeMode: a,
              totalDurationMs: c,
              inPointMs: h,
              setInPointMs: I,
              outPointMs: S,
              setOutPointMs: j,
              onSetInPoint: () => I(Math.max(0, Math.min(P, S - 1e3))),
              onSetOutPoint: () => j(Math.min(c, Math.max(P, h + 1e3))),
              onStepFrameBackward: () => {
                q(!1), p((Ee) => Math.max(0, Ee - 33));
              },
              onStepFrameForward: () => {
                q(!1), p((Ee) => Math.min(c, Ee + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: yt(i + P, a) })
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
            onJumpViewportTo: jn,
            viewportStartMs: E,
            onViewportStartChange: b,
            playheadMs: P,
            setPlayheadMs: (Ee) => {
              q(!1), p(Ee);
            },
            inPointMs: h,
            setInPointMs: I,
            outPointMs: S,
            setOutPointMs: j,
            recordingSegments: y,
            onExport: Nt,
            onEstimateLoaded: (Ee) => {
              Ee != null && Ee.removedGlobalGaps && ke(Ee.removedGlobalGaps);
            },
            keystrokeMode: F,
            onChangeKeystrokeMode: G,
            keystrokes: T,
            showKeystrokes: A,
            showRulerKeystrokes: A,
            onToggleRulerKeystrokes: D,
            onSplitDirectorSegment: ce,
            onChangeDirectorSegmentDisplay: ee,
            onResetDirectorSegmentToAuto: ie
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        wp,
        {
          isOpen: be,
          onClose: () => se(!1)
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
        let y = await fetch("/api/v1/extractor-advanced/jobs");
        if (y.ok || (y = await fetch("/api/v1/extractor/jobs")), y.ok) {
          a.current = 0;
          const x = await y.json(), w = Array.isArray(x) ? x : [];
          n(w), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: w }));
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
    let y = !0, x = null;
    const w = () => {
      if (!y) return;
      let O = 2500;
      typeof document < "u" && document.hidden ? O = 3e4 : a.current > 0 && (O = Math.min(3e4, 2500 * Math.pow(2, Math.min(a.current, 4)))), x = setTimeout(async () => {
        await g(), w();
      }, O);
    }, M = () => {
      !document.hidden && y && (clearTimeout(x), a.current = 0, g().then(w));
    };
    return document.addEventListener("visibilitychange", M), g().then(w), () => {
      y = !1, clearTimeout(x), document.removeEventListener("visibilitychange", M);
    };
  }, [g]), u.useEffect(() => {
    const y = () => {
      m(!0), g();
    };
    return window.addEventListener("open-export-monitor", y), () => window.removeEventListener("open-export-monitor", y);
  }, [g]), u.useEffect(() => {
    if (!N || c) return;
    const y = (x) => {
      o.current && !o.current.contains(x.target) && !x.target.closest(".export-floating-hud") && m(!1);
    };
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [N, c]);
  const k = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && k)
    return null;
  const E = t.filter((y) => y.status === "Processing" || y.status === "Queued"), b = t.filter((y) => y.status === "Completed" || y.isCompleted), P = () => {
    d((y) => {
      const x = !y;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(x));
      } catch {
      }
      return x;
    });
  }, v = () => {
    m(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, p = (y, x) => {
    x.stopPropagation(), !(!y || r.has(y)) && (l((w) => new Set(w).add(y)), setTimeout(() => {
      n((w) => {
        const M = w.filter((O) => (O.jobId || O.id) !== y);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: M })), M;
      }), l((w) => {
        const M = new Set(w);
        return M.delete(y), M;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${y}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${y}`, { method: "DELETE" })).catch((w) => console.warn("[ExportJobMonitor] Dismiss failed:", w)));
  }, h = async (y, x) => {
    x.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${y}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${y}/bookmark`, { method: "POST" })), g();
    } catch (w) {
      console.warn("[ExportJobMonitor] Bookmark failed:", w);
    }
  }, I = (y, x) => {
    x.stopPropagation();
    const w = y.networkFolderPath || (y.outputFilePath ? y.outputFilePath.substring(0, y.outputFilePath.lastIndexOf("\\")) : "");
    w && (navigator.clipboard.writeText(w), alert(`UNC Directory Path copied to clipboard:
${w}`));
  }, S = (y) => {
    const x = y.jobId || y.id, w = `/api/v1/extractor-advanced/jobs/${x}/download`, M = document.createElement("a");
    M.href = w, M.download = y.fileName || `archive_${x}.tar`, document.body.appendChild(M), M.click(), document.body.removeChild(M), setTimeout(g, 1e3);
  }, j = (y) => {
    if (!y || y <= 0) return "0 B";
    const x = y / (1024 * 1024);
    return x >= 1e3 ? `${(x / 1024).toFixed(2)} GB` : `${x.toFixed(1)} MB`;
  };
  return t.length === 0 && !N ? null : _s.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !N && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${E.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => m(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${E.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: E.length > 0 ? `EXPORTS: ${E.length} PACKAGING` : `${b.length} ARCHIVE${b.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${E.length > 0 ? "" : "ready"}`, children: E.length > 0 ? `${E[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      N && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && m(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (y) => y.stopPropagation(), children: [
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
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: v, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((y) => {
          const x = y.status === "Completed" || y.isCompleted, w = y.status === "Failed" || y.isFailed, M = y.status === "Processing" || y.status === "Queued", O = y.jobId || y.id, z = r.has(O), R = x ? 100 : Math.round(y.progressPercent || y.progressPercentage || y.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${y.status.toLowerCase()} ${y.isBookmarked ? "is-bookmarked" : ""} ${z ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${y.status.toLowerCase()}`, children: x ? "READY" : y.status }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: y.fileName, children: y.fileName })
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
                M && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: y.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      R,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, R)}%` } }) }),
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
                x && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
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
                x && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${y.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (W) => h(O, W),
                        title: y.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: y.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (W) => I(y, W),
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
                      onClick: () => S(y),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                w && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  y.errorMessage || y.error || "Export failed"
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
  const d = (y) => {
    const x = Math.round(y * a);
    return x - x % 2;
  }, N = (y, x) => {
    const w = Math.round(y * x / 2073600 * 6 * 10) / 10, M = Math.round(w * 60 / 8 * 10) / 10;
    return `~${w} Mbps (~${M} MB/min)`;
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
  ], [g, k] = u.useState("BurnIn"), [E, b] = u.useState(r.resolution || "NATIVE"), [P, v] = u.useState(!1);
  if (!e) return null;
  const p = async () => {
    v(!0);
    try {
      await n(g, E), t();
    } finally {
      v(!1);
    }
  }, h = (r.layout || "DIRECTOR").toUpperCase(), I = r.stationsCount || 1, S = r.audioSegmentsCount || 1, j = m.find((y) => y.id === E) || m[0];
  return _s.createPortal(
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
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK TRANSITIONS)" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: m.map((y) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${E === y.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: y.id,
              checked: E === y.id,
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: P, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: p, disabled: P, children: P ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
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
      const P = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(b),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), v = await fetch(`/api/v1/extractor-advanced/stations?${P.toString()}`);
      if (v.ok) {
        const p = v.headers.get("content-type");
        if (p && p.includes("application/json")) {
          const h = await v.json(), S = (Array.isArray(h) ? h : h.stations || h.items || []).filter((j) => (j.recordingsCount || (j.segments ? j.segments.length : 0)) > 0).map((j) => {
            var y, x;
            return {
              id: String(j.id || j.stationId || j.agentId || j.hostname),
              hostname: j.hostname || "Station",
              roleAlias: j.roleAlias || null,
              roleHistory: j.roleHistory || [],
              displayName: j.displayName || j.roleAlias || j.hostname || "Station",
              isOnline: j.isOnline !== void 0 ? j.isOnline : !0,
              recordingsCount: j.recordingsCount || 0,
              segments: j.segments || [],
              displays: j.displays || j.Displays || ((y = j.displayTopology) == null ? void 0 : y.displays) || ((x = j.DisplayTopology) == null ? void 0 : x.Displays) || [],
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
            if (!j || j.length === 0) return S;
            const y = new Map(j.map((M) => [M.id, M]));
            let x = j.length !== S.length;
            const w = S.map((M) => {
              const O = y.get(M.id);
              return O ? O.isOnline === M.isOnline && O.displayName === M.displayName && O.roleAlias === M.roleAlias && O.feedSpec === M.feedSpec && O.recordingsCount === M.recordingsCount && O.fps === M.fps ? O : (x = !0, { ...O, ...M }) : (x = !0, M);
            });
            return x ? w : j;
          });
        }
      }
    } catch (P) {
      console.warn("[useStudioData] Failed fetching active stations:", P);
    } finally {
      N(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    g();
  }, [g]);
  const k = u.useMemo(() => {
    const b = /* @__PURE__ */ new Set();
    return o.forEach((P) => {
      P.id && b.add(P.id), P.hostname && b.add(P.hostname);
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
        const v = e + t, p = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(k)}&startEpoch=${e}&endEpoch=${v}`);
        if (p.ok && b) {
          const h = await p.json() || {}, I = {};
          (m.current || []).forEach((S) => {
            const j = h[S.id] || h[S.hostname] || h[S.displayName] || [];
            I[S.id] = j, I[S.hostname] = j;
          }), Object.keys(h).forEach((S) => {
            I[S] || (I[S] = h[S]);
          }), c(I);
        }
      } catch {
        b && c({});
      }
    })(), () => {
      b = !1;
    };
  }, [k, e, t]);
  const E = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let b = 1 / 0, P = -1 / 0;
    o.forEach((I) => {
      (a[I.id] || a[I.hostname] || I.segments || []).forEach((j) => {
        const y = j.startEpochMs ?? j.startEpoch ?? 0, x = j.endEpochMs ?? j.endEpoch ?? 0;
        y > 0 && y < b && (b = y), x > 0 && x > P && (P = x);
      });
    });
    let v = 1 / 0, p = -1 / 0;
    l && (a[l] || []).forEach((S) => {
      const j = S.startEpochMs ?? S.startEpoch ?? 0, y = S.endEpochMs ?? S.endEpoch ?? 0;
      j > 0 && j < v && (v = j), y > 0 && y > p && (p = y);
    });
    const h = (I) => I === 1 / 0 || I === -1 / 0 ? null : Math.max(0, Math.min(t, I - e));
    return {
      globalFirstMs: h(b),
      globalLastMs: h(P),
      currentFirstMs: h(v),
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
    movieBoundaries: E
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
  const [g, k] = u.useState(a), [E, b] = u.useState(c), [P, v] = u.useState(d), [p, h] = u.useState(N), I = u.useRef(null), S = u.useRef(null), j = o || l, y = u.useMemo(() => j ? i[j.id] || j.segments || [] : [], [j, i]), x = y.some((z) => {
    const R = z.startEpochMs ?? z.startEpoch ?? 0, W = z.endEpochMs ?? z.endEpoch ?? 0, ne = e + g;
    return ne >= R && ne <= W;
  }), w = !!(!m && j && x);
  u.useEffect(() => {
    k((z) => z < t ? t : z > n ? (b(!1), n) : z);
  }, [t, n]);
  const M = u.useCallback((z) => {
    I.current || (I.current = z);
    const R = (z - I.current) * p, W = Math.min(R, 250 * p);
    I.current = z, k((ne) => {
      let F = ne + W;
      if (r && r.length > 0) {
        const G = e + F, T = r.find((A) => G >= A.startEpochMs && G < A.endEpochMs);
        T && (F = T.endEpochMs - e);
      }
      return F >= n && (P ? F = t : (b(!1), F = n)), F;
    }), E && (!w || m) && (S.current = requestAnimationFrame(M));
  }, [E, P, t, n, r, e, w, p, m]);
  u.useEffect(() => (E && (!w || m) ? (I.current = performance.now(), S.current = requestAnimationFrame(M)) : (S.current && cancelAnimationFrame(S.current), I.current = null), () => {
    S.current && cancelAnimationFrame(S.current);
  }), [E, M, w, m]);
  const O = u.useCallback(() => {
    if (E)
      b(!1);
    else {
      let z = g;
      const R = e + z, W = r == null ? void 0 : r.find((ne) => R >= ne.startEpochMs && R < ne.endEpochMs);
      if (W)
        z = W.endEpochMs - e;
      else if (j && !x) {
        const ne = y.map((F) => ({ start: F.startEpochMs ?? F.startEpoch ?? 0, end: F.endEpochMs ?? F.endEpoch ?? 0 })).filter((F) => F.start > R).sort((F, G) => F.start - G.start)[0];
        ne && (z = ne.start - e);
      }
      z !== g && k(z), b(!0);
    }
  }, [E, g, e, r, j, x, y]);
  return {
    playheadMs: g,
    setPlayheadMs: k,
    isPlaying: E,
    setIsPlaying: b,
    isLooping: P,
    setIsLooping: v,
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
  const N = u.useRef(l);
  N.current = l;
  const m = u.useRef(t);
  m.current = t;
  const g = Math.max(32, t / 2e3), k = t / l, E = u.useCallback((p, h = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const I = d.current, S = p - I;
    if (Math.abs(S) < 1) return;
    const j = performance.now(), y = (x) => {
      const w = x - j, M = Math.min(1, w / h);
      a(Math.round(I + S * Rx(M))), M < 1 ? c.current = requestAnimationFrame(y) : c.current = null;
    };
    c.current = requestAnimationFrame(y);
  }, []), b = u.useCallback((p, h) => {
    const I = Math.max(1e3, h - p), S = Math.max(500, I * 0.05), j = Math.max(0, p - S), x = Math.min(t, h + S) - j, w = Math.max(1, Math.min(g, Number((t / x).toFixed(1)))), M = t / w, O = Math.max(0, Math.min(j, t - M));
    E(O), o(w);
  }, [t, g, E]), P = u.useCallback(() => {
    E(0), o(1);
  }, [E]), v = u.useCallback((p, h = "center") => {
    if (p == null) return;
    const I = h === "start" ? k / 4 : k * 0.75, S = Math.max(0, Math.min(p - I, t - k));
    E(S);
  }, [k, t, E]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let p = null;
    const h = (S) => {
      if (S.defaultPrevented) return;
      S.preventDefault(), S.stopPropagation();
      const j = S.ctrlKey || S.shiftKey, y = N.current, x = d.current, w = m.current;
      if (j) {
        const M = Math.abs(S.deltaX) > Math.abs(S.deltaY) ? S.deltaX : S.deltaY;
        if (M === 0) return;
        const O = w / Math.max(1, y), z = Math.max(0, w - O), R = O * 0.08 * (M > 0 ? 1 : -1);
        a((W) => Math.max(0, Math.min(z, W + R)));
      } else {
        if (S.deltaY === 0) return;
        const O = S.deltaY < 0 ? 1.25 : 0.8, z = Math.max(32, w / 2e3), R = p ? p.getBoundingClientRect() : { left: 0, width: window.innerWidth }, W = Math.max(0, Math.min(R.width, S.clientX - R.left)), ne = R.width > 0 ? W / R.width : 0.5;
        o((F) => {
          const G = Math.max(1, Math.min(z, Math.round(F * O * 100) / 100));
          if (G === F) return F;
          const T = w / F, A = w / G, H = x + ne * T - ne * A, _ = Math.max(0, w - A);
          return a(Math.max(0, Math.min(_, H))), G;
        });
      }
    }, I = () => {
      const S = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return S && !p ? (p = S, p.addEventListener("wheel", h, { passive: !1, capture: !0 }), !0) : !!p;
    };
    if (!I()) {
      const S = setInterval(() => {
        I() && clearInterval(S);
      }, 100);
      return () => {
        clearInterval(S), p && p.removeEventListener("wheel", h, { capture: !0 });
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
    viewportDurationMs: k,
    animateViewportTo: E,
    fitRange: b,
    resetZoom: P,
    jumpViewportTo: v
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
  togglePlaySmart: E,
  onToggleHelpModal: b,
  onSplitDirectorAtPlayhead: P,
  isModalActive: v = !1
}) {
  u.useEffect(() => {
    const p = (h) => {
      const I = h.target;
      if (!(I.tagName === "INPUT" || I.tagName === "TEXTAREA" || I.tagName === "SELECT" || I.isContentEditable || I.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), b == null || b();
          return;
        }
        if (!(v || t)) {
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
            E();
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
            let y;
            if (h.ctrlKey || h.metaKey)
              y = 33;
            else if (h.shiftKey)
              y = 5e3;
            else {
              const x = Math.max(1, k);
              y = Math.max(33, Math.round(1e3 / x));
            }
            a((x) => {
              const w = j ? x - y : x + y;
              return Math.max(0, Math.min(g, w));
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
    N,
    m,
    g,
    k,
    E,
    b,
    P,
    v
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
}, Rl = (e, t = null, n = "LOCAL") => {
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
  var pn, Nl;
  const e = u.useMemo(() => gg() || {}, []), [t, n] = u.useState(() => {
    var L, te;
    return (L = e.timeRange) != null && L.startEpochMs && ((te = e.timeRange) != null && te.endEpochMs) ? e.timeRange : Yd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, i] = u.useState(e.keystrokeMode || "BURN_IN"), [a, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    cg().catch((L) => console.warn("[Studio] DST init error:", L));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Rl(t.start), [t.start, t.startEpochMs]), N = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), m = u.useMemo(() => d - N, [d, N]), g = u.useMemo(() => t.durationMs + 2 * N, [t.durationMs, N]), [k, E] = u.useState(e.selectedStationIds || []), [b, P] = u.useState(e.activeStationId || null), [v, p] = u.useState(null), [h, I] = u.useState(null), [S, j] = u.useState([]), [y, x] = u.useState(!1), [w, M] = u.useState(null), [O, z] = u.useState(() => {
    var L;
    return e.compositionScope || (((L = e.selectedStationIds) == null ? void 0 : L.length) > 1 ? "inter-station" : "intra-station");
  }), [R, W] = u.useState(() => {
    try {
      const L = localStorage.getItem("itb_composition_layout");
      if (L) return L;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), ne = u.useCallback((L) => {
    W((te) => {
      const U = typeof L == "function" ? L(te) : L;
      try {
        localStorage.setItem("itb_composition_layout", U);
      } catch {
      }
      return U;
    });
  }, []), [F, G] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [T, A] = u.useState(() => !!e.isPipSwapped), [D, H] = u.useState(() => e.audioRoutingPlan || null), [_, ce] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [ee, ie] = u.useState(!1), [ae, Be] = u.useState(null), [V, q] = u.useState(() => e.canvasLayoutTimeline || null), [de, Z] = u.useState(0), le = u.useCallback((L) => {
    q((te) => {
      const U = [...(te == null ? void 0 : te.keyframes) || []], Oe = U.findIndex((rt) => Math.abs(rt.timestampEpochMs - L) < 300);
      if (Oe >= 0)
        return Z(Oe), te;
      const Le = U[de] || U[0], Te = (Le == null ? void 0 : Le.layout) || ae || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Ve = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(L),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Te))
      }, he = [...U, Ve].sort((rt, xt) => rt.timestampEpochMs - xt.timestampEpochMs), tt = he.findIndex((rt) => rt.timestampEpochMs === Math.round(L));
      return Z(tt >= 0 ? tt : 0), {
        ...te || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: he
      };
    });
  }, [de, ae]), ye = u.useCallback((L, te) => {
    q((U) => !(U != null && U.keyframes) || U.keyframes.length === 0 ? U : kc(U, L, te));
  }, []), Fe = u.useCallback((L) => {
    q((te) => {
      if (!(te != null && te.keyframes) || te.keyframes.length <= 1) return te;
      const U = te.keyframes.filter((Oe, Le) => Le !== L);
      return Z((Oe) => Math.max(0, Oe - 1)), { ...te, keyframes: U };
    });
  }, []), X = u.useCallback((L, te) => {
    q((U) => {
      if (!(U != null && U.keyframes) || U.keyframes.length === 0) return U;
      const Oe = Math.round(te), Le = typeof L == "number" && U.keyframes[L] ? L : U.keyframes.findIndex((he) => he.id === L);
      if (Le === -1) return U;
      const Te = [...U.keyframes];
      Te[Le] = {
        ...Te[Le],
        timestampEpochMs: Oe
      }, Te.sort((he, tt) => he.timestampEpochMs - tt.timestampEpochMs);
      const Ve = Te.findIndex((he) => he.timestampEpochMs === Oe);
      return Ve >= 0 && Z(Ve), {
        ...U,
        keyframes: Te
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [Q, fe] = u.useState({}), ge = u.useCallback((L) => {
    fe((te) => ({
      ...te,
      [L]: !(te[L] ?? !0)
    }));
  }, []), we = u.useCallback((L) => {
    E((te) => te.filter((U) => U !== L)), b === L && P(null), v === L && p(null), q((te) => {
      if (!te || !te.keyframes) return te;
      const U = te.keyframes.map((Oe) => {
        var Le;
        return {
          ...Oe,
          layout: {
            ...Oe.layout,
            placements: (((Le = Oe.layout) == null ? void 0 : Le.placements) || []).filter((Te) => Te.stationId !== L)
          }
        };
      });
      return { ...te, keyframes: U };
    });
  }, [b, v]), be = u.useCallback((L, te) => {
    L.preventDefault(), L.stopPropagation();
    const U = 195, Oe = 110, Le = Math.min(L.clientX, window.innerWidth - U - 10), Te = Math.min(L.clientY, window.innerHeight - Oe - 10);
    M({ x: Le, y: Te, station: te });
  }, []), se = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(g, e.inEpochMs - m)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(g, e.inPointMs)) : N, [e.inEpochMs, e.inPointMs, m, g, N]), _e = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(se + 1e3, Math.min(g, e.outEpochMs - m)) : typeof e.outPointMs == "number" ? Math.max(se + 1e3, Math.min(g, e.outPointMs)) : N + t.durationMs, [e.outEpochMs, e.outPointMs, m, g, N, t.durationMs, se]), ke = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(g, e.playheadEpochMs - m)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(g, e.playheadMs)) : se, [e.playheadEpochMs, e.playheadMs, m, g, se]), [Me, ze] = u.useState(se), [De, je] = u.useState(_e), { allStations: Qe, recordingSegments: Ue, isLoadingStations: en, movieBoundaries: et } = Tx(
    m,
    g,
    t,
    r,
    b
  ), Ge = u.useMemo(() => Qe.find((L) => L.id === b) || null, [Qe, b]), ln = u.useCallback((L, te) => {
    q((U) => {
      var xt, It;
      if (!U || !U.keyframes || U.keyframes.length === 0) return U;
      const Oe = de >= 0 && de < U.keyframes.length ? de : 0, Le = U.keyframes[Oe], Te = ((xt = Le == null ? void 0 : Le.layout) == null ? void 0 : xt.placements) || [], Ve = (te || "mon-0").toLowerCase(), he = Te.findIndex((Ct) => Ct.stationId === L && (Ct.displayId || "mon-0").toLowerCase() === Ve);
      let tt;
      if (he >= 0)
        tt = Te.filter((Ct, sn) => sn !== he);
      else {
        const Ct = Qe.find((Jn) => Jn.id === L), sn = ((It = Ct == null ? void 0 : Ct.displays) == null ? void 0 : It.find((Jn) => (Jn.displayId || "").toLowerCase() === Ve)) || { width: 1920, height: 1080 }, Es = sn.width || 1920, Yt = sn.height || 1080, En = Es / Yt, On = En >= 1 ? 640 : Math.round(360 * En), zi = En >= 1 ? Math.round(640 / En) : 360, kl = {
          stationId: L,
          displayId: Ve,
          label: `${(Ct == null ? void 0 : Ct.displayName) || L} - ${sn.displayName || Ve}`,
          x: 120 + Te.length * 40 % 800,
          y: 100 + Te.length * 40 % 500,
          width: On,
          height: zi,
          sourceWidth: Es,
          sourceHeight: Yt,
          nativeAspectRatio: En,
          aspectRatio: En,
          zIndex: Te.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        tt = [...Te, kl];
      }
      const rt = [...U.keyframes];
      return rt[Oe] = {
        ...rt[Oe],
        layout: {
          ...rt[Oe].layout,
          placements: tt
        }
      }, { ...U, keyframes: rt };
    });
  }, [de, Qe]), Rt = u.useMemo(() => !k || k.length === 0 ? [] : Qe.filter((L) => k.includes(L.id)), [Qe, k]), fn = u.useMemo(() => Qe.find((L) => L.id === v) || null, [Qe, v]), He = !!(v && fn), vt = u.useRef("grid"), jn = u.useRef(null), {
    playheadMs: gt,
    setPlayheadMs: Nt,
    isPlaying: Cn,
    setIsPlaying: kt,
    playbackSpeed: Tt,
    setPlaybackSpeed: Bt,
    isLooping: Xt,
    setIsLooping: cn,
    togglePlaySmart: $n
  } = Ax({
    timelineBaseEpochMs: m,
    inPointMs: Me,
    outPointMs: De,
    globalGaps: S,
    activeStation: Ge,
    spotlightStation: fn,
    recordingSegments: Ue,
    initialPlayheadMs: ke,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !b
  }), {
    zoomLevel: Ee,
    setZoomLevel: Se,
    viewportStartMs: re,
    setViewportStartMs: We,
    resetZoom: Ke,
    fitRange: K,
    jumpViewportTo: ue
  } = $x({
    containerRef: jn,
    totalTimelineDurationMs: g,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [ve, Ce] = u.useState(!1), [Xe, Je] = u.useState(!1), [dt, Ze] = u.useState(!1), [Ye, at] = u.useState(!1), [jt, ct] = u.useState(
    !!(e.isWorkspaceActive && ((pn = e.selectedStationIds) == null ? void 0 : pn.length) > 0)
  ), [$t, un] = u.useState([]);
  u.useEffect(() => {
    const L = He && fn || Ge, te = (L == null ? void 0 : L.hostname) || (L == null ? void 0 : L.displayName) || (L == null ? void 0 : L.id), U = (o || "NONE").toUpperCase().replace("-", "_");
    if (!te || !m || !(U !== "NONE" && U !== "OFF" || a)) {
      un([]);
      return;
    }
    const Le = Math.max(0, m - 5e3), Te = m + g + 5e3, Ve = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(te)}&startEpoch=${Le}&endEpoch=${Te}`, { signal: Ve.signal }).then((he) => he.ok ? he.json() : []).then((he) => un(Array.isArray(he) ? he : [])).catch((he) => {
      he.name !== "AbortError" && un([]);
    }), () => Ve.abort();
  }, [Ge, fn, He, m, g, o, a]), u.useEffect(() => {
    en || (Qe.length === 0 ? ((k.length > 0 || b || jt) && (E([]), P(null), p(null), ct(!1)), at(!0), x(!0)) : (x(!1), E((L) => {
      const te = L.filter((U) => Qe.some((Oe) => Oe.id === U));
      return te.length !== L.length ? (te.length === 0 && (ct(!1), at(!0)), te) : L;
    })));
  }, [en, Qe]);
  const Vt = u.useCallback((L) => {
    if (L === null) {
      kt(!1), Bt(1), P(null);
      return;
    }
    L !== b && Bt(1), P(L);
  }, [b, kt, Bt]), ps = u.useCallback((L, te = null) => {
    L !== b && Bt(1), vt.current = k.length <= 1 || b ? "spotlight" : "grid", P(L), p(L), I(te || null);
  }, [b, k.length, Bt]), Qn = u.useCallback(() => {
    p(null), I(null), vt.current === "grid" && P(null);
  }, []), _t = u.useMemo(() => {
    if (D != null && D.segments && D.segments.length > 0)
      return D;
    const L = k[0] || b || "mon-0";
    return {
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + g,
          sourceStationId: L
        }
      ]
    };
  }, [D, k, b, m, g]), js = u.useCallback((L) => {
    H((te) => {
      const U = te || _t, Oe = [...U.segments || []], Le = Oe.findIndex((It) => {
        const Ct = It.startEpochMs ?? It.StartEpochMs ?? 0, sn = It.endEpochMs ?? It.EndEpochMs ?? 0;
        return L > Ct + 500 && L < sn - 500;
      });
      if (Le === -1) return te;
      const Te = Oe[Le], Ve = Te.startEpochMs ?? Te.StartEpochMs ?? 0, he = Te.endEpochMs ?? Te.EndEpochMs ?? 0, tt = Te.sourceStationId ?? Te.SourceStationId ?? k[0], rt = { startEpochMs: Ve, endEpochMs: L, sourceStationId: tt }, xt = { startEpochMs: L, endEpochMs: he, sourceStationId: tt };
      return Oe.splice(Le, 1, rt, xt), { ...U, segments: Oe };
    });
  }, [_t, k]), Kt = u.useCallback((L, te) => {
    H((U) => {
      const Oe = U || _t, Le = (Oe.segments || []).map((Te) => {
        const Ve = Te.startEpochMs ?? Te.StartEpochMs ?? 0, he = Te.endEpochMs ?? Te.EndEpochMs ?? 0;
        return L >= Ve && L <= he ? { ...Te, sourceStationId: te } : Te;
      });
      return { ...Oe, segments: Le };
    }), ce(!1);
  }, [_t]), Qt = u.useCallback((L, te) => {
    H((U) => {
      const Oe = U || _t, Le = (Oe.segments || []).map((Te) => {
        const Ve = Te.startEpochMs ?? Te.StartEpochMs ?? 0, he = Te.endEpochMs ?? Te.EndEpochMs ?? 0;
        return L >= Ve && L <= he ? { ...Te, gain: te } : Te;
      });
      return { ...Oe, segments: Le };
    });
  }, [_t]), Fs = u.useCallback(() => {
    ce((L) => !L);
  }, []), [tn, Lr] = u.useState({}), Ln = u.useCallback((L) => {
    if (!L) return null;
    if (tn[L]) return tn[L];
    const te = Qe.find((U) => U.id === L);
    return te != null && te.directorPlan ? te.directorPlan : {
      stationId: L,
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + g,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [tn, Qe, m, g]), Cs = u.useCallback((L, te) => {
    L && Lr((U) => {
      const Oe = U[L] || Ln(L), Le = [...Oe.segments || []], Te = Le.findIndex((sn) => {
        const Es = sn.startEpochMs ?? sn.StartEpochMs ?? 0, Yt = sn.endEpochMs ?? sn.EndEpochMs ?? 0;
        return te > Es + 500 && te < Yt - 500;
      });
      if (Te === -1) return U;
      const Ve = Le[Te], he = Ve.startEpochMs ?? Ve.StartEpochMs ?? 0, tt = Ve.endEpochMs ?? Ve.EndEpochMs ?? 0, rt = Ve.targetDisplayId ?? Ve.TargetDisplayId ?? "mon-0", xt = !!(Ve.isManualOverride ?? Ve.IsManualOverride), It = { ...Ve, startEpochMs: he, endEpochMs: te, targetDisplayId: rt, isManualOverride: xt }, Ct = { ...Ve, startEpochMs: te, endEpochMs: tt, targetDisplayId: rt, isManualOverride: xt };
      return Le.splice(Te, 1, It, Ct), { ...U, [L]: { ...Oe, segments: Le } };
    });
  }, [Ln]), Ie = u.useCallback((L, te, U) => {
    L && Lr((Oe) => {
      const Le = Oe[L] || Ln(L), Te = [...Le.segments || []];
      let Ve = Te.findIndex((tt) => {
        const rt = tt.startEpochMs ?? tt.StartEpochMs ?? 0, xt = tt.endEpochMs ?? tt.EndEpochMs ?? 0;
        return te > rt && te < xt;
      });
      if (Ve === -1 && (Ve = Te.findIndex((tt) => {
        const rt = tt.startEpochMs ?? tt.StartEpochMs ?? 0, xt = tt.endEpochMs ?? tt.EndEpochMs ?? 0;
        return te >= rt && te <= xt;
      })), Ve === -1) return Oe;
      const he = Te[Ve];
      return Te[Ve] = { ...he, targetDisplayId: U, isManualOverride: !0 }, { ...Oe, [L]: { ...Le, segments: Te } };
    });
  }, [Ln]), $e = u.useCallback((L, te) => {
    if (!L) return;
    const U = Qe.find((Le) => Le.id === L), Oe = U == null ? void 0 : U.directorPlan;
    Lr((Le) => {
      var Es;
      const Te = Le[L] || Ln(L), Ve = [...Te.segments || []];
      let he = Ve.findIndex((Yt) => {
        const En = Yt.startEpochMs ?? Yt.StartEpochMs ?? 0, On = Yt.endEpochMs ?? Yt.EndEpochMs ?? 0;
        return te > En && te < On;
      });
      if (he === -1 && (he = Ve.findIndex((Yt) => {
        const En = Yt.startEpochMs ?? Yt.StartEpochMs ?? 0, On = Yt.endEpochMs ?? Yt.EndEpochMs ?? 0;
        return te >= En && te <= On;
      })), he === -1) return Le;
      const tt = Ve[he], rt = tt.startEpochMs ?? tt.StartEpochMs ?? 0, xt = tt.endEpochMs ?? tt.EndEpochMs ?? 0, It = (rt + xt) / 2, Ct = (Es = Oe == null ? void 0 : Oe.segments) == null ? void 0 : Es.find((Yt) => {
        const En = Yt.startEpochMs ?? Yt.StartEpochMs ?? 0, On = Yt.endEpochMs ?? Yt.EndEpochMs ?? 0;
        return It >= En && It <= On;
      }), sn = Ct ? Ct.targetDisplayId ?? Ct.TargetDisplayId ?? "mon-0" : "mon-0";
      return Ve[he] = { ...tt, targetDisplayId: sn, isManualOverride: !1 }, { ...Le, [L]: { ...Te, segments: Ve } };
    });
  }, [Qe, Ln]), ms = u.useMemo(() => Rt.map((L) => ({
    ...L,
    directorPlan: tn[L.id] || L.directorPlan || Ln(L.id)
  })), [Rt, tn, Ln]), yn = u.useMemo(() => Ge ? {
    ...Ge,
    directorPlan: tn[Ge.id] || Ge.directorPlan || Ln(Ge.id)
  } : null, [Ge, tn, Ln]), Or = u.useMemo(() => fn ? {
    ...fn,
    directorPlan: tn[fn.id] || fn.directorPlan || Ln(fn.id)
  } : null, [fn, tn, Ln]);
  Lx({
    activeStationId: b,
    spotlightStationId: v,
    timelineStations: ms,
    selectedStationIdsCount: k.length,
    onSelectActiveStation: Vt,
    setPlaybackSpeed: Bt,
    playheadMs: gt,
    setPlayheadMs: Nt,
    inPointMs: Me,
    setInPointMs: ze,
    outPointMs: De,
    setOutPointMs: je,
    totalTimelineDurationMs: g,
    zoomLevel: Ee,
    togglePlaySmart: $n,
    onToggleHelpModal: () => Ze((L) => !L),
    onSplitDirectorAtPlayhead: () => {
      var te, U, Oe;
      const L = b || (k.length === 1 ? k[0] : null);
      if (L) {
        const Le = Qe.find((Ve) => Ve.id === L);
        (((te = Le == null ? void 0 : Le.displays) == null ? void 0 : te.length) > 1 || ((Oe = (U = Le == null ? void 0 : Le.topology) == null ? void 0 : U.displays) == null ? void 0 : Oe.length) > 1) && Cs(L, m + gt);
      }
    },
    isModalActive: ve || Xe || dt
  }), u.useEffect(() => {
    const L = m + Me, te = m + De, U = m + gt;
    fp({
      timeRange: t,
      timeMode: r,
      inPointMs: Me,
      outPointMs: De,
      playheadMs: Math.round(gt),
      inEpochMs: L,
      outEpochMs: te,
      playheadEpochMs: U,
      selectedStationIds: k,
      activeStationId: b,
      zoomLevel: Ee,
      viewportStartMs: re,
      isWorkspaceActive: jt,
      isLooping: Xt,
      playbackSpeed: Tt,
      keystrokeMode: o,
      showRulerKeystrokes: a,
      compositionScope: O,
      compositionLayout: R,
      isAutoDirectorEnabled: F,
      isPipSwapped: T,
      audioRoutingPlan: _t,
      isAutoFollowAudio: _,
      canvasLayoutTimeline: V
    });
  }, [
    t,
    r,
    Me,
    De,
    gt,
    k,
    b,
    Ee,
    re,
    jt,
    Xt,
    Tt,
    m,
    o,
    a,
    O,
    R,
    F,
    T,
    _t,
    _,
    V
  ]);
  const xo = u.useCallback((L) => {
    var rt, xt;
    const te = Rl(L.startTime), U = Rl(L.endTime), Oe = Math.max(0, U - te) || 144e5, Le = {
      start: L.startTime,
      end: L.endTime,
      durationMs: Oe,
      startEpochMs: te,
      endEpochMs: U
    }, Te = Math.max(6e4, Math.round(Oe * 0.05)), Ve = te - Te, he = Oe + 2 * Te;
    if (n(Le), L.inEpochMs && L.outEpochMs) {
      const It = Math.max(0, Math.min(he, L.inEpochMs - Ve)), Ct = Math.max(It + 1e3, Math.min(he, L.outEpochMs - Ve)), sn = L.playheadEpochMs ? Math.max(0, Math.min(he, L.playheadEpochMs - Ve)) : It;
      ze(It), je(Ct), Nt(sn);
    } else {
      const It = typeof L.inPointMs == "number" ? L.inPointMs : Te, Ct = typeof L.outPointMs == "number" ? L.outPointMs : Te + Oe, sn = typeof L.playheadMs == "number" ? L.playheadMs : It;
      ze(Math.max(0, Math.min(he, It))), je(Math.max(0, Math.min(he, Ct))), Nt(Math.max(0, Math.min(he, sn)));
    }
    const tt = ((rt = L.selectedStationIds) == null ? void 0 : rt.length) > 0 ? L.selectedStationIds : ((xt = L.cutStationIds) == null ? void 0 : xt.length) > 0 ? L.cutStationIds : L.stationIds;
    if ((tt == null ? void 0 : tt.length) > 0) {
      E(tt);
      const It = L.spotlightStationId || L.SpotlightStationId || null, Ct = L.activeStationId || L.ActiveStationId || null;
      It && tt.includes(It) ? (P(It), p(It)) : Ct && tt.includes(Ct) ? (P(Ct), p(null)) : (P(null), p(null));
    }
    L.keystrokeMode && i(L.keystrokeMode), ct(!0), at(!1);
  }, []), Ui = u.useCallback((L) => {
    const te = L.startEpochMs || Rl(L.start, null, r), U = L.endEpochMs || Rl(L.end, null, r), Oe = Math.max(0, U - te) || 144e5, Le = Math.max(6e4, Math.round(Oe * 0.05)), Te = te - Le, Ve = Oe + 2 * Le;
    n({
      ...L,
      startEpochMs: te,
      endEpochMs: U,
      durationMs: Oe
    }), x(!1), ze(Le), je(Le + Oe), Nt(Le), q((he) => {
      if (!(he != null && he.keyframes) || he.keyframes.length === 0) return he;
      const tt = he.keyframes.map((rt, xt) => xt === 0 ? { ...rt, timestampEpochMs: Te } : rt).filter((rt) => rt.timestampEpochMs >= Te && rt.timestampEpochMs <= Te + Ve);
      return { ...he, keyframes: tt };
    }), H((he) => {
      if (!(he != null && he.segments) || he.segments.length === 0) return he;
      if (!he.segments.some((rt) => {
        const xt = rt.startEpochMs ?? rt.StartEpochMs ?? 0;
        return (rt.endEpochMs ?? rt.EndEpochMs ?? 0) > Te && xt < Te + Ve;
      })) {
        const rt = k[0] || b || "station-0";
        return {
          segments: [
            {
              startEpochMs: Te,
              endEpochMs: Te + Ve,
              sourceStationId: rt
            }
          ]
        };
      }
      return he;
    }), Lr({});
  }, [r, k, b]), Bs = u.useCallback(() => {
    if (Rt.map((te) => te.id).length === 0) return alert("No active stations selected in timeline.");
    ie(!0);
  }, [Rt]), pr = u.useCallback(async (L, te) => {
    var Ve, he, tt, rt;
    const U = Rt.map((xt) => xt.id);
    if (U.length === 0) return;
    let Oe = L === "None" ? "None" : "BurnIn";
    const Le = te || "NATIVE", Te = ((Ve = yn == null ? void 0 : yn.displays) == null ? void 0 : Ve.length) > 1 || ((tt = (he = yn == null ? void 0 : yn.topology) == null ? void 0 : he.displays) == null ? void 0 : tt.length) > 1 ? ((rt = yn == null ? void 0 : yn.directorPlan) == null ? void 0 : rt.segments) || [] : [];
    try {
      const xt = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: U,
          inEpochMs: m + Me,
          outEpochMs: m + De,
          keystrokeMode: Oe,
          resolution: Le,
          videoQuality: Le,
          compositionScope: O,
          layoutMode: "canvas",
          canvasLayout: ae,
          canvasLayoutTimeline: V,
          isPipSwapped: T,
          isAutoDirectorEnabled: F,
          directorSegments: Te,
          audioRoutingSegments: _t.segments || []
        })
      });
      if (!xt.ok) throw new Error(`HTTP ${xt.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (xt) {
      console.error("[Studio] Export failed:", xt), alert("Failed to launch background master MP4 export job.");
    }
  }, [Rt, m, Me, De, O, ae, V, T, F, yn, _t]), Jt = u.useCallback(() => {
    xg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const L = Yd(), te = Math.max(6e4, Math.round(L.durationMs * 0.05));
    n(L), ze(te), je(te + L.durationMs), Nt(te), E([]), P(null), p(null), kt(!1), Bt(1), i("BURN_IN"), Ke(), ct(!1), at(!0);
  }, [Ke, kt, Bt, Nt]), nn = !jt || k.length === 0, Zt = m + gt;
  return u.useEffect(() => {
    const L = V == null ? void 0 : V.keyframes;
    if (!L || L.length === 0) return;
    let te = 0;
    for (let U = 0; U < L.length && L[U].timestampEpochMs <= Zt + 50; U++)
      te = U;
    te !== de && Z(te);
  }, [Zt, V == null ? void 0 : V.keyframes, de]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        fg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: b,
          hideBackToGrid: Rt.length <= 1,
          onResetActiveStation: () => Vt(null),
          onOpenRangeModal: () => Ce(!0),
          onOpenBookmarksModal: () => Je(!0),
          onOpenHelpModal: () => Ze(!0),
          onToggleDrawer: () => at(!Ye),
          isInitialSetup: nn,
          selectedCount: k.length,
          totalCount: Qe.length,
          onResetStudio: Jt
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
              onClick: () => Ce(!0),
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
                activeStation: yn,
                timelineStations: ms,
                allStations: Qe,
                onSelectActiveStation: Vt,
                onOpenSpotlight: ps,
                onStationContextMenu: be,
                onDeselectStation: we,
                stationAutoDirectorMap: Q,
                onToggleStationAutoDirector: ge,
                onOpenDrawer: () => at(!0),
                baseEpochMs: m,
                playheadMs: gt,
                playheadEpochMs: Zt,
                timeMode: r,
                isPlaying: He ? !1 : Cn,
                setIsPlaying: kt,
                totalDurationMs: g,
                inPointMs: Me,
                outPointMs: De,
                setPlayheadMs: Nt,
                globalGaps: S,
                recordingSegments: Ue,
                playbackSpeed: Tt,
                onChangePlaybackSpeed: Bt,
                keystrokeMode: o,
                keystrokes: $t,
                directorPlan: yn == null ? void 0 : yn.directorPlan,
                onOverrideDisplay: Ie,
                onResetOverride: $e,
                compositionScope: O,
                onChangeCompositionScope: z,
                compositionLayout: R,
                onChangeCompositionLayout: ne,
                isAutoDirectorEnabled: F,
                onToggleAutoDirector: () => G((L) => !L),
                isPipSwapped: T,
                onTogglePipSwap: () => A((L) => !L),
                onUpdateCanvasLayout: Be,
                canvasLayoutTimeline: V,
                onUpdateCanvasLayoutTimeline: q,
                activeKfIndex: de,
                setActiveKfIndex: Z,
                isModalOpen: ee || ve || Xe || He || dt
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
                inPointMs: Me,
                setInPointMs: ze,
                outPointMs: De,
                setOutPointMs: je,
                activeStationId: b,
                isPlaying: Cn,
                setIsPlaying: $n,
                isLooping: Xt,
                setIsLooping: cn,
                playbackSpeed: Tt,
                onChangeSpeed: Bt,
                onSetInPoint: () => ze(Math.max(0, Math.min(gt, De - 1e3))),
                onSetOutPoint: () => je(Math.min(g, Math.max(gt, Me + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: jn, children: /* @__PURE__ */ s.jsx(
            vp,
            {
              stations: ms,
              activeStationId: b,
              onSelectActiveStation: (L) => Vt(k.length <= 1 ? L : L === b ? null : L),
              onStationContextMenu: be,
              onDeselectStation: we,
              stationAutoDirectorMap: Q,
              onToggleStationAutoDirector: ge,
              baseEpochMs: m,
              timeMode: r,
              totalDurationMs: g,
              zoomLevel: Ee,
              onZoomChange: Se,
              onZoomReset: Ke,
              onFitRange: K,
              onJumpViewportTo: ue,
              playheadMs: gt,
              setPlayheadMs: Nt,
              inPointMs: Me,
              setInPointMs: ze,
              outPointMs: De,
              setOutPointMs: je,
              viewportStartMs: re,
              onViewportStartChange: We,
              onExport: Bs,
              recordingSegments: Ue,
              movieBoundaries: et,
              onEstimateLoaded: (L) => (L == null ? void 0 : L.removedGlobalGaps) && j(L.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: i,
              keystrokes: $t,
              showKeystrokes: a,
              showRulerKeystrokes: a,
              onToggleRulerKeystrokes: () => c((L) => !L),
              onSplitDirectorSegment: Cs,
              onChangeDirectorSegmentDisplay: Ie,
              onResetDirectorSegmentToAuto: $e,
              audioRoutingPlan: _t,
              onSplitAudioSegment: js,
              onChangeAudioSegmentStation: Kt,
              onChangeAudioSegmentGain: Qt,
              onFollowVisualFeed: Fs,
              isAutoFollowAudio: _,
              canvasLayoutTimeline: V,
              activeKfIndex: de,
              onSelectKeyframe: (L, te) => {
                Z(L), Nt(Math.max(0, te - m));
              },
              onAddKeyframeAtEpoch: le,
              onDeleteKeyframe: Fe,
              onUpdateKeyframeEpoch: X,
              onUpdateKeyframeTransition: ye,
              onToggleDisplayOnCanvas: ln,
              onUpdateAudioPlan: H
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          mx,
          {
            isOpen: Ye || nn,
            onToggle: () => at(!Ye),
            onClose: () => at(!1),
            allStations: Qe,
            selectedStationIds: k,
            onToggleStation: (L) => E((te) => te.includes(L) ? te.filter((U) => U !== L) : [...te, L]),
            onUpdateSelections: E,
            isInitialSetup: nn,
            isLoadingStations: en,
            recordingSegments: Ue,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              k.length > 0 && (P(null), p(null), ct(!0), at(!1));
            },
            onOpenRangeModal: () => Ce(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      yx,
      {
        isOpen: ve,
        onClose: () => Ce(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: xo,
        onApplyRange: Ui
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
          inPointMs: Me,
          outPointMs: De,
          selectedStationIds: k,
          selectedStationNames: Qe.filter((L) => k.includes(L.id)).map((L) => L.displayName || L.hostname || L.id),
          allStationIds: Qe.map((L) => L.id),
          activeStationId: b,
          activeStationName: (Ge == null ? void 0 : Ge.displayName) || (Ge == null ? void 0 : Ge.hostname) || null,
          spotlightStationId: v,
          keystrokeMode: o
        },
        onLoadBookmark: xo
      }
    ),
    /* @__PURE__ */ s.jsx(
      wp,
      {
        isOpen: dt,
        onClose: () => Ze(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      bx,
      {
        isOpen: He,
        station: Or,
        initialDisplayId: h,
        allStations: ms,
        onSelectStation: (L) => {
          L !== v && Bt(1), P(L), p(L);
        },
        onClose: Qn,
        baseEpochMs: m,
        timeMode: r,
        totalDurationMs: g,
        zoomLevel: Ee,
        onZoomChange: Se,
        onZoomReset: Ke,
        onFitRange: K,
        onJumpViewportTo: ue,
        viewportStartMs: re,
        onViewportStartChange: We,
        playheadMs: gt,
        setPlayheadMs: Nt,
        playheadEpochMs: Zt,
        inPointMs: Me,
        setInPointMs: ze,
        outPointMs: De,
        setOutPointMs: je,
        recordingSegments: Ue,
        globalGaps: S,
        isPlaying: Cn,
        setIsPlaying: kt,
        isLooping: Xt,
        setIsLooping: cn,
        playbackSpeed: Tt,
        setPlaybackSpeed: Bt,
        onExport: Bs,
        keystrokeMode: o,
        onChangeKeystrokeMode: i,
        keystrokes: $t,
        showRulerKeystrokes: a,
        onToggleRulerKeystrokes: () => c((L) => !L),
        directorPlan: Or == null ? void 0 : Or.directorPlan,
        onOverrideDisplay: Ie,
        onSplitDirectorSegment: Cs,
        onChangeDirectorSegmentDisplay: Ie,
        onResetDirectorSegmentToAuto: $e
      }
    ),
    /* @__PURE__ */ s.jsx(
      Mx,
      {
        menu: w,
        onClose: () => M(null),
        onDeselect: we,
        onFocusSolo: Vt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ix,
      {
        isOpen: ee,
        onClose: () => ie(!1),
        onConfirm: pr,
        compositionSummary: {
          scope: O,
          layout: (ae == null ? void 0 : ae.preset) || R,
          isPipSwapped: T,
          isAutoDirectorEnabled: F,
          stationsCount: Rt.length,
          audioSegmentsCount: ((Nl = _t == null ? void 0 : _t.segments) == null ? void 0 : Nl.length) || 1,
          resolution: (V == null ? void 0 : V.resolution) || "NATIVE",
          canvasWidth: (ae == null ? void 0 : ae.width) || 1920,
          canvasHeight: (ae == null ? void 0 : ae.height) || 1080
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
