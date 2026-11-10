function cc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xu = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var er = Symbol.for("react.element"), fc = Symbol.for("react.portal"), dc = Symbol.for("react.fragment"), pc = Symbol.for("react.strict_mode"), mc = Symbol.for("react.profiler"), hc = Symbol.for("react.provider"), vc = Symbol.for("react.context"), yc = Symbol.for("react.forward_ref"), gc = Symbol.for("react.suspense"), Sc = Symbol.for("react.memo"), wc = Symbol.for("react.lazy"), Do = Symbol.iterator;
function kc(e) {
  return e === null || typeof e != "object" ? null : (e = Do && e[Do] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Ju = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Zu = Object.assign, qu = {};
function cn(e, t, n) {
  this.props = e, this.context = t, this.refs = qu, this.updater = n || Ju;
}
cn.prototype.isReactComponent = {};
cn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
cn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function bu() {
}
bu.prototype = cn.prototype;
function Ui(e, t, n) {
  this.props = e, this.context = t, this.refs = qu, this.updater = n || Ju;
}
var Bi = Ui.prototype = new bu();
Bi.constructor = Ui;
Zu(Bi, cn.prototype);
Bi.isPureReactComponent = !0;
var Mo = Array.isArray, es = Object.prototype.hasOwnProperty, Vi = { current: null }, ts = { key: !0, ref: !0, __self: !0, __source: !0 };
function ns(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) es.call(t, r) && !ts.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), d = 0; d < u; d++) s[d] = arguments[d + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: er, type: e, key: i, ref: o, props: l, _owner: Vi.current };
}
function xc(e, t) {
  return { $$typeof: er, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Hi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === er;
}
function Ec(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ao = /\/+/g;
function xl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Ec("" + e.key) : t.toString(36);
}
function Er(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case er:
        case fc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + xl(o, 0) : r, Mo(l) ? (n = "", e != null && (n = e.replace(Ao, "$&/") + "/"), Er(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Hi(l) && (l = xc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Ao, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Mo(e)) for (var u = 0; u < e.length; u++) {
    i = e[u];
    var s = r + xl(i, u);
    o += Er(i, t, n, s, l);
  }
  else if (s = kc(e), typeof s == "function") for (e = s.call(e), u = 0; !(i = e.next()).done; ) i = i.value, s = r + xl(i, u++), o += Er(i, t, n, s, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function or(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Er(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Nc(e) {
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
var ce = { current: null }, Nr = { transition: null }, Cc = { ReactCurrentDispatcher: ce, ReactCurrentBatchConfig: Nr, ReactCurrentOwner: Vi };
function rs() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: or, forEach: function(e, t, n) {
  or(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return or(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return or(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Hi(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = cn;
O.Fragment = dc;
O.Profiler = mc;
O.PureComponent = Ui;
O.StrictMode = pc;
O.Suspense = gc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cc;
O.act = rs;
O.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Zu({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = Vi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) es.call(t, s) && !ts.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var d = 0; d < s; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  return { $$typeof: er, type: e.type, key: l, ref: i, props: r, _owner: o };
};
O.createContext = function(e) {
  return e = { $$typeof: vc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: hc, _context: e }, e.Consumer = e;
};
O.createElement = ns;
O.createFactory = function(e) {
  var t = ns.bind(null, e);
  return t.type = e, t;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: yc, render: e };
};
O.isValidElement = Hi;
O.lazy = function(e) {
  return { $$typeof: wc, _payload: { _status: -1, _result: e }, _init: Nc };
};
O.memo = function(e, t) {
  return { $$typeof: Sc, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function(e) {
  var t = Nr.transition;
  Nr.transition = {};
  try {
    e();
  } finally {
    Nr.transition = t;
  }
};
O.unstable_act = rs;
O.useCallback = function(e, t) {
  return ce.current.useCallback(e, t);
};
O.useContext = function(e) {
  return ce.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return ce.current.useDeferredValue(e);
};
O.useEffect = function(e, t) {
  return ce.current.useEffect(e, t);
};
O.useId = function() {
  return ce.current.useId();
};
O.useImperativeHandle = function(e, t, n) {
  return ce.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function(e, t) {
  return ce.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function(e, t) {
  return ce.current.useLayoutEffect(e, t);
};
O.useMemo = function(e, t) {
  return ce.current.useMemo(e, t);
};
O.useReducer = function(e, t, n) {
  return ce.current.useReducer(e, t, n);
};
O.useRef = function(e) {
  return ce.current.useRef(e);
};
O.useState = function(e) {
  return ce.current.useState(e);
};
O.useSyncExternalStore = function(e, t, n) {
  return ce.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function() {
  return ce.current.useTransition();
};
O.version = "18.3.1";
Xu.exports = O;
var M = Xu.exports;
const ls = /* @__PURE__ */ cc(M);
var Dr = {}, is = { exports: {} }, xe = {}, os = { exports: {} }, us = {};
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
  function t(E, j) {
    var R = E.length;
    E.push(j);
    e: for (; 0 < R; ) {
      var P = R - 1 >>> 1, L = E[P];
      if (0 < l(L, j)) E[P] = j, E[R] = L, R = P;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var j = E[0], R = E.pop();
    if (R !== j) {
      E[0] = R;
      e: for (var P = 0, L = E.length, H = L >>> 1; P < H; ) {
        var de = 2 * (P + 1) - 1, et = E[de], Ne = de + 1, ir = E[Ne];
        if (0 > l(et, R)) Ne < L && 0 > l(ir, et) ? (E[P] = ir, E[Ne] = R, P = Ne) : (E[P] = et, E[de] = R, P = de);
        else if (Ne < L && 0 > l(ir, R)) E[P] = ir, E[Ne] = R, P = Ne;
        else break e;
      }
    }
    return j;
  }
  function l(E, j) {
    var R = E.sortIndex - j.sortIndex;
    return R !== 0 ? R : E.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, u = o.now();
    e.unstable_now = function() {
      return o.now() - u;
    };
  }
  var s = [], d = [], v = 1, h = null, m = 3, g = !1, w = !1, x = !1, I = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function a(E) {
    for (var j = n(d); j !== null; ) {
      if (j.callback === null) r(d);
      else if (j.startTime <= E) r(d), j.sortIndex = j.expirationTime, t(s, j);
      else break;
      j = n(d);
    }
  }
  function y(E) {
    if (x = !1, a(E), !w) if (n(s) !== null) w = !0, mn(k);
    else {
      var j = n(d);
      j !== null && hn(y, j.startTime - E);
    }
  }
  function k(E, j) {
    w = !1, x && (x = !1, p(T), T = -1), g = !0;
    var R = m;
    try {
      for (a(j), h = n(s); h !== null && (!(h.expirationTime > j) || E && !re()); ) {
        var P = h.callback;
        if (typeof P == "function") {
          h.callback = null, m = h.priorityLevel;
          var L = P(h.expirationTime <= j);
          j = e.unstable_now(), typeof L == "function" ? h.callback = L : h === n(s) && r(s), a(j);
        } else r(s);
        h = n(s);
      }
      if (h !== null) var H = !0;
      else {
        var de = n(d);
        de !== null && hn(y, de.startTime - j), H = !1;
      }
      return H;
    } finally {
      h = null, m = R, g = !1;
    }
  }
  var C = !1, _ = null, T = -1, V = 5, z = -1;
  function re() {
    return !(e.unstable_now() - z < V);
  }
  function kt() {
    if (_ !== null) {
      var E = e.unstable_now();
      z = E;
      var j = !0;
      try {
        j = _(!0, E);
      } finally {
        j ? xt() : (C = !1, _ = null);
      }
    } else C = !1;
  }
  var xt;
  if (typeof c == "function") xt = function() {
    c(kt);
  };
  else if (typeof MessageChannel < "u") {
    var be = new MessageChannel(), pn = be.port2;
    be.port1.onmessage = kt, xt = function() {
      pn.postMessage(null);
    };
  } else xt = function() {
    I(kt, 0);
  };
  function mn(E) {
    _ = E, C || (C = !0, xt());
  }
  function hn(E, j) {
    T = I(function() {
      E(e.unstable_now());
    }, j);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    w || g || (w = !0, mn(k));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : V = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(E) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var j = 3;
        break;
      default:
        j = m;
    }
    var R = m;
    m = j;
    try {
      return E();
    } finally {
      m = R;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, j) {
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
    var R = m;
    m = E;
    try {
      return j();
    } finally {
      m = R;
    }
  }, e.unstable_scheduleCallback = function(E, j, R) {
    var P = e.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? P + R : P) : R = P, E) {
      case 1:
        var L = -1;
        break;
      case 2:
        L = 250;
        break;
      case 5:
        L = 1073741823;
        break;
      case 4:
        L = 1e4;
        break;
      default:
        L = 5e3;
    }
    return L = R + L, E = { id: v++, callback: j, priorityLevel: E, startTime: R, expirationTime: L, sortIndex: -1 }, R > P ? (E.sortIndex = R, t(d, E), n(s) === null && E === n(d) && (x ? (p(T), T = -1) : x = !0, hn(y, R - P))) : (E.sortIndex = L, t(s, E), w || g || (w = !0, mn(k))), E;
  }, e.unstable_shouldYield = re, e.unstable_wrapCallback = function(E) {
    var j = m;
    return function() {
      var R = m;
      m = j;
      try {
        return E.apply(this, arguments);
      } finally {
        m = R;
      }
    };
  };
})(us);
os.exports = us;
var _c = os.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tc = M, ke = _c;
function S(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ss = /* @__PURE__ */ new Set(), An = {};
function Dt(e, t) {
  nn(e, t), nn(e + "Capture", t);
}
function nn(e, t) {
  for (An[e] = t, e = 0; e < t.length; e++) ss.add(t[e]);
}
var Ye = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Yl = Object.prototype.hasOwnProperty, Pc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Fo = {}, $o = {};
function jc(e) {
  return Yl.call($o, e) ? !0 : Yl.call(Fo, e) ? !1 : Pc.test(e) ? $o[e] = !0 : (Fo[e] = !0, !1);
}
function Lc(e, t, n, r) {
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
function Rc(e, t, n, r) {
  if (t === null || typeof t > "u" || Lc(e, t, n, r)) return !0;
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
function fe(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ne[e] = new fe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ne[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ne[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ne[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ne[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ne[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ne[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ne[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ne[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Wi = /[\-:]([a-z])/g;
function Qi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Wi,
    Qi
  );
  ne[t] = new fe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Wi, Qi);
  ne[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Wi, Qi);
  ne[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Gi(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Rc(t, n, l, r) && (n = null), r || l === null ? jc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var qe = Tc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ur = Symbol.for("react.element"), Ft = Symbol.for("react.portal"), $t = Symbol.for("react.fragment"), Ki = Symbol.for("react.strict_mode"), Xl = Symbol.for("react.profiler"), as = Symbol.for("react.provider"), cs = Symbol.for("react.context"), Yi = Symbol.for("react.forward_ref"), Jl = Symbol.for("react.suspense"), Zl = Symbol.for("react.suspense_list"), Xi = Symbol.for("react.memo"), nt = Symbol.for("react.lazy"), fs = Symbol.for("react.offscreen"), Uo = Symbol.iterator;
function vn(e) {
  return e === null || typeof e != "object" ? null : (e = Uo && e[Uo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, El;
function Nn(e) {
  if (El === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    El = t && t[1] || "";
  }
  return `
` + El + e;
}
var Nl = !1;
function Cl(e, t) {
  if (!e || Nl) return "";
  Nl = !0;
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
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u]; ) u--;
      for (; 1 <= o && 0 <= u; o--, u--) if (l[o] !== i[u]) {
        if (o !== 1 || u !== 1)
          do
            if (o--, u--, 0 > u || l[o] !== i[u]) {
              var s = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= o && 0 <= u);
        break;
      }
    }
  } finally {
    Nl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Nn(e) : "";
}
function zc(e) {
  switch (e.tag) {
    case 5:
      return Nn(e.type);
    case 16:
      return Nn("Lazy");
    case 13:
      return Nn("Suspense");
    case 19:
      return Nn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Cl(e.type, !1), e;
    case 11:
      return e = Cl(e.type.render, !1), e;
    case 1:
      return e = Cl(e.type, !0), e;
    default:
      return "";
  }
}
function ql(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case $t:
      return "Fragment";
    case Ft:
      return "Portal";
    case Xl:
      return "Profiler";
    case Ki:
      return "StrictMode";
    case Jl:
      return "Suspense";
    case Zl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case cs:
      return (e.displayName || "Context") + ".Consumer";
    case as:
      return (e._context.displayName || "Context") + ".Provider";
    case Yi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Xi:
      return t = e.displayName || null, t !== null ? t : ql(e.type) || "Memo";
    case nt:
      t = e._payload, e = e._init;
      try {
        return ql(e(t));
      } catch {
      }
  }
  return null;
}
function Oc(e) {
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
      return ql(t);
    case 8:
      return t === Ki ? "StrictMode" : "Mode";
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
function vt(e) {
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
function ds(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Ic(e) {
  var t = ds(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function sr(e) {
  e._valueTracker || (e._valueTracker = Ic(e));
}
function ps(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = ds(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Mr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function bl(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Bo(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = vt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ms(e, t) {
  t = t.checked, t != null && Gi(e, "checked", t, !1);
}
function ei(e, t) {
  ms(e, t);
  var n = vt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ti(e, t.type, n) : t.hasOwnProperty("defaultValue") && ti(e, t.type, vt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Vo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ti(e, t, n) {
  (t !== "number" || Mr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Cn = Array.isArray;
function Jt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + vt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ni(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ho(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(S(92));
      if (Cn(n)) {
        if (1 < n.length) throw Error(S(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: vt(n) };
}
function hs(e, t) {
  var n = vt(t.value), r = vt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Wo(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function vs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ri(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? vs(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ar, ys = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (ar = ar || document.createElement("div"), ar.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ar.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Fn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Pn = {
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
}, Dc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Pn).forEach(function(e) {
  Dc.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Pn[t] = Pn[e];
  });
});
function gs(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Pn.hasOwnProperty(e) && Pn[e] ? ("" + t).trim() : t + "px";
}
function Ss(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = gs(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Mc = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function li(e, t) {
  if (t) {
    if (Mc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(S(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(S(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(S(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(S(62));
  }
}
function ii(e, t) {
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
var oi = null;
function Ji(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ui = null, Zt = null, qt = null;
function Qo(e) {
  if (e = rr(e)) {
    if (typeof ui != "function") throw Error(S(280));
    var t = e.stateNode;
    t && (t = cl(t), ui(e.stateNode, e.type, t));
  }
}
function ws(e) {
  Zt ? qt ? qt.push(e) : qt = [e] : Zt = e;
}
function ks() {
  if (Zt) {
    var e = Zt, t = qt;
    if (qt = Zt = null, Qo(e), t) for (e = 0; e < t.length; e++) Qo(t[e]);
  }
}
function xs(e, t) {
  return e(t);
}
function Es() {
}
var _l = !1;
function Ns(e, t, n) {
  if (_l) return e(t, n);
  _l = !0;
  try {
    return xs(e, t, n);
  } finally {
    _l = !1, (Zt !== null || qt !== null) && (Es(), ks());
  }
}
function $n(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = cl(n);
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
  if (n && typeof n != "function") throw Error(S(231, t, typeof n));
  return n;
}
var si = !1;
if (Ye) try {
  var yn = {};
  Object.defineProperty(yn, "passive", { get: function() {
    si = !0;
  } }), window.addEventListener("test", yn, yn), window.removeEventListener("test", yn, yn);
} catch {
  si = !1;
}
function Ac(e, t, n, r, l, i, o, u, s) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var jn = !1, Ar = null, Fr = !1, ai = null, Fc = { onError: function(e) {
  jn = !0, Ar = e;
} };
function $c(e, t, n, r, l, i, o, u, s) {
  jn = !1, Ar = null, Ac.apply(Fc, arguments);
}
function Uc(e, t, n, r, l, i, o, u, s) {
  if ($c.apply(this, arguments), jn) {
    if (jn) {
      var d = Ar;
      jn = !1, Ar = null;
    } else throw Error(S(198));
    Fr || (Fr = !0, ai = d);
  }
}
function Mt(e) {
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
function Cs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Go(e) {
  if (Mt(e) !== e) throw Error(S(188));
}
function Bc(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Mt(e), t === null) throw Error(S(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return Go(l), e;
        if (i === r) return Go(l), t;
        i = i.sibling;
      }
      throw Error(S(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, u = l.child; u; ) {
        if (u === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (u === r) {
          o = !0, r = l, n = i;
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = i.child; u; ) {
          if (u === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (u === r) {
            o = !0, r = i, n = l;
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(S(189));
      }
    }
    if (n.alternate !== r) throw Error(S(190));
  }
  if (n.tag !== 3) throw Error(S(188));
  return n.stateNode.current === n ? e : t;
}
function _s(e) {
  return e = Bc(e), e !== null ? Ts(e) : null;
}
function Ts(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ts(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ps = ke.unstable_scheduleCallback, Ko = ke.unstable_cancelCallback, Vc = ke.unstable_shouldYield, Hc = ke.unstable_requestPaint, Y = ke.unstable_now, Wc = ke.unstable_getCurrentPriorityLevel, Zi = ke.unstable_ImmediatePriority, js = ke.unstable_UserBlockingPriority, $r = ke.unstable_NormalPriority, Qc = ke.unstable_LowPriority, Ls = ke.unstable_IdlePriority, ol = null, Be = null;
function Gc(e) {
  if (Be && typeof Be.onCommitFiberRoot == "function") try {
    Be.onCommitFiberRoot(ol, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var De = Math.clz32 ? Math.clz32 : Xc, Kc = Math.log, Yc = Math.LN2;
function Xc(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Kc(e) / Yc | 0) | 0;
}
var cr = 64, fr = 4194304;
function _n(e) {
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
function Ur(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var u = o & ~l;
    u !== 0 ? r = _n(u) : (i &= o, i !== 0 && (r = _n(i)));
  } else o = n & ~l, o !== 0 ? r = _n(o) : i !== 0 && (r = _n(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - De(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Jc(e, t) {
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
function Zc(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - De(i), u = 1 << o, s = l[o];
    s === -1 ? (!(u & n) || u & r) && (l[o] = Jc(u, t)) : s <= t && (e.expiredLanes |= u), i &= ~u;
  }
}
function ci(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Rs() {
  var e = cr;
  return cr <<= 1, !(cr & 4194240) && (cr = 64), e;
}
function Tl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function tr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - De(t), e[t] = n;
}
function qc(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - De(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function qi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - De(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var A = 0;
function zs(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Os, bi, Is, Ds, Ms, fi = !1, dr = [], st = null, at = null, ct = null, Un = /* @__PURE__ */ new Map(), Bn = /* @__PURE__ */ new Map(), lt = [], bc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Yo(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      st = null;
      break;
    case "dragenter":
    case "dragleave":
      at = null;
      break;
    case "mouseover":
    case "mouseout":
      ct = null;
      break;
    case "pointerover":
    case "pointerout":
      Un.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Bn.delete(t.pointerId);
  }
}
function gn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = rr(t), t !== null && bi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function ef(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return st = gn(st, e, t, n, r, l), !0;
    case "dragenter":
      return at = gn(at, e, t, n, r, l), !0;
    case "mouseover":
      return ct = gn(ct, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Un.set(i, gn(Un.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Bn.set(i, gn(Bn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function As(e) {
  var t = Ct(e.target);
  if (t !== null) {
    var n = Mt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Cs(n), t !== null) {
          e.blockedOn = t, Ms(e.priority, function() {
            Is(n);
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
function Cr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = di(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      oi = r, n.target.dispatchEvent(r), oi = null;
    } else return t = rr(n), t !== null && bi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Xo(e, t, n) {
  Cr(e) && n.delete(t);
}
function tf() {
  fi = !1, st !== null && Cr(st) && (st = null), at !== null && Cr(at) && (at = null), ct !== null && Cr(ct) && (ct = null), Un.forEach(Xo), Bn.forEach(Xo);
}
function Sn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, fi || (fi = !0, ke.unstable_scheduleCallback(ke.unstable_NormalPriority, tf)));
}
function Vn(e) {
  function t(l) {
    return Sn(l, e);
  }
  if (0 < dr.length) {
    Sn(dr[0], e);
    for (var n = 1; n < dr.length; n++) {
      var r = dr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (st !== null && Sn(st, e), at !== null && Sn(at, e), ct !== null && Sn(ct, e), Un.forEach(t), Bn.forEach(t), n = 0; n < lt.length; n++) r = lt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lt.length && (n = lt[0], n.blockedOn === null); ) As(n), n.blockedOn === null && lt.shift();
}
var bt = qe.ReactCurrentBatchConfig, Br = !0;
function nf(e, t, n, r) {
  var l = A, i = bt.transition;
  bt.transition = null;
  try {
    A = 1, eo(e, t, n, r);
  } finally {
    A = l, bt.transition = i;
  }
}
function rf(e, t, n, r) {
  var l = A, i = bt.transition;
  bt.transition = null;
  try {
    A = 4, eo(e, t, n, r);
  } finally {
    A = l, bt.transition = i;
  }
}
function eo(e, t, n, r) {
  if (Br) {
    var l = di(e, t, n, r);
    if (l === null) Al(e, t, r, Vr, n), Yo(e, r);
    else if (ef(l, e, t, n, r)) r.stopPropagation();
    else if (Yo(e, r), t & 4 && -1 < bc.indexOf(e)) {
      for (; l !== null; ) {
        var i = rr(l);
        if (i !== null && Os(i), i = di(e, t, n, r), i === null && Al(e, t, r, Vr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Al(e, t, r, null, n);
  }
}
var Vr = null;
function di(e, t, n, r) {
  if (Vr = null, e = Ji(r), e = Ct(e), e !== null) if (t = Mt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Cs(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Vr = e, null;
}
function Fs(e) {
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
      switch (Wc()) {
        case Zi:
          return 1;
        case js:
          return 4;
        case $r:
        case Qc:
          return 16;
        case Ls:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ot = null, to = null, _r = null;
function $s() {
  if (_r) return _r;
  var e, t = to, n = t.length, r, l = "value" in ot ? ot.value : ot.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return _r = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Tr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function pr() {
  return !0;
}
function Jo() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(i) : i[u]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? pr : Jo, this.isPropagationStopped = Jo, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = pr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = pr);
  }, persist: function() {
  }, isPersistent: pr }), t;
}
var fn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, no = Ee(fn), nr = G({}, fn, { view: 0, detail: 0 }), lf = Ee(nr), Pl, jl, wn, ul = G({}, nr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ro, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== wn && (wn && e.type === "mousemove" ? (Pl = e.screenX - wn.screenX, jl = e.screenY - wn.screenY) : jl = Pl = 0, wn = e), Pl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : jl;
} }), Zo = Ee(ul), of = G({}, ul, { dataTransfer: 0 }), uf = Ee(of), sf = G({}, nr, { relatedTarget: 0 }), Ll = Ee(sf), af = G({}, fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), cf = Ee(af), ff = G({}, fn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), df = Ee(ff), pf = G({}, fn, { data: 0 }), qo = Ee(pf), mf = {
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
}, hf = {
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
}, vf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function yf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = vf[e]) ? !!t[e] : !1;
}
function ro() {
  return yf;
}
var gf = G({}, nr, { key: function(e) {
  if (e.key) {
    var t = mf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Tr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? hf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ro, charCode: function(e) {
  return e.type === "keypress" ? Tr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Tr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Sf = Ee(gf), wf = G({}, ul, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), bo = Ee(wf), kf = G({}, nr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ro }), xf = Ee(kf), Ef = G({}, fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Nf = Ee(Ef), Cf = G({}, ul, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), _f = Ee(Cf), Tf = [9, 13, 27, 32], lo = Ye && "CompositionEvent" in window, Ln = null;
Ye && "documentMode" in document && (Ln = document.documentMode);
var Pf = Ye && "TextEvent" in window && !Ln, Us = Ye && (!lo || Ln && 8 < Ln && 11 >= Ln), eu = " ", tu = !1;
function Bs(e, t) {
  switch (e) {
    case "keyup":
      return Tf.indexOf(t.keyCode) !== -1;
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
function Vs(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Ut = !1;
function jf(e, t) {
  switch (e) {
    case "compositionend":
      return Vs(t);
    case "keypress":
      return t.which !== 32 ? null : (tu = !0, eu);
    case "textInput":
      return e = t.data, e === eu && tu ? null : e;
    default:
      return null;
  }
}
function Lf(e, t) {
  if (Ut) return e === "compositionend" || !lo && Bs(e, t) ? (e = $s(), _r = to = ot = null, Ut = !1, e) : null;
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
      return Us && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Rf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function nu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Rf[e.type] : t === "textarea";
}
function Hs(e, t, n, r) {
  ws(r), t = Hr(t, "onChange"), 0 < t.length && (n = new no("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Rn = null, Hn = null;
function zf(e) {
  ea(e, 0);
}
function sl(e) {
  var t = Ht(e);
  if (ps(t)) return e;
}
function Of(e, t) {
  if (e === "change") return t;
}
var Ws = !1;
if (Ye) {
  var Rl;
  if (Ye) {
    var zl = "oninput" in document;
    if (!zl) {
      var ru = document.createElement("div");
      ru.setAttribute("oninput", "return;"), zl = typeof ru.oninput == "function";
    }
    Rl = zl;
  } else Rl = !1;
  Ws = Rl && (!document.documentMode || 9 < document.documentMode);
}
function lu() {
  Rn && (Rn.detachEvent("onpropertychange", Qs), Hn = Rn = null);
}
function Qs(e) {
  if (e.propertyName === "value" && sl(Hn)) {
    var t = [];
    Hs(t, Hn, e, Ji(e)), Ns(zf, t);
  }
}
function If(e, t, n) {
  e === "focusin" ? (lu(), Rn = t, Hn = n, Rn.attachEvent("onpropertychange", Qs)) : e === "focusout" && lu();
}
function Df(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return sl(Hn);
}
function Mf(e, t) {
  if (e === "click") return sl(t);
}
function Af(e, t) {
  if (e === "input" || e === "change") return sl(t);
}
function Ff(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : Ff;
function Wn(e, t) {
  if (Ae(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Yl.call(t, l) || !Ae(e[l], t[l])) return !1;
  }
  return !0;
}
function iu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ou(e, t) {
  var n = iu(e);
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
    n = iu(n);
  }
}
function Gs(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Gs(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Ks() {
  for (var e = window, t = Mr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Mr(e.document);
  }
  return t;
}
function io(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function $f(e) {
  var t = Ks(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Gs(n.ownerDocument.documentElement, n)) {
    if (r !== null && io(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = ou(n, i);
        var o = ou(
          n,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Uf = Ye && "documentMode" in document && 11 >= document.documentMode, Bt = null, pi = null, zn = null, mi = !1;
function uu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  mi || Bt == null || Bt !== Mr(r) || (r = Bt, "selectionStart" in r && io(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), zn && Wn(zn, r) || (zn = r, r = Hr(pi, "onSelect"), 0 < r.length && (t = new no("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Bt)));
}
function mr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Vt = { animationend: mr("Animation", "AnimationEnd"), animationiteration: mr("Animation", "AnimationIteration"), animationstart: mr("Animation", "AnimationStart"), transitionend: mr("Transition", "TransitionEnd") }, Ol = {}, Ys = {};
Ye && (Ys = document.createElement("div").style, "AnimationEvent" in window || (delete Vt.animationend.animation, delete Vt.animationiteration.animation, delete Vt.animationstart.animation), "TransitionEvent" in window || delete Vt.transitionend.transition);
function al(e) {
  if (Ol[e]) return Ol[e];
  if (!Vt[e]) return e;
  var t = Vt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ys) return Ol[e] = t[n];
  return e;
}
var Xs = al("animationend"), Js = al("animationiteration"), Zs = al("animationstart"), qs = al("transitionend"), bs = /* @__PURE__ */ new Map(), su = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function gt(e, t) {
  bs.set(e, t), Dt(t, [e]);
}
for (var Il = 0; Il < su.length; Il++) {
  var Dl = su[Il], Bf = Dl.toLowerCase(), Vf = Dl[0].toUpperCase() + Dl.slice(1);
  gt(Bf, "on" + Vf);
}
gt(Xs, "onAnimationEnd");
gt(Js, "onAnimationIteration");
gt(Zs, "onAnimationStart");
gt("dblclick", "onDoubleClick");
gt("focusin", "onFocus");
gt("focusout", "onBlur");
gt(qs, "onTransitionEnd");
nn("onMouseEnter", ["mouseout", "mouseover"]);
nn("onMouseLeave", ["mouseout", "mouseover"]);
nn("onPointerEnter", ["pointerout", "pointerover"]);
nn("onPointerLeave", ["pointerout", "pointerover"]);
Dt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Dt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Dt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Dt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Tn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Hf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Tn));
function au(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Uc(r, t, void 0, e), e.currentTarget = null;
}
function ea(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var u = r[o], s = u.instance, d = u.currentTarget;
        if (u = u.listener, s !== i && l.isPropagationStopped()) break e;
        au(l, u, d), i = s;
      }
      else for (o = 0; o < r.length; o++) {
        if (u = r[o], s = u.instance, d = u.currentTarget, u = u.listener, s !== i && l.isPropagationStopped()) break e;
        au(l, u, d), i = s;
      }
    }
  }
  if (Fr) throw e = ai, Fr = !1, ai = null, e;
}
function $(e, t) {
  var n = t[Si];
  n === void 0 && (n = t[Si] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ta(t, e, 2, !1), n.add(r));
}
function Ml(e, t, n) {
  var r = 0;
  t && (r |= 4), ta(n, e, r, t);
}
var hr = "_reactListening" + Math.random().toString(36).slice(2);
function Qn(e) {
  if (!e[hr]) {
    e[hr] = !0, ss.forEach(function(n) {
      n !== "selectionchange" && (Hf.has(n) || Ml(n, !1, e), Ml(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[hr] || (t[hr] = !0, Ml("selectionchange", !1, t));
  }
}
function ta(e, t, n, r) {
  switch (Fs(t)) {
    case 1:
      var l = nf;
      break;
    case 4:
      l = rf;
      break;
    default:
      l = eo;
  }
  n = l.bind(null, t, n, e), l = void 0, !si || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Al(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var u = r.stateNode.containerInfo;
      if (u === l || u.nodeType === 8 && u.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var s = o.tag;
        if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        o = o.return;
      }
      for (; u !== null; ) {
        if (o = Ct(u), o === null) return;
        if (s = o.tag, s === 5 || s === 6) {
          r = i = o;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  Ns(function() {
    var d = i, v = Ji(n), h = [];
    e: {
      var m = bs.get(e);
      if (m !== void 0) {
        var g = no, w = e;
        switch (e) {
          case "keypress":
            if (Tr(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Sf;
            break;
          case "focusin":
            w = "focus", g = Ll;
            break;
          case "focusout":
            w = "blur", g = Ll;
            break;
          case "beforeblur":
          case "afterblur":
            g = Ll;
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
            g = Zo;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = uf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = xf;
            break;
          case Xs:
          case Js:
          case Zs:
            g = cf;
            break;
          case qs:
            g = Nf;
            break;
          case "scroll":
            g = lf;
            break;
          case "wheel":
            g = _f;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = df;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = bo;
        }
        var x = (t & 4) !== 0, I = !x && e === "scroll", p = x ? m !== null ? m + "Capture" : null : m;
        x = [];
        for (var c = d, a; c !== null; ) {
          a = c;
          var y = a.stateNode;
          if (a.tag === 5 && y !== null && (a = y, p !== null && (y = $n(c, p), y != null && x.push(Gn(c, y, a)))), I) break;
          c = c.return;
        }
        0 < x.length && (m = new g(m, w, null, n, v), h.push({ event: m, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", m && n !== oi && (w = n.relatedTarget || n.fromElement) && (Ct(w) || w[Xe])) break e;
        if ((g || m) && (m = v.window === v ? v : (m = v.ownerDocument) ? m.defaultView || m.parentWindow : window, g ? (w = n.relatedTarget || n.toElement, g = d, w = w ? Ct(w) : null, w !== null && (I = Mt(w), w !== I || w.tag !== 5 && w.tag !== 6) && (w = null)) : (g = null, w = d), g !== w)) {
          if (x = Zo, y = "onMouseLeave", p = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (x = bo, y = "onPointerLeave", p = "onPointerEnter", c = "pointer"), I = g == null ? m : Ht(g), a = w == null ? m : Ht(w), m = new x(y, c + "leave", g, n, v), m.target = I, m.relatedTarget = a, y = null, Ct(v) === d && (x = new x(p, c + "enter", w, n, v), x.target = a, x.relatedTarget = I, y = x), I = y, g && w) t: {
            for (x = g, p = w, c = 0, a = x; a; a = At(a)) c++;
            for (a = 0, y = p; y; y = At(y)) a++;
            for (; 0 < c - a; ) x = At(x), c--;
            for (; 0 < a - c; ) p = At(p), a--;
            for (; c--; ) {
              if (x === p || p !== null && x === p.alternate) break t;
              x = At(x), p = At(p);
            }
            x = null;
          }
          else x = null;
          g !== null && cu(h, m, g, x, !1), w !== null && I !== null && cu(h, I, w, x, !0);
        }
      }
      e: {
        if (m = d ? Ht(d) : window, g = m.nodeName && m.nodeName.toLowerCase(), g === "select" || g === "input" && m.type === "file") var k = Of;
        else if (nu(m)) if (Ws) k = Af;
        else {
          k = Df;
          var C = If;
        }
        else (g = m.nodeName) && g.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (k = Mf);
        if (k && (k = k(e, d))) {
          Hs(h, k, n, v);
          break e;
        }
        C && C(e, m, d), e === "focusout" && (C = m._wrapperState) && C.controlled && m.type === "number" && ti(m, "number", m.value);
      }
      switch (C = d ? Ht(d) : window, e) {
        case "focusin":
          (nu(C) || C.contentEditable === "true") && (Bt = C, pi = d, zn = null);
          break;
        case "focusout":
          zn = pi = Bt = null;
          break;
        case "mousedown":
          mi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          mi = !1, uu(h, n, v);
          break;
        case "selectionchange":
          if (Uf) break;
        case "keydown":
        case "keyup":
          uu(h, n, v);
      }
      var _;
      if (lo) e: {
        switch (e) {
          case "compositionstart":
            var T = "onCompositionStart";
            break e;
          case "compositionend":
            T = "onCompositionEnd";
            break e;
          case "compositionupdate":
            T = "onCompositionUpdate";
            break e;
        }
        T = void 0;
      }
      else Ut ? Bs(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (Us && n.locale !== "ko" && (Ut || T !== "onCompositionStart" ? T === "onCompositionEnd" && Ut && (_ = $s()) : (ot = v, to = "value" in ot ? ot.value : ot.textContent, Ut = !0)), C = Hr(d, T), 0 < C.length && (T = new qo(T, e, null, n, v), h.push({ event: T, listeners: C }), _ ? T.data = _ : (_ = Vs(n), _ !== null && (T.data = _)))), (_ = Pf ? jf(e, n) : Lf(e, n)) && (d = Hr(d, "onBeforeInput"), 0 < d.length && (v = new qo("onBeforeInput", "beforeinput", null, n, v), h.push({ event: v, listeners: d }), v.data = _));
    }
    ea(h, t);
  });
}
function Gn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Hr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = $n(e, n), i != null && r.unshift(Gn(e, i, l)), i = $n(e, t), i != null && r.push(Gn(e, i, l))), e = e.return;
  }
  return r;
}
function At(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function cu(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, d = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && d !== null && (u = d, l ? (s = $n(n, i), s != null && o.unshift(Gn(n, s, u))) : l || (s = $n(n, i), s != null && o.push(Gn(n, s, u)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Wf = /\r\n?/g, Qf = /\u0000|\uFFFD/g;
function fu(e) {
  return (typeof e == "string" ? e : "" + e).replace(Wf, `
`).replace(Qf, "");
}
function vr(e, t, n) {
  if (t = fu(t), fu(e) !== t && n) throw Error(S(425));
}
function Wr() {
}
var hi = null, vi = null;
function yi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var gi = typeof setTimeout == "function" ? setTimeout : void 0, Gf = typeof clearTimeout == "function" ? clearTimeout : void 0, du = typeof Promise == "function" ? Promise : void 0, Kf = typeof queueMicrotask == "function" ? queueMicrotask : typeof du < "u" ? function(e) {
  return du.resolve(null).then(e).catch(Yf);
} : gi;
function Yf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Fl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Vn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Vn(t);
}
function ft(e) {
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
function pu(e) {
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
var dn = Math.random().toString(36).slice(2), Ue = "__reactFiber$" + dn, Kn = "__reactProps$" + dn, Xe = "__reactContainer$" + dn, Si = "__reactEvents$" + dn, Xf = "__reactListeners$" + dn, Jf = "__reactHandles$" + dn;
function Ct(e) {
  var t = e[Ue];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Xe] || n[Ue]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = pu(e); e !== null; ) {
        if (n = e[Ue]) return n;
        e = pu(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function rr(e) {
  return e = e[Ue] || e[Xe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Ht(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(S(33));
}
function cl(e) {
  return e[Kn] || null;
}
var wi = [], Wt = -1;
function St(e) {
  return { current: e };
}
function U(e) {
  0 > Wt || (e.current = wi[Wt], wi[Wt] = null, Wt--);
}
function F(e, t) {
  Wt++, wi[Wt] = e.current, e.current = t;
}
var yt = {}, ue = St(yt), he = St(!1), Lt = yt;
function rn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return yt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ve(e) {
  return e = e.childContextTypes, e != null;
}
function Qr() {
  U(he), U(ue);
}
function mu(e, t, n) {
  if (ue.current !== yt) throw Error(S(168));
  F(ue, t), F(he, n);
}
function na(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(S(108, Oc(e) || "Unknown", l));
  return G({}, n, r);
}
function Gr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || yt, Lt = ue.current, F(ue, e), F(he, he.current), !0;
}
function hu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(S(169));
  n ? (e = na(e, t, Lt), r.__reactInternalMemoizedMergedChildContext = e, U(he), U(ue), F(ue, e)) : U(he), F(he, n);
}
var We = null, fl = !1, $l = !1;
function ra(e) {
  We === null ? We = [e] : We.push(e);
}
function Zf(e) {
  fl = !0, ra(e);
}
function wt() {
  if (!$l && We !== null) {
    $l = !0;
    var e = 0, t = A;
    try {
      var n = We;
      for (A = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      We = null, fl = !1;
    } catch (l) {
      throw We !== null && (We = We.slice(e + 1)), Ps(Zi, wt), l;
    } finally {
      A = t, $l = !1;
    }
  }
  return null;
}
var Qt = [], Gt = 0, Kr = null, Yr = 0, Ce = [], _e = 0, Rt = null, Qe = 1, Ge = "";
function Et(e, t) {
  Qt[Gt++] = Yr, Qt[Gt++] = Kr, Kr = e, Yr = t;
}
function la(e, t, n) {
  Ce[_e++] = Qe, Ce[_e++] = Ge, Ce[_e++] = Rt, Rt = e;
  var r = Qe;
  e = Ge;
  var l = 32 - De(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - De(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Qe = 1 << 32 - De(t) + l | n << l | r, Ge = i + e;
  } else Qe = 1 << i | n << l | r, Ge = e;
}
function oo(e) {
  e.return !== null && (Et(e, 1), la(e, 1, 0));
}
function uo(e) {
  for (; e === Kr; ) Kr = Qt[--Gt], Qt[Gt] = null, Yr = Qt[--Gt], Qt[Gt] = null;
  for (; e === Rt; ) Rt = Ce[--_e], Ce[_e] = null, Ge = Ce[--_e], Ce[_e] = null, Qe = Ce[--_e], Ce[_e] = null;
}
var we = null, Se = null, B = !1, Ie = null;
function ia(e, t) {
  var n = Te(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function vu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, we = e, Se = ft(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, we = e, Se = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Rt !== null ? { id: Qe, overflow: Ge } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Te(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, we = e, Se = null, !0) : !1;
    default:
      return !1;
  }
}
function ki(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function xi(e) {
  if (B) {
    var t = Se;
    if (t) {
      var n = t;
      if (!vu(e, t)) {
        if (ki(e)) throw Error(S(418));
        t = ft(n.nextSibling);
        var r = we;
        t && vu(e, t) ? ia(r, n) : (e.flags = e.flags & -4097 | 2, B = !1, we = e);
      }
    } else {
      if (ki(e)) throw Error(S(418));
      e.flags = e.flags & -4097 | 2, B = !1, we = e;
    }
  }
}
function yu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  we = e;
}
function yr(e) {
  if (e !== we) return !1;
  if (!B) return yu(e), B = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !yi(e.type, e.memoizedProps)), t && (t = Se)) {
    if (ki(e)) throw oa(), Error(S(418));
    for (; t; ) ia(e, t), t = ft(t.nextSibling);
  }
  if (yu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Se = ft(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Se = null;
    }
  } else Se = we ? ft(e.stateNode.nextSibling) : null;
  return !0;
}
function oa() {
  for (var e = Se; e; ) e = ft(e.nextSibling);
}
function ln() {
  Se = we = null, B = !1;
}
function so(e) {
  Ie === null ? Ie = [e] : Ie.push(e);
}
var qf = qe.ReactCurrentBatchConfig;
function kn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(S(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(S(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var u = l.refs;
        o === null ? delete u[i] : u[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(S(284));
    if (!n._owner) throw Error(S(290, e));
  }
  return e;
}
function gr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function gu(e) {
  var t = e._init;
  return t(e._payload);
}
function ua(e) {
  function t(p, c) {
    if (e) {
      var a = p.deletions;
      a === null ? (p.deletions = [c], p.flags |= 16) : a.push(c);
    }
  }
  function n(p, c) {
    if (!e) return null;
    for (; c !== null; ) t(p, c), c = c.sibling;
    return null;
  }
  function r(p, c) {
    for (p = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? p.set(c.key, c) : p.set(c.index, c), c = c.sibling;
    return p;
  }
  function l(p, c) {
    return p = ht(p, c), p.index = 0, p.sibling = null, p;
  }
  function i(p, c, a) {
    return p.index = a, e ? (a = p.alternate, a !== null ? (a = a.index, a < c ? (p.flags |= 2, c) : a) : (p.flags |= 2, c)) : (p.flags |= 1048576, c);
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function u(p, c, a, y) {
    return c === null || c.tag !== 6 ? (c = Gl(a, p.mode, y), c.return = p, c) : (c = l(c, a), c.return = p, c);
  }
  function s(p, c, a, y) {
    var k = a.type;
    return k === $t ? v(p, c, a.props.children, y, a.key) : c !== null && (c.elementType === k || typeof k == "object" && k !== null && k.$$typeof === nt && gu(k) === c.type) ? (y = l(c, a.props), y.ref = kn(p, c, a), y.return = p, y) : (y = Ir(a.type, a.key, a.props, null, p.mode, y), y.ref = kn(p, c, a), y.return = p, y);
  }
  function d(p, c, a, y) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== a.containerInfo || c.stateNode.implementation !== a.implementation ? (c = Kl(a, p.mode, y), c.return = p, c) : (c = l(c, a.children || []), c.return = p, c);
  }
  function v(p, c, a, y, k) {
    return c === null || c.tag !== 7 ? (c = jt(a, p.mode, y, k), c.return = p, c) : (c = l(c, a), c.return = p, c);
  }
  function h(p, c, a) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = Gl("" + c, p.mode, a), c.return = p, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case ur:
          return a = Ir(c.type, c.key, c.props, null, p.mode, a), a.ref = kn(p, null, c), a.return = p, a;
        case Ft:
          return c = Kl(c, p.mode, a), c.return = p, c;
        case nt:
          var y = c._init;
          return h(p, y(c._payload), a);
      }
      if (Cn(c) || vn(c)) return c = jt(c, p.mode, a, null), c.return = p, c;
      gr(p, c);
    }
    return null;
  }
  function m(p, c, a, y) {
    var k = c !== null ? c.key : null;
    if (typeof a == "string" && a !== "" || typeof a == "number") return k !== null ? null : u(p, c, "" + a, y);
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ur:
          return a.key === k ? s(p, c, a, y) : null;
        case Ft:
          return a.key === k ? d(p, c, a, y) : null;
        case nt:
          return k = a._init, m(
            p,
            c,
            k(a._payload),
            y
          );
      }
      if (Cn(a) || vn(a)) return k !== null ? null : v(p, c, a, y, null);
      gr(p, a);
    }
    return null;
  }
  function g(p, c, a, y, k) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return p = p.get(a) || null, u(c, p, "" + y, k);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ur:
          return p = p.get(y.key === null ? a : y.key) || null, s(c, p, y, k);
        case Ft:
          return p = p.get(y.key === null ? a : y.key) || null, d(c, p, y, k);
        case nt:
          var C = y._init;
          return g(p, c, a, C(y._payload), k);
      }
      if (Cn(y) || vn(y)) return p = p.get(a) || null, v(c, p, y, k, null);
      gr(c, y);
    }
    return null;
  }
  function w(p, c, a, y) {
    for (var k = null, C = null, _ = c, T = c = 0, V = null; _ !== null && T < a.length; T++) {
      _.index > T ? (V = _, _ = null) : V = _.sibling;
      var z = m(p, _, a[T], y);
      if (z === null) {
        _ === null && (_ = V);
        break;
      }
      e && _ && z.alternate === null && t(p, _), c = i(z, c, T), C === null ? k = z : C.sibling = z, C = z, _ = V;
    }
    if (T === a.length) return n(p, _), B && Et(p, T), k;
    if (_ === null) {
      for (; T < a.length; T++) _ = h(p, a[T], y), _ !== null && (c = i(_, c, T), C === null ? k = _ : C.sibling = _, C = _);
      return B && Et(p, T), k;
    }
    for (_ = r(p, _); T < a.length; T++) V = g(_, p, T, a[T], y), V !== null && (e && V.alternate !== null && _.delete(V.key === null ? T : V.key), c = i(V, c, T), C === null ? k = V : C.sibling = V, C = V);
    return e && _.forEach(function(re) {
      return t(p, re);
    }), B && Et(p, T), k;
  }
  function x(p, c, a, y) {
    var k = vn(a);
    if (typeof k != "function") throw Error(S(150));
    if (a = k.call(a), a == null) throw Error(S(151));
    for (var C = k = null, _ = c, T = c = 0, V = null, z = a.next(); _ !== null && !z.done; T++, z = a.next()) {
      _.index > T ? (V = _, _ = null) : V = _.sibling;
      var re = m(p, _, z.value, y);
      if (re === null) {
        _ === null && (_ = V);
        break;
      }
      e && _ && re.alternate === null && t(p, _), c = i(re, c, T), C === null ? k = re : C.sibling = re, C = re, _ = V;
    }
    if (z.done) return n(
      p,
      _
    ), B && Et(p, T), k;
    if (_ === null) {
      for (; !z.done; T++, z = a.next()) z = h(p, z.value, y), z !== null && (c = i(z, c, T), C === null ? k = z : C.sibling = z, C = z);
      return B && Et(p, T), k;
    }
    for (_ = r(p, _); !z.done; T++, z = a.next()) z = g(_, p, T, z.value, y), z !== null && (e && z.alternate !== null && _.delete(z.key === null ? T : z.key), c = i(z, c, T), C === null ? k = z : C.sibling = z, C = z);
    return e && _.forEach(function(kt) {
      return t(p, kt);
    }), B && Et(p, T), k;
  }
  function I(p, c, a, y) {
    if (typeof a == "object" && a !== null && a.type === $t && a.key === null && (a = a.props.children), typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ur:
          e: {
            for (var k = a.key, C = c; C !== null; ) {
              if (C.key === k) {
                if (k = a.type, k === $t) {
                  if (C.tag === 7) {
                    n(p, C.sibling), c = l(C, a.props.children), c.return = p, p = c;
                    break e;
                  }
                } else if (C.elementType === k || typeof k == "object" && k !== null && k.$$typeof === nt && gu(k) === C.type) {
                  n(p, C.sibling), c = l(C, a.props), c.ref = kn(p, C, a), c.return = p, p = c;
                  break e;
                }
                n(p, C);
                break;
              } else t(p, C);
              C = C.sibling;
            }
            a.type === $t ? (c = jt(a.props.children, p.mode, y, a.key), c.return = p, p = c) : (y = Ir(a.type, a.key, a.props, null, p.mode, y), y.ref = kn(p, c, a), y.return = p, p = y);
          }
          return o(p);
        case Ft:
          e: {
            for (C = a.key; c !== null; ) {
              if (c.key === C) if (c.tag === 4 && c.stateNode.containerInfo === a.containerInfo && c.stateNode.implementation === a.implementation) {
                n(p, c.sibling), c = l(c, a.children || []), c.return = p, p = c;
                break e;
              } else {
                n(p, c);
                break;
              }
              else t(p, c);
              c = c.sibling;
            }
            c = Kl(a, p.mode, y), c.return = p, p = c;
          }
          return o(p);
        case nt:
          return C = a._init, I(p, c, C(a._payload), y);
      }
      if (Cn(a)) return w(p, c, a, y);
      if (vn(a)) return x(p, c, a, y);
      gr(p, a);
    }
    return typeof a == "string" && a !== "" || typeof a == "number" ? (a = "" + a, c !== null && c.tag === 6 ? (n(p, c.sibling), c = l(c, a), c.return = p, p = c) : (n(p, c), c = Gl(a, p.mode, y), c.return = p, p = c), o(p)) : n(p, c);
  }
  return I;
}
var on = ua(!0), sa = ua(!1), Xr = St(null), Jr = null, Kt = null, ao = null;
function co() {
  ao = Kt = Jr = null;
}
function fo(e) {
  var t = Xr.current;
  U(Xr), e._currentValue = t;
}
function Ei(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function en(e, t) {
  Jr = e, ao = Kt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (me = !0), e.firstContext = null);
}
function je(e) {
  var t = e._currentValue;
  if (ao !== e) if (e = { context: e, memoizedValue: t, next: null }, Kt === null) {
    if (Jr === null) throw Error(S(308));
    Kt = e, Jr.dependencies = { lanes: 0, firstContext: e };
  } else Kt = Kt.next = e;
  return t;
}
var _t = null;
function po(e) {
  _t === null ? _t = [e] : _t.push(e);
}
function aa(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, po(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Je(e, r);
}
function Je(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var rt = !1;
function mo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function ca(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ke(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function dt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Je(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, po(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Je(e, n);
}
function Pr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, qi(e, n);
  }
}
function Su(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Zr(e, t, n, r) {
  var l = e.updateQueue;
  rt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, d = s.next;
    s.next = null, o === null ? i = d : o.next = d, o = s;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, u = v.lastBaseUpdate, u !== o && (u === null ? v.firstBaseUpdate = d : u.next = d, v.lastBaseUpdate = s));
  }
  if (i !== null) {
    var h = l.baseState;
    o = 0, v = d = s = null, u = i;
    do {
      var m = u.lane, g = u.eventTime;
      if ((r & m) === m) {
        v !== null && (v = v.next = {
          eventTime: g,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var w = e, x = u;
          switch (m = t, g = n, x.tag) {
            case 1:
              if (w = x.payload, typeof w == "function") {
                h = w.call(g, h, m);
                break e;
              }
              h = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = x.payload, m = typeof w == "function" ? w.call(g, h, m) : w, m == null) break e;
              h = G({}, h, m);
              break e;
            case 2:
              rt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [u] : m.push(u));
      } else g = { eventTime: g, lane: m, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, v === null ? (d = v = g, s = h) : v = v.next = g, o |= m;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        m = u, u = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (s = h), l.baseState = s, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Ot |= o, e.lanes = o, e.memoizedState = h;
  }
}
function wu(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(S(191, l));
      l.call(r);
    }
  }
}
var lr = {}, Ve = St(lr), Yn = St(lr), Xn = St(lr);
function Tt(e) {
  if (e === lr) throw Error(S(174));
  return e;
}
function ho(e, t) {
  switch (F(Xn, t), F(Yn, e), F(Ve, lr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ri(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ri(t, e);
  }
  U(Ve), F(Ve, t);
}
function un() {
  U(Ve), U(Yn), U(Xn);
}
function fa(e) {
  Tt(Xn.current);
  var t = Tt(Ve.current), n = ri(t, e.type);
  t !== n && (F(Yn, e), F(Ve, n));
}
function vo(e) {
  Yn.current === e && (U(Ve), U(Yn));
}
var W = St(0);
function qr(e) {
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
var Ul = [];
function yo() {
  for (var e = 0; e < Ul.length; e++) Ul[e]._workInProgressVersionPrimary = null;
  Ul.length = 0;
}
var jr = qe.ReactCurrentDispatcher, Bl = qe.ReactCurrentBatchConfig, zt = 0, Q = null, J = null, q = null, br = !1, On = !1, Jn = 0, bf = 0;
function le() {
  throw Error(S(321));
}
function go(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function So(e, t, n, r, l, i) {
  if (zt = i, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, jr.current = e === null || e.memoizedState === null ? rd : ld, e = n(r, l), On) {
    i = 0;
    do {
      if (On = !1, Jn = 0, 25 <= i) throw Error(S(301));
      i += 1, q = J = null, t.updateQueue = null, jr.current = id, e = n(r, l);
    } while (On);
  }
  if (jr.current = el, t = J !== null && J.next !== null, zt = 0, q = J = Q = null, br = !1, t) throw Error(S(300));
  return e;
}
function wo() {
  var e = Jn !== 0;
  return Jn = 0, e;
}
function $e() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return q === null ? Q.memoizedState = q = e : q = q.next = e, q;
}
function Le() {
  if (J === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = q === null ? Q.memoizedState : q.next;
  if (t !== null) q = t, J = e;
  else {
    if (e === null) throw Error(S(310));
    J = e, e = { memoizedState: J.memoizedState, baseState: J.baseState, baseQueue: J.baseQueue, queue: J.queue, next: null }, q === null ? Q.memoizedState = q = e : q = q.next = e;
  }
  return q;
}
function Zn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Vl(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = J, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var u = o = null, s = null, d = i;
    do {
      var v = d.lane;
      if ((zt & v) === v) s !== null && (s = s.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var h = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        s === null ? (u = s = h, o = r) : s = s.next = h, Q.lanes |= v, Ot |= v;
      }
      d = d.next;
    } while (d !== null && d !== i);
    s === null ? o = r : s.next = u, Ae(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Q.lanes |= i, Ot |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Hl(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Ae(i, t.memoizedState) || (me = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function da() {
}
function pa(e, t) {
  var n = Q, r = Le(), l = t(), i = !Ae(r.memoizedState, l);
  if (i && (r.memoizedState = l, me = !0), r = r.queue, ko(va.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || q !== null && q.memoizedState.tag & 1) {
    if (n.flags |= 2048, qn(9, ha.bind(null, n, r, l, t), void 0, null), b === null) throw Error(S(349));
    zt & 30 || ma(n, t, l);
  }
  return l;
}
function ma(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function ha(e, t, n, r) {
  t.value = n, t.getSnapshot = r, ya(t) && ga(e);
}
function va(e, t, n) {
  return n(function() {
    ya(t) && ga(e);
  });
}
function ya(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function ga(e) {
  var t = Je(e, 1);
  t !== null && Me(t, e, 1, -1);
}
function ku(e) {
  var t = $e();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zn, lastRenderedState: e }, t.queue = e, e = e.dispatch = nd.bind(null, Q, e), [t.memoizedState, e];
}
function qn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Sa() {
  return Le().memoizedState;
}
function Lr(e, t, n, r) {
  var l = $e();
  Q.flags |= e, l.memoizedState = qn(1 | t, n, void 0, r === void 0 ? null : r);
}
function dl(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (J !== null) {
    var o = J.memoizedState;
    if (i = o.destroy, r !== null && go(r, o.deps)) {
      l.memoizedState = qn(t, n, i, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = qn(1 | t, n, i, r);
}
function xu(e, t) {
  return Lr(8390656, 8, e, t);
}
function ko(e, t) {
  return dl(2048, 8, e, t);
}
function wa(e, t) {
  return dl(4, 2, e, t);
}
function ka(e, t) {
  return dl(4, 4, e, t);
}
function xa(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ea(e, t, n) {
  return n = n != null ? n.concat([e]) : null, dl(4, 4, xa.bind(null, t, e), n);
}
function xo() {
}
function Na(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && go(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ca(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && go(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function _a(e, t, n) {
  return zt & 21 ? (Ae(n, t) || (n = Rs(), Q.lanes |= n, Ot |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function ed(e, t) {
  var n = A;
  A = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Bl.transition;
  Bl.transition = {};
  try {
    e(!1), t();
  } finally {
    A = n, Bl.transition = r;
  }
}
function Ta() {
  return Le().memoizedState;
}
function td(e, t, n) {
  var r = mt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Pa(e)) ja(t, n);
  else if (n = aa(e, t, n, r), n !== null) {
    var l = ae();
    Me(n, e, r, l), La(n, t, r);
  }
}
function nd(e, t, n) {
  var r = mt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Pa(e)) ja(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, u = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = u, Ae(u, o)) {
        var s = t.interleaved;
        s === null ? (l.next = l, po(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = aa(e, t, l, r), n !== null && (l = ae(), Me(n, e, r, l), La(n, t, r));
  }
}
function Pa(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function ja(e, t) {
  On = br = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function La(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, qi(e, n);
  }
}
var el = { readContext: je, useCallback: le, useContext: le, useEffect: le, useImperativeHandle: le, useInsertionEffect: le, useLayoutEffect: le, useMemo: le, useReducer: le, useRef: le, useState: le, useDebugValue: le, useDeferredValue: le, useTransition: le, useMutableSource: le, useSyncExternalStore: le, useId: le, unstable_isNewReconciler: !1 }, rd = { readContext: je, useCallback: function(e, t) {
  return $e().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: je, useEffect: xu, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Lr(
    4194308,
    4,
    xa.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Lr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Lr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = $e();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = $e();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = td.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = $e();
  return e = { current: e }, t.memoizedState = e;
}, useState: ku, useDebugValue: xo, useDeferredValue: function(e) {
  return $e().memoizedState = e;
}, useTransition: function() {
  var e = ku(!1), t = e[0];
  return e = ed.bind(null, e[1]), $e().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = $e();
  if (B) {
    if (n === void 0) throw Error(S(407));
    n = n();
  } else {
    if (n = t(), b === null) throw Error(S(349));
    zt & 30 || ma(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, xu(va.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, qn(9, ha.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = $e(), t = b.identifierPrefix;
  if (B) {
    var n = Ge, r = Qe;
    n = (r & ~(1 << 32 - De(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Jn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = bf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, ld = {
  readContext: je,
  useCallback: Na,
  useContext: je,
  useEffect: ko,
  useImperativeHandle: Ea,
  useInsertionEffect: wa,
  useLayoutEffect: ka,
  useMemo: Ca,
  useReducer: Vl,
  useRef: Sa,
  useState: function() {
    return Vl(Zn);
  },
  useDebugValue: xo,
  useDeferredValue: function(e) {
    var t = Le();
    return _a(t, J.memoizedState, e);
  },
  useTransition: function() {
    var e = Vl(Zn)[0], t = Le().memoizedState;
    return [e, t];
  },
  useMutableSource: da,
  useSyncExternalStore: pa,
  useId: Ta,
  unstable_isNewReconciler: !1
}, id = { readContext: je, useCallback: Na, useContext: je, useEffect: ko, useImperativeHandle: Ea, useInsertionEffect: wa, useLayoutEffect: ka, useMemo: Ca, useReducer: Hl, useRef: Sa, useState: function() {
  return Hl(Zn);
}, useDebugValue: xo, useDeferredValue: function(e) {
  var t = Le();
  return J === null ? t.memoizedState = e : _a(t, J.memoizedState, e);
}, useTransition: function() {
  var e = Hl(Zn)[0], t = Le().memoizedState;
  return [e, t];
}, useMutableSource: da, useSyncExternalStore: pa, useId: Ta, unstable_isNewReconciler: !1 };
function ze(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ni(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var pl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Mt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = mt(e), i = Ke(r, l);
  i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Me(t, e, l, r), Pr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = mt(e), i = Ke(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Me(t, e, l, r), Pr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ae(), r = mt(e), l = Ke(n, r);
  l.tag = 2, t != null && (l.callback = t), t = dt(e, l, r), t !== null && (Me(t, e, r, n), Pr(t, e, r));
} };
function Eu(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Wn(n, r) || !Wn(l, i) : !0;
}
function Ra(e, t, n) {
  var r = !1, l = yt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = je(i) : (l = ve(t) ? Lt : ue.current, r = t.contextTypes, i = (r = r != null) ? rn(e, l) : yt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = pl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Nu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && pl.enqueueReplaceState(t, t.state, null);
}
function Ci(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, mo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = je(i) : (i = ve(t) ? Lt : ue.current, l.context = rn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Ni(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && pl.enqueueReplaceState(l, l.state, null), Zr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function sn(e, t) {
  try {
    var n = "", r = t;
    do
      n += zc(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Wl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function _i(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var od = typeof WeakMap == "function" ? WeakMap : Map;
function za(e, t, n) {
  n = Ke(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    nl || (nl = !0, Mi = r), _i(e, t);
  }, n;
}
function Oa(e, t, n) {
  n = Ke(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      _i(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    _i(e, t), typeof r != "function" && (pt === null ? pt = /* @__PURE__ */ new Set([this]) : pt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Cu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new od();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = wd.bind(null, e, t, n), t.then(e, e));
}
function _u(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Tu(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ke(-1, 1), t.tag = 2, dt(n, t, 1))), n.lanes |= 1), e);
}
var ud = qe.ReactCurrentOwner, me = !1;
function se(e, t, n, r) {
  t.child = e === null ? sa(t, null, n, r) : on(t, e.child, n, r);
}
function Pu(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return en(t, l), r = So(e, t, n, r, i, l), n = wo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ze(e, t, l)) : (B && n && oo(t), t.flags |= 1, se(e, t, r, l), t.child);
}
function ju(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Lo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Ia(e, t, i, r, l)) : (e = Ir(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Wn, n(o, r) && e.ref === t.ref) return Ze(e, t, l);
  }
  return t.flags |= 1, e = ht(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Ia(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Wn(i, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, Ze(e, t, l);
  }
  return Ti(e, t, n, r, l);
}
function Da(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, F(Xt, ge), ge |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, F(Xt, ge), ge |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, F(Xt, ge), ge |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, F(Xt, ge), ge |= r;
  return se(e, t, l, n), t.child;
}
function Ma(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ti(e, t, n, r, l) {
  var i = ve(n) ? Lt : ue.current;
  return i = rn(t, i), en(t, l), n = So(e, t, n, r, i, l), r = wo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ze(e, t, l)) : (B && r && oo(t), t.flags |= 1, se(e, t, n, l), t.child);
}
function Lu(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    Gr(t);
  } else i = !1;
  if (en(t, l), t.stateNode === null) Rr(e, t), Ra(t, n, r), Ci(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, u = t.memoizedProps;
    o.props = u;
    var s = o.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = je(d) : (d = ve(n) ? Lt : ue.current, d = rn(t, d));
    var v = n.getDerivedStateFromProps, h = typeof v == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== d) && Nu(t, o, r, d), rt = !1;
    var m = t.memoizedState;
    o.state = m, Zr(t, r, o, l), s = t.memoizedState, u !== r || m !== s || he.current || rt ? (typeof v == "function" && (Ni(t, n, v, r), s = t.memoizedState), (u = rt || Eu(t, n, u, r, m, s, d)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), o.props = r, o.state = s, o.context = d, r = u) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, ca(e, t), u = t.memoizedProps, d = t.type === t.elementType ? u : ze(t.type, u), o.props = d, h = t.pendingProps, m = o.context, s = n.contextType, typeof s == "object" && s !== null ? s = je(s) : (s = ve(n) ? Lt : ue.current, s = rn(t, s));
    var g = n.getDerivedStateFromProps;
    (v = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== h || m !== s) && Nu(t, o, r, s), rt = !1, m = t.memoizedState, o.state = m, Zr(t, r, o, l);
    var w = t.memoizedState;
    u !== h || m !== w || he.current || rt ? (typeof g == "function" && (Ni(t, n, g, r), w = t.memoizedState), (d = rt || Eu(t, n, d, r, m, w, s) || !1) ? (v || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, w, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, w, s)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), o.props = r, o.state = w, o.context = s, r = d) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Pi(e, t, n, r, i, l);
}
function Pi(e, t, n, r, l, i) {
  Ma(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && hu(t, n, !1), Ze(e, t, i);
  r = t.stateNode, ud.current = t;
  var u = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = on(t, e.child, null, i), t.child = on(t, null, u, i)) : se(e, t, u, i), t.memoizedState = r.state, l && hu(t, n, !0), t.child;
}
function Aa(e) {
  var t = e.stateNode;
  t.pendingContext ? mu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && mu(e, t.context, !1), ho(e, t.containerInfo);
}
function Ru(e, t, n, r, l) {
  return ln(), so(l), t.flags |= 256, se(e, t, n, r), t.child;
}
var ji = { dehydrated: null, treeContext: null, retryLane: 0 };
function Li(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Fa(e, t, n) {
  var r = t.pendingProps, l = W.current, i = !1, o = (t.flags & 128) !== 0, u;
  if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), F(W, l & 1), e === null)
    return xi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = vl(o, r, 0, null), e = jt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Li(n), t.memoizedState = ji, e) : Eo(t, o));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return sd(e, t, o, r, u, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = ht(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? i = ht(u, i) : (i = jt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Li(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = ji, r;
  }
  return i = e.child, e = i.sibling, r = ht(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Eo(e, t) {
  return t = vl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Sr(e, t, n, r) {
  return r !== null && so(r), on(t, e.child, null, n), e = Eo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function sd(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Wl(Error(S(422))), Sr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = vl({ mode: "visible", children: r.children }, l, 0, null), i = jt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && on(t, e.child, null, o), t.child.memoizedState = Li(o), t.memoizedState = ji, i);
  if (!(t.mode & 1)) return Sr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, i = Error(S(419)), r = Wl(i, r, void 0), Sr(e, t, o, r);
  }
  if (u = (o & e.childLanes) !== 0, me || u) {
    if (r = b, r !== null) {
      switch (o & -o) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Je(e, l), Me(r, e, l, -1));
    }
    return jo(), r = Wl(Error(S(421))), Sr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = kd.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Se = ft(l.nextSibling), we = t, B = !0, Ie = null, e !== null && (Ce[_e++] = Qe, Ce[_e++] = Ge, Ce[_e++] = Rt, Qe = e.id, Ge = e.overflow, Rt = t), t = Eo(t, r.children), t.flags |= 4096, t);
}
function zu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ei(e.return, t, n);
}
function Ql(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function $a(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (se(e, t, r.children, n), r = W.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && zu(e, n, t);
      else if (e.tag === 19) zu(e, n, t);
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
  if (F(W, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && qr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Ql(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && qr(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Ql(t, !0, n, null, i);
      break;
    case "together":
      Ql(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Rr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ze(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ot |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(S(153));
  if (t.child !== null) {
    for (e = t.child, n = ht(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ht(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function ad(e, t, n) {
  switch (t.tag) {
    case 3:
      Aa(t), ln();
      break;
    case 5:
      fa(t);
      break;
    case 1:
      ve(t.type) && Gr(t);
      break;
    case 4:
      ho(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      F(Xr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (F(W, W.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Fa(e, t, n) : (F(W, W.current & 1), e = Ze(e, t, n), e !== null ? e.sibling : null);
      F(W, W.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return $a(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), F(W, W.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Da(e, t, n);
  }
  return Ze(e, t, n);
}
var Ua, Ri, Ba, Va;
Ua = function(e, t) {
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
Ri = function() {
};
Ba = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Tt(Ve.current);
    var i = null;
    switch (n) {
      case "input":
        l = bl(e, l), r = bl(e, r), i = [];
        break;
      case "select":
        l = G({}, l, { value: void 0 }), r = G({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = ni(e, l), r = ni(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Wr);
    }
    li(n, r);
    var o;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var u = l[d];
      for (o in u) u.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (An.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
    for (d in r) {
      var s = r[d];
      if (u = l != null ? l[d] : void 0, r.hasOwnProperty(d) && s !== u && (s != null || u != null)) if (d === "style") if (u) {
        for (o in u) !u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in s) s.hasOwnProperty(o) && u[o] !== s[o] && (n || (n = {}), n[o] = s[o]);
      } else n || (i || (i = []), i.push(
        d,
        n
      )), n = s;
      else d === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (i = i || []).push(d, s)) : d === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(d, "" + s) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (An.hasOwnProperty(d) ? (s != null && d === "onScroll" && $("scroll", e), i || u === s || (i = [])) : (i = i || []).push(d, s));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Va = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function xn(e, t) {
  if (!B) switch (e.tailMode) {
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
function ie(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function cd(e, t, n) {
  var r = t.pendingProps;
  switch (uo(t), t.tag) {
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
      return ie(t), null;
    case 1:
      return ve(t.type) && Qr(), ie(t), null;
    case 3:
      return r = t.stateNode, un(), U(he), U(ue), yo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (yr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ie !== null && ($i(Ie), Ie = null))), Ri(e, t), ie(t), null;
    case 5:
      vo(t);
      var l = Tt(Xn.current);
      if (n = t.type, e !== null && t.stateNode != null) Ba(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(S(166));
          return ie(t), null;
        }
        if (e = Tt(Ve.current), yr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ue] = t, r[Kn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              $("cancel", r), $("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              $("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Tn.length; l++) $(Tn[l], r);
              break;
            case "source":
              $("error", r);
              break;
            case "img":
            case "image":
            case "link":
              $(
                "error",
                r
              ), $("load", r);
              break;
            case "details":
              $("toggle", r);
              break;
            case "input":
              Bo(r, i), $("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, $("invalid", r);
              break;
            case "textarea":
              Ho(r, i), $("invalid", r);
          }
          li(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var u = i[o];
            o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && vr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && vr(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : An.hasOwnProperty(o) && u != null && o === "onScroll" && $("scroll", r);
          }
          switch (n) {
            case "input":
              sr(r), Vo(r, i, !0);
              break;
            case "textarea":
              sr(r), Wo(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Wr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = vs(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ue] = t, e[Kn] = r, Ua(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = ii(n, r), n) {
              case "dialog":
                $("cancel", e), $("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                $("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Tn.length; l++) $(Tn[l], e);
                l = r;
                break;
              case "source":
                $("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                $(
                  "error",
                  e
                ), $("load", e), l = r;
                break;
              case "details":
                $("toggle", e), l = r;
                break;
              case "input":
                Bo(e, r), l = bl(e, r), $("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = G({}, r, { value: void 0 }), $("invalid", e);
                break;
              case "textarea":
                Ho(e, r), l = ni(e, r), $("invalid", e);
                break;
              default:
                l = r;
            }
            li(n, l), u = l;
            for (i in u) if (u.hasOwnProperty(i)) {
              var s = u[i];
              i === "style" ? Ss(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && ys(e, s)) : i === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Fn(e, s) : typeof s == "number" && Fn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (An.hasOwnProperty(i) ? s != null && i === "onScroll" && $("scroll", e) : s != null && Gi(e, i, s, o));
            }
            switch (n) {
              case "input":
                sr(e), Vo(e, r, !1);
                break;
              case "textarea":
                sr(e), Wo(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + vt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? Jt(e, !!r.multiple, i, !1) : r.defaultValue != null && Jt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Wr);
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
      return ie(t), null;
    case 6:
      if (e && t.stateNode != null) Va(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(S(166));
        if (n = Tt(Xn.current), Tt(Ve.current), yr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ue] = t, (i = r.nodeValue !== n) && (e = we, e !== null)) switch (e.tag) {
            case 3:
              vr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && vr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ue] = t, t.stateNode = r;
      }
      return ie(t), null;
    case 13:
      if (U(W), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (B && Se !== null && t.mode & 1 && !(t.flags & 128)) oa(), ln(), t.flags |= 98560, i = !1;
        else if (i = yr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(S(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(S(317));
            i[Ue] = t;
          } else ln(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ie(t), i = !1;
        } else Ie !== null && ($i(Ie), Ie = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || W.current & 1 ? Z === 0 && (Z = 3) : jo())), t.updateQueue !== null && (t.flags |= 4), ie(t), null);
    case 4:
      return un(), Ri(e, t), e === null && Qn(t.stateNode.containerInfo), ie(t), null;
    case 10:
      return fo(t.type._context), ie(t), null;
    case 17:
      return ve(t.type) && Qr(), ie(t), null;
    case 19:
      if (U(W), i = t.memoizedState, i === null) return ie(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) xn(i, !1);
      else {
        if (Z !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = qr(e), o !== null) {
            for (t.flags |= 128, xn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return F(W, W.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && Y() > an && (t.flags |= 128, r = !0, xn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = qr(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), xn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !B) return ie(t), null;
        } else 2 * Y() - i.renderingStartTime > an && n !== 1073741824 && (t.flags |= 128, r = !0, xn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Y(), t.sibling = null, n = W.current, F(W, r ? n & 1 | 2 : n & 1), t) : (ie(t), null);
    case 22:
    case 23:
      return Po(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ge & 1073741824 && (ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ie(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function fd(e, t) {
  switch (uo(t), t.tag) {
    case 1:
      return ve(t.type) && Qr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return un(), U(he), U(ue), yo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return vo(t), null;
    case 13:
      if (U(W), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(S(340));
        ln();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return U(W), null;
    case 4:
      return un(), null;
    case 10:
      return fo(t.type._context), null;
    case 22:
    case 23:
      return Po(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var wr = !1, oe = !1, dd = typeof WeakSet == "function" ? WeakSet : Set, N = null;
function Yt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    K(e, t, r);
  }
  else n.current = null;
}
function zi(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var Ou = !1;
function pd(e, t) {
  if (hi = Br, e = Ks(), io(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, u = -1, s = -1, d = 0, v = 0, h = e, m = null;
        t: for (; ; ) {
          for (var g; h !== n || l !== 0 && h.nodeType !== 3 || (u = o + l), h !== i || r !== 0 && h.nodeType !== 3 || (s = o + r), h.nodeType === 3 && (o += h.nodeValue.length), (g = h.firstChild) !== null; )
            m = h, h = g;
          for (; ; ) {
            if (h === e) break t;
            if (m === n && ++d === l && (u = o), m === i && ++v === r && (s = o), (g = h.nextSibling) !== null) break;
            h = m, m = h.parentNode;
          }
          h = g;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (vi = { focusedElem: e, selectionRange: n }, Br = !1, N = t; N !== null; ) if (t = N, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, N = e;
  else for (; N !== null; ) {
    t = N;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var x = w.memoizedProps, I = w.memoizedState, p = t.stateNode, c = p.getSnapshotBeforeUpdate(t.elementType === t.type ? x : ze(t.type, x), I);
            p.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var a = t.stateNode.containerInfo;
          a.nodeType === 1 ? a.textContent = "" : a.nodeType === 9 && a.documentElement && a.removeChild(a.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(S(163));
      }
    } catch (y) {
      K(t, t.return, y);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, N = e;
      break;
    }
    N = t.return;
  }
  return w = Ou, Ou = !1, w;
}
function In(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && zi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function ml(e, t) {
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
function Oi(e) {
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
function Ha(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Ha(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ue], delete t[Kn], delete t[Si], delete t[Xf], delete t[Jf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Wa(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Iu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Wa(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ii(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ii(e, t, n), e = e.sibling; e !== null; ) Ii(e, t, n), e = e.sibling;
}
function Di(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Di(e, t, n), e = e.sibling; e !== null; ) Di(e, t, n), e = e.sibling;
}
var ee = null, Oe = !1;
function tt(e, t, n) {
  for (n = n.child; n !== null; ) Qa(e, t, n), n = n.sibling;
}
function Qa(e, t, n) {
  if (Be && typeof Be.onCommitFiberUnmount == "function") try {
    Be.onCommitFiberUnmount(ol, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      oe || Yt(n, t);
    case 6:
      var r = ee, l = Oe;
      ee = null, tt(e, t, n), ee = r, Oe = l, ee !== null && (Oe ? (e = ee, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null && (Oe ? (e = ee, n = n.stateNode, e.nodeType === 8 ? Fl(e.parentNode, n) : e.nodeType === 1 && Fl(e, n), Vn(e)) : Fl(ee, n.stateNode));
      break;
    case 4:
      r = ee, l = Oe, ee = n.stateNode.containerInfo, Oe = !0, tt(e, t, n), ee = r, Oe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!oe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && zi(n, t, o), l = l.next;
        } while (l !== r);
      }
      tt(e, t, n);
      break;
    case 1:
      if (!oe && (Yt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        K(n, t, u);
      }
      tt(e, t, n);
      break;
    case 21:
      tt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (oe = (r = oe) || n.memoizedState !== null, tt(e, t, n), oe = r) : tt(e, t, n);
      break;
    default:
      tt(e, t, n);
  }
}
function Du(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new dd()), t.forEach(function(r) {
      var l = xd.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Re(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, u = o;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            ee = u.stateNode, Oe = !1;
            break e;
          case 3:
            ee = u.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            ee = u.stateNode.containerInfo, Oe = !0;
            break e;
        }
        u = u.return;
      }
      if (ee === null) throw Error(S(160));
      Qa(i, o, l), ee = null, Oe = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (d) {
      K(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Ga(t, e), t = t.sibling;
}
function Ga(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Re(t, e), Fe(e), r & 4) {
        try {
          In(3, e, e.return), ml(3, e);
        } catch (x) {
          K(e, e.return, x);
        }
        try {
          In(5, e, e.return);
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 1:
      Re(t, e), Fe(e), r & 512 && n !== null && Yt(n, n.return);
      break;
    case 5:
      if (Re(t, e), Fe(e), r & 512 && n !== null && Yt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Fn(l, "");
        } catch (x) {
          K(e, e.return, x);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && i.type === "radio" && i.name != null && ms(l, i), ii(u, o);
          var d = ii(u, i);
          for (o = 0; o < s.length; o += 2) {
            var v = s[o], h = s[o + 1];
            v === "style" ? Ss(l, h) : v === "dangerouslySetInnerHTML" ? ys(l, h) : v === "children" ? Fn(l, h) : Gi(l, v, h, d);
          }
          switch (u) {
            case "input":
              ei(l, i);
              break;
            case "textarea":
              hs(l, i);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var g = i.value;
              g != null ? Jt(l, !!i.multiple, g, !1) : m !== !!i.multiple && (i.defaultValue != null ? Jt(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Jt(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Kn] = i;
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 6:
      if (Re(t, e), Fe(e), r & 4) {
        if (e.stateNode === null) throw Error(S(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 3:
      if (Re(t, e), Fe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Vn(t.containerInfo);
      } catch (x) {
        K(e, e.return, x);
      }
      break;
    case 4:
      Re(t, e), Fe(e);
      break;
    case 13:
      Re(t, e), Fe(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (_o = Y())), r & 4 && Du(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (oe = (d = oe) || v, Re(t, e), oe = d) : Re(t, e), Fe(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (N = e, v = e.child; v !== null; ) {
          for (h = N = v; N !== null; ) {
            switch (m = N, g = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                In(4, m, m.return);
                break;
              case 1:
                Yt(m, m.return);
                var w = m.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (x) {
                    K(r, n, x);
                  }
                }
                break;
              case 5:
                Yt(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  Au(h);
                  continue;
                }
            }
            g !== null ? (g.return = m, N = g) : Au(h);
          }
          v = v.sibling;
        }
        e: for (v = null, h = e; ; ) {
          if (h.tag === 5) {
            if (v === null) {
              v = h;
              try {
                l = h.stateNode, d ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = h.stateNode, s = h.memoizedProps.style, o = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = gs("display", o));
              } catch (x) {
                K(e, e.return, x);
              }
            }
          } else if (h.tag === 6) {
            if (v === null) try {
              h.stateNode.nodeValue = d ? "" : h.memoizedProps;
            } catch (x) {
              K(e, e.return, x);
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            v === h && (v = null), h = h.return;
          }
          v === h && (v = null), h.sibling.return = h.return, h = h.sibling;
        }
      }
      break;
    case 19:
      Re(t, e), Fe(e), r & 4 && Du(e);
      break;
    case 21:
      break;
    default:
      Re(
        t,
        e
      ), Fe(e);
  }
}
function Fe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Wa(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(S(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Fn(l, ""), r.flags &= -33);
          var i = Iu(e);
          Di(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, u = Iu(e);
          Ii(e, u, o);
          break;
        default:
          throw Error(S(161));
      }
    } catch (s) {
      K(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function md(e, t, n) {
  N = e, Ka(e);
}
function Ka(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var l = N, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || wr;
      if (!o) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || oe;
        u = wr;
        var d = oe;
        if (wr = o, (oe = s) && !d) for (N = l; N !== null; ) o = N, s = o.child, o.tag === 22 && o.memoizedState !== null ? Fu(l) : s !== null ? (s.return = o, N = s) : Fu(l);
        for (; i !== null; ) N = i, Ka(i), i = i.sibling;
        N = l, wr = u, oe = d;
      }
      Mu(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, N = i) : Mu(e);
  }
}
function Mu(e) {
  for (; N !== null; ) {
    var t = N;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            oe || ml(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !oe) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : ze(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && wu(t, i, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              wu(t, o, n);
            }
            break;
          case 5:
            var u = t.stateNode;
            if (n === null && t.flags & 4) {
              n = u;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && n.focus();
                  break;
                case "img":
                  s.src && (n.src = s.src);
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
                  var h = v.dehydrated;
                  h !== null && Vn(h);
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
            throw Error(S(163));
        }
        oe || t.flags & 512 && Oi(t);
      } catch (m) {
        K(t, t.return, m);
      }
    }
    if (t === e) {
      N = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, N = n;
      break;
    }
    N = t.return;
  }
}
function Au(e) {
  for (; N !== null; ) {
    var t = N;
    if (t === e) {
      N = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, N = n;
      break;
    }
    N = t.return;
  }
}
function Fu(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ml(4, t);
          } catch (s) {
            K(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              K(t, l, s);
            }
          }
          var i = t.return;
          try {
            Oi(t);
          } catch (s) {
            K(t, i, s);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Oi(t);
          } catch (s) {
            K(t, o, s);
          }
      }
    } catch (s) {
      K(t, t.return, s);
    }
    if (t === e) {
      N = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, N = u;
      break;
    }
    N = t.return;
  }
}
var hd = Math.ceil, tl = qe.ReactCurrentDispatcher, No = qe.ReactCurrentOwner, Pe = qe.ReactCurrentBatchConfig, D = 0, b = null, X = null, te = 0, ge = 0, Xt = St(0), Z = 0, bn = null, Ot = 0, hl = 0, Co = 0, Dn = null, pe = null, _o = 0, an = 1 / 0, He = null, nl = !1, Mi = null, pt = null, kr = !1, ut = null, rl = 0, Mn = 0, Ai = null, zr = -1, Or = 0;
function ae() {
  return D & 6 ? Y() : zr !== -1 ? zr : zr = Y();
}
function mt(e) {
  return e.mode & 1 ? D & 2 && te !== 0 ? te & -te : qf.transition !== null ? (Or === 0 && (Or = Rs()), Or) : (e = A, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Fs(e.type)), e) : 1;
}
function Me(e, t, n, r) {
  if (50 < Mn) throw Mn = 0, Ai = null, Error(S(185));
  tr(e, n, r), (!(D & 2) || e !== b) && (e === b && (!(D & 2) && (hl |= n), Z === 4 && it(e, te)), ye(e, r), n === 1 && D === 0 && !(t.mode & 1) && (an = Y() + 500, fl && wt()));
}
function ye(e, t) {
  var n = e.callbackNode;
  Zc(e, t);
  var r = Ur(e, e === b ? te : 0);
  if (r === 0) n !== null && Ko(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Ko(n), t === 1) e.tag === 0 ? Zf($u.bind(null, e)) : ra($u.bind(null, e)), Kf(function() {
      !(D & 6) && wt();
    }), n = null;
    else {
      switch (zs(r)) {
        case 1:
          n = Zi;
          break;
        case 4:
          n = js;
          break;
        case 16:
          n = $r;
          break;
        case 536870912:
          n = Ls;
          break;
        default:
          n = $r;
      }
      n = tc(n, Ya.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Ya(e, t) {
  if (zr = -1, Or = 0, D & 6) throw Error(S(327));
  var n = e.callbackNode;
  if (tn() && e.callbackNode !== n) return null;
  var r = Ur(e, e === b ? te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ll(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = Ja();
    (b !== e || te !== t) && (He = null, an = Y() + 500, Pt(e, t));
    do
      try {
        gd();
        break;
      } catch (u) {
        Xa(e, u);
      }
    while (!0);
    co(), tl.current = i, D = l, X !== null ? t = 0 : (b = null, te = 0, t = Z);
  }
  if (t !== 0) {
    if (t === 2 && (l = ci(e), l !== 0 && (r = l, t = Fi(e, l))), t === 1) throw n = bn, Pt(e, 0), it(e, r), ye(e, Y()), n;
    if (t === 6) it(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !vd(l) && (t = ll(e, r), t === 2 && (i = ci(e), i !== 0 && (r = i, t = Fi(e, i))), t === 1)) throw n = bn, Pt(e, 0), it(e, r), ye(e, Y()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          Nt(e, pe, He);
          break;
        case 3:
          if (it(e, r), (r & 130023424) === r && (t = _o + 500 - Y(), 10 < t)) {
            if (Ur(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ae(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = gi(Nt.bind(null, e, pe, He), t);
            break;
          }
          Nt(e, pe, He);
          break;
        case 4:
          if (it(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - De(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * hd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = gi(Nt.bind(null, e, pe, He), r);
            break;
          }
          Nt(e, pe, He);
          break;
        case 5:
          Nt(e, pe, He);
          break;
        default:
          throw Error(S(329));
      }
    }
  }
  return ye(e, Y()), e.callbackNode === n ? Ya.bind(null, e) : null;
}
function Fi(e, t) {
  var n = Dn;
  return e.current.memoizedState.isDehydrated && (Pt(e, t).flags |= 256), e = ll(e, t), e !== 2 && (t = pe, pe = n, t !== null && $i(t)), e;
}
function $i(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function vd(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Ae(i(), l)) return !1;
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
function it(e, t) {
  for (t &= ~Co, t &= ~hl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - De(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function $u(e) {
  if (D & 6) throw Error(S(327));
  tn();
  var t = Ur(e, 0);
  if (!(t & 1)) return ye(e, Y()), null;
  var n = ll(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ci(e);
    r !== 0 && (t = r, n = Fi(e, r));
  }
  if (n === 1) throw n = bn, Pt(e, 0), it(e, t), ye(e, Y()), n;
  if (n === 6) throw Error(S(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Nt(e, pe, He), ye(e, Y()), null;
}
function To(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (an = Y() + 500, fl && wt());
  }
}
function It(e) {
  ut !== null && ut.tag === 0 && !(D & 6) && tn();
  var t = D;
  D |= 1;
  var n = Pe.transition, r = A;
  try {
    if (Pe.transition = null, A = 1, e) return e();
  } finally {
    A = r, Pe.transition = n, D = t, !(D & 6) && wt();
  }
}
function Po() {
  ge = Xt.current, U(Xt);
}
function Pt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Gf(n)), X !== null) for (n = X.return; n !== null; ) {
    var r = n;
    switch (uo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Qr();
        break;
      case 3:
        un(), U(he), U(ue), yo();
        break;
      case 5:
        vo(r);
        break;
      case 4:
        un();
        break;
      case 13:
        U(W);
        break;
      case 19:
        U(W);
        break;
      case 10:
        fo(r.type._context);
        break;
      case 22:
      case 23:
        Po();
    }
    n = n.return;
  }
  if (b = e, X = e = ht(e.current, null), te = ge = t, Z = 0, bn = null, Co = hl = Ot = 0, pe = Dn = null, _t !== null) {
    for (t = 0; t < _t.length; t++) if (n = _t[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    _t = null;
  }
  return e;
}
function Xa(e, t) {
  do {
    var n = X;
    try {
      if (co(), jr.current = el, br) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        br = !1;
      }
      if (zt = 0, q = J = Q = null, On = !1, Jn = 0, No.current = null, n === null || n.return === null) {
        Z = 1, bn = t, X = null;
        break;
      }
      e: {
        var i = e, o = n.return, u = n, s = t;
        if (t = te, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var d = s, v = u, h = v.tag;
          if (!(v.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var m = v.alternate;
            m ? (v.updateQueue = m.updateQueue, v.memoizedState = m.memoizedState, v.lanes = m.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var g = _u(o);
          if (g !== null) {
            g.flags &= -257, Tu(g, o, u, i, t), g.mode & 1 && Cu(i, d, t), t = g, s = d;
            var w = t.updateQueue;
            if (w === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(s), t.updateQueue = x;
            } else w.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Cu(i, d, t), jo();
              break e;
            }
            s = Error(S(426));
          }
        } else if (B && u.mode & 1) {
          var I = _u(o);
          if (I !== null) {
            !(I.flags & 65536) && (I.flags |= 256), Tu(I, o, u, i, t), so(sn(s, u));
            break e;
          }
        }
        i = s = sn(s, u), Z !== 4 && (Z = 2), Dn === null ? Dn = [i] : Dn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = za(i, s, t);
              Su(i, p);
              break e;
            case 1:
              u = s;
              var c = i.type, a = i.stateNode;
              if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (pt === null || !pt.has(a)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var y = Oa(i, u, t);
                Su(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      qa(n);
    } catch (k) {
      t = k, X === n && n !== null && (X = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Ja() {
  var e = tl.current;
  return tl.current = el, e === null ? el : e;
}
function jo() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4), b === null || !(Ot & 268435455) && !(hl & 268435455) || it(b, te);
}
function ll(e, t) {
  var n = D;
  D |= 2;
  var r = Ja();
  (b !== e || te !== t) && (He = null, Pt(e, t));
  do
    try {
      yd();
      break;
    } catch (l) {
      Xa(e, l);
    }
  while (!0);
  if (co(), D = n, tl.current = r, X !== null) throw Error(S(261));
  return b = null, te = 0, Z;
}
function yd() {
  for (; X !== null; ) Za(X);
}
function gd() {
  for (; X !== null && !Vc(); ) Za(X);
}
function Za(e) {
  var t = ec(e.alternate, e, ge);
  e.memoizedProps = e.pendingProps, t === null ? qa(e) : X = t, No.current = null;
}
function qa(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = fd(n, t), n !== null) {
        n.flags &= 32767, X = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Z = 6, X = null;
        return;
      }
    } else if (n = cd(n, t, ge), n !== null) {
      X = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      X = t;
      return;
    }
    X = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function Nt(e, t, n) {
  var r = A, l = Pe.transition;
  try {
    Pe.transition = null, A = 1, Sd(e, t, n, r);
  } finally {
    Pe.transition = l, A = r;
  }
  return null;
}
function Sd(e, t, n, r) {
  do
    tn();
  while (ut !== null);
  if (D & 6) throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(S(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (qc(e, i), e === b && (X = b = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || kr || (kr = !0, tc($r, function() {
    return tn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Pe.transition, Pe.transition = null;
    var o = A;
    A = 1;
    var u = D;
    D |= 4, No.current = null, pd(e, n), Ga(n, e), $f(vi), Br = !!hi, vi = hi = null, e.current = n, md(n), Hc(), D = u, A = o, Pe.transition = i;
  } else e.current = n;
  if (kr && (kr = !1, ut = e, rl = l), i = e.pendingLanes, i === 0 && (pt = null), Gc(n.stateNode), ye(e, Y()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (nl) throw nl = !1, e = Mi, Mi = null, e;
  return rl & 1 && e.tag !== 0 && tn(), i = e.pendingLanes, i & 1 ? e === Ai ? Mn++ : (Mn = 0, Ai = e) : Mn = 0, wt(), null;
}
function tn() {
  if (ut !== null) {
    var e = zs(rl), t = Pe.transition, n = A;
    try {
      if (Pe.transition = null, A = 16 > e ? 16 : e, ut === null) var r = !1;
      else {
        if (e = ut, ut = null, rl = 0, D & 6) throw Error(S(331));
        var l = D;
        for (D |= 4, N = e.current; N !== null; ) {
          var i = N, o = i.child;
          if (N.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var d = u[s];
                for (N = d; N !== null; ) {
                  var v = N;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      In(8, v, i);
                  }
                  var h = v.child;
                  if (h !== null) h.return = v, N = h;
                  else for (; N !== null; ) {
                    v = N;
                    var m = v.sibling, g = v.return;
                    if (Ha(v), v === d) {
                      N = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = g, N = m;
                      break;
                    }
                    N = g;
                  }
                }
              }
              var w = i.alternate;
              if (w !== null) {
                var x = w.child;
                if (x !== null) {
                  w.child = null;
                  do {
                    var I = x.sibling;
                    x.sibling = null, x = I;
                  } while (x !== null);
                }
              }
              N = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, N = o;
          else e: for (; N !== null; ) {
            if (i = N, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                In(9, i, i.return);
            }
            var p = i.sibling;
            if (p !== null) {
              p.return = i.return, N = p;
              break e;
            }
            N = i.return;
          }
        }
        var c = e.current;
        for (N = c; N !== null; ) {
          o = N;
          var a = o.child;
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, N = a;
          else e: for (o = c; N !== null; ) {
            if (u = N, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  ml(9, u);
              }
            } catch (k) {
              K(u, u.return, k);
            }
            if (u === o) {
              N = null;
              break e;
            }
            var y = u.sibling;
            if (y !== null) {
              y.return = u.return, N = y;
              break e;
            }
            N = u.return;
          }
        }
        if (D = l, wt(), Be && typeof Be.onPostCommitFiberRoot == "function") try {
          Be.onPostCommitFiberRoot(ol, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      A = n, Pe.transition = t;
    }
  }
  return !1;
}
function Uu(e, t, n) {
  t = sn(n, t), t = za(e, t, 1), e = dt(e, t, 1), t = ae(), e !== null && (tr(e, 1, t), ye(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) Uu(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Uu(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (pt === null || !pt.has(r))) {
        e = sn(n, e), e = Oa(t, e, 1), t = dt(t, e, 1), e = ae(), t !== null && (tr(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function wd(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ae(), e.pingedLanes |= e.suspendedLanes & n, b === e && (te & n) === n && (Z === 4 || Z === 3 && (te & 130023424) === te && 500 > Y() - _o ? Pt(e, 0) : Co |= n), ye(e, t);
}
function ba(e, t) {
  t === 0 && (e.mode & 1 ? (t = fr, fr <<= 1, !(fr & 130023424) && (fr = 4194304)) : t = 1);
  var n = ae();
  e = Je(e, t), e !== null && (tr(e, t, n), ye(e, n));
}
function kd(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), ba(e, n);
}
function xd(e, t) {
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
      throw Error(S(314));
  }
  r !== null && r.delete(t), ba(e, n);
}
var ec;
ec = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || he.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, ad(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, B && t.flags & 1048576 && la(t, Yr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Rr(e, t), e = t.pendingProps;
      var l = rn(t, ue.current);
      en(t, n), l = So(null, t, r, e, l, n);
      var i = wo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (i = !0, Gr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, mo(t), l.updater = pl, t.stateNode = l, l._reactInternals = t, Ci(t, r, e, n), t = Pi(null, t, r, !0, i, n)) : (t.tag = 0, B && i && oo(t), se(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Rr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Nd(r), e = ze(r, e), l) {
          case 0:
            t = Ti(null, t, r, e, n);
            break e;
          case 1:
            t = Lu(null, t, r, e, n);
            break e;
          case 11:
            t = Pu(null, t, r, e, n);
            break e;
          case 14:
            t = ju(null, t, r, ze(r.type, e), n);
            break e;
        }
        throw Error(S(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Ti(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Lu(e, t, r, l, n);
    case 3:
      e: {
        if (Aa(t), e === null) throw Error(S(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, ca(e, t), Zr(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = sn(Error(S(423)), t), t = Ru(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = sn(Error(S(424)), t), t = Ru(e, t, r, n, l);
          break e;
        } else for (Se = ft(t.stateNode.containerInfo.firstChild), we = t, B = !0, Ie = null, n = sa(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (ln(), r === l) {
            t = Ze(e, t, n);
            break e;
          }
          se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return fa(t), e === null && xi(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, yi(r, l) ? o = null : i !== null && yi(r, i) && (t.flags |= 32), Ma(e, t), se(e, t, o, n), t.child;
    case 6:
      return e === null && xi(t), null;
    case 13:
      return Fa(e, t, n);
    case 4:
      return ho(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = on(t, null, r, n) : se(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Pu(e, t, r, l, n);
    case 7:
      return se(e, t, t.pendingProps, n), t.child;
    case 8:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, F(Xr, r._currentValue), r._currentValue = o, i !== null) if (Ae(i.value, o)) {
          if (i.children === l.children && !he.current) {
            t = Ze(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var u = i.dependencies;
          if (u !== null) {
            o = i.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (i.tag === 1) {
                  s = Ke(-1, n & -n), s.tag = 2;
                  var d = i.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? s.next = s : (s.next = v.next, v.next = s), d.pending = s;
                  }
                }
                i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Ei(
                  i.return,
                  n,
                  t
                ), u.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(S(341));
            o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Ei(o, n, t), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        se(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, en(t, n), l = je(l), r = r(l), t.flags |= 1, se(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ze(r, t.pendingProps), l = ze(r.type, l), ju(e, t, r, l, n);
    case 15:
      return Ia(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Rr(e, t), t.tag = 1, ve(r) ? (e = !0, Gr(t)) : e = !1, en(t, n), Ra(t, r, l), Ci(t, r, l, n), Pi(null, t, r, !0, e, n);
    case 19:
      return $a(e, t, n);
    case 22:
      return Da(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function tc(e, t) {
  return Ps(e, t);
}
function Ed(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Te(e, t, n, r) {
  return new Ed(e, t, n, r);
}
function Lo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Nd(e) {
  if (typeof e == "function") return Lo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Yi) return 11;
    if (e === Xi) return 14;
  }
  return 2;
}
function ht(e, t) {
  var n = e.alternate;
  return n === null ? (n = Te(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ir(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Lo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case $t:
      return jt(n.children, l, i, t);
    case Ki:
      o = 8, l |= 8;
      break;
    case Xl:
      return e = Te(12, n, t, l | 2), e.elementType = Xl, e.lanes = i, e;
    case Jl:
      return e = Te(13, n, t, l), e.elementType = Jl, e.lanes = i, e;
    case Zl:
      return e = Te(19, n, t, l), e.elementType = Zl, e.lanes = i, e;
    case fs:
      return vl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case as:
          o = 10;
          break e;
        case cs:
          o = 9;
          break e;
        case Yi:
          o = 11;
          break e;
        case Xi:
          o = 14;
          break e;
        case nt:
          o = 16, r = null;
          break e;
      }
      throw Error(S(130, e == null ? e : typeof e, ""));
  }
  return t = Te(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function jt(e, t, n, r) {
  return e = Te(7, e, r, t), e.lanes = n, e;
}
function vl(e, t, n, r) {
  return e = Te(22, e, r, t), e.elementType = fs, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Gl(e, t, n) {
  return e = Te(6, e, null, t), e.lanes = n, e;
}
function Kl(e, t, n) {
  return t = Te(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Cd(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Tl(0), this.expirationTimes = Tl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ro(e, t, n, r, l, i, o, u, s) {
  return e = new Cd(e, t, n, u, s), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Te(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, mo(i), e;
}
function _d(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ft, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function nc(e) {
  if (!e) return yt;
  e = e._reactInternals;
  e: {
    if (Mt(e) !== e || e.tag !== 1) throw Error(S(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(S(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return na(e, n, t);
  }
  return t;
}
function rc(e, t, n, r, l, i, o, u, s) {
  return e = Ro(n, r, !0, e, l, i, o, u, s), e.context = nc(null), n = e.current, r = ae(), l = mt(n), i = Ke(r, l), i.callback = t ?? null, dt(n, i, l), e.current.lanes = l, tr(e, l, r), ye(e, r), e;
}
function yl(e, t, n, r) {
  var l = t.current, i = ae(), o = mt(l);
  return n = nc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ke(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = dt(l, t, o), e !== null && (Me(e, l, o, i), Pr(e, l, o)), o;
}
function il(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Bu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function zo(e, t) {
  Bu(e, t), (e = e.alternate) && Bu(e, t);
}
function Td() {
  return null;
}
var lc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Oo(e) {
  this._internalRoot = e;
}
gl.prototype.render = Oo.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  yl(e, t, null, null);
};
gl.prototype.unmount = Oo.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    It(function() {
      yl(null, e, null, null);
    }), t[Xe] = null;
  }
};
function gl(e) {
  this._internalRoot = e;
}
gl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ds();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lt.length && t !== 0 && t < lt[n].priority; n++) ;
    lt.splice(n, 0, e), n === 0 && As(e);
  }
};
function Io(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Sl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Vu() {
}
function Pd(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var d = il(o);
        i.call(d);
      };
    }
    var o = rc(t, r, e, 0, null, !1, !1, "", Vu);
    return e._reactRootContainer = o, e[Xe] = o.current, Qn(e.nodeType === 8 ? e.parentNode : e), It(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var d = il(s);
      u.call(d);
    };
  }
  var s = Ro(e, 0, !1, null, null, !1, !1, "", Vu);
  return e._reactRootContainer = s, e[Xe] = s.current, Qn(e.nodeType === 8 ? e.parentNode : e), It(function() {
    yl(t, s, n, r);
  }), s;
}
function wl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = il(o);
        u.call(s);
      };
    }
    yl(t, o, e, l);
  } else o = Pd(n, t, e, l, r);
  return il(o);
}
Os = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = _n(t.pendingLanes);
        n !== 0 && (qi(t, n | 1), ye(t, Y()), !(D & 6) && (an = Y() + 500, wt()));
      }
      break;
    case 13:
      It(function() {
        var r = Je(e, 1);
        if (r !== null) {
          var l = ae();
          Me(r, e, 1, l);
        }
      }), zo(e, 1);
  }
};
bi = function(e) {
  if (e.tag === 13) {
    var t = Je(e, 134217728);
    if (t !== null) {
      var n = ae();
      Me(t, e, 134217728, n);
    }
    zo(e, 134217728);
  }
};
Is = function(e) {
  if (e.tag === 13) {
    var t = mt(e), n = Je(e, t);
    if (n !== null) {
      var r = ae();
      Me(n, e, t, r);
    }
    zo(e, t);
  }
};
Ds = function() {
  return A;
};
Ms = function(e, t) {
  var n = A;
  try {
    return A = e, t();
  } finally {
    A = n;
  }
};
ui = function(e, t, n) {
  switch (t) {
    case "input":
      if (ei(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = cl(r);
            if (!l) throw Error(S(90));
            ps(r), ei(r, l);
          }
        }
      }
      break;
    case "textarea":
      hs(e, n);
      break;
    case "select":
      t = n.value, t != null && Jt(e, !!n.multiple, t, !1);
  }
};
xs = To;
Es = It;
var jd = { usingClientEntryPoint: !1, Events: [rr, Ht, cl, ws, ks, To] }, En = { findFiberByHostInstance: Ct, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Ld = { bundleType: En.bundleType, version: En.version, rendererPackageName: En.rendererPackageName, rendererConfig: En.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = _s(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: En.findFiberByHostInstance || Td, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var xr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!xr.isDisabled && xr.supportsFiber) try {
    ol = xr.inject(Ld), Be = xr;
  } catch {
  }
}
xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = jd;
xe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Io(t)) throw Error(S(200));
  return _d(e, t, null, n);
};
xe.createRoot = function(e, t) {
  if (!Io(e)) throw Error(S(299));
  var n = !1, r = "", l = lc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ro(e, 1, !1, null, null, n, !1, r, l), e[Xe] = t.current, Qn(e.nodeType === 8 ? e.parentNode : e), new Oo(t);
};
xe.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
  return e = _s(t), e = e === null ? null : e.stateNode, e;
};
xe.flushSync = function(e) {
  return It(e);
};
xe.hydrate = function(e, t, n) {
  if (!Sl(t)) throw Error(S(200));
  return wl(null, e, t, !0, n);
};
xe.hydrateRoot = function(e, t, n) {
  if (!Io(e)) throw Error(S(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = lc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = rc(t, null, e, 1, n ?? null, l, !1, i, o), e[Xe] = t.current, Qn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new gl(t);
};
xe.render = function(e, t, n) {
  if (!Sl(t)) throw Error(S(200));
  return wl(null, e, t, !1, n);
};
xe.unmountComponentAtNode = function(e) {
  if (!Sl(e)) throw Error(S(40));
  return e._reactRootContainer ? (It(function() {
    wl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Xe] = null;
    });
  }), !0) : !1;
};
xe.unstable_batchedUpdates = To;
xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Sl(n)) throw Error(S(200));
  if (e == null || e._reactInternals === void 0) throw Error(S(38));
  return wl(e, t, n, !1, r);
};
xe.version = "18.3.1-next-f1338f8080-20240426";
function ic() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ic);
    } catch (e) {
      console.error(e);
    }
}
ic(), is.exports = xe;
var oc = is.exports, Hu = oc;
Dr.createRoot = Hu.createRoot, Dr.hydrateRoot = Hu.hydrateRoot;
var uc = { exports: {} }, kl = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rd = M, zd = Symbol.for("react.element"), Od = Symbol.for("react.fragment"), Id = Object.prototype.hasOwnProperty, Dd = Rd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Md = { key: !0, ref: !0, __self: !0, __source: !0 };
function sc(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Id.call(t, r) && !Md.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: zd, type: e, key: i, ref: o, props: l, _owner: Dd.current };
}
kl.Fragment = Od;
kl.jsx = sc;
kl.jsxs = sc;
uc.exports = kl;
var f = uc.exports;
function Ad({
  timeMode: e,
  onToggleTimeMode: t,
  activeJobsCount: n,
  readyJobsCount: r,
  // Completed jobs ready for download
  selectedCount: l,
  totalCount: i
}) {
  const o = () => {
    window.dispatchEvent(new CustomEvent("open-export-monitor"));
  };
  return /* @__PURE__ */ f.jsxs("div", { className: "extractor-header", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "header-left", children: [
      /* @__PURE__ */ f.jsx("span", { className: "status-indicator" }),
      /* @__PURE__ */ f.jsx("span", { className: "title", children: "ARCHIVE EXTRACTOR" })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "header-center", children: /* @__PURE__ */ f.jsxs("div", { className: "time-mode-toggle", title: "Toggle Universal Coordinated Time / Local Device Time", children: [
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: `toggle-pill ${e === "LOCAL" ? "active" : ""}`,
          onClick: () => t("LOCAL"),
          children: "LOCAL"
        }
      ),
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: `toggle-pill ${e === "UTC" ? "active" : ""}`,
          onClick: () => t("UTC"),
          children: "UTC"
        }
      )
    ] }) }),
    /* @__PURE__ */ f.jsxs("div", { className: "header-badges", children: [
      n > 0 && /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: "active-jobs-pill-btn",
          onClick: o,
          title: "Click to view packaging progress",
          children: [
            /* @__PURE__ */ f.jsx("span", { className: "dot pulse" }),
            /* @__PURE__ */ f.jsxs("span", { children: [
              n,
              " PACKAGING"
            ] })
          ]
        }
      ),
      r > 0 && /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: "ready-jobs-pill-btn",
          onClick: o,
          title: "Click to open ready archives for download",
          children: [
            /* @__PURE__ */ f.jsx("span", { className: "dot ready" }),
            /* @__PURE__ */ f.jsxs("span", { children: [
              r,
              " READY"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: "station-pill", children: [
        l,
        " / ",
        i,
        " STATIONS"
      ] })
    ] })
  ] });
}
function Fd({
  startString: e,
  endString: t,
  timeMode: n,
  isScanning: r,
  isSubmitting: l,
  onStartChange: i,
  onEndChange: o,
  onScan: u
}) {
  const s = M.useRef(null), d = M.useRef(null);
  return /* @__PURE__ */ f.jsxs("div", { className: "time-range-bar", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "time-field-card", onClick: () => {
      var v, h;
      try {
        (h = (v = s.current) == null ? void 0 : v.showPicker) == null || h.call(v);
      } catch {
      }
    }, children: [
      /* @__PURE__ */ f.jsxs("div", { className: "field-meta", children: [
        /* @__PURE__ */ f.jsxs("span", { className: "field-label", children: [
          "START WINDOW (",
          n,
          ")"
        ] }),
        /* @__PURE__ */ f.jsx("span", { className: "field-icon", children: "📅" })
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          ref: s,
          type: "datetime-local",
          className: "control-input",
          lang: "en-GB",
          value: e,
          onClick: (v) => {
            var h, m;
            v.stopPropagation();
            try {
              (m = (h = v.target).showPicker) == null || m.call(h);
            } catch {
            }
          },
          onChange: (v) => i(v.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "time-field-card", onClick: () => {
      var v, h;
      try {
        (h = (v = d.current) == null ? void 0 : v.showPicker) == null || h.call(v);
      } catch {
      }
    }, children: [
      /* @__PURE__ */ f.jsxs("div", { className: "field-meta", children: [
        /* @__PURE__ */ f.jsxs("span", { className: "field-label", children: [
          "END WINDOW (",
          n,
          ")"
        ] }),
        /* @__PURE__ */ f.jsx("span", { className: "field-icon", children: "📅" })
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          ref: d,
          type: "datetime-local",
          className: "control-input",
          lang: "en-GB",
          value: t,
          onClick: (v) => {
            var h, m;
            v.stopPropagation();
            try {
              (m = (h = v.target).showPicker) == null || m.call(h);
            } catch {
            }
          },
          onChange: (v) => o(v.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx(
      "button",
      {
        className: `btn-scan-action ${r ? "scanning" : ""}`,
        onClick: u,
        disabled: r || l,
        children: r ? "SCANNING..." : "SCAN ARCHIVES"
      }
    )
  ] });
}
function $d({ availableHosts: e, selectedHosts: t, preview: n, onToggleHost: r, onSelectBatch: l, onClearBatch: i }) {
  var h;
  const [o, u] = M.useState(""), [s, d] = M.useState("ALL"), v = M.useMemo(() => e.filter((m) => {
    var x;
    if (!m.toLowerCase().includes(o.toLowerCase())) return !1;
    const w = (x = n == null ? void 0 : n.stations) == null ? void 0 : x.find((I) => I.hostname === m);
    return s === "SELECTED" ? t.includes(m) : s === "GAPS" ? w == null ? void 0 : w.hasTimeGaps : !0;
  }), [e, o, s, t, n]);
  return /* @__PURE__ */ f.jsxs("div", { className: "station-pool-card", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "pool-toolbar", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "search-wrap", children: [
        /* @__PURE__ */ f.jsx("span", { className: "search-icon", children: "🔍" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "text",
            placeholder: "Filter by station name...",
            value: o,
            onChange: (m) => u(m.target.value),
            className: "search-input"
          }
        ),
        o && /* @__PURE__ */ f.jsx("button", { className: "btn-clear-search", onClick: () => u(""), children: "✕" })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "pool-filters", children: [
        /* @__PURE__ */ f.jsxs("button", { className: `filter-chip ${s === "ALL" ? "active" : ""}`, onClick: () => d("ALL"), children: [
          "ALL (",
          e.length,
          ")"
        ] }),
        /* @__PURE__ */ f.jsxs("button", { className: `filter-chip ${s === "SELECTED" ? "active" : ""}`, onClick: () => d("SELECTED"), children: [
          "SELECTED (",
          t.length,
          ")"
        ] }),
        /* @__PURE__ */ f.jsxs("button", { className: `filter-chip ${s === "GAPS" ? "active" : ""}`, onClick: () => d("GAPS"), children: [
          "WITH GAPS (",
          ((h = n == null ? void 0 : n.stations) == null ? void 0 : h.filter((m) => m.hasTimeGaps).length) || 0,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "bulk-actions", children: [
        /* @__PURE__ */ f.jsx("button", { className: "btn-mini", onClick: () => l(v), children: "SELECT VISIBLE" }),
        /* @__PURE__ */ f.jsx("button", { className: "btn-mini", onClick: () => i(v), children: "CLEAR" })
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "station-matrix-grid", children: v.map((m) => {
      var p, c;
      const g = (p = n == null ? void 0 : n.stations) == null ? void 0 : p.find((a) => a.hostname === m), w = g == null ? void 0 : g.hasTimeGaps, x = ((c = g == null ? void 0 : g.gaps) == null ? void 0 : c.length) || 0, I = t.includes(m);
      return /* @__PURE__ */ f.jsxs(
        "div",
        {
          className: `station-tile ${I ? "selected" : ""} ${w ? "has-gaps" : ""}`,
          onClick: () => r(m),
          title: `${m} ${w ? `(${x} gaps)` : "(Continuous)"}`,
          children: [
            /* @__PURE__ */ f.jsx(
              "input",
              {
                type: "checkbox",
                checked: I,
                onChange: () => {
                },
                className: "tile-check"
              }
            ),
            /* @__PURE__ */ f.jsx("span", { className: "tile-host-name", children: m }),
            n && /* @__PURE__ */ f.jsx("span", { className: `tile-tag ${w ? "warn" : "ok"}`, children: w ? `${x}G` : "OK" })
          ]
        },
        m
      );
    }) })
  ] });
}
const Ud = (e) => {
  if (!e) return "0 B";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(2)} GB` : `${t.toFixed(1)} MB`;
};
function Bd({ totalChunks: e, totalBytes: t, totalGaps: n, hasAnyGaps: r }) {
  return /* @__PURE__ */ f.jsxs("div", { className: "telemetry-compact-bar", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "metric-pill", children: [
      /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "SEGMENTS:" }),
      /* @__PURE__ */ f.jsx("span", { className: "val", children: e })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "metric-pill highlight", children: [
      /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "EST. ARCHIVE:" }),
      /* @__PURE__ */ f.jsx("span", { className: "val accent", children: Ud(t) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "metric-pill", children: [
      /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "GAPS:" }),
      /* @__PURE__ */ f.jsx("span", { className: `val ${n > 0 ? "rose" : ""}`, children: n })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: `continuity-capsule ${r ? "alert" : "healthy"}`, children: [
      /* @__PURE__ */ f.jsx("span", { className: "indicator-dot" }),
      /* @__PURE__ */ f.jsx("span", { children: r ? "TELEMETRY GAPS DETECTED" : "UNBROKEN STREAM" })
    ] })
  ] });
}
function Vd({ gaps: e, timeMode: t }) {
  if (!e || e.length === 0) return null;
  const n = t === "UTC", r = (l) => {
    const i = new Date(l);
    return n ? i.toLocaleTimeString("en-GB", { timeZone: "UTC", hour12: !1 }) : i.toLocaleTimeString("en-GB", { hour12: !1 });
  };
  return /* @__PURE__ */ f.jsx("div", { className: "gaps-compact-card", children: /* @__PURE__ */ f.jsxs("table", { className: "gaps-table", children: [
    /* @__PURE__ */ f.jsx("thead", { children: /* @__PURE__ */ f.jsxs("tr", { children: [
      /* @__PURE__ */ f.jsx("th", { children: "STATION" }),
      /* @__PURE__ */ f.jsxs("th", { children: [
        "EXPECTED (",
        t,
        ")"
      ] }),
      /* @__PURE__ */ f.jsxs("th", { children: [
        "RESUMED (",
        t,
        ")"
      ] }),
      /* @__PURE__ */ f.jsx("th", { children: "GAP DURATION" })
    ] }) }),
    /* @__PURE__ */ f.jsx("tbody", { children: e.map((l, i) => {
      var o, u;
      return /* @__PURE__ */ f.jsxs("tr", { children: [
        /* @__PURE__ */ f.jsx("td", { className: "host-col", children: l.hostname }),
        /* @__PURE__ */ f.jsx("td", { children: r(l.expectedUtc) }),
        /* @__PURE__ */ f.jsx("td", { children: r(l.actualNextStartUtc) }),
        /* @__PURE__ */ f.jsx("td", { className: "gap-len-col", children: /* @__PURE__ */ f.jsx("span", { className: "gap-pill", children: ((u = (o = l.gapDuration) == null ? void 0 : o.split) == null ? void 0 : u.call(o, ".")[0]) || l.gapDuration }) })
      ] }, i);
    }) })
  ] }) });
}
const Wu = (e, t) => {
  const n = new Date(e);
  if (t) return n.toISOString().slice(0, 16);
  const r = (l) => String(l).padStart(2, "0");
  return `${n.getFullYear()}-${r(n.getMonth() + 1)}-${r(n.getDate())}T${r(n.getHours())}:${r(n.getMinutes())}`;
}, Qu = (e, t) => e ? t ? Date.parse(e + ":00.000Z") : new Date(e).getTime() : Date.now();
function Hd({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  title: r = "EXPORT CONFIRMATION",
  summaryText: l = ""
}) {
  const [i, o] = M.useState("Caption"), [u, s] = M.useState(!1);
  if (!e) return null;
  const d = async () => {
    s(!0);
    try {
      await n(i), t();
    } finally {
      s(!1);
    }
  };
  return /* @__PURE__ */ f.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, children: /* @__PURE__ */ f.jsxs("div", { className: "itb-export-modal-card", onClick: (v) => v.stopPropagation(), children: [
    /* @__PURE__ */ f.jsxs("div", { className: "modal-header", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "header-title", children: [
        /* @__PURE__ */ f.jsx("span", { className: "dot" }),
        /* @__PURE__ */ f.jsx("h3", { children: r })
      ] }),
      /* @__PURE__ */ f.jsx("button", { type: "button", className: "btn-close", onClick: t, children: "✕" })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "modal-body", children: [
      l && /* @__PURE__ */ f.jsx("div", { className: "summary-banner", children: l }),
      /* @__PURE__ */ f.jsx("div", { className: "options-title", children: "SELECT KEYSTROKE PRESENTATION" }),
      /* @__PURE__ */ f.jsxs("div", { className: "modes-grid", children: [
        /* @__PURE__ */ f.jsxs("label", { className: `mode-card ${i === "Caption" ? "active" : ""}`, children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "radio",
              name: "keystrokeMode",
              value: "Caption",
              checked: i === "Caption",
              onChange: () => o("Caption")
            }
          ),
          /* @__PURE__ */ f.jsxs("div", { className: "mode-content", children: [
            /* @__PURE__ */ f.jsx("div", { className: "mode-name", children: "SOFT CAPTIONS (RECOMMENDED)" }),
            /* @__PURE__ */ f.jsx("div", { className: "mode-desc", children: "Embeds a soft subtitle track (mov_text). Toggable in VLC/Players, keeps video pristine and clean." })
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: `mode-card ${i === "BurnIn" ? "active" : ""}`, children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "radio",
              name: "keystrokeMode",
              value: "BurnIn",
              checked: i === "BurnIn",
              onChange: () => o("BurnIn")
            }
          ),
          /* @__PURE__ */ f.jsxs("div", { className: "mode-content", children: [
            /* @__PURE__ */ f.jsx("div", { className: "mode-name", children: "HARD BURN-IN" }),
            /* @__PURE__ */ f.jsx("div", { className: "mode-desc", children: "Permanently bakes keystrokes directly onto the video pixels for unalterable court evidence." })
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: `mode-card ${i === "None" ? "active" : ""}`, children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "radio",
              name: "keystrokeMode",
              value: "None",
              checked: i === "None",
              onChange: () => o("None")
            }
          ),
          /* @__PURE__ */ f.jsxs("div", { className: "mode-content", children: [
            /* @__PURE__ */ f.jsx("div", { className: "mode-name", children: "NONE (CLEAN VIDEO)" }),
            /* @__PURE__ */ f.jsx("div", { className: "mode-desc", children: "Export video without any keystroke overlays or subtitle tracks." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "modal-footer", children: [
      /* @__PURE__ */ f.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: u, children: "CANCEL" }),
      /* @__PURE__ */ f.jsx("button", { type: "button", className: "btn-confirm", onClick: d, disabled: u, children: u ? "PREPARING..." : "CONFIRM & EXPORT" })
    ] })
  ] }) });
}
function Wd({
  defaultWindowHours: e = 24,
  renderExtraHeaderActions: t,
  renderExtraControls: n
}) {
  var R;
  const [r, l] = M.useState("LOCAL"), [i, o] = M.useState(() => Date.now() - e * 60 * 60 * 1e3), [u, s] = M.useState(() => Date.now()), [d, v] = M.useState([]), [h, m] = M.useState([]), [g, w] = M.useState(null), [x, I] = M.useState(!1), [p, c] = M.useState(!1), [a, y] = M.useState(0), [k, C] = M.useState(0), [_, T] = M.useState(!1), [V, z] = M.useState(!1), re = r === "UTC";
  M.useEffect(() => {
    const P = (H) => {
      if (!Array.isArray(H)) return;
      const de = H.filter((Ne) => Ne.status === "Processing" || Ne.status === "Queued").length, et = H.filter((Ne) => Ne.isCompleted).length;
      y(de), C(et);
    };
    fetch("/api/v1/extractor/jobs").then((H) => H.ok ? H.json() : []).then(P).catch(() => {
    });
    const L = (H) => P(H.detail || []);
    return window.addEventListener("export-jobs-updated", L), () => window.removeEventListener("export-jobs-updated", L);
  }, []);
  const kt = async () => {
    I(!0), w(null), v([]), c(!0);
    try {
      const P = new Date(i).toISOString(), L = new Date(u).toISOString(), H = await fetch(
        `/api/v1/extractor/recorded-hosts?startUtc=${encodeURIComponent(P)}&endUtc=${encodeURIComponent(L)}`
      );
      if (!H.ok) throw new Error("Failed to retrieve recorded stations");
      const de = await H.json();
      if (v(de), m(de), de.length > 0) {
        const et = await fetch("/api/v1/extractor/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startTimeUtc: P, endTimeUtc: L, hostnames: de })
        });
        et.ok && w(await et.json());
      }
    } catch (P) {
      console.error("[ExtractorTile] Scan error:", P);
    } finally {
      I(!1);
    }
  }, xt = async (P) => {
    if (h.length !== 0) {
      T(!0);
      try {
        if (!(await fetch("/api/v1/extractor/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startTimeUtc: new Date(i).toISOString(),
            endTimeUtc: new Date(u).toISOString(),
            hostnames: h,
            keystrokeMode: P
          })
        })).ok) throw new Error("Failed to enqueue export task");
        window.dispatchEvent(new CustomEvent("open-export-monitor"));
      } catch (L) {
        alert("Export Error: " + L.message);
      } finally {
        T(!1);
      }
    }
  }, be = ((R = g == null ? void 0 : g.stations) == null ? void 0 : R.filter((P) => h.includes(P.hostname))) || [], pn = be.reduce((P, L) => P + L.chunkCount, 0), mn = be.reduce((P, L) => P + L.totalSizeBytes, 0), hn = be.some((P) => P.hasTimeGaps), E = be.reduce((P, L) => {
    var H;
    return P + (((H = L.gaps) == null ? void 0 : H.length) || 0);
  }, 0), j = be.flatMap((P) => P.gaps.map((L) => ({ ...L, hostname: P.hostname })));
  return /* @__PURE__ */ f.jsxs("div", { className: "extractor-tile", children: [
    /* @__PURE__ */ f.jsx(
      Ad,
      {
        timeMode: r,
        onToggleTimeMode: l,
        activeJobsCount: a,
        readyJobsCount: k,
        selectedCount: h.length,
        totalCount: d.length
      }
    ),
    t && t(),
    /* @__PURE__ */ f.jsxs("div", { className: "tile-body", children: [
      /* @__PURE__ */ f.jsx(
        Fd,
        {
          startString: Wu(i, re),
          endString: Wu(u, re),
          timeMode: r,
          isScanning: x,
          isSubmitting: _,
          onStartChange: (P) => o(Qu(P, re)),
          onEndChange: (P) => s(Qu(P, re)),
          onScan: kt
        }
      ),
      p && d.length === 0 && !x && /* @__PURE__ */ f.jsx("div", { className: "no-hosts-banner", children: /* @__PURE__ */ f.jsx("span", { children: "⚠️ No recorded station streams found in the requested time range." }) }),
      d.length > 0 && /* @__PURE__ */ f.jsx(
        $d,
        {
          availableHosts: d,
          selectedHosts: h,
          preview: g,
          onToggleHost: (P) => m(
            (L) => L.includes(P) ? L.filter((H) => H !== P) : [...L, P]
          ),
          onSelectBatch: (P) => m((L) => Array.from(/* @__PURE__ */ new Set([...L, ...P]))),
          onClearBatch: (P) => m((L) => L.filter((H) => !P.includes(H)))
        }
      ),
      n && n({ selectedHosts: h, preview: g }),
      /* @__PURE__ */ f.jsx(
        Bd,
        {
          totalChunks: pn,
          totalBytes: mn,
          totalGaps: E,
          hasAnyGaps: hn
        }
      ),
      /* @__PURE__ */ f.jsx(Vd, { gaps: j, timeMode: r })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "tile-footer", children: /* @__PURE__ */ f.jsx(
      "button",
      {
        className: "btn-cta-export",
        onClick: () => z(!0),
        disabled: _ || h.length === 0 || pn === 0,
        children: _ ? "ENQUEUING EXPORT TASK..." : `DOWNLOAD TAR (BACKGROUND) • ${h.length} STATIONS`
      }
    ) }),
    /* @__PURE__ */ f.jsx(
      Hd,
      {
        isOpen: V,
        onClose: () => z(!1),
        onConfirm: xt,
        title: "BASIC EXTRACTOR - EXPORT TAR",
        summaryText: `Selected Stations: ${h.length} | Chunks: ${pn}`
      }
    )
  ] });
}
const Gu = (e) => {
  if (!e || e <= 0) return "--:--";
  const t = Math.floor(e / 60), n = e % 60;
  return `${String(t).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}, Ku = (e) => {
  if (!e) return "0 B";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(2)} GB` : `${t.toFixed(1)} MB`;
};
function Qd({ externalOpen: e, onCloseExternal: t }) {
  const [n, r] = M.useState([]), [l, i] = M.useState(!1), [o, u] = M.useState("ALL"), s = M.useRef(null), d = e !== void 0 ? e : l, v = (a) => {
    i(a), !a && t && t();
  }, h = async () => {
    try {
      const a = await fetch("/api/v1/extractor/jobs");
      if (a.ok) {
        const y = await a.json();
        r(y), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: y }));
      }
    } catch (a) {
      console.warn("[ExportJobMonitor] Polling failed:", a);
    }
  };
  M.useEffect(() => {
    h(), s.current = setInterval(h, 2500);
    const a = () => i(!0);
    return window.addEventListener("open-export-monitor", a), () => {
      s.current && clearInterval(s.current), window.removeEventListener("open-export-monitor", a);
    };
  }, []);
  const m = M.useMemo(() => n.filter((a) => a.status === "Processing" || a.status === "Queued"), [n]), g = M.useMemo(() => n.filter((a) => a.isCompleted), [n]), w = M.useMemo(() => o === "ACTIVE" ? m : o === "READY" ? g : n, [n, o, m, g]), x = (a) => {
    const y = `/api/v1/extractor/jobs/${a.jobId}/download`, k = document.createElement("a");
    k.href = y, k.download = a.fileName || "Archive_Export.tar", document.body.appendChild(k), k.click(), k.remove(), setTimeout(h, 1e3);
  }, I = async (a, y) => {
    y.stopPropagation();
    try {
      await fetch(`/api/v1/extractor/jobs/${a}/bookmark`, { method: "POST" }), h();
    } catch {
    }
  }, p = (a, y) => {
    y.stopPropagation(), a && (navigator.clipboard.writeText(a), alert(`Shared Network Directory copied:
${a}`));
  }, c = async (a, y) => {
    y.stopPropagation();
    try {
      await fetch(`/api/v1/extractor/jobs/${a}`, { method: "DELETE" }), r((k) => k.filter((C) => C.jobId !== a));
    } catch {
    }
  };
  return n.length === 0 && !d ? null : oc.createPortal(
    /* @__PURE__ */ f.jsxs("div", { className: "export-job-monitor-root", children: [
      n.length > 0 && /* @__PURE__ */ f.jsx(
        "div",
        {
          className: `export-floating-hud ${m.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => v(!d),
          title: "Open Export Queue",
          children: m.length > 0 ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
            /* @__PURE__ */ f.jsx("span", { className: "beacon-dot active" }),
            /* @__PURE__ */ f.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ f.jsxs("span", { className: "hud-title", children: [
                "EXPORTS: ",
                m.length,
                " PACKAGING"
              ] }),
              /* @__PURE__ */ f.jsxs("span", { className: "hud-metric", children: [
                m[0].progressPercent,
                "% • ETA -",
                Gu(m[0].etaSeconds)
              ] })
            ] })
          ] }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
            /* @__PURE__ */ f.jsx("span", { className: "beacon-dot done" }),
            /* @__PURE__ */ f.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ f.jsxs("span", { className: "hud-title", children: [
                g.length,
                " ARCHIVE",
                g.length > 1 ? "S" : "",
                " READY"
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: "hud-metric ready", children: "DOWNLOAD" })
            ] })
          ] })
        }
      ),
      d && /* @__PURE__ */ f.jsx("div", { className: "export-drawer-backdrop", onClick: () => v(!1), children: /* @__PURE__ */ f.jsxs("aside", { className: "export-drawer-panel", onClick: (a) => a.stopPropagation(), children: [
        /* @__PURE__ */ f.jsxs("div", { className: "drawer-header", children: [
          /* @__PURE__ */ f.jsxs("div", { className: "header-left", children: [
            /* @__PURE__ */ f.jsx("span", { className: "header-icon", children: "📦" }),
            /* @__PURE__ */ f.jsxs("div", { children: [
              /* @__PURE__ */ f.jsx("h3", { className: "drawer-title", children: "EXPORT QUEUE" }),
              /* @__PURE__ */ f.jsxs("span", { className: "drawer-subtitle", children: [
                n.length,
                " REGISTERED EXPORTS"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ f.jsx("button", { className: "btn-close", onClick: () => v(!1), children: "✕" })
        ] }),
        /* @__PURE__ */ f.jsx("div", { className: "drawer-toolbar", children: /* @__PURE__ */ f.jsxs("div", { className: "tabs-group", children: [
          /* @__PURE__ */ f.jsxs("button", { className: `tab-btn ${o === "ALL" ? "active" : ""}`, onClick: () => u("ALL"), children: [
            "ALL (",
            n.length,
            ")"
          ] }),
          /* @__PURE__ */ f.jsxs("button", { className: `tab-btn ${o === "ACTIVE" ? "active" : ""}`, onClick: () => u("ACTIVE"), children: [
            "STREAMING (",
            m.length,
            ")"
          ] }),
          /* @__PURE__ */ f.jsxs("button", { className: `tab-btn ${o === "READY" ? "active" : ""}`, onClick: () => u("READY"), children: [
            "READY (",
            g.length,
            ")"
          ] })
        ] }) }),
        /* @__PURE__ */ f.jsx("div", { className: "drawer-cards-scroll", children: w.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: "empty-queue-notice", children: /* @__PURE__ */ f.jsx("span", { children: "No export tasks found in this view." }) }) : w.map((a) => {
          const y = a.status === "Processing" || a.status === "Queued";
          return /* @__PURE__ */ f.jsxs("div", { className: `export-job-card ${a.status.toLowerCase()} ${a.isBookmarked ? "is-bookmarked" : ""}`, children: [
            /* @__PURE__ */ f.jsxs("div", { className: "card-header-row", children: [
              /* @__PURE__ */ f.jsxs("div", { className: "identity-group", children: [
                /* @__PURE__ */ f.jsx("span", { className: `status-pill ${a.status.toLowerCase()}`, children: a.isCompleted ? "READY" : a.status }),
                /* @__PURE__ */ f.jsxs("span", { className: "operator-chip", title: `Export created by ${a.createdBy || "Guest Operator"}`, children: [
                  /* @__PURE__ */ f.jsx("span", { className: "chip-icon", children: "👤" }),
                  /* @__PURE__ */ f.jsx("span", { className: "chip-name", children: a.createdBy || "Guest Operator" })
                ] }),
                /* @__PURE__ */ f.jsx("span", { className: "file-name", title: a.fileName, children: a.fileName })
              ] }),
              /* @__PURE__ */ f.jsx(
                "button",
                {
                  className: "btn-dismiss-card",
                  onClick: (k) => c(a.jobId, k),
                  title: "Dismiss export task",
                  children: "✕"
                }
              )
            ] }),
            y && /* @__PURE__ */ f.jsxs("div", { className: "job-progress-section", children: [
              /* @__PURE__ */ f.jsxs("div", { className: "progress-top-line", children: [
                /* @__PURE__ */ f.jsx("span", { className: "phase-lbl", children: a.statusMessage }),
                /* @__PURE__ */ f.jsxs("span", { className: "percent-val", children: [
                  a.progressPercent,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ f.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ f.jsx("div", { className: "progress-fill", style: { width: `${a.progressPercent}%` } }) }),
              /* @__PURE__ */ f.jsxs("div", { className: "progress-bottom-meta", children: [
                /* @__PURE__ */ f.jsx("span", { className: "size-streamed", children: Ku(a.fileSizeBytes) }),
                /* @__PURE__ */ f.jsxs("div", { className: "telemetry-tags", children: [
                  /* @__PURE__ */ f.jsxs("span", { className: "operator-mini-tag", title: `Initiated by ${a.createdBy || "Guest Operator"}`, children: [
                    "👤 ",
                    a.createdBy || "Guest Operator"
                  ] }),
                  /* @__PURE__ */ f.jsxs("span", { className: "speed", children: [
                    a.speedMBps,
                    " MB/s"
                  ] }),
                  /* @__PURE__ */ f.jsxs("span", { className: "eta", children: [
                    "ETA -",
                    Gu(a.etaSeconds)
                  ] })
                ] })
              ] })
            ] }),
            a.isCompleted && /* @__PURE__ */ f.jsxs("div", { className: "job-ready-meta-box", children: [
              /* @__PURE__ */ f.jsxs("div", { className: "meta-item", children: [
                /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "OPERATOR" }),
                /* @__PURE__ */ f.jsxs("span", { className: "val highlight-cyan", title: a.createdBy || "Guest Operator", children: [
                  "👤 ",
                  a.createdBy || "Guest Operator"
                ] })
              ] }),
              /* @__PURE__ */ f.jsxs("div", { className: "meta-item", children: [
                /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                /* @__PURE__ */ f.jsx("span", { className: "val highlight-emerald", children: Ku(a.fileSizeBytes) })
              ] }),
              /* @__PURE__ */ f.jsxs("div", { className: "meta-item", children: [
                /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "DOWNLOADS" }),
                /* @__PURE__ */ f.jsxs("span", { className: "val", children: [
                  "📥 ",
                  a.downloadCount || 0
                ] })
              ] }),
              /* @__PURE__ */ f.jsxs("div", { className: "meta-item", children: [
                /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "COMPLETED" }),
                /* @__PURE__ */ f.jsx("span", { className: "val", children: a.completedAtUtc ? new Date(a.completedAtUtc).toLocaleTimeString() : "--:--" })
              ] }),
              /* @__PURE__ */ f.jsxs("div", { className: "meta-item", children: [
                /* @__PURE__ */ f.jsx("span", { className: "lbl", children: "RETENTION" }),
                /* @__PURE__ */ f.jsx("span", { className: `val policy-tag ${a.isBookmarked ? "pinned" : ""}`, children: a.isBookmarked ? "★ PINNED" : "24H PURGE" })
              ] })
            ] }),
            a.isCompleted && /* @__PURE__ */ f.jsxs("div", { className: "card-actions-bar", children: [
              /* @__PURE__ */ f.jsxs("div", { className: "sub-actions", children: [
                /* @__PURE__ */ f.jsx(
                  "button",
                  {
                    className: `btn-action-tool ${a.isBookmarked ? "bookmarked" : ""}`,
                    onClick: (k) => I(a.jobId, k),
                    title: a.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                    children: a.isBookmarked ? "★ PINNED" : "☆ PIN"
                  }
                ),
                a.networkFolderPath && /* @__PURE__ */ f.jsx(
                  "button",
                  {
                    className: "btn-action-tool",
                    onClick: (k) => p(a.networkFolderPath, k),
                    title: "Copy shared network directory path (UNC)",
                    children: "📂 UNC"
                  }
                )
              ] }),
              /* @__PURE__ */ f.jsx(
                "button",
                {
                  className: "btn-download-primary",
                  onClick: () => x(a),
                  children: "⬇ DOWNLOAD ARCHIVE"
                }
              )
            ] }),
            a.isFailed && /* @__PURE__ */ f.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ f.jsxs("span", { children: [
              "FAILED: ",
              a.errorMessage || "Export failed"
            ] }) })
          ] }, a.jobId);
        }) })
      ] }) })
    ] }),
    document.body
  );
}
const Yu = "itb-extractor-daemon-container";
function ac() {
  if (typeof window > "u" || window.__ITB_EXTRACTOR_DAEMON_INITIALIZED__) return;
  let e = document.getElementById(Yu);
  e || (e = document.createElement("div"), e.id = Yu, document.body.appendChild(e));
  try {
    Dr.createRoot(e).render(ls.createElement(Qd)), window.__ITB_EXTRACTOR_DAEMON_INITIALIZED__ = !0;
  } catch (t) {
    console.warn("[Extractor] Daemon mount failed:", t);
  }
}
ac();
function Gd(e, t = {}) {
  ac();
  const n = Dr.createRoot(e);
  return n.render(ls.createElement(Wd, t)), () => {
    n.unmount();
  };
}
export {
  Qd as ExportJobMonitor,
  Wd as ExtractorTile,
  Wd as default,
  Gd as mount
};
