function _p(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xd = { exports: {} }, ht = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ho = Symbol.for("react.element"), Fp = Symbol.for("react.portal"), Bp = Symbol.for("react.fragment"), Up = Symbol.for("react.strict_mode"), Wp = Symbol.for("react.profiler"), zp = Symbol.for("react.provider"), Hp = Symbol.for("react.context"), Vp = Symbol.for("react.forward_ref"), Kp = Symbol.for("react.suspense"), Gp = Symbol.for("react.memo"), Yp = Symbol.for("react.lazy"), Cu = Symbol.iterator;
function Xp(e) {
  return e === null || typeof e != "object" ? null : (e = Cu && e[Cu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Qd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Jd = Object.assign, Zd = {};
function xl(e, t, n) {
  this.props = e, this.context = t, this.refs = Zd, this.updater = n || Qd;
}
xl.prototype.isReactComponent = {};
xl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function qd() {
}
qd.prototype = xl.prototype;
function wc(e, t, n) {
  this.props = e, this.context = t, this.refs = Zd, this.updater = n || Qd;
}
var jc = wc.prototype = new qd();
jc.constructor = wc;
Jd(jc, xl.prototype);
jc.isPureReactComponent = !0;
var Eu = Array.isArray, eh = Object.prototype.hasOwnProperty, Cc = { current: null }, th = { key: !0, ref: !0, __self: !0, __source: !0 };
function nh(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) eh.call(t, r) && !th.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), d = 0; d < a; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: ho, type: e, key: o, ref: i, props: l, _owner: Cc.current };
}
function Qp(e, t) {
  return { $$typeof: ho, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ec(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ho;
}
function Jp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Su = /\/+/g;
function Ki(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Jp("" + e.key) : t.toString(36);
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
        case ho:
        case Fp:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Ki(i, 0) : r, Eu(l) ? (n = "", e != null && (n = e.replace(Su, "$&/") + "/"), Fo(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Ec(l) && (l = Qp(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Su, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Eu(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var c = r + Ki(o, a);
    i += Fo(o, t, n, c, l);
  }
  else if (c = Xp(e), typeof c == "function") for (e = c.call(e), a = 0; !(o = e.next()).done; ) o = o.value, c = r + Ki(o, a++), i += Fo(o, t, n, c, l);
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
var Tn = { current: null }, Bo = { transition: null }, qp = { ReactCurrentDispatcher: Tn, ReactCurrentBatchConfig: Bo, ReactCurrentOwner: Cc };
function sh() {
  throw Error("act(...) is not supported in production builds of React.");
}
ht.Children = { map: No, forEach: function(e, t, n) {
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
  if (!Ec(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
ht.Component = xl;
ht.Fragment = Bp;
ht.Profiler = Wp;
ht.PureComponent = wc;
ht.StrictMode = Up;
ht.Suspense = Kp;
ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qp;
ht.act = sh;
ht.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Jd({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Cc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) eh.call(t, c) && !th.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
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
ht.createContext = function(e) {
  return e = { $$typeof: Hp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: zp, _context: e }, e.Consumer = e;
};
ht.createElement = nh;
ht.createFactory = function(e) {
  var t = nh.bind(null, e);
  return t.type = e, t;
};
ht.createRef = function() {
  return { current: null };
};
ht.forwardRef = function(e) {
  return { $$typeof: Vp, render: e };
};
ht.isValidElement = Ec;
ht.lazy = function(e) {
  return { $$typeof: Yp, _payload: { _status: -1, _result: e }, _init: Zp };
};
ht.memo = function(e, t) {
  return { $$typeof: Gp, type: e, compare: t === void 0 ? null : t };
};
ht.startTransition = function(e) {
  var t = Bo.transition;
  Bo.transition = {};
  try {
    e();
  } finally {
    Bo.transition = t;
  }
};
ht.unstable_act = sh;
ht.useCallback = function(e, t) {
  return Tn.current.useCallback(e, t);
};
ht.useContext = function(e) {
  return Tn.current.useContext(e);
};
ht.useDebugValue = function() {
};
ht.useDeferredValue = function(e) {
  return Tn.current.useDeferredValue(e);
};
ht.useEffect = function(e, t) {
  return Tn.current.useEffect(e, t);
};
ht.useId = function() {
  return Tn.current.useId();
};
ht.useImperativeHandle = function(e, t, n) {
  return Tn.current.useImperativeHandle(e, t, n);
};
ht.useInsertionEffect = function(e, t) {
  return Tn.current.useInsertionEffect(e, t);
};
ht.useLayoutEffect = function(e, t) {
  return Tn.current.useLayoutEffect(e, t);
};
ht.useMemo = function(e, t) {
  return Tn.current.useMemo(e, t);
};
ht.useReducer = function(e, t, n) {
  return Tn.current.useReducer(e, t, n);
};
ht.useRef = function(e) {
  return Tn.current.useRef(e);
};
ht.useState = function(e) {
  return Tn.current.useState(e);
};
ht.useSyncExternalStore = function(e, t, n) {
  return Tn.current.useSyncExternalStore(e, t, n);
};
ht.useTransition = function() {
  return Tn.current.useTransition();
};
ht.version = "18.3.1";
Xd.exports = ht;
var u = Xd.exports;
const Si = /* @__PURE__ */ _p(u);
var qo = {}, rh = { exports: {} }, Vn = {}, lh = { exports: {} }, oh = {};
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
  function t(T, _) {
    var z = T.length;
    T.push(_);
    e: for (; 0 < z; ) {
      var ee = z - 1 >>> 1, U = T[ee];
      if (0 < l(U, _)) T[ee] = _, T[z] = U, z = ee;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var _ = T[0], z = T.pop();
    if (z !== _) {
      T[0] = z;
      e: for (var ee = 0, U = T.length, ge = U >>> 1; ee < ge; ) {
        var oe = 2 * (ee + 1) - 1, re = T[oe], se = oe + 1, Be = T[se];
        if (0 > l(re, z)) se < U && 0 > l(Be, re) ? (T[ee] = Be, T[se] = z, ee = se) : (T[ee] = re, T[oe] = z, ee = oe);
        else if (se < U && 0 > l(Be, z)) T[ee] = Be, T[se] = z, ee = se;
        else break e;
      }
    }
    return _;
  }
  function l(T, _) {
    var z = T.sortIndex - _.sortIndex;
    return z !== 0 ? z : T.id - _.id;
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
  var c = [], d = [], v = 1, g = null, m = 3, k = !1, S = !1, b = !1, O = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(T) {
    for (var _ = n(d); _ !== null; ) {
      if (_.callback === null) r(d);
      else if (_.startTime <= T) r(d), _.sortIndex = _.expirationTime, t(c, _);
      else break;
      _ = n(d);
    }
  }
  function w(T) {
    if (b = !1, f(T), !S) if (n(c) !== null) S = !0, V(I);
    else {
      var _ = n(d);
      _ !== null && A(w, _.startTime - T);
    }
  }
  function I(T, _) {
    S = !1, b && (b = !1, y(x), x = -1), k = !0;
    var z = m;
    try {
      for (f(_), g = n(c); g !== null && (!(g.expirationTime > _) || T && !D()); ) {
        var ee = g.callback;
        if (typeof ee == "function") {
          g.callback = null, m = g.priorityLevel;
          var U = ee(g.expirationTime <= _);
          _ = e.unstable_now(), typeof U == "function" ? g.callback = U : g === n(c) && r(c), f(_);
        } else r(c);
        g = n(c);
      }
      if (g !== null) var ge = !0;
      else {
        var oe = n(d);
        oe !== null && A(w, oe.startTime - _), ge = !1;
      }
      return ge;
    } finally {
      g = null, m = z, k = !1;
    }
  }
  var j = !1, N = null, x = -1, C = 5, M = -1;
  function D() {
    return !(e.unstable_now() - M < C);
  }
  function K() {
    if (N !== null) {
      var T = e.unstable_now();
      M = T;
      var _ = !0;
      try {
        _ = N(!0, T);
      } finally {
        _ ? $() : (j = !1, N = null);
      }
    } else j = !1;
  }
  var $;
  if (typeof p == "function") $ = function() {
    p(K);
  };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(), Z = W.port2;
    W.port1.onmessage = K, $ = function() {
      Z.postMessage(null);
    };
  } else $ = function() {
    O(K, 0);
  };
  function V(T) {
    N = T, j || (j = !0, $());
  }
  function A(T, _) {
    x = O(function() {
      T(e.unstable_now());
    }, _);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    S || k || (S = !0, V(I));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(T) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var _ = 3;
        break;
      default:
        _ = m;
    }
    var z = m;
    m = _;
    try {
      return T();
    } finally {
      m = z;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, _) {
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
    var z = m;
    m = T;
    try {
      return _();
    } finally {
      m = z;
    }
  }, e.unstable_scheduleCallback = function(T, _, z) {
    var ee = e.unstable_now();
    switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? ee + z : ee) : z = ee, T) {
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
    return U = z + U, T = { id: v++, callback: _, priorityLevel: T, startTime: z, expirationTime: U, sortIndex: -1 }, z > ee ? (T.sortIndex = z, t(d, T), n(c) === null && T === n(d) && (b ? (y(x), x = -1) : b = !0, A(w, z - ee))) : (T.sortIndex = U, t(c, T), S || k || (S = !0, V(I))), T;
  }, e.unstable_shouldYield = D, e.unstable_wrapCallback = function(T) {
    var _ = m;
    return function() {
      var z = m;
      m = _;
      try {
        return T.apply(this, arguments);
      } finally {
        m = z;
      }
    };
  };
})(oh);
lh.exports = oh;
var em = lh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tm = u, Hn = em;
function he(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ih = /* @__PURE__ */ new Set(), Gl = {};
function Ar(e, t) {
  ul(e, t), ul(e + "Capture", t);
}
function ul(e, t) {
  for (Gl[e] = t, e = 0; e < t.length; e++) ih.add(t[e]);
}
var Rs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ea = Object.prototype.hasOwnProperty, nm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, bu = {}, Mu = {};
function sm(e) {
  return Ea.call(Mu, e) ? !0 : Ea.call(bu, e) ? !1 : nm.test(e) ? Mu[e] = !0 : (bu[e] = !0, !1);
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
function An(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var vn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  vn[e] = new An(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  vn[t] = new An(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  vn[e] = new An(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  vn[e] = new An(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  vn[e] = new An(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  vn[e] = new An(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  vn[e] = new An(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  vn[e] = new An(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  vn[e] = new An(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Sc = /[\-:]([a-z])/g;
function bc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Sc,
    bc
  );
  vn[t] = new An(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Sc, bc);
  vn[t] = new An(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Sc, bc);
  vn[t] = new An(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  vn[e] = new An(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
vn.xlinkHref = new An("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  vn[e] = new An(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Mc(e, t, n, r) {
  var l = vn.hasOwnProperty(t) ? vn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (lm(t, n, l, r) && (n = null), r || l === null ? sm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ds = tm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ko = Symbol.for("react.element"), Wr = Symbol.for("react.portal"), zr = Symbol.for("react.fragment"), Ic = Symbol.for("react.strict_mode"), Sa = Symbol.for("react.profiler"), ah = Symbol.for("react.provider"), ch = Symbol.for("react.context"), Tc = Symbol.for("react.forward_ref"), ba = Symbol.for("react.suspense"), Ma = Symbol.for("react.suspense_list"), Ac = Symbol.for("react.memo"), Vs = Symbol.for("react.lazy"), uh = Symbol.for("react.offscreen"), Iu = Symbol.iterator;
function jl(e) {
  return e === null || typeof e != "object" ? null : (e = Iu && e[Iu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Gt = Object.assign, Gi;
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
var Yi = !1;
function Xi(e, t) {
  if (!e || Yi) return "";
  Yi = !0;
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
    Yi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? $l(e) : "";
}
function om(e) {
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
      return e = Xi(e.type, !1), e;
    case 11:
      return e = Xi(e.type.render, !1), e;
    case 1:
      return e = Xi(e.type, !0), e;
    default:
      return "";
  }
}
function Ia(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case zr:
      return "Fragment";
    case Wr:
      return "Portal";
    case Sa:
      return "Profiler";
    case Ic:
      return "StrictMode";
    case ba:
      return "Suspense";
    case Ma:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ch:
      return (e.displayName || "Context") + ".Consumer";
    case ah:
      return (e._context.displayName || "Context") + ".Provider";
    case Tc:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Ac:
      return t = e.displayName || null, t !== null ? t : Ia(e.type) || "Memo";
    case Vs:
      t = e._payload, e = e._init;
      try {
        return Ia(e(t));
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
      return Ia(t);
    case 8:
      return t === Ic ? "StrictMode" : "Mode";
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
function dh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function am(e) {
  var t = dh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = am(e));
}
function hh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = dh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ei(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ta(e, t) {
  var n = t.checked;
  return Gt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Tu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ar(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function fh(e, t) {
  t = t.checked, t != null && Mc(e, "checked", t, !1);
}
function Aa(e, t) {
  fh(e, t);
  var n = ar(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ra(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ra(e, t.type, ar(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Au(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Ra(e, t, n) {
  (t !== "number" || ei(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ll = Array.isArray;
function tl(e, t, n, r) {
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
function $a(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(he(91));
  return Gt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ru(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(he(92));
      if (Ll(n)) {
        if (1 < n.length) throw Error(he(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ar(n) };
}
function ph(e, t) {
  var n = ar(t.value), r = ar(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function $u(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function mh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function La(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? mh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var jo, gh = function(e) {
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
function xh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || _l.hasOwnProperty(e) && _l[e] ? ("" + t).trim() : t + "px";
}
function yh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = xh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var um = Gt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Oa(e, t) {
  if (t) {
    if (um[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(he(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(he(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(he(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(he(62));
  }
}
function Da(e, t) {
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
var Pa = null;
function Rc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var _a = null, nl = null, sl = null;
function Lu(e) {
  if (e = mo(e)) {
    if (typeof _a != "function") throw Error(he(280));
    var t = e.stateNode;
    t && (t = Ai(t), _a(e.stateNode, e.type, t));
  }
}
function vh(e) {
  nl ? sl ? sl.push(e) : sl = [e] : nl = e;
}
function Nh() {
  if (nl) {
    var e = nl, t = sl;
    if (sl = nl = null, Lu(e), t) for (e = 0; e < t.length; e++) Lu(t[e]);
  }
}
function kh(e, t) {
  return e(t);
}
function wh() {
}
var Qi = !1;
function jh(e, t, n) {
  if (Qi) return e(t, n);
  Qi = !0;
  try {
    return kh(e, t, n);
  } finally {
    Qi = !1, (nl !== null || sl !== null) && (wh(), Nh());
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
  if (n && typeof n != "function") throw Error(he(231, t, typeof n));
  return n;
}
var Fa = !1;
if (Rs) try {
  var Cl = {};
  Object.defineProperty(Cl, "passive", { get: function() {
    Fa = !0;
  } }), window.addEventListener("test", Cl, Cl), window.removeEventListener("test", Cl, Cl);
} catch {
  Fa = !1;
}
function dm(e, t, n, r, l, o, i, a, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Fl = !1, ti = null, ni = !1, Ba = null, hm = { onError: function(e) {
  Fl = !0, ti = e;
} };
function fm(e, t, n, r, l, o, i, a, c) {
  Fl = !1, ti = null, dm.apply(hm, arguments);
}
function pm(e, t, n, r, l, o, i, a, c) {
  if (fm.apply(this, arguments), Fl) {
    if (Fl) {
      var d = ti;
      Fl = !1, ti = null;
    } else throw Error(he(198));
    ni || (ni = !0, Ba = d);
  }
}
function Rr(e) {
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
function Ch(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Ou(e) {
  if (Rr(e) !== e) throw Error(he(188));
}
function mm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Rr(e), t === null) throw Error(he(188));
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
        if (o === n) return Ou(l), e;
        if (o === r) return Ou(l), t;
        o = o.sibling;
      }
      throw Error(he(188));
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
        if (!i) throw Error(he(189));
      }
    }
    if (n.alternate !== r) throw Error(he(190));
  }
  if (n.tag !== 3) throw Error(he(188));
  return n.stateNode.current === n ? e : t;
}
function Eh(e) {
  return e = mm(e), e !== null ? Sh(e) : null;
}
function Sh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Sh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var bh = Hn.unstable_scheduleCallback, Du = Hn.unstable_cancelCallback, gm = Hn.unstable_shouldYield, xm = Hn.unstable_requestPaint, nn = Hn.unstable_now, ym = Hn.unstable_getCurrentPriorityLevel, $c = Hn.unstable_ImmediatePriority, Mh = Hn.unstable_UserBlockingPriority, si = Hn.unstable_NormalPriority, vm = Hn.unstable_LowPriority, Ih = Hn.unstable_IdlePriority, bi = null, vs = null;
function Nm(e) {
  if (vs && typeof vs.onCommitFiberRoot == "function") try {
    vs.onCommitFiberRoot(bi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var cs = Math.clz32 ? Math.clz32 : jm, km = Math.log, wm = Math.LN2;
function jm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (km(e) / wm | 0) | 0;
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
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - cs(t), l = 1 << n, r |= e[n], t &= ~l;
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
    var i = 31 - cs(o), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & r) && (l[i] = Cm(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function Ua(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Th() {
  var e = Co;
  return Co <<= 1, !(Co & 4194240) && (Co = 64), e;
}
function Ji(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function fo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - cs(t), e[t] = n;
}
function Sm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - cs(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Lc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - cs(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var It = 0;
function Ah(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Rh, Oc, $h, Lh, Oh, Wa = !1, So = [], er = null, tr = null, nr = null, Ql = /* @__PURE__ */ new Map(), Jl = /* @__PURE__ */ new Map(), Xs = [], bm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Pu(e, t) {
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
      Ql.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Jl.delete(t.pointerId);
  }
}
function El(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = mo(t), t !== null && Oc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Mm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return er = El(er, e, t, n, r, l), !0;
    case "dragenter":
      return tr = El(tr, e, t, n, r, l), !0;
    case "mouseover":
      return nr = El(nr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Ql.set(o, El(Ql.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Jl.set(o, El(Jl.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Dh(e) {
  var t = Nr(e.target);
  if (t !== null) {
    var n = Rr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ch(n), t !== null) {
          e.blockedOn = t, Oh(e.priority, function() {
            $h(n);
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
    var n = za(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Pa = r, n.target.dispatchEvent(r), Pa = null;
    } else return t = mo(n), t !== null && Oc(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function _u(e, t, n) {
  Uo(e) && n.delete(t);
}
function Im() {
  Wa = !1, er !== null && Uo(er) && (er = null), tr !== null && Uo(tr) && (tr = null), nr !== null && Uo(nr) && (nr = null), Ql.forEach(_u), Jl.forEach(_u);
}
function Sl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Wa || (Wa = !0, Hn.unstable_scheduleCallback(Hn.unstable_NormalPriority, Im)));
}
function Zl(e) {
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
  for (er !== null && Sl(er, e), tr !== null && Sl(tr, e), nr !== null && Sl(nr, e), Ql.forEach(t), Jl.forEach(t), n = 0; n < Xs.length; n++) r = Xs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Xs.length && (n = Xs[0], n.blockedOn === null); ) Dh(n), n.blockedOn === null && Xs.shift();
}
var rl = Ds.ReactCurrentBatchConfig, li = !0;
function Tm(e, t, n, r) {
  var l = It, o = rl.transition;
  rl.transition = null;
  try {
    It = 1, Dc(e, t, n, r);
  } finally {
    It = l, rl.transition = o;
  }
}
function Am(e, t, n, r) {
  var l = It, o = rl.transition;
  rl.transition = null;
  try {
    It = 4, Dc(e, t, n, r);
  } finally {
    It = l, rl.transition = o;
  }
}
function Dc(e, t, n, r) {
  if (li) {
    var l = za(e, t, n, r);
    if (l === null) ia(e, t, r, oi, n), Pu(e, r);
    else if (Mm(l, e, t, n, r)) r.stopPropagation();
    else if (Pu(e, r), t & 4 && -1 < bm.indexOf(e)) {
      for (; l !== null; ) {
        var o = mo(l);
        if (o !== null && Rh(o), o = za(e, t, n, r), o === null && ia(e, t, r, oi, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ia(e, t, r, null, n);
  }
}
var oi = null;
function za(e, t, n, r) {
  if (oi = null, e = Rc(r), e = Nr(e), e !== null) if (t = Rr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ch(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return oi = e, null;
}
function Ph(e) {
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
        case $c:
          return 1;
        case Mh:
          return 4;
        case si:
        case vm:
          return 16;
        case Ih:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Zs = null, Pc = null, Wo = null;
function _h() {
  if (Wo) return Wo;
  var e, t = Pc, n = t.length, r, l = "value" in Zs ? Zs.value : Zs.textContent, o = l.length;
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
function Fu() {
  return !1;
}
function Kn(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? bo : Fu, this.isPropagationStopped = Fu, this;
  }
  return Gt(t.prototype, { preventDefault: function() {
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
}, defaultPrevented: 0, isTrusted: 0 }, _c = Kn(yl), po = Gt({}, yl, { view: 0, detail: 0 }), Rm = Kn(po), Zi, qi, bl, Mi = Gt({}, po, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Fc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== bl && (bl && e.type === "mousemove" ? (Zi = e.screenX - bl.screenX, qi = e.screenY - bl.screenY) : qi = Zi = 0, bl = e), Zi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : qi;
} }), Bu = Kn(Mi), $m = Gt({}, Mi, { dataTransfer: 0 }), Lm = Kn($m), Om = Gt({}, po, { relatedTarget: 0 }), ea = Kn(Om), Dm = Gt({}, yl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Pm = Kn(Dm), _m = Gt({}, yl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Fm = Kn(_m), Bm = Gt({}, yl, { data: 0 }), Uu = Kn(Bm), Um = {
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
}, zm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Hm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = zm[e]) ? !!t[e] : !1;
}
function Fc() {
  return Hm;
}
var Vm = Gt({}, po, { key: function(e) {
  if (e.key) {
    var t = Um[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = zo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Wm[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Fc, charCode: function(e) {
  return e.type === "keypress" ? zo(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? zo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Km = Kn(Vm), Gm = Gt({}, Mi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Wu = Kn(Gm), Ym = Gt({}, po, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Fc }), Xm = Kn(Ym), Qm = Gt({}, yl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Jm = Kn(Qm), Zm = Gt({}, Mi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), qm = Kn(Zm), e0 = [9, 13, 27, 32], Bc = Rs && "CompositionEvent" in window, Bl = null;
Rs && "documentMode" in document && (Bl = document.documentMode);
var t0 = Rs && "TextEvent" in window && !Bl, Fh = Rs && (!Bc || Bl && 8 < Bl && 11 >= Bl), zu = " ", Hu = !1;
function Bh(e, t) {
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
function Uh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Hr = !1;
function n0(e, t) {
  switch (e) {
    case "compositionend":
      return Uh(t);
    case "keypress":
      return t.which !== 32 ? null : (Hu = !0, zu);
    case "textInput":
      return e = t.data, e === zu && Hu ? null : e;
    default:
      return null;
  }
}
function s0(e, t) {
  if (Hr) return e === "compositionend" || !Bc && Bh(e, t) ? (e = _h(), Wo = Pc = Zs = null, Hr = !1, e) : null;
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
      return Fh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var r0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Vu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!r0[e.type] : t === "textarea";
}
function Wh(e, t, n, r) {
  vh(r), t = ii(t, "onChange"), 0 < t.length && (n = new _c("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Ul = null, ql = null;
function l0(e) {
  qh(e, 0);
}
function Ii(e) {
  var t = Gr(e);
  if (hh(t)) return e;
}
function o0(e, t) {
  if (e === "change") return t;
}
var zh = !1;
if (Rs) {
  var ta;
  if (Rs) {
    var na = "oninput" in document;
    if (!na) {
      var Ku = document.createElement("div");
      Ku.setAttribute("oninput", "return;"), na = typeof Ku.oninput == "function";
    }
    ta = na;
  } else ta = !1;
  zh = ta && (!document.documentMode || 9 < document.documentMode);
}
function Gu() {
  Ul && (Ul.detachEvent("onpropertychange", Hh), ql = Ul = null);
}
function Hh(e) {
  if (e.propertyName === "value" && Ii(ql)) {
    var t = [];
    Wh(t, ql, e, Rc(e)), jh(l0, t);
  }
}
function i0(e, t, n) {
  e === "focusin" ? (Gu(), Ul = t, ql = n, Ul.attachEvent("onpropertychange", Hh)) : e === "focusout" && Gu();
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
var ds = typeof Object.is == "function" ? Object.is : d0;
function eo(e, t) {
  if (ds(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ea.call(t, l) || !ds(e[l], t[l])) return !1;
  }
  return !0;
}
function Yu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Xu(e, t) {
  var n = Yu(e);
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
    n = Yu(n);
  }
}
function Vh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Vh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Kh() {
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
function Uc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function h0(e) {
  var t = Kh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Vh(n.ownerDocument.documentElement, n)) {
    if (r !== null && Uc(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Xu(n, o);
        var i = Xu(
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
var f0 = Rs && "documentMode" in document && 11 >= document.documentMode, Vr = null, Ha = null, Wl = null, Va = !1;
function Qu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Va || Vr == null || Vr !== ei(r) || (r = Vr, "selectionStart" in r && Uc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Wl && eo(Wl, r) || (Wl = r, r = ii(Ha, "onSelect"), 0 < r.length && (t = new _c("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Vr)));
}
function Mo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Kr = { animationend: Mo("Animation", "AnimationEnd"), animationiteration: Mo("Animation", "AnimationIteration"), animationstart: Mo("Animation", "AnimationStart"), transitionend: Mo("Transition", "TransitionEnd") }, sa = {}, Gh = {};
Rs && (Gh = document.createElement("div").style, "AnimationEvent" in window || (delete Kr.animationend.animation, delete Kr.animationiteration.animation, delete Kr.animationstart.animation), "TransitionEvent" in window || delete Kr.transitionend.transition);
function Ti(e) {
  if (sa[e]) return sa[e];
  if (!Kr[e]) return e;
  var t = Kr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Gh) return sa[e] = t[n];
  return e;
}
var Yh = Ti("animationend"), Xh = Ti("animationiteration"), Qh = Ti("animationstart"), Jh = Ti("transitionend"), Zh = /* @__PURE__ */ new Map(), Ju = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ur(e, t) {
  Zh.set(e, t), Ar(t, [e]);
}
for (var ra = 0; ra < Ju.length; ra++) {
  var la = Ju[ra], p0 = la.toLowerCase(), m0 = la[0].toUpperCase() + la.slice(1);
  ur(p0, "on" + m0);
}
ur(Yh, "onAnimationEnd");
ur(Xh, "onAnimationIteration");
ur(Qh, "onAnimationStart");
ur("dblclick", "onDoubleClick");
ur("focusin", "onFocus");
ur("focusout", "onBlur");
ur(Jh, "onTransitionEnd");
ul("onMouseEnter", ["mouseout", "mouseover"]);
ul("onMouseLeave", ["mouseout", "mouseover"]);
ul("onPointerEnter", ["pointerout", "pointerover"]);
ul("onPointerLeave", ["pointerout", "pointerover"]);
Ar("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ar("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ar("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ar("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ar("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ar("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Dl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), g0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Dl));
function Zu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, pm(r, t, void 0, e), e.currentTarget = null;
}
function qh(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], c = a.instance, d = a.currentTarget;
        if (a = a.listener, c !== o && l.isPropagationStopped()) break e;
        Zu(l, a, d), o = c;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], c = a.instance, d = a.currentTarget, a = a.listener, c !== o && l.isPropagationStopped()) break e;
        Zu(l, a, d), o = c;
      }
    }
  }
  if (ni) throw e = Ba, ni = !1, Ba = null, e;
}
function _t(e, t) {
  var n = t[Qa];
  n === void 0 && (n = t[Qa] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ef(t, e, 2, !1), n.add(r));
}
function oa(e, t, n) {
  var r = 0;
  t && (r |= 4), ef(n, e, r, t);
}
var Io = "_reactListening" + Math.random().toString(36).slice(2);
function to(e) {
  if (!e[Io]) {
    e[Io] = !0, ih.forEach(function(n) {
      n !== "selectionchange" && (g0.has(n) || oa(n, !1, e), oa(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Io] || (t[Io] = !0, oa("selectionchange", !1, t));
  }
}
function ef(e, t, n, r) {
  switch (Ph(t)) {
    case 1:
      var l = Tm;
      break;
    case 4:
      l = Am;
      break;
    default:
      l = Dc;
  }
  n = l.bind(null, t, n, e), l = void 0, !Fa || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ia(e, t, n, r, l) {
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
        if (i = Nr(a), i === null) return;
        if (c = i.tag, c === 5 || c === 6) {
          r = o = i;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  jh(function() {
    var d = o, v = Rc(n), g = [];
    e: {
      var m = Zh.get(e);
      if (m !== void 0) {
        var k = _c, S = e;
        switch (e) {
          case "keypress":
            if (zo(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = Km;
            break;
          case "focusin":
            S = "focus", k = ea;
            break;
          case "focusout":
            S = "blur", k = ea;
            break;
          case "beforeblur":
          case "afterblur":
            k = ea;
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
            k = Bu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = Lm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = Xm;
            break;
          case Yh:
          case Xh:
          case Qh:
            k = Pm;
            break;
          case Jh:
            k = Jm;
            break;
          case "scroll":
            k = Rm;
            break;
          case "wheel":
            k = qm;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = Fm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = Wu;
        }
        var b = (t & 4) !== 0, O = !b && e === "scroll", y = b ? m !== null ? m + "Capture" : null : m;
        b = [];
        for (var p = d, f; p !== null; ) {
          f = p;
          var w = f.stateNode;
          if (f.tag === 5 && w !== null && (f = w, y !== null && (w = Xl(p, y), w != null && b.push(no(p, w, f)))), O) break;
          p = p.return;
        }
        0 < b.length && (m = new k(m, S, null, n, v), g.push({ event: m, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", m && n !== Pa && (S = n.relatedTarget || n.fromElement) && (Nr(S) || S[$s])) break e;
        if ((k || m) && (m = v.window === v ? v : (m = v.ownerDocument) ? m.defaultView || m.parentWindow : window, k ? (S = n.relatedTarget || n.toElement, k = d, S = S ? Nr(S) : null, S !== null && (O = Rr(S), S !== O || S.tag !== 5 && S.tag !== 6) && (S = null)) : (k = null, S = d), k !== S)) {
          if (b = Bu, w = "onMouseLeave", y = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (b = Wu, w = "onPointerLeave", y = "onPointerEnter", p = "pointer"), O = k == null ? m : Gr(k), f = S == null ? m : Gr(S), m = new b(w, p + "leave", k, n, v), m.target = O, m.relatedTarget = f, w = null, Nr(v) === d && (b = new b(y, p + "enter", S, n, v), b.target = f, b.relatedTarget = O, w = b), O = w, k && S) t: {
            for (b = k, y = S, p = 0, f = b; f; f = Pr(f)) p++;
            for (f = 0, w = y; w; w = Pr(w)) f++;
            for (; 0 < p - f; ) b = Pr(b), p--;
            for (; 0 < f - p; ) y = Pr(y), f--;
            for (; p--; ) {
              if (b === y || y !== null && b === y.alternate) break t;
              b = Pr(b), y = Pr(y);
            }
            b = null;
          }
          else b = null;
          k !== null && qu(g, m, k, b, !1), S !== null && O !== null && qu(g, O, S, b, !0);
        }
      }
      e: {
        if (m = d ? Gr(d) : window, k = m.nodeName && m.nodeName.toLowerCase(), k === "select" || k === "input" && m.type === "file") var I = o0;
        else if (Vu(m)) if (zh) I = u0;
        else {
          I = a0;
          var j = i0;
        }
        else (k = m.nodeName) && k.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (I = c0);
        if (I && (I = I(e, d))) {
          Wh(g, I, n, v);
          break e;
        }
        j && j(e, m, d), e === "focusout" && (j = m._wrapperState) && j.controlled && m.type === "number" && Ra(m, "number", m.value);
      }
      switch (j = d ? Gr(d) : window, e) {
        case "focusin":
          (Vu(j) || j.contentEditable === "true") && (Vr = j, Ha = d, Wl = null);
          break;
        case "focusout":
          Wl = Ha = Vr = null;
          break;
        case "mousedown":
          Va = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Va = !1, Qu(g, n, v);
          break;
        case "selectionchange":
          if (f0) break;
        case "keydown":
        case "keyup":
          Qu(g, n, v);
      }
      var N;
      if (Bc) e: {
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
      else Hr ? Bh(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
      x && (Fh && n.locale !== "ko" && (Hr || x !== "onCompositionStart" ? x === "onCompositionEnd" && Hr && (N = _h()) : (Zs = v, Pc = "value" in Zs ? Zs.value : Zs.textContent, Hr = !0)), j = ii(d, x), 0 < j.length && (x = new Uu(x, e, null, n, v), g.push({ event: x, listeners: j }), N ? x.data = N : (N = Uh(n), N !== null && (x.data = N)))), (N = t0 ? n0(e, n) : s0(e, n)) && (d = ii(d, "onBeforeInput"), 0 < d.length && (v = new Uu("onBeforeInput", "beforeinput", null, n, v), g.push({ event: v, listeners: d }), v.data = N));
    }
    qh(g, t);
  });
}
function no(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ii(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Xl(e, n), o != null && r.unshift(no(e, o, l)), o = Xl(e, t), o != null && r.push(no(e, o, l))), e = e.return;
  }
  return r;
}
function Pr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function qu(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, c = a.alternate, d = a.stateNode;
    if (c !== null && c === r) break;
    a.tag === 5 && d !== null && (a = d, l ? (c = Xl(n, o), c != null && i.unshift(no(n, c, a))) : l || (c = Xl(n, o), c != null && i.push(no(n, c, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var x0 = /\r\n?/g, y0 = /\u0000|\uFFFD/g;
function ed(e) {
  return (typeof e == "string" ? e : "" + e).replace(x0, `
`).replace(y0, "");
}
function To(e, t, n) {
  if (t = ed(t), ed(e) !== t && n) throw Error(he(425));
}
function ai() {
}
var Ka = null, Ga = null;
function Ya(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Xa = typeof setTimeout == "function" ? setTimeout : void 0, v0 = typeof clearTimeout == "function" ? clearTimeout : void 0, td = typeof Promise == "function" ? Promise : void 0, N0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof td < "u" ? function(e) {
  return td.resolve(null).then(e).catch(k0);
} : Xa;
function k0(e) {
  setTimeout(function() {
    throw e;
  });
}
function aa(e, t) {
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
function nd(e) {
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
var vl = Math.random().toString(36).slice(2), xs = "__reactFiber$" + vl, so = "__reactProps$" + vl, $s = "__reactContainer$" + vl, Qa = "__reactEvents$" + vl, w0 = "__reactListeners$" + vl, j0 = "__reactHandles$" + vl;
function Nr(e) {
  var t = e[xs];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[$s] || n[xs]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = nd(e); e !== null; ) {
        if (n = e[xs]) return n;
        e = nd(e);
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
function Gr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(he(33));
}
function Ai(e) {
  return e[so] || null;
}
var Ja = [], Yr = -1;
function dr(e) {
  return { current: e };
}
function Ft(e) {
  0 > Yr || (e.current = Ja[Yr], Ja[Yr] = null, Yr--);
}
function Dt(e, t) {
  Yr++, Ja[Yr] = e.current, e.current = t;
}
var cr = {}, Cn = dr(cr), Pn = dr(!1), Sr = cr;
function dl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return cr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function _n(e) {
  return e = e.childContextTypes, e != null;
}
function ci() {
  Ft(Pn), Ft(Cn);
}
function sd(e, t, n) {
  if (Cn.current !== cr) throw Error(he(168));
  Dt(Cn, t), Dt(Pn, n);
}
function tf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(he(108, im(e) || "Unknown", l));
  return Gt({}, n, r);
}
function ui(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || cr, Sr = Cn.current, Dt(Cn, e), Dt(Pn, Pn.current), !0;
}
function rd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(he(169));
  n ? (e = tf(e, t, Sr), r.__reactInternalMemoizedMergedChildContext = e, Ft(Pn), Ft(Cn), Dt(Cn, e)) : Ft(Pn), Dt(Pn, n);
}
var Ss = null, Ri = !1, ca = !1;
function nf(e) {
  Ss === null ? Ss = [e] : Ss.push(e);
}
function C0(e) {
  Ri = !0, nf(e);
}
function hr() {
  if (!ca && Ss !== null) {
    ca = !0;
    var e = 0, t = It;
    try {
      var n = Ss;
      for (It = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ss = null, Ri = !1;
    } catch (l) {
      throw Ss !== null && (Ss = Ss.slice(e + 1)), bh($c, hr), l;
    } finally {
      It = t, ca = !1;
    }
  }
  return null;
}
var Xr = [], Qr = 0, di = null, hi = 0, Jn = [], Zn = 0, br = null, Ms = 1, Is = "";
function xr(e, t) {
  Xr[Qr++] = hi, Xr[Qr++] = di, di = e, hi = t;
}
function sf(e, t, n) {
  Jn[Zn++] = Ms, Jn[Zn++] = Is, Jn[Zn++] = br, br = e;
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
function Wc(e) {
  e.return !== null && (xr(e, 1), sf(e, 1, 0));
}
function zc(e) {
  for (; e === di; ) di = Xr[--Qr], Xr[Qr] = null, hi = Xr[--Qr], Xr[Qr] = null;
  for (; e === br; ) br = Jn[--Zn], Jn[Zn] = null, Is = Jn[--Zn], Jn[Zn] = null, Ms = Jn[--Zn], Jn[Zn] = null;
}
var zn = null, Wn = null, Wt = !1, is = null;
function rf(e, t) {
  var n = qn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ld(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, zn = e, Wn = sr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, zn = e, Wn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = br !== null ? { id: Ms, overflow: Is } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = qn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, zn = e, Wn = null, !0) : !1;
    default:
      return !1;
  }
}
function Za(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function qa(e) {
  if (Wt) {
    var t = Wn;
    if (t) {
      var n = t;
      if (!ld(e, t)) {
        if (Za(e)) throw Error(he(418));
        t = sr(n.nextSibling);
        var r = zn;
        t && ld(e, t) ? rf(r, n) : (e.flags = e.flags & -4097 | 2, Wt = !1, zn = e);
      }
    } else {
      if (Za(e)) throw Error(he(418));
      e.flags = e.flags & -4097 | 2, Wt = !1, zn = e;
    }
  }
}
function od(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  zn = e;
}
function Ao(e) {
  if (e !== zn) return !1;
  if (!Wt) return od(e), Wt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ya(e.type, e.memoizedProps)), t && (t = Wn)) {
    if (Za(e)) throw lf(), Error(he(418));
    for (; t; ) rf(e, t), t = sr(t.nextSibling);
  }
  if (od(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(he(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Wn = sr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Wn = null;
    }
  } else Wn = zn ? sr(e.stateNode.nextSibling) : null;
  return !0;
}
function lf() {
  for (var e = Wn; e; ) e = sr(e.nextSibling);
}
function hl() {
  Wn = zn = null, Wt = !1;
}
function Hc(e) {
  is === null ? is = [e] : is.push(e);
}
var E0 = Ds.ReactCurrentBatchConfig;
function Ml(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(he(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(he(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(he(284));
    if (!n._owner) throw Error(he(290, e));
  }
  return e;
}
function Ro(e, t) {
  throw e = Object.prototype.toString.call(t), Error(he(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function id(e) {
  var t = e._init;
  return t(e._payload);
}
function of(e) {
  function t(y, p) {
    if (e) {
      var f = y.deletions;
      f === null ? (y.deletions = [p], y.flags |= 16) : f.push(p);
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
  function o(y, p, f) {
    return y.index = f, e ? (f = y.alternate, f !== null ? (f = f.index, f < p ? (y.flags |= 2, p) : f) : (y.flags |= 2, p)) : (y.flags |= 1048576, p);
  }
  function i(y) {
    return e && y.alternate === null && (y.flags |= 2), y;
  }
  function a(y, p, f, w) {
    return p === null || p.tag !== 6 ? (p = ga(f, y.mode, w), p.return = y, p) : (p = l(p, f), p.return = y, p);
  }
  function c(y, p, f, w) {
    var I = f.type;
    return I === zr ? v(y, p, f.props.children, w, f.key) : p !== null && (p.elementType === I || typeof I == "object" && I !== null && I.$$typeof === Vs && id(I) === p.type) ? (w = l(p, f.props), w.ref = Ml(y, p, f), w.return = y, w) : (w = Qo(f.type, f.key, f.props, null, y.mode, w), w.ref = Ml(y, p, f), w.return = y, w);
  }
  function d(y, p, f, w) {
    return p === null || p.tag !== 4 || p.stateNode.containerInfo !== f.containerInfo || p.stateNode.implementation !== f.implementation ? (p = xa(f, y.mode, w), p.return = y, p) : (p = l(p, f.children || []), p.return = y, p);
  }
  function v(y, p, f, w, I) {
    return p === null || p.tag !== 7 ? (p = Er(f, y.mode, w, I), p.return = y, p) : (p = l(p, f), p.return = y, p);
  }
  function g(y, p, f) {
    if (typeof p == "string" && p !== "" || typeof p == "number") return p = ga("" + p, y.mode, f), p.return = y, p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case ko:
          return f = Qo(p.type, p.key, p.props, null, y.mode, f), f.ref = Ml(y, null, p), f.return = y, f;
        case Wr:
          return p = xa(p, y.mode, f), p.return = y, p;
        case Vs:
          var w = p._init;
          return g(y, w(p._payload), f);
      }
      if (Ll(p) || jl(p)) return p = Er(p, y.mode, f, null), p.return = y, p;
      Ro(y, p);
    }
    return null;
  }
  function m(y, p, f, w) {
    var I = p !== null ? p.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return I !== null ? null : a(y, p, "" + f, w);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ko:
          return f.key === I ? c(y, p, f, w) : null;
        case Wr:
          return f.key === I ? d(y, p, f, w) : null;
        case Vs:
          return I = f._init, m(
            y,
            p,
            I(f._payload),
            w
          );
      }
      if (Ll(f) || jl(f)) return I !== null ? null : v(y, p, f, w, null);
      Ro(y, f);
    }
    return null;
  }
  function k(y, p, f, w, I) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return y = y.get(f) || null, a(p, y, "" + w, I);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case ko:
          return y = y.get(w.key === null ? f : w.key) || null, c(p, y, w, I);
        case Wr:
          return y = y.get(w.key === null ? f : w.key) || null, d(p, y, w, I);
        case Vs:
          var j = w._init;
          return k(y, p, f, j(w._payload), I);
      }
      if (Ll(w) || jl(w)) return y = y.get(f) || null, v(p, y, w, I, null);
      Ro(p, w);
    }
    return null;
  }
  function S(y, p, f, w) {
    for (var I = null, j = null, N = p, x = p = 0, C = null; N !== null && x < f.length; x++) {
      N.index > x ? (C = N, N = null) : C = N.sibling;
      var M = m(y, N, f[x], w);
      if (M === null) {
        N === null && (N = C);
        break;
      }
      e && N && M.alternate === null && t(y, N), p = o(M, p, x), j === null ? I = M : j.sibling = M, j = M, N = C;
    }
    if (x === f.length) return n(y, N), Wt && xr(y, x), I;
    if (N === null) {
      for (; x < f.length; x++) N = g(y, f[x], w), N !== null && (p = o(N, p, x), j === null ? I = N : j.sibling = N, j = N);
      return Wt && xr(y, x), I;
    }
    for (N = r(y, N); x < f.length; x++) C = k(N, y, x, f[x], w), C !== null && (e && C.alternate !== null && N.delete(C.key === null ? x : C.key), p = o(C, p, x), j === null ? I = C : j.sibling = C, j = C);
    return e && N.forEach(function(D) {
      return t(y, D);
    }), Wt && xr(y, x), I;
  }
  function b(y, p, f, w) {
    var I = jl(f);
    if (typeof I != "function") throw Error(he(150));
    if (f = I.call(f), f == null) throw Error(he(151));
    for (var j = I = null, N = p, x = p = 0, C = null, M = f.next(); N !== null && !M.done; x++, M = f.next()) {
      N.index > x ? (C = N, N = null) : C = N.sibling;
      var D = m(y, N, M.value, w);
      if (D === null) {
        N === null && (N = C);
        break;
      }
      e && N && D.alternate === null && t(y, N), p = o(D, p, x), j === null ? I = D : j.sibling = D, j = D, N = C;
    }
    if (M.done) return n(
      y,
      N
    ), Wt && xr(y, x), I;
    if (N === null) {
      for (; !M.done; x++, M = f.next()) M = g(y, M.value, w), M !== null && (p = o(M, p, x), j === null ? I = M : j.sibling = M, j = M);
      return Wt && xr(y, x), I;
    }
    for (N = r(y, N); !M.done; x++, M = f.next()) M = k(N, y, x, M.value, w), M !== null && (e && M.alternate !== null && N.delete(M.key === null ? x : M.key), p = o(M, p, x), j === null ? I = M : j.sibling = M, j = M);
    return e && N.forEach(function(K) {
      return t(y, K);
    }), Wt && xr(y, x), I;
  }
  function O(y, p, f, w) {
    if (typeof f == "object" && f !== null && f.type === zr && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ko:
          e: {
            for (var I = f.key, j = p; j !== null; ) {
              if (j.key === I) {
                if (I = f.type, I === zr) {
                  if (j.tag === 7) {
                    n(y, j.sibling), p = l(j, f.props.children), p.return = y, y = p;
                    break e;
                  }
                } else if (j.elementType === I || typeof I == "object" && I !== null && I.$$typeof === Vs && id(I) === j.type) {
                  n(y, j.sibling), p = l(j, f.props), p.ref = Ml(y, j, f), p.return = y, y = p;
                  break e;
                }
                n(y, j);
                break;
              } else t(y, j);
              j = j.sibling;
            }
            f.type === zr ? (p = Er(f.props.children, y.mode, w, f.key), p.return = y, y = p) : (w = Qo(f.type, f.key, f.props, null, y.mode, w), w.ref = Ml(y, p, f), w.return = y, y = w);
          }
          return i(y);
        case Wr:
          e: {
            for (j = f.key; p !== null; ) {
              if (p.key === j) if (p.tag === 4 && p.stateNode.containerInfo === f.containerInfo && p.stateNode.implementation === f.implementation) {
                n(y, p.sibling), p = l(p, f.children || []), p.return = y, y = p;
                break e;
              } else {
                n(y, p);
                break;
              }
              else t(y, p);
              p = p.sibling;
            }
            p = xa(f, y.mode, w), p.return = y, y = p;
          }
          return i(y);
        case Vs:
          return j = f._init, O(y, p, j(f._payload), w);
      }
      if (Ll(f)) return S(y, p, f, w);
      if (jl(f)) return b(y, p, f, w);
      Ro(y, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, p !== null && p.tag === 6 ? (n(y, p.sibling), p = l(p, f), p.return = y, y = p) : (n(y, p), p = ga(f, y.mode, w), p.return = y, y = p), i(y)) : n(y, p);
  }
  return O;
}
var fl = of(!0), af = of(!1), fi = dr(null), pi = null, Jr = null, Vc = null;
function Kc() {
  Vc = Jr = pi = null;
}
function Gc(e) {
  var t = fi.current;
  Ft(fi), e._currentValue = t;
}
function ec(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ll(e, t) {
  pi = e, Vc = Jr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Dn = !0), e.firstContext = null);
}
function ts(e) {
  var t = e._currentValue;
  if (Vc !== e) if (e = { context: e, memoizedValue: t, next: null }, Jr === null) {
    if (pi === null) throw Error(he(308));
    Jr = e, pi.dependencies = { lanes: 0, firstContext: e };
  } else Jr = Jr.next = e;
  return t;
}
var kr = null;
function Yc(e) {
  kr === null ? kr = [e] : kr.push(e);
}
function cf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Yc(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ls(e, r);
}
function Ls(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Ks = !1;
function Xc(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function uf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ts(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function rr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, yt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ls(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Yc(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ls(e, n);
}
function Ho(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Lc(e, n);
  }
}
function ad(e, t) {
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
    var v = e.alternate;
    v !== null && (v = v.updateQueue, a = v.lastBaseUpdate, a !== i && (a === null ? v.firstBaseUpdate = d : a.next = d, v.lastBaseUpdate = c));
  }
  if (o !== null) {
    var g = l.baseState;
    i = 0, v = d = c = null, a = o;
    do {
      var m = a.lane, k = a.eventTime;
      if ((r & m) === m) {
        v !== null && (v = v.next = {
          eventTime: k,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var S = e, b = a;
          switch (m = t, k = n, b.tag) {
            case 1:
              if (S = b.payload, typeof S == "function") {
                g = S.call(k, g, m);
                break e;
              }
              g = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = b.payload, m = typeof S == "function" ? S.call(k, g, m) : S, m == null) break e;
              g = Gt({}, g, m);
              break e;
            case 2:
              Ks = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [a] : m.push(a));
      } else k = { eventTime: k, lane: m, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, v === null ? (d = v = k, c = g) : v = v.next = k, i |= m;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        m = a, a = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (c = g), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Ir |= i, e.lanes = i, e.memoizedState = g;
  }
}
function cd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(he(191, l));
      l.call(r);
    }
  }
}
var go = {}, Ns = dr(go), ro = dr(go), lo = dr(go);
function wr(e) {
  if (e === go) throw Error(he(174));
  return e;
}
function Qc(e, t) {
  switch (Dt(lo, t), Dt(ro, e), Dt(Ns, go), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : La(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = La(t, e);
  }
  Ft(Ns), Dt(Ns, t);
}
function pl() {
  Ft(Ns), Ft(ro), Ft(lo);
}
function df(e) {
  wr(lo.current);
  var t = wr(Ns.current), n = La(t, e.type);
  t !== n && (Dt(ro, e), Dt(Ns, n));
}
function Jc(e) {
  ro.current === e && (Ft(Ns), Ft(ro));
}
var Vt = dr(0);
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
var ua = [];
function Zc() {
  for (var e = 0; e < ua.length; e++) ua[e]._workInProgressVersionPrimary = null;
  ua.length = 0;
}
var Vo = Ds.ReactCurrentDispatcher, da = Ds.ReactCurrentBatchConfig, Mr = 0, Kt = null, an = null, hn = null, xi = !1, zl = !1, oo = 0, S0 = 0;
function kn() {
  throw Error(he(321));
}
function qc(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!ds(e[n], t[n])) return !1;
  return !0;
}
function eu(e, t, n, r, l, o) {
  if (Mr = o, Kt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Vo.current = e === null || e.memoizedState === null ? T0 : A0, e = n(r, l), zl) {
    o = 0;
    do {
      if (zl = !1, oo = 0, 25 <= o) throw Error(he(301));
      o += 1, hn = an = null, t.updateQueue = null, Vo.current = R0, e = n(r, l);
    } while (zl);
  }
  if (Vo.current = yi, t = an !== null && an.next !== null, Mr = 0, hn = an = Kt = null, xi = !1, t) throw Error(he(300));
  return e;
}
function tu() {
  var e = oo !== 0;
  return oo = 0, e;
}
function gs() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return hn === null ? Kt.memoizedState = hn = e : hn = hn.next = e, hn;
}
function ns() {
  if (an === null) {
    var e = Kt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = an.next;
  var t = hn === null ? Kt.memoizedState : hn.next;
  if (t !== null) hn = t, an = e;
  else {
    if (e === null) throw Error(he(310));
    an = e, e = { memoizedState: an.memoizedState, baseState: an.baseState, baseQueue: an.baseQueue, queue: an.queue, next: null }, hn === null ? Kt.memoizedState = hn = e : hn = hn.next = e;
  }
  return hn;
}
function io(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ha(e) {
  var t = ns(), n = t.queue;
  if (n === null) throw Error(he(311));
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
      var v = d.lane;
      if ((Mr & v) === v) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var g = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (a = c = g, i = r) : c = c.next = g, Kt.lanes |= v, Ir |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? i = r : c.next = a, ds(r, t.memoizedState) || (Dn = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Kt.lanes |= o, Ir |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function fa(e) {
  var t = ns(), n = t.queue;
  if (n === null) throw Error(he(311));
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
function hf() {
}
function ff(e, t) {
  var n = Kt, r = ns(), l = t(), o = !ds(r.memoizedState, l);
  if (o && (r.memoizedState = l, Dn = !0), r = r.queue, nu(gf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || hn !== null && hn.memoizedState.tag & 1) {
    if (n.flags |= 2048, ao(9, mf.bind(null, n, r, l, t), void 0, null), fn === null) throw Error(he(349));
    Mr & 30 || pf(n, t, l);
  }
  return l;
}
function pf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Kt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Kt.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function mf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, xf(t) && yf(e);
}
function gf(e, t, n) {
  return n(function() {
    xf(t) && yf(e);
  });
}
function xf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ds(e, n);
  } catch {
    return !0;
  }
}
function yf(e) {
  var t = Ls(e, 1);
  t !== null && us(t, e, 1, -1);
}
function ud(e) {
  var t = gs();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: io, lastRenderedState: e }, t.queue = e, e = e.dispatch = I0.bind(null, Kt, e), [t.memoizedState, e];
}
function ao(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Kt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Kt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function vf() {
  return ns().memoizedState;
}
function Ko(e, t, n, r) {
  var l = gs();
  Kt.flags |= e, l.memoizedState = ao(1 | t, n, void 0, r === void 0 ? null : r);
}
function $i(e, t, n, r) {
  var l = ns();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (an !== null) {
    var i = an.memoizedState;
    if (o = i.destroy, r !== null && qc(r, i.deps)) {
      l.memoizedState = ao(t, n, o, r);
      return;
    }
  }
  Kt.flags |= e, l.memoizedState = ao(1 | t, n, o, r);
}
function dd(e, t) {
  return Ko(8390656, 8, e, t);
}
function nu(e, t) {
  return $i(2048, 8, e, t);
}
function Nf(e, t) {
  return $i(4, 2, e, t);
}
function kf(e, t) {
  return $i(4, 4, e, t);
}
function wf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function jf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, $i(4, 4, wf.bind(null, t, e), n);
}
function su() {
}
function Cf(e, t) {
  var n = ns();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qc(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ef(e, t) {
  var n = ns();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qc(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Sf(e, t, n) {
  return Mr & 21 ? (ds(n, t) || (n = Th(), Kt.lanes |= n, Ir |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Dn = !0), e.memoizedState = n);
}
function b0(e, t) {
  var n = It;
  It = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = da.transition;
  da.transition = {};
  try {
    e(!1), t();
  } finally {
    It = n, da.transition = r;
  }
}
function bf() {
  return ns().memoizedState;
}
function M0(e, t, n) {
  var r = or(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Mf(e)) If(t, n);
  else if (n = cf(e, t, n, r), n !== null) {
    var l = In();
    us(n, e, r, l), Tf(n, t, r);
  }
}
function I0(e, t, n) {
  var r = or(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Mf(e)) If(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, ds(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, Yc(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = cf(e, t, l, r), n !== null && (l = In(), us(n, e, r, l), Tf(n, t, r));
  }
}
function Mf(e) {
  var t = e.alternate;
  return e === Kt || t !== null && t === Kt;
}
function If(e, t) {
  zl = xi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Tf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Lc(e, n);
  }
}
var yi = { readContext: ts, useCallback: kn, useContext: kn, useEffect: kn, useImperativeHandle: kn, useInsertionEffect: kn, useLayoutEffect: kn, useMemo: kn, useReducer: kn, useRef: kn, useState: kn, useDebugValue: kn, useDeferredValue: kn, useTransition: kn, useMutableSource: kn, useSyncExternalStore: kn, useId: kn, unstable_isNewReconciler: !1 }, T0 = { readContext: ts, useCallback: function(e, t) {
  return gs().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ts, useEffect: dd, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ko(
    4194308,
    4,
    wf.bind(null, t, e),
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
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = M0.bind(null, Kt, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = gs();
  return e = { current: e }, t.memoizedState = e;
}, useState: ud, useDebugValue: su, useDeferredValue: function(e) {
  return gs().memoizedState = e;
}, useTransition: function() {
  var e = ud(!1), t = e[0];
  return e = b0.bind(null, e[1]), gs().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Kt, l = gs();
  if (Wt) {
    if (n === void 0) throw Error(he(407));
    n = n();
  } else {
    if (n = t(), fn === null) throw Error(he(349));
    Mr & 30 || pf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, dd(gf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ao(9, mf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = gs(), t = fn.identifierPrefix;
  if (Wt) {
    var n = Is, r = Ms;
    n = (r & ~(1 << 32 - cs(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = oo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = S0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, A0 = {
  readContext: ts,
  useCallback: Cf,
  useContext: ts,
  useEffect: nu,
  useImperativeHandle: jf,
  useInsertionEffect: Nf,
  useLayoutEffect: kf,
  useMemo: Ef,
  useReducer: ha,
  useRef: vf,
  useState: function() {
    return ha(io);
  },
  useDebugValue: su,
  useDeferredValue: function(e) {
    var t = ns();
    return Sf(t, an.memoizedState, e);
  },
  useTransition: function() {
    var e = ha(io)[0], t = ns().memoizedState;
    return [e, t];
  },
  useMutableSource: hf,
  useSyncExternalStore: ff,
  useId: bf,
  unstable_isNewReconciler: !1
}, R0 = { readContext: ts, useCallback: Cf, useContext: ts, useEffect: nu, useImperativeHandle: jf, useInsertionEffect: Nf, useLayoutEffect: kf, useMemo: Ef, useReducer: fa, useRef: vf, useState: function() {
  return fa(io);
}, useDebugValue: su, useDeferredValue: function(e) {
  var t = ns();
  return an === null ? t.memoizedState = e : Sf(t, an.memoizedState, e);
}, useTransition: function() {
  var e = fa(io)[0], t = ns().memoizedState;
  return [e, t];
}, useMutableSource: hf, useSyncExternalStore: ff, useId: bf, unstable_isNewReconciler: !1 };
function ls(e, t) {
  if (e && e.defaultProps) {
    t = Gt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function tc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Gt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Li = { isMounted: function(e) {
  return (e = e._reactInternals) ? Rr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = In(), l = or(e), o = Ts(r, l);
  o.payload = t, n != null && (o.callback = n), t = rr(e, o, l), t !== null && (us(t, e, l, r), Ho(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = In(), l = or(e), o = Ts(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = rr(e, o, l), t !== null && (us(t, e, l, r), Ho(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = In(), r = or(e), l = Ts(n, r);
  l.tag = 2, t != null && (l.callback = t), t = rr(e, l, r), t !== null && (us(t, e, r, n), Ho(t, e, r));
} };
function hd(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !eo(n, r) || !eo(l, o) : !0;
}
function Af(e, t, n) {
  var r = !1, l = cr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ts(o) : (l = _n(t) ? Sr : Cn.current, r = t.contextTypes, o = (r = r != null) ? dl(e, l) : cr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Li, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function fd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Li.enqueueReplaceState(t, t.state, null);
}
function nc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Xc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ts(o) : (o = _n(t) ? Sr : Cn.current, l.context = dl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (tc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Li.enqueueReplaceState(l, l.state, null), mi(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function ml(e, t) {
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
function pa(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function sc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var $0 = typeof WeakMap == "function" ? WeakMap : Map;
function Rf(e, t, n) {
  n = Ts(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Ni || (Ni = !0, fc = r), sc(e, t);
  }, n;
}
function $f(e, t, n) {
  n = Ts(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      sc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    sc(e, t), typeof r != "function" && (lr === null ? lr = /* @__PURE__ */ new Set([this]) : lr.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function pd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new $0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = G0.bind(null, e, t, n), t.then(e, e));
}
function md(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function gd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ts(-1, 1), t.tag = 2, rr(n, t, 1))), n.lanes |= 1), e);
}
var L0 = Ds.ReactCurrentOwner, Dn = !1;
function Mn(e, t, n, r) {
  t.child = e === null ? af(t, null, n, r) : fl(t, e.child, n, r);
}
function xd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return ll(t, l), r = eu(e, t, n, r, o, l), n = tu(), e !== null && !Dn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Os(e, t, l)) : (Wt && n && Wc(t), t.flags |= 1, Mn(e, t, r, l), t.child);
}
function yd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !du(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Lf(e, t, o, r, l)) : (e = Qo(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : eo, n(i, r) && e.ref === t.ref) return Os(e, t, l);
  }
  return t.flags |= 1, e = ir(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Lf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (eo(o, r) && e.ref === t.ref) if (Dn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Dn = !0);
    else return t.lanes = e.lanes, Os(e, t, l);
  }
  return rc(e, t, n, r, l);
}
function Of(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Dt(qr, Un), Un |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Dt(qr, Un), Un |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Dt(qr, Un), Un |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Dt(qr, Un), Un |= r;
  return Mn(e, t, l, n), t.child;
}
function Df(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function rc(e, t, n, r, l) {
  var o = _n(n) ? Sr : Cn.current;
  return o = dl(t, o), ll(t, l), n = eu(e, t, n, r, o, l), r = tu(), e !== null && !Dn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Os(e, t, l)) : (Wt && r && Wc(t), t.flags |= 1, Mn(e, t, n, l), t.child);
}
function vd(e, t, n, r, l) {
  if (_n(n)) {
    var o = !0;
    ui(t);
  } else o = !1;
  if (ll(t, l), t.stateNode === null) Go(e, t), Af(t, n, r), nc(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = ts(d) : (d = _n(n) ? Sr : Cn.current, d = dl(t, d));
    var v = n.getDerivedStateFromProps, g = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    g || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== d) && fd(t, i, r, d), Ks = !1;
    var m = t.memoizedState;
    i.state = m, mi(t, r, i, l), c = t.memoizedState, a !== r || m !== c || Pn.current || Ks ? (typeof v == "function" && (tc(t, n, v, r), c = t.memoizedState), (a = Ks || hd(t, n, a, r, m, c, d)) ? (g || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = d, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, uf(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : ls(t.type, a), i.props = d, g = t.pendingProps, m = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = ts(c) : (c = _n(n) ? Sr : Cn.current, c = dl(t, c));
    var k = n.getDerivedStateFromProps;
    (v = typeof k == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== g || m !== c) && fd(t, i, r, c), Ks = !1, m = t.memoizedState, i.state = m, mi(t, r, i, l);
    var S = t.memoizedState;
    a !== g || m !== S || Pn.current || Ks ? (typeof k == "function" && (tc(t, n, k, r), S = t.memoizedState), (d = Ks || hd(t, n, d, r, m, S, c) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, S, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, S, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), i.props = r, i.state = S, i.context = c, r = d) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return lc(e, t, n, r, o, l);
}
function lc(e, t, n, r, l, o) {
  Df(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && rd(t, n, !1), Os(e, t, o);
  r = t.stateNode, L0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = fl(t, e.child, null, o), t.child = fl(t, null, a, o)) : Mn(e, t, a, o), t.memoizedState = r.state, l && rd(t, n, !0), t.child;
}
function Pf(e) {
  var t = e.stateNode;
  t.pendingContext ? sd(e, t.pendingContext, t.pendingContext !== t.context) : t.context && sd(e, t.context, !1), Qc(e, t.containerInfo);
}
function Nd(e, t, n, r, l) {
  return hl(), Hc(l), t.flags |= 256, Mn(e, t, n, r), t.child;
}
var oc = { dehydrated: null, treeContext: null, retryLane: 0 };
function ic(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function _f(e, t, n) {
  var r = t.pendingProps, l = Vt.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Dt(Vt, l & 1), e === null)
    return qa(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Pi(i, r, 0, null), e = Er(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = ic(n), t.memoizedState = oc, e) : ru(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return O0(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = ir(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = ir(a, o) : (o = Er(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? ic(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = oc, r;
  }
  return o = e.child, e = o.sibling, r = ir(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function ru(e, t) {
  return t = Pi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function $o(e, t, n, r) {
  return r !== null && Hc(r), fl(t, e.child, null, n), e = ru(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function O0(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = pa(Error(he(422))), $o(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Pi({ mode: "visible", children: r.children }, l, 0, null), o = Er(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && fl(t, e.child, null, i), t.child.memoizedState = ic(i), t.memoizedState = oc, o);
  if (!(t.mode & 1)) return $o(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(he(419)), r = pa(o, r, void 0), $o(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, Dn || a) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ls(e, l), us(r, e, l, -1));
    }
    return uu(), r = pa(Error(he(421))), $o(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Y0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Wn = sr(l.nextSibling), zn = t, Wt = !0, is = null, e !== null && (Jn[Zn++] = Ms, Jn[Zn++] = Is, Jn[Zn++] = br, Ms = e.id, Is = e.overflow, br = t), t = ru(t, r.children), t.flags |= 4096, t);
}
function kd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ec(e.return, t, n);
}
function ma(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Ff(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Mn(e, t, r.children, n), r = Vt.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && kd(e, n, t);
      else if (e.tag === 19) kd(e, n, t);
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
  if (Dt(Vt, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && gi(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ma(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && gi(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ma(t, !0, n, null, o);
      break;
    case "together":
      ma(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Go(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Os(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ir |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(he(153));
  if (t.child !== null) {
    for (e = t.child, n = ir(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ir(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function D0(e, t, n) {
  switch (t.tag) {
    case 3:
      Pf(t), hl();
      break;
    case 5:
      df(t);
      break;
    case 1:
      _n(t.type) && ui(t);
      break;
    case 4:
      Qc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Dt(fi, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Dt(Vt, Vt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? _f(e, t, n) : (Dt(Vt, Vt.current & 1), e = Os(e, t, n), e !== null ? e.sibling : null);
      Dt(Vt, Vt.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Ff(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Dt(Vt, Vt.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Of(e, t, n);
  }
  return Os(e, t, n);
}
var Bf, ac, Uf, Wf;
Bf = function(e, t) {
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
ac = function() {
};
Uf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, wr(Ns.current);
    var o = null;
    switch (n) {
      case "input":
        l = Ta(e, l), r = Ta(e, r), o = [];
        break;
      case "select":
        l = Gt({}, l, { value: void 0 }), r = Gt({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = $a(e, l), r = $a(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ai);
    }
    Oa(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var a = l[d];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Gl.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (a = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== a && (c != null || a != null)) if (d === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Gl.hasOwnProperty(d) ? (c != null && d === "onScroll" && _t("scroll", e), o || a === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Wf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Il(e, t) {
  if (!Wt) switch (e.tailMode) {
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
function wn(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function P0(e, t, n) {
  var r = t.pendingProps;
  switch (zc(t), t.tag) {
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
      return wn(t), null;
    case 1:
      return _n(t.type) && ci(), wn(t), null;
    case 3:
      return r = t.stateNode, pl(), Ft(Pn), Ft(Cn), Zc(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ao(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, is !== null && (gc(is), is = null))), ac(e, t), wn(t), null;
    case 5:
      Jc(t);
      var l = wr(lo.current);
      if (n = t.type, e !== null && t.stateNode != null) Uf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(he(166));
          return wn(t), null;
        }
        if (e = wr(Ns.current), Ao(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[xs] = t, r[so] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              _t("cancel", r), _t("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              _t("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Dl.length; l++) _t(Dl[l], r);
              break;
            case "source":
              _t("error", r);
              break;
            case "img":
            case "image":
            case "link":
              _t(
                "error",
                r
              ), _t("load", r);
              break;
            case "details":
              _t("toggle", r);
              break;
            case "input":
              Tu(r, o), _t("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, _t("invalid", r);
              break;
            case "textarea":
              Ru(r, o), _t("invalid", r);
          }
          Oa(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && To(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && To(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Gl.hasOwnProperty(i) && a != null && i === "onScroll" && _t("scroll", r);
          }
          switch (n) {
            case "input":
              wo(r), Au(r, o, !0);
              break;
            case "textarea":
              wo(r), $u(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ai);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = mh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[xs] = t, e[so] = r, Bf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Da(n, r), n) {
              case "dialog":
                _t("cancel", e), _t("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                _t("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Dl.length; l++) _t(Dl[l], e);
                l = r;
                break;
              case "source":
                _t("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                _t(
                  "error",
                  e
                ), _t("load", e), l = r;
                break;
              case "details":
                _t("toggle", e), l = r;
                break;
              case "input":
                Tu(e, r), l = Ta(e, r), _t("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Gt({}, r, { value: void 0 }), _t("invalid", e);
                break;
              case "textarea":
                Ru(e, r), l = $a(e, r), _t("invalid", e);
                break;
              default:
                l = r;
            }
            Oa(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var c = a[o];
              o === "style" ? yh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && gh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Yl(e, c) : typeof c == "number" && Yl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Gl.hasOwnProperty(o) ? c != null && o === "onScroll" && _t("scroll", e) : c != null && Mc(e, o, c, i));
            }
            switch (n) {
              case "input":
                wo(e), Au(e, r, !1);
                break;
              case "textarea":
                wo(e), $u(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ar(r.value));
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
      return wn(t), null;
    case 6:
      if (e && t.stateNode != null) Wf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(he(166));
        if (n = wr(lo.current), wr(Ns.current), Ao(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[xs] = t, (o = r.nodeValue !== n) && (e = zn, e !== null)) switch (e.tag) {
            case 3:
              To(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && To(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[xs] = t, t.stateNode = r;
      }
      return wn(t), null;
    case 13:
      if (Ft(Vt), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Wt && Wn !== null && t.mode & 1 && !(t.flags & 128)) lf(), hl(), t.flags |= 98560, o = !1;
        else if (o = Ao(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(he(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(he(317));
            o[xs] = t;
          } else hl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          wn(t), o = !1;
        } else is !== null && (gc(is), is = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Vt.current & 1 ? cn === 0 && (cn = 3) : uu())), t.updateQueue !== null && (t.flags |= 4), wn(t), null);
    case 4:
      return pl(), ac(e, t), e === null && to(t.stateNode.containerInfo), wn(t), null;
    case 10:
      return Gc(t.type._context), wn(t), null;
    case 17:
      return _n(t.type) && ci(), wn(t), null;
    case 19:
      if (Ft(Vt), o = t.memoizedState, o === null) return wn(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Il(o, !1);
      else {
        if (cn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = gi(e), i !== null) {
            for (t.flags |= 128, Il(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Dt(Vt, Vt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && nn() > gl && (t.flags |= 128, r = !0, Il(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = gi(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Il(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Wt) return wn(t), null;
        } else 2 * nn() - o.renderingStartTime > gl && n !== 1073741824 && (t.flags |= 128, r = !0, Il(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = nn(), t.sibling = null, n = Vt.current, Dt(Vt, r ? n & 1 | 2 : n & 1), t) : (wn(t), null);
    case 22:
    case 23:
      return cu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Un & 1073741824 && (wn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : wn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(he(156, t.tag));
}
function _0(e, t) {
  switch (zc(t), t.tag) {
    case 1:
      return _n(t.type) && ci(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return pl(), Ft(Pn), Ft(Cn), Zc(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Jc(t), null;
    case 13:
      if (Ft(Vt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(he(340));
        hl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Ft(Vt), null;
    case 4:
      return pl(), null;
    case 10:
      return Gc(t.type._context), null;
    case 22:
    case 23:
      return cu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Lo = !1, jn = !1, F0 = typeof WeakSet == "function" ? WeakSet : Set, Pe = null;
function Zr(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Jt(e, t, r);
  }
  else n.current = null;
}
function cc(e, t, n) {
  try {
    n();
  } catch (r) {
    Jt(e, t, r);
  }
}
var wd = !1;
function B0(e, t) {
  if (Ka = li, e = Kh(), Uc(e)) {
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
        var i = 0, a = -1, c = -1, d = 0, v = 0, g = e, m = null;
        t: for (; ; ) {
          for (var k; g !== n || l !== 0 && g.nodeType !== 3 || (a = i + l), g !== o || r !== 0 && g.nodeType !== 3 || (c = i + r), g.nodeType === 3 && (i += g.nodeValue.length), (k = g.firstChild) !== null; )
            m = g, g = k;
          for (; ; ) {
            if (g === e) break t;
            if (m === n && ++d === l && (a = i), m === o && ++v === r && (c = i), (k = g.nextSibling) !== null) break;
            g = m, m = g.parentNode;
          }
          g = k;
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
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var b = S.memoizedProps, O = S.memoizedState, y = t.stateNode, p = y.getSnapshotBeforeUpdate(t.elementType === t.type ? b : ls(t.type, b), O);
            y.__reactInternalSnapshotBeforeUpdate = p;
          }
          break;
        case 3:
          var f = t.stateNode.containerInfo;
          f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(he(163));
      }
    } catch (w) {
      Jt(t, t.return, w);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Pe = e;
      break;
    }
    Pe = t.return;
  }
  return S = wd, wd = !1, S;
}
function Hl(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && cc(t, n, o);
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
function uc(e) {
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
function zf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, zf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[xs], delete t[so], delete t[Qa], delete t[w0], delete t[j0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Hf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function jd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Hf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function dc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ai));
  else if (r !== 4 && (e = e.child, e !== null)) for (dc(e, t, n), e = e.sibling; e !== null; ) dc(e, t, n), e = e.sibling;
}
function hc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (hc(e, t, n), e = e.sibling; e !== null; ) hc(e, t, n), e = e.sibling;
}
var xn = null, os = !1;
function zs(e, t, n) {
  for (n = n.child; n !== null; ) Vf(e, t, n), n = n.sibling;
}
function Vf(e, t, n) {
  if (vs && typeof vs.onCommitFiberUnmount == "function") try {
    vs.onCommitFiberUnmount(bi, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      jn || Zr(n, t);
    case 6:
      var r = xn, l = os;
      xn = null, zs(e, t, n), xn = r, os = l, xn !== null && (os ? (e = xn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : xn.removeChild(n.stateNode));
      break;
    case 18:
      xn !== null && (os ? (e = xn, n = n.stateNode, e.nodeType === 8 ? aa(e.parentNode, n) : e.nodeType === 1 && aa(e, n), Zl(e)) : aa(xn, n.stateNode));
      break;
    case 4:
      r = xn, l = os, xn = n.stateNode.containerInfo, os = !0, zs(e, t, n), xn = r, os = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!jn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && cc(n, t, i), l = l.next;
        } while (l !== r);
      }
      zs(e, t, n);
      break;
    case 1:
      if (!jn && (Zr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Jt(n, t, a);
      }
      zs(e, t, n);
      break;
    case 21:
      zs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (jn = (r = jn) || n.memoizedState !== null, zs(e, t, n), jn = r) : zs(e, t, n);
      break;
    default:
      zs(e, t, n);
  }
}
function Cd(e) {
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
function rs(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            xn = a.stateNode, os = !1;
            break e;
          case 3:
            xn = a.stateNode.containerInfo, os = !0;
            break e;
          case 4:
            xn = a.stateNode.containerInfo, os = !0;
            break e;
        }
        a = a.return;
      }
      if (xn === null) throw Error(he(160));
      Vf(o, i, l), xn = null, os = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      Jt(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Kf(t, e), t = t.sibling;
}
function Kf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (rs(t, e), ps(e), r & 4) {
        try {
          Hl(3, e, e.return), Oi(3, e);
        } catch (b) {
          Jt(e, e.return, b);
        }
        try {
          Hl(5, e, e.return);
        } catch (b) {
          Jt(e, e.return, b);
        }
      }
      break;
    case 1:
      rs(t, e), ps(e), r & 512 && n !== null && Zr(n, n.return);
      break;
    case 5:
      if (rs(t, e), ps(e), r & 512 && n !== null && Zr(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Yl(l, "");
        } catch (b) {
          Jt(e, e.return, b);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && o.type === "radio" && o.name != null && fh(l, o), Da(a, i);
          var d = Da(a, o);
          for (i = 0; i < c.length; i += 2) {
            var v = c[i], g = c[i + 1];
            v === "style" ? yh(l, g) : v === "dangerouslySetInnerHTML" ? gh(l, g) : v === "children" ? Yl(l, g) : Mc(l, v, g, d);
          }
          switch (a) {
            case "input":
              Aa(l, o);
              break;
            case "textarea":
              ph(l, o);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var k = o.value;
              k != null ? tl(l, !!o.multiple, k, !1) : m !== !!o.multiple && (o.defaultValue != null ? tl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : tl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[so] = o;
        } catch (b) {
          Jt(e, e.return, b);
        }
      }
      break;
    case 6:
      if (rs(t, e), ps(e), r & 4) {
        if (e.stateNode === null) throw Error(he(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (b) {
          Jt(e, e.return, b);
        }
      }
      break;
    case 3:
      if (rs(t, e), ps(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Zl(t.containerInfo);
      } catch (b) {
        Jt(e, e.return, b);
      }
      break;
    case 4:
      rs(t, e), ps(e);
      break;
    case 13:
      rs(t, e), ps(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (iu = nn())), r & 4 && Cd(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (jn = (d = jn) || v, rs(t, e), jn = d) : rs(t, e), ps(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (Pe = e, v = e.child; v !== null; ) {
          for (g = Pe = v; Pe !== null; ) {
            switch (m = Pe, k = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Hl(4, m, m.return);
                break;
              case 1:
                Zr(m, m.return);
                var S = m.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (b) {
                    Jt(r, n, b);
                  }
                }
                break;
              case 5:
                Zr(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  Sd(g);
                  continue;
                }
            }
            k !== null ? (k.return = m, Pe = k) : Sd(g);
          }
          v = v.sibling;
        }
        e: for (v = null, g = e; ; ) {
          if (g.tag === 5) {
            if (v === null) {
              v = g;
              try {
                l = g.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = g.stateNode, c = g.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = xh("display", i));
              } catch (b) {
                Jt(e, e.return, b);
              }
            }
          } else if (g.tag === 6) {
            if (v === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (b) {
              Jt(e, e.return, b);
            }
          } else if ((g.tag !== 22 && g.tag !== 23 || g.memoizedState === null || g === e) && g.child !== null) {
            g.child.return = g, g = g.child;
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            v === g && (v = null), g = g.return;
          }
          v === g && (v = null), g.sibling.return = g.return, g = g.sibling;
        }
      }
      break;
    case 19:
      rs(t, e), ps(e), r & 4 && Cd(e);
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
          if (Hf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(he(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Yl(l, ""), r.flags &= -33);
          var o = jd(e);
          hc(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = jd(e);
          dc(e, a, i);
          break;
        default:
          throw Error(he(161));
      }
    } catch (c) {
      Jt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function U0(e, t, n) {
  Pe = e, Gf(e);
}
function Gf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Pe !== null; ) {
    var l = Pe, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Lo;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || jn;
        a = Lo;
        var d = jn;
        if (Lo = i, (jn = c) && !d) for (Pe = l; Pe !== null; ) i = Pe, c = i.child, i.tag === 22 && i.memoizedState !== null ? bd(l) : c !== null ? (c.return = i, Pe = c) : bd(l);
        for (; o !== null; ) Pe = o, Gf(o), o = o.sibling;
        Pe = l, Lo = a, jn = d;
      }
      Ed(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Pe = o) : Ed(e);
  }
}
function Ed(e) {
  for (; Pe !== null; ) {
    var t = Pe;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            jn || Oi(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !jn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : ls(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && cd(t, o, r);
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
              cd(t, i, n);
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
                  var g = v.dehydrated;
                  g !== null && Zl(g);
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
            throw Error(he(163));
        }
        jn || t.flags & 512 && uc(t);
      } catch (m) {
        Jt(t, t.return, m);
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
function Sd(e) {
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
function bd(e) {
  for (; Pe !== null; ) {
    var t = Pe;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Oi(4, t);
          } catch (c) {
            Jt(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              Jt(t, l, c);
            }
          }
          var o = t.return;
          try {
            uc(t);
          } catch (c) {
            Jt(t, o, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            uc(t);
          } catch (c) {
            Jt(t, i, c);
          }
      }
    } catch (c) {
      Jt(t, t.return, c);
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
var W0 = Math.ceil, vi = Ds.ReactCurrentDispatcher, lu = Ds.ReactCurrentOwner, es = Ds.ReactCurrentBatchConfig, yt = 0, fn = null, rn = null, yn = 0, Un = 0, qr = dr(0), cn = 0, co = null, Ir = 0, Di = 0, ou = 0, Vl = null, On = null, iu = 0, gl = 1 / 0, Es = null, Ni = !1, fc = null, lr = null, Oo = !1, qs = null, ki = 0, Kl = 0, pc = null, Yo = -1, Xo = 0;
function In() {
  return yt & 6 ? nn() : Yo !== -1 ? Yo : Yo = nn();
}
function or(e) {
  return e.mode & 1 ? yt & 2 && yn !== 0 ? yn & -yn : E0.transition !== null ? (Xo === 0 && (Xo = Th()), Xo) : (e = It, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ph(e.type)), e) : 1;
}
function us(e, t, n, r) {
  if (50 < Kl) throw Kl = 0, pc = null, Error(he(185));
  fo(e, n, r), (!(yt & 2) || e !== fn) && (e === fn && (!(yt & 2) && (Di |= n), cn === 4 && Qs(e, yn)), Fn(e, r), n === 1 && yt === 0 && !(t.mode & 1) && (gl = nn() + 500, Ri && hr()));
}
function Fn(e, t) {
  var n = e.callbackNode;
  Em(e, t);
  var r = ri(e, e === fn ? yn : 0);
  if (r === 0) n !== null && Du(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Du(n), t === 1) e.tag === 0 ? C0(Md.bind(null, e)) : nf(Md.bind(null, e)), N0(function() {
      !(yt & 6) && hr();
    }), n = null;
    else {
      switch (Ah(r)) {
        case 1:
          n = $c;
          break;
        case 4:
          n = Mh;
          break;
        case 16:
          n = si;
          break;
        case 536870912:
          n = Ih;
          break;
        default:
          n = si;
      }
      n = tp(n, Yf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Yf(e, t) {
  if (Yo = -1, Xo = 0, yt & 6) throw Error(he(327));
  var n = e.callbackNode;
  if (ol() && e.callbackNode !== n) return null;
  var r = ri(e, e === fn ? yn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = wi(e, r);
  else {
    t = r;
    var l = yt;
    yt |= 2;
    var o = Qf();
    (fn !== e || yn !== t) && (Es = null, gl = nn() + 500, Cr(e, t));
    do
      try {
        V0();
        break;
      } catch (a) {
        Xf(e, a);
      }
    while (!0);
    Kc(), vi.current = o, yt = l, rn !== null ? t = 0 : (fn = null, yn = 0, t = cn);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ua(e), l !== 0 && (r = l, t = mc(e, l))), t === 1) throw n = co, Cr(e, 0), Qs(e, r), Fn(e, nn()), n;
    if (t === 6) Qs(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !z0(l) && (t = wi(e, r), t === 2 && (o = Ua(e), o !== 0 && (r = o, t = mc(e, o))), t === 1)) throw n = co, Cr(e, 0), Qs(e, r), Fn(e, nn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(he(345));
        case 2:
          yr(e, On, Es);
          break;
        case 3:
          if (Qs(e, r), (r & 130023424) === r && (t = iu + 500 - nn(), 10 < t)) {
            if (ri(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              In(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Xa(yr.bind(null, e, On, Es), t);
            break;
          }
          yr(e, On, Es);
          break;
        case 4:
          if (Qs(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - cs(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = nn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * W0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Xa(yr.bind(null, e, On, Es), r);
            break;
          }
          yr(e, On, Es);
          break;
        case 5:
          yr(e, On, Es);
          break;
        default:
          throw Error(he(329));
      }
    }
  }
  return Fn(e, nn()), e.callbackNode === n ? Yf.bind(null, e) : null;
}
function mc(e, t) {
  var n = Vl;
  return e.current.memoizedState.isDehydrated && (Cr(e, t).flags |= 256), e = wi(e, t), e !== 2 && (t = On, On = n, t !== null && gc(t)), e;
}
function gc(e) {
  On === null ? On = e : On.push.apply(On, e);
}
function z0(e) {
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
  for (t &= ~ou, t &= ~Di, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - cs(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Md(e) {
  if (yt & 6) throw Error(he(327));
  ol();
  var t = ri(e, 0);
  if (!(t & 1)) return Fn(e, nn()), null;
  var n = wi(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ua(e);
    r !== 0 && (t = r, n = mc(e, r));
  }
  if (n === 1) throw n = co, Cr(e, 0), Qs(e, t), Fn(e, nn()), n;
  if (n === 6) throw Error(he(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, yr(e, On, Es), Fn(e, nn()), null;
}
function au(e, t) {
  var n = yt;
  yt |= 1;
  try {
    return e(t);
  } finally {
    yt = n, yt === 0 && (gl = nn() + 500, Ri && hr());
  }
}
function Tr(e) {
  qs !== null && qs.tag === 0 && !(yt & 6) && ol();
  var t = yt;
  yt |= 1;
  var n = es.transition, r = It;
  try {
    if (es.transition = null, It = 1, e) return e();
  } finally {
    It = r, es.transition = n, yt = t, !(yt & 6) && hr();
  }
}
function cu() {
  Un = qr.current, Ft(qr);
}
function Cr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, v0(n)), rn !== null) for (n = rn.return; n !== null; ) {
    var r = n;
    switch (zc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ci();
        break;
      case 3:
        pl(), Ft(Pn), Ft(Cn), Zc();
        break;
      case 5:
        Jc(r);
        break;
      case 4:
        pl();
        break;
      case 13:
        Ft(Vt);
        break;
      case 19:
        Ft(Vt);
        break;
      case 10:
        Gc(r.type._context);
        break;
      case 22:
      case 23:
        cu();
    }
    n = n.return;
  }
  if (fn = e, rn = e = ir(e.current, null), yn = Un = t, cn = 0, co = null, ou = Di = Ir = 0, On = Vl = null, kr !== null) {
    for (t = 0; t < kr.length; t++) if (n = kr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    kr = null;
  }
  return e;
}
function Xf(e, t) {
  do {
    var n = rn;
    try {
      if (Kc(), Vo.current = yi, xi) {
        for (var r = Kt.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        xi = !1;
      }
      if (Mr = 0, hn = an = Kt = null, zl = !1, oo = 0, lu.current = null, n === null || n.return === null) {
        cn = 1, co = t, rn = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, c = t;
        if (t = yn, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = a, g = v.tag;
          if (!(v.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var m = v.alternate;
            m ? (v.updateQueue = m.updateQueue, v.memoizedState = m.memoizedState, v.lanes = m.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var k = md(i);
          if (k !== null) {
            k.flags &= -257, gd(k, i, a, o, t), k.mode & 1 && pd(o, d, t), t = k, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var b = /* @__PURE__ */ new Set();
              b.add(c), t.updateQueue = b;
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              pd(o, d, t), uu();
              break e;
            }
            c = Error(he(426));
          }
        } else if (Wt && a.mode & 1) {
          var O = md(i);
          if (O !== null) {
            !(O.flags & 65536) && (O.flags |= 256), gd(O, i, a, o, t), Hc(ml(c, a));
            break e;
          }
        }
        o = c = ml(c, a), cn !== 4 && (cn = 2), Vl === null ? Vl = [o] : Vl.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var y = Rf(o, c, t);
              ad(o, y);
              break e;
            case 1:
              a = c;
              var p = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof p.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (lr === null || !lr.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var w = $f(o, a, t);
                ad(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Zf(n);
    } catch (I) {
      t = I, rn === n && n !== null && (rn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Qf() {
  var e = vi.current;
  return vi.current = yi, e === null ? yi : e;
}
function uu() {
  (cn === 0 || cn === 3 || cn === 2) && (cn = 4), fn === null || !(Ir & 268435455) && !(Di & 268435455) || Qs(fn, yn);
}
function wi(e, t) {
  var n = yt;
  yt |= 2;
  var r = Qf();
  (fn !== e || yn !== t) && (Es = null, Cr(e, t));
  do
    try {
      H0();
      break;
    } catch (l) {
      Xf(e, l);
    }
  while (!0);
  if (Kc(), yt = n, vi.current = r, rn !== null) throw Error(he(261));
  return fn = null, yn = 0, cn;
}
function H0() {
  for (; rn !== null; ) Jf(rn);
}
function V0() {
  for (; rn !== null && !gm(); ) Jf(rn);
}
function Jf(e) {
  var t = ep(e.alternate, e, Un);
  e.memoizedProps = e.pendingProps, t === null ? Zf(e) : rn = t, lu.current = null;
}
function Zf(e) {
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
        cn = 6, rn = null;
        return;
      }
    } else if (n = P0(n, t, Un), n !== null) {
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
function yr(e, t, n) {
  var r = It, l = es.transition;
  try {
    es.transition = null, It = 1, K0(e, t, n, r);
  } finally {
    es.transition = l, It = r;
  }
  return null;
}
function K0(e, t, n, r) {
  do
    ol();
  while (qs !== null);
  if (yt & 6) throw Error(he(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(he(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Sm(e, o), e === fn && (rn = fn = null, yn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Oo || (Oo = !0, tp(si, function() {
    return ol(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = es.transition, es.transition = null;
    var i = It;
    It = 1;
    var a = yt;
    yt |= 4, lu.current = null, B0(e, n), Kf(n, e), h0(Ga), li = !!Ka, Ga = Ka = null, e.current = n, U0(n), xm(), yt = a, It = i, es.transition = o;
  } else e.current = n;
  if (Oo && (Oo = !1, qs = e, ki = l), o = e.pendingLanes, o === 0 && (lr = null), Nm(n.stateNode), Fn(e, nn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ni) throw Ni = !1, e = fc, fc = null, e;
  return ki & 1 && e.tag !== 0 && ol(), o = e.pendingLanes, o & 1 ? e === pc ? Kl++ : (Kl = 0, pc = e) : Kl = 0, hr(), null;
}
function ol() {
  if (qs !== null) {
    var e = Ah(ki), t = es.transition, n = It;
    try {
      if (es.transition = null, It = 16 > e ? 16 : e, qs === null) var r = !1;
      else {
        if (e = qs, qs = null, ki = 0, yt & 6) throw Error(he(331));
        var l = yt;
        for (yt |= 4, Pe = e.current; Pe !== null; ) {
          var o = Pe, i = o.child;
          if (Pe.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c];
                for (Pe = d; Pe !== null; ) {
                  var v = Pe;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Hl(8, v, o);
                  }
                  var g = v.child;
                  if (g !== null) g.return = v, Pe = g;
                  else for (; Pe !== null; ) {
                    v = Pe;
                    var m = v.sibling, k = v.return;
                    if (zf(v), v === d) {
                      Pe = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = k, Pe = m;
                      break;
                    }
                    Pe = k;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var b = S.child;
                if (b !== null) {
                  S.child = null;
                  do {
                    var O = b.sibling;
                    b.sibling = null, b = O;
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
                Hl(9, o, o.return);
            }
            var y = o.sibling;
            if (y !== null) {
              y.return = o.return, Pe = y;
              break e;
            }
            Pe = o.return;
          }
        }
        var p = e.current;
        for (Pe = p; Pe !== null; ) {
          i = Pe;
          var f = i.child;
          if (i.subtreeFlags & 2064 && f !== null) f.return = i, Pe = f;
          else e: for (i = p; Pe !== null; ) {
            if (a = Pe, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Oi(9, a);
              }
            } catch (I) {
              Jt(a, a.return, I);
            }
            if (a === i) {
              Pe = null;
              break e;
            }
            var w = a.sibling;
            if (w !== null) {
              w.return = a.return, Pe = w;
              break e;
            }
            Pe = a.return;
          }
        }
        if (yt = l, hr(), vs && typeof vs.onPostCommitFiberRoot == "function") try {
          vs.onPostCommitFiberRoot(bi, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      It = n, es.transition = t;
    }
  }
  return !1;
}
function Id(e, t, n) {
  t = ml(n, t), t = Rf(e, t, 1), e = rr(e, t, 1), t = In(), e !== null && (fo(e, 1, t), Fn(e, t));
}
function Jt(e, t, n) {
  if (e.tag === 3) Id(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Id(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (lr === null || !lr.has(r))) {
        e = ml(n, e), e = $f(t, e, 1), t = rr(t, e, 1), e = In(), t !== null && (fo(t, 1, e), Fn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function G0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = In(), e.pingedLanes |= e.suspendedLanes & n, fn === e && (yn & n) === n && (cn === 4 || cn === 3 && (yn & 130023424) === yn && 500 > nn() - iu ? Cr(e, 0) : ou |= n), Fn(e, t);
}
function qf(e, t) {
  t === 0 && (e.mode & 1 ? (t = Eo, Eo <<= 1, !(Eo & 130023424) && (Eo = 4194304)) : t = 1);
  var n = In();
  e = Ls(e, t), e !== null && (fo(e, t, n), Fn(e, n));
}
function Y0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), qf(e, n);
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
      throw Error(he(314));
  }
  r !== null && r.delete(t), qf(e, n);
}
var ep;
ep = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Pn.current) Dn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Dn = !1, D0(e, t, n);
    Dn = !!(e.flags & 131072);
  }
  else Dn = !1, Wt && t.flags & 1048576 && sf(t, hi, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Go(e, t), e = t.pendingProps;
      var l = dl(t, Cn.current);
      ll(t, n), l = eu(null, t, r, e, l, n);
      var o = tu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, _n(r) ? (o = !0, ui(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Xc(t), l.updater = Li, t.stateNode = l, l._reactInternals = t, nc(t, r, e, n), t = lc(null, t, r, !0, o, n)) : (t.tag = 0, Wt && o && Wc(t), Mn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Go(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = J0(r), e = ls(r, e), l) {
          case 0:
            t = rc(null, t, r, e, n);
            break e;
          case 1:
            t = vd(null, t, r, e, n);
            break e;
          case 11:
            t = xd(null, t, r, e, n);
            break e;
          case 14:
            t = yd(null, t, r, ls(r.type, e), n);
            break e;
        }
        throw Error(he(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), rc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), vd(e, t, r, l, n);
    case 3:
      e: {
        if (Pf(t), e === null) throw Error(he(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, uf(e, t), mi(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = ml(Error(he(423)), t), t = Nd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = ml(Error(he(424)), t), t = Nd(e, t, r, n, l);
          break e;
        } else for (Wn = sr(t.stateNode.containerInfo.firstChild), zn = t, Wt = !0, is = null, n = af(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (hl(), r === l) {
            t = Os(e, t, n);
            break e;
          }
          Mn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return df(t), e === null && qa(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ya(r, l) ? i = null : o !== null && Ya(r, o) && (t.flags |= 32), Df(e, t), Mn(e, t, i, n), t.child;
    case 6:
      return e === null && qa(t), null;
    case 13:
      return _f(e, t, n);
    case 4:
      return Qc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = fl(t, null, r, n) : Mn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), xd(e, t, r, l, n);
    case 7:
      return Mn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Mn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Mn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Dt(fi, r._currentValue), r._currentValue = i, o !== null) if (ds(o.value, i)) {
          if (o.children === l.children && !Pn.current) {
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
                    var v = d.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), ec(
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
            if (i = o.return, i === null) throw Error(he(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), ec(i, n, t), i = o.sibling;
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
        Mn(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, ll(t, n), l = ts(l), r = r(l), t.flags |= 1, Mn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ls(r, t.pendingProps), l = ls(r.type, l), yd(e, t, r, l, n);
    case 15:
      return Lf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ls(r, l), Go(e, t), t.tag = 1, _n(r) ? (e = !0, ui(t)) : e = !1, ll(t, n), Af(t, r, l), nc(t, r, l, n), lc(null, t, r, !0, e, n);
    case 19:
      return Ff(e, t, n);
    case 22:
      return Of(e, t, n);
  }
  throw Error(he(156, t.tag));
};
function tp(e, t) {
  return bh(e, t);
}
function Q0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function qn(e, t, n, r) {
  return new Q0(e, t, n, r);
}
function du(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function J0(e) {
  if (typeof e == "function") return du(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Tc) return 11;
    if (e === Ac) return 14;
  }
  return 2;
}
function ir(e, t) {
  var n = e.alternate;
  return n === null ? (n = qn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Qo(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") du(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case zr:
      return Er(n.children, l, o, t);
    case Ic:
      i = 8, l |= 8;
      break;
    case Sa:
      return e = qn(12, n, t, l | 2), e.elementType = Sa, e.lanes = o, e;
    case ba:
      return e = qn(13, n, t, l), e.elementType = ba, e.lanes = o, e;
    case Ma:
      return e = qn(19, n, t, l), e.elementType = Ma, e.lanes = o, e;
    case uh:
      return Pi(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ah:
          i = 10;
          break e;
        case ch:
          i = 9;
          break e;
        case Tc:
          i = 11;
          break e;
        case Ac:
          i = 14;
          break e;
        case Vs:
          i = 16, r = null;
          break e;
      }
      throw Error(he(130, e == null ? e : typeof e, ""));
  }
  return t = qn(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Er(e, t, n, r) {
  return e = qn(7, e, r, t), e.lanes = n, e;
}
function Pi(e, t, n, r) {
  return e = qn(22, e, r, t), e.elementType = uh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ga(e, t, n) {
  return e = qn(6, e, null, t), e.lanes = n, e;
}
function xa(e, t, n) {
  return t = qn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Z0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ji(0), this.expirationTimes = Ji(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ji(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function hu(e, t, n, r, l, o, i, a, c) {
  return e = new Z0(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = qn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Xc(o), e;
}
function q0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Wr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function np(e) {
  if (!e) return cr;
  e = e._reactInternals;
  e: {
    if (Rr(e) !== e || e.tag !== 1) throw Error(he(170));
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
    throw Error(he(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (_n(n)) return tf(e, n, t);
  }
  return t;
}
function sp(e, t, n, r, l, o, i, a, c) {
  return e = hu(n, r, !0, e, l, o, i, a, c), e.context = np(null), n = e.current, r = In(), l = or(n), o = Ts(r, l), o.callback = t ?? null, rr(n, o, l), e.current.lanes = l, fo(e, l, r), Fn(e, r), e;
}
function _i(e, t, n, r) {
  var l = t.current, o = In(), i = or(l);
  return n = np(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ts(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = rr(l, t, i), e !== null && (us(e, l, i, o), Ho(e, l, i)), i;
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
function Td(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function fu(e, t) {
  Td(e, t), (e = e.alternate) && Td(e, t);
}
function eg() {
  return null;
}
var rp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function pu(e) {
  this._internalRoot = e;
}
Fi.prototype.render = pu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(he(409));
  _i(e, t, null, null);
};
Fi.prototype.unmount = pu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Tr(function() {
      _i(null, e, null, null);
    }), t[$s] = null;
  }
};
function Fi(e) {
  this._internalRoot = e;
}
Fi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Lh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Xs.length && t !== 0 && t < Xs[n].priority; n++) ;
    Xs.splice(n, 0, e), n === 0 && Dh(e);
  }
};
function mu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Bi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ad() {
}
function tg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = ji(i);
        o.call(d);
      };
    }
    var i = sp(t, r, e, 0, null, !1, !1, "", Ad);
    return e._reactRootContainer = i, e[$s] = i.current, to(e.nodeType === 8 ? e.parentNode : e), Tr(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var d = ji(c);
      a.call(d);
    };
  }
  var c = hu(e, 0, !1, null, null, !1, !1, "", Ad);
  return e._reactRootContainer = c, e[$s] = c.current, to(e.nodeType === 8 ? e.parentNode : e), Tr(function() {
    _i(t, c, n, r);
  }), c;
}
function Ui(e, t, n, r, l) {
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
    _i(t, i, e, l);
  } else i = tg(n, t, e, l, r);
  return ji(i);
}
Rh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ol(t.pendingLanes);
        n !== 0 && (Lc(t, n | 1), Fn(t, nn()), !(yt & 6) && (gl = nn() + 500, hr()));
      }
      break;
    case 13:
      Tr(function() {
        var r = Ls(e, 1);
        if (r !== null) {
          var l = In();
          us(r, e, 1, l);
        }
      }), fu(e, 1);
  }
};
Oc = function(e) {
  if (e.tag === 13) {
    var t = Ls(e, 134217728);
    if (t !== null) {
      var n = In();
      us(t, e, 134217728, n);
    }
    fu(e, 134217728);
  }
};
$h = function(e) {
  if (e.tag === 13) {
    var t = or(e), n = Ls(e, t);
    if (n !== null) {
      var r = In();
      us(n, e, t, r);
    }
    fu(e, t);
  }
};
Lh = function() {
  return It;
};
Oh = function(e, t) {
  var n = It;
  try {
    return It = e, t();
  } finally {
    It = n;
  }
};
_a = function(e, t, n) {
  switch (t) {
    case "input":
      if (Aa(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ai(r);
            if (!l) throw Error(he(90));
            hh(r), Aa(r, l);
          }
        }
      }
      break;
    case "textarea":
      ph(e, n);
      break;
    case "select":
      t = n.value, t != null && tl(e, !!n.multiple, t, !1);
  }
};
kh = au;
wh = Tr;
var ng = { usingClientEntryPoint: !1, Events: [mo, Gr, Ai, vh, Nh, au] }, Tl = { findFiberByHostInstance: Nr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, sg = { bundleType: Tl.bundleType, version: Tl.version, rendererPackageName: Tl.rendererPackageName, rendererConfig: Tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ds.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Eh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tl.findFiberByHostInstance || eg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Do = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Do.isDisabled && Do.supportsFiber) try {
    bi = Do.inject(sg), vs = Do;
  } catch {
  }
}
Vn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ng;
Vn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!mu(t)) throw Error(he(200));
  return q0(e, t, null, n);
};
Vn.createRoot = function(e, t) {
  if (!mu(e)) throw Error(he(299));
  var n = !1, r = "", l = rp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = hu(e, 1, !1, null, null, n, !1, r, l), e[$s] = t.current, to(e.nodeType === 8 ? e.parentNode : e), new pu(t);
};
Vn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(he(188)) : (e = Object.keys(e).join(","), Error(he(268, e)));
  return e = Eh(t), e = e === null ? null : e.stateNode, e;
};
Vn.flushSync = function(e) {
  return Tr(e);
};
Vn.hydrate = function(e, t, n) {
  if (!Bi(t)) throw Error(he(200));
  return Ui(null, e, t, !0, n);
};
Vn.hydrateRoot = function(e, t, n) {
  if (!mu(e)) throw Error(he(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = rp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = sp(t, null, e, 1, n ?? null, l, !1, o, i), e[$s] = t.current, to(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Fi(t);
};
Vn.render = function(e, t, n) {
  if (!Bi(t)) throw Error(he(200));
  return Ui(null, e, t, !1, n);
};
Vn.unmountComponentAtNode = function(e) {
  if (!Bi(e)) throw Error(he(40));
  return e._reactRootContainer ? (Tr(function() {
    Ui(null, null, e, !1, function() {
      e._reactRootContainer = null, e[$s] = null;
    });
  }), !0) : !1;
};
Vn.unstable_batchedUpdates = au;
Vn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Bi(n)) throw Error(he(200));
  if (e == null || e._reactInternals === void 0) throw Error(he(38));
  return Ui(e, t, n, !1, r);
};
Vn.version = "18.3.1-next-f1338f8080-20240426";
function lp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lp);
    } catch (e) {
      console.error(e);
    }
}
lp(), rh.exports = Vn;
var Ps = rh.exports, Rd = Ps;
qo.createRoot = Rd.createRoot, qo.hydrateRoot = Rd.hydrateRoot;
var op = { exports: {} }, Wi = {};
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
function ip(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) ig.call(t, r) && !cg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: lg, type: e, key: o, ref: i, props: l, _owner: ag.current };
}
Wi.Fragment = og;
Wi.jsx = ip;
Wi.jsxs = ip;
op.exports = Wi;
var s = op.exports;
let Js = [], ap = 120, ya = !1;
async function ug() {
  if (!ya) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          dg(n), ya = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    ya = !0;
  }
}
function dg(e) {
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
  } : { offsetMin: ap, label: "LOCAL" };
}
function cp(e, t) {
  return Js.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Ci(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, i, a] = t.split(":").map(Number);
  for (const c of Js)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const d = (c.offsetBeforeMin - c.offsetAfterMin) / 60, v = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (v.getUTCFullYear() === n && v.getUTCMonth() + 1 === r && v.getUTCDate() === l) {
        const g = v.getUTCHours();
        if (o >= g && o < g + d)
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
function jr(e, t = "LOCAL") {
  return t === "UTC" ? fg(e) : hg(e);
}
function $d(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = jr(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function xc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, i] = e.split("-").map(Number), [a, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(i) || isNaN(a) || isNaN(c)) return null;
  const v = Date.UTC(l, o - 1, i, a, c, d);
  if (n === "UTC")
    return v;
  const g = Ci(e, t);
  if (g.isAmbiguous)
    return r === 2 ? g.secondOccurrenceEpoch : g.firstOccurrenceEpoch;
  const m = v - ap * 6e4, { offsetMin: k } = As(m);
  let S = v - k * 6e4;
  const b = As(S);
  return b.offsetMin !== k && (S = v - b.offsetMin * 6e4), S;
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
  isInitialSetup: g = !1,
  selectedCount: m = 0,
  totalCount: k = 0,
  onResetStudio: S
}) {
  const [b, O] = u.useState(!1);
  u.useEffect(() => {
    if (!b) return;
    const I = (j) => {
      j.key === "Escape" && O(!1);
    };
    return window.addEventListener("keydown", I), () => window.removeEventListener("keydown", I);
  }, [b]);
  const y = u.useMemo(() => {
    const I = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!I || j <= 0) return "-- ➔ --";
    const N = I + j, x = (A) => String(A).padStart(2, "0"), C = jr(I, n), M = jr(N, n), D = `${C.year}-${x(C.month)}-${x(C.day)}`, K = `${x(C.hour)}:${x(C.minute)}:${x(C.second)}`, $ = `${M.year}-${x(M.month)}-${x(M.day)}`, W = `${x(M.hour)}:${x(M.minute)}:${x(M.second)}`, Z = n === "UTC" ? " (UTC)" : C.label ? ` (${C.label})` : "", V = D === $ ? W : `${$} ${W}`;
    return `${D} ${K} ➔ ${V}${Z}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), p = u.useMemo(() => {
    const I = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (I >= 1440) {
      const j = (I / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${I}m Total)`;
    }
    return `(${I}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), f = () => {
    O(!1), S == null || S();
  }, w = b ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => O(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (I) => I.stopPropagation(), dir: "ltr", children: [
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
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: f, children: [
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
          onClick: v,
          title: "Click to change selected station pool",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "beacon-dot" }),
            /* @__PURE__ */ s.jsx("span", { className: "selection-label", children: "SELECTED:" }),
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: m }),
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
      !g && /* @__PURE__ */ s.jsx(
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
    typeof document < "u" && w && Ps.createPortal(w, document.body)
  ] });
}
const _r = (e) => String(e).padStart(2, "0");
function gt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const m = new Date(e), k = _r(m.getUTCHours()), S = _r(m.getUTCMinutes()), b = _r(m.getUTCSeconds()), O = l ? `${k}:${S}:${b}` : `${k}:${S}`;
    return r ? `${O} UTC` : O;
  }
  const { offsetMin: o, label: i } = As(e), a = new Date(e + o * 60 * 1e3), c = _r(a.getUTCHours()), d = _r(a.getUTCMinutes()), v = _r(a.getUTCSeconds()), g = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${g} ${i}` : g;
}
const mg = 600, Ld = 250, Qn = /* @__PURE__ */ new Map(), vr = /* @__PURE__ */ new Map(), yc = /* @__PURE__ */ new Set(), Od = 4;
let il = 0, as = [];
function vc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Ld) * Ld;
}
function up() {
  var e;
  if (!(il >= Od || as.length === 0))
    for (as = as.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); il < Od && as.length > 0; ) {
      const t = as.pop();
      !t || (e = t.signal) != null && e.aborted || (il++, gg(t));
    }
}
function Jo(e, t, n, r = "mon-0") {
  const l = vc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
  if (Qn.size >= mg) {
    const a = Qn.keys().next().value, c = Qn.get(a);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), Qn.delete(a);
  }
  Qn.set(i, n), yc.forEach((a) => a(e, l, n, o));
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
      Jo(n, r, v, l), i(v);
    } else c.status === 204 ? (Jo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } catch (a) {
    a.name !== "AbortError" ? (Jo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } finally {
    il = Math.max(0, il - 1), vr.delete(t), up();
  }
}
const bn = {
  /**
   * Gets a cached frame URL by station, timestamp, and optional displayId.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} [displayId='mon-0']
   * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
   */
  get(e, t, n = "mon-0") {
    const r = vc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!Qn.has(o)) return null;
    const i = Qn.get(o);
    return Qn.delete(o), Qn.set(o, i), i;
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
    Qn.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), Qn.clear(), vr.clear(), as = [], il = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return yc.add(e), () => yc.delete(e);
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
    const l = vc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
    if (Qn.has(i))
      return Promise.resolve(this.get(e, l, o));
    if (vr.has(i))
      return vr.get(i);
    const a = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      as = as.filter((v) => v.hostname === e && v.displayId === o && v.key !== i ? (vr.delete(v.key), v.resolve(null), !1) : !0);
      const d = { key: i, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        as = as.filter((v) => v.key !== i), vr.delete(i), c(null);
      }, { once: !0 }), as.push(d), up();
    });
    return vr.set(i, a), a;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  bn.clearAll();
});
const gu = "ITB_STUDIO_SESSION_CACHE_V2", dp = "itb_player_audio_settings";
let va = null;
function xg() {
  try {
    const e = localStorage.getItem(gu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function hp(e) {
  e && (va && clearTimeout(va), va = setTimeout(() => {
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
      localStorage.setItem(gu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function yg() {
  try {
    localStorage.removeItem(gu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function al() {
  try {
    const e = localStorage.getItem(dp);
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
    localStorage.setItem(dp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let Gs = null, el = null, Na = null, $n = 0, Fr = 0, Po = -60, uo = 1;
function Ng() {
  if (!Gs) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Gs = new e());
  }
  return Gs && Gs.state === "suspended" && Gs.resume().catch(() => {
  }), Gs;
}
function Ei(e, t = 1) {
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
    return l && l.gain.setValueAtTime(uo, n.currentTime), el = e, kg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function Dd(e) {
  if (uo = Math.max(0, Number(e) || 1), el != null && el.__audioGainNode && Gs)
    try {
      el.__audioGainNode.gain.setValueAtTime(uo, Gs.currentTime);
    } catch {
    }
}
function kg() {
  if (Na) return;
  const e = new Uint8Array(256), t = () => {
    const n = el, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      $n *= 0.85, Fr *= 0.85, $n < 1e-3 && ($n = 0), Fr < 1e-3 && (Fr = 0), Po = $n > 1e-3 ? 20 * Math.log10($n) : -60;
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
        $n = i > $n ? $n * 0.3 + i * 0.7 : $n * 0.85 + i * 0.15, Fr = Math.max($n, o), Po = $n > 1e-4 ? 20 * Math.log10($n) : -60;
      } catch {
        $n = 0, Fr = 0, Po = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: $n,
        peak: Fr,
        db: Po,
        gain: uo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), Na = requestAnimationFrame(t);
  };
  Na = requestAnimationFrame(t);
}
function fp({ isPlaying: e = !1 }) {
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
          const d = (a.displayId ?? a.DisplayId ?? `mon-${c}`).toLowerCase(), v = !i && o === d, g = a.width ?? a.Width ?? 1920, m = a.height ?? a.Height ?? 1080, k = a.displayName ?? a.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${v ? "is-active" : ""}`,
              onClick: (S) => {
                S.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${k} (${g}×${m})`,
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
  globalGaps: g = [],
  recordingSegments: m = {},
  playbackSpeed: k = 1,
  activeAudioStationId: S = null,
  directorPlan: b = null,
  isAutoDirectorEnabled: O = !0,
  targetDisplayId: y = "auto",
  onSelectDisplayId: p = null,
  areAllDisplaysPlaced: f = !1
}) {
  var Ue;
  const w = e.hostname || e.name || e.id || "", I = Math.round(t), [j, N] = u.useState(() => !w || !I ? null : bn.get(w, I) || null), [x, C] = u.useState(""), [M, D] = u.useState(!1), [K, $] = u.useState(!1), [W, Z] = u.useState(!1), V = u.useRef(l), A = u.useRef(null), T = u.useRef(0), _ = u.useRef(t - i), z = u.useRef(t - i), ee = u.useRef(!1), U = u.useRef(null), ge = u.useRef(!1);
  _.current = t - i;
  const oe = (e == null ? void 0 : e.displays) || ((Ue = e == null ? void 0 : e.topology) == null ? void 0 : Ue.displays) || [], [re, se] = u.useState(null);
  u.useEffect(() => {
    se(null);
  }, [y]);
  const Be = u.useMemo(() => {
    const F = b || (e == null ? void 0 : e.directorPlan);
    return !F || !F.segments || F.segments.length === 0 ? null : F.segments.find((X) => {
      const fe = X.startEpochMs ?? X.StartEpochMs ?? 0, ve = X.endEpochMs ?? X.EndEpochMs ?? 0;
      return t >= fe && t <= ve;
    }) || F.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t]), H = u.useMemo(() => {
    var F;
    return re ? re.toLowerCase() : y && y !== "auto" && y !== "director" ? y.toLowerCase() : oe.length > 1 && O !== !1 && Be ? (Be.targetDisplayId || Be.TargetDisplayId || "mon-0").toLowerCase() : (((F = oe[0]) == null ? void 0 : F.displayId) || "mon-0").toLowerCase();
  }, [re, y, oe, O, Be]), te = m[e == null ? void 0 : e.id] || m[w] || (e == null ? void 0 : e.segments) || [], ie = te.length === 0 || te.some((F) => {
    const X = F.startEpochMs ?? F.startEpoch ?? 0, fe = F.endEpochMs ?? F.endEpoch ?? 0;
    return t >= X && t <= fe;
  }), J = !!(r ? !al().isMuted : S && (e.id === S || w === S)), q = u.useCallback(() => {
    if (!A.current) return;
    const F = al();
    if (r)
      A.current.volume = F.volume, A.current.muted = F.isMuted, F.isMuted || Ei(A.current);
    else {
      const X = !!(S && (e.id === S || w === S));
      A.current.muted = !X, X && (A.current.volume = F.volume, Ei(A.current));
    }
  }, [r, S, e.id, w]);
  u.useEffect(() => {
    q();
  }, [q]), u.useEffect(() => {
    const F = (X) => {
      A.current && X.detail && q();
    };
    return window.addEventListener("itb-audio-state-changed", F), () => window.removeEventListener("itb-audio-state-changed", F);
  }, [q]), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = k, A.current.playbackRate = k);
  }, [k]), u.useEffect(() => {
    if (n || !I || !w) return;
    if (l) {
      V.current = !0;
      return;
    }
    const F = V.current;
    V.current = l;
    let X = !0;
    const fe = new AbortController(), ve = bn.get(w, I, H);
    if (ve) {
      N(ve), $(!1), Z(!1);
      return;
    }
    Z(!0);
    const je = setTimeout(() => {
      X && bn.fetchFrame(w, I, fe.signal, H).then((Ae) => {
        X && (Z(!1), Ae && Ae !== "NO_SIGNAL" ? (N(Ae), $(!1)) : Ae === "NO_SIGNAL" && $(!0));
      });
    }, F ? 25 : 40), le = bn.subscribe((Ae, pe, be, We) => {
      Ae === w && pe === I && (!We || We === H) && X && (Z(!1), be && be !== "NO_SIGNAL" ? (N(be), $(!1)) : be === "NO_SIGNAL" && $(!0));
    });
    return () => {
      X = !1, clearTimeout(je), fe.abort(), le();
    };
  }, [w, I, n, l, r, M, H]), u.useEffect(() => {
    if (!w || !(r || l)) {
      l || (U.current && clearTimeout(U.current), ee.current = !1, C(""), D(!1), A.current && (A.current.pause(), A.current.removeAttribute("src"), A.current.load()));
      return;
    }
    let X = null;
    return l && !v && ie ? X = setTimeout(() => {
      const fe = _.current;
      T.current = fe, z.current = fe, ee.current = !1;
      const ve = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + fe}&displayId=${encodeURIComponent(H)}&_t=${Date.now()}`;
      D(!1), C(ve);
    }, 80) : l || (U.current && clearTimeout(U.current), ee.current = !1, C(""), D(!1), A.current && (A.current.pause(), A.current.removeAttribute("src"), A.current.load())), () => {
      X && clearTimeout(X);
    };
  }, [l, r, w, i, a, v, ie, H]), u.useEffect(() => {
    if (!w || !(r || l)) return;
    const X = _.current, fe = Math.abs(X - z.current);
    if (!l || fe < 800) {
      z.current = X;
      return;
    }
    return ee.current = !0, z.current = X, T.current = X, A.current && A.current.pause(), D(!1), U.current && clearTimeout(U.current), U.current = setTimeout(() => {
      if (!ie || v) {
        C(""), D(!1), ee.current = !1;
        return;
      }
      const ve = _.current, Le = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ve}&displayId=${encodeURIComponent(H)}&_t=${Date.now()}`;
      C(Le);
    }, 75), () => {
      U.current && clearTimeout(U.current);
    };
  }, [t, l, r, w, i, a, v, ie, H]), u.useEffect(() => {
    if (r || !l || !A.current || !M || ee.current) return;
    const F = (_.current - T.current) / 1e3;
    if (F >= 0) {
      const X = A.current, fe = X.currentTime, ve = Math.abs(fe - F);
      if (ve > 0.35 && ve < 3)
        try {
          X.currentTime = F;
        } catch {
        }
    }
  }, [r, l, t, M]), u.useEffect(() => {
    if (!r || !l || !x || !M || v) return;
    let F = null, X = A.current ? A.current.currentTime : 0, fe = performance.now(), ve = T.current + Math.round(X * 1e3);
    const Le = () => {
      const je = A.current;
      if (je && !je.paused && !je.ended && !ge.current && !ee.current) {
        const le = performance.now(), Ae = je.currentTime;
        Math.abs(Ae - X) > 5e-4 && (X = Ae, fe = le);
        const pe = Math.max(0, (le - fe) / 1e3), be = je.playbackRate || k || 1, We = X + pe * be;
        let Oe = T.current + Math.round(We * 1e3);
        const xe = Oe - ve;
        if (xe < 0 && xe > -300 && (Oe = ve), Oe >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const xt = i + Oe, ze = g == null ? void 0 : g.find((Bt) => xt >= Bt.startEpochMs && xt < Bt.endEpochMs);
        if (ze) {
          ge.current = !0;
          const Bt = ze.endEpochMs - i;
          d(Bt), T.current = Bt, ve = Bt, z.current = Bt;
          const Ge = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + Bt}&_t=${Date.now()}`;
          D(!1), C(Ge), setTimeout(() => {
            ge.current = !1;
          }, 300);
          return;
        }
        Oe !== ve && (ve = Oe, z.current = Oe, d == null || d(Oe));
      }
      F = requestAnimationFrame(Le);
    };
    return F = requestAnimationFrame(Le), () => {
      F && cancelAnimationFrame(F);
    };
  }, [
    r,
    l,
    x,
    M,
    v,
    k,
    c,
    i,
    a,
    w,
    g,
    d,
    o
  ]);
  const Ce = () => {
    if (ge.current) return;
    const F = i + _.current, X = te.map((fe) => ({ start: fe.startEpochMs ?? fe.startEpoch ?? 0, end: fe.endEpochMs ?? fe.endEpoch ?? 0 })).filter((fe) => fe.start > F + 200).sort((fe, ve) => fe.start - ve.start)[0];
    if (X && X.start - i < c) {
      ge.current = !0;
      const fe = X.start - i;
      d(fe), T.current = fe;
      const ve = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + fe}&_t=${Date.now()}`;
      D(!1), C(ve), setTimeout(() => {
        ge.current = !1;
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
          opacity: M ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: M ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !J,
        onLoadedData: () => {
          A.current && (A.current.defaultPlaybackRate = k, A.current.playbackRate = k);
        },
        onCanPlay: () => {
          q(), A.current && (A.current.defaultPlaybackRate = k, A.current.playbackRate = k), l && A.current && A.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ee.current = !1, D(!0), q(), A.current && (A.current.defaultPlaybackRate = k, A.current.playbackRate = k);
        },
        onWaiting: () => {
          D(!1);
        },
        onTimeUpdate: () => {
          var F;
          !M && ((F = A.current) == null ? void 0 : F.currentTime) > 0 && (ee.current = !1, D(!0));
        },
        onEnded: Ce
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && M && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: j && !K ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: j,
            alt: w,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => $(!0)
          }
        ) : (!j || K || !ie) && !x ? /* @__PURE__ */ s.jsx(fp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && ie && !M && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    /* @__PURE__ */ s.jsx(
      wg,
      {
        displays: oe,
        activeDisplayId: H,
        onSelectDisplay: (F) => {
          se(F), p == null || p(F);
        },
        areAllDisplaysPlaced: f,
        isAutoDirectorEnabled: O
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
  setPlayheadMs: g,
  isSpotlightActive: m,
  globalGaps: k = [],
  onOpenSpotlight: S,
  onSelectActiveStation: b,
  recordingSegments: O = {},
  playbackSpeed: y = 1,
  activeAudioStationId: p = null,
  onSoloAudio: f,
  directorPlan: w = null,
  isAutoDirectorEnabled: I = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: N = null,
  areAllDisplaysPlaced: x = !1,
  _slotIndex: C = 0,
  borderColor: M = null,
  onSwapWithNext: D = null
}) {
  var T;
  const K = !!(p && (e.id === p || e.hostname && e.hostname === p)), $ = (e.hostname || e.name || "").includes("Offline"), W = $ ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((T = e == null ? void 0 : e.topology) == null ? void 0 : T.displays) || []).length > 1;
  const V = () => {
    if (t) {
      const _ = j && j !== "auto" && j !== "director" ? j : null;
      S && S(e.id, _);
    } else
      b && b(e.id);
  }, A = (_) => {
    _.preventDefault(), _.stopPropagation(), t && b && (a && a(!1), b(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: V,
      onContextMenu: A,
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
            D && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (_) => {
                  _.stopPropagation(), D();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            f && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${K ? "audio-active" : ""}`,
                onClick: (_) => {
                  _.stopPropagation(), f(K ? null : e.id);
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
            S && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (_) => {
                  _.stopPropagation();
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
                onClick: (_) => {
                  _.stopPropagation(), t && a && a(!1), b(t ? null : e.id);
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
                onClick: (_) => {
                  _.stopPropagation(), r(e.id);
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
              setPlayheadMs: g,
              isSpotlightActive: m,
              globalGaps: k,
              recordingSegments: O,
              playbackSpeed: y,
              activeAudioStationId: p,
              directorPlan: w,
              isAutoDirectorEnabled: I,
              targetDisplayId: j,
              onSelectDisplayId: N,
              areAllDisplaysPlaced: x
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
          gt(l, o)
        ] }) })
      ]
    }
  ) });
}
function Ht(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Eg(e) {
  const t = Ht(e, 0, 1);
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
  var b, O, y, p, f, w;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let I = 0; I < e.length; I++)
    if (e[I].timestampEpochMs <= t)
      l = e[I], o = e[I + 1] || e[I];
    else {
      o === l && e[I] && (o = e[I]);
      break;
    }
  if (l === o)
    return ((b = l.layout) == null ? void 0 : b.placements) || n;
  const i = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), a = o.transitionType || "smooth", c = o.timestampEpochMs - i;
  if (t < c)
    return ((O = l.layout) == null ? void 0 : O.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((y = o.layout) == null ? void 0 : y.placements) || n;
  if (a === "cut")
    return ((p = l.layout) == null ? void 0 : p.placements) || n;
  const d = (t - c) / i, v = Ht(d, 0, 1), g = a === "linear" ? v : Eg(v), m = ((f = l.layout) == null ? void 0 : f.placements) || [], k = ((w = o.layout) == null ? void 0 : w.placements) || [], S = k.map((I) => {
    const j = m.find((K) => K.stationId === I.stationId && K.displayId === I.displayId);
    if (!j)
      return {
        ...I,
        opacity: Math.max(0.05, g)
      };
    const N = Math.round(j.x + (I.x - j.x) * g), x = Math.round(j.y + (I.y - j.y) * g), C = Math.round(j.width + (I.width - j.width) * g), M = Math.round(j.height + (I.height - j.height) * g), D = Number(((j.rotation || 0) + ((I.rotation || 0) - (j.rotation || 0)) * g).toFixed(1));
    return {
      ...I,
      x: N,
      y: x,
      width: C,
      height: M,
      rotation: D,
      opacity: 1
    };
  });
  return m.forEach((I) => {
    k.some((N) => N.stationId === I.stationId && N.displayId === I.displayId) || S.push({
      ...I,
      opacity: Math.max(0, 1 - g)
    });
  }), S;
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
  }, g = [...c, v].sort((S, b) => S.timestampEpochMs - b.timestampEpochMs), m = g.findIndex((S) => S.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: g },
    newIndex: m >= 0 ? m : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function Pd(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function _d(e, t, n, r = 500) {
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
const ms = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], Nc = 1920, kc = 1080, dt = [
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
function gr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function Ys(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, i = n / r;
  let a, c, d, v;
  return o >= i ? (a = n, c = Math.round(a / o), d = e, v = t + Math.round((r - c) / 2)) : (c = r, a = Math.round(c * o), d = e + Math.round((n - a) / 2), v = t), { x: d, y: v, width: a, height: c };
}
function Br(e, t = Nc, n = kc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: g, width: m, height: k } = Ys(0, 0, t, n, d);
    return [{
      ...c,
      x: v,
      y: g,
      width: m,
      height: k,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: dt[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, v) => {
      const g = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: m, y: k, width: S, height: b } = Ys(v * c, 0, c, n, g);
      return {
        ...d,
        x: m,
        y: k,
        width: S,
        height: b,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: g,
        aspectRatio: g,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: dt[v % dt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const m = Math.round(t / 3);
      return e.slice(0, 3).map((k, S) => {
        const b = k.nativeAspectRatio || (k.sourceWidth && k.sourceHeight ? k.sourceWidth / k.sourceHeight : 1.7777777777777777), { x: O, y, width: p, height: f } = Ys(S * m, 0, m, n, b);
        return {
          ...k,
          x: O,
          y,
          width: p,
          height: f,
          sourceWidth: k.sourceWidth || 1920,
          sourceHeight: k.sourceHeight || 1080,
          nativeAspectRatio: b,
          aspectRatio: b,
          zIndex: S,
          rotation: 0,
          borderWidth: 2,
          borderColor: dt[S % dt.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), v = Math.round(n / 2), g = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: v }
    ];
    return e.slice(0, 3).map((m, k) => {
      const S = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: b, cy: O } = g[k], { x: y, y: p, width: f, height: w } = Ys(b, O, d, v, S);
      return {
        ...m,
        x: y,
        y: p,
        width: f,
        height: w,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: S,
        aspectRatio: S,
        zIndex: k,
        rotation: 0,
        borderWidth: 2,
        borderColor: dt[k % dt.length],
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
    return e.slice(0, 4).map((g, m) => {
      const k = g.nativeAspectRatio || (g.sourceWidth && g.sourceHeight ? g.sourceWidth / g.sourceHeight : 1.7777777777777777), { cx: S, cy: b } = v[m], { x: O, y, width: p, height: f } = Ys(S, b, c, d, k);
      return {
        ...g,
        x: O,
        y,
        width: p,
        height: f,
        sourceWidth: g.sourceWidth || 1920,
        sourceHeight: g.sourceHeight || 1080,
        nativeAspectRatio: k,
        aspectRatio: k,
        zIndex: m,
        rotation: 0,
        borderWidth: 2,
        borderColor: dt[m % dt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), i = Math.floor(t / l), a = Math.floor(n / o);
  return e.map((c, d) => {
    const v = d % l, g = Math.floor(d / l), m = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: k, y: S, width: b, height: O } = Ys(v * i, g * a, i, a, m);
    return {
      ...c,
      x: k,
      y: S,
      width: b,
      height: O,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: m,
      aspectRatio: m,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: dt[d % dt.length],
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
  playheadEpochMs: g = 0,
  timeMode: m = "LOCAL",
  isPlaying: k = !1,
  setIsPlaying: S,
  totalDurationMs: b,
  inPointMs: O = 0,
  outPointMs: y,
  setPlayheadMs: p,
  globalGaps: f = [],
  recordingSegments: w = {},
  playbackSpeed: I = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: N = "BurnIn",
  keystrokes: x = [],
  directorPlan: C = null,
  onOverrideDisplay: M,
  onResetOverride: D,
  compositionLayout: K = "canvas",
  onChangeCompositionLayout: $,
  isAutoDirectorEnabled: W = !0,
  onToggleAutoDirector: Z,
  onUpdateCanvasLayout: V,
  canvasLayoutTimeline: A = null,
  onUpdateCanvasLayoutTimeline: T,
  activeKfIndex: _ = 0,
  setActiveKfIndex: z,
  isModalOpen: ee = !1
}) {
  const U = g > 0 ? g : d + v, [ge, oe] = u.useState(() => {
    var h;
    return ((h = t[0]) == null ? void 0 : h.id) || null;
  }), [re, se] = u.useState(!1), [Be, H] = u.useState(null), [te, ie] = u.useState({ index: null, position: null }), [J, q] = u.useState(!1), [Ce, Ue] = u.useState(!1), [F, X] = u.useState(!1), [fe, ve] = u.useState(!1), [Le, je] = u.useState(""), [le, Ae] = u.useState(""), pe = u.useRef(null), [be, We] = u.useState(() => {
    try {
      const h = localStorage.getItem("itb_canvas_saved_presets");
      return h ? JSON.parse(h) : [];
    } catch {
      return [];
    }
  }), Oe = (h) => {
    We(h);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(h));
    } catch {
    }
  }, [xe, xt] = u.useState(!1), [ze, Bt] = u.useState(!1);
  u.useRef(null);
  const Ge = u.useRef(null), ft = u.useRef(null), $t = u.useRef(null), [Tt, Gn] = u.useState({ width: 960, height: 540 }), [Ve, wt] = u.useState(0), [Lt, jt] = u.useState(!1), [zt, pn] = u.useState(!1), [vt, pt] = u.useState(!1), [ln, un] = u.useState(!1), [Ee, mt] = u.useState(!1), [Ne, we] = u.useState({ vertical: null, horizontal: null }), [He, at] = u.useState(!0), [Et, Y] = u.useState(!0), [ce, ke] = u.useState(null), [De, Je] = u.useState({ x: 0, y: 0, isInside: !1 }), ot = u.useRef(null), Ye = u.useRef(null), Ke = u.useRef(!1), [Xe, it] = u.useState("auto-grid"), Nt = u.useRef([]), Pt = u.useRef([]), mn = u.useRef(null), [, Rn] = u.useState(0), Yn = u.useRef(null), [ks, Zt] = u.useState(null), qt = u.useCallback((h, E = "success", R = "💾") => {
    Yn.current && clearTimeout(Yn.current), Zt({ text: h, type: E, icon: R }), Yn.current = setTimeout(() => {
      Zt(null), Yn.current = null;
    }, 2200);
  }, []), [Ut, _s] = u.useState(() => {
    var R, Q, G, B, ne, Te;
    const h = (G = (Q = (R = A == null ? void 0 : A.keyframes) == null ? void 0 : R[0]) == null ? void 0 : Q.layout) == null ? void 0 : G.width, E = (Te = (ne = (B = A == null ? void 0 : A.keyframes) == null ? void 0 : B[0]) == null ? void 0 : ne.layout) == null ? void 0 : Te.height;
    if (h && E) {
      const ae = ms.find((ye) => ye.w === h && ye.h === E);
      if (ae) return ae.id;
    }
    return "16:9";
  }), [Xn, ss] = u.useState(() => {
    try {
      const h = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (h !== null) return h === "true";
    } catch {
    }
    return !1;
  }), $r = u.useCallback(() => {
    ss((h) => {
      const E = !h;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(E));
      } catch {
      }
      return E;
    });
  }, []), dn = u.useMemo(() => ms.find((h) => h.id === Ut) || ms[0], [Ut]), Me = dn.w, Ie = dn.h, ws = dn.ratio, Lr = u.useMemo(() => {
    const h = [], E = Me >= 3e3 ? 200 : 100, R = E / 2, Q = E / 10;
    for (let G = 0; G <= Me; G += Q) {
      const B = G % E === 0, ne = !B && G % R === 0;
      h.push({ val: G, isMajor: B, isMed: ne });
    }
    return h;
  }, [Me]), Nn = u.useMemo(() => {
    const h = [];
    for (let G = 0; G <= Ie; G += 10) {
      const B = G % 100 === 0, ne = !B && G % 50 === 0;
      h.push({ val: G, isMajor: B, isMed: ne });
    }
    return h;
  }, [Ie]), Or = u.useCallback((h) => {
    const E = ot.current || ft.current;
    if (!E) return;
    const R = E.getBoundingClientRect(), Q = Ht(Math.round((h.clientX - R.left) / R.width * Me), 0, Me), G = Ht(Math.round((h.clientY - R.top) / R.height * Ie), 0, Ie);
    Je({ x: Q, y: G, isInside: !0 });
  }, [Me, Ie]), xo = u.useCallback(() => {
    Je((h) => ({ ...h, isInside: !1 }));
  }, []), fr = u.useCallback(() => {
    const h = $t.current;
    if (!h) return;
    const E = h.getBoundingClientRect(), R = Math.max(320, Math.floor(E.width || 960) - 16), Q = Math.max(180, Math.floor(E.height || 540) - 16);
    let G, B;
    Xn ? (G = R, B = Math.round(G / ws)) : R / Q >= ws ? (B = Q, G = Math.round(B * ws)) : (G = R, B = Math.round(G / ws)), Gn((ne) => ne.width === G && ne.height === B ? ne : { width: G, height: B });
  }, [Xn, ws]);
  u.useEffect(() => {
    const h = $t.current;
    if (!h) return;
    fr();
    let E = null;
    return typeof ResizeObserver < "u" && (E = new ResizeObserver(() => {
      fr();
    }), E.observe(h)), window.addEventListener("resize", fr), () => {
      E && E.disconnect(), window.removeEventListener("resize", fr);
    };
  }, [fr]);
  const Fs = u.useMemo(() => (t && t.length > 0 ? t : n).map((E) => {
    const R = E.displays && E.displays.length > 0 ? E.displays : E.topology && E.topology.displays && E.topology.displays.length > 0 ? E.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: E.width || 1920, height: E.height || 1080 }], Q = R.find((ae) => ae.isPrimary) || R[0], G = Q.width || Q.Width || E.width || 1920, B = Q.height || Q.Height || E.height || 1080, ne = G && B ? G / B : 16 / 9, Te = R.length > 1;
    return {
      stationId: E.id,
      displayId: "auto",
      label: `${E.displayName || E.roleAlias || E.hostname || E.name} - ${Te ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: E.displayName || E.roleAlias || E.hostname || E.name,
      stationHostname: E.hostname || E.id,
      isPrimary: !0,
      sourceWidth: G,
      sourceHeight: B,
      nativeAspectRatio: ne,
      aspectRatio: ne,
      width: G,
      height: B
    };
  }), [t, n]), en = u.useMemo(() => {
    const h = n && n.length > 0 ? n : t, E = [];
    return h.forEach((R) => {
      const Q = R.displays && R.displays.length > 0 ? R.displays : R.topology && R.topology.displays && R.topology.displays.length > 0 ? R.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: R.width || 1920, height: R.height || 1080 }], G = Q.find((ae) => ae.isPrimary) || Q[0], B = G.width || G.Width || R.width || 1920, ne = G.height || G.Height || R.height || 1080, Te = B / ne;
      E.push({
        stationId: R.id,
        displayId: "auto",
        label: `${R.displayName || R.roleAlias || R.hostname || R.name} - ${Q.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: R.displayName || R.roleAlias || R.hostname || R.name,
        stationHostname: R.hostname || R.id,
        isPrimary: !0,
        sourceWidth: B,
        sourceHeight: ne,
        nativeAspectRatio: Te,
        aspectRatio: Te,
        width: B,
        height: ne
      }), Q.length > 1 && Q.forEach((ae, ye) => {
        const lt = (ae.displayId || `mon-${ye}`).toLowerCase(), tt = ae.displayNumber || ye + 1, et = ae.displayName || `Screen ${tt}`, ue = ae.width || ae.Width || R.width || 1920, nt = ae.height || ae.Height || R.height || 1080, bt = ue / nt;
        E.push({
          stationId: R.id,
          displayId: lt,
          label: `${R.displayName || R.roleAlias || R.hostname || R.name} - ${et}`,
          stationName: R.displayName || R.roleAlias || R.hostname || R.name,
          stationHostname: R.hostname || R.id,
          isPrimary: !!ae.isPrimary,
          sourceWidth: ue,
          sourceHeight: nt,
          nativeAspectRatio: bt,
          aspectRatio: bt,
          width: ue,
          height: nt
        });
      });
    }), E;
  }, [n, t]), [gn, tn] = u.useState(() => {
    var h;
    return ((h = A == null ? void 0 : A.keyframes) == null ? void 0 : h.length) > 0 ? JSON.parse(JSON.stringify(A)) : {
      id: "canvas-timeline-root",
      keyframes: [
        {
          id: "kf_root_0",
          timestampEpochMs: d,
          transitionDurationSec: 0.5,
          transitionType: "smooth",
          layout: {
            width: Nc,
            height: kc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: Br(Fs, Nc, kc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var h;
    ((h = A == null ? void 0 : A.keyframes) == null ? void 0 : h.length) > 0 && (tn(JSON.parse(JSON.stringify(A))), A.keyframes.some((R) => {
      var Q, G;
      return ((G = (Q = R.layout) == null ? void 0 : Q.placements) == null ? void 0 : G.length) > 0;
    }) && (Ke.current = !0, it("custom")));
  }, [A]);
  const Yt = gn.keyframes || [], Nl = u.useMemo(() => Sg(Yt, U), [Yt, U]), Xt = Ht(
    _ ?? Nl,
    0,
    Math.max(0, Yt.length - 1)
  ), L = Yt[Xt] || Yt[Nl] || Yt[0], P = u.useMemo(() => {
    var h;
    return ((h = L == null ? void 0 : L.layout) == null ? void 0 : h.placements) || [];
  }, [L]), me = u.useCallback((h = "Action") => ({
    label: h,
    timeline: JSON.parse(JSON.stringify(gn)),
    aspectId: Ut,
    presetId: Xe,
    selectedFeedIndex: Ve
  }), [gn, Ut, Xe, Ve]), Re = u.useCallback((h = "Action") => {
    const E = me(h);
    Nt.current.push(E), Nt.current.length > 50 && Nt.current.shift(), Pt.current = [], Rn((R) => R + 1);
  }, [me]), _e = u.useCallback(() => {
    mn.current && (Nt.current.push(mn.current), Nt.current.length > 50 && Nt.current.shift(), Pt.current = [], mn.current = null, Rn((h) => h + 1));
  }, []), Se = u.useCallback(() => {
    const h = g > 0 ? g : d + v, E = 500;
    if (h <= d + E) return Xt;
    const R = (L == null ? void 0 : L.layout) || {
      width: Me,
      height: Ie,
      backgroundColor: "#070A10",
      fps: 30,
      placements: P
    }, { nextTimeline: Q, newIndex: G, isNew: B } = _d(gn, h, R, E);
    return B && (tn(Q), T && T(Q), z && z(G), qt(
      `Keyframe #${G + 1} created at ${gt(h, m, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), G;
  }, [g, d, v, Xt, L, Me, Ie, P, gn, T, z, m, qt]), de = u.useCallback((h, E = null) => {
    E && Re(E);
    const R = g > 0 ? g : d + v;
    tn((Q) => {
      const { nextTimeline: G, newIndex: B, isNewKeyframe: ne } = Mg({
        prevTimeline: Q,
        newPlacements: h,
        currentEpochMs: R,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Me,
        virtualH: Ie,
        fps: 30
      });
      return T && T(G), z && z(B), ne && B > 0 && qt(
        `Keyframe #${B + 1} created at ${gt(R, m, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), G;
    });
  }, [g, d, v, Me, Ie, T, z, m, qt, Re]);
  u.useEffect(() => {
    if (Fs.length > 0 && (!P || P.length === 0) && !Ke.current) {
      let h = Ut;
      Fs.length === 2 && Ut === "16:9" && (h = "32:9", _s("32:9"));
      const E = ms.find((Q) => Q.id === h) || ms[0], R = Br(Fs, E.w, E.h);
      R.length > 0 && (de(R), it("auto-grid"));
    }
  }, [Fs, P, de, Ut]), u.useEffect(() => {
    V && V({
      width: Me,
      height: Ie,
      backgroundColor: "#070A10",
      fps: 30,
      placements: P,
      timeline: gn
    });
  }, [P, gn, V, Me, Ie]);
  const Fe = u.useCallback((h) => {
    const E = dn, R = ms.find((Q) => Q.id === h) || ms[0];
    if (E.id !== R.id)
      if (_s(R.id), Ke.current) {
        const Q = R.w / E.w, G = R.h / E.h, B = P.map((ne) => ({
          ...ne,
          x: Math.round(ne.x * Q),
          y: Math.round(ne.y * G),
          width: Math.round(ne.width * Q),
          height: Math.round(ne.height * G)
        }));
        de(B);
      } else {
        const Q = Br(P && P.length > 0 ? P : en, R.w, R.h);
        de(Q);
      }
  }, [dn, P, en, de]), Ze = u.useCallback((h) => {
    const E = P.length > 0 ? Math.max(...P.map((ae) => ae.zIndex || 0)) + 1 : 0, R = dt[P.length % dt.length], Q = h.nativeAspectRatio || (h.sourceWidth && h.sourceHeight ? h.sourceWidth / h.sourceHeight : 16 / 9), G = Q >= 1 ? 640 : Math.round(360 * Q), B = Q >= 1 ? Math.round(640 / Q) : 360, ne = {
      stationId: h.stationId,
      displayId: h.displayId,
      label: h.label,
      x: 100 + P.length * 40 % 800,
      y: 80 + P.length * 40 % 500,
      width: G,
      height: B,
      sourceWidth: h.sourceWidth || 1920,
      sourceHeight: h.sourceHeight || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q,
      zIndex: E,
      rotation: 0,
      borderWidth: 2,
      borderColor: R,
      shadowEffect: "deep",
      borderRadius: 0
    }, Te = [...P, ne];
    de(Te), wt(Te.length - 1);
  }, [P, de]), qe = u.useCallback((h) => {
    const E = P.filter((R, Q) => Q !== h);
    de(E), wt((R) => Math.max(0, R - 1));
  }, [P, de]), kt = u.useCallback(() => {
    de([]), wt(-1);
  }, [de]), St = (h) => {
    const E = h.map((Q, G) => ({ p: Q, origIdx: G }));
    E.sort((Q, G) => (Q.p.zIndex ?? Q.origIdx) - (G.p.zIndex ?? G.origIdx));
    const R = [...h];
    return E.forEach(({ origIdx: Q }, G) => {
      R[Q] = { ...R[Q], zIndex: G + 1 };
    }), R;
  }, At = u.useCallback((h = Ve) => {
    if (h < 0 || !P[h]) return;
    const E = St(P), R = E[h].zIndex, Q = E.length;
    if (R >= Q) return;
    const G = E.map((B, ne) => ne === h ? { ...B, zIndex: Q } : B.zIndex > R ? { ...B, zIndex: B.zIndex - 1 } : B);
    de(G);
  }, [Ve, P, de]), sn = u.useCallback((h = Ve) => {
    if (h < 0 || !P[h]) return;
    const E = St(P), R = E[h].zIndex;
    if (R <= 1) return;
    const Q = E.map((G, B) => B === h ? { ...G, zIndex: 1 } : G.zIndex < R ? { ...G, zIndex: G.zIndex + 1 } : G);
    de(Q);
  }, [Ve, P, de]), hs = u.useCallback((h = Ve) => {
    if (h < 0 || !P[h]) return;
    const E = St(P), R = E[h].zIndex, Q = R + 1;
    if (Q > E.length) return;
    const G = E.map((B, ne) => ne === h ? { ...B, zIndex: Q } : B.zIndex === Q ? { ...B, zIndex: R } : B);
    de(G);
  }, [Ve, P, de]), Qt = u.useCallback((h = Ve) => {
    if (h < 0 || !P[h]) return;
    const E = St(P), R = E[h].zIndex, Q = R - 1;
    if (Q < 1) return;
    const G = E.map((B, ne) => ne === h ? { ...B, zIndex: Q } : B.zIndex === Q ? { ...B, zIndex: R } : B);
    de(G);
  }, [Ve, P, de]), on = u.useCallback((h) => {
    if (Ve < 0 || !P[Ve]) return;
    const E = P.map((R, Q) => Q === Ve ? { ...R, ...h } : R);
    de(E);
  }, [Ve, P, de]), js = u.useCallback((h = 90) => {
    const E = P[Ve];
    if (!E) return;
    const Q = ((E.rotation || 0) + h) % 360;
    on({ rotation: Q });
  }, [Ve, P, on]), kl = u.useCallback((h = Ve) => {
    if (h < 0 || !P[h]) return;
    const E = P.length, R = P.map((Q, G) => G === h ? {
      ...Q,
      x: 0,
      y: 0,
      width: Me,
      height: Ie,
      zIndex: E
    } : Q);
    de(R);
  }, [Ve, P, de, Me, Ie]), fs = u.useCallback((h) => {
    let E = [];
    const R = en.length > 0 ? en : P;
    switch (h) {
      case "auto":
      case "auto-grid":
        E = Br(R, Me, Ie);
        break;
      case "1x1":
        R.length > 0 && (E = [{
          ...R[0],
          x: 0,
          y: 0,
          width: Me,
          height: Ie,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: dt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (R.length >= 2) {
          const Q = Math.round(Me / 2);
          E = R.slice(0, 2).map((G, B) => {
            const ne = G.nativeAspectRatio || (G.sourceWidth && G.sourceHeight ? G.sourceWidth / G.sourceHeight : 1.7777777777777777), { x: Te, y: ae, width: ye, height: lt } = Ys(B * Q, 0, Q, Ie, ne);
            return {
              ...G,
              x: Te,
              y: ae,
              width: ye,
              height: lt,
              sourceWidth: G.sourceWidth || 1920,
              sourceHeight: G.sourceHeight || 1080,
              nativeAspectRatio: ne,
              aspectRatio: ne,
              zIndex: B + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: dt[B % dt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          E = Br(R, Me, Ie);
        break;
      case "2x2": {
        const Q = Math.round(Me / 2), G = Math.round(Ie / 2);
        E = R.slice(0, 4).map((B, ne) => ({
          ...B,
          x: ne % 2 * Q,
          y: Math.floor(ne / 2) * G,
          width: Q,
          height: G,
          zIndex: ne,
          rotation: 0,
          borderWidth: 2,
          borderColor: dt[ne % dt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (R.length >= 2) {
          E = [
            { ...R[0], x: 0, y: 0, width: Me, height: Ie, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: dt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Q = R.slice(1, 4), G = Math.round(Me * 0.23), B = Math.round(G / (16 / 9));
          Q.forEach((ne, Te) => {
            E.push({
              ...ne,
              x: Me - G - 24,
              y: 24 + Te * (B + 16),
              width: G,
              height: B,
              zIndex: 10 + Te,
              rotation: 0,
              borderWidth: 3,
              borderColor: dt[(Te + 1) % dt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (R.length >= 3) {
          const Q = Math.round(Me * 0.666), G = Me - Q, B = Math.round(Ie / 2);
          E = [
            { ...R[0], x: 0, y: 0, width: Q, height: Ie, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: dt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...R[1], x: Q, y: 0, width: G, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: dt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...R[2], x: Q, y: B, width: G, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: dt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (R.length >= 3)
          if (Me / Ie >= 2.5) {
            const G = Math.round(Me / 3);
            E = R.slice(0, 3).map((B, ne) => {
              const Te = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 1.7777777777777777), { x: ae, y: ye, width: lt, height: tt } = Ys(ne * G, 0, G, Ie, Te);
              return {
                ...B,
                x: ae,
                y: ye,
                width: lt,
                height: tt,
                sourceWidth: B.sourceWidth || 1920,
                sourceHeight: B.sourceHeight || 1080,
                nativeAspectRatio: Te,
                aspectRatio: Te,
                zIndex: ne,
                rotation: 0,
                borderWidth: 2,
                borderColor: dt[ne % dt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const G = Math.round(Me / 2), B = Math.round(Ie / 2);
            E = [
              { ...R[0], x: 0, y: 0, width: G, height: B, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: dt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...R[1], x: G, y: 0, width: G, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: dt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...R[2], x: Math.round(G / 2), y: B, width: G, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: dt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    E.length > 0 && (de(E), wt(0), h === "auto" || h === "auto-grid" ? it("auto-grid") : (it(h), Ke.current = !0));
  }, [en, P, de, Me, Ie]), Dr = u.useCallback(() => {
    const h = Le.trim() || `Custom Layout ${be.length + 1}`, R = [{
      id: `preset-${Date.now()}`,
      name: h,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(P)),
      keyframes: JSON.parse(JSON.stringify(Yt))
    }, ...be];
    Oe(R), je(""), q(!1);
  }, [Le, be, P, Yt]), Cp = u.useCallback((h) => {
    !h || !h.placements || (de(h.placements), wt(0), it("custom"), Ke.current = !0, Ue(!1));
  }, [de]), Ep = u.useCallback((h, E) => {
    E == null || E.stopPropagation();
    const R = be.filter((Q) => Q.id !== h);
    Oe(R);
  }, [be]), Sp = u.useCallback(() => {
    const h = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Me,
      height: Ie,
      aspectRatio: Ut,
      placements: P,
      timeline: gn
    }, E = JSON.stringify(h, null, 2), R = new window.Blob([E], { type: "application/json" }), Q = window.URL.createObjectURL(R), G = document.createElement("a"), B = /* @__PURE__ */ new Date(), ne = (ae) => String(ae).padStart(2, "0"), Te = `${B.getFullYear()}${ne(B.getMonth() + 1)}${ne(B.getDate())}_${ne(B.getHours())}${ne(B.getMinutes())}${ne(B.getSeconds())}`;
    G.href = Q, G.download = `canvas_layout_${Te}.json`, document.body.appendChild(G), G.click(), document.body.removeChild(G), window.URL.revokeObjectURL(Q);
  }, [P, gn, Me, Ie, Ut]), bp = u.useCallback((h) => {
    var Q;
    const E = (Q = h.target.files) == null ? void 0 : Q[0];
    if (!E) return;
    const R = new window.FileReader();
    R.onload = (G) => {
      var B, ne, Te;
      try {
        const ae = JSON.parse(G.target.result);
        if (ae.width && ae.height) {
          const lt = ms.find((tt) => tt.w === ae.width && tt.h === ae.height);
          lt && _s(lt.id);
        } else if (ae.aspectRatio) {
          const lt = ms.find((tt) => tt.id === ae.aspectRatio);
          lt && _s(lt.id);
        }
        let ye = null;
        Array.isArray(ae) ? ye = ae : ae.placements && Array.isArray(ae.placements) ? ye = ae.placements : (B = ae.layout) != null && B.placements && Array.isArray(ae.layout.placements) && (ye = ae.layout.placements), ye && ye.length > 0 && (de(ye), wt(0), it("custom"), Ke.current = !0), ((Te = (ne = ae.timeline) == null ? void 0 : ne.keyframes) == null ? void 0 : Te.length) > 0 && (tn(ae.timeline), T && T(ae.timeline));
      } catch (ae) {
        console.error("Failed to parse imported canvas JSON:", ae), alert(`Canvas Import Error: ${ae.message}`);
      }
    }, R.readAsText(E), h.target.value = "";
  }, [de, T]), zi = (h, E) => {
    if (h.button !== 0) return;
    h.stopPropagation(), h.preventDefault(), wt(E), Ke.current = !0, it("custom");
    const R = Se(), Q = ot.current || ft.current;
    if (!Q) return;
    const G = Q.getBoundingClientRect(), B = P[E];
    if (!B) return;
    mn.current = me("Move Feed"), Ye.current = {
      mode: "drag",
      index: E,
      startX: h.clientX,
      startY: h.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      scaleX: Me / G.width,
      scaleY: Ie / G.height,
      activeSnapZone: null
    }, un(!0);
    const ne = (ae) => {
      if (!Ye.current || Ye.current.mode !== "drag") return;
      const ye = Ye.current, lt = ot.current || ft.current;
      if (!lt) return;
      const tt = lt.getBoundingClientRect(), et = (ae.clientX - ye.startX) * ye.scaleX, ue = (ae.clientY - ye.startY) * ye.scaleY;
      let nt = Math.round(ye.initialX + et), bt = Math.round(ye.initialY + ue);
      nt = Ht(nt, 0, Me - ye.initialW), bt = Ht(bt, 0, Ie - ye.initialH);
      const st = Et && !ae.altKey;
      let ut = null, En = null, Bn = null;
      if (st) {
        const Rt = ae.clientX - tt.left, Ct = ae.clientY - tt.top, Mt = 32, $e = Math.round(Me / 2), ct = Math.round(Ie / 2);
        if (Rt <= Mt ? Ct <= tt.height * 0.22 ? ut = { x: 0, y: 0, width: $e, height: ct, label: "◰ Top-Left Quarter" } : Ct >= tt.height * 0.78 ? ut = { x: 0, y: ct, width: $e, height: ct, label: "◱ Bottom-Left Quarter" } : ut = { x: 0, y: 0, width: $e, height: Ie, label: "◧ Left Half (50%)" } : Rt >= tt.width - Mt ? Ct <= tt.height * 0.22 ? ut = { x: $e, y: 0, width: $e, height: ct, label: "◲ Top-Right Quarter" } : Ct >= tt.height * 0.78 ? ut = { x: $e, y: ct, width: $e, height: ct, label: "◳ Bottom-Right Quarter" } : ut = { x: $e, y: 0, width: $e, height: Ie, label: "◨ Right Half (50%)" } : Ct <= Mt && Rt >= tt.width * 0.25 && Rt <= tt.width * 0.75 && (ut = { x: 0, y: 0, width: Me, height: Ie, label: "🗖 Full Canvas Maximize" }), !ut) {
          const pr = P.filter((Qe, mr) => mr !== ye.index), Ws = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Me, targetX: Me - ye.initialW, guide: 100 },
            { snapTo: $e, targetX: $e - Math.round(ye.initialW / 2), guide: 50 }
          ];
          pr.forEach((Qe) => {
            Ws.push({ snapTo: Qe.x, targetX: Qe.x, guide: Qe.x / Me * 100 }), Ws.push({ snapTo: Qe.x + Qe.width, targetX: Qe.x + Qe.width - ye.initialW, guide: (Qe.x + Qe.width) / Me * 100 }), Ws.push({ snapTo: Qe.x + Qe.width, targetX: Qe.x + Qe.width, guide: (Qe.x + Qe.width) / Me * 100 }), Ws.push({ snapTo: Qe.x, targetX: Qe.x - ye.initialW, guide: Qe.x / Me * 100 });
          });
          let wu = 18;
          Ws.forEach((Qe) => {
            const mr = Math.abs(nt - Qe.targetX);
            mr < wu && (wu = mr, nt = Qe.targetX, En = Qe.guide);
          });
          const wl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Ie, targetY: Ie - ye.initialH, guide: 100 },
            { snapTo: ct, targetY: ct - Math.round(ye.initialH / 2), guide: 50 }
          ];
          pr.forEach((Qe) => {
            wl.push({ snapTo: Qe.y, targetY: Qe.y, guide: Qe.y / Ie * 100 }), wl.push({ snapTo: Qe.y + Qe.height, targetY: Qe.y + Qe.height - ye.initialH, guide: (Qe.y + Qe.height) / Ie * 100 }), wl.push({ snapTo: Qe.y + Qe.height, targetY: Qe.y + Qe.height, guide: (Qe.y + Qe.height) / Ie * 100 }), wl.push({ snapTo: Qe.y, targetY: Qe.y - ye.initialH, guide: Qe.y / Ie * 100 });
          });
          let ju = 18;
          wl.forEach((Qe) => {
            const mr = Math.abs(bt - Qe.targetY);
            mr < ju && (ju = mr, bt = Qe.targetY, Bn = Qe.guide);
          });
        }
      }
      ye.activeSnapZone = ut, ye.latestX = nt, ye.latestY = bt, ke(ut), we({ vertical: En, horizontal: Bn }), tn((Rt) => {
        const Ct = [...Rt.keyframes || []], Mt = R < Ct.length ? R : Xt;
        if (!Ct[Mt]) return Rt;
        const $e = [...Ct[Mt].layout.placements || []];
        return $e[ye.index] ? ($e[ye.index] = { ...$e[ye.index], x: nt, y: bt }, Ct[Mt] = {
          ...Ct[Mt],
          layout: { ...Ct[Mt].layout, placements: $e }
        }, { ...Rt, keyframes: Ct }) : Rt;
      });
    }, Te = () => {
      var ae;
      if (un(!1), we({ vertical: null, horizontal: null }), (ae = Ye.current) != null && ae.activeSnapZone) {
        const ye = Ye.current.activeSnapZone, lt = Ye.current.index;
        tn((tt) => {
          const et = [...tt.keyframes || []], ue = R < et.length ? R : Xt;
          if (!et[ue]) return tt;
          const nt = [...et[ue].layout.placements || []];
          return nt[lt] ? (nt[lt] = {
            ...nt[lt],
            x: ye.x,
            y: ye.y,
            width: ye.width,
            height: ye.height
          }, et[ue] = {
            ...et[ue],
            layout: { ...et[ue].layout, placements: nt }
          }, { ...tt, keyframes: et }) : tt;
        });
      }
      if (Ye.current) {
        const ye = Ye.current, lt = ye.initialX, tt = ye.initialY, et = ye.activeSnapZone ? ye.activeSnapZone.x : ye.latestX ?? lt, ue = ye.activeSnapZone ? ye.activeSnapZone.y : ye.latestY ?? tt;
        et !== lt || ue !== tt ? (_e(), T && tn((nt) => (T(nt), nt))) : mn.current = null;
      }
      ke(null), Ye.current = null, window.removeEventListener("mousemove", ne), window.removeEventListener("mouseup", Te);
    };
    window.addEventListener("mousemove", ne), window.addEventListener("mouseup", Te);
  }, yo = (h, E, R = "br") => {
    if (h.button !== 0) return;
    h.stopPropagation(), h.preventDefault(), wt(E), Ke.current = !0, it("custom");
    const Q = Se();
    if (!ft.current) return;
    const G = ft.current.getBoundingClientRect(), B = P[E];
    if (!B) return;
    mn.current = me("Resize Feed");
    const ne = en.find((et) => et.stationId === B.stationId && et.displayId === B.displayId), Te = B.sourceWidth || (ne == null ? void 0 : ne.sourceWidth) || 1920, ae = B.sourceHeight || (ne == null ? void 0 : ne.sourceHeight) || 1080, ye = B.nativeAspectRatio || B.aspectRatio || (ne == null ? void 0 : ne.nativeAspectRatio) || Te / ae || B.width / B.height || 16 / 9;
    Ye.current = {
      mode: "resize",
      corner: R,
      index: E,
      startX: h.clientX,
      startY: h.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      sourceWidth: Te,
      sourceHeight: ae,
      nativeAspectRatio: ye,
      scaleX: Me / G.width,
      scaleY: Ie / G.height
    }, mt(!0);
    const lt = (et) => {
      if (!Ye.current || Ye.current.mode !== "resize") return;
      const ue = Ye.current, nt = (et.clientX - ue.startX) * ue.scaleX, bt = (et.clientY - ue.startY) * ue.scaleY, st = et.ctrlKey || et.shiftKey || et.metaKey, ut = ue.nativeAspectRatio > 0 ? ue.nativeAspectRatio : ue.initialW / ue.initialH;
      let En = ue.initialX, Bn = ue.initialY, Rt = ue.initialW, Ct = ue.initialH;
      if (ue.corner === "br") {
        const Mt = Me - ue.initialX, $e = Ie - ue.initialY;
        if (st) {
          let ct = Math.max(160, Math.min(Mt, Math.round(ue.initialW + nt))), rt = Math.round(ct / ut);
          rt > $e && (rt = $e, ct = Math.round(rt * ut)), rt < 90 && (rt = 90, ct = Math.round(rt * ut)), Rt = ct, Ct = rt;
        } else
          Rt = Ht(Math.round(ue.initialW + nt), 160, Mt), Ct = Ht(Math.round(ue.initialH + bt), 90, $e);
      } else if (ue.corner === "bl") {
        const Mt = ue.initialX + ue.initialW, $e = Ie - ue.initialY;
        if (st) {
          let ct = Math.max(160, Math.min(Mt, Math.round(ue.initialW - nt))), rt = Math.round(ct / ut);
          rt > $e && (rt = $e, ct = Math.round(rt * ut)), rt < 90 && (rt = 90, ct = Math.round(rt * ut)), Rt = ct, Ct = rt, En = ue.initialX + ue.initialW - Rt;
        } else
          Rt = Ht(Math.round(ue.initialW - nt), 160, Mt), Ct = Ht(Math.round(ue.initialH + bt), 90, $e), En = ue.initialX + ue.initialW - Rt;
      } else if (ue.corner === "tr") {
        const Mt = Me - ue.initialX, $e = ue.initialY + ue.initialH;
        if (st) {
          let ct = Math.max(160, Math.min(Mt, Math.round(ue.initialW + nt))), rt = Math.round(ct / ut);
          rt > $e && (rt = $e, ct = Math.round(rt * ut)), rt < 90 && (rt = 90, ct = Math.round(rt * ut)), Rt = ct, Ct = rt, Bn = ue.initialY + ue.initialH - Ct;
        } else
          Rt = Ht(Math.round(ue.initialW + nt), 160, Mt), Ct = Ht(Math.round(ue.initialH - bt), 90, $e), Bn = ue.initialY + ue.initialH - Ct;
      } else if (ue.corner === "tl") {
        const Mt = ue.initialX + ue.initialW, $e = ue.initialY + ue.initialH;
        if (st) {
          let ct = Math.max(160, Math.min(Mt, Math.round(ue.initialW - nt))), rt = Math.round(ct / ut);
          rt > $e && (rt = $e, ct = Math.round(rt * ut)), rt < 90 && (rt = 90, ct = Math.round(rt * ut)), Rt = ct, Ct = rt, En = ue.initialX + ue.initialW - Rt, Bn = ue.initialY + ue.initialH - Ct;
        } else
          Rt = Ht(Math.round(ue.initialW - nt), 160, Mt), Ct = Ht(Math.round(ue.initialH - bt), 90, $e), En = ue.initialX + ue.initialW - Rt, Bn = ue.initialY + ue.initialH - Ct;
      }
      tn((Mt) => {
        const $e = [...Mt.keyframes || []], ct = Q < $e.length ? Q : Xt;
        if (!$e[ct]) return Mt;
        const rt = [...$e[ct].layout.placements || []];
        return rt[ue.index] ? (rt[ue.index] = {
          ...rt[ue.index],
          x: En,
          y: Bn,
          width: Rt,
          height: Ct,
          sourceWidth: ue.sourceWidth,
          sourceHeight: ue.sourceHeight,
          nativeAspectRatio: ue.nativeAspectRatio,
          aspectRatio: ue.nativeAspectRatio
        }, $e[ct] = {
          ...$e[ct],
          layout: { ...$e[ct].layout, placements: rt }
        }, { ...Mt, keyframes: $e }) : Mt;
      });
    }, tt = () => {
      if (Ye.current) {
        const et = Ye.current, ue = et.latestW ?? et.initialW, nt = et.latestH ?? et.initialH;
        ue !== et.initialW || nt !== et.initialH ? (_e(), T && tn((bt) => (T(bt), bt))) : mn.current = null;
      }
      mt(!1), Ye.current = null, window.removeEventListener("mousemove", lt), window.removeEventListener("mouseup", tt);
    };
    window.addEventListener("mousemove", lt), window.addEventListener("mouseup", tt);
  }, Mp = u.useCallback((h) => {
    const E = P[h];
    if (!E) return;
    const R = en.find((Te) => Te.stationId === E.stationId && Te.displayId === E.displayId), Q = E.nativeAspectRatio || E.aspectRatio || (R == null ? void 0 : R.nativeAspectRatio) || (E.sourceWidth && E.sourceHeight ? E.sourceWidth / E.sourceHeight : 16 / 9);
    let G = E.width, B = Math.round(G / Q);
    E.y + B > Ie && (B = Ie - E.y, G = Math.round(B * Q)), E.x + G > Me && (G = Me - E.x, B = Math.round(G / Q));
    const ne = P.map((Te, ae) => ae === h ? {
      ...Te,
      width: Math.max(160, G),
      height: Math.max(90, B),
      sourceWidth: E.sourceWidth || (R == null ? void 0 : R.sourceWidth) || 1920,
      sourceHeight: E.sourceHeight || (R == null ? void 0 : R.sourceHeight) || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q
    } : Te);
    de(ne, "Snap Native Aspect");
  }, [P, en, de]), Hi = u.useCallback(() => {
    if (Nt.current.length === 0) return;
    const h = me("Redo State");
    Pt.current.push(h), Pt.current.length > 50 && Pt.current.shift();
    const E = Nt.current.pop();
    E && (tn(E.timeline), T && T(E.timeline), E.aspectId && E.aspectId !== Ut && _s(E.aspectId), E.presetId && it(E.presetId), E.selectedFeedIndex !== void 0 && wt(E.selectedFeedIndex), Ke.current = !0, Rn((R) => R + 1), qt(`Undo: ${E.label || "Previous State"}`, "undo", "↺"));
  }, [me, T, Ut, qt]), Vi = u.useCallback(() => {
    if (Pt.current.length === 0) return;
    const h = me("Undo State");
    Nt.current.push(h), Nt.current.length > 50 && Nt.current.shift();
    const E = Pt.current.pop();
    E && (tn(E.timeline), T && T(E.timeline), E.aspectId && E.aspectId !== Ut && _s(E.aspectId), E.presetId && it(E.presetId), E.selectedFeedIndex !== void 0 && wt(E.selectedFeedIndex), Ke.current = !0, Rn((R) => R + 1), qt(`Redo: ${E.label || "Restored State"}`, "info", "↻"));
  }, [me, T, Ut, qt]), xu = u.useCallback(() => {
    const E = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(P)),
      keyframes: JSON.parse(JSON.stringify(Yt)),
      aspectId: Ut,
      width: Me,
      height: Ie
    }, ...be.filter((R) => R.id !== "preset-quicksave")];
    Oe(E);
    try {
      hp({
        canvasLayoutTimeline: gn,
        selectedAspectId: Ut,
        selectedPresetId: Xe,
        isFullWidth: Xn
      });
    } catch (R) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", R);
    }
    qt(`State Saved (${Me}×${Ie} • ${P.length} Feeds)`, "success", "💾");
  }, [P, Yt, Ut, Me, Ie, be, Oe, gn, Xe, Xn, qt]);
  u.useEffect(() => {
    const h = () => Hi(), E = () => Vi(), R = () => xu();
    return window.addEventListener("itb:studio-undo", h), window.addEventListener("itb:studio-redo", E), window.addEventListener("itb:studio-save-now", R), () => {
      window.removeEventListener("itb:studio-undo", h), window.removeEventListener("itb:studio-redo", E), window.removeEventListener("itb:studio-save-now", R);
    };
  }, [Hi, Vi, xu]);
  const Ip = u.useCallback(() => {
    xt((h) => {
      const E = !h;
      if (E) {
        r && r(null);
        const R = Ge.current;
        R && R.requestFullscreen && R.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return E;
    });
  }, [r]), yu = u.useCallback(() => {
    const h = g > 0 ? g : d + v, { nextTimeline: E, newIndex: R, isNew: Q } = _d(
      gn,
      h,
      (L == null ? void 0 : L.layout) || {
        width: Me,
        height: Ie,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(P))
      }
    );
    Q ? (Re("Add Keyframe"), tn(E), T && T(E), z && z(R), qt(`Keyframe #${R + 1} created at ${gt(h, m, { includeSeconds: !0 })}`, "success", "💎")) : (z && z(R), qt(`Jumped to existing Keyframe #${R + 1}`, "info", "💎"));
  }, [g, d, v, L, P, Me, Ie, gn, T, z, m, qt, Re]), Tp = u.useCallback(() => {
    if (Yt.length <= 1 || Xt === 0) {
      qt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Re("Delete Keyframe");
    const { nextTimeline: h, success: E, newIndex: R } = Ig(gn, Xt);
    E && (tn(h), T && T(h), z && z(R), qt("Keyframe deleted", "info", "🗑️"));
  }, [Yt, Xt, gn, T, z, qt, Re]), Ap = u.useCallback((h) => {
    Xt !== 0 && (Re("Update Transition Type"), tn((E) => {
      const R = Pd(E, Xt, { transitionType: h });
      return T && T(R), R;
    }));
  }, [Xt, T, Re]), Rp = u.useCallback((h) => {
    Xt !== 0 && (Re("Update Transition Duration"), tn((E) => {
      const R = Pd(E, Xt, { transitionDurationSec: h });
      return T && T(R), R;
    }));
  }, [Xt, T, Re]);
  u.useEffect(() => {
    const h = (E) => {
      if (!(E.target.tagName === "INPUT" || E.target.tagName === "TEXTAREA" || E.target.isContentEditable)) {
        if (E.key === "Delete" || E.key === "Backspace") {
          Ve >= 0 && P[Ve] && (E.preventDefault(), qe(Ve));
          return;
        }
        if ((E.code === "Space" || E.key === " ") && S) {
          E.preventDefault(), S((R) => !R);
          return;
        }
        if ((E.key === "k" || E.key === "K") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), yu();
          return;
        }
        if (E.key === "Escape") {
          se(!1), Ue(!1), pn(!1), jt(!1), pt(!1), q(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(E.key)) {
          if (Ve >= 0 && P[Ve]) {
            E.preventDefault(), Ke.current = !0, it("custom");
            const R = E.shiftKey ? 1 : 10;
            let Q = 0, G = 0;
            E.key === "ArrowLeft" && (Q = -R), E.key === "ArrowRight" && (Q = R), E.key === "ArrowUp" && (G = -R), E.key === "ArrowDown" && (G = R);
            const B = P[Ve], ne = Ht(B.x + Q, 0, Me - B.width), Te = Ht(B.y + G, 0, Ie - B.height), ae = P.map((ye, lt) => lt === Ve ? { ...ye, x: ne, y: Te } : ye);
            de(ae);
          }
          return;
        }
        if ((E.key === "r" || E.key === "R") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), at((R) => !R);
          return;
        }
        if ((E.key === "s" || E.key === "S") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), Y((R) => !R);
          return;
        }
      }
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [Ve, P, qe, de, at, Y]);
  const vu = u.useMemo(() => bg({
    keyframes: Yt,
    currentEpochMs: U,
    currentPlacements: P,
    isEditing: ln || Ee
  }), [ln, Ee, Yt, U, P]), $p = u.useMemo(() => vu.map((h, E) => ({ ...h, originalIndex: E })).sort((h, E) => (h.zIndex ?? h.originalIndex) - (E.zIndex ?? E.originalIndex)), [vu]), Bs = P[Ve] || null, { filteredPlaced: Us, filteredUnplaced: vo } = u.useMemo(() => {
    const h = (le || "").toLowerCase(), E = P.map((B, ne) => {
      const Te = B.zIndex ?? ne + 1, ae = en.find((ye) => ye.stationId === B.stationId && ye.displayId === B.displayId);
      return {
        type: "placed",
        origIdx: ne,
        placement: B,
        feed: ae,
        stationId: B.stationId,
        displayId: B.displayId,
        label: B.label || (ae == null ? void 0 : ae.label) || `${B.stationId} (${B.displayId})`,
        layerRank: Te,
        isSelected: ne === Ve,
        sourceWidth: B.sourceWidth || (ae == null ? void 0 : ae.sourceWidth) || 1920,
        sourceHeight: B.sourceHeight || (ae == null ? void 0 : ae.sourceHeight) || 1080
      };
    });
    E.sort((B, ne) => ne.layerRank - B.layerRank);
    const R = en.filter((B) => !P.some((ne) => ne.stationId === B.stationId && ne.displayId === B.displayId)).map((B) => ({
      type: "unplaced",
      feed: B,
      stationId: B.stationId,
      displayId: B.displayId,
      label: B.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: B.sourceWidth || 1920,
      sourceHeight: B.sourceHeight || 1080
    })), Q = h ? E.filter((B) => B.label.toLowerCase().includes(h)) : E, G = h ? R.filter((B) => B.label.toLowerCase().includes(h)) : R;
    return { filteredPlaced: Q, filteredUnplaced: G };
  }, [P, en, Ve, le]), Nu = u.useCallback((h, E) => {
    h.stopPropagation(), H(E), h.dataTransfer.effectAllowed = "copyMove", h.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: E.origIdx,
      type: E.type,
      stationId: E.stationId,
      displayId: E.displayId
    }));
  }, []), Lp = u.useCallback((h, E) => {
    h.preventDefault(), h.stopPropagation(), h.dataTransfer.dropEffect = "move";
    const R = h.currentTarget.getBoundingClientRect(), Q = R.top + R.height / 2, G = h.clientY < Q ? "above" : "below";
    ie((B) => B.index === E && B.position === G ? B : { index: E, position: G });
  }, []), Op = u.useCallback((h, E) => {
    h.stopPropagation(), ie((R) => R.index === E ? { index: null, position: null } : R);
  }, []), ku = u.useCallback(() => {
    H(null), ie({ index: null, position: null });
  }, []), Dp = u.useCallback((h, E) => {
    h.preventDefault(), h.stopPropagation();
    const R = te;
    ie({ index: null, position: null }), H(null);
    const Q = h.dataTransfer.getData("text/plain");
    if (Q)
      try {
        const G = JSON.parse(Q);
        if (G.type === "placed") {
          const B = G.origIdx, ne = Us.findIndex((et) => et.origIdx === B);
          if (ne === -1) return;
          let Te = E;
          if (R.position === "below" && (Te += 1), ne < Te && (Te -= 1), ne === Te) return;
          const ae = [...Us], [ye] = ae.splice(ne, 1);
          ae.splice(Te, 0, ye);
          const lt = ae.length, tt = P.map((et, ue) => {
            const nt = ae.findIndex((bt) => bt.origIdx === ue);
            return nt !== -1 ? {
              ...et,
              zIndex: lt - nt
            } : et;
          });
          de(tt), wt(ye.origIdx);
        } else if (G.type === "unplaced") {
          const B = en.find((ut) => ut.stationId === G.stationId && ut.displayId === G.displayId);
          if (!B) return;
          const ne = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 16 / 9), Te = ne >= 1 ? 640 : Math.round(360 * ne), ae = ne >= 1 ? Math.round(640 / ne) : 360, ye = dt[P.length % dt.length];
          let lt = E;
          R.position === "below" && (lt += 1);
          const tt = {
            stationId: B.stationId,
            displayId: B.displayId,
            label: B.label,
            x: 100 + P.length * 40 % 800,
            y: 80 + P.length * 40 % 500,
            width: Te,
            height: ae,
            sourceWidth: B.sourceWidth || 1920,
            sourceHeight: B.sourceHeight || 1080,
            nativeAspectRatio: ne,
            aspectRatio: ne,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: ye,
            shadowEffect: "deep",
            borderRadius: 0
          }, et = [...P, tt], ue = et.length - 1, nt = [...Us];
          nt.splice(lt, 0, { origIdx: ue });
          const bt = nt.length, st = et.map((ut, En) => {
            const Bn = nt.findIndex((Rt) => Rt.origIdx === En);
            return {
              ...ut,
              zIndex: Bn !== -1 ? bt - Bn : 1
            };
          });
          de(st), wt(ue);
        }
      } catch (G) {
        console.warn("Failed to handle layer drag drop:", G);
      }
  }, [te, Us, P, en, de]), Pp = u.useCallback((h) => {
    h.preventDefault();
    const E = h.dataTransfer.getData("text/plain");
    if (!(!E || !ft.current))
      try {
        const R = JSON.parse(E), Q = ft.current.getBoundingClientRect(), G = h.clientX - Q.left, B = h.clientY - Q.top, ne = Ht(Math.round(G / Q.width * Me), 0, Me - 320), Te = Ht(Math.round(B / Q.height * Ie), 0, Ie - 180);
        if (R.type === "unplaced") {
          const ae = en.find((ye) => ye.stationId === R.stationId && ye.displayId === R.displayId);
          if (ae) {
            const ye = ae.nativeAspectRatio || (ae.sourceWidth && ae.sourceHeight ? ae.sourceWidth / ae.sourceHeight : 1.7777777777777777), lt = ye >= 1 ? 640 : Math.round(360 * ye), tt = ye >= 1 ? Math.round(640 / ye) : 360, et = P.length > 0 ? Math.max(...P.map((st) => st.zIndex || 0)) + 1 : 1, ue = dt[P.length % dt.length], nt = {
              stationId: ae.stationId,
              displayId: ae.displayId,
              label: ae.label,
              x: Ht(ne, 0, Me - lt),
              y: Ht(Te, 0, Ie - tt),
              width: lt,
              height: tt,
              sourceWidth: ae.sourceWidth || 1920,
              sourceHeight: ae.sourceHeight || 1080,
              nativeAspectRatio: ye,
              aspectRatio: ye,
              zIndex: et,
              rotation: 0,
              borderWidth: 2,
              borderColor: ue,
              shadowEffect: "deep",
              borderRadius: 0
            }, bt = [...P, nt];
            de(bt), wt(bt.length - 1);
          }
        } else if (R.type === "placed" && R.origIdx !== void 0) {
          const ae = P.map((ye, lt) => lt === R.origIdx ? {
            ...ye,
            x: Ht(ne, 0, Me - ye.width),
            y: Ht(Te, 0, Ie - ye.height)
          } : ye);
          de(ae), wt(R.origIdx);
        }
      } catch (R) {
        console.warn("Canvas drop failed:", R);
      }
  }, [en, P, de, Me, Ie]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Ge,
      className: `multicam-viewport-root canvas-grid ${xe ? "fullscreen-grid-active" : ""}`,
      children: [
        (ln || Ee) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: ln ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        ks && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${ks.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: ks.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: ks.text })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "canvas-editing-arena", children: [
          /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-wing-tool ${re ? "active" : ""}`,
                onClick: () => se((h) => !h),
                title: `Feeds & Layers Palette (${P.length}/${en.length} on canvas)`,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: P.length }),
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
                  className: `btn-wing-tool ${F ? "active" : ""}`,
                  onClick: () => {
                    X((h) => !h), ve(!1);
                  },
                  title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                  ]
                }
              ),
              F && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Xe === "auto-grid" ? "active" : ""}`,
                    onClick: () => {
                      it("auto-grid"), fs("auto-grid"), X(!1);
                    },
                    children: [
                      /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                      /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: en.length })
                    ]
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Xe === "1x1" ? "active" : ""}`,
                    onClick: () => {
                      it("1x1"), fs("1x1"), X(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Xe === "1x2" ? "active" : ""}`,
                    onClick: () => {
                      it("1x2"), fs("1x2"), X(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Xe === "2x2" ? "active" : ""}`,
                    onClick: () => {
                      it("2x2"), fs("2x2"), X(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Xe === "1+3-pip" ? "active" : ""}`,
                    onClick: () => {
                      it("1+3-pip"), fs("1+3-pip"), X(!1);
                    },
                    children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Xe === "hero-stacked" ? "active" : ""}`,
                    onClick: () => {
                      it("hero-stacked"), fs("hero-stacked"), X(!1);
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
                    ve((h) => !h), X(!1);
                  },
                  title: `Aspect Ratio: ${Ut} (Click to change)`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Ut })
                  ]
                }
              ),
              fe && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                ms.map((h) => /* @__PURE__ */ s.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `popout-item ${Ut === h.id ? "active" : ""}`,
                    onClick: () => {
                      Fe(h.id), ve(!1);
                    },
                    children: [
                      /* @__PURE__ */ s.jsx("span", { children: h.label }),
                      /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                        h.w,
                        "×",
                        h.h
                      ] })
                    ]
                  },
                  h.id
                ))
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-wing-tool ${Xn ? "highlight-emerald" : "highlight-cyan"}`,
                onClick: $r,
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
                className: `btn-wing-tool ${Et ? "active" : ""}`,
                onClick: () => Y((h) => !h),
                title: Et ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                className: `btn-wing-tool ${He ? "active" : ""}`,
                onClick: () => at((h) => !h),
                title: He ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                onClick: Hi,
                disabled: Nt.current.length === 0,
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
                onClick: Vi,
                disabled: Pt.current.length === 0,
                title: "Redo (Ctrl+Y)",
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↻" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "REDO" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { ref: $t, className: `canvas-stage-wrapper ${Xn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "keyframe-floating-island", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "kf-island-badge", title: `Active Keyframe #${Xt + 1} of ${Yt.length} on timeline`, children: [
                "💎 KF #",
                Xt + 1,
                "/",
                Yt.length
              ] }),
              Xt > 0 && /* @__PURE__ */ s.jsxs("div", { className: "kf-island-controls", children: [
                /* @__PURE__ */ s.jsxs(
                  "select",
                  {
                    className: "select-trans-type",
                    value: L.transitionType || "smooth",
                    onChange: (h) => Ap(h.target.value),
                    title: "Transition animation into this keyframe",
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
                    value: L.transitionDurationSec ?? 0.5,
                    onChange: (h) => Rp(parseFloat(h.target.value)),
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
                  className: "btn-island-action add-kf",
                  onClick: yu,
                  title: "Add Keyframe at current playhead (K)",
                  children: "＋ KF"
                }
              ),
              Yt.length > 1 && Xt > 0 && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-island-action del-kf",
                  onClick: Tp,
                  title: "Delete active keyframe",
                  children: "🗑️"
                }
              )
            ] }),
            re && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                  /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                  /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                    P.length,
                    " on canvas"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => se(!1), children: "✕" })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Filter workstations / displays...",
                  value: le,
                  onChange: (h) => Ae(h.target.value)
                }
              ) }),
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                Us.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                    /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Us.length })
                  ] }),
                  Us.map((h, E) => {
                    const R = Be && Be.type === "placed" && Be.origIdx === h.origIdx, G = te.index === E ? te.position === "above" ? "drop-above" : "drop-below" : "";
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `feed-layer-row ${h.isSelected ? "is-selected" : ""} ${R ? "is-dragging-row" : ""} ${G}`,
                        draggable: !0,
                        onDragStart: (B) => Nu(B, h),
                        onDragOver: (B) => Lp(B, E),
                        onDragLeave: (B) => Op(B, E),
                        onDrop: (B) => Dp(B, E),
                        onDragEnd: ku,
                        onClick: () => wt(h.origIdx),
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
                          /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (B) => B.stopPropagation(), children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => hs(h.origIdx),
                                title: "Bring Forward (Layer +1)",
                                children: "⬆️"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => Qt(h.origIdx),
                                title: "Send Backward (Layer -1)",
                                children: "⬇️"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-remove-row",
                                onClick: () => qe(h.origIdx),
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
                vo.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                    /* @__PURE__ */ s.jsx("span", { className: "section-count", children: vo.length })
                  ] }),
                  vo.map((h) => {
                    const E = Be && Be.type === "unplaced" && Be.stationId === h.stationId && Be.displayId === h.displayId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `feed-layer-row unplaced ${E ? "is-dragging-row" : ""}`,
                        draggable: !0,
                        onDragStart: (R) => Nu(R, h),
                        onDragEnd: ku,
                        onClick: () => Ze(h.feed),
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
                          /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (R) => R.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-add-row",
                              onClick: () => Ze(h.feed),
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
                Us.length === 0 && vo.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => fs("auto"), children: "⊞ ADD ALL FEEDS" }),
                /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: kt, children: "🗑️ CLEAR CANVAS" })
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                ref: (h) => {
                  ft.current = h, ot.current = h;
                },
                className: `canvas-master-frame-16-9 ${Xn ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: Tt.width > 180 ? `${Tt.width}px` : "100%",
                  height: Tt.height > 100 ? `${Tt.height}px` : "auto",
                  aspectRatio: `${Me} / ${Ie}`
                },
                onMouseMove: Or,
                onMouseLeave: xo,
                onDragOver: (h) => {
                  h.preventDefault(), h.dataTransfer.dropEffect = "copy";
                },
                onDrop: Pp,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                  ce && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-ghost-preview",
                      style: {
                        position: "absolute",
                        left: `${ce.x / Me * 100}%`,
                        top: `${ce.y / Ie * 100}%`,
                        width: `${ce.width / Me * 100}%`,
                        height: `${ce.height / Ie * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: ce.label })
                      ] })
                    }
                  ),
                  He && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Me}×${Ie}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: De.isInside ? `${De.x},${De.y}` : "px" }) }),
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
                          Lr.map((h) => h.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: h.val, y1: "0", x2: h.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: h.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: h.val })
                          ] }, `rx-${h.val}`) : h.isMed ? /* @__PURE__ */ s.jsx("line", { x1: h.val, y1: "8", x2: h.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${h.val}`) : /* @__PURE__ */ s.jsx("line", { x1: h.val, y1: "13", x2: h.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${h.val}`)),
                          De.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: De.x,
                              y1: "0",
                              x2: De.x,
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
                        viewBox: `0 0 20 ${Ie}`,
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
                          Nn.map((h) => h.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: h.val, x2: "18", y2: h.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: h.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: h.val })
                          ] }, `ry-${h.val}`) : h.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: h.val, x2: "18", y2: h.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${h.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: h.val, x2: "18", y2: h.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${h.val}`)),
                          De.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: De.y,
                              x2: "20",
                              y2: De.y,
                              stroke: "#06B6D4",
                              strokeWidth: "2"
                            }
                          )
                        ]
                      }
                    ) })
                  ] }),
                  Ne.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${Ne.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  Ne.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${Ne.horizontal}%`,
                        height: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  P.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                    /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                    /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                    /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => se(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => fs("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  $p.map((h) => {
                    var Mt;
                    const E = h.originalIndex, R = Ve === E, Q = ln && Ve === E, G = Ee && Ve === E, B = (n.length > 0 ? n : t).find(
                      ($e) => {
                        var ct, rt, pr, Ws;
                        return $e.id === h.stationId || ((ct = $e.hostname) == null ? void 0 : ct.toLowerCase()) === ((rt = h.stationId) == null ? void 0 : rt.toLowerCase()) || ((pr = $e.id) == null ? void 0 : pr.toLowerCase()) === ((Ws = h.stationId) == null ? void 0 : Ws.toLowerCase());
                      }
                    ), ne = en.find(($e) => $e.stationId === h.stationId && $e.displayId === h.displayId), Te = B || {
                      id: h.stationId,
                      hostname: (ne == null ? void 0 : ne.stationHostname) || h.stationHostname || h.stationId,
                      displayName: (ne == null ? void 0 : ne.stationName) || h.label || h.stationId,
                      displays: ne ? [{ displayId: ne.displayId, width: ne.sourceWidth, height: ne.sourceHeight }] : []
                    }, ae = (Te == null ? void 0 : Te.displays) || ((Mt = Te == null ? void 0 : Te.topology) == null ? void 0 : Mt.displays) || [], ye = P.filter(
                      ($e) => $e.stationId === h.stationId || Te && ($e.stationId === Te.id || $e.stationId === Te.hostname)
                    ), lt = ae.length > 1 && ye.length >= ae.length, tt = h.borderColor || dt[E % dt.length], et = h.borderWidth !== void 0 ? h.borderWidth : 2, ue = h.rotation || 0, nt = h.shadowEffect || "deep", bt = h.borderRadius || 0, st = h.x / Me * 100, ut = h.y / Ie * 100, En = h.width / Me * 100, Bn = h.height / Ie * 100, Rt = Rg(nt, R, tt);
                    h.y < 50, h.x < 100, h.x + h.width > Me - 100;
                    const Ct = h.zIndex !== void 0 ? h.zIndex : E + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${R ? "is-selected" : ""} ${Q ? "is-dragging" : ""} ${G ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${st}%`,
                          top: `${ut}%`,
                          width: `${En}%`,
                          height: `${Bn}%`,
                          zIndex: Ct * 10 + (Q ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${et}px solid ${tt}`,
                          borderRadius: `${bt}px`,
                          boxShadow: Rt,
                          opacity: h.opacity !== void 0 ? h.opacity : 1,
                          pointerEvents: h.opacity !== void 0 && h.opacity < 0.1 ? "none" : "auto",
                          cursor: Q ? "grabbing" : "grab",
                          transition: Q || G ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: ($e) => zi($e, E),
                        onContextMenu: ($e) => o && o($e, Te),
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: ($e) => zi($e, E),
                              onDoubleClick: () => kl(E),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: h.label || `${Te.displayName || h.stationId} (${h.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(h.width),
                                  "×",
                                  Math.round(h.height),
                                  " (",
                                  gr(h.width, h.height),
                                  ") @ (",
                                  Math.round(h.x),
                                  ",",
                                  Math.round(h.y),
                                  ")",
                                  ue !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    ue,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${Ct}`, children: [
                                  "#",
                                  Ct
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
                                  transform: ue ? `rotate(${ue}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: Q ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Cg,
                                  {
                                    station: Te,
                                    isSolo: !1,
                                    currentEpochMs: U,
                                    timeMode: m,
                                    isPlaying: k,
                                    setIsPlaying: S,
                                    baseEpochMs: d,
                                    totalDurationMs: b,
                                    outPointMs: y,
                                    setPlayheadMs: p,
                                    globalGaps: f,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: w,
                                    playbackSpeed: I,
                                    activeAudioStationId: ge,
                                    onSoloAudio: oe,
                                    directorPlan: C || (Te == null ? void 0 : Te.directorPlan),
                                    isAutoDirectorEnabled: a ? a[Te.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: i,
                                    targetDisplayId: h.displayId,
                                    onSelectDisplayId: ($e) => {
                                      const ct = P.map((rt, pr) => pr === E ? { ...rt, displayId: $e } : rt);
                                      de(ct);
                                    },
                                    areAllDisplaysPlaced: lt,
                                    slotIndex: E,
                                    borderColor: tt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: ($e) => zi($e, E),
                                onDoubleClick: () => kl(E),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          R && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: ($e) => yo($e, E, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${gr(h.sourceWidth, h.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: ($e) => yo($e, E, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${gr(h.sourceWidth, h.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: ($e) => yo($e, E, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${gr(h.sourceWidth, h.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: ($e) => yo($e, E, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${gr(h.sourceWidth, h.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${h.stationId}-${h.displayId}-${E}`
                    );
                  }),
                  !ee && Ve !== null && Bs && (() => {
                    const h = Bs, E = Ve, R = h.borderColor || dt[E % dt.length], Q = h.borderWidth !== void 0 ? h.borderWidth : 2, G = h.rotation || 0, B = h.shadowEffect || "deep", ne = h.zIndex !== void 0 ? h.zIndex : E + 1, Te = h.y < 70, ae = h.x / Me * 100, ye = h.width / Me * 100, lt = ae + ye / 2;
                    let tt = `${lt}%`, et = "translateX(-50%)";
                    lt < 28 ? (tt = `${Math.max(1, ae)}%`, et = "none") : lt > 72 && (tt = `${Math.min(99, ae + ye)}%`, et = "translateX(-100%)");
                    let ue;
                    Te ? h.height < 110 ? ue = `min(calc(100% - 38px), ${(h.y + h.height + 6) / Ie * 100}%)` : ue = `min(calc(100% - 38px), ${(h.y + 28) / Ie * 100}%)` : ue = `max(4px, calc(${h.y / Ie * 100}% - 38px))`;
                    const nt = (n.length > 0 ? n : t).find(
                      (st) => {
                        var ut, En;
                        return st.id === h.stationId || ((ut = st.hostname) == null ? void 0 : ut.toLowerCase()) === ((En = h.stationId) == null ? void 0 : En.toLowerCase());
                      }
                    ), bt = nt ? nt.id : h.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `floating-feed-inspector ${Te ? "is-flipped-down" : ""}`,
                        style: {
                          position: "absolute",
                          left: tt,
                          top: ue,
                          transform: et,
                          zIndex: 99999
                        },
                        onMouseDown: (st) => st.stopPropagation(),
                        onClick: (st) => st.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen Controls: ${h.label || bt} • Layer #${ne}`, children: [
                            "🎛️ #",
                            ne
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: "btn-color-swatch-trigger",
                                onClick: () => pt((st) => !st),
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
                            vt && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Tg.map((st) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${R === st ? "is-active" : ""}`,
                                style: { backgroundColor: st === "transparent" ? "#1E293B" : st },
                                onClick: () => {
                                  on({ borderColor: st }), pt(!1);
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
                                value: Q,
                                onChange: (st) => on({ borderWidth: Number(st.target.value) }),
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
                                onChange: (st) => on({ shadowEffect: st.target.value }),
                                title: "Drop Shadow & Glow: Add visual depth or tactical glow to this window",
                                children: Ag.map((st) => /* @__PURE__ */ s.jsx("option", { value: st.id, children: st.label }, st.id))
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
                                  const ut = st.target.value;
                                  ut === "front" ? At(E) : ut === "back" ? sn(E) : ut === "up" ? hs(E) : ut === "down" && Qt(E);
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
                                onClick: () => js(90),
                                title: "Rotate: Step 90 degrees clockwise (↺)",
                                children: "↺ 90°"
                              }
                            ),
                            /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-action-tool ${Lt ? "active" : ""}`,
                                onClick: () => jt((st) => !st),
                                title: `Fine Rotation: Click to toggle angle slider (Current: ${G}°)`,
                                children: [
                                  "📐 ",
                                  G,
                                  "°"
                                ]
                              }
                            ),
                            Lt && /* @__PURE__ */ s.jsx(
                              "input",
                              {
                                type: "range",
                                min: "-180",
                                max: "180",
                                value: G,
                                onChange: (st) => on({ rotation: Number(st.target.value) }),
                                className: "rotation-slider",
                                title: `Adjust tilt angle: ${G}°`
                              }
                            )
                          ] }),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool highlight",
                              onClick: () => Mp(E),
                              title: `Native Recorded Aspect Ratio: Snap window to its exact recorded aspect (${gr(h.sourceWidth, h.sourceHeight)}) to remove any distortion`,
                              children: [
                                "📐 NATIVE (",
                                gr(h.sourceWidth, h.sourceHeight),
                                ")"
                              ]
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool highlight",
                              onClick: () => kl(E),
                              title: "1x1 Focus Viewport: Maximize this window to fill 100% of the canvas frame (Double-clicking the card also maximizes)",
                              children: "⊞ 1x1 FOCUS"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool",
                              onClick: () => l && l(bt, h.displayId),
                              title: "Deep Forensic Spotlight: Open multi-angle synchronized forensic viewer for this workstation",
                              children: "🔍 SPOTLIGHT"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-action-tool btn-del-feed",
                              onClick: () => qe(E),
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
                onClick: () => q(!0),
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
                  className: `btn-wing-tool ${Ce ? "active" : ""}`,
                  onClick: () => Ue((h) => !h),
                  title: `Saved Presets Library (${be.length})`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: be.length }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                  ]
                }
              ),
              Ce && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Ue(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: be.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : be.map((h) => {
                  var E;
                  return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                    Cp(h), Ue(!1);
                  }, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: h.name }),
                      /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                        ((E = h.placements) == null ? void 0 : E.length) || 0,
                        " screens • ",
                        h.dateStr
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-del-preset",
                        onClick: (R) => Ep(h.id, R),
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
                onClick: Sp,
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
                  return (h = pe.current) == null ? void 0 : h.click();
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
                ref: pe,
                type: "file",
                accept: ".json",
                style: { display: "none" },
                onChange: bp
              }
            ),
            /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-wing-tool highlight-rose",
                onClick: () => {
                  Ke.current = !1, it("auto-grid");
                  const h = Br(en, Me, Ie), E = {
                    id: "canvas-timeline-root",
                    keyframes: [
                      {
                        id: "kf_root_0",
                        timestampEpochMs: d,
                        transitionDurationSec: 0.5,
                        transitionType: "smooth",
                        layout: {
                          width: Me,
                          height: Ie,
                          backgroundColor: "#070A10",
                          fps: 30,
                          placements: h
                        }
                      }
                    ]
                  };
                  tn(E), T && T(E), wt(0);
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
                onClick: kt,
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
                className: `btn-wing-tool ${xe ? "active" : ""}`,
                onClick: Ip,
                title: "Fullscreen Canvas Grid (F)",
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: xe ? "⤓" : "⛶" }),
                  /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: xe ? "EXIT" : "FULL" })
                ]
              }
            )
          ] })
        ] }),
        " ",
        J && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => q(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (h) => h.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => q(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: Le,
                onChange: (h) => je(h.target.value),
                autoFocus: !0,
                onKeyDown: (h) => {
                  h.key === "Enter" && Dr();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              P.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => q(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Dr, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const ka = [0.5, 1, 1.25, 1.5, 2, 4];
function pp({
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
  onStepFrameBackward: g,
  playbackSpeed: m = 1,
  onChangeSpeed: k,
  onSetInPoint: S,
  onSetOutPoint: b
}) {
  const [O, y] = u.useState(() => al()), { volume: p, isMuted: f } = O, w = !!e;
  u.useEffect(() => {
    const V = (A) => {
      A.detail && y(A.detail);
    };
    return window.addEventListener("itb-audio-state-changed", V), () => window.removeEventListener("itb-audio-state-changed", V);
  }, []);
  const I = u.useCallback((V, A, T) => {
    const _ = {
      volume: typeof V == "number" ? V : p,
      isMuted: typeof A == "boolean" ? A : f,
      channelMode: T || O.channelMode || "both"
    };
    y(_), vg(_);
  }, [p, f, O.channelMode]), j = (V) => {
    V == null || V.stopPropagation(), w && n(!t);
  }, N = (V) => {
    if (V == null || V.stopPropagation(), !w || !k) return;
    const A = ka.indexOf(m), T = A === -1 ? 1 : (A + 1) % ka.length;
    k(ka[T]);
  }, x = (V) => {
    V == null || V.stopPropagation(), f ? I(p === 0 ? 0.5 : p, !1) : I(p, !0);
  }, C = (V) => {
    V.stopPropagation();
    const A = parseFloat(V.target.value);
    A === 0 ? I(0, !0) : I(A, !1);
  }, M = (V) => {
    const A = u.useRef(null), T = u.useRef(null), _ = u.useRef(0), z = u.useCallback(() => {
      A.current && clearTimeout(A.current), T.current && clearInterval(T.current), A.current = null, T.current = null;
    }, []), ee = u.useCallback((ge = 1) => {
      if (n && n(!1), i) {
        const oe = 33 * ge;
        i((re) => {
          const se = V === "forward" ? re + oe : re - oe;
          return Math.max(0, Math.min(d, se));
        });
      } else V === "forward" && v ? v() : V === "backward" && g && g();
    }, [V]), U = u.useCallback((ge) => {
      ge.preventDefault(), ge.stopPropagation(), w && (z(), ee(1), _.current = performance.now(), A.current = setTimeout(() => {
        T.current = setInterval(() => {
          const oe = performance.now() - _.current, re = oe > 2500 ? 4 : oe > 1e3 ? 2 : 1;
          ee(re);
        }, 50);
      }, 280));
    }, [ee, z]);
    return u.useEffect(() => z, [z]), {
      onMouseDown: U,
      onMouseUp: z,
      onMouseLeave: z,
      onTouchStart: U,
      onTouchEnd: z
    };
  }, D = M("backward"), K = M("forward"), $ = (V) => {
    V.stopPropagation(), w && (n && n(!1), i && i(a));
  }, W = (V) => {
    V.stopPropagation(), w && (n && n(!1), i && i(c));
  }, Z = () => f || p === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${w ? "is-expanded" : "is-compact-disabled"}`,
      title: w ? "" : "Select a station card above to enable timeline playback",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !w,
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
            disabled: !S,
            onClick: (V) => {
              V.stopPropagation(), S == null || S();
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
              onClick: (V) => {
                V.stopPropagation(), l && l(!r);
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
              disabled: !w,
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
              disabled: !w,
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
              disabled: !w,
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
              disabled: !w,
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
            onClick: (V) => {
              V.stopPropagation(), b == null || b();
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
              className: `btn-audio-mute ${f || p === 0 ? "is-muted" : ""}`,
              onClick: x,
              title: f ? "Unmute" : `Mute (${Math.round(p * 100)}%)`,
              children: Z()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: f ? 0 : p,
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
                const V = ["both", "mic", "sys", "stereo"], A = O.channelMode || "both", T = V[(V.indexOf(A) + 1) % V.length];
                I(p, f, T);
              },
              title: `Discrete Audio Channel: ${(O.channelMode || "both").toUpperCase()} (Click to cycle Both / Mic / System / Stereo)`,
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
              children: (O.channelMode || "both") === "mic" ? "🎤 MIC" : (O.channelMode || "both") === "sys" ? "🔊 SYS" : (O.channelMode || "both") === "stereo" ? "⮂ STEREO" : "🎧 BOTH"
            }
          )
        ] })
      ]
    }
  );
}
const Zo = 2500, Lg = {
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
function mp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(Og), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function gp(e, t = " + ") {
  return mp(e).join(t);
}
function Al(e) {
  return gp(e, "+");
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
  const [d, v] = u.useState([]), [g, m] = u.useState(!1), k = t || e;
  u.useEffect(() => {
    if (n && Array.isArray(n) && n.length > 0)
      return;
    if (!k || !r || i <= 0) {
      v([]);
      return;
    }
    const f = new AbortController(), w = Math.max(0, r + o - Zo), I = r + o + i + Zo;
    m(!0);
    const j = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(k)}&startEpoch=${w}&endEpoch=${I}`;
    return fetch(j, { signal: f.signal }).then((N) => N.ok ? N.json() : []).then((N) => {
      v(Array.isArray(N) ? N : []), m(!1);
    }).catch((N) => {
      N.name !== "AbortError" && (v([]), m(!1));
    }), () => f.abort();
  }, [k, r, o, i, n]);
  const S = n && Array.isArray(n) && n.length > 0 ? n : d, b = u.useMemo(() => {
    if (!S.length || i <= 0 || a <= 0)
      return [];
    const f = r + o, w = f + i, I = [...S].sort((C, M) => C.epochMs - M.epochMs), j = [];
    let N = null, x = -999;
    for (const C of I) {
      const M = C.epochMs + Zo;
      if (M < f || M > w)
        continue;
      const D = M - r, K = (D - o) / i * a;
      if (N && K - x < Dg)
        N.events.push(C), N.endOffsetMs = D, N.endEpochMs = M, x = K;
      else {
        const $ = (D - o) / i * 100;
        N = {
          id: `kc_${C.epochMs}_${j.length}`,
          startOffsetMs: D,
          endOffsetMs: D,
          startEpochMs: M,
          endEpochMs: M,
          pct: $,
          events: [C]
        }, j.push(N), x = K;
      }
    }
    return j;
  }, [S, r, o, i, a]);
  function O(f) {
    if (!f.events.length) return "";
    if (f.events.length === 1)
      return Al(f.events[0].keyCombination);
    const w = f.events.find((N) => N.keyCombination.includes("+"));
    if (w) {
      const N = Al(w.keyCombination);
      return f.events.length > 1 ? `${N} (+${f.events.length - 1})` : N;
    }
    const I = Al(f.events[0].keyCombination);
    return f.events.every((N) => Al(N.keyCombination) === I) ? `${I} ×${f.events.length}` : `${I} (+${f.events.length - 1})`;
  }
  function y(f, w = "LOCAL") {
    return gt(f, w);
  }
  function p(f) {
    const w = [];
    for (const I of f) {
      const j = Al(I.keyCombination);
      w.length && w[w.length - 1].key === j ? w[w.length - 1].count++ : w.push({ key: j, count: 1 });
    }
    return w;
  }
  return b.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: b.map((f) => {
    const w = f.events.length, I = w > 1, j = O(f), N = y(f.startEpochMs, l), x = p(f.events), C = f.pct < 10 ? "edge-left" : f.pct > 90 ? "edge-right" : "";
    return /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${I ? "is-cluster" : "is-single"}`,
        style: { left: `${f.pct}%` },
        onClick: (M) => {
          M.stopPropagation(), c && c(f.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${j} at ${N}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            I && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: w > 9 ? "9+" : w })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${C}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: I ? `KEYSTROKE BURST (${w})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: N })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
              x.slice(0, 8).map((M, D) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                M.key,
                M.count > 1 ? ` ×${M.count}` : ""
              ] }, D)),
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
      f.id
    );
  }) }) : null;
}
const _g = u.memo(Pg), wa = [
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
  movieBoundaries: g = null,
  stationHostname: m = "",
  activeStationName: k = "",
  showKeystrokes: S = !0,
  keystrokes: b = []
}) {
  const O = u.useRef(null), [y, p] = u.useState(1e3);
  u.useEffect(() => {
    if (!O.current) return;
    const U = new ResizeObserver((ge) => {
      for (let oe of ge)
        oe.contentRect.width > 50 && p(oe.contentRect.width);
    });
    return U.observe(O.current), () => U.disconnect();
  }, []);
  const f = u.useCallback((U) => !r || r <= 0 ? "0%" : `${(U - n) / r * 100}%`, [r, n]), w = u.useCallback((U) => {
    const oe = (U - n) / r * 100;
    return oe >= -5 && oe <= 105;
  }, [n, r]), I = (U) => {
    if (!O.current) return;
    const ge = O.current.getBoundingClientRect(), oe = Math.max(0, Math.min(U.clientX - ge.left, ge.width)), re = Math.round(n + oe / ge.width * r);
    i && i(re);
  }, j = () => {
    i && i(null);
  }, N = (U) => {
    if (!O.current || !a) return;
    const ge = O.current.getBoundingClientRect(), oe = Math.max(0, Math.min(U.clientX - ge.left, ge.width)), re = Math.round(n + oe / ge.width * r);
    a(Math.max(0, Math.min(l, re)));
  }, x = u.useMemo(() => {
    const U = Math.max(3, Math.floor(y / 95)), ge = r / U;
    for (let oe of wa)
      if (oe >= ge) return oe;
    return wa[wa.length - 1];
  }, [r, y]), C = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const U = e + n, ge = U + r, oe = t === "LOCAL" ? As(U).offsetMin * 60 * 1e3 : 0, re = U + oe, se = Math.ceil(re / x) * x, Be = [];
    for (let H = se; H <= ge + oe; H += x) {
      const te = H - oe, ie = (te - U) / r * 100;
      ie >= 0 && ie <= 100 && Be.push({
        epoch: te,
        pct: ie,
        label: gt(te, t, {
          includeSeconds: x < 6e4
        })
      });
    }
    return Be;
  }, [e, n, r, x, t]), M = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const U = e + n, ge = U + r;
    return cp(U, ge).map((oe) => ({
      ...oe,
      pct: (oe.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), D = u.useMemo(() => {
    if (!r || !e) return [];
    const U = e + n, ge = U + r, oe = t === "UTC", re = [], se = oe ? 0 : As(U).offsetMin * 60 * 1e3, Be = U + se, H = ge + se, te = new Date(Be);
    for (te.setUTCHours(0, 0, 0, 0), te.getTime() < Be && te.setUTCDate(te.getUTCDate() + 1); te.getTime() <= H; ) {
      const J = te.getTime() - se, q = (J - U) / r * 100, Ce = String(te.getUTCDate()).padStart(2, "0"), Ue = Fg[te.getUTCMonth()], F = `${Ce} ${Ue}`;
      re.push({ epoch: J, pct: q, dateLabel: F }), te.setUTCDate(te.getUTCDate() + 1);
    }
    return re;
  }, [e, n, r, t]), {
    globalFirstMs: K = v,
    globalLastMs: $ = null,
    currentFirstMs: W = null,
    currentLastMs: Z = null
  } = g || { globalFirstMs: v }, V = K !== null && W !== null && Math.abs(K - W) < 1e3, A = $ !== null && Z !== null && Math.abs($ - Z) < 1e3, T = u.useMemo(() => {
    const U = [];
    return V ? w(K) && U.push({
      id: "first-combined",
      ms: K,
      pct: f(K),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${gt(e + K, t)} (Click to jump)`
    }) : (w(K) && U.push({
      id: "first-global",
      ms: K,
      pct: f(K),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${gt(e + K, t)} (Click to jump)`
    }), w(W) && U.push({
      id: "first-current",
      ms: W,
      pct: f(W),
      className: "ruler-media-pin current-first",
      badge: k ? `FIRST (${k})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${gt(e + W, t)} (Click to jump)`
    })), A ? w($) && U.push({
      id: "last-combined",
      ms: $,
      pct: f($),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${gt(e + $, t)} (Click to jump)`
    }) : (w(Z) && U.push({
      id: "last-current",
      ms: Z,
      pct: f(Z),
      className: "ruler-media-pin current-last",
      badge: k ? `LAST (${k})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${gt(e + Z, t)} (Click to jump)`
    }), w($) && U.push({
      id: "last-global",
      ms: $,
      pct: f($),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${gt(e + $, t)} (Click to jump)`
    })), U;
  }, [
    K,
    $,
    W,
    Z,
    V,
    A,
    e,
    t,
    k,
    w,
    f
  ]), _ = u.useMemo(() => {
    const U = [];
    return typeof c == "number" && w(c) && U.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: f(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${gt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && w(d) && U.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: f(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${gt(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), U;
  }, [c, d, e, t, w, f]), z = o !== null ? f(o) : null, ee = z !== null && z >= 0 && z <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: O,
      className: "timeline-ruler-root",
      onMouseMove: I,
      onMouseLeave: j,
      onClick: N,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          C.map((U) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${U.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: U.label })
          ] }, U.epoch)),
          S && /* @__PURE__ */ s.jsx(
            _g,
            {
              stationHostname: m,
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
          M.map((U) => /* @__PURE__ */ s.jsxs(
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
          D.map((U) => /* @__PURE__ */ s.jsxs(
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
          T.map((U) => /* @__PURE__ */ s.jsxs(
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
          _.map((U) => /* @__PURE__ */ s.jsxs(
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
        ee && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${z}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: gt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Ln = (e) => String(e).padStart(2, "0");
function Ug({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: i
}) {
  const [a, c] = u.useState(!1), [d, v] = u.useState(!1), [g, m] = u.useState(""), [k, S] = u.useState(""), b = u.useCallback((C) => {
    if (!C || isNaN(C) || C <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const $ = new Date(C);
      return {
        timeStr: `${Ln($.getUTCHours())}:${Ln($.getUTCMinutes())}:${Ln($.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: M, label: D } = As(C), K = new Date(C + M * 60 * 1e3);
    return {
      timeStr: `${Ln(K.getUTCHours())}:${Ln(K.getUTCMinutes())}:${Ln(K.getUTCSeconds())}`,
      zoneLabel: D
    };
  }, [t]), O = u.useCallback((C) => {
    if (!C || C < 0) return "00:00:00";
    const M = Math.floor(C / 1e3), D = Math.floor(M / 3600), K = Math.floor(M % 3600 / 60), $ = M % 60;
    return `${Ln(D)}:${Ln(K)}:${Ln($)}`;
  }, []), y = u.useMemo(() => b(e + r), [b, e, r]), p = u.useMemo(() => b(e + o), [b, e, o]), f = u.useMemo(() => O(Math.max(0, o - r)), [O, r, o]), w = u.useCallback((C, M) => {
    if (!C || !C.trim()) return M;
    const K = C.trim().split(" ")[0].split(":").map(Number);
    if (K.length < 2 || K.some(isNaN)) return M;
    const [$, W, Z = 0] = K;
    if (t === "UTC") {
      const se = new Date(e);
      se.setUTCHours($, W, Z, 0);
      let Be = se.getTime();
      for (; Be < e; ) Be += 864e5;
      for (; Be > e + n + 1e3; ) Be -= 864e5;
      const H = Be - e;
      return isNaN(H) ? M : Math.max(0, Math.min(n, H));
    }
    const { offsetMin: V } = As(e), A = new Date(e + V * 6e4), T = A.getUTCFullYear(), _ = A.getUTCMonth(), z = A.getUTCDate(), ee = `${T}-${Ln(_ + 1)}-${Ln(z)}`, U = `${Ln($)}:${Ln(W)}:${Ln(Z)}`, ge = Ci(ee, U);
    let oe;
    if (ge.isAmbiguous) {
      const se = e + M, Be = Math.abs(ge.firstOccurrenceEpoch - se), H = Math.abs(ge.secondOccurrenceEpoch - se);
      oe = Be <= H ? ge.firstOccurrenceEpoch : ge.secondOccurrenceEpoch;
    } else {
      const se = Date.UTC(T, _, z, $, W, Z), { offsetMin: Be } = As(se - V * 6e4);
      oe = se - Be * 6e4;
    }
    for (; oe < e; ) oe += 864e5;
    for (; oe > e + n + 1e3; ) oe -= 864e5;
    const re = oe - e;
    return isNaN(re) ? M : Math.max(0, Math.min(n, re));
  }, [e, t, n]), I = () => {
    m(y.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !g || !g.trim() || g.trim() === y.timeStr)
      return;
    const C = w(g.trim(), r);
    C !== null && !isNaN(C) && C < o && l(C);
  }, N = () => {
    S(p.timeStr), v(!0);
  }, x = () => {
    if (v(!1), !k || !k.trim() || k.trim() === p.timeStr)
      return;
    const C = w(k.trim(), o);
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
          value: g,
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
          onClick: I,
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
          onChange: (C) => S(C.target.value),
          onBlur: x,
          onKeyDown: (C) => {
            C.key === "Enter" && x(), C.key === "Escape" && v(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: N,
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: f })
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
  onStartDragMinimap: v
}) {
  const g = Math.max(0, Math.min(100, a / r * 100)), m = Math.max(0, Math.min(100, c / r * 100)), k = Math.max(0, m - g), S = Math.max(0, Math.min(100, l / r * 100)), b = Math.max(0, Math.min(100 - S, o / r * 100)), O = S + b, y = i > 1.05, p = 7, f = k >= 10, w = k >= 16, I = f, j = w, N = I && Math.abs(S - g) < p, x = y && b >= 12 && !N, C = j && Math.abs(O - m) < p, M = y && b >= 12 && !C;
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
            style: { left: `${g}%`, width: `${k}%` },
            children: [
              I && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: gt(t + a, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: gt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${S}%`, width: `${b}%` },
            children: [
              x && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: gt(t + l, n) }),
              M && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: gt(t + l + o, n) })
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
  showRulerKeystrokes: g = !1,
  onToggleRulerKeystrokes: m
}) {
  const k = (d || "NONE").toUpperCase().replace("-", "_"), S = () => {
    v && v(k === "NONE" || k === "OFF" ? "BURN_IN" : k === "BURN_IN" ? "CAPTION" : "NONE");
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
    v && /* @__PURE__ */ s.jsxs(
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
    m && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${g ? "active" : "inactive"}`,
        onClick: m,
        title: g ? "Hide Keystroke Ticks on Ruler" : "Show Keystroke Ticks on Ruler (Default: Off)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "3", fill: g ? "currentColor" : "none" }),
            /* @__PURE__ */ s.jsx("path", { d: "M3 12h3M18 12h3M12 3v3M12 18v3" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: g ? "RULER TICKS: ON" : "RULER TICKS: OFF" })
        ]
      }
    ),
    e !== null && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: "btn-vp-action",
        onClick: r,
        title: `Jump playhead to first media (${gt(a + e, c)})`,
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
        title: `Jump playhead to last media (${gt(a + t, c)})`,
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
const ys = /* @__PURE__ */ new Map(), Ur = /* @__PURE__ */ new Map();
let bs = [], cl = 0;
const Fd = 3, Hg = 8e3, Vg = 80;
function xp() {
  setTimeout(Kg, 0);
}
function Kg() {
  var e;
  if (!(cl >= Fd || bs.length === 0))
    for (bs = bs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); cl < Fd && bs.length > 0; ) {
      const t = bs.pop();
      !t || (e = t.signal) != null && e.aborted || (cl++, Gg(t));
    }
}
async function Gg(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: i, resolve: a, displayId: c } = e;
  let d = !1, v = null;
  const g = () => {
    d || (d = !0, v && clearTimeout(v), cl = Math.max(0, cl - 1), Ur.delete(t), xp());
  };
  v = setTimeout(() => {
    g(), a(null);
  }, Hg);
  try {
    const m = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, k = await fetch(m, { signal: i });
    if (k.ok && k.status !== 204) {
      const S = await k.blob();
      if (S && S.size > 1500) {
        const b = URL.createObjectURL(S);
        if (ys.size >= Vg) {
          const O = ys.keys().next().value, y = ys.get(O);
          y && URL.revokeObjectURL(y), ys.delete(O);
        }
        ys.set(t, b), a(b);
        return;
      }
    }
    a(null);
  } catch {
    a(null);
  } finally {
    g();
  }
}
const Bd = {
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
    if (Ur.has(i))
      return Ur.get(i);
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
        bs = bs.filter((v) => v.key !== i), Ur.delete(i), c(null);
      }, { once: !0 }), bs.push(d), xp();
    });
    return Ur.set(i, a), a;
  },
  clear() {
    ys.forEach((e) => URL.revokeObjectURL(e)), ys.clear(), Ur.clear(), bs = [], cl = 0;
  }
}, Yg = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Cs = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Pl = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
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
  isAutoDirectorEnabled: v = !1,
  showDirectorCoverage: g = !1,
  stepperSegments: m = null
}) {
  const [k, S] = u.useState({}), b = u.useRef(k);
  b.current = k;
  const O = u.useMemo(() => Yg(l), [l]), y = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: x, framesPerTile: C } = O, M = [], D = o + r, K = D + l, $ = D - x, W = K + x;
    if ([...n].sort((V, A) => Cs(V) - Cs(A)).forEach((V, A) => {
      const T = Math.round(Cs(V)), _ = Math.round(Pl(V));
      if (_ <= T) return;
      const z = Math.max(T, $), ee = Math.min(_, W);
      if (ee <= z) return;
      const U = Math.floor(z / x) * x;
      for (let ge = U; ge < ee; ge += x) {
        const oe = ge + x, re = Math.max(T, ge), se = Math.min(_, oe);
        se > re && M.push({
          key: `${e}_${t}_${re}_${se}_${C}`,
          sIdx: A,
          startEpoch: re,
          endEpoch: se,
          framesPerTile: C,
          displayId: t
        });
      }
    }), M.length > 20) {
      const V = o + r + l / 2;
      M.sort((A, T) => {
        const _ = Math.abs((A.startEpoch + A.endEpoch) / 2 - V), z = Math.abs((T.startEpoch + T.endEpoch) / 2 - V);
        return _ - z;
      }), M.length = 20, M.sort((A, T) => A.startEpoch - T.startEpoch);
    }
    return M;
  }, [n, o, e, t, r, l, O]);
  u.useEffect(() => {
    if (y.length === 0) return;
    let x = !0;
    const C = new AbortController(), M = [], D = {};
    let K = !1;
    y.forEach((T) => {
      const _ = Bd.get(e, T.startEpoch, T.endEpoch, T.framesPerTile, t);
      _ ? b.current[T.key] !== _ && (D[T.key] = _, K = !0) : M.push(T);
    });
    const $ = new Set(y.map((T) => T.key)), W = b.current, Z = {};
    let V = !1;
    if (Object.keys(W).forEach((T) => {
      $.has(T) ? Z[T] = W[T] : V = !0;
    }), K || V) {
      const T = { ...Z, ...D };
      b.current = T, S(T);
    }
    if (M.length === 0) return () => {
      x = !1;
    };
    const A = setTimeout(() => {
      M.forEach((T) => {
        Bd.fetchTile(e, T.startEpoch, T.endEpoch, T.framesPerTile, C.signal, t).then((_) => {
          x && _ && (b.current[T.key] = _, S((z) => ({ ...z, [T.key]: _ })));
        });
      });
    }, 150);
    return () => {
      x = !1, clearTimeout(A), C.abort();
    };
  }, [y, e, t]);
  const p = (i - r) / l * 100, f = (a - r) / l * 100, w = u.useMemo(() => {
    if (y.length === 0 || !o || l <= 0) return [];
    const x = r, C = r + l;
    return y.map((M) => {
      const D = M.startEpoch - o, K = M.endEpoch - o;
      if (K <= x || D >= C) return null;
      const $ = Math.max(x, D), W = Math.min(C, K);
      return {
        key: M.key,
        spriteUrl: k[M.key] || null,
        leftPct: ($ - x) / l * 100,
        widthPct: (W - $) / l * 100
      };
    }).filter(Boolean);
  }, [y, o, r, l, k]), I = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const x = r, C = r + l;
    return n.map((M, D) => {
      const K = Math.round(Cs(M)) - o, $ = Math.round(Pl(M)) - o;
      if ($ <= x || K >= C) return null;
      const W = Math.max(x, K), Z = Math.min(C, $);
      return {
        id: D,
        leftPct: (W - x) / l * 100,
        widthPct: (Z - W) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), j = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const x = [...n].sort((A, T) => Cs(A) - Cs(T)), C = [], M = r, D = r + l, K = o + M, $ = o + D, W = o + (i !== void 0 ? i : M), Z = o + (a !== void 0 ? a : D);
    if (x.length > 0) {
      const A = Cs(x[0]);
      A > K && C.push({ startEpoch: K, endEpoch: A });
    } else l > 0 && C.push({ startEpoch: K, endEpoch: $ });
    for (let A = 0; A < x.length - 1; A++) {
      const T = Pl(x[A]), _ = Cs(x[A + 1]);
      _ - T > 1e3 && C.push({ startEpoch: T, endEpoch: _ });
    }
    if (x.length > 0) {
      const A = Pl(x[x.length - 1]);
      A < $ && C.push({ startEpoch: A, endEpoch: $ });
    }
    const V = [];
    return c && c.length > 0 && c.forEach((A, T) => {
      const _ = Math.max(A.startEpochMs ?? A.StartEpochMs, W), z = Math.min(A.endEpochMs ?? A.EndEpochMs, Z);
      if (z > _ && z > K && _ < $) {
        const ee = Math.max(K, _), ge = (Math.min($, z) - o - (ee - o)) / l * 100;
        ge > 0 && V.push({
          id: `global-${T}`,
          type: "global",
          leftPct: (ee - o - M) / l * 100,
          widthPct: ge,
          durationSec: Math.round((z - _) / 1e3)
        });
      }
    }), C.forEach((A, T) => {
      let _ = [A];
      c && c.length > 0 && c.forEach((z) => {
        const ee = Math.max(z.startEpochMs ?? z.StartEpochMs, W), U = Math.min(z.endEpochMs ?? z.EndEpochMs, Z);
        if (U <= ee) return;
        const ge = [];
        _.forEach((oe) => {
          U <= oe.startEpoch || ee >= oe.endEpoch ? ge.push(oe) : (ee > oe.startEpoch && ge.push({ startEpoch: oe.startEpoch, endEpoch: ee }), U < oe.endEpoch && ge.push({ startEpoch: U, endEpoch: oe.endEpoch }));
        }), _ = ge;
      }), _.forEach((z, ee) => {
        if (z.endEpoch - z.startEpoch < 1e3 || z.endEpoch <= K || z.startEpoch >= $) return;
        const U = Math.max(K, z.startEpoch), oe = (Math.min($, z.endEpoch) - o - (U - o)) / l * 100;
        oe > 0 && V.push({
          id: `station-${T}-${ee}`,
          type: "station",
          leftPct: (U - o - M) / l * 100,
          widthPct: oe,
          durationSec: Math.round((z.endEpoch - z.startEpoch) / 1e3)
        });
      });
    }), V;
  }, [n, c, o, r, l, i, a]), N = u.useMemo(() => {
    if (!g || !v || !d || d.length === 0) return [];
    const x = (t || "mon-0").toLowerCase(), C = r, M = r + l;
    return d.map((D, K) => {
      const $ = (D.startEpochMs ?? D.StartEpochMs ?? 0) - o, W = (D.endEpochMs ?? D.EndEpochMs ?? 0) - o;
      if (W <= C || $ >= M) return null;
      const Z = Math.max(C, $), V = Math.min(M, W), A = (Z - C) / l * 100, T = (V - Z) / l * 100;
      if (T <= 0) return null;
      const z = (D.targetDisplayId || D.TargetDisplayId || "mon-0").toLowerCase() === x;
      return {
        id: `cov_${K}`,
        isFeatured: z,
        leftPct: A,
        widthPct: T
      };
    }).filter(Boolean);
  }, [g, v, d, t, o, r, l]);
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
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: w.map((x) => /* @__PURE__ */ s.jsx(
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
    N.map((x) => x.isFeatured ? /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${m ? "has-stepper" : ""}`, children: I.map((x) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` }
      },
      `bar_${x.id}`
    )) }),
    m && m.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: m.map((x, C) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `stepper-block display-${x.dispNum}`,
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
        title: `Auto-Director: Screen ${x.dispNum} (${x.dispLabel})`,
        children: /* @__PURE__ */ s.jsx("span", { children: x.dispNum })
      },
      `stp_${C}`
    )) }),
    p > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, p)}%` } }),
    f < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, f)}%`, right: 0 } })
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
  onDeselectStation: g,
  viewportStartMs: m = 0,
  viewportDurationMs: k = 36e5,
  inPointMs: S = 0,
  outPointMs: b = 36e5,
  baseEpochMs: O = 0,
  segments: y = [],
  recordingSegments: p = {},
  globalGaps: f = []
}) {
  const w = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", I = (e == null ? void 0 : e.id) || w, j = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", N = (e == null ? void 0 : e.hostname) || "", x = u.useMemo(() => {
    var A, T, _;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((A = e == null ? void 0 : e.displayTopology) == null ? void 0 : A.displays) || ((T = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : T.Displays) || ((_ = e == null ? void 0 : e.topology) == null ? void 0 : _.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), C = u.useMemo(() => {
    var T, _;
    const A = x.find((z) => z.isPrimary || z.IsPrimary);
    return ((A == null ? void 0 : A.displayId) || (A == null ? void 0 : A.DisplayId) || ((T = x[0]) == null ? void 0 : T.displayId) || ((_ = x[0]) == null ? void 0 : _.DisplayId) || "mon-0").toLowerCase();
  }, [x]), M = a || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), D = u.useMemo(() => (M == null ? void 0 : M.segments) || (M == null ? void 0 : M.Segments) || [], [M]), K = D && D.length > 0, $ = x.length > 1 || K, W = u.useMemo(() => {
    let A = p[I] || p[w] || y || [];
    if (!A || A.length === 0) {
      const T = (I || "").toLowerCase(), _ = (w || "").toLowerCase();
      for (const [z, ee] of Object.entries(p || {})) {
        const U = z.toLowerCase();
        if (T && U === T || _ && U === _) {
          A = ee;
          break;
        }
      }
    }
    if ((!A || A.length === 0) && (A = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !A || A.length === 0)
      for (const T of x) {
        const _ = T.segments || T.Segments || [];
        if (_.length > 0) {
          A = _;
          break;
        }
      }
    return (A || []).filter((T) => Pl(T) - Cs(T) > 0);
  }, [p, y, I, w, e, x]), Z = u.useMemo(() => {
    if (!K || k <= 0) return null;
    const A = m, T = m + k;
    return D.map((_, z) => {
      const ee = (_.startEpochMs ?? _.StartEpochMs ?? 0) - O, U = (_.endEpochMs ?? _.EndEpochMs ?? 0) - O;
      if (U <= A || ee >= T) return null;
      const ge = Math.max(A, ee), oe = Math.min(T, U), re = (ge - A) / k * 100, se = (oe - ge) / k * 100;
      if (se <= 0) return null;
      const Be = (_.targetDisplayId || _.TargetDisplayId || "mon-0").toLowerCase(), H = x.findIndex((J) => (J.displayId || J.DisplayId || "").toLowerCase() === Be);
      let te = H >= 0 ? H + 1 : null;
      if (!te) {
        const J = Be.match(/\d+/);
        te = J ? parseInt(J[0], 10) + 1 : 1;
      }
      const ie = H >= 0 ? x[H].displayName || x[H].DisplayName || `Screen ${te}` : `Screen ${te}`;
      return {
        id: z,
        dispNum: te,
        dispLabel: ie,
        leftPct: re,
        widthPct: se
      };
    }).filter(Boolean);
  }, [K, D, x, O, m, k]), V = u.useCallback((A) => {
    const T = (A || "mon-0").toLowerCase();
    return o.some((_) => _.stationId === I && (_.displayId || "mon-0").toLowerCase() === T);
  }, [o, I]);
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
        $ && l ? /* @__PURE__ */ s.jsxs(
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
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: x.map((A, T) => {
      const _ = (A.displayId || A.DisplayId || `mon-${T}`).toLowerCase(), z = A.displayNumber || A.DisplayNumber || T + 1, ee = A.displayName || A.DisplayName || `SCREEN ${z}`, U = V(_);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${ee} (${A.width || 1920}×${A.height || 1080})`, children: ee }),
              !r && i && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${U ? "is-on-canvas" : ""}`,
                  onClick: (ge) => {
                    ge.stopPropagation(), i(e.id, _);
                  },
                  title: U ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: U ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Ud,
              {
                hostname: w,
                displayId: _,
                activeSegments: W,
                viewportStartMs: m,
                viewportDurationMs: k,
                baseEpochMs: O,
                inPointMs: S,
                outPointMs: b,
                globalGaps: f,
                directorSegments: D,
                isAutoDirectorEnabled: r,
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
        d && d();
      },
      onContextMenu: (A) => {
        v && (A.preventDefault(), A.stopPropagation(), v(A, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${(Z == null ? void 0 : Z.length) > 0 ? "has-stepper" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${j}${N ? ` (${N})` : ""} • Click to select, arrow to expand`,
            children: [
              $ && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (A) => {
                    A.stopPropagation(), n == null || n();
                  },
                  title: "Expand display tracks (Screens 1 & 2)",
                  children: "▶"
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: j, children: j }),
              $ && /* @__PURE__ */ s.jsx("span", { className: "compact-multi-tag", title: "Multi-Display Station (Auto-Director Active)", children: "2x" }),
              g && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-track-deselect",
                  title: `Remove ${j} from project`,
                  onClick: (A) => {
                    A.stopPropagation(), g(e.id);
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
            hostname: w,
            displayId: C,
            activeSegments: W,
            viewportStartMs: m,
            viewportDurationMs: k,
            baseEpochMs: O,
            inPointMs: S,
            outPointMs: b,
            globalGaps: f,
            stepperSegments: Z
          }
        )
      ]
    }
  );
}
const Wd = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
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
  timeMode: g = "LOCAL",
  onUpdateAudioPlan: m = null
}) {
  const k = u.useRef(null), [S, b] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [O, y] = u.useState(!1), [p, f] = u.useState(null), [w, I] = u.useState(1), [j, N] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const H = (te) => {
      te.detail && N(te.detail);
    };
    return window.addEventListener("itb-live-audio-level", H), () => window.removeEventListener("itb-live-audio-level", H);
  }, []);
  const x = u.useCallback(() => {
    b((H) => {
      const te = !H;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(te));
      } catch {
      }
      return te;
    });
  }, []), [C, M] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      clips: e.segments.map((H, te) => {
        var ie;
        return {
          id: `clip_${te}_${H.startEpochMs || H.StartEpochMs}`,
          startEpochMs: H.startEpochMs ?? H.StartEpochMs ?? l,
          endEpochMs: H.endEpochMs ?? H.EndEpochMs ?? l + r,
          sourceStationId: H.sourceStationId ?? H.SourceStationId ?? (((ie = t[0]) == null ? void 0 : ie.id) || "station-0"),
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
  ]), D = l + o, K = l + n, $ = K + r, W = u.useCallback((H) => {
    if (!m) return;
    const te = [];
    H.forEach((ie) => {
      ie.isMuted || O || ie.clips.forEach((J) => {
        te.push({
          startEpochMs: J.startEpochMs,
          endEpochMs: J.endEpochMs,
          sourceStationId: J.sourceStationId,
          gain: J.gain * ie.gain
        });
      });
    }), te.sort((ie, J) => ie.startEpochMs - J.startEpochMs), m({ segments: te });
  }, [m, O]), Z = u.useCallback(() => {
    M((H) => {
      const ie = `A${H.length + 1}`, J = {
        id: ie,
        name: `Track ${ie}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        clips: []
      }, q = [...H, J];
      return W(q), q;
    });
  }, [W]), V = u.useCallback((H) => {
    M((te) => {
      if (te.length <= 1) return te;
      const ie = te.filter((J) => J.id !== H);
      return W(ie), ie;
    });
  }, [W]), A = u.useCallback((H) => {
    M((te) => {
      const ie = te.map((J) => J.id === H ? { ...J, isMuted: !J.isMuted } : J);
      return W(ie), ie;
    });
  }, [W]), T = u.useCallback((H) => {
    M((te) => {
      var q;
      const ie = (q = te.find((Ce) => Ce.id === H)) == null ? void 0 : q.isSolo, J = te.map((Ce) => ({
        ...Ce,
        isSolo: Ce.id === H ? !ie : !1,
        isMuted: Ce.id === H ? !1 : !ie
      }));
      return W(J), J;
    });
  }, [W]), _ = u.useCallback((H, te) => {
    const ie = Math.max(0, Math.min(2, Number(te)));
    M((J) => {
      const q = J.map((Ce) => Ce.id === H ? { ...Ce, gain: ie } : Ce);
      return W(q), q;
    }), Dd(ie);
  }, [W]), z = u.useCallback((H, te = null, ie = null) => {
    var X;
    const J = te || ((X = t[0]) == null ? void 0 : X.id) || "station-0", q = ie !== null ? ie : D, Ce = Math.min(r, 6e4), Ue = q + Ce, F = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(q),
      endEpochMs: Math.round(Ue),
      sourceStationId: J,
      gain: 1
    };
    M((fe) => {
      const ve = fe.map((Le) => Le.id === H ? {
        ...Le,
        clips: [...Le.clips, F].sort((je, le) => je.startEpochMs - le.startEpochMs)
      } : Le);
      return W(ve), ve;
    });
  }, [D, r, t, W]), ee = u.useCallback((H, te) => {
    M((ie) => {
      const J = ie.map((q) => {
        if (q.id !== H) return q;
        const Ce = [];
        return q.clips.forEach((Ue) => {
          Ue.id === te && D > Ue.startEpochMs + 500 && D < Ue.endEpochMs - 500 ? (Ce.push({ ...Ue, endEpochMs: D }), Ce.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: D,
            endEpochMs: Ue.endEpochMs,
            sourceStationId: Ue.sourceStationId,
            gain: Ue.gain
          })) : Ce.push(Ue);
        }), { ...q, clips: Ce };
      });
      return W(J), J;
    }), f(null);
  }, [D, W]), U = u.useCallback((H, te) => {
    M((ie) => {
      const J = ie.map((q) => q.id !== H ? q : { ...q, clips: q.clips.filter((Ce) => Ce.id !== te) });
      return W(J), J;
    }), f(null);
  }, [W]), ge = u.useCallback((H, te, ie) => {
    M((J) => {
      const q = J.map((Ce) => Ce.id !== H ? Ce : {
        ...Ce,
        clips: Ce.clips.map((Ue) => Ue.id === te ? { ...Ue, sourceStationId: ie } : Ue)
      });
      return W(q), q;
    }), f((J) => J ? { ...J, stationId: ie } : null);
  }, [W]), oe = u.useCallback((H, te, ie) => {
    const J = Math.max(0, Math.min(2.5, Number(ie)));
    I(J), M((q) => {
      const Ce = q.map((Ue) => Ue.id !== H ? Ue : {
        ...Ue,
        clips: Ue.clips.map((F) => F.id === te ? { ...F, gain: J } : F)
      });
      return W(Ce), Ce;
    }), Dd(J);
  }, [W]), re = u.useCallback((H, te, ie, J) => {
    H.preventDefault(), H.stopPropagation();
    const q = H.clientX, Ce = C.find((Le) => Le.id === te), Ue = Ce == null ? void 0 : Ce.clips.find((Le) => Le.id === ie);
    if (!Ue) return;
    const F = Ue.startEpochMs, X = Ue.endEpochMs, fe = (Le) => {
      var be;
      const je = Le.clientX - q, le = (be = k.current) == null ? void 0 : be.querySelector(".audio-lane-timeline");
      if (!le) return;
      const Ae = le.getBoundingClientRect(), pe = je / Ae.width * r;
      M((We) => We.map((Oe) => Oe.id !== te ? Oe : {
        ...Oe,
        clips: Oe.clips.map((xe) => {
          if (xe.id !== ie) return xe;
          if (J === "start") {
            const xt = Math.min(X - 500, F + pe);
            return { ...xe, startEpochMs: Math.round(xt) };
          } else {
            const xt = Math.max(F + 500, X + pe);
            return { ...xe, endEpochMs: Math.round(xt) };
          }
        })
      }));
    }, ve = () => {
      window.removeEventListener("mousemove", fe), window.removeEventListener("mouseup", ve), M((Le) => (W(Le), Le));
    };
    window.addEventListener("mousemove", fe), window.addEventListener("mouseup", ve);
  }, [C, r, W]), se = (H, te, ie) => {
    H.preventDefault(), H.stopPropagation();
    const J = Math.min(window.innerWidth - 260, Math.max(16, H.clientX - 40)), q = Math.min(window.innerHeight - 280, Math.max(16, H.clientY - 200));
    I(ie.gain || 1), f({
      laneId: te,
      clipId: ie.id,
      s: ie.startEpochMs,
      e: ie.endEpochMs,
      x: J,
      y: q,
      stationId: ie.sourceStationId,
      gain: ie.gain || 1
    });
  };
  u.useEffect(() => {
    if (!p) return;
    const H = () => f(null), te = (ie) => {
      ie.key === "Escape" && f(null);
    };
    return window.addEventListener("click", H), window.addEventListener("keydown", te), () => {
      window.removeEventListener("click", H), window.removeEventListener("keydown", te);
    };
  }, [p]);
  const Be = u.useMemo(() => C.reduce((H, te) => H + (te.isMuted ? 0 : te.clips.length), 0), [C]);
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
          C.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: Z,
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
            className: `btn-master-mute ${O ? "is-muted" : ""}`,
            onClick: () => y((H) => !H),
            title: O ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: O ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: C.map((H, te) => {
      const ie = Wd[te % Wd.length];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${ie}26`, borderColor: `${ie}80`, color: ie }, children: H.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: H.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${H.isMuted ? "active" : ""}`,
                onClick: () => A(H.id),
                title: H.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${H.isSolo ? "active" : ""}`,
                onClick: () => T(H.id),
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
                onChange: (J) => _(H.id, J.target.value),
                title: `Lane Gain: ${Math.round(H.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(H.gain * 100),
              "%"
            ] })
          ] }),
          C.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => V(H.id),
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
              var F;
              const q = J.currentTarget.getBoundingClientRect(), Ce = Math.max(0, Math.min(1, (J.clientX - q.left) / q.width)), Ue = Math.round(K + Ce * r);
              z(H.id, (F = t[0]) == null ? void 0 : F.id, Ue);
            },
            children: [
              H.clips.map((J) => {
                const q = J.startEpochMs, Ce = J.endEpochMs, Ue = t.find((je) => je.id === J.sourceStationId), F = Ue ? Ue.displayName || Ue.hostname || Ue.id : J.sourceStationId;
                if (Ce <= K || q >= $) return null;
                const X = Math.max(K, q), fe = Math.min($, Ce), ve = (X - K) / r * 100, Le = (fe - X) / r * 100;
                return Le <= 0 ? null : /* @__PURE__ */ s.jsxs(
                  "div",
                  {
                    className: `audio-clip-block ${H.isMuted ? "lane-muted" : ""}`,
                    style: {
                      left: `${ve}%`,
                      width: `${Le}%`,
                      borderLeftColor: ie
                    },
                    onClick: (je) => se(je, H.id, J),
                    onContextMenu: (je) => se(je, H.id, J),
                    title: `Audio Clip: ${F} [${gt(q, g, { includeSeconds: !0 })} - ${gt(Ce, g, { includeSeconds: !0 })}] • Gain: ${Math.round(J.gain * 100)}%`,
                    children: [
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-left",
                          onMouseDown: (je) => re(je, H.id, J.id, "start"),
                          title: "Drag to trim Clip In-Point"
                        }
                      ),
                      /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
                        "path",
                        {
                          d: "M0,12 L5,6 L10,18 L15,4 L20,20 L25,8 L30,16 L35,2 L40,22 L45,10 L50,14 L55,5 L60,19 L65,8 L70,16 L75,3 L80,21 L85,9 L90,15 L95,7 L100,12",
                          fill: "none",
                          stroke: ie,
                          strokeWidth: "1.2",
                          strokeOpacity: "0.85"
                        }
                      ) }) }),
                      /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: F }),
                        /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
                          Math.round(J.gain * 100),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-right",
                          onMouseDown: (je) => re(je, H.id, J.id, "end"),
                          title: "Drag to trim Clip Out-Point"
                        }
                      )
                    ]
                  },
                  J.id
                );
              }),
              H.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var J;
                    return z(H.id, (J = t[0]) == null ? void 0 : J.id, D);
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
                onClick: () => f(null),
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE STATION" }),
            /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((H) => {
              const te = H.id === p.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${te ? "is-selected" : ""}`,
                  onClick: () => ge(p.laneId, p.clipId, H.id),
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
                Math.round(w * 100),
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
                value: w,
                onChange: (H) => oe(p.laneId, p.clipId, H.target.value),
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
                onClick: () => ee(p.laneId, p.clipId),
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
function Jg({
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
  playheadMs: v = 0,
  timeMode: g = "LOCAL"
}) {
  const m = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [k, S] = u.useState(null), b = c + v, O = c + i, y = O + a, p = (w) => {
    const I = w.currentTarget.getBoundingClientRect(), j = w.clientX - I.left, N = Math.max(0, Math.min(1, j / I.width)), x = Math.round(O + N * a);
    r && r(x);
  }, f = (w, I, j) => {
    if (w.button !== 0) return;
    w.stopPropagation(), w.preventDefault();
    const N = w.clientX, x = j.timestampEpochMs, C = j.id || `kf_${I}_${x}`, M = w.currentTarget.closest(".track-surface");
    if (!M) return;
    let D = !1;
    S({
      idx: I,
      kfId: C,
      startClientX: N,
      initialEpoch: x,
      currentEpoch: x
    });
    const K = (W) => {
      const Z = W.clientX - N;
      Math.abs(Z) > 3 && (D = !0);
      const V = M.getBoundingClientRect(), A = Z / V.width * a;
      let T = Math.round(x + A);
      T = Math.max(c, Math.min(c + d, T)), S((_) => _ ? { ..._, currentEpoch: T } : null);
    }, $ = (W) => {
      window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", $), S(null);
      const Z = M.getBoundingClientRect(), A = (W.clientX - N) / Z.width * a;
      let T = Math.round(x + A);
      T = Math.max(c, Math.min(c + d, T)), D ? (o && o(C, T), n && n(I, T)) : n && n(I, x);
    };
    window.addEventListener("mousemove", K), window.addEventListener("mouseup", $);
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
          onClick: (w) => {
            w.stopPropagation(), r && r(b);
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
        onClick: p,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          m.map((w, I) => {
            const j = (k == null ? void 0 : k.idx) === I, N = j ? k.currentEpoch : w.timestampEpochMs;
            if (N < O - 5e4 || N > y + 5e4) return null;
            const x = (N - O) / a * 100;
            if (x < -2 || x > 102) return null;
            const C = I === t, M = gt(N, g, { includeSeconds: !0 }), D = `${w.transitionType || "smooth"} (${w.transitionDurationSec ?? 0.5}s)`, K = Math.max(0, (N - c) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${C ? "is-active" : ""} ${j ? "is-dragging" : ""}`,
                style: { left: `${x}%` },
                onMouseDown: ($) => f($, I, w),
                onContextMenu: ($) => {
                  $.preventDefault(), $.stopPropagation(), m.length > 1 && l && l(I);
                },
                title: `Keyframe #${I + 1} at ${M} (+${K}s) • ${D}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  j && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: M }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      K,
                      "s"
                    ] })
                  ] })
                ]
              },
              `kf-${I}`
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
  const c = (C) => !r || r <= 0 ? "0%" : `${(C - n) / r * 100}%`, d = (o - n) / r * 100, v = (i - n) / r * 100, g = (l - n) / r * 100, m = g >= -0.2 && g <= 100.2, k = Math.max(0, Math.min(100, g)), S = Math.max(0, d), b = Math.min(100, v), O = Math.max(0, b - S), y = (C) => (M) => {
    M.preventDefault(), M.stopPropagation(), typeof a == "function" && a(C, M);
  }, p = d < 1.5, f = v > 98.5, w = d <= 0.2 && d >= -0.2, I = v >= 99.8 && v <= 100.2, j = g >= -0.2 && g < 3.5, N = g > 96.5 && g <= 100.2, x = u.useMemo(() => gt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    O > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${S}%`, width: `${O}%` },
        onMouseDown: y("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${p ? "flipped" : ""} ${w ? "at-edge" : ""}`,
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
        className: `marker out-marker ${f ? "flipped" : ""} ${I ? "at-edge" : ""}`,
        style: { left: c(i) },
        onMouseDown: y("out"),
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
        style: { left: `${k}%` },
        onMouseDown: y("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${j ? "edge-left" : ""} ${N ? "edge-right" : ""}`, children: x }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const qg = Si.memo(Zg);
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
    const g = (m) => {
      m.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [e, l]), !e) return null;
  const i = 210, a = 150, c = Math.min(e.x, window.innerWidth - i - 12), d = Math.min(e.y, window.innerHeight - a - 12), v = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: d, left: c },
      onClick: (g) => g.stopPropagation(),
      onContextMenu: (g) => g.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "header-tag", children: "TIMELINE POSITION" }),
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: gt(t + e.targetMs, n) })
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
  return Ps.createPortal(v, document.body);
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
    const g = setTimeout(async () => {
      try {
        const m = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, k = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(m),
          signal: v.signal
        });
        if (k.ok) {
          const S = await k.json();
          i(S), d.current && d.current(S);
        }
      } catch (m) {
        m.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", m);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(g), v.abort();
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
  minimapRef: g
}) {
  const [m, k] = u.useState(null), [S, b] = u.useState(null), O = (y, p) => {
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
    if (!m) return;
    const y = e * 0.015, p = (w) => {
      if (m === "minimap-viewport" && (g != null && g.current)) {
        const j = g.current.getBoundingClientRect(), x = Math.max(0, Math.min(w.clientX - j.left, j.width)) / j.width * t, C = Math.max(0, Math.min(x - e / 2, t - e));
        d(C);
        return;
      }
      const I = v(w.clientX);
      if (m === "playhead") {
        let j = I;
        Math.abs(j - l) <= y ? j = l : Math.abs(j - i) <= y && (j = i), r(Math.max(0, Math.min(t, j)));
      } else if (m === "in") {
        const j = i - 1e3;
        o(Math.max(0, Math.min(I, j)));
      } else if (m === "out") {
        const j = l + 1e3;
        a(Math.min(t, Math.max(I, j)));
      } else if (m === "range" && S) {
        const j = I - v(S.startX), N = S.initialOut - S.initialIn;
        let x = S.initialIn + j, C = S.initialOut + j;
        x < 0 ? (x = 0, C = N) : C > t && (C = t, x = t - N), o(x), a(C);
      }
    }, f = () => {
      k(null), b(null);
    };
    return window.addEventListener("mousemove", p), window.addEventListener("mouseup", f), () => {
      window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", f);
    };
  }, [
    m,
    S,
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
    g
  ]), { draggingTarget: m, handleStartDrag: O };
}
const Hs = 4;
function yp({
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
  _onZoomChange: g,
  onZoomReset: m,
  playheadMs: k = 0,
  setPlayheadMs: S,
  inPointMs: b = 0,
  setInPointMs: O,
  outPointMs: y = 36e5,
  setOutPointMs: p,
  onExport: f,
  recordingSegments: w = {},
  movieBoundaries: I,
  viewportStartMs: j = 0,
  onViewportStartChange: N,
  onEstimateLoaded: x,
  onFitRange: C,
  onJumpViewportTo: M,
  keystrokeMode: D = "BURN_IN",
  onChangeKeystrokeMode: K,
  keystrokes: $ = [],
  showKeystrokes: W = !1,
  showRulerKeystrokes: Z = !1,
  onToggleRulerKeystrokes: V,
  _onSplitDirectorSegment: A,
  _onChangeDirectorSegmentDisplay: T,
  _onResetDirectorSegmentToAuto: _,
  audioRoutingPlan: z,
  onSplitAudioSegment: ee,
  onChangeAudioSegmentStation: U,
  onChangeAudioSegmentGain: ge,
  onFollowVisualFeed: oe,
  isAutoFollowAudio: re,
  canvasLayoutTimeline: se,
  activeKfIndex: Be = 0,
  onSelectKeyframe: H,
  onAddKeyframeAtEpoch: te,
  onDeleteKeyframe: ie,
  onUpdateKeyframeEpoch: J,
  onToggleDisplayOnCanvas: q,
  onUpdateAudioPlan: Ce
}) {
  var pt, ln, un;
  const [Ue, F] = u.useState(null), [X, fe] = u.useState(0), [ve, Le] = u.useState(null), [je, le] = u.useState(!0), [Ae, pe] = u.useState(null), be = u.useRef(null), We = u.useRef(null), Oe = d / Math.max(1, v), xe = Math.ceil(e.length / Hs) || 1, xt = u.useMemo(() => {
    const Ee = X * Hs;
    return e.slice(Ee, Ee + Hs);
  }, [e, X]);
  u.useEffect(() => {
    if (!t && !Ae) return;
    const Ee = Ae || t, mt = e.findIndex((Ne) => Ne.id === Ee);
    if (mt !== -1) {
      const Ne = Math.floor(mt / Hs);
      Ne !== X && fe(Ne);
    }
  }, [t, Ae, e, X]);
  const ze = ((pt = se == null ? void 0 : se.keyframes) == null ? void 0 : pt[Be]) || ((ln = se == null ? void 0 : se.keyframes) == null ? void 0 : ln[0]), Bt = u.useMemo(() => {
    var Ee;
    return ((Ee = ze == null ? void 0 : ze.layout) == null ? void 0 : Ee.placements) || [];
  }, [ze]), Ge = u.useMemo(() => e.find((Ee) => Ee.id === t) || null, [e, t]), ft = (I == null ? void 0 : I.globalFirstMs) ?? null, $t = (I == null ? void 0 : I.globalLastMs) ?? null, Tt = u.useMemo(() => (b > 500 || y < d - 500) && y - b >= 1e3, [b, y, d]), Gn = u.useMemo(() => e.map((Ee) => Ee.id).sort().join(","), [e]), { estimateData: Ve, isEstimating: wt, formatEstimateSize: Lt } = sx({
    stationIdsKey: Gn,
    inPointMs: b,
    outPointMs: y,
    baseEpochMs: a,
    onEstimateLoaded: x
  }), jt = u.useCallback((Ee) => {
    if (!be.current) return j;
    const mt = be.current.getBoundingClientRect(), Ne = mt.left + 180, we = mt.width - 180 - 58;
    if (we <= 0) return j;
    const He = Math.max(0, Math.min(Ee - Ne, we));
    return Math.round(j + He / we * Oe);
  }, [j, Oe]), { draggingTarget: zt, handleStartDrag: pn } = rx({
    viewportDurationMs: Oe,
    totalDurationMs: d,
    playheadMs: k,
    setPlayheadMs: S,
    inPointMs: b,
    setInPointMs: O,
    outPointMs: y,
    setOutPointMs: p,
    viewportStartMs: j,
    setViewportStartMs: N,
    getMsFromClientX: jt,
    minimapRef: We
  }), vt = e.length > 0 && Math.abs(y - b) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: be,
      className: "timeline-board-root",
      onContextMenu: (Ee) => {
        var Ne;
        Ee.preventDefault();
        const mt = (Ne = be.current) == null ? void 0 : Ne.getBoundingClientRect();
        !mt || Ee.clientX - mt.left < 180 || Ee.clientX > mt.right - 58 || Le({ x: Ee.clientX, y: Ee.clientY, targetMs: Math.max(0, Math.min(d, jt(Ee.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Ug,
            {
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: b,
              setInPointMs: O,
              outPointMs: y,
              setOutPointMs: p
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                Wg,
                {
                  minimapRef: We,
                  baseEpochMs: a,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: j,
                  viewportDurationMs: Oe,
                  zoomLevel: v,
                  inPointMs: b,
                  outPointMs: y,
                  playheadMs: k,
                  onStartDragMinimap: pn
                }
              ),
              /* @__PURE__ */ s.jsx(
                zg,
                {
                  earliestMediaMs: ft,
                  latestMediaMs: $t,
                  hasActiveCut: Tt,
                  onJumpToFirst: () => {
                    ft !== null && (S == null || S(ft), M == null || M(ft, "start"));
                  },
                  onJumpToLast: () => {
                    $t !== null && (S == null || S($t), M == null || M($t, "end"));
                  },
                  onContextualFit: () => {
                    Tt ? C == null || C(b, y) : ft !== null && $t !== null && $t > ft ? C == null || C(ft, $t) : m == null || m();
                  },
                  onResetZoom: m,
                  baseEpochMs: a,
                  timeMode: c,
                  keystrokeMode: D,
                  onChangeKeystrokeMode: K,
                  showRulerKeystrokes: Z,
                  onToggleRulerKeystrokes: V
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              Bg,
              {
                baseEpochMs: a,
                timeMode: c,
                viewportStartMs: j,
                viewportDurationMs: Oe,
                totalDurationMs: d,
                hoverMs: Ue,
                onHoverChange: F,
                onSeek: (Ee) => S == null ? void 0 : S(Ee),
                inPointMs: b,
                outPointMs: y,
                earliestMediaMs: ft,
                movieBoundaries: I,
                stationHostname: (Ge == null ? void 0 : Ge.hostname) || (Ge == null ? void 0 : Ge.id) || (Ge == null ? void 0 : Ge.name),
                activeStationName: (Ge == null ? void 0 : Ge.displayName) || (Ge == null ? void 0 : Ge.hostname) || (Ge == null ? void 0 : Ge.name),
                showKeystrokes: !!(Z ?? W),
                keystrokes: $
              }
            ) })
          ] })
        ] }),
        xe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: X === 0,
              onClick: () => fe((Ee) => Math.max(0, Ee - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            X * Hs + 1,
            "–",
            Math.min(e.length, (X + 1) * Hs),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: X >= xe - 1,
              onClick: () => fe((Ee) => Math.min(xe - 1, Ee + 1)),
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
              if (zt || !be.current) return;
              const mt = be.current.getBoundingClientRect();
              Ee.clientX >= mt.left + 180 && Ee.clientX <= mt.right - 58 ? F(jt(Ee.clientX)) : F(null);
            },
            onMouseLeave: () => !zt && F(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => le((Ee) => !Ee), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: je ? "▼" : "▶" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  je && xe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: X === 0,
                        onClick: (Ee) => {
                          Ee.stopPropagation(), fe((mt) => Math.max(0, mt - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      X + 1,
                      "/",
                      xe,
                      " (",
                      X * Hs + 1,
                      "–",
                      Math.min(e.length, (X + 1) * Hs),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: X >= xe - 1,
                        onClick: (Ee) => {
                          Ee.stopPropagation(), fe((mt) => Math.min(xe - 1, mt + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !je && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => le(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: "▶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "🎬 ALL VIDEO (COLLAPSED)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      e.length,
                      " STATIONS"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: ((Ve == null ? void 0 : Ve.removedGlobalGaps) || []).map((Ee, mt) => {
                      const Ne = Ee.startEpochMs - a, we = Ee.endEpochMs - a, He = (Math.max(j, Ne) - j) / Oe * 100, Et = (Math.min(j + Oe, we) - j) / Oe * 100 - He;
                      if (Et <= 0) return null;
                      const Y = Math.round((Ee.endEpochMs - Ee.startEpochMs) / 1e3);
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: "gap-full-block gap-global-skipped",
                          style: { left: `${He}%`, width: `${Et}%` },
                          title: `Shared Gap: ${Y}s skipped across all stations`,
                          children: [
                            /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
                            Et > 5 && /* @__PURE__ */ s.jsx("div", { className: "gap-badge global-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
                              "✂ SKIPPED ($",
                              Y,
                              "s)"
                            ] }) })
                          ]
                        },
                        `sum_gap_${mt}`
                      );
                    }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "data-presence-layer", children: /* @__PURE__ */ s.jsx("div", { className: "data-presence-bar", style: { left: "0%", width: "100%" } }) }),
                    b > j && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, (b - j) / Oe * 100)}%` } }),
                    y < j + Oe && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, (y - j) / Oe * 100)}%`, right: 0 } })
                  ] })
                ] }),
                je && (e.length > 0 ? xt.map((Ee) => {
                  const mt = Ee.id === t, Ne = Ae === Ee.id, we = o ? o[Ee.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Xg,
                    {
                      station: Ee,
                      isExpanded: Ne,
                      onToggleExpand: () => pe((He) => He === Ee.id ? null : Ee.id),
                      isAutoDirectorEnabled: we,
                      onToggleAutoDirector: i,
                      canvasPlacements: Bt,
                      onToggleDisplayOnCanvas: q,
                      directorPlan: Ee.directorPlan,
                      isActive: mt || !t,
                      onSelect: () => n == null ? void 0 : n(Ee.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: j,
                      viewportDurationMs: Oe,
                      inPointMs: b,
                      outPointMs: y,
                      baseEpochMs: a,
                      segments: w[Ee.id] || w[Ee.hostname] || Ee.segments || [],
                      recordingSegments: w,
                      globalGaps: (Ve == null ? void 0 : Ve.removedGlobalGaps) || []
                    },
                    Ee.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Qg,
                  {
                    audioPlan: z,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: Oe,
                    baseEpochMs: a,
                    playheadMs: k,
                    onSplitSegment: ee,
                    onChangeSegmentStation: U,
                    onChangeSegmentGain: ge,
                    onFollowVisualFeed: oe,
                    isAutoFollow: re,
                    timeMode: c,
                    onUpdateAudioPlan: Ce
                  }
                ),
                ((un = se == null ? void 0 : se.keyframes) == null ? void 0 : un.length) > 0 && /* @__PURE__ */ s.jsx(
                  Jg,
                  {
                    canvasLayoutTimeline: se,
                    activeKfIndex: Be,
                    onSelectKeyframe: H,
                    onAddKeyframeAtEpoch: te,
                    onDeleteKeyframe: ie,
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
                tx,
                {
                  isRangeValid: vt,
                  onExport: f,
                  isEstimating: wt,
                  estimateData: Ve,
                  formatEstimateSize: Lt,
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
            viewportDurationMs: Oe,
            playheadMs: k,
            inPointMs: b,
            outPointMs: y,
            onStartDrag: pn
          }
        ),
        /* @__PURE__ */ s.jsx(
          ex,
          {
            contextMenu: ve,
            baseEpochMs: a,
            timeMode: c,
            onAction: (Ee) => {
              ve && (Ee === "playhead" ? S == null || S(ve.targetMs) : Ee === "in" ? O == null || O(Math.max(0, Math.min(ve.targetMs, y - 1e3))) : Ee === "out" && (p == null || p(Math.min(d, Math.max(ve.targetMs, b + 1e3)))), Le(null));
            },
            onClose: () => Le(null)
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
  onFilterModeChange: g,
  filteredCount: m,
  selectedInTabCount: k,
  unselectedInTabCount: S,
  activeTabName: b,
  onSelectAllInScope: O,
  onClearInScope: y,
  viewMode: p = "grid",
  onViewModeChange: f,
  isDrawerMode: w = !1
}) {
  const [I, j] = u.useState(!1), N = v !== "all", x = !b || b.toLowerCase() === "all", C = x ? "Select All" : `Select ${b}`, M = x ? "Clear All" : `Clear ${b}`;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-filter-bar-root ${w ? "is-drawer-compact" : ""}`, children: [
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
      w && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${I ? "open" : ""} ${N ? "has-filter" : ""}`,
          onClick: () => j(!I),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            N && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !w && f && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${p === "grid" ? "active" : ""}`,
            onClick: () => f("grid"),
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
            onClick: () => f("table"),
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
    l.length > 1 && (w ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (D) => i(D.target.value),
          children: l.map((D) => {
            const K = D.id === "all" ? c.map((W) => W.id) : D.stationIds || [], $ = K.filter((W) => d.includes(W)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: D.id, children: [
              D.name,
              " (",
              $,
              "/",
              K.length,
              ")"
            ] }, D.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: O, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: y, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        a && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((D) => {
        const K = o === D.id, $ = D.id === "all" ? c.map((V) => V.id) : D.stationIds || [], W = $.length, Z = $.filter((V) => d.includes(V)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${K ? "active" : ""}`,
            onClick: () => i(D.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: D.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${Z > 0 ? "has-selected" : ""}`, children: [
                Z,
                "/",
                W
              ] })
            ]
          },
          D.id
        );
      }) })
    ] })),
    (!w || I) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${w ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "all" ? "active" : ""}`,
            onClick: () => g("all"),
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
            onClick: () => g("selected"),
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
            className: `filter-pill ${v === "unselected" ? "active" : ""}`,
            onClick: () => g("unselected"),
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
            onClick: () => g("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "audio" ? "active" : ""}`,
            onClick: () => g("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !w && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: O, children: [
          "+ ",
          C
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: y, children: [
          "✕ ",
          M
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
  const a = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = i === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], v = t <= 1, g = (m) => {
    if (m === n) return !0;
    const k = Math.min(n, r), S = Math.min(m, r), b = Math.ceil(r / n), O = Math.ceil(r / m);
    return k !== S || b !== O;
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((m) => {
        const k = n === m, S = !g(m);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${k ? "active" : ""} ${S ? "redundant-disabled" : ""}`,
            disabled: S,
            onClick: () => o(m),
            title: S ? `All stations already fit on screen (Total: ${r})` : `Show ${m} per page`,
            children: m
          },
          m
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
    const m = (k) => {
      a.current && !a.current.contains(k.target) && i(!1);
    };
    return o && document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [o]);
  const c = u.useMemo(() => {
    const m = new Map(t.map((k) => [k.id, k]));
    return e.map((k) => m.get(k) || { id: k, hostname: `Station ${k}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = c.slice(0, l), v = c.slice(l), g = v.length > 0;
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
        const k = m.displayName || m.hostname || m.name || m.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: k, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: k }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (S) => {
                S.stopPropagation(), n(m.id);
              },
              title: `Remove ${k}`,
              children: "✕"
            }
          )
        ] }, m.id);
      }),
      g && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-container", ref: a, children: [
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: v.map((m) => {
            const k = m.displayName || m.hostname || m.name || m.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: k, children: k }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(m.id),
                  title: `Remove ${k}`,
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
const vp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function zd(e, t, n = vp) {
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
function fx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = vp) {
  const { baseEpochMs: l, durationMs: o } = n, i = !!(e != null && e.hasAudio), a = (e == null ? void 0 : e.audioChannels) || (i ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? hx(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const N = zd(0, !0, r);
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
      trafficStatus: N,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const g = l, m = l + o, k = [];
  for (const N of t) {
    const x = Math.max(N.startEpoch, g), C = Math.min(N.endEpoch, m);
    C > x && k.push({ startEpoch: x, endEpoch: C });
  }
  k.sort((N, x) => N.startEpoch - x.endEpoch);
  const S = [];
  for (const N of k)
    if (S.length === 0)
      S.push({ ...N });
    else {
      const x = S[S.length - 1];
      N.startEpoch <= x.endEpoch + 1e3 ? x.endEpoch = Math.max(x.endEpoch, N.endEpoch) : S.push({ ...N });
    }
  let b = 0;
  for (const N of S)
    b += N.endEpoch - N.startEpoch;
  const O = o > 0 ? b / o * 100 : 0, y = O > 0 && O < 1 ? Number(O.toFixed(1)) : Math.min(100, Math.round(O)), p = [];
  let f = g, w = 0;
  for (const N of S) {
    if (N.startEpoch > f + 2e3) {
      const M = (N.startEpoch - f) / o * 100, D = (f - g) / o * 100;
      p.push({
        type: "gap",
        startPct: Math.max(0, D),
        widthPct: Math.min(100, M)
      }), w++;
    }
    const x = (N.endEpoch - N.startEpoch) / o * 100, C = (N.startEpoch - g) / o * 100;
    p.push({
      type: "rec",
      startPct: Math.max(0, C),
      widthPct: Math.min(100, x)
    }), f = N.endEpoch;
  }
  if (f < m - 2e3) {
    const N = (m - f) / o * 100, x = (f - g) / o * 100;
    p.push({
      type: "gap",
      startPct: Math.max(0, x),
      widthPct: Math.min(100, N)
    }), w++;
  }
  const I = w > 0 || y < 100, j = zd(y, I, r);
  return {
    coveragePct: y,
    recordedDuration: dx(b),
    totalRecordedMs: b,
    hasAudio: i,
    audioChannels: a,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: I,
    gapsCount: w,
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
  onOpenRangeModal: g,
  systemTabs: m = px,
  recordingSegments: k = {},
  baseEpochMs: S = 0,
  durationMs: b = 0
}) {
  const [O, y] = u.useState([]), [p, f] = u.useState("all"), [w, I] = u.useState(""), [j, N] = u.useState(!0), [x, C] = u.useState("all"), [M, D] = u.useState(null), [K, $] = u.useState(!1), [W, Z] = u.useState(15), [V, A] = u.useState(8), [T, _] = u.useState(1), z = u.useRef(!1), ee = u.useRef(null), U = c && r.length === 0, ge = r.length === 0 && !c;
  let oe = "is-closed";
  a || ge || U ? oe = "is-full-width" : e && (oe = "is-open"), u.useLayoutEffect(() => {
    const le = () => {
      if (!ee.current) return;
      const pe = ee.current.clientHeight;
      if (pe <= 0) return;
      const be = ee.current.querySelector(".station-row, .hub-table-row"), We = be ? be.offsetHeight : 40;
      if (We > 0) {
        const xe = Math.floor(pe / We) - 2, ze = [5, 10, 15, 20, 25, 30].filter((Bt) => Bt <= xe).pop() || 5;
        Z(ze);
      }
      const Oe = ee.current.clientWidth;
      if (Oe > 0) {
        const ze = Math.max(1, Math.floor((Oe + 12) / 252)), Ge = Math.max(1, Math.floor((pe + 12) / (175 + 12))), ft = Math.max(ze * Ge, ze);
        A(ft);
      }
    };
    le(), window.addEventListener("resize", le);
    const Ae = new ResizeObserver(le);
    return ee.current && Ae.observe(ee.current), () => {
      window.removeEventListener("resize", le), Ae.disconnect();
    };
  }, [M, r.length]), u.useEffect(() => {
    if (m && m.length > 0) {
      y(m);
      return;
    }
    if (z.current || !e && !a) return;
    z.current = !0;
    let le = !0;
    return (async () => {
      $(!0);
      try {
        const pe = await fetch("/api/v1/dashboard/tabs");
        if (pe.ok && le) {
          const be = await pe.json();
          Array.isArray(be) && y(be);
        }
      } catch (pe) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", pe);
      } finally {
        le && $(!1);
      }
    })(), () => {
      le = !1;
    };
  }, [e, a, m]);
  const re = u.useMemo(() => {
    const le = O.length > 0 ? O : m;
    if (le && le.length > 0) {
      const Ae = le.map((pe) => {
        const be = pe.hostnames || pe.assignedHostnames || pe.stations || pe.stationIds || [], We = r.filter((Oe) => {
          const xe = (Oe.hostname || Oe.name || "").trim().toLowerCase();
          return be.some((xt) => typeof xt == "string" ? xt.trim().toLowerCase() === xe || xe.includes(xt.trim().toLowerCase()) : (xt.hostname || xt.name || "").trim().toLowerCase() === xe);
        }).map((Oe) => Oe.id);
        return {
          id: String(pe.id || pe.tabId || pe.name),
          name: pe.name || "Tab",
          stationIds: We
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((pe) => pe.id) },
        ...Ae.filter((pe) => pe.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((Ae) => Ae.id) }];
  }, [O, m, r]), se = u.useMemo(() => re.find((le) => le.id === p) || re[0], [re, p]), Be = u.useMemo(() => !se || se.id === "all" ? r.map((le) => le.id) : se.stationIds || [], [se, r]), H = u.useMemo(() => !k || Object.keys(k).length === 0 ? r.filter((le) => le.isLoaded || le.segments && le.segments.length > 0).length : r.filter((le) => k[le.id] !== void 0 || le.isLoaded).length, [r, k]), te = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && H < r.length && Object.keys(k).length > 0), [d, c, r.length, H, k]), ie = u.useMemo(() => {
    const le = /* @__PURE__ */ new Map(), Ae = { baseEpochMs: S, durationMs: b };
    for (const pe of r) {
      const We = !(k && k[pe.id] !== void 0 || pe.isLoaded === !0 || pe.segments && pe.segments.length > 0) && (te || c || d), Oe = k && k[pe.id] || pe.segments || [], xe = fx(pe, Oe, Ae);
      le.set(pe.id, {
        ...xe,
        hasAudio: pe.hasAudio !== void 0 ? pe.hasAudio : xe == null ? void 0 : xe.hasAudio,
        audioLabel: pe.audioLabel || (pe.hasAudio ? "AAC" : (xe == null ? void 0 : xe.audioLabel) || "NONE"),
        audioChannels: pe.audioChannels ? pe.audioChannels === 1 ? "Mono" : "Stereo" : xe == null ? void 0 : xe.audioChannels,
        feedSpec: pe.feedSpec || (xe == null ? void 0 : xe.feedSpec) || `${pe.resolution || "1080p"} • ${pe.fps || 30}fps`,
        resolution: pe.resolution || (xe == null ? void 0 : xe.resolution) || "1080p",
        fps: pe.fps || (xe == null ? void 0 : xe.fps) || 30,
        isLoading: We
      });
    }
    return le;
  }, [r, k, S, b, te, c, d]), J = u.useMemo(() => r.filter((le) => {
    const Ae = ie.get(le.id), pe = k && k[le.id] && k[le.id].length > 0 || le.segments && le.segments.length > 0, be = Ae && (Ae.coveragePct > 0 || Ae.totalRecordedMs > 0), We = typeof le.recordingsCount == "number" && le.recordingsCount > 0;
    return Ae && !Ae.isLoading ? be || pe : We || pe;
  }), [r, ie, k]), q = u.useMemo(() => J.filter((le) => {
    if (se.id !== "all" && !Be.includes(le.id) || !(le.displayName || le.hostname || le.name || "").toLowerCase().includes(w.toLowerCase())) return !1;
    const pe = l.includes(le.id), be = ie.get(le.id);
    return x === "selected" ? pe : x === "unselected" ? !pe : x === "gaps" ? be == null ? void 0 : be.hasGaps : x === "audio" ? be == null ? void 0 : be.hasAudio : !0;
  }).sort((le, Ae) => j ? (le.displayName || le.hostname || "").localeCompare(Ae.displayName || Ae.hostname || "") : 0), [J, se, Be, w, x, l, j, ie]), Ce = u.useMemo(() => M !== null ? M : q.length > mx ? "table" : "grid", [M, q.length]), Ue = Ce === "table" ? W : V, F = Math.max(1, Math.ceil(q.length / Ue));
  u.useEffect(() => {
    _(1);
  }, [p, w, x, Ce]), u.useEffect(() => {
    T > F && _(F);
  }, [F, T]);
  const X = u.useMemo(() => {
    if (oe !== "is-full-width") return q;
    const le = (T - 1) * Ue;
    return q.slice(le, le + Ue);
  }, [q, T, Ue, oe]), fe = () => {
    if (!i) return;
    const le = se.id === "all" ? q.map((Ae) => Ae.id) : Be;
    i(Array.from(/* @__PURE__ */ new Set([...l, ...le])));
  }, ve = () => {
    if (!i) return;
    const le = new Set(
      se.id === "all" ? q.map((Ae) => Ae.id) : Be
    );
    i(l.filter((Ae) => !le.has(Ae)));
  }, Le = Be.filter((le) => l.includes(le)).length, je = q.filter((le) => l.includes(le.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${oe}`, children: [
    oe !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => oe === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            te && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              H,
              "/",
              r.length
            ] })
          ] })
        ] }),
        oe === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      oe === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: fe,
            disabled: q.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                q.length,
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
            onClick: ve,
            disabled: je === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                je,
                ")"
              ] })
            ]
          }
        )
      ] }),
      te && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? H / r.length * 100 : 0}%` }
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
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: g, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: oe === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      oe === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      oe === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${te ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: te ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: te ? `ANALYZING TIMELINE ARCHIVES • ${H} OF ${J.length} STATIONS SYNCED (${J.length > 0 ? Math.min(100, Math.round(H / J.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${J.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: te ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
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
          searchTerm: w,
          onSearchChange: I,
          sortAlpha: j,
          onToggleSort: () => N(!j),
          effectiveTabs: re,
          selectedTabId: p,
          onSelectTab: (le) => {
            f(le), D(null);
          },
          isLoadingTabs: K,
          allStations: J,
          selectedStationIds: l,
          filterMode: x,
          onFilterModeChange: C,
          filteredCount: q.length,
          selectedInTabCount: Le,
          unselectedInTabCount: Be.length - Le,
          activeTabName: se.name,
          onSelectAllInScope: fe,
          onClearInScope: ve,
          viewMode: Ce,
          onViewModeChange: oe === "is-full-width" ? D : null,
          isDrawerMode: oe !== "is-full-width"
        }
      ),
      oe === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: fe,
              disabled: q.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  q.length,
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
              onClick: ve,
              disabled: je === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  je,
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
      oe === "is-full-width" && Ce === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${oe === "is-full-width" ? Ce === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: X.map((le) => {
            const Ae = l.includes(le.id), pe = ie.get(le.id);
            return oe === "is-full-width" ? Ce === "grid" ? /* @__PURE__ */ s.jsx(
              lx,
              {
                station: le,
                isSelected: Ae,
                onToggle: o,
                meta: pe
              },
              le.id
            ) : /* @__PURE__ */ s.jsx(
              ox,
              {
                station: le,
                isSelected: Ae,
                onToggle: o,
                meta: pe
              },
              le.id
            ) : /* @__PURE__ */ s.jsx(
              ix,
              {
                station: le,
                isSelected: Ae,
                onToggle: o,
                meta: pe
              },
              le.id
            );
          })
        }
      ),
      oe === "is-full-width" && /* @__PURE__ */ s.jsx(
        cx,
        {
          currentPage: T,
          totalPages: F,
          pageSize: Ue,
          totalItems: q.length,
          onPageChange: _,
          onPageSizeChange: (le) => {
            Ce === "table" ? Z(le) : A(le), _(1);
          },
          viewMode: Ce
        }
      ),
      oe === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
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
const Sn = (e) => String(e).padStart(2, "0"), xx = [
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
function Hd({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [i, a] = u.useState(e), [c, d] = u.useState(null), v = u.useRef(null), { h: g, m, s: k } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const C = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, C[0] || 0)),
      m: Math.min(59, Math.max(0, C[1] || 0)),
      s: Math.min(59, Math.max(0, C[2] || 0))
    };
  }, [e]), S = u.useMemo(() => g >= 12, [g]);
  u.useEffect(() => {
    a(e);
  }, [e]);
  const b = () => {
    const M = i.replace(/[^0-9:]/g, "").trim().split(":").filter((Z) => Z.length > 0);
    let D = 0, K = 0, $ = 0;
    M.length >= 1 && (D = Math.min(23, Math.max(0, parseInt(M[0], 10) || 0))), M.length >= 2 && (K = Math.min(59, Math.max(0, parseInt(M[1], 10) || 0))), M.length >= 3 && l && ($ = Math.min(59, Math.max(0, parseInt(M[2], 10) || 0)));
    const W = l ? `${Sn(D)}:${Sn(K)}:${Sn($)}` : `${Sn(D)}:${Sn(K)}`;
    a(W), t && t(W, { h: D, m: K, s: $ });
  }, O = (C) => {
    let M = g;
    C === "AM" && g >= 12 ? M = g - 12 : C === "PM" && g < 12 && (M = g + 12);
    const D = l ? `${Sn(M)}:${Sn(m)}:${Sn(k)}` : `${Sn(M)}:${Sn(m)}`;
    a(D), t && t(D, { h: M, m, s: k });
  }, y = u.useCallback((C, M) => {
    if (!v.current) return null;
    const D = v.current.getBoundingClientRect(), K = D.left + D.width / 2, $ = D.top + D.height / 2, W = C.clientX - K, Z = C.clientY - $;
    let V = Math.atan2(Z, W) * 180 / Math.PI + 90;
    if (V < 0 && (V += 360), M === "hours") {
      const A = Math.round(V / 30) % 12;
      return S ? A === 0 ? 12 : A + 12 : A === 0 ? 0 : A;
    }
    return Math.round(V / 6) % 60;
  }, [S]), p = u.useCallback((C, M) => {
    let D = g, K = m, $ = k;
    C === "hours" ? D = M : C === "minutes" ? K = M : C === "seconds" && ($ = M);
    const W = l ? `${Sn(D)}:${Sn(K)}:${Sn($)}` : `${Sn(D)}:${Sn(K)}`;
    a(W), t && t(W, { h: D, m: K, s: $ });
  }, [g, m, k, l, t]), f = (C, M) => {
    M.preventDefault(), M.stopPropagation(), d(C);
    const D = y(M, C);
    D !== null && p(C, D);
  };
  u.useEffect(() => {
    if (!c) return;
    const C = (D) => {
      const K = y(D, c);
      K !== null && p(c, K);
    }, M = () => {
      d(null);
    };
    return window.addEventListener("pointermove", C), window.addEventListener("pointerup", M), () => {
      window.removeEventListener("pointermove", C), window.removeEventListener("pointerup", M);
    };
  }, [c, y, p]);
  const w = u.useMemo(() => g % 12 * 30, [g]), I = u.useMemo(() => m % 60 * 6, [m]), j = u.useMemo(() => k % 60 * 6, [k]), N = S ? yx : xx, x = u.useMemo(() => {
    const C = [];
    for (let M = 0; M < 60; M++) {
      const D = (M * 6 - 90) * (Math.PI / 180), K = M % 5 === 0, $ = 104, W = K ? 93 : 98;
      C.push({
        index: M,
        x1: 110 + W * Math.cos(D),
        y1: 110 + W * Math.sin(D),
        x2: 110 + $ * Math.cos(D),
        y2: 110 + $ * Math.sin(D),
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
              className: `btn-period ${S ? "" : "active"}`,
              onClick: () => O("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${S ? "active" : ""}`,
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
            value: i,
            onChange: (C) => a(C.target.value),
            onBlur: b,
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
        ref: v,
        className: "clock-dial-svg",
        viewBox: "0 0 220 220",
        children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "105", className: "dial-background" }),
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "88", className: "dial-track-ring" }),
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: x.map((C) => /* @__PURE__ */ s.jsx(
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
            const M = (C.angle - 90) * (Math.PI / 180), D = 76, K = 110 + D * Math.cos(M), $ = 110 + D * Math.sin(M), W = g === C.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: K,
                y: $,
                className: `dial-num ${W ? "selected" : ""}`,
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
              transform: `rotate(${w} 110 110)`,
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
                    onPointerDown: (C) => f("hours", C)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${c === "minutes" ? "dragging" : ""}`,
              transform: `rotate(${I} 110 110)`,
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
                    onPointerDown: (C) => f("minutes", C)
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
                    onPointerDown: (C) => f("seconds", C)
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
function vx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: i
}) {
  const [a, c] = u.useState(""), [d, v] = u.useState(""), [g, m] = u.useState("00:00:00"), [k, S] = u.useState("00:00:00"), [b, O] = u.useState(() => /* @__PURE__ */ new Date()), [y, p] = u.useState(null), [f, w] = u.useState([]), [I, j] = u.useState(!1), [N, x] = u.useState(""), [C, M] = u.useState(1), [D, K] = u.useState(2), [$, W] = u.useState(null), Z = u.useCallback(() => {
    try {
      const F = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (F) {
        const X = JSON.parse(F);
        Array.isArray(X) && w(X);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((F) => F.ok ? F.json() : null).then((F) => {
      Array.isArray(F) && F.length > 0 && w(F);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    Z();
    let F = n == null ? void 0 : n.startEpochMs, X = n == null ? void 0 : n.endEpochMs;
    if (!F || isNaN(F))
      if (n != null && n.start) {
        const Le = String(n.start).replace(" ", "T"), je = new Date(Le).getTime();
        F = isNaN(je) ? Date.now() - 24 * 3600 * 1e3 : je;
      } else
        X = Date.now(), F = X - 24 * 3600 * 1e3;
    if (!X || isNaN(X))
      if (n != null && n.end) {
        const Le = String(n.end).replace(" ", "T"), je = new Date(Le).getTime();
        X = isNaN(je) ? Date.now() : je;
      } else
        X = F + 24 * 3600 * 1e3;
    W(null);
    const fe = jr(F, o), ve = jr(X, o);
    c(`${fe.year}-${Ot(fe.month)}-${Ot(fe.day)}`), v(`${ve.year}-${Ot(ve.month)}-${Ot(ve.day)}`), m(`${Ot(fe.hour)}:${Ot(fe.minute)}:${Ot(fe.second)}`), S(`${Ot(ve.hour)}:${Ot(ve.minute)}:${Ot(ve.second)}`), O(new Date(Date.UTC(fe.year, fe.month - 1, 1)));
  }, [e, n, o, Z]);
  const V = u.useCallback(() => {
    a && !d && v(a);
  }, [a, d]), A = d || a, T = u.useMemo(() => a ? `${a}T${g}` : "", [a, g]), _ = u.useMemo(() => A ? `${A}T${k}` : "", [A, k]), z = u.useMemo(() => {
    const F = {};
    return f.forEach((X) => {
      const fe = X.startTime || X.start, ve = X.endTime || X.end || fe;
      if (!fe) return;
      const Le = String(fe).substring(0, 10), je = String(ve).substring(0, 10), [le, Ae, pe] = Le.split("-").map(Number), [be, We, Oe] = je.split("-").map(Number);
      if (isNaN(le) || isNaN(Ae) || isNaN(pe) || isNaN(be) || isNaN(We) || isNaN(Oe)) return;
      let xe = new Date(Date.UTC(le, Ae - 1, pe));
      const xt = new Date(Date.UTC(be, We - 1, Oe));
      for (; xe.getTime() <= xt.getTime(); ) {
        const ze = `${xe.getUTCFullYear()}-${Ot(xe.getUTCMonth() + 1)}-${Ot(xe.getUTCDate())}`;
        F[ze] || (F[ze] = []), F[ze].push(X), xe.setUTCDate(xe.getUTCDate() + 1);
      }
    }), F;
  }, [f]), ee = async (F, X) => {
    if (X && X.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const fe = f.filter((ve) => (ve.id || ve.startTime) !== F);
    w(fe);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(fe)), localStorage.setItem("itb_bookmarks", JSON.stringify(fe)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: fe }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${F}`, { method: "DELETE" });
    } catch {
    }
  }, U = (F) => {
    const X = F.startTime || F.start, fe = F.endTime || F.end;
    if (!X || !fe) return;
    const ve = X.substring(0, 10), Le = X.includes("T") ? X.split("T")[1].substring(0, 8) : "00:00:00", je = fe.substring(0, 10), le = fe.includes("T") ? fe.split("T")[1].substring(0, 8) : "23:59:59";
    c(ve), v(je), m(Le), S(le);
    const [Ae, pe] = ve.split("-").map(Number);
    O(new Date(Date.UTC(Ae, pe - 1, 1))), j(!1);
  }, ge = (F) => {
    l ? (l(F), t && t()) : U(F);
  }, oe = u.useMemo(() => {
    if (o === "UTC" || !T.includes("T")) return { isAmbiguous: !1 };
    const [F, X] = T.split("T");
    return Ci(F, X);
  }, [T, o]), re = u.useMemo(() => {
    if (o === "UTC" || !_.includes("T")) return { isAmbiguous: !1 };
    const [F, X] = _.split("T");
    return Ci(F, X);
  }, [_, o]), se = u.useMemo(() => {
    if (!a || !A) return null;
    const F = xc(a, g, o, C), X = xc(A, k, o, D);
    return F === null || X === null || isNaN(F) || isNaN(X) ? null : { startEpoch: F, endEpoch: X, durationMs: X - F };
  }, [a, g, A, k, o, C, D]), Be = u.useMemo(() => !se || se.durationMs <= 0 ? [] : cp(se.startEpoch, se.endEpoch), [se]), H = u.useMemo(() => {
    if (!se || se.durationMs <= 0) return "0h";
    const F = se.durationMs / (1e3 * 60 * 60);
    return F >= 24 ? `${(F / 24).toFixed(1)}d (${F.toFixed(0)}h)` : `${F.toFixed(1)}h`;
  }, [se]), te = u.useMemo(() => {
    const F = b.getUTCFullYear(), X = b.getUTCMonth(), fe = new Date(Date.UTC(F, X, 1)).getUTCDay(), ve = new Date(Date.UTC(F, X + 1, 0)).getUTCDate(), Le = [];
    for (let je = 0; je < fe; je++) Le.push(null);
    for (let je = 1; je <= ve; je++) Le.push(`${F}-${Ot(X + 1)}-${Ot(je)}`);
    return Le;
  }, [b]), ie = (F) => {
    if (F) {
      if (W(null), !a || a && d)
        c(F), v("");
      else if (a && !d)
        if (F < a)
          c(F), v("");
        else {
          const X = (/* @__PURE__ */ new Date(a + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(F + "T00:00:00Z")).getTime() - X > _o) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const ve = new Date(X + _o);
            v(`${ve.getUTCFullYear()}-${Ot(ve.getUTCMonth() + 1)}-${Ot(ve.getUTCDate())}`);
          } else
            v(F);
        }
    }
  }, J = (F, X) => {
    W(X);
    const fe = Date.now(), ve = fe - F, Le = jr(ve, o), je = jr(fe, o);
    c(`${Le.year}-${Ot(Le.month)}-${Ot(Le.day)}`), v(`${je.year}-${Ot(je.month)}-${Ot(je.day)}`), m(`${Ot(Le.hour)}:${Ot(Le.minute)}:${Ot(Le.second)}`), S(`${Ot(je.hour)}:${Ot(je.minute)}:${Ot(je.second)}`), O(new Date(Date.UTC(Le.year, Le.month - 1, 1)));
  }, q = () => {
    if (V(), !se || isNaN(se.startEpoch) || isNaN(se.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (se.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (se.durationMs > _o) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: T,
      end: _,
      startEpochMs: se.startEpoch,
      endEpochMs: se.endEpoch,
      durationMs: se.durationMs,
      timeMode: o
    }), t && t();
  }, Ce = u.useMemo(() => {
    if (!N.trim()) return f;
    const F = N.toLowerCase();
    return f.filter(
      (X) => (X.title || X.name || "").toLowerCase().includes(F) || (X.startTime || "").includes(F)
    );
  }, [f, N]);
  if (!e) return null;
  const Ue = o === "UTC";
  return Ps.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (F) => F.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${Ue ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: Ue ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            i && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Ue ? "" : "active"}`,
                  onClick: () => i("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Ue ? "active" : ""}`,
                  onClick: () => i("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${I ? "active" : ""}`,
                onClick: () => j(!I),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: f.length })
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
          /* @__PURE__ */ s.jsx("span", { children: Be.map((F) => `${F.description} (${F.labelBefore} ➔ ${F.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "7d" ? "active" : ""}`,
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
            className: `btn-preset ${$ === "3d" ? "active" : ""}`,
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
            className: `btn-preset ${$ === "24h" ? "active" : ""}`,
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
            className: `btn-preset ${$ === "8h" ? "active" : ""}`,
            onClick: () => J(8 * 3600 * 1e3, "8h"),
            children: [
              "8h Shift ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        )
      ] }),
      I && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
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
                onChange: (F) => x(F.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            Ce.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: Ce.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : Ce.map((F) => {
          var je;
          const X = F.id || F.startTime, fe = F.title || F.name || "Untitled Mission", ve = (F.startTime || "").replace("T", " "), Le = (F.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => U(F), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: fe }),
                F.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  F.cutStationName
                ] }),
                ((je = F.stationIds) == null ? void 0 : je.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  F.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                ve,
                " ➔ ",
                Le
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (le) => {
                    le.stopPropagation(), U(F);
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
                    le.stopPropagation(), ge(F);
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
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: b.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => O((F) => new Date(Date.UTC(F.getUTCFullYear(), F.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => O((F) => new Date(Date.UTC(F.getUTCFullYear(), F.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: te.map((F, X) => {
            if (!F) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${X}`);
            const fe = parseInt(F.split("-")[2], 10), ve = F === a, Le = F === (d || a), je = d || y, le = a && je && F > a && F < je, Ae = z[F], pe = !!(Ae && Ae.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${ve ? "start-edge" : ""} ${Le ? "end-edge" : ""} ${le ? "in-range" : ""} ${pe ? "has-bookmark" : ""}`,
                onClick: () => ie(F),
                onMouseEnter: () => !d && a && p(F),
                onMouseLeave: () => p(null),
                title: pe ? `${Ae.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: fe }),
                  pe && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (be) => {
                        be.stopPropagation(), j(!0), x(F);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Ae.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Ae.length })
                      ]
                    }
                  )
                ]
              },
              F
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: V, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Hd,
            {
              label: "START TIME (FROM)",
              value: g,
              onChange: (F) => {
                V(), m(F), W(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Hd,
            {
              label: "END TIME (TO)",
              value: k,
              onChange: (F) => {
                V(), S(F), W(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (oe.isAmbiguous || re.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        oe.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
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
                className: C === 1 ? "active" : "",
                onClick: () => M(1),
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
                className: C === 2 ? "active" : "",
                onClick: () => M(2),
                children: [
                  "2nd Occurrence (",
                  oe.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        re.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            re.transition.labelBefore,
            " / ",
            re.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: D === 1 ? "active" : "",
                onClick: () => K(1),
                children: [
                  "1st Occurrence (",
                  re.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: D === 2 ? "active" : "",
                onClick: () => K(2),
                children: [
                  "2nd Occurrence (",
                  re.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: se && se.durationMs > _o ? "#f43f5e" : "#22d3ee" }, children: H }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Be.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: q, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Np = "extractor_incident_bookmarks_fallback", Nx = ["itb_studio_bookmarks", "itb_bookmarks", Np];
function kx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [i, a] = u.useState([]), [c, d] = u.useState(""), [v, g] = u.useState(!1), [m, k] = u.useState(!1), [S, b] = u.useState(null), [O, y] = u.useState(""), p = u.useCallback(($) => {
    Nx.forEach((W) => {
      try {
        localStorage.setItem(W, JSON.stringify($));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: $ }));
  }, []), f = u.useCallback(async () => {
    g(!0);
    try {
      const $ = await fetch("/api/v1/extractor-advanced/bookmarks");
      if ($.ok) {
        const W = await $.json(), Z = Array.isArray(W) ? W : [];
        a(Z), p(Z);
        return;
      }
    } catch ($) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", $);
    } finally {
      g(!1);
    }
    try {
      const $ = localStorage.getItem(Np) || localStorage.getItem("itb_studio_bookmarks");
      $ && a(JSON.parse($));
    } catch {
    }
  }, [p]);
  if (u.useEffect(() => {
    e && f();
  }, [e, f]), !e) return null;
  const w = async () => {
    var oe, re, se, Be, H, te;
    if (!c.trim() || m) return;
    const $ = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((oe = n == null ? void 0 : n.timeRange) != null && oe.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), W = (n == null ? void 0 : n.inPointMs) ?? 0, Z = (n == null ? void 0 : n.outPointMs) ?? (((re = n == null ? void 0 : n.timeRange) == null ? void 0 : re.durationMs) || 0), V = (n == null ? void 0 : n.playheadMs) ?? W, A = $ + W, T = $ + Z, _ = $ + V, z = (n == null ? void 0 : n.selectedStationIds) || [], ee = (n == null ? void 0 : n.selectedStationNames) || [], U = ((se = n == null ? void 0 : n.allStationIds) == null ? void 0 : se.length) > 0 ? n.allStationIds : z, ge = {
      title: c.trim(),
      startTime: ((Be = n == null ? void 0 : n.timeRange) == null ? void 0 : Be.start) || "",
      endTime: ((H = n == null ? void 0 : n.timeRange) == null ? void 0 : H.end) || "",
      baseEpochMs: $,
      timelineBaseEpochMs: $,
      inPointMs: W,
      outPointMs: Z,
      playheadMs: V,
      inEpochMs: A,
      outEpochMs: T,
      playheadEpochMs: _,
      selectedStationIds: z,
      selectedStationNames: ee,
      allStationIds: U,
      stationIds: z.length > 0 ? z : U,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    k(!0);
    try {
      const ie = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ge)
      });
      if (ie.ok) {
        const J = await ie.json(), Ce = [{
          ...ge,
          ...J.bookmark || {},
          inEpochMs: A,
          outEpochMs: T,
          playheadEpochMs: _,
          selectedStationIds: z,
          selectedStationNames: ee,
          allStationIds: U,
          id: ((te = J.bookmark) == null ? void 0 : te.id) || J.id || `bm_${Date.now()}`
        }, ...i];
        a(Ce), p(Ce), d("");
      } else
        throw new Error(`Server returned ${ie.status}`);
    } catch (ie) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", ie);
      const q = [{
        ...ge,
        inEpochMs: A,
        outEpochMs: T,
        playheadEpochMs: _,
        selectedStationIds: z,
        selectedStationNames: ee,
        allStationIds: U,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...i];
      a(q), p(q), d("");
    } finally {
      k(!1);
    }
  }, I = async ($, W) => {
    if (W.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const Z = i.filter((V) => (V.id || V.startTime) !== $);
    a(Z), p(Z);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, { method: "DELETE" });
    } catch (V) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", V);
    }
  }, j = ($, W) => {
    W.stopPropagation(), b($.id || $.startTime), y($.title || $.name || "");
  }, N = async ($, W) => {
    if (W && W.stopPropagation(), !O.trim()) return;
    const Z = i.find((T) => (T.id || T.startTime) === $), V = O.trim(), A = i.map(
      (T) => (T.id || T.startTime) === $ ? { ...T, title: V, name: V } : T
    );
    a(A), p(A), b(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Z, title: V })
      });
    } catch (T) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", T);
    }
  }, x = ($) => {
    $.stopPropagation(), b(null);
  }, C = ($) => !$ || isNaN($) ? "--:--:--" : gt($, o), M = ($) => {
    const W = $.startTime || $.StartTime, Z = $.endTime || $.EndTime;
    if (!W) return "--";
    const V = String(W).replace("T", " ").substring(0, 19), A = Z ? String(Z).replace("T", " ").substring(0, 19) : V;
    return `${V} ➔ ${A}`;
  }, D = ($) => {
    let W = $.inEpochMs || $.InEpochMs, Z = $.outEpochMs || $.OutEpochMs;
    if (!W || !Z) {
      const V = $.timelineBaseEpochMs || $.baseEpochMs || ($.startTime ? new Date(String($.startTime).replace(" ", "T")).getTime() : 0), A = $.inPointMs ?? $.InPointMs, T = $.outPointMs ?? $.OutPointMs;
      V && typeof A == "number" && typeof T == "number" && (A > 0 || T > 0) && (W = V + A, Z = V + T);
    }
    if (W && Z && !isNaN(W) && !isNaN(Z) && W > 0) {
      const V = C(W), A = C(Z), T = Math.max(0, Z - W), _ = Math.floor(T / 6e4), z = Math.floor(_ / 60), ee = _ % 60, U = z > 0 ? `${z}h ${ee}m` : `${_}m`;
      return { timeText: `${V} ➔ ${A}`, duration: U };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, K = ($) => {
    const W = $.selectedStationNames || [], Z = $.selectedStationIds || $.cutStationIds || $.stationIds || [];
    return W.length > 0 ? W.join(", ") : Z.length > 0 ? Z.join(", ") : $.cutStationName ? $.cutStationName : $.activeStationName ? $.activeStationName : "All Stations in Scope";
  };
  return Ps.createPortal(
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
              onKeyDown: ($) => $.key === "Enter" && w(),
              disabled: m,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !m ? "active" : ""}`,
            onClick: w,
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
        var _, z, ee;
        const W = $.id || $.startTime, Z = S === W, V = D($), A = K($), T = ((_ = $.allStationIds) == null ? void 0 : _.length) || ((z = $.selectedStationIds) == null ? void 0 : z.length) || ((ee = $.stationIds) == null ? void 0 : ee.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${Z ? "is-editing" : ""}`,
            onClick: () => {
              Z || (r && r($), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                Z ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (U) => U.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: O,
                      onChange: (U) => y(U.target.value),
                      onKeyDown: (U) => {
                        U.key === "Enter" && N(W, U), U.key === "Escape" && x(U);
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
                        onClick: (U) => N(W, U),
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
                    /* @__PURE__ */ s.jsx("strong", { children: M($) })
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
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: V.timeText }),
                    V.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      V.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${A}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: A })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (U) => U.stopPropagation(), children: [
                !Z && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (U) => j($, U),
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
                    onClick: (U) => I(W, U),
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
    let g = 1 / 0, m = 1 / 0, k = -1 / 0, S = -1 / 0;
    e.forEach((y) => {
      const p = y.x ?? y.X ?? 0, f = y.y ?? y.Y ?? 0, w = y.width ?? y.Width ?? 1920, I = y.height ?? y.Height ?? 1080;
      g = Math.min(g, p), m = Math.min(m, f), k = Math.max(k, p + w), S = Math.max(S, f + I);
    });
    const b = Math.max(1, k - g), O = Math.max(1, S - m);
    return { minX: g, minY: m, totalW: b, totalH: O };
  }, [e]);
  if (!e || e.length <= 1 || !i)
    return null;
  const a = e.find((g) => (g.displayId ?? g.DisplayId) === t) || e[0];
  e.indexOf(a);
  const v = ((a ? a.displayName ?? a.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim() || "SCREEN").toUpperCase();
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (g) => g.stopPropagation(),
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
            children: e.map((g, m) => {
              const k = g.displayId ?? g.DisplayId ?? `mon-${m}`, S = (g.x ?? g.X ?? 0) - i.minX, b = (g.y ?? g.Y ?? 0) - i.minY, O = g.width ?? g.Width ?? 1920, y = g.height ?? g.Height ?? 1080, p = k === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${p ? "is-active" : ""}`,
                  onClick: (f) => {
                    f.stopPropagation(), n == null || n(k);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: S + 10,
                        y: b + 10,
                        width: Math.max(10, O - 20),
                        height: Math.max(10, y - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: S + O / 2,
                        y: b + y / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: m + 1
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
  isLooping: g = !0,
  recordingSegments: m = {},
  globalGaps: k = [],
  showWatermark: S = !0,
  directorPlan: b,
  onOverrideDisplay: O,
  onResetOverride: y,
  viewMode: p,
  onViewModeChange: f,
  onOpenFullscreen: w,
  isPipSwapped: I,
  onPipSwapChange: j,
  className: N = ""
}) {
  const x = u.useRef(null), C = u.useRef(null), M = u.useRef(null), D = u.useRef(r), K = u.useRef(r), $ = u.useRef(r), W = u.useRef(!1), Z = u.useRef(null), V = u.useRef(o), A = u.useRef(!1);
  D.current = r;
  const T = e == null ? void 0 : e.id, _ = e && (e.hostname || e.name) || "", z = u.useMemo(() => {
    var De, Je, ot, Ye;
    const Y = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((De = e == null ? void 0 : e.displayTopology) == null ? void 0 : De.displays) || ((Je = e == null ? void 0 : e.displayTopology) == null ? void 0 : Je.Displays) || ((ot = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : ot.Displays) || ((Ye = e == null ? void 0 : e.topology) == null ? void 0 : Ye.displays) || [];
    if (!Array.isArray(Y) || Y.length === 0) return [];
    const ce = Y.length > 1 && Y.every((Ke) => (Ke.X ?? Ke.x ?? 0) === 0 && (Ke.Y ?? Ke.y ?? 0) === 0);
    let ke = 0;
    return Y.map((Ke, Xe) => {
      const it = Ke.Width || Ke.width || 1920, Nt = Ke.Height || Ke.height || 1080, Pt = ce ? ke : Ke.X ?? Ke.x ?? Xe * it, mn = ce ? 0 : Ke.Y ?? Ke.y ?? 0;
      ce && (ke += it);
      const Rn = (Ke.displayId ?? Ke.DisplayId ?? `mon-${Xe}`).toLowerCase(), Yn = Ke.displayNumber ?? Ke.DisplayNumber ?? Xe + 1, qt = (Ke.displayName || Ke.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${Yn}`, Ut = !!(Ke.isPrimary ?? Ke.IsPrimary ?? Xe === 0);
      return {
        ...Ke,
        displayId: Rn,
        DisplayId: Rn,
        displayIndex: Xe,
        displayNumber: Yn,
        DisplayNumber: Yn,
        displayName: qt,
        DisplayName: qt,
        isPrimary: Ut,
        IsPrimary: Ut,
        x: Pt,
        y: mn,
        X: Pt,
        Y: mn,
        width: it,
        height: Nt,
        Width: it,
        Height: Nt
      };
    });
  }, [e]), ee = z.length > 1, [U, ge] = u.useState(() => {
    if (!ee) return "mon-0";
    try {
      const Y = localStorage.getItem("itb_solo_viewmode");
      if (Y) return Y;
    } catch {
    }
    return "canvas";
  }), re = ee ? p !== void 0 ? p : U : "mon-0", se = u.useCallback((Y) => {
    const ce = typeof Y == "function" ? Y(re) : Y;
    ge(ce);
    try {
      localStorage.setItem("itb_solo_viewmode", ce);
    } catch {
    }
    f && f(ce);
  }, [re, f]), [Be, H] = u.useState(!1), te = I !== void 0 ? I : Be, ie = u.useCallback((Y) => {
    const ce = typeof Y == "function" ? Y(te) : Y;
    H(ce), j && j(ce);
  }, [te, j]), J = u.useMemo(() => {
    const Y = b || (e == null ? void 0 : e.directorPlan);
    if (!Y || !Y.segments || Y.segments.length === 0) return null;
    const ce = t + r;
    return Y.segments.find((ke) => {
      const De = ke.startEpochMs ?? ke.StartEpochMs ?? 0, Je = ke.endEpochMs ?? ke.EndEpochMs ?? 0;
      return ce >= De && ce <= Je;
    }) || Y.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t, r]), q = u.useMemo(() => {
    var Y, ce;
    if (!ee) return "mon-0";
    if (re === "split" || re === "pip" || re === "canvas" || re === "all-displays") {
      const ke = (((Y = z[0]) == null ? void 0 : Y.displayId) ?? "mon-0").toLowerCase(), De = (((ce = z[1]) == null ? void 0 : ce.displayId) ?? "mon-1").toLowerCase();
      return te ? De : ke;
    }
    return re !== "director" ? re.toLowerCase() : ((J == null ? void 0 : J.targetDisplayId) ?? (J == null ? void 0 : J.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [ee, re, J, z, te]), Ce = u.useMemo(() => {
    var ce;
    if (!ee) return null;
    const Y = z.find((ke) => (ke.displayId ?? ke.DisplayId ?? "").toLowerCase() !== q);
    return Y ? (Y.displayId ?? Y.DisplayId).toLowerCase() : (((ce = z[1]) == null ? void 0 : ce.displayId) || "mon-1").toLowerCase();
  }, [ee, z, q]), Ue = u.useMemo(() => {
    const Y = z.find((ke) => (ke.displayId ?? "").toLowerCase() === (q || "").toLowerCase());
    if (Y) return Y.displayName || `Screen ${Y.displayNumber || 1}`;
    if (q === "mon-0" || q === "0") return "Screen 1";
    if (q === "mon-1" || q === "1") return "Screen 2";
    const ce = (q || "").match(/\d+/);
    if (ce) {
      const ke = parseInt(ce[0], 10);
      return `Screen ${(q || "").startsWith("mon-") ? ke + 1 : ke}`;
    }
    return (q || "Screen 1").toUpperCase();
  }, [z, q]), F = u.useMemo(() => {
    const Y = z.find((ce) => (ce.displayId ?? "").toLowerCase() === (Ce || "").toLowerCase());
    return Y ? Y.displayName || `Screen ${Y.displayNumber || 2}` : "Screen 2";
  }, [z, Ce]), X = u.useMemo(() => re !== "director" && re !== "split" && re !== "pip" && re !== "canvas" ? !0 : !!((J == null ? void 0 : J.isManualOverride) ?? (J == null ? void 0 : J.IsManualOverride)), [re, J]), [fe, ve] = u.useState({}), Le = u.useRef(null), [je, le] = u.useState({ width: 0, height: 0 }), Ae = u.useMemo(() => jx(z), [z]);
  u.useEffect(() => {
    if (!ee || re !== "canvas" && re !== "all-displays" || o)
      return;
    const Y = () => {
      const ke = Le.current;
      if (!ke) return;
      const De = 48, Je = 72, ot = Math.max(100, ke.clientWidth - De), Ye = Math.max(100, ke.clientHeight - Je), Ke = Ae.totalWidth || 1920, Xe = Ae.totalHeight || 1080, it = Ke / Xe;
      let Nt = ot, Pt = Nt / it;
      Pt > Ye && (Pt = Ye, Nt = Pt * it), le({ width: Math.round(Nt), height: Math.round(Pt) });
    };
    Y();
    const ce = new ResizeObserver(Y);
    return Le.current && ce.observe(Le.current), () => ce.disconnect();
  }, [ee, re, Ae]);
  const pe = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!ee || re !== "canvas" && re !== "all-displays")
      return;
    let Y = !0;
    const ce = new AbortController(), ke = pe;
    z.forEach((Je, ot) => {
      const Ye = (Je.displayId ?? Je.DisplayId ?? `mon-${ot}`).toLowerCase(), Ke = bn.get(_, ke, Ye);
      Ke ? ve((Xe) => ({ ...Xe, [Ye]: Ke })) : bn.fetchFrame(_, ke, ce.signal, Ye).then((Xe) => {
        Y && Xe && ve((it) => ({ ...it, [Ye]: Xe }));
      });
    });
    const De = bn.subscribe((Je, ot, Ye, Ke) => {
      Je === _ && ot === ke && Ke && Y && ve((Xe) => ({ ...Xe, [Ke.toLowerCase()]: Ye }));
    });
    return () => {
      Y = !1, ce.abort(), De();
    };
  }, [ee, re, z, _, pe]);
  const be = u.useRef(q), We = u.useMemo(() => e ? m[e.id] || m[e.hostname] || e.segments || [] : [], [e, m]), Oe = t + r, xe = u.useMemo(() => We.length === 0 ? !0 : We.some((Y) => {
    const ce = (Y.startEpochMs ?? Y.startEpoch ?? 0) - 2e3, ke = (Y.endEpochMs ?? Y.endEpoch ?? 0) + 2e3;
    return Oe >= ce && Oe <= ke;
  }), [We, Oe]), xt = !xe && We.length > 0, [ze, Bt] = u.useState("A"), [Ge, ft] = u.useState(""), [$t, Tt] = u.useState(""), [Gn, Ve] = u.useState(""), [wt, Lt] = u.useState(null), [jt, zt] = u.useState(!1), [pn, vt] = u.useState(!1), [pt, ln] = u.useState(() => {
    if (!_) return null;
    const Y = Math.round(t + r);
    return bn.get(_, Y, q) || null;
  }), [un, Ee] = u.useState(null), mt = ze === "A" ? x : C, Ne = u.useCallback(() => {
    const Y = al();
    x.current && (x.current.volume = Y.volume, x.current.muted = ze !== "A" || Y.isMuted, x.current.defaultPlaybackRate = a, x.current.playbackRate = a, ze === "A" && !Y.isMuted && Ei(x.current)), C.current && (C.current.volume = Y.volume, C.current.muted = ze !== "B" || Y.isMuted, C.current.defaultPlaybackRate = a, C.current.playbackRate = a, ze === "B" && !Y.isMuted && Ei(C.current)), M.current && (M.current.muted = !0, M.current.defaultPlaybackRate = a, M.current.playbackRate = a);
  }, [ze, a]);
  u.useEffect(() => {
    const Y = (ce) => {
      ce.detail && (x.current && (x.current.volume = ce.detail.volume), C.current && (C.current.volume = ce.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", Y), () => window.removeEventListener("itb-audio-state-changed", Y);
  }, []), u.useEffect(() => {
    x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a), C.current && (C.current.defaultPlaybackRate = a, C.current.playbackRate = a), M.current && (M.current.defaultPlaybackRate = a, M.current.playbackRate = a);
  }, [a]), u.useEffect(() => {
    if (!T || !_) return;
    if (o) {
      V.current = !0;
      return;
    }
    const Y = V.current;
    V.current = o;
    let ce = !0;
    const ke = new AbortController(), De = Math.round(t + r), Je = bn.get(_, De, q);
    if (Je) {
      ln(Je);
      return;
    }
    const Ye = setTimeout(() => {
      ce && bn.fetchFrame(_, De, ke.signal, q).then((Xe) => {
        ce && Xe && ln(Xe);
      });
    }, Y ? 25 : 35), Ke = bn.subscribe((Xe, it, Nt, Pt) => {
      Xe === _ && it === De && (!Pt || Pt === q) && ce && ln(Nt);
    });
    return () => {
      ce = !1, clearTimeout(Ye), ke.abort(), Ke();
    };
  }, [T, _, t, r, o, jt, q]), u.useEffect(() => {
    if (!ee || re !== "split" && re !== "pip" || !Ce || o) {
      Ee(null);
      return;
    }
    let Y = !0;
    const ce = new AbortController(), ke = Math.round(t + r), De = bn.get(_, ke, Ce);
    if (De) {
      Ee(De);
      return;
    }
    const Je = setTimeout(() => {
      Y && bn.fetchFrame(_, ke, ce.signal, Ce).then((Ye) => {
        Y && Ye && Ee(Ye);
      });
    }, 40), ot = bn.subscribe((Ye, Ke, Xe, it) => {
      Ye === _ && Ke === ke && (!it || it === Ce) && Y && Ee(Xe);
    });
    return () => {
      Y = !1, clearTimeout(Je), ce.abort(), ot();
    };
  }, [ee, re, Ce, T, _, t, r]);
  const we = u.useCallback((Y, ce = q) => {
    const ke = Math.round(t), De = Math.round(t + n), Je = Math.min(De, Math.max(ke, Math.round(t + Y)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(_)}&startEpoch=${ke}&endEpoch=${De}&seekEpoch=${Je}&displayId=${encodeURIComponent(ce)}&_t=${Date.now()}`;
  }, [t, n, _, q]);
  u.useEffect(() => {
    if (!(!T || !_))
      if (o && xe) {
        const Y = D.current;
        K.current = Y, $.current = Y, W.current = !1;
        const ce = we(Y, q);
        zt(!1), vt(!0), Bt("A"), ft(ce), Tt(""), Lt(null), Ve((re === "split" || re === "pip") && Ce ? we(Y, Ce) : "");
      } else o || (Z.current && clearTimeout(Z.current), W.current = !1, ft(""), Tt(""), Ve(""), Lt(null), zt(!1), vt(!1), x.current && x.current.pause(), C.current && C.current.pause(), M.current && M.current.pause());
  }, [o, T, _, xe, we, q, re, Ce]), u.useEffect(() => {
    if (be.current !== q && (be.current = q, o && xe)) {
      const Y = D.current;
      K.current = Y;
      const ce = we(Y, q);
      zt(!1), vt(!0), Bt("A"), ft(ce), Tt("");
    }
  }, [q, o, xe, we]), u.useEffect(() => {
    if (!T || !_) return;
    const Y = Math.abs(r - $.current);
    if (!o || Y < 15) {
      $.current = r;
      return;
    }
    return W.current = !0, $.current = r, K.current = r, x.current && x.current.pause(), C.current && C.current.pause(), M.current && M.current.pause(), zt(!1), vt(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => {
      if (!xe) {
        ft(""), Tt(""), Ve(""), vt(!1), W.current = !1;
        return;
      }
      const ce = D.current, ke = we(ce, q);
      Bt("A"), ft(ke), Tt(""), Lt(null), (re === "split" || re === "pip") && Ce && Ve(we(ce, Ce));
    }, 75), () => {
      Z.current && clearTimeout(Z.current);
    };
  }, [r, o, T, _, xe, we, q, re, Ce]), u.useEffect(() => {
    if (!o || !jt || We.length === 0) return;
    const Y = t + D.current, ce = We.map((ke) => ({
      start: ke.startEpochMs ?? ke.startEpoch ?? 0,
      end: ke.endEpochMs ?? ke.endEpoch ?? 0
    })).filter((ke) => ke.start > Y + 500).sort((ke, De) => ke.start - De.start)[0];
    if (ce && (!wt || wt.start !== ce.start)) {
      const ke = ce.start - t;
      if (ke < v) {
        const De = we(ke, q);
        Lt({ start: ce.start, ms: ke }), ze === "A" ? Tt(De) : ft(De);
      }
    }
  }, [o, jt, r, t, v, We, wt, ze, we, q]);
  const He = u.useCallback(() => {
    if (wt) {
      const Y = ze === "A" ? "B" : "A", ce = Y === "A" ? x : C;
      Bt(Y), K.current = wt.ms, $.current = wt.ms, Lt(null), ce.current && ce.current.play().then(() => {
        Ne();
      }).catch(() => {
      });
    } else
      g ? l(d) : i(!1);
  }, [wt, ze, Ne, g, d, l, i]), at = u.useCallback(() => {
    const Y = mt.current;
    if (!Y || W.current || !o || A.current) return;
    const ce = Y.currentTime * 1e3, ke = Math.round(K.current + ce);
    if (k && k.length > 0) {
      const De = t + ke, Je = k.find((ot) => De >= ot.startEpochMs && De < ot.endEpochMs);
      if (Je) {
        A.current = !0;
        const ot = Math.round(Je.endEpochMs - t) + 10;
        l(ot), setTimeout(() => {
          A.current = !1;
        }, 150);
        return;
      }
    }
    if (ke >= v) {
      g ? l(d) : (i(!1), l(v));
      return;
    }
    $.current = ke, l(ke);
  }, [mt, o, t, k, v, g, d, l, i]), Et = pn && o && !xt;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${re} ${N}`, children: [
    ee && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (Y) => Y.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${re === "director" ? "active" : ""}`,
          onClick: () => se("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${re === "canvas" ? "active" : ""}`,
          onClick: () => se("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${re === "split" ? "active" : ""}`,
          onClick: () => se("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${re === "pip" ? "active" : ""}`,
          onClick: () => se("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      z.map((Y, ce) => {
        const ke = (Y.displayId ?? `mon-${ce}`).toLowerCase(), De = Y.displayNumber ?? ce + 1, Je = Y.displayName || `Screen ${De}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${re === ke ? "active" : ""}`,
            onClick: () => se(ke),
            title: `Pin directly to ${Je}`,
            children: [
              "🖥️ ",
              De
            ]
          },
          ke
        );
      }),
      re === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          z.map((Y, ce) => {
            const ke = (Y.displayId ?? `mon-${ce}`).toLowerCase(), De = Y.displayNumber ?? ce + 1, Je = Y.displayName || `Screen ${De}`, ot = q === ke;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${ot ? "active" : ""} ${X && ot ? "is-override" : ""}`,
                onClick: () => {
                  O == null || O(T, t + r, ke);
                },
                title: `Punch ${Je} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    De
                  ] }),
                  ot && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: X ? "✋" : "⚡" })
                ]
              },
              `punch-${ke}`
            );
          }),
          X && y && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                y == null || y(T, t + r);
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
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: re === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : re === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : re === "pip" ? `🪟 PiP MODE: ${Ue.toUpperCase()} (HERO)` : `${X ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${Ue.toUpperCase()}` }),
      X && re === "director" && y && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => y == null ? void 0 : y(T, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    Ge && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: x,
        src: Ge,
        className: "feed-video-element",
        style: {
          opacity: jt && ze === "A" ? 1 : 0,
          zIndex: ze === "A" ? 3 : 1,
          pointerEvents: ze === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ze === "A",
        preload: "auto",
        muted: ze !== "A" || al().isMuted,
        onCanPlay: () => {
          Ne(), o && ze === "A" && x.current && x.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ze === "A" && (W.current = !1, zt(!0), vt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a));
        },
        onWaiting: () => {
          ze === "A" && vt(!0);
        },
        onTimeUpdate: () => {
          var Y;
          ze === "A" && (!jt && ((Y = x.current) == null ? void 0 : Y.currentTime) > 0 && (W.current = !1, zt(!0), vt(!1), x.current && (x.current.defaultPlaybackRate = a, x.current.playbackRate = a)), at());
        },
        onError: () => {
          ze === "A" && (W.current = !1, vt(!1), zt(!1));
        },
        onEnded: () => {
          ze === "A" && He();
        }
      }
    ),
    $t && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: C,
        src: $t,
        className: "feed-video-element",
        style: {
          opacity: jt && ze === "B" ? 1 : 0,
          zIndex: ze === "B" ? 3 : 1,
          pointerEvents: ze === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ze === "B",
        preload: "auto",
        muted: ze !== "B" || al().isMuted,
        onCanPlay: () => {
          Ne(), o && ze === "B" && C.current && C.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ze === "B" && (W.current = !1, zt(!0), vt(!1), C.current && (C.current.defaultPlaybackRate = a, C.current.playbackRate = a));
        },
        onWaiting: () => {
          ze === "B" && vt(!0);
        },
        onTimeUpdate: () => {
          var Y;
          ze === "B" && (!jt && ((Y = C.current) == null ? void 0 : Y.currentTime) > 0 && (W.current = !1, zt(!0), vt(!1), C.current && (C.current.defaultPlaybackRate = a, C.current.playbackRate = a)), at());
        },
        onError: () => {
          ze === "B" && (W.current = !1, vt(!1), zt(!1));
        },
        onEnded: () => {
          ze === "B" && He();
        }
      }
    ),
    re !== "split" && re !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: jt ? 0 : 2 },
        children: xt ? /* @__PURE__ */ s.jsx(fp, { isPlaying: o }) : pt && pt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: pt,
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
    re === "split" && ee && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        pt && pt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: pt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        un && un !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: un, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    re === "pip" && ee && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (Y) => {
          Y.stopPropagation(), ie((ce) => !ce);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              F.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          un && un !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: un, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (re === "canvas" || re === "all-displays") && ee && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: Le, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: je.width ? `${je.width}px` : "92%",
            height: je.height ? `${je.height}px` : "auto",
            aspectRatio: `${Ae.totalWidth} / ${Ae.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: z.map((Y, ce) => {
            const ke = Cx(Y, Ae), De = (Y.displayId ?? Y.DisplayId ?? `mon-${ce}`).toLowerCase(), Je = fe[De] || (De === q ? pt : null), ot = !!(Y.isPrimary ?? Y.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${ot ? "is-primary" : ""}`,
                style: {
                  left: `${ke.leftPct}%`,
                  top: `${ke.topPct}%`,
                  width: `${ke.widthPct}%`,
                  height: `${ke.heightPct}%`
                },
                onClick: (Ye) => {
                  Ye.stopPropagation(), w ? w(De) : se(De);
                },
                title: `Display ${ce + 1} (${Y.width || 1920}x${Y.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      ot ? "★ " : "",
                      "🖥 ",
                      ce + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: Y.displayName || Y.DisplayName || De.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      Y.width || 1920,
                      "x",
                      Y.height || 1080
                    ] }),
                    w && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (Ye) => {
                          Ye.stopPropagation(), w(De);
                        },
                        title: `Open Display ${ce + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Je && Je !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Je,
                      className: "canvas-frame-img",
                      alt: De
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      Y.displayName || De.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              De
            );
          })
        }
      )
    ] }),
    Et && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          _,
          " • ",
          q.toUpperCase()
        ] })
      ] })
    ] }) }),
    re === "director" && J && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        q.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        gt(J.startEpochMs ?? J.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        gt(J.endEpochMs ?? J.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    ee && re !== "canvas" && /* @__PURE__ */ s.jsx(
      wx,
      {
        displays: z,
        activeDisplayId: q,
        mode: X ? "MANUAL" : "AUTO",
        activeTimeRange: J ? `${gt(J.startEpochMs ?? J.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${gt(J.endEpochMs ?? J.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (Y) => {
          O && O(T, t + r, Y), se(Y);
        }
      }
    ),
    S && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      _
    ] }) })
  ] });
}
const ja = 2200, Ca = 400;
function Sx({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], v = d.epochMs + Zo, g = e - v;
      if (g >= 0 && g <= ja)
        return {
          ...d,
          elapsed: g
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let i = 1;
  if (o.elapsed > ja - Ca) {
    const c = (o.elapsed - (ja - Ca)) / Ca;
    i = Math.max(0, 1 - c);
  }
  if (i <= 0.05) return null;
  if (r === "CAPTION") {
    const c = gp(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const a = mp(o.keyCombination);
  return a.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: a.map((c, d) => /* @__PURE__ */ s.jsxs(Si.Fragment, { children: [
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
function kp({ isOpen: e, onClose: t }) {
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
const Vd = (e, t = 30) => {
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
  onZoomReset: g,
  onFitRange: m,
  onJumpViewportTo: k,
  viewportStartMs: S = 0,
  onViewportStartChange: b,
  playheadMs: O = 0,
  playheadEpochMs: y = 0,
  setPlayheadMs: p,
  inPointMs: f = 0,
  setInPointMs: w,
  outPointMs: I = 36e5,
  setOutPointMs: j,
  recordingSegments: N = {},
  globalGaps: x = [],
  onExport: C,
  isPlaying: M,
  setIsPlaying: D,
  isLooping: K = !0,
  setIsLooping: $,
  playbackSpeed: W,
  setPlaybackSpeed: Z,
  keystrokeMode: V = "BURN_IN",
  onChangeKeystrokeMode: A,
  keystrokes: T = [],
  showRulerKeystrokes: _ = !1,
  onToggleRulerKeystrokes: z,
  directorPlan: ee,
  onOverrideDisplay: U,
  onSplitDirectorSegment: ge,
  onChangeDirectorSegmentDisplay: oe,
  onResetDirectorSegmentToAuto: re
}) {
  var un, Ee, mt;
  const [se, Be] = u.useState(!1), H = M !== void 0 ? M : se, te = u.useCallback((Ne) => {
    const we = typeof Ne == "function" ? Ne(H) : Ne;
    D ? D(we) : Be(we), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: we } }));
  }, [H, D]), [ie, J] = u.useState(!0), q = K !== void 0 ? K : ie, Ce = $ || J, [Ue, F] = u.useState(1), X = W !== void 0 ? W : Ue, fe = Z || F, [ve, Le] = u.useState(null), [je, le] = u.useState(!1), [Ae, pe] = u.useState(x), be = ((un = t == null ? void 0 : t.displays) == null ? void 0 : un.length) > 1 || ((mt = (Ee = t == null ? void 0 : t.topology) == null ? void 0 : Ee.displays) == null ? void 0 : mt.length) > 1, [We, Oe] = u.useState(() => {
    if (!be) return "mon-0";
    if (n) return n;
    try {
      const Ne = localStorage.getItem("itb_spotlight_viewmode");
      if (Ne) return Ne;
    } catch {
    }
    return "canvas";
  }), xe = u.useCallback((Ne) => {
    Oe((we) => {
      const He = typeof Ne == "function" ? Ne(we) : Ne;
      try {
        localStorage.setItem("itb_spotlight_viewmode", He);
      } catch {
      }
      return He;
    });
  }, []), [xt, ze] = u.useState(!1);
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
          const Ne = localStorage.getItem("itb_spotlight_viewmode");
          Oe(Ne || "canvas");
        } catch {
          Oe("canvas");
        }
    }
  }, [e, n, be, t == null ? void 0 : t.id]);
  const Bt = u.useRef(null), Ge = u.useRef(d);
  Ge.current = d;
  const ft = u.useRef(S);
  ft.current = S;
  const $t = u.useRef(c);
  $t.current = c;
  const Tt = u.useRef(t && t.id);
  u.useEffect(() => {
    var Ne, we, He;
    t && t.id && Tt.current !== t.id && (Tt.current = t.id, fe(1), ((Ne = t.displays) == null ? void 0 : Ne.length) > 1 || ((He = (we = t.topology) == null ? void 0 : we.displays) == null ? void 0 : He.length) > 1 || xe("mon-0"));
  }, [t, fe]);
  const Gn = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Ne = Bt.current;
    if (!Ne || !v || !b) return;
    const we = (He) => {
      He.preventDefault(), He.stopPropagation();
      const at = He.ctrlKey || He.shiftKey, Et = Ge.current, Y = ft.current, ce = $t.current || 36e5;
      if (at) {
        const ke = Math.abs(He.deltaX) > Math.abs(He.deltaY) ? He.deltaX : He.deltaY;
        if (ke === 0) return;
        const De = ce / Et, Je = Math.max(0, ce - De), ot = De * 0.08 * (ke > 0 ? 1 : -1), Ye = Math.max(0, Math.min(Je, Y + ot));
        ft.current = Ye, b(Ye);
      } else {
        if (He.deltaY === 0) return;
        const De = He.deltaY < 0 ? 1.25 : 0.8, Je = Ne.getBoundingClientRect(), ot = Je.left + 150, Ye = Je.right - 58, Ke = Math.max(100, Ye - ot);
        let Xe = 0.5;
        He.clientX >= ot && He.clientX <= Ye ? Xe = (He.clientX - ot) / Ke : Je.width > 0 && (Xe = Math.max(0, Math.min(1, (He.clientX - Je.left) / Je.width)));
        const it = Math.max(32, ce / 2e3), Nt = Math.max(1, Math.min(it, Math.round(Et * De * 100) / 100));
        if (Nt === Et) return;
        const Pt = ce / Et, mn = ce / Nt, Yn = Y + Xe * Pt - Xe * mn, ks = Math.max(0, ce - mn), Zt = Math.max(0, Math.min(ks, Yn));
        Ge.current = Nt, ft.current = Zt, b(Zt), v(Nt);
      }
    };
    return Ne.addEventListener("wheel", we, { passive: !1, capture: !0 }), () => Ne.removeEventListener("wheel", we, { capture: !0 });
  }, [e, t, v, b]);
  const Ve = u.useCallback(() => {
    g ? g() : (ft.current = 0, Ge.current = 1, b == null || b(0), v == null || v(1));
  }, [g, b, v]), wt = u.useCallback((Ne, we) => {
    if (m)
      m(Ne, we);
    else {
      const He = Math.max(1e3, we - Ne), at = Math.max(500, He * 0.05), Et = Math.max(0, Ne - at), ce = Math.min(c, we + at) - Et, ke = Math.max(32, c / 2e3), De = Math.max(1, Math.min(ke, Number((c / ce).toFixed(1)))), Je = c / De, ot = Math.max(0, Math.min(Et, c - Je));
      ft.current = ot, Ge.current = De, b == null || b(ot), v == null || v(De);
    }
  }, [m, c, b, v]), Lt = u.useCallback((Ne, we = "center") => {
    if (k)
      k(Ne, we);
    else {
      if (Ne == null) return;
      const He = Ge.current || 1, at = c / Math.max(1, He), Et = we === "start" ? at / 4 : at * 0.75, Y = Math.max(0, Math.min(Ne - Et, c - at));
      ft.current = Y, b == null || b(Y);
    }
  }, [k, c, b]), jt = u.useCallback(() => {
    te((Ne) => !Ne);
  }, [te]), zt = u.useCallback(async () => {
    var at;
    if (!t || Math.abs(I - f) < 1e3) return;
    const Ne = (V || "NONE").toUpperCase().replace("-", "_");
    let we;
    Ne === "NONE" || Ne === "OFF" ? we = "None" : Ne === "CAPTION" ? we = "Caption" : we = "BurnIn";
    const He = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: i + Math.round(f),
      outEpochMs: i + Math.round(I),
      keystrokeMode: we,
      layoutMode: be ? We : "mon-0",
      targetDisplayId: !be || We === "mon-0" || We === "mon-1" || We.startsWith("mon-") ? be ? We : "mon-0" : null,
      isPipSwapped: xt,
      directorSegments: be ? (ee == null ? void 0 : ee.segments) || ((at = t == null ? void 0 : t.directorPlan) == null ? void 0 : at.segments) || [] : []
    };
    try {
      C ? await C(He) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(He)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(He)
      });
    } catch (Et) {
      console.warn("[SoloSpotlightModal] Export trigger error:", Et);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, f, I, i, C, V, We, xt, ee]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Ne = (we) => {
      if ((we.ctrlKey || we.metaKey) && (we.key === "e" || we.key === "E")) {
        we.preventDefault(), zt();
        return;
      }
      if (we.key === "?" || we.shiftKey && we.code === "Slash") {
        we.preventDefault(), le((He) => !He);
        return;
      }
      if (je) {
        we.key === "Escape" && le(!1);
        return;
      }
      if (we.key === "Escape" || we.code === "Escape") {
        we.preventDefault(), we.stopPropagation(), o == null || o();
        return;
      }
      if (we.code === "Space") {
        we.preventDefault(), jt();
        return;
      }
      if (we.code === "KeyI") {
        we.preventDefault(), w(Math.max(0, Math.min(O, I - 1e3)));
        return;
      }
      if (we.code === "KeyO") {
        we.preventDefault(), j(Math.min(c, Math.max(O, f + 1e3)));
        return;
      }
      if (we.code === "ArrowLeft" || we.code === "ArrowRight") {
        we.preventDefault(), te(!1);
        const He = we.code === "ArrowLeft";
        let at;
        if (we.ctrlKey || we.metaKey)
          at = 33;
        else if (we.shiftKey)
          at = 5e3;
        else {
          const Et = Math.max(1, d);
          at = Math.max(33, Math.round(1e3 / Et));
        }
        p((Et) => {
          const Y = He ? Et - at : Et + at;
          return Math.max(0, Math.min(c, Y));
        });
        return;
      }
      if (we.key === "ArrowDown") {
        we.preventDefault();
        const He = r.findIndex((at) => at.id === t.id);
        if (He !== -1) {
          const at = (He + 1) % r.length;
          l(r[at].id);
        }
        return;
      }
      if (we.key === "ArrowUp") {
        we.preventDefault();
        const He = r.findIndex((at) => at.id === t.id);
        if (He !== -1) {
          const at = (He - 1 + r.length) % r.length;
          l(r[at].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Ne, { capture: !0 }), () => window.removeEventListener("keydown", Ne, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    O,
    f,
    I,
    c,
    d,
    w,
    j,
    p,
    zt,
    jt,
    te,
    je
  ]);
  const pn = r.findIndex((Ne) => Ne.id === (t && t.id)), vt = r[pn - 1], pt = r[pn + 1];
  if (!e || !t) return null;
  const ln = y > 0 ? y : Math.round(i + O);
  return Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      ve && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${ve.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          ve.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          ve.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          ve.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: ve.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Vd(I - f),
            " (",
            gt(i + f, a),
            " → ",
            gt(i + I, a),
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
            playheadMs: O,
            setPlayheadMs: p,
            isPlaying: H,
            setIsPlaying: te,
            playbackSpeed: X,
            timeMode: a,
            inPointMs: f,
            outPointMs: I,
            isLooping: q,
            recordingSegments: N,
            globalGaps: Ae,
            showWatermark: !0,
            directorPlan: ee || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: U,
            onResetOverride: re,
            viewMode: We,
            onViewModeChange: xe,
            isPipSwapped: xt,
            onPipSwapChange: ze
          }
        ),
        /* @__PURE__ */ s.jsx(
          Sx,
          {
            currentEpochMs: ln,
            keystrokes: T,
            keystrokeMode: V
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
              onClick: (Ne) => {
                Ne.preventDefault(), Ne.stopPropagation(), o == null || o();
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
              disabled: !vt,
              onClick: () => vt && l(vt.id),
              title: vt ? `Previous: ${vt.displayName || vt.roleAlias || vt.hostname || vt.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            pn + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !pt,
              onClick: () => pt && l(pt.id),
              title: pt ? `Next: ${pt.displayName || pt.roleAlias || pt.hostname || pt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${H ? "is-playing-dimmed" : ""}`, ref: Bt, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Vd(I - f) })
            ] }),
            (() => {
              const Ne = We === "mon-0" ? "SCREEN 1" : We === "mon-1" ? "SCREEN 2" : We.startsWith("mon-") ? `SCREEN ${parseInt(We.slice(4)) + 1}` : We.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: zt,
                  title: `Export Selected Cut Window as ${Ne} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: We === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Ne})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            pp,
            {
              activeStationId: t.id,
              isPlaying: H,
              setIsPlaying: jt,
              isLooping: q,
              setIsLooping: Ce,
              playbackSpeed: X,
              onChangeSpeed: fe,
              baseEpochMs: i,
              timeMode: a,
              totalDurationMs: c,
              inPointMs: f,
              setInPointMs: w,
              outPointMs: I,
              setOutPointMs: j,
              onSetInPoint: () => w(Math.max(0, Math.min(O, I - 1e3))),
              onSetOutPoint: () => j(Math.min(c, Math.max(O, f + 1e3))),
              onStepFrameBackward: () => {
                te(!1), p((Ne) => Math.max(0, Ne - 33));
              },
              onStepFrameForward: () => {
                te(!1), p((Ne) => Math.min(c, Ne + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: gt(i + O, a) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          yp,
          {
            stations: Gn,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: i,
            timeMode: a,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: v,
            onZoomReset: Ve,
            onFitRange: wt,
            onJumpViewportTo: Lt,
            viewportStartMs: S,
            onViewportStartChange: b,
            playheadMs: O,
            setPlayheadMs: (Ne) => {
              te(!1), p(Ne);
            },
            inPointMs: f,
            setInPointMs: w,
            outPointMs: I,
            setOutPointMs: j,
            recordingSegments: N,
            onExport: zt,
            onEstimateLoaded: (Ne) => {
              Ne != null && Ne.removedGlobalGaps && pe(Ne.removedGlobalGaps);
            },
            keystrokeMode: V,
            onChangeKeystrokeMode: A,
            keystrokes: T,
            showKeystrokes: _,
            showRulerKeystrokes: _,
            onToggleRulerKeystrokes: z,
            onSplitDirectorSegment: ge,
            onChangeDirectorSegmentDisplay: oe,
            onResetDirectorSegmentToAuto: re
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        kp,
        {
          isOpen: je,
          onClose: () => le(!1)
        }
      )
    ] }),
    document.body
  );
}
function wp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), i = u.useRef(!1), a = u.useRef(0), [c, d] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [v, g] = u.useState(() => {
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
          const x = await N.json(), C = Array.isArray(x) ? x : [];
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
    let N = !0, x = null;
    const C = () => {
      if (!N) return;
      let D = 2500;
      typeof document < "u" && document.hidden ? D = 3e4 : a.current > 0 && (D = Math.min(3e4, 2500 * Math.pow(2, Math.min(a.current, 4)))), x = setTimeout(async () => {
        await m(), C();
      }, D);
    }, M = () => {
      !document.hidden && N && (clearTimeout(x), a.current = 0, m().then(C));
    };
    return document.addEventListener("visibilitychange", M), m().then(C), () => {
      N = !1, clearTimeout(x), document.removeEventListener("visibilitychange", M);
    };
  }, [m]), u.useEffect(() => {
    const N = () => {
      g(!0), m();
    };
    return window.addEventListener("open-export-monitor", N), () => window.removeEventListener("open-export-monitor", N);
  }, [m]), u.useEffect(() => {
    if (!v || c) return;
    const N = (x) => {
      o.current && !o.current.contains(x.target) && !x.target.closest(".export-floating-hud") && g(!1);
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [v, c]);
  const k = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && k)
    return null;
  const S = t.filter((N) => N.status === "Processing" || N.status === "Queued"), b = t.filter((N) => N.status === "Completed" || N.isCompleted), O = () => {
    d((N) => {
      const x = !N;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(x));
      } catch {
      }
      return x;
    });
  }, y = () => {
    g(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, p = (N, x) => {
    x.stopPropagation(), !(!N || r.has(N)) && (l((C) => new Set(C).add(N)), setTimeout(() => {
      n((C) => {
        const M = C.filter((D) => (D.jobId || D.id) !== N);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: M })), M;
      }), l((C) => {
        const M = new Set(C);
        return M.delete(N), M;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${N}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}`, { method: "DELETE" })).catch((C) => console.warn("[ExportJobMonitor] Dismiss failed:", C)));
  }, f = async (N, x) => {
    x.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${N}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}/bookmark`, { method: "POST" })), m();
    } catch (C) {
      console.warn("[ExportJobMonitor] Bookmark failed:", C);
    }
  }, w = (N, x) => {
    x.stopPropagation();
    const C = N.networkFolderPath || (N.outputFilePath ? N.outputFilePath.substring(0, N.outputFilePath.lastIndexOf("\\")) : "");
    C && (navigator.clipboard.writeText(C), alert(`UNC Directory Path copied to clipboard:
${C}`));
  }, I = (N) => {
    const x = N.jobId || N.id, C = `/api/v1/extractor-advanced/jobs/${x}/download`, M = document.createElement("a");
    M.href = C, M.download = N.fileName || `archive_${x}.tar`, document.body.appendChild(M), M.click(), document.body.removeChild(M), setTimeout(m, 1e3);
  }, j = (N) => {
    if (!N || N <= 0) return "0 B";
    const x = N / (1024 * 1024);
    return x >= 1e3 ? `${(x / 1024).toFixed(2)} GB` : `${x.toFixed(1)} MB`;
  };
  return t.length === 0 && !v ? null : Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !v && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${S.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => g(!0),
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
      v && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && g(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (N) => N.stopPropagation(), children: [
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
                onClick: O,
                title: c ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: c ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: y, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((N) => {
          const x = N.status === "Completed" || N.isCompleted, C = N.status === "Failed" || N.isFailed, M = N.status === "Processing" || N.status === "Queued", D = N.jobId || N.id, K = r.has(D), $ = x ? 100 : Math.round(N.progressPercent || N.progressPercentage || N.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${N.status.toLowerCase()} ${N.isBookmarked ? "is-bookmarked" : ""} ${K ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${N.status.toLowerCase()}`, children: x ? "READY" : N.status }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: N.fileName, children: N.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (W) => p(D, W),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                M && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: N.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      $,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, $)}%` } }) }),
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
                x && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
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
                x && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${N.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (W) => f(D, W),
                        title: N.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: N.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (W) => w(N, W),
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
                      onClick: () => I(N),
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
    const d = (g) => {
      g.key === "Escape" && (t == null || t());
    }, v = (g) => {
      l.current && !l.current.contains(g.target) && (t == null || t());
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
  const d = (N) => {
    const x = Math.round(N * a);
    return x - x % 2;
  }, v = (N, x) => {
    const C = Math.round(N * x / 2073600 * 6 * 10) / 10, M = Math.round(C * 60 / 8 * 10) / 10;
    return `~${C} Mbps (~${M} MB/min)`;
  }, g = [
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
  ], [m, k] = u.useState("BurnIn"), [S, b] = u.useState(r.resolution || "NATIVE"), [O, y] = u.useState(!1);
  if (!e) return null;
  const p = async () => {
    y(!0);
    try {
      await n(m, S), t();
    } finally {
      y(!1);
    }
  }, f = (r.layout || "DIRECTOR").toUpperCase(), w = r.stationsCount || 1, I = r.audioSegmentsCount || 1, j = g.find((N) => N.id === S) || g[0];
  return Ps.createPortal(
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
              f,
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
              w,
              " WORKSTATION",
              w > 1 ? "S" : ""
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUDIO MASTER MIX:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: I > 1 ? `DYNAMIC ROUTING (${I} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK TRANSITIONS)" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: g.map((N) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${S === N.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: N.id,
              checked: S === N.id,
              onChange: () => b(N.id)
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
                onChange: () => k("BurnIn")
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: O, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: p, disabled: O, children: O ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Ax(e, t, n, r, l = null) {
  const [o, i] = u.useState([]), [a, c] = u.useState({}), [d, v] = u.useState(!1), g = u.useRef(o);
  g.current = o;
  const m = u.useCallback(async () => {
    if (isNaN(e)) return;
    const b = e + t;
    v(!0);
    try {
      const O = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(b),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), y = await fetch(`/api/v1/extractor-advanced/stations?${O.toString()}`);
      if (y.ok) {
        const p = y.headers.get("content-type");
        if (p && p.includes("application/json")) {
          const f = await y.json(), I = (Array.isArray(f) ? f : f.stations || f.items || []).filter((j) => (j.recordingsCount || (j.segments ? j.segments.length : 0)) > 0).map((j) => {
            var N, x;
            return {
              id: String(j.id || j.stationId || j.agentId || j.hostname),
              hostname: j.hostname || "Station",
              roleAlias: j.roleAlias || null,
              roleHistory: j.roleHistory || [],
              displayName: j.displayName || j.roleAlias || j.hostname || "Station",
              isOnline: j.isOnline !== void 0 ? j.isOnline : !0,
              recordingsCount: j.recordingsCount || 0,
              segments: j.segments || [],
              displays: j.displays || j.Displays || ((N = j.displayTopology) == null ? void 0 : N.displays) || ((x = j.DisplayTopology) == null ? void 0 : x.Displays) || [],
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
            if (!j || j.length === 0) return I;
            const N = new Map(j.map((M) => [M.id, M]));
            let x = j.length !== I.length;
            const C = I.map((M) => {
              const D = N.get(M.id);
              return D ? D.isOnline === M.isOnline && D.displayName === M.displayName && D.roleAlias === M.roleAlias && D.feedSpec === M.feedSpec && D.recordingsCount === M.recordingsCount && D.fps === M.fps ? D : (x = !0, { ...D, ...M }) : (x = !0, M);
            });
            return x ? C : j;
          });
        }
      }
    } catch (O) {
      console.warn("[useStudioData] Failed fetching active stations:", O);
    } finally {
      v(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    m();
  }, [m]);
  const k = u.useMemo(() => {
    const b = /* @__PURE__ */ new Set();
    return o.forEach((O) => {
      O.id && b.add(O.id), O.hostname && b.add(O.hostname);
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
          const f = await p.json() || {}, w = {};
          (g.current || []).forEach((I) => {
            const j = f[I.id] || f[I.hostname] || f[I.displayName] || [];
            w[I.id] = j, w[I.hostname] = j;
          }), Object.keys(f).forEach((I) => {
            w[I] || (w[I] = f[I]);
          }), c(w);
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
    let b = 1 / 0, O = -1 / 0;
    o.forEach((w) => {
      (a[w.id] || a[w.hostname] || w.segments || []).forEach((j) => {
        const N = j.startEpochMs ?? j.startEpoch ?? 0, x = j.endEpochMs ?? j.endEpoch ?? 0;
        N > 0 && N < b && (b = N), x > 0 && x > O && (O = x);
      });
    });
    let y = 1 / 0, p = -1 / 0;
    l && (a[l] || []).forEach((I) => {
      const j = I.startEpochMs ?? I.startEpoch ?? 0, N = I.endEpochMs ?? I.endEpoch ?? 0;
      j > 0 && j < y && (y = j), N > 0 && N > p && (p = N);
    });
    const f = (w) => w === 1 / 0 || w === -1 / 0 ? null : Math.max(0, Math.min(t, w - e));
    return {
      globalFirstMs: f(b),
      globalLastMs: f(O),
      currentFirstMs: f(y),
      currentLastMs: f(p)
    };
  }, [o, a, l, e, t]);
  return {
    allStations: o,
    setAllStations: i,
    recordingSegments: a,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: m,
    movieBoundaries: S
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
  isGridMode: g = !1
}) {
  const [m, k] = u.useState(a), [S, b] = u.useState(c), [O, y] = u.useState(d), [p, f] = u.useState(v), w = u.useRef(null), I = u.useRef(null), j = o || l, N = u.useMemo(() => j ? i[j.id] || j.segments || [] : [], [j, i]), x = N.some((K) => {
    const $ = K.startEpochMs ?? K.startEpoch ?? 0, W = K.endEpochMs ?? K.endEpoch ?? 0, Z = e + m;
    return Z >= $ && Z <= W;
  }), C = !!(!g && j && x);
  u.useEffect(() => {
    k((K) => K < t ? t : K > n ? (b(!1), n) : K);
  }, [t, n]);
  const M = u.useCallback((K) => {
    w.current || (w.current = K);
    const $ = (K - w.current) * p, W = Math.min($, 250 * p);
    w.current = K, k((Z) => {
      let V = Z + W;
      if (r && r.length > 0) {
        const A = e + V, T = r.find((_) => A >= _.startEpochMs && A < _.endEpochMs);
        T && (V = T.endEpochMs - e);
      }
      return V >= n && (O ? V = t : (b(!1), V = n)), V;
    }), S && (!C || g) && (I.current = requestAnimationFrame(M));
  }, [S, O, t, n, r, e, C, p, g]);
  u.useEffect(() => (S && (!C || g) ? (w.current = performance.now(), I.current = requestAnimationFrame(M)) : (I.current && cancelAnimationFrame(I.current), w.current = null), () => {
    I.current && cancelAnimationFrame(I.current);
  }), [S, M, C, g]);
  const D = u.useCallback(() => {
    if (S)
      b(!1);
    else {
      let K = m;
      const $ = e + K, W = r == null ? void 0 : r.find((Z) => $ >= Z.startEpochMs && $ < Z.endEpochMs);
      if (W)
        K = W.endEpochMs - e;
      else if (j && !x) {
        const Z = N.map((V) => ({ start: V.startEpochMs ?? V.startEpoch ?? 0, end: V.endEpochMs ?? V.endEpoch ?? 0 })).filter((V) => V.start > $).sort((V, A) => V.start - A.start)[0];
        Z && (K = Z.start - e);
      }
      K !== m && k(K), b(!0);
    }
  }, [S, m, e, r, j, x, N]);
  return {
    playheadMs: m,
    setPlayheadMs: k,
    isPlaying: S,
    setIsPlaying: b,
    isLooping: O,
    setIsLooping: y,
    playbackSpeed: p,
    setPlaybackSpeed: f,
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
  const v = Math.max(32, t / 2e3), g = t / l, m = u.useCallback((O, y = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const p = d.current, f = O - p;
    if (Math.abs(f) < 1) return;
    const w = performance.now(), I = (j) => {
      const N = j - w, x = Math.min(1, N / y);
      a(Math.round(p + f * $x(x))), x < 1 ? c.current = requestAnimationFrame(I) : c.current = null;
    };
    c.current = requestAnimationFrame(I);
  }, []), k = u.useCallback((O, y) => {
    const p = Math.max(1e3, y - O), f = Math.max(500, p * 0.05), w = Math.max(0, O - f), j = Math.min(t, y + f) - w, N = Math.max(1, Math.min(v, Number((t / j).toFixed(1)))), x = t / N, C = Math.max(0, Math.min(w, t - x));
    m(C), o(N);
  }, [t, v, m]), S = u.useCallback(() => {
    m(0), o(1);
  }, [m]), b = u.useCallback((O, y = "center") => {
    if (O == null) return;
    const p = y === "start" ? g / 4 : g * 0.75, f = Math.max(0, Math.min(O - p, t - g));
    m(f);
  }, [g, t, m]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    const O = e == null ? void 0 : e.current;
    if (!O) return;
    const y = (p) => {
      if (p.preventDefault(), p.stopPropagation(), p.ctrlKey || p.shiftKey) {
        const w = Math.abs(p.deltaX) > Math.abs(p.deltaY) ? p.deltaX : p.deltaY;
        if (w === 0) return;
        const I = t / l, j = Math.max(0, t - I), N = I * 0.08 * (w > 0 ? 1 : -1);
        a((x) => Math.max(0, Math.min(j, x + N)));
      } else {
        if (p.deltaY === 0) return;
        const I = p.deltaY < 0 ? 1.25 : 0.8, j = O.getBoundingClientRect(), N = Math.max(0, Math.min(j.width, p.clientX - j.left)), x = j.width > 0 ? N / j.width : 0.5;
        o((C) => {
          const M = Math.max(1, Math.min(v, Math.round(C * I * 100) / 100));
          if (M === C) return C;
          const D = t / C, K = t / M, W = i + x * D - x * K, Z = Math.max(0, t - K);
          return a(Math.max(0, Math.min(Z, W))), M;
        });
      }
    };
    return O.addEventListener("wheel", y, { passive: !1, capture: !0 }), () => O.removeEventListener("wheel", y, { capture: !0 });
  }, [e, t, l, i, v]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: i,
    setViewportStartMs: a,
    viewportDurationMs: g,
    animateViewportTo: m,
    fitRange: k,
    resetZoom: S,
    jumpViewportTo: b
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
  setOutPointMs: g,
  totalTimelineDurationMs: m,
  zoomLevel: k = 1,
  togglePlaySmart: S,
  onToggleHelpModal: b,
  onSplitDirectorAtPlayhead: O,
  isModalActive: y = !1
}) {
  u.useEffect(() => {
    const p = (f) => {
      const w = f.target;
      if (!(w.tagName === "INPUT" || w.tagName === "TEXTAREA" || w.tagName === "SELECT" || w.isContentEditable || w.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (f.key === "?" || f.shiftKey && f.code === "Slash") {
          f.preventDefault(), b == null || b();
          return;
        }
        if (!(y || t)) {
          if (f.code === "KeyI") {
            f.preventDefault(), d(Math.max(0, Math.min(i, v - 1e3)));
            return;
          }
          if (f.code === "KeyO") {
            f.preventDefault(), g(Math.min(m, Math.max(i, c + 1e3)));
            return;
          }
          if (f.code === "KeyS") {
            if (f.ctrlKey || f.metaKey) {
              f.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-save-now"));
              return;
            } else if (!f.altKey) {
              f.preventDefault(), O == null || O();
              return;
            }
          }
          if (f.code === "KeyZ" && (f.ctrlKey || f.metaKey)) {
            f.preventDefault(), f.shiftKey ? window.dispatchEvent(new CustomEvent("itb:studio-redo")) : window.dispatchEvent(new CustomEvent("itb:studio-undo"));
            return;
          }
          if (f.code === "KeyY" && (f.ctrlKey || f.metaKey)) {
            f.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-redo"));
            return;
          }
          if (f.code === "Space") {
            if (f.preventDefault(), !e && !t && r > 1) return;
            S();
            return;
          }
          if (f.key === "Home") {
            f.preventDefault(), a(c);
            return;
          }
          if (f.key === "End") {
            f.preventDefault(), a(v);
            return;
          }
          if (f.code === "ArrowLeft" || f.code === "ArrowRight") {
            f.preventDefault();
            const j = f.code === "ArrowLeft";
            let N;
            if (f.ctrlKey || f.metaKey)
              N = 33;
            else if (f.shiftKey)
              N = 5e3;
            else {
              const x = Math.max(1, k);
              N = Math.max(33, Math.round(1e3 / x));
            }
            a((x) => {
              const C = j ? x - N : x + N;
              return Math.max(0, Math.min(m, C));
            });
            return;
          }
          if (f.code === "ArrowDown" || f.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            f.preventDefault();
            const j = n.findIndex((N) => N.id === e);
            if (j === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (f.code === "ArrowDown") {
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
    g,
    m,
    k,
    S,
    b,
    O,
    y
  ]);
}
const Kd = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = $d(n, e), l = $d(t, e);
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
    const c = o.substring(0, 8), d = xc(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const i = r.replace(" ", "T"), a = new Date(i).getTime();
  return isNaN(a) ? Date.now() : a;
};
function Dx() {
  var Nl, Xt;
  const e = u.useMemo(() => xg() || {}, []), [t, n] = u.useState(() => {
    var L, P;
    return (L = e.timeRange) != null && L.startEpochMs && ((P = e.timeRange) != null && P.endEpochMs) ? e.timeRange : Kd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, i] = u.useState(e.keystrokeMode || "BURN_IN"), [a, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    ug().catch((L) => console.warn("[Studio] DST init error:", L));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Rl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), g = u.useMemo(() => d - v, [d, v]), m = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [k, S] = u.useState(e.selectedStationIds || []), [b, O] = u.useState(e.activeStationId || null), [y, p] = u.useState(null), [f, w] = u.useState(null), [I, j] = u.useState([]), [N, x] = u.useState(!1), [C, M] = u.useState(null), [D, K] = u.useState(() => {
    var L;
    return e.compositionScope || (((L = e.selectedStationIds) == null ? void 0 : L.length) > 1 ? "inter-station" : "intra-station");
  }), [$, W] = u.useState(() => {
    try {
      const L = localStorage.getItem("itb_composition_layout");
      if (L) return L;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), Z = u.useCallback((L) => {
    W((P) => {
      const me = typeof L == "function" ? L(P) : L;
      try {
        localStorage.setItem("itb_composition_layout", me);
      } catch {
      }
      return me;
    });
  }, []), [V, A] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [T, _] = u.useState(() => !!e.isPipSwapped), [z, ee] = u.useState(() => e.audioRoutingPlan || null), [U, ge] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [oe, re] = u.useState(!1), [se, Be] = u.useState(null), [H, te] = u.useState(() => e.canvasLayoutTimeline || null), [ie, J] = u.useState(0), q = u.useCallback((L) => {
    te((P) => {
      const me = [...(P == null ? void 0 : P.keyframes) || []], Re = me.findIndex((qe) => Math.abs(qe.timestampEpochMs - L) < 300);
      if (Re >= 0)
        return J(Re), P;
      const _e = me[ie] || me[0], Se = (_e == null ? void 0 : _e.layout) || se || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, de = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(L),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Se))
      }, Fe = [...me, de].sort((qe, kt) => qe.timestampEpochMs - kt.timestampEpochMs), Ze = Fe.findIndex((qe) => qe.timestampEpochMs === Math.round(L));
      return J(Ze >= 0 ? Ze : 0), {
        ...P || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: Fe
      };
    });
  }, [ie, se]), Ce = u.useCallback((L) => {
    te((P) => {
      if (!(P != null && P.keyframes) || P.keyframes.length <= 1) return P;
      const me = P.keyframes.filter((Re, _e) => _e !== L);
      return J((Re) => Math.max(0, Re - 1)), { ...P, keyframes: me };
    });
  }, []), Ue = u.useCallback((L, P) => {
    te((me) => {
      if (!(me != null && me.keyframes) || me.keyframes.length === 0) return me;
      const Re = Math.round(P), _e = typeof L == "number" && me.keyframes[L] ? L : me.keyframes.findIndex((Fe) => Fe.id === L);
      if (_e === -1) return me;
      const Se = [...me.keyframes];
      Se[_e] = {
        ...Se[_e],
        timestampEpochMs: Re
      }, Se.sort((Fe, Ze) => Fe.timestampEpochMs - Ze.timestampEpochMs);
      const de = Se.findIndex((Fe) => Fe.timestampEpochMs === Re);
      return de >= 0 && J(de), {
        ...me,
        keyframes: Se
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [F, X] = u.useState({}), fe = u.useCallback((L) => {
    X((P) => ({
      ...P,
      [L]: !(P[L] ?? !0)
    }));
  }, []), ve = u.useCallback((L) => {
    S((P) => P.filter((me) => me !== L)), b === L && O(null), y === L && p(null), te((P) => {
      if (!P || !P.keyframes) return P;
      const me = P.keyframes.map((Re) => {
        var _e;
        return {
          ...Re,
          layout: {
            ...Re.layout,
            placements: (((_e = Re.layout) == null ? void 0 : _e.placements) || []).filter((Se) => Se.stationId !== L)
          }
        };
      });
      return { ...P, keyframes: me };
    });
  }, [b, y]), Le = u.useCallback((L, P) => {
    L.preventDefault(), L.stopPropagation();
    const me = 195, Re = 110, _e = Math.min(L.clientX, window.innerWidth - me - 10), Se = Math.min(L.clientY, window.innerHeight - Re - 10);
    M({ x: _e, y: Se, station: P });
  }, []), je = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(m, e.inEpochMs - g)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(m, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, g, m, v]), le = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(je + 1e3, Math.min(m, e.outEpochMs - g)) : typeof e.outPointMs == "number" ? Math.max(je + 1e3, Math.min(m, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, g, m, v, t.durationMs, je]), Ae = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(m, e.playheadEpochMs - g)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(m, e.playheadMs)) : je, [e.playheadEpochMs, e.playheadMs, g, m, je]), [pe, be] = u.useState(je), [We, Oe] = u.useState(le), { allStations: xe, recordingSegments: xt, isLoadingStations: ze, movieBoundaries: Bt } = Ax(
    g,
    m,
    t,
    r,
    b
  ), Ge = u.useMemo(() => xe.find((L) => L.id === b) || null, [xe, b]), ft = u.useCallback((L, P) => {
    te((me) => {
      var kt, St;
      if (!me || !me.keyframes || me.keyframes.length === 0) return me;
      const Re = ie >= 0 && ie < me.keyframes.length ? ie : 0, _e = me.keyframes[Re], Se = ((kt = _e == null ? void 0 : _e.layout) == null ? void 0 : kt.placements) || [], de = (P || "mon-0").toLowerCase(), Fe = Se.findIndex((At) => At.stationId === L && (At.displayId || "mon-0").toLowerCase() === de);
      let Ze;
      if (Fe >= 0)
        Ze = Se.filter((At, sn) => sn !== Fe);
      else {
        const At = xe.find((Dr) => Dr.id === L), sn = ((St = At == null ? void 0 : At.displays) == null ? void 0 : St.find((Dr) => (Dr.displayId || "").toLowerCase() === de)) || { width: 1920, height: 1080 }, hs = sn.width || 1920, Qt = sn.height || 1080, on = hs / Qt, js = on >= 1 ? 640 : Math.round(360 * on), kl = on >= 1 ? Math.round(640 / on) : 360, fs = {
          stationId: L,
          displayId: de,
          label: `${(At == null ? void 0 : At.displayName) || L} - ${sn.displayName || de}`,
          x: 120 + Se.length * 40 % 800,
          y: 100 + Se.length * 40 % 500,
          width: js,
          height: kl,
          sourceWidth: hs,
          sourceHeight: Qt,
          nativeAspectRatio: on,
          aspectRatio: on,
          zIndex: Se.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ze = [...Se, fs];
      }
      const qe = [...me.keyframes];
      return qe[Re] = {
        ...qe[Re],
        layout: {
          ...qe[Re].layout,
          placements: Ze
        }
      }, { ...me, keyframes: qe };
    });
  }, [ie, xe]), $t = u.useMemo(() => !k || k.length === 0 ? [] : xe.filter((L) => k.includes(L.id)), [xe, k]), Tt = u.useMemo(() => xe.find((L) => L.id === y) || null, [xe, y]), Gn = !!(y && Tt), Ve = u.useRef("grid"), wt = u.useRef(null), {
    playheadMs: Lt,
    setPlayheadMs: jt,
    isPlaying: zt,
    setIsPlaying: pn,
    playbackSpeed: vt,
    setPlaybackSpeed: pt,
    isLooping: ln,
    setIsLooping: un,
    togglePlaySmart: Ee
  } = Rx({
    timelineBaseEpochMs: g,
    inPointMs: pe,
    outPointMs: We,
    globalGaps: I,
    activeStation: Ge,
    spotlightStation: Tt,
    recordingSegments: xt,
    initialPlayheadMs: Ae,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !b
  }), {
    zoomLevel: mt,
    setZoomLevel: Ne,
    viewportStartMs: we,
    setViewportStartMs: He,
    resetZoom: at,
    fitRange: Et,
    jumpViewportTo: Y
  } = Lx({
    containerRef: wt,
    totalTimelineDurationMs: m,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [ce, ke] = u.useState(!1), [De, Je] = u.useState(!1), [ot, Ye] = u.useState(!1), [Ke, Xe] = u.useState(!1), [it, Nt] = u.useState(
    !!(e.isWorkspaceActive && ((Nl = e.selectedStationIds) == null ? void 0 : Nl.length) > 0)
  ), [Pt, mn] = u.useState([]);
  u.useEffect(() => {
    const L = Gn && Tt || Ge, P = (L == null ? void 0 : L.hostname) || (L == null ? void 0 : L.displayName) || (L == null ? void 0 : L.id), me = (o || "NONE").toUpperCase().replace("-", "_");
    if (!P || !g || !(me !== "NONE" && me !== "OFF" || a)) {
      mn([]);
      return;
    }
    const _e = Math.max(0, g - 5e3), Se = g + m + 5e3, de = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(P)}&startEpoch=${_e}&endEpoch=${Se}`, { signal: de.signal }).then((Fe) => Fe.ok ? Fe.json() : []).then((Fe) => mn(Array.isArray(Fe) ? Fe : [])).catch((Fe) => {
      Fe.name !== "AbortError" && mn([]);
    }), () => de.abort();
  }, [Ge, Tt, Gn, g, m, o, a]), u.useEffect(() => {
    ze || (xe.length === 0 ? ((k.length > 0 || b || it) && (S([]), O(null), p(null), Nt(!1)), Xe(!0), x(!0)) : (x(!1), S((L) => {
      const P = L.filter((me) => xe.some((Re) => Re.id === me));
      return P.length !== L.length ? (P.length === 0 && (Nt(!1), Xe(!0)), P) : L;
    })));
  }, [ze, xe]);
  const Rn = u.useCallback((L) => {
    if (L === null) {
      pn(!1), pt(1), O(null);
      return;
    }
    L !== b && pt(1), O(L);
  }, [b, pn, pt]), Yn = u.useCallback((L, P = null) => {
    L !== b && pt(1), Ve.current = k.length <= 1 || b ? "spotlight" : "grid", O(L), p(L), w(P || null);
  }, [b, k.length, pt]), ks = u.useCallback(() => {
    p(null), w(null), Ve.current === "grid" && O(null);
  }, []), Zt = u.useMemo(() => {
    if (z != null && z.segments && z.segments.length > 0)
      return z;
    const L = k[0] || b || "mon-0";
    return {
      segments: [
        {
          startEpochMs: g,
          endEpochMs: g + m,
          sourceStationId: L
        }
      ]
    };
  }, [z, k, b, g, m]), qt = u.useCallback((L) => {
    ee((P) => {
      const me = P || Zt, Re = [...me.segments || []], _e = Re.findIndex((St) => {
        const At = St.startEpochMs ?? St.StartEpochMs ?? 0, sn = St.endEpochMs ?? St.EndEpochMs ?? 0;
        return L > At + 500 && L < sn - 500;
      });
      if (_e === -1) return P;
      const Se = Re[_e], de = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Fe = Se.endEpochMs ?? Se.EndEpochMs ?? 0, Ze = Se.sourceStationId ?? Se.SourceStationId ?? k[0], qe = { startEpochMs: de, endEpochMs: L, sourceStationId: Ze }, kt = { startEpochMs: L, endEpochMs: Fe, sourceStationId: Ze };
      return Re.splice(_e, 1, qe, kt), { ...me, segments: Re };
    });
  }, [Zt, k]), Ut = u.useCallback((L, P) => {
    ee((me) => {
      const Re = me || Zt, _e = (Re.segments || []).map((Se) => {
        const de = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Fe = Se.endEpochMs ?? Se.EndEpochMs ?? 0;
        return L >= de && L <= Fe ? { ...Se, sourceStationId: P } : Se;
      });
      return { ...Re, segments: _e };
    }), ge(!1);
  }, [Zt]), _s = u.useCallback((L, P) => {
    ee((me) => {
      const Re = me || Zt, _e = (Re.segments || []).map((Se) => {
        const de = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Fe = Se.endEpochMs ?? Se.EndEpochMs ?? 0;
        return L >= de && L <= Fe ? { ...Se, gain: P } : Se;
      });
      return { ...Re, segments: _e };
    });
  }, [Zt]), Xn = u.useCallback(() => {
    ge((L) => !L);
  }, []), [ss, $r] = u.useState({}), dn = u.useCallback((L) => {
    if (!L) return null;
    if (ss[L]) return ss[L];
    const P = xe.find((me) => me.id === L);
    return P != null && P.directorPlan ? P.directorPlan : {
      stationId: L,
      segments: [
        {
          startEpochMs: g,
          endEpochMs: g + m,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [ss, xe, g, m]), Me = u.useCallback((L, P) => {
    L && $r((me) => {
      const Re = me[L] || dn(L), _e = [...Re.segments || []], Se = _e.findIndex((sn) => {
        const hs = sn.startEpochMs ?? sn.StartEpochMs ?? 0, Qt = sn.endEpochMs ?? sn.EndEpochMs ?? 0;
        return P > hs + 500 && P < Qt - 500;
      });
      if (Se === -1) return me;
      const de = _e[Se], Fe = de.startEpochMs ?? de.StartEpochMs ?? 0, Ze = de.endEpochMs ?? de.EndEpochMs ?? 0, qe = de.targetDisplayId ?? de.TargetDisplayId ?? "mon-0", kt = !!(de.isManualOverride ?? de.IsManualOverride), St = { ...de, startEpochMs: Fe, endEpochMs: P, targetDisplayId: qe, isManualOverride: kt }, At = { ...de, startEpochMs: P, endEpochMs: Ze, targetDisplayId: qe, isManualOverride: kt };
      return _e.splice(Se, 1, St, At), { ...me, [L]: { ...Re, segments: _e } };
    });
  }, [dn]), Ie = u.useCallback((L, P, me) => {
    L && $r((Re) => {
      const _e = Re[L] || dn(L), Se = [..._e.segments || []];
      let de = Se.findIndex((Ze) => {
        const qe = Ze.startEpochMs ?? Ze.StartEpochMs ?? 0, kt = Ze.endEpochMs ?? Ze.EndEpochMs ?? 0;
        return P > qe && P < kt;
      });
      if (de === -1 && (de = Se.findIndex((Ze) => {
        const qe = Ze.startEpochMs ?? Ze.StartEpochMs ?? 0, kt = Ze.endEpochMs ?? Ze.EndEpochMs ?? 0;
        return P >= qe && P <= kt;
      })), de === -1) return Re;
      const Fe = Se[de];
      return Se[de] = { ...Fe, targetDisplayId: me, isManualOverride: !0 }, { ...Re, [L]: { ..._e, segments: Se } };
    });
  }, [dn]), ws = u.useCallback((L, P) => {
    if (!L) return;
    const me = xe.find((_e) => _e.id === L), Re = me == null ? void 0 : me.directorPlan;
    $r((_e) => {
      var hs;
      const Se = _e[L] || dn(L), de = [...Se.segments || []];
      let Fe = de.findIndex((Qt) => {
        const on = Qt.startEpochMs ?? Qt.StartEpochMs ?? 0, js = Qt.endEpochMs ?? Qt.EndEpochMs ?? 0;
        return P > on && P < js;
      });
      if (Fe === -1 && (Fe = de.findIndex((Qt) => {
        const on = Qt.startEpochMs ?? Qt.StartEpochMs ?? 0, js = Qt.endEpochMs ?? Qt.EndEpochMs ?? 0;
        return P >= on && P <= js;
      })), Fe === -1) return _e;
      const Ze = de[Fe], qe = Ze.startEpochMs ?? Ze.StartEpochMs ?? 0, kt = Ze.endEpochMs ?? Ze.EndEpochMs ?? 0, St = (qe + kt) / 2, At = (hs = Re == null ? void 0 : Re.segments) == null ? void 0 : hs.find((Qt) => {
        const on = Qt.startEpochMs ?? Qt.StartEpochMs ?? 0, js = Qt.endEpochMs ?? Qt.EndEpochMs ?? 0;
        return St >= on && St <= js;
      }), sn = At ? At.targetDisplayId ?? At.TargetDisplayId ?? "mon-0" : "mon-0";
      return de[Fe] = { ...Ze, targetDisplayId: sn, isManualOverride: !1 }, { ..._e, [L]: { ...Se, segments: de } };
    });
  }, [xe, dn]), Lr = u.useMemo(() => $t.map((L) => ({
    ...L,
    directorPlan: ss[L.id] || L.directorPlan || dn(L.id)
  })), [$t, ss, dn]), Nn = u.useMemo(() => Ge ? {
    ...Ge,
    directorPlan: ss[Ge.id] || Ge.directorPlan || dn(Ge.id)
  } : null, [Ge, ss, dn]), Or = u.useMemo(() => Tt ? {
    ...Tt,
    directorPlan: ss[Tt.id] || Tt.directorPlan || dn(Tt.id)
  } : null, [Tt, ss, dn]);
  Ox({
    activeStationId: b,
    spotlightStationId: y,
    timelineStations: Lr,
    selectedStationIdsCount: k.length,
    onSelectActiveStation: Rn,
    setPlaybackSpeed: pt,
    playheadMs: Lt,
    setPlayheadMs: jt,
    inPointMs: pe,
    setInPointMs: be,
    outPointMs: We,
    setOutPointMs: Oe,
    totalTimelineDurationMs: m,
    zoomLevel: mt,
    togglePlaySmart: Ee,
    onToggleHelpModal: () => Ye((L) => !L),
    onSplitDirectorAtPlayhead: () => {
      var P, me, Re;
      const L = b || (k.length === 1 ? k[0] : null);
      if (L) {
        const _e = xe.find((de) => de.id === L);
        (((P = _e == null ? void 0 : _e.displays) == null ? void 0 : P.length) > 1 || ((Re = (me = _e == null ? void 0 : _e.topology) == null ? void 0 : me.displays) == null ? void 0 : Re.length) > 1) && Me(L, g + Lt);
      }
    },
    isModalActive: ce || De || ot
  }), u.useEffect(() => {
    const L = g + pe, P = g + We, me = g + Lt;
    hp({
      timeRange: t,
      timeMode: r,
      inPointMs: pe,
      outPointMs: We,
      playheadMs: Math.round(Lt),
      inEpochMs: L,
      outEpochMs: P,
      playheadEpochMs: me,
      selectedStationIds: k,
      activeStationId: b,
      zoomLevel: mt,
      viewportStartMs: we,
      isWorkspaceActive: it,
      isLooping: ln,
      playbackSpeed: vt,
      keystrokeMode: o,
      showRulerKeystrokes: a,
      compositionScope: D,
      compositionLayout: $,
      isAutoDirectorEnabled: V,
      isPipSwapped: T,
      audioRoutingPlan: Zt,
      isAutoFollowAudio: U,
      canvasLayoutTimeline: H
    });
  }, [
    t,
    r,
    pe,
    We,
    Lt,
    k,
    b,
    mt,
    we,
    it,
    ln,
    vt,
    g,
    o,
    a,
    D,
    $,
    V,
    T,
    Zt,
    U,
    H
  ]);
  const xo = u.useCallback((L) => {
    var qe, kt;
    const P = Rl(L.startTime), me = Rl(L.endTime), Re = Math.max(0, me - P) || 144e5, _e = {
      start: L.startTime,
      end: L.endTime,
      durationMs: Re,
      startEpochMs: P,
      endEpochMs: me
    }, Se = Math.max(6e4, Math.round(Re * 0.05)), de = P - Se, Fe = Re + 2 * Se;
    if (n(_e), L.inEpochMs && L.outEpochMs) {
      const St = Math.max(0, Math.min(Fe, L.inEpochMs - de)), At = Math.max(St + 1e3, Math.min(Fe, L.outEpochMs - de)), sn = L.playheadEpochMs ? Math.max(0, Math.min(Fe, L.playheadEpochMs - de)) : St;
      be(St), Oe(At), jt(sn);
    } else {
      const St = typeof L.inPointMs == "number" ? L.inPointMs : Se, At = typeof L.outPointMs == "number" ? L.outPointMs : Se + Re, sn = typeof L.playheadMs == "number" ? L.playheadMs : St;
      be(Math.max(0, Math.min(Fe, St))), Oe(Math.max(0, Math.min(Fe, At))), jt(Math.max(0, Math.min(Fe, sn)));
    }
    const Ze = ((qe = L.selectedStationIds) == null ? void 0 : qe.length) > 0 ? L.selectedStationIds : ((kt = L.cutStationIds) == null ? void 0 : kt.length) > 0 ? L.cutStationIds : L.stationIds;
    if ((Ze == null ? void 0 : Ze.length) > 0) {
      S(Ze);
      const St = L.spotlightStationId || L.SpotlightStationId || null, At = L.activeStationId || L.ActiveStationId || null;
      St && Ze.includes(St) ? (O(St), p(St)) : At && Ze.includes(At) ? (O(At), p(null)) : (O(null), p(null));
    }
    L.keystrokeMode && i(L.keystrokeMode), Nt(!0), Xe(!1);
  }, []), fr = u.useCallback((L) => {
    const P = L.startEpochMs || Rl(L.start, null, r), me = L.endEpochMs || Rl(L.end, null, r), Re = Math.max(0, me - P) || 144e5, _e = Math.max(6e4, Math.round(Re * 0.05)), Se = P - _e, de = Re + 2 * _e;
    n({
      ...L,
      startEpochMs: P,
      endEpochMs: me,
      durationMs: Re
    }), x(!1), be(_e), Oe(_e + Re), jt(_e), te((Fe) => {
      if (!(Fe != null && Fe.keyframes) || Fe.keyframes.length === 0) return Fe;
      const Ze = Fe.keyframes.map((qe, kt) => kt === 0 ? { ...qe, timestampEpochMs: Se } : qe).filter((qe) => qe.timestampEpochMs >= Se && qe.timestampEpochMs <= Se + de);
      return { ...Fe, keyframes: Ze };
    }), ee((Fe) => {
      if (!(Fe != null && Fe.segments) || Fe.segments.length === 0) return Fe;
      if (!Fe.segments.some((qe) => {
        const kt = qe.startEpochMs ?? qe.StartEpochMs ?? 0;
        return (qe.endEpochMs ?? qe.EndEpochMs ?? 0) > Se && kt < Se + de;
      })) {
        const qe = k[0] || b || "station-0";
        return {
          segments: [
            {
              startEpochMs: Se,
              endEpochMs: Se + de,
              sourceStationId: qe
            }
          ]
        };
      }
      return Fe;
    }), $r({});
  }, [r, k, b]), Fs = u.useCallback(() => {
    if ($t.map((P) => P.id).length === 0) return alert("No active stations selected in timeline.");
    re(!0);
  }, [$t]), en = u.useCallback(async (L, P) => {
    var de, Fe, Ze, qe;
    const me = $t.map((kt) => kt.id);
    if (me.length === 0) return;
    let Re = L === "None" ? "None" : "BurnIn";
    const _e = P || "NATIVE", Se = ((de = Nn == null ? void 0 : Nn.displays) == null ? void 0 : de.length) > 1 || ((Ze = (Fe = Nn == null ? void 0 : Nn.topology) == null ? void 0 : Fe.displays) == null ? void 0 : Ze.length) > 1 ? ((qe = Nn == null ? void 0 : Nn.directorPlan) == null ? void 0 : qe.segments) || [] : [];
    try {
      const kt = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: me,
          inEpochMs: g + pe,
          outEpochMs: g + We,
          keystrokeMode: Re,
          resolution: _e,
          videoQuality: _e,
          compositionScope: D,
          layoutMode: "canvas",
          canvasLayout: se,
          canvasLayoutTimeline: H,
          isPipSwapped: T,
          isAutoDirectorEnabled: V,
          directorSegments: Se,
          audioRoutingSegments: Zt.segments || []
        })
      });
      if (!kt.ok) throw new Error(`HTTP ${kt.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (kt) {
      console.error("[Studio] Export failed:", kt), alert("Failed to launch background master MP4 export job.");
    }
  }, [$t, g, pe, We, D, se, H, T, V, Nn, Zt]), gn = u.useCallback(() => {
    yg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const L = Kd(), P = Math.max(6e4, Math.round(L.durationMs * 0.05));
    n(L), be(P), Oe(P + L.durationMs), jt(P), S([]), O(null), p(null), pn(!1), pt(1), i("BURN_IN"), at(), Nt(!1), Xe(!0);
  }, [at, pn, pt, jt]), tn = !it || k.length === 0, Yt = g + Lt;
  return u.useEffect(() => {
    const L = H == null ? void 0 : H.keyframes;
    if (!L || L.length === 0) return;
    let P = 0;
    for (let me = 0; me < L.length && L[me].timestampEpochMs <= Yt + 50; me++)
      P = me;
    P !== ie && J(P);
  }, [Yt, H == null ? void 0 : H.keyframes, ie]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        pg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: b,
          hideBackToGrid: $t.length <= 1,
          onResetActiveStation: () => Rn(null),
          onOpenRangeModal: () => ke(!0),
          onOpenBookmarksModal: () => Je(!0),
          onOpenHelpModal: () => Ye(!0),
          onToggleDrawer: () => Xe(!Ke),
          isInitialSetup: tn,
          selectedCount: k.length,
          totalCount: xe.length,
          onResetStudio: gn
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
              onClick: () => ke(!0),
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
        !tn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              $g,
              {
                activeStation: Nn,
                timelineStations: Lr,
                allStations: xe,
                onSelectActiveStation: Rn,
                onOpenSpotlight: Yn,
                onStationContextMenu: Le,
                onDeselectStation: ve,
                stationAutoDirectorMap: F,
                onToggleStationAutoDirector: fe,
                onOpenDrawer: () => Xe(!0),
                baseEpochMs: g,
                playheadMs: Lt,
                playheadEpochMs: Yt,
                timeMode: r,
                isPlaying: Gn ? !1 : zt,
                setIsPlaying: pn,
                totalDurationMs: m,
                inPointMs: pe,
                outPointMs: We,
                setPlayheadMs: jt,
                globalGaps: I,
                recordingSegments: xt,
                playbackSpeed: vt,
                onChangePlaybackSpeed: pt,
                keystrokeMode: o,
                keystrokes: Pt,
                directorPlan: Nn == null ? void 0 : Nn.directorPlan,
                onOverrideDisplay: Ie,
                onResetOverride: ws,
                compositionScope: D,
                onChangeCompositionScope: K,
                compositionLayout: $,
                onChangeCompositionLayout: Z,
                isAutoDirectorEnabled: V,
                onToggleAutoDirector: () => A((L) => !L),
                isPipSwapped: T,
                onTogglePipSwap: () => _((L) => !L),
                onUpdateCanvasLayout: Be,
                canvasLayoutTimeline: H,
                onUpdateCanvasLayoutTimeline: te,
                activeKfIndex: ie,
                setActiveKfIndex: J,
                isModalOpen: oe || ce || De || Gn || ot
              }
            ),
            /* @__PURE__ */ s.jsx(
              pp,
              {
                baseEpochMs: g,
                timeMode: r,
                totalDurationMs: m,
                playheadMs: Lt,
                setPlayheadMs: jt,
                inPointMs: pe,
                setInPointMs: be,
                outPointMs: We,
                setOutPointMs: Oe,
                activeStationId: b,
                isPlaying: zt,
                setIsPlaying: Ee,
                isLooping: ln,
                setIsLooping: un,
                playbackSpeed: vt,
                onChangeSpeed: pt,
                onSetInPoint: () => be(Math.max(0, Math.min(Lt, We - 1e3))),
                onSetOutPoint: () => Oe(Math.min(m, Math.max(Lt, pe + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: wt, children: /* @__PURE__ */ s.jsx(
            yp,
            {
              stations: Lr,
              activeStationId: b,
              onSelectActiveStation: (L) => Rn(k.length <= 1 ? L : L === b ? null : L),
              onStationContextMenu: Le,
              onDeselectStation: ve,
              stationAutoDirectorMap: F,
              onToggleStationAutoDirector: fe,
              baseEpochMs: g,
              timeMode: r,
              totalDurationMs: m,
              zoomLevel: mt,
              onZoomChange: Ne,
              onZoomReset: at,
              onFitRange: Et,
              onJumpViewportTo: Y,
              playheadMs: Lt,
              setPlayheadMs: jt,
              inPointMs: pe,
              setInPointMs: be,
              outPointMs: We,
              setOutPointMs: Oe,
              viewportStartMs: we,
              onViewportStartChange: He,
              onExport: Fs,
              recordingSegments: xt,
              movieBoundaries: Bt,
              onEstimateLoaded: (L) => (L == null ? void 0 : L.removedGlobalGaps) && j(L.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: i,
              keystrokes: Pt,
              showKeystrokes: a,
              showRulerKeystrokes: a,
              onToggleRulerKeystrokes: () => c((L) => !L),
              onSplitDirectorSegment: Me,
              onChangeDirectorSegmentDisplay: Ie,
              onResetDirectorSegmentToAuto: ws,
              audioRoutingPlan: Zt,
              onSplitAudioSegment: qt,
              onChangeAudioSegmentStation: Ut,
              onChangeAudioSegmentGain: _s,
              onFollowVisualFeed: Xn,
              isAutoFollowAudio: U,
              canvasLayoutTimeline: H,
              activeKfIndex: ie,
              onSelectKeyframe: (L, P) => {
                J(L), jt(Math.max(0, P - g));
              },
              onAddKeyframeAtEpoch: q,
              onDeleteKeyframe: Ce,
              onUpdateKeyframeEpoch: Ue,
              onToggleDisplayOnCanvas: ft,
              onUpdateAudioPlan: ee
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          gx,
          {
            isOpen: Ke || tn,
            onToggle: () => Xe(!Ke),
            onClose: () => Xe(!1),
            allStations: xe,
            selectedStationIds: k,
            onToggleStation: (L) => S((P) => P.includes(L) ? P.filter((me) => me !== L) : [...P, L]),
            onUpdateSelections: S,
            isInitialSetup: tn,
            isLoadingStations: ze,
            recordingSegments: xt,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              k.length > 0 && (O(null), p(null), Nt(!0), Xe(!1));
            },
            onOpenRangeModal: () => ke(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      vx,
      {
        isOpen: ce,
        onClose: () => ke(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: xo,
        onApplyRange: fr
      }
    ),
    /* @__PURE__ */ s.jsx(
      kx,
      {
        isOpen: De,
        onClose: () => Je(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: g,
          timelineBaseEpochMs: g,
          playheadMs: Lt,
          inPointMs: pe,
          outPointMs: We,
          selectedStationIds: k,
          selectedStationNames: xe.filter((L) => k.includes(L.id)).map((L) => L.displayName || L.hostname || L.id),
          allStationIds: xe.map((L) => L.id),
          activeStationId: b,
          activeStationName: (Ge == null ? void 0 : Ge.displayName) || (Ge == null ? void 0 : Ge.hostname) || null,
          spotlightStationId: y,
          keystrokeMode: o
        },
        onLoadBookmark: xo
      }
    ),
    /* @__PURE__ */ s.jsx(
      kp,
      {
        isOpen: ot,
        onClose: () => Ye(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Mx,
      {
        isOpen: Gn,
        station: Or,
        initialDisplayId: f,
        allStations: Lr,
        onSelectStation: (L) => {
          L !== y && pt(1), O(L), p(L);
        },
        onClose: ks,
        baseEpochMs: g,
        timeMode: r,
        totalDurationMs: m,
        zoomLevel: mt,
        onZoomChange: Ne,
        onZoomReset: at,
        onFitRange: Et,
        onJumpViewportTo: Y,
        viewportStartMs: we,
        onViewportStartChange: He,
        playheadMs: Lt,
        setPlayheadMs: jt,
        playheadEpochMs: Yt,
        inPointMs: pe,
        setInPointMs: be,
        outPointMs: We,
        setOutPointMs: Oe,
        recordingSegments: xt,
        globalGaps: I,
        isPlaying: zt,
        setIsPlaying: pn,
        isLooping: ln,
        setIsLooping: un,
        playbackSpeed: vt,
        setPlaybackSpeed: pt,
        onExport: Fs,
        keystrokeMode: o,
        onChangeKeystrokeMode: i,
        keystrokes: Pt,
        showRulerKeystrokes: a,
        onToggleRulerKeystrokes: () => c((L) => !L),
        directorPlan: Or == null ? void 0 : Or.directorPlan,
        onOverrideDisplay: Ie,
        onSplitDirectorSegment: Me,
        onChangeDirectorSegmentDisplay: Ie,
        onResetDirectorSegmentToAuto: ws
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ix,
      {
        menu: C,
        onClose: () => M(null),
        onDeselect: ve,
        onFocusSolo: Rn
      }
    ),
    /* @__PURE__ */ s.jsx(
      Tx,
      {
        isOpen: oe,
        onClose: () => re(!1),
        onConfirm: en,
        compositionSummary: {
          scope: D,
          layout: (se == null ? void 0 : se.preset) || $,
          isPipSwapped: T,
          isAutoDirectorEnabled: V,
          stationsCount: $t.length,
          audioSegmentsCount: ((Xt = Zt == null ? void 0 : Zt.segments) == null ? void 0 : Xt.length) || 1,
          resolution: (H == null ? void 0 : H.resolution) || "NATIVE",
          canvasWidth: (se == null ? void 0 : se.width) || 1920,
          canvasHeight: (se == null ? void 0 : se.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(wp, {})
  ] });
}
const Gd = "itb-extractor-advanced-theme", Yd = "itb-global-export-job-monitor-root";
function jp() {
  if (!(typeof document > "u") && !document.getElementById(Gd)) {
    const e = document.createElement("link");
    e.id = Gd, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
jp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Yd);
  if (!t) {
    t = document.createElement("div"), t.id = Yd, document.body.appendChild(t);
    try {
      qo.createRoot(t).render(Si.createElement(wp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Px(e, t = {}) {
  jp();
  const n = qo.createRoot(e);
  return n.render(Si.createElement(Dx, t)), () => {
    n.unmount();
  };
}
export {
  wp as ExportJobMonitor,
  Dx as ExtractorAdvancedStudio,
  Dx as default,
  Px as mount
};
